// Stress, Force, and Area Explorer MicroSim - stress = force / area for a steel rod, a wood post, and a footing on soil
// CANVAS_HEIGHT: 560
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 410;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Data: the three members and their illustrative limits (values follow the Chapter 3 worked examples) ----
// area() returns the loaded area in square inches; ft2 = true means the member reports stress in psf
const members = {
  'Steel rod': {
    key: 'rod', sizeName: 'Diameter', unit: 'in', min: 0.25, max: 2, step: 0.05, size0: 0.75, load0: 8000, ft2: false,
    area: d => PI * d * d / 4,
    limits: [{ label: '36,000 psi steel yield', v: 36000, u: 'psi' }, { label: '50,000 psi stronger steel', v: 50000, u: 'psi' }]
  },
  'Wood post': {
    key: 'post', sizeName: 'Side', unit: 'in', min: 1.5, max: 7.5, step: 0.25, size0: 3.5, load0: 6000, ft2: false,
    area: s => s * s,
    limits: [{ label: '1,000 psi wood crushing', v: 1000, u: 'psi' }, { label: '700 psi weaker wood', v: 700, u: 'psi' }]
  },
  'Footing on soil': {
    key: 'footing', sizeName: 'Side', unit: 'ft', min: 0.5, max: 6, step: 0.25, size0: 2, load0: 6000, ft2: true,
    area: s => s * s * 144,
    limits: [{ label: '1,500 psf soil bearing', v: 1500, u: 'psf' }, { label: '3,000 psf firm soil', v: 3000, u: 'psf' }]
  }
};

// ---- State ----
let memberName = 'Steel rod';
let snow = { active: false, t0: 0, base: 0 }; // Snowshoe animation (runs only after the button is pressed)
const SNOW_MS = 4000;

// ---- Controls ----
let memberSel, limitSel, snowButton, loadSlider, sizeSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  memberSel = createSelect();
  Object.keys(members).forEach(n => memberSel.option(n));
  memberSel.selected(memberName);
  memberSel.position(sliderLeftMargin, drawHeight + 6);
  memberSel.changed(() => { memberName = memberSel.value(); applyMember(); });

  snowButton = createButton('Snowshoe');
  snowButton.position(sliderLeftMargin + 150, drawHeight + 6);
  snowButton.mousePressed(startSnowshoe);

  limitSel = createSelect();
  limitSel.position(sliderLeftMargin, drawHeight + 41);

  loadSlider = createSlider(0, 20000, 8000, 100);
  loadSlider.position(sliderLeftMargin, drawHeight + 76);
  sizeSlider = createSlider(0.25, 2, 0.75, 0.05);
  sizeSlider.position(sliderLeftMargin, drawHeight + 111);
  resizeSliders();

  applyMember();
  describe('A side-view drawing of a member carrying a downward load, a to-scale cross-section that shades the loaded area, a readout of area, stress, and factor of safety, and a horizontal gauge that compares the stress with an illustrative limit. The member is a steel rod, a wood post, or a footing on soil. Sliders change the load and the size, and a Snowshoe button shrinks and enlarges the area while the load stays fixed.', LABEL);
}

function cur() { return members[memberName]; }

// reset load, size, and limit list to the worked example for the selected member
function applyMember() {
  const m = cur();
  loadSlider.value(m.load0);
  sizeSlider.elt.min = m.min;
  sizeSlider.elt.max = m.max;
  sizeSlider.elt.step = m.step;
  sizeSlider.value(m.size0);
  limitSel.elt.innerHTML = '';
  m.limits.forEach(l => limitSel.option(l.label));
  limitSel.selected(m.limits[0].label);
  snow.active = false;
}

function currentLimit() { return cur().limits.find(l => l.label === limitSel.value()) || cur().limits[0]; }

function startSnowshoe() {
  if (snow.active) return;
  snow = { active: true, t0: millis(), base: sizeSlider.value() };
}

// Snowshoe: the size shrinks to half, grows to 1.5 times, then returns, while the load stays fixed
function updateSnowshoe() {
  if (!snow.active) return;
  const t = (millis() - snow.t0) / SNOW_MS;
  if (t >= 1) { sizeSlider.value(snow.base); snow.active = false; return; }
  const m = cur();
  sizeSlider.value(constrain(snow.base * (1 - 0.5 * sin(TWO_PI * t)), m.min, m.max));
}

