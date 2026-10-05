---
title: Forces, Heat, and the Physics of Buildings
description: The forces, stress, strain, heat transfer, and thermal resistance principles that explain how buildings carry loads and resist heat flow in a cold climate.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:56:03
version: 1.10
---

# Forces, Heat, and the Physics of Buildings

## Summary

The forces, stress, strain, heat transfer, and thermal resistance principles that explain how buildings carry loads and resist heat flow. It has no prerequisites within the book and starts the learning progression. After completing this chapter, students will be able to define, explain, and apply the 16 concepts listed below.

## Concepts Covered

This chapter covers the following 16 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Forces | 473 |
| Heat | 326 |
| Heat Transfer | 282 |
| Equilibrium | 153 |
| Stress | 121 |
| Conduction | 62 |
| Thermal Resistance | 56 |
| R-Value | 32 |
| Radiation | 20 |
| Strain | 10 |
| Thermal Bridging | 5 |
| Convection | 4 |
| U-Value | 4 |
| Daylight | 4 |
| Thermal Mass | 3 |
| Sound Transmission | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Two Kinds of Physics, One Building"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Every roof that stays up and every winter morning that stays warm comes down to two pieces of physics: forces that balance, and heat that flows slowly. Once you can run the numbers on both, you can look at a wall or a beam and say whether it will do its job. Let's build it right!

Chapter 1 described what a building is and the four jobs it performs: it supports, separates, serves, and protects. Those jobs sound like architecture, but each one is governed by ordinary physics. A building *supports* because forces are balanced, so that every pound of load finds a path to the ground. A building *separates* because the enclosure slows the flow of heat from a warm interior to a cold exterior. This chapter builds the working vocabulary for both ideas.

The chapter has two halves. The first half covers forces, equilibrium, stress, and strain, which explain how structures carry load. The second half covers heat, the three ways heat travels, and the measures of how well a wall resists it, and then closes with two other forms of energy that every designer must manage: light and sound. To keep the numbers concrete, we occasionally return to the invented **Riverbend Youth Center** from Chapter 2: a one-story Minneapolis building with a 40 ft multipurpose room spanned by glued-laminated wood beams. All Riverbend loads and dimensions here are illustrative.

## Forces

A **force** is a push or a pull that can change an object's motion or change its shape. A force has two properties that matter: a *magnitude*, which says how strong it is, and a *direction*, which says which way it acts. A quantity with both properties is called a **vector**, and it is drawn as an arrow whose length represents the magnitude and whose orientation shows the direction. Two people pushing a stalled truck in the same direction add their efforts. Two people pushing in opposite directions cancel each other, and the sum of the arrows tells you the result.

In US customary units, force is measured in pounds-force (lbf, usually written lb), and a *kip* is 1,000 lbf. In the International System of Units (SI), force is measured in newtons (N), where 1 lbf is about 4.45 N. The most important force in building design is **weight**, the force of gravity acting on a mass. Near the Earth's surface, a mass of 1 lb weighs 1 lbf, which is why designers can speak of "pounds" without separating mass from force. Builders also rarely deal with a single force at a point. They deal with force spread over an area, called a *load*, and measure it in pounds per square foot (psf). Chapter 6 classifies loads in detail, but the four sources you will meet first are gravity (the weight of the structure and its contents), snow, wind, and the pressure of soil against buried walls.

A single inclined force can be replaced by two *components*, one horizontal and one vertical, that together have the same effect. Using the angle \( \theta \) measured from the horizontal, the components are:

\[ F_x = F \cos\theta \qquad F_y = F \sin\theta \]

The horizontal component \( F_x \) tries to slide the connection sideways, and the vertical component \( F_y \) tries to lift or press it. Splitting forces this way lets us check each direction separately, which is the foundation of every structural calculation in later chapters.

**Worked example: forces on the Riverbend roof.** The roof over the multipurpose room covers 2,400 ft². Suppose the roof assembly weighs 30 psf (its *dead load*) and the design snow load is 40 psf (a *live load*; both values are illustrative). The total vertical force is \( (30 + 40) \times 2{,}400 = 168{,}000 \) lb, or 168 kips, which is about the weight of 40 midsize cars sitting on the roof. Now consider a diagonal steel brace in the wall that carries 5,000 lb at an angle of 45 degrees from the horizontal. Its horizontal component is \( 5{,}000 \cos 45^\circ = 3{,}536 \) lb, and its vertical component is \( 5{,}000 \sin 45^\circ = 3{,}536 \) lb. At 45 degrees, the brace splits its force equally between sliding and lifting.

The table below collects the units we have just defined, so you can return to it when a later chapter mixes systems.

| Quantity | US customary unit | SI unit | Conversion |
|----------|-------------------|---------|------------|
| Force | pound-force (lb), kip | newton (N), kilonewton (kN) | 1 lb is about 4.45 N |
| Distributed load | pounds per square foot (psf) | pascals (Pa) | 1 psf is about 47.9 Pa |
| Line load | pounds per linear foot (plf) | newtons per meter (N/m) | 1 plf is about 14.6 N/m |

Before you open the simulation below, note that the arrow's angle is measured from the horizontal and that the components always sum back to the original arrow.

#### Diagram: Force Vector Resolver


<iframe src="../../sims/force-vector-resolver/main.html" width="100%" height="557px" scrolling="no"></iframe>
[Run Force Vector Resolver Fullscreen](../../sims/force-vector-resolver/main.html)

<details markdown="1">
<summary>Force Vector Resolver</summary>
Type: microsim
**sim-id:** force-vector-resolver<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the horizontal and vertical components of an inclined force and will explain (Bloom Level 2, Understand) why the two components together have the same effect as the original force.

Visual: A canvas showing a labeled node at the center and a bold arrow representing a force. Dashed horizontal and vertical arrows form a right triangle that shows the components. A live readout panel displays the magnitude, the angle, and the two components in both pounds and newtons. The canvas width follows the container, the height is 420 px, and the sketch redraws on window resize.

