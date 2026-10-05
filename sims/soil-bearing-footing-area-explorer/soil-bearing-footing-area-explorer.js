// Bearing Capacity and Footing Size Explorer MicroSim - required footing area = column load / allowable soil bearing capacity
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

// ---- Data: presumptive allowable bearing values (psf), illustrative; Chapter 9 gives clay 1,500, sand 2,000, gravel 3,000 ----
const soils = [
  { name: 'Soft clay', q: 1000, col: 'rosybrown', desc: 'Soft clay squeezes easily in the hand. It is weak and compresses slowly, so footings must be large.' },
  { name: 'Firm clay', q: 1500, col: 'peru', desc: 'Firm clay holds a thumb print but does not squeeze. Moderate bearing, with slow settlement over years.' },
  { name: 'Sand', q: 2000, col: 'wheat', desc: 'Sand has visible grains and drains well. Dense sand carries load well; loose sand can settle.' },
  { name: 'Gravel', q: 3000, col: 'darkgray', desc: 'Gravel is coarse and drains freely. It is the strongest of the four soils here.' }
];
const LOAD0 = 40, SOIL0 = 1; // Riverbend defaults: 40 kips on firm clay
const FOS = 3;               // factor of safety from Chapter 9

// ---- Controls ----
let loadSlider, soilSel, fosBox, resetButton;
let R = {}; // panel rectangles, recomputed each frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  loadSlider = createSlider(10, 100, LOAD0, 5);
  soilSel = createSelect();
  soils.forEach(s => soilSel.option(soilLabel(s)));
  soilSel.selected(soilLabel(soils[SOIL0]));
  fosBox = createCheckbox('Show factor of safety', false);
  resetButton = createButton('Reset');
  resetButton.mousePressed(() => {
    loadSlider.value(LOAD0);
    soilSel.selected(soilLabel(soils[SOIL0]));
    fosBox.checked(false);
  });
  positionControls();
  describe('A side view of a column on a square footing resting on soil, with a pressure bulb of shaded bands below it, a top-down inset that shows the footing size against a 10 foot grid, a bar chart of the footing area needed in four soils at the current load, and a readout of required area, footing side, and bearing pressure. A slider sets the column load, a menu picks the soil, and a checkbox shows the factor of safety.', LABEL);
}

function soilLabel(s) { return s.name + ' (' + fmtN(s.q) + ' psf)'; }
function fmtN(n) { return Math.round(n).toLocaleString('en-US'); }
function sliderWidth() { return max(120, canvasWidth - sliderLeftMargin - 25); }

function positionControls() {
  loadSlider.position(sliderLeftMargin, drawHeight + 8);
  loadSlider.size(sliderWidth());
  soilSel.position(sliderLeftMargin, drawHeight + 42);
  resetButton.position(230, drawHeight + 78);
  fosBox.position(10, drawHeight + 78);
}

function curSoil() { return soils.find(s => soilLabel(s) === soilSel.value()) || soils[SOIL0]; }

// ---- Calculation ----
function ftIn(ft) {
  let f = floor(ft + 1e-9), i = round((ft - f) * 12);
  if (i === 12) { f++; i = 0; }
  return f + ' ft' + (i ? ' ' + i + ' in' : '');
}
function calc() {
  const soil = curSoil();
  const P = loadSlider.value() * 1000;      // lb
  const area = P / soil.q;                  // ft2 required
  const exact = Math.sqrt(area);
  const side = Math.ceil(exact * 4 - 1e-9) / 4; // round up to the next 3 in
  const actual = P / (side * side);         // psf actually applied
  return { soil, P, area, exact, side, actual, big: side > 8 };
}

function layout() {
  const W = canvasWidth;
  if (W >= 640) {
    const h = 300, y = 44;
    const sw = floor(W * 0.36), iw = floor(W * 0.27);
    R.side = { x: 10, y, w: sw - 10, h };
    R.inset = { x: sw + 6, y, w: iw - 6, h };
    R.bars = { x: sw + iw + 6, y, w: W - sw - iw - 16, h };
    R.read = { x: 10, y: y + h + 8, w: W - 20, h: drawHeight - (y + h + 8) - 6 };
  } else {
    const hw = floor((W - 30) / 2);
    R.side = { x: 10, y: 44, w: hw, h: 168 };
    R.inset = { x: 20 + hw, y: 44, w: hw, h: 168 };
    R.bars = { x: 10, y: 218, w: W - 20, h: 112 };
    R.read = { x: 10, y: 336, w: W - 20, h: drawHeight - 336 - 6 };
  }
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
  text('Bearing Capacity and Footing Size', canvasWidth / 2, 8);

  drawSideView(c);
  drawInset(c);
  drawBars(c);
  drawReadout(c);
  drawHover(c);
  drawControlLabels();
}

function panel(r, title) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text(title, r.x + 8, r.y + 5);
}

