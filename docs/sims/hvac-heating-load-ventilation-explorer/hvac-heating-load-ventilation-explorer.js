// Heating Load and Ventilation Explorer MicroSim - conduction through walls, windows, and roof plus outdoor-air ventilation load for a 600 ft2 Riverbend classroom
// CANVAS_HEIGHT: 630
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 150; // four rows of controls, two controls per row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 118; // label width in each half of the control region
let defaultTextSize = 16;

// ---- Classroom (Chapter 14); all values are illustrative ----
const FLOOR = 600;       // ft2
const WALL_AREA = 400;   // ft2, net of windows
const WIN_AREA = 160;    // ft2
const T_IN = 70;         // indoor temperature, F
const CFM_PER_PERSON = 10, CFM_PER_FT2 = 0.12; // ASHRAE 62.1-type classroom rates
const BAR_MAX = 80000;   // Btu/h at full scale of the stacked bar
const DEFAULTS = { outT: 0, wallU: 0.05, winU: 0.40, roofU: 0.05, occ: 25, hrv: 75 };

// parts[0..3] stack from the bottom (or left) of the bar
const parts = [
  { id: 'walls', name: 'Walls', tag: 'Wall', col: 'sienna', text: 'white' },
  { id: 'windows', name: 'Windows', tag: 'Win', col: 'lightskyblue', text: 'black' },
  { id: 'roof', name: 'Roof', tag: 'Roof', col: 'gray', text: 'white' },
  { id: 'vent', name: 'Ventilation', tag: 'Vent', col: 'darkorange', text: 'black' }
];

// ---- Controls ----
let tempSlider, occSlider, wallSlider, winSlider, roofSlider, hrvSlider, hrvBox, resetButton;

let spots = [];   // hover regions rebuilt every frame: { id, x, y, w, h }
let hoverId = '';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  tempSlider = createSlider(-20, 40, DEFAULTS.outT, 1);
  occSlider = createSlider(5, 40, DEFAULTS.occ, 1);
  wallSlider = createSlider(0.03, 0.30, DEFAULTS.wallU, 0.01);
  winSlider = createSlider(0.15, 0.60, DEFAULTS.winU, 0.01);
  roofSlider = createSlider(0.02, 0.10, DEFAULTS.roofU, 0.01);
  hrvSlider = createSlider(0, 85, DEFAULTS.hrv, 5);
  hrvBox = createCheckbox('Add heat recovery ventilator', false);
  hrvBox.style('font-size', '14px');
  hrvBox.changed(updateHrvEnabled);
  resetButton = createButton('Reset to Minneapolis design day');
  resetButton.style('font-size', '14px');
  resetButton.mousePressed(resetDefaults);

  positionControls();
  updateHrvEnabled();
  describe('A cutaway of a 600 square foot classroom with arrows showing heat conducted out through the walls, windows, and roof, and a large arrow for heat carried out by ventilation air. A stacked bar shows the total heating load in Btu per hour and tons, divided into walls, windows, roof, and ventilation. Sliders change the outdoor temperature, the U-factors, the number of occupants, and the heat recovery effectiveness.', LABEL);
}

// two controls per row: the left half starts at x = 10, the right half at the middle
function positionControls() {
  const half = canvasWidth / 2;
  const sw = max(60, half - sliderLeftMargin - 12);
  const row = k => drawHeight + 6 + k * 35;
  tempSlider.position(sliderLeftMargin - 8, row(0) + 2);
  occSlider.position(half + sliderLeftMargin - 8, row(0) + 2);
  wallSlider.position(sliderLeftMargin - 8, row(1) + 2);
  winSlider.position(half + sliderLeftMargin - 8, row(1) + 2);
  roofSlider.position(sliderLeftMargin - 8, row(2) + 2);
  hrvSlider.position(half + sliderLeftMargin - 8, row(2) + 2);
  hrvBox.position(10, row(3));
  const narrow = canvasWidth < 500;
  hrvBox.style('font-size', narrow ? '13px' : '14px');
  resetButton.style('font-size', narrow ? '13px' : '14px');
  resetButton.style('white-space', 'nowrap');
  resetButton.position(max(half + 4, narrow ? 212 : 218), row(3));
  [tempSlider, occSlider, wallSlider, winSlider, roofSlider, hrvSlider].forEach(s => s.size(sw));
}

