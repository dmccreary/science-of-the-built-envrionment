// Roof Assembly Layer Explorer MicroSim - click each layer of a steep-slope or low-slope roof to see which control layers (water, air, vapor, heat) it provides, then remove it to see what it protects against
// CANVAS_HEIGHT: 480
// Bloom Level 1 (Remember) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 365;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10; // no sliders in this sim; kept for the template
let defaultTextSize = 16;

// ---- Data: layers listed from the exterior (top of the drawing) to the interior ----
// kind sets the color and pattern; w is a distorted relative thickness; ctl lists the control layers provided
const stacks = {
  'Steep-slope attic roof': [
    { name: 'Asphalt shingles', kind: 'shingle', w: 14, ctl: ['water'], full: 'Asphalt shingles (covering)',
      fn: 'Shed rain and snow over overlapping courses.', fail: 'Loose tabs or high nails let wind-driven water under.',
      rem: 'No covering: the underlayment sheds rain for now but breaks down in the sun.' },
    { name: 'Underlayment', kind: 'mem', w: 10, ctl: ['water'], full: 'Underlayment and eave ice barrier',
      fn: 'Backup water barrier under the shingles; self-adhered at the eaves.', fail: 'Torn at the eave: wind-driven water reaches the deck.',
      rem: 'Water that gets past a shingle soaks the deck, and ice dams leak.' },
    { name: 'Plywood sheathing', kind: 'wood', w: 14, ctl: [], full: 'Plywood sheathing (roof deck)',
      fn: 'Deck that carries the covering and stiffens the roof.', fail: 'Kept wet for long periods, it swells and rots.',
      rem: 'Nothing to nail the shingles to, and the roof loses its stiffness.' },
    { name: 'Trusses', kind: 'wood', w: 22, ctl: [], full: 'Roof trusses or rafters (structure)',
      fn: 'Carry the roof loads to the walls: snow, rain, and wind.', fail: 'Undersized or notched members sag under snow load.',
      rem: 'No structure: nothing carries the roof loads, and the roof would collapse.' },
    { name: 'Vented attic space', kind: 'air', w: 36, ctl: ['vapor', 'heat'], full: 'Ventilated attic air space',
      fn: 'Moving outdoor air keeps the deck cold and carries moisture out.', fail: 'Insulation that blocks the soffit vents stops the airflow.',
      rem: 'No airflow: the deck stays warmer and moisture that leaks up lingers.' },
    { name: 'Blown insulation', kind: 'ins', w: 30, ctl: ['heat'], full: 'Blown-in insulation (R-49)',
      fn: 'Slows heat flow from the house into the cold attic.', fail: 'Thin or compressed at the eaves, so heat leaks through.',
      rem: '' },
    { name: 'Drywall + air barrier', kind: 'drywall', w: 14, ctl: ['air', 'vapor'], full: 'Ceiling drywall with sealed air barrier',
      fn: 'Sealed ceiling plane that stops warm, moist air rising into the attic.', fail: 'Unsealed light fixtures and wire holes leak moist air up.',
      rem: '' }
  ],
  'Low-slope membrane roof': [
    { name: 'Membrane', kind: 'membrane', w: 10, ctl: ['water'], full: 'Roofing membrane (EPDM, TPO, or PVC)',
      fn: 'Continuous waterproof sheet; it is the roof covering.', fail: 'An open seam or poor flashing at a penetration lets water in.',
      rem: 'No water control: rain goes straight into the insulation and the deck.' },
    { name: 'Cover board', kind: 'board', w: 10, ctl: [], full: 'Cover board',
      fn: 'Protects the foam and gives the membrane a firm base.', fail: 'Left out: hail and foot traffic dent the foam under the membrane.',
      rem: 'The membrane sits on soft foam, so punctures and wind damage rise.' },
    { name: 'Rigid insulation', kind: 'ins', w: 44, ctl: ['heat'], full: 'Rigid insulation (polyiso, tapered)',
      fn: 'Continuous insulation above the deck; the taper drains water.', fail: 'Wet insulation from a leak loses R-value and stays wet.',
      rem: '' },
    { name: 'Vapor retarder', kind: 'mem', w: 8, ctl: ['air', 'vapor'], full: 'Vapor retarder and air barrier over the deck',
      fn: 'Keeps warm, moist indoor air out of the cold insulation.', fail: 'Unsealed laps and penetrations let moist air through.',
      rem: '' },
    { name: 'Steel deck', kind: 'wood', w: 22, ctl: [], full: 'Structural deck (steel, wood panels, or concrete)',
      fn: 'Carries the roof loads and supports every layer above it.', fail: 'A deck that deflects too far lets water stand in ponds.',
      rem: 'No structure: nothing carries the roof loads, and the roof would collapse.' }
  ]
};
const tabNames = Object.keys(stacks);

