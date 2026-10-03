// Drawing Scale Calculator MicroSim - measure a wall on a plan, calculate its real length from the stated scale, and see why a changed print size breaks the scale
// CANVAS_HEIGHT: 550
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 255; // slider x position in row 1
let defaultTextSize = 16;

// ---- Data ----
// Scales offered in the title block: paper inches that stand for one real foot
const scaleOptions = [
  { label: 'Scale 1/8" = 1\'-0"', inPerFt: 0.125, text: '1/8" = 1\'-0"' },
  { label: 'Scale 1/4" = 1\'-0"', inPerFt: 0.25, text: '1/4" = 1\'-0"' },
  { label: 'Scale 1/2" = 1\'-0"', inPerFt: 0.5, text: '1/2" = 1\'-0"' },
  { label: 'Scale 3" = 1\'-0"', inPerFt: 3, text: '3" = 1\'-0"' }
];
const SHEET_W = 11, SHEET_H = 7.5;   // paper size in inches (drawing area of the sheet)
const PLAN_W = 6.5, PLAN_H = 4.5;    // plan size on paper at 100% print size, in inches

// ---- State (measuring line is stored in drawing inches at 100%, relative to the plan center) ----
let handles = [{ x: -PLAN_W / 2, y: PLAN_H / 2 }, { x: PLAN_W / 2, y: PLAN_H / 2 }];
let dragging = -1;
let revealed = false;      // true after "Check my answer" until the readout is hidden again
let feedback = { text: '', ok: false };
let sheetRect = { x: 0, y: 0, w: 0, h: 0 };
let readoutRect = { x: 0, y: 0, w: 0, h: 0 };
let messageRect = { x: 0, y: 0, w: 0, h: 0 };
let ppi = 40;              // screen pixels per inch of paper
let cx = 0, cy = 0;        // screen position of the sheet center

// ---- Controls ----
let scaleSelect, printSlider, answerInput, checkButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  // row 1: scale menu and print-size slider
  scaleSelect = createSelect();
  scaleOptions.forEach(o => scaleSelect.option(o.label));
  scaleSelect.selected(scaleOptions[1].label);
  scaleSelect.position(10, drawHeight + 8);
  scaleSelect.size(150);
  scaleSelect.changed(() => { feedback.text = ''; });

  printSlider = createSlider(50, 150, 100, 5);
  printSlider.position(sliderLeftMargin, drawHeight + 8);
  printSlider.size(sliderWidth());
  printSlider.input(() => { feedback.text = ''; });

  // row 2: typed answer and check button
  answerInput = createInput('');
  answerInput.position(sliderLeftMargin - 95, drawHeight + 43);
  answerInput.size(80);
  answerInput.attribute('placeholder', 'feet');
  answerInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') toggleCheck(); });

  checkButton = createButton('Check my answer');
  checkButton.position(sliderLeftMargin, drawHeight + 42);
  checkButton.mousePressed(toggleCheck);

  describe('A floor plan on a sheet of paper with a draggable measuring line and two end handles on a wall. A menu chooses the scale printed in the title block, from one eighth inch to three inches per foot. A print size slider from 50 to 150 percent resizes the drawing and shows a warning when the stated scale no longer applies. The student types the real length in feet, then presses Check my answer to reveal the drawn length in inches and the real length in feet, inches, and millimeters.', LABEL);
}

function sliderWidth() { return max(80, canvasWidth - sliderLeftMargin - 12); }
function currentScale() { return scaleOptions.find(o => o.label === scaleSelect.value()) || scaleOptions[1]; }
function printFactor() { return printSlider.value() / 100; }

// ---- Measurement ----
// drawn length on paper, in inches, rounded to the nearest 1/16 inch as read with a ruler
function drawnInches() {
  const d = dist(handles[0].x, handles[0].y, handles[1].x, handles[1].y) * printFactor();
  return round(d * 16) / 16;
}
function realFeet() { return drawnInches() / currentScale().inPerFt; }

