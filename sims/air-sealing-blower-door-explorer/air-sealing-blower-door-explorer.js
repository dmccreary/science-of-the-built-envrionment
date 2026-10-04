// Air Sealing and Blower Door Explorer MicroSim - seal leak locations in the Riverbend cutaway and read CFM50, ACH50, natural leakage, and heat loss
// CANVAS_HEIGHT: 680
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 560;
let controlHeight = 120; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// ---- Data: ten leakage points (illustrative CFM50 at 50 Pa) plus diffuse leakage through the field of the walls and roof ----
// fx, fy place the point on the cutaway (fractions of the drawing); ox, oy point from the building outward.
const leaks = [
  { name: 'Top plate', cfm: 1900, fx: 0.08, fy: 0.45, ox: -1, oy: -0.25, fix: 'Seal the top plate and the ceiling air barrier with sealant or foam before the drywall goes up.' },
  { name: 'Rim joist', cfm: 1700, fx: 0.92, fy: 0.81, ox: 1, oy: 0.2, fix: 'Spray closed-cell foam, or seal rigid foam with sealant, across the rim joist.' },
  { name: 'Window gaps', cfm: 1400, fx: 0.92, fy: 0.52, ox: 1, oy: -0.3, fix: 'Backer rod and sealant inside, with low-expansion foam in the gap around the frame.' },
  { name: 'Door perimeter', cfm: 1100, fx: 0.92, fy: 0.72, ox: 1, oy: 0.3, fix: 'Continuous weatherstripping, an adjusted strike, and a sweep at the bottom.' },
  { name: 'Penetrations', cfm: 1200, fx: 0.08, fy: 0.55, ox: -1, oy: 0, fix: 'Seal pipes, wires, and ducts with fire-rated sealant or foam collars.' },
  { name: 'Recessed lights', cfm: 900, fx: 0.28, fy: 0.45, ox: 0, oy: -1, fix: 'Use sealed, airtight-rated housings and gasket them to the ceiling.' },
  { name: 'Electrical boxes', cfm: 600, fx: 0.92, fy: 0.62, ox: 1, oy: 0, fix: 'Airtight boxes or gaskets, with sealant around the box.' },
  { name: 'Attic hatch', cfm: 500, fx: 0.48, fy: 0.45, ox: 0, oy: -1, fix: 'Weatherstrip the hatch and add a latch that compresses the gasket.' },
  { name: 'Exhaust fan', cfm: 500, fx: 0.68, fy: 0.45, ox: 0, oy: -1, fix: 'Fit a damper that closes tightly and seal the housing to the ceiling.' },
  { name: 'Bottom plate', cfm: 400, fx: 0.08, fy: 0.81, ox: -1, oy: 0.2, fix: 'Sill-seal gasket under the plate and caulk the plate to the slab.' }
];
const DIFFUSE = 600;      // cfm50 through the field of the assemblies; not one of the numbered points
const RESIDUAL = 0.10;    // a sealed point still leaks 10 percent
const GOAL = 3.0;         // ACH50 goal (Chapter 12)
const DESIGN_DT = 80;     // 70 F inside, -10 F outside
const DEFAULT_VOL = 108000;
const TEST_MS = 2600;

// ---- State ----
let sealed = leaks.map(() => false);
let actionCount = 0;
let goalActions = null;
let hoverPt = -1;
let test = { active: false, t0: 0 };
let cfmShown = 0, pressShown = -50, fanAngle = 0, flowPhase = 0;
let B, I, panelR, bld; // layout rectangles
let wide = true;

