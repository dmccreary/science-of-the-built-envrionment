---
title: Drawing Scale Calculator
description: Students will calculate (Bloom Level 3, Apply) the real length of a wall from a drawn length and a stated scale, and explain (Bloom Level 2, Understand) why a changed print size breaks the scale.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Drawing Scale Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: microsim
**sim-id:** drawing-scale-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the real length of a wall from a drawn length and a stated scale, and explain (Bloom Level 2, Understand) why a changed print size breaks the scale.

Visual: A simple floor plan drawn on a canvas that is 600 px wide by 400 px high and resizes with the window. A draggable measuring line with end handles is placed on a wall. A readout shows the drawn length in inches, the selected scale, and the computed real length in feet-inches and in millimeters.

Controls: A dropdown to select 1/8" = 1'-0", 1/4" = 1'-0", 1/2" = 1'-0", or 3" = 1'-0". A slider labeled "Print size" from 50% to 150% that rescales the drawing, with a warning message appearing when the slider is not at 100% that says the printed scale no longer applies. A "Check my answer" button lets the student type a length before the readout is revealed.

Behavior: Dragging the handles updates the readout live. Changing the scale recomputes the real length. Default state: scale 1/4" = 1'-0", print size 100%.

Implementation: p5.js with a responsive canvas and DOM controls.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
