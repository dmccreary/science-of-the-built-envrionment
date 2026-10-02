---
title: Energy Efficiency and High-Performance Buildings
description: How energy codes, passive design strategies, and rating systems lead from code-minimum buildings to efficient, high-performance, and net-zero energy buildings.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:59:13
version: 1.10
---

# Energy Efficiency and High-Performance Buildings

## Summary

How energy codes, passive design, and rating systems lead to efficient, high-performance, and net-zero energy buildings. It builds on the prerequisite concepts from Chapters 1, 3, 11, 12, 13, 14, 16, 17. After completing this chapter, students will be able to define, explain, and apply the 14 concepts listed below.

## Concepts Covered

This chapter covers the following 14 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Sustainability | 39 |
| Energy Efficiency | 10 |
| High-Performance Buildings | 3 |
| Minnesota Energy Code | 2 |
| Green Building Rating Systems | 2 |
| Passive Solar Design | 2 |
| Energy Code Compliance | 1 |
| Operational Carbon | 1 |
| Passive House | 1 |
| Net-Zero Energy | 1 |
| LEED Certification | 1 |
| Daylighting | 1 |
| Cool Roofs | 1 |
| Water Efficiency | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 11: Enclosure Control Layers and Insulation](../11-enclosure-insulation/index.md)
- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../12-cladding-windows-air-sealing/index.md)
- [Chapter 13: Roof Assemblies](../13-roof-assemblies/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../14-hvac-plumbing-fire/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../16-electrical-distribution-design/index.md)
- [Chapter 17: Building Codes, Permits, and Enforcement](../17-building-codes-permits/index.md)

---

!!! mascot-welcome "Build Less Waste Into Every Wall"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A Minnesota winter is the ultimate test of a building's skin and its heating plant, and the buildings that pass it cheaply are the ones that were designed to waste little. This chapter shows you how to measure that waste, how the code limits it, and how to go well past the code when an owner asks for more. Let's build it right!

Earlier chapters gave you the tools: heat flow from Chapter 3, insulation and air control from Chapters 11 and 12, roofs from Chapter 13, mechanical systems from Chapter 14, and lighting from Chapter 16. This chapter puts them to work on a single question: how little energy can a building use while still being comfortable, safe, and affordable? We begin with the broad idea of sustainability, narrow to energy, and then move up the ladder from code-minimum buildings to high-performance and net-zero energy buildings.

We return to the **Riverbend Youth Center** from Chapter 2, the invented one-story, wood-framed Minneapolis building of about 9,000 ft² with a 40 ft multipurpose room. All dollar figures, scores, and energy values for Riverbend in this chapter are illustrative, selected to make the arithmetic clear and not to predict real performance.

## Sustainability

**Sustainability** is the practice of meeting present needs without compromising the ability of future generations to meet theirs, a definition that comes from the 1987 Brundtland report of the United Nations. For buildings it means designing, constructing, operating, and eventually removing a building so that its demands on resources and its harm to people and ecosystems are as small as practical, while it still serves its owner. Sustainability is a goal that many decisions serve. It is not a single product or feature that can be added at the end of design.

Three dimensions are commonly used to organize the goal, often called the *triple bottom line*.

- **Environment:** energy use, greenhouse gas emissions, water, materials, land, and ecosystems.
- **Society:** the health, comfort, safety, and equity of the people who build, use, and live near the building.
- **Economy:** the cost of the building over its whole life, including construction, operation, maintenance, and eventual removal, and its value to the owner and community.

The built environment matters for sustainability because buildings use energy for decades after construction, consume large quantities of materials, and shape how people live and travel. The *life-cycle view* treats the building as a sequence of stages: extracting and manufacturing materials, constructing, operating, maintaining, and finally demolishing or reusing. This chapter concentrates on the operating stage, which for most buildings has been the largest energy use. Chapter 20 turns to materials, and Chapter 21 to durability and reuse.

Sustainable design always involves trade-offs, because the three dimensions pull against each other. A feature that costs more initially may save money for decades, and the option best for the environment may not be the cheapest. Because trade-offs rest on value judgments, a sound design process states its criteria and weights openly. One way to do that is a *weighted decision matrix*, in which each option is scored on each criterion and the scores are multiplied by weights that reflect the owner's priorities.