// ---- Controls ----
let runButton, sealAllButton, resetButton, divSel, volSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  runButton = createButton('Run blower door test');
  runButton.mousePressed(runTest);
  sealAllButton = createButton('Seal all');
  sealAllButton.mousePressed(sealAll);
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);
  divSel = createSelect();
  divSel.option('15');
  divSel.option('20');
  divSel.selected('20');
  volSlider = createSlider(50000, 200000, DEFAULT_VOL, 1000);

  positionControls();
  cfmShown = totalCfm();
  describe('A side cutaway of the Riverbend building with a blower door fan in the left entry and ten numbered leakage points shown as arrows whose size shows how much air flows through each. Clicking a point seals it. Gauges show the building pressure of minus 50 pascals and CFM50, and a readout shows ACH50 against a goal of 3.0, the natural air changes per hour, and the heat loss from leakage on the design day.', LABEL);
}

function positionControls() {
  runButton.position(10, drawHeight + 6);
  sealAllButton.position(165, drawHeight + 6);
  resetButton.position(245, drawHeight + 6);
  divSel.position(sliderLeftMargin, drawHeight + 41);
  volSlider.position(sliderLeftMargin, drawHeight + 76);
  volSlider.size(max(100, canvasWidth - sliderLeftMargin - 25));
}

// ---- Calculation ----
function totalCfm() {
  return DIFFUSE + leaks.reduce((a, L, i) => a + L.cfm * (sealed[i] ? RESIDUAL : 1), 0);
}
function pointCfm(i) { return leaks[i].cfm * (sealed[i] ? RESIDUAL : 1); }
function divisor() { return +divSel.value(); }
function vol() { return volSlider.value(); }
function calc(cfm) {
  const ach50 = cfm * 60 / vol();
  const natCfm = cfm / divisor();
  return { cfm, ach50, achNat: ach50 / divisor(), natCfm, heat: 1.08 * natCfm * DESIGN_DT };
}
// fewest points to seal, largest first, to reach the goal at the current volume
function fewestToGoal() {
  const target = GOAL * vol() / 60;
  let cfm = DIFFUSE + leaks.reduce((a, L) => a + L.cfm, 0), n = 0;
  for (const L of [...leaks].sort((a, b) => b.cfm - a.cfm)) {
    if (cfm <= target) break;
    cfm -= L.cfm * (1 - RESIDUAL);
    n++;
  }
  return cfm <= target ? n : null;
}

// ---- Actions ----
function toggleSeal(i) {
  sealed[i] = !sealed[i];
  if (sealed[i]) actionCount++;
  checkGoal();
}
function sealAll() {
  leaks.forEach((L, i) => { if (!sealed[i]) { sealed[i] = true; actionCount++; } });
  checkGoal();
}
function resetAll() {
  sealed = leaks.map(() => false);
  actionCount = 0;
  goalActions = null;
  divSel.selected('20');
  volSlider.value(DEFAULT_VOL);
  test.active = false;
  cfmShown = totalCfm();
  pressShown = -50;
}
function runTest() { test = { active: true, t0: millis() }; }
function checkGoal() {
  const met = calc(totalCfm()).ach50 <= GOAL;
  if (met && goalActions === null) goalActions = actionCount;
  if (!met) goalActions = null;
}

function draw() {
  updateCanvasSize();
  checkGoal();
  updateGauges();

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
  text('Air Sealing and Blower Door Explorer', canvasWidth / 2, 8);

  layoutPanels();
  hoverPt = findHover();
  cursor(hoverPt >= 0 ? 'pointer' : 'default');
  drawBuilding();
  drawInstruments();
  drawTooltip();
  drawControlLabels();
}

// gauges ease toward the live values; the test run ramps the fan up from zero
function updateGauges() {
  const target = totalCfm();
  if (test.active) {
    const p = (millis() - test.t0) / TEST_MS;
    if (p >= 1.4) { test.active = false; pressShown = -50; cfmShown = target; }
    else {
      pressShown = -50 * easeOut(constrain(p / 0.6, 0, 1));
      cfmShown = target * easeOut(constrain((p - 0.25) / 0.75, 0, 1));
      fanAngle += 0.45 * (pressShown / -50);
      flowPhase = (flowPhase + 0.02) % 1;
    }
  } else if (abs(cfmShown - target) > 1) cfmShown += (target - cfmShown) * 0.2;
  else cfmShown = target;
}
function easeOut(t) { return 1 - (1 - t) * (1 - t); }