// ---- Side view: column, footing, soil, and pressure bulb ----
function sideScale() { return R.side.w / 14; } // the view is 14 ft wide
function soilTopY() { return R.side.y + R.side.h * 0.5; }

function drawSideView(c) {
  const r = R.side, s = sideScale(), cx = r.x + r.w / 2, top = soilTopY();
  panel(r, 'Side view');
  // soil layer, clipped to the panel
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(r.x, top, r.w, r.y + r.h - top);
  drawingContext.clip();
  noStroke();
  fill(c.soil.col);
  rect(r.x, top, r.w, r.y + r.h - top);
  // pressure bulb: darker bands mean more stress (fraction of footing pressure q)
  const B = c.side * s;
  const bands = [[0.1, 1.45, 2.2], [0.2, 1.05, 1.5], [0.5, 0.75, 0.85], [0.8, 0.58, 0.45]]; // [stress/q, half-width/B, depth/B]
  bands.forEach(b => {
    fill(0, 0, 60, 38);
    ellipse(cx, top + 2, b[1] * 2 * B, b[2] * 2 * B);
  });
  drawingContext.restore();
  // band labels in the first free space
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Darker = more stress', r.x + 8, r.y + r.h - 18);
  // footing and column
  const th = max(6, B * 0.15), colW = max(5, 1 * s), colTop = r.y + 38, colH = top - th - colTop;
  stroke('dimgray');
  strokeWeight(2);
  fill('lightgray');
  rect(cx - B / 2, top - th, B, th);
  rect(cx - colW / 2, colTop, colW, colH);
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  text(round(c.P / 1000) + ' kip column load', cx, r.y + 20);
  // load arrow inside the column
  stroke('crimson');
  strokeWeight(3);
  line(cx, colTop + 3, cx, colTop + colH - 10);
  noStroke();
  fill('crimson');
  triangle(cx, colTop + colH - 2, cx - 5, colTop + colH - 11, cx + 5, colTop + colH - 11);
  // footing width dimension
  stroke('black');
  strokeWeight(1);
  line(cx - B / 2, top + 10, cx + B / 2, top + 10);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text(ftIn(c.side), cx, top + 12);
}

// ---- Top-down inset: footing against a 10 ft grid ----
function drawInset(c) {
  const r = R.inset;
  panel(r, 'Top view, 10 ft grid');
  const win = 24; // feet shown across
  const sz = min(r.w - 16, r.h - 40);
  const s = sz / win;
  const gx = r.x + (r.w - sz) / 2, gy = r.y + 26 + (r.h - 30 - sz) / 2;
  noStroke();
  fill('ivory');
  rect(gx, gy, sz, sz);
  for (let f = -12; f <= 12; f += 2) {
    const major = f % 10 === 0;
    stroke(major ? 'gray' : 'gainsboro');
    strokeWeight(major ? 2 : 1);
    line(gx + (f + 12) * s, gy, gx + (f + 12) * s, gy + sz);
    line(gx, gy + (f + 12) * s, gx + sz, gy + (f + 12) * s);
  }
  stroke('dimgray');
  strokeWeight(1);
  noFill();
  rect(gx, gy, sz, sz);
  const B = c.side * s;
  stroke(c.big ? 'darkorange' : 'steelblue');
  strokeWeight(3);
  fill(70, 130, 180, 110);
  rect(gx + sz / 2 - B / 2, gy + sz / 2 - B / 2, B, B);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  if (B > 70) text(ftIn(c.side) + ' square', gx + sz / 2, gy + sz / 2);
  textAlign(LEFT, TOP);
  text('Heavy lines: 10 ft', gx + 3, gy + 3);
}

// ---- Bar chart: footing area needed in each soil at the current load ----
function drawBars(c) {
  const r = R.bars;
  panel(r, 'Footing area needed at ' + round(c.P / 1000) + ' kips');
  const labW = 66, valW = 58;
  const x0 = r.x + labW + 8, plotW = r.w - labW - valW - 16, maxA = 100;
  const rowH = (r.h - 54) / soils.length;
  const y0 = r.y + 26;
  // 64 ft2 line = 8 ft square
  const x64 = x0 + plotW * 64 / maxA;
  stroke('darkorange');
  strokeWeight(2);
  drawingContext.setLineDash([5, 4]);
  line(x64, y0 - 2, x64, y0 + rowH * soils.length);
  drawingContext.setLineDash([]);
  soils.forEach((sl, i) => {
    const a = c.P / sl.q, y = y0 + i * rowH, sel = sl === c.soil;
    noStroke();
    fill(sel ? 'steelblue' : 'lightsteelblue');
    rect(x0, y + 3, plotW * a / maxA, rowH - 6);
    fill('black');
    textSize(sel ? 14 : 13);
    textAlign(RIGHT, CENTER);
    text(sl.name, x0 - 6, y + rowH / 2);
    textAlign(LEFT, CENTER);
    text(nf(a, 0, 1) + ' ft²', x0 + plotW * a / maxA + 4, y + rowH / 2);
  });
  noStroke();
  fill('darkorange');
  textSize(12);
  textAlign(CENTER, TOP);
  text('64 ft² = 8 ft square', x64, r.y + r.h - 20);
  fill('black');
  textAlign(LEFT, TOP);
  text('0', x0 - 3, r.y + r.h - 20);
}

