---
title: "Foundation Cross-Section Explorer"
description: "A to-scale cross-section of a Riverbend exterior wall with numbered parts that students hover over and click to learn each part's job, a typical size, and where Chapter 10 explains it. A menu switches between slab-on-grade, crawl space, and basement."
image: /sims/foundation-cross-section-explorer/foundation-cross-section-explorer.png
og:image: /sims/foundation-cross-section-explorer/foundation-cross-section-explorer.png
twitter:image: /sims/foundation-cross-section-explorer/foundation-cross-section-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Understand
---

# Foundation Cross-Section Explorer

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Foundation Cross-Section Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/foundation-cross-section-explorer/main.html" width="100%" height="552" scrolling="no"></iframe>
```

## Description

A to-scale cross-section of a Riverbend exterior wall with numbered parts that students hover over and click to learn each part's job, a typical size, and where Chapter 10 explains it. A menu switches between slab-on-grade, crawl space, and basement.

## How to Use

1. Hover over a part, a numbered tag, or a row in the parts list to highlight it and see its name. Click one to open an infobox with its function, a typical dimension, and the chapter section.
2. Use the Foundation type menu to switch between slab-on-grade, crawl space, and basement. Parts that are new compared with the previous section get an orange outline and an orange number.
3. Check Show frost line to see the 42 in frost depth and notice that every footing bears below it. Check Show loads to see the wall load flowing down into the footing and the soil pushing back.
4. Typical dimensions are examples from the chapter and are not required values; the building code and the engineer set the real ones.

## Lesson Plan

**Learning objective:** Identify the parts of a typical cold-climate foundation and explain the job of each part.

**Suggested activities**

- Warm-up (5 min): Students try to name the eleven parts of the slab-on-grade section from memory, then check each against the infobox.
- Explore (10 min): Students switch among the three sections and list which parts are new in each, then explain why a basement footing is deeper than the frost line.
- Trace (10 min): With Show loads on, students trace the path of a roof load from the wall to the soil and name each part it passes through.

**Assessment**

- Students label a blank copy of the basement section with the numbers and names of all parts.
- Students explain in two sentences what the perimeter drain and the sloped grade each do for the foundation.

## References

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
- [Foundation (engineering) (Wikipedia)](https://en.wikipedia.org/wiki/Foundation_(engineering))
- [Frost line (Wikipedia)](https://en.wikipedia.org/wiki/Frost_line)

## Specification

The full specification below is extracted from
[Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md).

```text
Type: infographic
**sim-id:** foundation-cross-section-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the parts of a typical cold-climate foundation and explain (Bloom Level 2, Understand) the job of each part.

Visual: A cross-section of a Riverbend exterior wall with the following parts drawn to scale and labeled by number: continuous footing, footing reinforcement, foundation wall, anchor bolt and sill plate, slab-on-grade, gravel base, vapor retarder, perimeter drain pipe in gravel, backfill, finished grade sloped away, frost depth line at 42 in. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown to switch the cross-section between slab-on-grade, crawl space, and basement. A checkbox "Show frost line." A "Show loads" toggle that draws arrows for the load path from the wall to the soil.

Interactions: Hovering over a part highlights it and shows its name. Clicking a part opens an infobox with its function, a typical dimension (marked "typical" and not required), and the section of this chapter where it is explained. Changing the dropdown rebuilds the cross-section and highlights the parts that are new.

Default state: Slab-on-grade, frost line shown, no loads.

Implementation: p5.js with a built-in select and checkboxes, region hit-testing for clicks, and a responsive canvas.
```

## Related Resources

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
