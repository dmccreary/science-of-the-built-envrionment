// Battery Backup Run-Time Explorer MicroSim - run time = usable energy / total load, and a load above the inverter rating trips the system
// CANVAS_HEIGHT: 590
// Bloom Level 3 (Apply): calculate the run time for a chosen set of loads and decide whether the inverter trips
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 190; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

// ---- Data (illustrative average watts; the five critical loads total 1,200 W) ----
const LOADS = [
  { name: 'Refrigerator', label: 'Refrigerator', w: 150 },
  { name: 'Furnace blower', label: 'Furnace blower', w: 500 },
  { name: 'Sump pump', label: 'Sump pump', w: 300 },
  { name: 'LED lights', label: 'LED lights', w: 150 },
  { name: 'Internet, chargers', label: 'Internet', w: 100 },
  { name: 'Heat pump', label: 'Heat pump', w: 2000 },
  { name: 'Electric water heater', label: 'Water heater', w: 4500 },
  { name: 'Vehicle charger', label: 'EV charger', w: 7200 }
];
const BATT_DEFAULT = 13.5; // kWh usable
const INV_DEFAULT = 5;     // kW

// Three challenges, fixed order. loads = indexes into LOADS.
const CHALLENGES = [
  { loads: [0, 1, 2, 3, 4], q: 'A storm cuts the grid. How long will the battery carry these loads?',
    why: 'Run time = 13.5 kWh / 1.2 kW = 11.25 h.', answer: 11.25, show: '11.25 h (11 h 15 min)' },
  { loads: [0, 1, 2, 3, 4, 5], q: 'The heat pump (2,000 W) now runs along with the critical loads. How long will the battery carry them?',
    why: 'Run time = 13.5 / 3.2 = 4.2 h. The heat pump more than doubles the load, so the run time falls by more than half.', answer: 13.5 / 3.2, show: '4.2 h' },
  { loads: [0, 1, 2, 3, 4, 6], q: 'An electric water heater (4,500 W) joins the critical loads. Does the 5 kW inverter trip? Set the smallest inverter that carries the load, then type the run time with it.',
    why: '5.7 kW exceeds the 5 kW rating, so the system shuts down even though the battery is full. The smallest inverter in range that is >= 5.7 kW is 6 kW, and 13.5 / 5.7 = 2.4 h.', answer: 13.5 / 5.7, show: '2.4 h' }
];

// ---- State ----
let phase = 0;                  // 0..2 = challenge, 3 = free exploration
let attempts = [0, 0, 0];
let outcome = ['open', 'open', 'open']; // open | correct | missed
let revealed = false;           // total load and run time shown after Check
let msg = '';
let msgKind = 'info';           // info | good | bad

// ---- Controls ----
let ansInput, checkButton, nextButton, tripsSel, battSlider, invSlider;
let loadBoxes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ansInput = createInput('', 'text');
  ansInput.attribute('inputmode', 'decimal');
  ansInput.attribute('aria-label', 'Run time in hours');
  ansInput.size(70);
  ansInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next challenge');
  nextButton.mousePressed(nextStep);

  tripsSel = createSelect();
  tripsSel.option('Choose...');
  tripsSel.option('Yes');
  tripsSel.option('No');
  tripsSel.attribute('aria-label', 'Does the inverter trip');

  battSlider = createSlider(5, 40, BATT_DEFAULT, 0.5);
  battSlider.input(onSettingChange);
  invSlider = createSlider(3, 15, INV_DEFAULT, 1);
  invSlider.input(onSettingChange);

  for (let i = 0; i < LOADS.length; i++) {
    const cb = createCheckbox(LOADS[i].label, false);
    cb.changed(onSettingChange);
    loadBoxes.push(cb);
  }

  describe('A battery backup explorer. The left side lists eight household loads with illustrative average watts. The right side shows a power bar comparing the total load with the inverter rating, and a time bar showing how many hours the battery carries the load. Three challenges ask the learner to type the run time before it is revealed; afterward loads, battery energy, and inverter rating can be changed freely.', LABEL);

  startChallenge(0);
  positionControls();
}

