// Heat Pump COP and Lift Explorer MicroSim - Carnot limit = T_supply / (T_supply - T_outdoor), and what it means for the cost of 100,000 Btu
// CANVAS_HEIGHT: 620
// Bloom Level 3 (Apply): calculate the Carnot limit on COP and use it to estimate electricity and cost
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 220; // six rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 235;
let defaultTextSize = 16;

// ---- Constants from Appendix A ----
const BTU = 100000;          // heat delivered in the cost comparison
const BTU_PER_KWH = 3412;
const FURNACE_EFF = 0.95;
const NEEP_COP = 1.75;       // NEEP cold-climate minimum COP at 5 F
const SEASONAL_COP = 2.5;    // Appendix A seasonal COP example
const OUT_MIN = -20, OUT_MAX = 60;   // outdoor slider range (F)
const SUP_MIN = 90, SUP_MAX = 130;   // supply slider range (F)

// ---- Challenges (fixed order) ----
const CHALLENGES = [
  { out: 47, sup: 100, q: 'How high could the COP be on a 47°F day when the building needs 100°F supply air?',
    why: 'Outdoors is 281.5 K and supply is 310.9 K, so the lift is 29.4 K and the limit is 310.9 / 29.4 = 10.6.' },
  { out: 5, sup: 100, q: 'Now it is 5°F outside and the building still needs 100°F supply air. What is the limit?',
    why: 'Outdoors is 258.2 K, so the lift is 52.8 K and the limit is 310.9 / 52.8 = 5.9. Colder weather means more lift and a lower limit.' },
  { out: -10, sup: 100, q: 'On a -10°F night the supply air is still 100°F. What is the limit?',
    why: 'Outdoors is 249.8 K, so the lift is 61.1 K and the limit is 310.9 / 61.1 = 5.1.' },
  { out: 5, sup: 120, q: 'At 5°F outdoors, a system delivers 120°F water instead of 100°F air. What is the limit?',
    why: 'Supply is 322.0 K and outdoors is 258.2 K, so the lift is 63.9 K and the limit is 322.0 / 63.9 = 5.0. A hotter supply raises the lift, so a system delivering 120°F water has a lower limit than one delivering 100°F air.' }
];

// ---- State ----
let phase = 0;                 // 0..3 = challenge, 4 = exploration
let attempts = [0, 0, 0, 0];
let outcome = ['open', 'open', 'open', 'open'];
let revealed = false;
let msg = '';
let msgKind = 'info';

// ---- Controls ----
let ansInput, checkButton, nextButton, sourceSel;
let outSlider, supSlider, fracSlider, elecSlider, gasSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ansInput = createInput('', 'text');
  ansInput.attribute('inputmode', 'decimal');
  ansInput.attribute('aria-label', 'Carnot limit on COP');
  ansInput.size(70);
  ansInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next challenge');
  nextButton.mousePressed(nextStep);

  sourceSel = createSelect();
  sourceSel.option('Carnot estimate');
  sourceSel.option('Seasonal COP 2.5 (the Appendix A example)');
  sourceSel.attribute('aria-label', 'COP source');

  outSlider = createSlider(OUT_MIN, OUT_MAX, 5, 5);
  supSlider = createSlider(SUP_MIN, SUP_MAX, 100, 5);
  fracSlider = createSlider(0.30, 0.60, 0.40, 0.05);
  elecSlider = createSlider(0.08, 0.30, 0.14, 0.02);
  gasSlider = createSlider(0.80, 2.40, 1.20, 0.10);

  describe('A heat pump explorer. A thermometer diagram on the left shows the outdoor and supply temperatures and the lift between them. On the right, a bar shows the Carnot limit on COP and the COP used, and three bars compare the cost of delivering 100,000 Btu with a heat pump, a gas furnace, and electric resistance. Four challenges ask for the Carnot limit before it is revealed, then the sliders unlock.', LABEL);

  startChallenge(0);
  positionControls();
}

