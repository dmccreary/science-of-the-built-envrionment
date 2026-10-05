# Quiz: Heat Recovery Ventilation and Modern Heat Exchangers

Test your understanding of the concepts in [Appendix B](index.md) with these review questions.

---

#### 1. What is the difference between a heat recovery ventilator (HRV) and an energy recovery ventilator (ERV)?

<div class="upper-alpha" markdown>
1. An HRV moves air in one direction only, and an ERV moves it in both directions
2. An HRV transfers heat and moisture, and an ERV transfers only heat
3. An HRV transfers heat only, and an ERV also transfers moisture
4. An HRV serves houses, and an ERV serves only commercial buildings
</div>

??? question "Show Answer"
    The correct answer is **C**. Both units pass stale indoor air and fresh outdoor air on opposite sides of a thin core, and both transfer heat. An ERV's membrane core also moves water vapor. That helps keep Minnesota winter air from becoming extremely dry and reduces the moisture load on air conditioning in humid summers. The two types are not divided by building size.

    **Concept Tested:** Energy Recovery Ventilator

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 2. What does the core of an HRV do?

<div class="upper-alpha" markdown>
1. It lets heat pass between the two airstreams while keeping the air from mixing
2. It mixes a measured share of stale air into the supply to save heat
3. It stores heat in thermal mass and releases it overnight
4. It heats incoming air with an electric element when the outdoor air is cold
</div>

??? question "Show Answer"
    The correct answer is **A**. The core is a thin barrier between the outgoing and incoming airstreams. Heat crosses it from the warmer stream to the cooler one, but the air does not mix, so stale air and odors never reach the supply. Because the transfer depends on the temperature difference, the surface area, and the time the air spends in the core, better core designs keep raising effectiveness.

    **Concept Tested:** Heat Recovery Effectiveness

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 3. A balanced HRV with a sensible effectiveness of 0.70 serves a 70°F house when it is 10°F outdoors. What is the supply air temperature?

<div class="upper-alpha" markdown>
1. 28°F
2. 42°F
3. 63°F
4. 52°F
</div>

??? question "Show Answer"
    The correct answer is **D**. Supply temperature equals the outdoor temperature plus the effectiveness times the temperature difference: 10 + 0.70 × (70 - 10) = 10 + 42 = 52°F. Option A is the temperature of the exhaust air leaving the core, and option B forgets to add the outdoor temperature. Recovery never makes the supply as warm as the room unless the effectiveness is 1.

    **Concept Tested:** Heat Recovery Effectiveness

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 4. A 150 cfm balanced HRV with an effectiveness of 0.60 serves a 70°F house when it is -10°F outdoors. How much ventilation heating load does it remove?

<div class="upper-alpha" markdown>
1. 5,184 Btu/h
2. 7,776 Btu/h
3. 12,960 Btu/h
4. 10,368 Btu/h
</div>

??? question "Show Answer"
    The correct answer is **B**. Without recovery the load is 1.08 × 150 × 80 = 12,960 Btu/h. The HRV removes the effectiveness times that load, 0.60 × 12,960 = 7,776 Btu/h. Option A is the load that remains with the HRV, and option C is the load with no recovery at all. Effectiveness applies to the temperature difference, not to the volume of air.

    **Concept Tested:** Heat Recovery Effectiveness

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 5. Why can frost form in the core on a very cold day even though the exhaust air starts at room temperature?

<div class="upper-alpha" markdown>
1. Outdoor air leaks across the core and freezes the supply stream
2. The fans slow down in the cold, which lets the core fall to the outdoor temperature
3. The exhaust air is cooled below 32°F inside the core, so the moisture it carries freezes
4. The supply air carries moisture that the core removes and freezes
</div>

??? question "Show Answer"
    The correct answer is **C**. The exhaust air gives its heat to the incoming air and leaves the core much colder. At 0°F outdoors and an effectiveness of 0.80, it leaves at 14°F. Moisture from cooking, bathing, and breathing can then freeze on the core. Cold outdoor air is dry, so the supply stream is not the source. This is why cold-climate units need a defrost strategy.

    **Concept Tested:** Heat Exchanger Frost and Defrost

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 6. The exhaust air leaving the core is at 70 - ε × (70 - outdoor). For an effectiveness of 0.80, at what outdoor temperature does the exhaust air leaving the core reach 32°F?

