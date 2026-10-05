# Learning Graph Update: Appendix Concepts

**Date:** 2026-10-05
**Tools used:** csv-to-json.py v1.05, analyze-graph.py, taxonomy-distribution.py, validate-learning-graph.sh (learning-graph-generator v1.07)

## Summary

- Added 68 concepts (IDs 381 to 448) from the nine appendices, all in a new category, EVOL (Rapidly Evolving Technologies, color DeepPink).
- Each new concept depends only on existing concepts or on lower-numbered new concepts, so the CSV stays in topological order.
- Regenerated learning-graph.json from the CSV (CIS recomputed for all nodes), quality-metrics.md and taxonomy-distribution.md.
- Graph totals: 448 nodes, 727 edges, 13 groups, 0 orphans, no cycles, longest chain 15.
- Metadata version 1.0 to 1.1, date 2026-10-05.

## Not changed

The chapters' "Concepts Covered" tables still show the CIS values from before this update. The glossary, FAQ, quiz bank and the FAQ and glossary quality reports do not yet cover the 68 new concepts.
