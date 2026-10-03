---
title: Conduction Through a Layer
description: Students will calculate (Bloom Level 3, Apply) the conductive heat flow through a single layer and will compare (Bloom Level 4, Analyze) how conductivity, thickness, area, and temperature difference each change the result.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Conduction Through a Layer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** conduction-layer-heat-flow-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the conductive heat flow through a single layer and will compare (Bloom Level 4, Analyze) how conductivity, thickness, area, and temperature difference each change the result.

Visual: A rectangular slab with a hot face on the left and a cold face on the right, drawn with a color gradient that shows the temperature dropping from one side to the other. Heat-flow arrows on the slab scale with the computed rate. A side-by-side "Compare" panel can show two layers at once. The canvas width follows the container, the height is 420 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Material" listing the seven materials in the table above. A slider labeled "Thickness (in)" from 0.5 to 12 with a default of 3.5. A slider labeled "Area (ft²)" from 1 to 100 with a default of 1. A slider labeled "Temperature difference (°F)" from 5 to 100 with a default of 70. A checkbox labeled "Compare two materials" adds a second slab with its own material dropdown.

Interactions: A readout shows \( \dot{Q} \) in BTU/h with the substituted equation. Hovering over the slab shows the local temperature at that depth. Doubling a slider value triggers a message such as "Doubling thickness halves the flow." In compare mode, a bar shows the ratio of the two heat flows.

Colors: A red-to-blue gradient for temperature, and gray arrows for heat flow. Values appear in text as well as color.

Implementation: p5.js with a responsive canvas, built-in controls, and a lookup table of conductivities.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
