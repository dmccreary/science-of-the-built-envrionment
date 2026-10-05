---
title: "Enclosure Heat Loss Component Explorer"
description: "Students change window area, roof and wall R-values, window U-value, and outdoor temperature to see how area and U-value combine into the conductive heat loss of the Riverbend enclosure, then rank three standard upgrades by the BTU/h each one saves."
image: /sims/enclosure-heat-loss-component-explorer/enclosure-heat-loss-component-explorer.png
og:image: /sims/enclosure-heat-loss-component-explorer/enclosure-heat-loss-component-explorer.png
twitter:image: /sims/enclosure-heat-loss-component-explorer/enclosure-heat-loss-component-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Analyze, Evaluate
---

# Enclosure Heat Loss Component Explorer

<iframe src="main.html" width="100%" height="758" scrolling="no"></iframe>

[Run the Enclosure Heat Loss Component Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/enclosure-heat-loss-component-explorer/main.html" width="100%" height="758" scrolling="no"></iframe>
```

## Description

Students change window area, roof and wall R-values, window U-value, and outdoor temperature to see how area and U-value combine into the conductive heat loss of the Riverbend enclosure, then rank three standard upgrades by the BTU/h each one saves.

## How to Use

1. Read the two stacked bars. The top bar shows each component's share of the enclosure area (top axis); the bottom bar shows its heat loss in BTU/h (bottom axis). The dashed mark is the Riverbend default total.
2. Move the sliders for window area, roof R-value, wall effective R-value, window U-value, and outdoor temperature (indoor stays at 70 degrees F). Hover over any segment for its area, U-value, and loss.
3. Compare the windows' share of the area with their share of the loss in the readout under the chart.
4. Press Which change helps most? to rank roof +R-10, walls +R-10, and windows to U-0.20 by the BTU/h each saves at the current settings, and read the explanation.
5. Press Riverbend defaults to return to 702 ft2 of windows, R-40 roof, R-27.7 walls, U-0.30 windows, and -10 degrees F.

## Lesson Plan

**Learning objective:** Analyze how area and U-value combine to set conductive heat loss, and evaluate which single change reduces the loss most.

**Suggested activities**

- Predict (5 min): Before touching the sliders, students predict which component loses the most heat per square foot and which loses the most in total, then check against the default chart.
- Explore (10 min): Students sweep the window area from 0 to 1,400 ft2 and record how the total loss and the windows' share of the loss change.
- Evaluate (10 min): Students run the ranking at the defaults, then lower the roof R-value to R-20 and run it again, and explain why the best upgrade changes.

**Assessment**

- Students reproduce the Chapter 11 table of roof, wall, and window losses (about 46,300 BTU/h) from the defaults and explain each row with Q = U x A x deltaT.
- Students recommend one upgrade for a client with a limited budget and justify it using the BTU/h saved.

## References

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
- [R-value (insulation) (Wikipedia)](https://en.wikipedia.org/wiki/R-value_(insulation))
- [Thermal transmittance (Wikipedia)](https://en.wikipedia.org/wiki/Thermal_transmittance)

## Specification

The full specification below is extracted from
[Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md).

```text
Type: chart
**sim-id:** enclosure-heat-loss-component-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how roof, wall, and window area and U-value combine to determine total conductive heat loss, and will evaluate (Bloom Level 5, Evaluate) which single change reduces the loss most.

Visual: A stacked horizontal bar showing the heat loss of the roof, walls, and windows in BTU/h, beside a second bar showing each component's share of the enclosure area for comparison. A readout shows the total loss in BTU/h and the equivalent in kW. The chart is responsive to the container width, 420 px tall, and redraws on window resize.

Controls: A slider for window area (0 to 1,400 ft² in 50 ft² steps). A slider for roof R-value (R-20 to R-60), wall effective R-value (R-10 to R-40), and window U-value (0.15 to 0.60). A slider for outdoor temperature (-20 to 40°F) with the indoor temperature fixed at 70°F. A "Riverbend defaults" button.

Interactions: Hovering over any bar segment shows the component's area, U-value, and loss. A "Which change helps most?" button applies a standard improvement to each component in turn (roof +R-10, wall +R-10, windows U-0.20) and ranks them by the BTU/h saved, with a one-sentence explanation of why the result differs from expectation.

Default state: 702 ft² of windows, roof R-40, wall R-27.7, window U-0.30, -10°F outdoors; total about 46,300 BTU/h.

Implementation: Chart.js stacked bar chart with a small calculation function and custom tooltips.
```

## Related Resources

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
