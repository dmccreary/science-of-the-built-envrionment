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
import datetime
import json
import re
import shutil
import sys
from pathlib import Path

SKILL_DIR = Path(__file__).resolve().parent.parent
ENGINE_SRC = SKILL_DIR / "assets" / "layered-assembly-engine.js"
ENGINE_NAME = "layered-assembly-engine.js"
REPO_ROOT = SKILL_DIR.parent.parent
SITE_BASE = "https://dmccreary.github.io/science-of-the-built-envrionment/sims"

# Keep in step with the engine's layout constants
ROW, INFO_HEIGHT, DEFAULT_DRAW_HEIGHT = 34, 120, 400


def load_spec(path):
    text = Path(path).read_text(encoding="utf-8")
    m = re.search(r"const\s+ASSEMBLY\s*=\s*", text)
    if not m:
        raise ValueError("no 'const ASSEMBLY = {...};' found in " + str(path))
    obj, _ = json.JSONDecoder().raw_decode(text[m.end():])
    return obj, text


def engine_materials():
    src = ENGINE_SRC.read_text(encoding="utf-8")
    block = re.search(r"const MATERIALS = \{(.*?)\n\};", src, re.S)
    return set(re.findall(r"^\s{2}(\w+):\s*\{", block.group(1), re.M)) if block else set()


def engine_version(path):
    m = re.search(r"ENGINE_VERSION:\s*([\d.]+)", Path(path).read_text(encoding="utf-8"))
    return m.group(1) if m else None


def canvas_height(spec):
    rows = 2 + 1 + 1 + (1 if spec.get("conditions") else 0)
    return spec.get("drawHeight", DEFAULT_DRAW_HEIGHT) + INFO_HEIGHT + ROW * rows + 6


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
        les = spec.get("lesson") or {}
        for key in ("objective", "bloom", "usage", "activities", "assessment", "concepts"):
            if not les.get(key):
                E("lesson.%s is required to generate index.md and metadata.json" % key)
        ch = spec.get("chapter") or {}
        for key in ("number", "title", "dir"):
            if ch.get(key) in (None, ""):
                E("chapter.%s is required to generate metadata.json" % key)
    return errs, warns


def report(errs, warns):
    for w in warns:
        print("  warning: " + w)
    for e in errs:
        print("  ERROR:   " + e)
    print("%d error(s), %d warning(s)" % (len(errs), len(warns)))


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


MAIN_HTML = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="schema" content="https://dmccreary.github.io/intelligent-textbooks/ns/microsim/v1">
    <title>{title} MicroSim using P5.js 2.3.2</title>
    <script src="https://cdn.jsdelivr.net/npm/p5@2.3.2/lib/p5.js"></script>
    <style>
        body {{
            margin: 0px;
            padding: 0px;
            font-family: Arial, Helvetica, sans-serif;
        }}
    </style>
    <script src="{sim_id}.js"></script>
    <script src="{engine}"></script>
</head>
<body>
    <main></main>
    <br/>
    <a href=".">Back to {title} Lesson Plan</a>
