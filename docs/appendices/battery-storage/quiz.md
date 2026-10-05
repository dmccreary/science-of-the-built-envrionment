# Quiz: Battery Storage and Grid-Interactive Buildings

Test your understanding of the concepts in [Appendix D](index.md) with these review questions.

---

#### 1. Which statement correctly matches each battery rating with what it describes?

<div class="upper-alpha" markdown>
1. Energy capacity in kWh is how much the battery can store, and the power rating in kW is how fast the inverter can deliver it
2. Energy capacity in kW is how much the battery can store, and the power rating in kWh is how fast the inverter can deliver it
3. Both ratings describe the same limit, expressed in different units
4. Energy capacity limits how much can run at one moment, and the power rating sets the total stored
</div>

??? question "Show Answer"
    The correct answer is **A**. Energy (kWh) and power (kW) are different limits, and confusing them is the most common sizing mistake. Energy sets how long the battery lasts, and power sets how many loads it can run at once. A battery with plenty of energy but a small inverter still trips when the combined loads exceed the power rating, however much energy remains.

    **Concept Tested:** Battery Energy and Power Ratings

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 2. A battery has 10 kWh of usable energy, and the loads on backup average 2.5 kW. About how long will the battery run them?

<div class="upper-alpha" markdown>
1. 0.25 hours
2. 7.5 hours
3. 4 hours
4. 25 hours
</div>

??? question "Show Answer"
    The correct answer is **C**. Run time is usable energy divided by average load: 10 kWh / 2.5 kW = 4 hours. Option A inverts the ratio, and option D multiplies instead of dividing. The same rule explains the appendix example, where a 13.5 kWh battery runs 1.2 kW of critical loads for about 11 hours. A solar array that recharges the battery during the day would extend the time.

    **Concept Tested:** Battery Run Time

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 3. A home battery with 13.5 kWh of usable energy and a 5 kW inverter is asked to carry loads that total 5.7 kW during an outage. What happens?

<div class="upper-alpha" markdown>
1. It runs for about 2.4 hours, until the battery is empty
2. The inverter trips, even though the battery is full
3. It carries the loads at reduced voltage until the battery empties
4. The inverter carries 5 kW and the cells supply the other 0.7 kW directly
</div>

??? question "Show Answer"
    The correct answer is **B**. The inverter is the only path from the battery to the building's alternating-current circuits, so a load above its power rating shuts the system down no matter how much energy is stored. The fix is a larger inverter, or fewer loads on the backed-up circuits. The 2.4 hours in option A would apply only if the inverter could carry 5.7 kW.

    **Concept Tested:** Battery Energy Storage

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 4. A battery has a round-trip efficiency of 90 percent. If 10 kWh is stored in it, how much energy can be recovered?

<div class="upper-alpha" markdown>
1. 10 kWh
2. 11.1 kWh
3. 1 kWh
4. 9 kWh
</div>

??? question "Show Answer"
    The correct answer is **D**. A 90 percent round-trip efficiency means that about 9 of every 10 kWh stored come back out. The other kWh becomes heat in the cells and the inverter. No storage system returns all of its input, and a battery can never return more energy than it received, which rules out option B. This is one reason a battery must earn its place by shifting energy to a more valuable time.

    **Concept Tested:** Round-Trip Efficiency

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 5. How does a time-of-use rate help a battery earn money?

<div class="upper-alpha" markdown>
1. The owner charges the battery when energy is cheap and discharges it when energy is expensive
2. The utility pays a fixed fee for each kWh stored, regardless of when it is stored
3. The battery lowers the building's rate by reducing the supply voltage
4. The owner charges the battery at the peak price and discharges it overnight
</div>

??? question "Show Answer"
    The correct answer is **A**. Time-of-use rates charge more for energy during peak hours. A battery that charges in cheap hours and discharges in expensive ones turns the price difference into savings, and utilities and aggregators may also pay owners to discharge at peak demand. This is how a building becomes grid-interactive. Option D reverses the strategy and would lose money.

    **Concept Tested:** Time-of-Use Rates

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 6. Why has lithium iron phosphate (LFP) chemistry become common in stationary storage?

