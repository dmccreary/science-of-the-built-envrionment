// Delivery Method Explorer MicroSim - compare schedule overlap and contract relationships for four project delivery methods, then pick the method that fits a scenario
// CANVAS_HEIGHT: 550
// Bloom Level 4 (Analyze) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 435;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215; // slider x position; the labels sit to its left
let defaultTextSize = 16;

// ---- Data: the four delivery methods (overlaps and join months are illustrative, anchored to the chapter's 21 and 17 month figures) ----
// startFrac = fraction of design complete when construction starts; contractor/subs = when they join (fraction of design, or 'afterBid')
const methods = {
  DBB: { name: 'Design-bid-build', startFrac: null, bid: true,
    summary: 'Two owner contracts (architect, contractor). The builder joins after design; the lowest bid sets the price.',
    sub: 'Contractor', subtitle: 'low bidder' },
  DB: { name: 'Design-build', startFrac: 0.7, bid: false,
    summary: 'One owner contract with a design-builder. The builder joins at the start; the price is a negotiated lump sum.',
    sub: 'Contractor', subtitle: 'design-builder' },
  CMAR: { name: 'Construction manager at risk', startFrac: 0.8, bid: 'buyout',
    summary: 'Separate contracts with architect and construction manager, who advises early and guarantees a maximum price.',
    sub: 'Contractor', subtitle: 'constr. manager' },
  IPD: { name: 'Integrated project delivery', startFrac: 0.6, bid: false,
    summary: 'One multi-party agreement among owner, architect, contractor, and key trades, who share risk and reward.',
    sub: 'Contractor', subtitle: 'builder' }
};
const methodKeys = ['DBB', 'DB', 'CMAR', 'IPD'];

// Click-for-definition text: two sentences each
const defs = {
  design: { title: 'Design phase', text: 'Design is the phase in which the architect and engineers turn the owner\'s program into drawings and specifications. In faster methods, construction starts before it ends.' },
  bid: { title: 'Bidding phase', text: 'Bidding is the phase in which contractors price the finished documents and the owner awards the contract. Design-build and IPD skip it, and CMAR replaces it with a short buyout of trade packages.' },
  con: { title: 'Construction phase', text: 'Construction is the phase in which the contractor and subcontractors build the project from the documents. Its start month depends on when the method lets the builder begin.' },
  owner: { title: 'Owner', text: 'The owner is the party that pays for the building and decides what it must do. The number of contracts the owner holds changes with the delivery method.' },
  arch: { title: 'Architect', text: 'The architect leads the design team and prepares the drawings and specifications. In design-build the architect works for the design-builder rather than for the owner.' },
  contr: { title: 'Contractor', text: 'The contractor builds the project and manages the subcontractors. The method sets when the contractor joins and how the price is set.' },
  subs: { title: 'Key subcontractors', text: 'Key subcontractors are trades, such as mechanical and electrical, that do major parts of the work under the contractor. In IPD they join at the start and sign the same agreement as the owner.' }
};

// Quiz bank: ans is a key of methods; why names the contract relationship that decides the answer
const scenarios = [
  { q: 'A hospital owner needs the building open before winter and wants one firm responsible for everything.', ans: 'DB', why: 'One contract with a design-builder puts design and construction under one responsible firm.' },
  { q: 'A city must award the work to the lowest responsible bidder on a finished set of drawings.', ans: 'DBB', why: 'The owner holds separate contracts with the architect and with the contractor who wins the bid.' },
  { q: 'An owner wants the contractor\'s cost advice during design, an independent architect, and a price ceiling.', ans: 'CMAR', why: 'Separate contracts with architect and construction manager, who guarantees a maximum price.' },
  { q: 'Owner, architect, contractor, and key trades will share risk and reward under one agreement from day one.', ans: 'IPD', why: 'A single multi-party agreement binds every party to shared risk and reward.' },
  { q: 'A school board wants a firm price before construction begins and an architect independent of the builder.', ans: 'DBB', why: 'Two separate contracts keep the architect independent, and bids give a firm price in advance.' },
  { q: 'An owner with a fixed opening date wants the foundation started while the design is still being finished, under one contract.', ans: 'DB', why: 'One design-builder contract lets early work start while design continues.' },
  { q: 'The team wants the builder to bear the risk of overruns above an agreed ceiling, with the architect under a separate contract.', ans: 'CMAR', why: 'The construction manager\'s guaranteed maximum price puts overrun risk on the builder.' },
  { q: 'A complex laboratory owner wants mechanical and electrical trades to help design from the start and share any savings.', ans: 'IPD', why: 'Key trades sign the same multi-party agreement, so they share risk and reward.' }
];

