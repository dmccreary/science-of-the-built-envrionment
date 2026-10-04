// Window Performance Explorer MicroSim - glazing, coating, gas, and frame change U-factor, SHGC, visible transmittance, and inside glass temperature
// CANVAS_HEIGHT: 530
// Bloom Level 4 (Analyze) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150; // left edge of the outdoor-temperature slider
let defaultTextSize = 16;

const T_IN = 70;       // indoor air temperature in degF, as in the chapter's worked example
const R_IN = 0.68;     // inside film resistance, h*ft2*degF/BTU (Chapter 3)
const R_OUT = 0.17;    // outside film resistance (winter wind)

// ---- Lookup tables of approximate values (the label on a real window governs) ----
// center-of-glass U-factor, BTU/(h*ft2*degF), by coating then gas
const cogU = {
  Single: { None: { Air: 1.04, Argon: 1.04 } },
  Double: { None: { Air: 0.48, Argon: 0.45 }, 'Low-E surface 2': { Air: 0.33, Argon: 0.27 }, 'Low-E surface 3': { Air: 0.32, Argon: 0.25 } },
  Triple: { None: { Air: 0.31, Argon: 0.29 }, 'Low-E surface 2': { Air: 0.21, Argon: 0.17 }, 'Low-E surface 3': { Air: 0.20, Argon: 0.16 } }
};
const shgcT = { Single: { None: 0.85 }, Double: { None: 0.60, 'Low-E surface 2': 0.28, 'Low-E surface 3': 0.50 }, Triple: { None: 0.50, 'Low-E surface 2': 0.25, 'Low-E surface 3': 0.42 } };
const vtT = { Single: { None: 0.88 }, Double: { None: 0.78, 'Low-E surface 2': 0.68, 'Low-E surface 3': 0.70 }, Triple: { None: 0.70, 'Low-E surface 2': 0.58, 'Low-E surface 3': 0.62 } };
const frames = {
  'Aluminum': { u: 2.0, col: 'silver', note: 'Aluminum conducts heat very well, so a bare frame is the weakest part of the window.' },
  'Alum. thermal break': { u: 1.0, col: 'silver', note: 'Aluminum with a plastic strip (the thermal break) that interrupts the heat path.' },
  'Vinyl': { u: 0.5, col: 'ivory', note: 'Hollow vinyl is a good insulator and the common choice in houses.' },
  'Fiberglass': { u: 0.4, col: 'khaki', note: 'Fiberglass is a good insulator and stays stable as temperature changes.' }
};
const FRAME_AREA = 0.18; // share of the window area taken by the frame (illustrative)

// ---- Controls and state ----
let glazingSel, coatingSel, gasSel, frameSel, tempSlider, rhSlider, orientRadio;
let hits = [];       // hover regions: {x, y, w, h, title, text}
let m = {};          // model results

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  glazingSel = createSelect();
  ['Single', 'Double', 'Triple'].forEach(o => glazingSel.option(o));
  glazingSel.selected('Double');
  coatingSel = createSelect();
  ['None', 'Low-E surface 2', 'Low-E surface 3'].forEach(o => coatingSel.option(o));
  coatingSel.selected('None');
  gasSel = createSelect();
  ['Air', 'Argon'].forEach(o => gasSel.option(o));
  gasSel.selected('Air');
  frameSel = createSelect();
  Object.keys(frames).forEach(o => frameSel.option(o));
  frameSel.selected('Vinyl');

  tempSlider = createSlider(-20, 50, -10, 1);
  rhSlider = createSlider(20, 60, 40, 1);

  orientRadio = createRadio();
  orientRadio.option('North');
  orientRadio.option('South');
  orientRadio.selected('North');
  orientRadio.style('width', '150px');

  positionControls();
  describe('A cross-section of a window with one, two, or three glass panes, gas gaps, optional low-E coatings, spacers, and a frame. A graph below shows the temperature from indoor air to outdoor air. Three bar gauges show the whole-window U-factor, solar heat gain coefficient, and visible transmittance. A thermometer shows the inside glass surface temperature and turns red when it is below the dew point of the room air. Selects, sliders, and a north or south choice change the window and the weather, and a summary line says whether the window suits that wall.', LABEL);
}

