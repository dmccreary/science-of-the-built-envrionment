// Glulam Char Section Explorer MicroSim - a timber beam cross-section drawn to scale, with a char layer that grows inward and the remaining section modulus S = b d^2 / 6
// CANVAS_HEIGHT: 540
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 320;
let controlHeight = 220; // six rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 265; // left edge of the sliders; labels sit to the left
let defaultTextSize = 16;

// ---- Constants: the Riverbend beam of Chapter 18 and the small comparison member ----
const SMALL = { b: 3.125, d: 12 };   // inches
const FIT_DEPTH = 24;                // the drawing scale fits a beam this deep, or the actual depth if larger
const MIN_WIDTH = 2;                 // inches of remaining width below which a warning appears

// ---- State ----
let compareOn = false;
let hits = [];       // drawn members, rebuilt each frame, used for hover tests

// ---- Controls ----
let timeSlider, widthSlider, depthSlider, rateSlider, facesRadio, compareButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  timeSlider = createSlider(0, 120, 60, 5);
  widthSlider = createSlider(3.125, 12.25, 8.75, 0.125);
  depthSlider = createSlider(9, 36, 24, 1.5);
  rateSlider = createSlider(1.0, 2.0, 1.5, 0.1);
  facesRadio = createRadio();
  facesRadio.option('Three sides (beam)');
  facesRadio.option('Four sides (column)');
  facesRadio.selected('Three sides (beam)');
  compareButton = createButton('Compare with a 3.125 in by 12 in member');
  compareButton.mousePressed(() => {
    compareOn = !compareOn;
    compareButton.html(compareOn ? 'Hide the 3.125 in by 12 in member' : 'Compare with a 3.125 in by 12 in member');
  });
  positionControls();

  describe('A rectangular timber beam cross-section drawn to scale. The original outline is dashed gray, a dark char layer grows inward from the exposed faces as fire exposure time increases, and the remaining section is tan. A readout gives the char depth, the remaining width and depth, the section modulus, and the percentage of the original capacity. Sliders set exposure time, beam width, beam depth, and charring rate, and a radio chooses three or four exposed faces. A button overlays a small 3.125 by 12 inch member to show how quickly it is consumed.', LABEL);
}

function sliderW() { return constrain(canvasWidth - sliderLeftMargin - 15, 100, 300); }

function positionControls() {
  const y = i => drawHeight + 8 + i * 35;
  [timeSlider, widthSlider, depthSlider, rateSlider].forEach((s, i) => { s.position(sliderLeftMargin, y(i)); s.size(sliderW()); });
  facesRadio.position(10, y(4));
  compareButton.position(10, y(5) - 2);
}

// ---- Model: char depth, remaining section, section modulus (inches) ----
function charDepth() { return rateSlider.value() * timeSlider.value() / 60; }
function fourSides() { return facesRadio.value() === 'Four sides (column)'; }
function afterFire(b, d, c) {
  const rw = max(0, b - 2 * c);
  const rd = max(0, d - (fourSides() ? 2 : 1) * c);
  const S = (rw > 0 && rd > 0) ? rw * rd * rd / 6 : 0;
  const S0 = b * d * d / 6;
  return { rw: rw, rd: rd, S: S, S0: S0, pct: 100 * S / S0 };
}
const fmt = (v, n) => String(parseFloat(v.toFixed(n)));

const num = v => Math.round(v).toLocaleString('en-US');   // whole number with thousands separator

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
  text('Glulam Char Section Explorer', canvasWidth / 2, 6);

  const c = charDepth(), b = widthSlider.value(), d = depthSlider.value();
  const main = afterFire(b, d, c);
  const secW = max(150, min(floor(canvasWidth * 0.38), 300));
  hits = [];
  drawSections(b, d, c, main, secW);
  drawReadout(b, d, c, main, secW);
  drawHoverTip(c);
  drawControlLabels();
}

// ---- Cross-section drawing, to scale ----
function drawSections(b, d, c, m, secW) {
  const gap = 18;
  const sH = (drawHeight - 92) / max(FIT_DEPTH, d);                                  // fit the height
  const sW = (secW - 24 - (compareOn ? gap : 0)) / (b + (compareOn ? SMALL.b : 0));  // fit the width
  const s = min(sH, sW);                                                             // pixels per inch
  const total = b * s + (compareOn ? gap + SMALL.b * s : 0);
  const x0 = 10 + (secW - 10 - total) / 2;
  const top = 58;
  drawMember(x0, top, b, d, c, m, s, 'main');
  if (compareOn) drawMember(x0 + b * s + gap, top, SMALL.b, SMALL.d, c, afterFire(SMALL.b, SMALL.d, c), s, 'small');
  // deck above a three-sided beam
  const deckW = total + 16;
  if (!fourSides()) {
    stroke('dimgray');
    strokeWeight(1);
    fill('lightgray');
    rect(x0 - 8, top - 9, deckW, 8);
    noStroke();
    fill('dimgray');
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('floor deck (top protected)', x0 - 8 + deckW / 2, top - 11);
  } else {
    noStroke();
    fill('dimgray');
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text('all four faces exposed', x0 + total / 2, top - 4);
  }
  // scale bar
  stroke('black');
  strokeWeight(2);
  line(14, drawHeight - 14, 14 + 6 * s, drawHeight - 14);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text('6 in', 14 + 6 * s + 6, drawHeight - 9);
}

