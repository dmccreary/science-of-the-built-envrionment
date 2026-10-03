---
title: Platform Framing Assembly Explorer
description: Students will identify (Bloom Level 1, Remember) the components of a platform-framed wall and floor, and will explain (Bloom Level 2, Understand) how each component transfers load and how the platform interrupts the paths of fire and carries cumulative shrinkage.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Platform Framing Assembly Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md).

```text
Type: microsim
**sim-id:** platform-framing-assembly-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the components of a platform-framed wall and floor, and will explain (Bloom Level 2, Understand) how each component transfers load and how the platform interrupts the paths of fire and carries cumulative shrinkage.

Visual: An exploded cross-section of a two-story platform-framed exterior wall showing the foundation wall, sill plate, floor joists, band joist, subfloor, sole plate, studs, double top plate, header over a window opening, king and jack studs, wall sheathing, and the next floor platform. The canvas width follows the container with a height of 520 px and redraws on resize.

Controls: A slider labeled "Assemble" moves the parts from exploded to assembled positions. Radio buttons labeled "Gravity load path," "Wind load path," and "Fire spread" select an overlay. A toggle labeled "Balloon framing" replaces the platform with continuous studs to compare.

Interactions: Hovering over a component highlights it and displays its name. Clicking opens an infobox that gives its function, typical size, and the load it carries. In the "Gravity load path" overlay, arrows animate through studs, plates, and joists. In the "Fire spread" overlay, the platform version shows a fire-stop at each floor and the balloon version shows an open vertical cavity. A "Shrinkage" slider (0 to 3 percent) shows the platform's horizontal grain stack shrinking, with a readout in inches.

Colors: Lumber is tan, sheathing is light yellow, and load arrows are blue. Fire paths are orange and have text labels.

Implementation: p5.js with a responsive canvas, DOM controls, and an infobox div.
```

## Related Resources

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
