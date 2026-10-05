---
title: Fire Protection and Life Safety Requirements
description: How occupancy classification, construction type, fire-resistance ratings, egress, and emergency power work together to give occupants time to escape a fire.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 13:57:44
version: 1.10
---

# Fire Protection and Life Safety Requirements

## Summary

The code requirements for occupancy, construction type, fire-resistance ratings, egress, and emergency power that protect occupants. It builds on the prerequisite concepts from Chapters 1, 5, 14, 15, 16, 17. After completing this chapter, students will be able to define, explain, and apply the 11 concepts listed below.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Occupancy Classification | 6 |
| Life Safety | 6 |
| Fire-Resistance Ratings | 4 |
| Emergency Power | 3 |
| Construction Types | 2 |
| Means of Egress | 2 |
| Generators | 1 |
| Uninterruptible Power Supply | 1 |
| Fire Separations | 1 |
| Travel Distance | 1 |
| Allowable Building Area | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 5: Properties of Building Materials](../05-material-properties/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../14-hvac-plumbing-fire/index.md)
- [Chapter 15: Electrical Fundamentals and Building Service](../15-electrical-fundamentals/index.md)
- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../16-electrical-distribution-design/index.md)
- [Chapter 17: Building Codes, Permits, and Enforcement](../17-building-codes-permits/index.md)

---

!!! mascot-welcome "Buying Time to Get Out"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The best thing a building can do in a fire is give everyone inside enough time to walk out. By the end of this chapter you will know the handful of code ideas that buy that time, and you will be able to look at a floor plan and say how it does it. Let's build it right!

Chapter 17 explained that the building code is a chain of questions that starts with what the building is used for. This chapter follows that chain through the part of the code that protects human life from fire. The requirements can look like a pile of unrelated numbers: a rating of one hour here, a distance of a few hundred feet there. They are in fact a single strategy with several layers, and once you see the strategy, the numbers have a purpose.

We again use the invented **Riverbend Youth Center** from Chapter 2, a one-story, wood-framed Minneapolis building of about 9,000 ft² with a 40 ft multipurpose room, three 600 ft² classrooms, a kitchen, and offices. All Riverbend numbers are illustrative, and every code value in this chapter is hedged, because the adopted edition and the building official control what applies to a real project.

## Life Safety

**Life safety** is the design objective of protecting people in a building from fire, smoke, and other emergencies long enough for them to escape or be rescued. It differs from *property protection*, which aims to save the building and its contents. A building can be a total loss and still have a successful life-safety outcome, because every occupant got out. The code concentrates on life safety first, which explains why many of its rules concern escape routes and smoke, not the building's survival.

The hazard is not only flame. Burning produces hot gases and smoke that can fill a room long before flames reach the people in it, and smoke is a leading cause of fire deaths. Life safety therefore depends on detecting the fire quickly, limiting its growth and spread, and getting people out before conditions become unsurvivable. No single measure does all of that, so the code uses *layered protection*, listed below. The six layers extend the five jobs of fire protection from Chapter 14 (detect, warn, suppress, control smoke, contain) by adding prevention at the start and a protected escape at the end.

1. **Prevent ignition.** Control fuel sources, electrical faults, and ignition hazards, such as the kitchen cooking equipment.
2. **Detect and alert.** Smoke detectors and alarms warn occupants early. Chapter 14 introduced the fire protection systems, and Chapter 16 covers the fire alarm panel that ties them together.
3. **Control and suppress.** Sprinklers, also introduced in Chapter 14, limit the fire's size.
4. **Compartment.** Fire-resistance-rated walls and floors keep fire and smoke in one area.
5. **Escape.** Exits that are sufficient, close, and clear let people leave.
6. **Keep the escape route usable.** Emergency lighting and signs stay on if the power fails.

