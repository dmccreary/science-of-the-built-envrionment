---
title: Electrical Distribution, Lighting, and Design Team Coordination
description: How the electrical designer sizes and documents wiring, lighting, low-voltage, and renewable systems, and coordinates them with the structural and mechanical disciplines through each project phase.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:03:33
version: 1.10
---

# Electrical Distribution, Lighting, and Design Team Coordination

## Summary

Wiring, lighting, low-voltage, and renewable systems, and how the electrical designer works with other disciplines through each project phase. It builds on the prerequisite concepts from Chapters 1, 2, 3, 6, 14, 15. After completing this chapter, students will be able to define, explain, and apply the 23 concepts listed below.

## Concepts Covered

This chapter covers the following 23 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Electrical Loads | 8 |
| Electrical Designer | 4 |
| Structural Engineer | 3 |
| Mechanical Engineer | 3 |
| Conductors | 3 |
| Low-Voltage Systems | 3 |
| Electrical Plans | 3 |
| Interdisciplinary Coordination | 2 |
| Lighting Systems | 2 |
| Photovoltaic Systems | 2 |
| Building Information Modeling | 1 |
| Building Automation | 1 |
| Fire Alarm Systems | 1 |
| Elevators | 1 |
| Conduit | 1 |
| Grounding and Bonding | 1 |
| Electrical Load Calculations | 1 |
| Lighting Controls | 1 |
| Receptacles | 1 |
| Data and Communications | 1 |
| One-Line Diagram | 1 |
| Electrical Design Phases | 1 |
| Electric Vehicle Charging | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 2: The Design and Construction Process](../02-design-construction-process/index.md)
- [Chapter 3: Forces, Heat, and the Physics of Buildings](../03-forces-heat-physics/index.md)
- [Chapter 6: Structural Loads and Load Paths](../06-structural-loads/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../14-hvac-plumbing-fire/index.md)
- [Chapter 15: Electrical Fundamentals and Building Service](../15-electrical-fundamentals/index.md)

---

!!! mascot-welcome "Where the Electrical Designer Fits"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    A building's electrical system is the one that touches every other system, which makes the electrical designer the person who talks to everyone. This chapter shows you how a design goes from a rough load estimate to drawings an electrician can build, and where it collides with beams, ducts, and pipes. Learn the conversation and you can join the team. Let's build it right!

Chapter 15 followed power from the utility to the outlet and gave you the physical ideas behind it. This chapter changes the question from "how does it work?" to "how is it designed, drawn, and coordinated?" It describes the people who produce the design, the loads they count, the wiring and equipment they select, the specialized systems they add, and the way their work fits among the structural, mechanical, and architectural disciplines. As in earlier chapters, the Riverbend Youth Center from Chapter 2 is the running example, and its figures are illustrative.

The course description limits electrical design to an introductory level, so the calculations in this chapter are simplified. They show the logic of the design work and are not a substitute for the full procedures of the National Electrical Code (NEC).

## The Electrical Designer

An **electrical designer** is the member of the project team who plans the building's electrical systems, calculates their loads, selects and locates the equipment, and documents the result in drawings and specifications. Depending on the firm and the project, the designer may work alone or under a licensed *electrical engineer*, who takes professional responsibility for the design and whose seal appears on the drawings where the law requires one. The electrical designer works within an engineering firm, an architectural firm, or a contractor's design-build team.

The designer's responsibilities fall into the categories below.

- **Power distribution:** service size, switchboards, panelboards, feeders, and branch circuits (Chapter 15).
- **Lighting:** fixtures, layouts, and controls.
- **Special systems:** fire alarm, data and communications, security, and renewable energy.
- **Documentation:** drawings, schedules, and Division 26 specifications (the electrical division of the specifications from Chapter 1).
- **Coordination and construction support:** meetings with other disciplines, submittal review, answers to requests for information, and field observation.

**Worked example: one change, many consequences.** During design development (Chapter 2), the Riverbend owner asks to add a 12 kW electric oven to the kitchen. The designer's first question is whether the existing service can carry it. Applying an illustrative 70 percent demand factor adds \( 12 \times 0.70 = 8.4 \) kVA, bringing the total demand to about 67.7 kVA, which at 208 V three-phase is about 188 A, or 94 percent of a 200 A service. The service is adequate, but with little margin. The oven's own circuit draws \( 12{,}000/(1.732 \times 208) \approx 33 \) A, so the designer specifies a 40 A, three-pole breaker and conductors sized for it, finds a space in a panelboard, and updates the panel schedule and one-line diagram. The change also affects other disciplines. The mechanical engineer must add the oven's heat to the kitchen cooling load and size the exhaust hood, and the architect must confirm that the wall and floor have room for the conduit and a disconnect switch. A single line in an owner's email therefore changes at least four drawings and three consultants' calculations, which is why the designer's real skill is tracking consequences.

