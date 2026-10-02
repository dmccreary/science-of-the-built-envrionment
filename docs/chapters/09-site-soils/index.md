---
title: Site Work, Soils, and Groundwater
description: How site analysis, soil properties, groundwater, frost, excavation, grading, and drainage determine what can be built on a site and how it must be prepared.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:52:00
version: 1.10
---

# Site Work, Soils, and Groundwater

## Summary

How site analysis, excavation, soil properties, groundwater, and frost conditions shape what can be built on a site. It builds on the prerequisite concepts from Chapters 1, 2, 3, 4, 5. After completing this chapter, students will be able to define, explain, and apply the 11 concepts listed below.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Site Analysis | 47 |
| Soil Types | 32 |
| Soil Bearing Capacity | 21 |
| Site Preparation | 13 |
| Excavation | 8 |
| Groundwater | 5 |
| Grading | 4 |
| Frost Depth | 3 |
| Site Drainage | 3 |
| Soil Testing | 1 |
| Frost Heave | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 2: The Design and Construction Process](../02-design-construction-process/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 5: Properties of Building Materials](../05-material-properties/index.md)

---

!!! mascot-welcome "Every Building Starts With the Ground"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Before a single wall goes up, the ground has already made some of your biggest decisions for you. Learn to read a site and its soil, and you will know what a building can safely stand on, what it will cost to get there, and what surprises to expect in a Minnesota spring. Let's build it right!

Every load that Chapter 6 will trace through a structure ends in the same place: the soil beneath the building. A beam, a column, and a footing can each be perfectly designed, and the building will still fail if the ground cannot carry what it is given. This chapter therefore starts before construction does. We examine how the project team studies a site, how soil is classified and tested, how groundwater and frost change soil behavior, and how the site is cleared, excavated, shaped, and drained so that a foundation can be built on it.

To keep the numbers concrete, we return to the **Riverbend Youth Center** from Chapter 2, the one-story, 9,000 ft² community building in Minneapolis. For this chapter we imagine it on a 300 ft by 200 ft lot. The lot size, soil values, and quantities are illustrative, chosen to make the arithmetic clear and not to represent a real site.

## Site Analysis

**Site analysis** is the systematic collection and evaluation of information about a parcel of land, its surroundings, and the rules that govern it, so that the design team can decide where and how to build. It begins during programming and schematic design, which Chapter 2 described, because the findings shape the building rather than merely adjust it. A site that slopes steeply, floods in spring, or sits above soft peat will change the foundation, the budget, and sometimes the decision to buy the land at all.

The team gathers information in several categories. Each category answers a different question, and each can add cost or restrict the design.

- **Legal and regulatory.** Property boundaries, zoning, *setbacks* (the minimum distances a building must keep from the property lines), and *easements* (rights of others to cross or use part of the land, such as a utility line).
- **Topography.** The shape of the ground, shown on a survey by *contour lines* that connect points of equal elevation. Tightly spaced contours mean a steep slope.
- **Soils and groundwater.** What the ground is made of, how strong it is, and where water stands in it. The rest of this chapter explores these.
- **Climate.** Sun path, prevailing wind, snow load and drifting, and the depth to which the ground freezes.
- **Utilities and access.** Where water, sewer, electric, gas, and communication lines are located, and how people and delivery trucks reach the site.
- **Environmental constraints.** Wetlands, floodplains, mature trees, and past uses of the land that may have left contamination.

The electrical designer, introduced in Chapter 1, uses the same analysis. The location of the utility's transformer and the route of the service line from the street affect the length of the electrical service and its cost.

**Worked example: the buildable area at Riverbend.** The imagined lot is 300 ft by 200 ft, which is 60,000 ft² or about 1.38 acres. Suppose the zoning requires setbacks of 25 ft at the front, 10 ft on each side, and 20 ft at the rear. The *buildable envelope* is the part of the lot where the building may sit. Its width is \( 300 - 10 - 10 = 280 \) ft, and its depth is \( 200 - 25 - 20 = 155 \) ft, so its area is \( 280 \times 155 = 43{,}400 \) ft². The 9,000 ft² building occupies about 21 percent of that envelope and 15 percent of the lot. The remaining area must still hold parking, a stormwater basin, and the entry court from the schematic design. A sewer easement along the rear 10 ft, a mapped wetland, or a 15 percent slope would each shrink the usable area further, which is why the team prepares this map before deciding on a floor plan.

