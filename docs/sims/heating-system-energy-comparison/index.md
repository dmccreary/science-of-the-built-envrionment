---
title: Heating System Energy Comparison
description: Students compare the energy input an 80 percent furnace, a 95 percent furnace, electric resistance, and a heat pump need to deliver the same heat, and watch the heat pump COP change along an illustrative curve as the outdoor temperature changes.
image: /sims/heating-system-energy-comparison/heating-system-energy-comparison.png
og:image: /sims/heating-system-energy-comparison/heating-system-energy-comparison.png
twitter:image: /sims/heating-system-energy-comparison/heating-system-energy-comparison.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Analyze, Understand
---

# Heating System Energy Comparison

<iframe src="main.html" width="100%" height="742" scrolling="no"></iframe>

[Run the Heating System Energy Comparison MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/heating-system-energy-comparison/main.html" width="100%" height="742" scrolling="no"></iframe>
```

## Description

Students compare the energy input an 80 percent furnace, a 95 percent furnace, electric resistance, and a heat pump need to deliver the same heat, and watch the heat pump COP change along an illustrative curve as the outdoor temperature changes.

## How to Use

1. Set the heat output slider to 80,000 Btu/h and the outdoor temperature to 17 degrees F with the cold-climate heat pump, which reproduces the Chapter 14 worked example of 23.4 kW of heat. The dashed line on the bar chart marks the heat delivered.
2. Compare the four bars. Furnace bars extend past the dashed line because some fuel energy is lost; the resistance bar ends on it; the heat pump bar ends well short of it.
3. Drag the outdoor temperature slider and watch the diamond marker move along the COP curve and the heat pump bar grow as the COP falls. Switch between the standard and cold-climate heat pump types.
4. Hover over a bar for its input in kW and Btu/h, the efficiency used, and a one-sentence explanation of how that system makes heat. Read the status line for the comparison with the 95 percent furnace.

## Lesson Plan

**Learning objective:** Compare the input energy of four heating systems that deliver the same heat, and explain why heat pump COP falls as the outdoor temperature falls.

**Suggested activities**

- Predict (5 min): Before moving any slider, students rank the four bars from least to most input energy at 80,000 Btu/h, then check against the chart.
- Reproduce (10 min): Students match the Chapter 14 values of 100,000 Btu/h (80 percent furnace), about 84,200 Btu/h (95 percent furnace), 23.4 kW (resistance), and 7.8 kW (heat pump at COP 3).
- Analyze (10 min): Students find the outdoor temperature at which each heat pump type reaches COP 2, and explain why the standard and cold-climate curves differ.

**Assessment**

- Students calculate the heat pump input for 120,000 Btu/h at COP 2.5 by hand and check it against the simulation.
- Students explain in two sentences why a heat pump can deliver more heat than the electricity it uses without breaking conservation of energy.

## References

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Coefficient of performance (Wikipedia)](https://en.wikipedia.org/wiki/Coefficient_of_performance)
- [Annual fuel utilization efficiency (Wikipedia)](https://en.wikipedia.org/wiki/Annual_fuel_utilization_efficiency)

## Specification

The full specification below is extracted from
[Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md).

```text
Type: chart
**sim-id:** heating-system-energy-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) the energy input needed by an 80 percent furnace, a 95 percent furnace, electric resistance, and a heat pump to deliver the same heat, and will explain (Bloom Level 2, Understand) why heat pump COP changes with outdoor temperature.

Visual: A horizontal bar chart showing input energy in kW-equivalent for four systems delivering the same heat. A line chart to the right plots heat pump COP against outdoor temperature from -20 to 60 °F, using an illustrative curve labeled as such.

Controls: A slider for required heat output (20,000 to 200,000 Btu/h) and a slider for outdoor temperature (-20 to 60 °F). A drop-down selects the heat pump type, either "standard air-source" or "cold-climate air-source," each with its own illustrative COP curve.

Interactions: Moving the sliders updates the bars and the COP marker on the curve. Hovering over any bar shows the input energy, the efficiency used, and a one-sentence explanation of how the system makes heat. A status line reports when the heat pump input exceeds the 95 percent furnace input for the selected temperature, with the message "Heat pump COP has fallen below the break-even point for equal energy."

Colors: Furnaces in orange, resistance in red, heat pump in blue; bars have pattern fills so the chart reads without color.

Responsive design: The charts follow the container width and redraw on resize. Height is 420 px.

Implementation: Chart.js bar and line charts with custom tooltip callbacks and slider-driven data updates.
```

## Related Resources

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
