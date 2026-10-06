---
title: Concrete and Masonry
description: How concrete is made, reinforced, placed, and cured, and how brick, block, stone, mortar, and grout are assembled into masonry walls.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:09:31
version: 1.10
---

# Concrete and Masonry

## Summary

The ingredients, mixing, placing, and reinforcing of concrete, and the units, mortar, and grout used in masonry construction. It builds on the prerequisite concepts from Chapters 1, 5, 6. After completing this chapter, students will be able to define, explain, and apply the 23 concepts listed below.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Concrete | 51 |
| Cement | 14 |
| Reinforcing Steel | 10 |
| Masonry | 10 |
| Aggregates | 9 |
| Water-Cement Ratio | 8 |
| Concrete Mix Design | 7 |
| Formwork | 7 |
| Reinforced Concrete | 7 |
| Concrete Placement | 6 |
| Cast-in-Place Concrete | 4 |
| Concrete Slabs | 3 |
| Mortar | 3 |
| Brick | 2 |
| Concrete Masonry Units | 2 |
| Grout | 2 |
| Curing | 1 |
| Prestressed Concrete | 1 |
| Precast Concrete | 1 |
| Reinforced Masonry | 1 |
| Stone Masonry | 1 |
| Control Joints | 1 |
| Expansion Joints | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 5: Properties of Building Materials](../05-material-properties/index.md)
- [Chapter 6: Structural Loads and Load Paths](../06-structural-loads/index.md)

---

!!! mascot-welcome "Rock That You Can Pour"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Concrete is the only major building material that starts out as a liquid and ends up as stone, and masonry turns small, humble units into walls that stand for centuries. Learn how both are made and you will be able to order a pour, read a mix, and spot the shortcuts that crack a slab. Let's build it right!

Chapter 6 traced loads down to the foundation, and Chapter 5 described how materials resist them. This chapter covers the two materials that most often make up the lower part of that load path and many walls above it: concrete and masonry. Both are strong in compression, meaning they resist being squeezed, and weak in tension, meaning they resist being stretched. Both are also heavy, durable, and non-combustible, and both depend on careful craft in the field, since mistakes made on the day of the pour or the day the wall goes up are hard to repair.

The examples return to the **Riverbend Youth Center**, with its 9,000 ft² footprint, and to a few simple structures built from it. All quantities, mixes, and capacities are illustrative. A real project follows the specifications written by the engineer and the standards of the American Concrete Institute (ACI), ASTM International, and The Masonry Society (TMS), together with the Minnesota State Building Code.

## Concrete

**Concrete** is a manufactured stone made of cement, water, and aggregates, with small amounts of added chemicals called admixtures. It starts as a plastic, pourable mixture that can be placed into any shape and then hardens into a rock-like solid. The cement and water form a paste that coats the aggregates, which are the sand and stone that make up most of the volume, and the paste binds them together when it hardens.

