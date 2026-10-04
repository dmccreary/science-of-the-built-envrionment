---
title: Electrical Fundamentals and Building Service
description: Voltage, current, resistance, power, and energy, and the service equipment, panelboards, feeders, and branch circuits that deliver utility electricity to a building.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:01:47
version: 1.10
---

# Electrical Fundamentals and Building Service

## Summary

Voltage, current, power, and the equipment that brings electricity from the utility into a building. It builds on the prerequisite concepts from Chapter 1. After completing this chapter, students will be able to define, explain, and apply the 17 concepts listed below.

## Concepts Covered

This chapter covers the following 17 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Electricity | 64 |
| Electrical Systems | 46 |
| Current | 45 |
| Alternating Current | 21 |
| Utility Service | 19 |
| Voltage | 18 |
| Service Entrance | 17 |
| Panelboards | 12 |
| Electrical Power | 10 |
| Circuit Breakers | 5 |
| Resistance | 4 |
| Direct Current | 4 |
| Branch Circuits | 4 |
| Switchgear | 3 |
| Feeders | 2 |
| Electrical Energy | 1 |
| Transformers | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)

---

!!! mascot-welcome "Power to the Building"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Every light switch, elevator, and laptop charger in a building depends on a chain of equipment you almost never see. Learn that chain and you can follow electricity from a wire on a utility pole to the outlet in a classroom wall. It is also the foundation for everything the electrical designer does in the next chapter. Let's build it right!

Every other system in this book either supports the building, shapes it, or protects it. Electricity does something different: it powers nearly everything else. Lights, fans, pumps, elevators, fire alarms, and computers all stop when the electrical system stops. This chapter introduces the physical ideas, which are voltage, current, resistance, power, and energy, and then follows electricity along its path from the utility to the outlet. Chapter 16 builds on that path to explain how electrical designers plan, size, and coordinate it.

The course description places detailed circuit design and load calculations beyond the scope of this book, so the calculations here are deliberately introductory. They have a single goal, which is to let you understand what an electrical designer is doing and why. The figures for the Riverbend Youth Center, the invented building from Chapter 2, are illustrative.

## Electricity

**Electricity** is the flow of electric charge through a material, together with the energy that the moving charge carries. In buildings, the charge carriers are *electrons*, tiny negatively charged particles that are free to move through metals such as copper and aluminum. Materials that let charge move easily are *conductors*. Materials that block it, such as plastic, rubber, glass, and dry wood, are *insulators*. A wire is a copper conductor wrapped in an insulator, so charge flows along the metal and stays out of whatever touches the outside.

Charge moves only when it has a complete loop to travel. An **electrical circuit** is a closed path consisting of three parts: a *source* that pushes charge, *conductors* that carry it, and a *load* that does something useful with the energy, such as lighting a lamp or turning a motor. A switch is a deliberate break in the loop. When the switch is open, the loop is incomplete and nothing flows. When it is closed, charge flows around the loop and the load operates.

Because charge cannot be seen, it helps to compare a circuit to a closed loop of water pipe. The comparison is imperfect, but it gives the right feel for the quantities defined in the next sections, and it is summarized in the table below.

| Electrical idea | Water analogy | What it means |
|-----------------|---------------|---------------|
| Source (battery, utility) | Pump | Provides the push |
| Conductor (wire) | Pipe | Carries the flow |
| Voltage | Water pressure | The push per unit of charge |
| Current | Flow rate | How much charge passes per second |
| Resistance | A narrow pipe or valve | Opposes the flow |
| Load | A water wheel | Turns the flow into useful work |
| Open switch | Closed valve | Stops the flow |

**Worked example: why one burned-out bulb leaves the others on.** Compare two ways of connecting three lamps to the same source. In a *series* circuit the lamps are connected end to end in a single loop, so all of the charge must pass through lamp 1, then lamp 2, then lamp 3. If any one fails, the loop breaks and all three go dark, as in old strings of holiday lights. In a *parallel* circuit each lamp is connected on its own path directly across the source, so each lamp has its own loop. If one fails, the other two still have complete loops and keep burning. Buildings are wired in parallel for exactly this reason. Every outlet and every light in a classroom is a separate path from the same source, so unplugging a computer does not darken the room, and each device receives the full supply voltage.

!!! mascot-thinking "Think in Loops"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that electricity does not get used up on the way to the outlet and vanish. Charge leaves the source, passes through the load, and must return to the source, and the energy is delivered along the way. If you can trace the whole loop, out and back, you can understand any circuit in this chapter.

Electricity is also hazardous, and the hazard has a simple basis. A current of roughly one hundredth of an ampere through the body can make muscles unable to release a conductor, and roughly a tenth of an ampere through the chest can stop the heart. Building electrical systems are therefore designed with insulation, grounding, and protective devices, and only licensed electricians install or work on them. Designers specify these safety measures. They never improvise them.

#### Diagram: Electric Circuit and Water Analogy Explorer

<details markdown="1">
<summary>Electric Circuit and Water Analogy Explorer</summary>
Type: microsim
**sim-id:** electrical-circuit-water-analogy-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) how a source, conductors, a load, and a switch form a closed circuit, and will predict (Bloom Level 2, Understand) how opening a switch or connecting loads in series or in parallel changes the behavior of the circuit.

