---
title: Stress, Force, and Area Explorer
description: Students choose a steel rod, a wood post, or a footing on soil, set the load and the size, and watch the stress (force divided by area), the factor of safety, and a gauge that compares the stress with an illustrative limit. A Snowshoe button shows the same load producing less stress as the area grows.
image: /sims/stress-area-load-explorer/stress-area-load-explorer.png
og:image: /sims/stress-area-load-explorer/stress-area-load-explorer.png
twitter:image: /sims/stress-area-load-explorer/stress-area-load-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Evaluate
---

# Stress, Force, and Area Explorer

<iframe src="main.html" width="100%" height="562" scrolling="no"></iframe>

[Run the Stress, Force, and Area Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/stress-area-load-explorer/main.html" width="100%" height="562" scrolling="no"></iframe>
```

## Description

Students choose a steel rod, a wood post, or a footing on soil, set the load and the size, and watch the stress (force divided by area), the factor of safety, and a gauge that compares the stress with an illustrative limit. A Snowshoe button shows the same load producing less stress as the area grows.

## How to Use

1. Pick a member from the Member menu. The load, size, and limit reset to the Chapter 3 worked example: an 8,000 lb load on a 3/4 in steel rod, a 6,000 lb load on a 3.5 in wood post, or 6,000 lb on a 2 ft footing.
2. Drag the Load and size sliders. The readout shows the area, the stress in psi and psf, and the factor of safety, and the gauge moves against the limit marker.
3. When the gauge turns orange or red, read the message below it. It states how much load to remove, or how much area to add, to restore a factor of safety of 1.5.
4. Press Snowshoe to hold the load fixed while the area shrinks and then grows, and watch the stress change in the opposite direction.

## Lesson Plan

**Learning objective:** Apply stress = force / area to compute the stress in a member, and evaluate whether the stress is below an illustrative limit and what factor of safety it implies.

**Suggested activities**

- Warm-up (5 min): Students compute the stress in the 3/4 in rod carrying 8,000 lb by hand (about 18,100 psi), then check it against the readout.
- Explore (10 min): With the footing member, students find the smallest side that keeps the soil pressure under 1,500 psf at 6,000 lb, then at 12,000 lb.
- Evaluate (10 min): Students find the load at which each member reaches a factor of safety of 1.5 and explain which change, less load or more area, is cheaper in each case.

**Assessment**

- Students explain in two sentences why the same 6,000 lb produces 490 psi in the post but only about 10 psi on the soil under the footing.
- Students state whether a 1 in diameter rod carrying 20,000 lb is above or below the illustrative 36,000 psi limit and what factor of safety results.

## References

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Stress (mechanics) (Wikipedia)](https://en.wikipedia.org/wiki/Stress_(mechanics))
- [Factor of safety (Wikipedia)](https://en.wikipedia.org/wiki/Factor_of_safety)

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
