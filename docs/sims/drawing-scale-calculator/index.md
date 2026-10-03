---
title: Drawing Scale Calculator
description: Students measure a wall on a floor plan with a draggable line, predict the real length from the stated drawing scale, and check the answer. A print size slider shows why enlarging or reducing a printout breaks the scale and why written dimensions govern.
image: /sims/drawing-scale-calculator/drawing-scale-calculator.png
og:image: /sims/drawing-scale-calculator/drawing-scale-calculator.png
twitter:image: /sims/drawing-scale-calculator/drawing-scale-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Drawing Scale Calculator

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Drawing Scale Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/drawing-scale-calculator/main.html" width="100%" height="552" scrolling="no"></iframe>
```

## Description

Students measure a wall on a floor plan with a draggable line, predict the real length from the stated drawing scale, and check the answer. A print size slider shows why enlarging or reducing a printout breaks the scale and why written dimensions govern.

## How to Use

1. Choose the scale printed in the title block from the menu. The default is 1/4" = 1'-0".
2. Drag the two orange handles to measure a wall. The drawn length appears in inches, rounded to the nearest 1/16 inch.
3. Type the real length in feet (for example 26 or 26'-6") and press Check my answer. The readout then shows the real length in feet-inches and in millimeters and updates live as you drag. Press Hide readout to try again.
4. Move the Print size slider away from 100% to see the warning. The south wall no longer agrees with its written dimension, so the stated scale cannot be trusted.

## Lesson Plan

**Learning objective:** Calculate the real length of a wall from a drawn length and a stated scale, and explain why a changed print size breaks the scale.

**Suggested activities**

- Warm-up (5 min): Students predict the real length of the south wall at 1/4" = 1'-0" (6 1/2 in), then check the answer.
- Explore (10 min): Students keep the same drawn line and change the scale to 1/8", 1/2", and 3", recording the real length each time and describing the pattern.
- Apply (10 min): Students set the print size to 150% and 75%, calculate the real length of the south wall from the stated scale, and compare it with the written dimension.

**Assessment**

- Students calculate the real length of a 3 3/4 in line on a 1/8" = 1'-0" plan and show the division.
- Students explain in two sentences why a plan printed with fit to page should be read by its written dimensions.

## References

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
- [Architectural drawing (Wikipedia)](https://en.wikipedia.org/wiki/Architectural_drawing)
- [Scale (ratio) (Wikipedia)](https://en.wikipedia.org/wiki/Scale_(ratio))

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: microsim
**sim-id:** drawing-scale-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the real length of a wall from a drawn length and a stated scale, and explain (Bloom Level 2, Understand) why a changed print size breaks the scale.

Visual: A simple floor plan drawn on a canvas that is 600 px wide by 400 px high and resizes with the window. A draggable measuring line with end handles is placed on a wall. A readout shows the drawn length in inches, the selected scale, and the computed real length in feet-inches and in millimeters.

Controls: A dropdown to select 1/8" = 1'-0", 1/4" = 1'-0", 1/2" = 1'-0", or 3" = 1'-0". A slider labeled "Print size" from 50% to 150% that rescales the drawing, with a warning message appearing when the slider is not at 100% that says the printed scale no longer applies. A "Check my answer" button lets the student type a length before the readout is revealed.

Behavior: Dragging the handles updates the readout live. Changing the scale recomputes the real length. Default state: scale 1/4" = 1'-0", print size 100%.

Implementation: p5.js with a responsive canvas and DOM controls.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
