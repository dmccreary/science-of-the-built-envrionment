---
title: Cladding, Windows, Doors, and Air Sealing
description: How cladding, flashing, sealants, windows, glazing, doors, air sealing, and interior finishes complete a wall and keep water, air, and heat under control in a cold climate.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:07:50
version: 1.10
---

# Cladding, Windows, Doors, and Air Sealing

## Summary

The cladding systems, flashing, windows, doors, and air-sealing methods that complete a wall, plus the interior finishes behind them. It builds on the prerequisite concepts from Chapters 1, 3, 4, 5, 6, 8, 11. After completing this chapter, students will be able to define, explain, and apply the 19 concepts listed below.

## Concepts Covered

This chapter covers the following 19 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Cladding | 8 |
| Sealants | 7 |
| Glazing | 7 |
| Air Sealing | 6 |
| Windows | 4 |
| Blower Door Test | 2 |
| Gypsum Board | 2 |
| Brick Veneer | 1 |
| Siding | 1 |
| Stucco | 1 |
| Metal Panels | 1 |
| Rainscreen | 1 |
| Curtain Wall | 1 |
| Flashing | 1 |
| Low-E Coatings | 1 |
| Window U-Factor | 1 |
| Solar Heat Gain Coefficient | 1 |
| Doors | 1 |
| Interior Finishes | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 5: Properties of Building Materials](../05-material-properties/index.md)
- [Chapter 6: Structural Loads and Load Paths](../06-structural-loads/index.md)
- [Chapter 8: Concrete and Masonry](../08-concrete-masonry/index.md)
- [Chapter 11: Enclosure Control Layers and Insulation](../11-enclosure-insulation/index.md)

---

!!! mascot-welcome "Finishing the Wall Where People Can See It"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Cladding, windows, and doors are the parts of a building that everyone notices, and they are also the parts that leak first. You are about to learn how to make them look good and keep a Minnesota winter on the outside where it belongs. Let's build it right!

Chapter 11 described the control layers inside a wall and the insulation that fills it. This chapter looks at the pieces that complete the wall: the cladding on the outside, the windows and doors that interrupt it, the flashing and sealants that seal every joint, the air sealing that closes the last leaks, and the interior finishes on the inside. Each piece must connect to the control layers behind it. A beautiful cladding with a poor flashing detail is a leak waiting to happen.

We continue with the invented **Riverbend Youth Center**: 12 ft walls around a 390 ft perimeter, 4,680 ft² of gross wall, 702 ft² of windows, and the wall assembly from Chapter 11 with fiber-cement siding over a drainage gap. All dimensions and ratings are illustrative.

## Cladding

**Cladding** is the exterior skin of a wall, the outermost layer that the weather and the public see. It has four jobs. It sheds most of the rain and snow so that less water reaches the layers behind it. It protects those layers from sunlight, which breaks down plastics and membranes, and from impact and wear. It gives the building its appearance. And it contributes to fire performance, since the exterior surface is the first to meet a fire from outside. Cladding is not the water control layer. It is the first line of defense that reduces the load on the weather-resistive barrier, which Chapter 11 described as the second line.

Cladding systems follow one of two strategies. A *face-sealed* system tries to keep all water out at the surface, so that every joint must stay watertight for the life of the wall. A *drained* system assumes that some water will get behind the cladding and provides a path for it to drain out, which is how most modern walls are designed. The five cladding families in this chapter are siding, brick veneer, stucco, metal panels, and curtain wall, and each has its own section. The table below compares them at a high level.

| Cladding | Typical weight | Strategy | Typical use |
|----------|----------------|----------|-------------|
| Siding (fiber cement, wood, vinyl) | Light, about 1 to 3 psf | Drained | Houses, schools, light commercial |
| Brick veneer | Heavy, about 40 psf | Drained cavity | Institutional and civic buildings |
| Stucco | Medium, about 8 to 10 psf | Drained, on lath | Commercial and residential |
| Metal panels | Light, about 1 to 3 psf | Drained, rainscreen | Commercial and industrial |
| Curtain wall | Medium | Engineered system | Multi-story commercial |

**Worked example: what the cladding adds to the footing.** The weight of the cladding is carried by the foundation, so the choice affects Chapter 10's footing. Suppose Riverbend uses fiber cement at about 2.5 psf (illustrative). On a 12 ft wall, it adds \( 2.5 \times 12 = 30 \) plf to the line load. If the owner instead chooses brick veneer at about 40 psf, it adds \( 40 \times 12 = 480 \) plf, which is 16 times as much. On the 2,000 psf soil used in Chapter 10, the extra footing width is \( 480 / 2{,}000 = 0.24 \) ft, or about 2.9 in, and the brick also needs a ledge on the foundation wall to sit on. A cladding choice that seems purely visual changes the foundation, the wall details, and the budget.

