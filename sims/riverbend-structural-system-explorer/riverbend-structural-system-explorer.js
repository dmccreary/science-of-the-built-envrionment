// Riverbend Structural System Explorer MicroSim - an exploded view of the idealized building; classify each element as gravity, lateral, or both
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
let sliderLeftMargin = 165;
let defaultTextSize = 16;

// ---- Data: the elements of the structure. sys is gravity, lateral, or both. ----
const ELEMENTS = [
  { id: 'deck', name: 'Roof deck', sys: 'both', helps: 'strength and stability',
    def: 'Plywood or OSB sheathing nailed to the joists. It receives the roof load, and nailed at its edges it also acts as the diaphragm that collects wind and quake force.',
    next: 'Gravity load goes to the joists. Lateral force goes to the shear walls.',
    risk: 'Strength and stability are at risk: snow would fall through, and the roof could no longer collect the sideways force.' },
  { id: 'chord', name: 'Diaphragm chords (roof edge)', sys: 'lateral', helps: 'strength and stability',
    def: 'The edges of the roof diaphragm. Like the flanges of a deep beam lying on its side, they carry the tension and compression of its bending, while the sheathing carries the shear.',
    next: 'The diaphragm force goes to the shear walls.',
    risk: 'Strength is at risk: the diaphragm could no longer resist the bending between the two side walls.' },
  { id: 'joist', name: 'Roof joists', sys: 'gravity', helps: 'strength and stiffness',
    def: 'Closely spaced horizontal members, about 24 in. apart at Riverbend, that support the deck and collect its load (only some are drawn).',
    next: 'Each joist hands 800 lb at each end to the glulam girders.',
    risk: 'Strength is at risk: the deck would have to span 16 ft between girders with nothing under it.' },
  { id: 'girder', name: 'Glulam girders', sys: 'gravity', helps: 'strength and stiffness',
    def: 'Glued-laminated primary beams. They collect the joists’ loads and carry them across a span of about 40 ft over the multipurpose room (the drawing is idealized).',
    next: 'Each girder end hands 16,000 lb to a post.',
    risk: 'Strength is at risk: a whole bay of joists and roof would lose its main support.' },
  { id: 'post', name: 'Posts', sys: 'gravity', helps: 'strength and stability',
    def: 'Vertical wood members built into the long walls that carry each girder end down in compression.',
    next: 'Each post hands 16,000 lb to the footing below.',
    risk: 'Stability is at risk: the girder end would drop, which is what a buckled post does.' },
  { id: 'wall', name: 'Wall framing', sys: 'both', helps: 'strength and stability',
    def: 'Stud walls. As bearing walls they carry roof load down; with nailed sheathing they become shear walls that resist sideways force in their own plane.',
    next: 'Gravity load goes to the foundation. Lateral force goes to the foundation through the hold-downs.',
    risk: 'Stability is at risk: the roof would lose its route for sideways force, and the building would rack like a pushed box.' },
  { id: 'hold', name: 'Hold-downs and anchor bolts', sys: 'lateral', helps: 'stability',
    def: 'Steel brackets and anchor bolts at the ends of shear walls. They resist the uplift and overturning that a sideways push causes.',
    next: 'They bolt the wall to the foundation.',
    risk: 'Stability is at risk: the wall would lift at one end and overturn instead of resisting the push.' },
  { id: 'found', name: 'Foundation', sys: 'both', helps: 'strength, stiffness, and stability',
    def: 'Concrete footings and stem walls. They spread gravity load over enough soil and hold the building against sliding and uplift.',
    next: 'Gravity load and lateral force both go into the soil.',
    risk: 'Stiffness is at risk: the building would settle unevenly, and its sliding resistance would be lost.' }
];
const elById = {};
ELEMENTS.forEach(e => { elById[e.id] = e; });

// ---- State ----
let view = 'Show both';   // Show gravity system, Show lateral system, Show both
let selected = null;      // element id shown in the infobox
let removed = {};         // element ids that have been removed
let polys = {};           // screen polygons per element id, rebuilt every frame
let hoverId = null;
let narrow = false, ox = 0, ax = 1, bx = 0, by = 0, zs = 1, Yl = {}, areaW = 0, P = {};

