---
title: Delivery Method Explorer
description: Students will compare (Bloom Level 4, Analyze) the sequence of activities, contract relationships, and schedule length of design-bid-build, design-build, construction manager at risk, and integrated project delivery, and will select (Bloom Level 5, Evaluate) the method that best fits a described project.
status: scaffold
library: p5.js
bloom_level: TBD
---

# Delivery Method Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

## Specification

The full specification below is extracted from
[Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md).

```text
Type: microsim
**sim-id:** delivery-method-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will compare (Bloom Level 4, Analyze) the sequence of activities, contract relationships, and schedule length of design-bid-build, design-build, construction manager at risk, and integrated project delivery, and will select (Bloom Level 5, Evaluate) the method that best fits a described project.

Visual: The upper half of the canvas shows a horizontal Gantt-style timeline with bars for Design, Bidding, and Construction. The lower half shows boxes for Owner, Architect, Contractor, and Key Subcontractors, joined by lines that represent contracts. The canvas width follows the container, the height is 520 px, and the layout redraws on window resize.

Controls: Four radio buttons select the delivery method. Selecting a method animates the bars to their new overlap, moves the Contractor box to its starting phase, and redraws the contract lines. A slider labeled "Months of design" (6 to 14) and a slider labeled "Months of construction" (6 to 14) change the bar lengths, and a readout shows the total schedule for the selected method, with the Riverbend defaults of 10 and 10 months. Clicking any box or bar opens an infobox with a two-sentence definition.

Quiz mode: A button labeled "Pick the method" presents a short scenario, such as "A hospital owner needs the building open before the winter and wants one firm responsible for everything," and asks the student to select a method. The response is checked immediately, and an explanation names the contract relationship that decides the answer.

Colors: Design bars are blue, bidding bars are gray, and construction bars are orange. Contract lines are solid and communication lines are dashed.

Implementation: p5.js with a responsive canvas, DOM radio buttons and sliders, and a small infobox div.
```

## Related Resources

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
