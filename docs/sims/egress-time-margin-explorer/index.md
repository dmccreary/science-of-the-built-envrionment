---
title: "Egress Time Margin Explorer"
description: "Students calculate the margin between available and required safe egress time for the Riverbend multipurpose room, then add sprinklers, a voice alarm, or a blocked exit to judge which protective measure improves the margin most."
image: /sims/egress-time-margin-explorer/egress-time-margin-explorer.png
og:image: /sims/egress-time-margin-explorer/egress-time-margin-explorer.png
twitter:image: /sims/egress-time-margin-explorer/egress-time-margin-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Evaluate
---

# Egress Time Margin Explorer

<iframe src="main.html" width="100%" height="579" scrolling="no"></iframe>

[Run the Egress Time Margin Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/egress-time-margin-explorer/main.html" width="100%" height="579" scrolling="no"></iframe>
```

## Description

Students calculate the margin between available and required safe egress time for the Riverbend multipurpose room, then add sprinklers, a voice alarm, or a blocked exit to judge which protective measure improves the margin most.

## How to Use

1. Start at the Riverbend defaults: detection and alarm 1.0 minute, pre-movement 1.5 minutes, travel 1.0 minute, and an available safe egress time (ASET) of 6.0 minutes. The stacked bar is the required safe egress time (RSET), the sum of the three parts, and the black marker is ASET.
2. Read the margin under the bar, ASET minus RSET: 6.0 − 3.5 = +2.5 minutes. Hover over a bar segment, the marker, or the margin for its definition and an example.
3. Move the three sliders to change the detection, pre-movement, and available times. Check Sprinklers installed, Alarm with voice message, or One exit blocked to see the effect on the bar, the floor plan, and the margin. The text under the plan explains why each measure matters.
4. Compare the margin gained from each measure in the line below the plan, and press Reset to Riverbend defaults to start over. The effects of the three measures are illustrative values chosen for the lesson.

## Lesson Plan

**Learning objective:** Calculate the margin between available and required safe egress time and evaluate which protective measure most improves the margin in a described scenario.

**Suggested activities**

- Calculate (5 min): At the defaults, students write RSET and the margin by hand, then check them against the readout. They repeat with one exit blocked and confirm the margin falls from 2.5 to 1.5 minutes.
- Explore (10 min): Students turn each measure on in turn and record the gain in margin, then explain in a sentence why sprinklers change ASET while a voice message changes RSET.
- Evaluate (10 min): Given a scenario with a 4.0 minute ASET and a 2.5 minute pre-movement time, students choose the measure or combination that restores a positive margin and justify the choice.

**Assessment**

- Students find the largest pre-movement time that still leaves a positive margin at the Riverbend defaults, and show the arithmetic.
- Students explain in two sentences why a building with sprinklers still needs more than one exit.

## References

- [Chapter 18: Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md)
- [Fire protection (Wikipedia)](https://en.wikipedia.org/wiki/Fire_protection)
- Society of Fire Protection Engineers, SFPE Handbook of Fire Protection Engineering (egress timeline and the ASET and RSET concepts).

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
