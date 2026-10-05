// Control Layer Wall Section Explorer MicroSim - identify the layers of the Riverbend wall and predict what happens when one fails
// CANVAS_HEIGHT: 686
// Bloom Level 1 (Remember) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 536;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Data: the Riverbend wall, outside to inside (Chapter 11). r = illustrative R-value of the layer ----
// fn: control functions the layer serves (W water, A air, V vapor, T thermal)
const layers = [
  { name: 'Siding', full: 'Fiber-cement siding', t: 0.31, minPx: 14, r: 0.10, fill: 'tan', fn: ['W'],
    fnTxt: 'Water: first line of defense, sheds most rain',
    job: 'Sheds most rain and snow; shields layers from sun and impact.',
    mats: 'Fiber cement, wood, vinyl, brick, metal.',
    risk: 'The barrier takes the full weather load and wears out early.' },
  { name: 'Gap', full: 'Drainage gap (3/4 in)', t: 0.75, minPx: 16, r: 0.45, fill: 'azure', fn: ['W'],
    fnTxt: 'Water: drains and dries the wall',
    job: 'Lets water that gets past the siding drain, and lets air dry the wall.',
    mats: 'Furring strips, drainage mat, rainscreen gap.',
    risk: 'Water sits on the barrier and the wall dries slowly.' },
  { name: 'WRB', full: 'Weather-resistive barrier', t: 0.02, minPx: 6, r: 0.05, fill: 'cornflowerblue', fn: ['W'],
    fnTxt: 'Water: the water control layer',
    job: 'A lapped drainage plane that sheds water and lets vapor out.',
    mats: 'Housewrap, building paper, fluid or peel-and-stick membrane.',
    risk: 'Water reaches the sheathing, which dries slowly on the cold side.' },
  { name: 'Foam', full: 'Rigid foam, 2 in XPS (R-10)', t: 2, minPx: 20, r: 10, fill: 'lightpink', fn: ['T', 'V'], thermal: true,
    fnTxt: 'Thermal: continuous insulation; vapor: partly',
    job: 'Insulates over the studs and keeps the sheathing warm and dry.',
    mats: 'XPS, EPS, polyiso, or mineral wool board.',
    risk: 'Heat flow rises and the cold sheathing is more likely to get wet.' },
  { name: 'OSB', full: 'OSB sheathing, 7/16 in, seams taped', t: 0.4375, minPx: 12, r: 0.5, fill: 'peru', fn: ['A'],
    fnTxt: 'Air: the air control layer when seams are taped',
    job: 'Structural skin that also stops air when its seams are taped.',
    mats: 'OSB or plywood with tape; sealed membrane.',
    risk: 'Air carries heat and moisture through the wall; bracing is lost.' },
  { name: 'Batts', full: 'Stud cavity, R-20 fiberglass (5.5 in)', t: 5.5, minPx: 40, r: 20, fill: 'lightyellow', fn: ['T'], thermal: true,
    fnTxt: 'Thermal: inner part of the thermal layer',
    job: 'Fills the stud space to slow heat flow. Not an air barrier.',
    mats: 'Fiberglass, mineral wool, cellulose, spray foam.',
    risk: 'Heat flow rises sharply; an empty cavity is only about R-1.' },
  { name: 'Vapor', full: 'Smart vapor retarder membrane', t: 0.01, minPx: 6, r: 0, fill: 'mediumpurple', fn: ['V'],
    fnTxt: 'Vapor: the vapor control layer, on the warm side',
    job: 'Limits vapor diffusion in winter; a smart one opens in summer.',
    mats: 'Smart membrane, polyethylene, kraft facing.',
    risk: 'More vapor reaches the cold sheathing.' },
  { name: 'Gypsum', full: 'Gypsum board, 1/2 in', t: 0.5, minPx: 12, r: 0.45, fill: 'gainsboro', fn: ['V'],
    fnTxt: 'Interior finish; vapor: partly (painted)',
    job: 'Interior finish; painted gypsum slows vapor a little.',
    mats: 'Gypsum board, 1/2 or 5/8 in, painted.',
    risk: 'Membrane and insulation exposed; no fire protection.' }
];