</body>
</html>
"""


def md_list(items, numbered=False):
    return "\n".join(("%d. %s" % (i, t)) if numbered else ("- " + t) for i, t in enumerate(items, 1))


def cmd_new(args):
    spec_path = Path(args.spec)
    spec, text = load_spec(spec_path)
    errs, warns = validate(spec, need_lesson=True)
    print("validate %s" % spec_path)
    report(errs, warns)
    if errs:
        return 1
    if spec["id"] != args.sim_id:
        print("ERROR: spec id '%s' does not match sim id '%s'" % (spec["id"], args.sim_id))
        return 1

    out = Path(args.out) if args.out else REPO_ROOT / "docs" / "sims" / args.sim_id
    if out.exists() and any(out.iterdir()) and not args.force:
        print("ERROR: %s already exists and is not empty (use --force to overwrite)" % out)
        return 1
    out.mkdir(parents=True, exist_ok=True)

    height = canvas_height(spec)
    frame = height + 2
    les, ch = spec["lesson"], spec["chapter"]
    title = spec["title"]
    sim_id = args.sim_id

    shutil.copyfile(spec_path, out / (sim_id + ".js"))
    shutil.copyfile(ENGINE_SRC, out / ENGINE_NAME)
    (out / "main.html").write_text(MAIN_HTML.format(title=title, sim_id=sim_id, engine=ENGINE_NAME), encoding="utf-8")

    meta = {
        "title": title,
        "description": les["objective"],
        "creator": "The Science of the Built Environment",
        "author": args.author,
        "date": datetime.date.today().isoformat(),
        "subject": ["The Science of the Built Environment"],
        "type": "Interactive Simulation",
        "format": "text/html",
        "language": "en",
        "rights": "CC BY-NC-SA 4.0",
        "identifier": sim_id,
        "library": "p5.js",
        "generator": "layered-assembly-infographic engine " + (engine_version(ENGINE_SRC) or "?"),
        "bloomLevel": les["bloom"],
        "bloomVerb": les.get("bloomVerb", ""),
        "completion_status": "built",
        "chapter_number": ch["number"],
        "chapter_title": ch["title"],
        "chapter_dir": ch["dir"],
        "chapter_rel_dir": "chapters/" + ch["dir"],
        "canvasHeight": height,
        "educational": {
            "educationalLevel": "Undergraduate, Adult learners",
            "learningResourceType": "simulation",
            "bloomLevel": les["bloom"].split(", "),
            "concepts": les["concepts"],
            "prerequisites": les.get("prerequisites", []),
        },
        "pedagogical": {
            "learningObjective": les["objective"],
            "recommendedUsage": les["usage"],
            "activities": les["activities"],
            "assessment": les["assessment"],
        },
    }
    (out / "metadata.json").write_text(json.dumps(meta, indent=2, ensure_ascii=False), encoding="utf-8")

    refs = les.get("references") or []
    ref_md = "- [Chapter %s: %s](../../chapters/%s/index.md)\n" % (ch["number"], ch["title"], ch["dir"])
    ref_md += "\n".join("- [%s](%s)" % (r["title"], r["url"]) for r in refs)
    desc = les.get("description") or les["objective"]
    index = f"""---
title: "{title}"
description: "{desc}"
status: built
library: p5.js
bloom_level: {les["bloom"]}
---

# {title}

<iframe src="main.html" width="100%" height="{frame}" scrolling="no"></iframe>

[Run the {title} MicroSim Fullscreen](main.html){{ .md-button .md-button--primary }}

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="{SITE_BASE}/{sim_id}/main.html" width="100%" height="{frame}" scrolling="no"></iframe>
```

## Description

{desc}

## How to Use

{md_list(les["usage"], numbered=True)}

## Lesson Plan

**Learning objective:** {les["objective"]}

**Suggested activities**

{md_list(les["activities"])}

**Assessment**

{md_list(les["assessment"])}

## References

{ref_md}
"""
    (out / "index.md").write_text(index, encoding="utf-8")

    print("\ncreated %s (canvas height %d, iframe height %d)" % (out, height, frame))
    print("status is 'built' - never set 'approved'; only the author does that.")
    print("\nNext steps:")
    print("  1. Add this line to the MicroSims block of mkdocs.yml nav:")
    print('       - "%s": sims/%s/index.md' % (title, sim_id))
    print("  2. Open %s/main.html in a browser and exercise every control." % out)
    print("  3. Capture a screenshot named %s.png in the sim folder (microsim-utils), then add an image: line to index.md." % sim_id)
    print("  4. Run `mkdocs build --strict` from the repo root.")
    return 0


def cmd_sync(args):
    sims = Path(args.sims_dir) if args.sims_dir else REPO_ROOT / "docs" / "sims"
    src = ENGINE_SRC.read_text(encoding="utf-8")
    sv = engine_version(ENGINE_SRC)
    print("skill engine version %s" % sv)
    drift = 0
    for p in sorted(sims.glob("*/" + ENGINE_NAME)):
        same = p.read_text(encoding="utf-8") == src
        ver = engine_version(p)
        print("  %-60s %s%s" % (p.parent.name, "up to date" if same else "DRIFTED", "" if same else " (has %s)" % ver))
        if not same:
            drift += 1
            if args.apply:
                shutil.copyfile(ENGINE_SRC, p)
                print("    refreshed")
    if not list(sims.glob("*/" + ENGINE_NAME)):
        print("  no sims use the engine yet")
    return 1 if drift and not args.apply else 0


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