// ---- Readout panel ----
function drawReadout(c) {
  const r = R.read, wide = canvasWidth >= 640;
  panel(r, wide ? 'Calculation (illustrative values; footing weight ignored)' : 'Calculation (illustrative values)');
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(wide ? 15 : 14);
  const lh = wide ? 19 : 17;
  let y = r.y + 22;
  const textW = (fosBox.checked() && wide) ? r.w * 0.55 : r.w - 16;
  const tx = r.x + 8;
  if (wide) {
    y = wrapText('Area = load ÷ bearing = ' + fmtN(c.P) + ' lb ÷ ' + fmtN(c.soil.q) + ' psf = ' + nf(c.area, 0, 1) + ' ft²', tx, y, textW, lh);
    y = wrapText('Square side = ' + nf(c.exact, 0, 2) + ' ft, rounded up to ' + ftIn(c.side) + '; pressure ' + fmtN(c.actual) + ' psf', tx, y, textW, lh);
  } else {
    y = wrapText('Area = ' + fmtN(c.P) + ' lb ÷ ' + fmtN(c.soil.q) + ' psf = ' + nf(c.area, 0, 1) + ' ft²', tx, y, textW, lh);
    y = wrapText('Side ' + nf(c.exact, 0, 2) + ' ft, round up to ' + ftIn(c.side) + '; ' + fmtN(c.actual) + ' psf', tx, y, textW, lh);
  }
  const gravelA = c.P / soils[3].q;
  if (c.big) {
    fill('darkorange');
    y = wrapText('Over 8 ft square: consider a mat foundation or better soil (Chapter 10).', tx, y, r.w - 16, lh);
  } else if (wide || !fosBox.checked()) {
    const cmp = c.soil === soils[3]
      ? 'Gravel is the strongest soil here: soft clay would need ' + nf(soils[3].q / soils[0].q, 0, 0) + ' times the area.'
      : 'Gravel would need only ' + nf(gravelA, 0, 1) + ' ft², ' + nf(c.area / gravelA, 0, 1) + ' times less than ' + c.soil.name.toLowerCase() + '.';
    y = wrapText(cmp, tx, y, textW, lh);
  }
  fill('black');
  if (fosBox.checked() && !wide) wrapText('Ultimate capacity = ' + FOS + ' × ' + fmtN(c.soil.q) + ' = ' + fmtN(c.soil.q * FOS) + ' psf', tx, y, r.w - 16, lh);
  if (fosBox.checked() && wide) drawFosGauge(c, r.x + r.w * 0.58, r.y + 28, r.w * 0.40);
}

// gauge from 0 to the ultimate capacity: allowable is one third, applied pressure is the fill
function drawFosGauge(c, x, y, w) {
  const ult = c.soil.q * FOS;
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Ultimate capacity = ' + FOS + ' × ' + fmtN(c.soil.q) + ' = ' + fmtN(ult) + ' psf', x, y - 6);
  fill('whitesmoke');
  stroke('gray');
  strokeWeight(1);
  rect(x, y + 20, w, 18);
  noStroke();
  fill('steelblue');
  rect(x, y + 20, w * c.actual / ult, 18);
  stroke('darkorange');
  strokeWeight(3);
  line(x + w / 3, y + 16, x + w / 3, y + 42);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Allowable ' + fmtN(c.soil.q) + ' psf (orange line)', x, y + 44);
  textAlign(RIGHT, TOP);
  text('Fails near ' + fmtN(ult), x + w, y + 44);
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

// ---- Hover on the soil layer ----
function drawHover(c) {
  const r = R.side;
  if (mouseX < r.x || mouseX > r.x + r.w || mouseY < soilTopY() || mouseY > r.y + r.h) return;
  const t = c.soil.name + ': presumptive allowable bearing ' + fmtN(c.soil.q) + ' psf (illustrative). ' + c.soil.desc;
  textSize(14);
  const w = min(canvasWidth - 20, 280);
  const h = wrapCount(t, w - 16) * 18 + 12;
  const x = min(max(mouseX + 12, 6), canvasWidth - w - 6);
  const y = min(mouseY + 14, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  wrapText(t, x + 8, y + 6, w - 16, 18);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Column load: ' + loadSlider.value() + ' kips', 10, drawHeight + 20);
  text('Soil type:', 10, drawHeight + 54);
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
