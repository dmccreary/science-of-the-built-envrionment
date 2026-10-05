// Drawing Types Explorer MicroSim - plan, elevation, section, and detail views of the same small building, with a quiz on which view answers a question
// CANVAS_HEIGHT: 540
// Bloom Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 240; // x where the quiz score text starts in row 2
let defaultTextSize = 16;

// ---- Small helpers that build drawing shapes (view coordinates, y down) ----
const R = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
const P = (pts, fill, name, tag, o = {}) => ({ k: 'poly', pts, fill, name, tag, ...o });
const L = (pts, col, sw, o = {}) => ({ k: 'line', pts, col, sw, ...o });
const T = (x, y, s, o = {}) => ({ k: 'text', x, y, s, ...o });
const D = (x1, y1, x2, y2, label, o = {}) => ({ k: 'dim', x1, y1, x2, y2, label, ...o });
const arcPts = (cx, cy, r, a0, a1) => {
  const pts = [];
  for (let i = 0; i <= 10; i++) { const a = a0 + (a1 - a0) * i / 10; pts.push([cx + r * Math.cos(a), cy - r * Math.sin(a)]); }
  return pts;
};

// ---- Plan: horizontal cut about 4 ft above the floor, north at top (feet) ----
function buildPlan() {
  const s = [];
  s.push(P(R(0.5, 0.5, 13.5, 15), 'white', 'Living room', 'RM 101'));
  s.push(P(R(14, 0.5, 9.5, 15), 'white', 'Bedroom', 'RM 102'));
  const wall = (x, y, w, h) => s.push(P(R(x, y, w, h), 'dimgray', 'Exterior wall', 'EW-1'));
  wall(0, 0, 5, 0.5); wall(9, 0, 15, 0.5);                       // north wall around window W2
  wall(0, 15.5, 4, 0.5); wall(7, 15.5, 10, 0.5); wall(20, 15.5, 4, 0.5); // south wall around door D1 and window W3
  wall(0, 0, 0.5, 6); wall(0, 10, 0.5, 6); wall(23.5, 0, 0.5, 16);  // west wall around window W1, east wall
  s.push(P(R(13.83, 0.5, 0.34, 5.5), 'gray', 'Interior partition', 'IW-1'));
  s.push(P(R(13.83, 9, 0.34, 6.5), 'gray', 'Interior partition', 'IW-1'));
  const win = { stroke: 'steelblue', sw: 2 };
  s.push(P(R(5, 0, 4, 0.5), 'lightcyan', 'Window', 'W2', { ...win, id: 'w2' }));
  s.push(P(R(17, 15.5, 3, 0.5), 'lightcyan', 'Window', 'W3', { ...win, id: 'w3' }));
  s.push(P(R(0, 6, 0.5, 4), 'lightcyan', 'Window', 'W1', { ...win, id: 'w1' }));
  s.push(P(R(4, 15.5, 3, 0.5), 'burlywood', 'Entry door', 'D1', { id: 'd1' }));
  s.push(P(R(13.83, 6, 0.34, 3), 'burlywood', 'Bedroom door', 'D2', { id: 'd2' }));
  s.push(L(arcPts(4, 15.5, 3, 0, Math.PI / 2), 'gray', 1));       // door swings
  s.push(L([[4, 15.5], [4, 12.5]], 'gray', 1));
  s.push(L(arcPts(14, 9, 3, 0, -Math.PI / 2), 'gray', 1));
  s.push(L([[14, 9], [17, 9]], 'gray', 1));
  s.push(L([[12, -2], [12, 17]], 'firebrick', 2, { dash: true, name: 'Section A cut line (see sheet A5.1)', tag: 'A / A5.1', id: 'cut' }));
  s.push(T(12, -2.9, 'A', { bold: true, col: 'firebrick' }));
  s.push(L([[-2, 2.5], [-2, -0.3], [-2.5, 0.7], [-2, -0.3], [-1.5, 0.7]], 'black', 2, { name: 'North arrow', tag: 'N' }));
  s.push(T(-2, -1.3, 'N', { bold: true }));
  s.push(T(7, 8, 'LIVING')); s.push(T(18.7, 8, 'BEDROOM'));
  s.push(T(7, 1.7, 'W2')); s.push(T(1.9, 8, 'W1')); s.push(T(18.5, 14.2, 'W3')); s.push(T(5.6, 11.8, 'D1'));
  s.push(D(0, 18.2, 24, 18.2, '24\'-0"', { name: 'Overall length', tag: '24\'-0"' }));
  s.push(T(12, 22, 'FLOOR PLAN', { bold: true }));
  return s;
}

