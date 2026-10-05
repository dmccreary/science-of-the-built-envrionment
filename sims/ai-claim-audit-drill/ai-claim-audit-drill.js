// AI Claim Audit Drill MicroSim - judge ten AI-written technical statements as correct or incorrect against Appendices A to H
// CANVAS_HEIGHT: 480
// Bloom Level 5 (Evaluate): judge a claim against criteria (physics, worked examples, facts)
// MicroSim template version 2026.03

let canvasWidth = 400;
let drawHeight = 390;
let controlHeight = 90; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// ---- Synthetic statements written for this exercise from the appendices ----
const APPX = {
  A: { slug: 'heat-pumps-electrification', name: 'Appendix A' },
  B: { slug: 'heat-recovery-ventilation', name: 'Appendix B' },
  C: { slug: 'solar-photovoltaics', name: 'Appendix C' },
  D: { slug: 'battery-storage', name: 'Appendix D' },
  E: { slug: 'geothermal-ground-source', name: 'Appendix E' },
  F: { slug: 'smart-sensors-building-automation', name: 'Appendix F' },
  H: { slug: 'codes-performance-standards', name: 'Appendix H' }
};
const STATEMENTS = [
  { s: 'A heat pump with a COP of 3 delivers 3 kWh of heat for every 1 kWh of electricity it uses.', verdict: 'Accept', ap: 'A',
    why: 'COP is the heat delivered divided by the electricity used.', check: 'Appendix A, definition of COP' },
  { s: 'No real heat pump can have a COP above 1, because that would create energy.', verdict: 'Reject', ap: 'A',
    why: 'A heat pump moves heat from a source, so the extra heat comes from the source and no energy is created.', check: 'Appendix A, "The Physics That Does Not Change"' },
  { s: 'A battery with 13.5 kWh of usable energy and a 5 kW inverter can run a 5 kW load for 13.5 hours.', verdict: 'Reject', ap: 'D',
    why: '13.5 kWh / 5 kW = 2.7 hours. Hours are energy divided by power.', check: 'Appendix D, worked example' },
  { s: 'A balanced HRV with effectiveness 0.80 supplies 56°F air when it is 0°F outdoors and 70°F indoors.', verdict: 'Accept', ap: 'B',
    why: 'Supply = 0 + 0.80 x (70 - 0) = 56°F.', check: 'Appendix B, worked example' },
  { s: 'R-410A is required for all new residential heat pumps manufactured after January 1, 2025.', verdict: 'Reject', ap: 'A',
    why: 'From that date EPA\'s rule limits new residential equipment to refrigerants with a global warming potential below 700, and R-410A\'s is about 2,088.', check: 'Appendix A, refrigerants' },
  { s: 'A 7 kW solar array in Minneapolis typically produces about 88,000 kWh per year.', verdict: 'Reject', ap: 'C',
    why: 'The array produces about 8,800 kWh. The statement is off by a factor of ten.', check: 'Appendix C, worked example' },
  { s: 'Model energy codes such as the IECC are revised about every three years.', verdict: 'Accept', ap: 'H',
    why: 'The IECC and ASHRAE 90.1 are each updated roughly every three years.', check: 'Appendix H, "How Codes Change"' },
  { s: 'Soil at a depth of 10 feet is exactly 55°F everywhere in the United States.', verdict: 'Reject', ap: 'E',
    why: 'Steady ground temperature ranges from about 45°F to 75°F by climate zone, and in the Twin Cities it is in the mid-40s to low 50s.', check: 'Appendix E, opening section' },
  { s: 'At 1,000 ppm indoors and 420 ppm outdoors, a room needs about 18 cfm of outdoor air per resting person.', verdict: 'Accept', ap: 'F',
    why: '0.0106 x 1,000,000 / (1,000 - 420) is about 18 cfm.', check: 'Appendix F, worked example' },
  { s: 'Because soil is clean, an earth tube cannot grow mold.', verdict: 'Reject', ap: 'E',
    why: 'Cool soil can chill humid summer air below its dew point, and the condensate can feed mold.', check: 'Appendix E, earth tube warning' }
];
const N = STATEMENTS.length;

// ---- State ----
let idx = 0;                           // current statement
let choices = new Array(N).fill(null); // 'Accept' | 'Reject' | null
let mode = 'drill';                    // drill | final | review
let reviewIdx = -1;

