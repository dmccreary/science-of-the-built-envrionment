---
title: "Electrical Service Path Explorer"
description: "Students follow electricity from the utility primary line through the transformer, meter, service entrance, feeder, panelboard, and branch circuit to the loads, reading the voltage, current, owner, and protection at each stage. A load slider shows when equipment is overloaded, and a trip button shows what goes dark downstream of a breaker."
image: /sims/electrical-service-path-explorer/electrical-service-path-explorer.png
og:image: /sims/electrical-service-path-explorer/electrical-service-path-explorer.png
twitter:image: /sims/electrical-service-path-explorer/electrical-service-path-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Remember, Understand
---

# Electrical Service Path Explorer

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Electrical Service Path Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/electrical-service-path-explorer/main.html" width="100%" height="502" scrolling="no"></iframe>
```

## Description

Students follow electricity from the utility primary line through the transformer, meter, service entrance, feeder, panelboard, and branch circuit to the loads, reading the voltage, current, owner, and protection at each stage. A load slider shows when equipment is overloaded, and a trip button shows what goes dark downstream of a breaker.

## How to Use

1. Choose a service type: 120/240 V single-phase, 208Y/120 V three-phase, or 480Y/277 V three-phase. Voltage labels above the stages change with it.
2. Drag the Building load slider from 10 to 500 kVA. The current labels update at every stage, and any stage whose rating is exceeded turns red with an OVER RATING tag.
3. Click a block to open its infobox with the function, voltage, current at this load, owner, protection, and the code idea. Hover over a block or a breaker symbol to see its name.
4. Pick a breaker (main, feeder, or branch) and press Trip a breaker. Everything downstream turns dark gray and everything upstream stays energized. Press Reset the breaker to restore power.

## Lesson Plan

**Learning objective:** Name the eight stages from utility to load in order, and explain the voltage, current, owner, and protective device at each stage.

**Suggested activities**

- Warm-up (5 min): Students list the stages from memory, then check the order against the diagram and mark which are utility-owned and which are owner-owned.
- Explore (10 min): With 208Y/120 V selected and the load at 72 kVA, students click each stage and record the current and rating. They then switch to 480Y/277 V and explain why the current drops.
- Apply (10 min): Students find the load at which each stage first turns red on each service type, then trip each breaker in turn and describe which parts of the building lose power.

**Assessment**

- Students sketch the path from memory and label the voltage, current, and protective device at each stage.
- Students explain in two or three sentences why tripping the branch breaker leaves the panelboard energized but tripping the main breaker does not.

## References

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- NFPA 70, National Electrical Code (service entrance, feeders, panelboards, and branch circuits; verify the adopted edition).
- [Electric power distribution (Wikipedia)](https://en.wikipedia.org/wiki/Electric_power_distribution)

## Specification

The full specification below is extracted from
[Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md).

```text
Type: infographic
**sim-id:** electrical-service-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) each stage of the path from utility to outlet and will explain (Bloom Level 2, Understand) what voltage, current, and protection exist at each stage.

Visual: A left-to-right diagram in the style of a simple one-line diagram. From left to right the stages are: utility primary line, pad-mounted transformer, meter, service entrance equipment with main breaker, feeder, panelboard with breakers, branch circuit, and loads (light, receptacle, and motor). Each stage is a labeled block, and lines show the path of power. Voltage and current labels appear above the path.

Controls: A drop-down labeled "Service type" with "120/240 V single-phase," "208Y/120 V three-phase," and "480Y/277 V three-phase." A slider labeled "Building load (kVA)" from 10 to 500. A button labeled "Trip a breaker" and a drop-down to choose which breaker.

Interactions: Hovering over a block shows its name. Clicking a block opens an infobox with its function, typical voltage, typical current at the chosen load, who owns it (utility or owner), and the code idea that governs it. Changing the building load updates the current labels along the path, and any block whose rating is exceeded turns red with the message "Rating exceeded. Select larger equipment." Tripping a breaker darkens everything downstream of it and leaves everything upstream energized.

Colors: Utility-owned equipment in blue, owner-owned equipment in green, tripped sections in dark gray, overloaded blocks in red. Each state is also labeled with text.

Responsive design: The canvas follows the container width and redraws on window resize. On narrow screens the stages stack vertically. Height is 500 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSelect, createSlider, and createButton controls created before any positioning function.
```

## Related Resources

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
