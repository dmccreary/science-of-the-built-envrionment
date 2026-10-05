---
title: "HRV Effectiveness and Frost Explorer"
description: "Students calculate the supply-air temperature and the ventilation heating load removed by a balanced heat recovery ventilator from its effectiveness, airflow, and the outdoor temperature, then find the outdoor temperatures at which the core would frost."
image: /sims/hrv-effectiveness-frost-explorer/hrv-effectiveness-frost-explorer.png
og:image: /sims/hrv-effectiveness-frost-explorer/hrv-effectiveness-frost-explorer.png
twitter:image: /sims/hrv-effectiveness-frost-explorer/hrv-effectiveness-frost-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply
---

# HRV Effectiveness and Frost Explorer

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the HRV Effectiveness and Frost Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/hrv-effectiveness-frost-explorer/main.html" width="100%" height="562" scrolling="no"></iframe>
```

## Description

Students calculate the supply-air temperature and the ventilation heating load removed by a balanced heat recovery ventilator from its effectiveness, airflow, and the outdoor temperature, then find the outdoor temperatures at which the core would frost.

This MicroSim belongs to [Appendix B: Heat Recovery Ventilation and Modern Heat Exchangers](../../appendices/heat-recovery-ventilation/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the conditions of challenge 1, then type the supply temperature and the load removed. Press Check.
2. Read the three-step calculation, then repeat the steps for challenge 2.
3. When the sliders unlock, change the outdoor temperature, effectiveness, and airflow and watch the supply temperature, both loads, and the frost indicator update.
4. Set effectiveness to 0.80 and lower the outdoor temperature in 5 F steps from 30 F. Then raise effectiveness to 0.90 and repeat.

## Lesson Plan

**Learning objective:** Calculate the supply-air temperature and the ventilation heating load removed by a balanced heat recovery ventilator, from its effectiveness, its airflow and the outdoor temperature, to within 1 F and 100 Btu/h.

**Bloom level:** Apply (calculate)

**Suggested activities**

- Two-step calculation (10 min): For three outdoor temperatures, compute the supply temperature and the load removed by hand, then check with the sim.
- Find the frost threshold (5 min): Use the formula in the readout to predict the outdoor temperature at which frost starts for effectiveness 0.70, then confirm it.
- Explain the trade (5 min): Explain why a more effective core needs defrost at a milder outdoor temperature.

**Assessment**

- Students compute the supply temperature for effectiveness 0.70 at 10 F outdoors and 70 F indoors.
- Students explain why recovery does not make supply air as warm as the room.

## References

- [Appendix B: Heat Recovery Ventilation and Modern Heat Exchangers](../../appendices/heat-recovery-ventilation/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Heat recovery ventilation (Wikipedia)](https://en.wikipedia.org/wiki/Heat_recovery_ventilation)

## Specification

The full specification below is extracted from
[Appendix B: Heat Recovery Ventilation and Modern Heat Exchangers](../../appendices/heat-recovery-ventilation/index.md).

```text
Type: microsim
**sim-id:** hrv-effectiveness-frost-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the supply-air temperature and the ventilation heating load removed by a balanced heat recovery ventilator, from its effectiveness, its airflow and the outdoor temperature, to within 1°F and 100 Btu/h.

**Prerequisites:** heat recovery ventilator, sensible effectiveness, cfm, the Q = 1.08 x cfm x ΔT rule, frost in the core (all defined in this appendix above the block).

**Evidence of Mastery:** In two challenges the learner types the supply temperature and the heating load removed before the sim reveals them. A supply temperature is correct within ±1°F and a load within ±100 Btu/h of the model value. Mastery is 4 of 4 numbers correct, with two attempts allowed per challenge. Changing quantities afterward is exploration, not evidence.

**Misconceptions:** (1) An HRV with effectiveness 0.80 recovers 80 percent of the air's volume rather than 80 percent of the temperature difference. (2) Recovery makes the supply air as warm as the room. (3) Frost is a problem at any outdoor temperature below freezing.

**Instructional Rationale:** Apply-level skill is built by carrying out the two-step calculation with the learner's own numbers. The frost indicator in exploration shows a consequence of the same formula that the learner has just used.

**Content:**

Indoor temperature is fixed at 70°F and flows are balanced (equal supply and exhaust airflow).

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Outdoor temperature | -20 | 60 | 5 | 0 | °F |
| Sensible effectiveness | 0.50 | 0.90 | 0.05 | 0.80 | none |
| Airflow | 50 | 200 | 25 | 100 | cfm |

Challenges, in this order:

| # | Outdoor (°F) | Effectiveness | Airflow (cfm) | Supply temperature (°F) | Load without HRV (Btu/h) | Load with HRV (Btu/h) | Load removed (Btu/h) |
|---|---|---|---|---|---|---|---|
| 1 | 0 | 0.80 | 100 | 56 | 7,560 | 1,512 | 6,048 |
| 2 | -10 | 0.60 | 150 | 38 | 12,960 | 5,184 | 7,776 |

Feedback when wrong: "Supply = outdoor + effectiveness x (indoor - outdoor). Load = 1.08 x cfm x (70 - supply temperature). Load removed = load without HRV minus load with HRV, which equals effectiveness x load without HRV."

**Provenance:** The formulas and challenge 1 come from this appendix. Challenge 2 is computed from the Rules. The 70°F indoor temperature and all ranges are illustrative.

**Rules:**

- Supply temperature = outdoor + effectiveness x (70 - outdoor).
- Exhaust temperature leaving the core = 70 - effectiveness x (70 - outdoor).
- Load without HRV = 1.08 x airflow x (70 - outdoor). Load with HRV = 1.08 x airflow x (70 - supply temperature). Load removed = difference.
- The frost indicator is on when the exhaust temperature leaving the core <= 32°F, which is when outdoor <= 70 - 38 / effectiveness. At effectiveness 0.80 that is 22.5°F.
- The frost indicator is a teaching model: real frost also needs moist exhaust air, and real units use defrost cycles.

**Learner Activity:**

1. The learner reads the conditions of challenge 1 and types the supply temperature and the load removed, then presses Check.
2. The sim reveals the model values with the three-line calculation, and the learner repeats the steps for challenge 2.
3. The adjustable quantities unlock. Changing any of them updates the supply temperature, both loads, and the frost indicator at once.
4. The learner sets effectiveness 0.80 and lowers the outdoor temperature in 5°F steps from 30°F, and should notice that the frost indicator turns on between 25°F and 20°F.
5. The learner raises the effectiveness to 0.90 and should notice that the frost indicator turns on at a higher outdoor temperature, so the more effective unit needs defrost sooner.

**Feedback:** Two challenges, fixed order, two attempts each. Correct: "Correct: supply <value>°F, load removed <value> Btu/h." Incorrect: the feedback text above. After a second wrong attempt the model values are shown and the challenge counts as missed.

**Starting State:** Challenge 1 is shown with two empty answer boxes under the question "On a 0°F day, how warm is the air this HRV delivers, and how much heating does it save?"

**Chapter Anchors:** An HRV with effectiveness 0.80 at 0°F outdoors and 70°F indoors supplies 56°F air. A 100 cfm stream needs 7,560 Btu/h without recovery and 1,512 Btu/h with it, removing about 6,000 Btu/h. Exhaust air at 14°F leaves the core in that case.
```

## Related Resources

- [Appendix B: Heat Recovery Ventilation and Modern Heat Exchangers](../../appendices/heat-recovery-ventilation/index.md)