function updateHrvEnabled() { hrvSlider.elt.disabled = !hrvBox.checked(); }

function resetDefaults() {
  tempSlider.value(DEFAULTS.outT);
  occSlider.value(DEFAULTS.occ);
  wallSlider.value(DEFAULTS.wallU);
  winSlider.value(DEFAULTS.winU);
  roofSlider.value(DEFAULTS.roofU);
  hrvSlider.value(DEFAULTS.hrv);
  hrvBox.checked(false);
  updateHrvEnabled();
}

// ---- Calculation: conduction Q = U x A x dT; ventilation Q = 1.08 x cfm x dT x (1 - effectiveness) ----
function calc() {
  const dT = T_IN - tempSlider.value();
  const occ = occSlider.value();
  const cfm = CFM_PER_PERSON * occ + CFM_PER_FT2 * FLOOR;
  const eps = hrvBox.checked() ? hrvSlider.value() / 100 : 0;
  const vFull = 1.08 * cfm * dT;
  const q = {
    walls: wallSlider.value() * WALL_AREA * dT,
    windows: winSlider.value() * WIN_AREA * dT,
    roof: roofSlider.value() * FLOOR * dT,
    vent: vFull * (1 - eps)
  };
  const total = q.walls + q.windows + q.roof + q.vent;
  return { dT, occ, cfm, eps, vFull, q, total, tons: total / 12000 };
}

const fmt = v => round(v).toLocaleString('en-US');

function tipLines(id, c) {
  const T = tempSlider.value();
  const dTxt = T_IN + ' - ' + T + ' = ' + c.dT + ' °F';
  if (id === 'walls') return ['Walls: U x A x ΔT', wallSlider.value().toFixed(2) + ' x ' + WALL_AREA + ' x ' + c.dT + ' = ' + fmt(c.q.walls) + ' Btu/h', 'ΔT = ' + dTxt];
  if (id === 'windows') return ['Windows: U x A x ΔT', winSlider.value().toFixed(2) + ' x ' + WIN_AREA + ' x ' + c.dT + ' = ' + fmt(c.q.windows) + ' Btu/h', 'ΔT = ' + dTxt];
  if (id === 'roof') return ['Roof: U x A x ΔT', roofSlider.value().toFixed(2) + ' x ' + FLOOR + ' x ' + c.dT + ' = ' + fmt(c.q.roof) + ' Btu/h', 'ΔT = ' + dTxt];
  const l = ['Ventilation: 1.08 x cfm x ΔT x (1 - ε)', 'cfm = 10 x ' + c.occ + ' + 0.12 x ' + FLOOR + ' = ' + round(c.cfm)];
  l.push('1.08 x ' + round(c.cfm) + ' x ' + c.dT + (c.eps > 0 ? ' x ' + (1 - c.eps).toFixed(2) : '') + ' = ' + fmt(c.q.vent) + ' Btu/h');
  if (c.eps > 0) l.push('Heat recovery saves ' + fmt(c.vFull - c.q.vent) + ' Btu/h');
  return l;
}

function draw() {
  updateCanvasSize();
  spots = [];

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
  text('Heating Load and Ventilation Explorer', canvasWidth / 2, 8);

  const c = calc();
  const wide = canvasWidth >= 640;
  const cw = wide ? floor(canvasWidth * 0.56) : canvasWidth - 12;
  const P = wide ? { x: 10, y: 44, w: cw - 10, h: 380 } : { x: 6, y: 40, w: cw, h: 236 };
  const B = wide ? { x: P.x + P.w + 10, y: 44, w: canvasWidth - P.x - P.w - 20, h: 380 } : { x: 6, y: 280, w: cw, h: 148 };
  drawCutaway(P, c);
  drawTotals(B, c, wide);
  drawStatus(c, wide);
  drawHover(c);
  drawControlLabels();
}