Controls: A slider labeled "Force (lb)" from 0 to 10,000 with a default of 5,000. A slider labeled "Angle (degrees)" from 0 to 90 with a default of 45. The student can also drag the arrow tip directly, and the sliders update to match. A checkbox labeled "Show equations" displays the substituted values for \( F\cos\theta \) and \( F\sin\theta \). A button labeled "Riverbend roof" loads a preset that draws the 168-kip roof load as a downward vector.

Interactions: Hovering over any arrow shows a tooltip with its name and value. A "Predict first" mode asks the student to type the horizontal component, and the sketch then shows whether the answer is correct and displays the calculation. A message states when the angle is 0 (all force horizontal) or 90 (all force vertical).

Colors: The force is dark orange, the horizontal component is blue, and the vertical component is green. Arrow labels use text as well as color.

Implementation: p5.js with a responsive canvas, built-in slider and checkbox controls, and a small infobox div.
</details>

## Equilibrium

A body is in **equilibrium** when all of the forces and turning effects acting on it balance, so that it does not accelerate. Buildings are designed to remain in *static* equilibrium, meaning they stay at rest. The wording matters: equilibrium does not mean that nothing pushes on the building. It means that for every push there is an equal and opposite resistance somewhere else, and the building stays put. This is Newton's third law at work. A beam pressing down on a wall is pushed up by the wall with exactly the same force.

!!! mascot-thinking "The Ground Pushes Back"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that a standing building is not a thing at rest but a stalemate of forces. Every load pushing down is met by a support pushing up, all the way to the soil, and the building fails the moment any link in that chain can no longer push back.

Three conditions guarantee equilibrium in a plane. The sum of the horizontal forces must be zero, the sum of the vertical forces must be zero, and the sum of the moments must be zero. A **moment** is the turning effect of a force about a point. It equals the force times the *perpendicular distance* from the point to the line along which the force acts, and it is measured in foot-pounds (ft-lb). A door handle placed far from the hinges lets a gentle push produce a large moment, which is why the handle is not placed next to the hinge. In symbols, the three conditions are:

\[ \sum F_x = 0 \qquad \sum F_y = 0 \qquad \sum M = 0 \]

The forces that a support supplies to keep a structure in equilibrium are called *reactions*. Because each equation can be solved for one unknown, a beam resting on two supports with two unknown reactions can be solved completely using only these three conditions.

!!! mascot-encourage "Moments Take Practice"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Moments are where many students first stumble in statics, and that is normal. You already know how to balance a seesaw, so try the example below as a seesaw problem and pick the pivot point yourself.

**Worked example: reactions on a Riverbend beam.** A 40 ft glued-laminated beam spans the multipurpose room, resting on a support at each end, labeled A (left) and B (right). A mechanical unit hung from the beam applies a downward point load of 6,000 lb located 10 ft from A. We want the reactions \( R_A \) and \( R_B \). Choose A as the pivot point, so that \( R_A \) has no moment about it. The unit's moment is \( 6{,}000 \times 10 = 60{,}000 \) ft-lb in one direction, and \( R_B \) must balance it at a distance of 40 ft:

\[ R_B \times 40 = 6{,}000 \times 10 \quad\Rightarrow\quad R_B = 1{,}500 \text{ lb} \]

The vertical forces must also sum to zero, so \( R_A + R_B = 6{,}000 \) and \( R_A = 4{,}500 \) lb. As a check, take moments about B instead: \( R_A \times 40 = 6{,}000 \times 30 = 180{,}000 \), which again gives 4,500 lb. The support nearer the load carries more of it, in proportion to how close the load sits. If the beam instead carried an evenly spread line load of 800 plf (illustrative) over its whole length, the total would be \( 800 \times 40 = 32{,}000 \) lb, and by symmetry each support would receive 16,000 lb. Those reactions then become loads on the walls, footings, and soil beneath, which is the *load path* described in Chapter 6.

#### Diagram: Beam Reactions and Equilibrium Explorer


<iframe src="../../sims/beam-reactions-equilibrium-explorer/main.html" width="100%" height="557px" scrolling="no"></iframe>
[Run Beam Reactions and Equilibrium Explorer Fullscreen](../../sims/beam-reactions-equilibrium-explorer/main.html)

<details markdown="1">
<summary>Beam Reactions and Equilibrium Explorer</summary>
Type: microsim
**sim-id:** beam-reactions-equilibrium-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the support reactions of a simply supported beam by applying the three equilibrium conditions, and will analyze (Bloom Level 4, Analyze) how moving a load changes the share carried by each support.

Visual: A horizontal beam drawn between a pin support at A (left) and a roller support at B (right), with a downward load arrow. Upward reaction arrows at A and B scale in length with their values. A panel beside the beam lists the three equilibrium sums with the current numbers substituted. The canvas width follows the container, the height is 400 px, and the sketch redraws on window resize.

Controls: A slider labeled "Beam span (ft)" from 10 to 60 with a default of 40. A slider labeled "Load (lb)" from 0 to 12,000 with a default of 6,000. The student drags the load along the beam, or uses a slider labeled "Distance from A (ft)". A radio control switches between "Point load" and "Uniform line load (plf)". A button labeled "Step through" reveals the three equations one at a time.

Interactions: As the load moves, the reaction arrows resize in real time. A readout shows each sum of forces and moments, and an "Equilibrium check" indicator turns green when all three sums equal zero. A toggle labeled "Remove support B" shows the beam rotating about A, with a caption that the moment equation can no longer be satisfied. Hovering any arrow shows its name and value.

Colors: The beam is brown, applied loads are orange, and reactions are green. Failed equilibrium is shown in red with a text label.

Implementation: p5.js with a responsive canvas, built-in slider and radio controls, and an equation panel updated every frame.
</details>

## Stress

**Stress** is the internal force per unit area that a material carries in response to the loads applied to it. It is calculated by dividing the force by the area over which it acts:

\[ \sigma = \frac{F}{A} \]

where \( \sigma \) (the Greek letter sigma) is stress, \( F \) is the force, and \( A \) is the cross-sectional area. Stress has units of pounds per square inch (psi) or pounds per square foot (psf) in US practice, and pascals (Pa) in SI, where 1 psi is about 6,895 Pa. The reason to divide by area is that materials do not fail because of the total force. They fail when the stress at some location reaches the limit that the material can sustain. A 1,000 lb pull is trivial for a thick steel bar and fatal for a thin thread.

