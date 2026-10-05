---
title: "Bearing Capacity and Footing Size Explorer"
description: "Students set a column load and pick a soil, then watch the required footing area, the footing size, the pressure bulb under it, and a four-soil bar chart update, including a flag when the footing grows past 8 ft square."
image: /sims/soil-bearing-footing-area-explorer/soil-bearing-footing-area-explorer.png
og:image: /sims/soil-bearing-footing-area-explorer/soil-bearing-footing-area-explorer.png
twitter:image: /sims/soil-bearing-footing-area-explorer/soil-bearing-footing-area-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Bearing Capacity and Footing Size Explorer

<iframe src="main.html" width="100%" height="577" scrolling="no"></iframe>

[Run the Bearing Capacity and Footing Size Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/soil-bearing-footing-area-explorer/main.html" width="100%" height="577" scrolling="no"></iframe>
```

## Description

Students set a column load and pick a soil, then watch the required footing area, the footing size, the pressure bulb under it, and a four-soil bar chart update, including a flag when the footing grows past 8 ft square.

## How to Use

1. Move the Column load slider from 10 to 100 kips and read the required area in the Calculation panel. It equals the load divided by the allowable bearing capacity.
2. Choose a soil from the menu. Compare the selected bar with the other soils in the bar chart, and watch the footing in the side view and the top view change size.
3. Check Show factor of safety to see the ultimate capacity, three times the allowable value, and where the applied pressure sits below it.
4. Hover over the soil layer in the side view for the presumptive bearing value and a plain-language description. Press Reset to return to 40 kips on firm clay.

## Lesson Plan

**Learning objective:** Calculate the footing area needed for a given column load and soil, and compare how soil type and load change the footing size.

**Suggested activities**

- Warm-up (5 min): Students predict whether sand or clay needs the larger footing for 40 kips, then check the bar chart.
- Explore (10 min): Students reproduce the Chapter 9 worked example for clay, sand, and gravel, and record the rounded footing sizes.
- Analyze (10 min): Students find the load at which each soil first needs a footing larger than 8 ft square, and explain what a designer would do next.

**Assessment**

- Students calculate by hand the footing size for 60 kips on sand and verify it with the MicroSim.
- Students explain in two sentences why a weaker soil needs a larger footing for the same load.

## References

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
- [Bearing capacity (Wikipedia)](https://en.wikipedia.org/wiki/Bearing_capacity)
- [Shallow foundation (Wikipedia)](https://en.wikipedia.org/wiki/Shallow_foundation)

## Specification

The full specification below is extracted from
[Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md).

```text
Type: microsim
**sim-id:** soil-bearing-footing-area-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the footing area required for a given load and soil, and will compare (Bloom Level 4, Analyze) how soil type and column load change the footing size.

Visual: A side view of a column on a square footing resting on a soil layer, with a pressure bulb drawn beneath it as shaded bands whose darkness shows stress. A top-down inset shows footing size to scale against a 10 ft grid. A bar chart on the right compares the footing area needed in clay, sand, and gravel at the current load. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A slider for column load from 10 to 100 kips in 5-kip steps. A dropdown for soil type (soft clay, firm clay, sand, gravel). A checkbox for "show factor of safety," which displays the ultimate capacity as three times the allowable value. A "Reset" button.

Interactions: Hovering over the soil layer shows the presumptive allowable bearing value and a plain-language description. The footing resizes in real time as sliders move. A message appears when the footing exceeds 8 ft square, suggesting a mat foundation or better soil, and points to Chapter 10.

Default state: 40 kips, firm clay at 1,500 psf, footing 5 ft 3 in square.

Implementation: p5.js with built-in slider, select, checkbox, and button, and a responsive canvas.
```

## Related Resources

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