**Worked example: the race between smoke and people.** Fire engineers frame the goal as a race between two times. The *available safe egress time* (ASET) is how long it takes for smoke and heat to make the escape route unsurvivable. The *required safe egress time* (RSET) is how long occupants need to get out, which is the sum of the time to detect and alarm, the time people take to recognize the alarm and start moving, and the time to walk out. Suppose that, in the Riverbend multipurpose room, a fire starts in the kitchen. The alarm sounds 1.0 minute after ignition, occupants take 1.5 minutes to respond and gather themselves, and walking out takes 1.0 minute, so RSET is \( 1.0 + 1.5 + 1.0 = 3.5 \) minutes. A smoke analysis finds that the room becomes untenable at 6 minutes. The safety margin is \( 6.0 - 3.5 = 2.5 \) minutes. If one of two exits is blocked, walking time doubles to 2.0 minutes, RSET becomes 4.5 minutes, and the margin falls to 1.5 minutes. The code's requirements for exits, alarms, and sprinklers are each ways to lengthen ASET or shorten RSET. The times here are illustrative.

!!! mascot-thinking "No Single Layer Saves the Day"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the layers as slices of Swiss cheese: each one has holes, but the holes seldom line up. That is why a building with sprinklers still needs exits, and why a building with rated walls still needs alarms.

#### Diagram: Egress Time Margin Explorer


<iframe src="../../sims/egress-time-margin-explorer/main.html" width="100%" height="579px" scrolling="no"></iframe>
[Run Egress Time Margin Explorer Fullscreen](../../sims/egress-time-margin-explorer/main.html)

<details markdown="1">
<summary>Egress Time Margin Explorer</summary>
Type: microsim
**sim-id:** egress-time-margin-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the margin between available and required safe egress time and will evaluate (Bloom Level 5, Evaluate) which protective measure most improves the margin in a described scenario.

Visual: A horizontal timeline from 0 to 10 minutes. A stacked bar shows the three parts of required safe egress time (detection and alarm, pre-movement, and travel) in three colors. A vertical marker shows the available safe egress time, and the gap between the two ends is labeled with the margin in minutes, shown in green when positive and red when negative. A small floor plan of the Riverbend multipurpose room with two exits sits below the timeline. The canvas fills the container width, has a height of 480 px, and redraws on window resize.

Controls: Sliders set detection and alarm time (0.5 to 4 minutes), pre-movement time (0.5 to 5 minutes), and the available safe egress time (3 to 10 minutes). Checkboxes toggle "Sprinklers installed" (adds to the available time), "Alarm with voice message" (shortens pre-movement), and "One exit blocked" (increases travel time and shows that exit crossed out on the plan). A button labeled "Reset to Riverbend defaults" restores the 1.0, 1.5, 1.0, and 6.0 minute values.

Interactions: Hovering over a segment of the bar shows its definition and a one-sentence example. Clicking a checkbox shows a short explanation of why the change affects the time. A readout states the margin and displays the message "Margin is positive" or "Occupants may be caught by smoke."

Colors: Detection in blue, pre-movement in orange, travel in gray, margin in green or red. Every state also carries a text label.

Implementation: p5.js with a responsive canvas, DOM sliders and checkboxes, and simple arithmetic recalculated on each input change.
</details>

## Occupancy Classification

**Occupancy classification** is the code's way of sorting a building, or a part of a building, by how it is used and therefore by how much fire risk it carries. Chapter 1 observed that the building type controls which code provisions apply, and this is the mechanism. The classification is the first question in the code-reading chain from Chapter 17, since the occupant load factors, the number of exits, the sprinkler requirements, and the allowed building area all depend on it.

The International Building Code groups uses into ten letter-coded categories, named for what people do in the space: gathering is Assembly (A), working in an office is Business (B), and learning in a school is Educational (E). The following table summarizes the principal groups.

| Group | Use | Everyday examples |
|-------|-----|-------------------|
| A | Assembly | Theaters, restaurants, churches, community halls |
| B | Business | Offices, banks, clinics for outpatient care |
| E | Educational | Schools through twelfth grade |
| F | Factory | Manufacturing |
| H | High hazard | Facilities with large amounts of explosive or toxic materials |
| I | Institutional | Hospitals, jails, care facilities with people who cannot easily leave |
| M | Mercantile | Stores |
| R | Residential | Apartments, hotels, dormitories |
| S | Storage | Warehouses |
| U | Utility | Sheds, barns, garages |

