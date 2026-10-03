---
title: Insulation Diminishing Returns Explorer
description: Students will calculate (Bloom Level 3, Apply) annual heat loss through a surface for different R-values and will explain (Bloom Level 2, Understand) why each added layer of insulation saves less than the one before.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Insulation Diminishing Returns Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md).

```text
Type: chart
**sim-id:** insulation-diminishing-returns-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) annual heat loss through a surface for different R-values and will explain (Bloom Level 2, Understand) why each added layer of insulation saves less than the one before.

Visual: A line chart with R-value (R-5 to R-60) on the horizontal axis and annual heat loss in MMBtu on the vertical axis. The curve falls steeply at low R and flattens at high R. A shaded vertical band between two chosen R-values shows the savings, and a table below the chart shows the heat loss, savings, gas cost, and simple payback. The chart is responsive with a height of 420 px and redraws on window resize.

Controls: Sliders for roof area (1,000 to 20,000 ft², default 9,000), heating degree days (4,000 to 9,000, default 7,500), gas price (\$5 to \$20 per MMBtu, default \$10), furnace efficiency (60 to 98 percent, default 90), and insulation cost per ft² per added R-20 (\$0.50 to \$4, default \$1.50). Two draggable markers set "current R" and "proposed R" on the curve, with defaults at R-30 and R-50.

Interactions: Hovering over the curve shows the R-value and the annual loss. The table updates as markers move. A message states "Payback exceeds the typical building life" when the simple payback is above 50 years.

Colors: The curve is blue, the savings band is green, and the markers are orange. All values are also shown as text.

Implementation: Chart.js with draggable annotation markers and DOM sliders, recalculating \( Q = (A/R) \times \text{HDD} \times 24 \) on each change.
```

## Related Resources

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
