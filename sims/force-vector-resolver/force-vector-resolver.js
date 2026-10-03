// Force Vector Resolver MicroSim - split an inclined force into horizontal and vertical components, with a predict-first check
// CANVAS_HEIGHT: 555
// Bloom Level 3 (Apply) + Level 2 (Understand)
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

const BRACE_FORCE = 5000, BRACE_ANGLE = 45; // Chapter 3 steel brace example
const ROOF_FORCE = 168000;                   // (30 + 40) psf x 2,400 ft2 for the Riverbend roof, illustrative
const N_PER_LB = 4.4482;

// ---- State and controls ----
let forceSlider, angleSlider, eqCheck, roofButton, predCheck, guessInput, checkButton;
let roofMode = false;
let revealed = false;     // has the student's prediction been checked for the current vector?

let resultMsg = null;    // { ok, text } feedback for the last prediction check
let lastKey = '';
let dragging = false;
let hits = [];            // hover targets: { x1, y1, x2, y2, text }
let g = null;             // geometry of the current frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  forceSlider = createSlider(0, 10000, BRACE_FORCE, 100);
  angleSlider = createSlider(0, 90, BRACE_ANGLE, 1);
  eqCheck = createCheckbox('Show equations', false);
  roofButton = createButton('Riverbend roof');
  roofButton.mousePressed(toggleRoof);
  predCheck = createCheckbox('Predict first', false);
  guessInput = createInput('', 'number');
  checkButton = createButton('Check');
  checkButton.mousePressed(checkGuess);

  positionControls();
  describe('A node at the center of the drawing has a bold dark orange force arrow pointing up and to the right. A dashed blue horizontal arrow and a dashed green vertical arrow form a right triangle showing the horizontal and vertical components. A readout lists the force, the angle, and the components in pounds and newtons. Sliders set the force and the angle, the arrow tip can be dragged, and a Riverbend roof button shows the 168,000 pound roof load as a downward arrow. Predict first mode asks the student to type the horizontal component.', LABEL);
}

// ---- Layout helpers ----
function narrow() { return canvasWidth < 560; }
function colW() { return canvasWidth / 2; }
function labelW() { return narrow() ? 112 : sliderLeftMargin; }
function sliderW() { return max(60, colW() - labelW() - 18); }
function rowCenter(r) { return drawHeight + 17 + 35 * r; }

function positionControls() {
  const lx = 8, rx = colW() + 8;
  forceSlider.position(lx + labelW(), rowCenter(0) - 10);
  forceSlider.size(sliderW());
  angleSlider.position(rx + labelW(), rowCenter(0) - 10);
  angleSlider.size(sliderW());
  eqCheck.position(lx, rowCenter(1) - 12);
  roofButton.position(rx, rowCenter(1) - 12);
  predCheck.position(lx, rowCenter(2) - 12);
  guessInput.position(rx + 66, rowCenter(2) - 12);
  guessInput.size(narrow() ? 64 : 90);
  checkButton.position(rx + 66 + (narrow() ? 64 : 90) + 8, rowCenter(2) - 12);
}

function toggleRoof() {
  roofMode = !roofMode;
  if (roofMode) {
    forceSlider.elt.max = 200000;
    forceSlider.elt.step = 1000;
    forceSlider.value(ROOF_FORCE);
    angleSlider.value(90);
    angleSlider.elt.disabled = true;
    roofButton.html('Back to brace');
  } else {
    forceSlider.elt.max = 10000;
    forceSlider.elt.step = 100;
    forceSlider.value(BRACE_FORCE);
    angleSlider.value(BRACE_ANGLE);
    angleSlider.elt.disabled = false;
    roofButton.html('Riverbend roof');
  }
}

// ---- Physics ----
function vec() {
  const F = forceSlider.value();
  const ang = roofMode ? 90 : angleSlider.value();
  return { F, ang, Fx: roofMode ? 0 : F * cos(radians(ang)), Fy: roofMode ? F : F * sin(radians(ang)) };
}
function lb(v) { return nfc(round(v), 0); }
function newtons(v) { return nfc(round(v * N_PER_LB), 0); }

function checkGuess() {
  const v = vec();
  const guess = parseFloat(guessInput.value());
  revealed = true;
  if (isNaN(guess)) { resultMsg = { ok: false, text: 'Type a number of pounds first.' }; revealed = false; return; }
  const ok = abs(guess - v.Fx) <= max(5, 0.01 * v.Fx);
  const calc = 'Fx = F cos θ = ' + lb(v.F) + ' × cos ' + v.ang + '° = ' + lb(v.Fx) + ' lb';
  resultMsg = { ok, text: ok ? 'Correct. ' + calc : 'Not quite: you typed ' + lb(guess) + ' lb. ' + calc + '. Angle θ is measured from the horizontal.' };
}

