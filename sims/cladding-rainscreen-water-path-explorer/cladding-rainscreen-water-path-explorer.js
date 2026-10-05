// Cladding Rainscreen Water Path Explorer MicroSim - follow water that gets past four cladding systems and see how the sheathing wets and dries
// CANVAS_HEIGHT: 695
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 580;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Data: the four systems. All values are illustrative.
// tc, tg: cladding and gap thickness (in). entry: share of rain that gets past a joint. drain: share of that water the system carries out
// (with flashing). tau: drying time constant of the wet sheathing (days). vent: air movement in the gap while drying.
const systems = [
  { name: 'Face-sealed siding', tc: 0.4, tg: 0, entry: 0.20, drain: 0.0, tau: 15, vent: 0, brick: false,
    how: 'Siding sealed to the wall. There is no gap, so water that gets past a joint has nowhere to go.' },
  { name: 'Drained siding', tc: 0.4, tg: 0.25, entry: 0.20, drain: 0.80, tau: 5, vent: 0.25, brick: false,
    how: 'Lapped siding over the barrier with a thin drainage space. Water runs down the barrier and out at the base.' },
  { name: 'Brick veneer with cavity', tc: 3.6, tg: 1.0, entry: 0.30, drain: 0.85, tau: 3.5, vent: 0.5, brick: true,
    how: 'Brick with a 1 in air space, base flashing, and weep holes. The brick is porous, so it lets in more water.' },
  { name: 'Rainscreen, ventilated gap', tc: 0.4, tg: 0.75, entry: 0.12, drain: 0.95, tau: 1, vent: 1.0, brick: false,
    how: 'Siding on furring strips with a 3/4 in gap open at the top and bottom. It drains, breaks capillary contact, and dries.' }
];
const rainNames = ['Light', 'Moderate', 'Heavy'];
const rainRate = [0.3, 0.6, 1.0];
const NOFLASH_DRAIN = 0.35;  // without flashing and weeps, only 35 percent of the drainage still works
const GAIN = 5;              // sheathing moisture after a storm = rain x entry x (1 - drainage) x GAIN
const DRY_LIMIT = 0.05;      // below 5 percent moisture the sheathing counts as dry
const STORM_FRAMES = 360;
const DRY_FRAMES = 280;

// ---- State ----
let drops = [];
let storm = { active: false, frame: 0 };
let enterAcc = 0, absorbAcc = 0, hitAcc = 0;
let moisture = 0;          // 0 to 1
let dry = { active: false, frame: 0, m0: 0, days: 0, total: 0 };
let showTable = false;
let mouseOverCanvas = false;
let sec, infoR, g; // section panel, info panel, geometry
let wide = true;
let hoverDrop = null;

// ---- Controls ----
let sysSel, rainSlider, flashBox, stormButton, dryButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);
  textSize(defaultTextSize);

  sysSel = createSelect();
  systems.forEach(s => sysSel.option(s.name));
  sysSel.selected('Drained siding');
  sysSel.changed(newExperiment);
  stormButton = createButton('Run storm');
  stormButton.mousePressed(runStorm);
  dryButton = createButton('Dry out');
  dryButton.mousePressed(runDry);
  flashBox = createCheckbox('Flashing + weeps', true);
  flashBox.changed(newExperiment);
  rainSlider = createSlider(0, 2, 1, 1);

  positionControls();
  describe('A cross-section of a wall with the cladding on the left, then a gap, a weather-resistive barrier, sheathing, and a stud cavity. Blue droplets are blown against the cladding and some enter through a joint. A base flashing and weep opening are drawn at the bottom. A moisture gauge on the sheathing rises when water is trapped and falls when it drains or dries. A dropdown picks one of four cladding systems, a slider sets the rain intensity, a checkbox adds or removes the flashing and weeps, and buttons run a storm and a dry-out.', LABEL);
}

