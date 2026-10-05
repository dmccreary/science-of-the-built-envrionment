# Trade applications

The range explorer is for "which option works at this value?" questions. These are the candidates already on the book's list, with what each needs. Data for each must come from the chapter or be marked illustrative.

| Topic (chapter) | Axis | Items | Notes |
|---|---|---|---|
| Structural spans (7, 8) | span, ft (with SI) | framing and slab systems | The pilot. Ranges are illustrative; the chapters give none. |
| Conductor sizing (15, 16) | load, A | 14, 12, 10, 8, 6 AWG | Chapter 15 names these gauges. Ampacity values must come from the chapter or code; mark them as the code edition in force. Breaker rating and the 80 percent continuous-load rule belong to the existing circuit breaker sim, so link to it. |
| Conduit fill (16) | wires, count | trade sizes | Chapter 16 states the fill limit. One axis works only if the wire size is fixed in the caption. |
| Duct sizing (14) | airflow, cfm | round and rectangular sizes | Pressure drop and velocity limits make this two-variable at full detail; the explorer covers the first pass only. |
| Pipe sizing (14) | fixture units | drain and vent sizes | Use the plumbing code's table values and cite the edition in `currency`. |
| Insulation (11, 19) | R-value | insulation types at a thickness | The book already has an R-per-inch chart; extend it only if the range framing adds something. |

## When it is the wrong tool

- **Two inputs at once** (span and load): build a calculator sim instead. A range chart can hold one axis honestly.
- **Sorting exercises** (soil classification): the book already has `uscs-soil-classifier`.
- **Stacks of layers**: use `layered-assembly-infographic`.
- **Chains along a path** (service entrance to outlet): the planned run-system skill (next-steps idea 11).

## Shared with the other skills

Scaffolding (main.html, metadata.json, index.md, the "What Ages in This Sim" section, the engine-drift check) lives in `skills/_shared/simkit.py`, so the two skills cannot drift apart. The conventions that stay consistent across the toolkit: strict-JSON spec files, `chapter` and `lesson` blocks, `currency` notes, 640 px minimum test width, `status: built` only.
