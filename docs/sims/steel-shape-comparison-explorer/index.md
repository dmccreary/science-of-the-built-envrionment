---
title: "Steel Shape Comparison Explorer"
description: "Students compare a solid rectangle, a wide-flange I, and a hollow tube of equal area under the same beam load, reading the moment of inertia, weight, and deflection of each. Hovering shows the bending stress, and a quiz asks them to match each shape to a use."
image: /sims/steel-shape-comparison-explorer/steel-shape-comparison-explorer.png
og:image: /sims/steel-shape-comparison-explorer/steel-shape-comparison-explorer.png
twitter:image: /sims/steel-shape-comparison-explorer/steel-shape-comparison-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Understand
---

# Steel Shape Comparison Explorer

<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>

[Run the Steel Shape Comparison Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/steel-shape-comparison-explorer/main.html" width="100%" height="592" scrolling="no"></iframe>
```

## Description

Students compare a solid rectangle, a wide-flange I, and a hollow tube of equal area under the same beam load, reading the moment of inertia, weight, and deflection of each. Hovering shows the bending stress, and a quiz asks them to match each shape to a use.

## How to Use

1. Drag the Area slider. All three shapes keep the same area, so they weigh the same per foot, yet their moments of inertia (the blue bars) and deflections differ.
2. Drag the Depth and Flange thickness sliders to redraw the shapes. Thinner flanges and walls move the steel farther from the neutral axis and raise I. Use the Orientation menu to turn the rectangle on edge or flat.
3. Hover over a shape to color it by bending stress: red and a minus sign for compression above the neutral axis, blue and a plus sign for tension below. Click a shape to read its designation, typical use, and why it performs as it does.
4. Press Match the shape. A use is named, such as a column or a long-span beam, and you click the shape that suits it. Press Next use for the next question.

## Lesson Plan

**Learning objective:** Compare the stiffness, weight, and efficiency of rectangular, wide-flange, and tube cross-sections of equal area, and explain why material far from the neutral axis resists bending most effectively.

**Suggested activities**

- Warm-up (5 min): Students predict which of the three shapes deflects least for the same weight, then check the bars and the deflection diagrams.
- Explore (10 min): Students turn the rectangle from on edge to flat and record the change in I, then double the depth and record the change for all three shapes.
- Analyze (10 min): Students find the combination of area, depth, and flange thickness at which each shape just meets the L/360 limit, and explain how the wide-flange saves weight.

**Assessment**

- Students explain in two sentences why a wide-flange beam is lighter than a solid rectangle that deflects the same amount.
- Students complete the Match the shape quiz and justify one answer with the position of the material relative to the neutral axis.

## References

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
- [Second moment of area (Wikipedia)](https://en.wikipedia.org/wiki/Second_moment_of_area)
- American Institute of Steel Construction, Steel Construction Manual (properties of W and HSS shapes).

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
