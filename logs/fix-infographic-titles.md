# Fix: Infographic Overlay Region Titles Too Small

**Date:** 2026-10-04
**Reported on:** `docs/posters/heat-on-the-move/main.html`
**Affects:** every grid-overlay poster with `"showLabels": true` in its `data.json` (10 posters in this book)

## Symptom

On grid-overlay posters, the title chip at the top of each region ("Conduction", "Thermal Bridges", ...) rendered with tiny text and a background barely larger than the text.

## Root cause

Two problems in `docs/sims/shared-libs/grid-overlay.css`:

1. `#image-wrapper` sets `line-height: 0` to remove the inline-image gap. `.zone-chip` inherited it, so the chip's pill background collapsed to its padding.
2. The chip used a fixed `font-size: 11px`, so it stayed tiny regardless of poster width.

## Fix

In `.zone-chip` and `#image-wrapper`:

- `#image-wrapper` gets `container-type: inline-size`.
- The chip sets its own `line-height: 1.25`.
- The font size scales with the poster: `clamp(12px, 2.1cqw, 26px)`. Padding is `0.35em 0.9em`, and `top` is `1.2cqw`.
- The chip has a pill radius, a white border, a box shadow, and a text shadow, so it reads on busy artwork.
- Long labels wrap inside the zone (`width: max-content; max-width: calc(100% - 12px)`, centered, `white-space: normal`). Without this, "Slab Without a Thermal Break" overflowed its narrow zone.

Chips still appear only on hover or click.

## Verification

- Loaded the poster from a temporary local `http.server` and forced all chips visible. All six labels fit inside their zones, and the two long ones wrap to two lines.
- Did not run `mkdocs build --strict` (CSS-only change).
- Did not inspect the other nine `showLabels: true` posters; they share the CSS and should be spot-checked.

## Skill update (so new posters do not regress)

Fixed in `~/projects/ibook-skills` (the `microsim-generator` skill):

| File | Change |
|------|--------|
| `skills/microsim-generator/assets/infographic-overlay/shared-libs/grid-overlay.css` | Same CSS fix; this is the file new books copy |
| `docs/sims/shared-libs/grid-overlay.css` | Same fix, kept in sync |
| `skills/microsim-generator/references/infographic-overlay-guide.md` | Note on the chip's sizing rules, plus a Common Pitfalls entry with a browser check for chip overflow |

Not changed: `skills/archived/interactive-infographic-overlay/` (archived).

## Follow-ups

- Books that copied `grid-overlay.css` earlier keep the old chip styling until the new file is copied over.
- The ibook-skills changes are uncommitted in that repo.
