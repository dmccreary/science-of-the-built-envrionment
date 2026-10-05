---
title: "Rooftop PV Monthly Production Explorer"
description: "Students predict which months a 7 kW rooftop array makes more electricity than a house uses, see monthly production beside monthly load, find the smallest array that covers the annual load, and then explore array size, derate, annual use, and a winter-heavy load."
image: /sims/pv-monthly-production-explorer/pv-monthly-production-explorer.png
og:image: /sims/pv-monthly-production-explorer/pv-monthly-production-explorer.png
twitter:image: /sims/pv-monthly-production-explorer/pv-monthly-production-explorer.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Analyze
---

# Rooftop PV Monthly Production Explorer

<iframe src="main.html" width="100%" height="628" scrolling="no"></iframe>

[Run the Rooftop PV Monthly Production Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/pv-monthly-production-explorer/main.html" width="100%" height="628" scrolling="no"></iframe>
```

## Description

Students predict which months a 7 kW rooftop array makes more electricity than a house uses, see monthly production beside monthly load, find the smallest array that covers the annual load, and then explore array size, derate, annual use, and a winter-heavy load.

This MicroSim belongs to [Appendix C: Solar Photovoltaics](../../appendices/solar-photovoltaics/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. In challenge 1, tick the months in which you expect production to exceed the load, then press Check. The chart stays hidden until you answer.
2. Work through challenge 2 (a winter-heavy load) and challenge 3 (the smallest whole-kilowatt array for 100 percent annual coverage).
3. When the controls unlock, change the array size, derate, annual use, and load profile and watch the chart and annual coverage update.
4. Switch from a flat to a winter-heavy load and compare the surplus months and the annual coverage.

## Lesson Plan

**Learning objective:** Examine monthly solar production against monthly household load for a stated array size and load profile, to identify the months of surplus and the smallest whole-kilowatt array that covers the annual load.

**Bloom level:** Analyze (examine)

**Suggested activities**

- Predict, then see (10 min): Before pressing Check, write down your surplus months and the reason for each.
- Same total, different timing (10 min): Keep the array and annual use fixed and switch the load profile. Describe what changes and what does not.
- Storage question (5 min): Using the winter-heavy profile, explain why an array with 100 percent annual coverage still needs the grid in winter.

**Assessment**

- Students state the annual coverage of a 7 kW array at 10,000 kWh of use and explain why it does not mean 12 percent grid use in every month.
- Students find the smallest array that covers 12,000 kWh at derate 0.80.

## References

- [Appendix C: Solar Photovoltaics](../../appendices/solar-photovoltaics/index.md)
- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [Photovoltaic system (Wikipedia)](https://en.wikipedia.org/wiki/Photovoltaic_system)
- [NREL PVWatts calculator](https://pvwatts.nrel.gov/)

## Specification

The full specification below is extracted from
[Appendix C: Solar Photovoltaics](../../appendices/solar-photovoltaics/index.md).

```text
Type: chart
**sim-id:** pv-monthly-production-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** examine<br/>
**Learning Objective:** The learner will examine monthly solar production against monthly household load for a stated array size and load profile, to identify the months of surplus and the smallest whole-kilowatt array that covers the annual load.

**Prerequisites:** photovoltaic array, peak sun hours, derate, kilowatt-hour (all defined in this appendix above the block).

**Evidence of Mastery:** In three challenges the learner commits an answer before the chart reveals it. In challenges 1 and 2 the learner selects the set of surplus months, which is correct when it matches the answer exactly. In challenge 3 the learner types the smallest whole-kilowatt array that gives annual coverage >= 100 percent. Mastery is 3 of 3 correct, with two attempts on each. Moving the controls afterward is exploration, not evidence.

**Misconceptions:** (1) Annual coverage of 88 percent means the house needs the grid for only 12 percent of every month. (2) Solar produces in proportion to demand. (3) A winter-heavy load, such as electric heating, makes the same array cover the same months.

**Instructional Rationale:** Analyze-level work separates a total from its parts. Asking the learner to predict the surplus months before the chart appears shows that an annual total hides when the energy arrives, which is the reason storage and net-metering rules matter.

**Content:**

| Month | Days | Illustrative peak sun hours per day | Winter-heavy load weight |
|---|---|---|---|
| January | 31 | 2.4 | 1.4 |
| February | 28 | 3.4 | 1.3 |
| March | 31 | 4.5 | 1.1 |
| April | 30 | 5.2 | 0.9 |
| May | 31 | 5.8 | 0.8 |
| June | 30 | 6.2 | 0.8 |
| July | 31 | 6.3 | 0.9 |
| August | 31 | 5.6 | 0.9 |
| September | 30 | 4.6 | 0.8 |
| October | 31 | 3.4 | 0.9 |
| November | 30 | 2.2 | 1.1 |
| December | 31 | 1.9 | 1.1 |

The weights sum to 12.0. The day-weighted average of peak sun hours is 4.30.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Array size | 3 | 12 | 1 | 7 | kW |
| Derate | 0.70 | 0.90 | 0.05 | 0.80 | none |
| Annual household use | 6,000 | 16,000 | 1,000 | 10,000 | kWh |

Load profile choice: "Flat" (default) or "Winter-heavy".

Challenges, in this order:

| # | Setting | Correct answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | 7 kW, derate 0.80, 10,000 kWh, flat load (833 kWh per month) | April, May, June, July, August | Production is 5.6 x peak sun hours x days. It reaches 874, 1,007, 1,042, 1,094 and 972 kWh in those months. March (781) and September (773) fall just short of 833. |
| 2 | Same, winter-heavy load | April, May, June, July, August, September | The load drops to 750 kWh in April, July, August and 667 in May, June, September. September's 773 kWh of production now exceeds its load, but October (590) and March (781, against a load of 917) do not. |
| 3 | 10,000 kWh, derate 0.80, flat load | 8 kW | Annual production is 1,568.1 x 0.80 x kW. At 7 kW that is 8,781 kWh (88 percent). At 8 kW it is 10,035 kWh (100 percent). |

**Provenance:** The 7 kW, 4.3 peak sun hours, 0.80 derate and 10,000 kWh come from this appendix. The monthly peak sun hours and the winter-heavy load weights are illustrative, and the sim must label them "illustrative" and tell the learner to use a tool such as NREL's PVWatts for a real site.

**Rules:**

- Monthly production (kWh) = array size x derate x peak sun hours x days in the month.
- Annual production = the sum of the twelve months. At the default settings it is 8,781 kWh.
- Flat load per month = annual use / 12. Winter-heavy load per month = annual use x weight / 12.
- A month is a surplus month when production >= load for that month, and a deficit month otherwise.
- Annual coverage (percent) = annual production / annual use x 100, shown to the nearest whole percent.

**Learner Activity:**

1. The learner reads a challenge and, for challenges 1 and 2, selects the months they expect to have surplus.
2. The learner presses Check. The sim draws twelve columns for production beside twelve for load and marks each month as surplus or deficit.
3. For challenge 3 the learner types an array size and presses Check, and the sim shows annual coverage for that size.
4. After the challenges the controls unlock. The learner changes array size, derate, annual use, and the load profile, and the chart and the annual coverage update at once.
5. The learner switches from flat to winter-heavy load with annual coverage unchanged, and should notice that the summer surplus grows relative to the winter shortfall while the annual total stays the same.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <answer>." Incorrect: the Why text for that challenge, without the answer on the first attempt. After a second wrong attempt the answer and the Why text are shown, and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** The chart is hidden. Challenge 1 is shown with twelve month choices and the question "Which months will a 7 kW array produce more than this house uses?"

**Chapter Anchors:** A 7 kW array with 4.3 peak sun hours and a derate of 0.80 produces about 8,800 kWh a year (the MicroSim shows 8,781 kWh) on about 360 ft² of roof. A typical home uses roughly 10,000 kWh a year. Most of the energy arrives from spring through fall, with a weak December.
```

## Related Resources

- [Appendix C: Solar Photovoltaics](../../appendices/solar-photovoltaics/index.md)