// ---- Arrow of a given thickness pointing along dir (0 right, 1 down, 2 left, 3 up); (x, y) is the tail ----
function arrow(x, y, len, thick, dir, col) {
  push();
  translate(x, y);
  rotate(dir * HALF_PI);
  const head = min(len * 0.6, max(14, thick * 0.9)), hw = hw0(thick);
  stroke('black');
  strokeWeight(1);
  fill(col);
  beginShape();
  vertex(0, -thick / 2); vertex(len - head, -thick / 2); vertex(len - head, -hw / 2);
  vertex(len, 0);
  vertex(len - head, hw / 2); vertex(len - head, thick / 2); vertex(0, thick / 2);
  endShape(CLOSE);
  pop();
  // hover box in screen coordinates (arrows point left, right, or up)
  if (dir === 3) return { x: x - hw / 2, y: y - len, w: hw, h: len };
  return { x: dir === 0 ? x : x - len, y: y - hw / 2, w: len, h: hw };
}

function hw0(thick) { return max(thick * 1.5, thick + 10); } // width of the arrowhead

function thickFor(q) { return constrain(3 + q / 700, 3, 40); }

function addSpot(id, r) { spots.push({ id, x: r.x, y: r.y, w: r.w, h: r.h }); }

function label2(l1, l2, x, y, al) {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(al, TOP);
  text(l1, x, y);
  text(l2, x, y + 17);
}

function drawCutaway(P, c) {
  const x0 = P.x + 0.26 * P.w, x1 = P.x + 0.70 * P.w, wt = 14;
  const roofTop = P.y + 62, slab = 14, floorY = P.y + P.h - 26;
  const wallTop = roofTop + slab, wallH = floorY - wallTop;
  const cx = (x0 + x1) / 2;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);

  // room interior, walls, window, roof slab, floor
  noStroke();
  fill('lightyellow');
  rect(x0 + wt, wallTop, x1 - x0 - 2 * wt, wallH);
  stroke('black');
  strokeWeight(1);
  fill('sienna');
  rect(x0, wallTop, wt, wallH);
  rect(x1 - wt, wallTop, wt, wallH);
  const yw0 = wallTop + 0.45 * wallH, yw1 = yw0 + 0.29 * wallH;
  fill('lightskyblue');
  rect(x0, yw0, wt, yw1 - yw0);
  fill('gray');
  rect(x0 - 6, roofTop, x1 - x0 + 12, slab);
  fill('dimgray');
  rect(x0 - 6, floorY, x1 - x0 + 12, 6);

  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text('U in Btu/h·ft²·°F; indoors ' + T_IN + ' °F', P.x + 8, P.y + P.h - 4);

  // classroom label
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, CENTER);
  text('Classroom ' + FLOOR + ' ft²\n' + c.occ + ' people, ' + T_IN + ' °F\nOutdoors ' + tempSlider.value() + ' °F', cx, wallTop + wallH * 0.5);

  // conduction arrows (thickness grows with the heat flow)
  const roofT = thickFor(c.q.roof);
  addSpot('roof', arrow(cx, roofTop, 48, roofT, 3, 'gray'));
  label2('Roof ' + FLOOR + ' ft²', fmt(c.q.roof) + ' Btu/h', cx + max(roofT, 20) / 2 + 12, roofTop - 40, LEFT);
  addSpot('roof', { x: x0 - 6, y: roofTop, w: x1 - x0 + 12, h: slab });

  const wallT = thickFor(c.q.walls), wy = wallTop + 0.2 * wallH;
  addSpot('walls', arrow(x0, wy, 46, wallT, 2, 'sienna'));
  label2('Walls ' + WALL_AREA + ' ft²', fmt(c.q.walls) + ' Btu/h', P.x + 6, wy - wallT / 2 - 40, LEFT);
  addSpot('walls', { x: x0, y: wallTop, w: wt, h: yw0 - wallTop });
  addSpot('walls', { x: x0, y: yw1, w: wt, h: floorY - yw1 });

  const winT = thickFor(c.q.windows), wiy = (yw0 + yw1) / 2;
  addSpot('windows', arrow(x0, wiy, 46, winT, 2, 'lightskyblue'));
  label2('Windows ' + WIN_AREA + ' ft²', fmt(c.q.windows) + ' Btu/h', P.x + 6, wiy + winT / 2 + 12, LEFT);
  addSpot('windows', { x: x0, y: yw0, w: wt, h: yw1 - yw0 });

  // ventilation: cold outdoor air in, heated air out
  const yIn = wallTop + 0.22 * wallH, yOut = wallTop + 0.66 * wallH, vx = x1;
  const ventT = thickFor(c.q.vent);
  const len = P.x + P.w - vx - 6;
  arrow(vx + len, yIn, len, 8, 2, 'lightsteelblue');
  addSpot('vent', arrow(vx, yOut, len, ventT, 0, 'darkorange'));
  label2('Outdoor air in', round(c.cfm) + ' cfm, ' + tempSlider.value() + ' °F', vx + 6, yIn - 52, LEFT);
  label2('Ventilation', fmt(c.q.vent) + ' Btu/h', vx + 6, yOut + max(ventT, 16) / 2 + 12, LEFT);
  if (c.eps > 0) {
    stroke('black');
    strokeWeight(1);
    fill('palegreen');
    rect(vx + 4, yIn - 10, 38, yOut - yIn + 22, 6);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('HRV\n' + round(c.eps * 100) + '%', vx + 23, (yIn + yOut) / 2);
  }
}

