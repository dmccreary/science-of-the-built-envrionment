// Code Editions and Building Life Explorer MicroSim - editions = floor(life / 3); replacements = ceil(life / component life) - 1
// CANVAS_HEIGHT: 490
// Bloom Level 3 (Apply): calculate editions published and component replacements over a building's service life
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 410;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

const EDITION_YEARS = 3;
const SCALE_YEARS = 100;   // fixed timeline scale so a change in life is visible
const COMPONENTS = [       // illustrative planning values
  { name: 'Structural frame', life: 100 },
  { name: 'Insulation and air barrier', life: 60 },
  { name: 'Windows', life: 30 },
  { name: 'Roof membrane', life: 25 },
  { name: 'Heat pump', life: 18 },
  { name: 'Water heater', life: 12 }
];
const CHALLENGES = [
  { life: 60, kind: 'editions', q: 'How many new code editions will be published while this building stands?',
    hint: 'Divide the building\'s service life by the 3 years between editions.',
    why: '60 years / 3 years per edition = 20 editions.', rows: [] },
  { life: 60, kind: 'replace', comp: 3, q: 'The building stands 60 years. How many times is the roof membrane replaced?',
    hint: 'Replacements fall at multiples of the component\'s life. Count the multiples of 25 years that come before year 60.',
    why: 'The roof lasts 25 years: it is replaced at year 25 and year 50, and 60 years ends before a third replacement. That is ceil(60 / 25) - 1 = 2.', rows: [3] },
  { life: 75, kind: 'replace', comp: 4, q: 'Now the building stands 75 years. How many times is the heat pump replaced?',
    hint: 'Count the multiples of 18 years that come before year 75.',
    why: 'The heat pump lasts 18 years: replacements fall at years 18, 36, 54 and 72. That is ceil(75 / 18) - 1 = 4.', rows: [4] }
];

// ---- Model ----
function editions(life) { return Math.floor(life / EDITION_YEARS); }
function replacements(life, compLife) { return Math.max(0, Math.ceil(life / compLife) - 1); }
CHALLENGES.forEach(c => { c.answer = c.kind === 'editions' ? editions(c.life) : replacements(c.life, COMPONENTS[c.comp].life); });

// ---- State ----
let phase = 0;                 // 0..2 challenge, 3 exploration
let attempts = [0, 0, 0];
let outcome = ['open', 'open', 'open'];
let revealed = false;
let msg = '', msgKind = 'info';

let ansInput, checkButton, nextButton, lifeSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ansInput = createInput('', 'text');
  ansInput.attribute('inputmode', 'numeric');
  ansInput.attribute('aria-label', 'Whole-number answer');
  ansInput.size(60);
  ansInput.elt.addEventListener('keydown', e => { if (e.key === 'Enter') checkAnswer(); });
  checkButton = createButton('Check');
  checkButton.mousePressed(checkAnswer);
  nextButton = createButton('Next challenge');
  nextButton.mousePressed(nextStep);
  lifeSlider = createSlider(30, 100, 60, 5);

  describe('A timeline of a building from year 0 to its service life. A top row marks a new code edition every 3 years. Six rows show building components: structural frame, insulation and air barrier, windows, roof membrane, heat pump, and water heater, each with its service life, with diamonds where the component is replaced. Components never replaced are marked as staying for the whole life.', LABEL);

  startChallenge(0);
  positionControls();
}

function life() { return lifeSlider.value(); }

// ---- Flow ----
function startChallenge(i) {
  phase = i;
  lifeSlider.value(CHALLENGES[i].life);
  lifeSlider.elt.disabled = true;
  ansInput.value('');
  revealed = false; msg = ''; msgKind = 'info';
  nextButton.html(i < 2 ? 'Next challenge' : 'Unlock slider');
  updateControlState();
}

function startExplore() {
  phase = 3;
  lifeSlider.value(60);
  lifeSlider.elt.disabled = false;
  revealed = true;
  nextButton.html('Restart challenges');
  msg = 'Raise the life to 100 years and watch the insulation and air barrier get replaced once. Which parts stay for the whole life at 60 years?';
  msgKind = 'info';
  updateControlState();
}