// ---- Model ----
function selected() { return loadBoxes.map(b => b.checked()); }
function totalKW() { return LOADS.reduce((s, l, i) => s + (loadBoxes[i].checked() ? l.w : 0), 0) / 1000; }
function battery() { return battSlider.value(); }
function inverter() { return invSlider.value(); }
// Run time in hours: energy / load when the load is within the inverter rating, otherwise the inverter trips (0 h)
function runTime() {
  const t = totalKW();
  if (t <= 0) return null;
  return t > inverter() ? 0 : battery() / t;
}
function fmtHours(h) {
  const hh = Math.floor(h + 1e-9);
  const mm = Math.round((h - hh) * 60);
  return nf(h, 1, 1) + ' h (' + (mm === 60 ? (hh + 1) + ' h 0 min' : hh + ' h ' + mm + ' min') + ')';
}
function fmtKW(k) { return (Math.round(k * 10) / 10) + ' kW'; }
function fmtW(w) { return w.toLocaleString('en-US') + ' W'; }

// ---- Challenge flow ----
function startChallenge(i) {
  phase = i;
  const c = CHALLENGES[i];
  loadBoxes.forEach((b, k) => { b.checked(c.loads.includes(k)); setDisabled(b, true); });
  battSlider.value(BATT_DEFAULT);
  invSlider.value(INV_DEFAULT);
  setDisabled(battSlider, true);
  setDisabled(invSlider, i !== 2);
  ansInput.value('');
  tripsSel.selected('Choose...');
  revealed = false;
  msg = '';
  msgKind = 'info';
  nextButton.html('Next challenge');
  updateControlState();
}

function startExplore() {
  phase = 3;
  loadBoxes.forEach(b => setDisabled(b, false));
  setDisabled(battSlider, false);
  setDisabled(invSlider, false);
  revealed = true;
  ansInput.value('');
  nextButton.html('Restart challenges');
  const n = outcome.filter(o => o === 'correct').length;
  msg = 'Challenges correct: ' + n + ' of 3. Now turn loads on and off and change the battery and inverter. Try adding the vehicle charger.';
  msgKind = 'info';
  updateControlState();
}

function restart() {
  attempts = [0, 0, 0];
  outcome = ['open', 'open', 'open'];
  startChallenge(0);
}

function nextStep() {
  if (phase === 3) { restart(); return; }
  if (outcome[phase] === 'open') return;
  if (phase < 2) startChallenge(phase + 1); else startExplore();
}

function onSettingChange() {
  if (phase === 3) revealed = true;
  if (phase === 2 && outcome[2] === 'open') revealed = false;
}

function checkAnswer() {
  if (phase > 2 || outcome[phase] !== 'open') return;
  const c = CHALLENGES[phase];
  const val = parseFloat(String(ansInput.value()).replace(',', '.'));
  if (isNaN(val)) { msg = 'Type the run time as a number of hours, then press Check.'; msgKind = 'bad'; return; }
  if (phase === 2 && tripsSel.value() === 'Choose...') { msg = 'Choose whether the 5 kW inverter trips, then press Check.'; msgKind = 'bad'; return; }

  let ok = Math.abs(val - c.answer) <= 0.1;
  if (phase === 2) ok = ok && tripsSel.value() === 'Yes' && inverter() === 6;
  attempts[phase]++;
  revealed = true;
  if (ok) {
    outcome[phase] = 'correct';
    msg = 'Correct: ' + (phase === 2 ? 'trips with 5 kW; a 6 kW inverter carries it for ' : '') + c.show + '. ' + c.why;
    msgKind = 'good';
  } else if (attempts[phase] >= 2) {
    outcome[phase] = 'missed';
    msg = 'Not this time. ' + c.why;
    msgKind = 'bad';
  } else {
    msg = c.why + ' Try once more.';
    msgKind = 'bad';
  }
  updateControlState();
}

