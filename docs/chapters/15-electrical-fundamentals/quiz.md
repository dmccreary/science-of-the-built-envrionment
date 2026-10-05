# Quiz: Electrical Fundamentals and Building Service

Test your understanding of the concepts in this chapter with these review questions, one for each of the 17 concepts covered.

---

#### 1. Why does unplugging one computer in a classroom not darken the room's lights?

<div class="upper-alpha" markdown>
1. Buildings are wired in series, so the current continues through the remaining loads even when one is removed
2. Computers are low-voltage devices, so they are not on the same circuit as the lights in the room
3. Buildings are wired in parallel, so each device has its own loop and receives the full supply voltage
4. The source supplies charge only to the largest load, so the smaller loads are independent of it
</div>

??? question "Show Answer"
    The correct answer is **C**. An electrical circuit is a closed path of a source, conductors, and a load, and charge moves only when the loop is complete. In series, one break stops every load, as in old strings of holiday lights. In parallel, each load is on its own path directly across the source, so a break in one path leaves the others complete. Every outlet and light in a classroom is such a separate path.

    **Concept Tested:** Electricity

    **See:** [Electricity](index.md#electricity)

---

#### 2. What is the correct order of the path electricity follows from the utility into a building?

<div class="upper-alpha" markdown>
1. Utility service, panelboards, service entrance, feeders, branch circuits
2. Service entrance, utility service, branch circuits, panelboards, feeders
3. Branch circuits, feeders, panelboards, service entrance, utility service
4. Utility service, service entrance, feeders, panelboards, branch circuits
</div>

??? question "Show Answer"
    The correct answer is **D**. An electrical system receives electricity from a source, distributes it safely, protects people and property from faults, and delivers it to loads. At each level the current is divided among more paths and the protective devices become smaller. The route in the Riverbend example has six stages: utility line, utility transformer, service entrance, feeder, panelboard, and branch circuit.

    **Concept Tested:** Electrical Systems

    **See:** [Electrical Systems](index.md#electrical-systems)

---

#### 3. Three parallel circuits fed from one supply draw 10 A, 6 A, and 4 A. What current does the supply conductor carry when all are on?

<div class="upper-alpha" markdown>
1. 6.7 A
2. 20 A
3. 10 A
4. 240 A
</div>

??? question "Show Answer"
    The correct answer is **B**. In a parallel circuit, the current in the supply conductor is the sum of the branch currents: 10 + 6 + 4 = 20 A. The average, 6.7 A, would understate the load, 10 A counts only the largest branch, and 240 is the product. The same additive idea applies at every level of the building, so feeders are larger than any single branch circuit.

    **Concept Tested:** Current

    **See:** [Current](index.md#current)

---

#### 4. A utility delivers the same power through a line, but raises the transmission voltage tenfold. What happens to the power lost in the line's resistance?

<div class="upper-alpha" markdown>
1. It falls to one hundredth, because current falls tenfold and loss depends on the square of current
2. It falls to one tenth, because the loss in the line depends directly on the current in the line
3. It rises tenfold, because higher voltage forces ten times more power through the same wire
4. It stays the same, because the wire's resistance does not change when the voltage is raised
</div>

??? question "Show Answer"
    The correct answer is **A**. For a given power, higher voltage needs less current (I = P / V), and wire loss is I²R. At 1,000 V, 100 kW needs 100 A and loses 10,000 W in a 1 ohm line, while at 10,000 V it needs 10 A and loses 100 W. This is why AC dominates: a transformer can change its voltage easily, so transmission lines run at tens or hundreds of thousands of volts.

    **Concept Tested:** Alternating Current

    **See:** [Alternating Current](index.md#alternating-current)

---

#### 5. At schematic design, a 10,000 ft² building is estimated at 6 VA per square foot on a 208 V three-phase service. About what current does the estimate imply?

<div class="upper-alpha" markdown>
1. About 288 A
2. About 72 A
3. About 500 A
4. About 167 A
</div>

??? question "Show Answer"
    The correct answer is **D**. The demand is 10,000 × 6 = 60,000 VA. Three-phase current is I = VA / (√3 × V) = 60,000 / (1.732 × 208) ≈ 167 A. Omitting the √3 gives 288 A, using 480 V gives about 72 A, and 500 A is unrelated. The designer shares such a rough estimate with the utility early because service requests, transformer purchase, and trenching can take months.

    **Concept Tested:** Utility Service

    **See:** [Utility Service](index.md#utility-service)

---

#### 6. Which statement about voltage is correct?

<div class="upper-alpha" markdown>
1. It is the rate at which charge flows past a point in a conductor, measured in amperes or amps
2. It is the difference in electrical potential energy per unit of charge between two points, in volts
3. It is the opposition that a material offers to the flow of current, measured in ohms at the wire
4. It is the rate at which electrical energy is converted into another form, measured in watts
</div>

??? question "Show Answer"
    The correct answer is **B**. Voltage is the push that drives charge around a circuit, always measured between two points, like water pressure measured as a difference. Residential outlets are nominally 120 V, large appliances use 240 V, and commercial systems commonly use 208 V or 480 V, with 120 V or 277 V for lighting and receptacles. Low-voltage systems, typically 50 V or less, power doorbells, thermostats, and data cables.

    **Concept Tested:** Voltage

    **See:** [Voltage](index.md#voltage)

---

#### 7. Why do large commercial buildings typically choose a 480Y/277 V service and use transformers to produce 208Y/120 V for plug loads?

<div class="upper-alpha" markdown>
1. The higher voltage reduces the power the building uses, so the utility bill is smaller each month and year
2. The higher voltage lets the service disconnect be omitted, so the equipment is simpler and cheaper to buy
3. The higher voltage reduces the current for a given load, so conductors and equipment are smaller and drop is lower
4. The higher voltage is safer to touch, so the equipment needs no protective devices or enclosures
</div>

??? question "Show Answer"
    The correct answer is **C**. A 300 kVA load draws about 833 A at 208 V and about 361 A at 480 V, so a 400 A service replaces a 1,000 A one. The service entrance includes the service conductors, meter, service disconnect, and grounding electrode connection, and it sets the capacity of the whole building. Equipment rooms must include clear working space in front of the equipment.

    **Concept Tested:** Service Entrance

    **See:** [Service Entrance](index.md#service-entrance)

---

#### 8. A three-phase panel carries 2,700 VA on phase A, 1,800 VA on phase B, and 2,200 VA on phase C. Which change best balances the load?

<div class="upper-alpha" markdown>
1. Move about 450 VA from phase A to phase B
2. Move about 450 VA from phase B to phase A
3. Move about 900 VA from phase C to phase B
4. Move the neutral conductor to phase A
</div>

??? question "Show Answer"
    The correct answer is **A**. The total is 6,700 VA, so the average is about 2,233 VA per phase. Moving 450 VA from A to B gives 2,250, 2,250, and 2,200 VA, nearly balanced. The reverse widens the gap, and moving 900 VA from C to B overloads B. Balanced phases reduce neutral current, heating, and voltage differences. A panel schedule lists each circuit, breaker size, equipment, and phase load.

    **Concept Tested:** Panelboards

    **See:** [Panelboards](index.md#panelboards)

---

#### 9. A circuit's wire has a loop resistance of 0.4 ohms and carries 15 A. How much power is lost as heat in the wire?

<div class="upper-alpha" markdown>
1. 6 W
2. 90 W
3. 225 W
4. 37 W
</div>

??? question "Show Answer"
    The correct answer is **B**. Wire heating follows P = I²R = 15² × 0.4 = 90 W. Using P = I × R gives 6 W, which forgets to square the current, and 225 W omits the resistance. The key insight is that doubling the current makes four times as much heat in the same wire. A building wire is deliberately a low-resistance conductor, and any heat it makes is a loss.

    **Concept Tested:** Electrical Power

    **See:** [Electrical Power](index.md#electrical-power)

---

#### 10. A continuous load of 2,160 W at 120 V (18 A) is placed on a 20 A circuit. Is this acceptable?

<div class="upper-alpha" markdown>
1. No, because a continuous load is limited to 80 percent of the breaker rating, 16 A, which 18 A exceeds
2. Yes, because 18 A is below the 20 A rating, so the breaker will not trip during normal use
3. Yes, because the wire is 12 AWG, which can carry any load below 30 A without overheating
4. No, because a 20 A circuit can serve only loads that run for less than one hour at a time
</div>

??? question "Show Answer"
    The correct answer is **A**. The code treats a load running three hours or more as continuous, and the breaker rating must exceed the load current by 25 percent, which is equivalent to using no more than 80 percent of the rating. For a 20 A breaker that is 16 A. A breaker protects the wire, not people, and should never be replaced with a larger one to stop it from tripping.

    **Concept Tested:** Circuit Breakers

    **See:** [Circuit Breakers](index.md#circuit-breakers)

---

#### 11. A long 12 AWG branch circuit shows a voltage drop of about 6 percent. What is the usual remedy, and why does it work?

<div class="upper-alpha" markdown>
1. Use a smaller conductor with a larger AWG number, which raises the resistance and lowers the current
2. Use a higher-rated breaker, which increases the voltage available at the load end of the circuit
3. Use a larger conductor with a smaller AWG number, which lowers the resistance and the voltage drop
4. Use a longer conductor, which spreads the current over a greater length and reduces heating
</div>

??? question "Show Answer"
    The correct answer is **C**. Resistance is the opposition to current, caused by electrons colliding with atoms. It depends on material and geometry: longer wire has more resistance and thicker wire has less. A smaller gauge number means a thicker wire, and every three gauge steps roughly halves resistance. Moving to 10 AWG reduces the 100 ft example's drop from about 7.7 V to about 4.8 V.

    **Concept Tested:** Resistance

    **See:** [Resistance](index.md#resistance)

---

#### 12. Which of the following is a typical source or use of direct current in a building?

<div class="upper-alpha" markdown>
1. The utility service from the street, which is delivered to buildings at 60 hertz as direct current
2. The secondary of a transformer, which only works when the supplied current is steady and direct
3. A motor on a three-phase supply, which requires the polarity to reverse many times each second
4. Batteries for emergency lighting, photovoltaic arrays, and the output of electronic power supplies
</div>

??? question "Show Answer"
    The correct answer is **D**. In DC the voltage is steady and polarity never changes, so Ohm's law applies directly and connecting a device backward can damage it. Many electronics, including LED drivers, computers, and phones, use DC internally even when plugged into an AC outlet. Utility power is AC because its voltage can be changed efficiently by a transformer, which works only with alternating current.

    **Concept Tested:** Direct Current

    **See:** [Direct Current](index.md#direct-current)

---

#### 13. How are wire gauge and breaker rating matched in typical branch circuits?

<div class="upper-alpha" markdown>
1. A 15 A circuit uses 12 AWG wire and a 20 A circuit uses 14 AWG wire
2. A 15 A circuit uses 14 AWG wire and a 20 A circuit uses 12 AWG wire
3. A 15 A circuit uses 10 AWG wire and a 20 A circuit uses 8 AWG wire
4. A 15 A circuit and a 20 A circuit both use 14 AWG wire
</div>

??? question "Show Answer"
    The correct answer is **B**. A branch circuit is the wiring between the final overcurrent device and the outlets, lights, or equipment it serves. Most are 15 or 20 A at 120 V. A typical cable contains a hot conductor that carries current to the load, a neutral that carries it back, and a ground that stays dead and provides a safe path for fault current. Thicker wire has a smaller AWG number.

    **Concept Tested:** Branch Circuits

    **See:** [Branch Circuits](index.md#branch-circuits)

---

#### 14. Why is switchgear found in hospitals and data centers instead of a simpler switchboard?

<div class="upper-alpha" markdown>
1. Its breakers are smaller and lighter, so it fits in tighter equipment rooms at the service entrance
2. Its breakers do not need an interrupting rating, so they are less costly to buy and to install
3. Its breakers are fused instead of tripped, so they never need to be reset after a fault occurs
4. Its breakers are on draw-out rails, so one can be removed for maintenance without shutting down the building
</div>

??? question "Show Answer"
    The correct answer is **D**. Switchgear is a metal-enclosed assembly of main breakers, switches, busbars, and controls at the service entrance of a large building. A switchboard is simpler and less costly, and common in mid-size buildings. Both must be rated for the available fault current, the large current that would flow in a short circuit at that point, which the utility helps determine.

    **Concept Tested:** Switchgear

    **See:** [Switchgear](index.md#switchgear)

---

#### 15. What does a feeder do, and how is it sized?

<div class="upper-alpha" markdown>
1. It carries power from a panelboard to a single outlet, and it is sized for the one device it serves
2. It carries power from the utility pole to the street transformer, and it is sized by the utility
3. It carries power from service equipment to a panelboard, and it is sized for the sum of the downstream loads
4. It carries ground fault current to the earth, and it is sized for the largest breaker in the system
</div>

??? question "Show Answer"
    The correct answer is **C**. Feeders connect the levels of the electrical system, such as a main switchboard to a lighting panelboard or a transformer. They are sized for everything downstream, which is why feeder wires are much larger than branch-circuit wires. Informational notes in the code suggest keeping voltage drop to about 3 percent on a feeder and about 5 percent from the service to the farthest load.

    **Concept Tested:** Feeders

    **See:** [Feeders](index.md#feeders)

---

#### 16. Why do commercial customers pay both for energy in kilowatt-hours and for demand in kilowatts?

<div class="upper-alpha" markdown>
1. Energy is total work done over time, while demand is the highest rate of use, so many large loads at once cost more
2. Energy is the highest rate of use in a billing period, while demand is the total work done, so both measure the same quantity
3. Energy is the rate at which a load runs, while demand is the voltage of the supply to the building
4. Energy measures the cost of wire loss in the building, while demand measures the cost of the transformers
</div>

??? question "Show Answer"
    The correct answer is **A**. Power is the rate at which energy is converted, in watts, and energy equals power times time. A 1,500 W heater running 8 hours uses 12 kWh. A utility bill's demand charge penalizes peaks, so designers and operators schedule and control equipment to flatten them. Power and energy are different, much as speed and distance are different.

    **Concept Tested:** Electrical Energy

    **See:** [Electrical Energy](index.md#electrical-energy)

---

#### 17. A 150 kVA transformer steps 480 V down to 208 V, carrying about 180 A on the primary side and 416 A on the secondary side. Why is the secondary current higher?

<div class="upper-alpha" markdown>
1. A transformer adds power on the secondary side, so both the voltage and the current increase on that side
2. A transformer converts AC to DC on the secondary side, which raises the current delivered to the load
3. A transformer creates no power, so power in nearly equals power out, and a lower voltage means a higher current
4. A transformer's turns ratio sets current equal on both sides, so the difference comes from wire resistance
</div>

??? question "Show Answer"
    The correct answer is **C**. A transformer changes the voltage of AC using two coils sharing a magnetic core. A changing current in the primary induces a voltage in the secondary, and the voltage ratio equals the turns ratio. It works only with AC. The losses appear as heat, so transformers need ventilation and clearance. Utilities use pad-mounted units outside, and buildings use dry-type units indoors.

    **Concept Tested:** Transformers

    **See:** [Transformers](index.md#transformers)

---