The diagram below lets you turn each category of site information on and off as a layer, so you can see how the constraints stack up on one parcel.

#### Diagram: Site Analysis Layer Explorer

<details markdown="1">
<summary>Site Analysis Layer Explorer</summary>
Type: microsim
**sim-id:** site-analysis-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how legal, topographic, soil, climate, and utility constraints combine to reduce the buildable area of a parcel, and will examine (Bloom Level 4, Analyze) how moving a building changes its exposure to those constraints.

Visual: A plan view of the imagined 300 ft by 200 ft Riverbend lot with a north arrow and scale bar. Layers can be drawn over a light base map: property line and setbacks (dashed red), contour lines (brown, with a downhill arrow), soil boring locations with a small label of the soil found (blue dots), a sun path and prevailing winter wind arrow (yellow and gray), utility lines and easements (green), and a low wet area (light blue). A 120 ft by 75 ft building rectangle can be dragged anywhere on the lot. The canvas width follows the container, the height is 460 px, and the layout redraws on window resize.

Controls: Six checkboxes (one per layer) toggle each layer. A "Reset building position" button returns the rectangle to the default location. A readout beneath the canvas reports the buildable envelope area, the building's percentage of that area, and the number of constraints the building currently overlaps.

Interactions: Hovering over any layer element shows a tooltip describing what it means for design (for example, "Sewer easement: no building above this line"). Dragging the building turns its outline red when it crosses a setback, easement, or wet area, and a message explains which constraint was violated and what it would cost to resolve.

Default state: All layers on, building in a legal position near the center of the envelope, readout showing 43,400 ft² and about 21 percent.

Implementation: p5.js with built-in checkboxes and a button, a draggable rectangle with rectangle-overlap tests, and a responsive canvas.
</details>

## Soil Types

**Soil** is the loose mixture of mineral particles, organic matter, water, and air that lies above solid rock. For a builder, soil is a construction material that arrives already in place and whose properties cannot be specified, only discovered. Engineers sort soils by the size of their particles, because particle size largely controls how a soil drains, how much load it carries, and how it behaves when wet or frozen.

The common soil types, from coarsest to finest, are gravel, sand, silt, and clay. *Gravel* and *sand* are coarse-grained, or *granular*, soils whose particles are visible to the eye. Gravel particles are larger than about 4.75 mm, which is the opening of a No. 4 sieve, and sand particles range from that size down to 0.075 mm. *Silt* and *clay* together are called *fines*, particles smaller than 0.075 mm that pass the No. 200 sieve, and they are fine-grained soils. Clay particles, smaller than about 0.002 mm, are flat and carry an electric charge, so they hold water tightly and can be sticky and plastic. A fifth category, *organic soil* and *peat*, consists of partly decayed plant material. It is compressible and weak, and is almost always removed from beneath a foundation.

Two terms help describe behavior. A soil's *permeability* is how easily water flows through it, which is high for gravel and very low for clay. A soil's *plasticity* is its ability to be molded without crumbling when moist. The laboratory measures plasticity with the *Atterberg limits*, the moisture contents at which a soil changes from liquid to plastic to solid. With these terms defined, the table below summarizes how the types compare for building.

| Soil type | Particle size | Drainage | Relative strength | Frost susceptibility | Typical concern |
|-----------|---------------|----------|-------------------|----------------------|-----------------|
| Gravel | Larger than 4.75 mm | Excellent | High | Low | Few; excellent bearing and drainage |
| Sand | 0.075 to 4.75 mm | Good | Moderate to high | Low | Loose sand can settle |
| Silt | 0.002 to 0.075 mm | Poor | Low to moderate | Very high | Frost heave, strength lost when saturated |
| Clay | Smaller than 0.002 mm | Very poor | Moderate when dry, low when wet | Moderate to high | Slow settlement over years |
| Organic and peat | Plant fibers | Variable | Very low | Variable | Large settlement; must be removed |

