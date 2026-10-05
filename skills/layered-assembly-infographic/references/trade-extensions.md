# Trade extensions: what this skill covers and what comes next

This skill is the first of a small toolkit. The strategy (see `docs/learning-graph/next-steps.md`) is to build one **project skill per teaching pattern**, each with a data format, a shared engine, shared conventions, and a validator, so the electrical, HVAC, plumbing, and finishes books can reuse the same look and the same habits.

## What version 1 covers

`kind: "stack"`: a cross-section made of layers in a row. Good fits:

| Trade / topic | Example assemblies | Typical flows |
|---|---|---|
| Enclosure | Exterior wall, roof, slab on grade, below-grade wall, window head/sill | Rain, air, vapor, heat |
| Framing and finishes | Floor assembly, interior partition, ceiling | Sound, fire, heat |
| Fire and life safety | Fire-rated wall or floor-ceiling assembly | Fire, smoke, heat |
| Plumbing, HVAC, electrical (limited) | Insulated pipe or duct wall; wall cavity penetration firestopping | Heat, fire, condensation |

If a topic is a stack of materials that something moves through, it fits.

## What it does not cover

| Pattern | Examples | Why not a stack |
|---|---|---|
| **Run** (chain of components along a path) | Electrical service -> meter -> main -> panel -> breaker -> circuit; plumbing drain -> trap -> vent -> stack; HVAC supply -> filter -> coil -> duct -> register | Position along a path matters; parts are not layers of one thickness. |
| **Exploded 3D** | A framed corner, a roof truss connection | Needs depth, not a 2D section. |
| **Plan view** | A floor plan with circuits or ducts | A different geometry and different interactions. |

When a request is one of these, do not bend this engine. Tell the user it is not covered, point to next-steps idea 11, and offer to use `microsim-generator` for a one-off sim in the meantime.

## How a future `run-system-infographic` skill would mirror this one

Keeping the same four parts means authors learn one habit:

1. **Data format.** An ordered list of *stages* (service, meter, main, panel, breaker, circuit, device) with `what`, `why`, `risk`, like layers; and *flows* (current, fault current, water, sewer gas, air) with the same `from`, `stops`, `slows` logic.
2. **Engine.** Draws stages as symbols joined by a path, with the same numbered leader-line callouts and the same layer checkboxes (untick to break). "Break a stage" removes the ground, oversizes the breaker, drops the vent, or blocks the duct, and shows what now happens.
3. **Conventions.** Reuses this skill's color rule (line art is the object, color is the flow), flow colors, unit toggle, and print mode. Electric symbols follow the standard drawing symbols; plumbing and HVAC symbols follow common trade conventions.
4. **Validator.** Same pattern: required `what`/`why`/`risk`, flow references check, stage limits, engine version drift.

Build it after this skill has been used on several real assemblies, so we know what actually generalizes instead of guessing.

## Shared pieces worth extracting later

If a second skill is built, these belong in a shared place rather than copied:

- the flow-color table (`drawing-conventions.md`);
- unit formatting (`fmtThickness`, `fmtR`, `fmtTemp` in the engine);
- the hatch/symbol legend;
- the scaffold logic that writes `index.md`, `metadata.json`, and `main.html`;
- the engine-drift check.

Until then, keep them here and note any new duplication in next-steps.

## Related ideas on the list

- Idea 3: use these assemblies as the clickable parts of an exploded-building table of contents.
- Idea 5: tag each assembly with its CSI MasterFormat division when that convention is decided.
- Idea 10: the same layer data can generate "label the layer" and "which layer stops this flow" quiz items.
