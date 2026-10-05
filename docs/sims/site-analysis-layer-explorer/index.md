---
title: Site Analysis Layer Explorer
description: Students switch six layers of site information on and off over the imagined 300 ft by 200 ft Riverbend lot and drag the 120 ft by 75 ft building to see which setbacks, easements, wet areas, and slopes it overlaps.
image: /sims/site-analysis-layer-explorer/site-analysis-layer-explorer.png
og:image: /sims/site-analysis-layer-explorer/site-analysis-layer-explorer.png
twitter:image: /sims/site-analysis-layer-explorer/site-analysis-layer-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze
---

# Site Analysis Layer Explorer

<iframe src="main.html" width="100%" height="577" scrolling="no"></iframe>

[Run the Site Analysis Layer Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/site-analysis-layer-explorer/main.html" width="100%" height="577" scrolling="no"></iframe>
```

## Description

Students switch six layers of site information on and off over the imagined 300 ft by 200 ft Riverbend lot and drag the 120 ft by 75 ft building to see which setbacks, easements, wet areas, and slopes it overlaps.

## How to Use

1. Use the six checkboxes to show or hide setbacks, contours, soil borings, sun and wind, utilities, and the wet area. Hover over any element to read what it means for design.
2. Drag the blue building rectangle anywhere on the lot. The outline stays green in a legal position and turns red when the building crosses a setback, the sewer easement, or the wet area.
3. Read the panel for the envelope area, the area left after the shown hard constraints, the building's share of the envelope, the service-line length, and the cost note for each conflict.
4. Press Reset building position to return to the legal default.

## Lesson Plan

**Learning objective:** Analyze how legal, topographic, soil, climate, and utility constraints combine to shrink the buildable area of a parcel, and examine how moving a building changes its exposure to them.

**Suggested activities**

- Warm-up (5 min): With only Setbacks on, students confirm the 43,400 ft2 envelope and the 21 percent figure from the Chapter 9 worked example.
- Explore (10 min): Students turn on one layer at a time and record how the open area changes, then find the largest legal position that also avoids the steep bank.
- Analyze (10 min): Students find a position that minimizes the service line without any red outline, and explain the tradeoff with the sun and wind layers.

**Assessment**

- Students list the constraints that most limit the Riverbend lot and rank them by how much area each removes.
- Students write two sentences explaining why a site map should be drawn before the floor plan.

## References

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
- [Setback (land use) (Wikipedia)](https://en.wikipedia.org/wiki/Setback_(land_use))
- [Easement (Wikipedia)](https://en.wikipedia.org/wiki/Easement)

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
