---
name: layered-assembly-infographic
description: Builds an interactive cross-section "layered assembly" MicroSim (p5.js) for a building or trades textbook - a wall, roof, floor, slab, foundation, window, cladding, or insulation stack drawn as thickness-proportional layers with hatching, numbered leader-line callouts, break-the-layer controls, an explode slider, animated heat/air/water/vapor flows, an optional temperature profile, and an IP/SI toggle. Project-specific to The Science of the Built Environment and its sister construction and trades books (electrical, HVAC, plumbing, framing, finishes). Use this whenever the user wants a section drawing, assembly diagram, "what is behind the siding", a layers-of-the-wall/roof/slab picture, an exploded assembly, a callout-labeled construction detail, or a sim where students remove a layer and see what fails - even if they only say "make a MicroSim for the roof assembly" or "show the layers". Do NOT use for textbooks that are not about buildings or trades, for non-layer simulations (use microsim-generator), or for linear systems such as an electrical service run, a drain-waste-vent stack, or a duct run (those are planned as a separate skill, see docs/learning-graph/next-steps.md idea 11).
---

# Layered Assembly Infographic

This skill turns a short data file describing a stack of building layers into a finished, consistent MicroSim. You write the *content* (what each layer is, why it is there, which flows it stops); a shared engine does the drawing, hatching, callouts, animation, and controls. Every assembly in the book then looks and behaves the same way, and a bug fixed once is fixed everywhere.

## Why this exists

Classic construction texts such as Ching's *Building Construction Illustrated* teach assemblies with clean black-and-white section drawings and short leader-line labels. That is a strong model, and it has one gap: a static page shows the object but not the invisible flows (heat, air, water, vapor) that explain why each layer is there. This skill keeps the clarity and adds the explanation. Four rules follow from that, and the engine enforces the first three:

1. **Line art is the object; color is the flow.** Layers are black-and-white hatched drawings (color fills are a soft option, and a Line art checkbox removes them). Saturated color appears only on the moving dots that stand for heat, air, water, and vapor. The title band and drawing sit on the book's standard `aliceblue` MicroSim background (spec field `background`, default `aliceblue`); the info panel and controls are white, and Line art mode switches the drawing to white for printing.
2. **Every layer has two levels of explanation.** The callout says *what it is* (a short noun phrase). The detail panel says *what it is, why it is there, and what happens if it fails*. The "why" is where the book adds value.
3. **Predict, then test.** Students remove or puncture a layer and watch which flows now get through. The lesson plan should ask for a prediction first.
4. **Content comes from the chapter, not from memory.** The numbers (R-values, thicknesses) are illustrative values that must match the chapter the sim belongs to. See "Facts and honesty" below.

## What it builds

A sim folder under `docs/sims/<sim-id>/` containing:

| File | Purpose |
|---|---|
| `<sim-id>.js` | The `ASSEMBLY` data object (strict JSON inside `const ASSEMBLY = {...};`). This is the only file you author. |
| `layered-assembly-engine.js` | A copy of the shared engine, version-stamped. Do not hand-edit it. |
| `main.html` | Loads p5.js 2.3.2, the spec, then the engine. Bare `<main></main>` per the project rules. |
| `index.md` | Lesson page: iframe, fullscreen button, embed snippet, how to use, lesson plan, references. |
| `metadata.json` | Dublin Core plus pedagogical metadata. |

The engine copy is kept inside each sim folder on purpose: the repo's sims are self-contained so a teacher can paste them into the p5.js editor. `assembly_tool.py sync` reports and repairs drift.

## Workflow

Follow these steps in order. Steps 3 and 5 are where most problems get caught.

### 1. Choose the assembly and read the chapter

Identify the chapter the sim belongs to and read the relevant section of `docs/chapters/<NN-slug>/index.md`. Take the layer list, thicknesses, R-values, and the control layers from the chapter so the sim and the text agree. If the chapter does not give a value, choose a typical one and mark it illustrative in the layer's `what` or the sim's `caption`. Check `docs/sims/` for an existing hand-built sim of the same assembly (for example `control-layer-wall-section-explorer`) and tell the user rather than duplicating it silently.

