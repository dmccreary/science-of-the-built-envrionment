---
title: Foundation Cross-Section Explorer
description: Students will identify (Bloom Level 1, Remember) the parts of a typical cold-climate foundation and explain (Bloom Level 2, Understand) the job of each part.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Foundation Cross-Section Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md).

```text
Type: infographic
**sim-id:** foundation-cross-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the parts of a typical cold-climate foundation and explain (Bloom Level 2, Understand) the job of each part.

Visual: A cross-section of a Riverbend exterior wall with the following parts drawn to scale and labeled by number: continuous footing, footing reinforcement, foundation wall, anchor bolt and sill plate, slab-on-grade, gravel base, vapor retarder, perimeter drain pipe in gravel, backfill, finished grade sloped away, frost depth line at 42 in. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown to switch the cross-section between slab-on-grade, crawl space, and basement. A checkbox "Show frost line." A "Show loads" toggle that draws arrows for the load path from the wall to the soil.

Interactions: Hovering over a part highlights it and shows its name. Clicking a part opens an infobox with its function, a typical dimension (marked "typical" and not required), and the section of this chapter where it is explained. Changing the dropdown rebuilds the cross-section and highlights the parts that are new.

Default state: Slab-on-grade, frost line shown, no loads.

Implementation: p5.js with a built-in select and checkboxes, region hit-testing for clicks, and a responsive canvas.
```

## Related Resources

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
