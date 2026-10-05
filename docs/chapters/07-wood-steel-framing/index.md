---
title: Wood and Steel Framing
description: Lumber, engineered wood products, and structural steel used for framing, along with their connections and typical wall, floor, and roof assemblies.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:09:31
version: 1.10
---

# Wood and Steel Framing

## Summary

The lumber, engineered wood, and structural steel systems used for framing, along with their connections and typical assemblies. It builds on the prerequisite concepts from Chapters 1, 4, 6. After completing this chapter, students will be able to define, explain, and apply the 18 concepts listed below.

## Concepts Covered

This chapter covers the following 18 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Lumber | 31 |
| Engineered Wood Products | 16 |
| Wood Framing | 12 |
| Plywood and OSB | 11 |
| Roof Framing | 6 |
| Structural Steel | 6 |
| Platform Framing | 5 |
| Wall Studs | 3 |
| Glulam | 2 |
| Cross-Laminated Timber | 2 |
| Wood Moisture Content | 2 |
| Steel Shapes | 2 |
| Headers | 1 |
| Floor Systems | 1 |
| Bolted Connections | 1 |
| Welded Connections | 1 |
| Light-Gauge Steel Framing | 1 |
| Steel Decking | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 6: Structural Loads and Load Paths](../06-structural-loads/index.md)

---

!!! mascot-welcome "Meet the Bones of the Building"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Almost every building you will walk into this year is held up by sticks of wood, beams of steel, or both. By the end of this chapter you will be able to look at a wall, a floor, or a roof and name what is inside it and why it was chosen. Let's build it right!

Chapter 6 showed that a structure is a chain of members and connections carrying loads to the ground. This chapter looks at the two materials that make up most of those chains in small and mid-sized buildings: wood and steel. Wood is a natural fibrous material that is cut, dried, and nailed together on site. Structural steel is an engineered alloy that is rolled in a mill, fabricated in a shop, and bolted or welded together on site. They behave very differently, and the differences explain why a house is framed one way and a warehouse another.

We begin with the many forms of wood, from sawn lumber to engineered products, then see how they are assembled into walls, floors, and roofs, and finish with steel. Examples draw on the **Riverbend Youth Center** from Chapter 2 and on a typical small Minnesota building. All dimensions and capacities for Riverbend are illustrative.

## Lumber

**Lumber** is wood that has been sawn from logs into rectangular pieces, dried, and graded for use as structural framing. Framing lumber comes from *softwoods*, which are the needle-bearing conifers such as spruce, pine, and fir. The species groups common in Minnesota framing are spruce-pine-fir (SPF) and Douglas fir-larch. Hardwoods such as oak and maple are used mostly for flooring and finish.

Wood is a bundle of long, hollow cells aligned with the trunk, and this structure makes it *anisotropic*, meaning its properties depend on direction. Wood is strong and stiff along the grain, the direction of the fibers, and much weaker across it. It crushes more easily when squeezed across the grain, as under a beam bearing, and it splits easily when pulled across the grain. A designer who forgets this can undermine a perfectly good member with a deep notch or a bolt hole near an end.

!!! mascot-thinking "Wood Is a Bundle of Straws"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Picture a bundle of drinking straws: it is hard to crush or stretch along its length, but easy to squash sideways or split between straws. Every rule of thumb in wood construction, such as limiting notches and keeping loads on the end grain, follows from that picture.

Lumber is sorted by *grade* according to the size and location of defects such as knots, which weaken the piece. Grades are assigned by visual inspection or by machine testing of stiffness, and are marked in a stamp on each piece. Typical structural grades include Select Structural, No. 1, and No. 2, each with its own design values for bending, shear, and compression.

Lumber is also sold by *nominal size*, which is a rounded name such as "2×4." The actual size is smaller, because the piece loses material in drying and planing. A 2×4 measures 1.5 in. by 3.5 in. in reality. Structural calculations always use the actual size. The table lists common sizes with their actual cross-section properties. The *section modulus* \( S = b d^2 / 6 \) relates a beam's bending moment to its bending stress, \( \sigma = M / S \), and \( I \) is the moment of inertia from Chapter 6.

