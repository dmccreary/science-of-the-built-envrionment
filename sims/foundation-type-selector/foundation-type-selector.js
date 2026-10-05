// Foundation Type Selector MicroSim - rate five foundation types green, yellow, or red for a ground profile, a load, groundwater, and frost depth
// CANVAS_HEIGHT: 585
// Bloom Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 185;
let defaultTextSize = 16;

// ---- Data ----
const SOILS = ['Firm sand', 'Soft clay', 'Peat', 'Gravel'];
const SOIL_COL = { 'Firm sand': 'wheat', 'Soft clay': 'rosybrown', 'Peat': 'saddlebrown', 'Gravel': 'darkgray' };
const FROST = { 'None': 2, '42 in': 3.5, '60 in': 5 };   // footing embedment in ft (2 ft minimum when there is no frost)
const WATER_DEPTH = 3;                                     // depth of the water table in ft when "high groundwater" is checked
const FIRM_Q = 2000, SOFT_CLAY_Q = 1000, GRAVEL_Q = 3000;  // presumptive allowable bearing in psf (illustrative, as in Chapter 9)
const BAY = 20;                                            // ft between columns: line load of a wall = column load / 20 ft

const types = [
  { key: 'spread', name: 'Spread footing', def: 'A spread footing is an isolated pad of concrete under a single column that spreads its load over the soil.', use: "Columns of a steel or glulam frame, like Riverbend's 40 kip column.", concern: 'Each exterior pad must reach below frost depth, and pads over about 8 ft square get costly.' },
  { key: 'cont', name: 'Continuous footing', def: 'A continuous footing is a long, narrow concrete strip under a loadbearing wall.', use: "Exterior and interior bearing walls, like the Riverbend perimeter.", concern: 'It needs excavation along the whole wall, and weak soil makes the strip wide.' },
  { key: 'mat', name: 'Mat foundation', def: "A mat foundation is a thick, continuous slab that spreads the whole building's load across its footprint.", use: 'Heavy loads or weak soil, where separate footings would nearly touch.', concern: 'It uses much more concrete and reinforcing steel than isolated footings.' },
  { key: 'pile', name: 'Driven pile', def: 'A pile is a long, slender column driven or screwed into the ground to reach firm soil or rock.', use: 'Soft peat or loose fill above firm soil, and heavy loads.', concern: 'Driving causes noise and vibration, and piles work in groups under a pile cap.' },
  { key: 'pier', name: 'Drilled pier', def: 'A drilled pier is a drilled hole with a steel cage, filled with concrete, sometimes with a flared bell at the base.', use: 'Large single-column loads, and sites where driving noise is a problem.', concern: 'Caving soil and water in the hole; every shaft is inspected before it is poured.' }
];
const LEVELS = [
  { word: 'Unsuitable', fill: 'mistyrose', edge: 'crimson' },
  { word: 'Marginal', fill: 'lemonchiffon', edge: 'darkgoldenrod' },
  { word: 'Suitable', fill: 'honeydew', edge: 'seagreen' }
];

// ---- State ----
let selKey = '';        // clicked foundation type
let hoverKey = '';
let R = {};             // layout rectangles
let cards = [];         // icon card hit areas

// ---- Controls ----
let soilSel, frostSel, thickSlider, loadSlider, gwBox, riverbendBtn, peatBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  soilSel = createSelect();
  SOILS.forEach(s => soilSel.option(s));
  frostSel = createSelect();
  Object.keys(FROST).forEach(f => frostSel.option(f));
  thickSlider = createSlider(0, 25, 25, 1);
  loadSlider = createSlider(10, 400, 40, 10);
  gwBox = createCheckbox('High groundwater', false);
  riverbendBtn = createButton('Riverbend defaults');
  riverbendBtn.mousePressed(() => setSite('Firm sand', 25, 40, false, '42 in'));
  peatBtn = createButton('Soft peat site');
  peatBtn.mousePressed(() => setSite('Peat', 15, 40, false, '42 in'));
  setSite('Firm sand', 25, 40, false, '42 in');
  positionControls();
  describe('A ground profile with a building above it and up to three soil layers: a top layer of firm sand, soft clay, peat, or gravel with adjustable thickness, then firm sand, then dense till. Below it, five foundation icons for spread footing, continuous footing, mat, driven pile, and drilled pier are colored green when suitable, yellow when marginal, and red when unsuitable, and each also carries a text label. Controls set the top layer, its thickness, the column load, groundwater, and frost depth. A line beneath states the governing rule.', LABEL);
}

