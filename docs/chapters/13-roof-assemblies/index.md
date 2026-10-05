---
title: Roof Assemblies
description: How steep-slope and low-slope roofs shed water, drain, ventilate, and resist ice dams, including metal, membrane, and green roof systems.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:52:50
version: 1.10
---

# Roof Assemblies

## Summary

How low-slope and steep-slope roofs shed water, drain, ventilate, and resist ice dams, including green roofs. It builds on the prerequisite concepts from Chapters 3, 4, 7, 11. After completing this chapter, students will be able to define, explain, and apply the 10 concepts listed below.

## Concepts Covered

This chapter covers the following 10 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Roof Assemblies | 13 |
| Steep-Slope Roofs | 5 |
| Low-Slope Roofs | 4 |
| Roof Drainage | 3 |
| Roofing Membranes | 2 |
| Attic Ventilation | 2 |
| Shingles | 1 |
| Metal Roofing | 1 |
| Ice Dams | 1 |
| Green Roofs | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 7: Wood and Steel Framing](../07-wood-steel-framing/index.md)
- [Chapter 11: Enclosure Control Layers and Insulation](../11-enclosure-insulation/index.md)

---

!!! mascot-welcome "The Hardest-Working Surface on the Building"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The roof takes the sun, the wind, the snow load, and every storm first, and it has to keep all of it out for decades. Once you understand how a roof sheds water and manages heat, you can read a roof section and spot the detail that will leak before it does. Let's build it right!

A roof is the part of the building enclosure that faces the harshest conditions and is hardest to repair once it fails. Chapter 11 described the four control layers that every enclosure needs: water, air, vapor, and heat. This chapter applies those layers overhead, where gravity pulls water toward every joint, snow adds weight, and warm indoor air rises directly into the assembly. In Minneapolis, where winter lasts for months and snow can sit on a roof through repeated freeze-thaw cycles, getting the roof right is a matter of both comfort and durability.

## Roof Assemblies

A **roof assembly** is the complete stack of materials, from the structural deck to the weathering surface, that together keep water out, control heat, air, and vapor, and carry loads to the walls below. A shingle or a membrane does not keep a building dry by itself, and a leak almost always traces to a joint between layers rather than to the middle of a material.

Every roof assembly performs the same six jobs, regardless of its type:

- **Shed or drain water.** Rain and melting snow must leave the roof quickly, by slope, by drains, or both.
- **Carry loads.** The structure resists the weight of the assembly (dead load), snow and rain (Chapter 6), and wind uplift, which tries to peel the roof off.
- **Control heat.** Insulation limits winter heat loss and summer heat gain, following the heat-flow principles of Chapter 3.
- **Control air and vapor.** An air barrier and, in cold climates, a vapor retarder keep warm, moist indoor air from condensing inside the assembly (Chapter 4).
- **Resist fire.** Roof coverings are tested for fire exposure from outside and rated Class A, B, or C, with Class A giving the best resistance.
- **Last.** The covering must withstand ultraviolet light, temperature swings, hail, and foot traffic.

Roofs fall into two families defined by slope, and the slope drives almost every other decision. **Steep-slope roofs** shed water by gravity over overlapping units, so the layers are discontinuous. **Low-slope roofs** hold a continuous waterproof membrane, so the layers are sealed into one sheet. The table below compares the two stacks, listed from the structure outward. Each term in the table is defined later in this chapter.

| Layer | Steep-slope (shingle) roof | Low-slope (membrane) roof |
|-------|----------------------------|---------------------------|
| Structure | Wood rafters or trusses | Steel deck, wood panels, or concrete |
| Deck | Wood sheathing | The structural deck |
| Air/vapor control | Ceiling air barrier at attic floor | Vapor retarder or air barrier over the deck |
| Insulation | Batts or blown-in on the attic floor | Rigid board above the deck |
| Water control | Underlayment, ice barrier at eaves | Continuous membrane |
| Covering | Shingles or metal panels | Membrane is the covering |

**Worked example: reading a roof section from the inside out.** A Minneapolis house has a ventilated attic with R-49 of blown insulation on the ceiling. Starting at the room, the layers are drywall, a sealed air barrier at the ceiling plane, the insulation, the open attic air space, roof trusses, plywood sheathing, a synthetic underlayment, and asphalt shingles. Heat flows upward through the insulation, and the attic stays near outdoor temperature because it is ventilated. Water flows down and out over the shingles. Air that leaks upward through ceiling penetrations carries moisture into the attic, which is why the air barrier sits at the ceiling and not at the roof. The insulation controls heat and the covering controls only water, a division of labor that is the key to reading any roof section.