// ---- Geometry for the current frame ----
function computeGeometry() {
  const v = vec();
  let diag, panel;
  if (!narrow()) {
    diag = { x: 10, y: 44, w: canvasWidth * 0.56 - 10, h: drawHeight - 54 };
    panel = { x: canvasWidth * 0.58, y: 44, w: canvasWidth * 0.42 - 10, h: drawHeight - 54 };
  } else {
    diag = { x: 10, y: 44, w: canvasWidth - 20, h: 240 };
    panel = { x: 10, y: 288, w: canvasWidth - 20, h: drawHeight - 296 };
  }
  const Fmax = roofMode ? 200000 : 10000;
  const Lmax = roofMode ? diag.h - 90 : min(diag.w - 110, diag.h - 70);
  const len = v.F / Fmax * Lmax;
  const th = radians(v.ang);
  const node = roofMode ? { x: diag.x + diag.w * 0.45, y: diag.y + 50 } : { x: diag.x + 56, y: diag.y + diag.h - 30 };
  const tip = roofMode ? { x: node.x, y: node.y + len } : { x: node.x + len * cos(th), y: node.y - len * sin(th) };
  return { v, diag, panel, Fmax, Lmax, len, th, node, tip };
}

function draw() {
  updateCanvasSize();
  g = computeGeometry();
  // a new vector means a new prediction question
  const key = g.v.F + '|' + g.v.ang + '|' + roofMode;
  if (key !== lastKey) { lastKey = key; revealed = false; resultMsg = null; }
  const predicting = predCheck.checked();
  guessInput.style('display', predicting ? '' : 'none');
  checkButton.style('display', predicting ? '' : 'none');

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
  text('Force Vector Resolver', canvasWidth / 2, 8);

  hits = [];
  drawDiagram(predicting && !revealed);
  drawReadout(predicting);
  drawControlLabels(predicting);
  drawTooltip();
  cursor(dragging || overTip() ? 'grab' : 'default');
}

function overTip() { return !roofMode && g && dist(mouseX, mouseY, g.tip.x, g.tip.y) < 14 && mouseY < drawHeight; }

// ---- Drawing ----
function arrow(x1, y1, x2, y2, col, wt, dashed) {
  const len = dist(x1, y1, x2, y2);
  if (len < 3) return;
  const h = min(wt * 3 + 6, len * 0.6);
  const ang = atan2(y2 - y1, x2 - x1);
  stroke(col);
  strokeWeight(wt);
  if (dashed) drawingContext.setLineDash([8, 6]);
  line(x1, y1, x2 - cos(ang) * h * 0.6, y2 - sin(ang) * h * 0.6);
  drawingContext.setLineDash([]);
  noStroke();
  fill(col);
  push();
  translate(x2, y2);
  rotate(ang);
  triangle(0, 0, -h, -h * 0.45, -h, h * 0.45);
  pop();
}

function tag(str, x, y, col, al) {
  noStroke();
  fill(col);
  textAlign(al, CENTER);
  textSize(narrow() ? 14 : 15);
  text(str, x, y);
}

