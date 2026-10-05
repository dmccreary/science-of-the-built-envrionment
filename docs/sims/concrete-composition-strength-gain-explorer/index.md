---
title: "Concrete Composition and Strength Gain Explorer"
description: "Students see how one cubic yard of concrete divides among aggregates, cement, water, and air, and compare strength-gain curves for moist-cured, briefly cured, and uncured concrete. A marker reads the strength and the percentage of f'c at any age and shows when wall forms can be stripped."
image: /sims/concrete-composition-strength-gain-explorer/concrete-composition-strength-gain-explorer.png
og:image: /sims/concrete-composition-strength-gain-explorer/concrete-composition-strength-gain-explorer.png
twitter:image: /sims/concrete-composition-strength-gain-explorer/concrete-composition-strength-gain-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Understand, Apply
---

# Concrete Composition and Strength Gain Explorer

<iframe src="main.html" width="100%" height="742" scrolling="no"></iframe>

[Run the Concrete Composition and Strength Gain Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/concrete-composition-strength-gain-explorer/main.html" width="100%" height="742" scrolling="no"></iframe>
```

## Description

Students see how one cubic yard of concrete divides among aggregates, cement, water, and air, and compare strength-gain curves for moist-cured, briefly cured, and uncured concrete. A marker reads the strength and the percentage of f'c at any age and shows when wall forms can be stripped.

## How to Use

1. Hover over each slice of the doughnut chart to read the ingredient, how much of the cubic yard it takes now, its typical range, and its role. Change Air content to see the air slice and the aggregate slice trade volume.
2. Set the Specified strength f'c and the Age sliders. The gold marker on the strength-gain chart and the readout show the predicted strength in psi and its share of f'c. The default (4,000 psi, 7 days, moist-cured) gives about 2,600 psi, as in Chapter 8.
3. Switch Curing between Moist-cured, Cured 3 days only, and Not cured and compare the three curves, which differ in line style as well as color. Read the note that explains why the poorly cured curves flatten.
4. Watch the stripping indicator: the readout says whether the concrete has reached the assumed 1,000 psi needed to strip wall forms, and on which day it does.

## Lesson Plan

**Learning objective:** Describe the approximate volume proportions of the ingredients in concrete and predict the strength of a 4,000 psi mix at a given age under moist curing and under poor curing.

**Suggested activities**

- Warm-up (5 min): Students estimate, before touching the controls, what fraction of a cubic yard of concrete is aggregate, then check against the doughnut chart.
- Explore (10 min): Students record the strength at 3, 7, 14, and 28 days for each curing condition at 4,000 psi and describe how the three curves diverge.
- Apply (10 min): For a winter wall pour, students use the stripping indicator at f'c = 3,000, 4,000, and 5,000 psi to decide how many days the forms must stay on, and explain why curing matters for the answer.

**Assessment**

- Students predict the strength at 7 days of a 5,000 psi mix that is moist-cured, then verify with the simulator and explain any difference.
- Students write two sentences explaining why concrete cures rather than dries, and why not curing leaves it weaker.

## References

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
- [Portland Cement Association, Design and Control of Concrete Mixtures (composition of concrete and effects of curing)](https://www.cement.org/)
- [Concrete (Wikipedia)](https://en.wikipedia.org/wiki/Concrete)

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
