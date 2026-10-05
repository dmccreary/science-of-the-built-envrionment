# Integration checklist

The project rules that apply when a layered-assembly sim is added to the book. They come from `AGENTS.md` and `CONTENT-GENERATION-GUIDE.md`; if those change, they win over this page.

## Before you scaffold

- [ ] The sim belongs to a chapter in `docs/chapters/`, and the spec's layer facts match that chapter's text.
- [ ] No existing sim already covers the same assembly (look in `docs/sims/`). If one does, tell the author instead of adding a duplicate.
- [ ] `validate --for-new` reports 0 errors.

## After scaffolding

- [ ] `docs/sims/<sim-id>/` has `main.html`, `<sim-id>.js`, `layered-assembly-engine.js`, `index.md`, `metadata.json`.
- [ ] `main.html` uses a bare `<main></main>` (never `id="main"`). The tool writes it this way; do not change it.
- [ ] `index.md` frontmatter has `status: built`. **Never `approved`**: only the human author sets that after exercising the controls.
- [ ] The nav line is added under `MicroSims:` in `mkdocs.yml`. A page that exists but is not in `nav:` is invisible to readers and trips `--strict`.
- [ ] `navigation.tabs` is not present in `mkdocs.yml` (the book uses side navigation). If it is, remove it and tell the author.
- [ ] The iframe in `index.md` uses the height the tool printed (canvas height + 2).
- [ ] The sim is embedded in the chapter where the concept is taught, using the same iframe-plus-fullscreen-link pattern as the other chapters.
- [ ] A screenshot `<sim-id>.png` is in the sim folder and referenced from `index.md` (`image:`), so the MicroSims grid shows it.

## Verification

- [ ] Opened in a browser and every control exercised (layers: untick each in both Remove and Punch modes, Explode, each flow, Temperature, Line art, Legend, units, Reset).
- [ ] Checked at 640 px wide (the minimum test width) and at a wide fullscreen width: nothing overlaps, and a vertical stack, its labels, and its legend sit together in the center.
- [ ] **Quiz me** works: names disappear, a question appears, a right and a wrong click both give feedback, the score updates, Next question loads another, and unticking Quiz me restores the normal view.
- [ ] Selecting a layer shows its MasterFormat section (if it has `csi`) and the lesson page has the "MasterFormat Context" and "What Ages in This Sim" sections.
- [ ] Console shows no errors or p5 "redeclared" warnings.
- [ ] `mkdocs build --strict` exits clean. (Do not start or stop `mkdocs serve`; the author runs it.)
- [ ] `assembly_tool.py sync` shows the sim's engine "up to date".

## Reporting

State what was built, which checks passed, anything skipped or failing, and which numbers are illustrative and need the author's confirmation. If a check could not be run (no browser available, for example), say that instead of implying it passed.

## Chapter content rules that touch sims

- Student-facing prose around the sim follows `CONTENT-GENERATION-GUIDE.md`: no padding, concrete examples over description, Markdown lists preceded by a blank line, admonition bodies indented four spaces.
- Mascot admonitions are for chapter prose, not for the sim's `index.md` lesson page; the lesson page is closer to instructor-facing material.
