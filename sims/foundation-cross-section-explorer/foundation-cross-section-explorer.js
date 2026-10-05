// Foundation Cross-Section Explorer MicroSim - numbered parts of a cold-climate foundation wall: slab-on-grade, crawl space, or basement
// CANVAS_HEIGHT: 550
// Bloom Level 1 (Remember) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Part descriptions (typical values follow the Chapter 10 text and are not required values) ----
const info = {
  1: { name: 'Continuous footing', job: "Spreads the wall's line load over enough soil that the soil is not overstressed, and bears below frost depth so it is not heaved.", typ: '16 in wide by 8 in thick for the Riverbend wall (illustrative).', sec: 'Continuous Footings' },
  2: { name: 'Footing reinforcement', job: 'Steel bars carry the tension in the bottom of the footing and tie it together over soft spots.', typ: 'Two continuous bars with about 3 in of concrete cover against the soil.', sec: 'Footing Reinforcement' },
  3: { name: 'Foundation wall', job: "Rises from the footing to the floor framing, carries the wall above, and holds back the soil outside.", typ: '8 in or more of cast concrete or reinforced block.', sec: 'Foundation Walls' },
  4: { name: 'Anchor bolt and sill plate', job: 'The sill plate is the first wood member. Anchor bolts tie it to the wall so wind cannot lift the framing off the foundation.', typ: 'Bolts commonly spaced about 6 ft apart.', sec: 'Foundation Walls' },
  5: { name: 'Slab-on-grade', job: 'A concrete floor placed on the ground inside the foundation walls. It is the cheapest floor for a building without a basement.', typ: 'At least 4 in thick, with wire or fiber reinforcement and saw-cut joints.', sec: 'Slab-on-Grade' },
  6: { name: 'Gravel base', job: 'Compacted granular layer gives uniform support and breaks the capillary rise of groundwater.', typ: '4 in or more of compacted crushed stone or sand.', sec: 'Slab-on-Grade' },
  7: { name: 'Vapor retarder', job: 'A plastic sheet that slows moisture moving up from the ground into the slab or the crawl space.', typ: '10 mil polyethylene under a slab; a heavy sheet over the soil in a crawl space.', sec: 'Slab-on-Grade' },
  8: { name: 'Perimeter drain in gravel', job: 'A perforated pipe in washed gravel lowers the water level beside the footing so water pressure and leaks stay small.', typ: 'About 4 in pipe wrapped in fabric, sloped to a sump or daylight.', sec: 'Foundation Drainage' },
  9: { name: 'Backfill', job: 'Soil placed back against the wall after construction. Place it in even layers once the floor framing or slab is in, so the wall is braced.', typ: 'Free-draining granular soil near the wall, compacted in layers.', sec: 'Foundation Walls' },
  10: { name: 'Finished grade, sloped away', job: 'The ground surface falls away from the wall so rain runs away from the foundation instead of into the backfill.', typ: 'About 6 in of fall in the first 10 ft.', sec: 'Foundation Drainage' },
  11: { name: 'Frost depth line', job: 'Footings must bear below this line so freezing, heaving soil cannot lift them each winter.', typ: '42 in in Minneapolis, commonly. The local code sets the value.', sec: 'Shallow Foundations' },
  12: { name: 'Floor framing', job: 'Joists and a rim joist resting on the sill plate carry the first floor over the crawl space or basement.', typ: '2x10 joists at 16 in on center (illustrative).', sec: 'Chapter 7, Wood and Steel Framing' },
  13: { name: 'Crawl space', job: 'A shallow, unfinished space under the first floor with access to plumbing and wiring. Modern practice seals and conditions it.', typ: '18 to 48 in high.', sec: 'Crawl Spaces' },
  14: { name: 'Basement', job: 'A story partly or fully below grade, enclosed by foundation walls. It adds usable space but takes on groundwater and radon concerns.', typ: 'About 8 ft clear height, with the footing well below frost depth.', sec: 'Basements' }
};
const TYPES = ['Slab-on-grade', 'Crawl space', 'Basement'];

// ---- State ----
let secType = 'Slab-on-grade';
let parts = [];            // drawn in order; id 0 = decoration
let present = [];          // sorted ids of the numbered parts for this section
let newSet = [];           // ids new compared with the previous section
let selId = 0;
let hoverId = 0;
let L = {};                // layout, recomputed each frame

