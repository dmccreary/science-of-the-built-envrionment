---
title: "Classroom CO2 Ventilation Balance Explorer"
description: "Students calculate the steady-state carbon dioxide level in a classroom from the number of occupants and the outdoor airflow, find the airflow that holds a target, and see why a sensor next to a supply grille can hide a problem."
image: /sims/co2-ventilation-balance-explorer/co2-ventilation-balance-explorer.png
og:image: /sims/co2-ventilation-balance-explorer/co2-ventilation-balance-explorer.png
twitter:image: /sims/co2-ventilation-balance-explorer/co2-ventilation-balance-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply
---

# Classroom CO2 Ventilation Balance Explorer

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the Classroom CO2 Ventilation Balance Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/co2-ventilation-balance-explorer/main.html" width="100%" height="562" scrolling="no"></iframe>
```

## Description

Students calculate the steady-state carbon dioxide level in a classroom from the number of occupants and the outdoor airflow, find the airflow that holds a target, and see why a sensor next to a supply grille can hide a problem.

This MicroSim belongs to [Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the setting of challenge 1 and type the level where the carbon dioxide will settle, in ppm. Press Check.
2. After each answer the graph plays the concentration rising from 420 ppm and settling at the steady level.
3. In challenge 3, set the airflow slider to the smallest allowed airflow that holds 1,000 ppm. In challenge 4, decide whether the controller sees a problem.
4. When the controls unlock, change occupants, airflow, and sensor location and watch the steady level, the curve, and the sensor reading.

## Lesson Plan

**Learning objective:** Calculate the steady-state carbon dioxide concentration in a room from the number of occupants and the outdoor airflow, to within 25 ppm, and the airflow needed to hold a target.

**Bloom level:** Apply (calculate)

**Suggested activities**

- Predict and calculate (10 min): For each challenge compute the answer by hand before pressing Check.
- Halve the air (5 min): Reduce the airflow from 450 cfm to 250 cfm and record the steady level and the time to settle.
- Where is the sensor? (10 min): Compare the three sensor locations at 300 cfm and explain which reading a controller should trust.

**Assessment**

- Students compute the steady level for 20 occupants at 400 cfm.
- Students explain why a reading of 2,000 ppm means the ventilation is less than half of what was wanted.

## References

- [Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Demand controlled ventilation (Wikipedia)](https://en.wikipedia.org/wiki/Demand_controlled_ventilation)

## Specification

The full specification below is extracted from
[Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md).

```text
Type: microsim
**sim-id:** co2-ventilation-balance-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the steady-state carbon dioxide concentration in a room from the number of occupants and the outdoor airflow, to within 25 ppm, and the airflow needed to hold a target.

**Prerequisites:** ppm, cfm, steady state, demand-controlled ventilation, the carbon dioxide generation rate of a resting adult (all defined in this appendix above the block).

**Evidence of Mastery:** In four challenges the learner commits an answer before the sim reveals it. Challenges 1 and 2 ask for a concentration in ppm, correct within ±25 ppm. Challenge 3 asks for the smallest airflow in the allowed list that keeps the room at <= 1,000 ppm. Challenge 4 asks whether a controller with a 1,000 ppm setpoint would see a problem through a sensor near the supply grille, correct when it answers yes or no matching the table. Mastery is 4 of 4 correct, with two attempts on each. Changing settings afterward is exploration, not evidence.

**Misconceptions:** (1) Carbon dioxide level depends on room size only. (2) A sensor anywhere in the room shows the same reading. (3) Halving the airflow doubles the rise above outdoor carbon dioxide, so it cannot matter much below 1,000 ppm.

**Instructional Rationale:** Apply-level skill is built by computing the balance for chosen numbers. The sensor-placement challenge shows that a reading is a measurement of one spot and not the truth about the room, which the appendix warns about.

**Content:**

