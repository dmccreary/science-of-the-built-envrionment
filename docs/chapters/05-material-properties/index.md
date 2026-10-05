---
title: Properties of Building Materials
description: The mechanical, thermal, moisture, and fire properties that distinguish building materials, how those properties are measured by standard tests, and how they guide material selection.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:01:50
version: 1.10
---

# Properties of Building Materials

## Summary

The mechanical, thermal, moisture, and fire properties that distinguish building materials, and how materials are tested and selected. It builds on the prerequisite concepts from Chapters 1, 3, 4. After completing this chapter, students will be able to define, explain, and apply the 22 concepts listed below.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Material Properties | 193 |
| Strength | 96 |
| Compressive Strength | 61 |
| Weathering | 22 |
| Fire Resistance | 20 |
| Tensile Strength | 11 |
| Thermal Expansion | 9 |
| Material Testing | 9 |
| Stiffness | 3 |
| Ductility | 3 |
| Creep and Shrinkage | 3 |
| Porosity | 2 |
| ASTM Standards | 2 |
| Shear Strength | 1 |
| Modulus of Elasticity | 1 |
| Brittleness | 1 |
| Toughness | 1 |
| Density | 1 |
| Permeability | 1 |
| Combustibility | 1 |
| Corrosion | 1 |
| Material Selection | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)

---

!!! mascot-welcome "Know Your Materials"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Every wall, beam, and slab is only as good as the material it is made of. Learn the handful of properties that describe how steel, concrete, wood, and masonry behave, and you will be able to say why one material fits a job and another does not. Let's build it right!

Chapter 3 gave you the physics of loads, stress, strain, and heat flow, and Chapter 4 added moisture and air. Those chapters described what the building environment does to a material. This chapter turns the question around and asks what the material does in response. When a load, a freeze, a fire, or a wet season arrives, each material answers in its own way, and a small set of measurable *properties* predicts the answer.

We start with the idea of a property itself, then work through the mechanical properties (strength, stiffness, ductility, and their relatives), the time and temperature effects, the moisture and durability properties, and the fire properties. We finish with the tests and standards that produce the numbers and the way a designer uses them to select a material. As in earlier chapters, the **Riverbend Youth Center** serves as the running example, and its dimensions and loads are illustrative.

## Material Properties

A **material property** is a measurable characteristic that describes how a material responds to a given condition, such as load, heat, water, or fire. The defining feature of a property is that it belongs to the *material* and does not depend on the size or shape of the piece. Steel has the same yield stress whether it is a rod or a beam. By contrast, the load that a particular rod can carry depends on its area, so that is a property of the *member*, not of the material. This distinction is useful because properties are what let us compare materials fairly, and the force, stress, and area relationships from Chapter 3 then convert a property into the capacity of an actual member.

!!! mascot-thinking "Property Belongs to the Material; Capacity Belongs to the Member"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of a property as the answer a material gives per unit of size, and capacity as that answer multiplied by the size you chose. Ask "what is the property?" and then "how big is the piece?", and you will not confuse a strong material with a strong member.

Properties fall into groups according to the condition they describe. The groups below organize the chapter, and the table maps each group to the properties we define and the earlier chapter that supplied the underlying physics.

| Group | Question it answers | Properties in this chapter | Physics from |
|-------|---------------------|----------------------------|--------------|
| Physical | How heavy and how porous is it? | Density, porosity | Chapter 3 |
| Mechanical | How does it carry and resist load? | Strength, stiffness, ductility, toughness | Chapter 3 |
| Time and temperature | How does it change over time and with heat? | Creep, shrinkage, thermal expansion | Chapter 3 |
| Moisture and durability | How does it handle water and weather? | Permeability, weathering, corrosion | Chapter 4 |
| Fire | How does it behave in a fire? | Combustibility, fire resistance | Chapters 3 and 4 |