// ---- Model ----
function kelvin(f) { return (f - 32) * 5 / 9 + 273.15; }
function carnot(outF, supF) { const ts = kelvin(supF), to = kelvin(outF); return ts / (ts - to); }
function liftK(outF, supF) { return kelvin(supF) - kelvin(outF); }
function curOut() { return phase <= 3 ? CHALLENGES[phase].out : outSlider.value(); }
function curSup() { return phase <= 3 ? CHALLENGES[phase].sup : supSlider.value(); }
function copUsed() {
  return sourceSel.value() === 'Carnot estimate' ? fracSlider.value() * carnot(curOut(), curSup()) : SEASONAL_COP;
}
function calcModel() {
  const cop = copUsed();
  const kwh = BTU / (BTU_PER_KWH * cop);
  const therms = BTU / (100000 * FURNACE_EFF);
  const resKwh = BTU / BTU_PER_KWH;
  const e = elecSlider.value(), g = gasSlider.value();
  const hp = kwh * e;
  return { cop, kwh, therms, resKwh, hp, furnace: therms * g, resist: resKwh * e, breakeven: hp / therms, e, g };
}
const f1 = v => nf(v, 1, 1);
const usd = v => '$' + nf(v, 1, 2);

// ---- Flow ----
function startChallenge(i) {
  phase = i;
  ansInput.value('');
  revealed = false;
  msg = '';
  msgKind = 'info';
  nextButton.html(i < 3 ? 'Next challenge' : 'Unlock sliders');
  [outSlider, supSlider, fracSlider, elecSlider, gasSlider].forEach(s => s.hide());
  sourceSel.hide();
  ansInput.show(); checkButton.show();
  updateControlState();
}

function startExplore() {
  phase = 4;
  revealed = true;
  [outSlider, supSlider, fracSlider, elecSlider, gasSlider].forEach(s => s.show());
  sourceSel.show();
  ansInput.hide(); checkButton.hide();
  nextButton.html('Restart challenges');
  msg = '';
  updateControlState();
}

function nextStep() {
  if (phase === 4) { attempts = [0, 0, 0, 0]; outcome = ['open', 'open', 'open', 'open']; startChallenge(0); return; }
  if (outcome[phase] === 'open') return;
  if (phase < 3) startChallenge(phase + 1); else startExplore();
}

function checkAnswer() {
  if (phase > 3 || outcome[phase] !== 'open') return;
  const c = CHALLENGES[phase];
  const val = parseFloat(String(ansInput.value()).replace(',', '.'));
  if (isNaN(val)) { msg = 'Type the Carnot limit as a number, then press Check.'; msgKind = 'bad'; return; }
  const exact = carnot(c.out, c.sup);
  attempts[phase]++;
  revealed = true;
  if (Math.abs(val - exact) <= 0.1) {
    outcome[phase] = 'correct';
    msg = 'Correct: the limit is ' + f1(exact) + '.';
    msgKind = 'good';
  } else if (attempts[phase] >= 2) {
    outcome[phase] = 'missed';
    msg = 'Not this time: the limit is ' + f1(exact) + '. ' + c.why;
    msgKind = 'bad';
  } else {
    msg = c.why + ' Try once more.';
    msgKind = 'bad';
  }
  updateControlState();
}

function setDisabled(el, flag) { el.elt.disabled = flag; }

function updateControlState() {
  const open = phase <= 3 && outcome[phase] === 'open';
  setDisabled(ansInput, !open);
  setDisabled(checkButton, !open);
  setDisabled(nextButton, phase <= 3 && open);
  positionControls();
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  fill('aliceblue'); stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke(); fill('black');
  textSize(24); textAlign(CENTER, TOP);
  text('Heat Pump COP and Lift Explorer', canvasWidth / 2, 8);
  textSize(defaultTextSize);

  drawThermometer(15, 52, 175, 300);
  const x0 = 205, w = canvasWidth - x0 - 15;
  if (phase <= 3) drawChallenge(x0, w); else drawExplore(x0, w);
  drawControlLabels();
}

