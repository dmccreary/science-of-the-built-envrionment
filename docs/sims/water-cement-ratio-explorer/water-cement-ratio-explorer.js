// Water-Cement Ratio Explorer MicroSim - how the water-cement ratio sets pores, strength, permeability, and shrinkage, and what water added at the chute does
// CANVAS_HEIGHT: 635
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 230;
let defaultTextSize = 16;

// ---- Data: values follow the Chapter 8 six-sack mix; property curves are illustrative ----
const CEMENT = 564;            // lb of cement per cubic yard (six sacks of 94 lb)
const LB_PER_GAL = 8.34;
const EXPOSURES = {
  'Indoor slab': { max: 0.55, risk: 'shrinkage cracking and a weak, dusty surface' },
  'Exterior walk': { max: 0.45, risk: 'freeze-thaw scaling and deicing-salt damage, because the paste is too permeable' },
  'Parking structure': { max: 0.40, risk: 'chloride penetration and rebar corrosion, because the paste is too permeable' }
};

// illustrative curves, relative to a w/c = 0.45 mix (index 100)
const strengthPsi = wc => 16650 * Math.exp(-3.01 * wc);          // 28-day, air-entrained, psi
const strengthIdx = wc => 100 * strengthPsi(wc) / strengthPsi(0.45);
const permIdx = wc => 100 * Math.pow(10, (wc - 0.45) / 0.2);
const shrinkIdx = wc => 100 * wc / 0.45;
const AXIS_MAX = 340;

// ---- State ----
let chuteGal = 0;      // gallons added at the chute, per cubic yard
let hoverTip = null;   // text of the current hover tooltip
let aggs = [];         // aggregate particles (normalized coordinates)
let pores = [];        // candidate pores, revealed in order as the ratio rises
let L = {};

// ---- Controls ----
let wcSlider, expSel, addBtn, resetBtn;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  wcSlider = createSlider(0.30, 0.65, 0.45, 0.01);
  expSel = createSelect();
  Object.keys(EXPOSURES).forEach(k => expSel.option(k));
  expSel.selected('Exterior walk');
  addBtn = createButton('Add 5 gal at the chute');
  addBtn.mousePressed(() => { chuteGal += 5; });
  resetBtn = createButton('Remove chute water');
  resetBtn.mousePressed(() => { chuteGal = 0; });

  buildParticles();
  positionControls();
  describe('A magnified cutaway of concrete shows gray aggregate particles in tan cement paste with white pores that grow in number and size as the water-cement ratio rises. Three bars show relative strength, permeability, and shrinkage against a dashed specification limit. A slider sets the ratio, a button adds 5 gallons at the truck chute, and a drop-down picks the exposure, which sets the maximum ratio.', LABEL);
}

function sliderWidth() { return max(120, canvasWidth - sliderLeftMargin - 20); }

function positionControls() {
  const y0 = drawHeight;
  wcSlider.position(sliderLeftMargin, y0 + 8);
  wcSlider.size(sliderWidth());
  expSel.position(sliderLeftMargin, y0 + 42);
  addBtn.position(10, y0 + 77);
  resetBtn.position(10 + addBtn.elt.offsetWidth + 14, y0 + 77);
}

// deterministic particles so the picture does not jump when the ratio changes
function buildParticles() {
  randomSeed(11);
  aggs = [];
  let tries = 0;
  while (aggs.length < 26 && tries < 4000) {
    tries++;
    const r = random(0.045, 0.11), x = random(0.02, 0.98), y = random(0.02, 0.98);
    if (aggs.every(a => dist(a.x, a.y, x, y) > a.r + r + 0.012)) {
      const n = floor(random(8, 11));
      aggs.push({ x, y, r, v: Array.from({ length: n }, () => random(0.78, 1.0)), rot: random(TWO_PI) });
    }
  }
  pores = [];
  tries = 0;
  while (pores.length < 80 && tries < 8000) {
    tries++;
    const x = random(0.03, 0.97), y = random(0.03, 0.97);
    if (aggs.every(a => dist(a.x, a.y, x, y) > a.r + 0.03) && pores.every(p => dist(p.x, p.y, x, y) > 0.04)) pores.push({ x, y, size: random(0.4, 1) });
  }
}