function positionControls() {
  sysSel.position(80, drawHeight + 6);
  stormButton.position(10, drawHeight + 41);
  dryButton.position(95, drawHeight + 41);
  flashBox.position(170, drawHeight + 41);
  rainSlider.position(sliderLeftMargin + 40, drawHeight + 76);
  rainSlider.size(max(100, canvasWidth - sliderLeftMargin - 40 - 25));
}

function sys() { return systems.find(s => s.name === sysSel.value()); }
function rain() { return rainRate[rainSlider.value()]; }
function flashing() { return flashBox.checked(); }
// share of the water behind the cladding that is carried out; flashing and weeps matter
function drainEff(s) { return s.drain * (flashing() ? 1 : NOFLASH_DRAIN); }
// sheathing moisture after one storm of the current intensity
function stormMoisture(s) { return min(1, rain() * s.entry * (1 - drainEff(s)) * GAIN); }
// days for that moisture to fall to the dry limit
function daysToDry(s, m0) { return m0 <= DRY_LIMIT ? 0 : s.tau * log(m0 / DRY_LIMIT); }

function newExperiment() {
  drops = [];
  storm.active = false;
  dry.active = false;
  moisture = 0;
  showTable = false;
  enterAcc = absorbAcc = hitAcc = 0;
}

function runStorm() {
  dry.active = false;
  storm = { active: true, frame: 0 };
}

function runDry() {
  storm.active = false;
  showTable = true;
  const s = sys();
  const total = daysToDry(s, moisture);
  dry = { active: moisture > DRY_LIMIT, frame: 0, m0: moisture, days: 0, total };
}

// ---- Geometry ----
function layoutPanels() {
  wide = canvasWidth >= 640;
  if (wide) {
    const sw = floor(canvasWidth * 0.56);
    sec = { x: 10, y: 42, w: sw - 10, h: drawHeight - 50 };
    infoR = { x: sw + 10, y: 42, w: canvasWidth - sw - 20, h: drawHeight - 50 };
  } else {
    sec = { x: 6, y: 40, w: canvasWidth - 12, h: 244 };
    infoR = { x: 6, y: 288, w: canvasWidth - 12, h: drawHeight - 294 };
  }
  const s = sys();
  const rainW = sec.w * (wide ? 0.34 : 0.3);
  const gaugeW = 46;
  const avail = sec.w - rainW - gaugeW - 14;
  const cavIn = 2.5, wrb = 0.06, shth = 0.44;
  const total = s.tc + s.tg + wrb + shth + cavIn;
  const k = min(36, avail / total);
  g = {};
  g.xc0 = sec.x + rainW;                                    // outer face of the cladding
  g.xc1 = g.xc0 + max(8, s.tc * k);                         // inner face of the cladding
  g.xg1 = g.xc1 + (s.tg > 0 ? max(10, s.tg * k) : 0);       // gap ends, barrier begins
  g.xw1 = g.xg1 + 3;                                        // barrier is a thin skin
  g.xs1 = g.xw1 + max(9, shth * k);                         // sheathing
  g.xe = g.xs1 + max(36, cavIn * k);                        // stud cavity
  g.yT = sec.y + 44;
  g.yG = sec.y + sec.h - 62;                                 // top of the foundation and ground
  g.yF = g.yG - 22;                                          // flashing level
  g.yJ = g.yT + (g.yF - g.yT) * 0.38;                       // the joint in the cladding
  g.gaugeX = sec.x + sec.w - gaugeW + 8;
}

// ---- Frame ----
function draw() {
  updateCanvasSize();
  layoutPanels();
  updateSim();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  let ts = 24;
  textSize(ts);
  while (textWidth('Cladding Rainscreen Water Path Explorer') > canvasWidth - 12 && ts > 16) textSize(--ts);
  text('Cladding Rainscreen Water Path Explorer', canvasWidth / 2, 8 + (24 - ts) / 2);

  hoverDrop = null;
  drawSection();
  drawDrops();
  drawGauge();
  drawInfo();
  drawTooltip();
  drawControlLabels();
}