function selW() { return canvasWidth < 560 ? 135 : 170; }
function col2X() { return canvasWidth < 560 ? 195 : 280; }

function positionControls() {
  const r1 = drawHeight + 6, r2 = drawHeight + 41, r3 = drawHeight + 76, r4 = drawHeight + 111;
  glazingSel.position(70, r1); glazingSel.size(90);
  coatingSel.position(col2X() + 62, r1); coatingSel.size(selW());
  gasSel.position(70, r2); gasSel.size(90);
  frameSel.position(col2X() + 62, r2); frameSel.size(selW());
  tempSlider.position(sliderLeftMargin, r3 + 2); tempSlider.size(max(120, canvasWidth - sliderLeftMargin - 20));
  rhSlider.position(130, r4 + 2); rhSlider.size(max(90, canvasWidth < 560 ? 100 : 180));
  orientRadio.position(rhSlider.x + rhSlider.width + 20, r4 - 1);
}

// ---- Model ----
function gasUsed() { return glazingSel.value() === 'Single' ? 'Air' : gasSel.value(); }
function coatUsed() { return glazingSel.value() === 'Single' ? 'None' : coatingSel.value(); }

function dewPointF(tF, rh) { // Magnus formula
  const tC = (tF - 32) / 1.8;
  const g = Math.log(rh / 100) + 17.62 * tC / (243.12 + tC);
  return (243.12 * g / (17.62 - g)) * 1.8 + 32;
}

function computeModel() {
  const glz = glazingSel.value(), coat = coatUsed(), gas = gasUsed(), fr = frameSel.value();
  const tOut = tempSlider.value(), rh = rhSlider.value();
  const cog = cogU[glz][coat][gas];
  const U = (1 - FRAME_AREA) * cog + FRAME_AREA * frames[fr].u;
  const dT = T_IN - tOut;
  const nGap = glz === 'Single' ? 0 : (glz === 'Double' ? 1 : 2);
  // temperature profile: films and gaps share the temperature difference in proportion to their resistances
  const Ueff = min(U, 1 / (R_IN + R_OUT + 0.02)); // keeps the films from taking more than all of the difference
  const rGap = nGap ? max(0.02, 1 / Ueff - R_IN - R_OUT) / nGap : 0;
  const rTot = R_IN + R_OUT + rGap * nGap;
  const temps = [T_IN];                      // indoor air, then each surface from indoors outward, then outdoor air
  let t = T_IN - dT * R_IN / rTot;
  temps.push(t);                             // inside surface of the inner pane (surface 4, 6, or 2 counted from outside)
  for (let g = 0; g < nGap; g++) { temps.push(t); t -= dT * rGap / rTot; temps.push(t); }
  temps.push(t);                             // outside surface of the outer pane
  temps.push(tOut);
  m = {
    glz, coat, gas, fr, tOut, rh, U, cog, dT, nGap, temps,
    shgc: shgcT[glz][coat], vt: vtT[glz][coat],
    tSurf: temps[1], dew: dewPointF(T_IN, rh)
  };
  m.cond = m.tSurf < m.dew;
}

function recommendation() {
  const south = orientRadio.value() === 'South';
  const u = nf(m.U, 1, 2), s = nf(m.shgc, 1, 2);
  if (!south) {
    if (m.U <= 0.30) return { ok: true, t: 'Suits a NORTH wall: U-factor ' + u + ' is low, and little sun reaches north glass anyway.' };
    if (m.U <= 0.40) return { ok: null, t: 'Acceptable on a NORTH wall, but U ' + u + ' loses more heat than a low-E, argon, or triple window.' };
    return { ok: false, t: 'Poor for a NORTH wall: U ' + u + ' is high. North glass gets little sun, so heat loss decides.' };
  }
  if (m.U <= 0.35 && m.shgc >= 0.40) return { ok: true, t: 'Suits a SOUTH wall: low U (' + u + ') and high SHGC (' + s + ') let in free winter sun.' };
  if (m.U <= 0.35) return { ok: null, t: 'South wall: U ' + u + ' is good, but SHGC ' + s + ' is low. It gives away free winter sun. Low-E on surface 3 or fewer panes lets in more.' };
  if (m.shgc >= 0.40) return { ok: null, t: 'South wall: SHGC ' + s + ' admits sun, but U ' + u + ' loses too much heat at night.' };
  return { ok: false, t: 'Poor for a SOUTH wall: U ' + u + ' is high and SHGC ' + s + ' is low.' };
}