// ---- Controls ----
let acceptBtn, rejectBtn, nextBtn, reviewSel, srcLink;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  acceptBtn = createButton('Accept');
  acceptBtn.mousePressed(() => choose('Accept'));
  rejectBtn = createButton('Reject');
  rejectBtn.mousePressed(() => choose('Reject'));
  nextBtn = createButton('Next statement');
  nextBtn.mousePressed(nextStep);
  reviewSel = createSelect();
  reviewSel.changed(openReview);
  reviewSel.attribute('aria-label', 'Reopen a statement judged wrongly');
  srcLink = createA('#', '', '_blank');

  describe('A drill with ten technical statements, each labeled as written by an AI assistant. For each statement the learner chooses Accept or Reject, then sees whether the choice was correct, the reason, and which appendix to check. Ten progress dots show correct and incorrect judgments, and a final screen lists the statements judged wrongly.', LABEL);

  showStatement(0);
  positionControls();
}

// ---- Flow ----
function score() { return choices.reduce((n, c, i) => n + (c === STATEMENTS[i].verdict ? 1 : 0), 0); }
function answered() { return choices.filter(c => c !== null).length; }
function wrongList() { return choices.map((c, i) => (c !== null && c !== STATEMENTS[i].verdict) ? i : -1).filter(i => i >= 0); }

function showStatement(i) {
  mode = 'drill'; idx = i; reviewIdx = -1;
  updateControlState();
}

function choose(c) {
  if (mode !== 'drill' || choices[idx] !== null) return;
  choices[idx] = c;
  updateControlState();
}

function nextStep() {
  if (mode === 'review') { mode = 'final'; reviewIdx = -1; updateControlState(); return; }
  if (mode === 'final') { choices = new Array(N).fill(null); showStatement(0); return; }
  if (choices[idx] === null) return;
  if (idx < N - 1) showStatement(idx + 1); else { mode = 'final'; fillReviewMenu(); updateControlState(); }
}

function fillReviewMenu() {
  reviewSel.elt.innerHTML = '';
  reviewSel.option('Reopen a missed statement...');
  wrongList().forEach(i => reviewSel.option('Statement ' + (i + 1)));
  reviewSel.selected('Reopen a missed statement...');
}
function openReview() {
  const v = reviewSel.value();
  if (!v.startsWith('Statement ')) return;
  reviewIdx = parseInt(v.slice(10), 10) - 1;
  mode = 'review';
  updateControlState();
}

function setEnabled(el, on) { el.elt.disabled = !on; }

function updateControlState() {
  const drill = mode === 'drill';
  const done = drill && choices[idx] !== null;
  acceptBtn.elt.style.display = drill ? '' : 'none';
  rejectBtn.elt.style.display = drill ? '' : 'none';
  setEnabled(acceptBtn, drill && !done); setEnabled(rejectBtn, drill && !done);
  nextBtn.elt.style.display = (drill && !done) ? 'none' : '';
  nextBtn.html(drill ? (idx < N - 1 ? 'Next statement' : 'See my score') : mode === 'review' ? 'Back to score' : 'Restart drill');
  reviewSel.elt.style.display = (mode === 'final' && wrongList().length > 0) ? '' : 'none';
  const showLink = (drill && done) || mode === 'review';
  srcLink.elt.style.display = showLink ? '' : 'none';
  if (showLink) {
    const st = STATEMENTS[mode === 'review' ? reviewIdx : idx];
    srcLink.attribute('href', '../../appendices/' + APPX[st.ap].slug + '/');
    srcLink.html('Open ' + APPX[st.ap].name + ' to check');
  }
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
  text('AI Claim Audit Drill', canvasWidth / 2, 8);
  textSize(defaultTextSize);

  drawProgress();
  if (mode === 'final') drawFinal();
  else drawStatementView(mode === 'review' ? reviewIdx : idx);
  noStroke(); fill('dimgray'); textSize(14); textAlign(CENTER, TOP);
  text('These statements are synthetic, written for this exercise from the appendices.', canvasWidth / 2, drawHeight - 22);
  textSize(defaultTextSize);
  drawControlLabels();
}

function drawProgress() {
  const gap = Math.min(46, (canvasWidth - 30) / N);
  const x0 = canvasWidth / 2 - (gap * (N - 1)) / 2;
  for (let i = 0; i < N; i++) {
    const c = choices[i];
    const cx = x0 + i * gap, cy = 52;
    stroke(mode === 'drill' && i === idx ? 'navy' : 'gray'); strokeWeight(mode === 'drill' && i === idx ? 3 : 1);
    fill(c === null ? 'white' : c === STATEMENTS[i].verdict ? 'seagreen' : 'firebrick');
    circle(cx, cy, 24);
    strokeWeight(1);
    noStroke(); fill(c === null ? 'dimgray' : 'white'); textAlign(CENTER, CENTER); textSize(14);
    text(i + 1, cx, cy); textSize(defaultTextSize);
  }
}

