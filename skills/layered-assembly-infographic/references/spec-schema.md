# ASSEMBLY spec schema (`layered-assembly/1`)

The spec is one JavaScript constant, `const ASSEMBLY = {...};`, whose value is **strict JSON**: double-quoted keys and strings, no comments, no trailing commas. `assembly_tool.py` parses it with a JSON reader, so a stray comma fails validation. Put comments above the `const`, outside the object.

## Contents

- Top-level fields
- `conditions` (optional temperature profile)
- `flows`
- `layers`
- `chapter` and `lesson`
- Limits at a glance

## Top-level fields

| Field | Required | Notes |
|---|---|---|
| `schema` | yes | Always `"layered-assembly/1"`. |
| `kind` | yes | `"stack"`. Other kinds are rejected with a pointer to next-steps idea 11. |
| `id` | yes | Kebab-case; must equal the sim folder name. |
| `title` | yes | Drawn centered in a large bold font (26 px, shrinking to fit) in a title band across the top of the canvas, and used as the page title. Two to four words works best; a name wider than the canvas shrinks down to 16 px. |
| `direction` | no | `"horizontal"` (default; left to right, walls) or `"vertical"` (top to bottom, roofs and slabs). |
| `sideA`, `sideB` | yes | Names of the two faces. Layers are listed from A to B. Example: `"Outside"`, `"Inside"`. |
| `caption` | no | One or two sentences shown in the info panel before a layer is selected. Say what to do and note any teaching-model limits. |
| `drawHeight` | no | Height of the drawing area in px (default 400). Raise to 440 or more for vertical stacks with many layers. |
| `stackSize` | no | Cross dimension of the stack in px (default 130 horizontal, 260 vertical). |
| `units` | no | `"IP"` (default) or `"SI"`: the starting unit system. Students can toggle. |
| `quiz` | no | The **Quiz me** control is on by default. Set `false` to remove it (and its control row). |
| `currency` | recommended | What is timeless and what ages in this sim; see "`currency`" below. The validator warns if it is missing. |
| `background` | no | CSS color for the title band and drawing area. Default `"aliceblue"`, the book-wide MicroSim standard; the info panel and controls below stay white. Change it only when a sim needs a different tint. |
| `legend` | no | The hatch legend is **on by default** and students can untick the Legend checkbox. Set `false` only to start with it hidden. |

## `conditions` (optional)

Turns on the Temperature checkbox and slider. Requires at least one layer with `r`.

| Field | Notes |
|---|---|
| `tempA` | Starting side-A temperature in degrees F (the slider value). Side A can be the warm side (a heated slab over cold ground) or the cold side (a wall); the plot range adapts. |
| `tempB` | Fixed side-B temperature in degrees F. The slider caption uses `sideA` and `sideB` names (text in parentheses is dropped), so name them for the physical places: "Heated room", "Ground". |
| `tempRange` | `[low, high]` slider range in degrees F. Default `[-20, 40]`. |
| `dewPoint` | Dew point of the side-B air in degrees F. A layer with `sensitive: true` turns red when it falls below this. |
| `rFilmA`, `rFilmB` | Surface film R-values. Defaults 0.17 and 0.68. |

## `flows`

Each flow is something that moves through the assembly. Two to four is typical; five is the maximum.

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Referenced by layers' `stops` and `slows`. |
| `name` | yes | Short; becomes the checkbox label and status text ("Rain", "Air", "Vapor", "Heat"). |
| `color` | yes | Any CSS color name or hex. Use the conventions in `drawing-conventions.md`. |
| `from` | no | `"A"` (default) or `"B"`: the side the dots start from. Rain and wind start outside; vapor and heat usually start inside. |

## `layers`