function setSite(soil, t, load, gw, frost) {
  soilSel.selected(soil);
  thickSlider.value(t);
  loadSlider.value(load);
  gwBox.checked(gw);
  frostSel.selected(frost);
}
function positionControls() {
  soilSel.position(95, drawHeight + 8);
  frostSel.position(max(300, canvasWidth - 120), drawHeight + 8);
  thickSlider.position(sliderLeftMargin, drawHeight + 43);
  thickSlider.size(max(100, canvasWidth - sliderLeftMargin - 25));
  loadSlider.position(sliderLeftMargin, drawHeight + 78);
  loadSlider.size(max(100, canvasWidth - sliderLeftMargin - 25));
  gwBox.position(10, drawHeight + 113);
  riverbendBtn.position(10, drawHeight + 148);
  peatBtn.position(165, drawHeight + 148);
}

// ---- Rating model: returns { level, why } for each type plus the governing rule ----
function evaluate() {
  const soil = soilSel.value(), T = thickSlider.value(), P = loadSlider.value();
  const gw = gwBox.checked(), frost = frostSel.value();
  const d = FROST[frost];
  const weak = (soil === 'Soft clay' || soil === 'Peat') && T > 0;
  const W = weak ? T : 0;                       // depth to firm soil
  const dewater = gw && d >= WATER_DEPTH;       // footing bottom below the water table
  // allowable bearing at the footing level; peat is replaced with fill when it is thin enough to remove
  let q = FIRM_Q;
  if (weak && W > d) q = soil === 'Soft clay' ? SOFT_CLAY_Q : FIRM_Q;
  else if (soil === 'Gravel' && T > d) q = GRAVEL_Q;
  if (dewater) q *= 0.75;
  const side = Math.sqrt(P * 1000 / q), lineW = (P * 1000 / BAY) / q;
  const r = {};

  // shallow footings: size sets the base level, then soft layers and water cap it
  const shallow = (isSpread) => {
    const size = isSpread ? side : lineW;
    const lim = isSpread ? [8, 12] : [4, 6];
    const what = isSpread ? 'pad' : 'strip';
    const sz = isSpread ? nf(side, 0, 1) + ' ft square' : nf(lineW, 0, 1) + ' ft wide';
    let level = size <= lim[0] ? 2 : size <= lim[1] ? 1 : 0;
    let why = level === 2 ? 'Suitable: firm soil within reach of the footing, and the ' + what + ' is only ' + sz + '.' : 'The ' + what + ' grows to ' + sz + '.';
    if (level < 2) why = (level === 1 ? 'Marginal: ' : 'Unsuitable: ') + why.charAt(0).toLowerCase() + why.slice(1);
    if (W > 10) { level = 0; why = 'Unsuitable: the soft layer is ' + W + ' ft deep, so a shallow footing would settle.'; }
    else if (W > d && level > 1) { level = 1; why = 'Marginal: soft soil reaches ' + W + ' ft, below the footing depth, so it must be replaced or settlement risked.'; }
    else if (W > d) why += ' Soft soil also reaches ' + W + ' ft.';
    if (dewater && level > 1) { level = 1; why = 'Marginal: the footing sits below the water table, so expect dewatering and weaker soil.'; }
    return { level, why };
  };
  r.spread = shallow(true);
  r.cont = shallow(false);

  // mat
  let mat;
  if (W > 10) mat = soil === 'Peat' ? { level: 0, why: 'Unsuitable: a mat would float on ' + W + ' ft of peat and settle badly.' } : { level: 1, why: 'Marginal: a mat spreads load, but ' + W + ' ft of soft clay still settles over years.' };
  else if (W > d || side > 8) mat = { level: 2, why: W > d ? 'Suitable: a mat spreads the load over soft soil near the surface.' : 'Suitable: separate pads would be ' + nf(side, 0, 1) + ' ft square and nearly touch, so a mat is economical.' };
  else mat = { level: 1, why: 'Marginal: it works, but a mat uses much more concrete and steel than footings need on firm soil.' };
  r.mat = mat;

  // deep foundations
  const heavy = side > 12;
  if (W > 10) { r.pile = { level: 2, why: 'Suitable: piles pass through ' + W + ' ft of soft soil to reach firm soil.' }; r.pier = { level: 2, why: 'Suitable: a drilled pier passes through ' + W + ' ft of soft soil to firm soil.' }; }
  else if (W > d) { r.pile = { level: 1, why: 'Marginal: soft soil is only ' + W + ' ft deep, so replacing it is usually cheaper.' }; r.pier = { level: 1, why: 'Marginal: soft soil is only ' + W + ' ft deep, so replacing it is usually cheaper.' }; }
  else {
    r.pile = heavy ? { level: 2, why: 'Suitable: the load is too heavy for pads of reasonable size.' } : { level: 1, why: 'Marginal: it works, but firm soil is already within reach, so piles cost more than needed.' };
    r.pier = heavy ? { level: 2, why: 'Suitable: one large drilled pier per column suits this heavy load.' } : { level: 1, why: 'Marginal: it works, but firm soil is already within reach, so a pier costs more than needed.' };
  }
  if (gw && r.pier.level === 2) r.pier = { level: 1, why: 'Marginal: it reaches firm soil, but groundwater can cave the hole and needs casing.' };
  if (gw && r.pier.level === 1 && W > 10) r.pier.why = 'Marginal: it reaches firm soil, but groundwater can cave the hole and needs casing.';

  // governing rule line
  let rule;
  if (W > 10) rule = 'Soft layer deeper than 10 ft, so load must reach firm soil: use piles or drilled piers.';
  else if (W > d) rule = 'Soft layer reaches below the ' + frost.toLowerCase().replace('none', 'minimum') + ' footing depth (' + W + ' ft): replace it with compacted fill or use a larger footing.';
  else if (side > 12) rule = 'A footing would be ' + nf(side, 0, 1) + ' ft square, too large, so spread the load with a mat or reach firm soil with piers or piles.';
  else if (side > 8) rule = 'Footings are getting large (' + nf(side, 0, 1) + ' ft square): a mat may cost less than many big pads.';
  else rule = 'Firm soil is within reach of a footing at ' + (frost === 'None' ? 'the 2 ft minimum depth' : 'the ' + frost + ' frost depth') + ', so shallow footings govern.';
  if (gw) rule += ' High groundwater: ' + (dewater ? 'the footing bottoms are below the 3 ft water table, so plan for dewatering and reduced bearing.' : 'the 3 ft water table is below the shallow footings, but drilled shafts can cave.');
  return { soil, T, P, gw, frost, d, W, q, side, lineW, r, rule, dewater };
}

