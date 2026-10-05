---
title: Ceiling Coordination Clash Explorer
description: Students analyze a cross-section of the space above a ceiling, drag a supply duct, sloped drain pipe, cable tray, and light fixtures between two glued-laminated beams, and watch a live clash counter. A clash check lists the conflicts and states the priority order for resolving them.
image: /sims/ceiling-coordination-clash-explorer/ceiling-coordination-clash-explorer.png
og:image: /sims/ceiling-coordination-clash-explorer/ceiling-coordination-clash-explorer.png
twitter:image: /sims/ceiling-coordination-clash-explorer/ceiling-coordination-clash-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Create
---

# Ceiling Coordination Clash Explorer

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Ceiling Coordination Clash Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ceiling-coordination-clash-explorer/main.html" width="100%" height="502" scrolling="no"></iframe>
```

## Description

Students analyze a cross-section of the space above a ceiling, drag a supply duct, sloped drain pipe, cable tray, and light fixtures between two glued-laminated beams, and watch a live clash counter. A clash check lists the conflicts and states the priority order for resolving them.

## How to Use

1. Look at the red outlines. Each marks two elements that overlap or sit closer than 1 inch, and the Clashes counter shows how many there are. Hover over a red region to read why it is a clash.
2. Drag the duct, drain pipe, or cable tray to a new position. The light fixtures slide sideways along the ceiling, and the glulam beams are fixed because the structural engineer owns them.
3. Change the Duct depth (8 to 24 in) and Ceiling height (8 to 12 ft) sliders to see how the available space under the beams grows and shrinks. Use the Show system checkboxes to hide a system and study the others.
4. Press Run clash check for a list of the clashes and the order in which to resolve them: gravity pipe, large duct, pressure pipe, cable tray, then conduit. When the count reaches zero the status reads Coordinated.

## Lesson Plan

**Learning objective:** Find the clashes in a ceiling cross-section and propose a routing that resolves them in the priority order of systems.

**Suggested activities**

- Warm-up (5 min): Students predict which elements will clash before pressing Run clash check, then compare their list with the sim's list.
- Explore (10 min): Students resolve all clashes at the default 10 ft ceiling, moving the lowest-priority element first, and record the final positions.
- Apply (10 min): Students raise the ceiling to 12 ft and find a new routing, then explain why the duct must move between the beams and which system yielded.

**Assessment**

- Students write a short routing memo listing, in priority order, which element moved and why.
- Students explain in two sentences why a gravity drain pipe keeps its position while the cable tray moves.

## References

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [Building information modeling (Wikipedia)](https://en.wikipedia.org/wiki/Building_information_modeling)
- NFPA 70, National Electrical Code (cable tray and conduit installation); verify the adopted edition.

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: microsim
**sim-id:** ceiling-coordination-clash-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) a ceiling cross-section to find clashes among structure, ducts, pipes, cable tray, and lights, and will propose (Bloom Level 6, Create) a routing that resolves them according to the priority order of systems.

Visual: A cross-section of a ceiling space under a roof, showing two glued-laminated beams, a large rectangular supply duct, a sloped drain pipe, a cable tray, a row of recessed light fixtures, and a ceiling grid. A scale indicates the available depth in inches. Elements that overlap are drawn with a red outline.

Controls: A "Show system" checkbox for each of structure, duct, plumbing, electrical, and lighting. Each element can be dragged up, down, or sideways within the cross-section. A slider labeled "Duct depth (in)" from 8 to 24 and a slider labeled "Ceiling height (ft)" from 8 to 12. A button labeled "Run clash check."

Interactions: Dragging an element updates the clash display in real time and updates a counter of the number of clashes. Hovering over a clash shows a message such as "Duct intersects beam: raise the duct or use a smaller duct." Clicking "Run clash check" lists the clashes and states the recommended order for resolution (gravity pipe, then large duct, then pressure pipe, cable tray, conduit). When no clashes remain, the status line displays "Coordinated: all systems fit with clearance."

Colors: Structure in brown, ducts in blue, plumbing in green, electrical in orange, lighting in yellow, and clashes in red. Each system also has a distinct line pattern.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createCheckbox, createSlider, and createButton controls, and rectangle intersection tests for clash detection.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
