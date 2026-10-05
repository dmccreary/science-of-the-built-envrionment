---
title: "Heat Pump COP and Lift Explorer"
description: "Students calculate the Carnot limit on a heat pump's COP from the outdoor and supply temperatures in kelvin, then explore how lift, the fraction of the limit achieved, and fuel prices change the cost of delivering 100,000 Btu with a heat pump, a gas furnace, and electric resistance."
image: /sims/heat-pump-cop-lift-explorer/heat-pump-cop-lift-explorer.png
og:image: /sims/heat-pump-cop-lift-explorer/heat-pump-cop-lift-explorer.png
twitter:image: /sims/heat-pump-cop-lift-explorer/heat-pump-cop-lift-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply
---

# Heat Pump COP and Lift Explorer

<iframe src="main.html" width="100%" height="622" scrolling="no"></iframe>

[Run the Heat Pump COP and Lift Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/heat-pump-cop-lift-explorer/main.html" width="100%" height="622" scrolling="no"></iframe>
```

## Description

Students calculate the Carnot limit on a heat pump's COP from the outdoor and supply temperatures in kelvin, then explore how lift, the fraction of the limit achieved, and fuel prices change the cost of delivering 100,000 Btu with a heat pump, a gas furnace, and electric resistance.

This MicroSim belongs to [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the outdoor and supply temperatures for challenge 1, convert both to kelvin, and type the Carnot limit. Press Check.
2. Work through the four challenges. The thermometer shows the lift between the two temperatures.
3. When the sliders unlock, change the outdoor and supply temperatures and watch the Carnot limit, the COP used, and the three costs update.
4. Switch the COP source to the seasonal COP of 2.5 to reproduce the Appendix A example, then raise the gas price until the heat pump becomes the cheaper system and compare with the break-even price.

## Lesson Plan

**Learning objective:** Calculate the Carnot limit on heat pump COP from a stated outdoor temperature and supply temperature, to within 0.1, and use it to estimate the electricity and cost needed to deliver 100,000 Btu of heat.

**Bloom level:** Apply (calculate)

**Suggested activities**

- Predict the limit (10 min): For each challenge write the lift in kelvin before computing the limit.
- Colder and hotter (10 min): Hold the supply at 100 F and lower the outdoor temperature from 60 F to -20 F. Then raise the supply to 130 F at 5 F outdoors. Record the limit each time.
- Break-even (10 min): Find the gas price at which the heat pump and furnace cost the same, and check it against the readout.

**Assessment**

- Students compute the Carnot limit for 20 F outdoors and 110 F supply, showing both kelvin conversions.
- Students explain why a COP above 1 does not violate conservation of energy.

## References

- [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Coefficient of performance (Wikipedia)](https://en.wikipedia.org/wiki/Coefficient_of_performance)
- [Heat pump (Wikipedia)](https://en.wikipedia.org/wiki/Heat_pump)

## Specification

The full specification below is extracted from
[Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md).

```text
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
```

## Related Resources

- [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md)
