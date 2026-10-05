---
title: "Force Vector Resolver"
description: "Students resolve an inclined force into horizontal and vertical components by setting a force and angle or dragging the arrow tip. A readout gives the components in pounds and newtons, and a predict-first mode asks the student to type the horizontal component before it is revealed."
image: /sims/force-vector-resolver/force-vector-resolver.png
og:image: /sims/force-vector-resolver/force-vector-resolver.png
twitter:image: /sims/force-vector-resolver/force-vector-resolver.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Force Vector Resolver

<iframe src="main.html" width="100%" height="557" scrolling="no"></iframe>

[Run the Force Vector Resolver MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/force-vector-resolver/main.html" width="100%" height="557" scrolling="no"></iframe>
```

## Description

Students resolve an inclined force into horizontal and vertical components by setting a force and angle or dragging the arrow tip. A readout gives the components in pounds and newtons, and a predict-first mode asks the student to type the horizontal component before it is revealed.

## How to Use

1. Set the force and angle with the sliders, or drag the circle at the tip of the dark orange arrow. The dashed blue (horizontal) and green (vertical) arrows form a right triangle.
2. Read the readout for the force and both components in pounds and newtons. Check Show equations to see Fx = F cos θ and Fy = F sin θ with your numbers substituted.
3. Check Predict first, type your answer for the horizontal component in pounds, and press Check. The sim shows whether you are right and displays the calculation. Changing the vector starts a new question.
4. Press Riverbend roof to see the 168-kip roof load as a straight-down arrow, and notice that it has no horizontal component. Press Back to brace to return to the 5,000 lb brace at 45°.

## Lesson Plan

**Learning objective:** Calculate the horizontal and vertical components of an inclined force and explain why the two components together have the same effect as the original force.

**Suggested activities**

- Warm-up (5 min): Students predict the components of the Riverbend brace (5,000 lb at 45°) and compare them with the sim (3,536 lb each).
- Explore (10 min): Using Predict first, students solve five vectors of their choice by hand, then check; they record which angles give a larger horizontal or vertical component.
- Explain (5 min): Students describe in a sentence why the check line gives the original force back, and what happens at 0° and 90°.

**Assessment**

- Students calculate the components of a 7,500 lb force at 30° from the horizontal and convert the horizontal component to newtons.
- Students explain in two sentences why a brace at a steep angle mostly lifts or presses a connection rather than sliding it.

## References

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Euclidean vector (Wikipedia)](https://en.wikipedia.org/wiki/Euclidean_vector)
- [Resultant force (Wikipedia)](https://en.wikipedia.org/wiki/Resultant_force)

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** force-vector-resolver<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the horizontal and vertical components of an inclined force and will explain (Bloom Level 2, Understand) why the two components together have the same effect as the original force.

Visual: A canvas showing a labeled node at the center and a bold arrow representing a force. Dashed horizontal and vertical arrows form a right triangle that shows the components. A live readout panel displays the magnitude, the angle, and the two components in both pounds and newtons. The canvas width follows the container, the height is 420 px, and the sketch redraws on window resize.

Controls: A slider labeled "Force (lb)" from 0 to 10,000 with a default of 5,000. A slider labeled "Angle (degrees)" from 0 to 90 with a default of 45. The student can also drag the arrow tip directly, and the sliders update to match. A checkbox labeled "Show equations" displays the substituted values for \( F\cos\theta \) and \( F\sin\theta \). A button labeled "Riverbend roof" loads a preset that draws the 168-kip roof load as a downward vector.

Interactions: Hovering over any arrow shows a tooltip with its name and value. A "Predict first" mode asks the student to type the horizontal component, and the sketch then shows whether the answer is correct and displays the calculation. A message states when the angle is 0 (all force horizontal) or 90 (all force vertical).

Colors: The force is dark orange, the horizontal component is blue, and the vertical component is green. Arrow labels use text as well as color.

Implementation: p5.js with a responsive canvas, built-in slider and checkbox controls, and a small infobox div.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
