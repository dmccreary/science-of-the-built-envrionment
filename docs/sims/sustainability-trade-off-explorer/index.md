---
title: Sustainability Trade-Off Explorer
description: Students will evaluate (Bloom Level 5, Evaluate) alternative building systems against environment, society, and economy criteria and will justify (Bloom Level 5, Evaluate) how a change in the owner's priorities changes the best choice.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Sustainability Trade-Off Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
