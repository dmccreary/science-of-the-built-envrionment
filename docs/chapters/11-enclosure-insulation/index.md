---
title: Enclosure Control Layers and Insulation
description: How the water, air, vapor, and thermal control layers of a wall work together, and how insulation materials and continuous insulation protect a cold-climate building.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:07:50
version: 1.10
---

# Enclosure Control Layers and Insulation

## Summary

The water, air, vapor, and thermal control layers of wall assemblies, and the insulation materials that provide thermal control in a cold climate. It builds on the prerequisite concepts from Chapters 1, 3, 4, 7, 9, 10. After completing this chapter, students will be able to define, explain, and apply the 20 concepts listed below.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Building Enclosure | 153 |
| Control Layers | 99 |
| Wall Assemblies | 28 |
| Thermal Control Layer | 23 |
| Insulation | 22 |
| Water Control Layer | 16 |
| Air Control Layer | 16 |
| Wall Sheathing | 10 |
| Weather-Resistive Barrier | 9 |
| Air Barrier | 8 |
| Continuous Insulation | 4 |
| Vapor Control Layer | 2 |
| Rigid Foam Insulation | 2 |
| Foundation Waterproofing | 1 |
| Frost-Protected Foundations | 1 |
| Vapor Retarder | 1 |
| Fiberglass Insulation | 1 |
| Mineral Wool Insulation | 1 |
| Cellulose Insulation | 1 |
| Spray Foam Insulation | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 7: Wood and Steel Framing](../07-wood-steel-framing/index.md)
- [Chapter 9: Site Work, Soils, and Groundwater](../09-site-soils/index.md)
- [Chapter 10: Foundation Systems](../10-foundation-systems/index.md)

---

!!! mascot-welcome "A Wall Is a Stack of Jobs"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Behind every dry, warm, quiet Minnesota room is a wall doing four jobs at once, and most wall failures come from one of those jobs being left out. Learn to read a wall as a set of layers, and you will be able to spot the missing one before it rots. Let's build it right!

Chapter 3 gave you the physics of heat flow and thermal bridging, and Chapter 4 explained how moisture and air move through buildings. This chapter turns that physics into a design method. Instead of thinking of a wall as "studs plus insulation," we think of it as a set of **control layers**, each assigned one job, arranged in the right order, and kept continuous across the whole building.

We continue with the invented **Riverbend Youth Center** from Chapters 2, 9, and 10. Its walls are 12 ft tall around a 390 ft perimeter, which makes 4,680 ft² of gross wall, and it has 702 ft² of windows (about 15 percent of the wall). All performance values, areas, and quantities are illustrative.

## Building Enclosure

The **building enclosure**, also called the building envelope, is the set of physical assemblies that separates the conditioned interior of a building from the exterior environment. It consists of the roof, the above-grade walls, the windows and doors, and the foundation and floor. Chapter 1 described a building as something that supports, separates, serves, and protects. The enclosure does most of the separating and protecting, and it is the part of the building that experiences the full difference between a 70°F room and a -10°F Minneapolis night.

The enclosure must do several jobs simultaneously. It resists wind and snow loads that Chapter 6 described, and it keeps out rain and snowmelt. It limits the leakage of air, which carries both heat and moisture. It slows the diffusion of water vapor and the flow of heat. It also admits daylight and views, reduces sound, and resists fire. Most of the failures that building owners notice, such as ice dams, mold, peeling paint, and cold rooms, are enclosure failures, and they are expensive because the enclosure is hidden behind finishes.

This book treats the enclosure one piece at a time. Walls are the subject of this chapter and Chapter 12, windows and doors are covered in Chapter 12, roofs in Chapter 13, and the foundation was introduced in Chapter 10. The pieces are easy to design in isolation. The hard problems occur where they meet, at the eave, at the window sill, and at the base of the wall, because each layer must be connected to the same layer of the next piece. Keep that idea in mind as you read, because it returns in every section that follows.

The loss of heat through the enclosure is the largest driver of the heating system's size and of its energy use. Chapter 3 gave the equation for conductive heat flow through an assembly, \( \dot{Q} = U \, A \, \Delta T \), and the enclosure is where every term in that equation is decided. Area comes from the building's shape, the temperature difference comes from the climate, and the U-value comes from the assemblies. Before examining how an assembly is built, it helps to see which parts of the enclosure matter most.

**Worked example: where Riverbend's heat goes.** On the 80°F design day (70°F inside, -10°F outside), we compute the conductive loss through each component. The roof is 9,000 ft² with an illustrative U-value of 0.025 (about R-40). The walls have a net area of \( 4{,}680 - 702 = 3{,}978 \) ft² and an effective U-value of about 0.036 (R-27.7, which we derive later in this chapter). The windows have an illustrative U-value of 0.30, as in Chapter 3.

| Component | Area (ft²) | U-value | Loss \( U A \Delta T \) (BTU/h) | Share of loss |
|-----------|-----------|---------|---------------------------------|---------------|
| Roof | 9,000 | 0.025 | 18,000 | 39% |
| Walls (net) | 3,978 | 0.036 | 11,500 | 25% |
| Windows | 702 | 0.30 | 16,800 | 36% |
| **Total** | **13,680** | | **46,300** | **100%** |

