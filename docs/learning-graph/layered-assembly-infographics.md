# Layered Assembly Infographic MicroSims: Test List

These five MicroSims were made with the project skill `skills/layered-assembly-infographic`
(engine version 1.1.0). Three came from the skill's first test round (one per chapter topic);
two are the skill's own worked examples. All are `status: built` (orange dot in the nav).
**Only you set `approved`**, after you have exercised the controls.

Each one is now embedded in its chapter (10, 11, 12, 13, and 18), but none has a screenshot yet, so they do not
appear in the MicroSims grid. The numbers in every sim are illustrative teaching values.

## The sims

| # | MicroSim | Chapter | Stack | Flows | Run it | Lesson page |
|---|----------|---------|-------|-------|--------|-------------|
| 1 | Heated Slab on Grade | 10 Foundation Systems | vertical, 6 layers | ground water, vapor, heat | [Run fullscreen](../sims/heated-slab-on-grade-layers/main.html) | [Lesson](../sims/heated-slab-on-grade-layers/index.md) |
| 2 | Fire-Rated Partition Explorer | 18 Fire and Life Safety | horizontal, 5 layers | flame, heat, sound | [Run fullscreen](../sims/fire-rated-partition-layer-explorer/main.html) | [Lesson](../sims/fire-rated-partition-layer-explorer/index.md) |
| 3 | Brick Veneer Rainscreen Wall | 12 Cladding, Windows, Air Sealing | horizontal, 4 layers | rain, air | [Run fullscreen](../sims/brick-veneer-rainscreen-layer-explorer/main.html) | [Lesson](../sims/brick-veneer-rainscreen-layer-explorer/index.md) |
| 4 | Example: Cold-Climate Exterior Wall | 11 Enclosure and Insulation | horizontal, 8 layers | rain, air, vapor, heat | [Run fullscreen](../sims/example-cold-climate-wall/main.html) | [Lesson](../sims/example-cold-climate-wall/index.md) |
| 5 | Example: Low-Slope Warm Roof | 13 Roof Assemblies | vertical, 5 layers | rain, vapor | [Run fullscreen](../sims/example-low-slope-warm-roof/main.html) | [Lesson](../sims/example-low-slope-warm-roof/index.md) |

Sims 4 and 5 are reference examples for the skill. Sim 4 overlaps the hand-built
`control-layer-wall-section-explorer`. Delete either example folder (and its nav line) if you do
not want it in the book.

## Checklist for every sim

Work through these in each sim, in a wide window (fullscreen landscape) and again at **640 px wide**, which is the minimum test width unless the author says otherwise. 640 px is a realistic column for a sim in an iframe inside the textbook. The book targets students on standard laptops, so phone widths are not a goal in these early phases; below 640 px the layout is best-effort (control rows crowd and labels can overlap), and that is not a bug to report.

- [ ] It loads with no blank canvas, and the browser console shows no errors.
- [ ] Click each numbered label and each layer. The panel under the drawing explains what it is, why it is there, and what happens if it fails.
- [ ] Every layer box is **ticked** when the sim loads. Untick each one with **Remove the layer**, retick it, then repeat with **Punch a hole**. Dots that were stopped should now pass, and the status line should change. **Reset** ticks them all again.
- [ ] Slide **Explode**. Layers separate and the flows still cross the gaps.
- [ ] Untick and retick each flow checkbox.
- [ ] Tick **Temperature** (slab and wall only) and move its slider.
- [ ] Tick **Line art**. The drawing should become black and white and print cleanly.
- [ ] **Legend** is on when the sim loads. The hatch swatches match the layers drawn. Untick it and the legend disappears; **Reset** turns it back on.
- [ ] Switch the unit selector to **SI**. Thickness, R-value, and temperature should change units.
- [ ] Press **Reset**. Everything returns to the starting state.
- [ ] No callout text overlaps another, runs off the canvas, or is crossed by a leader line.

## What to try in each sim

### 1. Heated Slab on Grade

Side A is the heated room, side B is the ground. Layers run top to bottom: slab, rigid foam,
vapor retarder, sand cushion, compacted gravel, subgrade soil.

- **Intact:** ground water should read as stopped at the gravel, vapor as stopped at the retarder, and heat as slowed at the foam.
- **Untick the vapor retarder:** some vapor should now get through, slowed by the foam.
- **Untick the foam:** heat should reach the ground.
- **Untick the gravel alone:** water should still be stopped, now at the retarder. Untick gravel and retarder together and water should reach the slab.
- **Temperature on:** the profile should run from the warm room (80 °F start) down to 40 °F ground, with most of the drop across the foam. The slider caption should name "Heated room" and "ground".

Please confirm with the chapter:

1. The retarder is drawn **under** the foam. Many details put it directly under the slab, above the foam. Which order should the book teach?
2. Chapter 10's slab list does not mention foam, a sand cushion, or in-slab tubing, so the chapter text needs a sentence or two to match.
3. Assumed values: sand R-0.2, gravel R-0.4, soil R-1, surface films 0, ground at 40 °F.

### 2. Fire-Rated Partition Explorer

Side A is the fire side, side B the far side. Layers: two boards, a steel-stud cavity with
mineral wool, then two boards. No temperature profile on purpose, because a steady-state
profile would mislead for a fire.

- **Intact:** flame should be stopped at the first board.
- **Remove boards one at a time:** the stop point should move inward. Remove all four and flame should reach the far side.
- **Remove the mineral wool:** heat and sound should now get through more than before. (The engine was changed after the first test round so slowing layers add up. Please check that this is now visible.)
- **Punch a hole in a board:** flame should pass only through the hole.

Please confirm:

1. **The "one-hour" label.** Two layers of Type X board on each side is described by the test agents as usually heavier than a one-hour design (one layer per side is the common one-hour build). Should the sim show the one-layer wall, or be relabeled?
2. The 5/8 in boards, 3 5/8 in studs, and noncombustible wool are illustrative. Chapter 18 gives no layer list for this partition.
3. The dots show which layers stop which flows, not a rating or a time.

### 3. Brick Veneer Rainscreen Wall

Side A is outside, side B the framed wall. Layers: brick veneer, air gap, weather barrier,
taped sheathing.

- **Intact:** rain should be slowed at the brick and stopped at the weather barrier. Air should be stopped at the sheathing.
- **Remove the weather barrier:** rain should reach the sheathing (slowed at the brick first).
- **Remove or puncture the sheathing:** air should now reach the framed wall.
- **Remove the air gap:** only the text changes. The engine cannot draw drainage.

Please confirm:

1. **Overlap.** Chapter 12 already has `cladding-rainscreen-water-path-explorer` (and chapter 11 has `control-layer-wall-section-explorer`). Keep this as a second sim, or add air leakage to the existing one?
2. **Title.** The chapter calls brick veneer a "drained cavity" and keeps "rainscreen" for the vented, pressure-equalized wall. This sim does not model pressure equalization.
3. The weather barrier is credited with stopping water only. Some real barriers are also air barriers.

### 4. Example: Cold-Climate Exterior Wall

Eight layers from siding to gypsum, with the temperature profile and a 37 °F dew point.

- **Untick the rigid foam with Temperature on:** the sheathing outline should turn red if its temperature falls below the dew point. Try outdoor temperatures from -20 °F to 40 °F.
- **Punch a hole in the weather-resistive barrier:** rain should reach the sheathing only through the hole.
- **Remove the vapor retarder:** vapor from the inside should pass further into the wall.
- Compare with the hand-built `control-layer-wall-section-explorer` and decide whether the engine version could replace it.

### 5. Example: Low-Slope Warm Roof

Vertical stack from the sky down to the room: ballast, membrane, insulation, vapor retarder, steel deck.

- **Puncture the membrane:** rain should pass only through the hole.
- **Remove the vapor retarder:** vapor from the room should rise into the insulation.
- Check the label column on the right: names and the "stops: ..." lines should not overlap.

## Known limits of the engine

- Drainage and time cannot be drawn. A layer that works by draining (a rainscreen gap) or by time (a fire rating) shows its effect in the text only.
- The temperature profile is steady-state, one-dimensional, and ignores thermal bridging and moisture.
- The dots are schematic. They show which layers stop or slow a flow, not rates.
- Up to 12 layers and 5 flows per sim.
- Designed for laptop screens and iframe columns of 640 px and up. Narrower screens still draw, but the controls crowd.

## Where the files are

Each sim is a folder under `docs/sims/<sim-id>/` with `main.html`, `<sim-id>.js` (the layer
data), `layered-assembly-engine.js` (a copy of the shared engine), `index.md`, and
`metadata.json`. Edit the layer data in `<sim-id>.js` to change content. To change drawing or
behavior, edit the engine in `skills/layered-assembly-infographic/assets/` and run
`python skills/layered-assembly-infographic/scripts/assembly_tool.py sync --apply` so every sim
gets the fix.

## Results log

Record your findings here as you test.

| MicroSim | Date tested | Works? | Notes / changes wanted |
|----------|-------------|--------|------------------------|
| Heated Slab on Grade | | | |
| Fire-Rated Partition Explorer | | | |
| Brick Veneer Rainscreen Wall | | | |
| Example: Cold-Climate Exterior Wall | | | |
| Example: Low-Slope Warm Roof | | | |
