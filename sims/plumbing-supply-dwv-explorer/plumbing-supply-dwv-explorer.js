// Plumbing Supply and DWV Explorer MicroSim - pressurized supply piping versus gravity drain-waste-vent piping in a two-story building section
// CANVAS_HEIGHT: 585
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 115; // three rows of controls, two controls per row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Geometry is stored in a 500 x 380 "virtual" drawing space and scaled to fit ----
const VW = 500, VH = 380;
const P = (u, v) => [u * VW, v * VH];

// Frequently reused trap and path points
const TRAP_T = [P(.435, .38), P(.435, .40), P(.45, .414), P(.465, .40), P(.465, .395)]; // toilet trap
const TRAP_L = [P(.565, .28), P(.565, .305), P(.58, .32), P(.595, .305), P(.595, .335)]; // lavatory trap
const WASTE_PATH = TRAP_T.concat([P(.68, .43), P(.68, .70), P(.74, .707), P(.97, .88)]);
const REFILL_PATH = [P(0, .86), P(.16, .86), P(.16, .54), P(.115, .54), P(.115, .295), P(.545, .295)];
const VENT_PATH = [P(.68, .04), P(.68, .19), P(.50, .19), P(.50, .401)];

// ---- Components: layer controls visibility; parts are polylines (pts) or rectangles (rect) ----
// kind: P = under pressure, G = gravity-driven, A = open to the air
const comps = {
  service: { name: 'Service line', layer: 'supply', kind: 'P', cls: 'cold', parts: [{ pts: [P(0, .86), P(.16, .86), P(.16, .575)] }],
    fn: 'Brings potable water from the public main into the building. It is buried below the frost depth so the water cannot freeze.',
    code: 'Bury below the local frost depth. Backflow preventers keep building water out of the main.' },
  meter: { name: 'Meter and main shutoff', layer: 'supply', kind: 'P', parts: [{ rect: [.145, .575, .175, .615] }],
    fn: 'Measures the water used and holds the main shutoff valve that isolates the whole building.',
    code: 'Codes commonly limit static pressure to about 80 psi and require a pressure-reducing valve above that.' },
  heater: { name: 'Water heater', layer: 'supply', kind: 'P', parts: [{ rect: [.26, .50, .34, .62] }],
    fn: 'Raises supply water to about 120 °F. A storage heater keeps a tank hot, and the hot water leaves through its own thin pipe.',
    code: 'Delivery near 120 °F limits scalding. Stored water needs care to limit Legionella.' },
  cold: { name: 'Cold supply pipe', layer: 'supply', kind: 'P', cls: 'cold', parts: [
    { pts: [P(.16, .575), P(.16, .54), P(.26, .54)] },
    { pts: [P(.16, .54), P(.115, .54), P(.115, .295)], ext: true },
    { pts: [P(.115, .295), P(.14, .295)], ext: true },
    { pts: [P(.14, .295), P(.545, .295), P(.545, .28)] }],
    fn: 'A small sealed pipe full of pressurized water. Pressure lets it run up, down, or sideways to reach every fixture.',
    code: 'Keep pipes on the warm side of the insulation. This riser in the exterior wall is the freeze-test target.' },
  hot: { name: 'Hot supply pipe', layer: 'supply', kind: 'P', cls: 'hot', parts: [
    { pts: [P(.30, .50), P(.30, .465), P(.14, .465)] },
    { pts: [P(.14, .465), P(.13, .465), P(.13, .31)], ext: true },
    { pts: [P(.13, .31), P(.605, .31), P(.605, .28)] }],
    fn: 'Carries water from the heater to the fixtures. Like the cold pipe it is thin, sealed, and under pressure.',
    code: 'Insulate hot pipes to save energy, and keep them off the cold side of exterior walls.' },
  toilet: { name: 'Toilet', layer: 'fixture', kind: 'P', parts: [{ rect: [.375, .27, .47, .38] }],
    fn: 'Cold water refills the tank under pressure. A flush sends the waste down through the built-in trap and by gravity into the drain.',
    code: 'Federal standards limit common toilets to about 1.6 gallons per flush.' },
  lav: { name: 'Lavatory (sink)', layer: 'fixture', kind: 'P', parts: [{ rect: [.535, .235, .615, .28] }],
    fn: 'Hot and cold supply stubs enter under pressure. Used water leaves by gravity through a trap, a drain, and a vent.',
    code: 'Every fixture needs a trap, a drain, and a vent.' },
  trap: { name: 'Trap', layer: 'dwv', kind: 'G', cls: 'drain', parts: [{ pts: TRAP_T }, { pts: TRAP_L }],
    fn: 'A curved pipe that always holds some water. This water seal blocks sewer gas from entering the room.',
    code: 'Each fixture needs a trap, and a vent protects its water seal from being sucked out.' },
  branch: { name: 'Branch drain', layer: 'dwv', kind: 'G', cls: 'drain', parts: [{ pts: [P(.595, .335), P(.68, .34)] }, { pts: [P(.465, .395), P(.68, .43)] }],
    fn: 'Carries waste sideways from a fixture to the stack. It is only partly full and must run downhill the whole way.',
    code: 'Horizontal drains slope about one-quarter inch per foot.' },
  stack: { name: 'Vertical stack', layer: 'dwv', kind: 'G', cls: 'drain', parts: [{ pts: [P(.68, .31), P(.68, .70)] }],
    fn: 'The vertical drain that gathers the branch drains and drops the waste to the building drain by gravity.',
    code: 'Above the highest fixture it continues upward as the vent, so it stays open to the air.' },
  drain: { name: 'Building drain', layer: 'dwv', kind: 'G', cls: 'drain', parts: [{ pts: [P(.68, .70), P(.74, .707)] }],
    fn: 'The lowest horizontal drain, usually under the floor. It gathers the stacks and leads to the building sewer.',
    code: 'Slopes about one-quarter inch per foot, which is why a drain often controls the layout of a floor.' },
  cleanout: { name: 'Cleanout', layer: 'dwv', kind: 'G', cls: 'drain', parts: [{ pts: [P(.71, .7055), P(.71, .63)] }],
    fn: 'A capped access point that lets a plumber rod out a clogged pipe.',
    code: 'Placed where a clog can be reached, such as near the stack base. Confirm in the adopted code.' },
  sewer: { name: 'Building sewer', layer: 'dwv', kind: 'G', cls: 'drain', parts: [{ pts: [P(.74, .707), P(.97, .88)] }],
    fn: 'Carries all the building\'s waste outside to the municipal sewer. It is gravity-driven and slopes downhill.',
    code: 'Slopes about one-quarter inch per foot. The drawing exaggerates the slope.' },
  vent: { name: 'Vent pipe', layer: 'vent', kind: 'A', cls: 'vent', parts: [{ pts: [P(.68, .04), P(.68, .31)] }, { pts: [P(.68, .19), P(.50, .19), P(.50, .401)] }],
    fn: 'Rises through the roof and lets air in behind flowing water, so suction cannot pull the water out of the traps.',
    code: 'Ends above the roof. In cold climates it is enlarged there so frost cannot close it; flashed at the roof.' }
};
const kindText = { P: 'Under pressure', G: 'Gravity-driven', A: 'Open to the air' };
const kindColor = { P: 'royalblue', G: 'dimgray', A: 'seagreen' };

