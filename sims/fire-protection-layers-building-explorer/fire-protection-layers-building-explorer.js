// Fire Protection Layers Building Explorer MicroSim - start a fire in room B, switch the four protection layers on and off, and click each numbered feature to see its job, whether it is passive or active, and who is responsible
// CANVAS_HEIGHT: 500
// Bloom Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 385;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150; // left edge of the time slider
let defaultTextSize = 16;

// ---- Data: the five jobs, and the ten numbered features ----
const jobs = ['Detect', 'Warn', 'Suppress', 'Smoke', 'Contain'];
const jobFull = { Detect: 'Detect', Warn: 'Warn', Suppress: 'Suppress', Smoke: 'Control smoke', Contain: 'Contain' };

// fx is a fraction of the building width; fy is 'c1' ceiling of floor 1, 'm1' middle of floor 1, 'c2' ceiling of floor 2, 'm2' middle of floor 2, 'd' duct line
const feats = [
  { id: 1, name: 'Rated wall', short: 'Rated wall', type: 'Passive', job: 'Contain', layer: 'walls', who: 'Architect', fx: 0.70, fy: 'm1',
    note: 'A fire-resistance-rated wall between rooms A and B. It holds the fire in room B with no power and no moving parts.' },
  { id: 2, name: 'Rated stair enclosure', short: 'Stair enclosure', type: 'Passive', job: 'Contain', layer: 'walls', who: 'Architect', fx: 0.28, fy: 'm1',
    note: 'Rated walls and doors around the stair keep fire and smoke out of the exit path.' },
  { id: 3, name: 'Smoke detector, room B', short: 'Detector', type: 'Active', job: 'Detect', layer: 'alarm', who: 'Electrical engineer', fx: 0.82, fy: 'c1',
    note: 'Senses smoke and signals the fire alarm panel, which starts the alarm and the smoke control.' },
  { id: 4, name: 'Smoke detector, corridor', short: 'Detector', type: 'Active', job: 'Detect', layer: 'alarm', who: 'Electrical engineer', fx: 0.33, fy: 'c1',
    note: 'Watches the exit path. A second detector confirms that smoke is moving toward the stair.' },
  { id: 5, name: 'Horn and strobe', short: 'Horn, strobe', type: 'Active', job: 'Warn', layer: 'alarm', who: 'Electrical engineer', fx: 0.40, fy: 'm1b',
    note: 'The horn warns by sound and the strobe by light, so people who cannot hear are warned too.' },
  { id: 6, name: 'Sprinkler head', short: 'Sprinkler', type: 'Active', job: 'Suppress', layer: 'spr', who: 'Fire protection engineer (sprinkler contractor)', fx: 0.92, fy: 'h1',
    note: 'Opens when the ceiling reaches about 155 °F. Only the heads near the fire open, which limits water damage.' },
  { id: 7, name: 'Sprinkler riser and branch pipes', short: 'Riser, pipes', type: 'Active', job: 'Suppress', layer: 'spr', who: 'Fire protection engineer', fx: 0.14, fy: 'm2',
    note: 'The riser carries water up the building, and branch pipes carry it to the heads. A flow switch tells the alarm panel.' },
  { id: 8, name: 'Fire pump room', short: 'Pump room', type: 'Active', job: 'Suppress', layer: 'spr', who: 'Fire protection engineer; electrical engineer powers the pump', fx: 0.07, fy: 'p',
    note: 'A pump boosts a weak city supply to the flow and pressure the sprinklers need.' },
  { id: 9, name: 'Smoke damper in duct', short: 'Smoke damper', type: 'Passive', job: 'Smoke', layer: 'smoke', who: 'Mechanical engineer', fx: 0.70, fy: 'd',
    note: 'Closes on an alarm signal so the duct cannot carry smoke through the rated wall. Chapter 14 lists it among the passive measures because it keeps the compartment sealed, although it moves.' },
  { id: 10, name: 'Stair pressurization fan', short: 'Stair fan', type: 'Active', job: 'Smoke', layer: 'smoke', who: 'Mechanical engineer', fx: 0.21, fy: 'c2',
    note: 'Supplies air so the stair stays at higher pressure than the fire floor, which keeps smoke out of the exit.' }
];
const layerNames = { spr: 'Sprinklers', alarm: 'Alarm', smoke: 'Smoke control', walls: 'Rated walls' };

