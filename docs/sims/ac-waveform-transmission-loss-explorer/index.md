---
title: AC Waveform and Transmission Loss Explorer
description: Students will describe (Bloom Level 2, Understand) an AC waveform in terms of peak, RMS, frequency, and phase, and will calculate (Bloom Level 3, Apply) how raising transmission voltage reduces line loss.
status: scaffold
library: p5.js
bloom_level: TBD
---

# AC Waveform and Transmission Loss Explorer



<iframe src="main.html" width="100%" height="600"></iframe>

[Run MicroSim in Fullscreen](main.html){ .md-button .md-button--primary }

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
