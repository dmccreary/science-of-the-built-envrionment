---
title: Forensic Leak Investigation Simulator
description: Students will evaluate (Bloom Level 5, Evaluate) competing hypotheses for a building leak by selecting investigation tools and judging which evidence supports or eliminates each hypothesis.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Forensic Leak Investigation Simulator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