// ---- Formatting ----
// inches as a mixed number to the nearest 1/16, e.g. 6 1/2
function mixed(inches, denom) {
  const total = round(inches * denom);
  const whole = floor(total / denom);
  let num = total - whole * denom, den = denom;
  while (num > 0 && num % 2 === 0) { num /= 2; den /= 2; }
  if (num === 0) return '' + whole;
  return (whole > 0 ? whole + ' ' : '') + num + '/' + den;
}
function feetInches(ft) {
  const totalIn = round(ft * 12 * 4) / 4;
  const feet = floor(totalIn / 12);
  return feet + '\'-' + mixed(totalIn - feet * 12, 4) + '"';
}
// parse "26", "26.5", 26'-6", or 26' 6 1/2" into feet (NaN if not understood)
function parseMixed(s) {
  s = s.trim();
  if (s === '') return 0;
  return s.split(/\s+/).reduce((sum, part) => {
    if (part.includes('/')) { const [a, b] = part.split('/'); return sum + parseFloat(a) / parseFloat(b); }
    return sum + parseFloat(part);
  }, 0);
}
function parseLength(str) {
  let s = str.trim().toLowerCase().replace(/"/g, '').replace(/feet|foot|ft/g, '\'');
  if (s === '') return NaN;
  if (s.includes('\'')) {
    const parts = s.split('\'');
    const inchPart = parts[1].replace(/^[-\s]+/, '');
    return parseMixed(parts[0]) + parseMixed(inchPart) / 12;
  }
  return parseMixed(s);
}

// ---- Check my answer ----
function toggleCheck() {
  if (revealed) {
    revealed = false;
    feedback.text = '';
    answerInput.value('');
    checkButton.html('Check my answer');
    return;
  }
  const ans = parseLength(answerInput.value());
  if (isNaN(ans)) {
    feedback = { ok: false, text: 'Type your answer in feet first, such as 26 or 26\'-6", then press Check my answer.' };
    return;
  }
  const s = currentScale().inPerFt, d = drawnInches(), real = realFeet();
  const tol = (1 / 8) / s; // one eighth inch of paper, in real feet
  if (abs(ans - real) <= tol) {
    feedback = { ok: true, text: 'Correct. ' + nf(d, 0, 3) + ' in divided by ' + s + ' in per ft is ' + nf(real, 0, 2) + ' ft.' };
  } else if (abs(ans - d * s) <= tol) {
    feedback = { ok: false, text: 'You multiplied. Each foot is drawn ' + s + ' in long, so divide the drawn length by ' + s + '.' };
  } else {
    feedback = { ok: false, text: 'Not quite. Divide the drawn length (' + nf(d, 0, 3) + ' in) by the scale (' + s + ' in per ft), then compare.' };
  }
  revealed = true;
  checkButton.html('Hide readout');
}

// ---- Layout: wide = sheet at left, readout at right, messages under the sheet; narrow = everything stacked ----
function layoutAll() {
  const wide = canvasWidth >= 640;
  if (wide) {
    const w = floor(canvasWidth * 0.6);
    sheetRect = { x: 10, y: 44, w: w, h: w * SHEET_H / SHEET_W };
    readoutRect = { x: 10 + w + 12, y: 44, w: canvasWidth - w - 32, h: drawHeight - 54 };
    messageRect = { x: 10, y: sheetRect.y + sheetRect.h + 8, w: w, h: drawHeight - (sheetRect.y + sheetRect.h + 8) - 10 };
  } else {
    const w = min(canvasWidth - 20, 320);
    sheetRect = { x: (canvasWidth - w) / 2, y: 42, w: w, h: w * SHEET_H / SHEET_W };
    readoutRect = { x: 10, y: sheetRect.y + sheetRect.h + 6, w: canvasWidth - 20, h: 90 };
    messageRect = { x: 10, y: readoutRect.y + readoutRect.h + 4, w: canvasWidth - 20, h: drawHeight - (readoutRect.y + readoutRect.h + 4) - 6 };
  }
  ppi = sheetRect.w / SHEET_W;
  cx = sheetRect.x + sheetRect.w / 2;
  cy = sheetRect.y + sheetRect.h / 2;
}

// convert between drawing coordinates (inches at 100%, centered) and screen pixels
function sx(x) { return cx + x * ppi * printFactor(); }
function sy(y) { return cy + y * ppi * printFactor(); }

function draw() {
  updateCanvasSize();
  layoutAll();

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
  text('Drawing Scale Calculator', canvasWidth / 2, 8);

  drawSheet();
  drawReadout();
  drawMessages();
  drawControlLabels();
  cursor(handleAt(mouseX, mouseY) >= 0 || dragging >= 0 ? HAND : ARROW);
}

// ---- The sheet of paper: 1 inch grid, plan, title block, measuring line ----
function drawSheet() {
  const r = sheetRect;
  fill('white');
  stroke('dimgray');
  strokeWeight(2);
  rect(r.x, r.y, r.w, r.h);

  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(r.x, r.y, r.w, r.h);
  drawingContext.clip();

  // 1 inch paper grid (the paper does not change when the print size changes)
  stroke('gainsboro');
  strokeWeight(1);
  for (let i = 1; i < SHEET_W; i++) line(r.x + i * ppi, r.y, r.x + i * ppi, r.y + r.h);
  for (let j = 1; j < SHEET_H; j++) line(r.x, r.y + j * ppi, r.x + r.w, r.y + j * ppi);

  drawPlan();
  drawingContext.restore();

  drawMeasureLine();
  drawTitleBlock();
  drawHandles();
}

function drawPlan() {
  const k = ppi * printFactor();            // screen pixels per drawing inch
  const wallW = max(2, 0.12 * k);
  const L = -PLAN_W / 2, R = PLAN_W / 2, T = -PLAN_H / 2, B = PLAN_H / 2;
  strokeCap(SQUARE);
  stroke('dimgray');
  strokeWeight(wallW);
  noFill();
  rect(sx(L), sy(T), PLAN_W * k, PLAN_H * k);
  // interior partitions with door gaps
  line(sx(0.5), sy(T), sx(0.5), sy(-0.5));
  line(sx(0.5), sy(0.3), sx(0.5), sy(B));
  line(sx(0.5), sy(0), sx(1.5), sy(0));
  line(sx(2.3), sy(0), sx(R), sy(0));
  // windows: a white gap in the wall with two thin lines
  const windows = [[-2.2, T, -1.0, T], [R, -1.6, R, -0.7], [L, -0.9, L, 0.4]];
  for (const w of windows) {
    stroke('white');
    strokeWeight(wallW + 1);
    line(sx(w[0]), sy(w[1]), sx(w[2]), sy(w[3]));
    stroke('steelblue');
    strokeWeight(1.5);
    const horiz = w[1] === w[3];
    const o = wallW / 3;
    if (horiz) { line(sx(w[0]), sy(w[1]) - o, sx(w[2]), sy(w[3]) - o); line(sx(w[0]), sy(w[1]) + o, sx(w[2]), sy(w[3]) + o); }
    else { line(sx(w[0]) - o, sy(w[1]), sx(w[2]) - o, sy(w[3])); line(sx(w[0]) + o, sy(w[1]), sx(w[2]) + o, sy(w[3])); }
  }
  // door swings
  stroke('gray');
  strokeWeight(1);
  noFill();
  arc(sx(0.5), sy(0.3), 0.8 * k * 2, 0.8 * k * 2, -HALF_PI, 0);
  arc(sx(1.5), sy(0), 0.8 * k * 2, 0.8 * k * 2, 0, HALF_PI);
  line(sx(0.5), sy(0.3), sx(1.3), sy(0.3));
  line(sx(1.5), sy(0), sx(1.5), sy(0.8));
  // room names
  noStroke();
  fill('dimgray');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('LIVING', sx(-1.4), sy(-0.6));
  text('KITCHEN', sx(1.9), sy(-1.1));
  text('BEDROOM', sx(1.9), sy(1.3));
  // written dimension on the south wall, revealed with the readout (the dimension a designer would write)
  if (revealed) {
    const written = PLAN_W / currentScale().inPerFt;
    const y = sy(B) - 0.45 * k;
    stroke('black');
    strokeWeight(1);
    line(sx(L) + 4, y, sx(R) - 4, y);
    line(sx(L) + 4, y - 4, sx(L) + 4, y + 4);
    line(sx(R) - 4, y - 4, sx(R) - 4, y + 4);
    noStroke();
    fill('black');
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text(feetInches(written) + ' written', sx(0), y - 2);
  }
  strokeCap(ROUND);
}

function drawTitleBlock() {
  const r = sheetRect;
  textSize(12);
  const label = 'SCALE: ' + currentScale().text;
  const w = max(2.9 * ppi, textWidth(label) + 14), h = max(0.8 * ppi, 34);
  const x = r.x + r.w - w - 0.1 * ppi, y = r.y + r.h - h - 0.1 * ppi;
  fill('white');
  stroke('black');
  strokeWeight(1.5);
  rect(x, y, w, h);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text('FLOOR PLAN', x + 6, y + h * 0.3);
  text(label, x + 6, y + h * 0.7);
}

function drawMeasureLine() {
  stroke('royalblue');
  strokeWeight(3);
  line(sx(handles[0].x), sy(handles[0].y), sx(handles[1].x), sy(handles[1].y));
}

function drawHandles() {
  const a = handles[0], b = handles[1];
  stroke('black');
  strokeWeight(1.5);
  fill('darkorange');
  circle(sx(a.x), sy(a.y), 16);
  circle(sx(b.x), sy(b.y), 16);
}

// ---- Panels ----
function wrapText(str, x, y, w, lead) {
  const words = str.split(' ');
  let ln = '';
  for (const word of words) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { text(ln, x, y); y += lead; ln = word; }
    else ln = t;
  }
  if (ln) { text(ln, x, y); y += lead; }
  return y;
}