The windows are 5 percent of the enclosure area (\( 702 / 13{,}680 \)) but account for 36 percent of the conductive loss. Per square foot, a window loses \( 0.30 \times 80 = 24 \) BTU/h while the wall loses only \( 0.036 \times 80 = 2.9 \) BTU/h, a ratio of about 8 to 1. The roof, simply because of its large area, is the biggest single item. This table ignores heat loss through the slab edge and heat carried away by air leaking through the enclosure, a second loss that we examine under the air control layer.

#### Diagram: Enclosure Heat Loss Component Explorer


<iframe src="../../sims/enclosure-heat-loss-component-explorer/main.html" width="100%" height="758px" scrolling="no"></iframe>
[Run Enclosure Heat Loss Component Explorer Fullscreen](../../sims/enclosure-heat-loss-component-explorer/main.html)

<details markdown="1">
<summary>Enclosure Heat Loss Component Explorer</summary>
Type: chart
**sim-id:** enclosure-heat-loss-component-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how roof, wall, and window area and U-value combine to determine total conductive heat loss, and will evaluate (Bloom Level 5, Evaluate) which single change reduces the loss most.

Visual: A stacked horizontal bar showing the heat loss of the roof, walls, and windows in BTU/h, beside a second bar showing each component's share of the enclosure area for comparison. A readout shows the total loss in BTU/h and the equivalent in kW. The chart is responsive to the container width, 420 px tall, and redraws on window resize.

Controls: A slider for window area (0 to 1,400 ft² in 50 ft² steps). A slider for roof R-value (R-20 to R-60), wall effective R-value (R-10 to R-40), and window U-value (0.15 to 0.60). A slider for outdoor temperature (-20 to 40°F) with the indoor temperature fixed at 70°F. A "Riverbend defaults" button.

Interactions: Hovering over any bar segment shows the component's area, U-value, and loss. A "Which change helps most?" button applies a standard improvement to each component in turn (roof +R-10, wall +R-10, windows U-0.20) and ranks them by the BTU/h saved, with a one-sentence explanation of why the result differs from expectation.

Default state: 702 ft² of windows, roof R-40, wall R-27.7, window U-0.30, -10°F outdoors; total about 46,300 BTU/h.

Implementation: Chart.js stacked bar chart with a small calculation function and custom tooltips.
</details>

## Control Layers

**Control layers** are the continuous planes within an enclosure assembly, each responsible for controlling one flow across it. There are four. The **water control layer** stops liquid water, such as rain and snowmelt, from reaching moisture-sensitive materials. The **air control layer** stops air from moving through the assembly. The **vapor control layer** limits the diffusion of water vapor through solid materials. The **thermal control layer** slows the flow of heat. Chapters 3 and 4 explained each of these flows; this chapter explains how to stop them. The next four major sections cover each layer in turn, so here we look at how they work as a system.

Three principles govern control layers. First, each layer must be *continuous*, which means that it must wrap the whole building without gaps, because a flow takes the easiest path and a single opening can defeat an otherwise perfect layer. Continuity is hardest at the transitions, where wall meets roof, wall meets foundation, and a window meets a wall. Second, the layers must be in the right *order* for the climate, because the layer must be on the side where the flow is being stopped. Third, one material can serve more than one layer. Taped plywood sheathing, for example, can be both the air control layer and a structural panel. Designers therefore identify the *function* first and then choose the material.

Building scientists commonly rank the layers by the damage that their failure causes. Liquid water is the most destructive, since a leak can soak insulation and rot framing within a season. Air leakage comes next, because moving air carries heat and a great deal of moisture. Vapor diffusion moves less water than air leakage in most buildings. Heat flow is last in priority for durability, though it matters most for energy use and comfort. In a cold climate such as Minnesota's, indoor air is warmer and more humid than outdoor air for most of the year, so water vapor and air tend to move from the inside toward the cold exterior. From the outside in, the typical order of layers is as follows.

1. **Cladding and drainage space.** The cladding, covered in Chapter 12, sheds most rain and leaves a path for water to drain.
2. **Water control layer.** The weather-resistive barrier and flashing, directly behind the cladding.
3. **Exterior continuous insulation (thermal control layer, outer part).** Present when the wall is insulated outside the framing.
4. **Sheathing and, often, the air control layer.** A rigid panel that also resists wind and shear.
5. **Cavity insulation (thermal control layer, inner part).** Fills the space between studs.
6. **Vapor control layer.** Near the interior face, where the wall is warm in winter.
7. **Interior finish.** Gypsum board and paint, covered in Chapter 12.

The table below shows how the materials in a Riverbend wall serve the four jobs. A check means that the material contributes to that layer when it is installed correctly.

| Material (outside to inside) | Water | Air | Vapor | Thermal |
|------------------------------|:-----:|:---:|:-----:|:-------:|
| Fiber-cement siding on a drainage gap | Sheds most rain | | | |
| Weather-resistive barrier, lapped and flashed | Yes | | | |
| Two layers of 1 in rigid foam | | | Partly | Yes |
| 7/16 in OSB sheathing, seams taped | | Yes | | |
| 2×6 studs with R-20 fiberglass | | | | Yes |
| Smart vapor retarder membrane | | | Yes | |
| 1/2 in gypsum board, painted | | | Partly | |

