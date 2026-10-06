---
title: Foundation Systems
description: How shallow and deep foundations, slabs, foundation walls, basements, crawl spaces, retaining walls, and drainage transfer building loads safely to the soil in a cold climate.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:07:50
version: 1.10
---

# Foundation Systems

## Summary

The shallow and deep foundations, foundation walls, slabs, and retaining walls that transfer building loads to the soil. It builds on the prerequisite concepts from Chapters 6, 8, 9. After completing this chapter, students will be able to define, explain, and apply the 15 concepts listed below.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Foundation Systems | 19 |
| Shallow Foundations | 15 |
| Continuous Footings | 8 |
| Foundation Walls | 7 |
| Deep Foundations | 3 |
| Spread Footings | 2 |
| Basements | 2 |
| Slab-on-Grade | 2 |
| Footing Reinforcement | 1 |
| Mat Foundations | 1 |
| Piles | 1 |
| Drilled Piers | 1 |
| Crawl Spaces | 1 |
| Retaining Walls | 1 |
| Foundation Drainage | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Structural Loads and Load Paths](../06-structural-loads/index.md)
- [Chapter 8: Concrete and Masonry](../08-concrete-masonry/index.md)
- [Chapter 9: Site Work, Soils, and Groundwater](../09-site-soils/index.md)

---

!!! mascot-welcome "From Soil Report to Solid Footing"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Chapter 9 told you what the ground can carry. Now you get to decide how a building meets it, from a simple strip of concrete under a wall to a forest of piles driven through soft soil. By the end you will be able to read a foundation plan and explain why each piece is there. Let's build it right!

Chapter 6 traced loads from the roof down to the base of the structure, and Chapter 9 measured what the soil beneath can support. This chapter connects the two. We follow the same invented **Riverbend Youth Center** from Chapters 2 and 9, with the same illustrative soil: a silty sand with an allowable bearing capacity of about 2,000 psf, a frost depth of 42 in, and groundwater well below the foundation. Every load and quantity below is illustrative.

## Foundation Systems

A **foundation system** is the part of a building, partly or entirely below grade, that transfers the building's loads to the soil or rock. It does four jobs. It *supports* the structure by spreading load over enough soil area that the soil is not overstressed, as Chapter 9 showed. It *anchors* the structure against wind uplift and sliding. It *separates* the framing from ground moisture and frost. And it provides a level, durable base on which the rest of the building is built. A foundation also completes the load path from Chapter 6, since every force that enters the roof must leave through here.

Foundations fall into two families. **Shallow foundations** deliver load to soil close to the surface, and **deep foundations** reach down through weak soil to stronger soil or rock. The choice depends on four inputs: the size of the loads, the bearing capacity and uniformity of the soil, the frost depth and groundwater level, and the cost. Designers start with the cheapest option that works, which is almost always a shallow foundation, and move to a deeper solution only when the soil forces them to.

**Worked example: choosing the Riverbend foundation.** The structural engineer reviews the geotechnical report. Silty sand with an allowable bearing of 2,000 psf begins 4 ft below grade, and groundwater is 12 ft down. The loads are modest for a one-story, wood-framed building with glulam beams. Every input points to shallow footings. If the report had instead found 15 ft of soft peat above firm sand, shallow footings would have settled badly, and the engineer would have recommended piles that pass through the peat. The decision follows the soil, which is why Chapter 9 came first.

#### Diagram: Foundation Type Selector


<iframe src="../../sims/foundation-type-selector/main.html" width="100%" height="587px" scrolling="no"></iframe>
[Run Foundation Type Selector Fullscreen](../../sims/foundation-type-selector/main.html)

<details markdown="1">
<summary>Foundation Type Selector</summary>
Type: microsim
**sim-id:** foundation-type-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) which foundation type best fits a given combination of soil, load, water, and frost conditions, and will justify (Bloom Level 5, Evaluate) the choice with the rule that applies.

