// Voltage, Current, and Resistance Explorer MicroSim - Ohm's law, power, and voltage drop for a source, a run of wire, and a load
// CANVAS_HEIGHT: 480
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 330;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 195;
let defaultTextSize = 16;

const DROP_LIMIT = 3;     // percent: the NEC informational-note design goal used in Chapter 15
const BAR_MAX = 10;       // the drop bar scale runs from 0 to 10 percent

// ---- Data: wire resistance (ohms per 1,000 ft, NEC Chapter 9 Table 8 values for uncoated wire at 75 C)
// and typical ampacity (A, 60 C column). 14 AWG aluminum is not a stocked building wire; its values are estimated. ----
const gauges = [14, 12, 10, 8, 6];
const wireData = {
  Copper:   { color: 'darkorange', r: { 14: 3.07, 12: 1.93, 10: 1.21, 8: 0.764, 6: 0.491 }, amp: { 14: 15, 12: 20, 10: 30, 8: 40, 6: 55 } },
  Aluminum: { color: 'darkgray',    r: { 14: 5.06, 12: 3.18, 10: 2.00, 8: 1.26, 6: 0.808 }, amp: { 14: 12, 12: 15, 10: 25, 8: 30, 6: 40 } }
};
const wireWeight = { 14: 3, 12: 4, 10: 5, 8: 7, 6: 9 }; // drawn thickness grows as the gauge number falls

// ---- State ----
let calc = {};
let mouseOverCanvas = false;
let wireRect = {}, loadRect = {};
let L = {}; // vertical layout, compact on narrow screens

// ---- Controls ----
let voltSlider, powerSlider, lengthSlider, gaugeSelect, materialSelect, ampacityCheck;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseOver(() => { mouseOverCanvas = true; });
  canvas.mouseOut(() => { mouseOverCanvas = false; });
  textSize(defaultTextSize);

  voltSlider = createSlider(12, 480, 120, 1);
  powerSlider = createSlider(100, 5000, 1500, 50);
  lengthSlider = createSlider(10, 300, 100, 5);

  gaugeSelect = createSelect();
  gauges.forEach(g => gaugeSelect.option(g + ' AWG'));
  gaugeSelect.selected('12 AWG');

  materialSelect = createSelect();
  materialSelect.option('Copper');
  materialSelect.option('Aluminum');
  materialSelect.selected('Copper');

  ampacityCheck = createCheckbox('Show ampacity limit', false);

  positionControls();
  describe('A circuit with a source on the left, a run of wire, and a load on the right. Readouts show source voltage, voltage at the load, current, load power, and heat lost in the wire. A bar shows the voltage drop as a percent of the source voltage, with a green zone up to 3 percent and a red zone beyond it. Sliders set source voltage, load power, and wire length, and menus set the wire gauge and material.', LABEL);
}

function sliderWidth() { return max(100, canvasWidth - sliderLeftMargin - 15); }

function positionControls() {
  [voltSlider, powerSlider, lengthSlider].forEach((s, i) => {
    s.position(sliderLeftMargin, drawHeight + 12 + i * 35);
    s.size(sliderWidth());
  });
  const y = drawHeight + 112;
  gaugeSelect.position(10, y);
  gaugeSelect.size(88);
  materialSelect.position(106, y);
  materialSelect.size(100);
  ampacityCheck.position(216, y);
}

// ---- Calculation: the design method from Chapter 15 (current from P / V at the source, drop from I x R) ----
function recalc() {
  const Vs = voltSlider.value();
  const P = powerSlider.value();
  const L = lengthSlider.value();
  const g = parseInt(gaugeSelect.value());
  const m = materialSelect.value();
  const rPerKft = wireData[m].r[g];
  const Rloop = 2 * L / 1000 * rPerKft;      // out and back
  const I = P / Vs;
  const drop = I * Rloop;
  const Vload = max(0, Vs - drop);
  calc = {
    Vs, P, L, g, m, rPerKft, Rloop, I, drop, Vload,
    dropPct: drop / Vs * 100,
    loss: I * I * Rloop,
    amp: wireData[m].amp[g]
  };
  calc.overAmp = I > calc.amp;
  calc.highDrop = calc.dropPct > DROP_LIMIT;
}

function fmt(x, d) { return Number(x.toFixed(d)).toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d }); }
function fmtOhm(x) { return x < 1 ? fmt(x, 3) : fmt(x, 2); }

function layoutRows() {
  const compact = canvasWidth < 560;
  L = compact
    ? { compact, yHot: 76, yRet: 108, loadY: 56, loadH: 64, barY: 164, readY: 206, readH: 62, statusY: 274, statusSize: 14 }
    : { compact, yHot: 84, yRet: 122, loadY: 66, loadH: 74, barY: 188, readY: 238, readH: 44, statusY: 292, statusSize: 16 };
}

