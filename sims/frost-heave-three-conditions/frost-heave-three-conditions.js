// Frost Heave Three-Condition Explorer MicroSim - frost heave needs frost-susceptible soil, water, and freezing together; turn one off and it stops
// CANVAS_HEIGHT: 630
// Bloom Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Data (illustrative): the design frost depth is 42 in. (Chapter 9); lens growth is a simple model ----
const FROST_DEPTH = 42;                       // in., Twin Cities design frost depth
const WINTER_DAYS = 90;
const LENS_Z = [5, 11, 16, 25, 32, 40];       // depth (in.) at which each ice lens forms
const LENS_A = 0.04;                          // lens thickness = LENS_A * sqrt(days since the front reached it), in.
const EXAG = 5;                               // drawn movement is exaggerated this many times
const GAUGE_MAX = 2.5;                        // in.

// ---- State ----
let running = false;
let lastMs = 0;
let dayF = 0;          // winter day as a float while the animation runs
let hoverLens = -1;
let G = {};

// ---- Controls ----
let soilSel, waterSel, tempSel, footSel, daysSlider, runBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  soilSel = createSelect();
  soilSel.option('Silt');
  soilSel.option('Gravel');
  soilSel.selected('Silt');
  waterSel = createSelect();
  waterSel.option('Wet');
  waterSel.option('Dry');
  waterSel.selected('Wet');
  tempSel = createSelect();
  tempSel.option('Below freezing');
  tempSel.option('Above freezing');
  tempSel.selected('Below freezing');
  footSel = createSelect();
  footSel.option('18 in');
  footSel.option('42 in');
  footSel.selected('18 in');
  daysSlider = createSlider(0, WINTER_DAYS, 0, 1);
  daysSlider.input(() => { running = false; runBtn.html('Run winter'); });
  runBtn = createButton('Run winter');
  runBtn.mousePressed(toggleRun);

  positionControls();
  describe('A cross-section of ground with a wall footing and a slab edge. A dashed frost line sits at 42 inches. As freezing days pass, the freezing front moves down and, if the soil is silt, wet, and below freezing, blue ice lenses grow and lift the ground, the slab, and a shallow footing. A gauge reports the heave in inches. Selects choose the soil, water, temperature, and footing depth, and a Run winter button animates the winter.', LABEL);
}

function sliderWidth() { return max(120, canvasWidth - sliderLeftMargin - 20); }

function positionControls() {
  const y0 = drawHeight;
  soilSel.position(60, y0 + 8);
  waterSel.position(190, y0 + 8);
  tempSel.position(125, y0 + 43);
  footSel.position(135, y0 + 78);
  runBtn.position(235, y0 + 78);
  daysSlider.position(sliderLeftMargin, y0 + 113);
  daysSlider.size(sliderWidth());
}

function toggleRun() {
  if (running) { running = false; runBtn.html('Run winter'); return; }
  dayF = daysSlider.value() >= WINTER_DAYS ? 0 : daysSlider.value();
  running = true;
  lastMs = millis();
  runBtn.html('Pause');
}

// ---- Model ----
const conds = () => ({ silt: soilSel.value() === 'Silt', wet: waterSel.value() === 'Wet', cold: tempSel.value() === 'Below freezing' });
const allOn = c => c.silt && c.wet && c.cold;
const footDepth = () => footSel.value() === '18 in' ? 18 : 42;
const frontIn = (d, c) => c.cold ? FROST_DEPTH * Math.sqrt(d / WINTER_DAYS) : 0;
const lensTime = z => WINTER_DAYS * Math.pow(z / FROST_DEPTH, 2);
function lensThick(i, d, c) { return allOn(c) ? LENS_A * Math.sqrt(max(0, d - lensTime(LENS_Z[i]))) : 0; }
// heave of the ground and slab (all lenses lift them) and of the footing (only lenses below its base lift it)
function heaves(d, c) {
  let slab = 0, foot = 0;
  LENS_Z.forEach((z, i) => { const t = lensThick(i, d, c); slab += t; if (z > footDepth() + 0.5) foot += t; });
  return { slab, foot };
}