function drawDiagram(hideFx) {
  const { v, diag, node, tip, th } = g;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(diag.x, diag.y, diag.w, diag.h, 8);

  const fs = narrow() ? 14 : 15;
  if (v.F > 0) {
    if (!roofMode) {
      // components: dashed horizontal then dashed vertical, closing the right triangle
      const fxLen = tip.x - node.x, fyLen = node.y - tip.y;
      arrow(node.x, node.y, tip.x, node.y, 'royalblue', 3, true);
      arrow(tip.x, node.y, tip.x, tip.y, 'seagreen', 3, true);
      hits.push({ x1: node.x, y1: node.y, x2: tip.x, y2: node.y, text: 'Horizontal component Fx = ' + (hideFx ? '?' : lb(v.Fx) + ' lb') });
      hits.push({ x1: tip.x, y1: node.y, x2: tip.x, y2: tip.y, text: 'Vertical component Fy = ' + lb(v.Fy) + ' lb' });
      if (fxLen > 12 && fyLen > 12) {
        stroke('dimgray');
        strokeWeight(1);
        noFill();
        rect(tip.x - 9, node.y - 9, 9, 9);
      }
      // component labels, kept inside the drawing box
      const fxTxt = 'Fx = ' + (hideFx ? '?' : lb(v.Fx)) + ' lb';
      if (fxLen > 0) {
        if (fxLen > 90) tag(fxTxt, node.x + fxLen / 2, node.y + 14, 'royalblue', CENTER);
        else tag(fxTxt, node.x + 6, node.y + 14, 'royalblue', LEFT);
      }
      const fyTxt = 'Fy = ' + lb(v.Fy) + ' lb';
      textSize(fs);
      const roomRight = diag.x + diag.w - tip.x - 10;
      if (fyLen > 0) {
        if (roomRight > textWidth(fyTxt)) tag(fyTxt, tip.x + 8, node.y - fyLen / 2, 'seagreen', LEFT);
        else tag(fyTxt, tip.x - 8, node.y - fyLen / 2, 'seagreen', RIGHT);
      }
      // angle arc and label
      stroke('dimgray');
      strokeWeight(1.5);
      noFill();
      const r = 30;
      arc(node.x, node.y, 2 * r, 2 * r, -th, 0);
      if (v.ang > 0) {
        // beside the arc when the triangle is wide enough, otherwise under the node
        if (fxLen > 110) tag('θ = ' + v.ang + '°', node.x + 40 + 12 * cos(th / 2), node.y - 34 * sin(th / 2) - 4, 'black', LEFT);
        else tag('θ = ' + v.ang + '°', node.x - 14, node.y + 14, 'black', RIGHT);
      }
    } else {
      tag('Fx = 0 lb', node.x + 14, node.y + 30, 'royalblue', LEFT);
    }
    // the force itself: bold dark orange
    arrow(node.x, node.y, tip.x, tip.y, 'darkorange', 6, false);
    hits.push({ x1: node.x, y1: node.y, x2: tip.x, y2: tip.y, text: (roofMode ? 'Roof load F = ' : 'Force F = ') + lb(v.F) + ' lb at ' + v.ang + '° from horizontal' + (roofMode ? ' (downward)' : '') });
    // label beside the middle of the force arrow
    const mid = { x: (node.x + tip.x) / 2, y: (node.y + tip.y) / 2 };
    const label = 'F = ' + lb(v.F) + ' lb';
    textSize(fs);
    if (roofMode) tag(label, mid.x + 14, mid.y, 'chocolate', LEFT);
    else if (v.ang < 25) tag(label, mid.x, mid.y - 22, 'chocolate', CENTER);
    else if (tip.x + 14 + textWidth(label) < diag.x + diag.w - 4) tag(label, tip.x + 14, tip.y - 4, 'chocolate', LEFT);
    else tag(label, tip.x - 14, tip.y - 4, 'chocolate', RIGHT);
  } else {
    tag('Force is zero: no arrow to resolve', diag.x + diag.w / 2, diag.y + diag.h / 2, 'dimgray', CENTER);
  }

  // drag handle at the arrow tip, then the node on top
  if (!roofMode && v.F > 0) {
    noFill();
    stroke('darkorange');
    strokeWeight(2);
    circle(tip.x, tip.y, 20);
  }
  stroke('black');
  strokeWeight(2);
  fill('white');
  circle(node.x, node.y, 22);
  tag(roofMode ? 'node (roof support)' : 'node', node.x - 16, roofMode ? node.y : node.y - 16, 'black', RIGHT);
}

// ---- Readout panel ----
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

let dry = false; // when true, para() only measures
function para(str, x, y, w, col, size) {
  textSize(size);
  fill(col);
  textAlign(LEFT, TOP);
  for (const ln of wrapLines(str, w)) { if (!dry) text(ln, x, y); y += size + 3; }
  return y;
}

function drawReadout(predicting) {
  const { panel } = g;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(panel.x, panel.y, panel.w, panel.h, 8);
  noStroke();
  // measure first, and use a smaller size only if the text would overflow the panel
  let fs = narrow() ? 14 : 16;
  dry = true;
  while (fs > 12 && readoutText(predicting, panel, fs) > panel.y + panel.h - 4) fs--;
  dry = false;
  readoutText(predicting, panel, fs);
}

