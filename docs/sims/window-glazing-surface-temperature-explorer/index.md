---
title: Window Performance Explorer
description: Students choose glazing, low-E coating, gas fill, and frame for a window and watch the whole-window U-factor, SHGC, visible transmittance, and inside glass temperature respond. A summary line judges whether the window suits a north or a south wall in Minneapolis.
image: /sims/window-glazing-surface-temperature-explorer/window-glazing-surface-temperature-explorer.png
og:image: /sims/window-glazing-surface-temperature-explorer/window-glazing-surface-temperature-explorer.png
twitter:image: /sims/window-glazing-surface-temperature-explorer/window-glazing-surface-temperature-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Analyze, Evaluate
---

# Window Performance Explorer

<iframe src="main.html" width="100%" height="532" scrolling="no"></iframe>

[Run the Window Performance Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/window-glazing-surface-temperature-explorer/main.html" width="100%" height="532" scrolling="no"></iframe>
```

## Description

Students choose glazing, low-E coating, gas fill, and frame for a window and watch the whole-window U-factor, SHGC, visible transmittance, and inside glass temperature respond. A summary line judges whether the window suits a north or a south wall in Minneapolis.

## How to Use

1. Start with the default window: double pane, no coating, air fill, vinyl frame, -10 °F outdoors, 40 percent indoor relative humidity, north wall. The room is held at 70 °F, as in the chapter's worked example.
2. Change one option at a time (glazing, coating, gas, or frame) and watch the three gauges, the temperature profile, and the thermometer update. Hover over a pane, gap, coating, spacer, frame, gauge, or the thermometer to read its role.
3. Slide the outdoor temperature and the indoor relative humidity. The thermometer turns red and a condensation message appears when the inside glass is colder than the dew point of the room air.
4. Switch between North and South and read the recommendation line. Try to find the lowest-cost option that suits each wall.

## Lesson Plan

**Learning objective:** Analyze how glazing, coating, gas fill, and frame change U-factor, SHGC, and inside surface temperature, and judge which window suits a north and a south wall in Minneapolis.

**Suggested activities**

- Warm-up (5 min): Students reproduce the chapter's worked example by setting Window A (double clear, vinyl) and Window B (double low-E surface 3, argon, fiberglass) at -10 °F and 40 percent humidity, and compare the glass temperatures.
- Explore (10 min): Students raise the humidity until each window starts to condense and record the humidity at which the change happens for three different windows.
- Judge (10 min): Students pick one window for a north wall and one for a south wall, justify each using U-factor and SHGC, and compare their picks with a partner.

**Assessment**

- Students explain in two sentences why a low-E coating on surface 3 is a better choice than surface 2 for a south wall in a heating climate.
- Students explain why the real condensation risk is greater than the thermometer shows, using the cold glass edge.

## References

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
- [Low emissivity (Wikipedia)](https://en.wikipedia.org/wiki/Low_emissivity)
- National Fenestration Rating Council (NFRC), whole-window U-factor, SHGC, and visible transmittance ratings (nfrc.org).

## Specification

The full specification below is extracted from
[Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md).

```text
Type: microsim
**sim-id:** window-glazing-surface-temperature-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how glazing type, coating, and gas fill change U-factor, SHGC, and inside surface temperature, and will judge (Bloom Level 5, Evaluate) which window suits a north wall and a south wall in Minneapolis.

Visual: A cross-section of a window showing panes, gaps, coatings, and spacer, with a temperature profile line across the window from the indoor to the outdoor air. Beside it, three gauges show the whole-window U-factor, the SHGC, and the visible transmittance. A thermometer shows the inside glass surface temperature, which turns red when it is below the dew point of the room air. The canvas is responsive, 500 px tall, and redraws on window resize.

Controls: A dropdown for glazing (single, double, triple). A dropdown for coating (none, low-E surface 2, low-E surface 3). A dropdown for gas (air, argon). A dropdown for frame (aluminum, aluminum with thermal break, vinyl, fiberglass). A slider for outdoor temperature (-20 to 50°F) and one for indoor relative humidity (20 to 60 percent). A radio button for orientation (north or south).

Interactions: Hovering over a pane, gap, or coating shows its role. Changing any option updates the gauges, the temperature profile, and the surface temperature immediately. When the inside surface falls below the dew point, a condensation message appears. A summary line recommends whether the choice suits the selected orientation, based on U-factor and SHGC.

Default state: Double pane, no coating, air fill, vinyl frame, -10°F outdoors, 40 percent relative humidity, north orientation.

Implementation: p5.js with built-in selects, sliders, and radio buttons, a lookup table of approximate values, and a responsive canvas.
```

## Related Resources

- [Chapter 12: Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md)
