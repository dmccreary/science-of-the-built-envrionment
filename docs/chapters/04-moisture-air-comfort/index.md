---
title: Moisture, Air Movement, and Thermal Comfort
description: How water vapor, liquid water, and air pressure differences move through buildings, and how they cause condensation and shape the comfort of the people inside.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:58:46
version: 1.10
---

# Moisture, Air Movement, and Thermal Comfort

## Summary

How moisture, humidity, pressure differences, and air leakage move through buildings, and how they affect condensation and comfort. It builds on the prerequisite concepts from Chapter 3. After completing this chapter, students will be able to define, explain, and apply the 12 concepts listed below.

## Concepts Covered

This chapter covers the following 12 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Moisture | 222 |
| Air Pressure Differences | 45 |
| Air Leakage | 24 |
| Humidity | 16 |
| Relative Humidity | 10 |
| Dew Point | 4 |
| Vapor Diffusion | 3 |
| Stack Effect | 3 |
| Capillary Action | 2 |
| Thermal Comfort | 2 |
| Psychrometric Chart | 2 |
| Condensation | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)

---

!!! mascot-welcome "The Enemy You Can't See"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Most building failures are not collapses. They are slow leaks, hidden damp spots, and rot that nobody saw coming. Learn how water and air actually move, and you will be the one on the crew who spots the problem before it is covered up. Let's build it right!

Chapter 3 followed heat through a wall and found that the inner face of the sheathing, the cold side of the insulation, sat at about −3°F on a Minnesota design day. That number is a warning. Wherever a building surface is colder than the air touching it, water vapor in the air can turn to liquid, and liquid water in the wrong place is the cause of most of the durability problems in buildings. Mold, rot, corrosion, and frozen and cracked masonry all begin with moisture.

This chapter follows water and air through the building enclosure. We first define moisture and the ways it travels, then the language of humid air: humidity, relative humidity, dew point, and condensation. We then examine the pressure differences that push air through gaps, and we close with thermal comfort, the human response to heat, air, and humidity together. The **Riverbend Youth Center** from Chapter 2 appears again, and all of its numbers are illustrative.

## Moisture

**Moisture** is water in any of its forms (liquid, vapor, or solid ice) that is present in or moving through a building and its materials. Water is not harmful in itself. A building is built to handle rain, and its occupants breathe out and bathe in water constantly. The problem arises when moisture accumulates in a material faster than it can leave, and the material stays wet long enough for damage to begin.

Moisture reaches a building through four distinct mechanisms, each driven by a different force:

1. **Bulk water flow.** Liquid water moves as rain, snowmelt, groundwater, or a plumbing leak, driven by gravity, wind pressure, or the momentum of falling drops. It carries the largest quantities of water by far.
2. **Capillary action.** Liquid water is drawn through the tiny pores of a material by surface tension, even upward against gravity. We examine it later in the chapter.
3. **Air movement.** Air carries water vapor with it wherever it flows through gaps and cracks. This is driven by pressure differences, which we also examine below.
4. **Vapor diffusion.** Water vapor moves through a solid material from the side with more vapor to the side with less, even when the air is still.

The reason to separate the four is that each needs a different control. Bulk water is stopped by roofs, flashing, and drainage. Capillary action is stopped by breaks in the material. Air-carried vapor is stopped by an air barrier, and diffusion is slowed by vapor-resistant layers. A designer who controls only one mechanism leaves the other three working.

**Worked example: how much water is a rainstorm?** One inch of rain over 1 ft² deposits \( 144 / 231 = 0.62 \) gallons, because 144 in³ of water is spread over the area and one gallon is 231 in³. Over the 2,400 ft² multipurpose room roof, one inch of rain delivers \( 2{,}400 \times 0.62 \approx 1{,}500 \) gallons, which weighs about \( 1{,}500 \times 8.34 \approx 12{,}500 \) lb. The roof must shed this water through drains, and a small defect in the flashing at a roof edge has 1,500 gallons of pressure behind it. The scale is also instructive for a different reason: a typical wood-framed wall can tolerate wetting briefly, but it must be able to dry afterward, which is why designers also think about drying and not only about blocking.

