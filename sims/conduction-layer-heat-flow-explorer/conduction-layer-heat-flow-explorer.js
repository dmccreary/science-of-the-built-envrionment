// Conduction Through a Layer MicroSim - heat flow through one flat layer by Fourier's law, with an optional second material to compare
// CANVAS_HEIGHT: 555
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 180; // label width to the left of each slider
let defaultTextSize = 16;

// ---- Data: approximate conductivities k in BTU·in/(h·ft²·°F) from Chapter 3 (typical values; real products vary) ----
const materials = [
  { name: 'Still air', k: 0.17, note: 'An excellent insulator if it cannot circulate.' },
  { name: 'Polyiso foam board', k: 0.17, note: 'Polyisocyanurate, a rigid foam insulation.' },
  { name: 'Fiberglass batt', k: 0.27, note: 'Traps still air among its fibers.' },
  { name: 'Softwood lumber', k: 0.8, note: 'A moderate insulator.' },
  { name: 'Gypsum board', k: 1.1, note: 'Interior wall finish.' },
  { name: 'Concrete', k: 10, note: 'Normal-weight concrete. Conducts heat readily.' },
  { name: 'Structural steel', k: 310, note: 'Conducts heat extremely well.' }
];

const hotTemp = 70;      // hot face temperature, °F (heated room)
const tMin = -30;        // coldest possible face (70 - 100), used for the color scale

// ---- State and controls ----
let matSelA, matSelB, thickSlider, areaSlider, dtSlider, compareCheck;
let settled = { thick: 3.5, area: 1, dt: 70 }; // slider values at the last release, used for the doubling message
let message = 'Try doubling the thickness, then release the slider.';
let touched = {};     // millis() of the last input event per slider
let hoverTip = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  matSelA = createSelect();
  matSelB = createSelect();
  materials.forEach(m => { matSelA.option(m.name); matSelB.option(m.name); });
  matSelA.selected('Fiberglass batt');
  matSelB.selected('Softwood lumber');

  thickSlider = createSlider(0.5, 12, 3.5, 0.5);
  areaSlider = createSlider(1, 100, 1, 1);
  dtSlider = createSlider(5, 100, 70, 5);
  compareCheck = createCheckbox('Compare two materials', false);

  // remember when each slider last moved; the doubling message is worked out once it stops moving
  thickSlider.input(() => { touched.thick = millis(); });
  areaSlider.input(() => { touched.area = millis(); });
  dtSlider.input(() => { touched.dt = millis(); });

  positionControls();
  describe('A flat slab with a hot face on the left and a cold face on the right is shaded from red to blue to show temperature falling across it. Gray arrows get thicker as the heat flow rate grows. A panel shows the heat flow equation with the current numbers. Sliders set thickness, area, and temperature difference, and a menu picks one of seven materials. A checkbox adds a second slab of another material and a bar compares the two heat flows.', LABEL);
}

// ---- Layout helpers ----
function narrow() { return canvasWidth < 560; }
function colW() { return canvasWidth / 2; }
function labelW() { return narrow() ? 118 : sliderLeftMargin; }
function selLabelW() { return narrow() ? 62 : 100; }
function sliderW() { return max(60, colW() - labelW() - 18); }
function rowCenter(r) { return drawHeight + 17 + 35 * r; }
function comparing() { return compareCheck.checked(); }

function positionControls() {
  const lx = 8, rx = colW() + 8;
  const selW = max(90, colW() - selLabelW() - 16);
  matSelA.position(lx + selLabelW(), rowCenter(0) - 12);
  matSelA.size(selW);
  matSelB.position(rx + selLabelW(), rowCenter(0) - 12);
  matSelB.size(selW);
  thickSlider.position(lx + labelW(), rowCenter(1) - 10);
  thickSlider.size(sliderW());
  areaSlider.position(rx + labelW(), rowCenter(1) - 10);
  areaSlider.size(sliderW());
  dtSlider.position(lx + labelW(), rowCenter(2) - 10);
  dtSlider.size(sliderW());
  compareCheck.position(rx, rowCenter(2) - 12);
  [matSelA, matSelB].forEach(s => s.style('font-size', narrow() ? '14px' : '16px'));
}

// ---- Physics ----
function matOf(sel) { return materials.find(m => m.name === sel.value()); }
function heatFlow(m) { return m.k * areaSlider.value() * dtSlider.value() / thickSlider.value(); } // BTU/h
function fmtQ(q) { return q >= 10 ? nfc(round(q), 0) : (q >= 1 ? nf(q, 0, 1) : nf(q, 0, 2)); }
function fmtNum(v) { return Number.isInteger(v) ? String(v) : nf(v, 0, 1); }
function fmtK(k) { return String(k); }

function checkSettled() {
  const info = { thick: [thickSlider, 'thickness', true], area: [areaSlider, 'the area', false], dt: [dtSlider, 'the temperature difference', false] };
  for (const key in touched) {
    if (millis() - touched[key] > 700) {
      onSettle(key, info[key][0].value(), info[key][1], info[key][2]);
      delete touched[key];
    }
  }
}

