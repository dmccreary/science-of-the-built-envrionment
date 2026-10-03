---
title: Platform Framing Assembly Explorer
description: Students explore an exploded elevation of a two-story platform-framed wall, name each component, and read its function, typical size, and load. Overlays follow the gravity load path, the wind load path, and fire spread, and a balloon-framing toggle and a shrinkage slider show why the platform stops fire but stacks shrinkage.
image: /sims/platform-framing-assembly-explorer/platform-framing-assembly-explorer.png
og:image: /sims/platform-framing-assembly-explorer/platform-framing-assembly-explorer.png
twitter:image: /sims/platform-framing-assembly-explorer/platform-framing-assembly-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Understand
---

# Platform Framing Assembly Explorer

<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>

[Run the Platform Framing Assembly Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/platform-framing-assembly-explorer/main.html" width="100%" height="592" scrolling="no"></iframe>
```

## Description

Students explore an exploded elevation of a two-story platform-framed wall, name each component, and read its function, typical size, and load. Overlays follow the gravity load path, the wind load path, and fire spread, and a balloon-framing toggle and a shrinkage slider show why the platform stops fire but stacks shrinkage.

## How to Use

1. Drag the Assemble slider from 0 percent (exploded) to 100 percent (assembled). Hover over a part to highlight it and see its name, then click it to read its function, typical size, and the load it carries.
2. Choose Gravity load path to follow the blue arrow from the roof to the foundation. Move the mouse over the drawing to start the moving dots. Choose Wind load path to see how studs span from floor to floor.
3. Choose Fire spread. In platform framing each floor platform stops the open wall cavity. Check Balloon framing to replace the platform with continuous studs and see the open cavity run to the attic.
4. Drag the Shrinkage slider from 0 to 3 percent. The red dashed line marks the original top of the wall, and the readout gives the drop in inches for platform and balloon framing. The drop is drawn 10 times larger than real.

## Lesson Plan

**Learning objective:** Identify the components of a platform-framed wall and floor, and explain how each transfers load and how the platform interrupts fire and carries cumulative shrinkage.

**Suggested activities**

- Warm-up (5 min): Students label a blank sketch of a platform-framed wall from memory, then check it against the exploded drawing.
- Explore (10 min): Students click every part, write one sentence on the load each carries, and trace the gravity path from the double top plate down to the foundation wall.
- Compare (10 min): Students switch between platform and balloon framing in the Fire spread overlay and with the shrinkage slider set to 2 percent, and record two advantages and one disadvantage of each.

**Assessment**

- Students explain in two sentences why the floor platform stops fire in the wall cavity.
- Students use the shrinkage slider to find the drop for a platform wall at 2 percent and compare it with the 0.275 in. per floor in Chapter 7.

## References

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
- [Platform framing (Wikipedia)](https://en.wikipedia.org/wiki/Framing_(construction))
- American Wood Council, Wood Frame Construction Manual for One- and Two-Family Dwellings.

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