// ---- Calculation: everything derives from load (lb), area (in2), and the limit ----
function calc() {
  const m = cur();
  const load = loadSlider.value();
  const size = sizeSlider.value();
  const areaIn2 = m.area(size);
  const psi = load / areaIn2;
  const psf = psi * 144;
  const lim = currentLimit();
  const stress = lim.u === 'psi' ? psi : psf;
  const fs = stress > 0 ? lim.v / stress : Infinity;
  let state = 'SAFE', col = 'seagreen';
  if (fs < 1) { state = 'OVER LIMIT'; col = 'crimson'; }
  else if (fs < 1.5) { state = 'LOW MARGIN'; col = 'darkorange'; }
  return { m, load, size, areaIn2, psi, psf, lim, stress, fs, state, col };
}

function draw() {
  updateCanvasSize();
  updateSnowshoe();

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
  text('Stress, Force, and Area Explorer', canvasWidth / 2, 8);

  const c = calc();
  const wide = canvasWidth >= 620;
  const zoneH = wide ? 224 : 130;
  const ex = 10, ey = 44;
  const ew = wide ? floor(canvasWidth * 0.36) : floor(canvasWidth * 0.5) - 14;
  const sx = ex + ew + 10;
  const sw = wide ? floor(canvasWidth * 0.27) : canvasWidth - sx - 10;
  drawElevation(c, ex, ey, ew, zoneH);
  drawSection(c, sx, ey, sw, zoneH);
  if (wide) drawReadout(c, sx + sw + 12, ey, canvasWidth - (sx + sw + 12) - 10, true);
  else drawReadout(c, 12, ey + zoneH + 4, canvasWidth - 24, false);
  drawGauge(c);
  drawMessage(c);
  drawControlLabels(c);
}

// ---- Panel frame ----
function panel(x, y, w, h, title) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(14);
  text(title, x + 8, y + 4);
}

function arrow(x1, y1, x2, y2, wt, col) {
  stroke(col);
  strokeWeight(wt);
  line(x1, y1, x2, y2);
  const a = atan2(y2 - y1, x2 - x1), hs = 6 + wt;
  noStroke();
  fill(col);
  triangle(x2, y2, x2 - hs * cos(a - 0.45), y2 - hs * sin(a - 0.45), x2 - hs * cos(a + 0.45), y2 - hs * sin(a + 0.45));
}

// ---- Side view of the member ----
function drawElevation(c, x, y, w, h) {
  panel(x, y, w, h, 'Side view');
  const m = c.m, cx = x + w / 2;
  const top = y + 22, bot = y + h - 6, ah = bot - top;
  const frac = (c.size - m.min) / (m.max - m.min);
  const lw = 1.5 + 4.5 * constrain(c.load / 20000, 0, 1); // load arrow weight shows the size of the force
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  if (m.key === 'rod') {
    const rw = 3 + 19 * frac, rodEnd = top + 8 + ah * 0.42;
    fill('dimgray');
    rect(cx - 40, top, 80, 8);
    fill('slategray');
    rect(cx - rw / 2, top + 8, rw, rodEnd - top - 8);
    fill('lightsteelblue');
    stroke('steelblue');
    strokeWeight(1);
    rect(cx - 38, rodEnd, 76, 30, 4);
    noStroke();
    fill('black');
    text(nfc(c.load) + ' lb', cx, rodEnd + 7);
    arrow(cx, rodEnd + 32, cx, min(bot, rodEnd + 32 + 26), lw, 'black');
  } else if (m.key === 'post') {
    const pw = 8 + 28 * frac, groundY = bot - 12, postTop = groundY - ah * 0.5;
    fill('silver');
    rect(x + w * 0.15, groundY, w * 0.7, 12);
    fill('burlywood');
    stroke('sienna');
    strokeWeight(1);
    rect(cx - pw / 2, postTop, pw, groundY - postTop);
    noStroke();
    fill('black');
    text(nfc(c.load) + ' lb', cx, top - 2);
    arrow(cx, top + 20, cx, postTop - 1, lw, 'black');
  } else {
    const fw = 18 + (w * 0.85 - 18) * frac, soilY = bot - 46;
    fill('tan');
    rect(x + 6, soilY, w - 12, 46 + 0);
    fill('sienna');
    textAlign(LEFT, TOP);
    text('Soil', x + 10, bot - 16);
    stroke('gray');
    strokeWeight(1);
    fill('lightgray');
    rect(cx - fw / 2, soilY, fw, 12);
    fill('burlywood');
    rect(cx - 6, soilY - ah * 0.35, 12, ah * 0.35 + 1);
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    text(nfc(c.load) + ' lb', cx, top - 2);
    arrow(cx, top + 20, cx, soilY - ah * 0.35 - 1, lw, 'black');
    // soil reaction arrows: length follows the share of the limit used
    const n = constrain(round(fw / 18), 2, 9), len = constrain(8 + 18 * (c.stress / c.lim.v), 8, 30);
    for (let i = 0; i < n; i++) {
      const ax = cx - fw / 2 + (i + 0.5) * fw / n;
      arrow(ax, soilY + 12 + len, ax, soilY + 13, 1.5, 'steelblue');
    }
  }
}