**Worked example: three ways to heat the Riverbend multipurpose room.** The team compares a gas-fired rooftop unit (option A), an air-source heat pump designed for cold climates (option B), and a ground-source heat pump (option C). It scores each from 1 (poor) to 5 (excellent) on the three dimensions. The scores below are illustrative judgments, not measurements, and in a real project they would come from analysis.

| Option | Environment | Society | Economy |
|--------|-------------|---------|---------|
| A: Gas rooftop unit | 2 | 3 | 5 |
| B: Air-source heat pump | 4 | 4 | 4 |
| C: Ground-source heat pump | 5 | 4 | 2 |

The total score for each option is the sum of each score times its weight. With equal weights of one-third each, option A scores \( (2 + 3 + 5)/3 = 3.33 \), option B scores 4.00, and option C scores 3.67, so B wins. If the owner places 70 percent of the weight on economy and 15 percent on each of the other two, option A scores \( 0.15 \times 2 + 0.15 \times 3 + 0.70 \times 5 = 4.25 \) and wins, while B scores 4.00 and C scores 2.75. If the owner puts 60 percent on environment and 20 percent on each of the others, C scores \( 0.60 \times 5 + 0.20 \times 4 + 0.20 \times 2 = 4.20 \) and wins, with B at 4.00 and A at 2.80. The scores did not change, but three different weightings produced three different winners. The lesson is that the weights, which are an owner's values, drive the answer, so they should be agreed on before the design is judged.

!!! mascot-thinking "Sustainability Is a Weighing, Not a Label"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    When someone calls a building "sustainable," ask what was weighed against what. The word describes a set of balanced trade-offs, and the honest version of the claim names the criteria.

#### Diagram: Sustainability Trade-Off Explorer

<details markdown="1">
<summary>Sustainability Trade-Off Explorer</summary>
Type: chart
**sim-id:** sustainability-trade-off-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) alternative building systems against environment, society, and economy criteria and will justify (Bloom Level 5, Evaluate) how a change in the owner's priorities changes the best choice.

Visual: A radar chart with three axes labeled Environment, Society, and Economy, each from 0 to 5. Three polygons show the Riverbend heating options A, B, and C from the worked example. A bar chart beside the radar shows each option's weighted total. The layout stacks vertically on narrow screens. The chart is responsive and redraws on window resize, with a height of 460 px.

Controls: Three sliders set the weights for Environment, Society, and Economy. Moving one slider adjusts the others so the weights always sum to 100 percent. Three preset buttons set "Equal," "Cost first," and "Climate first" weights. A checkbox labeled "Edit scores" lets the student change any score from 1 to 5. A button labeled "Reset" restores the defaults.

Interactions: Hovering over a polygon vertex shows the option, dimension, and score. The bar chart's winner is highlighted and a one-sentence message states which option leads and by how much. A readout explains when the lead changes, for example "Option B leads until economy weight exceeds about 60 percent."

Colors: Option A orange, option B blue, option C green, with distinct line styles so the chart reads without color.

Implementation: Chart.js radar and bar charts with DOM sliders and a weighted-sum calculation recalculated on every change.
</details>

## Energy Efficiency

**Energy efficiency** is the delivery of the same useful service, such as a warm room or a lit classroom, with less energy input. It is different from *conservation*, which reduces the service itself by turning off lights or lowering a thermostat. An efficient building keeps its occupants comfortable while using less fuel and electricity, which lowers operating cost and operating emissions, and in a cold climate heating is usually the largest piece.

Designers pursue efficiency in a fixed order, and the order matters. The first step is to *reduce the load* by improving the enclosure, so that less heat leaks out in winter and less enters in summer. The second is to *meet the remaining load efficiently* with efficient equipment, such as heat pumps, efficient lighting, and heat recovery. The third is to *control* systems so they run only when needed, with occupancy sensors, setbacks, and daylight dimming. Only then does it make sense to supply the remaining demand from renewable sources, because every unit of load removed shrinks every system downstream, including the equipment, the wiring, and the solar array.

To estimate how much heat a surface loses over a heating season, engineers use *heating degree days* (HDD), a measure of how cold a place is. A degree day accumulates for each day by the number of degrees the average outdoor temperature falls below 65 °F, and the sum over a year is the HDD total. The annual heat loss through a surface is

