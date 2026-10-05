// Layered Assembly Engine - draws a cross-section stack of building layers from the ASSEMBLY data object
// ENGINE_VERSION: 1.4.2
// Shared by every sim made with the layered-assembly-infographic skill. Do not edit a sim's copy by hand;
// edit skills/layered-assembly-infographic/assets/layered-assembly-engine.js and run `assembly_tool.py sync`.
//
// Expects a global `ASSEMBLY` (schema "layered-assembly/1") defined in a file loaded BEFORE this one.
// Design rule: the base drawing is black-and-white line art with a fixed hatch legend; color is used only
// for the invisible flows (heat, air, water, vapor) that the drawing is there to explain.

const ENGINE_VERSION = '1.4.2';

// ---- Layout constants (the scaffold tool uses the same arithmetic to size the iframe) ----
const ROW = 34;            // height of one control row
const INFO_HEIGHT = 120;   // detail panel under the drawing
let drawHeight = 400;      // drawing area; overridden by ASSEMBLY.drawHeight
let controlHeight = 0;
let canvasHeight = 0;
let containerWidth = 400;
let canvasWidth = 400;
const margin = 16;
const FLOW_MARGIN = 36;    // how far outside the stack the flow dots start and end
const EXPLODE_MAX = 30;    // px gap between layers at full explode
const SLOW_PASS = 0.4;     // share of dots a slowing layer lets through (schematic, not a perm or R rating)

// ---- Hatch legend: material key -> pastel fill (color mode), solid ink (for thin solid materials), label ----
const MATERIALS = {
  earth:    { fill: '#e6dccb', label: 'Earth' },
  gravel:   { fill: '#e3e3e3', label: 'Gravel' },
  sand:     { fill: '#f3e9c6', label: 'Sand' },
  concrete: { fill: '#d9d9d9', label: 'Concrete' },
  masonry:  { fill: '#e8c9b8', label: 'Masonry' },
  wood:     { fill: '#f0dcb4', label: 'Wood' },
  sheet:    { fill: '#e9cc9c', label: 'Sheet panel' },
  batt:     { fill: '#fff4b8', label: 'Batt insulation' },
  rigid:    { fill: '#fbd5e0', label: 'Rigid insulation' },
  foam:     { fill: '#fde8c8', label: 'Spray foam' },
  membrane: { fill: '#8a73c4', label: 'Membrane', solid: true },
  airspace: { fill: '#e6f2ff', label: 'Air space' },
  gypsum:   { fill: '#efefef', label: 'Gypsum board' },
  metal:    { fill: '#90a4ae', label: 'Metal', solid: true },
  glass:    { fill: '#d6ecf7', label: 'Glass' },
  finish:   { fill: '#a8a8a8', label: 'Finish', solid: true }
};
const INK = '#222222';

// ---- State ----
let A;                      // alias for ASSEMBLY
let isH = true;             // true: layers run left to right; false: top to bottom
let breakBoxes = [];
let flowBoxes = [];
let failSel, explodeSlider, unitSel, lineArtBox, legendBox, profileBox, tempSlider, resetButton;
let selected = -1;
let hovered = -1;
let dots = [];
let layerRects = [];        // {a0,a1,c0,c1} per layer in along/cross coordinates
let labelBoxes = [];        // {i,x,y,w,h} click targets for callouts
let quizBox = null, nextButton = null;
let quizQ = null, quizResult = '', quizPick = -1, quizScore = 0, quizAsked = 0, quizPool = [], quizWasOn = false;
let specError = '';
let thinScaled = false;

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

function setup() {
  updateCanvasSize();
  A = typeof ASSEMBLY !== 'undefined' ? ASSEMBLY : null;
  if (!A || A.kind !== 'stack' || !Array.isArray(A.layers) || A.layers.length < 2) {
    specError = 'ASSEMBLY is missing or not a "stack" assembly with at least two layers.';
    const c = createCanvas(containerWidth, 120);
    c.parent(document.querySelector('main'));
    return;
  }
  isH = (A.direction || 'horizontal') === 'horizontal';
  drawHeight = A.drawHeight || 400;
  const hasCond = !!A.conditions;
  controlHeight = ROW * (2 + 1 + 1 + (quizEnabled() ? 1 : 0) + (hasCond ? 1 : 0)) + 6;
  canvasHeight = drawHeight + INFO_HEIGHT + controlHeight;
  console.log('CANVAS_HEIGHT ' + canvasHeight + ' (engine ' + ENGINE_VERSION + ')');

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control first, then position them
  A.layers.forEach((L, i) => {
    const wide = (canvasWidth - 2 * margin) / Math.ceil(A.layers.length / 2) >= 95;
    const cb = createCheckbox((i + 1) + (wide ? ' ' + L.name : ''), true);   // ticked = layer present; untick to remove or puncture it
    cb.changed(() => { if (!cb.checked() && !quizOn()) selected = i; });
    breakBoxes.push(cb);
  });
  failSel = createSelect();
  failSel.option('Remove the layer', 'missing');
  failSel.option('Punch a hole', 'hole');
  failSel.selected('missing');
  explodeSlider = createSlider(0, 100, 0, 1);
  unitSel = createSelect();
  unitSel.option('IP (in, R)', 'IP');
  unitSel.option('SI (mm, RSI)', 'SI');
  unitSel.selected((A.units || 'IP') === 'SI' ? 'SI' : 'IP');
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);
  (A.flows || []).forEach(f => {
    const cb = createCheckbox(f.name, true);
    flowBoxes.push(cb);
  });
  lineArtBox = createCheckbox('Line art', false);
  legendBox = createCheckbox('Legend', legendDefault());
  if (quizEnabled()) {
    quizBox = createCheckbox('Quiz me', false);
    nextButton = createButton('Next question');
    nextButton.mousePressed(nextQuestion);
    nextButton.hide();
  }
  if (hasCond) {
    profileBox = createCheckbox('Temperature', false);
    const r = A.conditions.tempRange || [-20, 40];
    tempSlider = createSlider(r[0], r[1], A.conditions.tempA, 1);
  }
  [...breakBoxes, failSel, explodeSlider, unitSel, resetButton, ...flowBoxes, lineArtBox, legendBox, quizBox, nextButton, profileBox, tempSlider]
    .filter(Boolean).forEach(el => el.style('font-size', '14px'));
  positionControls();

  const names = A.layers.map((L, i) => (i + 1) + ' ' + L.name).join(', ');
  describe('Cross-section of ' + A.title + ', from ' + (A.sideA || 'side A') + ' to ' + (A.sideB || 'side B') +
    ': ' + names + '. Checkboxes remove or puncture a layer, a slider explodes the layers apart, and animated dots show ' +
    (A.flows || []).map(f => f.name.toLowerCase()).join(', ') + ' moving through the assembly.');
}

