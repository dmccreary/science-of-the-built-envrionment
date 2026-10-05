---
title: "Scales of the Built Environment"
description: "Five nested rounded rectangles show the scales of the built environment from material to region. Students hover for examples, click for definitions and failure consequences, and step through the January classroom example to see one complaint traced across four scales."
image: /sims/built-environment-scales/built-environment-scales.png
og:image: /sims/built-environment-scales/built-environment-scales.png
twitter:image: /sims/built-environment-scales/built-environment-scales.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand
---

# Scales of the Built Environment

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the Scales of the Built Environment MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/built-environment-scales/main.html" width="100%" height="517" scrolling="no"></iframe>
```

## Description

Five nested rounded rectangles show the scales of the built environment from material to region. Students hover for examples, click for definitions and failure consequences, and step through the January classroom example to see one complaint traced across four scales.

## How to Use

1. Hover over any ring to see an example and its typical concern.
2. Click a ring to read a two-sentence definition, what changes if that scale fails, and how a decision at that scale ripples to another scale. Click it again to close.
3. Press Trace the classroom, then Next step, to follow the January classroom example from material to neighborhood. The active ring is outlined in orange.
4. Press Clear to return to the overview.

## Lesson Plan

**Learning objective:** Classify examples of built-environment elements into the five nested scales and explain how a decision at one scale affects another.

**Suggested activities**

- Warm-up (5 min): Students list five things in their classroom and predict the scale of each before hovering the rings.
- Explore (10 min): Students click each ring and write one sentence on what changes if that scale fails.
- Apply (10 min): Students run the January classroom trace, then invent a second complaint, such as a leaking roof, and trace it across the scales.

**Assessment**

- Students sort ten given examples (for example a steel beam, a school, a metropolitan water system) into the five scales.
- Students explain in two sentences how the insulation chosen for a wall can affect the regional electrical grid.

## References

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
- [Built environment (Wikipedia)](https://en.wikipedia.org/wiki/Built_environment)
- [Building (Wikipedia)](https://en.wikipedia.org/wiki/Building)

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: infographic
**sim-id:** built-environment-scales<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) examples of built-environment elements into the five nested scales and explain (Understand) how a decision at one scale affects another.

Visual: Five concentric rounded rectangles labeled Material, Component, Building, Neighborhood, and Region, with Material at the center. Canvas width follows the container width; height is 420 px. The layout redraws on window resize.

Interactions: Hovering over a ring shows a tooltip with one example and its typical concern, matching the table above. Clicking a ring opens an infobox below the canvas with a two-sentence definition and a "what changes if this fails" example. A button labeled "Trace the classroom" highlights the four rings in sequence while the infobox narrates the January classroom example.

Colors: Rings use the book's green palette, light at the outside and dark at the center. Text is dark on light rings and white on dark rings.

Implementation: p5.js with a responsive canvas, mouse hit-testing on each ring, and a simple infobox div.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