// ---- State ----
let method = 'DBB';
let cur = null;             // animated values (months): bars and join times
let selectedItem = null;    // clicked bar or box key
let hoverItem = null;
let items = [];             // clickable rectangles
let quizOn = false, qOrder = [], qIdx = 0, solved = false, firstTry = true, wrongPicks = [], feedback = '';
let scoreRight = 0, scoreTotal = 0;
const lanes = [{ key: 'design', label: 'Design', col: 'royalblue' }, { key: 'bid', label: 'Bidding', col: 'gray' }, { key: 'con', label: 'Construction', col: 'darkorange' }];
const AXIS_MONTHS = 30;
const X0 = 96;              // left edge of the timeline
const BOX_W = 150, BOX_H = 33;

// ---- Controls ----
let methodRadio, quizButton, exitButton, designSlider, conSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  methodRadio = createRadio();
  methodKeys.forEach(k => methodRadio.option(k));
  methodRadio.selected('DBB');
  methodRadio.position(6, drawHeight + 6);
  methodRadio.style('width', '235px');
  methodRadio.changed(() => pickMethod(methodRadio.value()));

  quizButton = createButton('Pick the method');
  quizButton.position(246, drawHeight + 5);
  quizButton.mousePressed(quizPressed);
  exitButton = createButton('Exit');
  exitButton.position(369, drawHeight + 5);
  exitButton.mousePressed(exitQuiz);
  exitButton.hide();

  designSlider = createSlider(6, 14, 10, 1);
  designSlider.position(sliderLeftMargin, drawHeight + 44);
  designSlider.size(sliderWidth());
  conSlider = createSlider(6, 14, 10, 1);
  conSlider.position(sliderLeftMargin, drawHeight + 79);
  conSlider.size(sliderWidth());

  shuffleQuiz();
  cur = targetState();
  describe('A project timeline with blue design, gray bidding, and orange construction bars above a diagram of four boxes: Owner, Architect, Contractor, and Key Subcontractors, joined by solid contract lines and dashed communication lines. Four radio buttons choose design-bid-build, design-build, construction manager at risk, or integrated project delivery, and the bars and the Contractor box move to show when construction and the builder start. Two sliders set the months of design and construction. A quiz button describes a project and asks the student to pick the best method.', LABEL);
}

function sliderWidth() { return max(100, canvasWidth - sliderLeftMargin - 15); }

// ---- Schedule model: months, rounded to the nearest half month ----
function half(x) { return round(x * 2) / 2; }
function schedule(key, D, C) {
  const m = methods[key];
  let cStart, bid = null;
  if (m.startFrac === null) { bid = [D, D + 1]; cStart = D + 1; }
  else {
    cStart = half(m.startFrac * D);
    if (m.bid === 'buyout') bid = [cStart - 1, cStart];
  }
  const total = max(D, cStart + C);
  let joinC, joinS;
  if (key === 'DBB') { joinC = D + 1; joinS = D + 1; }
  else if (key === 'DB') { joinC = 0; joinS = half(0.5 * D); }
  else if (key === 'CMAR') { joinC = half(0.3 * D); joinS = cStart - 1; }
  else { joinC = 0; joinS = 0; }
  return { design: [0, D], bid: bid || [D, D], con: [cStart, cStart + C], total, cStart, joinC, joinS };
}
function targetState() { return schedule(method, designSlider.value(), conSlider.value()); }
function dbbTotal() { return designSlider.value() + 1 + conSlider.value(); }

