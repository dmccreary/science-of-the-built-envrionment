---
title: Project Team Contracts and Communication Map
description: Students will trace (Bloom Level 4, Analyze) the route taken by a submittal, a request for information, and a change order through the project team, and will explain (Bloom Level 2, Understand) why subcontractors communicate with the design team only through the general contractor.
status: scaffold
library: vis-network
bloom_level: TBD
---

# Project Team Contracts and Communication Map



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
