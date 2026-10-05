// Building Pressure and Air Leakage Explorer MicroSim - stack effect, wind, and an exhaust fan acting on the gaps in a building enclosure
// CANVAS_HEIGHT: 605
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// ---- Illustrative model constants (simplified stack and wind model; not for design) ----
const T_IN_F = 70;           // indoor air temperature, F
const WIND_PA_PER_MPH2 = 0.1226; // 0.00256 psf per mph^2 expressed in pascals
const CP_WINDWARD = 0.6, CP_LEEWARD = -0.5, CP_ROOF = -0.5; // illustrative shape coefficients
const LEAK_C = 18;           // leakage coefficient per gap, CFM per Pa^0.65 (illustrative)
const LEAK_N = 0.65;         // flow exponent for cracks
const FT_PER_M = 3.2808;
// gaps: wall gaps at three fractions of the height on each wall, plus one roof gap; "top" gaps are sealed by the checkbox
const gapDefs = [];
[0.1, 0.5, 0.9].forEach(f => { gapDefs.push({ side: 'L', frac: f, top: f > 0.8 }); gapDefs.push({ side: 'R', frac: f, top: f > 0.8 }); });
gapDefs.push({ side: 'roof', frac: 1, top: true });

// ---- State ----
let windFromLeft = true;
let gaps = [];          // gaps with computed pressure and flow, and screen positions
let hoverGap = -1;

// ---- Controls ----
let tempSlider, windSlider, windDirButton, fanSlider, heightSlider, sealCheck;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  tempSlider = createSlider(-20, 70, -10, 1);
  windSlider = createSlider(0, 30, 0, 1);
  fanSlider = createSlider(0, 2000, 0, 50);
  heightSlider = createSlider(10, 60, 30, 1);
  sealCheck = createCheckbox('Seal the top gaps', false);
  windDirButton = createButton('Wind from the left');
  windDirButton.mousePressed(() => {
    windFromLeft = !windFromLeft;
    windDirButton.html(windFromLeft ? 'Wind from the left' : 'Wind from the right');
  });

  positionControls();
  describe('A side view of a building with gaps in the left wall, the right wall, and the roof, beside a vertical graph of indoor-minus-outdoor air pressure at each height. Orange means positive pressure and air leaving, blue means negative pressure and air entering, and a dashed gray line marks the neutral pressure plane. Sliders set the outdoor temperature, wind speed, exhaust fan flow, and building height, a button flips the wind direction, and a checkbox seals the top gaps.', LABEL);
}

function positionControls() {
  const y0 = drawHeight;
  const w = max(90, canvasWidth - sliderLeftMargin - 20);
  [tempSlider, windSlider, fanSlider, heightSlider].forEach((s, i) => { s.position(sliderLeftMargin, y0 + 8 + i * 35); s.size(w); });
  sealCheck.position(10, y0 + 148);
  windDirButton.position(200, y0 + 147);
}

// ---- Model: pressure at every gap, then the indoor pressure shift that balances the fan ----
function calcModel() {
  const tOut = tempSlider.value();
  const hFt = heightSlider.value();
  const wind = windSlider.value();
  const fan = fanSlider.value();
  const sealed = sealCheck.checked();
  const kIn = (T_IN_F - 32) / 1.8 + 273.15, kOut = (tOut - 32) / 1.8 + 273.15;
  const slopePerM = 3460 * (1 / kOut - 1 / kIn); // Pa per metre of height
  const slope = slopePerM / FT_PER_M;            // Pa per foot
  const q = WIND_PA_PER_MPH2 * wind * wind;
  const cpL = windFromLeft ? CP_WINDWARD : CP_LEEWARD, cpR = windFromLeft ? CP_LEEWARD : CP_WINDWARD;

  const list = gapDefs.map(g => {
    const z = g.frac * hFt;
    const cp = g.side === 'L' ? cpL : (g.side === 'R' ? cpR : CP_ROOF);
    return { side: g.side, frac: g.frac, z: z, open: !(sealed && g.top), outsideP: cp * q, stackP: slope * z };
  });
  // delta = indoor minus outdoor = px + stack(z) - outdoor wind pressure; flow out is positive
  const flow = (g, px) => { const d = px + g.stackP - g.outsideP; return LEAK_C * Math.sign(d) * Math.pow(abs(d), LEAK_N); };
  const net = px => list.reduce((s, g) => s + (g.open ? flow(g, px) : 0), 0) + fan;
  let lo = -3000, hi = 3000;
  for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (net(mid) > 0) hi = mid; else lo = mid; }
  const px = (lo + hi) / 2;
  list.forEach(g => { g.delta = px + g.stackP - g.outsideP; g.Q = g.open ? flow(g, px) : 0; });
  const meanOutside = (cpL + cpR) / 2 * q;
  const zNeutral = abs(slope) > 1e-9 ? (meanOutside - px) / slope : NaN;
  const inflow = list.reduce((s, g) => s + max(0, -g.Q), 0);
  const outflow = list.reduce((s, g) => s + max(0, g.Q), 0);
  return { tOut, hFt, wind, fan, sealed, slope, q, px, meanOutside, zNeutral, list, inflow, outflow, totalStack: slope * hFt, cpL, cpR };
}