function nextStep() {
  if (phase === 3) { attempts = [0, 0, 0]; outcome = ['open', 'open', 'open']; startChallenge(0); return; }
  if (outcome[phase] === 'open') return;
  if (phase < 2) startChallenge(phase + 1); else startExplore();
}

function checkAnswer() {
  if (phase > 2 || outcome[phase] !== 'open') return;
  const c = CHALLENGES[phase];
  const raw = String(ansInput.value()).trim();
  if (!/^\d+$/.test(raw)) { msg = 'Type a whole number, then press Check.'; msgKind = 'bad'; return; }
  attempts[phase]++;
  if (parseInt(raw, 10) === c.answer) {
    outcome[phase] = 'correct'; revealed = true;
    msg = 'Correct: ' + c.answer + '.'; msgKind = 'good';
  } else if (attempts[phase] >= 2) {
    outcome[phase] = 'missed'; revealed = true;
    msg = 'Not this time: ' + c.answer + '. ' + c.why; msgKind = 'bad';
  } else {
    msg = 'Not quite. ' + c.hint + ' Try once more.'; msgKind = 'bad';
  }
  updateControlState();
}

function updateControlState() {
  const open = phase <= 2 && outcome[phase] === 'open';
  ansInput.elt.disabled = !open; checkButton.elt.disabled = !open;
  nextButton.elt.disabled = phase <= 2 && open;
  if (phase === 3) { ansInput.hide(); checkButton.hide(); } else { ansInput.show(); checkButton.show(); }
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
  text('Code Editions and Building Life Explorer', canvasWidth / 2, 8);
  textSize(defaultTextSize);

  drawTimeline();
  drawMessage(15, 322, canvasWidth - 30, 82);
  drawControlLabels();
}

