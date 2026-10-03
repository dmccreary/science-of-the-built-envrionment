---
title: Frost Heave Three-Condition Explorer
description: Students will explain (Bloom Level 2, Understand) why frost heave requires frost-susceptible soil, water, and freezing temperatures together, and will predict (Bloom Level 2, Understand) which mitigation stops it.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Frost Heave Three-Condition Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md).

```text
Type: microsim
**sim-id:** frost-heave-three-conditions<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) why frost heave requires frost-susceptible soil, water, and freezing temperatures together, and will predict (Bloom Level 2, Understand) which mitigation stops it.

Visual: A cross-section of a footing and a slab edge in soil, with a frost line drawn at 42 inches. Ice lenses grow as horizontal blue layers beneath the freezing front, and the slab and an unprotected shallow footing rise by an amount shown by a movement gauge. The canvas is responsive, 440 px tall, and redraws on window resize.

Controls: Three toggles for the three conditions (soil type: gravel or silt; water: dry or wet; temperature: above freezing or below). A slider for the number of freezing days from 0 to 90. A footing depth dropdown (18 in, 42 in). A "Run winter" button animates the freeze.

Interactions: Hovering over an ice lens shows how the water was drawn up. When any condition is turned off, a message states which condition was removed and why heave stops. The gauge reports heave in inches.

Default state: Silt, wet, below freezing, 18 in footing, with visible heave when "Run winter" is pressed.

Implementation: p5.js with built-in toggles, slider, select, and a responsive canvas.
```

## Related Resources

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