function draw() {
  updateCanvasSize();

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
  text('Building Pressure and Air Leakage', canvasWidth / 2, 8);

  const m = calcModel();
  const wide = canvasWidth >= 620;
  const py = 44, ph = wide ? 372 : 206;
  const bpX = 10, bpW = wide ? floor(canvasWidth * 0.40) : floor(canvasWidth * 0.5) - 14;
  const gpX = bpX + bpW + 8, gpW = wide ? floor(canvasWidth * 0.28) : canvasWidth - gpX - 10;
  const ground = py + ph - 28;
  const usable = ph - 28 - 44;
  const roofY = ground - usable * map(m.hFt, 10, 60, 0.6, 1);

  drawBuildingPanel(m, bpX, py, bpW, ph, ground, roofY);
  drawGraphPanel(m, gpX, py, gpW, ph, ground, roofY);
  if (wide) drawReadout(m, gpX + gpW + 12, py, canvasWidth - (gpX + gpW + 12) - 10, 16);
  else drawReadout(m, 12, py + ph + 6, canvasWidth - 24, 15);
  drawTooltip(m);
  drawControlLabels(m);
}

function panelFrame(x, y, w, h, title) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(14);
  text(title, x + 8, y + 4);
}

function arrow(x1, y1, x2, y2, wt, col) {
  stroke(col);
  strokeWeight(wt);
  line(x1, y1, x2, y2);
  const a = atan2(y2 - y1, x2 - x1), hs = 6 + wt;
  noStroke();
  fill(col);
  triangle(x2, y2, x2 - hs * cos(a - 0.45), y2 - hs * sin(a - 0.45), x2 - hs * cos(a + 0.45), y2 - hs * sin(a + 0.45));
}

// ---- Building side view with gaps and flow arrows ----
function drawBuildingPanel(m, px, py, pw, ph, ground, roofY) {
  panelFrame(px, py, pw, ph, 'Side view (illustrative)');
  const bw = min(pw * 0.42, 150), bl = px + pw / 2 - bw / 2, br = bl + bw;
  const pxPerFt = (ground - roofY) / m.hFt;
  // ground and building
  noStroke();
  fill('tan');
  rect(px + 4, ground, pw - 8, 24, 0, 0, 6, 6);
  fill('sienna');
  textAlign(CENTER, TOP);
  textSize(14);
  text('Ground', px + pw / 2, ground + 4);
  stroke('dimgray');
  strokeWeight(2);
  fill('lightyellow');
  rect(bl, roofY, bw, ground - roofY);
  strokeWeight(1);
  stroke('silver');
  for (let ft = 10; ft < m.hFt; ft += 10) line(bl, ground - ft * pxPerFt, br, ground - ft * pxPerFt);


  // gaps: screen positions, arrows, and labels
  const sideSpace = (pw - bw) / 2 - 6;
  const maxLen = min(40, sideSpace - 4);
  gaps = m.list;
  hoverGap = -1;
  let bestD = 14;
  gaps.forEach((g, i) => {
    g.sx = g.side === 'L' ? bl : (g.side === 'R' ? br : bl + bw / 2);
    g.sy = g.side === 'roof' ? roofY : ground - g.z * pxPerFt;
    const d = dist(mouseX, mouseY, g.sx, g.sy);
    if (d < bestD) { bestD = d; hoverGap = i; }
  });
  gaps.forEach((g, i) => {
    const out = g.Q > 0;
    const col = out ? 'darkorange' : 'royalblue';
    const len = g.open ? constrain(6 + abs(g.Q) * 0.16, 8, maxLen) : 0;
    // the gap itself
    stroke(i === hoverGap ? 'navy' : 'dimgray');
    strokeWeight(i === hoverGap ? 3 : 1);
    fill(g.open ? 'white' : 'silver');
    if (g.side === 'roof') rect(g.sx - 8, g.sy - 3, 16, 6); else rect(g.sx - 3, g.sy - 8, 6, 16);
    noStroke();
    fill('black');
    textSize(14);
    if (!g.open) return;
    if (g.side === 'roof') {
      if (out) arrow(g.sx, g.sy, g.sx, g.sy - len, 3, col); else arrow(g.sx, g.sy - len, g.sx, g.sy, 3, col);
      noStroke();
      fill('black');
      textAlign(LEFT, CENTER);
      text(out ? 'OUT' : 'IN', g.sx + 8, g.sy - len / 2);
    } else {
      const dir = g.side === 'L' ? -1 : 1; // outward direction
      if (out) arrow(g.sx, g.sy, g.sx + dir * len, g.sy, 3, col); else arrow(g.sx + dir * len, g.sy, g.sx, g.sy, 3, col);
      noStroke();
      fill('black');
      textAlign(g.side === 'L' ? LEFT : RIGHT, CENTER);
      text(out ? 'OUT' : 'IN', g.sx - dir * 6, g.sy);
    }
  });

  if (m.sealed) {
    noStroke();
    fill('dimgray');
    textAlign(CENTER, TOP);
    textSize(14);
    text('Top sealed', bl + bw / 2, roofY + 8);
  }

  // exhaust fan on the right wall, pointing out
  if (m.fan > 0) {
    const fy = ground - 0.7 * m.hFt * pxPerFt;
    const len = constrain(8 + m.fan * 0.016, 8, maxLen);
    stroke('dimgray');
    strokeWeight(2);
    fill('white');
    circle(br, fy, 14);
    line(br - 5, fy - 5, br + 5, fy + 5);
    line(br - 5, fy + 5, br + 5, fy - 5);
    arrow(br + 9, fy, br + 9 + len, fy, 3, 'gray');
    noStroke();
    fill('black');
    textAlign(RIGHT, CENTER);
    textSize(14);
    text('FAN', br - 10, fy);
  }

  // wind arrows on the windward side
  if (m.wind > 0) {
    const dirR = windFromLeft ? 1 : -1;
    const x0 = windFromLeft ? px + 10 : px + pw - 10;
    for (let i = 0; i < 3; i++) arrow(x0, py + 44 + i * 9, x0 + dirR * 34, py + 44 + i * 9, 2, 'slategray');
    noStroke();
    fill('black');
    textAlign(windFromLeft ? LEFT : RIGHT, TOP);
    textSize(14);
    text('Wind ' + m.wind + ' mph', x0, py + 22);
  }

  // neutral pressure plane
  drawNeutral(m, px + 4, px + pw - 4, ground, roofY, pxPerFt, false);
}

