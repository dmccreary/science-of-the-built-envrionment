// Electrical Service Path Explorer MicroSim - follow power from the utility primary line to the loads, with voltage, current, ratings, and breaker trips
// CANVAS_HEIGHT: 500
// Bloom Level 1 (Remember) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 385;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 185;
let defaultTextSize = 16;

const SQRT3 = 1.732;
const WIDE_MIN = 720;          // at or above this width the eight stages sit in one row
const PANEL_SHARE = 0.4;       // illustrative: this feeder and panelboard serve 40 percent of the building load
const BRANCH_CIRCUITS = 10;    // illustrative: the panelboard load is shared by ten branch circuits

// ---- Data: three service types (primary voltage values are illustrative; they vary by utility) ----
const services = [
  { name: '120/240 V single-phase', phase: 1, vll: 240, vText: '120/240 V', branchV: '120 V', loadV: '120/240 V',
    primaryV: 7200, loadsDetail: 'light and receptacle 120 V, motor 240 V (a 1 hp motor draws about 8 A)' },
  { name: '208Y/120 V three-phase', phase: 3, vll: 208, vText: '208Y/120 V', branchV: '120 V', loadV: '120/208 V',
    primaryV: 12470, loadsDetail: 'light and receptacle 120 V, motor 208 V (a 1 hp motor draws about 4.6 A)' },
  { name: '480Y/277 V three-phase', phase: 3, vll: 480, vText: '480Y/277 V', branchV: '277 V', loadV: '277/480 V',
    primaryV: 12470, loadsDetail: 'light 277 V, receptacle 120 V (from a step-down transformer), motor 480 V (a 1 hp motor draws about 2.1 A)' }
];

// ---- Data: the eight stages, left to right (installed ratings are illustrative Riverbend values) ----
const stages = [
  { name: 'Utility primary line', sub: '', owner: 'Utility', ratingShort: '', ratingLong: 'set by the utility',
    fn: 'Carries power at thousands of volts from the substation to the street. High voltage keeps current and line loss small.',
    prot: 'Utility fuses and reclosers',
    code: 'Utility-owned. It follows utility standards, not the building wiring code, and is protected by utility fuses.' },
  { name: 'Pad-mounted transformer', sub: '', owner: 'Utility', ratingShort: '75 kVA', ratingLong: '75 kVA',
    fn: 'Steps the primary voltage down to the service voltage. The utility sizes it from the owner\'s load estimate.',
    prot: 'Utility fuses',
    code: 'The utility picks the next standard size above the estimate (75 kVA for Riverbend\'s 72 kVA). It needs ventilation and clearance.' },
  { name: 'Meter', sub: '', owner: 'Utility', ratingShort: '200 A', ratingLong: '200 A meter socket',
    fn: 'Measures energy in kWh and peak demand in kW for the utility bill.',
    prot: 'Utility fuses (the meter is ahead of the main breaker)',
    code: 'Sits at the handoff between utility and owner. The utility sets metering rules, and the socket must match the service rating.' },
  { name: 'Service entrance', sub: '+ main breaker', owner: 'Owner', ratingShort: '200 A', ratingLong: '200 A main breaker',
    fn: 'First disconnect and overcurrent protection for the whole building. The main breaker can shut off all power.',
    prot: 'Main breaker, 200 A',
    code: 'NEC: the disconnect must be readily accessible, and at most six switches or breakers may serve as the main.' },
  { name: 'Feeder', sub: '', owner: 'Owner', ratingShort: '100 A', ratingLong: '100 A feeder breaker',
    fn: 'Carries power from the service equipment to a panelboard. It is sized for all the loads downstream of it.',
    prot: 'Feeder breaker, 100 A',
    code: 'NEC informational note: aim for about 3 percent voltage drop on a feeder. This is a design goal, not a requirement.' },
  { name: 'Panelboard', sub: '+ breakers', owner: 'Owner', ratingShort: '100 A bus', ratingLong: '100 A bus',
    fn: 'One feeder comes in and many branch circuits go out. Busbars and breakers divide the current among the circuits.',
    prot: 'Branch breakers (the feeder breaker is upstream)',
    code: 'A panel schedule lists each circuit, breaker, and load. Breaker interrupting ratings must exceed the available fault current.' },
  { name: 'Branch circuit', sub: '', owner: 'Owner', ratingShort: '20 A', ratingLong: '20 A breaker, 12 AWG wire',
    fn: 'The wiring from the final breaker to the lights, outlets, and equipment. This is the part occupants touch.',
    prot: '20 A branch breaker',
    code: 'Breaker and wire are matched: 20 A with 12 AWG. A continuous load may use only 80 percent of the rating, which is 16 A.' },
  { name: 'Loads', sub: 'light, receptacle, motor', owner: 'Owner', ratingShort: '', ratingLong: 'limited by the 20 A branch breaker',
    fn: 'The light, receptacle, and motor are wired in parallel, so each one gets the full circuit voltage.',
    prot: 'The same 20 A branch breaker',
    code: 'Receptacles are counted at 180 VA each. A motor nameplate gives its minimum circuit ampacity and maximum breaker size.' }
];

