---
title: "Appendix C: Solar Photovoltaics"
description: "How falling costs, changing incentives, and better modules are reshaping rooftop solar, with a worked example sizing a Minneapolis array."
last_reviewed: 2026-10-05
rate_of_change: very high
---

# Appendix C: Solar Photovoltaics

!!! mascot-welcome "A Roof That Pays You Back"
    ![Beau waving welcome](../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Few building technologies have changed as fast as solar panels, and both their cost and the rules around them keep moving. This appendix gives you a way to size an array yourself so the numbers never depend on a sales brochure. Let's build it right!

A **photovoltaic (PV)** panel converts sunlight directly into direct-current electricity, and an **inverter** converts that to the alternating current a building uses. Chapter 16 covers renewable systems as part of electrical distribution, and Chapter 19 treats net-zero energy buildings. The technology has moved from a curiosity to a mainstream building component in two decades.

## The Physics That Does Not Change

A panel's output is set by the sunlight reaching it. Solar power at the ground on a clear day with the sun high is about 1,000 watts per square meter, and a panel turns a fraction of that into electricity. Annual energy follows from a simple chain:

\( E_{\text{year}} = P_{\text{array}} \times \text{peak sun hours} \times 365 \times \text{derate} \)

Here *peak sun hours* is the daily solar energy expressed as hours at 1,000 W/m², and the *derate* collects losses from wiring, the inverter, dirt, snow, and heat.

**Worked example: a 7 kW array in Minneapolis.** Assume an annual average of 4.3 peak sun hours and a derate of 0.80. These values are illustrative; use a tool such as NREL's PVWatts for a real site.

- Annual energy: \( 7 \times 4.3 \times 365 \times 0.80 \approx 8{,}800 \) kWh.
- Roof area at 21 percent module efficiency: \( 7 / 0.21 \approx 33 \text{ m}^2 \), or about 360 ft².

A typical US home uses roughly 10,000 kWh a year, so this array covers most of an efficient house. Cold helps a little, because panels make more power per sunbeam when they are cool. Snow, short winter days, and a low sun angle hurt in December, so most of the annual energy arrives from spring through fall. The [Net-Zero PV Balance Explorer](../sims/net-zero-pv-balance-explorer/index.md) lets you vary the array and the load.

Annual energy hides an important fact: the sun is far stronger in June than in December. The monthly peak sun hours below are illustrative values that average about 4.3 across the year. The MicroSim uses them to show when a 7 kW array makes more than a house needs and when it falls short.

#### Diagram: Rooftop PV Monthly Production Explorer

<details markdown="1">
<summary>Rooftop PV Monthly Production Explorer</summary>
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
</details>

## What Is Changing

- **Cost.** IRENA reports that the global average cost of electricity from solar PV fell by roughly 90 percent between 2010 and 2023.[^1] Hardware is now a smaller share of a rooftop job than labor, permitting, and financing.
- **Policy.** The 30 percent federal residential clean energy credit (Section 25D) ended for expenditures made after December 31, 2025 under the One Big Beautiful Bill Act, years ahead of its earlier schedule.[^2] Incentives for businesses, state and utility programs, and the rules for selling surplus power back to the grid all differ and keep changing.
- **Net metering.** Many utilities are replacing one-for-one credit for exported power with lower rates, which raises the value of using solar energy on site, including with batteries ([Appendix D](battery-storage.md)).
- **Modules and mounting.** Higher-efficiency cells, bifacial modules, building-integrated products, and rapid-shutdown electronics are changing what goes on a roof.
- **Roof readiness.** Roof condition, structural capacity, and fire-code setbacks now shape the design as much as the array itself. Chapters 6 and 13 supply the tools to check them.

!!! mascot-warning "Do Not Install Solar on a Roof Near the End of Its Life"
    ![Beau warning](../img/mascot/warning.png){ class="mascot-admonition-img" }
    Panels last decades, so a roof that needs replacement in five years means paying to remove and reinstall the array. Check the roof's remaining service life and its structure before you size the system.

## What to Watch

- Federal, state, and utility incentives, and the rules for exported power.
- Module price and efficiency trends, and the supply chains behind them.
- Electrical code changes for rapid shutdown, interconnection, and service capacity.
- Pairing solar with storage, heat pumps, and electric vehicle charging, which turns a building into a managed energy system.

## Connects To

- [Chapter 15: Electrical Fundamentals and Building Service](../chapters/15-electrical-fundamentals/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../chapters/16-electrical-distribution-design/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../chapters/19-energy-efficiency/index.md)
- [Net-Zero PV Balance Explorer](../sims/net-zero-pv-balance-explorer/index.md) and [Service Headroom for Solar and EV Loads](../sims/service-headroom-ev-pv-explorer/index.md) MicroSims

## Key Takeaways

- Annual solar energy is array size times peak sun hours times 365 times a derate for losses.
- A 7 kW array in Minneapolis produces on the order of 8,800 kWh a year on about 360 ft² of roof.
- Cost, incentives, and net-metering rules change quickly; the sunlight arriving on the roof does not.

## References

[^1]: pv magazine. *Global average solar LCOE stood at $0.044/kWh in 2023, says IRENA.* <https://www.pv-magazine.com/2024/09/27/global-average-solar-lcoe-stood-at-0-044-kwh-in-2023-says-irena/>
[^2]: GreenLancer. *Federal Solar Tax Credit 2026: What Ended, What Remains.* <https://www.greenlancer.com/post/solar-energy-tax-credit-2025> (check the current Internal Revenue Code and IRS guidance before relying on any credit).
