# Quiz: Digital Design, Prefabrication, Robotics, and AI

Test your understanding of the concepts in [Appendix I](index.md) with these review questions.

---

#### 1. What is clash detection?

<div class="upper-alpha" markdown>
1. A site inspection that finds conflicts between neighboring properties
2. A code review that compares drawings with the adopted energy code
3. A scheduling method that finds trades booked on the same day
4. Software that flags conflicts in a shared building model, such as a duct passing through a beam, before anything is built
</div>

??? question "Show Answer"
    The correct answer is **D**. Because the architect, the structural engineer, and the mechanical and electrical designers draw in the same building information model, software can test every element against every other one. It can flag a duct that passes through a beam before anyone pours concrete. Finding the conflict in the model costs far less than finding it in the field, where the fix means rework.

    **Concept Tested:** Clash Detection

    **See:** [Building Information Modeling](index.md#building-information-modeling)

---

#### 2. What makes building information modeling (BIM) different from a set of separate drawings?

<div class="upper-alpha" markdown>
1. It is a shared three-dimensional model in which every element carries data such as material, size, cost, and manufacturer
2. It is a set of drawings that are printed in three dimensions
3. It is a drawing standard that applies only to architects
4. It is a scheduling tool that does not describe building geometry
</div>

??? question "Show Answer"
    The correct answer is **A**. In BIM, each element in the model carries data, and every design discipline works in the same model. That allows software to check the design, count quantities, and hand the model to the owner for operation, which connects to the digital twins of Appendix F. A set of separate drawings has no shared data, so conflicts between trades are found only by human review.

    **Concept Tested:** Clash Detection

    **See:** [Building Information Modeling](index.md#building-information-modeling)

---

#### 3. Why do BIM and clash detection reduce the cost of a project?

<div class="upper-alpha" markdown>
1. Models eliminate the need for permits
2. Models guarantee that no change orders will occur
3. The cost of changing a decision rises with each project phase, so finding a problem in the model is cheaper than in the field
4. Models replace the engineer's calculations
</div>

??? question "Show Answer"
    The correct answer is **C**. Chapter 2 shows that the cost of a change rises as a project moves from design to construction. A conflict found in the model is fixed with a drawing change, while the same conflict found on site means demolition and rework. These tools move the discovery of problems earlier and take the work of fixing them out of the field. They do not remove permits or calculations, and they cannot prevent every change order.

    **Concept Tested:** Clash Detection

    **See:** [Building Information Modeling](index.md#building-information-modeling)

---

#### 4. Which is a benefit of prefabrication in a factory?

<div class="upper-alpha" markdown>
1. The design can be finalized late, with no need for lead time
2. The work is protected from weather, uses repeatable jigs, and can be inspected as it is made
3. The components need no connections when they arrive on site
4. Transport size limits no longer matter
</div>

??? question "Show Answer"
    The correct answer is **B**. Factory work is protected from weather, uses repeatable jigs, and can be inspected as each component is made. The costs are the lead time, because the design must be finalized earlier, the transport size limits, and the connections between components. Modular construction takes the same idea further by delivering whole room-sized modules, and the other options reverse the real trade-offs.

    **Concept Tested:** Prefabrication

    **See:** [Prefabrication and Modular Construction](index.md#prefabrication-and-modular-construction)

---

#### 5. For a prefabricated enclosure, which is the critical detail to get right?

<div class="upper-alpha" markdown>
1. The weather protection of the factory floor
2. The repeatability of the factory jigs
3. The ability to inspect panels as they are made
4. The continuity of the enclosure's control layers across the joints between components
</div>

??? question "Show Answer"
    The correct answer is **D**. Options A through C are benefits of building in a factory. The concern is what happens where factory-built pieces meet on site. The control layers for water, air, vapor, and heat that Chapters 11 and 12 describe must be continuous across every joint, or the enclosure leaks even though each panel is perfect. The connections between components become the critical detail.

    **Concept Tested:** Modular Construction

    **See:** [Prefabrication and Modular Construction](index.md#prefabrication-and-modular-construction)

---

#### 6. What do drones and laser scanners do on a construction site?

<div class="upper-alpha" markdown>
1. They record the as-built condition of the site and compare it with the model
2. They mark layout from the model onto the floor
3. They tie rebar intersections
4. They print concrete
</div>

??? question "Show Answer"
    The correct answer is **A**. This is reality capture: drones and laser scanners record what has been built so it can be compared with the design model. Marking layout is done by robotic total stations, and other machines tie rebar, drill ceiling anchors, and print concrete. Each of these tools handles a different task, and all are in research, early commercial use, or both.

    **Concept Tested:** Reality Capture

    **See:** [Robotics and Reality Capture](index.md#robotics-and-reality-capture)

---

#### 7. How does construction robotics change the work done by people, according to the appendix?

<div class="upper-alpha" markdown>
1. It replaces all trades within a few years
2. It affects only office design work
3. It takes over repetitive, precise, or physically hard tasks, and shifts human work toward planning, checking, and fixing
4. It increases the amount of repetitive work on site
</div>

??? question "Show Answer"
    The correct answer is **C**. Robotic tools take over tasks that are repetitive, precise, or physically hard, such as tying rebar or drilling anchors. People move toward planning the work, checking the results, and fixing what the machines miss. The appendix tells readers to watch which tools move from pilots to ordinary use, and what that means for construction jobs and training.

    **Concept Tested:** Construction Robotics

    **See:** [Robotics and Reality Capture](index.md#robotics-and-reality-capture)

---

#### 8. Which caution does the appendix give about AI assistants in design and code review?

<div class="upper-alpha" markdown>
1. They make errors only on rare tasks, which seldom affect compliance
2. They make errors with confidence, so any output affecting safety or code compliance needs review by a qualified person who is accountable for it
3. Their output can be accepted if it contains precise numbers
4. Review is needed only when a calculation fails to run
</div>

??? question "Show Answer"
    The correct answer is **B**. AI tools can quote a code section that does not exist or misapply one that does, and they do so in a confident tone. Precise-sounding numbers are not evidence that a statement has been checked. Look up the section in the adopted code, confirm the edition, and have a licensed professional sign off on anything that carries risk, as Chapters 2 and 17 describe.

    **Concept Tested:** AI-Assisted Design and Code Review

    **See:** [AI Assistants](index.md#ai-assistants)

---

#### 9. An AI assistant states that a 7 kW solar array in Minneapolis typically produces about 88,000 kWh per year. What is the best response?

<div class="upper-alpha" markdown>
1. Reject it, and check with a one-line calculation: 7 × 4.3 × 365 × 0.80 is about 8,800 kWh, so the claim is off by a factor of ten
2. Accept it, because it contains a specific number
3. Accept it, because the assistant was trained on large amounts of data
4. Reject it only if a licensed engineer is unavailable to review it
</div>

??? question "Show Answer"
    The correct answer is **A**. The worked example in Appendix C gives about 8,800 kWh, so the statement is ten times too high. A one-line check against the physics exposes the error. A confident, precise-sounding statement is not necessarily correct, and a statement with real numbers has not necessarily been checked. Verifying the number quickly is better than trusting it.

    **Concept Tested:** AI Output Verification

    **See:** [AI Assistants](index.md#ai-assistants)

---

#### 10. Why is a builder who understands loads and control layers not made redundant by AI tools?

<div class="upper-alpha" markdown>
1. AI tools cannot check calculations at all
2. Codes forbid the use of AI in design work
3. AI output is always correct but must carry a license stamp
4. Without that understanding a person cannot tell when an answer is wrong, and the building must still carry its loads and control water, air, and heat
</div>

??? question "Show Answer"
    The correct answer is **D**. None of these tools changes what a building must do: support its loads, control heat, air, water, and vapor, serve its occupants, and protect them from fire. A tool can check a calculation, but a builder who does not understand the load path or the control layers cannot judge whether its answer is wrong. Physics knowledge lets a person use each new tool with judgment.

    **Concept Tested:** AI Output Verification

    **See:** [The Pattern Under the Change](index.md#the-pattern-under-the-change)
