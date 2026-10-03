---
title: Embodied Carbon Beam Comparison
description: Students will calculate (Bloom Level 3, Apply) the product-stage embodied carbon of alternative structural members from quantity and emission factor and will evaluate (Bloom Level 5, Evaluate) how uncertainty in the emission factor changes the ranking.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Embodied Carbon Beam Comparison



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md).

```text
Type: microsim
**sim-id:** embodied-carbon-beam-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the product-stage embodied carbon of alternative structural members from quantity and emission factor and will evaluate (Bloom Level 5, Evaluate) how uncertainty in the emission factor changes the ranking.

Visual: A grouped bar chart comparing steel beams, glued-laminated beams, and reinforced concrete beams for the same span, with bars showing mass in kilograms and embodied carbon in kg CO2e. A table beneath shows the arithmetic: quantity times factor equals emissions. The chart is responsive with a height of 420 px and redraws on window resize.

Controls: A slider for the number of beams (2 to 12, default 6). A slider for span (20 to 60 ft, default 40). Sliders for each material's emission factor with a low-to-high range, defaulting to 1.2 kg CO2e per kg for steel, 140 kg CO2e per m3 for glulam, and 300 kg CO2e per m3 for concrete, all labeled illustrative. A checkbox labeled "Count stored biogenic carbon in wood" subtracts about 9,000 kg CO2 of stored carbon for the default glulam beams. A "Reset" button restores the defaults.

Interactions: Hovering over a bar shows the quantity, factor, and resulting emissions. A banner states which option has the lowest embodied carbon and notes when the ranking changes within the low-to-high uncertainty range, with the sentence "Rankings can flip when factors are uncertain."

Colors: Steel in gray, glulam in tan, concrete in blue, and stored carbon shown as a green negative bar. Each series is also labeled in text.

Implementation: Chart.js grouped bar chart with DOM sliders and live recalculation of quantity times factor.
```

## Related Resources

- [Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md)
