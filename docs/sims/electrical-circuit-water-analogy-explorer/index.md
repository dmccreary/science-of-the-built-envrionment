---
title: "Electric Circuit and Water Analogy Explorer"
description: "Students compare an electrical circuit with its water-pipe twin, then open the switch, change the source voltage, remove a lamp, and wire two lamps in series or parallel to predict and see how the flow responds."
image: /sims/electrical-circuit-water-analogy-explorer/electrical-circuit-water-analogy-explorer.png
og:image: /sims/electrical-circuit-water-analogy-explorer/electrical-circuit-water-analogy-explorer.png
twitter:image: /sims/electrical-circuit-water-analogy-explorer/electrical-circuit-water-analogy-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand
---

# Electric Circuit and Water Analogy Explorer

<iframe src="main.html" width="100%" height="567" scrolling="no"></iframe>

[Run the Electric Circuit and Water Analogy Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/electrical-circuit-water-analogy-explorer/main.html" width="100%" height="567" scrolling="no"></iframe>
```

## Description

Students compare an electrical circuit with its water-pipe twin, then open the switch, change the source voltage, remove a lamp, and wire two lamps in series or parallel to predict and see how the flow responds.

## How to Use

1. Press Start flow to set the dots moving. Yellow dots are charge in the wires on the left; blue dots are water in the pipes on the right. Their speed follows the current, and the arrowheads show the direction.
2. Hover over any part to highlight its twin in the other half (battery and pump, switch and valve, lamp and water wheel, wire and pipe). Click a part to read its electrical meaning and the limit of the analogy.
3. Press the Switch button to open and close the loop, and drag the source voltage slider. Notice that an open switch is a closed valve and that the voltage is the push, not the flow.
4. Press the Lamps button to switch between series and parallel, then check Remove lamp 2 in each arrangement. Predict what will happen before you click, then read the status line.
5. Uncheck Show water analogy to see the electrical circuit alone.

## Lesson Plan

**Learning objective:** Explain how a source, conductors, a load, and a switch form a closed circuit, and predict how opening a switch or connecting loads in series or parallel changes the behavior of the circuit.

**Suggested activities**

- Predict (5 min): Before using the controls, students write what will happen to lamp 1 when lamp 2 is removed in a series circuit and in a parallel circuit.
- Explore (10 min): Students test their predictions, then change the source voltage and compare the lamp power in series and in parallel at 12 V.
- Critique (10 min): Students read the limit of the analogy for each part and write one place where the water picture would mislead a beginner.

**Assessment**

- Students explain in two sentences why a classroom is wired in parallel rather than in series.
- Students use the readout to explain why each lamp is brighter in parallel than in series on the same source.

## References

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- [Series and parallel circuits (Wikipedia)](https://en.wikipedia.org/wiki/Series_and_parallel_circuits)
- [Hydraulic analogy (Wikipedia)](https://en.wikipedia.org/wiki/Hydraulic_analogy)

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
