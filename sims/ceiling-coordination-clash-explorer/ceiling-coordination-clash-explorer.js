// Ceiling Coordination Clash Explorer MicroSim - drag a duct, drain pipe, cable tray, and light fixtures through a ceiling cross-section and resolve the clashes
// CANVAS_HEIGHT: 500
// Bloom Level 4 (Analyze) + Level 6 (Create)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 185;
let defaultTextSize = 16;

// ---- Geometry, in inches above the floor (the section is 20 ft wide, looking along the runs) ----
const FRAME_W = 240, E_MIN = 90, E_MAX = 188;
const BEAM_BOTTOM = 156, BEAM_TOP = 180, ROOF_TOP = 184; // glulam beams are 24 in deep, bottoms at 13 ft
const CLEAR = 1;                                         // minimum clearance between systems, inches
const DEFAULT_DUCT = 16, DEFAULT_CEILING = 10;

// ---- Systems: color, outline pattern (so each is distinct without color), and priority rank ----
const systems = {
  structure:  { label: 'Structure',  fill: 'sienna',         stroke: 'saddlebrown',   dash: [],            rank: 0 },
  duct:       { label: 'Duct',       fill: 'lightskyblue',   stroke: 'steelblue',     dash: [8, 4],        rank: 2 },
  plumbing:   { label: 'Plumbing',   fill: 'mediumseagreen', stroke: 'darkgreen',     dash: [2, 3],        rank: 1 },
  electrical: { label: 'Electrical', fill: 'orange',         stroke: 'chocolate',     dash: [8, 3, 2, 3],  rank: 4 },
  lighting:   { label: 'Lighting',   fill: 'gold',           stroke: 'darkgoldenrod', dash: [12, 4],       rank: 5 }
};
const sysKeys = Object.keys(systems);

// Hover messages for each pair of systems (sorted keys joined by |)
const pairMsg = {
  'duct|structure': 'Duct intersects beam: lower the duct, slide it between the beams, or use a shallower duct.',
  'plumbing|structure': 'Drain pipe intersects beam: a gravity pipe cannot bend around it. Slide the pipe between the beams.',
  'electrical|structure': 'Cable tray intersects beam: the tray yields. Move it between the beams or below them.',
  'duct|plumbing': 'Duct intersects drain pipe: the gravity pipe has priority, so move the duct.',
  'duct|electrical': 'Cable tray intersects duct: the large duct has priority, so move the cable tray.',
  'electrical|plumbing': 'Cable tray intersects drain pipe: the gravity pipe has priority, so move the tray.',
  'duct|lighting': 'Duct intersects a light fixture: slide the fixture along the ceiling or move the duct.',
  'lighting|plumbing': 'Drain pipe intersects a light fixture: the pipe has priority, so slide the fixture sideways.',
  'electrical|lighting': 'Cable tray intersects a light fixture: the tray yields, so move it.',
  'lighting|lighting': 'Two light fixtures overlap: space them out along the ceiling.'
};

// Short versions for the narrow-screen list
const pairShort = {
  'duct|structure': 'Duct x beam: lower the duct or slide it between the beams.',
  'plumbing|structure': 'Pipe x beam: slide the pipe between the beams.',
  'electrical|structure': 'Tray x beam: move the tray between the beams or below.',
  'duct|plumbing': 'Duct x pipe: the pipe has priority, so move the duct.',
  'duct|electrical': 'Tray x duct: the duct has priority, so move the tray.',
  'electrical|plumbing': 'Tray x pipe: the pipe has priority, so move the tray.',
  'duct|lighting': 'Duct x light: slide the light or move the duct.',
  'lighting|plumbing': 'Pipe x light: slide the light sideways.',
  'electrical|lighting': 'Tray x light: move the tray.',
  'lighting|lighting': 'Two lights overlap: space them out.'
};

// ---- State ----
let els = [];            // all elements in the section
let show = {};           // which systems are visible
let ceilPlane = 120;     // ceiling height in inches
let clashes = [];
let checked = false;     // true after Run clash check is pressed
let dragEl = null, gripX = 0, gripE = 0;
let hoverEl = null;
let L = {};              // layout, recomputed each frame

