---
title: Sustainable Building Materials
description: How life-cycle assessment, embodied carbon, product declarations, and material health are used to compare and select more sustainable building materials.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:01:57
version: 1.10
---

# Sustainable Building Materials

## Summary

How embodied carbon, life-cycle assessment, and material health are used to compare and select sustainable building materials. It builds on the prerequisite concepts from Chapters 1, 2, 7, 8, 14, 19. After completing this chapter, students will be able to define, explain, and apply the 15 concepts listed below.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Sustainable Materials | 18 |
| Life-Cycle Assessment | 7 |
| Embodied Energy | 4 |
| Embodied Carbon | 3 |
| Renewable Materials | 3 |
| Construction Waste | 3 |
| Material Health | 2 |
| Reuse and Salvage | 2 |
| Product Declarations (EPD) | 1 |
| Recycled Content | 1 |
| Mass Timber | 1 |
| Local Materials | 1 |
| Volatile Organic Compounds | 1 |
| Carbon Sequestration | 1 |
| Cement Substitutes (SCMs) | 1 |

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Introduction to the Built Environment and Construction Terminology](../01-intro-terminology/index.md)
- [Chapter 2: The Design and Construction Process](../02-design-construction-process/index.md)
- [Chapter 7: Wood and Steel Framing](../07-wood-steel-framing/index.md)
- [Chapter 8: Concrete and Masonry](../08-concrete-masonry/index.md)
- [Chapter 14: HVAC, Plumbing, and Fire Protection Systems](../14-hvac-plumbing-fire/index.md)
- [Chapter 19: Energy Efficiency and High-Performance Buildings](../19-energy-efficiency/index.md)

---

!!! mascot-welcome "Every Material Has a Backstory"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    The steel beam, the bag of cement, and the can of paint all carry a hidden history of mining, burning, shipping, and chemistry. This chapter teaches you to read that history with real data, so that you can pick materials you can defend with evidence and not with marketing. Let's build it right!

Chapter 19 focused on the energy a building uses every year while it operates. This chapter turns to the other half of the building's footprint: the energy, emissions, and chemistry built into its materials before anyone turns on the lights. As buildings become more efficient, the share of their life-cycle impact that comes from materials grows, which makes the choice of steel, concrete, wood, and finishes an increasingly important design decision.

We again follow the invented **Riverbend Youth Center** from Chapter 2, a one-story, wood-framed Minneapolis building of about 9,000 ft² with a 40 ft multipurpose room spanned by glued-laminated beams. The structural quantities and emission factors used here are illustrative, chosen to be plausible and to make the arithmetic clear. A real project uses product-specific data, and a structural engineer sizes the members.

## Sustainable Materials

**Sustainable materials** are building materials whose environmental, health, and social impacts are comparatively low over their whole life, from extraction to final disposal, while they still perform the job. The key word is *comparatively*. No material is free of impact, so the question is always whether one choice causes less harm than another that does the same work. Chapter 5 described properties such as strength and moisture behavior, and a sustainable material must still meet those performance needs, because a material that fails early wastes everything invested in it.

Designers judge materials against several criteria that the rest of this chapter develops:

- **Embodied impacts:** the energy and carbon used to make and deliver the material.
- **Source:** whether it is renewable, recycled, reused, or local.
- **Health:** the chemicals it contains and emits indoors.
- **Durability and maintenance:** how long it lasts and what it needs to keep working.
- **End of life:** whether it can be reused, recycled, or safely returned to nature.

A useful framing is the *waste hierarchy*, which ranks strategies from best to worst: first *reduce* the amount of material needed, then *reuse* what already exists, then *recycle* material into new products, and only last dispose of what remains. The cheapest and cleanest material is the one that was never needed.

**Worked example: screening three classroom floors.** The Riverbend team considers three finishes for the classrooms and screens each against the criteria above. The table summarizes qualitative findings, and a real project would back each with product data.

| Criterion | Linoleum | Vinyl tile | Polished concrete slab |
|-----------|----------|------------|------------------------|
| Source | Linseed oil, wood flour, cork, rosin: largely renewable | Petroleum-based PVC | The structural slab itself: no added layer |
| Health | Low emissions, but check adhesives | Check for plasticizers and adhesives | No finish chemicals if sealers are low-emitting |
| Durability | Long life when maintained | Long life, easy cleaning | Very long life, but can crack |
| End of life | Biodegradable in principle, rarely reclaimed | Hard to recycle | Stays with the slab |
| Comfort and acoustics | Resilient and quiet | Resilient and quiet | Hard, cold, and noisy |