// ---- Elevation: south face, seen straight on (feet; floor level y = 14) ----
function buildElevation() {
  const s = [];
  s.push(P(R(-4, 14.67, 32, 2.5), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(0, 14, 24, 0.67), 'lightgray', 'Concrete foundation', 'FDN', { hatch: 'dots', id: 'fdn' }));
  s.push(L([[0, 14.67], [0, 18.17], [24, 18.17], [24, 14.67]], 'dimgray', 1, { dash: true, name: 'Foundation below grade (hidden line)', tag: 'FDN', id: 'fdn' }));
  s.push(P(R(0, 5, 24, 9), 'wheat', 'Lap siding', 'SD-1', { hatch: 'horiz', id: 'siding' }));
  s.push(P(R(-1, 0, 26, 5.3), 'slategray', 'Asphalt shingle roof', 'RF-1', { hatch: 'diag' }));
  s.push(P(R(4, 7.3, 3, 6.7), 'saddlebrown', 'Entry door', 'D1', { id: 'd1' }));
  s.push(P(R(17, 7, 3, 4), 'lightcyan', 'Window', 'W3', { stroke: 'steelblue', sw: 2, id: 'w3' }));
  s.push(L([[18.5, 7], [18.5, 11]], 'steelblue', 1));
  s.push(L([[-4, 14.67], [28, 14.67]], 'black', 2, { name: 'Finish grade', tag: 'FG' }));
  s.push(D(21.2, 11, 21.2, 14, '3\'-0"', { name: 'Window sill height above floor', tag: '3\'-0"', id: 'w3sill' }));
  s.push(D(21.2, 7, 21.2, 11, '4\'-0"', { name: 'Window height', tag: '4\'-0"', id: 'w3sill' }));
  s.push(D(26.5, 0, 26.5, 14, '14\'-0"', { name: 'Floor to ridge height', tag: '14\'-0"', id: 'ridge' }));
  s.push(T(12, 19.6, 'SOUTH ELEVATION', { bold: true }));
  return s;
}

// ---- Section A: vertical cut across the building; wall layers drawn larger than true scale (feet) ----
function buildSection() {
  const s = [];
  const yLow = x => 5.575 - 0.575 * (min(x, 16 - x) + 1);   // underside of the roof at x
  s.push(P(R(-5, 14.67, 5, 4.7), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(1, 14.83, 14, 4.54), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(16, 14.67, 5, 4.7), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(0, 14, 1, 4.17), 'lightgray', 'Concrete frost wall', 'FDN', { hatch: 'dots', id: 'fdn' }));
  s.push(P(R(15, 14, 1, 4.17), 'lightgray', 'Concrete frost wall', 'FDN', { hatch: 'dots', id: 'fdn' }));
  s.push(P(R(-0.5, 18.17, 2, 0.6), 'lightgray', 'Concrete footing', 'FTG', { hatch: 'dots', id: 'fdn' }));
  s.push(P(R(14.5, 18.17, 2, 0.6), 'lightgray', 'Concrete footing', 'FTG', { hatch: 'dots', id: 'fdn' }));
  s.push(P(R(1, 14.33, 14, 0.5), 'darkgray', 'Gravel base', 'GR', { hatch: 'diag' }));
  s.push(P(R(1, 14, 14, 0.33), 'lightgray', 'Concrete slab', 'SL-1', { hatch: 'dots' }));
  for (const side of [0, 1]) {
    const m = side ? 16 : 0, f = side ? -1 : 1;                   // mirror the layers for the far wall
    const layer = (a, w, fill, name, tag, o) => s.push(P(R(side ? m - a - w : a, 5, w, 9), fill, name, tag, o));
    layer(0, 0.15, 'wheat', 'Siding', 'SD-1', { id: 'siding' });
    layer(0.15, 0.15, 'tan', 'Wall sheathing', 'SH-1');
    layer(0.3, 0.55, 'khaki', 'Wall insulation', 'INS-1', { hatch: 'zig', id: 'wallins' });
    layer(0.85, 0.15, 'gainsboro', 'Gypsum board', 'GB-1');
  }
  s.push(P([[-1, 5.075], [8, -0.1], [17, 5.075], [17, 5.575], [8, 0.4], [-1, 5.575]], 'slategray', 'Roof sheathing and shingles', 'RF-1'));
  s.push(P([[1, 4.9], [1, yLow(1)], [2.2, 4.2], [13.8, 4.2], [15, yLow(15)], [15, 4.9]], 'khaki', 'Attic insulation', 'INS-2', { hatch: 'zig' }));
  s.push(L([[0.5, 4.95], [8, 0.5], [15.5, 4.95]], 'peru', 4, { name: 'Roof truss', tag: 'T-1' }));
  s.push(L([[0.5, 4.95], [15.5, 4.95]], 'peru', 4, { name: 'Roof truss bottom chord', tag: 'T-1' }));
  s.push(P(R(1, 5.1, 14, 0.15), 'gainsboro', 'Ceiling gypsum board', 'GB-1'));
  s.push(L([[-5, 14.67], [0, 14.67]], 'black', 2, { name: 'Finish grade', tag: 'FG' }));
  s.push(L([[16, 14.67], [21, 14.67]], 'black', 2, { name: 'Finish grade', tag: 'FG' }));
  s.push(D(8, 5.25, 8, 14, '9\'-0" clear', { name: 'Floor to ceiling height', tag: '9\'-0"', id: 'ceilingdim' }));
  s.push(D(-1.3, 14.67, -1.3, 18.17, '3\'-6"', { name: 'Foundation depth below grade (illustrative)', tag: '3\'-6"', side: 'left', id: 'fdn' }));
  s.push(T(8, 20.3, 'SECTION A', { bold: true }));
  s.push(T(8, 21.5, 'wall layers drawn larger than true scale', { col: 'dimgray' }));
  return s;
}

