---
title: Psychrometric Chart Explorer
description: Students will use (Bloom Level 3, Apply) a psychrometric chart to find the dew point and relative humidity of air at a given state, and will predict (Bloom Level 2, Understand) what happens to RH and dew point when the air is warmed or cooled.
status: scaffold
library: Plotly
bloom_level: TBD
---

# Psychrometric Chart Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md).

```text
Type: chart
**sim-id:** psychrometric-chart-explorer<br/>
**Library:** Plotly<br/>
**Status:** Specified

Learning objective: Students will use (Bloom Level 3, Apply) a psychrometric chart to find the dew point and relative humidity of air at a given state, and will predict (Bloom Level 2, Understand) what happens to RH and dew point when the air is warmed or cooled.

Visual: A simplified psychrometric chart with dry-bulb temperature from −20°F to 100°F on the horizontal axis and humidity ratio from 0 to 0.020 lb/lb on the vertical axis. Curves show constant RH at 10 percent steps and the saturation line at 100 percent. A draggable state point is drawn as a bold dot, with a horizontal dashed line extending left to the saturation curve and a vertical dashed line to the axis. The chart fills the container width with a height of 480 px and redraws on window resize.

Controls: A slider labeled "Air temperature (°F)" from −20 to 100 with a default of 70. A slider labeled "Relative humidity (%)" from 5 to 100 with a default of 30. The student can also drag the dot directly. A button labeled "Warm 20°F" moves the dot right along its horizontal line, and "Cool 20°F" moves it left. A checkbox labeled "Wall surface test" adds a vertical marker at a surface temperature set by a third slider labeled "Surface temperature (°F)" from −20 to 70.

Interactions: A readout shows the temperature, humidity ratio, RH, and dew point at the dot. When the surface test is on, the readout states "Condensation" in text and the marker turns red if the surface is below the dew point, and "No condensation" otherwise. Hovering over a curve shows its RH value. Pressing "Warm 20°F" displays the message that the RH roughly halves.

Colors: RH curves are shades of blue, the saturation line is dark blue, the state point is orange, and the condensation warning is red with a text label.

Implementation: Plotly scatter and line traces with a Magnus-formula calculation for saturation, drag handlers on the state point, and a readout div.
```

## Related Resources

- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
