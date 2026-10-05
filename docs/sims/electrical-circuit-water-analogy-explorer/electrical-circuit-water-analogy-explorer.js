// Electric Circuit and Water Analogy Explorer MicroSim - an electrical loop beside its water-pipe twin, in series or parallel, with a switch/valve and a removable lamp
// CANVAS_HEIGHT: 565
// Bloom Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 115; // three rows of controls, two controls per row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

const LAMP_OHMS = 12;     // illustrative lamp resistance
const LAMP_RATED_W = 12;  // power at which a lamp is drawn fully bright

// ---- Part data: the electrical part, its water twin, and what each one means ----
const parts = {
  source: { elec: 'Battery (source)', water: 'Pump', role: 'Provides the push.',
    meaning: 'Source voltage: the push per unit of charge, in volts. The current that results depends on the loop.',
    limit: 'A pump can run dry and pressure varies along a pipe. A battery\'s push comes from chemistry and sags as it runs down.' },
  wire: { elec: 'Wire (conductor)', water: 'Pipe', role: 'Carries the flow.',
    meaning: 'Conductors carry current around the loop with very little loss. Charge returns to the source and is never used up.',
    limit: 'A pipe can leak or burst; insulation keeps charge in a wire. Pipes have friction, wires a small resistance.' },
  switch: { elec: 'Switch', water: 'Valve', role: 'Open switch = closed valve.',
    meaning: 'A deliberate break in the loop. Open: no complete path, so the current is zero everywhere.',
    limit: 'A valve can be partly open; a switch is fully on or off. The words flip: an open switch stops flow.' },
  lamp1: { elec: 'Lamp 1 (load)', water: 'Water wheel 1', role: 'Turns the flow into useful work.',
    meaning: 'A load. Charge passes through it and gives up energy as light; its brightness follows its power, P = V × I.',
    limit: 'Wheels are turned by moving mass. Charge is not consumed in a lamp, only its energy is delivered.' },
  lamp2: { elec: 'Lamp 2 (load)', water: 'Water wheel 2', role: 'A second load on the same source.',
    meaning: 'In series it shares the voltage and the current. In parallel it gets the full source voltage on its own path.',
    limit: 'Remove a wheel and water spills from the open pipe; remove a lamp and the gap just stops the flow.' }
};

// ---- Controls ----
let switchButton, wiringButton, voltSlider, flowButton, removeBox, waterBox;

// ---- State ----
let switchClosed = true;
let series = true;
let flowOn = false;          // dots and wheels move only after Start flow
let selId = '';
let hoverId = '';
let phases = {};             // dot phase (px) for each segment key
let wheelAngle = [0, 0, 0];  // pump, wheel 1, wheel 2
let hitZones = [];           // { id, x, y, w, h } for both halves, rebuilt each frame

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  switchButton = createButton('Switch: closed');
  switchButton.mousePressed(() => { switchClosed = !switchClosed; switchButton.html(switchClosed ? 'Switch: closed' : 'Switch: open'); });
  wiringButton = createButton('Lamps: series');
  wiringButton.mousePressed(() => { series = !series; wiringButton.html(series ? 'Lamps: series' : 'Lamps: parallel'); });
  voltSlider = createSlider(0, 24, 12, 1);
  flowButton = createButton('Start flow');
  flowButton.mousePressed(() => { flowOn = !flowOn; flowButton.html(flowOn ? 'Pause flow' : 'Start flow'); });
  removeBox = createCheckbox('Remove lamp 2', false);
  waterBox = createCheckbox('Show water analogy', true);
  removeBox.style('font-size', '14px');
  waterBox.style('font-size', '14px');

  positionControls();
  describe('A split canvas. The left half shows an electrical circuit with a battery, a switch, and two lamps, and the right half shows the matching water circuit with a pump, a valve, and two water wheels. Dots move around both loops at a speed proportional to the current. Controls open or close the switch, wire the lamps in series or parallel, change the source voltage, and remove lamp 2. In series one break stops every load; in parallel each load has its own path.', LABEL);
}

