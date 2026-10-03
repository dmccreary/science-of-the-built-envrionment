---
title: Wall Assembly R-Value and Thermal Bridging Calculator
description: Students will calculate (Bloom Level 3, Apply) the total R-value and U-value of a wall assembly using the series and parallel path methods, and will compare (Bloom Level 4, Analyze) how framing and continuous insulation change the effective R-value.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Wall Assembly R-Value and Thermal Bridging Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** wall-assembly-r-value-bridging-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the total R-value and U-value of a wall assembly using the series and parallel path methods, and will compare (Bloom Level 4, Analyze) how framing and continuous insulation change the effective R-value.

Visual: A wall cross-section drawn with layers (inside air film, gypsum board, framing and cavity, sheathing, optional continuous insulation, siding, outside air film) and a plan-view strip beneath it showing the stud and cavity paths side by side at the framing fraction. A horizontal bar chart compares the cavity R, the stud R, and the effective R. A temperature-profile line can be toggled across the layers. The canvas width follows the container, the height is 520 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Cavity insulation" (none, fiberglass R-13, fiberglass R-20, cellulose, closed-cell foam). A dropdown labeled "Framing" (2×4 wood, 2×6 wood, 3-5/8 in steel stud). A slider labeled "Continuous insulation (in of XPS)" from 0 to 4 with a default of 0. A slider labeled "Framing fraction (%)" from 10 to 40 with a default of 25. A slider labeled "Outdoor temperature (°F)" from −20 to 40 with a default of −10.

Interactions: The panel shows the cavity R, the stud R, the area-weighted U, the effective R, and the percent reduction from the cavity-only value. Hovering over a layer shows its R and its temperature drop. A "Show temperature profile" toggle plots the temperature through the layers and highlights the point where the temperature falls below freezing. Switching the framing to steel produces a visibly larger drop in effective R, with a one-sentence explanation based on the steel conductivity in this chapter. The defaults reproduce the 15.4, 6.8, and 11.7 values from the text.

Colors: Insulation is yellow, wood is brown, steel is gray, and the temperature line is blue below freezing and red above. Every layer carries a text label.

Implementation: p5.js with a responsive canvas, built-in dropdown and slider controls, a layer lookup table, and a parallel-path calculation function.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
