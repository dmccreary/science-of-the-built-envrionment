---
title: Fire Protection Layers Building Explorer
description: Students explore a two-story cutaway with ten numbered fire protection features, classify each as passive (blue square) or active (orange circle), and match it to one of the five jobs: detect, warn, suppress, control smoke, and contain. They start a fire in room B and switch layers off to see the consequence.
image: /sims/fire-protection-layers-building-explorer/fire-protection-layers-building-explorer.png
og:image: /sims/fire-protection-layers-building-explorer/fire-protection-layers-building-explorer.png
twitter:image: /sims/fire-protection-layers-building-explorer/fire-protection-layers-building-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand
---

# Fire Protection Layers Building Explorer

<iframe src="main.html" width="100%" height="502" scrolling="no"></iframe>

[Run the Fire Protection Layers Building Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/fire-protection-layers-building-explorer/main.html" width="100%" height="502" scrolling="no"></iframe>
```

## Description

Students explore a two-story cutaway with ten numbered fire protection features, classify each as passive (blue square) or active (orange circle), and match it to one of the five jobs: detect, warn, suppress, control smoke, and contain. They start a fire in room B and switch layers off to see the consequence.

## How to Use

1. Click any numbered marker to open its infobox. It names the feature, says whether it is passive (blue square) or active (orange circle), gives the job it performs among detect, warn, suppress, control smoke, and contain, and names the project team member responsible. The matching job chip at the top is outlined.
2. Press Start fire in room B. With all four layers on, watch the detector trigger, the alarm sound, the damper close, the sprinkler open, and the fire shrink. Drag the time slider from 0 to 10 minutes to step through the same events.
3. Untick Sprinklers, Alarm, Smoke control, or Rated walls and start the fire again. The status panel names the consequence, such as the fire reaching room A in 4 minutes when there are no rated walls and no sprinklers.
4. Try two layers off at once to see how one layer's failure is covered or exposed by the others.

## Lesson Plan

**Learning objective:** Classify fire protection features as passive or active and explain which of the five jobs each one performs.

**Suggested activities**

- Warm-up (5 min): Students click all ten markers and complete a table with the columns feature, passive or active, job, and responsible team member.
- Explore (10 min): Students run the fire with one layer off at a time and record the consequence and the minute at which it appears.
- Discuss (10 min): Students explain why no single layer is enough, using the runs with two layers off, and note which layers depend on the alarm signal.

**Assessment**

- Students sort the ten features into passive and active and justify the smoke damper, which Chapter 14 lists with the passive measures even though it moves.
- Students explain in two sentences why a building with sprinklers still needs rated walls and an alarm.

## References

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
- [Passive fire protection (Wikipedia)](https://en.wikipedia.org/wiki/Passive_fire_protection)
- National Fire Protection Association (NFPA), NFPA 13 (sprinkler systems), NFPA 72 (fire alarm systems), and NFPA 92 (smoke control systems).

## Specification

The full specification below is extracted from
[Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md).

```text
Type: infographic
**sim-id:** fire-protection-layers-building-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) fire protection features as passive or active and will explain (Bloom Level 2, Understand) which of the five jobs (detect, warn, suppress, control smoke, contain) each one performs.

Visual: A cutaway of a two-story building with a stair, a corridor, two compartments separated by rated walls, a sprinkler riser and branch pipes, smoke detectors, horns and strobes, a smoke damper in a duct, and a fire pump room. Each feature is drawn with a numbered marker.

Controls: A button labeled "Start fire in room B" begins an animation of a small fire. Checkboxes labeled "Sprinklers," "Alarm," "Smoke control," and "Rated walls" turn each protection layer on or off. A time slider moves from 0 to 10 minutes.

Interactions: With all layers on, the animation shows the detector triggering, the alarm sounding, the sprinkler at the fire opening, and the smoke damper closing. Turning layers off shows the consequence on the animation (for example, "No rated walls: fire reaches room A in 4 minutes"). Clicking any marker opens an infobox with the feature's job, whether it is passive or active, and the project team member responsible for it.

Colors: Passive features in blue, active features in orange, fire in red, smoke in dark gray. Markers carry text labels as well as color.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createButton, createCheckbox, and createSlider controls.
```

## Related Resources

- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md)
