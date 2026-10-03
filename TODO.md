# TODO

Open items for *The Science of the Built Environment*. This file lives at the repo root, outside `docs/`, so it is not published.

## Content checks

- [ ] **Chapter 4: check the neutral pressure plane statement in the Building Pressure and Air Leakage Explorer spec.**

    The spec says: "Sealing the top gaps moves the neutral pressure plane upward and increases the infiltration at the bottom."

    Why it looks wrong: the neutral pressure plane sits closer to the larger leakage openings. Sealing the *top* gaps leaves relatively more leakage area at the bottom, so the plane should move *down*, toward the bottom openings, not up. The second half of the sentence also needs a second look. Sealing reduces the total leakage area, so total infiltration should fall, even though the pressure across the remaining top openings rises.

    Checked so far: the stack-pressure formula and the 19 Pa result for 30 ft at 70 °F inside and −10 °F outside are correct (about 19 Pa).

    To verify against a reference before editing, for example Building Science Corporation BSI-075 "How Do Buildings Stack Up?" or the infiltration chapter of the ASHRAE Handbook of Fundamentals.

    The same sentence appears in four places, so fix them together:

    - `docs/chapters/04-moisture-air-comfort/index.md` (Interactions paragraph of the sim spec, about line 228)
    - `docs/sims/building-pressure-air-leakage-explorer/index.md` (about line 34)
    - `docs/sims/building-pressure-air-leakage-explorer/main.html` (about line 101)
    - `docs/sims/TODO/building-pressure-air-leakage-explorer.json` (the `specification` string)

    Related: the poster `docs/posters/the-building-as-a-chimney/` was written to stay qualitative ("depends on where the leaks are") so it does not contradict the chapter. Once the chapter is corrected, consider whether that poster's neutral-plane marker can say more.