Each group has subdivisions, such as A-3 for assembly uses that include community halls. Risk depends on who is in the building and how they behave: schoolchildren need adult direction, a theater audience is dense and unfamiliar with the exits, and hospital patients may be unable to move. Higher-risk groups face stricter rules.

Many buildings have more than one use. A smaller use that supports the main one, such as an office inside a school, is an *accessory occupancy*, and the code commonly allows it to be treated as part of the main use if it occupies no more than about 10 percent of the floor area of its story. Larger secondary uses create a *mixed occupancy*, which must either be separated by fire-rated construction or be designed to meet the strictest requirement that applies anywhere in the building.

**Worked example: classifying Riverbend.** The table below compares each Riverbend space, taken from the Chapter 2 program, with a gross story area of 9,000 ft².

| Space | Area (ft²) | Share of 9,000 ft² | Likely classification |
|-------|-----------|--------------------|-----------------------|
| Multipurpose room | 2,400 | 26.7% | Assembly (A-3) |
| Classrooms | 1,800 | 20.0% | Educational or assembly, depending on the program |
| Kitchen | 500 | 5.6% | Accessory to assembly |
| Offices | 360 | 4.0% | Business, accessory |
| Lobby and restrooms | 900 | 10.0% | Part of the main use |

The kitchen and offices fall below the commonly used 10 percent threshold, so they can be treated as accessory. The classrooms, at 20 percent, do not, so Riverbend is a mixed occupancy. The classification of the classrooms depends on the age of the students and how many hours the programs run, since the code defines educational use by those thresholds. The team documents its reasoning, then confirms the conclusion with the building official in the pre-application meeting that Chapter 17 described, because a classification error cascades through every later calculation.

!!! mascot-tip "Beau's Tip: Tabulate Every Room First"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Before you declare a building a single occupancy, list every room with its area and its use, then calculate each room's share of the story. The percentages show immediately whether you have accessory uses or a mixed occupancy.

## Construction Types

**Construction types** are the code's five categories for classifying a building by the materials of its structure and the fire resistance of its parts. The categories are Type I through Type V. Types I and II use noncombustible materials such as steel and concrete, Type III combines noncombustible exterior walls with combustible interior framing, Type IV is heavy timber, and Type V is ordinary combustible construction, usually wood framing. Types I, II, III, and V are further divided into subtypes labeled A and B, where A indicates *protected* construction (structural elements have fire-resistance ratings) and B indicates *unprotected* construction (fewer or no ratings required). The table restates these categories.

| Type | Main structure | Idea in plain terms |
|------|----------------|---------------------|
| I | Noncombustible, heavily protected | Concrete or steel frames with high ratings |
| II | Noncombustible | Steel or concrete, with less protection |
| III | Noncombustible exterior walls, combustible interior framing | Masonry walls with wood floors and roof |
| IV | Heavy timber (and mass timber in newer editions) | Large timber members that resist fire by charring |
| V | Combustible, usually wood-frame | Ordinary wood-frame buildings |

Noncombustible does not mean fireproof, since unprotected steel loses much of its strength at the temperatures of a developed fire. The type matters because it sets the fire-resistance rating each part of the structure must have, and with the occupancy it limits the building's height and area. Riverbend, a one-story wood-framed building with glued-laminated beams, is a candidate for several types depending on how the team protects the members, so the designers choose the type deliberately as a trade-off between structure cost and allowable size.

## Allowable Building Area

**Allowable building area** is the largest floor area the code permits on a single floor of a building, determined by the combination of occupancy group and construction type. The code lists a *tabulated area* for each pairing. Combustible, unprotected construction of a high-risk occupancy gets a small tabulated area, and noncombustible, protected construction of a lower-risk occupancy gets a much larger one. The idea is that a bigger fire compartment holds more fuel and more people, so it needs better construction.

