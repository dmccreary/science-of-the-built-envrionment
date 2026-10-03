---
title: Electrical Design Phase Timeline
description: Students will describe (Bloom Level 2, Understand) the electrical designer's deliverables in each of the eight project phases and will identify (Bloom Level 1, Remember) the other disciplines with whom the designer coordinates at each stage.
status: scaffold
library: vis-timeline
bloom_level: TBD
---

# Electrical Design Phase Timeline



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: timeline
**sim-id:** electrical-design-phase-responsibility-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Learning objective: Students will describe (Bloom Level 2, Understand) the electrical designer's deliverables in each of the eight project phases and will identify (Bloom Level 1, Remember) the other disciplines with whom the designer coordinates at each stage.

Visual: A horizontal timeline with the eight project phases as consecutive blocks. Above the line, one row per discipline (architect, structural engineer, mechanical engineer, electrical designer, contractor, utility). Colored bars show when each discipline is most active.

Controls: A filter drop-down labeled "Show discipline" lets the learner focus on one row. A toggle labeled "Show handoffs" draws arrows between phases and disciplines, such as "load data from mechanical to electrical." A slider labeled "Time of change" places a marker at any phase.

Interactions: Hovering over a phase block shows its main question. Clicking a block opens an infobox listing the electrical designer's tasks, the deliverables, and the coordination meetings that occur in that phase. Moving the "Time of change" marker displays a relative cost of changing the kitchen oven example (low in schematic design, high after the conduit is installed), reinforcing the cost-of-change idea from Chapter 2.

Colors: Each discipline has a unique color and a unique line pattern. All text labels are high contrast.

Responsive design: The timeline follows the container width and redraws on window resize. Height is 460 px.

Implementation: vis-timeline with custom item templates, click handlers that populate an infobox div, and a filter that updates the visible groups.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
