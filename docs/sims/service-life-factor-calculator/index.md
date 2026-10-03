---
title: Service Life Factor Calculator
description: Students will calculate (Bloom Level 3, Apply) the estimated service life of a building component with the factor method and will analyze (Bloom Level 4, Analyze) which factor changes the estimate most.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Service Life Factor Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md).

```text
Type: microsim
**sim-id:** service-life-factor-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the estimated service life of a building component with the factor method and will analyze (Bloom Level 4, Analyze) which factor changes the estimate most.

Visual: A horizontal bar showing the reference service life, followed by a bar showing the estimated service life, with the ratio labeled. Seven factor sliders sit below the bars, each labeled with its name. A ranked list on the right shows which factor is currently reducing or increasing the estimate the most. The canvas fills the container width, has a height of 500 px, and redraws on window resize.

Controls: A dropdown to choose the component (roof membrane, window, exterior paint, HVAC rooftop unit), each with a default reference service life of 25, 30, 8, and 20 years, labeled illustrative. Seven sliders from 0.6 to 1.2 for the seven factors, defaulting to the Riverbend values. A button labeled "Apply good maintenance" sets the maintenance factor to 1.1. A button labeled "Reset" restores the defaults.

Interactions: Hovering over a slider shows a one-sentence explanation of the factor and an example of what raises or lowers it. The estimated life updates immediately. A message states the number of years gained or lost compared with the reference value.

Colors: The reference bar is gray, an estimate above the reference is green, and an estimate below the reference is orange. The numeric values are always shown as text.

Implementation: p5.js with a responsive canvas, DOM sliders and a dropdown, and a product of the seven factors recalculated on each change.
```

## Related Resources

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