// ---- Timeline of the illustrative fire (minutes) ----
const T_DET = 0.8, T_ALARM = 1.0, T_SPR = 2.0, T_FULL = 6;

// ---- State ----
let t = 0;                 // minutes since ignition
let playing = false;
let lastMs = 0;
let selected = -1;         // index into feats
let hover = -1;
let markers = [];
let geo = {};

// ---- Controls ----
let startButton, sprCheck, alarmCheck, smokeCheck, wallsCheck, timeSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  startButton = createButton('Start fire in room B');
  startButton.mousePressed(() => { t = 0; playing = true; lastMs = millis(); timeSlider.value(0); });
  sprCheck = createCheckbox('Sprinklers', true);
  alarmCheck = createCheckbox('Alarm', true);
  smokeCheck = createCheckbox('Smoke control', true);
  wallsCheck = createCheckbox('Rated walls', true);
  [sprCheck, alarmCheck, smokeCheck, wallsCheck].forEach(c => c.style('font-size', '14px'));
  timeSlider = createSlider(0, 10, 0, 0.1);
  timeSlider.input(() => { playing = false; t = timeSlider.value(); });

  positionControls();
  describe('A cutaway of a two-story building with a fire pump room, a stair, a corridor, and two rooms, A and B, separated by a rated wall. Ten numbered markers show a rated wall, a rated stair enclosure, two smoke detectors, a horn and strobe, a sprinkler head, the sprinkler riser and pipes, a fire pump room, a smoke damper in a duct, and a stair pressurization fan. Passive features are blue squares and active features are orange circles. A button starts a fire in room B and a time slider moves from 0 to 10 minutes. Four checkboxes turn the sprinklers, alarm, smoke control, and rated walls on or off, and the animation shows the consequence. Clicking a marker opens an infobox with the feature job, whether it is passive or active, and who is responsible.', LABEL);
}

function positionControls() {
  startButton.position(10, drawHeight + 6);
  let x = 10;
  [sprCheck, alarmCheck, smokeCheck, wallsCheck].forEach(c => { c.position(x, drawHeight + 42); x += c.elt.getBoundingClientRect().width + 12; });
  timeSlider.position(sliderLeftMargin, drawHeight + 82);
  timeSlider.size(max(100, canvasWidth - sliderLeftMargin - 20));
}

function on(layer) {
  return { spr: sprCheck.checked(), alarm: alarmCheck.checked(), smoke: smokeCheck.checked(), walls: wallsCheck.checked() }[layer];
}

// ---- Illustrative fire model: all times and fractions are teaching values, not predictions ----
function fireSize(tt) {
  if (tt <= 0) return 0;
  const grow = u => min(1, (u / T_FULL) * (u / T_FULL));
  if (on('spr') && tt > T_SPR) return max(0.04, grow(T_SPR) * exp(-(tt - T_SPR) / 0.7));
  return grow(tt);
}
function smokeSource(tt) {                                   // smoke in room B from the fire history
  let I = 0;
  for (let u = 0; u < tt; u += 0.05) I += fireSize(u) * 0.05;
  return constrain(sqrt(I), 0, 0.95);
}
function tDamper() { return (on('alarm') && on('smoke')) ? T_ALARM + 0.1 : Infinity; }
function tFan() { return (on('alarm') && on('smoke')) ? T_ALARM + 0.2 : Infinity; }
function smokeZones(tt) {
  const dB = smokeSource(tt);
  const corrRaw = smokeSource(tt - (on('walls') ? 1.5 : 0.8)) * (on('walls') ? 0.15 : 1);
  const viaWall = on('walls') ? 0 : smokeSource(tt - 1.0) * 0.9;
  const dd = tDamper();
  const viaDuct = smokeSource(min(tt, dd) - 0.8) * 0.7;
  const stairRaw = smokeSource(tt - 2.0) * (on('walls') ? 0.1 : 0.9);
  return { B: dB, corr: corrRaw, A: max(viaWall, viaDuct), stair: tt >= tFan() ? stairRaw * 0.1 : stairRaw };
}
function spreadToA(tt) { return !on('walls') && fireSize(tt) >= (4 / T_FULL) * (4 / T_FULL) - 0.001 && !on('spr'); }

