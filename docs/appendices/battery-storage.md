---
title: "Appendix D: Battery Storage and Grid-Interactive Buildings"
description: "How falling battery prices and lithium iron phosphate chemistry are putting battery walls in homes and buildings, and how to size one by energy and power."
last_reviewed: 2026-10-05
rate_of_change: very high
---

# Appendix D: Battery Storage and Grid-Interactive Buildings

!!! mascot-welcome "A Wall That Stores Sunshine"
    ![Beau waving welcome](../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A battery on a garage wall can keep the refrigerator running through an outage and shift cheap energy to expensive hours. Batteries are changing faster than almost anything else in the building, so we will learn the sizing rules that outlast any one product. Let's build it right!

A **battery energy storage system (BESS)** is a bank of rechargeable cells, an inverter that converts between direct and alternating current, and the controls and safety hardware that tie them together. Residential units are often wall-mounted "battery walls" in a garage or utility room. Chapter 16 covers building electrical distribution; storage adds a new source that can supply a building when the grid cannot.

## The Physics That Does Not Change

Two numbers describe a battery system, and confusing them is the most common mistake. **Energy capacity**, in kilowatt-hours (kWh), is how much the battery can store. **Power rating**, in kilowatts (kW), is how fast the inverter can deliver it. Run time is energy divided by the load:

\( \text{run time} = \dfrac{\text{usable energy}}{\text{average load}} \)

**Worked example: backup during an outage.** Take a battery with 13.5 kWh of usable energy and a power rating of 5 kW.

| Loads on backup | Average load | Run time |
|---|---|---|
| Refrigerator, furnace blower, sump pump, lights, internet, and chargers | 1.2 kW | \( 13.5 / 1.2 \approx 11 \) hours |
| The same loads plus a 2 kW heat pump | 3.2 kW | \( 13.5 / 3.2 \approx 4 \) hours |

If the combined loads ever exceed 5 kW, the inverter trips regardless of how much energy remains. A solar array that keeps recharging the battery during the day extends these times, which is what makes the pairing in [Appendix C](solar-photovoltaics.md) valuable in a long outage.

Batteries are not perfectly efficient. A round-trip efficiency near 90 percent means that for every 10 kWh stored, about 9 kWh come back out, and the difference becomes heat.

The next MicroSim lets you choose which loads stay on during an outage and find out whether the battery can carry them, and for how long.

#### Diagram: Battery Backup Run-Time Explorer

<details markdown="1">
<summary>Battery Backup Run-Time Explorer</summary>
Type: microsim
**sim-id:** battery-backup-runtime-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the backup run time of a home battery for a chosen set of loads, and decide whether the total load exceeds the inverter's power rating, to within 0.1 hour.

**Prerequisites:** energy capacity (kWh), power rating (kW), inverter, average load (all defined in this appendix above the block).

**Evidence of Mastery:** In three challenges the learner types a run time before the sim reveals it. A run time is correct within ±0.1 h of the model value. In challenge 3 the learner also states whether the inverter trips and picks the smallest sufficient inverter size. Mastery is 3 of 3 correct, with two attempts on each. Changing the loads afterward is exploration, not evidence.

**Misconceptions:** (1) A larger battery can run any load. (2) Energy (kWh) and power (kW) are the same limit. (3) Run time depends only on the battery and not on what is turned on.

**Instructional Rationale:** Apply-level skill is built by computing run time for specific loads. The tripped-inverter case in challenge 3 makes the difference between energy and power something the learner discovers, because adding one large load changes the result from hours of run time to none.

**Content:**

Critical loads (average watts while the load is on):

| Load | Average power (W) |
|---|---|
| Refrigerator | 150 |
| Furnace blower | 500 |
| Sump pump | 300 |
| LED lights | 150 |
| Internet and chargers | 100 |

The five critical loads together draw 1,200 W. Optional large loads: heat pump 2,000 W, electric water heater 4,500 W, vehicle charger 7,200 W.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Usable battery energy | 5 | 40 | 0.5 | 13.5 | kWh |
| Inverter power rating | 3 | 15 | 1 | 5 | kW |

Challenges, in this order (battery 13.5 kWh, inverter 5 kW unless stated):

| # | Loads on | Total (kW) | Correct answer | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | The five critical loads | 1.2 | 11.25 h (11 h 15 min) | Run time = 13.5 kWh / 1.2 kW = 11.25 h. |
| 2 | Critical loads plus heat pump | 3.2 | 4.2 h | Run time = 13.5 / 3.2 = 4.2 h. The heat pump more than doubles the load, so the run time falls by more than half. |
| 3 | Critical loads plus electric water heater | 5.7 | The inverter trips. A 6 kW inverter carries it, for 2.4 h | 5.7 kW exceeds the 5 kW rating, so the system shuts down even though the battery is full. The smallest inverter in range that is >= 5.7 kW is 6 kW, and 13.5 / 5.7 = 2.4 h. |

**Provenance:** The 13.5 kWh, 5 kW, 1.2 kW and 3.2 kW values come from this appendix. The individual load wattages are illustrative averages chosen so the critical loads total 1,200 W, and the sim must label them "illustrative".

**Rules:**

- Total load = the sum of the selected loads.
- If total load <= inverter rating, run time (h) = usable energy / total load. If total load > inverter rating, the inverter trips and run time is 0 h.
- Usable energy is the energy available after round-trip losses. The sim does not model losses separately.
- Run time is shown in hours with one decimal place, and also as hours and minutes.
- If no load is selected the sim shows "Select at least one load."

**Learner Activity:**

1. The learner reads the loads for a challenge and types the run time in hours.
2. The learner presses Check. The sim shows the total load, whether it is within the inverter rating, and the run time.
3. In challenge 3 the learner chooses an inverter rating, and the sim recomputes the run time for that rating.
4. After the challenges the learner turns individual loads on and off and changes the battery energy and the inverter rating. The total load, the trip state and the run time update at once.
5. The learner adds the vehicle charger and should notice that the total of 8.4 kW trips the 5 kW default, and that a 9 kW inverter is the smallest that carries it.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <value>." Incorrect: the Why text for that challenge. After a second wrong attempt the value and the Why text are shown, and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** Challenge 1 is shown with the five critical loads turned on and an empty answer box under the question "A storm cuts the grid. How long will the battery carry these loads?"

**Chapter Anchors:** A battery with 13.5 kWh of usable energy and a 5 kW power rating. Critical loads of 1.2 kW give about 11 hours. Adding a 2 kW heat pump gives 3.2 kW and about 4 hours. A load above the inverter rating stops the system however much energy remains.
</details>

## What Is Changing

- **Price.** BloombergNEF's 2025 survey put the global average lithium-ion pack price at $108 per kWh, down 8 percent in a year, with stationary storage packs the cheapest segment at about $70 per kWh.[^1] A pack is only part of an installed home system; the inverter, labor, permitting, and margin add substantially to the total.
- **Chemistry.** Lithium iron phosphate (LFP) cells, which have a lower fire-propagation risk than some earlier lithium-ion chemistries, now supply a large and growing share of storage and averaged $81 per kWh across segments in 2025.[^1]
- **Safety standards.** Installation rules such as NFPA 855 and Article 706 of the National Electrical Code govern where batteries can go, how much energy can be stored in one place, and how they are separated from living space. These documents are revised in each code cycle.
- **Grid interaction.** Utilities and aggregators pay owners to discharge batteries at times of peak demand, and time-of-use rates reward charging at cheap hours and discharging at expensive ones.
- **Vehicles as batteries.** Electric vehicles carry far larger batteries than a wall unit, and equipment that lets a vehicle power a building or feed the grid is emerging.

!!! mascot-tip "Size to the Critical Loads, Not the Whole House"
    ![Beau giving a tip](../img/mascot/tip.png){ class="mascot-admonition-img" }
    List what must keep running in an outage, add up the watts, and wire those circuits to a separate backed-up panel. A smaller battery on a few circuits often outperforms a larger one that tries to carry everything.

## What to Watch

- Pack and installed-system prices, and the supply chains for cells.
- Fire-safety codes and the way local officials interpret siting rules for garages and living spaces.
- Utility programs and rate structures that determine whether a battery earns money or only provides backup.
- Interconnection rules and standards for vehicle-to-home equipment.

## Connects To

- [Chapter 15: Electrical Fundamentals and Building Service](../chapters/15-electrical-fundamentals/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../chapters/16-electrical-distribution-design/index.md)
- [Chapter 18: Fire Protection and Life Safety Requirements](../chapters/18-fire-life-safety/index.md)
- [Service Headroom for Solar and EV Loads](../sims/service-headroom-ev-pv-explorer/index.md) MicroSim

## Key Takeaways

- Energy in kWh sets how long a battery lasts; power in kW sets how much it can run at once.
- Run time is usable energy divided by average load, and efficiency losses show up as heat.
- Prices, chemistries, rate structures, and safety rules are changing quickly; the arithmetic of energy and power is not.

## References

[^1]: pv magazine. *Global lithium-ion battery pack prices fall to $108/kWh, says BNEF.* <https://www.pv-magazine.com/2025/12/09/global-lithium-ion-battery-pack-prices-fall-to-108-kwh-says-bnef/>
