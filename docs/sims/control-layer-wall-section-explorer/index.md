---
title: Control Layer Wall Section Explorer
description: Students will identify (Bloom Level 1, Remember) the layers of a cold-climate wall and the control layer each belongs to, and will predict (Bloom Level 2, Understand) the consequence of removing or breaking each layer.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Control Layer Wall Section Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md).

```text
Type: microsim
**sim-id:** control-layer-wall-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the layers of a cold-climate wall and the control layer each belongs to, and will predict (Bloom Level 2, Understand) the consequence of removing or breaking each layer.

Visual: A cross-section of the Riverbend wall drawn to scale, showing from left (exterior) to right (interior): cladding, drainage gap, weather-resistive barrier, rigid foam, sheathing, stud cavity with insulation, smart vapor retarder, and gypsum board. A four-color band beside the section marks which layers serve the water (blue), air (green), vapor (purple), and thermal (orange) control functions. Small arrows show rain, air, vapor, and heat approaching from outside or inside. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A checkbox beside each layer to "remove" it. A dropdown for the failure type ("missing," "hole," "unsealed seam"). A slider for outdoor temperature (-20 to 40°F), with indoor fixed at 70°F. A "Show temperature profile" toggle that draws the temperature through the wall as a line. A "Reset" button.

Interactions: Clicking a layer opens an infobox with its job, the material options, and the risks if it is missing. Removing a layer animates the corresponding flow (rain soaking the sheathing, air carrying vapor to the cold plane, heat flow arrows thickening) and shows a one-sentence consequence. When the temperature profile is on, the point where the sheathing drops below the dew point of the indoor air is highlighted in red with a "condensation risk" label.

Default state: All layers present, outdoor -10°F, profile hidden.

Implementation: p5.js with built-in checkboxes, select, slider, and buttons, and a responsive canvas.
```

## Related Resources

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
