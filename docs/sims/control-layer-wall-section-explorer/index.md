---
title: Control Layer Wall Section Explorer
description: Students identify the eight layers of the Riverbend cold-climate wall, see which control layer each serves (water, air, vapor, or thermal), and break layers to predict what happens to rain, air, vapor, heat, and the temperature of the sheathing.
image: /sims/control-layer-wall-section-explorer/control-layer-wall-section-explorer.png
og:image: /sims/control-layer-wall-section-explorer/control-layer-wall-section-explorer.png
twitter:image: /sims/control-layer-wall-section-explorer/control-layer-wall-section-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Understand
---

# Control Layer Wall Section Explorer

<iframe src="main.html" width="100%" height="688" scrolling="no"></iframe>

[Run the Control Layer Wall Section Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/control-layer-wall-section-explorer/main.html" width="100%" height="688" scrolling="no"></iframe>
```

## Description

Students identify the eight layers of the Riverbend cold-climate wall, see which control layer each serves (water, air, vapor, or thermal), and break layers to predict what happens to rain, air, vapor, heat, and the temperature of the sheathing.

## How to Use

1. Read the wall from outside (left) to inside (right). The numbered tags match the checkboxes, and the colored band under the strips shows which layers do the water (W), air (A), vapor (V), and thermal (T) jobs.
2. Click a layer, or its number, to read its job, materials, and the risk if it is missing. Hover over a layer for its R-value and function.
3. Tick a layer's checkbox to break it. Choose the failure type (missing, hole, or unsealed seam) first; it applies to every ticked layer. Read the one-sentence result under What happens, and watch where the rain, air, vapor, and heat lines now stop or pass.
4. Move the outdoor temperature slider and tick Temp. profile to draw the temperature through the wall. The sheathing turns red when it falls below the 37 degree F dew point of the room air.
5. Press Reset to return to the complete wall at -10 degrees F. Move the pointer over the drawing to animate the flow dots.

## Lesson Plan

**Learning objective:** Identify the layers of a cold-climate wall and the control layer each belongs to, and predict the consequence of removing or breaking each layer.

**Suggested activities**

- Warm-up (5 min): Students sketch a wall section from memory and color each layer by its job, then compare with the colored band.
- Predict and test (10 min): Before ticking a box, students predict which of the four lines will pass through the wall, then check, for the water, air, vapor, and thermal layers in turn.
- Analyze (10 min): Students break the foam and then the batts and compare the heat flow and sheathing temperature, linking the result to the Chapter 11 continuous-insulation example.

**Assessment**

- Students name the control layer served by each of the eight layers and say which layers serve more than one.
- Students explain in two sentences why a hole in the weather-resistive barrier and a gap in the taped sheathing wet the same sheathing by different routes.

## References

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
- [Building envelope (Wikipedia)](https://en.wikipedia.org/wiki/Building_envelope)
- [Dew point (Wikipedia)](https://en.wikipedia.org/wiki/Dew_point)

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
