// Platform Framing Assembly Explorer MicroSim - exploded two-story platform-framed wall with load, wind, and fire overlays and a shrinkage slider
// CANVAS_HEIGHT: 590
// Bloom Level 1 (Remember) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 250;
let defaultTextSize = 16;

// ---- Data: component types. name = infobox title, lab = short label on the drawing ----
const TYPES = {
  found: { name: 'Foundation wall', lab: 'Foundation wall', fn: 'Carries the wall and floor loads into the footing and supports the sill plate on its top edge.', size: 'Concrete or masonry, about 8 in. thick (illustrative).', load: 'The accumulated gravity load of every floor, wall, and roof above, plus lateral force from wind.' },
  sill: { name: 'Sill plate', lab: 'Sill plate', fn: 'The first piece of wood. It is bolted to the top of the foundation and spreads the wall load onto the concrete.', size: '2×6, pressure-treated, with anchor bolts into the concrete.', load: 'Vertical load from the walls and floor above, and uplift and sliding through the anchor bolts.' },
  band: { name: 'Band joist (rim joist)', lab: 'Band joist', fn: 'Closes the ends of the floor joists, holds them upright, and carries the wall above straight down to the sill. It also stops fire and air at the floor edge.', size: 'The same depth as the joists, such as 2×10, or an engineered rim board.', load: 'The load of the wall above, passed directly down, and lateral force between wall and floor.' },
  joist: { name: 'Floor joists', lab: 'Floor joists', fn: 'Span between supports and carry the subfloor and the people and furniture on it. Their ends butt against the band joist.', size: '2×10 at 16 in. on center is typical (illustrative).', load: 'Floor dead and live load. Stiffness, not strength, usually sets the size.' },
  subfloor: { name: 'Subfloor', lab: 'Subfloor', fn: 'The structural panel on top of the joists. It spreads floor load, stiffens the platform, and gives workers a safe surface for the next story.', size: '3/4 in. tongue-and-groove OSB or plywood.', load: 'Floor load between joists, and the in-plane force of the floor acting as a diaphragm.' },
  sole: { name: 'Sole plate (bottom plate)', lab: 'Sole plate', fn: 'A single board on the subfloor that the studs stand on and are nailed to. It spreads the stud loads onto the platform.', size: '2×4 or 2×6, the same width as the studs.', load: 'Compression from each stud above it, at the stud ends.' },
  stud: { name: 'Wall studs', lab: 'Studs', fn: 'Vertical members that carry floor and roof loads down, span from floor to floor against wind, and give nailing for the sheathing.', size: '2×4 or 2×6 at 16 or 24 in. on center.', load: 'Vertical compression from the plates above, plus bending from wind pressure.' },
  king: { name: 'King stud', lab: 'King stud', fn: 'A full-height stud beside the opening. It ties the opening to the plates and braces it against wind.', size: '2×4 or 2×6, full height of the wall.', load: 'Wind bending and some vertical load. It does not carry the header.' },
  jack: { name: 'Jack stud (trimmer)', lab: 'Jack stud', fn: 'A short stud under each end of the header. It carries the header load down to the sole plate.', size: '2×4 or 2×6, from the sole plate to the underside of the header.', load: 'Half of the load collected by the header, in compression.' },
  header: { name: 'Header', lab: 'Header', fn: 'A beam over the opening that carries the load from above around the window to the jack studs.', size: 'Two 2×10s with a spacer, or LVL. The size depends on the opening width and the load.', load: 'Roof and floor load above the opening, in bending and shear, delivered as two end reactions to the jacks.' },
  cripple: { name: 'Cripple studs and rough sill', lab: 'Cripples', fn: 'Short studs above the header and below the window. They keep the load path and the nailing surface continuous, and the rough sill supports the window.', size: '2×4 or 2×6 short pieces at the stud spacing.', load: 'A small vertical load.' },
  top: { name: 'Double top plate', lab: 'Double top plate', fn: 'Two stacked boards that tie the wall tops together and spread the joist or truss loads to the studs. They lap at the corners to tie the walls.', size: 'Two 2×4 or 2×6 boards, 3 in. thick in all.', load: 'Concentrated loads from the joists above, spread to the studs below.' },
  ribbon: { name: 'Ribbon board (balloon framing)', lab: 'Ribbon board', fn: 'A board let into the studs to support the floor joists, because balloon studs run past the floor.', size: '1×4 or 2×4 let into the studs (illustrative).', load: 'The floor joist reactions, passed into the studs through nails.' },
  sheath: { name: 'Wall sheathing', lab: 'Sheathing', fn: 'Structural panels nailed over the studs. They brace the wall against racking, as a shear wall, and give the weather barrier a surface.', size: '7/16 in. OSB or plywood, in 4 ft by 8 ft sheets.', load: 'In-plane shear from wind and quakes, and wind pressure spread to the studs.' }
};
const NARROW_LAB = { found: 'Foundation', top: 'Top plates' };
const PICK_ORDER = ['joist', 'king', 'jack', 'header', 'cripple', 'stud', 'ribbon', 'band', 'subfloor', 'sole', 'top', 'sill', 'found', 'sheath'];
const BASE_H = [22, 8, 22, 5, 8, 56, 16, 22, 5, 8, 56, 16];  // tier heights: foundation, sill, floor 1, subfloor 1, sole 1, studs 1, top 1, floor 2 ...
const SHRINK_VIS = 10;      // the shrinkage is drawn this many times larger than real
const STACK_PLATFORM = 27.5; // in. of horizontal-grain wood: two floors of (2x10 joist + three 1.5 in. plates)
const STACK_BALLOON = 4.5;   // in.: sill plate plus a double top plate