\[ Q = \frac{A}{R} \times \text{HDD} \times 24 \]

where \( Q \) is the heat lost in Btu per year, \( A \) is the area in ft², \( R \) is the thermal resistance in ft²·°F·h/Btu, and the factor 24 converts days to hours. This is a simplified estimate that ignores solar and internal heat gains, but it shows the relationships clearly.

**Worked example: diminishing returns in roof insulation.** Take the 9,000 ft² Riverbend roof and an illustrative 7,500 HDD for Minneapolis. With R-10, the roof loses \( (9{,}000/10) \times 7{,}500 \times 24 = 162{,}000{,}000 \) Btu, or 162 million Btu (MMBtu) a year. With R-30 it loses 54 MMBtu, and with R-50, 32.4 MMBtu. The first 20 units of R save \( 162 - 54 = 108 \) MMBtu, but the next 20 save only \( 54 - 32.4 = 21.6 \) MMBtu. The reason is that heat loss depends on \( 1/R \), so each added layer removes a smaller share of what is left. Suppose gas costs \$10 per MMBtu and the furnace is 90 percent efficient. The extra 20 units of R save \( 21.6/0.9 = 24 \) MMBtu of gas, or about \$240 a year. If the added insulation costs \$1.50 per ft² (illustrative), or \$13,500, the simple payback is \( 13{,}500/240 \approx 56 \) years. Thicker insulation still has benefits beyond energy cost, such as comfort and lower peak loads, and the cost to add it later is high, so code and owner priorities decide the target. The calculation shows why a designer weighs each increment instead of assuming that more is always better.

!!! mascot-tip "Beau's Tip: Sanity-Check With the Degree-Day Formula"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When a salesperson or a model claims big savings from an envelope upgrade, run \( A/R \times \text{HDD} \times 24 \) for the old and new R-values on the back of an envelope. If the claimed savings exceed the difference you calculate, ask where the extra comes from.

#### Diagram: Insulation Diminishing Returns Explorer

<details markdown="1">
<summary>Insulation Diminishing Returns Explorer</summary>
Type: chart
**sim-id:** insulation-diminishing-returns-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) annual heat loss through a surface for different R-values and will explain (Bloom Level 2, Understand) why each added layer of insulation saves less than the one before.

Visual: A line chart with R-value (R-5 to R-60) on the horizontal axis and annual heat loss in MMBtu on the vertical axis. The curve falls steeply at low R and flattens at high R. A shaded vertical band between two chosen R-values shows the savings, and a table below the chart shows the heat loss, savings, gas cost, and simple payback. The chart is responsive with a height of 420 px and redraws on window resize.

Controls: Sliders for roof area (1,000 to 20,000 ft², default 9,000), heating degree days (4,000 to 9,000, default 7,500), gas price (\$5 to \$20 per MMBtu, default \$10), furnace efficiency (60 to 98 percent, default 90), and insulation cost per ft² per added R-20 (\$0.50 to \$4, default \$1.50). Two draggable markers set "current R" and "proposed R" on the curve, with defaults at R-30 and R-50.

Interactions: Hovering over the curve shows the R-value and the annual loss. The table updates as markers move. A message states "Payback exceeds the typical building life" when the simple payback is above 50 years.

Colors: The curve is blue, the savings band is green, and the markers are orange. All values are also shown as text.

Implementation: Chart.js with draggable annotation markers and DOM sliders, recalculating \( Q = (A/R) \times \text{HDD} \times 24 \) on each change.
</details>

## Operational Carbon

**Operational carbon** is the greenhouse gas emissions produced by the energy a building uses while it operates, expressed in carbon dioxide equivalent. It is the product of the energy used and an *emission factor*, which is the mass of emissions per unit of energy. Burning natural gas produces about 117 lb of carbon dioxide per MMBtu, a commonly used factor. Electricity has no fixed factor, since it depends on the grid's mix of coal, gas, nuclear, wind, solar, and hydropower, and the factor falls as the grid adds clean generation.

Return to the roof example: the extra 24 MMBtu of gas avoided each year amounts to about \( 24 \times 117 = 2{,}808 \) lb of carbon dioxide, or about 1.3 metric tons. Operational carbon is the counterpart of the *embodied carbon* of Chapter 20, which is emitted during manufacturing and construction. An efficient building cuts operational carbon directly, and electrifying heating with heat pumps cuts it further as the electric grid gets cleaner.

