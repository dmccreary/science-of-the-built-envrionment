---
title: Fire Protection Layers Building Explorer
description: Students will classify (Bloom Level 2, Understand) fire protection features as passive or active and will explain (Bloom Level 2, Understand) which of the five jobs (detect, warn, suppress, control smoke, contain) each one performs.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Fire Protection Layers Building Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
