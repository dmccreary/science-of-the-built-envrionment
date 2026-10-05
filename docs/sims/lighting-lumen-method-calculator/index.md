---
title: "Lighting Lumen Method Calculator"
description: "Students apply the lumen method to a room: they set the room size, target footcandles, luminaire output and wattage, coefficient of utilization, and light loss factor, and watch the number of luminaires, the layout, an illuminance overlay, and the lighting power density update. A message compares the density to an adjustable energy-code limit."
image: /sims/lighting-lumen-method-calculator/lighting-lumen-method-calculator.png
og:image: /sims/lighting-lumen-method-calculator/lighting-lumen-method-calculator.png
twitter:image: /sims/lighting-lumen-method-calculator/lighting-lumen-method-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Evaluate
---

# Lighting Lumen Method Calculator

<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run the Lighting Lumen Method Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/lighting-lumen-method-calculator/main.html" width="100%" height="542" scrolling="no"></iframe>
```

## Description

Students apply the lumen method to a room: they set the room size, target footcandles, luminaire output and wattage, coefficient of utilization, and light loss factor, and watch the number of luminaires, the layout, an illuminance overlay, and the lighting power density update. A message compares the density to an adjustable energy-code limit.

## How to Use

1. Start with the default classroom: 30 ft by 20 ft, 40 footcandles, 4,000 lm and 35 W luminaires, CU 0.70, LLF 0.80. The panel shows 11 luminaires, 385 W, and 0.64 W/ft2, matching the chapter's worked example.
2. Change the room length, width, or room type. Choosing a room type sets a default target in footcandles, which you can then adjust with the Target slider.
3. Change the luminaire lumens, watts, CU, and LLF and follow each number down the calculation steps. Hover over a step for its definition, or over the plan for the estimated footcandles at that spot.
4. Move the Power density limit slider and read the message: Within limit, or Over the limit with advice to choose a more efficient luminaire.

## Lesson Plan

**Learning objective:** Calculate the number of luminaires a room needs with the lumen method and evaluate the resulting lighting power density against a limit.

**Suggested activities**

- Warm-up (5 min): Students reproduce the chapter's classroom example by hand (24,000 lm at the work surface, 42,857 lm to emit, 11 luminaires) and confirm each number in the panel.
- Explore (10 min): Students change one input at a time, such as CU from 0.70 to 0.50, and record how the number of luminaires and the power density change.
- Apply (10 min): Students choose a luminaire for the multipurpose room that meets both a 30 fc target and a 0.8 W/ft2 limit, and justify the choice.

**Assessment**

- Students calculate the number of luminaires for a 40 ft by 25 ft office at 30 fc with their own luminaire choice and check it against the sim.
- Students explain in two sentences why the result is always rounded up to a whole luminaire, and what that does to the average illuminance.

## References

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- Illuminating Engineering Society, The Lighting Handbook (recommended illuminance and the lumen method).
- [Lumen (unit) (Wikipedia)](https://en.wikipedia.org/wiki/Lumen_(unit))

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: microsim
**sim-id:** lighting-lumen-method-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the number of luminaires a room requires using the lumen method, and will evaluate (Bloom Level 5, Evaluate) the resulting lighting power density against a target value.

Visual: A plan view of a room with a grid of luminaires. A side panel shows the calculation steps with live numbers: target footcandles, room area, light needed at the work surface, losses, luminaires required, total watts, and lighting power density in watts per square foot. A color overlay shows the estimated illuminance across the room, from dim to bright.

Controls: A slider for room length (10 to 60 ft), a slider for room width (10 to 40 ft), a drop-down for room type (classroom, office, corridor, multipurpose) that sets a default target illuminance, a slider for target footcandles (10 to 80), a slider for luminaire lumens (2,000 to 8,000), a slider for luminaire watts (15 to 80), a slider for coefficient of utilization (0.4 to 0.9), and a slider for light loss factor (0.6 to 1.0). A "Power density limit" slider sets a comparison limit between 0.5 and 1.5 W/ft².

Interactions: Changing any control updates the number of luminaires, the grid layout, the overlay, and the lighting power density. A message states "Within limit" or "Over the limit: choose a more efficient luminaire." Hovering over a step in the calculation panel shows its definition.

Colors: Overlay from dark blue (dim) through yellow to white (bright). Compliance is shown in green or red with a text label.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createSelect controls, and a simple uniform-illuminance calculation.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
