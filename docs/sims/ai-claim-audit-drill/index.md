---
title: "AI Claim Audit Drill"
description: "Students judge ten technical statements written by an AI assistant as correct or incorrect against the physics and facts in Appendices A through H, see the reason and the appendix to check after each, and review the statements they got wrong."
image: /sims/ai-claim-audit-drill/ai-claim-audit-drill.png
og:image: /sims/ai-claim-audit-drill/ai-claim-audit-drill.png
twitter:image: /sims/ai-claim-audit-drill/ai-claim-audit-drill.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Evaluate
---

# AI Claim Audit Drill

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the AI Claim Audit Drill MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ai-claim-audit-drill/main.html" width="100%" height="482" scrolling="no"></iframe>
```

## Description

Students judge ten technical statements written by an AI assistant as correct or incorrect against the physics and facts in Appendices A through H, see the reason and the appendix to check after each, and review the statements they got wrong.

This MicroSim belongs to [Appendix I: Digital Design, Prefabrication, Robotics, and AI](../../appendices/digital-design-prefabrication-ai/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the statement under "Written by an AI assistant" and choose Accept or Reject.
2. Read whether your choice was correct, the reason, and the source to check. Open the appendix link if you want to verify it.
3. Press Next statement. After statement 10 the score and the statements you judged wrongly appear.
4. Reopen any missed statement from the menu, then restart the drill if you wish.

## Lesson Plan

**Learning objective:** Judge ten technical statements written by an AI assistant as correct or incorrect, using the physics and facts in Appendices A through H, with at least 8 of 10 judged correctly.

**Bloom level:** Evaluate (judge)

**Suggested activities**

- Audit (10 min): Complete the drill without opening any appendix, then list the statements you accepted too quickly.
- Check by calculation (5 min): Four statements can be checked with a one-line calculation. Find them and do each check.
- Write one (10 min): Write one correct and one subtly wrong statement of your own about a building system and trade them with a partner.

**Assessment**

- Students explain why a statement with precise numbers can still be wrong.
- Students describe how they would verify an AI statement that affects code compliance.

## References

- [Appendix I: Digital Design, Prefabrication, Robotics, and AI](../../appendices/digital-design-prefabrication-ai/index.md)
- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
- [Hallucination (artificial intelligence) (Wikipedia)](https://en.wikipedia.org/wiki/Hallucination_(artificial_intelligence))

## Specification

The full specification below is extracted from
[Appendix I: Digital Design, Prefabrication, Robotics, and AI](../../appendices/digital-design-prefabrication-ai/index.md).

```text
Type: microsim
**sim-id:** ai-claim-audit-drill<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Evaluate<br/>
**Bloom Verb:** judge<br/>
**Learning Objective:** The learner will judge ten technical statements written by an AI assistant as correct or incorrect, using the physics and facts in Appendices A through H, with at least 8 of 10 judged correctly.

**Prerequisites:** the definitions and worked examples in Appendices A through F and H.

**Evidence of Mastery:** For each statement the learner chooses Accept or Reject. A choice is correct when it matches the Verdict column in Content. Mastery is 8 of 10 correct. Opening the appendix links is exploration, not evidence.

**Misconceptions:** (1) A confident, precise-sounding statement is correct. (2) A statement with real numbers in it has been checked. (3) An AI assistant's mistakes are obvious.

**Instructional Rationale:** Evaluate-level skill is the ability to judge a claim against criteria. Mixing correct statements with plausible errors, including an error that is off by a factor of ten, makes the learner check against the physics, and the "Check" source in the feedback shows where to verify.

**Content:**

Each statement is shown as "Written by an AI assistant" with Accept and Reject choices. The statements are synthetic, written for this exercise from the appendices, and the sim must say so.

| # | Statement | Verdict | Why (shown as feedback) | Check |
|---|---|---|---|---|
| 1 | A heat pump with a COP of 3 delivers 3 kWh of heat for every 1 kWh of electricity it uses. | Accept | COP is the heat delivered divided by the electricity used. | Appendix A, definition of COP |
| 2 | No real heat pump can have a COP above 1, because that would create energy. | Reject | A heat pump moves heat from a source, so the extra heat comes from the source and no energy is created. | Appendix A, "The Physics That Does Not Change" |
| 3 | A battery with 13.5 kWh of usable energy and a 5 kW inverter can run a 5 kW load for 13.5 hours. | Reject | 13.5 kWh / 5 kW = 2.7 hours. Hours are energy divided by power. | Appendix D, worked example |
| 4 | A balanced HRV with effectiveness 0.80 supplies 56°F air when it is 0°F outdoors and 70°F indoors. | Accept | Supply = 0 + 0.80 x (70 - 0) = 56°F. | Appendix B, worked example |
| 5 | R-410A is required for all new residential heat pumps manufactured after January 1, 2025. | Reject | From that date EPA's rule limits new residential equipment to refrigerants with a global warming potential below 700, and R-410A's is about 2,088. | Appendix A, refrigerants |
| 6 | A 7 kW solar array in Minneapolis typically produces about 88,000 kWh per year. | Reject | The array produces about 8,800 kWh. The statement is off by a factor of ten. | Appendix C, worked example |
| 7 | Model energy codes such as the IECC are revised about every three years. | Accept | The IECC and ASHRAE 90.1 are each updated roughly every three years. | Appendix H, "How Codes Change" |
| 8 | Soil at a depth of 10 feet is exactly 55°F everywhere in the United States. | Reject | Steady ground temperature ranges from about 45°F to 75°F by climate zone, and in the Twin Cities it is in the mid-40s to low 50s. | Appendix E, opening section |
| 9 | At 1,000 ppm indoors and 420 ppm outdoors, a room needs about 18 cfm of outdoor air per resting person. | Accept | 0.0106 x 1,000,000 / (1,000 - 420) is about 18 cfm. | Appendix F, worked example |
| 10 | Because soil is clean, an earth tube cannot grow mold. | Reject | Cool soil can chill humid summer air below its dew point, and the condensate can feed mold. | Appendix E, earth tube warning |

**Provenance:** The statements are synthetic, written for this exercise. Each verdict and reason follows the worked examples and facts in Appendices A through F and H, and the sim must show the Check source after each answer.

**Rules:** The ten statements appear in the order above. Each is judged once. The score is the number of correct judgments out of 10. The score is 8 or more for mastery.

**Learner Activity:**

1. The learner reads a statement and chooses Accept or Reject.
2. The sim shows whether the choice was correct, the Why text, and the Check source for where to verify it.
3. The learner moves to the next statement.
4. After statement 10 the learner sees the score and the list of statements judged wrongly, each with its Check source, and can reopen any of them.
5. The learner should notice that four of the statements (3, 4, 6 and 9) can be checked with a one-line calculation, so checking a number is quicker than trusting it.

**Feedback:** Ten statements in fixed order, one attempt each. Correct: "Correct:" followed by the Why text and the Check source. Incorrect: "Not quite:" followed by the Why text and the Check source. A running count "n of 10" is shown, and the final score appears after statement 10.

**Starting State:** The first statement is shown under the heading "Written by an AI assistant" with the question "Accept or reject?"

**Chapter Anchors:** This appendix states that AI tools make errors with confidence and that every output affecting safety or code compliance needs review by a qualified person. The facts judged come from Appendices A through F and H.
```

## Related Resources

- [Appendix I: Digital Design, Prefabrication, Robotics, and AI](../../appendices/digital-design-prefabrication-ai/index.md)
