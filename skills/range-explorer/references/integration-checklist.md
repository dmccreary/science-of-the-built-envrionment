# Integration checklist

The project rules that apply when a range-explorer sim is added to the book. They come from `AGENTS.md` and `CONTENT-GENERATION-GUIDE.md`; if those change, they win over this page.

## Before you scaffold

- [ ] The sim belongs to a chapter, and the ranges come from that chapter's text or are marked illustrative everywhere they appear (caption, `currency.ages`, report).
- [ ] No existing sim already answers the same question (look in `docs/sims/`). If one does, tell the author instead of adding a duplicate.
- [ ] `validate --for-new` reports 0 errors, and you have read every warning.

## After scaffolding

- [ ] `docs/sims/<sim-id>/` has `main.html`, `<sim-id>.js`, `range-explorer-engine.js`, `index.md`, `metadata.json`.
- [ ] `main.html` uses a bare `<main></main>` (never `id="main"`).
- [ ] `index.md` frontmatter has `status: built`. **Never `approved`.**
- [ ] The nav line is added under `MicroSims:` in `mkdocs.yml`; `navigation.tabs` is not present.
- [ ] The iframe height in `index.md` matches the height the tool printed.
- [ ] The sim is embedded in the chapter where the concept is taught.
- [ ] A screenshot `<sim-id>.png` is in the sim folder and referenced from `index.md` (`image:`).

## Verification

- [ ] Opened from a local static server (not `mkdocs serve`) at **640 px** and at a wide fullscreen width.
- [ ] Dragged the marker in the chart, used the slider, clicked several row names, ticked and unticked each group, changed Sort, switched IP/SI (if present), and pressed Reset.
- [ ] The headline count matches what you can see: dark rows are exactly the rows whose bar contains the marker.
- [ ] Console shows no errors or p5 "redeclared" warnings.
- [ ] `mkdocs build --strict` exits clean. `range_tool.py sync` shows the engine "up to date".

## Reporting

State what was built, which checks passed, anything skipped or failing, and which ranges are illustrative and need the author's confirmation. If a check could not be run, say that instead of implying it passed.