function events() {
  const list = [{ t: 0, s: 'Fire starts in room B.' }];
  if (on('alarm')) list.push({ t: T_DET, s: 'Smoke detector in room B triggers.' }, { t: T_ALARM, s: 'Alarm sounds; occupants are warned.' });
  if (on('alarm') && on('smoke')) list.push({ t: T_ALARM + 0.1, s: 'Smoke damper closes; stair fan starts.' });
  if (on('spr')) list.push({ t: T_SPR, s: 'Sprinkler opens over the fire.' }, { t: T_SPR + 1, s: 'Fire is controlled.' });
  if (!on('walls') && !on('spr')) list.push({ t: 4, s: 'No rated walls: fire reaches room A in 4 minutes.', bad: true });
  return list.sort((a, b) => a.t - b.t);
}
function consequences() {
  const c = [];
  if (!on('alarm') && t >= T_ALARM) c.push('No alarm: nothing detects the smoke and nobody is warned.');
  if (on('smoke') && !on('alarm') && t >= T_ALARM) c.push('Smoke control has no alarm signal to start it.');
  if (!on('spr') && t >= T_FULL) c.push('No sprinklers: the fire keeps growing and fills room B.');
  if (!on('smoke') && t >= 3) c.push('No smoke control: smoke reaches the stair.');
  if (!on('walls') && on('spr') && t >= 2.5) c.push('No rated walls: smoke spreads into room A.');
  if (on('walls') && !on('spr') && t >= T_FULL) c.push('The rated wall holds the fire in room B.');
  return c;
}

// ---- Geometry ----
function layout() {
  const g = {};
  g.bx = 10; g.bw = canvasWidth - 20;
  g.roof = 62; g.slab = 62 + 72; g.ground = 62 + 144;
  g.c2 = g.roof + 6; g.m2 = (g.roof + g.slab) / 2; g.c1 = g.slab + 8; g.m1 = (g.slab + g.ground) / 2; g.fl = g.ground - 4;
  g.X = f => g.bx + f * g.bw;
  geo = g;
  return g;
}
function featY(f, g) {
  return { m1b: g.m1 + 10, p: g.m1 - 12, c1: g.c1 + 14, m1: g.m1 + 4, c2: g.c2 + 14, m2: g.m2, d: g.slab + 5, h1: g.c1 + 30 }[f.fy];
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  const g = layout();
  if (playing) {
    const now = millis();
    t = min(10, t + (now - lastMs) / 1000 * 0.9);          // about 11 s of real time for 10 minutes
    lastMs = now;
    if (t >= 10) playing = false;
    timeSlider.value(t);
  }

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
  text('Fire Protection Layers', canvasWidth / 2, 4);

  drawJobChips();
  drawBuilding(g);
  drawSystems(g);
  drawFireAndSmoke(g);
  drawMarkers(g);
  drawInfoArea(g);
  drawTooltip();
  drawControlLabels();
}

function drawJobChips() {
  const gap = 5, w = (canvasWidth - 20 - gap * 4) / 5;
  const job = selected >= 0 ? feats[selected].job : null;
  jobs.forEach((j, i) => {
    const x = 10 + i * (w + gap);
    stroke(j === job ? 'navy' : 'silver'); strokeWeight(j === job ? 3 : 1);
    fill(j === job ? 'lightyellow' : 'white');
    rect(x, 32, w, 22, 6);
    noStroke(); fill('black'); textAlign(CENTER, CENTER); textSize(14);
    text((i + 1) + ' ' + j, x + w / 2, 43);
  });
}

