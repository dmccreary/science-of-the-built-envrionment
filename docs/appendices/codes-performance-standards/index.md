---
title: "Appendix H: Energy Codes and Building Performance Standards"
description: "How energy codes are updated on a regular cycle, how Minnesota law steers its commercial energy code toward an 80 percent reduction by 2036, and how performance standards regulate existing buildings."
generated_by: claude skill chapter-content-generator
date: 2026-10-05 08:31:02
version: 1.11
last_reviewed: 2026-10-05
rate_of_change: high
---

# Appendix H: Energy Codes and Building Performance Standards

## Summary

How energy codes are updated on a regular cycle, how Minnesota law steers its commercial energy code toward an 80 percent reduction by 2036, and how performance standards regulate existing buildings. After completing this appendix, students will be able to define, explain, and apply the 7 concepts listed below.

## Concepts Covered

This appendix covers the following 7 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Code Edition Cycle | 2 |
| ASHRAE Standard 90.1 | 1 |
| International Energy Conservation Code | 1 |
| Building Performance Standards | 1 |
| Minnesota 2036 Commercial Energy Target | 1 |
| Electric-Ready and Solar-Ready Requirements | 1 |
| Component Replacement Cycle | 1 |

## Prerequisites

This appendix builds on concepts from these parts of the book:

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md): Electric Vehicle Charging, Photovoltaic Systems
- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md): Building Codes, Model Codes, Referenced Standards
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md): Energy Efficiency, Minnesota Energy Code
- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md): Service Life

---

!!! mascot-welcome "The Rulebook Has a Revision Date"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Codes are not carved in stone; they are living documents that get new editions on a schedule. This appendix shows how that schedule works so you always know which edition governs your project. Let's build it right!

Chapter 17 explains how model codes are written, adopted, and enforced, and Chapter 19 introduces the Minnesota Energy Code. The code changes more often than a building ages, and that mismatch is the subject of this appendix.

## How Codes Change

Model energy codes are revised on a regular cycle. The International Energy Conservation Code and ASHRAE Standard 90.1 are each updated roughly every three years, and each edition generally tightens requirements for insulation, windows, air leakage, lighting, and mechanical equipment. States adopt editions on their own timetables, often with amendments, and local jurisdictions enforce them. The [Code Adoption and Authority Chain](../../sims/code-adoption-authority-chain/index.md) MicroSim shows the path from model code to local enforcement.

Minnesota is an example of a state setting a direction by law. Minnesota Statutes section 326B.106 requires the commissioner, beginning in 2024, to adopt each new published edition of ASHRAE 90.1 or a more efficient standard, and requires that the commercial energy code in effect in 2036 and afterward achieve an 80 percent reduction in annual net energy consumption compared with a 90.1-2004 baseline, with codes adopted in between moving incrementally toward it.[^1] Check the Department of Labor and Industry for the editions in force and their effective dates, because they change.

A newer kind of code provision looks ahead to equipment that has not been installed yet. **Electric-ready** requirements ask a new building to include the wiring, electrical panel space, and outlets or circuits that a later switch to electric appliances or an electric vehicle charger would need. **Solar-ready** requirements ask for unshaded roof area and a protected path for wiring, so that a solar array can be added later without opening finished walls. Which of these apply, and to which building types, varies by jurisdiction and edition, so confirm them with the building official. The reasoning is the one this book keeps returning to: building the pathway costs little during construction and a great deal afterward.

The Code Adoption and Authority Chain MicroSim from Chapter 17 lets you follow a model code through each layer of adoption.

#### Diagram: Code Adoption and Authority Chain

<iframe src="../../sims/code-adoption-authority-chain/main.html" width="100%" height="537px" scrolling="no"></iframe>

[Run the Code Adoption and Authority Chain MicroSim fullscreen](../../sims/code-adoption-authority-chain/main.html){ .md-button }

<details markdown="1">
<summary>Code Adoption and Authority Chain (reused MicroSim)</summary>
Type: microsim
**sim-id:** code-adoption-authority-chain<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/science-of-the-built-envrionment/sims/code-adoption-authority-chain/<br/>
**Source Repo:** https://github.com/dmccreary/science-of-the-built-envrionment<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** explain<br/>
**Learning Objective:** The learner will explain how a model code becomes enforceable law and trace which layers of rules apply to a Minnesota project.

Reused from this book's own MicroSims (Chapter 17), which already teach the adoption chain this appendix relies on.
</details>

## Performance Standards for Existing Buildings

A code governs what is built. A **building performance standard (BPS)** governs how an existing building operates. A BPS sets limits on energy use or greenhouse gas emissions per square foot for buildings above a size threshold, requires the owner to measure and report, and applies penalties or requires improvements for buildings that exceed the limits. New York City's Local Law 97 is a well-known example, and several other cities and states have adopted or are developing their own. The standards differ in thresholds, metrics, and schedules, and they are still being revised.

## The Timeline Problem

**Worked example: a code edition against a building's life.** A building designed in 2026 might stand for 60 years. With a new code edition about every three years, roughly 20 further editions will be published while it is in service, and each will probably ask more of a new building than the one before. Parts of the building age at very different rates, as the [Six S's of Shearing Layers](../../posters/six-s-shearing-layers/index.md) poster shows: a roof membrane or a heat pump may be replaced two or three times, while the structure and the enclosure's insulation and air barrier stay in place for the whole 60 years. That is the case for building the hard-to-change parts, especially the enclosure, better than the current minimum, and for leaving room in the electrical service and mechanical spaces for later upgrades. The [Service Life Factor Calculator](../../sims/service-life-factor-calculator/index.md) lets you explore service-life reasoning.

