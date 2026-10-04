// Roof Drainage and Ponding Calculator MicroSim - flow a roof drain must carry, and how clogged drains turn a storm into a standing-water load
// CANVAS_HEIGHT: 515
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 330;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

// ---- Constants (illustrative values; the real ones come from the code and local rainfall data) ----
const GAL_PER_IN_FT2 = 0.623;     // one inch of rain over one square foot, in gallons
const PSF_PER_IN = 5.2;           // weight of one inch of standing water, psf
const DRAIN_CAP = 150;            // gpm one open drain can pass (illustrative)
const SCUPPER_IN = 2;             // height of the secondary overflow above the roof surface, in
const STORM_MIN = 30;             // length of the storm, minutes
const RUN_MS = 9000;              // real time used to play the 30-minute storm
const DEFLECT_IN_PER_PSF = 0.1;   // midspan deflection per psf of ponding load, about 30 ft span (illustrative)
const FEEDBACK = 0.3;             // extra load fraction that each inch of deflection brings back as water (illustrative)

// ---- Controls and state ----
let areaSlider, rainSlider, drainSelect, runButton, overflowCheck, clogChecks = [];
let storm = { running: false, t0: 0 };
let m = {};                       // model results
let drainSpots = [];              // screen positions of the drain symbols in the plan view
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);
  textSize(defaultTextSize);

  areaSlider = createSlider(2000, 20000, 9000, 500);
  rainSlider = createSlider(1, 6, 3, 0.5);
  drainSelect = createSelect();
  for (let n = 2; n <= 8; n++) drainSelect.option(String(n));
  drainSelect.selected('4');
  runButton = createButton('Run storm for 30 minutes');
  runButton.mousePressed(() => { storm = { running: true, t0: millis() }; });
  overflowCheck = createCheckbox('Secondary overflow installed', false);
  overflowCheck.style('font-size', '14px');
  for (let i = 0; i < 8; i++) {
    const c = createCheckbox(String(i + 1), false);
    c.style('font-size', '14px');
    clogChecks.push(c);
  }

  positionControls();
  describe('A plan view of a rectangular roof with two to eight drain symbols, and below it a side section showing the roof deck, the standing water, a depth gauge, and an exaggerated deflection curve. Sliders set roof area from 2,000 to 20,000 square feet and rainfall intensity from 1 to 6 inches per hour. A selector sets the number of drains, a checkbox for each drain marks it as clogged, and a checkbox adds a secondary overflow scupper. A button runs a 30-minute storm. A readout panel shows total flow in gallons per minute, flow per open drain, and the ponding load in pounds per square foot and total pounds.', LABEL);
}

function positionControls() {
  const r = [0, 1, 2, 3, 4].map(i => drawHeight + 6 + i * 35);
  const sw = max(100, canvasWidth - sliderLeftMargin - 20);
  areaSlider.position(sliderLeftMargin, r[0] + 4); areaSlider.size(sw);
  rainSlider.position(sliderLeftMargin, r[1] + 4); rainSlider.size(sw);
  drainSelect.position(80, r[2] + 1);
  runButton.position(150, r[2]);
  overflowCheck.position(10, r[3]);
  clogChecks.forEach((c, i) => c.position(110 + i * 38, r[4]));
  updateClogVisibility();
}

function nDrains() { return int(drainSelect.value()); }

function updateClogVisibility() {
  clogChecks.forEach((c, i) => { if (i < nDrains()) c.show(); else { c.hide(); c.checked(false); } });
}

// ---- Model ----
function stormTime() {
  if (!storm.running) return STORM_MIN;
  const t = (millis() - storm.t0) / RUN_MS * STORM_MIN;
  if (t >= STORM_MIN) { storm.running = false; return STORM_MIN; }
  return t;
}

function computeModel() {
  updateClogVisibility();
  const A = areaSlider.value(), i = rainSlider.value(), N = nDrains();
  const clogged = clogChecks.slice(0, N).map(c => c.checked());
  const nOpen = clogged.filter(v => !v).length;
  const Q = A * i * GAL_PER_IN_FT2 / 60;                 // gpm, the flow every drain system must carry
  const cap = nOpen * DRAIN_CAP;
  const t = stormTime();
  const rate = max(0, Q - cap) / (A * GAL_PER_IN_FT2);   // in of standing water per minute
  const overflow = overflowCheck.checked();
  let depth = rate * t;
  const spilling = overflow && depth >= SCUPPER_IN;
  if (overflow) depth = min(depth, SCUPPER_IN);
  const load = PSF_PER_IN * depth;
  const defl0 = DEFLECT_IN_PER_PSF * load;
  const defl = defl0 / (1 - FEEDBACK);                   // deflection with the extra water it holds
  m = { A, i, N, clogged, nOpen, Q, cap, t, rate, overflow, depth, spilling, load, total: load * A, defl,
        perOpen: nOpen > 0 ? Q / nOpen : Infinity, perDrain: Q / N, final: rate * STORM_MIN };
}