Moisture damage depends on how wet a material becomes. For wood, the measure is the *moisture content*, the weight of water divided by the oven-dry weight of the wood, expressed as a percentage. A sample that weighs 1.20 lb as delivered and 1.00 lb after oven drying has a moisture content of \( (1.20 - 1.00)/1.00 = 20 \) percent. Wood framing lumber is commonly dried to a maximum of about 19 percent, and decay fungi generally need wood to stay above roughly 20 percent for an extended period, so a stud at 20 percent sits at the edge. Chapter 7 returns to wood in detail, and Chapter 21 treats the failures that result when materials stay wet.

The table below organizes the four mechanisms we have defined, so you can see what drives each and how it is controlled.

| Mechanism | What drives it | Example | Typical control |
|-----------|----------------|---------|-----------------|
| Bulk water flow | Gravity, wind, momentum | Rain through a window head | Flashing, drainage plane, roof slope |
| Capillary action | Surface tension in pores | Groundwater wicking into a footing | Capillary break, damp-proofing |
| Air movement | Air pressure difference | Humid air leaking into a cold wall | Continuous air barrier |
| Vapor diffusion | Vapor pressure difference | Vapor passing through gypsum board | Vapor retarder, drying capacity |

#### Diagram: Moisture Pathways in a Wall

<details markdown="1">
<summary>Moisture Pathways in a Wall</summary>
Type: infographic
**sim-id:** moisture-transport-pathways-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) each way that moisture enters a wall as bulk water, capillary action, air movement, or vapor diffusion, and will match (Bloom Level 2, Understand) each pathway to its control.

Visual: A section drawing of a Minnesota wall on a concrete foundation, with the roof edge at the top. Four colored arrow sets mark the pathways: rain at a window head (bulk water), groundwater rising in the footing (capillary action), warm air leaking at an outlet box (air movement), and vapor passing through the interior finish (diffusion). The canvas width follows the container, the height is 500 px, and the sketch redraws on window resize.

Controls: Four toggle buttons labeled "Bulk water," "Capillary," "Air movement," and "Diffusion" switch each pathway on or off. A checkbox labeled "Show controls" overlays the matching control (flashing, capillary break, air barrier, vapor retarder) as a colored layer. A button labeled "Quiz me" hides the labels and asks the student to click the pathway for a highlighted arrow.

Interactions: Clicking any arrow opens an infobox with the mechanism's driver, a one-sentence example, and the matching control. Hovering over a layer shows its name. In quiz mode, a correct answer turns the arrow green with a short explanation, and a wrong answer shows which driver the student should look for.

Colors: Bulk water is blue, capillary action is teal, air movement is orange, and diffusion is purple. All arrows carry text labels.

Implementation: p5.js with a responsive canvas, built-in button and checkbox controls, mouse hit-testing on the arrows, and an infobox div.
</details>

## Humidity

**Humidity** is the amount of water vapor present in air. Air is a mixture of gases, and water vapor is one of them, normally a small fraction by weight. Several measures describe humidity. The most direct is the *humidity ratio*, which is the weight of water vapor per weight of dry air, in pounds of water per pound of dry air. Designers also use *vapor pressure*, the share of the total air pressure that is exerted by the water vapor itself, because vapor pressure is what drives diffusion.

Air can hold only a limited amount of vapor at a given temperature. When it holds the maximum, it is *saturated*, and any additional vapor condenses into liquid. The saturation limit rises quickly with temperature, so warm air can hold far more vapor than cold air. At 70°F, saturated air has a humidity ratio of about 0.0158 lb of water per lb of dry air. At −10°F, saturated air holds only about 0.0006, which is roughly 27 times less.

