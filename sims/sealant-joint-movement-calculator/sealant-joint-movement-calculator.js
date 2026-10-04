// Sealant Joint Movement Calculator MicroSim - thermal movement of a panel, the minimum joint width for a sealant rating, and a to-scale joint that opens and closes
// CANVAS_HEIGHT: 686
// Bloom Level 3 (Apply)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 536;
let controlHeight = 150; // four rows of controls, two controls per row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 100; // label width in each half of the control region
let defaultTextSize = 16;

// ---- Data: linear thermal expansion coefficients (millionths per F), approximate ----
const materials = [
  { name: 'aluminum', a: 13, fill: 'silver' },
  { name: 'steel', a: 6.5, fill: 'lightsteelblue' },
  { name: 'vinyl', a: 30, fill: 'khaki' },
  { name: 'wood across grain', a: 20, fill: 'burlywood' },
  { name: 'concrete', a: 5.5, fill: 'lightgray' }
];
const ratings = [12.5, 25, 35, 50];   // sealant movement capability, plus or minus percent
const THREE_SIDED = 0.25;             // illustrative: a bead stuck to three sides can use about a quarter of its rating
const NEAR = 0.8;                     // yellow when the strain reaches 80 percent of the limit

// ---- Controls ----
let matSel, ratingSel, lenSlider, widthSlider, lowSlider, highSlider, nowSlider, threeBox;

let P, T; // drawing panel and table panel
let tipOn = false; // true while the pointer is over the sealant

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  matSel = createSelect();
  materials.forEach(m => matSel.option(m.name));
  matSel.selected('aluminum');
  ratingSel = createSelect();
  ratings.forEach(r => ratingSel.option('±' + r + '%'));
  ratingSel.selected('±25%');
  lenSlider = createSlider(2, 20, 10, 0.5);
  widthSlider = createSlider(2, 16, 8, 1); // sixteenths of an inch, 1/8 in to 1 in
  lowSlider = createSlider(-30, 160, -20, 1);
  highSlider = createSlider(-30, 160, 140, 1);
  nowSlider = createSlider(-30, 160, 60, 1);
  threeBox = createCheckbox('Three-sided adhesion', false);

  positionControls();
  describe('A to-scale cross-section of a sealant joint between two panels, with the sealant on top of a backer rod. The joint opens and closes as a temperature slider moves from cold to hot, and the sealant turns green, yellow, or red as its strain nears or passes its rating. A table lists the calculation steps: the temperature range, the thermal movement, the minimum joint width, and whether the chosen width passes. A checkbox shows how the sealant tears when it sticks to three sides.', LABEL);
}

// two controls per row: the left half starts at x = 10, the right half at the middle
function positionControls() {
  const half = canvasWidth / 2;
  const sw = max(70, half - sliderLeftMargin - 16);
  const row = k => drawHeight + 6 + k * 35;
  matSel.position(78, row(0));
  ratingSel.position(half + 66, row(0));
  lenSlider.position(sliderLeftMargin, row(1) + 2);
  widthSlider.position(half + 6 + sliderLeftMargin, row(1) + 2);
  lowSlider.position(sliderLeftMargin, row(2) + 2);
  highSlider.position(half + 6 + sliderLeftMargin, row(2) + 2);
  nowSlider.position(sliderLeftMargin, row(3) + 2);
  threeBox.position(half + 6, row(3));
  [lenSlider, widthSlider, lowSlider, highSlider, nowSlider].forEach(s => s.size(sw));
}

// ---- Calculation ----
function mat() { return materials.find(m => m.name === matSel.value()); }
function cap() { return parseFloat(ratingSel.value().replace('±', '')) / 100; }
function calc() {
  const m = mat();
  const lo = min(lowSlider.value(), highSlider.value()), hi = max(lowSlider.value(), highSlider.value());
  const lIn = lenSlider.value() * 12;
  const alpha = m.a * 1e-6;
  const dT = hi - lo;
  const dL = alpha * lIn * dT;
  const limit = cap() * (threeBox.checked() ? THREE_SIDED : 1); // usable strain
  const wMin = dL / (2 * limit);
  const w = widthSlider.value() / 16;
  const util = dL / 2 / w / limit; // design strain as a fraction of the usable limit
  const tMid = (lo + hi) / 2;
  const t = nowSlider.value();
  const grow = alpha * lIn * (t - tMid);   // the panel grows when warm, closing the joint
  const wNow = max(0, w - grow);
  const strain = (wNow - w) / w;           // plus = stretched, minus = squeezed
  const ratio = abs(strain) / limit;
  const lMaxFt = 2 * limit * w / (alpha * dT) / 12; // longest panel this joint can serve
  return { m, lo, hi, lIn, alpha, dT, dL, limit, wMin, w, util, tMid, t, grow, wNow, strain, ratio, pass: util <= 1.0001, lMaxFt };
}

