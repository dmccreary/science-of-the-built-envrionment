---
title: "Heat Pump Cycle Explorer"
description: "Students walk through the five parts of a heat pump, predict what happens to the refrigerant and which way heat flows at each, and then switch between heating and cooling mode to watch the indoor and outdoor coils trade roles."
image: /sims/heat-pump-cycle-explorer/heat-pump-cycle-explorer.png
og:image: /sims/heat-pump-cycle-explorer/heat-pump-cycle-explorer.png
twitter:image: /sims/heat-pump-cycle-explorer/heat-pump-cycle-explorer.png
social:
   cards: false
status: built
library: HTML and SVG
bloom_level: Understand
---

# Heat Pump Cycle Explorer

<iframe src="main.html" width="100%" height="692" scrolling="no"></iframe>

[Run the Heat Pump Cycle Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/heat-pump-cycle-explorer/main.html" width="100%" height="692" scrolling="no"></iframe>
```

## Description

Students walk through the five parts of a heat pump, predict what happens to the refrigerant and which way heat flows at each, and then switch between heating and cooling mode to watch the indoor and outdoor coils trade roles.

This MicroSim belongs to [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Open any part label on the diagram to read its job in one sentence.
2. Press Start walkthrough. At each stage a part is highlighted. Choose an option for the prediction question before the explanation appears.
3. Read whether you were correct, the reason, and the refrigerant temperature that appears on the loop. Press Next stage.
4. After stage 5, switch between Heating and Cooling and watch the two coils swap roles while the compressor and expansion valve keep their jobs.

## Lesson Plan

**Learning objective:** Explain, for each of the four main parts of a heat pump and for its reversing valve, what happens to the refrigerant and which way heat flows, in heating mode and in cooling mode.

**Bloom level:** Understand (explain)

**Suggested activities**

- Predict, then read (10 min): Complete the five stages and record which predictions were wrong and why.
- Trace the loop (5 min): In heating mode, follow the arrows and name the pressure and temperature of the refrigerant at each of the four coil and valve connections.
- Explain the swap (5 min): In two sentences, explain what the reversing valve changes and what it does not.

**Assessment**

- Students state which coil is the condenser in heating mode and in cooling mode.
- Students explain why the refrigerant in the evaporator must be colder than the outdoor air for heat to flow in.

## References

- [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Heat pump (Wikipedia)](https://en.wikipedia.org/wiki/Heat_pump)
- [Vapor-compression refrigeration (Wikipedia)](https://en.wikipedia.org/wiki/Vapor-compression_refrigeration)

## Specification

The full specification below is extracted from
[Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md).

```text
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
```

## Related Resources

- [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md)