function statusInfo() {
  if (m.rate <= 0) return { col: 'seagreen', t: m.nOpen === m.N ? 'Drains keep up. No standing water.' : 'The open drains still carry the flow. No standing water.' };
  if (m.spilling) return { col: 'darkorange', t: 'Secondary overflow is spilling. Depth holds at ' + nf(SCUPPER_IN, 1, 1) + ' in.' };
  if (m.overflow) return { col: 'darkorange', t: 'Water is ponding. The overflow opens at ' + nf(SCUPPER_IN, 1, 1) + ' in.' };
  if (m.depth > 0.05) return { col: 'crimson', t: 'Progressive ponding: deflection adds water, which adds deflection.' };
  return { col: 'darkorange', t: 'The drains are overloaded, so water starts to pond.' };
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  computeModel();

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
  text('Roof Drainage and Ponding', canvasWidth / 2, 6);

  const leftW = floor((canvasWidth - 30) * 0.58);
  drawPlan(10, 36, leftW, 112);
  drawSection(10, 152, leftW, 134);
  drawReadouts(10 + leftW + 10, 36, canvasWidth - leftW - 30, 250);
  drawStatus();
  drawControlLabels();
}

function drawPlan(x, y, w, h) {
  stroke('silver'); strokeWeight(1); fill('white');
  rect(x, y, w, h, 6);
  const len = sqrt(2 * m.A), wid = m.A / len;              // plan dimensions, ft, for a 2 : 1 roof
  const sc = min((w - 28) / len, (h - 30) / wid);
  const rw = len * sc, rh = wid * sc, rx = x + (w - rw) / 2, ry = y + 22 + (h - 30 - rh) / 2;
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text('Plan: ' + nf(len, 1, 0) + ' ft × ' + nf(wid, 1, 0) + ' ft (' + commas(m.A) + ' ft²)', x + 6, y + 3);
  stroke('dimgray'); strokeWeight(2); fill('lightgray');
  rect(rx, ry, rw, rh);
  const cols = m.N <= 3 ? m.N : ceil(m.N / 2), rows = m.N <= 3 ? 1 : 2;
  drainSpots = [];
  for (let k = 0; k < m.N; k++) {
    const cx = rx + ((k % cols) + 0.5) * rw / cols, cy = ry + (floor(k / cols) + 0.5) * rh / rows;
    drainSpots.push({ x: cx, y: cy });
    const bad = m.clogged[k];
    stroke(bad ? 'darkred' : 'black'); strokeWeight(2);
    fill(bad ? 'crimson' : 'white');
    circle(cx, cy, 20);
    if (bad) { stroke('white'); strokeWeight(2); line(cx - 5, cy - 5, cx + 5, cy + 5); line(cx - 5, cy + 5, cx + 5, cy - 5); }
    else { stroke('black'); strokeWeight(1); line(cx - 6, cy, cx + 6, cy); line(cx, cy - 6, cx, cy + 6); }
    noStroke(); fill('black'); textAlign(LEFT, CENTER); textSize(12);
    text(k + 1, cx + 13, cy);
  }
}