### Electrical Design Phases

The **electrical design phases** are the stages of electrical work that parallel the project phases in Chapter 2. At each stage, the designer produces a deliverable matched to the level of detail the team has reached. The table below summarizes the stages, and each deliverable it names is explained later in the chapter.

| Project phase | Electrical designer's work | Typical deliverable |
|---------------|----------------------------|---------------------|
| Programming | Learn special power needs | List of loads and requirements |
| Schematic design | Estimate service size, meet the utility, locate the electrical room | Load estimate, service request |
| Design development | Choose systems, locate panels, lay out lighting | One-line diagram, preliminary plans |
| Construction documents | Complete plans, schedules, details, and specifications | Stamped drawings, Division 26 |
| Bidding and procurement | Answer bidders' questions | Addenda |
| Construction | Review submittals, answer requests for information, observe | Responses, field reports |
| Commissioning | Verify controls and lighting operate as designed | Functional test reports |
| Occupancy and closeout | Review record drawings and training | Record documents |

The phases matter because the cost of changing a design rises with each phase, as Chapter 2 explained. The most valuable electrical decisions, such as the location and size of the electrical room, the service voltage, and the space for risers, are made in the first two design phases, when they cost almost nothing. A designer who delays them can find that the electrical room has been allocated to a closet.

#### Diagram: Electrical Design Phase Timeline

<details markdown="1">
<summary>Electrical Design Phase Timeline</summary>
Type: timeline
**sim-id:** electrical-design-phase-responsibility-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Learning objective: Students will describe (Bloom Level 2, Understand) the electrical designer's deliverables in each of the eight project phases and will identify (Bloom Level 1, Remember) the other disciplines with whom the designer coordinates at each stage.

Visual: A horizontal timeline with the eight project phases as consecutive blocks. Above the line, one row per discipline (architect, structural engineer, mechanical engineer, electrical designer, contractor, utility). Colored bars show when each discipline is most active.

Controls: A filter drop-down labeled "Show discipline" lets the learner focus on one row. A toggle labeled "Show handoffs" draws arrows between phases and disciplines, such as "load data from mechanical to electrical." A slider labeled "Time of change" places a marker at any phase.

Interactions: Hovering over a phase block shows its main question. Clicking a block opens an infobox listing the electrical designer's tasks, the deliverables, and the coordination meetings that occur in that phase. Moving the "Time of change" marker displays a relative cost of changing the kitchen oven example (low in schematic design, high after the conduit is installed), reinforcing the cost-of-change idea from Chapter 2.

Colors: Each discipline has a unique color and a unique line pattern. All text labels are high contrast.

Responsive design: The timeline follows the container width and redraws on window resize. Height is 460 px.

Implementation: vis-timeline with custom item templates, click handlers that populate an infobox div, and a filter that updates the visible groups.
</details>

## The Design Team

The electrical system is only one of several systems competing for the same limited building volume. The best way to see how the disciplines relate is to look at what each needs from the others.

### Structural Engineer

A **structural engineer** is a licensed engineer who designs the building's structural system, including the foundations, frame, and floors, so that it safely carries the loads described in Chapter 6. The electrical designer works with the structural engineer on four issues. First, electrical equipment adds weight, since a transformer or generator can weigh thousands of pounds and needs a pad or a reinforced floor, and rooftop photovoltaic panels add load to the roof. Second, wiring must pass through the structure, and holes cut in beams, joists, and slabs can weaken them. Third, conduit embedded in a concrete slab occupies space inside it, and codes commonly limit its size to a fraction of the slab thickness. Fourth, suspended equipment such as lighting needs verified attachment points. In Riverbend, the glued-laminated beams over the 40 ft multipurpose room must never be drilled or notched without the structural engineer's approval, so the designer routes conduit beside the beams or through sleeves located on the drawings.

!!! mascot-warning "Watch Out: Never Drill a Structural Member"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A hole in the wrong place in a beam or joist can cut the capacity the engineer counted on, and the damage is hidden behind the finish. Ask the structural engineer to approve every penetration on the drawings, and show approved sleeves and cores before the concrete or framing goes in.

### Mechanical Engineer

A **mechanical engineer** is a licensed engineer who designs the HVAC, plumbing, and (often) fire protection systems described in Chapter 14. Mechanical equipment is among the largest electrical loads in a building, so the two disciplines exchange information constantly. The mechanical engineer provides an *equipment schedule* listing every motor, fan, pump, boiler, and compressor with its voltage, phase, and electrical demand. Nameplates commonly state the *minimum circuit ampacity* (MCA), the smallest conductor rating allowed, and the *maximum overcurrent protection* (MOCP), the largest breaker allowed. The electrical designer uses those two numbers to select wire and breaker for each piece of equipment. The two also share responsibilities in fire protection and controls, where HVAC fans must shut down when the fire alarm sounds. Lighting and transformers give off heat that adds to the cooling load, so the mechanical engineer needs the lighting power and equipment losses from the electrical designer.

