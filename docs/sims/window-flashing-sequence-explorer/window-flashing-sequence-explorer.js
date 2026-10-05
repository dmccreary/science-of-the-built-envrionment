// Window Flashing Sequence Explorer MicroSim - build the five flashing steps around a Riverbend window, test the order, and pour water to see where it goes
// CANVAS_HEIGHT: 480
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10; // no sliders in this sim; kept for the template
let defaultTextSize = 16;

// ---- Data: the five steps of the chapter's worked example, then the siding as a context layer ----
const layers = [
  { name: 'Sill pan', full: 'Sill pan', col: 'darkorange',
    laps: 'Laps over the rough sill and the wall below it. The window and the jamb tape lap over it, so water at the sill drains outward.',
    how: 'Install a sill pan that slopes outward at the bottom of the opening, with an end dam at each side.',
    why: 'Everything else laps over the pan, so it goes in first.' },
  { name: 'Window', full: 'Window', col: 'steelblue',
    laps: 'Sits on the sill pan and is fastened to the framing. Its flange is lapped by the jamb tape.',
    how: 'Set the window on the pan and fasten it to the framing.',
    why: 'It needs the pan under it and must be fastened before taping.' },
  { name: 'Jamb tape', full: 'Jamb tape', col: 'mediumorchid',
    laps: 'Laps over the ends of the sill pan and over the window flange. The head flashing then covers its top.',
    how: 'Apply flashing tape at the jambs, lapping over the sill pan.',
    why: 'It laps over the pan and window, so both go first.' },
  { name: 'Head flash', full: 'Head flashing', col: 'olivedrab',
    laps: 'Tucks up behind the barrier, then extends out over the cladding and over the tops of the jamb tape.',
    how: 'Install a head flashing above the window, extending out over the cladding.',
    why: 'It covers the tops of the jamb tape, so the tape goes first.' },
  { name: 'WRB lap', full: 'Weather-resistive barrier (WRB)', col: 'gainsboro',
    laps: 'Laps over the top of the head flashing, so water running down the barrier is directed onto the flashing and outward.',
    how: 'Lap the barrier over the head flashing so water on it runs onto the flashing and out.',
    why: 'It laps over the flashing, so it goes last.' },
  { name: 'Siding', full: 'Siding (context layer)', col: 'wheat',
    laps: 'Context layer, not a flashing step. It goes over the barrier, with a drainage gap behind it for any water that gets past.',
    how: '', why: '' }
];

// ---- State ----
let mode = 'Build';        // 'Build' or 'Test the sequence'
let step = 5;              // layers shown in Build mode (default: all five)
let reversed = false;      // WRB tucked under the head flashing
let selected = -1;         // layer lifted away in the exploded view
let hoverLayer = -1;
let slots = [-1, -1, -1, -1, -1]; // Test mode: layer placed in each slot
let tray = [];             // Test mode: layers not yet placed, in tray order
let drag = null;           // {layer, from, sx, sy}
let water = { on: false, t0: 0, done: false };
const WATER_MS = 6000;

// ---- Controls ----
let prevButton, nextButton, pourButton, shuffleButton, modeRadio, reverseCheck;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  prevButton = createButton('Previous step');
  prevButton.mousePressed(() => { step = max(0, step - 1); resetWater(); });
  nextButton = createButton('Next step');
  nextButton.mousePressed(() => { step = min(5, step + 1); resetWater(); });
  shuffleButton = createButton('Shuffle layers');
  shuffleButton.mousePressed(newTest);
  pourButton = createButton('Pour water');
  pourButton.mousePressed(() => { water = { on: true, t0: millis(), done: false }; });

  modeRadio = createRadio();
  modeRadio.option('Build');
  modeRadio.option('Test the sequence');
  modeRadio.selected('Build');
  modeRadio.style('width', '230px');
  modeRadio.changed(() => { mode = modeRadio.value(); if (mode !== 'Build') newTest(); resetWater(); updateControlVisibility(); });

  reverseCheck = createCheckbox('Reverse a lap', false);
  reverseCheck.changed(() => {
    reversed = reverseCheck.checked();
    if (reversed && mode === 'Build') step = 5;
    resetWater();
  });

  newTest();
  positionControls();
  updateControlVisibility();
  describe('A window opening in the Riverbend wall shown in elevation on the left and in vertical section on the right. Five flashing layers are added in order: sill pan, window, jamb tape, head flashing, and a weather-resistive barrier lapped over the head flashing. Buttons step through the layers, a test mode lets the learner drag the five layers into order, a checkbox tucks the barrier under the head flashing, and a Pour water button animates water running down the wall. With the correct laps the water exits to the outside; with a reversed lap it runs into the opening.', LABEL);
}