// Function colors and names
const fnInfo = {
  W: { name: 'Water', col: 'dodgerblue' },
  A: { name: 'Air', col: 'seagreen' },
  V: { name: 'Vapor', col: 'purple' },
  T: { name: 'Thermal', col: 'darkorange' }
};

// One-sentence consequences for the layers whose result does not depend on computed numbers
const effects = [
  { missing: 'Rain and sun now hit the barrier directly. It sheds water but is not built for sunlight, so it ages and tears early.',
    hole: 'Wind-driven rain enters here, but the gap and barrier drain it out. A drained wall tolerates this; a face-sealed wall would not.',
    seam: 'Rain is driven into the open joint, but the barrier behind it drains the water out. Only the second line of defense is working.' },
  { missing: 'Water behind the siding has no path down and no air to dry it, so the barrier stays wet longer.',
    hole: 'A blocked spot makes water back up and the barrier stay wet behind it; the wall dries only through the open parts.',
    seam: 'With the bottom opening closed, drained water is trapped inside the wall instead of leaving it.' },
  { missing: 'Water that gets past the siding runs straight to the foam joints and sheathing. It dries slowly there, and the sheathing decays over winters.',
    hole: 'Water reaches the foam joints and the sheathing through the hole, such as an unsealed screw penetration.',
    seam: 'A flipped or unlapped seam lets water run behind the lower course onto the sheathing, though the wall looks fine from the street.' },
  null,
  { missing: 'Nothing stops air or braces the wall. Warm, humid air reaches the cold foam and barrier, where frost forms and later melts onto the wall.',
    hole: 'Warm, humid air streams through the hole to the cold side, and moving air carries far more moisture than diffusion does.',
    seam: 'Untaped seams leak like the top-plate gap in Chapter 11: indoor air reaches cold surfaces, frost forms, melts, and wets the sheathing.' },
  null,
  { missing: 'Vapor now diffuses into the cavity all winter and collects on the cold sheathing. The wall has lost its vapor control layer.',
    hole: 'Vapor, and any air that rides with it, reaches the cold sheathing through the hole. A small hole matters more than its size suggests.',
    seam: 'An unsealed seam lets vapor and air bypass the membrane, which works only where it is continuous.' },
  { missing: 'Membrane and insulation are exposed and the room has no fire-rated finish. The air and vapor layers behind it still work.',
    hole: 'Little changes for the four control layers, since gypsum is not the main air or vapor layer here, but air gains a path into the cavity.',
    seam: 'Open gypsum joints give indoor air a path into the cavity; the taped sheathing must stop it going further.' }
];

const DEW = 37; // dew point of 70 F indoor air at 30 percent relative humidity (Chapter 11)
const T_IN = 70;
const R_OUT_FILM = 0.17;
const R_IN_FILM = 0.68;
const BASE_R = 32.4; // complete wall, cavity path

// ---- State ----
let selected = -1;
let lastBroken = -1;
let phase = 0;
let mouseOverCanvas = false;
let hoverLayer = -1;
let xl = [], xr = []; // left and right x of each strip
let sec, infoR, consR, readR; // panel rectangles
let stripTop = 0, stripBottom = 0, laneY = [], tagY = [], bandY = 0;
let wide = true;

// ---- Controls ----
let checks = [], failSel, profileBox, resetButton, tempSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);
  textSize(defaultTextSize);

  layers.forEach((L, i) => {
    const cb = createCheckbox((i + 1) + ' ' + L.name, false);
    cb.changed(() => { if (cb.checked()) lastBroken = i; selected = i; });
    checks.push(cb);
  });
  failSel = createSelect();
  failSel.option('missing');
  failSel.option('hole');
  failSel.option('unsealed seam');
  failSel.selected('missing');
  profileBox = createCheckbox('Temp. profile', false);
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);
  tempSlider = createSlider(-20, 40, -10, 1);

  positionControls();
  describe('A cross-section of the Riverbend wall from outside on the left to inside on the right: siding, drainage gap, weather-resistive barrier, rigid foam, sheathing, stud cavity insulation, vapor retarder, and gypsum board. Colored bars mark the water, air, vapor, and thermal control layers, and four arrows show rain, air, vapor, and heat approaching the wall. Checkboxes break a layer as missing, with a hole, or with an unsealed seam, a slider sets the outdoor temperature, and a toggle draws the temperature through the wall with the dew point marked.', LABEL);
}

