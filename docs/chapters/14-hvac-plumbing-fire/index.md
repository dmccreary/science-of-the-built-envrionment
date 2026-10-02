---
title: HVAC, Plumbing, and Fire Protection Systems
description: How heating, cooling, ventilation, plumbing, and fire protection systems are organized, sized, and coordinated with the building enclosure and structure.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:57:37
version: 1.10
---

# HVAC, Plumbing, and Fire Protection Systems

## Summary

The heating, cooling, ventilation, plumbing, and fire protection systems that make a building habitable and safe. It builds on the prerequisite concepts from Chapters 1, 3, 4, 5, 9, 10, 13. After completing this chapter, students will be able to define, explain, and apply the 25 concepts listed below.

## Concepts Covered

This chapter covers the following 25 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| HVAC Systems | 24 |
| Plumbing Systems | 11 |
| Fire Protection | 11 |
| Ventilation | 9 |
| Heating Systems | 5 |
| Water Supply | 5 |
| Cooling Systems | 3 |
| Mechanical Ventilation | 3 |
| Drain-Waste-Vent System | 3 |
| Ductwork | 2 |
| Heat Recovery Ventilator | 2 |
| Indoor Air Quality | 2 |
| Plumbing Fixtures | 2 |
| Radon Mitigation | 1 |
| Furnace | 1 |
| Boiler | 1 |
| Heat Pump | 1 |
| Air Conditioning | 1 |
| Air Distribution | 1 |
| Radiant Heating | 1 |
| Heating and Cooling Loads | 1 |
| Water Heating | 1 |
| Stormwater Management | 1 |
| Sprinkler Systems | 1 |
| Smoke Control | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 4: Moisture, Air Movement, and Thermal Comfort](../04-moisture-air-comfort/index.md)
- [Chapter 5: Properties of Building Materials](../05-material-properties/index.md)
- [Chapter 9: Site Work, Soils, and Groundwater](../09-site-soils/index.md)
- [Chapter 10: Foundation Systems](../10-foundation-systems/index.md)
- [Chapter 13: Roof Assemblies](../13-roof-assemblies/index.md)

---

!!! mascot-welcome "The Systems Behind the Walls"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A building that stands up is only half a building. The other half keeps the air fresh, the water running, the temperature comfortable, and a fire from becoming a tragedy. By the end of this chapter you will be able to look at a mechanical room or a ceiling full of pipes and know what each system does and why it is there. Let's build it right!

Chapter 1 described a building as something that supports, separates, serves, and protects. The structure supports, and the enclosure separates. This chapter covers the systems that *serve* and the system that protects occupants when something goes wrong: heating, ventilating, and air-conditioning (HVAC); plumbing; and fire protection. Together with the electrical systems of Chapters 15 and 16, they are called the *building systems*, and the engineers who design them must fit them into the space the architect and structural engineer leave behind.

The running example is again the Riverbend Youth Center from Chapter 2, a one-story, roughly 9,000 ft² building in Minneapolis with a multipurpose room and three 600 ft² classrooms. All quantities for Riverbend are illustrative, chosen to make the arithmetic clear.

## HVAC Systems

An **HVAC system** (heating, ventilating, and air-conditioning) is the set of equipment, pipes, ducts, and controls that maintains the indoor temperature, humidity, and air quality within a range occupants find comfortable and healthy. The three functions in the name are separate jobs. *Heating* adds heat when the building loses more than it gains. *Cooling* removes heat when the building gains more than it loses. *Ventilation* replaces stale indoor air with outdoor air. Most HVAC systems are built from four parts, which are listed below.

- **A source** that produces heat or cooling, such as a furnace, a boiler, a heat pump, or a chiller.
- **A distribution system** that carries the heat or cooling to the rooms, either through ducts (air) or pipes (water).
- **Terminal devices** that deliver it to the space, such as supply diffusers, radiators, or radiant floor loops.
- **Controls** such as thermostats and building automation, which switch the equipment on and off to hold the target conditions.

The key idea is that HVAC is a *response* to the building. The enclosure designed in Chapters 11 and 12 decides how much heating or cooling the building needs, and the HVAC system supplies it. A better enclosure means smaller equipment, smaller ducts, and a lower energy bill for the life of the building.

**Worked example: how much air does a classroom need for heating?** A heated space is warmed by supplying air hotter than the room. The heat carried by moving air depends on airflow in cubic feet per minute (cfm) and the temperature difference between supply air and room air. For ordinary air, the *sensible* heat (heat that changes temperature but not humidity) is

\[ Q = 1.08 \times \text{cfm} \times \Delta T \]

