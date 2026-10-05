# Appendix MicroSim Specifications Session Log

**Skill:** chapter-content-generator v1.11 (specification process), with layered-assembly-infographic considered
**Date:** 2026-10-05
**Scope:** docs/appendices/ (nine appendix pages plus index)

## Reuse check

The search-microsims reuse search was available and run for all 11 candidate specifications. No candidate reached the reuse threshold (best WHAT score for a topically relevant match was below 0.60). Two template-range matches (a solar-cell physics sim and an AI pipeline dashboard) were topically unrelated and were not attached as templates. Four existing sims of this book were embedded as Reused blocks instead.

## Specifications written (status Specified)

| sim-id | Appendix | Type | Library | Bloom |
|---|---|---|---|---|
| heat-pump-cycle-explorer | A | infographic | html | Understand / explain |
| heat-pump-cop-lift-explorer | A | microsim | p5.js | Apply / calculate |
| hrv-effectiveness-frost-explorer | B | microsim | p5.js | Apply / calculate |
| pv-monthly-production-explorer | C | chart | Chart.js | Analyze / examine |
| battery-backup-runtime-explorer | D | microsim | p5.js | Apply / calculate |
| ground-temperature-depth-explorer | E | chart | Plotly | Analyze / examine |
| sensor-to-action-map | F | graph-model | vis-network | Understand / classify |
| co2-ventilation-balance-explorer | F | microsim | p5.js | Apply / calculate |
| clt-warm-roof-assembly-explorer | G | microsim | p5.js | Understand / infer |
| code-editions-building-life-explorer | H | microsim | p5.js | Apply / calculate |
| ai-claim-audit-drill | I | microsim | p5.js | Evaluate / judge |

## Reused (status Reused)

heating-system-energy-comparison (A), glulam-char-section-explorer (G), code-adoption-authority-chain (H), ceiling-coordination-clash-explorer (I).

## Layered assembly

clt-warm-roof-assembly-explorer is written in the layer vocabulary of layered-assembly-infographic. It overlaps in idea with the existing example-low-slope-warm-roof sim but differs in its timber deck, construction-phase rain, and dew-point flag on the deck.

## Checks

Self-check from microsim-specification-rules.md run on every block (required fields, Bloom verb consistency, no layout or build terms, no indentation inside details). mkdocs build --strict clean. validate-chapter-mascots.py clean on all appendix pages.
