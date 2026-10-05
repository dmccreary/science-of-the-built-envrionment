---
title: Ice Dam Formation Explorer
description: Students change outdoor temperature, insulation, ceiling air leaks, attic ventilation, and an ice-and-water barrier on a roof section and watch the deck temperature, the snow melt, and the ice at the eave respond. The status line always points to air sealing first.
image: /sims/ice-dam-formation-explorer/ice-dam-formation-explorer.png
og:image: /sims/ice-dam-formation-explorer/ice-dam-formation-explorer.png
twitter:image: /sims/ice-dam-formation-explorer/ice-dam-formation-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze
---

# Ice Dam Formation Explorer

<iframe src="main.html" width="100%" height="462" scrolling="no"></iframe>

[Run the Ice Dam Formation Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ice-dam-formation-explorer/main.html" width="100%" height="462" scrolling="no"></iframe>
```

## Description

Students change outdoor temperature, insulation, ceiling air leaks, attic ventilation, and an ice-and-water barrier on a roof section and watch the deck temperature, the snow melt, and the ice at the eave respond. The status line always points to air sealing first.

## How to Use

1. Read the default case: 20 °F outdoors, R-30 insulation, air leaks at the ceiling, vents closed, and no barrier. Snow melts on the warm deck, the water refreezes on the cold overhang, and an ice dam forms.
2. Untick Air leaks at ceiling and watch the deck temperature drop. Then raise the insulation, then tick Soffit and ridge vents open, one change at a time, and note which change matters most.
3. Tick Ice-and-water barrier at eave. The readout for water reaching the interior changes, but the ice dam still forms.
4. Move the outdoor temperature slider. Very cold weather keeps the deck below freezing even for a leaky ceiling, and weather near freezing makes a dam more likely.
5. Move the pointer over the canvas to animate the meltwater and any water reaching the interior.

## Lesson Plan

**Learning objective:** Analyze how ceiling air leakage, insulation level, and attic ventilation combine to produce or prevent an ice dam on a Minnesota roof.

**Suggested activities**

- Warm-up (5 min): Students predict which of the three heat-control fixes will stop the dam fastest, then test the fixes one at a time in the sim.
- Explore (10 min): Students find the outdoor temperature range in which a leaky R-30 ceiling with closed vents makes a dam, and the range in which it does not.
- Analyze (10 min): Students rank air sealing, insulation, ventilation, and the barrier from first to last and justify the order using the deck temperature readout.

**Assessment**

- Students explain in two sentences why ventilation is the third remedy and not the first.
- Students explain what an ice-and-water barrier protects and what it does not stop.

## References

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
- [Ice dam (roof) (Wikipedia)](https://en.wikipedia.org/wiki/Ice_dam_(roof))
- U.S. Department of Energy, Energy Saver guidance on attic air sealing and insulation (energy.gov).

## Specification

The full specification below is extracted from
[Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md).

```text
Type: microsim
**sim-id:** ice-dam-formation-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how ceiling air leakage, insulation level, and attic ventilation combine to produce or prevent an ice dam on a Minnesota roof.

Visual: A side section of a house eave and attic with a snow layer on the roof. Color shading shows temperature, from warm orange near the ceiling to cool blue at the soffit. Arrows show heat flow and air movement. Ice appears at the eave when conditions allow it.

Controls: A slider for outdoor temperature (-20 to 30 °F), a slider for insulation R-value (R-19 to R-60), a checkbox "Air leaks at ceiling," a checkbox "Soffit and ridge vents open," and a checkbox "Ice-and-water barrier at eave."

Interactions: As controls change, the roof deck temperature updates and snow melts on the part of the roof above 32 °F. Meltwater flows to the eave and freezes if the overhang is below 32 °F. A readout says "Ice dam: forming, minor, or none" and a second readout says "Water reaching interior: yes or no." The first fix suggested by the status line is always air sealing, and the ice-and-water barrier checkbox shows that it protects the interior but does not stop the dam from forming.

Colors: Temperature gradient from blue through white to orange, ice in pale cyan with an outline, water drops in blue.

Responsive design: The canvas follows the container width and redraws on resize. Height is 460 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createCheckbox controls, and a simple steady-state temperature calculation for the deck.
```

## Related Resources

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
