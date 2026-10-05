---
title: "Critical Path Explorer"
description: "Students work with the eight Riverbend structure activities as a left-to-right network. They change durations with sliders, watch the earliest start, earliest finish, float, and critical path recalculate, and slip the truss delivery by 10 days to see the critical path change."
image: /sims/critical-path-explorer/critical-path-explorer.png
og:image: /sims/critical-path-explorer/critical-path-explorer.png
twitter:image: /sims/critical-path-explorer/critical-path-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Critical Path Explorer

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Critical Path Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/critical-path-explorer/main.html" width="100%" height="552" scrolling="no"></iframe>
```

## Description

Students work with the eight Riverbend structure activities as a left-to-right network. They change durations with sliders, watch the earliest start, earliest finish, float, and critical path recalculate, and slip the truss delivery by 10 days to see the critical path change.

## How to Use

1. Read each box: the activity, its duration, its earliest start (ES) and earliest finish (EF) in working days, and its float. Boxes with a heavy orange border and the word CRITICAL have zero float.
2. Hover over a box, or over its slider, to read its float and why it is or is not critical.
3. Drag a slider to change one duration (1 to 30 days). Before you look, predict the new project duration, then check the readout at the top.
4. Press Slip the truss delivery to add 10 days to activity F and watch the critical path change. Press Reset to restore the worked example (27 days).

## Lesson Plan

**Learning objective:** Calculate the earliest start, earliest finish, and float of each activity in a small network, and predict how changing a duration affects the project completion date.

**Suggested activities**

- Warm-up (5 min): Students compute ES and EF for activities A to E by hand from the durations, then compare with the sim.
- Explore (10 min): Students lengthen each critical activity by 2 days and each non-critical activity by 2 days, and record which changes move the finish date.
- Apply (10 min): Students find the largest truss delay that does not change the 27-day finish, then press Slip the truss delivery and explain why the critical path moves to F and H.

**Assessment**

- Students predict, before using the sim, the project duration if activity D takes 7 days instead of 4, and justify the answer.
- Students explain in two sentences why a planner watches long-lead items such as roof trusses even when they have float.

## References

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
- [Critical path method (Wikipedia)](https://en.wikipedia.org/wiki/Critical_path_method)
- [Float (project management) (Wikipedia)](https://en.wikipedia.org/wiki/Float_(project_management))

## Specification

The full specification below is extracted from
[Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md).

```text
Type: microsim
**sim-id:** critical-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the earliest start, earliest finish, and float of each activity in a small network and will predict (Bloom Level 2, Understand) how changing a duration affects the project completion date.

Visual: A left-to-right activity network of the eight Riverbend activities, drawn as boxes connected by arrows. Each box shows the activity letter, the duration, and the earliest start and finish. Boxes on the critical path are drawn with a heavy orange border and the arrows between them are orange. The canvas width follows the container, the height is 420 px, and the layout redraws on window resize.

Controls: A slider beneath each box adjusts its duration from 1 to 20 days. The network recomputes immediately, and the critical path highlights update. A button labeled "Slip the truss delivery" adds 10 days to activity F and shows that the critical path changes. A "Reset" button restores the defaults.

Interactions: Hovering over a box shows its float and a sentence explaining why it is or is not critical. A readout at the top shows the total project duration in days.

Default state: Durations as in the worked example, total of 27 days, with F showing 9 days of float.

Implementation: p5.js with a forward-pass calculation and a responsive canvas.
```

## Related Resources

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