function draw() {
  updateCanvasSize();
  recalc();
  layoutRows();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  const title = 'Voltage, Current, and Resistance Explorer';
  let ts = 24;
  textSize(ts);
  while (ts > 16 && textWidth(title) > canvasWidth - 10) { ts--; textSize(ts); }
  text(title, canvasWidth / 2, 8);

  drawCircuit();
  drawDropBar();
  drawReadouts();
  drawStatus();
  drawTooltip();
  drawControlLabels();
}

// ---- Circuit: source, two conductors (out and back), load ----
function drawCircuit() {
  const loadW = min(100, canvasWidth * 0.22);
  const srcX = 52;                       // source circle center
  const wx1 = 90, wx2 = canvasWidth - 20 - loadW - 8;
  const yHot = L.yHot, yRet = L.yRet;
  wireRect = { x: wx1, y: yHot - 10, w: wx2 - wx1, h: yRet - yHot + 20 };
  loadRect = { x: canvasWidth - 20 - loadW, y: L.loadY, w: loadW, h: L.loadH };

  // voltage labels above each end
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('Source: ' + calc.Vs + ' V', srcX + 4, L.compact ? 36 : 44);
  fill(calc.highDrop ? 'crimson' : 'black');
  text('At load: ' + fmt(calc.Vload, 1) + ' V', loadRect.x + loadRect.w / 2, L.compact ? 36 : 44);

  // wires (flash red while overloaded and the mouse is over the canvas; solid red otherwise)
  const flashOn = calc.overAmp && (!mouseOverCanvas || frameCount % 40 < 20);
  const col = calc.overAmp ? (flashOn ? 'crimson' : wireData[calc.m].color) : wireData[calc.m].color;
  stroke(col);
  strokeWeight(wireWeight[calc.g]);
  strokeCap(SQUARE);
  line(wx1, yHot, wx2, yHot);
  line(wx1, yRet, wx2, yRet);
  // lead-in wires to the source and the load stay thin so the run is what you compare
  stroke('dimgray');
  strokeWeight(2);
  line(srcX, yHot, wx1, yHot); line(srcX, yRet, wx1, yRet);
  line(srcX, yHot, srcX, yHot + 12); line(srcX, yRet, srcX, yRet - 12);
  line(wx2, yHot, loadRect.x, yHot); line(wx2, yRet, loadRect.x, yRet);

  // source: circle with a plus and a minus
  stroke('black');
  strokeWeight(2);
  fill('white');
  circle(srcX, (yHot + yRet) / 2, 36);
  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, CENTER);
  text('+', srcX, (yHot + yRet) / 2 - 8);
  text('-', srcX, (yHot + yRet) / 2 + 8);

  // load: a box with the power on it
  stroke('black');
  strokeWeight(2);
  fill('lightyellow');
  rect(loadRect.x, loadRect.y, loadRect.w, loadRect.h, 8);
  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Load', loadRect.x + loadRect.w / 2, loadRect.y + 24);
  text(fmt(calc.P, 0) + ' W', loadRect.x + loadRect.w / 2, loadRect.y + 48);

  // run length label between the two wires
  fill('black');
  textSize(14);
  textAlign(CENTER, CENTER);
  text(calc.L + ' ft one way = ' + (2 * calc.L) + ' ft of wire', (wx1 + wx2) / 2, (yHot + yRet) / 2);
  textAlign(CENTER, TOP);
  textSize(14);
  text(calc.g + ' AWG ' + calc.m.toLowerCase() + ': ' + fmt(calc.rPerKft, calc.rPerKft < 1 ? 3 : 2) + ' ohms/1,000 ft', (wx1 + wx2) / 2, yRet + 10);

  // ampacity label, with a warning triangle when the current exceeds it
  if (ampacityCheck.checked()) {
    const mx = (wx1 + wx2) / 2;
    const label = 'Ampacity limit ' + calc.amp + ' A (current ' + fmt(calc.I, 1) + ' A)';
    textSize(14);
    textAlign(CENTER, TOP);
    noStroke();
    fill(calc.overAmp ? 'crimson' : 'black');
    text(label, mx, yHot - 22);
    if (calc.overAmp) {
      const tx = mx - textWidth(label) / 2 - 16;
      fill('crimson');
      triangle(tx, yHot - 24, tx - 12, yHot - 4, tx + 12, yHot - 4);
      fill('white');
      textAlign(CENTER, CENTER);
      text('!', tx, yHot - 10);
    }
  }
}