// two controls per row: the left half starts at x = 10, the right half at the middle
function positionControls() {
  const half = canvasWidth / 2;
  const row = k => drawHeight + 6 + k * 35;
  switchButton.position(10, row(0) + 2);
  wiringButton.position(half + 6, row(0) + 2);
  voltSlider.position(sliderLeftMargin - 10, row(1) + 4);
  voltSlider.size(max(60, half - sliderLeftMargin - 4));
  flowButton.position(half + 6, row(1) + 2);
  removeBox.position(10, row(2));
  waterBox.position(half + 6, row(2));
}

// ---- Circuit model: two 12 ohm lamps on a source of V volts ----
function circuit() {
  const V = voltSlider.value(), on = switchClosed, has2 = !removeBox.checked();
  let I1 = 0, I2 = 0, V1 = 0, V2 = 0;
  if (series) {
    if (on && has2 && V > 0) { I1 = I2 = V / (2 * LAMP_OHMS); V1 = V2 = I1 * LAMP_OHMS; }
  } else if (on) {
    I1 = V / LAMP_OHMS; V1 = V;
    if (has2) { I2 = I1; V2 = V; }
  }
  return { V, on, has2, I1, I2, V1, V2, Itot: series ? I1 : I1 + I2, p1: I1 * V1, p2: I2 * V2 };
}

function draw() {
  updateCanvasSize();
  const dt = deltaTime / 1000;
  const m = circuit();
  hitZones = [];

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
  text('Electric Circuit and Water Analogy', canvasWidth / 2, 8);

  const showW = waterBox.checked();
  const PH = 190;
  const Pe = showW ? { x: 6, y: 42, w: floor(canvasWidth / 2) - 9, h: PH } : { x: 6, y: 42, w: canvasWidth - 12, h: PH };
  const Pw = { x: floor(canvasWidth / 2) + 3, y: 42, w: canvasWidth - floor(canvasWidth / 2) - 9, h: PH };

  if (flowOn) advance(m, dt);
  findHover(Pe, showW ? Pw : null, m);
  drawHalf(Pe, m, false);
  if (showW) drawHalf(Pw, m, true);
  drawReadout(m);
  drawStatus(m);
  drawInfobox(m);
  drawTooltip();
  drawControlLabels(m);
}

// ---- Geometry shared by both halves ----
function geom(P) {
  const L = P.x + (P.w < 260 ? 28 : 0.12 * P.w), R = P.x + P.w - (P.w < 260 ? 16 : 0.1 * P.w);
  const W = R - L, ty = P.y + 56, by = P.y + P.h - 46, ym = (ty + by) / 2;
  const nar = P.w < 260;
  const xs = L + (nar ? 0.30 : 0.24) * W, x1 = L + (nar ? 0.60 : 0.55) * W, x2 = L + (nar ? 0.89 : 0.86) * W;
  const lamp1 = series ? { x: x1, y: ty } : { x: x1, y: ym };
  const lamp2 = series ? { x: x2, y: ty } : { x: x2, y: ym };
  const q = 22; // half height of the source symbol
  let segs;
  if (series) {
    segs = [{ k: 'a', pts: [[L, ym - q], [L, ty], [R, ty], [R, by], [L, by], [L, ym + q]] }];
  } else {
    segs = [
      { k: 'a', pts: [[L, ym - q], [L, ty], [x1, ty]] },
      { k: 'b', pts: [[x1, ty], [x2, ty]] },
      { k: 'c', pts: [[x1, ty], [x1, by]] },
      { k: 'd', pts: [[x2, ty], [x2, by]] },
      { k: 'e', pts: [[x2, by], [x1, by]] },
      { k: 'f', pts: [[x1, by], [L, by], [L, ym + q]] }
    ];
  }
  return { L, R, W, ty, by, ym, xs, x1, x2, lamp1, lamp2, q, segs };
}