Visual: A split canvas. The left half shows an electrical circuit with a battery, two lamps, wires, and a switch. The right half shows the matching water circuit with a pump, pipes, two water wheels, and a valve. Animated dots move around each loop to show charge or water flow, and the speed of the dots is proportional to the current.

Controls: A toggle labeled "Switch: open / closed." A toggle labeled "Lamps: series / parallel." A slider labeled "Source voltage (volts)" from 0 to 24. A checkbox labeled "Remove lamp 2." A checkbox labeled "Show water analogy."

Interactions: Changing the switch, wiring arrangement, or voltage updates both halves in real time. Hovering over any part highlights its twin in the other half and shows its name and role. When a lamp is removed in series mode, all flow stops and the status line reads "Series: one break stops every load." In parallel mode, flow continues through lamp 1 and the status line reads "Parallel: each load has its own path." Clicking a part opens an infobox that gives its electrical meaning and the limit of the analogy.

Colors: Charge dots in yellow, water dots in blue, wires in dark gray, active loads in bright yellow and inactive loads in light gray. Flow direction is also shown by arrowheads so the diagram can be read without color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 460 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createCheckbox, createSlider, and createButton controls created before any positioning function runs.
</details>

## Voltage

**Voltage** is the difference in electrical potential energy per unit of charge between two points, and it is the "push" that drives charge around a circuit. It is measured in *volts* (V) and is always measured *between* two points, never at a single point, in the same way that water pressure is a difference between two places. A source such as a generator or battery creates a voltage across its terminals. The voltage then appears across every load connected to it.

Building voltages fall into a few standard levels. Residential outlets are nominally 120 V, and large appliances such as dryers and ranges use 240 V. Commercial buildings commonly use 208 V or 480 V for equipment, with 120 V or 277 V for lighting and receptacles. Utility lines in the street operate at thousands of volts, and the reasons for that are explained in the section on alternating current. At the other extreme, *low-voltage* systems, typically 50 V or less, power doorbells, thermostats, data cables, and many controls. Low voltage reduces shock and fire hazards, though low-voltage systems are not exempt from code.

**Worked example: voltage drop on a long circuit.** Voltage is not constant along a wire, because the wire itself has resistance, the property defined in the next section. As current flows, some voltage is used up along the wire and is not available at the load. This loss is called *voltage drop*. Suppose a 20 A load sits at the end of a 100 ft run of copper wire on a 120 V circuit. The current travels out and back, so the conductor length is 200 ft. A 12 AWG copper conductor has a resistance of roughly 1.93 ohms per 1,000 ft, so the loop resistance is \( 1.93 \times 0.2 = 0.386 \) ohms, and the voltage drop is \( 20 \times 0.386 \approx 7.7 \) V. That is \( 7.7/120 \approx 6.4 \) percent of the supply, noticeably more than the roughly 3 percent that the National Electrical Code (NEC) informational notes suggest for a branch circuit. Lights dim, and motors run hot. Moving to 10 AWG wire (about 1.21 ohms per 1,000 ft) lowers the drop to about 4.8 V, or 4.0 percent, and 8 AWG (about 0.764 ohms per 1,000 ft) reduces it to about 3.1 V, or 2.5 percent. The designer solves a long-run problem by using a larger conductor.

## Current

**Current** is the rate at which electric charge flows past a point in a conductor, measured in *amperes* (A, or "amps"). One ampere equals one coulomb of charge passing per second, a coulomb being roughly \( 6.24 \times 10^{18} \) electrons. In symbols,

\[ I = \frac{Q}{t} \]

where \( I \) is current in amperes, \( Q \) is charge in coulombs, and \( t \) is time in seconds. By convention, engineers draw current flowing from the positive terminal of a source toward the negative terminal. The electrons themselves move the other way. The two descriptions give the same results, and the convention is built into every diagram and formula in practice.

If voltage is the push, current is the flow that results. Where voltage is measured *across* two points, current is measured *through* a path, by placing an ammeter in the loop. Electricians usually use a *clamp-on* ammeter instead, which closes around a single conductor and senses the magnetic field the current produces, so the circuit never has to be opened. A common misconception is that voltage "flows" through a wire. Voltage is the cause that exists across a loop, and current is the thing that flows around it. The two quantities are related by the resistance of the circuit, covered in the next section.

Current matters to building designers more than almost any other quantity, for two reasons. First, current heats the conductor that carries it. Every wire has an *ampacity*, the maximum current it can carry continuously without overheating its insulation. A wire loaded beyond its ampacity can start a fire inside a wall. Second, equipment such as breakers, switches, and panels is sized and labeled in amperes. When an electrical designer says "a 200 amp service," that number describes the current the equipment can carry. Common copper wire sizes carry roughly 15 A (14 AWG), 20 A (12 AWG), and 30 A (10 AWG) under typical conditions, and the breaker protecting each is matched to the wire.