### Interdisciplinary Coordination

**Interdisciplinary coordination** is the process by which the design disciplines compare their drawings, resolve conflicts, and agree on who occupies which space, so that the systems fit together in the finished building. Its most common problems are physical clashes. A duct cannot occupy the same space as a beam, a cable tray, and a recessed light. Coordination happens in regular meetings, by exchanging drawings or models, by overlaying systems in a *reflected ceiling plan* (a view looking up at the ceiling, showing everything in it), and by resolving requests for information during construction.

A useful rule is the order in which the systems claim space. Gravity-drained pipes need a continuous slope and cannot bend around obstructions, so they take priority. Large ducts come next because they are expensive to resize, followed by pressurized pipes, cable trays, and finally conduit and small wiring, which can be routed around almost anything. Electrical work therefore often yields in a conflict, but only when the designer has made sure there is still a path.

!!! mascot-thinking "The Ceiling Is a Shared Parking Lot"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the space above the ceiling as a parking lot with a first-come, first-served rule and no marked spaces until someone draws them. Every system needs a spot, and the only way to avoid a crash is to decide who parks where before the work starts.

### Building Information Modeling

**Building information modeling** (BIM) is the practice of creating a digital three-dimensional model of a building in which each element carries data, such as its size, material, manufacturer, and connections. The architect, structural engineer, mechanical engineer, and electrical designer each build their own part of the model, and the parts are combined. Software then performs *clash detection*, which automatically identifies elements that occupy the same space, such as a cable tray passing through a duct. Finding such a clash on a computer costs an hour of redrawing, and finding it on site costs a change order. BIM also supports quantity takeoffs and, afterward, facility management. This book does not teach BIM software, but it is useful to know that the coordination drawings an electrician receives are often extracted from a model.

#### Diagram: Ceiling Coordination Clash Explorer

<details markdown="1">
<summary>Ceiling Coordination Clash Explorer</summary>
Type: microsim
**sim-id:** ceiling-coordination-clash-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) a ceiling cross-section to find clashes among structure, ducts, pipes, cable tray, and lights, and will propose (Bloom Level 6, Create) a routing that resolves them according to the priority order of systems.

Visual: A cross-section of a ceiling space under a roof, showing two glued-laminated beams, a large rectangular supply duct, a sloped drain pipe, a cable tray, a row of recessed light fixtures, and a ceiling grid. A scale indicates the available depth in inches. Elements that overlap are drawn with a red outline.

Controls: A "Show system" checkbox for each of structure, duct, plumbing, electrical, and lighting. Each element can be dragged up, down, or sideways within the cross-section. A slider labeled "Duct depth (in)" from 8 to 24 and a slider labeled "Ceiling height (ft)" from 8 to 12. A button labeled "Run clash check."

Interactions: Dragging an element updates the clash display in real time and updates a counter of the number of clashes. Hovering over a clash shows a message such as "Duct intersects beam: raise the duct or use a smaller duct." Clicking "Run clash check" lists the clashes and states the recommended order for resolution (gravity pipe, then large duct, then pressure pipe, cable tray, conduit). When no clashes remain, the status line displays "Coordinated: all systems fit with clearance."

Colors: Structure in brown, ducts in blue, plumbing in green, electrical in orange, lighting in yellow, and clashes in red. Each system also has a distinct line pattern.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createCheckbox, createSlider, and createButton controls, and rectangle intersection tests for clash detection.
</details>

## Electrical Loads

An **electrical load** is any device or piece of equipment that consumes electrical power, and the term also names the amount of power it demands, measured in volt-amperes (VA) or kilovolt-amperes (kVA). Everything in the building that plugs in or is hard-wired is a load: lights, receptacles and the devices plugged into them, motors, heaters, elevators, kitchen equipment, and electronics. The designer's central task is to count them, because the loads decide the size of every conductor and every piece of equipment from the branch circuit to the service.

Two ideas make the count realistic. The *connected load* is the sum of all the nameplate ratings, as if everything ran at once. The *demand load* is what the system is expected to carry at its peak, which is smaller because not everything runs at the same time. The ratio between them is the *demand factor*. A second idea is the *continuous load*, any load expected to run for three hours or more, such as lighting. The code requires equipment feeding continuous loads to be sized at 125 percent of that load, which is the 80 percent rule of Chapter 15 seen from the other side. Loads are grouped by type, because the code treats each type differently: lighting, receptacles, HVAC and other motors, kitchen equipment, and special loads such as elevators and EV chargers.