**Worked example: tracing failures through the Riverbend wall.** Suppose wind-driven rain gets past a joint in the siding. If the weather-resistive barrier is continuous and lapped, the water runs down the barrier to a flashing and out of the wall, and no one ever knows it happened. If the barrier has a hole at an unsealed screw penetration, water reaches the foam joints and then the sheathing, which stays wet because it is on the cold side of the cavity insulation and dries slowly. Over several winters the sheathing decays. Now suppose instead that the water control layer works but the air control layer has a gap at the top plate. Warm, humid air flows through the gap on a windy night, contacts the cold sheathing, and frost forms. The frost melts on the first warm day and wets the same sheathing. The two failures arrive at the same damage by different routes, and only knowing which layer is missing tells you which to repair.

!!! mascot-thinking "Four Jobs, Not Four Materials"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    When you look at a wall section, ask "Which material is doing the water job? The air job? The vapor job? The heat job?" If any answer is "I can't tell," you have found where the wall is most likely to fail.

Use the interactive wall section below to see the layers in order, select a layer to learn what it does, and remove a layer to see what happens when it is missing.

#### Diagram: Control Layer Wall Section Explorer


<iframe src="../../sims/control-layer-wall-section-explorer/main.html" width="100%" height="688px" scrolling="no"></iframe>
[Run Control Layer Wall Section Explorer Fullscreen](../../sims/control-layer-wall-section-explorer/main.html)

<details markdown="1">
<summary>Control Layer Wall Section Explorer</summary>
Type: microsim
**sim-id:** control-layer-wall-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the layers of a cold-climate wall and the control layer each belongs to, and will predict (Bloom Level 2, Understand) the consequence of removing or breaking each layer.

Visual: A cross-section of the Riverbend wall drawn to scale, showing from left (exterior) to right (interior): cladding, drainage gap, weather-resistive barrier, rigid foam, sheathing, stud cavity with insulation, smart vapor retarder, and gypsum board. A four-color band beside the section marks which layers serve the water (blue), air (green), vapor (purple), and thermal (orange) control functions. Small arrows show rain, air, vapor, and heat approaching from outside or inside. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A checkbox beside each layer to "remove" it. A dropdown for the failure type ("missing," "hole," "unsealed seam"). A slider for outdoor temperature (-20 to 40°F), with indoor fixed at 70°F. A "Show temperature profile" toggle that draws the temperature through the wall as a line. A "Reset" button.

Interactions: Clicking a layer opens an infobox with its job, the material options, and the risks if it is missing. Removing a layer animates the corresponding flow (rain soaking the sheathing, air carrying vapor to the cold plane, heat flow arrows thickening) and shows a one-sentence consequence. When the temperature profile is on, the point where the sheathing drops below the dew point of the indoor air is highlighted in red with a "condensation risk" label.

Default state: All layers present, outdoor -10°F, profile hidden.

Implementation: p5.js with built-in checkboxes, select, slider, and buttons, and a responsive canvas.
</details>

!!! mascot-encourage "Layers Overlap, and That's Normal"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    It is easy to get lost when one material, like taped sheathing, serves two layers at once. Most students need two passes at this idea. Try drawing a wall section from memory, then color each layer by its job, and the overlaps will start to make sense.

## Wall Assemblies

A **wall assembly** is the complete set of layers, from interior finish to exterior cladding, that makes up a wall and performs all four control functions along with structure and fire resistance. The word *assembly* matters because performance belongs to the whole, not to any one product. A wall built from excellent materials can still leak if the parts do not connect, and a wall with modest materials can perform well if the layers are continuous. Chapter 7 covered the wood and steel framing that holds the wall up, and Chapter 8 covered the concrete and masonry walls that can replace it.

Walls are commonly grouped by where the insulation sits. In a *cavity-insulated* wall, the insulation fills the space between studs. In an *exterior-insulated* wall, a layer of insulation covers the outside of the framing. A *combined* wall has both. A *mass wall*, such as concrete or masonry, may place insulation inside, outside, or between two layers of the mass. Cold-climate energy codes commonly pair cavity insulation with continuous insulation, because cavity insulation alone loses much of its value to the framing.

!!! mascot-tip "Beau's Tip: Read the Wall Section From the Outside In"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you open a wall section detail, start at the cladding and read one layer at a time toward the interior, writing the job of each layer beside it. In a cold climate, the layers should fall in a sensible order, with the water layer outside and the vapor layer inside.

**Worked example: the Riverbend wall assembly.** Riverbend's wall is a combined assembly: 2×6 wood studs at 16 in on center with R-20 fiberglass in the cavity, 7/16 in OSB sheathing, two layers of 1 in XPS rigid foam (R-5 per inch), a weather-resistive barrier, a drainage gap, and fiber-cement siding, with a smart vapor retarder membrane and 1/2 in gypsum board inside. The R-values of the layers, using the Chapter 3 values for films and common materials, add in series along the cavity path.

| Layer (inside to outside) | R-value |
|---------------------------|---------|
| Inside air film | 0.68 |
| 1/2 in gypsum board | 0.45 |
| 5.5 in fiberglass cavity insulation | 20.0 |
| 7/16 in OSB sheathing | 0.5 |
| 2 in XPS rigid foam | 10.0 |
| Weather-resistive barrier, gap, and siding | 0.6 |
| Outside air film | 0.17 |
| **Total (cavity path)** | **32.4** |

The total of 32.4 applies only where there is cavity insulation. Through a stud the cavity insulation is replaced by 5.5 in of wood at about R-1.25 per inch, giving a layer R of \( 5.5 / 0.8 = 6.9 \) and a total of 19.3. Weighting these paths by area gives the effective R-value of 27.7 shown in the Continuous Insulation section.