| Nominal size | Actual size (in.) | Area (in²) | Section modulus S (in³) | Moment of inertia I (in⁴) |
|--------------|-------------------|-----------|--------------------------|----------------------------|
| 2×4 | 1.5 × 3.5 | 5.25 | 3.06 | 5.4 |
| 2×6 | 1.5 × 5.5 | 8.25 | 7.56 | 20.8 |
| 2×8 | 1.5 × 7.25 | 10.88 | 13.14 | 47.6 |
| 2×10 | 1.5 × 9.25 | 13.88 | 21.39 | 98.9 |
| 2×12 | 1.5 × 11.25 | 16.88 | 31.64 | 178.0 |

**Worked example: how much can a 2×10 joist carry?** Suppose a No. 2 grade 2×10 has an allowable bending stress of about 900 psi (an illustrative round number; the actual values come from the design standard). The allowable moment is \( M = F_b S = 900 \times 21.39 = 19{,}250 \) in.-lb, or 1,604 ft-lb. For a simply supported 12 ft span, \( M = wL^2/8 \) gives

\[ w = \frac{8M}{L^2} = \frac{8 \times 1{,}604}{12^2} = 89\ \text{plf} \]

At 16 in. on center, each joist carries a 1.33 ft strip of floor, so the allowable floor pressure in bending is \( 89 / 1.33 = 67 \) psf. A residential floor with 40 psf live load and about 10 psf dead load needs 50 psf, so bending is satisfied. Deflection and vibration, which depend on stiffness, must still be checked separately and often control the span.

!!! mascot-tip "Calculate With Actual, Not Nominal"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Whenever you compute a weight, a stiffness, or a stud count, use the actual size of the lumber, not the name. Using 2 in. by 4 in. for a 2×4 overstates the area by more than 50 percent, and a quick look at the grade stamp tells you the species, grade, and moisture condition.

### Wood Moisture Content

**Wood moisture content** (MC) is the mass of water in a piece of wood expressed as a percentage of its oven-dry mass:

\[ \text{MC} = \frac{W_{wet} - W_{dry}}{W_{dry}} \times 100\% \]

A sample that weighs 42 g and weighs 35 g after oven drying has \( \text{MC} = (42 - 35)/35 = 20\% \). Wood holds water in two places, in the cell cavities and within the cell walls. The *fiber saturation point*, at roughly 28 to 30 percent, is the moisture content at which the cell walls are full but the cavities are empty. Above that point wood does not change size when it gains or loses water. Below it, the wood shrinks as it dries and swells as it absorbs moisture, and it does so mostly across the grain.

Moisture content affects strength, dimensional stability, and durability. Framing lumber is typically dried to 19 percent or less before it is sold. Wood in a heated Minnesota building eventually settles at an *equilibrium moisture content* set by the surrounding air, which in a heated interior in winter may fall to roughly 5 to 10 percent. Lumber that is too wet when it is enclosed can shrink, warp, and loosen nails as the building dries. Sustained moisture contents above about 20 percent can also allow decay fungi to grow, a connection to the moisture principles of Chapter 4.

!!! mascot-warning "Don't Close Up Wet Framing"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Framing that has been rained on can be too wet to cover, and sealing it behind insulation and drywall traps the moisture where mold and decay can grow. Check lumber with a moisture meter before enclosing, and let it dry, with fans or heat if needed, until readings are at or below the specified limit.

#### Diagram: Wood Moisture and Shrinkage Calculator


<iframe src="../../sims/wood-moisture-shrinkage-calculator/main.html" width="100%" height="714px" scrolling="no"></iframe>
[Run Wood Moisture and Shrinkage Calculator Fullscreen](../../sims/wood-moisture-shrinkage-calculator/main.html)

<details markdown="1">
<summary>Wood Moisture and Shrinkage Calculator</summary>
Type: chart
**sim-id:** wood-moisture-shrinkage-calculator<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the moisture content of a wood sample and the across-grain shrinkage of a member as it dries, and will predict (Bloom Level 2, Understand) how a heated Minnesota winter interior changes a framed building's dimensions.

