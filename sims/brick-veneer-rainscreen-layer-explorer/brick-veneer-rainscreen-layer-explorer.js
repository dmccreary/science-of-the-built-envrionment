// Layered-assembly spec: brick veneer over a drained and vented air gap (chapter 12).
// Four layers only: the framing, insulation, vapor retarder, and interior finish are left out on purpose.
// Thicknesses other than the sheathing are illustrative; see the chapter for the sources.
const ASSEMBLY = {
  "schema": "layered-assembly/1",
  "kind": "stack",
  "id": "brick-veneer-rainscreen-layer-explorer",
  "title": "Brick veneer rainscreen wall",
  "direction": "horizontal",
  "sideA": "Outside",
  "sideB": "Framed wall",
  "caption": "Read the wall from outside (left) to the framed wall (right); the framing, insulation, and interior finish are left out. Dots are schematic and show which layer stops each flow, not how fast it moves. Click a layer, then break it and predict where the rain and the wind-driven air end up.",
  "drawHeight": 400,
  "chapter": { "number": 12, "title": "Cladding, Windows, Doors, and Air Sealing", "dir": "12-cladding-windows-air-sealing" },
  "lesson": {
    "description": "Students trace wind-driven rain and air leakage through four layers of a brick veneer rainscreen wall, then break each layer to predict which one lets water or air reach the sheathing.",
    "objective": "Identify the four layers of a brick veneer wall with a drained air gap, explain the job each does, and predict what reaches the sheathing when a layer is missing or punctured.",
    "bloom": "Understand, Analyze",
    "bloomVerb": "explain, predict",
    "concepts": ["Brick veneer", "Rainscreen", "Weather-resistive barrier", "Air barrier", "Flashing"],
    "prerequisites": ["Control layers (Chapter 11)", "Weather-resistive barrier (Chapter 11)", "Air control layer (Chapter 11)"],
    "usage": [
      "Read the wall from outside (left) to the framed wall (right). Each numbered label names a layer; the gray line under it says what the layer does.",
      "Click a layer or its label to read what it is, why it is there, and what happens if it fails.",
      "Leave Rain and Air ticked and watch the dots. Rain is slowed by the brick, so a few drops reach the gap, and the weather barrier stops all of them. Air passes straight through the brick, the gap, and the barrier until it meets the sheathing.",
      "Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it instead. Read the status line under the title to see where each flow now ends up.",
      "Slide Explode to pull the layers apart, and tick Line art for a black-and-white view you can print."
    ],
    "activities": [
      "Predict and test (10 min): for each of the four layers, predict whether removing it lets rain reach the sheathing, lets air reach the sheathing, both, or neither. Then check.",
      "Compare (10 min): puncture the weather barrier and then the sheathing. Say which hole is a water problem and which is an air problem, and where a real crew would find each one."
    ],
    "assessment": [
      "Explain in two sentences why rain that gets past the brick does not reach the sheathing in this wall.",
      "Name the layer that stops air in this drawing, and say why the brick and the air gap cannot do that job."
    ],
    "references": [
      { "title": "Rainscreen (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Rainscreen" },
      { "title": "Building envelope (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Building_envelope" }
    ]
  },
  "flows": [
    { "id": "water", "name": "Rain", "color": "dodgerblue", "from": "A" },
    { "id": "air", "name": "Air", "color": "seagreen", "from": "A" }
  ],
  "layers": [
    { "id": "brick", "name": "Brick veneer", "full": "Brick veneer, 3 5/8 in", "t": 3.625, "minPx": 40, "material": "masonry",
      "what": "A single layer of brick, tied back to the wall and standing on the foundation.",
      "why": "Sheds most of the rain and sun, but wind can still drive some water through its mortar joints.",
      "risk": "The layers behind take the full weather load, and the wall dries more slowly.",
      "materials": "Clay brick with mortar joints, metal ties, flashing and weep holes at the base.",
      "tag": "slows rain; air passes",
      "slows": ["water"],
      "effects": { "hole": "A cracked joint lets more rain into the gap. The gap and the barrier behind it can still handle it.", "missing": "Rain falls straight on the air gap and the weather barrier, which are not made to take the full load." } },
    { "id": "gap", "name": "Air gap", "full": "Drained and vented air gap, 1 in", "t": 1, "minPx": 24, "material": "airspace",
      "what": "An open space, about 1 in wide, between the brick and the weather barrier.",
      "why": "Lets water that gets past the brick run down to the flashing and out at the weep holes, and lets air carry moisture away.",
      "risk": "Water sits against the barrier, and the wall stays wet.",
      "materials": "Open space kept clear by ties, with a drainage mat or open weeps.",
      "tag": "drains and dries",
      "effects": { "hole": "Mortar droppings or insulation block the gap, so water pools on the flashing and soaks the brick and the barrier.", "missing": "With no gap the brick touches the barrier, and water crosses by capillary action and has no way to drain." } },
    { "id": "wrb", "name": "Weather barrier", "full": "Weather-resistive barrier", "t": 0.02, "minPx": 8, "material": "membrane",
      "what": "A lapped sheet on the face of the sheathing that forms the drainage plane.",
      "why": "Stops the water that crosses the gap and sends it down to the flashing instead of into the sheathing.",
      "risk": "Water reaches the sheathing, which dries slowly and can decay.",
      "materials": "Housewrap, building paper, fluid-applied membrane.",
      "tag": "stops rain",
      "stops": ["water"],
      "effects": { "hole": "Water reaches the sheathing through the hole, for example at an unsealed fastener or a flipped lap.", "missing": "Water that gets past the brick runs straight onto the sheathing." } },
    { "id": "osb", "name": "Sheathing", "full": "OSB sheathing, 7/16 in, seams taped", "t": 0.4375, "minPx": 18, "material": "sheet", "sensitive": true,
      "what": "The structural panel behind the barrier; with taped seams it is also the air control layer.",
      "why": "Stops the wind-driven air that crosses the brick, the gap, and the barrier, and resists wind and racking loads.",
      "risk": "Air carries heat and moisture through the wall, and the panel can decay if it stays wet.",
      "materials": "OSB or plywood with taped seams, or a sealed membrane.",
      "tag": "stops air",
      "stops": ["air"],
      "effects": { "hole": "Air leaks through the gap or open seam and carries heat and moisture into the framed wall.", "missing": "Nothing stops the air, so wind pushes it straight through and the wall leaks." } }
  ]
};