function drawMember(x, y, b, d, c, m, s, id) {
  const w = b * s, h = d * s;
  // char fills the original outline; the tan remaining section sits on top
  noStroke();
  fill('darkslategray');
  rect(x, y, w, h);
  let rx = 0, ry = 0, rw = 0, rh = 0;
  if (m.rw > 0 && m.rd > 0) {
    rx = x + c * s;
    ry = y + (fourSides() ? c * s : 0);
    rw = m.rw * s;
    rh = m.rd * s;
    fill('tan');
    rect(rx, ry, rw, rh);
  }
  // original outline, dashed
  noFill();
  stroke('gray');
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  rect(x, y, w, h);
  drawingContext.setLineDash([]);
  // label under the member
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  text(fmt(b, 3) + (id === 'small' ? ' ×\n' : ' × ') + fmt(d, 1) + ' in', x + w / 2, y + h + 4);
  hits.push({ id: id, x: x, y: y, w: w, h: h, rx: rx, ry: ry, rw: rw, rh: rh, m: m, b: b, d: d });
}

// ---- Readout panel ----
function drawReadout(b, d, c, m, secW) {
  const x = secW + 20, w = canvasWidth - x - 10;
  let y = 40;
  noStroke();
  textAlign(LEFT, TOP);
  fill('navy');
  textSize(16);
  text('After ' + timeSlider.value() + ' min of fire', x, y, w, 24);
  y += 26;
  fill('black');
  textSize(14);
  const lines = [
    'Char depth: ' + fmt(rateSlider.value(), 1) + ' in/h × ' + timeSlider.value() + ' min ÷ 60 = ' + fmt(c, 2) + ' in',
    'Remaining width: ' + fmt(b, 3) + ' − 2 × ' + fmt(c, 2) + ' = ' + fmt(m.rw, 3) + ' in',
    'Remaining depth: ' + fmt(d, 1) + ' − ' + (fourSides() ? '2 × ' : '') + fmt(c, 2) + ' = ' + fmt(m.rd, 3) + ' in',
    'Section modulus S = bd²/6 = ' + num(m.S) + ' in³ (was ' + num(m.S0) + ')'
  ];
  for (const ln of lines) {
    text(ln, x, y, w, 60);
    y += max(1, ceil(textWidth(ln) * 1.1 / w)) * 17.5 + 3;
  }
  fill('navy');
  textSize(16);
  const pctLine = 'Capacity left: ' + fmt(m.pct, 0) + ' % of original';
  text(pctLine, x, y, w, 40);
  y += max(1, ceil(textWidth(pctLine) * 1.1 / w)) * 20 + 4;
  textSize(14);
  if (m.rw < MIN_WIDTH) {
    fill('firebrick');
    const warn = 'Warning: remaining width is ' + fmt(m.rw, 3) + ' in, under ' + MIN_WIDTH + ' in. The section may no longer carry load.';
    text(warn, x, y, w, 70);
    y += max(1, ceil(textWidth(warn) * 1.1 / w)) * 17.5 + 4;
  }
  if (compareOn) {
    const sm = afterFire(SMALL.b, SMALL.d, c);
    fill('black');
    const cmp = 'Small member (3.125 × 12 in): ' + fmt(sm.rw, 3) + ' × ' + fmt(sm.rd, 3) + ' in left, ' + fmt(sm.pct, 0) + ' % of capacity. The same char removes far more of a small member.';
    text(cmp, x, y, w, 90);
  }
}

function drawHoverTip(c) {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  for (const h of hits) {
    if (mouseX < h.x || mouseX > h.x + h.w || mouseY < h.y || mouseY > h.y + h.h) continue;
    const inRem = h.rw > 0 && mouseX >= h.rx && mouseX <= h.rx + h.rw && mouseY >= h.ry && mouseY <= h.ry + h.rh;
    let msg;
    if (c <= 0) msg = 'No char yet: the fire exposure is 0 minutes.';
    else if (!inRem) msg = 'Char layer: ' + fmt(c, 2) + ' in thick (' + fmt(rateSlider.value(), 1) + ' in/h × ' + timeSlider.value() + ' min ÷ 60). Charred wood carries no load.';
    else msg = 'Remaining section: ' + fmt(h.m.rw, 3) + ' in wide by ' + fmt(h.m.rd, 3) + ' in deep, still carrying load.';
    const w = min(canvasWidth - 20, 250);
    textSize(14);
    const th = 12 + max(1, ceil(textWidth(msg) * 1.1 / (w - 16))) * 17.5;
    const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
    const ty = constrain(mouseY + 14, 4, drawHeight - th - 4);
    stroke('navy');
    strokeWeight(1);
    fill(255, 255, 240, 245);
    rect(tx, ty, w, th, 8);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    text(msg, tx + 8, ty + 6, w - 16, th);
    return;
  }
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Fire exposure (minutes): ' + timeSlider.value(), 10, drawHeight + 20);
  text('Beam width (in): ' + fmt(widthSlider.value(), 3), 10, drawHeight + 55);
  text('Beam depth (in): ' + fmt(depthSlider.value(), 1), 10, drawHeight + 90);
  text('Charring rate (in/h): ' + fmt(rateSlider.value(), 1), 10, drawHeight + 125);
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