## High-Performance Buildings

**High-performance buildings** are buildings designed to perform substantially better than the code minimum on several measures at once, including energy use, comfort, indoor air quality, durability, and water use. They are defined by results and not by a single feature. The practices that produce them recur: an *integrated design process* that brings the engineers, owner, and contractor into the conversation early, in keeping with the delivery methods of Chapter 2; a compact form with a continuous, well-insulated, airtight enclosure; efficient and right-sized mechanical systems; controls that match operation to need; and *commissioning* to verify the result, as in Chapter 2. A high-performance design usually costs more to design but less to operate, so the owner's life-cycle view matters.

## Minnesota Energy Code

The **Minnesota Energy Code** is the part of the Minnesota State Building Code, introduced in Chapter 17, that sets minimum energy efficiency requirements for new buildings and major alterations. Minnesota treats commercial and residential buildings separately. The commercial code is typically based on the ASHRAE 90.1 standard or the commercial provisions of the International Energy Conservation Code (IECC), and the residential code is typically based on the IECC, each with Minnesota amendments and updated on the state's adoption schedule. Minneapolis lies in a cold climate zone of the IECC, labeled zone 6, so the code's insulation and window requirements are among the stricter in the country.

The code covers the building envelope (insulation levels, window performance, and air leakage), lighting power and controls, heating and cooling equipment efficiency, service water heating, and in many cases commissioning and ventilation. Because the edition and the amendments change over time, the designer confirms the version in force with the building official, as Chapter 17 taught.

## Energy Code Compliance

**Energy code compliance** is the process of showing that a design meets the energy code. There are usually two paths. In the *prescriptive path*, the design meets a list of minimum values for each component, such as roof insulation, wall insulation, and window performance, and the reviewer simply compares the drawings to the list. In the *performance path*, the designer builds an energy model and shows that the proposed building uses no more energy or energy cost than a reference building that meets the prescriptive values. The performance path allows trade-offs. A design with a large glazed wall, for example, can make up for it with better roof insulation or more efficient lighting.

Free tools published by the U.S. Department of Energy, such as COMcheck, help with the prescriptive and simple trade-off calculations. The compliance forms are submitted with the construction documents for plan review, and inspectors verify items in the field such as insulation installation and air barrier continuity, which are among the most commonly missed.

## Passive Solar Design

**Passive solar design** uses the building's form, orientation, windows, and materials to collect, store, and distribute the sun's heat, and to reject it when it is not wanted, without mechanical equipment. The main elements are south-facing glazing to admit winter sun, shading to block summer sun, *thermal mass* such as a concrete floor to store heat, and a compact, well-insulated enclosure that holds what is gained.

The sun's path in Minnesota makes this practical. At latitude 45° N, near Minneapolis, the noon sun stands about \( 90 - 45 - 23.5 = 21.5^\circ \) above the horizon on the winter solstice and about \( 90 - 45 + 23.5 = 68.5^\circ \) on the summer solstice. A fixed overhang can therefore shade a south window in summer and let sun in during winter. Consider a south window 6 ft tall. At 68.5° the overhang's shadow falls by \( P \tan 68.5^\circ \approx 2.54P \) for a projection \( P \), so a projection of \( 6/2.54 \approx 2.4 \) ft shades the whole window at summer noon. At 21.5° the same overhang casts a shadow only \( 2.4 \times \tan 21.5^\circ \approx 0.93 \) ft deep, leaving about 85 percent of the window in sun. East and west windows are harder to shade because the sun is low there, so designers limit them.

## Daylighting

**Daylighting** is the use of natural light to illuminate interior spaces so that electric lights can be turned off or dimmed. It saves lighting energy, reduces cooling load from lighting heat, and improves occupants' experience of a space. A common rule of thumb is that daylight from a side window usefully reaches about two times the window head height into the room, so a tall window lights a deeper space. A clerestory, which is a high band of windows, such as the one in the Riverbend multipurpose room, spreads light deeper while reducing glare.

Daylighting pays off only if the electric lighting responds. *Daylight harvesting* uses sensors that dim or switch off lights near windows when enough daylight is present, and these controls connect to the lighting systems of Chapter 16. Daylight also has costs. Glass loses more heat than an insulated wall, direct sun can cause glare, and large glazed areas can overheat a space, so designers balance glazing area against these effects.

