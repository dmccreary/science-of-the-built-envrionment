---
title: Plumbing Supply and DWV Explorer
description: Students explore a cross-section of a two-story building to tell thin, sealed, pressurized supply pipes from thick, sloped, gravity-driven drain-waste-vent pipes, then flush a toilet, remove the vent, and run a freeze test.
image: /sims/plumbing-supply-dwv-explorer/plumbing-supply-dwv-explorer.png
og:image: /sims/plumbing-supply-dwv-explorer/plumbing-supply-dwv-explorer.png
twitter:image: /sims/plumbing-supply-dwv-explorer/plumbing-supply-dwv-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Understand
---

# Plumbing Supply and DWV Explorer

<iframe src="main.html" width="100%" height="587" scrolling="no"></iframe>

[Run the Plumbing Supply and DWV Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/plumbing-supply-dwv-explorer/main.html" width="100%" height="587" scrolling="no"></iframe>
```

## Description

Students explore a cross-section of a two-story building to tell thin, sealed, pressurized supply pipes from thick, sloped, gravity-driven drain-waste-vent pipes, then flush a toilet, remove the vent, and run a freeze test.

## How to Use

1. Hover over any pipe or fixture to highlight it and read its name, then click it to read its function, whether it is under pressure or gravity-driven, and a typical code note in the infobox.
2. Use the Show supply system, Show DWV system, and Show vent checkboxes to look at one system at a time. Compare line styles: thin solid blue is cold supply, thin dashed red is hot supply, thick gray is drain, and green dashes are vent.
3. Press Flush toilet to watch waste water travel by gravity through the trap, branch drain, stack, building drain, and sewer while the cold supply refills the tank.
4. Check Remove vent and flush again to see the trap pulled dry and the status line report sewer gas. Uncheck it to restore the vent.
5. Drag the Freeze test slider below 32 degrees F to highlight the supply pipes in the exterior wall.

## Lesson Plan

**Learning objective:** Distinguish pressurized supply piping from gravity drain-waste-vent piping, and explain the role of the trap and the vent in a fixture's drain.

**Suggested activities**

- Sort (5 min): With only the supply system showing and then only the DWV system, students list three differences in pipe size, slope, and what fills the pipe.
- Predict and test (10 min): Students predict what happens to the trap when the vent is removed and the toilet is flushed, then test it and explain the result using suction behind the flowing water.
- Locate (10 min): Using the freeze test, students identify which pipes are at risk and propose where the pipes should run instead.

**Assessment**

- Students sketch the path of one flush from the toilet to the city sewer and label the trap, branch drain, stack, building drain, cleanout, and building sewer.
- Students explain in two sentences why a drain must slope downhill but a supply pipe can run uphill.

## References

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Drain-waste-vent system (Wikipedia)](https://en.wikipedia.org/wiki/Drain-waste-vent_system)
- International Code Council, International Plumbing Code (traps, vents, and drain slope; verify the adopted edition).

## Specification

The full specification below is extracted from
[Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md).

```text
Type: infographic
**sim-id:** plumbing-supply-dwv-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will distinguish (Bloom Level 4, Analyze) pressurized supply piping from gravity drain-waste-vent piping and will explain (Bloom Level 2, Understand) the role of the trap and vent in a fixture's drain.

Visual: A cross-section of a two-story building showing a service line entering below the frost line, a meter, a water heater, hot and cold supply lines in blue and red, a restroom group with a toilet and lavatory, a vertical stack, a building drain, a cleanout, a building sewer, and a vent pipe through the roof. Supply pipes are drawn thin and sealed. Drain and vent pipes are drawn thick and sloped.

Controls: A toggle labeled "Show supply system," a toggle labeled "Show DWV system," and a toggle labeled "Show vent." A button labeled "Flush toilet" animates water moving through the system. A checkbox labeled "Remove vent" shows the consequence of an unvented drain: the trap is sucked dry and the status line reads "Sewer gas now enters the room."

Interactions: Hovering over any pipe or component highlights it and shows its name. Clicking opens an infobox with its function, whether the pipe is under pressure or gravity-driven, and a typical code requirement (for example, "Horizontal drains slope about one-quarter inch per foot"). A "Freeze test" slider lowers the outdoor temperature and highlights any pipe in an exterior wall that falls below 32 °F.

Colors: Cold supply in blue, hot supply in red, drain in gray, vent in green, with line style differences so the diagram works without color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createButton, createCheckbox, and createSlider controls, and an infobox below the canvas.
```

## Related Resources

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