const ctlInfo = {
  water: { name: 'Water', col: 'dodgerblue', def: 'keeps rain out' },
  air: { name: 'Air', col: 'gray', def: 'stops air leaks' },
  vapor: { name: 'Vapor', col: 'mediumpurple', def: 'limits moisture' },
  heat: { name: 'Heat', col: 'darkorange', def: 'slows heat flow' }
};

// ---- Heat-flow constants: 70 degF inside, 10 degF outside (Chapter 13 worked example) ----
const T_IN = 70, T_OUT = 10, R_FILM_IN = 0.68, R_FILM_OUT = 0.17;
const LEAK = 0.065;        // BTU/h*ft2*degF carried by air leaking through an open ceiling
const ATTIC_VENT = 0.432, ATTIC_SHUT = 0.032, ROOF_UP = 0.64; // paths from the attic to the outdoors
const DEW_POINT = 37;      // degF for 70 degF air at 30 percent relative humidity (illustrative)

// ---- State ----
let tab = tabNames[0];
let removed = {};          // removed[tab][i] = true when a layer is removed
let selected = -1;
let hover = -1;
let lastRemoved = -1;      // layer whose consequence the status line shows
let rects = [];

// ---- Controls ----
let tabRadio, heatCheck, waterCheck, removeBtn, restoreBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  tabNames.forEach(t => { removed[t] = stacks[t].map(() => false); });

  tabRadio = createRadio();
  tabNames.forEach(t => tabRadio.option(t));
  tabRadio.selected(tab);
  tabRadio.style('width', '420px');
  tabRadio.changed(() => { tab = tabRadio.value(); selected = -1; lastRemoved = -1; });

  heatCheck = createCheckbox('Show heat flow', false);
  waterCheck = createCheckbox('Show water path', false);

  removeBtn = createButton('Remove this layer');
  removeBtn.mousePressed(toggleRemove);
  restoreBtn = createButton('Restore all layers');
  restoreBtn.mousePressed(() => { removed[tab] = stacks[tab].map(() => false); lastRemoved = -1; });

  positionControls();
  describe('A cross-section of a roof assembly drawn as a stack of labeled, color-coded and patterned bands from the exterior covering at the top to the interior ceiling at the bottom. Two tabs switch between a steep-slope attic roof and a low-slope membrane roof. Hovering over a layer highlights it, clicking a layer opens an infobox with its function, the control layers it provides among water, air, vapor, and heat, and one common failure. A Remove this layer button grays out the layer and shows the consequence. Checkboxes draw heat-flow arrows with winter temperatures and animate a raindrop along the shortest route over or through the assembly.', LABEL);
}

function positionControls() {
  tabRadio.position(10, drawHeight + 6);
  heatCheck.position(10, drawHeight + 42);
  waterCheck.position(10 + heatCheck.elt.getBoundingClientRect().width + 20, drawHeight + 42);
  removeBtn.position(10, drawHeight + 78);
  restoreBtn.position(10 + removeBtn.elt.getBoundingClientRect().width + 16, drawHeight + 78);
}

function layersNow() { return stacks[tab]; }
function isRemoved(i) { return removed[tab][i]; }

function toggleRemove() {
  if (selected < 0) return;
  removed[tab][selected] = !removed[tab][selected];
  lastRemoved = removed[tab][selected] ? selected : -1;
}

