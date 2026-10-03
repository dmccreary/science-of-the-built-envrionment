---
title: Critical Path Explorer
description: Students will calculate (Bloom Level 3, Apply) the earliest start, earliest finish, and float of each activity in a small network and will predict (Bloom Level 2, Understand) how changing a duration affects the project completion date.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Critical Path Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md).

```text
Type: microsim
**sim-id:** critical-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the earliest start, earliest finish, and float of each activity in a small network and will predict (Bloom Level 2, Understand) how changing a duration affects the project completion date.

Visual: A left-to-right activity network of the eight Riverbend activities, drawn as boxes connected by arrows. Each box shows the activity letter, the duration, and the earliest start and finish. Boxes on the critical path are drawn with a heavy orange border and the arrows between them are orange. The canvas width follows the container, the height is 420 px, and the layout redraws on window resize.

Controls: A slider beneath each box adjusts its duration from 1 to 20 days. The network recomputes immediately, and the critical path highlights update. A button labeled "Slip the truss delivery" adds 10 days to activity F and shows that the critical path changes. A "Reset" button restores the defaults.

Interactions: Hovering over a box shows its float and a sentence explaining why it is or is not critical. A readout at the top shows the total project duration in days.

Default state: Durations as in the worked example, total of 27 days, with F showing 9 days of float.

Implementation: p5.js with a forward-pass calculation and a responsive canvas.
```

## Related Resources

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