function draw() {
  updateCanvasSize();
  computeModel();
  const single = glazingSel.value() === 'Single';
  coatingSel.elt.disabled = single;
  gasSel.elt.disabled = single;
  hits = [];

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
  text('Window Performance Explorer', canvasWidth / 2, 6);

  const leftW = floor((canvasWidth - 20) * 0.56);
  const rx = 10 + leftW + 10, rw = canvasWidth - rx - 10;
  drawCrossSection(10, leftW);
  drawProfile(10, leftW);
  drawGauges(rx, rw);
  drawThermometer(rx, rw);
  drawMessages();
  drawTooltip();
  drawControlLabels();
}

// ---- Cross-section: panes, gaps, coating, spacer, frame (indoors on the left) ----
function xs(x0, w) { return { a: x0 + 30, b: x0 + w }; } // x range shared by the cross-section and the profile

function layoutPanes(x0, w) {
  const r = xs(x0, w);
  const n = m.nGap + 1, pt = constrain(w * 0.025, 9, 14), gw = n === 3 ? constrain(w * 0.07, 20, 44) : constrain(w * 0.1, 26, 60);
  const total = n * pt + m.nGap * gw;
  const start = r.a + (r.b - r.a - total) / 2;
  const panes = [];
  for (let i = 0; i < n; i++) panes.push(start + i * (pt + gw)); // left edge of each pane, indoor pane first
  return { panes, pt, gw, total, start, r };
}

