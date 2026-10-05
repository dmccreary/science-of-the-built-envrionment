// Service Life Factor Calculator MicroSim - estimated service life = reference service life x seven ISO 15686 factors, with a ranking of which factor matters most
// CANVAS_HEIGHT: 710
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 490;
let controlHeight = 220; // six rows of controls on a narrow screen, four on a wide one
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10;
let defaultTextSize = 16;

const WIDE_MIN = 640;
const CELL_H = 35;

// ---- Data: components and their reference service lives in years (illustrative; the roof membrane is the Chapter 21 example) ----
const COMPONENTS = { 'Roof membrane': 25, 'Window': 30, 'Exterior paint': 8, 'HVAC rooftop unit': 20 };

// ---- Data: the seven factors of the ISO 15686 factor method. def is the Riverbend value from Chapter 21 (illustrative) ----
const FACTORS = [
  { name: 'Component quality', def: 1.0, hint: 'Quality of components: how good the product itself is. A tested, premium product raises it; a bargain product or one stored badly lowers it.' },
  { name: 'Design level', def: 0.9, hint: 'Design level: how well the detailing protects the component. Good drainage and protected edges raise it; a detail that traps water, like the Riverbend roof, lowers it.' },
  { name: 'Work quality', def: 0.9, hint: 'Quality of work: how well the product was installed. Skilled crews and good weather raise it; rushed work in cool, wet weather lowers it.' },
  { name: 'Indoor environment', def: 1.0, hint: 'Indoor environment: the conditions inside. A stable, dry interior raises it; high humidity or heat lowers it.' },
  { name: 'Outdoor environment', def: 0.8, hint: 'Outdoor environment: the climate exposure. A mild, sheltered site raises it; severe freeze-thaw, snow, and sunlight, as in Minnesota, lower it.' },
  { name: 'In-use conditions', def: 1.0, hint: 'In-use conditions: wear from how the building is used. Light use raises it; heavy traffic, abuse, or extra loads lower it.' },
  { name: 'Maintenance', def: 1.1, hint: 'Maintenance level: how well upkeep is done. Inspections twice a year and prompt repairs raise it; neglected upkeep lowers it.' }
];

// ---- State ----
let hoverIdx = -1;      // slider the pointer is over, or last changed
let sliderTop = 0;      // y of the first row of slider cells
let r = {};             // results of the latest calculation

// ---- Controls ----
let compSelect, goodButton, resetButton, sliders = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  compSelect = createSelect();
  Object.keys(COMPONENTS).forEach(k => compSelect.option(k));
  compSelect.selected('Roof membrane');
  goodButton = createButton('Apply good maintenance');
  goodButton.mousePressed(() => sliders[6].value(1.1));
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);
  FACTORS.forEach((f, i) => {
    const s = createSlider(0.6, 1.2, f.def, 0.01);
    s.mouseOver(() => { hoverIdx = i; });
    s.mouseOut(() => { hoverIdx = -1; });
    s.input(() => { hoverIdx = i; });
    sliders.push(s);
  });

  positionControls();
  describe('Two horizontal bars compare the reference service life in gray with the estimated service life of a building component, green when above the reference and orange when below. Seven sliders set the factors of the ISO 15686 factor method from 0.6 to 1.2, and a ranked list shows which factors shorten or lengthen the estimate the most, in years. A message states the years gained or lost.', LABEL);
}

function resetAll() {
  compSelect.selected('Roof membrane');
  FACTORS.forEach((f, i) => sliders[i].value(f.def));
}

// ---- Controls: dropdown and buttons flow left to right and wrap; sliders sit in a grid with the label above each ----
function cols() { return canvasWidth >= WIDE_MIN ? 3 : 2; }

function positionControls() {
  compSelect.size(min(190, canvasWidth - 20));
  let x = 10, y = drawHeight + 6;
  [compSelect, goodButton, resetButton].forEach(el => {
    const w = el === compSelect ? min(190, canvasWidth - 20) : (el.elt.offsetWidth || 150);
    if (x + w > canvasWidth - 8 && x > 10) { x = 10; y += CELL_H; }
    el.position(x, y);
    x += w + 8;
  });
  const startY = y + CELL_H, n = cols(), cw = (canvasWidth - 10) / n - 12;
  sliders.forEach((s, i) => {
    s.position(10 + (i % n) * (canvasWidth - 10) / n, startY + floor(i / n) * CELL_H + 18);
    s.size(cw);
  });
  sliderTop = startY;
}

