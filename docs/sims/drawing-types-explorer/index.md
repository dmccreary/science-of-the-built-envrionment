---
title: Drawing Types Explorer
description: Students compare plan, elevation, section, and detail views of the same small building. Each button shows a cutting plane or viewing arrow on an isometric house and the 2D drawing it produces, and a quiz mode asks which view answers a given question.
image: /sims/drawing-types-explorer/drawing-types-explorer.png
og:image: /sims/drawing-types-explorer/drawing-types-explorer.png
twitter:image: /sims/drawing-types-explorer/drawing-types-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze
---

# Drawing Types Explorer

<iframe src="main.html" width="100%" height="542" scrolling="no"></iframe>

[Run the Drawing Types Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/drawing-types-explorer/main.html" width="100%" height="542" scrolling="no"></iframe>
```

## Description

Students compare plan, elevation, section, and detail views of the same small building. Each button shows a cutting plane or viewing arrow on an isometric house and the 2D drawing it produces, and a quiz mode asks which view answers a given question.

## How to Use

1. Press Plan, Elevation, Section, or Detail. A cutting plane or viewing arrow appears on the house, then the matching 2D drawing fades in.
2. Hover over any element of the 2D drawing to see its name and tag, such as window W3 or entry door D1.
3. Read the strip below the drawing to see what the view is and which question it answers.
4. Press Quiz mode, read the question, and press the view button that answers it. A wrong view explains what that view shows, and the correct view is revealed with the answering part outlined in orange. Press Next question to continue.

## Lesson Plan

**Learning objective:** Differentiate plan, elevation, section, and detail views of the same building and identify which view answers a given question.

**Suggested activities**

- Warm-up (5 min): Students predict which view would show the thickness of the wall insulation, then test the prediction by comparing all four views.
- Explore (10 min): Students hover over window W3 in the plan and the elevation and record what each view tells them about the same window.
- Analyze (10 min): Students complete the quiz, then write one new question for each view and exchange them with a partner.

**Assessment**

- Students match five questions about a building to the correct view and justify each choice in one sentence.
- Students explain why a single view of a building is not enough to build it.

## References

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
- [Architectural drawing (Wikipedia)](https://en.wikipedia.org/wiki/Architectural_drawing)
- [Orthographic projection (Wikipedia)](https://en.wikipedia.org/wiki/Orthographic_projection)

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
