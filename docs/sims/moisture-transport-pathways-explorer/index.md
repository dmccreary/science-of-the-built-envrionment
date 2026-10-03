---
title: Moisture Pathways in a Wall
description: Students explore a section drawing of a Minnesota wall on a concrete foundation and classify each way moisture reaches it as bulk water, capillary action, air movement, or vapor diffusion. Each pathway has a driver, an example, and a matching control, and a quiz mode tests the match.
image: /sims/moisture-transport-pathways-explorer/moisture-transport-pathways-explorer.png
og:image: /sims/moisture-transport-pathways-explorer/moisture-transport-pathways-explorer.png
twitter:image: /sims/moisture-transport-pathways-explorer/moisture-transport-pathways-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand
---

# Moisture Pathways in a Wall

<iframe src="main.html" width="100%" height="582" scrolling="no"></iframe>

[Run the Moisture Pathways in a Wall MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/moisture-transport-pathways-explorer/main.html" width="100%" height="582" scrolling="no"></iframe>
```

## Description

Students explore a section drawing of a Minnesota wall on a concrete foundation and classify each way moisture reaches it as bulk water, capillary action, air movement, or vapor diffusion. Each pathway has a driver, an example, and a matching control, and a quiz mode tests the match.

## How to Use

1. Click any arrow in the wall drawing, or press one of the four pathway buttons, to open the info panel with the pathway's driver, an example, and its control.
2. Press a pathway button to switch its arrows on or off. A struck-through label means the pathway is hidden.
3. Check Show controls to overlay the matching control in the pathway's color: head flashing, a capillary break, an air barrier, and a vapor retarder.
4. Hover over the drawing to see the name of each layer: siding, sheathing, the insulated stud cavity, gypsum board, the window, the foundation, and the soil.
5. Press Quiz me to hide the labels and highlight one arrow. Press the pathway button you think matches it, and press Next arrow for another.

## Lesson Plan

**Learning objective:** Classify each way that moisture enters a wall as bulk water, capillary action, air movement, or vapor diffusion, and match each pathway to its control.

**Suggested activities**

- Warm-up (5 min): Students list how they think water gets into a wall, then compare their list with the four pathways.
- Explore (10 min): Students click each arrow, write the driver and the control in a four-row table, and then check Show controls to confirm the controls.
- Practice (10 min): Students use Quiz me until they answer five arrows in a row correctly on the first try, then explain which two pathways they confused most.

**Assessment**

- Students explain why a wall that blocks bulk water and diffusion can still be damaged by air movement.
- Students name the driver of each of the four pathways without looking at the info panel.

## References

- [Chapter 4: Moisture, Air, and Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Capillary action (Wikipedia)](https://en.wikipedia.org/wiki/Capillary_action)
- [Vapor barrier (Wikipedia)](https://en.wikipedia.org/wiki/Vapor_barrier)

## Specification

The full specification below is extracted from
[Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md).

```text
Type: infographic
**sim-id:** moisture-transport-pathways-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each way that moisture enters a wall as bulk water, capillary action, air movement, or vapor diffusion, and will match (Bloom Level 2, Understand) each pathway to its control.

Visual: A section drawing of a Minnesota wall on a concrete foundation, with the roof edge at the top. Four colored arrow sets mark the pathways: rain at a window head (bulk water), groundwater rising in the footing (capillary action), warm air leaking at an outlet box (air movement), and vapor passing through the interior finish (diffusion). The canvas width follows the container, the height is 500 px, and the sketch redraws on window resize.

Controls: Four toggle buttons labeled "Bulk water," "Capillary," "Air movement," and "Diffusion" switch each pathway on or off. A checkbox labeled "Show controls" overlays the matching control (flashing, capillary break, air barrier, vapor retarder) as a colored layer. A button labeled "Quiz me" hides the labels and asks the student to click the pathway for a highlighted arrow.

Interactions: Clicking any arrow opens an infobox with the mechanism's driver, a one-sentence example, and the matching control. Hovering over a layer shows its name. In quiz mode, a correct answer turns the arrow green with a short explanation, and a wrong answer shows which driver the student should look for.

Colors: Bulk water is blue, capillary action is teal, air movement is orange, and diffusion is purple. All arrows carry text labels.

Implementation: p5.js with a responsive canvas, built-in button and checkbox controls, mouse hit-testing on the arrows, and an infobox div.
```

## Related Resources

- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