// ---- Calculation: reference life times the product of the seven factors ----
function calculate() {
  const ref = COMPONENTS[compSelect.value()];
  const f = sliders.map(s => s.value());
  const ratio = f.reduce((a, b) => a * b, 1);
  const est = ref * ratio;
  const effects = f.map((v, i) => ({ i, v, years: est - est / v }));
  effects.sort((a, b) => Math.abs(b.years) - Math.abs(a.years));
  r = { ref, f, ratio, est, effects };
}

function draw() {
  updateCanvasSize();
  calculate();

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
  text('Service Life Factor Calculator', canvasWidth / 2, 6);

  const wide = canvasWidth >= WIDE_MIN;
  const leftW = wide ? floor(canvasWidth * 0.58) : canvasWidth;
  drawBars(10, 40, leftW - 20);
  const fy = wide ? 170 : 154;
  const fh = drawFormula(10, fy, leftW - 20);
  const mh = drawMessage(10, fy + fh + 8, leftW - 20);
  if (wide) drawRanking(leftW + 6, 40, canvasWidth - leftW - 16, 30);
  else drawRanking(10, fy + fh + mh + 14, canvasWidth - 20, 20);
  drawHint();
  drawControlLabels();
}

// ---- Bars: reference in gray, estimate in green (above) or orange (below) ----
function drawBars(x, y, w) {
  const maxV = niceMax(max(r.ref, r.est) * 1.02);
  const barH = 30;
  const col = r.est > r.ref + 0.05 ? 'seagreen' : (r.est < r.ref - 0.05 ? 'darkorange' : 'steelblue');
  noStroke();
  fill('black');
  textSize(15);
  textAlign(LEFT, TOP);
  text('Reference service life: ' + r.ref + ' years (illustrative)', x, y);
  stroke('dimgray'); strokeWeight(1); fill('gray');
  rect(x, y + 20, w * r.ref / maxV, barH);
  noStroke(); fill('black');
  text('Estimated service life: ' + r.est.toFixed(1) + ' years, ratio ' + r.ratio.toFixed(2) + ' of the reference', x, y + 20 + barH + 6);
  stroke('dimgray'); strokeWeight(1); fill(col);
  rect(x, y + 20 + barH + 26, w * r.est / maxV, barH);
  // reference tick on the estimate bar
  stroke('black'); strokeWeight(2);
  drawingContext.setLineDash([4, 3]);
  const tx = x + w * r.ref / maxV;
  line(tx, y + 20 + barH + 22, tx, y + 20 + 2 * barH + 30);
  drawingContext.setLineDash([]);
  // years labels inside the bars
  noStroke(); fill('white'); textSize(15); textAlign(RIGHT, CENTER);
  text(r.ref + ' yr', x + w * r.ref / maxV - 6, y + 20 + barH / 2);
  text(r.est.toFixed(1) + ' yr', x + max(60, w * r.est / maxV) - 6 - (abs(x + w * r.est / maxV - tx) < 70 ? 10 : 0), y + 20 + barH + 26 + barH / 2);
}

function niceMax(v) {
  const p = Math.pow(10, Math.floor(Math.log10(v))), f = v / p;
  return [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(m => f <= m + 1e-9) * p;
}

// ---- The arithmetic written out ----
function drawFormula(x, y, w) {
  noStroke(); fill('black'); textSize(14); textAlign(LEFT, TOP);
  const t = 'Factor method: ' + r.ref + ' × ' + r.f.map(v => v.toFixed(2)).join(' × ') + ' = ' + r.est.toFixed(1) + ' years';
  text(t, x, y, w);
  return wrapLines(t, w).length * 17;
}

function wrapLines(str, w) {
  const out = [];
  let ln = '';
  for (const word of str.split(' ')) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { out.push(ln); ln = word; } else ln = t;
  }
  if (ln) out.push(ln);
  return out;
}

