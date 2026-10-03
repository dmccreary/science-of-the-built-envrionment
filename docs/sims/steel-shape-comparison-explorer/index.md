---
title: Steel Shape Comparison Explorer
description: Students will compare (Bloom Level 4, Analyze) the stiffness, weight, and efficiency of rectangular, wide-flange, and tube cross-sections of equal area, and will explain (Bloom Level 2, Understand) why material far from the neutral axis resists bending most effectively.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Steel Shape Comparison Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md).

```text
Type: microsim
**sim-id:** steel-shape-comparison-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) the stiffness, weight, and efficiency of rectangular, wide-flange, and tube cross-sections of equal area, and will explain (Bloom Level 2, Understand) why material far from the neutral axis resists bending most effectively.

Visual: Side-by-side drawings of a solid rectangle, a wide-flange I, and a hollow rectangular tube, each with a dashed neutral axis, drawn to scale. Beneath each shape, a bar shows the computed moment of inertia, and a small beam diagram shows the deflection under the same load. The canvas follows the container width with a height of 480 px.

Controls: A slider labeled "Cross-sectional area (in²)" (4 to 20) holds the area equal across the three shapes. A slider labeled "Depth (in.)" (4 to 24) changes the depth, and a slider labeled "Flange thickness" changes the I and tube proportions. A drop-down labeled "Orientation" lets the student rotate a rectangular beam between flat and on edge.

Interactions: Dragging the sliders redraws the shapes and updates \( I \), weight per foot, and deflection. Hovering over a shape shows a stress diagram with tension above and compression below, shaded in color intensity. Clicking a shape opens an infobox with the designation, typical use, and a one-sentence explanation of why it performs as it does. A "Match the shape" quiz mode names a use, such as a column or a long-span beam, and asks the student to select the shape.

Colors: Material is steel gray, tension stress is blue, and compression stress is red. All stresses are also labeled with plus and minus symbols.

Implementation: p5.js with DOM sliders and a drop-down, and a responsive canvas.
```

## Related Resources

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
