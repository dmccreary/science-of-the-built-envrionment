// Classroom CO2 Ventilation Balance Explorer MicroSim - steady CO2 = outdoor + occupants x 0.0106 x 1,000,000 / airflow
// CANVAS_HEIGHT: 560
// Bloom Level 3 (Apply): calculate the steady-state CO2 concentration and the airflow needed to hold a target
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 160; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// ---- Constants (Appendix F; room size and sensor fractions are illustrative) ----
const OUTDOOR = 420;           // ppm
const GEN_CFM = 0.0106;        // CO2 generated per resting adult, cfm
const VOLUME = 7200;           // ft^3 (30 x 24 x 10)
const SENSOR_LOCS = [
  { name: 'In the breathing zone', frac: 1.0 },
  { name: 'Near the supply grille', frac: 0.6 },
  { name: 'In a stagnant corner', frac: 1.2 }
];
const PLAY_MS = 3000;          // how long the rise plays after Check

const CHALLENGES = [
  { occ: 25, cfm: 450, loc: 0, kind: 'ppm', answer: 420 + 25 * GEN_CFM * 1e6 / 450, show: '1,009 ppm',
    q: 'Twenty-five students and 450 cfm of fresh air: where will the carbon dioxide settle?',
    hint: 'Steady level = 420 + occupants x 0.0106 x 1,000,000 / airflow, in ppm with the airflow in cfm.',
    why: 'Generation is 25 x 0.0106 = 0.265 cfm. Rise = 0.265 x 1,000,000 / 450 = 589 ppm. Steady level = 420 + 589 = 1,009 ppm.' },
  { occ: 25, cfm: 150, loc: 0, kind: 'ppm', answer: 420 + 25 * GEN_CFM * 1e6 / 150, show: '2,187 ppm',
    q: 'The fan is throttled to 150 cfm with the same 25 students. Where does the carbon dioxide settle?',
    hint: 'Use the same formula with the new airflow. Think about what one third of the air does to the rise above 420 ppm.',
    why: 'Rise = 0.265 x 1,000,000 / 150 = 1,767 ppm, so the level is 420 + 1,767 = 2,187 ppm. One third of the air gives three times the rise.' },
  { occ: 30, cfm: 550, loc: 0, kind: 'cfm', answer: 550, show: '550 cfm',
    q: 'A class of 30 students must stay at or below 1,000 ppm. Set the airflow slider to the smallest airflow, in steps of 50 cfm, that does it, then press Check.',
    hint: 'Required airflow = occupants x 0.0106 x 1,000,000 / (target - 420). Then round up to the next 50 cfm step.',
    why: 'Needed airflow = 30 x 0.0106 x 1,000,000 / (1,000 - 420) = 548 cfm. The smallest step that is >= 548 is 550 cfm (500 cfm would give 1,056 ppm).' },
  { occ: 25, cfm: 300, loc: 1, kind: 'yesno', answer: 'No', show: 'no, the controller sees no problem',
    q: '25 students, 300 cfm, and the sensor sits near the supply grille. The controller setpoint is 1,000 ppm. Does the controller see a problem?',
    hint: 'Find the breathing-zone level first. Then sensor reading = 420 + sensor fraction x (level - 420), using the grille fraction of 0.60. Compare the reading with 1,000 ppm.',
    why: 'The breathing zone reaches 420 + 883 = 1,303 ppm, but the sensor reads only 420 + 0.60 x 883 = 950 ppm, which is below the setpoint, so the airflow is not raised.' }
];

// ---- State ----
let phase = 0;                  // 0..3 challenge, 4 exploration
let attempts = [0, 0, 0, 0];
let outcome = ['open', 'open', 'open', 'open'];
let revealed = false;
let playStart = -1;             // millis() when the rise started playing
let msg = '', msgKind = 'info';