**Worked example: adding currents at a junction.** In a parallel circuit, the current in the supply conductor is the sum of the currents in the branches. Suppose three Riverbend circuits connected to the same supply draw 12 A, 8 A, and 5 A when all are on. The supply conductor feeding them carries \( 12 + 8 + 5 = 25 \) A. A 30 A conductor and breaker would handle that load with a margin, while a 20 A conductor would be overloaded. The same additive idea applies at every level of the building, since the current in a panel's main feeder is the sum of everything downstream, which is why feeders are larger than any one branch circuit. (For simple loads, currents add directly. The designer's treatment of motors and electronics involves additional corrections that are beyond this introduction.)

#### Diagram: Voltage, Current, and Resistance Explorer

<details markdown="1">
<summary>Voltage, Current, and Resistance Explorer</summary>
Type: microsim
**sim-id:** ohms-law-power-wire-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) Ohm's law and the power relationship to calculate current, resistance, and power in a simple circuit, and will predict (Bloom Level 2, Understand) how wire length and gauge change voltage drop.

Visual: A circuit with a source, a 100 ft run of wire, and a load. Live readouts show source voltage, voltage at the load, current, load power, and the power lost as heat in the wire. A bar showing the voltage drop is drawn along the wire, with a green zone up to 3 percent and a red zone beyond it.

Controls: A slider for source voltage (12 to 480 V), a slider for load power (100 to 5,000 W), a drop-down for wire gauge (14, 12, 10, 8, 6 AWG), a slider for one-way wire length (10 to 300 ft), and a drop-down for material (copper or aluminum). A checkbox labeled "Show ampacity limit" draws a warning marker when the current exceeds the typical ampacity of the chosen wire.

Interactions: Changing any control updates all readouts. Hovering over the wire shows its resistance per 1,000 ft and total loop resistance. Hovering over the load shows the formula P = V x I. When the drop exceeds 3 percent, the status line reads "Voltage drop is high. Try a larger wire or a shorter run." When current exceeds ampacity, the wire flashes red with the message "Overload: this wire would overheat."

Colors: Wire in copper orange or aluminum gray, safe zone in green, warning zone in red. The warning also uses a text label.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), using built-in createSlider, createSelect, and createCheckbox controls.
</details>

## Resistance

**Resistance** is the opposition that a material or component offers to the flow of electric current, measured in *ohms*. It arises because moving electrons collide with the atoms of the material and give up energy as heat. Resistance depends on the material, since copper and aluminum have low resistance while rubber has an enormous one. It also depends on geometry: a longer wire has more resistance, and a thicker wire has less. Wire sizes follow the American Wire Gauge (AWG) system, in which a *smaller* gauge number means a *thicker* wire, and every three gauge steps roughly halves the resistance.

Resistance, voltage, and current are connected by **Ohm's law**:

\[ V = I \times R \]

where \( V \) is voltage in volts, \( I \) is current in amperes, and \( R \) is resistance in ohms. Rearranged, \( I = V/R \) and \( R = V/I \). The law says that for a given voltage, more resistance means less current, and for a given resistance, more voltage means more current.

Resistance is sometimes the useful part and sometimes the problem. A toaster element or an electric heater is deliberately a high-resistance conductor that gets hot. A building wire is deliberately a low-resistance conductor that should *not* get hot, and any heat it makes is a loss.

**Worked example: a heating element.** An electric heater element draws current from a 120 V outlet and has a resistance of 9.6 ohms. By Ohm's law, \( I = 120/9.6 = 12.5 \) A. If the same heater were mistakenly plugged into a 240 V source, the current would double to 25 A, and the heat would increase by a factor of four, as shown in the next section. The heater would be destroyed, and the wires and breaker would be overloaded. This example is why voltage is part of every equipment nameplate, and why a dryer plug and an ordinary outlet are shaped differently so that they cannot be interchanged.

!!! mascot-tip "Beau's Tip: Wire Gauge Runs Backward"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    A bigger gauge number means a thinner wire, so 14 AWG is thinner than 10 AWG. When a voltage drop or ampacity check fails, the fix is a *smaller* AWG number, so remember to go down in number to go up in size.

## Electrical Power

**Electrical power** is the rate at which electrical energy is converted into another form, such as heat, light, or motion, measured in *watts* (W). One watt is one joule of energy per second. For a direct-current circuit or a simple resistive load, power equals voltage times current:

\[ P = V \times I \]

Combining this with Ohm's law gives two more useful forms, \( P = I^2 R \) and \( P = V^2/R \). The first shows why wire heating grows rapidly with current: doubling the current makes four times as much heat in the same wire. Large loads are measured in kilowatts (kW), where 1 kW is 1,000 W, and motors are often rated in horsepower, where 1 hp equals about 746 W.

Alternating-current equipment is often rated in *volt-amperes* (VA) rather than watts. Volt-amperes, called *apparent power*, are the product of voltage and current without any adjustment for how well the load uses the current. *Real power*, in watts, is the part that does useful work. The ratio of the two is the *power factor*, which is 1.0 for a heater and lower for many motors and electronic loads. This chapter treats VA and W as equal for simple loads and leaves the distinction to Chapter 16 and to later study.

