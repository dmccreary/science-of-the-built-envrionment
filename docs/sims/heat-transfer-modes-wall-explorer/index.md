---
title: Heat Transfer Modes in a Winter Wall
description: Students will classify (Bloom Level 2, Understand) each step of the heat path through a wall as conduction, convection, or radiation, and will predict (Bloom Level 2, Understand) how the heat flow changes with outdoor temperature and wind.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Heat Transfer Modes in a Winter Wall



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