// dashed line at the neutral plane; a label says where it is
function drawNeutral(m, x1, x2, ground, roofY, pxPerFt, label) {
  if (isNaN(m.zNeutral)) return;
  const y = ground - constrain(m.zNeutral, 0, m.hFt) * pxPerFt;
  drawingContext.setLineDash([6, 4]);
  stroke('gray');
  strokeWeight(2);
  line(x1, y, x2, y);
  drawingContext.setLineDash([]);
  if (label) {
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, BOTTOM);
    textSize(14);
    text('Neutral plane', x2, y - 2);
  }
}

// ---- Pressure graph aligned with the building: indoor minus outdoor pressure at each height ----
function drawGraphPanel(m, px, py, pw, ph, ground, roofY) {
  panelFrame(px, py, pw, ph, 'Indoor minus outdoor (Pa)');
  const x0 = px + 40, x1 = px + pw - 12, xc = (x0 + x1) / 2;
  const pxPerFt = (ground - roofY) / m.hFt;
  let maxAbs = 0;
  m.list.forEach(g => { if (g.open) maxAbs = max(maxAbs, abs(g.delta)); });
  maxAbs = max(maxAbs, abs(m.totalStack) / 2);
  const scale = [20, 40, 80, 160, 320].find(s => s >= maxAbs * 1.05) || 640;
  const xOf = v => xc + (x1 - xc) * constrain(v, -scale, scale) / scale;

  // shaded area of the wall-average pressure
  const meanDelta = z => m.px + m.slope * z - m.meanOutside;
  for (let yy = roofY; yy <= ground; yy += 2) {
    const v = meanDelta((ground - yy) / pxPerFt);
    stroke(v >= 0 ? 'orange' : 'lightskyblue');
    strokeWeight(2);
    line(xc, yy, xOf(v), yy);
  }
  // axes
  stroke('gray');
  strokeWeight(1);
  line(xc, roofY - 6, xc, ground);
  stroke('dimgray');
  line(x0, ground, x1, ground);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('0', xc, ground + 4);
  textAlign(LEFT, TOP);
  text('-' + scale, x0, ground + 4);
  textAlign(RIGHT, TOP);
  text('+' + scale, x1, ground + 4);
  textAlign(RIGHT, CENTER);
  text(m.hFt + ' ft', x0 - 6, roofY);
  text('0 ft', x0 - 6, ground);
  fill('royalblue');
  textAlign(LEFT, TOP);
  text('- air in', x0, py + 22);
  fill('darkorange');
  textAlign(RIGHT, TOP);
  text('+ air out', x1, py + 22);

  // dots for each gap
  m.list.forEach((g, i) => {
    if (!g.open) return;
    stroke(i === hoverGap ? 'navy' : 'white');
    strokeWeight(i === hoverGap ? 3 : 1.5);
    fill(g.delta >= 0 ? 'darkorange' : 'royalblue');
    circle(xOf(g.delta), g.sy, 11);
  });
  drawNeutral(m, px + 4, px + pw - 4, ground, roofY, pxPerFt, true);
}

