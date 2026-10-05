// Site Analysis Layer Explorer MicroSim - stack site-constraint layers on the imagined 300 ft by 200 ft Riverbend lot and drag the building
// CANVAS_HEIGHT: 575
// Bloom Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Lot data (feet). x runs west to east, y runs north (0) to south (200); the street is at the south edge ----
const LOT_W = 300, LOT_D = 200;
const SB = { front: 25, rear: 20, side: 10 };           // zoning setbacks from the Chapter 9 worked example
const BLD_W = 120, BLD_D = 75;                          // building footprint: 9,000 ft²
const BLD_HOME = { x: 90, y: 60 };                      // legal default position near the center of the envelope
const ENV = { x0: SB.side, x1: LOT_W - SB.side, y0: SB.rear, y1: LOT_D - SB.front }; // 280 x 155 ft = 43,400 ft²
const EASE = { y0: 148, y1: 168 };                      // sewer easement band across the lot (illustrative)
const WET = { cx: 250, cy: 45, rx: 40, ry: 26 };        // low wet area with peat
const TAP = { x: 230, y: LOT_D };                       // where the building services leave the street
const borings = [
  { id: 'B-1', x: 50, y: 85, soil: 'Glacial till', note: 'Dense till: good bearing and drainage (illustrative).' },
  { id: 'B-2', x: 150, y: 118, soil: 'Silty sand (SM)', note: 'The Riverbend soil from Chapter 9: about 2,000 psf allowable bearing (illustrative).' },
  { id: 'B-3', x: 255, y: 50, soil: 'Peat', note: 'Soft organic soil in the low wet area. It must be removed or bypassed with deep foundations.' },
  { id: 'B-4', x: 268, y: 128, soil: 'Firm clay', note: 'Firm clay: about 1,500 psf allowable bearing, slow settlement (illustrative).' }
];

// ---- Terrain: an elevation function, then contour segments and steep cells computed once ----
const GRID = 5;
let contourSegs = [];  // [x1, y1, x2, y2] in lot feet
let steepCells = [];   // booleans, cell = GRID ft square
let downhill = { x: 0, y: 0 };