function drawCrossSection(x0, w) {
  const L = layoutPanes(x0, w);
  const { panes, pt, gw, total, start, r } = L;
  const cy0 = 62, fh = 18, cy1 = 182;
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text('Indoor ' + T_IN + '°F', x0 + 2, 40);
  textAlign(RIGHT, TOP);
  text('Outdoor ' + m.tOut + '°F', x0 + w, 40);

  // frame blocks at the top and bottom of the glazing unit
  const fcol = frames[m.fr].col;
  const fx = start - 10, fw = total + 20;
  stroke('dimgray'); strokeWeight(1); fill(fcol);
  rect(fx, cy0, fw, fh); rect(fx, cy1 - fh, fw, fh);
  if (m.fr === 'Alum. thermal break') { fill('dimgray'); rect(fx + fw * 0.4, cy0, fw * 0.2, fh); rect(fx + fw * 0.4, cy1 - fh, fw * 0.2, fh); }
  hits.push({ x: fx, y: cy0, w: fw, h: fh, title: 'Frame: ' + m.fr, text: frames[m.fr].note + ' Frame U-factor about ' + nf(frames[m.fr].u, 1, 1) + '.' });
  hits.push({ x: fx, y: cy1 - fh, w: fw, h: fh, title: 'Frame: ' + m.fr, text: frames[m.fr].note + ' Frame U-factor about ' + nf(frames[m.fr].u, 1, 1) + '.' });
  noStroke(); fill('black'); textAlign(CENTER, CENTER); textSize(12);
  if (fw > 90) text(m.fr === 'Alum. thermal break' ? 'frame + break' : 'frame', fx + fw * 0.2, cy0 + fh / 2);

  // gas gaps and spacers
  for (let g = 0; g < m.nGap; g++) {
    const gx = panes[g] + pt;
    stroke('lightsteelblue'); strokeWeight(1);
    fill(m.gas === 'Argon' ? 'thistle' : 'lightcyan');
    rect(gx, cy0 + fh, gw, cy1 - cy0 - 2 * fh);
    noStroke(); fill('black'); textAlign(CENTER, CENTER); textSize(14);
    text(m.gas === 'Argon' ? 'Ar' : 'air', gx + gw / 2, (cy0 + cy1) / 2);
    stroke('dimgray'); fill('gray');
    rect(gx, cy0 + fh - 5, gw, 5); rect(gx, cy1 - fh, gw, 5);          // warm-edge spacer
    hits.push({ x: gx, y: cy0 + fh - 6, w: gw, h: 7, title: 'Spacer', text: 'Separates the panes and seals the gap. It can be a thermal bridge at the glass edge, so better units use a warm-edge spacer.' });
    hits.push({ x: gx, y: cy1 - fh - 1, w: gw, h: 7, title: 'Spacer', text: 'Separates the panes and seals the gap. It can be a thermal bridge at the glass edge, so better units use a warm-edge spacer.' });
    hits.push({ x: gx, y: cy0 + fh, w: gw, h: cy1 - cy0 - 2 * fh, title: 'Gap filled with ' + (m.gas === 'Argon' ? 'argon' : 'air'), text: m.gas === 'Argon' ? 'Argon is heavier than air, so it conducts less heat and slows convection in the gap.' : 'Air in the sealed gap. Most of the insulating value comes from the gap, not the glass.' });
  }

  // panes
  const names = m.nGap === 0 ? ['Single pane'] : (m.nGap === 1 ? ['Inner pane (room side)', 'Outer pane'] : ['Inner pane (room side)', 'Middle pane', 'Outer pane']);
  for (let i = 0; i <= m.nGap; i++) {
    stroke('steelblue'); strokeWeight(1); fill('lightskyblue');
    rect(panes[i], cy0 + fh, pt, cy1 - cy0 - 2 * fh);
    hits.push({ x: panes[i], y: cy0 + fh, w: pt, h: cy1 - cy0 - 2 * fh, title: names[i], text: 'Glass has almost no insulating value by itself. It holds the coating and the gas gap and passes visible light.' });
  }
  // low-E coating: surface 2 = room-side face of the outer pane; surface 3 = outdoor-side face of the next pane in
  if (m.coat !== 'None') {
    const outer = m.nGap;               // index of the outer pane
    const cx = (m.coat === 'Low-E surface 2') ? panes[outer] : panes[outer - 1] + pt;
    stroke('darkorange'); strokeWeight(3);
    line(cx, cy0 + fh, cx, cy1 - fh);
    noStroke(); fill('darkorange'); textAlign(CENTER, TOP); textSize(12);
    text('low-E', cx, cy1 - fh + 3);
    hits.unshift({ x: cx - 4, y: cy0 + fh, w: 8, h: cy1 - cy0 - 2 * fh, title: m.coat + ' (low-E coating)',
      text: m.coat === 'Low-E surface 2' ? 'On the room-side face of the outer pane. It reflects solar heat, which lowers SHGC. Best where cooling matters.' : 'On the gap face of the inner pane. It keeps room heat in and lets more sun through. Common choice in a heating climate.' });
  }
  if (m.glz === 'Single') {
    noStroke(); fill('dimgray'); textAlign(CENTER, TOP); textSize(12);
    text('no sealed gap: coating and gas ignored', (r.a + r.b) / 2, cy1 + 2);
  }
}