// ---- Controls ----
let viewRadio, deadBox, snowBox, windBox, windSlider, removeButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  viewRadio = createRadio();
  ['Show gravity system', 'Show lateral system', 'Show both'].forEach(o => viewRadio.option(o));
  viewRadio.selected('Show both');
  viewRadio.changed(() => { view = viewRadio.value(); });

  deadBox = createCheckbox('Dead load', true);
  snowBox = createCheckbox('Snow load', true);
  windBox = createCheckbox('Wind load', true);

  windSlider = createSlider(70, 130, 115, 5);

  removeButton = createButton('Remove this element');
  removeButton.mousePressed(toggleRemove);

  positionControls();
  describe('An exploded view of the idealized Riverbend building, 120 ft by 75 ft, drawn as stacked layers from the roof deck down to the foundation: deck with edge chords, joists, glulam girders, wall framing with posts and hold-downs, and the foundation. Gravity elements are blue, lateral elements are orange, and elements that serve both are striped. Arrows show dead, snow, and wind loads. Clicking an element opens an infobox, and a button removes it to show which requirement is at risk.', LABEL);
}

// rows: radio, checkboxes, wind slider, remove button
function positionControls() {
  const y = drawHeight;
  viewRadio.position(10, y + 3);
  viewRadio.style('width', (canvasWidth - 20) + 'px');
  deadBox.position(10, y + 47);
  snowBox.position(130, y + 47);
  windBox.position(250, y + 47);
  windSlider.position(sliderLeftMargin, y + 80);
  windSlider.size(max(100, canvasWidth - sliderLeftMargin - 20));
  removeButton.position(10, y + 112);
}

// ---- Projection: oblique view of the 120 ft by 75 ft footprint, one layer per structural level ----
function layout() {
  narrow = canvasWidth < 600;
  const left = narrow ? 62 : 92;
  areaW = narrow ? canvasWidth - 8 : floor(canvasWidth * 0.64);
  ax = (areaW - left - 8) / (120 + 0.55 * 75);
  ox = left;
  bx = 0.55 * ax;
  P = narrow ? { x: 6, y: drawHeight - 156, w: canvasWidth - 12, h: 150 } : { x: areaW + 4, y: 44, w: canvasWidth - areaW - 12, h: drawHeight - 52 };
  const topY = narrow ? 84 : 90, bottomY = (narrow ? P.y - 24 : drawHeight - 26);
  const hw = min(34, 14 * ax * 0.85), gap = 7;
  const rise = min(0.22 * ax * 75, (bottomY - topY - hw - 4 * gap) / 5);
  by = rise / 75;
  zs = hw / 14;
  // front-bottom edge of each layer; layer 1 is the deck, layer 5 the foundation
  Yl[5] = bottomY;
  Yl[4] = Yl[5] - rise - gap;
  Yl[3] = Yl[4] - hw - rise - gap;
  Yl[2] = Yl[3] - rise - gap;
  Yl[1] = Yl[2] - rise - gap;
}
const pt = (x, y, layer, z) => [ox + ax * x + bx * y, Yl[layer] - by * y - zs * (z || 0)];
const quad = (x0, y0, x1, y1, layer, z) => [pt(x0, y0, layer, z), pt(x1, y0, layer, z), pt(x1, y1, layer, z), pt(x0, y1, layer, z)];
const GX = [0, 1, 2, 3, 4, 5, 6].map(i => 8 + 16 * i);  // girder lines every 16 ft