function windowResized() {
  if (specError) return;
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionControls();
}

function resetAll() {
  breakBoxes.forEach(b => b.checked(true));
  failSel.selected('missing');
  explodeSlider.value(0);
  flowBoxes.forEach(b => b.checked(true));
  lineArtBox.checked(false);
  legendBox.checked(legendDefault());
  unitSel.selected((A.units || 'IP') === 'SI' ? 'SI' : 'IP');
  if (profileBox) { profileBox.checked(false); tempSlider.value(A.conditions.tempA); }
  if (quizBox) quizBox.checked(false);
  selected = -1;
}

// ---- Control layout: rows below the info panel ----
function positionControls() {
  const top = drawHeight + INFO_HEIGHT;
  const n = A.layers.length;
  const perRow = Math.ceil(n / 2);
  const colW = (canvasWidth - 2 * margin) / perRow;
  breakBoxes.forEach((cb, i) => {
    const r = Math.floor(i / perRow), c = i % perRow;
    cb.position(margin + c * colW, top + r * ROW + 6);
    const span = cb.elt.querySelector('span');
    if (span) span.textContent = (i + 1) + (colW >= 95 ? ' ' + A.layers[i].name : '');
  });
  const y2 = top + 2 * ROW + 6;
  failSel.position(margin + 84, y2);
  resetButton.position(canvasWidth - 72, y2);
  unitSel.position(canvasWidth - 72 - 96, y2);
  const sx = 322;
  explodeSlider.position(sx, y2 + 2);
  explodeSlider.size(max(60, canvasWidth - 72 - 96 - 16 - sx));
  const y3 = top + 3 * ROW + 6;
  const nOpt = flowBoxes.length + 2;
  const fx = margin + 48;
  const fw2 = (canvasWidth - fx - margin) / nOpt;
  flowBoxes.forEach((cb, i) => cb.position(fx + i * fw2, y3));
  lineArtBox.position(fx + flowBoxes.length * fw2, y3);
  legendBox.position(fx + (flowBoxes.length + 1) * fw2, y3);
  if (quizBox) {
    const yq = top + 4 * ROW + 6;
    quizBox.position(margin, yq);
    nextButton.position(margin + 130, yq);
  }
  if (profileBox) {
    const y4 = top + tempRowIndex() * ROW + 6;
    profileBox.position(margin, y4);
    tempSlider.position(360, y4 + 2);
    tempSlider.size(max(60, canvasWidth - 360 - margin));
  }
}