// ---- Layout ----
function layout() {
  const W = canvasWidth, wide = W >= 640;
  R = { wide };
  if (wide) {
    R.prof = { x: 10, y: 44, w: floor(W * 0.5), h: 206 };
    R.side = { x: R.prof.x + R.prof.w + 8, y: 44, w: W - R.prof.w - 28, h: 206 };
    R.cardY = 256; R.cardH = 94;
    R.rule = { x: 10, y: 354, w: W - 20, h: drawHeight - 354 - 6 };
  } else {
    R.prof = { x: 10, y: 44, w: W - 20, h: 146 };
    R.cardY = 196; R.cardH = 100;
    R.rule = { x: 10, y: 302, w: W - 20, h: drawHeight - 302 - 6 };
  }
  const gap = wide ? 8 : 4;
  R.cw = (W - 20 - 4 * gap) / 5;
  cards = types.map((t, i) => ({ key: t.key, x: 10 + i * (R.cw + gap), y: R.cardY, w: R.cw, h: R.cardH }));
}

function draw() {
  updateCanvasSize();
  layout();
  const m = evaluate();

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
  text('Foundation Type Selector', canvasWidth / 2, 8);

  hoverKey = '';
  cards.forEach(c => { if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= c.y && mouseY <= c.y + c.h) hoverKey = c.key; });
  const focus = selKey || bestKey(m);
  drawProfile(m, focus);
  if (R.wide) drawSidePanel(m);
  drawCards(m);
  drawRule(m);
  if (!R.wide && selKey) drawInfoOverlay();
  if (hoverKey && (R.wide || !selKey)) drawTip(m);
  drawControlLabels();
}

function bestKey(m) {
  for (const t of types) if (m.r[t.key].level === 2) return t.key;
  for (const t of types) if (m.r[t.key].level === 1) return t.key;
  return 'pile';
}