Visual: A line chart whose horizontal axis is moisture content from 0 to 30 percent and whose vertical axis is relative across-grain dimension. The line slopes upward below the fiber saturation point at about 28 percent and is flat above it. A marker shows the current moisture content. The chart is responsive to the container width with a height of 400 px.

Controls: Sliders labeled "Starting MC (%)" (10 to 30) and "Final MC (%)" (4 to 19), and a drop-down labeled "Member depth" (2×4, 2×6, 2×8, 2×10, 2×12, and a stack of three floor levels). A preset button labeled "Minnesota winter interior" sets the final MC to 8 percent.

Interactions: Dragging the sliders moves the marker and recalculates the shrinkage in inches, using an assumed coefficient of 0.2 percent per point of moisture change (labeled illustrative). A readout shows the decay-risk status in text, based on whether the moisture content is above 20 percent. A button labeled "Weigh a sample" accepts a wet and an oven-dry mass and shows the moisture content computation step by step.

Colors: Safe moisture ranges are green, the above-20-percent decay-risk range is orange, and the region above fiber saturation is gray with a text label.

Implementation: Chart.js with annotation lines and DOM controls.
</details>

## Engineered Wood Products

**Engineered wood products** are structural materials made by bonding wood veneers, strands, or boards together with adhesives into larger, more uniform shapes than a single log can supply. Sawn lumber carries the random knots, slope of grain, and variability of its tree, and engineered products break the tree into smaller pieces and reassemble them so that the defects are scattered or removed. The result is a product that is more consistent, can be made in larger sizes, and is often stronger and stiffer than lumber for its weight. The family includes plywood and OSB, glulam, cross-laminated timber, and several others.

Two other members of the family are common in framing. *Laminated veneer lumber* (LVL) is made from thin veneers glued with the grain parallel, and it serves as headers and beams. *Prefabricated wood I-joists* have top and bottom flanges of LVL or sawn lumber joined by a thin web of OSB, and they are used as floor and roof joists. The trade-offs are that some products are more sensitive to moisture during construction, and that they need manufacturer-specific rules. For example, a flange must never be cut or notched, and holes in the web are allowed only in the sizes and positions the manufacturer's tables allow.

**Worked example: why an I-joist works.** In Chapter 6 we saw that a beam's stiffness depends on its depth cubed, so material far from the center of the section is more valuable than material near it. An I-joist applies that idea. Consider an 11⅞ in. deep I-joist with two flanges 1¾ in. wide and 1½ in. deep and an OSB web ⅜ in. thick. Summing the flange and web contributions gives a moment of inertia of about 164 in⁴ and a wood area of 8.6 in². A solid sawn 2×12 has \( I = 178 \) in⁴ and an area of 16.9 in². The I-joist is nearly as stiff while using about half the wood, and it is also straighter, lighter, and easier to run ductwork around.

| Member | Depth (in.) | Moment of inertia (in⁴) | Wood area (in²) |
|--------|-------------|--------------------------|------------------|
| Sawn 2×12 | 11.25 | 178 | 16.9 |
| I-joist | 11.875 | 164 | 8.6 |

### Plywood and OSB

**Plywood and OSB** are the two structural wood panels used for sheathing walls, roofs, and floors. *Plywood* is made of thin layers of veneer, peeled from a log and glued with the grain of each layer perpendicular to its neighbors. The cross-lamination makes the panel nearly equal in strength in both directions and limits its swelling. *OSB*, short for oriented strand board, is made from long wood strands arranged in layers with the strands in each layer aligned in one direction, and bonded with resin under heat and pressure. Both are usually made in 4 ft by 8 ft sheets, a unit that also sets the spacing of studs and joists, and in thicknesses from about 7/16 in. up to 3/4 in. Both are stamped with a *span rating*, such as 24/16, which indicates the largest support spacing, in inches, allowed for roof and floor use respectively.

Panels do three jobs. They spread loads across joists and rafters, they brace walls against racking when nailed on edge, and they form the diaphragms and shear walls described in Chapter 6. OSB is typically cheaper than plywood and performs similarly in structural uses, but its edges can swell if soaked. Panel edges are commonly spaced about 1/8 in. apart, because panels expand slightly when they absorb moisture. Panels with an "Exposure 1" rating tolerate the rain that falls on a building during construction, though they are not meant to be left exposed permanently.

