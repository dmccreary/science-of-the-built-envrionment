// USCS Soil Classifier MicroSim - sieve analysis in, simplified Unified Soil Classification System symbol and behavior out
// CANVAS_HEIGHT: 585
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 175;
let defaultTextSize = 16;

// ---- Data ----
const ORDER = ['g', 's', 'f'];
const NAMES = { g: 'Gravel', s: 'Sand', f: 'Fines' };
const PART_COL = { g: 'lightslategray', s: 'khaki', f: 'peru' };
let vals = { g: 8, s: 62, f: 30 }; // percent retained: gravel on No. 4, sand on No. 200, fines in the pan

// the four decision boxes of the simplified USCS path
const nodes = [
  { q: 'More than 50% retained on the No. 200 sieve?', why: 'This test sorts coarse-grained soils, mostly sand and gravel, from fine-grained soils, mostly silt and clay, because the two groups behave very differently when wet.' },
  { q: 'More than half of the coarse part is sand?', why: 'Gravel and sand differ in particle size and drainage, so the coarse part is split at the No. 4 sieve into gravel (larger) and sand (smaller).' },
  { q: 'More than 12% fines?', why: 'Once fines pass about 12 percent they control how the soil behaves, so their plasticity must be checked; below 5 percent the coarse grains dominate.' },
  { q: 'Are the fines low or high plasticity?', why: 'Plasticity from the Atterberg limits tells a low-plasticity silt from a high-plasticity clay. Simplified here: the full USCS also uses a plasticity chart to split CL, ML, CH, and MH.' }
];

// sieve hover text
const sieveTips = {
  g: 'No. 4 sieve: opening 4.75 mm. Particles larger than this are gravel and stay on the sieve.',
  s: 'No. 200 sieve: opening 0.075 mm. Particles between 0.075 and 4.75 mm are sand and stay on this sieve.',
  f: 'Pan: collects the fines, silt and clay particles smaller than 0.075 mm, which pass the No. 200 sieve.'
};

// ---- State ----
let selNode = -1;       // decision box whose explanation is open
let R = {};             // layout rectangles
let boxRects = [];      // decision box hit areas
let sieveRects = {};    // hover areas for the sieves and bar segments

// ---- Controls ----
let sliders = {}, plastSel, randomButton, loadButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  ORDER.forEach(k => {
    sliders[k] = createSlider(0, 100, vals[k], 1);
    sliders[k].input(() => onSlide(k));
  });
  plastSel = createSelect();
  plastSel.option('Low plasticity');
  plastSel.option('High plasticity');
  plastSel.selected('Low plasticity');
  randomButton = createButton('Random sample');
  randomButton.mousePressed(randomSample);
  loadButton = createButton('Load Riverbend boring B-2');
  loadButton.mousePressed(loadB2);
  positionControls();
  describe('A sieve analysis tool for the simplified Unified Soil Classification System. Three sliders set percent gravel, sand, and fines, always summing to 100. A column of three sieves and a stacked bar show what each sieve retains. A four-box flowchart highlights the decision path, and a result card gives the soil symbol, name, and drainage, strength, and frost ratings. Boring B-2 loads as silty sand, SM.', LABEL);
}

function sliderWidth() { return max(100, canvasWidth - sliderLeftMargin - 25); }
function positionControls() {
  ORDER.forEach((k, i) => { sliders[k].position(sliderLeftMargin, drawHeight + 8 + i * 35); sliders[k].size(sliderWidth()); });
  plastSel.position(sliderLeftMargin, drawHeight + 113);
  randomButton.position(sliderLeftMargin + 125, drawHeight + 113);
  loadButton.position(10, drawHeight + 148);
}

// adjusting one slider rescales the other two so the total stays 100
function onSlide(k) {
  const v = sliders[k].value();
  const [a, b] = ORDER.filter(o => o !== k);
  const rest = 100 - v, tot = vals[a] + vals[b];
  const na = tot === 0 ? floor(rest / 2) : round(rest * vals[a] / tot);
  vals[k] = v; vals[a] = na; vals[b] = rest - na;
  syncSliders();
}
function syncSliders() { ORDER.forEach(k => sliders[k].value(vals[k])); }
function loadB2() { vals = { g: 8, s: 62, f: 30 }; syncSliders(); plastSel.selected('Low plasticity'); }
function randomSample() {
  const c1 = floor(random(101)), c2 = floor(random(101));
  const lo = min(c1, c2), hi = max(c1, c2);
  const parts = [lo, hi - lo, 100 - hi].sort(() => random() - 0.5);
  vals = { g: parts[0], s: parts[1], f: parts[2] };
  syncSliders();
  plastSel.selected(random() < 0.5 ? 'Low plasticity' : 'High plasticity');
}