// ---- Quiz mode: "read the drawing" questions built from the layer data (no extra authoring) ----
function quizEnabled() { return !A || A.quiz !== false; }
function quizOn() { return !!quizBox && quizBox.checked(); }
function quizHidesNames() { return quizOn() && quizResult === ''; }   // names stay hidden until the student answers
function tempRowIndex() { return 4 + (quizEnabled() ? 1 : 0); }
function buildQuizPool() {
  const pool = [];
  A.layers.forEach((L, i) => {
    if (L.what) pool.push({ answers: [i], text: 'Which layer is this?  "' + L.what + '"' });
    if (L.why) pool.push({ answers: [i], text: 'Which layer is this?  "' + L.why + '"' });
  });
  (A.flows || []).forEach(f => {
    const ans = A.layers.map((L, i) => (L.stops || []).includes(f.id) ? i : -1).filter(i => i >= 0);
    if (ans.length) pool.push({ answers: ans, text: 'Click a layer that stops ' + f.name.toLowerCase() + '.' });
  });
  return pool.sort(() => random() - 0.5);
}
function nextQuestion() {
  if (quizPool.length === 0) quizPool = buildQuizPool();
  quizQ = quizPool.pop();
  quizResult = '';
  quizPick = -1;
}
function quizAnswer(i) {
  if (!quizQ || quizResult !== '') return;
  quizPick = i;
  quizAsked++;
  if (quizQ.answers.includes(i)) { quizResult = 'right'; quizScore++; } else quizResult = 'wrong';
}
function syncQuiz() {
  if (!quizBox) return;
  const on = quizOn();
  if (on !== quizWasOn) {
    quizWasOn = on;
    if (on) { quizScore = 0; quizAsked = 0; quizPool = []; selected = -1; nextQuestion(); nextButton.show(); }
    else { nextButton.hide(); quizQ = null; quizResult = ''; quizPick = -1; }
  }
  // layer checkbox labels carry the layer names, so show numbers only while a question is open
  const colW = (canvasWidth - 2 * margin) / Math.ceil(A.layers.length / 2);
  breakBoxes.forEach((cb, i) => {
    const span = cb.elt.querySelector('span');
    const want = (i + 1) + (colW >= 95 && !quizHidesNames() ? ' ' + A.layers[i].name : '');
    if (span && span.textContent !== want) span.textContent = want;
  });
}
function drawQuizInfo() {
  const y0 = drawHeight, wInfo = canvasWidth - 2 * margin;
  noStroke(); textAlign(LEFT, TOP);
  textStyle(BOLD); textSize(13); fill(INK);
  text('Quiz: read the drawing', margin, y0 + 6);
  textAlign(RIGHT, TOP); text('Score ' + quizScore + ' / ' + quizAsked, canvasWidth - margin, y0 + 6);
  textAlign(LEFT, TOP); textStyle(NORMAL); textSize(12); fill(60);
  if (quizQ) text(quizQ.text, margin, y0 + 26, wInfo, 44);
  if (quizResult === '') { fill(120); textSize(11); text('Click the layer in the drawing. Layer names are hidden until you answer.', margin, y0 + INFO_HEIGHT - 20); return; }
  const first = quizQ.answers[0];
  textStyle(BOLD); textSize(12);
  if (quizResult === 'right') { fill('#2e7d32'); text('Correct: ' + (quizPick + 1) + ' ' + A.layers[quizPick].name + '. Press Next question.', margin, y0 + 74, wInfo, 16); }
  else {
    fill('#c62828');
    const names = quizQ.answers.map(a => (a + 1) + ' ' + A.layers[a].name).join(' or ');
    text('Not quite. That is ' + (quizPick + 1) + ' ' + A.layers[quizPick].name + '. The answer is ' + names + '.', margin, y0 + 74, wInfo, 30);
  }
}

// ---- State helpers ----
function failMode() { return failSel.value(); }
function isBroken(i) { return !breakBoxes[i].checked(); }   // an unticked box means the layer is removed or punctured
function stateOf(i) { return isBroken(i) ? failMode() : 'intact'; }
function lineArt() { return lineArtBox.checked(); }
function legendDefault() { return !A || A.legend !== false; }   // on unless the spec says "legend": false
function useSI() { return unitSel.value() === 'SI'; }
function explode() { return explodeSlider.value() / 100; }
function hasHole() { return A.layers.some((L, i) => stateOf(i) === 'hole'); }
function flowShown(k) { return flowBoxes[k].checked(); }

// ---- Unit formatting ----
function fracStr(t) {
  const whole = Math.floor(t + 1e-9);
  let sixteenths = Math.round((t - whole) * 16);
  let w = whole;
  if (sixteenths === 16) { w += 1; sixteenths = 0; }
  let num = sixteenths, den = 16;
  while (num > 0 && num % 2 === 0) { num /= 2; den /= 2; }
  if (num === 0) return (w === 0 && t > 0.001 ? t.toFixed(2) : w) + ' in';
  return (w > 0 ? w + ' ' : '') + num + '/' + den + ' in';
}
function fmtThickness(t) {
  if (useSI()) {
    const mm = t * 25.4;
    return (mm >= 10 ? Math.round(mm) : mm.toFixed(1)) + ' mm';
  }
  return fracStr(t);
}
function fmtR(r) {
  if (r === undefined || r === null) return '';
  return useSI() ? 'RSI ' + (r * 0.1761).toFixed(2) : 'R-' + (r >= 10 ? r.toFixed(0) : r.toFixed(2).replace(/\.?0+$/, ''));
}
function fmtTemp(f) {
  return useSI() ? Math.round((f - 32) * 5 / 9) + '°C' : Math.round(f) + '°F';
}

// ---- Geometry: along = axis the layers are stacked on; cross = the other axis ----
function stackBox() {
  if (isH) {
    const h = A.stackSize || 130;
    return { a0: margin + 8, a1: canvasWidth - margin - 8, c0: (drawHeight - h) / 2 + 6, c1: (drawHeight - h) / 2 + 6 + h };
  }
  const L = verticalLayout();
  return { a0: 52, a1: drawHeight - 52, c0: L.stackX, c1: L.stackX + L.stackW };
}
// Vertical stacks: the drawing, its label column, and the legend sit side by side as one block that is
// centered on wide screens and shrinks (stack first) on narrow ones.
const LABEL_GAP = 44, LABEL_COL = 150, LEGEND_GAP = 16, LEGEND_COL = 125;   // fits beside a 640 px canvas
function verticalLayout() {
  const stackW = min(A.stackSize || 260, max(120, canvasWidth * 0.34));
  const blockW = stackW + LABEL_GAP + LABEL_COL + LEGEND_GAP + LEGEND_COL;
  const stackX = max(margin + 24, (canvasWidth - blockW) / 2);
  const labelX = stackX + stackW + LABEL_GAP;
  const legendX = min(labelX + LABEL_COL + LEGEND_GAP, canvasWidth - LEGEND_COL - margin);
  return { stackW, stackX, labelX, legendX };
}
function px(a, c) { return isH ? { x: a, y: c } : { x: c, y: a }; }
function fillRectAC(a0, a1, c0, c1) {
  const p = px(a0, c0), q = px(a1, c1);
  rect(min(p.x, q.x), min(p.y, q.y), abs(q.x - p.x), abs(q.y - p.y));
}