**Worked example: sheathing the Riverbend roof.** The table works out how many sheets the 9,000 ft² roof needs, including a 10 percent allowance for cutting and waste. The sheathing weighs about 2 psf, which is the value used in Chapter 6's roof dead load table.

| Step | Calculation | Result |
|------|-------------|--------|
| Area of one sheet | 4 ft × 8 ft | 32 ft² |
| Sheets to cover the roof | 9,000 ÷ 32 | 281.25 |
| With 10 percent waste | 281.25 × 1.10 | About 310 sheets |

### Glulam

**Glulam**, short for glued laminated timber, is a structural member made of many layers of lumber, called *laminations*, bonded face-to-face with structural adhesive and with the grain of every layer running along the length. The laminations, typically about 1⅜ to 1½ in. thick, are end-joined with interlocking finger joints so that a member can be much longer than any single board. Because the weakest defects are scattered and the best lumber is placed at the top and bottom where bending stress is highest, glulam is stronger than sawn lumber of the same size. It can also be made in large sections and in curves, which is why gymnasiums, churches, and the Riverbend girders use it. Large glulam members also tend to char slowly in a fire, which protects the core, a topic for Chapter 18. The ends of a glulam beam should be kept dry where they rest on a support.

### Cross-Laminated Timber

**Cross-laminated timber** (CLT) is a large panel made of layers of lumber boards, with each layer laid perpendicular to the one beneath and glued into a solid slab, typically of three, five, or seven layers. Because the layers cross, a CLT panel carries load in both directions, like a thick plate, and can serve as a floor, wall, or roof. CLT panels are cut to size, with openings for windows and doors, in a factory, and erected quickly with a crane. CLT belongs to a group called *mass timber*, which uses large solid wood members that resist fire through predictable charring. Recent editions of the International Building Code allow mass timber buildings taller than conventional wood frames, and the edition adopted in Minnesota decides what is permitted there (Chapter 17). Wood also stores carbon, a point that Chapter 20 takes up. The table summarizes the engineered products met in this section.

| Product | Made from | Typical use |
|---------|-----------|-------------|
| Plywood | Veneers glued with alternating grain | Wall, roof, and floor sheathing |
| OSB | Strands glued in oriented layers | Wall, roof, and floor sheathing |
| LVL | Veneers glued with parallel grain | Headers and beams |
| I-joist | Flanges joined by an OSB web | Floor and roof joists |
| Glulam | Lumber laminations glued face to face | Girders, arches, and columns |
| CLT | Boards glued in crossing layers | Floor, wall, and roof panels |

## Wood Framing

**Wood framing**, also called light-frame wood construction, is a structural system in which closely spaced, modest-size members, namely studs, joists, and rafters or trusses, are covered with structural sheathing to form walls, floors, and roofs. It is the dominant system for houses, apartments, and small commercial buildings in North America, including most Minnesota homes. It is economical, familiar to most trades, easy to modify, and leaves cavities in the walls and roof that hold insulation. Its limitations are that it is combustible, sensitive to moisture, and subject to shrinkage, so codes limit the height and area of wood buildings unless extra fire protection is provided (Chapter 18).

Because the members are numerous and closely spaced, light-frame wood is highly *redundant*: if one stud is weak, its neighbors share its load through the sheathing. The framing spacing is typically 16 or 24 in. on center, chosen to match the 4 ft by 8 ft sheathing panels, since both 16 and 24 divide 48 evenly.

**Worked example: studs at 16 versus 24 inches.** A 20 ft wall is 240 in. long, and the studs are 1.5 in. wide. The table counts the studs, which equal the number of spaces plus one for the end stud.

| Spacing | Spaces in 240 in. | Studs | Share of wall length occupied by studs |
|---------|-------------------|-------|-----------------------------------------|
| 16 in. on center | 15 | 16 | 10.0% |
| 24 in. on center | 10 | 11 | 6.9% |

The 24 in. spacing uses 31 percent fewer studs. Wood conducts heat about three times as readily as most insulation per inch, a property introduced in Chapter 3, so fewer studs also means less *thermal bridging*. The full wall, with plates, headers, and corners, contains more wood than the studs alone, and is often cited as roughly 15 to 25 percent framing.