function sstep(v, a, b) { const t = constrain((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); }
// elevation in feet: the lot falls gently to the northeast, with a steep bank in the northwest and a low wet spot
function elev(x, y) {
  return 100 + 0.03 * y + 0.01 * (LOT_W - x)
    - 4.5 * (1 - sstep(y, 22, 58)) * (1 - sstep(x, 80, 160))
    - 2 * Math.exp(-(sq(x - WET.cx) / (2 * 40 * 40) + sq(y - WET.cy) / (2 * 25 * 25)));
}
function slopeAt(x, y) {
  const gx = (elev(x + 1, y) - elev(x - 1, y)) / 2, gy = (elev(x, y + 1) - elev(x, y - 1)) / 2;
  return { g: Math.hypot(gx, gy), gx, gy };
}
function buildTerrain() {
  const nx = LOT_W / GRID, ny = LOT_D / GRID;
  contourSegs = [];
  for (let level = 98; level <= 112; level++) {          // 1 ft contour interval
    for (let i = 0; i < nx; i++) for (let j = 0; j < ny; j++) {
      const x = i * GRID, y = j * GRID;
      const c = [[x, y, elev(x, y)], [x + GRID, y, elev(x + GRID, y)], [x + GRID, y + GRID, elev(x + GRID, y + GRID)], [x, y + GRID, elev(x, y + GRID)]];
      const pts = [];
      for (let k = 0; k < 4; k++) {
        const a = c[k], b = c[(k + 1) % 4];
        if ((a[2] - level) * (b[2] - level) < 0) {
          const t = (level - a[2]) / (b[2] - a[2]);
          pts.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
        }
      }
      if (pts.length >= 2) contourSegs.push([pts[0][0], pts[0][1], pts[1][0], pts[1][1]]);
      if (pts.length === 4) contourSegs.push([pts[2][0], pts[2][1], pts[3][0], pts[3][1]]);
    }
  }
  steepCells = [];
  for (let i = 0; i < nx; i++) { steepCells[i] = []; for (let j = 0; j < ny; j++) steepCells[i][j] = slopeAt(i * GRID + GRID / 2, j * GRID + GRID / 2).g > 0.12; }
  const sl = slopeAt(150, 110);
  const m = Math.hypot(sl.gx, sl.gy) || 1;
  downhill = { x: -sl.gx / m, y: -sl.gy / m };
}
function isSteep(x, y) { const i = floor(x / GRID), j = floor(y / GRID); return i >= 0 && j >= 0 && i < LOT_W / GRID && j < LOT_D / GRID && steepCells[i][j]; }

// ---- State ----
let bld = { x: BLD_HOME.x, y: BLD_HOME.y };
let dragging = false, dragDX = 0, dragDY = 0;
let freeArea = 0;
let L = {};       // layout, recomputed every frame
let tip = null;   // current tooltip text

// ---- Controls ----
const layerDefs = [
  { key: 'setbacks', label: 'Setbacks' }, { key: 'contours', label: 'Contours' }, { key: 'borings', label: 'Soil borings' },
  { key: 'climate', label: 'Sun and wind' }, { key: 'utilities', label: 'Utilities' }, { key: 'wet', label: 'Wet area' }
];
let layerBoxes = {};
let resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  layerDefs.forEach(d => {
    layerBoxes[d.key] = createCheckbox(d.label, true);
    layerBoxes[d.key].changed(computeFreeArea);
  });
  resetButton = createButton('Reset building position');
  resetButton.mousePressed(() => { bld = { x: BLD_HOME.x, y: BLD_HOME.y }; });
  positionControls();

  buildTerrain();
  computeFreeArea();
  describe('A plan view of a 300 ft by 200 ft lot with six toggleable layers: setbacks, contour lines, soil borings, sun path and winter wind, utility lines with a sewer easement, and a low wet area. A 120 ft by 75 ft building rectangle can be dragged. Its outline turns red and a message explains the cost when it crosses a setback, the sewer easement, or the wet area. A readout gives the buildable envelope, the building share of it, and the number of constraints overlapped.', LABEL);
}

function positionControls() {
  const colW = (canvasWidth - 20) / 3;
  layerDefs.forEach((d, i) => layerBoxes[d.key].position(10 + (i % 3) * colW, drawHeight + 6 + floor(i / 3) * 35));
  resetButton.position(10, drawHeight + 76);
}
function on(key) { return layerBoxes[key] && layerBoxes[key].checked(); }

// area of the lot left after the visible hard constraints (setbacks, easement, wet area)
function computeFreeArea() {
  let n = 0;
  for (let x = 0; x < LOT_W; x++) for (let y = 0; y < LOT_D; y++) {
    const cx = x + 0.5, cy = y + 0.5;
    if (on('setbacks') && (cx < ENV.x0 || cx > ENV.x1 || cy < ENV.y0 || cy > ENV.y1)) continue;
    if (on('utilities') && cy > EASE.y0 && cy < EASE.y1) continue;
    if (on('wet') && sq((cx - WET.cx) / WET.rx) + sq((cy - WET.cy) / WET.ry) < 1) continue;
    n++;
  }
  freeArea = n;
}

