// Circuit Breaker and Continuous Load Explorer MicroSim - the 80 percent rule for continuous loads, and how a breaker trips on overload (thermal) and on short circuit (magnetic)
// CANVAS_HEIGHT: 620
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Data: 120 V branch circuit (Chapter 15), wattages are illustrative nameplate values ----
const VOLTS = 120;
const devices = [
  { name: 'Heater', short: 'Heater', watts: 1500, outlet: 0 },
  { name: 'Computers', short: 'Computers', watts: 300, outlet: 0 },
  { name: 'Microwave', short: 'Microwave', watts: 900, outlet: 1 },
  { name: 'Lighting', short: 'Lighting', watts: 600, outlet: 2 }
];
const AMPACITY = { '14 AWG': 15, '12 AWG': 20 }; // typical copper wire ampacity, as in the chapter
const SCALE_MAX = 30;       // amperes at full scale of the current bar
const SHORT_AMPS = 1200;    // illustrative short-circuit current (120 V across about 0.1 ohm)
const MAG_MULT = 5;         // magnetic element trips instantly at about 5 times the rating (illustrative)
const T_MIN = 0.01, T_MAX = 100000; // seconds, time-current plot range

// ---- Controls ----
let ratingSel, wireSel, resetButton, shortButton, hoursSlider;
let deviceBoxes = [];

// ---- State ----
let tripped = false;
let tripKind = '';       // 'thermal' or 'magnetic'
let heat = 0;            // 0..1 thermal element heating (animated, sped up)
let lastKey = '';        // changes whenever a control changes, to restart the heating animation

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ratingSel = createSelect();
  ratingSel.option('15 A');
  ratingSel.option('20 A');
  ratingSel.selected('15 A');
  wireSel = createSelect();
  wireSel.option('14 AWG');
  wireSel.option('12 AWG');
  wireSel.selected('14 AWG');
  resetButton = createButton('Reset breaker');
  resetButton.mousePressed(resetBreaker);
  devices.forEach((d, i) => {
    const b = createCheckbox(d.name + ' ' + d.watts.toLocaleString('en-US') + ' W', i === 1 || i === 3);
    b.style('font-size', '14px');
    deviceBoxes.push(b);
  });
  hoursSlider = createSlider(0.5, 8, 4, 0.5);
  shortButton = createButton('Create a short circuit');
  shortButton.mousePressed(() => { if (!tripped) { tripped = true; tripKind = 'magnetic'; heat = 0; } });

  positionControls();
  describe('A panelboard with one breaker feeds a branch circuit with three outlets. Four devices can be plugged in with checkboxes. A current bar shows the circuit current against the breaker rating, the 80 percent continuous limit, and the wire ampacity, and a log-log time-current curve shows how long the breaker holds at each current. Overloads heat the thermal element until the breaker trips and the lights go out; a short circuit trips it instantly through the magnetic element.', LABEL);
}

// layout: row 0 selects and reset, rows 1-2 device checkboxes, row 3 hours slider and short-circuit button
function positionControls() {
  const half = canvasWidth / 2;
  const row = k => drawHeight + 6 + k * 35;
  ratingSel.position(78, row(0) + 2);
  wireSel.position(196, row(0) + 2);
  resetButton.position(max(300, canvasWidth - 110), row(0) + 2);
  deviceBoxes.forEach((b, i) => b.position(10 + (i % 2) * half, row(1 + floor(i / 2))));
  hoursSlider.position(sliderLeftMargin - 20, row(3) + 4);
  hoursSlider.size(max(60, half - sliderLeftMargin - 10 + 20));
  shortButton.position(half + 6, row(3) + 2);
}

function resetBreaker() { tripped = false; tripKind = ''; heat = 0; }

// ---- Calculation ----
function rating() { return parseInt(ratingSel.value()); }
function ampacity() { return AMPACITY[wireSel.value()]; }
function loadAmps() { return devices.reduce((s, d, i) => s + (deviceBoxes[i].checked() ? d.watts / VOLTS : 0), 0); }
function hours() { return hoursSlider.value(); }
function isContinuous() { return hours() >= 3; }

