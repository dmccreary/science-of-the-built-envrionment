---
title: Cladding Rainscreen Water Path Explorer
description: Students run a storm against four cladding systems, watch where the water that gets past the joint goes, and compare how the sheathing moisture gauge rises and how long each wall takes to dry.
image: /sims/cladding-rainscreen-water-path-explorer/cladding-rainscreen-water-path-explorer.png
og:image: /sims/cladding-rainscreen-water-path-explorer/cladding-rainscreen-water-path-explorer.png
twitter:image: /sims/cladding-rainscreen-water-path-explorer/cladding-rainscreen-water-path-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Understand
---

# Cladding Rainscreen Water Path Explorer

<iframe src="main.html" width="100%" height="697" scrolling="no"></iframe>

[Run the Cladding Rainscreen Water Path Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/cladding-rainscreen-water-path-explorer/main.html" width="100%" height="697" scrolling="no"></iframe>
```

## Description

Students run a storm against four cladding systems, watch where the water that gets past the joint goes, and compare how the sheathing moisture gauge rises and how long each wall takes to dry.

## How to Use

1. Choose a system from the dropdown: face-sealed siding, drained siding, brick veneer with a cavity, or a rainscreen with a ventilated gap. The default is drained siding with flashing and weeps.
2. Set the rain intensity with the slider and press Run storm. Wind drives droplets against the cladding; a few get through the joint. Follow them: running down the gap and out at the weep, or soaking into the sheathing.
3. Watch the moisture gauge on the sheathing. Untick Flashing + weeps to see what happens when drained water has no exit.
4. Hover over a droplet or a layer to read what it is doing and what moves it: wind pressure, gravity, or capillary action.
5. Press Dry out to watch the sheathing dry in fast-forward and to see the time to dry for all four systems after the same storm.

## Lesson Plan

**Learning objective:** Compare how face-sealed, drained, and rainscreen cladding systems manage water that gets past the surface, and explain why a drainage gap lets a wall dry.

**Suggested activities**

- Predict (5 min): Before running a storm, students rank the four systems by how wet the sheathing will get, then check with a moderate storm.
- Test (10 min): Students run each system at heavy rain with and without flashing, and record the final moisture and the days to dry.
- Explain (10 min): Students write three sentences on why the ventilated gap dries fastest, using drainage, capillary break, and air movement.

**Assessment**

- Students explain why a face-sealed wall soaks the sheathing when a single joint leaks, while a drained wall does not.
- Students describe what flashing and weep openings do and what happens without them.

## References

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Rainscreen (Wikipedia)](https://en.wikipedia.org/wiki/Rainscreen)
- [Capillary action (Wikipedia)](https://en.wikipedia.org/wiki/Capillary_action)

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** cladding-rainscreen-water-path-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) how face-sealed, drained, and rainscreen cladding systems manage water that gets past the surface, and will explain (Bloom Level 2, Understand) why a drainage gap lets a wall dry.

Visual: A cross-section of a wall, with cladding on the left, a gap, a weather-resistive barrier, sheathing, and a stud cavity. Animated blue droplets fall and blow against the cladding. In the selected system, some droplets enter through a joint. A base flashing and weep opening at the bottom are drawn to scale. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: A dropdown to choose the system (face-sealed siding, drained siding, brick veneer with cavity, rainscreen with ventilated gap). A slider for wind-driven rain intensity (light, moderate, heavy). A checkbox to add or remove the flashing and weep openings. A "Run storm" button, and a "Dry out" button that shows the drying time of each system after the storm.

Interactions: Hovering over a droplet or layer shows where the water is and what moves it (gravity, wind pressure, or capillary action). A moisture gauge on the sheathing rises when water is trapped and falls when it drains. A message explains why the face-sealed system without drainage soaks the sheathing, and why a ventilated gap dries it fastest.

Default state: Drained siding, moderate rain, flashing present.

Implementation: p5.js with built-in select, slider, checkbox, and buttons, a simple particle model, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