// ---- Draw ----
function draw() {
  updateCanvasSize();
  if (running) {
    const now = millis();
    dayF += (now - lastMs) / 1000 * 12;
    lastMs = now;
    if (dayF >= WINTER_DAYS) { dayF = WINTER_DAYS; running = false; runBtn.html('Run winter'); }
    daysSlider.value(round(dayF));
  }
  computeLayout();

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
  text('Frost Heave Three-Condition Explorer', canvasWidth / 2, 8);

  const d = running ? dayF : daysSlider.value(), c = conds(), h = heaves(d, c);
  drawGround(d, c, h);
  drawGauge(h);
  drawStatus(d, c, h);
  drawControlLabels(d);
  drawTooltip();
}

function computeLayout() {
  const narrow = canvasWidth < 620;
  const P = narrow ? { x: 8, y: 40, w: canvasWidth - 16, h: 250 } : { x: 12, y: 40, w: floor(canvasWidth * 0.58) - 12, h: 434 };
  const gw = 120;
  const s = min(5.5, (P.h - 56) / 65);          // px per inch; leaves headroom for the wall, the slab, and the exaggerated heave
  const E = s * EXAG;
  G = { narrow, P, gw, s, cw: P.w - gw, E, yg: P.y + 48 + 1.8 * E + 4 * s };
  G.msg = narrow ? { x: 8, y: P.y + P.h + 6, w: canvasWidth - 16, h: drawHeight - (P.y + P.h + 6) - 6 } : { x: P.x + P.w + 8, y: 40, w: canvasWidth - (P.x + P.w + 8) - 10, h: 434 };
}

