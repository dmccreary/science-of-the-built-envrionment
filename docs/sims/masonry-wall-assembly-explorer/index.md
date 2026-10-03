---
title: Masonry Wall Assembly Explorer
description: Students will identify (Bloom Level 1, Remember) the parts of a masonry wall, including units, mortar, grout, reinforcement, and joints, and will compare (Bloom Level 4, Analyze) an unreinforced wall with a reinforced one under lateral load.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Masonry Wall Assembly Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md).

```text
Type: microsim
**sim-id:** masonry-wall-assembly-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the parts of a masonry wall, including units, mortar, grout, reinforcement, and joints, and will compare (Bloom Level 4, Analyze) an unreinforced wall with a reinforced one under lateral load.

Visual: An elevation and cutaway of a concrete block wall, with a clay brick veneer option, showing courses, bond, mortar joints, cores, vertical bars, a bond beam, joint reinforcement, a control joint, and an expansion joint in the brick. The canvas follows the container width with a height of 520 px.

Controls: Radio buttons labeled "Unreinforced CMU," "Reinforced CMU," "Brick veneer on CMU," and "Stone veneer" switch the assembly. A slider labeled "Wind pressure (psf)" applies sideways load. A checkbox labeled "Grout the cells" fills the cores. A drop-down labeled "Mortar type" (M, S, N, O) changes the joint color and the strength readout.

Interactions: Hovering over a part highlights it and shows its name. Clicking a part opens an infobox with its function, its size, and the standard that governs it. As the wind pressure rises, the unreinforced wall shows horizontal cracks in the mortar joints at a low load, while the reinforced wall shows no cracking until a much higher load, with a text explanation of the steel's role. A button labeled "Count the units" computes units and bricks per square foot for the wall dimensions chosen with two sliders.

Colors: Block is light gray, brick is red-brown, mortar is tan, grout is darker gray, and steel is black. All elements are labeled with text.

Implementation: p5.js with a responsive canvas and DOM controls.
```

## Related Resources

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