where \( Q \) is in Btu per hour and \( \Delta T \) is in degrees Fahrenheit. The constant 1.08 comes from multiplying air density (0.075 lb/ft³), 60 minutes per hour, and the specific heat of air (0.24 Btu/lb·°F). Suppose one 600 ft² Riverbend classroom has an illustrative design heating load of 8,000 Btu/h and the system supplies air at 100 °F to a room held at 70 °F. Then \( \Delta T = 30 \) °F and

\[ \text{cfm} = \frac{8{,}000}{1.08 \times 30} \approx 247 \text{ cfm} \]

The fresh air this classroom needs for ventilation, calculated later in this chapter, is larger than that. In winter, the system must therefore heat more outdoor air than the walls alone would require, a result that explains why ventilation is such a large part of heating load in a cold climate.

!!! mascot-tip "Beau's Tip: Memorize 1.08"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    The formula \( Q = 1.08 \times \text{cfm} \times \Delta T \) lets you sanity-check any duct or heater in seconds. If a drawing says 1,000 cfm of air is heated by 30 degrees, you should expect about 32,000 Btu/h. If the equipment on the schedule is far from that, ask why.

#### Diagram: Heating Load and Ventilation Explorer

<details markdown="1">
<summary>Heating Load and Ventilation Explorer</summary>
Type: microsim
**sim-id:** hvac-heating-load-ventilation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the heating load of a room from envelope conduction and outdoor-air ventilation, and will compare (Bloom Level 4, Analyze) how enclosure quality and heat recovery change the total.

Visual: A cutaway of a 600 ft² classroom with wall, window, and roof areas labeled. Arrows show conduction heat loss through each surface and a separate large arrow shows heat lost with ventilation air. A stacked bar to the right shows the total load divided into walls, windows, roof, and ventilation, with a numeric readout in Btu/h and in tons of equivalent capacity.

Controls: Sliders for outdoor temperature (-20 to 40 °F), wall U-factor (0.03 to 0.30), window U-factor (0.15 to 0.60), roof U-factor (0.02 to 0.10), number of occupants (5 to 40), and heat recovery effectiveness (0 to 85 percent). A checkbox labeled "Add heat recovery ventilator" enables the last slider. A button labeled "Reset to Minneapolis design day" restores the default values.

Interactions: Changing any slider updates the arrows, the stacked bar, and the readouts immediately. Hovering over any arrow or bar segment shows a tooltip with the calculation (for example, "Walls: U x A x delta T = 0.05 x 400 x 70 = 1,400 Btu/h"). The status line states which component dominates at the current settings.

Colors: Walls in brown, windows in light blue, roof in gray, ventilation in orange. Segments also carry text labels for readability without color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider, createCheckbox, and createButton controls, created before any positioning function runs.
</details>

### Heating and Cooling Loads

The **heating and cooling loads** are the rates, in Btu per hour, at which heat must be added to or removed from a building to hold the indoor design conditions under the worst expected outdoor conditions. Equipment is sized from loads, never the other way around. A heating load has two main parts. *Conduction* loss is heat passing through the enclosure, which Chapter 3 gave as \( Q = U \times A \times \Delta T \). *Infiltration and ventilation* loss is heat carried away by air that leaks out or is deliberately exhausted and replaced.

A cooling load adds the heat from sunlight through windows, from occupants, lights, and equipment (*internal gains*), and the moisture that must be removed to control humidity. Cooling capacity is commonly stated in *tons*, where one ton equals 12,000 Btu/h. Methods such as ACCA Manual J for houses and ASHRAE procedures for larger buildings turn drawings into loads.

As a quick example, 3,000 ft² of net exterior wall at an illustrative U-factor of 0.05 Btu/h·ft²·°F, with a 70 °F difference between 70 °F indoors and 0 °F outdoors, loses \( 0.05 \times 3{,}000 \times 70 = 10{,}500 \) Btu/h.

!!! mascot-warning "Watch Out: Bigger Is Not Safer"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Adding a "safety factor" to equipment size is a common instinct, and it backfires. An oversized air conditioner cools the room quickly, shuts off, and never runs long enough to remove humidity, so the space feels clammy. Calculate the load first and select equipment close to it.

## Heating Systems

A **heating system** is the source and distribution equipment that adds heat to a building when outdoor conditions would otherwise let it cool below comfort. Minnesota buildings spend most of their energy on heating, so this choice has a long financial tail. Heating systems differ in how they make heat, which fuel or energy source they use, and how they deliver heat to the rooms.