No option wins on every criterion. Polished concrete avoids an extra material entirely, but the cold, hard surface suits a classroom of children poorly, so the team may choose linoleum and request product declarations for it. The process matters more than the winner: state the criteria, collect evidence, and decide in the open.

!!! mascot-thinking "Boundaries Decide the Answer"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Any claim that one material is greener than another depends on where you draw the boundary around it. A product that looks cleaner at the factory gate may look worse once you add shipping, maintenance, and disposal.

## Life-Cycle Assessment

**Life-cycle assessment** (LCA) is a standardized method for adding up the environmental impacts of a product or building across the stages of its life. Two international standards, ISO 14040 and ISO 14044, define the method in four steps.

1. **Goal and scope:** state the question, the *functional unit* (the measurable service being compared, such as one square meter of wall with a given thermal resistance), and the *system boundary* (which stages are counted).
2. **Inventory:** list every input and output, such as energy, materials, and emissions, for each stage.
3. **Impact assessment:** convert the inventory into impact categories, such as global warming potential, acidification, and ozone depletion.
4. **Interpretation:** check the results, test the assumptions, and draw conclusions.

Building LCA organizes the stages into labeled modules. Modules A1 to A3 cover the *product stage*: raw material extraction, transport to the factory, and manufacturing. A4 and A5 cover transport to the site and construction. B covers the *use stage*, including operational energy, maintenance, and replacement. C covers demolition, waste transport, and disposal, and D reports benefits outside the system, such as reuse or recycling. The boundary may be *cradle to gate* (A1 to A3 only), *cradle to grave* (through C), or *cradle to cradle* (including reuse).

The module labels are easier to understand with numbers. Chapter 19 used an illustrative energy use of 60 kBtu/ft² for Riverbend, which is 540 MMBtu a year. If all of it came from natural gas at about 117 lb of carbon dioxide per MMBtu, the building would emit about 63,000 lb, or 28.7 metric tons of carbon dioxide equivalent (CO₂e), each year. Over a 60-year study period, operation then contributes \( 28.7 \times 60 \approx 1{,}720 \) t. Suppose that the product stage emits 330 t, construction 35 t, and end of life 20 t (all illustrative).

**Worked example: a 60-year ledger.** The total is \( 330 + 35 + 1{,}720 + 20 = 2{,}105 \) t. The product stage is \( 330/2{,}105 \approx 16 \) percent of the total, and operation is about 82 percent. Now suppose the team designs an efficient, electrified building that cuts operation to 40 percent of the original, which is 688 t. The total falls to \( 330 + 35 + 688 + 20 = 1{,}073 \) t, and the product stage now makes up \( 330/1{,}073 \approx 31 \) percent. The materials did not change, but because the building uses less energy, their share doubled. This is why the attention paid to materials rises as buildings get better at energy.

#### Diagram: Life-Cycle Stage and Boundary Explorer


<iframe src="../../sims/lca-stage-boundary-explorer/main.html" width="100%" height="702px" scrolling="no"></iframe>
[Run Life-Cycle Stage and Boundary Explorer Fullscreen](../../sims/lca-stage-boundary-explorer/main.html)

<details markdown="1">
<summary>Life-Cycle Stage and Boundary Explorer</summary>
Type: chart
**sim-id:** lca-stage-boundary-explorer<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will analyze (Bloom Level 4, Analyze) how the choice of system boundary and operating energy changes the share of life-cycle emissions that comes from materials, and will interpret (Bloom Level 2, Understand) what each life-cycle module represents.

Visual: A stacked horizontal bar chart with segments for modules A1-A3 (product), A4-A5 (construction), B (use), and C (end of life), in tonnes of carbon dioxide equivalent. The defaults are 330, 35, 1,720, and 20 for the Riverbend ledger. A second bar shows the efficient, electrified case. A percentage label on each segment shows its share of the total. The chart is responsive with a height of 400 px and redraws on window resize.

Controls: A dropdown labeled "System boundary" with the choices "Cradle to gate (A1-A3)," "Through construction (A1-A5)," and "Cradle to grave (A1-C)." A slider labeled "Operating energy as a share of baseline" from 10 to 100 percent, with a default of 100. A slider labeled "Study period (years)" from 20 to 100, with a default of 60. A button labeled "Apply efficient and electrified case" sets the operating slider to 40 percent.

