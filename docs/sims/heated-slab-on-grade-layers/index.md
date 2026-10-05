---
title: "Heated slab on grade"
description: "Students identify the layers under and in a heated slab on grade and predict how ground water, water vapor, and heat move when the gravel, vapor retarder, or foam is left out."
status: built
library: p5.js
bloom_level: Remember, Understand
csi: ["03 30 00 Cast-in-Place Concrete", "07 21 00 Thermal Insulation", "07 26 00 Vapor Retarders", "31 23 23 Fill", "32 11 23 Aggregate Base Courses", "31 23 00 Excavation and Fill"]
---

# Heated slab on grade

<iframe src="main.html" width="100%" height="792" scrolling="no"></iframe>

[Run the Heated slab on grade MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/heated-slab-on-grade-layers/main.html" width="100%" height="792" scrolling="no"></iframe>
```

## Description

Students identify the layers under and in a heated slab on grade and predict how ground water, water vapor, and heat move when the gravel, vapor retarder, or foam is left out.

## How to Use

1. Read the floor from the heated room at the top down to the ground at the bottom. Each numbered label names a layer.
2. Click a layer or its label to see what it is, why it is there, and what goes wrong without it.
3. Untick a layer's checkbox to leave that layer out, or choose Punch a hole first to puncture it. Watch where the blue (ground water), purple (vapor), and orange (heat) dots stop or pass.
4. Tick Temperature and drag the slider to see how much of the temperature drop the foam takes. Use Explode to separate the layers so thin ones are easy to see.
5. Tick Quiz me to test yourself. A question appears under the drawing, the layer names are hidden, and you click the layer that answers it. Your score builds as you go; press Next question to continue.

## Lesson Plan

**Learning objective:** Identify the layers under and in a heated slab-on-grade floor and predict what happens to ground water, vapor, and heat when the vapor retarder or the foam is left out.

**Suggested activities**

- Predict and test (10 min): before unticking any box, write which flows each of the five constructed layers (everything above the soil) stops. Then break the vapor retarder, then the foam, and compare your prediction with the status line.
- Redundancy (5 min): break the gravel alone, then the vapor retarder alone, then both. Explain why ground water only reaches the slab when both are gone.
- Cost of leaving out the foam (5 min): turn on Temperature, then break the foam. Compare where the red line bends and how far the underside of the slab cools with and without foam.

**Assessment**

- Which layer is the capillary break, and what does the vapor retarder do that the break cannot?
- A crew skips the foam under a radiant slab. Describe where the heat goes and what the homeowner notices.
- The foam slows some vapor, but it is not a substitute for the polyethylene sheet. Explain why in your own words.
- Why does the sand cushion sit directly under the vapor retarder?

## MasterFormat Context

Each layer is tied to the specification section a builder would look it up under (CSI MasterFormat; section numbers are from memory and should be checked against the current edition).

| # | Layer | MasterFormat section |
|---|-------|----------------------|
| 1 | Concrete slab | 03 30 00 Cast-in-Place Concrete |
| 2 | Rigid foam | 07 21 00 Thermal Insulation |
| 3 | Vapor retarder | 07 26 00 Vapor Retarders |
| 4 | Sand cushion | 31 23 23 Fill |
| 5 | Compacted gravel | 32 11 23 Aggregate Base Courses |
| 6 | Subgrade soil | 31 23 00 Excavation and Fill |

## What Ages in This Sim

Values are illustrative and were last reviewed as of **2026-10**.

**Timeless (physics and principles):**

- Heat flows from the warm slab toward the cold ground, and most of the temperature drop falls across the layer with the most thermal resistance.
- Ground water rises as liquid through fine soil but cannot climb across large gaps, so a gravel layer breaks the capillary path.
- Vapor moves through gravel and sand freely and needs a vapor retarder to be slowed.

**Check before relying on it:**

| Item | Basis | What to check |
|------|-------|---------------|
| R-values of foam, sand, gravel, and soil | Chapter 3 approximate values plus the author's assumptions for sand, gravel, and soil | Use manufacturer data and the slab insulation R-value required by the adopted energy code |
| Vapor retarder thickness (10 mil) and class | Typical practice, not a code citation | Confirm the product class and the flooring manufacturer's moisture limits |
| Whether foam is required under a heated slab, and where the retarder sits relative to the foam | Chapter 10 does not specify either | Check the adopted energy code edition and the project details |

## References

- [Chapter 10: Foundation Systems](../../chapters/10-foundation-systems/index.md)
- [Concrete slab (Wikipedia)](https://en.wikipedia.org/wiki/Concrete_slab)
- [Capillary action (Wikipedia)](https://en.wikipedia.org/wiki/Capillary_action)
- [Underfloor heating (Wikipedia)](https://en.wikipedia.org/wiki/Underfloor_heating)
