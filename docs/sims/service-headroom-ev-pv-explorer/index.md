---
title: Service Headroom for Solar and EV Loads
description: Students will evaluate (Bloom Level 5, Evaluate) whether a service has capacity for added EV chargers and will justify (Bloom Level 5, Evaluate) a choice among upgrading the service, reducing the number of chargers, or using load management.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Service Headroom for Solar and EV Loads



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