#### Diagram: Cladding Rainscreen Water Path Explorer


<iframe src="../../sims/cladding-rainscreen-water-path-explorer/main.html" width="100%" height="697px" scrolling="no"></iframe>
[Run Cladding Rainscreen Water Path Explorer Fullscreen](../../sims/cladding-rainscreen-water-path-explorer/main.html)

<details markdown="1">
<summary>Cladding Rainscreen Water Path Explorer</summary>
Type: microsim
**sim-id:** cladding-rainscreen-water-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) how face-sealed, drained, and rainscreen cladding systems manage water that gets past the surface, and will explain (Bloom Level 2, Understand) why a drainage gap lets a wall dry.

Visual: A cross-section of a wall, with cladding on the left, a gap, a weather-resistive barrier, sheathing, and a stud cavity. Animated blue droplets fall and blow against the cladding. In the selected system, some droplets enter through a joint. A base flashing and weep opening at the bottom are drawn to scale. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown to choose the system (face-sealed siding, drained siding, brick veneer with cavity, rainscreen with ventilated gap). A slider for wind-driven rain intensity (light, moderate, heavy). A checkbox to add or remove the flashing and weep openings. A "Run storm" button, and a "Dry out" button that shows the drying time of each system after the storm.

Interactions: Hovering over a droplet or layer shows where the water is and what moves it (gravity, wind pressure, or capillary action). A moisture gauge on the sheathing rises when water is trapped and falls when it drains. A message explains why the face-sealed system without drainage soaks the sheathing, and why a ventilated gap dries it fastest.

Default state: Drained siding, moderate rain, flashing present.

Implementation: p5.js with built-in select, slider, checkbox, and buttons, a simple particle model, and a responsive canvas.
</details>

## Siding

**Siding** is a family of thin, lapped cladding boards or panels fastened to the wall in horizontal or vertical courses. The most common types are fiber cement, a mixture of cement, sand, and cellulose fibers that resists rot and fire; wood and engineered wood; and vinyl. Each course overlaps the one below, which sheds water by the same shingle principle used for the weather-resistive barrier. Siding is fastened through the barrier and into studs or into furring strips, because the thin boards cannot carry much load themselves. Vinyl needs room to expand and contract with temperature, so its nail holes are slotted and the nails are not driven tight. Fiber-cement boards must be cut with dust control, since the dust contains silica, which can harm the lungs of those cutting it.

## Brick Veneer

**Brick veneer** is a single layer of brick laid in front of a structural backup wall, supported by the foundation and attached to the backup by metal ties. It carries only its own weight and does not hold up the building. Chapter 8 introduced brick and mortar. A brick veneer wall has five parts that work together:

- **Air space.** A cavity commonly 1 in or more between the brick and the backup wall.
- **Ties.** Metal anchors that hold the brick to the backup wall against wind.
- **Flashing.** A membrane or metal at the base of the wall and above openings that catches water running down the cavity.
- **Weep holes.** Small openings in the mortar joints just above the flashing that let the water out.
- **Lintels.** Steel angles that hold the brick above windows and doors.

In a cold climate, brick should be rated for freeze-thaw exposure, since water that freezes in porous brick can pop the face off. Brick is durable and heavy, as the footing example showed, and it must sit on a ledge of the foundation wall.

Brick is a rain *screen*, not a rain *barrier*. Wind-driven rain soaks through the brick, runs down the air space, and leaves at the weep holes, so the layers behind the brick must be able to stop what gets through. The MicroSim below traces rain and air through a brick veneer wall. Remove each layer in turn and decide whether the rain, the air, or both would then reach the sheathing.

#### Diagram: Brick Veneer Rainscreen Wall

<iframe src="../../sims/brick-veneer-rainscreen-layer-explorer/main.html" width="100%" height="664px" scrolling="no"></iframe>

[Run the Brick Veneer Rainscreen Wall MicroSim fullscreen](../../sims/brick-veneer-rainscreen-layer-explorer/main.html){ .md-button }

<details markdown="1">
<summary>Brick Veneer Rainscreen Wall</summary>
Type: infographic
**sim-id:** brick-veneer-rainscreen-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Built

Learning objective: Students will identify (Bloom Level 1, Remember) the four layers of a brick veneer wall with a drained air gap and will predict (Bloom Level 2, Understand) what reaches the sheathing when a layer is missing or punctured.
</details>

## Stucco

**Stucco** is a cement-based plaster applied in layers over a lath of metal mesh or other backing. A traditional three-coat system builds a plaster skin about 7/8 in thick, applied in this order:

1. **Scratch coat.** The first coat, pressed into the lath and scored so the next coat can grip it.
2. **Brown coat.** A leveling coat that builds thickness and flatness.
3. **Finish coat.** The colored or textured surface the public sees.

Stucco is hard and fire-resistant, but it cracks as the building moves, and the cracks let water in. For this reason, stucco on wood framing is applied over a water-resistive barrier, often with a drainage mat that creates a gap behind it. A related system, the exterior insulation and finish system (EIFS), glues foam board to the wall and covers it with a thin synthetic coating. EIFS has a history of leaks when it was installed without drainage, and modern versions include a drainage layer.

## Metal Panels

**Metal panels** are sheets of steel or aluminum, formed with ribs or flat seams, that are fastened to the wall with clips or screws. They are light, durable, and available in many finishes, and they are common on commercial and industrial buildings. Metal moves with temperature changes, and the joints between panels must allow that movement, as the sealant section below calculates. Metal conducts heat well, so the clips and girts that hold the panels create thermal bridges unless they are separated from the structure with thermal breaks, an application of Chapter 3's thermal bridging. Panels are normally installed as a rainscreen, with an air space behind them.

## Curtain Wall

A **curtain wall** is an exterior wall that hangs from the building's structure and carries no load except its own weight and the wind. It usually consists of an aluminum frame with glass or panels as infill, and it is the typical exterior of a multi-story commercial building. Because the structure carries the floor loads, as Chapter 6 described, the wall can be thin and highly glazed. A curtain wall is a complete enclosure in itself, so its frame must include the water, air, vapor, and thermal control layers. It requires *thermal breaks*, strips of low-conductivity plastic inside the aluminum frame, because bare aluminum conducts heat very well. A *storefront*, the one-story version of the same idea, is common at building entries and would be used for Riverbend's lobby.

## Rainscreen

A **rainscreen** is a cladding assembly with a gap, often 3/4 in or more, between the cladding and the water-resistive barrier. The gap provides three benefits:

- **Drainage.** Water that gets past the cladding falls down the gap and drains out at the bottom.
- **Drying.** Air moving in the gap dries the wall.
- **Capillary break.** The gap stops capillary action, the force that draws water through narrow spaces.

A true *pressure-equalized* rainscreen also lets the pressure in the gap match the wind pressure outside, so the wind has less force pushing rain through the joints. In a cold climate, the gap also lets snow melt and drain, and it keeps the cladding from touching a wet surface. Riverbend's siding is mounted on vertical furring strips, which form the gap and also provide a place to fasten the siding through the exterior foam.

## Flashing

**Flashing** is thin, water-resistant material installed at joints and openings to direct water out of the wall. It is made of sheet metal such as galvanized steel, aluminum, or copper, or of a self-adhered membrane. Flashing is placed wherever water would otherwise collect or enter, which includes above and below windows and doors, at the base of walls, where roofs meet walls, above ledges, and at penetrations. The top of the flashing tucks behind the weather-resistive barrier, and the bottom lies over the cladding below it. This is the shingle principle again. At the ends, an upturned *end dam* keeps water from running off the side.

**Worked example: flashing a window opening.** The sequence in which a crew installs the flashing is as important as the materials, because each layer must lap over the one below it.

1. Install a *sill pan*, a flashing that slopes outward at the bottom of the opening, with end dams at each side.
2. Set the window and fasten it to the framing.
3. Apply flashing tape at the jambs, lapping over the sill pan.
4. Install a head flashing above the window that extends out over the cladding.
5. Lap the weather-resistive barrier over the head flashing, so that water that runs down the barrier is directed onto the flashing and outward.

If the barrier were installed *under* the head flashing, water running down the wall would flow behind it and into the window opening. Metals must also be compatible, because aluminum in contact with copper corrodes in the presence of water, a process called galvanic corrosion.

#### Diagram: Window Flashing Sequence Explorer


<iframe src="../../sims/window-flashing-sequence-explorer/main.html" width="100%" height="482px" scrolling="no"></iframe>
[Run Window Flashing Sequence Explorer Fullscreen](../../sims/window-flashing-sequence-explorer/main.html)

<details markdown="1">
<summary>Window Flashing Sequence Explorer</summary>
Type: microsim
**sim-id:** window-flashing-sequence-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will sequence (Bloom Level 3, Apply) the flashing steps around a window opening and will evaluate (Bloom Level 5, Evaluate) a flashing detail by tracing where water goes when a lap is reversed.