Interactions: Hovering over a segment shows the module name, the plain-language definition, and the tonnes of emissions. Clicking a segment opens an infobox with one example of what the module includes. A readout states the share from materials, for example "Materials are 31 percent of the cradle-to-grave total."

Colors: Product stage in brown, construction in orange, use in blue, end of life in gray, each also named in the legend text.

Implementation: Chart.js stacked bar chart with DOM controls and recalculation of the totals on each change.
</details>

## Embodied Energy

**Embodied energy** is the total energy consumed to extract, process, manufacture, transport, and install a material or product, usually reported in megajoules per kilogram (MJ/kg). It is a cradle-to-gate number, covering the energy used in the product stage of the life cycle. Because manufacturing a material usually needs process heat, such as melting steel or firing cement, embodied energy is highest for materials that need high temperatures or many processing steps.

Two quantities determine a material's total embodied energy: the energy per unit mass and the amount used. Typical values differ by orders of magnitude. Concrete is about 1 MJ/kg, structural steel about 20 to 30 MJ/kg, and primary aluminum more than 150 MJ/kg, all approximate and varying by source. Concrete's value per kilogram is low, but buildings contain so much of it that its total is large.

**Worked example: slab versus beams.** Assume the Riverbend slab-on-grade is 5 in thick over the 9,000 ft² footprint. Its volume is \( 9{,}000 \times (5/12) = 3{,}750 \) ft³, or about 106 m³, and at 2,400 kg/m³ its mass is about 255,000 kg. At 1 MJ/kg, the slab embodies about 255 GJ. A set of six steel beams of about 4,800 kg total, at 25 MJ/kg, embodies about 120 GJ. The steel has 25 times the energy per kilogram, yet the concrete slab has twice the total because it is 53 times heavier. For comparison, a building using 60 kBtu/ft² each year consumes about 570 GJ a year, so the slab's embodied energy equals about five months of operation. Counting only intensity per kilogram would mislead; the designer must multiply by quantity.

## Embodied Carbon

**Embodied carbon** is the greenhouse gas emitted during the manufacture, transport, and construction of a material or building, measured in kilograms of carbon dioxide equivalent (kg CO₂e). The term "equivalent" converts other greenhouse gases, such as methane, into the amount of carbon dioxide that would warm the climate the same way over a set period. It overlaps with embodied energy but is not the same, because carbon also comes from chemical processes. Cement manufacture, for example, releases carbon dioxide from the limestone itself, regardless of the fuel burned.

Embodied carbon is the counterpart of the operational carbon of Chapter 19, and the LCA modules A1 to A5 are its main sources. It is a *front-loaded* impact: all of it is released before the building opens, while operational emissions are spread over decades and may fall as the electric grid becomes cleaner.

**Worked example: beams for the 40 ft room.** To carry the roof of the multipurpose room, suppose that an engineer sizes either six glued-laminated beams of 8.75 in by 27 in by 40 ft or six steel W21×44 shapes. The glulam volume is \( 6 \times 1.86 \approx 11.1 \) m³, with a mass of about 5,600 kg at 500 kg/m³. The steel mass is \( 6 \times 44 \text{ lb/ft} \times 40 \text{ ft} \approx 10{,}560 \) lb, or about 4,790 kg. Using illustrative factors of 1.2 kg CO₂e per kg of steel and 140 kg CO₂e per m³ of glulam, the product-stage emissions are about \( 4{,}790 \times 1.2 \approx 5{,}750 \) kg for steel and \( 11.1 \times 140 \approx 1{,}560 \) kg for glulam. The glulam beams have about a quarter of the steel's product-stage emissions, even though they weigh more. A real comparison would use product-specific data, include connections and fire protection, and consider the biological carbon in wood, discussed under Carbon Sequestration below.

#### Diagram: Embodied Carbon Beam Comparison


<iframe src="../../sims/embodied-carbon-beam-comparison/main.html" width="100%" height="802px" scrolling="no"></iframe>
[Run Embodied Carbon Beam Comparison Fullscreen](../../sims/embodied-carbon-beam-comparison/main.html)

<details markdown="1">
<summary>Embodied Carbon Beam Comparison</summary>
Type: microsim
**sim-id:** embodied-carbon-beam-comparison<br/>
**Library:** Chart.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the product-stage embodied carbon of alternative structural members from quantity and emission factor and will evaluate (Bloom Level 5, Evaluate) how uncertainty in the emission factor changes the ranking.

