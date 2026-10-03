---
title: Voltage, Current, and Resistance Explorer
description: Students will apply (Bloom Level 3, Apply) Ohm's law and the power relationship to calculate current, resistance, and power in a simple circuit, and will predict (Bloom Level 2, Understand) how wire length and gauge change voltage drop.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Voltage, Current, and Resistance Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md).

```text
Type: microsim
**sim-id:** ohms-law-power-wire-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) Ohm's law and the power relationship to calculate current, resistance, and power in a simple circuit, and will predict (Bloom Level 2, Understand) how wire length and gauge change voltage drop.

Visual: A circuit with a source, a 100 ft run of wire, and a load. Live readouts show source voltage, voltage at the load, current, load power, and the power lost as heat in the wire. A bar showing the voltage drop is drawn along the wire, with a green zone up to 3 percent and a red zone beyond it.

Controls: A slider for source voltage (12 to 480 V), a slider for load power (100 to 5,000 W), a drop-down for wire gauge (14, 12, 10, 8, 6 AWG), a slider for one-way wire length (10 to 300 ft), and a drop-down for material (copper or aluminum). A checkbox labeled "Show ampacity limit" draws a warning marker when the current exceeds the typical ampacity of the chosen wire.

Interactions: Changing any control updates all readouts. Hovering over the wire shows its resistance per 1,000 ft and total loop resistance. Hovering over the load shows the formula P = V x I. When the drop exceeds 3 percent, the status line reads "Voltage drop is high. Try a larger wire or a shorter run." When current exceeds ampacity, the wire flashes red with the message "Overload: this wire would overheat."

Colors: Wire in copper orange or aluminum gray, safe zone in green, warning zone in red. The warning also uses a text label.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), using built-in createSlider, createSelect, and createCheckbox controls.
```

## Related Resources

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
