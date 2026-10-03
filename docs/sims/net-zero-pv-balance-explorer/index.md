---
title: Net-Zero PV Balance Explorer
description: Students will calculate (Bloom Level 3, Apply) the photovoltaic array size and roof area needed to offset a building's annual energy use and will analyze (Bloom Level 4, Analyze) how reducing energy use intensity changes the feasibility of net zero.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Net-Zero PV Balance Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md).

```text
Type: microsim
**sim-id:** net-zero-pv-balance-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the photovoltaic array size and roof area needed to offset a building's annual energy use and will analyze (Bloom Level 4, Analyze) how reducing energy use intensity changes the feasibility of net zero.

Visual: The left side shows a simplified roof plan of a one-story building with solar panels filling from one edge. A shaded zone represents rooftop equipment and unavailable roof area. The right side shows two bars, annual energy use and annual PV production, with a gap label in kWh. The canvas fills the container width, has a height of 480 px, and redraws on window resize.

Controls: A slider for building area (3,000 to 20,000 ft², default 9,000). A slider for energy use intensity (15 to 90 kBtu/ft² per year, default 60). A slider for PV yield (1,000 to 1,500 kWh per kW per year, default 1,250). A slider for roof area per kW (60 to 110 ft², default 80). A slider for the share of roof usable for PV (40 to 90 percent, default 70). A button labeled "Apply efficiency measures" lowers EUI to 30 and animates the change.

Interactions: Panels fill the roof as needed and turn red when the array does not fit. The message states "Net zero is feasible on this roof" or "Need X more ft² of PV area." Hovering over a bar shows the numbers behind it.

Colors: PV in blue, equipment zone in gray, use bar in orange, production bar in green. Every state is also written in text.

Implementation: p5.js with a responsive canvas, DOM sliders, and the arithmetic of the worked example recalculated on each change.
```

## Related Resources

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
