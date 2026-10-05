// Beam Reactions and Equilibrium Explorer MicroSim - support reactions of a simply supported beam from the three equilibrium conditions
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
let sliderLeftMargin = 150; // label width to the left of each slider
let defaultTextSize = 16;

// ---- State ----
let spanSlider, loadSlider, distSlider, modeRadio, stepButton, removeCheck;
let stepsShown = 3;     // how many of the three equations are revealed
let beamAngle = 0;      // radians, beam rotation about A when support B is removed
let dragging = false;
let hits = [];          // hover targets for arrows: { x, y, w, h, text }
let loadHit = null;     // draggable region of the point load

// geometry of the beam drawing
const beamY = 130, beamT = 14;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  spanSlider = createSlider(10, 60, 40, 1);
  loadSlider = createSlider(0, 12000, 6000, 250);
  distSlider = createSlider(0, 40, 10, 0.5);
  modeRadio = createRadio();
  modeRadio.option('Point load');
  modeRadio.option('Line (plf)');
  modeRadio.selected('Point load');
  modeRadio.changed(onModeChange);
  stepButton = createButton('Step through');
  stepButton.mousePressed(() => { stepsShown = (stepsShown >= 3) ? 1 : stepsShown + 1; });
  removeCheck = createCheckbox('Remove support B', false);

  positionControls();
  describe('A beam rests on a pin support at A on the left and a roller support at B on the right. A downward load, either one point load or a uniform line load, is applied. Green upward reaction arrows at A and B change length as the load moves. A panel shows the three equilibrium equations with the current numbers and an equilibrium check. Removing support B makes the beam rotate about A because the moment equation can no longer be satisfied.', LABEL);
}

// ---- Layout helpers ----
function isUniform() { return modeRadio.value() === 'Line (plf)'; }
function narrow() { return canvasWidth < 560; }
function colW() { return canvasWidth / 2; }
function labelW() { return narrow() ? 112 : sliderLeftMargin; }
function sliderW() { return max(60, colW() - labelW() - 18); }
function rowCenter(r) { return drawHeight + 17 + 35 * r; }

function positionControls() {
  const lx = 8, rx = colW() + 8, sw = sliderW();
  spanSlider.position(lx + labelW(), rowCenter(0) - 10);
  spanSlider.size(sw);
  loadSlider.position(rx + labelW(), rowCenter(0) - 10);
  loadSlider.size(sw);
  distSlider.position(lx + labelW(), rowCenter(1) - 10);
  distSlider.size(sw);
  modeRadio.position(rx, rowCenter(1) - 12);
  modeRadio.style('width', (colW() - 16) + 'px');
  modeRadio.style('font-size', narrow() ? '14px' : '16px');
  stepButton.position(lx, rowCenter(2) - 12);
  removeCheck.position(rx, rowCenter(2) - 12);
}

function onModeChange() {
  // the load slider means pounds for a point load and plf for a line load
  if (isUniform()) { loadSlider.elt.max = 1200; loadSlider.elt.step = 50; loadSlider.value(800); distSlider.hide(); }
  else { loadSlider.elt.max = 12000; loadSlider.elt.step = 250; loadSlider.value(6000); distSlider.show(); }
}

// ---- Physics: returns loads, reactions, and the three sums ----
function beamState() {
  const L = spanSlider.value();
  const uniform = isUniform();
  const total = uniform ? loadSlider.value() * L : loadSlider.value();
  const a = uniform ? L / 2 : min(distSlider.value(), L); // distance from A to the resultant
  const removed = removeCheck.checked();
  const RB = removed ? 0 : total * a / L;
  const RA = total - RB; // from the force equation
  return { L, uniform, total, a, removed, RA, RB,
    sumFx: 0, sumFy: RA + RB - total, sumM: RB * L - total * a };
}