// ---- Particle model: rain, water entering a joint, drainage, and soaking. Decisions use accumulators, so a storm is repeatable. ----
function updateSim() {
  const s = sys();
  if (storm.active) {
    storm.frame++;
    const r = rain();
    hitAcc += 1.1 * r * (1 - s.entry);
    enterAcc += 1.1 * r * s.entry;
    while (enterAcc >= 1) { enterAcc -= 1; spawnEnter(s); }
    while (hitAcc >= 1) { hitAcc -= 1; spawnHit(); }
    if (storm.frame >= STORM_FRAMES) storm.active = false;
  }
  // drying: the moisture falls exponentially while the day counter runs
  if (dry.active) {
    dry.frame++;
    dry.days = dry.total * min(1, dry.frame / DRY_FRAMES);
    moisture = dry.m0 * exp(-dry.days / s.tau);
    if (dry.frame >= DRY_FRAMES) { dry.active = false; moisture = DRY_LIMIT * 0.999; }
  }
  for (const d of drops) stepDrop(d, s);
  drops = drops.filter(d => d.state !== 'gone');
}

function spawnHit() {
  const y = random(g.yT + 6, g.yF - 12);
  drops.push({ x: g.xc0 - random(50, 110), y: y - random(30, 60), vx: 2.4, vy: 1.8, state: 'air', cause: 'wind', target: g.xc0, life: 0 });
}
function spawnEnter(s) {
  const absorbed = (absorbAcc += (1 - drainEff(s))) >= 1;
  if (absorbed) absorbAcc -= 1;
  drops.push({ x: g.xc0 - 90, y: g.yJ - 50, vx: 2.6, vy: 1.8, state: 'air', cause: 'wind', target: g.xc0, enter: true, absorbed, life: 0 });
}

function stepDrop(d, s) {
  d.life++;
  const gapMid = (g.xc1 + g.xg1) / 2;
  if (d.state === 'air') {
    d.x += d.vx; d.y += d.vy;
    if (d.enter) d.vy = lerp(1.8, 0.5, constrain((d.x - (g.xc0 - 90)) / 90, 0, 1)); // aim for the joint
    if (d.x >= g.xc0) {
      if (d.enter) { d.state = 'joint'; d.x = g.xc0; d.y = g.yJ; d.cause = 'wind'; } else { d.state = 'face'; d.x = g.xc0 - 1; d.cause = 'gravity'; d.vy = 1.6; d.vx = 0; }
    }
  } else if (d.state === 'face') {
    d.y += d.vy;
    if (d.life > 150 || d.y > g.yF) d.state = 'gone';
  } else if (d.state === 'joint') {
    d.x += 2.2; // pressure difference pushes water through the joint
    if (d.x >= (s.tg > 0 ? gapMid : g.xg1)) {
      if (s.tg === 0) { d.state = 'soak'; d.cause = 'capillary'; d.x = g.xg1; } else { d.state = 'gap'; d.cause = 'gravity'; d.x = gapMid; d.vy = 1.7; }
    }
  } else if (d.state === 'gap') {
    d.y += d.vy;
    if (d.y >= g.yF - 4) {
      if (d.absorbed) { d.state = 'soak'; d.cause = 'capillary'; d.x = g.xg1; d.y = g.yF - 6; }
      else { d.state = 'exit'; d.cause = 'gravity'; d.vy = 1; d.x = g.xc0 - 2; }
    }
  } else if (d.state === 'exit') {
    d.vy += 0.15;
    d.y += d.vy;
    d.x -= 0.6;
    if (d.y >= g.yG) d.state = 'gone';
  } else if (d.state === 'soak') {
    d.x += 0.7;
    if (d.x >= g.xs1 - 2) { moisture = min(1, moisture + GAIN / (STORM_FRAMES * 1.1)); d.state = 'gone'; }
  }
}