// illustrative thermal trip time in seconds for a current that is m times the rating
function tripTime(m) {
  if (m <= 1.0) return Infinity;
  if (m >= MAG_MULT) return T_MIN * 2;
  return 120 / sq(m - 1);
}
function fmtTime(s) {
  if (s === Infinity) return 'never';
  if (s < 1) return round(s * 1000) + ' ms';
  if (s < 60) return round(s) + ' s';
  if (s < 3600) return round(s / 60) + ' min';
  return (s / 3600).toFixed(1) + ' h';
}

function calc() {
  const R = rating(), I = loadAmps(), cont = isContinuous();
  const limit = R * (cont ? 0.8 : 1);
  const m = I / R, tt = tripTime(m), run = hours() * 3600;
  let level = 'green';
  if (I > limit) level = 'red';
  else if (I >= 0.9 * limit && I > 0) level = 'gold';
  return { R, I, cont, limit, m, tt, run, level, wireBad: ampacity() < R, wireHot: I > ampacity() };
}

function draw() {
  updateCanvasSize();
  const c = calc();
  stepHeat(c);

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
  const title = 'Circuit Breaker and Continuous Load Explorer';
  if (textWidth(title) > canvasWidth - 16) textSize(max(16, 24 * (canvasWidth - 16) / textWidth(title)));
  text(title, canvasWidth / 2, 8);

  const wide = canvasWidth >= 640;
  const D = wide ? { x: 6, y: 40, w: canvasWidth - 12, h: 168 } : { x: 6, y: 38, w: canvasWidth - 12, h: 118 };
  const Lw = wide ? floor(canvasWidth * 0.42) - 6 : canvasWidth - 12;
  const L = wide ? { x: 6, y: 212, w: Lw, h: 204 } : { x: 6, y: 160, w: Lw, h: 104 };
  const Pl = wide ? { x: L.x + L.w + 6, y: 212, w: canvasWidth - 12 - L.w - 6, h: 204 } : { x: 6, y: 268, w: canvasWidth - 12, h: 144 };
  const S = wide ? { x: 6, y: 421, w: canvasWidth - 12, h: 46 } : { x: 6, y: 416, w: canvasWidth - 12, h: 52 };

  drawCircuit(D, c, wide);
  drawMeter(L, c, wide);
  drawCurve(Pl, c);
  drawStatus(S, c);
  drawControlLabels();
}

// ---- Thermal element: heats toward the fraction of its trip time that the chosen hours represent ----
function stepHeat(c) {
  const key = [ratingSel.value(), wireSel.value(), hours(), deviceBoxes.map(b => b.checked()).join()].join('|');
  if (key !== lastKey) { lastKey = key; heat = 0; }
  if (tripped) return;
  const target = c.m > 1 ? min(1, c.run / c.tt) : 0;
  const secs = constrain(1.5 + 1.5 * log(max(c.tt, 1)) / log(10), 1.5, 8); // animation seconds to reach full heat
  const dt = deltaTime / 1000 / secs;
  if (heat < target) heat = min(target, heat + dt);
  else heat = max(target, heat - dt);
  if (heat >= 1) { tripped = true; tripKind = 'thermal'; }
}