// ---- Layout ----
function layoutPanels() {
  wide = canvasWidth >= 640;
  if (wide) {
    const bw = floor(canvasWidth * 0.58);
    B = { x: 10, y: 42, w: bw - 10, h: drawHeight - 50 };
    panelR = { x: bw + 10, y: 42, w: canvasWidth - bw - 20, h: drawHeight - 50 };
  } else {
    B = { x: 6, y: 40, w: canvasWidth - 12, h: 242 };
    panelR = { x: 6, y: 286, w: canvasWidth - 12, h: drawHeight - 292 };
  }
  I = { x: B.x + 34, y: B.y + 26, w: B.w - 68, h: B.h - 40 };
  bld = {
    wl: I.x + 0.08 * I.w, wr: I.x + 0.92 * I.w, floorY: I.y + 0.80 * I.h, ceilY: I.y + 0.45 * I.h,
    ridgeY: I.y + 0.06 * I.h, eaveY: I.y + 0.38 * I.h, midX: I.x + 0.50 * I.w
  };
}
function P(fx, fy) { return [I.x + fx * I.w, I.y + fy * I.h]; }

// where the arrow for point i starts (outside) and ends (at the leak)
function arrowOf(i) {
  const L = leaks[i], [hx, hy] = P(L.fx, L.fy);
  const share = pointCfm(i) / totalCfm();
  const len = (wide ? 16 : 12) + 120 * share * (wide ? 1 : 0.8);
  const d = sqrt(L.ox * L.ox + L.oy * L.oy);
  return { hx, hy, tx: hx + L.ox / d * len, ty: hy + L.oy / d * len, share, wt: 2 + 32 * share };
}

function findHover() {
  if (mouseY < B.y || mouseY > B.y + B.h || mouseX < B.x || mouseX > B.x + B.w) return -1;
  let best = -1, bd = 14;
  for (let i = 0; i < leaks.length; i++) {
    const a = arrowOf(i);
    const d = min(dist(mouseX, mouseY, a.tx, a.ty), distToSeg(mouseX, mouseY, a.tx, a.ty, a.hx, a.hy));
    if (d < bd) { bd = d; best = i; }
  }
  return best;
}
function distToSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, t = constrain(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1);
  return dist(px, py, ax + t * dx, ay + t * dy);
}

// ---- Building cutaway ----
function drawBuilding() {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(B.x, B.y, B.w, B.h, 8);
  // ground, foundation, and slab
  noStroke();
  fill('tan');
  rect(B.x + 1, bld.floorY + 0.02 * I.h, B.w - 2, B.y + B.h - bld.floorY - 0.02 * I.h - 1);
  fill('gray');
  rect(bld.wl - 8, bld.floorY, bld.wr - bld.wl + 16, 0.04 * I.h);
  // room and attic
  stroke('dimgray');
  strokeWeight(2);
  fill('floralwhite');
  rect(bld.wl, bld.ceilY, bld.wr - bld.wl, bld.floorY - bld.ceilY);
  fill('ghostwhite');
  triangle(bld.wl - 6, bld.eaveY + 6, bld.midX, bld.ridgeY, bld.wr + 6, bld.eaveY + 6);
  line(bld.wl - 6, bld.ceilY, bld.wr + 6, bld.ceilY);
  // window, door, box, pipe, hatch, light, exhaust (drawn on the walls and ceiling)
  const w = P(0.92, 0.52);
  stroke('dimgray'); strokeWeight(1);
  fill('lightskyblue'); rect(bld.wr - 4, w[1] - 0.06 * I.h, 8, 0.12 * I.h);
  const d = P(0.92, 0.72);
  fill('burlywood'); rect(bld.wr - 4, d[1] - 0.07 * I.h, 8, 0.15 * I.h);
  const e = P(0.92, 0.62);
  fill('gray'); rect(bld.wr - 7, e[1] - 4, 7, 8);
  const pp = P(0.08, 0.55);
  fill('dimgray'); rect(bld.wl - 4, pp[1] - 3, 14, 6);
  const h = P(0.48, 0.45);
  fill('peru'); rect(h[0] - 14, bld.ceilY - 3, 28, 6);
  const rl = P(0.28, 0.45);
  fill('gray'); rect(rl[0] - 7, bld.ceilY, 14, 6, 2);
  const ex = P(0.68, 0.45);
  fill('gray'); rect(ex[0] - 8, bld.ceilY - 4, 16, 8, 2);
  stroke('gray'); strokeWeight(3);
  line(ex[0], bld.ceilY - 4, ex[0], bld.ridgeY + (bld.eaveY - bld.ridgeY) * 0.55);
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Riverbend cutaway (illustrative)', B.x + B.w / 2, B.y + 4);
  textSize(14);
  textAlign(CENTER, CENTER);
  fill('dimgray');
  text('attic', I.x + 0.38 * I.w, bld.ceilY - 0.2 * I.h);
  text('conditioned space', bld.midX, (bld.ceilY + bld.floorY) / 2 - 20);
  drawFan();
  leaks.forEach((L, i) => drawLeak(i));
  drawLegend();
}

