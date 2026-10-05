---
title: "Service Headroom for Solar and EV Loads"
description: "Students load the Riverbend demand onto a 100 to 600 A service, add Level 2 EV chargers and a rooftop array, and compare three ways to fix an overloaded service: a larger service, fewer chargers, or load management."
image: /sims/service-headroom-ev-pv-explorer/service-headroom-ev-pv-explorer.png
og:image: /sims/service-headroom-ev-pv-explorer/service-headroom-ev-pv-explorer.png
twitter:image: /sims/service-headroom-ev-pv-explorer/service-headroom-ev-pv-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Evaluate
---

# Service Headroom for Solar and EV Loads

<iframe src="main.html" width="100%" height="732" scrolling="no"></iframe>

[Run the Service Headroom for Solar and EV Loads MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/service-headroom-ev-pv-explorer/main.html" width="100%" height="732" scrolling="no"></iframe>
```

## Description

Students load the Riverbend demand onto a 100 to 600 A service, add Level 2 EV chargers and a rooftop array, and compare three ways to fix an overloaded service: a larger service, fewer chargers, or load management.

## How to Use

1. Read the stacked bar: each segment is a Riverbend load group in kVA, and the black line is the service capacity. Hover over any segment to see its VA, its current, and how it was calculated.
2. Choose the service size and voltage, then set the number of EV chargers and the current of each charger. When the total passes the line, the EV segment turns red and the status line tells you the service is overloaded.
3. Check Use load management to cap the chargers at the headroom. The readout shows the power each vehicle receives and how long a 36 kWh charging session takes.
4. Read the three option lines under the status message to compare upgrading the service, installing fewer chargers, and managing the load. Move the PV slider to see the lower bar compare solar production with annual use.

## Lesson Plan

**Learning objective:** Evaluate whether a service can carry added EV chargers, and justify a choice among upgrading the service, installing fewer chargers, or using load management.

**Suggested activities**

- Reproduce (5 min): Set 200 A, 208 V, four chargers at 32 A. Confirm the chapter result: 26,624 VA of chargers against about 12,800 VA of headroom, so the service is overloaded.
- Compare (10 min): For each of the three options, record what it costs the owner in money, charging speed, or number of vehicles served. Then try 480 V and 400 A to see how the same loads use less of the capacity.
- Decide (10 min): Given a scenario with eight chargers at 48 A and a 400 A service, students choose an option and write a three-sentence justification.

**Assessment**

- Students state the largest number of 32 A chargers that fit on a 200 A, 208 V service at full power, and show the arithmetic.
- Students explain in two sentences why a 30 kW solar array does not let the service be made smaller.

## References

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [Electric vehicle charging station (Wikipedia)](https://en.wikipedia.org/wiki/Charging_station)
- National Fire Protection Association, NFPA 70 National Electrical Code, Article 625 (electric vehicle power transfer systems) and Article 220 (load calculations); verify the adopted edition.

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: chart
**sim-id:** service-headroom-ev-pv-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) whether a service has capacity for added EV chargers and will justify (Bloom Level 5, Evaluate) a choice among upgrading the service, reducing the number of chargers, or using load management.

Visual: A stacked horizontal bar showing the service capacity in kVA, with segments for lighting, receptacles, HVAC, kitchen, and EV chargers, and a vertical line at the service capacity. A second bar shows annual solar production in kWh next to the building's illustrative annual use.

Controls: A drop-down labeled "Service size" (100, 200, 400, 600 A) with a toggle for 208 V or 480 V. A slider for number of EV chargers (0 to 12), a slider for charger current (16 to 80 A), a checkbox labeled "Use load management," and a slider for PV array size (0 to 100 kW).

Interactions: Changing any control updates the bar and the readouts. When the total demand exceeds the service capacity, the EV segment turns red and the status line reads "Service overloaded: choose a larger service, fewer chargers, or load management." Turning on load management caps the EV segment at the headroom and displays the per-vehicle charging power. Hovering over any segment shows its VA and current.

Colors: Lighting in yellow, receptacles in blue, HVAC in green, kitchen in orange, EV in purple, overload in red. Segments are labeled with text and use different hatch patterns.

Responsive design: The chart follows the container width and redraws on resize. Height is 420 px.

Implementation: Chart.js stacked bar chart with annotation lines and custom tooltips.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