Decide the direction:

- `"horizontal"`: layers run left to right with the outside at the left. Use for walls.
- `"vertical"`: layers run top to bottom with the outside at the top. Use for roofs, floors, and slabs on grade.

### 2. Author the spec

Copy `assets/example-spec.js` (a wall) or `assets/example-spec-roof.js` (a vertical stack) to a working file and edit it. The full field list is in `references/spec-schema.md`; the essentials:

- `layers`: listed from side A to side B. Each has `id`, short `name` (16 characters or fewer, it becomes the callout), `full` name, `t` (thickness in **inches**), `material` (a hatch key), and three complete sentences: `what`, `why`, `risk`. Add `r` (R-value) if the assembly has a thermal story, `stops` and `slows` (flow ids), `sensitive: true` for a layer that must stay above the dew point, and `effects` for custom "what now happens" text when the layer is removed or punctured.
- `flows`: what moves through this assembly (rain, air, vapor, heat, fire, sound). Choose only the flows the chapter teaches; 2 to 4 is typical. `from` says which side the flow starts on.
- `csi` on each layer that has a specification section (next-steps idea 5), and a `currency` block saying what is timeless and what ages (idea 8). Both are recommended; the validator warns when they are missing. Take MasterFormat numbers from `references/csi-masterformat.md`, and say in the report that the numbers are from memory and need checking.
- `conditions`: include it only when you want the temperature profile (needs `r` on the layers).
- `chapter` and `lesson`: needed to generate `index.md` and `metadata.json`. Write the lesson text as a teacher would: a Bloom-level objective, usage steps, a predict-then-test activity, and assessment questions.

`stops` means the layer blocks the flow completely while intact. `slows` means it lets a share through (insulation slows heat; a painted board slows vapor). A flow that nothing stops or slows has nothing to teach, and the validator warns about it.

Pick `material` keys from the hatch legend in `references/drawing-conventions.md` so every sim shares one visual vocabulary.

### 3. Validate

```bash
python skills/layered-assembly-infographic/scripts/assembly_tool.py validate path/to/spec.js --for-new
```

Fix every error. Treat warnings as editing notes: long names, sentences without periods, or an unused flow usually mean the spec is unclear to a student too.

### 4. Scaffold

```bash
python skills/layered-assembly-infographic/scripts/assembly_tool.py new <sim-id> --spec path/to/spec.js
```

This writes the whole folder into `docs/sims/<sim-id>/` with status `built`, copies the engine, and prints the nav line to add. Use `--out DIR` to build somewhere else for a trial run. The spec `id` must equal the sim id.

### 5. Verify in a browser

Open the sim from a local static server (do not start `mkdocs serve`; the author runs that) and exercise every control: click each layer, untick every layer box in both modes (Remove the layer, then Punch a hole), move Explode, toggle each flow, Temperature, Line art, Legend (on by default; untick to hide), the unit selector, Quiz me (answer one right and one wrong), and Reset. Check that:

- no callout overlaps another or runs off the canvas, and the leader lines do not cross labels;
- the title is centered at the top, fully visible, and not cut off at 640 px;
- the status line in the info panel tells the truth for the intact assembly (for example, rain stopped at the weather-resistive barrier, not "reaches inside");
- the console has no errors.

Fix the spec (shorter names, a different direction, fewer layers) before touching the engine. If the engine itself has a defect, fix it in `assets/layered-assembly-engine.js`, bump `ENGINE_VERSION`, and run `assembly_tool.py sync --apply` so every sim gets the fix. Say so in your report.

### 6. Integrate and report

