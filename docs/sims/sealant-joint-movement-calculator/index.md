---
title: Sealant Joint Movement Calculator
description: Students will calculate (Bloom Level 3, Apply) thermal movement and the minimum sealant joint width for a given material, length, temperature range, and sealant rating.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Sealant Joint Movement Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** sealant-joint-movement-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) thermal movement and the minimum sealant joint width for a given material, length, temperature range, and sealant rating.

Visual: A side-by-side cross-section of a joint between two panels, drawn to scale. The joint, backer rod, and sealant are labeled. The joint opens and closes as a temperature slider moves from cold to hot, with the sealant stretching and compressing and shown in green, yellow, or red as it nears or exceeds its rating. A small table shows the calculation steps. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A dropdown for material (aluminum, steel, vinyl, wood across grain, concrete). A slider for panel length (2 to 20 ft). Two sliders for the lowest and highest temperatures (-30 to 160°F). A dropdown for sealant rating (plus or minus 12.5, 25, 35, 50 percent). A slider for joint width (1/8 to 1 in). A checkbox "Three-sided adhesion" to show how the sealant tears without a backer rod.

Interactions: Hovering over the sealant shows its strain as a percentage of its rating. The readout lists the movement, the minimum joint width, and whether the chosen width passes. When the width fails, the sealant tears in the animation, and a message explains the cause.

Default state: Aluminum, 10 ft, -20 to 140°F, plus or minus 25 percent, joint width 1/2 in, passing.

Implementation: p5.js with built-in dropdowns, sliders, and a checkbox, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
