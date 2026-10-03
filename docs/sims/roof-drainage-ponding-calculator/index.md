---
title: Roof Drainage and Ponding Calculator
description: Students will calculate (Bloom Level 3, Apply) the flow a roof drain must carry from roof area and rainfall intensity, and will predict (Bloom Level 2, Understand) how a clogged drain converts a rainfall into a standing-water load.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Roof Drainage and Ponding Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md).

```text
Type: microsim
**sim-id:** roof-drainage-ponding-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the flow a roof drain must carry from roof area and rainfall intensity, and will predict (Bloom Level 2, Understand) how a clogged drain converts a rainfall into a standing-water load.

Visual: A plan view of a rectangular roof with four drain symbols and a side-section view below it showing the roof deck, the water surface, and a deflection curve exaggerated for visibility. A readout panel shows total flow in gallons per minute, flow per drain, and ponding load in pounds per square foot and in total pounds.

Controls: A slider for roof area (2,000 to 20,000 ft²), a slider for rainfall intensity (1 to 6 inches per hour), a selector for number of drains (2 to 8), and a checkbox for each drain labeled "Clogged." A checkbox labeled "Secondary overflow installed" adds a scupper at a set height, and a "Run storm for 30 minutes" button animates the water level.

Interactions: Changing any control updates the readouts immediately. When drains are clogged, the water depth in the side section rises with time. When depth reaches the scupper height and the overflow is installed, water spills out and the depth stops rising; with no overflow, the depth keeps rising and the deflection curve deepens, with a status line reading "Progressive ponding: deflection adds water, which adds deflection."

Colors: Roof in gray, water in blue, clogged drains in red with an X symbol, a depth gauge in black.

Responsive design: The canvas follows the container width and redraws on resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider, createSelect, createCheckbox, and createButton controls.
```

## Related Resources

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
