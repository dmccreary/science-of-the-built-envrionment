# Idea to Occupancy — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no arrows with writing, no signs with readable writing, no logos, no watermark. Phase names, role names, dates, and all explanations appear only in the interactive overlay driven by a separate data file. Milestone signs are blank shapes with a simple pictogram. Chart axes carry only unlabeled tick marks. Stamps, clipboards, and certificates are drawn as plain shapes with scribbled lines that are not letters. All labeling is added later by the HTML overlay. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1536 × 1024 px, landscape, 3:2 ratio
- **Background:** Warm cream (#FBF6EC) with a very faint blueprint grid
- **Audience:** College undergraduates in construction, architecture, and building-systems programs; adult but friendly
- **Style:** Clean modern flat-vector technical illustration with soft shading and a consistent line weight, saturated but professional colors, in the same family as a flat cartoon mascot. Technically accurate building components. No photorealism, no 3D render look.

## What to Draw

One poster made of **eight tall, evenly spaced columns**, one per phase of a building project, reading left to right from the first idea to the occupied building. Each column is a rounded rectangle with a thin border in its accent color and a very pale tint of that color inside. Columns are separated by a clear cream gutter of about 0.8% of the image width. Keep a 2% safe margin on every side.

A winding road enters the left edge of the first column and leaves the right edge of the last column, passing through the upper part of every column. It crosses each gutter as a thin neutral gray strip only. Every column has the same four stacked bands, so the eye can compare phases straight across.

1. **Milestone band (top, about 3% to 24% from top).** A short piece of the road with a blank rounded signpost and a small vignette of what is happening in that phase.
2. **Swim-lane band (about 26% to 62% from top).** Seven thin horizontal lanes, always in the same top-to-bottom order: owner, architect, structural engineer, mechanical engineer, electrical designer, contractor, code official and inspector. Each lane has its own constant color across all eight columns. A colored bar sits in each lane. **Bar thickness shows how active that role is in that phase** (thick = most active, thin sliver = lightly involved, none = absent). This is a qualitative sketch, not data.
3. **Influence band (about 64% to 90% from top).** A pale chart area with two smooth conceptual curves that run continuously across all eight columns: a **falling green curve** (ability to influence cost and performance, highest on the left) and a **rising red curve** (cost of making a change, lowest on the left, steepest on the right). They are drawn as smooth sketch lines with no axes numbers, no gridline labels, no data points.
4. **Gate band (about 91% to 97% from top).** A small flag-on-a-post at the right end of every column, the approval gate between phases.

Nothing important may cross a column border except the thin road, the two curves, and a thin neutral baseline.

### Region map (each column is an interactive region)

| Column | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Programming | 2.0% | 13.3% | 2.0% | 98.0% | Sage green #6B8E4E |
| Schematic Design | 14.1% | 25.4% | 2.0% | 98.0% | Blue #2468A2 |
| Design Development | 26.2% | 37.5% | 2.0% | 98.0% | Violet #7453A1 |
| Construction Documents | 38.3% | 49.6% | 2.0% | 98.0% | Gold #D39B1C |
| Bidding and Procurement | 50.4% | 61.7% | 2.0% | 98.0% | Brick red #C95343 |
| Construction | 62.5% | 73.8% | 2.0% | 98.0% | Safety orange #FF6A13 |
| Commissioning | 74.6% | 85.9% | 2.0% | 98.0% | Teal #1ABC9C |
| Occupancy and Closeout | 86.7% | 98.0% | 2.0% | 98.0% | Chestnut #8B5A2B |

### Swim-lane colors and activity levels

Lane colors never change between columns: owner dark slate #34495E, architect blue #2468A2, structural engineer chestnut #8B5A2B, mechanical engineer slate-teal #16A085, electrical designer bright amber #F5A623, contractor safety orange #FF6A13, code official and inspector deep green #1E6B3A. Use these thicknesses (H = thick, M = medium, L = thin sliver, none = no bar):

| Lane | Prog. | Schem. | Dev. | Docs | Bid | Constr. | Comm. | Occ. |
|---|---|---|---|---|---|---|---|---|
| Owner | H | M | L | L | H | M | M | H |
| Architect | H | H | H | H | M | M | L | M |
| Structural engineer | none | M | H | H | L | L | none | none |
| Mechanical engineer | none | M | H | H | L | L | M | L |
| Electrical designer | L | M | H | H | L | M | M | L |
| Contractor | none | none | none | none | H | H | H | M |
| Code official and inspector | none | none | none | L | M | H | L | H |

### Programming

**Position:** First column, x from 2.0% to 13.3%, full height.
**Visual:** Milestone band: the road begins here with a green start flag and a blank wooden signpost. A tiny vignette shows two people (diverse adult figures, no faces) at a table with a rolled site plan, a clipboard with scribbled lines, and a stack of room-shaped blocks of different sizes. Swim lanes use the activity table above. The two curves begin at their extremes: green curve at its highest point, red curve at its lowest.

### Schematic Design

**Position:** Second column, x from 14.1% to 25.4%, full height.
**Visual:** Milestone band: a blue signpost and a vignette of a loose pencil sketch of a one-story building with a small courtyard, next to a tiny foam massing model of three block shapes. Lanes per the table. In the electrical lane, add a tiny utility transformer pictogram and a small square electrical-room outline.

### Design Development

**Position:** Third column, x from 26.2% to 37.5%, full height.
**Visual:** Milestone band: a violet signpost and a vignette of a building cross-section with a wood beam, a rooftop heating unit, a panel board, and a ceiling light, each in its trade color. Lanes per the table. Between the structural, mechanical, and electrical lanes, draw small interlocking gear icons to show coordination.

### Construction Documents

**Position:** Fourth column, x from 38.3% to 49.6%, full height.
**Visual:** Milestone band: a gold signpost and a vignette of a thick bound set of drawings and a spec book, with three transparent colored sheets overlaid and a tiny red circle where a duct crosses a beam. Lanes per the table. A small clipboard and rubber-stamp pictogram sits at the right end of the code official lane, hinting at plan review.

### Bidding and Procurement

**Position:** Fifth column, x from 50.4% to 61.7%, full height.
**Visual:** Milestone band: a brick-red signpost and a vignette of three sealed envelopes on a table beside a tiny handshake pictogram and a small switchboard box on a pallet. Lanes per the table. A permit-card shape (a plain rectangle with a stamp circle) sits in the code official lane.

### Construction

**Position:** Sixth column, x from 62.5% to 73.8%, full height.
**Visual:** Milestone band: an orange signpost and a vignette of a framed wall with a small crane, a hard-hatted worker silhouette (no face), and an inspector silhouette holding a clipboard beside open conduit in the wall. Lanes per the table. The code official lane is the thickest dark-green bar of the poster here, with two small inspection-checkmark icons.

### Commissioning

**Position:** Seventh column, x from 74.6% to 85.9%, full height.
**Visual:** Milestone band: a teal signpost and a vignette of a rooftop unit with a small laptop beside it, a light fixture with a green check shape, and an emergency exit sign shape that carries no letters, only a plain running-figure pictogram. Lanes per the table.

### Occupancy and Closeout

**Position:** Last column, x from 86.7% to 98.0%, full height.
**Visual:** Milestone band: a chestnut signpost and a vignette of a finished one-story building with a warm lit door, a small key, and a rolled certificate with a ribbon (scribbles, not letters). The road ends at the door. In the code official lane, add a small stamp-and-certificate pictogram.

### Electrical designer highlight

Across all eight columns, draw a soft amber (#F5A623) glow around the electrical designer lane, a little brighter and wider than the other lanes. In the second, third, and fourth columns, short amber arrows with rounded ends link the electrical lane to the architect, structural, and mechanical lanes above it, showing coordination.

### Beau the Beaver cameo

Inside the first column, in the clear cream space of the milestone band to the left of and below the signpost (about 4% to 11% from left, 12% to 22.5% from top), draw Beau the Beaver at about 7% of the image width: a round, sturdy beaver with warm chestnut-brown fur (#8B5A2B), a cream belly, two small buck teeth, and a flat paddle tail, wearing a safety-orange hard hat (#F57C00) and a small tan tool belt with a tape measure, with large kind eyes. Beau is waving a welcome at the start of the road. Beau must not touch the column border, the road, or the signpost.

## Layout Notes

- The poster's core idea is the **left-to-right sequence**. A decision made in an earlier column limits every column after it, and the falling green and rising red curves make that visible.
- Keep the seven lane colors identical in every column. The same lane must sit at the same height in all eight columns so rows can be traced across the whole poster.
- Keep line weight, rounded corners, and upper-left lighting identical across all columns. Only the accent color and vignette change.
- The amber electrical highlight and the dark-green code-official bars should be the most visible lanes after the column borders.
- Between columns leave a clean cream gutter. Do not let vignettes, shadows, or glows spill into it.

## Do Not Include

- Any text, letters, numbers, labels, or captions
- A title, heading, legend, or axis labels
- Signs, stamps, or certificates with readable words
- Photorealistic people or faces other than Beau
- Brand names or logos
- A watermark or signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/idea-to-occupancy/idea-to-occupancy.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its column, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