**Worked example: comparing steel and wood per pound.** Consider a 1 in by 1 in bar, 1 ft long, loaded in compression along its length. Structural steel weighs about 490 lb/ft³, so the bar weighs \( 490/144 = 3.4 \) lb. Softwood framing lumber weighs roughly 30 lb/ft³, so the same bar weighs \( 30/144 = 0.21 \) lb. Steel yields at about 36,000 psi, so the bar carries about 36,000 lb. An illustrative design-level compressive stress for softwood along the grain is 1,500 psi, so the bar carries about 1,500 lb. Per pound of material, the steel carries \( 36{,}000 / 3.4 \approx 10{,}600 \) lb and the wood carries \( 1{,}500 / 0.21 \approx 7{,}200 \) lb. Bar for bar, steel is 24 times stronger, but per pound it is only about 1.5 times as strong. Wood is a surprisingly efficient structural material when weight matters, which is one reason light-frame construction is so common in North America.

The comparison chart below applies the same idea to many materials and properties at once. The values it shows are typical and approximate, and the sections that follow define each property in turn.

#### Diagram: Building Material Property Comparison Chart


<iframe src="../../sims/building-material-property-comparison-chart/main.html" width="100%" height="662px" scrolling="no"></iframe>
[Run Building Material Property Comparison Chart Fullscreen](../../sims/building-material-property-comparison-chart/main.html)

<details markdown="1">
<summary>Building Material Property Comparison Chart</summary>
Type: chart
**sim-id:** building-material-property-comparison-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) typical values of density, strength, stiffness, thermal expansion, and thermal conductivity across common building materials, and will differentiate (Bloom Level 4, Analyze) why each material suits some applications better than others.

Visual: A horizontal bar chart with one bar per material (structural steel, normal-weight concrete, softwood lumber, clay brick masonry, glass, aluminum, and rigid foam insulation). The title and axis label change with the selected property. A footnote states that all values are approximate and typical, and that actual products vary. The chart fills the container width with a height of 440 px and redraws on window resize.

Controls: A dropdown labeled "Property" with these choices: density (lb/ft³), compressive strength (psi), tensile strength (psi), modulus of elasticity (psi), thermal expansion coefficient (per °F), and thermal conductivity (BTU·in/h·ft²·°F). A toggle labeled "Logarithmic scale" switches the axis, because the values span several orders of magnitude. A checkbox labeled "Divide by density" shows the property per pound of material.

Interactions: Hovering over a bar shows the material, the value with units, and a one-sentence note on what the number means for design. Clicking a bar opens an infobox with the material's typical building uses and its main weakness. Switching on "Divide by density" re-renders the chart and displays a note, such as "Per pound, wood is competitive with steel in compression."

Colors: Metals are gray, concrete and masonry are tan, wood is brown, glass is light blue, and insulation is yellow. Each bar is labeled in text.

Implementation: Chart.js bar chart with a data table for each property, a logarithmic-axis toggle, custom tooltip callbacks, and a click handler for the infobox.
</details>

## Density

**Density** is the mass of a material per unit volume. In US practice, builders usually give it as *unit weight* in pounds per cubic foot (lb/ft³, often written pcf), because weight is what loads a structure. Typical values are about 490 pcf for steel, 150 pcf for normal-weight concrete, 120 pcf for clay brick, and 25 to 35 pcf for framing lumber. Water is 62.4 pcf, and any material that is less dense than water floats in it.

Density matters because a building must carry its own weight first, which is the *dead load* introduced in Chapter 3. Multiplying density by thickness gives the weight per square foot of a layer. An 8 in concrete slab weighs \( 150 \times 8/12 = 100 \) psf, whereas the same thickness of softwood would weigh only about 20 psf. Density also affects how easily materials are lifted, shipped, and installed, and in Chapter 3 it also controlled how much heat a material stores.

## Strength

**Strength** is the ability of a material to resist stress without failing. Chapter 3 defined stress as force divided by area, so strength is simply the stress at which something happens: the stress at which the material permanently deforms, or the stress at which it breaks. Strength is measured in the same units as stress, usually psi or ksi (thousands of pounds per square inch).

Two strength values appear in nearly every material specification. The **yield strength** is the stress at which a material stops springing back and begins to deform permanently. Below it, the behavior is *elastic*, and the material returns to its original length when unloaded, as Chapter 3 explained. The **ultimate strength** is the highest stress the material reaches before it breaks. For common structural steel (ASTM A36), the yield strength is about 36 ksi and the ultimate strength is about 58 ksi. Many design methods use the yield strength as the limit, because a member that has yielded is permanently bent and no longer does its job.

