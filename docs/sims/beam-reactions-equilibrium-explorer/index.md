---
title: Beam Reactions and Equilibrium Explorer
description: Students load a simply supported beam with a point load or a uniform line load and watch the support reactions change length as the load moves. A panel substitutes the current numbers into the three equilibrium equations and checks that all three sums are zero.
image: /sims/beam-reactions-equilibrium-explorer/beam-reactions-equilibrium-explorer.png
og:image: /sims/beam-reactions-equilibrium-explorer/beam-reactions-equilibrium-explorer.png
twitter:image: /sims/beam-reactions-equilibrium-explorer/beam-reactions-equilibrium-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Beam Reactions and Equilibrium Explorer

<iframe src="main.html" width="100%" height="557" scrolling="no"></iframe>

[Run the Beam Reactions and Equilibrium Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/beam-reactions-equilibrium-explorer/main.html" width="100%" height="557" scrolling="no"></iframe>
```

## Description

Students load a simply supported beam with a point load or a uniform line load and watch the support reactions change length as the load moves. A panel substitutes the current numbers into the three equilibrium equations and checks that all three sums are zero.

## How to Use

1. Set the beam span and the load with the sliders. Drag the orange load arrow along the beam, or use the Dist. from A slider. The reaction arrows at A and B resize as you move it.
2. Read the equation panel: it substitutes the current numbers into the moment, vertical-force, and horizontal-force equations and shows an equilibrium check. Hover over any arrow to see its name and value.
3. Press Step through to reveal the three equations one at a time, in the order you would solve them by hand: moments about A, then vertical forces, then horizontal forces.
4. Switch to Uniform (plf) to see a line load act as one force at midspan, then check Remove support B to see the beam rotate about A because the moment equation can no longer be satisfied.

## Lesson Plan

**Learning objective:** Calculate the support reactions of a simply supported beam by applying the three equilibrium conditions, and analyze how moving a load changes the share carried by each support.

**Suggested activities**

- Warm-up (5 min): Students predict RA and RB for the Riverbend beam (6,000 lb, 10 ft from A on a 40 ft span), then check against the sim.
- Explore (10 min): Students move the load to five positions and record RA and RB, then describe in words how the share changes as the load nears a support.
- Extend (10 min): Students use Step through to solve a new case by hand, compare it with the panel, and then explain what Remove support B shows about the moment equation.

**Assessment**

- Students calculate the reactions for a 30 ft span with a 9,000 lb load 10 ft from A, and verify the answer by taking moments about B.
- Students explain in two sentences why a beam with only one support cannot be in equilibrium under an off-center load.

## References

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Statics (Wikipedia)](https://en.wikipedia.org/wiki/Statics)
- [Beam (structure) (Wikipedia)](https://en.wikipedia.org/wiki/Beam_(structure))

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** beam-reactions-equilibrium-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the support reactions of a simply supported beam by applying the three equilibrium conditions, and will analyze (Bloom Level 4, Analyze) how moving a load changes the share carried by each support.

Visual: A horizontal beam drawn between a pin support at A (left) and a roller support at B (right), with a downward load arrow. Upward reaction arrows at A and B scale in length with their values. A panel beside the beam lists the three equilibrium sums with the current numbers substituted. The canvas width follows the container, the height is 400 px, and the sketch redraws on window resize.

Controls: A slider labeled "Beam span (ft)" from 10 to 60 with a default of 40. A slider labeled "Load (lb)" from 0 to 12,000 with a default of 6,000. The student drags the load along the beam, or uses a slider labeled "Distance from A (ft)". A radio control switches between "Point load" and "Uniform line load (plf)". A button labeled "Step through" reveals the three equations one at a time.

Interactions: As the load moves, the reaction arrows resize in real time. A readout shows each sum of forces and moments, and an "Equilibrium check" indicator turns green when all three sums equal zero. A toggle labeled "Remove support B" shows the beam rotating about A, with a caption that the moment equation can no longer be satisfied. Hovering any arrow shows its name and value.

Colors: The beam is brown, applied loads are orange, and reactions are green. Failed equilibrium is shown in red with a text label.

Implementation: p5.js with a responsive canvas, built-in slider and radio controls, and an equation panel updated every frame.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