!!! mascot-thinking "Stress, Not Force, Breaks Things"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of a person standing on a snowfield: in boots they sink, and on wide snowshoes they float, though the weight is identical. The load stays the same, but the area changes, and that changes the stress.

The direction of the force relative to the area gives stress its type. *Tensile* stress pulls the material apart, *compressive* stress squeezes it together, and *shear* stress slides one part of the material past the adjacent part. A real member often experiences a mix, as when a beam bends and the top squeezes while the bottom stretches. Chapter 5 examines how much of each type different materials can tolerate.

| Type | Action | Everyday example | Building example |
|------|--------|------------------|------------------|
| Tension | Pulls apart | Stretching a rope | Steel hanger rod holding a ceiling |
| Compression | Squeezes together | Standing on a block | Concrete column, wall stud |
| Shear | Slides layers past each other | Cutting paper with scissors | A bolt joining two timbers |

**Worked example: a steel rod and a footing.** First consider a 3/4 in diameter steel rod that hangs a load of 8,000 lb. Its cross-sectional area is \( A = \pi r^2 = \pi (0.375)^2 = 0.442 \text{ in}^2 \), so the tensile stress is \( \sigma = 8{,}000 / 0.442 = 18{,}100 \) psi. Common structural steel begins to deform permanently at about 36,000 psi, so this rod works at roughly half of that limit. The ratio of the limit to the working stress, about 2.0, is a *factor of safety*, a margin that designers include because loads and material properties are never known exactly.

Now consider a wood post, 3.5 in by 3.5 in, that carries 6,000 lb. Its area is 12.25 in², so the compressive stress is \( 6{,}000 / 12.25 = 490 \) psi. The post sits on a square concrete footing 2 ft by 2 ft, an area of 4 ft², so the load pressing on the soil is \( 6{,}000 / 4 = 1{,}500 \) psf, which is only 10.4 psi. The footing exists to spread the same force over a bigger area so that the weak soil beneath is stressed no more than it can bear. Allowable soil pressures commonly fall in the range of about 1,500 to 3,000 psf for competent soils, and Chapter 9 explains how they are determined.

#### Diagram: Stress, Force, and Area Explorer


<iframe src="../../sims/stress-area-load-explorer/main.html" width="100%" height="562px" scrolling="no"></iframe>
[Run Stress, Force, and Area Explorer Fullscreen](../../sims/stress-area-load-explorer/main.html)

<details markdown="1">
<summary>Stress, Force, and Area Explorer</summary>
Type: microsim
**sim-id:** stress-area-load-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) the relationship stress = force divided by area to compute the stress in a member, and will evaluate (Bloom Level 5, Evaluate) whether the result is below an illustrative limit and what factor of safety it implies.

Visual: A drawing of a member (a round steel rod, a 3.5 in square wood post, or a square footing on soil) with a downward load arrow and a cross-section view that shades the loaded area. A horizontal gauge shows stress against a limit marker, with the green zone below the limit and the red zone above it. The canvas width follows the container, the height is 440 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Member" with three choices. A slider labeled "Load (lb)" from 0 to 20,000 with a default of 6,000. A slider labeled "Size" (rod diameter in inches, or footing side in feet) with a default that matches the worked example. A dropdown labeled "Limit" whose illustrative values are 36,000 psi (structural steel yield) and 1,500 psf (soil bearing).

Interactions: The readout shows the area, the stress in psi and psf, and the factor of safety. When the stress passes the limit, the gauge turns red and a text message states which change (less load or more area) restores the margin. A "Snowshoe" button shrinks and enlarges the loaded area while the load stays fixed to show the stress changing.

Colors: Green for stresses under the limit, orange for factors of safety below 1.5, and red above the limit. Each state also carries a text label.

Implementation: p5.js with a responsive canvas, built-in slider and select controls, and unit-conversion helpers.
</details>

## Strain

**Strain** is the measure of how much a material deforms under stress, expressed as the change in length divided by the original length:

\[ \varepsilon = \frac{\Delta L}{L} \]

where \( \varepsilon \) (epsilon) is strain, \( \Delta L \) is the change in length, and \( L \) is the original length. Strain is *dimensionless* because the two lengths cancel, so a strain of 0.001 means that the material stretched by one thousandth of its length, whatever units were used. Engineers also report strain in *microstrain*, where 1,000 microstrain equals 0.001.

Stress and strain are cause and effect. Applying a stress produces a strain. Over the working range of most structural materials, the two are proportional, a relationship called *elastic* behavior: when the load is removed, the material returns to its original length. If the stress exceeds the material's elastic limit, part of the strain remains after the load is removed, which is *plastic* deformation. A bent steel bar that does not spring back has been strained plastically.

**Worked example: stretching the steel rod.** Suppose the 3/4 in rod from the Stress section is 10 ft (120 in) long, and a measurement under its 8,000 lb load shows that it has stretched by 0.075 in. The strain is \( \varepsilon = 0.075 / 120 = 0.000625 \), or 625 microstrain. We can now divide the stress by the strain: \( 18{,}100 / 0.000625 \approx 29{,}000{,}000 \) psi. This ratio, which describes how stiff the material is, comes out near 29 million psi for steel regardless of the rod's size, and Chapter 5 gives it the name *modulus of elasticity*. Strain is small, but it matters. It governs how much a floor deflects under a crowd and how much a long wall expands on a hot day, and a floor that is strong enough but too bouncy still fails the occupants.

## Heat

**Heat** is the energy that transfers between objects because of a difference in temperature. It is not the same as **temperature**, which measures the average motion of the molecules in a material. A bathtub of lukewarm water contains much more heat than a spark from a sparkler, although the spark is far hotter. The distinction explains why a large mass at a modest temperature can warm a room while a tiny hot object cannot.

Heat is measured in the British thermal unit (BTU) in US practice, which is the heat needed to raise one pound of water by 1 degree Fahrenheit. In SI, the unit is the joule (J). The rate at which heat flows is measured in BTU per hour (BTU/h) or in watts (W). Heating and cooling equipment is rated in these rate units, and a "ton" of cooling is 12,000 BTU/h. The table below relates the units that appear most often.

