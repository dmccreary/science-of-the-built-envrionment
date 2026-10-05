---
title: Insulation Diminishing Returns Explorer
description: Students move two markers along a curve of annual roof heat loss against R-value, read the energy saved, gas cost, and simple payback for the added insulation, and see why each added layer saves less than the one before.
image: /sims/insulation-diminishing-returns-explorer/insulation-diminishing-returns-explorer.png
og:image: /sims/insulation-diminishing-returns-explorer/insulation-diminishing-returns-explorer.png
twitter:image: /sims/insulation-diminishing-returns-explorer/insulation-diminishing-returns-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Understand, Apply
---

# Insulation Diminishing Returns Explorer

<iframe src="main.html" width="100%" height="732" scrolling="no"></iframe>

[Run the Insulation Diminishing Returns Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/insulation-diminishing-returns-explorer/main.html" width="100%" height="732" scrolling="no"></iframe>
```

## Description

Students move two markers along a curve of annual roof heat loss against R-value, read the energy saved, gas cost, and simple payback for the added insulation, and see why each added layer saves less than the one before.

## How to Use

1. Read the blue curve: annual heat loss Q = (A/R) × HDD × 24, in MMBtu. At the Riverbend defaults the curve is steep at low R and nearly flat above R-40.
2. Drag the orange markers, or use the Current R and Proposed R sliders, to choose the existing and added insulation. The green band between them is the energy saved. Hover over the curve to read the loss at any R-value.
3. Read the table below the chart: annual heat loss, gas burned, gas cost, the added insulation cost, and the simple payback. At R-30 to R-50 the Riverbend roof saves 21.6 MMBtu of heat, or $240 a year, for $13,500, a payback of about 56 years.
4. Change the roof area, heating degree days, gas price, furnace efficiency, or insulation cost to see how each input moves the payback. A message appears when the payback exceeds the typical building life of 50 years.

## Lesson Plan

**Learning objective:** Calculate annual heat loss through a surface for different R-values and explain why each added layer of insulation saves less than the one before.

**Suggested activities**

- Verify (5 min): Students reproduce the Chapter 19 numbers by hand (162, 54, and 32.4 MMBtu at R-10, R-30, and R-50) and match them to the curve.
- Compare (10 min): Students record the savings of the first +20 R (R-10 to R-30) and of the next +20 R (R-30 to R-50), and explain in terms of 1/R why the second is five times smaller.
- Decide (10 min): Students raise the gas price and lower the insulation cost until the payback drops below 50 years, then write a recommendation that also mentions comfort and peak loads.

**Assessment**

- Students calculate the annual heat loss of a 6,000 ft² roof at R-20 and R-40 with 7,000 heating degree days, and the heat saved.
- Students explain in two sentences why doubling the R-value never halves the cost of heating the whole building.

## References

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
- [R-value (insulation) (Wikipedia)](https://en.wikipedia.org/wiki/R-value_(insulation))
- [Heating degree day (Wikipedia)](https://en.wikipedia.org/wiki/Heating_degree_day)

## Specification

The full specification below is extracted from
[Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md).

```text
Type: chart
**sim-id:** insulation-diminishing-returns-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) annual heat loss through a surface for different R-values and will explain (Bloom Level 2, Understand) why each added layer of insulation saves less than the one before.

Visual: A line chart with R-value (R-5 to R-60) on the horizontal axis and annual heat loss in MMBtu on the vertical axis. The curve falls steeply at low R and flattens at high R. A shaded vertical band between two chosen R-values shows the savings, and a table below the chart shows the heat loss, savings, gas cost, and simple payback. The chart is responsive with a height of 420 px and redraws on window resize.

Controls: Sliders for roof area (1,000 to 20,000 ft², default 9,000), heating degree days (4,000 to 9,000, default 7,500), gas price (\$5 to \$20 per MMBtu, default \$10), furnace efficiency (60 to 98 percent, default 90), and insulation cost per ft² per added R-20 (\$0.50 to \$4, default \$1.50). Two draggable markers set "current R" and "proposed R" on the curve, with defaults at R-30 and R-50.

Interactions: Hovering over the curve shows the R-value and the annual loss. The table updates as markers move. A message states "Payback exceeds the typical building life" when the simple payback is above 50 years.

Colors: The curve is blue, the savings band is green, and the markers are orange. All values are also shown as text.

Implementation: Chart.js with draggable annotation markers and DOM sliders, recalculating \( Q = (A/R) \times \text{HDD} \times 24 \) on each change.
```

## Related Resources

- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