// ease the animated values toward the target (only moves after a control changes)
function easeState() {
  const t = targetState();
  const step = (a, b) => (abs(b - a) < 0.02 ? b : a + (b - a) * 0.22);
  ['design', 'bid', 'con'].forEach(k => { cur[k] = [step(cur[k][0], t[k][0]), step(cur[k][1], t[k][1])]; });
  cur.joinC = step(cur.joinC, t.joinC);
  cur.joinS = step(cur.joinS, t.joinS);
  cur.total = t.total;
  cur.cStart = t.cStart;
}

// ---- Quiz ----
function shuffleQuiz() {
  qOrder = scenarios.map((_, i) => i);
  for (let i = qOrder.length - 1; i > 0; i--) { const j = floor(random(i + 1)); [qOrder[i], qOrder[j]] = [qOrder[j], qOrder[i]]; }
  qIdx = 0;
}
function scenario() { return scenarios[qOrder[qIdx]]; }
function resetQuestion() { solved = false; firstTry = true; wrongPicks = []; feedback = ''; }

function quizPressed() {
  if (!quizOn) {
    quizOn = true;
    resetQuestion();
    selectedItem = null;
    quizButton.html('Next scenario');
    exitButton.show();
  } else {
    qIdx = (qIdx + 1) % qOrder.length;
    resetQuestion();
  }
}
function exitQuiz() {
  quizOn = false;
  quizButton.html('Pick the method');
  exitButton.hide();
}

function pickMethod(k) {
  method = k;
  selectedItem = null;
  if (quizOn && !solved) {
    const s = scenario();
    if (k === s.ans) {
      solved = true;
      scoreTotal++;
      if (firstTry) scoreRight++;
      feedback = (firstTry ? 'Correct on the first try (' : 'Correct (') + k + '). ' + s.why;
    } else {
      firstTry = false;
      if (!wrongPicks.includes(k)) wrongPicks.push(k);
      feedback = 'Not ' + k + ': ' + notWhy(k);
    }
  }
}
// one line naming the contract relationship of a wrong choice
function notWhy(k) {
  return {
    DBB: 'two separate owner contracts, and the builder joins only after design and bidding.',
    DB: 'one contract with a design-builder, so no independent architect.',
    CMAR: 'separate contracts, and the manager guarantees a maximum price.',
    IPD: 'all parties sign one multi-party agreement and share risk and reward.'
  }[k] + ' Try another method.';
}

function draw() {
  updateCanvasSize();
  easeState();

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
  text('Delivery Method Explorer', canvasWidth / 2, 6);

  items = [];
  hoverItem = null;
  drawReadout();
  drawGantt();
  drawParties();
  findHover();
  drawHighlights();
  drawStrip();
  drawControlLabels();
  cursor(hoverItem ? HAND : ARROW);
}

// ---- Readout: total schedule for the selected method ----
function drawReadout() {
  const t = cur;
  const total = nf(t.total, 0, t.total % 1 ? 1 : 0);
  const saved = dbbTotal() - t.total;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text(methods[method].name + ': ' + total + ' months total', canvasWidth / 2, 36);
  textStyle(NORMAL);
  textSize(14);
  const line2 = method === 'DBB' ? 'Baseline: design, then bid, then build (' + designSlider.value() + ' + 1 + ' + conSlider.value() + ' months)'
    : saved + ' months shorter than design-bid-build. Overlaps are illustrative.';
  text(line2, canvasWidth / 2, 55);
}

// ---- Gantt-style timeline ----
function mx(month) { return X0 + month * (canvasWidth - X0 - 14) / AXIS_MONTHS; }

