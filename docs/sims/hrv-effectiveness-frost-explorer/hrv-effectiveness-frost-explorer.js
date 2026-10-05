// HRV Effectiveness and Frost Explorer MicroSim - supply = outdoor + effectiveness x (indoor - outdoor); load = 1.08 x cfm x dT
// CANVAS_HEIGHT: 560
// Bloom Level 3 (Apply): calculate the supply-air temperature and the heating load removed by a balanced HRV
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 160; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 235;
let defaultTextSize = 16;

const INDOOR = 70;      // F, fixed (illustrative)
const FROST_F = 32;     // exhaust leaving the core at or below this turns the frost indicator on
const Q_FACTOR = 1.08;  // Btu/h per cfm per F (sensible heat rule)

const CHALLENGES = [
  { out: 0, eff: 0.80, cfm: 100, q: 'On a 0°F day, how warm is the air this HRV delivers, and how much heating does it save?' },
  { out: -10, eff: 0.60, cfm: 150, q: 'On a -10°F day this smaller-core unit moves 150 cfm. How warm is the supply air, and how much heating is saved?' }
];
const WRONG_TEXT = 'Supply = outdoor + effectiveness x (indoor - outdoor). Load = 1.08 x cfm x (70 - supply temperature). Load removed = load without HRV minus load with HRV, which equals effectiveness x load without HRV.';

let phase = 0;               // 0..1 challenge, 2 exploration
let attempts = [0, 0];
let outcome = ['open', 'open'];
let revealed = false;
let msg = '';
let msgKind = 'info';

let supplyInput, loadInput, checkButton, nextButton, outSlider, effSlider, cfmSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  supplyInput = createInput('', 'text');
  supplyInput.attribute('inputmode', 'decimal');
  supplyInput.attribute('aria-label', 'Supply temperature in degrees Fahrenheit');
  supplyInput.size(55);
  loadInput = createInput('', 'text');
  loadInput.attribute('inputmode', 'decimal');
  loadInput.attribute('aria-label', 'Heating load removed in Btu per hour');
  loadInput.size(80);
  [supplyInput, loadInput].forEach(i => i.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); }));
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next challenge');
  nextButton.mousePressed(nextStep);

  outSlider = createSlider(-20, 60, 0, 5);
  effSlider = createSlider(0.50, 0.90, 0.80, 0.05);
  cfmSlider = createSlider(50, 200, 100, 25);

  describe('A heat recovery ventilator drawn as a core with a cold outdoor stream warming as it passes through, and a warm return stream cooling as it leaves. Labels give the temperature at each of the four ports. Two bars compare the ventilation heating load with and without the recovery core. A frost indicator turns on when the exhaust leaving the core is at or below 32 degrees Fahrenheit.', LABEL);

  startChallenge(0);
  positionControls();
}

// ---- Model ----
function calc() {
  const out = outSlider.value(), e = effSlider.value(), cfm = cfmSlider.value();
  const supply = out + e * (INDOOR - out);
  const exhaust = INDOOR - e * (INDOOR - out);
  const loadNo = Q_FACTOR * cfm * (INDOOR - out);
  const loadWith = Q_FACTOR * cfm * (INDOOR - supply);
  return { out, e, cfm, supply, exhaust, loadNo, loadWith, removed: loadNo - loadWith, frost: exhaust <= FROST_F, frostOut: INDOOR - (INDOOR - FROST_F) / e };
}
const fmtN = v => Math.round(v).toLocaleString('en-US');

// ---- Flow ----
function startChallenge(i) {
  phase = i;
  const c = CHALLENGES[i];
  outSlider.value(c.out); effSlider.value(c.eff); cfmSlider.value(c.cfm);
  [outSlider, effSlider, cfmSlider].forEach(s => { s.elt.disabled = true; });
  supplyInput.value(''); loadInput.value('');
  supplyInput.show(); loadInput.show(); checkButton.show();
  revealed = false; msg = ''; msgKind = 'info';
  nextButton.html(i < 1 ? 'Next challenge' : 'Unlock sliders');
  updateControlState();
}

function startExplore() {
  phase = 2;
  outSlider.value(0); effSlider.value(0.80); cfmSlider.value(100);
  [outSlider, effSlider, cfmSlider].forEach(s => { s.elt.disabled = false; });
  supplyInput.hide(); loadInput.hide(); checkButton.hide();
  revealed = true;
  nextButton.html('Restart challenges');
  updateControlState();
}

function nextStep() {
  if (phase === 2) { attempts = [0, 0]; outcome = ['open', 'open']; startChallenge(0); return; }
  if (outcome[phase] === 'open') return;
  if (phase < 1) startChallenge(phase + 1); else startExplore();
}