Visual: An elevation and section of a window opening in the Riverbend wall showing the rough opening, sill pan, jamb tapes, head flashing, weather-resistive barrier, and siding. Each layer is drawn in a different color and lifts away in an exploded view when selected. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A "Next step" and "Previous step" button that add or remove layers in the correct order. A "Test the sequence" mode in which the learner drags the five layers into order. A "Reverse a lap" toggle that places one layer in the wrong position. A "Pour water" button that sends animated water down the wall.

Interactions: Hovering over a layer shows its name and what it laps over. After "Pour water," droplets follow the surfaces and exit to the exterior in the correct sequence. With the reversed lap, droplets enter the opening and a red highlight and message identify the error and the resulting damage.

Default state: Correct sequence, all steps shown, water not running.

Implementation: p5.js with built-in buttons, drag-and-drop hit testing, a path-following water animation, and a responsive canvas.
</details>

!!! mascot-warning "Watch Out: Caulk Is Not Flashing"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A bead of caulk across the top of a window is not a substitute for a head flashing, because sealant ages, cracks, and leaves a gap. Install real flashing first, lapped over the layer below it, and treat the sealant as a backup.

## Sealants

A **sealant** is a flexible material that fills a joint to keep out water and air while allowing the parts on either side to move. Joints are needed because materials expand and contract with temperature, shrink as they dry, and shift under wind and settlement. A rigid filler would crack, so the sealant must stretch and recover. Common types are silicone, polyurethane, polysulfide, and acrylic latex. Silicone and polyurethane have the highest movement capability and the longest life, and acrylic latex is used for interior and low-movement joints. The sealant's *movement capability* is the percentage of the joint width it can stretch and compress, such as plus or minus 25 percent or plus or minus 50 percent.

A sealant joint is a small assembly and has two parts besides the sealant. A *backer rod* is a foam cylinder pressed into the joint to set the sealant depth and to keep the sealant from sticking to the back of the joint. The sealant should stick to the two sides only, so it can stretch freely, and sealant that sticks on three sides tears as the joint moves. The depth is commonly about half the width, with a minimum near 1/4 in.

The movement to be accommodated comes from the linear thermal expansion of the materials:

\[ \Delta L = \alpha \, L \, \Delta T \]

Here \( \Delta L \) is the change in length, \( \alpha \) is the coefficient of thermal expansion for the material, \( L \) is the length, and \( \Delta T \) is the temperature change. The joint width must be large enough that the movement is no more than the sealant's capability, which gives:

\[ W_{\min} = \frac{\Delta L}{2 \times \text{movement capability}} \]

**Worked example: a joint beside a metal panel.** An aluminum panel is 10 ft (120 in) long, and its surface temperature ranges from -20°F on a winter night to 140°F on a sunny summer day (illustrative), so \( \Delta T = 160 \)°F. Aluminum has \( \alpha \approx 13 \times 10^{-6} \) per °F, so \( \Delta L = 13 \times 10^{-6} \times 120 \times 160 = 0.25 \) in. If the joint takes all this movement and the sealant is rated for plus or minus 25 percent, the joint must be at least \( 0.25 / (2 \times 0.25) = 0.5 \) in wide, with a sealant depth of about 1/4 in. A sealant rated for plus or minus 50 percent needs only \( 0.25 / (2 \times 0.5) = 0.25 \) in. A designer who draws a 1/8 in joint, as is often seen on drawings, has specified a joint that will tear on the first cold night.

#### Diagram: Sealant Joint Movement Calculator


<iframe src="../../sims/sealant-joint-movement-calculator/main.html" width="100%" height="688px" scrolling="no"></iframe>
[Run Sealant Joint Movement Calculator Fullscreen](../../sims/sealant-joint-movement-calculator/main.html)

<details markdown="1">
<summary>Sealant Joint Movement Calculator</summary>
Type: microsim
**sim-id:** sealant-joint-movement-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) thermal movement and the minimum sealant joint width for a given material, length, temperature range, and sealant rating.

Visual: A side-by-side cross-section of a joint between two panels, drawn to scale. The joint, backer rod, and sealant are labeled. The joint opens and closes as a temperature slider moves from cold to hot, with the sealant stretching and compressing and shown in green, yellow, or red as it nears or exceeds its rating. A small table shows the calculation steps. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A dropdown for material (aluminum, steel, vinyl, wood across grain, concrete). A slider for panel length (2 to 20 ft). Two sliders for the lowest and highest temperatures (-30 to 160°F). A dropdown for sealant rating (plus or minus 12.5, 25, 35, 50 percent). A slider for joint width (1/8 to 1 in). A checkbox "Three-sided adhesion" to show how the sealant tears without a backer rod.

Interactions: Hovering over the sealant shows its strain as a percentage of its rating. The readout lists the movement, the minimum joint width, and whether the chosen width passes. When the width fails, the sealant tears in the animation, and a message explains the cause.