The next MicroSim draws a simpler cold-climate wall as a stack of eight layers. Predict which of the four flows (rain, air, vapor, and heat) each layer stops. Then remove or puncture a layer and watch where the colored dots now travel. Turn on the temperature profile to see which layer falls below the dew point.

#### Diagram: Cold-Climate Exterior Wall

<iframe src="../../sims/example-cold-climate-wall/main.html" width="100%" height="698px" scrolling="no"></iframe>

[Run the Cold-Climate Exterior Wall MicroSim fullscreen](../../sims/example-cold-climate-wall/main.html){ .md-button }

<details markdown="1">
<summary>Cold-Climate Exterior Wall</summary>
Type: infographic
**sim-id:** example-cold-climate-wall<br/>
**Library:** p5.js<br/>
**Status:** Built

Learning objective: Students will identify (Bloom Level 1, Remember) the layers of a cold-climate wall and the job each does, and will predict (Bloom Level 2, Understand) what happens to rain, air, vapor, and heat when a layer is removed or punctured.
</details>

## Water Control Layer

The **water control layer** is the continuous plane in a wall that keeps liquid water from reaching materials that rot, corrode, or lose insulating value when wet. In Minneapolis, melting snow and freeze-thaw cycles add to the load of wind-driven rain. Water reaches a wall from four main sources:

- Rain driven against the wall by wind.
- Snowmelt and ice melting at roof edges and along the base of the wall.
- Water running off the roof or splashing back up from the ground.
- Water in the soil, which reaches below-grade walls.

The water control layer works by two principles. The *drainage plane* is a surface behind the cladding on which water runs downward by gravity. The *shingle principle* is the practice of lapping every layer over the one below it, so water always flows over the top of the next piece and never behind it.

The cladding is the first line of defense and stops most rain, but wind and capillary action push some water behind it. The water control layer is the second line. It is made of the weather-resistive barrier on the face of the sheathing or the exterior insulation, flashing at every opening and transition, and sealants where lapping is not possible. Flashing, which Chapter 12 explains in detail, is the part that moves water from the vulnerable places to the surface.

**Worked example: a flipped lap.** The weather-resistive barrier is applied in horizontal courses from the bottom of the wall up, which makes each upper course lap over the one below. Water running down the upper course passes over the lap onto the lower course and continues down. Now suppose a crew works from the top down, or tucks the upper course behind the lower. Water now runs *behind* the lower course, directly onto the sheathing. The materials, cost, and appearance are identical, and the wall looks fine from the street. Only the lapping direction has changed, and it turns a drainage plane into a funnel. This is why inspectors check the laps before the cladding covers them.

## Weather-Resistive Barrier

The **weather-resistive barrier** (WRB) is the sheet or coating applied over the sheathing or exterior insulation that forms the water control layer behind the cladding. The common types are summarized in the table below. A WRB must stop liquid water while allowing water vapor to pass out, so that a wall that gets wet can dry. This property is called being *vapor permeable* or "breathable." Building codes commonly require a WRB behind most claddings, with horizontal laps of about 2 in and vertical laps of about 6 in, and flashing integrated with it at windows and doors.

| Type | What it is | Typical notes |
|------|------------|---------------|
| Building paper | Asphalt-saturated felt, commonly 15-pound | Low cost, lapped and stapled |
| Housewrap | Spun-bonded plastic fiber sheet | Fast to install, seams taped |
| Fluid-applied membrane | Rolled or sprayed coating | Seamless, fills small gaps |
| Self-adhered membrane | Peel-and-stick sheet | Sticks to the substrate, often used at openings |

**Worked example: wrapping Riverbend.** Housewrap commonly comes in rolls 9 ft wide and 150 ft long, which cover 1,350 ft². The gross wall area is 4,680 ft². Adding a 10 percent allowance for laps and waste gives \( 4{,}680 \times 1.10 = 5{,}148 \) ft², and \( 5{,}148 / 1{,}350 = 3.8 \) rolls, so the crew orders 4 rolls. The wrap is run horizontally, and because the wall is 12 ft tall, each course of the 9 ft wide roll reaches only part of the way up the wall, so the second course laps over the first. Seams and penetrations are taped with the manufacturer's tape, since tape is what makes the sheet a continuous layer.

## Wall Sheathing

**Wall sheathing** is the rigid panel fastened to the outside of the studs. It has four jobs:

- **Structural skin.** It resists racking from wind and earthquakes, as Chapters 6 and 7 described.
- **Substrate.** It provides a flat, fastener-holding surface for the WRB, the foam, and the cladding.
- **Air control.** It often serves as the air control layer when its seams are taped.
- **Cavity closure.** It keeps insulation in place and closes the cavity.

Common choices are oriented strand board (OSB) and plywood from Chapter 7, and exterior-grade gypsum sheathing. A thin layer of 7/16 in OSB is a common choice.

In a cold climate, sheathing sits on the cold side of the cavity insulation. That makes it the surface most likely to become wet, because warm, humid air that leaks into the wall meets a cold surface there. Wood-based sheathing tolerates occasional wetting but decays if it stays wet. Two defenses are used together: the air and vapor control layers keep moisture from arriving, and continuous insulation outside the sheathing keeps it warmer, so it stays drier.

