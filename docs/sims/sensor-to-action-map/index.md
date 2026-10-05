---
title: "Sensor-to-Action Map"
description: "Students match six building inputs, five sensors and one utility price signal, to the control action each should drive, see each link marked correct or incorrect with the reason, and then open any node to read what it measures and what its action does."
image: /sims/sensor-to-action-map/sensor-to-action-map.png
og:image: /sims/sensor-to-action-map/sensor-to-action-map.png
twitter:image: /sims/sensor-to-action-map/sensor-to-action-map.png
social:
   cards: false
status: built
library: vis-network
bloom_level: Understand
---

# Sensor-to-Action Map

<iframe src="main.html" width="100%" height="647" scrolling="no"></iframe>

[Run the Sensor-to-Action Map MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/sensor-to-action-map/main.html" width="100%" height="647" scrolling="no"></iframe>
```

## Description

Students match six building inputs, five sensors and one utility price signal, to the control action each should drive, see each link marked correct or incorrect with the reason, and then open any node to read what it measures and what its action does.

This MicroSim belongs to [Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the highlighted input. Click one of the six actions on the right (or use the menu), then press Confirm choice.
2. Read whether the link is correct and why. If it is incorrect, the correct action is named. Press Next input.
3. After the sixth input all six correct links are drawn and the final score appears.
4. Click any node to read what the input measures or signals and what the action does.

## Lesson Plan

**Learning objective:** Classify each of six building inputs by the control action it should drive, matching each input to one of six actions.

**Bloom level:** Understand (classify)

**Suggested activities**

- Match (10 min): Complete the six matches without opening any node information.
- Explain each link (10 min): For every link, write one sentence that starts with "The controller needs to know..." and ends with the action.
- Extend the map (10 min): Propose a seventh input and the action it should drive, and give the reason.

**Assessment**

- Students name the action driven by the outdoor temperature sensor and say which appendix explains it.
- Students explain why the utility price signal is not a sensor but still drives a control action.

## References

- [Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [Building automation (Wikipedia)](https://en.wikipedia.org/wiki/Building_automation)

## Specification

The full specification below is extracted from
[Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md).

```text
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
```

## Related Resources

- [Appendix F: Smart Sensors and Building Automation](../../appendices/smart-sensors-building-automation/index.md)
