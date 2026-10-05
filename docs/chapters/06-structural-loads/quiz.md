# Quiz: Structural Loads and Load Paths

Test your understanding of the concepts in this chapter with these review questions, one for each of the 23 concepts covered.

---

#### 1. Which three requirements must a structural system satisfy at the same time?

<div class="upper-alpha" markdown>
1. Strength, durability, and affordability
2. Stiffness, ductility, and toughness
3. Strength, stiffness, and stability
4. Stability, permeability, and fire resistance
</div>

??? question "Show Answer"
    The correct answer is **C**. The structural system collects loads and carries them safely to the ground. Members must not break or yield (strength), must deform only a small amount (stiffness), and the whole structure must keep its shape and position without tipping, buckling, or racking (stability). Each fails differently, so a designer checks all three. The other combinations mix in material properties or concerns outside the structural job.

    **Concept Tested:** Structural System

    **See:** [The Structural System](index.md#the-structural-system)

---

#### 2. A building carries its gravity loads perfectly but collapses sideways in a windstorm. Which principle from the chapter best explains this?

<div class="upper-alpha" markdown>
1. Loads flow toward the more flexible route, so wind loads bypassed the stiff walls entirely
2. Gravity loads always travel through the lateral system, which was overloaded by the roof's weight
3. A load path is required only for loads that act downward, so wind was not part of the design
4. Gravity and lateral loads each need their own complete path, and a path for one does not serve the other
</div>

??? question "Show Answer"
    The correct answer is **D**. A load path is the continuous route from the point of application through each member and connection to the soil, and it must exist for every load. The chapter notes that a building may carry its gravity load perfectly yet fail sideways because the lateral path was never designed. Loads flow toward the stiffer route, not the more flexible one.

    **Concept Tested:** Load Path

    **See:** [Load Path](index.md#load-path)

---

#### 3. Why does the code require 100 psf for an assembly space when a packed crowd weighs only about 29 psf?

<div class="upper-alpha" markdown>
1. Live load is a design allowance covering furniture, equipment, dynamic motion, and uncertainty about future use
2. Live load is calculated from the weight of the structure, so it is always larger than the crowd weight alone
3. Live load includes snow and wind, so the code adds those to the weight of the people
4. Live load is measured after construction, so the code uses the highest value ever recorded
</div>

??? question "Show Answer"
    The correct answer is **A**. The code specifies minimum design live loads by occupancy, chosen to cover realistic worst cases such as crowding, stage equipment, and dancing. The 29 psf figure is only the actual weight of 400 adults on 2,400 ft². Weight of the structure itself is dead load, and snow and wind are separate loads in the code's classification.

    **Concept Tested:** Live Loads

    **See:** [Live Loads](index.md#live-loads)

---

#### 4. A roof assembly has a membrane at 1.0 psf, rigid insulation at 1.5 psf, sheathing at 2.0 psf, joists at 3.0 psf, and a ceiling with services at 4.5 psf. What is the dead load?

<div class="upper-alpha" markdown>
1. 10.5 psf
2. 12.0 psf
3. 13.5 psf
4. 4.5 psf
</div>

??? question "Show Answer"
    The correct answer is **B**. Dead load is the sum of the permanent weights: 1.0 + 1.5 + 2.0 + 3.0 + 4.5 = 12.0 psf. The value 10.5 omits the 1.5 psf of insulation, 13.5 overcounts, and 4.5 psf is just the ceiling. Dead load is the most predictable load, yet it is the one a designer can least afford to underestimate because every other load is added to it.

    **Concept Tested:** Dead Loads

    **See:** [Dead Loads](index.md#dead-loads)

---

#### 5. In what order does a gravity load pass through the building, from the roof surface down?

<div class="upper-alpha" markdown>
1. Deck, columns, joists, girders and beams, bearing walls, then foundation
2. Joists, deck, bearing walls, beams and girders, columns, then the foundation
3. Foundation, columns and walls, girders and beams, joists, then the roof deck
4. Deck, joists, beams and girders, columns and bearing walls, then foundation
</div>

??? question "Show Answer"
    The correct answer is **D**. The gravity load system hands loads from many small closely spaced members to fewer, larger members: the deck spreads load to joists, joists pass it to beams or girders, those pass it to columns or bearing walls, and the foundation spreads it into the soil. The pattern repeats in every building, with fewer, larger, more widely spaced members at each step down.

    **Concept Tested:** Gravity Load System

    **See:** [The Gravity Load System](index.md#the-gravity-load-system)

---

#### 6. Why is a 2×8 plank much stiffer when set on edge than when laid flat?

<div class="upper-alpha" markdown>
1. Stiffness depends on the cube of the depth, so the deeper orientation raises the moment of inertia greatly
2. Stiffness depends on the width squared, so the wider face carries load better when it faces upward
3. Stiffness depends on the area alone, so the plank gains extra area when it is turned on its edge
4. Stiffness depends on the material, and wood is stronger along its edge than across its flat face
</div>

??? question "Show Answer"
    The correct answer is **A**. For a rectangular beam I = b d³ / 12, so depth enters as the cube. A 2×8 set on edge has I of about 47.6 in⁴ versus about 2.04 in⁴ when flat, roughly 23 times stiffer. The area is the same in both orientations, and the wood's material properties do not change. A beam is always set on edge for this reason.

    **Concept Tested:** Beams

    **See:** [Beams](index.md#beams)

---

#### 7. Why does a tall, slender column fail at a lower load than a short, stocky column made of the same material?

<div class="upper-alpha" markdown>
1. It fails by crushing, because the longer member has more material that reaches its strength
2. It fails in tension, because slender members cannot carry compression forces along their length
3. It fails by buckling, a sudden sideways bowing, before the material reaches its compressive strength
4. It fails by shear, because the supports twist the member at both ends under the applied load
</div>

??? question "Show Answer"
    The correct answer is **C**. Slender columns are flexible, like a yardstick pressed at its ends. The Euler buckling load depends on E, the smallest moment of inertia, and the square of the unsupported length. A 4×4 post of 10 ft can buckle at about 12,000 lb, while a 6×6 has about six times the capacity. Short, stocky columns fail by crushing instead.

    **Concept Tested:** Columns

    **See:** [Columns](index.md#columns)

---

#### 8. Using q ≈ 0.00256 V², by what factor does the velocity pressure change when the wind speed doubles from 60 mph to 120 mph?

<div class="upper-alpha" markdown>
1. It increases by a factor of 2
2. It increases by a factor of 4
3. It increases by a factor of 8
4. It increases by a factor of 16
</div>

??? question "Show Answer"
    The correct answer is **B**. Because speed is squared, doubling it quadruples the pressure: about 9.2 psf at 60 mph and about 36.9 psf at 120 mph. A factor of 2 would apply if pressure were proportional to speed, while 8 and 16 assume a cube or fourth-power relationship, which describes other quantities such as deflection versus span but not wind pressure.

    **Concept Tested:** Wind Loads

    **See:** [Wind Loads](index.md#wind-loads)

---

#### 9. Why does replacing a light roof with a heavy masonry roof increase the seismic force on a building?

<div class="upper-alpha" markdown>
1. Base shear depends on the exposed area, so a heavy roof presents more surface to the ground motion
2. Base shear is a fraction of the building's weight, so greater mass produces a greater inertial force
3. Base shear depends on wind speed, so a heavy roof receives a larger share of the wind force
4. Base shear depends on the soil only, so the roof weight changes how the force is resisted
</div>

??? question "Show Answer"
    The correct answer is **B**. When the ground shakes, the building's mass resists the motion because of inertia, and the horizontal force is V = C_s W. Doubling the roof weight in the example doubles V from 8.5 to 17 kips, exceeding the wind force. Wind scales with area and speed squared, whereas earthquakes scale with weight, so heavy buildings worry about quakes and light, large ones about wind.

    **Concept Tested:** Seismic Loads

    **See:** [Seismic Loads](index.md#seismic-loads)

---

#### 10. Why can trusses span long distances using little material?

<div class="upper-alpha" markdown>
1. Triangles cannot change shape, so each member carries only axial tension or compression
2. Trusses are always built from steel, which has a very high strength-to-weight ratio
3. Truss members carry bending along their length, which uses the full cross-section
4. Trusses spread load over the entire roof, which removes the need for supports
</div>

??? question "Show Answer"
    The correct answer is **A**. A truss is a framework of straight members arranged in triangles and loaded at its joints. A pinned four-sided frame can rack, but a triangle cannot change shape unless a member changes length. Members loaded axially use their material efficiently. Trusses can be wood with connector plates or steel, and they still need supports at their ends.

    **Concept Tested:** Trusses

    **See:** [Trusses](index.md#trusses)

---

#### 11. What are the three links by which the lateral load system carries wind to the foundation?

<div class="upper-alpha" markdown>
1. Footings resist the wind, columns spread it to the soil, and beams deliver it to the exterior walls
2. The roof deck resists the wind, joists collect the force, and girders carry it to the posts
3. Walls span vertically, a horizontal diaphragm collects the force, and vertical elements carry it down
4. Posts receive the wind, the foundation deflects it, and the soil carries it back up to the walls
</div>

??? question "Show Answer"
    The correct answer is **C**. The lateral system supplies resistance that the gravity system lacks. Walls receive pressure and pass it to the roof edge and ground, a diaphragm collects those forces and spreads them to vertical resisting elements, and those elements carry the force down. Without it, a building would be like a cardboard box with unglued flaps, able to carry a book on top but ready to collapse sideways.

    **Concept Tested:** Lateral Load System

    **See:** [The Lateral Load System](index.md#the-lateral-load-system)

---

#### 12. Wind suction is 24 psf, and 60 percent of a 15 psf dead load resists it. A girder end has 200 ft² of tributary roof, and its bracket is rated for 2,500 lb of uplift. Which conclusion is correct?

<div class="upper-alpha" markdown>
1. Adequate, because net uplift of about 1,800 lb is below the 2,500 lb rating
2. Adequate, because the full dead load offsets the suction, leaving no uplift
3. Inadequate, because the net pressure is 24 psf, which multiplies to 4,800 lb
4. Inadequate, because net uplift of about 3,000 lb exceeds the 2,500 lb rating
</div>

??? question "Show Answer"
    The correct answer is **D**. Net upward pressure is 24 − 0.6 × 15 = 15 psf, and 15 × 200 = 3,000 lb, so the demand exceeds the 2,500 lb capacity (a ratio of 1.2). Counting only part of the dead load is the code's rule where dead load helps. Using the full suction ignores that offset, and counting no suction misreads the check. Uplift connections are specified by the engineer, not left to the framer.

    **Concept Tested:** Structural Connections

    **See:** [Structural Connections](index.md#structural-connections)

---

#### 13. A code gives a ground snow load of 40 psf, and the adjustments for a heated flat roof in typical exposure give a factor of about 0.7. What is the roof snow load?

<div class="upper-alpha" markdown>
1. 40 psf
2. 57 psf
3. 12 psf
4. 28 psf
</div>

??? question "Show Answer"
    The correct answer is **D**. The designer adjusts the ground snow load for exposure, heat loss, slope, and importance: 0.7 × 40 = 28 psf. Using 40 psf skips the adjustment, 57 psf divides by 0.7 instead of multiplying, and 12 psf subtracts the factor. Uniform snow is only part of the story, since drifting against parapets and roof steps can create local loads several times higher.

    **Concept Tested:** Snow Loads

    **See:** [Snow Loads](index.md#snow-loads)

---

#### 14. What does "16 in. o.c." mean when describing joist spacing?

<div class="upper-alpha" markdown>
1. The joists are spaced 16 in. apart, measured from the center of one joist to the center of the next
2. The joists are 16 in. deep, measured from the top of the joist to its bottom edge at the support
3. The joists may span a maximum of 16 in. before they must be supported by a beam or girder
4. The joists are 16 in. long, measured from the support to the first connection at the beam
</div>

??? question "Show Answer"
    The correct answer is **A**. Joists are closely spaced horizontal members that support a floor or roof deck, commonly at 12, 16, or 24 in. on center. Because they are close together and tied by the deck, a heavily loaded joist can share load with neighbors. Blocking or bridging between them keeps tall, thin joists from twisting. On center never refers to depth or span.

    **Concept Tested:** Joists

    **See:** [Joists](index.md#joists)

---

#### 15. How does a roof diaphragm resist lateral force?

<div class="upper-alpha" markdown>
1. It acts like a column, with the sheathing resisting buckling and the chords resisting crushing forces
2. It acts like a deep beam lying on its side, with chords resisting bending and sheathing resisting shear
3. It acts like a truss, with the chords carrying shear and the sheathing carrying bending moments
4. It acts like a footing, with the sheathing spreading the force into the soil
</div>

??? question "Show Answer"
    The correct answer is **B**. A diaphragm is a large, flat, horizontal element such as a roof deck or floor. It collects wind or seismic force from the walls and delivers it to shear walls or frames. The edges, called chords, resist tension and compression from bending, while the sheathing resists shear. Large openings for skylights or stairs reduce its capacity and need special reinforcement.

    **Concept Tested:** Diaphragms

    **See:** [Diaphragms](index.md#diaphragms)

---

#### 16. Why does the code not add snow load and roof live load together in a load combination?

<div class="upper-alpha" markdown>
1. Snow load already contains the roof live load, so adding them would count it twice
2. Roof live load applies only to floors, so it does not belong in a roof combination
3. Workers and heavy snow are not expected at the same time, so the larger of the two governs
4. The code treats both loads as permanent, so only one may be counted in a combination
</div>

??? question "Show Answer"
    The correct answer is **C**. Load combinations scale and add loads according to how likely they are to occur together, since a crowded room is unlikely to coincide with the worst storm. Roof live load represents workers and maintenance, so it is not combined with heavy snow, and the larger governs. Neither load is permanent. Where dead load helps, as in resisting uplift, only part of it counts.

    **Concept Tested:** Load Combinations

    **See:** [Load Combinations](index.md#load-combinations)

---

#### 17. A roof carries 50 psf and interior members are spaced 12 ft apart. What line load does each member carry?

<div class="upper-alpha" markdown>
1. 600 plf
2. 300 plf
3. 62 plf
4. 4.2 plf
</div>

??? question "Show Answer"
    The correct answer is **A**. The tributary width is the spacing between interior members, so w = q × b = 50 × 12 = 600 plf. Using half the spacing gives 300, adding the numbers gives 62, and dividing gives 4.2. The tributary area extends halfway to the next supporting member on each side, which for an interior member is the full spacing between members.

    **Concept Tested:** Tributary Area

    **See:** [Tributary Area](index.md#tributary-area)

---

#### 18. What distinguishes a girder from an ordinary beam?

<div class="upper-alpha" markdown>
1. A girder is a beam that carries only its own weight and the finishes on it
2. A girder is a vertical member that carries load mainly in compression
3. A girder is a diagonal member that triangulates a frame so it cannot rack
4. A girder is a primary beam that supports other beams, usually joists
</div>

??? question "Show Answer"
    The correct answer is **D**. The glulam members over Riverbend's multipurpose room are girders because they receive concentrated loads from many joists and carry them across the span to posts. A girder generally has a larger tributary width, so it is deeper and heavier than the members it supports. Vertical compression members are columns, and diagonal members that stop racking are braces.

    **Concept Tested:** Girders

    **See:** [Girders](index.md#girders)

---

#### 19. A homeowner wants to remove an interior wall that looks like a partition. Which observation indicates that the wall is bearing?

<div class="upper-alpha" markdown>
1. It has door openings of standard height
2. It is built from studs at 16 in. on center
3. Joists or a beam end rest on top of it
4. It carries only its own weight and the finish on it
</div>

??? question "Show Answer"
    The correct answer is **C**. Bearing walls carry vertical load from floors or roof above, delivered continuously along their length. If joists, trusses, or a beam end rest on a wall, removing it breaks the load path, so the homeowner should check which way the framing runs and consult a structural engineer. A wall that carries only itself is a non-bearing partition, and openings or stud spacing do not decide the question.

    **Concept Tested:** Bearing Walls

    **See:** [Bearing Walls](index.md#bearing-walls)

---

#### 20. Why is each end of a wood shear wall anchored to the foundation with hold-downs?

<div class="upper-alpha" markdown>
1. A wall pushed in its own plane tries to slide, and hold-downs resist the sliding directly
2. A wall pushed in its own plane tries to tip over, and hold-downs resist the resulting uplift
3. A wall under gravity load tries to buckle, and hold-downs keep the studs straight
4. A wall under wind suction tries to crack, and hold-downs spread the cracks along the length
</div>

??? question "Show Answer"
    The correct answer is **B**. A shear wall resists lateral forces acting in its own plane by shearing, as a deck of cards slides when pushed from the top. The pushed wall tends to overturn, so steel hold-downs resist uplift at its ends. A longer wall resists more, and large openings reduce capacity. Sliding is resisted mainly by the foundation, and buckling and cracking are not the purpose of hold-downs.

    **Concept Tested:** Shear Walls

    **See:** [Shear Walls](index.md#shear-walls)

---

#### 21. Why do slender X-braced rod diagonals work in tension only?

<div class="upper-alpha" markdown>
1. In each direction of push both diagonals are stretched equally, so neither one ever carries any compression
2. A rod diagonal carries compression easily, so the second diagonal is only needed for redundancy in the frame
3. In each direction of push one diagonal stretches and the other goes slack, since a rod cannot resist compression
4. The rods are connected at their center, so they always pull on the corners of the frame together at once
</div>

??? question "Show Answer"
    The correct answer is **C**. Bracing triangulates a rectangular frame so it cannot rack, the same principle as a truss. Slender rods can pull but buckle in compression, so in an X pattern the diagonal that would be compressed goes slack while the other works in tension. Braced frames are stiff and efficient but interrupt openings, so architects must locate them with care.

    **Concept Tested:** Bracing

    **See:** [Bracing](index.md#bracing)

---

#### 22. An architect wants a storefront with no diagonal braces or solid walls in the openings. What trade-off comes with using a moment frame instead of a braced frame?

<div class="upper-alpha" markdown>
1. The frame is stiffer and needs fewer connections, but its beams must be placed inside walls
2. The frame is more flexible and needs larger members and more complex connections
3. The frame cannot resist wind, so a separate shear wall must be added to every opening
4. The frame resists force only in tension, so slender rods must be added to each joint
</div>

??? question "Show Answer"
    The correct answer is **B**. A moment frame has rigid beam-to-column joints that resist rotation, so force is carried through bending rather than diagonals, leaving openings free. In exchange, it is more flexible than a braced frame and needs larger members and more complex connections. Steel and reinforced concrete are the common materials. It does resist wind, and its members carry bending, not just tension.

    **Concept Tested:** Moment Frames

    **See:** [Moment Frames](index.md#moment-frames)

---

#### 23. By what factor does the deflection of a simply supported beam with a uniform load change when its span is doubled, with all else unchanged?

<div class="upper-alpha" markdown>
1. It is multiplied by 16
2. It is multiplied by 2
3. It is multiplied by 4
4. It is multiplied by 8
</div>

??? question "Show Answer"
    The correct answer is **A**. In δ = 5wL⁴ / 384EI, deflection grows with the fourth power of the span, so doubling it multiplies deflection by 2⁴ = 16. A factor of 2 would apply to a linear relationship, 4 to a squared one, and 8 to a cube, which is how depth enters the moment of inertia. Codes limit deflection to a fraction of span, such as L/360, so floors do not sag or crack finishes.

    **Concept Tested:** Deflection

    **See:** [Deflection](index.md#deflection)

---