function positionControls() {
  prevButton.position(10, drawHeight + 6);
  nextButton.position(118, drawHeight + 6);
  shuffleButton.position(10, drawHeight + 6);
  pourButton.position(212, drawHeight + 6);
  modeRadio.position(10, drawHeight + 42);
  reverseCheck.position(250, drawHeight + 42);
}

function updateControlVisibility() {
  if (mode === 'Build') { prevButton.show(); nextButton.show(); shuffleButton.hide(); }
  else { prevButton.hide(); nextButton.hide(); shuffleButton.show(); }
}

function resetWater() { water = { on: false, t0: 0, done: false }; }

function newTest() {
  slots = [-1, -1, -1, -1, -1];
  tray = [0, 1, 2, 3, 4];
  do {
    for (let i = tray.length - 1; i > 0; i--) {
      const j = floor(random(i + 1));
      [tray[i], tray[j]] = [tray[j], tray[i]];
    }
  } while (tray.every((v, i) => v === i));
  resetWater();
}

// number of leading slots holding the right layer (Test mode builds the wall from these)
function leadingCorrect() {
  let n = 0;
  while (n < 5 && slots[n] === n) n++;
  return n;
}
function shown() { return mode === 'Build' ? step : leadingCorrect(); }
function has(i) { return shown() > i; } // layer i (0-4) is installed

// ---- Geometry shared by drawing, hit testing, and the water paths ----
function geom() {
  const g = {};
  g.top = (mode === 'Build') ? 78 : 104;
  g.bot = 312;
  g.ex = 10; g.ew = max(130, floor(canvasWidth * 0.36)); g.ey = g.top; g.eh = g.bot - g.top;
  g.sx = g.ex + g.ew + 10; g.sw = canvasWidth - g.sx - 10; g.sy = g.top; g.sh = g.eh;
  // elevation
  g.wx = g.ex + 6; g.wy = g.ey + 22; g.ww = g.ew - 12; g.wh = g.eh - 28;
  g.ow = g.ww * 0.44; g.oh = g.wh * 0.46;
  g.ox = g.wx + (g.ww - g.ow) / 2; g.oy = g.wy + g.wh * 0.26;
  g.jt = max(6, g.ow * 0.09);
  // section
  g.wallT = constrain(g.sw * 0.14, 30, 52);
  g.x0 = g.sx + max(40, g.sw * 0.2); g.x1 = g.x0 + g.wallT;
  g.yTop = g.sy + 24; g.yBot = g.sy + g.sh - 6;
  g.yH = g.sy + g.sh * 0.40; g.yS = g.sy + g.sh * 0.76;
  g.fx0 = g.x0 + g.wallT * 0.3; g.fx1 = g.x1 - 1;
  return g;
}

// ---- Water paths: each is a polyline plus whether it ends in a leak ----
function waterPaths(g) {
  const { x0, x1, yTop, yBot, yH, yS, fx0, fx1, ox, oy, ow, oh, jt, wx, wy, ww } = g;
  const out = [];
  const rev = reversed && has(3) && has(4);
  // A: rain running down the wall above the window (section)
  let a;
  if (!has(3)) a = { leak: true, pts: [[x1 + 8, yTop + 4], [x1 + 8, yH - 2], [x1 + 2, yH + 2], [x0 + 5, yH + 10], [x0 + 5, yS - 22]] };
  else if (rev) a = { leak: true, pts: [[x1 + 4.5, yTop + 4], [x1 + 4.5, yH - 6], [x1 + 1, yH + 1], [x0 + 5, yH + 10], [x0 + 5, yS - 22]] };
  else a = { leak: false, pts: [[x1 + 8, yTop + 4], [x1 + 8, yH - 12], [x1 + 9, yH - 10], [x1 + 26, yH - 10], [x1 + 27, yH - 5], [x1 + 27, yBot - 4]] };
  out.push({ view: 'S', key: 'head', leak: a.leak, pts: a.pts });
  // B: water that slips past the window at the sill (section)
  if (has(1)) {
    const b = has(0)
      ? { leak: false, pts: [[fx1 + 2, yS - 24], [fx1 - 2, yS - 12], [fx0 + 6, yS - 5], [x1 + 10, yS + 3], [x1 + 13, yS + 7], [x1 + 13, yBot - 4]] }
      : { leak: true, pts: [[fx1 + 2, yS - 24], [fx1 - 2, yS - 12], [fx0 + 6, yS - 5], [fx0 + 6, yS + 22]] };
    out.push({ view: 'S', key: 'sill', leak: b.leak, pts: b.pts });
  }
  // E1: the same head water seen from outside (elevation)
  const cx = ox + ow / 2;
  out.push({ view: 'E', key: 'head', leak: a.leak,
    pts: a.leak ? [[cx, wy + 4], [cx, oy - 12], [cx, oy + 14]] : [[cx, wy + 4], [cx, oy - 12], [cx, oy - 2], [cx, oy + oh + 14], [cx, g.wy + g.wh - 2]] });
  // E2: water running down the left jamb (elevation)
  if (has(1)) {
    const jx = ox - jt / 2;
    out.push({ view: 'E', key: 'jamb', leak: !has(2),
      pts: has(2) ? [[jx, oy - 2], [jx, oy + oh + 2], [jx - jt - 4, oy + oh + 12], [jx - jt - 4, g.wy + g.wh - 2]] : [[ox - 1, oy - 2], [ox + 3, oy + oh * 0.5], [ox + 3, oy + oh * 0.5 + 18]] });
  }
  return out;
}

