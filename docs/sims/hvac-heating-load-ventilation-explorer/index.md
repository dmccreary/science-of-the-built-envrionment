---
title: "Heating Load and Ventilation Explorer"
description: "Students set the outdoor temperature, U-factors, occupancy, and heat recovery for a 600 ft2 Riverbend classroom and watch conduction and ventilation heat loss add up in a stacked bar, in Btu/h and in tons."
image: /sims/hvac-heating-load-ventilation-explorer/hvac-heating-load-ventilation-explorer.png
og:image: /sims/hvac-heating-load-ventilation-explorer/hvac-heating-load-ventilation-explorer.png
twitter:image: /sims/hvac-heating-load-ventilation-explorer/hvac-heating-load-ventilation-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Heating Load and Ventilation Explorer

<iframe src="main.html" width="100%" height="632" scrolling="no"></iframe>

[Run the Heating Load and Ventilation Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/hvac-heating-load-ventilation-explorer/main.html" width="100%" height="632" scrolling="no"></iframe>
```

## Description

Students set the outdoor temperature, U-factors, occupancy, and heat recovery for a 600 ft2 Riverbend classroom and watch conduction and ventilation heat loss add up in a stacked bar, in Btu/h and in tons.

## How to Use

1. Start at the default design day (0 degrees F outdoors, 25 people, no heat recovery). The cutaway shows an arrow for each conducting surface and a large orange arrow for the heat carried out by ventilation air; arrow thickness grows with the heat flow.
2. Read the stacked bar and the total in Btu/h and tons. Hover over any arrow, bar segment, or legend entry to see the calculation behind it, such as U x A x delta T for the walls.
3. Move the U-factor sliders and watch the walls, windows, and roof segments change while the ventilation segment stays the same. Then change the number of people or the outdoor temperature.
4. Check Add heat recovery ventilator and drag the effectiveness slider to see the ventilation segment shrink. Press Reset to Minneapolis design day to return to the defaults.

## Lesson Plan

**Learning objective:** Calculate the heating load of a room from envelope conduction and outdoor-air ventilation, and compare how enclosure quality and heat recovery change the total.

**Suggested activities**

- Reproduce (10 min): At the defaults students confirm the Chapter 14 values: 322 cfm of outdoor air, about 24,300 Btu/h of ventilation load, and about 8,000 Btu/h of conduction. Then they turn on a 75 percent heat recovery ventilator and confirm the 6,100 Btu/h that remains.
- Compare (10 min): Students improve the enclosure to the best U-factors on the sliders and record how much the total drops, then compare that with adding heat recovery.
- Analyze (10 min): Students sweep the outdoor temperature and the number of occupants and describe which component grows fastest and why.

**Assessment**

- Students predict the total load for 40 people at -20 degrees F with and without heat recovery, then check the prediction in the simulation.
- Students explain in two sentences why better insulation barely changes the ventilation load but a heat recovery ventilator does.

## References

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- ASHRAE Standard 62.1, Ventilation and Acceptable Indoor Air Quality (ventilation rate procedure; check the adopted edition).
- [Heat recovery ventilation (Wikipedia)](https://en.wikipedia.org/wiki/Heat_recovery_ventilation)

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
