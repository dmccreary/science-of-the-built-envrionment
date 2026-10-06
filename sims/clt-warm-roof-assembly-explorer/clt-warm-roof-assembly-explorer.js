// CANVAS_HEIGHT: 905
// Assembly data for the CLT warm roof explorer (Appendix G): a low-slope warm roof on a cross-laminated timber deck, read top to bottom.
// Strict JSON inside the object. Layers are listed from side A (top, outdoors) to side B (bottom, heated room).
// All thicknesses, R-values, the 37 F dew point and the film resistances are illustrative teaching values.
const ASSEMBLY = {
  "schema": "layered-assembly/1",
  "kind": "stack",
  "id": "clt-warm-roof-assembly-explorer",
  "title": "CLT warm roof",
  "direction": "vertical",
  "sideA": "Outdoors",
  "sideB": "Heated room",
  "caption": "Which layer protects the timber from which threat? Click a layer to read its job. Values are illustrative and the temperatures are a steady-state teaching model.",
  "drawHeight": 330,
  "quiz": false,
  "showTitle": false,
  "units": "IP",
  "chapter": { "number": 13, "title": "Roof Assemblies", "dir": "13-roof-assemblies" },
  "lesson": {
    "description": "Students infer what fails when each layer of a cross-laminated timber warm roof is removed, then explore how foam thickness keeps the timber deck above the dew point.",
    "objective": "Infer, for each layer removed from a cross-laminated timber warm roof, which consequence follows for rain, room vapor, or heat flow and the temperature of the timber deck.",
    "bloom": "Understand",
    "bloomVerb": "infer",
    "concepts": ["Warm roof assembly", "Mass timber moisture protection", "Timber charring"],
    "prerequisites": ["Warm roof", "Vapor control layer", "Dew point", "R-value", "Moisture content"],
    "usage": [
      "Read the roof from the outdoors at the top to the heated room at the bottom. Click a layer to read what it is and why it is there.",
      "For each layer in order, choose the consequence you expect if that layer is removed, then press Commit and remove the layer.",
      "Read whether your choice matched, look at where the dots now stop or pass, and press Restore the layer to continue to the next layer.",
      "After the fourth layer the boxes under the drawing unlock. Move the outdoor temperature slider from -20 to 40 degrees F with all layers present, then untick Tapered foam and drag it again."
    ],
    "activities": [
      "Predict and test (10 min): commit a consequence for each of the four layers before removing it, then compare with the result.",
      "Find the threshold (5 min): with the foam removed, find the outdoor temperature below which the deck is flagged, and explain it with the dew point."
    ],
    "assessment": [
      "Name the layer that keeps rain out of the insulation and the layer that keeps room vapor out of it.",
      "Explain why removing the foam, not the membrane, drops the deck below the dew point."
    ],
    "references": [
      { "title": "Cross-laminated timber (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Cross-laminated_timber" },
      { "title": "Dew point (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Dew_point" }
    ]
  },
  "conditions": { "tempA": -10, "tempB": 70, "tempRange": [-20, 40], "dewPoint": 37, "rFilmA": 0.17, "rFilmB": 0.68 },
  "flows": [
    { "id": "rain", "name": "Rain", "color": "dodgerblue", "from": "A" },
    { "id": "vapor", "name": "Room vapor", "color": "purple", "from": "B" },
    { "id": "heat", "name": "Heat", "color": "orangered", "from": "B" }
  ],
  "layers": [
    { "id": "membrane", "name": "Roof membrane", "full": "Single-ply roof membrane", "t": 0.06, "minPx": 8, "material": "membrane",
      "what": "A thin, welded sheet of synthetic rubber or plastic covers the whole roof.",
      "why": "It sheds rain and snowmelt and keeps water out of the insulation.",
      "risk": "A tear lets water into the insulation and onto the wood deck, which dries slowly.",
      "materials": "TPO, PVC, EPDM.",
      "stops": ["rain", "vapor"],
      "effects": { "missing": "Rain reaches the insulation and is stopped only at the vapor control layer.", "hole": "Rain passes through the hole and wets the insulation below." } },
    { "id": "foam", "name": "Tapered foam", "full": "Tapered polyisocyanurate insulation, 5 in", "t": 5, "minPx": 30, "material": "rigid", "r": 28,
      "what": "Rigid foam boards cut to a slope so that water drains toward the roof drains.",
      "why": "It keeps the deck and the vapor control layer below it warm, and it slopes the roof to drain.",
      "risk": "Without it the deck runs cold, vapor condenses on the wood, and the roof loses its slope and ponds water.",
      "materials": "Polyisocyanurate, mineral wool board.",
      "slows": ["heat", "vapor"],
      "effects": { "missing": "Heat loss rises about fourfold and the top of the timber deck falls below the dew point, so the deck is flagged.", "hole": "Heat and vapor pass through the hole; the deck is cold under it." } },
    { "id": "vapor", "name": "Vapor control", "full": "Self-adhered vapor control membrane", "t": 0.06, "minPx": 8, "material": "membrane",
      "what": "A sticky, waterproof sheet bonded directly to the top of the timber deck.",
      "why": "It blocks room moisture from rising into the insulation, and it sheds rain during construction before the roof membrane goes on.",
      "risk": "Moisture reaches the cold side of the insulation, and rain during construction soaks into the panels.",
      "materials": "Self-adhered bituminous or synthetic sheet.",
      "stops": ["vapor", "rain"],
      "effects": { "missing": "Room vapor passes through the deck into the insulation and stops under the roof membrane, where it can condense.", "hole": "Room vapor rises through the hole into the insulation." } },
    { "id": "deck", "name": "CLT deck", "full": "Cross-laminated timber roof deck, 6.875 in", "t": 6.875, "minPx": 40, "material": "wood", "r": 8.6, "sensitive": true,
      "what": "A solid panel of crosswise-glued lumber layers spans between beams and forms the roof structure and the ceiling.",
      "why": "It carries the roof loads and shows as a finished ceiling below.",
      "risk": "Wood that stays wet above about 20 percent moisture content can decay, and a wet panel is slow to dry.",
      "materials": "Cross-laminated timber panels.",
      "slows": ["vapor", "heat"],
      "effects": { "missing": "Heat loss rises about 30 percent and the structure loses its deck, which the drawing cannot show.", "hole": "Vapor and heat pass through the hole in the deck." } }
  ]
};