**Worked example: water in a classroom's air.** The Riverbend classroom from Chapter 3 holds 405 lb of dry air at 70°F. If the air is at half of its saturation limit, its humidity ratio is about 0.0078, so the room holds \( 405 \times 0.0078 \approx 3.2 \) lb of water vapor, which is about 1.5 quarts. That seems small, but the water in the air is a continuous flow, not a fixed amount. People breathe out vapor, showers and cooking add it, and ventilation air removes it. In a Minnesota winter, the outdoor air is extremely dry in absolute terms, so ventilation dries the building, and designers sometimes add humidification to protect occupants and wood finishes.

## Relative Humidity

**Relative humidity** (RH) is the amount of water vapor in the air, expressed as a percentage of the maximum amount the air could hold at its current temperature. The word *relative* matters: RH compares the vapor present to the saturation limit *at that temperature*, so it changes whenever the temperature changes, even if no water is added or removed.

!!! mascot-thinking "RH Is a Ratio, Not an Amount"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that relative humidity says how full the air is, not how much water it contains. Warm the same air and it gets emptier, even though not a drop of water has left.

Because the saturation limit roughly doubles for every 20°F of warming, RH moves in a predictable way. If a sealed parcel of air is warmed by 20°F, the vapor stays the same while the capacity doubles, so the RH falls to about half. Cooling by 20°F doubles the RH, until the air reaches 100 percent and moisture begins to appear.

**Worked example: why Minnesota winters feel so dry indoors.** Suppose the outdoor air at −10°F is saturated (RH 100 percent), which is about as damp as winter air can get. When this air leaks or is ventilated into the building and warmed to 70°F, its vapor content is unchanged, but the saturation limit at 70°F is about 27 times as large. The RH therefore falls to roughly \( 1/27 \), or about 4 percent, which is far drier than any occupant would find comfortable. Unless occupants or a humidifier add moisture, the indoor RH in a leaky building in January often sits below 20 percent, which dries wood and skin. The remedy for dryness is limited, however, since adding too much moisture creates the condensation risks that follow in this chapter.

!!! mascot-tip "Beau's Tip: The Rule of Twenty"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Every 20°F of warming roughly halves the RH of a fixed parcel of air, and every 20°F of cooling roughly doubles it. Use it to sanity-check a reading before you reach for a chart.

## Dew Point

The **dew point** is the temperature to which air must be cooled, with no change in its vapor content, for it to become saturated. Below that temperature, vapor condenses. The dew point is a direct measure of the vapor in the air: unlike RH, it does not change when the air is warmed or cooled, and it only changes when moisture is added or removed. A higher dew point means more moisture in the air.

The dew point can be calculated from the air temperature and RH, or read from a psychrometric chart, which we describe below. For indoor air at 70°F, the dew point depends on the RH as shown in the table, which reinforces the calculation that follows.

| Indoor RH at 70°F | Dew point (approx.) |
|-------------------|---------------------|
| 20 percent | 27°F |
| 30 percent | 37°F |
| 40 percent | 45°F |
| 50 percent | 51°F |
| 60 percent | 56°F |

**Worked example: will this wall condense?** Return to the wall from Chapter 3, with 70°F indoor air, −10°F outdoor air, and layer surface temperatures that we calculated from the thermal resistances. The inside face of the gypsum board is at 66.5°F. With indoor air at 30 percent RH, the dew point is about 37°F, which is lower than 66.5°F, so no condensation forms on the gypsum. But the inner face of the sheathing, the cold side of the insulation, is at −3.4°F, far lower than the dew point. If the indoor air reaches that surface through a gap, the vapor in it will condense, and because the surface is below freezing, it will form frost. If the indoor RH is raised to 50 percent, the dew point rises to 51°F, and then even a window pane or a cold slab edge at 45°F becomes a place where condensation forms.

!!! mascot-warning "Watch Out: The Thermostat Isn't the Wall"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A humidity reading in the room says nothing about the temperature of the coldest surface the air can reach. Compare the dew point to the *surface* temperatures, such as window glass, the back of sheathing, and slab edges, and keep the surface warmer than the dew point or keep the humid air from reaching it.

## Condensation

**Condensation** is the change of water vapor into liquid water, which occurs when humid air touches a surface at or below its dew point. As the vapor turns to liquid, it releases the latent heat described in Chapter 3, which slightly warms the surface. Where the surface is below 32°F, the vapor can freeze directly into frost instead.

