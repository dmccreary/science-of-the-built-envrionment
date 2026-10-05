---
title: "Ground Temperature versus Depth Explorer"
description: "Students use the damped seasonal temperature model to find the swing at 10 feet, the depth where the swing falls to 2 F in two soils, and the date of the coldest soil at 10 feet, then compare soils and sites with four seasonal curves and a depth marker."
image: /sims/ground-temperature-depth-explorer/ground-temperature-depth-explorer.png
og:image: /sims/ground-temperature-depth-explorer/ground-temperature-depth-explorer.png
twitter:image: /sims/ground-temperature-depth-explorer/ground-temperature-depth-explorer.png
social:
   cards: false
status: built
library: Plotly.js
bloom_level: Analyze
---

# Ground Temperature versus Depth Explorer

<iframe src="main.html" width="100%" height="692" scrolling="no"></iframe>

[Run the Ground Temperature versus Depth Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ground-temperature-depth-explorer/main.html" width="100%" height="692" scrolling="no"></iframe>
```

## Description

Students use the damped seasonal temperature model to find the swing at 10 feet, the depth where the swing falls to 2 F in two soils, and the date of the coldest soil at 10 feet, then compare soils and sites with four seasonal curves and a depth marker.

This MicroSim belongs to [Appendix E: Geothermal Heating and Earth-Coupled Air](../../appendices/geothermal-ground-source/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read challenge 1 and type the swing at 10 feet. The four seasonal curves stay hidden until you answer.
2. Work through the depth and date challenges. After each answer the dotted line marks the answer on the chart.
3. When the controls unlock, choose a site and a soil and drag the depth marker. The readout gives the swing and the coldest and warmest dates at that depth.
4. Switch from typical to wet dense soil, then compare the two sites.

## Lesson Plan

**Learning objective:** Examine how the seasonal temperature swing and its timing change with depth for a stated site and soil, to determine the swing at a given depth and the depth at which the swing falls to 2 F or less.

**Bloom level:** Analyze (examine)

**Suggested activities**

- Predict the number (10 min): For each challenge, compute the answer from the formula before pressing Check.
- Depth and delay (10 min): Move the marker from 0 to 30 feet in typical soil and record the swing and the coldest date at 5, 10, 20, and 30 feet.
- Site matters (5 min): Compare the Twin Cities-like and mid-latitude sites at 25 feet and explain where the curves converge.

**Assessment**

- Students compute the swing at 15 feet in light dry soil for the Twin Cities-like site.
- Students explain why ground at 10 feet is not 55 F everywhere.

## References

- [Appendix E: Geothermal Heating and Earth-Coupled Air](../../appendices/geothermal-ground-source/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
- [Geothermal heat pump (Wikipedia)](https://en.wikipedia.org/wiki/Geothermal_heat_pump)
- [U.S. Department of Energy: Geothermal heat pumps](https://www.energy.gov/energysaver/geothermal-heat-pumps)

## Specification

The full specification below is extracted from
[Appendix E: Geothermal Heating and Earth-Coupled Air](../../appendices/geothermal-ground-source/index.md).

```text
Type: chart
**sim-id:** ground-temperature-depth-explorer<br/>
**Library:** Plotly<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine how the seasonal temperature swing and its timing change with depth for a stated site and soil, to determine the swing at a given depth and the depth at which the swing falls to 2°F or less.

**Prerequisites:** seasonal swing, damping depth, annual mean temperature (all defined in this appendix above the block).

**Evidence of Mastery:** In four challenges the learner types an answer before the chart reveals it: the swing at 10 feet, the depth where the swing is 2°F or less for two soils, and the date of the coldest temperature at 10 feet. An answer is correct within the tolerance in the Content table. Mastery is 3 of 4 correct, with two attempts allowed on each. Dragging the depth marker afterward is exploration, not evidence.

**Misconceptions:** (1) Soil is at one fixed temperature at every depth. (2) The ground is warmest in summer at every depth. (3) Ground at 10 feet is 55°F everywhere.

**Instructional Rationale:** Analyze-level work separates a pattern into its parts, here amplitude and timing. Having the learner predict a number from the formula before the curves are drawn shows that depth changes both, which the plain statement "the ground is steady" hides.

**Content:**

The chart plots temperature (horizontal) against depth below the surface (vertical, increasing downward) as four curves for four dates: day 20 (January 20), day 111 (April 21), day 203 (July 22) and day 294 (October 21). A depth marker shows the swing and the date of the coldest temperature at the chosen depth.

| Choice | Options | Default |
|---|---|---|
| Site | Twin Cities-like: annual mean 45°F, surface swing ±28°F. Mid-latitude example: annual mean 55°F, surface swing ±22°F. | Twin Cities-like |
| Soil | Light dry soil: diffusivity 0.03 m² per day (damping depth 6.1 ft). Typical soil: 0.05 m² per day (7.9 ft). Wet dense soil: 0.07 m² per day (9.4 ft). | Typical soil |

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Depth of the marker | 0 | 30 | 1 | 10 | ft |

A reference band marks the range 45°F to 75°F that the U.S. Department of Energy gives for steady ground temperature below about 10 feet across U.S. climate zones.

Challenges, in this order (Twin Cities-like site):

| # | Question | Soil | Correct answer | Tolerance | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | What is the seasonal swing at 10 ft? | Typical | ±7.9°F | ±0.5°F | The swing is 28 x e^(-10/7.9) = 28 x 0.28 = 7.9°F. |
| 2 | At what depth does the swing fall to 2°F or less? | Typical | 20.9 ft | ±1.5 ft | Depth = d x ln(28/2) = 7.9 x 2.64 = 20.9 ft. |
| 3 | Same question for wet dense soil | Wet dense | 24.7 ft | ±1.5 ft | Wetter, denser soil carries the seasons deeper: 9.4 x 2.64 = 24.7 ft. |
| 4 | On what date is the soil coldest at 10 ft? | Typical | April 3 | ±5 days | The delay is (10 / 7.9) x 58 = 73 days after January 20, which is about April 3. |

**Provenance:** The model, the 45°F to 75°F range, the 45°F annual mean and the DOE statement come from this appendix and its cited U.S. Department of Energy page. The soil diffusivities, the surface swings, the mid-latitude annual mean and the four dates are illustrative, and the sim must label them "illustrative" and note that a real site needs measured soil data (Chapter 9).

**Rules:**

- Angular rate: ω = 2π / 365 per day. Damping depth d = sqrt(2 x diffusivity / ω), converted to feet by multiplying meters by 3.281.
- Temperature at depth z (ft) on day t: T = mean - swing x e^(-z/d) x cos(ω x (t - 20) - z/d). The surface is coldest on day 20.
- Swing at depth z = surface swing x e^(-z/d).
- Delay of the coldest temperature at depth z = (z / d) x 365 / (2π) days after day 20, which is about 58 days per damping depth.
- Depth at which the swing falls to S = d x ln(surface swing / S), defined only for S < surface swing.
- The model assumes uniform soil, no snow cover and no groundwater flow, and the sim must say so.

**Learner Activity:**

1. The learner reads a challenge and types a number or picks a date.
2. The learner presses Check. The sim draws the four curves for the chosen site and soil and marks the answer on the chart.
3. After the challenges the learner chooses a site and a soil and drags the depth marker. The curves and the readout update at once.
4. The learner switches from typical to wet dense soil and should notice that the curves spread deeper and the delay grows.
5. The learner compares the two sites and should notice that the annual mean sets where the curves converge, so the "steady" temperature depends on the site.

**Feedback:** Four challenges, fixed order, two attempts each. Correct: "Correct: <answer>." Incorrect on the first attempt: the Why text without the answer. After a second wrong attempt the answer and the Why text are shown, and the challenge counts as missed. A running count "Challenges correct: n of 4" is shown.

**Starting State:** The four curves are hidden. Challenge 1 is shown with an empty answer box and the question "At 10 feet, how much does the soil's temperature still swing between winter and summer?"

**Chapter Anchors:** Appendix E states that the ground holds a nearly constant temperature typically between 45°F and 75°F by climate zone, that the Twin Cities' annual mean air temperature is in the mid-40s°F, and that the swing at 10 feet is about ±8°F, at 20 feet about ±2°F, and under ±1°F at 30 feet, with the coldest soil at 10 feet in early April.
```

## Related Resources

- [Appendix E: Geothermal Heating and Earth-Coupled Air](../../appendices/geothermal-ground-source/index.md)