function drawGantt() {
  const axisY = 86;
  // month axis
  stroke('silver');
  strokeWeight(1);
  for (let m = 0; m <= AXIS_MONTHS; m += 5) line(mx(m), axisY, mx(m), 156);
  stroke('dimgray');
  line(mx(0), axisY, mx(AXIS_MONTHS), axisY);
  noStroke();
  fill('dimgray');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  for (let m = 0; m <= AXIS_MONTHS; m += 5) text(m, mx(m), axisY - 3);
  textAlign(LEFT, BOTTOM);
  text('months', 8, axisY - 3);

  lanes.forEach((ln, i) => {
    const y = 92 + i * 24;
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text(ln.label, 8, y + 10);
    const b = cur[ln.key];
    const w = (b[1] - b[0]) * (mx(1) - mx(0));
    if (w < 1) return;
    stroke('dimgray');
    strokeWeight(1);
    fill(ln.col);
    rect(mx(b[0]), y, w, 20, 4);
    items.push({ key: ln.key, x: mx(b[0]), y: y, w: w, h: 20 });
    const months = round((b[1] - b[0]) * 10) / 10;
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    if (w >= 46) { fill(ln.key === 'bid' ? 'white' : 'black'); text(months + ' mo', mx(b[0]) + w / 2, y + 10); }
    else { fill('black'); textAlign(LEFT, CENTER); text(months + ' mo', mx(b[1]) + 4, y + 10); }
  });
}

// ---- Parties: boxes at their join month, joined by contract (solid) and communication (dashed) lines ----
function partyRects() {
  const rows = [0, 1, 2, 3].map(i => 180 + i * 37);
  const xs = [X0, X0, mx(cur.joinC), mx(cur.joinS)].map(x => min(x, canvasWidth - BOX_W - 8));
  return ['owner', 'arch', 'contr', 'subs'].map((k, i) => ({ key: k, x: xs[i], y: rows[i], w: BOX_W, h: BOX_H, row: i }));
}

// connectors per method: [rowA, rowB, 'contract' | 'talk']; IPD is drawn as one shared agreement
const links = {
  DBB: [[0, 1, 'contract'], [0, 2, 'contract'], [2, 3, 'contract'], [1, 2, 'talk']],
  DB: [[0, 2, 'contract'], [2, 1, 'contract'], [2, 3, 'contract']],
  CMAR: [[0, 1, 'contract'], [0, 2, 'contract'], [2, 3, 'contract'], [1, 2, 'talk']]
};

function drawParties() {
  const P = partyRects();
  noStroke();
  fill('dimgray');
  textSize(12);
  textAlign(LEFT, CENTER);
  text(method === 'IPD' ? 'Thick line: one shared multi-party agreement' : 'Solid line: contract. Dashed line: communication only', 8, 168);

  // dotted guides from the timeline to late-joining boxes
  stroke('silver');
  strokeWeight(1);
  drawingContext.setLineDash([2, 4]);
  [2, 3].forEach(r => { if (P[r].x > X0 + BOX_W + 6) line(P[r].x, 156, P[r].x, P[r].y); });
  drawingContext.setLineDash([]);

  // stub offsets: spread the lines that meet the same box
  const touches = [[], [], [], []];
  const list = method === 'IPD' ? [] : links[method];
  list.forEach((l, k) => { touches[l[0]].push(k); touches[l[1]].push(k); });
  const stubY = (row, k) => {
    const arr = touches[row], i = arr.indexOf(k);
    return P[row].y + BOX_H / 2 + (i - (arr.length - 1) / 2) * 8;
  };
  strokeWeight(2);
  list.forEach((l, k) => {
    const rx = X0 - 10 - k * 8;
    const ya = stubY(l[0], k), yb = stubY(l[1], k);
    stroke(l[2] === 'contract' ? 'black' : 'gray');
    strokeWeight(l[2] === 'contract' ? 2.5 : 2);
    if (l[2] === 'talk') drawingContext.setLineDash([6, 4]);
    line(P[l[0]].x, ya, rx, ya);
    line(rx, ya, rx, yb);
    line(rx, yb, P[l[1]].x, yb);
    drawingContext.setLineDash([]);
  });
  if (method === 'IPD') {
    stroke('black');
    strokeWeight(5);
    const rx = X0 - 14;
    line(rx, P[0].y + BOX_H / 2, rx, P[3].y + BOX_H / 2);
    P.forEach(p => line(rx, p.y + BOX_H / 2, p.x, p.y + BOX_H / 2));
  }

  P.forEach(p => {
    const k = p.key;
    const joined = p.key === 'contr' ? cur.joinC : (p.key === 'subs' ? cur.joinS : 0);
    stroke('dimgray');
    strokeWeight(1.5);
    fill(k === 'owner' ? 'lightsteelblue' : (k === 'arch' ? 'lightblue' : (k === 'contr' ? 'moccasin' : 'wheat')));
    rect(p.x, p.y, p.w, p.h, 6);
    items.push({ key: k, x: p.x, y: p.y, w: p.w, h: p.h });
    noStroke();
    fill('black');
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    const name = k === 'owner' ? 'Owner' : (k === 'arch' ? 'Architect' : (k === 'contr' ? 'Contractor' : 'Key subcontractors'));
    if (textWidth(name) > p.w - 8) textSize(12);
    text(name, p.x + p.w / 2, p.y + 11);
    textStyle(NORMAL);
    textSize(12);
    const note = k === 'contr' ? methods[method].subtitle + ', ' + joinText(joined) : (k === 'subs' ? (joined < 0.3 ? 'join at the start' : 'join ' + joinText(joined)) : 'from the start');
    text(note, p.x + p.w / 2, p.y + 26);
  });
}
function joinText(m) { return m < 0.3 ? 'from start' : 'month ' + nf(m, 0, m % 1 ? 1 : 0); }

