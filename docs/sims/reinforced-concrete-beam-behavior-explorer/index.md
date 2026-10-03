---
title: Reinforced Concrete Beam Behavior Explorer
description: Students will explain (Bloom Level 2, Understand) how the compression zone, tension zone, and reinforcement of a concrete beam share the bending load, and will predict (Bloom Level 3, Apply) where cracks and rebar belong for different support conditions.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Reinforced Concrete Beam Behavior Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
