#!/usr/bin/env python3
"""simkit.py - scaffolding shared by the project's MicroSim skills (layered-assembly-infographic, range-explorer, ...).

Each skill keeps its own data format, engine, and validator. What they share lives here so a fix is made once:
reading a `const NAME = {...};` spec file, writing main.html / metadata.json / index.md from the `chapter` and
`lesson` blocks, the "What Ages in This Sim" section, and the engine-drift check.

Standard library only. Not a skill itself (no SKILL.md); it is imported by each skill's tool script.
"""
import datetime
import json
import re
import shutil
from pathlib import Path

SHARED_DIR = Path(__file__).resolve().parent
REPO_ROOT = SHARED_DIR.parent.parent
SITE_BASE = "https://dmccreary.github.io/science-of-the-built-envrionment/sims"

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


# ---------------------------------------------------------------- reading specs
def load_const(path, const_name):
    """Return (object, full_text) for `const <const_name> = {...};` (strict JSON inside)."""
    text = Path(path).read_text(encoding="utf-8")
    m = re.search(r"const\s+%s\s*=\s*" % re.escape(const_name), text)
    if not m:
        raise ValueError("no 'const %s = {...};' found in %s" % (const_name, path))
    obj, _ = json.JSONDecoder().raw_decode(text[m.end():])
    return obj, text


def engine_version(path):
    m = re.search(r"ENGINE_VERSION:\s*([\d.]+)", Path(path).read_text(encoding="utf-8"))
    return m.group(1) if m else None


# ---------------------------------------------------------------- reporting and shared validation
def report(errs, warns):
    for w in warns:
        print("  warning: " + w)
    for e in errs:
        print("  ERROR:   " + e)
    print("%d error(s), %d warning(s)" % (len(errs), len(warns)))


def validate_lesson(spec, errs):
    """The `chapter` and `lesson` blocks needed to generate index.md and metadata.json."""
    les = spec.get("lesson") or {}
    for key in ("objective", "bloom", "usage", "activities", "assessment", "concepts"):
        if not les.get(key):
            errs.append("lesson.%s is required to generate index.md and metadata.json" % key)
    ch = spec.get("chapter") or {}
    for key in ("number", "title", "dir"):
        if ch.get(key) in (None, ""):
            errs.append("chapter.%s is required to generate metadata.json" % key)


def validate_currency(spec, errs, warns):
    cur = spec.get("currency")
    if cur is None:
        warns.append("no 'currency' block: say what in this sim is timeless and what ages (code editions, product values), "
                     "with an as-of date (next-steps idea 8)")
        return
    if not re.fullmatch(r"\d{4}(-\d{2})?", str(cur.get("asOf", ""))):
        errs.append('currency.asOf must be a year or year-month such as "2026" or "2026-10"')
    for key in ("timeless", "ages"):
        if not cur.get(key):
            errs.append("currency.%s is required and must not be empty" % key)
    for a in cur.get("ages", []):
        for key in ("item", "basis", "check"):
            if not a.get(key):
                errs.append("currency.ages entry is missing '%s': %r" % (key, a))


# ---------------------------------------------------------------- markdown pieces
def md_list(items, numbered=False):
    return "\n".join(("%d. %s" % (i, t)) if numbered else ("- " + t) for i, t in enumerate(items, 1))


def currency_md(spec):
    cur = spec.get("currency")
    if not cur:
        return ""
    lines = ["## What Ages in This Sim", "",
             "Values are illustrative and were last reviewed as of **%s**." % cur["asOf"], "",
             "**Timeless (physics and principles):**", ""]
    lines += ["- " + t for t in cur["timeless"]]
    lines += ["", "**Check before relying on it:**", "", "| Item | Basis | What to check |", "|------|-------|---------------|"]
    lines += ["| %s | %s | %s |" % (a["item"], a["basis"], a["check"]) for a in cur["ages"]]
    return "\n".join(lines) + "\n\n"