Two common adjustments raise the tabulated area. A building protected by an automatic sprinkler system may receive an increase, since sprinklers limit fire size. A building with a large share of its perimeter facing open space, called *frontage*, may receive another increase, because firefighters can reach it from several sides and fire is less likely to jump to a neighboring structure. An area that is too small for the program can be solved by changing the construction type, by adding sprinklers, or by dividing the building with a *fire wall*, a wall so robust that the code treats the two sides as separate buildings. The team compares the programmed area from Chapter 2 with the tabulated area early, since an area problem found during construction documents can force a change in construction type.

## Fire-Resistance Ratings

A **fire-resistance rating** is the length of time, in hours, that a building assembly such as a wall, floor, beam, or column can withstand a standard fire test while performing its function. The standard test, ASTM E119, exposes the assembly to a prescribed rise in furnace temperature. To earn a rating, the assembly must keep carrying its load if it is structural, must not let flame or hot gases pass through, and must not let the temperature on the unexposed side rise too far. Common ratings are 1 hour and 2 hours. The rating does not predict how long a real building will last in a real fire. It is a standardized measure that lets designers compare assemblies.

Ratings belong to *assemblies*, not to materials. A gypsum board by itself has no rating, but a stud wall with specified framing, insulation, and layers of gypsum board on each side, tested as a unit, does. Designers find ratings in the code's tables of prescribed assemblies, in listings from testing laboratories, and in calculation methods the code accepts for certain materials, notably heavy timber and concrete. Chapter 5 described how materials behave in fire. Ratings turn that behavior into a number a code can use.

**Worked example: a glued-laminated beam in a fire.** Wood chars when it burns, and the char layer insulates the wood beneath it, so a large timber member loses strength by losing section rather than by softening. Designers estimate the loss with a *charring rate*, which for this example is a nominal 1.5 in per hour on each exposed face. Consider a Riverbend beam 8.75 in wide and 24 in deep, exposed on its bottom and two sides. Its resistance to bending depends on its *section modulus*, \( S = bd^2/6 \), where \( b \) is the width and \( d \) is the depth. Before the fire:

\[ S = \frac{8.75 \times 24^2}{6} = 840 \text{ in}^3 \]

After one hour, 1.5 in of each exposed face has charred, so the remaining section is 5.75 in wide (8.75 minus two sides) and 22.5 in deep (24 minus the bottom):

\[ S = \frac{5.75 \times 22.5^2}{6} \approx 485 \text{ in}^3 \]

That is about 58 percent of the original capacity. For the beam to survive one hour, the designer must show that the remaining section can still carry the design loads, which are lower in a fire than in normal service. If it cannot, a deeper or wider beam is used. The method is a simplified illustration, and the code and a structural engineer specify the actual design procedure and char values.

#### Diagram: Glulam Char Section Explorer


<iframe src="../../sims/glulam-char-section-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>
[Run Glulam Char Section Explorer Fullscreen](../../sims/glulam-char-section-explorer/main.html)

<details markdown="1">
<summary>Glulam Char Section Explorer</summary>
Type: microsim
**sim-id:** glulam-char-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the remaining section and section modulus of a timber beam after a given fire exposure and will explain (Bloom Level 2, Understand) why larger timber members resist fire better than small ones.

Visual: A cross-section of a rectangular beam drawn to scale. The original outline is dashed. A dark char layer grows inward on the exposed faces as the exposure time increases, and the remaining section is drawn in tan. A readout at the right shows the remaining width, remaining depth, the section modulus in cubic inches, and the percentage of the original capacity. The canvas fills the container width, has a height of 460 px, and redraws on window resize.

Controls: A slider labeled "Fire exposure (minutes)" from 0 to 120 with a default of 60. Sliders for beam width (3.125 to 12.25 in) and depth (9 to 36 in), with defaults of 8.75 and 24. A radio selector for the exposed faces: "Three sides (beam)" or "Four sides (column)". A slider for the nominal charring rate (1.0 to 2.0 in per hour) with a default of 1.5 in. A button labeled "Compare with a 3.125 in by 12 in member" overlays a small member to show how quickly it is consumed.

Interactions: Hovering over the char layer shows a tooltip with its thickness. A warning appears when the remaining width falls below 2 in, with the sentence "The section may no longer carry load." The readout updates on every change.