**Worked example: power, current, and wire loss for the heater.** The 9.6 ohm heater on 120 V has a power of \( P = 120 \times 12.5 = 1{,}500 \) W, which matches the usual 1,500 W label on a portable space heater. Checking with the other form, \( V^2/R = 14{,}400/9.6 = 1{,}500 \) W. Now suppose it is plugged into a 12 AWG circuit with a 100 ft run, so the loop resistance of the wire is 0.386 ohms from the earlier example. The heat made inside the wire is \( I^2R = 12.5^2 \times 0.386 \approx 60 \) W. That is a loss of about 4 percent of the heater's output. The wire becomes slightly warm, which is acceptable, but a longer run or a thinner wire would turn the loss into a hazard.

### Electrical Energy

**Electrical energy** is the total amount of work done by electricity over a period of time, which is power multiplied by time. The unit on a utility bill is the *kilowatt-hour* (kWh), the energy used by a 1 kW load running for one hour. In symbols,

\[ E = P \times t \]

Power and energy are different quantities, much as speed and distance are different. A heater's power tells you how fast it uses energy, and its energy tells you how much it used. The 1,500 W heater running for 8 hours uses \( 1.5 \times 8 = 12 \) kWh, which at an illustrative rate of 0.14 dollars per kWh costs about 1.68 dollars. Commercial customers are billed twice: for the energy used (kWh) and for the highest rate of use during a billing period, called *demand* (kW). Demand charges make it costly to start many large loads at once, so designers and operators schedule and control equipment to flatten the peaks.

## Direct Current

**Direct current** (DC) is electric current that flows in one direction only, so the polarity of the source (which terminal is positive and which is negative) never changes. Batteries, solar panels, and the output of electronic power supplies are DC sources. Most electronics, including LED lighting drivers, computers, and phones, use DC internally even when they plug into an AC outlet, because a small power supply inside converts the incoming AC to DC. In buildings, DC appears in battery systems for emergency lighting, in photovoltaic arrays, in electric vehicle charging, and in some low-voltage lighting and control systems.

DC has a simple behavior. In a DC circuit the voltage is steady, Ohm's law applies directly, and polarity matters, since connecting a DC device backward can damage it. The disadvantage historically was that DC voltage was hard to change efficiently, which is why public utilities adopted alternating current instead.

**Worked example: battery runtime.** A battery's stored energy is its voltage times its capacity in ampere-hours (Ah). A 12 V, 100 Ah battery stores \( 12 \times 100 = 1{,}200 \) watt-hours, or 1.2 kWh. Supplying a 300 W emergency load, an ideal battery would last \( 1{,}200/300 = 4 \) hours. Real batteries should not be fully discharged, and capacity falls in cold weather, so a designer would count on perhaps half to three quarters of that, depending on the battery type. A Minnesota winter makes the temperature derating especially important.

## Alternating Current

**Alternating current** (AC) is electric current that periodically reverses direction, so the voltage rises, falls to zero, and reverses polarity in a repeating wave. In North America the wave repeats 60 times per second, a *frequency* of 60 hertz (Hz), so one full cycle takes \( 1/60 \approx 16.7 \) milliseconds. The voltage rises to a peak, but the number quoted for a circuit is the *root-mean-square* (RMS) value, the equivalent steady DC voltage that would deliver the same power to a heater. For a standard sine wave, the peak is the RMS value times the square root of two, so a 120 V RMS outlet reaches a peak of about \( 120 \times 1.414 \approx 170 \) V.

AC dominates because of one practical advantage: its voltage can be changed easily and efficiently with a transformer, a device explained later in this chapter. Power plants generate AC, transformers raise it to high voltage for transmission, and other transformers lower it for use. Raising the voltage matters because, for a given power, a higher voltage needs less current, and wire loss depends on the *square* of current.

**Worked example: why utilities use high voltage.** Suppose a line with 1 ohm of resistance delivers 100 kW to a customer. At 1,000 V, the current is \( 100{,}000/1{,}000 = 100 \) A, and the loss in the line is \( I^2R = 100^2 \times 1 = 10{,}000 \) W, which is 10 percent of the power delivered. At 10,000 V, the current falls to 10 A, and the loss is \( 10^2 \times 1 = 100 \) W, which is 0.1 percent. Increasing the voltage tenfold reduces the loss a hundredfold. This result explains why transmission lines run at tens or hundreds of thousands of volts, why distribution lines in a neighborhood run at thousands of volts, and why a transformer sits near every building to bring the voltage down to a safe level.

Most commercial buildings use *three-phase* AC rather than ordinary single-phase. A three-phase supply has three alternating voltages of equal size, each offset by one third of a cycle from the others. The offset keeps delivery of power smooth, which suits motors, and it lets a given conductor size carry more power. The common three-phase building systems are 208Y/120 V and 480Y/277 V. In these labels the first number is the voltage between any two phase conductors, and the second is the voltage from one phase conductor to the neutral, which is smaller by a factor of \( \sqrt{3} \approx 1.732 \). A designer takes 120 V from the 208 V system for outlets, and 277 V from the 480 V system for lighting.

!!! mascot-encourage "Phases Take a Couple of Tries"
    ![Beau encouraging](../../img/mascot/encouraging.png){ class="mascot-admonition-img" }
    Three-phase power confuses almost everyone at first, because you cannot see it and it uses a square root. You already understand single-phase loops, so treat three-phase as three of those loops sharing wires, and use the waveform explorer below to watch the three waves line up.