// ---- Controls ----
let supplyBox, dwvBox, ventBox, removeBox, flushButton, freezeSlider;

// ---- State ----
let flushT = -1;        // seconds since the flush button was pressed; -1 when idle
let flushed = false;    // has a flush happened since the vent was last changed
let trapDry = false;    // the toilet trap lost its water seal (unvented drain)
let hoverId = '';
let selId = '';
let view = { x: 0, y: 0, k: 1 }; // virtual-to-screen mapping
const FLUSH_LEN = 5.6;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  supplyBox = createCheckbox('Show supply system', true);
  dwvBox = createCheckbox('Show DWV system', true);
  ventBox = createCheckbox('Show vent', true);
  removeBox = createCheckbox('Remove vent', false);
  removeBox.changed(() => { trapDry = false; flushed = false; });
  flushButton = createButton('Flush toilet');
  flushButton.mousePressed(() => { flushT = 0; flushed = false; });
  freezeSlider = createSlider(-20, 50, 40, 1);

  positionControls();
  describe('A cross-section of a two-story building. Thin sealed supply pipes, cold in solid blue and hot in dashed red, run from a buried service line through a meter and water heater to a toilet and lavatory on the second floor. Thick sloped gray drain pipes run from the fixtures through traps, down a vertical stack, a building drain with a cleanout, and a building sewer. A green vent pipe rises through the roof. Controls show or hide each system, flush the toilet, remove the vent to see the trap lose its water, and lower the outdoor temperature to find pipes that could freeze in the exterior wall.', LABEL);
}

