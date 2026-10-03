---
title: Building Material Property Comparison Chart
description: Students will compare (Bloom Level 4, Analyze) typical values of density, strength, stiffness, thermal expansion, and thermal conductivity across common building materials, and will differentiate (Bloom Level 4, Analyze) why each material suits some applications better than others.
status: scaffold
library: Chart.js
bloom_level: TBD
---

# Building Material Property Comparison Chart



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 5: Properties of Building Materials](../../chapters/05-material-properties/index.md).

```text
Type: chart
**sim-id:** building-material-property-comparison-chart<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) typical values of density, strength, stiffness, thermal expansion, and thermal conductivity across common building materials, and will differentiate (Bloom Level 4, Analyze) why each material suits some applications better than others.

Visual: A horizontal bar chart with one bar per material (structural steel, normal-weight concrete, softwood lumber, clay brick masonry, glass, aluminum, and rigid foam insulation). The title and axis label change with the selected property. A footnote states that all values are approximate and typical, and that actual products vary. The chart fills the container width with a height of 440 px and redraws on window resize.

Controls: A dropdown labeled "Property" with these choices: density (lb/ft³), compressive strength (psi), tensile strength (psi), modulus of elasticity (psi), thermal expansion coefficient (per °F), and thermal conductivity (BTU·in/h·ft²·°F). A toggle labeled "Logarithmic scale" switches the axis, because the values span several orders of magnitude. A checkbox labeled "Divide by density" shows the property per pound of material.

Interactions: Hovering over a bar shows the material, the value with units, and a one-sentence note on what the number means for design. Clicking a bar opens an infobox with the material's typical building uses and its main weakness. Switching on "Divide by density" re-renders the chart and displays a note, such as "Per pound, wood is competitive with steel in compression."

Colors: Metals are gray, concrete and masonry are tan, wood is brown, glass is light blue, and insulation is yellow. Each bar is labeled in text.

Implementation: Chart.js bar chart with a data table for each property, a logarithmic-axis toggle, custom tooltip callbacks, and a click handler for the infobox.
```

## Related Resources

- [Chapter 5: Properties of Building Materials](../../chapters/05-material-properties/index.md)