// A slider stopped moving: if the value doubled or halved, say what happens to the flow
function onSettle(key, v, noun, inverse) {
  const ratio = v / settled[key];
  settled[key] = v;
  if (abs(ratio - 2) < 0.03) message = inverse ? 'Doubling ' + noun + ' halves the flow.' : 'Doubling ' + noun + ' doubles the flow.';
  else if (abs(ratio - 0.5) < 0.03) message = inverse ? 'Halving ' + noun + ' doubles the flow.' : 'Halving ' + noun + ' halves the flow.';
  else message = 'Flow is ' + (inverse ? 'inversely ' : '') + 'proportional to ' + noun + '. Try exactly doubling or halving it.';
}

function draw() {
  updateCanvasSize();
  matSelB.style('display', comparing() ? '' : 'none');
  checkSettled();
  hoverTip = null;

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
  text('Conduction Through a Layer', canvasWidth / 2, 8);

  if (comparing()) {
    drawSlab(matOf(matSelA), 'A', canvasWidth * 0.27, canvasWidth * 0.2);
    drawSlab(matOf(matSelB), 'B', canvasWidth * 0.73, canvasWidth * 0.2);
    drawComparePanel();
  } else {
    drawSlab(matOf(matSelA), '', canvasWidth / 2, canvasWidth * 0.4);
    drawSinglePanel();
  }
  drawControlLabels();
  drawHoverTip();
}

// ---- Slab with temperature gradient and heat-flow arrows ----
function slabGeometry(cx, maxW) {
  const w = map(thickSlider.value(), 0.5, 12, 24, maxW);
  const h = map(sqrt(areaSlider.value()), 1, 10, 70, 130);
  const cy = 168;
  return { x: cx - w / 2, y: cy - h / 2, w, h, cy };
}

function tempColor(t) { return lerpColor(color('blue'), color('red'), constrain((t - tMin) / (hotTemp - tMin), 0, 1)); }

function drawSlab(mat, tag, cx, maxW) {
  const g = slabGeometry(cx, maxW);
  const dT = dtSlider.value();
  const coldTemp = hotTemp - dT;
  const q = max(1e-6, heatFlow(mat));

  // name and face temperatures above the slab
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(narrow() ? 14 : 16);
  text((tag ? tag + ': ' : '') + mat.name, cx, 40);
  textSize(14);
  text(hotTemp + '°F hot ' + ((narrow() || comparing()) ? '→ ' + coldTemp + '°F cold' : 'face → ' + coldTemp + '°F cold face'), cx, 60);

  // temperature gradient, drawn as thin vertical strips
  noStroke();
  const strips = max(1, floor(g.w));
  for (let i = 0; i < strips; i++) {
    fill(tempColor(hotTemp - dT * (i + 0.5) / strips));
    rect(g.x + i * g.w / strips, g.y, g.w / strips + 1, g.h);
  }
  noFill();
  stroke('black');
  strokeWeight(2);
  rect(g.x, g.y, g.w, g.h);

  // heat-flow arrows: width follows log10 of the rate, so the full range fits
  const wt = constrain(map(log(q) / log(10), -1.2, 6.8, 1.5, 13), 1.5, 13);
  const ext = narrow() ? 38 : 50;
  for (let k = -1; k <= 1; k++) {
    const ay = g.cy + k * min(g.h / 3, 40);
    arrowH(g.x - ext, ay, g.x + g.w + ext, wt);
  }

  // side tags (text, not color alone) and dimensions
  noStroke();
  fill('firebrick');
  textSize(14);
  textAlign(RIGHT, CENTER);
  text('HOT', g.x - 8, g.y - 8);
  fill('navy');
  textAlign(LEFT, CENTER);
  text('COLD', g.x + g.w + 8, g.y - 8);
  fill('black');
  textAlign(CENTER, TOP);
  text('L = ' + fmtNum(thickSlider.value()) + ' in, A = ' + areaSlider.value() + ' ft²', cx, g.y + g.h + 8);

  // hover: local temperature at that depth
  if (mouseX >= g.x && mouseX <= g.x + g.w && mouseY >= g.y && mouseY <= g.y + g.h) {
    const depth = (mouseX - g.x) / g.w * thickSlider.value();
    const t = hotTemp - dT * depth / thickSlider.value();
    stroke('white');
    strokeWeight(3);
    line(mouseX, g.y, mouseX, g.y + g.h);
    stroke('black');
    strokeWeight(1);
    line(mouseX, g.y, mouseX, g.y + g.h);
    hoverTip = nf(depth, 0, 2) + ' in from hot face: ' + nf(t, 0, 1) + '°F';
  }
}

