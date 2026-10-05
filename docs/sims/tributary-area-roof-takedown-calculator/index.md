---
title: "Tributary Area and Load Takedown Calculator"
description: "Students set the roof load, joist spacing, girder spacing, and girder span, and watch the shaded tributary area, line load, reaction, and maximum moment of a joist, girder, or post update in the Riverbend roof plan. An equilibrium check confirms that the post reactions equal the load on the bay."
image: /sims/tributary-area-roof-takedown-calculator/tributary-area-roof-takedown-calculator.png
og:image: /sims/tributary-area-roof-takedown-calculator/tributary-area-roof-takedown-calculator.png
twitter:image: /sims/tributary-area-roof-takedown-calculator/tributary-area-roof-takedown-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Tributary Area and Load Takedown Calculator

<iframe src="main.html" width="100%" height="572" scrolling="no"></iframe>

[Run the Tributary Area and Load Takedown Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/tributary-area-roof-takedown-calculator/main.html" width="100%" height="572" scrolling="no"></iframe>
```

## Description

Students set the roof load, joist spacing, girder spacing, and girder span, and watch the shaded tributary area, line load, reaction, and maximum moment of a joist, girder, or post update in the Riverbend roof plan. An equilibrium check confirms that the post reactions equal the load on the bay.

## How to Use

1. Pick Joist, Girder, or Post from the Selected member menu. The member turns orange in the roof plan and its tributary area is shaded light blue.
2. Drag the four sliders. The tributary area, the line load w = q × b, the reaction R = wL/2, and the maximum moment M = wL²/8 update immediately, and the beam diagram below the plan redraws.
3. Hover over the shaded area to read how the area was found. The default Riverbend values (50 psf, 24 in., 16 ft, 40 ft) give 16,000 lb at each post.
4. Press Check equilibrium to compare the load on the bay with the joist reactions and the post reactions. A green check means they agree.

## Lesson Plan

**Learning objective:** Calculate the line load, reaction, and maximum moment of a joist, girder, and post from a surface load and member spacing, and predict how changing spacing or span changes each member's load.

**Suggested activities**

- Warm-up (5 min): Students compute w, R, and M for the Riverbend girder by hand (800 plf, 16,000 lb, 160,000 ft-lb) and check the sim.
- Explore (10 min): Students change one slider at a time and record whether the joist, girder, and post loads rise, fall, or stay the same, then explain each result using tributary area.
- Apply (10 min): Students find the girder span at which the post load reaches 24,000 lb with the other sliders at their Riverbend values, and verify it with Check equilibrium.

**Assessment**

- Students predict, before moving the slider, what happens to the girder moment when the span doubles, and explain why it grows faster than the load.
- Students explain in two sentences why moving the girders closer together reduces the load on each post but does not change the roof load.

## References

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
- [Structural load (Wikipedia)](https://en.wikipedia.org/wiki/Structural_load)
- [Beam (structure) (Wikipedia)](https://en.wikipedia.org/wiki/Beam_(structure))

## Specification

The full specification below is extracted from
[Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md).

```text
Type: microsim
**sim-id:** tributary-area-roof-takedown-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the line load, reaction, and maximum moment of a joist, girder, and post from a surface load and member spacing, and will predict (Bloom Level 2, Understand) how changing the spacing or span changes the load each member carries.

Visual: A plan view of the Riverbend multipurpose room roof showing the girders as heavy horizontal lines, joists as thin vertical lines, and posts as squares. One selected member is highlighted, and its tributary area is shaded. Below the plan, a beam diagram shows the selected member with arrows for its line load and reaction values. The canvas follows the container width with a height of 520 px and redraws on resize.

Controls: Sliders for "Roof load (psf)" (20 to 100), "Joist spacing (in.)" (12, 16, 19.2, 24), "Girder spacing (ft)" (8 to 24), and "Girder span (ft)" (20 to 60). A drop-down labeled "Selected member" chooses a joist, girder, or post. A "Check equilibrium" button sums all reactions and compares them with the total load on the bay.

Interactions: Dragging any slider updates the shaded tributary area, \( w \), \( R \), and \( M_{max} \) immediately. Hovering over the shaded area explains in one sentence how the area was found. Clicking "Check equilibrium" displays a green check if the reactions equal the load and a red message otherwise. The default state reproduces the Riverbend values of 50 psf, 24 in., 16 ft, and 40 ft, giving 16,000 lb at each post.

Colors: Tributary areas are light blue, the selected member is orange, and reactions are green arrows. Values are always shown as text.

Implementation: p5.js with DOM sliders, a drop-down, and a responsive canvas.
```

## Related Resources

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