// ---- Ground profile ----
function drawProfile(m, focus) {
  const p = R.prof;
  stroke('silver');
  strokeWeight(1);
  fill('aliceblue');
  rect(p.x, p.y, p.w, p.h, 6);
  const bh = p.h * 0.22;                      // building height in px
  const gy = p.y + bh + 6;                    // ground surface
  const sc = (p.y + p.h - gy - 4) / 40;       // px per ft, depth 0 to 40 ft
  const ax = p.x + 30;                        // ground starts right of the depth axis
  const gw = p.w - 36, cx = ax + gw / 2;
  const dy = ft => gy + ft * sc;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(p.x, p.y, p.w, p.h);
  drawingContext.clip();
  // layers
  noStroke();
  fill('khaki');
  rect(ax, dy(0), gw, 40 * sc);
  fill('slategray');
  rect(ax, dy(30), gw, 10 * sc);
  if (m.T > 0) { fill(SOIL_COL[m.soil]); rect(ax, dy(0), gw, m.T * sc); }
  // layer labels
  fill(m.T > 0 && (m.soil === 'Peat') ? 'white' : 'black');
  textSize(13);
  textAlign(LEFT, TOP);
  if (m.T > 0 && m.T * sc >= 16) text(m.soil + ', ' + m.T + ' ft', ax + 6, dy(0) + 2);
  fill('black');
  text('Firm sand (2,000 psf)', ax + 6, dy(max(m.T, 0)) + 2 + (m.T > 0 ? 0 : 0));
  fill('white');
  text('Dense till / rock', ax + 6, dy(30) + 2);
  // 10 ft rule line
  stroke('darkorange');
  strokeWeight(2);
  drawingContext.setLineDash([6, 4]);
  line(ax, dy(10), ax + gw, dy(10));
  drawingContext.setLineDash([]);
  noStroke();
  fill('darkorange');
  textAlign(LEFT, TOP);
  text('10 ft', ax + 6, dy(10) + 1);
  // frost depth and water table
  if (m.frost !== 'None') {
    stroke('royalblue');
    strokeWeight(2);
    drawingContext.setLineDash([3, 4]);
    line(ax, dy(m.d), ax + gw, dy(m.d));
    drawingContext.setLineDash([]);
    noStroke();
    fill('royalblue');
    textAlign(RIGHT, TOP);
    text('Frost ' + m.frost, ax + gw - 4, dy(m.d) + 1);
  }
  if (m.gw) {
    stroke('blue');
    strokeWeight(2);
    line(ax, dy(WATER_DEPTH), ax + gw, dy(WATER_DEPTH));
    noStroke();
    fill('blue');
    triangle(ax + 14, dy(WATER_DEPTH), ax + 6, dy(WATER_DEPTH) - 9, ax + 22, dy(WATER_DEPTH) - 9);
    textAlign(LEFT, TOP);
    text('Water table 3 ft', ax + 28, dy(WATER_DEPTH) - 11);
  }
  // building above grade with a column load arrow
  noStroke();
  fill('white');
  const bw = min(110, gw * 0.4);
  stroke('dimgray');
  strokeWeight(2);
  rect(cx - bw / 2, p.y + 6, bw, bh - 4);
  line(cx - bw / 2 - 6, p.y + 6, cx, p.y + 2);
  line(cx, p.y + 2, cx + bw / 2 + 6, p.y + 6);
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, CENTER);
  text(m.P + ' kip column', cx, p.y + bh / 2 + 3);
  // the focused foundation type
  drawFoundation(focus, m, cx, gy, sc, bh, p);
  drawingContext.restore();
  // depth axis
  noStroke();
  fill('black');
  textSize(12);
  textAlign(RIGHT, CENTER);
  [0, 10, 20, 30, 40].forEach(f => { if (dy(f) <= p.y + p.h - 4) text(f, ax - 4, dy(f) + (f === 40 ? -6 : 0)); });
  textAlign(LEFT, TOP);
  text('ft', p.x + 4, p.y + p.h - 16);
  fill('dimgray');
  textAlign(RIGHT, TOP);
  textSize(12);
  text('Showing: ' + typeName(focus), p.x + p.w - 6, p.y + 4);
}
function typeName(k) { return types.find(t => t.key === k).name; }

