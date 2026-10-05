---
title: "Appendix E: Geothermal Heating and Earth-Coupled Air"
description: "How ground-source heat pumps, networked geothermal loops, and buried earth tubes use the steady temperature of the ground, and why that temperature depends on where the building is."
generated_by: claude skill chapter-content-generator
date: 2026-10-05 08:31:02
version: 1.11
last_reviewed: 2026-10-05
rate_of_change: high
---

# Appendix E: Geothermal Heating and Earth-Coupled Air

## Summary

How ground-source heat pumps, networked geothermal loops, and buried earth tubes use the steady temperature of the ground, and why that temperature depends on where the building is. After completing this appendix, students will be able to define, explain, and apply the 7 concepts listed below.

## Concepts Covered

This appendix covers the following 7 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Ground Temperature Profile | 7 |
| Ground-Source Heat Pump | 3 |
| Seasonal Temperature Swing | 2 |
| Ground Loop | 2 |
| Damping Depth | 1 |
| Networked Geothermal | 1 |
| Earth Tube | 1 |

## Prerequisites

This appendix builds on concepts from these parts of the book:

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md): Heat Transfer
- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md): Soil Types
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md): Heat Pump, Ventilation

---

!!! mascot-welcome "The Ground Never Has a Bad Winter"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A few feet down, the soil barely notices whether it is January or July, and clever systems borrow that steadiness to heat and cool buildings. This appendix covers three ways to use it and the soil science that decides whether each one works. Let's build it right!

Chapter 9 explains how soils and groundwater shape a site, and Chapter 10 shows how foundations sit in the ground. The same soil that carries the building is also a vast heat reservoir. A few feet down the soil barely notices the season, and deeper still it holds a nearly constant temperature, typically somewhere between 45°F and 75°F depending on the climate zone.[^1] That steady temperature sits near the local average annual air temperature, so it is warmer than a winter day and cooler than a summer one everywhere.

The right number for Minnesota is lower than many people assume. A common figure quoted for the ground is around 55°F, which fits much of the middle of the country, but the Twin Cities' average annual air temperature is in the mid-40s°F, so soil at depth there is in the mid-40s to low 50s. Always use the value for the site.

## How Deep Does the Season Reach?

Soil conducts heat slowly, so the seasons reach down into it only gradually. Two things happen as you go deeper. The **seasonal swing**, the difference between the warmest and coldest temperature of the year at that depth, shrinks, and the warmest and coldest times arrive later than they do at the surface. A simple model of soil with uniform properties puts a number on both. The swing shrinks by a factor of about 2.7 (the number *e*) for every **damping depth** *d* you descend, and the timing slips by about 58 days per damping depth. For typical soil, *d* is about 8 feet.

Taking an illustrative Twin Cities-like site with an annual mean of 45°F and a surface swing of ±28°F, the model gives a swing of about ±8°F at 10 feet, about ±2°F at 20 feet, and under ±1°F at 30 feet. At 10 feet the coldest soil of the year arrives in early April, around 73 days after the surface's coldest day. A ground loop buried at those depths therefore sees a gentle, delayed seasonal cycle, not a fixed temperature. The MicroSim lets you test this.

#### Diagram: Ground Temperature versus Depth Explorer

<iframe src="../../sims/ground-temperature-depth-explorer/main.html" width="100%" height="692px" scrolling="no"></iframe>

[Run the Ground Temperature versus Depth Explorer MicroSim fullscreen](../../sims/ground-temperature-depth-explorer/main.html){ .md-button }

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

**Ground-source (geothermal) heat pumps.** A closed loop of buried plastic pipe, laid in trenches or vertical boreholes, circulates water or antifreeze solution that exchanges heat with the soil. A heat pump inside the building moves heat from the loop into the building in winter and in the opposite direction in summer. This is the same machine as in [Appendix A](../heat-pumps-electrification/index.md), but with a much steadier source temperature.

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

## Does an Earth Tube Pay for Itself?

The cold-day example shows what an earth tube delivers in one hour. Whether it is worth building depends on a whole year of hours, on what the saved heat would have cost, and on the price of the trench. Compare two versions of a typical Minnesota house. Both lose 300 Btu per hour through the enclosure for each °F between indoors and outdoors, bring in 100 cfm of outdoor air, and need heat whenever the outdoor temperature is below a **balance point** of 65°F. One draws its outdoor air through a standard intake on the wall. The other draws it through 200 feet of 8-inch pipe buried 8 feet deep.