function draw() {
  updateCanvasSize();

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
  text('Sealant Joint Movement Calculator', canvasWidth / 2, 8);

  layoutPanels();
  const c = calc();
  drawJoint(c);
  drawTable(c);
  if (tipOn) drawTip(c, round(c.ratio * 100)); // drawn last so the table does not cover it
  drawControlLabels(c);
}

function layoutPanels() {
  const wide = canvasWidth >= 640;
  if (wide) {
    const pw = floor(canvasWidth * 0.5);
    P = { x: 10, y: 42, w: pw - 10, h: drawHeight - 50 };
    T = { x: pw + 10, y: 42, w: canvasWidth - pw - 20, h: drawHeight - 50 };
  } else {
    P = { x: 6, y: 40, w: canvasWidth - 12, h: 232 };
    T = { x: 6, y: 276, w: canvasWidth - 12, h: drawHeight - 282 };
  }
}

function frac16(x) {
  const n = round(x * 16), whole = floor(n / 16);
  let num = n % 16, den = 16;
  while (num > 0 && num % 2 === 0) { num /= 2; den /= 2; }
  if (num === 0) return whole + ' in';
  return (whole > 0 ? whole + ' ' : '') + num + '/' + den + ' in';
}
const state = ratio => ratio > 1 ? 'red' : (ratio >= NEAR ? 'gold' : 'seagreen');

// ---- To-scale cross-section of the joint ----
function drawJoint(c) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  const s = P.w * 0.33;                           // pixels per inch, for the joint width and the movement
  const cx = P.x + P.w * 0.5;
  const y0 = P.y + 84;                            // outside face
  const H = min(190, P.h - 144);                  // panel depth shown (not to scale)
  const pw = P.w * 0.2;                          // panel length shown (not to scale)
  const xR = cx + s * c.w / 2;                    // the right panel is fixed
  const xL = xR - s * c.wNow;                     // the left panel grows toward it when warm
  const xA = cx - s * c.w / 2 - pw;               // far end of the left panel stays put
  const col = state(c.ratio);
  const torn = c.ratio > 1 && c.strain > 0;

  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, TOP);
  text('Panel at ' + c.t + '°F: joint is ' + nf(c.wNow, 0, 2) + ' in wide', P.x + P.w / 2, P.y + 6);
  textSize(14);
  fill('dimgray');
  text('(installed ' + frac16(c.w) + ' wide at ' + round(c.tMid) + '°F)', P.x + P.w / 2, P.y + 26);

  // panels
  stroke('dimgray');
  strokeWeight(2);
  fill(c.m.fill);
  rect(xA, y0, xL - xA, H);
  rect(xR, y0, pw, H);
  const rodH = min(H - 20, max(10, 1.25 * c.w * s));
  const depth = max(0.25, c.w / 2) * s;
  if (threeBox.checked()) {
    // no backer rod: the bead fills the joint and sticks to the back as well
    fill(col);
    drawBead(xL, xR, y0, y0 + H, c);
    stroke('crimson');
    strokeWeight(4);
    line(xL - 2, y0 + H, xR + 2, y0 + H);
    noStroke();
    fill('crimson');
    textSize(14);
    textAlign(CENTER, TOP);
    text('sticks to the back too', cx, y0 + H + 5);
  } else {
    stroke('dimgray');
    strokeWeight(1);
    fill('gray');
    ellipse((xL + xR) / 2, y0 + depth + rodH / 2, max(3, xR - xL), rodH);
    fill(col);
    drawBead(xL, xR, y0, y0 + depth, c);
  }
  // tear mark
  if (torn) {
    stroke('black');
    strokeWeight(3);
    const mx = (xL + xR) / 2;
    const top = y0 + 1, bot = y0 + (threeBox.checked() ? min(70, H) : depth) - 2;
    line(mx, top, mx - 4, top + (bot - top) * 0.3);
    line(mx - 4, top + (bot - top) * 0.3, mx + 4, top + (bot - top) * 0.6);
    line(mx + 4, top + (bot - top) * 0.6, mx - 2, bot);
  }
  // dimension line across the joint face
  stroke('black');
  strokeWeight(1);
  line(xL, y0 - 14, xR, y0 - 14);
  line(xL, y0 - 20, xL, y0 - 8);
  line(xR, y0 - 20, xR, y0 - 8);

  // labels: text in the margins, leader lines to the parts
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text(nf(c.wNow, 0, 2) + ' in', (xL + xR) / 2, y0 - 16);
  const rx = xR + pw + 6, lw = P.x + P.w - rx - 2;
  textAlign(LEFT, CENTER);
  stroke('gray');
  strokeWeight(1);
  line((xL + xR) / 2, y0 + depth / 2, rx - 2, y0 + 10);
  if (!threeBox.checked()) line((xL + xR) / 2 + (xR - xL) / 3, y0 + depth + rodH / 2, rx - 2, y0 + 34);
  noStroke();
  fill('black');
  text('Sealant', rx, y0 + 10);
  if (!threeBox.checked()) text('Backer rod', rx, y0 + 34);
  textAlign(LEFT, TOP);
  text('Panel:', P.x + 6, y0 + 4);
  text(c.m.name.replace('wood across grain', 'wood'), P.x + 6, y0 + 21);
  text(lenSlider.value() + ' ft long', P.x + 6, y0 + 38);
  textAlign(CENTER, TOP);
  text('fixed', xR + pw / 2, y0 + H - 40);
  text('panel', xR + pw / 2, y0 + H - 23);

  // state of the sealant, written as text as well as colored
  const pct = round(c.ratio * 100);
  const word = c.ratio > 1 ? (torn ? 'TEARS' : 'CRUSHED') : (c.ratio >= NEAR ? 'NEAR LIMIT' : 'OK');
  const dir = c.strain > 0.0005 ? 'stretched' : (c.strain < -0.0005 ? 'squeezed' : 'at rest');
  const ly = P.y + P.h - 40;
  noStroke();
  fill(col);
  rect(P.x + 12, ly + 2, 16, 16, 3);
  fill('black');
  textAlign(LEFT, CENTER);
  const msg = word + ': ' + dir + ' ' + nf(abs(c.strain) * 100, 0, 0) + '% = ' + pct + '% of its limit';
  textSize(16);
  if (textWidth(msg) > P.w - 44) textSize(14);
  text(msg, P.x + 34, ly + 10);
  textSize(14);
  fill('dimgray');
  text('Hover over the sealant for its strain.', P.x + 12, ly + 30);
  tipOn = hoverSealant(xL, xR, y0, (threeBox.checked() ? y0 + H : y0 + depth));
}

