---
title: "Appendix A: Heat Pumps and Building Electrification"
description: "How cold-climate heat pumps, inverter-driven compressors, and new refrigerants are replacing combustion heating, and the unchanging thermodynamics that explains why they work."
generated_by: claude skill chapter-content-generator
date: 2026-10-05 08:30:52
version: 1.11
last_reviewed: 2026-10-05
rate_of_change: very high
---

# Appendix A: Heat Pumps and Building Electrification

## Summary

How cold-climate heat pumps, inverter-driven compressors, and new refrigerants are replacing combustion heating, and the unchanging thermodynamics that explains why they work. After completing this appendix, students will be able to define, explain, and apply the 9 concepts listed below.

## Concepts Covered

This appendix covers the following 9 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Coefficient of Performance | 5 |
| Refrigerant | 3 |
| Temperature Lift | 2 |
| Refrigeration Cycle | 1 |
| Carnot Limit | 1 |
| Cold-Climate Heat Pump | 1 |
| Variable-Speed Compressor | 1 |
| Building Electrification | 1 |
| Refrigerant Global Warming Potential | 1 |

## Prerequisites

This appendix builds on concepts from these parts of the book:

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md): Heat
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md): Heat Pump, Heating Systems
- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md): Electrical Power, Electrical Systems
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md): Sustainability

---

!!! mascot-welcome "A Furnace That Moves Heat Instead of Making It"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A heat pump can deliver two or three units of heat for every unit of electricity it uses, and it keeps getting better at doing it in Minnesota winters. This appendix shows why that works and which parts of the story are still changing. Let's build it right!

For most of the twentieth century, heating a Minnesota building meant burning something: gas, oil, propane, or wood. A **heat pump** does something different. It uses electricity to move heat from a cold place to a warmer one, the way a refrigerator moves heat out of its cold box, so the heat delivered can be larger than the electrical energy consumed. Chapter 14 introduces the equipment; this appendix explains why the technology is changing so quickly and how to evaluate a claim about it.

## How a Heat Pump Works

A heat pump circulates a **refrigerant**, a fluid that boils at a very low temperature, around a closed loop with four main parts. The **compressor** squeezes the refrigerant vapor, which raises its pressure and temperature. The **condenser** is a coil where the hot vapor gives up heat and turns back into a liquid. The **expansion valve** drops the liquid's pressure, which makes it very cold. The **evaporator** is a coil where the cold liquid absorbs heat and boils back into vapor. In heating mode the indoor coil is the condenser and the outdoor coil is the evaporator, and a **reversing valve** swaps the two roles for cooling.

Every stage obeys one rule: heat flows only from the warmer thing to the colder thing. The next MicroSim asks you to apply that rule one stage at a time, and to predict each answer before it is revealed.

#### Diagram: Heat Pump Cycle Explorer

<iframe src="../../sims/heat-pump-cycle-explorer/main.html" width="100%" height="692px" scrolling="no"></iframe>