Visual: A grouped bar chart comparing steel beams, glued-laminated beams, and reinforced concrete beams for the same span, with bars showing mass in kilograms and embodied carbon in kg CO2e. A table beneath shows the arithmetic: quantity times factor equals emissions. The chart is responsive with a height of 420 px and redraws on window resize.

Controls: A slider for the number of beams (2 to 12, default 6). A slider for span (20 to 60 ft, default 40). Sliders for each material's emission factor with a low-to-high range, defaulting to 1.2 kg CO2e per kg for steel, 140 kg CO2e per m3 for glulam, and 300 kg CO2e per m3 for concrete, all labeled illustrative. A checkbox labeled "Count stored biogenic carbon in wood" subtracts about 9,000 kg CO2 of stored carbon for the default glulam beams. A "Reset" button restores the defaults.

Interactions: Hovering over a bar shows the quantity, factor, and resulting emissions. A banner states which option has the lowest embodied carbon and notes when the ranking changes within the low-to-high uncertainty range, with the sentence "Rankings can flip when factors are uncertain."

Colors: Steel in gray, glulam in tan, concrete in blue, and stored carbon shown as a green negative bar. Each series is also labeled in text.

Implementation: Chart.js grouped bar chart with DOM sliders and live recalculation of quantity times factor.
</details>

## Product Declarations (EPD)

An **environmental product declaration** (EPD) is a standardized, third-party-verified document that reports the life-cycle environmental impacts of a specific product, such as a concrete mix or a gypsum board, in a consistent format. It is based on an LCA, follows rules for the product category called *product category rules*, and states a *declared unit*, such as one cubic meter of concrete or one square meter of board. Its headline number is usually global warming potential, in kg CO₂e per declared unit.

EPDs give designers the data that the emission factors above only approximated. They come in two types: *industry-wide* EPDs that average many producers and *product-specific* EPDs for a single manufacturer's product. Comparisons are valid only between EPDs with the same declared unit and compatible rules, and an EPD reports impacts without judging whether they are good.

!!! mascot-warning "Watch Out: Comparing EPDs With Different Units"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is comparing one product's kg CO₂e per kilogram with another's kg CO₂e per square meter. The numbers measure different things, so convert both to the same functional unit, such as the whole assembly, before you rank them.

## Renewable Materials

**Renewable materials** come from sources that regrow or replenish on a human timescale, such as wood, bamboo, cork, straw, wool, and the plant oils in linoleum. They differ from mineral and fossil-based materials such as steel, aluminum, cement, and plastic, which are extracted from finite deposits. Some rating systems distinguish *rapidly renewable* materials, which regenerate within about ten years, such as bamboo and cork, from slowly renewable ones like timber.

A material is renewable only if the source is managed well. Wood from forests that are harvested faster than they regrow is not renewable in practice, which is why certification programs such as the Forest Stewardship Council verify sustainable forest management. Renewable materials also still need processing, transport, and adhesives, so renewable does not automatically mean low impact.

## Mass Timber

**Mass timber** is a family of large, engineered wood products used as structural panels, beams, and columns. Chapter 7 introduced wood framing, and mass timber extends it to larger and taller buildings by gluing or fastening many pieces into solid members. The main products are:

- **Cross-laminated timber (CLT):** layers of boards glued crosswise into large panels used as floors, walls, and roofs.
- **Glued-laminated timber (glulam):** boards glued parallel into beams and columns, like the Riverbend beams.
- **Nail-laminated and dowel-laminated timber:** boards fastened together with nails or wooden dowels into solid panels.

Recent editions of the International Building Code include construction types that permit tall mass timber buildings, with fire resistance achieved by designing for the charring behavior described in Chapter 18.

Mass timber appeals for sustainability because it is renewable, stores carbon, and can be prefabricated, which reduces waste and construction time. A seven-story office building in Minneapolis, known as T3, brought the technology to the city. Limits include cost, supply, moisture protection during construction, and fire and acoustic detailing, so a team verifies each with the engineer and the building official.

## Carbon Sequestration

**Carbon sequestration** is the capture of carbon dioxide from the atmosphere and its storage for a long time. Trees do this naturally. As a tree grows, it takes in carbon dioxide and builds it into wood, and about half of the dry mass of wood is carbon. When the wood becomes a beam, that carbon stays out of the atmosphere for the life of the building, and the amount is called *biogenic carbon*.