<div class="upper-alpha" markdown>
1. It stores more energy per pound than every other chemistry
2. It never needs an inverter to connect to the building
3. It has a lower fire-propagation risk than some earlier lithium-ion chemistries, and its price has fallen
4. It is exempt from installation rules such as NFPA 855
</div>

??? question "Show Answer"
    The correct answer is **C**. LFP cells have a lower fire-propagation risk than some earlier lithium-ion chemistries, and they supply a large and growing share of storage at about $81 per kWh across segments in 2025. Installed home systems cost more than packs, because the inverter, labor, permitting, and margin add to the total. LFP batteries still need an inverter and still follow the installation codes.

    **Concept Tested:** Lithium Iron Phosphate Batteries

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 7. Which documents govern where batteries can be installed and how much energy can be stored in one place?

<div class="upper-alpha" markdown>
1. ASHRAE 90.1 and the International Energy Conservation Code
2. NFPA 13 and the International Plumbing Code
3. ASHRAE 62.1 and NFPA 72
4. NFPA 855 and Article 706 of the National Electrical Code
</div>

??? question "Show Answer"
    The correct answer is **D**. NFPA 855 and NEC Article 706 govern where batteries can go, how much energy one location may hold, and how they are separated from living space. Both documents are revised in each code cycle, and local officials interpret the siting rules for garages and living spaces differently. The energy codes in option A cover efficiency, not battery siting.

    **Concept Tested:** Battery Safety Standards

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 8. A designer wants a home battery to ride through outages without oversizing it. Which approach follows the appendix's advice?

<div class="upper-alpha" markdown>
1. Size the battery to carry every circuit in the house
2. List what must keep running, add up the watts, and wire those circuits to a separate backed-up panel
3. Choose the largest battery available and skip the load list
4. Choose the inverter from the battery's kWh, because the two ratings are equivalent
</div>

??? question "Show Answer"
    The correct answer is **B**. Sizing to the critical loads, such as the refrigerator, furnace blower, sump pump, lights, and internet, keeps the average load near 1.2 kW instead of several kW. A smaller battery on a few circuits often outperforms a larger one that tries to carry everything. The energy and power ratings are different limits, so the inverter must be checked against the total load as well.

    **Concept Tested:** Grid-Interactive Buildings

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 9. Why is vehicle-to-home power attractive for backup?

<div class="upper-alpha" markdown>
1. Vehicles recharge from a home solar array with no power electronics
2. Vehicle batteries are exempt from battery safety standards
3. Electric vehicles carry far larger batteries than a typical wall unit
4. Vehicle batteries lose no energy when they discharge
</div>

??? question "Show Answer"
    The correct answer is **C**. An electric vehicle battery stores many times the energy of a wall-mounted unit, so it could run a building's critical loads for much longer. The equipment that lets a vehicle power a building or feed the grid is still emerging, and interconnection rules and standards are still being written. Vehicle batteries still lose energy as heat and still need an inverter, as any battery does.

    **Concept Tested:** Vehicle-to-Home Power

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 10. Adding a 2 kW heat pump to 1.2 kW of critical loads cuts a 13.5 kWh battery's run time from about 11 hours to about 4. Why does the run time fall by more than half?

<div class="upper-alpha" markdown>
1. Run time is energy divided by load, and the load rises by about 2.7 times, so the run time falls to about 0.37 of its value
2. The heat pump lowers the battery's usable energy by about 2 kWh
3. The inverter's power rating drops whenever a large load connects
4. Round-trip efficiency falls as more loads are connected
</div>

??? question "Show Answer"
    The correct answer is **A**. Run time is inversely proportional to load. The total rises from 1.2 kW to 3.2 kW, about 2.7 times, so the run time falls to 13.5 / 3.2, about 4.2 hours. The battery's energy and the inverter's rating do not change when a load is added, and the efficiency is a property of the system, not of the load. One large load can dominate the whole budget.

    **Concept Tested:** Battery Run Time

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)
