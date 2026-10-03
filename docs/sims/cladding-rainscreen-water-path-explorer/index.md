---
title: Cladding Rainscreen Water Path Explorer
description: Students will compare (Bloom Level 4, Analyze) how face-sealed, drained, and rainscreen cladding systems manage water that gets past the surface, and will explain (Bloom Level 2, Understand) why a drainage gap lets a wall dry.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Cladding Rainscreen Water Path Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** cladding-rainscreen-water-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) how face-sealed, drained, and rainscreen cladding systems manage water that gets past the surface, and will explain (Bloom Level 2, Understand) why a drainage gap lets a wall dry.

Visual: A cross-section of a wall, with cladding on the left, a gap, a weather-resistive barrier, sheathing, and a stud cavity. Animated blue droplets fall and blow against the cladding. In the selected system, some droplets enter through a joint. A base flashing and weep opening at the bottom are drawn to scale. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown to choose the system (face-sealed siding, drained siding, brick veneer with cavity, rainscreen with ventilated gap). A slider for wind-driven rain intensity (light, moderate, heavy). A checkbox to add or remove the flashing and weep openings. A "Run storm" button, and a "Dry out" button that shows the drying time of each system after the storm.

Interactions: Hovering over a droplet or layer shows where the water is and what moves it (gravity, wind pressure, or capillary action). A moisture gauge on the sheathing rises when water is trapped and falls when it drains. A message explains why the face-sealed system without drainage soaks the sheathing, and why a ventilated gap dries it fastest.

Default state: Drained siding, moderate rain, flashing present.

Implementation: p5.js with built-in select, slider, checkbox, and buttons, a simple particle model, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
