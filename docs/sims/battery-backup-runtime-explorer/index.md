---
title: "Battery Backup Run-Time Explorer"
description: "Students calculate how long a 13.5 kWh home battery carries a chosen set of loads, discover that a load above the inverter rating trips the system however much energy remains, and then explore battery size, inverter size, and large loads such as a vehicle charger."
image: /sims/battery-backup-runtime-explorer/battery-backup-runtime-explorer.png
og:image: /sims/battery-backup-runtime-explorer/battery-backup-runtime-explorer.png
twitter:image: /sims/battery-backup-runtime-explorer/battery-backup-runtime-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply
---

# Battery Backup Run-Time Explorer

<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>

[Run the Battery Backup Run-Time Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/battery-backup-runtime-explorer/main.html" width="100%" height="592" scrolling="no"></iframe>
```

## Description

Students calculate how long a 13.5 kWh home battery carries a chosen set of loads, discover that a load above the inverter rating trips the system however much energy remains, and then explore battery size, inverter size, and large loads such as a vehicle charger.

This MicroSim belongs to [Appendix D: Battery Storage and Grid-Interactive Buildings](../../appendices/battery-storage/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the loads for challenge 1, add them up in kilowatts, and type the run time in hours. Press Check.
2. Read the power bar (load against the inverter rating) and the time bar, then continue through challenge 2 (add a heat pump) and challenge 3 (add a water heater).
3. In challenge 3 decide whether the 5 kW inverter trips, set the smallest inverter that carries the load, and type the run time with it.
4. After the three challenges, turn loads on and off and change the battery energy and the inverter rating. Add the vehicle charger and find the smallest inverter that carries it.

## Lesson Plan

**Learning objective:** Calculate the backup run time of a home battery for a chosen set of loads, and decide whether the total load exceeds the inverter's power rating, to within 0.1 hour.

**Bloom level:** Apply (calculate)

**Suggested activities**

- Predict and calculate (10 min): Before pressing Check, write down the total load and the run time. Compare with the sim.
- Energy versus power (10 min): With the five critical loads, raise the battery to 40 kWh. Then add the water heater and raise it again. Explain why the run time changes in one case and the trip does not change in the other.
- Size an inverter (5 min): With every load on except the vehicle charger, find the smallest inverter that does not trip.

**Assessment**

- Students state the run time of a 13.5 kWh battery carrying a 3.2 kW load, and show the division.
- Students explain in two sentences why a larger battery cannot fix a tripped inverter.

## References

- [Appendix D: Battery Storage and Grid-Interactive Buildings](../../appendices/battery-storage/index.md)
- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [Grid energy storage (Wikipedia)](https://en.wikipedia.org/wiki/Grid_energy_storage)

## Specification

The full specification below is extracted from
[Appendix D: Battery Storage and Grid-Interactive Buildings](../../appendices/battery-storage/index.md).

```text
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
```

## Related Resources

- [Appendix D: Battery Storage and Grid-Interactive Buildings](../../appendices/battery-storage/index.md)