function checkAnswer() {
  if (phase > 1 || outcome[phase] !== 'open') return;
  const s = parseFloat(String(supplyInput.value()).replace(',', ''));
  const l = parseFloat(String(loadInput.value()).replace(',', ''));
  if (isNaN(s) || isNaN(l)) { msg = 'Type both numbers (supply temperature in °F and load removed in Btu/h), then press Check.'; msgKind = 'bad'; return; }
  const m = calc();
  attempts[phase]++;
  revealed = true;
  const vals = 'supply ' + Math.round(m.supply) + '°F, load removed ' + fmtN(m.removed) + ' Btu/h';
  if (Math.abs(s - m.supply) <= 1 && Math.abs(l - m.removed) <= 100) {
    outcome[phase] = 'correct';
    msg = 'Correct: ' + vals + '.';
    msgKind = 'good';
  } else if (attempts[phase] >= 2) {
    outcome[phase] = 'missed';
    msg = 'Not this time: ' + vals + '. ' + WRONG_TEXT;
    msgKind = 'bad';
  } else {
    msg = WRONG_TEXT + ' Try once more.';
    msgKind = 'bad';
  }
  updateControlState();
}

function updateControlState() {
  const open = phase <= 1 && outcome[phase] === 'open';
  supplyInput.elt.disabled = !open;
  loadInput.elt.disabled = !open;
  checkButton.elt.disabled = !open;
  nextButton.elt.disabled = phase <= 1 && open;
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
  text('HRV Effectiveness and Frost Explorer', canvasWidth / 2, 8);
  textSize(defaultTextSize);

  const m = calc();
  drawHrv(m);
  drawLoads(m);
  if (phase <= 1) {
    noStroke(); fill('black'); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Challenge ' + (phase + 1) + ' of 2      Correct: ' + outcome.filter(o => o === 'correct').length + ' of 2', 15, 44);
    textStyle(NORMAL);
    drawMessage(15, 326, canvasWidth - 30, 66, m);
  } else {
    drawFrostPanel(15, 326, canvasWidth - 30, 66, m);
  }
  drawControlLabels();
}

// lerpColor segments along a straight stream
function gradientLine(x1, y1, x2, y2, c1, c2) {
  const n = 24;
  strokeWeight(7); strokeCap(SQUARE);
  for (let i = 0; i < n; i++) {
    stroke(lerpColor(color(c1), color(c2), i / (n - 1)));
    line(lerp(x1, x2, i / n), lerp(y1, y2, i / n), lerp(x1, x2, (i + 1) / n), lerp(y1, y2, (i + 1) / n));
  }
  strokeWeight(1);
}

function arrowHead(x, y, dir, col) {
  noStroke(); fill(col);
  triangle(x, y, x - dir * 12, y - 7, x - dir * 12, y + 7);
}

function portLabel(name, temp, x, y, al, col) {
  noStroke(); textAlign(al, TOP);
  fill('dimgray'); textSize(14); text(name, x, y);
  textSize(defaultTextSize); fill(col); textStyle(BOLD); text(temp, x, y + 17); textStyle(NORMAL);
}

function drawHrv(m) {
  const cx = canvasWidth / 2, cw = 150, cy = 80, ch = 108;
  const x1 = cx - cw / 2, x2 = cx + cw / 2;
  const yTop = cy + 26, yBot = cy + 84;
  // core body
  stroke('gray'); fill(m.frost && phase === 2 ? 'lightcyan' : 'lightyellow');
  rect(x1, cy, cw, ch, 6);
  // outdoor stream warms as it passes through; return stream cools
  const supCol = revealedOrKnown('supply') ? lerpColor(color('royalblue'), color('darkorange'), constrain((m.supply + 20) / 90, 0, 1)) : color('lightsteelblue');
  gradientLine(15, yTop, x1, yTop, 'royalblue', 'royalblue');
  gradientLine(x1, yTop, x2, yTop, 'royalblue', supCol);
  gradientLine(x2, yTop, canvasWidth - 28, yTop, supCol, supCol);
  arrowHead(canvasWidth - 15, yTop, 1, supCol);
  const exCol = revealedOrKnown('exhaust') ? lerpColor(color('royalblue'), color('firebrick'), constrain((m.exhaust + 20) / 90, 0, 1)) : color('lightsteelblue');
  gradientLine(canvasWidth - 15, yBot, x2, yBot, 'firebrick', 'firebrick');
  gradientLine(x2, yBot, x1, yBot, 'firebrick', exCol);
  gradientLine(x1, yBot, 28, yBot, exCol, exCol);
  arrowHead(15, yBot, -1, exCol);
  // heat crossing the core (warm stream to cold stream)
  stroke('dimgray'); strokeWeight(2);
  for (let i = 1; i <= 3; i++) {
    const hx = x1 + (cw * i) / 4;
    line(hx, yBot - 8, hx, yTop + 10);
    noStroke(); fill('dimgray'); triangle(hx, yTop + 6, hx - 5, yTop + 15, hx + 5, yTop + 15); stroke('dimgray');
  }
  strokeWeight(1);
  noStroke(); fill('black'); textAlign(CENTER, CENTER); textSize(14);
  text('Core: ' + nf(m.e, 1, 2), cx, cy + 12);
  text('heat crosses, air does not mix', cx, cy + ch - 10);
  textSize(defaultTextSize);

  // port labels
  portLabel('Outdoor air in', m.out + '°F', 15, yTop - 44, LEFT, 'royalblue');
  portLabel('Supply to rooms', revealedOrKnown('supply') ? Math.round(m.supply) + '°F' : '?', canvasWidth - 15, yTop - 44, RIGHT, 'darkorange');
  portLabel('Return from rooms', INDOOR + '°F', canvasWidth - 15, yBot + 10, RIGHT, 'firebrick');
  portLabel('Exhaust out', revealedOrKnown('exhaust') ? Math.round(m.exhaust) + '°F' : '?', 15, yBot + 10, LEFT, m.frost && phase === 2 ? 'steelblue' : 'dimgray');
  fill('dimgray'); textSize(14); textAlign(LEFT, TOP);
}

