---
title: Concrete Composition and Strength Gain Explorer
description: Students will describe (Bloom Level 2, Understand) the approximate volume proportions of the ingredients in concrete, and will predict (Bloom Level 3, Apply) the strength of a 4,000 psi mix at a given age under moist curing and under poor curing.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Concrete Composition and Strength Gain Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md).

```text
Type: chart
**sim-id:** concrete-composition-strength-gain-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will describe (Bloom Level 2, Understand) the approximate volume proportions of the ingredients in concrete, and will predict (Bloom Level 3, Apply) the strength of a 4,000 psi mix at a given age under moist curing and under poor curing.

Visual: Two linked charts. On the left, a doughnut chart shows the volumes of aggregates, cement paste, water, and air in one cubic yard of concrete. On the right, a line chart of strength (psi) against age (0 to 28 days) shows the strength-gain curve. The charts are responsive to container width, with a height of 400 px.

Controls: A slider labeled "Specified strength f'c (psi)" (3,000 to 6,000) scales the strength curve. A slider labeled "Air content (%)" (0 to 8) changes the air slice of the doughnut chart. A toggle labeled "Curing" switches between "Moist-cured," "Cured 3 days only," and "Not cured." A slider labeled "Age (days)" moves a marker along the curve.

Interactions: Hovering over a doughnut slice shows the ingredient, its typical volume range, and its role in one sentence. The marker's readout shows the predicted strength in psi and the percentage of the 28-day value. Selecting "Not cured" flattens the curve after a few days and shows a note explaining why the surface dries and hydration stops. An indicator shows when the concrete is strong enough to strip wall forms, assuming a stripping strength of 1,000 psi.

Colors: Aggregates are gray, paste is tan, water is blue, and air is white with an outline. Curves for the three curing conditions use different line styles as well as colors.

Implementation: Chart.js with two canvas elements and DOM controls.
```

## Related Resources

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
