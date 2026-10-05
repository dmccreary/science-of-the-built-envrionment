// Net-Zero PV Balance Explorer MicroSim - size the PV array and roof area needed to offset a building's annual energy use
// CANVAS_HEIGHT: 550
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150; // four rows of control cells
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10;
let defaultTextSize = 16;

const WIDE_MIN = 640;
const CELL_H = 35;
const KBTU_PER_KWH = 3.412; // 1 kWh = 3.412 kBtu
const GRID_COLS = 40;
const GRID_ROWS = 24;
const EFFICIENT_EUI = 30;   // kBtu/ft2 per year after the efficiency measures (chapter 19 worked example)

// Chapter 19 worked example defaults (EUI, yield, and roof area per kW are illustrative values in the book)
const DEFAULTS = { area: 9000, eui: 60, yld: 1250, ftk: 80, share: 70 };

// ---- State ----
let r = {};              // results of the latest calculation
let anim = null;         // { from, start } while the EUI slider glides to the efficient value
let roofRect = {};       // pixel rectangle of the roof plan
let barRects = [];       // hover rectangles for the two bars

// ---- Controls ----
let areaSlider, euiSlider, yieldSlider, ftSlider, shareSlider, applyButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  areaSlider = createSlider(3000, 20000, DEFAULTS.area, 100);
  euiSlider = createSlider(15, 90, DEFAULTS.eui, 1);
  euiSlider.input(() => { anim = null; });
  yieldSlider = createSlider(1000, 1500, DEFAULTS.yld, 10);
  ftSlider = createSlider(60, 110, DEFAULTS.ftk, 1);
  shareSlider = createSlider(40, 90, DEFAULTS.share, 1);
  applyButton = createButton('Apply efficiency measures');
  applyButton.mousePressed(() => { anim = { from: euiSlider.value(), start: frameCount }; });
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);

  positionControls();
  describe('A roof plan of a one-story building with blue solar panels filling from the left edge and a gray zone for rooftop equipment on the right, next to two bars comparing annual energy use in orange with annual solar production from the usable roof in green. Sliders set building area, energy use intensity, PV yield, roof area per kilowatt, and the usable share of the roof. A message says whether net zero is feasible on this roof or how many more square feet of PV area are needed.', LABEL);
}

function resetAll() {
  anim = null;
  areaSlider.value(DEFAULTS.area); euiSlider.value(DEFAULTS.eui); yieldSlider.value(DEFAULTS.yld);
  ftSlider.value(DEFAULTS.ftk); shareSlider.value(DEFAULTS.share);
}

// ---- Control cells: two columns, label above each slider ----
function cellX(c) { return 10 + c * (canvasWidth - 10) / 2; }
function cellW() { return (canvasWidth - 10) / 2 - 12; }
function cellY(row) { return drawHeight + 6 + row * CELL_H; }

function positionControls() {
  const w = cellW();
  [[areaSlider, 0, 0], [euiSlider, 0, 1], [yieldSlider, 0, 2], [ftSlider, 1, 0], [shareSlider, 1, 1]].forEach(([s, c, row]) => {
    s.position(cellX(c), cellY(row) + 18);
    s.size(w);
  });
  applyButton.position(cellX(0), cellY(3) + 6);
  resetButton.position(cellX(1), cellY(3) + 6);
}

// ---- Calculation: the arithmetic of the chapter 19 worked example ----
function calculate() {
  const A = areaSlider.value(), eui = euiSlider.value(), yld = yieldSlider.value();
  const ftk = ftSlider.value(), share = shareSlider.value() / 100;
  const useKbtu = eui * A;
  const useKwh = useKbtu / KBTU_PER_KWH;
  const kw = useKwh / yld;                 // array size that offsets the annual use
  const reqArea = kw * ftk;                // roof area that array needs
  const usable = A * share;                // one story: roof area equals building footprint
  const maxKw = usable / ftk;
  const maxKwh = maxKw * yld;              // production if the whole usable roof is filled
  const fits = reqArea <= usable + 1e-9;
  const breakEven = maxKwh * KBTU_PER_KWH / A; // highest EUI this roof can offset
  r = { A, eui, yld, ftk, share, useKbtu, useKwh, kw, reqArea, usable, maxKw, maxKwh, fits, breakEven,
        short: Math.max(0, reqArea - usable), gapKwh: useKwh - maxKwh };
}

function fmtN(x, d) { return x.toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }

function draw() {
  updateCanvasSize();
  if (anim) {
    const t = constrain((frameCount - anim.start) / 45, 0, 1);
    euiSlider.value(round(lerp(anim.from, EFFICIENT_EUI, t)));
    if (t >= 1) anim = null;
  }
  calculate();

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
  text('Net-Zero PV Balance Explorer', canvasWidth / 2, 6);

  const wide = canvasWidth >= WIDE_MIN;
  drawRoof(wide);
  drawBars(wide);
  drawSteps(wide);
  drawVerdict();
  drawTooltip();
  drawControlLabels();
}

