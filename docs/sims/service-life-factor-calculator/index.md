---
title: Service Life Factor Calculator
description: Estimate the service life of a building component with the ISO 15686 factor method by multiplying a reference service life by seven factors. A ranked list shows which factor shortens or lengthens the estimate the most, so students can see which decisions move the number.
image: /sims/service-life-factor-calculator/service-life-factor-calculator.png
og:image: /sims/service-life-factor-calculator/service-life-factor-calculator.png
twitter:image: /sims/service-life-factor-calculator/service-life-factor-calculator.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Apply, Analyze
---

# Service Life Factor Calculator

<iframe src="main.html" width="100%" height="712" scrolling="no"></iframe>

[Run the Service Life Factor Calculator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/service-life-factor-calculator/main.html" width="100%" height="712" scrolling="no"></iframe>
```

## Description

Estimate the service life of a building component with the ISO 15686 factor method by multiplying a reference service life by seven factors. A ranked list shows which factor shortens or lengthens the estimate the most, so students can see which decisions move the number.

## How to Use

1. Start with the Riverbend roof membrane: a 25-year reference life and the Chapter 21 factors. Check that the estimate is about 17.8 years and that the written product matches the bars.
2. Drag any of the seven factor sliders from 0.6 to 1.2. A factor of 1.0 is standard conditions, below 1.0 shortens life, and above 1.0 lengthens it. Hover over a slider to read what raises or lowers that factor.
3. Read the ranked list on the right to see which factor is shortening or lengthening the estimate the most, in years.
4. Click Apply good maintenance to set the maintenance factor to 1.1, and compare the years gained.
5. Choose a different component (window, exterior paint, or HVAC rooftop unit) to see how its reference life changes the estimate, and click Reset to restore the defaults.

## Lesson Plan

**Learning objective:** Students calculate the estimated service life of a building component with the factor method and analyze which factor changes the estimate most.

**Suggested activities**

- Reproduce the Chapter 21 roof membrane result by hand and with the simulator, then improve the drainage detail (design level) and installation quality (work quality) to see how much life is recovered.
- Set every factor except one to 1.0 and move that factor from 0.6 to 1.2 for each of the seven factors. Compare the range of estimated life each one produces.
- Choose a component and write a short maintenance plan that justifies its maintenance factor.

**Assessment**

- Explain why every factor has the same percentage effect on the estimate, and why the factor furthest from 1.0 currently matters most.
- Use the result to recommend a replacement fund start date for the roof membrane and state what assumption could change it.

## References

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
- International Organization for Standardization, ISO 15686-1, Buildings and constructed assets: service life planning, General principles (describes the factor method).
- [Service life (Wikipedia: Service life)](https://en.wikipedia.org/wiki/Service_life)

## Specification

The full specification below is extracted from
[Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md).

```text
Type: microsim
**sim-id:** service-life-factor-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the estimated service life of a building component with the factor method and will analyze (Bloom Level 4, Analyze) which factor changes the estimate most.

Visual: A horizontal bar showing the reference service life, followed by a bar showing the estimated service life, with the ratio labeled. Seven factor sliders sit below the bars, each labeled with its name. A ranked list on the right shows which factor is currently reducing or increasing the estimate the most. The canvas fills the container width, has a height of 500 px, and redraws on window resize.

Controls: A dropdown to choose the component (roof membrane, window, exterior paint, HVAC rooftop unit), each with a default reference service life of 25, 30, 8, and 20 years, labeled illustrative. Seven sliders from 0.6 to 1.2 for the seven factors, defaulting to the Riverbend values. A button labeled "Apply good maintenance" sets the maintenance factor to 1.1. A button labeled "Reset" restores the defaults.

Interactions: Hovering over a slider shows a one-sentence explanation of the factor and an example of what raises or lowers it. The estimated life updates immediately. A message states the number of years gained or lost compared with the reference value.

Colors: The reference bar is gray, an estimate above the reference is green, and an estimate below the reference is orange. The numeric values are always shown as text.

Implementation: p5.js with a responsive canvas, DOM sliders and a dropdown, and a product of the seven factors recalculated on each change.
```

## Related Resources

- [Chapter 21: Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md)