function buildPolys() {
  const wallQuad = (x0, y0, x1, y1) => [pt(x0, y0, 4, 0), pt(x1, y1, 4, 0), pt(x1, y1, 4, 14), pt(x0, y0, 4, 14)];
  polys = {
    found: [quad(0, 0, 120, 7, 5), quad(0, 68, 120, 75, 5), quad(0, 7, 7, 68, 5), quad(113, 7, 120, 68, 5)],
    wall: [wallQuad(0, 75, 120, 75), wallQuad(0, 0, 0, 75), wallQuad(120, 0, 120, 75), wallQuad(0, 0, 120, 0)],
    post: [], hold: [],
    girder: GX.map(x => quad(x - 2.5, 0, x + 2.5, 75, 3)),
    joist: [quad(0, 0, 120, 75, 2)],
    deck: [quad(0, 0, 120, 75, 1)],
    chord: [quad(0, 0, 120, 4, 1), quad(0, 71, 120, 75, 1), quad(0, 4, 4, 71, 1), quad(116, 4, 120, 71, 1)]
  };
  GX.forEach(x => [0, 75].forEach(y => {
    const a = pt(x, y, 4, 0), b = pt(x, y, 4, 14);
    polys.post.push([[a[0] - 3, a[1]], [a[0] + 3, a[1]], [b[0] + 3, b[1]], [b[0] - 3, b[1]]]);
  }));
  [[3, 3], [117, 3], [3, 72], [117, 72]].forEach(c => {
    const a = pt(c[0], c[1], 4, 0), b = pt(c[0], c[1], 4, 4);
    polys.hold.push([[a[0] - 5, a[1]], [a[0] + 5, a[1]], [b[0] + 5, b[1]], [b[0] - 5, b[1]]]);
  });
}

function inPoly(poly, x, y) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

// front-to-back priority for picking: small elements first
const PICK = ['hold', 'post', 'chord', 'girder', 'joist', 'deck', 'wall', 'found'];
function visible(id) { return view === 'Show both' || elById[id].sys === 'both' || (view === 'Show gravity system' ? elById[id].sys === 'gravity' : elById[id].sys === 'lateral'); }
function pickAt(mx, my) {
  for (const id of PICK) {
    if (!visible(id)) continue;
    if (polys[id].some(p => inPoly(p, mx, my))) return id;
  }
  return null;
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  layout();
  buildPolys();
  hoverId = (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) ? pickAt(mouseX, mouseY) : null;
  cursor(hoverId ? HAND : ARROW);

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
  text('Riverbend Structural System Explorer', narrow ? canvasWidth / 2 : areaW / 2 + 10, 6);
  if (narrow) { textSize(14); } else { textSize(14); }

  drawGhosts();
  ['found', 'wall', 'post', 'hold', 'girder', 'joist', 'deck', 'chord'].forEach(drawElement);
  drawLayerLabels();
  drawLoads();
  drawPanel();
  drawTooltip();
  drawControlLabels();
  updateRemoveButton();
}

// faint footprint outline of every layer, so the stack reads as one building
function drawGhosts() {
  const ctx = drawingContext;
  ctx.save();
  ctx.setLineDash([4, 4]);
  stroke('silver');
  strokeWeight(1);
  noFill();
  [1, 2, 3, 5].forEach(l => { const q = quad(0, 0, 120, 75, l); beginShape(); q.forEach(p => vertex(p[0], p[1])); endShape(CLOSE); });
  ctx.restore();
  // dotted corner lines tying the layers together
  ctx.save();
  ctx.setLineDash([2, 4]);
  [[0, 0], [120, 0], [0, 75], [120, 75]].forEach(c => { const a = pt(c[0], c[1], 1), b = pt(c[0], c[1], 5); stroke('silver'); line(a[0], a[1], b[0], b[1]); });
  ctx.restore();
}

function paintPoly(poly, id, alpha) {
  const ctx = drawingContext, sys = elById[id].sys, gone = removed[id];
  const sel = id === selected, hov = id === hoverId;
  const path = () => { ctx.beginPath(); poly.forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]))); ctx.closePath(); };
  ctx.save();
  ctx.globalAlpha = alpha;
  path();
  if (gone) { ctx.fillStyle = 'lightgray'; ctx.fill(); }
  else if (sys === 'both') {
    ctx.fillStyle = 'lightskyblue';
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 4;
    const xs = poly.map(p => p[0]), ys = poly.map(p => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    for (let s = x0 - (y1 - y0); s < x1; s += 9) { ctx.beginPath(); ctx.moveTo(s, y1); ctx.lineTo(s + (y1 - y0), y0); ctx.stroke(); }
    ctx.restore();
  } else { ctx.fillStyle = sys === 'gravity' ? 'lightskyblue' : 'orange'; ctx.fill(); }
  ctx.lineWidth = sel ? 4 : (hov ? 3 : 1.5);
  ctx.strokeStyle = sel || hov ? 'navy' : (gone ? 'gray' : (sys === 'lateral' ? 'darkorange' : 'steelblue'));
  if (gone) ctx.setLineDash([5, 4]);
  path();
  ctx.stroke();
  ctx.restore();
}

