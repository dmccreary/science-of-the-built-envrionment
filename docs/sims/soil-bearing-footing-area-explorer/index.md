---
title: Bearing Capacity and Footing Size Explorer
description: Students will calculate (Bloom Level 3, Apply) the footing area required for a given load and soil, and will compare (Bloom Level 4, Analyze) how soil type and column load change the footing size.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Bearing Capacity and Footing Size Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
