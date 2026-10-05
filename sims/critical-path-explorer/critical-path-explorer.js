// Critical Path Explorer MicroSim - forward and backward pass on the eight Riverbend structure activities, with sliders for each duration
// CANVAS_HEIGHT: 550
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 130; // two rows of four sliders (46 px each) plus one row of buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10; // left edge of the first slider column
let defaultTextSize = 16;

// ---- Data: the eight Riverbend activities (durations in working days, from the chapter's worked example) ----
const acts = [
  { id: 'A', name: 'Excavate', pred: [], dur: 4 },
  { id: 'B', name: 'Footings', pred: ['A'], dur: 3 },
  { id: 'C', name: 'Fdn walls', pred: ['B'], dur: 5 },
  { id: 'D', name: 'Utilities', pred: ['C'], dur: 4 },
  { id: 'E', name: 'Slab', pred: ['D'], dur: 2 },
  { id: 'F', name: 'Trusses', pred: [], dur: 15 },
  { id: 'G', name: 'Frame walls', pred: ['E'], dur: 6 },
  { id: 'H', name: 'Set trusses', pred: ['G', 'F'], dur: 3 }
];
const fullNames = { A: 'Excavate', B: 'Pour footings', C: 'Foundation walls', D: 'Underground utilities', E: 'Pour slab', F: 'Order roof trusses', G: 'Frame walls', H: 'Set trusses' };
const defaultDur = acts.map(a => a.dur);
const MAX_DAYS = 30;       // slider maximum (the 10-day truss slip needs room above 20)
const idx = {};
acts.forEach((a, i) => { idx[a.id] = i; });

// ---- State ----
let calc = {};             // results of the latest forward and backward pass
let boxes = [];            // screen rectangles for the boxes
let hoverIdx = -1;

// ---- Controls ----
let sliders = [], slipButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  acts.forEach((a, i) => {
    const s = createSlider(1, MAX_DAYS, a.dur, 1);
    s.position(sliderX(i), sliderY(i));
    s.size(sliderW());
    sliders.push(s);
  });
  slipButton = createButton('Slip the truss delivery');
  slipButton.position(10, drawHeight + 98);
  slipButton.mousePressed(slipTrusses);
  resetButton = createButton('Reset');
  resetButton.position(190, drawHeight + 98);
  resetButton.mousePressed(resetAll);

  describe('A left-to-right network of eight construction activities, A through H, drawn as boxes with arrows. Each box shows the activity name, its duration, earliest start, earliest finish, and float. Boxes on the critical path have a heavy orange border and orange arrows. Eight sliders change each duration from 1 to 30 days and the network recalculates the project duration. A button slips the truss delivery by 10 days, which changes the critical path.', LABEL);
}

// slider grid: 4 columns by 2 rows, in the control area
function cellW() { return (canvasWidth - 20) / 4; }
function sliderX(i) { return sliderLeftMargin + (i % 4) * cellW(); }
function sliderY(i) { return drawHeight + 4 + floor(i / 4) * 46 + 18; }
function sliderW() { return max(60, cellW() - 14); }

function slipTrusses() {
  const s = sliders[idx.F];
  s.value(min(MAX_DAYS, s.value() + 10));
}
function resetAll() { sliders.forEach((s, i) => s.value(defaultDur[i])); }

// ---- Forward pass (earliest start/finish) and backward pass (latest start/finish, float) ----
function computeSchedule() {
  const n = acts.length;
  const dur = sliders.map(s => s.value());
  const es = new Array(n).fill(0), ef = new Array(n).fill(0), ls = new Array(n), lf = new Array(n), fl = new Array(n);
  for (let i = 0; i < n; i++) {
    es[i] = max(0, ...acts[i].pred.map(p => ef[idx[p]]));
    ef[i] = es[i] + dur[i];
  }
  const total = max(...ef);
  for (let i = n - 1; i >= 0; i--) {
    const succ = acts.filter(a => a.pred.includes(acts[i].id)).map(a => ls[idx[a.id]]);
    lf[i] = succ.length ? min(...succ) : total;
    ls[i] = lf[i] - dur[i];
    fl[i] = ls[i] - es[i];
  }
  calc = { dur, es, ef, ls, lf, fl, total };
}
function isCritical(i) { return calc.fl[i] === 0; }
// an arrow is critical when both ends are critical and the successor starts the moment the predecessor finishes
function edgeCritical(p, s) { return isCritical(p) && isCritical(s) && calc.ef[p] === calc.es[s]; }

