---
title: "Brick veneer rainscreen wall"
description: "Students trace wind-driven rain and air leakage through four layers of a brick veneer rainscreen wall, then break each layer to predict which one lets water or air reach the sheathing."
status: built
library: p5.js
bloom_level: Understand, Analyze
csi: ["04 20 00 Unit Masonry", "07 25 00 Weather Barriers", "06 16 00 Sheathing"]
---

# Brick veneer rainscreen wall

<iframe src="main.html" width="100%" height="698" scrolling="no"></iframe>

[Run the Brick veneer rainscreen wall MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/brick-veneer-rainscreen-layer-explorer/main.html" width="100%" height="698" scrolling="no"></iframe>
```

## Description

Students trace wind-driven rain and air leakage through four layers of a brick veneer rainscreen wall, then break each layer to predict which one lets water or air reach the sheathing.

## How to Use

1. Read the wall from outside (left) to the framed wall (right). Each numbered label names a layer; the gray line under it says what the layer does.
2. Click a layer or its label to read what it is, why it is there, and what happens if it fails.
3. Leave Rain and Air ticked and watch the dots. Rain is slowed by the brick, so a few drops reach the gap, and the weather barrier stops all of them. Air passes straight through the brick, the gap, and the barrier until it meets the sheathing.
4. Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it instead. Read the status line under the title to see where each flow now ends up.
5. Slide Explode to pull the layers apart, and tick Line art for a black-and-white view you can print.
6. Tick Quiz me to test yourself. A question appears under the drawing, the layer names are hidden, and you click the layer that answers it. Your score builds as you go; press Next question to continue.

## Lesson Plan

**Learning objective:** Identify the four layers of a brick veneer wall with a drained air gap, explain the job each does, and predict what reaches the sheathing when a layer is missing or punctured.

**Suggested activities**

- Predict and test (10 min): for each of the four layers, predict whether removing it lets rain reach the sheathing, lets air reach the sheathing, both, or neither. Then check.
- Compare (10 min): puncture the weather barrier and then the sheathing. Say which hole is a water problem and which is an air problem, and where a real crew would find each one.

**Assessment**

- Explain in two sentences why rain that gets past the brick does not reach the sheathing in this wall.
- Name the layer that stops air in this drawing, and say why the brick and the air gap cannot do that job.

## MasterFormat Context

Each layer is tied to the specification section a builder would look it up under (CSI MasterFormat; section numbers are from memory and should be checked against the current edition).

| # | Layer | MasterFormat section |
|---|-------|----------------------|
| 1 | Brick veneer | 04 20 00 Unit Masonry |
| 3 | Weather barrier | 07 25 00 Weather Barriers |
| 4 | Sheathing | 06 16 00 Sheathing |

## What Ages in This Sim

Values are illustrative and were last reviewed as of **2026-10**.

**Timeless (physics and principles):**

- Brick absorbs and passes some rain; the water barrier behind it, not the brick, is the water control layer.
- Air moves wherever there is an opening and a pressure difference, so the air control layer must be continuous.

**Check before relying on it:**

| Item | Basis | What to check |
|------|-------|---------------|
| Cavity depth (1 in) and brick thickness (3 5/8 in) | Chapters 8 and 12 | Check the masonry design guide and code edition in force |
| The weather barrier counted as water-only | Chapter 11 treats taped sheathing as the air control layer | Some barriers are tested as air barriers; confirm with product data |

## References

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Rainscreen (Wikipedia)](https://en.wikipedia.org/wiki/Rainscreen)
- [Building envelope (Wikipedia)](https://en.wikipedia.org/wiki/Building_envelope)
