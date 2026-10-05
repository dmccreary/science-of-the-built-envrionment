---
title: Sealant Joint Movement Calculator
description: Students calculate the thermal movement of a panel from its material, length, and temperature range, find the minimum sealant joint width for a sealant rating, and watch a to-scale joint open, close, and tear as the temperature changes.
image: /sims/sealant-joint-movement-calculator/sealant-joint-movement-calculator.png
og:image: /sims/sealant-joint-movement-calculator/sealant-joint-movement-calculator.png
twitter:image: /sims/sealant-joint-movement-calculator/sealant-joint-movement-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply
---

# Sealant Joint Movement Calculator

<iframe src="main.html" width="100%" height="688" scrolling="no"></iframe>

[Run the Sealant Joint Movement Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/sealant-joint-movement-calculator/main.html" width="100%" height="688" scrolling="no"></iframe>
```

## Description

Students calculate the thermal movement of a panel from its material, length, and temperature range, find the minimum sealant joint width for a sealant rating, and watch a to-scale joint open, close, and tear as the temperature changes.

## How to Use

1. Choose a material and a sealant rating, then set the panel length and the lowest and highest temperatures the panel will see. The table on the right lists each calculation step.
2. Set the joint width with the slider. The verdict box says PASS or FAIL by comparing your width with the minimum width in step 4.
3. Drag the Now slider from cold to hot. The panel grows when warm and closes the joint, and the sealant stretches when cold. The sealant is green when comfortably within its rating, yellow near its limit, and red when over it, and the text beside it says the same.
4. Hover over the sealant to read its strain and what fraction of its limit it is using. When the width fails and the strain passes the limit, the sealant tears in the drawing and the message gives the cause.
5. Tick Three-sided adhesion to remove the backer rod and see how a bead stuck to the back of the joint tears even when the width is enough.

## Lesson Plan

**Learning objective:** Calculate the thermal movement and minimum sealant joint width for a given material, length, temperature range, and sealant rating.

**Suggested activities**

- Reproduce (5 min): With the defaults (10 ft aluminum, -20 to 140 degrees F, plus or minus 25 percent), students reproduce the Chapter 12 result of 0.25 in of movement and a 1/2 in minimum joint.
- Compare (10 min): Students change the sealant rating to plus or minus 50 percent and then switch the material to steel and vinyl, and record the minimum width each time.
- Troubleshoot (10 min): Students set a 1/8 in joint, drag Now to the coldest temperature, and write down the cause of the tear and two ways to fix it.

**Assessment**

- Students calculate by hand the minimum joint width for a 16 ft vinyl panel from 0 to 120 degrees F with a plus or minus 35 percent sealant and check it with the table.
- Students explain in two sentences why a backer rod keeps the sealant from tearing.

## References

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Thermal expansion (Wikipedia)](https://en.wikipedia.org/wiki/Thermal_expansion)
- [Sealant (Wikipedia)](https://en.wikipedia.org/wiki/Sealant)

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** sealant-joint-movement-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) thermal movement and the minimum sealant joint width for a given material, length, temperature range, and sealant rating.

Visual: A side-by-side cross-section of a joint between two panels, drawn to scale. The joint, backer rod, and sealant are labeled. The joint opens and closes as a temperature slider moves from cold to hot, with the sealant stretching and compressing and shown in green, yellow, or red as it nears or exceeds its rating. A small table shows the calculation steps. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: A dropdown for material (aluminum, steel, vinyl, wood across grain, concrete). A slider for panel length (2 to 20 ft). Two sliders for the lowest and highest temperatures (-30 to 160°F). A dropdown for sealant rating (plus or minus 12.5, 25, 35, 50 percent). A slider for joint width (1/8 to 1 in). A checkbox "Three-sided adhesion" to show how the sealant tears without a backer rod.

Interactions: Hovering over the sealant shows its strain as a percentage of its rating. The readout lists the movement, the minimum joint width, and whether the chosen width passes. When the width fails, the sealant tears in the animation, and a message explains the cause.

Default state: Aluminum, 10 ft, -20 to 140°F, plus or minus 25 percent, joint width 1/2 in, passing.

Implementation: p5.js with built-in dropdowns, sliders, and a checkbox, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