**Worked example: nailing the Riverbend sheathing.** A 4 ft by 8 ft panel covers 32 ft², so the 4,680 ft² of wall needs \( 4{,}680 / 32 = 146.25 \), which rounds up to 147 panels before waste. Suppose the structural drawings call for nails at 6 in along panel edges and 12 in in the field (an illustrative schedule). The panel perimeter is 24 ft, or 288 in, so \( 288 / 6 = 48 \) edge nails. Two interior stud lines of 8 ft each give \( 2 \times 96 / 12 = 16 \) field nails. That is 64 nails per panel and about \( 147 \times 64 = 9{,}400 \) nails in all. The nail spacing is not cosmetic. Closer edge nailing makes the panel a stronger shear wall, which is why the inspector counts nails before the wall is covered.

## Air Control Layer

The **air control layer** is the continuous plane that stops air from moving through the enclosure. Air leakage has three drivers that Chapter 4 described: wind pressure, the stack effect, in which warm indoor air rises and escapes at the top while cold air enters at the bottom, and mechanical systems that pressurize or depressurize the building. Air leaks through the cracks, joints, and penetrations of a wall far more easily than it passes through a solid sheet. Air leakage matters for three reasons:

- **Energy.** Leaving air carries its heat with it.
- **Comfort.** Leaks create drafts and cold surfaces.
- **Moisture.** Leaking air carries water vapor into walls, where it can condense on cold surfaces, usually moving far more moisture than vapor diffusion does.

The heat carried by leaking air follows from the heat equation in Chapter 3. For air, the heat loss in BTU/h equals 1.08 times the leakage rate in cubic feet per minute (cfm) times the temperature difference in degrees F:

\[ \dot{Q}_{\text{air}} = 1.08 \times \text{cfm} \times \Delta T \]

The constant 1.08 combines the density and specific heat of air and the 60 minutes in an hour.

**Worked example: the cost of leaky seams.** Riverbend has about \( 9{,}000 \times 12 = 108{,}000 \) ft³ of volume (an illustrative figure). If the enclosure leaks 0.5 air changes per hour, the leakage is \( 108{,}000 \times 0.5 / 60 = 900 \) cfm, and on the design day the loss is \( 1.08 \times 900 \times 80 = 77{,}760 \) BTU/h. That is larger than the 46,300 BTU/h that we calculated for conduction through the entire enclosure. If careful air sealing reduces the leakage to 0.15 air changes per hour, the flow falls to 270 cfm and the loss to \( 1.08 \times 270 \times 80 = 23{,}300 \) BTU/h. Sealing the air control layer saves more heat than any single insulation upgrade in this example, and it also protects the sheathing from the moisture that leaking air carries.

!!! mascot-warning "Watch Out: Insulation Is Not an Air Barrier"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Fiberglass batts are full of air spaces, and air flows through them nearly as easily as through the open cavity. If the batts are your only defense against drafts, the wall will leak. Add a real air control layer, such as taped sheathing or a sealed membrane, and keep the insulation for heat.

## Air Barrier

An **air barrier** is a material or assembly that resists the passage of air, and the *air barrier system* is the collection of such materials, joined at their seams and transitions, that forms the air control layer for the whole building. The distinction is the same as between a function and its means. The air control layer is the job, and the air barrier is what does it.

Codes commonly define an air barrier material by a maximum leakage of about 0.004 cfm per ft² of material at a pressure difference of 0.3 in. of water (about 75 Pa), a tiny rate compared with the open cavity in an insulation batt. Many materials meet this limit, as the table below shows. The materials themselves are the easy part.

| Air barrier material | How its seams are made airtight |
|----------------------|---------------------------------|
| Plywood or OSB sheathing | Tape or sealant at panel joints |
| Gypsum board | Sealed edges, gaskets, and caulk at the framing |
| Rigid foam board | Taped joints, or sealed at the edges |
| Sheet or fluid-applied membrane | Lapped and rolled, or applied seamlessly |
| Sealed polyethylene | Lapped and sealed with acoustical sealant |

The table shows that every option depends on its joints. The air barrier system is only as good as its seams, and it must also be *durable*, *continuous*, and strong enough to resist wind pressure without tearing or detaching.

**Worked example: taping the Riverbend sheathing.** Choose OSB sheathing as the air barrier and tape every seam. Each 4 ft by 8 ft panel has a 24 ft perimeter, but every seam is shared by two panels, so a panel contributes 12 ft of seam. The 147 panels give about \( 147 \times 12 \approx 1{,}760 \) ft of seam. A roll of sheathing tape is commonly 180 ft long, so \( 1{,}760 / 180 = 9.8 \), or 10 rolls, plus extra for the wall-to-roof and wall-to-foundation transitions and for the rough openings. The cost is small, but the work must be done on every seam with the surface dry and clean, which is why an air barrier is as much a quality-control task as a material choice.

## Vapor Control Layer

The **vapor control layer** is the layer that limits the diffusion of water vapor through the solid materials of an assembly. Vapor diffusion is the movement of water molecules through a material from the side of higher vapor pressure to the side of lower pressure, even when the air is not moving. Its rate depends on the material's *permeance*, measured in *perms*, where lower numbers mean less vapor passes. In a Minnesota winter, indoor vapor pressure is higher than outdoor pressure, so vapor diffuses outward, and the vapor control layer belongs on the warm interior side.

The wall must be able to dry as well as to resist wetting. A layer that blocks vapor on both sides traps any moisture that gets in. Designers therefore control the vapor on the side where it enters and leave a path for drying on the other.

### Vapor Retarder

A **vapor retarder** is a material or coating that serves as the vapor control layer, and codes sort vapor retarders into three classes by permeance, listed in the table below.

