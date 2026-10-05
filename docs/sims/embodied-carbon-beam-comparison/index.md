---
title: Embodied Carbon Beam Comparison
description: Compare the product-stage embodied carbon of steel, glued-laminated, and reinforced concrete beams for the same span by multiplying each member's quantity by an emission factor. Sliders sweep the factors across a low-to-high range to show when the ranking can flip, and a checkbox shows the stored biogenic carbon in wood.
image: /sims/embodied-carbon-beam-comparison/embodied-carbon-beam-comparison.png
og:image: /sims/embodied-carbon-beam-comparison/embodied-carbon-beam-comparison.png
twitter:image: /sims/embodied-carbon-beam-comparison/embodied-carbon-beam-comparison.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Apply, Evaluate
---

# Embodied Carbon Beam Comparison

<iframe src="main.html" width="100%" height="802" scrolling="no"></iframe>

[Run the Embodied Carbon Beam Comparison MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/embodied-carbon-beam-comparison/main.html" width="100%" height="802" scrolling="no"></iframe>
```

## Description

Compare the product-stage embodied carbon of steel, glued-laminated, and reinforced concrete beams for the same span by multiplying each member's quantity by an emission factor. Sliders sweep the factors across a low-to-high range to show when the ranking can flip, and a checkbox shows the stored biogenic carbon in wood.

## How to Use

1. Start with the defaults: six beams over a 40 ft span. The pale bars show mass in kilograms and the solid bars show embodied carbon in kg CO₂e. The table under the chart shows quantity times factor equals emissions.
2. Compare the glulam and steel rows with the Chapter 20 worked example: about 5,750 kg CO₂e for steel and 1,560 kg CO₂e for glulam.
3. Drag the emission factor sliders across their low-to-high ranges. Watch the banner to see when two options can swap places.
4. Check Count stored biogenic carbon in wood to add a green negative bar of about 9,000 kg CO₂ for the default glulam beams, and read the net result in the table.
5. Change the number of beams or the span to see how quantity scales, hover over any bar for the numbers behind it, and click Reset to restore the defaults.

## Lesson Plan

**Learning objective:** Students calculate the product-stage embodied carbon of alternative structural members from quantity and emission factor, and evaluate how uncertainty in the factor changes the ranking.

**Suggested activities**

- Verify the steel and glulam rows of the table against the Chapter 20 worked example by hand, then add the reinforced concrete row using the quantity shown.
- Find the steel emission factor at which steel and reinforced concrete have equal emissions for the default quantities.
- Discuss whether it is fair to count stored biogenic carbon, and what must be true about the forest and the end of life for the storage to be real.

**Assessment**

- A product declaration reports 2.1 kg CO₂e per kg for steel. Students recalculate the steel bar and state whether the ranking of the three options changes.
- Students write a two-sentence justification of a material choice that acknowledges the uncertainty in the factors.

## References

- [Chapter 20: Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md)
- [Embodied carbon (Wikipedia: Embodied energy)](https://en.wikipedia.org/wiki/Embodied_energy)
- [Environmental product declaration (Wikipedia)](https://en.wikipedia.org/wiki/Environmental_product_declaration)

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
