# The Six S's of Shearing Layers — Image Generation Prompt

Please generate a new image.

## Critical Rule

**This image must contain absolutely no text of any kind.** No title, no headings, no labels, no letters, no numerals, no captions, no logos, no watermark, and no signs with readable writing. Tick marks on a ruler are allowed only if they carry no numerals. All names, descriptions, and the title are added later by an interactive HTML overlay driven by a separate data file. If any lettering or numbers appear anywhere in the picture, regenerate.

## Image Specifications

- **Format:** PNG
- **Dimensions:** 1536 × 1024 px, landscape, 3:2 ratio
- **Background:** Warm cream (#FBF6EC) with a very faint blueprint grid
- **Audience:** College undergraduates in construction, architecture, and building-systems programs; adult but friendly
- **Style:** Clean modern flat-vector technical illustration with soft shading and a consistent line weight, saturated but professional colors, in the same family as a flat cartoon mascot. Technically accurate building components. No photorealism, no 3D render look.

## What to Draw

One poster that shows a single building taken apart into **six horizontal bands stacked top to bottom**, like the layers of a cake pulled slightly apart. Each band is one of Stewart Brand's six shearing layers, ordered from the slowest-changing at the top to the fastest-changing at the bottom. Every band is a full-width rounded rectangle with a thin colored border, separated from its neighbors by a clear horizontal gap of about 0.8% of the image height so the bands read as distinct, separable regions.

Inside every band, the **left 55%** shows a drawing of that layer in the building, and the **right 40%** shows a long horizontal bar that represents how long that layer lasts. All six bars start at the same left edge (about 62% from the left) so their lengths can be compared at a glance. The bar lengths grow shorter as you go down: very long at the top, shortest at the bottom. Bars are plain colored shapes with small blank tick marks and no numbers.

Keep a safe margin of about 2% on every side. Nothing important may cross a band boundary.

### Region map (each band is an interactive region)

| Band | x from | x to | y from | y to | Accent color |
|---|---|---|---|---|---|
| Site | 2% | 98% | 2.0% | 17.4% | Sage green #6B8E4E |
| Structure | 2% | 98% | 18.2% | 33.6% | Chestnut brown #8B5A2B |
| Skin | 2% | 98% | 34.4% | 49.8% | Blue #2468A2 |
| Services | 2% | 98% | 50.6% | 66.0% | Violet #7453A1 |
| Space Plan | 2% | 98% | 66.8% | 82.2% | Gold #D39B1C |
| Stuff | 2% | 98% | 83.0% | 98.0% | Brick red #C95343 |

### 1. Site

**Position:** Top band, full width, y from 2.0% to 17.4%.
**Visual:** Left 55%: a slice of terrain seen in side section. Green grass surface on top, a layered soil profile beneath (dark topsoil, tan subsoil, grey gravel, a wavy blue groundwater line near the bottom of the band). A thin dashed property line rises as two small survey stakes with orange flags at the left and right ends of the plot. A small empty building footprint outline in pale gray sits on the surface, suggesting the building is temporary and the land is not. Right 40%: the longest bar of the poster, sage green, running almost to the right border, with a small infinity-style loop symbol at its end (a shape, not a letter).

### 2. Structure

**Position:** Second band, y from 18.2% to 33.6%.
**Visual:** Left 55%: a cutaway of a concrete foundation wall and footing with a heavy timber and steel frame above it. Show two columns, a beam spanning between them, and a floor deck. Warm chestnut and steel-gray tones, with a hint of rebar in the footing. Right 40%: a long chestnut bar, about 80% of the length of the Site bar, with a gradient that fades at the right end to suggest an uncertain upper range.

### 3. Skin

**Position:** Third band, y from 34.4% to 49.8%.
**Visual:** Left 55%: the weather-facing surface of a building shown as a wall section from the outside. Overlapping horizontal lap siding in blue-gray, a double-hung window with two panes of reflective glass, a roof edge with shingles and a metal gutter, and a few raindrops and a snowflake falling on it. The outer surface is drawn as a thin panel visibly separated from the frame behind it by a narrow gap. Right 40%: a medium blue bar, about 35% of the Site bar's length.

### 4. Services

**Position:** Fourth band, y from 50.6% to 66.0%.
**Visual:** Left 55%: a wall and ceiling cutaway showing the building's working systems: a red and blue pair of water pipes, a silver rectangular HVAC duct with a round branch, a bundle of yellow and black electrical cables entering a metal electrical panel, and a small red fire sprinkler head hanging from a ceiling pipe. Violet accent trim on the band border only; the systems themselves use realistic trade colors. Right 40%: a short violet bar, about 20% of the Site bar's length.

### 5. Space Plan

**Position:** Fifth band, y from 66.8% to 82.2%.
**Visual:** Left 55%: a top-down floor plan seen at a slight angle, showing a rectangular room divided by thin partitions with door swings, one partition drawn in dashed light gold to suggest it can be moved, and a ceiling grid hint along the top edge. Gold and warm gray tones. Right 40%: a bar of two parts, a short gold segment and a longer faded gold extension, to show the wide range between commercial and residential lifespans, about 18% of the Site bar's total length.

### 6. Stuff

**Position:** Bottom band, y from 83.0% to 98.0%.
**Visual:** Left 55%: a cheerful cluttered corner of a room: a desk with a laptop, a stack of books, a desk lamp, a rolling office chair, a plant, a cardboard moving box, and a bookshelf with uneven items. Brick red and warm orange accents. Right 40%: the shortest bar, brick red, only about 6% of the Site bar's length, with small motion lines behind it to suggest rapid change.

### Beau the Beaver cameo

In the lower-right corner of the Stuff band, in the empty space to the right of the short bar, draw Beau the Beaver at about 7% of the image width: a round, sturdy beaver with warm chestnut-brown fur (#8B5A2B), a cream belly, two small buck teeth, and a flat paddle tail, wearing a safety-orange hard hat (#F57C00) and a small tan tool belt with a tape measure, with large kind eyes. Beau stands with one paw on chin and a small lightbulb above the hard hat, in a thoughtful pose. Beau must not touch the band borders or cover the bar.

## Layout Notes

- The six bands are the whole composition. Do not add a title bar, header, footer, legend, or side panel.
- Keep the six left-hand drawings visually consistent with each other: same line weight, same flat-vector style, same lighting from the upper left.
- Between bands, leave a clear cream gap. Do not let drawings, shadows, or glows spill into the gap.
- Colors identify the layers, so keep each band's accent color visible on its border and its bar.
- The bar lengths must visibly shrink from top to bottom. That ordering is the core idea.

## Do Not Include

- Any text, letters, numbers, labels, or captions
- A title or heading
- Arrows with text, speech bubbles with writing, or signs with readable words
- Photorealistic people or faces other than Beau
- Brand names or logos
- A watermark or signature

## After Generating

1. Confirm there is no text anywhere. Regenerate if any appears.
2. Save the file as `docs/posters/six-s-shearing-layers/six-s-shearing-layers.png`, replacing the placeholder.
3. Open `main.html?edit=true`, drag the zone corners until each rectangle matches its band, and copy only the `x1`, `y1`, `x2`, `y2` values back into `data.json`.
4. Change `status:` in `index.md` from `scaffold` to `built`.
