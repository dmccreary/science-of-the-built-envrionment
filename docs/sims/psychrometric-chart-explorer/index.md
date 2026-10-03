---
title: Psychrometric Chart Explorer
description: Students move a state point on a simplified psychrometric chart to read the temperature, humidity ratio, relative humidity, and dew point of air, then warm or cool the air to see RH change while the dew point stays fixed. A wall surface test shows whether a surface is cold enough for condensation.
image: /sims/psychrometric-chart-explorer/psychrometric-chart-explorer.png
og:image: /sims/psychrometric-chart-explorer/psychrometric-chart-explorer.png
twitter:image: /sims/psychrometric-chart-explorer/psychrometric-chart-explorer.png
social:
   cards: false
status: built
library: Plotly
bloom_level: Apply, Understand
---

# Psychrometric Chart Explorer

<iframe src="main.html" width="100%" height="692" scrolling="no"></iframe>

[Run the Psychrometric Chart Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/psychrometric-chart-explorer/main.html" width="100%" height="692" scrolling="no"></iframe>
```

## Description

Students move a state point on a simplified psychrometric chart to read the temperature, humidity ratio, relative humidity, and dew point of air, then warm or cool the air to see RH change while the dew point stays fixed. A wall surface test shows whether a surface is cold enough for condensation.

## How to Use

1. Drag the orange dot, or use the Air temperature and Relative humidity sliders. The readout shows the temperature, humidity ratio, RH, and dew point.
2. Follow the dashed horizontal line from the dot to the left. Where it meets the dark blue saturation line is the dew point.
3. Press Warm 20°F and Cool 20°F. The dot moves along its horizontal line, so the humidity ratio and dew point stay the same while RH changes. Read the message below the chart.
4. Check Wall surface test and set the surface temperature. The marker turns red and the readout says Condensation when the surface is at or below the dew point.
5. Hover over any curve to read its RH.

## Lesson Plan

**Learning objective:** Use a psychrometric chart to find the dew point and relative humidity of air at a given state, and predict what happens to RH and dew point when the air is warmed or cooled.

**Suggested activities**

- Warm-up (5 min): Students predict the dew point of 70°F air at 30 percent RH, then read it from the chart (about 37°F).
- Explore (10 min): Students start with saturated air at -10°F and press Warm 20°F three times, recording the RH each time. They compare the result with the Chapter 4 example of dry winter air indoors.
- Apply (10 min): With the surface test on, students raise the indoor RH from 20 to 50 percent at 70°F and find the surface temperatures that begin to condense at each RH.

**Assessment**

- Students explain in two sentences why warming air lowers its RH but does not change its dew point.
- Students use the chart to decide whether a 45°F window pane will condense in 70°F air at 50 percent RH.

## References

- [Chapter 4: Moisture, Air, and Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Psychrometrics (Wikipedia)](https://en.wikipedia.org/wiki/Psychrometrics)
- [Dew point (Wikipedia)](https://en.wikipedia.org/wiki/Dew_point)

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