function computeLayout() {
  const sbox = stackBox();
  const n = A.layers.length;
  const gap = explode() * EXPLODE_MAX;
  const avail = (sbox.a1 - sbox.a0) - (n - 1) * gap;
  // Thickness-proportional widths with a minimum so thin layers stay visible; solve for the scale by bisection
  const minPx = A.layers.map(L => L.minPx || 6);
  let lo = 0, hi = 1000;
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    const total = A.layers.reduce((s, L, i) => s + max(minPx[i], mid * L.t), 0);
    if (total > avail) hi = mid; else lo = mid;
  }
  thinScaled = A.layers.some((L, i) => lo * L.t < minPx[i]);
  layerRects = [];
  let a = sbox.a0;
  A.layers.forEach((L, i) => {
    const w = max(minPx[i], lo * L.t);
    layerRects.push({ a0: a, a1: a + w, c0: sbox.c0, c1: sbox.c1 });
    a += w + gap;
  });
}

// ---- Thermal profile: steady-state series conduction through the layers that are present ----
function layerREff(i) {
  const L = A.layers[i];
  if (L.r === undefined) return 0;
  return stateOf(i) === 'missing' ? (L.rMissing || 0) : L.r;
}
function thermal() {
  const cond = A.conditions;
  const tA = tempSlider.value(), tB = cond.tempB;
  const rA = cond.rFilmA !== undefined ? cond.rFilmA : 0.17, rB = cond.rFilmB !== undefined ? cond.rFilmB : 0.68;
  const rs = A.layers.map((L, i) => layerREff(i));
  const total = rA + rs.reduce((s, r) => s + r, 0) + rB;
  const q = (tB - tA) / total;
  let t = tA + q * rA;
  const faces = [t];            // temperature at the A face of each layer, then the B face of the last
  rs.forEach(r => { t += q * r; faces.push(t); });
  return { faces, q, total };
}

// ---- Flows: where does a dot of flow f traveling at cross position `row` get stopped? ----
// Returns { stopIdx, stopS } (stopIdx -1 if it passes all the way through)
function probe(f, row, slowPass) {   // slowPass: true/false for status probes, or an array of per-layer rolls for a dot
  const fromA = (f.from || 'A') === 'A';
  const order = A.layers.map((_, i) => i);
  if (!fromA) order.reverse();
  const sbox = stackBox();
  for (const i of order) {
    const L = A.layers[i];
    const st = stateOf(i);
    const stops = (L.stops || []).includes(f.id);
    const slows = (L.slows || []).includes(f.id);
    if (!stops && !slows) continue;
    if (st === 'missing') continue;
    const inHole = st === 'hole' && abs(row - 0.5) < 0.09;
    if (inHole) continue;
    const slowBlocks = slows && (Array.isArray(slowPass) ? slowPass[i] >= SLOW_PASS : !slowPass);
    if (stops || slowBlocks) {
      const r = layerRects[i];
      const face = fromA ? r.a0 : r.a1;
      return { stopIdx: i, stopS: fromA ? face - (sbox.a0 - FLOW_MARGIN) : (sbox.a1 + FLOW_MARGIN) - face };
    }
  }
  return { stopIdx: -1, stopS: Infinity };
}

function spawnDot(d, k) {
  const f = A.flows[k];
  const holeRow = hasHole() && random() < 0.4;
  d.row = holeRow ? random(0.44, 0.56) : random(0.08, 0.92);
  d.slowPass = A.layers.map(() => random());
  d.s = 0;
  d.dwell = 0;
  d.speed = random(1.1, 1.8);
}
function ensureDots() {
  if (dots.length === (A.flows || []).length * 14) return;
  dots = [];
  (A.flows || []).forEach((f, k) => {
    for (let j = 0; j < 14; j++) {
      const d = { k, s: 0, dwell: 0 };
      spawnDot(d, k);
      d.s = random(0, 400);
      dots.push(d);
    }
  });
}

function drawFlows() {
  ensureDots();
  const sbox = stackBox();
  const total = (sbox.a1 - sbox.a0) + 2 * FLOW_MARGIN;
  const art = lineArt();
  dots.forEach(d => {
    const f = A.flows[d.k];
    if (!flowShown(d.k)) return;
    const fromA = (f.from || 'A') === 'A';
    const pr = probe(f, d.row, d.slowPass);
    const stopS = pr.stopS;
    d.s += d.speed;
    if (d.s >= stopS) { d.s = stopS; d.dwell++; }
    if (d.s >= total || d.dwell > 45) spawnDot(d, d.k);
    const a = fromA ? (sbox.a0 - FLOW_MARGIN) + d.s : (sbox.a1 + FLOW_MARGIN) - d.s;
    const c = lerp(sbox.c0, sbox.c1, d.row);
    const p = px(a, c);
    const al = d.dwell > 0 ? map(d.dwell, 0, 45, 255, 40) : 255;
    if (art) {
      noFill(); stroke(0, al); strokeWeight(1.5);
      circle(p.x, p.y, 6);
    } else {
      noStroke(); const fc = color(f.color); fill(red(fc), green(fc), blue(fc), al);
      circle(p.x, p.y, 7);
    }
    if (d.dwell > 0 && d.dwell < 14) {   // a small ring where the flow is stopped
      noFill(); stroke(art ? 0 : f.color); strokeWeight(1);
      circle(p.x, p.y, 8 + d.dwell);
    }
  });
}