// ---- Voltage drop bar: green up to 3 percent, red beyond, filled to the actual drop ----
function drawDropBar() {
  const x = 20, w = canvasWidth - 40, y = L.barY, h = 18;
  const px = pct => x + w * min(pct, BAR_MAX) / BAR_MAX;
  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  text('Voltage drop: ' + fmt(calc.dropPct, 1) + '% (' + fmt(calc.drop, 1) + ' V)' + (calc.dropPct >= 100 ? ' - more than the source' : (calc.highDrop ? ' - HIGH, over 3%' : ' - within the limit')), x, y - 24);
  // pale zones
  stroke('gray');
  strokeWeight(1);
  fill('honeydew');
  rect(x, y, px(DROP_LIMIT) - x, h);
  fill('mistyrose');
  rect(px(DROP_LIMIT), y, x + w - px(DROP_LIMIT), h);
  // filled part
  noStroke();
  fill('seagreen');
  rect(x, y, px(min(calc.dropPct, DROP_LIMIT)) - x, h);
  if (calc.dropPct > DROP_LIMIT) { fill('crimson'); rect(px(DROP_LIMIT), y, px(calc.dropPct) - px(DROP_LIMIT), h); }
  // limit line and tick labels
  stroke('black');
  strokeWeight(2);
  line(px(DROP_LIMIT), y - 4, px(DROP_LIMIT), y + h + 4);
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('0%', x, y + h + 5);
  textAlign(CENTER, TOP);
  text('3% limit', px(DROP_LIMIT), y + h + 5);
  textAlign(RIGHT, TOP);
  text('10%+', x + w, y + h + 5);
}

// ---- Readouts ----
function drawReadouts() {
  const x = 10, y = L.readY, w = canvasWidth - 20, h = L.readH;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(canvasWidth >= 560 ? 16 : 14);
  const items = [
    'Source voltage: ' + calc.Vs + ' V',
    'Voltage at load: ' + fmt(calc.Vload, 1) + ' V',
    'Current: ' + fmt(calc.I, 1) + ' A',
    'Load power: ' + fmt(calc.P, 0) + ' W',
    'Wire loss: ' + fmt(calc.loss, 0) + ' W as heat',
    'Loop resistance: ' + fmtOhm(calc.Rloop) + ' ohm'
  ];
  const cols = canvasWidth >= 560 ? 3 : 2;
  const colW = (w - 20) / cols;
  items.forEach((t, i) => {
    const c = cols === 3 ? floor(i / 2) : i % 2;
    const r = cols === 3 ? i % 2 : floor(i / 2);
    text(t, x + 10 + c * colW, y + 6 + r * 18);
  });
}

// ---- Status line ----
function drawStatus() {
  const lines = [];
  if (calc.overAmp) lines.push(['Overload: this wire would overheat.', 'crimson']);
  if (calc.dropPct >= 100) lines.push(['The drop exceeds the source voltage. Use a larger wire or a shorter run.', 'crimson']);
  else if (calc.highDrop) lines.push(['Voltage drop is high. Try a larger wire or a shorter run.', 'crimson']);
  if (!lines.length) lines.push(['OK: the drop is within 3 percent and the current is within the wire\'s ampacity.', 'darkgreen']);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(L.statusSize);
  textStyle(BOLD);
  let y = L.statusY;
  lines.forEach(l => {
    fill(l[1]);
    wrapLines(l[0], canvasWidth - 20).forEach(s => { text(s, 10, y); y += L.statusSize + 2; });
  });
  textStyle(NORMAL);
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

// ---- Hover tooltips: wire resistance and the power formula ----
function drawTooltip() {
  if (mouseY >= drawHeight || mouseY < 0) return;
  let lines = null;
  const inR = r => mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h;
  if (inR(loadRect)) {
    lines = ['P = V x I', fmt(calc.P, 0) + ' W = ' + calc.Vs + ' V x ' + fmt(calc.I, 1) + ' A', 'Then I = P / V and R = V / I'];
  } else if (inR(wireRect)) {
    lines = [calc.g + ' AWG ' + calc.m.toLowerCase() + ': ' + fmt(calc.rPerKft, calc.rPerKft < 1 ? 3 : 2) + ' ohms per 1,000 ft',
      'Loop: ' + (2 * calc.L) + ' ft = ' + fmtOhm(calc.Rloop) + ' ohm total',
      'Drop = I x R = ' + fmt(calc.I, 1) + ' A x ' + fmtOhm(calc.Rloop) + ' ohm = ' + fmt(calc.drop, 1) + ' V'];
    if (calc.m === 'Aluminum' && calc.g === 14) lines.push('14 AWG aluminum is not a stocked building wire');
  }
  if (!lines) return;
  textSize(14);
  const w = min(canvasWidth - 8, max(...lines.map(l => textWidth(l))) + 16), h = lines.length * 17 + 8;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  lines.forEach((l, i) => text(l, tx + 8, ty + 5 + i * 17));
}

// ---- Control labels with current values and units ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Source voltage: ' + voltSlider.value() + ' V', 10, drawHeight + 24);
  text('Load power: ' + fmt(powerSlider.value(), 0) + ' W', 10, drawHeight + 59);
  text('One-way length: ' + lengthSlider.value() + ' ft', 10, drawHeight + 94);
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