// ---- Heat model for the current stack ----
function heatModel() {
  const r = removed[tab];
  if (tab === tabNames[0]) {
    const rc = R_FILM_IN + (r[6] ? 0 : 0.56) + (r[5] ? 0 : 49);          // ceiling: film, drywall, insulation
    const a = 1 / rc + (r[6] ? LEAK : 0);                                  // room to attic
    const b = ROOF_UP + (r[4] ? ATTIC_SHUT : ATTIC_VENT);                  // attic to outdoors
    const Ta = (T_IN * a + T_OUT * b) / (a + b);
    const q = a * (T_IN - Ta);
    return { q, temps: { ceiling: T_IN - q * R_FILM_IN, attic: Ta, out: T_OUT } };
  }
  const R = [0.1, r[1] ? 0 : 0.5, r[2] ? 0 : 34.2, 0, 0];                 // membrane, cover board, insulation, vapor retarder, deck
  const rTot = R_FILM_IN + R_FILM_OUT + R.reduce((s, v) => s + v, 0);
  const q = (T_IN - T_OUT) / rTot;
  const tDeck = T_IN - q * R_FILM_IN;
  const tIns = tDeck - q * R[2];
  return { q, temps: { ceiling: tDeck, attic: tIns, out: T_OUT + q * R_FILM_OUT } };
}

function consequence(i) {
  const L = layersNow()[i];
  const steep = tab === tabNames[0];
  if (L.rem) return L.name + ' removed. ' + L.rem;
  const orig = JSON.parse(JSON.stringify(removed[tab]));
  removed[tab] = stacks[tab].map(() => false);
  const q0 = heatModel().q;
  removed[tab] = orig;
  const q1 = heatModel().q;
  const ratio = nf(q1 / q0, 1, 1);
  if (steep && i === 5) return 'Insulation removed. Heat loss through the ceiling rises from ' + nf(q0, 1, 1) + ' to ' + nf(q1, 1, 1) + ' BTU/h·ft², about ' + ratio + ' times.';
  if (steep && i === 6) return 'Air barrier removed. Warm, moist air leaks into the attic; heat loss rises ' + ratio + ' times. Ice dams follow.';
  if (i === 2) return 'Insulation removed. Heat loss rises from ' + nf(q0, 1, 1) + ' to ' + nf(q1, 1, 1) + ' BTU/h·ft², about ' + ratio + ' times.';
  return 'Vapor retarder removed. Moist indoor air reaches insulation colder than the ' + DEW_POINT + ' °F dew point and condenses.';
}

// ---- Layout ----
function layout() {
  const L = layersNow();
  const narrow = canvasWidth < 560;
  const x = 10, y = 48;
  const w = narrow ? canvasWidth - 20 : floor(canvasWidth * 0.5) - 10;
  const H = narrow ? 126 : 256;
  const minH = 18;
  const sum = L.reduce((s, l) => s + l.w, 0);
  let hs = L.map(l => max(minH, H * l.w / sum));
  const scale = H / hs.reduce((s, v) => s + v, 0);
  hs = hs.map(v => v * scale);
  let yy = y;
  rects = L.map((l, i) => { const r = { x, y: yy, w, h: hs[i] }; yy += hs[i]; return r; });
  return { narrow, x, y, w, H, bottom: yy };
}

function draw() {
  updateCanvasSize();
  const lay = layout();
  const L = layersNow();

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
  text('Roof Assembly Layer Explorer', canvasWidth / 2, 6);

  hover = -1;
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) {
    for (let i = 0; i < rects.length; i++) {
      const r = rects[i];
      if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) hover = i;
    }
  }

  noStroke(); fill('dimgray'); textSize(12); textAlign(LEFT, TOP);
  if (!waterCheck.checked()) text('OUTSIDE', lay.x, 34);
  if (!heatCheck.checked()) text('INSIDE (room). Thickness exaggerated, drawn flat, not to scale.', lay.x, lay.bottom + 2);

  for (let i = 0; i < L.length; i++) drawBand(i);
  if (heatCheck.checked()) drawHeat(lay);
  if (waterCheck.checked()) drawWater(lay);
  drawLegend(lay);
  drawInfobox(lay);
  drawStatus();
  drawTooltip();
}

