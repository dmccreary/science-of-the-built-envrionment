---
title: USCS Soil Classifier
description: Students will apply (Bloom Level 3, Apply) the simplified USCS decision path to a sieve analysis to classify a soil as a gravel, sand, silt, or clay, and will predict (Bloom Level 2, Understand) its drainage, strength, and frost behavior.
status: scaffold
library: p5.js
bloom_level: TBD
---

# USCS Soil Classifier



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md).

```text
Type: microsim
**sim-id:** uscs-soil-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will apply (Bloom Level 3, Apply) the simplified USCS decision path to a sieve analysis to classify a soil as a gravel, sand, silt, or clay, and will predict (Bloom Level 2, Understand) its drainage, strength, and frost behavior.

Visual: On the left, a column of three stacked sieves (No. 4, No. 200, and a pan) with a stacked bar showing the percentage of the sample retained in each. On the right, a flowchart of the decision path (more than 50 percent retained on No. 200? more than half of coarse fraction sand or gravel? more than 12 percent fines? plasticity low or high?) with the current path highlighted. At the bottom, a result card shows the symbol, a name, and icons for drainage, strength, and frost susceptibility. The canvas is responsive, 460 px tall, and redraws on window resize.

Controls: Three sliders for percent gravel, sand, and fines that always sum to 100 (adjusting one rescales the others). A dropdown for "plasticity of the fines" with options low and high. A "Load Riverbend boring B-2" button sets 8, 62, and 30 percent with low plasticity. A "Random sample" button generates a new soil.

Interactions: Hovering over a sieve shows its opening size and the particle size category it separates. Clicking any decision box opens a one-sentence explanation of why that test is applied. The result card updates immediately when any control changes.

Default state: Riverbend boring B-2 loaded, result SM (silty sand).

Implementation: p5.js with built-in sliders, select, and buttons, a rule-based classifier, and a responsive canvas.
```

## Related Resources

- [Chapter 9: Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md)
