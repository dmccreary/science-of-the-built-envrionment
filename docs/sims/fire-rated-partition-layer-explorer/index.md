---
title: "Fire-Rated Partition Explorer"
description: "Students read a one-hour fire-rated partition layer by layer, see which layers stop flame, slow heat, and damp sound, and remove layers to predict what fails first."
image: /sims/fire-rated-partition-layer-explorer/fire-rated-partition-layer-explorer.png
og:image: /sims/fire-rated-partition-layer-explorer/fire-rated-partition-layer-explorer.png
twitter:image: /sims/fire-rated-partition-layer-explorer/fire-rated-partition-layer-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand, Analyze
csi: ["09 21 16 Gypsum Board Assemblies", "09 22 16 Non-Structural Metal Framing"]
---

# Fire-Rated Partition Explorer

<iframe src="main.html" width="100%" height="742" scrolling="no"></iframe>

[Run the Fire-Rated Partition Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/fire-rated-partition-layer-explorer/main.html" width="100%" height="742" scrolling="no"></iframe>
```

## Description

Students read a one-hour fire-rated partition layer by layer, see which layers stop flame, slow heat, and damp sound, and remove layers to predict what fails first.

## How to Use

1. Read the wall from the fire side (left) to the far side (right). Each numbered label names a layer; the gray line under it says what it stops.
2. Click a layer or its label to read what it is, why it is there, and what happens if it fails.
3. Watch the three kinds of dots. Red dots are flame, orange dots are heat, and gold dots are sound. Flame stops at the first intact board; heat and sound are only slowed, so some always reaches the far side.
4. Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it instead. Read the status line and the layer panel after each change.
5. Slide Explode to pull the layers apart, and tick Line art for a black-and-white view you can print.
6. Tick Quiz me to test yourself. A question appears under the drawing, the layer names are hidden, and you click the layer that answers it. Your score builds as you go; press Next question to continue.

## Lesson Plan

**Learning objective:** Explain how each layer of a fire-rated partition stops flame, slows heat, or damps sound, and predict which layer's loss weakens the wall most.

**Suggested activities**

- Predict and test (10 min): before you remove anything, write down which layer you think fails first in a real fire and which one the wall can least afford to lose. Then remove the fire-side boards one at a time, then both, and watch where the flame stops.
- Compare (10 min): remove the mineral wool and read its panel. The dots barely change because the boards already stop or slow them; the wool's share is a smaller change in sound level that a dot cannot show. Discuss why a wall can pass a fire test and still sound poor.
- Discuss (10 min): the flame dots are still stopped after you remove one board. Why does the wall still lose its rating?

**Assessment**

- Name the job of each layer, and say which layers help with fire, which with sound, and which with both.
- Explain in two sentences why a rating belongs to the whole assembly and not to the gypsum board alone.
- A plumber cuts a 4 in hole through both boards on one side and leaves it open. Which flows does the hole help, and what must the trade do to restore the wall?

## MasterFormat Context

Each layer is tied to the specification section a builder would look it up under (CSI MasterFormat; section numbers are from memory and should be checked against the current edition).

| # | Layer | MasterFormat section |
|---|-------|----------------------|
| 1 | Fire-side outer | 09 21 16 Gypsum Board Assemblies |
| 2 | Fire-side inner | 09 21 16 Gypsum Board Assemblies |
| 3 | Studs + wool | 09 22 16 Non-Structural Metal Framing |
| 4 | Far-side inner | 09 21 16 Gypsum Board Assemblies |
| 5 | Far-side outer | 09 21 16 Gypsum Board Assemblies |

## What Ages in This Sim

Values are illustrative and were last reviewed as of **2026-10**.

**Timeless (physics and principles):**

- Gypsum board slows heat and flame because it holds chemically bound water that must evaporate first.
- Mass and air-tight layers slow sound; a hole in a rated wall defeats the rating however many layers remain.
- A wall is only as good as its weakest path.

**Check before relying on it:**

| Item | Basis | What to check |
|------|-------|---------------|
| The one-hour label for two layers of board on each side | Illustrative; not a listed design | Confirm against a listed assembly (a testing agency's directory) and the IBC edition in force |
| Board and stud sizes (5/8 in boards, 3 5/8 in steel studs) | Typical sizes, not from Chapter 18 | Use the dimensions in the listed design |
| Fire-resistance rating rules | ASTM E119 as referenced by the model code | Check which code edition the state has adopted |

## References

- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
- [Fire-resistance rating (Wikipedia)](https://en.wikipedia.org/wiki/Fire-resistance_rating)
- [Drywall (Wikipedia)](https://en.wikipedia.org/wiki/Drywall)
- [Sound transmission class (Wikipedia)](https://en.wikipedia.org/wiki/Sound_transmission_class)