// ---- Constraint tests for the building rectangle ----
function overlapWet(bx, by) {
  const nx = constrain(WET.cx, bx, bx + BLD_W), ny = constrain(WET.cy, by, by + BLD_D);
  return sq((nx - WET.cx) / WET.rx) + sq((ny - WET.cy) / WET.ry) < 1;
}
function steepArea(bx, by) {
  let n = 0;
  for (let x = bx + GRID / 2; x < bx + BLD_W; x += GRID) for (let y = by + GRID / 2; y < by + BLD_D; y += GRID) if (isSteep(x, y)) n += GRID * GRID;
  return n;
}
// returns the list of constraints the building overlaps; hard ones turn the outline red
function checkBuilding() {
  const out = [];
  if (on('setbacks')) {
    const sides = [];
    if (bld.y + BLD_D > ENV.y1) sides.push('front');
    if (bld.y < ENV.y0) sides.push('rear');
    if (bld.x < ENV.x0 || bld.x + BLD_W > ENV.x1) sides.push('side');
    if (sides.length) out.push({ hard: true, name: 'Setback (' + sides.join(', ') + ')', msg: 'Crosses the ' + sides.join(' and ') + ' setback. Cost: a zoning variance, a public hearing, and months of delay.', short: 'Setback: variance, hearing, months of delay.' });
  }
  if (on('utilities') && bld.y + BLD_D > EASE.y0 && bld.y < EASE.y1) out.push({ hard: true, name: 'Sewer easement', msg: 'Sits on the sewer easement. Cost: relocate the sewer line (illustrative: tens of thousands of dollars) or move the building.', short: 'Easement: relocate the sewer or move the building.' });
  if (on('wet') && overlapWet(bld.x, bld.y)) out.push({ hard: true, name: 'Wet area', msg: 'Sits on the wet area and peat. Cost: a wetland permit, peat removal or piles, and a drainage system.', short: 'Wet area: permit, peat removal or piles.' });
  if (on('contours') && steepArea(bld.x, bld.y) >= 200) out.push({ hard: false, name: 'Steep slope', msg: 'Covers a steep slope (over 12 percent). Cost: extra cut and fill and a retaining wall.', short: 'Steep slope: extra grading, retaining wall.' });
  return out;
}
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
function serviceLength() {
  const bottom = bld.y + BLD_D;
  const dx = TAP.x < bld.x ? bld.x - TAP.x : (TAP.x > bld.x + BLD_W ? TAP.x - (bld.x + BLD_W) : 0);
  return round((LOT_D - bottom) + dx);
}

// ---- Layout and coordinate transforms ----
function computeLayout() {
  const wide = canvasWidth >= 640;
  const panelW = wide ? 230 : 0;
  const s = (canvasWidth - 24 - (wide ? panelW + 12 : 0)) / LOT_W;
  L = { wide, s, ox: 12, oy: 48, panelW };
  L.bottom = L.oy + LOT_D * s;
  L.px = wide ? canvasWidth - panelW - 8 : 10;
  L.py = wide ? 48 : L.bottom + 26;
  L.pw = wide ? panelW : canvasWidth - 20;
  L.ph = drawHeight - L.py - 6;
}
function tx(x) { return L.ox + x * L.s; }
function ty(y) { return L.oy + y * L.s; }
function fx(px) { return (px - L.ox) / L.s; }
function fy(py) { return (py - L.oy) / L.s; }

function draw() {
  updateCanvasSize();
  computeLayout();

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
  text('Site Analysis Layer Explorer', canvasWidth / 2, 8);

  drawBase();
  if (on('wet')) drawWet();
  if (on('utilities')) drawEasement();
  if (on('contours')) drawContours();
  if (on('setbacks')) drawSetbacks();
  if (on('borings')) drawBorings();
  if (on('climate')) drawClimate();
  if (on('utilities')) drawServices();
  const found = checkBuilding();
  drawBuilding(found);
  drawCompass();
  drawPanel(found);

  tip = dragging ? null : findTip();
  if (tip) drawTip(tip);
  drawControlLabels();
}

function drawBase() {
  // street, then the lot with a light base map
  noStroke();
  fill('lightgray');
  rect(L.ox, ty(LOT_D), LOT_W * L.s, 14);
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('STREET', L.ox + LOT_W * L.s / 2, ty(LOT_D) + 8);
  stroke('dimgray');
  strokeWeight(2);
  fill('ivory');
  rect(L.ox, L.oy, LOT_W * L.s, LOT_D * L.s);
}

function drawWet() {
  noStroke();
  fill('lightblue');
  ellipse(tx(WET.cx), ty(WET.cy), WET.rx * 2 * L.s, WET.ry * 2 * L.s);
  fill('navy');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('WET AREA', tx(WET.cx), ty(WET.cy - 14));
}

