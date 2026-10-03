---
title: Project Team Contracts and Communication Map
description: A network diagram of the project team shows who has a contract with whom (solid lines) and who communicates without a contract (dashed lines) for three delivery methods. Students follow a submittal, an RFI, or a change order as an animated token and read the numbered steps.
image: /sims/project-team-communication-map/project-team-communication-map.png
og:image: /sims/project-team-communication-map/project-team-communication-map.png
twitter:image: /sims/project-team-communication-map/project-team-communication-map.png
social:
   cards: false
status: built
library: vis-network
bloom_level: Analyze, Understand
---

# Project Team Contracts and Communication Map

<iframe src="main.html" width="100%" height="702" scrolling="no"></iframe>

[Run the Project Team Contracts and Communication Map MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/project-team-communication-map/main.html" width="100%" height="702" scrolling="no"></iframe>
```

## Description

A network diagram of the project team shows who has a contract with whom (solid lines) and who communicates without a contract (dashed lines) for three delivery methods. Students follow a submittal, an RFI, or a change order as an animated token and read the numbered steps.

## How to Use

1. Start with Design-bid-build. Solid dark-blue lines are contracts; dashed gray lines are communication paths with no contract. Hover over any line to see which kind it is.
2. Click a participant to read its role and responsibilities, and the contracts it holds.
3. Press Submittal, RFI, or Change order. A token travels the route and the numbered steps in the infobox highlight in turn. Press a button again to replay.
4. Change the Delivery method to Design-build or Construction manager at risk and notice which contract lines move. In design-build, the Architect appears under the General Contractor.

## Lesson Plan

**Learning objective:** Trace the route of a submittal, an RFI, and a change order through the project team and explain why subcontractors communicate with the design team only through the general contractor.

**Suggested activities**

- Predict (5 min): Before pressing a button, students sketch the route they expect for a submittal and compare it with the token path.
- Compare (10 min): Students run all three documents under each delivery method and record which routes change and why.
- Explain (5 min): Students use the contract lines to explain why the architect cannot direct a subcontractor in design-bid-build.

**Assessment**

- Students list, in order, every participant who handles a submittal and say what each does with it.
- Students explain in two sentences why a subcontractor sends an RFI to the general contractor rather than to the architect.

## References

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
- [Design-bid-build (Wikipedia)](https://en.wikipedia.org/wiki/Design%E2%80%93bid%E2%80%93build)
- [Design-build (Wikipedia)](https://en.wikipedia.org/wiki/Design%E2%80%93build)

## Specification

The full specification below is extracted from
[Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md).

```text
Type: graph-model
**sim-id:** project-team-communication-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: Students will trace (Bloom Level 4, Analyze) the route taken by a submittal, a request for information, and a change order through the project team, and will explain (Bloom Level 2, Understand) why subcontractors communicate with the design team only through the general contractor.

Visual: A network with nodes for Owner, Architect, Engineers, General Contractor, Subcontractors, and Building Official. Solid edges show contracts (Owner to Architect, Owner to General Contractor, Architect to Engineers, General Contractor to Subcontractors). Dashed edges show communication that has no contract (Building Official to General Contractor, Architect to Subcontractors). The default view shows design-bid-build. The canvas fills the container width with a height of 480 px and responds to window resize.

Interactions: Clicking a node opens an infobox with the participant's role and responsibilities, drawn from this chapter. Three buttons labeled "Submittal," "RFI," and "Change order" animate a token along the correct path, with a step-by-step caption in the infobox, for example "1. Subcontractor prepares shop drawings. 2. General contractor checks and forwards. 3. Architect and engineer review. 4. Returned to the general contractor, who returns it to the subcontractor." Hovering over an edge shows whether it is a contract or an informal communication path.

Behavior: A dropdown labeled "Delivery method" redraws the contract lines for design-build and construction manager at risk. In design-build, the Architect node moves under the General Contractor node.

Colors: Contract edges are dark blue, and communication edges are gray. Nodes are labeled with text as well as color.

Implementation: vis-network with custom edge styles, a token-animation routine, and an infobox div.
```

## Related Resources

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
