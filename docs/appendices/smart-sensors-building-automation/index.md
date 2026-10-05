---
title: "Appendix F: Smart Sensors and Building Automation"
description: "How low-cost sensors, connected controls, and analytics are turning buildings into measured systems, with a worked example of carbon dioxide-based ventilation control."
generated_by: claude skill chapter-content-generator
date: 2026-10-05 08:31:02
version: 1.11
last_reviewed: 2026-10-05
rate_of_change: very high
---

# Appendix F: Smart Sensors and Building Automation

## Summary

How low-cost sensors, connected controls, and analytics are turning buildings into measured systems, with a worked example of carbon dioxide-based ventilation control. After completing this appendix, students will be able to define, explain, and apply the 13 concepts listed below.

## Concepts Covered

This appendix covers the following 13 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Building Sensors | 11 |
| Control Loop | 3 |
| Carbon Dioxide Monitoring | 2 |
| Fault Detection and Diagnostics | 2 |
| Building Communication Protocols | 2 |
| Sensor Calibration and Placement | 1 |
| Demand-Controlled Ventilation | 1 |
| Water Leak Detection | 1 |
| Occupancy Sensing | 1 |
| Energy Submetering | 1 |
| Building Cybersecurity and Privacy | 1 |
| Digital Twin | 1 |
| Continuous Commissioning | 1 |

## Prerequisites

This appendix builds on concepts from these parts of the book:

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md): Commissioning
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md): Indoor Air Quality, Ventilation
- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md): Electrical Energy
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md): Building Automation, Building Information Modeling, Data and Communications, Lighting Controls
- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md): Water Intrusion

---

!!! mascot-welcome "A Building That Tells You How It Feels"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Sensors the size of a coin can now report temperature, humidity, air quality, water leaks, and energy use all day long. This appendix shows how to use those numbers and how to know when to doubt them. Let's build it right!

For most of history a building's performance was a mystery after the ribbon cutting. Inexpensive sensors, wireless communication, and cloud software have changed that. A **building automation system (BAS)** is the network of sensors, controllers, and software that runs a building's mechanical and lighting systems. Smaller buildings and homes now have a lighter version of the same thing in smart thermostats, leak detectors, and energy monitors.

## What Is Being Measured

- **Temperature and humidity.** The basis of comfort control and a guard against condensation (Chapter 4).
- **Carbon dioxide.** A proxy for how much of a room's air is exhaled breath, and therefore for the ventilation rate per person.
- **Particulates and volatile compounds.** Indicators of cooking, smoke, and off-gassing from materials.
- **Water.** Leak detectors at water heaters, under sinks, and at the main shutoff catch the failures described in Chapter 21 before they become disasters.
- **Occupancy.** Presence sensors dim lights and set back conditioning in empty rooms.
- **Energy and power.** Submeters on circuits and equipment show where energy goes, which is the first step in reducing it.

## From Measurement to Action

A sensor by itself only reports. In a **building automation system**, each sensor feeds a **controller**, a small computer that compares the reading with a **setpoint**, the value the building should hold, and then commands an **actuator**, a device that does something, such as a damper motor, a valve, a compressor, or a light dimmer. A controller can also take a non-sensor input, such as a utility price signal. The next MicroSim asks you to decide which action each input should drive.

#### Diagram: Sensor-to-Action Map

<iframe src="../../sims/sensor-to-action-map/main.html" width="100%" height="647px" scrolling="no"></iframe>

[Run the Sensor-to-Action Map MicroSim fullscreen](../../sims/sensor-to-action-map/main.html){ .md-button }

<details markdown="1">
<summary>Sensor-to-Action Map</summary>
Type: graph-model
**sim-id:** sensor-to-action-map<br/>
**Library:** vis-network<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** classify<br/>
**Learning Objective:** The learner will classify each of six building inputs by the control action it should drive, matching each input to one of six actions.

**Prerequisites:** sensor, controller, setpoint, actuator (all defined in the section "From Measurement to Action" above this block).

**Evidence of Mastery:** For each of 6 inputs the learner commits to one of the 6 actions. A choice is correct when it matches the Correct action column in Content, and each action is correct for exactly one input. Mastery is 5 of 6 correct. Opening node information is exploration, not evidence.

**Misconceptions:** (1) Any sensor can drive any control. (2) A leak sensor should only send an alert. (3) The outdoor temperature sensor is only for the thermostat display.

**Instructional Rationale:** Classifying inputs by the action they drive makes the learner connect what a sensor measures to what the building can do about it, which is the point of automation. Committing each match before the link is drawn gives the learner something to be right or wrong about.

**Content:**

Inputs, with the one action each should drive:

| # | Input | Correct action | Why (shown as feedback) |
|---|---|---|---|
| 1 | Room carbon dioxide sensor | Ventilation airflow | Carbon dioxide tracks the ventilation rate per person, so the controller raises or lowers outdoor air to hold the setpoint. |
| 2 | Room temperature sensor | Heat pump compressor speed | The controller compares room temperature with the setpoint and speeds up or slows down the compressor to close the gap. |
| 3 | Water leak sensor | Main water shutoff valve | Closing the valve at once limits the damage that a leak causes. |
| 4 | Occupancy sensor | Lighting and temperature setback | Empty rooms do not need full lighting or comfort conditions, so the controller dims lights and relaxes the setpoint. |
| 5 | Outdoor temperature sensor | Heat recovery ventilator defrost mode | Below the frost threshold the controller starts the defrost strategy described in Appendix B. |
| 6 | Utility time-of-use price signal | Battery charge and discharge | The controller charges the battery when energy is cheap and discharges it when energy is expensive. |