// ---- Classifier: returns the symbol, name, path through the boxes, answers, and behavior ratings ----
function classify() {
  const g = vals.g, s = vals.s, f = vals.f, coarse = g + s, low = plastSel.value().startsWith('Low');
  const r = { path: [0], ans: [], rate: null };
  const fmt = n => round(n);
  r.ans[0] = (coarse > 50 ? 'Yes: ' : 'No: ') + coarse + '% (gravel + sand)';
  if (coarse <= 50) {
    r.path.push(3);
    r.ans[3] = low ? 'Low: silt' : 'High: clay';
    r.symbol = low ? 'ML' : 'CH';
    r.name = low ? 'Silt, low plasticity' : 'Clay, high plasticity';
    r.rate = low ? [1, 'Poor', 1, 'Low to moderate', 4, 'Very high'] : [0, 'Very poor', 1, 'Low when wet', 3, 'Moderate to high'];
    return r;
  }
  const sandFrac = s / coarse * 100, sand = s > g;
  r.path.push(1);
  r.ans[1] = (sand ? 'Yes: sand is ' : 'No: gravel is ') + fmt(sand ? sandFrac : 100 - sandFrac) + '%';
  r.path.push(2);
  r.ans[2] = (f > 12 ? 'Yes: ' : 'No: ') + f + '% fines';
  const L = sand ? 'S' : 'G';
  const noun = sand ? 'sand' : 'gravel';
  if (f > 12) {
    r.path.push(3);
    r.ans[3] = low ? 'Low: silty' : 'High: clayey';
    r.symbol = L + (low ? 'M' : 'C');
    r.name = (low ? 'Silty ' : 'Clayey ') + noun;
    if (low) r.rate = sand ? [2, 'Moderate', 3, 'Good when dry', 2, 'Moderate'] : [2, 'Moderate', 3, 'Moderate to high', 2, 'Moderate'];
    else r.rate = [1, 'Poor', 2, 'Moderate', 2, 'Moderate'];
  } else if (f > 5) {
    r.symbol = L + 'W/' + L + 'P-' + L + (low ? 'M' : 'C');
    r.name = (sand ? 'Sand' : 'Gravel') + ' with ' + (low ? 'silt' : 'clay') + ' (dual symbol)';
    r.rate = sand ? [3, 'Good', 3, 'Moderate to high', 1, 'Low to moderate'] : [3, 'Good', 4, 'High', 1, 'Low to moderate'];
  } else {
    r.symbol = L + 'W/' + L + 'P';
    r.name = 'Clean ' + noun + ' (grading decides W or P)';
    r.rate = sand ? [3, 'Good', 3, 'Moderate to high', 0, 'Low'] : [4, 'Excellent', 4, 'High', 0, 'Low'];
  }
  return r;
}

// ---- Layout ----
function layout() {
  const W = canvasWidth, wide = W >= 640;
  const top = 44, cardH = W >= 640 ? 90 : 98, cardY = drawHeight - cardH - 6;
  const leftW = wide ? floor(W * 0.34) : 140;
  R = { wide, top, cardY, cardH, regionH: cardY - top - 6, leftW };
  R.flow = { x: 10 + leftW + 8, y: top, w: W - leftW - 28, h: R.regionH };
}

function draw() {
  updateCanvasSize();
  layout();
  const res = classify();

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
  text('USCS Soil Classifier', canvasWidth / 2, 8);

  drawSieves();
  drawFlow(res);
  drawCard(res);
  if (selNode >= 0) drawExplanation();
  drawHover();
  drawControlLabels();
}

