# Quiz: Heat Pumps and Building Electrification

Test your understanding of the concepts in [Appendix A](index.md) with these review questions.

---

#### 1. What does the coefficient of performance (COP) of a heat pump measure?

<div class="upper-alpha" markdown>
1. The temperature difference between the supply air and the outdoor air
2. The ratio of the heat delivered to the electrical energy used
3. The share of the refrigerant that boils in the evaporator
4. The electricity used for each hour the compressor runs
</div>

??? question "Show Answer"
    The correct answer is **B**. COP is heat delivered divided by electricity used, so a COP of 3 means three units of heat for every unit of electricity. It can exceed 1 because a heat pump moves heat from a source instead of making it, the way a refrigerator moves heat out of its cold box. The temperature difference in option A is the lift, a different quantity.

    **Concept Tested:** Coefficient of Performance

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 2. In heating mode, which sequence lists the path of the refrigerant, starting at the compressor?

<div class="upper-alpha" markdown>
1. Compressor, evaporator, expansion valve, condenser
2. Compressor, expansion valve, condenser, evaporator
3. Condenser, compressor, evaporator, expansion valve
4. Compressor, condenser, expansion valve, evaporator
</div>

??? question "Show Answer"
    The correct answer is **D**. The compressor raises the vapor's pressure and temperature, the condenser (the indoor coil in heating mode) gives up that heat and turns the vapor to liquid, the expansion valve drops the pressure and makes the liquid very cold, and the evaporator (the outdoor coil) absorbs heat and boils the liquid back to vapor. The loop then repeats. A reversing valve swaps the coils' roles for cooling.

    **Concept Tested:** Refrigeration Cycle

    **See:** [How a Heat Pump Works](index.md#how-a-heat-pump-works)

---

#### 3. Why does the refrigerant leave the expansion valve colder than the outdoor air on a 5°F day?

<div class="upper-alpha" markdown>
1. The drop in pressure lowers its boiling temperature, so the liquid falls to about -5°F
2. The valve removes heat from the refrigerant and sends it outdoors through the coil
3. The compressor has already cooled it, and the valve only controls the flow rate
4. The refrigerant mixes with cold outdoor air as it passes through the valve
</div>

??? question "Show Answer"
    The correct answer is **A**. Lower pressure lowers the boiling temperature of the refrigerant, so the liquid leaves the valve far colder than it entered, about -5°F in the example. Heat always flows from warmer to colder, so the 5°F outdoor air can then give heat to the refrigerant in the evaporator. The refrigerant stays in a closed loop and never mixes with outdoor air.

    **Concept Tested:** Refrigerant

    **See:** [How a Heat Pump Works](index.md#how-a-heat-pump-works)

---

#### 4. A heat pump supplies 100°F (310.9 K) air on a 5°F (258.2 K) day. What is the Carnot limit on its COP?

<div class="upper-alpha" markdown>
1. 1.1
2. 4.9
3. 5.9
4. 52.8
</div>

??? question "Show Answer"
    The correct answer is **C**. The limit is T_hot divided by the lift, both in kelvin: 310.9 / (310.9 - 258.2) = 310.9 / 52.8, or about 5.9. Option A comes from using °F instead of kelvin, and option D is only the lift. Real machines reach a fraction of this limit, but no machine can exceed it, because the second law of thermodynamics sets the ceiling.

    **Concept Tested:** Carnot Limit

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 5. Why does the Carnot limit fall from 10.6 to 5.9 when the outdoor temperature drops from 47°F to 5°F with 100°F supply air?

<div class="upper-alpha" markdown>
1. Colder air holds less heat, so the evaporator cannot absorb any at all
2. The refrigerant must be changed to a different type below freezing
3. The supply temperature must rise as the outdoor temperature falls
4. The lift grows from 29.4 K to 52.8 K, and a larger lift lowers the limit
</div>

??? question "Show Answer"
    The correct answer is **D**. The lift is the gap between the delivery temperature and the source temperature. A colder day widens the gap from 29.4 K to 52.8 K, so the same machine must work harder per unit of heat delivered. Cold air still holds heat, which is why a heat pump can heat in Minnesota winters. The supply temperature stays at 100°F in this example, so only the source changes.

    **Concept Tested:** Temperature Lift

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 6. The NEEP cold-climate specification asks for a COP of at least 1.75 at 5°F, where the Carnot limit is 5.9. About what fraction of the limit is that?

<div class="upper-alpha" markdown>
1. About 10 percent
2. About 30 percent
3. About 60 percent
4. About 100 percent
</div>

??? question "Show Answer"
    The correct answer is **B**. Dividing 1.75 by 5.9 gives about 0.30, or 30 percent. Real equipment captures only a fraction of the thermodynamic limit, and no engineering breakthrough repeals the arithmetic. Progress shows up as a larger fraction of the limit and a machine that holds its capacity as the lift grows, which is the goal of a cold-climate heat pump.

    **Concept Tested:** Cold-Climate Heat Pump

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 7. What advantage does a variable-speed (inverter-driven) compressor give a cold-climate heat pump?

<div class="upper-alpha" markdown>
1. It adjusts its speed to the load instead of cycling on and off, which improves efficiency and helps hold capacity in the cold
2. It raises the Carnot limit by lowering the lift between the source and the supply air
3. It lets the machine run without a refrigerant at mild outdoor temperatures
4. It removes the need for an expansion valve in the refrigerant loop
</div>

??? question "Show Answer"
    The correct answer is **A**. An inverter varies the compressor speed to match the load, so the machine runs steadily instead of starting and stopping. That improves efficiency and lets it hold capacity at low outdoor temperatures. The compressor does not change the temperatures the machine works between, so the Carnot limit is unchanged, and the expansion valve is still needed in every refrigeration cycle.

    **Concept Tested:** Variable-Speed Compressor

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 8. Why was R-410A replaced by refrigerants such as R-454B and R-32 in new residential equipment manufactured from 2025?

<div class="upper-alpha" markdown>
1. R-410A cannot absorb heat below 40°F
2. R-410A damages the electronics of inverter-driven compressors
3. Its global warming potential near 2,088 exceeds the EPA limit of 700 for new equipment
4. Its price rose above that of the newer refrigerants
</div>

??? question "Show Answer"
    The correct answer is **C**. Under the AIM Act, EPA's Technology Transitions rule limits new residential air-conditioning and heat pump equipment to refrigerants with a global warming potential below 700. R-410A is near 2,088. The replacements are mildly flammable, so codes, installer training, and service practices are changing too. The refrigerant's heat-absorbing ability is not the issue.

    **Concept Tested:** Refrigerant Global Warming Potential

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 9. At the illustrative prices of $1.20 per therm and $0.14 per kWh, a 95 percent gas furnace costs $1.26, a seasonal COP 2.5 heat pump $1.64, and electric resistance $4.10 per 100,000 Btu of heat. Which conclusion follows?

<div class="upper-alpha" markdown>
1. The heat pump is cheaper to run than both the furnace and electric resistance
2. The furnace is cheaper to run, but the heat pump costs well under half as much as resistance heat
3. Electric resistance is cheapest because its efficiency is 100 percent
4. All three cost the same because each delivers 100,000 Btu of heat
</div>

??? question "Show Answer"
    The correct answer is **B**. At these prices the furnace still wins, while the heat pump costs about 40 percent of resistance heat because each kWh yields 2.5 times as much heat. Prices move from year to year, so the heat pump breaks even when gas costs about 11.1 times the electricity price per kWh. Always rerun the comparison with current local rates.

    **Concept Tested:** Coefficient of Performance

    **See:** [Worked Example: Heating Cost per 100,000 Btu](index.md#worked-example-heating-cost-per-100000-btu)

---

#### 10. A homeowner replaces a gas furnace and a gas water heater with electric equipment. Which design question does this building electrification raise?

<div class="upper-alpha" markdown>
1. Whether the existing gas meter can be upgraded to a larger size
2. Whether the old chimney can safely vent the new equipment
3. Whether the heat pump's COP will exceed the Carnot limit
4. Whether the electrical panel and service can carry the added load
</div>

??? question "Show Answer"
    The correct answer is **D**. Replacing combustion equipment with electric equipment adds electrical load, so the panel space and the service size become design questions, as Chapter 15 explains. The gas meter and chimney no longer matter for the electric equipment, and the COP can never exceed the Carnot limit. Electrification moves the design problem from the gas line to the electrical system.

    **Concept Tested:** Building Electrification

    **See:** [What Is Changing](index.md#what-is-changing)