// the bead is a rectangle whose sides curve in when stretched and bulge out when squeezed
function drawBead(xL, xR, yTop, yBot, c) {
  const neck = constrain(c.strain * (xR - xL) * 0.8, -12, 12);
  noStroke();
  beginShape();
  for (let k = 0; k <= 12; k++) vertex(xL + neck * sin(PI * k / 12), lerp(yTop, yBot, k / 12));       // left side
  for (let k = 12; k >= 0; k--) vertex(xR - neck * sin(PI * k / 12), lerp(yTop, yBot, k / 12));       // right side
  endShape(CLOSE);
  stroke('dimgray');
  strokeWeight(1);
  noFill();
  line(xL, yTop, xR, yTop);
}

function hoverSealant(xL, xR, y0, y1) {
  return mouseX >= xL - 3 && mouseX <= xR + 3 && mouseY >= y0 && mouseY <= y1;
}
function drawTip(c, pct) {
  const w = min(canvasWidth - 16, 250), h = 76;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 6, drawHeight - h - 6);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Sealant strain: ' + (c.strain >= 0 ? '+' : '−') + nf(abs(c.strain) * 100, 0, 1) + '%', tx + 8, ty + 6);
  text('Rating: ±' + nf(cap() * 100, 0, 1) + '%' + (threeBox.checked() ? ' (usable ' + nf(c.limit * 100, 0, 1) + '%)' : ''), tx + 8, ty + 24);
  fill(c.ratio > 1 ? 'crimson' : 'black');
  text(pct + '% of its limit', tx + 8, ty + 42);
  fill('dimgray');
  text('Plus = stretched, minus = squeezed.', tx + 8, ty + 58);
}