// breakers the learner can trip: boundary = index of the first stage that goes dark
const breakers = [
  { label: 'Main breaker (200 A)', boundary: 3, name: 'Main breaker',
    msg: 'Main breaker tripped. Service entrance through loads are dark; utility, transformer, and meter stay energized.',
    short: 'Main breaker tripped: the whole building is dark.' },
  { label: 'Feeder breaker (100 A)', boundary: 4, name: 'Feeder breaker',
    msg: 'Feeder breaker tripped. Feeder through loads are dark; the service entrance and everything upstream stay energized.',
    short: 'Feeder breaker tripped: feeder and loads are dark.' },
  { label: 'Branch breaker (20 A)', boundary: 6, name: 'Branch breaker',
    msg: 'Branch breaker tripped. Only the branch circuit and its loads are dark; the panelboard stays energized.',
    short: 'Branch breaker tripped: only the circuit is dark.' }
];

// ---- State ----
let tripped = false;
let selected = -1;   // stage whose infobox is open
let hoverStage = -1;
let hoverMarker = -1;
let rects = [];      // block rectangles, filled by layout()
let markers = [];    // breaker marker positions, filled by layout()
let panelRect = null;
let wide = true;

// ---- Controls ----
let serviceSelect, loadSlider, breakerSelect, tripButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  serviceSelect = createSelect();
  services.forEach(s => serviceSelect.option(s.name));
  serviceSelect.selected(services[1].name);

  loadSlider = createSlider(10, 500, 72, 1);

  breakerSelect = createSelect();
  breakers.forEach(b => breakerSelect.option(b.label));
  breakerSelect.selected(breakers[0].label);

  tripButton = createButton('Trip a breaker');
  tripButton.mousePressed(() => { tripped = !tripped; tripButton.html(tripped ? 'Reset the breaker' : 'Trip a breaker'); });

  positionControls();
  describe('A left-to-right one-line diagram with eight stages: utility primary line, pad-mounted transformer, meter, service entrance with main breaker, feeder, panelboard with breakers, branch circuit, and loads. Utility-owned stages are blue and owner-owned stages are green. Voltage and current labels sit above each stage. A service type menu and a building load slider change the labels, stages whose rating is exceeded turn red, and a button trips a chosen breaker so everything downstream turns dark gray. Clicking a stage opens an infobox. On narrow screens the stages stack vertically.', LABEL);
}

function selectWidth() { return min(230, canvasWidth - 115); }
function sliderWidth() { return max(120, canvasWidth - sliderLeftMargin - 15); }
function breakerSelectWidth() { return min(240, canvasWidth - 150); }

function positionControls() {
  serviceSelect.position(105, drawHeight + 9);
  serviceSelect.size(selectWidth());
  loadSlider.position(sliderLeftMargin, drawHeight + 46);
  loadSlider.size(sliderWidth());
  breakerSelect.position(10, drawHeight + 79);
  breakerSelect.size(breakerSelectWidth());
  tripButton.position(20 + breakerSelectWidth(), drawHeight + 78);
}