// two controls per row: the left half starts at x = 10, the right half at the middle
function positionControls() {
  const half = canvasWidth / 2;
  const row = k => drawHeight + 6 + k * 35;
  supplyBox.position(10, row(0));
  dwvBox.position(half + 6, row(0));
  ventBox.position(10, row(1));
  removeBox.position(half + 6, row(1));
  flushButton.position(10, row(2));
  freezeSlider.position(half + sliderLeftMargin - 20, row(2) + 4);
  freezeSlider.size(max(60, half - sliderLeftMargin + 4));
}

function visible(c) {
  if (c.layer === 'supply') return supplyBox.checked();
  if (c.layer === 'dwv') return dwvBox.checked();
  if (c.layer === 'vent') return ventBox.checked();
  return true;
}

// ---- Geometry helpers ----
function distToSeg(px, py, a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = constrain(((px - a[0]) * dx + (py - a[1]) * dy) / (dx * dx + dy * dy || 1), 0, 1);
  return dist(px, py, a[0] + t * dx, a[1] + t * dy);
}
function distToComp(c, px, py) {
  let best = 1e9;
  c.parts.forEach(p => {
    if (p.pts) { for (let i = 0; i < p.pts.length - 1; i++) best = min(best, distToSeg(px, py, p.pts[i], p.pts[i + 1])); }
    else {
      const r = p.rect.map((v, i) => v * (i % 2 ? VH : VW));
      best = min(best, dist(px, py, constrain(px, r[0], r[2]), constrain(py, r[1], r[3])));
    }
  });
  return best;
}
function pointAlong(path, f) { // point at fraction f (0..1) of a polyline's length
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) total += dist(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
  let d = f * total;
  for (let i = 0; i < path.length - 1; i++) {
    const L = dist(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1]);
    if (d <= L) return [lerp(path[i][0], path[i + 1][0], d / L), lerp(path[i][1], path[i + 1][1], d / L)];
    d -= L;
  }
  return path[path.length - 1];
}

function draw() {
  updateCanvasSize();
  if (flushT >= 0) { flushT += deltaTime / 1000; if (flushT > FLUSH_LEN) { flushT = -1; flushed = true; } }

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
  text('Plumbing Supply and DWV Explorer', canvasWidth / 2, 8);

  const wide = canvasWidth >= 640;
  const D = wide ? { x: 10, y: 40, w: floor(canvasWidth * 0.6), h: 374 } : { x: 6, y: 38, w: canvasWidth - 12, h: 218 };
  const I = wide ? { x: D.x + D.w + 10, y: 40, w: canvasWidth - D.x - D.w - 20, h: 374 } : { x: 6, y: 260, w: canvasWidth - 12, h: 140 };
  const S = wide ? { x: 10, y: 420, w: canvasWidth - 20, h: 46 } : { x: 6, y: 404, w: canvasWidth - 12, h: 62 };

  stateUpdate();
  view.k = min(D.w / VW, D.h / VH);
  view.x = D.x + (D.w - VW * view.k) / 2;
  view.y = D.y + (D.h - VH * view.k) / 2;

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(D.x, D.y, D.w, D.h, 8);
  findHover(D);
  drawScene(D);
  drawInfobox(I, wide);
  drawStatus(S);
  drawTooltip();
  drawControlLabels();
}

// ---- Trap seal model: with no vent, the first flush pulls the trap dry and it stays dry ----
function stateUpdate() {
  if (!removeBox.checked()) { trapDry = false; return; }
  if (flushT >= 1.5) trapDry = true;
}
function trapLevel() {
  if (!removeBox.checked()) return 1;
  if (trapDry) return 0;
  if (flushT < 0.9) return 1;
  return constrain(1 - (flushT - 0.9) / 0.6, 0, 1);
}