// ---- Calculation table and verdict ----
function drawTable(c) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(T.x, T.y, T.w, T.h, 8);
  const x = T.x + 10, w = T.w - 20;
  let y = T.y + 6;
  noStroke();
  fill('navy');
  textSize(16);
  textAlign(LEFT, TOP);
  text('Calculation steps', x, y);
  y += 22;
  textSize(14);
  const rows = [
    '1. α = ' + c.m.a + ' × 10⁻⁶ per °F (' + c.m.name + ', approximate)',
    '2. ΔT = ' + c.hi + ' − (' + c.lo + ') = ' + c.dT + '°F',
    '3. ΔL = α × L × ΔT = ' + c.m.a + '×10⁻⁶ × ' + c.lIn + ' in × ' + c.dT + ' = ' + nf(c.dL, 0, 3) + ' in',
    '4. Minimum width = ΔL ÷ (2 × ' + nf(c.limit, 0, 3) + ') = ' + nf(c.wMin, 0, 3) + ' in' + (c.wMin <= 1 ? ' (about ' + frac16(ceil(c.wMin * 16) / 16) + ')' : ''),
    '5. Chosen joint ' + frac16(c.w) + ' = ' + nf(c.w, 0, 3) + ' in uses ' + nf(c.util * 100, 0, 0) + '% of the usable rating'
  ];
  fill('black');
  rows.forEach(r => { y = para(r, x, y, w, 17) + 5; });
  // verdict
  y += 2;
  const ok = c.pass;
  const stuck = !ok && threeBox.checked() && c.dL / 2 / c.w <= cap();
  stroke(ok ? 'seagreen' : 'crimson');
  strokeWeight(2);
  fill('white');
  const vh = T.y + T.h - y - 8;
  rect(x - 4, y, w + 8, vh, 6);
  noStroke();
  fill(ok ? 'seagreen' : 'crimson');
  textSize(16);
  text(ok ? 'PASS: the joint is wide enough' : (stuck ? 'FAIL: sealant stuck on three sides' : 'FAIL: the joint is too narrow'), x + 4, y + 5);
  fill('black');
  textSize(14);
  para(verdict(c), x + 4, y + 26, w - 8, 16);
}

function verdict(c) {
  const stretchAtLow = (c.dL / 2 / c.w) * 100;
  if (c.pass) {
    return 'The movement is ±' + nf(stretchAtLow, 0, 1) + '% of the width, within the ±' + nf(c.limit * 100, 0, 1) + '% rating. Sealant depth about ' + frac16(max(0.25, c.w / 2)) + ' on a backer rod.';
  }
  if (threeBox.checked() && c.dL / 2 / c.w <= cap()) {
    return 'With a backer rod this width would pass. Stuck on three sides, the bead cannot stretch freely and can use only about a quarter of its rating (illustrative), so it tears. Add a backer rod so it sticks on two sides.';
  }
  let s = 'The joint must move ±' + nf(stretchAtLow, 0, 1) + '% but the sealant allows only ±' + nf(c.limit * 100, 0, 1) + '%, so it tears on the first cold night and is crushed on the hottest day. ';
  if (c.wMin <= 1) s += 'Use a joint at least ' + frac16(ceil(c.wMin * 16) / 16) + ' wide';
  else s += 'No joint up to 1 in works for this panel';
  s += ', or a panel no longer than ' + nf(floor(c.lMaxFt * 2) / 2, 0, 1) + ' ft at this width.';
  return s;
}

// wrapped text drawn word by word; returns the y below the last line
function para(str, x, y, w, lh) {
  const words = str.split(' ');
  let ln = '', yy = y;
  words.forEach(wd => {
    const t = ln ? ln + ' ' + wd : wd;
    if (textWidth(t) > w && ln) { text(ln, x, yy); yy += lh; ln = wd; } else ln = t;
  });
  if (ln) { text(ln, x, yy); yy += lh; }
  return yy;
}

// ---- Control labels: the left half and right half of each row ----
function drawControlLabels(c) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  const half = canvasWidth / 2, row = k => drawHeight + 20 + k * 35;
  text('Material:', 10, row(0));
  text('Rating:', half + 6, row(0));
  text('Length: ' + lenSlider.value() + ' ft', 10, row(1));
  text('Joint: ' + frac16(widthSlider.value() / 16), half + 6, row(1));
  text('Low: ' + lowSlider.value() + '°F', 10, row(2));
  text('High: ' + highSlider.value() + '°F', half + 6, row(2));
  text('Now: ' + c.t + '°F', 10, row(3));
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