// ---- Temperature profile across the window, aligned with the cross-section ----
function drawProfile(x0, w) {
  const L = layoutPanes(x0, w);
  const gy0 = 208, gy1 = 296, tMin = -25, tMax = 75;
  const yOf = t => map(constrain(t, tMin, tMax), tMin, tMax, gy1, gy0);
  stroke('silver'); strokeWeight(1); fill('white');
  rect(x0, gy0 - 8, w, gy1 - gy0 + 16, 4);
  noStroke(); fill('dimgray'); textAlign(RIGHT, CENTER); textSize(12);
  for (let t = -20; t <= 60; t += 20) {
    stroke('gainsboro'); line(x0 + 30, yOf(t), x0 + w, yOf(t));
    noStroke(); text(t, x0 + 26, yOf(t));
  }
  noStroke(); textAlign(LEFT, TOP); text('°F', x0 + 3, gy0 - 6);
  // dew point and freezing lines
  stroke('steelblue'); strokeWeight(1); drawingContext.setLineDash([5, 4]);
  line(x0 + 30, yOf(m.dew), x0 + w, yOf(m.dew));
  stroke('gray'); line(x0 + 30, yOf(32), x0 + w, yOf(32));
  drawingContext.setLineDash([]);
  noStroke(); fill('steelblue'); textAlign(RIGHT, BOTTOM); textSize(12);
  text('dew point ' + nf(m.dew, 1, 0) + '°F', x0 + w - 3, yOf(m.dew) - 1);

  const { panes, pt, r } = L;
  const n = m.nGap + 1;
  // temps hold: air, inside surface, [gap start, gap end]..., outside surface, air. Pane faces share a temperature.
  const pts = [];
  pts.push([r.a, m.temps[0]]);
  pts.push([panes[0], m.temps[1]]);
  let ti = 2;
  for (let g = 0; g < m.nGap; g++) { pts.push([panes[g] + pt, m.temps[ti]]); pts.push([panes[g + 1], m.temps[ti + 1]]); ti += 2; }
  pts.push([panes[n - 1] + pt, m.temps[m.temps.length - 2]]);
  pts.push([r.b, m.temps[m.temps.length - 1]]);
  stroke('darkorange'); strokeWeight(3); noFill();
  beginShape(); pts.forEach(p => vertex(p[0], yOf(p[1]))); endShape();
  // pane interiors are flat (glass conducts well): draw them as heavier segments
  stroke('navy'); strokeWeight(5);
  for (let i = 0; i < n; i++) { const t = (i === 0) ? m.temps[1] : m.temps[2 * i + 1]; line(panes[i], yOf(t), panes[i] + pt, yOf(t)); }
  // inside-surface marker
  noStroke(); fill(m.cond ? 'crimson' : 'navy');
  circle(panes[0], yOf(m.tSurf), 10);
  fill('black'); textAlign(RIGHT, CENTER); textSize(14);
  const ly = constrain(yOf(m.tSurf) + 14, gy0 + 6, gy1 - 4);
  text(nf(m.tSurf, 1, 1) + '°F', panes[0] - 8, ly);
}

// ---- Gauges: U-factor, SHGC, visible transmittance ----
function drawGauge(x, y, w, label, units, val, vmax, col, good) {
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text(label + ' ' + nf(val, 1, 2), x, y);
  fill('dimgray'); textSize(12); textAlign(RIGHT, TOP);
  text(units, x + w, y + 2);
  stroke('gray'); strokeWeight(1); fill('white');
  rect(x, y + 20, w, 14, 4);
  noStroke(); fill(col);
  rect(x + 1, y + 21, max(2, (w - 2) * constrain(val / vmax, 0, 1)), 12, 3);
  if (good !== null) { stroke('black'); strokeWeight(2); const gx = x + w * good / vmax; line(gx, y + 17, gx, y + 37); }
}

function drawGauges(x, w) {
  drawGauge(x, 40, w, 'U-factor', 'BTU/h·ft²·°F', m.U, 1.4, 'steelblue', 0.30);
  drawGauge(x, 84, w, 'SHGC', '0 to 1', m.shgc, 1.0, 'darkorange', 0.40);
  drawGauge(x, 128, w, 'Visible trans.', '0 to 1', m.vt, 1.0, 'goldenrod', null);
  noStroke(); fill('dimgray'); textAlign(LEFT, TOP); textSize(12);
  text('Ticks: U 0.30 or less is good; SHGC 0.40 or more admits sun.', x, 172, w, 32);
  hits.push({ x: x, y: 40, w: w, h: 40, title: 'U-factor (whole window)', text: 'Heat flow per ft² per degree. Lower is better. Includes glass, spacer, and frame.' });
  hits.push({ x: x, y: 84, w: w, h: 40, title: 'Solar heat gain coefficient', text: 'The fraction of the sun\'s energy that passes through as heat. High helps in winter; low helps in summer.' });
  hits.push({ x: x, y: 128, w: w, h: 40, title: 'Visible transmittance', text: 'The fraction of visible light that passes through. Coatings lower it a little.' });
}