| Unit | Quantity measured | Equivalent |
|------|-------------------|------------|
| BTU | Energy (heat) | 1 BTU is about 1,055 J |
| kilowatt-hour (kWh) | Energy (electricity, heat) | 1 kWh is 3,412 BTU |
| BTU/h | Rate of heat flow | 3.412 BTU/h is 1 W |
| ton of cooling | Rate of heat flow | 12,000 BTU/h |

When heat changes a material's temperature without changing its phase, it is called *sensible heat*, and the amount is found from the mass, the temperature change, and a property called **specific heat** (\( c \)), which is the heat needed to raise one pound of a material by 1°F:

\[ Q = m \, c \, \Delta T \]

Water has a specific heat of 1.0 BTU/lb·°F, and air has about 0.24. When heat changes a material's *phase*, such as turning water to vapor, it is called *latent heat*. Evaporating a pound of water absorbs roughly 1,000 BTU without changing its temperature, and condensing it releases that heat again. Chapter 4 uses this idea to explain why condensation matters.

**Worked example: warming a classroom's air.** One Riverbend classroom has 600 ft² of floor and a 9 ft ceiling, so its volume is 5,400 ft³. Air weighs about 0.075 lb/ft³, so the room holds \( 5{,}400 \times 0.075 = 405 \) lb of air. Raising it from 50°F to 70°F takes \( Q = 405 \times 0.24 \times 20 = 1{,}944 \) BTU, which is only 0.57 kWh. That is surprisingly little, because air holds very little heat. Per cubic foot, water holds about 3,500 times more heat than air (62.4 lb/ft³ at 1.0 versus 0.075 lb/ft³ at 0.24). The real work of a heating system is therefore not warming the air once, but replacing the heat that keeps escaping through the enclosure, which is the subject of the next section.

## Heat Transfer

**Heat transfer** is the movement of heat from a region of higher temperature to a region of lower temperature. It always goes in that direction, from hot to cold, until the two reach the same temperature. In a heated Minnesota building in January, the interior is the hot region and the outdoors is the cold one, so the heat flows outward through the walls, roof, windows, and floor. A building does not let in cold. It loses heat, and the colder it is outside, the faster the heat leaves.

!!! mascot-thinking "Cold Is Not a Thing That Comes In"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of heat as water running downhill, with temperature as the height of the hill. A draft on a winter day is not cold flowing in. It is warm air leaving, and replacement air arriving that your furnace must now heat.

Heat moves by three mechanisms, each treated in its own section below. **Conduction** is transfer through direct contact between molecules in a solid, such as heat moving along a metal spoon. **Convection** is transfer by the motion of a fluid, such as warm air rising from a radiator. **Radiation** is transfer by electromagnetic waves, such as the warmth from the sun or a campfire, which needs no material at all. In a real wall, all three mechanisms act in sequence, as the table below shows for a wall on a winter night.

| Location along the heat path | Dominant mechanism |
|------------------------------|--------------------|
| Warm room air to the inside wall surface | Convection, with some radiation |
| Through the solid wall layers | Conduction |
| Through an air gap or a cavity | Convection and radiation |
| Outside wall surface to cold air and sky | Convection and radiation |

The rate of heat flow depends on the temperature difference \( \Delta T \) driving it, so the same wall loses heat faster on a colder day. This proportionality is one of the most useful ideas in building science, because it lets you scale from one condition to another without redoing the calculation.

**Worked example: a design day and a fall day.** Suppose the room is kept at 70°F. On a Minneapolis design day with an outdoor temperature of about −10°F (an illustrative value), \( \Delta T = 70 - (-10) = 80 \)°F. On a mild fall day at 50°F outside, \( \Delta T = 20 \)°F. The ratio is \( 80/20 = 4 \), so the same wall loses four times as much heat per hour on the design day as on the fall day. A heating system sized for the design day therefore runs at a quarter of that load on a fall day, which is why heating equipment spends most of the year at partial output.

#### Diagram: Heat Transfer Modes in a Winter Wall


<iframe src="../../sims/heat-transfer-modes-wall-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>
[Run Heat Transfer Modes in a Winter Wall Fullscreen](../../sims/heat-transfer-modes-wall-explorer/main.html)

<details markdown="1">
<summary>Heat Transfer Modes in a Winter Wall</summary>
Type: infographic
**sim-id:** heat-transfer-modes-wall-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each step of the heat path through a wall as conduction, convection, or radiation, and will predict (Bloom Level 2, Understand) how the heat flow changes with outdoor temperature and wind.

Visual: A horizontal cross-section of a wall with the warm room on the left and the cold outdoors on the right. Labeled zones show interior air, interior surface, gypsum board, insulated cavity, sheathing, siding, and exterior air. Arrows between zones are colored by mechanism, and their thickness scales with the heat flow. The canvas width follows the container, the height is 440 px, and the sketch redraws on window resize.

Controls: A slider labeled "Outdoor temperature (°F)" from −20 to 60 with a default of −10. A slider labeled "Wind speed (mph)" from 0 to 30 with a default of 15. A checkbox labeled "Reflective foil in the air gap" toggles a radiation barrier. The indoor temperature is fixed at 70°F.

Interactions: Clicking any arrow opens an infobox that names the mechanism and gives a one-sentence explanation of why it dominates there. Hovering over a zone shows its temperature. A readout shows total heat flow in BTU/h per square foot and a comparison to the default design day, such as "this is 25 percent of the design-day flow." Raising the wind thickens the exterior convection arrow, and the foil toggle visibly narrows the radiation arrow across the gap.

Colors: Conduction is red, convection is blue, and radiation is orange, with a text label on every arrow.

Implementation: p5.js with a responsive canvas, built-in slider and checkbox controls, a simplified steady-state model, and an infobox div. The model is illustrative and labeled as such.
</details>

## Conduction

**Conduction** is the transfer of heat through a material by the collisions of neighboring molecules, without any bulk motion of the material. A fast-vibrating, hot molecule bumps its slower neighbors and passes along some of its energy, and the energy migrates step by step to the cold side. Conduction is the main mechanism in solid building materials such as wood, concrete, steel, and insulation.

