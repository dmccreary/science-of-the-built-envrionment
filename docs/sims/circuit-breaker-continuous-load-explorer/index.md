---
title: Circuit Breaker and Continuous Load Explorer
description: Students will apply (Bloom Level 3, Apply) the 80 percent rule to decide whether a set of loads can run on a given circuit, and will explain (Bloom Level 2, Understand) why a breaker trips on overload and on short circuit.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Circuit Breaker and Continuous Load Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md).

```text
Type: microsim
**sim-id:** circuit-breaker-continuous-load-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) the 80 percent rule to decide whether a set of loads can run on a given circuit, and will explain (Bloom Level 2, Understand) why a breaker trips on overload and on short circuit.

Visual: A panelboard with a single breaker connected to a branch circuit with three outlets. Devices can be plugged into the outlets. A current meter shows the circuit current, and a time-current curve plotted below shows where the operating point lies relative to the trip curve.

Controls: A drop-down for breaker rating (15 A or 20 A), a drop-down for wire gauge (14 or 12 AWG), checkboxes for devices (a 1,500 W heater, a 300 W computer group, a 900 W microwave, a 600 W lighting group), a slider labeled "Hours of operation" from 0.5 to 8, and a button labeled "Create a short circuit."

Interactions: Adding devices raises the current reading. When the load is continuous (3 hours or more), a marker at 80 percent of the breaker rating appears, and if the current exceeds it, the status line reads "Over the continuous limit. Remove load or use a larger circuit." If the current exceeds the breaker rating, the thermal element animates, the breaker trips after a delay, and the lights go out. Pressing the short-circuit button trips it instantly through the magnetic element. If the user selects 14 AWG with a 20 A breaker, a warning reads "Wire is smaller than breaker allows: this is a fire hazard."

Colors: Normal operation in green, near-limit in yellow, over-limit in red, with text messages for each state.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createCheckbox, createSlider, and createButton controls.
```

## Related Resources

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
