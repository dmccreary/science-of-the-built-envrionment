---
title: Introduction to the Built Environment and Construction Terminology
description: How buildings, materials, and systems are defined and described, including the drawings, specifications, and vocabulary of the construction industry.
generated_by: claude skill chapter-content-generator
date: 2026-10-02 14:00:00
version: 1.10
---

# Introduction to the Built Environment and Construction Terminology

## Summary

How buildings, materials, and systems are defined and described, including the drawings, specifications, and vocabulary of the construction industry. It has no prerequisites within the book and starts the learning progression. After completing this chapter, students will be able to define, explain, and apply the 22 concepts listed below.

## Concepts Covered

This chapter covers the following 22 concepts from the learning graph:

| Concept | Concept Impact Score |
|---------|-----------------------|
| Built Environment | 1087 |
| Building | 775 |
| Building Materials | 313 |
| Construction Industry | 272 |
| Building Systems | 98 |
| Construction Terminology | 56 |
| Units of Measurement | 33 |
| Scale and Dimensions | 32 |
| Construction Drawings | 31 |
| Specifications | 23 |
| Building Types | 13 |
| Plans | 4 |
| Residential Construction | 2 |
| Commercial Construction | 1 |
| Industrial Construction | 1 |
| Institutional Construction | 1 |
| Elevations | 1 |
| Sections | 1 |
| Details | 1 |
| Schedules | 1 |
| Symbols and Abbreviations | 1 |
| Building Science | 1 |

## Prerequisites

This chapter assumes only the prerequisites listed in the [course description](../../course-description.md).

---

!!! mascot-welcome "Meet Beau, Your Building Guide"
    ![Beau waving welcome](../../img/mascot/welcome.png){ class="mascot-admonition-img" }
    Hi, I'm Beau the Beaver, and I like things that are built to last. Here is what I do in this book:

    1. **Welcome** you at the start of each chapter and tell you why it matters.
    2. **Think** out loud when an idea changes how you should look at a building.
    3. **Tip** you off to shortcuts that save time on the job.
    4. **Warn** you about mistakes that new builders make, and how to avoid them.
    5. **Encourage** you when a topic is genuinely hard.
    6. **Celebrate** with you when you finish something real.

    If I'm not doing one of those six things, I'm not in the chapter. Let's build it right!

## The Built Environment

The **built environment** is every human-made space in which people live, work, and move: buildings, the roads and utilities that connect them, and the parks and open spaces shaped around them. It is distinct from the natural environment, although the two constantly exchange energy, water, and materials. Most people in North America spend about 90 percent of their time indoors, so the quality of the built environment is a direct determinant of health, productivity, and safety.

The built environment is best understood as nested scales. At the smallest scale sits a single *material*, such as a piece of lumber. Materials are assembled into *components* such as walls, and components combine into *buildings*. Buildings cluster into *neighborhoods*, which are linked by *infrastructure* into cities and regions. A decision at one scale propagates to the others: the insulation chosen for a wall affects the heating load of the building, which in turn affects the demand on the regional electrical grid.

!!! mascot-thinking "Everything Is a System"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Notice that each scale is made of the scale below it. When you can name what a wall is made of and what the wall belongs to, you can trace almost any building problem to its cause.

The table below summarizes the nested scales that we have just described. It adds no new ideas, but it gives you a reference to return to as the book moves between scale levels.

| Scale | Example | Typical concern |
|-------|---------|-----------------|
| Material | Softwood lumber, concrete | Strength, moisture behavior |
| Component | Stud wall, window, footing | Load, heat flow, water |
| Building | A four-story apartment | Safety, comfort, energy use |
| Neighborhood | A block of mixed-use buildings | Access, drainage, shading |
| Region | A metropolitan area | Utilities, transportation |

**Worked example: tracing a classroom.** Suppose a student is uncomfortable in a college classroom on a January afternoon. At the material scale, the window glass has low resistance to heat flow. At the component scale, the window frame leaks air around its edges. At the building scale, the heating system cannot keep up with the heat loss. At the neighborhood scale, a neighboring tower blocks the low winter sun. Each explanation sits at a different scale, yet all four contribute to one complaint. A builder or designer who thinks only at one scale will miss part of the cause.