// ---- State ----
let selected = null;     // component type shown in the infobox
let hoverType = null;
let items = [];          // rectangles in pixel coordinates, rebuilt every frame
let L = {};              // layout
let flow = 0;            // animation phase, advances only while the mouse is over the canvas
let lastMs = 0;

// ---- Controls ----
let overlayRadio, balloonBox, assembleSlider, shrinkSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  overlayRadio = createRadio();
  ['Gravity load path', 'Wind load path', 'Fire spread'].forEach(o => overlayRadio.option(o));
  overlayRadio.selected('Gravity load path');

  balloonBox = createCheckbox('Balloon framing', false);
  assembleSlider = createSlider(0, 100, 50, 1);
  shrinkSlider = createSlider(0, 3, 0, 0.1);

  positionControls();
  describe('An exploded elevation of a two-story platform-framed exterior wall seen from inside: foundation wall, sill plate, band joist and floor joist ends, subfloor, sole plate, studs, a window opening with header, king, jack, and cripple studs, double top plates, sheathing, and the next floor platform. A slider assembles the parts, an overlay shows the gravity path, the wind path, or fire spread, a checkbox switches to balloon framing with continuous studs, and a slider shows wood shrinkage in inches.', LABEL);
}

function positionControls() {
  const y = drawHeight;
  overlayRadio.position(10, y + 3);
  overlayRadio.style('width', (canvasWidth - 20) + 'px');
  balloonBox.position(10, y + 50);
  const sw = max(100, canvasWidth - sliderLeftMargin - 20);
  assembleSlider.position(sliderLeftMargin, y + 82);
  assembleSlider.size(sw);
  shrinkSlider.position(sliderLeftMargin, y + 116);
  shrinkSlider.size(sw);
}

// ---- Layout and geometry ----
function layout() {
  const narrow = canvasWidth < 600;
  const a = assembleSlider.value() / 100;
  const gmax = narrow ? 6 : 9;
  const top = narrow ? 76 : 58, bottom = narrow ? drawHeight - 140 : drawHeight - 10;
  const g = gmax * (1 - a);
  const f = min(1.25, (bottom - top - 11 * g - 6) / BASE_H.reduce((s, h) => s + h, 0));
  const leftCol = narrow ? 82 : 128, rightCol = narrow ? 64 : 86;
  const panelW = narrow ? 0 : max(236, min(330, canvasWidth * 0.30));
  const elevW = narrow ? canvasWidth - leftCol - rightCol - 8 : min(560, canvasWidth - leftCol - rightCol - panelW - 16);
  L = { narrow, a, g, f, top, bottom, ex: leftCol, ew: elevW, sx: elevW / 96, rightCol,
        panel: narrow ? { x: 6, y: bottom + 6, w: canvasWidth - 12, h: drawHeight - bottom - 10 } : { x: leftCol + elevW + rightCol + 10, y: top, w: panelW, h: bottom - top } };
}

const balloon = () => balloonBox.checked();