#### Diagram: Roof Assembly Layer Explorer

<details markdown="1">
<summary>Roof Assembly Layer Explorer</summary>
Type: infographic
**sim-id:** roof-assembly-layer-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) each layer of a steep-slope and a low-slope roof assembly and will explain (Bloom Level 2, Understand) which of the four control layers (water, air, vapor, heat) each layer provides.

Visual: A cross-section drawing of a roof from interior ceiling to exterior surface, drawn to a distorted but proportional thickness so every layer is legible. A tab control labeled "Steep-slope attic roof" and "Low-slope membrane roof" switches between the two stacks. Each layer is a labeled, color-coded band. On the right, a four-icon legend shows water, air, vapor, and heat control.

Interactions: Hovering over a layer highlights it and shows a tooltip with its name. Clicking a layer opens an infobox with its function, the control layer(s) it provides, and one common failure (for example, "underlayment: torn at eave, allows wind-driven water"). A toggle labeled "Show heat flow" draws arrows from interior to exterior through the insulation and shows temperature labels in winter. A toggle labeled "Show water path" animates a raindrop along the shortest route over or through the assembly. A "Remove this layer" button on each infobox grays out the layer and displays the consequence in a status line, so students can see what each layer protects against.

Colors: Structure in brown, insulation in yellow, membrane and underlayment in dark gray, covering in the color of the selected roof type. Colors are paired with patterns so the diagram works without color.

Responsive design: The canvas width follows the container and redraws on window resize. Height is 460 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createButton and createCheckbox controls, and an infobox drawn in a div beneath the canvas.
</details>

## Steep-Slope Roofs

A **steep-slope roof** is a roof pitched steeply enough that water runs off by gravity over overlapping layers of covering, with no continuous sealed surface. Slope is stated as *rise over run*, the vertical rise in inches for every 12 inches of horizontal run. A 6:12 roof (read "six in twelve") rises 6 inches over each 12 inches of run, which is an angle of about 27 degrees. Building codes and manufacturers commonly treat roofs steeper than about 3:12 as steep-slope, and each covering has its own minimum slope. Asphalt shingles, for example, are commonly allowed down to 2:12, with special underlayment required between 2:12 and 4:12, so the 3:12 line is a rule of thumb for the general case and the manufacturer's minimum governs for each product.

The shape of a steep-slope roof, usually a gable or a hip, also creates the attic space discussed under Attic Ventilation. Steep slopes shed water and snow efficiently, and they are the typical choice for houses and for many small commercial buildings.

**Worked example: area and material quantity.** A house is 28 ft wide and 40 ft long with a 6:12 gable roof whose ridge runs along the 40 ft length. Each side of the roof spans a horizontal run of 14 ft. The rise is \( 14 \times 6/12 = 7 \) ft, so each rafter slopes along a length of \( \sqrt{14^2 + 7^2} \approx 15.65 \) ft, ignoring the overhang. The two roof planes then total \( 2 \times 15.65 \times 40 \approx 1{,}252 \) ft². Roofers measure area in *squares*, where one square is 100 ft², so the roof is about 12.5 squares. Adding about 10 percent for waste at hips, valleys, and cut ends gives roughly 13.8 squares, so the buyer orders 14. Note that the sloped area is larger than the 1,120 ft² floor footprint by the factor \( \sqrt{12^2 + 6^2}/12 \approx 1.118 \), which is why estimating from a floor plan alone under-counts material.

!!! mascot-tip "Beau's Tip: The Slope Factor"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    To get roof area quickly from a plan, multiply the footprint by the slope factor: about 1.03 for 3:12, 1.12 for 6:12, and 1.41 for 12:12. Then add 10 percent for waste before you order.

### Shingles

**Shingles** are small, overlapping units of roof covering laid in courses from the eave upward so that each course sheds water over the joint beneath it. The most common type in North America is the asphalt shingle, made from a fiberglass mat saturated with asphalt and topped with ceramic-coated mineral granules that protect against sunlight and give color. Wood shakes, slate, and clay or concrete tile follow the same overlap principle.

Shingles are not waterproof as a surface. They shed water, and the layers beneath them provide the backup. In a cold climate the system typically includes a *drip edge* at the eaves and rakes, a self-adhering waterproof underlayment along the eaves to resist ice dams, a synthetic or felt underlayment over the rest of the deck, and *flashing* (thin metal or membrane that directs water around joints) at valleys, chimneys, walls, and penetrations. Most roof leaks start at flashing rather than at the shingle field. Asphalt shingles commonly last roughly 20 to 30 years, depending on climate, ventilation, and quality, and they are sold with ratings for wind resistance and for fire class.

