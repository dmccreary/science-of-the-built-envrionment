---
title: "Insulation R-Value and Thickness Comparison"
description: "Students compare eight insulation materials by the thickness each needs to reach a target R-value, test them against a stud-cavity depth, and weigh cost and cold-weather performance to justify a choice."
image: /sims/insulation-r-per-inch-thickness-chart/insulation-r-per-inch-thickness-chart.png
og:image: /sims/insulation-r-per-inch-thickness-chart/insulation-r-per-inch-thickness-chart.png
twitter:image: /sims/insulation-r-per-inch-thickness-chart/insulation-r-per-inch-thickness-chart.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Analyze, Evaluate
---

# Insulation R-Value and Thickness Comparison

<iframe src="main.html" width="100%" height="862" scrolling="no"></iframe>

[Run the Insulation R-Value and Thickness Comparison MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/insulation-r-per-inch-thickness-chart/main.html" width="100%" height="862" scrolling="no"></iframe>
```

## Description

Students compare eight insulation materials by the thickness each needs to reach a target R-value, test them against a stud-cavity depth, and weigh cost and cold-weather performance to justify a choice.

## How to Use

1. Set the target R-value with the slider and choose a cavity depth. Each bar shows the inches of that material needed to reach the target; the dashed line is the cavity depth.
2. Bars that fit inside the cavity are green and say 'fits'. Bars that do not fit are red with diagonal hatching and say 'too thick'.
3. Hover over a bar for the material's R-per-inch range and its air, moisture, and fire behavior. Click a bar for common uses and installation cautions.
4. Tick Show typical relative cost to add an illustrative cost per R, and tick Show cold-weather derating to see how polyisocyanurate changes in cold weather.
5. Read the sentence under the controls for how many options fit and which is thinnest or, with cost shown, cheapest.

## Lesson Plan

**Learning objective:** Compare insulation materials by R per inch and the thickness needed to reach a target R-value, and justify a choice for a given cavity depth.

**Suggested activities**

- Reproduce (5 min): At R-20 and a 5.5 in cavity, students check the Chapter 11 worked example, noting which materials fit and which just miss.
- Explore (10 min): Students raise the target to R-30 and R-40 and describe what happens to the bars that fit, then explain why cold-climate designers add continuous insulation outside the framing.
- Justify (10 min): Students pick a material for a 3.5 in cavity at R-15 with cost shown and write a two-sentence recommendation.

**Assessment**

- Students calculate the thickness of fiberglass, closed-cell foam, and polyiso for R-30 by hand and compare with the chart.
- Students explain why a material with the highest R per inch is not always the best choice.

## References

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
- [Building insulation (Wikipedia)](https://en.wikipedia.org/wiki/Building_insulation)
- [R-value (insulation) (Wikipedia)](https://en.wikipedia.org/wiki/R-value_(insulation))

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