// ---- Patterns: each band has a fill color and a pattern so it reads without color ----
const kindStyle = {
  shingle: { col: 'firebrick' }, mem: { col: 'dimgray' }, membrane: { col: 'darkslategray' }, wood: { col: 'peru' },
  air: { col: 'lightcyan' }, ins: { col: 'khaki' }, drywall: { col: 'whitesmoke' }, board: { col: 'tan' }
};

function drawBand(i) {
  const l = layersNow()[i], r = rects[i], gone = isRemoved(i);
  const ctx = drawingContext;
  noStroke();
  fill(gone ? 'gainsboro' : kindStyle[l.kind].col);
  rect(r.x, r.y, r.w, r.h);
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  strokeWeight(1);
  if (!gone) {
    if (l.kind === 'wood') { stroke('saddlebrown'); for (let y = r.y + 4; y < r.y + r.h; y += 5) line(r.x, y, r.x + r.w, y); }
    else if (l.kind === 'ins') { stroke('goldenrod'); noFill(); for (let x = r.x + 6; x < r.x + r.w; x += 14) for (let y = r.y + 6; y < r.y + r.h; y += 10) { arc(x, y, 12, 8, 0, PI); arc(x + 6, y + 4, 12, 8, PI, TWO_PI); } }
    else if (l.kind === 'mem' || l.kind === 'membrane') { stroke('white'); for (let x = r.x + 4; x < r.x + r.w; x += 12) line(x, r.y + r.h - 3, x + 6, r.y + r.h - 3); }
    else if (l.kind === 'shingle') { stroke('maroon'); noFill(); for (let x = r.x; x < r.x + r.w; x += 16) arc(x + 8, r.y + 2, 16, 16, 0, PI); for (let x = r.x + 8; x < r.x + r.w; x += 16) arc(x + 8, r.y + r.h / 2 + 2, 16, 14, 0, PI); }
    else if (l.kind === 'air') { stroke('lightsteelblue'); for (let x = r.x + 8; x < r.x + r.w; x += 16) for (let y = r.y + 7; y < r.y + r.h; y += 12) point(x, y); }
    else if (l.kind === 'drywall') { stroke('silver'); for (let x = r.x + 5; x < r.x + r.w; x += 10) for (let y = r.y + 5; y < r.y + r.h; y += 8) point(x, y); }
    else if (l.kind === 'board') { stroke('sienna'); for (let x = r.x - r.h; x < r.x + r.w; x += 10) line(x, r.y + r.h, x + r.h, r.y); }
  }
  ctx.restore();
  stroke(i === selected ? 'navy' : (i === hover ? 'black' : 'dimgray'));
  strokeWeight(i === selected ? 4 : (i === hover ? 3 : 1));
  if (gone) drawingContext.setLineDash([5, 4]);
  noFill();
  rect(r.x, r.y, r.w, r.h);
  drawingContext.setLineDash([]);

  // name and the control-layer icons
  noStroke();
  fill(gone ? 'dimgray' : (['shingle', 'mem', 'membrane'].includes(l.kind) ? 'white' : 'black'));
  textAlign(LEFT, CENTER); textSize(14);
  text(l.name + (gone ? ' (removed)' : ''), r.x + 8, r.y + r.h / 2);
  if (!gone) l.ctl.forEach((c, k) => drawIcon(c, r.x + r.w - 14 - k * 22, r.y + r.h / 2, true));
}

// four icons: water drop, air waves, vapor dots, heat wave arrow
function drawIcon(kind, cx, cy, backing) {
  push();
  translate(cx, cy);
  if (backing) { noStroke(); fill('white'); circle(0, 0, 19); }
  const col = ctlInfo[kind].col;
  if (kind === 'water') { noStroke(); fill(col); triangle(0, -7, -5, 1, 5, 1); circle(0, 2, 10); }
  else if (kind === 'air') { noFill(); stroke(col); strokeWeight(2); for (let k = -1; k <= 1; k++) { beginShape(); for (let x = -7; x <= 7; x += 2) vertex(x, k * 4 + 2.5 * sin(x * 0.9)); endShape(); } }
  else if (kind === 'vapor') { noStroke(); fill(col); circle(-3, 4, 4); circle(3, 0, 4); circle(-2, -5, 4); circle(4, -7, 3); }
  else { stroke(col); strokeWeight(3); noFill(); line(0, 7, 0, -6); noStroke(); fill(col); triangle(0, -9, -5, -3, 5, -3); }
  pop();
}

