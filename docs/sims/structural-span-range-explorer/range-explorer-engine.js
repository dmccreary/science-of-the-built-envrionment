// Range Explorer Engine - a chart of ranges (spans, sizes, capacities) with a value you can move to see what qualifies
// ENGINE_VERSION: 1.1.0
// Shared by every sim made with the range-explorer skill. Do not edit a sim's copy by hand;
// edit skills/range-explorer/assets/range-explorer-engine.js and run `range_tool.py sync --apply`.
//
// Expects a global `RANGES` (schema "range-explorer/1") defined in a file loaded BEFORE this one.
// Teaching idea: a static range chart answers "what is typical?". Moving a value answers "what works for MY number?".

const ENGINE_VERSION = '1.1.0';

const TITLE_HEIGHT = 44;   // centered title band at the top of the canvas (above the chart)
const TITLE_SIZE = 26;     // title font size in px; shrinks to fit narrow canvases, never below TITLE_MIN
const TITLE_MIN = 16;
const ROW = 34;            // height of one control row
const INFO_HEIGHT = 120;   // detail panel under the chart
const ROWH = 26;           // height of one chart row
const HEADER = 64;         // readout and axis labels above the rows
const FOOT = 34;           // reference-mark labels under the rows
const margin = 16;
const INK = '#222222';
const DEFAULT_BG = 'aliceblue';   // book-wide MicroSim standard: aliceblue chart area, white control area; override with RANGES.background

let canvasWidth = 400, containerWidth = 400;
let chartHeight = 0, canvasHeight = 0;
let R;                      // alias for RANGES
let valueSlider, sortSel, unitSel, resetButton;
let groupBoxes = [];
let selectedId = null;
let hoveredId = null;
let dragging = false;
let rowsNow = [];           // visible items in drawn order
let specError = '';

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

function setup() {
  updateCanvasSize();
  R = typeof RANGES !== 'undefined' ? RANGES : null;
  if (!R || !R.axis || !Array.isArray(R.items) || R.items.length < 2 || !Array.isArray(R.groups)) {
    specError = 'RANGES is missing an axis, groups, or at least two items.';
    const c = createCanvas(containerWidth, 120);
    c.parent(document.querySelector('main'));
    return;
  }
  chartHeight = HEADER + R.items.length * ROWH + FOOT;
  canvasHeight = TITLE_HEIGHT + chartHeight + INFO_HEIGHT + 2 * ROW + 6;
  console.log('CANVAS_HEIGHT ' + canvasHeight + ' (engine ' + ENGINE_VERSION + ')');

  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');

  // Create every control first, then position them
  const ax = R.axis;
  valueSlider = createSlider(ax.min, ax.max, ax.start !== undefined ? ax.start : ax.min, ax.step || 1);
  sortSel = createSelect();
  sortSel.option('Sort: by group', 'group');
  sortSel.option('Sort: longest reach', 'reach');
  sortSel.option('Sort: by name', 'name');
  sortSel.selected('group');
  R.groups.forEach(g => groupBoxes.push(createCheckbox(g.name, true)));
  if (ax.si) {
    unitSel = createSelect();
    unitSel.option('IP (' + ax.unit + ')', 'IP');
    unitSel.option('SI (' + ax.si.unit + ')', 'SI');
    unitSel.selected('IP');
  }
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetAll);
  [valueSlider, sortSel, unitSel, resetButton, ...groupBoxes].filter(Boolean).forEach(el => el.style('font-size', '14px'));
  positionControls();

  describe('A range chart titled ' + R.title + '. Each row is one option with a bar for its possible range and a darker bar for its typical range, measured in ' +
    ax.unit + '. A slider moves a marker along the axis, and the options whose range contains the marker are highlighted.');
}

function windowResized() {
  if (specError) return;
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  positionControls();
}

function resetAll() {
  valueSlider.value(R.axis.start !== undefined ? R.axis.start : R.axis.min);
  groupBoxes.forEach(b => b.checked(true));
  sortSel.selected('group');
  if (unitSel) unitSel.selected('IP');
  selectedId = null;
}

