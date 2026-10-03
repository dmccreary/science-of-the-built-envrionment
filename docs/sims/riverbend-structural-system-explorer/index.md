---
title: Riverbend Structural System Explorer
description: Students explore an exploded view of the idealized Riverbend building (120 ft by 75 ft) and classify each element as part of the gravity system, the lateral system, or both. Load arrows scale with dead, snow, and wind pressure, and removing an element shows which requirement (strength, stiffness, or stability) is put at risk.
image: /sims/riverbend-structural-system-explorer/riverbend-structural-system-explorer.png
og:image: /sims/riverbend-structural-system-explorer/riverbend-structural-system-explorer.png
twitter:image: /sims/riverbend-structural-system-explorer/riverbend-structural-system-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Understand
---

# Riverbend Structural System Explorer

<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>

[Run the Riverbend Structural System Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/riverbend-structural-system-explorer/main.html" width="100%" height="592" scrolling="no"></iframe>
```

## Description

Students explore an exploded view of the idealized Riverbend building (120 ft by 75 ft) and classify each element as part of the gravity system, the lateral system, or both. Load arrows scale with dead, snow, and wind pressure, and removing an element shows which requirement (strength, stiffness, or stability) is put at risk.

## How to Use

1. Choose Show gravity system, Show lateral system, or Show both. Elements that are not part of the chosen system fade out. Blue elements are gravity, orange elements are lateral, and striped elements serve both.
2. Hover over an element to see its name, then click it. The infobox gives its definition, the system it belongs to, what it hands the load to next, and the requirements it helps satisfy.
3. Check Dead load, Snow load, and Wind load to draw arrows of proportional length. Drag Wind speed from 70 to 130 mph and watch the wind arrows grow with the square of the speed.
4. With an element selected, press Remove this element. It turns gray with an X, and the infobox names the requirement at risk. Press Restore this element to bring it back.

## Lesson Plan

**Learning objective:** Classify each element of a simple wood-framed building as gravity, lateral, or both, and identify the requirement each element helps satisfy.

**Suggested activities**

- Warm-up (5 min): Students list the elements they expect in the gravity system and in the lateral system, then compare with the colors in the drawing.
- Explore (10 min): Students click every element, record its system and what it hands the load to next, and identify the three elements that serve both systems.
- Analyze (10 min): Students remove one element at a time, write which requirement (strength, stiffness, or stability) is at risk, and compare answers with a partner.

**Assessment**

- Students explain in two sentences why the roof deck and the wall framing appear in both the gravity and the lateral systems.
- Students set the wind speed to 70 mph and 130 mph and state the ratio of the wind arrow lengths, with a reason.

## References

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
- [Structural system (Wikipedia)](https://en.wikipedia.org/wiki/Structural_system)
- American Society of Civil Engineers, ASCE/SEI 7, Minimum Design Loads and Associated Criteria for Buildings and Other Structures.

## Specification

The full specification below is extracted from
[Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md).

```text
Type: microsim
**sim-id:** riverbend-structural-system-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each element of a simple wood-framed building as part of the gravity load system, the lateral load system, or both, and will identify (Bloom Level 1, Remember) the strength, stiffness, and stability requirement that each element helps satisfy.

Visual: A cutaway three-dimensional-style view of the idealized Riverbend building (120 ft by 75 ft, 14 ft eave) showing the foundation, wall framing, roof deck, joists, glulam girders over the multipurpose room, posts, and the roof diaphragm. The canvas width follows the container and the height is 480 px. Elements are drawn in a flat, labeled style so that every part is visible at once.

Controls: Radio buttons labeled "Show gravity system," "Show lateral system," and "Show both" fade elements in and out. Checkboxes for "Dead load," "Snow load," and "Wind load" draw arrows of proportional length on the building. A slider labeled "Wind speed" (70 to 130 mph) rescales the wind arrows according to the square of speed.

Interactions: Hovering over an element highlights it and shows its name. Clicking an element opens an infobox with its definition, whether it belongs to the gravity system, the lateral system, or both, and what it hands the load to next. A "Remove this element" button on the infobox grays out the element and displays a one-sentence message about which requirement (strength, stiffness, or stability) would be at risk.

Colors: Gravity elements are blue, lateral elements are orange, and elements that serve both are striped blue and orange. Labels are text, not color alone.

Implementation: p5.js with a responsive canvas, DOM radio buttons, checkboxes, and slider, and an infobox div.
```

## Related Resources

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
