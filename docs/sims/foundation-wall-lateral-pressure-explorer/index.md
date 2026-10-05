---
title: Basement Wall Soil Pressure Explorer
description: Students vary wall height, backfill, water, and a parking-lot surcharge and watch the triangular soil pressure diagram, the force per foot of wall, and the height of the resultant change.
image: /sims/foundation-wall-lateral-pressure-explorer/foundation-wall-lateral-pressure-explorer.png
og:image: /sims/foundation-wall-lateral-pressure-explorer/foundation-wall-lateral-pressure-explorer.png
twitter:image: /sims/foundation-wall-lateral-pressure-explorer/foundation-wall-lateral-pressure-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Basement Wall Soil Pressure Explorer

<iframe src="main.html" width="100%" height="577" scrolling="no"></iframe>

[Run the Basement Wall Soil Pressure Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/foundation-wall-lateral-pressure-explorer/main.html" width="100%" height="577" scrolling="no"></iframe>
```

## Description

Students vary wall height, backfill, water, and a parking-lot surcharge and watch the triangular soil pressure diagram, the force per foot of wall, and the height of the resultant change.

## How to Use

1. Start with the default 8 ft wall of silty sand at 45 pcf. The base pressure is 360 psf, the force is 1,440 lb per foot of wall, and the red resultant arrow sits 2.67 ft above the base.
2. Move the Wall height slider and watch the force grow with the square of the height. Choose a different backfill to change the equivalent fluid pressure.
3. Check Water fills the backfill to add a second, lighter blue triangle, and check Add 100 psf surcharge to add the red band for a parking lot or driveway beside the wall.
4. Hover over the pressure diagram to read the pressure at that depth, and read the message that compares the force with and without water.

## Lesson Plan

**Learning objective:** Calculate the lateral force on a foundation wall from the equivalent fluid pressure, and analyze how wall height and water in the backfill change it.

**Suggested activities**

- Warm-up (5 min): Students reproduce the Chapter 10 example by hand, 0.5 x 45 x 8 squared = 1,440 lb per foot, and confirm it in the MicroSim.
- Explore (10 min): Students record the force for 4, 8, and 12 ft walls and show that doubling the height multiplies the force by four.
- Analyze (10 min): Students add water and then a surcharge, record each new force, and write a sentence explaining what a perimeter drain prevents.

**Assessment**

- Students calculate the force on a 10 ft clay-backfill wall, with and without water, and check it in the MicroSim.
- Students explain in two sentences why a basement wall that is safe with drainage can crack when the drain fails.

## References

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
- [Lateral earth pressure (Wikipedia)](https://en.wikipedia.org/wiki/Lateral_earth_pressure)
- [Retaining wall (Wikipedia)](https://en.wikipedia.org/wiki/Retaining_wall)

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