// vertical tier positions: yb[k] is the bottom edge and yt[k] the top edge of tier k, counted from the foundation up
function tiers() {
  const sv = shrinkSlider.value() / 100;
  const shrinks = balloon() ? [1, 11] : [1, 2, 4, 6, 7, 9, 11];   // tiers made of horizontal-grain wood
  const hmin = k => (k === 3 || k === 8 ? 3 : 4);
  const yb = [], yt = [], y0 = [];
  let y = L.bottom, yy = L.bottom;
  for (let k = 0; k < 12; k++) {
    const h0 = max(hmin(k), BASE_H[k] * L.f);
    const h = h0 * (shrinks.includes(k) ? 1 - SHRINK_VIS * sv : 1);
    yb[k] = y; yt[k] = y - h; y = yt[k] - L.g;
    y0[k] = yy - h0; yy = y0[k] - L.g;
  }
  return { yb, yt, topNoShrink: y0[11] };
}

// add a rectangle in inch/pixel coordinates: x and w in inches of wall length, y and h in pixels
function add(type, xin, win, y, h, extra) {
  items.push(Object.assign({ type: type, x: L.ex + xin * L.sx, w: max(win * L.sx, 4), y: y, h: h }, extra || {}));
}

function buildItems() {
  items = [];
  const T = tiers(), bal = balloon();
  const { yb, yt } = T;
  // wall sheathing: a panel behind the framing, shifted back and up when exploded
  const sh = 1 - L.a;
  items.push({ type: 'sheath', x: L.ex + sh * 16, w: 96 * L.sx, y: yt[11] - sh * 8, h: yb[1] - yt[11] });
  add('found', 0, 96, yt[0], yb[0] - yt[0]);
  add('sill', 0, 96, yt[1], yb[1] - yt[1]);
  [[2, 3, 4], [7, 8, 9]].forEach(([fl, sub, sole]) => {
    const fh = yb[fl] - yt[fl];
    if (bal) add('ribbon', 0, 96, yt[fl] + fh * 0.05, fh * 0.26);
    else add('band', 0, 96, yt[fl], fh);
    for (let i = 0; i < 6; i++) add('joist', 8 + 16 * i - 0.75, 1.5, yt[fl] + fh * 0.3, fh * 0.65);
    add('subfloor', 0, 96, yt[sub], yb[sub] - yt[sub]);
    if (!bal) add('sole', 0, 96, yt[sole], yb[sole] - yt[sole]);
  });
  // first-story stud zone, where the window sits; balloon studs run from the sill to the roof plate
  const z0 = yt[5], z1 = yb[5], zh = z1 - z0;
  const s0 = bal ? yb[11] : z0, s1 = bal ? yt[1] : z1;
  const yHeadTop = z0 + zh * 0.11, yHeadBot = z0 + zh * 0.32, ySill = z0 + zh * 0.75, yCrip = z0 + zh * 0.82;
  [27, 61.5].forEach(x => add('king', x, 1.5, s0, s1 - s0));
  [28.5, 60].forEach(x => add('jack', x, 1.5, yHeadBot, z1 - yHeadBot));
  add('header', 28.5, 33, yHeadTop, yHeadBot - yHeadTop);
  items.push({ type: 'window', x: L.ex + 30 * L.sx, w: 30 * L.sx, y: yHeadBot, h: ySill - yHeadBot });
  add('cripple', 30, 30, ySill, yCrip - ySill);
  add('cripple', 40, 1.5, yCrip, z1 - yCrip);
  add('cripple', 50, 1.5, yCrip, z1 - yCrip);
  [0, 16, 76, 94.5].forEach(x => add('stud', x, 1.5, s0, s1 - s0));
  if (bal) {
    [32, 48].forEach(x => add('stud', x, 1.5, yb[11], yHeadTop - yb[11]));
    add('stud', 64, 1.5, yb[11], yHeadTop - yb[11]);
  } else {
    add('cripple', 44, 1.5, z0, yHeadTop - z0);
    [0, 16, 32, 48, 64, 80, 94.5].forEach(x => add('stud', x, 1.5, yt[10], yb[10] - yt[10]));
  }
  // double top plates: one at the roof in balloon framing, one per story in platform framing
  (bal ? [11] : [6, 11]).forEach(k => { const th = yb[k] - yt[k]; add('top', 0, 96, yt[k], th / 2); add('top', 0, 96, yt[k] + th / 2, th / 2); });
  return T;
}

