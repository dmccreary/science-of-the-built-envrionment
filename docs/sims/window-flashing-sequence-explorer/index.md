---
title: Window Flashing Sequence Explorer
description: Students build the five flashing steps around a Riverbend window in order, test their sequencing by dragging the layers into place, and then pour water to see where it goes. A reversed lap sends the water into the opening.
image: /sims/window-flashing-sequence-explorer/window-flashing-sequence-explorer.png
og:image: /sims/window-flashing-sequence-explorer/window-flashing-sequence-explorer.png
twitter:image: /sims/window-flashing-sequence-explorer/window-flashing-sequence-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Evaluate
---

# Window Flashing Sequence Explorer

<iframe src="main.html" width="100%" height="482" scrolling="no"></iframe>

[Run the Window Flashing Sequence Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/window-flashing-sequence-explorer/main.html" width="100%" height="482" scrolling="no"></iframe>
```

## Description

Students build the five flashing steps around a Riverbend window in order, test their sequencing by dragging the layers into place, and then pour water to see where it goes. A reversed lap sends the water into the opening.

## How to Use

1. In Build mode, press Next step and Previous step to add or remove the five layers in the correct order: sill pan, window, jamb tape, head flashing, and a weather-resistive barrier (WRB) lapped over the head flashing. Read the step text under the drawing.
2. Hover over any layer, or over a step chip, to see what it laps over. Click a layer to lift it away from the wall in an exploded view; click it again to put it back.
3. Press Pour water. Water runs down the wall in the elevation and the section. A green dot means water exits to the outside; a red circle with an X marks a leak. Try it with only some of the steps installed.
4. Tick Reverse a lap to tuck the barrier under the head flashing, then pour water and trace where the water goes.
5. Switch to Test the sequence, drag the five shuffled layers into slots 1 to 5, and read the hint if a slot is wrong. Correct layers build the wall as you go.

## Lesson Plan

**Learning objective:** Sequence the flashing steps around a window opening, and evaluate a detail by tracing where water goes when a lap is reversed.

**Suggested activities**

- Warm-up (5 min): Students write down the order they think the five layers go in, then step through Build mode to check it against the chapter's worked example.
- Explore (10 min): Students press Pour water after each step and record which step first keeps water out of the opening at the head, the jambs, and the sill.
- Evaluate (10 min): Students tick Reverse a lap, trace the water path, and explain in two sentences why the barrier must lap over the head flashing, using the shingle principle.

**Assessment**

- Students complete Test the sequence twice without hints and sketch the section from memory, labeling what each layer laps over.
- Students explain why a bead of caulk across the top of a window is not a substitute for a head flashing.

## References

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Flashing (weatherproofing) (Wikipedia)](https://en.wikipedia.org/wiki/Flashing_(weatherproofing))
- ASTM International, ASTM E2112, Standard Practice for Installation of Exterior Windows, Doors and Skylights (verify the current edition).

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** window-flashing-sequence-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will sequence (Bloom Level 3, Apply) the flashing steps around a window opening and will evaluate (Bloom Level 5, Evaluate) a flashing detail by tracing where water goes when a lap is reversed.

Visual: An elevation and section of a window opening in the Riverbend wall showing the rough opening, sill pan, jamb tapes, head flashing, weather-resistive barrier, and siding. Each layer is drawn in a different color and lifts away in an exploded view when selected. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A "Next step" and "Previous step" button that add or remove layers in the correct order. A "Test the sequence" mode in which the learner drags the five layers into order. A "Reverse a lap" toggle that places one layer in the wrong position. A "Pour water" button that sends animated water down the wall.

Interactions: Hovering over a layer shows its name and what it laps over. After "Pour water," droplets follow the surfaces and exit to the exterior in the correct sequence. With the reversed lap, droplets enter the opening and a red highlight and message identify the error and the resulting damage.

Default state: Correct sequence, all steps shown, water not running.

Implementation: p5.js with built-in buttons, drag-and-drop hit testing, a path-following water animation, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
