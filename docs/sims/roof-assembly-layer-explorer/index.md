---
title: Roof Assembly Layer Explorer
description: Students will identify (Bloom Level 1, Remember) each layer of a steep-slope and a low-slope roof assembly and will explain (Bloom Level 2, Understand) which of the four control layers (water, air, vapor, heat) each layer provides.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Roof Assembly Layer Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
