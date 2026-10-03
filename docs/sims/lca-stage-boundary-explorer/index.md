---
title: Life-Cycle Stage and Boundary Explorer
description: Students will analyze (Bloom Level 4, Analyze) how the choice of system boundary and operating energy changes the share of life-cycle emissions that comes from materials, and will interpret (Bloom Level 2, Understand) what each life-cycle module represents.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Life-Cycle Stage and Boundary Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md).

```text
Type: chart
**sim-id:** lca-stage-boundary-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how the choice of system boundary and operating energy changes the share of life-cycle emissions that comes from materials, and will interpret (Bloom Level 2, Understand) what each life-cycle module represents.

Visual: A stacked horizontal bar chart with segments for modules A1-A3 (product), A4-A5 (construction), B (use), and C (end of life), in tonnes of carbon dioxide equivalent. The defaults are 330, 35, 1,720, and 20 for the Riverbend ledger. A second bar shows the efficient, electrified case. A percentage label on each segment shows its share of the total. The chart is responsive with a height of 400 px and redraws on window resize.

Controls: A dropdown labeled "System boundary" with the choices "Cradle to gate (A1-A3)," "Through construction (A1-A5)," and "Cradle to grave (A1-C)." A slider labeled "Operating energy as a share of baseline" from 10 to 100 percent, with a default of 100. A slider labeled "Study period (years)" from 20 to 100, with a default of 60. A button labeled "Apply efficient and electrified case" sets the operating slider to 40 percent.

Interactions: Hovering over a segment shows the module name, the plain-language definition, and the tonnes of emissions. Clicking a segment opens an infobox with one example of what the module includes. A readout states the share from materials, for example "Materials are 31 percent of the cradle-to-grave total."

Colors: Product stage in brown, construction in orange, use in blue, end of life in gray, each also named in the legend text.

Implementation: Chart.js stacked bar chart with DOM controls and recalculation of the totals on each change.
```

## Related Resources

- [Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md)