// ---- Thermometer: inside glass surface temperature ----
function drawThermometer(x, w) {
  const ty0 = 212, ty1 = 296, tx = x + 12, tw = 16;
  const tMin = -10, tMax = 80;
  const yOf = t => map(constrain(t, tMin, tMax), tMin, tMax, ty1, ty0);
  stroke('dimgray'); strokeWeight(2); fill('white');
  rect(tx, ty0, tw, ty1 - ty0, 8);
  noStroke(); fill(m.cond ? 'crimson' : 'steelblue');
  rect(tx + 2, yOf(m.tSurf), tw - 4, ty1 - yOf(m.tSurf) - 2, 6);
  stroke('black'); strokeWeight(2);
  line(tx - 5, yOf(m.dew), tx + tw + 5, yOf(m.dew));
  noStroke(); fill('black'); textAlign(LEFT, CENTER); textSize(14);
  text('Inside glass', tx + tw + 12, ty0 + 8);
  textSize(18); fill(m.cond ? 'crimson' : 'navy');
  text(nf(m.tSurf, 1, 1) + '°F', tx + tw + 12, ty0 + 28);
  textSize(14); fill('black');
  text('Dew point', tx + tw + 12, ty0 + 52);
  text(nf(m.dew, 1, 1) + '°F', tx + tw + 12, ty0 + 70);
  hits.push({ x: tx - 6, y: ty0, w: tw + 12, h: ty1 - ty0, title: 'Inside glass surface', text: 'Inside surface = ' + T_IN + '°F minus U × ΔT × 0.68. The black tick marks the dew point of the room air. The glass edge is colder than the center.' });
}

// ---- Message panel ----
function drawMessages() {
  const x = 10, y = 304, w = canvasWidth - 20, h = 72;
  stroke(m.cond ? 'crimson' : 'silver'); strokeWeight(m.cond ? 2 : 1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke(); textAlign(LEFT, TOP); textSize(16);
  fill(m.cond ? 'crimson' : 'seagreen');
  const gap = abs(m.tSurf - m.dew);
  text(m.cond ? 'CONDENSATION: glass ' + nf(gap, 1, 1) + '°F below dew point'
              : 'No condensation: glass ' + nf(gap, 1, 1) + '°F above dew point', x + 8, y + 4, w - 16, 24);
  const rec = recommendation();
  fill(rec.ok === true ? 'seagreen' : (rec.ok === false ? 'crimson' : 'darkorange'));
  textSize(14);
  text(rec.t, x + 8, y + 28, w - 16, h - 30);
}

// ---- Hover tooltip: topmost matching region ----
function drawTooltip() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  let hit = null;
  for (const h of hits) if (mouseX >= h.x && mouseX <= h.x + h.w && mouseY >= h.y && mouseY <= h.y + h.h) { hit = h; break; }
  if (!hit) return;
  const w = min(canvasWidth - 20, 300), hgt = 92;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 4, drawHeight - hgt - 4);
  stroke('navy'); strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, hgt, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  textSize(16); text(hit.title, tx + 8, ty + 5, w - 16, 22);
  textSize(14); text(hit.text, tx + 8, ty + 27, w - 16, hgt - 30);
}

function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER); textSize(defaultTextSize);
  const r1 = drawHeight + 6, r2 = drawHeight + 41, r3 = drawHeight + 76, r4 = drawHeight + 111;
  text('Glazing:', 10, r1 + 11);
  text('Coating:', col2X(), r1 + 11);
  text('Gas:', 10, r2 + 11);
  text('Frame:', col2X(), r2 + 11);
  text('Outdoor: ' + tempSlider.value() + ' °F', 10, r3 + 11);
  text('Indoor RH: ' + rhSlider.value() + '%', 10, r4 + 11);
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
