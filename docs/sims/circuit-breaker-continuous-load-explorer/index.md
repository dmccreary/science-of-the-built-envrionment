---
title: Circuit Breaker and Continuous Load Explorer
description: Students plug devices into a 120 V branch circuit, choose the breaker rating, wire gauge, and hours of operation, and apply the 80 percent rule for continuous loads while a time-current curve shows how a breaker trips on overload and on short circuit.
image: /sims/circuit-breaker-continuous-load-explorer/circuit-breaker-continuous-load-explorer.png
og:image: /sims/circuit-breaker-continuous-load-explorer/circuit-breaker-continuous-load-explorer.png
twitter:image: /sims/circuit-breaker-continuous-load-explorer/circuit-breaker-continuous-load-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Circuit Breaker and Continuous Load Explorer

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run the Circuit Breaker and Continuous Load Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/circuit-breaker-continuous-load-explorer/main.html" width="100%" height="622" scrolling="no"></iframe>
```

## Description

Students plug devices into a 120 V branch circuit, choose the breaker rating, wire gauge, and hours of operation, and apply the 80 percent rule for continuous loads while a time-current curve shows how a breaker trips on overload and on short circuit.

## How to Use

1. Check devices to plug them in. The current bar shows the circuit current in amperes against the breaker rating (red line) and, when the load runs 3 hours or more, the 80 percent continuous limit (dashed line).
2. Try the Chapter 15 example: choose a 15 A breaker, check only the 1,500 W heater (12.5 A), and set the hours to 3 or more. The current is under 15 A but over the 12 A continuous limit, and the status line says so. Switch to the 20 A breaker with 12 AWG wire, where the limit is 16 A.
3. Add more devices until the current passes the breaker rating. The thermal heat bar fills (sped up), the breaker trips, and the lights go out. Read the time-current curve to see how long the breaker would really take. Press Reset breaker to close it again.
4. Press Create a short circuit to see the magnetic element trip the breaker instantly. Select 14 AWG with a 20 A breaker to see the fire-hazard warning for wire smaller than the breaker allows.

## Lesson Plan

**Learning objective:** Apply the 80 percent rule to decide whether a set of loads can run on a given circuit, and explain why a breaker trips on overload and on short circuit.

**Suggested activities**

- Predict (5 min): Students predict whether the heater alone can run all day on a 15 A circuit and on a 20 A circuit, then check the current bar and the status line.
- Size it (10 min): Students find which combinations of the four devices stay under the continuous limit on each breaker, and which combinations trip the breaker.
- Explain (10 min): Students use the time-current curve to explain why a small overload takes minutes or hours to trip but a short circuit trips instantly, and why the 14 AWG with 20 A breaker combination is dangerous.

**Assessment**

- Students calculate by hand the current of the heater, computers, and microwave together (12.5 + 2.5 + 7.5 amperes) and state whether a 20 A circuit can carry it continuously.
- Students explain in two sentences why a breaker should never be replaced with a larger one to stop it from tripping.

## References

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- [Circuit breaker (Wikipedia)](https://en.wikipedia.org/wiki/Circuit_breaker)
- National Fire Protection Association, NFPA 70 National Electrical Code (continuous loads and overcurrent protection; verify the adopted edition).

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
