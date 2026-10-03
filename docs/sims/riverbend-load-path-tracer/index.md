---
title: Riverbend Load Path Tracer
description: Students will trace (Bloom Level 4, Analyze) the gravity and lateral load paths of a small wood-framed building from the point of application to the soil, and will evaluate (Bloom Level 5, Evaluate) the effect of removing or weakening one link.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Riverbend Load Path Tracer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
