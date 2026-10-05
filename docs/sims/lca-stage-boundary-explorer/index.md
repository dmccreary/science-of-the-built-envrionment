---
title: "Life-Cycle Stage and Boundary Explorer"
description: "Explore the Riverbend 60-year life-cycle ledger by module (A1-A3 product, A4-A5 construction, B use, C end of life) and see how the system boundary, the operating energy, and the study period change the share of emissions that comes from materials."
image: /sims/lca-stage-boundary-explorer/lca-stage-boundary-explorer.png
og:image: /sims/lca-stage-boundary-explorer/lca-stage-boundary-explorer.png
twitter:image: /sims/lca-stage-boundary-explorer/lca-stage-boundary-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Understand, Analyze
---

# Life-Cycle Stage and Boundary Explorer

<iframe src="main.html" width="100%" height="702" scrolling="no"></iframe>

[Run the Life-Cycle Stage and Boundary Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/lca-stage-boundary-explorer/main.html" width="100%" height="702" scrolling="no"></iframe>
```

## Description

Explore the Riverbend 60-year life-cycle ledger by module (A1-A3 product, A4-A5 construction, B use, C end of life) and see how the system boundary, the operating energy, and the study period change the share of emissions that comes from materials.

## How to Use

1. Start with Cradle to grave and the default 60-year ledger of 330, 35, 1,720, and 20 tonnes CO₂e. The top bar is the current design and the bottom bar is the efficient, electrified case at 40 percent operating energy.
2. Hover over any segment for the module name, its plain-language definition, and the tonnes of emissions. Click a segment for an example of what the module includes.
3. Change the System boundary to Cradle to gate or Through construction and watch the use and end-of-life segments leave the bar and the materials share change.
4. Drag Operating energy and Study period, or click Apply efficient and electrified case, to see the materials share rise as the building uses less energy.
5. Read the readout lines for the materials share under the current boundary and under all three boundaries.

## Lesson Plan

**Learning objective:** Students interpret what each life-cycle module represents and analyze how the system boundary and operating energy change the share of life-cycle emissions that comes from materials.

**Suggested activities**

- Reproduce the Chapter 20 ledger: confirm the 2,105 t total and the 16 percent materials share, then apply the efficient case and confirm 1,073 t and 31 percent.
- Predict the materials share at a 20-year study period and a 100-year study period before moving the slider, then compare with the readout.
- Choose a boundary for a product comparison and explain in two sentences what that boundary leaves out.

**Assessment**

- Explain why a product that looks cleaner at the factory gate can look worse once the boundary extends to the grave.
- Explain why the materials share doubles in the efficient case even though the materials did not change.

## References

- [Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md)
- [Life-cycle assessment (Wikipedia)](https://en.wikipedia.org/wiki/Life-cycle_assessment)
- European Committee for Standardization, EN 15978, Sustainability of construction works: assessment of environmental performance of buildings (defines modules A1 to D).

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