1. Add the nav line to the `MicroSims:` block in `mkdocs.yml`. Never add `navigation.tabs`.
2. Embed the sim in its chapter where the concept is taught (iframe plus fullscreen link, matching the other chapters' embeds).
3. Capture a screenshot named `<sim-id>.png` (use the `microsim-utils` skill) and add an `image:` line to `index.md`, so it appears in the MicroSims grid.
4. Run `mkdocs build --strict` and confirm it exits clean.
5. Leave `status: built`. Only the human author sets `approved`.

Report plainly: what was built, the checks that passed, anything skipped or still failing, and any illustrative numbers the author should confirm.

## Facts and honesty

- R-values, thicknesses, and code limits are teaching values. Take them from the chapter. When the chapter and a handbook disagree, say so in the report instead of picking quietly.
- The temperature profile is a steady-state series calculation through the layers that are present. It is a teaching model: no thermal bridging, no moisture effects, no air movement. Say so in `caption` if students might over-read it.
- The book targets students on standard laptops. The engine is designed for canvas widths of **640 px and up** (640 px is a realistic iframe column inside the textbook). Below that it still draws (the legend drops under a vertical stack, and the stack shrinks), but the control rows crowd and labels can overlap. Test at 640 px and at a wide fullscreen width; do not spend effort on phone widths unless the author asks.
- The animated dots are schematic. They show *which* layers stop which flows, not rates. Never describe them as a simulation of real flow rates.
- The engine shows only what the flow rules can express. A layer that works by *draining* (a rainscreen gap) or by *time* (a fire rating) has its effect in the info text, not in the dots. Do not promise students a visible effect the engine cannot draw; say in `effects` or the lesson activity what to read instead.
- The engine's "hole" mode removes about 18 percent of one layer's cross dimension at the center. It shows that a hole defeats a barrier; it does not model a specific failure.
- Do not copy drawings, captions, or wording from copyrighted construction texts. The engine draws original hatch patterns; keep the spec's sentences in your own words.

## Quiz mode, MasterFormat tags, and currency notes

Three features come from the book's `next-steps.md` list and need no extra files:

- **Quiz me (idea 10).** Every sim can quiz the student on its own drawing: layer names are hidden, a question is generated from the `what`, `why`, and `stops` text, and the student clicks the answer. See `references/drawing-conventions.md`. Write each layer's `what` and `why` so they point to that layer alone, because they are the clues.
- **MasterFormat tags (idea 5).** Each layer's `csi` ties it to the specification section a builder would look it up under. The info panel shows it, the lesson page lists it, and `metadata.json` carries it for a future filter on the MicroSims page.
- **What ages (idea 8).** The `currency` block separates timeless physics from code- and product-dependent values, with an as-of date. It becomes a table on the lesson page.

## Authoring tips that save rework

- **Merge thin layers** that students do not reason about separately (primer, tape, fasteners) into the layer they belong to. More than 8 to 10 layers crowds the callouts; 12 is the hard limit.
- **Name layers by function when the material varies**, for example "Air barrier" rather than "Taped OSB", unless the material is the point.
- **One assembly, one idea.** If the story needs two climates (cold and hot-humid), make two specs and two sims rather than one cluttered one.
- **Write `risk` as a consequence**, not a restatement: "Water reaches the sheathing, which dries slowly" teaches more than "The barrier is missing".
- **Vertical stacks** put labels in a right-hand column, so keep `name` short and let `tag` or the auto "stops: ..." line carry the function.

## Maintaining the engine

The engine follows the repo's p5.js rules: `updateCanvasSize()` is the first statement in `setup()`, the canvas is parented to the bare `<main>`, controls are p5 built-ins created before they are positioned, and no variable shadows a p5 function (`box`, `alpha`, `color`, and similar will log a warning). To add a hatch or material, add its key to `MATERIALS`, add a `case` in `hatch()`, add a row to `references/drawing-conventions.md`, and run the example specs through the validator and a browser check. To support a new assembly shape (not a stack), do not stretch this engine: read `references/trade-extensions.md` first.

## References

- `references/spec-schema.md` - every field of the `ASSEMBLY` object, with defaults and limits.
- `references/drawing-conventions.md` - the hatch legend, color rule, label rules, and print mode.
- `references/trade-extensions.md` - how electrical, HVAC, and plumbing relate to this skill and what to build next.
- `references/csi-masterformat.md` - the MasterFormat sections in use and how to choose one.
- `references/integration-checklist.md` - the project rules (nav, status, strict build) in one place.
- `assets/example-spec.js`, `assets/example-spec-roof.js` - complete working specs.
