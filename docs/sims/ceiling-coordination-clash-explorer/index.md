---
title: Ceiling Coordination Clash Explorer
description: Students will analyze (Bloom Level 4, Analyze) a ceiling cross-section to find clashes among structure, ducts, pipes, cable tray, and lights, and will propose (Bloom Level 6, Create) a routing that resolves them according to the priority order of systems.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Ceiling Coordination Clash Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
