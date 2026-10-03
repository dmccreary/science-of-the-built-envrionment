---
title: Basement Wall Soil Pressure Explorer
description: Students will calculate (Bloom Level 3, Apply) the lateral force on a foundation or retaining wall and will analyze (Bloom Level 4, Analyze) how wall height and water in the backfill change it.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Basement Wall Soil Pressure Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md).

```text
Type: microsim
**sim-id:** foundation-wall-lateral-pressure-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the lateral force on a foundation or retaining wall and will analyze (Bloom Level 4, Analyze) how wall height and water in the backfill change it.

Visual: A cross-section of a wall with soil on one side. A triangular pressure diagram is drawn against the wall, with arrows whose length grows with depth. A force readout and a resultant arrow at one third of the height are shown. A second, lighter triangle appears when water is added. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A slider for wall height from 4 to 14 ft. A dropdown for backfill (clean gravel at 30 pcf, silty sand at 45 pcf, clay at 60 pcf; labeled "illustrative"). A checkbox "Water fills the backfill." A checkbox "Add 100 psf surcharge" for a parking lot or driveway beside the wall.

Interactions: Hovering over the pressure triangle shows the pressure at that depth. A readout shows base pressure, force per foot, and the height of the resultant. A message compares the force with and without water and explains what a perimeter drain does.

Default state: 8 ft, silty sand, dry, force of 1,440 lb per foot.

Implementation: p5.js with built-in slider, select, and checkboxes, and a responsive canvas.
```

## Related Resources

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
