# FAQ Quality Report

Generated: 2026-10-03

## Overall Statistics

- **Total Questions:** 100
- **Overall Quality Score:** 95/100
- **Content Completeness Score:** 100/100 (course description scored 95; valid 380-concept learning graph; 380 glossary terms; about 140,000 words across 21 chapters; every concept has chapter content)
- **Concept Coverage:** 72% (273/380 concepts, counting concepts tagged in an entry or named in its question or answer)
- **Tagged-only coverage:** 226/380 concepts (59%) appear in an entry's `concepts` field

## Category Breakdown

### Getting Started

- Questions: 12
- Bloom's levels: Remember 7, Understand 5
- Avg Word Count: 160

### Core Concepts

- Questions: 28
- Bloom's levels: Remember 5, Understand 11, Apply 9, Analyze 3
- Avg Word Count: 222

### Technical Details

- Questions: 22
- Bloom's levels: Remember 7, Understand 9, Apply 4, Analyze 2
- Avg Word Count: 224

### Common Challenges

- Questions: 15
- Bloom's levels: Remember 1, Understand 4, Apply 6, Analyze 4
- Avg Word Count: 227

### Best Practices

- Questions: 15
- Bloom's levels: Understand 1, Apply 6, Analyze 4, Evaluate 3, Create 1
- Avg Word Count: 229

### Advanced Topics

- Questions: 8
- Bloom's levels: Apply 1, Analyze 2, Evaluate 2, Create 3
- Avg Word Count: 240

## Bloom's Taxonomy Distribution

Target is each category's recommended mix, weighted by that category's question count.

| Level | Actual | Target | Deviation |
|-------|--------|--------|-----------|
| Remember | 20% | 21% | -1% ✓ |
| Understand | 30% | 31% | -1% ✓ |
| Apply | 26% | 26% | +0% ✓ |
| Analyze | 15% | 15% | +0% ✓ |
| Evaluate | 5% | 5% | +0% ✓ |
| Create | 4% | 3% | +1% ✓ |

Total absolute deviation: 3 percentage points. Bloom's score: 25/25.

## Answer Quality Analysis

- **Examples:** 91/100 (91%) - Target: 40%+ ✓
- **Links:** 100/100 (100%) - Target: 60%+ ✓
- **Anchor links (`#`):** 0 - hard requirement ✓
- **Avg Length:** 218 words - Target: 100-300 ✓ (range 146-257; counts exclude link URLs)
- **Complete Answers:** 100/100 (100%) ✓

Answer Quality Score: 25/25

## Concept Coverage

**Covered:** 273 of 380 concepts. The 107 uncovered concepts are listed by priority in [FAQ Coverage Gaps](faq-coverage-gaps.md).

Coverage Score: 25/30

## Organization Quality

- Logical categorization: ✓
- Progressive difficulty: ✓ (entries in a category run from Remember upward; Getting Started keeps a reading order)
- No duplicates: ✓ (exact-match and token-overlap checks both clean)
- Clear questions: ✓ (all end in `?`)

Organization Score: 20/20

## Overall Quality Score: 95/100

- Coverage: 25/30
- Bloom's Distribution: 25/25
- Answer Quality: 25/25
- Organization: 20/20

## Method and Caveats

- Entries were drafted by parallel agents that each read their chapters in full, then merged and checked by script: links resolve, no anchors, no duplicates, concept labels valid, list spacing correct.
- The drafting agents rechecked the arithmetic in each worked example against the chapter figures. A human reviewer should still spot-check the electrical, code, and structural answers.
- The scores above are computed from the skill's rubric by script, not independently judged.
- Mascot use in the FAQ is limited to one welcome and one tip admonition.

## Recommendations

### High Priority

1. Consider an entry on **Weathering** (CIS 22, MATP).
1. Consider an entry on **Panelboards** (CIS 12, ELEC).
1. Consider an entry on **Wall Sheathing** (CIS 10, ENCL).
1. Consider an entry on **Electrical Power** (CIS 10, ELEC).
1. Consider an entry on **Material Testing** (CIS 9, MATP).

### Medium Priority

1. Add more Evaluate and Create questions to Best Practices if the instructor wants more higher-order practice.
2. Re-run this skill after the chapter inconsistencies noted in `logs/faq.md` are fixed, because a few answers follow the chapter text rather than the glossary.

### Low Priority

1. Add entries for leaf concepts in the coverage-gap report as the book grows.