function pickAt(mx, my) {
  for (const t of PICK_ORDER) {
    for (let i = items.length - 1; i >= 0; i--) {
      const r = items[i];
      if (r.type === t && mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) return t;
    }
  }
  return null;
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  layout();
  const T = buildItems();
  const over = mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= drawHeight;
  hoverType = over ? pickAt(mouseX, mouseY) : null;
  cursor(hoverType ? HAND : ARROW);
  const now = millis();
  if (over) flow = (flow + (now - lastMs) / 1100) % 1;
  lastMs = now;

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
  text('Platform Framing Assembly Explorer', canvasWidth / 2, 6);

  const ov = overlayRadio.value();
  if (L.narrow) drawCaption(ov);
  items.forEach(drawItem);
  if (ov === 'Fire spread') drawFire(T);
  else if (ov === 'Wind load path') drawWind(T);
  else drawGravity(T);
  drawShrinkMarker(T);
  drawLabels(T);
  drawPanel(ov);
  drawHoverTag();
  drawControlLabels();
}

function drawItem(r) {
  const info = TYPES[r.type];
  const sel = r.type === selected, hov = r.type === hoverType;
  noStroke();
  if (r.type === 'window') { fill('lightcyan'); stroke('lightsteelblue'); strokeWeight(1); rect(r.x, r.y, r.w, r.h); line(r.x, r.y, r.x + r.w, r.y + r.h); line(r.x + r.w, r.y, r.x, r.y + r.h); return; }
  let fc = 'tan', sc = 'peru';
  if (r.type === 'found') { fc = 'lightgray'; sc = 'gray'; }
  else if (r.type === 'sheath') { fc = color(255, 255, 224, 170); sc = 'goldenrod'; }
  else if (r.type === 'subfloor') { fc = 'lightyellow'; sc = 'goldenrod'; }
  else if (r.type === 'sill' || r.type === 'sole' || r.type === 'top' || r.type === 'band') fc = 'burlywood';
  else if (r.type === 'joist') fc = 'wheat';
  fill(fc);
  stroke(sel ? 'navy' : (hov ? 'navy' : sc));
  strokeWeight(sel ? 3 : (hov ? 2 : 1));
  if (r.type === 'sheath') { drawingContext.setLineDash([6, 4]); }
  rect(r.x, r.y, r.w, r.h);
  drawingContext.setLineDash([]);
  if (r.type === 'found') {
    stroke('darkgray');
    strokeWeight(1);
    for (let x = r.x + 6; x < r.x + r.w - 4; x += 14) line(x, r.y + 3, x + 8, r.y + r.h - 3);
  }
}

// ---- Overlays ----
function arrow(x1, y1, x2, y2, col, w) {
  stroke(col);
  strokeWeight(w || 3);
  line(x1, y1, x2, y2);
  noStroke();
  fill(col);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  triangle(0, 0, -8, -4.5, -8, 4.5);
  pop();
}

function tag(s, x, y, al, col) {
  const size = L.narrow ? 12 : 14;
  textSize(size);
  const w = textWidth(s) + 8;
  const tx = constrain(al === RIGHT ? x - w : (al === CENTER ? x - w / 2 : x), 2, canvasWidth - w - 2);
  noStroke();
  fill(255, 255, 255, 225);
  rect(tx, y - size / 2 - 3, w, size + 6, 3);
  fill(col || 'black');
  textAlign(LEFT, CENTER);
  text(s, tx + 4, y);
}

function drawGravity(T) {
  const x = L.ex + 76.75 * L.sx, yTop = T.yt[11] - 18, yBot = T.yb[0] - 2;
  arrow(x, yTop, x, yTop + 16, 'mediumblue');
  stroke('mediumblue');
  strokeWeight(3);
  line(x, yTop + 16, x, yBot - 8);
  arrow(x, yBot - 18, x, yBot, 'mediumblue');
  for (let k = 0; k < 12; k++) { if (k === 0) continue; arrow(x, T.yt[k] - 1, x, T.yt[k] + (T.yb[k] - T.yt[k]) * 0.6 + 3, 'mediumblue', 2); }
  // moving dots, only while the mouse is over the canvas
  noStroke();
  fill('white');
  stroke('mediumblue');
  strokeWeight(2);
  for (let i = 0; i < 6; i++) circle(x, lerp(yTop, yBot, (flow + i / 6) % 1), 7);
  tag('Roof load', x - 10, yTop - 2, RIGHT, 'mediumblue');
  tag('Load adds up going down', x - 10, L.bottom - 22, RIGHT, 'mediumblue');
}