function drawElement(id) {
  const alpha = visible(id) ? 1 : 0.15;
  const ctx = drawingContext;
  const wallAlpha = id === 'wall' ? 0.6 * alpha : alpha;
  polys[id].forEach(p => paintPoly(p, id, wallAlpha));
  if (!visible(id)) return;
  ctx.save();
  // detail lines
  if (id === 'wall' && !removed.wall) {
    stroke('steelblue');
    strokeWeight(1);
    for (let x = 8; x < 120; x += 8) { const a = pt(x, 0, 4, 0), b = pt(x, 0, 4, 14), c = pt(x, 75, 4, 0), d = pt(x, 75, 4, 14); line(a[0], a[1], b[0], b[1]); line(c[0], c[1], d[0], d[1]); }
  }
  if (id === 'joist' && !removed.joist) {
    stroke('steelblue');
    strokeWeight(1.5);
    for (let y = 6; y < 75; y += 12) { const a = pt(0, y, 2), b = pt(120, y, 2); line(a[0], a[1], b[0], b[1]); }
  }
  if (id === 'deck' && !removed.deck) {
    stroke('steelblue');
    strokeWeight(1);
    for (let x = 8; x < 120; x += 8) { const a = pt(x, 4, 1), b = pt(x, 71, 1); line(a[0], a[1], b[0], b[1]); }
  }
  // a big X over a removed element
  if (removed[id]) {
    const all = polys[id].flat ? polys[id].flat() : [];
    const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
    if (id === 'post' || id === 'hold' || id === 'girder' || id === 'chord') {
      polys[id].forEach(p => { const c = p.reduce((s, q) => [s[0] + q[0] / 4, s[1] + q[1] / 4], [0, 0]); stroke('crimson'); strokeWeight(2); line(c[0] - 5, c[1] - 5, c[0] + 5, c[1] + 5); line(c[0] + 5, c[1] - 5, c[0] - 5, c[1] + 5); });
    } else {
      const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
      stroke('crimson');
      strokeWeight(3);
      line(x0, y0, x1, y1);
      line(x1, y0, x0, y1);
    }
  }
  ctx.restore();
}

function tag(s, x, y, al, size) {
  textSize(size || 14);
  const w = textWidth(s) + 6;
  const tx = constrain(al === RIGHT ? x - w : (al === CENTER ? x - w / 2 : x), 2, canvasWidth - w - 2);
  noStroke();
  fill(255, 255, 255, 220);
  rect(tx, y - 10, w, 20, 3);
  fill('black');
  textAlign(LEFT, CENTER);
  text(s, tx + 3, y);
}

function drawLayerLabels() {
  const s = narrow ? 12 : 14, lx = ox - 4;
  const mid = (l) => Yl[l] - by * 37;
  tag('Roof deck', lx, mid(1) - 8, RIGHT, s);
  tag('Chords', lx, mid(1) + 12, RIGHT, s);
  tag('Joists', lx, mid(2), RIGHT, s);
  tag('Girders', lx, mid(3), RIGHT, s);
  const w = pt(60, 0, 4, 11);
  tag('Wall framing', w[0], w[1], CENTER, s);
  const p = pt(GX[1], 0, 4, 5);
  tag('Post', p[0] + 5, p[1] - 12, LEFT, s);
  const h = pt(117, 3, 4, 2);
  tag('Hold-down', h[0] - 8, h[1] + 14, RIGHT, s);
  const f = pt(60, 0, 5, 0);
  tag('Foundation', f[0], f[1] + 11, CENTER, s);
}

