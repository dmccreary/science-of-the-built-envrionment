---
title: Project Phases and the Cost of Change
description: Students will explain (Bloom Level 2, Understand) why decisions are cheaper to change in early phases and will identify (Bloom Level 1, Remember) the deliverable and the electrical designer's contribution for each of the eight phases.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Project Phases and the Cost of Change



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md).

```text
Type: chart
**sim-id:** project-phases-cost-of-change<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) why decisions are cheaper to change in early phases and will identify (Bloom Level 1, Remember) the deliverable and the electrical designer's contribution for each of the eight phases.

Visual: A line chart whose horizontal axis lists the eight project phases in order. Two lines are drawn: "Ability to influence the design" (falling from left to right) and "Cost of making a change" (rising from left to right). The vertical axis is labeled "Relative level" with no numeric scale, since the curves are conceptual. The chart is responsive to the container width, with a height of 420 px, and redraws on window resize.

Interactions: Hovering over a phase shows a tooltip with the phase's main question. Clicking a phase opens an infobox below the chart with the principal deliverable, the owner's approval gate, and the electrical designer's contribution, matching the phase table above. A toggle labeled "Early collaboration" shifts the two lines to show how integrated delivery moves key decisions earlier, with a one-sentence explanation in the infobox. A slider labeled "Move the wall" places a marker at any phase and displays the description of what the change would involve at that point, based on the Riverbend wall example.

Colors: The influence line is green and the cost line is orange. Both lines are also distinguished by dash style so they remain readable without color.

Implementation: Chart.js line chart with custom tooltip callbacks, click handlers on the phase labels, and a small infobox div.
```

## Related Resources

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