#### Diagram: Scales of the Built Environment


<iframe src="../../sims/built-environment-scales/main.html" width="100%" height="517px" scrolling="no"></iframe>
[Run Scales of the Built Environment Fullscreen](../../sims/built-environment-scales/main.html)

<details markdown="1">
<summary>Scales of the Built Environment</summary>
Type: infographic
**sim-id:** built-environment-scales<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will classify (Bloom Level 2, Understand) examples of built-environment elements into the five nested scales and explain (Understand) how a decision at one scale affects another.

Visual: Five concentric rounded rectangles labeled Material, Component, Building, Neighborhood, and Region, with Material at the center. Canvas width follows the container width; height is 420 px. The layout redraws on window resize.

Interactions: Hovering over a ring shows a tooltip with one example and its typical concern, matching the table above. Clicking a ring opens an infobox below the canvas with a two-sentence definition and a "what changes if this fails" example. A button labeled "Trace the classroom" highlights the four rings in sequence while the infobox narrates the January classroom example.

Colors: Rings use the book's green palette, light at the outside and dark at the center. Text is dark on light rings and white on dark rings.

Implementation: p5.js with a responsive canvas, mouse hit-testing on each ring, and a simple infobox div.
</details>

## Building

A **building** is an enclosed, roofed structure intended to shelter people, activities, or goods. This definition separates buildings from other human-made structures such as bridges, towers, and dams, which also carry loads but do not enclose usable interior space. The distinction matters for regulation: building codes address enclosed occupied space, while other structures fall under different standards.

Every building does four jobs at once. It *supports* itself and its contents against gravity, wind, and snow. It *separates* the interior from the exterior, controlling heat, air, water, and sound. It *serves* its occupants with light, power, water, and ventilation. And it *protects* them from fire and other hazards. Each of these jobs is performed by a different group of components, and conflicts between jobs are the source of most design trade-offs. A large window serves occupants with daylight but weakens the separation job in a Minnesota winter.

**Worked example: sorting the jobs.** Consider a simple wood-framed house. The studs, joists, and foundation support the building. The siding, sheathing, insulation, and roof separate it from the weather. The furnace, wiring, and plumbing serve the occupants. The smoke alarms and gypsum board protect the occupants. If we remove the insulation, the support and protect jobs are unaffected, but the separate job fails and the serve job (the furnace) must work much harder to compensate.

| Job | Question it answers | Example component |
|-----|---------------------|-------------------|
| Support | Will it stand? | Footings, studs, beams |
| Separate | Will it keep weather out? | Roof, wall assembly, windows |
| Serve | Can people live and work in it? | Heating, plumbing, lighting |
| Protect | Will it keep people safe? | Fire barriers, sprinklers, exits |

## Building Types

Buildings are grouped by what people do in them, a classification called **building types** or *occupancy*. The type controls which code provisions apply, how many exits are required, and how much fire resistance is needed. Four broad categories organize most of the construction industry.

**Residential construction** covers buildings where people live, from single-family houses to apartment buildings. It is the largest sector by number of projects, and most residential buildings in Minnesota use wood framing because of its cost and speed. **Commercial construction** covers buildings for business and trade, including offices, shops, restaurants, and hotels, and typically uses steel or concrete frames at larger sizes. **Industrial construction** covers factories, warehouses, and processing plants, where large open floor areas, heavy floor loads, and process equipment dominate the design. **Institutional construction** covers schools, hospitals, government buildings, and places of worship, where occupants are often vulnerable or unfamiliar with the building, and life-safety requirements are stricter.

| Category | Typical examples | Design emphasis |
|----------|------------------|-----------------|
| Residential | Houses, apartments | Comfort, cost, speed |
| Commercial | Offices, retail, hotels | Flexibility, appearance |
| Industrial | Factories, warehouses | Floor loads, large spans |
| Institutional | Schools, hospitals | Life safety, durability |

## Building Materials

