---
title: Riverbend Load Path Tracer
description: Students trace the snow-and-dead (gravity), wind, and quake load paths of the Riverbend multipurpose room link by link from the roof to the soil, read the force each link carries, and break one link to see which requirement (strength, stiffness, or stability) is lost.
image: /sims/riverbend-load-path-tracer/riverbend-load-path-tracer.png
og:image: /sims/riverbend-load-path-tracer/riverbend-load-path-tracer.png
twitter:image: /sims/riverbend-load-path-tracer/riverbend-load-path-tracer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Evaluate
---

# Riverbend Load Path Tracer

<iframe src="main.html" width="100%" height="592" scrolling="no"></iframe>

[Run the Riverbend Load Path Tracer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/riverbend-load-path-tracer/main.html" width="100%" height="592" scrolling="no"></iframe>
```

## Description

Students trace the snow-and-dead (gravity), wind, and quake load paths of the Riverbend multipurpose room link by link from the roof to the soil, read the force each link carries, and break one link to see which requirement (strength, stiffness, or stability) is lost.

## How to Use

1. Choose a load: Snow and dead (gravity), Wind (lateral), or Quake (lateral). Six blocks show the links of that path, and arrows between them carry the force handed on.
2. Press Step to light one link at a time, or Play to run the whole path. Click any block to read its force, member type, and the connection to the next link.
3. Select a block, then check Break the selected link. The block fails, the link above it moves, the arrows below it go dark, and the panel names the requirement that is lost.
4. Drag Roof weight from 15 psf (light wood roof) to 30 psf (twice as heavy). The quake force and the gravity loads grow, but the wind force stays fixed. Press Quiz me to hide the labels and click the links in order.

## Lesson Plan

**Learning objective:** Trace gravity and lateral load paths from the point of application to the soil, and evaluate the effect of removing one link.

**Suggested activities**

- Warm-up (5 min): Students predict the six links of the gravity path from the roof to the soil, then press Play to check their list against the worked example in Chapter 6.
- Explore (10 min): Students step through the wind and quake paths, record the force at each link, and find where the two lateral paths share the same members.
- Evaluate (10 min): Students break each link in turn, record which requirement is lost, and rank the links by how much of the building each failure would affect.

**Assessment**

- Students use the Quiz me mode and then explain in two sentences why a gravity path alone does not protect a building from wind.
- Students set the roof weight to 30 psf and state which governs at the roof level, wind or quake, and what happens to the soil pressure under the footing.

## References

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
- [Structural load (Wikipedia)](https://en.wikipedia.org/wiki/Structural_load)
- American Society of Civil Engineers, ASCE/SEI 7, Minimum Design Loads and Associated Criteria for Buildings and Other Structures.

## Specification

The full specification below is extracted from
[Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md).

```text
Type: microsim
**sim-id:** riverbend-load-path-tracer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will trace (Bloom Level 4, Analyze) the gravity and lateral load paths of a small wood-framed building from the point of application to the soil, and will evaluate (Bloom Level 5, Evaluate) the effect of removing or weakening one link.

Visual: A side elevation of the Riverbend multipurpose room showing roof deck, joists, glulam girder, posts, walls, hold-downs, footings, and soil. Each link is a labeled block, and arrows between blocks show the force passed on. The canvas follows the container width with a height of 500 px and redraws on resize.

Controls: Radio buttons labeled "Snow and dead (gravity)," "Wind (lateral)," and "Quake (lateral)" select the load. A "Step" button animates the load one link at a time, and a "Play" button runs the whole path. A slider labeled "Roof weight" (light wood roof to heavy concrete roof) changes the quake force while leaving the wind force fixed.

Interactions: Clicking any link opens an infobox with the force it carries (matching the worked example: 800 lb, 16,000 lb, 10,500 lb, 5,250 lb), the member type, and the connection to the next link. A "Break this link" toggle on the infobox removes the link, plays an animation of the resulting failure mode, and shows a one-sentence explanation of which requirement (strength, stiffness, stability) is lost. A "Quiz me" button hides the labels and asks the student to click the links in order.

Colors: Gravity paths are blue, lateral paths are orange, and broken links are red with an X, so failures are readable without color.

Implementation: p5.js with a responsive canvas, DOM controls, and an infobox div.
```

## Related Resources

- [Chapter 6: Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md)
