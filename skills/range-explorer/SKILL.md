---
name: range-explorer
description: Builds an interactive "range explorer" MicroSim (p5.js) for a building or trades textbook - a chart of options with a possible range and a typical range each (structural spans, wire size vs load, duct size vs airflow, conduit fill, pipe size vs fixture units, insulation R vs climate, ladder or panel capacities), plus a marker the student moves to see which options qualify at THEIR number. Project-specific to The Science of the Built Environment and its sister construction and trades books (electrical, HVAC, plumbing, framing, finishes). Use this whenever the user wants a span chart, a "which one works for this value" tool, a range or capacity comparison, a sizing table turned into a slider, or says things like "turn this table into an interactive", "what can span 40 feet", "which wire gauge handles this load", even if they never say "range". Do NOT use for textbooks that are not about buildings or trades, for layer cross-sections (use layered-assembly-infographic), for classification or sorting exercises (use microsim-generator's concept classifier), or for two-variable calculators and plots (use microsim-generator).
---

# Range Explorer

A static range chart answers "what is typical?". A range explorer answers "what works for **my** number?". You write the options and their ranges as a short data file; a shared engine draws the chart, the movable marker, the highlighting, the unit toggle, and the detail panel. Every range chart in the book then looks and behaves the same way, and a fix made once reaches every sim.

This skill is the second of a small toolkit (see `docs/learning-graph/next-steps.md`). It shares its scaffolding with `layered-assembly-infographic` through `skills/_shared/simkit.py`, and follows the same project rules.

## When it fits

The pattern needs: several named options, one numeric quantity that each option can handle over a **range**, and a decision that depends on where the student's own value falls.

| Topic | Axis | Options |
|---|---|---|
| Structural spans (the pilot) | span, ft | joists, I-joists, trusses, beams, slabs |
| Conductor sizing | load, amps | 14, 12, 10, 8, 6 AWG |
| Duct sizing | airflow, cfm | round and rectangular duct sizes |
| Conduit fill | wires, count | conduit trade sizes |
| Pipe sizing | fixture units | drain and vent pipe sizes |
| Insulation | R-value | insulation types at a thickness |

It does **not** fit when the answer depends on two or more continuous inputs (use a calculator sim), when the options are categories to sort (use a classifier), or when the topic is a stack of layers (use `layered-assembly-infographic`).

## What it builds

A folder under `docs/sims/<sim-id>/`:

| File | Purpose |
|---|---|
| `<sim-id>.js` | The `RANGES` data object (strict JSON inside `const RANGES = {...};`). The only file you author. |
| `range-explorer-engine.js` | A copy of the shared engine, version-stamped. Do not hand-edit it. |
| `main.html` | Loads p5.js 2.3.2, the spec, then the engine. Bare `<main></main>`. |
| `index.md`, `metadata.json` | Lesson page and metadata, generated from the spec's `chapter`, `lesson`, and `currency` blocks. |

The engine copy stays in each sim folder so a teacher can paste the sim into the p5.js editor. `range_tool.py sync` reports and repairs drift.

## Workflow

### 1. Get the numbers from the chapter, or say they are not there

Read the chapter the sim belongs to. If it gives the ranges (a sizing table), use them exactly. **If it does not, the numbers are illustrative**: take typical values from general design knowledge, say so in `caption`, in the `currency.ages` list, and in your report, and ask the author to confirm. Never present invented ranges as the book's data. Tie the chart to the book's running example with `marks` (for example, the Riverbend girder span from Chapter 6).

### 2. Author the spec

Copy `assets/example-spec.js` and edit it. Fields are in `references/spec-schema.md`. The essentials:

- `axis`: `label`, `unit`, `min`, `max`, `step`, `start`. Add `si` (`unit`, `factor`, `digits`) to give students an IP/SI toggle for lengths.
- `groups`: 1 to 5 families (Wood, Steel, Concrete). Each becomes a checkbox so students can compare one family at a time.
- `items`: 2 to 16 options. Each has a `range` (possible), a `typical` range inside it, and three sentences: `what` it is, `why` choose it, `limit` (what to watch out for). The limit is where students learn the cost of each choice.
- `marks`: up to 4 reference values with labels, tied to the chapter's worked examples.
- `chapter`, `lesson`, `currency`: needed for the lesson page. `currency` separates what is timeless from what ages.

Do not copy ranges, wording, or layouts from copyrighted charts or texts. Ranges are facts you can state; the sentences must be your own.

### 3. Validate, scaffold, verify

```bash
python skills/range-explorer/scripts/range_tool.py validate path/to/spec.js --for-new
python skills/range-explorer/scripts/range_tool.py new <sim-id> --spec path/to/spec.js
```

Then follow `references/integration-checklist.md`: add the nav line, open the sim from a local static server (never start `mkdocs serve`), exercise every control at 640 px and at a wide fullscreen width, run `mkdocs build --strict`, and leave `status: built`. Only the author sets `approved`.

## What the engine gives students

- A marker (red line) they drag in the chart or set with the slider. The headline counts how many options reach the value.
- Rows that reach the value stay dark and bold; the rest fade. A light bar shows the possible range and a dark bar the typical range, so "possible but unusual" is visible.
- A bar that runs past the right edge of the axis ends in an arrow.
- Click a row's name for what / why / watch out, with the range shown in the current units.
- Group checkboxes, three sort orders, an IP/SI toggle, and Reset.
- The spec title centered at the top in a large bold font, over the book's standard `aliceblue` MicroSim background (spec field `background`). The info panel and controls are white.

## Honesty and limits

- Ranges are one-dimensional teaching values. The chart ignores load, deflection, code checks, and local availability. Say so in `currency.ages` and tell students to use manufacturer tables or an engineer for real work.
- The "typical" range is a judgment. State where it came from in the report.
- The engine is designed for canvas widths of 640 px and up on laptop screens. Test at 640 px and fullscreen; phone widths are best-effort.
- Up to 16 options and 5 groups. More than that crowds the rows and the controls.

## References

- `references/spec-schema.md` - every field of the `RANGES` object, with limits.
- `references/trade-applications.md` - how other trades map onto this pattern, and what needs a different tool.
- `references/integration-checklist.md` - the project rules (nav, status, strict build, test widths).
- `assets/example-spec.js` - a complete worked spec (structural spans).