The six actions to choose from are the six values in the Correct action column. One of the six inputs, the utility price signal, is not a sensor, and the sim must say so when it is shown.

Each node's information panel gives one sentence stating what the input measures or signals and one sentence stating what the action does. Edge meanings are given in the node panels, not on clicking the edges.

**Provenance:** The inputs and actions follow the sensors and controls described in this appendix and in Appendices B and D. The wording is original to this book.

**Rules:** Each action is used by exactly one input. A learner cannot assign two inputs to the same action. After a choice is committed it cannot be changed.

**Learner Activity:**

1. The learner sees six input nodes on one side and six action nodes on the other, with no links between them.
2. The learner selects an input, and chooses one of the six actions for it.
3. The sim draws the link, marks it correct or incorrect, and shows the Why text.
4. After the sixth input all six correct links are drawn, and the learner can open any node's information.
5. The learner should notice that every action is driven by a measurement or signal that tells the controller whether the building needs it.

**Feedback:** Six inputs in fixed order, one attempt each. Correct: "Correct:" followed by the Why text. Incorrect: "Not quite:" followed by the Why text and the correct action. A running count "n of 6" is shown, and the final score appears after the sixth input.

**Starting State:** Six unlinked input nodes and six unlinked action nodes under the question "Which action should each input drive?"

**Chapter Anchors:** Appendix F names carbon dioxide, temperature, water leaks, occupancy and energy as measured quantities. Appendix B gives the frost indicator for heat recovery ventilators, and Appendix D describes time-of-use rates that reward charging at cheap hours.
</details>

## The Physics That Does Not Change

A sensor reports what is happening at one point, and the building's response still obeys the laws of mass and energy balance. Carbon dioxide control shows both sides.

**Worked example: how much ventilation does 1,000 ppm imply?** A resting adult exhales carbon dioxide at about 0.0106 cfm. Outdoor air carries about 420 ppm. At steady state, the airflow needed to hold the room at 1,000 ppm is the generation rate divided by the concentration rise:

\( \text{cfm per person} = \dfrac{0.0106 \times 10^{6}}{1000 - 420} \approx 18 \)

About 18 cfm of outdoor air per person. This is why a classroom sensor reading of 2,000 ppm tells you the ventilation is less than half of what you wanted, and why **demand-controlled ventilation** can reduce the air, and the heating or cooling energy it carries, in a room that is only half full. The outdoor-air heating cost of that air is what the [Heating Load and Ventilation Explorer](../../sims/hvac-heating-load-ventilation-explorer/index.md) lets you vary.

The next MicroSim lets you set the occupants and the ventilation airflow for a classroom, predict where the carbon dioxide will settle, and then see how long it takes and what a badly placed sensor reads.

#### Diagram: Classroom CO2 Ventilation Balance Explorer

<iframe src="../../sims/co2-ventilation-balance-explorer/main.html" width="100%" height="562px" scrolling="no"></iframe>

[Run the Classroom CO2 Ventilation Balance Explorer MicroSim fullscreen](../../sims/co2-ventilation-balance-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Classroom CO2 Ventilation Balance Explorer</summary>
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
</details>

## What Is Changing

- **Cost and connectivity.** Sensors and radios are cheap enough to place in every room, and common protocols such as BACnet and Matter are making equipment from different makers work together.
- **Analytics.** Software compares sensor data with expectations to detect faults, such as a stuck damper or a simultaneous heating and cooling, and recommends fixes. This is sometimes called continuous commissioning, extending the commissioning in Chapter 2 beyond the day of handover.
- **Grid response.** Controls can preheat, precool, or delay loads in response to utility signals, which links this appendix to [Appendix D](../battery-storage/index.md).
- **Digital twins.** A **digital twin** is a software model of a building that is updated with live sensor data, so designers and operators can test a change on the model before making it in the building.
- **Machine learning and AI agents.** Software that learns occupant patterns and adjusts setpoints is moving from research into products.

!!! mascot-warning "A Reading Is Not the Truth"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Sensors drift, sit in bad locations, and fail quietly, and a carbon dioxide sensor next to a supply grille will read low. Check new sensors against a reference, verify placement, and recalibrate on a schedule so that the controls respond to the room and not to an error.

## Privacy and Security

Occupancy sensors, cameras, and connected equipment collect information about people, and networked controls can be attacked. Good practice limits what is collected, keeps building networks separate from other networks, and updates equipment software. These issues are as much a part of building design now as fire separation.

## What to Watch

- Interoperability standards and the products that adopt them.
- Code and standards language on ventilation control, metering, and fault detection.
- Guidance on indoor air quality targets, which affects how sensor data is interpreted.
- Cybersecurity and privacy rules for connected buildings.

## Connects To

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md) (commissioning)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)

## Key Takeaways

- Sensors measure; the building still obeys mass and energy balance, so you need to interpret the data.
- Steady-state carbon dioxide control follows from a simple balance: at 1,000 ppm, about 18 cfm of outdoor air per person.
- Sensors, protocols, analytics, and AI tools are changing quickly; the need to calibrate, place, and protect them is not.
