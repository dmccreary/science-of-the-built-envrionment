---
title: Tributary Area and Load Takedown Calculator
description: Students will calculate (Bloom Level 3, Apply) the line load, reaction, and maximum moment of a joist, girder, and post from a surface load and member spacing, and will predict (Bloom Level 2, Understand) how changing the spacing or span changes the load each member carries.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Tributary Area and Load Takedown Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md).

```text
Type: microsim
**sim-id:** tributary-area-roof-takedown-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the line load, reaction, and maximum moment of a joist, girder, and post from a surface load and member spacing, and will predict (Bloom Level 2, Understand) how changing the spacing or span changes the load each member carries.

Visual: A plan view of the Riverbend multipurpose room roof showing the girders as heavy horizontal lines, joists as thin vertical lines, and posts as squares. One selected member is highlighted, and its tributary area is shaded. Below the plan, a beam diagram shows the selected member with arrows for its line load and reaction values. The canvas follows the container width with a height of 520 px and redraws on resize.

Controls: Sliders for "Roof load (psf)" (20 to 100), "Joist spacing (in.)" (12, 16, 19.2, 24), "Girder spacing (ft)" (8 to 24), and "Girder span (ft)" (20 to 60). A drop-down labeled "Selected member" chooses a joist, girder, or post. A "Check equilibrium" button sums all reactions and compares them with the total load on the bay.

Interactions: Dragging any slider updates the shaded tributary area, \( w \), \( R \), and \( M_{max} \) immediately. Hovering over the shaded area explains in one sentence how the area was found. Clicking "Check equilibrium" displays a green check if the reactions equal the load and a red message otherwise. The default state reproduces the Riverbend values of 50 psf, 24 in., 16 ft, and 40 ft, giving 16,000 lb at each post.

Colors: Tributary areas are light blue, the selected member is orange, and reactions are green arrows. Values are always shown as text.

Implementation: p5.js with DOM sliders, a drop-down, and a responsive canvas.
```

## Related Resources

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