// ---- Hatching (clipped to the layer rectangle) ----
function makeRng(seed) {
  let s = (seed * 9301 + 49297) % 233280;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
function hatch(kind, x, y, w, h, seed) {
  const ctx = drawingContext;
  const rng = makeRng(seed + 7);
  const longX = w >= h;
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  stroke(INK); strokeWeight(1); noFill();
  switch (kind) {
    case 'earth':
      for (let n = 0; n < w * h / 110; n++) { const px0 = x + rng() * w, py0 = y + rng() * h; line(px0, py0, px0 + 4, py0 - 3); }
      break;
    case 'gravel':
      for (let n = 0; n < w * h / 170; n++) circle(x + rng() * w, y + rng() * h, 3 + rng() * 3);
      break;
    case 'sand':
      for (let n = 0; n < w * h / 45; n++) point(x + rng() * w, y + rng() * h);
      break;
    case 'concrete':
      for (let n = 0; n < w * h / 60; n++) point(x + rng() * w, y + rng() * h);
      for (let n = 0; n < w * h / 450; n++) { const tx = x + rng() * w, ty = y + rng() * h; triangle(tx, ty, tx + 5, ty + 1, tx + 2, ty + 5); }
      break;
    case 'masonry': {
      for (let yy = y; yy <= y + h; yy += 11) line(x, yy, x + w, yy);
      let row = 0;
      for (let yy = y; yy < y + h; yy += 11, row++) for (let xx = x + (row % 2 ? 12 : 0); xx < x + w; xx += 24) line(xx, yy, xx, yy + 11);
      break;
    }
    case 'wood':
      if (longX) { for (let yy = y + 3; yy < y + h; yy += 5) { beginShape(); for (let xx = x; xx <= x + w; xx += 12) vertex(xx, yy + sin(xx * 0.08 + yy) * 1.2); endShape(); } }
      else { for (let xx = x + 3; xx < x + w; xx += 5) { beginShape(); for (let yy = y; yy <= y + h; yy += 12) vertex(xx + sin(yy * 0.08 + xx) * 1.2, yy); endShape(); } }
      break;
    case 'sheet':
      ctx.setLineDash([7, 3]);
      if (longX) { for (let yy = y + 3; yy < y + h; yy += 4) line(x, yy, x + w, yy); }
      else { for (let xx = x + 3; xx < x + w; xx += 4) line(xx, y, xx, y + h); }
      ctx.setLineDash([]);
      break;
    case 'batt': {
      const shortLen = longX ? h : w;
      const count = max(2, floor(shortLen / 9));
      for (let k = 0; k < count; k++) {
        const off = (k + 0.5) * shortLen / count;
        beginShape();
        const len = longX ? w : h;
        for (let t = 0; t <= len; t += 3) {
          const amp = min(shortLen / count * 0.9, 9);
          const wobble = sin(t * 0.55 + k) * amp * 0.5;
          if (longX) vertex(x + t, y + off + wobble); else vertex(x + off + wobble, y + t);
        }
        endShape();
      }
      break;
    }
    case 'rigid':
      for (let d = -h; d < w; d += 7) line(x + d, y + h, x + d + h, y);
      break;
    case 'foam':
      for (let n = 0; n < w * h / 55; n++) circle(x + rng() * w, y + rng() * h, 2 + rng() * 2);
      break;
    case 'airspace':
      ctx.setLineDash([2, 6]);
      if (longX) { for (let yy = y + 4; yy < y + h; yy += 8) line(x, yy, x + w, yy); }
      else { for (let xx = x + 4; xx < x + w; xx += 8) line(xx, y, xx, y + h); }
      ctx.setLineDash([]);
      break;
    case 'gypsum':
      for (let n = 0; n < w * h / 130; n++) point(x + rng() * w, y + rng() * h);
      ctx.setLineDash([4, 5]);
      for (let d = -h; d < w; d += 14) line(x + d, y + h, x + d + h, y);
      ctx.setLineDash([]);
      break;
    case 'glass':
      for (let d = -h; d < w; d += 12) line(x + d, y + h, x + d + h * 0.6, y);
      break;
    default:
      break;
  }
  ctx.restore();
}

function drawLayer(i, hot) {
  const L = A.layers[i];
  const r = layerRects[i];
  const p = px(r.a0, r.c0), q = px(r.a1, r.c1);
  const x = min(p.x, q.x), y = min(p.y, q.y), w = abs(q.x - p.x), h = abs(q.y - p.y);
  const mat = MATERIALS[L.material] || MATERIALS.finish;
  const st = stateOf(i);
  const art = lineArt();

  if (st === 'missing') {          // a ghost outline shows where the layer used to be
    noFill(); stroke(120); strokeWeight(1);
    drawingContext.setLineDash([4, 4]); rect(x, y, w, h); drawingContext.setLineDash([]);
    return;
  }
  // fill
  if (mat.solid) { noStroke(); fill(art ? INK : mat.fill); rect(x, y, w, h); }
  else { noStroke(); fill(art ? 255 : mat.fill); rect(x, y, w, h); hatch(L.material, x, y, w, h, i); }
  // hole: erase a notch in the middle of the layer
  if (st === 'hole') {
    const hw = (isH ? h : w) * 0.18;
    const a0 = isH ? y + h / 2 - hw / 2 : x + w / 2 - hw / 2;
    fill(255); noStroke();
    if (isH) rect(x - 1, a0, w + 2, hw); else rect(a0, y - 1, hw, h + 2);
    stroke(INK); strokeWeight(1);
    if (isH) { line(x, a0, x + w, a0); line(x, a0 + hw, x + w, a0 + hw); }
    else { line(a0, y, a0, y + h); line(a0 + hw, y, a0 + hw, y + h); }
  }
  // outline
  noFill();
  const warn = coldSensitive(i);
  const qRight = quizOn() && quizResult !== '' && quizQ.answers.includes(i);
  const qWrong = quizOn() && quizResult === 'wrong' && i === quizPick;
  stroke(qRight ? '#2e7d32' : (qWrong ? '#c62828' : (warn ? '#d32f2f' : (i === selected ? '#e65100' : INK))));
  strokeWeight(qRight || qWrong ? 4 : (i === selected ? 3 : (hot ? 2 : 1)));
  rect(x, y, w, h);
}

// ---- Callouts (leader lines with a number and a two-level label) ----
function tagFor(L) {
  if (L.tag) return L.tag;
  const names = (L.stops || []).map(id => { const f = (A.flows || []).find(ff => ff.id === id); return f ? f.name.toLowerCase() : id; });
  return names.length ? 'stops: ' + names.join(', ') : '';
}
function layerCenter(i) {
  const r = layerRects[i];
  return { a: (r.a0 + r.a1) / 2, c0: r.c0, c1: r.c1 };
}
function drawCallouts() {
  labelBoxes = [];
  const n = A.layers.length;
  textFont('Arial');
  if (isH) {
    // Greedy placement above or below the stack, lowest free level first, no text/leader crossings
    const placed = { top: [], bot: [] };
    const leaders = { top: [], bot: [] };
    const sbox = stackBox();
    A.layers.forEach((L, i) => {
      const cx = layerCenter(i).a;
      textSize(12); textStyle(BOLD);
      const label = quizHidesNames() ? String(i + 1) : (i + 1) + ' ' + L.name;
      const tag = quizHidesNames() ? '' : tagFor(L);
      const tw = max(textWidth(label), (textStyle(NORMAL), textSize(10), textWidth(tag))) + 4;
      const rightEdge = cx + 4 + tw > canvasWidth - 6;
      const tx0 = rightEdge ? cx - 4 - tw : cx + 4;
      const th = tag ? 28 : 16;
      let best = null;
      ['top', 'bot'].forEach(side => {
        for (let level = 0; level < 7; level++) {
          const yTop = side === 'top' ? sbox.c0 - 14 - th - level * 31 : sbox.c1 + 14 + level * 31;
          const rc = { x: tx0, y: yTop, w: tw, h: th };
          const seg = side === 'top' ? { x: cx, y0: yTop + th, y1: sbox.c0 } : { x: cx, y0: sbox.c1, y1: yTop };
          const clash = placed[side].some(o => rc.x < o.x + o.w && rc.x + rc.w > o.x && rc.y < o.y + o.h && rc.y + rc.h > o.y) ||
            placed[side].some(o => seg.x > o.x && seg.x < o.x + o.w && seg.y0 < o.y + o.h && seg.y1 > o.y) ||
            leaders[side].some(s => s.x > rc.x && s.x < rc.x + rc.w && s.y0 < rc.y + rc.h && s.y1 > rc.y);
          if (!clash && yTop > 4 && yTop + th < drawHeight - 70) {
            if (!best || level < best.level) best = { side, level, rc, seg };
            break;
          }
        }
      });
      if (!best) best = { side: i % 2 ? 'bot' : 'top', level: 0, rc: { x: tx0, y: sbox.c0 - 14 - th, w: tw, h: th }, seg: { x: cx, y0: sbox.c0 - 14, y1: sbox.c0 } };
      placed[best.side].push(best.rc);
      leaders[best.side].push(best.seg);
      stroke(90); strokeWeight(1);
      line(best.seg.x, best.seg.y0, best.seg.x, best.seg.y1);
      noStroke();
      textAlign(rightEdge ? RIGHT : LEFT, TOP);
      fill(i === selected ? '#e65100' : INK); textStyle(BOLD); textSize(12);
      text(label, rightEdge ? best.rc.x + best.rc.w : best.rc.x, best.rc.y);
      if (tag) { fill(110); textStyle(NORMAL); textSize(10); text(tag, rightEdge ? best.rc.x + best.rc.w : best.rc.x, best.rc.y + 15); }
      labelBoxes.push({ i, x: best.rc.x, y: best.rc.y, w: best.rc.w, h: best.rc.h });
    });
    // side captions
    fill(90); noStroke(); textStyle(ITALIC); textSize(12);
    textAlign(LEFT, TOP); text('◀ ' + (A.sideA || ''), margin, drawHeight - 22);
    textAlign(RIGHT, TOP); text((A.sideB || '') + ' ▶', canvasWidth - margin, drawHeight - 22);
  } else {
    // Right-hand column; relax label y positions so two-line labels never overlap
    const sbox = stackBox();
    const lx = verticalLayout().labelX;
    const ys = A.layers.map((L, i) => (layerRects[i].a0 + layerRects[i].a1) / 2);
    const gapY = 32;
    const out = ys.slice();
    for (let i = 1; i < n; i++) out[i] = max(out[i], out[i - 1] + gapY);
    const over = out[n - 1] - (drawHeight - 40);
    if (over > 0) { out[n - 1] -= over; for (let i = n - 2; i >= 0; i--) out[i] = min(out[i], out[i + 1] - gapY); }
    A.layers.forEach((L, i) => {
      const yy = ys[i], ly = out[i];
      stroke(90); strokeWeight(1);
      line(sbox.c1, yy, sbox.c1 + 22, yy); line(sbox.c1 + 22, yy, lx - 6, ly);
      noStroke(); textAlign(LEFT, CENTER);
      fill(i === selected ? '#e65100' : INK); textStyle(BOLD); textSize(12);
      const label = quizHidesNames() ? String(i + 1) : (i + 1) + ' ' + L.name;
      text(label, lx, ly - 7);
      const tag = quizHidesNames() ? '' : tagFor(L);
      if (tag) { fill(110); textStyle(NORMAL); textSize(10); text(tag, lx, ly + 8); }
      labelBoxes.push({ i, x: lx, y: ly - 16, w: 150, h: 32 });
    });
    fill(90); noStroke(); textStyle(ITALIC); textSize(12);
    textAlign(LEFT, TOP); text('▲ ' + (A.sideA || ''), sbox.c0, 22);
    textAlign(LEFT, BOTTOM); text('▼ ' + (A.sideB || ''), sbox.c0, drawHeight - 18);
  }
  textStyle(NORMAL);
}

// ---- Temperature profile ----
function shortSide(name) { return String(name || '').replace(/\s*\(.*\)\s*$/, ''); }
function coldSensitive(i) {
  if (!profileBox || !profileBox.checked() || !A.layers[i].sensitive) return false;
  const th = thermal();
  const tmin = min(th.faces[i], th.faces[i + 1]);
  return tmin < A.conditions.dewPoint;
}
function drawProfile() {
  const cond = A.conditions;
  const th = thermal();
  const sbox = stackBox();
  const rng = cond.tempRange || [-20, 40];
  const lo = min(rng[0], cond.tempB) - 5, hi = max(rng[1], cond.tempB) + 5;
  const cMap = t => map(t, lo, hi, isH ? sbox.c1 : sbox.c0, isH ? sbox.c0 : sbox.c1);
  const pts = [];
  A.layers.forEach((L, i) => { pts.push([layerRects[i].a0, th.faces[i]]); pts.push([layerRects[i].a1, th.faces[i + 1]]); });
  stroke('#c62828'); strokeWeight(3); noFill();
  beginShape();
  pts.forEach(([a, t]) => { const p = px(a, cMap(t)); vertex(p.x, p.y); });
  endShape();
  // dew point line
  if (cond.dewPoint !== undefined) {
    const dc = cMap(cond.dewPoint);
    const p0 = px(sbox.a0, dc), p1 = px(sbox.a1, dc);
    stroke('#1565c0'); strokeWeight(1);
    drawingContext.setLineDash([5, 4]); line(p0.x, p0.y, p1.x, p1.y); drawingContext.setLineDash([]);
    noStroke(); fill('#1565c0'); textSize(10); textStyle(NORMAL);
    textAlign(LEFT, BOTTOM); text('dew point ' + fmtTemp(cond.dewPoint), p0.x + 4, p0.y - 2);
  }
}

// ---- Info panel and status ----
function flowStatus() {
  const lines = [];
  (A.flows || []).forEach((f, k) => {
    if (!flowShown(k)) return;
    const far = (f.from || 'A') === 'A' ? (A.sideB || 'side B') : (A.sideA || 'side A');
    const hard = probe(f, 0.12, true);        // layers that stop the flow outright
    const soft = probe(f, 0.12, false);       // layers that only slow it
    const viaHole = probe(f, 0.5, true);
    let msg;
    if (hard.stopIdx >= 0 && hasHole() && viaHole.stopIdx < 0) msg = 'only through the hole';
    else if (hard.stopIdx >= 0) msg = 'stopped at ' + (hard.stopIdx + 1) + ' ' + A.layers[hard.stopIdx].name;
    else if (soft.stopIdx >= 0) msg = 'slowed at ' + (soft.stopIdx + 1) + ' ' + A.layers[soft.stopIdx].name + '; some reaches ' + far.toLowerCase();
    else msg = 'reaches ' + far.toLowerCase();
    lines.push({ name: f.name, msg, color: f.color });
  });
  return lines;
}

function drawInfo() {
  const y0 = drawHeight;
  noStroke(); fill(250); rect(0, y0, canvasWidth, INFO_HEIGHT);
  stroke(200); strokeWeight(1); line(0, y0, canvasWidth, y0);
  noStroke(); textAlign(LEFT, TOP);
  const wInfo = canvasWidth - 2 * margin;
  if (quizOn()) { drawQuizInfo(); return; }
  if (selected >= 0) {
    const L = A.layers[selected];
    const st = stateOf(selected);
    textStyle(BOLD); textSize(13); fill(INK);
    const meta = fmtThickness(L.t) + (L.r !== undefined ? ' · ' + fmtR(L.r) : '');
    text((selected + 1) + '. ' + (L.full || L.name) + '  (' + meta + ')', margin, y0 + 6, wInfo, 18);
    textStyle(NORMAL); textSize(12);
    const fail = (L.effects && L.effects[st]) || L.risk || '';
    const lines = [
      ['What it is: ', L.what],
      ['Why it is there: ', L.why],
      [st !== 'intact' ? 'What now happens: ' : 'If it fails: ', st !== 'intact' && L.effects && L.effects[st] ? L.effects[st] : (L.risk || '')]
    ];
    let yy = y0 + 26;
    lines.forEach(([k, v]) => {
      if (!v) return;
      textStyle(BOLD); fill(70); text(k, margin, yy, wInfo, 16);
      const kw = textWidth(k);
      textStyle(NORMAL); fill(INK);
      text(v, margin + kw + 5, yy, wInfo - kw - 5, 32);
      yy += textWidth(k + v) > wInfo - 10 ? 30 : 16;
    });
    const foot = [];
    if (L.materials) foot.push('Typical materials: ' + L.materials);
    if (L.csi) foot.push('MasterFormat ' + L.csi);
    if (foot.length) { fill(110); textSize(11); textStyle(NORMAL); text(foot.join('   |   '), margin, y0 + INFO_HEIGHT - 18); }
  } else {
    textStyle(BOLD); textSize(13); fill(INK);
    text(A.title, margin, y0 + 6, wInfo, 18);
    textStyle(NORMAL); textSize(12); fill(70);
    text((A.caption || 'Click a layer or its label to see what it is and why it is there.'), margin, y0 + 24, wInfo, 32);
    // flow results
    const st = flowStatus();
    let xx = margin, yy = y0 + 62;
    textSize(11);
    st.forEach(s => {
      const t = s.name + ': ' + s.msg;
      const tw = textWidth(t) + 24;
      if (xx + tw > canvasWidth - margin) { xx = margin; yy += 16; }
      fill(lineArt() ? INK : s.color); circle(xx + 5, yy + 6, 8);
      fill(INK); text(t, xx + 14, yy);
      xx += tw + 8;
    });
    if (A.currency && A.currency.asOf) { fill(130); textSize(10); textAlign(LEFT, BOTTOM); text('Values are illustrative, as of ' + A.currency.asOf + '.', margin, y0 + INFO_HEIGHT - 4); }
    if (thinScaled) { fill(130); textSize(10); textAlign(RIGHT, BOTTOM); text('Thin layers are drawn wider than scale so they stay visible.', canvasWidth - margin, y0 + INFO_HEIGHT - 4); }
  }
}

function drawLegend() {
  const used = [];
  A.layers.forEach(L => { if (!used.includes(L.material)) used.push(L.material); });
  textSize(10); textStyle(NORMAL);
  let x = margin, y = isH ? drawHeight - 46 : drawHeight - 18;
  let sideLegend = false;
  if (!isH) {
    const L = verticalLayout();
    sideLegend = L.legendX >= L.labelX + LABEL_COL;    // enough room beside the labels; otherwise fall back to a row under the drawing
    if (sideLegend) { x = L.legendX; y = 20; } else { y = drawHeight - 44; }
  }
  used.forEach(key => {
    const m = MATERIALS[key] || MATERIALS.finish;
    if (!isH && sideLegend && y > drawHeight - 20) return;
    const art = lineArt();
    noStroke(); fill(m.solid ? (art ? INK : m.fill) : (art ? 255 : m.fill)); stroke(INK); strokeWeight(1);
    rect(x, y, 26, 14);
    if (!m.solid) hatch(key, x, y, 26, 14, 3);
    noStroke(); fill(INK); textAlign(LEFT, CENTER); text(m.label, x + 31, y + 7);
    if (isH || !sideLegend) { x += 31 + textWidth(m.label) + 14; if (x > canvasWidth - 90) { x = margin; y -= 18; } }
    else y += 18;
  });
}

function draw() {
  if (specError) { background(255); fill(180, 0, 0); textSize(14); text(specError, 12, 40); return; }
  background(255);
  computeLayout();
  syncQuiz();
  hovered = -1;
  layerRects.forEach((r, i) => {
    const p = px(r.a0, r.c0), q = px(r.a1, r.c1);
    if (mouseX >= min(p.x, q.x) && mouseX <= max(p.x, q.x) && mouseY >= min(p.y, q.y) && mouseY <= max(p.y, q.y) && mouseY < drawHeight) hovered = i;
  });
  labelBoxes.forEach(b => { if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) hovered = b.i; });
  A.layers.forEach((L, i) => drawLayer(i, i === hovered));
  if (profileBox && profileBox.checked()) drawProfile();
  drawFlows();
  drawCallouts();
  if (legendBox.checked() && !quizHidesNames()) drawLegend();   // material names would give the answers away
  drawInfo();
  // control-row captions (the controls themselves are p5 DOM elements)
  const top = drawHeight + INFO_HEIGHT;
  noStroke(); fill(70); textSize(12); textStyle(NORMAL); textAlign(LEFT, CENTER);
  text('Unticked layer:', margin, top + 2 * ROW + 6 + 12);
  text('Explode', 262, top + 2 * ROW + 6 + 12);
  text('Flows:', margin, top + 3 * ROW + 6 + 12);
  if (profileBox) {
    text(shortSide(A.sideA) + ' ' + fmtTemp(tempSlider.value()) + '  ·  ' + shortSide(A.sideB).toLowerCase() + ' ' + fmtTemp(A.conditions.tempB), 150, top + tempRowIndex() * ROW + 6 + 12);
  }
  // hover tooltip (hidden while a quiz question is open, because it names the layer)
  if (hovered >= 0 && mouseY < drawHeight && !quizHidesNames()) {
    const L = A.layers[hovered];
    const t = L.name + (L.r !== undefined ? '  ·  ' + fmtR(L.r) : '') + '  ·  ' + fmtThickness(L.t);
    textSize(11); const tw = textWidth(t) + 12;
    const tx = constrain(mouseX + 12, 4, canvasWidth - tw - 4), ty = constrain(mouseY + 14, 4, drawHeight - 22);
    fill(255, 255, 220); stroke(INK); strokeWeight(1); rect(tx, ty, tw, 20, 3);
    noStroke(); fill(INK); textAlign(LEFT, CENTER); text(t, tx + 6, ty + 10);
  }
}

function mousePressed() {
  if (specError) return;
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY >= drawHeight) return;
  if (quizOn()) { if (hovered >= 0) quizAnswer(hovered); return; }
  selected = hovered >= 0 ? hovered : -1;
}
