---
title: "Appendix E: Geothermal Heating and Earth-Coupled Air"
description: "How ground-source heat pumps, networked geothermal loops, and buried earth tubes use the steady temperature of the ground, and why that temperature depends on where the building is."
last_reviewed: 2026-10-05
rate_of_change: high
---

# Appendix E: Geothermal Heating and Earth-Coupled Air

!!! mascot-welcome "The Ground Never Has a Bad Winter"
    ![Beau waving welcome](../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A few feet down, the soil barely notices whether it is January or July, and clever systems borrow that steadiness to heat and cool buildings. This appendix covers three ways to use it and the soil science that decides whether each one works. Let's build it right!

Chapter 9 explains how soils and groundwater shape a site, and Chapter 10 shows how foundations sit in the ground. The same soil that carries the building is also a vast heat reservoir. A few feet down the soil barely notices the season, and deeper still it holds a nearly constant temperature, typically somewhere between 45°F and 75°F depending on the climate zone.[^1] That steady temperature sits near the local average annual air temperature, so it is warmer than a winter day and cooler than a summer one everywhere.

The right number for Minnesota is lower than many people assume. A common figure quoted for the ground is around 55°F, which fits much of the middle of the country, but the Twin Cities' average annual air temperature is in the mid-40s°F, so soil at depth there is in the mid-40s to low 50s. Always use the value for the site.

## How Deep Does the Season Reach?

Soil conducts heat slowly, so the seasons reach down into it only gradually. Two things happen as you go deeper. The **seasonal swing**, the difference between the warmest and coldest temperature of the year at that depth, shrinks, and the warmest and coldest times arrive later than they do at the surface. A simple model of soil with uniform properties puts a number on both. The swing shrinks by a factor of about 2.7 (the number *e*) for every **damping depth** *d* you descend, and the timing slips by about 58 days per damping depth. For typical soil, *d* is about 8 feet.

Taking an illustrative Twin Cities-like site with an annual mean of 45°F and a surface swing of ±28°F, the model gives a swing of about ±8°F at 10 feet, about ±2°F at 20 feet, and under ±1°F at 30 feet. At 10 feet the coldest soil of the year arrives in early April, around 73 days after the surface's coldest day. A ground loop buried at those depths therefore sees a gentle, delayed seasonal cycle, not a fixed temperature. The MicroSim lets you test this.

#### Diagram: Ground Temperature versus Depth Explorer

<details markdown="1">
<summary>Ground Temperature versus Depth Explorer</summary>
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
</details>

## Three Ways to Use the Ground

**Ground-source (geothermal) heat pumps.** A closed loop of buried plastic pipe, laid in trenches or vertical boreholes, circulates water or antifreeze solution that exchanges heat with the soil. A heat pump inside the building moves heat from the loop into the building in winter and in the opposite direction in summer. This is the same machine as in [Appendix A](heat-pumps-electrification.md), but with a much steadier source temperature.

**Networked geothermal.** A shared loop serves many buildings, each with its own heat pump, and buildings that need cooling can give heat to those that need heating. Utilities have built pilot projects, and the approach is a candidate for replacing aging gas distribution networks.

**Earth tubes (earth-air heat exchangers).** Outdoor air for ventilation is drawn through a long buried pipe before it enters the building, so it is warmed in winter and cooled in summer. The air gets some of the ground's temperature on the way in.

## The Physics That Does Not Change

The Carnot limit from Appendix A depends on the temperature of the heat source, and the ground is a better source than winter air.

**Worked example: ground versus air.** Suppose a heat pump supplies 100°F (310.9 K) to the building.

| Heat source | Source (K) | Lift (K) | Carnot limit |
|---|---|---|---|
| Outdoor air at 5°F | 258.2 | 52.8 | 5.9 |
| Ground loop water at 40°F | 277.6 | 33.3 | 9.3 |

The limit is about 1.6 times higher with the ground loop. (Loop water runs a few degrees colder than the surrounding soil in winter, which is why the example uses 40°F rather than the ground temperature.) Real systems capture only a fraction of it, but that fraction applies to a larger number. A ground loop also keeps the same performance at the coldest hour of the year, when an air-source machine is working hardest.

**Worked example: an earth tube on a cold day.** Take 100 cfm of outdoor air at 0°F that leaves the tube at 35°F. The preheat is \( 1.08 \times 100 \times 35 = 3{,}780 \) Btu/h. The value is real but modest, which is why earth tubes are normally a supplement to a heat recovery ventilator rather than a replacement for one.

## What Is Changing

- **Drilling and installation.** Smaller drilling rigs, better loop materials, and standardized designs are lowering installed costs, which are the main obstacle to ground-source systems.
- **Design tools.** Software that models soil conductivity and the thermal balance of the loop is improving, and test boreholes measure a site's actual conductivity.
- **Networks and utilities.** Pilot networked systems are testing whether utilities can own and operate shared loops.
- **Policy.** Incentives for geothermal systems have been revised several times, as with solar in [Appendix C](solar-photovoltaics.md).

!!! mascot-warning "Earth Tubes Can Grow Mold"
    ![Beau warning](../img/mascot/warning.png){ class="mascot-admonition-img" }
    Cool soil can chill humid summer air below its dew point, and the resulting condensate can feed mold inside the pipe. Slope the pipe to a drain, keep it smooth and cleanable, filter the air, and treat the design as a specialist's job. Many designers now prefer closed-loop systems that never put ground air in the ventilation stream.

## Ground Loops Need Balance

In a heating-dominated climate like Minnesota, a ground loop removes more heat from the soil each winter than it puts back in summer. Over decades, the soil around the loop can cool. Designers size the loop for the long term, check the soil's conductivity and the groundwater flow, and sometimes add a heat source such as solar thermal collectors or cooling-season heat rejection to restore balance. Chapters 9 and 10 give the soil background for these checks.

## What to Watch

- Installed-cost trends for drilling and loop fields.
- Utility-owned networked geothermal programs and the regulatory rules that govern them.
- Guidance on earth-tube hygiene and radon, which determines whether they remain a safe design option.
- Hybrid designs that pair ground loops with air-source heat pumps or solar.

## Connects To

- [Chapter 9: Site Work, Soils, and Groundwater](../chapters/09-site-soils/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../chapters/14-hvac-plumbing-fire/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../chapters/19-energy-efficiency/index.md)

## Key Takeaways

- The seasonal swing in ground temperature shrinks and arrives later with depth, settling near the local annual average, and that temperature varies by location.
- A ground source lowers the lift a heat pump must overcome, raising its possible COP in the coldest weather.
- Loop design, installation cost, earth-tube moisture control, and utility programs are changing; the thermal steadiness of soil is not.

## References

[^1]: U.S. Department of Energy. *Geothermal Heat Pumps.* <https://www.energy.gov/hgeo/geothermal/geothermal-heat-pumps>
