---
title: Beam Reactions and Equilibrium Explorer
description: Students will calculate (Bloom Level 3, Apply) the support reactions of a simply supported beam by applying the three equilibrium conditions, and will analyze (Bloom Level 4, Analyze) how moving a load changes the share carried by each support.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Beam Reactions and Equilibrium Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