**Building materials** are the physical substances from which buildings are made. Nearly all of them fall into a few families: wood, steel and other metals, concrete, masonry (brick, block, and stone), glass, plastics and foams, and gypsum products. Each family has a characteristic behavior. Wood is light and easy to work but absorbs moisture. Steel is strong and uniform but loses strength in fire. Concrete is strong in compression but weak in tension. Masonry resists fire and weather but is heavy. Glass admits light but loses heat easily.

Why not simply choose the strongest material for everything? The answer is that no material is best at every task, and the choice always involves trade-offs among strength, weight, cost, durability, fire behavior, thermal performance, appearance, and environmental impact. Chapter 5 treats these properties in detail. For now, we need only the idea that a material is chosen for a *job*, and that the same material can be an excellent choice for one job and a poor choice for another.

!!! mascot-tip "Beau's Tip: Ask What Job the Material Has"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    When you meet an unfamiliar material, ask three questions: what load does it carry, what does it keep out, and what happens if it gets wet or hot? Those three answers will tell you most of what you need to know.

**Worked example: choosing for the job.** A designer needs a foundation wall that will sit against wet soil for decades. Wood would rot, and untreated steel would corrode. Poured concrete resists moisture, carries the soil's load, and is strong in compression, which is the kind of load the wall experiences. A designer needs a floor structure for a small house. Here, dimensional lumber is light, inexpensive, and easy to install. The same designer has chosen concrete for one job and wood for another, and the choices are consistent because each material suits its job.

| Material family | Strong point | Weak point | Typical use |
|-----------------|--------------|------------|-------------|
| Wood | Light, easy to work | Moisture, decay | Floor and wall framing |
| Steel | High strength | Fire, corrosion | Frames, connections |
| Concrete | Compression, fire | Tension, cracking | Foundations, slabs |
| Masonry | Fire, weather | Weight, tension | Walls, veneers |
| Glass | Light | Heat loss | Windows |

## Building Systems

A **building system** is a group of components that work together to perform one function for the whole building. Building systems let us divide a large and complicated building into manageable parts. The six systems we use throughout this book are as follows.

- **Structural system:** the frame, foundation, and floors that carry loads to the ground.
- **Enclosure system:** the roof, walls, windows, and doors that separate inside from outside.
- **Mechanical system:** heating, cooling, and ventilation (often called HVAC).
- **Plumbing system:** water supply, drainage, and venting.
- **Electrical system:** power distribution, lighting, and low-voltage communications.
- **Fire protection system:** sprinklers, alarms, and fire-resistant construction.

The key idea is that the systems are *interdependent*. The structure must be built before the enclosure can be attached to it. The enclosure determines how large the mechanical system must be, because a leaky enclosure demands more heating. The mechanical and electrical systems need holes through the structure, and the structure cannot be weakened to accommodate them without engineering review. A change in one system therefore ripples into others, which is the reason that designers from every discipline must coordinate (Chapter 16 returns to this topic).

!!! mascot-thinking "Beau's Thinking: Interdependence Is the Point"
    ![Beau thinking](../../img/mascot/thinking.png){ class="mascot-admonition-img" }
    Think of the systems like the crew on a job site: any one crew can finish its own work, but the building only works when all of them have fit around each other. That is why we study systems separately in this book and keep returning to how they connect.

**Worked example: a leaky wall.** Suppose a wall is built with gaps that leak air. The enclosure system now loses heat faster than designed. The mechanical system (a furnace sized for the *designed* heat loss) cannot keep the rooms warm. The electrical system (a baseboard heater added as a repair) draws more power than the circuit was sized for. A structural problem eventually follows if warm, moist indoor air leaks into the wall cavity and condenses on the framing, which can lead to decay. One construction defect has now touched four systems.

#### Diagram: Building Systems Cutaway


<iframe src="../../sims/building-systems-cutaway/main.html" width="100%" height="517px" scrolling="no"></iframe>
[Run Building Systems Cutaway Fullscreen](../../sims/building-systems-cutaway/main.html)

<details markdown="1">
<summary>Building Systems Cutaway</summary>
Type: infographic
**sim-id:** building-systems-cutaway<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will identify (Bloom Level 1, Remember) the six building systems in a simple building section and analyze (Bloom Level 4, Analyze) which other systems are affected when one system changes.

