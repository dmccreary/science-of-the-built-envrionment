---
title: Riverbend Structural System Explorer
description: Students will classify (Bloom Level 2, Understand) each element of a simple wood-framed building as part of the gravity load system, the lateral load system, or both, and will identify (Bloom Level 1, Remember) the strength, stiffness, and stability requirement that each element helps satisfy.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Riverbend Structural System Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md).

```text
Type: microsim
**sim-id:** riverbend-structural-system-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each element of a simple wood-framed building as part of the gravity load system, the lateral load system, or both, and will identify (Bloom Level 1, Remember) the strength, stiffness, and stability requirement that each element helps satisfy.

Visual: A cutaway three-dimensional-style view of the idealized Riverbend building (120 ft by 75 ft, 14 ft eave) showing the foundation, wall framing, roof deck, joists, glulam girders over the multipurpose room, posts, and the roof diaphragm. The canvas width follows the container and the height is 480 px. Elements are drawn in a flat, labeled style so that every part is visible at once.

Controls: Radio buttons labeled "Show gravity system," "Show lateral system," and "Show both" fade elements in and out. Checkboxes for "Dead load," "Snow load," and "Wind load" draw arrows of proportional length on the building. A slider labeled "Wind speed" (70 to 130 mph) rescales the wind arrows according to the square of speed.

Interactions: Hovering over an element highlights it and shows its name. Clicking an element opens an infobox with its definition, whether it belongs to the gravity system, the lateral system, or both, and what it hands the load to next. A "Remove this element" button on the infobox grays out the element and displays a one-sentence message about which requirement (strength, stiffness, or stability) would be at risk.

Colors: Gravity elements are blue, lateral elements are orange, and elements that serve both are striped blue and orange. Labels are text, not color alone.

Implementation: p5.js with a responsive canvas, DOM radio buttons, checkboxes, and slider, and an infobox div.
```

## Related Resources

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
