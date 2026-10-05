# Quiz: Smart Sensors and Building Automation

Test your understanding of the concepts in [Appendix F](index.md) with these review questions.

---

#### 1. In a control loop, what does the controller do with a sensor reading?

<div class="upper-alpha" markdown>
1. It sends the reading to the cloud for storage only
2. It converts the reading into alternating current to power the sensor
3. It adjusts the sensor's calibration to match the setpoint
4. It compares the reading with the setpoint and commands an actuator
</div>

??? question "Show Answer"
    The correct answer is **D**. A sensor by itself only reports. The controller compares the reading with the setpoint, the value the building should hold, and then commands an actuator such as a damper motor, a valve, a compressor, or a light dimmer. The loop closes when the actuator changes the room and the sensor reports the new reading. A controller can also act on a non-sensor input, such as a utility price signal.

    **Concept Tested:** Control Loop

    **See:** [From Measurement to Action](index.md#from-measurement-to-action)

---

#### 2. Why is carbon dioxide measured in occupied rooms?

<div class="upper-alpha" markdown>
1. It is a proxy for how much of the room's air is exhaled breath, and so for the ventilation rate per person
2. It shows how much heat the occupants are giving off
3. It shows whether a combustion appliance is leaking exhaust
4. It measures humidity indirectly
</div>

??? question "Show Answer"
    The correct answer is **A**. People exhale carbon dioxide at a fairly steady rate, so its concentration in a room rises when the outdoor air supply is too small for the number of people. That makes it a practical proxy for ventilation per person. A reading of 1,000 ppm with 420 ppm outdoors corresponds to about 18 cfm of outdoor air per person. Carbon dioxide does not measure heat, leaks, or humidity.

    **Concept Tested:** Carbon Dioxide Monitoring

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 3. Twenty people each generate 0.0106 cfm of carbon dioxide in a room that receives 400 cfm of outdoor air at 420 ppm. What concentration does the room reach at steady state?

<div class="upper-alpha" markdown>
1. 530 ppm
2. 1,060 ppm
3. 950 ppm
4. 1,590 ppm
</div>

??? question "Show Answer"
    The correct answer is **C**. The generation rate is 20 × 0.0106 = 0.212 cfm. The rise above outdoor air is 0.212 × 1,000,000 / 400 = 530 ppm, and the steady level is 420 + 530 = 950 ppm. Option A forgets to add the outdoor level. At steady state, what goes in must equal what goes out, which is the mass balance behind all ventilation control.

    **Concept Tested:** Carbon Dioxide Monitoring

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 4. A classroom sensor reads a steady 2,000 ppm, and the target was 1,000 ppm. What does this indicate?

<div class="upper-alpha" markdown>
1. Ventilation is about twice the intended rate
2. Ventilation is less than half of the intended rate
3. The sensor is certainly broken, because readings never exceed 1,000 ppm
4. Ventilation is about 20 percent below the intended rate
</div>

??? question "Show Answer"
    The correct answer is **B**. The rise above the 420 ppm outdoor level is 1,580 ppm at 2,000 ppm, compared with 580 ppm at 1,000 ppm. The rise is inversely proportional to the airflow, so the airflow per person is about 580 / 1,580, or 37 percent, of the intended value. Rooms can read well above 1,000 ppm when ventilation is too low, so the reading is probably true.

    **Concept Tested:** Carbon Dioxide Monitoring

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 5. How does demand-controlled ventilation save energy?

<div class="upper-alpha" markdown>
1. It recirculates all indoor air so no outdoor air is ever needed
2. It turns the lights off when rooms are empty
3. It reads the room temperature faster than a thermostat can
4. It reduces outdoor air, and the heating or cooling energy it carries, when a room is only partly occupied
</div>

??? question "Show Answer"
    The correct answer is **D**. Demand-controlled ventilation uses a sensor, usually carbon dioxide, to match the outdoor airflow to the number of people in the room. A room that is half full needs about half the air, so the fans move less air and the building spends less energy heating or cooling it. Fresh air is still needed, so recirculating all air would let carbon dioxide and odors build up.

    **Concept Tested:** Demand-Controlled Ventilation

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 6. Why can a carbon dioxide sensor placed next to a supply grille mislead the controller?

<div class="upper-alpha" markdown>
1. It reads high, so the controller wastes ventilation energy
2. It cannot measure carbon dioxide at all in moving air
3. It reads low because of the fresh air nearby, so the controller does not raise the airflow even though the breathing zone is above the setpoint
4. It reads correctly, because supply air is representative of the whole room
</div>

??? question "Show Answer"
    The correct answer is **C**. A reading is a measurement of one spot. Next to a supply grille, the air is mostly fresh outdoor air, so the sensor reads low. In the appendix example the breathing zone reaches 1,303 ppm while the sensor reads only 950 ppm, below the 1,000 ppm setpoint, so the airflow is never raised. Check placement and calibrate on a schedule.

    **Concept Tested:** Sensor Calibration and Placement

    **See:** [The Physics That Does Not Change](index.md#the-physics-that-does-not-change)

---

#### 7. What is the purpose of fault detection and diagnostics (FDD)?

<div class="upper-alpha" markdown>
1. Software compares sensor data with expectations to detect faults such as a stuck damper or simultaneous heating and cooling
2. It replaces the building's local controllers with a cloud service
3. It checks the design drawings against the code before a permit is issued
4. It reduces sensor cost by removing duplicate sensors
</div>

??? question "Show Answer"
    The correct answer is **A**. Analytics software compares what the sensors report with what the building should be doing and flags faults such as a stuck damper or a system that heats and cools at the same time. Some tools also recommend fixes. This is sometimes called continuous commissioning, because it extends the commissioning of Chapter 2 beyond the day of handover. Plan review checks drawings against the code, not equipment in operation.

    **Concept Tested:** Fault Detection and Diagnostics

    **See:** [What Is Changing](index.md#what-is-changing)

---

#### 8. A water leak sensor detects a leak. Which action should it drive?

<div class="upper-alpha" markdown>
1. Raising the ventilation airflow
2. Closing the main water shutoff valve
3. Lowering the speed of the heat pump compressor
4. Charging the battery
</div>

??? question "Show Answer"
    The correct answer is **B**. Closing the main valve at once limits the damage a leak causes, which is the kind of water intrusion failure Chapter 21 describes. A leak sensor should do more than send an alert. Each of the other actions answers a different input: carbon dioxide drives ventilation, room temperature drives compressor speed, and a time-of-use price signal drives the battery.

    **Concept Tested:** Water Leak Detection

    **See:** [From Measurement to Action](index.md#from-measurement-to-action)

---

#### 9. Which practice reduces security and privacy risk in connected buildings?

<div class="upper-alpha" markdown>
1. Limit what is collected, keep building networks separate from other networks, and update equipment software
2. Connect every sensor to the guest Wi-Fi so it is easy to reach
3. Leave equipment software unchanged after commissioning, because updates may disturb the controls
4. Collect as much occupancy data as possible in case it is needed later
</div>

??? question "Show Answer"
    The correct answer is **A**. Occupancy sensors, cameras, and connected equipment collect information about people, and networked controls can be attacked. Good practice limits data collection, separates the building network from other networks, and keeps software updated. Treat these issues as part of building design, like fire separation. The other options increase the exposure of both people and equipment.

    **Concept Tested:** Building Cybersecurity and Privacy

    **See:** [Privacy and Security](index.md#privacy-and-security)

---

#### 10. What is a digital twin of a building?

<div class="upper-alpha" markdown>
1. A duplicate set of sensors installed for redundancy
2. A backup controller that takes over when the main controller fails
3. A software model of the building that is updated with live sensor data, so changes can be tested on the model first
4. A design model that is archived and never updated after handover
</div>

??? question "Show Answer"
    The correct answer is **C**. A digital twin is a software model kept current by live sensor data. Designers and operators can try a change, such as a new setpoint schedule, on the model before making it in the building. Because the twin is only as good as its inputs, sensor calibration and placement matter. A model that is archived at handover is not a twin, and a twin is not hardware.

    **Concept Tested:** Digital Twin

    **See:** [What Is Changing](index.md#what-is-changing)