Visual: A cross-section of a ground profile with up to three soil layers whose depth and type the user can change, with a building outline above it. Beneath the profile, a row of foundation icons (spread footing, continuous footing, mat, driven pile, drilled pier) light up green when suitable, yellow when marginal, and red when unsuitable. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown for the top soil layer (firm sand, soft clay, peat, gravel) and a slider for its thickness from 0 to 25 ft. A slider for column load from 10 to 400 kips. A checkbox for "high groundwater." A dropdown for frost depth (none, 42 in, 60 in). A "Riverbend defaults" button and a "Soft peat site" button.

Interactions: Hovering over an icon shows the foundation's definition and the main reason it was rated green, yellow, or red. Clicking an icon opens an infobox with a typical use and one cost or constructability concern. A justification line beneath the profile restates the governing rule, such as "soft layer deeper than 10 ft, so load must reach firm soil."

Default state: Riverbend defaults, with spread and continuous footings green.

Implementation: p5.js with built-in select, slider, checkbox, and buttons, a rule-based rating function, and a responsive canvas.
</details>

!!! mascot-thinking "A Foundation Doesn't Hold the Building Up"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Soil can only push back with so much pressure per square foot, so a foundation is really a load-spreading device. Ask of every foundation element, "How much soil area does this give the load to push against?"

## Shallow Foundations

**Shallow foundations**, also called spread foundations, carry load to the soil near the surface through the bearing area of a concrete element called a *footing*. Each footing is wider than the wall or column above it, and the extra width lets the load spread over a larger area of soil. The three common shallow types are the *spread footing* under a single column, the *continuous footing* under a wall, and the *mat foundation* under a whole building. The table below summarizes them. Each is explained in its own section that follows.

| Type | Supports | Typical use |
|------|----------|-------------|
| Spread footing | One column | Columns of a steel or glulam frame |
| Continuous footing | A line of wall | Exterior and interior bearing walls |
| Mat foundation | The whole building | Heavy loads or weak soil |

The word *shallow* describes how the load reaches the soil and not how deep the concrete sits. In Minneapolis, the bottom of an exterior footing must be below the frost depth, commonly 42 in, so even a "shallow" footing sits more than 3 ft below the surface. Chapter 9 explained that freezing soil heaves, so a footing placed above the frost depth would be lifted each winter and drop back each spring.

**Worked example: bearing versus frost.** Riverbend's silty sand is strong enough to support a footing at 2 ft, but the building code requires exterior footings to bear at 42 in below finished grade. The frost requirement therefore sets the depth, and the bearing requirement sets the width. A designer must satisfy both. An interior footing in the heated building is protected from frost by the warm space above it, so the frost rule may not apply there, although soil conditions still do.

!!! mascot-warning "Watch Out: Shallow Does Not Mean Above the Frost Line"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A footing set at the depth that merely reaches good soil can still be inside the zone that freezes, and then it will heave. Check the frost depth requirement first, and then check bearing. The deeper of the two governs.

## Spread Footings

A **spread footing** is an isolated pad of concrete, usually square, that supports a single column and spreads its load over the soil. The required area is the column load divided by the allowable bearing capacity, as in the Chapter 9 sizing example. Riverbend's 40 kip column on 2,000 psf soil needs 20 ft², so a footing 4 ft 6 in square (20.25 ft²) carries it. Spread footings are common under steel columns and under the posts that support glulam beams, where loads are concentrated at points instead of spread along walls. A short concrete *pier* often rises from the footing to lift the column base above the floor and moisture. Spread footings are also used for isolated loads such as a canopy post or a rooftop unit support, and each must still reach below frost depth if it is exterior.

## Continuous Footings

A **continuous footing**, also called a strip footing, is a long, narrow concrete strip under a loadbearing wall, running the length of the wall. Its job is to convert the wall's *line load*, which is the weight per linear foot of wall, into a pressure the soil can carry. Because the footing has a uniform cross-section, we can analyze a 1 ft slice of it. The required width equals the line load divided by the allowable pressure:

\[ b = \frac{w}{q_{\text{allow}}} \]

where \( b \) is the footing width in feet, \( w \) is the line load in pounds per linear foot (plf), and \( q_{\text{allow}} \) is the allowable bearing capacity in psf. Footing thickness is set separately, commonly 8 in or more for a light-frame building, so the footing is stiff enough to spread the load without cracking.

**Worked example: the Riverbend perimeter footing.** Assume the exterior wall and roof deliver 2,400 plf (an illustrative value that includes snow). On 2,000 psf soil, \( b = 2{,}400 / 2{,}000 = 1.2 \) ft, which is 14.4 in, rounded up to 16 in. On weaker 1,500 psf clay the width would be \( 2{,}400 / 1{,}500 = 1.6 \) ft, or 19.2 in, rounded to 20 in. The Riverbend perimeter is \( 2 \times (120 + 75) = 390 \) ft, so a 16 in wide, 8 in thick footing needs \( (16/12) \times (8/12) \times 390 = 347 \) ft³, or about 12.8 yd³ of concrete, before the footings under columns and the thickened areas are counted.

#### Diagram: Foundation Cross-Section Explorer


<iframe src="../../sims/foundation-cross-section-explorer/main.html" width="100%" height="552px" scrolling="no"></iframe>
[Run Foundation Cross-Section Explorer Fullscreen](../../sims/foundation-cross-section-explorer/main.html)

<details markdown="1">
<summary>Foundation Cross-Section Explorer</summary>
Type: infographic
**sim-id:** foundation-cross-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the parts of a typical cold-climate foundation and explain (Bloom Level 2, Understand) the job of each part.

Visual: A cross-section of a Riverbend exterior wall with the following parts drawn to scale and labeled by number: continuous footing, footing reinforcement, foundation wall, anchor bolt and sill plate, slab-on-grade, gravel base, vapor retarder, perimeter drain pipe in gravel, backfill, finished grade sloped away, frost depth line at 42 in. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown to switch the cross-section between slab-on-grade, crawl space, and basement. A checkbox "Show frost line." A "Show loads" toggle that draws arrows for the load path from the wall to the soil.

Interactions: Hovering over a part highlights it and shows its name. Clicking a part opens an infobox with its function, a typical dimension (marked "typical" and not required), and the section of this chapter where it is explained. Changing the dropdown rebuilds the cross-section and highlights the parts that are new.

Default state: Slab-on-grade, frost line shown, no loads.

Implementation: p5.js with a built-in select and checkboxes, region hit-testing for clicks, and a responsive canvas.
</details>

## Footing Reinforcement

**Footing reinforcement** is steel bar embedded in a footing to carry tension. Chapter 8 explained that concrete is strong in compression but weak in tension. A footing loaded from above and pushed up by soil bends like an upside-down cantilever, and the bottom face is in tension, so bars are placed near the bottom. Spread footings usually contain a two-way grid of bars. Light continuous footings often use a pair of continuous longitudinal bars for crack control and for tying the footing together over soft spots. Bars need *cover*, a layer of concrete between the steel and the soil, commonly 3 in where concrete is cast directly against earth, to protect the steel from corrosion.

!!! mascot-tip "Beau's Tip: Read the Footing Schedule First"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    On a foundation plan, find the footing schedule, a table that lists each footing tag (F1, F2, and so on) with its size, thickness, and bars. Then follow each tag on the plan, and you can check the whole foundation without hunting through the notes.

## Mat Foundations

A **mat foundation**, or raft, is a thick, continuous slab that spreads the entire building's load across its whole footprint. It is chosen when the soil is weak, when column loads are heavy, or when individual footings would grow so large that they nearly touch. A common rule of thumb is that if the footings would cover about half the building area, a mat becomes economical. A mat also resists differential settlement, because the whole slab moves together, and it is common for tall or heavily loaded buildings. The tradeoff is cost, since a mat uses much more concrete and reinforcing steel than isolated footings. Because it also forms the floor, a mat can sometimes replace both the footings and the slab, which recovers part of that cost.