A buried pipe never brings the air all the way to the soil temperature. Its **effectiveness** is the share of the gap between outdoor air and soil that it closes, and each added foot closes a little less than the foot before it. With the illustrative pipe used here, 100 feet closes 62 percent of the gap, 200 feet closes 86 percent, and 400 feet closes 98 percent.

**Worked example: January.** The normal mean temperature for January in the Twin Cities is 16.2°F.[^2] The soil model above puts the ground at 8 feet at 40.4°F in mid-January, because the coldest soil arrives about two months after the coldest air. The 200-foot pipe delivers air at \( 16.2 + 0.86 \times (40.4 - 16.2) = 36.9 \)°F. The preheat is \( 1.08 \times 100 \times 20.7 \approx 2{,}240 \) Btu/h, or 1.67 million Btu over the 744 hours of the month. A 95 percent furnace burns 17.5 therms to supply that heat, which costs \$21 at the illustrative \$1.20 per therm from [Appendix A](../heat-pumps-electrification/index.md). The whole January heating bill for this house is about \$187, so the ground source lowers it by 11 percent.

Repeating the calculation for every month gives a yearly heating and cooling bill of about \$956 with the standard intake and \$839 with the ground source, a saving of \$117. Suppose the system has a fixed cost of \$2,000 for the intake, filter, drain, and bypass damper, plus \$40 for each foot of trench and pipe, or \$10,000 for 200 feet. These installed costs are illustrative, and they assume an open site that excavating equipment can reach easily. The fixed cost is lower when a contractor with a backhoe is already working on the site. The **simple payback**, the installed cost divided by the yearly savings, is \( 10{,}000 / 117 \approx 85 \) years. Over 30 years the savings add up to \$3,520, so the **return on investment (ROI)**, the net gain divided by the cost, is \( (3{,}520 - 10{,}000) / 10{,}000 = -65 \) percent.

The estimate favors the earth tube. It assumes that the soil stays at its undisturbed temperature all season, and it leaves out fan energy, filter changes, and cleaning, so a real system would save less. The MicroSim repeats the calculation for all twelve months and lets you change the pipe length, the fixed cost, the cost per foot, and the heating system.

#### Diagram: Ground-Source ROI Estimator

<iframe src="../../sims/ground-source-roi-estimator/main.html" width="100%" height="762px" scrolling="no"></iframe>

[Run the Ground-Source ROI Estimator MicroSim fullscreen](../../sims/ground-source-roi-estimator/main.html){ .md-button }

<details markdown="1">
<summary>Ground-Source ROI Estimator</summary>
Type: chart
**sim-id:** ground-source-roi-estimator<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge whether a buried earth-tube air intake is a sound investment for a stated Minnesota house by comparing its yearly heating and cooling savings with its installed cost, and will determine the pipe length that gives the shortest simple payback.

**Prerequisites:** earth tube, seasonal swing, damping depth, balance point, effectiveness, simple payback, return on investment (all defined in this appendix above the block); therm, kilowatt-hour, and COP (Appendix A).

**Evidence of Mastery:** The learner types the pipe length that gives the shortest simple payback for the fixed cost, cost per foot, and heating system currently set. An answer is correct when it is within ±20 ft of the model's best length. Two attempts are allowed. Changing the fixed cost, the cost per foot, or the heating system starts a new challenge with a new answer. Moving the sliders is exploration, not evidence.

**Misconceptions:** (1) Doubling the pipe length doubles the savings. (2) Heat from the ground is free, so the payback must be short. (3) The ground helps in every month. (4) The saving depends only on the pipe, not on what the saved heat would have cost.

**Instructional Rationale:** Evaluate-level work requires a judgment against a criterion, here simple payback and 30-year return. Placing the monthly costs of both houses beside the installed cost shows that the saving is real but small. Searching for the best length shows why a benefit that levels off and a cost that does not produce a best size.

**Content:**

The chart shows twelve pairs of bars, one pair per month: the heating or cooling cost of the house with a standard intake, and the cost of the same house with the ground-source intake. Heating and cooling bars have a separate color for each house, so the chart uses four colors. A button swaps the chart for a table of the same numbers. Four tiles show the installed cost, the yearly savings, the simple payback, and the 30-year return on investment.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Pipe length | 50 | 400 | 10 | 200 | ft |
| Installed cost per foot of pipe | 20 | 80 | 5 | 40 | \$ per ft |
| Fixed installed cost | 1,000 | 3,000 | 250 | 2,000 | \$ |