function findHover(D) {
  hoverId = '';
  if (mouseX < D.x || mouseX > D.x + D.w || mouseY < D.y || mouseY > D.y + D.h) return;
  const vx = (mouseX - view.x) / view.k, vy = (mouseY - view.y) / view.k;
  let best = 1e9;
  Object.keys(comps).forEach(id => {
    const c = comps[id];
    if (!visible(c)) return;
    const reach = c.cls ? (c.cls === 'drain' ? 9 : 7) : 3;
    const d = distToComp(c, vx, vy) - reach;
    if (d < 0 && d < best) { best = d; hoverId = id; }
  });
}

// ---- Scene ----
function pipeStyle(cls, glow) {
  noFill();
  strokeJoin(ROUND);
  strokeCap(SQUARE);
  drawingContext.setLineDash([]);
  if (glow) { stroke(255, 215, 0, 190); strokeWeight(max(cls === 'drain' ? 17 : 12, 8 / view.k)); return; }
  if (cls === 'cold') { stroke('royalblue'); strokeWeight(max(3, 1.8 / view.k)); }
  else if (cls === 'hot') { stroke('crimson'); strokeWeight(max(3, 1.8 / view.k)); drawingContext.setLineDash([5, 4]); }
  else if (cls === 'vent') { stroke('seagreen'); strokeWeight(max(6, 3.5 / view.k)); drawingContext.setLineDash([12, 6]); }
  else { stroke('gray'); strokeWeight(max(10, 6 / view.k)); }
}

function polyline(pts) {
  beginShape();
  pts.forEach(p => vertex(p[0], p[1]));
  endShape();
}

function drawComp(id, glow) {
  const c = comps[id];
  c.parts.forEach(p => {
    if (!p.pts) return;
    if (glow === 'freeze') { if (!p.ext) return; noFill(); stroke(0, 255, 255, 200); strokeWeight(max(14, 8 / view.k)); drawingContext.setLineDash([]); polyline(p.pts); return; }
    if (c.cls === 'drain' && !glow) { // outlined gray pipe
      noFill(); stroke('dimgray'); strokeWeight(max(13, 8 / view.k)); drawingContext.setLineDash([]); polyline(p.pts);
    }
    pipeStyle(c.cls, glow);
    if (c.cls === 'drain' && !glow) { stroke('lightgray'); strokeWeight(max(7, 4 / view.k)); }
    polyline(p.pts);
  });
  drawingContext.setLineDash([]);
}

function drawRectComp(id, glow) {
  const r = comps[id].parts[0].rect.map((v, i) => v * (i % 2 ? VH : VW));
  if (glow) { noFill(); stroke(255, 215, 0, 190); strokeWeight(8 / view.k); rect(r[0] - 3, r[1] - 3, r[2] - r[0] + 6, r[3] - r[1] + 6, 6); }
}