Condensation appears in two forms. *Visible* condensation occurs on windows, cold water pipes, and ducts, where it is noticed and wiped away. *Concealed* condensation occurs inside walls, attics, and roof assemblies, where no one sees it until the damage appears. Concealed condensation is the more dangerous of the two, since it can wet insulation, framing, and sheathing for months. In Minnesota, the cold side of the wall is the usual location in winter. In humid summers, the risk reverses: cold supply ducts and chilled-water pipes in a warm attic or ceiling space sweat unless they are insulated and sealed. Chapter 11 shows how insulation placement keeps the surfaces that humid air touches warmer than its dew point.

## Psychrometric Chart

A **psychrometric chart** is a graph that shows the properties of moist air and how they relate to each other. The horizontal axis is the dry-bulb temperature, which is the ordinary air temperature. The vertical axis is the humidity ratio. Curved lines show constant relative humidity, and the top curve is the saturation line, where RH is 100 percent. A point on the chart represents a state of the air, and it can be read for temperature, humidity ratio, RH, and dew point.

To find the dew point, begin at the air's state point and move horizontally to the left, without changing the humidity ratio, until you reach the saturation curve. The temperature at that point is the dew point. Cooling air is therefore a horizontal move to the left, and heating is a horizontal move to the right, which makes the RH change visible.

!!! mascot-encourage "The Chart Looks Scarier Than It Is"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    A psychrometric chart looks like a spider web, and almost everyone is intimidated by it at first. You only ever do one thing with it: put a dot on it and slide the dot left to find the dew point. Try that with the explorer below before you worry about every line.

#### Diagram: Psychrometric Chart Explorer

<details markdown="1">
<summary>Psychrometric Chart Explorer</summary>
Type: chart
**sim-id:** psychrometric-chart-explorer<br/>
**Library:** Plotly<br/>
**Status:** Specified

Learning objective: Students will use (Bloom Level 3, Apply) a psychrometric chart to find the dew point and relative humidity of air at a given state, and will predict (Bloom Level 2, Understand) what happens to RH and dew point when the air is warmed or cooled.

Visual: A simplified psychrometric chart with dry-bulb temperature from −20°F to 100°F on the horizontal axis and humidity ratio from 0 to 0.020 lb/lb on the vertical axis. Curves show constant RH at 10 percent steps and the saturation line at 100 percent. A draggable state point is drawn as a bold dot, with a horizontal dashed line extending left to the saturation curve and a vertical dashed line to the axis. The chart fills the container width with a height of 480 px and redraws on window resize.

Controls: A slider labeled "Air temperature (°F)" from −20 to 100 with a default of 70. A slider labeled "Relative humidity (%)" from 5 to 100 with a default of 30. The student can also drag the dot directly. A button labeled "Warm 20°F" moves the dot right along its horizontal line, and "Cool 20°F" moves it left. A checkbox labeled "Wall surface test" adds a vertical marker at a surface temperature set by a third slider labeled "Surface temperature (°F)" from −20 to 70.

Interactions: A readout shows the temperature, humidity ratio, RH, and dew point at the dot. When the surface test is on, the readout states "Condensation" in text and the marker turns red if the surface is below the dew point, and "No condensation" otherwise. Hovering over a curve shows its RH value. Pressing "Warm 20°F" displays the message that the RH roughly halves.

Colors: RH curves are shades of blue, the saturation line is dark blue, the state point is orange, and the condensation warning is red with a text label.

Implementation: Plotly scatter and line traces with a Magnus-formula calculation for saturation, drag handlers on the state point, and a readout div.
</details>

## Vapor Diffusion

**Vapor diffusion** is the movement of water vapor through a material, driven by a difference in vapor pressure between the two sides, from the side with more vapor to the side with less. It occurs even when the air is perfectly still, because vapor molecules slowly migrate through the tiny pores of materials such as gypsum board, wood, and concrete. In a Minnesota winter, the heated interior holds more vapor than the cold outdoors, so diffusion pushes vapor outward through the wall.