How easily a material conducts heat is measured by its *thermal conductivity*, denoted \( k \). A high \( k \) means the material passes heat readily, and a low \( k \) means it resists. In US practice, \( k \) is given in BTU·in/(h·ft²·°F), which is the heat per hour that passes through a 1 in thick, 1 ft² slab for each degree of temperature difference across it. For steady conditions, the heat flow rate through a flat layer follows from Fourier's law:

\[ \dot{Q} = \frac{k \, A \, \Delta T}{L} \]

where \( \dot{Q} \) is the heat flow rate in BTU/h, \( A \) is the area in ft², \( \Delta T \) is the temperature difference across the layer in °F, and \( L \) is the thickness in inches. Heat flow rises with conductivity, area, and temperature difference, and falls with thickness. The approximate conductivities in the table are typical, and actual products vary.

| Material | Approximate \( k \) (BTU·in/h·ft²·°F) | Comment |
|----------|----------------------------------------|---------|
| Still air | 0.17 | Excellent insulator if it cannot circulate |
| Polyisocyanurate foam board | 0.17 | Rigid foam insulation |
| Fiberglass batt | 0.27 | Traps still air among fibers |
| Softwood lumber | 0.8 | A moderate insulator |
| Gypsum board | 1.1 | Interior wall finish |
| Normal-weight concrete | 10 | Conducts heat readily |
| Structural steel | 310 | Conducts heat extremely well |

Insulation works because it holds air still in thousands of tiny pockets, so the heat has to conduct through a material that is mostly air and only a little solid.

**Worked example: stud versus insulation.** Take a 3.5 in thick layer, 1 ft² in area, and a 70°F temperature difference across it. Through a softwood stud, \( \dot{Q} = 0.8 \times 1 \times 70 / 3.5 = 16 \) BTU/h. Through a fiberglass batt of the same size, \( \dot{Q} = 0.27 \times 1 \times 70 / 3.5 = 5.4 \) BTU/h. The wood passes about three times as much heat as the insulation. For the same thickness, an 8 in concrete layer would pass \( 10 \times 70 / 8 = 87.5 \) BTU/h, more than 16 times the batt. A steel stud conducts so well that it can carry roughly 1,000 times the heat of insulation at an equal thickness, a fact that returns when we discuss thermal bridging.

#### Diagram: Conduction Through a Layer


<iframe src="../../sims/conduction-layer-heat-flow-explorer/main.html" width="100%" height="557px" scrolling="no"></iframe>
[Run Conduction Through a Layer Fullscreen](../../sims/conduction-layer-heat-flow-explorer/main.html)

<details markdown="1">
<summary>Conduction Through a Layer</summary>
Type: microsim
**sim-id:** conduction-layer-heat-flow-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the conductive heat flow through a single layer and will compare (Bloom Level 4, Analyze) how conductivity, thickness, area, and temperature difference each change the result.

Visual: A rectangular slab with a hot face on the left and a cold face on the right, drawn with a color gradient that shows the temperature dropping from one side to the other. Heat-flow arrows on the slab scale with the computed rate. A side-by-side "Compare" panel can show two layers at once. The canvas width follows the container, the height is 420 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Material" listing the seven materials in the table above. A slider labeled "Thickness (in)" from 0.5 to 12 with a default of 3.5. A slider labeled "Area (ft²)" from 1 to 100 with a default of 1. A slider labeled "Temperature difference (°F)" from 5 to 100 with a default of 70. A checkbox labeled "Compare two materials" adds a second slab with its own material dropdown.

Interactions: A readout shows \( \dot{Q} \) in BTU/h with the substituted equation. Hovering over the slab shows the local temperature at that depth. Doubling a slider value triggers a message such as "Doubling thickness halves the flow." In compare mode, a bar shows the ratio of the two heat flows.

Colors: A red-to-blue gradient for temperature, and gray arrows for heat flow. Values appear in text as well as color.

Implementation: p5.js with a responsive canvas, built-in controls, and a lookup table of conductivities.
</details>

## Convection

**Convection** is the transfer of heat by the movement of a fluid, either a liquid or a gas, that carries thermal energy from one place to another. A moving fluid brings fresh warm or cold material against a surface, so the exchange is faster than conduction alone. There are two kinds. In *natural convection*, differences in temperature make the fluid's density differ, and the lighter warm fluid rises while the heavier cool fluid sinks. In *forced convection*, a fan, a pump, or the wind drives the motion.

At the surface of a wall, a thin layer of nearly still air clings to the material, and heat must cross it. This layer is called a *surface film* or *air film*, and its effect can be described by a film coefficient \( h \) in BTU/(h·ft²·°F), so the heat exchanged with the air is:

\[ \dot{Q} = h \, A \, \Delta T \]

A standard value for the inside surface of a vertical wall in still indoor air is about \( h = 1.47 \). The outside surface of a wall in a 15 mph winter wind has a much larger coefficient, about \( h = 5.9 \), because the wind sweeps away the still layer.

**Worked example: wind on the outside film.** Consider 100 ft² of wall surface with a 10°F temperature difference between the air and the surface. On the inside, in still air, \( \dot{Q} = 1.47 \times 100 \times 10 = 1{,}470 \) BTU/h. On the outside in a 15 mph wind, \( \dot{Q} = 5.9 \times 100 \times 10 = 5{,}900 \) BTU/h, which is about four times larger. This is why a windy day feels colder than a calm one at the same air temperature, and why the outside surface of a wall in the wind sits very close to the outdoor air temperature. The same physics creates the air movement inside buildings that Chapter 4 calls the stack effect.

## Radiation

**Radiation** is the transfer of energy by electromagnetic waves, which travel through empty space and need no material to carry them. Every object above absolute zero emits thermal radiation, and the amount rises steeply with its absolute temperature, in proportion to the fourth power. Surfaces also *absorb* the radiation that arrives. A property called *emissivity*, from 0 to 1, describes how well a surface emits and absorbs radiation. Most building materials, such as paint, wood, and glass, have emissivities near 0.9. Polished metal foil is as low as 0.05, so it emits very little and reflects most of the radiation that arrives.

