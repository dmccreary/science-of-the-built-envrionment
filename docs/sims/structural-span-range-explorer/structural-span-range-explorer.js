// Example data for the range-explorer skill: how far can each framing system span?
// The data below must stay strict JSON (double-quoted keys and strings, no comments, no trailing commas).
// The span ranges are ILLUSTRATIVE teaching values, not design data: they ignore load, deflection, and code checks.
const RANGES = {
  "schema": "range-explorer/1",
  "id": "structural-span-range-explorer",
  "title": "Structural span ranges",
  "caption": "Drag the red marker or use the slider. Bars that reach your span stay dark. Light bar: possible. Dark bar: typical. Values are illustrative.",
  "axis": { "label": "Span", "unit": "ft", "min": 0, "max": 120, "step": 1, "start": 24, "si": { "unit": "m", "factor": 0.3048, "digits": 1 } },
  "groups": [
    { "id": "wood", "name": "Wood", "color": "#b8860b" },
    { "id": "steel", "name": "Steel", "color": "#4a78a8" },
    { "id": "concrete", "name": "Concrete", "color": "#7a7a7a" }
  ],
  "marks": [
    { "value": 16, "label": "Riverbend joist, 16 ft" },
    { "value": 40, "label": "Riverbend girder, 40 ft" }
  ],
  "chapter": { "number": 7, "title": "Wood and Steel Framing", "dir": "07-wood-steel-framing" },
  "lesson": {
    "description": "Students set a span and see which framing systems can reach it, which are in their typical range, and which are possible but unusual.",
    "objective": "Select the framing systems that can span a given distance, and explain why a longer span usually means a deeper, costlier, or more specialized system.",
    "bloom": "Understand, Apply",
    "bloomVerb": "select, explain",
    "concepts": ["Joists", "Beams and girders", "Trusses", "Engineered wood", "Span"],
    "prerequisites": ["Chapter 6 loads and load paths"],
    "usage": [
      "Move the slider, or drag the red marker in the chart, to a span you care about. The headline counts how many systems reach it.",
      "Look at the dark bars first. A system in its typical range is an ordinary choice; one in the light part of its bar is possible but unusual and usually costs more.",
      "Click a system's name to read what it is, why you would choose it, and what to watch out for.",
      "Untick Wood, Steel, or Concrete to compare one material at a time, and change Sort to rank the systems by how far they reach."
    ],
    "activities": [
      "Predict and test (10 min): before using the chart, list which systems you think can carry the 40 ft Riverbend girder, then check.",
      "Compare (10 min): find the span at which wood framing stops being typical and steel takes over. Explain what changes for the building at that point.",
      "Apply (10 min): choose a floor system for a 28 ft clear span with ducts running through it and justify the choice."
    ],
    "assessment": [
      "Name three systems that can span 40 ft and say which are typical at that span.",
      "Explain in two sentences why a sawn lumber joist cannot be the answer for a 30 ft span."
    ],
    "references": [
      { "title": "Beam (structure) (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Beam_(structure)" },
      { "title": "Truss (Wikipedia)", "url": "https://en.wikipedia.org/wiki/Truss" }
    ]
  },
  "currency": {
    "asOf": "2026-10",
    "timeless": [
      "Deflection grows with the fourth power of the span, so doubling a span needs far more depth or stiffness.",
      "Longer spans trade simple, cheap members for deeper, engineered, or prefabricated ones."
    ],
    "ages": [
      { "item": "Every span range on the chart", "basis": "Illustrative round numbers from general design references; the chapters do not give them", "check": "Use the manufacturer's span tables or an engineer's calculation for a real project" },
      { "item": "Which systems exist as stock products", "basis": "Common products at the time of writing", "check": "Confirm availability and depth limits with local suppliers" }
    ]
  },
  "items": [
    { "id": "sawn-joist", "name": "Sawn lumber joists", "group": "wood", "range": [6, 20], "typical": [8, 16],
      "what": "Solid lumber joists such as 2x10 or 2x12 set 12 to 24 in. apart.",
      "why": "They are inexpensive and easy to cut and fit on site.",
      "limit": "Depth and span are limited, and notches and holes have strict limits." },
    { "id": "i-joist", "name": "I-joists", "group": "wood", "range": [10, 36], "typical": [12, 26],
      "what": "Engineered joists with plywood or OSB webs between solid or laminated flanges.",
      "why": "They are light and uniform and reach farther than sawn joists of the same depth.",
      "limit": "Flanges must not be cut, and holes in the web are limited." },
    { "id": "wood-truss", "name": "Wood trusses", "group": "wood", "range": [12, 80], "typical": [20, 60],
      "what": "Prefabricated frames of short members joined into triangles, used for floors and roofs.",
      "why": "Floor trusses give long spans with room for ducts and pipes in the web.",
      "limit": "They cannot be field-cut, and they must be coordinated before delivery." },
    { "id": "lvl", "name": "LVL beams", "group": "wood", "range": [6, 40], "typical": [8, 28],
      "what": "Laminated veneer lumber beams made of thin veneers glued with the grain running one way.",
      "why": "They are stronger and straighter than sawn beams and work well as headers and girders.",
      "limit": "They are heavier and costlier than sawn lumber, and the supply is limited at the longest spans." },
    { "id": "glulam", "name": "Glulam beams", "group": "wood", "range": [10, 100], "typical": [16, 60],
      "what": "Glued laminated timber beams built up from layers of lumber.",
      "why": "They span far, can be shaped, and can be left exposed as a finish.",
      "limit": "They need protection from moisture, and the longest members are hard to ship." },
    { "id": "w-beam", "name": "Steel beams (W shapes)", "group": "steel", "range": [8, 80], "typical": [15, 45],
      "what": "Rolled wide-flange steel beams with an I-shaped section.",
      "why": "They are strong and shallow for the span, and erection is fast.",
      "limit": "Steel loses strength in a fire, so it usually needs fire protection." },
    { "id": "steel-joist", "name": "Open-web steel joists", "group": "steel", "range": [8, 100], "typical": [16, 60],
      "what": "Light steel trusses made of chords and web bars, closely spaced under a deck.",
      "why": "They are light and economical for roofs and long floors, with room for services.",
      "limit": "Loads must go at panel points, and they need bridging and fire protection." },
    { "id": "steel-truss", "name": "Steel trusses", "group": "steel", "range": [30, 120], "typical": [40, 100],
      "what": "Large triangulated frames of steel angles, tubes, or shapes.",
      "why": "They cover the longest open spans, such as arenas and large halls.",
      "limit": "They are deep and complex, so they need careful bracing and connection design." },
    { "id": "one-way-slab", "name": "One-way slab on beams", "group": "concrete", "range": [6, 24], "typical": [10, 20],
      "what": "A reinforced concrete slab that spans in one direction between beams or walls.",
      "why": "It is simple to design and form, and it is fire resistant.",
      "limit": "It is heavy, and the beams below add depth to the floor." },
    { "id": "flat-plate", "name": "Flat plate slab", "group": "concrete", "range": [12, 30], "typical": [15, 28],
      "what": "A reinforced concrete slab of constant thickness supported directly on columns.",
      "why": "Its flat underside is quick to form and keeps the floor-to-floor height low.",
      "limit": "Punching shear at the columns limits the span." },
    { "id": "pt-slab", "name": "Post-tensioned slab", "group": "concrete", "range": [16, 45], "typical": [22, 36],
      "what": "A concrete slab with high-strength steel strands tensioned after the concrete hardens.",
      "why": "It spans farther and stays thinner than ordinary reinforced concrete.",
      "limit": "Cutting into it later can sever the tendons, so openings need planning." },
    { "id": "hollow-core", "name": "Hollow-core precast plank", "group": "concrete", "range": [10, 50], "typical": [14, 38],
      "what": "Factory-made prestressed concrete planks with hollow cores to cut weight.",
      "why": "They are quick to erect and need no formwork.",
      "limit": "Openings must be planned before casting, and each plank needs a bearing seat." },
    { "id": "double-tee", "name": "Precast double tees", "group": "concrete", "range": [30, 90], "typical": [40, 70],
      "what": "Precast prestressed members shaped like two T's side by side, used for floors and roofs.",
      "why": "They cover long spans quickly, as in parking structures.",
      "limit": "They are heavy to ship and lift, and the joints between them must be detailed." }
  ]
};