function draw() {
  updateCanvasSize();
  // keep the distance slider within the span
  const L0 = spanSlider.value();
  distSlider.elt.max = L0;
  if (distSlider.value() > L0) distSlider.value(L0);

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
  text('Beam Reactions and Equilibrium', canvasWidth / 2, 8);

  const m = beamState();
  const target = (m.removed && abs(m.sumM) > 1) ? asin(min(1, 55 / (canvasWidth - 2 * margin - 28))) : 0; // B end drops about 55 px
  beamAngle = lerp(beamAngle, target, 0.15);
  hits = [];
  loadHit = null;
  drawBeam(m);
  drawPanel(m);
  drawControlLabels(m);
  drawTooltip();
  cursor((loadHit && (mouseX > 0 && mouseX < canvasWidth) && overLoad()) || dragging ? 'grab' : 'default');
}

function overLoad() {
  return loadHit && mouseX >= loadHit.x && mouseX <= loadHit.x + loadHit.w && mouseY >= loadHit.y && mouseY <= loadHit.y + loadHit.h;
}

// ---- Drawing: beam, supports, loads, reactions ----
function arrow(x1, y1, x2, y2, col, wt) {
  const len = dist(x1, y1, x2, y2);
  if (len < 2) return;
  stroke(col);
  strokeWeight(wt);
  line(x1, y1, x2, y2);
  const h = min(12, len * 0.6);
  noStroke();
  fill(col);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  triangle(0, 0, -h, -h * 0.45, -h, h * 0.45);
  pop();
}

function fmt(v) { return nfc(round(v), 0); }
function ft(v) { return Number.isInteger(v) ? String(v) : v.toFixed(1); }