// ---- Controls: two rows under the info panel ----
function positionControls() {
  const top = TITLE_HEIGHT + chartHeight + INFO_HEIGHT;
  const y0 = top + 6, y1 = top + ROW + 6;
  valueSlider.position(margin + 130, y0 + 2);
  valueSlider.size(max(80, canvasWidth - margin - 130 - 150 - margin));
  sortSel.position(canvasWidth - margin - 140, y0);
  resetButton.position(canvasWidth - 72, y1);
  const right = canvasWidth - 72 - (unitSel ? 100 : 0);
  if (unitSel) unitSel.position(canvasWidth - 72 - 96, y1);
  const gw = (right - margin - 12) / groupBoxes.length;
  groupBoxes.forEach((cb, i) => cb.position(margin + i * gw, y1));
}

// ---- Helpers ----
function bgColor() { return (R && R.background) || DEFAULT_BG; }
function useSI() { return !!unitSel && unitSel.value() === 'SI'; }
function groupOf(item) { return R.groups.find(g => g.id === item.group) || R.groups[0]; }
function groupVisible(gid) { const i = R.groups.findIndex(g => g.id === gid); return i < 0 ? true : groupBoxes[i].checked(); }
function value() { return valueSlider.value(); }
function conv(v) { return useSI() ? v * R.axis.si.factor : v; }
function unitLabel() { return useSI() ? R.axis.si.unit : R.axis.unit; }
function fmt(v, withUnit) {
  const c = conv(v);
  const digits = useSI() ? (R.axis.si.digits !== undefined ? R.axis.si.digits : 1) : 0;
  const s = (digits === 0 ? String(Math.round(c)) : c.toFixed(digits));
  return withUnit === false ? s : s + ' ' + unitLabel();
}
function contains(item) { return value() >= item.range[0] && value() <= item.range[1]; }
function inTypical(item) { return item.typical && value() >= item.typical[0] && value() <= item.typical[1]; }

function visibleRows() {
  let rows = R.items.filter(it => groupVisible(it.group));
  const mode = sortSel.value();
  if (mode === 'reach') rows = rows.slice().sort((a, b) => b.range[1] - a.range[1]);
  else if (mode === 'name') rows = rows.slice().sort((a, b) => a.name.localeCompare(b.name));
  else rows = rows.slice().sort((a, b) => R.groups.findIndex(g => g.id === a.group) - R.groups.findIndex(g => g.id === b.group));
  return rows;
}

function plotLeft() { return margin + min(190, canvasWidth * 0.3) + 10; }
function plotRight() { return canvasWidth - margin - 8; }
function xOf(v) { return map(v, R.axis.min, R.axis.max, plotLeft(), plotRight()); }
function vOf(x) {
  const v = map(x, plotLeft(), plotRight(), R.axis.min, R.axis.max);
  const st = R.axis.step || 1;
  return constrain(Math.round(v / st) * st, R.axis.min, R.axis.max);
}

function tickStep() {
  const raw = (R.axis.max - R.axis.min) / 8;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  return [1, 2, 2.5, 5, 10].map(m => m * mag).find(s => s >= raw) || raw;
}

// ---- Drawing ----
function drawAxis(n) {
  const yTop = HEADER - 6, yBot = HEADER + n * ROWH;
  const stepV = tickStep();
  textSize(11); textStyle(NORMAL); textAlign(CENTER, BOTTOM);
  for (let v = Math.ceil(R.axis.min / stepV) * stepV; v <= R.axis.max + 1e-9; v += stepV) {
    const x = xOf(v);
    stroke(230); strokeWeight(1); line(x, yTop, x, yBot);
    noStroke(); fill(110); text(fmt(v, false), x, yTop - 2);
  }
  noStroke(); fill(110); textAlign(RIGHT, BOTTOM);
  text(R.axis.label + ' (' + unitLabel() + ')', plotRight(), yTop - 14);
}

