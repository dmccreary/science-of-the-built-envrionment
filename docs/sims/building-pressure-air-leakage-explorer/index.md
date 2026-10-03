---
title: Building Pressure and Air Leakage Explorer
description: Students will analyze (Bloom Level 4, Analyze) how wind, the stack effect, and exhaust fans each change the pressure across a building enclosure, and will predict (Bloom Level 2, Understand) where air enters and where it leaves.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Building Pressure and Air Leakage Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
