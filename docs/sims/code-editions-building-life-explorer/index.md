---
title: "Code Editions and Building Life Explorer"
description: "Students calculate how many code editions are published during a building's life and how many times a roof membrane and a heat pump are replaced, then change the building life to see which parts stay for the whole life."
image: /sims/code-editions-building-life-explorer/code-editions-building-life-explorer.png
og:image: /sims/code-editions-building-life-explorer/code-editions-building-life-explorer.png
twitter:image: /sims/code-editions-building-life-explorer/code-editions-building-life-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply
---

# Code Editions and Building Life Explorer

<iframe src="main.html" width="100%" height="492" scrolling="no"></iframe>

[Run the Code Editions and Building Life Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/code-editions-building-life-explorer/main.html" width="100%" height="492" scrolling="no"></iframe>
```

## Description

Students calculate how many code editions are published during a building's life and how many times a roof membrane and a heat pump are replaced, then change the building life to see which parts stay for the whole life.

This MicroSim belongs to [Appendix H: Energy Codes and Building Performance Standards](../../appendices/codes-performance-standards/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read challenge 1 and type a whole number of code editions. Press Check.
2. After each answer the timeline fills in the part that the challenge asks about.
3. When the slider unlocks, change the building life from 30 to 100 years and watch the editions and the replacement counts update.
4. Find the components that stay for the whole life at 60 years, then raise the life to 100 years.

## Lesson Plan

**Learning objective:** Calculate how many code editions are published during a building's service life and how many times each building component is replaced, given the building's life and each component's life.

**Bloom level:** Apply (calculate)

**Suggested activities**

- Count (10 min): For building lives of 40, 60, and 90 years, count the editions and the replacements of each component by hand, then check with the sim.
- What cannot be upgraded (10 min): List the parts that stay for the whole life at 60 years and explain why this argues for building them better than the current minimum.
- Design a life (5 min): Choose a life for a school and justify it by the replacements it implies.

**Assessment**

- Students state the number of times a 30-year window is replaced in a 75-year life, with the arithmetic.
- Students explain why the structural frame and the insulation and air barrier deserve more than the current code minimum.

## References

- [Appendix H: Energy Codes and Building Performance Standards](../../appendices/codes-performance-standards/index.md)
- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md)
- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
- [International Energy Conservation Code (Wikipedia)](https://en.wikipedia.org/wiki/International_Energy_Conservation_Code)

## Specification

The full specification below is extracted from
[Appendix H: Energy Codes and Building Performance Standards](../../appendices/codes-performance-standards/index.md).

```text
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
```

## Related Resources

- [Appendix H: Energy Codes and Building Performance Standards](../../appendices/codes-performance-standards/index.md)