#### Diagram: AC Waveform and Transmission Loss Explorer

<details markdown="1">
<summary>AC Waveform and Transmission Loss Explorer</summary>
Type: microsim
**sim-id:** ac-waveform-transmission-loss-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will describe (Bloom Level 2, Understand) an AC waveform in terms of peak, RMS, frequency, and phase, and will calculate (Bloom Level 3, Apply) how raising transmission voltage reduces line loss.

Visual: The upper panel plots voltage against time for one to four cycles. Single-phase mode shows one sine wave. Three-phase mode shows three waves in three colors offset by one third of a cycle. Peak and RMS values are marked with dashed lines. The lower panel shows a transmission line, with a source on the left and a load on the right, and a bar graph comparing power delivered and power lost in the line.

Controls: A toggle for single-phase or three-phase, a slider for RMS voltage (120 to 480 V), a slider for frequency (50 to 60 Hz) with 60 Hz as the default, a slider for transmission voltage (1,000 to 100,000 V), a slider for load power (10 to 1,000 kW), and a slider for line resistance (0.1 to 5 ohms).

Interactions: Changing the voltage updates the peak and RMS lines on the waveform. Hovering over any point on a wave shows the instantaneous voltage and time. Changing the transmission voltage updates the current, the loss, and the percent of power lost in the line. A note reads "Ten times the voltage, one hundredth of the loss" when the voltage is raised tenfold. In three-phase mode, a "Show line-to-line" checkbox displays the difference between two phases and the readout 208 V for a 120 V line-to-neutral system.

Colors: Phase A in black, phase B in red, phase C in blue, with different dash patterns so that the waves are distinguishable without color. Power lost is drawn in orange and power delivered in green.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createRadio controls.
</details>

### Transformers

A **transformer** is a device that changes the voltage of an alternating current, up or down, using two coils of wire that share a magnetic core. Alternating current in the *primary* coil creates a changing magnetic field, and that field induces a voltage in the *secondary* coil. The voltage ratio equals the ratio of the number of turns in the two coils. A transformer only works with AC, because only a changing current produces the changing magnetic field. A transformer does not create power, so the power in is nearly equal to the power out, and a lower voltage means a higher current.

For example, a 150 kVA three-phase transformer that steps 480 V down to 208 V carries \( 150{,}000/(1.732 \times 480) \approx 180 \) A on the primary side and \( 150{,}000/(1.732 \times 208) \approx 416 \) A on the secondary side. Utilities place large *pad-mounted* transformers outside buildings, and buildings use smaller *dry-type* transformers indoors to produce secondary voltages such as 208Y/120 V from a 480 V supply. Transformers have small losses that appear as heat, so they need ventilation and clearance.

## Electrical Systems

An **electrical system** is the complete set of conductors, equipment, and devices that receives electricity from a source, distributes it safely through a building, protects people and property from faults, and delivers it to loads. It is organized as a hierarchy, from the biggest equipment at the point where the utility enters, down through progressively smaller equipment to the final outlet. At each level, the current is divided among more and more paths, and the protective devices become smaller.

The path begins at the *utility service*, passes through the *service entrance equipment*, then through *feeders* to *panelboards*, and finally along *branch circuits* to lights, outlets, and equipment. The word "system" also reminds us that several sub-systems share the same infrastructure. A building has *power* circuits for outlets and equipment, *lighting* circuits, *emergency and standby* power for life-safety loads, and *low-voltage* systems for fire alarms, data, and controls. Chapter 16 covers these in detail, and grounding and bonding, which connect the system to the earth to limit shock and fire hazards, are part of every level.

The system is shaped by the other disciplines. The architect decides where electrical rooms will fit. The structural engineer decides where conduits can pass through beams. The mechanical engineer's equipment is the largest load in many buildings. The electrical designer is the person responsible for the *design* of the system and for coordinating it with all of these disciplines.

**Worked example: tracing a classroom light back to the utility.** Follow one ceiling light in a Riverbend classroom against the direction of power. The light is connected by a 20 A *branch circuit* to a breaker in a lighting panelboard in the hall. That panelboard is fed by a *feeder* from the main distribution panel in the electrical room. The main distribution panel is part of the *service entrance equipment*, which has a main breaker that can disconnect the whole building. The service entrance is connected by buried *service conductors* to a green *pad-mounted transformer* belonging to the utility, and that transformer is connected to the utility's underground *primary distribution lines* at a few thousand volts. The route has six stages: utility line, utility transformer, service entrance, feeder, panelboard, and branch circuit. Each stage lowers the voltage or divides the current, and each is protected by a device sized for its stage. If the classroom light flickers, the problem may be anywhere on that route, and knowing the route is the first step in tracing it.

The table below summarizes the same route, using illustrative values for a 208Y/120 V service. The utility's primary voltage varies by utility.

