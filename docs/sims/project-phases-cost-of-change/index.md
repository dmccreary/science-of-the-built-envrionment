---
title: Project Phases and the Cost of Change
description: A conceptual line chart of the eight project phases shows the ability to influence the design falling while the cost of making a change rises. Students click a phase for its deliverable, approval gate, and electrical designer contribution, and slide a Riverbend wall change through the phases.
image: /sims/project-phases-cost-of-change/project-phases-cost-of-change.png
og:image: /sims/project-phases-cost-of-change/project-phases-cost-of-change.png
twitter:image: /sims/project-phases-cost-of-change/project-phases-cost-of-change.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Remember, Understand
---

# Project Phases and the Cost of Change

<iframe src="main.html" width="100%" height="702" scrolling="no"></iframe>

[Run the Project Phases and the Cost of Change MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/project-phases-cost-of-change/main.html" width="100%" height="702" scrolling="no"></iframe>
```

## Description

A conceptual line chart of the eight project phases shows the ability to influence the design falling while the cost of making a change rises. Students click a phase for its deliverable, approval gate, and electrical designer contribution, and slide a Riverbend wall change through the phases.

## How to Use

1. Hover over any phase on the chart to read its main question and the qualitative level of influence and cost of change.
2. Click a phase, or drag the Move the wall slider, to open the infobox with the deliverable, the owner's approval gate, the electrical designer's contribution, and what moving a Riverbend classroom wall four feet would involve at that point.
3. Check Early collaboration to see how integrated delivery shifts both lines to the right, and read the one-sentence explanation in the infobox.
4. Remember that the curves are conceptual: the vertical axis has no numeric scale, and the Riverbend figures are illustrative.

## Lesson Plan

**Learning objective:** Explain why decisions are cheaper to change in early phases and identify the deliverable and electrical designer's contribution for each of the eight phases.

**Suggested activities**

- Warm-up (5 min): Students predict how the effort to move one wall changes from schematic design to construction, then slide the marker to check.
- Explore (10 min): Students click through all eight phases and fill in a table of deliverable, approval gate, and electrical designer's contribution from memory before checking.
- Discuss (10 min): With Early collaboration on, students explain in their own words why involving the builder and key trades early keeps the cost of change low for longer.

**Assessment**

- Students explain in two sentences why the same four-foot wall move costs an hour in schematic design and weeks during construction.
- Students name the deliverable and the electrical designer's contribution for any three phases chosen by the instructor.

## References

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
- [Project management (Wikipedia)](https://en.wikipedia.org/wiki/Project_management)
- American Institute of Architects, Integrated Project Delivery: A Guide (describes shifting design effort earlier in the project).

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
