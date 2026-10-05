# Appendix MicroSims Built

**Date:** 2026-10-05
**Skill:** microsim-generator (sequential, single-sim route; the batch extractor only reads `docs/chapters/`, so specs were parsed from the appendix pages with its own `extract_specs_from_chapter` function)
**Library note:** p5.js 2.3.2 for all p5 sims, matching the rest of the book

## What was built

Eleven new MicroSims, one for each `Specified` block in Appendices A to I. The four `Reused` blocks were left alone. Every sim is at `status: built`. None is `approved`.

| Sim | Appendix | Library | Iframe height |
|---|---|---|---|
| heat-pump-cycle-explorer | A | HTML + SVG | 692 |
| heat-pump-cop-lift-explorer | A | p5.js | 622 |
| hrv-effectiveness-frost-explorer | B | p5.js | 562 |
| pv-monthly-production-explorer | C | Chart.js | 628 |
| battery-backup-runtime-explorer | D | p5.js | 592 |
| ground-temperature-depth-explorer | E | Plotly.js | 692 |
| sensor-to-action-map | F | vis-network | 647 |
| co2-ventilation-balance-explorer | F | p5.js | 562 |
| clt-warm-roof-assembly-explorer | G | p5.js (layered-assembly engine) | 907 |
| code-editions-building-life-explorer | H | p5.js | 492 |
| ai-claim-audit-drill | I | p5.js | 482 |

Each folder has `main.html`, the sim script, `index.md`, `metadata.json`, and a screenshot. Each sim is embedded under its `#### Diagram:` heading in its appendix, linked from the appendices overview table (status now `Built`), listed in the `mkdocs.yml` nav, and added to the `sims/index.md` gallery.

## Checks that passed

- `validate-sims.py`: 100 (A) for all eleven.
- `test-iframe-heights.py` (Playwright): all controls visible inside the iframe, 11 of 11.
- `sync-iframe-heights.py --dry-run`: 0 changes needed, including the appendix embeds.
- Headless load at 640 px and 1000 px: no console errors and no horizontal overflow, 11 of 11.
- Each sim's challenge flow was driven through its real controls and checked against the spec's stated answers, including the Appendix A cost figures ($1.64, $1.26, $4.10, 11.7 kWh, 29.3 kWh, break-even $1.56) and the PV default of 8,781 kWh.
- `assembly_tool.py validate --for-new` (0 errors, 0 warnings) and `sync` (CLT engine copy up to date).
- `mkdocs build --strict` exits 0.

## Decisions where the spec was ambiguous or inconsistent

1. **Sensor-to-Action Map: mastery of 5 of 6 is impossible under a strict one-to-one rule.** The spec says no action can be assigned to two inputs, but one wrong assignment would force a second. An action is therefore disabled only once it has been matched correctly. A wrong pick does not block the right answer later. Please confirm, or relax the mastery rule.
2. **First-attempt hints.** The PV, ground temperature, CO2, and code-editions specs say the first wrong attempt must not reveal the answer. In those sims the chart or timeline stays hidden until the challenge is resolved, and the first-attempt text is a hint with the answer removed. The battery, COP, and HRV specs say the Why text is shown on a wrong answer, and that text contains the value, so it is shown as written.
3. **COP and Lift: sliders are hidden during the four challenges.** Challenge 1 uses 47 F, which is not on the 5 F slider grid, so a locked slider would show 45 F. The conditions appear on the thermometer instead.
4. **Code Editions: each challenge draws only what it asks about.** Drawing the full timeline after challenge 1 would give away challenges 2 and 3.
5. **CLT Warm Roof: built with the layered-assembly engine plus a prediction panel.** The engine has no scored predictions, so `clt-predict.js` adds a panel above the drawing that drives the engine's own layer checkboxes. The shared engine was not modified. The panel moves the engine's controls inside `<main>` so their positions stay correct. In the tapered-foam text, "the membrane below it" became "the vapor control layer below it" for clarity.
6. **Temperature slider step.** The engine's slider uses 1 F steps. The wrapper sets it to the spec's 5 F.
7. **Heat Pump Cycle Explorer:** part-label information is disabled during the walkthrough, because the job sentences would answer the prediction questions. Heat-flow arrows and refrigerant temperatures appear only after the matching stage is answered.

## Needs the author

- The Wikipedia and PVWatts links in each sim's References come from memory and were not checked.
- `docs/index.md` and `README.md` give MicroSim counts that predate these eleven.
- The `ai-claim-audit-drill` verdicts match the text of the appendix each statement cites (A, B, C, D, E, F, and H). Statement 5 (the refrigerant rule) is only as current as Appendix A, so re-check it at the next review.
- Challenge answers are compared exactly or within the spec tolerances. No xAPI events were added (use `add-xapi-events-to-microsim`).

## Not done on purpose

- `update-mkdocs-nav.py` was run once, then reverted. It rewrote the whole curated MicroSims nav (indentation, quoting, titles). The eleven entries were inserted by hand in sim-id order instead.
- `add-iframes-to-chapter.py` and `extract-sim-specs.py --chapter` only handle `docs/chapters/`, so embeds were inserted directly.
- `ground-source-roi-estimator`, `docs/sims/TODO.md` (apart from its count), and other files modified by a parallel session were left as found.
