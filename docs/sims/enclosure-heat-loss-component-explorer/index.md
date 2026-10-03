---
title: Enclosure Heat Loss Component Explorer
description: Students will analyze (Bloom Level 4, Analyze) how roof, wall, and window area and U-value combine to determine total conductive heat loss, and will evaluate (Bloom Level 5, Evaluate) which single change reduces the loss most.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Enclosure Heat Loss Component Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md).

```text
Type: chart
**sim-id:** enclosure-heat-loss-component-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how roof, wall, and window area and U-value combine to determine total conductive heat loss, and will evaluate (Bloom Level 5, Evaluate) which single change reduces the loss most.

Visual: A stacked horizontal bar showing the heat loss of the roof, walls, and windows in BTU/h, beside a second bar showing each component's share of the enclosure area for comparison. A readout shows the total loss in BTU/h and the equivalent in kW. The chart is responsive to the container width, 420 px tall, and redraws on window resize.

Controls: A slider for window area (0 to 1,400 ft² in 50 ft² steps). A slider for roof R-value (R-20 to R-60), wall effective R-value (R-10 to R-40), and window U-value (0.15 to 0.60). A slider for outdoor temperature (-20 to 40°F) with the indoor temperature fixed at 70°F. A "Riverbend defaults" button.

Interactions: Hovering over any bar segment shows the component's area, U-value, and loss. A "Which change helps most?" button applies a standard improvement to each component in turn (roof +R-10, wall +R-10, windows U-0.20) and ranks them by the BTU/h saved, with a one-sentence explanation of why the result differs from expectation.

Default state: 702 ft² of windows, roof R-40, wall R-27.7, window U-0.30, -10°F outdoors; total about 46,300 BTU/h.

Implementation: Chart.js stacked bar chart with a small calculation function and custom tooltips.
```

## Related Resources

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