// ---- Detail 4: wall to foundation joint (inches; grade at y = 8) ----
function buildDetail() {
  const s = [];
  s.push(P(R(-6, 8, 4, 18), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(-2, 22, 2, 4), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(8, 10, 20, 16), 'tan', 'Soil', null, { hatch: 'diag' }));
  s.push(P(R(8, 4, 20, 6), 'darkgray', 'Gravel base', 'GR', { hatch: 'diag' }));
  s.push(P(R(0, 0, 8, 26), 'lightgray', 'Concrete stem wall', 'FDN', { hatch: 'dots', id: 'stem' }));
  s.push(P(R(8, 0, 20, 4), 'lightgray', 'Concrete slab', 'SL-1', { hatch: 'dots' }));
  s.push(L([[8, 4], [28, 4]], 'black', 3, { name: 'Polyethylene vapor retarder', tag: 'VR' }));
  s.push(P(R(-2, 2, 2, 20), 'lightpink', 'Rigid foam foundation insulation', 'INS-3', { hatch: 'zig', id: 'foam' }));
  s.push(P(R(-0.75, -14, 0.75, 16), 'wheat', 'Lap siding', 'SD-1', { hatch: 'horiz', id: 'siding' }));
  s.push(P(R(0, -14, 0.5, 12.5), 'tan', 'Wall sheathing', 'SH-1'));
  s.push(P(R(0.5, -14, 5.5, 12.5), 'khaki', 'Wall insulation', 'INS-1', { hatch: 'zig' }));
  s.push(P(R(6, -14, 0.5, 12.5), 'gainsboro', 'Gypsum board', 'GB-1'));
  s.push(P(R(0.5, -1.5, 5.5, 1.5), 'peru', 'Pressure-treated sill plate', 'SP-1', { id: 'sill' }));
  s.push(P(R(0.5, -0.2, 5.5, 0.2), 'black', 'Sill sealer gasket', 'SG-1', { id: 'sill' }));
  s.push(L([[3.25, -3.5], [3.25, 12]], 'black', 3, { name: 'Anchor bolt into the stem wall', tag: 'AB-1', id: 'anchor' }));
  s.push(P(R(2.2, -2.4, 2.1, 0.9), 'black', 'Nut and washer', 'AB-1', { id: 'anchor' }));
  s.push(L([[-6, 8], [-2, 8]], 'black', 2, { name: 'Finish grade', tag: 'FG' }));
  s.push(L([[-1, -15], [1, -13], [-1, -11], [1, -9]], 'black', 1, { name: 'Break line (wall continues up)' }));
  s.push(L([[0, 26], [2, 25], [4, 27], [6, 25], [8, 26]], 'black', 1, { name: 'Break line (foundation continues down)' }));
  // callout labels in a column to the right of the drawing (leader line from the part to its label)
  const calls = [['Lap siding', -0.4, -9, -13], ['Wall insulation', 3.2, -6, -8], ['Gypsum board', 6.25, -5, -3], ['Sill plate and sealer', 5, -0.9, 1.5],
    ['Concrete slab', 20, 2, 6], ['Vapor retarder', 24, 4, 10.5], ['Anchor bolt', 3.25, 10, 15], ['Rigid foam insulation', -1, 16, 19.5], ['Concrete stem wall', 4, 22, 24]];
  calls.forEach(c => s.push({ k: 'call', x: c[1], y: c[2], s: c[0], lx: 31, ly: c[3] }));
  s.push(T(14, 29.5, 'DETAIL 4: WALL TO FOUNDATION', { bold: true }));
  s.push(T(14, 33, '3" = 1\'-0" (schematic)', { col: 'dimgray' }));
  return s;
}