function drawScene(D) {
  const k = view.k;
  push();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(D.x, D.y, D.w, D.h);
  drawingContext.clip();
  translate(view.x, view.y);
  scale(k);
  const gy = VH * .62; // ground level

  // ground, frost line, building shell
  noStroke();
  fill('wheat');
  rect(-60, gy, VW + 120, VH - gy + 60);
  stroke('steelblue'); strokeWeight(max(1.5, 1 / k)); drawingContext.setLineDash([8, 6]);
  line(-60, VH * .74, VW + 60, VH * .74);
  drawingContext.setLineDash([]);
  stroke('dimgray'); strokeWeight(max(2, 1.2 / k));
  fill('white');
  rect(P(.10, .17)[0], P(.10, .17)[1], P(.64, 0)[0], gy - P(0, .17)[1]);
  fill('lightgray');
  triangle(...P(.08, .17), ...P(.42, .08), ...P(.76, .17));
  rect(P(.10, .17)[0], P(.10, .17)[1], P(.04, 0)[0], gy - P(0, .17)[1]);        // exterior wall (left)
  rect(P(.72, .17)[0], P(.72, .17)[1], P(.02, 0)[0], gy - P(0, .17)[1]);        // wall (right)
  line(...P(.14, .45), ...P(.72, .45));                                         // underside of the second floor
  strokeWeight(max(4, 2.5 / k));
  line(...P(.10, .38), ...P(.74, .38));                                         // second floor
  line(...P(.10, .62), ...P(.74, .62));                                         // first floor slab

  const showS = supplyBox.checked(), showD = dwvBox.checked(), showV = ventBox.checked(), removed = removeBox.checked();
  const T = freezeSlider.value(), freezing = T <= 32;

  // freeze glow under the exterior-wall pipes
  if (freezing && showS) { drawComp('cold', 'freeze'); drawComp('hot', 'freeze'); }
  // hover and selection glow
  [hoverId, selId].forEach(id => {
    if (!id || !comps[id] || !visible(comps[id])) return;
    if (comps[id].parts[0].pts) drawComp(id, true); else drawRectComp(id, true);
  });

  // supply layer
  if (showS) { drawComp('service'); drawComp('cold'); drawComp('hot'); drawHeater(); drawMeter(); }
  // fixtures
  drawFixtures();
  // DWV layer
  if (showD) {
    ['sewer', 'drain', 'stack', 'branch', 'cleanout'].forEach(id => drawComp(id));
    drawComp('trap');
    drawTrapWater();
    noStroke(); fill('dimgray'); rect(P(.71, .63)[0] - 7, P(.71, .63)[1] - 6, 14, 8, 2); // cleanout cap
  }
  // vent layer (a removed vent is drawn as a faint ghost)
  if (showV) {
    if (removed) { noFill(); stroke(150); strokeWeight(3); drawingContext.setLineDash([2, 8]); comps.vent.parts.forEach(p => polyline(p.pts)); drawingContext.setLineDash([]); }
    else {
      drawComp('vent');
      noStroke(); fill('seagreen'); rect(P(.68, .04)[0] - 8, P(.68, .04)[1], 16, 12, 2); // enlarged cold-climate terminal
    }
  }
  if (removed && (showD || showV)) { noStroke(); fill('dimgray'); rect(P(.68, .31)[0] - 9, P(.68, .31)[1] - 6, 18, 7, 2); } // cap on the stack

  drawFlowDots(showS, showD, showV, removed);
  drawingContext.restore();
  pop();
  drawSceneLabels(D, T, freezing, showS, removed);
}

function drawMeter() {
  const r = comps.meter.parts[0].rect.map((v, i) => v * (i % 2 ? VH : VW));
  stroke('black'); strokeWeight(max(1.5, 1 / view.k)); fill('lightcyan');
  rect(r[0], r[1], r[2] - r[0], r[3] - r[1], 4);
}
function drawHeater() {
  const r = comps.heater.parts[0].rect.map((v, i) => v * (i % 2 ? VH : VW));
  stroke('black'); strokeWeight(max(1.5, 1 / view.k)); fill('gainsboro');
  rect(r[0], r[1], r[2] - r[0], r[3] - r[1], 8);
}

function drawFixtures() {
  stroke('black'); strokeWeight(max(1.5, 1 / view.k));
  // toilet: base, bowl, tank
  fill('white');
  rect(...P(.42, .372), P(.03, 0)[0], P(0, .008)[1]);
  rect(...P(.405, .335), P(.065, 0)[0], P(0, .04)[1], 6);
  rect(...P(.375, .27), P(.035, 0)[0], P(0, .09)[1], 3);
  noStroke(); fill('lightskyblue');
  rect(...P(.413, .35), P(.045, 0)[0], P(0, .014)[1], 4);
  // lavatory: basin and faucet
  stroke('black'); fill('white');
  arc(...P(.575, .235), P(.08, 0)[0], P(0, .09)[1], 0, PI);
  line(...P(.535, .235), ...P(.615, .235));
  strokeWeight(max(3, 2 / view.k));
  line(...P(.575, .235), ...P(.575, .215));
  line(...P(.575, .215), ...P(.56, .215));
}

function drawTrapWater() {
  const lvl = trapLevel();
  noFill();
  strokeCap(ROUND);
  stroke('lightskyblue');
  strokeWeight(max(6, 3.5 / view.k));
  drawingContext.setLineDash([]);
  if (lvl > 0.5) polyline(TRAP_T.slice(1, 4));
  else if (lvl > 0.1) polyline([P(.443, .412), P(.457, .412)]);
  polyline(TRAP_L.slice(1, 4)); // the lavatory trap keeps its seal
  strokeCap(SQUARE);
}

