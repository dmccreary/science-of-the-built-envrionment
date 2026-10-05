---
title: "Foundation Type Selector"
description: "Students set a ground profile, column load, groundwater, and frost depth, then judge which of five foundation types is suitable, marginal, or unsuitable and read the rule that governs the choice."
image: /sims/foundation-type-selector/foundation-type-selector.png
og:image: /sims/foundation-type-selector/foundation-type-selector.png
twitter:image: /sims/foundation-type-selector/foundation-type-selector.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Evaluate
---

# Foundation Type Selector

<iframe src="main.html" width="100%" height="587" scrolling="no"></iframe>

[Run the Foundation Type Selector MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/foundation-type-selector/main.html" width="100%" height="587" scrolling="no"></iframe>
```

## Description

Students set a ground profile, column load, groundwater, and frost depth, then judge which of five foundation types is suitable, marginal, or unsuitable and read the rule that governs the choice.

## How to Use

1. Press Riverbend defaults to start from firm sand, a 40 kip column, and a 42 in frost depth. Spread and continuous footings are rated suitable.
2. Change the top soil layer, its thickness, the column load, the frost depth, or High groundwater. Each icon shows green (suitable), yellow (marginal), or red (unsuitable), and also spells the rating in words.
3. Read the rule line under the icons. It names the condition that governs, for example a soft layer deeper than 10 ft. Press Soft peat site to see the Chapter 10 case of 15 ft of peat over firm sand.
4. Hover over an icon for its definition and the main reason for its rating, and click an icon for its typical use and one cost or constructability concern.

## Lesson Plan

**Learning objective:** Evaluate which foundation type best fits a combination of soil, load, water, and frost conditions, and justify the choice with the rule that applies.

**Suggested activities**

- Warm-up (5 min): Students predict the ratings for Riverbend defaults and for the soft peat site, then check them.
- Explore (10 min): Students lengthen a soft clay layer from 0 to 25 ft and record the thickness at which each foundation type changes color.
- Evaluate (10 min): Students pick three site combinations, choose a foundation, and write one sentence citing the rule that justifies it.

**Assessment**

- Students recommend a foundation for a site with 12 ft of soft clay and a 200 kip column, and justify it with the governing rule.
- Students explain in two sentences why high groundwater can downgrade both footings and drilled piers.

## References

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
- [Shallow foundation (Wikipedia)](https://en.wikipedia.org/wiki/Shallow_foundation)
- [Deep foundation (Wikipedia)](https://en.wikipedia.org/wiki/Deep_foundation)

## Specification

The full specification below is extracted from
[Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md).

```text
Type: microsim
**sim-id:** foundation-type-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will evaluate (Bloom Level 5, Evaluate) which foundation type best fits a given combination of soil, load, water, and frost conditions, and will justify (Bloom Level 5, Evaluate) the choice with the rule that applies.

Visual: A cross-section of a ground profile with up to three soil layers whose depth and type the user can change, with a building outline above it. Beneath the profile, a row of foundation icons (spread footing, continuous footing, mat, driven pile, drilled pier) light up green when suitable, yellow when marginal, and red when unsuitable. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown for the top soil layer (firm sand, soft clay, peat, gravel) and a slider for its thickness from 0 to 25 ft. A slider for column load from 10 to 400 kips. A checkbox for "high groundwater." A dropdown for frost depth (none, 42 in, 60 in). A "Riverbend defaults" button and a "Soft peat site" button.

Interactions: Hovering over an icon shows the foundation's definition and the main reason it was rated green, yellow, or red. Clicking an icon opens an infobox with a typical use and one cost or constructability concern. A justification line beneath the profile restates the governing rule, such as "soft layer deeper than 10 ft, so load must reach firm soil."

Default state: Riverbend defaults, with spread and continuous footings green.

Implementation: p5.js with built-in select, slider, checkbox, and buttons, a rule-based rating function, and a responsive canvas.
```

## Related Resources

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
