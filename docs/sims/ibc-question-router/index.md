---
title: IBC Question Router
description: Students will classify (Bloom Level 2, Understand) a design question into the correct group of International Building Code provisions and will apply (Bloom Level 3, Apply) the occupancy-to-exits chain to calculate an occupant load.
status: scaffold
library: p5.js
bloom_level: TBD
---

# IBC Question Router



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md).

```text
Type: microsim
**sim-id:** ibc-question-router<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) a design question into the correct group of International Building Code provisions and will apply (Bloom Level 3, Apply) the occupancy-to-exits chain to calculate an occupant load.

Visual: The left half shows nine labeled blocks arranged as an ordered column, one for each group of provisions listed above. The right half shows a card for a design question. The canvas fills the container width, has a height of 520 px, and redraws on window resize.

Controls: A button labeled "Next question" draws a question from a bank of at least 12, including egress, fire-resistance, and snow-load questions for Riverbend. The student clicks the block where the answer starts. A correct choice turns the block green and shows the cross-references that follow. An incorrect choice turns it orange and shows a one-sentence hint. A second mode, "Occupant load," offers a room area slider (500 to 5,000 ft²) and a radio choice between 15 net ft² per person and 7 net ft² per person, labeled illustrative, and displays the computed occupant load and a note about the likely number of exits.

Interactions: Hovering over any block shows a definition of its provisions. A score counter shows the number of questions answered correctly.

Colors: Correct answers are green, incorrect answers are orange, and neutral blocks are gray. Every state is also written as text.

Implementation: p5.js with a responsive canvas, a question bank held in a JavaScript array, and DOM controls.
```

## Related Resources

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