How easily a material passes vapor is expressed as *permeance*, measured in *perms*; materials with a low permeance resist diffusion. Codes commonly sort *vapor retarders* into three classes, Class I (0.1 perm or less, such as polyethylene sheeting), Class II (above 0.1 up to 1 perm), and Class III (above 1 up to 10 perms), and they specify where each is required by climate zone. Chapter 5 covers the underlying property of permeability. Diffusion moves far less water than air leakage in most buildings. Its main danger is in assemblies that cannot dry, so the best design allows moisture that does enter to leave.

## Capillary Action

**Capillary action** is the movement of liquid water through narrow pores or gaps in a material, driven by surface tension and the attraction between the water and the pore walls. It is the same effect that draws water up a paper towel. It can lift water against gravity, and in an idealized case, the height of rise is inversely proportional to the pore radius: a pore of radius 0.1 mm lifts water about 15 cm (6 in), and a pore ten times finer lifts it about 1.5 m (5 ft).

This explains why concrete, masonry, and brick, which are full of tiny pores, can pull groundwater up out of the soil into walls, a process known as *rising damp*. The remedies are to break the pore connection. A *capillary break*, such as a layer of coarse gravel under a slab, a damp-proofing coating on a foundation wall, or a membrane between a concrete footing and a wood sill, interrupts the continuous path, because water cannot climb across a large gap. Chapter 10 describes these details for foundations.

## Air Pressure Differences

An **air pressure difference** is a difference in air pressure between two locations, and it is the force that pushes air through a building. Air always moves from the higher pressure to the lower pressure, which means that wherever a pressure difference acts on a gap, air flows through the gap. The pressures involved are tiny compared with atmospheric pressure, usually only a few pascals (Pa) or hundredths of an inch of water column (in. w.c.). One in. w.c. equals about 249 Pa or 5.2 psf. Even these small pressures are enough to move large amounts of air through a leaky enclosure.

!!! mascot-thinking "No Hole, No Flow. No Push, No Flow."
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that air movement needs two things at once: a path through the enclosure and a pressure difference across it. Remove either one, and the air stops, which is why we fix both the holes and the sources of pressure.

Three sources create pressure differences across an enclosure. *Wind* pushes air against the windward wall, which is at higher pressure, and creates suction on the leeward wall and roof. The *stack effect*, discussed below, arises from temperature differences between inside and outside. *Mechanical systems*, such as exhaust fans, supply fans, and combustion appliances, pressurize or depressurize the building depending on whether they add or remove more air than they bring in.

Wind pressure can be estimated by the standard velocity-pressure formula, in which the pressure in pounds per square foot is approximately \( q = 0.00256 \, V^2 \), with \( V \) the wind speed in miles per hour. The pressure on an actual wall is this value multiplied by a shape coefficient that depends on the building's geometry and the wall's orientation. Chapter 6 treats wind as a structural load, and here we use it as a source of air pressure.

**Worked example: a breezy day at Riverbend.** In a 15 mph wind, \( q = 0.00256 \times 15^2 = 0.58 \) psf, or about 28 Pa. A windward wall might experience about 60 percent of that, an illustrative coefficient of 0.6, which gives \( 0.6 \times 0.58 = 0.35 \) psf or about 17 Pa, equivalent to 0.07 in. w.c. This is small enough that you would never feel it as a force, yet it is the same order of magnitude as the stack pressure of about 19 Pa across the full height of a 30 ft building on a cold calm day, calculated in the Stack Effect section. A windy day can substantially increase the air leakage of a building. Now suppose the kitchen exhaust hood removes 1,000 CFM (cubic feet per minute) and the building has no makeup air. That air must come from somewhere, so the building is depressurized, and air is pulled in through every gap, including the flue of a furnace or water heater if one is present. This is a safety problem as well as a comfort problem, because it can draw combustion gases back into the building.