Visual: A simple two-story house in section, with the structure, enclosure, mechanical, plumbing, electrical, and fire-protection components drawn in six distinct colors. Canvas width follows the container; height 480 px; redraw on window resize.

Interactions: Clicking a system name in a legend toggles that system's layer on and off. Clicking a component opens an infobox naming its system and listing the other systems that depend on it. A "What if?" dropdown offers the scenarios "Remove insulation," "Add a large window," and "Move the furnace," and highlights the systems affected in each case, with a one-sentence explanation in the infobox.

Colors: Each system has its own color from a color-blind safe palette, and legend swatches are labeled with text as well as color.

Implementation: p5.js layered drawing with hit-testing on component shapes.
</details>

## Building Science

**Building science** is the applied discipline that explains how buildings behave: how they carry load, move heat and moisture, handle air, and age over time. It draws on physics, materials science, and engineering, and it connects the choices made during design and construction to the performance seen during occupancy. This book follows a building-science approach, which is why the chapters that follow address forces, heat, and moisture before they treat any specific construction system.

## The Construction Industry

The **construction industry** is the network of firms and professionals that plan, design, build, and maintain the built environment. It is large: construction typically accounts for several percent of national economic output and employs millions of workers. It is also fragmented, since most firms are small and specialize in one trade or building type. Understanding who does what is useful, because nearly every construction problem is ultimately a question about responsibility and communication.

The main participants are as follows.

- The **owner** commissions and pays for the project and sets its goals.
- The **architect** leads design and coordinates the design team.
- **Engineers** (structural, mechanical, electrical, and civil) design the systems for which they are responsible.
- The **general contractor** manages construction, schedules the work, and is responsible for the finished result.
- **Subcontractors** are specialist firms, such as electricians, plumbers, and framers, who perform parts of the work.
- The **building official** reviews plans and inspects the work for compliance with the code.
- **Suppliers and manufacturers** provide materials and products.

Chapter 2 examines how these participants work together through the phases of a project. For now, the key point is that information moves among them through a small set of documents: drawings, specifications, and schedules. Those documents are the subject of the second half of this chapter.

In Minnesota, the industry adapts to a climate with deep frost, heavy snow, and wide temperature swings. These conditions drive many local practices, such as footings placed below the frost depth, high levels of insulation, and a construction season that concentrates exterior work into the warmer months. We will return to these practices throughout the book.

**Worked example: following a window.** A homeowner (the owner) wants a larger window. The architect draws it, the structural engineer checks that the wall can carry the opening, and the manufacturer supplies the unit. The general contractor orders it, the framing subcontractor builds the opening, and the building official inspects the installation. A single window therefore passes through at least six parties, and the drawings and specifications are what keep them consistent.

| Participant | Main responsibility | Document they mostly produce or use |
|-------------|---------------------|-------------------------------------|
| Owner | Goals, budget | Contract |
| Architect | Overall design | Drawings, specifications |
| Engineer | System design | Calculations, drawings |
| General contractor | Building the work | Schedule, submittals |
| Subcontractor | Trade work | Shop drawings |
| Building official | Code compliance | Permits, inspection reports |

## Construction Terminology

**Construction terminology** is the shared vocabulary that lets professionals describe a building precisely, without ambiguity. A word such as "header" or "flashing" compresses a long description into a single term that every trade understands. Learning the terms is the fastest way to read a drawing, follow a conversation on site, and avoid expensive mistakes, because a misunderstood word on a job site often becomes a wrong part built in the wrong place.

Terms come from several sources. Many are inherited trade words, such as "joist" and "stud." Others are defined by standards and codes, such as "occupancy" and "egress." Still others are specific to a region or a trade, so that the same item may have two names in two places. When you meet a new term, the habit that helps most is to record it with its meaning, the system it belongs to, and a sketch.

**Worked example: decoding a sentence.** Read this line from a framing note: "Provide a double header over the window opening, bearing on jack studs at each side." A *header* is a horizontal member that carries loads across an opening. "Double" means two pieces are used together. "Bearing" means the load rests on something. *Jack studs* are shorter vertical members that support the header. Put together, the note tells the framer to build a two-piece beam above the window that rests on short studs at each side, so that the weight above is carried around the opening rather than through the glass.

