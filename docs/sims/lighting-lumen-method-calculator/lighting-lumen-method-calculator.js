// Lighting Lumen Method Calculator MicroSim - number of luminaires for a room, an illuminance overlay, and lighting power density against a limit
// CANVAS_HEIGHT: 540
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 340;
let controlHeight = 200; // five rows of control cells, each with a label above its slider
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10;
let defaultTextSize = 16;

const WIDE_MIN = 640;
const MOUNT_H = 6.5;   // ft from the luminaires down to the work surface (illustrative)
const CELL_ROWS = 5;   // rows of control cells
const CELL_H = 38;

// ---- Data: default target illuminance by room type (illustrative values; the classroom value is the chapter's example) ----
const roomTypes = { 'Classroom': 40, 'Office': 30, 'Corridor': 10, 'Multipurpose': 30 };

// ---- Data: the calculation steps with the definitions shown on hover ----
const stepDefs = [
  'Target illuminance: the footcandles wanted on the work surface. One footcandle is one lumen falling on one square foot. Illustrative values.',
  'Room area: length times width, in square feet.',
  'Light needed at the work surface: target footcandles times room area, in lumens (lm).',
  'Losses: the coefficient of utilization (CU) is the share of lamp light that reaches the work surface after the walls and ceiling absorb some. The light loss factor (LLF) allows for aging and dirt. The luminaires must emit the work-surface light divided by CU times LLF.',
  'Luminaires required: the light they must emit divided by the lumens of one luminaire, rounded up to a whole number.',
  'Total power: number of luminaires times the watts of one luminaire.',
  'Lighting power density (LPD): total lighting watts divided by room area. Energy codes limit it, commonly to about 1 W/ft2 for classrooms.'
];

// ---- State ----
let r = {};            // results of the latest calculation
let lum = [];          // luminaire positions in feet
let cells = null;      // illuminance overlay, rebuilt only when inputs change
let cellKey = '';
let planRect = {};     // pixel rectangle of the room plan
let stepRects = [];    // hover rectangles for the calculation steps

// ---- Controls ----
let typeSelect, lengthSlider, widthSlider, targetSlider, lumenSlider, wattSlider, cuSlider, llfSlider, limitSlider, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  typeSelect = createSelect();
  Object.keys(roomTypes).forEach(k => typeSelect.option(k));
  typeSelect.selected('Classroom');
  typeSelect.changed(() => targetSlider.value(roomTypes[typeSelect.value()]));

  lengthSlider = createSlider(10, 60, 30, 1);
  widthSlider = createSlider(10, 40, 20, 1);
  targetSlider = createSlider(10, 80, 40, 1);
  lumenSlider = createSlider(2000, 8000, 4000, 100);
  wattSlider = createSlider(15, 80, 35, 1);
  cuSlider = createSlider(0.4, 0.9, 0.7, 0.01);
  llfSlider = createSlider(0.6, 1.0, 0.8, 0.01);
  limitSlider = createSlider(0.5, 1.5, 1.0, 0.05);
  resetButton = createButton('Reset to chapter example');
  resetButton.mousePressed(resetAll);

  positionControls();
  describe('A plan view of a room with a grid of luminaires over a color overlay of estimated illuminance, dark blue where dim, yellow at the target, and white where bright. A panel lists the lumen method steps with live numbers: target footcandles, room area, light needed at the work surface, losses, luminaires required, total watts, and lighting power density, with a message saying whether the density is within the limit. Sliders and a room type menu change the inputs.', LABEL);
}

function resetAll() {
  typeSelect.selected('Classroom');
  lengthSlider.value(30); widthSlider.value(20); targetSlider.value(40);
  lumenSlider.value(4000); wattSlider.value(35); cuSlider.value(0.7); llfSlider.value(0.8); limitSlider.value(1.0);
}

// ---- Control cells: two columns, label above each slider ----
function cellX(c) { return 10 + c * (canvasWidth - 10) / 2; }
function cellW() { return (canvasWidth - 10) / 2 - 12; }
function cellY(row) { return drawHeight + 6 + row * CELL_H; }

function positionControls() {
  const w = cellW();
  typeSelect.position(cellX(0), cellY(0) + 16); typeSelect.size(min(w, 200));
  resetButton.position(cellX(1), cellY(0) + 14);
  [[lengthSlider, 0, 1], [widthSlider, 0, 2], [targetSlider, 0, 3], [lumenSlider, 0, 4],
   [wattSlider, 1, 1], [cuSlider, 1, 2], [llfSlider, 1, 3], [limitSlider, 1, 4]].forEach(([s, c, row]) => {
    s.position(cellX(c), cellY(row) + 18);
    s.size(w);
  });
}

