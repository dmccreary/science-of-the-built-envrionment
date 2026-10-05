---
title: "One-Line Diagram Symbol Explorer"
description: "Students read the one-line diagram of the Riverbend Youth Center, identify each symbol and its rating, trace the path from the utility transformer to a chosen load, and trip the main breaker to see what goes dark and which emergency lights stay on through the automatic transfer switch."
image: /sims/one-line-diagram-symbol-explorer/one-line-diagram-symbol-explorer.png
og:image: /sims/one-line-diagram-symbol-explorer/one-line-diagram-symbol-explorer.png
twitter:image: /sims/one-line-diagram-symbol-explorer/one-line-diagram-symbol-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand, Apply
---

# One-Line Diagram Symbol Explorer

<iframe src="main.html" width="100%" height="522" scrolling="no"></iframe>

[Run the One-Line Diagram Symbol Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/one-line-diagram-symbol-explorer/main.html" width="100%" height="522" scrolling="no"></iframe>
```

## Description

Students read the one-line diagram of the Riverbend Youth Center, identify each symbol and its rating, trace the path from the utility transformer to a chosen load, and trip the main breaker to see what goes dark and which emergency lights stay on through the automatic transfer switch.

## How to Use

1. Study the diagram from top to bottom: transformer, meter, 200 A main breaker, main distribution panel, then four branches for classroom lighting, the rooftop unit, the kitchen oven, and the emergency lights. The legend lists the symbols.
2. Hover over any symbol to see its name. Click a symbol to open its infobox with the definition, what it stands for in a real room, and the rating shown.
3. Choose a load in Trace load. The path from the utility to that load turns orange, and the panel lists each device in order with the breakers that protect it.
4. Turn Show ratings and Show wire sizes on or off. Press Trip main breaker: all normal circuits turn dark gray, and the emergency lights stay lit through the transfer switch.

## Lesson Plan

**Learning objective:** Interpret a one-line diagram by identifying its symbols and ratings, and trace the path and protection for a chosen load.

**Suggested activities**

- Warm-up (5 min): Students cover the legend and name each symbol from its shape, then click symbols to check.
- Explore (10 min): Students trace each of the four loads and write out the devices in order, noting the smallest breaker that protects each load.
- Apply (10 min): Students predict which loads lose power when the main breaker trips, then test it and explain why the emergency lights stay on.

**Assessment**

- Students list the devices between the utility transformer and the kitchen oven and give the rating of each breaker on the path.
- Students explain in two sentences why the emergency lighting circuit is connected through the transfer switch and not through the panel that serves classroom lighting.

## References

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
- [One-line diagram (Wikipedia)](https://en.wikipedia.org/wiki/One-line_diagram)
- NFPA 70, National Electrical Code (service equipment, feeders, and emergency systems); verify the adopted edition.

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: infographic
**sim-id:** one-line-diagram-symbol-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will interpret (Bloom Level 2, Understand) a one-line diagram by identifying symbols and ratings, and will trace (Bloom Level 3, Apply) the path and protection for a chosen load.

Visual: A one-line diagram of the Riverbend Youth Center electrical system showing the utility transformer, meter, 200 A main breaker, main distribution panel, a feeder to lighting panel LP-1, a feeder to mechanical panel MP-1, a 40 A three-pole breaker serving the kitchen oven, and an automatic transfer switch with an emergency lighting circuit. A legend lists the symbols.

Controls: A drop-down labeled "Trace load" with options such as kitchen oven, classroom lighting, rooftop unit, and emergency lights. A checkbox labeled "Show ratings" and a checkbox labeled "Show wire sizes." A button labeled "Trip main breaker."

Interactions: Hovering over any symbol shows its name. Clicking a symbol opens an infobox with a definition, what the symbol stands for in a real room, and the rating shown. Choosing a load highlights the path from the utility to that load and lists each device in order. Pressing the trip button de-energizes all downstream devices and highlights the emergency circuit, which remains lit through the transfer switch.

Colors: Energized lines in green, de-energized lines in dark gray, highlighted paths in orange, with symbols labeled in text.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createCheckbox, and createButton controls.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