## Cool Roofs

A **cool roof** has a surface that reflects a high share of sunlight and radiates absorbed heat efficiently, which keeps the roof cooler and reduces the heat that enters the building. A white membrane roof is a common example of the low-slope roof assemblies covered in Chapter 13. Cool roofs help most in cooling-dominated climates, and energy codes tend to require them in the warmest climate zones.

In Minnesota the benefit is smaller. The reflective surface also reflects winter sun that could have helped heating, snow covers the roof for much of the heating season, and the overall energy effect depends on the balance of cooling and heating loads, so the design team evaluates it for each building. Where a building has substantial summer cooling loads, a light-colored roof can reduce them and the roof's own temperature swings.

## Passive House

**Passive House** is a voluntary, performance-based standard for very low energy buildings, administered in the United States by the Passive House Institute US and internationally by the Passive House Institute. It rests on five principles: continuous and very high levels of insulation, airtight construction, high-performance windows, a ventilation system with heat or energy recovery, and minimizing thermal bridges, which are paths of high heat flow through the enclosure. The classic standard limits space heating demand to about 15 kWh per square meter per year and airtightness to about 0.6 air changes per hour at 50 Pa pressure, and the United States program adjusts its targets to the climate.

Passive House buildings can often be heated with a very small system because the enclosure loses so little heat. The enclosure is so tight that mechanical ventilation is essential, which brings us to a common mistake.

!!! mascot-warning "Watch Out: A Tight Building Needs Fresh Air"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    An airtight enclosure traps moisture and pollutants unless a ventilation system replaces stale air, as Chapter 4 explained for moisture and air movement. Always pair air sealing with balanced ventilation, ideally with heat recovery, and verify its flow during commissioning.

## Net-Zero Energy

A **net-zero energy** building produces as much renewable energy on or near the site over a year as it uses. The balance is annual, so the building still draws from the grid at night and in winter and exports power in summer. The route follows the efficiency order described above: first cut the load, then supply the rest from renewable sources, usually rooftop solar photovoltaic (PV) panels.

**Worked example: can Riverbend reach net zero on its own roof?** Suppose that a typical design has an energy use intensity (EUI), the annual energy per square foot, of 60 kBtu/ft² (illustrative). The annual use is \( 60 \times 9{,}000 = 540{,}000 \) kBtu, which is \( 540{,}000/3.412 \approx 158{,}000 \) kWh. In Minnesota, a PV array commonly produces about 1,200 to 1,300 kWh per installed kW each year, so assume 1,250 kWh/kW. The array must be \( 158{,}000/1{,}250 \approx 127 \) kW. At roughly 80 ft² of roof per kW (illustrative, including spacing), that needs about 10,100 ft² of roof, which is more than the entire 9,000 ft² roof. Now suppose efficiency measures cut the EUI to 30 kBtu/ft². The use falls to about 79,000 kWh, the array to about 63 kW, and the roof area to about 5,100 ft², which fits even after allowing for rooftop equipment. Efficiency first is therefore not only good practice. For a one-story building it decides whether net zero is possible at all.

#### Diagram: Net-Zero PV Balance Explorer

<details markdown="1">
<summary>Net-Zero PV Balance Explorer</summary>
Type: microsim
**sim-id:** net-zero-pv-balance-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the photovoltaic array size and roof area needed to offset a building's annual energy use and will analyze (Bloom Level 4, Analyze) how reducing energy use intensity changes the feasibility of net zero.

Visual: The left side shows a simplified roof plan of a one-story building with solar panels filling from one edge. A shaded zone represents rooftop equipment and unavailable roof area. The right side shows two bars, annual energy use and annual PV production, with a gap label in kWh. The canvas fills the container width, has a height of 480 px, and redraws on window resize.

Controls: A slider for building area (3,000 to 20,000 ft², default 9,000). A slider for energy use intensity (15 to 90 kBtu/ft² per year, default 60). A slider for PV yield (1,000 to 1,500 kWh per kW per year, default 1,250). A slider for roof area per kW (60 to 110 ft², default 80). A slider for the share of roof usable for PV (40 to 90 percent, default 70). A button labeled "Apply efficiency measures" lowers EUI to 30 and animates the change.