Efficiency is stated differently for each type. Combustion equipment is rated by *AFUE* (annual fuel utilization efficiency), the fraction of fuel energy that becomes useful heat over a season. A heat pump is rated by its *coefficient of performance* (COP), the ratio of heat delivered to electrical energy used. A COP of 3 means three units of heat for each unit of electricity, which is possible because the heat pump moves heat that already exists rather than creating it.

**Worked example: input energy for 80,000 Btu/h of heat.** Suppose a building needs 80,000 Btu/h of heat delivered to the rooms. An 80 percent AFUE furnace needs fuel input of \( 80{,}000/0.80 = 100{,}000 \) Btu/h. A 95 percent condensing furnace needs \( 80{,}000/0.95 \approx 84{,}200 \) Btu/h. To compare with electricity, convert using 1 kW = 3,412 Btu/h, so 80,000 Btu/h is \( 80{,}000/3{,}412 \approx 23.4 \) kW of heat. Electric resistance heating converts each kilowatt of electricity into one kilowatt of heat, so it draws 23.4 kW. A heat pump at COP 3 draws \( 23.4/3 \approx 7.8 \) kW, and at a colder-weather COP of 2 it draws about 11.7 kW. The heat pump uses a third to a half as much electricity because it moves heat, but its COP falls as the outdoor temperature falls, which is why cold-climate models and sizing matter in Minnesota.

The table below summarizes the four main heating types that the following subsections define.

| Type | Heat source | Delivers heat by | Typical cold-climate note |
|------|-------------|------------------|---------------------------|
| Furnace | Combustion or electric element | Warm air through ducts | Common in houses and small buildings |
| Boiler | Combustion or electric element | Hot water or steam through pipes | Pairs with radiators or radiant floors |
| Heat pump | Electricity moving heat | Warm air or water | Use models rated for low outdoor temperatures |
| Radiant system | Hot water or electric elements | Warm surfaces | Comfortable at lower air temperatures |

#### Diagram: Heating System Energy Comparison

<details markdown="1">
<summary>Heating System Energy Comparison</summary>
Type: chart
**sim-id:** heating-system-energy-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) the energy input needed by an 80 percent furnace, a 95 percent furnace, electric resistance, and a heat pump to deliver the same heat, and will explain (Bloom Level 2, Understand) why heat pump COP changes with outdoor temperature.

Visual: A horizontal bar chart showing input energy in kW-equivalent for four systems delivering the same heat. A line chart to the right plots heat pump COP against outdoor temperature from -20 to 60 °F, using an illustrative curve labeled as such.

Controls: A slider for required heat output (20,000 to 200,000 Btu/h) and a slider for outdoor temperature (-20 to 60 °F). A drop-down selects the heat pump type, either "standard air-source" or "cold-climate air-source," each with its own illustrative COP curve.

Interactions: Moving the sliders updates the bars and the COP marker on the curve. Hovering over any bar shows the input energy, the efficiency used, and a one-sentence explanation of how the system makes heat. A status line reports when the heat pump input exceeds the 95 percent furnace input for the selected temperature, with the message "Heat pump COP has fallen below the break-even point for equal energy."

Colors: Furnaces in orange, resistance in red, heat pump in blue; bars have pattern fills so the chart reads without color.

Responsive design: The charts follow the container width and redraw on resize. Height is 420 px.

Implementation: Chart.js bar and line charts with custom tooltip callbacks and slider-driven data updates.
</details>

### Furnace

A **furnace** is a heating appliance that warms air and distributes it through ducts. Most furnaces burn natural gas, propane, or oil in a combustion chamber, pass the hot gases through a heat exchanger (a metal surface that transfers heat without mixing combustion gases with room air), and use a blower to push household air over that exchanger. High-efficiency *condensing* furnaces extract so much heat that the exhaust gases cool enough to form water, so they vent through plastic pipe and must drain condensate. Because combustion produces carbon monoxide, furnaces require a proper vent and combustion air supply, and carbon monoxide alarms are commonly required near sleeping areas. Electric furnaces use resistance elements and need no vent.

### Boiler

A **boiler** is a heating appliance that heats water, or in older systems makes steam, and sends it through pipes to terminal devices such as radiators, baseboards, and radiant floor loops. This pipe-based approach is called *hydronic* heating. Water holds far more heat per volume than air, so small pipes carry what would require large ducts. Boilers are common in cold-climate schools, hospitals, and apartment buildings, and they allow zoning with pumps and valves. Like furnaces, gas boilers need venting and combustion air, and condensing boilers reach their best efficiency when return water is cool, which pairs well with low-temperature radiant systems.

### Heat Pump