// ---- Hover and click targets ----
function findHover() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  for (let i = items.length - 1; i >= 0; i--) {
    const it = items[i];
    if (mouseX >= it.x && mouseX <= it.x + it.w && mouseY >= it.y && mouseY <= it.y + it.h) { hoverItem = it.key; return; }
  }
}
function drawHighlights() {
  noFill();
  items.forEach(it => {
    if (it.key === selectedItem) { stroke('black'); strokeWeight(4); rect(it.x - 2, it.y - 2, it.w + 4, it.h + 4, 6); }
    else if (it.key === hoverItem) { stroke('navy'); strokeWeight(3); rect(it.x - 1, it.y - 1, it.w + 2, it.h + 2, 6); }
  });
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  selectedItem = (hoverItem && hoverItem !== selectedItem) ? hoverItem : null;
}

// ---- Bottom strip: method summary, clicked definition, or quiz scenario and feedback ----
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

function drawStrip() {
  const x = 8, y = 330, w = canvasWidth - 16, h = drawHeight - y - 6;
  const good = quizOn && solved;
  stroke(good ? 'seagreen' : (quizOn ? 'steelblue' : 'silver'));
  strokeWeight(good || quizOn ? 3 : 1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  const tx = x + 10, tw = w - 20;
  let ty = y + 6;
  if (quizOn) {
    fill('black');
    textStyle(BOLD);
    ty = wrapText('Scenario ' + (qIdx + 1) + ' of ' + scenarios.length + ' (first-try score ' + scoreRight + ' of ' + scoreTotal + ')', tx, ty, tw, 17);
    textStyle(NORMAL);
    ty = wrapText(scenario().q, tx, ty, tw, 17);
    if (feedback) {
      fill(solved ? 'seagreen' : 'darkorange');
      wrapText(feedback, tx, ty + 2, tw, 16);
    } else {
      fill('dimgray');
      wrapText('Choose the method that fits with the DBB, DB, CMAR, or IPD buttons.', tx, ty + 2, tw, 16);
    }
  } else if (selectedItem) {
    fill('black');
    textStyle(BOLD);
    ty = wrapText(defs[selectedItem].title, tx, ty, tw, 17);
    textStyle(NORMAL);
    wrapText(defs[selectedItem].text, tx, ty, tw, 17);
  } else {
    fill('black');
    textStyle(BOLD);
    ty = wrapText(methods[method].name, tx, ty, tw, 17);
    textStyle(NORMAL);
    ty = wrapText(methods[method].summary, tx, ty, tw, 17);
    fill('dimgray');
    wrapText('Click any bar or box for a definition.', tx, ty, tw, 17);
  }
  textStyle(NORMAL);
}

// ---- Slider labels with values and units ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Months of design: ' + designSlider.value(), 10, drawHeight + 54);
  text('Months of construction: ' + conSlider.value(), 10, drawHeight + 89);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  designSlider.size(sliderWidth());
  conSlider.size(sliderWidth());
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
