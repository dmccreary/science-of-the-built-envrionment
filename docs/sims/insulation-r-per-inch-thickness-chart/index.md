---
title: Insulation R-Value and Thickness Comparison
description: Students will compare (Bloom Level 4, Analyze) insulation materials by R per inch and the thickness each needs to reach a target R-value, and will justify (Bloom Level 5, Evaluate) a choice for a given cavity depth.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Insulation R-Value and Thickness Comparison



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md).

```text
Type: chart
**sim-id:** insulation-r-per-inch-thickness-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) insulation materials by R per inch and the thickness each needs to reach a target R-value, and will justify (Bloom Level 5, Evaluate) a choice for a given cavity depth.

Visual: A horizontal bar chart with one bar per insulation type showing the thickness in inches needed to reach the target R-value. A vertical line marks the depth of the selected cavity. Bars that fit within the cavity are green and bars that do not are red. The chart is responsive, 440 px tall, and redraws on window resize.

Controls: A slider for target R-value (R-10 to R-60). A dropdown for cavity depth (3.5 in, 5.5 in, 7.25 in, 9.25 in, none). A checkbox "Show typical relative cost." A checkbox "Show cold-weather derating," which reduces polyisocyanurate's R per inch at low temperature with an explanation.

Interactions: Hovering over a bar shows the material's R per inch range, the thickness needed, and one line about its air-sealing, moisture, and fire behavior. Clicking a bar opens an infobox with common uses and installation cautions.

Default state: R-20 target, 5.5 in cavity, fiberglass, cellulose, and open-cell foam within the cavity, and closed-cell foam well under it.

Implementation: Chart.js horizontal bar chart with a custom plugin for the cavity line and dynamic bar colors.
```

## Related Resources

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