### Platform Framing

**Platform framing** is the standard way of building wood-framed multistory buildings, in which each story is framed as a separate platform. The floor framing and subfloor of one level form a flat platform. The wall frames for that story are built on the platform, typically lying flat and then tilted up, and the next floor platform rests on top of the walls. The advantage over the older *balloon framing*, in which studs ran continuously through all floors, is that every platform interrupts the open cavities that let fire race upward, and each platform gives workers a safe surface from which to build the next.

The disadvantage is shrinkage. A floor joist and the plates above and below it have their grain horizontal, so as they dry they shrink in height, while studs shrink very little in length. Differences in this movement can crack drywall and break a connection with materials that do not shrink, such as brick veneer.

**Worked example: cumulative shrinkage in a three-story building.** At each floor, the stack of wood with horizontal grain consists of one 2×10 joist (9.25 in.) and three layers of 1.5 in. plates (4.5 in.), totaling 13.75 in. Suppose the framing is installed at 19 percent moisture content and settles at 9 percent in a heated building, a drop of 10 points. With an illustrative across-grain coefficient of 0.2 percent per point, the shrinkage is \( 0.2\% \times 10 = 2\% \) of the depth. Per floor this is \( 0.02 \times 13.75 = 0.275 \) in., and over three floors, \( 3 \times 0.275 = 0.83 \) in. Designers detail the cladding, plumbing, and stairs to accommodate that movement, and some choose engineered products, which shrink much less, to reduce it.

#### Diagram: Platform Framing Assembly Explorer


<iframe src="../../sims/platform-framing-assembly-explorer/main.html" width="100%" height="592px" scrolling="no"></iframe>
[Run Platform Framing Assembly Explorer Fullscreen](../../sims/platform-framing-assembly-explorer/main.html)

<details markdown="1">
<summary>Platform Framing Assembly Explorer</summary>
Type: microsim
**sim-id:** platform-framing-assembly-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the components of a platform-framed wall and floor, and will explain (Bloom Level 2, Understand) how each component transfers load and how the platform interrupts the paths of fire and carries cumulative shrinkage.

Visual: An exploded cross-section of a two-story platform-framed exterior wall showing the foundation wall, sill plate, floor joists, band joist, subfloor, sole plate, studs, double top plate, header over a window opening, king and jack studs, wall sheathing, and the next floor platform. The canvas width follows the container with a height of 520 px and redraws on resize.

Controls: A slider labeled "Assemble" moves the parts from exploded to assembled positions. Radio buttons labeled "Gravity load path," "Wind load path," and "Fire spread" select an overlay. A toggle labeled "Balloon framing" replaces the platform with continuous studs to compare.

Interactions: Hovering over a component highlights it and displays its name. Clicking opens an infobox that gives its function, typical size, and the load it carries. In the "Gravity load path" overlay, arrows animate through studs, plates, and joists. In the "Fire spread" overlay, the platform version shows a fire-stop at each floor and the balloon version shows an open vertical cavity. A "Shrinkage" slider (0 to 3 percent) shows the platform's horizontal grain stack shrinking, with a readout in inches.

Colors: Lumber is tan, sheathing is light yellow, and load arrows are blue. Fire paths are orange and have text labels.

Implementation: p5.js with a responsive canvas, DOM controls, and an infobox div.
</details>

### Wall Studs

**Wall studs** are the vertical members of a framed wall. They carry vertical loads from floors and roofs down to the bottom plate, they resist wind pressure on the wall by spanning between the floors, and they provide the nailing surface for sheathing and interior finishes. Studs are typically 2×4 or 2×6 lumber at 16 or 24 in. on center, and are precut to lengths to suit standard ceiling heights. A 2×6 stud leaves a deeper cavity for insulation than a 2×4, so many Minnesota exterior walls use them to meet the energy code. At corners and around openings, extra studs are added to carry concentrated loads and to provide nailing for finishes. Studs at each side of an opening support the header above it.

### Headers