Designers never load a member to its strength. They apply a *factor of safety*, the ratio of the strength to the working stress, to allow for unknown loads, variations in the material, and workmanship. One common approach, *allowable stress design*, divides the strength by a factor of safety to find the allowable stress, and then requires that the working stress stay below it. Chapter 6 shows how codes combine this idea with load factors.

**Worked example: the Riverbend hanger rod.** In Chapter 3, a 3/4 in steel rod with an area of 0.442 in² carried 8,000 lb and had a stress of 18,100 psi. The rod yields when its stress reaches 36,000 psi, which corresponds to a force of \( 36{,}000 \times 0.442 \approx 15{,}900 \) lb. It breaks at \( 58{,}000 \times 0.442 \approx 25{,}600 \) lb. The factor of safety against yielding is \( 15{,}900 / 8{,}000 \approx 2.0 \), and against breaking it is \( 25{,}600 / 8{,}000 \approx 3.2 \). Steel design practice commonly sets the allowable tensile stress at 0.6 times the yield strength, which is \( 0.6 \times 36{,}000 = 21{,}600 \) psi, and the rod's 18,100 psi is under that limit. Because the rod is ductile, it would stretch and sag visibly well before it broke, which gives warning of overload. A stress-strain diagram makes these ideas visible in one picture, and the explorer below plots the diagram for three materials.

!!! mascot-warning "Watch Out: Strong Is Not Stiff"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is to assume that a stronger material also deflects less. Strength tells you when a member fails, and stiffness tells you how much it bends on the way there, so a floor can be strong enough and still feel bouncy. Check both properties, and check deflection as well as stress.

#### Diagram: Stress-Strain Curve Explorer


<iframe src="../../sims/stress-strain-curve-explorer/main.html" width="100%" height="852px" scrolling="no"></iframe>
[Run Stress-Strain Curve Explorer Fullscreen](../../sims/stress-strain-curve-explorer/main.html)

<details markdown="1">
<summary>Stress-Strain Curve Explorer</summary>
Type: chart
**sim-id:** stress-strain-curve-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will interpret (Bloom Level 2, Understand) stress-strain curves for steel, concrete, and wood to identify yield strength, ultimate strength, stiffness, and the type of failure, and will compare (Bloom Level 4, Analyze) ductile and brittle behavior.

Visual: A line chart with strain on the horizontal axis and stress in psi on the vertical axis. A simplified curve is drawn for the selected material: structural steel in tension (a steep elastic line, a yield plateau, strain hardening, and a necking drop to fracture), concrete in compression (a curve that rises to its peak and then falls), and softwood in compression parallel to the grain (a nearly straight line that ends in crushing). Markers show the yield point, the ultimate point, and the fracture point. The chart fills the container width with a height of 440 px and redraws on window resize.

Controls: Radio buttons labeled "Steel," "Concrete," and "Wood" choose the curve. A slider labeled "Applied stress" moves a marker along the curve. A checkbox labeled "Show area under the curve" shades the area, and a checkbox labeled "Compare all three" overlays the three curves.

Interactions: As the stress marker moves, a readout shows the strain, the factor of safety against yield, and whether the behavior is elastic or plastic. Releasing the marker in the elastic range animates a return to zero strain, and releasing it past yield shows a permanent offset. Hovering over a key point shows its name and value. The caption beside the shaded area explains that it represents toughness.

Colors: Steel is dark gray, concrete is tan, and wood is brown. The elastic range is shaded green and the plastic range is shaded orange, with text labels on each.

Implementation: Chart.js line chart with a custom plugin for the shaded areas and markers, and a data table for each material.
</details>

### Compressive Strength

