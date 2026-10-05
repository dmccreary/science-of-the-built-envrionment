---
title: Electrical Design Phase Timeline
description: A timeline of the eight project phases with one row for each discipline shows when the architect, structural engineer, mechanical engineer, electrical designer, contractor, and utility are most active. Clicking a phase lists the electrical designer's tasks, deliverables, and meetings, and a Time of change marker shows how the cost of changing the kitchen oven rises from schematic design to construction.
image: /sims/electrical-design-phase-responsibility-timeline/electrical-design-phase-responsibility-timeline.png
og:image: /sims/electrical-design-phase-responsibility-timeline/electrical-design-phase-responsibility-timeline.png
twitter:image: /sims/electrical-design-phase-responsibility-timeline/electrical-design-phase-responsibility-timeline.png
social:
   cards: false
status: built
library: vis-timeline
bloom_level: Understand, Remember
---

# Electrical Design Phase Timeline

<iframe src="main.html" width="100%" height="462" scrolling="no"></iframe>

[Run the Electrical Design Phase Timeline MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/electrical-design-phase-responsibility-timeline/main.html" width="100%" height="462" scrolling="no"></iframe>
```

## Description

A timeline of the eight project phases with one row for each discipline shows when the architect, structural engineer, mechanical engineer, electrical designer, contractor, and utility are most active. Clicking a phase lists the electrical designer's tasks, deliverables, and meetings, and a Time of change marker shows how the cost of changing the kitchen oven rises from schematic design to construction.

## How to Use

1. Read the phase blocks across the top, one for each of the eight project phases, and the colored bars beneath them that show when each discipline is most active. Each discipline has its own color and its own border pattern.
2. Hover over a phase block to see its main question. Click a phase block or any column to open its details: the electrical designer's tasks, the deliverables, the coordination meetings, and the disciplines involved.
3. Use Show discipline to focus on one row (the electrical designer row always stays so you can see the handoffs). Turn on Show handoffs to draw numbered arrows such as load data from mechanical to electrical.
4. Move the Time of change slider, or drag the red marker, to any phase. The cost box shows the relative cost of adding the kitchen oven at that time.

## Lesson Plan

**Learning objective:** Describe the electrical designer's deliverables in each of the eight project phases and identify the disciplines the designer coordinates with at each stage.

**Suggested activities**

- Warm-up (5 min): Students predict, for the schematic design phase, which disciplines the electrical designer must talk to, then click the phase to check.
- Explore (10 min): With handoffs turned on, students trace the eight numbered arrows and write one sentence for each describing what information moves and why it is needed at that time.
- Apply (10 min): Students slide the Time of change marker from phase 1 to phase 8 and explain why the same kitchen oven request costs so much more after the conduit is installed.

**Assessment**

- Students list the deliverable for each of the eight phases from memory and compare with the infobox.
- Students explain in two or three sentences why the electrical designer needs the mechanical equipment schedule before the one-line diagram can be finished.

## References

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
- [Project management (Wikipedia)](https://en.wikipedia.org/wiki/Project_management)

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