Colors: Char in dark charcoal, remaining section in tan, original outline in gray. The text readout repeats the state so that color is not the only signal.

Implementation: p5.js with a responsive canvas, DOM sliders and radio buttons, and the section modulus formula \( S = bd^2/6 \) recalculated on every change.
</details>

## Fire Separations

**Fire separations** are rated walls, floors, and other assemblies that divide a building into compartments to slow the spread of fire and smoke, or that separate one use from another. The IBC uses several named forms: *fire walls* divide a building into separate buildings for code purposes, *fire barriers* separate spaces within a building, such as an exit enclosure or a mixed-occupancy boundary, *fire partitions* provide a lesser separation, such as between tenant spaces, and *smoke barriers* limit the movement of smoke. Floors and roofs can serve as horizontal separations. Each form has its own required ratings, listed in the code's tables.

A rated separation works only if it is continuous. Every opening in it must be protected: doors are fire-rated and self-closing, ducts carry *fire dampers* that close when heat is detected, and the gaps around pipes and conduit that pass through the wall are sealed with *firestopping*, a tested sealing system. Riverbend might separate the classroom wing from the multipurpose room, since they are different occupancies, and then every wire and pipe that crosses that wall needs sealing.

!!! mascot-warning "Watch Out: Holes in a Rated Wall"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A rated wall loses its rating wherever a trade cuts an opening and leaves it unsealed, and conduit and cable penetrations are among the most frequent culprits. Coordinate with the contractor before rough-in, mark rated walls on the electrical drawings, and require tested firestopping at every penetration, so inspectors see a sealed system.

## Means of Egress

A **means of egress** is a continuous, unobstructed path from any point in a building to a public way, which is a street or other open space connected to the street. The code divides it into three parts. The *exit access* is the route from where a person is to an exit, such as a corridor. The *exit* is a protected component, such as an exterior door or an enclosed stair, that separates the occupant from the fire. The *exit discharge* is the portion that leads from the exit to the public way. A person is not safe until all three parts are complete. In summary:

- **Exit access:** the route to the exit, such as a corridor or a room aisle.
- **Exit:** the protected component, such as an exterior door or enclosed stair.
- **Exit discharge:** the route from the exit to the public way.

The requirements follow from the occupant load that Chapter 17 calculated. The code sets a minimum *number of exits* that increases with the load, a minimum *width* sized by a factor per person, commonly about 0.2 in per person for doors and level routes and more for stairs, and requirements about how doors operate. Doors in spaces with a large occupant load usually must swing in the direction of exit travel and use hardware that opens with a push. Exit signs must be visible and illuminated, and the route must be lit. The two exits should be placed far apart so that one fire cannot block both.

For the 160-person multipurpose room in Chapter 17, the width arithmetic is \( 160 \times 0.2 = 32 \) in of clear width. For a small room the minimum number of exits and minimum door width usually control, so the designer provides at least two doors, not one door of 32 in. The calculation matters much more in large spaces.

## Travel Distance

**Travel distance** is the maximum length of the path an occupant must follow, measured along the actual route of travel and not in a straight line, from the most remote point in a room to the nearest exit. The code limits it by occupancy group, with limits commonly in the range of a couple of hundred feet and typically longer when the building has sprinklers. The limit exists because the time to walk out, which is part of RSET, grows with distance.

Consider Riverbend as a one-story bar about 120 ft by 75 ft. The diagonal is

\[ \sqrt{120^2 + 75^2} \approx 141.5 \text{ ft} \]

which is the shortest possible distance from one corner to the opposite corner. A real route bends around walls, so the designer measures along the route. Suppose the code's illustrative limit is 200 ft and the farthest classroom corner is 160 ft from the nearest exit along its route. The margin is 40 ft, and adding an exit door would give more.

## Emergency Power

**Emergency power** is an on-site source of electricity that supplies the loads essential to life safety when the normal utility supply fails. The loads include exit signs, egress lighting, the fire alarm system, and in larger buildings fire pumps, smoke control, and some elevators. Power failure is not unusual in a fire, since fire or the utility may cut off the supply, and an emergency in the dark is far more dangerous.