The engineering profession uses the **Unified Soil Classification System** (USCS) to give each soil a two-letter symbol, such as GW for well-graded gravel, SM for silty sand, and CL for low-plasticity clay. The first letter names the dominant type (G, S, M for silt, C for clay, O for organic), and the second describes grading or plasticity. The classification procedure follows a short decision path based on a *sieve analysis*, a laboratory test in which a dry sample is shaken through a stack of sieves of decreasing opening size and the weight retained on each is recorded.

**Worked example: classifying a Riverbend soil.** A sample taken from a boring at 4 ft depth has the following results (illustrative): 8 percent gravel, 62 percent sand, and 30 percent fines. First, the portion retained on the No. 200 sieve is \( 8 + 62 = 70 \) percent, which is more than half, so the soil is coarse-grained. Second, sand makes up \( 62 / 70 \approx 89 \) percent of that coarse fraction, more than half, so the soil is a sand and not a gravel. Third, the fines exceed 12 percent, so the symbol depends on the fines' plasticity. The laboratory reports that they have low plasticity, which makes them silty, and the symbol is SM, silty sand. A silty sand drains moderately, carries load well when dry, and is somewhat frost-susceptible because of its fines. That last property matters in Minneapolis, as the frost sections below explain.

Much of Minnesota's ground consists of *glacial till* (a mixture of clay, silt, sand, and gravel deposited by ice sheets) and layers of lake clay, with peat in low, wet areas. Local conditions change within a few city blocks, which is the reason no one should assume the soil from a neighboring site.

#### Diagram: USCS Soil Classifier

<details markdown="1">
<summary>USCS Soil Classifier</summary>
Type: microsim
**sim-id:** uscs-soil-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) the simplified USCS decision path to a sieve analysis to classify a soil as a gravel, sand, silt, or clay, and will predict (Bloom Level 2, Understand) its drainage, strength, and frost behavior.

Visual: On the left, a column of three stacked sieves (No. 4, No. 200, and a pan) with a stacked bar showing the percentage of the sample retained in each. On the right, a flowchart of the decision path (more than 50 percent retained on No. 200? more than half of coarse fraction sand or gravel? more than 12 percent fines? plasticity low or high?) with the current path highlighted. At the bottom, a result card shows the symbol, a name, and icons for drainage, strength, and frost susceptibility. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: Three sliders for percent gravel, sand, and fines that always sum to 100 (adjusting one rescales the others). A dropdown for "plasticity of the fines" with options low and high. A "Load Riverbend boring B-2" button sets 8, 62, and 30 percent with low plasticity. A "Random sample" button generates a new soil.

Interactions: Hovering over a sieve shows its opening size and the particle size category it separates. Clicking any decision box opens a one-sentence explanation of why that test is applied. The result card updates immediately when any control changes.

Default state: Riverbend boring B-2 loaded, result SM (silty sand).

Implementation: p5.js with built-in sliders, select, and buttons, a rule-based classifier, and a responsive canvas.
</details>

!!! mascot-thinking "The Soil Is a Structural Member"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the soil as the last member in the load path, the one that no one sized, ordered, or inspected before it arrived. Everything in this chapter is the work of finding out what that member can actually carry.

## Soil Testing

**Soil testing** is the combination of field exploration and laboratory analysis that tells the design team what the soil is and how it will behave. A *geotechnical engineer*, a civil engineer who specializes in soil and rock behavior, directs the work. A drilling crew advances *soil borings*, small-diameter holes that bring up samples at regular depth intervals, and records the depth at which water appears. Many borings include the *standard penetration test*, in which a weighted hammer drives a sampler into the soil and the number of blows needed to advance it one foot, called the *N-value*, indicates how dense or stiff the soil is.

Samples go to a laboratory for grain size, Atterberg limits, moisture content, and, if fill will be placed, a *Proctor test* that finds the moisture content at which the soil compacts best. The engineer then writes a geotechnical report with the soil profile, recommended allowable bearing capacity, frost and groundwater observations, and requirements for fill and compaction. The cost of borings is a small fraction of the project budget, and it buys protection from the largest unknowns in the foundation design.

