---
title: Air Sealing and Blower Door Explorer
description: Students will calculate (Bloom Level 3, Apply) ACH50 and estimated natural leakage from a blower door reading, and will evaluate (Bloom Level 5, Evaluate) which leak locations to seal first.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Air Sealing and Blower Door Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