// Outdoor and supply temperatures on a vertical axis, with the lift between them
function drawThermometer(x, y, w, h) {
  const tMin = -20, tMax = 130;
  const out = curOut(), sup = curSup();
  const ty = t => y + h - ((t - tMin) / (tMax - tMin)) * h;
  const ax = x + 38;
  stroke('gray'); line(ax, y, ax, y + h);
  noStroke(); fill('dimgray'); textSize(14); textAlign(RIGHT, CENTER);
  for (let t = -20; t <= 120; t += 20) {
    stroke('gray'); line(ax - 4, ty(t), ax, ty(t));
    noStroke(); text(t + '°', ax - 7, ty(t));
  }
  // freezing reference
  stroke('lightsteelblue'); drawingContext.setLineDash([4, 4]); line(ax, ty(32), x + w, ty(32)); drawingContext.setLineDash([]);
  noStroke(); fill('steelblue'); textAlign(RIGHT, BOTTOM); text('32°F freezing', x + w, ty(32) - 1);

  // outdoor and supply lines
  stroke('royalblue'); strokeWeight(3); line(ax, ty(out), x + w - 30, ty(out));
  stroke('firebrick'); line(ax, ty(sup), x + w - 30, ty(sup));
  strokeWeight(1);
  noStroke(); textSize(defaultTextSize); textAlign(LEFT, TOP);
  fill('royalblue'); text('Outdoor ' + out + '°F', ax + 6, ty(out) + 3);
  fill('firebrick'); text('Supply ' + sup + '°F', ax + 6, ty(sup) - 22);
  // lift bracket
  const bx = x + w - 14, midY = (ty(out) + ty(sup)) / 2;
  stroke('black'); line(bx, ty(out), bx, ty(sup));
  line(bx - 4, ty(sup) + 6, bx, ty(sup)); line(bx + 4, ty(sup) + 6, bx, ty(sup));
  line(bx - 4, ty(out) - 6, bx, ty(out)); line(bx + 4, ty(out) - 6, bx, ty(out));
  noStroke(); fill('black'); textAlign(CENTER, CENTER); textSize(14);
  push(); translate(bx - 15, midY); rotate(-HALF_PI);
  text(phase <= 3 && !revealed ? 'lift = ? K' : 'lift = ' + f1(liftK(out, sup)) + ' K', 0, 0);
  pop();
  textSize(defaultTextSize);
}

function drawChallenge(x0, w) {
  const c = CHALLENGES[phase];
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Challenge ' + (phase + 1) + ' of 4      Correct: ' + outcome.filter(o => o === 'correct').length + ' of 4', x0, 46);
  textStyle(NORMAL);
  text(c.q, x0, 70, w, 66);
  fill('navy');
  text('Kelvin = (°F - 32) × 5/9 + 273.15', x0, 140);
  text('Carnot limit = T_supply / (T_supply - T_outdoor)', x0, 162);
  fill('dimgray'); textSize(14); text('Use kelvin for both temperatures.', x0, 184); textSize(defaultTextSize);

  // Carnot limit bar, shown after Check
  const by = 226;
  fill('black'); textStyle(BOLD); text('Carnot limit on COP', x0, 204); textStyle(NORMAL);
  stroke('gray'); fill('white'); rect(x0, by, w, 20);
  if (revealed) {
    const v = carnot(c.out, c.sup);
    noStroke(); fill('navy'); rect(x0 + 1, by + 1, Math.max(1, (v / 12) * w - 2), 18);
    fill('black'); textAlign(LEFT, TOP); text(f1(v), x0 + Math.min((v / 12) * w + 6, w - 40), by + 1);
  } else {
    noStroke(); fill('dimgray'); text('?', x0 + 8, by + 1);
  }
  drawMessage(x0, 262, w, 130);
}