// ---- Layout: 7 columns when wide (F on a second row), 4 columns when narrow (three rows) ----
function layoutBoxes() {
  const wide = canvasWidth >= 640;
  const cols = wide ? 7 : 4;
  const gap = wide ? 22 : 14;
  const bw = (canvasWidth - 20 - gap * (cols - 1)) / cols;
  const bh = wide ? 80 : 72;
  const rowGap = wide ? 40 : 14;
  const y0 = wide ? 86 : 78;
  const pos = wide
    ? { A: [0, 0], B: [0, 1], C: [0, 2], D: [0, 3], E: [0, 4], G: [0, 5], H: [0, 6], F: [1, 0] }
    : { A: [0, 0], B: [0, 1], C: [0, 2], D: [0, 3], E: [1, 0], G: [1, 1], H: [1, 2], F: [2, 0] };
  boxes = acts.map(a => {
    const [r, c] = pos[a.id];
    return { x: 10 + c * (bw + gap), y: y0 + r * (bh + rowGap), w: bw, h: bh, row: r, col: c };
  });
  return { wide, bw, bh, rowGap, y0 };
}

function draw() {
  updateCanvasSize();
  computeSchedule();
  const lay = layoutBoxes();

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
  text('Critical Path Explorer', canvasWidth / 2, 8);

  hoverIdx = -1;
  if (mouseY >= 0 && mouseY < drawHeight) boxes.forEach((b, i) => { if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) hoverIdx = i; });
  sliders.forEach((s, i) => { if (s.elt.matches(':hover') || document.activeElement === s.elt) hoverIdx = i; });

  drawReadout();
  drawEdges();
  boxes.forEach((b, i) => drawBox(b, i));
  drawInfo(lay);
  drawControlLabels();
  cursor(hoverIdx >= 0 ? HAND : ARROW);
}

function drawReadout() {
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  const diff = calc.total - 27;
  text('Project duration: ' + calc.total + ' days' + (diff === 0 ? ' (the worked example)' : ' (' + (diff > 0 ? '+' : '') + diff + (abs(diff) === 1 ? ' day' : ' days') + ' vs 27)'), canvasWidth / 2, 38);
  textStyle(NORMAL);
  textSize(14);
  const crit = acts.filter((a, i) => isCritical(i)).map(a => a.id).join(', ');
  text('Critical activities (float 0): ' + crit, canvasWidth / 2, 58);
}

// ---- Arrows ----
function drawArrow(pts, crit) {
  stroke(crit ? 'darkorange' : 'gray');
  strokeWeight(crit ? 4 : 2);
  noFill();
  beginShape();
  pts.forEach(p => vertex(p[0], p[1]));
  endShape();
  const a = pts[pts.length - 1], b = pts[pts.length - 2];
  const ang = atan2(a[1] - b[1], a[0] - b[0]);
  noStroke();
  fill(crit ? 'darkorange' : 'gray');
  triangle(a[0], a[1], a[0] - 11 * cos(ang - 0.4), a[1] - 11 * sin(ang - 0.4), a[0] - 11 * cos(ang + 0.4), a[1] - 11 * sin(ang + 0.4));
}

function drawEdges() {
  // draw non-critical arrows first so orange arrows sit on top
  for (const pass of [false, true]) {
    acts.forEach((a, si) => {
      a.pred.forEach(pid => {
        const pi = idx[pid];
        const crit = edgeCritical(pi, si);
        if (crit !== pass) return;
        const p = boxes[pi], s = boxes[si];
        let pts;
        if (p.row === s.row) {
          const y = p.y + p.h / 2;
          pts = [[p.x + p.w + 1, y], [s.x - 2, y]];
        } else if (s.row > p.row) {
          // wrap to the next row: down, across the gap between rows, down into the box
          const my = p.y + p.h + (s.y - p.y - p.h) / 2;
          pts = [[p.x + p.w / 2, p.y + p.h + 1], [p.x + p.w / 2, my], [s.x + s.w / 2, my], [s.x + s.w / 2, s.y - 2]];
        } else {
          // lower box feeding a box above: right, then up into the bottom of the box
          const y = p.y + p.h / 2;
          pts = [[p.x + p.w + 1, y], [s.x + s.w / 2, y], [s.x + s.w / 2, s.y + s.h + 2]];
        }
        drawArrow(pts, crit);
      });
    });
  }
}