## Deep Foundations

**Deep foundations** transfer load to soil or rock far below the surface, past weak layers that cannot carry the building. They are chosen when the upper soil is soft peat or loose fill, or when loads are too heavy for shallow footings. A deep foundation resists load in two ways. *End bearing* is the load carried by the tip pressing on firm soil or rock, and *skin friction* is the load carried by friction along the sides of the element. A *pile cap*, a concrete block cast over a group of piles, ties them together and receives the column load. The two main forms are piles and drilled piers.

A **pile** is a long, slender column installed by driving or screwing it into the ground. Common types are steel H-piles and pipe piles, precast concrete piles, and timber piles. Driving makes noise and vibration, which affects neighbors, so a crew may choose a quieter type in a dense city.

A **drilled pier**, also called a drilled shaft or caisson, is formed by drilling a hole, placing a reinforcing steel cage, and filling the hole with concrete. A flared base, called a *bell*, can be cut at the bottom to increase the end-bearing area. Drilled piers can be made large enough to carry a single heavy column, and drilling is less noisy than driving. The table below contrasts the two.

| Feature | Driven pile | Drilled pier |
|---------|-------------|--------------|
| Installation | Hammered, vibrated, or screwed into the ground | Drilled hole filled with concrete |
| Typical capacity | Moderate; used in groups under a pile cap | Large; often one per column |
| Main concern | Noise and vibration | Caving soil and water in the hole |
| Verification | Blows per foot at the end of driving | Inspection of the open hole before pouring |

Shafts must be carefully inspected before concrete is placed, because groundwater and caving soil can contaminate the concrete.

## Slab-on-Grade

A **slab-on-grade** is a concrete floor slab placed directly on the ground, usually inside the foundation walls or on a thickened edge. It is the most economical floor for a building without a basement, and it is the floor of Riverbend. A typical section, from the bottom up, has four layers.

1. **Compacted subgrade.** The native soil, with topsoil and organic material removed.
2. **Granular base.** Compacted crushed stone or sand, commonly 4 in or more, which gives uniform support and breaks the capillary rise of groundwater.
3. **Vapor retarder.** A sheet of polyethylene, commonly 10 mil thick, that slows moisture moving up into the slab.
4. **Concrete slab.** Commonly at least 4 in thick.

Welded wire or fiber reinforcement controls cracking, and *control joints* saw-cut into the slab make cracks occur in straight lines. In a cold climate, the slab edge and sometimes the entire slab is insulated to keep the floor warm, a topic Chapter 11 develops.

A **heated slab on grade** adds two more layers to this section. A sheet of rigid foam insulation under the slab keeps the heat of a radiant floor from draining into the ground, and a thin sand cushion under the vapor retarder protects the sheet from sharp stone. The MicroSim below shows the whole stack from the heated room down to the soil. Predict what each layer stops, then leave a layer out and check your prediction.

#### Diagram: Heated Slab on Grade

<iframe src="../../sims/heated-slab-on-grade-layers/main.html" width="100%" height="836px" scrolling="no"></iframe>

[Run the Heated Slab on Grade MicroSim fullscreen](../../sims/heated-slab-on-grade-layers/main.html){ .md-button }

<details markdown="1">
<summary>Heated Slab on Grade</summary>
Type: infographic
**sim-id:** heated-slab-on-grade-layers<br/>
**Library:** p5.js<br/>
**Status:** Built

Learning objective: Students will identify (Bloom Level 1, Remember) the layers under and in a heated slab-on-grade floor and will predict (Bloom Level 2, Understand) how ground water, water vapor, and heat move when the gravel, vapor retarder, or foam is left out.
</details>

## Foundation Walls