Default state: Aluminum, 10 ft, -20 to 140°F, plus or minus 25 percent, joint width 1/2 in, passing.

Implementation: p5.js with built-in dropdowns, sliders, and a checkbox, and a responsive canvas.
</details>

## Windows

A **window** is a manufactured assembly that fills an opening in a wall to admit light, views, and sometimes air. The assembly has four parts. The *glazing* is the glass. The *frame* surrounds the glass and attaches to the wall. The *sash* is the movable part of an operable window that holds the glass. *Hardware* includes the hinges, locks, and weatherstripping that allow the window to open and seal. The water, air, vapor, and thermal layers all stop at the frame and must be reconnected around it.

Windows are named by how they open. A *fixed* window does not open and has the lowest air leakage. A *double-hung* window has two sashes that slide vertically. A *casement* window is hinged at the side and swings out like a door, and an *awning* window is hinged at the top. Frames are made of wood, vinyl, fiberglass, or aluminum, and each conducts heat differently. Aluminum frames conduct heat well and need a thermal break, while vinyl and fiberglass frames are better insulators. The ratings that describe the combined glass and frame are listed on a label from the National Fenestration Rating Council (NFRC).

In a Minnesota winter, the warmth of the inside glass surface matters for both comfort and condensation. The inside film resistance is about 0.68 (the value from Chapter 3), and the heat flow through the window is \( U \times \Delta T \) per ft². The temperature drop across the inside film is that heat flow times 0.68, so the inside surface temperature is:

\[ T_{\text{surface}} = T_{\text{in}} - U \, \Delta T \, (0.68) \]

**Worked example: will the glass sweat?** Compare two Riverbend window options on the 80°F design day with 70°F indoor air. Window A is a clear double pane in a vinyl frame, U-0.48. Window B is a low-emissivity double pane with argon in a fiberglass frame, U-0.28. The inside surface of A is \( 70 - 0.48 \times 80 \times 0.68 = 43.9 \)°F, and of B it is \( 70 - 0.28 \times 80 \times 0.68 = 54.8 \)°F. The dew point of 70°F air at 40 percent relative humidity is about 45°F. Window A sits below the dew point, so moisture condenses on it and may freeze, while window B stays above it and stays clear. The edge of the glass is colder than the center, so real condensation starts earlier than this estimate shows. The two options also lose \( 0.48 \times 702 \times 80 = 26{,}960 \) BTU/h and \( 0.28 \times 702 \times 80 = 15{,}720 \) BTU/h over the whole glazing area, a difference of about 11,200 BTU/h on the design day.

!!! mascot-thinking "A Window Is a Hole in Four Layers"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Chapter 11's four control layers all stop at the window frame. Everything you will learn about flashing, sealing, and air sealing around windows is really the job of reconnecting those four layers on the other side of the opening.

## Glazing

**Glazing** is the transparent material in a window, door, or curtain wall, usually glass, and the term also refers to the act of installing it. Modern windows use an *insulating glass unit* (IGU), two or three panes of glass separated by a spacer, with the space between them sealed. The space, commonly about 1/2 in thick, is filled with air or with argon, a heavier gas that conducts less heat and slows convection in the gap. The spacer is a possible thermal bridge at the edge, so better units use a warm-edge spacer made of lower-conductivity material. Two panes add one insulating gap. Three panes add a second gap, which makes the window heavier and more costly but improves the U-factor, and triple glazing is increasingly common in cold climates.

Glass can also be treated for strength and safety:

- *Annealed* glass is ordinary, slowly cooled glass that breaks into sharp shards.
- *Tempered* glass is heat-treated to be about four times stronger and breaks into small, blunt pieces.
- *Laminated* glass has a plastic layer between two panes that holds the pieces together when the glass breaks, and it also improves sound reduction and security.

Codes commonly require safety glazing, meaning tempered or laminated glass, in locations where people are likely to strike it, such as doors, sidelights beside doors, and large panes close to the floor.

**Worked example: does a classroom window need safety glass?** A Riverbend classroom has a window 4 ft wide and 6 ft tall, with the bottom edge 12 in above the floor. Model codes commonly require safety glazing in a pane when its area is larger than about 9 ft², its bottom edge is less than 18 in above the floor, its top edge is more than 36 in above the floor, and a walking surface lies within 36 in of the glass. Here the area is \( 4 \times 6 = 24 \) ft², the bottom edge is at 12 in, and the top edge is at \( 12 + 72 = 84 \) in. Every test is met, so the glass must be tempered or laminated. Raising the sill to 24 in would avoid the low-edge test, although the designer should always confirm the exact rule in the adopted code.