// ---- Heat flow: arrows up through the layers plus winter temperature tags ----
function drawHeat(lay) {
  const h = heatModel();
  const wArrow = constrain(h.q * 0.25 + 3, 3, 9);
  const xs = [lay.x + lay.w * 0.45, lay.x + lay.w * 0.6];
  for (const x of xs) {
    stroke(255, 140, 0, 150); strokeWeight(wArrow);
    line(x, lay.bottom - 2, x, lay.y + 12);
    noStroke(); fill(255, 140, 0, 170);
    triangle(x, lay.y + 2, x - wArrow - 4, lay.y + 14, x + wArrow + 4, lay.y + 14);
  }
  const tags = [[lay.y, h.temps.out, 'out'], [rects[tab === tabNames[0] ? 5 : 2].y, h.temps.attic, tab === tabNames[0] ? 'attic' : 'top of foam'], [lay.bottom, h.temps.ceiling, 'ceiling']];
  textSize(12);
  for (const [yy, t, nm] of tags) {
    const lbl = nm + ' ' + nf(t, 1, 1) + ' °F';
    const bw = textWidth(lbl) + 10;
    const bx = lay.x + lay.w - 84 - bw;
    const by = constrain(yy, lay.y + 8, lay.bottom - 8);
    stroke('darkorange'); strokeWeight(1); fill('white');
    rect(bx, by - 8, bw, 16, 8);
    noStroke(); fill('black'); textAlign(CENTER, CENTER);
    text(lbl, bx + bw / 2, by);
  }
  noStroke(); fill('darkorange'); textAlign(LEFT, TOP); textSize(12);
  text('Heat out: ' + nf(h.q, 1, 1) + ' BTU/h·ft² (70 °F in, 10 °F out)', lay.x, lay.bottom + 2);
}

// ---- Water path: over the covering if it is intact, otherwise through to the first layer that stops it ----
function waterPlan(lay) {
  const L = layersNow();
  const waterIdx = L.map((l, i) => l.ctl.includes('water') ? i : -1).filter(i => i >= 0 && !isRemoved(i));
  const x0 = lay.x + lay.w * 0.18;
  if (waterIdx.length) {
    const k = waterIdx[0], r = rects[k];
    const xe = lay.x + lay.w + 16;
    return { pts: [[x0, lay.y - 8], [x0, r.y - 4], [xe, r.y - 4], [xe, r.y + 26]], ok: true,
      msg: k === 0 ? 'Runs over the covering and off the roof.' : 'Covering removed: runs over the ' + L[k].name.toLowerCase() + ' for now.' };
  }
  let k = L.findIndex((l, i) => !isRemoved(i));
  if (k < 0) k = L.length - 1;
  const r = rects[k];
  return { pts: [[x0, lay.y - 8], [x0, r.y + r.h / 2]], ok: false, msg: 'No water control: soaks the ' + L[k].name.toLowerCase() + '.' };
}

function drawWater(lay) {
  const p = waterPlan(lay);
  let len = 0;
  for (let i = 1; i < p.pts.length; i++) len += dist(p.pts[i - 1][0], p.pts[i - 1][1], p.pts[i][0], p.pts[i][1]);
  const t = (millis() / 1000 * 110) % (len + 70);
  noStroke(); fill('dodgerblue');
  for (let k = 0; k < 2; k++) {
    let s = t - k * 90;
    if (s < 0 || s > len) continue;
    for (let i = 1; i < p.pts.length; i++) {
      const d = dist(p.pts[i - 1][0], p.pts[i - 1][1], p.pts[i][0], p.pts[i][1]);
      if (s <= d) { const f = s / d; circle(lerp(p.pts[i - 1][0], p.pts[i][0], f), lerp(p.pts[i - 1][1], p.pts[i][1], f), 9); break; }
      s -= d;
    }
  }
  const e = p.pts[p.pts.length - 1];
  if (!p.ok) { noFill(); stroke('crimson'); strokeWeight(3); line(e[0] - 7, e[1] - 7, e[0] + 7, e[1] + 7); line(e[0] - 7, e[1] + 7, e[0] + 7, e[1] - 7); }
  noStroke(); fill(p.ok ? 'navy' : 'crimson'); textSize(12); textAlign(LEFT, TOP);
  text('Water: ' + p.msg, lay.x, 34);
}