// ---- Wall section ----
function drawSection() {
  const s = sys();
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(sec.x, sec.y, sec.w, sec.h, 8);
  // ground and foundation
  noStroke();
  fill('darkkhaki');
  rect(sec.x + 1, g.yG, sec.w - 2, 36);
  stroke('gray');
  strokeWeight(1);
  fill('lightgray');
  rect(g.xc0 - 6, g.yG, g.xe - g.xc0 + 6, 36);
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Ground', sec.x + 8, g.yG + 18);
  drawKey();
  // layers
  const top = g.yT, bot = g.yG;
  // stud cavity with insulation, studs top and bottom
  stroke('dimgray'); strokeWeight(1);
  fill('lightyellow'); rect(g.xs1, top, g.xe - g.xs1, bot - top);
  noStroke(); fill('dimgray'); textSize(14); textAlign(CENTER, CENTER);
  push();
  translate((g.xs1 + g.xe) / 2, (top + bot) / 2);
  rotate(-HALF_PI);
  const lbl = ['stud cavity with insulation', 'insulated cavity', 'cavity'].find(t => textWidth(t) < bot - top - 12) || 'cavity';
  text(lbl, 0, 0);
  pop();
  // sheathing with moisture tint
  stroke('dimgray'); strokeWeight(1);
  fill('peru'); rect(g.xw1, top, g.xs1 - g.xw1, bot - top);
  if (moisture > 0.005) {
    const c = color('dodgerblue');
    c.setAlpha(60 + 190 * moisture);
    noStroke(); fill(c);
    rect(g.xw1, top, g.xs1 - g.xw1, bot - top);
  }
  // barrier
  stroke('dimgray'); strokeWeight(1);
  fill('cornflowerblue'); rect(g.xg1, top, g.xw1 - g.xg1, bot - top);
  // gap
  if (s.tg > 0) { fill('azure'); rect(g.xc1, top, g.xg1 - g.xc1, bot - top); }
  // cladding, with a joint and a weep opening
  drawCladding(s);
  // flashing at the base
  drawFlashing(s);
  // wind-driven rain label
  fill('steelblue'); textAlign(LEFT, TOP);
  text('Wind-driven rain', sec.x + 8, sec.y + 6);
  stroke('steelblue'); strokeWeight(3);
  line(sec.x + 10, sec.y + 30, sec.x + 40, sec.y + 36);
  noStroke(); fill('steelblue');
  triangle(sec.x + 46, sec.y + 37, sec.x + 36, sec.y + 29, sec.x + 38, sec.y + 41);
  // drying flow while the dry-out runs
  if (dry.active) drawDryFlow(s);
}

function drawCladding(s) {
  const w = g.xc1 - g.xc0;
  stroke('dimgray'); strokeWeight(1);
  if (s.brick) {
    fill('indianred');
    rect(g.xc0, g.yT, w, g.yG - g.yT);
    stroke('white'); strokeWeight(1);
    for (let y = g.yT + 12; y < g.yG; y += 12) line(g.xc0, y, g.xc1, y);
  } else {
    fill('tan');
    rect(g.xc0, g.yT, w, g.yG - g.yT);
  }
  // joint: a gap in the cladding where wind-driven rain gets in
  noStroke();
  fill('white');
  rect(g.xc0 - 0.5, g.yJ - 4, w + 1, 8);
  fill('dimgray'); textSize(14); textAlign(RIGHT, CENTER);
  text('joint', g.xc0 - 6, g.yJ - 16);
  // weep opening at the base (open when flashing and weeps are present and the system drains)
  if (flashing() && s.tg > 0) {
    fill('white');
    rect(g.xc0 - 0.5, g.yF - 10, w + 1, 8);
    fill('dimgray'); textAlign(RIGHT, CENTER);
    text('weep', g.xc0 - 6, g.yF - 22);
  }
}