| Choice | Options | Default |
|---|---|---|
| Heating system | 95% gas furnace at \$1.20 per therm. Heat pump with seasonal COP 2.5 at \$0.14 per kWh. Electric resistance at \$0.14 per kWh. | 95% gas furnace |

Fixed values: enclosure heat loss 300 Btu/h per °F; outdoor air 100 cfm; balance point 65°F; pipe diameter 8 in; pipe depth 8 ft; heat transfer coefficient of the pipe and surrounding soil 0.5 Btu/h per ft² per °F; cooling by an air conditioner with seasonal COP 4 at \$0.14 per kWh; analysis period 30 years.

| Month | Days | Outdoor air (°F) | Soil at 8 ft (°F) |
|---|---|---|---|
| January | 31 | 16.2 | 40.4 |
| February | 28 | 20.6 | 36.4 |
| March | 31 | 33.3 | 34.9 |
| April | 30 | 47.1 | 35.8 |
| May | 31 | 59.5 | 39.2 |
| June | 30 | 69.7 | 44.3 |
| July | 31 | 74.3 | 49.4 |
| August | 31 | 71.8 | 53.4 |
| September | 30 | 63.5 | 55.2 |
| October | 31 | 49.5 | 54.1 |
| November | 30 | 34.8 | 50.6 |
| December | 31 | 22.0 | 45.6 |

**Provenance:** The outdoor temperatures are the NOAA 1991-2020 monthly normals cited in this appendix. The soil model and its site values, the 100 cfm airflow, and the factor 1.08 come from this appendix. The energy prices, furnace efficiency, and heat pump COP come from Appendix A, where they are illustrative. The enclosure heat loss, pipe size, heat transfer coefficient, cooling COP, installed costs, and 30-year period are illustrative. The sim must label the house, pipe, prices, and installed cost "illustrative" and state that the model leaves out soil temperature drift, fan energy, maintenance, and humidity.

**Rules:**

- Soil at 8 ft = the appendix model with mean 45°F, surface swing ±28°F, damping depth 7.9 ft, and the surface coldest on day 20, evaluated on the 15th of each month and rounded to 0.1°F. The table lists the results.
- Effectiveness = 1 - e^(-L / 103.1), with L the pipe length in feet. The 103.1 ft is 108 / (0.5 x π x 8/12): the 1.08 x 100 = 108 Btu/h per °F carried by the air, divided by the heat one foot of pipe transfers per °F.
- Air leaving the pipe = outdoor + effectiveness x (soil - outdoor).
- A month is a heating month if its outdoor temperature is below 65°F. Otherwise it is a cooling month.
- Bypass damper: in a heating month the intake air is the pipe air only if it is warmer than outdoor air, and in a cooling month only if it is cooler. Otherwise the intake air is outdoor air. With this table the pipe is bypassed in April, May, and September at every length.
- Standard house load in Btu/h = (300 + 108) x the difference between 65°F and the outdoor temperature.
- Ground-source house load = 300 x (65 - outdoor) + 108 x (65 - intake) in a heating month, and 300 x (outdoor - 65) + 108 x (intake - 65) in a cooling month, never less than zero.
- Monthly cost = load x 24 x days x cost per Btu. Heating cost per Btu is 1.20 / (0.95 x 100,000) for gas, 0.14 / (3,412 x 2.5) for the heat pump, and 0.14 / 3,412 for resistance. Cooling cost per Btu is 0.14 / (3,412 x 4) for all three.
- Installed cost = fixed cost + cost per foot x L. The fixed cost covers the intake, filter, drain, and bypass damper. Yearly savings = standard yearly cost - ground-source yearly cost. Simple payback = installed cost / yearly savings. 30-year ROI = (30 x yearly savings - installed cost) / installed cost.
- Yearly savings are above zero at every setting, so no input divides by zero.
- Best length = the slider step from 50 to 400 ft with the smallest payback.
- At the defaults the sim must reproduce this appendix: effectiveness 86 percent, January intake air 36.9°F, January costs \$187 and \$166, yearly costs \$956 and \$839, savings \$117, installed cost \$10,000, payback 85 years, ROI -65 percent, and a best length of 90 ft with a 68-year payback.

**Learner Activity:**