function svc() { return services.find(s => s.name === serviceSelect.value()) || services[1]; }
function trip() { return breakers.find(b => b.label === breakerSelect.value()) || breakers[0]; }
function firstDead() { return tripped ? trip().boundary : 99; }

// ---- Calculation: current at every stage for the chosen service type and building load ----
function fmtA(x) { return x >= 100 ? Math.round(x).toLocaleString('en-US') + ' A' : x.toFixed(1) + ' A'; }
function fmtV(x) { return Math.round(x).toLocaleString('en-US') + ' V'; }

function computeStages() {
  const s = svc();
  const kva = loadSlider.value();
  const I = s.phase === 3 ? kva * 1000 / (SQRT3 * s.vll) : kva * 1000 / s.vll;
  const Iprim = s.phase === 3 ? kva * 1000 / (SQRT3 * s.primaryV) : kva * 1000 / s.primaryV;
  const Ip = I * PANEL_SHARE;
  const Ib = Ip / BRANCH_CIRCUITS;
  const d = [
    { v: fmtV(s.primaryV), vDetail: fmtV(s.primaryV) + (s.phase === 3 ? ' three-phase' : ' to neutral') + ' (illustrative)', amps: Iprim, val: Iprim, rating: null },
    { v: s.vText, vDetail: fmtV(s.primaryV) + ' in, ' + s.vText + ' out', amps: I, val: kva, rating: 75 },
    { v: s.vText, vDetail: s.vText, amps: I, val: I, rating: 200 },
    { v: s.vText, vDetail: s.vText, amps: I, val: I, rating: 200 },
    { v: s.vText, vDetail: s.vText, amps: Ip, val: Ip, rating: 100 },
    { v: s.vText, vDetail: s.vText, amps: Ip, val: Ip, rating: 100 },
    { v: s.branchV, vDetail: s.branchV + ' to neutral', amps: Ib, val: Ib, rating: 20 },
    { v: s.loadV, vDetail: s.loadsDetail, amps: Ib, val: Ib, rating: null }
  ];
  const dead = firstDead();
  d.forEach((x, i) => {
    x.dead = i >= dead;
    x.over = !x.dead && x.rating !== null && x.val > x.rating + 1e-9;
  });
  return d;
}

// ---- Layout: one row of eight blocks when wide, a vertical stack when narrow ----
function layout() {
  wide = canvasWidth >= WIDE_MIN;
  rects = []; markers = [];
  if (wide) {
    const gap = 16, bw = (canvasWidth - 20 - gap * 7) / 8, y = 96, h = 84;
    for (let i = 0; i < 8; i++) rects.push({ x: 10 + i * (bw + gap), y: y, w: bw, h: h });
    breakers.forEach((b, k) => markers.push({ x: rects[b.boundary].x - gap / 2, y: y + h / 2, k: k }));
    panelRect = { x: 10, y: 252, w: canvasWidth - 20, h: 129 };
  } else {
    const gap = 4, h = 33, y0 = 40;
    for (let i = 0; i < 8; i++) rects.push({ x: 10, y: y0 + i * (h + gap), w: canvasWidth - 20, h: h });
    breakers.forEach((b, k) => markers.push({ x: 28, y: rects[b.boundary].y - gap / 2, k: k }));
    panelRect = null; // narrow: the infobox is an overlay placed when a stage is selected
  }
}