function drawFlashing(s) {
  const x0 = g.xw1, xOut = g.xc0 - 8;
  if (flashing()) {
    stroke('dimgray'); strokeWeight(3);
    noFill();
    // up the face of the barrier, then down and out over the foundation, with a drip edge
    line(g.xw1, g.yF - 16, g.xw1 - 1, g.yF);
    line(g.xw1 - 1, g.yF, xOut, g.yF + 5);
    line(xOut, g.yF + 5, xOut, g.yF + 10);
    noStroke(); fill('dimgray'); textSize(14); textAlign(RIGHT, TOP);
    text('flashing', xOut - 2, g.yF + 8);
  } else {
    drawingContext.setLineDash([4, 3]);
    stroke('crimson'); strokeWeight(2);
    line(g.xw1 - 1, g.yF, xOut, g.yF + 5);
    drawingContext.setLineDash([]);
    noStroke(); fill('crimson'); textSize(14); textAlign(RIGHT, TOP);
    text('no flashing', xOut - 2, g.yF + 8);
  }
}

// moving vapor dots leave the wet sheathing during the dry-out; the ventilated gap carries them away fastest
function drawDryFlow(s) {
  noStroke();
  fill('steelblue');
  const n = 5;
  for (let k = 0; k < n; k++) {
    const t = ((dry.frame * 0.012 * (0.2 + s.vent)) + k / n) % 1;
    if (s.tg > 0) circle((g.xc1 + g.xg1) / 2, lerp(g.yF - 8, g.yT + 4, t), 5);
    const t2 = ((dry.frame * 0.01) + k / n) % 1;
    circle(lerp(g.xw1, g.xg1 + (s.tg > 0 ? 0 : -8), t2), lerp(g.yF - 20, g.yT + 30, (k * 0.31) % 1), 4);
  }
}

// ---- Drops ----
function drawDrops() {
  noStroke();
  let best = null, bd = 9;
  for (const d of drops) {
    fill(d.state === 'soak' ? 'navy' : 'dodgerblue');
    circle(d.x, d.y, d.state === 'face' ? 4 : 6);
    const dd = dist(mouseX, mouseY, d.x, d.y);
    if (dd < bd) { bd = dd; best = d; }
  }
  hoverDrop = best;
}

// key to the layer colors, in a strip under the drawing
function drawKey() {
  const y = sec.y + sec.h - 22, s = sys();
  const items = [['tan', 'Cladding'], ['azure', 'Gap'], ['cornflowerblue', 'Barrier'], ['peru', 'Sheathing'], ['lightyellow', 'Insulated cavity']];
  stroke('silver'); strokeWeight(1); fill('white');
  rect(sec.x + 1, y - 4, sec.w - 2, 25, 0);
  textSize(14); textAlign(LEFT, CENTER);
  let x = sec.x + 8;
  items.forEach(it => {
    if (it[1] === 'Cladding' && s.brick) it = ['indianred', 'Brick'];
    stroke('dimgray'); strokeWeight(1); fill(it[0]);
    rect(x, y + 3, 12, 12);
    noStroke(); fill('black');
    text(it[1], x + 16, y + 9);
    x += 22 + textWidth(it[1]) + (wide ? 8 : 2);
  });
}

// ---- Moisture gauge on the sheathing ----
function drawGauge() {
  const gx = g.gaugeX, gy = g.yT + 8, gh = g.yG - g.yT - 16, gw = 18;
  stroke('gray'); strokeWeight(1);
  fill('white');
  rect(gx, gy, gw, gh, 3);
  const frac = constrain(moisture, 0, 1);
  const col = moisture < DRY_LIMIT ? 'seagreen' : (moisture < 0.2 ? 'gold' : (moisture < 0.5 ? 'darkorange' : 'crimson'));
  noStroke(); fill(col);
  rect(gx + 1, gy + gh - gh * frac, gw - 2, gh * frac);
  // dry limit mark
  stroke('black'); strokeWeight(2);
  line(gx - 3, gy + gh - gh * DRY_LIMIT, gx + gw + 3, gy + gh - gh * DRY_LIMIT);
  noStroke(); fill('black'); textSize(14); textAlign(CENTER, BOTTOM);
  text(round(moisture * 100) + '%', gx + gw / 2, gy - 18);
  textSize(12);
  text('moisture', gx + gw / 2 + 2, gy - 4);
}

