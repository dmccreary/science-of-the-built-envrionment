---
title: AC Waveform and Transmission Loss Explorer
description: Students read peak, RMS, frequency, and phase from an AC waveform in single-phase and three-phase modes, then raise the transmission voltage to see line loss I squared R fall.
image: /sims/ac-waveform-transmission-loss-explorer/ac-waveform-transmission-loss-explorer.png
og:image: /sims/ac-waveform-transmission-loss-explorer/ac-waveform-transmission-loss-explorer.png
twitter:image: /sims/ac-waveform-transmission-loss-explorer/ac-waveform-transmission-loss-explorer.png
social:
   cards: false
status: built
library: p5.js
bloom_level: Understand, Apply
---

# AC Waveform and Transmission Loss Explorer

<iframe src="main.html" width="100%" height="602" scrolling="no"></iframe>

[Run the AC Waveform and Transmission Loss Explorer MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ac-waveform-transmission-loss-explorer/main.html" width="100%" height="602" scrolling="no"></iframe>
```

## Description

Students read peak, RMS, frequency, and phase from an AC waveform in single-phase and three-phase modes, then raise the transmission voltage to see line loss I squared R fall.

## How to Use

1. In Single-phase mode, change the RMS voltage and the frequency. The dashed lines mark the peak (RMS x 1.414) and the RMS value; hover over the wave to read the instantaneous voltage and time.
2. Switch to Three-phase mode to see three waves offset by one third of a cycle, drawn solid black, dashed red, and dotted blue. Check Show line-to-line to see the difference between phases A and B and its RMS value: 208 V for a 120 V line-to-neutral system.
3. In the lower panel, keep the load at 100 kW and the line resistance at 1 ohm, then raise the line voltage from 1,000 V to 10,000 V. The current falls tenfold and the loss falls a hundredfold. The line voltage slider is logarithmic so 10,000 V sits at the middle. The line voltage is the voltage at the load; the source label shows the higher voltage the source must supply to overcome the drop in the line.
4. Change the load power and line resistance to see when a line loses a large share of the power it delivers.

## Lesson Plan

**Learning objective:** Describe an AC waveform in terms of peak, RMS, frequency, and phase, and calculate how raising the transmission voltage reduces line loss.

**Suggested activities**

- Measure (5 min): At 120 V RMS and 60 Hz, students read the peak voltage and the period from the plot and check them against 120 x 1.414 and 1/60 second.
- Explore three-phase (10 min): Students turn on line-to-line and find the RMS voltage for 120, 277, and 240 V line-to-neutral settings, and explain the factor of 1.732.
- Calculate (10 min): Students reproduce the Chapter 15 example (100 kW, 1 ohm, 1,000 V and 10,000 V) and then find the voltage at which the loss drops below 1 percent.

**Assessment**

- Students predict the loss percentage for 100 kW over a 2 ohm line at 5,000 V, then check it in the simulation.
- Students explain in two sentences why doubling the current quadruples the heat made in a wire.

## References

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
- [Root mean square (Wikipedia)](https://en.wikipedia.org/wiki/Root_mean_square)
- [Three-phase electric power (Wikipedia)](https://en.wikipedia.org/wiki/Three-phase_electric_power)

## Specification

The full specification below is extracted from
[Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md).

```text
Type: microsim
**sim-id:** ac-waveform-transmission-loss-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will describe (Bloom Level 2, Understand) an AC waveform in terms of peak, RMS, frequency, and phase, and will calculate (Bloom Level 3, Apply) how raising transmission voltage reduces line loss.

Visual: The upper panel plots voltage against time for one to four cycles. Single-phase mode shows one sine wave. Three-phase mode shows three waves in three colors offset by one third of a cycle. Peak and RMS values are marked with dashed lines. The lower panel shows a transmission line, with a source on the left and a load on the right, and a bar graph comparing power delivered and power lost in the line.

Controls: A toggle for single-phase or three-phase, a slider for RMS voltage (120 to 480 V), a slider for frequency (50 to 60 Hz) with 60 Hz as the default, a slider for transmission voltage (1,000 to 100,000 V), a slider for load power (10 to 1,000 kW), and a slider for line resistance (0.1 to 5 ohms).

Interactions: Changing the voltage updates the peak and RMS lines on the waveform. Hovering over any point on a wave shows the instantaneous voltage and time. Changing the transmission voltage updates the current, the loss, and the percent of power lost in the line. A note reads "Ten times the voltage, one hundredth of the loss" when the voltage is raised tenfold. In three-phase mode, a "Show line-to-line" checkbox displays the difference between two phases and the readout 208 V for a 120 V line-to-neutral system.

Colors: Phase A in black, phase B in red, phase C in blue, with different dash patterns so that the waves are distinguishable without color. Power lost is drawn in orange and power delivered in green.

Responsive design: The canvas follows the container width and redraws on window resize. Height is 520 px on wide screens.

Implementation: p5.js with updateCanvasSize() as the first statement in setup(), built-in createSlider and createRadio controls.
```

## Related Resources

- [Chapter 15: Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md)