function drawBuilding(g) {
  const { X, roof, slab, ground } = g;
  // sky and floors
  noStroke(); fill('white');
  rect(g.bx, roof, g.bw, ground - roof);
  // room fills
  fill('ivory'); rect(X(0.42), roof, X(0.70) - X(0.42), ground - roof);              // room A
  fill('lemonchiffon'); rect(X(0.70), roof, X(1) - X(0.70), ground - roof);          // room B
  fill('whitesmoke'); rect(X(0.28), roof, X(0.42) - X(0.28), ground - roof);         // corridor
  fill('lavender'); rect(X(0.14), roof, X(0.28) - X(0.14), ground - roof);           // stair
  fill('gainsboro'); rect(X(0), g.slab, X(0.14) - X(0), ground - slab);              // pump room
  fill('lightgray'); rect(X(0), roof, X(0.14) - X(0), slab - roof);                  // riser shaft
  // slab and outer walls
  stroke('dimgray'); strokeWeight(3); noFill();
  rect(g.bx, roof, g.bw, ground - roof);
  line(g.bx, slab, g.bx + g.bw, slab);
  // stair run
  stroke('mediumpurple'); strokeWeight(2);
  for (let f = 0; f < 2; f++) {
    const y0 = f === 0 ? slab : roof, y1 = f === 0 ? ground : slab;
    for (let k = 0; k < 6; k++) line(X(0.15) + k * (X(0.27) - X(0.15)) / 6, y1 - 4 - k * (y1 - y0 - 12) / 6, X(0.15) + (k + 1) * (X(0.27) - X(0.15)) / 6, y1 - 4 - k * (y1 - y0 - 12) / 6);
  }
  // labels
  noStroke(); fill('dimgray'); textAlign(LEFT, TOP); textSize(12);
  text('Stair', X(0.14) + 3, ground - 16);
  text('Corridor', X(0.28) + 3, ground - 16);
  text('Room A', X(0.42) + 4, ground - 16);
  text('Room B', X(0.70) + 4, ground - 16);
  text('Floor 2', X(0.43), roof + 3);
}

// systems drawn as dashed gray when their layer is switched off
function sys(layer) { if (on(layer)) drawingContext.setLineDash([]); else drawingContext.setLineDash([4, 4]); return on(layer); }

function drawSystems(g) {
  const { X, roof, slab, ground, c1, c2 } = g;
  // rated walls (passive, blue): the A/B wall, the corridor wall, and the stair enclosure
  let ok = sys('walls');
  stroke(ok ? 'steelblue' : 'gray'); strokeWeight(ok ? 6 : 3);
  [0.70, 0.42, 0.28].forEach(f => { line(X(f), roof, X(f), slab - 2); line(X(f), slab + 2, X(f), ground); });
  drawingContext.setLineDash([]);
  // duct and smoke damper
  ok = sys('smoke');
  stroke(ok ? 'dimgray' : 'silver'); strokeWeight(6);
  line(X(0.30), slab + 5, X(0.97), slab + 5);
  drawingContext.setLineDash([]);
  const closed = on('smoke') && t >= tDamper();
  stroke(on('smoke') ? 'steelblue' : 'gray'); strokeWeight(3);
  if (closed) line(X(0.70), slab - 1, X(0.70), slab + 11); else line(X(0.70) - 7, slab + 5, X(0.70) + 7, slab + 5);
  // stair pressurization fan and airflow
  if (on('smoke')) {
    const fanOn = t >= tFan();
    stroke('darkorange'); strokeWeight(2); fill(fanOn ? 'darkorange' : 'white');
    circle(X(0.21), c2 + 6, 12);
    if (fanOn) { stroke('darkorange'); line(X(0.18), c2 + 18, X(0.18), c2 + 34); line(X(0.24), c2 + 18, X(0.24), c2 + 34); }
  } else { stroke('gray'); strokeWeight(2); noFill(); drawingContext.setLineDash([3, 3]); circle(X(0.21), c2 + 6, 12); drawingContext.setLineDash([]); }
  // sprinkler riser, mains, heads, and pump
  ok = sys('spr');
  stroke(ok ? 'darkorange' : 'gray'); strokeWeight(3);
  line(X(0.13), g.roof + 14, X(0.13), ground - 22);
  line(X(0.13), c1 + 14, X(0.98), c1 + 14);
  line(X(0.13), g.roof + 14, X(0.98), g.roof + 14);
  drawingContext.setLineDash([]);
  const headOpen = on('spr') && t >= T_SPR;
  [0.35, 0.56, 0.92].forEach(f => {
    stroke(ok ? 'darkorange' : 'gray'); strokeWeight(2);
    line(X(f), c1 + 14, X(f), c1 + 24);
    const open = headOpen && f === 0.92;
    fill(open ? 'dodgerblue' : (ok ? 'white' : 'whitesmoke')); circle(X(f), c1 + 26, 7);
  });
  [0.40, 0.60, 0.90].forEach(f => { stroke(ok ? 'darkorange' : 'gray'); strokeWeight(2); line(X(f), g.roof + 14, X(f), g.roof + 22); fill('white'); circle(X(f), g.roof + 24, 7); });
  stroke(ok ? 'darkorange' : 'gray'); strokeWeight(2); fill('white');
  circle(X(0.07), ground - 11, 18);
  noStroke(); fill(ok ? 'darkorange' : 'gray'); textAlign(CENTER, CENTER); textSize(12);
  text('P', X(0.07), ground - 11);
  // detectors, horn, strobe
  ok = sys('alarm');
  const det = on('alarm') && t >= T_DET, sound = on('alarm') && t >= T_ALARM;
  [0.82, 0.33].forEach(f => {
    stroke(ok ? 'darkorange' : 'gray'); strokeWeight(2);
    fill(det ? 'crimson' : 'white'); circle(X(f), c1 + 6, 10);
  });
  stroke(ok ? 'darkorange' : 'gray'); strokeWeight(2); fill('white');
  rect(X(0.40) - 6, g.m1 - 4, 12, 9, 2);
  drawingContext.setLineDash([]);
  if (sound) {
    noFill(); stroke('darkorange'); strokeWeight(2);
    const ph = (t * 4) % 1;
    for (let k = 0; k < 2; k++) arc(X(0.40), g.m1, 16 + (k + ph) * 14, 16 + (k + ph) * 14, -0.9, 0.9);
    stroke('gold'); strokeWeight(2);
    for (let k = 0; k < 6; k++) { const a = k * PI / 3; line(X(0.40) + cos(a) * 10, g.m1 - 22 + sin(a) * 10, X(0.40) + cos(a) * 15, g.m1 - 22 + sin(a) * 15); }
  }
  drawingContext.setLineDash([]);
}

