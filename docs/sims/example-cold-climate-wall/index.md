---
title: "Cold-climate exterior wall"
description: "Students identify the layers of a cold-climate wall, see which job each layer does, and break layers to predict what happens to rain, air, vapor, and heat."
status: built
library: p5.js
bloom_level: Remember, Understand
csi: ["07 46 00 Siding", "07 25 00 Weather Barriers", "07 21 00 Thermal Insulation", "06 16 00 Sheathing", "07 26 00 Vapor Retarders", "09 29 00 Gypsum Board"]
---

# Cold-climate exterior wall

<iframe src="main.html" width="100%" height="732" scrolling="no"></iframe>

[Run the Cold-climate exterior wall MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/example-cold-climate-wall/main.html" width="100%" height="732" scrolling="no"></iframe>
```

## Description

Students identify the layers of a cold-climate wall, see which job each layer does, and break layers to predict what happens to rain, air, vapor, and heat.

## How to Use

1. Read the wall from outside (left) to inside (right). Each numbered label names a layer; the gray line under it says which flows it stops.
2. Click a layer or its label to read what it is, why it is there, and what happens if it fails.
3. Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it instead. Watch where the colored dots now stop or pass.
4. Slide Explode to pull the layers apart. Tick Temperature to draw the temperature through the wall; a layer turns red when it falls below the dew point.
5. Tick Line art for a black-and-white view you can print, and untick Legend to hide the hatch key, which is shown by default.
6. Tick Quiz me to test yourself. A question appears under the drawing, the layer names are hidden, and you click the layer that answers it. Your score builds as you go; press Next question to continue.

## Lesson Plan

**Learning objective:** Identify the layers of a cold-climate wall and the job each does, and predict the consequence of removing or puncturing each layer.

**Suggested activities**

- Predict and test (10 min): before unticking a box, predict which flows will pass, then check.
- Compare (10 min): break the rigid foam and then the stud cavity insulation and compare the heat flow and sheathing temperature.

**Assessment**

- Name the job of each layer and say which layers do more than one.
- Explain in two sentences why a hole in the weather-resistive barrier wets the sheathing.

## MasterFormat Context

Each layer is tied to the specification section a builder would look it up under (CSI MasterFormat; section numbers are from memory and should be checked against the current edition).

| # | Layer | MasterFormat section |
|---|-------|----------------------|
| 1 | Siding | 07 46 00 Siding |
| 3 | WRB | 07 25 00 Weather Barriers |
| 4 | Rigid foam | 07 21 00 Thermal Insulation |
| 5 | Sheathing | 06 16 00 Sheathing |
| 6 | Stud cavity | 07 21 00 Thermal Insulation |
| 7 | Vapor retarder | 07 26 00 Vapor Retarders |
| 8 | Gypsum | 09 29 00 Gypsum Board |

## What Ages in This Sim

Values are illustrative and were last reviewed as of **2026-10**.

**Timeless (physics and principles):**

- Heat, air, water, and vapor each need their own control layer.
- A layer is only as cold as the insulation outside it allows, so continuous insulation keeps the sheathing warm.
- Warm, humid air condenses on any surface below its dew point.

**Check before relying on it:**

| Item | Basis | What to check |
|------|-------|---------------|
| R-values of the foam and batts | Chapter 3 and 11 approximate values | Minimum insulation by climate zone in the adopted energy code |
| The 37 °F dew point | An example room condition of about 70 °F and low winter humidity | Recalculate for the design indoor humidity |
| Which layer is the air barrier | Taped sheathing, as in Chapter 11 | Confirm with the wall system's tested details |

## References

- [Chapter 11: Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md)
- [Building envelope (Wikipedia)](https://en.wikipedia.org/wiki/Building_envelope)
