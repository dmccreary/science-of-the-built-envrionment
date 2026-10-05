---
title: Permit-to-Occupancy Flow
description: Students follow a project from zoning check through permit, plan review, inspections, and final inspection to the certificate of occupancy, force failures at each decision to see the return loops, and watch the permit-time total change with review days.
image: /sims/permit-to-occupancy-flow/permit-to-occupancy-flow.png
og:image: /sims/permit-to-occupancy-flow/permit-to-occupancy-flow.png
twitter:image: /sims/permit-to-occupancy-flow/permit-to-occupancy-flow.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Permit-to-Occupancy Flow

<iframe src="main.html" width="100%" height="545" scrolling="no"></iframe>

[Run the Permit-to-Occupancy Flow MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/permit-to-occupancy-flow/main.html" width="100%" height="545" scrolling="no"></iframe>
```

## Description

Students follow a project from zoning check through permit, plan review, inspections, and final inspection to the certificate of occupancy, force failures at each decision to see the return loops, and watch the permit-time total change with review days.

## How to Use

1. Follow the numbered boxes from 1 (zoning check) to 9 (certificate of occupancy). Box color and border style show who acts: designer, building official, contractor, or testing agency. Hover over a box to see who acts and what is produced.
2. Click a box or diamond to open an infobox with its definition from the chapter. Click again to close it.
3. Move the Business days per review slider. The permit time is the first review, a 5-day resubmittal, and a second review of about two thirds as long, which gives 15 + 5 + 10 = 30 business days for Riverbend.
4. Check Review comments, Fail inspection, Fail special test, or Fail final to force a failure at that diamond. The orange return loop becomes active and the added delay appears under the diagram.
5. Press Skip an inspection to see why covering work early costs more than waiting.

## Lesson Plan

**Learning objective:** Sequence the steps from permit application through certificate of occupancy and analyze how a failed review or inspection delays the schedule.

**Suggested activities**

- Sequence (5 min): Students list the nine steps from memory, then check their order against the flowchart and note which actor owns each step.
- Calculate (10 min): Students set 15 business days per review and reproduce the Riverbend total of 30 days, then try 10 and 25 days and with and without comments, and explain which has the larger effect.
- Analyze (10 min): Students force each failure in turn and record the added delay, then press Skip an inspection and write two sentences comparing the time saved with the time lost.

**Assessment**

- Students compute the permit time for 20 business days per review with comments on a first review, and show the three terms of the sum.
- Students explain in two sentences why the certificate of occupancy cannot be issued before the final inspection passes.

## References

- [Chapter 17: Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md)
- [Certificate of occupancy (Wikipedia)](https://en.wikipedia.org/wiki/Certificate_of_occupancy)
- International Code Council, International Building Code, Chapter 1 (administration, permits, inspections, and certificate of occupancy); verify the adopted edition.

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
