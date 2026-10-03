---
title: Wall Assembly R-Value and Thermal Bridging Calculator
description: Students build a framed wall from a cavity insulation, a framing type, and optional continuous XPS, then see the cavity path R, the stud path R, and the effective R from the parallel path method. An optional temperature profile shows where the wall falls below freezing.
image: /sims/wall-assembly-r-value-bridging-calculator/wall-assembly-r-value-bridging-calculator.png
og:image: /sims/wall-assembly-r-value-bridging-calculator/wall-assembly-r-value-bridging-calculator.png
twitter:image: /sims/wall-assembly-r-value-bridging-calculator/wall-assembly-r-value-bridging-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Wall Assembly R-Value and Thermal Bridging Calculator

<iframe src="main.html" width="100%" height="647" scrolling="no"></iframe>

[Run the Wall Assembly R-Value and Thermal Bridging Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/wall-assembly-r-value-bridging-calculator/main.html" width="100%" height="647" scrolling="no"></iframe>
```

## Description

Students build a framed wall from a cavity insulation, a framing type, and optional continuous XPS, then see the cavity path R, the stud path R, and the effective R from the parallel path method. An optional temperature profile shows where the wall falls below freezing.

## How to Use

1. Start with the defaults, a 2x4 wood wall with R-13 fiberglass and a 25 percent framing fraction. The bars show a cavity R of 15.4, a stud R of 6.8, and an effective R of 11.7, the values in the Chapter 3 worked example.
2. Hover over any layer in the wall section to see its R and its temperature drop. The stud strip at the bottom of the framing layer shows the stud path.
3. Change the cavity insulation, the framing, and the framing fraction, and watch the effective R move. Switch the framing to steel to see a much larger drop.
4. Raise the continuous insulation slider, which adds XPS outside the sheathing, and watch the effective R recover.
5. Check Show temperature profile and change the outdoor temperature to see where each path falls below 32 degrees F.

## Lesson Plan

**Learning objective:** Calculate the total R-value and U-value of a wall with the series and parallel path methods, and compare how framing and continuous insulation change the effective R-value.

**Suggested activities**

- Warm-up (5 min): Students reproduce the 15.4, 6.8, and 11.7 values by hand from the layer R-values, then confirm them with the calculator.
- Explore (10 min): Students change one control at a time (framing, framing fraction, continuous insulation) and record the effective R and the percent below the cavity-only value.
- Analyze (10 min): Students find how many inches of XPS bring a 2x4 steel-stud wall to the effective R of the default 2x4 wood wall, and explain why.

**Assessment**

- Students explain in two sentences why a wall with R-13 batts does not have an effective R of 13.
- Students explain why the parallel path method averages U-values rather than R-values.

## References

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Thermal bridge (Wikipedia)](https://en.wikipedia.org/wiki/Thermal_bridge)
- [R-value (insulation) (Wikipedia)](https://en.wikipedia.org/wiki/R-value_(insulation))

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