function resetAll() {
  checks.forEach(c => c.checked(false));
  failSel.selected('missing');
  profileBox.checked(false);
  tempSlider.value(-10);
  selected = -1;
  lastBroken = -1;
}

// ---- Control layout: four rows below the drawing ----
function positionControls() {
  const colW = max(88, (canvasWidth - 20) / 4);
  checks.forEach((c, i) => c.position(10 + (i % 4) * colW, drawHeight + (i < 4 ? 6 : 41)));
  failSel.position(80, drawHeight + 76);
  profileBox.position(max(200, canvasWidth * 0.40), drawHeight + 76);
  resetButton.position(max(330, canvasWidth * 0.40 + 125), drawHeight + 76);
  tempSlider.position(sliderLeftMargin, drawHeight + 117);
  tempSlider.size(max(100, canvasWidth - sliderLeftMargin - 25));
}

// ---- State helpers ----
function failKey() { const v = failSel.value(); return v === 'unsealed seam' ? 'seam' : v; }
function broken(i) { return checks[i].checked(); }
function intact(i) { return !broken(i); }
function present(i) { return !(broken(i) && failKey() === 'missing'); }

// effective R of one layer given its failure state
function layerR(i) {
  const L = layers[i];
  if (!broken(i)) return L.r;
  const f = failKey();
  if (i === 5) return f === 'missing' ? 1.0 : L.r * 0.5; // an empty cavity still has about R-1 of still air
  if (L.thermal) return f === 'missing' ? 0 : L.r * 0.5; // gaps and voids halve the layer (illustrative)
  return f === 'missing' ? 0 : L.r;
}

// series calculation along the cavity path: outside face temperature of each layer, plus R and heat flow
function thermal() {
  const tOut = tempSlider.value();
  const rs = layers.map((L, i) => layerR(i));
  const rTot = R_OUT_FILM + rs.reduce((a, b) => a + b, 0) + R_IN_FILM;
  const q = (T_IN - tOut) / rTot;
  let t = tOut + q * R_OUT_FILM;
  const bounds = [t];
  rs.forEach(r => { t += q * r; bounds.push(t); });
  return { tOut, rTot, q, bounds, qBase: (T_IN - tOut) / BASE_R };
}

// first layer (scanning inward from the foam) that can soak up water
function absorber() {
  return [4, 5, 7].find(i => present(i)) ?? 7;
}

// where each of the four flows stops (x) and what it reaches
function flows(th) {
  const x0 = xl[0], x1 = xr[7];
  const f = {};
  // rain: most stops at intact siding, some gets behind it; the barrier stops what gets behind
  const behind = intact(2) ? xl[2] : xl[absorber()];
  if (intact(0)) { f.rainMain = xl[0]; f.rainLeak = behind; } else { f.rainMain = behind; f.rainLeak = null; }
  f.wet = intact(2) ? -1 : absorber(); // layer that gets wet
  // air: stops at the air control layer (taped sheathing) or goes right through
  f.air = intact(4) ? xr[4] : x0;
  // vapor: stops at the retarder; otherwise reaches the sheathing, or passes out if the sheathing is gone
  f.vapor = intact(6) ? xr[6] : (present(4) ? xr[4] : x0);
  // frost forms where leaking air first meets a surface below the dew point
  f.frost = -1;
  if (!intact(4)) for (let j = 4; j >= 0; j--) if (th.bounds[j] < DEW) { f.frost = j; break; }
  return f;
}

// moisture score 0..4 for the sheathing zone
function moisture(th, f) {
  const cold = th.bounds[5] < DEW;
  let s = 0;
  if (!intact(2)) s += 2;
  if (!intact(0) || !intact(1)) s += 1;
  if (!intact(4) && cold) s += 2;
  if (!intact(6) && cold) s += 1;
  return min(4, s);
}
const moistNames = ['Dry', 'Slow to dry', 'Wet', 'Soaked', 'Soaked'];