function arrowH(x1, y, x2, wt) {
  stroke('white');
  strokeWeight(wt + 4);
  line(x1, y, x2 - 2, y);
  stroke('dimgray');
  strokeWeight(wt);
  line(x1, y, x2 - wt, y);
  const h = 6 + wt * 1.4;
  noStroke();
  fill('white');
  triangle(x2 + 2, y, x2 - h - 2, y - h * 0.6 - 2, x2 - h - 2, y + h * 0.6 + 2);
  fill('dimgray');
  triangle(x2, y, x2 - h, y - h * 0.6, x2 - h, y + h * 0.6);
}

// ---- Readout panels ----
function wrapLines(str, w) {
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const word of words) {
    const t = cur ? cur + ' ' + word : word;
    if (textWidth(t) > w && cur) { lines.push(cur); cur = word; } else { cur = t; }
  }
  if (cur) lines.push(cur);
  return lines;
}

function para(str, x, y, w, col, size) {
  textSize(size);
  fill(col);
  textAlign(LEFT, TOP);
  for (const ln of wrapLines(str, w)) { text(ln, x, y); y += size + 3; }
  return y;
}

function panelBox() {
  const px = 10, py = 262, pw = canvasWidth - 20, ph = drawHeight - py - 6;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);
  noStroke();
  return { x: px + 8, y: py + 6, w: pw - 16 };
}

function equation(mat, q) {
  return fmtK(mat.k) + ' × ' + areaSlider.value() + ' × ' + dtSlider.value() + ' ÷ ' + fmtNum(thickSlider.value()) + ' = ' + fmtQ(q) + ' BTU/h';
}

function drawSinglePanel() {
  const b = panelBox();
  const mat = matOf(matSelA);
  const q = heatFlow(mat);
  const fs = narrow() ? 14 : 16;
  let y = para('Fourier\'s law: Q = k × A × ΔT ÷ L', b.x, b.y, b.w, 'dimgray', fs);
  y = para('Q = ' + equation(mat, q), b.x, y + 2, b.w, 'navy', narrow() ? 17 : 22);
  y = para(mat.name + ': k = ' + fmtK(mat.k) + ' BTU·in/(h·ft²·°F). ' + mat.note, b.x, y + 4, b.w, 'black', fs);
  y = para(message, b.x, y + 4, b.w, 'darkgreen', fs);
  para('Typical values only; real products vary. Arrow width uses a log scale.', b.x, max(y + 2, drawHeight - 28), b.w, 'dimgray', 13);
}

function drawComparePanel() {
  const b = panelBox();
  const A = matOf(matSelA), B = matOf(matSelB);
  const qA = heatFlow(A), qB = heatFlow(B);
  const fs = narrow() ? 14 : 16;
  let y = para('Q = k × A × ΔT ÷ L', b.x, b.y, b.w, 'dimgray', fs);
  y = para('A, ' + A.name + ': ' + equation(A, qA), b.x, y + 1, b.w, 'navy', fs);
  y = para('B, ' + B.name + ': ' + equation(B, qB), b.x, y + 1, b.w, 'darkorange', fs);

  // ratio bar: the larger flow is the full bar, the smaller is drawn to scale
  const big = max(qA, qB);
  const bw = b.w - (narrow() ? 70 : 90);
  y += 4;
  [['A', qA, 'navy'], ['B', qB, 'darkorange']].forEach(row => {
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text(row[0], b.x, y + 9);
    fill(row[2]);
    rect(b.x + 16, y, max(3, bw * row[1] / big), 18, 3);
    fill('black');
    text(fmtQ(row[1]), b.x + 22 + max(3, bw * row[1] / big), y + 9);
    y += 24;
  });
  const hi = qA >= qB ? 'A' : 'B', lo = hi === 'A' ? 'B' : 'A';
  const ratio = max(qA, qB) / min(qA, qB);
  const txt = abs(ratio - 1) < 0.005 ? 'Both layers pass the same heat flow.' :
    'Layer ' + hi + ' passes ' + (ratio >= 10 ? nfc(round(ratio), 0) : nf(ratio, 0, 1)) + ' times as much heat as layer ' + lo + '.';
  y = para(txt, b.x, y + 2, b.w, 'black', fs);
  para(message, b.x, y + 2, b.w, 'darkgreen', fs - (narrow() ? 1 : 0));
}

// ---- Control labels (drawn in the control region) ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(narrow() ? 14 : defaultTextSize);
  const lx = 8, rx = colW() + 8;
  text(comparing() ? 'A:' : 'Material:', lx, rowCenter(0));
  if (comparing()) text('B:', rx, rowCenter(0));
  text('Thickness: ' + fmtNum(thickSlider.value()) + ' in', lx, rowCenter(1));
  text('Area: ' + areaSlider.value() + ' ft²', rx, rowCenter(1));
  text((narrow() ? 'Temp. diff.: ' : 'Temp. difference: ') + dtSlider.value() + ' °F', lx, rowCenter(2));
}

function drawHoverTip() {
  if (!hoverTip) return;
  textSize(14);
  const w = textWidth(hoverTip) + 16;
  const tx = constrain(mouseX + 12, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY - 34, 4, drawHeight - 30);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, 24, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(hoverTip, tx + 8, ty + 12);
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
