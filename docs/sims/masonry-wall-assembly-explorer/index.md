---
title: "Masonry Wall Assembly Explorer"
description: "Students explore an elevation and cutaway of a concrete block wall, with brick and stone veneer options, to name its parts, then raise a wind pressure to compare how an unreinforced and a reinforced wall crack. A counter turns a chosen wall size into the number of blocks or bricks."
image: /sims/masonry-wall-assembly-explorer/masonry-wall-assembly-explorer.png
og:image: /sims/masonry-wall-assembly-explorer/masonry-wall-assembly-explorer.png
twitter:image: /sims/masonry-wall-assembly-explorer/masonry-wall-assembly-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Analyze
---

# Masonry Wall Assembly Explorer

<iframe src="main.html" width="100%" height="697" scrolling="no"></iframe>

[Run the Masonry Wall Assembly Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/masonry-wall-assembly-explorer/main.html" width="100%" height="697" scrolling="no"></iframe>
```

## Description

Students explore an elevation and cutaway of a concrete block wall, with brick and stone veneer options, to name its parts, then raise a wind pressure to compare how an unreinforced and a reinforced wall crack. A counter turns a chosen wall size into the number of blocks or bricks.

## How to Use

1. Hover over any part of the wall to highlight it and read its name, then click it to read its function, size, and governing standard. The legend names every color.
2. Choose an assembly with the radio buttons: Unreinforced CMU, Reinforced CMU, Brick veneer on CMU, or Stone veneer. Use the Mortar type drop-down to change the joint color and the strength readout, and tick Grout the cells to fill the cores.
3. Raise the Wind pressure slider with Unreinforced CMU selected, and watch the side view bend and a crack open along a bed joint. Then choose Reinforced CMU and repeat. Compare the cracking pressure, what happens after the first crack, and how the readout explains the steel's role.
4. Press Count the units, set the wall length and height with the two sliders, and read the number of blocks and bricks per square foot and the total.

## Lesson Plan

**Learning objective:** Identify the parts of a masonry wall (units, mortar, grout, reinforcement, and joints) and compare an unreinforced wall with a reinforced one under lateral load.

**Suggested activities**

- Warm-up (5 min): Students find and click each part named in the legend and write one sentence on what it does, using the infobox.
- Explore (10 min): Students raise the wind pressure on the unreinforced wall with Type N mortar, record the cracking pressure, then repeat with Types M and O and with Grout the cells on, and describe what each change does and does not fix.
- Apply (10 min): Students switch to Reinforced CMU, record the cracking and yield pressures, and write a two-sentence explanation of why reinforced masonry is the standard for walls resisting wind and seismic forces. They finish by reproducing the Chapter 8 block count for a 20 ft by 8 ft wall.

**Assessment**

- Students sketch the wall and label the vertical bar, bond beam, joint reinforcement, control joint, and (for veneer) the expansion joint and ties.
- Students explain in three sentences how an unreinforced and a reinforced wall behave differently after the first crack, and why grout alone does not make an unreinforced wall ductile.

## References

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
- [The Masonry Society, Building Code Requirements and Specification for Masonry Structures (TMS 402/602)](https://masonrysociety.org/)
- [Masonry (Wikipedia)](https://en.wikipedia.org/wiki/Masonry)

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