**Worked example: the Riverbend demand load.** The table below applies illustrative values to the four main groups of loads in the Riverbend Youth Center. The demand factors are chosen to show the method, and the code's actual factors depend on the load type.

| Load group | Connected load | Factor applied | Demand load |
|------------|----------------|----------------|-------------|
| Lighting (9,000 ft² at 1.0 VA/ft²) | 9,000 VA | 125 percent (continuous) | 11,250 VA |
| Receptacles (60 at 180 VA each) | 10,800 VA | First 10,000 VA at 100 percent, remainder at 50 percent | 10,400 VA |
| HVAC equipment | 25,000 VA | 100 percent | 25,000 VA |
| Kitchen equipment | 18,000 VA | 70 percent (illustrative) | 12,600 VA |
| **Total** | **62,800 VA** | | **59,250 VA** |

The total demand of 59,250 VA, or about 59 kVA, corresponds to a current of \( 59{,}250/(1.732 \times 208) \approx 164 \) A at 208 V three-phase. That fits within a 200 A service, whose capacity is about 72 kVA, with about 18 percent spare capacity for future growth. The preliminary 72 kVA estimate in Chapter 15 was a rule of thumb, and this count refines it. The lesson is that the demand load, not the connected load, determines the service size.

### Electrical Load Calculations

**Electrical load calculations** are the step-by-step procedure by which a designer converts a list of loads into the sizes of conductors, breakers, panelboards, and the service. The method used in the Riverbend example follows five steps, listed below.

1. List every load by type, with its voltage and phase.
2. Convert each load to VA, using nameplate data, or standard code values per square foot or per receptacle.
3. Apply the code's demand and continuous-load factors to each group.
4. Sum the demand loads and convert the total to amperes at the service voltage.
5. Round up to the next standard equipment size and check voltage drop and available fault current.

The NEC provides both a *standard method* and an *optional method* for these calculations, with detailed factors that vary by occupancy. Because the course description treats detailed load calculations as beyond the introductory level, you do not need to memorize these tables. You do need to know why the calculation exists and how its result feeds the other disciplines. A load calculation done early guides the utility's transformer order, and one done at the end proves to the inspector that the equipment is adequate.

## One-Line Diagram and Electrical Plans

### One-Line Diagram

A **one-line diagram** (also called a single-line diagram) is a simplified drawing of an electrical power system in which a single line represents a group of conductors, and standard symbols represent equipment such as transformers, breakers, switchboards, and panelboards. Instead of drawing three phases and a neutral, the drawing uses one line, which makes the whole distribution system fit on a single sheet. It reads from the source at the top or left to the loads at the bottom or right, and each device is labeled with its rating, such as "400 A main breaker" or "225 A panel LP-1, 208Y/120 V."

The one-line diagram is the designer's backbone document. The utility uses it to understand the service, the inspector uses it to check protection, and the electrician uses it to build in the correct order. It also shows, at a glance, whether a feeder is protected by a breaker no larger than the wire allows.

#### Diagram: One-Line Diagram Symbol Explorer

<details markdown="1">
<summary>One-Line Diagram Symbol Explorer</summary>
Type: infographic
**sim-id:** one-line-diagram-symbol-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will interpret (Bloom Level 2, Understand) a one-line diagram by identifying symbols and ratings, and will trace (Bloom Level 3, Apply) the path and protection for a chosen load.

Visual: A one-line diagram of the Riverbend Youth Center electrical system showing the utility transformer, meter, 200 A main breaker, main distribution panel, a feeder to lighting panel LP-1, a feeder to mechanical panel MP-1, a 40 A three-pole breaker serving the kitchen oven, and an automatic transfer switch with an emergency lighting circuit. A legend lists the symbols.

Controls: A drop-down labeled "Trace load" with options such as kitchen oven, classroom lighting, rooftop unit, and emergency lights. A checkbox labeled "Show ratings" and a checkbox labeled "Show wire sizes." A button labeled "Trip main breaker."

Interactions: Hovering over any symbol shows its name. Clicking a symbol opens an infobox with a definition, what the symbol stands for in a real room, and the rating shown. Choosing a load highlights the path from the utility to that load and lists each device in order. Pressing the trip button de-energizes all downstream devices and highlights the emergency circuit, which remains lit through the transfer switch.

Colors: Energized lines in green, de-energized lines in dark gray, highlighted paths in orange, with symbols labeled in text.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createCheckbox, and createButton controls.
</details>

### Electrical Plans

**Electrical plans** are the scaled drawings, usually on sheets numbered with the prefix E, that show where electrical equipment and devices are located and how they are connected. A typical set includes a *site plan* showing the service and exterior lighting, *power plans* showing receptacles and equipment connections, *lighting plans* showing fixtures and switches, the one-line diagram, *panel schedules*, and *detail sheets*. A *legend* explains each symbol and an *abbreviation list* defines the notes.