!!! mascot-tip "Beau's Tip: Hire the Borings Early"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Ask the owner to order the geotechnical investigation during schematic design, not after the foundation is drawn. A report that arrives with the building already laid out can force a redesign, while one that arrives first can guide where the building goes.

## Soil Bearing Capacity

**Soil bearing capacity** is the pressure that a soil can support from a foundation without failing in shear or settling excessively. The pressure is the load divided by the area it acts on, in pounds per square foot (psf). Engineers work with two values. The *ultimate bearing capacity* is the pressure at which the soil would fail, and the *allowable bearing capacity* is that value divided by a *factor of safety*, commonly about 3, so that the building stays well below failure. A second limit also applies: even soil that will not fail may compress under load, and if one part of a building settles more than another, walls and floors crack. This uneven movement is called *differential settlement*.

Soil is much weaker than the concrete and steel placed on it, so the footing must spread the load over a larger area. The required footing area follows directly from the definition of pressure:

\[ A_{\text{required}} = \frac{P}{q_{\text{allow}}} \]

where \( P \) is the column load in pounds or kips (1 kip equals 1,000 lb) and \( q_{\text{allow}} \) is the allowable bearing capacity in psf. Prescriptive code tables list conservative presumptive values, commonly on the order of 1,500 psf for clays and silts, 2,000 psf for sands, and 3,000 psf for gravels, but the geotechnical report governs when one exists.

**Worked example: sizing a footing for three soils.** Suppose a column supporting one of the glulam beams over the Riverbend multipurpose room carries 40 kips (an illustrative load). Chapter 10 treats footing design in detail; here we ask only how much area the soil demands. In clay at 1,500 psf the area is \( 40{,}000 / 1{,}500 = 26.7 \) ft², a square about 5.2 ft on a side, which we round up to 5 ft 3 in. In sand at 2,000 psf the area is 20 ft², about 4.5 ft square. In gravel at 3,000 psf the area is 13.3 ft², about 3.7 ft square, rounded to 3 ft 9 in. Weaker soil requires nearly twice the footing area, and weaker soil also costs more to excavate and fill with concrete. This estimate ignores the weight of the footing itself, which a real design adds.

#### Diagram: Bearing Capacity and Footing Size Explorer

<details markdown="1">
<summary>Bearing Capacity and Footing Size Explorer</summary>
Type: microsim
**sim-id:** soil-bearing-footing-area-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the footing area required for a given load and soil, and will compare (Bloom Level 4, Analyze) how soil type and column load change the footing size.

Visual: A side view of a column on a square footing resting on a soil layer, with a pressure bulb drawn beneath it as shaded bands whose darkness shows stress. A top-down inset shows footing size to scale against a 10 ft grid. A bar chart on the right compares the footing area needed in clay, sand, and gravel at the current load. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A slider for column load from 10 to 100 kips in 5-kip steps. A dropdown for soil type (soft clay, firm clay, sand, gravel). A checkbox for "show factor of safety," which displays the ultimate capacity as three times the allowable value. A "Reset" button.

Interactions: Hovering over the soil layer shows the presumptive allowable bearing value and a plain-language description. The footing resizes in real time as sliders move. A message appears when the footing exceeds 8 ft square, suggesting a mat foundation or better soil, and points to Chapter 10.

Default state: 40 kips, firm clay at 1,500 psf, footing 5 ft 3 in square.

Implementation: p5.js with built-in slider, select, checkbox, and button, and a responsive canvas.
</details>

!!! mascot-warning "Watch Out: Fill and Frozen Ground Are Not Bearing Soil"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Never found a footing on topsoil, loose fill, or frozen ground, because each will compress or thaw and let the footing settle. Remove the topsoil, replace any loose or organic layer with compacted engineered fill, and keep winter pours on thawed, protected subgrade.

## Groundwater

**Groundwater** is water that fills the spaces between soil particles below a certain depth. The top of this saturated zone is the *water table*. Above it, soil may still be damp because fine soils pull water upward by *capillary action*, the same force that draws water up a paper towel. In Minnesota the water table rises with spring snowmelt and rain and falls in late summer, so its depth depends on the date. Occasionally a layer of clay holds a pocket of water above the main table, called *perched water*.

