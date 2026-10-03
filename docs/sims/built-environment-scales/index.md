---
title: Scales of the Built Environment
description: Students will classify (Bloom Level 2, Understand) examples of built-environment elements into the five nested scales and explain (Understand) how a decision at one scale affects another.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Scales of the Built Environment



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: infographic
**sim-id:** built-environment-scales<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) examples of built-environment elements into the five nested scales and explain (Understand) how a decision at one scale affects another.

Visual: Five concentric rounded rectangles labeled Material, Component, Building, Neighborhood, and Region, with Material at the center. Canvas width follows the container width; height is 420 px. The layout redraws on window resize.

Interactions: Hovering over a ring shows a tooltip with one example and its typical concern, matching the table above. Clicking a ring opens an infobox below the canvas with a two-sentence definition and a "what changes if this fails" example. A button labeled "Trace the classroom" highlights the four rings in sequence while the infobox narrates the January classroom example.

Colors: Rings use the book's green palette, light at the outside and dark at the center. Text is dark on light rings and white on dark rings.

Implementation: p5.js with a responsive canvas, mouse hit-testing on each ring, and a simple infobox div.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