// ---- Controls ----
let showChecks = {}, ductSlider, ceilSlider, runButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  sysKeys.forEach(k => {
    showChecks[k] = createCheckbox(systems[k].label, true);
    showChecks[k].changed(() => { show[k] = showChecks[k].checked(); });
    show[k] = true;
  });
  ductSlider = createSlider(8, 24, DEFAULT_DUCT, 1);
  ceilSlider = createSlider(8, 12, DEFAULT_CEILING, 0.5);
  runButton = createButton('Run clash check');
  runButton.mousePressed(() => { checked = true; });
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);

  resetAll();
  positionControls();
  describe('A cross-section of the space above a ceiling, looking along the building runs. Two brown glulam beams hang from the roof. A blue supply duct, a green sloped drain pipe, an orange cable tray, and yellow recessed light fixtures can be dragged around. Elements that overlap or sit within one inch of each other get a red outline, and a counter and list report the clashes. Sliders set duct depth and ceiling height, checkboxes hide systems, and a button runs a clash check.', LABEL);
}

function resetAll() {
  ductSlider.value(DEFAULT_DUCT);
  ceilSlider.value(DEFAULT_CEILING);
  ceilPlane = DEFAULT_CEILING * 12;
  els = [
    { id: 'beam1', sys: 'structure', name: 'Glulam beam', cx: 70, e0: BEAM_BOTTOM, w: 7, h: 24, mov: 'none' },
    { id: 'beam2', sys: 'structure', name: 'Glulam beam', cx: 170, e0: BEAM_BOTTOM, w: 7, h: 24, mov: 'none' },
    { id: 'duct', sys: 'duct', name: 'Supply duct', cx: 75, e0: 150, w: 36, h: DEFAULT_DUCT, mov: 'both' },
    { id: 'tray', sys: 'electrical', name: 'Cable tray', cx: 95, e0: 148, w: 12, h: 4, mov: 'both' },
    // drain pipe: 4.5 in pipe on a 1/4 in per ft slope over 40 ft drops 10 in, so its envelope is 14.5 in tall
    { id: 'pipe', sys: 'plumbing', name: 'Drain pipe (sloped)', cx: 120, e0: 125.5, w: 4.5, h: 14.5, mov: 'both' },
    { id: 'light1', sys: 'lighting', name: 'Recessed light', cx: 30, e0: ceilPlane, w: 24, h: 6, mov: 'x' },
    { id: 'light2', sys: 'lighting', name: 'Recessed light', cx: 120, e0: ceilPlane, w: 24, h: 6, mov: 'x' },
    { id: 'light3', sys: 'lighting', name: 'Recessed light', cx: 210, e0: ceilPlane, w: 24, h: 6, mov: 'x' }
  ];
  checked = false;
  sysKeys.forEach(k => { show[k] = true; if (showChecks[k]) showChecks[k].checked(true); });
}

// ---- Controls placement: checkboxes and buttons flow across the first rows, sliders get a row each ----
function positionControls() {
  const y0 = drawHeight;
  textSize(defaultTextSize);
  const labels = [...sysKeys.map(k => systems[k].label), 'Run clash check', 'Reset'];
  const extra = [...sysKeys.map(() => 34), 22, 22]; // checkbox square or button padding
  const items = [...sysKeys.map(k => showChecks[k]), runButton, resetButton];
  const wideRow = canvasWidth >= 640; // wide: checkboxes on row 1, buttons on row 2; narrow: flow and wrap
  let row = 0, x = 10;
  items.forEach((el, i) => {
    const isButton = i >= sysKeys.length;
    const w = textWidth(labels[i]) + extra[i] + 8;
    if (wideRow && isButton && row === 0) { row = 1; x = 10; }
    if (!wideRow && x + w > canvasWidth - 4 && x > 10) { row++; x = 10; }
    el.position(x, y0 + 7 + row * 35 + (isButton ? 0 : 1));
    x += w;
  });
  const sy = y0 + 7 + 2 * 35;
  ductSlider.position(sliderLeftMargin, sy + 4);
  ceilSlider.position(sliderLeftMargin, sy + 39);
  [ductSlider, ceilSlider].forEach(sl => sl.size(max(100, canvasWidth - sliderLeftMargin - 15)));
}

