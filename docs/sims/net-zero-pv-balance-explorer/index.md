---
title: "Net-Zero PV Balance Explorer"
description: "Set the building area, energy use intensity, PV yield, and roof assumptions to see how large a photovoltaic array must be to offset a building's annual energy use and whether it fits on the roof. Applying efficiency measures shows why cutting the load first decides whether net zero is possible."
image: /sims/net-zero-pv-balance-explorer/net-zero-pv-balance-explorer.png
og:image: /sims/net-zero-pv-balance-explorer/net-zero-pv-balance-explorer.png
twitter:image: /sims/net-zero-pv-balance-explorer/net-zero-pv-balance-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Net-Zero PV Balance Explorer

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Net-Zero PV Balance Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/net-zero-pv-balance-explorer/main.html" width="100%" height="552" scrolling="no"></iframe>
```

## Description

Set the building area, energy use intensity, PV yield, and roof assumptions to see how large a photovoltaic array must be to offset a building's annual energy use and whether it fits on the roof. Applying efficiency measures shows why cutting the load first decides whether net zero is possible.

## How to Use

1. Start with the Riverbend defaults (60 kBtu/ft² per year on a 9,000 ft² roof). Read the four calculation steps: annual use, array size, roof needed, and roof usable.
2. Compare the orange use bar with the green bar showing what the usable roof can produce. The gap label and the message say whether net zero fits or how many more square feet of PV area are needed.
3. Click Apply efficiency measures to glide the EUI down to 30 kBtu/ft² per year and watch the panels stop being red and the gap close.
4. Change PV yield, roof area per kW, and the usable share of the roof to see which assumption moves the answer most. Read the break-even EUI in the message box.
5. Hover over a bar or the roof to see the numbers behind it. Click Reset to return to the chapter example.

## Lesson Plan

**Learning objective:** Students calculate the PV array size and roof area needed to offset annual energy use, and analyze how a lower EUI changes whether net zero is feasible on a one-story roof.

**Suggested activities**

- Predict whether the default Riverbend building can reach net zero on its roof, then check the four calculation steps against the worked example in Chapter 19 (about 158,000 kWh, 127 kW, and 10,100 ft²).
- Apply the efficiency measures, then find the highest EUI each of three different roof usable shares can offset.
- Vary PV yield and roof area per kW one at a time and rank the five inputs by how much each changes the answer.

**Assessment**

- A school with 15,000 ft² of one-story roof and an EUI of 45 kBtu/ft² per year asks if net zero fits. Students show the arithmetic with the sim defaults for yield and roof area per kW.
- Students explain in three sentences why efficiency first decides net zero for a one-story building but matters less for a tall building.

## References

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
- [Net-zero energy building (Wikipedia)](https://en.wikipedia.org/wiki/Zero-energy_building)
- National Renewable Energy Laboratory, PVWatts Calculator (estimates PV production in kWh per kW for a site).

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
