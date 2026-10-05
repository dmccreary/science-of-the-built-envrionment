// Basement Wall Soil Pressure Explorer MicroSim - equivalent fluid pressure on a foundation wall: F = 1/2 x gamma_e x h^2, with optional water and surcharge
// CANVAS_HEIGHT: 575
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 185;
let defaultTextSize = 16;

// ---- Data: equivalent fluid pressures (pcf), illustrative values from Chapter 10 ----
const backfills = [
  { name: 'Clean gravel, 30 pcf', short: 'Clean gravel', g: 30, col: 'darkgray' },
  { name: 'Silty sand, 45 pcf', short: 'Silty sand', g: 45, col: 'wheat' },
  { name: 'Clay, 60 pcf', short: 'Clay', g: 60, col: 'rosybrown' }
];
const GW = 62.4;      // unit weight of water, pcf
const SURCHARGE = 100; // psf from a parking lot or driveway
const SOIL_UNIT = 120; // pcf, used only to turn the equivalent fluid pressure into a surcharge coefficient K = gamma_e / 120

// ---- Controls ----
let heightSlider, backfillSel, waterBox, surBox;
let L = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  heightSlider = createSlider(4, 14, 8, 1);
  backfillSel = createSelect();
  backfills.forEach(b => backfillSel.option(b.name));
  backfillSel.selected(backfills[1].name);
  waterBox = createCheckbox('Water fills the backfill', false);
  surBox = createCheckbox('Add 100 psf surcharge', false);
  positionControls();
  describe('A cross-section of a basement wall with soil on its right side. A triangular pressure diagram with arrows that grow longer with depth is drawn against the wall. A red resultant arrow marks the height of the total force above the base. Checking the water box adds a second, lighter blue triangle, and checking the surcharge box adds a uniform band for a parking lot. A readout shows base pressure, force per foot of wall, and the resultant height, and a message compares the force with and without water.', LABEL);
}

function positionControls() {
  heightSlider.position(sliderLeftMargin, drawHeight + 8);
  heightSlider.size(max(100, canvasWidth - sliderLeftMargin - 25));
  backfillSel.position(sliderLeftMargin, drawHeight + 42);
  waterBox.position(10, drawHeight + 78);
  surBox.position(205, drawHeight + 78);
}

// ---- Calculation (lb and ft, per foot of wall length) ----
function calc() {
  const h = heightSlider.value();
  const bf = backfills.find(b => b.name === backfillSel.value());
  const g = bf.g, water = waterBox.checked(), q = surBox.checked() ? SURCHARGE : 0;
  const K = g / SOIL_UNIT, pq = K * q;
  const Fs = 0.5 * g * h * h, Fw = water ? 0.5 * GW * h * h : 0, Fq = pq * h;
  const F = Fs + Fw + Fq;
  const yBar = F > 0 ? (Fs * h / 3 + Fw * h / 3 + Fq * h / 2) / F : 0;
  const baseP = g * h + (water ? GW * h : 0) + pq;
  const dryF = Fs + Fq, wetF = Fs + 0.5 * GW * h * h + Fq;
  return { h, bf, g, water, q, K, pq, Fs, Fw, Fq, F, yBar, baseP, dryF, wetF };
}
function pressureAt(c, z) { return c.g * z + (c.water ? GW * z : 0) + c.pq; } // psf at depth z below the top of the backfill

// ---- Layout ----
function layout() {
  const W = canvasWidth, wide = W >= 640;
  if (wide) {
    L.sec = { x: 10, y: 44, w: floor(W * 0.6), h: drawHeight - 50 };
    L.pan = { x: L.sec.x + L.sec.w + 8, y: 44, w: W - L.sec.w - 28, h: drawHeight - 50 };
  } else {
    L.sec = { x: 10, y: 44, w: W - 20, h: 244 };
    L.pan = { x: 10, y: 294, w: W - 20, h: drawHeight - 294 - 6 };
  }
  L.wide = wide;
  L.wallX = L.sec.x + (wide ? 100 : 80);
  L.yBase = L.sec.y + L.sec.h - (wide ? 58 : 44);
  L.yTopMax = L.sec.y + 38;
  L.s = (L.yBase - L.yTopMax) / 14;                  // px per ft of wall height
  L.right = L.sec.x + L.sec.w - 8;
  L.pps = (L.right - L.wallX - 6) / 1800;            // px per psf; 1,800 psf is above any case here
}