function draw() {
  updateCanvasSize();
  const d = computeStages();
  layout();

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
  text('Electrical Service Path Explorer', canvasWidth / 2, 8);

  // hover tests (the infobox overlay, when open in narrow mode, blocks the stages beneath it)
  hoverStage = -1; hoverMarker = -1;
  const overlay = !wide && selected >= 0 ? overlayRect(d) : null;
  const inOverlay = overlay && mouseX >= overlay.x && mouseX <= overlay.x + overlay.w && mouseY >= overlay.y && mouseY <= overlay.y + overlay.h;
  if (mouseY >= 0 && mouseY < drawHeight && !inOverlay) {
    markers.forEach(m => { if (abs(mouseX - m.x) <= 9 && abs(mouseY - m.y) <= 9) hoverMarker = m.k; });
    if (hoverMarker < 0) rects.forEach((r, i) => { if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) hoverStage = i; });
  }

  if (wide) drawLegend();
  drawPath(d);
  rects.forEach((r, i) => drawBlock(r, i, d[i]));
  markers.forEach(m => drawMarker(m));
  drawMessage(d);
  if (wide) drawInfobox(panelRect.x, panelRect.y, panelRect.w, panelRect.h, d);
  else if (overlay) drawInfobox(overlay.x, overlay.y, overlay.w, overlay.h, d);
  drawTooltip();
  drawControlLabels();
  cursor(hoverStage >= 0 || hoverMarker >= 0 || inOverlay ? HAND : ARROW);
}

// ---- Wrapping helper: returns the lines that fit in width w at the current text size ----
function wrapLines(str, w) {
  const out = [];
  let ln = '';
  for (const word of str.split(' ')) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { out.push(ln); ln = word; } else ln = t;
  }
  if (ln) out.push(ln);
  return out;
}

function ownerColor(i) { return stages[i].owner === 'Utility' ? 'royalblue' : 'forestgreen'; }
function stateOf(i, d) { return d.dead ? 'dead' : (d.over ? 'over' : 'ok'); }
function stateText(st) { return st === 'dead' ? 'DE-ENERGIZED' : (st === 'over' ? 'OVER RATING' : 'In rating'); }
function blockFill(i, d) {
  const st = stateOf(i, d);
  return st === 'dead' ? 'darkslategray' : (st === 'over' ? 'crimson' : ownerColor(i));
}

// ---- Legend (wide only): colors plus the breaker symbol ----
function drawLegend() {
  const items = [['royalblue', 'Utility-owned'], ['forestgreen', 'Owner-owned'], ['darkslategray', 'De-energized'], ['crimson', 'Rating exceeded']];
  textSize(14);
  let total = 0;
  items.forEach(it => { total += 18 + textWidth(it[1]) + 16; });
  total += 18 + textWidth('Breaker (gold = tripped)');
  let x = (canvasWidth - total) / 2;
  const y = 40;
  textAlign(LEFT, TOP);
  items.forEach(it => {
    fill(it[0]); noStroke();
    rect(x, y + 1, 13, 13, 3);
    fill('black');
    text(it[1], x + 18, y);
    x += 18 + textWidth(it[1]) + 16;
  });
  stroke('black'); strokeWeight(2); fill('white');
  rect(x, y + 1, 13, 13, 3);
  noStroke(); fill('black');
  text('Breaker (gold = tripped)', x + 18, y);
}

// ---- Path of power: black when energized, gray dashed when dark ----
function drawPath(d) {
  const dead = firstDead();
  for (let i = 1; i < 8; i++) {
    const a = rects[i - 1], b = rects[i];
    const p1 = wide ? { x: a.x + a.w, y: a.y + a.h / 2 } : { x: 28, y: a.y + a.h };
    const p2 = wide ? { x: b.x, y: b.y + b.h / 2 } : { x: 28, y: b.y };
    const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    seg(p1, i === dead ? mid : p2, i > dead);
    if (i === dead) seg(mid, p2, true);
  }
}
function seg(p, q, off) {
  stroke(off ? 'gray' : 'black');
  strokeWeight(off ? 3 : 4);
  if (off) drawingContext.setLineDash([4, 3]);
  line(p.x, p.y, q.x, q.y);
  drawingContext.setLineDash([]);
}

function drawMarker(m) {
  const open = tripped && trip().boundary === breakers[m.k].boundary;
  const hov = hoverMarker === m.k;
  stroke(hov ? 'navy' : 'black');
  strokeWeight(hov ? 3 : 2);
  fill(open ? 'gold' : 'white');
  rect(m.x - 6, m.y - 6, 12, 12, 3);
  if (open) { line(m.x - 4, m.y - 4, m.x + 4, m.y + 4); line(m.x + 4, m.y - 4, m.x - 4, m.y + 4); }
}

