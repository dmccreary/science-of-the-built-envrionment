---
title: Building Systems Cutaway
description: Students will identify (Bloom Level 1, Remember) the six building systems in a simple building section and analyze (Bloom Level 4, Analyze) which other systems are affected when one system changes.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Building Systems Cutaway



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md).

```text
Type: infographic
**sim-id:** building-systems-cutaway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the six building systems in a simple building section and analyze (Bloom Level 4, Analyze) which other systems are affected when one system changes.

Visual: A simple two-story house in section, with the structure, enclosure, mechanical, plumbing, electrical, and fire-protection components drawn in six distinct colors. Canvas width follows the container; height 480 px; redraw on window resize.

Interactions: Clicking a system name in a legend toggles that system's layer on and off. Clicking a component opens an infobox naming its system and listing the other systems that depend on it. A "What if?" dropdown offers the scenarios "Remove insulation," "Add a large window," and "Move the furnace," and highlights the systems affected in each case, with a one-sentence explanation in the infobox.

Colors: Each system has its own color from a color-blind safe palette, and legend swatches are labeled with text as well as color.

Implementation: p5.js layered drawing with hit-testing on component shapes.
```

## Related Resources

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md)
