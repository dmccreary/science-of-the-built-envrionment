// Example assembly data for the layered-assembly-infographic skill: a low-slope "warm roof" read top to bottom.
// Strict JSON inside the object. Layers are listed from side A (top, outside) to side B (bottom, inside).
const ASSEMBLY = {
  "schema": "layered-assembly/1",
  "kind": "stack",
  "id": "example-low-slope-warm-roof",
  "title": "Low-slope warm roof",
  "direction": "vertical",
  "sideA": "Outside (sky)",
  "sideB": "Inside (room)",
  "caption": "Read the roof from the sky at the top to the room at the bottom. Click a layer to see what it is and why it is there.",
  "drawHeight": 440,
  "chapter": { "number": 13, "title": "Roof Assemblies", "dir": "13-roof-assemblies" },
  "lesson": {
    "description": "Students identify the layers of a low-slope warm roof and predict what happens to rain, air, vapor, and heat when a layer fails.",
    "objective": "Identify the layers of a low-slope warm roof and predict the consequence of removing or puncturing the membrane, vapor retarder, or insulation.",
    "bloom": "Remember, Understand",
    "bloomVerb": "identify, predict",
    "concepts": ["Low-slope roof", "Roof membrane", "Vapor retarder", "Roof insulation"],
    "prerequisites": ["Heat transfer and R-values", "Moisture and air movement"],
    "usage": [
      "Read the roof from the sky (top) to the room (bottom). Each numbered label names a layer.",
      "Click a layer or its label to see what it is and why it is there.",
      "Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it, and watch where the colored dots stop or pass."
    ],
    "activities": ["Predict and test (10 min): before unticking a box, predict which flows will pass, then check."],
    "assessment": ["Name the layer that keeps rain out and the layer that keeps room vapor out of the insulation."]
  },
  "flows": [
    { "id": "water", "name": "Rain", "color": "dodgerblue", "from": "A" },
    { "id": "vapor", "name": "Vapor", "color": "purple", "from": "B" }
  ],
  "layers": [
    { "id": "ballast", "name": "Ballast", "full": "Gravel ballast", "t": 2, "minPx": 18, "material": "gravel",
      "what": "A layer of loose stone on top of the roof.",
      "why": "Holds the membrane down against wind uplift and shields it from sunlight.",
      "risk": "The membrane can lift in wind and ages faster in sunlight.",
      "materials": "Round river gravel, pavers." },
    { "id": "membrane", "name": "Membrane", "full": "Single-ply roof membrane", "t": 0.06, "minPx": 8, "material": "membrane",
      "what": "A continuous waterproof sheet over the whole roof.",
      "why": "Keeps rain out; every seam and penetration must be sealed.",
      "risk": "Rain gets into the insulation and the deck below.",
      "materials": "EPDM, TPO, PVC.",
      "stops": ["water"],
      "effects": { "hole": "Rain passes through the hole and wets the insulation below.", "missing": "With no membrane, rain soaks the insulation and deck." } },
    { "id": "insulation", "name": "Insulation", "full": "Polyiso board insulation, 4 in", "t": 4, "minPx": 30, "material": "rigid",
      "what": "Rigid board laid above the deck.",
      "why": "Keeps the structural deck warm, so room vapor does not condense on it.",
      "risk": "The deck runs cold and can collect condensation.",
      "materials": "Polyisocyanurate, XPS, mineral wool board.",
      "slows": ["vapor"] },
    { "id": "vapor", "name": "Vapor retarder", "full": "Self-adhered vapor retarder", "t": 0.04, "minPx": 8, "material": "membrane",
      "what": "A thin sheet on top of the deck, under the insulation.",
      "why": "Stops warm, humid room air from carrying vapor up into the insulation.",
      "risk": "Vapor reaches the insulation and condenses inside it.",
      "materials": "Self-adhered bituminous sheet, polyethylene.",
      "stops": ["vapor"] },
    { "id": "deck", "name": "Steel deck", "full": "Corrugated steel deck", "t": 1.5, "minPx": 22, "material": "metal",
      "what": "The structural surface of the roof.",
      "why": "Carries the roof loads to the beams below and supports everything above it.",
      "risk": "The roof has no support.",
      "materials": "Steel deck, concrete deck, wood deck." }
  ]
};