function drawFireAndSmoke(g) {
  if (t <= 0) return;
  const { X, roof, slab, ground, c1 } = g;
  const z = smokeZones(t);
  const smoke = (x0, x1, y0, y1, d) => {
    if (d < 0.03) return;
    noStroke(); fill(60, 60, 60, 70 + 150 * d);
    rect(x0 + 2, y0, x1 - x0 - 4, (y1 - y0) * 0.7 * d);
  };
  smoke(X(0.70), X(1), slab, ground, z.B);
  smoke(X(0.42), X(0.70), slab, ground, z.A);
  smoke(X(0.28), X(0.42), slab, ground, z.corr);
  smoke(X(0.14), X(0.28), roof, ground, z.stair);
  // flames in room B, and in room A once the fire spreads
  const flame = (cx, s) => {
    const h = 8 + 50 * s;
    noStroke();
    fill('red'); triangle(cx - 10 - 8 * s, g.fl, cx + 10 + 8 * s, g.fl, cx, g.fl - h);
    fill('orange'); triangle(cx - 6 - 5 * s, g.fl, cx + 6 + 5 * s, g.fl, cx + 2, g.fl - h * 0.75);
    fill('gold'); triangle(cx - 3, g.fl, cx + 3, g.fl, cx, g.fl - h * 0.4);
  };
  flame(X(0.83), fireSize(t));
  if (spreadToA(t)) flame(X(0.60), min(0.7, fireSize(t) * 0.7));
  // sprinkler spray
  if (on('spr') && t >= T_SPR) {
    stroke('dodgerblue'); strokeWeight(2);
    for (let k = -3; k <= 3; k++) line(X(0.92), c1 + 28, X(0.92) + k * 7, c1 + 28 + 22 + (k % 2) * 6);
  }
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(12);
}

function drawMarkers(g) {
  markers = feats.map((f, i) => ({ x: g.X(f.fx), y: featY(f, g), i }));
  hover = -1;
  markers.forEach(m => { if (dist(mouseX, mouseY, m.x, m.y) < 12) hover = m.i; });
  const wide = canvasWidth >= 640;
  markers.forEach(m => {
    const f = feats[m.i], off = !on(f.layer);
    const col = f.type === 'Passive' ? 'steelblue' : 'darkorange';
    stroke(m.i === selected ? 'navy' : (off ? 'gray' : 'white')); strokeWeight(m.i === selected || m.i === hover ? 3 : 2);
    if (off) drawingContext.setLineDash([3, 3]);
    fill(off ? 'lightgray' : col);
    if (f.type === 'Passive') rect(m.x - 10, m.y - 10, 20, 20, 3); else circle(m.x, m.y, 21);
    drawingContext.setLineDash([]);
    noStroke(); fill(off ? 'dimgray' : 'white'); textAlign(CENTER, CENTER); textSize(14);
    text(f.id, m.x, m.y + 1);
    if (wide) {
      textSize(12);
      const lw = textWidth(f.short) + 8;
      fill(255, 255, 255, 215); rect(m.x - lw / 2, m.y + 12, lw, 15, 4);
      fill('black'); textAlign(CENTER, TOP); text(f.short, m.x, m.y + 13);
    }
  });
}

