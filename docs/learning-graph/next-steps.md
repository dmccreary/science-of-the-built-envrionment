# Next Steps

This page is the working list of improvements we plan to explore for
*The Science of the Built Environment*. We take them one at a time, and each
item gets a status so we can see what is decided, what is built, and what is
still an idea.

The ideas come from a review of Francis D.K. Ching's *Building Construction
Illustrated* (see [References](../references.md)). Ching's page design is a
strong model for teaching how assemblies go together. His pages are static and
black-and-white, and they show the object but not the invisible flows
(heat, air, moisture, current, load) that explain why the assembly works.
Our job is to keep his clarity and add the explanation.

## Strategy: build tools, not one-off sims

The same teaching patterns will recur in every trade book we write:
electrical, HVAC, plumbing, framing, finishes, and others. So we do not build
a single MicroSim and then copy it. For each pattern we build a **project
skill** that carries four things:

1. **A data format** that describes one instance (one wall, one panel, one drain run).
2. **A shared engine** that draws and animates any instance of the pattern.
3. **Conventions** (hatches, colors, label style) so every diagram reads the same way.
4. **A validator** that catches mistakes before a student sees them.

These skills live in the repo's `skills/` folder and are only for
this book and its sister trade books. They are not general-purpose
intelligent-textbook skills, so they do not belong in the global skills folder.

### Core design rules

- **Line art is the object; color is the invisible flow.** Base drawings stay black-and-white line work with a fixed hatch legend. Color appears only for flows (heat, air, water, vapor, current).
- **Every label has two levels:** *what it is* (a short noun phrase) and *why it is there* (the physics or code reason). Ching gives the first; the second is our contribution.
- **One idea per diagram,** with a stable section ID so a sim, a poster, a quiz item, and a glossary term can all point to it.
- **Predict, then test.** Each interactive asks the learner to commit to a prediction before showing the result.
- **Self-contained sims.** Each sim folder holds its own copy of the engine, stamped with a version, so it still runs when pasted into the p5.js editor. A sync command refreshes the copies.

## Idea list

| # | Idea | Status | Depends on |
|---|------|--------|------------|
| 1 | Layered-assembly infographic skill (callouts, layer toggles, flows) | **In progress**: skill drafted at `skills/layered-assembly-infographic` | 6, 7 (built in) |
| 2 | Draw the flow, not just the object (color rule) | Built into idea 1 as a design rule | 1 |
| 3 | Clickable exploded building as the table of contents | Idea | 1, 6 |
| 4 | Turn tables and charts into controls (span chart, exposure sliders, soil sort) | Idea | none |
| 5 | CSI MasterFormat tags on concepts, glossary, and sims | Idea | none |
| 6 | Shared hatch and symbol legend, plus a print-friendly line-art mode | Built into idea 1 (hatch set v1) | none |
| 7 | IP/SI unit toggle in sims | Built into idea 1 | none |
| 8 | Date-stamp code and product content that ages | Idea | 5 |
| 9 | Pull sustainability (operational vs. embodied carbon) into chapters 1-2 | Idea | none |
| 10 | "Read the drawing" quiz items (label the layer, drag the label) | Idea | 1 |
| 11 | A "run" skill for linear systems (electrical, plumbing, HVAC) | Idea | 1, 6 |

## Idea details

### 1. Layered-assembly infographic skill

**What.** A skill that turns a short data file describing a stack of layers
into a finished MicroSim: thickness-proportional layers with hatching, numbered
leader-line callouts with two-level labels, layer toggles, an explode slider,
animated flows that stop at the layers that block them, an optional
temperature profile from R-values, and an IP/SI toggle.

**Why.** Our wall, roof, slab, and cladding chapters each need this diagram.
Writing it once as a skill means each new assembly takes minutes, looks the
same as the others, and stays correct.

**Trades.** Version 1 handles *stack* assemblies (wall, roof, floor, slab). The
data format has a `kind` field so later versions can add other shapes. See
idea 11 for linear systems.

**Open questions.**

- Which assemblies get built first? Candidates: exterior wall (already built by hand), low-slope roof, slab-on-grade, fire-rated partition.
- Do we convert the existing hand-built `control-layer-wall-section-explorer` to the engine, or leave it as is?
- How do we show a *material change along the layer* (for example studs and cavity in the same layer)?

### 2. Draw the flow, not just the object

Heat, air, water, and vapor are invisible, and a static page cannot show them.
The skill draws them as animated dots on a black-and-white base. This is a
design rule in idea 1, not a separate build.

### 3. Clickable exploded building as the table of contents

Our building-systems-cutaway sim could become the chapters page, with each
exploded layer linking to its chapter. It follows the same orientation idea as
the opening drawing of a classic construction text.

### 4. Turn tables and charts into controls

- A structural span-range chart becomes an interactive chart: enter a span and load, see which systems qualify.
- Exposure and dimension tables become sliders.
- Soil classification becomes a sort-the-sample exercise.

### 5. CSI MasterFormat tags

Tag each concept, glossary term, and MicroSim with a MasterFormat division,
and add a filter on the MicroSims page. This links our physics to the way
builders and specifiers look things up. Minnesota code sections could be tagged
the same way. This needs a decision on where the tag lives (learning-graph
columns, sim `metadata.json`, or both).

### 6. Shared hatch and symbol legend

One convention for earth, concrete, masonry, wood, insulation (batt and rigid),
membrane, air space, gypsum, metal, and glass, used in every sim and poster.
Version 1 of the hatch set ships inside the idea 1 engine. Later we may
publish it as its own legend page. Includes a line-art-only mode for printing
and accessibility.

### 7. IP/SI unit toggle

North American trade practice uses inch-pound units; most of the world and the
science literature use SI. The idea 1 engine includes the toggle. Later,
non-sim pages could follow the convention of showing both units.

### 8. Date-stamp what ages

Separate timeless principles (heat flow, load paths) from content that
changes (code editions, product names, energy-use statistics). Tag the second
kind with an edition year so readers and future editors can see what to check.

### 9. Sustainability earlier

Add a short operational-versus-embodied carbon thread to chapters 1-2, ahead
of the dedicated sustainability chapters. Use current, cited data.

### 10. "Read the drawing" quiz items

Quiz questions that use an assembly drawing: identify the layer, say what it
controls, or drag a label to the right part. Builds on the layer data from
idea 1 (the same data file can generate the questions).

### 11. A "run" skill for linear systems

Electrical distribution, plumbing drain-waste-vent, and HVAC duct runs are
not stacks; they are chains of components along a path. The same four-part
pattern applies:

- **Electrical:** stages (service, meter, main, panel, breaker, circuit, device). Flows: current and fault current. "Break a stage" (remove the ground, oversize the breaker) and see what happens.
- **Plumbing:** drain, trap, vent, stack. Flows: water, sewer gas, air. Break the vent and watch the trap siphon.
- **HVAC:** supply, return, filter, coil, duct. Flows: air and heat. Restrict the duct and watch the pressure.

This would be a second skill (for example `run-system-infographic`) that
shares the legend, callout style, and unit toggle with idea 1. We should
build it after idea 1 has been used on several assemblies, so we know what
actually generalizes.

## How we work through this list

1. Pick one idea.
2. Write down the decision and any open questions answered in the idea's section above.
3. Build it (usually as a skill plus one pilot sim).
4. Update the status in the table above.

## Change log

- 2026-10-04: First version of this page, created from the review of Ching's book. Started idea 1 as a skill.