function drawBeam(m) {
  const ax = margin + 14, bx = canvasWidth - margin - 14;
  const pxFt = (bx - ax) / m.L;
  const c = cos(beamAngle), s = sin(beamAngle);
  const pos = (d) => ({ x: ax + d * pxFt * c, y: beamY + beamT / 2 + d * pxFt * s });

  // beam
  push();
  translate(ax, beamY + beamT / 2);
  rotate(beamAngle);
  noStroke();
  fill('saddlebrown');
  rect(0, -beamT / 2, bx - ax, beamT, 2);
  pop();

  // supports: pin at A, roller at B
  const sy = beamY + beamT;
  stroke('dimgray');
  strokeWeight(2);
  fill('lightgray');
  triangle(ax, sy, ax - 13, sy + 22, ax + 13, sy + 22);
  line(ax - 20, sy + 22, ax + 20, sy + 22);
  noStroke();
  fill('black');
  textAlign(RIGHT, CENTER);
  textSize(18);
  text('A', ax - 18, sy + 8);
  textAlign(LEFT, CENTER);
  if (!m.removed) {
    stroke('dimgray');
    strokeWeight(2);
    fill('lightgray');
    triangle(bx, sy, bx - 13, sy + 18, bx + 13, sy + 18);
    circle(bx - 7, sy + 22, 8);
    circle(bx + 7, sy + 22, 8);
    line(bx - 20, sy + 26, bx + 20, sy + 26);
    noStroke();
    fill('black');
    text('B', bx + 18, sy + 8);
  } else {
    noStroke();
    fill('firebrick');
    textSize(14);
    textAlign(RIGHT, CENTER);
    text('B removed', bx + 14, sy + 14);
    textAlign(LEFT, CENTER);
  }

  // span label
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(14);
  if (abs(beamAngle) < 0.02) text('span L = ' + ft(m.L) + ' ft', (ax + bx) / 2, sy + 12);

  // applied load (orange)
  const orange = 'darkorange';
  if (!m.uniform) {
    const lp = pos(m.a);
    const len = 4 + m.total / 12000 * 54;
    if (m.total > 0) {
      arrow(lp.x, lp.y - beamT / 2 - len - 2, lp.x, lp.y - beamT / 2 - 1, orange, 4);
      hits.push({ x: lp.x - 12, y: lp.y - beamT / 2 - len - 2, w: 24, h: len + 2, text: 'Applied load P = ' + fmt(m.total) + ' lb, ' + ft(m.a) + ' ft from A' });
      loadHit = { x: lp.x - 18, y: lp.y - beamT / 2 - len - 8, w: 36, h: len + beamT + 14 };
    } else {
      loadHit = { x: lp.x - 18, y: lp.y - 30, w: 36, h: 40 };
    }
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textSize(15);
    const lw = 96;
    const lx = constrain(lp.x, lw / 2 + 4, canvasWidth - lw / 2 - 4);
    text('P = ' + fmt(m.total) + ' lb', lx, max(34, lp.y - beamT / 2 - len - 22));
    // distance a from A, drawn only while the beam is level
    if (abs(beamAngle) < 0.02 && m.a > 0) {
      stroke('dimgray');
      strokeWeight(1);
      line(ax, beamY - 8, lp.x, beamY - 8);
      line(ax, beamY - 12, ax, beamY - 4);
      noStroke();
      fill('dimgray');
      textSize(14);
      textAlign(CENTER, BOTTOM);
      const dl = lp.x - ax;
      text('a = ' + ft(m.a) + ' ft', dl > 80 ? ax + dl / 2 : lp.x + 38, beamY - 10);
    }
  } else {
    const wLen = 4 + m.total / m.L / 1200 * 40;
    const n = max(4, floor((bx - ax) / 36));
    for (let i = 0; i <= n; i++) {
      const p = pos(m.L * i / n);
      if (loadSlider.value() > 0) arrow(p.x, p.y - beamT / 2 - wLen - 2, p.x, p.y - beamT / 2 - 1, orange, 2);
    }
    const p0 = pos(0), p1 = pos(m.L);
    stroke(orange);
    strokeWeight(2);
    line(p0.x, p0.y - beamT / 2 - wLen - 2, p1.x, p1.y - beamT / 2 - wLen - 2);
    hits.push({ x: ax, y: beamY - wLen - 8, w: bx - ax, h: wLen + 8, text: 'Uniform load w = ' + fmt(loadSlider.value()) + ' plf, total ' + fmt(m.total) + ' lb' });
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textSize(15);
    text('w = ' + fmt(loadSlider.value()) + ' plf (total ' + fmt(m.total) + ' lb)', (ax + bx) / 2, max(34, beamY - wLen - 28));
  }

  // reactions (green), drawn upward below the supports; a failed equilibrium is flagged in red
  const unit = m.uniform ? 30000 : 12000;
  const gy = sy + 32;
  const ok = abs(m.sumM) < 0.5;
  const rcol = ok ? 'seagreen' : 'firebrick';
  const rA = 4 + m.RA / unit * 70;
  if (m.RA > 0) {
    arrow(ax, gy + rA, ax, gy, rcol, 4);
    hits.push({ x: ax - 10, y: gy, w: 20, h: rA, text: 'Reaction R_A = ' + fmt(m.RA) + ' lb (up)' });
  }
  reactionLabel('R_A = ' + fmt(m.RA) + ' lb', ax, gy + rA + 4, rcol);
  if (!m.removed) {
    const rB = 4 + m.RB / unit * 70;
    if (m.RB > 0) {
      arrow(bx, gy + rB + 6, bx, gy + 6, rcol, 4);
      hits.push({ x: bx - 10, y: gy + 6, w: 20, h: rB, text: 'Reaction R_B = ' + fmt(m.RB) + ' lb (up)' });
    }
    reactionLabel('R_B = ' + fmt(m.RB) + ' lb', bx, gy + rB + 10, rcol);
  }
}

function reactionLabel(str, x, y, col) {
  noStroke();
  fill(col);
  textSize(15);
  textAlign(CENTER, TOP);
  const w = textWidth(str);
  text(str, constrain(x, w / 2 + 4, canvasWidth - w / 2 - 4), y);
}

// ---- Equation panel ----
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

function para(str, x, y, w, col, lead) {
  fill(col);
  const lines = wrapLines(str, w);
  for (const ln of lines) { text(ln, x, y); y += lead; }
  return y;
}