A **heat pump** is a device that uses a refrigeration cycle to move heat from a cooler place to a warmer one, and it can be reversed to provide either heating or cooling. In heating mode it extracts heat from outdoor air (air-source) or from the ground (ground-source) and releases it inside. A refrigerant circulates through four components: a compressor, a condenser, an expansion device, and an evaporator. In the evaporator the refrigerant absorbs heat and boils. In the condenser it releases heat and returns to a liquid. Modern cold-climate heat pumps operate well below zero degrees Fahrenheit, and many Minnesota buildings now use them as the primary heat source, sometimes with a backup source for the coldest days.

### Radiant Heating

**Radiant heating** is a method of heating that warms surfaces such as floors, walls, or ceilings so that they radiate heat directly to people and objects, rather than heating the air. The most common form circulates warm water through tubing embedded in a floor slab or placed beneath the floor. Radiant heat feels comfortable at slightly lower air temperatures because the occupants' bodies exchange heat with warm surfaces (Chapter 4). A radiant slab needs insulation below it so that heat flows up into the room rather than down into the soil (Chapter 10). The response is slow, so controls must anticipate changes in weather.

## Cooling Systems

A **cooling system** is the equipment that removes heat, and often moisture, from indoor air and rejects it outdoors. Nearly all use the same refrigeration cycle described under Heat Pump. The evaporator sits in the airstream or in a water loop and absorbs heat. The compressor and condenser reject that heat outside. Cooling can also be achieved by *chillers*, which cool water that is piped to coils in air handlers in larger buildings, and by *evaporative cooling*, which cools air by evaporating water and works best in dry climates.

Cooling matters even in Minnesota. A building with many occupants, large glass areas, or heavy equipment may need cooling for much of the year, and the multipurpose room at Riverbend, when full of people, generates substantial internal gains. Cooling also controls humidity during humid summer weeks, which protects materials and prevents mold (Chapter 4).

### Air Conditioning

**Air conditioning** is the process of treating air to control its temperature, humidity, cleanliness, and distribution at the same time. In everyday use the term means a cooling system that also dehumidifies. Dehumidification matters because the human body feels warm in humid air. Cooling air below its dew point makes water vapor condense on the cold coil, which removes moisture from the air. Removing that moisture is called *latent* cooling, as distinct from the *sensible* cooling that lowers temperature.

As a simple example, a classroom with 30 students, each giving off roughly 250 Btu/h of sensible heat (an illustrative value for seated, light activity), gains \( 30 \times 250 = 7{,}500 \) Btu/h from people alone, or \( 7{,}500/12{,}000 = 0.63 \) tons. That load comes before sun, lights, computers, and the outdoor air that must be cooled and dried.

## Ventilation

**Ventilation** is the intentional exchange of indoor air with outdoor air to dilute and remove contaminants such as carbon dioxide from breathing, odors, moisture, and chemicals from materials. Without ventilation, indoor air quality declines quickly. People exhale carbon dioxide and moisture, cooking adds particles and humidity, and furniture and finishes release gases.

Ventilation can be natural or mechanical. *Natural ventilation* relies on open windows and on the pressure differences created by wind and by the stack effect from Chapter 4. It is free but unpredictable. Cold-climate and energy-efficient buildings are built tightly, using the air sealing of Chapter 12, so they leak too little to ventilate themselves, and designers provide **mechanical ventilation**: fans, ducts, and controls that deliver measured amounts of outdoor air and exhaust stale air. Standards such as ASHRAE 62.1 for commercial buildings and 62.2 for residential buildings, adopted by reference through the mechanical code, set the required outdoor air rates.