<div class="upper-alpha" markdown>
1. 22.5°F
2. 14°F
3. 32°F
4. 0°F
</div>

??? question "Show Answer"
    The correct answer is **A**. Setting 70 - 0.80 × (70 - T) equal to 32 gives 0.80 × (70 - T) = 38, so 70 - T = 47.5 and T = 22.5°F. Below that outdoor temperature the exhaust can freeze moisture in the core. A more effective unit reaches 32°F at a higher outdoor temperature, so it needs a defrost strategy sooner, even though it recovers more heat.

    **Concept Tested:** Heat Exchanger Frost and Defrost

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 7. An HRV has a sensible effectiveness of 0.80. What does that figure mean?

<div class="upper-alpha" markdown>
1. It moves 80 percent of the building's air volume each hour
2. It returns 80 percent of the exhaust air to the rooms
3. It runs 80 percent of the time to avoid frost
4. The supply air warms 80 percent of the way from the outdoor temperature to the indoor temperature
</div>

??? question "Show Answer"
    The correct answer is **D**. Effectiveness is (T_supply - T_outdoor) divided by (T_indoor - T_outdoor), so 0.80 means the supply air closes 80 percent of the gap between outdoors and indoors. That removes 80 percent of the ventilation heating load. It is a statement about temperature, not about air volume, and the two airstreams stay separate.

    **Concept Tested:** Heat Recovery Effectiveness

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 8. Why can a unit with a high-effectiveness core still perform poorly in a real building?

<div class="upper-alpha" markdown>
1. Effectiveness ratings apply only at an outdoor temperature of 47°F
2. Leaky ducts or unbalanced supply and exhaust airflows waste the recovered heat
3. A tighter building lowers the effectiveness of the core
4. The core's rating falls each time the filter is replaced
</div>

??? question "Show Answer"
    The correct answer is **B**. A good core cannot make up for leaky ducts or for supply and exhaust flows that do not match. Air that escapes through a leak never passes through the core, and an unbalanced unit moves heat less effectively. Seal and test the ducts, and have the airflows measured and balanced at commissioning. Building tightness is what makes mechanical ventilation necessary, and it does not harm the core.

    **Concept Tested:** Heat Recovery Effectiveness

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 9. Why might a designer choose an ERV over an HRV in Minnesota?

<div class="upper-alpha" markdown>
1. Its membrane core also moves water vapor, which keeps winter air from becoming extremely dry and reduces summer moisture load
2. Its core transfers more sensible heat than any HRV can
3. It removes the need for any defrost strategy in cold weather
4. It brings in more outdoor air for the same fan power
</div>

??? question "Show Answer"
    The correct answer is **A**. The membrane core of an ERV transfers moisture as well as heat. In winter this returns some of the indoor moisture to the incoming air, and in a humid summer it keeps moisture out of the building and lowers the load on air conditioning. An ERV still has to handle cold-weather frost, and its heat transfer is not higher than an HRV's.

    **Concept Tested:** Energy Recovery Ventilator

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 10. Which defrost strategy do newer units use when frost forms in the core?

<div class="upper-alpha" markdown>
1. Spraying warm water across the core surface
2. Increasing the supply airflow to blow the frost out
3. Briefly pausing the supply fan so the warm exhaust air melts the frost
4. Permanently bypassing the exhaust airstream during winter
</div>

??? question "Show Answer"
    The correct answer is **C**. With the supply fan paused, no cold outdoor air flows through the core, and the warm exhaust air melts the frost. The right choice depends on the climate, and the strategy is one of the things changing in newer products. Pushing more cold air through the core would add frost, and bypassing the exhaust permanently would give up the recovery that the unit exists to provide.

    **Concept Tested:** Heat Exchanger Frost and Defrost

    **See:** [What Is Changing](index.md#what-is-changing)