// ---- Mixture calculations ----
function wcEff() { return wcSlider.value() + chuteGal * LB_PER_GAL / CEMENT; }
function maxWC() { return EXPOSURES[expSel.value()].max; }

// ---- Draw ----
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
  text('Water-Cement Ratio Explorer', canvasWidth / 2, 8);

  const wc = wcEff(), over = wc > maxWC() + 1e-6;
  hoverTip = null;
  drawCutaway(wc);
  drawBars(wc, over);
  drawTruck(wc);
  drawReadout(wc, over);
  drawControlLabels(wc);
  drawTooltip();
}

function computeLayout() {
  const narrow = canvasWidth < 620;
  if (narrow) {
    const cs = 160, rx = 8 + cs + 10;
    L = { narrow, cut: { x: 8, y: 44, s: cs }, legend: { x: rx, y: 46, vertical: true },
      truck: { x: rx, y: 106, w: canvasWidth - rx - 8, h: 116 },
      bars: { x: 8, y: 230, w: canvasWidth - 16, h: 104 }, read: { x: 8, y: 340, w: canvasWidth - 16, h: drawHeight - 340 - 6 } };
  } else {
    const cs = 330;
    L = { narrow, cut: { x: 12, y: 46, s: cs }, legend: { x: 12, y: 398, vertical: false },
      truck: { x: 12, y: 422, w: cs, h: drawHeight - 422 - 6 },
      bars: { x: 12 + cs + 14, y: 46, w: canvasWidth - cs - 36, h: 170 }, read: { x: 12 + cs + 14, y: 224, w: canvasWidth - cs - 36, h: drawHeight - 224 - 6 } };
  }
}

// ---- Magnified cutaway ----
function drawCutaway(wc) {
  const c = L.cut, s = c.s;
  // paste background
  stroke('dimgray');
  strokeWeight(2);
  fill('tan');
  rect(c.x, c.y, s, s);
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(c.x, c.y, s, s);
  drawingContext.clip();
  // aggregate particles
  strokeWeight(1);
  fill('gray');
  aggs.forEach(a => {
    beginShape();
    a.v.forEach((j, i) => { const ang = a.rot + TWO_PI * i / a.v.length; vertex(c.x + (a.x + cos(ang) * a.r * j) * s, c.y + (a.y + sin(ang) * a.r * j) * s); });
    endShape(CLOSE);
  });
  // pores: more of them, and larger, as the ratio rises
  const t = constrain((wc - 0.25) / 0.40, 0.04, 1.25);
  const n = floor(pores.length * constrain(pow(t, 1.3), 0, 1));
  fill('white');
  stroke('dimgray');
  strokeWeight(1.5);
  let hovered = null;
  for (let i = 0; i < n; i++) {
    const p = pores[i], px = c.x + p.x * s, py = c.y + p.y * s, r = (s / 300) * (2 + 8 * p.size * min(t, 1.1));
    circle(px, py, 2 * r);
    if (dist(mouseX, mouseY, px, py) <= r + 3) hovered = { px, py, r };
  }
  drawingContext.restore();
  if (hovered) {
    noFill();
    stroke('navy');
    strokeWeight(3);
    circle(hovered.px, hovered.py, 2 * hovered.r + 6);
    hoverTip = 'Pore: mixing water the cement did not need (hydration binds only about 0.25 of the cement mass) sits between the grains. When it leaves, it leaves a void.';
  } else if (mouseX > c.x && mouseX < c.x + s && mouseY > c.y && mouseY < c.y + s) {
    const inAgg = aggs.some(a => dist(mouseX, mouseY, c.x + a.x * s, c.y + a.y * s) < a.r * s * 0.85);
    hoverTip = inAgg ? 'Aggregate: sand and stone, 60 to 75 percent of the volume.' : 'Cement paste: cement and water, the glue between the aggregates.';
  }
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text(L.narrow ? 'Magnified slice (not to scale)' : 'Magnified slice of concrete (not to scale)', c.x, c.y + s + 3, max(s, 220), 20);
  const g = L.legend, dx = g.vertical ? 0 : 100, dy = g.vertical ? 20 : 0;
  legendItem(g.x, g.y, 'gray', 'Aggregate');
  legendItem(g.x + dx, g.y + dy, 'tan', 'Paste');
  legendItem(g.x + 2 * dx - (g.vertical ? 0 : 20), g.y + 2 * dy, 'white', 'Pore');
}