function drawMessage(x, y, w) {
  const diff = r.est - r.ref, pct = abs(diff) / r.ref * 100;
  let msg, col;
  if (abs(diff) < 0.05) { msg = 'Estimate equals the reference value of ' + r.ref + ' years.'; col = 'steelblue'; }
  else if (diff > 0) { msg = 'You gain ' + diff.toFixed(1) + ' years compared with the reference value (' + pct.toFixed(0) + ' percent longer).'; col = 'seagreen'; }
  else { msg = 'You lose ' + abs(diff).toFixed(1) + ' years compared with the reference value (' + pct.toFixed(0) + ' percent shorter).'; col = 'darkorange'; }
  textSize(15); textStyle(BOLD);
  const h = wrapLines(msg, w - 16).length * 19 + 10;
  stroke(col); strokeWeight(2); fill('white');
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  text(msg, x + 8, y + 5, w - 16);
  textStyle(NORMAL);
  return h;
}

// ---- Ranking: how many years each factor adds or removes compared with a factor of 1.0 ----
function drawRanking(x, y, w, rowH) {
  noStroke(); fill('black'); textSize(15); textAlign(LEFT, TOP);
  const compact = rowH < 24;
  textStyle(BOLD); text(compact ? 'Which factor matters most? (years vs 1.0)' : 'Which factor matters most?', x, y); textStyle(NORMAL);
  if (!compact) { textSize(13); fill('dimgray'); text('Years added or removed versus a factor of 1.0', x, y + 18); }
  const top = y + (compact ? 22 : 38), barW = w < 330 ? 50 : 70, mid = x + w - barW / 2 - 4;
  r.effects.forEach((e, k) => {
    const ry = top + k * rowH, none = abs(e.years) < 0.05;
    noStroke(); fill(none ? 'dimgray' : 'black'); textSize(14); textAlign(LEFT, CENTER);
    text((k + 1) + '. ' + FACTORS[e.i].name + ' ' + e.v.toFixed(2), x, ry + rowH / 2, w - barW - 78);
    textAlign(RIGHT, CENTER);
    const lab = none ? 'no effect' : (e.years < 0 ? 'shortens ' + abs(e.years).toFixed(1) : 'adds ' + e.years.toFixed(1));
    text(lab, x + w - barW - 8, ry + rowH / 2);
    // diverging bar: left of center shortens, right lengthens
    stroke('silver'); strokeWeight(1); line(mid, ry + 3, mid, ry + rowH - 3);
    if (!none) {
      const len = constrain(abs(e.years) / max(1, r.est) * barW * 1.4, 2, barW / 2);
      noStroke(); fill(e.years < 0 ? 'darkorange' : 'seagreen');
      rect(e.years < 0 ? mid - len : mid, ry + 5, len, rowH - 10);
    }
    if (e.i === hoverIdx) { noFill(); stroke('navy'); strokeWeight(2); rect(x - 4, ry, w + 6, rowH, 4); }
  });
}

// ---- Hover strip: explanation of the factor under the pointer ----
function drawHint() {
  const h = canvasWidth >= WIDE_MIN ? 50 : 66, y = drawHeight - h - 6, x = 8, w = canvasWidth - 16;
  stroke('silver'); strokeWeight(1); fill('white');
  rect(x, y, w, h, 6);
  noStroke(); fill('black'); textSize(14); textAlign(LEFT, TOP);
  if (hoverIdx < 0) { fill('dimgray'); text('Hover over a slider to see what the factor means and what raises or lowers it.', x + 8, y + 6, w - 16); }
  else text(FACTORS[hoverIdx].hint, x + 8, y + 6, w - 16);
}

// ---- Slider labels with the current value ----
function drawControlLabels() {
  noStroke(); fill('black'); textSize(14); textAlign(LEFT, TOP);
  const n = cols();
  FACTORS.forEach((f, i) => {
    text(String.fromCharCode(65 + i) + ' ' + f.name + ': ' + sliders[i].value().toFixed(2), 10 + (i % n) * (canvasWidth - 10) / n, sliderTop + floor(i / n) * CELL_H + 1);
  });
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