// ---- Controls ----
let typeSel, frostBox, loadBox;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  typeSel = createSelect();
  TYPES.forEach(t => typeSel.option(t));
  typeSel.selected(secType);
  typeSel.changed(onTypeChange);
  frostBox = createCheckbox('Show frost line', true);
  loadBox = createCheckbox('Show loads', false);
  positionControls();
  rebuild();
  describe('A cross-section of a cold-climate foundation wall with numbered parts: footing, footing reinforcement, foundation wall, anchor bolt and sill plate, slab or crawl space or basement floor, gravel base, vapor retarder, perimeter drain, backfill, sloped finished grade, and a 42 inch frost depth line. A menu switches between slab-on-grade, crawl space, and basement. Hovering names a part, and clicking opens an infobox with its function, a typical dimension, and the chapter section.', LABEL);
}

function positionControls() {
  typeSel.position(sliderLeftMargin, drawHeight + 8);
  frostBox.position(10, drawHeight + 42);
  loadBox.position(175, drawHeight + 42);
}

function onTypeChange() {
  const prev = present.slice();
  secType = typeSel.value();
  rebuild();
  newSet = present.filter(id => !prev.includes(id));
  if (!present.includes(selId)) selId = 0;
}

// ---- Geometry (feet). x: 0 is the inside face of the foundation wall, outside is positive. y: 0 is finished grade at the wall, down is positive ----
const X0 = -8, X1 = 8.7, Y0 = -2.9, Y1 = 9.9;
const WALL_T = 8 / 12, FT_W = 16 / 12, FT_T = 8 / 12, WALL_TOP = -0.5, SILL = 0.125;
function gradeY(x) { return max(0, 0.05 * (x - WALL_T)); }

function rectS(x, y, w, h, fill, stroke) { return { k: 'rect', x, y, w, h, fill, stroke: stroke || 'dimgray' }; }
function lineS(x1, y1, x2, y2, col, w, dash) { return { k: 'line', x1, y1, x2, y2, col, w, dash }; }

