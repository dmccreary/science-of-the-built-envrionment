---
title: Foundation Type Selector
description: Students will evaluate (Bloom Level 5, Evaluate) which foundation type best fits a given combination of soil, load, water, and frost conditions, and will justify (Bloom Level 5, Evaluate) the choice with the rule that applies.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Foundation Type Selector



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