Radiation is the reason you feel cold standing next to a large window on a winter day even when the thermostat reads 70°F. Your skin radiates heat toward every colder surface it can "see." Windows also admit *solar radiation*, which is the sun's energy, and this heats the room's interior surfaces. In Minnesota, that is welcome in winter and a burden in summer.

**Worked example: the cold window.** Treat your skin as a surface at 91°F with an emissivity of 0.95, facing a surface of the same emissivity. Using the Stefan-Boltzmann law with absolute temperatures, the net radiant exchange is about 23 BTU/h for each ft² of skin when the other surface is a 68°F interior wall. It is about 48 BTU/h per ft² when the other surface is a 40°F window pane, which is roughly double. The air in the room is the same temperature in both cases. The loss of radiant heat to the cold glass is what you perceive as a chill. This is an approximation that assumes the skin sees only that one surface. A window with a low-emissivity coating, covered in Chapter 12, reduces the radiant loss, and a pane that stays warmer on the inside surface makes the room feel more comfortable at a lower thermostat setting.

## Thermal Resistance

**Thermal resistance** is a measure of how strongly a material or assembly opposes the flow of heat. Rearranging Fourier's law shows that the resistance of a flat layer is its thickness divided by its conductivity, and that the heat flow follows from the temperature difference and the resistance:

\[ R = \frac{L}{k} \qquad \dot{Q} = \frac{A \, \Delta T}{R} \]

Where electrical resistance is measured in ohms, \( R \) in this chapter is expressed per unit area, in the units h·ft²·°F/BTU. A thick layer or a low-conductivity material has high resistance, and heat flows slowly through it. Electrical designers will recognize this structure because it is Ohm's law in a thermal costume. Chapter 15 introduces the electrical version, and the analogy is useful in both directions.

| Thermal quantity | Electrical analogue |
|------------------|---------------------|
| Temperature difference \( \Delta T \) | Voltage \( V \) |
| Heat flow \( \dot{Q} \) | Current \( I \) |
| Thermal resistance \( R \) | Resistance \( R \) |
| Layers in series | Resistors in series (resistances add) |

The analogy gives a rule that is easy to remember: when heat must pass through several layers one after another, their resistances *add*. The total resistance is the sum of each layer's \( R \), and the temperature difference splits across the layers in proportion to their resistances. A layer with high resistance takes the largest share of the temperature drop.

**Worked example: following the temperature through a wall.** Consider a 2×4 wood-framed wall at a cavity location (between studs), with the layers listed in the table, and take the inside air as 70°F and the outside as −10°F, a difference of 80°F. The layers include the inside and outside air films from the Convection section, whose resistances are the reciprocals of their coefficients (1/1.47 = 0.68 and 1/5.9 = 0.17). The total is 15.4 h·ft²·°F/BTU, so the heat flow per ft² is \( 80 / 15.4 = 5.2 \) BTU/h. The temperature drop across each layer is this flow times the layer's resistance.

| Layer | R | Drop across layer (°F) | Temperature at the cold side of the layer (°F) |
|-------|---|------------------------|------------------------------------------------|
| Inside air film | 0.68 | 3.5 | 66.5 |
| 1/2 in gypsum board | 0.45 | 2.3 | 64.1 |
| 3.5 in fiberglass batt | 13.0 | 67.5 | −3.4 |
| 7/16 in sheathing | 0.5 | 2.6 | −6.0 |
| Vinyl siding | 0.6 | 3.1 | −9.1 |
| Outside air film | 0.17 | 0.9 | −10.0 |
| **Total** | **15.4** | **80.0** | |

Nearly all of the 80°F drop, 67.5°F, happens across the insulation. The inner face of the sheathing, which is the cold side of the insulation, sits at about −3°F, far below freezing, and the inside face of the gypsum board stays at about 66°F. A cold layer inside a wall is exactly where moisture problems start, which is a central theme of Chapter 4.

## R-Value

The **R-value** is the thermal resistance of a material or assembly, expressed in the units h·ft²·°F/BTU, and it is the number printed on insulation packages and listed in energy codes. A higher R-value means better resistance to heat flow. Manufacturers and codes usually quote the R-value of a product *per inch of thickness* or for a specific thickness, and the R-value of a layer is the per-inch value times the thickness. SI practice uses RSI, in m²·K/W, where an R-value of 1 equals an RSI of about 0.176.

The R-values below are approximate and vary by product and temperature, but they are close enough to estimate with.

| Material | Approximate R per inch |
|----------|------------------------|
| Softwood lumber | 1.25 |
| Fiberglass or mineral-wool batt | 3.7 |
| Dense-pack cellulose | 3.7 |
| Extruded polystyrene (XPS) board | 5.0 |
| Polyisocyanurate board | 6.0 |
| Normal-weight concrete | 0.1 |

Minnesota lies in climate zones 6 (the southern and central parts of the state, including Minneapolis) and 7 (the north) of the model energy codes, which are the cold and very cold zones. The Minnesota Energy Code therefore requires higher R-values for roofs, walls, and floors than milder states do. Chapter 11 covers the specific insulation strategies, and Chapter 19 covers the code requirements.

**Worked example: reaching R-30 in a roof.** Suppose the design team wants a roof insulation layer of R-30 (an illustrative target) at Riverbend. The thickness needed equals the target R divided by the R per inch. Using polyisocyanurate board at R-6 per inch, \( 30 / 6 = 5 \) in. Using fiberglass at R-3.7 per inch, \( 30 / 3.7 = 8.1 \) in. Using XPS at R-5 per inch, \( 30 / 5 = 6 \) in. The foam board reaches the target in a thinner layer, which matters when the roof is shallow, but it usually costs more per R. The designer therefore compares thickness, cost, and fire behavior together, a theme of Chapter 5's discussion of material selection.

Adding R-value brings diminishing returns, because heat loss depends on the *reciprocal* of the total. Suppose we add a 1 in layer of XPS (R-5) outside the cavity wall, which has a total R of 15.4. The total becomes 20.4, and the U-value falls from 0.0649 to 0.0490, a 24 percent cut in heat loss. A second inch brings the total to 25.4 and the U-value to 0.0394, which is only a further 20 percent cut from the 0.0490 value. Each added inch of insulation saves less than the one before it, so designers look for the thickness at which the extra cost no longer repays itself in saved energy.