function drawExplore(x0, w) {
  const m = calcModel();
  const out = curOut(), sup = curSup();
  const lim = carnot(out, sup);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD);
  text('Carnot limit ' + f1(lim) + '      COP used ' + f1(m.cop), x0, 46);
  textStyle(NORMAL);

  // COP bar: filled = COP used, navy marker = Carnot limit, orange tick = NEEP minimum
  const by = 92, scale = 12;
  const sx = v => x0 + (Math.min(v, scale) / scale) * w;
  stroke('gray'); fill('white'); rect(x0, by, w, 22);
  noStroke(); fill('steelblue'); rect(x0 + 1, by + 1, Math.max(1, sx(m.cop) - x0 - 2), 20);
  stroke('navy'); strokeWeight(3); line(sx(lim), by - 5, sx(lim), by + 27); strokeWeight(1);
  noStroke(); fill('navy'); textAlign(CENTER, BOTTOM); textSize(14);
  text('Carnot ' + f1(lim), constrain(sx(lim), x0 + 30, x0 + w - 30), by - 6);
  stroke('darkorange'); strokeWeight(3); line(sx(NEEP_COP), by + 2, sx(NEEP_COP), by + 20); strokeWeight(1);
  noStroke(); fill('darkorange'); textAlign(LEFT, TOP);
  text('NEEP minimum 1.75 at 5°F', x0, by + 30);
  fill('dimgray'); textAlign(RIGHT, TOP); text('COP 12', x0 + w, by + 30);
  textSize(defaultTextSize);

  // cost bars for 100,000 Btu
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD); text('Cost to deliver 100,000 Btu', x0, 150); textStyle(NORMAL);
  const rows = [
    { name: 'Heat pump', sub: f1(m.kwh) + ' kWh', cost: m.hp, col: 'seagreen' },
    { name: 'Gas furnace', sub: nf(m.therms, 1, 2) + ' therms', cost: m.furnace, col: 'darkorange' },
    { name: 'Electric resistance', sub: f1(m.resKwh) + ' kWh', cost: m.resist, col: 'firebrick' }
  ];
  const labW = 135, valW = 60;
  const barX = x0 + labW, barW = Math.max(60, w - labW - valW);
  const maxC = Math.max(5, ...rows.map(r => r.cost)) * 1.0;
  rows.forEach((r, i) => {
    const ry = 176 + i * 42;
    noStroke(); fill('black'); textAlign(LEFT, TOP); text(r.name, x0, ry);
    fill('dimgray'); textSize(14); text(r.sub, x0, ry + 19); textSize(defaultTextSize);
    stroke('gray'); fill('white'); rect(barX, ry + 2, barW, 24);
    noStroke(); fill(r.col); rect(barX + 1, ry + 3, Math.max(1, (r.cost / maxC) * barW - 2), 22);
    fill('black'); textAlign(LEFT, TOP); textStyle(BOLD); text(usd(r.cost), barX + barW + 8, ry + 4); textStyle(NORMAL);
  });

  // break-even readout
  const cheaper = m.g > m.breakeven ? 'The heat pump is cheaper than the furnace.' : 'The furnace is cheaper than the heat pump.';
  fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD); text('Break-even gas price: ' + usd(m.breakeven) + ' per therm', x0, 306); textStyle(NORMAL);
  text('Gas is ' + usd(m.g) + '. ' + cheaper, x0, 328, w, 40);
  fill('dimgray'); textSize(14);
  text('Prices and the fraction of Carnot are illustrative.', x0, 372);
  textSize(defaultTextSize);
}

function drawMessage(x, y, w, h) {
  const fills = { info: 'white', good: 'honeydew', bad: 'mistyrose' };
  const edges = { info: 'silver', good: 'seagreen', bad: 'firebrick' };
  stroke(edges[msgKind]); fill(fills[msgKind]);
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  text(msg || 'Convert both temperatures to kelvin, then apply the formula. Type your answer and press Check.', x + 8, y + 6, w - 16, h - 8);
}

// ---- Control labels and layout ----
function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  const y0 = drawHeight;
  if (phase <= 3) {
    text('Carnot limit:', 10, y0 + 17);
    fill('dimgray');
    text('The sliders unlock after the fourth challenge.', 10, y0 + 60);
  } else {
    text('COP source:', 10, y0 + 17);
    text('Outdoor: ' + outSlider.value() + '°F', 10, y0 + 52);
    text('Supply: ' + supSlider.value() + '°F', 10, y0 + 87);
    text('Fraction of Carnot: ' + nf(fracSlider.value(), 1, 2), 10, y0 + 122);
    text('Electricity: $' + nf(elecSlider.value(), 1, 2) + '/kWh', 10, y0 + 157);
    text('Gas: $' + nf(gasSlider.value(), 1, 2) + '/therm', 10, y0 + 192);
  }
}

function positionControls() {
  const y0 = drawHeight;
  ansInput.position(105, y0 + 5);
  checkButton.position(190, y0 + 5);
  nextButton.position(255, y0 + 5);
  if (phase > 3) {
    sourceSel.position(110, y0 + 5);
    nextButton.position(Math.min(420, canvasWidth - 150), y0 + 5);
  }
  const sliders = [outSlider, supSlider, fracSlider, elecSlider, gasSlider];
  sliders.forEach((s, i) => { s.position(sliderLeftMargin, y0 + 40 + i * 35); s.size(Math.max(100, canvasWidth - sliderLeftMargin - margin)); });
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