// ---- Roof plan: panels fill from the left edge of the usable zone; equipment zone on the right ----
function drawRoof(wide) {
  const rw = wide ? min(270, canvasWidth * 0.36) : floor(canvasWidth * 0.5) - 16;
  const rh = rw / 1.5;
  const rx = 12, ry = wide ? 52 : 46;
  roofRect = { x: rx, y: ry, w: rw, h: rh };
  const cw = rw / GRID_COLS, ch = rh / GRID_ROWS;
  const usableCols = Math.round(r.share * GRID_COLS);
  const frac = constrain(r.fits ? r.reqArea / r.usable : 1, 0, 1);
  const panelCells = Math.round(frac * usableCols * GRID_ROWS);
  const panelCol = r.fits ? 'steelblue' : 'crimson';

  for (let c = 0; c < GRID_COLS; c++) {
    for (let k = 0; k < GRID_ROWS; k++) {
      const idx = c * GRID_ROWS + k; // column-major so panels fill column by column from the left
      let col;
      if (c >= usableCols) col = 'darkgray';
      else col = idx < panelCells ? panelCol : 'white';
      stroke(col === 'white' ? 'lightgray' : 'white');
      strokeWeight(1);
      fill(col);
      rect(rx + c * cw, ry + k * ch, cw, ch);
    }
  }
  stroke('black');
  strokeWeight(2);
  noFill();
  rect(rx, ry, rw, rh);

  // equipment zone label
  const zoneW = (GRID_COLS - usableCols) * cw;
  if (zoneW >= 70) {
    noStroke();
    fill('black');
    textSize(12);
    textAlign(CENTER, CENTER);
    text('Equipment, unavailable', rx + usableCols * cw + 2, ry, zoneW - 4, rh);
  }

  // caption and legend
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Roof ' + fmtN(r.A) + ' ft² (one story)', rx, ry + rh + 4);
  const items = [
    [panelCol, r.fits ? 'PV panels (they fit)' : 'PV panels (do NOT fit)'],
    ['white', 'Open usable roof'],
    ['darkgray', 'Equipment / unavailable']
  ];
  items.forEach((it, i) => {
    const ly = ry + rh + 24 + i * 18;
    stroke('black');
    strokeWeight(1);
    fill(it[0]);
    rect(rx, ly + 1, 12, 12);
    noStroke();
    fill('black');
    text(it[1], rx + 18, ly);
  });
}

// ---- Bars: annual use versus production from the usable roof, with the gap labeled ----
function drawBars(wide) {
  const rx = roofRect.x + roofRect.w;
  const x0 = wide ? rx + 28 : canvasWidth * 0.5 + 8;
  const w = wide ? min(210, canvasWidth * 0.26) : canvasWidth - x0 - 8;
  const top = wide ? 78 : 78, base = wide ? 228 : 170;
  const maxV = Math.max(r.useKwh, r.maxKwh) * 1.05;
  const bw = min(70, w * 0.38);
  const xs = [x0 + (w / 2 - bw) / 2, x0 + w / 2 + (w / 2 - bw) / 2];
  const vals = [r.useKwh, r.maxKwh];
  const cols = ['darkorange', 'seagreen'];
  const labels = ['Annual use', 'PV from usable roof'];
  barRects = [];

  stroke('gray');
  strokeWeight(1);
  line(x0, base, x0 + w, base);
  for (let i = 0; i < 2; i++) {
    const h = (base - top) * vals[i] / maxV;
    stroke('black');
    strokeWeight(1);
    fill(cols[i]);
    rect(xs[i], base - h, bw, h);
    barRects.push({ x: xs[i] - 6, y: top - 20, w: bw + 12, h: base - top + 60 });
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(fmtN(vals[i]) + ' kWh', xs[i] + bw / 2, base - h - 2);
    textAlign(CENTER, TOP);
    text(labels[i], xs[i] - 14, base + 4, bw + 28, 36);
  }
  // dashed line at the annual use level, and the gap arrow on the production bar
  const useY = base - (base - top) * r.useKwh / maxV;
  stroke('darkorange');
  strokeWeight(2);
  drawingContext.setLineDash([5, 4]);
  line(xs[0] + bw, useY, xs[1] + bw + 4, useY);
  drawingContext.setLineDash([]);
  const prodY = base - (base - top) * r.maxKwh / maxV;
  if (!r.fits && r.gapKwh > 0) {
    stroke('black');
    strokeWeight(2);
    line(xs[1] + bw + 4, useY, xs[1] + bw + 4, prodY);
  }
  noStroke();
  textSize(14);
  textAlign(CENTER, TOP);
  fill(r.gapKwh > 0 ? 'chocolate' : 'darkgreen');
  const gapText = r.gapKwh > 0 ? 'Gap: ' + fmtN(r.gapKwh) + ' kWh short' : 'Surplus capacity: ' + fmtN(-r.gapKwh) + ' kWh';
  text(gapText, x0 - 4, base + 42, w + 8, 20);
}