function pathLen(pts) {
  let L = 0;
  for (let i = 1; i < pts.length; i++) L += dist(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
  return L;
}
function pathPoint(pts, s) {
  for (let i = 1; i < pts.length; i++) {
    const d = dist(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1]);
    if (s <= d) { const f = d > 0 ? s / d : 0; return [lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]; }
    s -= d;
  }
  return pts[pts.length - 1];
}

function draw() {
  updateCanvasSize();
  const g = geom();

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
  text('Window Flashing Sequence', canvasWidth / 2, 6);

  if (water.on && millis() - water.t0 > WATER_MS) { water.on = false; water.done = true; }
  hoverLayer = (mouseY >= 0 && mouseY < drawHeight && !drag) ? hitLayer(g) : -1;

  drawTopRow(g);
  drawElevation(g);
  drawSection(g);
  drawWater(g);
  drawInfo(g);
  if (drag) drawDragCard();
  else drawTooltip();
}

// ---- Top row: step chips (Build) or slots plus tray (Test) ----
function chipRect(i) {
  const gap = 6, w = (canvasWidth - 20 - gap * 4) / 5;
  return { x: 10 + i * (w + gap), w: w };
}
function slotRect(i) { const r = chipRect(i); return { x: r.x, y: 36, w: r.w, h: 30 }; }
function trayRect(i) { const r = chipRect(i); return { x: r.x, y: 70, w: r.w, h: 28 }; }

function chipLabel(x, y, w, h, i, txt) {
  noStroke();
  fill(i === 4 ? 'black' : 'white');
  textAlign(CENTER, CENTER);
  let ts = 14;
  textSize(ts);
  while (textWidth(txt) > w - 6 && ts > 11) { ts--; textSize(ts); }
  text(txt, x + w / 2, y + h / 2);
}

function drawTopRow(g) {
  if (mode === 'Build') {
    for (let i = 0; i < 5; i++) {
      const r = chipRect(i), on = has(i);
      stroke(i === selected || i === hoverLayer ? 'navy' : 'gray');
      strokeWeight(i === selected || i === hoverLayer ? 3 : 1);
      fill(on ? layers[i].col : 'lightgray');
      rect(r.x, 38, r.w, 34, 6);
      if (on) chipLabel(r.x, 38, r.w, 34, i, (i + 1) + ' ' + layers[i].name);
      else { noStroke(); fill('dimgray'); textAlign(CENTER, CENTER); textSize(14); text((i + 1) + ' ' + layers[i].name, r.x + r.w / 2, 55); }
    }
  } else {
    for (let i = 0; i < 5; i++) {
      const r = slotRect(i);
      const ok = slots[i] === i && leadingCorrect() > i;
      stroke(slots[i] < 0 ? 'gray' : (slots[i] === i ? 'seagreen' : 'darkorange'));
      strokeWeight(2);
      fill(slots[i] < 0 ? 'white' : layers[slots[i]].col);
      rect(r.x, r.y, r.w, r.h, 6);
      if (slots[i] >= 0 && !(drag && drag.from === i)) chipLabel(r.x, r.y, r.w, r.h, slots[i], layers[slots[i]].name);
      else if (slots[i] < 0) { noStroke(); fill('gray'); textAlign(CENTER, CENTER); textSize(14); text('Slot ' + (i + 1), r.x + r.w / 2, r.y + r.h / 2); }
      if (ok) { noStroke(); fill('seagreen'); textAlign(RIGHT, TOP); textSize(12); text('OK', r.x + r.w - 3, r.y + 1); }
    }
    for (let k = 0; k < 5; k++) {
      const r = trayRect(k);
      stroke('silver'); strokeWeight(1); fill('whitesmoke');
      rect(r.x, r.y, r.w, r.h, 6);
      if (k < tray.length && !(drag && drag.from === -1 && drag.layer === tray[k])) {
        stroke('gray'); fill(layers[tray[k]].col);
        rect(r.x, r.y, r.w, r.h, 6);
        chipLabel(r.x, r.y, r.w, r.h, tray[k], layers[tray[k]].name);
      }
    }
  }
}