// ---- Top panel: panelboard, branch circuit, outlets, devices, lamp ----
function drawCircuit(D, c, wide) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(D.x, D.y, D.w, D.h, 8);

  const pw = wide ? 112 : 80;
  const px = D.x + 8, py = D.y + 8, ph = D.h - 16;
  // panelboard
  stroke('dimgray');
  strokeWeight(2);
  fill('lightgray');
  rect(px, py, pw, ph, 6);
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text('Panelboard', px + pw / 2, py + 3);
  // breaker body and handle
  const bx = px + 8, by = py + 22, bw = wide ? 40 : 34, bh = wide ? 62 : 46;
  stroke('black');
  strokeWeight(1);
  fill('white');
  rect(bx, by, bw, bh, 4);
  const hy = tripped ? by + bh * 0.38 : by + 4;
  fill(tripped ? 'darkorange' : 'seagreen');
  rect(bx + 6, hy, bw - 12, bh * 0.42, 3);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(tripped ? 'TRIP' : 'ON', bx + bw / 2, hy + bh * 0.21);
  textAlign(LEFT, CENTER);
  textSize(14);
  text(c.R + ' A', bx + bw + 5, by + bh * (wide ? 0.3 : 0.5));
  textSize(12);
  if (wide) text(tripped ? (tripKind === 'magnetic' ? 'magnetic' : 'thermal') : 'closed', bx + bw + 6, by + bh * 0.62);
  // thermal element heat bar
  const hbx = px + 8, hby = by + bh + 16, hbw = pw - 16;
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, BOTTOM);
  text('Heat: ' + round(heat * 100) + '%', hbx, hby - 1);
  stroke('black');
  fill('white');
  rect(hbx, hby, hbw, 10);
  noStroke();
  fill(heat > 0.66 ? 'crimson' : 'darkorange');
  rect(hbx, hby, hbw * heat, 10);
  if (tripped && tripKind === 'magnetic') {
    fill('crimson');
    textSize(12);
    textAlign(LEFT, TOP);
    text(wide ? 'MAGNETIC TRIP' : 'MAGNETIC', hbx, hby + 12);
  }

  // branch circuit wire: thicker for 12 AWG, glows when the current is above the wire's ampacity
  const wx0 = px + pw, wx1 = D.x + D.w - (wide ? 52 : 56), wy = D.y + 28;
  const live = !tripped;
  strokeWeight(wireSel.value() === '12 AWG' ? 6 : 3);
  stroke(live && c.wireHot ? 'crimson' : (live ? 'dimgray' : 'silver'));
  line(wx0, wy, wx1, wy);
  noStroke();
  fill(c.wireBad || (live && c.wireHot) ? 'crimson' : 'dimgray');
  textSize(13);
  textAlign(LEFT, BOTTOM);
  text(wireSel.value() + ' wire, ' + ampacity() + ' A ampacity' + (live && c.wireHot ? ': overheating' : (c.wireBad && wide ? ': smaller than the breaker allows' : '')), wx0 + 8, wy - 6);

  // outlets and devices
  const span = wx1 - wx0;
  const ox = k => wx0 + span * (0.18 + 0.32 * k);
  for (let k = 0; k < 3; k++) {
    stroke('black');
    strokeWeight(1);
    fill('white');
    rect(ox(k) - 12, wy - 2, 24, 18, 3);
    line(ox(k) - 4, wy + 4, ox(k) - 4, wy + 10);
    line(ox(k) + 4, wy + 4, ox(k) + 4, wy + 10);
  }
  const cardW = (span - 12) / 4 - 6;
  devices.forEach((d, i) => {
    const on = deviceBoxes[i].checked();
    const cx = wx0 + 6 + i * (cardW + 6), cy = D.y + (wide ? 62 : 56), ch = D.h - (wide ? 72 : 64);
    const amps = d.watts / VOLTS;
    if (on) { stroke(live ? 'dimgray' : 'silver'); strokeWeight(1.5); line(ox(d.outlet), wy + 16, cx + cardW / 2, cy); }
    stroke(on ? (live ? 'black' : 'silver') : 'silver');
    strokeWeight(on ? 2 : 1);
    drawingContext.setLineDash(on ? [] : [4, 4]);
    fill(on ? (live ? (i === 3 ? 'khaki' : 'lightyellow') : 'lightgray') : 'white');
    rect(cx, cy, cardW, ch, 6);
    drawingContext.setLineDash([]);
    noStroke();
    fill(on ? 'black' : 'darkgray');
    textSize(wide ? 14 : 12);
    textAlign(CENTER, TOP);
    text(d.short, cx + cardW / 2, cy + 4);
    text(d.watts.toLocaleString('en-US') + ' W', cx + cardW / 2, cy + 4 + (wide ? 17 : 15));
    text(amps.toFixed(1) + ' A', cx + cardW / 2, cy + 4 + 2 * (wide ? 17 : 15));
  });
  // ceiling lamp on this circuit
  const lx = D.x + D.w - (wide ? 26 : 32), ly = D.y + (wide ? 50 : 44);
  stroke('dimgray');
  strokeWeight(1.5);
  line(wx1, wy, lx, wy);
  line(lx, wy, lx, ly - 12);
  fill(tripped ? 'dimgray' : 'gold');
  stroke('black');
  circle(lx, ly, 22);
  if (!tripped) {
    stroke('goldenrod');
    for (let a = 0; a < 8; a++) line(lx + cos(a * QUARTER_PI) * 15, ly + sin(a * QUARTER_PI) * 15, lx + cos(a * QUARTER_PI) * 21, ly + sin(a * QUARTER_PI) * 21);
  }
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text(tripped ? 'Lights OFF' : 'Lights ON', lx, ly + 26);
  if (tripped) { // power-off shade over the load side
    fill(0, 0, 0, 60);
    rect(wx0 + 2, D.y + 2, D.w - pw - 20, D.h - 4, 6);
  }
}

