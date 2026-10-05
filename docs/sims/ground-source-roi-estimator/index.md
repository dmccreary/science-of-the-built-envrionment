---
title: "Ground-Source ROI Estimator"
description: "Students compare the monthly heating and cooling cost of a typical Minnesota home with a standard air intake against the same home with a buried earth-tube intake, then judge the installed cost, simple payback, and 30-year return on investment as the pipe length changes."
image: /sims/ground-source-roi-estimator/ground-source-roi-estimator.png
og:image: /sims/ground-source-roi-estimator/ground-source-roi-estimator.png
twitter:image: /sims/ground-source-roi-estimator/ground-source-roi-estimator.png
social:
   cards: false
status: built
library: Chart.js
bloom_level: Evaluate
---

# Ground-Source ROI Estimator

<iframe src="main.html" width="100%" height="762px" scrolling="no"></iframe>

[Run the Ground-Source ROI Estimator MicroSim Fullscreen](main.html){ .md-button .md-button--primary }

Place the following line in your website to include this MicroSim in your course.

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/ground-source-roi-estimator/main.html" width="100%" height="762px" scrolling="no"></iframe>
```

## Description

Students compare the monthly heating and cooling cost of a typical Minnesota home with a standard air intake against the same home with a buried earth-tube intake, then judge the installed cost, simple payback, and 30-year return on investment as the pipe length changes.

Both homes are the same house: 300 Btu/h of enclosure heat loss per °F, 100 cfm of outdoor air, and a 65°F balance point. The first home draws its outdoor air straight from outside. The second draws it through an 8-inch pipe buried 8 feet deep, which warms the air in winter and cools it in summer before the furnace or air conditioner treats it. The site is assumed to be open, with no access limits for excavating equipment.

## How to Use

1. Read the chart at the starting settings of 200 ft of pipe, \$40 per foot, a \$2,000 fixed cost, and a 95 percent gas furnace. Each month has two bars: the left bar is the home with the standard intake and the right bar is the home with the ground-source intake. Heating months and cooling months use different colors.
2. Hover over a month to read the outdoor temperature, the soil temperature at 8 ft, the temperature of the intake air, and the dollars saved. Press **Show table** to see the same numbers for all twelve months.
3. Find April, May, and September, where the two bars match. A bypass damper skips the pipe in those months because the soil is colder than the outdoor air while the house still needs heat.
4. Drag the pipe length slider from 50 ft to 400 ft and watch the four tiles. The yearly savings rise quickly and then level off, while the installed cost rises by the same amount for every foot.
5. Answer the challenge: type the pipe length that pays back fastest, then press Check. Changing either cost slider or the heating system starts a new challenge.
6. Lower the fixed cost to \$1,000, as when a contractor with a backhoe is already working on the site, and compare the three heating systems. With the gas furnace the 30-year return stays negative at every setting. With electric resistance heat it turns positive when the installed costs are low.

## The Model

- **Outdoor air.** NOAA 1991-2020 monthly normal mean temperatures for Minneapolis-St. Paul International Airport.
- **Soil.** The Appendix E ground temperature model for its Twin Cities-like site (annual mean 45°F, surface swing ±28°F, damping depth 7.9 ft), evaluated at 8 ft on the 15th of each month.
- **Pipe.** Effectiveness = 1 - e^(-L / 103.1), where L is the length in feet. The air leaves the pipe at outdoor + effectiveness x (soil - outdoor).
- **Loads.** Each month is a heating month (mean below 65°F) or a cooling month. The house load is the enclosure loss plus the load of the 100 cfm of intake air, never less than zero.
- **Money.** Installed cost = fixed cost + cost per foot x L, where the fixed cost (\$1,000 to \$3,000) covers the intake, filter, drain, and bypass damper. Simple payback = installed cost / yearly savings. 30-year ROI = (30 x yearly savings - installed cost) / installed cost.

The house, the pipe, the energy prices, and the installed costs are illustrative. The model assumes the soil stays at its undisturbed temperature and leaves out fan energy, maintenance, humidity, interest, and changes in energy prices, so it favors the earth tube. The full set of rules is in the specification in [Appendix E](../../appendices/geothermal-ground-source/index.md).

## Lesson Plan

**Learning objective:** Judge whether a buried earth-tube air intake is a sound investment for a stated Minnesota house, and determine the pipe length that gives the shortest simple payback.

**Suggested activities**

- Predict (5 min): Before touching a slider, students write down whether doubling the pipe from 200 ft to 400 ft will double the yearly savings, then test the prediction.
- Reproduce (10 min): Students open the table and check the January row by hand, using the Appendix E worked example: 36.9°F intake air, a \$187 bill with the standard intake, and \$166 with the ground source.
- Optimize (10 min): Students find the pipe length with the shortest payback at \$20, \$40, and \$80 per foot, and explain why the best length gets shorter as the trench gets more expensive.
- Evaluate (10 min): Students compare the three heating systems and write a recommendation for a homeowner, stating the payback, the 30-year return, and two things the model leaves out.

**Assessment**

- Students calculate the installed cost, simple payback, and 30-year ROI for a system that costs \$5,600 and saves \$82 a year, showing each step.
- Students explain in two or three sentences why the ground source saves nothing in April even though the soil is at a steady temperature.
- Students name one change in prices or site conditions that would improve the return, and one that would make it worse.

## References

- [Appendix E: Geothermal Heating and Earth-Coupled Air](../../appendices/geothermal-ground-source/index.md)
- [Appendix A: Heat Pumps and Building Electrification](../../appendices/heat-pumps-electrification/index.md), the source of the illustrative energy prices
- [NOAA NCEI U.S. Climate Normals, 1991-2020](https://www.ncei.noaa.gov/access/us-climate-normals/), monthly normals for Minneapolis-St. Paul International Airport (station USW00014922)
- [Ground-coupled heat exchanger (Wikipedia)](https://en.wikipedia.org/wiki/Ground-coupled_heat_exchanger)
- [Payback period (Wikipedia)](https://en.wikipedia.org/wiki/Payback_period)

## Related Resources

- [Ground Temperature versus Depth Explorer](../ground-temperature-depth-explorer/index.md)
- [Heating System Energy Comparison](../heating-system-energy-comparison/index.md)
