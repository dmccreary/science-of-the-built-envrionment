---
title: Heating System Energy Comparison
description: Students will compare (Bloom Level 4, Analyze) the energy input needed by an 80 percent furnace, a 95 percent furnace, electric resistance, and a heat pump to deliver the same heat, and will explain (Bloom Level 2, Understand) why heat pump COP changes with outdoor temperature.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Heating System Energy Comparison



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
