---
title: "IBC Question Router"
description: "Students route a Riverbend design question to the group of International Building Code provisions where its answer starts, then switch to an occupant-load mode that follows the chain from room area to occupant load to likely number of exits."
image: /sims/ibc-question-router/ibc-question-router.png
og:image: /sims/ibc-question-router/ibc-question-router.png
twitter:image: /sims/ibc-question-router/ibc-question-router.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand, Apply
---

# IBC Question Router

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the IBC Question Router MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ibc-question-router/main.html" width="100%" height="522" scrolling="no"></iframe>
```

## Description

Students route a Riverbend design question to the group of International Building Code provisions where its answer starts, then switch to an occupant-load mode that follows the chain from room area to occupant load to likely number of exits.

## How to Use

1. In Classify mode, read the design question on the card and click the block where you think the answer starts. Hover over any block to read what it covers.
2. A correct block turns green and shows the cross-references that follow. An incorrect block turns orange and shows a hint, and you may try again. The score counts first-try answers only.
3. Press Next question to draw another question from the bank of 14.
4. Switch to Occupant load mode, set the room area with the slider, and choose 15 or 7 net square feet per person. Watch the occupant load and the likely number of exits change.

## Lesson Plan

**Learning objective:** Classify a design question into the correct group of IBC provisions, and apply the occupancy-to-exits chain to calculate an occupant load.

**Suggested activities**

- Warm-up (5 min): Students predict, before clicking, which group answers the first five questions, then check their predictions.
- Explore (10 min): Students work through the full question bank and note which groups they confuse, such as fire protection versus egress.
- Apply (10 min): In Occupant load mode, students reproduce the Riverbend multipurpose room example (2,400 ft2 at 15 and at 7 net ft2 per person) and explain why the exit count changes.

**Assessment**

- Students write one new design question for each of three groups and exchange them with a partner.
- Students explain in two sentences why the same room can have two different occupant loads.

## References

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
- International Code Council, International Building Code (organization of provisions and occupant-load provisions; verify the adopted edition).
- [Building code (Wikipedia)](https://en.wikipedia.org/wiki/Building_code)

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