// ---- Moving water: waste along the drain, refill along the supply, air down the vent ----
function dotsOn(path, head, n, gap, col, r) {
  noStroke();
  fill(col);
  for (let i = 0; i < n; i++) {
    const f = head - i * gap;
    if (f < 0 || f > 1) continue;
    const q = pointAlong(path, f);
    circle(q[0], q[1], r);
  }
}
function drawFlowDots(showS, showD, showV, removed) {
  if (flushT < 0) return;
  const r = max(6, 4 / view.k);
  if (showD) dotsOn(WASTE_PATH, (flushT - 0.5) / 3.2, 8, 0.03, 'steelblue', r);
  if (showS) dotsOn(REFILL_PATH, (flushT - 2.9) / 2.4, 8, 0.03, 'royalblue', r * 0.8);
  if (showV && !removed && flushT > 0.9 && flushT < 2.9) dotsOn(VENT_PATH, (flushT - 0.9) / 1.6, 5, 0.06, 'lime', r * 0.9);
}

function sx(p) { return [view.x + p[0] * view.k, view.y + p[1] * view.k]; }

function drawSceneLabels(D, T, freezing, showS, removed) {
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, BOTTOM);
  const fl = sx(P(0, .74));
  fill('steelblue');
  text('Frost line', D.x + 6, fl[1] - 2);
  fill('black');
  if (showS) { const m = sx(P(0, .86)); text('Water main', D.x + 6, m[1] - 4); }
  if (dwvBox.checked()) { const s = sx(P(.97, .88)); textAlign(RIGHT, TOP); text('City sewer', min(s[0] + 26, D.x + D.w - 4), s[1] + 8); }
  textSize(14);
  textAlign(LEFT, TOP);
  fill(freezing ? 'darkcyan' : 'black');
  text('Outdoors: ' + T + ' °F', D.x + 8, D.y + 6);
  if (freezing && showS) {
    fill('darkcyan');
    textSize(14);
    textAlign(LEFT, TOP);
    text('Below 32 °F:\nfreeze risk', D.x + 6, D.y + 28);
    stroke('darkcyan'); strokeWeight(1);
    const a = sx(P(.115, .295));
    line(D.x + 40, D.y + 64, a[0], a[1] - 4);
    noStroke();
  }
  if (trapDry) { // sewer gas rising from the dry toilet trap
    const t = sx(P(.44, .33));
    noFill();
    stroke('olive');
    strokeWeight(2);
    for (let i = 0; i < 3; i++) {
      beginShape();
      for (let j = 0; j <= 6; j++) vertex(t[0] - 10 + i * 12 + sin(j + i) * 4, t[1] - 4 - j * 6);
      endShape();
    }
    noStroke();
    fill('olive');
    textSize(14);
    textAlign(CENTER, BOTTOM);
    text('Sewer gas', t[0], t[1] - 44);
    const tr = sx(P(.45, .44));
    fill('crimson');
    textAlign(CENTER, TOP);
    text('Dry trap', tr[0], tr[1]);
  }
  if (removed && (dwvBox.checked() || ventBox.checked())) {
    fill('crimson');
    textSize(14);
    textAlign(RIGHT, TOP);
    text('Vent removed', D.x + D.w - 8, D.y + 6);
  }
  if (flushT >= 0 && flushT > 0.9 && flushT < 2.9 && !removed && ventBox.checked()) {
    const v = sx(P(.68, .04));
    fill('seagreen');
    textSize(14);
    textAlign(RIGHT, TOP);
    text('Air in', v[0] - 14, v[1]);
  }
}

