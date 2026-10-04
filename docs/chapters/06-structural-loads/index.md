---
title: Structural Loads and Load Paths
description: How dead, live, snow, wind, and seismic loads travel through joists, beams, columns, walls, and bracing to the foundation and soil.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:09:47
version: 1.10
---

# Structural Loads and Load Paths

## Summary

How dead, live, snow, wind, and seismic loads travel through beams, columns, walls, and bracing to the ground. It builds on the prerequisite concepts from Chapters 3, 4, 5. After completing this chapter, students will be able to define, explain, and apply the 23 concepts listed below.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Structural System | 152 |
| Load Path | 37 |
| Live Loads | 29 |
| Dead Loads | 28 |
| Gravity Load System | 25 |
| Beams | 14 |
| Columns | 9 |
| Wind Loads | 8 |
| Seismic Loads | 8 |
| Trusses | 7 |
| Lateral Load System | 6 |
| Structural Connections | 4 |
| Snow Loads | 2 |
| Joists | 2 |
| Diaphragms | 2 |
| Load Combinations | 1 |
| Tributary Area | 1 |
| Girders | 1 |
| Bearing Walls | 1 |
| Shear Walls | 1 |
| Bracing | 1 |
| Moment Frames | 1 |
| Deflection | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 5: Properties of Building Materials](../05-material-properties/index.md)

---

!!! mascot-welcome "Follow the Weight to the Ground"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Every roof you will ever stand under is carrying tons of snow, wind, and its own weight, and quietly passing all of it to the ground. Once you can trace that route, you can read a structural drawing, spot a missing link before it becomes a repair bill, and talk with an engineer as a partner. Let's build it right!

Chapter 3 introduced force, stress, and strain, and Chapter 5 described how materials differ in strength and stiffness. This chapter applies both ideas to a whole building. The central question is simple to state: when something pushes on a building, where does that push go, and what carries it? Answering it for snow, wind, people, and earthquakes is the core of structural design, and it explains why framing, foundations, and connections look the way they do in the chapters that follow.

We return to the **Riverbend Youth Center** from Chapter 2. For the calculations in this chapter, we idealize Riverbend as a one-story rectangle 120 ft long and 75 ft wide, with a flat roof and an eave height of 14 ft. The multipurpose room spans 40 ft with glued-laminated (glulam) beams, as chosen during design development. Every load, spacing, and capacity given for Riverbend is illustrative, chosen to make the arithmetic clear. The real values for any building come from the Minnesota State Building Code and a licensed structural engineer. Detailed member sizing is outside the scope of this book, so our goal is to understand the logic, not to replace the engineer.

## The Structural System

A **structural system** is the organized assembly of members and connections that collects the loads acting on a building and carries them safely to the ground. Chapter 1 listed *support* as one of the four jobs of a building, and the structural system is the part of the building that does that job. It includes the foundation, the framing of floors, walls, and roofs, and the connections that join them. Finishes, insulation, and cladding are not part of it, although they add weight that the structure must carry.

A *load* is any force that acts on the structure, and we classify loads carefully in the next section. For now it is enough to think of a load as weight or push, measured in pounds (lb) or in kips, where one kip is 1,000 lb. Loads spread over a surface are given as *pressure*, in pounds per square foot (psf). To resist its loads, the structural system must satisfy three requirements at once.

- **Strength**: members must carry their loads without breaking or yielding permanently (Chapter 5).
- **Stiffness**: members must deform only a small amount, because a floor that sags or bounces is unacceptable even if it never breaks.
- **Stability**: the whole structure must keep its shape and position, without tipping, sliding, buckling, or racking sideways like a pushed-over box.

The three requirements fail in different ways, and a designer must check each one. The table below pairs each requirement with the question it answers and a typical symptom of failure.

| Requirement | Question it answers | Typical symptom when it fails |
|-------------|--------------------|-------------------------------|
| Strength | Will any member break or yield? | A cracked beam or crushed post |
| Stiffness | Does the structure deflect too far? | A sagging roof, a bouncy floor, cracked drywall |
| Stability | Will the structure keep its shape and position? | A leaning wall, a buckled column, a building that racks |

Engineers divide the structural system into two cooperating subsystems. The *gravity load system* carries vertical loads, which act straight down, from the roof and floors to the foundation. The *lateral load system* carries horizontal loads, such as wind and earthquakes, which push sideways. Both subsystems are built from the same elements, and often the same wall or frame serves both jobs. We examine each subsystem in turn after we define the loads.

!!! mascot-thinking "A Building Is a Delivery Network"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the structure as a delivery network for forces: every load starts somewhere high or on the outside and must be handed off, member to member, until it reaches the ground. Any time you look at a beam, wall, or bolt, ask what it receives and what it hands off.

**Worked example: the load budget of Riverbend.** Before studying the pieces, let us size the job. The roof materials weigh about 15 psf, and we assume a design snow of 35 psf, for a total of 50 psf over the 9,000 ft² roof (120 ft by 75 ft).

\[ 9{,}000\ \text{ft}^2 \times 50\ \text{psf} = 450{,}000\ \text{lb} \]

