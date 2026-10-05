---
title: "Appendix G: Mass Timber and Low-Carbon Materials"
description: "How mass timber code provisions, low-carbon concrete, and environmental product declarations are changing structural material choices."
generated_by: claude skill chapter-content-generator
date: 2026-10-05 08:31:02
version: 1.11
last_reviewed: 2026-10-05
rate_of_change: high
---

# Appendix G: Mass Timber and Low-Carbon Materials

## Summary

How mass timber code provisions, low-carbon concrete, and environmental product declarations are changing structural material choices. After completing this appendix, students will be able to define, explain, and apply the 9 concepts listed below.

## Concepts Covered

This appendix covers the following 9 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Low-Carbon Concrete | 2 |
| Type IV Mass Timber Construction | 1 |
| Timber Charring | 1 |
| Mass Timber Moisture Protection | 1 |
| Warm Roof Assembly | 1 |
| Carbon Mineralization | 1 |
| Biogenic Carbon | 1 |
| Buy Clean Procurement | 1 |
| Low-Carbon Steel | 1 |

## Prerequisites

This appendix builds on concepts from these parts of the book:

- [Chapter 5: Properties of Building Materials](../../chapters/05-material-properties/index.md): Fire Resistance
- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md): Structural Steel, Wood Moisture Content
- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md): Concrete
- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md): Thermal Control Layer, Vapor Control Layer
- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md): Roof Assemblies
- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md): Construction Types
- [Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md): Carbon Sequestration, Cement Substitutes (SCMs), Embodied Carbon, Mass Timber, Product Declarations (EPD)

---

!!! mascot-welcome "Tall Buildings Made of Trees"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Wood used to top out at a few stories, and now code-approved timber buildings reach into the high teens. We will look at what changed in the code, what did not change in the fire physics, and how designers now count carbon. Let's build it right!

Chapter 7 introduced cross-laminated timber and glulam, Chapter 8 covered concrete, and Chapter 20 explained embodied carbon and life-cycle assessment. This appendix follows how quickly the choices among them are shifting.

## Mass Timber in the Code

The 2021 International Building Code added three construction types for tall mass timber buildings. Type IV-A allows up to 18 stories and 270 feet, and Types IV-B and IV-C allow progressively less height and area, with the exact limits depending on the occupancy.[^1] The taller types require fire-resistive protection of the timber, including an encapsulation layer, and a minimum one-inch noncombustible topping on floors. Local jurisdictions adopt code editions on their own schedules, so which types are available depends on where the building is. Chapter 17 explains the adoption chain.

## The Physics That Does Not Change

Large timber members resist fire by **charring**. The outer layer burns and forms an insulating char, and the wood inside the char stays cool and keeps its strength. The depth of char grows at a roughly steady rate, commonly taken as about 1.5 inches per hour for design.

**Worked example: char depth for a two-hour rating.** After two hours of fire exposure, the char depth is about \( 1.5 \times 2 = 3 \) inches on each exposed face. The designer must size the beam or column so that the section remaining after losing that depth, and a thin additional layer of heat-weakened wood, still carries the load. This is why mass timber members look oversized compared with steel of the same capacity. The [Glulam Char Section Explorer](../../sims/glulam-char-section-explorer/index.md) lets you try it.

The next MicroSim is the Glulam Char Section Explorer from Chapter 18, which already lets you apply the char rate to a real section.

#### Diagram: Glulam Char Section Explorer

<iframe src="../../sims/glulam-char-section-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>