**Compressive strength** is the maximum compressive stress that a material can withstand before it crushes or fails. It is the property that matters most for columns, walls, footings, and anything else that carries weight down to the ground. Concrete is the best-known example, and it is specified by its compressive strength, denoted \( f'_c \) and measured in psi. Normal structural concrete commonly ranges from about 3,000 to 5,000 psi, and 4,000 psi is a typical value in many building projects.

Compressive strength differs widely among materials, and many materials are much better in compression than in tension. Concrete and masonry are two clear examples. A member that is long and slender may fail before it reaches its compressive strength by *buckling*, which is a sideways bowing that occurs when the member is too slender, and Chapter 6 treats that failure. The table summarizes typical compressive strengths, which are approximate and vary with the product.

| Material | Typical compressive strength | Notes |
|----------|------------------------------|-------|
| Structural steel | 36,000 to 50,000 psi (yield) | Equal in tension and compression, but may buckle |
| Normal-weight concrete | 3,000 to 5,000 psi | Specified as \( f'_c \) at 28 days |
| Masonry assemblies | 1,500 to 3,000 psi | Depends on unit and mortar |
| Softwood, along the grain | Roughly 1,000 to 2,000 psi (design level) | Much lower across the grain |

**Worked example: a Riverbend concrete column.** Suppose a 12 in square column made of 4,000 psi concrete carries a load of 60,000 lb (60 kips, illustrative). The area is 144 in², so the working stress is \( 60{,}000 / 144 = 417 \) psi, about 10 percent of the compressive strength. The crushing load of the plain concrete would be \( 4{,}000 \times 144 = 576{,}000 \) lb, nearly ten times the load. The large margin is deliberate. Real columns contain steel reinforcement, the load estimate carries uncertainty, and code reduction factors take away part of the capacity. The example also shows why concrete is such a good foundation material: its compressive strength of 4,000 psi is roughly 400 times the 10 psi (1,500 psf) that the footing in Chapter 3 placed on the soil.

Wood adds a complication, because its compressive strength depends on the direction of the grain. Along the grain, the fibers act like bundles of straws loaded end-on and are strong. Across the grain, the same fibers are crushed sideways and are much weaker, with illustrative design values of only a few hundred psi. Consider the 16,000 lb reaction at the end of the Riverbend glulam beam from Chapter 3, which presses across the beam's grain on its bearing seat. At an illustrative bearing limit of 500 psi, the plate needs \( 16{,}000 / 500 = 32 \) in² of contact area. The beam is 5.125 in wide, so the bearing length must be at least \( 32 / 5.125 = 6.2 \) in, and the designer would use 7 in. A narrow 3.5 in bearing would crush the wood fibers at the bearing surface even though the beam itself is far from failing.

### Tensile Strength

**Tensile strength** is the maximum tensile stress that a material can withstand before it pulls apart. It governs hanger rods, cables, bolts, the bottom of a bending beam, and any member that is stretched. Steel is excellent in tension, with the yield and ultimate strengths from the Strength section. Wood is good in tension along the grain and very weak across it, so a board splits easily when pulled perpendicular to its grain. Concrete is weak in tension, with a tensile strength of only about 10 percent of its compressive strength, and masonry is similarly weak.

This weakness is why concrete beams and slabs contain reinforcing steel bars, or *rebar*. Cracks form where the concrete is stretched, and the steel picks up the tension that the concrete cannot carry. Chapter 8 develops reinforced concrete in detail.

**Worked example: why the rebar sits at the bottom.** Consider a simple 20 ft concrete beam supported at both ends and loaded from above. The beam bends, so the top is squeezed and the bottom is stretched. Concrete handles the compression at the top, but if its tensile strength is only about 400 psi (10 percent of 4,000 psi), it cracks at the bottom under modest load. A single #5 reinforcing bar (about 0.31 in² of steel) with a yield strength of 60,000 psi carries \( 0.31 \times 60{,}000 = 18{,}600 \) lb in tension, and a concrete area carrying the same force at its tensile strength would need \( 18{,}600/400 = 46.5 \) in². One small bar does the work of a patch of concrete about 6.8 in on a side. The designer places the bar where the tension is, near the bottom face.

### Shear Strength

**Shear strength** is the maximum shear stress that a material can withstand before one part slides past another. Shear stress acts parallel to a surface, as in Chapter 3's example of a bolt joining two timbers. Shear governs bolts, welds, nails, and the connections of beams to columns. In wood, shear along the grain is a special concern at the ends of beams, where a board can split lengthwise. In a bolted joint, the bolt resists shear on its cross-sectional area. A 3/4 in steel bolt has an area of 0.442 in², and at a shear stress of 10,000 psi (an illustrative working value) it carries about \( 10{,}000 \times 0.442 \approx 4{,}400 \) lb across one shear plane.

## Stiffness

**Stiffness** is the resistance of a material or member to deformation under load. A stiff material changes shape little when loaded, and a flexible one changes shape a lot. Stiffness is separate from strength, as the warning earlier in this chapter pointed out. Glass is stiff and brittle, rubber is flexible and tough, and a steel spring is strong and flexible.

### Modulus of Elasticity

The **modulus of elasticity**, also called Young's modulus and denoted \( E \), is the stiffness of a material, defined as the ratio of stress to strain in the elastic range:

\[ E = \frac{\sigma}{\varepsilon} \]

It is the quantity that Chapter 3 found to be about 29 million psi for steel by dividing a measured stress by a measured strain. A high \( E \) means that a large stress is needed to produce a small strain. Approximate values are 29,000 ksi for steel, about 3,600 ksi for 4,000 psi concrete, and around 1,200 to 1,800 ksi for softwood lumber, which varies with species and grade.

**Worked example: three materials under the same stress.** Subject each of steel, concrete, and softwood to a stress of 1,000 psi. The strains are \( 1{,}000 / 29{,}000{,}000 = 0.000034 \) for steel, \( 1{,}000 / 3{,}600{,}000 = 0.00028 \) for concrete, and \( 1{,}000 / 1{,}500{,}000 = 0.00067 \) for wood. The wood stretches about 19 times as much as steel. Since the deflection of a floor beam grows in proportion to strain, a wood joist needs much more depth than a steel beam to limit deflection to the same amount. This is why spans in wood buildings are limited by stiffness as often as by strength.

## Ductility, Brittleness, and Toughness

Strength and stiffness describe a material's behavior below failure. Three related properties describe what happens when a material is pushed to failure, and they matter for safety because they determine whether a failure gives warning.

### Ductility

**Ductility** is the ability of a material to deform plastically by a large amount before it fractures. Structural steel is the classic ductile material: a bar of A36 steel can stretch by about 20 percent of its length before it breaks. A ductile member sags, stretches, or bends visibly under overload, which warns occupants and allows loads to shift to other members. Structural designers value ductility highly, especially in earthquake and extreme-load design.

### Brittleness

**Brittleness** is the tendency of a material to fracture with little or no plastic deformation, often suddenly. Glass, cast iron, unreinforced concrete, and most masonry are brittle. A brittle failure gives no warning, which is why brittle materials are used where they are mostly in compression and why designers add reinforcing steel to concrete. Note that brittleness is not the same as weakness. Glass is strong in compression and still breaks without warning.

### Toughness

**Toughness** is the ability of a material to absorb energy before it fractures, represented by the area under its stress-strain curve. A tough material needs a lot of energy to break it, and the energy combines strength with ductility. Steel is tough, and glass is not. Toughness is the property tested by impact tests, and it depends on temperature: some steels become more brittle in extreme cold, which is a consideration in structures exposed to Minnesota winters. Specifications for steel in cold-climate structures, such as bridges and exposed frames, therefore sometimes require minimum impact toughness at a stated low temperature.

!!! mascot-thinking "A Good Failure Gives Warning"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that the question is not only how much load a member can take, but how it behaves when it finally gives up. A ductile member bends and groans first, while a brittle one lets go without a sound, so the second kind needs bigger margins.

## Creep and Shrinkage

**Creep** is the slow, continuing deformation of a material under a sustained load, and it occurs over months or years even though the stress does not increase. **Shrinkage** is the reduction in volume that occurs as a material loses moisture. Both are changes over time, which makes them different from the instant elastic strain described in Chapter 3. Wood and concrete both creep, and a wood floor beam under sustained load may deflect noticeably more after a few years than it did on the day it was loaded. Designers account for this by increasing the calculated long-term deflection for materials that creep.

Concrete shrinks as its excess mixing water evaporates, by about 0.0005 in/in (500 microstrain) in a typical case, which is why new concrete cracks. For a 100 ft slab, the shrinkage would equal \( 0.0005 \times 1{,}200 \text{ in} = 0.6 \) in if the slab could move freely, and since it cannot, it cracks. Control joints cut into slabs create planned weak lines where cracks will form neatly. Wood shrinks much more across its grain than along it, so a floor framed with green lumber may develop gaps or squeaks as the wood dries, and a wall's overall height can drop slightly as the many horizontal plates and joists shrink.

## Thermal Expansion

**Thermal expansion** is the increase in size of a material when its temperature rises, and the matching contraction when it falls. The change in length is proportional to the original length, the temperature change, and a material-specific constant called the *coefficient of thermal expansion* \( \alpha \):

\[ \Delta L = \alpha \, L \, \Delta T \]

The coefficient \( \alpha \) is expressed per degree Fahrenheit. Approximate values are \( 6.5 \times 10^{-6} \) for steel, \( 5.5 \times 10^{-6} \) for concrete, and \( 13 \times 10^{-6} \) for aluminum. Wood expands very little along the grain. Plastics expand several times more than steel.

**Worked example: a Minnesota temperature swing.** A building element in Minneapolis may experience a range from about −20°F in a cold snap to 100°F on a sunlit summer day, a swing of 120°F. A 100 ft long steel member (1,200 in) changes in length by \( 6.5 \times 10^{-6} \times 1{,}200 \times 120 = 0.94 \) in. A concrete element of the same length changes by 0.79 in, and an aluminum one by 1.87 in. If the steel bar were prevented from moving, it would develop a stress equal to the modulus times the strain: \( 29{,}000{,}000 \times 6.5 \times 10^{-6} \times 120 = 22{,}600 \) psi, which is about 63 percent of the yield stress, from temperature alone. This is why long buildings contain *expansion joints*, gaps that allow movement, and why metal cladding is fastened so that it can slide.

## Porosity

**Porosity** is the fraction of a material's volume that is empty space, expressed as a percentage. Materials such as brick, concrete, wood, and many stones are porous, with tiny voids that can fill with air or water. Dense metals and glass have essentially none. Porosity is the underlying reason for several of the moisture behaviors in Chapter 4. A porous material can wick water by capillary action, and it can hold enough water to freeze and crack. High porosity also lowers density and strength, but it improves insulating value, which is why insulating foams and aerated materials are highly porous.

## Permeability

**Permeability** is the ease with which a fluid, such as water vapor or liquid water, passes through a material. It is related to porosity but is not the same thing, because the pores must also be connected to one another. A closed-cell foam can be highly porous and nearly impermeable, since its voids are sealed off. Chapter 4 introduced the *perm*, the unit used to rate how much water vapor passes through a layer, and permeability is the property behind it. Polyethylene sheeting has a very low permeance, gypsum board is moderate, and some house wraps and building papers are highly permeable so that walls can dry. Selecting permeable and impermeable layers in the right order is a core task of wall design, treated in Chapter 11.

## Weathering

**Weathering** is the gradual deterioration of a material exposed to the outdoors through sunlight, rain, wind, temperature cycling, and freezing and thawing. Ultraviolet (UV) light breaks down plastics, paints, and sealants. Repeated wetting and drying swells and shrinks wood, leading to checking and warping. Temperature cycling creates the expansion and contraction stresses calculated above. In Minnesota, the most damaging process is often *freeze-thaw cycling*. Water expands about 9 percent in volume when it freezes, and when ice forms inside the pores of concrete or masonry, it pushes outward with enough force to crack the surface.

**Worked example: a pore that is too full.** Picture a small pore with a volume of 100 units. If it is 90 percent full of water (90 units) when it freezes, the ice occupies \( 90 \times 1.09 = 98.1 \) units, which fits. If it is 95 percent full, the ice would occupy \( 95 \times 1.09 = 103.6 \) units, which does not fit, and the extra volume cracks the material. The critical level is \( 1/1.09 = 92 \) percent. Materials that stay wet for long periods, such as horizontal surfaces like sidewalks, stair treads, and the tops of masonry walls, exceed this level readily. The standard defense for exposed concrete in a cold climate is *air entrainment*, in which billions of microscopic air bubbles are added to the mix to give the freezing water room to expand. The air content is commonly in the range of 5 to 7 percent for severely exposed concrete. Other defenses are to keep water out with flashing and drainage, as discussed in Chapter 4, and to choose materials with low porosity.

## Corrosion

**Corrosion** is the chemical or electrochemical deterioration of a metal through reaction with its environment. The most familiar form is the rusting of iron and steel, which needs both oxygen and water. The rust that forms occupies much more space than the steel it replaces, commonly several times as much, so it flakes off and, inside concrete, pushes the surface off the reinforcing bar. Chlorides from road deicing salts speed the process, which makes corrosion a significant concern for parking structures and exterior slabs in Minnesota. *Galvanic corrosion* occurs when two different metals are in contact in the presence of moisture, and the more reactive one corrodes faster, so mixing aluminum and steel fasteners can cause problems.

Protection works by keeping oxygen and water from the metal. Methods include paint, galvanizing (a zinc coating that corrodes in the steel's place), stainless steel, and in concrete, an adequate cover of dense concrete over the bars. Chapter 21 treats corrosion as a failure mode in more detail.

## Combustibility

**Combustibility** is the ability of a material to ignite and burn. Building codes divide materials into *combustible* and *noncombustible*, and a standard laboratory test, ASTM E136, determines which category a material falls in. Steel, concrete, masonry, and glass are noncombustible, and wood, plastics, and many insulations are combustible. Surface materials are also rated by how fast flame spreads across them, using a flame spread index from the ASTM E84 test, and codes limit the index of interior finishes by occupancy. Combustibility describes the *material* and not the assembly. As the next section shows, a combustible material can still perform well in a fire.

!!! mascot-warning "Watch Out: Combustible Does Not Mean Weak in Fire"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    It is easy to assume that noncombustible materials are fire-safe and combustible ones are not. Unprotected steel is noncombustible but loses strength quickly in a fire, while a large timber chars slowly and keeps carrying load. Compare fire *resistance*, not only combustibility.

## Fire Resistance

**Fire resistance** is the ability of a building element, such as a wall, floor, or beam, to continue to perform its function during a fire for a stated period of time. It describes an assembly, not a bare material, and it is expressed in hours, as in a 1-hour or 2-hour rating. The rating is determined in a laboratory by exposing a full-scale element to a standard fire, as described in ASTM E119. The standard fire follows a defined time-temperature curve in which the furnace reaches about 1,700°F in the first hour. The element must continue to carry its load, resist the passage of flames, and, for walls and floors, keep the temperature on the unexposed face from rising more than a set amount, about 250°F on average.

Different materials resist fire in different ways. Concrete and masonry are noncombustible and conduct heat slowly, so they protect themselves and the steel inside. Gypsum board contains chemically bound water that must be driven off before the board heats up, which delays the temperature rise behind it. Steel loses about half of its strength at a temperature around 1,100°F, which an unprotected member can reach within minutes in the standard fire, so it is usually covered with gypsum board, sprayed fire-resistive material, or intumescent paint. Large timbers resist fire by charring, since the charred layer insulates the wood beneath it.

**Worked example: a charred glulam beam.** The 40 ft beams over the Riverbend multipurpose room are glued-laminated timbers, 5-1/8 in wide and 36 in deep (illustrative, consistent with Chapter 6's estimate of about 3 ft for a 40 ft girder). Wood chars at a rate commonly taken as about 1.5 in per hour in design. After one hour of exposure on three sides (both sides and the bottom), the beam loses 1.5 in from each side and 1.5 in from the bottom. The remaining uncharred section is \( (5.125 - 3.0) \times (36 - 1.5) = 2.125 \times 34.5 = 73.3 \) in², compared with the original \( 5.125 \times 36 = 184.5 \) in², so about 40 percent of the area remains. A designer who needs a 1-hour rating oversizes the beam so that the 40 percent that survives still carries the load. Chapter 18 shows how fire ratings are required and applied in the code.

## Material Testing

**Material testing** is the use of standardized laboratory and field procedures to measure a material's properties. The numbers in this chapter did not come from guesses. They came from tests in which specimens were loaded, heated, wetted, or burned under controlled conditions and the results were recorded. The standard way to measure strength is to load a specimen until it fails while recording force and deformation. A steel *coupon*, which is a small bar machined to a standard shape, is pulled in a tension test to produce the stress-strain curve. A concrete *cylinder* is crushed in a compression test. Wood beams are broken in bending, and masonry units are crushed.

The key to a test is that the specimen, the procedure, and the speed of loading are the same every time, so the results can be compared among laboratories and across years.

**Worked example: the 28-day cylinder.** For a concrete test cylinder, 6 in in diameter and 12 in tall, the cross-sectional area is \( \pi \times 3^2 = 28.3 \) in². Concrete gains strength over time, so the standard test age is 28 days. At that age, the cylinder is placed in a press and loaded until it crushes. If the failure load is 113,100 lb, the compressive strength is \( 113{,}100 / 28.3 = 4{,}000 \) psi, which meets the specified \( f'_c \) of 4,000 psi. If the strength came out at 3,200 psi, the concrete would fail to meet the specification, and the engineer would investigate whether the structure it forms is still acceptable. Because the concrete is poured on site and cannot be tested before it is placed, the cylinders are cast from the same batch and cured under controlled conditions to represent it. In the field, additional tests, such as the slump test for workability and air content tests for freeze-thaw resistance, are performed on each delivery.

## ASTM Standards

**ASTM standards** are consensus documents published by ASTM International, a standards organization whose members include producers, users, and researchers. They define the test methods used to measure properties and the specifications that products must meet. They are the common language of the materials world, and codes and contracts refer to them by number. A few examples are ASTM A36, which specifies a grade of structural steel, ASTM C39, which is the standard test for compressive strength of concrete cylinders, and ASTM E119, the fire-resistance test already described.

!!! mascot-tip "Beau's Tip: Decode the Letter"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The first letter of an ASTM number tells you the subject: A is ferrous metals like steel, B is nonferrous metals, C is concrete and masonry, D is miscellaneous materials such as wood and plastics, and E is miscellaneous subjects such as fire tests. A quick look at the letter tells you where a standard fits when you find it in a spec.

An ASTM standard is voluntary until a building code or a construction contract requires it. Once a specification says "concrete shall be tested in accordance with ASTM C39," the standard becomes legally binding on the project. Always check which edition a document cites, because standards are revised periodically.

## Material Selection

**Material selection** is the process of choosing the material that best meets the requirements of an application, using the properties in this chapter as the evidence. The first step is to list the requirements, such as load, span, exposure to moisture, fire rating, and budget. The second is to identify the properties that govern each requirement. The third is to compare candidate materials on those properties and to eliminate those that fail a requirement. Finally, the designer weighs the remaining candidates on cost, availability, constructability, and environmental impact, a topic taken up in Chapter 20.

In practice, the choice is almost always a compromise. For the Riverbend multipurpose room, the structural engineer in Chapter 2 compared glued-laminated beams, steel joists, and wood trusses for cost, weight, and fire behavior, and chose the glued-laminated beams, even though steel would be stronger for a given size. A written selection matrix that scores each candidate against the weighted criteria makes the reasoning visible and defensible to the owner and to the code official.

!!! mascot-celebration "You Can Read a Material Like a Spec Sheet"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now tell strength from stiffness, find a yield point on a stress-strain curve, explain why concrete needs rebar and why steel can sag before it breaks, and trace a number back to an ASTM test. That is the vocabulary behind every material choice in the chapters ahead.

## Key Takeaways

- A material property belongs to the material and does not depend on size. Capacity depends on both the property and the size of the member.
- Strength is the stress a material can resist. Yield strength marks the start of permanent deformation, and ultimate strength is the maximum stress. A factor of safety separates working stress from strength.
- Compressive strength governs columns and footings, and tensile strength governs hangers and the stretched side of beams. Concrete is strong in compression and weak in tension, so it needs reinforcing steel.
- Stiffness, measured by the modulus of elasticity, is separate from strength. A strong member can still deflect too much.
- Ductile materials give warning before they fail, brittle materials do not, and toughness is the energy absorbed before fracture.
- Creep, shrinkage, and thermal expansion change dimensions over time and with temperature. Minnesota's temperature range makes movement joints necessary.
- Porosity and permeability control how moisture enters and moves through a material, and freeze-thaw weathering cracks wet porous materials. Corrosion attacks metals in the presence of water and oxygen.
- Combustibility describes whether a material burns, and fire resistance describes how long an assembly performs in a standard fire. The two are not the same.
- Standard tests, defined by ASTM standards, produce the numbers that designers use, and material selection weighs those numbers against cost, constructability, and environmental impact.
