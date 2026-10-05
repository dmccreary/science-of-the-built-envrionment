# Quiz: Solar Photovoltaics

Test your understanding of the concepts in [Appendix C](index.md) with these review questions.

---

#### 1. What does the inverter do in a rooftop photovoltaic system?

<div class="upper-alpha" markdown>
1. It tracks the sun so the panels face it all day
2. It stores the day's surplus energy for use at night
3. It reduces the panel voltage to a safe level on the roof
4. It converts the panels' direct current to the alternating current the building uses
</div>

??? question "Show Answer"
    The correct answer is **D**. A photovoltaic panel converts sunlight directly into direct-current electricity, but a building's lights, outlets, and equipment run on alternating current. The inverter makes that conversion. It also adds to the system's losses, which is one reason the annual-energy formula includes a derate. Storing surplus energy takes a battery, covered in Appendix D.

    **Concept Tested:** Inverter

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 2. What is a peak sun hour?

<div class="upper-alpha" markdown>
1. An hour at midday when the sun is highest in the sky
2. A unit of daily solar energy equal to one hour of sunlight at 1,000 W/m²
3. The number of hours between sunrise and sunset
4. The hour of the year in which the array makes the most power
</div>

??? question "Show Answer"
    The correct answer is **B**. Peak sun hours express a day's solar energy as the number of hours at a standard intensity of 1,000 watts per square meter. A site with 4.3 peak sun hours receives as much energy in a day as 4.3 hours of full sun would deliver, even though the real day is longer and the sun is weaker much of the time. The value is an input to the annual-energy formula.

    **Concept Tested:** Peak Sun Hours

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 3. A 6 kW array at a site with 4.0 peak sun hours has a derate of 0.80. About how much energy does it produce in a year?

<div class="upper-alpha" markdown>
1. 7,008 kWh
2. 8,760 kWh
3. 5,606 kWh
4. 70,080 kWh
</div>

??? question "Show Answer"
    The correct answer is **A**. Annual energy is array size times peak sun hours times 365 times the derate: 6 × 4.0 × 365 × 0.80 = 7,008 kWh. Option B leaves out the derate, option C applies it twice, and option D is a decimal slip. For a real site, use a tool such as NREL's PVWatts, because the peak sun hours and derate here are illustrative.

    **Concept Tested:** System Derate

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 4. What does the derate in the annual-energy formula represent?

<div class="upper-alpha" markdown>
1. The share of the roof area covered by modules
2. The portion of the annual energy sold back to the utility
3. The combined losses from wiring, the inverter, dirt, snow, and heat
4. The tax credit that lowers the price of the system
</div>

??? question "Show Answer"
    The correct answer is **C**. A panel never delivers its full rated output to the building. Wiring resistance, inverter conversion, dirt, snow cover, and high panel temperatures each take a share, and the derate (0.80 in the worked example) multiplies them together. The roof area, the exported energy, and the price do not appear in the energy chain, which depends on array size, sunlight, and losses.

    **Concept Tested:** System Derate

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 5. About how much roof area does a 7 kW array need if the modules are 21 percent efficient?

<div class="upper-alpha" markdown>
1. 1.5 m²
2. 33 m²
3. 70 m²
4. 147 m²
</div>

??? question "Show Answer"
    The correct answer is **B**. At 1,000 W/m², each square meter of 21 percent efficient module produces 210 W, so 7 kW needs 7 / 0.21, about 33 m², or roughly 360 ft². Option A multiplies instead of dividing. Roof area is a real constraint, and roof condition, structure, and fire-code setbacks now shape a design as much as the array itself.

    **Concept Tested:** Peak Sun Hours

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 6. Why does an annual coverage of 88 percent not mean the grid is needed for only 12 percent of every month?

<div class="upper-alpha" markdown>
1. The utility removes 12 percent of the energy from each monthly bill
2. Winter loads are always smaller than summer loads
3. Output follows demand closely, so the shortfall is spread evenly across the year
4. The sun is far stronger in June than in December, so summer surplus and winter shortfall are hidden in the annual total
</div>

??? question "Show Answer"
    The correct answer is **D**. Annual energy hides when the energy arrives. Most of it comes from spring through fall, and December is weak because of short days, a low sun angle, and snow. A month in summer may have a surplus while a winter month has a large shortfall. This timing mismatch is why storage and net-metering rules matter.

    **Concept Tested:** Peak Sun Hours

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 7. How does a shift from one-for-one net metering credit to a lower rate for exported power change the value of solar?

<div class="upper-alpha" markdown>
1. It makes exported power worth more than power used on site
2. It has no effect, because the credit depends only on array size
3. It raises the value of using solar energy on site, including with batteries
4. It lets owners ignore the timing of their production
</div>

??? question "Show Answer"
    The correct answer is **C**. With one-for-one credit, the grid acts like a free battery. When the credit for exports falls below the retail rate, each kWh used on site becomes worth more than each kWh exported. That raises the value of shifting use to sunny hours and of storing surplus energy in a battery, as Appendix D explains. Rules for selling power back differ by utility and keep changing.

    **Concept Tested:** Net Metering

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 8. A home's asphalt roof has about five years of service life left. What should the owner do before sizing a solar system?

<div class="upper-alpha" markdown>
1. Check the roof's remaining life first, because replacing it later means removing and reinstalling the array
2. Install now, because the panels will protect the shingles and delay any roof replacement
3. Install now and enlarge the array to offset the cost of a later reinstall
4. Install on the north slope, where the roof will age more slowly
</div>

??? question "Show Answer"
    The correct answer is **A**. Panels last decades, so a roof that needs replacing in five years means paying twice for the array work: once to remove it and once to reinstall it. Check the roof's remaining service life and its structure before sizing the system. Chapters 6 and 13 supply the tools to check structural capacity and roof condition, and a larger array does not offset the extra cost.

    **Concept Tested:** Inverter

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 9. Appendix C reports that the global average cost of solar electricity fell by roughly 90 percent between 2010 and 2023. What does it say about the cost of a rooftop job today?

<div class="upper-alpha" markdown>
1. Hardware remains the largest share, because modules are still the costliest item
2. Hardware is an insignificant share, because incentives now pay for the modules
3. The share of hardware is unchanged since 2010
4. Hardware is now a smaller share than labor, permitting, and financing
</div>

??? question "Show Answer"
    The correct answer is **D**. As module prices fell, the other costs of a rooftop job became the larger share: installation labor, permitting, and financing. Incentives and net-metering rules also keep changing, so the economics of a given building can shift from year to year. The sunlight arriving on the roof does not change, which is why the energy formula stays the same.

    **Concept Tested:** Net Metering

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 10. Panels make more power per sunbeam when they are cool, yet a Minnesota array still produces the least in December. Why?

<div class="upper-alpha" markdown>
1. Cold panels lose output, so winter production always falls
2. Short days, a low sun angle, and snow cover outweigh the small benefit of cool panels
3. The inverter shuts down whenever the temperature falls below freezing
4. Utilities stop accepting exported power during the winter months
</div>

??? question "Show Answer"
    The correct answer is **B**. Cold helps a little, but the sunlight reaching the panel sets the output. In December the days are short, the sun is low, and snow can cover the modules, so peak sun hours are lowest. Most of the annual energy arrives from spring through fall. Nothing makes inverters shut down at freezing, and the utility's export rules depend on the policy, not the season.

    **Concept Tested:** Peak Sun Hours

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)