function legendItem(x, y, col, label) {
  stroke('dimgray');
  strokeWeight(1);
  fill(col);
  rect(x, y, 14, 14);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text(label, x + 18, y - 1);
}

// ---- Property bars ----
function drawBars(wc, over) {
  const b = L.bars;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(b.x, b.y, b.w, b.h, 8);
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Relative to a w/c = 0.45 mix (= 100)', b.x + 8, b.y + 4, b.w - 16, 20);
  const rows = [
    { name: 'Strength', f: strengthIdx, good: 'high' },
    { name: 'Permeability', f: permIdx, good: 'low' },
    { name: 'Shrinkage', f: shrinkIdx, good: 'low' }
  ];
  const lx = b.x + 8, labelW = 100, bx = lx + labelW, bw = b.w - labelW - 20;
  const top = b.y + 26, rowH = (b.h - 48) / 3;
  const mx = maxWC();
  rows.forEach((r, i) => {
    const y = top + i * rowH, v = r.f(wc), lim = r.f(mx);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text(r.name, lx, y + rowH * 0.35);
    // bar
    fill('whitesmoke');
    stroke('silver');
    strokeWeight(1);
    rect(bx, y + 4, bw, rowH * 0.5);
    noStroke();
    fill(over ? 'darkorange' : 'steelblue');
    rect(bx, y + 4, min(bw, bw * v / AXIS_MAX), rowH * 0.5);
    // value text, right-aligned in the track
    fill('black');
    textAlign(RIGHT, CENTER);
    textSize(14);
    text(nf(v, 0, 0), bx + bw - 4, y + 4 + rowH * 0.25);
    // dashed specification limit
    const lxp = bx + bw * lim / AXIS_MAX;
    stroke('black');
    strokeWeight(2);
    drawingContext.setLineDash([5, 3]);
    line(lxp, y, lxp, y + rowH * 0.5 + 8);
    drawingContext.setLineDash([]);
    if (hoverTip === null && mouseX > b.x && mouseX < b.x + b.w && mouseY > y && mouseY < y + rowH) {
      hoverTip = r.name + ' index ' + nf(v, 0, 0) + ' at w/c ' + nf(wc, 0, 2) + '. ' + (r.good === 'high' ? 'Higher is better; the limit line marks the lowest acceptable value.' : 'Lower is better; the limit line marks the highest acceptable value.');
    }
  });
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Dashed line = limit at w/c ' + nf(mx, 0, 2) + ' (' + expSel.value() + ')', b.x + 8, b.y + b.h - 20, b.w - 12, 18);
}

// ---- Truck chute and gallon counter ----
function drawTruck(wc) {
  const t = L.truck, x0 = t.x, y0 = t.y, hh = min(t.h, 96);
  // mixer truck: cab, chassis, tilted drum, and a chute running down toward the pour
  stroke('dimgray');
  strokeWeight(1);
  fill('lightgray');
  rect(x0 + 4, y0 + hh * 0.5, 62, hh * 0.28, 3);
  rect(x0 + 6, y0 + hh * 0.34, 20, hh * 0.2, 3);
  fill('darkorange');
  ellipse(x0 + 44, y0 + hh * 0.3, 56, hh * 0.4);
  fill('black');
  circle(x0 + 18, y0 + hh * 0.8, 14);
  circle(x0 + 52, y0 + hh * 0.8, 14);
  stroke('dimgray');
  strokeWeight(5);
  line(x0 + 66, y0 + hh * 0.42, x0 + 94, y0 + hh * 0.72);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Truck chute', x0 + 4, y0 + hh * 0.86 + 2);
  // gallon counter
  const cx = x0 + 106, cw = max(110, t.w - 112), chh = min(t.h, 92);
  stroke('dimgray');
  strokeWeight(2);
  fill('lemonchiffon');
  rect(cx, y0, cw, chh, 8);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Gallon counter', cx + 8, y0 + 4);
  textSize(18);
  fill(chuteGal > 0 ? 'darkorange' : 'black');
  text('Added: ' + chuteGal + ' gal', cx + 8, y0 + 24, cw - 12, 24);
  fill('black');
  textSize(14);
  text('Total water: ' + nf(wc * CEMENT / LB_PER_GAL, 0, 1) + ' gal', cx + 8, y0 + 52, cw - 12, 36);
}