function draw() {
  updateCanvasSize();
  if (mouseOverCanvas) phase = (phase + 0.012) % 1;

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
  text('Control Layer Wall Section Explorer', canvasWidth / 2, 8);

  layoutPanels();
  const th = thermal();
  const f = flows(th);
  hoverLayer = findLayer();
  cursor(hoverLayer >= 0 ? 'pointer' : 'default');

  drawSection(th, f);
  drawInfo();
  drawConsequence(th, f);
  drawReadout(th, f);
  drawTooltip(th);
  drawControlLabels(th);
}

// ---- Panel layout: wide puts the section left and the text panels beside and below; narrow stacks them ----
function layoutPanels() {
  wide = canvasWidth >= 640;
  if (wide) {
    const sw = floor(canvasWidth * 0.6) - 10;
    sec = { x: 10, y: 44, w: sw, h: 250 };
    infoR = { x: sec.x + sw + 10, y: 44, w: canvasWidth - (sec.x + sw + 10) - 10, h: 250 };
    consR = { x: 10, y: 302, w: floor(canvasWidth * 0.55) - 15, h: 208 };
    readR = { x: consR.x + consR.w + 10, y: 302, w: canvasWidth - (consR.x + consR.w + 10) - 10, h: 208 };
  } else {
    sec = { x: 6, y: 40, w: canvasWidth - 12, h: 212 };
    infoR = { x: 6, y: 256, w: canvasWidth - 12, h: 148 };
    consR = { x: 6, y: 408, w: canvasWidth - 12, h: 86 };
    readR = null;
  }
  // strip geometry: scale px per inch solved so that the strips fill the space between the margins
  const mL = 70, mR = 52;
  const x0 = sec.x + mL, avail = sec.w - mL - mR;
  let lo = 1, hi = 300;
  for (let k = 0; k < 40; k++) {
    const s = (lo + hi) / 2;
    const sum = layers.reduce((a, L) => a + max(L.minPx, L.t * s), 0);
    if (sum > avail) hi = s; else lo = s;
  }
  xl = []; xr = [];
  let x = x0;
  layers.forEach(L => { xl.push(x); x += max(L.minPx, L.t * lo); xr.push(x); });
  tagY = [sec.y + 22, sec.y + 38];
  laneY = [0, 1, 2, 3].map(k => sec.y + 62 + k * 14);
  stripTop = sec.y + 108;
  bandY = sec.y + sec.h - 44;
  stripBottom = bandY - 2;
}

function findLayer() {
  if (mouseY < sec.y + 10 || mouseY > bandY + 20 || mouseX < xl[0] - 4 || mouseX > xr[7] + 4) return -1;
  for (let i = 0; i < 8; i++) if (mouseX >= xl[i] && mouseX <= xr[i]) return i;
  let best = -1, bd = 99;
  for (let i = 0; i < 8; i++) { const d = abs(mouseX - (xl[i] + xr[i]) / 2); if (d < bd) { bd = d; best = i; } }
  return best;
}

function panel(r, title) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(14);
  if (title) text(title, r.x + 8, r.y + 4);
}

function arrowHead(x, y, dir, col, sz) {
  noStroke();
  fill(col);
  triangle(x, y, x - dir * sz, y - sz * 0.6, x - dir * sz, y + sz * 0.6);
}