// In a challenge the answers stay hidden until Check; in exploration everything is shown
function revealedOrKnown() { return phase === 2 || revealed; }

function drawLoads(m) {
  const x = 15, w = canvasWidth - 30, y = 226;
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD); text('Heating load of the ventilation air  (Q = 1.08 × cfm × ΔT at ' + m.cfm + ' cfm)', x, y); textStyle(NORMAL);
  const labW = 105, valW = 90, barX = x + labW, barW = w - labW - valW, maxL = 18000;
  const rows = [
    { name: 'Without HRV', v: m.loadNo, col: 'firebrick' },
    { name: 'With HRV', v: m.loadWith, col: 'seagreen' }
  ];
  rows.forEach((r, i) => {
    const ry = y + 26 + i * 28;
    noStroke(); fill('black'); textAlign(LEFT, TOP); text(r.name, x, ry + 2);
    stroke('gray'); fill('white'); rect(barX, ry, barW, 22);
    if (revealedOrKnown()) {
      noStroke(); fill(r.col); rect(barX + 1, ry + 1, Math.max(1, (r.v / maxL) * barW - 2), 20);
      fill('black'); textAlign(LEFT, TOP); text(fmtN(r.v), barX + barW + 6, ry + 2);
    } else {
      noStroke(); fill('dimgray'); text('?', barX + 8, ry + 2);
    }
  });
  noStroke(); textAlign(LEFT, TOP);
  if (revealedOrKnown()) {
    fill('seagreen'); textStyle(BOLD);
    text('Load removed: ' + fmtN(m.removed) + ' Btu/h  (' + Math.round(m.e * 100) + '% of the load)', x, y + 84);
    textStyle(NORMAL);
  } else {
    fill('dimgray'); text('Bars appear after Check. Btu/h, scale 0 to 18,000.', x, y + 84);
  }
}

function drawMessage(x, y, w, h) {
  const fills = { info: 'white', good: 'honeydew', bad: 'mistyrose' };
  const edges = { info: 'silver', good: 'seagreen', bad: 'firebrick' };
  stroke(edges[msgKind]); fill(fills[msgKind]);
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  text(msg || CHALLENGES[phase].q, x + 8, y + 5, w - 16, h - 8);
}

function drawFrostPanel(x, y, w, h, m) {
  stroke(m.frost ? 'steelblue' : 'seagreen'); fill(m.frost ? 'lightcyan' : 'honeydew');
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(m.frost ? 'Frost indicator ON: exhaust leaves the core at ' + Math.round(m.exhaust) + '°F' : 'Frost indicator off: exhaust leaves the core at ' + Math.round(m.exhaust) + '°F', x + 8, y + 5);
  textStyle(NORMAL);
  text('At effectiveness ' + nf(m.e, 1, 2) + ', it turns on at outdoor ' + nf(m.frostOut, 1, 1) + '°F or colder. Teaching model: real frost also needs moist exhaust air, and real units defrost.', x + 8, y + 26, w - 16, h - 28);
}

// ---- Control labels and layout ----
function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  const y0 = drawHeight;
  if (phase <= 1) {
    text('Supply (°F):', 10, y0 + 17);
    text('Load removed (Btu/h):', 172, y0 + 17);
  }
  text('Outdoor: ' + outSlider.value() + '°F', 10, y0 + 52);
  text('Effectiveness: ' + nf(effSlider.value(), 1, 2), 10, y0 + 87);
  text('Airflow: ' + cfmSlider.value() + ' cfm', 10, y0 + 122);
}

function positionControls() {
  const y0 = drawHeight;
  supplyInput.position(100, y0 + 5);
  loadInput.position(330, y0 + 5);
  checkButton.position(425, y0 + 5);
  nextButton.position(phase <= 1 ? 490 : 10, y0 + 5);
  if (phase === 2) nextButton.position(10, y0 + 5);
  [outSlider, effSlider, cfmSlider].forEach((s, i) => {
    s.position(sliderLeftMargin, y0 + 40 + i * 35);
    s.size(Math.max(100, canvasWidth - sliderLeftMargin - margin));
  });
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