Two cautions apply to every R-value you read. First, a labeled R-value describes the *insulation alone*, not the wall that contains it. Second, the number can fall if insulation is compressed, wet, or installed with gaps, because it depends on trapped still air. Both matter more than most beginners expect.

## U-Value

The **U-value**, also called the *U-factor*, is the rate at which heat flows through an assembly per square foot per degree of temperature difference, and it equals the reciprocal of the assembly's total R-value:

\[ U = \frac{1}{R_{\text{total}}} \qquad \dot{Q} = U \, A \, \Delta T \]

Its units are BTU/(h·ft²·°F). A low U-value means low heat loss, and it is the number that energy codes commonly use for windows and for whole assemblies. The *total* R-value includes every layer plus the air films. Because the total form multiplies by area and temperature difference, the U-value gives the whole heat loss in a single step.

**Worked example: a wall and a window.** The cavity wall from the previous section has a total \( R = 15.4 \), so \( U = 1/15.4 = 0.065 \). A window with an illustrative U-value of 0.30 has a total resistance of only \( 1/0.30 = 3.3 \). On the 80°F design day, 1,000 ft² of this wall loses \( 0.065 \times 1{,}000 \times 80 = 5{,}200 \) BTU/h. Only 100 ft² of the window loses \( 0.30 \times 100 \times 80 = 2{,}400 \) BTU/h. Per square foot, the window loses \( 0.30/0.065 \approx 4.6 \) times as much heat as the wall, and a tenth of the area produces nearly half as much loss. That is why window area is one of the biggest decisions in cold-climate design.

!!! mascot-tip "Beau's Tip: R Adds in Layers, U Adds in Areas"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Add R-values when heat passes through layers one after another, and add U-times-area when heat flows through different parts of a wall side by side. When you need to combine the two situations, convert to R for the layers, then to U for the areas.

## Thermal Bridging

**Thermal bridging** is the flow of heat around or through insulation by way of a higher-conductivity material that spans from the warm side to the cold side. Examples include wood or steel studs that interrupt insulation, concrete slab edges that pass through the wall, steel beams that penetrate the enclosure, and window frames. Heat chooses the easiest path, and in a wall the studs are an easier path than the insulation between them.

In a conventional 2×4 wall, studs and plates make up roughly 25 percent of the wall's area (a common estimate that includes headers and corners). We can calculate the wall's overall performance with the *parallel path method*: calculate \( U \) separately for the cavity and for the stud path, then average the two by their areas. The two paths sit side by side, so we average U-values, not R-values.

**Worked example: the R-13 batt in a wall that is not R-13.** The cavity path, which adds the R-13 batt to the gypsum, sheathing, siding, and air films, has a total R of 15.4, as in the previous sections. That total is higher than the batt's label only because the other layers add resistance; the framing is what pulls the whole wall back down. In the stud path, the 3.5 in of wood replaces the batt, giving a layer R of \( 3.5/0.8 = 4.4 \) and a total R of 6.8. The two U-values are \( 1/15.4 = 0.0649 \) and \( 1/6.8 = 0.1476 \). With 75 percent of the area as cavity and 25 percent as stud:

\[ U_{\text{avg}} = 0.75 \times 0.0649 + 0.25 \times 0.1476 = 0.0856 \]

The effective total resistance is \( 1/0.0856 = 11.7 \), about 24 percent lower than the 15.4 that a quick calculation suggests. The 1,000 ft² wall from the previous section then loses \( 0.0856 \times 1{,}000 \times 80 = 6{,}850 \) BTU/h, which is 1,650 BTU/h more than the 5,200 BTU/h predicted for the cavity alone. The remedy, covered in Chapter 11, is to add a continuous layer of insulation outside the framing, so that no stud touches both sides without interruption.

!!! mascot-warning "Watch Out: The Label Is Not the Wall"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is to read "R-13" on a batt and assume the wall is R-13. Studs, headers, and gaps bypass the batt, so the whole wall performs lower. Calculate the effective R of the full assembly, or ask for it, before you compare options.

The next simulation lets you build the wall layer by layer, so you can see the framing penalty directly.

#### Diagram: Wall Assembly R-Value and Thermal Bridging Calculator


<iframe src="../../sims/wall-assembly-r-value-bridging-calculator/main.html" width="100%" height="647px" scrolling="no"></iframe>
[Run Wall Assembly R-Value and Thermal Bridging Calculator Fullscreen](../../sims/wall-assembly-r-value-bridging-calculator/main.html)

<details markdown="1">
<summary>Wall Assembly R-Value and Thermal Bridging Calculator</summary>
Type: microsim
**sim-id:** wall-assembly-r-value-bridging-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the total R-value and U-value of a wall assembly using the series and parallel path methods, and will compare (Bloom Level 4, Analyze) how framing and continuous insulation change the effective R-value.

Visual: A wall cross-section drawn with layers (inside air film, gypsum board, framing and cavity, sheathing, optional continuous insulation, siding, outside air film) and a plan-view strip beneath it showing the stud and cavity paths side by side at the framing fraction. A horizontal bar chart compares the cavity R, the stud R, and the effective R. A temperature-profile line can be toggled across the layers. The canvas width follows the container, the height is 520 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Cavity insulation" (none, fiberglass R-13, fiberglass R-20, cellulose, closed-cell foam). A dropdown labeled "Framing" (2×4 wood, 2×6 wood, 3-5/8 in steel stud). A slider labeled "Continuous insulation (in of XPS)" from 0 to 4 with a default of 0. A slider labeled "Framing fraction (%)" from 10 to 40 with a default of 25. A slider labeled "Outdoor temperature (°F)" from −20 to 40 with a default of −10.

Interactions: The panel shows the cavity R, the stud R, the area-weighted U, the effective R, and the percent reduction from the cavity-only value. Hovering over a layer shows its R and its temperature drop. A "Show temperature profile" toggle plots the temperature through the layers and highlights the point where the temperature falls below freezing. Switching the framing to steel produces a visibly larger drop in effective R, with a one-sentence explanation based on the steel conductivity in this chapter. The defaults reproduce the 15.4, 6.8, and 11.7 values from the text.