Groundwater matters to builders in three ways. Saturated soil usually has less strength than the same soil when dry. Water below a floor pushes upward with *hydrostatic pressure*, which increases with depth below the water table, and the pressure acts on basement floors and walls. Finally, an excavation that reaches the water table fills with water, and the contractor must pump it out, a practice called *dewatering*, to work in the dry.

**Worked example: uplift under a basement slab.** Water weighs about 62.4 lb/ft³, so the pressure at a depth \( d \) below the water table is \( 62.4 \times d \) psf. Suppose a below-grade slab (illustrative) sits 6 ft below the water table, giving a pressure of \( 62.4 \times 6 = 374 \) psf pushing up on the underside. A 6 in concrete slab weighs about \( 0.5 \times 150 = 75 \) psf, so the net uplift is about 299 psf. That is roughly 4 times the slab's weight, enough to crack and lift the slab. Designers respond by keeping floors above the water table, adding drainage that lowers the water level, or designing the slab as a thick, anchored structure.

!!! mascot-warning "Watch Out: The Boring Reflects That Day's Water"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A boring drilled in a dry August can record a water table several feet lower than the spring high. Ask the geotechnical engineer to report the expected seasonal high water level, and design below-grade space for that level, not the day of the borings.

## Frost Depth

**Frost depth** is the depth to which the ground freezes in winter. It depends on the climate: air temperatures, how long the cold lasts, snow cover, and the soil's water content. Frost depth is an input to the building code, which sets a minimum depth for the bottom of exterior footings so that they sit below frozen soil. In the Twin Cities area this depth is commonly 42 inches, and it is greater farther north, but the local building official and the Minnesota State Building Code establish the value for a given project. Frost depth is not the same as the frost line seen on a single cold morning, because it records the deepest freezing expected in a severe winter. Chapter 10 applies frost depth to footing design, and Chapter 11 introduces frost-protected foundations, which use insulation to reduce the needed depth.

## Frost Heave

**Frost heave** is the upward movement of the ground, and of anything resting on it, when soil freezes. Many people attribute it to water expanding about 9 percent when it turns to ice, but that expansion alone would produce only modest movement. The larger cause is the growth of *ice lenses*, layers of nearly pure ice that form as freezing soil draws more water upward from below by capillary action, thickening the lens until it lifts the soil above. Heave requires three conditions together: frost-susceptible soil, a supply of water, and freezing temperatures. Silt is the worst offender, because it is fine enough to pull water up strongly and permeable enough to let it move. Removing any one of the three stops heave, which is the basis of the cures: place footings below frost depth, replace silty soil with clean gravel, or drain the water away.

#### Diagram: Frost Heave Three-Condition Explorer

<details markdown="1">
<summary>Frost Heave Three-Condition Explorer</summary>
Type: microsim
**sim-id:** frost-heave-three-conditions<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) why frost heave requires frost-susceptible soil, water, and freezing temperatures together, and will predict (Bloom Level 2, Understand) which mitigation stops it.

Visual: A cross-section of a footing and a slab edge in soil, with a frost line drawn at 42 inches. Ice lenses grow as horizontal blue layers beneath the freezing front, and the slab and an unprotected shallow footing rise by an amount shown by a movement gauge. The canvas is responsive, 440 px tall, and redraws on window resize.

Controls: Three toggles for the three conditions (soil type: gravel or silt; water: dry or wet; temperature: above freezing or below). A slider for the number of freezing days from 0 to 90. A footing depth dropdown (18 in, 42 in). A "Run winter" button animates the freeze.

Interactions: Hovering over an ice lens shows how the water was drawn up. When any condition is turned off, a message states which condition was removed and why heave stops. The gauge reports heave in inches.

Default state: Silt, wet, below freezing, 18 in footing, with visible heave when "Run winter" is pressed.

Implementation: p5.js with built-in toggles, slider, select, and a responsive canvas.
</details>

## Site Preparation

**Site preparation** is the set of activities that make a site ready for foundation construction. It begins as soon as the contract is signed and the permits are in hand. Preparation is as much about protecting the surroundings as it is about changing the land, because disturbing soil produces mud, runoff, and sediment that can leave the site.