// ---- Calculation: the lumen method, E = F x CU x LLF / A, solved for the number of luminaires ----
function calculate() {
  const L = lengthSlider.value(), W = widthSlider.value();
  const target = targetSlider.value();
  const F = lumenSlider.value(), watts = wattSlider.value();
  const cu = cuSlider.value(), llf = llfSlider.value();
  const area = L * W;
  const needed = target * area;                 // lumens at the work surface
  const emit = needed / (cu * llf);             // lumens the luminaires must emit
  const exact = emit / F;
  const n = Math.ceil(exact - 1e-9);
  const totalW = n * watts;
  const lpd = totalW / area;
  const avg = n * F * cu * llf / area;          // average footcandles actually delivered
  r = { L, W, target, F, watts, cu, llf, area, needed, emit, exact, n, totalW, lpd, avg, limit: limitSlider.value() };
  r.ok = lpd <= r.limit + 1e-9;
}

// ---- Luminaire layout: rows with counts that differ by at most one, each row evenly spaced ----
function layoutLuminaires() {
  const n = r.n;
  const cols = Math.max(1, Math.round(Math.sqrt(n * r.L / r.W)));
  const rows = Math.max(1, Math.ceil(n / cols));
  lum = [];
  const base = Math.floor(n / rows), extra = n % rows;
  for (let i = 0; i < rows; i++) {
    const c = base + (i < extra ? 1 : 0);
    for (let j = 0; j < c; j++) lum.push({ x: (j + 0.5) * r.L / c, y: (i + 0.5) * r.W / rows });
  }
}

// ---- Overlay: relative illuminance from the cos-cubed fall-off of each luminaire, scaled so its mean equals the lumen-method average ----
function buildCells() {
  const key = [r.L, r.W, r.n, r.avg.toFixed(3)].join('|');
  if (key === cellKey) return;
  cellKey = key;
  const size = max(r.L, r.W) / 48;
  const nx = Math.round(r.L / size), ny = Math.round(r.W / size);
  const vals = [];
  let sum = 0, mn = Infinity, mx = 0;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const x = (i + 0.5) * r.L / nx, y = (j + 0.5) * r.W / ny;
      let e = 0;
      for (const p of lum) {
        const d2 = (x - p.x) * (x - p.x) + (y - p.y) * (y - p.y);
        e += MOUNT_H / Math.pow(MOUNT_H * MOUNT_H + d2, 1.5);
      }
      vals.push(e);
      sum += e;
    }
  }
  const scale = r.avg / (sum / vals.length);
  for (let k = 0; k < vals.length; k++) { vals[k] *= scale; mn = min(mn, vals[k]); mx = max(mx, vals[k]); }
  cells = { nx, ny, vals, mn, mx };
}

// dark blue at 0, yellow at the target, white at 1.5 times the target
function fcColor(v, target) {
  if (v <= target) return lerpColor(color('navy'), color('gold'), constrain(v / target, 0, 1));
  return lerpColor(color('gold'), color('white'), constrain((v - target) / (0.5 * target), 0, 1));
}

function draw() {
  updateCanvasSize();
  calculate();
  layoutLuminaires();
  buildCells();

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
  text('Lighting Lumen Method Calculator', canvasWidth / 2, 6);

  const wide = canvasWidth >= WIDE_MIN;
  drawPlan(wide);
  drawSteps(wide);
  drawTooltips();
  drawControlLabels();
}