A **header** is a beam placed over a door or window opening in a bearing wall to carry the loads from above around the opening. The framing around an opening has several parts.

- *Jack studs*, also called trimmers, stand at each end of the header and carry its load down to the floor framing and foundation.
- *King studs* run the full height of the wall beside the jack studs, tie the opening to the plates, and brace it against wind.
- *Cripple studs* fill the short spaces above the header and below a window sill.

Headers may be built up from two lumber members with a spacer to match the thickness of the wall, or made of LVL or glulam. Their required size depends on the opening width and the roof or floor load they support. The code provides span tables for houses, while larger buildings are designed by an engineer. In cold climates, an oversized solid header in an exterior wall is a thermal bridge, so designers use the smallest adequate header or insulate it.

### Floor Systems

A **floor system** is the assembly of joists or trusses, bearing on walls or beams, with a subfloor on top, which supports the floor loads in a wood-framed building. A typical system uses sawn joists, I-joists, or open-web trusses at 16 in. or 19.2 in. on center, topped by a tongue-and-groove OSB or plywood subfloor that is glued and fastened to prevent squeaks. Strength is rarely the controlling issue. Stiffness and vibration usually decide the joist size, since occupants notice a bouncy floor long before it threatens collapse. Open-web floor trusses leave room for ducts and pipes to pass through the floor depth, and the floor also acts as the horizontal diaphragm of Chapter 6, collecting lateral loads and passing them to the shear walls below. The table compares the three common framing choices.

| Floor framing | Strengths | Limitations |
|---------------|-----------|-------------|
| Sawn lumber joists | Inexpensive and easy to cut on site | Limited depth and span, with strict limits on notches and holes |
| I-joists | Light, uniform, and long spans | Flanges must not be cut, and web holes are limited |
| Open-web floor trusses | Longest spans, with room for ducts and pipes in the web | Cannot be field-cut and must be coordinated before delivery |

### Roof Framing

**Roof framing** is the structure that supports the roof covering and carries snow and wind loads to the walls. A roof may be framed on site with *rafters*, which are inclined members running from a ridge down to the wall, or with *trusses*, which are prefabricated triangulated frames (Chapter 6) delivered to the site. Trusses are typically spaced 24 in. on center and span farther with less lumber, which is why they dominate modern houses and small commercial buildings. A rafter system must be tied at its base by *ceiling joists* or a similar tie. Without one, the weight of the roof pushes the walls outward, as the truss example in Chapter 6 showed with its bottom chord.

*Roof pitch* describes the slope as the rise in inches for each 12 in. of horizontal run. A 6:12 roof rises 6 in. over a 12 in. run, an angle of about 26.6 degrees. Snow loads in Minnesota affect the framing size, and uplift from wind requires metal straps tying the roof to the wall studs.

**Worked example: rafter length.** A small storage building is 24 ft wide with a 6:12 gable roof and a 1 ft overhang. The horizontal run from the ridge to the end of the overhang is 12 ft + 1 ft = 13 ft, and the rise is \( 13 \times 6/12 = 6.5 \) ft. The rafter length is

\[ L = \sqrt{13^2 + 6.5^2} = 14.53\ \text{ft} \]

so the framers order 16 ft lumber, the next standard length, and cut off the surplus. The sloped roof area is \( 2 \times 14.53 \times 40 = 1{,}163 \) ft² for a 40 ft long building, or about 37 sheets of sheathing before waste. The Riverbend multipurpose room differs: its low-slope roof is framed with joists supported by glulam girders, as in Chapter 6.

## Structural Steel

**Structural steel** is steel, an alloy of iron with a small amount of carbon, that is rolled into shapes and fabricated for use as beams, columns, trusses, and braces. The common grades are ASTM A992 for wide-flange shapes, with a minimum yield strength of 50 ksi, and A36 for plates and angles, with a yield strength of 36 ksi, where a ksi is 1,000 psi. Steel is very strong and stiff, with a modulus of elasticity of about 29,000 ksi, roughly twenty times that of wood. It is also *ductile*, meaning it stretches considerably before it breaks, which gives warning before failure and helps it survive overloads and earthquakes.

