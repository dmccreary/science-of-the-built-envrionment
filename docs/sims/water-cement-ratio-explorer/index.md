---
title: "Water-Cement Ratio Explorer"
description: "Students change the water-cement ratio of a six-sack mix and watch pores grow in a magnified slice of concrete while bars show relative strength, permeability, and shrinkage against the limit for an exposure. An Add 5 gal at the chute button shows how a few gallons of extra water push a mix over its specified maximum."
image: /sims/water-cement-ratio-explorer/water-cement-ratio-explorer.png
og:image: /sims/water-cement-ratio-explorer/water-cement-ratio-explorer.png
twitter:image: /sims/water-cement-ratio-explorer/water-cement-ratio-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Evaluate
---

# Water-Cement Ratio Explorer

<iframe src="main.html" width="100%" height="637" scrolling="no"></iframe>

[Run the Water-Cement Ratio Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/water-cement-ratio-explorer/main.html" width="100%" height="637" scrolling="no"></iframe>
```

## Description

Students change the water-cement ratio of a six-sack mix and watch pores grow in a magnified slice of concrete while bars show relative strength, permeability, and shrinkage against the limit for an exposure. An Add 5 gal at the chute button shows how a few gallons of extra water push a mix over its specified maximum.

## How to Use

1. Drag the Water-cement ratio slider from 0.30 to 0.65 and watch the white pores in the magnified slice multiply and grow. Hover over a pore to read how it forms, and over the gray and tan areas to name them.
2. Read the three bars (strength, permeability, and shrinkage, all relative to a 0.45 mix) and the readout, which gives the water in gallons and pounds per cubic yard and an illustrative strength range. The dashed line marks the limit for the selected exposure.
3. Choose an Exposure (indoor slab, exterior walk, or parking structure) to change the maximum ratio. When the ratio is above the maximum, the bars turn orange and the message names the property at risk.
4. Set the ratio to 0.45 with Exterior walk selected, press Add 5 gal at the chute, and read the new ratio and the verdict. Press Remove chute water to start over.

## Lesson Plan

**Learning objective:** Predict how changing the water-cement ratio changes the strength, permeability, and shrinkage of concrete, and evaluate whether adding water at the chute is acceptable for a given specification.

**Suggested activities**

- Warm-up (5 min): Students sketch what happens to the pores in the paste when a mix has more water than the cement needs, then check the sketch against the magnified slice.
- Explore (10 min): Students record the three bar values at w/c 0.35, 0.45, and 0.55 and describe which property changes the most and which the least.
- Apply (10 min): Students reproduce the Chapter 8 chute example (0.45 plus 5 gal gives about 0.52) for each exposure, decide whether the added water is acceptable, and write the instruction they would give the crew.

**Assessment**

- Students calculate by hand the water in gallons for a 564 lb cement mix at w/c 0.50 and check it against the readout.
- Students explain in two sentences why a water-reducing admixture is preferable to adding water at the chute.

## References

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
- American Concrete Institute, ACI 318 Building Code Requirements for Structural Concrete (durability requirements and maximum water-cementitious materials ratios by exposure class).
- [Water-cement ratio (Wikipedia)](https://en.wikipedia.org/wiki/Water%E2%80%93cement_ratio)

## Specification

The full specification below is extracted from
[Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md).

```text
Type: microsim
**sim-id:** water-cement-ratio-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will predict (Bloom Level 3, Apply) how changing the water-cement ratio changes the strength, permeability, and shrinkage of concrete, and will evaluate (Bloom Level 5, Evaluate) whether adding water at the chute is acceptable for a given specification.

Visual: A magnified cutaway of a concrete section showing aggregate particles, cement paste, and pores that grow in number and size as the water content increases. Beside it, three bars show relative strength, permeability, and shrinkage. A truck chute icon sits beside a gallon counter. The canvas follows the container width with a height of 460 px.

Controls: A slider labeled "Water-cement ratio" (0.30 to 0.65) with the cement content fixed at 564 lb per cubic yard. A button labeled "Add 5 gal at the chute" adds the extra water and recalculates the ratio. A drop-down labeled "Exposure" (indoor slab, exterior walk, parking structure) sets the specified maximum ratio.

Interactions: Dragging the slider redraws the pores and adjusts the three bars. A readout shows the water in gallons and pounds per cubic yard and the estimated strength range, labeled as illustrative. If the ratio exceeds the maximum for the selected exposure, the bars turn orange and a message states which property is at risk and suggests a water-reducing admixture. Hovering over a pore shows how it forms.

Colors: Aggregate is gray, paste is tan, pores are white with a dark outline, and the specification limit is a dashed line with a text label.

Implementation: p5.js with a responsive canvas, DOM slider, button, and drop-down.
```

## Related Resources

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
