---
title: "CLT Warm Roof Assembly Explorer"
description: "Students predict what follows when each of the four layers of a cross-laminated timber warm roof is removed, then drag the outdoor temperature to see how the foam keeps the timber deck above the dew point."
image: /sims/clt-warm-roof-assembly-explorer/clt-warm-roof-assembly-explorer.png
og:image: /sims/clt-warm-roof-assembly-explorer/clt-warm-roof-assembly-explorer.png
twitter:image: /sims/clt-warm-roof-assembly-explorer/clt-warm-roof-assembly-explorer.png
social:
   cards: false
status: built
library: p5.js (layered assembly engine)
bloom_level: Understand
---

# CLT Warm Roof Assembly Explorer

<iframe src="main.html" width="100%" height="907" scrolling="no"></iframe>

[Run the CLT Warm Roof Assembly Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/clt-warm-roof-assembly-explorer/main.html" width="100%" height="907" scrolling="no"></iframe>
```

## Description

Students predict what follows when each of the four layers of a cross-laminated timber warm roof is removed, then drag the outdoor temperature to see how the foam keeps the timber deck above the dew point.

This MicroSim belongs to [Appendix G: Mass Timber and Low-Carbon Materials](../../appendices/mass-timber-low-carbon-materials/index.md). The numbers it uses are illustrative teaching values, and the sim labels them as such.

## How to Use

1. Read the roof from the outdoors at the top to the heated room at the bottom. Click a layer to read what it is and why it is there.
2. For each layer in order, choose the consequence you expect if it is removed, then press Commit and remove the layer.
3. Read whether your choice matched, look at where the dots now stop or pass, and press Restore the layer to continue.
4. After the fourth layer the boxes unlock. Move the outdoor temperature slider with all layers present, then untick Tapered foam and drag it again.

## Lesson Plan

**Learning objective:** Infer, for each layer removed from a cross-laminated timber warm roof, which consequence follows for rain, room vapor, or heat flow and the temperature of the timber deck.

**Bloom level:** Understand (infer)

**Suggested activities**

- Predict and test (10 min): Commit a consequence for each layer before removing it, then compare with the result.
- Find the threshold (5 min): With the foam removed, find the outdoor temperature below which the deck is flagged and explain it with the dew point.
- Compare with Chapter 13 (10 min): List the layers that match the warm roof in Chapter 13 and the one that differs.

**Assessment**

- Students name the layer that keeps rain out of the insulation and the layer that keeps room vapor out of it.
- Students explain why removing the foam, and not the membrane, drops the deck below the dew point.

## References

- [Appendix G: Mass Timber and Low-Carbon Materials](../../appendices/mass-timber-low-carbon-materials/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md)
- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
- [Cross-laminated timber (Wikipedia)](https://en.wikipedia.org/wiki/Cross-laminated_timber)
- [Dew point (Wikipedia)](https://en.wikipedia.org/wiki/Dew_point)

## Specification

The full specification below is extracted from
[Appendix G: Mass Timber and Low-Carbon Materials](../../appendices/mass-timber-low-carbon-materials/index.md).

```text
Type: microsim
**sim-id:** clt-warm-roof-assembly-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified<br/>
**Bloom Level:** Understand<br/>
**Bloom Verb:** infer<br/>
**Learning Objective:** The learner will infer, for each layer removed from a cross-laminated timber warm roof, which consequence follows for rain, room vapor, or heat flow and the temperature of the timber deck.

**Prerequisites:** cross-laminated timber, warm roof, vapor control layer, dew point, R-value, moisture content (all defined in this appendix above the block or in Chapters 4, 7 and 13).

**Evidence of Mastery:** For each of the four layers the learner commits to one of four listed consequences before removing the layer. A choice is correct when it matches the Consequence column in Content, and each consequence is correct for exactly one layer. Mastery is 3 of 4 correct on the first attempt. Using the temperature slider and the other controls afterward is exploration, not evidence.

**Misconceptions:** (1) The roof membrane keeps room moisture out of the insulation. (2) Removing insulation only costs energy and does not endanger the structure. (3) A timber deck dries out through the ceiling like a drywall ceiling.

**Instructional Rationale:** Inferring a consequence before removing a layer makes the learner reason from each layer's job to what fails without it, which is what an Understand-level objective asks for. Testing the guess against the drawing shows the answer immediately.

**Content:**

This sim is an assembly drawn as thickness-proportional layers from outside to inside. It is intended to be built with the layered-assembly-infographic skill, and the layer data below uses that skill's fields. The outside side is named "Outdoors" and the inside side "Heated room". Layers, outside to inside:

1. **Roof membrane.** Full name: single-ply roof membrane, 0.06 in thick. Thickness 0.06 in, hatch: membrane. What: a thin, welded sheet of synthetic rubber or plastic covers the whole roof. Why: it sheds rain and snowmelt and keeps water out of the insulation. Risk: a tear lets water into the insulation and onto the wood deck, which dries slowly. Stops: rain, vapor.
2. **Tapered foam.** Full name: tapered polyisocyanurate insulation, 5 in. Thickness 5 in, hatch: rigid, R-28. What: rigid foam boards cut to a slope so that water drains toward the roof drains. Why: it keeps the deck and the membrane below it warm, and it slopes the roof to drain. Risk: without it the deck runs cold, vapor condenses on the wood, and the roof loses its slope and ponds water. Slows: heat, vapor.
3. **Vapor control.** Full name: self-adhered membrane, 0.06 in. Thickness 0.06 in, hatch: membrane. What: a sticky, waterproof sheet bonded directly to the top of the timber deck. Why: it blocks room moisture from rising into the insulation, and it sheds rain during construction before the roof membrane goes on. Risk: moisture reaches the cold side of the insulation, and rain during construction soaks into the panels. Stops: vapor, rain.
4. **CLT deck.** Full name: cross-laminated timber roof deck, 6.875 in. Thickness 6.875 in, hatch: wood, R-8.6, sensitive to dew point. What: a solid panel of crosswise-glued lumber layers spans between beams and forms the roof structure and the ceiling. Why: it carries the roof loads and shows as a finished ceiling below. Risk: wood that stays wet above about 20 percent moisture content can decay, and a wet panel is slow to dry. Slows: vapor, heat.

Flows: rain (starts outdoors), room vapor (starts in the heated room), heat (starts in the heated room).

Temperature conditions: outdoor temperature slider from -20°F to 40°F in steps of 5°F, default -10°F. Room temperature fixed at 70°F. Dew point of the room air 37°F. Surface film resistances: 0.17 outside, 0.68 inside.

Consequences to choose from, one per layer:

| Layer removed | Consequence | Why (shown as feedback) |
|---|---|---|
| Roof membrane | Rain reaches the insulation and is stopped only at the vapor control layer | The roof membrane was the only layer built to keep rain out of the insulation. |
| Tapered foam | Heat loss rises about fourfold and the top of the timber deck falls below the dew point, so the deck is flagged | R drops from 37.5 to 9.5. At -10°F the deck's top surface falls from 50.2°F to -8.6°F, far below the 37°F dew point. |
| Vapor control | Room vapor passes through the deck into the insulation and stops under the roof membrane, where it can condense | The vapor control layer was the layer stopping vapor. Without it vapor is trapped under the cold roof membrane. |
| CLT deck | Heat loss rises about 30 percent and the structure loses its deck, which the drawing cannot show | R drops from 37.5 to 28.9. The structural role is lost, and the drawing shows only flows, so the learner must read the layer's information panel. |

**Provenance:** The 20 percent moisture content comes from Chapter 21. The layer thicknesses, R-values (R-28 for 5 in of foam, about R-1.25 per inch for the wood), the 37°F dew point (about 70°F air at 30 percent relative humidity) and the film resistances are illustrative teaching values, and the sim must label them "illustrative". The numbers in the Consequence table are computed from them.

**Rules:**

- Heat flow is steady-state, through the layers in series: total R = 0.17 + 28 + 8.6 + 0.68 = 37.45 with all layers present. Heat flux = (70 - outdoor temperature) / total R.
- At the default -10°F with all layers present, the deck's top surface is 50.2°F and its bottom surface is 68.5°F. The deck is flagged whenever any part of it is below the 37°F dew point. With the foam removed the top surface is -8.6°F.
- A layer that stops a flow blocks it completely while it is present. A layer that slows a flow lets a share of it through.
- The drawing shows which layers stop or slow each flow. It does not show flow rates, drainage, or the time that rain or vapor needs to cause damage.
- Removing a layer takes it out of the series and out of the drawing. The temperature profile is recomputed.

**Learner Activity:**

1. The learner sees the intact assembly at -10°F with rain stopped at the roof membrane and room vapor stopped at the vapor control layer.
2. For each layer in order, the learner chooses the consequence they expect, then unticks the layer, and the sim shows the result.
3. The sim reveals whether the choice matched, shows the Why text, and restores the layer before the next one.
4. After the four layers the learner moves the outdoor temperature slider from -20°F to 40°F with all layers present and should notice that the deck's temperature stays above the dew point across the whole range.
5. The learner removes the foam and drags the slider and should notice that the deck is flagged at every outdoor temperature below about 36°F.

**Feedback:** Four layers in fixed order, one attempt each. Correct: "Correct:" followed by the Why text. Incorrect: "Not quite:" followed by the Why text and the correct consequence. A running count "n of 4" is shown, and the final score appears after the fourth layer.

**Starting State:** The intact assembly at -10°F outdoors with the status line stating where rain and room vapor are stopped, under the question "Which layer protects the timber from which threat?"

**Chapter Anchors:** Appendix G states that wood above about 20 percent moisture content for long periods can decay, that a CLT roof deck absorbs water during construction and dries slowly, and that a warm roof keeps the deck near room temperature. Chapter 13 teaches the warm roof idea with a different deck.
```

## Related Resources

- [Appendix G: Mass Timber and Low-Carbon Materials](../../appendices/mass-timber-low-carbon-materials/index.md)