Steel allows long spans, tall buildings, and rapid erection of prefabricated pieces. Its main weaknesses are that it loses strength at temperatures reached in a building fire, so it is usually protected by sprayed-on fireproofing, intumescent paint, or gypsum enclosures (Chapter 18), and that it corrodes without coatings. It also conducts heat, which makes it an effective thermal bridge.

**Worked example: a steel rod versus a wood post in tension.** Suppose a member must carry a 16-kip pull, the girder reaction of Chapter 6. Using a simple allowable stress of 0.6 times the yield strength, steel with \( F_y = 50 \) ksi has an allowable stress of 30 ksi, so the area needed is \( 16 / 30 = 0.53 \) in². A round rod of that area is 0.82 in. in diameter and weighs about 1.8 lb per foot. A sawn wood member in tension along the grain, with an illustrative allowable stress of 500 psi, needs \( 16{,}000 / 500 = 32 \) in², which is about sixty times the area. This strength in a small cross-section is why steel is used for slender braces, cables, and long-span members.

### Steel Shapes

**Steel shapes** are the standard cross-sections into which structural steel is rolled, each named by a letter and dimensions. The most important is the *wide-flange* (W) shape, shaped like the letter I, which puts most of its material in two flanges far from the center where bending stress is highest. The table lists the main shapes.

| Shape | Designation example | Cross-section | Typical use |
|-------|---------------------|---------------|-------------|
| Wide-flange | W12×26 | I with wide flanges | Beams and columns |
| Channel | C10×15.3 | C | Edge members, framing around openings |
| Angle | L4×4×½ | L | Braces, lintels over openings |
| Hollow structural section (HSS) | HSS6×6×¼ | Rectangular or round tube | Columns and braces, exposed frames |
| Plate and bar | PL½×12 | Flat rectangle | Connection plates, base plates |

!!! mascot-tip "Decode the Shape Name"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A W12×26 is a wide-flange shape about 12 in. deep that weighs 26 lb per foot. Multiply the weight per foot by the length and you have the dead load of a beam in seconds, such as \( 26 \times 20 = 520 \) lb for a 20 ft piece.

#### Diagram: Steel Shape Comparison Explorer


<iframe src="../../sims/steel-shape-comparison-explorer/main.html" width="100%" height="592px" scrolling="no"></iframe>
[Run Steel Shape Comparison Explorer Fullscreen](../../sims/steel-shape-comparison-explorer/main.html)

<details markdown="1">
<summary>Steel Shape Comparison Explorer</summary>
Type: microsim
**sim-id:** steel-shape-comparison-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) the stiffness, weight, and efficiency of rectangular, wide-flange, and tube cross-sections of equal area, and will explain (Bloom Level 2, Understand) why material far from the neutral axis resists bending most effectively.

Visual: Side-by-side drawings of a solid rectangle, a wide-flange I, and a hollow rectangular tube, each with a dashed neutral axis, drawn to scale. Beneath each shape, a bar shows the computed moment of inertia, and a small beam diagram shows the deflection under the same load. The canvas follows the container width with a height of 480 px.

Controls: A slider labeled "Cross-sectional area (in²)" (4 to 20) holds the area equal across the three shapes. A slider labeled "Depth (in.)" (4 to 24) changes the depth, and a slider labeled "Flange thickness" changes the I and tube proportions. A drop-down labeled "Orientation" lets the student rotate a rectangular beam between flat and on edge.

Interactions: Dragging the sliders redraws the shapes and updates \( I \), weight per foot, and deflection. Hovering over a shape shows a stress diagram with tension above and compression below, shaded in color intensity. Clicking a shape opens an infobox with the designation, typical use, and a one-sentence explanation of why it performs as it does. A "Match the shape" quiz mode names a use, such as a column or a long-span beam, and asks the student to select the shape.

Colors: Material is steel gray, tension stress is blue, and compression stress is red. All stresses are also labeled with plus and minus symbols.

Implementation: p5.js with DOM sliders and a drop-down, and a responsive canvas.
</details>

### Bolted Connections

