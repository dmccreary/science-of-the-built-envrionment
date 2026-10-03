---
title: Moisture Pathways in a Wall
description: Students will classify (Bloom Level 2, Understand) each way that moisture enters a wall as bulk water, capillary action, air movement, or vapor diffusion, and will match (Bloom Level 2, Understand) each pathway to its control.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Moisture Pathways in a Wall



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
