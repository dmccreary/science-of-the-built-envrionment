---
title: "Roof Assembly Layer Explorer"
description: "Students identify each layer of a steep-slope attic roof and a low-slope membrane roof, see which of the four control layers (water, air, vapor, heat) each one provides, and remove a layer to see what it protects against."
image: /sims/roof-assembly-layer-explorer/roof-assembly-layer-explorer.png
og:image: /sims/roof-assembly-layer-explorer/roof-assembly-layer-explorer.png
twitter:image: /sims/roof-assembly-layer-explorer/roof-assembly-layer-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Understand
---

# Roof Assembly Layer Explorer

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the Roof Assembly Layer Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/roof-assembly-layer-explorer/main.html" width="100%" height="482" scrolling="no"></iframe>
```

## Description

Students identify each layer of a steep-slope attic roof and a low-slope membrane roof, see which of the four control layers (water, air, vapor, heat) each one provides, and remove a layer to see what it protects against.

## How to Use

1. Choose Steep-slope attic roof or Low-slope membrane roof. The layers run from the exterior covering at the top to the interior ceiling at the bottom. Thickness is exaggerated so every layer is legible.
2. Hover over a layer to highlight it and read its name. Click a layer to open the infobox with its function, the control layers it provides (water, air, vapor, heat), and one common failure.
3. With a layer selected, press Remove this layer. The layer is grayed out and the status line at the bottom tells what goes wrong. Press the button again, or Restore all layers, to put it back.
4. Tick Show heat flow to see arrows through the insulation, the heat loss, and winter temperatures at 70 °F inside and 10 °F outside. Tick Show water path to watch a raindrop run over the covering, or soak in when the water control is removed.

## Lesson Plan

**Learning objective:** Identify each layer of a steep-slope and a low-slope roof assembly and explain which of the four control layers each layer provides.

**Suggested activities**

- Warm-up (5 min): Students list from memory the layers of a roof from the room to the sky, then check the list against the steep-slope stack.
- Explore (10 min): Students click every layer in both stacks and complete a table with the columns layer, control layer provided, and common failure.
- Predict and test (10 min): Students predict the consequence of removing each layer, then press Remove this layer and compare the status line with their prediction.

**Assessment**

- Students explain which layer provides the air barrier and which provides the water control in each roof type, and why the two are in different places.
- Students explain in two sentences why a shingle covering is not enough by itself to keep a building dry.

## References

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
- [Roof (Wikipedia)](https://en.wikipedia.org/wiki/Roof)
- National Roofing Contractors Association (NRCA), The NRCA Roofing Manual (steep-slope and membrane roof systems).

## Specification

The full specification below is extracted from
[Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md).

```text
Type: infographic
**sim-id:** roof-assembly-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) each layer of a steep-slope and a low-slope roof assembly and will explain (Bloom Level 2, Understand) which of the four control layers (water, air, vapor, heat) each layer provides.

Visual: A cross-section drawing of a roof from interior ceiling to exterior surface, drawn to a distorted but proportional thickness so every layer is legible. A tab control labeled "Steep-slope attic roof" and "Low-slope membrane roof" switches between the two stacks. Each layer is a labeled, color-coded band. On the right, a four-icon legend shows water, air, vapor, and heat control.

Interactions: Hovering over a layer highlights it and shows a tooltip with its name. Clicking a layer opens an infobox with its function, the control layer(s) it provides, and one common failure (for example, "underlayment: torn at eave, allows wind-driven water"). A toggle labeled "Show heat flow" draws arrows from interior to exterior through the insulation and shows temperature labels in winter. A toggle labeled "Show water path" animates a raindrop along the shortest route over or through the assembly. A "Remove this layer" button on each infobox grays out the layer and displays the consequence in a status line, so students can see what each layer protects against.

Colors: Structure in brown, insulation in yellow, membrane and underlayment in dark gray, covering in the color of the selected roof type. Colors are paired with patterns so the diagram works without color.

Responsive design: The canvas width follows the container and redraws on window resize. Height is 460 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createButton and createCheckbox controls, and an infobox drawn in a div beneath the canvas.
```

## Related Resources

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