// ---- Readout and verdict ----
function drawReadout(wc, over) {
  const r = L.read, mx = maxWC(), ex = EXPOSURES[expSel.value()];
  stroke(over ? 'darkorange' : 'silver');
  strokeWeight(over ? 3 : 1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  const lb = wc * CEMENT, gal = lb / LB_PER_GAL, f = strengthPsi(wc);
  const lo = round(f * 0.88 / 100) * 100, hi = round(f * 1.12 / 100) * 100;
  const fmt = v => nf(v, 0, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  fill(over ? 'darkorange' : 'seagreen');
  textAlign(LEFT, TOP);
  textSize(16);
  text(over ? 'OVER THE LIMIT: w/c ' + nf(wc, 0, 2) + ' is above the maximum ' + nf(mx, 0, 2) : 'WITHIN THE LIMIT: w/c ' + nf(wc, 0, 2) + ' is at or below the maximum ' + nf(mx, 0, 2), r.x + 8, r.y + 6, r.w - 16, 40);
  fill('black');
  textSize(14);
  const headroom = max(0, floor(((mx - wc) * CEMENT / LB_PER_GAL) * 10) / 10);
  let t = 'Water: ' + nf(gal, 0, 1) + ' gal (' + fmt(lb) + ' lb) per yd³ with ' + CEMENT + ' lb of cement.\n';
  t += 'Estimated 28-day strength: about ' + fmt(lo) + ' to ' + fmt(hi) + ' psi (illustrative).\n';
  if (over) t += 'At risk: ' + ex.risk + '. Strength falls and shrinkage rises too. Do not add water; ask the supplier for a water-reducing admixture, and follow the specification.';
  else t += 'Room under the limit: ' + nf(headroom, 0, 1) + ' gal per yd³ could be added before reaching w/c ' + nf(mx, 0, 2) + ', but only if the specification allows it.';
  if (!L.narrow) {
    fill('dimgray');
    text('Try it: set 0.45 with Exterior walk, then press Add 5 gal at the chute. Chapter 8 finds the ratio rises from 0.45 to 0.52.', r.x + 8, r.y + r.h - 44, r.w - 16, 40);
    fill('black');
  }
  text(t, r.x + 8, r.y + (textWidth(over ? 'OVER THE LIMIT: w/c ' + nf(wc, 0, 2) + ' is above the maximum ' + nf(mx, 0, 2) : 'WITHIN THE LIMIT: w/c ' + nf(wc, 0, 2) + ' is at or below the maximum ' + nf(mx, 0, 2)) > r.w - 16 ? 44 : 26), r.w - 16, r.h - 34);
}

function drawControlLabels(wc) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y0 = drawHeight;
  text('Water-cement ratio: ' + nf(wcSlider.value(), 0, 2), 10, y0 + 20);
  text('Exposure (max w/c ' + nf(maxWC(), 0, 2) + '):', 10, y0 + 54);
}

function drawTooltip() {
  if (!hoverTip || mouseX < 0 || mouseY < 0 || mouseX > canvasWidth || mouseY > drawHeight) return;
  const w = min(320, canvasWidth - 12);
  textSize(14);
  const lines = ceil(textWidth(hoverTip) / (w - 16)) + 0.2;
  const h = max(30, lines * 18 + 10);
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(hoverTip, tx + 8, ty + 6, w - 16, h - 8);
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