function drawRow(it, k) {
  const y = HEADER + k * ROWH, cy = y + ROWH / 2;
  const g = groupOf(it);
  const on = contains(it);
  const fade = on ? 255 : 80;
  const col = color(g.color);
  if (k % 2 === 0) { noStroke(); fill(255, 255, 255, 150); rect(margin - 4, y, canvasWidth - 2 * margin + 8, ROWH); }
  if (it.id === selectedId || it.id === hoveredId) { noFill(); stroke('#e65100'); strokeWeight(it.id === selectedId ? 2 : 1); rect(margin - 4, y + 1, canvasWidth - 2 * margin + 8, ROWH - 2, 3); }
  // label
  noStroke(); fill(red(col), green(col), blue(col), fade); circle(margin + 4, cy, 9);
  fill(on ? INK : 150); textStyle(on ? BOLD : NORMAL); textAlign(LEFT, CENTER);
  const maxW = plotLeft() - margin - 24;
  let size = 13; textSize(size);
  while (textWidth(it.name) > maxW && size > 9) { size--; textSize(size); }
  let label = it.name;
  while (textWidth(label) > maxW && label.length > 4) label = label.slice(0, -2);
  text(label === it.name ? label : label + '…', margin + 14, cy);
  // bars
  const x0 = xOf(it.range[0]), x1 = xOf(it.range[1]);
  stroke(red(col), green(col), blue(col), fade); strokeWeight(on ? 2 : 1);
  fill(red(col), green(col), blue(col), on ? 70 : 28);
  rect(x0, cy - 7, max(2, x1 - x0), 14, 3);
  if (it.typical) {
    noStroke(); fill(red(col), green(col), blue(col), on ? 230 : 70);
    const t0 = xOf(it.typical[0]), t1 = xOf(it.typical[1]);
    rect(t0, cy - 5, max(2, t1 - t0), 10, 2);
  }
  if (it.range[1] >= R.axis.max) {   // runs past the end of the chart
    noStroke(); fill(red(col), green(col), blue(col), fade);
    triangle(x1 + 1, cy - 6, x1 + 1, cy + 6, x1 + 9, cy);
  }
}

function drawMarks(n) {
  (R.marks || []).forEach((m, i) => {
    if (m.value < R.axis.min || m.value > R.axis.max) return;
    const x = xOf(m.value), yTop = HEADER - 6, yBot = HEADER + n * ROWH;
    stroke(120); strokeWeight(1);
    drawingContext.setLineDash([4, 4]); line(x, yTop, x, yBot + 4); drawingContext.setLineDash([]);
    noStroke(); fill(90); textSize(11); textStyle(NORMAL); textAlign(CENTER, TOP);
    text(m.label, constrain(x, 60, canvasWidth - 60), yBot + 6 + (i % 2) * 14);
  });
}

function drawMarker(n) {
  const x = xOf(value()), yTop = HEADER - 8, yBot = HEADER + n * ROWH;
  stroke('#c62828'); strokeWeight(2); line(x, yTop, x, yBot);
  noStroke(); fill('#c62828');
  triangle(x - 6, yTop - 8, x + 6, yTop - 8, x, yTop + 2);
}

function drawReadout(rows) {
  const ok = rows.filter(contains);
  noStroke(); textAlign(LEFT, TOP); textStyle(BOLD); textSize(15); fill(INK);
  text(R.axis.label + ' ' + fmt(value()) + ': ' + ok.length + ' of ' + rows.length + ' options reach it', margin, 8);
  textStyle(NORMAL); textSize(12); fill(90);
  const typicalCount = ok.filter(inTypical).length;
  text(typicalCount + ' are in their typical range, ' + (ok.length - typicalCount) + ' are possible but unusual.', margin, 28);
}

function drawInfo(rows) {
  const y0 = TITLE_HEIGHT + chartHeight, wInfo = canvasWidth - 2 * margin;
  noStroke(); fill(255); rect(0, y0, canvasWidth, INFO_HEIGHT);
  stroke('silver'); strokeWeight(1); line(0, y0, canvasWidth, y0);
  noStroke(); textAlign(LEFT, TOP);
  const it = R.items.find(i => i.id === selectedId);
  if (it) {
    textStyle(BOLD); textSize(13); fill(INK);
    text(it.name, margin, y0 + 6);
    textStyle(NORMAL); textSize(12); fill(70);
    let range = 'Possible ' + fmt(it.range[0], false) + ' to ' + fmt(it.range[1]) + (it.typical ? ', typical ' + fmt(it.typical[0], false) + ' to ' + fmt(it.typical[1]) : '') + '.';
    const here = contains(it) ? (inTypical(it) ? ' At ' + fmt(value()) + ' it is in its typical range.' : ' At ' + fmt(value()) + ' it is possible but unusual.') : ' It does not reach ' + fmt(value()) + '.';
    text(range + here, margin, y0 + 24);
    let yy = y0 + 42;
    [['What it is: ', it.what], ['Why choose it: ', it.why], ['Watch out: ', it.limit]].forEach(([k, v]) => {
      if (!v) return;
      textStyle(BOLD); fill(70); text(k, margin, yy);
      const kw = textWidth(k);
      textStyle(NORMAL); fill(INK); text(v, margin + kw + 4, yy, wInfo - kw - 4, 30);
      yy += textWidth(k + v) > wInfo - 10 ? 28 : 16;
    });
  } else {
    textStyle(NORMAL); textSize(12); fill(70);
    text(R.caption || 'Move the slider or drag the red marker. Click a row to see what it is and what to watch out for.', margin, y0 + 8, wInfo, 44);
    const ok = rows.filter(contains).map(r => r.name);
    textSize(11); fill(50);
    text(ok.length ? 'Reaches ' + fmt(value()) + ': ' + ok.join(', ') + '.' : 'Nothing in this chart reaches ' + fmt(value()) + '.', margin, y0 + 56, wInfo, 56);
  }
}

