#!/usr/bin/env python3
"""range_tool.py - validate, scaffold, and sync range-explorer MicroSims.

Subcommands
  validate <spec.js> [--for-new]   check a RANGES data file against the schema and teaching rules
  new <sim-id> --spec <spec.js>    create a complete MicroSim folder (main.html, spec, engine, index.md, metadata.json)
  sync [--apply] [--sims-dir DIR]  report (or refresh) sim copies of the engine that have drifted from the skill's
  height <spec.js>                 print the canvas height the engine will use (for the iframe)

Standard library only. Exit status is 1 when validation fails. Shared scaffolding lives in skills/_shared/simkit.py.
"""
import argparse
import re
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(SKILL_DIR.parent / "_shared"))
import simkit  # noqa: E402

ENGINE_SRC = SKILL_DIR / "assets" / "range-explorer-engine.js"
ENGINE_NAME = "range-explorer-engine.js"

# Keep in step with the engine's layout constants
ROW, INFO_HEIGHT, ROWH, HEADER, FOOT = 34, 120, 26, 64, 34


def load_spec(path):
    return simkit.load_const(path, "RANGES")


def canvas_height(spec):
    return HEADER + len(spec.get("items", [])) * ROWH + FOOT + INFO_HEIGHT + 2 * ROW + 6


def is_num(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool)


def validate(spec, need_lesson=False):
    errs, warns = [], []
    E, W = errs.append, warns.append

    if spec.get("schema") != "range-explorer/1":
        E('schema must be "range-explorer/1"')
    for key in ("id", "title"):
        if not spec.get(key):
            E("missing top-level field: " + key)
    if not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", spec.get("id", "x")):
        E("id must be kebab-case (lowercase letters, digits, hyphens)")
    if not spec.get("caption"):
        W("no 'caption': add one or two sentences telling the student what to do and what the numbers mean")

    ax = spec.get("axis") or {}
    for key in ("label", "unit"):
        if not ax.get(key):
            E("axis.%s is required" % key)
    lo_ax, hi_ax = ax.get("min"), ax.get("max")
    if not (is_num(lo_ax) and is_num(hi_ax) and lo_ax < hi_ax):
        E("axis.min and axis.max must be numbers with min < max")
        lo_ax, hi_ax = 0, 1
    step = ax.get("step", 1)
    if not (is_num(step) and step > 0):
        E("axis.step must be a positive number")
    start = ax.get("start", lo_ax)
    if not (is_num(start) and lo_ax <= start <= hi_ax):
        E("axis.start must be a number between axis.min and axis.max")
    si = ax.get("si")
    if si is not None:
        if not si.get("unit") or not (is_num(si.get("factor")) and si["factor"] > 0):
            E("axis.si needs a 'unit' and a positive numeric 'factor' (display value = base value x factor)")

    groups = spec.get("groups") or []
    if not 1 <= len(groups) <= 5:
        E("groups must have 1 to 5 entries (they become checkboxes on one row)")
    gids = []
    for g in groups:
        for key in ("id", "name", "color"):
            if not g.get(key):
                E("group is missing '%s': %r" % (key, g))
        gids.append(g.get("id"))
        if len(g.get("name", "")) > 14:
            W("group name '%s' is long for a checkbox; keep it to 14 characters or fewer" % g.get("name"))
    if len(set(gids)) != len(gids):
        E("group ids must be unique")

    items = spec.get("items") or []
    if not 2 <= len(items) <= 16:
        E("items must have 2 to 16 entries (rows are 26 px each)")
    seen = set()
    for i, it in enumerate(items, 1):
        tag = "item %d (%s)" % (i, it.get("id", "?"))
        for key in ("id", "name", "group", "what", "why"):
            if not it.get(key):
                E("%s: missing '%s'" % (tag, key))
        if it.get("id") in seen:
            E("%s: duplicate id" % tag)
        seen.add(it.get("id"))
        if it.get("group") and it["group"] not in gids:
            E("%s: group '%s' is not defined in groups" % (tag, it["group"]))
        rng = it.get("range")
        if not (isinstance(rng, list) and len(rng) == 2 and all(is_num(v) for v in rng) and rng[0] < rng[1]):
            E("%s: range must be [low, high] with low < high" % tag)
            continue
        if rng[0] < lo_ax:
            W("%s: range starts below axis.min and will be clipped at the left edge" % tag)
        if rng[1] > hi_ax:
            W("%s: range runs past axis.max; the chart will show an arrow at the right edge" % tag)
        typ = it.get("typical")
        if typ is None:
            W("%s: no 'typical' range; students then cannot tell usual from possible" % tag)
        elif not (isinstance(typ, list) and len(typ) == 2 and all(is_num(v) for v in typ) and typ[0] < typ[1]
                  and rng[0] <= typ[0] and typ[1] <= rng[1]):
            E("%s: typical must be [low, high] inside the range" % tag)
        if len(it.get("name", "")) > 30:
            W("%s: name is over 30 characters and will be shrunk or cut in the label column" % tag)
        for key in ("what", "why", "limit"):
            v = it.get(key)
            if key == "limit" and not v:
                W("%s: no 'limit' (what to watch out for); this is where students learn the cost of each option" % tag)
            elif v:
                if len(v) > 170:
                    W("%s: '%s' is over 170 characters and will wrap past the info panel" % (tag, key))
                if v.strip()[-1] not in ".!?":
                    W("%s: '%s' should be a complete sentence ending with a period" % (tag, key))

    for m in spec.get("marks", []):
        if not (is_num(m.get("value")) and m.get("label")):
            E("each mark needs a numeric 'value' and a 'label': %r" % m)
    if len(spec.get("marks", [])) > 4:
        W("more than 4 reference marks will crowd the labels under the chart")

    simkit.validate_currency(spec, errs, warns)
    if need_lesson:
        simkit.validate_lesson(spec, errs)
    return errs, warns


def cmd_validate(args):
    spec, _ = load_spec(args.spec)
    errs, warns = validate(spec, need_lesson=args.for_new)
    print("validate %s" % args.spec)
    simkit.report(errs, warns)
    if not errs:
        print("canvas height: %d" % canvas_height(spec))
    return 1 if errs else 0


def cmd_height(args):
    spec, _ = load_spec(args.spec)
    print(canvas_height(spec))
    return 0


def cmd_new(args):
    spec, _ = load_spec(args.spec)
    errs, warns = validate(spec, need_lesson=True)
    print("validate %s" % args.spec)
    simkit.report(errs, warns)
    if errs:
        return 1
    step = ("Drag the red marker, or use the slider under the chart, to set your own %s. "
            "Rows that reach it stay dark; rows that do not fade out. Click a row's name for what it is, why to choose it, and what to watch out for."
            % spec["axis"]["label"].lower())
    return simkit.scaffold(
        spec, args.spec, args.sim_id, args.out, ENGINE_SRC, ENGINE_NAME, "range-explorer", canvas_height(spec),
        usage_extra=[step], author=args.author, force=args.force)


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
    n.add_argument("--spec", required=True, help="path to the RANGES data file (const RANGES = {...};)")
    n.add_argument("--out", help="output folder (default: docs/sims/<sim-id> in the repo)")
    n.add_argument("--author", default="Dan McCreary")
    n.add_argument("--force", action="store_true")
    n.set_defaults(fn=cmd_new)
    s = sub.add_parser("sync")
    s.add_argument("--apply", action="store_true")
    s.add_argument("--sims-dir")
    s.set_defaults(fn=cmd_sync)
    args = ap.parse_args()
    sys.exit(args.fn(args))


if __name__ == "__main__":
    main()
