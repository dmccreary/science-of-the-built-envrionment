---
title: Instructors Guide
description: A complete guide for instructors using The Science of the Built Environment, covering pacing, chapter-by-chapter teaching notes, MicroSims, quizzes, assessment, licensing, customization, and analytics.
status: built
---

# Instructors Guide

Welcome to the instructors guide for *The Science of the Built Environment*. This guide explains what is in the textbook, how to teach with it over a semester, how to use each feature (chapters, MicroSims, quizzes, glossary, FAQ, posters, and learning graph), and how to copy and customize your own version. It was written for instructors in construction, architecture, and building-systems programs, including those who teach future electrical designers.

No technical background is assumed beyond what you already use in the classroom. Every web or software term is defined where it first appears.

## Start Here: Your First Thirty Minutes

If you only have half an hour before the first class, do these five things in order:

1. Read the [Course Description](../../course-description.md) so you know the eight competencies the book is built around.
2. Open [Chapter 1](../../chapters/01-intro-terminology/index.md) and scroll through it once to see the layout every chapter shares.
3. Open one MicroSim, such as the [Critical Path Explorer](../../sims/critical-path-explorer/index.md), and move a slider.
4. Open the [Chapter 1 quiz](../../chapters/01-intro-terminology/quiz.md) and reveal one answer.
5. Skim the [pacing plan](#a-15-week-pacing-plan) below and decide how your calendar maps to it.

## The Book at a Glance

| Item | Count | Where to find it |
|------|------:|------------------|
| Chapters | 21 | [List of Chapters](../../chapters/index.md) |
| Concepts in the learning graph | 380 | [Concept list](../concept-list.md) and the [Learning Graph Viewer](../../sims/graph-viewer/index.md) |
| Quiz questions (one per concept) | 380 | One quiz page per chapter |
| Glossary terms | 380 | [Glossary](../../glossary.md) |
| FAQ questions | 100 in 6 categories | [FAQ](../../faq.md) |
| MicroSims | 74 | [MicroSims](../../sims/index.md) |
| Interactive infographic posters | 20 | [Poster Gallery](../../posters/index.md) |
| Graphic novel stories | 12 | [Stories](../../stories/index.md) |
| Annotated references | 210 (10 per chapter) | One references page per chapter |
| Chapter text | about 138,000 words | The chapter pages |

!!! note "MicroSim readiness"
    All 74 MicroSims are **built**, so every chapter shows a working simulation. None has been **approved** yet, which means the author has not finished testing each one with its controls. Test the simulations you plan to use before class, and report anything that misbehaves (see [Feedback](#feedback-and-reporting-problems)). The nav status dots show each simulation's state, as described in [MicroSim Status](#microsim-status-and-what-to-expect).

## About This Intelligent Textbook

### What Is an Intelligent Textbook?

An **intelligent textbook** is a digital textbook that goes beyond static text and images. It adds interactive simulations, self-checking quizzes, a searchable glossary, and a structured map of how concepts depend on each other. The goal is a richer experience than a printed book can give.

### The Five Levels of Intelligent Textbooks

Intelligent textbooks fall into five levels based on how interactive and adaptive they are:

<iframe src="https://dmccreary.github.io/intelligent-textbooks/sims/book-levels/main.html" height="500px" scrolling="no"
  style="overflow: hidden;"></iframe>

| Level | Name | Description |
|-------|------|-------------|
| **Level 1** | Static Digital | A PDF or basic web version of a print textbook. |
| **Level 2** | Interactive | Adds simulations, quizzes, and a searchable glossary. |
| **Level 3** | Adaptive | Adjusts content to each student's performance. |
| **Level 4** | AI-Assisted | Includes an AI tutor that answers student questions. |
| **Level 5** | Fully Adaptive AI | Continuously learns from students and optimizes the experience. |

**This is a Level 2 textbook.** It has MicroSims, quizzes, a glossary, a FAQ, and a learning graph. It does not adapt to individual students, and it does not include an AI tutor.

### What Makes This Book Different

- **Interactive MicroSims** let students change a variable and watch a building behave. They run in any modern web browser with nothing to install.
- **Cold-climate emphasis.** The examples come from Minneapolis: frost-protected foundations, high-performance insulation and air sealing, ice dams, and the Minnesota State Building Code and Minnesota Energy Code.
- **Codes and sustainability are design inputs**, not afterthoughts. They appear as soon as students can use them.
- **A learning graph** maps how all 380 concepts depend on each other, so you can see exactly what a student needs before a topic.
- **A pedagogical mascot**, Beau the Beaver, a character who guides students through each chapter (see [Beau](#beau-the-pedagogical-agent)).
- **Open license.** The book is free to use and adapt for non-commercial teaching under Creative Commons.

## Aligning the Book to Your Course

### Course Competencies

The book was written from eight competencies for the course. The table maps each to the chapters that build it. The mapping is a suggestion drawn from the chapter content, so adjust it to your own outcomes and program learning outcomes (PLOs).

| # | Competency | PLO | Main chapters |
|---|------------|-----|---------------|
| 1 | Analyze building structural systems | a | 3, 5, 6, 7, 8, 10 |
| 2 | Evaluate building enclosure systems | a | 4, 11, 12, 13 |
| 3 | Apply terms common to the construction industry | a, c | 1, plus every chapter |
| 4 | Examine the role of the electrical designer throughout design and construction | a, e | 2, 15, 16 |
| 5 | Summarize and sequence the design and construction process | a, b | 2, 17 |
| 6 | Analyze the properties and applications of building materials and systems | a, b | 5, 7, 8, 9, 10, 14 |
| 7 | Apply building codes and regulations | a, b, c | 17, 18, 19 |
| 8 | Evaluate sustainable building materials | a, b | 19, 20, 21 |

### Bloom's Taxonomy

**Bloom's Taxonomy** is a framework that sorts thinking skills from simple to complex: Remember, Understand, Apply, Analyze, Evaluate, and Create. The course description states its learning outcomes at each level, in the 2001 revised form. The chapters mostly teach and the quizzes mostly test the first four levels. The Evaluate and Create levels are best assessed with your own projects (see [Assessment Ideas](#assessment-ideas)). Each MicroSim's lesson page lists the Bloom's levels it targets.

### What the Book Does Not Cover

The course description deliberately excludes detailed structural calculations (member sizing, finite element analysis), architectural design theory, cost estimating in depth, detailed electrical circuit and lighting design, civil infrastructure, zoning and land development, trade installation skills, and BIM software. If your course needs any of those, plan to supply the material yourself.

## How the Chapters Are Built

### Chapter Anatomy

Every chapter has the same skeleton, so students learn where to look:

1. **Front matter**: metadata at the top of the file (title, description, version). Students do not see it. Search engines and the site builder use it.
2. **Summary**: what the chapter covers and what students will be able to do.
3. **Concepts Covered**: a numbered list of the concepts, drawn from the learning graph.
4. **Prerequisites**: the earlier chapters the chapter builds on, with links.
5. **Body**: the core teaching, with worked examples, tables, equations, and diagrams.
6. **MicroSim blocks**: each interactive appears under a "Diagram" heading, with the simulation first and a collapsible specification under it (see [Using the MicroSims](#using-the-microsims)).
7. **Beau admonitions**: short colored callouts, a handful per chapter.
8. **Key Takeaways**: a short list of the main points.
9. **Annotated References**: a link to the chapter's reference page.

A **callout** (also called an **admonition**) is a colored box that sets a short note apart from the main text.

### Chapter Dependencies

Each chapter's Prerequisites section lists the chapters it builds on. Chapters 1 and 3 have no prerequisites inside the book. The table shows the dependency and size of each chapter, so you can see what to reorder, merge, or skip.

| Chapter | Title | Concepts | Words | Builds on |
|--------:|-------|---------:|------:|-----------|
| 1 | [Introduction to the Built Environment and Construction Terminology](../../chapters/01-intro-terminology/index.md) | 22 | 5,505 | none |
| 2 | [The Design and Construction Process](../../chapters/02-design-construction-process/index.md) | 24 | 8,170 | 1 |
| 3 | [Forces, Heat, and the Physics of Buildings](../../chapters/03-forces-heat-physics/index.md) | 16 | 9,454 | none |
| 4 | [Moisture, Air Movement, and Thermal Comfort](../../chapters/04-moisture-air-comfort/index.md) | 12 | 5,595 | 3 |
| 5 | [Properties of Building Materials](../../chapters/05-material-properties/index.md) | 22 | 6,578 | 1, 3, 4 |
| 6 | [Structural Loads and Load Paths](../../chapters/06-structural-loads/index.md) | 23 | 8,385 | 3, 4, 5 |
| 7 | [Wood and Steel Framing](../../chapters/07-wood-steel-framing/index.md) | 18 | 6,264 | 1, 4, 6 |
| 8 | [Concrete and Masonry](../../chapters/08-concrete-masonry/index.md) | 23 | 8,168 | 1, 5, 6 |
| 9 | [Site Work, Soils, and Groundwater](../../chapters/09-site-soils/index.md) | 11 | 5,821 | 1, 2, 3, 4, 5 |
| 10 | [Foundation Systems](../../chapters/10-foundation-systems/index.md) | 15 | 4,377 | 6, 8, 9 |
| 11 | [Enclosure Control Layers and Insulation](../../chapters/11-enclosure-insulation/index.md) | 20 | 8,006 | 1, 3, 4, 7, 9, 10 |
| 12 | [Cladding, Windows, Doors, and Air Sealing](../../chapters/12-cladding-windows-air-sealing/index.md) | 19 | 6,893 | 1, 3, 4, 5, 6, 8, 11 |
| 13 | [Roof Assemblies](../../chapters/13-roof-assemblies/index.md) | 10 | 4,466 | 3, 4, 7, 11 |
| 14 | [HVAC, Plumbing, and Fire Protection Systems](../../chapters/14-hvac-plumbing-fire/index.md) | 25 | 7,058 | 1, 3, 4, 5, 9, 10, 13 |
| 15 | [Electrical Fundamentals and Building Service](../../chapters/15-electrical-fundamentals/index.md) | 17 | 8,367 | 1 |
| 16 | [Electrical Distribution, Lighting, and Design Team Coordination](../../chapters/16-electrical-distribution-design/index.md) | 23 | 7,481 | 1, 2, 3, 6, 14, 15 |
| 17 | [Building Codes, Permits, and Enforcement](../../chapters/17-building-codes-permits/index.md) | 20 | 5,986 | 1, 2, 5, 9, 14, 15 |
| 18 | [Fire Protection and Life Safety Requirements](../../chapters/18-fire-life-safety/index.md) | 11 | 4,890 | 1, 5, 14, 15, 16, 17 |
| 19 | [Energy Efficiency and High-Performance Buildings](../../chapters/19-energy-efficiency/index.md) | 14 | 4,968 | 1, 3, 11, 12, 13, 14, 16, 17 |
| 20 | [Sustainable Building Materials](../../chapters/20-sustainable-materials/index.md) | 15 | 4,782 | 1, 2, 7, 8, 14, 19 |
| 21 | [Durability, Maintenance, and Building Failure](../../chapters/21-durability-failure/index.md) | 20 | 6,582 | 4, 5, 7, 8, 9, 11, 19, 20 |

!!! note "Skipping and reordering"
    Chapters 1 and 3 start independent threads, and Chapter 15 depends only on Chapter 1. An electrical-focused course can therefore teach Chapters 1, 3, 15, and 16 early. Everything else follows the order shown, because later chapters reuse the earlier ones.

### A Suggested Class Rhythm

- **Before class**: assign the chapter or a section of it, and the quiz as an ungraded diagnostic.
- **During class**: project one MicroSim, have students predict the result before you move a slider, then test the prediction. Use the chapter's "Watch for" note below to listen for the usual misunderstanding.
- **After class**: assign the chapter quiz, and have students look up unfamiliar terms in the glossary.
- **Pacing**: the chapters average about 6,500 words, so most need one to two class sessions. Chapter 3 is the longest and the most mathematical, so give it two.

## A 15-Week Pacing Plan

This plan fits 21 chapters into a 15-week semester by pairing short chapters. Adjust it to your term length and meeting pattern.

| Week | Chapters | Focus |
|-----:|----------|-------|
| 1 | Chapter 1 | Vocabulary, systems, drawings. Syllabus and course tour. |
| 2 | Chapter 2 | Design and construction process. |
| 3 | Chapter 3 (part 1) | Forces, equilibrium, stress, strain. |
| 4 | Chapter 3 (part 2) and Chapter 4 | Heat transfer, R-value; moisture and air. |
| 5 | Chapter 5 | Material properties. **Quiz checkpoint 1** (Chapters 1-5). |
| 6 | Chapters 6 and 7 | Loads and load paths; wood and steel framing. |
| 7 | Chapters 8 and 9 | Concrete and masonry; site and soils. |
| 8 | Chapter 10 | Foundations. **Midterm** (Chapters 1-10). |
| 9 | Chapter 11 | Enclosure control layers and insulation. |
| 10 | Chapters 12 and 13 | Cladding, windows, air sealing; roofs. |
| 11 | Chapter 14 | HVAC, plumbing, fire protection systems. |
| 12 | Chapters 15 and 16 | Electrical fundamentals; distribution, lighting, coordination. |
| 13 | Chapters 17 and 18 | Codes and permits; fire and life safety. |
| 14 | Chapters 19 and 20 | Energy efficiency; sustainable materials. |
| 15 | Chapter 21 | Durability and failure. Capstone and review. |

If you teach a shorter term, drop in this order: Chapter 13 (roofs, which can be folded into Chapter 11), then Chapter 20, then the second half of Chapter 14. If your term is longer, give Chapters 3, 6, and 11 an extra session each, because they carry the most new ideas.

## Chapter-by-Chapter Teaching Notes

Each entry gives the purpose of the chapter, its MicroSims with their current status, one in-class activity, and the misunderstanding to listen for. A status of **built** means a working simulation exists and is awaiting the author's review. A status of **scaffold** would mean a specification and placeholder only.


### Chapter 1: Introduction to the Built Environment and Construction Terminology

[Open the chapter](../../chapters/01-intro-terminology/index.md) · [Quiz](../../chapters/01-intro-terminology/quiz.md) · [References](../../chapters/01-intro-terminology/references.md)

**Concepts:** 22 · **Quiz questions:** 22 · **Builds on:** nothing earlier in the book

**Purpose.** This chapter gives students the vocabulary, the six building systems, and the habit of reading drawings. Everything later in the book assumes it.

**MicroSims in this chapter:**

- [Building Systems Cutaway](../../sims/building-systems-cutaway/index.md) (p5.js; Bloom's: Remember, Analyze; status: built)
- [Drawing Scale Calculator](../../sims/drawing-scale-calculator/index.md) (p5.js; Bloom's: Apply, Understand; status: built)
- [Drawing Types Explorer](../../sims/drawing-types-explorer/index.md) (p5.js; Bloom's: Analyze; status: built)
- [Scales of the Built Environment](../../sims/built-environment-scales/index.md) (p5.js; Bloom's: Understand; status: built)

**In-class activity.** Hand out one real sheet from a small project set. Have students name each system visible on it, then use the Drawing Scale Calculator to check three printed dimensions against the scaled lengths.

**Watch for.** Students trust a measurement scaled off the page over the written dimension. The chapter states the rule: dimensions govern over scaled measurements, and every number needs a unit.


### Chapter 2: The Design and Construction Process

[Open the chapter](../../chapters/02-design-construction-process/index.md) · [Quiz](../../chapters/02-design-construction-process/quiz.md) · [References](../../chapters/02-design-construction-process/references.md)

**Concepts:** 24 · **Quiz questions:** 24 · **Builds on:** Chapters 1

**Purpose.** The sequence from programming to closeout, who holds which responsibility, and why early decisions are cheap and late ones are not.

**MicroSims in this chapter:**

- [Critical Path Explorer](../../sims/critical-path-explorer/index.md) (p5.js; Bloom's: Apply, Understand; status: built)
- [Delivery Method Explorer](../../sims/delivery-method-explorer/index.md) (p5.js; Bloom's: Analyze, Evaluate; status: built)
- [Project Phases and the Cost of Change](../../sims/project-phases-cost-of-change/index.md) (Chart.js; Bloom's: Remember, Understand; status: built)
- [Project Team Contracts and Communication Map](../../sims/project-team-communication-map/index.md) (vis-network; Bloom's: Analyze, Understand; status: built)

**In-class activity.** Run the Critical Path Explorer on the Riverbend structure activities. Ask the class to predict what happens when the truss delivery slips 10 days, then test the prediction. Follow it with the Delivery Method Explorer to compare who carries risk under each method.

**Watch for.** Blurring roles. The architect observes construction, while the general contractor controls means and methods. Ask students who would answer for a sequencing mistake and why.


### Chapter 3: Forces, Heat, and the Physics of Buildings

[Open the chapter](../../chapters/03-forces-heat-physics/index.md) · [Quiz](../../chapters/03-forces-heat-physics/quiz.md) · [References](../../chapters/03-forces-heat-physics/references.md)

**Concepts:** 16 · **Quiz questions:** 16 · **Builds on:** nothing earlier in the book

**Purpose.** Forces, equilibrium, stress, strain, and heat flow. It is the most math-dense chapter and the longest in the book, and it supports Chapters 5, 6, 11, and 19.

**MicroSims in this chapter:**

- [Beam Reactions and Equilibrium Explorer](../../sims/beam-reactions-equilibrium-explorer/index.md) (p5.js; Bloom's: Apply, Analyze; status: built)
- [Conduction Through a Layer](../../sims/conduction-layer-heat-flow-explorer/index.md) (p5.js; Bloom's: Apply, Analyze; status: built)
- [Force Vector Resolver](../../sims/force-vector-resolver/index.md) (p5.js; Bloom's: Apply, Understand; status: built)
- [Heat Transfer Modes in a Winter Wall](../../sims/heat-transfer-modes-wall-explorer/index.md) (p5.js; Bloom's: Understand; status: built)
- [Stress, Force, and Area Explorer](../../sims/stress-area-load-explorer/index.md) (p5.js; Bloom's: Apply, Evaluate; status: built)
- [Wall Assembly R-Value and Thermal Bridging Calculator](../../sims/wall-assembly-r-value-bridging-calculator/index.md) (p5.js; Bloom's: Apply, Analyze; status: built)

**In-class activity.** Split the work over two sessions: forces and stress first (Force Vector Resolver, Beam Reactions, Stress Force and Area), heat second (Conduction Through a Layer, Heat Transfer Modes, Wall Assembly R-Value). End with the same question for both halves: what happens to the answer if the area or the thickness doubles?

**Watch for.** Unit slips. Stress is force divided by area, strain is a ratio with no units, and R-values add in series while U-values do not. Have students write units on every line of a worked problem.


### Chapter 4: Moisture, Air Movement, and Thermal Comfort

[Open the chapter](../../chapters/04-moisture-air-comfort/index.md) · [Quiz](../../chapters/04-moisture-air-comfort/quiz.md) · [References](../../chapters/04-moisture-air-comfort/references.md)

**Concepts:** 12 · **Quiz questions:** 12 · **Builds on:** Chapters 3

**Purpose.** How water and air move through assemblies, and why condensation depends on surface temperature and not on the room alone.

**MicroSims in this chapter:**

- [Building Pressure and Air Leakage Explorer](../../sims/building-pressure-air-leakage-explorer/index.md) (p5.js; Bloom's: Analyze, Understand; status: built)
- [Moisture Pathways in a Wall](../../sims/moisture-transport-pathways-explorer/index.md) (p5.js; Bloom's: Understand; status: built)
- [Psychrometric Chart Explorer](../../sims/psychrometric-chart-explorer/index.md) (Plotly; Bloom's: Apply, Understand; status: built)

**In-class activity.** Use the Psychrometric Chart Explorer to find the dew point of a heated winter room, then the Moisture Pathways in a Wall sim to ask which of the four mechanisms is moving the water. Pair it with the Building Pressure and Air Leakage Explorer to show the stack effect.

**Watch for.** Treating vapor diffusion as the only moisture mechanism. The chapter names four (bulk water, capillary action, air movement, and diffusion), and each needs its own control.


### Chapter 5: Properties of Building Materials

[Open the chapter](../../chapters/05-material-properties/index.md) · [Quiz](../../chapters/05-material-properties/quiz.md) · [References](../../chapters/05-material-properties/references.md)

**Concepts:** 22 · **Quiz questions:** 22 · **Builds on:** Chapters 1, 3, 4

**Purpose.** Material properties as the language for comparing materials: strength, stiffness, thermal, moisture, and fire behavior.

**MicroSims in this chapter:**

- [Building Material Property Comparison Chart](../../sims/building-material-property-comparison-chart/index.md) (Chart.js; Bloom's: Analyze; status: built)
- [Stress-Strain Curve Explorer](../../sims/stress-strain-curve-explorer/index.md) (Chart.js; Bloom's: Understand, Analyze; status: built)

**In-class activity.** Put the Stress-Strain Curve Explorer on the projector and ask students to sketch where steel, concrete, and wood would sit before revealing them. Then use the Property Comparison Chart to rank materials for a given job.

**Watch for.** Strength versus stiffness. A strong member can still deflect too much. Also separate a property, which belongs to the material, from capacity, which depends on the material and the size.


### Chapter 6: Structural Loads and Load Paths

[Open the chapter](../../chapters/06-structural-loads/index.md) · [Quiz](../../chapters/06-structural-loads/quiz.md) · [References](../../chapters/06-structural-loads/references.md)

**Concepts:** 23 · **Quiz questions:** 23 · **Builds on:** Chapters 3, 4, 5

**Purpose.** The five loads and the load path that carries each of them to the ground. This chapter is the center of the structural half of the course.

**MicroSims in this chapter:**

- [Riverbend Load Path Tracer](../../sims/riverbend-load-path-tracer/index.md) (p5.js; Bloom's: Analyze, Evaluate; status: built)
- [Riverbend Structural System Explorer](../../sims/riverbend-structural-system-explorer/index.md) (p5.js; Bloom's: Remember, Understand; status: built)
- [Tributary Area and Load Takedown Calculator](../../sims/tributary-area-roof-takedown-calculator/index.md) (p5.js; Bloom's: Apply, Understand; status: built)

**In-class activity.** Have students trace one load from the roof to the soil on the Riverbend Load Path Tracer, then compute a joist and girder load with the Tributary Area calculator. Ask where the lateral path is.

**Watch for.** Assuming a gravity path also resists wind. A building can carry gravity perfectly and fail sideways. Also, snow and roof live load are not added to each other in combinations.


### Chapter 7: Wood and Steel Framing

[Open the chapter](../../chapters/07-wood-steel-framing/index.md) · [Quiz](../../chapters/07-wood-steel-framing/quiz.md) · [References](../../chapters/07-wood-steel-framing/references.md)

**Concepts:** 18 · **Quiz questions:** 18 · **Builds on:** Chapters 1, 4, 6

**Purpose.** Wood, engineered wood, and steel as framing materials, and how light-frame construction gets its redundancy.

**MicroSims in this chapter:**

- [Platform Framing Assembly Explorer](../../sims/platform-framing-assembly-explorer/index.md) (p5.js; Bloom's: Remember, Understand; status: built)
- [Steel Shape Comparison Explorer](../../sims/steel-shape-comparison-explorer/index.md) (p5.js; Bloom's: Analyze, Understand; status: built)
- [Wood Moisture and Shrinkage Calculator](../../sims/wood-moisture-shrinkage-calculator/index.md) (Chart.js; Bloom's: Understand, Apply; status: built)

**In-class activity.** Walk the Platform Framing Assembly Explorer from sill to roof, then use the Wood Moisture and Shrinkage Calculator on a board that dries from 19 percent to 12 percent. Compare shapes in the Steel Shape Comparison Explorer.

**Watch for.** Nominal versus actual dimensions in calculations, and the moisture content reference (oven-dry weight, not wet weight).


### Chapter 8: Concrete and Masonry

[Open the chapter](../../chapters/08-concrete-masonry/index.md) · [Quiz](../../chapters/08-concrete-masonry/quiz.md) · [References](../../chapters/08-concrete-masonry/references.md)

**Concepts:** 23 · **Quiz questions:** 23 · **Builds on:** Chapters 1, 5, 6

**Purpose.** Concrete as a mix of cement, water, and aggregate that gains strength by hydration, and masonry as units plus mortar plus grout.

**MicroSims in this chapter:**

- [Concrete Composition and Strength Gain Explorer](../../sims/concrete-composition-strength-gain-explorer/index.md) (Chart.js; Bloom's: Understand, Apply; status: built)
- [Masonry Wall Assembly Explorer](../../sims/masonry-wall-assembly-explorer/index.md) (p5.js; Bloom's: Remember, Analyze; status: built)
- [Reinforced Concrete Beam Behavior Explorer](../../sims/reinforced-concrete-beam-behavior-explorer/index.md) (p5.js; Bloom's: Understand, Apply; status: built)
- [Water-Cement Ratio Explorer](../../sims/water-cement-ratio-explorer/index.md) (p5.js; Bloom's: Apply, Evaluate; status: built)

**In-class activity.** Use the Concrete Composition and Strength Gain Explorer to show the curve over 28 days, then ask the class to defend the mix choice when a crew wants to add water at the chute.

**Watch for.** Water added for workability. The water-cement ratio is the most influential property of the mix, and adding water raises it. Also remind students that hydration needs moisture, which is the reason for curing.


### Chapter 9: Site Work, Soils, and Groundwater

[Open the chapter](../../chapters/09-site-soils/index.md) · [Quiz](../../chapters/09-site-soils/quiz.md) · [References](../../chapters/09-site-soils/references.md)

**Concepts:** 11 · **Quiz questions:** 11 · **Builds on:** Chapters 1, 2, 3, 4, 5

**Purpose.** Site analysis, soil classification, groundwater, and frost. The chapter moves students from assumptions about the ground to data about it.

**MicroSims in this chapter:**

- [Bearing Capacity and Footing Size Explorer](../../sims/soil-bearing-footing-area-explorer/index.md) (p5.js; Bloom's: Apply, Analyze; status: built)
- [Frost Heave Three-Condition Explorer](../../sims/frost-heave-three-conditions/index.md) (p5.js; Bloom's: Understand; status: built)
- [Site Analysis Layer Explorer](../../sims/site-analysis-layer-explorer/index.md) (p5.js; Bloom's: Analyze; status: built)
- [USCS Soil Classifier](../../sims/uscs-soil-classifier/index.md) (p5.js; Bloom's: Apply, Understand; status: built)

**In-class activity.** Give each pair a short boring log and have them classify the soil, then size a footing from a load and an allowable bearing pressure. The Bearing Capacity and Footing Size Explorer is the intended tool.

**Watch for.** Treating the soil as a given. Weaker soil does not change the load. It increases the footing area, because area is load divided by allowable bearing capacity.


### Chapter 10: Foundation Systems

[Open the chapter](../../chapters/10-foundation-systems/index.md) · [Quiz](../../chapters/10-foundation-systems/quiz.md) · [References](../../chapters/10-foundation-systems/references.md)

**Concepts:** 15 · **Quiz questions:** 15 · **Builds on:** Chapters 6, 8, 9

**Purpose.** Shallow and deep foundations, walls, slabs, and retaining walls, with the Minnesota frost depth as the controlling local constraint.

**MicroSims in this chapter:**

- [Basement Wall Soil Pressure Explorer](../../sims/foundation-wall-lateral-pressure-explorer/index.md) (p5.js; Bloom's: Apply, Analyze; status: built)
- [Foundation Cross-Section Explorer](../../sims/foundation-cross-section-explorer/index.md) (p5.js; Bloom's: Remember, Understand; status: built)
- [Foundation Type Selector](../../sims/foundation-type-selector/index.md) (p5.js; Bloom's: Evaluate; status: built)

**In-class activity.** Have students sketch a foundation cross-section from memory, then compare it with the Foundation Cross-Section Explorer. Ask why a "shallow" footing in Minnesota is still about 42 inches down.

**Watch for.** Confusing shallow with near the surface. Shallow means bearing on the soil near the structure rather than on piles, and frost depth still sets how far down it sits.


### Chapter 11: Enclosure Control Layers and Insulation

[Open the chapter](../../chapters/11-enclosure-insulation/index.md) · [Quiz](../../chapters/11-enclosure-insulation/quiz.md) · [References](../../chapters/11-enclosure-insulation/references.md)

**Concepts:** 20 · **Quiz questions:** 20 · **Builds on:** Chapters 1, 3, 4, 7, 9, 10

**Purpose.** The four control layers (water, air, vapor, heat), their order in a cold climate, and the insulation materials that provide thermal control.

**MicroSims in this chapter:**

- [Control Layer Wall Section Explorer](../../sims/control-layer-wall-section-explorer/index.md) (p5.js; Bloom's: Remember, Understand; status: built)
- [Enclosure Heat Loss Component Explorer](../../sims/enclosure-heat-loss-component-explorer/index.md) (Chart.js; Bloom's: Analyze, Evaluate; status: built)
- [Insulation R-Value and Thickness Comparison](../../sims/insulation-r-per-inch-thickness-chart/index.md) (Chart.js; Bloom's: Analyze, Evaluate; status: built)

**In-class activity.** Give students a blank wall section and the Control Layer Wall Section Explorer. They place each layer, then check where the sheathing sits relative to the insulation and why it must stay dry and warm.

**Watch for.** Assuming each layer needs its own material. One material can serve more than one layer, but each of the four functions must be continuous.


### Chapter 12: Cladding, Windows, Doors, and Air Sealing

[Open the chapter](../../chapters/12-cladding-windows-air-sealing/index.md) · [Quiz](../../chapters/12-cladding-windows-air-sealing/quiz.md) · [References](../../chapters/12-cladding-windows-air-sealing/references.md)

**Concepts:** 19 · **Quiz questions:** 19 · **Builds on:** Chapters 1, 3, 4, 5, 6, 8, 11

**Purpose.** Cladding, flashing, windows, doors, and air sealing: the details where most enclosure leaks start.

**MicroSims in this chapter:**

- [Air Sealing and Blower Door Explorer](../../sims/air-sealing-blower-door-explorer/index.md) (p5.js; Bloom's: Apply, Evaluate; status: built)
- [Cladding Rainscreen Water Path Explorer](../../sims/cladding-rainscreen-water-path-explorer/index.md) (p5.js; Bloom's: Analyze, Understand; status: built)
- [Sealant Joint Movement Calculator](../../sims/sealant-joint-movement-calculator/index.md) (p5.js; Bloom's: Apply; status: built)
- [Window Flashing Sequence Explorer](../../sims/window-flashing-sequence-explorer/index.md) (p5.js; Bloom's: Apply, Evaluate; status: built)
- [Window Performance Explorer](../../sims/window-glazing-surface-temperature-explorer/index.md) (p5.js; Bloom's: Analyze, Evaluate; status: built)

**In-class activity.** Use the Window Flashing Sequence Explorer to build a flashing order, then ask which step breaks if one lap is reversed. Compare outcomes in the Cladding Rainscreen Water Path Explorer.

**Watch for.** Using caulk as a substitute for flashing. The chapter treats caulk as a backup. Also note that cladding weight adds to the line load on the foundation.


### Chapter 13: Roof Assemblies

[Open the chapter](../../chapters/13-roof-assemblies/index.md) · [Quiz](../../chapters/13-roof-assemblies/quiz.md) · [References](../../chapters/13-roof-assemblies/references.md)

**Concepts:** 10 · **Quiz questions:** 10 · **Builds on:** Chapters 3, 4, 7, 11

**Purpose.** Roofs as systems of layers, with water shedding, drainage, ventilation, and ice dams.

**MicroSims in this chapter:**

- [Ice Dam Formation Explorer](../../sims/ice-dam-formation-explorer/index.md) (p5.js; Bloom's: Analyze; status: built)
- [Roof Assembly Layer Explorer](../../sims/roof-assembly-layer-explorer/index.md) (p5.js; Bloom's: Remember, Understand; status: built)
- [Roof Drainage and Ponding Calculator](../../sims/roof-drainage-ponding-calculator/index.md) (p5.js; Bloom's: Apply, Understand; status: built)

**In-class activity.** Run the Ice Dam Formation Explorer for a heated attic in January, then connect the result back to Chapters 4 and 11: air leakage and missing insulation melt snow from below.

**Watch for.** Thinking of a roof as a single material. Most failures occur at joints between layers, at flashing, and at penetrations.


### Chapter 14: HVAC, Plumbing, and Fire Protection Systems

[Open the chapter](../../chapters/14-hvac-plumbing-fire/index.md) · [Quiz](../../chapters/14-hvac-plumbing-fire/quiz.md) · [References](../../chapters/14-hvac-plumbing-fire/references.md)

**Concepts:** 25 · **Quiz questions:** 25 · **Builds on:** Chapters 1, 3, 4, 5, 9, 10, 13

**Purpose.** HVAC, plumbing, and fire protection as responses to the enclosure. The enclosure sets the loads, and the loads size the equipment.

**MicroSims in this chapter:**

- [Fire Protection Layers Building Explorer](../../sims/fire-protection-layers-building-explorer/index.md) (p5.js; Bloom's: Understand; status: built)
- [Heating Load and Ventilation Explorer](../../sims/hvac-heating-load-ventilation-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Heating System Energy Comparison](../../sims/heating-system-energy-comparison/index.md) (Chart.js; Bloom's: Analyze, Understand; status: built)
- [Plumbing Supply and DWV Explorer](../../sims/plumbing-supply-dwv-explorer/index.md) (p5.js; Bloom's: TBD; status: built)

**In-class activity.** Size a space heater against a simple heat loss using the Heating Load and Ventilation Explorer, then explain what oversizing does to cycling and humidity control.

**Watch for.** "Bigger is safer." Oversized equipment short cycles and controls humidity poorly. Also keep AFUE and COP straight: heat pump COP falls as outdoor temperature drops.


### Chapter 15: Electrical Fundamentals and Building Service

[Open the chapter](../../chapters/15-electrical-fundamentals/index.md) · [Quiz](../../chapters/15-electrical-fundamentals/quiz.md) · [References](../../chapters/15-electrical-fundamentals/references.md)

**Concepts:** 17 · **Quiz questions:** 17 · **Builds on:** Chapters 1

**Purpose.** Voltage, current, resistance, power, and how electricity reaches a building. This chapter feeds the electrical designer thread of the course.

**MicroSims in this chapter:**

- [AC Waveform and Transmission Loss Explorer](../../sims/ac-waveform-transmission-loss-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Circuit Breaker and Continuous Load Explorer](../../sims/circuit-breaker-continuous-load-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Electric Circuit and Water Analogy Explorer](../../sims/electrical-circuit-water-analogy-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Electrical Service Path Explorer](../../sims/electrical-service-path-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Voltage, Current, and Resistance Explorer](../../sims/ohms-law-power-wire-explorer/index.md) (p5.js; Bloom's: TBD; status: built)

**In-class activity.** Use the Electric Circuit and Water Analogy Explorer to map pressure, flow, and resistance, then work one voltage drop problem and one I-squared-R heating problem.

**Watch for.** Treating voltage and current as interchangeable. Doubling current quadruples wire heating (\( I^2 R \)), which is why larger conductors are the usual remedy for long runs.


### Chapter 16: Electrical Distribution, Lighting, and Design Team Coordination

[Open the chapter](../../chapters/16-electrical-distribution-design/index.md) · [Quiz](../../chapters/16-electrical-distribution-design/quiz.md) · [References](../../chapters/16-electrical-distribution-design/references.md)

**Concepts:** 23 · **Quiz questions:** 23 · **Builds on:** Chapters 1, 2, 3, 6, 14, 15

**Purpose.** Wiring, lighting, and low-voltage systems, and how the electrical designer coordinates with structural and mechanical disciplines through each phase.

**MicroSims in this chapter:**

- [Ceiling Coordination Clash Explorer](../../sims/ceiling-coordination-clash-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Electrical Design Phase Timeline](../../sims/electrical-design-phase-responsibility-timeline/index.md) (vis-timeline; Bloom's: TBD; status: built)
- [Lighting Lumen Method Calculator](../../sims/lighting-lumen-method-calculator/index.md) (p5.js; Bloom's: TBD; status: built)
- [One-Line Diagram Symbol Explorer](../../sims/one-line-diagram-symbol-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Service Headroom for Solar and EV Loads](../../sims/service-headroom-ev-pv-explorer/index.md) (Chart.js; Bloom's: TBD; status: built)

**In-class activity.** Run the Ceiling Coordination Clash Explorer and ask which trade should move and why. Then work a short service-size problem: list loads, convert to VA, apply demand factors, and round up to a standard size.

**Watch for.** Sizing from connected load. Service size follows demand load. Also remind students that a licensed engineer is responsible where the law requires one.


### Chapter 17: Building Codes, Permits, and Enforcement

[Open the chapter](../../chapters/17-building-codes-permits/index.md) · [Quiz](../../chapters/17-building-codes-permits/quiz.md) · [References](../../chapters/17-building-codes-permits/references.md)

**Concepts:** 20 · **Quiz questions:** 20 · **Builds on:** Chapters 1, 2, 5, 9, 14, 15

**Purpose.** How model codes become law, how the Minnesota State Building Code is administered, and how permits, plan review, and inspection work.

**MicroSims in this chapter:**

- [Code Adoption and Authority Chain](../../sims/code-adoption-authority-chain/index.md) (p5.js; Bloom's: TBD; status: built)
- [IBC Question Router](../../sims/ibc-question-router/index.md) (p5.js; Bloom's: Understand, Apply; status: built)
- [Permit-to-Occupancy Flow](../../sims/permit-to-occupancy-flow/index.md) (p5.js; Bloom's: TBD; status: built)

**In-class activity.** Use the IBC Question Router with three real questions (a change of use, a new deck, an addition) and have students name the authority having jurisdiction for each.

**Watch for.** Treating a model code as law. A model code has no legal force until a government adopts it, usually with amendments. Always confirm the edition in force and the local authority at the start of a project.


### Chapter 18: Fire Protection and Life Safety Requirements

[Open the chapter](../../chapters/18-fire-life-safety/index.md) · [Quiz](../../chapters/18-fire-life-safety/quiz.md) · [References](../../chapters/18-fire-life-safety/references.md)

**Concepts:** 11 · **Quiz questions:** 11 · **Builds on:** Chapters 1, 5, 14, 15, 16, 17

**Purpose.** Life safety as layered protection: occupancy, construction type, fire-resistance ratings, egress, and emergency power.

**MicroSims in this chapter:**

- [Egress Time Margin Explorer](../../sims/egress-time-margin-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Glulam Char Section Explorer](../../sims/glulam-char-section-explorer/index.md) (p5.js; Bloom's: TBD; status: built)

**In-class activity.** Have students classify a mixed-use building, then look up how that classification controls exits and sprinklers. Use the Egress Time Margin Explorer to compare available and required safe egress time.

**Watch for.** Applying ratings to materials. Fire-resistance ratings describe assemblies in a standard test. Heavy timber performs by charring and leaving a reduced section.


### Chapter 19: Energy Efficiency and High-Performance Buildings

[Open the chapter](../../chapters/19-energy-efficiency/index.md) · [Quiz](../../chapters/19-energy-efficiency/quiz.md) · [References](../../chapters/19-energy-efficiency/references.md)

**Concepts:** 14 · **Quiz questions:** 14 · **Builds on:** Chapters 1, 3, 11, 12, 13, 14, 16, 17

**Purpose.** Energy codes, passive design, high-performance buildings, and net-zero, built around reduce, then meet efficiently, then control, then supply.

**MicroSims in this chapter:**

- [Insulation Diminishing Returns Explorer](../../sims/insulation-diminishing-returns-explorer/index.md) (Chart.js; Bloom's: TBD; status: built)
- [Net-Zero PV Balance Explorer](../../sims/net-zero-pv-balance-explorer/index.md) (p5.js; Bloom's: TBD; status: built)
- [Sustainability Trade-Off Explorer](../../sims/sustainability-trade-off-explorer/index.md) (Chart.js; Bloom's: TBD; status: built)

**In-class activity.** Use the Insulation Diminishing Returns Explorer to show that doubling R-value does not halve heat loss twice. Then compute operational carbon for the same wall under two electricity grids.

**Watch for.** Adding insulation without limit. Savings follow \( 1/R \), so each added inch saves less than the one before.


### Chapter 20: Sustainable Building Materials

[Open the chapter](../../chapters/20-sustainable-materials/index.md) · [Quiz](../../chapters/20-sustainable-materials/quiz.md) · [References](../../chapters/20-sustainable-materials/references.md)

**Concepts:** 15 · **Quiz questions:** 15 · **Builds on:** Chapters 1, 2, 7, 8, 14, 19

**Purpose.** Embodied carbon, life-cycle assessment, and material health as inputs to material choice.

**MicroSims in this chapter:**

- [Embodied Carbon Beam Comparison](../../sims/embodied-carbon-beam-comparison/index.md) (Chart.js; Bloom's: TBD; status: built)
- [Life-Cycle Stage and Boundary Explorer](../../sims/lca-stage-boundary-explorer/index.md) (Chart.js; Bloom's: TBD; status: built)

**In-class activity.** Run the Embodied Carbon Beam Comparison, then change the system boundary in the Life-Cycle Stage and Boundary Explorer and ask why the ranking moved.

**Watch for.** Treating one number as the answer. The system boundary changes the result, so students should state the boundary every time they quote an embodied carbon figure.


### Chapter 21: Durability, Maintenance, and Building Failure

[Open the chapter](../../chapters/21-durability-failure/index.md) · [Quiz](../../chapters/21-durability-failure/quiz.md) · [References](../../chapters/21-durability-failure/references.md)

**Concepts:** 20 · **Quiz questions:** 20 · **Builds on:** Chapters 4, 5, 7, 8, 9, 11, 19, 20

**Purpose.** Service life, maintenance, failure modes, forensics, and reuse. The chapter reuses almost every earlier chapter, so it works well as a capstone.

**MicroSims in this chapter:**

- [Failure Chain Explorer](../../sims/failure-chain-explorer/index.md) (vis-network; Bloom's: TBD; status: built)
- [Forensic Leak Investigation Simulator](../../sims/forensic-leak-investigation-simulator/index.md) (p5.js; Bloom's: TBD; status: built)
- [Service Life Factor Calculator](../../sims/service-life-factor-calculator/index.md) (p5.js; Bloom's: TBD; status: built)

**In-class activity.** Give students a leak scenario and have them build a failure chain in the Failure Chain Explorer before using the Forensic Leak Investigation Simulator. Ask which earlier chapter each link comes from.

**Watch for.** Single-cause thinking. Failures are chains of design, material, construction, maintenance, environment, and use, and water is involved in most enclosure failures.


## Using the MicroSims

### What Is a MicroSim?

A **MicroSim** (short for micro-simulation) is a small interactive model that runs inside a web page. Each one focuses on one concept. Students change a variable with a slider, button, or drop-down and see the result immediately. MicroSims run on any device with a current browser (Chrome, Firefox, Safari, or Edge), and students install nothing.

### How They Appear in a Chapter

Each chapter embeds its MicroSims with an **iframe**, a web technology that shows one web page inside another. You do not need to understand iframes to teach with them. Students see the simulation, a **Run ... Fullscreen** button underneath it, and then a collapsible **specification** block. Click the specification's title to read:

- the **learning objective**, with its Bloom's Taxonomy level,
- the **visual** description of what the simulation shows,
- the **controls** (sliders, buttons, and drop-downs) and their ranges,
- the **interactions** and what changes when a control moves,
- the **colors** and what each one means.

The specifications are useful for lesson planning because they state what the author intended students to learn.

### MicroSim Status and What to Expect

Each MicroSim's lesson page carries a status that paints a colored dot beside it in the left navigation:

| Dot | Status | Meaning | Count |
|-----|--------|---------|------:|
| Red | `scaffold` | A specification exists, but there is no working simulation yet. | 0 |
| Orange | `built` | A working simulation exists and is awaiting the author's review. | 74 |
| Green | `approved` | The author tested it and approved it for learners. | 0 |

Every MicroSim is built and none is approved yet, so each dot is orange for now. Open each simulation you plan to use, move every control through its range, and compare the behavior with the specification under it before you rely on it in class. Dots turn green as the author tests and approves each one.

### Libraries Behind the MicroSims

| Library | Good for | Count |
|---------|----------|------:|
| p5.js | Animated diagrams, drag-and-slide models, calculators | 57 |
| Chart.js | Bar, line, and curve charts | 13 |
| vis-network | Networks of connected items | 2 |
| Plotly | Interactive scientific charts with hover detail | 1 |
| vis-timeline | Timelines | 1 |

You do not need to know these libraries to teach with the book.

### Tips for Teaching with MicroSims

1. **Project one and predict first.** Ask students to write a prediction before you change a slider.
2. **Let students explore for five to ten minutes** on their own devices after the demonstration.
3. **Use the Reset button.** Encourage students to return to the default and try a different case.
4. **Tie it back to the text.** Each simulation sits beside the concept it illustrates, so have students reread the surrounding paragraphs after exploring.
5. **Use the fullscreen button** for projection, because the embedded frame is smaller than the screen.
6. **Internet needed.** The simulations load from the website. For offline use, build the site on your own computer (see [Customizing Your Own Copy](#customizing-your-own-copy)).

### Embedding a MicroSim in Your Own LMS or Web Page

You can place any MicroSim in a **learning management system** (LMS, such as Canvas, Moodle, or Schoology), a Google Site, or any web page. Paste one line of HTML:

```html
<iframe src="https://dmccreary.github.io/science-of-the-built-envrionment/sims/YOUR-MICROSIM-NAME/main.html"
        width="100%" height="500px" scrolling="no"></iframe>
```

Replace `YOUR-MICROSIM-NAME` with the folder name from the [MicroSims list](../../sims/index.md). Each MicroSim's lesson page shows the exact line, with the right height, so copy it from there.

## Using the Quizzes

Each chapter has a quiz page with one multiple-choice question for every concept in the chapter, 380 questions in all. Each question has four lettered options. Under it, a collapsed **Show Answer** block gives the correct letter, an explanation of why the other options fail, the concept tested, and a link back to the section of the chapter that teaches it.

### How the Quizzes Work

- Students reach a quiz from the **Quiz** link under the chapter in the left navigation.
- The quizzes are **not graded by the website**. Students check themselves by revealing the answer. They are formative tools, not a gradebook.
- Because each question names its concept and links to the section, a missed question tells a student exactly where to reread.

### Tips

- **Exit ticket**: have students answer five questions at the end of class and share which ones surprised them.
- **Diagnostic**: assign the quiz before the chapter to find out what students already know.
- **Pair discussion**: have partners argue for an option before revealing the answer.
- **Test bank**: you may reuse the questions in your own graded tests, because they are openly licensed (see [License](#understanding-the-license)). The `docs/learning-graph/quiz-bank.json` file in the repository holds the questions in a form that scripts can read.

!!! note "Quizzes and academic honesty"
    Answers are one click away on the public site. If you give a graded test from this bank, put it in your LMS with your own copy of the questions and change the order of the options.

## Using the Glossary

The [glossary](../../glossary.md) holds 380 terms, one for each concept in the learning graph, in alphabetical order. Each entry has a definition, usually an example, and often a reference.

- **Vocabulary preview**: before a chapter, have students look up its terms.
- **Matching**: give a handout of definitions and have students match them to terms.
- **Student definitions**: after reading, have students write their own definitions and compare them to the glossary.
- **Search**: the site search bar at the top of every page also finds glossary terms.

## Using the FAQ

The [FAQ](../../faq.md) has 100 questions in 6 categories: Getting Started, Core Concepts, Technical Details, Common Challenges, Best Practices, and Advanced Topics.

- **Discussion starters**: choose two or three questions and have students answer before they read the response.
- **Homework support**: point students to it when they are stuck outside class.
- **Review**: the Common Challenges and Best Practice categories work well as exam review.

## Using the References

Each chapter has an **Annotated References** page with exactly ten sources, each with a one- or two-sentence note on why it matters:

- three **Wikipedia** articles,
- two **textbooks**, credited to the authors known for an especially clear or influential explanation of a concept in the chapter (listed without links, since book links break),
- five **online resources** from reputable sources such as the Building America Solution Center, Building Science Corporation, the U.S. Department of Energy, and Minnesota state agencies.

A **link** that stops working is called **link rot**. If a reference link breaks, search the title on the source's own site, or look the address up in the [Wayback Machine](https://web.archive.org/), then report it (see [Feedback](#feedback-and-reporting-problems)). Check the Minnesota agency links at the start of each term, because state sites reorganize often.

## Using the Posters and the Story

The [Poster Gallery](../../posters/index.md) has 20 **interactive infographic posters** that show big systems ideas on one page, such as the Perfect Wall's four control layers, the six shearing layers of a building, and the building as a chimney. Students open a poster, hover or click a region to read it, and then switch to **Quiz** mode. Posters work well as a first-day hook, a chapter opener, or a review station.


The [Stories](../../stories/index.md) section has 12 graphic novel stories, each following a person or an idea that shaped how we understand buildings, from the builders of Hagia Sophia and Brunelleschi's dome to Emily Roebling, Fazlur Khan, and Christopher Alexander. They suit a short reading or discussion at the start of a class, and they connect to chapter topics such as structure, earthquakes, bridges, and why places feel the way they do. A [story ideas](../../stories/story-ideas.md) page lists more that the author is considering.

## The Learning Graph

### What Is a Learning Graph?

A **learning graph** is a map of the concepts in the book and which concepts depend on which. It is a **DAG** (directed acyclic graph), a diagram in which arrows point from a concept to the concepts it requires and no chain of arrows loops back on itself. This book's graph has 380 concepts.

Open the [Learning Graph Viewer](../../sims/graph-viewer/index.md) to explore it. Concepts are colored by category, and you can search for a concept and see what it depends on.

### How to Use It

- **Prerequisite check**: before teaching a concept, look up what it depends on and check that your students have those.
- **Remediation**: when a student struggles, trace the concept's dependencies to find the real gap.
- **Curriculum mapping**: compare the concept list to your own syllabus to find coverage gaps.
- **Enrichment**: advanced students can follow the arrows forward to see where a concept leads.

The other files in this section ([Concept Taxonomy](../concept-taxonomy.md), [Graph Quality Analysis](../quality-metrics.md), and the quiz, FAQ, and glossary reports) describe how the book was built and checked. They are for the curious instructor and are not needed to teach.

## Beau, the Pedagogical Agent

A **pedagogical agent** is a character who appears in a learning resource to guide the learner. Research suggests such characters improve engagement and learners' perception of learning, a result called the **persona effect**.

This book's agent is **Beau the Beaver**, a builder in a safety-orange hard hat and tool belt. Beau talks in plain jobsite language, calls students "builders" or "apprentices," and uses the catchphrase "Let's build it right!" Beau appears in short colored callouts, between four and eight times in each chapter. The callout types are:

| Type | Purpose |
|------|---------|
| Welcome | Opens the chapter. |
| Thinking | Highlights a key idea. |
| Tip | Gives practical advice. |
| Warning | Flags a common mistake. |
| Encourage | Supports students on harder material. |
| Celebration | Closes the chapter. |

Beau's callouts are never placed back to back. In class, you can read a Warning callout aloud as a discussion prompt, and point students to an Encourage callout when they are stuck. This guide itself does not use Beau. The character sheet is at `docs/img/mascot/character-sheet.md` in the repository.

## Assessment Ideas

The quizzes check recall and understanding. For the higher Bloom's levels, use tasks like these:

| Bloom's level | Task | Chapters it suits |
|---------------|------|-------------------|
| Apply | Work a load path, a footing size, a wall R-value, or a service size from given data. | 3, 6, 9, 10, 11, 16 |
| Analyze | Read a wall section and name each control layer and its job. | 4, 11, 12 |
| Analyze | Trace a leak or crack back through a chain of causes. | 12, 13, 21 |
| Evaluate | Choose between two foundation types or two insulation systems and defend the choice with evidence. | 5, 10, 11, 19, 20 |
| Evaluate | Compare two materials on cost, performance, and embodied carbon, and state the system boundary. | 5, 20 |
| Create | Produce a one-page design brief for a small Minnesota building that cites the relevant codes. | 17, 18, 19 |

### Suggested Course Structure

One grading scheme that fits the pacing plan: weekly quiz checkpoints (ungraded or lightly graded), two exams (midterm in week 8, final in finals week) built from the quiz bank, one Chapter 21 capstone in which students analyze a real or case-study failure, and one design brief. Weight them to suit your program.

## Cold-Climate and Minnesota Notes

The examples use Minneapolis conditions. If you teach elsewhere, replace these first: the 42-inch frost depth in Chapter 10, the snow loads in Chapter 6, the heating-degree-day figures in Chapter 19, and every code reference in Chapters 17 and 18.

!!! warning "Verify the code edition"
    Codes change on a cycle of several years, and Minnesota adopts new editions on its own schedule. The book says to confirm the edition in force and the authority having jurisdiction at the start of every project. Do the same before you teach Chapters 17 to 19, and update any figures that have changed.

## Accessibility and Devices

- The site is a standard web page and works on laptops, tablets, and phones, but wide diagrams and MicroSims read best on a laptop or a projector.
- Use the fullscreen button on MicroSims when you project.
- Pages are structured with headings, so a screen reader can jump between sections. If a student cannot use a particular simulation, the specification text beneath it states what it shows, and the surrounding chapter text carries the same concept.
- Tell us about any accessibility problem you find (see [Feedback](#feedback-and-reporting-problems)).

## Feedback and Reporting Problems

The book is an open-source project on **GitHub**, a website where software and writing projects are developed in the open. You do not need to know how to program to report a problem.

A **GitHub Issue** is like a support ticket: a numbered, public note that reports a bug, asks a question, or suggests a change. To file one:

1. Go to the repository: [dmccreary/science-of-the-built-envrionment](https://github.com/dmccreary/science-of-the-built-envrionment).
2. Click the **Issues** tab, then the green **New issue** button.
3. Give it a clear title, such as "Broken link in Chapter 12 references."
4. Say which page, what you expected, and what you saw, plus your browser and device if it matters.
5. Click **Submit new issue**.

You need a free GitHub account to file an issue. If you would rather not make one, use the [Contact](../../contact.md) page. Welcome feedback includes typos and errors, broken links, MicroSims that do not load, topics to add, and accessibility problems.

## Understanding the License

A **license** is a legal document that says what others may do with a work. A **Creative Commons** (CC) license is a standard, plain-language license common in education. This book uses **CC BY-NC-SA 4.0**:

| Code | Name | What it means |
|------|------|---------------|
| **BY** | Attribution | You must credit the author, Dan McCreary. |
| **NC** | Non-Commercial | You may not use it to make money. |
| **SA** | Share-Alike | If you adapt it, you must share your version under the same license. |
| **4.0** | Version | The current version of the license. |

**You can:** use the book in your course, share the link, print chapters, change or reorder content, translate it, and build a derived book.

**You cannot:** sell it or charge for access, remove the attribution, relicense an adapted version under different terms, or present it as your own work.

See the [License](../../license.md) page for the full terms. If you want to use the book in a way the license does not allow, such as a paid course, contact the author first.

## Customizing Your Own Copy

You can make a copy of the book, change it, and publish it as your own site. This section assumes no experience with the tools.

### Terms You Will See

- **Repository (repo)**: a project's folder on GitHub, holding all its files.
- **Git**: a tool that records every change to the files in a repository.
- **Fork**: a copy of a repository stored in your own GitHub account.
- **Clone**: a copy of a repository stored on your own computer.
- **MkDocs**: the program that turns the book's text files into a website. This book uses the Material theme for MkDocs.
- **Markdown**: a simple way to format text in a plain file. `**bold**` makes **bold**, a line starting with `#` is a heading, and a line starting with `-` is a bullet.
- **mkdocs.yml**: the configuration file that sets the site title, navigation, colors, and features.

### Step 1: Fork or Clone

To **fork**, sign in to [github.com](https://github.com), open the repository, and click **Fork** at the top right. To **clone**, install [Git](https://git-scm.com/) and run this in a terminal:

```bash
git clone https://github.com/dmccreary/science-of-the-built-envrionment.git
```

### Step 2: Edit

The content lives in the `docs/` folder as Markdown files. You can edit them in any text editor. To change the site title, description, or author, edit these lines in `mkdocs.yml`:

```yaml
site_name: 'Your Custom Title'
site_description: 'Your description'
site_author: 'Your Name'
site_url: 'https://YOUR-USERNAME.github.io/your-repo-name/'
```

The colors are set under `theme.palette`. This book uses `green` as the primary color and `amber` as the accent. Replace them with any Material color name, such as `blue`, `teal`, or `deep orange`.

The navigation is the `nav:` block in `mkdocs.yml`. Every page must be listed in it, or readers will not see the page, and a strict build will fail. To remove a chapter, delete its `nav:` entries and its folder.

### Step 3: Preview on Your Computer

Install Python from [python.org](https://python.org), then install the tools and start the preview:

```bash
pip install mkdocs mkdocs-material
mkdocs serve
```

Open `http://127.0.0.1:8000/science-of-the-built-envrionment/` in a browser. The page refreshes when you save a file. To check for broken links before publishing, run:

```bash
mkdocs build --strict
```

### Step 4: Publish

To publish your copy as a free website on **GitHub Pages**:

```bash
mkdocs gh-deploy
```

The site appears at `https://YOUR-USERNAME.github.io/your-repo-name/` in a minute or two. Remember that the license requires you to keep the attribution and to share your adapted version under the same license.

## Analytics and Student Data

### Web Analytics

**Web analytics** measures how visitors use a website: which pages they open, for how long, and on what device. For a textbook it shows which chapters students actually read.

!!! warning "Analytics is not turned on yet"
    The `mkdocs.yml` file has a **Google Analytics** section, but it is commented out and no property ID has been set. Nothing is being measured on this site today. If you fork the book and want measurements, set up your own property.

To turn on **Google Analytics**, a free service from Google:

1. Go to [analytics.google.com](https://analytics.google.com/) and sign in.
2. Create a **property** (Google's word for a tracked website) and a web data stream for your site address.
3. Copy the **Measurement ID**, which looks like `G-XXXXXXXXXX`.
4. In `mkdocs.yml`, remove the comment marks and set the ID:

```yaml
extra:
  analytics:
    provider: google
    property: G-YOUR-MEASUREMENT-ID
```

5. Rebuild and deploy. Data begins to appear within a day or two.

What you can learn: the most and least visited chapters, the time spent on a page, the split between phones and computers, and what people search for on the site. Google Analytics reports aggregate visits, not named students.

### xAPI and Learning Record Stores (Advanced)

**xAPI** (Experience API) is a standard for recording detailed learning events, such as "the student moved this slider" or "the student answered question 3." A **Learning Record Store** (LRS) is the database that holds those records. This book does not send xAPI events today.

If you add student-level tracking, know the rules first:

- **FERPA** (Family Educational Rights and Privacy Act), a U.S. federal law, protects student education records. Data that identifies a student is covered.
- **COPPA** (Children's Online Privacy Protection Act) restricts data collection from children under 13. Check whether any of your students are under 13 before you collect data.
- **State law**: many U.S. states add their own student-privacy rules.
- **GDPR** (General Data Protection Regulation), the European Union's privacy law, applies if any student is in the EU.

Anonymous page-view analytics is the safest choice. Before you collect anything that identifies a student, talk to your institution's data-privacy officer.

## Frequently Needed Fixes

| Problem | What to try |
|---------|-------------|
| A MicroSim shows only a placeholder box | It is a scaffold, which means the simulation is not built yet. Check the status dot, and use the specification beneath it. |
| A MicroSim is blank | Reload the page, then try another browser. Check that your network allows the site. |
| A link is broken | Search the title on the source's own site, or use the Wayback Machine, then report it. |
| An equation looks like raw symbols | Reload the page. The equations load a small script when the page opens. |
| A forked site shows broken images or links | Make sure `site_url` in `mkdocs.yml` matches your site address. |
| `mkdocs build --strict` fails | Read the first error. It almost always names a page that is missing from `nav:` or a link to a file that does not exist. |

## Where to Go Next

- [Course Description](../../course-description.md): the outcomes and topics the book is built from.
- [List of Chapters](../../chapters/index.md): every chapter and its summary.
- [MicroSims](../../sims/index.md): all 74 simulations by chapter.
- [Learning Graph Viewer](../../sims/graph-viewer/index.md): the concept map.
- [About](../../about.md) and [Contact](../../contact.md): the author and how to reach them.