function commas(v) { return nf(round(v), 1, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }

function drawSection(x, y, w, h) {
  stroke('silver'); strokeWeight(1); fill('white');
  rect(x, y, w, h, 6);
  const PX = 12;                                           // pixels per inch of depth
  const xa = x + 34, xb = x + w - 14, y0 = y + h - 50, mid = (xa + xb) / 2;
  const defPx = min(m.defl * PX * 2, 40);                  // deflection drawn at twice its size so it is visible
  const deckY = xx => y0 + defPx * sin(PI * (xx - xa) / (xb - xa));
  const surf = y0 - m.depth * PX;                          // water surface, above the deck level at the supports

  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text('Side section (deflection ×2)', x + 6, y + 3);

  // water
  if (m.depth > 0.02) {
    noStroke(); fill(30, 144, 255, 170);
    beginShape();
    for (let xx = xa; xx <= xb; xx += 3) vertex(xx, deckY(xx));
    vertex(xb, deckY(xb));
    vertex(xb, surf); vertex(xa, surf);
    endShape(CLOSE);
  }
  // parapet walls and deck
  stroke('dimgray'); strokeWeight(2); fill('gray');
  rect(xa - 6, y0 - 5 * PX, 6, 5 * PX + 6); rect(xb, y0 - 5 * PX, 6, 5 * PX + 6);
  noFill(); stroke('dimgray'); strokeWeight(4);
  beginShape(); for (let xx = xa; xx <= xb; xx += 3) vertex(xx, deckY(xx)); vertex(xb, deckY(xb)); endShape();
  // secondary overflow scupper in the right wall
  if (m.overflow) {
    noStroke(); fill('aliceblue'); rect(xb - 1, y0 - SCUPPER_IN * PX - 12, 8, 12);
    stroke('darkorange'); strokeWeight(2); noFill(); rect(xb - 1, y0 - SCUPPER_IN * PX - 12, 8, 12);
    noStroke(); fill('darkorange'); textAlign(RIGHT, BOTTOM); textSize(12);
    text('scupper ' + nf(SCUPPER_IN, 1, 1) + ' in', xb - 4, y0 - 5 * PX - 2);
    if (m.spilling) {
      const ph = mouseOverCanvas ? (millis() / 400) % 1 : 0;   // drops move only while the pointer is over the canvas
      fill('dodgerblue');
      for (let k = 0; k < 3; k++) circle(xb + 8 + ((k + ph) % 3) * 3, y0 - SCUPPER_IN * PX - 6 + ((k + ph) % 3) * 12, 6);
    }
  }
  // primary drain near the left end
  const dx = xa + 22;
  const allBad = m.nOpen === 0;
  stroke(allBad ? 'crimson' : 'seagreen'); strokeWeight(5);
  line(dx, y0 + 3, dx, y0 + 22);
  if (allBad) { strokeWeight(3); line(dx - 6, y0 + 8, dx + 6, y0 + 20); line(dx - 6, y0 + 20, dx + 6, y0 + 8); }
  const dl = allBad ? 'all drains clogged' : 'drain open';
  textSize(12);
  noStroke(); fill(255, 255, 255, 230); rect(dx + 6, y0 + 9, textWidth(dl) + 6, 15, 4);
  fill(allBad ? 'crimson' : 'seagreen'); textAlign(LEFT, TOP);
  text(dl, dx + 9, y0 + 10);
  // depth gauge (black ruler on the left wall)
  stroke('black'); strokeWeight(1);
  line(xa - 10, y0, xa - 10, y0 - 5 * PX);
  fill('black'); textAlign(RIGHT, CENTER); textSize(12);
  for (let k = 0; k <= 4; k++) { stroke('black'); line(xa - 14, y0 - k * PX, xa - 10, y0 - k * PX); noStroke(); text(k, xa - 16, y0 - k * PX); }
  noStroke(); textAlign(RIGHT, TOP); text('in', xa - 16, y0 + 5);
  // water level label
  if (m.depth > 0.02) {
    fill('navy'); textAlign(CENTER, BOTTOM); textSize(14);
    text('depth ' + nf(m.depth, 1, 2) + ' in', mid, min(surf, y0 - 10) - 3);
  }
}

function drawReadouts(x, y, w, h) {
  stroke('silver'); strokeWeight(1); fill('white');
  rect(x, y, w, h, 8);
  noStroke(); textAlign(LEFT, TOP);
  let yy = y + 6;
  const row = (label, val, col, big) => {
    fill('dimgray'); textSize(12); text(label, x + 8, yy, w - 16, 18);
    fill(col || 'black'); textSize(big ? 20 : 16); text(val, x + 8, yy + 16, w - 16, 28);
    yy += big ? 46 : 42;
  };
  const comma = commas;
  row('Total flow to carry', comma(m.Q) + ' gpm', 'navy', true);
  const over = m.perOpen > DRAIN_CAP;
  row('Per open drain (cap ' + DRAIN_CAP + ')', m.nOpen > 0 ? comma(m.perOpen) + ' gpm' : 'no open drain', over ? 'crimson' : 'black');
  row(storm.running ? 'Load at t = ' + nf(m.t, 1, 0) + ' min' : 'Load after 30 min', nf(m.load, 1, 1) + ' psf', m.load > 0 ? 'crimson' : 'seagreen');
  row('Total standing water', comma(m.total) + ' lb', m.load > 0 ? 'crimson' : 'seagreen');
  fill('dimgray'); textSize(12);
  text('Midspan deflection about ' + nf(m.defl, 1, 2) + ' in. Load = ' + PSF_PER_IN + ' psf per inch of depth.', x + 8, yy, w - 16, 52);
}

function drawStatus() {
  const s = statusInfo();
  stroke(s.col); strokeWeight(2); fill('white');
  rect(10, 292, canvasWidth - 20, 36, 6);
  noStroke(); fill(s.col); textAlign(LEFT, CENTER); textSize(14);
  text(s.t, 18, 296, canvasWidth - 36, 28);
}

function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER); textSize(defaultTextSize);
  const r = [0, 1, 2, 3, 4].map(i => drawHeight + 6 + i * 35);
  text('Roof area: ' + commas(areaSlider.value()) + ' ft²', 10, r[0] + 12);
  text('Rain: ' + nf(rainSlider.value(), 1, 1) + ' in/h', 10, r[1] + 12);
  text('Drains:', 10, r[2] + 12);
  textSize(14);
  text('Clogged:', 10, r[4] + 12);
  fill('dimgray'); textSize(12);
  textAlign(RIGHT, CENTER);
  text('Illustrative values', canvasWidth - 10, r[3] + 12);
}

function mousePressed() {
  // clicking a drain symbol in the plan toggles its Clogged checkbox
  if (mouseY > drawHeight) return;
  drainSpots.forEach((d, k) => {
    if (dist(mouseX, mouseY, d.x, d.y) < 12) clogChecks[k].checked(!clogChecks[k].checked());
  });
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
