# FAQ Generator Session Log

**Skill:** faq-generator 1.0
**Date:** 2026-10-03
**Execution mode:** 7 parallel drafting agents (6 chapter/topic groups plus 1 gap-filling pass), then script assembly and validation

## Result

| Metric | Value |
|--------|-------|
| Questions | 100 (Getting Started 12, Core Concepts 28, Technical Details 22, Common Challenges 15, Best Practices 15, Advanced Topics 8) |
| Content completeness | 100/100 (course description 95; 380-concept DAG; 380 glossary terms; about 140,000 words in 21 chapters) |
| Overall quality score | 95/100, computed from the skill rubric by script |
| Concept coverage | 72% (273/380) counting tagged or named concepts; 59% (226/380) tagged only |
| Bloom's deviation from target | 3.4 percentage points total |
| Answers with a link | 100/100 |
| Answers with an example | 91/100 |
| Average answer length | 218 words (all within 100-300) |
| Anchor (`#`) links | 0 |
| Broken links, duplicates, near-duplicates | 0 |

## Files created or changed

- `docs/faq.md` (new): the FAQ, with one `mascot-welcome` and one `mascot-tip` admonition. `validate-chapter-mascots.py` reports no violations.
- `docs/learning-graph/faq-chatbot-training.json` (new): RAG export, 100 entries.
- `docs/learning-graph/faq-quality-report.md` (new)
- `docs/learning-graph/faq-coverage-gaps.md` (new)
- `mkdocs.yml`: added `FAQ: faq.md` before Glossary and the two FAQ reports under Learning Graph. `navigation.tabs` is not present.

## Process notes

- Drafting agents read their chapters in full. Chapter groups: 1-4, 5-8, 9-13, 14-18, 19-21, plus a Getting Started agent that read the course description, README, and index pages.
- A second pass added 6 entries for high-centrality uncovered concepts (Construction Industry, Site Analysis, AC vs DC, Engineered Wood Products, Building Forensics, delivery methods).
- One agent wrote `source_links` without the `docs/` prefix; the assembler normalized them.
- MicroSim status counts drifted while drafting (48 built / 26 scaffold became 49 / 25), so the FAQ states no counts for them.
- `mkdocs build --strict` fails with 116 warnings. All 116 are missing story panel images under `docs/stories/` (for example `panel-03.png`). None come from the FAQ or the new reports. They were not caused by this session and were not fixed.
- Only one dedicated pass was made at fact-checking. A human should spot-check the electrical, code, and structural answers.

## Inconsistencies found in existing content (not fixed)

These came from the drafting agents. The FAQ follows the chapter text, or avoids the disputed point, in each case.

**Chapters**

1. Ch 5 gives the Riverbend 40 ft glulam beams as 12 in. deep; Ch 6 says a 40 ft glulam girder would be about 3 ft deep. Width and reaction agree.
2. Ch 6 seismic example: doubling only the roof does not double V to 17 kips (W = 170 = roof 135 + walls 35, so the roof alone gives W = 305, V = 15.25). V reaches 17 kips only if the whole building weight doubles.
3. Ch 3 and Ch 4 call -3.4 F the "back of the sheathing", but Ch 3's layer table lists it as the cold side of the batt; the table puts the sheathing's cold side at -6.0 F.
4. Ch 3 heading "The R-13 wall that is not R-13" analyzes a path totaling R 15.4 including finishes and air films.
5. Ch 4 says 15 mph wind pressure (about 17 Pa) is comparable to "a few pascals" of stack pressure, but its own stack calculation gives about 19 Pa over the full height.
6. Ch 10 takeaway says backfill water "can more than double the demand"; its example shows about 1.4 times. A stray indented line ("Shafts must be carefully inspected...") follows the pile/pier table.
7. Ch 11 says the effective R 27.7 is derived in the thermal control layer section; it is derived under Continuous Insulation (that section ends at 16.6).
8. Ch 13 treats roofs steeper than about 3:12 as steep-slope but allows asphalt shingles at 2:12.
9. Ch 16 says the fire alarm must be tested and accepted by the fire marshal "(Chapter 18)", but Ch 18 never covers acceptance testing.
10. Ch 14 lists five fire protection jobs; Ch 18 lists six layers. Compatible but not identical.
11. Ch 15 says "a 200 A service" gives 72 kVA without stating the 72,050 VA figure that Ch 16 uses.
12. Ch 20 says "about 5,750 kg" for 4,800 kg of steel at 1.2 kg CO2e/kg; 4,800 x 1.2 = 5,760.
13. Ch 6 gives Riverbend a 20 psf roof live load but uses only dead plus snow (50 psf) in the takedown. This follows the no-add rule but may confuse readers.