Colors: Insulation is yellow, wood is brown, steel is gray, and the temperature line is blue below freezing and red above. Every layer carries a text label.

Implementation: p5.js with a responsive canvas, built-in dropdown and slider controls, a layer lookup table, and a parallel-path calculation function.
</details>

## Thermal Mass

**Thermal mass** is a material's capacity to store heat and release it slowly, which is determined by its mass and its specific heat. A heavy material with a high specific heat, such as water, concrete, or masonry, soaks up a great deal of heat for each degree of temperature rise, so it warms and cools slowly. A lightweight material, such as a wood-framed wall, responds quickly. The stored heat is found with the same equation used earlier, \( Q = m\,c\,\Delta T \).

**Worked example: a Riverbend floor slab.** A 4 in thick concrete slab over 1,000 ft² has a volume of \( 1{,}000 \times 4/12 = 333 \) ft³. At about 150 lb/ft³, the slab weighs 50,000 lb. With a specific heat near 0.2, it stores about \( 50{,}000 \times 0.2 = 10{,}000 \) BTU for each degree of temperature change, so a 5°F swing exchanges 50,000 BTU, about 14.7 kWh. Thermal mass helps when daily temperature swings are large and the heat gets out of the mass at a useful time, as with sunlight on a floor in winter. It does not substitute for insulation, since mass delays heat flow but does not stop it.

## Beyond Heat: Light and Sound

Heat is one form of energy that a building must manage. Light and sound are two others, and both are tied to the physics already in this chapter. Visible light is simply a band of the radiation described above, and sound travels as vibration through air and through solid materials in the same way that conduction passes energy along a solid.

### Daylight

**Daylight** is the visible portion of sunlight that reaches the interior of a building through windows, skylights, and openings, and it is measured by *illuminance*, the amount of light falling on a surface, in foot-candles (fc) or lux (1 fc is about 10.76 lux). Daylight reduces the electric energy used for lighting and improves the occupants' sense of well-being, but it also admits solar heat, which can cause glare and overheating. A common way to judge a space is the *daylight factor*, the ratio of the indoor illuminance at a point to the simultaneous outdoor illuminance under an overcast sky. A factor of 2 percent, for example, means the point receives 2 percent of the outdoor level.

The sun's height in the sky controls how daylight and solar heat enter. Minneapolis sits at a latitude of about 45 degrees north, so the noon sun altitude (its angle above the horizon) is roughly \( 90^\circ - 45^\circ + \delta \), where \( \delta \) is the sun's *declination*, which varies from −23.4 degrees at the winter solstice to +23.4 degrees at the summer solstice. The table shows the results.

| Date | Declination | Noon sun altitude | Daylight hours (approx.) |
|------|-------------|-------------------|--------------------------|
| Winter solstice (about Dec 21) | −23.4° | about 22° | about 8.8 |
| Equinoxes (about Mar 20, Sep 22) | 0° | about 45° | about 12 |
| Summer solstice (about Jun 21) | +23.4° | about 68° | about 15.5 |

**Worked example: sizing an overhang.** A south-facing window at Riverbend is 5 ft tall, with a roof overhang that projects 2 ft and is attached to the wall 1 ft above the top of the window. The shadow cast on the wall extends below the attachment point by \( 2 \times \tan(\text{altitude}) \). At the summer solstice, \( 2 \times \tan 68.5^\circ = 5.1 \) ft, so the shadow reaches 4.1 ft down the window, covering 81 percent of it. At the equinox, \( 2 \times \tan 45^\circ = 2.0 \) ft, so 1.0 ft of the window is shaded, which is 20 percent. At the winter solstice, \( 2 \times \tan 21.6^\circ = 0.8 \) ft, which stops above the window, so the window is entirely in sun. A fixed overhang therefore blocks summer heat and admits winter sun without any moving parts.

### Sound Transmission

**Sound transmission** is the passage of sound energy from one space to another through the walls, floors, and ceilings that separate them. Sound is a vibration that travels as pressure waves in air and as vibration in solids. *Airborne sound*, such as speech, strikes a wall and makes it vibrate, and the wall re-radiates it on the far side. *Impact sound*, such as footsteps, enters the structure directly and travels through it.

Resistance to airborne sound is rated by the *Sound Transmission Class* (STC), and resistance to impact sound by the *Impact Insulation Class* (IIC). Both are single numbers from standard laboratory tests, and a higher number is better. Building codes commonly set a minimum of about STC 50 for walls and floors between dwelling units. Three principles guide design: more mass blocks more sound, separating the two faces of a wall so they cannot vibrate together helps, and any gap or open penetration lets sound leak around the wall. Sound control returns in the discussion of walls in Chapters 11 and 14.

!!! mascot-celebration "You Can Read the Physics of a Building"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now balance forces on a beam and find its reactions, compute stress and strain, trace heat through a wall layer by layer, and explain why an R-13 batt does not make an R-13 wall. That is the working physics of a building, and every later chapter puts it to use.

## Key Takeaways

- A force is a vector with magnitude and direction. Inclined forces split into horizontal and vertical components using sine and cosine.
- A structure stays at rest only when the sums of horizontal forces, vertical forces, and moments are all zero. Supports supply the reactions that make this happen.
- Stress is force divided by area, and materials fail when stress reaches their limit. Spreading a load over a larger area, as a footing does, lowers the stress.
- Strain is the change in length divided by the original length. The ratio of stress to strain describes a material's stiffness, which Chapter 5 develops.
- Heat is energy that flows from hot to cold, and its rate scales with the temperature difference. Buildings lose heat, rather than gaining cold.
- Heat travels by conduction through solids, by convection in moving fluids, and by radiation across space, and a wall uses all three in sequence.
- Thermal resistance is the layer thickness divided by conductivity, and layers in series add their R-values. The U-value is the reciprocal of the total R-value, and heat loss equals U times area times temperature difference.
- Thermal bridges, such as studs, let heat bypass insulation, so the effective R-value of a wall is lower than the R-value on the insulation label.
- Thermal mass stores heat, daylight depends on the sun's angle, and sound transmission is controlled by mass, separation, and sealing.