// ---- Coordinates: inches to pixels ----
function px(cx) { return L.ox + cx * L.s; }
function py(e) { return L.yb - (e - E_MIN) * L.s; }
function toIn(x) { return (x - L.ox) / L.s; }
function toE(y) { return E_MIN + (L.yb - y) / L.s; }
function rectOf(e) { return { x0: e.cx - e.w / 2, x1: e.cx + e.w / 2, e0: e.e0, e1: e.e0 + e.h }; }
function fmtFtIn(e) { const f = Math.floor(e / 12); const i = Math.round(e - f * 12); return f + "'-" + i + '"'; }

function layout() {
  const wide = canvasWidth >= 720;
  const ox = wide ? 50 : 36;
  const s = wide ? min(2.0, (canvasWidth - ox - 262) / FRAME_W) : min(2.0, (canvasWidth - ox - 10) / FRAME_W);
  const oy = 42;
  const fw = FRAME_W * s, fh = (E_MAX - E_MIN) * s;
  L = { wide, ox, s, oy, fw, fh, yb: oy + fh };
}

function draw() {
  updateCanvasSize();
  layout();
  ceilPlane = ceilSlider.value() * 12;
  updateElements();
  clashes = findClashes();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  const title = 'Ceiling Coordination Clash Explorer';
  let ts = 24;
  textSize(ts);
  while (ts > 18 && textWidth(title) > canvasWidth - 10) { ts--; textSize(ts); }
  text(title, canvasWidth / 2, 8);

  hoverEl = null;
  if (!dragEl) {
    for (let i = els.length - 1; i >= 0; i--) if (show[els[i].sys] && hitTest(els[i], 4)) { hoverEl = els[i]; break; }
  }

  drawSection();
  drawElements();
  drawClashMarks();
  drawLegend();
  drawPanel();
  drawTooltip();
  drawControlLabels();
  const movable = hoverEl && hoverEl.mov !== 'none';
  cursor(dragEl ? 'grabbing' : (movable ? 'grab' : ARROW));
}

// duct depth and ceiling height drive their elements; lights ride in the ceiling plane
function updateElements() {
  const duct = els.find(e => e.id === 'duct');
  duct.h = ductSlider.value();
  duct.e0 = constrain(duct.e0, E_MIN, E_MAX - duct.h);
  els.forEach(e => { if (e.sys === 'lighting') e.e0 = ceilPlane; });
}

// ---- Section: frame, ruler, roof, ceiling grid, depth dimension ----
function drawSection() {
  const { ox, oy, fw, fh, yb, s } = L;
  stroke('gray');
  strokeWeight(1);
  fill('white');
  rect(ox, oy, fw, fh);
  noStroke();
  // room below the ceiling
  fill(245, 245, 235);
  rect(ox + 1, py(ceilPlane), fw - 1, yb - py(ceilPlane));
  if (yb - py(ceilPlane) > 34) {
    fill('dimgray');
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text('Room below', ox + 6, yb - 3);
  }
  // roof deck
  fill('slategray');
  rect(ox, py(ROOF_TOP), fw, (ROOF_TOP - BEAM_TOP) * s + 1);
  fill('white');
  textAlign(LEFT, CENTER);
  text('Roof deck', ox + 6, py(ROOF_TOP) + (ROOF_TOP - BEAM_TOP) * s / 2);
  // ruler
  fill('black');
  textAlign(RIGHT, CENTER);
  textSize(12);
  stroke('gray');
  strokeWeight(1);
  for (let ft = 8; ft <= 15; ft++) {
    line(ox - 4, py(ft * 12), ox, py(ft * 12));
    noStroke();
    text(ft + "'", ox - 6, py(ft * 12));
    stroke('gray');
  }
  noStroke();
  textAlign(LEFT, BOTTOM);
  fill('dimgray');
  text('Height above floor', 2, oy - 2);
  // depth dimension: from the ceiling plane up to the bottom of the beams
  const dx = ox + fw - 12;
  stroke('black');
  strokeWeight(1);
  line(dx, py(ceilPlane), dx, py(BEAM_BOTTOM));
  line(dx - 4, py(ceilPlane), dx + 4, py(ceilPlane));
  line(dx - 4, py(BEAM_BOTTOM), dx + 4, py(BEAM_BOTTOM));
  noStroke();
  fill('black');
  textSize(12);
  textAlign(RIGHT, CENTER);
  const depth = BEAM_BOTTOM - ceilPlane;
  text(depth + ' in under beams', dx - 4, (py(ceilPlane) + py(BEAM_BOTTOM)) / 2);
}