The plans follow common reading conventions. A receptacle is a small symbol on a wall. A line with arrowheads that extends from a device toward a panel is a *home run*, which carries the circuit to its panelboard. A label next to a device such as "LP-1-7" means panel LP-1, circuit 7, so the electrician can find the breaker. The plans work only when they agree with the architectural, structural, and mechanical sheets, which is why coordination meetings are held before they are released.

!!! mascot-tip "Beau's Tip: Read the Home Runs"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    To check any outlet on a plan, find its circuit label, such as LP-1-7, and then look up circuit 7 on panel LP-1's schedule. If the load on the schedule does not match the room, you have found an error on paper before it becomes an error in the wall.

## Wiring Methods

### Conductors

A **conductor** is a wire or cable, made of a metal that carries current easily, that serves as the path for electricity in a circuit. Building conductors are almost always copper or aluminum. Aluminum is lighter and cheaper but has higher resistance for a given size, so it is common in large feeders, where the savings are significant. Wire sizes follow the American Wire Gauge for small sizes and a *kcmil* (thousand circular mils) scale for the largest, and the insulation is rated for temperature and moisture. A common insulation designation is THHN/THWN-2, a thermoplastic that works in dry and wet locations.

The size of a conductor is set by several checks, which Chapter 15 introduced. It must be large enough that its *ampacity* exceeds the load current after any code adjustments, and the voltage drop must stay acceptable. Ampacity is reduced when many conductors share a conduit or when the ambient temperature is high. Conductor colors follow convention. Neutrals are white or gray, equipment grounds are green or bare, and the phase conductors in a 208 V system are conventionally black, red, and blue, while 480 V systems conventionally use brown, orange, and yellow.

### Conduit

**Conduit** is a tube, usually metal or plastic, that protects conductors from damage and routes them through a building. Common types are *EMT* (electrical metallic tubing, a thin-wall steel tube used indoors), *rigid metal* conduit for harsher conditions, *PVC* for underground and wet locations, and *flexible metal* conduit for the final connection to vibrating equipment. Where many circuits travel together, a *cable tray*, an open metal ladder or trough, is used instead of individual conduits.

Codes limit how much a conduit can hold, so that wires have room to be pulled in and can shed heat. In most cases, the conductors may fill no more than about 40 percent of the conduit's cross-section, which means a half-inch EMT commonly holds about nine 12 AWG conductors. Conduit also limits how much it can bend between pull points, commonly four quarter bends. Underground conduit is buried deep enough to avoid damage from digging, commonly 18 to 24 inches, and it must be sealed where it enters a building, because a cold-climate conduit can carry moist outdoor air or groundwater into a warm electrical room. The designer must therefore coordinate the routes with the foundation and enclosure systems of earlier chapters.

### Grounding and Bonding

**Grounding** is the connection of an electrical system to the earth, and **bonding** is the connection of all the metal parts of the system to one another. The two work together but do different jobs. Grounding limits the voltage that lightning or utility surges can place on the system and holds the system near earth potential. Bonding makes all exposed metal, such as enclosures, conduits, and equipment frames, electrically continuous, so that a fault finds a low-resistance path back to the source.

The building's *grounding electrode system* connects the electrical system to the earth through ground rods, buried metal water pipe, and, where available, the steel reinforcement in a concrete footing, called a *concrete-encased electrode*. The footings and foundations of Chapter 10 therefore play an electrical role, so the electrical designer must coordinate with the structural engineer and the contractor before the concrete is poured. At the service entrance, a *main bonding jumper* ties the neutral to the ground, and this connection occurs only there.

**Worked example: why bonding makes the breaker trip.** Suppose a hot wire loosens and touches a metal equipment enclosure. If the enclosure is bonded with a good equipment grounding conductor, with a total resistance of about 0.5 ohm, the fault current is \( 120/0.5 = 240 \) A. A 20 A breaker trips almost instantly on that surge, and the enclosure is de-energized. If the enclosure were connected only to a ground rod with 25 ohms of resistance, the current would be only \( 120/25 = 4.8 \) A, far below the breaker's trip point, so the enclosure would stay energized at a dangerous voltage. Bonding, not the earth connection, is what trips the breaker.

### Receptacles

A **receptacle** is a socket in a wall, floor, or ceiling into which a plug connects to deliver power to a portable device, commonly called an outlet. The ordinary general-purpose receptacle is rated 15 or 20 A at 120 V, and a 20 A receptacle has a T-shaped slot that accepts either plug. Codes require special types in certain places. *GFCI* receptacles, which trip when a few milliamperes leak to ground, are commonly required near water, such as kitchens, restrooms, and outdoors. *Tamper-resistant* receptacles, which have shutters that block objects other than plugs, are commonly required in schools and child care facilities such as Riverbend's classrooms. Outdoor receptacles must be weather-resistant and have covers that protect them even while a cord is plugged in.