// ---- Infobox: legend until something is clicked, then the part's details ----
function drawInfobox(I, wide) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(I.x, I.y, I.w, I.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  if (selId && comps[selId]) {
    const c = comps[selId];
    textSize(16);
    fill('navy');
    text(c.name, I.x + 10, I.y + 6, I.w - 20, 22);
    // type tag: color plus written label
    const tag = kindText[c.kind] + (c.kind === 'P' && c.layer === 'fixture' ? ' in, gravity out' : '');
    textSize(14);
    const tw = textWidth(tag) + 16;
    stroke(kindColor[c.kind]); strokeWeight(1);
    fill('white');
    rect(I.x + 10, I.y + 30, min(tw, I.w - 20), 22, 11);
    noStroke();
    fill(kindColor[c.kind]);
    text(tag, I.x + 18, I.y + 34);
    fill('black');
    textSize(14);
    const bodyW = I.w - 20;
    text(c.fn, I.x + 10, I.y + 56, bodyW, wide ? 110 : 56);
    fill('dimgray');
    text('Code note: ' + c.code, I.x + 10, wide ? I.y + 150 : I.y + 104, bodyW, wide ? 150 : 38);
    return;
  }
  textSize(16);
  fill('navy');
  text('Click any pipe or fixture', I.x + 10, I.y + 6, I.w - 20, 22);
  fill('black');
  textSize(14);
  text(wide ? 'Hover to highlight a part and read its name. Thin pipes are sealed and under pressure; thick pipes drain by gravity and slope downhill.' : 'Hover to highlight a part; click it for details.', I.x + 10, I.y + 30, I.w - 20, wide ? 90 : 40);
  const items = [['cold', 'Cold supply (blue, solid)'], ['hot', 'Hot supply (red, dashed)'], ['drain', 'Drain (gray, thick)'], ['vent', 'Vent (green, dashed)']];
  items.forEach((it, i) => {
    const cx = wide ? I.x + 10 : I.x + 10 + (i % 2) * (I.w / 2);
    const cy = wide ? I.y + 140 + i * 30 : I.y + 62 + floor(i / 2) * 28;
    push();
    drawingContext.setLineDash([]);
    noFill();
    strokeCap(SQUARE);
    if (it[0] === 'cold') { stroke('royalblue'); strokeWeight(3); }
    else if (it[0] === 'hot') { stroke('crimson'); strokeWeight(3); drawingContext.setLineDash([5, 4]); }
    else if (it[0] === 'vent') { stroke('seagreen'); strokeWeight(6); drawingContext.setLineDash([12, 6]); }
    else { stroke('gray'); strokeWeight(9); }
    line(cx, cy + 9, cx + 34, cy + 9);
    drawingContext.setLineDash([]);
    pop();
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, TOP);
    text(it[1], cx + 42, cy);
  });
}

function drawStatus(S) {
  const T = freezeSlider.value();
  let msg;
  if (trapDry) msg = 'Sewer gas now enters the room.';
  else if (removeBox.checked()) msg = flushed || flushT >= 0 ? 'Vent removed: the flow is pulling the trap dry...' : 'Vent removed. Press Flush toilet to see what the missing vent does.';
  else if (flushT >= 0) msg = 'Flushing: gravity moves the waste and the vent admits air, so the trap keeps its seal.';
  else msg = 'Thin pipes are sealed and pressurized; thick pipes drain by gravity.';
  if (flushT < 0 && !removeBox.checked() && flushed) msg = 'Flush complete: the vent let air in behind the water, so the trap kept its seal.';
  if (T <= 32 && supplyBox.checked()) msg += ' Below 32 °F: exterior-wall pipes may freeze.';
  else if (T > 32) msg += ' At ' + T + ' °F, exterior-wall pipes stay above freezing.';
  const bad = trapDry || (T <= 32 && supplyBox.checked());
  stroke(bad ? 'darkorange' : 'steelblue');
  strokeWeight(1);
  fill(bad ? 'floralwhite' : 'white');
  rect(S.x, S.y, S.w, S.h, 8);
  noStroke();
  fill('black');
  textSize(canvasWidth >= 640 ? 15 : 14);
  textAlign(LEFT, CENTER);
  text(msg, S.x + 8, S.y + 2, S.w - 16, S.h - 4);
}

function drawTooltip() {
  if (!hoverId) return;
  const c = comps[hoverId];
  textSize(14);
  const w = textWidth(c.name) + 16;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, drawHeight - 30);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, 24, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(c.name, tx + 8, ty + 12);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  const half = canvasWidth / 2;
  text('Freeze test: ' + freezeSlider.value() + ' °F', half + 6, drawHeight + 6 + 2 * 35 + 15);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
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