1. The learner reads the chart at the defaults and finds the months in which the two bars differ and the months in which they match.
2. The learner hovers over a month, or opens the table, to read the outdoor, soil, and intake temperatures, and should notice that the pipe is bypassed in April, May, and September because the soil is then colder than the outdoor air while the house still needs heat.
3. The learner drags the pipe length from 50 to 400 ft and should notice that the savings rise quickly and then level off while the installed cost rises by the same amount for every foot.
4. The learner types the pipe length with the shortest payback and presses Check.
5. The learner changes the fixed cost, the cost per foot, and the heating system, and should notice that a lower fixed cost or a more expensive trench shortens the best length, and that the gas furnace never reaches a positive 30-year return while electric resistance heat does when the installed costs are low.

**Feedback:** One challenge for each combination of fixed cost, cost per foot, and heating system, two attempts. Correct: "Correct: about <best> ft pays back fastest, in <n> years." followed by "Savings level off as the pipe gets longer, but the cost keeps rising by \$<cost> for every foot." Incorrect on the first attempt: the payback at the typed length and whether to try a shorter or a longer pipe. After a second wrong attempt the best length and the same explanation are shown, and the challenge counts as missed.

**Starting State:** Pipe length 200 ft, \$40 per foot, \$2,000 fixed cost, 95% gas furnace. The chart is visible, the tiles read \$10,000, \$117, 85 years, and -65 percent, and the challenge answer box is empty.

**Chapter Anchors:** Appendix E states a January outdoor mean of 16.2°F and soil at 40.4°F at 8 ft; effectiveness of 62, 86, and 98 percent at 100, 200, and 400 ft; January intake air at 36.9°F and a \$21 saving on a \$187 bill; yearly costs of \$956 and \$839; a \$10,000 installed cost; an 85-year payback; and a 30-year ROI of -65 percent.
</details>

## What Is Changing

- **Drilling and installation.** Smaller drilling rigs, better loop materials, and standardized designs are lowering installed costs, which are the main obstacle to ground-source systems.
- **Design tools.** Software that models soil conductivity and the thermal balance of the loop is improving, and test boreholes measure a site's actual conductivity.
- **Networks and utilities.** Pilot networked systems are testing whether utilities can own and operate shared loops.
- **Policy.** Incentives for geothermal systems have been revised several times, as with solar in [Appendix C](../solar-photovoltaics/index.md).

!!! mascot-warning "Earth Tubes Can Grow Mold"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Cool soil can chill humid summer air below its dew point, and the resulting condensate can feed mold inside the pipe. Slope the pipe to a drain, keep it smooth and cleanable, filter the air, and treat the design as a specialist's job. Many designers now prefer closed-loop systems that never put ground air in the ventilation stream.

## Ground Loops Need Balance

In a heating-dominated climate like Minnesota, a ground loop removes more heat from the soil each winter than it puts back in summer. Over decades, the soil around the loop can cool. Designers size the loop for the long term, check the soil's conductivity and the groundwater flow, and sometimes add a heat source such as solar thermal collectors or cooling-season heat rejection to restore balance. Chapters 9 and 10 give the soil background for these checks.

## What to Watch

- Installed-cost trends for drilling and loop fields.
- Utility-owned networked geothermal programs and the regulatory rules that govern them.
- Guidance on earth-tube hygiene and radon, which determines whether they remain a safe design option.
- Hybrid designs that pair ground loops with air-source heat pumps or solar.

## Connects To

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)

## Key Takeaways

- The seasonal swing in ground temperature shrinks and arrives later with depth, settling near the local annual average, and that temperature varies by location.
- A ground source lowers the lift a heat pump must overcome, raising its possible COP in the coldest weather.
- An earth tube's savings level off as the pipe gets longer while its cost keeps rising, so there is a best length, and for a gas-heated Minnesota house even that length takes decades to pay back.
- Loop design, installation cost, earth-tube moisture control, and utility programs are changing; the thermal steadiness of soil is not.

## References

[^1]: U.S. Department of Energy. *Geothermal Heat Pumps.* <https://www.energy.gov/hgeo/geothermal/geothermal-heat-pumps>

[^2]: NOAA National Centers for Environmental Information. *U.S. Climate Normals 1991-2020: Monthly Normals, Minneapolis-St. Paul International Airport (station USW00014922).* <https://www.ncei.noaa.gov/access/us-climate-normals/>

[See Annotated References](./references.md)