// Draws (or measures) the readout lines and returns the y just below them
function readoutText(predicting, panel, fs) {
  const { v } = g;
  const x = panel.x + 8, w = panel.w - 16;
  let y = panel.y + 6;
  const hide = predicting && !revealed;

  y = para('F = ' + lb(v.F) + ' lb (' + newtons(v.F) + ' N)' + (roofMode ? ', downward' : ' at ' + v.ang + '°'), x, y, w, 'chocolate', fs);
  y = para('Fx = ' + (hide ? '?' : lb(v.Fx) + ' lb (' + newtons(v.Fx) + ' N)'), x, y, w, 'royalblue', fs);
  y = para('Fy = ' + lb(v.Fy) + ' lb (' + newtons(v.Fy) + ' N)', x, y, w, 'seagreen', fs);

  if (eqCheck.checked() && !roofMode) {
    y += 2;
    y = para('Fx = F cos θ = ' + lb(v.F) + ' × cos ' + v.ang + '° = ' + (hide ? '?' : lb(v.Fx) + ' lb'), x, y, w, 'black', fs);
    y = para('Fy = F sin θ = ' + lb(v.F) + ' × sin ' + v.ang + '° = ' + lb(v.Fy) + ' lb', x, y, w, 'black', fs);
  }
  if (roofMode) {
    y = para('Roof: (30 psf dead + 40 psf snow) × 2,400 ft² = 168,000 lb (illustrative). It acts straight down, so all of it is vertical.', x, y + 2, w, 'black', fs);
  } else if (v.F > 0 && v.ang === 0) {
    y = para('Angle 0°: all of the force is horizontal.', x, y + 2, w, 'navy', fs);
  } else if (v.F > 0 && v.ang === 90) {
    y = para('Angle 90°: all of the force is vertical.', x, y + 2, w, 'navy', fs);
  } else if (v.ang === 45 && v.F > 0) {
    y = para('At 45° the force splits equally between sliding and lifting.', x, y + 2, w, 'navy', fs);
  }
  if (!hide && v.F > 0) {
    y = para(narrow() ? 'Check: √(Fx² + Fy²) = ' + lb(sqrt(v.Fx * v.Fx + v.Fy * v.Fy)) + ' lb = F, so Fx and Fy act like F.' :
      'Same effect: √(Fx² + Fy²) = √(' + lb(v.Fx) + '² + ' + lb(v.Fy) + '²) = ' + lb(sqrt(v.Fx * v.Fx + v.Fy * v.Fy)) + ' lb = F. Fx and Fy together push the node exactly as F does.', x, y + 2, w, 'dimgray', fs);
  }
  if (predicting) {
    if (resultMsg) y = para(resultMsg.text, x, y + 2, w, resultMsg.ok ? 'darkgreen' : 'firebrick', fs);
    else if (!revealed) y = para('Predict first: type Fx in pounds, then press Check.', x, y + 2, w, 'darkgreen', fs);
  }
  return y;
}

// ---- Control labels (drawn in the control region) ----
function drawControlLabels(predicting) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(narrow() ? 14 : defaultTextSize);
  const lx = 8, rx = colW() + 8;
  text('Force: ' + lb(forceSlider.value()) + ' lb', lx, rowCenter(0));
  text('Angle: ' + (roofMode ? 90 : angleSlider.value()) + '°', rx, rowCenter(0));
  if (predicting) text('Fx (lb):', rx, rowCenter(2));
  else if (!roofMode) text(narrow() ? 'Drag the arrow tip' : 'Or drag the arrow tip', rx, rowCenter(2));
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const l2 = dx * dx + dy * dy;
  const t = l2 === 0 ? 0 : constrain(((px - x1) * dx + (py - y1) * dy) / l2, 0, 1);
  return dist(px, py, x1 + t * dx, y1 + t * dy);
}

function drawTooltip() {
  if (dragging || mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) return;
  let best = null, bd = 9;
  // pick the arrow nearest the pointer
  for (const h of hits) {
    const d = distToSegment(mouseX, mouseY, h.x1, h.y1, h.x2, h.y2);
    if (d < bd) { bd = d; best = h; }
  }
  if (!best) return;
  textSize(14);
  const w = min(canvasWidth - 12, textWidth(best.text) + 16);
  const tx = constrain(mouseX + 12, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY - 34, 4, drawHeight - 30);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, 24, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(best.text, tx + 8, ty + 12);
}

// ---- Dragging the arrow tip ----
function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  if (overTip()) dragging = true;
}

function mouseDragged() {
  if (!dragging) return;
  const dx = max(0, mouseX - g.node.x), dy = max(0, g.node.y - mouseY);
  const ang = constrain(round(degrees(atan2(dy, dx))), 0, 90);
  const F = constrain(round(dist(0, 0, dx, dy) / g.Lmax * g.Fmax / 100) * 100, 0, g.Fmax);
  angleSlider.value(ang);
  forceSlider.value(F);
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