For the six Riverbend glulam beams of the example above, the mass is about 5,600 kg. Assuming 12 percent moisture, the dry mass is about 4,900 kg, which contains about half that in carbon, or 2,450 kg. Multiplying by 44/12, the ratio of the mass of carbon dioxide to carbon, gives the carbon dioxide stored:

\[ 2{,}450 \times \frac{44}{12} \approx 9{,}000 \text{ kg CO}_2 \]

That is more than the 1,560 kg the beams emitted in manufacture, but the storage is real only if the forest is regrown, the beams are durable, and at the end of life the wood is reused or kept out of burning and landfills that would release the carbon. Builders can also sequester carbon in concrete through carbon-curing processes that mineralize injected carbon dioxide. These are newer technologies, so confirm claims with data.

## Recycled Content

**Recycled content** is the share, by weight, of a product made from material that has been recovered from a previous use. The standard distinguishes *post-consumer* content, which comes from products after use, such as scrap steel from demolished buildings, from *pre-consumer* (or post-industrial) content, which is manufacturing scrap diverted from disposal. Structural steel made in electric arc furnaces typically has high recycled content, commonly reported above 90 percent for structural shapes. Aluminum, glass, and gypsum board can also contain recycled material, and fly ash is a recycled industrial byproduct used in concrete.

High recycled content helps because it avoids extracting and processing virgin material, and for steel it also saves the large energy used to make it from ore. The content is not the whole story, however. A product with high recycled content and a long delivery route or poor durability may have more impact than a virgin product with a good EPD, so consider recycled content together with the other criteria.

## Reuse and Salvage

**Reuse and salvage** means keeping building components in use instead of reprocessing them. *Reuse* places an item in the same or a similar role, such as reinstalling a door, while *salvage* recovers an item from a building that is being demolished or renovated so that it can be reused elsewhere, such as reclaimed timber, brick, fixtures, and steel. Reuse sits above recycling in the waste hierarchy because it avoids almost all of the energy of remanufacturing.

Salvaged material needs care. Structural members such as old timber or steel may need grading or testing before they can carry design loads, older materials may contain hazardous substances such as lead paint or asbestos, and supply is hard to schedule. A building designed for later disassembly, with mechanical fasteners instead of adhesives, makes reuse far easier; Chapter 21 returns to this under deconstruction. The table below summarizes the sourcing strategies defined so far.

| Strategy | What it means | Riverbend example | Watch for |
|----------|---------------|-------------------|-----------|
| Renewable material | Regrows on a human timescale | Linoleum floors, wood framing | Unsustainable harvest, adhesives |
| Mass timber | Large engineered wood members | Glulam beams over the 40 ft room | Moisture, fire and acoustic detailing |
| Recycled content | Made from recovered material | Steel reinforcing bars, fly ash | Distance, durability |
| Reuse and salvage | Keep components in use | Reclaimed doors and fixtures | Testing, hazardous substances |

## Cement Substitutes (SCMs)

Cement is the binder in concrete, and its manufacture is the source of most of concrete's embodied carbon. **Cement substitutes**, formally called *supplementary cementitious materials* (SCMs), are materials that replace part of the portland cement in a concrete mix while contributing to its strength and durability. Common examples include fly ash, a byproduct of coal burning, slag cement from iron production, silica fume, and natural pozzolans and calcined clays. Chapter 8 described concrete mixtures, and SCMs are one of the most effective ways to cut a mix's carbon without changing how the concrete is placed.

**Worked example: replacing 30 percent of the cement.** Assume a structural concrete mix has 564 lb of cement per cubic yard, which is about 256 kg, and that each kilogram of cement carries about 0.9 kg CO₂e, so the cement contributes about 230 kg CO₂e per cubic yard. Replacing 30 percent with slag cement, at an illustrative 0.1 kg CO₂e per kilogram, removes \( 0.30 \times 256 \times 0.9 \approx 69 \) kg and adds back \( 0.30 \times 256 \times 0.1 \approx 8 \) kg. The net saving is about 61 kg, or about 27 percent of the cement's emissions. The trade-off in Minnesota is cold weather, because mixes with SCMs may gain strength more slowly in cold conditions, and the contractor and engineer plan curing and protection for winter pours.

## Local Materials

