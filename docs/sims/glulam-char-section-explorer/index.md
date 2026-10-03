---
title: Glulam Char Section Explorer
description: Students will calculate (Bloom Level 3, Apply) the remaining section and section modulus of a timber beam after a given fire exposure and will explain (Bloom Level 2, Understand) why larger timber members resist fire better than small ones.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Glulam Char Section Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md).

```text
Type: microsim
**sim-id:** glulam-char-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the remaining section and section modulus of a timber beam after a given fire exposure and will explain (Bloom Level 2, Understand) why larger timber members resist fire better than small ones.

Visual: A cross-section of a rectangular beam drawn to scale. The original outline is dashed. A dark char layer grows inward on the exposed faces as the exposure time increases, and the remaining section is drawn in tan. A readout at the right shows the remaining width, remaining depth, the section modulus in cubic inches, and the percentage of the original capacity. The canvas fills the container width, has a height of 460 px, and redraws on window resize.

Controls: A slider labeled "Fire exposure (minutes)" from 0 to 120 with a default of 60. Sliders for beam width (3.125 to 12.25 in) and depth (9 to 36 in), with defaults of 8.75 and 24. A radio selector for the exposed faces: "Three sides (beam)" or "Four sides (column)". A slider for the nominal charring rate (1.0 to 2.0 in per hour) with a default of 1.5 in. A button labeled "Compare with a 3.125 in by 12 in member" overlays a small member to show how quickly it is consumed.

Interactions: Hovering over the char layer shows a tooltip with its thickness. A warning appears when the remaining width falls below 2 in, with the sentence "The section may no longer carry load." The readout updates on every change.

Colors: Char in dark charcoal, remaining section in tan, original outline in gray. The text readout repeats the state so that color is not the only signal.

Implementation: p5.js with a responsive canvas, DOM sliders and radio buttons, and the section modulus formula \( S = bd^2/6 \) recalculated on every change.
```

## Related Resources

- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