The main tasks, in a typical order, are as follows.

1. **Locate utilities.** In Minnesota, contractors must call 811 (Gopher State One Call) before digging so that buried gas, electric, and communication lines are marked.
2. **Survey and stake.** Surveyors mark building corners and elevations, which give the crew a reference for every later measurement.
3. **Install erosion and sediment controls.** Silt fences, inlet protection on storm drains, and a stabilized rock construction entrance keep sediment from leaving the site.
4. **Protect what stays.** Fencing around trees and areas to be preserved prevents damage to roots.
5. **Clear, grub, and strip.** *Clearing* removes trees and brush, *grubbing* removes stumps and roots, and *stripping* removes the topsoil layer, which is stockpiled for later landscaping because it is rich in organic matter that is unsuitable for supporting a building.
6. **Establish access and temporary facilities.** Construction roads, a staging area, and temporary power and water.

Large projects need more than good practice. In Minnesota, a project that disturbs about one acre or more typically needs a construction stormwater permit with a written pollution-prevention plan. The imagined Riverbend lot is 1.38 acres, and if the work disturbs even 1.1 acres, the permit would apply.

**Worked example: sequencing Riverbend.** The superintendent plans the first three weeks. The utility locate request goes in first because markings take several working days. While waiting, the survey crew stakes the building and installs the silt fence along the downhill property line. On the day after the locates arrive, the excavator strips 6 in of topsoil from the building pad and stockpiles it at the back of the lot, away from the stormwater basin. Stripping first would have exposed bare soil with no sediment control in place, which is the most common mistake in sequencing, and it would invite a stop-work order after the first rain.

!!! mascot-tip "Beau's Tip: Controls Before Cuts"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Use a simple rule on every site: install the silt fence and rock entrance before the first scoop of dirt is moved. The inspector will check for them first.

## Excavation

**Excavation** is the removal of soil or rock to create space for foundations, utilities, and basements, and to bring the ground to the planned elevations. Excavation is described in terms of *cut*, the soil removed, and of the *bank volume*, the volume of soil as it lies undisturbed. Once dug, soil is loosened and occupies more space. The ratio of that increase is the *swell factor*, which is commonly 10 to 40 percent depending on the soil. When the soil is later placed and compacted as fill, it shrinks again, so quantities should be tracked in bank, loose, and compacted volumes and never mixed.

Excavation is also the most dangerous part of site work, because trench walls can collapse without warning. The federal Occupational Safety and Health Administration (OSHA) generally requires a protective system for trenches 5 ft or deeper unless the walls are in stable rock. The protective system may be *sloping* the walls back, *shoring* them with braces, or using a *trench box*, and a *competent person* must inspect the excavation daily. For sloping, OSHA classifies soil as Type A, B, or C, which is a separate system from the USCS and describes stability only. The maximum allowable slope, written as horizontal to vertical, is commonly 3/4:1 for Type A, 1:1 for Type B, and 1.5:1 for Type C. The table below restates these limits and what they mean for a 5 ft deep cut.

| OSHA soil type | Typical soil | Maximum slope (horizontal:vertical) | Sideways run for a 5 ft cut |
|----------------|--------------|-------------------------------------|-----------------------------|
| Type A | Firm, cohesive clay | 3/4:1 | 3.75 ft |
| Type B | Silt, angular gravel, some stiff till | 1:1 | 5 ft |
| Type C | Sand, loose or wet soil | 1.5:1 | 7.5 ft |

**Worked example: hauling the Riverbend pad cut.** Suppose the building pad plus 3 ft of working space on each side measures \( 126 \times 81 = 10{,}206 \) ft² and the cut averages 1.5 ft deep. The bank volume is \( 10{,}206 \times 1.5 = 15{,}309 \) ft³, which is \( 15{,}309 / 27 = 567 \) yd³. With a swell factor of 25 percent (illustrative), the loose volume is \( 567 \times 1.25 \approx 709 \) yd³. A tandem dump truck hauling 12 yd³ per trip needs \( 709 / 12 \approx 59.1 \), so 60 loads. If the cut were instead 6 ft deep in Type B soil, the trench would need either walls sloped at 1:1, which adds 6 ft of width on each side, or a trench box.