let pendingTags = [];
function drawGround(d, c, h) {
  pendingTags = [];
  const { P, s, cw, yg, E } = G;
  const x0 = P.x, x1 = P.x + cw, bottom = P.y + P.h - 6;
  const ySurf = yg - E * h.slab;
  const silt = c.silt;
  // panel
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);

  // soil
  noStroke();
  fill(silt ? 'burlywood' : 'darkgray');
  rect(x0 + 1, ySurf, cw - 2, bottom - ySurf);
  // soil texture: fine dots for silt, stones for gravel
  fill(silt ? 'tan' : 'gray');
  for (let yy = ySurf + 8; yy < bottom - 4; yy += 14) {
    for (let xx = x0 + 8 + ((floor(yy / 14) % 2) ? 7 : 0); xx < x1 - 6; xx += 14) {
      if (silt) circle(xx, yy, 2.5); else circle(xx, yy, 6 + ((xx * 7 + yy * 3) % 5));
    }
  }
  // frozen zone
  const front = frontIn(d, c), yFront = yg + front * s;
  if (front > 0) {
    const fz = color('lightskyblue');
    fz.setAlpha(100);
    fill(fz);
    rect(x0 + 1, ySurf, cw - 2, yFront - ySurf);
    stroke('royalblue');
    strokeWeight(2);
    drawingContext.setLineDash([4, 3]);
    line(x0 + 1, yFront, x1 - 1, yFront);
    drawingContext.setLineDash([]);
    pendingTags.push(['Freezing front: ' + nf(front, 0, 1) + ' in.', x0 + 8, yFront + 3, LEFT, TOP, 'navy']);
  }
  pendingTags.push([front > 0 ? 'Frozen soil' : 'Unfrozen soil', x0 + 8, ySurf + 5, LEFT, TOP, 'navy']);
  // design frost line
  const yLine = yg + FROST_DEPTH * s;
  stroke('black');
  strokeWeight(2);
  drawingContext.setLineDash([8, 5]);
  line(x0 + 1, yLine, x1 - 1, yLine);
  drawingContext.setLineDash([]);
  pendingTags.push(['Frost line: 42 in.', x1 - 8, yLine + 3, RIGHT, TOP, 'black']);

  // ice lenses, each lifted by the lenses below it
  hoverLens = -1;
  for (let i = LENS_Z.length - 1; i >= 0; i--) {
    const th = lensThick(i, d, c);
    if (th <= 0.001) continue;
    let below = 0;
    for (let j = i + 1; j < LENS_Z.length; j++) below += lensThick(j, d, c);
    const yb = yg + LENS_Z[i] * s - E * below, ht = max(3, E * th);
    fill('deepskyblue');
    stroke('navy');
    strokeWeight(1);
    rect(x0 + 1, yb - ht, cw - 2, ht);
    if (mouseX > x0 && mouseX < x1 && mouseY > yb - ht - 3 && mouseY < yb + 3) hoverLens = i;
  }
  if (hoverLens >= 0) {
    let below = 0;
    for (let j = hoverLens + 1; j < LENS_Z.length; j++) below += lensThick(j, d, c);
    const yb = yg + LENS_Z[hoverLens] * s - E * below, ht = max(3, E * lensThick(hoverLens, d, c));
    noFill();
    stroke('navy');
    strokeWeight(3);
    rect(x0 + 1, yb - ht - 1, cw - 2, ht + 2);
  }

  // wall, footing, and slab
  const D = footDepth(), wx = x0 + cw * 0.42, ww = 8 * s;
  const fTop = yg + D * s - E * h.foot;       // underside of the footing
  noStroke();
  fill('lightgray');
  stroke('dimgray');
  strokeWeight(2);
  rect(wx - 12 * s, fTop - 8 * s, 24 * s, 8 * s);                         // footing, 24 in. x 8 in.
  rect(wx - ww / 2, yg - 12 * s - E * h.foot, ww, fTop - 8 * s - (yg - 12 * s - E * h.foot));   // stem wall
  rect(wx + ww / 2, ySurf - 4 * s, x1 - 8 - (wx + ww / 2), 4 * s);        // slab, 4 in. thick, on the soil
  // slab-to-wall crack from the unequal movement
  const diff = h.slab - h.foot;
  if (diff > 0.25) {
    stroke('red');
    strokeWeight(3);
    const cx = wx + ww / 2 + 2, cy0 = ySurf - 4 * s;
    line(cx, cy0, cx + 5, cy0 + 2 * s);
    line(cx + 5, cy0 + 2 * s, cx, cy0 + 4 * s);
  }
  tagText('Wall', wx - 2 * s, yg - 12 * s - E * h.foot - 3, CENTER, BOTTOM, 'black', true);
  tagText('Footing, ' + D + ' in. deep', wx + 12 * s + 6, fTop - 6 * s, LEFT, CENTER, 'black');
  tagText('Slab on grade', wx + ww / 2 + 8, ySurf - 4 * s - 3, LEFT, BOTTOM, 'black', true);
  pendingTags.forEach(t => tagText(...t));
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Movement is drawn ' + EXAG + '× larger than real.', P.x + 8, P.y + 4);
}

// label with a pale backing so it stays readable over soil and ice
function tagText(str, x, y, ha, va, col, bare) {
  textSize(14);
  const w = textWidth(str) + 6;
  const bx = ha === RIGHT ? x - w : (ha === CENTER ? x - w / 2 : x);
  const by = va === BOTTOM ? y - 18 : (va === CENTER ? y - 9 : y);
  noStroke();
  if (!bare) { fill(255, 255, 255, 215); rect(bx - 2, by, w + 2, 18, 3); }
  fill(col);
  textAlign(LEFT, TOP);
  text(str, bx + 1, by + 1);
}

// ---- Gauge ----
function drawGauge(h) {
  const { P, gw } = G;
  const gx = P.x + P.w - gw, top = P.y + 50, bot = P.y + P.h - 22, ht = bot - top;
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Heave gauge', gx + gw / 2, P.y + 6);
  text('(inches)', gx + gw / 2, P.y + 22);
  // ruler
  const rx = gx + 30;
  stroke('black');
  strokeWeight(2);
  line(rx, top, rx, bot);
  for (let v = 0; v <= GAUGE_MAX + 0.01; v += 0.5) {
    const y = bot - ht * v / GAUGE_MAX;
    line(rx - 6, y, rx, y);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(RIGHT, CENTER);
    text(nf(v, 0, 1), rx - 8, y);
    stroke('black');
  }
  // markers
  const mk = (v, col, label, dy) => {
    const y = bot - ht * constrain(v, 0, GAUGE_MAX) / GAUGE_MAX;
    noStroke();
    fill(col);
    triangle(rx + 2, y, rx + 14, y - 6, rx + 14, y + 6);
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text(label, rx + 16, y + dy);
  };
  mk(h.slab, 'steelblue', 'Slab ' + nf(h.slab, 0, 2), 0);
  mk(h.foot, 'darkorange', 'Footing ' + nf(h.foot, 0, 2), h.slab - h.foot < 0.12 ? 14 : 0);
}