function drawTotals(B, c, wide) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(B.x, B.y, B.w, B.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  const order = [3, 2, 1, 0]; // legend lists the top of the stack first
  let bx, by, bw, bh, along, sz;
  if (wide) {
    text('Total heating load', B.x + 10, B.y + 6);
    textSize(20);
    fill('navy');
    text(fmt(c.total) + ' Btu/h', B.x + 10, B.y + 26);
    textSize(16);
    text('= ' + c.tons.toFixed(2) + ' tons (12,000 Btu/h each)', B.x + 10, B.y + 52);
    bx = B.x + 46; by = B.y + 84; bw = 54; bh = 282;
    along = 'v';
  } else {
    textSize(16);
    fill('navy');
    text('Total: ' + fmt(c.total) + ' Btu/h = ' + c.tons.toFixed(2) + ' tons', B.x + 10, B.y + 6);
    bx = B.x + 12; by = B.y + 30; bw = B.w - 24; bh = 24;
    along = 'h';
  }
  // axis and ticks
  fill('black');
  textSize(12);
  for (let v = 0; v <= BAR_MAX; v += 20000) {
    if (along === 'v') {
      const ty = by + bh - bh * v / BAR_MAX;
      stroke('gray'); strokeWeight(1); line(bx - 4, ty, bx, ty);
      noStroke(); fill('black'); textAlign(RIGHT, CENTER); text(v === 0 ? '0' : v / 1000 + 'k', bx - 6, ty);
    } else {
      const tx = bx + bw * v / BAR_MAX;
      stroke('gray'); strokeWeight(1); line(tx, by + bh, tx, by + bh + 4);
      noStroke(); fill('black'); textAlign(CENTER, TOP); text(v === 0 ? '0' : v / 1000 + 'k', tx, by + bh + 5);
    }
  }
  // segments
  let acc = 0;
  parts.forEach(p => {
    const v = c.q[p.id], len = (along === 'v' ? bh : bw) * v / BAR_MAX;
    const r = along === 'v' ? { x: bx, y: by + bh - acc - len, w: bw, h: len } : { x: bx + acc, y: by, w: len, h: bh };
    stroke('black');
    strokeWeight(1);
    fill(p.col);
    rect(r.x, r.y, r.w, r.h);
    if ((along === 'v' ? r.h : r.w) >= (along === 'v' ? 16 : 38)) {
      noStroke();
      fill(p.text);
      textSize(12);
      textAlign(CENTER, CENTER);
      text(p.tag, r.x + r.w / 2, r.y + r.h / 2);
    }
    addSpot(p.id, r);
    acc += len;
  });
  noFill();
  stroke('black');
  strokeWeight(1);
  rect(bx, by, bw, bh);
  // legend with the same colors and the numbers as text
  order.forEach((k, i) => {
    const p = parts[k], v = c.q[p.id];
    let lx, ly;
    if (along === 'v') { lx = bx + bw + 14; ly = by + i * 44; }
    else { lx = B.x + 12 + (i % 2) * (B.w / 2); ly = B.y + 76 + floor(i / 2) * 36; }
    stroke('black'); strokeWeight(1); fill(p.col);
    rect(lx, ly + 2, 14, 14);
    noStroke(); fill('black'); textSize(14); textAlign(LEFT, TOP);
    text(p.name, lx + 20, ly);
    text(fmt(v) + ' Btu/h (' + (c.total > 0 ? round(100 * v / c.total) : 0) + '%)', lx + 20, ly + 17);
    addSpot(p.id, { x: lx, y: ly, w: along === 'v' ? B.x + B.w - lx - 4 : B.w / 2 - 14, h: 36 });
  });
}