// ---- Section: strips, tags, flow lanes, function band, temperature profile ----
function drawSection(th, f) {
  panel(sec, '');
  const x0 = xl[0], x1 = xr[7];
  // exterior and interior labels
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Outside', sec.x + 6, sec.y + 6);
  text(th.tOut + '°F', sec.x + 6, sec.y + 22);
  textAlign(RIGHT, TOP);
  text('Inside', sec.x + sec.w - 6, sec.y + 6);
  text(T_IN + '°F', sec.x + sec.w - 6, sec.y + 22);

  // strips
  layers.forEach((L, i) => {
    const w = xr[i] - xl[i], h = stripBottom - stripTop;
    const here = !broken(i) || failKey() !== 'missing';
    if (here) {
      stroke('dimgray');
      strokeWeight(i === selected || i === hoverLayer ? 2 : 1);
      fill(L.fill);
      rect(xl[i], stripTop, w, h);
      if (i === 5) { // studs at the top and bottom of the cavity
        fill('sienna');
        rect(xl[i], stripTop, w, 8);
        rect(xl[i], stripBottom - 8, w, 8);
      }
    } else {
      drawingContext.setLineDash([4, 3]);
      stroke('crimson');
      strokeWeight(2);
      noFill();
      rect(xl[i], stripTop, w, h);
      drawingContext.setLineDash([]);
    }
    if (here && broken(i)) { // hole or seam: a gap through the layer, drawn in the drawing background
      noStroke();
      fill('aliceblue');
      if (failKey() === 'hole') rect(xl[i], stripTop + h * 0.3, w, 18);
      else rect(xl[i], stripTop + h * 0.62, w, 5);
      stroke('crimson');
      strokeWeight(2);
      noFill();
      rect(xl[i] - 1, stripTop + h * (failKey() === 'hole' ? 0.3 : 0.62) - 1, w + 2, failKey() === 'hole' ? 20 : 7);
    }
    if (i === selected) { stroke('navy'); strokeWeight(3); noFill(); rect(xl[i] - 1, stripTop - 1, w + 2, h + 2); }
    // number tag
    const tx = (xl[i] + xr[i]) / 2, ty = tagY[i % 2];
    stroke('gray');
    strokeWeight(1);
    line(tx, ty + 8, tx, stripTop);
    stroke(i === hoverLayer ? 'navy' : 'dimgray');
    fill(broken(i) ? 'crimson' : 'navy');
    circle(tx, ty, 17);
    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    text(i + 1, tx, ty + 1);
  });

  // water that reaches the sheathing zone
  if (f.wet >= 0) {
    const c = color('dodgerblue');
    c.setAlpha(110);
    noStroke();
    fill(c);
    rect(xl[f.wet], stripTop, xr[f.wet] - xl[f.wet], stripBottom - stripTop);
  }

  drawLanes(th, f);
  drawBand();
  if (profileBox.checked()) drawProfile(th);
  if (f.frost >= 0) drawFrost(xl[f.frost], stripTop + (stripBottom - stripTop) * 0.62);
}

// flow lanes above the strips: each line runs from its source to the layer that stops it
function drawLanes(th, f) {
  const x0 = xl[0];
  const wHeat = constrain(1 + 1.5 * th.q, 1, 9);
  const defs = [
    { name: 'Rain', col: 'dodgerblue', from: x0 - 30, to: f.rainMain, wt: 3, ly: laneY[0], left: true, passes: false },
    { name: 'Air', col: 'seagreen', from: xr[7], to: f.air, wt: 3, ly: laneY[1], passes: !intact(4) },
    { name: 'Vapor', col: 'purple', from: xr[7], to: f.vapor, wt: 3, ly: laneY[2], passes: f.vapor <= x0 + 1 },
    { name: 'Heat', col: 'darkorange', from: xr[7], to: x0 - 6, wt: wHeat, ly: laneY[3], passes: true }
  ];
  defs.forEach(d => {
    noStroke();
    fill(d.col);
    textSize(14);
    textAlign(LEFT, CENTER);
    text(d.name, d.left ? sec.x + 6 : xr[7] + 6, d.ly);
    stroke(d.col);
    strokeWeight(d.wt);
    line(d.from, d.ly, d.to, d.ly);
    if (d.name === 'Rain' && f.rainLeak !== null) { // some water gets behind the siding
      drawingContext.setLineDash([3, 3]);
      strokeWeight(1.5);
      line(xr[0], d.ly + 5, f.rainLeak, d.ly + 5);
      drawingContext.setLineDash([]);
    }
    if (d.passes) arrowHead(d.to, d.ly, -1, d.col, 5 + min(d.wt, 8) * 0.6);
    else {
      stroke('black');
      strokeWeight(3);
      line(d.to, d.ly - 6, d.to, d.ly + 6);
    }
    // moving dots advance only while the pointer is over the canvas
    noStroke();
    fill(d.col);
    const span = d.to - d.from;
    for (let n = 0; n < 4; n++) circle(d.from + span * ((phase + n / 4) % 1), d.ly, d.name === 'Heat' ? max(5, d.wt * 0.8) : 5);
  });
}