// ---- Plan view: overlay, room outline, luminaires, dimensions, color scale ----
function drawPlan(wide) {
  const areaX = 28, areaY = wide ? 56 : 54;
  const areaW = (wide ? canvasWidth * 0.5 : canvasWidth) - areaX - 12;
  const areaH = wide ? 224 : 84;
  const s = min(areaW / r.L, areaH / r.W);
  const pw = r.L * s, ph = r.W * s;
  const px = areaX + (areaW - pw) / 2, py = areaY + (areaH - ph) / 2;
  planRect = { x: px, y: py, w: pw, h: ph, s };

  noStroke();
  const cw = pw / cells.nx, ch = ph / cells.ny;
  for (let j = 0; j < cells.ny; j++) {
    for (let i = 0; i < cells.nx; i++) {
      fill(fcColor(cells.vals[j * cells.nx + i], r.target));
      rect(px + i * cw, py + j * ch, cw + 0.6, ch + 0.6);
    }
  }
  stroke('black');
  strokeWeight(2);
  noFill();
  rect(px, py, pw, ph);

  // luminaires: white squares with a dark outline
  const spacing = sqrt(pw * ph / max(1, r.n));
  const d = constrain(spacing * 0.35, 3, 11);
  stroke('black');
  strokeWeight(1);
  fill('white');
  lum.forEach(p => rect(px + p.x * s - d / 2, py + p.y * s - d / 2, d, d));

  // dimensions
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text(r.L + ' ft', px + pw / 2, py - 2);
  push();
  translate(px - 6, py + ph / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text(r.W + ' ft', 0, 0);
  pop();

  // color scale and the estimated average
  const ly = py + ph + 16;
  const lw = wide ? min(pw, 260) : min(260, canvasWidth * 0.62), lx = px + (pw - lw) / 2;
  noStroke();
  for (let k = 0; k < lw; k++) {
    fill(fcColor(1.5 * r.target * k / lw, r.target));
    rect(lx + k, ly, 2, 10);
  }
  stroke('black');
  strokeWeight(1);
  noFill();
  rect(lx, ly, lw, 10);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('0', lx, ly + 12);
  textAlign(CENTER, TOP);
  text(r.target + ' fc target', lx + lw * 2 / 3, ly + 12);
  textAlign(RIGHT, TOP);
  text(Math.round(1.5 * r.target), lx + lw, ly + 12);
  textSize(14);
  textAlign(CENTER, TOP);
  const avgTxt = 'Average ' + r.avg.toFixed(1) + ' fc (range ' + Math.round(cells.mn) + ' to ' + Math.round(cells.mx) + ' fc)';
  text(avgTxt, px + pw / 2, ly + 26);
}

// ---- Steps panel: wide = two lines per step on the right; narrow = compact lines below the plan ----
function fmtN(x, d) { return x.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }

function drawSteps(wide) {
  stepRects = [];
  const x = wide ? canvasWidth * 0.5 + 6 : 10;
  const w = wide ? canvasWidth - x - 10 : canvasWidth - 20;
  const lines = [
    ['1. Target illuminance', r.target + ' fc'],
    ['2. Room area', r.L + ' x ' + r.W + ' = ' + fmtN(r.area, 0) + ' ft²'],
    ['3. Light at the work surface', r.target + ' x ' + fmtN(r.area, 0) + ' = ' + fmtN(r.needed, 0) + ' lm'],
    ['4. Light to emit (after losses)', fmtN(r.needed, 0) + ' ÷ (' + r.cu.toFixed(2) + ' x ' + r.llf.toFixed(2) + ') = ' + fmtN(r.emit, 0) + ' lm'],
    ['5. Luminaires required', fmtN(r.emit, 0) + ' ÷ ' + fmtN(r.F, 0) + ' = ' + r.exact.toFixed(1) + ', so ' + r.n],
    ['6. Total power', r.n + ' x ' + r.watts + ' W = ' + fmtN(r.totalW, 0) + ' W'],
    ['7. Lighting power density', fmtN(r.totalW, 0) + ' ÷ ' + fmtN(r.area, 0) + ' = ' + r.lpd.toFixed(2) + ' W/ft²']
  ];
  noStroke();
  textAlign(LEFT, TOP);
  if (wide) {
    let y = 40;
    const lh = 36;
    lines.forEach((ln, i) => {
      const rr = { x: x - 4, y: y - 2, w: w + 4, h: lh };
      stepRects.push(rr);
      if (mouseX >= rr.x && mouseX <= rr.x + rr.w && mouseY >= rr.y && mouseY <= rr.y + rr.h && mouseY < drawHeight) {
        noStroke(); fill(255, 255, 200); rect(rr.x, rr.y, rr.w, rr.h, 4);
      }
      noStroke();
      fill('dimgray');
      textSize(14);
      text(ln[0], x, y);
      fill('black');
      textSize(15);
      text(ln[1], x + 10, y + 16);
      y += lh;
    });
    drawVerdict(x, y + 2, w);
  } else {
    const compact = [
      ['Target ' + r.target + ' fc; room ' + r.L + ' x ' + r.W + ' = ' + fmtN(r.area, 0) + ' ft²', [0, 1]],
      ['Light at work surface: ' + r.target + ' x ' + fmtN(r.area, 0) + ' = ' + fmtN(r.needed, 0) + ' lm', [2]],
      ['Emit: ÷ (' + r.cu.toFixed(2) + ' x ' + r.llf.toFixed(2) + ') = ' + fmtN(r.emit, 0) + ' lm', [3]],
      ['Luminaires: ' + fmtN(r.emit, 0) + ' ÷ ' + fmtN(r.F, 0) + ' = ' + r.exact.toFixed(1) + ', so ' + r.n, [4]],
      ['Power: ' + r.n + ' x ' + r.watts + ' W = ' + fmtN(r.totalW, 0) + ' W', [5]],
      ['Density: ' + fmtN(r.totalW, 0) + ' ÷ ' + fmtN(r.area, 0) + ' = ' + r.lpd.toFixed(2) + ' W/ft²', [6]]
    ];
    let y = 198;
    textSize(14);
    compact.forEach((ln, i) => {
      const rr = { x: 6, y: y - 1, w: canvasWidth - 12, h: 16, steps: ln[1] };
      stepRects.push(rr);
      fill('black');
      text(ln[0], x, y);
      y += 17;
    });
    drawVerdict(x, y + 2, w);
  }
}

function drawVerdict(x, y, w) {
  const ok = r.ok;
  noStroke();
  fill(ok ? 'honeydew' : 'mistyrose');
  stroke(ok ? 'seagreen' : 'crimson');
  strokeWeight(2);
  const h = canvasWidth >= WIDE_MIN ? 40 : 36;
  rect(x - 4, y, w + 4, h, 6);
  noStroke();
  fill(ok ? 'darkgreen' : 'crimson');
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text(ok ? 'Within limit' : 'Over the limit: choose a more efficient luminaire.', x + 4, y + 3);
  textStyle(NORMAL);
  fill('black');
  text(r.lpd.toFixed(2) + ' W/ft² vs limit ' + r.limit.toFixed(2) + ' W/ft² (' + (ok ? 'margin ' + (r.limit - r.lpd).toFixed(2) : 'excess ' + (r.lpd - r.limit).toFixed(2)) + ')', x + 4, y + 20);
}

// ---- Hover: definition of a calculation step, or the estimated footcandles at the cursor ----
function drawTooltips() {
  let lines = null;
  const wide = canvasWidth >= WIDE_MIN;
  stepRects.forEach((rr, i) => {
    if (mouseX >= rr.x && mouseX <= rr.x + rr.w && mouseY >= rr.y && mouseY <= rr.y + rr.h && mouseY < drawHeight) {
      const defs = wide ? [stepDefs[i]] : rr.steps.map(k => stepDefs[k]);
      lines = defs.join(' ');
    }
  });
  if (!lines && mouseX >= planRect.x && mouseX <= planRect.x + planRect.w && mouseY >= planRect.y && mouseY <= planRect.y + planRect.h) {
    const i = constrain(floor((mouseX - planRect.x) / planRect.w * cells.nx), 0, cells.nx - 1);
    const j = constrain(floor((mouseY - planRect.y) / planRect.h * cells.ny), 0, cells.ny - 1);
    lines = 'About ' + cells.vals[j * cells.nx + i].toFixed(0) + ' fc at this spot (' + (cells.vals[j * cells.nx + i] >= r.target ? 'at or above' : 'below') + ' the ' + r.target + ' fc target). Edges are dimmer in this simple model, which ignores wall reflections.';
  }
  if (!lines) return;
  textSize(14);
  const w = min(canvasWidth - 8, 300);
  const wrapped = wrapLines(lines, w - 16);
  const h = wrapped.length * 17 + 10;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  wrapped.forEach((l, k) => text(l, tx + 8, ty + 5 + k * 17));
}

function wrapLines(str, w) {
  const out = [];
  let ln = '';
  for (const word of str.split(' ')) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { out.push(ln); ln = word; } else ln = t;
  }
  if (ln) out.push(ln);
  return out;
}

// ---- Control labels with current values and units ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  const items = [
    [0, 0, 'Room type (sets the default target)'],
    [0, 1, 'Room length: ' + lengthSlider.value() + ' ft'],
    [0, 2, 'Room width: ' + widthSlider.value() + ' ft'],
    [0, 3, 'Target: ' + targetSlider.value() + ' fc'],
    [0, 4, 'Luminaire: ' + fmtN(lumenSlider.value(), 0) + ' lm'],
    [1, 1, 'Luminaire: ' + wattSlider.value() + ' W'],
    [1, 2, 'Coefficient of utilization: ' + cuSlider.value().toFixed(2)],
    [1, 3, 'Light loss factor: ' + llfSlider.value().toFixed(2)],
    [1, 4, 'Power density limit: ' + limitSlider.value().toFixed(2) + ' W/ft²']
  ];
  items.forEach(it => text(it[2], cellX(it[0]), cellY(it[1]) + 1));
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