// ---- Left panel: current bar with the three limits ----
function stateLabel(c) {
  if (tripped) return { t: 'TRIPPED', col: 'dimgray' };
  if (c.level === 'red') return { t: c.I > c.R ? 'OVER RATING' : 'OVER LIMIT', col: 'crimson' };
  if (c.level === 'gold') return { t: 'NEAR LIMIT', col: 'darkgoldenrod' };
  return { t: 'NORMAL', col: 'seagreen' };
}

function drawMeter(L, c, wide) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(L.x, L.y, L.w, L.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  const shown = tripped ? 0 : c.I;
  text('Current: ', L.x + 10, L.y + 6);
  textStyle(BOLD);
  textSize(wide ? 22 : 18);
  fill(tripped ? 'dimgray' : 'navy');
  text(shown.toFixed(1) + ' A', L.x + 10 + textWidth('Current: ') + (wide ? 2 : 0), L.y + (wide ? 3 : 5));
  textStyle(NORMAL);
  const st = stateLabel(c);
  fill(st.col);
  textSize(15);
  textAlign(RIGHT, TOP);
  text(st.t, L.x + L.w - 10, L.y + 8);

  const bx = L.x + 14, bw = L.w - 28, by = L.y + (wide ? 56 : 44), bh = wide ? 26 : 18;
  const X = a => bx + bw * a / SCALE_MAX;
  stroke('black');
  strokeWeight(1);
  fill(245);
  rect(bx, by, bw, bh);
  if (!tripped) {
    noStroke();
    fill(c.level);
    rect(bx, by, min(bw, X(c.I) - bx), bh);
  }
  noFill();
  stroke('black');
  rect(bx, by, bw, bh);
  // scale numbers
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  for (let a = 0; a <= SCALE_MAX; a += 10) text(a, X(a), by + bh + 2);
  // limit markers
  const marker = (a, col, dash, w) => { stroke(col); strokeWeight(w); drawingContext.setLineDash(dash); line(X(a), by - 6, X(a), by + bh + 6); drawingContext.setLineDash([]); };
  if (c.cont) {
    marker(c.R * 0.8, 'darkgoldenrod', [4, 3], 3);
    noStroke(); fill('darkgoldenrod'); textSize(13); textAlign(RIGHT, BOTTOM);
    text('80%: ' + (c.R * 0.8).toFixed(0) + ' A', X(c.R * 0.8) + 4, by - 6);
  }
  marker(c.R, 'crimson', [], 3);
  noStroke(); fill('crimson'); textSize(13); textAlign(LEFT, BOTTOM);
  text('Breaker ' + c.R + ' A', X(c.R) - 2, by - 6);
  if (ampacity() !== c.R) {
    marker(ampacity(), 'purple', [2, 3], 3);
    noStroke(); fill('purple'); textSize(13); textAlign(RIGHT, TOP);
    text('Wire ' + ampacity() + ' A', X(ampacity()) + 2, by + bh + (wide ? 14 : 13));
  }
  if (wide) {
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, TOP);
    const rule = c.cont ? 'Load runs ' + hours() + ' h (3 h or more): continuous. Limit = 80% of ' + c.R + ' A = ' + (c.R * 0.8).toFixed(0) + ' A.' : 'Load runs ' + hours() + ' h (under 3 h): not continuous. Limit = the full ' + c.R + ' A rating.';
    text(rule, L.x + 10, L.y + 116, L.w - 20, 40);
    fill('dimgray');
    text('Holds below the curve, trips above it. The heat bar runs faster than real time.', L.x + 10, L.y + 158, L.w - 20, 44);
  } else {
    noStroke();
    fill('black');
    textSize(13);
    textAlign(LEFT, TOP);
    text(c.cont ? hours() + ' h is continuous: limit 80% of ' + c.R + ' A = ' + (c.R * 0.8).toFixed(0) + ' A' : hours() + ' h is not continuous: limit ' + c.R + ' A', L.x + 10, L.y + 84, L.w - 20, 18);
  }
}

