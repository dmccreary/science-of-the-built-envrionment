---
title: Electric Circuit and Water Analogy Explorer
description: Students will explain (Bloom Level 2, Understand) how a source, conductors, a load, and a switch form a closed circuit, and will predict (Bloom Level 2, Understand) how opening a switch or connecting loads in series or in parallel changes the behavior of the circuit.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Electric Circuit and Water Analogy Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md).

```text
Type: microsim
**sim-id:** electrical-circuit-water-analogy-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) how a source, conductors, a load, and a switch form a closed circuit, and will predict (Bloom Level 2, Understand) how opening a switch or connecting loads in series or in parallel changes the behavior of the circuit.

Visual: A split canvas. The left half shows an electrical circuit with a battery, two lamps, wires, and a switch. The right half shows the matching water circuit with a pump, pipes, two water wheels, and a valve. Animated dots move around each loop to show charge or water flow, and the speed of the dots is proportional to the current.

Controls: A toggle labeled "Switch: open / closed." A toggle labeled "Lamps: series / parallel." A slider labeled "Source voltage (volts)" from 0 to 24. A checkbox labeled "Remove lamp 2." A checkbox labeled "Show water analogy."

Interactions: Changing the switch, wiring arrangement, or voltage updates both halves in real time. Hovering over any part highlights its twin in the other half and shows its name and role. When a lamp is removed in series mode, all flow stops and the status line reads "Series: one break stops every load." In parallel mode, flow continues through lamp 1 and the status line reads "Parallel: each load has its own path." Clicking a part opens an infobox that gives its electrical meaning and the limit of the analogy.

Colors: Charge dots in yellow, water dots in blue, wires in dark gray, active loads in bright yellow and inactive loads in light gray. Flow direction is also shown by arrowheads so the diagram can be read without color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 460 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createCheckbox, createSlider, and createButton controls created before any positioning function runs.
```

## Related Resources

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