The National Electrical Code, which Chapter 17 introduced, separates backup systems by purpose and by the time allowed to restore power.

- **Emergency systems** serve life safety and typically must restore power within about 10 seconds.
- **Legally required standby systems** serve functions the code requires but that are less immediately critical, such as smoke control, and allow a longer delay.
- **Optional standby systems** serve convenience and the owner's business, such as keeping a refrigerator running, and the code does not require them.

Emergency lighting must usually last long enough for people to leave, commonly 90 minutes.

For a small building, **unit equipment**, which is a light with its own battery and charger, can satisfy the requirement without a central source. For Riverbend, this is the likely choice, since 90 minutes of battery operation for exit signs and a handful of fixtures is inexpensive, and the electrical designer avoids the cost of a generator, fuel, and a transfer switch. A larger building with many floors normally needs a central source.

## Generators

A **generator** is an engine-driven machine that converts fuel into electricity, and in an emergency power system it is the central source. A diesel or natural-gas engine turns an alternator, and an *automatic transfer switch* manages the handover in four steps.

1. The switch senses the loss of utility power.
2. It signals the generator to start.
3. Once the generator reaches speed and voltage, the switch moves the emergency loads onto it.
4. When the utility returns and stays stable, the switch moves the loads back and the generator shuts down.

The generator takes several seconds to reach speed, which is why the code allows the delay listed above.

The designer sizes the generator for the loads it must carry, adds margin, and chooses a standard size. The set needs ventilation, an exhaust path, a fuel supply sized for the run time, and regular testing under load, because an engine that has never been run is the engine that fails when needed. The electrical designer's job is to size the system and to coordinate the locations of the generator, the transfer switch, and the separate wiring that emergency circuits require with the architect and the other trades, the kind of coordination Chapter 16 described.

## Uninterruptible Power Supply

An **uninterruptible power supply** (UPS) is a battery-based device that supplies power with no interruption when the normal supply fails. In a *double-conversion* UPS, the load is always powered through the batteries and an inverter, so the transfer is effectively instantaneous. The battery runs for minutes, not hours, which is enough to bridge the gap while a generator starts or to shut down sensitive equipment in an orderly way.

A UPS and a generator do different jobs and are often used together: the generator offers long duration after a delay of seconds, and the UPS offers no delay but a short duration. Fire alarm control panels contain their own batteries for the same reason. The table summarizes the three backup options.

| Option | Starts in | Runs for | Typical use in a building like Riverbend |
|--------|-----------|----------|-------------------------------------------|
| Unit equipment (battery light) | Instantly | About 90 minutes | Exit signs, egress lights |
| UPS | Instantly | Minutes | Controls, alarm panel, data equipment |
| Generator | Seconds | Hours, as long as fuel lasts | Larger buildings, standby loads |

!!! mascot-celebration "You Can Read a Life-Safety Strategy"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now classify a building by occupancy and construction type, relate area and fire-resistance ratings to the layers of fire protection, check exits and travel distance, and choose between unit equipment, a UPS, and a generator for emergency power. That is how a designer buys occupants the minutes they need to walk out.

## Key Takeaways

- Life safety aims to give occupants enough time to escape, and the code achieves it with layers: prevent, detect, suppress, compartment, escape, and keep the route usable.
- Occupancy classification sorts a building by use and risk, and it controls the exit, sprinkler, and area requirements that follow. Accessory uses fit within about 10 percent of the story area, and larger secondary uses create a mixed occupancy.
- Construction types I through V describe a building's structure and its protection, and, with occupancy, they set the allowable building area.
- Fire-resistance ratings describe how long an assembly performs in a standard test, and they apply to assemblies, not materials. Heavy timber resists fire by charring and leaving a reduced section.
- Fire separations divide a building into compartments only if every door, duct, and penetration through them is protected.
- A means of egress has exit access, exit, and exit discharge, and the occupant load drives the number of exits and their width. Travel distance limits how far a person must walk.
- Emergency power keeps exit signs, lighting, and alarms working when the utility fails. Unit equipment suits small buildings, a generator serves larger loads, and a UPS bridges the starting gap.
