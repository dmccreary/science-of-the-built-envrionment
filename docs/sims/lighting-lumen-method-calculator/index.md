---
title: Lighting Lumen Method Calculator
description: Students will calculate (Bloom Level 3, Apply) the number of luminaires a room requires using the lumen method, and will evaluate (Bloom Level 5, Evaluate) the resulting lighting power density against a target value.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Lighting Lumen Method Calculator



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md).

```text
Type: microsim
**sim-id:** lighting-lumen-method-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the number of luminaires a room requires using the lumen method, and will evaluate (Bloom Level 5, Evaluate) the resulting lighting power density against a target value.

Visual: A plan view of a room with a grid of luminaires. A side panel shows the calculation steps with live numbers: target footcandles, room area, light needed at the work surface, losses, luminaires required, total watts, and lighting power density in watts per square foot. A color overlay shows the estimated illuminance across the room, from dim to bright.

Controls: A slider for room length (10 to 60 ft), a slider for room width (10 to 40 ft), a drop-down for room type (classroom, office, corridor, multipurpose) that sets a default target illuminance, a slider for target footcandles (10 to 80), a slider for luminaire lumens (2,000 to 8,000), a slider for luminaire watts (15 to 80), a slider for coefficient of utilization (0.4 to 0.9), and a slider for light loss factor (0.6 to 1.0). A "Power density limit" slider sets a comparison limit between 0.5 and 1.5 W/ft².

Interactions: Changing any control updates the number of luminaires, the grid layout, the overlay, and the lighting power density. A message states "Within limit" or "Over the limit: choose a more efficient luminaire." Hovering over a step in the calculation panel shows its definition.

Colors: Overlay from dark blue (dim) through yellow to white (bright). Compliance is shown in green or red with a text label.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 500 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createSelect controls, and a simple uniform-illuminance calculation.
```

## Related Resources

- [Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md)
