---
title: Site Analysis Layer Explorer
description: Students will analyze (Bloom Level 4, Analyze) how legal, topographic, soil, climate, and utility constraints combine to reduce the buildable area of a parcel, and will examine (Bloom Level 4, Analyze) how moving a building changes its exposure to those constraints.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Site Analysis Layer Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md).

```text
Type: microsim
**sim-id:** site-analysis-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how legal, topographic, soil, climate, and utility constraints combine to reduce the buildable area of a parcel, and will examine (Bloom Level 4, Analyze) how moving a building changes its exposure to those constraints.

Visual: A plan view of the imagined 300 ft by 200 ft Riverbend lot with a north arrow and scale bar. Layers can be drawn over a light base map: property line and setbacks (dashed red), contour lines (brown, with a downhill arrow), soil boring locations with a small label of the soil found (blue dots), a sun path and prevailing winter wind arrow (yellow and gray), utility lines and easements (green), and a low wet area (light blue). A 120 ft by 75 ft building rectangle can be dragged anywhere on the lot. The canvas width follows the container, the height is 460 px, and the layout redraws on window resize.

Controls: Six checkboxes (one per layer) toggle each layer. A "Reset building position" button returns the rectangle to the default location. A readout beneath the canvas reports the buildable envelope area, the building's percentage of that area, and the number of constraints the building currently overlaps.

Interactions: Hovering over any layer element shows a tooltip describing what it means for design (for example, "Sewer easement: no building above this line"). Dragging the building turns its outline red when it crosses a setback, easement, or wet area, and a message explains which constraint was violated and what it would cost to resolve.

Default state: All layers on, building in a legal position near the center of the envelope, readout showing 43,400 ft² and about 21 percent.

Implementation: p5.js with built-in checkboxes and a button, a draggable rectangle with rectangle-overlap tests, and a responsive canvas.
```

## Related Resources

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
