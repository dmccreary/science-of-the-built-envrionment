// Fire-rated interior partition for Chapter 18. Thicknesses are nominal and illustrative; the chapter does not give a layer list.
// The dots show WHETHER a flow is stopped or slowed, not for how long. No conditions block: fire is a transient event, so a steady-state temperature profile would mislead.
const ASSEMBLY = {
  "schema": "layered-assembly/1",
  "kind": "stack",
  "id": "fire-rated-partition-layer-explorer",
  "title": "Fire-Rated Partition Explorer",
  "direction": "horizontal",
  "sideA": "Fire side",
  "sideB": "Far side",
  "caption": "Fire starts on the left. Dots show whether each flow is stopped or slowed, not how much or for how long; a rating is a time. Thicknesses are illustrative, not a listed design.",
  "drawHeight": 400,
  "chapter": { "number": 18, "title": "Fire Protection and Life Safety Requirements", "dir": "18-fire-life-safety" },
  "lesson": {
    "description": "Students read a one-hour fire-rated partition layer by layer, see which layers stop flame, slow heat, and damp sound, and remove layers to predict what fails first.",
    "objective": "Explain how each layer of a fire-rated partition stops flame, slows heat, or damps sound, and predict which layer's loss weakens the wall most.",
    "bloom": "Understand, Analyze",
    "bloomVerb": "explain, predict",
    "concepts": ["Fire-resistance rating", "Fire separations", "Type X gypsum board", "Assembly versus material", "Firestopping"],
    "prerequisites": ["Fire-resistance ratings (ASTM E119)", "Heat transfer and R-values", "Sound transmission class"],
    "usage": [
      "Read the wall from the fire side (left) to the far side (right). Each numbered label names a layer; the gray line under it says what it stops.",
      "Click a layer or its label to read what it is, why it is there, and what happens if it fails.",
      "Watch the three kinds of dots. Red dots are flame, orange dots are heat, and gold dots are sound. Flame stops at the first intact board; heat and sound are only slowed, so some always reaches the far side.",
      "Untick a layer's checkbox to remove that layer, or choose Punch a hole first to puncture it instead. Read the status line and the layer panel after each change.",
      "Slide Explode to pull the layers apart, and tick Line art for a black-and-white view you can print."
    ],
    "activities": [
      "Predict and test (10 min): before you remove anything, write down which layer you think fails first in a real fire and which one the wall can least afford to lose. Then remove the fire-side boards one at a time, then both, and watch where the flame stops.",
      "Compare (10 min): remove the mineral wool and read its panel. The dots barely change because the boards already stop or slow them; the wool's share is a smaller change in sound level that a dot cannot show. Discuss why a wall can pass a fire test and still sound poor.",
      "Discuss (10 min): the flame dots are still stopped after you remove one board. Why does the wall still lose its rating?"
    ],
    "assessment": [
      "Name the job of each layer, and say which layers help with fire, which with sound, and which with both.",
      "Explain in two sentences why a rating belongs to the whole assembly and not to the gypsum board alone.",
      "A plumber cuts a 4 in hole through both boards on one side and leaves it open. Which flows does the hole help, and what must the trade do to restore the wall?"
    ],
    "references": [
      { "title": "Fire-resistance rating (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Fire-resistance_rating" },
      { "title": "Drywall (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Drywall" },
      { "title": "Sound transmission class (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Sound_transmission_class" }
    ]
  },
  "flows": [
    { "id": "fire", "name": "Flame", "color": "firebrick", "from": "A" },
    { "id": "heat", "name": "Heat", "color": "darkorange", "from": "A" },
    { "id": "sound", "name": "Sound", "color": "goldenrod", "from": "A" }
  ],
  "layers": [
    { "id": "fire-outer", "name": "Fire-side outer", "full": "Type X gypsum board, 5/8 in, fire side outer layer", "t": 0.625, "minPx": 14, "material": "gypsum",
      "what": "The first 5/8 in Type X board, the surface that meets the fire.",
      "why": "Its core holds water that boils off as heat arrives, and glass fibers hold the board together as it cracks.",
      "risk": "Without it the next board takes the heat alone, so the wall burns through sooner.",
      "materials": "Type X gypsum board, 5/8 in, taped joints.",
      "stops": ["fire"], "slows": ["heat", "sound"],
      "effects": {
        "missing": "The inner board still stops flame, but half the fire-side protection is gone, so the wall no longer matches its tested design.",
        "hole": "Flame and heat pass the hole to the inner board, which still stops flame for now. Sound passes freely, and the board no longer matches its tested design."
      } },
    { "id": "fire-inner", "name": "Fire-side inner", "full": "Type X gypsum board, 5/8 in, fire side inner layer", "t": 0.625, "minPx": 14, "material": "gypsum",
      "what": "The second 5/8 in Type X board, fastened to the studs with its joints offset from the outer layer.",
      "why": "Adds mass and more water to boil off, and staggered joints keep a crack in one board from lining up with the next.",
      "risk": "The studs and cavity are exposed to flame once the outer board falls away.",
      "materials": "Type X gypsum board, 5/8 in, screwed to steel studs.",
      "stops": ["fire"], "slows": ["heat", "sound"],
      "effects": {
        "missing": "The outer board still stops flame, but the studs lose their direct cover and this layer's share of the time delay.",
        "hole": "Flame reaches the studs and cavity at the hole. The outer board still shields the rest, but heat and sound find an easy path."
      } },
    { "id": "cavity", "name": "Studs + wool", "full": "Steel studs, 3-5/8 in, with mineral wool", "t": 3.625, "minPx": 40, "material": "batt",
      "what": "Light-gauge steel studs with mineral wool filling the space between them.",
      "why": "The studs hold the boards in place. The wool is noncombustible, slows heat, and absorbs sound inside the cavity.",
      "risk": "Steel loses strength in a hot fire, and an empty cavity lets sound build up and pass through more easily.",
      "materials": "Steel studs, 25 gauge; mineral wool batts.",
      "slows": ["heat", "sound"],
      "effects": {
        "missing": "With an empty cavity, sound passes somewhat more easily and heat crosses the gap a little more freely. Flame is unaffected, because the boards stop it.",
        "hole": "A gap in the wool gives sound and heat a straighter path through the cavity. Flame is still stopped by the boards on either side."
      } },
    { "id": "far-inner", "name": "Far-side inner", "full": "Type X gypsum board, 5/8 in, far side inner layer", "t": 0.625, "minPx": 14, "material": "gypsum",
      "what": "The first 5/8 in Type X board on the side away from the fire.",
      "why": "It is the last barrier to heat and flame if the fire side fails, and it adds mass that blocks sound.",
      "risk": "Fire that gets through the cavity meets only one board between it and the next room.",
      "materials": "Type X gypsum board, 5/8 in, taped joints.",
      "stops": ["fire"], "slows": ["heat", "sound"],
      "effects": {
        "missing": "Flame is still stopped, but only one board remains on the far side and the wall no longer matches its tested design.",
        "hole": "Sound and heat pass the hole easily. The outer board still stops flame, but the assembly no longer matches its tested design."
      } },
    { "id": "far-outer", "name": "Far-side outer", "full": "Type X gypsum board, 5/8 in, far side outer layer", "t": 0.625, "minPx": 14, "material": "gypsum",
      "what": "The outer 5/8 in board on the side away from the fire, the surface people touch.",
      "why": "It keeps flame from entering the next room and holds the unexposed face cool, which is where a fire test measures heat.",
      "risk": "The face runs hotter and may exceed the test limit, even if flame never gets through.",
      "materials": "Type X gypsum board, 5/8 in, painted.",
      "stops": ["fire"], "slows": ["heat", "sound"],
      "effects": {
        "missing": "Flame is still stopped by the inner board, but the face next to the room runs hotter and the wall no longer matches its tested design.",
        "hole": "A hole lets heat and sound into the room. Flame is still stopped by the boards before it, but an open hole is also a path for smoke."
      } }
  ]
};