function segCurrent(k, m) {
  if (series) return m.I1;
  return { a: m.Itot, b: m.I2, c: m.I1, d: m.I2, e: m.I2, f: m.Itot }[k];
}
function segLen(pts) { let s = 0; for (let i = 0; i < pts.length - 1; i++) s += dist(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]); return s; }
function pointOn(pts, d) {
  for (let i = 0; i < pts.length - 1; i++) {
    const L = dist(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
    if (d <= L) return [lerp(pts[i][0], pts[i + 1][0], d / L), lerp(pts[i][1], pts[i + 1][1], d / L), atan2(pts[i + 1][1] - pts[i][1], pts[i + 1][0] - pts[i][0])];
    d -= L;
  }
  const n = pts.length;
  return [pts[n - 1][0], pts[n - 1][1], 0];
}

// advance dot phases and wheel angles in proportion to the current
function advance(m, dt) {
  ['a', 'b', 'c', 'd', 'e', 'f'].forEach(k => { phases[k] = ((phases[k] || 0) + 55 * segCurrent(k, m) * dt) % 18; });
  wheelAngle[0] += 2.0 * m.Itot * dt;
  wheelAngle[1] += 3.0 * m.I1 * dt;
  wheelAngle[2] += 3.0 * m.I2 * dt;
}

// ---- Hover: parts of both halves are linked by id ----
function findHover(Pe, Pw, m) {
  hoverId = '';
  [Pe, Pw].forEach(P => {
    if (!P) return;
    const g = geom(P);
    const zones = [
      ['source', g.L, g.ym, 24, 26], ['switch', g.xs, g.ty, 28, 18],
      ['lamp1', g.lamp1.x, g.lamp1.y, 20, 20], ['lamp2', g.lamp2.x, g.lamp2.y, 20, 20]
    ];
    zones.forEach(z => hitZones.push({ id: z[0], x: z[1] - z[3], y: z[2] - z[4], w: 2 * z[3], h: 2 * z[4] }));
    if (mouseX >= P.x && mouseX <= P.x + P.w && mouseY >= P.y && mouseY <= P.y + P.h) {
      for (const z of hitZones.slice(-4)) if (mouseX >= z.x && mouseX <= z.x + z.w && mouseY >= z.y && mouseY <= z.y + z.h) hoverId = z.id;
      if (!hoverId) {
        g.segs.forEach(s => {
          for (let i = 0; i < s.pts.length - 1; i++) {
            if (distToSeg(mouseX, mouseY, s.pts[i], s.pts[i + 1]) < 8) hoverId = 'wire';
          }
        });
      }
    }
  });
}
function distToSeg(px, py, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = constrain(((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1), 0, 1);
  return dist(px, py, a[0] + t * dx, a[1] + t * dy);
}

// ---- Drawing one half: the electrical loop (water = false) or its water twin (water = true) ----
function drawHalf(P, m, water) {
  const g = geom(P);
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, TOP);
  text(water ? 'Water circuit' : 'Electric circuit', P.x + P.w / 2, P.y + 5);

  // wires or pipes
  drawConductors(g, water, m);
  // twin highlight
  if (hoverId === 'wire' || selId === 'wire') {
    noFill();
    stroke(255, 215, 0, 170);
    strokeWeight(water ? 18 : 12);
    g.segs.forEach(s => { beginShape(); s.pts.forEach(p => vertex(p[0], p[1])); endShape(); });
  }
  drawArrowsAndDots(g, water, m);
  drawSource(g, water, m);
  drawSwitch(g, water, m);
  drawLoad(g, 1, water, m);
  drawLoad(g, 2, water, m);
  // outline for the hovered or selected twin part
  [hoverId, selId].forEach((id, i) => {
    if (!id || id === 'wire') return;
    const z = zoneOf(g, id);
    noFill();
    stroke(i === 0 ? 'gold' : 'dodgerblue');
    strokeWeight(i === 0 ? 4 : 3);
    rect(z.x - 3, z.y - 3, z.w + 6, z.h + 6, 8);
  });

  // captions in text
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  const cx = P.x + P.w / 2;
  if (water) { text('Pressure ↔ ' + m.V + ' V', cx, P.y + P.h - 40); text('Flow ↔ ' + m.Itot.toFixed(2) + ' A', cx, P.y + P.h - 22); }
  else { text('Source: ' + m.V + ' V', cx, P.y + P.h - 40); text('Current: ' + m.Itot.toFixed(2) + ' A', cx, P.y + P.h - 22); }
}

function zoneOf(g, id) {
  const c = { source: [g.L, g.ym, 24, 26], switch: [g.xs, g.ty, 28, 18], lamp1: [g.lamp1.x, g.lamp1.y, 20, 20], lamp2: [g.lamp2.x, g.lamp2.y, 20, 20] }[id];
  return { x: c[0] - c[2], y: c[1] - c[3], w: 2 * c[2], h: 2 * c[3] };
}

function drawConductors(g, water, m) {
  noFill();
  strokeJoin(ROUND);
  g.segs.forEach(s => {
    if (water) {
      stroke('steelblue'); strokeWeight(12);
      beginShape(); s.pts.forEach(p => vertex(p[0], p[1])); endShape();
      stroke('lightsteelblue'); strokeWeight(8);
      beginShape(); s.pts.forEach(p => vertex(p[0], p[1])); endShape();
    } else {
      stroke('dimgray'); strokeWeight(3);
      beginShape(); s.pts.forEach(p => vertex(p[0], p[1])); endShape();
    }
  });
  // a removed lamp 2 leaves a gap in the wire (and open pipe ends with caps)
  if (removeBox.checked()) {
    const c = g.lamp2;
    noStroke();
    fill('white');
    if (series) rect(c.x - 16, c.y - 10, 32, 20); else rect(c.x - 10, c.y - 16, 20, 32);
    stroke(water ? 'steelblue' : 'dimgray');
    strokeWeight(water ? 5 : 3);
    if (series) { line(c.x - 16, c.y - 8, c.x - 16, c.y + 8); line(c.x + 16, c.y - 8, c.x + 16, c.y + 8); }
    else { line(c.x - 8, c.y - 16, c.x + 8, c.y - 16); line(c.x - 8, c.y + 16, c.x + 8, c.y + 16); }
  }
  // wire gap for an open switch
  if (!water && !switchClosed) { noStroke(); fill('white'); rect(g.xs - 15, g.ty - 6, 30, 12); }
}

function drawArrowsAndDots(g, water, m) {
  g.segs.forEach(s => {
    const len = segLen(s.pts);
    // direction arrowheads, always shown so the flow direction is readable without color
    if (len > 40) {
      const q = pointOn(s.pts, len * 0.5);
      push();
      translate(q[0], q[1]);
      rotate(q[2]);
      noStroke();
      fill(water ? 'navy' : 'black');
      triangle(7, 0, -5, -6, -5, 6);
      pop();
    }
    const cur = segCurrent(s.k, m);
    if (cur <= 0.0001) return;
    const ph = phases[s.k] || 0;
    for (let d = ph; d < len; d += 18) {
      const q = pointOn(s.pts, d);
      if (water) { noStroke(); fill('dodgerblue'); circle(q[0], q[1], 7); }
      else { stroke('darkgoldenrod'); strokeWeight(1); fill('gold'); circle(q[0], q[1], 7); }
    }
  });
}

function drawSource(g, water, m) {
  const x = g.L, y = g.ym;
  noStroke();
  fill('white');
  rect(x - 22, y - 22, 44, 44, 6);
  stroke('black');
  strokeWeight(1);
  if (water) {
    fill('lightgray');
    circle(x, y, 38);
    push();
    translate(x, y);
    rotate(wheelAngle[0]);
    strokeWeight(3);
    for (let i = 0; i < 3; i++) { line(0, 0, 14 * cos(i * TWO_PI / 3), 14 * sin(i * TWO_PI / 3)); }
    pop();
  } else {
    strokeWeight(3);
    line(x - 14, y - 8, x + 14, y - 8);       // long plate: positive terminal
    strokeWeight(6);
    line(x - 8, y + 6, x + 8, y + 6);         // short plate: negative terminal
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text('+', x + 17, y - 10);
    text('−', x + 17, y + 6);
  }
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  if (g.W > 120) text(water ? 'Pump' : 'Battery', x, y + 24);
}

function drawSwitch(g, water, m) {
  const x = g.xs, y = g.ty;
  if (water) {
    noStroke();
    fill('white');
    circle(x, y, 22);
    stroke('black');
    strokeWeight(1);
    fill('lightsteelblue');
    circle(x, y, 22);
    stroke('crimson');
    strokeWeight(switchClosed ? 4 : 3);
    // valve gate: across the pipe when closed (switch open), along the pipe when open (switch closed)
    if (!switchClosed) line(x, y - 10, x, y + 10); else line(x - 9, y, x + 9, y);
  } else {
    stroke('black');
    strokeWeight(1);
    fill('white');
    circle(x - 14, y, 7);
    circle(x + 14, y, 7);
    stroke('black');
    strokeWeight(3);
    if (switchClosed) line(x - 14, y, x + 14, y); else line(x - 14, y, x + 8, y - 14);
  }
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  const state = water ? (switchClosed ? 'open' : 'closed') : (switchClosed ? 'closed' : 'open');
  text(g.W > 220 ? (water ? 'Valve ' : 'Switch ') + state : state, x, y + 14);
}

function drawLoad(g, n, water, m) {
  const c = n === 1 ? g.lamp1 : g.lamp2;
  const removed = n === 2 && removeBox.checked();
  const pw = n === 1 ? m.p1 : m.p2, cur = n === 1 ? m.I1 : m.I2;
  const b = constrain(pw / LAMP_RATED_W, 0, 1);
  const lab = series ? c.y + 17 : c.y - 32; // parallel lamps sit between the rails, so their labels go above
  if (removed) {
    noFill();
    stroke('darkgray');
    strokeWeight(1.5);
    drawingContext.setLineDash([4, 3]);
    circle(c.x, c.y, 26);
    drawingContext.setLineDash([]);
    noStroke();
    fill('dimgray');
    textSize(13);
    textAlign(CENTER, TOP);
    text('removed', c.x, lab);
    return;
  }
  if (water) {
    stroke('black');
    strokeWeight(1);
    fill(cur > 0.0001 ? 'lightskyblue' : 'lightgray');
    circle(c.x, c.y, 30);
    push();
    translate(c.x, c.y);
    rotate(wheelAngle[n]);
    stroke('navy');
    strokeWeight(2.5);
    for (let i = 0; i < 6; i++) line(0, 0, 13 * cos(i * PI / 3), 13 * sin(i * PI / 3));
    pop();
    noStroke();
    fill('white');
    circle(c.x, c.y, 15);
    fill('black');
    textSize(12);
    textAlign(CENTER, CENTER);
    text(n, c.x, c.y);
  } else {
    if (b > 0.02) { noStroke(); fill(255, 230, 0, 40 + 120 * b); circle(c.x, c.y, 26 + 22 * b); }
    stroke('black');
    strokeWeight(1);
    fill(b > 0.02 ? lerpColor(color('lightyellow'), color('yellow'), b) : color('lightgray'));
    circle(c.x, c.y, 26);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    text(n, c.x, c.y);
  }
  noStroke();
  fill('black');
  textSize(13);
  textAlign(CENTER, TOP);
  text(water ? cur.toFixed(2) : pw.toFixed(1) + ' W', c.x, lab);
}

// ---- Readout, status, infobox ----
function drawReadout(m) {
  let t;
  const V = m.V;
  if (series) {
    if (m.on && m.has2 && V > 0) t = 'Series: R = 12 + 12 = 24 Ω, I = V ÷ R = ' + V + ' ÷ 24 = ' + m.I1.toFixed(2) + ' A. Each lamp has ' + m.V1.toFixed(1) + ' V and ' + m.p1.toFixed(1) + ' W.';
    else t = 'Series: the loop is not complete (or V = 0), so I = 0 A and no lamp has voltage.';
  } else if (m.on) {
    t = 'Parallel: each lamp has the full ' + V + ' V, so I = ' + V + ' ÷ 12 = ' + m.I1.toFixed(2) + ' A per lamp' + (m.has2 ? ', ' + m.Itot.toFixed(2) + ' A in total.' : ' (lamp 1 only).');
  } else t = 'Parallel with the switch open: no path from the source, so I = 0 A.';
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text(t + ' 12 Ω lamps (illustrative).', 10, 237, canvasWidth - 20, 46);
}

function statusText(m) {
  if (!m.on) return 'Switch open: the loop is broken, so nothing flows. In the water circuit the valve is closed.';
  if (m.V === 0) return 'Source voltage is 0 V: no push, so no flow.';
  if (series && !m.has2) return 'Series: one break stops every load.';
  if (!series && !m.has2) return 'Parallel: each load has its own path.';
  return series ? 'Series: one path, so the same current passes through both lamps and they share the voltage.' : 'Parallel: each lamp has its own path and gets the full source voltage.';
}

function drawStatus(m) {
  const txt = statusText(m);
  const bad = !m.on || m.V === 0 || m.I1 === 0;
  stroke(bad ? 'darkorange' : 'steelblue');
  strokeWeight(1);
  fill(bad ? 'floralwhite' : 'white');
  rect(6, 284, canvasWidth - 12, 46, 8);
  noStroke();
  fill('black');
  textSize(canvasWidth >= 640 ? 15 : 13);
  textAlign(LEFT, CENTER);
  text(txt, 14, 286, canvasWidth - 28, 42);
}

function drawInfobox(m) {
  const y = 334, h = 112;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(6, y, canvasWidth - 12, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  if (selId && parts[selId]) {
    const p = parts[selId];
    fill('navy');
    textSize(15);
    text(waterBox.checked() ? p.elec + '  ↔  ' + p.water + ': ' + p.role : p.elec + ': ' + p.role, 14, y + 4, canvasWidth - 28, 20);
    fill('black');
    textSize(canvasWidth >= 640 ? 14 : 13);
    text('Meaning: ' + p.meaning, 14, y + 26, canvasWidth - 28, 40);
    fill('dimgray');
    text('Limit: ' + p.limit, 14, y + 68, canvasWidth - 28, 40);
  } else {
    fill('navy');
    textSize(15);
    text('Click any part for its meaning and the limit of the analogy', 14, y + 4, canvasWidth - 28, 20);
    fill('black');
    textSize(14);
    text('Hover over a part to highlight its twin in the other half. Press Start flow to set the dots moving: their speed follows the current.', 14, y + 28, canvasWidth - 28, 80);
  }
}

function drawTooltip() {
  if (!hoverId || !parts[hoverId]) return;
  const p = parts[hoverId];
  const lines = [waterBox.checked() ? p.elec + ' ↔ ' + p.water : p.elec, p.role];
  textSize(14);
  const w = max(textWidth(lines[0]), textWidth(lines[1])) + 16, h = 46;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, 232 - h);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(lines[0], tx + 8, ty + 5);
  text(lines[1], tx + 8, ty + 25);
}

function drawControlLabels(m) {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Source: ' + voltSlider.value() + ' V', 10, drawHeight + 6 + 35 + 13);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  if (mouseY > 236) return; // clicks below the panels keep the current selection
  selId = hoverId;
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
