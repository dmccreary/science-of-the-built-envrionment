---
title: "Building Pressure and Air Leakage Explorer"
description: "Students vary outdoor temperature, wind, an exhaust fan, and building height and watch the indoor-minus-outdoor pressure change at every height of a building with gaps in its walls and roof. Arrows show where air enters and leaves, and a dashed line marks the neutral pressure plane."
image: /sims/building-pressure-air-leakage-explorer/building-pressure-air-leakage-explorer.png
og:image: /sims/building-pressure-air-leakage-explorer/building-pressure-air-leakage-explorer.png
twitter:image: /sims/building-pressure-air-leakage-explorer/building-pressure-air-leakage-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Understand
---

# Building Pressure and Air Leakage Explorer

<iframe src="main.html" width="100%" height="607" scrolling="no"></iframe>

[Run the Building Pressure and Air Leakage Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/building-pressure-air-leakage-explorer/main.html" width="100%" height="607" scrolling="no"></iframe>
```

## Description

Students vary outdoor temperature, wind, an exhaust fan, and building height and watch the indoor-minus-outdoor pressure change at every height of a building with gaps in its walls and roof. Arrows show where air enters and leaves, and a dashed line marks the neutral pressure plane.

## How to Use

1. Start with the defaults: a 30 ft building at -10 degrees F with no wind or fan. The readout shows about 19 Pa of stack pressure across the full height. Blue arrows show air entering low in the building and orange arrows show air leaving high.
2. Hover over any gap to see the pressure across it and the direction and size of the air flow. The graph beside the building shows the same pressures at each height.
3. Raise the wind speed and flip the wind direction, then raise the exhaust fan, and watch the pressure curve shift. Predict where air enters before you look at the arrows.
4. Check Seal the top gaps and compare the neutral plane and the total air flow with the unsealed case.

## Lesson Plan

**Learning objective:** Analyze how wind, the stack effect, and exhaust fans each change the pressure across a building enclosure, and predict where air enters and where it leaves.

**Suggested activities**

- Warm-up (5 min): Students sketch where they expect air to enter and leave a tall building on a cold, calm day, then check the sketch against the default view.
- Explore (10 min): Students change one source at a time (temperature, wind, fan) and write which gaps change direction and which only change size.
- Analyze (10 min): Students raise the exhaust fan to 1,000 CFM with no makeup air and explain why a combustion appliance in this building could backdraft.

**Assessment**

- Students predict, in writing, how the neutral plane moves when a tall building gets colder, then test the prediction.
- Students explain in two sentences why a leak needs both a path and a pressure difference.

## References

- [Chapter 4: Moisture, Air, and Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Stack effect (Wikipedia)](https://en.wikipedia.org/wiki/Stack_effect)
- [Infiltration (HVAC) (Wikipedia)](https://en.wikipedia.org/wiki/Infiltration_(HVAC))

## Specification

The full specification below is extracted from
[Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md).

```text
Type: microsim
**sim-id:** building-pressure-air-leakage-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how wind, the stack effect, and exhaust fans each change the pressure across a building enclosure, and will predict (Bloom Level 2, Understand) where air enters and where it leaves.

Visual: A side view of a building outline up to three stories high, with several small gaps drawn at different heights on the walls and at the roof. A vertical pressure graph beside the building shows the indoor-minus-outdoor pressure at each height, with a marker for the neutral pressure plane. Arrows through the gaps show direction and scale with the pressure. The canvas width follows the container, the height is 500 px, and the sketch redraws on window resize.

Controls: A slider labeled "Outdoor temperature (°F)" from −20 to 70 with a default of −10. A slider labeled "Wind speed (mph)" from 0 to 30 with a default of 0, and a toggle for wind direction. A slider labeled "Exhaust fan (CFM)" from 0 to 2,000 with a default of 0. A slider labeled "Building height (ft)" from 10 to 60 with a default of 30. A checkbox labeled "Seal the top gaps" closes the upper gaps.

Interactions: Hovering over a gap shows the pressure across it and the direction of flow. Raising the exhaust fan slider shifts the pressure curve toward negative pressure. Sealing the top gaps moves the neutral pressure plane upward and increases the infiltration at the bottom, with a one-sentence explanation. A readout lists the total stack pressure for the selected temperature difference and height, and the defaults reproduce about 19 Pa across a 30 ft height at −10°F.

Colors: Positive pressure is orange, negative pressure is blue, and the neutral plane is a dashed gray line. All flow arrows carry text labels showing direction.

Implementation: p5.js with a responsive canvas, built-in sliders and checkbox, a simplified stack and wind model, and a pressure graph drawn each frame. The model is illustrative and is labeled as such.
```

## Related Resources

- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
