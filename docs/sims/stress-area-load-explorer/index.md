---
title: Stress, Force, and Area Explorer
description: Students will apply (Bloom Level 3, Apply) the relationship stress = force divided by area to compute the stress in a member, and will evaluate (Bloom Level 5, Evaluate) whether the result is below an illustrative limit and what factor of safety it implies.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Stress, Force, and Area Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** stress-area-load-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) the relationship stress = force divided by area to compute the stress in a member, and will evaluate (Bloom Level 5, Evaluate) whether the result is below an illustrative limit and what factor of safety it implies.

Visual: A drawing of a member (a round steel rod, a 3.5 in square wood post, or a square footing on soil) with a downward load arrow and a cross-section view that shades the loaded area. A horizontal gauge shows stress against a limit marker, with the green zone below the limit and the red zone above it. The canvas width follows the container, the height is 440 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Member" with three choices. A slider labeled "Load (lb)" from 0 to 20,000 with a default of 6,000. A slider labeled "Size" (rod diameter in inches, or footing side in feet) with a default that matches the worked example. A dropdown labeled "Limit" whose illustrative values are 36,000 psi (structural steel yield) and 1,500 psf (soil bearing).

Interactions: The readout shows the area, the stress in psi and psf, and the factor of safety. When the stress passes the limit, the gauge turns red and a text message states which change (less load or more area) restores the margin. A "Snowshoe" button shrinks and enlarges the loaded area while the load stays fixed to show the stress changing.

Colors: Green for stresses under the limit, orange for factors of safety below 1.5, and red above the limit. Each state also carries a text label.

Implementation: p5.js with a responsive canvas, built-in slider and select controls, and unit-conversion helpers.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