// ---- Boxes ----
function drawBox(b, i) {
  const crit = isCritical(i);
  const a = acts[i];
  if (i === hoverIdx) { noFill(); stroke('navy'); strokeWeight(3); rect(b.x - 5, b.y - 5, b.w + 10, b.h + 10, 10); }
  stroke(crit ? 'darkorange' : 'steelblue');
  strokeWeight(crit ? 6 : 2);
  fill(crit ? 'cornsilk' : 'white');
  rect(b.x, b.y, b.w, b.h, 8);
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  const lines = [
    [a.id + ' ' + a.name, true],
    [calc.dur[i] + (calc.dur[i] === 1 ? ' day' : ' days'), false],
    ['ES ' + calc.es[i] + ', EF ' + calc.ef[i], false],
    [crit ? 'CRITICAL' : 'Float ' + calc.fl[i], crit]
  ];
  const lead = (b.h - 12) / 4;
  lines.forEach((ln, k) => {
    textStyle(ln[1] ? BOLD : NORMAL);
    textSize(14);
    if (textWidth(ln[0]) > b.w - 10) textSize(12);
    fill(k === 3 && crit ? 'saddlebrown' : 'black');
    text(ln[0], b.x + b.w / 2, b.y + 7 + k * lead);
  });
  textStyle(NORMAL);
}

// ---- Info panel: float and a sentence about the hovered box ----
function wrapText(str, x, y, w, lead) {
  const words = str.split(' ');
  let ln = '';
  for (const word of words) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { text(ln, x, y); y += lead; ln = word; }
    else ln = t;
  }
  if (ln) { text(ln, x, y); y += lead; }
  return y;
}

function drawInfo(lay) {
  const lastRowBottom = max(...boxes.map(b => b.y + b.h));
  const x = 10, w = canvasWidth - 20;
  const y = lay.wide ? lastRowBottom + 26 : lastRowBottom + 10;
  const h = drawHeight - y - 8;
  stroke(hoverIdx >= 0 ? (isCritical(hoverIdx) ? 'darkorange' : 'steelblue') : 'silver');
  strokeWeight(hoverIdx >= 0 ? 3 : 1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  let ty = y + 7;
  if (hoverIdx < 0) {
    wrapText('Hover over a box, or drag a slider, to see its float and why it is or is not critical. ES is the earliest start and EF the earliest finish, in working days.', x + 10, ty, w - 20, 17);
    return;
  }
  const i = hoverIdx, a = acts[i], f = calc.fl[i], t = calc.total;
  textStyle(BOLD);
  ty = wrapText(a.id + '. ' + fullNames[a.id] + ': float ' + f + (f === 1 ? ' day' : ' days') + (f === 0 ? ' (critical)' : ' (not critical)'), x + 10, ty, w - 20, 18);
  textStyle(NORMAL);
  let msg;
  if (f === 0) msg = 'The longest chain through ' + a.id + ' takes ' + t + ' days, which sets the project duration, so any delay to ' + a.id + ' delays completion.';
  else msg = 'The longest chain through ' + a.id + ' takes ' + (t - f) + ' days, ' + f + (f === 1 ? ' day' : ' days') + ' less than the ' + t + '-day critical path, so it can slip ' + f + (f === 1 ? ' day' : ' days') + ' before it delays completion.';
  wrapText(msg, x + 10, ty, w - 20, 17);
}

// ---- Slider labels: letter, name (when it fits), and value with units ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  acts.forEach((a, i) => {
    const full = a.id + ' ' + a.name + ': ' + sliders[i].value() + ' d';
    const short = a.id + ': ' + sliders[i].value() + ' d';
    text(textWidth(full) <= cellW() - 8 ? full : short, sliderX(i), sliderY(i) - 9);
  });
  textSize(12);
  fill('dimgray');
  textAlign(LEFT, CENTER);
  if (canvasWidth >= 520) text('Durations in working days (1 to ' + MAX_DAYS + ')', 380, drawHeight + 112);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  sliders.forEach((s, i) => { s.position(sliderX(i), sliderY(i)); s.size(sliderW()); });
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