// the blower door: a fan mounted in the left entry, blowing air out
function drawFan() {
  const [fx, fy] = P(0.08, 0.69);
  const r = max(14, 0.085 * I.h);
  stroke('dimgray');
  strokeWeight(2);
  fill('lightgray');
  rect(fx - 9, fy - r - 8, 18, 2 * r + 16, 3);
  fill('white');
  circle(fx, fy, 2 * r);
  stroke('steelblue');
  strokeWeight(4);
  for (let k = 0; k < 3; k++) {
    const a = fanAngle + k * TWO_PI / 3;
    line(fx, fy, fx + r * 0.85 * cos(a), fy + r * 0.85 * sin(a));
  }
  noStroke();
  fill('steelblue');
  circle(fx, fy, 6);
  // outward arrow and label
  stroke('steelblue');
  strokeWeight(5);
  line(fx - 12, fy, fx - 26, fy);
  noStroke();
  fill('steelblue');
  triangle(fx - 32, fy, fx - 22, fy - 6, fx - 22, fy + 6);
  noStroke();
  fill('steelblue');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Blower door fan:', fx + r + 6, fy - 9);
  text('air out at 50 Pa', fx + r + 6, fy + 9);
}

// one leakage point: an arrow pointing in from outside, sized by its share of the leakage, with a numbered tag
function drawLeak(i) {
  const a = arrowOf(i), s = sealed[i];
  const col = s ? 'seagreen' : 'darkorange';
  stroke(col);
  strokeWeight(a.wt);
  line(a.tx, a.ty, a.hx - (a.hx - a.tx) * 0.12, a.hy - (a.hy - a.ty) * 0.12);
  // arrowhead
  const ang = atan2(a.hy - a.ty, a.hx - a.tx), hs = 7 + a.wt * 0.7;
  noStroke();
  fill(col);
  triangle(a.hx, a.hy, a.hx - hs * cos(ang - 0.5), a.hy - hs * sin(ang - 0.5), a.hx - hs * cos(ang + 0.5), a.hy - hs * sin(ang + 0.5));
  // moving dots while the test runs
  if (test.active) {
    fill('white');
    for (let k = 0; k < 3; k++) {
      const u = (flowPhase + k / 3) % 1;
      circle(lerp(a.tx, a.hx, u), lerp(a.ty, a.hy, u), 4);
    }
  }
  if (s) { // seal patch at the leak
    stroke('seagreen');
    strokeWeight(3);
    noFill();
    circle(a.hx, a.hy, 14);
  }
  // numbered tag at the tail
  stroke(i === hoverPt ? 'navy' : 'dimgray');
  strokeWeight(i === hoverPt ? 3 : 1);
  fill(s ? 'mediumseagreen' : 'khaki');
  circle(a.tx, a.ty, 20);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  textSize(14);
  text(i + 1, a.tx, a.ty + 1);
}

