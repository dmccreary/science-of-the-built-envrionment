---
title: Reinforced Concrete Beam Behavior Explorer
description: Students load a 12 in. by 20 in. concrete beam from zero to failure and watch where cracks form, how the compression zone, tension zone, and steel share the bending, and why plain, wrongly reinforced, reinforced, and prestressed beams behave so differently. A switch to a cantilever moves the tension face to the top.
image: /sims/reinforced-concrete-beam-behavior-explorer/reinforced-concrete-beam-behavior-explorer.png
og:image: /sims/reinforced-concrete-beam-behavior-explorer/reinforced-concrete-beam-behavior-explorer.png
twitter:image: /sims/reinforced-concrete-beam-behavior-explorer/reinforced-concrete-beam-behavior-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand, Apply
---

# Reinforced Concrete Beam Behavior Explorer

<iframe src="main.html" width="100%" height="672" scrolling="no"></iframe>

[Run the Reinforced Concrete Beam Behavior Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/reinforced-concrete-beam-behavior-explorer/main.html" width="100%" height="672" scrolling="no"></iframe>
```

## Description

Students load a 12 in. by 20 in. concrete beam from zero to failure and watch where cracks form, how the compression zone, tension zone, and steel share the bending, and why plain, wrongly reinforced, reinforced, and prestressed beams behave so differently. A switch to a cantilever moves the tension face to the top.

## How to Use

1. Choose Plain concrete and raise the Load slider. The beam fractures suddenly at a low load. Read the state and the message to see why a brittle material fails without warning.
2. Choose Rebar at the bottom and raise the load again. Watch the state move from uncracked to cracked, steel yielding, and failed, and compare each threshold with the plain beam. Hover over the cross-section to see the compression and tension zones, and click a bar to read its area and force.
3. Try Rebar at the top (wrong place) and Prestressed. Notice that bars on the compression face do not help, and that the prestressed beam arches upward at zero load and does not crack until much later.
4. Switch Support from Simple span to Cantilever. The tension face moves to the top, so the bars that were right are now wrong, and the other way round.

## Lesson Plan

**Learning objective:** Explain how the compression zone, tension zone, and reinforcement of a concrete beam share the bending load, and predict where cracks and rebar belong for different support conditions.

**Suggested activities**

- Warm-up (5 min): Students sketch a simply supported beam under a midspan load, label the compression and tension faces, and predict where a plain concrete beam will crack.
- Explore (10 min): For each of the four reinforcement choices on a simple span, students record the load at which cracking, yielding, and failure occur and describe the failure mode as brittle or ductile.
- Apply (10 min): Students switch to the cantilever, decide where the rebar belongs before testing, and then check the prediction by trying both the top and the bottom placements.

**Assessment**

- Students explain in two sentences why a plain concrete beam fails suddenly while a correctly reinforced beam gives warning.
- Students state which face of a cantilever needs steel and use the simulator to defend the answer.

## References

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
- American Concrete Institute, ACI 318 Building Code Requirements for Structural Concrete (flexural design of reinforced and prestressed concrete members).
- [Reinforced concrete (Wikipedia)](https://en.wikipedia.org/wiki/Reinforced_concrete)

## Specification

The full specification below is extracted from
[Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md).

```text
Type: microsim
**sim-id:** reinforced-concrete-beam-behavior-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) how the compression zone, tension zone, and reinforcement of a concrete beam share the bending load, and will predict (Bloom Level 3, Apply) where cracks and rebar belong for different support conditions.

Visual: A side view of a simply supported concrete beam with a load arrow at midspan, a deflected shape exaggerated for clarity, and an enlarged cross-section beneath it with the neutral axis, compression zone (shaded), and rebar dots. The canvas follows the container width with a height of 500 px.

Controls: A slider labeled "Load (kips)" increases the load from zero to failure. Radio buttons select "Plain concrete," "Rebar at the bottom," "Rebar at the top (wrong place)," and "Prestressed." A drop-down selects "Simple span" or "Cantilever" so the student can see that the tension face moves to the top.

Interactions: As the load rises, cracks appear in the tension zone and a readout shows the state: uncracked, cracked, steel yielding, and failed. Hovering over the cross-section labels tension and compression, and clicking the rebar opens an infobox with its area from the bar table and its force. In the "Plain concrete" case the beam fails suddenly at a low load, with a message explaining brittle failure. In the "Prestressed" case, the beam shows an upward camber and no cracking at moderate loads.

Colors: Compression zones are red, tension zones are blue, cracks are black, and rebar is dark gray. Zones are also labeled with plus and minus signs.

Implementation: p5.js with DOM controls and a responsive canvas.
```

## Related Resources

- [Chapter 8: Concrete and Masonry](../../chapters/08-concrete-masonry/index.md)