// ---- One stage: block, labels, and tags ----
function drawBlock(r, i, d) {
  const st = stateOf(i, d);
  const isSel = i === selected, isHov = i === hoverStage;
  stroke(isSel ? 'black' : (isHov ? 'navy' : 'white'));
  strokeWeight(isSel ? 4 : (isHov ? 3 : 1));
  fill(blockFill(i, d));
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();

  const volts = d.dead ? '0 V' : d.v;
  const amps = d.dead ? '0 A' : fmtA(d.amps);
  const stg = stages[i];

  if (wide) {
    // voltage and current above the path
    fill(d.dead ? 'dimgray' : 'black');
    textAlign(CENTER, TOP);
    textSize(fitSize(volts, r.w + 12, 14));
    text(volts, r.x + r.w / 2, 58);
    fill(st === 'over' ? 'crimson' : (d.dead ? 'dimgray' : 'black'));
    textSize(fitSize(amps, r.w + 12, 14));
    text(amps, r.x + r.w / 2, 75);
    // name and sub-label inside the block
    fill('white');
    const inner = r.w - 8;
    let size = 14;
    stg.name.split(' ').forEach(w => { size = min(size, fitSize(w, inner, 14)); });
    textSize(size);
    let y = r.y + 5;
    textAlign(CENTER, TOP);
    wrapLines(stg.name, inner).forEach(l => { text(l, r.x + r.w / 2, y); y += size + 2; });
    if (stg.sub) {
      textSize(12);
      wrapLines(stg.sub, inner).forEach(l => { text(l, r.x + r.w / 2, y); y += 14; });
    }
    if (stg.ratingShort) { textSize(12); text(stg.ratingShort, r.x + r.w / 2, r.y + r.h - 16); }
    // owner and state tags below the block
    textSize(12);
    fill(ownerColor(i));
    text(stg.owner.toUpperCase(), r.x + r.w / 2, r.y + r.h + 4);
    fill(st === 'over' ? 'crimson' : (st === 'dead' ? 'dimgray' : 'black'));
    textStyle(st === 'ok' ? NORMAL : BOLD);
    text(stateText(st), r.x + r.w / 2, r.y + r.h + 18);
    textStyle(NORMAL);
  } else {
    fill('white');
    textAlign(LEFT, TOP);
    textSize(14);
    text(stg.name + (stg.sub ? ' ' + stg.sub : ''), r.x + 8, r.y + 2);
    textSize(12);
    text(stg.owner.toUpperCase() + (stg.ratingShort ? ' · ' + stg.ratingShort : '') + ' · ' + stateText(st), r.x + 8, r.y + 18);
    textAlign(RIGHT, TOP);
    textSize(14);
    text(volts, r.x + r.w - 8, r.y + 2);
    textSize(12);
    text(amps, r.x + r.w - 8, r.y + 18);
  }
}

// largest size (down to 11) at which str fits in width w
function fitSize(str, w, maxSize) {
  let s = maxSize;
  textSize(s);
  while (s > 11 && textWidth(str) > w) { s--; textSize(s); }
  return s;
}

// ---- Status message under the diagram (wide) or at the bottom (narrow) ----
function drawMessage(d) {
  const overNames = d.map((x, i) => x.over ? stages[i].name : null).filter(n => n);
  const lines = [];
  if (tripped) lines.push({ t: (wide ? trip().msg : trip().short), c: 'black', b: true });
  if (overNames.length) {
    lines.push({ t: wide ? 'Rating exceeded. Select larger equipment: ' + overNames.join(', ') + '.' : 'Rating exceeded. Select larger equipment (red rows).', c: 'crimson', b: true });
  } else if (!tripped) {
    lines.push({ t: 'All equipment is within its rating at this load.', c: 'darkgreen', b: false });
  }
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  let y = wide ? 216 : 337;
  const x = 10, w = canvasWidth - 20;
  lines.forEach(l => {
    fill(l.c);
    textStyle(l.b ? BOLD : NORMAL);
    wrapLines(l.t, w).forEach(s => { if (y < drawHeight - 10) text(s, x, y); y += 16; });
  });
  textStyle(NORMAL);
}