| Source | Typical effect | Example | Typical remedy |
|--------|----------------|---------|----------------|
| Wind | Pressure windward, suction leeward | Drafts on the windy side | Continuous air barrier |
| Stack effect | Inflow low, outflow high in a winter building | Drafts at floor level in a stairwell | Seal the top and bottom of the enclosure |
| Exhaust fans | Depressurizes the building | Backdrafting a water heater | Provide makeup air |
| Supply fans | Pressurizes the building | Warm humid air pushed into walls | Balance supply and exhaust |

#### Diagram: Building Pressure and Air Leakage Explorer

<details markdown="1">
<summary>Building Pressure and Air Leakage Explorer</summary>
Type: microsim
**sim-id:** building-pressure-air-leakage-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how wind, the stack effect, and exhaust fans each change the pressure across a building enclosure, and will predict (Bloom Level 2, Understand) where air enters and where it leaves.

Visual: A side view of a building outline up to three stories high, with several small gaps drawn at different heights on the walls and at the roof. A vertical pressure graph beside the building shows the indoor-minus-outdoor pressure at each height, with a marker for the neutral pressure plane. Arrows through the gaps show direction and scale with the pressure. The canvas width follows the container, the height is 500 px, and the sketch redraws on window resize.

Controls: A slider labeled "Outdoor temperature (°F)" from −20 to 70 with a default of −10. A slider labeled "Wind speed (mph)" from 0 to 30 with a default of 0, and a toggle for wind direction. A slider labeled "Exhaust fan (CFM)" from 0 to 2,000 with a default of 0. A slider labeled "Building height (ft)" from 10 to 60 with a default of 30. A checkbox labeled "Seal the top gaps" closes the upper gaps.

Interactions: Hovering over a gap shows the pressure across it and the direction of flow. Raising the exhaust fan slider shifts the pressure curve toward negative pressure. Sealing the top gaps moves the neutral pressure plane upward and increases the infiltration at the bottom, with a one-sentence explanation. A readout lists the total stack pressure for the selected temperature difference and height, and the defaults reproduce about 19 Pa across a 30 ft height at −10°F.

Colors: Positive pressure is orange, negative pressure is blue, and the neutral plane is a dashed gray line. All flow arrows carry text labels showing direction.

Implementation: p5.js with a responsive canvas, built-in sliders and checkbox, a simplified stack and wind model, and a pressure graph drawn each frame. The model is illustrative and is labeled as such.
</details>

## Air Leakage

**Air leakage** is the uncontrolled flow of air through gaps, cracks, and penetrations in the building enclosure. It is called *infiltration* when outdoor air flows in and *exfiltration* when indoor air flows out. Air leakage occurs wherever there is both a path, such as a joint between the wall and the foundation, a window rough opening, a recessed light, or a wire penetration, and a pressure difference to drive flow through it, as discussed above.

Leakage matters for three reasons. It wastes energy, because the leaking air must be heated or cooled. It carries moisture into wall and roof cavities, usually far more than diffusion does, since field and laboratory studies repeatedly find that air movement through a small opening can carry orders of magnitude more water vapor than diffusion through the same area of drywall. And it harms comfort through drafts and noise. The cure is a *continuous air barrier*, a connected layer of material that stops air flow across the whole enclosure, which Chapter 12 describes. Leakage is measured with a *blower door* test, in which a calibrated fan pressurizes or depressurizes the building to 50 Pa, and the airflow needed to hold that pressure indicates how leaky the enclosure is. The result is often expressed in *air changes per hour at 50 Pa* (ACH50), and cold-climate energy codes commonly set limits on it.

**Worked example: the cost of leakage in one room.** The Riverbend classroom has a volume of 5,400 ft³. Suppose natural air leakage averages 0.5 air changes per hour (an illustrative value), so the room exchanges half its volume each hour. The airflow is \( 5{,}400 \times 0.5 / 60 = 45 \) CFM. The heat needed to warm that air from outdoor to indoor temperature is found from the sensible-heat form of the equation in Chapter 3, which for air is \( \dot{Q} = 1.08 \times \text{CFM} \times \Delta T \), where 1.08 combines the density and specific heat of air. On the 80°F design day, \( \dot{Q} = 1.08 \times 45 \times 80 = 3{,}890 \) BTU/h. That is about three quarters of the 5,200 BTU/h that the 1,000 ft² wall loses by conduction in Chapter 3, so leakage from a single classroom is a large heat loss that insulation alone does not address.