// ---- Title band: the chart's name, centered above it in a large bold font ----
function drawTitle() {
  noStroke(); fill(bgColor()); rect(0, 0, canvasWidth, TITLE_HEIGHT + chartHeight);   // aliceblue behind the title band and the chart
  fill(INK); textFont('Arial'); textStyle(BOLD); textAlign(CENTER, CENTER);
  let sz = TITLE_SIZE;
  textSize(sz);
  while (sz > TITLE_MIN && textWidth(R.title) > canvasWidth - 2 * margin) { sz--; textSize(sz); }
  text(R.title, canvasWidth / 2, TITLE_HEIGHT / 2 + 1);
  stroke('silver'); strokeWeight(1); line(margin, TITLE_HEIGHT - 1, canvasWidth - margin, TITLE_HEIGHT - 1);
  noStroke(); textStyle(NORMAL);
}

function draw() {
  if (specError) { background(255); fill(180, 0, 0); textSize(14); text(specError, 12, 40); return; }
  background(255);
  drawTitle();
  rowsNow = visibleRows();
  const n = rowsNow.length;
  // hover (my = mouse position in chart-area coordinates, below the title band)
  const my = mouseY - TITLE_HEIGHT;
  hoveredId = null;
  if (my >= HEADER && my < HEADER + n * ROWH && mouseX > 0 && mouseX < canvasWidth) hoveredId = rowsNow[floor((my - HEADER) / ROWH)].id;
  push();
  translate(0, TITLE_HEIGHT);   // the chart is laid out from y = 0 below the title band
  drawAxis(n);
  rowsNow.forEach(drawRow);
  drawMarks(n);
  drawMarker(n);
  drawReadout(rowsNow);
  pop();
  drawInfo(rowsNow);
  // control captions (the controls themselves are p5 DOM elements)
  const top = TITLE_HEIGHT + chartHeight + INFO_HEIGHT;
  noStroke(); fill(70); textSize(13); textStyle(BOLD); textAlign(LEFT, CENTER);
  text(R.axis.label + ': ' + fmt(value()), margin, top + 6 + 12);
  // hover tooltip
  if (hoveredId && mouseX > plotLeft() - 6) {
    const it = R.items.find(i => i.id === hoveredId);
    const t = it.name + ': ' + fmt(it.range[0], false) + ' to ' + fmt(it.range[1]) + (it.typical ? ' (typical ' + fmt(it.typical[0], false) + ' to ' + fmt(it.typical[1]) + ')' : '');
    textSize(11); textStyle(NORMAL);
    const tw = textWidth(t) + 12;
    const tx = constrain(mouseX + 12, 4, canvasWidth - tw - 4), ty = constrain(mouseY + 14, TITLE_HEIGHT + 4, TITLE_HEIGHT + chartHeight - 22);
    fill(255, 255, 220); stroke(INK); strokeWeight(1); rect(tx, ty, tw, 20, 3);
    noStroke(); fill(INK); textAlign(LEFT, CENTER); text(t, tx + 6, ty + 10);
  }
}

// ---- Mouse: click a label to select; click or drag in the plot to move the marker ----
function mousePressed() {
  if (specError) return;
  const my = mouseY - TITLE_HEIGHT;
  if (mouseX < 0 || mouseX > canvasWidth || my < 0 || my >= chartHeight) return;
  if (mouseX < plotLeft() - 6) {
    if (hoveredId) selectedId = (selectedId === hoveredId) ? null : hoveredId;
    return;
  }
  if (mouseX >= plotLeft() - 6 && my >= HEADER - 18 && my < chartHeight) {
    dragging = true;
    valueSlider.value(vOf(mouseX));
  }
}
function mouseDragged() { if (dragging && !specError) valueSlider.value(vOf(mouseX)); }
function mouseReleased() { dragging = false; }