That is 450 kips, or 225 tons, of vertical load that the structure must carry to the soil. Now consider wind. A wind pressure of 20 psf acting on the 75 ft wide, 14 ft high end wall produces a force of \( 20 \times 14 \times 75 = 21{,}000 \) lb, or 21 kips. The vertical load is more than twenty times larger. Yet the gravity load has an easy route, because it simply runs downward through columns and walls, while the sideways wind has no obvious one. A designer must create a path for it deliberately. Later sections show where the 15, 35, and 20 psf figures come from, and an interactive explorer after the lateral system section lets you examine the whole system.

## Loads: What the Structure Must Carry

Loads are classified by where they come from and how they behave in time. A *permanent* load is always present, while a *variable* load comes and goes. Some loads act vertically and some horizontally. Building codes name five principal loads for ordinary buildings, and the first of them is the one that is always there.

### Dead Loads

**Dead loads** are the permanent loads: the weight of the structure itself and of everything fixed to it for the life of the building, including roofing, sheathing, ceilings, fixed equipment, and permanent partitions. The word "dead" means the load never moves or changes. Engineers compute a dead load from the *unit weight* of each material, which is its weight per cubic foot (pcf), multiplied by its thickness. Normal-weight concrete weighs about 150 pcf, structural steel about 490 pcf, and softwood lumber roughly 30 to 35 pcf. A 6 in. concrete slab therefore weighs \( 0.5\ \text{ft} \times 150\ \text{pcf} = 75 \) psf by itself.

Dead load is the most predictable load, which does not make it negligible. In most buildings it is the largest load on the structure over time, and it is the one a designer can least afford to underestimate, because every other load is added to it. Designers also add an allowance for roofing layers or finishes that a future owner might add.

**Worked example: Riverbend's roof dead load.** The table lists each layer of the roof, from the membrane at the top to the ceiling and services below, with illustrative weights in psf.

| Roof component | Weight (psf) |
|----------------|--------------|
| Single-ply roofing membrane | 1.0 |
| Tapered rigid insulation | 1.5 |
| Plywood or OSB roof sheathing | 2.0 |
| Wood roof joists | 3.0 |
| Glulam girders (spread over the roof area) | 3.0 |
| Ceiling, lighting, and ducts | 4.5 |
| **Total roof dead load** | **15.0** |

The glulam girders are a useful reminder that the same member plays two roles: it carries load, and it is itself a load on the posts and foundation beneath it.

### Live Loads

**Live loads** are the loads that arise from the use and occupancy of the building: people, furniture, movable equipment, and stored goods. Unlike dead load, live load moves and changes over time, and the designer cannot know in advance exactly how a room will be used. The code therefore specifies *minimum design live loads* by type of occupancy, chosen to cover realistic worst cases, including crowding and dynamic effects. The table lists some commonly specified minimums. The governing table in the Minnesota State Building Code and its referenced standard controls the actual design.

| Use | Commonly specified minimum live load (psf) |
|-----|---------------------------------------------|
| Residential rooms (other than sleeping rooms) | 40 |
| Classrooms | 40 |
| Offices | 50 |
| Assembly areas with movable seats | 100 |
| Lobbies and stairs | 100 |
| Ordinary roofs (workers and maintenance) | 20 |

Large floor areas are often permitted a *live load reduction*, since it is unlikely that every square foot carries its full design load at once.