The room is a classroom of 7,200 ft³ (30 ft by 24 ft by 10 ft). The room starts empty at the outdoor level of 420 ppm. Each resting adult generates 0.0106 cfm of carbon dioxide.

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Occupants | 5 | 40 | 5 | 25 | people |
| Outdoor airflow | 50 | 800 | 50 | 450 | cfm |

Sensor location choice (illustrative): "In the breathing zone" reads 100 percent of the rise above outdoor, "Near the supply grille" reads 60 percent, "In a stagnant corner" reads 120 percent. Default: in the breathing zone.

Challenges, in this order:

| # | Setting | Correct answer | Why (shown as feedback) |
|---|---|---|---|
| 1 | 25 people, 450 cfm | 1,009 ppm | Generation is 25 x 0.0106 = 0.265 cfm. Rise = 0.265 x 1,000,000 / 450 = 589 ppm. Steady level = 420 + 589 = 1,009 ppm. |
| 2 | 25 people, 150 cfm | 2,187 ppm | Rise = 0.265 x 1,000,000 / 150 = 1,767 ppm, so the level is 420 + 1,767 = 2,187 ppm. One third of the air gives three times the rise. |
| 3 | 30 people, target <= 1,000 ppm, airflow choices in steps of 50 cfm | 550 cfm | Needed airflow = 30 x 0.0106 x 1,000,000 / (1,000 - 420) = 548 cfm. The smallest step that is >= 548 is 550 cfm (500 cfm would give 1,056 ppm). |
| 4 | 25 people, 300 cfm, sensor near the supply grille, setpoint 1,000 ppm | No, the controller sees no problem | The breathing zone reaches 420 + 883 = 1,303 ppm, but the sensor reads only 420 + 0.60 x 883 = 950 ppm, which is below the setpoint, so the airflow is not raised. |

**Provenance:** The 420 ppm outdoor level, the 0.0106 cfm per person, the 18 cfm per person result and the 1,000 ppm example come from this appendix. The room size, the allowed ranges and the sensor-location percentages are illustrative, and the sim must label the sensor percentages "illustrative".

**Rules:**

- Steady-state concentration = 420 + occupants x 0.0106 x 1,000,000 / airflow, in ppm.
- Concentration over time after the room fills = steady level - (steady level - 420) x e^(-(airflow / 7,200) x t), with t in minutes. The time constant is 7,200 / airflow minutes, which is 16 minutes at the default.
- Sensor reading = 420 + sensor fraction x (concentration - 420).
- Required airflow for a target concentration C is occupants x 0.0106 x 1,000,000 / (C - 420), for C > 420.
- The sim shows the concentration rising from 420 ppm and settling at the steady level, and marks the time at which the level is within 5 percent of the rise, which is 3 time constants.

**Learner Activity:**

1. The learner reads the setting of a challenge and types a concentration, an airflow, or yes or no.
2. The learner presses Check. The sim reveals the answer and the Why text, then plays the concentration rising over time for that setting.
3. After the four challenges the learner changes occupants, airflow and sensor location. The steady level, the curve, and the sensor reading update at once.
4. The learner halves the airflow from 450 cfm to 250 cfm and should notice that the steady level rises from 1,009 ppm to about 1,480 ppm, and the time to settle rises with it.
5. The learner changes the sensor location and should notice that the reading differs from the breathing-zone concentration.

**Feedback:** Four challenges, fixed order, two attempts each. Correct: "Correct: <answer>." Incorrect on the first attempt: the Why text without the answer. After a second wrong attempt the answer and the Why text are shown, and the challenge counts as missed. A running count "Challenges correct: n of 4" is shown.

**Starting State:** The classroom is shown empty with the carbon dioxide at 420 ppm, and challenge 1 asks "Twenty-five students and 450 cfm of fresh air: where will the carbon dioxide settle?"

**Chapter Anchors:** At 1,000 ppm indoors and 420 ppm outdoors, a resting adult needs about 18 cfm of outdoor air. A reading of 2,000 ppm means ventilation is less than half of what was wanted. A sensor next to a supply grille reads low.
```

## Related Resources

- [Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md)