// view definitions: bounds [x0, y0, x1, y1], question the view answers, description
const views = {
  Plan: { bounds: [-3.5, -3.8, 25.5, 22.8], build: buildPlan, q: 'What is where?',
    desc: 'A plan is a view from directly above a horizontal cut, about 4 ft above the floor.' },
  Elevation: { bounds: [-4.5, -0.8, 31, 20.4], build: buildElevation, q: 'How does it look, and how tall?',
    desc: 'An elevation is a view of one face of the building, seen straight on, without perspective.' },
  Section: { bounds: [-5.5, -1, 21.5, 22.3], build: buildSection, q: 'How is it layered and connected?',
    desc: 'A section is a view of an imaginary vertical cut through the building, as if it were sliced open.' },
  Detail: { bounds: [-6.5, -16, 52, 34.5], build: buildDetail, q: 'How is this joint built?',
    desc: 'A detail is an enlarged view of a small area, here the wall-to-foundation joint at 3" = 1\'-0".' }
};
const viewNames = ['Plan', 'Elevation', 'Section', 'Detail'];

// Quiz bank: view = correct answer, hi = shape ids highlighted in the correct drawing
const questions = [
  { q: 'Where do you find the thickness of the wall insulation?', view: 'Section', hi: ['wallins'], why: 'A section shows how the layers of a wall fit together, including the insulation.' },
  { q: 'Which view shows where each room and door is located?', view: 'Plan', hi: ['d1', 'd2'], why: 'A plan shows what is where: rooms, walls, doors, and windows.' },
  { q: 'How high above the floor is the bottom of window W3?', view: 'Elevation', hi: ['w3sill'], why: 'An elevation shows window and door heights above the floor.' },
  { q: 'How deep does the foundation go below the ground?', view: 'Section', hi: ['fdn'], why: 'A section reveals foundation depths because it cuts through the ground.' },
  { q: 'How is the sill plate sealed against the top of the concrete wall?', view: 'Detail', hi: ['sill'], why: 'A detail enlarges a small area to show how a joint is built.' },
  { q: 'What does the south face look like, and what is the siding?', view: 'Elevation', hi: ['siding'], why: 'An elevation shows the appearance and exterior materials of one face.' },
  { q: 'Where is window W1 located in the west wall?', view: 'Plan', hi: ['w1'], why: 'A plan shows the location of each window in its wall.' },
  { q: 'How is the wall anchored to the foundation?', view: 'Detail', hi: ['anchor'], why: 'Connections such as anchor bolts are specified in an enlarged detail.' },
  { q: 'What is the clear height from the floor to the ceiling?', view: 'Section', hi: ['ceilingdim'], why: 'A section shows floor-to-ceiling and floor-to-floor heights.' },
  { q: 'What does the front door look like from outside?', view: 'Elevation', hi: ['d1'], why: 'An elevation shows doors and windows as they appear on a face.' }
];

// ---- State ----
let mode = 'explore';      // 'explore' or 'quiz'
let view = 'Plan';         // view shown in the drawing (null while a quiz question is unanswered)
let animStart = -10000;    // millis() when the current view was chosen (-10000 = animation finished)
let deck = [], qIdx = 0, solved = false, firstTry = true, wrongViews = [];
let scoreCorrect = 0, scoreAnswered = 0;
let isoRect = {}, panelRect = {}, stripRect = {};
let vt = { s: 1, ox: 0, oy: 0 };       // 2D drawing transform
let isoT = { s: 1, ox: 0, oy: 0 };     // isometric transform
let viewShapes = {};                    // built once per view
let hoverShape = null;

// ---- Controls ----
let viewButtons = {}, quizButton, nextButton;
const btnX = { Plan: 10, Elevation: 78, Section: 174, Detail: 260 };
const btnW = { Plan: 60, Elevation: 88, Section: 78, Detail: 68 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  viewNames.forEach(n => { viewShapes[n] = views[n].build(); });

  for (const n of viewNames) {
    const b = createButton(n);
    b.position(btnX[n], drawHeight + 6);
    b.size(btnW[n], 28);
    b.mousePressed(() => chooseView(n));
    viewButtons[n] = b;
  }
  quizButton = createButton('Quiz mode');
  quizButton.position(10, drawHeight + 44);
  quizButton.size(100, 28);
  quizButton.mousePressed(toggleQuiz);
  nextButton = createButton('Next question');
  nextButton.position(118, drawHeight + 44);
  nextButton.size(115, 28);
  nextButton.mousePressed(nextQuestion);
  nextButton.hide();
  shuffleDeck();
  updateButtonStyles();

  describe('A small one-story house drawn as an isometric picture next to a two-dimensional drawing of the same building. Four buttons choose a plan, elevation, section, or detail view; a cutting plane or viewing arrow appears on the house and the matching drawing is shown. Hovering the drawing names each element and its tag. A quiz mode asks which view answers a question and gives immediate feedback.', LABEL);
}

