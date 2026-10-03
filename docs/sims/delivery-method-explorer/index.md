---
title: Delivery Method Explorer
description: Students compare design-bid-build, design-build, construction manager at risk, and integrated project delivery on a timeline of design, bidding, and construction bars and on a diagram of who holds contracts with whom. A quiz mode describes a project and asks which method fits best.
image: /sims/delivery-method-explorer/delivery-method-explorer.png
og:image: /sims/delivery-method-explorer/delivery-method-explorer.png
twitter:image: /sims/delivery-method-explorer/delivery-method-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Evaluate
---

# Delivery Method Explorer

<iframe src="main.html" width="100%" height="552" scrolling="no"></iframe>

[Run the Delivery Method Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/delivery-method-explorer/main.html" width="100%" height="552" scrolling="no"></iframe>
```

## Description

Students compare design-bid-build, design-build, construction manager at risk, and integrated project delivery on a timeline of design, bidding, and construction bars and on a diagram of who holds contracts with whom. A quiz mode describes a project and asks which method fits best.

## How to Use

1. Choose DBB, DB, CMAR, or IPD with the radio buttons. The bars slide to their new overlap and the Contractor box moves to the month it joins. Solid lines are contracts, dashed lines are communication only.
2. Move the Months of design and Months of construction sliders (6 to 14) and read the total schedule at the top. The Riverbend defaults are 10 and 10 months.
3. Click any bar or box for a two-sentence definition. Click it again to close it.
4. Press Pick the method for a short project description. Choose a method with the radio buttons to check your answer. The feedback names the contract relationship that decides it. Press Next scenario for another, or Exit to leave the quiz.

## Lesson Plan

**Learning objective:** Compare the sequence of activities, contract relationships, and schedule length of the four delivery methods, and select the method that best fits a described project.

**Suggested activities**

- Warm-up (5 min): Students predict, for each method, who the owner is under contract with and when the builder joins, then check against the diagram.
- Explore (10 min): Students set design to 10 and construction to 10 months and record the total for each method, then change design to 14 months and describe how the gaps change.
- Evaluate (10 min): Students complete the quiz, then write a short project description of their own and exchange it with a partner, who picks and defends a method.

**Assessment**

- Students fill in a four-row table of owner's contracts, when the builder joins, and price basis from memory, then check it against the chapter.
- Students explain in three sentences why design-build can be faster than design-bid-build but gives the owner less independent oversight.

## References

- [Chapter 2: The Design and Construction Process](../../chapters/02-design-construction-process/index.md)
- [Design-build (Wikipedia)](https://en.wikipedia.org/wiki/Design%E2%80%93build)
- [Integrated project delivery (Wikipedia)](https://en.wikipedia.org/wiki/Integrated_project_delivery)

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