// ---- Right panel: log-log time-current curve ----
function drawCurve(P, c) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  const x0 = P.x + 46, x1 = P.x + P.w - 12, y0 = P.y + 24, y1 = P.y + P.h - 36;
  const MMAX = 100;
  const X = m => map(log(m), 0, log(MMAX), x0, x1);
  const Y = t => map(log(constrain(t, T_MIN, T_MAX)), log(T_MIN), log(T_MAX), y1, y0);

  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Time-current curve (' + c.R + ' A breaker)', P.x + P.w / 2, P.y + 4);

  // trip zone above the curve
  noStroke();
  fill(255, 160, 160, 120);
  beginShape();
  vertex(X(1.0035), y0);
  for (let i = 0; i <= 50; i++) { const m = 1.0035 * pow(MAG_MULT / 1.0035, i / 50); vertex(X(m), Y(tripTime(m * 0.9999))); }
  vertex(X(MAG_MULT), Y(T_MIN * 2));
  vertex(x1, Y(T_MIN * 2));
  vertex(x1, y0);
  endShape(CLOSE);
  // grid and ticks
  stroke(225);
  strokeWeight(1);
  [1, 2, 5, 10, 20, 50, 100].forEach(m => line(X(m), y0, X(m), y1));
  for (let e = -2; e <= 5; e++) line(x0, Y(pow(10, e)), x1, Y(pow(10, e)));
  stroke('black');
  strokeWeight(1.5);
  noFill();
  rect(x0, y0, x1 - x0, y1 - y0);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, TOP);
  [1, 2, 5, 10, 20, 50, 100].forEach(m => text(m + '×', X(m), y1 + 3));
  textAlign(RIGHT, CENTER);
  [[-2, '0.01 s'], [0, '1 s'], [2, '100 s'], [4, '10,000 s']].forEach(a => text(a[1], x0 - 4, Y(pow(10, a[0]))));
  textAlign(CENTER, TOP);
  textSize(13);
  text('Current as a multiple of ' + c.R + ' A', (x0 + x1) / 2, y1 + 16);

  // trip curve
  noFill();
  stroke('crimson');
  strokeWeight(3);
  beginShape();
  for (let i = 0; i <= 60; i++) { const m = 1.0035 * pow(MAG_MULT / 1.0035, i / 60); vertex(X(m), Y(tripTime(m * 0.9999))); }
  vertex(X(MAG_MULT), Y(T_MIN * 2));
  vertex(x1, Y(T_MIN * 2));
  endShape();
  // 3 hour line
  stroke('darkgoldenrod');
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(x0, Y(10800), x1, Y(10800));
  drawingContext.setLineDash([]);
  noStroke();
  fill('darkgoldenrod');
  textSize(12);
  textAlign(RIGHT, BOTTOM);
  text('3 h = continuous', x1 - 3, Y(10800) - 1);
  fill('crimson');
  textAlign(LEFT, TOP);
  text('Breaker trips', x0 + 4, y0 + 2);
  fill('seagreen');
  textAlign(LEFT, BOTTOM);
  if (!tripped) text(c.I > 0 && c.m < 1 ? 'Holds: load below rating' : 'Breaker holds', x0 + 5, y1 - 3);

  // operating point: the load's multiple of the rating against the planned hours of operation
  if (c.m >= 1 && !(tripped && tripKind === 'magnetic')) {
    const ox = X(c.m), oy = Y(c.run), flip = c.m > 20;
    fill(tripped || c.run >= c.tt ? 'crimson' : 'seagreen');
    stroke('black');
    strokeWeight(1);
    circle(ox, oy, 11);
    noStroke();
    fill('black');
    textSize(12);
    textAlign(flip ? RIGHT : LEFT, oy < y0 + 30 ? TOP : BOTTOM);
    text(c.m.toFixed(2) + '× for ' + hours() + ' h', ox + (flip ? -8 : 8), oy + (oy < y0 + 30 ? 4 : -4));
  }
  if (tripped && tripKind === 'magnetic') {
    const sm = SHORT_AMPS / c.R, sx = X(min(sm, MMAX)), sy = Y(T_MIN * 2);
    fill('crimson');
    stroke('black');
    strokeWeight(1);
    triangle(sx, sy - 7, sx - 7, sy + 5, sx + 7, sy + 5);
    noStroke();
    fill('crimson');
    textSize(12);
    textAlign(RIGHT, BOTTOM);
    text('Short circuit: ' + SHORT_AMPS.toLocaleString('en-US') + ' A', sx + 4, sy - 12);
  }
}

