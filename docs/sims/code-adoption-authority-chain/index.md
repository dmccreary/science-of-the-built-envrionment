---
title: "Code Adoption and Authority Chain"
description: "Students follow a model code through state adoption, local ordinance, and referenced standards down to a permitted project, then test their understanding by deciding which layer controls in a series of rule conflicts."
image: /sims/code-adoption-authority-chain/code-adoption-authority-chain.png
og:image: /sims/code-adoption-authority-chain/code-adoption-authority-chain.png
twitter:image: /sims/code-adoption-authority-chain/code-adoption-authority-chain.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand, Analyze
---

# Code Adoption and Authority Chain

<iframe src="main.html" width="100%" height="537" scrolling="no"></iframe>

[Run the Code Adoption and Authority Chain MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/code-adoption-authority-chain/main.html" width="100%" height="537" scrolling="no"></iframe>
```

## Description

Students follow a model code through state adoption, local ordinance, and referenced standards down to a permitted project, then test their understanding by deciding which layer controls in a series of rule conflicts.

## How to Use

1. Read the stack from top to bottom. Each layer is a box with its own border style, and the strip on the right gives the question that layer answers.
2. Hover over a layer for a one-sentence definition. Click a layer to see who writes it, who enforces it, and a Riverbend example. Click it again to close the infobox.
3. Check Amendment on to highlight the Minnesota amendment in the state layer and see how the footing requirement at the project layer changes.
4. Press Which rule wins? and click the layer you think controls the conflict. The answer is checked at once with a plain-language explanation; press the button again for the next conflict.

## Lesson Plan

**Learning objective:** Explain how a model code becomes enforceable law and trace which layers of rules apply to a Minnesota project.

**Suggested activities**

- Predict (5 min): Before clicking, students write one sentence on why a model code has no legal force by itself, then check it against the infobox for the model code layer.
- Trace (10 min): Students click all five layers and fill in a table of who writes and who enforces each layer, then repeat with the amendment on and note what changes at the project layer.
- Analyze (10 min): Students work through every Which rule wins? conflict, record the controlling layer, and write the reason in their own words before reading the explanation.

**Assessment**

- Students explain in two sentences why a permit applied for in 2025 may be reviewed against an older edition of the model code than the newest one published.
- Students write one new conflict between two layers and name the controlling layer with a reason.

## References

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
- [Building code (Wikipedia)](https://en.wikipedia.org/wiki/Building_code)
- Minnesota Department of Labor and Industry, Minnesota State Building Code (verify the adopted edition and amendments with the building official).

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