Interactions: Panels fill the roof as needed and turn red when the array does not fit. The message states "Net zero is feasible on this roof" or "Need X more ft² of PV area." Hovering over a bar shows the numbers behind it.

Colors: PV in blue, equipment zone in gray, use bar in orange, production bar in green. Every state is also written in text.

Implementation: p5.js with a responsive canvas, DOM sliders, and the arithmetic of the worked example recalculated on each change.
</details>

## Water Efficiency

**Water efficiency** is the reduction of the potable water a building uses by choosing efficient fixtures, efficient irrigation, and alternative sources such as collected rainwater. It matters for sustainability because water must be pumped, treated, and heated, and heating water is itself a large energy use. The most common measures are low-flow fixtures, such as toilets and faucets that carry the WaterSense label, landscaping that needs little or no irrigation, and metering that reveals leaks.

A small example shows the scale. Federal standards set a maximum of about 1.6 gallons per flush for toilets, and WaterSense models use about 1.28 gallons per flush or less. If the Riverbend restrooms see 120 flushes per day over 260 operating days, the efficient fixtures save \( 120 \times (1.6 - 1.28) \times 260 \approx 9{,}984 \) gallons a year (illustrative), plus the energy and the sewer charges that go with it.

## Green Building Rating Systems

**Green building rating systems** are voluntary programs that score a building against a list of sustainability criteria and award a level of recognition. They go beyond the code, which sets a legal minimum, by giving owners a framework and a way to demonstrate their achievement to the public. Examples include LEED, Green Globes, the Living Building Challenge, and the ENERGY STAR score for operating buildings. Some programs focus on a single topic, such as Passive House, which is a standard for energy, and others cover many topics at once.

In Minnesota, state-funded projects also use the state's own tools, such as the B3 program (Buildings, Benchmarks, and Beyond) and the Sustainable Building 2030 energy standard, which set energy targets for publicly funded buildings. Rating systems are only as good as the evidence behind the points, and a plaque does not guarantee low energy bills, so owners verify performance by measuring.

## LEED Certification

**LEED certification** is recognition under the Leadership in Energy and Environmental Design rating system of the U.S. Green Building Council. A project earns points in categories such as location and transportation, sustainable sites, water efficiency, energy and atmosphere, materials and resources, and indoor environmental quality, and must also meet certain prerequisites. The total points determine the level. The thresholds below are those used in recent versions, and the current version should be checked.

| Level | Points (of about 110) |
|-------|-----------------------|
| Certified | 40 to 49 |
| Silver | 50 to 59 |
| Gold | 60 to 79 |
| Platinum | 80 or more |

A third-party review confirms the documentation. Certification involves fees and documentation effort, which owners weigh against the value of recognition. Many of the strategies earn points in the energy and water categories that this chapter described, so a design team that has already pursued efficiency carries much of the work into a LEED application.

!!! mascot-celebration "You Can Take a Building Past Code"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now weigh sustainability trade-offs with an explicit decision matrix, estimate heat loss with the degree-day formula, size a solar array against a building's energy use, and explain how the Minnesota Energy Code, Passive House, and LEED each set a different bar. That is the toolkit for turning a code-minimum design into a high-performance one.

## Key Takeaways

- Sustainability weighs environment, society, and economy over a building's whole life. The weights reflect the owner's values, so they should be stated before options are judged.
- Energy efficiency delivers the same service with less energy, and the order is to reduce the load, meet it efficiently, control it, and then supply the rest with renewable energy.
- Heat loss through a surface follows \( Q = (A/R) \times \text{HDD} \times 24 \), which shows diminishing returns because savings depend on \( 1/R \).
- Operational carbon equals energy used times an emission factor, so efficiency and cleaner electricity both reduce it.
- The Minnesota Energy Code sets the minimum, and compliance is shown by the prescriptive path or by a performance model.
- Passive solar design, daylighting, and cool roofs use form, orientation, and surfaces to manage sun, and each has trade-offs in a cold climate.
- Passive House and net-zero energy are demanding targets, and both depend on an airtight, highly insulated enclosure with ventilation; for a one-story building, efficiency decides whether net zero fits on the roof.
- Water efficiency reduces water and the energy that heats it, and rating systems such as LEED recognize results beyond the code but do not replace measured performance.
