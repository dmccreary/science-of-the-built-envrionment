#!/usr/bin/env python3
"""assembly_tool.py - validate, scaffold, and sync layered-assembly MicroSims.

Subcommands
  validate <spec.js>                 check an ASSEMBLY data file against the schema and teaching rules
  new <sim-id> --spec <spec.js> ...  create a complete MicroSim folder (main.html, spec, engine, index.md, metadata.json)
  sync [--apply] [--sims-dir DIR]    report (or refresh) sim copies of the engine that have drifted from the skill's
  height <spec.js>                   print the canvas height the engine will use (for the iframe)

Standard library only. Exit status is 1 when validation fails, so it can gate a build step.
"""
import argparse
import json
import re
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SKILL_DIR.parent / "_shared"))
import simkit  # noqa: E402  (shared scaffolding: spec reading, lesson/metadata files, sync, reporting)
ENGINE_SRC = SKILL_DIR / "assets" / "layered-assembly-engine.js"
ENGINE_NAME = "layered-assembly-engine.js"
REPO_ROOT = simkit.REPO_ROOT

# Keep in step with the engine's layout constants
ROW, INFO_HEIGHT, TITLE_HEIGHT, DEFAULT_DRAW_HEIGHT = 34, 120, 44, 400


def load_spec(path):
    return simkit.load_const(path, "ASSEMBLY")


def engine_materials():
    src = ENGINE_SRC.read_text(encoding="utf-8")
    block = re.search(r"const MATERIALS = \{(.*?)\n\};", src, re.S)
    return set(re.findall(r"^\s{2}(\w+):\s*\{", block.group(1), re.M)) if block else set()


engine_version = simkit.engine_version


def canvas_height(spec):
    quiz_row = 1 if spec.get("quiz") is not False else 0
    rows = 2 + 1 + 1 + quiz_row + (1 if spec.get("conditions") else 0)
    return TITLE_HEIGHT + spec.get("drawHeight", DEFAULT_DRAW_HEIGHT) + INFO_HEIGHT + ROW * rows + 6


def validate(spec, need_lesson=False):
    """Return (errors, warnings) as lists of strings."""
    errs, warns = [], []
    E, W = errs.append, warns.append

    if spec.get("schema") != "layered-assembly/1":
        E('schema must be "layered-assembly/1"')
    kind = spec.get("kind")
    if kind != "stack":
        E('kind "%s" is not supported yet. Version 1 draws "stack" assemblies only '
          "(see docs/learning-graph/next-steps.md, idea 11, for linear systems)." % kind)
    if spec.get("direction", "horizontal") not in ("horizontal", "vertical"):
        E('direction must be "horizontal" (layers run left to right, like a wall) or "vertical" (top to bottom, like a roof or slab)')
    for key in ("id", "title", "sideA", "sideB"):
        if not spec.get(key):
            E("missing top-level field: " + key)
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", spec.get("id", "x")):
        E("id must be kebab-case (lowercase letters, digits, hyphens)")

    if "background" in spec and not (isinstance(spec["background"], str) and spec["background"].strip()):
        E('background must be a CSS color string such as "aliceblue"')

    flows = spec.get("flows", [])
    flow_ids = []
    for f in flows:
        for key in ("id", "name", "color"):
            if not f.get(key):
                E("flow is missing '%s': %r" % (key, f))
        if f.get("from", "A") not in ("A", "B"):
            E("flow %s: 'from' must be \"A\" or \"B\"" % f.get("id"))
        flow_ids.append(f.get("id"))
    if len(set(flow_ids)) != len(flow_ids):
        E("flow ids must be unique")
    if not flows:
        W("no flows defined: the sim will show a labeled cross-section but nothing moves through it")
    if len(flows) > 5:
        E("more than 5 flows will not fit on the options row")

    layers = spec.get("layers", [])
    if len(layers) < 2:
        E("a stack needs at least two layers")
    if len(layers) > 12:
        E("more than 12 layers will not fit the break-checkbox grid; combine thin layers or split the assembly")
    materials = engine_materials()
    seen, stopped = set(), set()
    any_r = False
    for i, L in enumerate(layers, 1):
        tag = "layer %d (%s)" % (i, L.get("id", "?"))
        for key in ("id", "name", "full", "what", "why", "risk", "material"):
            if not L.get(key):
                E("%s: missing '%s'" % (tag, key))
        if L.get("id") in seen:
            E("%s: duplicate id" % tag)
        seen.add(L.get("id"))
        t = L.get("t")
        if not isinstance(t, (int, float)) or t <= 0:
            E("%s: 't' (thickness in inches) must be a positive number" % tag)
        elif t > 48:
            W("%s: thickness %s in is unusually large; is it in inches?" % (tag, t))
        if L.get("material") and L["material"] not in materials:
            E("%s: unknown material '%s'. Known: %s" % (tag, L["material"], ", ".join(sorted(materials))))
        if "r" in L:
            any_r = True
            if not isinstance(L["r"], (int, float)) or L["r"] < 0:
                E("%s: 'r' must be a number >= 0 (R-value in hr-ft2-F/Btu)" % tag)
        for key in ("stops", "slows"):
            for fid in L.get(key, []):
                if fid not in flow_ids:
                    E("%s: %s refers to unknown flow '%s'" % (tag, key, fid))
                else:
                    stopped.add(fid)
        if len(L.get("name", "")) > 16:
            W("%s: name '%s' is long for a callout; keep it to a short noun phrase (16 characters or fewer)" % (tag, L["name"]))
        for key in ("what", "why", "risk"):
            if len(L.get(key, "")) > 170:
                W("%s: '%s' is over 170 characters and will wrap past the info panel" % (tag, key))
        for key in ("what", "why", "risk"):
            if L.get(key) and L[key].strip()[-1] not in ".!?":
                W("%s: '%s' should be a complete sentence ending with a period" % (tag, key))
        for mode, text in (L.get("effects") or {}).items():
            if mode not in ("missing", "hole"):
                E("%s: effects key '%s' must be 'missing' or 'hole'" % (tag, mode))
    for fid in flow_ids:
        if fid not in stopped:
            W("flow '%s' is never stopped or slowed by any layer, so breaking layers will not change it" % fid)

    csi_re = re.compile(r"^\d{2} \d{2} \d{2}( .+)?$")
    for i, L in enumerate(layers, 1):
        c = L.get("csi")
        if c is None:
            continue
        if not csi_re.match(c):
            E('layer %d (%s): csi "%s" must look like "07 26 00 Vapor Retarders" (six digits in pairs, then the section title)' % (i, L.get("id", "?"), c))
        elif " " not in c.strip()[8:].strip() and len(c.strip()) == 8:
            W('layer %d (%s): csi "%s" has no section title; add it so readers can look it up' % (i, L.get("id", "?"), c))
    if layers and not any(L.get("csi") for L in layers):
        W("no layer has a 'csi' MasterFormat section (next-steps idea 5); add one where a spec section exists")

    if spec.get("quiz") not in (None, True, False):
        E("quiz must be true or false (it defaults to true; false hides the Quiz me control)")
    whys = [L.get("why") for L in layers if L.get("why")]
    if len(set(whys)) != len(whys):
        W("two layers share the same 'why' text, which makes the quiz question ambiguous")

    simkit.validate_currency(spec, errs, warns)

    cond = spec.get("conditions")
    if cond:
        for key in ("tempA", "tempB"):
            if not isinstance(cond.get(key), (int, float)):
                E("conditions.%s must be a number (degrees F)" % key)
        if not any_r:
            E("conditions is set but no layer has an 'r' value, so there is no temperature profile to draw")
        rng = cond.get("tempRange")
        if rng is not None and (len(rng) != 2 or rng[0] >= rng[1]):
            E("conditions.tempRange must be [low, high]")
    elif any_r:
        W("layers have R-values but there is no 'conditions' block, so the temperature profile is switched off")

    if need_lesson:
        simkit.validate_lesson(spec, errs)
    return errs, warns


