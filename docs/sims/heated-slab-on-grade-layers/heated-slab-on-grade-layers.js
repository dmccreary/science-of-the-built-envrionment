// Heated slab-on-grade layers for Chapter 10 (Foundation Systems). Read top to bottom: room above, ground below.
// Strict JSON inside the object. Layers are listed from side A (top, heated room) to side B (bottom, ground).
// All R-values and the temperatures are illustrative teaching values; see the notes in report.md.
const ASSEMBLY = {
  "schema": "layered-assembly/1",
  "kind": "stack",
  "id": "heated-slab-on-grade-layers",
  "title": "Heated slab on grade",
  "direction": "vertical",
  "sideA": "Heated room",
  "sideB": "Ground",
  "caption": "Ground water and vapor rise from below; heat from the slab sinks down. Click a layer, then untick its checkbox to leave it out. Numbers are illustrative and the model ignores slab edges.",
  "drawHeight": 460,
  "conditions": {
    "tempA": 80,
    "tempB": 40,
    "tempRange": [60, 95],
    "rFilmA": 0,
    "rFilmB": 0
  },
  "chapter": { "number": 10, "title": "Foundation Systems", "dir": "10-foundation-systems" },
  "lesson": {
    "description": "Students identify the layers under and in a heated slab on grade and predict how ground water, water vapor, and heat move when the gravel, vapor retarder, or foam is left out.",
    "objective": "Identify the layers under and in a heated slab-on-grade floor and predict what happens to ground water, vapor, and heat when the vapor retarder or the foam is left out.",
    "bloom": "Remember, Understand",
    "bloomVerb": "identify, predict",
    "concepts": ["Slab-on-grade", "Granular base", "Capillary break", "Vapor retarder", "Rigid foam insulation"],
    "prerequisites": ["Heat transfer and R-values", "Moisture pathways (capillary action and vapor diffusion)"],
    "usage": [
      "Read the floor from the heated room at the top down to the ground at the bottom. Each numbered label names a layer.",
      "Click a layer or its label to see what it is, why it is there, and what goes wrong without it.",
      "Untick a layer's checkbox to leave that layer out, or choose Punch a hole first to puncture it. Watch where the blue (ground water), purple (vapor), and orange (heat) dots stop or pass.",
      "Tick Temperature and drag the slider to see how much of the temperature drop the foam takes. Use Explode to separate the layers so thin ones are easy to see."
    ],
    "activities": [
      "Predict and test (10 min): before unticking any box, write which flows each of the five constructed layers (everything above the soil) stops. Then break the vapor retarder, then the foam, and compare your prediction with the status line.",
      "Redundancy (5 min): break the gravel alone, then the vapor retarder alone, then both. Explain why ground water only reaches the slab when both are gone.",
      "Cost of leaving out the foam (5 min): turn on Temperature, then break the foam. Compare where the red line bends and how far the underside of the slab cools with and without foam."
    ],
    "assessment": [
      "Which layer is the capillary break, and what does the vapor retarder do that the break cannot?",
      "A crew skips the foam under a radiant slab. Describe where the heat goes and what the homeowner notices.",
      "The foam slows some vapor, but it is not a substitute for the polyethylene sheet. Explain why in your own words.",
      "Why does the sand cushion sit directly under the vapor retarder?"
    ],
    "references": [
      { "title": "Concrete slab (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Concrete_slab" },
      { "title": "Capillary action (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Capillary_action" },
      { "title": "Underfloor heating (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Underfloor_heating" }
    ]
  },
  "flows": [
    { "id": "water", "name": "Ground water", "color": "dodgerblue", "from": "B" },
    { "id": "vapor", "name": "Vapor", "color": "purple", "from": "B" },
    { "id": "heat", "name": "Heat", "color": "darkorange", "from": "A" }
  ],
  "layers": [
    { "id": "slab", "name": "Concrete slab", "full": "Heated concrete slab, 4 in", "t": 4, "minPx": 40, "material": "concrete", "r": 0.4,
      "what": "A poured concrete floor, at least 4 in thick, with warm-water tubing set in it.",
      "why": "Carries the floor loads and spreads the heat from the tubing across the room.",
      "risk": "A slab laid on bare ground wicks moisture, stays cold, and wastes heat.",
      "materials": "Normal-weight concrete, welded wire or fiber reinforcement, radiant tubing.",
      "effects": {
        "missing": "With no slab there is no floor. The dots do not change, because the slab itself stops no flow in this model.",
        "hole": "A hole through the slab does not change the dots here, but a crack lets ground moisture reach the floor finish."
      } },
    { "id": "foam", "name": "Rigid foam", "full": "Rigid foam board, 2 in XPS", "t": 2, "minPx": 30, "material": "rigid", "r": 10,
      "slows": ["heat", "vapor"],
      "what": "Extruded polystyrene board laid flat under the whole slab.",
      "why": "Slows heat from the slab so it warms the room instead of the soil.",
      "risk": "Heat flows down into the ground, the floor feels cool, and the heating system runs longer.",
      "materials": "XPS or EPS board rated for compression.",
      "effects": {
        "missing": "With no foam, the slab loses about six times more heat to the ground in this model, and the floor runs cooler.",
        "hole": "Heat and vapor pass through the hole, which makes a cold spot in the floor above it."
      } },
    { "id": "retarder", "name": "Vapor retarder", "full": "Polyethylene vapor retarder, 10 mil", "t": 0.01, "minPx": 8, "material": "membrane",
      "stops": ["water", "vapor"],
      "what": "A thin polyethylene sheet laid flat over the base, with seams overlapped and taped.",
      "why": "Stops ground moisture from moving up into the foam and the slab.",
      "risk": "Moisture reaches the slab and can ruin flooring, adhesives, and coatings.",
      "materials": "Polyethylene sheet, 10 mil or thicker.",
      "effects": {
        "missing": "With no retarder, ground vapor rises through the sand and only the foam slows it, so the slab and floor finish stay damp.",
        "hole": "Vapor passes through the hole and leaves a damp patch in the slab above it."
      } },
    { "id": "sand", "name": "Sand cushion", "full": "Sand cushion, 2 in", "t": 2, "minPx": 18, "material": "sand", "r": 0.2,
      "what": "A thin layer of compacted sand or stone dust over the gravel.",
      "why": "Gives the retarder a smooth bed so sharp stone cannot puncture it.",
      "risk": "Sharp stone can tear the retarder while the slab is poured, and a torn retarder leaks.",
      "materials": "Clean sand, stone dust.",
      "effects": {
        "missing": "The dots do not change here, but the retarder now rests on sharp stone and is easily punctured."
      } },
    { "id": "gravel", "name": "Compacted gravel", "full": "Compacted crushed stone, 4 in", "t": 4, "minPx": 30, "material": "gravel", "r": 0.4,
      "stops": ["water"],
      "what": "Clean crushed stone, compacted in layers over the soil.",
      "why": "Gives even support and breaks the capillary rise of ground water, which cannot climb across large gaps.",
      "risk": "Ground water wicks up toward the slab, and soft spots let the floor settle and crack.",
      "materials": "Washed crushed stone, 3/4 in size.",
      "effects": {
        "missing": "With no gravel, ground water wicks upward by capillary action, and only the vapor retarder is left to stop it.",
        "hole": "Water climbs through the gap, but the vapor retarder above it still stops it."
      } },
    { "id": "soil", "name": "Subgrade soil", "full": "Subgrade soil (top 12 in shown)", "t": 12, "minPx": 40, "material": "earth", "r": 1,
      "what": "The native ground, with topsoil and organic material removed, then compacted.",
      "why": "Supports the slab, and it is also the source of ground moisture and the cold sink for heat.",
      "risk": "Soft or organic soil settles unevenly, and the slab above it cracks.",
      "materials": "Silty sand, clay, gravel.",
      "effects": {
        "missing": "The dots do not change here, but without ground to bear on, the slab and the load it carries have no support."
      } }
  ]
};