// ---- Controls ----
let ansInput, yesNoSel, checkButton, nextButton, occSlider, cfmSlider, locSel;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ansInput = createInput('', 'text');
  ansInput.attribute('inputmode', 'decimal');
  ansInput.attribute('aria-label', 'Concentration in ppm');
  ansInput.size(80);
  ansInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  yesNoSel = createSelect();
  yesNoSel.option('Choose...'); yesNoSel.option('Yes'); yesNoSel.option('No');
  yesNoSel.attribute('aria-label', 'Does the controller see a problem');
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next challenge');
  nextButton.mousePressed(nextStep);

  occSlider = createSlider(5, 40, 25, 5);
  occSlider.input(onSetting);
  cfmSlider = createSlider(50, 800, 450, 50);
  cfmSlider.input(onSetting);
  locSel = createSelect();
  SENSOR_LOCS.forEach(l => locSel.option(l.name));
  locSel.changed(onSetting);

  describe('A classroom drawn as a box with occupant dots, a fresh-air arrow entering and an exhaust arrow leaving, and a sensor whose location can change. A graph shows the carbon dioxide concentration rising from the 420 ppm outdoor level and settling at a steady level set by the number of occupants and the outdoor airflow. A dashed line marks the 1,000 ppm target.', LABEL);

  startChallenge(0);
  positionControls();
}

// ---- Model ----
function steady(occ, cfm) { return OUTDOOR + occ * GEN_CFM * 1e6 / cfm; }
function concAt(occ, cfm, tMin) { const s = steady(occ, cfm); return s - (s - OUTDOOR) * Math.exp(-(cfm / VOLUME) * tMin); }
function locFrac() { return SENSOR_LOCS.find(l => l.name === locSel.value()).frac; }
const fmtP = v => Math.round(v).toLocaleString('en-US');

// ---- Flow ----
function startChallenge(i) {
  phase = i;
  const c = CHALLENGES[i];
  occSlider.value(c.occ); cfmSlider.value(i === 2 ? 450 : c.cfm); locSel.selected(SENSOR_LOCS[c.loc].name);
  occSlider.elt.disabled = true; locSel.elt.disabled = true;
  cfmSlider.elt.disabled = i !== 2;
  ansInput.value(''); yesNoSel.selected('Choose...');
  revealed = false; playStart = -1; msg = ''; msgKind = 'info';
  nextButton.html(i < 3 ? 'Next challenge' : 'Unlock sliders');
  updateControlState();
}

function startExplore() {
  phase = 4;
  occSlider.value(25); cfmSlider.value(450); locSel.selected(SENSOR_LOCS[0].name);
  occSlider.elt.disabled = false; cfmSlider.elt.disabled = false; locSel.elt.disabled = false;
  revealed = true; playStart = -1;
  nextButton.html('Restart challenges');
  msg = 'Halve the airflow from 450 to 250 cfm and watch the steady level and the settling time rise. Then move the sensor.';
  msgKind = 'info';
  updateControlState();
}

function nextStep() {
  if (phase === 4) { attempts = [0, 0, 0, 0]; outcome = ['open', 'open', 'open', 'open']; startChallenge(0); return; }
  if (outcome[phase] === 'open') return;
  if (phase < 3) startChallenge(phase + 1); else startExplore();
}

function onSetting() {
  if (phase === 4) playStart = -1; // exploration shows the full curve at once
}

function checkAnswer() {
  if (phase > 3 || outcome[phase] !== 'open') return;
  const c = CHALLENGES[phase];
  let ok;
  let typed;
  if (c.kind === 'ppm') {
    typed = parseFloat(String(ansInput.value()).replace(',', ''));
    if (isNaN(typed)) { msg = 'Type the concentration in ppm, then press Check.'; msgKind = 'bad'; return; }
    ok = Math.abs(typed - c.answer) <= 25;
  } else if (c.kind === 'cfm') {
    typed = cfmSlider.value();
    ok = typed === c.answer;
  } else {
    if (yesNoSel.value() === 'Choose...') { msg = 'Choose Yes or No, then press Check.'; msgKind = 'bad'; return; }
    ok = yesNoSel.value() === c.answer;
  }
  attempts[phase]++;
  if (ok) {
    outcome[phase] = 'correct'; msg = 'Correct: ' + c.show + '.'; msgKind = 'good';
    resolve(c);
  } else if (attempts[phase] >= 2) {
    outcome[phase] = 'missed'; msg = 'Not this time: ' + c.show + '. ' + c.why; msgKind = 'bad';
    resolve(c);
  } else {
    let extra = '';
    if (c.kind === 'cfm') extra = ' At ' + typed + ' cfm the room settles at ' + fmtP(steady(c.occ, typed)) + ' ppm.';
    msg = 'Not quite.' + extra + ' ' + c.hint + ' Try once more.'; msgKind = 'bad';
  }
  updateControlState();
}

