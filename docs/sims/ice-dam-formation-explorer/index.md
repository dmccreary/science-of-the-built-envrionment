---
title: Ice Dam Formation Explorer
description: Students will analyze (Bloom Level 4, Analyze) how ceiling air leakage, insulation level, and attic ventilation combine to produce or prevent an ice dam on a Minnesota roof.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Ice Dam Formation Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md).

```text
Type: microsim
**sim-id:** ice-dam-formation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how ceiling air leakage, insulation level, and attic ventilation combine to produce or prevent an ice dam on a Minnesota roof.

Visual: A side section of a house eave and attic with a snow layer on the roof. Color shading shows temperature, from warm orange near the ceiling to cool blue at the soffit. Arrows show heat flow and air movement. Ice appears at the eave when conditions allow it.

Controls: A slider for outdoor temperature (-20 to 30 °F), a slider for insulation R-value (R-19 to R-60), a checkbox "Air leaks at ceiling," a checkbox "Soffit and ridge vents open," and a checkbox "Ice-and-water barrier at eave."

Interactions: As controls change, the roof deck temperature updates and snow melts on the part of the roof above 32 °F. Meltwater flows to the eave and freezes if the overhang is below 32 °F. A readout says "Ice dam: forming, minor, or none" and a second readout says "Water reaching interior: yes or no." The first fix suggested by the status line is always air sealing, and the ice-and-water barrier checkbox shows that it protects the interior but does not stop the dam from forming.

Colors: Temperature gradient from blue through white to orange, ice in pale cyan with an outline, water drops in blue.

Responsive design: The canvas follows the container width and redraws on resize. Height is 460 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createCheckbox controls, and a simple steady-state temperature calculation for the deck.
```

## Related Resources

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