// band under the strips: which control function each layer serves, as color and as a letter
function drawBand() {
  layers.forEach((L, i) => {
    const w = xr[i] - xl[i], n = L.fn.length, h = 18 / n;
    const gone = broken(i) && failKey() === 'missing';
    L.fn.forEach((k, j) => {
      noStroke();
      fill(gone ? 'lightgray' : fnInfo[k].col);
      rect(xl[i], bandY + j * h, w, h);
      if (w >= 14) {
        fill(gone ? 'dimgray' : 'white');
        textAlign(CENTER, CENTER);
        textSize(n > 1 ? 12 : 14);
        text(k, xl[i] + w / 2, bandY + j * h + h / 2 + 1);
      }
    });
    stroke('white');
    strokeWeight(1);
    noFill();
    rect(xl[i], bandY, w, 18);
  });
  // legend
  const items = ['W', 'A', 'V', 'T'];
  let lx = sec.x + 8;
  const ly = sec.y + sec.h - 17;
  textSize(14);
  textAlign(LEFT, CENTER);
  items.forEach(k => {
    noStroke();
    fill(fnInfo[k].col);
    rect(lx, ly - 7, 14, 14, 2);
    fill('white');
    textSize(12);
    textAlign(CENTER, CENTER);
    text(k, lx + 7, ly + 1);
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text(fnInfo[k].name, lx + 18, ly);
    lx += 22 + textWidth(fnInfo[k].name) + 10;
  });
}

// temperature through the wall (series path), with the dew point of the room air
function drawProfile(th) {
  const tLo = -25, tHi = 75;
  const yT = t => stripBottom - (t - tLo) / (tHi - tLo) * (stripBottom - stripTop);
  const x0 = xl[0], x1 = xr[7];
  // dew point line
  drawingContext.setLineDash([5, 4]);
  stroke('crimson');
  strokeWeight(2);
  line(x0 - 4, yT(DEW), x1 + 4, yT(DEW));
  drawingContext.setLineDash([]);
  noStroke();
  fill('crimson');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Dew pt', x1 + 6, yT(DEW) - 7);
  text(DEW + '°F', x1 + 6, yT(DEW) + 7);
  // profile line
  const pts = [[xl[0], th.bounds[0]]];
  layers.forEach((L, i) => pts.push([xr[i], th.bounds[i + 1]]));
  stroke('black');
  strokeWeight(3);
  noFill();
  beginShape();
  pts.forEach(p => vertex(p[0], yT(p[1])));
  endShape();
  noStroke();
  fill('black');
  textSize(14);
  textAlign(RIGHT, CENTER);
  text(nf(th.bounds[0], 0, 0) + '°F', x0 - 4, yT(th.bounds[0]));
  textAlign(LEFT, CENTER);
  text(nf(th.bounds[8], 0, 0) + '°F', x1 + 6, yT(th.bounds[8]) - (abs(yT(th.bounds[8]) - yT(DEW)) < 18 ? 14 : 0));
  // sheathing inner face
  const ts = th.bounds[5], cold = ts < DEW;
  const sx = xl[5], sy = yT(ts);
  stroke(cold ? 'crimson' : 'black');
  strokeWeight(2);
  fill(cold ? 'crimson' : 'white');
  circle(sx, sy, 10);
  if (cold) {
    // highlight the sheathing and call out the condensation risk
    stroke('crimson');
    strokeWeight(3);
    noFill();
    rect(xl[4] - 1, stripTop - 1, xr[4] - xl[4] + 2, stripBottom - stripTop + 2);
    const bw = min(150, xr[5] - xl[5] - 8), bx = xl[5] + 5, bh = wide ? 38 : 22;
    fill('white');
    stroke('crimson');
    strokeWeight(2);
    rect(bx, stripTop + 12, bw, bh, 5);
    noStroke();
    fill('crimson');
    textAlign(LEFT, TOP);
    textSize(14);
    text('Condensation risk', bx + 5, stripTop + 15);
    if (wide) {
      textSize(12);
      text('sheathing ' + nf(ts, 0, 1) + '°F', bx + 5, stripTop + 32);
    }
  } else {
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text(nf(ts, 0, 1) + '°F', sx, sy - 7);
  }
}