| Stage | Typical voltage | Protective device |
|-------|-----------------|-------------------|
| Utility primary line | Several thousand volts | Utility fuses and reclosers |
| Pad-mounted transformer | Steps thousands of volts down to 208Y/120 V | Utility fuses |
| Service entrance equipment | 208Y/120 V, 200 A | Main breaker |
| Feeder to panelboard | 208Y/120 V, 100 A | Feeder breaker |
| Panelboard | 208Y/120 V | Main breaker or upstream feeder breaker |
| Branch circuit | 120 V, 20 A | 20 A branch breaker |

Electrical systems are governed by the *National Electrical Code* (NEC, published as NFPA 70), a model code that Minnesota adopts with amendments as the Minnesota Electrical Code. Equipment is commonly required to be *listed*, meaning that an independent laboratory has tested it to a recognized standard, and inspectors verify the installation before the building can be occupied. Chapter 17 explains how codes and inspections fit into the permit process.

#### Diagram: Electrical Service Path Explorer

<details markdown="1">
<summary>Electrical Service Path Explorer</summary>
Type: infographic
**sim-id:** electrical-service-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) each stage of the path from utility to outlet and will explain (Bloom Level 2, Understand) what voltage, current, and protection exist at each stage.

Visual: A left-to-right diagram in the style of a simple one-line diagram. From left to right the stages are: utility primary line, pad-mounted transformer, meter, service entrance equipment with main breaker, feeder, panelboard with breakers, branch circuit, and loads (light, receptacle, and motor). Each stage is a labeled block, and lines show the path of power. Voltage and current labels appear above the path.

Controls: A drop-down labeled "Service type" with "120/240 V single-phase," "208Y/120 V three-phase," and "480Y/277 V three-phase." A slider labeled "Building load (kVA)" from 10 to 500. A button labeled "Trip a breaker" and a drop-down to choose which breaker.

Interactions: Hovering over a block shows its name. Clicking a block opens an infobox with its function, typical voltage, typical current at the chosen load, who owns it (utility or owner), and the code idea that governs it. Changing the building load updates the current labels along the path, and any block whose rating is exceeded turns red with the message "Rating exceeded. Select larger equipment." Tripping a breaker darkens everything downstream of it and leaves everything upstream energized.

Colors: Utility-owned equipment in blue, owner-owned equipment in green, tripped sections in dark gray, overloaded blocks in red. Each state is also labeled with text.

Responsive design: The canvas follows the container width and redraws on window resize. On narrow screens the stages stack vertically. Height is 500 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createSlider, and createButton controls created before any positioning function.
</details>

### Utility Service

The **utility service** is the supply of electricity from the electric utility company to the building, including the transformer, the service conductors, and the meter. In Minneapolis, the local electric utility is typically Xcel Energy. The utility owns the lines and transformer up to the *point of service*, where its conductors meet the building owner's conductors, and the owner owns everything beyond that point. Service reaches a building either by *overhead* conductors from a pole, called a service drop, or by *underground* conductors, called a service lateral, which is common in dense urban areas and in new commercial projects.

Utilities supply power at a standard voltage and phase arrangement, and the designer must request the arrangement that suits the building. Service requests, transformer purchase, and trenching can take months, so the electrical designer typically submits a *load estimate* early, during schematic design (Chapter 2). The utility then selects a transformer and tells the project where it will be located.

**Worked example: a preliminary service size for Riverbend.** At schematic design, the designer has no circuit layout yet, so uses a rule-of-thumb load density. Assume an illustrative 8 VA per square foot for a small community building. For 9,000 ft², the estimated demand is \( 9{,}000 \times 8 = 72{,}000 \) VA, or 72 kVA. At 208 V three-phase, the current is \( 72{,}000/(1.732 \times 208) \approx 200 \) A. The designer therefore requests a 200 A, 208Y/120 V three-phase service and shares the 72 kVA estimate with the utility, which commonly selects the next standard transformer size above it, such as 75 kVA. A 200 A, 208 V three-phase service has a capacity of \( 1.732 \times 208 \times 200 \approx 72{,}050 \) VA, which matches the estimate. The estimate is deliberately rough and is revised once the actual loads are known. Chapter 16 covers how loads are counted properly.

### Service Entrance

The **service entrance** is the point where the service conductors enter the building and connect to the equipment that provides the first disconnect and overcurrent protection for the whole electrical system. It includes the *service conductors*, the *meter* or the current-transformer cabinet used to measure large services, the *service disconnect*, which is a main switch or main breaker that can shut off all power to the building in an emergency, and the connection to the grounding electrode (Chapter 16). The service disconnect must be readily accessible, and the code commonly limits the number of switches or breakers that can serve as the main disconnect to six.

The *service rating* in amperes sets the capacity of the entire building. Standard ratings include 100, 200, 400, 600, 800, 1,000, and 1,200 A, with larger sizes available. Three-phase power in kVA is \( \sqrt{3} \times V \times I \), where \( V \) is the line-to-line voltage.

**Worked example: why big buildings use 480 V.** Consider a 300 kVA load. At 208 V three-phase, the current is \( 300{,}000/(1.732 \times 208) \approx 833 \) A, which requires a service of at least 1,000 A with large conductors and bulky equipment. At 480 V, the same load draws \( 300{,}000/(1.732 \times 480) \approx 361 \) A, and a 400 A service is enough. The higher voltage reduces the current by more than half, so the conductors, conduit, and equipment are smaller and cheaper, and voltage drop is lower. This reasoning is why large commercial and industrial buildings typically choose 480Y/277 V service and use transformers to produce 208Y/120 V for plug loads. Equipment rooms must also include clear working space in front of the equipment, commonly at least three feet deep, which the architect must reserve on the plans.