**Worked example: why 100 psf for a crowd?** The multipurpose room at Riverbend has 2,400 ft² and is an assembly space with movable seats, so the code minimum is 100 psf. Suppose the room were packed with 400 adults, one per 6 ft², averaging 175 lb each. The actual crowd weight is \( 400 \times 175 = 70{,}000 \) lb, which is \( 70{,}000 / 2{,}400 \approx 29 \) psf. The code load is more than three times larger. The difference is intentional, because the design load includes furniture, stage equipment, rhythmic motion such as dancing, and uncertainty about future use. Live load is a design allowance rather than a measured weight, and a floor loaded with a code-level live load is a heavy floor. (Riverbend's multipurpose room floor is a slab resting on the ground, so its live load goes directly into the soil. The 100 psf figure would matter much more for a suspended floor.)

### Snow Loads

**Snow loads** are the vertical loads from accumulated snow and ice on a roof. Snow is an *environmental* load, so it depends on location. The design starts from a *ground snow load*, a value the building code gives for each location, on the order of 50 psf in the Twin Cities. The designer adjusts it for the roof's exposure, heat loss, slope, and the building's importance. For a heated flat roof in typical exposure, the result is often about 70 percent of the ground value, so Riverbend uses \( 0.7 \times 50 = 35 \) psf, an illustrative figure.

| Step | What happens | Riverbend (illustrative) |
|------|--------------|--------------------------|
| Start | The code gives a ground snow load | About 50 psf |
| Adjust | Factors for exposure, heat loss, slope, and importance | About 0.7 |
| Result | Uniform snow load on the flat roof | 35 psf |

Uniform snow is only part of the story. Wind piles snow into *drifts* against parapets, on the low side of roof steps, and around rooftop units, where the local load can be several times the uniform value. Snow also slides from high roofs onto low ones. Chapter 13 returns to snow behavior on roofs.

### Wind Loads

**Wind loads** are the forces that moving air exerts on a building. When wind meets a building it must flow around and over it. The *windward* face, which faces the wind, receives a push, while the *leeward* face, the opposite side, and most of the roof experience *suction*, a pull away from the surface. Both effects count. Suction on a roof acts upward and, if the roof is light, can exceed its dead weight, producing *uplift* that connections must resist.

Wind pressure depends strongly on speed. The basic velocity pressure in psf is approximately

\[ q \approx 0.00256\, V^2 \]

where \( V \) is wind speed in miles per hour. The code then modifies it for height above ground, surrounding terrain, and the shape of the building. Because speed is squared, doubling the wind speed quadruples the pressure.

**Worked example: wind at Riverbend.** Suppose the code's design wind speed for the Twin Cities is about 115 mph (an illustrative round figure). Then \( q \approx 0.00256 \times 115^2 = 33.9 \) psf. At 230 mph the same formula gives 135 psf, four times as large. After the code's factors for exposure and building shape, a low building might see design pressures on the order of 15 to 25 psf on its walls. We use a service-level value of 20 psf for Riverbend, and the same value as suction on the roof. The wind force on the end wall is \( 20 \times 14 \times 75 = 21{,}000 \) lb, as in the load budget above. As the lateral system section shows later, only about half of that force goes to the roof level, because the wall spans between the roof and the foundation.

### Seismic Loads

**Seismic loads** are the forces that an earthquake imposes on a building. When the ground shakes, the foundation moves with it, but the mass of the building resists the motion because of its inertia. The result is a horizontal force in the building equal to its mass times the acceleration it experiences, in the same way that a passenger is thrown back when a car accelerates. Engineers estimate the total horizontal seismic force, called the *base shear* \( V \), as a fraction of the building's weight \( W \):

\[ V = C_s \, W \]

where \( C_s \) is a seismic coefficient that depends on the site's hazard, the soil, the building's use, and how well its structure tolerates repeated deformation.

**Worked example: a quake at Riverbend.** Suppose Riverbend's roof (135 kips, from 15 psf over 9,000 ft²) and the upper half of its walls (about 35 kips) total \( W = 170 \) kips. With an illustrative \( C_s = 0.05 \), \( V = 0.05 \times 170 = 8.5 \) kips. Minnesota is a region of low seismic hazard compared with California, so this value is plausible, and it is smaller than the 10.5 kips that wind delivers to the roof level in the lateral example below. A light wood building in Minnesota is therefore usually governed by wind. Replace the roof with a heavy masonry and concrete roof twice as heavy (270 kips), however, and \( W \) rises to 305 kips and \( V \) to \( 0.05 \times 305 = 15.25 \) kips, which exceeds the wind force.

!!! mascot-thinking "Wind Scales With Area, Quakes Scale With Weight"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Wind grows with how much surface the building presents to the air, while an earthquake grows with how much mass the building has to throw around. That is why a light, large building worries about wind, and a heavy building worries about quakes.

The table summarizes the five loads. It reinforces the definitions above, and the Riverbend column repeats the illustrative values used in this chapter.

| Load | Source | Direction | Depends mainly on | Riverbend (illustrative) |
|------|--------|-----------|-------------------|--------------------------|
| Dead | Weight of the building | Down | Materials and thickness | 15 psf on the roof |
| Live | Occupants and contents | Down | Use of the space | 20 psf on the roof, 100 psf in the multipurpose room |
| Snow | Precipitation | Down | Location, roof shape, drifting | 35 psf on the roof |
| Wind | Moving air | Sideways and up | Speed squared and exposed area | 20 psf on walls and roof |
| Seismic | Ground shaking | Sideways | Building weight and site | 8.5 kips total |

### Load Combinations

**Load combinations** are the code-specified ways of adding loads together for design. Loads rarely peak at the same moment, since a crowded room is unlikely to coincide with the worst storm, so the code scales each load by a factor that reflects its likelihood and uncertainty. *Allowable stress design* (ASD) adds service-level loads, with reduced factors on wind and seismic, and compares the result with allowable stresses that already contain a safety margin. *Load and resistance factor design* (LRFD) multiplies each load by its own factor, such as 1.2 for dead and 1.6 for snow, and compares the total with a reduced member strength.

Snow and roof live load are not added to each other, since workers and heavy snow are not expected together, and the larger governs. Where dead load *helps*, as in resisting uplift, the code counts only part of it, for example 0.6 of its value. This chapter's examples use service-level loads.

| Method | Roof gravity combination | Riverbend result | Uplift check |
|--------|--------------------------|------------------|--------------|
| ASD | Dead plus snow | \( 15 + 35 = 50 \) psf | \( 0.6 \times 15 - 20 = -11 \) psf, a net upward pressure |
| LRFD | \( 1.2D + 1.6S \) | \( 18 + 56 = 74 \) psf | Uses a similar reduced dead load |

## The Gravity Load System

The **gravity load system** is the set of members that collect vertical loads from every part of the roof and floors and deliver them to the foundation. Its organizing idea is a hierarchy. A load lands on a surface, the surface passes it to many small closely spaced members, those pass it to fewer and larger members, and these finally pass it to the walls or columns and the foundation. At each step the member that receives the load supports it and must hand it on, so it applies a support force called a *reaction* to the member beneath. For a member at rest, the reactions at its supports must balance the loads on it, which is the condition of *equilibrium* from Chapter 3.

The usual sequence of handoffs, from the top of the building to the bottom, is as follows.

1. The *deck* or sheathing receives the surface load and spreads it to the joists.
2. *Joists* collect the deck's load and pass it to beams, girders, or walls.
3. *Beams* and *girders* carry the joists' load across a span to their supports.
4. *Columns* and *bearing walls* carry the load vertically to the foundation.
5. The *foundation* spreads the load into the soil.

The same pattern appears in every building: fewer, larger, more widely spaced members at each step down. The following sections define the members in the order the load meets them, beginning with the question of how much load each one carries.

### Tributary Area

The **tributary area** of a member is the part of the floor or roof whose load that member is responsible for carrying. It extends halfway to the next supporting member on each side. A member's load is the surface load multiplied by its tributary area. For a long member such as a beam, it is more convenient to use the *tributary width* \( b \), the spacing between members for an interior member, and to express the load as a line load in pounds per foot (plf):

\[ w = q \times b \]

where \( q \) is the surface load in psf and \( b \) is the tributary width in feet. If the roof carries 50 psf and the members are 16 ft apart, each carries \( 50 \times 16 = 800 \) plf.

### Joists

**Joists** are closely spaced horizontal members that support a floor or roof deck and pass its load to beams or walls. Spacing is commonly 12, 16, or 24 inches *on center* (o.c.), which means measured from the center of one joist to the center of the next. Because joists are close together and tied by the deck, a heavily loaded joist can share some of its load with its neighbors. Joists may be sawn lumber, engineered I-joists, steel open-web joists, or light-gauge steel, and Chapter 7 describes the wood and steel types. Tall, thin joists tend to twist under load, so blocking or bridging between them holds them upright.

### Beams

**Beams** are horizontal members that carry loads applied perpendicular to their length, mainly by *bending*. Under a downward load, a simply supported beam bows downward: the top fibers are squeezed in compression, the bottom fibers are stretched in tension, and the middle, called the *neutral axis*, is unstressed. The material farthest from the neutral axis does the most work. A beam also resists *shear*, the tendency of one part to slide past the next, and the highest shear occurs near the supports.

A rectangular beam's stiffness depends on its *moment of inertia* \( I \), a geometric property of its cross-section, where for width \( b \) and depth \( d \)

\[ I = \frac{b\,d^3}{12} \]

Depth enters as the cube, which is why a beam is always set on edge.

**Worked example: a plank on edge.** A nominal 2×8 lumber member measures 1.5 in. by 7.25 in. in actual size. Laid flat, so its depth is 1.5 in., its moment of inertia is \( 7.25 \times 1.5^3 / 12 = 2.04 \) in⁴. Set on edge, so its depth is 7.25 in., it is \( 1.5 \times 7.25^3 / 12 = 47.6 \) in⁴. The same piece of wood is 23 times stiffer simply by turning it. For a given load the plank on edge also sags only about one twenty-third as much.

For a simply supported beam of span \( L \) with a uniform load \( w \), the reaction at each support and the largest bending moment are

\[ R = \frac{wL}{2} \qquad M_{max} = \frac{wL^2}{8} \]

For Riverbend's girder in the gravity example below, \( w = 800 \) plf and \( L = 40 \) ft give \( R = 16{,}000 \) lb and \( M_{max} = 160{,}000 \) ft-lb.

### Girders

A **girder** is a primary beam that supports other beams, usually joists. The glulam members over Riverbend's multipurpose room are girders: they receive load from many joists and carry it across the 40 ft span to the posts. Because a girder receives concentrated loads at each joist and carries a larger tributary width, it is generally deeper and heavier than the members it supports. At Riverbend a 40 ft glulam girder would likely be on the order of 3 ft deep, with the engineer fixing the exact size.

### Trusses

**Trusses** are frameworks of straight members arranged in triangles, joined at points called *joints* or *panel points*. The triangle is the key. A four-sided frame with pinned corners can change shape, like a pushed-over parallelogram, but a triangle cannot change shape without a member changing length. Because a truss carries loads at its joints, each member carries only an *axial* force, which acts along its length, and is either in *tension* (pull) or *compression* (push). Members loaded this way use their material efficiently, which lets trusses span long distances with little material. Roofs use wood trusses with metal connector plates, and larger buildings use steel trusses.

**Worked example: forces in a small truss.** Consider a symmetrical roof truss with a span of 20 ft, a rise of 5 ft, and a 4-kip load at the peak. By symmetry, each support reacts with 2 kips. The sloping top chord has a length of \( \sqrt{10^2 + 5^2} = 11.18 \) ft. At the support joint, the vertical part of the top chord's compression must balance the 2-kip reaction:

\[ C \times \frac{5}{11.18} = 2 \quad \Rightarrow \quad C = 4.47\ \text{kips (compression)} \]

The horizontal part of the same force, \( 4.47 \times 10 / 11.18 = 4.0 \) kips, pushes the support outward. The horizontal bottom chord pulls back, so it is in tension of 4.0 kips. If the truss were flattened to a 2.5 ft rise, the bottom chord tension would double to 8.0 kips. A flatter truss is a more heavily stressed truss.

### Columns

**Columns** are vertical members that carry load mainly in compression, directing it downward to the foundation. A short, stocky column fails by *crushing*, when the material itself reaches its compressive strength. A tall, slender column fails earlier by *buckling*, a sudden sideways bowing, because a slender member is flexible in the same way that a yardstick bends before it crushes when you press its ends. The ideal buckling load, called the Euler load, is

\[ P_{cr} = \frac{\pi^2 E I}{(K L)^2} \]

where \( E \) is the material's modulus of elasticity from Chapter 5, \( I \) is the smallest moment of inertia of the cross-section, \( L \) is the unsupported length, and \( K \) is a factor reflecting how the ends are held. Notice that length is squared in the denominator and that \( I \) depends on the fourth power of a square column's side.

**Worked example: a post at Riverbend.** Each girder end delivers about 16 kips to a post 10 ft tall. Take wood with \( E = 1.4 \times 10^6 \) psi and pinned ends (\( K = 1 \)). A nominal 4×4 (actual 3.5 in. square) has \( I = 3.5^4 / 12 = 12.5 \) in⁴, and

\[ P_{cr} = \frac{\pi^2 (1.4 \times 10^6)(12.5)}{120^2} \approx 12{,}000\ \text{lb} \]

which is less than the 16-kip load even before any safety margin. A nominal 6×6 (5.5 in. square) has \( I = 76.3 \) in⁴ and an ideal capacity of about 73,000 lb. The 6×6 has 2.5 times the area of the 4×4 but about 6 times the buckling capacity. These ideal values ignore knots, crookedness, and the reductions that design rules apply, so real capacities are lower. The lesson stands, however: for a slender column, stiffness and bracing matter more than raw strength.

### Bearing Walls

**Bearing walls** are walls that carry vertical load from the floors or roof above, in addition to enclosing space. They deliver load continuously along their length rather than at isolated points, which suits wood studs, concrete block, and concrete. A wall that carries only its own weight and the finishes on it is a *non-bearing* partition. At Riverbend, the exterior stud walls and the classroom walls under the lower roof framing are bearing walls, and the posts under the girders are built into the long exterior walls.

!!! mascot-warning "Don't Assume a Wall Is Just a Wall"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap in remodeling is cutting an opening in a wall, or removing it, because it looks like a partition. If joists, trusses, or a beam end rest on it, it is bearing, and removing it breaks the load path. Look in the attic or basement to see which way the framing runs, and ask a structural engineer to size a header or beam before any cutting.

**Worked example: load takedown at Riverbend.** We now follow the 50 psf design roof load (dead plus snow) through the gravity system. Riverbend's 20 psf roof live load is smaller than its 35 psf snow load and the two are not added, so snow governs and the live load does not appear in the takedown. The takedown uses the tributary relationship \( w = q \times b \). The roof deck spans between joists spaced 2 ft on center, and the joists span 16 ft between glulam girders spaced 16 ft apart. The girders span 40 ft.

| Member | Tributary width | Load | Reaction at each end |
|--------|-----------------|------|-----------------------|
| Joist, 16 ft span | 2 ft | \( 50 \times 2 = 100 \) plf | \( 100 \times 16 / 2 = 800 \) lb |
| Girder, 40 ft span | 16 ft | \( 50 \times 16 = 800 \) plf | \( 800 \times 40 / 2 = 16{,}000 \) lb |
| Post | Girder end | 16,000 lb | 16,000 lb to the footing |

A quick equilibrium check confirms the result. The girder carries \( 800 \times 40 = 32{,}000 \) lb in total, which is shared equally by its two posts. Each post carries 16 kips, the load used in the column example above. The joists, with their many small reactions of 800 lb, feed the girder in a series of closely spaced point loads, which the uniform-load assumption approximates well.

#### Diagram: Tributary Area and Load Takedown Calculator

<details markdown="1">
<summary>Tributary Area and Load Takedown Calculator</summary>
Type: microsim
**sim-id:** tributary-area-roof-takedown-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the line load, reaction, and maximum moment of a joist, girder, and post from a surface load and member spacing, and will predict (Bloom Level 2, Understand) how changing the spacing or span changes the load each member carries.

Visual: A plan view of the Riverbend multipurpose room roof showing the girders as heavy horizontal lines, joists as thin vertical lines, and posts as squares. One selected member is highlighted, and its tributary area is shaded. Below the plan, a beam diagram shows the selected member with arrows for its line load and reaction values. The canvas follows the container width with a height of 520 px and redraws on resize.

Controls: Sliders for "Roof load (psf)" (20 to 100), "Joist spacing (in.)" (12, 16, 19.2, 24), "Girder spacing (ft)" (8 to 24), and "Girder span (ft)" (20 to 60). A drop-down labeled "Selected member" chooses a joist, girder, or post. A "Check equilibrium" button sums all reactions and compares them with the total load on the bay.

Interactions: Dragging any slider updates the shaded tributary area, \( w \), \( R \), and \( M_{max} \) immediately. Hovering over the shaded area explains in one sentence how the area was found. Clicking "Check equilibrium" displays a green check if the reactions equal the load and a red message otherwise. The default state reproduces the Riverbend values of 50 psf, 24 in., 16 ft, and 40 ft, giving 16,000 lb at each post.

Colors: Tributary areas are light blue, the selected member is orange, and reactions are green arrows. Values are always shown as text.

Implementation: p5.js with DOM sliders, a drop-down, and a responsive canvas.
</details>

### Deflection

**Deflection** is the amount a member moves, usually downward, under load. A member can be strong enough to carry a load and still deflect so far that ceilings crack, doors jam, or water collects in a low spot on a roof. Codes therefore limit deflection as a fraction of the span, such as \( L/360 \) for live load on a floor and \( L/240 \) for total load on a roof, both commonly used figures. For a simply supported beam with a uniform load,

\[ \delta = \frac{5\,w\,L^4}{384\,E\,I} \]

which shows that deflection grows with the fourth power of the span and falls as \( E \) and \( I \) increase. Doubling the span therefore multiplies deflection by 16, and doubling the depth of a rectangular beam divides it by 8. For Riverbend's 40 ft girder, a limit of \( L/360 \) allows \( 480 / 360 = 1.33 \) in. of live-load deflection. Wood also *creeps*, meaning it continues to sag slowly under sustained load, so the engineer chooses a stiffer member than the instantaneous limit alone requires.

## The Lateral Load System

The **lateral load system** is the set of members that collect horizontal loads and deliver them to the foundation. Wind and seismic forces push sideways, and a building with only a gravity system would behave like a cardboard box with unglued flaps: perfectly able to carry a book on top, but ready to collapse sideways when pushed. The lateral system supplies the missing resistance in three links.

First, the walls receive the wind pressure and span vertically between the foundation and the roof, passing their load to the roof edge and the ground. Second, a horizontal *diaphragm* collects those forces and spreads them to the vertical resisting elements. Third, vertical elements carry the force down to the foundation. The next sections define the four elements that make up these links.

!!! mascot-encourage "Sideways Forces Feel Strange at First"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Gravity is easy to picture because things fall, so the sideways path through a roof and a wall can feel abstract at first. Almost everyone needs two passes. Hold a shoebox with the lid off and push the top sideways, then put the lid on and push again, and you will see what a diaphragm and a shear wall do.

### Diaphragms

A **diaphragm** is a large, flat, horizontal element, such as a roof deck or a floor, that resists lateral forces by acting like a deep beam lying on its side. It collects wind or seismic force from the walls and delivers it to the shear walls or frames at its supports. The edges of the diaphragm, called *chords*, resist the tension and compression that bending creates, while the sheathing itself resists shear. Wood diaphragms consist of plywood or OSB sheets nailed to joists, steel diaphragms of corrugated steel decking fastened to supports, and concrete diaphragms of the floor slab itself. Large openings for skylights or stairs reduce a diaphragm's capacity and need special reinforcement.

### Shear Walls

A **shear wall** is a wall designed to resist lateral forces acting in its own plane. It does so by shearing, much as a deck of cards slides when pushed from the top. In wood buildings, a shear wall consists of studs covered with nailed plywood or OSB sheathing, whose capacity depends on the nail size and spacing. Shear walls are also built of concrete and masonry. A longer wall resists more, and a wall with large openings resists less. The *unit shear* is the force carried per foot of wall length, \( v = V/L \) in plf. Because a pushed wall tries to tip over, each end must be anchored to the foundation with hold-downs, which are steel connectors that resist uplift.

### Bracing

**Bracing** consists of diagonal members that triangulate a rectangular frame so it cannot rack, which is the same principle that makes a truss stable. Braces may be steel rods, angles, or tubes in an X or inverted-V pattern, or diagonal straps and let-in boards in wood walls. Slender rod diagonals in an X pattern work in tension only, so in each direction of push one diagonal pulls and the other goes slack. A braced frame is stiff and efficient, but its diagonals interrupt openings, so architects must locate them with care. Temporary bracing also matters during construction, since walls and trusses are unstable until the sheathing is installed.

### Moment Frames

A **moment frame** is a frame whose beam-to-column joints are rigid, so that the connection resists rotation. When wind pushes the frame, the columns and beams bend and carry the force through bending rather than through diagonal members. A moment frame leaves openings free of braces and walls, which is valuable in an open lobby or storefront. The trade-off is that moment frames are more flexible than braced frames and require larger members and more complex connections. Steel and reinforced concrete are the common materials.

**Worked example: wind on Riverbend's lateral system.** First consider wind blowing against the 75 ft end wall, parallel to the long dimension. The wall is 14 ft tall and spans between the foundation and the roof. By the usual approximation, half of its wind force, from the top 7 ft, goes to the roof diaphragm and the other half goes directly into the foundation:

\[ F_{roof} = 20\ \text{psf} \times 7\ \text{ft} \times 75\ \text{ft} = 10{,}500\ \text{lb} \]

The diaphragm spans 75 ft between the two long side walls, which serve as shear walls. Each takes half, or 5,250 lb. If the solid wall segments between windows and doors total 60 ft on each side, the unit shear is \( 5{,}250 / 60 = 87.5 \) plf. The diaphragm's own unit shear is \( 5{,}250 / 120 = 44 \) plf, since the force spreads across the 120 ft length. Both values are well within what nailed OSB or plywood commonly carries, which is typically a few hundred plf.

Now consider the other direction. Wind against the 120 ft long wall produces \( 20 \times 7 \times 120 = 16{,}800 \) lb at the roof, shared between the two 75 ft end walls: 8,400 lb each. If each end wall has 40 ft of solid segments, \( v = 8{,}400 / 40 = 210 \) plf. The demand is more than double the first direction, which shows why the engineer checks both directions and why the placement of openings matters.

With both subsystems and all of their members now defined, the following explorer lets you see the complete structural system of the building at once and test what each element contributes.

#### Diagram: Riverbend Structural System Explorer

<details markdown="1">
<summary>Riverbend Structural System Explorer</summary>
Type: microsim
**sim-id:** riverbend-structural-system-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each element of a simple wood-framed building as part of the gravity load system, the lateral load system, or both, and will identify (Bloom Level 1, Remember) the strength, stiffness, and stability requirement that each element helps satisfy.

Visual: A cutaway three-dimensional-style view of the idealized Riverbend building (120 ft by 75 ft, 14 ft eave) showing the foundation, wall framing, roof deck, joists, glulam girders over the multipurpose room, posts, and the roof diaphragm. The canvas width follows the container and the height is 480 px. Elements are drawn in a flat, labeled style so that every part is visible at once.

Controls: Radio buttons labeled "Show gravity system," "Show lateral system," and "Show both" fade elements in and out. Checkboxes for "Dead load," "Snow load," and "Wind load" draw arrows of proportional length on the building. A slider labeled "Wind speed" (70 to 130 mph) rescales the wind arrows according to the square of speed.

Interactions: Hovering over an element highlights it and shows its name. Clicking an element opens an infobox with its definition, whether it belongs to the gravity system, the lateral system, or both, and what it hands the load to next. A "Remove this element" button on the infobox grays out the element and displays a one-sentence message about which requirement (strength, stiffness, or stability) would be at risk.

Colors: Gravity elements are blue, lateral elements are orange, and elements that serve both are striped blue and orange. Labels are text, not color alone.

Implementation: p5.js with a responsive canvas, DOM radio buttons, checkboxes, and slider, and an infobox div.
</details>

## Structural Connections

**Structural connections** are the joints and fasteners that transfer force from one member to another. A connection may rely on direct contact, as when a girder rests on a post cap, or on mechanical fasteners such as nails, screws, bolts, and steel hangers, or on welds. Each connection must resist the forces that arrive at it, which can be bearing (compression through contact), shear (sideways on a fastener), tension (pull-out or uplift), or bending moment. Connections can also be pinned, which allows rotation as in a truss joint, or rigid, which resists rotation as in a moment frame.

Connections matter disproportionately. A member may be perfectly sized and still fail because it is attached with too few nails or the wrong bracket. The load path passes through every connection, so each one is a link that could be the weakest. The table pairs common connections with what they do at Riverbend.

| Connection | Hardware | Force it transfers | Riverbend example |
|------------|----------|--------------------|-------------------|
| Bearing | Post cap, bearing plate | Compression | Girder ends on posts |
| Hanger | Steel joist hanger, nails | Shear into the support | Roof joists to girders |
| Sheathing nailing | Nails at specified spacing | In-plane shear | Roof diaphragm and shear walls |
| Hold-down | Steel bracket, anchor bolt | Uplift and overturning | Shear wall ends to the foundation |
| Strap or tie | Metal strap, screws | Uplift | Roof framing to wall studs |

Bolted and welded connections for steel and heavy timber are described in Chapter 7, and the anchor bolts that tie wood walls to concrete foundations are covered with foundations in Chapter 10.

**Worked example: uplift at a girder end.** Wind suction on the roof is 20 psf (service level), while only 60 percent of the 15 psf dead load is counted as resisting it, so the net upward pressure is \( 20 - 0.6 \times 15 = 11 \) psf. Each girder end has a tributary roof area of \( 16 \times 20 = 320 \) ft², which is the 16 ft girder spacing times half the 40 ft span. The uplift at that end is \( 11 \times 320 = 3{,}520 \) lb. A strap or bracket with an allowable uplift rating of 5,000 lb, an illustrative figure, gives a demand-to-capacity ratio of \( 3{,}520 / 5{,}000 = 0.70 \). Since the ratio is below 1.0, the connection is adequate. A pair of nails alone could not do this job, which is why uplift connections are specified by the engineer and not left to the framer's judgment.

## Load Path

A **load path** is the continuous route that a load follows from the point where it is applied, through each member and connection, to the soil. Every load on a building must have a complete load path. Each link must be strong enough, stiff enough, and *connected* to the next, and if any link is missing, weak, or disconnected, the load finds another route or the structure fails. This idea unifies the chapter. The structural system, its members, its connections, and the two subsystems are all there to make load paths.

Two principles help in reading load paths.

- **Loads flow toward the stiffer route.** A stiffer member deforms less and attracts more force, which is why a stiff shear wall takes most of the wind force while a flexible window frame takes almost none.
- **Gravity and lateral loads each need their own path.** A path for one does not automatically serve the other, so a building may carry its gravity loads perfectly and still fail sideways because the lateral path was never designed.

The most common defects in load paths are *discontinuities*, which are places where the route breaks or detours. Typical examples include the following.

- A column that is not directly above the column below it, which forces the load to detour through a transfer beam.
- A beam that ends on a partition instead of on a post, which sends its load to a wall that was never designed to carry it.
- A roof that is strapped to the wall but not connected to the foundation, which leaves wind uplift with nowhere to go.

**Worked example: tracing Riverbend's loads to the soil.** The table follows two loads: snow on the roof (gravity) and wind on the end wall (lateral). Values come from the examples earlier in the chapter.

| Link | Gravity path (snow plus dead) | Lateral path (wind on end wall) |
|------|-------------------------------|---------------------------------|
| 1. Surface | Roof deck receives 50 psf | End wall receives 20 psf |
| 2. First handoff | Joists: 800 lb at each end | Wall studs span to roof and floor |
| 3. Collector | Girder: 800 plf, 40 ft span | Roof diaphragm: 10,500 lb |
| 4. Vertical resisting element | Post: 16,000 lb | Side shear walls: 5,250 lb each, 87.5 plf |
| 5. Connection to foundation | Post base and footing | Hold-downs and anchor bolts |
| 6. Foundation to soil | Footing area at least 8 ft² | Footing and slab resist sliding |

For the gravity path, the footing under each post must spread 16,000 lb over enough soil. Chapter 9 explains how soil strength is found. If the soil can safely carry 2,000 psf (illustrative), the footing needs at least \( 16{,}000 / 2{,}000 = 8 \) ft², so a 3 ft by 3 ft pad of 9 ft² works, with an actual soil pressure of \( 16{,}000 / 9 \approx 1{,}780 \) psf. (The weight of the footing itself and the frost depth, covered in Chapter 10, are ignored here.) The lateral path ends with the foundation resisting sliding and the hold-downs resisting uplift. Every row of the table is a handoff, and every handoff is a connection.

!!! mascot-tip "Check Your Load Path Backward"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    On any drawing, pick a member and ask, "What is directly underneath this?" Keep asking until you reach the soil. If the answer is ever "air" or "a partition that was not designed to carry this," you have found a gap in the path.

#### Diagram: Riverbend Load Path Tracer

<details markdown="1">
<summary>Riverbend Load Path Tracer</summary>
Type: microsim
**sim-id:** riverbend-load-path-tracer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will trace (Bloom Level 4, Analyze) the gravity and lateral load paths of a small wood-framed building from the point of application to the soil, and will evaluate (Bloom Level 5, Evaluate) the effect of removing or weakening one link.

Visual: A side elevation of the Riverbend multipurpose room showing roof deck, joists, glulam girder, posts, walls, hold-downs, footings, and soil. Each link is a labeled block, and arrows between blocks show the force passed on. The canvas follows the container width with a height of 500 px and redraws on resize.

Controls: Radio buttons labeled "Snow and dead (gravity)," "Wind (lateral)," and "Quake (lateral)" select the load. A "Step" button animates the load one link at a time, and a "Play" button runs the whole path. A slider labeled "Roof weight" (light wood roof to heavy concrete roof) changes the quake force while leaving the wind force fixed.

Interactions: Clicking any link opens an infobox with the force it carries (matching the worked example: 800 lb, 16,000 lb, 10,500 lb, 5,250 lb), the member type, and the connection to the next link. A "Break this link" toggle on the infobox removes the link, plays an animation of the resulting failure mode, and shows a one-sentence explanation of which requirement (strength, stiffness, stability) is lost. A "Quiz me" button hides the labels and asks the student to click the links in order.

Colors: Gravity paths are blue, lateral paths are orange, and broken links are red with an X, so failures are readable without color.

Implementation: p5.js with a responsive canvas, DOM controls, and an infobox div.
</details>

!!! mascot-celebration "You Can Follow the Weight"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now sort loads into dead, live, snow, wind, and seismic, find the load on a joist or girder from its tributary width, name the members of a gravity and a lateral system, and trace a load link by link to the soil. That load path is the skeleton key to every framing system in the next two chapters.

## Key Takeaways

- A structural system must provide strength, stiffness, and stability, and it carries loads through two cooperating subsystems: the gravity load system and the lateral load system.
- The five principal loads are dead (permanent weight), live (occupancy), snow, wind, and seismic. Wind scales with exposed area and the square of wind speed, and seismic force scales with the weight of the building.
- Load combinations add loads according to how likely they are to occur together, and snow and roof live load are not added to each other.
- A member's load comes from its tributary area, \( w = q \times b \), and each member hands its reaction to the member below, from deck to joists to girders to columns or bearing walls to foundation.
- Beams resist bending, and depth is far more effective than width because stiffness depends on depth cubed. Columns fail by crushing or buckling, and trusses carry load as axial tension and compression in triangles.
- Deflection limits keep structures usable, and deflection grows with the fourth power of the span.
- The lateral system works through diaphragms that collect force and shear walls, bracing, or moment frames that carry it to the foundation.
- Connections transfer force between members, and any link in a load path, including uplift ties and hold-downs, must be as strong as the members it joins.
- A load path is the complete route from application point to soil. Walk it backward from any member and ask what is underneath until you reach the ground.
