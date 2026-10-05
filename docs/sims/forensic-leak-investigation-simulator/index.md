---
title: "Forensic Leak Investigation Simulator"
description: "Investigate a ceiling stain in the Riverbend classroom by choosing diagnostic tools, reading the evidence each one returns, and judging which of five competing hypotheses it supports or eliminates. Submit a conclusion and compare your investigation with an efficient sequence."
image: /sims/forensic-leak-investigation-simulator/forensic-leak-investigation-simulator.png
og:image: /sims/forensic-leak-investigation-simulator/forensic-leak-investigation-simulator.png
twitter:image: /sims/forensic-leak-investigation-simulator/forensic-leak-investigation-simulator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Evaluate
---

# Forensic Leak Investigation Simulator

<iframe src="main.html" width="100%" height="682" scrolling="no"></iframe>

[Run the Forensic Leak Investigation Simulator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/forensic-leak-investigation-simulator/main.html" width="100%" height="682" scrolling="no"></iframe>
```

## Description

Investigate a ceiling stain in the Riverbend classroom by choosing diagnostic tools, reading the evidence each one returns, and judging which of five competing hypotheses it supports or eliminates. Submit a conclusion and compare your investigation with an efficient sequence.

## How to Use

1. Read the case card and the five hypotheses: missing window flashing, roof leak, condensation, plumbing leak, and ice dam. Each starts at 20 percent confidence.
2. Click an investigation tool. Each can be used once and costs hours. The finding appears on the cutaway, the card explains why the evidence matters, and every confidence meter moves.
3. Watch the status of each hypothesis, which is also written as text: supported, undecided, or eliminated. Hover a hypothesis to see what evidence would confirm it.
4. When you are confident, click Submit conclusion and choose the most likely cause. The simulator reveals the hidden cause, your hours, and an efficient investigation sequence.
5. Click Reset to start a new case with a different hidden cause.

## Lesson Plan

**Learning objective:** Students evaluate competing hypotheses for a building leak by selecting investigation tools and judging which evidence supports or eliminates each hypothesis.

**Suggested activities**

- Run the first case (the Riverbend window flashing) and compare the tool sequence with the Chapter 21 worked example: drawings, moisture meter, water test, then opening the wall.
- Run two more cases and write, for each, the cheapest set of tools that made the right cause at least 85 percent likely.
- Find a case where two hypotheses stayed undecided after the infrared scan and explain which other tool separated them.

**Assessment**

- Explain why a destructive tool such as opening the wall is usually used last, and give one case where it was wasted effort.
- Explain in two sentences why a single finding rarely proves a hypothesis, using one finding from the simulator as an example.

## References

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
- [Forensic engineering (Wikipedia)](https://en.wikipedia.org/wiki/Forensic_engineering)
- [Thermography (Wikipedia: infrared thermography of buildings)](https://en.wikipedia.org/wiki/Thermography)

## Specification

The full specification below is extracted from
[Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md).

```text
Type: microsim
**sim-id:** forensic-leak-investigation-simulator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) competing hypotheses for a building leak by selecting investigation tools and judging which evidence supports or eliminates each hypothesis.

Visual: A cutaway of a wall and roof of the Riverbend classroom with a ceiling stain. A hypothesis panel lists five candidate causes (missing window flashing, roof leak, condensation, plumbing leak, ice dam), each with a confidence meter. A toolbox panel lists investigation tools. The canvas fills the container width, has a height of 540 px, and redraws on window resize.

Controls: Tool buttons labeled "Review drawings," "Moisture meter scan," "Infrared scan," "Water test, bottom up," "Open the wall," and "Check weather records." Each tool can be used once and has a cost in hours shown in a counter. A button labeled "Submit conclusion" opens a dropdown for the student to choose the most likely cause, and a "Reset" button starts a new case with a different hidden cause.

Interactions: Using a tool reveals a finding on the cutaway and updates the confidence meters, with a one-sentence explanation of why the evidence supports or eliminates each hypothesis. Hovering over a hypothesis shows what evidence would confirm it. After the conclusion is submitted, the simulator shows the correct cause and a short explanation of the efficient investigation sequence.

Colors: Supported hypotheses in green, eliminated hypotheses in gray, and undecided ones in yellow, each also labeled with text.

Implementation: p5.js with a responsive canvas, DOM buttons and dropdown, and a case table that maps each hidden cause to the findings returned by each tool.
```

## Related Resources

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