function rebuild() {
  const bsmt = secType === 'Basement', crawl = secType === 'Crawl space';
  const fbot = bsmt ? 8.83 : 3.5, ftop = fbot - FT_T;
  const slabTop = bsmt ? 7.5 : WALL_TOP;
  const groundIn = crawl ? 1.2 : slabTop;          // interior floor or ground level
  const sillTop = WALL_TOP - SILL;
  const joistTop = sillTop - 0.77;
  const stubBase = (bsmt || crawl) ? joistTop - 0.06 : sillTop;
  parts = [];
  const add = (id, shapes, tag, target) => parts.push({ id, shapes, tag, target });
  // base soil, interior room, and exterior sky
  add(0, [rectS(X0, 0, X1 - X0, Y1, 'tan', 'tan'), rectS(X0, Y0, -X0, groundIn - Y0, 'white', 'white'),
          { k: 'poly', pts: [[WALL_T, 0], [X1, 0], [X1, gradeY(X1)]], fill: 'aliceblue', stroke: 'aliceblue' }]);
  // 9 backfill
  add(9, [{ k: 'poly', pts: [[WALL_T, 0], [4.6, gradeY(4.6)], [4.6, fbot], [WALL_T, fbot]], fill: 'wheat', stroke: 'wheat' }], { x: 3.4, y: bsmt ? 5.8 : 1.2 }, null);
  // 13 / 14 interior space
  if (crawl) add(13, [rectS(X0, sillTop, -X0, groundIn - sillTop, 'white', 'white')], { x: -6, y: 0.3 }, null);
  if (bsmt) add(14, [rectS(X0, sillTop, -X0, groundIn - sillTop, 'white', 'white')], { x: -5.5, y: 5.2 }, null);
  // 8 perimeter drain: washed gravel with a pipe beside the footing
  add(8, [rectS(FT_W - 0.333, fbot - 1.2, 1.3, 1.2, 'lightgray', 'gray'), { k: 'circle', x: 1.65, y: fbot - 0.55, r: 0.17, fill: 'dimgray', stroke: 'black' }], { x: 3.3, y: fbot - 0.55 }, { x: 1.85, y: fbot - 0.55 });
  // 1 footing and 2 reinforcement
  add(1, [rectS(-0.333, ftop, FT_W, FT_T, 'silver')], { x: -1.4, y: fbot + 0.6 }, { x: 0.1, y: fbot - 0.05 });
  add(2, [{ k: 'circle', x: -0.003, y: fbot - 0.27, r: 0.05, fill: 'black', stroke: 'black', minPx: 3 }, { k: 'circle', x: 0.663, y: fbot - 0.27, r: 0.05, fill: 'black', stroke: 'black', minPx: 3 }], { x: -2.0, y: fbot - 0.27 }, { x: -0.1, y: fbot - 0.27 });
  // 3 foundation wall
  add(3, [rectS(0, WALL_TOP, WALL_T, ftop - WALL_TOP, 'silver')], { x: -2.0, y: bsmt ? 4.5 : 1.6 }, { x: 0, y: bsmt ? 4.5 : 1.6 });
  // 5 slab, 6 gravel base, 7 vapor retarder
  if (!crawl) {
    add(5, [rectS(X0, slabTop, -X0, 0.333, 'silver')], { x: -5.5, y: slabTop - 1.0 }, { x: -5.5, y: slabTop + 0.17 });
    add(6, [rectS(X0, slabTop + 0.333, -X0, 0.333, 'lightgray', 'gray')], { x: -4.4, y: slabTop + 1.5 }, { x: -4.4, y: slabTop + 0.5 });
    add(7, [lineS(X0, slabTop + 0.333, 0, slabTop + 0.333, 'dodgerblue', 4)], { x: -3.3, y: slabTop - 1.0 }, { x: -3.3, y: slabTop + 0.333 });
  } else {
    add(7, [lineS(X0, groundIn, 0, groundIn, 'dodgerblue', 4)], { x: -3, y: 0.3 }, { x: -3, y: groundIn });
  }
  // 12 floor framing
  if (crawl || bsmt) add(12, [rectS(X0, joistTop, -X0 + 0.1, 0.77, 'navajowhite', 'saddlebrown'), rectS(0.1, joistTop, 0.125, 0.77, 'navajowhite', 'saddlebrown'), rectS(X0, joistTop - 0.06, -X0 + 0.56, 0.06, 'burlywood', 'saddlebrown')], { x: -3.5, y: -2.1 }, { x: -3.5, y: joistTop + 0.4 });
  // wall framing stub above the sill (decoration) with a break line
  add(0, [rectS(0.1, stubBase - 1.0, 0.46, 1.0, 'navajowhite', 'saddlebrown'), lineS(0.05, stubBase - 1.0, 0.61, stubBase - 1.0, 'dimgray', 2, true)]);
  // 4 sill plate and anchor bolt
  add(4, [rectS(0.1, WALL_TOP - SILL, 0.46, SILL, 'navajowhite', 'saddlebrown'), lineS(0.33, WALL_TOP - SILL - 0.1, 0.33, WALL_TOP + 0.6, 'black', 3)], { x: 1.5, y: -1.9 }, { x: 0.5, y: WALL_TOP - 0.06 });
  // 10 finished grade
  add(10, [{ k: 'line', x1: WALL_T, y1: 0, x2: X1, y2: gradeY(X1), col: 'forestgreen', w: 5 }], { x: 5.5, y: -1.0 }, { x: 5.5, y: gradeY(5.5) });
  // 11 frost depth line
  add(11, [lineS(X0, 3.5, X1, 3.5, 'royalblue', 3, true)], { x: 8.2, y: 3.5 }, null);
  present = [...new Set(parts.filter(p => p.id).map(p => p.id))].sort((a, b) => a - b);
  parts.fbot = fbot; parts.ftop = ftop; parts.stubTop = stubBase - 1.0;
}
function partVisible(p) { return p.id !== 11 || frostBox.checked(); }
function partName(id) { return (id === 5 && secType === 'Basement') ? 'Basement slab' : (id === 7 && secType === 'Crawl space') ? 'Vapor retarder (ground cover)' : info[id].name; }