**Local materials** are those extracted and manufactured within a short distance of the project, often defined by a rating system as within a radius of a few hundred miles. The benefits are lower transportation emissions, support for the regional economy, and materials suited to the local climate and trades. In Minnesota, examples include regional lumber, quarried stone such as limestone and granite, and concrete and masonry products, which are heavy and costly to ship.

Local does not always mean low-impact. Transportation is often a small share of a product's embodied carbon compared with manufacturing, so a distant product made with clean energy can outperform a nearby product made with dirty energy. Use the distance as one factor and confirm with an EPD, since the delivery stage is only part of the picture.

## Construction Waste

**Construction waste** is the material discarded during construction, renovation, and demolition, including offcuts of lumber and drywall, packaging, excess concrete, and damaged products. It costs money twice, once to buy the material and once to haul it away, and most of it can be avoided or recovered. Contractors measure it with the *diversion rate*, the share of waste kept out of landfills by reuse or recycling:

\[ \text{diversion rate} = \frac{\text{waste diverted}}{\text{total waste}} \]

If a project produces 60 tons of waste and sends 42 tons to recycling or reuse, its diversion rate is \( 42/60 = 70 \) percent. Rating systems such as LEED reward diversion rates of 50 or 75 percent, depending on the version. The strategies are, in order of effectiveness:

1. **Design to avoid waste,** using standard dimensions and detailing to reduce cutting.
2. **Prefabricate** components in a controlled shop, where offcuts are reused.
3. **Order accurately** to avoid surplus, and store materials so they stay dry.
4. **Separate waste on site** into bins for metal, wood, concrete, and drywall.
5. **Plan the disposal** in a written waste management plan, with a tracking report.

## Material Health

**Material health** concerns the chemicals contained in a building product and their effects on the people who make, install, and occupy it. Ingredients such as formaldehyde, some flame retardants, certain plasticizers, lead, and per- and polyfluoroalkyl substances (PFAS) have raised concerns. Material health is therefore about the *ingredients*, while the emissions that occur indoors are a related but separate matter treated below.

Tools help designers see inside products. A *Health Product Declaration* (HPD) lists a product's ingredients and their known hazards, and programs such as Declare labels and Cradle to Cradle certification evaluate products against lists of chemicals of concern. Occupant exposure depends on the product and the use, so a designer asks the manufacturer for the information and uses it to prefer products with fewer concerns.

## Volatile Organic Compounds

**Volatile organic compounds** (VOCs) are carbon-based chemicals that evaporate easily at room temperature and enter the indoor air, a process called *off-gassing*. Common sources are paints, adhesives, sealants, flooring, and composite wood products that contain formaldehyde. Exposure can cause eye, nose, and throat irritation and headaches, and some VOCs are linked to more serious health effects. In a tight, energy-efficient building, pollutants build up unless ventilation removes them, a point that Chapter 4 raised for moisture and air movement.

The remedies are to pick low-emitting products, to ventilate during and after installation, and to schedule the work so that wet products dry before absorbent materials, such as ceiling tiles and carpet, are installed. Product standards, such as California's CDPH emissions test method, and labels, such as Green Seal and GREENGUARD, indicate low-emitting products. Many sealants and paints now come in low-VOC versions.

!!! mascot-celebration "You Can Read a Material's Backstory"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now compare materials with the waste hierarchy, add up a life-cycle ledger, tell embodied energy from embodied carbon, read an EPD without mixing up its units, and reduce a concrete mix's carbon with cement substitutes. That is how you turn a "green" claim into evidence.

## Key Takeaways

- Sustainable materials are those with comparatively lower impacts over their whole life that still do the job, and the waste hierarchy ranks the strategies: reduce, reuse, recycle, then dispose.
- Life-cycle assessment adds up impacts across modules from product stage through end of life, and the system boundary you choose changes the answer.
- As operating energy falls, materials make up a larger share of a building's life-cycle emissions, so embodied impacts deserve design attention.
- Embodied energy measures energy in megajoules and embodied carbon measures emissions in kg CO₂e, and total impact is intensity times quantity.
- EPDs and Health Product Declarations supply the data, but they must be compared on the same declared unit and rules.
- Renewable materials, mass timber, recycled content, reuse and salvage, and local sourcing each reduce impact in different ways, and none is automatically best.
- Cement substitutes such as slag and fly ash cut the carbon of concrete, and wood stores carbon only if the forest regrows and the building lasts.
- Construction waste is tracked by diversion rate, and material health and VOCs focus on the chemicals that people breathe and touch.

[See Annotated References](./references.md)
