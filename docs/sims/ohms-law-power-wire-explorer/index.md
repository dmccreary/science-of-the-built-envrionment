---
title: Voltage, Current, and Resistance Explorer
description: Students set the source voltage, load power, wire gauge, material, and run length and watch the current, voltage at the load, voltage drop, and heat lost in the wire update. A drop bar with a 3 percent limit and an optional ampacity marker show when a wire is too small or too long.
image: /sims/ohms-law-power-wire-explorer/ohms-law-power-wire-explorer.png
og:image: /sims/ohms-law-power-wire-explorer/ohms-law-power-wire-explorer.png
twitter:image: /sims/ohms-law-power-wire-explorer/ohms-law-power-wire-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Voltage, Current, and Resistance Explorer

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the Voltage, Current, and Resistance Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ohms-law-power-wire-explorer/main.html" width="100%" height="482" scrolling="no"></iframe>
```

## Description

Students set the source voltage, load power, wire gauge, material, and run length and watch the current, voltage at the load, voltage drop, and heat lost in the wire update. A drop bar with a 3 percent limit and an optional ampacity marker show when a wire is too small or too long.

## How to Use

1. Set the source voltage and load power with the sliders. The current is the load power divided by the source voltage, so a 1,500 W load on 120 V draws 12.5 A.
2. Choose a wire gauge and material, then set the one-way length. The drop bar fills as the voltage drop grows, green up to 3 percent and red beyond.
3. Hover over the wire to see its resistance per 1,000 ft, the loop resistance, and the drop calculation. Hover over the load to see P = V x I.
4. Check Show ampacity limit to see the typical ampacity of the chosen wire. A red warning marker appears when the current exceeds it.

## Lesson Plan

**Learning objective:** Apply Ohm's law and P = V x I to find current, voltage drop, and wire loss, and predict how wire gauge and length change the drop.

**Suggested activities**

- Warm-up (5 min): Students predict, before moving anything, whether doubling the wire length will double or quadruple the voltage drop, then test it.
- Explore (10 min): Students reproduce the chapter's worked examples: 120 V, 2,400 W, 100 ft of copper at 12, 10, and 8 AWG should give drops near 6.4, 4.0, and 2.5 percent.
- Apply (10 min): Students choose the smallest gauge that keeps a 200 ft run of a 1,500 W heater within 3 percent drop and within ampacity, then repeat for aluminum.

**Assessment**

- Students calculate by hand the current, drop, and wire loss for one setting and check the answer against the readouts.
- Students explain in two sentences why a long run at 12 V loses a far larger share of its voltage than the same run at 240 V.

## References

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- NFPA 70, National Electrical Code, Chapter 9 Table 8 (conductor resistance) and Table 310.16 (ampacity); verify the adopted edition.
- [Ohm's law (Wikipedia)](https://en.wikipedia.org/wiki/Ohm%27s_law)

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