// ---- Layout and transforms ----
function computeLayout() {
  const wide = canvasWidth >= 640;
  const top = 44, avail = drawHeight - top - 10;
  const panelW = wide ? 280 : 0;
  const dw = canvasWidth - 20 - (wide ? panelW + 10 : 0);
  const s = min(dw / (X1 - X0), avail / (Y1 - Y0), wide ? 40 : 21);
  L = { wide, s, top, dw, panelW };
  L.ox = 10 + (dw - s * (X1 - X0)) / 2 - X0 * s;   // pixel x of x = 0
  L.left = L.ox + X0 * s; L.right = L.ox + X1 * s;
  L.bottom = top + (Y1 - Y0) * s;
  L.px = wide ? canvasWidth - panelW - 10 : 10;
  L.py = wide ? top : L.bottom + 6;
  L.pw = wide ? panelW : canvasWidth - 20;
  L.ph = drawHeight - L.py - 6;
}
function tx(x) { return L.ox + x * L.s; }
function ty(y) { return L.top + (y - Y0) * L.s; }
function fx(px) { return (px - L.ox) / L.s; }
function fy(py) { return (py - L.top) / L.s + Y0; }

function draw() {
  updateCanvasSize();
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
  text('Foundation Cross-Section Explorer', canvasWidth / 2, 8);

  hoverId = findHover();
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(L.left, L.top, L.right - L.left, L.bottom - L.top);
  drawingContext.clip();
  parts.forEach(p => { if (partVisible(p)) p.shapes.forEach(drawShape); });
  if (loadBox.checked()) drawLoads();
  drawLabels();
  drawingContext.restore();
  noFill();
  stroke('dimgray');
  strokeWeight(1);
  rect(L.left, L.top, L.right - L.left, L.bottom - L.top);

  drawHighlights();
  drawTags();
  drawPanel();
  if (hoverId) drawNameTip();
  drawControlLabels();
}