function resolve(c) {
  revealed = true;
  if (c.kind === 'cfm') cfmSlider.value(c.answer);   // play the rise at the correct airflow
  playStart = millis();
}

function updateControlState() {
  const open = phase <= 3 && outcome[phase] === 'open';
  const c = phase <= 3 ? CHALLENGES[phase] : null;
  ansInput.elt.disabled = !open; yesNoSel.elt.disabled = !open; checkButton.elt.disabled = !open;
  nextButton.elt.disabled = phase <= 3 && open;
  if (phase <= 3 && !open) cfmSlider.elt.disabled = true;
  if (phase === 4) checkButton.hide(); else checkButton.show();
  if (c && c.kind === 'ppm') { ansInput.show(); yesNoSel.hide(); }
  else if (c && c.kind === 'yesno') { ansInput.hide(); yesNoSel.show(); }
  else { ansInput.hide(); yesNoSel.hide(); }
  positionControls();
}

// ---- Drawing ----
function currentTime(xMax) {
  if (phase === 4 || playStart < 0 && revealed) return xMax;
  if (!revealed) return 0;
  return xMax * Math.min(1, (millis() - playStart) / PLAY_MS);
}

function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke(); fill('black');
  textSize(24); textAlign(CENTER, TOP);
  text('Classroom CO2 Ventilation Balance Explorer', canvasWidth / 2, 8);
  textSize(defaultTextSize);

  const occ = occSlider.value(), cfm = cfmSlider.value();
  const st = steady(occ, cfm), tau = VOLUME / cfm;
  const xMax = Math.max(60, Math.ceil(3 * tau * 1.15 / 30) * 30);
  const t = currentTime(xMax);
  const now = revealed ? concAt(occ, cfm, t) : OUTDOOR;

  const leftW = Math.min(250, canvasWidth * 0.4);
  drawRoom(15, 48, leftW, 150, occ, cfm, now);
  drawReadouts(15, 208, leftW, occ, cfm, st, tau, now);
  drawPlot(leftW + 40, 48, canvasWidth - leftW - 55, 235, occ, cfm, st, tau, xMax, t);
  drawStatus(leftW + 40, 292, canvasWidth - leftW - 55, 100);
  drawControlLabels();
}

function drawRoom(x, y, w, h, occ, cfm, conc) {
  // room tinted by the current concentration
  stroke('dimgray'); fill(lerpColor(color('honeydew'), color('tomato'), constrain((conc - OUTDOOR) / 1800, 0, 1)));
  rect(x, y, w, h, 6);
  noStroke(); fill('dimgray');
  for (let i = 0; i < occ; i++) {
    const col = i % 10, row = Math.floor(i / 10);
    circle(x + 22 + col * ((w - 44) / 9), y + h - 26 - row * 20, 11);
  }
  // fresh air in (left) and exhaust out (right)
  fill('royalblue'); stroke('royalblue'); strokeWeight(3);
  line(x - 10, y + 22, x + 22, y + 22); noStroke(); triangle(x + 28, y + 22, x + 16, y + 15, x + 16, y + 29);
  stroke('dimgray'); line(x + w - 22, y + 22, x + w + 8, y + 22); noStroke(); fill('dimgray'); triangle(x + w + 14, y + 22, x + w + 2, y + 15, x + w + 2, y + 29);
  strokeWeight(1);
  noStroke(); fill('royalblue'); textAlign(LEFT, TOP); textSize(14);
  text(cfm + ' cfm in', x + 32, y + 8); fill('dimgray'); textAlign(RIGHT, TOP); text('out', x + w - 28, y + 8);
  // sensor
  const li = SENSOR_LOCS.findIndex(l => l.name === locSel.value());
  const sx = [x + w * 0.5, x + 26, x + w - 20][li], sy = [y + h * 0.45, y + 52, y + 45][li];
  stroke('black'); fill('gold'); rect(sx - 8, sy - 8, 16, 16, 3);
  noStroke(); fill('black'); textAlign(CENTER, TOP); textSize(14);
  text('sensor', sx, sy + 9);
  textSize(defaultTextSize);
}

