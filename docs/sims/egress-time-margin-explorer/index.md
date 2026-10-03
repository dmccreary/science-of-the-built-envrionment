---
title: Egress Time Margin Explorer
description: Students will calculate (Bloom Level 3, Apply) the margin between available and required safe egress time and will evaluate (Bloom Level 5, Evaluate) which protective measure most improves the margin in a described scenario.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Egress Time Margin Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md).

```text
Type: microsim
**sim-id:** egress-time-margin-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the margin between available and required safe egress time and will evaluate (Bloom Level 5, Evaluate) which protective measure most improves the margin in a described scenario.

Visual: A horizontal timeline from 0 to 10 minutes. A stacked bar shows the three parts of required safe egress time (detection and alarm, pre-movement, and travel) in three colors. A vertical marker shows the available safe egress time, and the gap between the two ends is labeled with the margin in minutes, shown in green when positive and red when negative. A small floor plan of the Riverbend multipurpose room with two exits sits below the timeline. The canvas fills the container width, has a height of 480 px, and redraws on window resize.

Controls: Sliders set detection and alarm time (0.5 to 4 minutes), pre-movement time (0.5 to 5 minutes), and the available safe egress time (3 to 10 minutes). Checkboxes toggle "Sprinklers installed" (adds to the available time), "Alarm with voice message" (shortens pre-movement), and "One exit blocked" (increases travel time and shows that exit crossed out on the plan). A button labeled "Reset to Riverbend defaults" restores the 1.0, 1.5, 1.0, and 6.0 minute values.

Interactions: Hovering over a segment of the bar shows its definition and a one-sentence example. Clicking a checkbox shows a short explanation of why the change affects the time. A readout states the margin and displays the message "Margin is positive" or "Occupants may be caught by smoke."

Colors: Detection in blue, pre-movement in orange, travel in gray, margin in green or red. Every state also carries a text label.

Implementation: p5.js with a responsive canvas, DOM sliders and checkboxes, and simple arithmetic recalculated on each input change.
```

## Related Resources

- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
