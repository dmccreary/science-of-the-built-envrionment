---
title: Code Adoption and Authority Chain
description: Students will explain (Bloom Level 2, Understand) how a model code becomes enforceable law and will trace (Bloom Level 4, Analyze) which layers of rules apply to a given Minnesota project.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Code Adoption and Authority Chain



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md).

```text
Type: infographic
**sim-id:** code-adoption-authority-chain<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will explain (Bloom Level 2, Understand) how a model code becomes enforceable law and will trace (Bloom Level 4, Analyze) which layers of rules apply to a given Minnesota project.

Visual: A vertical stack of five labeled layers connected by downward arrows: "Model code publisher (for example, the International Code Council)", "State adoption (Minnesota State Building Code, with Minnesota amendments)", "Local ordinance (city or county, including zoning)", "Referenced standards (ASTM, ACI, NFPA, and others)", and "Your project (permit, plan review, inspection)". A side strip shows the question each layer answers. The canvas fills the container width, has a height of 480 px, and redraws on window resize.

Interactions: Hovering over a layer shows a tooltip with a one-sentence definition. Clicking a layer opens an infobox with three items: who writes it, who enforces it, and a Riverbend example, such as the edition in force on the date of the permit application. A toggle labeled "Amendment on" adds a highlighted Minnesota amendment to the state layer and shows how the project-level requirement changes. A button labeled "Which rule wins?" presents a short conflict, such as a local ordinance that is stricter than the state code, and asks the student to choose the controlling layer. The answer is checked immediately with a plain-language explanation.

Colors: Model code layer in blue, state layer in green, local layer in orange, referenced standards in gray, project in dark navy. Each layer also carries a text label and a distinct border style so the diagram is readable without color.

Implementation: p5.js with a responsive canvas, hover hit-testing on each layer, a DOM infobox, and a small quiz routine.
```

## Related Resources

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