### Switchgear

**Switchgear** is a metal-enclosed assembly of main breakers, switches, busbars, and controls that receives power at the service entrance of a large building and divides it among major feeders. Smaller installations use a *switchboard*, a simpler assembly that is less costly and is common in mid-size buildings. Switchgear is more robust, with breakers mounted on draw-out rails so that one can be removed for maintenance without shutting the whole building down. It is found in hospitals, data centers, and large campuses. Both types must be rated to withstand the *available fault current*, the large current that would flow if a short circuit occurred at that point, which the utility helps determine and the designer must check against the equipment ratings.

## Panelboards

A **panelboard** is an enclosure that houses a set of busbars and circuit breakers, receives power from a feeder, and distributes it among many branch circuits. It is the electrical equivalent of a distribution point: one large conductor goes in and a number of small circuits go out. A panelboard is identified by its voltage, its phase, its bus ampere rating, and its number of breaker spaces. A *main-breaker* panel includes its own disconnect, while a *main-lug-only* panel relies on a protective device located upstream.

Each panelboard has a *panel schedule*, a table listing every circuit, the breaker size, the equipment served, and the load on each phase. The schedule is how the designer, the electrician, and the owner understand what is connected where. In a three-phase panel, the circuits are connected alternately to phases A, B, and C, and the designer tries to *balance* the load so that no phase carries much more than the others.

**Worked example: reading and balancing a panel schedule.** The partial schedule below is for a small Riverbend lighting and receptacle panel at 208Y/120 V. Each load is a single-pole 20 A circuit at 120 V, and the VA values are illustrative.

| Circuit | Load served | Phase | VA |
|---------|-------------|-------|----|
| 1 | Classroom 1 receptacles | A | 1,200 |
| 2 | Classroom 2 receptacles | B | 1,200 |
| 3 | Classroom 3 receptacles | C | 1,200 |
| 4 | Classroom lighting | A | 1,500 |
| 5 | Corridor lighting and exit signs | B | 600 |
| 6 | Office receptacles | C | 1,000 |

Adding by phase gives A = 2,700 VA, B = 1,800 VA, and C = 2,200 VA, for a total of 6,700 VA. The current on each phase is the VA divided by 120 V, so A carries 22.5 A, B carries 15 A, and C carries about 18.3 A. Phase A carries 50 percent more than phase B. The designer can improve the balance by moving a circuit from phase A to phase B, for example by shifting 600 VA of the classroom lighting to a new circuit on phase B. The average load per phase is \( 6{,}700/3 \approx 2{,}233 \) VA, and balanced phases reduce the neutral current, heating, and the voltage differences between phases.

### Circuit Breakers

A **circuit breaker** is an automatic switch that opens a circuit when the current exceeds a safe level, then can be reset after the cause is corrected. A breaker protects the *wire*, not the people, by stopping the current before the conductor overheats. A typical breaker has two trip mechanisms. A *thermal* element, a bimetallic strip that bends when heated, opens the breaker after a sustained overload, taking longer when the overload is small. A *magnetic* element, a coil that responds instantly to a large surge, opens it within a fraction of a cycle during a short circuit.

Three ratings describe a breaker. The *ampere rating* is the current at which it trips, matched to the wire size. The *voltage rating* is the highest circuit voltage it can interrupt. The *interrupting rating* is the greatest fault current it can safely stop, and it must exceed the available fault current at its location. Special breakers protect people and wiring differently: a *ground-fault circuit interrupter* (GFCI) trips at a leakage of only about 5 milliamperes, which could be a person receiving a shock, and an *arc-fault circuit interrupter* (AFCI) detects the signature of a damaged cable that could ignite a fire.

**Worked example: the 80 percent rule for continuous loads.** The code treats a load that runs for three hours or more as *continuous*, and for such loads the breaker rating must exceed the load current by 25 percent. Equivalently, the load may use no more than 80 percent of the breaker rating. A 15 A breaker can therefore serve a continuous load of \( 0.8 \times 15 = 12 \) A. The 1,500 W heater from earlier draws 12.5 A, which is above 12 A, so it should not be run continuously on a 15 A circuit even though 12.5 A is below 15 A. A 20 A circuit allows \( 0.8 \times 20 = 16 \) A, which handles the heater. This is why heaters, long-running lighting, and electric vehicle chargers are sized with a margin, and why a designer reads the load as a percentage of the breaker.

!!! mascot-warning "Watch Out: The Breaker Rating Is a Ceiling"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A 20 A breaker can *trip* at 20 A, but a continuous load should stay near 16 A. Size the circuit for the load plus the margin, and never replace a breaker with a larger one to stop it from tripping, because the wire behind it cannot carry the extra current.

#### Diagram: Circuit Breaker and Continuous Load Explorer

