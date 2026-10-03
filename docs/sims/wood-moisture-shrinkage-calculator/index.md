---
title: Wood Moisture and Shrinkage Calculator
description: Students will calculate (Bloom Level 3, Apply) the moisture content of a wood sample and the across-grain shrinkage of a member as it dries, and will predict (Bloom Level 2, Understand) how a heated Minnesota winter interior changes a framed building's dimensions.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Wood Moisture and Shrinkage Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md).

```text
Type: chart
**sim-id:** wood-moisture-shrinkage-calculator<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the moisture content of a wood sample and the across-grain shrinkage of a member as it dries, and will predict (Bloom Level 2, Understand) how a heated Minnesota winter interior changes a framed building's dimensions.

Visual: A line chart whose horizontal axis is moisture content from 0 to 30 percent and whose vertical axis is relative across-grain dimension. The line slopes upward below the fiber saturation point at about 28 percent and is flat above it. A marker shows the current moisture content. The chart is responsive to the container width with a height of 400 px.

Controls: Sliders labeled "Starting MC (%)" (10 to 30) and "Final MC (%)" (4 to 19), and a drop-down labeled "Member depth" (2×4, 2×6, 2×8, 2×10, 2×12, and a stack of three floor levels). A preset button labeled "Minnesota winter interior" sets the final MC to 8 percent.

Interactions: Dragging the sliders moves the marker and recalculates the shrinkage in inches, using an assumed coefficient of 0.2 percent per point of moisture change (labeled illustrative). A readout shows the decay-risk status in text, based on whether the moisture content is above 20 percent. A button labeled "Weigh a sample" accepts a wet and an oven-dry mass and shows the moisture content computation step by step.

Colors: Safe moisture ranges are green, the above-20-percent decay-risk range is orange, and the region above fiber saturation is gray with a text label.

Implementation: Chart.js with annotation lines and DOM controls.
```

## Related Resources

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