function drawEasement() {
  noStroke();
  fill(144, 238, 144, 130);
  rect(tx(0), ty(EASE.y0), LOT_W * L.s, (EASE.y1 - EASE.y0) * L.s);
  stroke('seagreen');
  strokeWeight(2);
  drawingContext.setLineDash([8, 5]);
  line(tx(0), ty((EASE.y0 + EASE.y1) / 2), tx(LOT_W), ty((EASE.y0 + EASE.y1) / 2));
  drawingContext.setLineDash([]);
  noStroke();
  fill('darkgreen');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('SEWER EASEMENT', tx(4), ty(EASE.y0) + 8);
}

function drawContours() {
  noStroke();
  fill(205, 133, 63, 70);
  for (let i = 0; i < LOT_W / GRID; i++) for (let j = 0; j < LOT_D / GRID; j++) if (steepCells[i][j]) rect(tx(i * GRID), ty(j * GRID), GRID * L.s + 0.5, GRID * L.s + 0.5);
  stroke('saddlebrown');
  strokeWeight(1);
  contourSegs.forEach(sg => line(tx(sg[0]), ty(sg[1]), tx(sg[2]), ty(sg[3])));
  // downhill arrow
  const ax = tx(35), ay = ty(128), len = 45;
  arrow2(ax, ay, ax + downhill.x * len, ay + downhill.y * len, 'saddlebrown', 3);
  noStroke();
  fill('saddlebrown');
  textSize(12);
  textAlign(CENTER, TOP);
  text('DOWNHILL', ax + downhill.x * len / 2, ay + downhill.y * len / 2 + 6);
}

function drawSetbacks() {
  stroke('crimson');
  strokeWeight(2);
  drawingContext.setLineDash([8, 5]);
  noFill();
  rect(tx(ENV.x0), ty(ENV.y0), (ENV.x1 - ENV.x0) * L.s, (ENV.y1 - ENV.y0) * L.s);
  drawingContext.setLineDash([]);
  noStroke();
  fill('crimson');
  textSize(12);
  textAlign(RIGHT, TOP);
  text('SETBACK LINE', tx(ENV.x1) - 4, ty(ENV.y1) - 16);
}

function drawBorings() {
  borings.forEach(b => {
    noStroke();
    fill('dodgerblue');
    circle(tx(b.x), ty(b.y), 11);
    fill('navy');
    textSize(12);
    textAlign(CENTER, TOP);
    text(b.id + ' ' + b.soil, tx(b.x), ty(b.y) + 8);
  });
}

function drawClimate() {
  // low winter sun path along the south side
  noFill();
  stroke('gold');
  strokeWeight(3);
  drawingContext.setLineDash([2, 6]);
  bezier(tx(30), ty(196), tx(100), ty(178), tx(200), ty(178), tx(270), ty(196));
  drawingContext.setLineDash([]);
  noStroke();
  fill('gold');
  circle(tx(150), ty(183), 14);
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text('WINTER SUN PATH', tx(150), ty(183) + 9);
  // prevailing winter wind from the northwest
  arrow2(tx(16), ty(26), tx(52), ty(62), 'dimgray', 5);
  noStroke();
  fill('dimgray');
  textSize(12);
  textAlign(LEFT, TOP);
  text('WINTER WIND', tx(56), ty(46));
}

function drawServices() {
  const bottom = bld.y + BLD_D;
  const bx = constrain(TAP.x, bld.x + 6, bld.x + BLD_W - 6);
  stroke('green');
  strokeWeight(3);
  line(tx(TAP.x), ty(TAP.y), tx(TAP.x), ty(bottom));
  if (bx !== TAP.x) line(tx(TAP.x), ty(bottom), tx(bx), ty(bottom));
  noStroke();
  fill('green');
  circle(tx(TAP.x), ty(TAP.y), 8);
}