function setDisabled(el, flag) {
  const target = el.elt.querySelector('input') || el.elt;
  target.disabled = flag;
}

function updateControlState() {
  const inChallenge = phase <= 2;
  const open = inChallenge && outcome[phase] === 'open';
  setDisabled(ansInput, !open);
  setDisabled(checkButton, !open);
  setDisabled(nextButton, inChallenge && open);
  if (phase === 2) setDisabled(invSlider, !open);
  tripsSel.elt.disabled = !(phase === 2 && open);
  if (phase === 2) tripsSel.show(); else tripsSel.hide();
  positionControls();
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  text('Battery Backup Run-Time Explorer', canvasWidth / 2, 8);
  textSize(defaultTextSize);

  const leftW = Math.min(270, canvasWidth * 0.4);
  drawLoadList(15, 46, leftW);
  const x1 = leftW + 35;
  const w2 = canvasWidth - x1 - 15;
  drawQuestion(x1, 46, w2);
  drawPowerGauge(x1, 128, w2);
  drawTimeBar(x1, 218, w2);
  drawMessage(15, 330, canvasWidth - 30, 62);
  drawControlLabels();
}

function drawLoadList(x, y, w) {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Loads (illustrative watts)', x, y);
  textStyle(NORMAL);
  let yy = y + 28;
  for (let i = 0; i < LOADS.length; i++) {
    const on = loadBoxes[i].checked();
    if (i === 5) { stroke('silver'); line(x, yy + 1, x + w, yy + 1); yy += 6; noStroke(); }
    stroke('dimgray');
    fill(on ? 'seagreen' : 'white');
    rect(x, yy + 2, 14, 14);
    noStroke();
    fill(on ? 'black' : 'gray');
    textAlign(LEFT, TOP);
    text(LOADS[i].name, x + 22, yy);
    textAlign(RIGHT, TOP);
    text(fmtW(LOADS[i].w), x + w, yy);
    yy += 24;
  }
  textAlign(LEFT, TOP);
  const t = totalKW();
  fill('black');
  if (revealed && t > 0) { textStyle(BOLD); text('Total load: ' + fmtW(Math.round(t * 1000)), x, yy + 4); textStyle(NORMAL); }
  else if (phase === 3 && t === 0) { fill('firebrick'); text('Select at least one load.', x, yy + 4); }
  else { fill('dimgray'); text('Total load: add them up', x, yy + 4); }
  fill('dimgray'); textSize(14);
  text('Load wattages are illustrative averages.', x, yy + 30);
  textSize(defaultTextSize);
}

function drawQuestion(x, y, w) {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  if (phase <= 2) {
    textStyle(BOLD);
    text('Challenge ' + (phase + 1) + ' of 3      Correct: ' + outcome.filter(o => o === 'correct').length + ' of 3', x, y);
    textStyle(NORMAL);
    text(CHALLENGES[phase].q, x, y + 24, w, 64);
  } else {
    textStyle(BOLD);
    text('Explore: change anything', x, y);
    textStyle(NORMAL);
    text('Energy (kWh) sets how long; power (kW) sets how much can run at once.', x, y + 24, w, 64);
  }
}

function drawPowerGauge(x, y, w) {
  const maxKW = 16;
  const sx = kw => x + (kw / maxKW) * w;
  const t = totalKW();
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD);
  if (revealed && t > 0) {
    const over = t > inverter();
    text('Power: ', x, y);
    fill(over ? 'firebrick' : 'seagreen');
    text(over ? 'load ' + fmtKW(t) + ' > rating, trips' : 'load ' + fmtKW(t) + ' is within rating', x + 62, y);
  } else {
    text('Power: load vs. inverter rating', x, y);
  }
  textStyle(NORMAL);
  const by = y + 24;
  stroke('gray'); fill('white'); rect(x, by, w, 22);
  if (revealed && t > 0) {
    noStroke(); fill(t > inverter() ? 'firebrick' : 'seagreen');
    rect(x + 1, by + 1, Math.max(1, Math.min(sx(t), x + w) - x - 2), 20);
  }
  // inverter rating marker
  stroke('navy'); strokeWeight(3);
  line(sx(inverter()), by - 4, sx(inverter()), by + 26);
  strokeWeight(1);
  noStroke(); fill('navy'); textAlign(CENTER, TOP);
  text('Inverter ' + fmtKW(inverter()), constrain(sx(inverter()), x + 55, x + w - 55), by + 28);
  textAlign(LEFT, TOP);
}