// ---- Cross-section: the loaded area drawn to one fixed scale for all sizes of this member ----
function drawSection(c, x, y, w, h) {
  panel(x, y, w, h, 'Loaded area (to scale)');
  const m = c.m, cx = x + w / 2, cy = y + 22 + (h - 64) / 2;
  const ppu = (min(w - 24, h - 74)) / m.max;
  const px = c.size * ppu, pmax = m.max * ppu;
  drawingContext.setLineDash([4, 4]);
  stroke('silver');
  strokeWeight(1);
  noFill();
  if (m.key === 'rod') circle(cx, cy, pmax); else rect(cx - pmax / 2, cy - pmax / 2, pmax, pmax);
  drawingContext.setLineDash([]);
  stroke('steelblue');
  strokeWeight(2);
  fill('lightskyblue');
  if (m.key === 'rod') circle(cx, cy, px); else rect(cx - px / 2, cy - px / 2, px, px);
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  const dims = m.sizeName + ' = ' + nf(c.size, 0, m.key === 'rod' ? 2 : 2) + ' ' + m.unit;
  text(dims, cx, y + h - 40);
  const aTxt = m.ft2 ? 'A = ' + nf(c.areaIn2 / 144, 0, 2) + ' ft²' : 'A = ' + nf(c.areaIn2, 0, 3) + ' in²';
  textSize(16);
  text(aTxt, cx, y + h - 22);
}

// ---- Readout: area, stress in psi and psf, limit, factor of safety ----
function drawReadout(c, x, y, w, wide) {
  const ts = wide ? 16 : 15, lh = wide ? 24 : 17;
  const m = c.m;
  const area = m.ft2 ? nf(c.areaIn2 / 144, 0, 2) + ' ft²' : nf(c.areaIn2, 0, 3) + ' in²';
  const main = m.ft2 ? nfc(round(c.psf)) + ' psf' : nfc(round(c.psi)) + ' psi';
  const alt = m.ft2 ? nf(c.psi, 0, 1) + ' psi' : nfc(round(c.psf)) + ' psf';
  const lines = [];
  if (wide) {
    lines.push('Force F = ' + nfc(c.load) + ' lb');
    lines.push('Area A = ' + area);
  } else {
    lines.push('F = ' + nfc(c.load) + ' lb, A = ' + area);
  }
  lines.push('Stress = F ÷ A = ' + main);
  lines.push('(same stress = ' + alt + ')');
  lines.push('Limit: ' + nfc(c.lim.v) + ' ' + c.lim.u + ' (illustrative)');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(ts);
  fill('black');
  lines.forEach((s, i) => text(s, x, y + i * lh));
  const fsTxt = c.fs === Infinity ? 'no load' : nf(c.fs, 0, 2);
  fill(c.col);
  textSize(wide ? 18 : 16);
  const fy = y + lines.length * lh + (wide ? 4 : 0);
  if (wide) {
    text('Factor of safety = ' + fsTxt, x, fy);
    text('Status: ' + c.state, x, fy + 24);
  } else {
    text('Factor of safety ' + fsTxt + ': ' + c.state, x, fy);
  }
}