// ---- Infobox: what the selected stage does, with numbers for the chosen service and load ----
function infoLines(i, d, w) {
  const st = stages[i], x = d[i];
  const stText = x.dead ? 'DE-ENERGIZED' : (x.over ? 'RATING EXCEEDED' : 'in rating');
  const volt = x.dead ? '0 V (de-energized)' : x.vDetail;
  const cur = x.dead ? '0 A' : fmtA(x.amps) + (i === 7 ? ' total on the circuit' : '');
  const out = [];
  textSize(16);
  wrapLines(st.name + ' (' + st.owner + '-owned, ' + stText + ')', w).forEach(l => out.push({ t: l, s: 16, b: true, c: 'black' }));
  textSize(14);
  [['Function: ', st.fn], ['Voltage: ' + volt + '. Current at this load: ' + cur + '. Rating: ', st.ratingLong + '.'],
   ['Protection: ', st.prot + '.'], ['Code idea: ', st.code]].forEach(p => {
    wrapLines(p[0] + p[1], w).forEach(l => out.push({ t: l, s: 14, b: false, c: 'black' }));
  });
  return out;
}

function overlayRect(d) {
  const w = canvasWidth - 12;
  textSize(14);
  const n = infoLines(selected, d, w - 20).length;
  const h = n * 16 + 32; // room for the close hint
  const r = rects[selected];
  const topOK = r.y >= 36 + h + 2;
  const y = topOK ? 36 : drawHeight - h - 4;
  return { x: 6, y: y, w: w, h: h };
}

function drawInfobox(x, y, w, h, d) {
  stroke(selected >= 0 ? 'navy' : 'silver');
  strokeWeight(selected >= 0 ? 2 : 1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  let ty = y + 7;
  if (selected < 0) {
    fill('black');
    textSize(14);
    wrapLines('Click any block to see its function, voltage, current at this load, owner, and the code idea that governs it. Hover over a block or a breaker for its name. Power flows from left to right.', w - 20).forEach(l => { text(l, x + 10, ty); ty += 17; });
    return;
  }
  infoLines(selected, d, w - 20).forEach(l => {
    fill(l.c);
    textSize(l.s);
    textStyle(l.b ? BOLD : NORMAL);
    text(l.t, x + 10, ty);
    ty += l.s + 2;
  });
  textStyle(NORMAL);
  if (!wide) { textSize(12); fill('dimgray'); textAlign(RIGHT, TOP); text('Tap this box to close', x + w - 8, y + h - 16); }
}

// ---- Hover tooltip: the name (and owner) of the block or breaker under the mouse ----
function drawTooltip() {
  let lines = null;
  if (hoverMarker >= 0) lines = [breakers[hoverMarker].name + ' (' + breakers[hoverMarker].label.match(/\((.*)\)/)[1] + ')', tripped && trip().boundary === breakers[hoverMarker].boundary ? 'Tripped (open)' : 'Closed'];
  else if (hoverStage >= 0) lines = [stages[hoverStage].name + (stages[hoverStage].sub ? ' ' + stages[hoverStage].sub : ''), stages[hoverStage].owner + '-owned'];
  if (!lines) return;
  textSize(14);
  const w = max(textWidth(lines[0]), textWidth(lines[1])) + 16, h = 40;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(lines[0], tx + 8, ty + 4);
  text(lines[1], tx + 8, ty + 21);
}

// ---- Control labels with current values ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Service type', 10, drawHeight + 21);
  text('Building load: ' + loadSlider.value() + ' kVA', 10, drawHeight + 58);
}

function mousePressed() {
  if (mouseY < 0 || mouseY >= drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  if (!wide && selected >= 0) {
    const o = overlayRect(computeStages());
    if (mouseX >= o.x && mouseX <= o.x + o.w && mouseY >= o.y && mouseY <= o.y + o.h) { selected = -1; return; }
  }
  if (hoverStage >= 0) selected = (hoverStage === selected && !wide) ? -1 : hoverStage;
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