<details markdown="1">
<summary>Circuit Breaker and Continuous Load Explorer</summary>
Type: microsim
**sim-id:** circuit-breaker-continuous-load-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) the 80 percent rule to decide whether a set of loads can run on a given circuit, and will explain (Bloom Level 2, Understand) why a breaker trips on overload and on short circuit.

Visual: A panelboard with a single breaker connected to a branch circuit with three outlets. Devices can be plugged into the outlets. A current meter shows the circuit current, and a time-current curve plotted below shows where the operating point lies relative to the trip curve.

Controls: A drop-down for breaker rating (15 A or 20 A), a drop-down for wire gauge (14 or 12 AWG), checkboxes for devices (a 1,500 W heater, a 300 W computer group, a 900 W microwave, a 600 W lighting group), a slider labeled "Hours of operation" from 0.5 to 8, and a button labeled "Create a short circuit."

Interactions: Adding devices raises the current reading. When the load is continuous (3 hours or more), a marker at 80 percent of the breaker rating appears, and if the current exceeds it, the status line reads "Over the continuous limit. Remove load or use a larger circuit." If the current exceeds the breaker rating, the thermal element animates, the breaker trips after a delay, and the lights go out. Pressing the short-circuit button trips it instantly through the magnetic element. If the user selects 14 AWG with a 20 A breaker, a warning reads "Wire is smaller than breaker allows: this is a fire hazard."

Colors: Normal operation in green, near-limit in yellow, over-limit in red, with text messages for each state.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createCheckbox, createSlider, and createButton controls.
</details>

### Feeders

A **feeder** is the set of conductors that carries power from the service equipment, or from another source, to a panelboard or other distribution equipment, ahead of the final branch-circuit breaker. Feeders connect the levels of the system. One feeder might run from the main switchboard to a lighting panelboard, and another from the switchboard to a transformer that feeds a second panelboard. A feeder is sized for the sum of the loads downstream, which is why feeder wires are much larger than branch-circuit wires. The NEC informational notes suggest keeping voltage drop to about 3 percent on a feeder and about 5 percent from the service to the farthest load, which is a design goal and not a requirement.

## Branch Circuits

A **branch circuit** is the portion of the wiring system between the final overcurrent device, normally a breaker in a panelboard, and the outlets, lights, or equipment it serves. Branch circuits are the part of the electrical system that occupants actually touch. Most are rated 15 or 20 A at 120 V. A *general-purpose* circuit serves many outlets or lights, and an *individual* circuit serves a single piece of equipment such as a dishwasher or a large heater. The breaker rating and the wire gauge are matched, so a 15 A circuit uses 14 AWG wire and a 20 A circuit uses 12 AWG wire. A typical cable contains a *hot* (ungrounded) conductor that carries current to the load, a *neutral* that carries it back, and a *ground* that stays dead and provides a safe path for fault current.

**Worked example: how many receptacles per circuit.** For a non-dwelling area such as a classroom, the NEC commonly assigns 180 VA to each receptacle for load-counting purposes. A 20 A, 120 V circuit has a capacity of \( 20 \times 120 = 2{,}400 \) VA, which would permit \( 2{,}400/180 \approx 13 \) receptacles. Many designers limit each circuit to about 10 receptacles to leave room for growth and to hold the circuit near 75 percent of capacity, a design practice and not a code limit. A classroom with 12 receptacles has a counted load of \( 12 \times 180 = 2{,}160 \) VA, or 18 A, so the designer would divide it into two circuits of six receptacles each, which also means that one tripped breaker does not disable the whole room.

!!! mascot-celebration "From the Utility Pole to the Outlet"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now explain voltage, current, resistance, and power with Ohm's law, tell AC from DC, and trace electricity from the utility transformer through the service entrance, feeders, panelboards, and branch circuits to a light. That is the vocabulary an electrical designer uses every day, and Chapter 16 puts it to work.

## Key Takeaways

- Electricity is the flow of charge around a closed circuit made of a source, conductors, and a load. Buildings are wired in parallel so every device receives the full supply voltage.
- Voltage is the push, current is the flow, and resistance opposes the flow. They are related by Ohm's law, \( V = I \times R \). Wires have resistance, so long runs lose voltage, and the usual remedy is a larger conductor.
- Power is \( P = V \times I \), and energy is power multiplied by time, measured in kilowatt-hours. Wire heating grows as \( I^2 R \), so doubling the current quadruples the heat.
- Direct current flows one way and comes from batteries and photovoltaic panels. Alternating current reverses 60 times per second, can be transformed to different voltages, and is used for utility power. High voltage cuts transmission losses.
- Commercial buildings use three-phase systems such as 208Y/120 V and 480Y/277 V. Higher voltage lowers current, which allows smaller conductors and equipment for large loads.
- Power travels from the utility through the service entrance, switchgear or switchboards, feeders, panelboards, and branch circuits. Each stage divides the current among more paths and has its own protective device.
- A circuit breaker protects the wire, and its rating is matched to the wire size. Continuous loads should be held to 80 percent of the rating, and a breaker should never be replaced with a larger one to prevent tripping.
- Electrical work involves shock and fire hazards, so only licensed professionals install it, and designers specify protection (insulation, grounding, GFCI, AFCI) to keep occupants safe.