## Grading

**Grading** is the shaping of the ground surface to the elevations and slopes shown on the plans. Where the existing ground is higher than the design elevation, the crew *cuts*, and where it is lower, the crew *fills*. A good grading plan balances cut and fill so that little soil must be hauled onto or off the site, since hauling is expensive. Fill that supports a building is placed in thin layers, commonly about 8 in loose, and each layer is compacted before the next is added, so that the fill carries load without settling later. Compaction is commonly specified as a percentage, such as 95 percent, of the maximum density found in the Proctor test.

Grading serves two other purposes. It directs surface water away from the building, and it creates accessible paths. Building codes commonly require the ground to fall at least 6 in within the first 10 ft away from the foundation, a 5 percent slope. Accessibility standards generally treat a walking surface steeper than 1:20, which is 5 percent, as a ramp with additional requirements. Slopes are written as a percent, a ratio, or a drop over a distance, and the table below converts among them for the values that matter most on a building site.

| Slope | Percent | Where it appears |
|-------|---------|------------------|
| 1:48 | about 2.1 | Commonly the maximum cross slope of an accessible walk |
| 6 in in 10 ft | 5 | Minimum fall away from the foundation; also 1:20, the limit before a walk becomes a ramp |
| 1:12 | about 8.3 | Commonly the steepest slope allowed for an accessible ramp |
| 1:1 | 100 | A 45 degree slope, such as a Type B excavation wall |

**Worked example: checking the Riverbend entry.** The finished floor of the entry is set at elevation 100.00 ft, and the parking lot edge, 60 ft away, is at 98.00 ft. The drop of 2.00 ft over 60 ft is \( 2/60 = 0.033 \), or 3.3 percent. That is gentler than 5 percent, so the walk stays a regular route and not a ramp. The ground within 10 ft of the building must fall at least 6 in, so at 10 ft away it must be no higher than 99.50 ft, which is a 5 percent slope. Both conditions can be satisfied with one gently sloped walk and a slightly steeper lawn beside it.

## Site Drainage

**Site drainage** is the system of surfaces, channels, and pipes that collects stormwater and groundwater and carries it away from buildings and paved areas. Surface drainage relies on the grading described above, plus *swales* (shallow, vegetated channels), *catch basins* (inlets that collect water from pavement), and storm sewers that carry it to a discharge point. Subsurface drainage uses perforated pipe in gravel, commonly called a *French drain*, to intercept groundwater. In cold climates, the water must also not pool where it will freeze on walkways. Minnesota municipalities and watershed districts commonly require projects to hold back stormwater in a basin and release it slowly, so that downstream flooding does not increase. Chapter 10 returns to drainage at the foundation itself, where it keeps water away from basement walls and floors.

!!! mascot-celebration "You Can Read the Ground"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now analyze a site's constraints, classify a soil from a sieve analysis, size a footing from the soil's bearing capacity, and explain how groundwater and frost can lift or crack a structure. You also know how a site is prepared, excavated, graded, and drained before the first footing is poured. That is the knowledge a foundation depends on.

## Key Takeaways

- Site analysis gathers legal, topographic, soil, climate, utility, and environmental information early, because it can reduce the buildable area and drive cost.
- Soils are classified by particle size into gravel, sand, silt, clay, and organic soil. The USCS assigns symbols such as SM from a sieve analysis and plasticity.
- Soil testing by borings and laboratory work, directed by a geotechnical engineer, replaces assumptions about the ground with data.
- Required footing area equals load divided by allowable bearing capacity, so weaker soil demands a larger footing.
- Groundwater lowers soil strength, creates hydrostatic uplift of about 62.4 psf per foot of depth below the water table, and must be designed for at its seasonal high.
- Frost depth sets how deep footings must go. Frost heave needs frost-susceptible soil, water, and freezing temperatures together, and removing any one stops it.
- Site preparation puts erosion controls in place before stripping, and excavation volumes must be tracked as bank, loose, and compacted quantities.
- Grading balances cut and fill and slopes the ground away from the building, and site drainage carries stormwater and groundwater away safely.