// ---- Status and explanation ----
function drawStatus(d, c, h) {
  const m = G.msg;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(m.x, m.y, m.w, m.h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  fill('dimgray');
  text('The three conditions (all needed)', m.x + 8, m.y + 4);
  const rows = [
    [c.silt, 'Soil: ' + (c.silt ? 'silt, frost-susceptible' : 'gravel, not susceptible')],
    [c.wet, 'Water: ' + (c.wet ? 'wet, a supply to draw up' : 'dry, no supply')],
    [c.cold, 'Temperature: ' + (c.cold ? 'below freezing' : 'above freezing')]
  ];
  const lh = G.narrow ? 19 : 23;
  rows.forEach((r, i) => {
    const y = m.y + 24 + i * lh;
    fill(r[0] ? 'seagreen' : 'darkorange');
    textSize(14);
    text(r[0] ? 'PRESENT' : 'REMOVED', m.x + 8, y);
    fill('black');
    text(r[1], m.x + 86, y, m.w - 94, lh);
  });
  // explanation
  const removed = [];
  if (!c.silt) removed.push('gravel drains freely and is too coarse to pull water up, so no ice lenses grow');
  if (!c.wet) removed.push('with no water supply there is nothing to feed the ice lenses');
  if (!c.cold) removed.push('above freezing there is no ice to lift the soil');
  let msg;
  const D = footDepth();
  if (removed.length) msg = (removed.length > 1 ? 'Conditions removed: ' : 'Condition removed: ') + removed.join('; ') + '. Heave stops: 0.00 in.';
  else if (d === 0) msg = 'All three conditions are present. Press Run winter, or drag the freezing days, to watch ice lenses grow under the freezing front.';
  else {
    msg = 'Silt draws water up by capillary action, and it freezes onto ice lenses that lift the soil. Slab ' + nf(h.slab, 0, 2) + ' in., footing ' + nf(h.foot, 0, 2) + ' in. ';
    msg += D === 18 ? 'The 18 in. footing sits in the frost zone, so lenses below it lift it too.' : 'The 42 in. footing sits at the frost line, so it stays put, but the slab still rises.';
    if (h.slab - h.foot > 0.25) msg += ' Unequal movement cracks the slab at the wall.';
  }
  fill('black');
  textSize(14);
  const ty = m.y + 24 + 3 * lh + 6;
  text(msg, m.x + 8, ty, m.w - 16, m.y + m.h - ty - 4);
  if (!G.narrow) {
    fill('dimgray');
    text('Which change stops heave?\nGravel fill removes the soil condition; drainage removes the water; insulation (Chapter 11) reduces the freezing. A footing at 42 in. protects only the footing, not the slab edge.', m.x + 8, m.y + m.h - 100, m.w - 16, 96);
  }
}

function drawControlLabels(d) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y0 = drawHeight;
  text('Soil:', 10, y0 + 20);
  text('Water:', 132, y0 + 20);
  text('Temperature:', 10, y0 + 55);
  text('Footing depth:', 10, y0 + 90);
  text('Freezing days: ' + round(d), 10, y0 + 125);
}

function drawTooltip() {
  if (hoverLens < 0) return;
  const tip = 'Ice lens at ' + LENS_Z[hoverLens] + ' in.: water drawn up from the wetter, unfrozen soil below freezes onto the lens, which thickens and lifts the soil above.';
  const w = min(300, canvasWidth - 12);
  textSize(14);
  const h = ceil(textWidth(tip) / (w - 16) + 0.3) * 18 + 10;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(tip, tx + 8, ty + 6, w - 16, h - 8);
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