### Metal Roofing

**Metal roofing** is a steep-slope covering made of formed steel, aluminum, copper, or zinc panels that run from ridge to eave. The two common systems are *standing seam*, in which adjacent panels interlock with raised seams and are held by concealed clips, and *exposed-fastener* panels, in which screws with sealing washers pass through the face of the panel. Standing seam costs more but avoids the fasteners that eventually loosen and leak. Metal roofs commonly last 40 years or more and shed snow readily.

Two properties of metal matter in design. First, metal expands and contracts with temperature (Chapter 5), so panels must be free to slide on their clips. Steel expands about 0.0000065 inch per inch per degree Fahrenheit, so a 20 ft steel panel that sees a 100 degree temperature swing changes in length by \( 0.0000065 \times 240 \times 100 \approx 0.16 \) inch; aluminum changes about twice as much. Second, snow can slide off a smooth metal roof suddenly, endangering people and damaging items below, so cold-climate designers commonly add snow guards above entrances and walkways.

## Low-Slope Roofs

A **low-slope roof** is a roof so shallow, commonly below about 3:12 and often nearly flat, that water cannot be trusted to run off over overlapping units and must be kept out by a continuous waterproof membrane. Most commercial, institutional, and industrial buildings have low-slope roofs because they cover large rectangular areas economically and provide a place for rooftop mechanical equipment. A low-slope roof is not flat. Designers slope the surface, commonly at least one-quarter inch per foot (about 2 percent), toward drains so that water does not stand.

The most common cold-climate arrangement places the **insulation above the structural deck** and the membrane on top of the insulation. Rigid foam boards, such as polyisocyanurate, are laid in layers with staggered joints, covered by a *cover board* that protects the foam and gives the membrane a firm base. Because the insulation is continuous and sits outside the structure, it limits thermal bridging and keeps the deck warm, which reduces condensation risk. In a *protected membrane* (or inverted) roof, the insulation sits above the membrane and is held down by ballast or pavers, which shields the membrane from temperature swings and damage.

The slope often comes from the insulation rather than the structure. Manufacturers supply *tapered insulation*, boards cut with a slope so that a structurally level deck can still drain.

**Worked example: tapered insulation and heat loss.** Assume for illustration that the designers of the Riverbend Youth Center (about 9,000 ft² on one story) choose a low-slope roof with the roof plan area equal to the floor area. Drains sit in valleys, and the longest distance from a high point to a drain is 30 ft. At a quarter inch per foot, the tapered insulation must change in thickness by \( 30 \times 0.25 = 7.5 \) inches over that distance, a quantity the designer must carry into the roof edge and parapet details. For heat loss, suppose two 3 in layers of polyisocyanurate at an illustrative R-5.7 per inch give a total of \( R = 2 \times 3 \times 5.7 = 34.2 \), using the average thickness for simplicity. The U-factor is \( 1/34.2 \approx 0.029 \) Btu/h·ft²·°F. With an indoor temperature of 70 °F and an outdoor temperature of 10 °F, the heat loss is \( Q = UA\Delta T = 0.029 \times 9{,}000 \times 60 \approx 15{,}800 \) Btu/h. The result is a quick check on whether the insulation level matches the energy code, which is the subject of Chapter 19.

### Roofing Membranes

A **roofing membrane** is a continuous, flexible, waterproof sheet or built-up layer that forms the weathering surface of a low-slope roof. The main families are listed below.

- **EPDM** is a black synthetic rubber sheet with taped or adhesive seams. It is flexible in cold weather and has a long record of use.
- **TPO** (thermoplastic polyolefin) is a single-ply sheet, commonly white, whose seams are welded with hot air to form a continuous bond.
- **PVC** is also heat-welded and offers good chemical resistance, which suits roofs over restaurant kitchens.
- **Modified bitumen** is asphalt reinforced with polymers and fabric, installed in one or two plies by torch, adhesive, or self-adhering backing.
- **Built-up roofing** (BUR) alternates layers of reinforcing felts and hot bitumen, commonly topped with gravel.

A membrane is held in place by one of three methods. In a *fully adhered* system it is glued to the substrate, in a *mechanically attached* system it is fastened through the seams, and in a *ballasted* system it is held down by stone or pavers. The attachment method determines the roof's resistance to wind uplift. Most membrane failures occur at seams, penetrations, and edges, so seam quality and flashing details deserve as much attention as the membrane itself.

### Roof Drainage

