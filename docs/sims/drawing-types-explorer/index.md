---
title: Drawing Types Explorer
description: Students will differentiate (Bloom Level 4, Analyze) plan, elevation, section, and detail views of the same small building and identify which view answers a given question.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Drawing Types Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: infographic
**sim-id:** drawing-types-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will differentiate (Bloom Level 4, Analyze) plan, elevation, section, and detail views of the same small building and identify which view answers a given question.

Visual: A simple isometric picture of a small one-story building in the center of the canvas (width follows the container, height 460 px). Four buttons labeled Plan, Elevation, Section, and Detail appear below it.

Interactions: Clicking a button animates a cutting plane or viewing arrow on the building and then shows the resulting 2D drawing beside it. Hovering over any element of the 2D drawing shows a tooltip naming the building element and its tag. A quiz mode shows a question such as "Where do you find the thickness of the wall insulation?" and asks the student to click the correct view, with immediate feedback.

Implementation: p5.js with pre-drawn 2D views and a responsive layout.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