function moistWord(m) { return m < DRY_LIMIT ? 'Dry' : (m < 0.2 ? 'Damp' : (m < 0.5 ? 'Wet' : 'Soaked')); }

// ---- Info panel: system, status, explanation, drying table ----
function drawInfo() {
  const s = sys();
  stroke('silver'); strokeWeight(1);
  fill('white');
  rect(infoR.x, infoR.y, infoR.w, infoR.h, 8);
  const x = infoR.x + 8, w = infoR.w - 16;
  let y = infoR.y + 6;
  noStroke(); textAlign(LEFT, TOP); textSize(16); fill('navy');
  y = para(s.name, x, y, w, 19);
  textSize(14); fill('black');
  y = para(s.how, x, y + 1, w, 17) + 4;
  // status
  const idle = moisture < 0.005 && drops.length === 0;
  const state = storm.active ? 'Storm running' : (dry.active ? 'Drying: day ' + nf(dry.days, 0, 1) + ' of ' + nf(dry.total, 0, 1) : (idle ? 'Press Run storm to start' : 'Storm over'));
  fill('dimgray');
  y = para(state + '. Rain: ' + rainNames[rainSlider.value()].toLowerCase() + '.', x, y, w, 17);
  fill(moisture < DRY_LIMIT ? 'seagreen' : (moisture < 0.5 ? 'darkorange' : 'crimson'));
  textSize(16);
  y = para('Sheathing moisture: ' + round(moisture * 100) + '% (' + moistWord(moisture) + ')', x, y + 2, w, 19) + 4;
  // explanation
  fill('black'); textSize(14);
  y = para(explain(s), x, y, w, 17) + 6;
  if (showTable) drawTable(x, y, w);
}

function explain(s) {
  const fl = flashing();
  if (s.tg === 0) return 'No drainage plane: every droplet that gets past the joint soaks the sheathing and can leave only by slow drying.' + (moisture >= DRY_LIMIT ? ' That is why a face-sealed wall fails when one joint fails.' : '');
  if (!fl) return 'Without flashing and weep openings the water has no exit: it backs up at the base and soaks the sheathing, even though the gap drains part of it.';
  if (s.vent >= 1) return 'Water runs down the gap and out at the weeps. The gap breaks capillary contact, and moving air in the open gap dries the wall faster than any other system here.';
  if (s.brick) return 'The brick takes in more water, but the air space, flashing, and weep holes carry it out. The cavity air moves less than in a rainscreen, so drying is slower.';
  return 'Water runs down the barrier and out through the flashing, so little reaches the sheathing. The thin space dries the wall more slowly than a ventilated gap.';
}

function drawTable(x, y, w) {
  fill('black'); textSize(14); textAlign(LEFT, TOP);
  y = para('Time to dry, one ' + rainNames[rainSlider.value()].toLowerCase() + ' storm' + (flashing() ? '' : ', no flashing') + ' (illustrative):', x, y, w, 17) + 2;
  const sel = sys();
  const rows = systems.map(s => ({ s, m: stormMoisture(s), d: daysToDry(s, stormMoisture(s)) }));
  const maxD = max(1, ...rows.map(r => r.d));
  rows.forEach(r => {
    const isSel = r.s === sel;
    fill(isSel ? 'navy' : 'black');
    textAlign(LEFT, TOP);
    textSize(14);
    text(r.s.name.replace(', ventilated gap', '').replace(' with cavity', ''), x, y);
    const bx = x + min(130, w * 0.42), bw = w - (bx - x) - 74;
    noStroke();
    fill(isSel ? 'navy' : 'steelblue');
    rect(bx, y + 3, max(2, bw * r.d / maxD), 11, 2);
    fill(isSel ? 'navy' : 'black');
    textAlign(RIGHT, TOP);
    text(r.d === 0 ? 'stays dry' : nf(r.d, 0, 1) + ' d', x + w, y);
    y += 19;
  });
}