## Low-E Coatings

A **low-emissivity (low-E) coating** is a microscopically thin layer of metal or metal oxide on a glass surface that reflects long-wave infrared radiation, which is heat, while passing visible light. Chapter 3 explained that surfaces radiate heat in proportion to their emissivity. Ordinary glass has an emissivity near 0.84, and a low-E coating reduces it to about 0.04 to 0.20 (approximate values). The coating is placed on a surface inside the sealed unit, where it is protected. Counting surfaces from the outside, surface 1 is the outer face, surface 2 is the inside face of the outer pane, and surface 3 is the gap face of the inner pane. In a heating climate such as Minnesota's, designers commonly choose a coating on surface 3, which keeps heat in the room while admitting solar heat. In a cooling climate, a coating on surface 2 rejects more solar heat. A low-E coating can lower the U-factor of a double pane by about a third, and it is the main reason that a modern double-pane window outperforms a clear one.

## Window U-Factor

The **window U-factor** is the rate of heat flow through the whole window, including glass, frame, and spacer, per ft² per degree of temperature difference. It is the same quantity as the U-value in Chapter 3, and a lower U-factor means a better insulating window. The NFRC label reports the whole-window value, which is higher than the value for the center of the glass, because the frame and the edge conduct more heat. Approximate whole-window values are about 1.0 for single glass, 0.45 to 0.50 for clear double glazing, 0.25 to 0.30 for double glazing with a low-E coating and argon, and 0.15 to 0.22 for good triple glazing. In a cold climate, the U-factor is the most important rating, because it controls both heat loss and the inside surface temperature, as the worked example above showed.

## Solar Heat Gain Coefficient

The **solar heat gain coefficient** (SHGC) is the fraction of the sun's energy striking a window that passes through as heat, with a value between 0 and 1. A clear double pane has an SHGC around 0.55 to 0.65, and low-E coatings can lower it to about 0.25 or raise it to about 0.6 depending on the coating. A low SHGC reduces cooling loads and glare, while a high SHGC helps heat a building in winter. The heat gained equals the SHGC times the glass area times the solar irradiance striking it. The table below combines the two ratings for common glazing options. The values are approximate, since real products vary, and the label on the actual window governs.

| Glazing option | Whole-window U-factor | SHGC |
|----------------|-----------------------|------|
| Single clear | About 1.0 | About 0.85 |
| Double clear, air | 0.45 to 0.50 | 0.55 to 0.65 |
| Double low-E, argon | 0.25 to 0.30 | 0.25 to 0.60 |
| Triple low-E, argon | 0.15 to 0.22 | 0.25 to 0.50 |

**Worked example: winter sun on south glass.** Suppose 100 ft² of south-facing glass at Riverbend receives 200 BTU/h per ft² of sun on a clear winter noon (an illustrative value). With an SHGC of 0.50, the heat gained is \( 0.50 \times 100 \times 200 = 10{,}000 \) BTU/h. With an SHGC of 0.25, the gain halves to 5,000 BTU/h. In Minneapolis, designers commonly choose a high SHGC on the south side, together with the overhang from Chapter 3 to block summer sun, and a low SHGC where sun would cause glare or overheating.

#### Diagram: Window Performance Explorer


<iframe src="../../sims/window-glazing-surface-temperature-explorer/main.html" width="100%" height="532px" scrolling="no"></iframe>
[Run Window Performance Explorer Fullscreen](../../sims/window-glazing-surface-temperature-explorer/main.html)

<details markdown="1">
<summary>Window Performance Explorer</summary>
Type: microsim
**sim-id:** window-glazing-surface-temperature-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how glazing type, coating, and gas fill change U-factor, SHGC, and inside surface temperature, and will judge (Bloom Level 5, Evaluate) which window suits a north wall and a south wall in Minneapolis.

Visual: A cross-section of a window showing panes, gaps, coatings, and spacer, with a temperature profile line across the window from the indoor to the outdoor air. Beside it, three gauges show the whole-window U-factor, the SHGC, and the visible transmittance. A thermometer shows the inside glass surface temperature, which turns red when it is below the dew point of the room air. The canvas is responsive, 500 px tall, and redraws on window resize.

Controls: A dropdown for glazing (single, double, triple). A dropdown for coating (none, low-E surface 2, low-E surface 3). A dropdown for gas (air, argon). A dropdown for frame (aluminum, aluminum with thermal break, vinyl, fiberglass). A slider for outdoor temperature (-20 to 50°F) and one for indoor relative humidity (20 to 60 percent). A radio button for orientation (north or south).