function drawInfoArea(g) {
  const y = g.ground + 6, h = drawHeight - y - 4;
  const wide = canvasWidth >= 640;
  const sx = 10, sw = wide ? floor((canvasWidth - 30) * 0.5) : canvasWidth - 20;
  const ix = wide ? sx + sw + 10 : 10, iw = wide ? canvasWidth - ix - 10 : canvasWidth - 20;
  const sh = wide ? h : 56, iy = wide ? y : y + sh + 4, ih = wide ? h : h - sh - 4;
  // status panel: layer states, time-line events, consequences
  stroke('silver'); strokeWeight(1); fill('white');
  rect(sx, y, sw, sh, 8);
  noStroke(); textAlign(LEFT, TOP); textSize(14);
  if (t <= 0 && !playing) {
    fill('black'); text('Press Start fire in room B, or drag the time slider. Click a numbered marker to learn what it does.', sx + 8, y + 5, sw - 16, sh - 8);
  } else {
    const ev = events().filter(e => e.t <= t + 0.001);
    const lines = [];
    ev.slice(wide ? -4 : -2).forEach(e => lines.push({ s: e.t.toFixed(1) + ' min: ' + e.s, c: e.bad ? 'crimson' : 'black' }));
    consequences().slice(0, wide ? 3 : 2).forEach(s => lines.push({ s, c: 'crimson' }));
    const maxLines = floor((sh - 6) / 16);
    lines.slice(-maxLines).forEach((l, k) => { fill(l.c); text(l.s, sx + 8, y + 4 + k * 16, sw - 16, 18); });
  }
  // infobox
  stroke(selected >= 0 ? 'navy' : 'silver'); strokeWeight(selected >= 0 ? 2 : 1); fill('white');
  rect(ix, iy, iw, ih, 8);
  noStroke(); textAlign(LEFT, TOP);
  if (selected < 0) { fill('dimgray'); textSize(14); text('Click a numbered marker to see its job, whether it is passive or active, and who is responsible.', ix + 8, iy + 5, iw - 16, ih - 8); return; }
  const f = feats[selected], pass = f.type === 'Passive';
  fill(pass ? 'steelblue' : 'darkorange'); textSize(14);
  text(f.id + '. ' + f.name + ' (' + f.type.toUpperCase() + ')', ix + 8, iy + 4, iw - 16, 18);
  fill('black');
  text('Job: ' + jobFull[f.job] + '. Team: ' + f.who + '.' + (on(f.layer) ? '' : ' Layer is switched off.'), ix + 8, iy + 22, iw - 16, 34);
  text(f.note, ix + 8, iy + 56, iw - 16, ih - 58);
}

function drawTooltip() {
  if (hover < 0) return;
  const f = feats[hover];
  textSize(14);
  const lbl = f.id + '. ' + f.name + ' (' + f.type + ', ' + jobFull[f.job] + ')';
  const w = min(canvasWidth - 20, textWidth(lbl) + 20), h = 26;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6), ty = constrain(mouseY - 38, 4, drawHeight - h - 4);
  stroke('navy'); strokeWeight(1); fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, CENTER);
  text(lbl, tx + 10, ty + h / 2);
}

function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER); textSize(defaultTextSize);
  text('Time: ' + nf(t, 1, 1) + ' min', 10, drawHeight + 92);
  const lx = canvasWidth - 160, ly = drawHeight + 22;
  stroke('white'); strokeWeight(1); fill('steelblue'); rect(lx, ly - 8, 16, 16, 3);
  fill('darkorange'); circle(lx + 86, ly, 17);
  noStroke(); fill('black'); textSize(14); textAlign(LEFT, CENTER);
  text('passive', lx + 20, ly); text('active', lx + 100, ly);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  if (hover >= 0) selected = (selected === hover) ? -1 : hover;
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
