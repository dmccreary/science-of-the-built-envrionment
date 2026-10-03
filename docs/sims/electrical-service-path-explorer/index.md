---
title: Electrical Service Path Explorer
description: Students will identify (Bloom Level 1, Remember) each stage of the path from utility to outlet and will explain (Bloom Level 2, Understand) what voltage, current, and protection exist at each stage.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Electrical Service Path Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md).

```text
Type: infographic
**sim-id:** electrical-service-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) each stage of the path from utility to outlet and will explain (Bloom Level 2, Understand) what voltage, current, and protection exist at each stage.

Visual: A left-to-right diagram in the style of a simple one-line diagram. From left to right the stages are: utility primary line, pad-mounted transformer, meter, service entrance equipment with main breaker, feeder, panelboard with breakers, branch circuit, and loads (light, receptacle, and motor). Each stage is a labeled block, and lines show the path of power. Voltage and current labels appear above the path.

Controls: A drop-down labeled "Service type" with "120/240 V single-phase," "208Y/120 V three-phase," and "480Y/277 V three-phase." A slider labeled "Building load (kVA)" from 10 to 500. A button labeled "Trip a breaker" and a drop-down to choose which breaker.

Interactions: Hovering over a block shows its name. Clicking a block opens an infobox with its function, typical voltage, typical current at the chosen load, who owns it (utility or owner), and the code idea that governs it. Changing the building load updates the current labels along the path, and any block whose rating is exceeded turns red with the message "Rating exceeded. Select larger equipment." Tripping a breaker darkens everything downstream of it and leaves everything upstream energized.

Colors: Utility-owned equipment in blue, owner-owned equipment in green, tripped sections in dark gray, overloaded blocks in red. Each state is also labeled with text.

Responsive design: The canvas follows the container width and redraws on window resize. On narrow screens the stages stack vertically. Height is 500 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createSlider, and createButton controls created before any positioning function.
```

## Related Resources

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
