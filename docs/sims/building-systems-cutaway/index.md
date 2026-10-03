---
title: Building Systems Cutaway
description: Students explore a section through a two-story house drawn in six system colors, toggle each system layer, click components to see which other systems depend on them, and run What if? scenarios that show how one change ripples through the building.
image: /sims/building-systems-cutaway/building-systems-cutaway.png
og:image: /sims/building-systems-cutaway/building-systems-cutaway.png
twitter:image: /sims/building-systems-cutaway/building-systems-cutaway.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Analyze
---

# Building Systems Cutaway

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the Building Systems Cutaway MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/building-systems-cutaway/main.html" width="100%" height="517" scrolling="no"></iframe>
```

## Description

Students explore a section through a two-story house drawn in six system colors, toggle each system layer, click components to see which other systems depend on them, and run What if? scenarios that show how one change ripples through the building.

## How to Use

1. Click a system name in the legend to hide or show that system's layer. Each swatch is labeled with text as well as color.
2. Click any component, or hover for its name, to see its system and the other systems that depend on it. Those systems stay bright and the rest fade.
3. Choose a What if? scenario (Remove insulation, Add a large window, or Move the furnace) to see which system changes and which others are affected.
4. Press Reset view to bring back all layers and clear the selection.

## Lesson Plan

**Learning objective:** Identify the six building systems in a house section and analyze which other systems are affected when one system changes.

**Suggested activities**

- Warm-up (5 min): Students hide all layers but one and list the components of that system from memory before revealing it.
- Explore (10 min): Students click five components in different systems and record which systems depend on each one.
- Analyze (10 min): Students run each What if? scenario, predict the affected systems first, then compare with the sim and discuss any they missed.

**Assessment**

- Students name the six systems and give one component of each.
- Students explain in three sentences how removing wall insulation affects at least two other systems.

## References

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
- [Building (Wikipedia)](https://en.wikipedia.org/wiki/Building)
- [Heating, ventilation, and air conditioning (Wikipedia)](https://en.wikipedia.org/wiki/Heating,_ventilation,_and_air_conditioning)

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: infographic
**sim-id:** building-systems-cutaway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the six building systems in a simple building section and analyze (Bloom Level 4, Analyze) which other systems are affected when one system changes.

Visual: A simple two-story house in section, with the structure, enclosure, mechanical, plumbing, electrical, and fire-protection components drawn in six distinct colors. Canvas width follows the container; height 480 px; redraw on window resize.

Interactions: Clicking a system name in a legend toggles that system's layer on and off. Clicking a component opens an infobox naming its system and listing the other systems that depend on it. A "What if?" dropdown offers the scenarios "Remove insulation," "Add a large window," and "Move the furnace," and highlights the systems affected in each case, with a one-sentence explanation in the infobox.

Colors: Each system has its own color from a color-blind safe palette, and legend swatches are labeled with text as well as color.

Implementation: p5.js layered drawing with hit-testing on component shapes.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
