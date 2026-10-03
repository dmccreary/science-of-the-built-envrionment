---
title: Water-Cement Ratio Explorer
description: Students will predict (Bloom Level 3, Apply) how changing the water-cement ratio changes the strength, permeability, and shrinkage of concrete, and will evaluate (Bloom Level 5, Evaluate) whether adding water at the chute is acceptable for a given specification.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Water-Cement Ratio Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