function shuffleDeck() {
  deck = questions.map((_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) { const j = floor(random(i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; }
  qIdx = 0;
  resetQuestion();
}
function resetQuestion() { solved = false; firstTry = true; wrongViews = []; }
function currentQ() { return questions[deck[qIdx]]; }

function chooseView(n) {
  if (mode === 'quiz' && !solved) {
    if (wrongViews.includes(n)) return;
    if (n === currentQ().view) {
      solved = true;
      scoreAnswered++;
      if (firstTry) scoreCorrect++;
      view = n;
      animStart = millis();
    } else {
      wrongViews.push(n);
      firstTry = false;
    }
    updateButtonStyles();
    return;
  }
  view = n;
  animStart = millis();
  updateButtonStyles();
}

function toggleQuiz() {
  if (mode === 'explore') {
    mode = 'quiz';
    quizButton.html('Explore mode');
    nextButton.show();
    resetQuestion();
    view = null;
  } else {
    mode = 'explore';
    quizButton.html('Quiz mode');
    nextButton.hide();
    view = 'Plan';
    animStart = millis();
  }
  updateButtonStyles();
}

function nextQuestion() {
  qIdx = (qIdx + 1) % deck.length;
  resetQuestion();
  view = null;
  updateButtonStyles();
}

// the button for the view on screen is shaded, and bold, so the choice is not shown by color alone
function updateButtonStyles() {
  for (const n of viewNames) {
    const on = view === n;
    viewButtons[n].style('background-color', on ? 'lightsteelblue' : '');
    viewButtons[n].style('font-weight', on ? 'bold' : 'normal');
  }
}

function animT() {
  const t = constrain((millis() - animStart) / 900, 0, 1);
  return t * t * (3 - 2 * t);
}

// ---- Layout: wide = house at left, drawing at right; narrow = house on top, drawing below ----
function layoutAll() {
  if (canvasWidth >= 640) {
    const isoW = floor(canvasWidth * 0.38);
    const h = drawHeight - 44 - 72;
    isoRect = { x: 10, y: 44, w: isoW, h: h };
    panelRect = { x: isoW + 20, y: 44, w: canvasWidth - isoW - 30, h: h };
    stripRect = { x: 10, y: drawHeight - 66, w: canvasWidth - 20, h: 58 };
  } else {
    isoRect = { x: 10, y: 38, w: canvasWidth - 20, h: 150 };
    panelRect = { x: 10, y: 192, w: canvasWidth - 20, h: 192 };
    stripRect = { x: 10, y: 388, w: canvasWidth - 20, h: 68 };
  }
  // isometric transform: the building spans X -13.9..20.8 and Y -10..20 (in feet, before scaling)
  const s = min((isoRect.w - 8) / 40, (isoRect.h - 8) / 33);
  isoT = { s: s, ox: isoRect.x + isoRect.w / 2 - 3.5 * s, oy: isoRect.y + isoRect.h / 2 - 5 * s + 1.5 * s };
}

function iso(x, y, z) { return [isoT.ox + (x - y) * 0.866 * isoT.s, isoT.oy + ((x + y) * 0.5 - z) * isoT.s]; }
function isoPoly(pts) { beginShape(); pts.forEach(p => { const q = iso(p[0], p[1], p[2]); vertex(q[0], q[1]); }); endShape(CLOSE); }

function setView2D(v) {
  const b = views[v].bounds;
  const pad = 12;
  const aw = panelRect.w - 2 * pad, ah = panelRect.h - 2 * pad - 14; // leave room for the hover hint
  const s = min(aw / (b[2] - b[0]), ah / (b[3] - b[1]));
  vt = { s: s, ox: panelRect.x + panelRect.w / 2 - (b[0] + b[2]) / 2 * s, oy: panelRect.y + pad + ah / 2 - (b[1] + b[3]) / 2 * s };
}
function vx(x) { return vt.ox + x * vt.s; }
function vy(y) { return vt.oy + y * vt.s; }

function draw() {
  updateCanvasSize();
  layoutAll();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Drawing Types Explorer', canvasWidth / 2, 8);

  drawIso();
  drawPanel();
  drawStrip();
  drawControlLabels();
  cursor(ARROW);
}

// ---- Isometric building: south face (left), east gable face (right), and the cutting plane or arrow ----
function drawIso() {
  const r = isoRect;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(r.x, r.y, r.w, r.h);
  drawingContext.clip();
  strokeWeight(1);
  stroke('gray');
  fill('honeydew');
  isoPoly([[-1.5, -1.5, 0], [25.5, -1.5, 0], [25.5, 17.5, 0], [-1.5, 17.5, 0]]);
  fill('burlywood');
  isoPoly([[24, 16, 0], [24, 0, 0], [24, 0, 9], [24, 8, 14], [24, 16, 9]]);          // east gable face
  fill('wheat');
  isoPoly([[0, 16, 0], [24, 16, 0], [24, 16, 9], [0, 16, 9]]);                         // south face
  fill('slategray');
  isoPoly([[0, 8, 14], [24, 8, 14], [24, 16, 9], [0, 16, 9]]);                         // south roof slope
  fill('saddlebrown');
  isoPoly([[4, 16, 0], [7, 16, 0], [7, 16, 6.67], [4, 16, 6.67]]);                     // door D1
  fill('lightcyan');
  stroke('steelblue');
  strokeWeight(2);
  isoPoly([[17, 16, 3], [20, 16, 3], [20, 16, 7], [17, 16, 7]]);                       // window W3
  strokeWeight(1);

  if (view) drawCutOverlay(view, animT());
  drawingContext.restore();
}

function arrow3d(a, b, col) {
  const p = iso(a[0], a[1], a[2]), q = iso(b[0], b[1], b[2]);
  stroke(col);
  strokeWeight(3);
  line(p[0], p[1], q[0], q[1]);
  const ang = atan2(q[1] - p[1], q[0] - p[0]);
  line(q[0], q[1], q[0] - 10 * cos(ang - 0.5), q[1] - 10 * sin(ang - 0.5));
  line(q[0], q[1], q[0] - 10 * cos(ang + 0.5), q[1] - 10 * sin(ang + 0.5));
  noStroke();
  fill(col);
  circle(p[0], p[1], 9);   // the eye
}

function isoLabel(txt, x, y, z) {
  const p = iso(x, y, z);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  const w = textWidth(txt) + 8;
  fill(255, 255, 255, 220);
  rect(p[0] - w / 2, p[1] - 9, w, 18, 4);
  fill('black');
  text(txt, p[0], p[1]);
}

function drawCutOverlay(v, t) {
  const alpha = 40 + 40 * t;
  if (v === 'Plan') {
    const zc = lerp(17, 4, t);
    fill(255, 140, 0, alpha);
    stroke('darkorange');
    strokeWeight(2);
    isoPoly([[-2, -2, zc], [26, -2, zc], [26, 18, zc], [-2, 18, zc]]);
    arrow3d([12, 8, zc + 9], [12, 8, zc + 1.5], 'darkorange');
    isoLabel('cut 4 ft above floor, view from above', 12, 8, zc + 11);
  } else if (v === 'Elevation') {
    stroke('darkorange');
    strokeWeight(4);
    noFill();
    isoPoly([[0, 16, 0], [24, 16, 0], [24, 16, 9], [0, 16, 9]]);
    arrow3d([12, 16 + lerp(4, 14, 1 - t), 4.5], [12, 16.8, 4.5], 'darkorange');
    isoLabel('view from the south', 12, 16 + lerp(5, 15, 1 - t) + 2, 6.5);
  } else if (v === 'Section') {
    const xc = lerp(28, 12, t);
    fill(255, 140, 0, alpha);
    stroke('darkorange');
    strokeWeight(2);
    isoPoly([[xc, -2, -0.5], [xc, 18, -0.5], [xc, 18, 15.5], [xc, -2, 15.5]]);
    arrow3d([xc + 6, 8, 6], [xc + 1.2, 8, 6], 'darkorange');
    isoLabel('vertical cut, looking west', xc + 6, 8, 8.5);
  } else {
    // detail: ring on the wall-foundation joint with a dashed callout line to the drawing
    const p = iso(12, 16, 0.3);
    noFill();
    stroke('darkorange');
    strokeWeight(3);
    circle(p[0], p[1], lerp(4, 30, t));
    stroke('darkorange');
    strokeWeight(1.5);
    drawingContext.setLineDash([5, 4]);
    const tx = canvasWidth >= 640 ? panelRect.x : p[0];
    const ty = canvasWidth >= 640 ? panelRect.y + panelRect.h / 2 : panelRect.y;
    line(p[0], p[1], lerp(p[0], tx, t), lerp(p[1], ty, t));
    drawingContext.setLineDash([]);
    isoLabel('enlarged detail', 12, 16, 3);
  }
}

// ---- Right panel: the 2D drawing, or the quiz question card ----
function wrapText(str, x, y, w, lead) {
  const words = str.split(' ');
  let ln = '';
  for (const word of words) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { text(ln, x, y); y += lead; ln = word; }
    else ln = t;
  }
  if (ln) { text(ln, x, y); y += lead; }
  return y;
}

function drawPanel() {
  const r = panelRect;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  hoverShape = null;
  if (!view) { drawQuestionCard(); return; }

  setView2D(view);
  const shapes = viewShapes[view];
  const t = animT();
  const showT = constrain((t - 0.55) / 0.45, 0, 1);   // the drawing fades in after the cut or arrow appears
  const quizHi = (mode === 'quiz' && solved) ? currentQ().hi : [];

  if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h && showT > 0.95) hoverShape = findHover(shapes);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(r.x + 1, r.y + 1, r.w - 2, r.h - 2);
  drawingContext.clip();
  drawingContext.globalAlpha = showT;
  for (const sh of shapes) drawShape(sh, sh === hoverShape ? 'navy' : null);
  if (quizHi.length) for (const sh of shapes) if (quizHi.includes(sh.id)) drawShape(sh, 'darkorange', true);
  drawingContext.globalAlpha = 1;
  drawingContext.restore();

  noStroke();
  fill('dimgray');
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text(quizHi.length ? 'Orange outline: the part that answers the question' : 'Hover over the drawing to name an element and its tag', r.x + 8, r.y + r.h - 4);
  if (hoverShape) drawTooltip();
}

function drawQuestionCard() {
  const r = panelRect;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const x = r.x + 12, w = r.w - 24;
  textSize(14);
  fill('dimgray');
  text('Question ' + (qIdx + 1) + ' of ' + deck.length, x, r.y + 10);
  fill('black');
  textSize(18);
  textStyle(BOLD);
  let y = wrapText(currentQ().q, x, r.y + 32, w, 24);
  textStyle(NORMAL);
  textSize(14);
  y = wrapText('Press the view button below that answers the question.', x, y + 6, w, 17);
  if (wrongViews.length) {
    const last = wrongViews[wrongViews.length - 1];
    fill('darkorange');
    textStyle(BOLD);
    y = wrapText('Not the ' + last + '.', x, y + 10, w, 17);
    textStyle(NORMAL);
    fill('black');
    wrapText((last === 'Plan' ? 'A plan' : 'An ' + last.toLowerCase()) + ' answers "' + views[last].q + '" Try another view.', x, y, w, 17);
  }
}

// ---- Drawing shapes ----
function pathOf(pts) {
  drawingContext.beginPath();
  pts.forEach((p, i) => { if (i) drawingContext.lineTo(vx(p[0]), vy(p[1])); else drawingContext.moveTo(vx(p[0]), vy(p[1])); });
  drawingContext.closePath();
}

function drawHatch(pts, type) {
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  pts.forEach(p => { x0 = min(x0, vx(p[0])); x1 = max(x1, vx(p[0])); y0 = min(y0, vy(p[1])); y1 = max(y1, vy(p[1])); });
  drawingContext.save();
  pathOf(pts);
  drawingContext.clip();
  strokeWeight(1);
  stroke('dimgray');
  if (type === 'diag') { for (let k = -(y1 - y0); k < x1 - x0; k += 8) line(x0 + k, y1, x0 + k + (y1 - y0), y0); }
  else if (type === 'horiz') { for (let y = y0 + 4; y < y1; y += 6) line(x0, y, x1, y); }
  else if (type === 'dots') { noStroke(); fill('dimgray'); for (let y = y0 + 4, row = 0; y < y1; y += 7, row++) for (let x = x0 + 3 + (row % 2) * 4; x < x1; x += 8) circle(x, y, 1.8); }
  else if (type === 'zig') { for (let y = y0 + 2; y < y1; y += 8) for (let x = x0; x < x1; x += 6) { line(x, y, x + 3, y + 5); line(x + 3, y + 5, x + 6, y); } }
  drawingContext.restore();
}

function drawShape(sh, outline, bold) {
  if (sh.k === 'poly') {
    if (!outline) {
      stroke(sh.stroke || 'dimgray');
      strokeWeight(sh.sw || 1);
      fill(sh.fill);
      beginShape(); sh.pts.forEach(p => vertex(vx(p[0]), vy(p[1]))); endShape(CLOSE);
      if (sh.hatch) drawHatch(sh.pts, sh.hatch);
    } else {
      noFill();
      stroke(outline);
      strokeWeight(bold ? 4 : 3);
      beginShape(); sh.pts.forEach(p => vertex(vx(p[0]), vy(p[1]))); endShape(CLOSE);
    }
  } else if (sh.k === 'line') {
    noFill();
    stroke(outline || sh.col);
    strokeWeight(outline ? sh.sw + (bold ? 4 : 3) : sh.sw);
    if (sh.dash) drawingContext.setLineDash([6, 4]);
    beginShape(); sh.pts.forEach(p => vertex(vx(p[0]), vy(p[1]))); endShape();
    drawingContext.setLineDash([]);
  } else if (sh.k === 'text') {
    if (outline) return;
    noStroke();
    fill(sh.col || 'black');
    textSize(12);
    textStyle(sh.bold ? BOLD : NORMAL);
    textAlign(sh.align === 'left' ? LEFT : CENTER, CENTER);
    text(sh.s, vx(sh.x), vy(sh.y));
    textStyle(NORMAL);
  } else if (sh.k === 'call') {
    if (outline) return;
    stroke('dimgray');
    strokeWeight(1);
    line(vx(sh.x), vy(sh.y), vx(sh.lx) - 3, vy(sh.ly));
    noStroke();
    fill('black');
    circle(vx(sh.x), vy(sh.y), 4);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(sh.s, vx(sh.lx), vy(sh.ly));
  } else if (sh.k === 'dim') {
    stroke(outline || 'black');
    strokeWeight(outline ? 4 : 1);
    line(vx(sh.x1), vy(sh.y1), vx(sh.x2), vy(sh.y2));
    const horiz = sh.y1 === sh.y2;
    for (const p of [[sh.x1, sh.y1], [sh.x2, sh.y2]]) {
      if (horiz) line(vx(p[0]), vy(p[1]) - 5, vx(p[0]), vy(p[1]) + 5); else line(vx(p[0]) - 5, vy(p[1]), vx(p[0]) + 5, vy(p[1]));
    }
    if (!outline) {
      noStroke();
      fill('black');
      textSize(12);
      if (horiz) { textAlign(CENTER, TOP); text(sh.label, vx((sh.x1 + sh.x2) / 2), vy(sh.y1) + 5); }
      else if (sh.side === 'left') { textAlign(RIGHT, CENTER); text(sh.label, vx(sh.x1) - 7, vy((sh.y1 + sh.y2) / 2)); }
      else { textAlign(LEFT, CENTER); text(sh.label, vx(sh.x1) + 7, vy((sh.y1 + sh.y2) / 2)); }
    }
  }
}

// ---- Hover: topmost named shape under the mouse ----
function pointInPoly(px, py, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = vx(pts[i][0]), yi = vy(pts[i][1]), xj = vx(pts[j][0]), yj = vy(pts[j][1]);
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function distToSeg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : constrain(((px - x1) * dx + (py - y1) * dy) / l2, 0, 1);
  return dist(px, py, x1 + t * dx, y1 + t * dy);
}
function findHover(shapes) {
  for (let i = shapes.length - 1; i >= 0; i--) {
    const sh = shapes[i];
    if (!sh.name) continue;
    if (sh.k === 'poly') {
      const xs = sh.pts.map(p => vx(p[0])), ys = sh.pts.map(p => vy(p[1]));
      // thin shapes get a small pad so that they can be reached
      const pad = 3;
      if (mouseX >= min(...xs) - pad && mouseX <= max(...xs) + pad && mouseY >= min(...ys) - pad && mouseY <= max(...ys) + pad
        && (pointInPoly(mouseX, mouseY, sh.pts) || sh.pts.length === 4)) return sh;
    } else {
      const pts = sh.k === 'dim' ? [[sh.x1, sh.y1], [sh.x2, sh.y2]] : sh.pts;
      for (let k = 0; k < pts.length - 1; k++) {
        if (distToSeg(mouseX, mouseY, vx(pts[k][0]), vy(pts[k][1]), vx(pts[k + 1][0]), vy(pts[k + 1][1])) <= max(5, (sh.sw || 1) / 2 + 2)) return sh;
      }
    }
  }
  return null;
}

function drawTooltip() {
  textSize(14);
  const label = hoverShape.name + (hoverShape.tag ? '  (tag ' + hoverShape.tag + ')' : '');
  const w = min(textWidth(label) + 16, canvasWidth - 12), h = 26;
  const tx = constrain(mouseX + 12, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 6, drawHeight - h - 6);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(label, tx + 8, ty + h / 2);
}

// ---- Bottom strip: what the view is and answers, or quiz feedback ----
function drawStrip() {
  const r = stripRect;
  const q = currentQ();
  const good = mode === 'quiz' && solved;
  stroke(good ? 'seagreen' : 'silver');
  strokeWeight(good ? 3 : 1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  const x = r.x + 10, w = r.w - 20;
  let y = r.y + 6;
  if (mode === 'quiz' && !solved) {
    fill('black');
    y = wrapText('Which view answers the question? First-try score: ' + scoreCorrect + ' of ' + scoreAnswered + '.', x, y, w, 17);
    fill('dimgray');
    wrapText('A wrong answer explains what that view shows. Press Explore mode to leave the quiz.', x, y, w, 17);
  } else if (good) {
    fill('seagreen');
    textStyle(BOLD);
    y = wrapText((firstTry ? 'Correct on the first try: ' : 'Correct: ') + q.view + '.', x, y, w, 17);
    textStyle(NORMAL);
    fill('black');
    wrapText(q.why + ' Press Next question to continue.', x, y, w, 17);
  } else {
    const v = view;
    fill('black');
    textStyle(BOLD);
    y = wrapText(v + ' answers: ' + views[v].q, x, y, w, 17);
    textStyle(NORMAL);
    wrapText(views[v].desc, x, y, w, 17);
  }
  textStyle(NORMAL);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  if (mode === 'quiz') text('Score: ' + scoreCorrect + ' of ' + scoreAnswered, sliderLeftMargin, drawHeight + 58);
  else text('Press a view button', sliderLeftMargin - 100, drawHeight + 58);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