// schematic of the foundation type (widths are not to scale)
function drawFoundation(k, m, cx, gy, sc, bh, p) {
  const top = p.y + bh + 2;
  stroke('black');
  strokeWeight(1.5);
  fill('lightgray');
  const dEmb = m.d * sc;
  if (k === 'spread' || k === 'cont') {
    const w = k === 'spread' ? 34 : 54;
    rect(cx - 5, top, 10, gy + dEmb - top);              // column or wall stem
    rect(cx - w / 2, gy + dEmb - 4, w, 8);
  } else if (k === 'mat') {
    rect(cx - 70, gy + dEmb - 5, 140, 10);
    [-52, 0, 52].forEach(x => rect(cx + x - 4, top, 8, gy + dEmb - top));
  } else if (k === 'pile') {
    const toe = min(38, (m.W > 0 ? m.W : 8) + 8) * sc;
    rect(cx - 28, gy - 4, 56, 7);
    [-20, 0, 20].forEach(x => rect(cx + x - 3, gy + 3, 6, toe));
    rect(cx - 4, top, 8, gy - top);
  } else {
    const toe = min(38, max(m.W, 4) + 6) * sc;
    rect(cx - 7, gy - 2, 14, toe);
    ellipse(cx, gy + toe, 30, 12);
    rect(cx - 4, top, 8, gy - top);
  }
}

// ---- Wide layout: site summary and infobox ----
function drawSidePanel(m) {
  const s = R.side;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(s.x, s.y, s.w, s.h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  let y = s.y + 6;
  const lines = [
    'Footing depth: ' + nf(m.d, 0, 1) + ' ft (' + (m.frost === 'None' ? '2 ft minimum' : m.frost + ' frost depth') + ')',
    'Soft layer to firm soil: ' + (m.W > 0 ? m.W + ' ft' : 'none'),
    'Bearing at footing: ' + fmtN(m.q) + ' psf (illustrative)',
    'Spread pad: ' + nf(m.side, 0, 1) + ' ft square; strip: ' + nf(m.lineW, 0, 1) + ' ft wide'
  ];
  lines.forEach(l => { y = wrapText(l, s.x + 8, y, s.w - 16, 17); });
  stroke('silver');
  line(s.x + 6, y + 3, s.x + s.w - 6, y + 3);
  noStroke();
  y += 8;
  if (selKey) {
    const t = types.find(q => q.key === selKey);
    fill('navy');
    y = wrapText(t.name + ' (click again to close)', s.x + 8, y, s.w - 16, 17);
    fill('black');
    y = wrapText('Typical use: ' + t.use, s.x + 8, y, s.w - 16, 17);
    wrapText('Concern: ' + t.concern, s.x + 8, y, s.w - 16, 17);
  } else {
    fill('dimgray');
    wrapText('Click a foundation icon for its typical use and one cost or constructability concern.', s.x + 8, y, s.w - 16, 17);
  }
}
function fmtN(n) { return Math.round(n).toLocaleString('en-US'); }

// ---- Icon cards ----
function drawCards(m) {
  cards.forEach(c => {
    const t = types.find(q => q.key === c.key), lv = LEVELS[m.r[c.key].level];
    stroke(lv.edge);
    strokeWeight(c.key === selKey ? 5 : (c.key === hoverKey ? 4 : 2));
    fill(lv.fill);
    rect(c.x, c.y, c.w, c.h, 8);
    drawGlyph(c.key, c.x + c.w / 2, c.y + 8, R.wide ? 1 : 0.8);
    noStroke();
    fill('black');
    textAlign(CENTER, TOP);
    textSize(R.wide ? 14 : 13);
    const nameW = c.w - 6;
    let ts = R.wide ? 14 : 13;
    textSize(ts);
    if (textWidth(t.name.split(' ')[0]) > nameW) { ts = 12; textSize(ts); }
    wrapCentered(t.name, c.x + c.w / 2, c.y + (R.wide ? 50 : 36), nameW, ts + 3);
    // rating mark plus the word, so color is never the only signal
    const level = m.r[c.key].level;
    textSize(R.wide ? 14 : 12);
    textAlign(CENTER, CENTER);
    const label = lv.word, tw = textWidth(label);
    const my = R.wide ? c.y + c.h - 18 : c.y + c.h - 11;
    const mx = R.wide ? c.x + c.w / 2 - tw / 2 - 8 : c.x + c.w / 2;
    const mmy = R.wide ? my : c.y + c.h - 29;
    fill(lv.edge);
    text(label, c.x + c.w / 2 + (R.wide ? 8 : 0), my);
    stroke(lv.edge);
    strokeWeight(2.5);
    noFill();
    if (level === 2) { line(mx - 5, mmy, mx - 1, mmy + 4); line(mx - 1, mmy + 4, mx + 6, mmy - 5); }
    else if (level === 1) { line(mx, mmy - 6, mx, mmy + 1); point(mx, mmy + 5); }
    else { line(mx - 5, mmy - 5, mx + 5, mmy + 5); line(mx - 5, mmy + 5, mx + 5, mmy - 5); }
  });
}
function wrapCentered(str, cx, y, w, lh) {
  let line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { text(line, cx, y); y += lh; line = word; } else line = trial;
  }
  if (line) text(line, cx, y);
}