| Class | Permeance (perms) | Typical examples |
|-------|-------------------|------------------|
| I | 0.1 or less | Polyethylene sheet, sheet metal |
| II | More than 0.1, up to 1.0 | Kraft paper facing on a batt |
| III | More than 1.0, up to 10 | Latex paint on gypsum board |

A *smart* retarder is a membrane that changes permeance with humidity, closing in winter and opening in summer so the wall can dry. Minnesota is in Climate Zone 6 or 7, so building codes commonly require at least a Class I or II retarder on the interior face of the wall, with exceptions that depend on the assembly. The designer should confirm the specific requirement in the Minnesota State Building Code.

!!! mascot-warning "Watch Out: Two Vapor Barriers Make a Wall That Can't Dry"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Polyethylene on the inside plus a layer of closed-cell foam or vinyl wallpaper that is also impermeable can trap moisture that gets in. Choose one primary vapor control layer on the warm side, and make sure the other side of the wall can dry to the exterior.

## Thermal Control Layer

The **thermal control layer** is the continuous plane of insulation that slows heat flow through the enclosure. Chapter 3 explained that the effective R-value of a wall is less than the R-value printed on the insulation, because studs, plates, and headers conduct heat around the cavity. The word *continuous* is the key. A thermal control layer is only as good as its weakest path, so the design goal is to avoid breaks in the insulation, not only to add thickness.

Insulation can be placed in the cavity, outside the framing, or both. Cavity insulation is simple and fits within the framing depth, but the studs remain thermal bridges. Exterior insulation covers the framing and so reduces bridging, and it also keeps the framing and sheathing warmer. Cavity insulation is commonly combined with exterior insulation in cold climates.

**Worked example: the effective R-value of Riverbend's cavity wall.** Consider the 2×6 wall without its exterior foam. Along the cavity path, the total R is \( 0.68 + 0.45 + 20 + 0.5 + 0.6 + 0.17 = 22.4 \), so \( U = 1/22.4 = 0.0446 \). Along the stud path, the 5.5 in of wood gives \( 5.5 / 0.8 = 6.9 \) in place of the 20, so the total is 9.3 and \( U = 1/9.3 = 0.1075 \). With framing taking 25 percent of the area (a common estimate) the parallel path method gives:

\[ U = 0.75 \times 0.0446 + 0.25 \times 0.1075 = 0.0603 \qquad R_{\text{eff}} = \frac{1}{0.0603} = 16.6 \]

The effective R-value of 16.6 is 26 percent lower than the 22.4 that a series calculation suggests, even though the cavity is filled with R-20 insulation. The next sections show how the choice of insulation and its placement can recover that loss.

## Insulation

**Insulation** is any material that resists the conduction of heat, and nearly all of it works the same way: it holds a large volume of still air or low-conductivity gas inside a lightweight structure of fibers, cells, or particles. Air itself conducts heat poorly but moves easily by convection, so the structure of the material must trap the air. This is why insulation loses effectiveness when compressed, soaked, or full of gaps. Insulation is made as fibrous batts and loose fill, as spray-applied foam, and as rigid boards, and the choice among them depends on where it goes and which other layers it must also serve. The R-value of a layer equals its R per inch times its thickness, as in Chapter 3.

The five insulation families used in Minnesota walls are fiberglass, mineral wool, cellulose, spray foam, and rigid foam board. The table below summarizes approximate R per inch values, which vary by product, density, and temperature. The following sections describe each family in turn.

| Insulation | Approximate R per inch | Main form | Notable feature |
|------------|------------------------|-----------|-----------------|
| Fiberglass | 3.1 to 3.8 | Batts, blown | Low cost, not an air barrier |
| Mineral wool | 3.7 to 4.2 | Batts, board | Noncombustible, water-repellent |
| Cellulose | 3.2 to 3.8 | Blown, dense-packed | Recycled content, fills voids |
| Open-cell spray foam | 3.5 to 3.7 | Sprayed in place | Air-sealing, vapor-permeable |
| Closed-cell spray foam | 6.0 to 7.0 | Sprayed in place | Highest R per inch, air-sealing |
| EPS and XPS board | 3.6 to 5.0 | Rigid board | Moisture-resistant, continuous |
| Polyisocyanurate board | 5.6 to 6.5 | Rigid board, foil-faced | High R per inch, loses R in cold |

**Worked example: reaching R-20 in a 5.5 in cavity.** The thickness needed equals the target R divided by the R per inch. Fiberglass or cellulose at about R-3.7 per inch needs \( 20 / 3.7 = 5.4 \) in, which just fits. Open-cell foam at R-3.6 fills 5.5 in to give 19.8. Closed-cell foam at about R-6.5 needs only \( 20 / 6.5 = 3.1 \) in, leaving room for something else but costing much more per R. No option exceeds the 5.5 in of a 2×6 cavity by much, and that depth limit is the reason cold-climate designers add insulation outside the framing instead of deepening the cavity.

#### Diagram: Insulation R-Value and Thickness Comparison


<iframe src="../../sims/insulation-r-per-inch-thickness-chart/main.html" width="100%" height="862px" scrolling="no"></iframe>
[Run Insulation R-Value and Thickness Comparison Fullscreen](../../sims/insulation-r-per-inch-thickness-chart/main.html)