// ---- Elements ----
function drawElements() {
  const { ox, s } = L;
  // ceiling grid sits behind the elements: a thin tile band with T-bar ticks
  const cy = py(ceilPlane);
  noStroke();
  fill('lightgray');
  rect(ox, cy - max(2, 1 * s), L.fw, max(2, 1 * s) + 1);
  fill('dimgray');
  for (let x = 0; x <= FRAME_W; x += 24) rect(px(x) - 1, cy - max(3, 1.5 * s), 2, max(3, 1.5 * s) + 2);
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Ceiling ' + fmtFtIn(ceilPlane), ox + 4, cy + 3);

  els.forEach(e => { if (show[e.sys]) drawElement(e); });
}

function drawElement(e) {
  const sys = systems[e.sys];
  const x = px(e.cx - e.w / 2), y = py(e.e0 + e.h), w = e.w * L.s, h = e.h * L.s;
  const hot = e === hoverEl || e === dragEl;
  const ctx = drawingContext;
  strokeWeight(hot ? 3 : 2);
  stroke(hot ? 'navy' : sys.stroke);
  if (e.id === 'pipe') {
    // envelope (dashed) plus the pipe at its high end and at its low end
    noFill();
    ctx.setLineDash([2, 3]);
    rect(x, y, w, h);
    ctx.setLineDash([]);
    fill(sys.fill);
    const d = max(5, 4.5 * L.s);
    circle(x + w / 2, y + d / 2, d);
    circle(x + w / 2, y + h - d / 2, d);
    stroke(sys.stroke);
    strokeWeight(1);
    ctx.setLineDash([2, 3]);
    line(x + w / 2, y + d, x + w / 2, y + h - d);
    ctx.setLineDash([]);
    return;
  }
  fill(sys.fill);
  ctx.setLineDash(sys.dash);
  rect(x, y, w, h, e.sys === 'lighting' ? 2 : 0);
  ctx.setLineDash([]);
  // inside patterns so each system differs without color
  ctx.save();
  ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
  stroke(sys.stroke);
  strokeWeight(1);
  if (e.sys === 'duct') for (let k = -h; k < w; k += 8) line(x + k, y + h, x + k + h, y);
  if (e.sys === 'structure') for (let k = x + 3; k < x + w; k += 4) line(k, y, k, y + h);
  if (e.sys === 'electrical') { for (let k = x + 4; k < x + w; k += 6) line(k, y, k, y + h); }
  if (e.sys === 'lighting') line(x, y + h / 2, x + w, y + h / 2);
  ctx.restore();
  if (e.id === 'duct') {
    textSize(12);
    const label = 'Duct ' + e.w + ' x ' + e.h + ' in';
    if (textWidth(label) < w - 6 && h > 14) {
      noStroke();
      fill('white');
      rect(x + w / 2 - textWidth(label) / 2 - 2, y + h / 2 - 8, textWidth(label) + 4, 16, 3);
      fill('black');
      textAlign(CENTER, CENTER);
      text(label, x + w / 2, y + h / 2);
    }
  }
}

// ---- Clash detection: rectangles inflated by half the clearance, so 1 in gaps count ----
function overlapOf(a, b) {
  const r1 = rectOf(a), r2 = rectOf(b), c = CLEAR / 2;
  const x0 = max(r1.x0 - c, r2.x0 - c), x1 = min(r1.x1 + c, r2.x1 + c);
  const e0 = max(r1.e0 - c, r2.e0 - c), e1 = min(r1.e1 + c, r2.e1 + c);
  return (x0 < x1 && e0 < e1) ? { x0, x1, e0, e1 } : null;
}