The designer chooses the type, the number, the circuit, and the mounting height. Accessibility guidelines commonly place receptacles between 15 and 48 inches above the floor so that people using wheelchairs can reach them (Chapter 17).

## Lighting

### Lighting Systems

A **lighting system** is the combination of luminaires (complete light fixtures), lamps or light-emitting diode (LED) modules, drivers, controls, and wiring that provides light for seeing and working. Today almost all new lighting uses LEDs, which produce more light per watt than older sources and last far longer. Lighting design is measured in a few standard quantities. A *lumen* is a measure of the total light a source emits, and a *footcandle* is one lumen falling on one square foot. *Efficacy* is lumens per watt, and *color temperature* in kelvins describes whether a light looks warm (about 2,700 K) or cool (about 5,000 K). Energy codes also limit the *lighting power density*, the watts of lighting per square foot (Chapter 19).

**Worked example: the lumen method for a classroom.** The lumen method estimates how many luminaires a room needs. Suppose a 600 ft² Riverbend classroom needs an average of 40 footcandles at the desks (an illustrative target). The light that must reach the work surface is \( 40 \times 600 = 24{,}000 \) lumens. Not all the light a fixture emits reaches the desks, since some is absorbed by walls and ceilings, and light output falls as fixtures age and dust collects. A *coefficient of utilization* of 0.70 and a *light loss factor* of 0.80, both illustrative, account for those effects, so the fixtures must emit \( 24{,}000/(0.70 \times 0.80) \approx 42{,}900 \) lumens. A luminaire that emits 4,000 lumens would be needed in a quantity of \( 42{,}900/4{,}000 \approx 10.7 \), rounded up to 11. At 35 W each, the room uses \( 11 \times 35 = 385 \) W, or 0.64 W/ft², which is below the roughly 1 W/ft² that energy codes commonly allow for classrooms, so the design meets the energy limit with margin.

#### Diagram: Lighting Lumen Method Calculator

<details markdown="1">
<summary>Lighting Lumen Method Calculator</summary>
Type: microsim
**sim-id:** lighting-lumen-method-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the number of luminaires a room requires using the lumen method, and will evaluate (Bloom Level 5, Evaluate) the resulting lighting power density against a target value.

Visual: A plan view of a room with a grid of luminaires. A side panel shows the calculation steps with live numbers: target footcandles, room area, light needed at the work surface, losses, luminaires required, total watts, and lighting power density in watts per square foot. A color overlay shows the estimated illuminance across the room, from dim to bright.

Controls: A slider for room length (10 to 60 ft), a slider for room width (10 to 40 ft), a drop-down for room type (classroom, office, corridor, multipurpose) that sets a default target illuminance, a slider for target footcandles (10 to 80), a slider for luminaire lumens (2,000 to 8,000), a slider for luminaire watts (15 to 80), a slider for coefficient of utilization (0.4 to 0.9), and a slider for light loss factor (0.6 to 1.0). A "Power density limit" slider sets a comparison limit between 0.5 and 1.5 W/ft².

Interactions: Changing any control updates the number of luminaires, the grid layout, the overlay, and the lighting power density. A message states "Within limit" or "Over the limit: choose a more efficient luminaire." Hovering over a step in the calculation panel shows its definition.

Colors: Overlay from dark blue (dim) through yellow to white (bright). Compliance is shown in green or red with a text label.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createSelect controls, and a simple uniform-illuminance calculation.
</details>

### Lighting Controls

**Lighting controls** are the switches, dimmers, sensors, and software that turn lights on and off or adjust their output to match need. The simplest control is a manual switch. More capable controls include *dimmers*, which reduce light output and power, *occupancy sensors* that turn lights off when a room is empty, *daylight sensors* that dim electric light near windows, and *time clocks or networked controls* that follow a schedule. Energy codes commonly require automatic shutoff and daylight-responsive control in many commercial spaces, so controls are part of code compliance as well as convenience. The designer must also keep emergency lighting energized when normal power fails, and must therefore connect it ahead of the controls so that no switch or sensor can turn it off.

## Low-Voltage and Life-Safety Systems

### Low-Voltage Systems

**Low-voltage systems** are electrical systems that operate at 50 V or below, or at limited power, to carry signals and small amounts of power rather than to supply large loads. Their conductors are thin, their hazards are low, and their installation rules are different from those for power wiring. They include data and communications, fire alarm, security and access control, audio and video, and the control wiring of building automation. Low-voltage cables are generally kept separate from power conductors, to avoid electrical interference and to keep a fault in the power system from reaching the signal system. The electrical designer often designs the pathways, such as conduit and cable tray, and the power supplies, and then specialty consultants and contractors design and install the devices.