function drawWind(T) {
  [[T.yt[5], T.yb[5]], [T.yt[10], T.yb[10]]].forEach(([y0, y1], i) => {
    const bx = L.ex + 87 * L.sx;
    const ym = (y0 + y1) / 2;
    noFill();
    stroke('mediumblue');
    strokeWeight(2);
    [[70, 0.3], [87, 0.7]].forEach(([xi, fy]) => { const px = L.ex + xi * L.sx, py = y0 + (y1 - y0) * fy; circle(px, py, 13); fill('mediumblue'); noStroke(); circle(px, py, 4); noFill(); });
    arrow(bx + 4, ym, bx + 4, y0 + 2, 'mediumblue', 2);
    arrow(bx + 4, ym, bx + 4, y1 - 2, 'mediumblue', 2);
  });
  tag(L.narrow ? 'Wind pushes toward you' : 'Wind pressure pushes toward you', L.ex + 2, L.top + 8, LEFT, 'mediumblue');
  tag('Studs span floor to floor: half up, half down', L.ex + L.ew, L.bottom - 26, RIGHT, 'mediumblue');
}

function drawFire(T) {
  const bal = balloon();
  const x0 = L.ex + 77.5 * L.sx, w = 17 * L.sx, xa = x0 + w / 2;
  // wall cavity between two studs: one cavity per story, or one open cavity from sill to roof
  const cav = bal ? [[T.yb[11], T.yt[1]]] : [[T.yt[5], T.yb[5]], [T.yt[10], T.yb[10]]];
  cav.forEach(([y0, y1]) => {
    noStroke();
    fill(255, 165, 0, 70);
    rect(x0, y0, w, y1 - y0);
    arrow(xa, y1 - 4, xa, y0 + 6, 'darkorange', 4);
    if (!bal) { stroke('darkorange'); strokeWeight(5); line(x0 - 3, y0 - 1, x0 + w + 3, y0 - 1); }
  });
  tag(bal ? 'Open cavity: fire races to the attic' : 'Fire stopped at each platform', L.ex + L.ew - 2, L.top + 8, RIGHT, 'sienna');
  if (!bal) tag('A fire in the next story must start again', L.ex + L.ew - 2, (T.yt[5] + T.yb[10]) / 2, RIGHT, 'sienna');
}

function drawShrinkMarker(T) {
  const s = shrinkSlider.value();
  if (s <= 0) return;
  const y = T.topNoShrink, dy = T.yt[11] - y;
  drawingContext.setLineDash([5, 4]);
  stroke('crimson');
  strokeWeight(1.5);
  line(L.ex - 4, y, L.ex + L.ew + 4, y);
  drawingContext.setLineDash([]);
  const x = L.ex + L.ew + 6;
  arrow(x, y, x, T.yt[11] - 1, 'crimson', 2);
  tag('Drops ' + nf(shrinkInches(), 0, 2) + ' in. (drawn ' + SHRINK_VIS + '× larger)', L.ex + L.ew, y - 8, RIGHT, 'crimson');
}

function shrinkInches() { return (balloon() ? STACK_BALLOON : STACK_PLATFORM) * shrinkSlider.value() / 100; }