<details markdown="1">
<summary>Insulation R-Value and Thickness Comparison</summary>
Type: chart
**sim-id:** insulation-r-per-inch-thickness-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) insulation materials by R per inch and the thickness each needs to reach a target R-value, and will justify (Bloom Level 5, Evaluate) a choice for a given cavity depth.

Visual: A horizontal bar chart with one bar per insulation type showing the thickness in inches needed to reach the target R-value. A vertical line marks the depth of the selected cavity. Bars that fit within the cavity are green and bars that do not are red. The chart is responsive, 440 px tall, and redraws on window resize.

Controls: A slider for target R-value (R-10 to R-60). A dropdown for cavity depth (3.5 in, 5.5 in, 7.25 in, 9.25 in, none). A checkbox "Show typical relative cost." A checkbox "Show cold-weather derating," which reduces polyisocyanurate's R per inch at low temperature with an explanation.

Interactions: Hovering over a bar shows the material's R per inch range, the thickness needed, and one line about its air-sealing, moisture, and fire behavior. Clicking a bar opens an infobox with common uses and installation cautions.

Default state: R-20 target, 5.5 in cavity, fiberglass, cellulose, and open-cell foam within the cavity, and closed-cell foam well under it.

Implementation: Chart.js horizontal bar chart with a custom plugin for the cavity line and dynamic bar colors.
</details>

## Fiberglass Insulation

**Fiberglass insulation** is made of fine glass fibers, bonded with a binder and formed into batts and rolls, or chopped into loose fill that is blown into attics and cavities. It is the most widely used insulation in North America because it is inexpensive and easy to install. Its performance depends heavily on installation quality, and a good installation meets three tests:

- The batt fills the cavity fully, with no gaps or voids.
- The batt is not compressed or folded to fit.
- The batt is cut to fit around wiring and boxes.

Fiberglass does not stop air movement, so it needs a separate air control layer. It does not burn, although paper and foil facings can.

## Mineral Wool Insulation

**Mineral wool insulation** is made from spun molten basalt rock or industrial slag. Its R per inch is similar to or a bit higher than fiberglass. The dense fibers resist fire, so mineral wool is noncombustible and commonly used in fire-rated assemblies, which Chapter 18 develops. It repels liquid water but lets water vapor pass, so it dries readily. Mineral wool comes as batts for cavities and as rigid or semi-rigid board for exterior insulation, where its vapor permeability allows the wall to dry outward, an advantage over foam plastics. It is heavier and more expensive than fiberglass. Its density also makes it a good sound absorber, which is why it is popular in partitions between rooms.

## Cellulose Insulation

**Cellulose insulation** is made mostly of recycled newsprint, shredded and treated with borate compounds that resist fire, insects, and mold. It is blown into attics as loose fill and into closed wall cavities at a higher density, called *dense-packing*, which fills voids around wiring and framing better than batts do. Dense-packed cellulose slows air movement through the cavity, though it is not a substitute for an air barrier. Cellulose can absorb and release moisture, which buffers short wetting events, but it must be kept dry. Loose-fill depth settles over time, so installers add depth to meet the labeled R-value after settling. Installers blow it through a hose, so it fills irregular spaces that batts cannot.

## Spray Foam Insulation

**Spray foam insulation** is a plastic foam that is mixed and sprayed in place, where it expands and adheres to the surfaces it touches. The two types behave differently. *Open-cell* foam is soft and light, has an R of about 3.6 per inch, and is vapor-permeable. *Closed-cell* foam is denser, has an R of about 6 to 7 per inch, stiffens the surface it is applied to, and in a few inches of thickness acts as a Class II vapor retarder. Both seal air leaks as they cure, so one application can supply the thermal and air control layers. The foam must be installed by trained crews at the manufacturer's required thickness per pass, because poor mixing or thick passes can cause shrinkage and odors. Some blowing agents have a large global-warming effect, a topic Chapter 20 examines.

## Rigid Foam Insulation

**Rigid foam insulation** is board stock made of plastic foam: expanded polystyrene (EPS), extruded polystyrene (XPS), or polyisocyanurate (polyiso). It resists moisture and compression, comes in uniform thicknesses, and can be installed as an unbroken layer outside the framing, which makes it the standard material for continuous insulation. XPS is about R-5 per inch and polyiso about R-6 per inch when warm, though polyiso loses part of that value at low temperatures, which matters in Minnesota. When foam plastic is used inside the building, codes commonly require a thermal barrier such as 1/2 in gypsum board to protect it from fire.

The table below ties the five families together by showing where each might be used at Riverbend. The selections are illustrative.

| Location | Likely insulation | Reason |
|----------|-------------------|--------|
| Stud cavity | Fiberglass batts | Lowest cost for the R-value |
| Outside the sheathing | XPS or mineral wool board | Continuous, unbroken by studs |
| Attic floor above the ceiling | Blown cellulose | Fills irregular spaces at low cost |
| Rim joist and small air leaks | Closed-cell spray foam | Seals air and insulates in one step |
| Slab edge | XPS board | Resists moisture and compression |

## Continuous Insulation

**Continuous insulation** (CI) is a layer of insulation that is uninterrupted by framing, installed over the face of studs, so heat has no easy path around it. Its R-value adds to the whole assembly in full, because it covers the studs as well as the cavities. This property is its advantage over adding more cavity insulation, which helps only where the cavity is.