### Data and Communications

**Data and communications** systems carry computer networks, telephones, and wireless signals through a building. The wiring is called *structured cabling*, with a standard layout in which twisted-pair copper cable (such as Category 6) runs from outlets in each room to a *telecommunications room*, where network equipment is mounted in racks. Copper links of this type are limited to about 328 feet (100 meters), so large buildings need several telecommunications rooms linked by fiber-optic cable. Many devices, including wireless access points and cameras, receive power over the same network cable, a technology called *power over Ethernet* (PoE). The designer must reserve rooms of adequate size with cooling and power, and conduit pathways. The size and location of the telecommunications room is among the decisions that must be made during schematic design.

### Fire Alarm Systems

A **fire alarm system** is an electrical system that detects a fire, warns the occupants, and signals other building systems and the fire department. It has three groups of parts. *Initiating devices*, such as smoke detectors, heat detectors, manual pull stations, and sprinkler flow switches (Chapter 14), sense the fire. The *fire alarm control panel* receives the signals and decides what to do. *Notification appliances*, such as horns, speakers, and strobe lights, alert the occupants, and the strobes serve people who cannot hear.

The panel also issues commands to other systems. It shuts down air handlers, closes smoke dampers, recalls elevators to the ground floor, and releases door locks on exit paths. Its power comes from the building, with a battery backup sized to run the system for hours and then sound the alarm. The system is *supervised*, meaning that the panel detects a cut wire or a dead battery and reports a trouble signal. Fire alarm design follows NFPA 72 and the building code, and the final system must be tested and accepted by the fire marshal, as part of the inspection and certificate-of-occupancy process described in Chapter 17.

### Building Automation

**Building automation** is a network of sensors, controllers, and software that monitors and controls the building's mechanical and electrical systems, so that they operate together according to schedules and setpoints. A thermostat is the simplest example. A building automation system extends the idea to hundreds of points. It can start the fans at six in the morning, lower the temperature setpoint on a night schedule, dim the lights when daylight is available, and send an alert when a pump fails. Devices from different manufacturers commonly share data through open communication standards such as BACnet. Automation saves energy and provides records, and it must be tested during commissioning (Chapter 2) to verify that every sequence works as the designers intended.

### Elevators

An **elevator** is a vertical transportation system, a car in a hoistway moved by an electric motor, that carries people and goods between floors. The two common types are *traction* elevators, where the car hangs from cables over a motor-driven sheave, and *hydraulic* elevators, where a pump pushes a piston. The electrical designer provides the power feeder, usually three-phase at 480 V, and a lockable disconnect switch near the equipment, and also provides lighting and receptacles in the machine room and the pit. A 25 horsepower motor draws on the order of 34 A at 460 V, a significant load in a mid-rise building.

Elevators must be coordinated with the fire alarm and the emergency power systems. On an alarm, the elevator is recalled to a designated floor and held there for firefighters, and a standby generator commonly powers at least one car during an outage. The equipment is also heavy and needs structural support in the hoistway and machine space. Riverbend is a one-story building and has no elevator, but any multi-story addition would introduce one.

## Renewable and Emerging Loads

### Photovoltaic Systems

A **photovoltaic** (PV) **system** is an electrical system that converts sunlight directly into electricity using solar panels. The main parts are the *modules* (panels), which produce direct current; the *inverter*, which converts it to alternating current at the building's voltage; the racking and wiring; and the disconnects and meters. Code requires a *rapid shutdown* feature that quickly de-energizes the conductors on the roof so that firefighters are not exposed to a live array. The system connects to the utility under an interconnection agreement, and the utility's rules determine how surplus power is credited.

Cold-climate details matter. Panels produce more voltage in cold weather, so the designer must make sure the inverter's maximum voltage is not exceeded on the coldest morning. Snow covers modules for part of the winter, and the roof must carry the weight of both the array and the snow (Chapter 6), and every roof penetration for the mounting hardware must be flashed (Chapter 13).

**Worked example: a rooftop array for Riverbend.** Assume an illustrative array of 75 modules of 400 W each, so the DC rating is \( 75 \times 400 = 30 \) kW. Each module covers about 21 ft², so the array occupies roughly \( 75 \times 21 = 1{,}575 \) ft², or about 18 percent of the 9,000 ft² roof. Upper Midwest sites commonly produce on the order of 1,200 to 1,400 kWh per kW of array per year, so taking 1,300 as an illustration gives \( 30 \times 1{,}300 = 39{,}000 \) kWh per year. The weight of modules and racking, on the order of 3 psf, is small compared with snow load, but the structural engineer must still approve it, especially over the 40 ft glulam span.

### Electric Vehicle Charging