**Worked example: outdoor air for a Riverbend classroom.** Standards of the type found in ASHRAE 62.1 compute the required outdoor airflow as a rate per person plus a rate per square foot of floor area, which accounts for contaminants from people and from the building itself. For classrooms, typical rates are about 10 cfm per person and 0.12 cfm per ft² (always confirm against the adopted standard's current table). For a 600 ft² classroom with 25 occupants:

\[ V_{oz} = 10 \times 25 + 0.12 \times 600 = 250 + 72 = 322 \text{ cfm} \]

At a design outdoor temperature of 0 °F and an indoor temperature of 70 °F, heating that air costs \( 1.08 \times 322 \times 70 \approx 24{,}300 \) Btu/h, three times the 8,000 Btu/h conduction load used earlier. Better insulation barely changes that cost, but a heat recovery ventilator can.

### Heat Recovery Ventilator

A **heat recovery ventilator** (HRV) is a mechanical ventilation device that passes outgoing exhaust air and incoming outdoor air through a heat exchanger so that the exhaust air preheats the fresh air without mixing the two streams. A related device, an *energy recovery ventilator* (ERV), also transfers moisture. The performance measure is *sensible effectiveness*, the fraction of the temperature difference that is recovered.

Continuing the classroom example, an HRV with 75 percent sensible effectiveness warms 0 °F outdoor air to \( 0 + 0.75 \times (70 - 0) = 52.5 \) °F before it reaches the heater. It recovers about \( 0.75 \times 24{,}300 \approx 18{,}300 \) Btu/h and leaves only about 6,100 Btu/h to be supplied by the heating system. In a cold climate this recovery is usually the main reason to install the device.

### Mechanical Ventilation

Mechanical ventilation is defined above, but systems differ in how they push air. An *exhaust-only* system pulls air out through bathroom or kitchen fans and lets replacement air leak in, which works poorly in a tight building and can draw radon or combustion gases through the envelope. A *supply-only* system pressurizes the building, which pushes warm moist air into walls in winter. A *balanced* system uses supply and exhaust fans of equal flow, often with an HRV, and is the preferred approach for tight cold-climate buildings. Commercial buildings often use *demand-controlled ventilation*, where carbon dioxide sensors reduce the airflow to a room when it is empty and increase it when it fills, as in the Riverbend multipurpose room.

### Indoor Air Quality

**Indoor air quality** (IAQ) is the condition of the air inside a building as it affects the health and comfort of occupants. Contaminants include carbon dioxide, volatile organic compounds (VOCs) released by paints and adhesives, particles, combustion gases, moisture and mold, and radon. IAQ is controlled by three strategies, in this order: remove or avoid the *source*, *ventilate* to dilute what remains, and *filter* the air to capture particles. Filters are rated by MERV (minimum efficiency reporting value), a scale on which higher numbers capture smaller particles. Carbon dioxide level is often used as a rough indicator of how well a space is ventilated, but it does not measure all contaminants.

### Radon Mitigation

**Radon mitigation** is the set of measures that keep radon, a radioactive gas released from soil, out of a building. Radon seeps from the ground into basements and slabs through cracks and gaps because the air pressure inside a heated building is usually lower than the soil air beneath it (Chapters 9 and 10). Long-term exposure raises lung cancer risk, and much of Minnesota has high radon potential. The common remedy is *sub-slab depressurization*, in which a layer of gravel under the slab connects to a vent pipe and a small fan that draws soil gas from beneath the slab and discharges it above the roof (Chapter 13), so it never enters the occupied space. Sealing cracks and testing after construction complete the strategy. Some codes require this piping to be roughed in for new houses.

## Air Distribution

**Air distribution** is the means by which conditioned and ventilation air travels from the equipment to the occupied spaces and returns again. The system has a supply side, which delivers air through *diffusers* (outlets that spread the air into the room), and a return side, which brings air back to the equipment through grilles. Good distribution mixes the air without causing drafts, so supply outlets are placed to throw air along ceilings or walls, and returns are placed to draw air across the room. Because air must flow out of a room as fast as it flows in, doors and walls need either return openings or transfer grilles. A closed bedroom door with no return path can pressurize the room and starve other rooms of air.

### Ductwork

**Ductwork** is the network of sheet metal, fiberglass, or flexible tubes that carries air between equipment and rooms. Duct size is chosen from the airflow and a limit on air speed. Because airflow equals velocity times cross-sectional area, a duct that is too small makes the air move too fast, which causes noise and uses fan energy.

**Worked example: sizing a branch duct.** The 250 cfm heating supply for the classroom above, at a design velocity of 800 feet per minute (a typical order of magnitude for branch ducts in occupied buildings), needs a cross-sectional area of \( 250/800 = 0.3125 \) ft², or 45 in². A round duct with that area has a diameter of \( \sqrt{4 \times 45/\pi} \approx 7.6 \) in, so the designer rounds up to an 8 in duct, which gives an actual velocity of about 716 feet per minute.

Ducts must also be sealed and insulated. Leakage from ducts located in an unheated attic or crawl space wastes heat and draws unconditioned air into the building. Ducts take up ceiling height, and the ceiling depth they require must be negotiated with the structural engineer, because ducts and beams compete for the same space. This coordination, the subject of Chapter 16, is a typical source of design conflict.

!!! mascot-thinking "Loads Come First"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice the order of everything in this section: the enclosure sets the load, the load sets the airflow, the airflow sets the duct size, and the duct size sets the ceiling height. A decision in the walls ripples all the way to the ceiling, so building systems cannot be designed one at a time.

## Plumbing Systems

**Plumbing systems** are the pipes, fixtures, and equipment that bring clean water into a building and carry used water and waste out of it safely. They are really three systems that share a name. The *water supply* delivers potable (drinkable) water under pressure. The *drain-waste-vent system* removes used water by gravity. The *stormwater system* carries rainwater away. Hot-water equipment and fixtures connect to all of them.

The difference between pressure and gravity is the key idea for understanding plumbing. Supply pipes are small, sealed, and full of pressurized water, which lets them run in any direction, up or down. Drain pipes are larger, only partly full, open to the atmosphere through vents, and must slope continuously downhill. These differences determine where each can go in the building and why a drain often controls the layout of a floor.

**Worked example: following one flush.** A student flushes a toilet in a Riverbend restroom. Cold water from the supply system, at pressure, refills the tank through a small pipe. The flush sends about 1.6 gallons of waste water, the maximum allowed by federal standards for common toilets, through the fixture's trap, a curved section that always holds water. The waste enters a horizontal *branch drain*, joins a vertical *stack* or the *building drain* under the floor, and flows by gravity to the *building sewer* and then the municipal sewer. The flowing water pulls air behind it, and a vent pipe that rises to the roof supplies that air, preventing suction that would pull the water out of the trap. Every part of that path, with its slope, trap, and vent, is required by code, and a failure in any one produces a bubbling drain or a sewer odor.

!!! mascot-warning "Watch Out: Pipes in Exterior Walls"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    Water expands when it freezes and can burst a pipe, and a pipe placed in an exterior wall or an unheated space can freeze during a Minnesota cold snap. Keep water pipes on the warm side of the insulation (Chapter 11), and insulate any that must cross cold areas.

### Water Supply

The **water supply** is the system of piping that delivers potable water from the public water main, or a private well, to the fixtures and equipment in a building. Water enters through a *service line* buried below the frost depth (Chapter 9), passes through a meter and main shutoff valve, and then divides into hot and cold distribution piping. Common pipe materials are copper, PEX (cross-linked polyethylene), and CPVC. Water must arrive at each fixture with enough pressure to work properly but not enough to damage fixtures, so codes commonly limit static pressure to about 80 psi and require a pressure-reducing valve above that. *Backflow preventers* stop water from the building from flowing back into the public system.

**Worked example: a pressure budget.** The pressure that reaches the top fixture is the street pressure minus the pressure used up by equipment and by lifting the water. Water produces 0.433 psi of pressure for every foot of height. Suppose a three-story building has fixtures 36 ft above the service entrance, the street pressure is 60 psi, and the meter, backflow preventer, and piping use up an illustrative 10 psi. The lift costs \( 36 \times 0.433 \approx 15.6 \) psi. The pressure at the top fixture is therefore \( 60 - 10 - 15.6 \approx 34 \) psi, which is enough for most fixtures. If the street pressure were 40 psi, only about 14 psi would remain and the building would need a booster pump. This approach is why designers always request the available street pressure before sizing the pipes.

### Water Heating

**Water heating** is the process of raising the temperature of supply water for bathing, cleaning, and cooking. A *storage* heater keeps a tank of hot water ready and loses a little heat all day. A *tankless* (instantaneous) heater heats water as it flows and needs high power. A *heat pump water heater* uses the refrigeration cycle to heat the tank with less electricity. Water for personal use is commonly delivered at about 120 °F to limit scalding, and where tanks store water at lower temperatures, designers pay attention to bacterial growth such as Legionella. The energy to heat water follows from its weight and temperature rise: 8.34 pounds per gallon, one Btu per pound per degree. Heating 50 gallons from 50 °F to 120 °F takes \( 8.34 \times 50 \times 70 \approx 29{,}200 \) Btu.

### Plumbing Fixtures

A **plumbing fixture** is a device that receives water from the supply system and discharges used water to the drain system, such as a toilet, lavatory (sink), shower, or kitchen sink. Every fixture has a trap (a toilet's is built into the bowl), a drain, and a vent. Codes set the *minimum number of fixtures* for each occupancy, which means the multipurpose room at Riverbend will require more toilets than a small office. They also set maximum water use for the fixtures, and federal standards limit common toilets to about 1.6 gallons per flush and showerheads to about 2.5 gallons per minute. Water-efficient fixtures lower both water and water-heating energy use, and accessibility rules (Chapter 17) govern mounting heights and clearances.

### Drain-Waste-Vent System

The **drain-waste-vent system** (DWV) is the gravity piping that removes used water and sewage and admits air so that water flows freely and traps keep their seals. *Drains* carry liquid waste, *waste* piping carries solids, and *vents* connect the system to the outside air. Small horizontal drains commonly slope about one-quarter inch per foot, which is steep enough to carry solids but slow enough that water does not leave them behind. *Cleanouts* are access points that allow a clogged pipe to be rodded.

Vents terminate above the roof, where their openings must stay clear of snow and frost. In cold climates, codes commonly require vent pipes to be enlarged before they pass through the roof so that frost forming at the opening cannot close it. The penetration also needs a flashing, which links this system to the roof assemblies of Chapter 13.

#### Diagram: Plumbing Supply and DWV Explorer

<details markdown="1">
<summary>Plumbing Supply and DWV Explorer</summary>
Type: infographic
**sim-id:** plumbing-supply-dwv-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will distinguish (Bloom Level 4, Analyze) pressurized supply piping from gravity drain-waste-vent piping and will explain (Bloom Level 2, Understand) the role of the trap and vent in a fixture's drain.

Visual: A cross-section of a two-story building showing a service line entering below the frost line, a meter, a water heater, hot and cold supply lines in blue and red, a restroom group with a toilet and lavatory, a vertical stack, a building drain, a cleanout, a building sewer, and a vent pipe through the roof. Supply pipes are drawn thin and sealed. Drain and vent pipes are drawn thick and sloped.

Controls: A toggle labeled "Show supply system," a toggle labeled "Show DWV system," and a toggle labeled "Show vent." A button labeled "Flush toilet" animates water moving through the system. A checkbox labeled "Remove vent" shows the consequence of an unvented drain: the trap is sucked dry and the status line reads "Sewer gas now enters the room."

Interactions: Hovering over any pipe or component highlights it and shows its name. Clicking opens an infobox with its function, whether the pipe is under pressure or gravity-driven, and a typical code requirement (for example, "Horizontal drains slope about one-quarter inch per foot"). A "Freeze test" slider lowers the outdoor temperature and highlights any pipe in an exterior wall that falls below 32 °F.

Colors: Cold supply in blue, hot supply in red, drain in gray, vent in green, with line style differences so the diagram works without color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createButton, createCheckbox, and createSlider controls, and an infobox below the canvas.
</details>

### Stormwater Management

**Stormwater management** is the set of practices that collect, slow, treat, and release rainfall that falls on a site so that it does not flood neighbors or pollute streams. Roof drains (Chapter 13) and paved surfaces send water quickly to storm sewers, so a developed site produces more runoff, faster, than the natural ground did. Regulations commonly require a development to release water no faster than before construction. Strategies include *detention* (holding water in a basin or underground chamber and releasing it slowly), *infiltration* (letting it soak into the soil through rain gardens or permeable pavement, which depends on the soils of Chapter 9), and green roofs. Stormwater drains are separate from sanitary drains in most modern systems, so rainwater does not overload the treatment plant.

## Fire Protection

**Fire protection** is the combination of building features and systems that prevent a fire from starting, detect it, alert occupants, limit its spread, and control or extinguish it. It has two complementary parts. *Passive* fire protection is built into the structure and enclosure and works without moving parts, such as fire-rated walls, floors, and doors that divide the building into compartments and slow a fire's spread. *Active* fire protection responds to a fire, and includes sprinklers, fire alarms, smoke control, and fire extinguishers. Chapter 18 returns to the passive side, and Chapter 16 covers fire alarm systems.

A useful way to think about the whole system is a chain of five jobs: detect the fire, warn the occupants, suppress the fire, control the smoke, and contain the fire. A building usually relies on several at once, because any single system can fail.

**Worked example: water for a light-hazard sprinkler area.** Sprinkler design uses a *design density*, the water in gallons per minute that must fall on each square foot of floor, applied across a *remote area* assumed to be the farthest group of sprinklers that open in a fire. As an illustration, consider a classroom wing treated as a light hazard, with a density of 0.10 gpm/ft² over a 1,500 ft² remote area. The demand is \( 0.10 \times 1{,}500 = 150 \) gpm at the sprinklers, before adding hose-stream allowance, friction, and pressure loss. The water supply must be able to deliver that flow at the required pressure for the duration the code demands, so the designer asks the water utility for a *hydrant flow test* and compares the result to the demand. If the city supply is too weak, the project adds a fire pump or a storage tank. The pump is an electrical load that the electrical designer must power reliably (Chapter 16).

!!! mascot-encourage "Alphabet Soup Is Normal"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    NFPA, IBC, density, remote area, K-factor: fire protection arrives with a lot of vocabulary, and nobody learns it in one sitting. You already know the idea, which is water on a fire, so focus on the chain of five jobs and let the details attach to it one by one.

#### Diagram: Fire Protection Layers Building Explorer

<details markdown="1">
<summary>Fire Protection Layers Building Explorer</summary>
Type: infographic
**sim-id:** fire-protection-layers-building-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) fire protection features as passive or active and will explain (Bloom Level 2, Understand) which of the five jobs (detect, warn, suppress, control smoke, contain) each one performs.

Visual: A cutaway of a two-story building with a stair, a corridor, two compartments separated by rated walls, a sprinkler riser and branch pipes, smoke detectors, horns and strobes, a smoke damper in a duct, and a fire pump room. Each feature is drawn with a numbered marker.

Controls: A button labeled "Start fire in room B" begins an animation of a small fire. Checkboxes labeled "Sprinklers," "Alarm," "Smoke control," and "Rated walls" turn each protection layer on or off. A time slider moves from 0 to 10 minutes.

Interactions: With all layers on, the animation shows the detector triggering, the alarm sounding, the sprinkler at the fire opening, and the smoke damper closing. Turning layers off shows the consequence on the animation (for example, "No rated walls: fire reaches room A in 4 minutes"). Clicking any marker opens an infobox with the feature's job, whether it is passive or active, and the project team member responsible for it.

Colors: Passive features in blue, active features in orange, fire in red, smoke in dark gray. Markers carry text labels as well as color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createButton, createCheckbox, and createSlider controls.
</details>

### Sprinkler Systems

A **sprinkler system** is a network of pipes filled with water or air that discharges water from heat-activated heads when a fire raises the temperature at the ceiling. Each sprinkler opens independently when a small glass bulb or metal link reaches its rated temperature, commonly around 155 °F. Only the sprinklers near the fire open, which limits water damage. Sprinklers control most fires by cooling them until the fire service arrives, and their effectiveness is the reason codes allow larger areas or fewer fire-rated walls in sprinklered buildings.

Types differ in what fills the pipes. *Wet-pipe* systems hold water at all times and are the most common. *Dry-pipe* systems hold pressurized air and admit water only when a sprinkler opens, which makes them necessary in areas that can freeze, such as unheated attics and loading docks in Minnesota. A sprinkler's flow follows \( Q = K\sqrt{P} \), where \( K \) is a number that depends on the orifice and \( P \) is pressure in psi. A common sprinkler with K = 5.6 at the usual minimum of 7 psi flows \( 5.6 \times \sqrt{7} \approx 14.8 \) gpm. Flow and tamper switches on the sprinkler riser connect to the fire alarm system, so a sprinkler operation signals the building and the fire department.

### Smoke Control

**Smoke control** is the use of fans, dampers, and pressure differences to keep smoke out of exit paths and to remove it from the area of a fire. Smoke, not flame, is the leading cause of fire deaths because it blocks vision and carries toxic gases. Passive measures such as *smoke barriers* and *smoke dampers* in ducts limit movement. Active measures include *stair pressurization*, where fans supply air to a stair enclosure so that the pressure there is higher than in the fire floor, and *smoke exhaust* in large spaces such as atria. Ordinary HVAC fans are commonly shut down on an alarm so that they do not spread smoke, which makes the HVAC controls and the fire alarm part of one coordinated design that is tested during commissioning (Chapter 2).

!!! mascot-celebration "The Systems Are No Longer a Mystery"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now estimate how many cfm of air a room needs, compare furnace, boiler, and heat pump efficiency, follow a flush from fixture to sewer, and name the five jobs of fire protection. You are ready to see how these systems share space with the electrical system in Chapters 15 and 16.

## Key Takeaways

- HVAC systems are a response to the enclosure: the enclosure sets the loads, the loads size the equipment, and the equipment sets duct and ceiling dimensions. Sensible heat in air follows \( Q = 1.08 \times \text{cfm} \times \Delta T \).
- Heating and cooling loads come from conduction, ventilation and infiltration, and internal and solar gains. Oversizing equipment causes short cycling and poor humidity control.
- Furnaces heat air for ducts, boilers heat water for pipes, heat pumps move heat with a refrigeration cycle, and radiant systems warm surfaces. AFUE and COP measure efficiency, and heat pump COP falls as outdoor temperature falls.
- Tight, cold-climate buildings need mechanical ventilation, ideally balanced with heat recovery. Required outdoor air is a per-person rate plus a per-square-foot rate.
- Indoor air quality is controlled by source control, ventilation, and filtration. Radon is handled by sub-slab depressurization with a vent above the roof.
- Plumbing combines pressurized supply piping, gravity drain-waste-vent piping with traps and vents, and stormwater systems. Pipes in exterior walls risk freezing in Minnesota.
- Fire protection combines passive containment with active detection, alarm, sprinklers, and smoke control. Sprinkler design depends on a density applied over a remote area, and the water supply must be verified by a flow test.
- Every system in this chapter occupies space in ceilings, walls, and mechanical rooms, so it must be coordinated with the structure and with the electrical system.
