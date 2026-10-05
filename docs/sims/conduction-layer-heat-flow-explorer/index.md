---
title: "Conduction Through a Layer"
description: "Students apply Fourier's law to a single flat layer: a slab shaded from hot to cold, with arrows that grow with the computed heat flow. Sliders and a material menu change conductivity, thickness, area, and temperature difference, and a compare mode puts two materials side by side."
image: /sims/conduction-layer-heat-flow-explorer/conduction-layer-heat-flow-explorer.png
og:image: /sims/conduction-layer-heat-flow-explorer/conduction-layer-heat-flow-explorer.png
twitter:image: /sims/conduction-layer-heat-flow-explorer/conduction-layer-heat-flow-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Conduction Through a Layer

<iframe src="main.html" width="100%" height="557" scrolling="no"></iframe>

[Run the Conduction Through a Layer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/conduction-layer-heat-flow-explorer/main.html" width="100%" height="557" scrolling="no"></iframe>
```

## Description

Students apply Fourier's law to a single flat layer: a slab shaded from hot to cold, with arrows that grow with the computed heat flow. Sliders and a material menu change conductivity, thickness, area, and temperature difference, and a compare mode puts two materials side by side.

## How to Use

1. Pick a material, then set the thickness, area, and temperature difference with the sliders. The panel shows Q = k × A × ΔT ÷ L with your numbers substituted.
2. Hover over the slab to read the temperature at any depth between the hot face and the cold face.
3. Release a slider after exactly doubling or halving its value (for example thickness from 3.5 to 7 in) to see a message about how the flow responds.
4. Check Compare two materials to add a second slab. A bar shows how many times more heat one layer passes than the other under the same conditions.

## Lesson Plan

**Learning objective:** Calculate the conductive heat flow through a single layer and compare how conductivity, thickness, area, and temperature difference each change the result.

**Suggested activities**

- Warm-up (5 min): Students predict the heat flow through a 3.5 in fiberglass batt and a 3.5 in softwood stud (1 ft², 70°F), then check against the sim (5.4 and 16 BTU/h).
- Explore (10 min): Students change one variable at a time, record Q, and state the rule for each: proportional to k, A, and ΔT, inversely proportional to L.
- Analyze (10 min): In compare mode, students rank the seven materials by heat flow at equal thickness and explain why steel studs create thermal bridges.

**Assessment**

- Students calculate by hand the flow through an 8 in concrete layer (1 ft², 70°F) and verify it against the sim (87.5 BTU/h).
- Students explain in two sentences why adding thickness to an insulation layer lowers heat loss but does not stop it.

## References

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
- [Thermal conduction (Wikipedia)](https://en.wikipedia.org/wiki/Thermal_conduction)
- [Thermal conductivity and resistivity (Wikipedia)](https://en.wikipedia.org/wiki/Thermal_conductivity_and_resistivity)

## Specification

The full specification below is extracted from
[Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md).

```text
Type: microsim
**sim-id:** conduction-layer-heat-flow-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the conductive heat flow through a single layer and will compare (Bloom Level 4, Analyze) how conductivity, thickness, area, and temperature difference each change the result.

Visual: A rectangular slab with a hot face on the left and a cold face on the right, drawn with a color gradient that shows the temperature dropping from one side to the other. Heat-flow arrows on the slab scale with the computed rate. A side-by-side "Compare" panel can show two layers at once. The canvas width follows the container, the height is 420 px, and the sketch redraws on window resize.

Controls: A dropdown labeled "Material" listing the seven materials in the table above. A slider labeled "Thickness (in)" from 0.5 to 12 with a default of 3.5. A slider labeled "Area (ft²)" from 1 to 100 with a default of 1. A slider labeled "Temperature difference (°F)" from 5 to 100 with a default of 70. A checkbox labeled "Compare two materials" adds a second slab with its own material dropdown.

Interactions: A readout shows \( \dot{Q} \) in BTU/h with the substituted equation. Hovering over the slab shows the local temperature at that depth. Doubling a slider value triggers a message such as "Doubling thickness halves the flow." In compare mode, a bar shows the ratio of the two heat flows.

Colors: A red-to-blue gradient for temperature, and gray arrows for heat flow. Values appear in text as well as color.

Implementation: p5.js with a responsive canvas, built-in controls, and a lookup table of conductivities.
```

## Related Resources

- [Chapter 3: Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md)