// ---- Readout and a one-sentence explanation ----
function drawReadout(m, x, y, w, ts) {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(ts);
  const lh = ts + 5;
  const narrow = ts < 16;
  const lines = [];
  lines.push('Stack pressure: ' + nf(abs(m.totalStack), 0, 1) + ' Pa' + (narrow ? ' over ' + m.hFt + ' ft' : ''));
  if (!narrow) lines.push('Temp difference: ' + (T_IN_F - m.tOut) + '°F');
  if (m.wind > 0) lines.push('Windward wall: ' + nf(CP_WINDWARD * m.q, 0, 0) + ' Pa');
  if (isNaN(m.zNeutral)) lines.push('Neutral plane: none (no stack effect)');
  else if (m.zNeutral > m.hFt) lines.push('Neutral plane: above the roof');
  else if (m.zNeutral < 0) lines.push('Neutral plane: below the floor');
  else lines.push('Neutral plane: ' + nf(m.zNeutral, 0, 0) + ' ft (' + nf(100 * m.zNeutral / m.hFt, 0, 0) + '%)');
  if (narrow) lines.push('Air in: ' + nf(m.inflow, 0, 0) + ' CFM. Air out: ' + nf(m.outflow, 0, 0) + ' CFM' + (m.fan > 0 ? ' (+ fan)' : ''));
  else {
    lines.push('Air in: ' + nf(m.inflow, 0, 0) + ' CFM');
    lines.push('Air out: ' + nf(m.outflow, 0, 0) + ' CFM' + (m.fan > 0 ? ' + fan' : ''));
  }
  let yy = y;
  lines.forEach(s => { text(s, x, yy, w, lh); yy += lh; });

  // one-sentence explanation of the strongest effect on screen
  let msg;
  if (m.sealed) msg = 'Sealing the top gaps moves the neutral plane down toward the remaining leaks, and less air moves through the building.';
  else if (m.fan > 0) msg = 'The exhaust fan pulls the pressure curve toward negative, so more air is drawn in through every gap.';
  else if (m.wind > 0) msg = 'Wind pushes air in on the windward wall and pulls it out of the leeward wall and roof.';
  else if (abs(m.totalStack) < 0.5) msg = 'With almost no temperature difference there is almost no stack pressure.';
  else msg = 'Stack effect: warm indoor air rises and leaves at the top, and cold air is drawn in at the bottom.';
  fill('navy');
  text(msg, x, yy + 4, w, lh * 4);
}

// ---- Hover tooltip for a gap ----
function drawTooltip(m) {
  if (hoverGap < 0) return;
  const g = gaps[hoverGap];
  const where = (g.side === 'roof' ? 'Roof gap' : (g.side === 'L' ? 'Left wall gap' : 'Right wall gap')) + ' at ' + nf(g.z, 0, 0) + ' ft';
  const lines = [where];
  if (!g.open) lines.push('Sealed: no air flows here.');
  else {
    lines.push('Pressure: ' + (g.delta >= 0 ? '+' : '') + nf(g.delta, 0, 1) + ' Pa');
    lines.push(g.Q > 0 ? 'Air flows OUT: ' + nf(g.Q, 0, 0) + ' CFM' : 'Air flows IN: ' + nf(-g.Q, 0, 0) + ' CFM');
  }
  const w = 210, h = 12 + lines.length * 20;
  const tx = min(max(4, mouseX + 14), canvasWidth - w - 4);
  const ty = min(max(4, mouseY - h - 6), drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  lines.forEach((s, i) => text(s, tx + 8, ty + 6 + i * 20, w - 12, 20));
}

// ---- Control labels ----
function drawControlLabels(m) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y0 = drawHeight;
  text('Outdoor temp: ' + m.tOut + ' °F', 10, y0 + 19);
  text('Wind speed: ' + m.wind + ' mph', 10, y0 + 54);
  text('Exhaust fan: ' + nfc(m.fan) + ' CFM', 10, y0 + 89);
  text('Building height: ' + m.hFt + ' ft', 10, y0 + 124);
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