function draw() {
  updateCanvasSize();
  layout();
  const c = calc();

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
  text('Basement Wall Soil Pressure', canvasWidth / 2, 8);

  drawSection(c);
  drawPressure(c);
  drawPanel(c);
  drawHover(c);
  drawControlLabels();
}

// ---- Wall, soil, footing ----
function drawSection(c) {
  const sec = L.sec, wx = L.wallX, yb = L.yBase, yt = yb - c.h * L.s;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(sec.x, sec.y, sec.w, sec.h, 6);
  // soil against the wall, and soil below
  noStroke();
  fill(c.bf.col);
  rect(wx, yt, L.right - wx + 6, yb - yt);
  fill('tan');
  rect(sec.x + 1, yb, sec.w - 2, sec.y + sec.h - yb - 1);
  if (c.water) { fill(100, 149, 237, 70); rect(wx, yt, L.right - wx + 6, yb - yt); }
  // basement interior
  fill('ghostwhite');
  rect(sec.x + 1, yt, wx - sec.x - 15, yb - yt);
  // footing, perimeter drain, wall
  stroke('dimgray');
  strokeWeight(2);
  fill('silver');
  rect(wx - 34, yb, 62, 14);
  rect(wx - 14, yt, 14, yb - yt);
  fill('lightgray');
  rect(wx + 28, yb - 10, 22, 24);
  fill('dimgray');
  circle(wx + 39, yb + 2, 10);
  // floor framing at the top of the wall
  stroke('saddlebrown');
  strokeWeight(2);
  fill('navajowhite');
  rect(sec.x + 1, yt - 8, wx - sec.x - 1, 8);
  // ground surface and surcharge
  stroke('forestgreen');
  strokeWeight(4);
  line(wx, yt, L.right + 6, yt);
  if (c.q > 0) {
    noStroke();
    fill('dimgray');
    rect(wx + 4, yt - 8, L.right - wx, 8);
    stroke('crimson');
    strokeWeight(3);
    const n = 6, step = (L.right - wx - 20) / (n - 1);
    for (let i = 0; i < n; i++) {
      const ax = wx + 14 + i * step;
      line(ax, yt - 30, ax, yt - 12);
      line(ax, yt - 10, ax - 4, yt - 17);
      line(ax, yt - 10, ax + 4, yt - 17);
    }
    noStroke();
    fill('crimson');
    textSize(13);
    textAlign(LEFT, BOTTOM);
    text('Parking lot surcharge: 100 psf', wx + 14, yt - 31);
  }
  // labels
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  if (L.wide) text('Basement', sec.x + 32, yt + 4);
  fill('dimgray');
  if (L.wide) text('floor framing braces the top', sec.x + 4, yt - 21);
  textAlign(RIGHT, BOTTOM);
  fill('black');
  text('Backfill', L.right, yb - 3);
  textAlign(LEFT, TOP);
  text('drain', wx + 22, yb + 16);
  // wall height dimension, with the label turned along the line
  const dx = sec.x + 22;
  stroke('black');
  strokeWeight(1.5);
  line(dx, yt, dx, yb);
  line(dx - 5, yt, dx + 5, yt);
  line(dx - 5, yb, dx + 5, yb);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, BOTTOM);
  push();
  translate(dx - 3, (yt + yb) / 2);
  rotate(-HALF_PI);
  text('h = ' + c.h + ' ft', 0, 0);
  pop();
  if (c.water) {
    fill('navy');
    textSize(13);
    textAlign(LEFT, TOP);
    text('Water fills the backfill', wx + 8, yt + 6);
  }
}

