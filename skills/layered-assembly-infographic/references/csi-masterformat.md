# CSI MasterFormat sections used so far

Each layer's `csi` field ties it to the specification section a builder or specifier would look it up under. The book's Chapter 1 already introduces MasterFormat divisions; this table lists the sections used in the sims so authors stay consistent.

**These numbers and titles were written from memory.** MasterFormat was reorganized between its 2004 and 2018 editions, and some section numbers differ between editions. Before the author approves a sim, check each one against the edition the book will cite, and say in the report that this check is still open.

## Format

`"csi": "07 26 00 Vapor Retarders"`: six digits in pairs (division, level 2, level 3), then the section title. The validator checks the pattern, not the title. Omit `csi` for a layer with no spec section, such as an air gap.

## Sections in use

| Section | Title | Used for |
|---------|-------|----------|
| 03 30 00 | Cast-in-Place Concrete | Slab |
| 04 20 00 | Unit Masonry | Brick veneer |
| 05 31 00 | Steel Decking | Roof deck |
| 06 16 00 | Sheathing | OSB or plywood wall sheathing |
| 07 21 00 | Thermal Insulation | Rigid foam, batts |
| 07 22 00 | Roof and Deck Insulation | Roof insulation boards |
| 07 25 00 | Weather Barriers | Weather-resistive barrier, housewrap |
| 07 26 00 | Vapor Retarders | Vapor retarder membranes |
| 07 46 00 | Siding | Fiber-cement and other siding |
| 07 53 00 | Elastomeric Membrane Roofing | Single-ply roof membrane |
| 09 21 16 | Gypsum Board Assemblies | Fire-rated board layers |
| 09 22 16 | Non-Structural Metal Framing | Steel studs |
| 09 29 00 | Gypsum Board | Interior finish board |
| 31 23 00 | Excavation and Fill | Subgrade soil |
| 31 23 23 | Fill | Sand cushion |
| 32 11 23 | Aggregate Base Courses | Compacted gravel base |

## Choosing a section

1. Pick the most specific section that names the product or work (a vapor retarder is 07 26 00, not 07 21 00).
2. When a layer is one product but serves two jobs, tag the job the spec section is written for.
3. Add the new section to this table when you use one, so the next author reuses it.