Engineers describe concrete's strength by its *compressive strength*, written \( f'_c \), which is the stress at which a standard test specimen crushes. The specimen is a cylinder 6 in. in diameter and 12 in. tall, tested at an age of 28 days. Building concrete commonly has \( f'_c \) between 3,000 and 5,000 psi, with 4,000 psi very common. Concrete's tensile strength is only about 10 percent of its compressive strength, so it cracks when stretched, and concrete members that bend or hang must be reinforced with steel, as discussed later in this chapter.

Concrete hardens by a chemical reaction called *hydration*, in which the cement combines with water to form interlocking crystals that bind the mixture. The reaction releases heat, begins within hours, and continues for weeks, as long as moisture and moderate temperatures are available. Hydration is not drying, which is why concrete can harden under water.

!!! mascot-thinking "Concrete Cures, It Doesn't Dry"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Water is an ingredient in concrete, not a solvent that has to leave before it can harden. Concrete that dries out too early stops gaining strength, which is why the goal after the pour is to keep the water in.

In Minnesota, concrete outdoors must survive freezing and thawing. Water in the tiny pores of the paste expands by about 9 percent when it freezes, which can flake the surface or crack the concrete. Concrete exposed to freezing weather is therefore *air-entrained*, which means it contains microscopic bubbles, commonly 5 to 7 percent of the volume, that give the freezing water room to expand. Deicing salts make the damage worse, which is why exposed Minnesota concrete also needs a low water-cement ratio, the subject of a section below.

Concrete's other properties explain where it is used. It is non-combustible and performs well in fire, which is why it protects steel and forms fire walls (Chapter 18). Its mass absorbs sound and stores heat (Chapter 3), and it resists water and soil chemistry well enough to be the standard foundation material. Its limitations are its weight, its brittleness, its tendency to crack as it shrinks, and the carbon emitted in making its cement (Chapter 20).

**Worked example: testing a cylinder.** A 6 in. cylinder has a cross-sectional area of \( \pi \times 3^2 = 28.3 \) in². If the concrete is designed for \( f'_c = 4{,}000 \) psi, the testing machine should crush the cylinder at

\[ 4{,}000\ \text{psi} \times 28.3\ \text{in}^2 \approx 113{,}000\ \text{lb} \]

or 113 kips. In tension, at about 10 percent of that strength, the same concrete fails at about 400 psi, or 11,300 lb across the same section. Strength builds over time. The table gives approximate fractions of the 28-day strength for moist-cured concrete, so a 4,000 psi mix is near 2,600 psi at 7 days. A cubic yard of this concrete (27 ft³) weighs about \( 27 \times 150 = 4{,}050 \) lb, or roughly two tons.

| Age | Approximate share of 28-day strength |
|-----|----------------------------------------|
| 3 days | 40% |
| 7 days | 65% |
| 14 days | 85% |
| 28 days | 100% |

#### Diagram: Concrete Composition and Strength Gain Explorer


<iframe src="../../sims/concrete-composition-strength-gain-explorer/main.html" width="100%" height="778px" scrolling="no"></iframe>
[Run Concrete Composition and Strength Gain Explorer Fullscreen](../../sims/concrete-composition-strength-gain-explorer/main.html)

<details markdown="1">
<summary>Concrete Composition and Strength Gain Explorer</summary>
Type: chart
**sim-id:** concrete-composition-strength-gain-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will describe (Bloom Level 2, Understand) the approximate volume proportions of the ingredients in concrete, and will predict (Bloom Level 3, Apply) the strength of a 4,000 psi mix at a given age under moist curing and under poor curing.

Visual: Two linked charts. On the left, a doughnut chart shows the volumes of aggregates, cement paste, water, and air in one cubic yard of concrete. On the right, a line chart of strength (psi) against age (0 to 28 days) shows the strength-gain curve. The charts are responsive to container width, with a height of 400 px.

Controls: A slider labeled "Specified strength f'c (psi)" (3,000 to 6,000) scales the strength curve. A slider labeled "Air content (%)" (0 to 8) changes the air slice of the doughnut chart. A toggle labeled "Curing" switches between "Moist-cured," "Cured 3 days only," and "Not cured." A slider labeled "Age (days)" moves a marker along the curve.

Interactions: Hovering over a doughnut slice shows the ingredient, its typical volume range, and its role in one sentence. The marker's readout shows the predicted strength in psi and the percentage of the 28-day value. Selecting "Not cured" flattens the curve after a few days and shows a note explaining why the surface dries and hydration stops. An indicator shows when the concrete is strong enough to strip wall forms, assuming a stripping strength of 1,000 psi.

Colors: Aggregates are gray, paste is tan, water is blue, and air is white with an outline. Curves for the three curing conditions use different line styles as well as colors.

Implementation: Chart.js with two canvas elements and DOM controls.
</details>

## Cement

**Cement** is the fine gray powder that, when mixed with water, binds the other ingredients of concrete together. The cement used in nearly all building concrete is *portland cement*, made by heating a carefully proportioned mix of limestone and clay in a rotary kiln to about 2,700 °F. The heat fuses the raw materials into hard nodules called *clinker*, which is ground with a little gypsum to control the set time. The resulting powder reacts with water in the hydration process described above. Cement is therefore the glue and not the product, so a sidewalk is concrete, never "cement."

Portland cement comes in standard types under ASTM C150, described in the table. Many suppliers also sell *blended cements*, in which part of the portland cement is replaced by industrial by-products such as fly ash or slag, which reduce cost and carbon emissions. Cement manufacture is energy-intensive and releases carbon dioxide from both the fuel and the limestone itself, so cement is typically the largest single source of the carbon in a concrete building, a theme of Chapter 20.

| Type | Common name | Typical reason to specify it |
|------|-------------|------------------------------|
| I | General purpose | Ordinary construction |
| II | Moderate sulfate resistance | Soils with some sulfate |
| III | High early strength | Cold-weather or fast-track work |
| IV | Low heat of hydration | Massive pours |
| V | High sulfate resistance | Severe sulfate exposure |

**Worked example: cement for the Riverbend slab.** Cement is sold by the 94 lb sack, and mixes are often described in sacks per cubic yard. A "six-sack" mix contains \( 6 \times 94 = 564 \) lb of cement per cubic yard. The Riverbend slab is about 150 yd³ with ordering allowance, as worked out in the placement section below, so the total is

\[ 150\ \text{yd}^3 \times 564\ \text{lb/yd}^3 = 84{,}600\ \text{lb} \approx 42\ \text{tons} \]

of cement. Cold weather slows hydration, so winter pours in Minnesota use heated materials, insulating blankets, or a high-early-strength mix.

## Aggregates

**Aggregates** are the granular materials, sand and gravel or crushed stone, that make up roughly 60 to 75 percent of the volume of concrete. They are not simply filler. They give the concrete its volume at low cost, resist wear, and limit the shrinkage that the paste would otherwise suffer. Aggregates are divided by size. *Fine aggregate* is sand that passes the No. 4 sieve, an opening of about 3/16 in. *Coarse aggregate* is gravel or crushed stone retained on that sieve, up to a maximum size chosen for the job.

Good aggregates are hard, clean, and *well graded*, meaning a mixture of sizes in which the small particles fill the spaces between the large ones. A well-graded mix needs less cement paste to fill the gaps, and it produces denser and cheaper concrete. Aggregates must also be durable in Minnesota's climate, because some stone with fine pores can crack when frozen and saturated, so suppliers test local sources.

The maximum aggregate size is limited by the form and the reinforcement. The common rule is that it must not exceed one-fifth of the narrowest dimension between the forms, three-quarters of the clear spacing between reinforcing bars, or one-third of the depth of a slab.

**Worked example: choosing a maximum aggregate size.** A foundation wall is 6 in. thick, with rebar placed so that the clear space between bars is 2 in., and the slab joined to it is 5 in. thick. The table applies the three limits.

| Limit | Rule | Result |
|-------|------|--------|
| Narrowest form dimension (6 in.) | One-fifth | 1.2 in. |
| Clear space between bars (2 in.) | Three-quarters | 1.5 in. |
| Slab depth (5 in.) | One-third | 1.67 in. |

The smallest result, 1.2 in., controls, so the mix uses stone with a nominal maximum size of 1 in. The next larger standard size, 1½ in., would risk jamming between the bars and leaving voids.

## Water-Cement Ratio

The **water-cement ratio** (w/c) is the mass of water in a batch of concrete divided by the mass of cement in the same batch. It is the most important single number in concrete. A lower ratio gives a stronger, denser, less permeable concrete that resists freezing, salts, and shrinkage cracking, and a higher ratio gives a weaker and more porous one. This is because the water that exceeds what the cement needs for hydration, which is only about 0.25 by mass, remains in the paste. When it leaves, the extra water forms tiny pores that weaken the concrete and let in moisture.

Why would anyone add more water than hydration needs? Because water makes concrete workable, so it flows into forms and around bars. The art of mix design, covered below, is to achieve workability with as little water as possible. Exposed concrete in Minnesota commonly needs a ratio of 0.45 or lower, set by the specifications according to the severity of the freezing exposure.

**Worked example: the cost of water at the chute.** A six-sack mix contains 564 lb of cement per cubic yard and is designed for \( w/c = 0.45 \). The water is \( 0.45 \times 564 = 254 \) lb, or \( 254 / 8.34 = 30.4 \) gal, since a gallon of water weighs 8.34 lb. A finisher who finds the mix stiff asks the driver to add 5 gal per cubic yard. The water becomes \( 30.4 + 5 = 35.4 \) gal, or 295 lb, and

\[ \frac{w}{c} = \frac{295}{564} = 0.52 \]

The ratio has risen from 0.45 to 0.52. The extra 5 gal makes the concrete easier to finish, but it lowers strength by several hundred psi, increases shrinkage, and makes a surface that is more likely to scale under deicing salts.

!!! mascot-warning "Don't Add Water at the Chute"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A stiff mix tempts crews to add water on site because it speeds finishing, but it raises the water-cement ratio and quietly weakens the slab. Instead, ask the supplier for a water-reducing admixture, which makes the same mix flow better without extra water, and follow the specification before any water is added.

## Concrete Mix Design

**Concrete mix design** is the process of choosing the proportions of cement, water, aggregates, and admixtures to meet the project's requirements for strength, workability, durability, and cost. It is usually carried out by the ready-mix supplier, and the mix is submitted to the engineer for review as a submittal, as described in Chapter 2. The mix is then checked by trial batches and by testing cylinders.

The mix must be workable enough to place. *Workability* is measured by the *slump test*, in which a cone-shaped mold is filled with fresh concrete, lifted off, and the drop of the concrete in inches is recorded. A stiff mix has a low slump and a runny one has a high slump, and a typical slab mix is around 4 in. *Admixtures* are chemicals added in small doses to change the properties of the concrete. The most common are air-entraining agents for freeze-thaw resistance, water reducers and plasticizers to improve flow without adding water, accelerators for cold weather, and retarders for hot weather. Fly ash and slag, called supplementary cementitious materials, are often added in place of some of the cement.

!!! mascot-encourage "Volume Bookkeeping Takes Practice"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Keeping track of pounds in one column and cubic feet in another is a classic stumbling block, and nearly everyone slips on it the first time. You have already handled unit conversions in earlier chapters, so treat this like a budget with a fixed total: every ingredient takes its share of the 27 ft³, and the aggregate gets whatever is left.

**Worked example: an absolute volume mix.** The *absolute volume method* is a bookkeeping rule: the solid volumes of all ingredients must add up to exactly 1 yd³, or 27 ft³. Each volume equals the mass divided by the specific gravity times 62.4 lb/ft³, the density of water. We use the six-sack mix at \( w/c = 0.45 \), 6 percent air, and an aggregate with specific gravity 2.65. The aggregate takes up whatever is left after the other ingredients.

| Ingredient | Mass (lb) | Specific gravity | Volume (ft³) |
|------------|-----------|------------------|--------------|
| Cement | 564 | 3.15 | 2.87 |
| Water | 254 | 1.00 | 4.07 |
| Air | 0 | none | 1.62 |
| Aggregates | 3,049 | 2.65 | 18.44 |
| **Total** | **3,867** | | **27.00** |

The aggregate volume is \( 27.00 - 2.87 - 4.07 - 1.62 = 18.44 \) ft³, which is 68 percent of the mix, and its mass is \( 18.44 \times 2.65 \times 62.4 = 3{,}049 \) lb. The finished concrete weighs \( 3{,}867 / 27 = 143 \) pcf, a realistic figure for air-entrained normal-weight concrete. In practice, the supplier also adjusts for the moisture already present in the aggregates.

#### Diagram: Water-Cement Ratio Explorer


<iframe src="../../sims/water-cement-ratio-explorer/main.html" width="100%" height="637px" scrolling="no"></iframe>
[Run Water-Cement Ratio Explorer Fullscreen](../../sims/water-cement-ratio-explorer/main.html)

<details markdown="1">
<summary>Water-Cement Ratio Explorer</summary>
Type: microsim
**sim-id:** water-cement-ratio-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will predict (Bloom Level 3, Apply) how changing the water-cement ratio changes the strength, permeability, and shrinkage of concrete, and will evaluate (Bloom Level 5, Evaluate) whether adding water at the chute is acceptable for a given specification.

Visual: A magnified cutaway of a concrete section showing aggregate particles, cement paste, and pores that grow in number and size as the water content increases. Beside it, three bars show relative strength, permeability, and shrinkage. A truck chute icon sits beside a gallon counter. The canvas follows the container width with a height of 460 px.

Controls: A slider labeled "Water-cement ratio" (0.30 to 0.65) with the cement content fixed at 564 lb per cubic yard. A button labeled "Add 5 gal at the chute" adds the extra water and recalculates the ratio. A drop-down labeled "Exposure" (indoor slab, exterior walk, parking structure) sets the specified maximum ratio.

Interactions: Dragging the slider redraws the pores and adjusts the three bars. A readout shows the water in gallons and pounds per cubic yard and the estimated strength range, labeled as illustrative. If the ratio exceeds the maximum for the selected exposure, the bars turn orange and a message states which property is at risk and suggests a water-reducing admixture. Hovering over a pore shows how it forms.

Colors: Aggregate is gray, paste is tan, pores are white with a dark outline, and the specification limit is a dashed line with a text label.

Implementation: p5.js with a responsive canvas, DOM slider, button, and drop-down.
</details>

## Reinforcing Steel

**Reinforcing steel**, usually called *rebar*, is steel bars placed in concrete to carry the tension that concrete cannot. Most rebar is *deformed*, which means it has ribs rolled into its surface so that concrete grips it, and it is typically ASTM A615 Grade 60, with a yield strength of 60 ksi. Bars are identified by a number equal to the diameter in eighths of an inch, so a #5 bar is 5/8 in. in diameter, and #8 is 1 in. The table lists the common sizes. Flat sheets of welded wire reinforcement are used in slabs. In places exposed to deicing salt, bars may be epoxy-coated, galvanized, or stainless to protect them from corrosion.

| Bar size | Diameter (in.) | Area (in²) | Weight (lb/ft) |
|----------|----------------|------------|----------------|
| #3 | 0.375 | 0.11 | 0.376 |
| #4 | 0.500 | 0.20 | 0.668 |
| #5 | 0.625 | 0.31 | 1.043 |
| #6 | 0.750 | 0.44 | 1.502 |
| #7 | 0.875 | 0.60 | 2.044 |
| #8 | 1.000 | 0.79 | 2.670 |

Rebar is held in position by plastic or wire supports called *chairs* so that it has the right *cover*, which is the thickness of concrete between the bar and the surface. Cover protects the steel from corrosion and fire. Requirements are commonly 3 in. where concrete is cast against soil and 1½ to 2 in. where exposed to weather, with less for interior members. Bars that are too close to the surface are a typical cause of rust stains and spalling.

**Worked example: what one #5 bar replaces.** A #5 bar has a cross-section of \( \pi \times 0.625^2 / 4 = 0.31 \) in². At its yield strength of 60 ksi it can carry \( 0.31 \times 60 = 18.6 \) kips of tension. To carry the same force, concrete with a tensile strength of 400 psi would need \( 18{,}600 / 400 = 46.5 \) in² of section, 150 times more. The steel, in other words, provides in a thin bar what the concrete cannot provide at all.

## Reinforced Concrete

**Reinforced concrete** is concrete that contains steel reinforcement, designed so that the two materials act together. The concrete resists compression, and the steel resists tension. The partnership works for three reasons. First, the ribs on deformed bars create a strong bond between steel and concrete. Second, the two materials expand and contract with temperature by almost the same amount, about 6 millionths per degree Fahrenheit, so they do not pull apart as the seasons change. Third, concrete is alkaline, and it forms a thin protective film on the steel that prevents rusting as long as the concrete stays sound.

Consider a simply supported beam. As Chapter 6 explained, the top is in compression and the bottom is in tension. Plain concrete cracks at the bottom at low load, so the engineer places rebar near the bottom face. The concrete cracks anyway, but the cracks are fine and are held tight by the steel, and the beam carries a load far beyond the cracking load. Additional bars called *stirrups* resist shear, and *ties* around vertical bars hold columns together.

!!! mascot-thinking "Concrete Squeezes, Steel Stretches"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of a beam as a pair of partners: the concrete on top does the squeezing and the steel on the bottom does the stretching. If you ever wonder where the rebar goes, find the part of the member that is being pulled.

**Worked example: sizing steel for a beam.** Suppose a 12 in. by 20 in. beam carries a bending moment of 80 kip-ft (a factored design moment, which already includes the load factors of Chapter 6). The distance from the compression face to the steel is about \( d = 17.5 \) in. The compression and tension forces form a couple separated by an internal lever arm of about \( 0.9d = 15.75 \) in. The required steel area is

\[ A_s = \frac{M}{\phi \, f_y \,(0.9d)} = \frac{80 \times 12}{0.9 \times 60 \times 15.75} = 1.13\ \text{in}^2 \]

where \( \phi = 0.9 \) is a strength reduction factor. From the bar table, two #7 bars give 1.20 in², which is adequate. The tension force in the steel at the factored moment is about \( 960 / 15.75 = 61 \) kips. This back-of-the-envelope calculation is the idea behind the engineer's design, which follows ACI 318 and checks shear, deflection, and crack control as well.

#### Diagram: Reinforced Concrete Beam Behavior Explorer


<iframe src="../../sims/reinforced-concrete-beam-behavior-explorer/main.html" width="100%" height="672px" scrolling="no"></iframe>
[Run Reinforced Concrete Beam Behavior Explorer Fullscreen](../../sims/reinforced-concrete-beam-behavior-explorer/main.html)

<details markdown="1">
<summary>Reinforced Concrete Beam Behavior Explorer</summary>
Type: microsim
**sim-id:** reinforced-concrete-beam-behavior-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) how the compression zone, tension zone, and reinforcement of a concrete beam share the bending load, and will predict (Bloom Level 3, Apply) where cracks and rebar belong for different support conditions.

Visual: A side view of a simply supported concrete beam with a load arrow at midspan, a deflected shape exaggerated for clarity, and an enlarged cross-section beneath it with the neutral axis, compression zone (shaded), and rebar dots. The canvas follows the container width with a height of 500 px.

Controls: A slider labeled "Load (kips)" increases the load from zero to failure. Radio buttons select "Plain concrete," "Rebar at the bottom," "Rebar at the top (wrong place)," and "Prestressed." A drop-down selects "Simple span" or "Cantilever" so the student can see that the tension face moves to the top.

Interactions: As the load rises, cracks appear in the tension zone and a readout shows the state: uncracked, cracked, steel yielding, and failed. Hovering over the cross-section labels tension and compression, and clicking the rebar opens an infobox with its area from the bar table and its force. In the "Plain concrete" case the beam fails suddenly at a low load, with a message explaining brittle failure. In the "Prestressed" case, the beam shows an upward camber and no cracking at moderate loads.

Colors: Compression zones are red, tension zones are blue, cracks are black, and rebar is dark gray. Zones are also labeled with plus and minus signs.

Implementation: p5.js with DOM controls and a responsive canvas.
</details>

### Prestressed Concrete

**Prestressed concrete** is concrete in which high-strength steel strands are stretched and anchored so that they squeeze the concrete before any service load arrives. The concrete is thereby kept in compression, so the loads it later carries must first overcome the squeeze before they can pull the concrete into tension and crack it. In *pretensioning*, strands are stretched between abutments in a plant, concrete is cast around them, and the strands are released when the concrete is strong enough. In *post-tensioning*, strands run in ducts through the concrete, and are stretched with jacks after the concrete has hardened. Prestressing allows longer spans and thinner slabs, as in parking structures and office floors. The strands hold a great deal of stored energy, so an unmarked post-tensioned slab must never be cut or drilled until the tendons have been located.

## Cast-in-Place Concrete

**Cast-in-place concrete** is concrete placed and cured in its final position in the building, in forms constructed on site. Footings, foundation walls, slabs on grade, and many floors and columns are cast in place. Its great advantage is that the pieces form a single continuous, *monolithic* structure, which allows connections that carry moment and shapes that no other material can make. The disadvantage is that it depends on weather, on the site's labor, and on time, since each pour must cure before it is loaded.

A cast-in-place element follows the same sequence of steps.

1. Prepare the subgrade or excavation.
2. Build and brace the forms.
3. Place the reinforcement and any embedded items, such as anchor bolts and sleeves.
4. Obtain inspection of the forms and reinforcement.
5. Place and consolidate the concrete.
6. Finish the exposed surfaces.
7. Cure the concrete, then strip the forms.

**Worked example: the Riverbend frost wall.** Suppose the Riverbend perimeter foundation is a continuous wall 8 in. thick and 4 ft tall, a depth chosen to reach below frost, in a ring of 390 ft, which is the perimeter of the 120 ft by 75 ft building. The concrete volume is

\[ 390\ \text{ft} \times 4\ \text{ft} \times \tfrac{8}{12}\ \text{ft} = 1{,}040\ \text{ft}^3 = 38.5\ \text{yd}^3 \]

The forms must touch both faces of the wall, an area of \( 390 \times 4 \times 2 = 3{,}120 \) ft², the equivalent of 97.5 plywood sheets, although the forms are normally used several times along the wall. The area of forms to be built is often a larger part of the labor than the concrete itself. Chapter 10 explains the frost-depth rules that determine the real depth.

### Formwork

**Formwork** is the temporary mold that holds fresh concrete in place until it has gained enough strength to stand alone. Forms are made of plywood on wood or steel framing, of reusable steel or aluminum panels, or of plastic. Forms must be accurate, tight enough to hold the paste, and strong enough to carry the weight and pressure of the fresh concrete. They also include the *ties* that hold the two faces together, the *braces* that hold them plumb, and the *shores* that support elevated slabs until the concrete can carry its own weight. The forms are stripped when the concrete reaches a specified strength, which may be a day or two for walls but longer for slabs. Formwork is often a major part of the cost of cast-in-place work, sometimes rivaling the concrete and steel combined. *Insulating concrete forms* (ICFs), which are foam blocks that remain in place as insulation, are used for some Minnesota basement and above-grade walls.

**Worked example: pressure on a wall form.** Fresh concrete behaves like a heavy liquid, so the pressure at the bottom of a deep pour is, at most, the unit weight times the depth. For an 8 ft wall pour, that upper bound is \( 150 \times 8 = 1{,}200 \) psf at the base, falling to zero at the top, and the resultant force on each foot of wall is \( \tfrac{1}{2} \times 1{,}200 \times 8 = 4{,}800 \) lb. A tie at the row 1 ft above the base, on a 2 ft by 2 ft grid, sees a pressure of \( 150 \times 7 = 1{,}050 \) psf over \( 4 \) ft², or \( 1{,}050 \times 4 = 4{,}200 \) lb. The ties must be rated for more than this, or spaced closer together near the bottom. Slower pours and cooler concrete reduce the actual pressure, but a form that is designed for less than the full fluid pressure is a form that can burst.

### Concrete Placement

**Concrete placement** is the work of delivering the fresh concrete to its forms, spreading it, consolidating it, and finishing it. Concrete usually arrives in ready-mix trucks and is discharged by chute, by pump through a hose, or by bucket and crane. It is generally discharged within about 90 minutes of mixing, because hydration has begun. It should be placed close to its final position, since dropping it from a great height or pushing it far can *segregate* it, which means that the stone separates from the paste.

After placement, the concrete is *consolidated*, usually by an internal vibrator that fluidizes the mix and releases trapped air so that the concrete fills the forms and surrounds the reinforcement. Under-vibration leaves voids called honeycombing, and over-vibration causes segregation. Slabs are then screeded to level, floated, and troweled to the specified finish. In winter the crew must keep the concrete from freezing, which can permanently damage it while it is still weak, until it reaches a minimum strength, commonly about 500 psi.

**Worked example: scheduling the Riverbend slab pour.** The slab is 5 in. thick over 9,000 ft². The table works through the volume, the order, and the pace of the pour, using an illustrative crew rate of 25 yd³ per hour and 10 yd³ per truck.

| Quantity | Calculation | Result |
|----------|-------------|--------|
| Slab volume | \( 9{,}000 \times (5/12) / 27 \) | 139 yd³ |
| Order, with 7% for uneven subgrade and spillage | \( 139 \times 1.07 \) | About 150 yd³ |
| Truckloads | \( 150 / 10 \) | 15 |
| Duration of the pour | \( 150 / 25 \) | 6 hours |
| Interval between trucks | \( 6 \times 60 / 15 \) | 24 minutes |

A late truck could leave a cold joint, while an early one leaves concrete waiting past its 90 minutes. This is the same pour whose coordination Chapter 2 described.

!!! mascot-tip "Walk the Forms Before the Pour"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before the first truck arrives, walk the whole pour with a checklist: forms clean and braced, rebar chaired at the right cover, sleeves and conduit in place, and inspections signed. Once the concrete is in, fixing a missed item means breaking it out.

### Curing

**Curing** is the practice of keeping freshly placed concrete moist and within a suitable temperature range so that hydration can continue and the concrete reaches its design strength and durability. Concrete cured poorly can end up with a weak, dusty surface that cracks and scales. Moist curing is commonly required for at least seven days. Methods include ponding water on a slab, covering it with wet burlap, sealing it with plastic sheeting, or spraying a *curing compound* that forms a film and holds water in. Hot, dry, or windy days can pull water from the surface faster than it rises from within, producing *plastic shrinkage cracks* within hours. In cold weather, insulated blankets and heated enclosures hold the temperature, since hydration slows sharply near freezing.

## Precast Concrete

**Precast concrete** is concrete cast in a plant, rather than at the building site, and then trucked to the job and lifted into place with a crane. Factory conditions give precise forms, controlled curing, and consistent quality regardless of weather, and many precast pieces are also prestressed. Common precast elements are hollow-core planks for floors and roofs, double-tee beams for parking structures, wall panels, beams, and columns. Precast pieces arrive ready to erect, which shortens the schedule, but they are limited by the sizes that can be shipped and lifted, and their *connections* between pieces are critical details, made by welded plates, bolts, or grouted joints. Tilt-up construction is a related method in which wall panels are cast flat on the building's own slab and then tilted upright.

## Concrete Slabs

A **concrete slab** is a flat, horizontal concrete member, usually 4 to 6 in. thick for floors on the ground, that serves as a floor or paving. A *slab on grade* rests directly on the soil. It sits on a compacted gravel base, with a vapor retarder to block ground moisture (Chapter 4) and, in cold climates, rigid insulation under the slab or at its edge to keep the ground from drawing away the heat (Chapters 10 and 11). Welded wire or fibers are sometimes added to control crack width, and the slab is divided by joints, described below. From the top down, a slab on grade at Riverbend would consist of the following layers.

1. The concrete slab itself, 5 in. thick in the Riverbend examples.
2. A vapor retarder sheet directly beneath the slab.
3. Rigid insulation, where the energy design calls for it.
4. A compacted granular base.
5. The compacted subgrade, which is the soil prepared during site work (Chapter 9).

A *suspended slab*, by contrast, spans between beams or walls and acts as a structural member, which makes reinforcement essential. Floor flatness and finish are specified numerically, because a slab that is not flat will show it under flooring.

## Masonry

**Masonry** is construction in which individual units, such as brick, concrete block, or stone, are laid by hand and bound together with mortar. Like concrete, masonry is strong in compression and weak in tension, and it is heavy, durable, and fire-resistant. Masonry walls serve in one of two roles. A *structural* (load-bearing) wall carries loads from the floors or roof above. A *veneer* is a thin facing of brick or stone attached to a structural backup, which carries only its own weight and is covered under cladding in Chapter 12.

Masonry vocabulary describes how the units are arranged. A horizontal layer of units is a *course*, a vertical layer of one unit thickness is a *wythe*, and the pattern in which the vertical joints are staggered from course to course is the *bond*. The commonest bond is *running bond*, with each unit centered over the joint below it. Masonry is designed on a module, so that dimensions work out in whole units. Its compressive strength is set by the unit and the mortar together and is written \( f'_m \), the strength of the assembled masonry, commonly in the range of 1,500 to 2,000 psi for concrete block walls.

**Worked example: a block wall.** A standard concrete block, the unit described under concrete masonry units below, has a face of 8 in. by 16 in. including the mortar joint, which is 128 in², or 0.889 ft². A 20 ft by 8 ft wall has an area of 160 ft², so it needs

\[ \frac{160\ \text{ft}^2}{0.889\ \text{ft}^2/\text{unit}} = 180\ \text{units} \]

which is 1.125 blocks per square foot. An ungrouted 8 in. wall of normal-weight hollow blocks weighs roughly 55 psf (an illustrative value), so this wall weighs about \( 160 \times 55 = 8{,}800 \) lb. Wall weight matters twice: as a dead load on the foundation in Chapter 6's terms, and as the mass that attracts seismic force.

### Brick

**Brick** is a masonry unit of fired clay, formed in a mold or extruded, and then baked in a kiln at high temperature. A *modular* brick measures about 3⅝ in. by 2¼ in. by 7⅝ in., and with its mortar joint it fits a nominal module of 4 in. by 2⅔ in. by 8 in. Brick is rated by weathering resistance, and Minnesota lies in the region where bricks exposed to the weather should be Grade SW, the severe weathering grade. Brick is used both as veneer and as structural masonry. White streaks on a brick wall, called *efflorescence*, are salts that moisture has carried to the surface, which is a sign that water is getting into the wall (Chapter 4).

**Quick calculation: bricks for an entry wall.** A modular brick face is \( 2.667 \times 8 = 21.3 \) in², so a square foot of wall needs \( 144 / 21.3 = 6.75 \) bricks. A 30 ft by 8 ft entry court wall has 240 ft² and needs \( 240 \times 6.75 = 1{,}620 \) bricks, or about 1,700 with a 5 percent allowance for breakage.

### Concrete Masonry Units

**Concrete masonry units** (CMUs), commonly called concrete blocks, are hollow or solid masonry units made of molded concrete. The standard unit is nominally 8 in. by 8 in. by 16 in., but the actual size is ⅜ in. less in each direction, so that it fits the module with its mortar joint. The hollow *cores* reduce the weight and can be filled with grout and rebar, and the thick sides of the block are called the *face shells*. CMUs come in widths from 4 to 12 in. and are specified by compressive strength, commonly about 2,000 psi on the net area. They are used for foundation walls, structural walls, fire walls, and as backup for veneer. Unlike clay brick, concrete units shrink slightly as they dry, which affects joint design.

### Mortar

**Mortar** is the plastic mixture of cementitious material, sand, and water that bonds masonry units and seals the joints between them. It is not meant to be as strong as the units. Standard mortar types under ASTM C270 are M, S, N, and O, in descending order of strength, from a minimum of 2,500 psi for Type M down to 350 psi for Type O. Type N is a common general-purpose mortar above ground, and Type S is used where higher bond or lateral strength is needed, such as below grade or in reinforced walls. A mortar that is a little weaker and more flexible than the units lets any cracking take place in the joint, which can be repaired by repointing rather than by replacing units. Joints are usually *tooled*, or compressed with a rounded tool, to make them dense and water-shedding.

| Type | Minimum compressive strength | Typical use |
|------|------------------------------|-------------|
| M | 2,500 psi | Below grade and heavy loads |
| S | 1,800 psi | Reinforced walls and high lateral loads |
| N | 750 psi | General above-grade work |
| O | 350 psi | Interior, non-load-bearing walls |

### Grout

**Grout** is a fluid, concrete-like mixture of cement, fine aggregate or pea gravel, and water that is poured into the cores of concrete blocks or the space between wythes to bond reinforcing steel and to add strength. Fine grout is used for narrow spaces, and coarse grout, which includes small stone, for wide ones, both specified under ASTM C476. Grout is much more fluid than concrete, commonly with a slump of 8 to 11 in., so that it flows into the narrow cores and around bars, and it is consolidated with a vibrator or by puddling. Grout is placed in lifts of limited height, so that the pressure does not blow out the block face shells.

### Reinforced Masonry

**Reinforced masonry** is masonry in which steel bars or wires are placed in grout-filled cells or joints, so that the wall can resist tension, bending, and shear. Its main parts are as follows.

- *Vertical bars*, commonly placed in cells at corners, at the sides of openings, and at regular spacing along the wall, and grouted into the cores.
- *Bond beams*, which are grouted courses with horizontal bars that tie the wall together.
- *Joint reinforcement*, ladder-shaped wire laid in the mortar joints to control cracking.

Unreinforced masonry is brittle and weak against sideways forces, so reinforced masonry is the standard way to make a masonry shear wall (Chapter 6) and is required where wind or seismic forces are significant.

### Stone Masonry

**Stone masonry** is masonry built of natural stone, which may be rough rubble laid in irregular courses or accurately cut *dimension stone* laid in regular courses. Historic buildings used very thick stone walls that carried load by weight alone. Modern buildings use stone mainly as a thin veneer anchored to a backup wall. Common building stones include granite, limestone, and sandstone, and Minnesota has quarried limestone and granite for buildings for generations. Stone weighs roughly 150 to 170 pcf, so veneer anchorage must be designed for the weight, and the stone must be chosen for its resistance to freezing when wet.

#### Diagram: Masonry Wall Assembly Explorer


<iframe src="../../sims/masonry-wall-assembly-explorer/main.html" width="100%" height="697px" scrolling="no"></iframe>
[Run Masonry Wall Assembly Explorer Fullscreen](../../sims/masonry-wall-assembly-explorer/main.html)

<details markdown="1">
<summary>Masonry Wall Assembly Explorer</summary>
Type: microsim
**sim-id:** masonry-wall-assembly-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the parts of a masonry wall, including units, mortar, grout, reinforcement, and joints, and will compare (Bloom Level 4, Analyze) an unreinforced wall with a reinforced one under lateral load.

Visual: An elevation and cutaway of a concrete block wall, with a clay brick veneer option, showing courses, bond, mortar joints, cores, vertical bars, a bond beam, joint reinforcement, a control joint, and an expansion joint in the brick. The canvas follows the container width with a height of 520 px.

Controls: Radio buttons labeled "Unreinforced CMU," "Reinforced CMU," "Brick veneer on CMU," and "Stone veneer" switch the assembly. A slider labeled "Wind pressure (psf)" applies sideways load. A checkbox labeled "Grout the cells" fills the cores. A drop-down labeled "Mortar type" (M, S, N, O) changes the joint color and the strength readout.

Interactions: Hovering over a part highlights it and shows its name. Clicking a part opens an infobox with its function, its size, and the standard that governs it. As the wind pressure rises, the unreinforced wall shows horizontal cracks in the mortar joints at a low load, while the reinforced wall shows no cracking until a much higher load, with a text explanation of the steel's role. A button labeled "Count the units" computes units and bricks per square foot for the wall dimensions chosen with two sliders.

Colors: Block is light gray, brick is red-brown, mortar is tan, grout is darker gray, and steel is black. All elements are labeled with text.

Implementation: p5.js with a responsive canvas and DOM controls.
</details>

## Movement Joints

Concrete and masonry change size with temperature and moisture, and if the change is prevented they crack. Designers therefore build planned joints into slabs and walls, so that the movement and the cracking happen where they are intended. The two kinds of joint do different jobs, and the table compares them after the definitions.

### Control Joints

A **control joint** is a deliberately weakened line in a concrete slab or masonry wall that is meant to crack, so that shrinkage cracking occurs in a straight, controlled location. Concrete shrinks as it dries, and a restrained slab would otherwise crack at random. In a slab, a control joint is made by sawing a groove, usually to one-quarter of the slab depth, within hours of finishing. A common spacing rule is 2 to 3 times the slab thickness in inches, expressed in feet, so a 5 in. slab has joints every 10 to 15 ft. In concrete masonry walls, vertical control joints are placed at intervals, commonly on the order of 25 ft or less, and at openings and changes in height, with the joint filled with sealant.

### Expansion Joints

An **expansion joint** is a full-depth gap, filled with a compressible material, that lets two parts of a structure expand and contract independently without pushing against each other. Expansion joints (also called isolation joints in slabs) separate a slab from columns and walls, so that they can move independently, and they divide long runs of brick veneer. Clay brick expands slowly over its life as it absorbs moisture, while concrete products shrink, so a common rule is that clay expands and concrete shrinks.

**Worked example: movement over a Minnesota year.** Concrete expands about \( 5.5 \times 10^{-6} \) per °F. Assume a temperature range of 115 °F between a cold winter morning and a hot summer afternoon, an illustrative figure. A 100 ft run (1,200 in.) of concrete changes in length by

\[ 1{,}200\ \text{in.} \times 5.5 \times 10^{-6} \times 115 = 0.76\ \text{in.} \]

This is the change if the concrete is free to move. A clay brick wall of the same length, with an expansion coefficient of about \( 3.6 \times 10^{-6} \) per °F, would change by about 0.5 in. These movements explain why long runs are broken by joints. The table compares the two types.

| Joint | Purpose | Typical locations | Depth and filler |
|-------|---------|-------------------|------------------|
| Control | Direct shrinkage cracking to a line | Slabs, concrete and CMU walls | Partial depth, sealant |
| Expansion | Allow growth and separate elements | Slab edges, brick veneer, building seams | Full depth, compressible filler and sealant |

!!! mascot-celebration "You Can Read a Pour and a Wall"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now explain how cement, water, and aggregates become concrete, balance a mix by absolute volume, spot a water-cement ratio gone wrong, size rebar for a beam, schedule a pour, and tell brick, block, mortar, and grout apart. That is the vocabulary the foundation chapters build on next.

## Key Takeaways

- Concrete is cement, water, and aggregates that harden by hydration, a chemical reaction that needs moisture. It is strong in compression (typically 3,000 to 5,000 psi), weak in tension (about 10 percent as strong), and in Minnesota it must be air-entrained to survive freezing.
- Cement is the binder and aggregates make up 60 to 75 percent of the volume. The maximum aggregate size is limited by the narrowest form dimension, the rebar spacing, and the slab depth.
- The water-cement ratio is the most influential property of a mix: lower ratios mean stronger, denser, more durable concrete, and adding water at the chute raises the ratio and weakens the concrete.
- Mix design balances strength, workability, durability, and cost, and the absolute volume method requires the solid volumes of the ingredients to add up to 27 ft³ per cubic yard.
- Rebar carries tension and concrete carries compression, and the two work together because of bond, similar thermal expansion, and the protective alkaline environment of concrete. Prestressing keeps concrete in compression before the loads arrive.
- Cast-in-place concrete moves through forms, reinforcement, placement, consolidation, finishing, and curing. Formwork must resist the fluid pressure of fresh concrete, and curing keeps water in the concrete so that it reaches its design strength.
- Precast concrete is made in a plant and erected by crane, and slabs on grade combine a compacted base, a vapor retarder, and insulation in cold climates.
- Masonry builds walls from brick, concrete block, or stone bound by mortar, with grout and steel in reinforced masonry to resist tension and sideways forces.
- Control joints direct shrinkage cracks to chosen lines, and expansion joints let parts move freely. Clay expands, and concrete shrinks.

[See Annotated References](./references.md)