function drawPanel(m) {
  const px = 10, py = 268, pw = canvasWidth - 20, ph = drawHeight - py - 6;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);
  noStroke();
  textAlign(LEFT, TOP);
  const fs = narrow() ? 14 : 16;
  textSize(fs);
  const lead = fs + 3, w = pw - 16, x = px + 8;
  let y = py + 6;

  const tot = fmt(m.total), a = ft(m.a), L = ft(m.L);
  const eq = [];
  eq.push('1. Moments about A: R_B × ' + L + ' − ' + tot + ' × ' + a + ' = 0' +
    (m.removed ? '  with B removed R_B = 0, so ' + fmt(m.sumM) + ' ft-lb is left over' : '  gives R_B = ' + fmt(m.RB) + ' lb'));
  eq.push('2. Vertical forces: R_A + ' + fmt(m.RB) + ' − ' + tot + ' = 0  gives R_A = ' + fmt(m.RA) + ' lb');
  eq.push('3. Horizontal forces: no horizontal load, so the sum is 0');
  if (m.uniform) {
    y = para('Uniform ' + fmt(loadSlider.value()) + ' plf acts as one ' + tot + ' lb force at midspan (' + ft(m.L / 2) + ' ft from A).', x, y, w, 'dimgray', lead);
  }
  for (let i = 0; i < 3; i++) {
    if (i < stepsShown) y = para(eq[i], x, y, w, 'black', lead);
  }
  if (stepsShown < 3) {
    y = para('Equation ' + stepsShown + ' of 3 shown. Press Step through for the next one.', x, y, w, 'dimgray', lead);
    return;
  }
  // equilibrium check
  const ok = abs(m.sumM) < 0.5 && abs(m.sumFy) < 0.5;
  fill(ok ? 'seagreen' : 'firebrick');
  textStyle(BOLD);
  const head = ok ? 'EQUILIBRIUM CHECK: BALANCED' : 'EQUILIBRIUM CHECK: FAILED';
  text(head, x, y);
  textStyle(NORMAL);
  y += lead;
  y = para('ΣFx = 0 lb, ΣFy = ' + fmt(m.sumFy) + ' lb, ΣM about A = ' + fmt(m.sumM) + ' ft-lb', x, y, w, ok ? 'seagreen' : 'firebrick', lead);
  if (m.removed && !ok) {
    para('Without support B the moment equation can no longer be satisfied, so the beam rotates about A.', x, y, w, 'firebrick', lead);
  } else if (m.removed) {
    para('Nothing turns only because the load is zero or sits directly over A.', x, y, w, 'dimgray', lead);
  } else if (!m.uniform && m.total > 0) {
    const nearer = m.a < m.L / 2 ? 'A' : (m.a > m.L / 2 ? 'B' : 'both supports equally');
    para('The support nearer the load carries more: ' + (nearer === 'both supports equally' ? 'the load is at midspan, so both supports share it equally.' : nearer + ' carries ' + fmt(max(m.RA, m.RB) / m.total * 100) + ' percent.'), x, y, w, 'dimgray', lead);
  }
}

// ---- Control labels (drawn in the control region) ----
function drawControlLabels(m) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(narrow() ? 14 : defaultTextSize);
  const lx = 8, rx = colW() + 8;
  text('Span: ' + spanSlider.value() + ' ft', lx, rowCenter(0));
  text('Load: ' + fmt(loadSlider.value()) + (m.uniform ? ' plf' : ' lb'), rx, rowCenter(0));
  if (m.uniform) text('Load acts over the whole span', lx, rowCenter(1));
  else text('Dist. from A: ' + ft(distSlider.value()) + ' ft', lx, rowCenter(1));
}

function drawTooltip() {
  if (dragging || mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) return;
  const h = hits.find(t => mouseX >= t.x && mouseX <= t.x + t.w && mouseY >= t.y && mouseY <= t.y + t.h);
  if (!h) return;
  textSize(14);
  const w = min(canvasWidth - 12, textWidth(h.text) + 16);
  const tx = constrain(mouseX + 12, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 16, 4, drawHeight - 30);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, 24, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(h.text, tx + 8, ty + 12);
}

// ---- Dragging the point load along the beam ----
function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || isUniform()) return;
  if (overLoad()) dragging = true;
}

function mouseDragged() {
  if (!dragging) return;
  const ax = margin + 14, bx = canvasWidth - margin - 14;
  const L = spanSlider.value();
  const d = constrain(round((mouseX - ax) / (bx - ax) * L * 2) / 2, 0, L);
  distSlider.value(d);
  return false;
}

function mouseReleased() { dragging = false; }

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