| Term | Meaning | System |
|------|---------|--------|
| Stud | Vertical member in a wall frame | Structure |
| Joist | Horizontal member supporting a floor | Structure |
| Header | Member that spans an opening | Structure |
| Sheathing | Panel covering the frame outside | Enclosure |
| Flashing | Thin material that directs water out | Enclosure |
| Footing | Wide base of a foundation | Structure |
| Duct | Channel that carries air | Mechanical |
| Conduit | Tube protecting electrical wires | Electrical |
| Egress | A way out of a building | Fire protection |

!!! mascot-warning "Watch Out: Similar Words, Different Meanings"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A common trap is treating "footing" and "foundation" as the same thing, when a footing is only the wide base at the bottom of a foundation. When two terms sound alike, look them up in the glossary before you use them on a drawing or at a job site.

## Units of Measurement

**Units of measurement** are the standard quantities used to state sizes, forces, and other properties. Construction in the United States uses two systems. The *U.S. customary* system measures lengths in feet and inches, and it is used on most drawings and in most trades. The *International System* (SI, or metric) uses meters and millimeters, and it is the system used in engineering science and in most of the world. Professionals must be fluent in both, because products, standards, and research often arrive in the other system.

Two conventions often confuse beginners. First, lengths on drawings are usually written in *feet and inches*, such as 12'-6 3/8", where the apostrophe means feet and the quotation mark means inches. Second, engineering calculations usually require *decimal feet* or decimal inches, so the mixed notation must be converted. Another convention to know is the **nominal size** of lumber: a "2x4" is labeled with its rough size, but a finished piece actually measures 1.5 in by 3.5 in.

To convert feet-inches to decimal feet, divide the inches by 12 and add the result to the feet:

\[ \text{feet}_{decimal} = \text{feet} + \frac{\text{inches}}{12} \]

**Worked example: a mixed-unit length.** Convert 12'-6 3/8" to decimal feet. First change the fraction to a decimal: \( 3/8 = 0.375 \), so the inches are \( 6.375 \). Then divide by 12: \( 6.375 / 12 = 0.53125 \). Finally add the feet: \( 12 + 0.53125 = 12.53125 \) ft. To check the answer in metric, multiply by 304.8 mm per foot: \( 12.53125 \times 304.8 \approx 3820 \) mm, or about 3.82 m.

| Quantity | U.S. customary | SI | Conversion |
|----------|----------------|----|------------|
| Length | foot (ft), inch (in) | meter (m), millimeter (mm) | 1 in = 25.4 mm |
| Area | square foot (ft²) | square meter (m²) | 1 m² ≈ 10.76 ft² |
| Force | pound-force (lbf) | newton (N) | 1 lbf ≈ 4.448 N |
| Pressure | pounds per square inch (psi) | pascal (Pa) | 1 psi ≈ 6.895 kPa |

!!! mascot-tip "Beau's Tip: Always Write the Unit"
    ![Beau giving a tip](../../img/mascot/tip.png){ class="mascot-admonition-img" }
    Write the unit next to every number in your notes and calculations. Measure twice, build once, and a missing unit is the easiest mistake to catch the first time.

## Scale and Dimensions

A **dimension** states the size of an object or the distance between two points. A **scale** is the ratio between a length on a drawing and the real length it represents, which lets a large building fit on a sheet of paper. A scale of 1/4" = 1'-0" means that each quarter inch on the paper represents one foot of the actual building. Floor plans are commonly drawn at this scale, site plans at much smaller ones, and construction details at much larger ones such as 3" = 1'-0".

There are two important rules of practice. First, *dimensions govern over scaled measurements*: when a drawing states a dimension, use that number rather than measuring the sheet with a ruler, since the paper may have been enlarged or reduced in printing. Second, a drawing should state its scale, and each view on a sheet may have a different scale, so check the label before you measure.

The scale ratio can be calculated directly. If the scale is 1/4" = 1'-0", then 1 in on paper represents \( 1 / 0.25 = 4 \) ft in the building. So the real length \( L \) is

\[ L = \frac{\text{drawn length}}{\text{scale (in per ft)}} \]