A **foundation wall** is the wall that rises from the footing to the floor framing and holds back the soil around a basement or crawl space. It carries the vertical load of the wall above and also resists the lateral pressure of the soil against its outside face. Foundation walls are commonly cast-in-place concrete, as described in Chapter 8, or concrete masonry units (CMU) with grout and reinforcing. Walls of 8 in or more are common. The sill plate, the first wood member of the framing, is anchored to the top of the wall with anchor bolts, commonly spaced about 6 ft apart, so that wind cannot lift the framing off the foundation.

Engineers treat soil pressure like a fluid whose pressure grows linearly with depth. An *equivalent fluid pressure* gives the unit weight of an imaginary liquid that would push the same way. For a wall of height \( h \) and an equivalent fluid pressure \( \gamma_e \), the pressure at the base is \( \gamma_e h \), and the total force per foot of wall is the area of the triangle:

\[ F = \frac{1}{2} \gamma_e h^2 \]

The resultant acts at one third of the height above the base.

**Worked example: an 8 ft basement wall.** Take \( \gamma_e = 45 \) pcf (an illustrative value for a moderate soil). The pressure at the base is \( 45 \times 8 = 360 \) psf, the force is \( 0.5 \times 45 \times 8^2 = 1{,}440 \) lb per foot of wall, and it acts \( 8/3 = 2.67 \) ft above the base. Now suppose drainage fails and water fills the backfill to full height. Water alone gives \( 62.4 \times 8 = 499 \) psf at the base and \( 0.5 \times 62.4 \times 8^2 = 1{,}997 \) lb per foot, which is already more than the drained soil, and the soil still adds its own pressure. The wall that was safe with drainage can crack without it.

#### Diagram: Basement Wall Soil Pressure Explorer


<iframe src="../../sims/foundation-wall-lateral-pressure-explorer/main.html" width="100%" height="577px" scrolling="no"></iframe>
[Run Basement Wall Soil Pressure Explorer Fullscreen](../../sims/foundation-wall-lateral-pressure-explorer/main.html)

<details markdown="1">
<summary>Basement Wall Soil Pressure Explorer</summary>
Type: microsim
**sim-id:** foundation-wall-lateral-pressure-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the lateral force on a foundation or retaining wall and will analyze (Bloom Level 4, Analyze) how wall height and water in the backfill change it.

Visual: A cross-section of a wall with soil on one side. A triangular pressure diagram is drawn against the wall, with arrows whose length grows with depth. A force readout and a resultant arrow at one third of the height are shown. A second, lighter triangle appears when water is added. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A slider for wall height from 4 to 14 ft. A dropdown for backfill (clean gravel at 30 pcf, silty sand at 45 pcf, clay at 60 pcf; labeled "illustrative"). A checkbox "Water fills the backfill." A checkbox "Add 100 psf surcharge" for a parking lot or driveway beside the wall.

Interactions: Hovering over the pressure triangle shows the pressure at that depth. A readout shows base pressure, force per foot, and the height of the resultant. A message compares the force with and without water and explains what a perimeter drain does.

Default state: 8 ft, silty sand, dry, force of 1,440 lb per foot.

Implementation: p5.js with built-in slider, select, and checkboxes, and a responsive canvas.
</details>

!!! mascot-warning "Watch Out: Don't Backfill Before the Floor Is On"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A basement wall is designed to be braced by the floor framing at the top, and an unbraced wall can crack or tip when soil is piled against it. Wait until the floor framing or slab is in place and the concrete has gained strength, and backfill in even layers on both sides.

## Basements

A **basement** is a story that is partly or fully below grade, enclosed by foundation walls. In cold climates, basements are common because the footings must go deep for frost anyway, so the added excavation yields usable space for little more foundation cost. A basement adds living or storage space, houses mechanical equipment, and keeps the floor above the cold ground. It also takes on groundwater, radon, and moisture problems that a slab does not face. A bedroom or other habitable space in the basement must typically have an emergency escape opening, such as an *egress window* that is large enough to climb through, and the foundation wall, drainage, and waterproofing must be designed together, as the next sections show.

## Crawl Spaces