function findClashes() {
  const vis = els.filter(e => show[e.sys]);
  const out = [];
  for (let i = 0; i < vis.length; i++) {
    for (let j = i + 1; j < vis.length; j++) {
      const a = vis[i], b = vis[j];
      if (a.sys === 'structure' && b.sys === 'structure') continue;
      const r = overlapOf(a, b);
      if (r) {
        const key = [a.sys, b.sys].sort().join('|');
        const rank = min(...[a, b].filter(e => e.sys !== 'structure').map(e => systems[e.sys].rank));
        out.push({ a, b, r, rank, msg: pairMsg[key], short: pairShort[key] });
      }
    }
  }
  vis.forEach(e => {
    if (e.sys === 'structure' || e.sys === 'lighting') return;
    if (e.e0 < ceilPlane + 1.5) {
      out.push({ a: e, b: null, rank: systems[e.sys].rank, r: { x0: e.cx - e.w / 2, x1: e.cx + e.w / 2, e0: e.e0, e1: min(e.e0 + e.h, ceilPlane + 1.5) },
        msg: e.name + ' pokes through the ceiling: raise it above the ceiling grid, or raise the ceiling.', short: e.name + ' pokes through the ceiling: raise it.' });
    }
  });
  return out.sort((p, q) => p.rank - q.rank);
}

function drawClashMarks() {
  const inClash = new Set();
  clashes.forEach(c => { inClash.add(c.a); if (c.b) inClash.add(c.b); });
  // translucent overlap regions
  noStroke();
  fill(255, 0, 0, 110);
  clashes.forEach(c => rect(px(c.r.x0), py(c.r.e1), (c.r.x1 - c.r.x0) * L.s, (c.r.e1 - c.r.e0) * L.s));
  // solid red outlines
  noFill();
  stroke('red');
  strokeWeight(3);
  inClash.forEach(e => {
    const x = px(e.cx - e.w / 2), y = py(e.e0 + e.h);
    rect(x - 2, y - 2, e.w * L.s + 4, e.h * L.s + 4);
  });
}

// ---- Legend: color plus outline pattern for each system ----
function drawLegend() {
  const x0 = L.ox, w = L.wide ? L.fw : canvasWidth - L.ox - 4;
  let x = x0, y = L.yb + 8;
  textSize(14);
  textAlign(LEFT, CENTER);
  sysKeys.forEach(k => {
    const sys = systems[k];
    const tw = textWidth(sys.label) + 38;
    if (x + tw > x0 + w && x > x0) { x = x0; y += 20; }
    stroke(sys.stroke);
    strokeWeight(2);
    drawingContext.setLineDash(sys.dash);
    fill(sys.fill);
    rect(x, y, 24, 14, 2);
    drawingContext.setLineDash([]);
    noStroke();
    fill('black');
    text(sys.label, x + 30, y + 8);
    x += tw + 6;
  });
  L.legendBottom = y + 18;
}

// ---- Panel: clash counter, status, and (after Run clash check) the list and resolution order ----
function drawPanel() {
  const wide = L.wide;
  const x = wide ? L.ox + L.fw + 14 : 8;
  const y = wide ? L.oy : L.legendBottom + 4;
  const w = wide ? canvasWidth - x - 8 : canvasWidth - 16;
  const h = drawHeight - y - 6;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  const n = clashes.length;
  const hidden = sysKeys.filter(k => !show[k]).length;
  let ty = y + 6;
  textSize(16);
  textStyle(BOLD);
  fill(n ? 'crimson' : 'darkgreen');
  text('Clashes: ' + n, x + 8, ty);
  textStyle(NORMAL);
  textSize(14);
  fill('black');
  ty += 22;
  const lines = [];
  if (n === 0) lines.push({ t: 'Coordinated: all systems fit with clearance.' + (hidden ? ' (' + hidden + ' hidden)' : ''), c: 'darkgreen', b: true });
  else if (!checked) lines.push({ t: 'Red outlines mark overlaps or gaps under ' + CLEAR + ' in. Drag elements to resolve them, or press Run clash check for the list.', c: 'black', b: false });
  else clashes.forEach((c, i) => lines.push({ t: (i + 1) + '. ' + (wide ? c.msg : c.short), c: 'black', b: false }));
  if (checked) lines.push({ t: wide ? 'Resolve in this order: gravity (drain) pipe, large duct, pressure pipe, cable tray, then conduit. Structure never moves.' : 'Order: drain pipe, duct, pressure pipe, tray, conduit.', c: 'navy', b: false });
  else if (wide) lines.push({ t: 'Drag the duct, drain pipe, or cable tray in any direction. Light fixtures slide sideways. The glulam beams are fixed.', c: 'dimgray', b: false });
  const maxY = y + h - 4;
  for (const l of lines) {
    fill(l.c);
    textStyle(l.b ? BOLD : NORMAL);
    const wrapped = wrapLines(l.t, w - 16);
    for (const s of wrapped) {
      if (ty + 16 > maxY) { fill('dimgray'); text('...', x + 8, ty); textStyle(NORMAL); return; }
      text(s, x + 8, ty);
      ty += 16;
    }
    if (wide) ty += 3;
  }
  textStyle(NORMAL);
}

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