function drawReadout() {
  const r = readoutRect;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  const x = r.x + 10, w = r.w - 20, lead = 18;
  let y = r.y + 8;
  if (r.h > 200) {
    textStyle(BOLD);
    text('Readout', x, y);
    y += 22;
  }
  textStyle(NORMAL);
  textSize(14);
  const s = currentScale(), d = drawnInches();
  y = wrapText('Drawn length: ' + mixed(d, 16) + ' in (' + nf(d, 0, 3) + ' in)', x, y, w, lead);
  y = wrapText('Scale: ' + s.text + ' (' + s.inPerFt + ' in per ft)', x, y, w, lead);
  if (revealed) {
    const real = realFeet();
    textStyle(BOLD);
    y = wrapText('Real length: ' + feetInches(real) + ' = ' + nfc(round(real * 304.8)) + ' mm', x, y, w, lead);
    textStyle(NORMAL);
    y = wrapText(nf(d, 0, 3) + ' in / ' + s.inPerFt + ' in per ft = ' + nf(real, 0, 2) + ' ft', x, y, w, lead);
  } else {
    fill('dimgray');
    y = wrapText(r.h > 200 ? 'Real length: hidden. Type your answer in feet, then press Check my answer.' : 'Real length: hidden until you check', x, y, w, lead);
    fill('black');
  }
  // print size line: color plus words (wide layout only; the message panel carries the warning on narrow layouts)
  if (r.h <= 200) { textStyle(NORMAL); return; }
  if (printSlider.value() !== 100) {
    fill('darkorange');
    textStyle(BOLD);
    wrapText('Print size ' + printSlider.value() + '%: scale does NOT apply', x, y + 4, w, lead);
  } else {
    fill('dimgray');
    wrapText('Print size 100%: stated scale applies', x, y + 4, w, lead);
  }
  textStyle(NORMAL);
  if (r.h > 200) {
    fill('black');
    textSize(14);
    wrapText('Rule: real length = drawn length / scale (in per ft). The grid on the paper has 1 inch squares. When a drawing states a dimension, use it instead of measuring the sheet.', x, r.y + r.h - 100, w, lead);
  }
}