// ---- Gauge: stress against the limit; green below FS 1.5, orange from FS 1.5 to 1.0, red above the limit ----
function drawGauge(c) {
  const gx = 16, gw = canvasWidth - 32, gy = 296, gh = 18;
  const top = c.lim.v * 1.5;
  const xAt = v => gx + gw * constrain(v / top, 0, 1);
  const xLim = xAt(c.lim.v), xSafe = xAt(c.lim.v / 1.5);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  text('Stress vs. limit', gx, gy - 24);
  textAlign(RIGHT, TOP);
  fill(c.col);
  text((c.m.ft2 ? nfc(round(c.psf)) + ' psf' : nfc(round(c.psi)) + ' psi') + '  ' + c.state, gx + gw, gy - 24);
  noStroke();
  fill('seagreen');
  rect(gx, gy, xSafe - gx, gh);
  fill('darkorange');
  rect(xSafe, gy, xLim - xSafe, gh);
  fill('crimson');
  rect(xLim, gy, gx + gw - xLim, gh);
  // limit marker
  stroke('black');
  strokeWeight(3);
  line(xLim, gy - 4, xLim, gy + gh + 4);
  // pointer for the current stress
  const xs = xAt(c.stress);
  strokeWeight(3);
  stroke('navy');
  line(xs, gy - 6, xs, gy + gh + 2);
  noStroke();
  fill('navy');
  triangle(xs - 6, gy - 12, xs + 6, gy - 12, xs, gy - 3);
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('0', gx, gy + gh + 4);
  textAlign(CENTER, TOP);
  text('Limit ' + nfc(c.lim.v) + ' ' + c.lim.u, constrain(xLim, gx + 65, gx + gw - 65), gy + gh + 4);
  textAlign(RIGHT, TOP);
  text('1.5 x limit', gx + gw, gy + gh + 4);
  fill('dimgray');
  textAlign(LEFT, TOP);
  text('Green: FS 1.5 or more | Orange: FS 1.0 to 1.5 | Red: over limit', gx, gy + gh + 24);
}

// ---- Message: which change restores the margin ----
function drawMessage(c) {
  const x = 12, y = 356, w = canvasWidth - 24, h = 50;
  stroke(c.col);
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(canvasWidth < 500 ? 14 : 15);
  let msg;
  const m = c.m;
  if (snow.active) {
    msg = 'Snowshoe: the load stays at ' + nfc(c.load) + ' lb while the area changes. Watch the stress move the other way.';
  } else if (c.stress === 0) {
    msg = 'No load, no stress. Move the load slider to see the stress rise.';
  } else if (c.fs >= 1.5) {
    msg = 'SAFE: the stress is ' + nf(100 / c.fs, 0, 0) + '% of the limit. Raising the load or shrinking the area raises the stress.';
  } else {
    // area that would give FS 1.5 at this load, and load that would give FS 1.5 at this area
    const needIn2 = c.areaIn2 * 1.5 / c.fs;
    const needSize = m.key === 'rod' ? sqrt(4 * needIn2 / PI) : (m.ft2 ? sqrt(needIn2) / 12 : sqrt(needIn2));
    const maxLoad = c.load * c.fs / 1.5;
    msg = (c.fs < 1 ? 'OVER LIMIT: ' : 'LOW MARGIN: ') + 'for a factor of safety of 1.5, use less load (' + nfc(round(maxLoad)) + ' lb or less) or more area (' + m.sizeName.toLowerCase() + ' ' + nf(needSize, 0, 2) + ' ' + m.unit + ' or more).';
  }
  text(msg, x + 8, y + 5, w - 16, h - 8);
}

// ---- Control labels ----
function drawControlLabels(c) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Member:', 10, drawHeight + 19);
  text('Limit:', 10, drawHeight + 54);
  text('Load: ' + nfc(c.load) + ' lb', 10, drawHeight + 89);
  text(c.m.sizeName + ': ' + nf(c.size, 0, 2) + ' ' + c.m.unit, 10, drawHeight + 124);
}

function resizeSliders() {
  const w = max(100, canvasWidth - sliderLeftMargin - 20);
  loadSlider.size(w);
  sizeSlider.size(w);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  resizeSliders();
  snowButton.position(sliderLeftMargin + 150, drawHeight + 6);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