**Roof drainage** is the system that collects water from the roof surface and carries it away from the building. On steep-slope roofs, gutters and downspouts do this job. On low-slope roofs, water flows to interior drains, to scuppers (openings through a parapet wall), or to edge gutters. Codes commonly require a *secondary* or overflow drain on a roof where a parapet could trap water if the primary drains clog, because a blocked drain loads the roof with the weight of standing water.

**Worked example: sizing the load of a clogged roof.** Rainfall is measured as an intensity in inches per hour. One inch of rain over one square foot is 0.623 gallons, so a roof must carry away about 0.0104 gallons per minute per square foot for each inch per hour of intensity. Assume the 9,000 ft² Riverbend roof and an illustrative design intensity of 3 inches per hour (the real value comes from the code and local rainfall data). The flow is \( 9{,}000 \times 3 \times 0.0104 \approx 280 \) gallons per minute, so four equal drains must each handle about 70 gpm. Now suppose all drains clog. Water weighs about 5.2 pounds per square foot for each inch of depth, so just 2 inches of ponding adds about 10.4 psf, or about 94,000 pounds over the whole roof. Ponding bends the deck, and the dip holds more water, a feedback loop that can lead to collapse. Structural engineers therefore check roofs for rain load (Chapter 6).

!!! mascot-warning "Watch Out: Ponding Is Progressive"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A roof that holds water deflects, and the deflection holds even more water. Always ask where the water goes if the primary drain clogs, and confirm that a secondary drain or scupper sits slightly higher to act as the safety valve.

#### Diagram: Roof Drainage and Ponding Calculator

<details markdown="1">
<summary>Roof Drainage and Ponding Calculator</summary>
Type: microsim
**sim-id:** roof-drainage-ponding-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the flow a roof drain must carry from roof area and rainfall intensity, and will predict (Bloom Level 2, Understand) how a clogged drain converts a rainfall into a standing-water load.

Visual: A plan view of a rectangular roof with four drain symbols and a side-section view below it showing the roof deck, the water surface, and a deflection curve exaggerated for visibility. A readout panel shows total flow in gallons per minute, flow per drain, and ponding load in pounds per square foot and in total pounds.

Controls: A slider for roof area (2,000 to 20,000 ft²), a slider for rainfall intensity (1 to 6 inches per hour), a selector for number of drains (2 to 8), and a checkbox for each drain labeled "Clogged." A checkbox labeled "Secondary overflow installed" adds a scupper at a set height, and a "Run storm for 30 minutes" button animates the water level.

Interactions: Changing any control updates the readouts immediately. When drains are clogged, the water depth in the side section rises with time. When depth reaches the scupper height and the overflow is installed, water spills out and the depth stops rising; with no overflow, the depth keeps rising and the deflection curve deepens, with a status line reading "Progressive ponding: deflection adds water, which adds deflection."

Colors: Roof in gray, water in blue, clogged drains in red with an X symbol, a depth gauge in black.

Responsive design: The canvas follows the container width and redraws on resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider, createSelect, createCheckbox, and createButton controls.
</details>

## Attic Ventilation

**Attic ventilation** is the intentional flow of outdoor air through the attic of a steep-slope roof, entering at low intake vents (soffits) and leaving at high exhaust vents (ridge or gable). It has two purposes. In winter it keeps the roof deck cold and carries away moisture that leaks up from the house. In summer it removes heat that builds up beneath a sun-heated roof. The airflow works best when it is balanced and continuous, with about half the vent area low and half high, because warm air rises and draws cool air in from below.

Model codes commonly set the net free vent area, meaning the open area after screens and louvers are subtracted, at 1 square foot for every 150 square feet of attic floor, and allow 1 for every 300 when the ceiling has a vapor retarder and the vents are split between high and low. As an example, an attic with 1,120 ft² of floor area at the 1:300 ratio needs about \( 1{,}120/300 \approx 3.7 \) ft², or 538 in², of net free area, split as roughly 269 in² at the soffit and 269 in² at the ridge. Insulation must never block the soffit vents, and *baffles* (rigid channels at each rafter bay) keep an air path open above the insulation.

## Ice Dams

An **ice dam** is a ridge of ice that forms at the eave of a sloped roof and traps meltwater behind it. The cause is heat escaping from the house. Warm air and conducted heat raise the temperature of the roof deck above freezing, so snow melts from beneath. The meltwater flows down the roof until it reaches the eave, which overhangs the exterior wall and stays cold. There the water refreezes, builds a dam, and the water behind it backs up under the shingles and into the building.

