---
title: Force Vector Resolver
description: Students will calculate (Bloom Level 3, Apply) the horizontal and vertical components of an inclined force and will explain (Bloom Level 2, Understand) why the two components together have the same effect as the original force.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Force Vector Resolver



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** force-vector-resolver<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the horizontal and vertical components of an inclined force and will explain (Bloom Level 2, Understand) why the two components together have the same effect as the original force.

Visual: A canvas showing a labeled node at the center and a bold arrow representing a force. Dashed horizontal and vertical arrows form a right triangle that shows the components. A live readout panel displays the magnitude, the angle, and the two components in both pounds and newtons. The canvas width follows the container, the height is 420 px, and the sketch redraws on window resize.

Controls: A slider labeled "Force (lb)" from 0 to 10,000 with a default of 5,000. A slider labeled "Angle (degrees)" from 0 to 90 with a default of 45. The student can also drag the arrow tip directly, and the sliders update to match. A checkbox labeled "Show equations" displays the substituted values for \( F\cos\theta \) and \( F\sin\theta \). A button labeled "Riverbend roof" loads a preset that draws the 168-kip roof load as a downward vector.

Interactions: Hovering over any arrow shows a tooltip with its name and value. A "Predict first" mode asks the student to type the horizontal component, and the sketch then shows whether the answer is correct and displays the calculation. A message states when the angle is 0 (all force horizontal) or 90 (all force vertical).

Colors: The force is dark orange, the horizontal component is blue, and the vertical component is green. Arrow labels use text as well as color.

Implementation: p5.js with a responsive canvas, built-in slider and checkbox controls, and a small infobox div.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