**Worked example: reading a wall from a plan.** A wall measures 6 1/2 in on a plan drawn at 1/4" = 1'-0". The scale is 0.25 in per ft, so \( L = 6.5 / 0.25 = 26 \) ft. If the same wall appeared on a 1/8" = 1'-0" plan, it would measure only \( 26 \times 0.125 = 3.25 \) in. The wall is the same size; only the picture has changed.

!!! mascot-warning "Watch Out: Measuring a Printout"
    ![Beau warning](../../img/mascot/warning.png){ class="mascot-admonition-img" }
    A drawing that has been printed at "fit to page" no longer matches its stated scale, which is how people end up ordering materials that are too short. Use the written dimensions, and use a scale ruler only to check a dimension that is missing.

#### Diagram: Drawing Scale Calculator


<iframe src="../../sims/drawing-scale-calculator/main.html" width="100%" height="552px" scrolling="no"></iframe>
[Run Drawing Scale Calculator Fullscreen](../../sims/drawing-scale-calculator/main.html)

<details markdown="1">
<summary>Drawing Scale Calculator</summary>
Type: microsim
**sim-id:** drawing-scale-calculator<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will calculate (Bloom Level 3, Apply) the real length of a wall from a drawn length and a stated scale, and explain (Bloom Level 2, Understand) why a changed print size breaks the scale.

Visual: A simple floor plan drawn on a canvas that is 600 px wide by 400 px high and resizes with the window. A draggable measuring line with end handles is placed on a wall. A readout shows the drawn length in inches, the selected scale, and the computed real length in feet-inches and in millimeters.

Controls: A dropdown to select 1/8" = 1'-0", 1/4" = 1'-0", 1/2" = 1'-0", or 3" = 1'-0". A slider labeled "Print size" from 50% to 150% that rescales the drawing, with a warning message appearing when the slider is not at 100% that says the printed scale no longer applies. A "Check my answer" button lets the student type a length before the readout is revealed.

Behavior: Dragging the handles updates the readout live. Changing the scale recomputes the real length. Default state: scale 1/4" = 1'-0", print size 100%.

Implementation: p5.js with a responsive canvas and DOM controls.
</details>

## Construction Drawings

**Construction drawings** are the scaled graphic documents that show what is to be built, where, and how. They are the main way a design is communicated from the design team to the builders. A set is organized by discipline, with the architectural drawings first, followed by structural, mechanical, plumbing, and electrical sheets, and each sheet carries a title block listing its number, title, scale, and date. Three principles make a set readable: every sheet is numbered and titled, each discipline uses a letter prefix (A for architectural, S for structural, M for mechanical, P for plumbing, and E for electrical), and the views on each sheet are cross-referenced to other sheets.

Four kinds of views appear in nearly every set, and each is the answer to a different question about the building.

### Plans

A **plan** is a view from directly above a horizontal cut through a building, normally about four feet above the floor. It shows walls, doors, windows, and room layouts, so it answers the question "what is where?" Floor plans, site plans, framing plans, and roof plans are all plan views.

### Elevations

An **elevation** is a view of a building face or interior wall seen straight on, without perspective. Elevations show heights, window and door positions, and exterior materials, and so answer "what does it look like, and how tall is it?"

### Sections

A **section** is a view of an imaginary vertical cut through a building, showing the interior as if the building were sliced open. Sections reveal floor-to-floor heights, foundation depths, and how the layers of the roof and walls fit together.

### Details

A **detail** is an enlarged view of a small area, such as the connection between a wall and a foundation, at a large scale such as 3" = 1'-0". Details are where the construction of a joint is specified, and many of the building-science failures discussed later in the book occur in poorly drawn or poorly built details.

### Schedules

A **schedule** is a table that lists repeated items, such as doors, windows, or finishes, with their sizes and properties. A door schedule, for example, lists each door by a mark number, with its width, height, material, and fire rating, so that the drawings can show only the mark and avoid clutter.

| View | Direction of view | Answers the question |
|------|-------------------|----------------------|
| Plan | From above, horizontal cut | What is where? |
| Elevation | Straight on, from one side | How does it look, how tall? |
| Section | Vertical cut through the building | How is it layered and connected? |
| Detail | Enlarged small area | How is this joint built? |
| Schedule | Table | What are the sizes and properties of repeated items? |