Listed from side A to side B. Two to twelve layers.

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Unique. |
| `name` | yes | Callout text, 16 characters or fewer. |
| `full` | yes | Full name for the info panel title, for example "Rigid foam, 2 in XPS". |
| `t` | yes | Thickness in **inches**, a positive number. The engine converts to mm. |
| `minPx` | no | Minimum drawn size in px (default 6). Thin layers use this so they stay visible; the panel then notes that thin layers are exaggerated. |
| `material` | yes | A key from the hatch legend (below). |
| `what` | yes | One sentence: what the layer physically is. |
| `why` | yes | One sentence: why it is there. This is the book's added value. |
| `risk` | yes | One sentence: the consequence if it fails or is missing. |
| `materials` | no | Typical materials, shown at the bottom of the info panel. |
| `csi` | recommended | CSI MasterFormat section as `"07 26 00 Vapor Retarders"` (six digits in pairs, then the section title). Shown in the info panel and written to `index.md` and `metadata.json`. Omit it for layers with no spec section (an air gap). See `csi-masterformat.md`. |
| `tag` | no | Overrides the gray second callout line. Default is generated: `stops: <flow names>`. |
| `r` | no | R-value (hr-ft2-F/Btu) for the temperature profile. Omit for layers with negligible resistance. |
| `rMissing` | no | R-value that remains when the layer is removed (an empty stud cavity still has about R-1). Default 0. |
| `stops` | no | Flow ids this layer blocks completely while intact. |
| `slows` | no | Flow ids this layer lets a share through. Each slowing layer passes about 40 percent of the dots that reach it, so several slowing layers in a row add up: fewer dots get through a stud cavity with two layers of board on each side than through one board. |
| `sensitive` | no | `true` if the layer must stay warmer than the dew point (for example, wood sheathing). |
| `effects` | no | Custom "what now happens" sentences: `{ "missing": "...", "hole": "..." }`. Without them the info panel shows `risk`. |

Hatch keys: `earth`, `gravel`, `sand`, `concrete`, `masonry`, `wood`, `sheet`, `batt`, `rigid`, `foam`, `membrane`, `airspace`, `gypsum`, `metal`, `glass`, `finish`.

### How `stops` and `slows` behave

For each dot, the engine walks the layers in the direction the flow travels:

- an **intact** layer with the flow in `stops` halts the dot at its face;
- an intact layer with the flow in `slows` halts about 60 percent of the dots that reach it, and the rest continue to the next layer (so slowing layers accumulate);
Every layer has a checkbox under the drawing. It is **ticked while the layer is present**; students untick it to remove the layer or puncture it, depending on the "Unticked layer" selector. Reset ticks them all again.

- a **removed** layer ("Remove the layer") lets everything through;
- a **punctured** layer ("Punch a hole") lets through only dots passing the hole, near the middle of the layer's cross dimension.

The status line in the info panel summarizes the same logic: "stopped at 3 WRB", "slowed at 6 Stud cavity; some reaches outside", "only through the hole", or "reaches inside".

## `currency`

Separates what is timeless from what ages, so readers and future editors know what to check. The scaffold turns it into a "What Ages in This Sim" section on the lesson page, and the sim shows "Values are illustrative, as of <asOf>" when no layer is selected.

```json
"currency": {
  "asOf": "2026-10",
  "timeless": ["Heat flows from warm to cold in proportion to R-value."],
  "ages": [ { "item": "R-values of the foam", "basis": "Chapter 3 approximate values", "check": "Minimum R-value in the adopted energy code" } ]
}
```

`asOf` is a year or year-month. `timeless` and `ages` must not be empty. Every `ages` entry needs `item`, `basis` (where the value came from), and `check` (what to verify, against what). Do not put an invented code citation in `basis`; say "illustrative" instead.

## `chapter` and `lesson`

Needed by `assembly_tool.py new` (use `validate --for-new` to check). They feed `index.md` and `metadata.json`.

```json
"chapter": { "number": 11, "title": "Enclosure Control Layers and Insulation", "dir": "11-enclosure-insulation" },
"lesson": {
  "description": "One or two sentences for the page description.",
  "objective": "Identify ... and predict ...",
  "bloom": "Remember, Understand",
  "bloomVerb": "identify, predict",
  "concepts": ["Control layers", "Air barrier"],
  "prerequisites": ["Heat transfer and R-values"],
  "usage": ["Step 1 ...", "Step 2 ..."],
  "activities": ["Predict and test (10 min): ..."],
  "assessment": ["Name the job of each layer ..."],
  "references": [ { "title": "Building envelope (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Building_envelope" } ]
}
```

`usage` becomes the numbered "How to Use" list and the metadata `recommendedUsage`. Write it as a teacher would say it, not as a feature list.

## Limits at a glance

| Item | Limit | Why |
|---|---|---|
| Layers | 2 to 12 | The layer checkboxes are a fixed two-row grid; callouts crowd beyond about 10. |
| Flows | 0 to 5 | One options row. |
| Layer `name` | 16 characters | Callout width. |
| `what`, `why`, `risk` | about 170 characters | Info panel width. |
| Canvas height | `44 (title band) + drawHeight + 120 + 34 x rows + 6`, rows = 5 (+1 with `conditions`, -1 with `quiz: false`) | The tool computes it and sets the iframe height. |