function drawMessages() {
  const r = messageRect;
  const printed = printSlider.value();
  const bad = printed !== 100;
  stroke(bad ? 'darkorange' : (feedback.text ? (feedback.ok ? 'seagreen' : 'darkorange') : 'silver'));
  strokeWeight(bad || feedback.text ? 3 : 1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  const x = r.x + 10, w = r.w - 20, lead = 17;
  let y = r.y + 7;
  if (bad) {
    const paper = PLAN_W * printFactor(), s = currentScale().inPerFt;
    fill('darkorange');
    textStyle(BOLD);
    y = wrapText('WARNING: the printed scale no longer applies.', x, y, w, lead);
    textStyle(NORMAL);
    fill('black');
    y = wrapText('At ' + printed + '% the south wall measures ' + nf(paper, 0, 2) + ' in, so the stated scale gives ' + feetInches(paper / s) + ', but the written dimension is ' + feetInches(PLAN_W / s) + '. Dimensions govern.', x, y, w, lead);
  }
  if (feedback.text) {
    fill(feedback.ok ? 'seagreen' : 'darkorange');
    textStyle(BOLD);
    y = wrapText(feedback.text, x, y + (bad ? 3 : 0), w, lead);
    textStyle(NORMAL);
  } else if (!bad) {
    fill('black');
    wrapText('Drag the orange handles to measure a wall. Predict the real length, type it in feet, and press Check my answer. Then move the Print size slider to see what a reduced or enlarged print does.', x, y, w, lead);
  }
  textStyle(NORMAL);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Print ' + printSlider.value() + '%', 170, drawHeight + 21);
  text('Your answer (ft):', 10, drawHeight + 56);
}

// ---- Dragging the end handles (snapped to 1/16 inch of paper) ----
function handleAt(mx, my) {
  if (mx < sheetRect.x || mx > sheetRect.x + sheetRect.w || my < sheetRect.y || my > sheetRect.y + sheetRect.h) return -1;
  for (let i = 1; i >= 0; i--) {
    if (dist(mx, my, sx(handles[i].x), sy(handles[i].y)) <= 14) return i;
  }
  return -1;
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  dragging = handleAt(mouseX, mouseY);
}

function mouseDragged() {
  if (dragging < 0) return;
  // snap in paper inches (1/16 in), then convert back to drawing inches at 100%
  const px = constrain(round((mouseX - cx) / ppi * 16) / 16, -SHEET_W / 2, SHEET_W / 2);
  const py = constrain(round((mouseY - cy) / ppi * 16) / 16, -SHEET_H / 2, SHEET_H / 2);
  handles[dragging] = { x: px / printFactor(), y: py / printFactor() };
  feedback.text = '';
  return false;
}

function mouseReleased() { dragging = -1; }

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  printSlider.size(sliderWidth());
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