// ---- Labels: the left column for most parts, the right column for the window parts ----
function drawLabels(T) {
  const rightTypes = ['header', 'cripple', 'jack', 'king'];
  const midY = (T.yb[6] + T.yt[7]) / 2;       // splits the first story from the second
  const groups = {};
  items.forEach(r => {
    if (r.type === 'window' || r.type === 'sheath') return;
    const right = rightTypes.includes(r.type);
    const key = right ? r.type : r.type + (r.y < midY ? '2' : '1');
    const g = groups[key] = groups[key] || { type: r.type, right: right, r: r };
    // right column: the right-most copy; left column: the first copy (leftmost, then lowest on the wall)
    if (right ? r.x > g.r.x : (r.x < g.r.x - 1 || (abs(r.x - g.r.x) < 1 && r.y > g.r.y))) g.r = r;
  });
  const entries = Object.values(groups).map(g => ({ text: L.narrow && NARROW_LAB[g.type] ? NARROW_LAB[g.type] : TYPES[g.type].lab, y: g.r.y + g.r.h / 2, ax: g.right ? g.r.x + g.r.w : g.r.x, right: g.right }));
  const gap = L.narrow ? 13 : 16, size = L.narrow ? 12 : 14;
  textSize(size);
  [false, true].forEach(side => {
    const col = entries.filter(e => e.right === side).sort((a, b) => a.y - b.y);
    col.forEach((e, i) => { e.ly = i === 0 ? e.y : max(e.y, col[i - 1].ly + gap); });
    for (let i = col.length - 1; i >= 0; i--) col[i].ly = min(col[i].ly, i === col.length - 1 ? L.bottom : col[i + 1].ly - gap);
    col.forEach(e => {
      const lx = side ? L.ex + L.ew + 6 : L.ex - 6;
      stroke('silver');
      strokeWeight(1);
      line(lx, e.ly, e.ax, e.y);
      noStroke();
      fill('black');
      textAlign(side ? LEFT : RIGHT, CENTER);
      text(e.text, lx + (side ? 2 : -2), e.ly);
    });
  });
  // the next floor platform bracket on the right edge
  if (!balloon()) {
    const yA = T.yt[8] - 1, yB = T.yb[7] + 1, bx = L.ex + L.ew + 6;
    stroke('dimgray');
    strokeWeight(2);
    line(bx, yA, bx, yB);
    line(bx - 4, yA, bx, yA);
    line(bx - 4, yB, bx, yB);
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    text('Next floor\nplatform', bx + 4, (yA + yB) / 2);
  }
}

function drawPanel(ov) {
  const P = L.panel;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const x = P.x + 10, w = P.w - 20;
  let y = P.y + 6;
  if (!selected) {
    textSize(14);
    text('Hover over a part to see its name. Click it to see its function, typical size, and the load it carries.', x, y, w, P.h - 10);
    return;
  }
  const t = TYPES[selected];
  textSize(16);
  textStyle(BOLD);
  text(t.name, x, y, w, 40);
  textStyle(NORMAL);
  textSize(14);
  if (L.narrow) {
    y += 20;
    const first = str => str.split('. ')[0].replace(/\.$/, '') + '.';
    text(first(t.fn) + '\nSize: ' + t.size + '\nLoad: ' + first(t.load), x, y, w, P.h - 26);
    return;
  }
  y += 22;
  const lines = str => {   // count wrapped lines word by word
    let n = 1, cur = '';
    str.split(' ').forEach(wd => { if (textWidth((cur + ' ' + wd).trim()) > w) { n++; cur = wd; } else cur = (cur + ' ' + wd).trim(); });
    return n;
  };
  ['Function: ' + t.fn, 'Typical size: ' + t.size, 'Load: ' + t.load].forEach(str => {
    text(str, x, y, w, 120);
    y += 17 * lines(str) + 4;
  });
  fill('dimgray');
  text('At ' + nf(shrinkSlider.value(), 0, 1) + '% shrinkage: the platform wall drops ' + nf(STACK_PLATFORM * shrinkSlider.value() / 100, 0, 2) + ' in., a balloon wall ' + nf(STACK_BALLOON * shrinkSlider.value() / 100, 0, 2) + ' in.', x, max(y + 4, P.y + P.h - 68), w, 64);
}

function drawCaption(ov) {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  const s = { 'Gravity load path': 'Blue arrow: gravity load, roof to foundation', 'Wind load path': 'Blue: wind pressure, passed to the floors', 'Fire spread': balloon() ? 'Orange: open cavity, fire climbs unchecked' : 'Orange: each platform stops the fire' }[ov];
  text(s, canvasWidth / 2, 36);
}

function drawHoverTag() {
  if (!hoverType) return;
  tag(TYPES[hoverType].name, mouseX + 12, mouseY - 14, LEFT, 'black');
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y = drawHeight;
  text('Assemble: ' + assembleSlider.value() + '%', 10, y + 94);
  text('Shrinkage: ' + nf(shrinkSlider.value(), 0, 1) + '% (' + nf(shrinkInches(), 0, 2) + ' in.)', 10, y + 128);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  const t = pickAt(mouseX, mouseY);
  if (t) selected = t;
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