// ---- Status line ----
function drawStatus(S, c) {
  let msg, bad = false;
  if (tripped && tripKind === 'magnetic') {
    msg = 'Short circuit: the magnetic element tripped the breaker instantly and the lights went out. Press Reset breaker.';
    bad = true;
  } else if (tripped) {
    msg = 'Overload: the thermal element heated up and tripped the breaker after a delay. Remove load, then Reset breaker.';
    bad = true;
  } else if (c.I > c.R) {
    msg = 'Over the breaker rating: ' + c.I.toFixed(1) + ' A on ' + c.R + ' A. ' + (c.run < c.tt ? 'It would trip in about ' + fmtTime(c.tt) + ', after the ' + hours() + ' h run.' : 'It trips in about ' + fmtTime(c.tt) + '.');
    bad = true;
  } else if (c.cont && c.I > c.limit) {
    msg = 'Over the continuous limit. Remove load or use a larger circuit.';
    bad = true;
  } else if (c.level === 'gold') {
    msg = 'Near the limit: ' + c.I.toFixed(1) + ' A of ' + c.limit.toFixed(0) + ' A. One more load goes over.';
  } else if (c.I === 0) {
    msg = 'No devices plugged in. Check a device to add its current.';
  } else {
    msg = 'Within limits: ' + c.I.toFixed(1) + ' A is under the ' + c.limit.toFixed(0) + ' A limit.';
  }
  if (c.wireBad) { msg += ' Wire is smaller than breaker allows: this is a fire hazard.'; bad = true; }
  stroke(bad ? 'darkorange' : 'steelblue');
  strokeWeight(1);
  fill(bad ? 'floralwhite' : 'white');
  rect(S.x, S.y, S.w, S.h, 8);
  noStroke();
  fill('black');
  textSize(canvasWidth >= 640 ? 15 : 14);
  textAlign(LEFT, CENTER);
  text(msg, S.x + 8, S.y + 2, S.w - 16, S.h - 3);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  const half = canvasWidth / 2;
  const row = k => drawHeight + 6 + k * 35 + 11;
  text('Breaker:', 10, row(0));
  text('Wire:', 150, row(0));
  text('Hours: ' + hours().toFixed(1) + ' h', 10, row(3));
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
