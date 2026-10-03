---
title: Building Material Property Comparison Chart
description: Students compare density, strength, stiffness, thermal expansion, and thermal conductivity across seven common building materials on one horizontal bar chart, with a logarithmic scale for values that span many orders of magnitude and a Divide by density option that shows each property per pound of material.
image: /sims/building-material-property-comparison-chart/building-material-property-comparison-chart.png
og:image: /sims/building-material-property-comparison-chart/building-material-property-comparison-chart.png
twitter:image: /sims/building-material-property-comparison-chart/building-material-property-comparison-chart.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Analyze
---

# Building Material Property Comparison Chart

<iframe src="main.html" width="100%" height="662" scrolling="no"></iframe>

[Run the Building Material Property Comparison Chart MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/building-material-property-comparison-chart/main.html" width="100%" height="662" scrolling="no"></iframe>
```

## Description

Students compare density, strength, stiffness, thermal expansion, and thermal conductivity across seven common building materials on one horizontal bar chart, with a logarithmic scale for values that span many orders of magnitude and a Divide by density option that shows each property per pound of material.

## How to Use

1. Choose a property from the Property menu. The title, axis label, and bars change, and every bar shows its value in text.
2. Hover over a bar to read the material, the value with units, and a one-sentence note on what the number means for design. Click a bar to see the material's typical uses and its main weakness.
3. Switch Logarithmic scale on and off. The values span several orders of magnitude, so on a linear scale the small bars nearly disappear.
4. Check Divide by density to see the property per pound of material. With compressive strength selected, notice that wood is competitive with steel per pound.

## Lesson Plan

**Learning objective:** Compare typical values of density, strength, stiffness, thermal expansion, and thermal conductivity across common building materials, and differentiate why each material suits some applications better than others.

**Suggested activities**

- Warm-up (5 min): Students rank the seven materials by density, then by compressive strength, from memory, and check their rankings against the chart.
- Explore (10 min): Students find, for each material, one property where it is the best and one where it is the worst, and click the bar to read its typical uses and weakness.
- Analyze (10 min): Students turn on Divide by density for compressive strength and for stiffness and explain why light wood framing competes with steel.

**Assessment**

- Students explain in two sentences why a material that is strong in compression may still be a poor choice for a beam.
- Students choose a material for a window frame and justify the choice with at least two properties from the chart.

## References

- [Chapter 5: Material Properties](../../chapters/05-material-properties/index.md)
- [Young's modulus (Wikipedia)](https://en.wikipedia.org/wiki/Young%27s_modulus)
- [Thermal conductivity (Wikipedia)](https://en.wikipedia.org/wiki/Thermal_conductivity)

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