report = simkit.report


def cmd_validate(args):
    spec, _ = load_spec(args.spec)
    errs, warns = validate(spec, need_lesson=args.for_new)
    print("validate %s" % args.spec)
    report(errs, warns)
    if not errs:
        print("canvas height: %d" % canvas_height(spec))
    return 1 if errs else 0


def cmd_height(args):
    spec, _ = load_spec(args.spec)
    print(canvas_height(spec))
    return 0


def csi_sections(spec):
    """Unique MasterFormat sections used by the layers, in layer order."""
    seen, out = set(), []
    for L in spec.get("layers", []):
        c = L.get("csi")
        if c and c not in seen:
            seen.add(c)
            out.append(c)
    return out


QUIZ_STEP = ("Tick Quiz me to test yourself. A question appears under the drawing, the layer names are hidden, "
             "and you click the layer that answers it. Your score builds as you go; press Next question to continue.")


def csi_md(spec):
    rows = [(i, L) for i, L in enumerate(spec["layers"], 1) if L.get("csi")]
    if not rows:
        return ""
    lines = ["## MasterFormat Context", "",
             "Each layer is tied to the specification section a builder would look it up under "
             "(CSI MasterFormat; section numbers are from memory and should be checked against the current edition).", "",
             "| # | Layer | MasterFormat section |", "|---|-------|----------------------|"]
    lines += ["| %d | %s | %s |" % (i, L["name"], L["csi"]) for i, L in rows]
    return "\n".join(lines) + "\n\n"


def cmd_new(args):
    spec_path = Path(args.spec)
    spec, _ = load_spec(spec_path)
    errs, warns = validate(spec, need_lesson=True)
    print("validate %s" % spec_path)
    report(errs, warns)
    if errs:
        return 1
    usage_extra = [QUIZ_STEP] if spec.get("quiz") is not False else []
    return simkit.scaffold(
        spec, spec_path, args.sim_id, args.out, ENGINE_SRC, ENGINE_NAME, "layered-assembly-infographic",
        canvas_height(spec), usage_extra=usage_extra, sections_md=csi_md(spec),
        meta_extra={"csi_sections": csi_sections(spec)},
        frontmatter_extra="csi: %s\n" % json.dumps(csi_sections(spec)),
        author=args.author, force=args.force)


def cmd_sync(args):
    return simkit.sync_engines(ENGINE_SRC, ENGINE_NAME, args.sims_dir, args.apply)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)

    v = sub.add_parser("validate")
    v.add_argument("spec")
    v.add_argument("--for-new", action="store_true", help="also require the lesson and chapter blocks that `new` needs")
    v.set_defaults(fn=cmd_validate)

    h = sub.add_parser("height")
    h.add_argument("spec")
    h.set_defaults(fn=cmd_height)

    n = sub.add_parser("new")
    n.add_argument("sim_id")
    n.add_argument("--spec", required=True, help="path to the ASSEMBLY data file (const ASSEMBLY = {...};)")
    n.add_argument("--out", help="output folder (default: docs/sims/<sim-id> in the repo)")
    n.add_argument("--author", default="Dan McCreary")
    n.add_argument("--force", action="store_true")
    n.set_defaults(fn=cmd_new)

    s = sub.add_parser("sync")
    s.add_argument("--apply", action="store_true", help="copy the skill's engine over drifted sim copies")
    s.add_argument("--sims-dir")
    s.set_defaults(fn=cmd_sync)

    args = ap.parse_args()
    sys.exit(args.fn(args))


if __name__ == "__main__":
    main()