// ---- Hover: a clash message when over a clash, otherwise the element's size and height ----
function inFrame() { return mouseX >= L.ox && mouseX <= L.ox + L.fw && mouseY >= L.oy && mouseY <= L.yb; }

function drawTooltip() {
  if (!inFrame()) return;
  let lines = null;
  const hit = clashes.find(c => mouseX >= px(c.r.x0) - 4 && mouseX <= px(c.r.x1) + 4 && mouseY >= py(c.r.e1) - 4 && mouseY <= py(c.r.e0) + 4);
  if (hit && !dragEl) lines = wrapLines(hit.msg, 260);
  else if (hoverEl || dragEl) {
    const e = hoverEl || dragEl;
    lines = [e.name + (e.id === 'pipe' ? '' : ': ' + e.w + ' x ' + e.h + ' in'), 'Bottom at ' + fmtFtIn(e.e0) + (e.mov === 'none' ? ' (fixed)' : (e.mov === 'x' ? ' (slides sideways)' : ' (drag to move)'))];
    if (e.id === 'pipe') lines.splice(1, 0, '4.5 in pipe on a 1/4 in per ft slope over 40 ft drops 10 in');
  }
  if (!lines) return;
  textSize(14);
  const w = min(canvasWidth - 8, max(...lines.map(l => textWidth(l))) + 16), h = lines.length * 17 + 8;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke(hit && !dragEl ? 'red' : 'navy');
  strokeWeight(hit && !dragEl ? 2 : 1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  lines.forEach((l, i) => text(l, tx + 8, ty + 5 + i * 17));
}

// ---- Control labels with values and units ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const sy = drawHeight + 7 + 2 * 35;
  text('Duct depth: ' + ductSlider.value() + ' in', 10, sy + 16);
  text('Ceiling height: ' + ceilSlider.value() + ' ft', 10, sy + 51);
}

// ---- Dragging ----
function hitTest(e, pad) {
  const x = px(e.cx - e.w / 2) - pad, y = py(e.e0 + e.h) - pad;
  return mouseX >= x && mouseX <= x + e.w * L.s + 2 * pad && mouseY >= y && mouseY <= y + e.h * L.s + 2 * pad;
}

function mousePressed() {
  if (!inFrame()) return;
  for (let i = els.length - 1; i >= 0; i--) {
    const e = els[i];
    if (show[e.sys] && e.mov !== 'none' && hitTest(e, 6)) {
      dragEl = e;
      gripX = toIn(mouseX) - e.cx;
      gripE = toE(mouseY) - e.e0;
      return;
    }
  }
}

function mouseDragged() {
  if (!dragEl) return;
  const e = dragEl;
  e.cx = constrain(Math.round((toIn(mouseX) - gripX) * 2) / 2, e.w / 2, FRAME_W - e.w / 2);
  if (e.mov === 'both') e.e0 = constrain(Math.round((toE(mouseY) - gripE) * 2) / 2, E_MIN, E_MAX - e.h);
}

function mouseReleased() { dragEl = null; }
function touchMoved() { return dragEl ? false : true; }

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