A **crawl space** is a shallow, unfinished space beneath the first floor, usually 18 to 48 in high, enclosed by short foundation walls. It provides access to plumbing and wiring and keeps the floor above the ground. The traditional crawl space has vents to the outside, but in cold climates the vents allow cold air that chills the floor and warm, moist summer air that condenses on cool surfaces. Modern practice is often to seal the crawl space, cover the ground with a heavy polyethylene sheet, insulate the walls instead of the floor, and condition the space. Chapter 4 explained how moisture and air movement cause the problems that a sealed crawl space avoids. The table below compares the three ways a floor can meet the ground.

| Option | Space created | Advantages | Cold-climate concerns |
|--------|---------------|------------|-----------------------|
| Slab-on-grade | None | Lowest cost, one pour | Cold floor edge, needs edge insulation |
| Crawl space | 18 to 48 in of low access space | Access to utilities, floor above ground | Moisture, air leakage, insulation choices |
| Basement | Full-height story | Usable space, deep frost-protected footing | Groundwater, radon, waterproofing, egress |

## Retaining Walls

A **retaining wall** is a wall whose main job is to hold back soil at a change in ground level, such as at a loading dock, a sunken entry, or a terraced hillside. It resists the same lateral soil pressure that a basement wall does, but it has no floor to brace it at the top, so it stands on its own. A *gravity wall* resists by its own weight, a *cantilever wall* is a concrete stem fixed to a wide base slab that holds soil on top of it, and wall height beyond about 4 ft is commonly designed by an engineer and built under a permit. The pressure calculation above applies, and the force grows with the square of height, so doubling the height quadruples the force. Like basement walls, retaining walls need drainage behind them, so that water does not add its pressure.

## Foundation Drainage

**Foundation drainage** is the system that removes water from around a foundation before it can build pressure or enter the building. Surface water is first directed away by the grading from Chapter 9. Below grade, a *perimeter drain*, also called a footing drain or drain tile, is a perforated pipe laid in washed gravel beside the footing, wrapped in fabric to keep soil out, and sloped to a sump or to daylight. Gravel or a *drainage board* against the wall lets water fall to the pipe. A *sump pump* in a pit lifts collected water out when gravity cannot carry it. Drainage works with the waterproofing that Chapter 11 describes: drainage lowers the water level and pressure, and waterproofing resists what remains.

!!! mascot-celebration "You Can Follow the Load to the Soil"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now size a continuous footing from a line load and a spread footing from a column load, choose between shallow and deep foundations, and calculate the lateral soil force on a basement wall. You also know how slabs, crawl spaces, retaining walls, and perimeter drains finish the job. The load path now ends where it should, on the soil.

## Key Takeaways

- A foundation system supports, anchors, and separates the structure from the ground. Shallow foundations bear near the surface, and deep foundations reach firm soil or rock below weak layers.
- Required footing area is load divided by allowable bearing capacity. Spread footings carry columns, and continuous footings carry walls with width equal to line load divided by allowable pressure.
- In Minnesota, exterior footings must reach below frost depth, commonly 42 in, so a "shallow" footing is still well below the surface.
- Footing reinforcement carries tension in the bottom of a footing and needs concrete cover, and mat foundations spread the whole building's load when soil is weak or loads are heavy.
- Piles and drilled piers carry load by end bearing and skin friction through soft layers.
- A slab-on-grade needs a compacted granular base, a vapor retarder, and edge insulation in a cold climate.
- Foundation and retaining walls resist lateral soil pressure that grows with the square of height, and water in the backfill adds a load of its own, which in the 8 ft example is 1,997 lb per foot of wall from the water alone against 1,440 lb per foot for the drained soil.
- Basements and crawl spaces add usable or serviceable space but require drainage, moisture control, and, for crawl spaces, a decision to seal and condition.
- Foundation drainage lowers water pressure around the foundation and works together with the waterproofing in Chapter 11.

[See Annotated References](./references.md)