// ---- Calculation steps, written out as text so the arithmetic is visible ----
function drawSteps(wide) {
  const x = wide ? roofRect.x + roofRect.w + 28 + min(210, canvasWidth * 0.26) + 18 : 10;
  const w = canvasWidth - x - 10;
  const lines = [
    ['Annual use', r.eui + ' × ' + fmtN(r.A) + ' = ' + fmtN(r.useKbtu) + ' kBtu = ' + fmtN(r.useKwh) + ' kWh'],
    ['Array size', fmtN(r.useKwh) + ' ÷ ' + fmtN(r.yld) + ' = ' + r.kw.toFixed(2) + ' kW'],
    ['Roof needed', r.kw.toFixed(2) + ' kW × ' + r.ftk + ' = ' + fmtN(r.reqArea) + ' ft²'],
    ['Roof usable', fmtN(r.A) + ' × ' + round(r.share * 100) + '% = ' + fmtN(r.usable) + ' ft²']
  ];
  noStroke();
  textAlign(LEFT, TOP);
  if (wide) {
    let y = 52;
    lines.forEach(ln => {
      fill('dimgray');
      textSize(14);
      text(ln[0], x, y);
      fill('black');
      text(ln[1], x + 8, y + 17, w - 8);
      y += 58;
    });
  } else {
    let y = 252;
    textSize(14);
    lines.forEach(ln => {
      fill('black');
      text(ln[0] + ': ' + ln[1], x, y);
      y += 17;
    });
  }
}

// ---- Verdict: feasible or the extra PV area needed, plus the break-even EUI ----
function drawVerdict() {
  const h = canvasWidth >= WIDE_MIN ? 56 : 64;
  const y = drawHeight - h - 4;
  const ok = r.fits;
  stroke(ok ? 'seagreen' : 'darkorange');
  strokeWeight(2);
  fill(ok ? 'honeydew' : 'lightyellow');
  rect(8, y, canvasWidth - 16, h, 6);
  noStroke();
  fill(ok ? 'darkgreen' : 'chocolate');
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  text(ok ? 'Net zero is feasible on this roof.' : 'Need ' + fmtN(Math.ceil(r.short)) + ' more ft² of PV area.', 16, y + 4, canvasWidth - 32, 22);
  textStyle(NORMAL);
  fill('black');
  textSize(14);
  const detail = (ok ? 'Margin ' + fmtN(r.usable - r.reqArea) + ' ft². ' : 'Needs ' + fmtN(r.reqArea) + ' ft²; usable ' + fmtN(r.usable) + ' ft². ') +
    'Roof offsets an EUI up to ' + fmtN(r.breakEven) + ' kBtu/ft²/yr.';
  text(detail, 16, y + 24, canvasWidth - 32, h - 26);
}

// ---- Hover: numbers behind a bar or a roof zone ----
function drawTooltip() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  let msg = null;
  barRects.forEach((b, i) => {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      msg = i === 0
        ? 'Annual use = EUI × area ÷ 3.412 = ' + r.eui + ' × ' + fmtN(r.A) + ' ÷ 3.412 = ' + fmtN(r.useKwh) + ' kWh (' + fmtN(r.useKbtu) + ' kBtu).'
        : 'PV from the usable roof = ' + fmtN(r.usable) + ' ft² ÷ ' + r.ftk + ' ft²/kW = ' + r.maxKw.toFixed(1) + ' kW, × ' + fmtN(r.yld) + ' kWh/kW = ' + fmtN(r.maxKwh) + ' kWh per year.';
    }
  });
  const q = roofRect;
  if (!msg && mouseX >= q.x && mouseX <= q.x + q.w && mouseY >= q.y && mouseY <= q.y + q.h) {
    const usableX = q.x + r.share * q.w;
    if (mouseX >= usableX) msg = 'Equipment and unavailable roof: ' + fmtN(r.A - r.usable) + ' ft² (' + round((1 - r.share) * 100) + '% of the roof). Illustrative share.';
    else msg = 'Usable roof ' + fmtN(r.usable) + ' ft². The array needs ' + fmtN(r.reqArea) + ' ft² (' + round(r.reqArea / r.usable * 100) + '% of it).';
  }
  if (!msg) return;
  textSize(14);
  const w = min(canvasWidth - 8, 300);
  const wrapped = wrapLines(msg, w - 16);
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
  text('Building area: ' + fmtN(areaSlider.value()) + ' ft²', cellX(0), cellY(0) + 1);
  text('EUI: ' + euiSlider.value() + ' kBtu/ft²/yr', cellX(0), cellY(1) + 1);
  text('PV yield: ' + fmtN(yieldSlider.value()) + ' kWh/kW/yr', cellX(0), cellY(2) + 1);
  text('Roof per kW: ' + ftSlider.value() + ' ft²/kW', cellX(1), cellY(0) + 1);
  text('Usable roof for PV: ' + shareSlider.value() + '%', cellX(1), cellY(1) + 1);
  fill('dimgray');
  text('Hover a bar or the roof for the numbers.', cellX(1), cellY(2) + 1, cellW() + 8);
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
