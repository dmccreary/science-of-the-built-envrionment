---
title: Permit-to-Occupancy Flow
description: Students will sequence (Bloom Level 3, Apply) the steps from permit application through certificate of occupancy and will analyze (Bloom Level 4, Analyze) how a failed review or inspection delays the schedule.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Permit-to-Occupancy Flow



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md).

```text
Type: workflow
**sim-id:** permit-to-occupancy-flow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will sequence (Bloom Level 3, Apply) the steps from permit application through certificate of occupancy and will analyze (Bloom Level 4, Analyze) how a failed review or inspection delays the schedule.

Visual: A left-to-right flowchart with the boxes "Zoning check," "Permit application," "Plan review," "Corrections and resubmittal," "Permit issued," "Inspections during construction," "Special inspections and tests," "Final inspection," and "Certificate of occupancy." Decision diamonds follow plan review ("Comments?") and each inspection ("Pass?"). Return loops show corrections. The canvas width follows the container, the height is 460 px, and the layout redraws on window resize.

Interactions: Hovering over a box shows who acts (designer, building official, contractor, or testing agency) and what is produced. Clicking a box opens an infobox with a two-sentence definition drawn from this chapter. A toggle on each diamond lets the student force a failure and see the loop. A slider labeled "Business days per review" (5 to 25) updates a running total of permit time using the same arithmetic as the Riverbend example. A button labeled "Skip an inspection" shows the consequence of covering work and the cost of uncovering it.

Colors: Designer actions in blue, official actions in green, contractor actions in orange, and testing agency actions in gray. The legend also names each role in text.

Implementation: p5.js with a responsive canvas, hit-testing on boxes, and a small state machine for pass and fail paths.
```

## Related Resources

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