# ---------------------------------------------------------------- scaffolding
def scaffold(spec, spec_path, sim_id, out, engine_src, engine_name, generator, height,
             usage_extra=None, sections_md="", meta_extra=None, frontmatter_extra="",
             author="Dan McCreary", force=False):
    """Write main.html, <sim-id>.js, the engine copy, metadata.json, and index.md. Returns 0 on success."""
    if spec["id"] != sim_id:
        print("ERROR: spec id '%s' does not match sim id '%s'" % (spec["id"], sim_id))
        return 1
    out = Path(out) if out else REPO_ROOT / "docs" / "sims" / sim_id
    if out.exists() and any(out.iterdir()) and not force:
        print("ERROR: %s already exists and is not empty (use --force to overwrite)" % out)
        return 1
    out.mkdir(parents=True, exist_ok=True)

    frame = height + 2
    les, ch, title = spec["lesson"], spec["chapter"], spec["title"]
    usage = list(les["usage"]) + list(usage_extra or [])

    shutil.copyfile(spec_path, out / (sim_id + ".js"))
    shutil.copyfile(engine_src, out / engine_name)
    (out / "main.html").write_text(MAIN_HTML.format(title=title, sim_id=sim_id, engine=engine_name), encoding="utf-8")

    meta = {
        "title": title,
        "description": les["objective"],
        "creator": "The Science of the Built Environment",
        "author": author,
        "date": datetime.date.today().isoformat(),
        "subject": ["The Science of the Built Environment"],
        "type": "Interactive Simulation",
        "format": "text/html",
        "language": "en",
        "rights": "CC BY-NC-SA 4.0",
        "identifier": sim_id,
        "library": "p5.js",
        "generator": "%s engine %s" % (generator, engine_version(engine_src) or "?"),
        "bloomLevel": les["bloom"],
        "bloomVerb": les.get("bloomVerb", ""),
        "completion_status": "built",
        "chapter_number": ch["number"],
        "chapter_title": ch["title"],
        "chapter_dir": ch["dir"],
        "chapter_rel_dir": "chapters/" + ch["dir"],
        "canvasHeight": height,
    }
    meta.update(meta_extra or {})
    meta.update({
        "currency": spec.get("currency"),
        "educational": {
            "educationalLevel": "Undergraduate, Adult learners",
            "learningResourceType": "simulation",
            "bloomLevel": les["bloom"].split(", "),
            "concepts": les["concepts"],
            "prerequisites": les.get("prerequisites", []),
        },
        "pedagogical": {
            "learningObjective": les["objective"],
            "recommendedUsage": usage,
            "activities": les["activities"],
            "assessment": les["assessment"],
        },
    })
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
{frontmatter_extra}---

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

{md_list(usage, numbered=True)}

## Lesson Plan

**Learning objective:** {les["objective"]}

**Suggested activities**

{md_list(les["activities"])}

**Assessment**

{md_list(les["assessment"])}

{sections_md}{currency_md(spec)}## References

{ref_md}
"""
    (out / "index.md").write_text(index, encoding="utf-8")

    print("\ncreated %s (canvas height %d, iframe height %d)" % (out, height, frame))
    print("status is 'built' - never set 'approved'; only the author does that.")
    print("\nNext steps:")
    print("  1. Add this line to the MicroSims block of mkdocs.yml nav:")
    print('       - "%s": sims/%s/index.md' % (title, sim_id))
    print("  2. Open %s/main.html in a browser (at 640 px wide and fullscreen) and exercise every control." % out)
    print("  3. Capture a screenshot named %s.png in the sim folder (microsim-utils), then add an image: line to index.md." % sim_id)
    print("  4. Run `mkdocs build --strict` from the repo root.")
    return 0


def sync_engines(engine_src, engine_name, sims_dir=None, apply=False):
    """Report (or refresh) sim copies of an engine that differ from the skill's. Returns 1 if drift remains."""
    sims = Path(sims_dir) if sims_dir else REPO_ROOT / "docs" / "sims"
    src = Path(engine_src).read_text(encoding="utf-8")
    print("skill engine version %s (%s)" % (engine_version(engine_src), engine_name))
    found = sorted(sims.glob("*/" + engine_name))
    drift = 0
    for p in found:
        same = p.read_text(encoding="utf-8") == src
        print("  %-60s %s%s" % (p.parent.name, "up to date" if same else "DRIFTED", "" if same else " (has %s)" % engine_version(p)))
        if not same:
            drift += 1
            if apply:
                shutil.copyfile(engine_src, p)
                print("    refreshed")
    if not found:
        print("  no sims use this engine yet")
    return 1 if drift and not apply else 0