**Bolted connections** join steel members by passing high-strength bolts through aligned holes in overlapping plates or angles and tightening them with a nut. Because bolts can be installed in the field with ordinary wrenches, regardless of weather, they are the common choice for connections made on site. In a *bearing-type* connection, the bolts are tightened snug and the load passes from one plate to the other as the bolt shank presses against the sides of the hole. In a *slip-critical* connection, the bolts are tightened to a specified high tension, so the plates are clamped together and friction carries the load without any slip. Holes are made slightly larger than the bolts to allow for erection tolerance. Typical structural bolts are in the A325 and A490 grades, now consolidated in ASTM F3125, and an inspector verifies the tightening procedure.

### Welded Connections

**Welded connections** join steel members by melting the edges of the metal together with a filler metal, so that the joint becomes continuous steel. The two basic types are the *fillet weld*, a triangular bead placed in the corner between two surfaces, and the *groove weld*, which fills a prepared gap between the members' edges, often with complete penetration. Welds are made mostly in the fabricator's shop, where conditions are controlled, and the pieces are then bolted together on site. Field welding is used when a rigid connection is needed, as in a moment frame, and requires qualified welders and inspection by visual or ultrasonic methods. Cold weather matters: cold steel is typically preheated before welding, to avoid cracking in the weld. The American Welding Society's structural welding code is the governing standard.

### Steel Decking

**Steel decking** is corrugated sheet steel that spans between joists or beams to form the roof or floor surface. Roof deck is typically about 1½ in. deep and spans a few feet to several, carrying the roofing, insulation, and loads to the supporting joists. *Composite floor deck* has a deeper profile with embossments, and a concrete topping poured on it bonds to the steel so that the two act together as a floor slab (Chapter 8). Fastened to its supports by welds or screws, the deck also acts as the horizontal diaphragm of Chapter 6, carrying wind and seismic forces to the braced frames or shear walls.

### Light-Gauge Steel Framing

**Light-gauge steel framing** is a system of studs, joists, and track formed by cold-bending thin sheet steel into C-shapes and U-shapes, in the same arrangement as wood framing. Thickness is described by *gauge*, in which a higher number is a thinner sheet, or in mils, where a mil is one thousandth of an inch. The members are screwed together. Light-gauge framing does not burn, rot, shrink, or attract termites, and the members are straight and uniform, so it is common for interior partitions in commercial buildings and as backup framing for exterior walls. It does have a thermal weakness: steel conducts heat several hundred times as readily as wood, so a stud wall filled only with cavity insulation loses a large part of its effectiveness, and cold climates need a layer of continuous insulation outside the framing (Chapter 11).

!!! mascot-celebration "You Know What's Inside the Walls"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now read a lumber stamp and calculate with actual sizes, explain how moisture content drives shrinkage, name what makes glulam, CLT, plywood, and I-joists different, follow a platform-framed building from sill to rafter, and decode a steel shape and its connections. That is the working vocabulary for walking any framing job.

## Key Takeaways

- Wood is anisotropic: strong along the grain and weak across it. Grade, species, and moisture content determine its design values, and structural calculations always use actual rather than nominal dimensions.
- Wood moisture content is measured against oven-dry weight. Wood shrinks below the fiber saturation point of about 28 to 30 percent, and moisture above about 20 percent over time can lead to decay, so framing must be dry before it is enclosed.
- Engineered wood products, including plywood, OSB, LVL, I-joists, glulam, and CLT, reassemble wood into larger and more consistent members that make better use of the material.
- Light-frame wood construction relies on closely spaced studs, joists, and rafters or trusses covered with sheathing, which provides redundancy and diaphragm and shear wall action.
- Platform framing builds each floor as a platform for the walls above it. It stops fire spread between floors but accumulates across-grain shrinkage.
- Headers carry loads around openings, floor systems are usually controlled by stiffness, and roof framing is either rafters tied at the base or prefabricated trusses.
- Structural steel is strong, stiff, and ductile, but it needs fire protection and corrosion protection, and it conducts heat.
- Steel shapes such as the W shape place material far from the neutral axis, and steel members are joined by bolts, mostly in the field, or by welds, mostly in the shop.
- Steel decking forms roof and composite floor surfaces and acts as a diaphragm, and light-gauge steel framing is a non-combustible alternative to wood framing that needs continuous insulation in cold climates.