[Run the Glulam Char Section Explorer MicroSim fullscreen](../../sims/glulam-char-section-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Glulam Char Section Explorer (reused MicroSim)</summary>
Type: microsim
**sim-id:** glulam-char-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Reused<br/>
**Source:** https://dmccreary.github.io/science-of-the-built-envrionment/sims/glulam-char-section-explorer/<br/>
**Source Repo:** https://github.com/dmccreary/science-of-the-built-envrionment<br/>
**Bloom Level:** Apply<br/>
**Bloom Verb:** calculate<br/>
**Learning Objective:** The learner will calculate the remaining section and section modulus of a timber beam after a given fire exposure and explain why larger timber members resist fire better than small ones.

Reused from this book's own MicroSims (Chapter 18), which already teach the char rate used here.
</details>

## Mass Timber and Moisture

Wood is durable when it stays dry. As Chapter 21 explains, wood that stays above about 20 percent moisture content for long periods can decay. A **cross-laminated timber (CLT)** roof deck is a thick, solid panel that absorbs water during construction and dries slowly afterward, so the roof assembly is designed to keep it warm and dry. In a **warm roof**, the insulation sits above the deck, so the deck stays near room temperature all winter. A **vapor control layer** is a membrane directly on top of the deck that stops room moisture from rising into the insulation, and on a CLT roof it also sheds rain during construction before the final roof membrane goes on. The **dew point** is the temperature below which water vapor in the air condenses. A deck that stays warmer than the room air's dew point stays dry.

#### Diagram: CLT Warm Roof Assembly Explorer

<iframe src="../../sims/clt-warm-roof-assembly-explorer/main.html" width="100%" height="907px" scrolling="no"></iframe>

[Run the CLT Warm Roof Assembly Explorer MicroSim fullscreen](../../sims/clt-warm-roof-assembly-explorer/main.html){ .md-button }

<details markdown="1">
<summary>CLT Warm Roof Assembly Explorer</summary>
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
</details>

## Counting Carbon

The materials in a building carry **embodied carbon**, the greenhouse gas emitted to make, transport, and install them. Chapter 20 introduced the measure. Two things have changed about how it is counted.

- **Environmental product declarations (EPDs).** An EPD is a standardized, third-party-verified report of a product's life-cycle impacts. Manufacturers publish them, and designers use them to compare products on carbon as they compare them on strength and cost.
- **Procurement policies.** Some public owners and governments now set limits on the embodied carbon of materials they buy, a practice often called "buy clean."

Wood stores biogenic carbon, but the benefit depends on how the forest is managed, how the wood is used, and how it is accounted for, and standards for that accounting are still being refined.

## Low-Carbon Concrete and Steel

Cement is the largest source of concrete's carbon, so the main strategies reduce the cement in the mix or change what it is made of.

- **Supplementary cementitious materials.** Replacing part of the cement with fly ash, slag, or calcined clay lowers carbon, with changes to strength gain that the [Concrete Composition and Strength Gain Explorer](../../sims/concrete-composition-strength-gain-explorer/index.md) lets you see.
- **Blended and limestone cements.** Cements that incorporate ground limestone are becoming a standard product.
- **Carbon mineralization.** Some plants inject captured carbon dioxide into the mix, where it becomes a mineral.
- **Steel.** Electric-arc furnaces that melt scrap steel have a much lower carbon footprint than furnaces that make steel from ore, and the recycled-content figure of a product matters.

!!! mascot-thinking "Carbon Is Another Property to Specify"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Strength, stiffness, fire rating, cost, and now embodied carbon are all numbers on the same submittal. Think of an EPD as a data sheet that a designer reads alongside the others.

## What to Watch

- Code changes that extend mass timber heights, areas, and uses, and the fire tests behind them.
- Standards for measuring and reporting embodied carbon and for crediting biogenic carbon.
- State and federal procurement rules, and the supply of low-carbon products in the Upper Midwest.
- Durability and moisture performance of mass timber in Minnesota's climate, which Chapters 4 and 21 prepare you to evaluate.

## Connects To

- [Chapter 7: Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md)
- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
- [Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md)
- [Embodied Carbon Beam Comparison](../../sims/embodied-carbon-beam-comparison/index.md) MicroSim

## Key Takeaways

- The 2021 IBC created Types IV-A, IV-B, and IV-C, with Type IV-A allowing mass timber up to 18 stories and 270 feet.
- Large timber members resist fire by charring at a steady rate, so designers size them to keep strength after the char depth is lost.
- Embodied carbon is now reported through EPDs and increasingly used in purchasing; the fire and structural physics are unchanged.

## References

[^1]: WoodWorks. *Tall Wood Buildings in the 2021 IBC.* <https://www.woodworks.org/resources/tall-wood-buildings-in-the-2021-ibc-up-to-18-stories-of-mass-timber/>
