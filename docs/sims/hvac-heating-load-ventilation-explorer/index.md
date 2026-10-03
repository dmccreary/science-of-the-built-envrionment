---
title: Heating Load and Ventilation Explorer
description: Students will calculate (Bloom Level 3, Apply) the heating load of a room from envelope conduction and outdoor-air ventilation, and will compare (Bloom Level 4, Analyze) how enclosure quality and heat recovery change the total.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Heating Load and Ventilation Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md).

```text
Type: microsim
**sim-id:** hvac-heating-load-ventilation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the heating load of a room from envelope conduction and outdoor-air ventilation, and will compare (Bloom Level 4, Analyze) how enclosure quality and heat recovery change the total.

Visual: A cutaway of a 600 ft² classroom with wall, window, and roof areas labeled. Arrows show conduction heat loss through each surface and a separate large arrow shows heat lost with ventilation air. A stacked bar to the right shows the total load divided into walls, windows, roof, and ventilation, with a numeric readout in Btu/h and in tons of equivalent capacity.

Controls: Sliders for outdoor temperature (-20 to 40 °F), wall U-factor (0.03 to 0.30), window U-factor (0.15 to 0.60), roof U-factor (0.02 to 0.10), number of occupants (5 to 40), and heat recovery effectiveness (0 to 85 percent). A checkbox labeled "Add heat recovery ventilator" enables the last slider. A button labeled "Reset to Minneapolis design day" restores the default values.

Interactions: Changing any slider updates the arrows, the stacked bar, and the readouts immediately. Hovering over any arrow or bar segment shows a tooltip with the calculation (for example, "Walls: U x A x delta T = 0.05 x 400 x 70 = 1,400 Btu/h"). The status line states which component dominates at the current settings.

Colors: Walls in brown, windows in light blue, roof in gray, ventilation in orange. Segments also carry text labels for readability without color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider, createCheckbox, and createButton controls, created before any positioning function runs.
```

## Related Resources

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