// ---- Legend, infobox, status ----
function drawLegend(lay) {
  if (lay.narrow) {
    const y = lay.bottom + 27;
    const keys = Object.keys(ctlInfo);
    const cw = (canvasWidth - 20) / 4;
    textSize(14); textAlign(LEFT, CENTER);
    keys.forEach((k, i) => { drawIcon(k, 10 + i * cw + 10, y, false); noStroke(); fill('black'); text(ctlInfo[k].name, 10 + i * cw + 24, y); });
    return;
  }
  const x = lay.x + lay.w + 40, y = 52;
  noStroke(); fill('black'); textSize(14); textAlign(LEFT, CENTER);
  text('Control layers', x, y);
  Object.keys(ctlInfo).forEach((k, i) => {
    drawIcon(k, x + 10, y + 26 + i * 24, false);
    noStroke(); fill('black'); textSize(14); textAlign(LEFT, CENTER);
    text(ctlInfo[k].name + ': ' + ctlInfo[k].def, x + 26, y + 26 + i * 24);
  });
}

function infoRect(lay) {
  if (lay.narrow) return { x: 10, y: lay.bottom + 37, w: canvasWidth - 20, h: 116 };
  const x = lay.x + lay.w + 40;
  return { x, y: 170, w: canvasWidth - x - 10, h: 150 };
}

function drawInfobox(lay) {
  const b = infoRect(lay);
  stroke(selected >= 0 ? 'navy' : 'silver'); strokeWeight(selected >= 0 ? 2 : 1);
  fill('white');
  rect(b.x, b.y, b.w, b.h, 8);
  noStroke(); textAlign(LEFT, TOP);
  if (selected < 0) {
    fill('dimgray'); textSize(14);
    text('Click a layer to see its function, the control layers it provides, and a common failure.', b.x + 8, b.y + 8, b.w - 16, b.h - 12);
    return;
  }
  const l = layersNow()[selected];
  fill('navy'); textSize(16);
  text(l.full + (isRemoved(selected) ? ' (removed)' : ''), b.x + 8, b.y + 4, b.w - 16, 22);
  let y = b.y + 26;
  fill('black'); textSize(14);
  text('Provides:', b.x + 8, y + 1);
  if (l.ctl.length === 0) text('none (structure or protection)', b.x + 78, y + 1);
  l.ctl.forEach((c, k) => { drawIcon(c, b.x + 90 + k * 78, y + 8, false); noStroke(); fill('black'); textAlign(LEFT, TOP); text(ctlInfo[c].name, b.x + 104 + k * 78, y + 1); });
  y += 19;
  fill('black'); textSize(14);
  text('Function: ' + l.fn, b.x + 8, y, b.w - 16, 36);
  y += lay.narrow ? 35 : 52;
  fill('crimson');
  text('Common failure: ' + l.fail, b.x + 8, y, b.w - 16, 36);
}

function drawStatus() {
  noStroke(); textAlign(LEFT, TOP); textSize(14);
  const x = 10, w = canvasWidth - 20, y = drawHeight - 38;
  if (lastRemoved >= 0 && isRemoved(lastRemoved)) { fill('crimson'); text(consequence(lastRemoved), x, y, w, 36); }
  else { fill('dimgray'); text(selected >= 0 ? 'Press Remove this layer to see what it protects against.' : 'All layers in place. Select a layer, then press Remove this layer.', x, y, w, 36); }
}

function drawTooltip() {
  if (hover < 0) return;
  const l = layersNow()[hover];
  const lbl = l.full;
  textSize(14);
  const w = min(canvasWidth - 20, textWidth(lbl) + 20), h = 26;
  const tx = constrain(mouseX + 12, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY - 32, 4, drawHeight - h - 4);
  stroke('navy'); strokeWeight(1); fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  text(lbl, tx + 10, ty + h / 2);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY >= drawHeight) return;
  if (hover >= 0) selected = hover;
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