function drawLegend() {
  const x = B.x + 8, y = B.y + B.h - 20;
  noStroke();
  textSize(14);
  textAlign(LEFT, CENTER);
  fill('darkorange'); rect(x, y - 6, 14, 12, 2);
  fill('black'); text('leaking', x + 18, y);
  fill('seagreen'); rect(x + 84, y - 6, 14, 12, 2);
  fill('black'); text('sealed (10% left)', x + 102, y);
}

// ---- Instruments: pressure dial, CFM50 dial, ACH50 reading, formulas, goal bar, message ----
function drawInstruments() {
  const r = panelR;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  const c = calc(cfmShown), goalMet = c.ach50 <= GOAL;
  const col = goalMet ? 'seagreen' : 'crimson';
  const cw = (r.w - 16) / 3, dr = min(cw / 2 - 6, wide ? 54 : 44);
  const top = r.y + 8;
  // pressure dial: 0 to -60 Pa
  drawDial(r.x + 8 + cw * 0.5, top + 14 + dr, dr, abs(pressShown) / 60, 'Pressure', nf(pressShown, 0, 0) + ' Pa', 'steelblue');
  // CFM50 dial: 0 to 12,000
  drawDial(r.x + 8 + cw * 1.5, top + 14 + dr, dr, c.cfm / 12000, 'CFM50', nfc(round(c.cfm)), 'steelblue');
  // ACH50 reading
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('ACH50', r.x + 8 + cw * 2.5, top);
  fill(col);
  textSize(wide ? 30 : 32);
  textAlign(CENTER, CENTER);
  text(nf(c.ach50, 0, 1), r.x + 8 + cw * 2.5, top + 14 + dr * 0.55);
  textSize(14);
  textAlign(CENTER, TOP);
  text(goalMet ? 'GOAL MET' : 'ABOVE GOAL', r.x + 8 + cw * 2.5, top + 14 + dr * 0.55 + 22);

  let y = top + 14 + dr + 24;
  const x = r.x + 10, w = r.w - 20;
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  const lines = [
    'ACH50 = CFM50 × 60 ÷ volume',
    '= ' + nfc(round(c.cfm)) + ' × 60 ÷ ' + nfc(vol()) + ' = ' + nf(c.ach50, 0, 1),
    'Natural ≈ ACH50 ÷ ' + divisor() + ' = ' + nf(c.achNat, 0, 2) + ' ACH (' + nfc(round(c.natCfm)) + ' cfm)',
    'Heat loss at ΔT ' + DESIGN_DT + '°F: 1.08 × ' + nfc(round(c.natCfm)) + ' × ' + DESIGN_DT + ' = ' + nfc(round(c.heat)) + ' BTU/h'
  ];
  lines.forEach(s => { y = para(s, x, y, w, 17) + 3; });
  // goal bar: 0 to 14 ACH50 with the 3.0 goal marked
  y += 4;
  const gx = x, gw = w, gy = y + 4, gh = 16, maxA = 14;
  const xa = v => gx + gw * constrain(v / maxA, 0, 1);
  stroke('gray');
  strokeWeight(1);
  fill('whitesmoke');
  rect(gx, gy, gw, gh, 3);
  noStroke();
  fill(col);
  rect(gx, gy, xa(c.ach50) - gx, gh, 3);
  stroke('black');
  strokeWeight(3);
  line(xa(GOAL), gy - 5, xa(GOAL), gy + gh + 5);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('0', gx, gy + gh + 4);
  textAlign(CENTER, TOP);
  text('goal 3.0', constrain(xa(GOAL) + 14, gx + 30, gx + gw - 30), gy + gh + 4);
  textAlign(RIGHT, TOP);
  text('14+ ACH50', gx + gw, gy + gh + 4);
  y = gy + gh + 28;
  // message
  const n = sealed.filter(Boolean).length;
  let msg, mcol = 'black';
  if (goalMet && goalActions !== null) {
    const m = fewestToGoal();
    msg = 'Goal reached after ' + goalActions + ' sealing action' + (goalActions === 1 ? '' : 's') + (m !== null ? '. The fewest possible at this volume is ' + m + ', sealing the largest leaks first.' : '.');
    mcol = 'seagreen';
  } else if (goalMet) {
    msg = 'Already at or below 3.0 ACH50 at this volume.';
    mcol = 'seagreen';
  } else {
    let big = -1;
    leaks.forEach((L, i) => { if (!sealed[i] && (big < 0 || L.cfm > leaks[big].cfm)) big = i; });
    msg = 'Click a point to seal it. ' + n + ' of 10 sealed. ' + (big >= 0 ? 'Largest leak left: ' + (big + 1) + ' ' + leaks[big].name + ' (' + nfc(leaks[big].cfm) + ' cfm, ' + nf(100 * pointCfm(big) / totalCfm(), 0, 0) + '% of the total).' : 'Only diffuse leakage remains.');
  }
  fill(mcol);
  textAlign(LEFT, TOP);
  para(msg, x, y, w, 17);
}