// wrapped text drawn word by word; returns the y below the last line
function para(str, x, y, w, lh) {
  const words = str.split(' ');
  let ln = '', yy = y;
  words.forEach(wd => {
    const t = ln ? ln + ' ' + wd : wd;
    if (textWidth(t) > w && ln) { text(ln, x, yy); yy += lh; ln = wd; } else ln = t;
  });
  if (ln) { text(ln, x, yy); yy += lh; }
  return yy;
}

// ---- Tooltip: droplet cause, or layer role ----
function drawTooltip() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  let title = null, body = '';
  if (hoverDrop) {
    const d = hoverDrop;
    const where = { air: 'blown toward the wall', face: 'running down the cladding face', joint: 'pushed through the joint', gap: 'running down the gap', exit: 'leaving through the weep opening', soak: 'soaking into the sheathing' }[d.state];
    const how = { wind: 'wind pressure', gravity: 'gravity', capillary: 'capillary action, the pull of narrow spaces' }[d.cause];
    title = 'Water: ' + where;
    body = 'Moved by ' + how + '.';
  } else if (mouseY > g.yT && mouseY < g.yG + 30) {
    const s = sys();
    if (mouseX >= g.xc0 && mouseX < g.xc1) { title = 'Cladding'; body = 'First line of defense. It sheds most rain, but wind pushes some through the joints.'; }
    else if (s.tg > 0 && mouseX >= g.xc1 && mouseX < g.xg1) { title = 'Drainage gap'; body = 'Gravity moves water down to the weeps. It also breaks capillary contact and lets air dry the wall.'; }
    else if (mouseX >= g.xg1 && mouseX < g.xw1) { title = 'Weather-resistive barrier'; body = 'The water control layer: a drainage plane that sends water down and out.'; }
    else if (mouseX >= g.xw1 && mouseX < g.xs1) { title = 'Sheathing'; body = 'Wood panel on the cold side. Capillary action pulls water in, and it dries slowly. Watch the moisture gauge.'; }
    else if (mouseX >= g.xs1 && mouseX < g.xe) { title = 'Stud cavity'; body = 'Insulation fills the cavity. It must stay dry to keep its R-value.'; }
    else if (mouseX >= g.xc0 - 40 && mouseX < g.xc0 && mouseY > g.yF - 6) { title = flashing() ? 'Flashing and weep' : 'No flashing'; body = flashing() ? 'Flashing catches water at the base and sends it out through the weep opening.' : 'Water that reaches the base has no exit and backs up into the wall.'; }
  } else if (mouseX >= g.gaugeX - 4 && mouseX <= g.gaugeX + 24 && mouseY > g.yT && mouseY < g.yG) {
    title = 'Moisture gauge'; body = 'Sheathing moisture. Rises when water is trapped, falls as it drains and dries. Below the black line counts as dry.';
  }
  if (!title) return;
  const w = min(canvasWidth - 16, 250);
  textSize(14);
  let lines = ceil(textWidth(body) / (w - 16)) + 1;
  const h = 30 + lines * 17;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 6, drawHeight - h - 6);
  stroke('navy'); strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  text(title, tx + 8, ty + 6);
  para(body, tx + 8, ty + 24, w - 16, 17);
}

// ---- Control labels ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('System:', 10, drawHeight + 19);
  text('Rain: ' + rainNames[rainSlider.value()], 10, drawHeight + 89);
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
