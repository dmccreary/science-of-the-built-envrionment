---
title: Glulam Char Section Explorer
description: Students expose a glued-laminated beam cross-section to fire, watch a char layer grow inward at a chosen rate, and calculate the remaining width, depth, and section modulus, then compare with a small member to see why large timbers resist fire better.
image: /sims/glulam-char-section-explorer/glulam-char-section-explorer.png
og:image: /sims/glulam-char-section-explorer/glulam-char-section-explorer.png
twitter:image: /sims/glulam-char-section-explorer/glulam-char-section-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Glulam Char Section Explorer

<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run the Glulam Char Section Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/glulam-char-section-explorer/main.html" width="100%" height="542" scrolling="no"></iframe>
```

## Description

Students expose a glued-laminated beam cross-section to fire, watch a char layer grow inward at a chosen rate, and calculate the remaining width, depth, and section modulus, then compare with a small member to see why large timbers resist fire better.

## How to Use

1. Start with the Riverbend beam (8.75 in by 24 in), 60 minutes of fire, and a charring rate of 1.5 in per hour. The dashed gray outline is the original section, the dark layer is char, and the tan rectangle is the wood that still carries load.
2. Read the readout: char depth is the rate times the hours, the remaining width loses the char on both sides, and the remaining depth loses it on the bottom. For the Riverbend beam this gives 5.75 in by 22.5 in, a section modulus of about 485 in³, and about 58 percent of the original capacity.
3. Move the sliders for exposure time, width, depth, and charring rate. Switch the exposed faces from three sides (beam, top protected by the floor deck) to four sides (column). Hover over the dark layer to read its thickness.
4. Press Compare with a 3.125 in by 12 in member to draw a small member at the same scale. Increase the exposure time and watch how quickly it is consumed, and note the warning that appears when the remaining width falls below 2 in.

## Lesson Plan

**Learning objective:** Calculate the remaining section and section modulus of a timber beam after a given fire exposure, and explain why larger timber members resist fire better than small ones.

**Suggested activities**

- Verify (5 min): Students reproduce the Chapter 18 example by hand (S = 840 in³ before, about 485 in³ after one hour) and compare with the readout.
- Explore (10 min): Students find how many minutes of exposure a 8.75 in by 24 in beam survives before the remaining width drops below 2 in, at charring rates of 1.0, 1.5, and 2.0 in per hour.
- Explain (10 min): Students turn on the comparison with the small member and write a short explanation of why the same char depth removes a much larger share of the small member's capacity.

**Assessment**

- Students calculate the remaining section modulus of a 6.75 in by 18 in beam after 45 minutes at 1.5 in per hour on three sides, showing each step.
- Students explain in two sentences why a deeper and wider beam keeps a larger fraction of its capacity than a small beam after the same fire.

## References

- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
- [Glued laminated timber (Wikipedia)](https://en.wikipedia.org/wiki/Glued_laminated_timber)
- American Wood Council, National Design Specification for Wood Construction, Chapter 16 (fire design of wood members); the code and a structural engineer specify the actual char rates and procedure.

## Specification

The full specification below is extracted from
[Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md).

```text
Type: microsim
**sim-id:** glulam-char-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the remaining section and section modulus of a timber beam after a given fire exposure and will explain (Bloom Level 2, Understand) why larger timber members resist fire better than small ones.

Visual: A cross-section of a rectangular beam drawn to scale. The original outline is dashed. A dark char layer grows inward on the exposed faces as the exposure time increases, and the remaining section is drawn in tan. A readout at the right shows the remaining width, remaining depth, the section modulus in cubic inches, and the percentage of the original capacity. The canvas fills the container width, has a height of 460 px, and redraws on window resize.

Controls: A slider labeled "Fire exposure (minutes)" from 0 to 120 with a default of 60. Sliders for beam width (3.125 to 12.25 in) and depth (9 to 36 in), with defaults of 8.75 and 24. A radio selector for the exposed faces: "Three sides (beam)" or "Four sides (column)". A slider for the nominal charring rate (1.0 to 2.0 in per hour) with a default of 1.5 in. A button labeled "Compare with a 3.125 in by 12 in member" overlays a small member to show how quickly it is consumed.

Interactions: Hovering over the char layer shows a tooltip with its thickness. A warning appears when the remaining width falls below 2 in, with the sentence "The section may no longer carry load." The readout updates on every change.

Colors: Char in dark charcoal, remaining section in tan, original outline in gray. The text readout repeats the state so that color is not the only signal.

Implementation: p5.js with a responsive canvas, DOM sliders and radio buttons, and the section modulus formula \( S = bd^2/6 \) recalculated on every change.
```

## Related Resources

- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