// frost marker where leaking indoor air meets a surface below its dew point
function drawFrost(x, y) {
  stroke('navy');
  strokeWeight(2);
  for (let a = 0; a < 3; a++) {
    const an = a * PI / 3;
    line(x - 9 * cos(an), y - 9 * sin(an), x + 9 * cos(an), y + 9 * sin(an));
  }
  noStroke();
  fill('navy');
  textSize(12);
  textAlign(CENTER, TOP);
  text('frost', x, y + 11);
}

// ---- Info panel: legend, or the selected layer ----
function drawInfo() {
  panel(infoR, wide ? 'Layer information' : '');
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const x = infoR.x + 8, w = infoR.w - 16, top = infoR.y + (wide ? 24 : 6);
  textSize(14);
  if (selected < 0) {
    text('Click a layer or its number tag to see its job, materials, and risks. Tick a box below to break a layer.', x, top, w, 60);
    if (wide) layers.forEach((L, i) => text((i + 1) + '  ' + L.full, x, top + 66 + i * 18, w, 18));
    return;
  }
  const L = layers[selected];
  const head = (selected + 1) + '. ' + L.full;
  textSize(16);
  fill('navy');
  text(head, x, top, w, 40);
  let y = top + (textWidth(head) > w ? 40 : 20);
  textSize(14);
  fill(broken(selected) ? 'crimson' : 'seagreen');
  text('Status: ' + (broken(selected) ? 'BROKEN, ' + (failKey() === 'seam' ? 'unsealed seam' : failKey()) : 'intact'), x, y);
  y += 17;
  fill('black');
  text(L.fnTxt, x, y, w, 36);
  y += (textWidth(L.fnTxt) > w ? 36 : 18);
  text('Job: ' + L.job + ' Materials: ' + L.mats + ' If missing: ' + L.risk, x, y, w, infoR.y + infoR.h - y - 2);
}

// ---- Consequence of the most recent break ----
function consequence(th, f) {
  const i = (lastBroken >= 0 && broken(lastBroken)) ? lastBroken : checks.findIndex(c => c.checked());
  if (i < 0) return null;
  const fk = failKey();
  let s;
  if (i === 3) {
    if (fk === 'missing') s = 'Heat flow rises to ' + nf(th.q, 0, 1) + ' BTU/h per ft², ' + aboveBase(th) + ', and the sheathing falls to ' + nf(th.bounds[5], 0, 1) + '°F, further below the dew point.';
    else if (fk === 'hole') s = 'A hole in the foam is a thermal bridge: heat and air take the easy path around it, so the foam delivers less than R-10.';
    else s = 'Unsealed foam joints let heat and air slip around the board, so it acts as less continuous insulation than its R-value suggests.';
  } else if (i === 5) {
    if (fk === 'missing') s = 'The cavity is empty, so heat flow rises to ' + nf(th.q, 0, 1) + ' BTU/h per ft², ' + aboveBase(th) + '. An empty cavity is only about R-1.';
    else s = 'Gaps and voids roughly halve the batt R-value (illustrative), so heat flow rises to ' + nf(th.q, 0, 1) + ' BTU/h per ft².';
  } else s = effects[i][fk];
  const n = checks.filter(c => c.checked()).length;
  return { head: (i + 1) + ' ' + layers[i].name + ' (' + (fk === 'seam' ? 'unsealed seam' : fk) + ')', text: s + (n > 1 ? ' (' + (n - 1) + ' more layer' + (n > 2 ? 's' : '') + ' also broken.)' : '') };
}

