# Drawing conventions

These conventions are what make every assembly in the book read the same way. They are the starting point for the book-wide hatch and symbol legend (next-steps idea 6), so change them deliberately and update every sim through `assembly_tool.py sync`.

## The color rule

**Line art is the object; color is the invisible flow.**

- Layers are drawn as black line work on white (or a pale fill). The Line art checkbox removes the fills and turns the flow dots into black rings, so the diagram prints and photocopies cleanly and works for color-blind readers.
- Saturated color is reserved for the moving flow dots. Use these colors for the same flows in every sim, poster, and chart:

| Flow | Color | Notes |
|---|---|---|
| Rain / liquid water | `dodgerblue` | Bulk water: rain, runoff, groundwater. |
| Air | `seagreen` | Air leakage, convection, ventilation air. |
| Vapor | `purple` | Water vapor diffusion. |
| Heat | `darkorange` | Conduction. Use `#c62828` for the temperature profile line. |
| Fire / smoke | `firebrick` | Use for fire-rated assemblies. |
| Sound | `goldenrod` | Use for acoustic assemblies. |
| Electric current | `royalblue` | Reserved for the planned run-system skill. |

If you add a flow, add its row here so the next author reuses it.

## Hatch legend

Each `material` key draws one fixed hatch. Choose the key by what the layer *is*, so the pattern means the same thing in every drawing.

| Key | Looks like | Use for |
|---|---|---|
| `earth` | short slanted ticks | Soil, backfill |
| `gravel` | small circles | Stone, ballast, drainage fill |
| `sand` | dense dots | Sand, mortar bed |
| `concrete` | dots and small triangles | Cast concrete, slabs |
| `masonry` | brick courses | Brick, block, stone veneer |
| `wood` | wavy grain lines | Studs, joists, solid lumber |
| `sheet` | dashed parallel lines | OSB, plywood, siding panels |
| `batt` | wavy loops | Batt and blown fibrous insulation |
| `rigid` | diagonal lines | Foam board, mineral wool board |
| `foam` | bubbles | Spray foam |
| `membrane` | solid fill | Thin sheets: WRB, air barrier, vapor retarder, roofing membrane |
| `airspace` | light dotted lines | Drainage gaps, ventilated cavities, still air |
| `gypsum` | dots and dashed diagonals | Gypsum board, plaster |
| `metal` | solid fill | Steel deck, flashing, studs seen in section |
| `glass` | light diagonals | Window glass |
| `finish` | solid gray | Paint or very thin finishes |

The Legend checkbox is **on by default** and draws a swatch row for the materials used in the current assembly. Students can untick it to hide the legend; Reset turns it back on. A horizontal stack reserves the bottom strip of the drawing for the legend, so bottom callouts stop above it.

## Labels

- **Callout (level 1): what it is.** A number plus a short noun phrase ("3 WRB", "6 Stud cavity"). Under it, a gray line says what the layer stops ("stops: rain"). Numbers run from side A to side B and match the Break checkboxes.
- **Detail panel (level 2): why.** What it is, why it is there, and what happens if it fails or is now missing. This is the part a static page cannot carry.
- **Names are functions or common trade terms,** not marketing names. Say "Rigid foam", not a brand.
- **Sentences** in `what`, `why`, and `risk` are complete and end with a period.

## Units

- Thickness is authored in inches and shown as fractions to 1/16 in (IP) or millimeters (SI).
- R-values are authored as R (IP) and shown as RSI in SI (RSI = R x 0.1761).
- Temperatures are authored in degrees F and shown as degrees C in SI.

## Layout facts the engine handles for you

- Layer sizes are proportional to thickness, with a minimum size per layer so a 0.02 in membrane is still visible. The panel notes when thin layers are exaggerated.
- Horizontal stacks place labels above and below, greedily choosing the lowest free level so text and leader lines never cross. Vertical stacks place labels in a right-hand column and spread them so two-line labels never overlap.
- The explode slider separates layers by up to 30 px along the stacking axis; flows still cross the gaps.