// ---- Pressure diagram: soil triangle, surcharge band, water triangle, arrows, resultant ----
function drawPressure(c) {
  const wx = L.wallX, yb = L.yBase, yt = yb - c.h * L.s, s = L.pps;
  const xAt = (z, part) => wx + s * (part === 0 ? c.g * z : part === 1 ? c.g * z + c.pq : c.g * z + c.pq + (c.water ? GW * z : 0));
  // soil triangle
  stroke('saddlebrown');
  strokeWeight(1.5);
  fill(205, 133, 63, 190);
  quad(wx, yt, xAt(0, 0), yt, xAt(c.h, 0), yb, wx, yb);
  // surcharge band
  if (c.pq > 0) {
    fill(220, 20, 60, 120);
    stroke('crimson');
    quad(xAt(0, 0), yt, xAt(0, 1), yt, xAt(c.h, 1), yb, xAt(c.h, 0), yb);
  }
  // lighter water triangle
  if (c.water) {
    fill(135, 206, 250, 150);
    stroke('royalblue');
    quad(xAt(0, 1), yt, xAt(0, 2), yt, xAt(c.h, 2), yb, xAt(c.h, 1), yb);
  }
  // arrows grow with depth
  stroke('black');
  strokeWeight(1.5);
  for (let z = 0; z <= c.h + 0.001; z += 1) {
    const y = yt + z * L.s, len = pressureAt(c, z) * s;
    if (len < 4) continue;
    line(wx + len, y, wx + 2, y);
    line(wx + 2, y, wx + 9, y - 3.5);
    line(wx + 2, y, wx + 9, y + 3.5);
  }
  // resultant arrow at yBar above the base
  const ry = yb - c.yBar * L.s, tail = max(xAt(c.h - c.yBar, 2), wx + 30) + 36;
  stroke('crimson');
  strokeWeight(5);
  line(tail, ry, wx + 3, ry);
  line(wx + 3, ry, wx + 16, ry - 8);
  line(wx + 3, ry, wx + 16, ry + 8);
  noStroke();
  fill('crimson');
  textSize(14);
  textAlign(LEFT, CENTER);
  const lab = 'F = ' + fmtN(c.F) + ' lb/ft';
  const lw = textWidth(lab);
  const lx = min(tail + 6, L.right - lw);
  fill(255, 255, 255, 220);
  rect(lx - 2, ry - 10, lw + 4, 20, 4);
  fill('crimson');
  text(lab, lx, ry);
  // height of the resultant on the wall's inside face
  stroke('crimson');
  strokeWeight(2);
  const ix = wx - 22;
  line(ix, ry, ix, yb);
  line(ix - 4, ry, ix + 4, ry);
  noStroke();
  fill('crimson');
  textSize(13);
  textAlign(RIGHT, CENTER);
  text(nf(c.yBar, 0, 2) + ' ft', ix - 5, (ry + yb) / 2);
}
function fmtN(n) { return Math.round(n).toLocaleString('en-US'); }