// draw wrapped text word by word and return the y below the last line
function para(str, x, y, w, lh) {
  const words = str.split(' ');
  let line1 = '', yy = y;
  words.forEach(wd => {
    const t = line1 ? line1 + ' ' + wd : wd;
    if (textWidth(t) > w && line1) { text(line1, x, yy); yy += lh; line1 = wd; } else line1 = t;
  });
  if (line1) { text(line1, x, yy); yy += lh; }
  return yy;
}

// half-circle dial; frac is the needle position from 0 to 1
function drawDial(cx, cy, r, frac, label, valText, col) {
  noFill();
  stroke('lightgray');
  strokeWeight(8);
  arc(cx, cy, 2 * r, 2 * r, PI, TWO_PI);
  stroke(col);
  arc(cx, cy, 2 * r, 2 * r, PI, PI + PI * constrain(frac, 0, 1));
  const a = PI + PI * constrain(frac, 0, 1);
  stroke('black');
  strokeWeight(3);
  line(cx, cy, cx + (r - 6) * cos(a), cy + (r - 6) * sin(a));
  noStroke();
  fill('black');
  circle(cx, cy, 8);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text(label, cx, cy - r - 6);
  textAlign(CENTER, TOP);
  textSize(16);
  text(valText, cx, cy + 6);
}

// ---- Tooltip for a leak point ----
function drawTooltip() {
  if (hoverPt < 0) return;
  const L = leaks[hoverPt];
  const share = 100 * pointCfm(hoverPt) / totalCfm();
  const w = min(canvasWidth - 16, 270);
  const body = L.fix;
  textSize(14);
  const fixLines = ceil(textWidth(body) / (w - 16)) + 1;
  const h = 62 + fixLines * 17;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 6, drawHeight - h - 6);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text((hoverPt + 1) + '. ' + L.name + (sealed[hoverPt] ? ' (sealed)' : ''), tx + 8, ty + 6);
  text(nfc(round(pointCfm(hoverPt))) + ' cfm50, ' + nf(share, 0, 1) + '% of total leakage', tx + 8, ty + 24);
  fill('navy');
  text(sealed[hoverPt] ? 'Click to unseal.' : 'Click to seal. Typical fix:', tx + 8, ty + 42);
  fill('black');
  if (!sealed[hoverPt]) para(body, tx + 8, ty + 59, w - 16, 17);
}

// ---- Control labels ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Natural ACH = ACH50 ÷', 10, drawHeight + 53);
  text('Volume: ' + nfc(vol()) + ' ft³', 10, drawHeight + 88);
}

function mousePressed() {
  if (mouseY > drawHeight || mouseY < 0) return;
  const i = findHover();
  if (i >= 0) toggleSeal(i);
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