// ---- Left column: sieve stack and stacked bar ----
function drawSieves() {
  const x0 = 10, y0 = R.top, w = R.leftW, H = R.regionH;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x0, y0, w, H, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  if (R.wide) text('Sieve analysis', x0 + 8, y0 + 4);
  else { textSize(12); text('G gravel, S sand, F fines', x0 + 8, y0 + 6); }

  const sw = R.wide ? 120 : 74, barW = R.wide ? 36 : 46;
  const sx = x0 + 8, sy = y0 + 26, gap = 6;
  const sh = (H - 26 - 8 - 2 * gap) / 3;
  const bx = sx + sw + 14, bh = H - 26 - 8;
  const info = [['g', 'No. 4'], ['s', 'No. 200'], ['f', 'Pan']];
  sieveRects = {};
  info.forEach((it, i) => {
    const k = it[0], y = sy + i * (sh + gap);
    // retained material fills from the bottom of each sieve in proportion to its percent
    stroke('dimgray');
    strokeWeight(2);
    fill('whitesmoke');
    if (k === 'f') rect(sx, y, sw, sh, 2, 2, 14, 14); else rect(sx, y, sw, sh, 2);
    noStroke();
    fill(PART_COL[k]);
    const ph = (sh - 4) * vals[k] / 100;
    rect(sx + 2, y + sh - 2 - ph, sw - 4, ph);
    if (k !== 'f') { // mesh lines
      stroke(90, 90, 90, 90);
      strokeWeight(1);
      for (let mx = sx + 6; mx < sx + sw - 4; mx += 8) line(mx, y + sh - 4, mx, y + sh - 1);
    }
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text(it[1], sx + 5, y + 3);
    textSize(16);
    text(vals[k] + '%', sx + 5, y + 20);
    sieveRects[k] = [{ x: sx, y, w: sw, h: sh }];
  });
  // stacked bar: gravel on top, then sand, then fines
  let by = sy;
  ORDER.forEach(k => {
    const h = bh * vals[k] / 100;
    stroke('dimgray');
    strokeWeight(1);
    fill(PART_COL[k]);
    rect(bx, by, barW, h);
    noStroke();
    fill('black');
    textSize(R.wide ? 14 : 13);
    textAlign(LEFT, CENTER);
    if (h >= 16) text(R.wide ? vals[k] + '%' : NAMES[k][0] + ' ' + vals[k] + '%', bx + 3, by + h / 2);
    if (R.wide && h >= 16) { textAlign(LEFT, CENTER); text(NAMES[k], bx + barW + 6, by + h / 2); }
    sieveRects[k].push({ x: bx, y: by, w: barW, h });
    by += h;
  });
}

// ---- Right column: the decision path flowchart ----
function drawFlow(res) {
  const f = R.flow, gap = 12, gut = 14;
  const bh = (f.h - 3 * gap) / 4, bw = f.w - gut;
  boxRects = [];
  nodes.forEach((n, i) => {
    const y = f.y + i * (bh + gap), on = res.path.includes(i);
    boxRects.push({ x: f.x, y, w: bw, h: bh });
    // arrow into this box from the previous box on the path
    if (i > 0) {
      const prev = res.path[res.path.indexOf(i) - 1];
      const direct = on && prev === i - 1;
      stroke(direct ? 'navy' : 'silver');
      strokeWeight(direct ? 3 : 1);
      line(f.x + bw / 2, y - gap, f.x + bw / 2, y);
      noStroke();
      fill(direct ? 'navy' : 'silver');
      triangle(f.x + bw / 2, y, f.x + bw / 2 - 5, y - 8, f.x + bw / 2 + 5, y - 8);
    }
    stroke(on ? 'navy' : 'silver');
    strokeWeight(on ? 3 : 1);
    fill(on ? 'lightskyblue' : 'gainsboro');
    if (i === selNode) { stroke('darkorange'); strokeWeight(4); }
    rect(f.x, y, bw, bh, 8);
    noStroke();
    fill(on ? 'black' : 'dimgray');
    textAlign(LEFT, TOP);
    textSize(14);
    const used = wrapText((i + 1) + '. ' + n.q, f.x + 8, y + 4, bw - 16, 16);
    fill(on ? 'navy' : 'dimgray');
    textSize(13);
    text(on ? res.ans[i] : 'Skipped for this soil', f.x + 8, used + 1);
  });
  // bypass line when the soil is fine-grained: box 1 jumps to box 4
  if (!res.path.includes(1)) {
    const x = f.x + bw + 7, y1 = boxRects[0].y + bh / 2, y4 = boxRects[3].y + bh / 2;
    stroke('navy');
    strokeWeight(3);
    line(f.x + bw, y1, x, y1);
    line(x, y1, x, y4);
    line(x, y4, f.x + bw + 2, y4);
    noStroke();
    fill('navy');
    triangle(f.x + bw, y4, f.x + bw + 8, y4 - 5, f.x + bw + 8, y4 + 5);
  }
}

