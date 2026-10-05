---
title: "Appendix B: Heat Recovery Ventilation and Modern Heat Exchangers"
description: "How heat recovery and energy recovery ventilators let tight buildings breathe without throwing away their heat, and how heat-exchanger design keeps improving."
generated_by: claude skill chapter-content-generator
date: 2026-10-05 08:30:52
version: 1.11
last_reviewed: 2026-10-05
rate_of_change: high
---

# Appendix B: Heat Recovery Ventilation and Modern Heat Exchangers

## Summary

How heat recovery and energy recovery ventilators let tight buildings breathe without throwing away their heat, and how heat-exchanger design keeps improving. After completing this appendix, students will be able to define, explain, and apply the 3 concepts listed below.

## Concepts Covered

This appendix covers the following 3 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Heat Recovery Effectiveness | 2 |
| Energy Recovery Ventilator | 1 |
| Heat Exchanger Frost and Defrost | 1 |

## Prerequisites

This appendix builds on concepts from these parts of the book:

- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md): Condensation, Humidity
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md): Heat Recovery Ventilator

---

!!! mascot-welcome "Breathe Fresh Air Without Paying for It Twice"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Tight buildings need fresh air, and in a Minnesota January that air arrives cold. A heat exchanger lets the outgoing air hand its warmth to the incoming air, so you ventilate without heating the outdoors. Let's build it right!

Chapter 12 shows how air sealing closes the leaks that once supplied fresh air by accident, and Chapter 19 explains that a Passive House enclosure is so tight that mechanical ventilation is essential, ideally with heat or energy recovery. Chapter 4 covers the moisture and air-movement background. A **heat recovery ventilator (HRV)** is a fan-driven box with two airstreams, stale indoor air going out and fresh outdoor air coming in, passing on opposite sides of a thin barrier called the *core*. The barrier lets heat cross but keeps the air from mixing. An **energy recovery ventilator (ERV)** also transfers moisture.

## The Physics That Does Not Change

Heat always flows from the warmer airstream to the cooler one, and the amount depends on the temperature difference, the surface area, and the time the air spends in the core. The performance of the exchanger is summarized by its **sensible effectiveness**:

\( \varepsilon = \dfrac{T_{\text{supply}} - T_{\text{outdoor}}}{T_{\text{indoor}} - T_{\text{outdoor}}} \)

The energy needed to heat an airstream follows the familiar rule of thumb \( Q = 1.08 \times \text{cfm} \times \Delta T \) in Btu per hour, where cfm is the airflow in cubic feet per minute.

**Worked example: a winter day at 0°F.** A home needs 100 cfm of ventilation air. The indoor temperature is 70°F and the HRV has an effectiveness of 0.80.

| | Supply air temperature | Heating needed |
|---|---|---|
| No heat recovery | 0°F | \( 1.08 \times 100 \times 70 = 7{,}560 \) Btu/h |
| HRV, \( \varepsilon = 0.80 \) | \( 0 + 0.80 \times 70 = 56 \)°F | \( 1.08 \times 100 \times 14 = 1{,}512 \) Btu/h |

The HRV removes about 6,000 Btu/h of heating load from a single 100 cfm airstream, which is 80 percent of it, exactly what the effectiveness promises. Over a Minnesota heating season, that is a large share of the energy a tight house would otherwise spend warming its own fresh air.

A balanced unit moves the same airflow in both directions, so the exhaust air leaves the core as much colder than the indoor air as the supply air is warmer than the outdoor air. The temperature of the exhaust air leaving the core is

\( T_{\text{exhaust out}} = T_{\text{indoor}} - \varepsilon \,(T_{\text{indoor}} - T_{\text{outdoor}}) \)

At 0°F outdoors and \( \varepsilon = 0.80 \) this is \( 70 - 0.80 \times 70 = 14 \)°F. Exhaust air carries moisture from cooking, bathing, and breathing, and when it is cooled below 32°F inside the core that moisture can freeze. This is **frost** in the core, and it is why units in cold climates need a defrost strategy.

The next MicroSim has you calculate the supply temperature and the load removed for two cases, and then lets you find where frost begins.

#### Diagram: HRV Effectiveness and Frost Explorer

<iframe src="../../sims/hrv-effectiveness-frost-explorer/main.html" width="100%" height="562px" scrolling="no"></iframe>

[Run the HRV Effectiveness and Frost Explorer MicroSim fullscreen](../../sims/hrv-effectiveness-frost-explorer/main.html){ .md-button }

<details markdown="1">
<summary>HRV Effectiveness and Frost Explorer</summary>
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
</details>

## What Is Changing

- **Higher effectiveness.** Heat recovery units are commonly reported to recover roughly 60 to over 85 percent of the heat in the exhaust air, depending on the product and test conditions, and core designs such as counterflow cores continue to improve.[^1]
- **Energy recovery cores.** Membrane cores move water vapor as well as heat. In a Minnesota winter they help keep indoor air from becoming extremely dry, and in humid summers they reduce the moisture load on air conditioning.
- **Frost control.** At very low outdoor temperatures, moisture in the exhaust air can freeze in the core. Newer units use defrost strategies such as briefly pausing the supply fan, and the right choice depends on the climate.
- **Fans and controls.** Efficient electronically commutated motors and sensor-driven controls, covered in [Appendix F](../smart-sensors-building-automation/index.md), let ventilation rates follow occupancy.
- **Integration.** Ventilation, heating, and cooling are increasingly packaged together, as in heat pump systems that include heat recovery.

!!! mascot-warning "A Great Core in a Leaky Duct System"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A high-effectiveness unit loses its advantage if the ducts leak or the supply and exhaust flows are unbalanced. Seal and test the ducts, and have the airflows measured and balanced at commissioning.

## What to Watch

- Test standards and certification programs for recovery efficiency, because manufacturers measure it under different conditions.
- Code requirements for ventilation rates and for energy recovery in commercial buildings, which are revised with each code edition.
- Filtration and indoor air quality guidance, which shapes how much ventilation a building should provide.
- Cold-climate defrost performance in new products.

## Connects To

- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Heating Load and Ventilation Explorer](../../sims/hvac-heating-load-ventilation-explorer/index.md) MicroSim

## Key Takeaways

- An HRV or ERV moves heat between the exhaust and supply airstreams without mixing them.
- Sensible effectiveness tells you how much of the ventilation heating load disappears; an effectiveness of 0.80 removes 80 percent of it.
- Better cores, controls, and defrost strategies are changing the products; heat flowing from warm to cold is not.

## References

[^1]: Wikipedia contributors. *Heat recovery ventilation.* <https://en.wikipedia.org/wiki/Heat_recovery_ventilation> (a starting point; check manufacturer test data and certified product directories for specific products).
