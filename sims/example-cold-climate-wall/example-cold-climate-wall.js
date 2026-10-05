// Example assembly data for the layered-assembly-infographic skill: a cold-climate exterior wall.
// The data below must stay strict JSON (double-quoted keys and strings, no comments, no trailing commas)
// so that `assembly_tool.py validate` can read it. Comments belong outside the object.
const ASSEMBLY = {
  "schema": "layered-assembly/1",
  "kind": "stack",
  "id": "example-cold-climate-wall",
  "title": "Cold-climate exterior wall",
  "direction": "horizontal",
  "sideA": "Outside",
  "sideB": "Inside",
  "caption": "Read the wall from outside (left) to inside (right). Click a layer to see what it is and why it is there, then break it and watch the flows.",
  "drawHeight": 400,
  "conditions": { "tempA": -10, "tempB": 70, "tempRange": [-20, 40], "dewPoint": 37 },
  "chapter": { "number": 11, "title": "Enclosure Control Layers and Insulation", "dir": "11-enclosure-insulation" },
  "lesson": {
    "description": "Students identify the layers of a cold-climate wall, see which job each layer does, and break layers to predict what happens to rain, air, vapor, and heat.",
    "objective": "Identify the layers of a cold-climate wall and the job each does, and predict the consequence of removing or puncturing each layer.",
    "bloom": "Remember, Understand",
    "bloomVerb": "identify, predict",
    "concepts": ["Control layers", "Weather-resistive barrier", "Air barrier", "Vapor retarder", "Thermal control layer"],
    "prerequisites": ["Heat transfer and R-values", "Moisture and air movement"],
    "usage": [
      "Read the wall from outside (left) to inside (right). Each numbered label names a layer; the gray line under it says which flows it stops.",
      "Click a layer or its label to read what it is, why it is there, and what happens if it fails.",
      "Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it instead. Watch where the colored dots now stop or pass.",
      "Slide Explode to pull the layers apart. Tick Temperature to draw the temperature through the wall; a layer turns red when it falls below the dew point.",
      "Tick Line art for a black-and-white view you can print, and untick Legend to hide the hatch key, which is shown by default."
    ],
    "activities": [
      "Predict and test (10 min): before unticking a box, predict which flows will pass, then check.",
      "Compare (10 min): break the rigid foam and then the stud cavity insulation and compare the heat flow and sheathing temperature."
    ],
    "assessment": [
      "Name the job of each layer and say which layers do more than one.",
      "Explain in two sentences why a hole in the weather-resistive barrier wets the sheathing."
    ],
    "references": [
      { "title": "Building envelope (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Building_envelope" }
    ]
  },
  "flows": [
    { "id": "water", "name": "Rain", "color": "dodgerblue", "from": "A" },
    { "id": "air", "name": "Air", "color": "seagreen", "from": "A" },
    { "id": "vapor", "name": "Vapor", "color": "purple", "from": "B" },
    { "id": "heat", "name": "Heat", "color": "darkorange", "from": "B" }
  ],
  "layers": [
    { "id": "siding", "name": "Siding", "full": "Fiber-cement siding", "t": 0.31, "minPx": 14, "material": "sheet", "r": 0.1,
      "what": "The outer skin of the wall.",
      "why": "Sheds most rain and snow and shields the layers behind it from sun and impact.",
      "risk": "The layers behind take the full weather load and wear out early.",
      "materials": "Fiber cement, wood, vinyl, brick, metal.",
      "slows": ["water"] },
    { "id": "gap", "name": "Drainage gap", "full": "Drainage gap, 3/4 in", "t": 0.75, "minPx": 16, "material": "airspace", "r": 0.45,
      "what": "A thin open space behind the siding.",
      "why": "Lets water that gets past the siding drain away, and lets air dry the wall.",
      "risk": "Water sits on the barrier and the wall dries slowly.",
      "materials": "Furring strips, drainage mat." },
    { "id": "wrb", "name": "WRB", "full": "Weather-resistive barrier", "t": 0.02, "minPx": 6, "material": "membrane", "r": 0.05,
      "what": "A lapped sheet that forms the drainage plane.",
      "why": "Sheds water that gets behind the siding and still lets vapor out.",
      "risk": "Water reaches the sheathing, which dries slowly on the cold side.",
      "materials": "Housewrap, building paper, fluid-applied membrane.",
      "stops": ["water"],
      "effects": { "hole": "Water reaches the sheathing through the hole, for example at an unsealed screw.", "missing": "Water that gets past the siding runs straight to the sheathing." } },
    { "id": "foam", "name": "Rigid foam", "full": "Rigid foam, 2 in XPS", "t": 2, "minPx": 20, "material": "rigid", "r": 10,
      "what": "Continuous insulation over the studs.",
      "why": "Keeps the sheathing warm and dry, and cuts heat loss through the studs.",
      "risk": "Heat flow rises and the cold sheathing is more likely to get wet.",
      "materials": "XPS, EPS, polyiso, mineral wool board.",
      "slows": ["heat", "vapor"] },
    { "id": "osb", "name": "Sheathing", "full": "OSB sheathing, 7/16 in, seams taped", "t": 0.4375, "minPx": 12, "material": "sheet", "r": 0.5, "sensitive": true,
      "what": "The structural skin of the wall; with taped seams it is also the air barrier.",
      "why": "Resists wind and racking loads and stops air leaking through the wall.",
      "risk": "Air carries heat and moisture through the wall, and bracing is lost.",
      "materials": "OSB or plywood with tape, or a sealed membrane.",
      "stops": ["air"] },
    { "id": "batts", "name": "Stud cavity", "full": "Stud cavity with R-20 fiberglass, 5.5 in", "t": 5.5, "minPx": 40, "material": "batt", "r": 20, "rMissing": 1,
      "what": "Insulation filling the space between the studs.",
      "why": "Slows heat flow through the wall. It is not an air barrier.",
      "risk": "Heat flow rises sharply; an empty cavity is only about R-1.",
      "materials": "Fiberglass, mineral wool, cellulose, spray foam.",
      "slows": ["heat"] },
    { "id": "vapor", "name": "Vapor retarder", "full": "Smart vapor retarder membrane", "t": 0.01, "minPx": 6, "material": "membrane", "r": 0,
      "what": "A thin membrane on the warm side of the insulation.",
      "why": "Limits winter vapor diffusion into the wall; a smart one opens up in summer so the wall can dry.",
      "risk": "More vapor reaches the cold sheathing.",
      "materials": "Smart membrane, polyethylene, kraft facing.",
      "stops": ["vapor"] },
    { "id": "gypsum", "name": "Gypsum", "full": "Gypsum board, 1/2 in", "t": 0.5, "minPx": 12, "material": "gypsum", "r": 0.45,
      "what": "The interior finish surface.",
      "why": "Gives a finished room surface and fire protection; painted gypsum slows vapor a little.",
      "risk": "The membrane and insulation are exposed, with no fire protection.",
      "materials": "Gypsum board, 1/2 or 5/8 in, painted.",
      "slows": ["vapor"] }
  ]
};
