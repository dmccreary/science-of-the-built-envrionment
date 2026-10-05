---
title: Sustainability Trade-Off Explorer
description: Weigh three Riverbend heating options against environment, society, and economy criteria on a radar chart and a weighted-total bar chart. Moving the owner's priorities shows how the same scores can produce three different winners.
image: /sims/sustainability-trade-off-explorer/sustainability-trade-off-explorer.png
og:image: /sims/sustainability-trade-off-explorer/sustainability-trade-off-explorer.png
twitter:image: /sims/sustainability-trade-off-explorer/sustainability-trade-off-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Evaluate
---

# Sustainability Trade-Off Explorer

<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>

[Run the Sustainability Trade-Off Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/sustainability-trade-off-explorer/main.html" width="100%" height="802" scrolling="no"></iframe>
```

## Description

Weigh three Riverbend heating options against environment, society, and economy criteria on a radar chart and a weighted-total bar chart. Moving the owner's priorities shows how the same scores can produce three different winners.

## How to Use

1. Start with Equal weights and read the radar chart: each polygon is one heating option, and the bar chart shows its weighted total. Option B leads at 4.00.
2. Click Cost first (70 percent economy) and then Climate first (60 percent environment) to reproduce the three winners in the Chapter 19 worked example.
3. Drag any weight slider. The other two weights rescale in proportion so the total stays 100 percent. Read the lead-change lines to see where the winner flips.
4. Check Edit scores to change any score from 1 to 5 and test whether a different judgment, not a different priority, changes the winner.
5. Hover over a polygon vertex for the option, dimension, and score, or over a bar for the weighted-sum arithmetic. Click Reset to restore the defaults.

## Lesson Plan

**Learning objective:** Students evaluate alternative building systems against environment, society, and economy criteria and justify how a change in the owner's priorities changes the best choice.

**Suggested activities**

- Reproduce the three weightings from the Chapter 19 worked example and record the winner and the margin for each.
- Find the economy weight at which Option A overtakes Option B, and compare it with the lead-change line shown by the sim.
- In pairs, argue for a weighting that a school district, a developer, and a climate-focused city might choose, and defend each choice with the numbers.

**Assessment**

- Explain in three sentences why the weights should be agreed on before the design is judged.
- Change one score with Edit scores so that the winner under Equal weights changes, then justify whether the new score is defensible.

## References

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
- [Triple bottom line (Wikipedia)](https://en.wikipedia.org/wiki/Triple_bottom_line)
- [Decision matrix method (Wikipedia: Multiple-criteria decision analysis)](https://en.wikipedia.org/wiki/Multiple-criteria_decision_analysis)

## Specification

The full specification below is extracted from
[Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md).

```text
Type: chart
**sim-id:** sustainability-trade-off-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) alternative building systems against environment, society, and economy criteria and will justify (Bloom Level 5, Evaluate) how a change in the owner's priorities changes the best choice.

Visual: A radar chart with three axes labeled Environment, Society, and Economy, each from 0 to 5. Three polygons show the Riverbend heating options A, B, and C from the worked example. A bar chart beside the radar shows each option's weighted total. The layout stacks vertically on narrow screens. The chart is responsive and redraws on window resize, with a height of 460 px.

Controls: Three sliders set the weights for Environment, Society, and Economy. Moving one slider adjusts the others so the weights always sum to 100 percent. Three preset buttons set "Equal," "Cost first," and "Climate first" weights. A checkbox labeled "Edit scores" lets the student change any score from 1 to 5. A button labeled "Reset" restores the defaults.

Interactions: Hovering over a polygon vertex shows the option, dimension, and score. The bar chart's winner is highlighted and a one-sentence message states which option leads and by how much. A readout explains when the lead changes, for example "Option B leads until economy weight exceeds about 60 percent."

Colors: Option A orange, option B blue, option C green, with distinct line styles so the chart reads without color.

Implementation: Chart.js radar and bar charts with DOM sliders and a weighted-sum calculation recalculated on every change.
```

## Related Resources

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
