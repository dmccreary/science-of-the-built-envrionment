---
title: "Failure Chain Explorer"
description: "Trace how a design, construction, or maintenance error becomes a visible building failure through a chain of mechanisms and damage processes. Remove a link with Break the chain to see which symptoms disappear and which remain."
image: /sims/failure-chain-explorer/failure-chain-explorer.png
og:image: /sims/failure-chain-explorer/failure-chain-explorer.png
twitter:image: /sims/failure-chain-explorer/failure-chain-explorer.png
social:
   cards: false
status: built
library: vis-network
bloom_level: Analyze, Create
---

# Failure Chain Explorer

<iframe src="main.html" width="100%" height="722" scrolling="no"></iframe>

[Run the Failure Chain Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/failure-chain-explorer/main.html" width="100%" height="722" scrolling="no"></iframe>
```

## Description

Trace how a design, construction, or maintenance error becomes a visible building failure through a chain of mechanisms and damage processes. Remove a link with Break the chain to see which symptoms disappear and which remain.

## How to Use

1. Pick a Scenario: Riverbend flashing, Roof drain, Settlement, or All four chains. Blue nodes are root causes, orange are mechanisms, red are damage processes, and gray are visible symptoms.
2. Click any node to highlight its upstream causes and downstream consequences. The infobox gives a definition from Chapter 21 and one way to break the chain at that node.
3. Hover over a link to read the reason one stage leads to the next.
4. Press Break the chain, then click a node to remove it (dashed outline). The message under the graph lists the symptoms that disappear and the ones that remain, and which path still reaches them.
5. In All four chains, try removing Water enters wall and notice that Stain and Peeling paint remain through Wet lumber. Press Reset to start over.

## Lesson Plan

**Learning objective:** Students analyze the chain of causes from a design or construction error to a visible failure, and propose an intervention that would break the chain.

**Suggested activities**

- Follow the Riverbend flashing chain from the drawing to the ceiling stain and name, for each link, a person on the project team who could have broken it.
- In All four chains, find a single node whose removal stops the most symptoms, and a node whose removal leaves symptoms behind. Explain the difference.
- Choose a symptom and propose an intervention at three different stages (design, construction, maintenance), comparing cost and timing.

**Assessment**

- Explain why treating the stain, not the source, does not stop the failure, using the graph.
- Write a two-sentence recommendation for an owner on the cheapest link to break in the roof-drain chain and why.

## References

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
- [Water damage (Wikipedia)](https://en.wikipedia.org/wiki/Water_damage)
- [Dry rot (Wikipedia: Wood rot)](https://en.wikipedia.org/wiki/Wood_rot)

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