The next MicroSim turns this arithmetic into a calculation you can repeat for any building life.

#### Diagram: Code Editions and Building Life Explorer

<details markdown="1">
<summary>Code Editions and Building Life Explorer</summary>
Type: microsim
**sim-id:** code-editions-building-life-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate how many code editions are published during a building's service life and how many times each building component is replaced, given the building's life and each component's life.

**Prerequisites:** code edition, service life, replacement (all defined in this appendix above the block).

**Evidence of Mastery:** In three challenges the learner types a whole number before the sim reveals it. An answer is correct when it equals the model value exactly. Mastery is 3 of 3 correct, with two attempts on each. Changing the building life afterward is exploration, not evidence.

**Misconceptions:** (1) A building is reviewed once and stays current for its whole life. (2) Every part of a building is replaced at the same time. (3) A part that is replaced several times is the part most worth overbuilding.

**Instructional Rationale:** Apply-level skill comes from computing the counts for specific numbers. Seeing which parts are never replaced shows why the enclosure and structure deserve more than the current minimum, which is the design conclusion the appendix draws.

**Content:**

The model counts one new code edition every 3 years. Components and their service lives (illustrative planning values):

| Component | Service life (years) |
|---|---|
| Structural frame | 100 |
| Insulation and air barrier | 60 |
| Windows | 30 |
| Roof membrane | 25 |
| Heat pump | 18 |
| Water heater | 12 |

| Quantity | Min | Max | Step | Default | Unit |
|---|---|---|---|---|---|
| Building service life | 30 | 100 | 5 | 60 | years |

Challenges, in this order:

| # | Question | Setting | Correct answer | Why (shown as feedback) |
|---|---|---|---|---|
| 1 | How many new code editions are published during the building's life? | Life 60 years | 20 | 60 years / 3 years per edition = 20 editions. |
| 2 | How many times is the roof membrane replaced? | Life 60 years | 2 | The roof lasts 25 years: it is replaced at year 25 and year 50, and 60 years ends before a third replacement. That is ceil(60 / 25) - 1 = 2. |
| 3 | How many times is the heat pump replaced? | Life 75 years | 4 | The heat pump lasts 18 years: replacements fall at years 18, 36, 54 and 72. That is ceil(75 / 18) - 1 = 4. |

**Provenance:** The 3-year edition cycle and the 60-year life come from this appendix. The component service lives are illustrative planning values, and the sim must label them "illustrative".

**Rules:**

- Editions published during the life = floor(building life / 3).
- Replacements of a component = ceil(building life / component life) - 1, and never below 0.
- At the default life of 60 years the replacements are: structural frame 0, insulation and air barrier 0, windows 1, roof membrane 2, heat pump 3, water heater 4.
- A component with 0 replacements is marked "stays for the whole life".

**Learner Activity:**

1. The learner reads a challenge and types a whole number, then presses Check.
2. The sim reveals the answer with the Why text and draws the building's timeline with the edition dates and each replacement.
3. After the challenges the learner changes the building life. The edition count, the replacement counts and the timeline update at once.
4. The learner should notice that the parts marked "stays for the whole life" are the structural frame and the insulation and air barrier at 60 years, and that these are the parts that cannot be upgraded later without a major renovation.
5. The learner raises the life to 100 years and should notice that the insulation and air barrier are now replaced once.

**Feedback:** Three challenges, fixed order, two attempts each. Correct: "Correct: <answer>." Incorrect on the first attempt: the Why text without the answer. After a second wrong attempt the answer and the Why text are shown, and the challenge counts as missed. A running count "Challenges correct: n of 3" is shown.

**Starting State:** A 60-year timeline with no edition dates drawn, under the question "How many new code editions will be published while this building stands?"

**Chapter Anchors:** A building designed in 2026 might stand for 60 years, and with a new edition about every three years roughly 20 further editions are published during its life. A roof membrane or a heat pump may be replaced two or three times.
</details>

!!! mascot-tip "Ask Which Edition Governs"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    At the start of any project, ask the building official which code editions and local amendments apply, and note the date the permit application was filed. A project is generally reviewed under the edition in force at the time, so the date matters.

## What Stays the Same

Codes change their numbers, but the questions behind them do not. How much heat leaks through the enclosure (Chapter 3), how air and moisture move (Chapter 4), how much energy the systems use (Chapter 14), and how safely people can leave a burning building (Chapter 18) are physical questions with physical answers. A student who understands the questions can read the next code edition quickly.

## What to Watch

- New editions of the IECC and ASHRAE 90.1, and the date Minnesota adopts each.
- Minnesota's progress toward its 2036 target and any changes to state energy law.
- New or revised building performance standards in cities and states, and whether any affect Minnesota buildings.
- Rules on electric-readiness, solar-readiness, and electric vehicle charging in new construction.

## Connects To

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
- [Code Adoption and Authority Chain](../../sims/code-adoption-authority-chain/index.md) MicroSim

## Key Takeaways

- Model energy codes update about every three years, and states adopt editions on their own timelines.
- Minnesota law directs its commercial energy code toward an 80 percent reduction in net energy use by 2036.
- A building performance standard regulates existing buildings; a code regulates new construction.
- Code editions come and go, and the physics of heat, air, moisture, and fire behind them does not.

## References

[^1]: Minnesota Office of the Revisor of Statutes. *Minnesota Statutes 2024, section 326B.106, subdivision 4.* <https://www.revisor.mn.gov/statutes/2024/cite/326B.106/subd/326B.106.4>
