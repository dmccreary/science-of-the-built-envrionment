---
title: One-Line Diagram Symbol Explorer
description: Students will interpret (Bloom Level 2, Understand) a one-line diagram by identifying symbols and ratings, and will trace (Bloom Level 3, Apply) the path and protection for a chosen load.
status: scaffold
library: p5.js
bloom_level: TBD
---

# One-Line Diagram Symbol Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: infographic
**sim-id:** one-line-diagram-symbol-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will interpret (Bloom Level 2, Understand) a one-line diagram by identifying symbols and ratings, and will trace (Bloom Level 3, Apply) the path and protection for a chosen load.

Visual: A one-line diagram of the Riverbend Youth Center electrical system showing the utility transformer, meter, 200 A main breaker, main distribution panel, a feeder to lighting panel LP-1, a feeder to mechanical panel MP-1, a 40 A three-pole breaker serving the kitchen oven, and an automatic transfer switch with an emergency lighting circuit. A legend lists the symbols.

Controls: A drop-down labeled "Trace load" with options such as kitchen oven, classroom lighting, rooftop unit, and emergency lights. A checkbox labeled "Show ratings" and a checkbox labeled "Show wire sizes." A button labeled "Trip main breaker."

Interactions: Hovering over any symbol shows its name. Clicking a symbol opens an infobox with a definition, what the symbol stands for in a real room, and the rating shown. Choosing a load highlights the path from the utility to that load and lists each device in order. Pressing the trip button de-energizes all downstream devices and highlights the emergency circuit, which remains lit through the transfer switch.

Colors: Energized lines in green, de-energized lines in dark gray, highlighted paths in orange, with symbols labeled in text.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createCheckbox, and createButton controls.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