function drawTimeline() {
  const labW = 212, rightW = 105;
  const x0 = labW, tlW = canvasWidth - labW - rightW;
  const X = yr => x0 + (yr / SCALE_YEARS) * tlW;
  const L = life();
  const c = phase <= 2 ? CHALLENGES[phase] : null;

  // axis (years)
  stroke('gray'); line(x0, 56, x0 + tlW, 56);
  noStroke(); fill('dimgray'); textSize(14); textAlign(CENTER, BOTTOM);
  for (let y = 0; y <= SCALE_YEARS; y += 10) { stroke('gray'); line(X(y), 56, X(y), 60); noStroke(); text(y, X(y), 54); }
  textAlign(LEFT, BOTTOM); text('years', x0 + tlW + 18, 54);
  textSize(defaultTextSize);

  // years beyond the building's life are shaded
  noStroke(); fill('gainsboro');
  rect(X(L), 62, X(SCALE_YEARS) - X(L), 238);

  // edition row
  const showEd = revealed && (phase === 3 || c.kind === 'editions');
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  textStyle(BOLD); text('Code editions', 15, 76); textStyle(NORMAL);
  fill('dimgray'); textSize(14); text('a new one every 3 years', 15, 93); textSize(defaultTextSize);
  stroke('silver'); fill('white'); rect(x0, 64, X(L) - x0, 32);
  if (showEd) {
    stroke('navy'); strokeWeight(2);
    for (let y = EDITION_YEARS; y <= L; y += EDITION_YEARS) line(X(y), 68, X(y), 92);
    strokeWeight(1);
    noStroke(); fill('navy'); textStyle(BOLD); textAlign(LEFT, CENTER);
    text(editions(L) + ' editions', x0 + tlW + 6, 80); textStyle(NORMAL);
  } else if (phase <= 2) {
    noStroke(); fill('dimgray'); textAlign(LEFT, CENTER); text('?', X(L) / 2 + x0 / 2, 80);
  }

  // component rows
  COMPONENTS.forEach((cp, i) => {
    const ry = 100 + i * 33;
    const show = revealed && (phase === 3 || c.rows.includes(i));
    noStroke(); fill('black'); textAlign(LEFT, CENTER);
    textStyle(BOLD); text(cp.name, 15, ry + 9); textStyle(NORMAL);
    fill('dimgray'); textSize(14); text(cp.life + '-year service life', 15, ry + 23); textSize(defaultTextSize);
    stroke('silver'); fill('white'); rect(x0, ry, X(L) - x0, 28);
    if (!show) return;
    const n = replacements(L, cp.life);
    // service periods between replacements
    let start = 0, k = 0;
    while (start < L) {
      const end = Math.min(start + cp.life, L);
      stroke('dimgray'); fill(k % 2 === 0 ? 'steelblue' : 'lightsteelblue');
      if (n === 0) fill('seagreen');
      rect(X(start), ry + 3, X(end) - X(start), 22);
      start += cp.life; k++;
    }
    // replacement markers
    for (let m = 1; m <= n; m++) {
      const rx = X(m * cp.life);
      stroke('black'); fill('firebrick');
      quad(rx, ry, rx + 7, ry + 14, rx, ry + 28, rx - 7, ry + 14);
    }
    noStroke(); textAlign(LEFT, CENTER);
    if (n === 0) {
      const t = 'stays for the whole life';
      textSize(14);
      const fits = textWidth(t) + 10 < X(L) - x0;
      if (fits) { fill('white'); textAlign(CENTER, CENTER); text(t, (x0 + X(L)) / 2, ry + 14); }
      else { fill('seagreen'); textAlign(LEFT, CENTER); text(t, X(L) + 6, ry + 14); }
      fill('seagreen'); textStyle(BOLD); textAlign(LEFT, CENTER);
      text('0 replaced', x0 + tlW + 6, ry + 14); textStyle(NORMAL);
      textSize(defaultTextSize);
    } else {
      fill('black'); textStyle(BOLD); textAlign(LEFT, CENTER);
      text(n + ' replaced', x0 + tlW + 6, ry + 14); textStyle(NORMAL);
    }
  });
  if (phase <= 2 && !revealed) {
    noStroke(); fill('dimgray'); textAlign(CENTER, CENTER);
    text('Answer first; the timeline fills in after Check.', x0 + tlW / 2, 190);
  }
  // legend
  noStroke(); fill('dimgray'); textSize(14); textAlign(LEFT, CENTER);
  stroke('black'); fill('firebrick'); quad(15, 309, 22, 301, 29, 309, 22, 317);
  noStroke(); fill('dimgray'); text('replacement', 36, 309);
  stroke('dimgray'); fill('steelblue'); rect(135, 301, 24, 16); noStroke(); fill('dimgray'); text('one service period', 165, 309);
  textAlign(RIGHT, CENTER); text('Service lives are illustrative planning values.', canvasWidth - 15, 309); textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
}

function drawMessage(x, y, w, h) {
  const fills = { info: 'white', good: 'honeydew', bad: 'mistyrose' };
  const edges = { info: 'silver', good: 'seagreen', bad: 'firebrick' };
  stroke(edges[msgKind]); fill(fills[msgKind]);
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  if (phase <= 2) {
    textStyle(BOLD);
    text('Challenge ' + (phase + 1) + ' of 3      Correct: ' + outcome.filter(o => o === 'correct').length + ' of 3', x + 8, y + 4);
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
  text(phase <= 2 ? 'Answer (whole number):' : 'Explore:', 10, y0 + 17);
  text('Building life: ' + lifeSlider.value() + ' years', 10, y0 + 52);
}

function positionControls() {
  const y0 = drawHeight;
  ansInput.position(195, y0 + 5);
  checkButton.position(265, y0 + 5);
  nextButton.position(330, y0 + 5);
  if (phase === 3) nextButton.position(10 + 80, y0 + 5);
  lifeSlider.position(sliderLeftMargin, y0 + 40);
  lifeSlider.size(Math.max(100, canvasWidth - sliderLeftMargin - margin));
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