function drawBuilding(found) {
  const hard = found.some(f => f.hard);
  stroke(hard ? 'red' : 'seagreen');
  strokeWeight(4);
  fill(70, 130, 180, 150);
  rect(tx(bld.x), ty(bld.y), BLD_W * L.s, BLD_D * L.s);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Riverbend building', tx(bld.x + BLD_W / 2), ty(bld.y) + 14);
  textSize(12);
  text('120 x 75 ft, drag me', tx(bld.x + BLD_W / 2), ty(bld.y) + 30);
}

function drawCompass() {
  const x = canvasWidth - 24, y = 5;
  stroke('black');
  strokeWeight(2);
  fill('black');
  line(x, y + 22, x, y + 6);
  triangle(x, y, x - 6, y + 10, x + 6, y + 10);
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  text('N', x, y + 25);
  // scale bar: 50 ft
  const sx = L.ox, sy = L.bottom + 20;
  stroke('black');
  strokeWeight(2);
  line(sx, sy, sx + 50 * L.s, sy);
  line(sx, sy - 4, sx, sy + 4);
  line(sx + 50 * L.s, sy - 4, sx + 50 * L.s, sy + 4);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text('50 ft', sx + 50 * L.s + 6, sy);
}

// message and readout panel (right column on wide canvases, below the plan on narrow ones)
function drawPanel(found) {
  const x = L.px, y = L.py, w = L.pw, h = L.ph;
  const hard = found.some(f => f.hard);
  stroke(hard ? 'red' : 'silver');
  strokeWeight(hard ? 3 : 1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const env = (ENV.x1 - ENV.x0) * (ENV.y1 - ENV.y0);
  const pct = nf(BLD_W * BLD_D / env * 100, 0, 1);
  const nCons = found.length;
  textSize(14);
  const fullW = w - 16;
  const lines = L.wide ? [
    'Envelope inside setbacks: ' + fmt(env) + ' ft²',
    'Open after shown hard constraints: ' + fmt(freeArea) + ' ft²',
    'Building: 9,000 ft² = ' + pct + ' percent of envelope',
    'Service line from street: ' + serviceLength() + ' ft',
    'Constraints overlapped: ' + nCons
  ] : [
    'Envelope ' + fmt(env) + ' ft²; open after constraints ' + fmt(freeArea) + ' ft²',
    'Building ' + pct + ' percent of envelope; service ' + serviceLength() + ' ft; overlaps ' + nCons
  ];
  const lh = L.wide ? 19 : 17;
  let cy = y + 6;
  lines.forEach(l => { cy = wrapText(l, x + 8, cy, fullW, lh, y + h); });
  cy += 4;
  fill(hard ? 'crimson' : 'seagreen');
  const head = hard ? 'CONSTRAINT VIOLATED' : (nCons ? 'LEGAL, WITH A NOTE' : 'LEGAL POSITION: no conflicts');
  text(head, x + 8, cy);
  cy += 19;
  fill('black');
  textSize(L.wide ? 14 : 13);
  const body = found.length ? found.map(f => L.wide ? f.msg : f.short).join(' ') : 'Drag the building and watch the outline. Hidden layers are not checked.';
  wrapText(body, x + 8, cy, fullW, L.wide ? 18 : 15, y + h - 2);
}

// draw word-wrapped text line by line; stops before maxY; returns the y after the last line
function wrapText(str, x, y, w, lh, maxY) {
  let line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) {
      if (y + lh > maxY) return y;
      text(line, x, y);
      y += lh;
      line = word;
    } else line = trial;
  }
  if (line && y + lh <= maxY) { text(line, x, y); y += lh; }
  return y;
}

