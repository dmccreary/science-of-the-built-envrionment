---
title: Stress-Strain Curve Explorer
description: Students will interpret (Bloom Level 2, Understand) stress-strain curves for steel, concrete, and wood to identify yield strength, ultimate strength, stiffness, and the type of failure, and will compare (Bloom Level 4, Analyze) ductile and brittle behavior.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Stress-Strain Curve Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
