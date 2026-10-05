---
title: Air Sealing and Blower Door Explorer
description: Students seal the ten leakage points of a Riverbend cutaway one at a time, read CFM50 and ACH50 from a simulated blower door test, and convert the result to natural air changes and design-day heat loss to decide which leaks to seal first.
image: /sims/air-sealing-blower-door-explorer/air-sealing-blower-door-explorer.png
og:image: /sims/air-sealing-blower-door-explorer/air-sealing-blower-door-explorer.png
twitter:image: /sims/air-sealing-blower-door-explorer/air-sealing-blower-door-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Evaluate
---

# Air Sealing and Blower Door Explorer

<iframe src="main.html" width="100%" height="682" scrolling="no"></iframe>

[Run the Air Sealing and Blower Door Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/air-sealing-blower-door-explorer/main.html" width="100%" height="682" scrolling="no"></iframe>
```

## Description

Students seal the ten leakage points of a Riverbend cutaway one at a time, read CFM50 and ACH50 from a simulated blower door test, and convert the result to natural air changes and design-day heat loss to decide which leaks to seal first.

## How to Use

1. Look at the cutaway. Each numbered arrow is a leakage point; a bigger arrow means more air flows through it at 50 pascals. Hover over a point for its name, its share of the leakage, and the typical fix.
2. Click a point to seal it. The CFM50 dial, the ACH50 reading, the natural air changes, and the heat loss all update. A sealed point still leaks 10 percent, and about 600 cfm leaks through the walls and roof where no numbered point applies.
3. Press Run blower door test to watch the fan bring the building to minus 50 pascals and the CFM50 dial settle. Press Seal all to seal every point, and Reset to start over.
4. Change the building volume and the divisor (15 or 20) to see how ACH50 and the natural leakage estimate depend on them. CFM50 does not change with volume, but ACH50 does.
5. The readout turns green when ACH50 reaches the 3.0 goal, and the message tells you how many sealing actions it took compared with the fewest possible.

## Lesson Plan

**Learning objective:** Calculate ACH50 and estimated natural leakage from a blower door reading, and evaluate which leak locations to seal first.

**Suggested activities**

- Calculate (5 min): With the defaults, students compute ACH50 by hand from CFM50 and the volume and check it against the readout, then repeat the natural-leakage estimate at divisors of 15 and 20.
- Prioritize (10 min): Students predict the order in which to seal the leaks to reach 3.0 ACH50 in the fewest actions, then test the prediction and compare with the message.
- Vary (10 min): Students change the volume and explain why the same leaks give a different ACH50, and find the volume at which no sealing is needed.

**Assessment**

- Students reproduce the Chapter 12 example (5,400 cfm at 108,000 ft3 gives 3.0 ACH50) and its natural rate of 0.15 ACH at a divisor of 20.
- Students write a two-sentence recommendation of the first three leaks to seal, with the cfm each removes.

## References

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Blower door (Wikipedia)](https://en.wikipedia.org/wiki/Blower_door)
- [Air changes per hour (Wikipedia)](https://en.wikipedia.org/wiki/Air_changes_per_hour)

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** air-sealing-blower-door-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) ACH50 and estimated natural leakage from a blower door reading, and will evaluate (Bloom Level 5, Evaluate) which leak locations to seal first.

Visual: A cutaway of the Riverbend building with a blower door fan in the entry. Ten numbered leakage points (top plate, rim joist, window gaps, door perimeter, penetrations, recessed lights, electrical boxes, attic hatch, and others) are marked as small arrows whose size shows how much air flows through each. A gauge shows the building pressure at 50 Pa, a dial shows CFM50, and a readout shows ACH50, the natural ACH estimate, and the heat loss from leakage on the design day. The canvas is responsive, 480 px tall, and redraws on window resize.

Controls: Clickable leakage points that can be "sealed" one at a time. A dropdown for the conversion divisor (15, 20). A slider for building volume (50,000 to 200,000 ft³). A "Run blower door test" button and a "Seal all" button. A "Reset" button.

Interactions: Hovering over a leakage point shows its name, its share of the total leakage, and the typical fix. Sealing a point reduces CFM50 and the readouts update. A goal line at 3.0 ACH50 turns the readout green when it is reached, and a message shows how many sealing actions were needed.

Default state: Unsealed building at about 6 ACH50, with the readout in red.

Implementation: p5.js with built-in buttons, select, and slider, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
