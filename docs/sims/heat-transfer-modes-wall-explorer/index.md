---
title: Heat Transfer Modes in a Winter Wall
description: A cross-section of a winter wall shows the warm room on the left and the cold outdoors on the right, with arrows labeled conduction, convection, and radiation along the heat path. Students vary outdoor temperature, wind, and a reflective foil in the air gap and see how the heat flow and each mechanism change.
image: /sims/heat-transfer-modes-wall-explorer/heat-transfer-modes-wall-explorer.png
og:image: /sims/heat-transfer-modes-wall-explorer/heat-transfer-modes-wall-explorer.png
twitter:image: /sims/heat-transfer-modes-wall-explorer/heat-transfer-modes-wall-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand
---

# Heat Transfer Modes in a Winter Wall

<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run the Heat Transfer Modes in a Winter Wall MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/heat-transfer-modes-wall-explorer/main.html" width="100%" height="542" scrolling="no"></iframe>
```

## Description

A cross-section of a winter wall shows the warm room on the left and the cold outdoors on the right, with arrows labeled conduction, convection, and radiation along the heat path. Students vary outdoor temperature, wind, and a reflective foil in the air gap and see how the heat flow and each mechanism change.

## How to Use

1. Read the wall from left to right: interior air, interior surface, gypsum board, insulated cavity with an air gap, sheathing, siding, and exterior air. Hover over any zone to see its temperature.
2. Click any arrow. The panel names its mechanism, gives its flow in BTU/h per square foot, and explains in a sentence why that mechanism dominates there.
3. Lower the outdoor temperature and watch every arrow thicken, then raise the wind and watch the exterior convection arrow thicken while the exterior radiation arrow narrows.
4. Check Reflective foil in the air gap and watch the radiation arrow across the gap narrow. Compare the total flow with the design-day flow in the readout.

## Lesson Plan

**Learning objective:** Classify each step of the heat path through a wall as conduction, convection, or radiation, and predict how the heat flow changes with outdoor temperature and wind.

**Suggested activities**

- Warm-up (5 min): Students label a blank wall section with the mechanism at each step, then check against the sim.
- Explore (10 min): Students predict, then test, the effect of cutting the outdoor temperature from -10°F to 30°F, and of raising the wind from 0 to 30 mph. They record the percent of design-day flow.
- Discuss (10 min): Students explain why the total flow barely changes with wind but the share carried by convection does, and why foil matters only in the air gap.

**Assessment**

- Students classify the dominant mechanism for four locations along the heat path and give a one-sentence reason for each.
- Students explain in two sentences why the flow on a 50°F day is about one quarter of the flow on the -10°F design day.

## References

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Heat transfer (Wikipedia)](https://en.wikipedia.org/wiki/Heat_transfer)
- ASHRAE, Handbook of Fundamentals (surface film coefficients and air-space resistances; model values here are simplified and illustrative).

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: infographic
**sim-id:** heat-transfer-modes-wall-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each step of the heat path through a wall as conduction, convection, or radiation, and will predict (Bloom Level 2, Understand) how the heat flow changes with outdoor temperature and wind.

Visual: A horizontal cross-section of a wall with the warm room on the left and the cold outdoors on the right. Labeled zones show interior air, interior surface, gypsum board, insulated cavity, sheathing, siding, and exterior air. Arrows between zones are colored by mechanism, and their thickness scales with the heat flow. The canvas width follows the container, the height is 440 px, and the sketch redraws on window resize.

Controls: A slider labeled "Outdoor temperature (°F)" from −20 to 60 with a default of −10. A slider labeled "Wind speed (mph)" from 0 to 30 with a default of 15. A checkbox labeled "Reflective foil in the air gap" toggles a radiation barrier. The indoor temperature is fixed at 70°F.

Interactions: Clicking any arrow opens an infobox that names the mechanism and gives a one-sentence explanation of why it dominates there. Hovering over a zone shows its temperature. A readout shows total heat flow in BTU/h per square foot and a comparison to the default design day, such as "this is 25 percent of the design-day flow." Raising the wind thickens the exterior convection arrow, and the foil toggle visibly narrows the radiation arrow across the gap.

Colors: Conduction is red, convection is blue, and radiation is orange, with a text label on every arrow.

Implementation: p5.js with a responsive canvas, built-in slider and checkbox controls, a simplified steady-state model, and an infobox div. The model is illustrative and labeled as such.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