## Stack Effect

The **stack effect** is the vertical air movement in a building caused by differences in air density between the warm interior and the cold exterior. Warm air is lighter than cold air, so in winter the warm interior air rises and pushes out through gaps at the top of the building. Replacement cold air is drawn in through gaps at the bottom. Somewhere between the two, a *neutral pressure plane* exists where the indoor and outdoor pressures are equal. The effect grows with both the temperature difference and the height of the building, so it is strongest in tall buildings in cold climates, in stairwells, and in elevator shafts.

The pressure difference across the full height can be estimated from the temperatures. Using absolute temperatures in kelvin, the stack pressure is about \( \Delta P \approx 3{,}460 \times h \times (1/T_o - 1/T_i) \) in pascals, where \( h \) is the height in meters. For a 30 ft (9.1 m) building at 70°F inside and −10°F outside, the two absolute temperatures are 249.8 K and 294.3 K, and the pressure is about 19 Pa across the full height, or roughly +9.5 Pa at the top and −9.5 Pa at the bottom if the neutral plane is at mid-height. That is enough to produce an upward draft in a stairwell that you can feel.

## Thermal Comfort

**Thermal comfort** is the state of mind in which a person is satisfied with the thermal environment around them. It is a subjective judgment, not a measurement, but it depends on measurable conditions. Six factors determine it, four of them environmental and two personal. The environmental factors are air temperature, the *mean radiant temperature* (the average temperature of the surfaces that surround the person), air speed, and humidity. The personal factors are *metabolic rate*, which depends on activity level, and *clothing insulation*. A person sitting still in a heavy sweater needs a different environment than one carrying drywall in shirtsleeves.

Radiation, which Chapter 3 treated, explains why surface temperatures matter. A person sitting near a cold window loses heat by radiation to the cold glass, as in the cold window calculation, and feels chilled even when the air is 70°F. For the same reason, a well-insulated building with warm interior surfaces can be comfortable at a lower air temperature, which saves energy. Comfort standards, such as the one published by ASHRAE, describe a winter comfort zone of roughly 68 to 75°F at moderate humidity, though individual preferences vary widely.

!!! mascot-celebration "You Can Follow Water and Air"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now name the four ways moisture moves, find a dew point and compare it to a surface temperature, tell why air leakage needs both a path and a pressure, and explain why a cold window makes a warm room feel cold. Those habits will catch the problems that are invisible on the drawings.

## Key Takeaways

- Moisture reaches buildings through four mechanisms: bulk water flow, capillary action, air movement, and vapor diffusion. Each needs its own control.
- Damage begins when a material stays wet for long enough, so assemblies must dry as well as block water. Wood at a sustained moisture content above about 20 percent is at risk of decay.
- Humidity is the amount of water vapor in air. Relative humidity compares it to the saturation limit at the current temperature, which roughly doubles for every 20°F of warming.
- The dew point is the temperature at which air becomes saturated. Condensation occurs when humid air touches a surface at or below its dew point, including surfaces hidden inside walls.
- The psychrometric chart shows the state of moist air, and sliding a point horizontally to the saturation curve gives the dew point.
- Air moves from high to low pressure. Wind, the stack effect, and mechanical fans create the pressure differences, and a leak needs both a path and a pressure to flow.
- Air leakage wastes energy and carries far more moisture into cavities than diffusion does, so a continuous air barrier is a primary control.
- Vapor diffusion is slower than air leakage but is controlled in cold climates with vapor retarders and by allowing walls to dry. Capillary action is stopped with capillary breaks.
- Thermal comfort depends on air temperature, radiant temperature, air speed, humidity, activity, and clothing, so warm interior surfaces can allow comfort at lower air temperatures.

[See Annotated References](./references.md)