function drawStatus(c, wide) {
  let big = parts[0];
  parts.forEach(p => { if (c.q[p.id] > c.q[big.id]) big = p; });
  const share = round(100 * c.q[big.id] / c.total);
  let msg = big.name + (big.id === 'vent' ? ' dominates: ' : ' is the largest part: ') + share + '% of ' + fmt(c.total) + ' Btu/h.';
  if (big.id === 'vent') msg += c.eps > 0 ? ' Heat recovery already trims it.' : ' Only heat recovery cuts it.';
  else msg += ' Ventilation is ' + round(100 * c.q.vent / c.total) + '%.';
  const y = wide ? 430 : 432, h = 44;
  stroke('steelblue');
  strokeWeight(1);
  fill('white');
  rect(10, y, canvasWidth - 20, h, 8);
  noStroke();
  fill('black');
  textSize(wide ? 15 : 14);
  textAlign(LEFT, CENTER);
  text(msg, 18, y + 3, canvasWidth - 36, h - 6);
}

function drawHover(c) {
  hoverId = '';
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  for (const s of spots) {
    if (mouseX >= s.x && mouseX <= s.x + s.w && mouseY >= s.y && mouseY <= s.y + s.h) { hoverId = s.id; break; }
  }
  if (!hoverId) return;
  noFill();
  stroke('navy');
  strokeWeight(3);
  spots.filter(s => s.id === hoverId).forEach(s => rect(s.x, s.y, s.w, s.h));
  const lines = tipLines(hoverId, c);
  textSize(14);
  let w = 0;
  lines.forEach(l => { w = max(w, textWidth(l)); });
  w += 16;
  const h = lines.length * 18 + 10;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  lines.forEach((l, i) => text(l, tx + 8, ty + 6 + i * 18));
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  const half = canvasWidth / 2;
  const row = k => drawHeight + 6 + k * 35 + 11;
  text('Outdoor: ' + tempSlider.value() + ' °F', 10, row(0));
  text('People: ' + occSlider.value(), half + 10, row(0));
  text('Wall U: ' + wallSlider.value().toFixed(2), 10, row(1));
  text('Window U: ' + winSlider.value().toFixed(2), half + 10, row(1));
  text('Roof U: ' + roofSlider.value().toFixed(2), 10, row(2));
  text(hrvBox.checked() ? 'HRV: ' + hrvSlider.value() + '%' : 'HRV: off', half + 10, row(2));
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