// ---- Shapes ----
function applyStyle(sh) {
  if (sh.fill) fill(sh.fill); else noFill();
  stroke(sh.stroke || sh.col || 'dimgray');
  strokeWeight(sh.w || 1.5);
}
function drawShape(sh) {
  if (sh.k === 'rect') {
    applyStyle(sh);
    rect(tx(sh.x), ty(sh.y), sh.w * L.s, sh.h * L.s);
  } else if (sh.k === 'circle') {
    applyStyle(sh);
    circle(tx(sh.x), ty(sh.y), max(sh.r * 2 * L.s, (sh.minPx || 0) * 2));
  } else if (sh.k === 'poly') {
    applyStyle(sh);
    beginShape();
    sh.pts.forEach(p => vertex(tx(p[0]), ty(p[1])));
    endShape(CLOSE);
  } else if (sh.k === 'line') {
    stroke(sh.col);
    strokeWeight(sh.w);
    if (sh.dash) drawingContext.setLineDash([9, 6]);
    line(tx(sh.x1), ty(sh.y1), tx(sh.x2), ty(sh.y2));
    drawingContext.setLineDash([]);
  }
}
function hitShape(sh, mx, my) {
  const m = 5; // pixel margin so thin parts are easy to hit
  if (sh.k === 'rect') return mx >= tx(sh.x) - m && mx <= tx(sh.x + sh.w) + m && my >= ty(sh.y) - m && my <= ty(sh.y + sh.h) + m;
  if (sh.k === 'circle') return dist(mx, my, tx(sh.x), ty(sh.y)) <= max(sh.r * L.s, sh.minPx || 0) + m;
  if (sh.k === 'line') return distToSeg(mx, my, tx(sh.x1), ty(sh.y1), tx(sh.x2), ty(sh.y2)) <= m + sh.w / 2;
  if (sh.k === 'poly') {
    let inside = false;
    for (let i = 0, j = sh.pts.length - 1; i < sh.pts.length; j = i++) {
      const xi = tx(sh.pts[i][0]), yi = ty(sh.pts[i][1]), xj = tx(sh.pts[j][0]), yj = ty(sh.pts[j][1]);
      if ((yi > my) !== (yj > my) && mx < (xj - xi) * (my - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  return false;
}
function distToSeg(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1, t = constrain(((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy || 1), 0, 1);
  return dist(px, py, x1 + t * dx, y1 + t * dy);
}

// the numbered part under the mouse (thin and small parts win over large regions), or a key row
function findHover() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return 0;
  const k = keyRowAt(mouseX, mouseY);
  if (k) return k;
  for (const p of parts) if (p.id && partVisible(p) && p.tag && dist(mouseX, mouseY, tx(p.tag.x), ty(p.tag.y)) < 11) return p.id;
  if (mouseX < L.left || mouseX > L.right || mouseY < L.top || mouseY > L.bottom) return 0;
  let best = 0, bestArea = Infinity;
  parts.forEach(p => {
    if (!p.id || !partVisible(p)) return;
    for (const sh of p.shapes) if (hitShape(sh, mouseX, mouseY)) {
      const a = sh.k === 'rect' ? sh.w * sh.h : sh.k === 'poly' ? 20 : 0.01;
      if (a <= bestArea) { best = p.id; bestArea = a; }
    }
  });
  return best;
}

function drawHighlights() {
  const ring = (id, col, wgt) => parts.forEach(p => {
    if (p.id !== id || !partVisible(p)) return;
    noFill();
    stroke(col);
    strokeWeight(wgt);
    p.shapes.forEach(sh => {
      if (sh.k === 'rect') rect(tx(sh.x) - 2, ty(sh.y) - 2, sh.w * L.s + 4, sh.h * L.s + 4);
      else if (sh.k === 'circle') circle(tx(sh.x), ty(sh.y), max(sh.r * 2 * L.s, (sh.minPx || 0) * 2) + 6);
      else if (sh.k === 'line') { drawingContext.setLineDash([]); line(tx(sh.x1), ty(sh.y1 - 0.06), tx(sh.x2), ty(sh.y2 - 0.06)); }
      else if (sh.k === 'poly') { beginShape(); sh.pts.forEach(q => vertex(tx(q[0]), ty(q[1]))); endShape(CLOSE); }
    });
  });
  newSet.forEach(id => ring(id, 'darkorange', 4));
  if (selId) ring(selId, 'navy', 4);
  if (hoverId) ring(hoverId, 'gold', 5);
}

// ---- Numbered tags with leader lines ----
function drawTags() {
  parts.forEach(p => {
    if (!p.id || !p.tag || !partVisible(p)) return;
    const x = tx(p.tag.x), y = ty(p.tag.y);
    if (p.target) {
      stroke('black');
      strokeWeight(1.5);
      line(x, y, tx(p.target.x), ty(p.target.y));
      noStroke();
      fill('black');
      circle(tx(p.target.x), ty(p.target.y), 6);
    }
    stroke(p.id === hoverId || p.id === selId ? 'darkorange' : 'white');
    strokeWeight(2);
    fill(newSet.includes(p.id) ? 'darkorange' : 'navy');
    circle(x, y, 22);
    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(13);
    text(p.id, x, y + 1);
  });
}

function drawLabels() {
  noStroke();
  fill('dimgray');
  textSize(12);
  textAlign(LEFT, TOP);
  text('INSIDE', L.left + 6, L.top + 4);
  textAlign(RIGHT, TOP);
  text('OUTSIDE', L.right - 6, L.top + 4);
  if (frostBox.checked()) {
    fill('royalblue');
    textAlign(LEFT, BOTTOM);
    text('Frost depth 42 in', L.left + 6, ty(3.5) - 4);
  }
  if (secType === 'Crawl space') { fill('dimgray'); textAlign(LEFT, TOP); text('about 22 in clear', tx(-7.8), ty(0.65)); }
}

// ---- Load path: wall load flows down the wall and footing, and the soil pushes back ----
function drawLoads() {
  const fbot = parts.fbot, ftop = parts.ftop, cx = tx(WALL_T / 2);
  noStroke();
  fill(220, 20, 60, 90);
  rect(tx(0.1), ty(parts.stubTop - 0.2), 0.46 * L.s, (ftop - parts.stubTop + 0.2) * L.s);
  arrowDown(cx, ty(parts.stubTop - 0.3), ty(ftop + 0.05), 'crimson');
  for (let i = 0; i < 4; i++) arrowUp(tx(-0.25 + i * 0.4), ty(fbot + 0.9), ty(fbot + 0.04), 'darkorange');
  fill('crimson');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('Wall load', cx + 20, ty(parts.stubTop + 0.2));
  fill('darkorange');
  textAlign(LEFT, TOP);
  text('Soil pushes back', tx(1.3), ty(fbot + 0.45));
}
function arrowDown(x, y1, y2, col) { stroke(col); strokeWeight(4); line(x, y1, x, y2 - 8); noStroke(); fill(col); triangle(x, y2, x - 7, y2 - 12, x + 7, y2 - 12); }
function arrowUp(x, y1, y2, col) { stroke(col); strokeWeight(3); line(x, y1, x, y2 + 8); noStroke(); fill(col); triangle(x, y2, x - 6, y2 + 10, x + 6, y2 + 10); }

// ---- Key and infobox panel ----
let keyRows = [];
function keyRowAt(mx, my) {
  for (const r of keyRows) if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) return r.id;
  return 0;
}
function drawPanel() {
  keyRows = [];
  const showInfo = selId > 0;
  const ids = present.filter(id => id !== 11 || frostBox.checked());
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(L.px, L.py, L.pw, L.ph, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  let infoY = L.py + 6;
  if (L.wide) {
    text('Parts (hover or click)', L.px + 8, L.py + 4);
    ids.forEach((id, i) => addKeyRow(id, L.px + 6, L.py + 22 + i * 17, L.pw - 12, 17));
    infoY = L.py + 22 + ids.length * 17 + 6;
    drawInfobox(L.px + 8, infoY, L.pw - 16, L.py + L.ph - infoY - 4);
  } else if (showInfo) {
    drawInfobox(L.px + 8, L.py + 4, L.pw - 16, L.ph - 8);
  } else {
    const colW = (L.pw - 12) / 2, per = ceil(ids.length / 2);
    ids.forEach((id, i) => addKeyRow(id, L.px + 6 + floor(i / per) * colW, L.py + 6 + (i % per) * 18, colW, 18));
    fill('dimgray');
    textSize(12);
    textAlign(LEFT, TOP);
    text(newSet.length ? 'Orange = new in this section. Tap a part for details.' : 'Tap a part or number for details.', L.px + 8, L.py + L.ph - 18);
  }
}
function addKeyRow(id, x, y, w, h) {
  keyRows.push({ id, x, y, w, h });
  const on = id === hoverId || id === selId;
  if (on) { noStroke(); fill(255, 236, 160); rect(x, y, w, h, 4); }
  stroke('white');
  strokeWeight(1);
  fill(newSet.includes(id) ? 'darkorange' : 'navy');
  circle(x + 10, y + h / 2, 16);
  noStroke();
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(12);
  text(id, x + 10, y + h / 2 + 1);
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(L.wide ? 14 : 13);
  text(partName(id), x + 24, y + h / 2 + 1);
}
function drawInfobox(x, y, w, h) {
  textAlign(LEFT, TOP);
  noStroke();
  if (!selId) {
    fill('dimgray');
    textSize(14);
    wrapText((newSet.length ? 'Orange numbers are new in this section. ' : '') + 'Click a part, a number, or a row for its function, a typical size, and where the chapter explains it.', x, y, w, 17);
    return;
  }
  const d = info[selId];
  fill('navy');
  textSize(L.wide ? 15 : 14);
  let yy = wrapText(selId + '. ' + partName(selId), x, y, w, 18);
  fill('black');
  textSize(14);
  yy = wrapText(selId === 5 && secType === 'Basement' ? 'The basement floor: a concrete slab on a gravel base, set several feet below grade, with the same layers as a slab-on-grade.' : d.job, x, yy + 1, w, 17);
  fill('dimgray');
  yy = wrapText('Typical, not required: ' + d.typ, x, yy + 2, w, 17);
  fill('black');
  wrapText('Chapter 10: ' + d.sec, x, yy + 2, w, 17);
}

// ---- Hover name tooltip ----
function drawNameTip() {
  const t = hoverId + '. ' + partName(hoverId);
  textSize(14);
  const w = textWidth(t) + 16;
  const x = min(max(mouseX + 14, 6), canvasWidth - w - 6), y = min(mouseY + 16, drawHeight - 30);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(x, y, w, 24, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(t, x + 8, y + 13);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Foundation type:', 10, drawHeight + 20);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  if (hoverId) selId = (selId === hoverId) ? 0 : hoverId;
}

// word-wrapped text drawn line by line; returns the y after the last line
function wrapText(str, x, y, w, lh) {
  let line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { text(line, x, y); y += lh; line = word; } else line = trial;
  }
  if (line) { text(line, x, y); y += lh; }
  return y;
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