function drawStatementView(i) {
  const st = STATEMENTS[i];
  const done = mode === 'review' || choices[i] !== null;
  // statement card
  stroke('gray'); fill('white'); rect(15, 78, canvasWidth - 30, 108, 8);
  noStroke(); fill('navy'); textAlign(LEFT, TOP); textSize(14); textStyle(BOLD);
  text('Statement ' + (i + 1) + ' of ' + N + '  •  Written by an AI assistant', 28, 86);
  textStyle(NORMAL); fill('black'); textSize(20);
  text('“' + st.s + '”', 28, 108, canvasWidth - 56, 76);
  textSize(defaultTextSize);

  if (!done) {
    noStroke(); fill('black'); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Accept or reject?', 15, 198); textStyle(NORMAL);
    fill('dimgray');
    text('Judge it against the physics and facts in the appendices. Confident wording is not evidence.', 15, 222, canvasWidth - 30, 60);
    return;
  }
  const mine = mode === 'review' ? choices[i] : choices[i];
  const ok = mine === st.verdict;
  stroke(ok ? 'seagreen' : 'firebrick'); fill(ok ? 'honeydew' : 'mistyrose');
  rect(15, 196, canvasWidth - 30, 160, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD); text((ok ? 'Correct: ' : 'Not quite: ') + 'you chose ' + mine + '; the verdict is ' + st.verdict + '.', 28, 204); textStyle(NORMAL);
  const lines = Math.max(1, Math.ceil(textWidth(st.why) / (canvasWidth - 60)));
  text(st.why, 28, 230, canvasWidth - 56, lines * 22 + 4);
  fill('navy'); text('Check: ' + st.check, 28, 230 + lines * 22 + 14, canvasWidth - 56, 36);
}

function drawFinal() {
  const sc = score(), wrong = wrongList();
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textStyle(BOLD); textSize(20);
  text('Final score: ' + sc + ' of ' + N, 15, 86);
  textSize(defaultTextSize);
  fill(sc >= 8 ? 'seagreen' : 'firebrick');
  text(sc >= 8 ? 'Mastery reached (8 of 10 needed).' : 'Mastery needs 8 of 10. Reopen the missed ones, then restart.', 15, 114);
  textStyle(NORMAL); fill('black');
  if (!wrong.length) { text('You judged every statement correctly. Notice that four of them (3, 4, 6 and 9) could be checked with a one-line calculation.', 15, 146, canvasWidth - 30, 60); return; }
  textStyle(BOLD); text('Statements judged wrongly, and where to check them:', 15, 144); textStyle(NORMAL);
  if (wrong.length <= 4) {
    // few misses: show each statement (one line) above its Check source
    wrong.forEach((i, k) => {
      const y = 170 + k * 48;
      fill('firebrick'); text('Statement ' + (i + 1) + ':', 15, y);
      fill('black'); text(fitText(STATEMENTS[i].s, canvasWidth - 140), 120, y);
      fill('navy'); text('Check: ' + STATEMENTS[i].check, 120, y + 24);
    });
  } else {
    wrong.slice(0, 8).forEach((i, k) => {
      fill('firebrick'); text('Statement ' + (i + 1) + ':', 15, 170 + k * 22);
      fill('navy'); text(STATEMENTS[i].check, 120, 170 + k * 22, canvasWidth - 135, 22);
    });
  }
}

// shorten a string with an ellipsis so it fits on one line of the given width
function fitText(str, w) {
  if (textWidth(str) <= w) return str;
  let t = str;
  while (t.length > 1 && textWidth(t + '\u2026') > w) t = t.slice(0, -1);
  return t.trim() + '\u2026';
}

// ---- Control labels and layout ----
function drawControlLabels() {
  noStroke(); fill('black'); textAlign(RIGHT, CENTER);
  const y0 = drawHeight;
  text(answered() + ' of ' + N + ' judged     Correct: ' + score() + ' of ' + N, canvasWidth - 15, y0 + 52);
}

function positionControls() {
  const y0 = drawHeight;
  acceptBtn.position(15, y0 + 8);
  rejectBtn.position(95, y0 + 8);
  nextBtn.position(mode === 'drill' ? 190 : 15, y0 + 8);
  reviewSel.position(150, y0 + 8);
  srcLink.position(15, y0 + 44);
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