function drawReadouts(x, y, w, occ, cfm, st, tau, now) {
  noStroke(); textAlign(LEFT, TOP); fill('black');
  text('Room: 7,200 ft³, ' + occ + ' people', x, y);
  text('Outdoor air: ' + cfm + ' cfm at ' + OUTDOOR + ' ppm', x, y + 22);
  const f = locFrac();
  if (revealed) {
    textStyle(BOLD); text('Steady level: ' + fmtP(st) + ' ppm', x, y + 48); textStyle(NORMAL);
    text('Sensor reads: ' + fmtP(OUTDOOR + f * (st - OUTDOOR)) + ' ppm', x, y + 70);
    text('Time to settle: ' + Math.round(3 * tau) + ' min', x, y + 92);
    fill('dimgray'); textSize(14); text('Sensor fractions are illustrative.', x, y + 116); textSize(defaultTextSize);
  } else {
    fill('dimgray');
    text(phase <= 3 ? 'Results appear after Check.' : '', x, y + 48);
    textSize(14); text('0.0106 cfm of CO2 per resting adult.', x, y + 70); text('Sensor fractions are illustrative.', x, y + 90); textSize(defaultTextSize);
  }
}

function drawPlot(x, y, w, h, occ, cfm, st, tau, xMax, t) {
  const pad = { l: 66, b: 28, t: 18, r: 10 };
  const px = x + pad.l, py = y + pad.t, pw = w - pad.l - pad.r, ph = h - pad.t - pad.b;
  const yMax = Math.max(1200, Math.ceil(st * 1.08 / 200) * 200);
  const X = m => px + (m / xMax) * pw, Y = p => py + ph - ((p - 400) / (yMax - 400)) * ph;
  stroke('gray'); fill('white'); rect(px, py, pw, ph);
  // gridlines and tick labels
  const yStep = yMax > 3000 ? 1000 : yMax > 1600 ? 400 : 200;
  textSize(14); noStroke(); fill('dimgray'); textAlign(RIGHT, CENTER);
  for (let v = Math.ceil(400 / yStep) * yStep; v <= yMax; v += yStep) { stroke('gainsboro'); line(px, Y(v), px + pw, Y(v)); noStroke(); text(fmtP(v), px - 4, Y(v)); }
  textAlign(CENTER, TOP);
  const xStep = xMax > 240 ? 120 : xMax > 120 ? 60 : 15;
  for (let m = 0; m <= xMax; m += xStep) { noStroke(); text(m, X(m), py + ph + 3); }
  text('minutes', px + pw / 2, py + ph + 14);
  push(); translate(x + 10, py + ph / 2); rotate(-HALF_PI); text('CO2 (ppm)', 0, 0); pop();
  textSize(defaultTextSize);

  // 1,000 ppm target line
  stroke('firebrick'); drawingContext.setLineDash([6, 4]); line(px, Y(1000), px + pw, Y(1000)); drawingContext.setLineDash([]);
  noStroke(); fill('firebrick'); textAlign(RIGHT, BOTTOM); textSize(14); text('1,000 ppm', px + pw - 3, Y(1000) - 1); textSize(defaultTextSize);

  if (!revealed) {
    noStroke(); fill('dimgray'); textAlign(CENTER, CENTER);
    text('The rise appears after you answer.', px + pw / 2, py + ph / 2);
    return;
  }
  // steady level and 3-time-constant marker
  stroke('navy'); drawingContext.setLineDash([2, 4]); line(px, Y(st), px + pw, Y(st)); drawingContext.setLineDash([]);
  stroke('seagreen'); line(X(3 * tau), py, X(3 * tau), py + ph);
  noStroke(); fill('seagreen'); textSize(14);
  const lab = '3 time constants: ' + Math.round(3 * tau) + ' min';
  if (X(3 * tau) + 8 + textWidth(lab) > px + pw) { textAlign(RIGHT, BOTTOM); text(lab, X(3 * tau) - 4, py + ph - 4); }
  else { textAlign(LEFT, BOTTOM); text(lab, X(3 * tau) + 4, py + ph - 4); }
  textSize(defaultTextSize);

  // breathing-zone curve and sensor curve up to the playing time
  const f = locFrac();
  noFill(); stroke('navy'); strokeWeight(3);
  beginShape();
  for (let m = 0; m <= t; m += xMax / 120) vertex(X(m), Y(concAt(occ, cfm, m)));
  vertex(X(t), Y(concAt(occ, cfm, t)));
  endShape();
  if (f !== 1) {
    stroke('darkorange');
    beginShape();
    for (let m = 0; m <= t; m += xMax / 120) vertex(X(m), Y(OUTDOOR + f * (concAt(occ, cfm, m) - OUTDOOR)));
    vertex(X(t), Y(OUTDOOR + f * (concAt(occ, cfm, t) - OUTDOOR)));
    endShape();
  }
  strokeWeight(1);
  noStroke(); textSize(14); textAlign(LEFT, TOP);
  fill('navy'); text('Breathing zone', px + 6, py + 4);
  if (f !== 1) { fill('darkorange'); text('Sensor reading', px + 6, py + 22); }
  textSize(defaultTextSize);
}