// ---- Result card ----
function drawCard(res) {
  const x = 10, y = R.cardY, w = canvasWidth - 20, h = R.cardH;
  stroke('seagreen');
  strokeWeight(3);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  const long = res.symbol.length > 3;
  textAlign(LEFT, CENTER);
  textSize(long ? 22 : 40);
  const symW = R.wide ? 140 : 100;
  fill('navy');
  text(res.symbol, x + 12, y + (R.wide ? h / 2 : 26));
  fill('black');
  textSize(16);
  if (R.wide) {
    wrapText(res.name, x + 12 + symW, y + (h - wrapCount(res.name, 190) * 19) / 2, 190, 19);
  } else {
    wrapText(res.name, x + 12 + symW, y + 26 - wrapCount(res.name, w - symW - 24) * 9, w - symW - 24, 18);
  }
  const names = ['Drainage', 'Strength', 'Frost susceptibility'];
  const shortNames = ['Drainage', 'Strength', 'Frost risk'];
  const bw = R.wide ? (w - symW - 200 - 30) / 3 : (w - 16) / 3;
  const by = R.wide ? y + 8 : y + 52;
  for (let i = 0; i < 3; i++) {
    const ix = R.wide ? x + 12 + symW + 200 + i * bw : x + 8 + i * bw;
    drawRating(i, ix, by, bw, res.rate[i * 2], res.rate[i * 2 + 1], R.wide ? names[i] : shortNames[i]);
  }
}

// icon + label + rating text + four-step meter
function drawRating(kind, x, y, w, level, label, title) {
  const ic = x + 14, icy = y + (R.wide ? 22 : 15);
  noStroke();
  if (kind === 0) { // water drop
    fill('deepskyblue');
    triangle(ic, icy - 12, ic - 8, icy + 2, ic + 8, icy + 2);
    circle(ic, icy + 4, 16);
  } else if (kind === 1) { // block on a footing with a load arrow
    fill('gray');
    rect(ic - 11, icy + 4, 22, 8);
    fill('dimgray');
    rect(ic - 4, icy - 6, 8, 10);
    fill('crimson');
    triangle(ic, icy - 7, ic - 5, icy - 13, ic + 5, icy - 13);
  } else { // snowflake
    stroke('steelblue');
    strokeWeight(2);
    for (let a = 0; a < 3; a++) line(ic + 11 * cos(a * PI / 3), icy + 11 * sin(a * PI / 3), ic - 11 * cos(a * PI / 3), icy - 11 * sin(a * PI / 3));
    noStroke();
  }
  fill('black');
  textAlign(LEFT, TOP);
  textSize(R.wide ? 14 : 13);
  text(title, x + 30, y + 1);
  textSize(R.wide ? 14 : 13);
  wrapText(label, x + 30, y + (R.wide ? 19 : 16), w - 32, R.wide ? 17 : 15);
  if (!R.wide) return;
  // meter (wide layout): four squares, filled = level (more is better for drainage and strength, worse for frost)
  const my = y + 19 + 17 + 4;
  for (let m = 0; m < 4; m++) {
    stroke('gray');
    strokeWeight(1);
    fill(m < level ? (kind === 2 ? 'darkorange' : 'steelblue') : 'white');
    rect(x + 30 + m * 14, my, 11, 9);
  }
}

// ---- Explanation bubble for a clicked decision box ----
function drawExplanation() {
  const b = boxRects[selNode], f = R.flow;
  textSize(14);
  const w = f.w - 10;
  const h = wrapCount(nodes[selNode].why, w - 20) * 17 + 14;
  const y = selNode < 3 ? min(b.y + b.h - 8, R.cardY - h - 4) : b.y - h + 12;
  stroke('darkorange');
  strokeWeight(3);
  fill(255, 255, 230);
  rect(f.x + 5, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  wrapText(nodes[selNode].why, f.x + 15, y + 7, w - 20, 17);
}

// ---- Hover tooltip for sieves and bar segments ----
function drawHover() {
  let tip = null;
  for (const k of ORDER) for (const r of (sieveRects[k] || [])) if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) tip = sieveTips[k];
  if (!tip) return;
  textSize(14);
  const w = min(canvasWidth - 20, 270);
  const h = wrapCount(tip, w - 16) * 17 + 12;
  const x = min(max(mouseX + 12, 6), canvasWidth - w - 6);
  const y = min(mouseY + 14, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  wrapText(tip, x + 8, y + 6, w - 16, 17);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  ORDER.forEach((k, i) => text(NAMES[k] + ': ' + vals[k] + ' percent', 10, drawHeight + 20 + i * 35));
  text('Fines plasticity:', 10, drawHeight + 125);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  const hit = boxRects.findIndex(b => mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h);
  selNode = (hit === selNode) ? -1 : hit;
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
function wrapCount(str, w) {
  let n = 1, line = '';
  for (const word of str.split(' ')) {
    const trial = line ? line + ' ' + word : word;
    if (textWidth(trial) > w && line) { n++; line = word; } else line = trial;
  }
  return n;
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
