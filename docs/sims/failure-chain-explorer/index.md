---
title: Failure Chain Explorer
description: Students will analyze (Bloom Level 4, Analyze) the chain of causes that leads from a design or construction error to a visible building failure and will propose (Bloom Level 6, Create) an intervention that would break the chain.
status: scaffold
library: vis-network
bloom_level: TBD
---

# Failure Chain Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md).

```text
Type: graph-model
**sim-id:** failure-chain-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) the chain of causes that leads from a design or construction error to a visible building failure and will propose (Bloom Level 6, Create) an intervention that would break the chain.

Visual: A left-to-right directed graph. The first column holds root causes (omitted flashing, clogged drain, wet lumber, settlement). The second column holds mechanisms (water enters the wall, water ponds on the roof, moisture content rises, foundation moves). The third column holds damage processes (decay, mold, freeze-thaw, cracking). The last column holds visible symptoms (stain, peeling paint, sagging, leak). Edges show how each stage leads to the next. The canvas fills the container width, has a height of 520 px, and responds to window resize.

Interactions: Clicking any node highlights its upstream causes and downstream consequences and opens an infobox with a definition drawn from this chapter. Hovering over an edge shows the reason for the link. A dropdown labeled "Scenario" loads the Riverbend flashing example, a roof-drain example, and a settlement example. A button labeled "Break the chain" lets the student click any node to remove it, after which the graph shows which symptoms disappear and which remain.

Colors: Root causes in blue, mechanisms in orange, damage processes in red, and symptoms in gray. Every node is labeled with text, and removed nodes are shown with a dashed outline.

Implementation: vis-network with a hierarchical left-to-right layout, click and hover handlers, and an infobox div.
```

## Related Resources

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