**Worked example: adding CI to Riverbend.** Take the 2×6 wall with an effective R of 16.6 from the thermal control layer section. Adding 2 in of XPS at R-10 increases both paths by 10. The cavity path becomes 32.4 and the stud path 19.3, so the new area-weighted U-value is \( 0.75 / 32.4 + 0.25 / 19.3 = 0.0231 + 0.0130 = 0.0361 \), which gives \( R_{\text{eff}} = 27.7 \). The assembly gained \( 27.7 - 16.6 = 11.1 \) in effective R from only 10 of added foam, because the foam also covers the bridges. An extra R-10 of cavity insulation, even if it could be fitted into the stud space, would have done nothing for the studs themselves.

The foam also keeps the sheathing warm. Using the cavity path at -10°F outside, the heat flow is \( 80 / 22.4 = 3.57 \) BTU/h per ft² without foam, and the temperature at the inside face of the sheathing is \( 70 - 3.57 \times 21.13 = -5.5 \)°F. With foam the flow is \( 80 / 32.4 = 2.47 \), and the sheathing temperature is \( 70 - 2.47 \times 21.13 = 17.8 \)°F, which is 23°F warmer. The *dew point* is the temperature at which air becomes saturated and water condenses, and for 70°F indoor air at 30 percent relative humidity it is about 37°F. The sheathing is still below that temperature on the coldest night, so CI reduces the risk but does not replace the air and vapor control layers, which keep indoor air away from the sheathing.

The table below summarizes the comparison.

| Assembly | Cavity path R | Stud path R | Effective R | Sheathing inside face at -10°F |
|----------|---------------|-------------|-------------|--------------------------------|
| 2×6 with R-20 batts only | 22.4 | 9.3 | 16.6 | -5.5°F |
| Same wall with 2 in XPS (R-10) | 32.4 | 19.3 | 27.7 | 17.8°F |

You can reproduce these calculations with the Chapter 3 Wall Assembly R-Value and Thermal Bridging Calculator by choosing 2×6 framing, R-20 fiberglass, and 2 in of XPS.

## Foundation Waterproofing

**Foundation waterproofing** is a membrane or coating applied to the outside of a below-grade foundation wall to keep soil water out of the building. Two levels of protection are used. *Dampproofing* is a thin asphalt-based coating that resists the moisture in soil but not standing water, and codes commonly require it on basement walls. *Waterproofing* is a continuous membrane, such as a self-adhered rubberized asphalt sheet or a fluid-applied coating, that resists water under hydrostatic pressure, and it is typically required where the water table is high, as Chapter 9 described. Waterproofing is applied from the footing to above finished grade, carried over the top of the footing, and protected from backfill damage by a drainage board. It works with the perimeter drain from Chapter 10, since the drain lowers the water pressure and the waterproofing resists what remains.

## Frost-Protected Foundations

A **frost-protected foundation** is a shallow foundation that uses insulation to keep frost out of the soil beneath the footing, so the footing can sit above the normal frost depth. The principle is that heat escaping from a heated building keeps the soil beneath it warm. Rigid foam placed against the foundation wall and extended outward as a horizontal "wing" prevents the cold from reaching under the footing from the sides. Codes and the ASCE 32 standard permit this approach for heated buildings, with insulation dimensions that depend on the climate zone, and footings can be as shallow as 12 to 16 in in many cases. Frost-protected foundations are common for slab-on-grade houses and garages in Minnesota, and they are not suited to unheated buildings or to buildings with poor soil drainage.

**Worked example: the savings at Riverbend.** Suppose the foundation wall is 8 in thick. A standard footing at 42 in compared with a frost-protected footing at 16 in saves 26 in of wall depth. For the 390 ft perimeter, that is \( (8/12) \times (26/12) \times 390 = 563 \) ft³, or about 21 yd³ of concrete, and the saved excavation and backfill. The saving is offset by the cost of the foam and the need to insulate the corners, where heat loss is greater, so the designer compares the two options before choosing.

!!! mascot-celebration "You Can Read a Wall"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now name the four control layers, order them from outside to inside for a Minnesota wall, calculate the effective R-value of a framed wall with and without continuous insulation, and explain why a leaky air control layer can cost more heat than the insulation saves. You also know your insulation families and how a foundation is protected from water and frost. That is the toolkit for reading any wall section.

## Key Takeaways

- The building enclosure separates inside from outside, and its roof, walls, windows, and foundation set the area, U-value, and temperature difference terms in heat loss. Windows can lose several times more heat per square foot than walls.
- Four control layers, for water, air, vapor, and heat, must each be continuous and in the right order for the climate. One material can serve more than one layer.
- The water control layer uses the weather-resistive barrier, flashing, and the shingle principle so that water drains out of the wall and never in.
- Wall sheathing is a structural panel that also supports the WRB and, when taped, can serve as the air barrier. It sits on the cold side of the insulation, so it must be kept dry and warm.
- Air leakage can carry more heat and moisture than conduction or diffusion, and insulation alone is not an air barrier. A seam-sealed air barrier system makes the air control layer continuous.
- The vapor control layer belongs on the warm side of a Minnesota wall, and a wall needs a path to dry. Vapor retarders are rated Class I, II, or III by permeance.
- Framing reduces a wall's effective R-value, and continuous insulation over the studs restores the loss and keeps the sheathing warmer.
- Fiberglass, mineral wool, cellulose, spray foam, and rigid foam differ in R per inch, air and vapor behavior, fire performance, and cost.
- Foundation waterproofing keeps soil water out of below-grade walls, and frost-protected foundations use insulation to allow shallower footings in heated buildings.

[See Annotated References](./references.md)