Interactions: Hovering over a pane, gap, or coating shows its role. Changing any option updates the gauges, the temperature profile, and the surface temperature immediately. When the inside surface falls below the dew point, a condensation message appears. A summary line recommends whether the choice suits the selected orientation, based on U-factor and SHGC.

Default state: Double pane, no coating, air fill, vinyl frame, -10°F outdoors, 40 percent relative humidity, north orientation.

Implementation: p5.js with built-in selects, sliders, and radio buttons, a lookup table of approximate values, and a responsive canvas.
</details>

!!! mascot-tip "Beau's Tip: Read the Sticker Before the Brochure"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A brochure often quotes the center-of-glass value, which looks better than the whole window performs. Ask for the NFRC label values for U-factor and SHGC for the exact window you plan to buy, and compare those.

## Doors

An exterior **door** is an assembly of a door slab, a frame, a threshold, and weatherstripping that opens and closes an entry in the wall. In commercial buildings, the slab is often a hollow metal door, made of steel with an insulated core, or an aluminum and glass storefront door. In houses, insulated steel, fiberglass, and wood doors are common. Doors have special requirements for a means of egress, which Chapter 18 develops: an egress door must typically provide a clear opening of at least 32 in wide, which a 36 in door leaf commonly provides. In the enclosure, the door is another hole in the control layers. Water enters under the threshold, so doors need a sill pan and a sloped threshold. Air leaks around the perimeter, so doors need continuous weatherstripping and a sweep at the bottom. In a Minnesota winter, a door should also not create a thermal bridge, so a thermal break in the frame and threshold is common. Doors opened by many people create the largest bursts of air leakage, which is why entries often include a vestibule with two sets of doors.

## Air Sealing

**Air sealing** is the practice of finding and closing the leaks in the building enclosure so that the air control layer of Chapter 11 is truly continuous. A wall can have a perfect air barrier material and still leak at the joints and penetrations, where most of the leakage occurs. Typical leakage paths include:

- The joint between the wall top plate and the roof or ceiling.
- The rim joist at the foundation, where the floor framing meets the foundation wall.
- Gaps around windows and doors, between the frame and the rough opening.
- Penetrations for pipes, wires, ducts, and vents.
- Electrical boxes and recessed lights in exterior walls and ceilings.

Air sealing uses sealant, gaskets, tape, and foam. *Low-expansion* spray foam is made to fill gaps around windows without pushing the frame out of shape, while high-expansion foam can bow window jambs so the window no longer operates. Air sealing is far cheaper before the drywall is installed, when the framing is open and a crew can reach every joint, and nearly impossible to do well afterward.

**Worked example: the gap around one window.** A 4 ft by 6 ft window sits in a rough opening that is 1/8 in larger than the frame on every side, an ordinary installation gap. The perimeter is \( 2 \times (4 + 6) = 20 \) ft, or 240 in, so the gap area is \( 240 \times 0.125 = 30 \) in². The diameter of a round hole with that area is \( \sqrt{4 \times 30 / \pi} \approx 6.2 \) in. A single unsealed window opening is equivalent to a hole about 6 in across through the wall, and Riverbend has many windows. Sealing the gap with backer rod and sealant on the inside, and with low-expansion foam in the gap, closes it at a cost of a few dollars per window.

!!! mascot-warning "Watch Out: Seal It Before the Drywall Goes Up"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Leaks hidden behind finished drywall are expensive to find and repair. Walk the framing with the air sealing crew and the inspector, using a list of the leakage paths, before the board is hung.

## Blower Door Test

A **blower door test** is a diagnostic that measures how leaky an enclosure is. A calibrated fan is sealed into an exterior doorway, and it blows air out of the building until the indoor pressure is 50 pascals (about 0.2 in. of water) lower than outdoors. The fan flow needed to hold that pressure, in cubic feet per minute at 50 pascals (CFM50), is the leakage. Because the leaks differ in size and location, the test is often done while a technician finds individual leaks with a smoke pencil or an infrared camera. The result is usually expressed as air changes per hour at 50 pascals:

\[ \text{ACH50} = \frac{\text{CFM50} \times 60}{\text{building volume in ft}^3} \]

**Worked example: testing Riverbend.** The building volume is about 108,000 ft³ (an illustrative figure from Chapter 11). If the fan must move 5,400 cfm to hold 50 Pa, the result is \( 5{,}400 \times 60 / 108{,}000 = 3.0 \) ACH50. The 50 Pa pressure is much higher than the pressure from ordinary wind and stack effect, so the natural leakage rate is much lower, commonly estimated by dividing ACH50 by 15 to 20. At a divisor of 20, the natural rate is about 0.15 air changes per hour, which matches the tight-building case in Chapter 11's air control example. Residential energy codes in cold climates commonly require a result of about 3 ACH50 or less, but the specific requirement for any project comes from the adopted energy code.