// 'N% above' for modest increases, 'N times' for large ones
function aboveBase(th) {
  const r = th.q / th.qBase;
  return r < 3 ? nf((r - 1) * 100, 0, 0) + '% above the complete wall' : nf(r, 0, 1) + ' times the complete wall';
}

function drawConsequence(th, f) {
  panel(consR, wide ? 'What happens' : '');
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  const c = consequence(th, f);
  const x = consR.x + 8, w = consR.w - 16, top = consR.y + (wide ? 24 : 6);
  if (!c) {
    text('All four control layers are continuous: water drains out, taped sheathing stops air, the retarder holds vapor back, and foam and batts slow heat. Break a layer to see what changes.', x, top, w, consR.h - (top - consR.y) - 4);
    return;
  }
  fill('crimson');
  text(c.head, x, top, w, 20);
  fill('black');
  text(c.text, x, top + 18, w, consR.h - (top - consR.y) - 14);
}

// ---- Readout: R-value, heat flow, sheathing temperature, moisture ----
function drawReadout(th, f) {
  const ms = moisture(th, f);
  const cold = th.bounds[5] < DEW;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  if (wide) {
    panel(readR, 'Readout (illustrative values)');
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    const x = readR.x + 8, w = readR.w - 16, y = readR.y + 26;
    text('Wall R-value: ' + nf(th.rTot, 0, 1) + ' (complete wall: ' + BASE_R + ')', x, y, w, 36);
    text('Heat flow: ' + nf(th.q, 0, 1) + ' BTU/h per ft² at ' + (T_IN - th.tOut) + '°F difference', x, y + 40, w, 36);
    text('Sheathing inside face: ' + nf(th.bounds[5], 0, 1) + '°F; dew point ' + DEW + '°F (' + (cold ? 'below' : 'above') + ')', x, y + 80, w, 36);
    drawMoistureGauge(x, y + 124, ms);
  } else {
    text('R ' + nf(th.rTot, 0, 1) + ' | q ' + nf(th.q, 0, 1) + ' BTU/h·ft² | sheathing ' + nf(th.bounds[5], 0, 1) + '°F (dew ' + DEW + '°F)', 10, 498);
    drawMoistureGauge(10, 516, ms);
  }
}

// four segments: Dry, Slow to dry, Wet, Soaked
function drawMoistureGauge(x, y, ms) {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  const label = 'Sheathing moisture: ' + moistNames[ms];
  text(label, x, y);
  const cols = ['seagreen', 'gold', 'darkorange', 'crimson'];
  const gx = wide ? x : x + textWidth(label) + 10, gy = wide ? y + 20 : y + 2, sw = wide ? 36 : 22;
  for (let k = 0; k < 4; k++) {
    stroke('gray');
    strokeWeight(1);
    fill(k <= min(ms, 3) ? cols[k] : 'white');
    rect(gx + k * (sw + 3), gy, sw, 12, 3);
  }
}

// ---- Hover tooltip ----
function drawTooltip(th) {
  if (hoverLayer < 0) return;
  const i = hoverLayer, L = layers[i];
  const w = min(canvasWidth - 20, 250), h = 76;
  const tx = constrain(mouseX + 12, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text((i + 1) + '. ' + L.full, tx + 8, ty + 6, w - 16, 36);
  text('R ' + nf(layerR(i), 0, 2) + ' | ' + L.fn.map(k => fnInfo[k].name).join(' + '), tx + 8, ty + 44, w - 16, 20);
  fill(broken(i) ? 'crimson' : 'seagreen');
  text(broken(i) ? 'Broken: ' + (failKey() === 'seam' ? 'unsealed seam' : failKey()) : 'Intact', tx + 8, ty + 59, w - 16, 18);
}

// ---- Control labels ----
function drawControlLabels(th) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Failure:', 10, drawHeight + 88);
  text('Outdoor: ' + tempSlider.value() + '°F', 10, drawHeight + 129);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  const i = findLayer();
  if (i >= 0) selected = i;
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