**Electric vehicle (EV) charging** is the supply of electricity to the batteries of electric vehicles through *electric vehicle supply equipment* (EVSE), the chargers and their wiring. Charging comes in three levels. *Level 1* uses an ordinary 120 V outlet at about 1 to 2 kW. *Level 2* uses a 208 or 240 V circuit at several kilowatts, typically 6 to 19 kW, and suits workplaces and homes. *DC fast charging* supplies direct current at tens or hundreds of kilowatts from a dedicated three-phase supply. Because charging runs for hours, the NEC treats an EV charger as a continuous load, so its circuit is sized at 125 percent of the charger's current. A charger delivering 32 A needs a 40 A circuit. Codes use the terms *EV-capable* (conduit and space for future chargers), *EV-ready* (a circuit installed to the location), and *EV-installed* (the charger itself).

**Worked example: will four chargers fit?** Suppose the owner of Riverbend wants four Level 2 chargers delivering 32 A each at 208 V. Each draws \( 32 \times 208 = 6{,}656 \) VA, so four draw 26,624 VA. Earlier, Riverbend's demand load was 59,250 VA, and a 200 A service at 208 V three-phase has a capacity of about 72,050 VA, leaving only about 12,800 VA of headroom. The four chargers do not fit at full power. The designer has three options: upgrade to a 400 A service, install fewer chargers, or use an *energy management system* that limits the chargers' combined output to the available headroom, which slows charging when the building is busy. A 36 kWh charging session at 6.66 kW takes about 5.4 hours, which suits a vehicle parked during an evening event.

#### Diagram: Service Headroom for Solar and EV Loads

<details markdown="1">
<summary>Service Headroom for Solar and EV Loads</summary>
Type: chart
**sim-id:** service-headroom-ev-pv-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) whether a service has capacity for added EV chargers and will justify (Bloom Level 5, Evaluate) a choice among upgrading the service, reducing the number of chargers, or using load management.

Visual: A stacked horizontal bar showing the service capacity in kVA, with segments for lighting, receptacles, HVAC, kitchen, and EV chargers, and a vertical line at the service capacity. A second bar shows annual solar production in kWh next to the building's illustrative annual use.

Controls: A drop-down labeled "Service size" (100, 200, 400, 600 A) with a toggle for 208 V or 480 V. A slider for number of EV chargers (0 to 12), a slider for charger current (16 to 80 A), a checkbox labeled "Use load management," and a slider for PV array size (0 to 100 kW).

Interactions: Changing any control updates the bar and the readouts. When the total demand exceeds the service capacity, the EV segment turns red and the status line reads "Service overloaded: choose a larger service, fewer chargers, or load management." Turning on load management caps the EV segment at the headroom and displays the per-vehicle charging power. Hovering over any segment shows its VA and current.

Colors: Lighting in yellow, receptacles in blue, HVAC in green, kitchen in orange, EV in purple, overload in red. Segments are labeled with text and use different hatch patterns.

Responsive design: The chart follows the container width and redraws on resize. Height is 420 px.

Implementation: Chart.js stacked bar chart with annotation lines and custom tooltips.
</details>

!!! mascot-celebration "You Can Follow the Electrical Design Through"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now count a building's loads and turn them into a service size, read a one-line diagram and a set of electrical plans, explain why bonding trips a breaker, and describe how the electrical designer coordinates with the structural and mechanical engineers in every project phase. That is the working knowledge of the profession, and everything later in the book, from codes to energy, builds on it.

## Key Takeaways

- The electrical designer plans the system, counts the loads, selects the equipment, and documents the result, with a licensed engineer responsible where the law requires. Electrical design phases parallel the project phases, and the earliest decisions about service, rooms, and space are the cheapest to make.
- The structural engineer, mechanical engineer, and electrical designer compete for the same space and must coordinate. Gravity pipes, large ducts, and pressure pipes generally take priority over cable tray and conduit, and BIM clash detection finds conflicts before construction.
- Service size is set by the demand load, not the connected load. A load calculation lists loads, converts them to VA, applies demand and continuous-load factors, sums them, and rounds up to the next standard size.
- A one-line diagram shows the whole distribution system on one sheet, and the electrical plans, panel schedules, and specifications carry the details to the electrician.
- Conductors are sized by ampacity and voltage drop. Conduit protects them and is limited by fill and bends. Bonding gives fault current a low-resistance path so the breaker trips, and grounding connects the system to the earth.
- Lighting design uses lumens, footcandles, and efficacy, and the lumen method estimates the number of luminaires. Controls reduce energy use and are often required by the energy code.
- Low-voltage systems, including data, fire alarm, and building automation, are kept separate from power wiring. Fire alarm systems detect, notify, and command other systems such as fans and elevators.
- Photovoltaic systems and electric vehicle chargers are added loads and sources that affect the structure, the roof, and the service size, and they need early coordination with the utility and the other disciplines.