// ---- Elevation view (outside face of the wall) ----
function drawElevation(g) {
  const { ex, ey, ew, eh, wx, wy, ww, wh, ox, oy, ow, oh, jt } = g;
  noStroke(); fill('white'); stroke('silver'); strokeWeight(1);
  rect(ex, ey, ew, eh, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text('Elevation (outside face)', ex + 6, ey + 3);

  // bare sheathing with seams, and the open rough opening
  fill('tan'); stroke('peru'); strokeWeight(1);
  rect(wx, wy, ww, wh);
  line(wx, wy + wh * 0.5, wx + ww, wy + wh * 0.5);
  line(wx + ww * 0.5, wy, wx + ww * 0.5, wy + wh);
  fill('dimgray'); stroke('black');
  rect(ox, oy, ow, oh);

  const order = [0, 1, 2, 3, 4];
  const wrbFirst = reversed && has(4);
  if (wrbFirst) drawWRBElev(g);
  for (const i of order) {
    if (i === 4) { if (!wrbFirst && has(4)) drawWRBElev(g); continue; }
    if (has(i)) layerElev(i, g);
  }
  if (has(4)) drawSidingElev(g);
  // red highlight on the reversed lap
  if (reversed && has(3) && has(4)) {
    noFill(); stroke('crimson'); strokeWeight(3);
    rect(ox - jt - 10, oy - 16, ow + 2 * jt + 20, 13, 3);
    noStroke(); fill('crimson'); textAlign(CENTER, BOTTOM); textSize(14);
    text('WRB under flashing', ex + ew / 2, oy - 17);
  }
}

function elevOffset(i) { return selected === i ? [-8, -8] : [0, 0]; }

function layerElev(i, g) {
  const { ox, oy, ow, oh, jt } = g;
  const [dx, dy] = elevOffset(i);
  push();
  translate(dx, dy);
  if (selected === i) { noStroke(); fill(0, 0, 0, 50); rectsFor(i, g, 8, 8); }
  stroke('black'); strokeWeight(1); fill(layers[i].col);
  if (i === 0) {
    rect(ox - 4, oy + oh - 8, ow + 8, 10);
    rect(ox - 4, oy + oh - 17, 5, 10); rect(ox + ow - 1, oy + oh - 17, 5, 10); // end dams
  } else if (i === 1) {
    rect(ox + 1, oy + 2, ow - 2, oh - 11);
    fill('lightcyan'); rect(ox + 7, oy + 8, ow - 14, oh - 23);
    stroke('white'); strokeWeight(2); line(ox + 12, oy + oh - 20, ox + ow * 0.4, oy + 12);
  } else if (i === 2) {
    rect(ox - jt, oy - 8, jt + 3, oh + 9);
    rect(ox + ow - 3, oy - 8, jt + 3, oh + 9);
    stroke('white'); strokeWeight(1);
    for (let y = oy; y < oy + oh; y += 8) { line(ox - jt, y, ox - 1, y + 4); line(ox + ow, y, ox + ow + jt - 1, y + 4); } // hatch
  } else if (i === 3) {
    rect(ox - jt - 8, oy - 12, ow + 2 * jt + 16, 9);
    fill('darkolivegreen'); rect(ox - jt - 8, oy - 5, ow + 2 * jt + 16, 3); // drip lip
  }
  pop();
}

// shadow helper: redraws a layer's footprint offset by (sx, sy)
function rectsFor(i, g, sx, sy) {
  const { ox, oy, ow, oh, jt } = g;
  if (i === 0) rect(ox - 4 + sx, oy + oh - 8 + sy, ow + 8, 10);
  else if (i === 1) rect(ox + 1 + sx, oy + 2 + sy, ow - 2, oh - 11);
  else if (i === 2) { rect(ox - jt + sx, oy - 8 + sy, jt + 3, oh + 9); rect(ox + ow - 3 + sx, oy - 8 + sy, jt + 3, oh + 9); }
  else if (i === 3) rect(ox - jt - 8 + sx, oy - 12 + sy, ow + 2 * jt + 16, 9);
  else if (i === 4) rect(g.wx + sx, g.wy + sy, g.ww, oy - 8 - g.wy);
}

function drawWRBElev(g) {
  const { wx, wy, ww, wh, ox, oy, ow, oh, jt } = g;
  const [dx, dy] = elevOffset(4);
  push();
  translate(dx, dy);
  if (selected === 4) { noStroke(); fill(0, 0, 0, 50); rectsFor(4, g, 8, 8); }
  stroke('dimgray'); strokeWeight(1); fill('gainsboro');
  const L = ox - jt - 8, R = ox + ow + jt + 8;
  rect(wx, wy, ww, oy - 8 - wy);                                 // above the opening, lapping 4 px over the flashing top
  rect(wx, oy - 8, L - wx, 5);                                   // beside the flashing ends
  rect(R, oy - 8, wx + ww - R, 5);
  rect(wx, oy - 3, ox - jt - 1 - wx, wy + wh - oy + 3);          // left side
  rect(ox + ow + jt + 1, oy - 3, wx + ww - ox - ow - jt - 1, wy + wh - oy + 3); // right side
  rect(ox - jt - 1, oy + oh + 12, ow + 2 * jt + 2, wy + wh - oy - oh - 12);     // below the sill
  stroke('darkgray');                                            // small diagonal ticks so the layer reads without color
  for (let y = wy + 5; y < oy - 12; y += 10) for (let x = wx + 5 + ((y / 10) % 2) * 7; x < wx + ww - 4; x += 14) line(x, y, x + 4, y + 4);
  pop();
}

function drawSidingElev(g) {
  const { wx, wy, ww, wh, ox, oy, ow, oh, jt } = g;
  stroke('sienna'); strokeWeight(2);
  for (let y = wy + 8; y < wy + wh - 2; y += 16) {
    const inBand = y > oy - 22 && y < oy + oh + 16;
    if (!inBand) line(wx, y, wx + ww, y);
    else { line(wx, y, ox - jt - 14, y); line(ox + ow + jt + 14, y, wx + ww, y); }
  }
}

// ---- Section view (vertical cut through the window centre; inside on the left) ----
function secOffset(i) { return selected === i ? 16 : 0; }

function drawSection(g) {
  const { sx, sy, sw, sh, x0, x1, yTop, yBot, yH, yS, fx0, fx1, wallT } = g;
  fill('white'); stroke('silver'); strokeWeight(1);
  rect(sx, sy, sw, sh, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text('Section (cut through the window)', sx + 6, sy + 3);
  textAlign(RIGHT, BOTTOM); textSize(12);
  text('INSIDE', x0 - 6, yBot - 2);
  textAlign(LEFT, BOTTOM);
  text('OUTSIDE', x1 + 34, yBot - 2);
  drawSecLabels(g);

  // framing (brown) with sheathing strip (tan) above and below the rough opening
  stroke('saddlebrown'); strokeWeight(1);
  fill('burlywood'); rect(x0, yTop, wallT - 7, yH - yTop); rect(x0, yS, wallT - 7, yBot - yS);
  fill('tan'); rect(x1 - 7, yTop, 7, yH - yTop); rect(x1 - 7, yS, 7, yBot - yS);

  const wrbFirst = reversed && has(3) && has(4);
  if (wrbFirst && has(4)) secWRB(g);
  for (let i = 0; i < 4; i++) if (has(i)) layerSec(i, g);
  if (!wrbFirst && has(4)) secWRB(g);
  if (has(4)) {
    stroke('sienna'); strokeWeight(3);
    line(x1 + 14, yTop, x1 + 14, yH - 12); line(x1 + 14, yS + 10, x1 + 14, yBot);
  }
  if (reversed && has(3) && has(4)) {
    noFill(); stroke('crimson'); strokeWeight(3);
    ellipse(x1 + 6, yH - 22, 26, 34);
    noStroke(); fill('crimson'); textAlign(RIGHT, CENTER); textSize(14);
    text('Reversed lap', x0 - 6, yH - 24);
  }
}

// direct labels with short leader lines for the installed layers (names repeat the colors in words)
function drawSecLabels(g) {
  const { x1, yTop, yH, yS, fx1 } = g;
  const items = [
    [4, 'WRB', x1 + 5.5, yTop + 24, yTop + 10],
    [5, 'Siding', x1 + 14, yTop + 50, yTop + 36],
    [3, 'Head flashing', x1 + 26, yH - 8, yH - 4],
    [1, 'Window', fx1, (yH + yS) / 2, (yH + yS) / 2 - 12],
    [2, 'Jamb tape (edge)', fx1 + 3, (yH + yS) / 2 + 14, (yH + yS) / 2 + 14],
    [0, 'Sill pan', x1 + 10, yS + 4, yS + 20]
  ];
  textSize(14);
  for (const [i, name, tx, ty, ly] of items) {
    if (i === 5 ? !has(4) : !has(i)) continue;
    stroke('gray'); strokeWeight(1);
    line(x1 + 36, ly, tx + 3, ty);
    noStroke(); fill(layers[i].col === 'gainsboro' ? 'dimgray' : layers[i].col);
    rect(x1 + 36, ly - 5, 10, 10);
    fill('black'); textAlign(LEFT, CENTER);
    text(name, x1 + 50, ly);
  }
}

function secWRB(g) {
  const { x1, yTop, yH, yS, yBot } = g;
  const rev = reversed && has(3);
  const off = secOffset(4);
  push();
  translate(off, 0);
  stroke('dimgray'); strokeWeight(3);
  const xr = rev ? x1 + 2.5 : x1 + 5.5;
  line(xr, yTop, xr, yH - 9);
  line(x1 + 2, yS + 5, x1 + 2, yBot);
  stroke('darkgray'); strokeWeight(1);
  for (let y = yTop + 4; y < yH - 12; y += 8) line(xr - 2, y, xr + 2, y + 4);
  pop();
}

function layerSec(i, g) {
  const { x0, x1, yH, yS, fx0, fx1, wallT } = g;
  push();
  translate(secOffset(i), 0);
  noFill(); strokeCap(SQUARE); strokeJoin(MITER);
  if (i === 0) {
    stroke('darkorange'); strokeWeight(4);
    beginShape(); vertex(x0 + 2, yS - 10); vertex(x0 + 2, yS - 3); vertex(x1 + 12, yS + 4); endShape();
  } else if (i === 1) {
    stroke('steelblue'); strokeWeight(1); fill('steelblue');
    rect(fx0, yH + 3, fx1 - fx0, 14); rect(fx0, yS - 17, fx1 - fx0, 14);   // head and sill members
    stroke('lightskyblue'); strokeWeight(4);
    line((fx0 + fx1) / 2, yH + 17, (fx0 + fx1) / 2, yS - 17);              // glass
  } else if (i === 2) {
    // jamb tape lies in the plane of the cut; shown as a thin strip on the window flange
    stroke('mediumorchid'); strokeWeight(5);
    line(fx1 + 3, yH + 20, fx1 + 3, yS - 20);
    stroke('white'); strokeWeight(1);
    for (let y = yH + 22; y < yS - 22; y += 7) line(fx1 + 1, y, fx1 + 5, y + 3);
  } else if (i === 3) {
    const rev = reversed && has(4);
    const lx = rev ? x1 + 6 : x1 + 2;
    stroke('olivedrab'); strokeWeight(4);
    beginShape(); vertex(lx, yH - 28); vertex(lx, yH - 8); vertex(x1 + 26, yH - 8); vertex(x1 + 26, yH - 3); endShape();
  }
  pop();
}

// ---- Hit testing: topmost visible layer under the mouse ----
function layerRects(i, g) {
  const { ox, oy, ow, oh, jt, wx, wy, ww, wh, x0, x1, yTop, yH, yS, yBot, fx0, fx1 } = g;
  const E = [], S = [];
  if (i === 0) { E.push([ox - 4, oy + oh - 17, ow + 8, 19]); S.push([x0, yS - 12, x1 + 14 - x0, 14]); }
  else if (i === 1) { E.push([ox + 1, oy + 2, ow - 2, oh - 11]); S.push([fx0, yH + 3, fx1 - fx0, yS - yH - 6]); }
  else if (i === 2) { E.push([ox - jt, oy - 8, jt + 3, oh + 9], [ox + ow - 3, oy - 8, jt + 3, oh + 9]); S.push([fx1, yH + 18, 7, yS - yH - 38]); }
  else if (i === 3) { E.push([ox - jt - 8, oy - 12, ow + 2 * jt + 16, 12]); S.push([x1, yH - 30, 30, 28]); }
  else if (i === 4) {
    E.push([wx, wy, ww, oy - 8 - wy], [wx, oy - 8, ox - jt - 1 - wx, wy + wh - oy + 8], [ox + ow + jt + 1, oy - 8, wx + ww - ox - ow - jt - 1, wy + wh - oy + 8], [ox - jt, oy + oh + 12, ow + 2 * jt, wy + wh - oy - oh - 12]);
    S.push([x1 + 1, yTop, 10, yH - 9 - yTop], [x1, yS + 5, 8, yBot - yS - 5]);
  } else { E.push([wx, wy, ww, wh]); S.push([x1 + 11, yTop, 8, yH - 12 - yTop], [x1 + 11, yS + 10, 8, yBot - yS - 10]); }
  return { E, S };
}
function inRects(rs, off) {
  return rs.some(r => mouseX >= r[0] + off && mouseX <= r[0] + r[2] + off && mouseY >= r[1] && mouseY <= r[1] + r[3]);
}
function hitLayer(g) {
  if (mode === 'Build') {
    for (let i = 0; i < 5; i++) {
      const c = chipRect(i);
      if (mouseX >= c.x && mouseX <= c.x + c.w && mouseY >= 38 && mouseY <= 72) return i;
    }
  }
  for (const i of [3, 2, 0, 1, 4, 5]) {
    if (i < 5 ? !has(i) : !has(4)) continue;
    const rs = layerRects(i, g);
    if (inRects(rs.E, 0) || inRects(rs.S, 0)) return i;
  }
  return -1;
}

// ---- Water animation and outcome markers ----
function drawWater(g) {
  if (!water.on && !water.done) return;
  const el = water.on ? millis() - water.t0 : WATER_MS;
  const paths = waterPaths(g);
  for (const p of paths) {
    const L = pathLen(p.pts);
    if (water.on) {
      noStroke(); fill('dodgerblue');
      for (let k = 0; k < 9; k++) {
        const s = (el / 1000 - k * 0.45) * 100;
        if (s < 0 || s > L) continue;
        const [x, y] = pathPoint(p.pts, s);
        circle(x, y, 7);
      }
    }
    const end = p.pts[p.pts.length - 1];
    if (el / 1000 * 100 > L + 10) {
      if (p.leak) {
        noFill(); stroke('crimson'); strokeWeight(3); circle(end[0], end[1], 18);
        line(end[0] - 5, end[1] - 5, end[0] + 5, end[1] + 5); line(end[0] - 5, end[1] + 5, end[0] + 5, end[1] - 5);
      } else {
        noStroke(); fill('seagreen'); circle(end[0], end[1], 8);
      }
    }
  }
}

// outcome of the whole pour, in plain words
function outcome() {
  const rev = reversed && has(3) && has(4);
  const L = [];
  if (rev) L.push({ bad: true, t: 'Reversed lap: water slides behind the flashing into the opening.', d: 'Damage: wet sheathing, rot, mold.' });
  else if (!has(3)) L.push({ bad: true, t: 'No head flashing: water drops into the opening.', d: 'Damage: wet framing and rot.' });
  else if (!has(4)) L.push({ bad: false, t: 'The head flashing sheds the water, but with no barrier the sheathing gets wet.', d: '' });
  if (has(1) && !has(0)) L.push({ bad: true, t: 'No sill pan: water soaks the rough sill.', d: 'Damage: rot at the window bottom.' });
  if (has(1) && !has(2)) L.push({ bad: true, t: 'No jamb tape: water enters at the jamb joints.', d: 'Damage: wet framing at the sides.' });
  if (L.length === 0) L.push({ bad: false, t: 'All water exits outside: barrier over flashing, tape over pan, pan drains out.', d: '' });
  return L;
}

// ---- Info panel under the views ----
function drawInfo(g) {
  const x = 10, w = canvasWidth - 20, y = g.bot + 4, h = drawHeight - g.bot - 8;
  stroke('silver'); strokeWeight(1);
  const o = outcome();
  const showResult = water.done || water.on;
  const bad = showResult && o.some(r => r.bad);
  fill(bad ? color(255, 235, 235) : 'white');
  if (showResult) { stroke(bad ? 'crimson' : 'seagreen'); strokeWeight(2); }
  rect(x, y, w, h, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  const tx = x + 8, tw = w - 16;
  if (showResult) {
    textSize(16);
    fill(bad ? 'crimson' : 'seagreen');
    const nBad = o.filter(r => r.bad).length;
    text(bad ? 'LEAK: water enters the wall' + (nBad > 1 ? ' in ' + nBad + ' places' : '') : (o[0].t.startsWith('The head flashing sheds') ? 'Water exits, but the sheathing gets wet' : 'DRY: water exits to the outside'), tx, y + 4, tw, 24);
    fill('black'); textSize(14);
    const first = o.find(r => r.bad) || o[0];
    text(first.t + ' ' + first.d, tx, y + 26, tw, h - 28);
  } else if (mode === 'Build') {
    textSize(16);
    const n = step;
    if (n === 0) { text('Bare rough opening. Press Next step to start with the sill pan.', tx, y + 4, tw, 22); textSize(14); text('Press Pour water to see where rain goes with no flashing at all.', tx, y + 28, tw, h - 30); }
    else {
      fill(layers[n - 1].col === 'gainsboro' ? 'black' : layers[n - 1].col); text('Step ' + n + ' of 5: ' + layers[n - 1].full, tx, y + 4, tw, 22);
      fill('black'); textSize(14);
      if (reversed && n === 5) { fill('crimson'); text('Reversed lap is ON: the barrier is under the head flashing. Press Pour water to trace the leak.', tx, y + 26, tw, h - 28); }
      else text(layers[n - 1].how + ' ' + layers[n - 1].why, tx, y + 26, tw, h - 28);
    }
  } else {
    textSize(16);
    const n = leadingCorrect();
    const placed = slots.filter(s => s >= 0).length;
    if (placed < 5) { text('Drag the five layers into slots 1 to 5, first step on the left. Correct layers build the wall above.', tx, y + 4, tw, 44); fill('dimgray'); textSize(14); text(placed + ' of 5 placed. Tap a placed card to take it back.', tx, y + 52, tw, 22); }
    else if (n === 5) { fill('seagreen'); text('Correct order. All five steps are installed.', tx, y + 4, tw, 22); fill('black'); textSize(14); text('Now tick Reverse a lap or press Pour water to test the detail.', tx, y + 28, tw, h - 30); }
    else { fill('darkorange'); text('Not yet: slot ' + (n + 1) + ' should hold ' + layers[n].full + '.', tx, y + 4, tw, 22); fill('black'); textSize(14); text(layers[n].why, tx, y + 28, tw, h - 30); }
  }
}

// ---- Tooltip for the hovered layer ----
function drawTooltip() {
  if (hoverLayer < 0) return;
  const L = layers[hoverLayer];
  const w = min(canvasWidth - 20, 300), h = 104;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy'); strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textSize(16); text((hoverLayer < 5 ? 'Step ' + (hoverLayer + 1) + ': ' : '') + L.full, tx + 8, ty + 5, w - 16, 20);
  textSize(14); text(L.laps, tx + 8, ty + 26, w - 16, h - 44);
  fill('navy'); textSize(12); text('Click to lift this layer away', tx + 8, ty + h - 18);
}

function drawDragCard() {
  const r = chipRect(0);
  stroke('navy'); strokeWeight(2); fill(layers[drag.layer].col);
  rect(mouseX - r.w / 2, mouseY - 14, r.w, 28, 6);
  chipLabel(mouseX - r.w / 2, mouseY - 14, r.w, 28, drag.layer, layers[drag.layer].name);
}

// ---- Mouse handling ----
function mousePressed() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  if (mode === 'Test the sequence') {
    for (let k = 0; k < tray.length; k++) {
      const r = trayRect(k);
      if (inBox(r)) { drag = { layer: tray[k], from: -1, sx: mouseX, sy: mouseY }; return; }
    }
    for (let i = 0; i < 5; i++) {
      if (slots[i] >= 0 && inBox(slotRect(i))) { drag = { layer: slots[i], from: i, sx: mouseX, sy: mouseY }; return; }
    }
  }
  const h = hitLayer(geom());
  selected = (h >= 0 && h !== selected) ? h : -1;
}

function mouseReleased() {
  if (!drag) return;
  const moved = dist(mouseX, mouseY, drag.sx, drag.sy) > 6;
  let target = -1;
  if (moved) { for (let i = 0; i < 5; i++) if (inBox(slotRect(i))) target = i; }
  else if (drag.from < 0) target = slots.indexOf(-1); // a tap sends a tray card to the first empty slot
  if (drag.from >= 0) slots[drag.from] = -1; else tray = tray.filter(v => v !== drag.layer);
  if (target >= 0) {
    if (slots[target] >= 0) tray.push(slots[target]);
    slots[target] = drag.layer;
  } else tray.push(drag.layer);
  drag = null;
  resetWater();
}

function inBox(r) { return mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h; }

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