**Glossary vs chapters**

14. Soil Bearing Capacity example gives firm clay as about 2,000 psf; Ch 9 and 10 use 1,500 psf for clay and 2,000 psf for sand.
15. Vapor Retarder example calls kraft paper on batts Class III; Ch 11 puts kraft facing in Class II.
16. Electrical Designer is defined as a licensed engineer or qualified designer; Ch 16 says the designer may work under a licensed engineer who takes responsibility.
17. R-Value says a 2x6 wall with R-21 batts "yields a higher rating", which is vague next to Ch 3's point that R-value is not assembly performance.

**Docs and README**

18. `docs/about.md` still has template text in the Audience section.
19. `docs/sims/index.md` is boilerplate with no MicroSim catalog.
20. `README.md` calls Beau "his motto", contradicting the gender-neutral rule, and mentions "12 domain categories" that appear nowhere in the chapter index.
21. `docs/index.md` cites a chapter folder example `01-introduction`; the real folder is `01-intro-terminology`.
22. Chapters describe diagrams as specs ("Status: Specified") and embed no sim iframes yet.
23. The capstone project appears only in `docs/course-description.md`, in no chapter.
24. `docs/sims/graph-viewer/index.md` has no `status:` value.

## Remaining gaps

The one critical gap (CIS 20 or more) and 9 medium gaps are listed in `docs/learning-graph/faq-coverage-gaps.md`.

## Follow-up: fixes applied to the inconsistencies above

Numbers refer to the list in "Inconsistencies found in existing content".

**Fixed**

- 1: Ch 5 glulam beam is now 5-1/8 in. by 36 in., matching Ch 6's "about 3 ft"; the charred-section example is recomputed (73.3 in² of 184.5 in², about 40 percent).
- 2: Ch 6 seismic example now doubles only the roof (W = 305 kips, V = 15.25 kips) and still exceeds wind.
- 3: Ch 3 and Ch 4 now call -3.4 F the inner face of the sheathing (cold side of the insulation); Ch 3 also now gives the gypsum's inside face as about 66 F, as its table does.
- 4: Ch 3 R-13 worked example now explains that 15.4 exceeds the label because other layers add resistance.
- 5: Ch 4 now compares wind pressure to the 19 Pa full-height stack pressure it calculates.
- 6: Ch 10 takeaway restated to the figures in its example; the stray line after the pile/pier table is now a normal paragraph.
- 7: Ch 11 cross-reference now points to the Continuous Insulation section.
- 8: Ch 13 now explains that shingles are allowed down to 2:12 with special underlayment and that 3:12 is a rule of thumb.
- 9: Ch 16 fire alarm acceptance now points to Ch 17 (inspection and certificate of occupancy).
- 10: Ch 18 now says its six layers extend Ch 14's five jobs, and notes that Ch 16 covers the alarm panel.
- 11: Ch 15 service-size example now states the 72,050 VA capacity.
- 12: Not an error. 10,560 lb is about 4,790 kg and 4,790 x 1.2 is about 5,750. Ch 20 now shows 4,790 kg, and the FAQ entry was changed from 5,760 to 5,750.
- 13: Ch 6 load takedown now says snow governs and live load is not added.
- 14: Already resolved; the glossary example already says 1,500 psf.
- 15-17: Glossary Vapor Retarder now says Class II; Electrical Designer now matches Ch 16; R-Value example now states that framing lowers a wall's effective R.
- 18: `docs/about.md` Audience section written from the course description.
- 19: `docs/sims/index.md` now has a catalog of 74 MicroSims grouped by chapter, built from each sim's `metadata.json`.
- 20: README no longer uses "his" for Beau, and the "12 domain categories" wording now says the learning graph's 12 taxonomy categories.
- 21: `docs/index.md` folder example corrected to `01-intro-terminology`.

**Not fixed**

- 22: Chapters still describe diagrams as specifications and embed no sim iframes. Embedding is a large per-chapter change, and many sims are still scaffolds or being edited, so it needs the author's decision.
- 23: The capstone project is still defined only in the course description. The FAQ explains it. Whether to add it to a chapter is the author's call.
- 24: `docs/sims/graph-viewer/index.md` still has no `status:`. It is a viewer tool, not a lesson sim, and statuses must not be advanced automatically.
- Missing story panel images under `docs/stories/` still cause all 116 `mkdocs build --strict` warnings. They need to be generated or the story pages need to drop the image links.
