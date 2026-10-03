---
title: Wood Moisture and Shrinkage Calculator
description: Students set a starting and a final moisture content on a line chart of across-grain size versus moisture, read the shrinkage in inches for a chosen member depth, and weigh a sample to compute its moisture content step by step. A Minnesota winter preset shows how a heated interior dries framing.
image: /sims/wood-moisture-shrinkage-calculator/wood-moisture-shrinkage-calculator.png
og:image: /sims/wood-moisture-shrinkage-calculator/wood-moisture-shrinkage-calculator.png
twitter:image: /sims/wood-moisture-shrinkage-calculator/wood-moisture-shrinkage-calculator.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Understand, Apply
---

# Wood Moisture and Shrinkage Calculator

<iframe src="main.html" width="100%" height="714" scrolling="no"></iframe>

[Run the Wood Moisture and Shrinkage Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/wood-moisture-shrinkage-calculator/main.html" width="100%" height="714" scrolling="no"></iframe>
```

## Description

Students set a starting and a final moisture content on a line chart of across-grain size versus moisture, read the shrinkage in inches for a chosen member depth, and weigh a sample to compute its moisture content step by step. A Minnesota winter preset shows how a heated interior dries framing.

## How to Use

1. Drag the Starting MC and Final MC sliders. The two markers move along the line, and the readout shows the shrinkage in percent and in inches. The default (19 percent down to 9 percent, three floor levels) is the Chapter 7 worked example.
2. Choose a Member depth from the drop-down to see how a deeper member, or a whole stack of three floors, shrinks more in inches for the same drop in moisture content.
3. Press Minnesota winter interior to set the final moisture content to 8 percent, then try starting values above 20 percent and read the decay-risk status in the readout.
4. Press Weigh a sample, enter a wet mass and an oven-dry mass, and follow the three calculation steps. The gold star shows the sample on the chart, and a button copies its moisture content into the starting slider.

## Lesson Plan

**Learning objective:** Calculate the moisture content of a wood sample and the across-grain shrinkage of a member as it dries, and predict how a heated Minnesota winter interior changes a framed building's dimensions.

**Suggested activities**

- Warm-up (5 min): Students weigh the sample in the book (42 g wet, 35 g oven-dry) and confirm 20 percent, then predict whether that sample is safe from decay.
- Explore (10 min): Students hold the member at the three-floor stack and change the starting moisture content from 30 down to 10 percent, recording the shrinkage in inches each time and noting what happens above 28 percent.
- Apply (10 min): Students compare a 2×10 joist stack at 19 percent against kiln-dried lumber at 12 percent, both settling at 8 percent, and write one detailing decision to accommodate the movement.

**Assessment**

- Students compute by hand the shrinkage of a 2×12 dried from 17 to 8 percent MC and check the answer against the simulator.
- Students explain in two sentences why a stud barely changes in length while a stack of joists and plates changes noticeably in height.

## References

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
- [Wood Handbook: Wood as an Engineering Material (U.S. Forest Products Laboratory), chapter on moisture relations and dimensional change](https://www.fpl.fs.usda.gov/documnts/fplgtr/fpl_gtr282.pdf)
- [Wood drying (Wikipedia)](https://en.wikipedia.org/wiki/Wood_drying)

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