function drawStatus(x, y, w, h) {
  const fills = { info: 'white', good: 'honeydew', bad: 'mistyrose' };
  const edges = { info: 'silver', good: 'seagreen', bad: 'firebrick' };
  stroke(edges[msgKind]); fill(fills[msgKind]);
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  if (phase <= 3) {
    textStyle(BOLD);
    text('Challenge ' + (phase + 1) + ' of 4      Correct: ' + outcome.filter(o => o === 'correct').length + ' of 4', x + 8, y + 4);
    textStyle(NORMAL);
    text(msg || CHALLENGES[phase].q, x + 8, y + 26, w - 16, h - 28);
  } else {
    text(msg, x + 8, y + 6, w - 16, h - 8);
  }
}

// ---- Control labels and layout ----
function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  const y0 = drawHeight;
  if (phase <= 3) {
    const k = CHALLENGES[phase].kind;
    text(k === 'ppm' ? 'Answer (ppm):' : k === 'yesno' ? 'Problem seen?' : 'Airflow answer:', 10, y0 + 17);
  } else text('Explore:', 10, y0 + 17);
  text('Occupants: ' + occSlider.value(), 10, y0 + 52);
  text('Outdoor airflow: ' + cfmSlider.value() + ' cfm', 10, y0 + 87);
  text('Sensor location:', 10, y0 + 122);
}

function positionControls() {
  const y0 = drawHeight;
  ansInput.position(125, y0 + 5);
  yesNoSel.position(125, y0 + 5);
  checkButton.position(225, y0 + 5);
  nextButton.position(290, y0 + 5);
  occSlider.position(sliderLeftMargin, y0 + 40);
  cfmSlider.position(sliderLeftMargin, y0 + 75);
  locSel.position(sliderLeftMargin, y0 + 110);
  const w = Math.max(100, canvasWidth - sliderLeftMargin - margin);
  occSlider.size(w); cfmSlider.size(w);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) canvasWidth = Math.floor(container.getBoundingClientRect().width);
}
