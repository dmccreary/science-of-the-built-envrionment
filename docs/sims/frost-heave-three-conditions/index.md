---
title: Frost Heave Three-Condition Explorer
description: Students run a Minnesota winter on a cross-section of ground with a wall footing and a slab edge, and watch ice lenses grow only when frost-susceptible soil, water, and freezing temperatures are all present. Turning any one condition off stops the heave, and a footing depth choice shows what a 42 in. footing does and does not protect.
image: /sims/frost-heave-three-conditions/frost-heave-three-conditions.png
og:image: /sims/frost-heave-three-conditions/frost-heave-three-conditions.png
twitter:image: /sims/frost-heave-three-conditions/frost-heave-three-conditions.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand
---

# Frost Heave Three-Condition Explorer

<iframe src="main.html" width="100%" height="632" scrolling="no"></iframe>

[Run the Frost Heave Three-Condition Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/frost-heave-three-conditions/main.html" width="100%" height="632" scrolling="no"></iframe>
```

## Description

Students run a Minnesota winter on a cross-section of ground with a wall footing and a slab edge, and watch ice lenses grow only when frost-susceptible soil, water, and freezing temperatures are all present. Turning any one condition off stops the heave, and a footing depth choice shows what a 42 in. footing does and does not protect.

## How to Use

1. Leave the defaults (silt, wet, below freezing, 18 in. footing) and press Run winter. Watch the freezing front move down, the blue ice lenses thicken, and the slab and footing rise on the gauge. Press Pause, or drag the Freezing days slider, to stop the winter at any day.
2. Hover over an ice lens to read how the water was drawn up to it.
3. Change one condition at a time: Soil to Gravel, Water to Dry, or Temperature to Above freezing. Run the winter again and read the message that names the removed condition and says why heave stops.
4. Change the Footing depth from 18 in to 42 in and run the winter with all three conditions present. Compare the footing and slab readings on the gauge.

## Lesson Plan

**Learning objective:** Explain why frost heave requires frost-susceptible soil, water, and freezing temperatures together, and predict which change stops it.

**Suggested activities**

- Warm-up (5 min): Students write down what they think causes frost heave, then run the default winter and compare their answer with the ice lenses on the screen.
- Explore (10 min): Students switch off each of the three conditions in turn, record the heave on the gauge, and write one sentence for each explaining why heave stops.
- Apply (10 min): Students decide which of three fixes (deeper footing, gravel fill, drainage) they would choose for a slab at the Riverbend entry, and use the simulator to defend the choice.

**Assessment**

- Students name the three conditions for frost heave and say which one a drain tile removes.
- Students explain in two sentences why a footing at 42 in. does not rise even though the slab beside it still can.

## References

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
- Minnesota Department of Transportation, Geotechnical Manual (frost action in soils and frost depth).
- [Frost heaving (Wikipedia)](https://en.wikipedia.org/wiki/Frost_heaving)

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