// ---- Hover tooltips ----
function findTip() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < L.oy || mouseY > drawHeight) return null;
  const px = fx(mouseX), py = fy(mouseY);
  if (px < 0 || px > LOT_W || py < 0 || py > LOT_D) return null;
  const r = 7 / L.s; // pick radius in feet
  if (on('borings')) for (const b of borings) if (dist(px, py, b.x, b.y) < r * 1.3) return 'Boring ' + b.id + ': ' + b.soil + '. ' + b.note;
  if (on('climate')) {
    if (px > 8 && px < 75 && py > 18 && py < 70) return 'Winter wind from the northwest: keep entries on the leeward side and plan for drifting snow.';
    if (py > 175 && py < 200 && px > 25 && px < 275) return 'Winter sun path: low in the south sky. A long south face gains free solar heat in winter.';
  }
  if (on('wet') && sq((px - WET.cx) / WET.rx) + sq((py - WET.cy) / WET.ry) < 1) return 'Wet area: low ground with peat and high groundwater. No building here without removal or deep foundations.';
  if (on('utilities')) {
    if (py > EASE.y0 && py < EASE.y1) return 'Sewer easement: no building above this line. The utility keeps the right to dig it up.';
    const bottom = bld.y + BLD_D;
    if ((Math.abs(px - TAP.x) < r && py > bottom && py < LOT_D) || (Math.abs(py - bottom) < r && px > min(TAP.x, bld.x + BLD_W / 2) && px < max(TAP.x, bld.x + BLD_W / 2))) return 'Service line: water, sewer, and electric run from the street to the building. Longer runs cost more.';
  }
  if (on('setbacks')) {
    const nearV = Math.abs(px - ENV.x0) < r || Math.abs(px - ENV.x1) < r, nearH = Math.abs(py - ENV.y0) < r || Math.abs(py - ENV.y1) < r;
    if ((nearV && py >= ENV.y0 - r && py <= ENV.y1 + r) || (nearH && px >= ENV.x0 - r && px <= ENV.x1 + r)) return 'Setback line: zoning keeps buildings 25 ft from the front, 10 ft from each side, and 20 ft from the rear property line.';
  }
  if (px >= bld.x && px <= bld.x + BLD_W && py >= bld.y && py <= bld.y + BLD_D) return 'Riverbend building footprint: 120 x 75 ft = 9,000 ft². Drag it to test positions.';
  if (on('contours') && isSteep(px, py)) return 'Steep slope (over 12 percent): contours are close together, so grading and retaining walls cost more.';
  if (on('contours')) return 'Contour line: each line is 1 ft of elevation. The lot falls gently toward the northeast.';
  return null;
}

function drawTip(t) {
  textSize(14);
  const w = min(canvasWidth - 20, 300);
  const lines = ceil(textWidth(t) / (w - 16)) + 0;
  const h = lines * 18 + 14;
  const tx0 = min(max(mouseX + 14, 6), canvasWidth - w - 6);
  let ty0 = mouseY + 16;
  if (ty0 + h > drawHeight - 4) ty0 = mouseY - h - 10;
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx0, ty0, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(t, tx0 + 8, ty0 + 6, w - 16, h - 8);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text(canvasWidth < 640 ? 'Drag the building.' : 'Drag the building. Hover for meaning.', 200, drawHeight + 90);
}

// ---- Dragging ----
function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;
  const px = fx(mouseX), py = fy(mouseY);
  if (px >= bld.x && px <= bld.x + BLD_W && py >= bld.y && py <= bld.y + BLD_D) {
    dragging = true;
    dragDX = px - bld.x;
    dragDY = py - bld.y;
    return false;
  }
}
function mouseDragged() {
  if (!dragging) return;
  bld.x = constrain(fx(mouseX) - dragDX, 0, LOT_W - BLD_W);
  bld.y = constrain(fy(mouseY) - dragDY, 0, LOT_D - BLD_D);
  return false;
}
function mouseReleased() { dragging = false; }

// arrow from (x1,y1) to (x2,y2) with a head
function arrow2(x1, y1, x2, y2, col, w) {
  stroke(col);
  strokeWeight(w);
  line(x1, y1, x2, y2);
  const a = atan2(y2 - y1, x2 - x1);
  fill(col);
  noStroke();
  triangle(x2, y2, x2 - 12 * cos(a - 0.45), y2 - 12 * sin(a - 0.45), x2 - 12 * cos(a + 0.45), y2 - 12 * sin(a + 0.45));
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