// ---- Readout panel ----
function drawPanel(c) {
  const p = L.pan;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(p.x, p.y, p.w, p.h, 6);
  noStroke();
  textAlign(LEFT, TOP);
  const x = p.x + 8, w = p.w - 16, lh = L.wide ? 19 : 17;
  textSize(L.wide ? 15 : 14);
  let y = p.y + 6;
  fill('black');
  if (L.wide) {
    y = wrapText('Backfill: ' + c.bf.short + ', ' + c.g + ' pcf (illustrative)', x, y, w, lh);
    y = wrapText('Base pressure: ' + fmtN(c.baseP) + ' psf', x, y, w, lh);
    fill('navy');
    y = wrapText('Force per foot: ' + fmtN(c.F) + ' lb/ft', x, y, w, lh);
  } else {
    y = wrapText(c.bf.short + ', ' + c.g + ' pcf (illustrative)', x, y, w, lh);
    fill('navy');
    y = wrapText('Base ' + fmtN(c.baseP) + ' psf; force ' + fmtN(c.F) + ' lb/ft', x, y, w, lh);
  }
  fill('black');
  y = wrapText('Resultant: ' + nf(c.yBar, 0, 2) + ' ft above the base' + (c.water || c.pq > 0 ? '' : ' (h/3)'), x, y, w, lh);
  fill('dimgray');
  textSize(L.wide ? 14 : 13);
  let calcLine = 'F = ½ × ' + c.g + ' × ' + c.h + '² = ' + fmtN(c.Fs);
  if (c.water) calcLine += ' soil + ' + fmtN(c.Fw) + ' water';
  if (c.pq > 0) calcLine += ' + ' + fmtN(c.Fq) + ' surcharge';
  y = wrapText(calcLine + ' lb/ft', x, y + 2, w, L.wide ? 17 : 16);
  // comparison with and without water
  y += 6;
  stroke('silver');
  strokeWeight(1);
  line(p.x + 6, y - 3, p.x + p.w - 6, y - 3);
  noStroke();
  fill(c.water ? 'crimson' : 'black');
  textSize(L.wide ? 14 : 13);
  const ratio = nf(c.wetF / c.dryF, 0, 1);
  let msg;
  if (c.water) msg = 'With water: ' + fmtN(c.wetF) + ' lb/ft, versus ' + fmtN(c.dryF) + ' dry, ' + ratio + ' times as much. A perimeter drain keeps the backfill dry so the wall feels only the soil.';
  else msg = 'Dry: ' + fmtN(c.dryF) + ' lb/ft. If water filled the backfill: ' + fmtN(c.wetF) + ' lb/ft, ' + ratio + ' times as much. A perimeter drain carries water away so this does not happen.';
  y = wrapText(msg, x, y, w, L.wide ? 17 : 15);
  if (L.wide) {
    fill('dimgray');
    textSize(13);
    wrapText('Force grows with h², so doubling the height quadruples it. Surcharge adds a uniform K × 100 psf with K = γe ÷ 120 pcf (illustrative). Water is added in full on top of the soil pressure, a simplified, conservative method.', x, y + 4, w, 16);
  }
}

// ---- Hover: pressure at a depth ----
function drawHover(c) {
  const wx = L.wallX, yb = L.yBase, yt = yb - c.h * L.s;
  if (mouseY < yt || mouseY > yb || mouseX < wx || mouseX > L.right) return;
  const z = (mouseY - yt) / L.s;
  const total = pressureAt(c, z);
  if (mouseX > wx + total * L.pps + 12) return;
  stroke('navy');
  strokeWeight(1);
  drawingContext.setLineDash([4, 3]);
  line(wx, mouseY, wx + total * L.pps, mouseY);
  drawingContext.setLineDash([]);
  let t = 'Depth ' + nf(z, 0, 1) + ' ft: ' + fmtN(total) + ' psf';
  const parts = ['soil ' + fmtN(c.g * z)];
  if (c.water) parts.push('water ' + fmtN(GW * z));
  if (c.pq > 0) parts.push('surcharge ' + fmtN(c.pq));
  if (parts.length > 1) t += ' (' + parts.join(' + ') + ')';
  textSize(14);
  const w = min(canvasWidth - 20, 250), h = wrapCount(t, w - 16) * 17 + 12;
  const x = min(max(mouseX + 14, 6), canvasWidth - w - 6), y = min(mouseY + 14, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  wrapText(t, x + 8, y + 6, w - 16, 17);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Wall height: ' + heightSlider.value() + ' ft', 10, drawHeight + 20);
  text('Backfill (illustrative):', 10, drawHeight + 54);
}

// word-wrapped text drawn line by line; returns the y after the last line
function wrapText(str, x, y, w, lh) {
  let line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { text(line, x, y); y += lh; line = word; } else line = trial;
  }
  if (line) { text(line, x, y); y += lh; }
  return y;
}
function wrapCount(str, w) {
  let n = 1, line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { n++; line = word; } else line = trial;
  }
  return n;
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
