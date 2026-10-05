---
title: "Stress-Strain Curve Explorer"
description: "Students read simplified stress-strain curves for steel in tension and for concrete and softwood in compression, moving a stress marker along each curve to see strain, factor of safety, and whether the behavior is elastic or plastic. Releasing the marker shows the strain returning to zero or a permanent offset, and a toughness shading and compare mode contrast ductile and brittle behavior."
image: /sims/stress-strain-curve-explorer/stress-strain-curve-explorer.png
og:image: /sims/stress-strain-curve-explorer/stress-strain-curve-explorer.png
twitter:image: /sims/stress-strain-curve-explorer/stress-strain-curve-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Understand, Analyze
---

# Stress-Strain Curve Explorer

<iframe src="main.html" width="100%" height="852" scrolling="no"></iframe>

[Run the Stress-Strain Curve Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/stress-strain-curve-explorer/main.html" width="100%" height="852" scrolling="no"></iframe>
```

## Description

Students read simplified stress-strain curves for steel in tension and for concrete and softwood in compression, moving a stress marker along each curve to see strain, factor of safety, and whether the behavior is elastic or plastic. Releasing the marker shows the strain returning to zero or a permanent offset, and a toughness shading and compare mode contrast ductile and brittle behavior.

## How to Use

1. Choose Steel, Concrete, or Wood. The slider starts at the Chapter 5 worked example: the 18,100 psi Riverbend hanger rod, a 417 psi concrete column, or a 1,500 psi design-level wood stress.
2. Drag the Applied stress slider and read the strain, the two factors of safety, and the elastic or plastic label. Hover over (or tap) a circle, triangle, or square on the curve to see the yield, ultimate, or fracture point.
3. Release the slider below the yield stress and the marker runs back to zero strain. Release it above yield and a dashed line, parallel to the elastic line, ends at a permanent strain. The Release the load button does the same for keyboard users.
4. Check Show area under the curve to read toughness, check Compare all three to overlay the curves, and check Zoom in on small strains to see the steel elastic line or the concrete and wood curves up close.

## Lesson Plan

**Learning objective:** Interpret stress-strain curves to identify yield strength, ultimate strength, stiffness, and failure type, and compare ductile and brittle behavior.

**Suggested activities**

- Warm-up (5 min): Students sketch the expected shape of the steel, concrete, and wood curves, then compare their sketches with the chart.
- Explore (10 min): Students load each material to its elastic limit, then past it, release the slider, and record whether any permanent strain remains and how large it is.
- Analyze (10 min): Students turn on Compare all three with the zoom, rank the materials by stiffness and by toughness, and explain why steel gives warning before it fails and concrete does not.

**Assessment**

- Students explain in two sentences why a ductile material is preferred in earthquake design, using the area under the curve.
- Students use the slider to find the factor of safety against yield for the Riverbend hanger rod and state whether it matches the Chapter 5 value of about 2.0.

## References

- [Chapter 5: Properties of Building Materials](../../chapters/05-material-properties/index.md)
- [Stress-strain curve (Wikipedia)](https://en.wikipedia.org/wiki/Stress%E2%80%93strain_curve)
- [Ductility (Wikipedia)](https://en.wikipedia.org/wiki/Ductility)

## Specification

The full specification below is extracted from
[Chapter 5: Properties of Building Materials](../../chapters/05-material-properties/index.md).

```text
Type: chart
**sim-id:** stress-strain-curve-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will interpret (Bloom Level 2, Understand) stress-strain curves for steel, concrete, and wood to identify yield strength, ultimate strength, stiffness, and the type of failure, and will compare (Bloom Level 4, Analyze) ductile and brittle behavior.

Visual: A line chart with strain on the horizontal axis and stress in psi on the vertical axis. A simplified curve is drawn for the selected material: structural steel in tension (a steep elastic line, a yield plateau, strain hardening, and a necking drop to fracture), concrete in compression (a curve that rises to its peak and then falls), and softwood in compression parallel to the grain (a nearly straight line that ends in crushing). Markers show the yield point, the ultimate point, and the fracture point. The chart fills the container width with a height of 440 px and redraws on window resize.

Controls: Radio buttons labeled "Steel," "Concrete," and "Wood" choose the curve. A slider labeled "Applied stress" moves a marker along the curve. A checkbox labeled "Show area under the curve" shades the area, and a checkbox labeled "Compare all three" overlays the three curves.

Interactions: As the stress marker moves, a readout shows the strain, the factor of safety against yield, and whether the behavior is elastic or plastic. Releasing the marker in the elastic range animates a return to zero strain, and releasing it past yield shows a permanent offset. Hovering over a key point shows its name and value. The caption beside the shaded area explains that it represents toughness.

Colors: Steel is dark gray, concrete is tan, and wood is brown. The elastic range is shaded green and the plastic range is shaded orange, with text labels on each.

Implementation: Chart.js line chart with a custom plugin for the shaded areas and markers, and a data table for each material.
```

## Related Resources

- [Chapter 5: Properties of Building Materials](../../chapters/05-material-properties/index.md)
