---
title: "Roof Drainage and Ponding Calculator"
description: "Students calculate the flow a roof's drains must carry from roof area and rainfall intensity, then clog drains and run a 30-minute storm to see standing water build up, add load, and deflect the roof. A secondary overflow scupper stops the rise."
image: /sims/roof-drainage-ponding-calculator/roof-drainage-ponding-calculator.png
og:image: /sims/roof-drainage-ponding-calculator/roof-drainage-ponding-calculator.png
twitter:image: /sims/roof-drainage-ponding-calculator/roof-drainage-ponding-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Understand
---

# Roof Drainage and Ponding Calculator

<iframe src="main.html" width="100%" height="517" scrolling="no"></iframe>

[Run the Roof Drainage and Ponding Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/roof-drainage-ponding-calculator/main.html" width="100%" height="517" scrolling="no"></iframe>
```

## Description

Students calculate the flow a roof's drains must carry from roof area and rainfall intensity, then clog drains and run a 30-minute storm to see standing water build up, add load, and deflect the roof. A secondary overflow scupper stops the rise.

## How to Use

1. Set the roof area and the rainfall intensity with the two sliders. The total flow readout updates immediately and equals area times intensity times 0.0104 gallons per minute per ft² per inch per hour.
2. Choose the number of drains. Tick the numbered Clogged boxes (or click a drain symbol in the plan) to block drains, and watch the flow per open drain.
3. Press Run storm for 30 minutes. If the open drains cannot carry the flow, water ponds, the depth gauge rises, and the deck deflects. The readouts show the ponding load in psf and the total weight of water in pounds.
4. Tick Secondary overflow installed and run the storm again. When the water reaches the scupper it spills out and the depth stops rising.

## Lesson Plan

**Learning objective:** Calculate the flow a roof drain must carry from roof area and rainfall intensity, and predict how clogged drains turn a rainfall into a standing-water load.

**Suggested activities**

- Warm-up (5 min): Students reproduce the chapter's worked example (9,000 ft² at 3 in/h) by hand, then check the total flow and the flow per drain in the sim.
- Explore (10 min): Students clog drains one at a time and find how many drains can be lost before water begins to pond, then find the rain intensity at which that changes.
- Predict (10 min): Students predict the depth and the load after 30 minutes with all drains clogged at 4 in/h, run the storm, and compare. They repeat with the secondary overflow installed.

**Assessment**

- Students calculate the ponding load in psf and in total pounds for 2 inches of standing water on a 9,000 ft² roof and compare it with the sim.
- Students explain in two sentences why standing water is called progressive ponding and what stops it.

## References

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
- [Roof drain (Wikipedia)](https://en.wikipedia.org/wiki/Roof_drain)
- International Code Council, International Plumbing Code, chapter on storm drainage (rainfall rate and drain sizing; verify the adopted edition).

## Specification

The full specification below is extracted from
[Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md).

```text
Type: microsim
**sim-id:** roof-drainage-ponding-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the flow a roof drain must carry from roof area and rainfall intensity, and will predict (Bloom Level 2, Understand) how a clogged drain converts a rainfall into a standing-water load.

Visual: A plan view of a rectangular roof with four drain symbols and a side-section view below it showing the roof deck, the water surface, and a deflection curve exaggerated for visibility. A readout panel shows total flow in gallons per minute, flow per drain, and ponding load in pounds per square foot and in total pounds.

Controls: A slider for roof area (2,000 to 20,000 ft²), a slider for rainfall intensity (1 to 6 inches per hour), a selector for number of drains (2 to 8), and a checkbox for each drain labeled "Clogged." A checkbox labeled "Secondary overflow installed" adds a scupper at a set height, and a "Run storm for 30 minutes" button animates the water level.

Interactions: Changing any control updates the readouts immediately. When drains are clogged, the water depth in the side section rises with time. When depth reaches the scupper height and the overflow is installed, water spills out and the depth stops rising; with no overflow, the depth keeps rising and the deflection curve deepens, with a status line reading "Progressive ponding: deflection adds water, which adds deflection."

Colors: Roof in gray, water in blue, clogged drains in red with an X symbol, a depth gauge in black.

Responsive design: The canvas follows the container width and redraws on resize. Height is 480 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider, createSelect, createCheckbox, and createButton controls.
```

## Related Resources

- [Chapter 13: Roof Assemblies](../../chapters/13-roof-assemblies/index.md)