**Worked example: following a window through the set.** On the floor plan, a window appears at a wall as a thin symbol with a tag, "W3." On the exterior elevation, the window is shown with its height above the floor. On the window schedule, the tag W3 leads to a row stating that it measures 3'-0" wide by 4'-0" high, double glazed. On a wall section, the same window is shown with its flashing and sill. Four views of the same window each answer a different question, and the tag W3 ties them together.

#### Diagram: Drawing Types Explorer


<iframe src="../../sims/drawing-types-explorer/main.html" width="100%" height="542px" scrolling="no"></iframe>
[Run Drawing Types Explorer Fullscreen](../../sims/drawing-types-explorer/main.html)

<details markdown="1">
<summary>Drawing Types Explorer</summary>
Type: infographic
**sim-id:** drawing-types-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Learning objective: Students will differentiate (Bloom Level 4, Analyze) plan, elevation, section, and detail views of the same small building and identify which view answers a given question.

Visual: A simple isometric picture of a small one-story building in the center of the canvas (width follows the container, height 460 px). Four buttons labeled Plan, Elevation, Section, and Detail appear below it.

Interactions: Clicking a button animates a cutting plane or viewing arrow on the building and then shows the resulting 2D drawing beside it. Hovering over any element of the 2D drawing shows a tooltip naming the building element and its tag. A quiz mode shows a question such as "Where do you find the thickness of the wall insulation?" and asks the student to click the correct view, with immediate feedback.

Implementation: p5.js with pre-drawn 2D views and a responsive layout.
</details>

## Specifications

**Specifications** are the written technical requirements for materials, products, workmanship, and testing. Where drawings show *where and how big*, specifications state *what quality and by what standard*. A typical specification names the product or performance required, the standard it must meet (often an ASTM standard), the installation method, and how the work will be inspected. When the drawings and specifications appear to disagree, the contract documents normally state which governs, so a builder should ask rather than guess.

In the United States, specifications are commonly organized using a standard numbering outline, called MasterFormat, which groups work into numbered divisions such as Division 03 (Concrete), Division 06 (Wood, Plastics, and Composites), and Division 26 (Electrical). The outline lets any trade quickly find the sections that apply to it.

**Worked example: drawing versus specification.** A drawing shows a concrete slab with the note "4 in slab." The specification, in Division 03, adds that the concrete must reach a compressive strength of 4000 psi at 28 days, contain air entrainment suitable for freeze-thaw exposure, and be cured for seven days. Neither document alone tells the builder everything needed. The drawing gives the geometry, and the specification gives the quality.

## Symbols and Abbreviations

**Symbols and abbreviations** are the shorthand used on drawings to save space. A circle with a number may mark a detail callout, a thin line pattern may mean insulation, and letters such as "TYP" (typical), "EQ" (equal), and "GWB" (gypsum wallboard) shorten the text. Each set of drawings includes a symbol legend and an abbreviation list, and a builder should read both before reading the sheets because conventions vary slightly among firms.

!!! mascot-celebration "You've Laid the Foundation!"
    ![Beau celebrating](../../img/mascot/celebration.png){ class="mascot-admonition-img" }
    You can now describe the built environment as nested scales, name the six building systems, convert feet-inches to decimal feet, and read a plan, elevation, section, and detail. That is a solid foundation to build on, and Chapter 2 shows how a project moves from idea to occupancy.

## Key Takeaways

- The built environment is made of nested scales, from a single material to a whole region, and decisions at one scale affect the others.
- A building supports, separates, serves, and protects, and conflicts among those four jobs drive most design trade-offs.
- Buildings are classified by use as residential, commercial, industrial, or institutional, and the type determines which code requirements apply.
- Materials are selected for a job, and no material is best at every job.
- Six interdependent systems make up a building: structure, enclosure, mechanical, plumbing, electrical, and fire protection.
- Drawings (plans, elevations, sections, details, and schedules) show *where and how big*, while specifications state *what quality*.
- Dimensions govern over scaled measurements, and every number needs a unit.

[See Annotated References](./references.md)