// ---- Load arrows: lengths proportional to pressure ----
function arrow(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(3);
  line(x1, y1, x2, y2);
  noStroke();
  fill(col);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  triangle(0, 0, -9, -5, -9, 5);
  pop();
}

function windPressure() { return 20 * sq(windSlider.value() / 115); }

function drawLoads() {
  const k = narrow ? 0.8 : 1;
  const dead = deadBox.checked(), snow = snowBox.checked();
  if (dead || snow) {
    [20, 45, 70, 95].forEach((x, i) => {
      const tip = pt(x, 66, 1);
      const dl = dead ? 15 * k : 0, sl = snow ? 35 * k : 0;
      if (dead) arrow(tip[0], tip[1] - dl, tip[0], tip[1], 'navy');
      if (snow) arrow(tip[0], tip[1] - dl - sl, tip[0], tip[1] - dl, 'dodgerblue');
      if (i === 3) {
        if (dead) tag('Dead 15 psf', tip[0] + 6, tip[1] - dl / 2, LEFT, narrow ? 12 : 14);
        if (snow) tag('Snow 35 psf', tip[0] + 6, tip[1] - dl - sl / 2 - (dead ? 6 : 0), LEFT, narrow ? 12 : 14);
      }
    });
  }
  if (windBox.checked()) {
    const p = windPressure(), len = p * 3 * k;
    [18, 37, 56].forEach(y => {
      const tip = pt(0, y, 4, 7);
      arrow(tip[0] - len, tip[1], tip[0] - 2, tip[1], 'darkorange');
    });
    const t = pt(0, 37, 4, 7);
    tag('Wind ' + nf(p, 0, 1) + ' psf', 4, t[1] - 24, LEFT, narrow ? 12 : 14);
    tag(windSlider.value() + ' mph', 4, t[1] + 22, LEFT, narrow ? 12 : 14);
  }
}

// ---- Infobox panel ----
function drawPanel() {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  noStroke();
  const x = P.x + 10, w = P.w - 20;
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  if (!selected) {
    text('Hover over an element to see its name. Click one to see which system it belongs to and what it hands the load to next.', x, P.y + 8, w, P.h - 12);
    return;
  }
  const e = elById[selected];
  textSize(16);
  textStyle(BOLD);
  text(e.name, x, P.y + 6, w, 20);
  textStyle(NORMAL);
  const sysText = e.sys === 'both' ? 'Both: gravity and lateral system' : (e.sys === 'gravity' ? 'Gravity load system' : 'Lateral load system');
  const col = e.sys === 'gravity' ? 'steelblue' : (e.sys === 'lateral' ? 'darkorange' : 'sienna');
  textSize(14);
  fill(col);
  textStyle(BOLD);
  let y = P.y + (narrow ? 26 : 30);
  text(sysText, x, y, w, 18);
  textStyle(NORMAL);
  fill('black');
  y += 20;
  if (removed[selected]) {
    fill('crimson');
    text(e.risk, x, y, w, P.y + P.h - y - 4);
    return;
  }
  if (narrow) {
    text(e.def, x, y, w, 68);
    text('Next: ' + e.next, x, y + 70, w, 36);
    return;
  }
  text(e.def, x, y, w, 100);
  y += 104;
  text('Hands to next: ' + e.next, x, y, w, 70);
  y += 72;
  text('Helps satisfy: ' + e.helps + '.', x, y, w, 40);
}

function drawTooltip() {
  if (!hoverId) return;
  const s = elById[hoverId].name;
  tag(s, mouseX + 14, mouseY - 14, LEFT, 14);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Wind speed: ' + windSlider.value() + ' mph', 10, drawHeight + 92);
  if (removeNote) text(removeNote, 190, drawHeight + 124);
}

// ---- Actions ----
let removeNote = '';
function updateRemoveButton() {
  removeButton.elt.disabled = !selected;
  removeButton.html(selected && removed[selected] ? 'Restore this element' : 'Remove this element');
  removeNote = selected ? '' : 'Click an element first';
}
function toggleRemove() {
  if (!selected) return;
  removed[selected] = !removed[selected];
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  const id = pickAt(mouseX, mouseY);
  if (id) selected = id;
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