The cure targets the heat source, not the ice. In priority order, the remedies are to air seal the ceiling plane so warm air stops entering the attic, to add insulation, to ventilate the attic so the deck stays near outdoor temperature, and to install a self-adhering ice-and-water barrier at the eaves as a backup. Heating cables can melt channels through ice, but they add cost and do nothing about the underlying heat loss.

#### Diagram: Ice Dam Formation Explorer

<details markdown="1">
<summary>Ice Dam Formation Explorer</summary>
Type: microsim
**sim-id:** ice-dam-formation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how ceiling air leakage, insulation level, and attic ventilation combine to produce or prevent an ice dam on a Minnesota roof.

Visual: A side section of a house eave and attic with a snow layer on the roof. Color shading shows temperature, from warm orange near the ceiling to cool blue at the soffit. Arrows show heat flow and air movement. Ice appears at the eave when conditions allow it.

Controls: A slider for outdoor temperature (-20 to 30 °F), a slider for insulation R-value (R-19 to R-60), a checkbox "Air leaks at ceiling," a checkbox "Soffit and ridge vents open," and a checkbox "Ice-and-water barrier at eave."

Interactions: As controls change, the roof deck temperature updates and snow melts on the part of the roof above 32 °F. Meltwater flows to the eave and freezes if the overhang is below 32 °F. A readout says "Ice dam: forming, minor, or none" and a second readout says "Water reaching interior: yes or no." The first fix suggested by the status line is always air sealing, and the ice-and-water barrier checkbox shows that it protects the interior but does not stop the dam from forming.

Colors: Temperature gradient from blue through white to orange, ice in pale cyan with an outline, water drops in blue.

Responsive design: The canvas follows the container width and redraws on resize. Height is 460 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createCheckbox controls, and a simple steady-state temperature calculation for the deck.
</details>

!!! mascot-thinking "Seal First, Then Ventilate"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that ventilation is the third remedy, not the first. Ventilation only dilutes heat that has already escaped, while air sealing and insulation stop the heat from escaping at all, so fix the source before the symptom.

## Green Roofs

A **green roof** is a roof assembly topped with a layer of living vegetation grown in a lightweight soil called growing medium. Beneath the plants the stack typically includes a filter fabric, a drainage layer that moves excess water to the drains, a root barrier that protects the membrane from penetrating roots, the waterproofing membrane, insulation, and the deck. The green layer does not replace the membrane. It sits on top and protects it from sunlight and temperature swings.

*Extensive* green roofs use a thin medium, commonly 3 to 6 inches, planted with hardy sedums and grasses that need little care. *Intensive* green roofs use deeper soil and can support shrubs, small trees, and walkable gardens, but they weigh much more and need irrigation. Benefits include reduced stormwater runoff, lower roof surface temperatures, and extended membrane life. The main design constraint is weight.

As an illustration, a 4 in layer of growing medium at a saturated density of 90 pounds per cubic foot adds \( (4/12) \times 90 = 30 \) psf before the drainage layer and plants are counted. That load is comparable to or larger than the entire dead load of an ordinary roof, so the structural engineer must design for it from the start, and it is rarely practical to add a green roof to a roof that was not designed for one.

!!! mascot-celebration "You Can Read a Roof Section"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now trace the layers of a steep-slope and a low-slope roof, size the water load on a roof drain, calculate attic vent area, and explain why air sealing comes before ventilation in stopping ice dams. That is the vocabulary a roofer, an architect, and an inspector all use.

## Key Takeaways

- A roof assembly is a system of layers, not a single material. Most failures occur at the joints between layers, at flashing, and at penetrations.
- Steep-slope roofs shed water by gravity over overlapping units such as shingles and metal panels. Low-slope roofs rely on a continuous membrane and a slight slope toward drains.
- Slope is stated as rise per 12 inches of run. Sloped roof area equals footprint multiplied by a slope factor, which is about 1.12 for a 6:12 roof.
- Asphalt shingles shed water and depend on underlayment and flashing. Metal roofs must be free to expand and often need snow guards.
- Low-slope roofs commonly place continuous insulation above the deck, with a membrane such as EPDM, TPO, PVC, modified bitumen, or built-up roofing on top.
- Roof drains must carry the design rainfall, and a secondary overflow protects the structure, because standing water weighs about 5.2 psf per inch of depth.
- Attic ventilation keeps the deck cold in winter and relieves heat in summer. Balanced intake and exhaust at about 1:300 of attic floor area is a common code ratio.
- Ice dams result from heat loss through the ceiling. Air seal and insulate first, ventilate second, and add an ice-and-water barrier as a backup.
- Green roofs add vegetation above the membrane and add significant weight, so the structure must be designed for them from the start.

[See Annotated References](./references.md)