#### Diagram: Air Sealing and Blower Door Explorer


<iframe src="../../sims/air-sealing-blower-door-explorer/main.html" width="100%" height="682px" scrolling="no"></iframe>
[Run Air Sealing and Blower Door Explorer Fullscreen](../../sims/air-sealing-blower-door-explorer/main.html)

<details markdown="1">
<summary>Air Sealing and Blower Door Explorer</summary>
Type: microsim
**sim-id:** air-sealing-blower-door-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) ACH50 and estimated natural leakage from a blower door reading, and will evaluate (Bloom Level 5, Evaluate) which leak locations to seal first.

Visual: A cutaway of the Riverbend building with a blower door fan in the entry. Ten numbered leakage points (top plate, rim joist, window gaps, door perimeter, penetrations, recessed lights, electrical boxes, attic hatch, and others) are marked as small arrows whose size shows how much air flows through each. A gauge shows the building pressure at 50 Pa, a dial shows CFM50, and a readout shows ACH50, the natural ACH estimate, and the heat loss from leakage on the design day. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: Clickable leakage points that can be "sealed" one at a time. A dropdown for the conversion divisor (15, 20). A slider for building volume (50,000 to 200,000 ft³). A "Run blower door test" button and a "Seal all" button. A "Reset" button.

Interactions: Hovering over a leakage point shows its name, its share of the total leakage, and the typical fix. Sealing a point reduces CFM50 and the readouts update. A goal line at 3.0 ACH50 turns the readout green when it is reached, and a message shows how many sealing actions were needed.

Default state: Unsealed building at about 6 ACH50, with the readout in red.

Implementation: p5.js with built-in buttons, select, and slider, and a responsive canvas.
</details>

## Gypsum Board

**Gypsum board**, also called drywall or wallboard, is a panel made of a gypsum core, a mineral that holds water chemically, pressed between sheets of heavy paper. It is the standard interior finish for walls and ceilings because it is inexpensive, smooth, and fire-resistant. Panels are commonly 4 ft wide and 8 to 12 ft long, and they are 1/2 or 5/8 in thick. Board is fastened to studs, the joints are covered with tape and joint compound, and the surface is sanded and painted. The surface finish is rated in levels, with Level 4 a common choice for painted walls. *Type X* gypsum board has a core with added glass fibers that helps it hold together in a fire, and it is used to build the fire-resistance-rated assemblies of Chapter 18. Moisture-resistant types are used in wet areas, and plain paper-faced board should be kept dry because wet paper supports mold. Gypsum board also helps sound reduction by adding mass.

## Interior Finishes

**Interior finishes** are the surface materials applied to the inside of the enclosure and floors, including paint, tile, flooring, ceilings, and wall base. They are the last materials installed, and they are what building occupants touch and see. Selection weighs durability, cleaning, appearance, acoustics, and fire behavior. Codes assign interior finish materials a flame-spread classification, commonly Class A, B, or C, and limit the class that may be used in corridors, exits, and assembly rooms. Low-emitting products reduce the chemicals released into the air inside. Timing matters, since flooring and paint are damaged by moisture and should not be installed until the building is enclosed, the concrete slab is dry, and the air sealing and inspections are complete. This ordering follows the same sequence the construction process established in Chapter 2.

!!! mascot-celebration "You Can Finish a Wall Right"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now choose a cladding and see what it adds to the footing, flash a window in the right order, size a sealant joint for thermal movement, read a window's U-factor and SHGC, and explain what a blower door test measures. That is the skill of connecting the outside of a wall to the control layers behind it.

## Key Takeaways

- Cladding is the first line of defense against water, and most modern walls use a drained design, with a gap behind the cladding, flashing at the base, and a water-resistive barrier behind it. A rainscreen adds drying.
- Cladding weight affects the foundation. Brick veneer adds many times the line load of siding.
- Flashing must lap in shingle fashion, with each layer over the one below. Caulk is a backup and not a substitute for flashing.
- Sealant joints must be sized for the movement of the materials, with a backer rod and adhesion on two sides only.
- A window is a hole in all four control layers. Its U-factor sets heat loss and inside surface temperature, its SHGC sets solar gain, and low-E coatings improve both. Safety glazing is required in hazardous locations.
- Doors need sills, weatherstripping, and thermal breaks, and curtain wall and storefront systems must supply their own control layers.
- Air sealing closes the leaks at joints and penetrations before the drywall goes up, and the blower door test measures the result as CFM50 and ACH50.
- Gypsum board and other interior finishes complete the inside and are installed last, after the enclosure is closed and dry.

[See Annotated References](./references.md)