// tiny schematic of each foundation type
function drawGlyph(k, cx, y, s) {
  stroke('dimgray');
  strokeWeight(1.5);
  fill('gray');
  if (k === 'spread') { rect(cx - 3 * s, y, 6 * s, 20 * s); rect(cx - 15 * s, y + 20 * s, 30 * s, 8 * s); }
  else if (k === 'cont') { rect(cx - 14 * s, y, 28 * s, 6 * s); rect(cx - 4 * s, y + 6 * s, 8 * s, 14 * s); rect(cx - 17 * s, y + 20 * s, 34 * s, 8 * s); }
  else if (k === 'mat') { [-16, 0, 16].forEach(x => rect(cx + (x - 2) * s, y, 4 * s, 18 * s)); rect(cx - 24 * s, y + 18 * s, 48 * s, 10 * s); }
  else if (k === 'pile') { rect(cx - 15 * s, y, 30 * s, 6 * s); [-10, 0, 10].forEach(x => rect(cx + (x - 1.5) * s, y + 6 * s, 3 * s, 24 * s)); }
  else { rect(cx - 4 * s, y, 8 * s, 24 * s); ellipse(cx, y + 26 * s, 20 * s, 8 * s); }
}

// ---- Justification line ----
function drawRule(m) {
  const r = R.rule;
  stroke('seagreen');
  strokeWeight(2);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  wrapText('Rule: ' + m.rule, r.x + 8, r.y + 5, r.w - 16, 17);
}

// ---- Tooltip: definition and the main reason for the rating ----
function drawTip(m) {
  const t = types.find(q => q.key === hoverKey), res = m.r[hoverKey];
  textSize(14);
  const w = min(canvasWidth - 20, 320);
  const body = t.def + ' ' + res.why;
  const h = wrapCount(body, w - 16) * 17 + 12;
  const x = min(max(mouseX - w / 2, 6), canvasWidth - w - 6);
  const y = max(44, R.cardY - h - 6);
  stroke(LEVELS[res.level].edge);
  strokeWeight(2);
  fill(255, 255, 240, 250);
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  wrapText(body, x + 8, y + 6, w - 16, 17);
}

// narrow layout: infobox overlays the profile
function drawInfoOverlay() {
  const t = types.find(q => q.key === selKey), p = R.prof, res = evaluate().r[selKey];
  stroke('navy');
  strokeWeight(3);
  fill(255, 255, 240, 250);
  rect(p.x, p.y, p.w, p.h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  fill('navy');
  let y = wrapText(t.name + ' (tap again to close)', p.x + 8, p.y + 6, p.w - 16, 17);
  fill('black');
  y = wrapText('Typical use: ' + t.use, p.x + 8, y + 2, p.w - 16, 17);
  y = wrapText('Concern: ' + t.concern, p.x + 8, y + 2, p.w - 16, 17);
  fill(LEVELS[res.level].edge);
  wrapText(res.why, p.x + 8, y + 2, p.w - 16, 17);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Top layer:', 10, drawHeight + 21);
  text('Frost:', max(300, canvasWidth - 120) - 56, drawHeight + 21);
  text('Layer thickness: ' + thickSlider.value() + ' ft', 10, drawHeight + 55);
  text('Column load: ' + loadSlider.value() + ' kips', 10, drawHeight + 90);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  if (hoverKey) selKey = (selKey === hoverKey) ? '' : hoverKey;
  else if (!R.wide && selKey) selKey = '';
}

// word-wrapped text drawn line by line; returns the y after the last line
function wrapText(str, x, y, w, lh) {
  let line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { text(line, x, y); y += lh; line = word; } else line = trial;
  }
  if (line) { text(line, x, y); y += lh; }
  return y;
}
function wrapCount(str, w) {
  let n = 1, line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { n++; line = word; } else line = trial;
  }
  return n;
}

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