function drawTimeBar(x, y, w) {
  const maxH = 24;
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD); text('Run time on ' + nf(battery(), 1, 1) + ' kWh', x, y); textStyle(NORMAL);
  const by = y + 24;
  stroke('gray'); fill('white'); rect(x, by, w, 22);
  const t = totalKW();
  const rt = runTime();
  noStroke();
  // hour ticks and numbers under the bar
  stroke('gray');
  for (let h = 0; h <= maxH; h += 6) line(x + (h / maxH) * w, by + 22, x + (h / maxH) * w, by + 27);
  noStroke(); fill('dimgray'); textSize(14); textAlign(CENTER, TOP);
  for (let h = 0; h <= maxH; h += 6) text(h + (h === maxH ? ' h' : ''), constrain(x + (h / maxH) * w, x + 8, x + w - 12), by + 28);
  textSize(defaultTextSize);
  textAlign(LEFT, TOP);
  if (revealed && t > 0) {
    if (rt === 0) {
      fill('firebrick');
      text('Inverter tripped: 0 h with a full battery', x, by + 48);
    } else {
      noStroke(); fill('steelblue');
      rect(x + 1, by + 1, Math.max(1, Math.min(rt / maxH, 1) * w - 2), 20);
      fill('black');
      text(nf(battery(), 1, 1) + ' kWh / ' + nf(t, 1, 1) + ' kW = ' + fmtHours(rt) + (rt > maxH ? ' (off scale)' : ''), x, by + 48);
    }
  } else {
    fill('dimgray');
    text(phase <= 2 ? 'Type your answer, then press Check.' : 'Select at least one load.', x, by + 48);
  }
}

function drawMessage(x, y, w, h) {
  const fills = { info: 'white', good: 'honeydew', bad: 'mistyrose' };
  const edges = { info: 'silver', good: 'seagreen', bad: 'firebrick' };
  stroke(edges[msgKind]); fill(fills[msgKind]);
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  const body = msg || (phase <= 2 ? 'Add up the loads in kilowatts, then divide the battery energy by the total.' : '');
  text(body, x + 8, y + 6, w - 16, h - 8);
}

// ---- Control labels and layout ----
function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  const y0 = drawHeight;
  text('Answer (h):', 10, y0 + 17);
  if (phase === 2) text('Trips?', 470, y0 + 17);
  text('Battery: ' + nf(battery(), 1, 1) + ' kWh', 10, y0 + 52);
  text('Inverter: ' + inverter() + ' kW', 10, y0 + 87);
}

function positionControls() {
  const y0 = drawHeight;
  ansInput.position(105, y0 + 5);
  checkButton.position(190, y0 + 5);
  nextButton.position(255, y0 + 5);
  tripsSel.position(520, y0 + 5);
  battSlider.position(sliderLeftMargin, y0 + 40);
  invSlider.position(sliderLeftMargin, y0 + 75);
  resizeSliders();
  const colW = (canvasWidth - 20) / 4;
  for (let i = 0; i < loadBoxes.length; i++) {
    loadBoxes[i].position(10 + (i % 4) * colW, y0 + 110 + Math.floor(i / 4) * 35);
  }
}

function resizeSliders() {
  const w = Math.max(100, canvasWidth - sliderLeftMargin - margin);
  battSlider.size(w);
  invSlider.size(w);
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