[Run the Heat Pump Cycle Explorer MicroSim fullscreen](../../sims/heat-pump-cycle-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Heat Pump Cycle Explorer</summary>
Type: infographic
**sim-id:** heat-pump-cycle-explorer<br/>
**Library:** html<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain, for each of the four main parts of a heat pump and for its reversing valve, what happens to the refrigerant and which way heat flows, in heating mode and in cooling mode.

**Prerequisites:** refrigerant, compressor, condenser, expansion valve, evaporator, reversing valve (all defined in the section "How a Heat Pump Works" above this block).

**Evidence of Mastery:** At each of 5 stages the learner commits an answer to a two-option prediction before the explanation is revealed. An answer is correct when it matches the Answer column in Content. Mastery is 4 of 5 correct. Opening part labels on the diagram is exploration, not evidence.

**Misconceptions:** (1) A heat pump makes heat the way a furnace does. (2) Cold outdoor air has no heat to give. (3) Cooling needs a different machine from heating.

**Instructional Rationale:** An Understand-level objective is met by predicting and then reading a concrete explanation, one stage at a time, so the learner sees why heat flows each way and not only the order of the parts.

**Content:**

The loop has five items in this order: compressor, condenser, expansion valve, evaporator, and the reversing valve that sits beside the compressor. Heating mode is shown first. Illustrative refrigerant temperatures for a 5°F day with 100°F supply air: the refrigerant in the evaporator is about -5°F and the refrigerant in the condenser is about 110°F.

| Stage | Part and what happens to the refrigerant | Prediction question | Options | Answer | Why (shown as feedback) |
|---|---|---|---|---|---|
| 1 | Compressor: low-pressure cool vapor goes in, high-pressure hot vapor comes out | After compression the vapor's temperature is | higher / lower | higher | Compression adds energy, so the vapor leaves hotter than the 100°F supply air, which lets heat flow out of it. |
| 2 | Condenser (indoor coil in heating mode): the hot vapor gives up heat and becomes liquid at about 110°F | At the condenser, heat flows | into the building / out of the building | into the building | The refrigerant at about 110°F is warmer than the 100°F air crossing the coil, so heat flows from the refrigerant to the air. |
| 3 | Expansion valve: the pressure drops and the liquid becomes much colder, about -5°F | After the pressure drop the refrigerant is | warmer than the outdoor air / colder than the outdoor air | colder than the outdoor air | Lower pressure lowers the boiling temperature, so the liquid falls to about -5°F, below the 5°F outdoor air. |
| 4 | Evaporator (outdoor coil in heating mode): the cold liquid absorbs heat and boils to vapor at about -5°F | On a 5°F day, heat can flow from the outdoor air into the -5°F refrigerant | yes / no | yes | Heat flows from warmer to colder, and the 5°F air is 10°F warmer than the refrigerant, so the refrigerant absorbs heat and boils. |
| 5 | Reversing valve: swaps which coil is the condenser and which is the evaporator | In cooling mode the indoor coil acts as the | condenser / evaporator | evaporator | In cooling mode the indoor coil must absorb heat from the room air, which is the evaporator's job. |

**Provenance:** The parts and their jobs come from the section "How a Heat Pump Works" in this appendix. The refrigerant temperatures are illustrative, and the sim must label them "illustrative".

**Rules:** Heat flows only from higher to lower temperature. The evaporator refrigerant must be colder than its heat source, and the condenser refrigerant must be hotter than its heat sink. The compressor sets the condenser temperature and the expansion valve sets the evaporator temperature. The mode switch exchanges which coil is the condenser and which is the evaporator. The compressor and expansion valve keep the same jobs in both modes.

**Learner Activity:**

1. The learner sees the loop in heating mode with all five parts named and no stage selected. Opening a part's label shows its job in one sentence.
2. The learner starts the walkthrough. Stage 1 is highlighted, and the learner chooses an option for its prediction question.
3. The sim reveals whether the choice was correct, shows the Why text, and marks the refrigerant's temperature at that point on the loop. The learner moves to the next stage.
4. After stage 5 the learner switches between heating and cooling mode and watches the two coils exchange roles.
5. The learner should notice that the same four parts do the same four jobs in both modes, and only the coil that plays the evaporator changes.

**Feedback:** Five questions in fixed order, one attempt each. After every answer the sim shows "Correct:" or "Not quite:" followed by the Why text, so the explanation is always revealed. A running count "n of 5" is shown, and the final score appears after stage 5.

**Starting State:** The heating-mode loop with five labeled parts and no stage selected, under the prompt "Heat flows only from warmer to colder. Where does the refrigerant have to be warmer, and where colder?"

**Chapter Anchors:** Appendix A names four main parts plus a reversing valve. In heating mode the indoor coil is the condenser and the outdoor coil is the evaporator. A heat pump's COP can exceed 1 because it moves heat instead of making it.
</details>

## The Physics That Does Not Change

The ratio of heat delivered to electricity used is the **coefficient of performance (COP)**. A COP of 3 means three units of heat for each unit of electricity. The second law of thermodynamics sets an upper limit that depends only on the two temperatures the machine works between, measured in kelvin:

\( \text{COP}_{\max} = \dfrac{T_{\text{hot}}}{T_{\text{hot}} - T_{\text{cold}}} \)

The gap between the two temperatures is called the **lift**. A smaller lift means a higher possible COP.

**Worked example: why cold weather hurts.** Suppose a heat pump supplies air heated to 100°F (310.9 K).

| Outdoor temperature | Outdoor (K) | Lift (K) | Carnot limit |
|---|---|---|---|
| 47°F | 281.5 | 29.4 | 10.6 |
| 5°F | 258.2 | 52.8 | 5.9 |

The limit nearly halves between a mild day and a cold one. Real equipment reaches only a fraction of it. The NEEP cold-climate specification, for example, asks for a COP of at least 1.75 at 5°F, about 30 percent of the 5.9 limit in the table.[^1] No engineering breakthrough repeals this arithmetic. Engineering progress shows up as a larger fraction of the limit and a machine that keeps its capacity as the lift grows.

## What Is Changing

- **Variable-speed compressors.** Inverter-driven compressors adjust their speed to the load instead of cycling on and off, which improves efficiency and lets a machine hold capacity at low outdoor temperatures.
- **Cold-climate performance.** Models listed to cold-climate specifications are designed to keep heating at 5°F and below, which moved heat pumps from "mild climates only" to a serious option in Minneapolis.
- **Refrigerants.** Under the AIM Act, EPA's Technology Transitions rule limits new residential air-conditioning and heat pump equipment to refrigerants with a global warming potential below 700. R-410A, with a potential near 2,088, was replaced in equipment manufactured from January 1, 2025 by refrigerants such as R-454B and R-32.[^2] These are classed as mildly flammable, so codes, installer training, and service practices are changing with them. The installation deadline for earlier-built R-410A equipment was relaxed by EPA in 2026, an example of how fast the rules move.
- **Electrical service.** Replacing a gas furnace and water heater adds electrical load. Chapter 15 and the [Service Headroom for Solar and EV Loads](../../sims/service-headroom-ev-pv-explorer/index.md) MicroSim show how the panel and service size become design questions.

## Worked Example: Heating Cost per 100,000 Btu

One therm of natural gas holds 100,000 Btu, and one kilowatt-hour equals 3,412 Btu. The table compares three ways to deliver 100,000 Btu of heat to the rooms. Prices are illustrative; look up current local rates before drawing a conclusion.

| System | Efficiency | Energy input | Illustrative price | Cost |
|---|---|---|---|---|
| 95% gas furnace | 0.95 | 1.05 therms | $1.20 per therm | $1.26 |
| Heat pump, seasonal COP 2.5 | 2.5 | 11.7 kWh | $0.14 per kWh | $1.64 |
| Electric resistance | 1.0 | 29.3 kWh | $0.14 per kWh | $4.10 |

At these prices the gas furnace is still cheaper to run, and the heat pump beats resistance heat by a wide margin. The heat pump breaks even when gas costs about 11.1 times the electricity price per kilowatt-hour, or when its seasonal COP is high enough. Both prices move from year to year, which is one reason the answer keeps changing.

The next MicroSim lets you compute the Carnot limit yourself for four cases and then turn it into energy and cost for 100,000 Btu of heat.

#### Diagram: Heat Pump COP and Lift Explorer

<iframe src="../../sims/heat-pump-cop-lift-explorer/main.html" width="100%" height="622px" scrolling="no"></iframe>

[Run the Heat Pump COP and Lift Explorer MicroSim fullscreen](../../sims/heat-pump-cop-lift-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Heat Pump COP and Lift Explorer</summary>
Type: microsim
**sim-id:** heat-pump-cop-lift-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the Carnot limit on heat pump COP from a stated outdoor temperature and supply temperature, to within 0.1, and use it to estimate the electricity and cost needed to deliver 100,000 Btu of heat.

**Prerequisites:** coefficient of performance (COP), lift, Carnot limit, kelvin, therm, kilowatt-hour (all defined in this appendix above the block).

**Evidence of Mastery:** In four challenges the learner types the Carnot limit for a stated outdoor and supply temperature before the sim reveals it. An answer is correct when it is within ±0.1 of the model value. Mastery is 4 of 4 correct, with two attempts allowed on each. Changing the adjustable quantities afterward is exploration, not evidence.

**Misconceptions:** (1) A heat pump has one fixed COP. (2) Heat pumps stop working below freezing. (3) A COP above 1 violates conservation of energy.

**Instructional Rationale:** Apply-level skill needs the learner to carry out the calculation and commit a number before seeing the answer. Free exploration comes afterward, so the learner sees that the lift, not only the machine, sets the limit.

**Content:**

Conversion: temperature in kelvin = (°F - 32) x 5/9 + 273.15. Carnot limit = T_supply / (T_supply - T_outdoor), with both in kelvin.

Challenges, in this order:

| # | Outdoor (°F) | Supply (°F) | Carnot limit | Feedback when wrong |
|---|---|---|---|---|
| 1 | 47 | 100 | 10.6 | Outdoors is 281.5 K and supply is 310.9 K, so the lift is 29.4 K and the limit is 310.9 / 29.4 = 10.6. |
| 2 | 5 | 100 | 5.9 | Outdoors is 258.2 K, so the lift is 52.8 K and the limit is 310.9 / 52.8 = 5.9. Colder weather means more lift and a lower limit. |
| 3 | -10 | 100 | 5.1 | Outdoors is 249.8 K, so the lift is 61.1 K and the limit is 310.9 / 61.1 = 5.1. |
| 4 | 5 | 120 | 5.0 | Supply is 322.0 K and outdoors is 258.2 K, so the lift is 63.9 K and the limit is 322.0 / 63.9 = 5.0. A hotter supply raises the lift, so a system delivering 120°F water has a lower limit than one delivering 100°F air. |

Adjustable quantities after the challenges:

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Outdoor temperature | -20 | 60 | 5 | 5 | °F |
| Supply temperature | 90 | 130 | 5 | 100 | °F |
| Fraction of the Carnot limit achieved | 0.30 | 0.60 | 0.05 | 0.40 | none |
| Electricity price | 0.08 | 0.30 | 0.02 | 0.14 | $ per kWh |
| Natural gas price | 0.80 | 2.40 | 0.10 | 1.20 | $ per therm |

Choice of COP source: "Carnot estimate" (default) or "Seasonal COP 2.5 (the Appendix A example)".

Outputs shown for each setting: the Carnot limit, the COP used, and the cost of 100,000 Btu of delivered heat for three systems: the heat pump, a 95 percent efficient gas furnace, and electric resistance heat. A reference mark at COP 1.75 shows the NEEP cold-climate minimum at 5°F.

**Provenance:** The formula, the 100°F supply case, the cost comparison and the seasonal COP of 2.5 come from this appendix. The conversions 1 kWh = 3,412 Btu and 1 therm = 100,000 Btu are standard. The fraction-of-Carnot range and all prices are illustrative, and the sim must label them "illustrative". The 1.75 reference is from the NEEP specification cited in this appendix.

**Rules:**

- Real COP estimate = fraction x Carnot limit. COP is shown to one decimal place.
- Electricity for 100,000 Btu = 100,000 / (3,412 x COP) kWh. Heat pump cost = that value x electricity price.
- Furnace gas = 100,000 / (100,000 x 0.95) = 1.053 therms. Furnace cost = 1.053 x gas price.
- Electric resistance = 100,000 / 3,412 = 29.3 kWh. Cost = 29.3 x electricity price.
- Break-even gas price = heat pump cost / 1.053. The heat pump is cheaper than the furnace when gas price > break-even.
- Every value in the ranges above gives a Carnot limit above 3.9 and a COP estimate of at least 1.18, so no input produces a division by zero or a COP below 1.
- With COP source set to seasonal 2.5 and the default prices, the sim must reproduce Appendix A: 11.7 kWh and $1.64 for the heat pump, $1.26 for the furnace, 29.3 kWh and $4.10 for resistance, and a break-even gas price of $1.56 per therm.

**Learner Activity:**

1. The learner reads the stated outdoor and supply temperatures for a challenge and types the Carnot limit.
2. The learner presses Check. The sim reveals the model value and shows the correct or incorrect message.
3. After the fourth challenge the adjustable quantities unlock. Changing any of them updates all outputs at once.
4. The learner raises the supply temperature from 100°F to 120°F and should notice that the limit falls.
5. The learner switches the COP source between the Carnot estimate and seasonal 2.5, and should notice that the heat pump is still more expensive to run than the furnace at default prices but beats electric resistance by a wide margin.
6. The learner raises the gas price until the heat pump becomes the cheaper system and compares that price with the break-even value shown.

**Feedback:** Four challenges, fixed order, two attempts each. Correct: "Correct: the limit is <value>." Incorrect on the first attempt: the "Feedback when wrong" text for that challenge. After a second wrong attempt the model value and the worked calculation are shown, and the challenge counts as missed. A running count "Challenges correct: n of 4" is shown.

**Starting State:** Challenge 1 is shown with an empty answer box under the question "How high could the COP be on a 47°F day when the building needs 100°F supply air?"

**Chapter Anchors:** Carnot limits of 10.6 at 47°F and 5.9 at 5°F for a 100°F supply. NEEP minimum COP of 1.75 at 5°F. Costs of $1.26, $1.64 and $4.10 per 100,000 Btu, with 1.05 therms, 11.7 kWh and 29.3 kWh. Break-even at about 11.1 times the electricity price per kWh.
</details>

#### Diagram: Heating System Energy Comparison

<iframe src="../../sims/heating-system-energy-comparison/main.html" width="100%" height="742px" scrolling="no"></iframe>

[Run the Heating System Energy Comparison MicroSim fullscreen](../../sims/heating-system-energy-comparison/main.html){ .md-button }

<details markdown="1">
<summary>Heating System Energy Comparison (reused MicroSim)</summary>
Type: chart
**sim-id:** heating-system-energy-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/science-of-the-built-envrionment/sims/heating-system-energy-comparison/<br/>
**Source Repo:** https://github.com/dmccreary/science-of-the-built-envrionment<br/>
**Bloom Level:** Analyze<br/>
**Bloom Verb:** compare<br/>
**Learning Objective:** The learner will compare the input energy that four heating systems need to deliver the same heat and explain why heat pump COP falls as the outdoor temperature falls.

Reused from this book's own MicroSims (Chapter 14), which already teach the same idea with a COP curve across outdoor temperatures.
</details>

!!! mascot-tip "Ask for the Design-Temperature Number"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A catalog COP is usually rated at 47°F. Ask the manufacturer for capacity and COP at the outdoor design temperature for your site, then compare that capacity with the building's heat loss on its coldest hour.

## What to Watch

- Cold-climate heat pump listings and test standards, which are revised as products improve.
- Refrigerant rules and the safety standards for mildly flammable refrigerants.
- Federal, state, and utility incentives, which have changed repeatedly and differ by location.
- Utility rate designs, such as winter electric heating rates, that decide the operating-cost comparison.
- Heat pump water heaters and combined space-and-water systems, which extend the same idea.

## Connects To

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
- [Heating System Energy Comparison](../../sims/heating-system-energy-comparison/index.md) MicroSim

## Key Takeaways

- A heat pump moves heat, so its COP can exceed 1; the limit depends on the lift between source and delivery temperatures.
- Cold weather increases the lift, so performance at the design temperature matters more than the headline rating.
- Compressors, refrigerants, incentives, and prices are all changing; the thermodynamics is not.

## References

[^1]: Northeast Energy Efficiency Partnerships. *Cold Climate Air-Source Heat Pump Specification.* <https://neep.org/sites/default/files/resources/NEEP%20cold%20climate%20Air-Source%20Heat%20Pump%20Specification.pdf>
[^2]: U.S. Environmental Protection Agency. *Frequent Questions on the Phasedown of Hydrofluorocarbons.* <https://www.epa.gov/hfcs/frequent-questions-phasedown-hydrofluorocarbons>
