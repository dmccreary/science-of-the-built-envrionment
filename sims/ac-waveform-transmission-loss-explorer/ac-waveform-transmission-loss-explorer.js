// AC Waveform and Transmission Loss Explorer MicroSim - peak, RMS, frequency, and phase of an AC wave, and line loss I^2 R at different transmission voltages
// CANVAS_HEIGHT: 600
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 150; // four rows of controls, two controls per row
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 118; // label width in each half of the control region
let defaultTextSize = 16;

const WINDOW_MS = 50; // the time axis always spans 50 ms, so a higher frequency packs in more cycles
const SQRT2 = Math.SQRT2, SQRT3 = Math.sqrt(3);

// Phase traces: A black solid, B red dashed, C blue dotted (distinguishable without color)
const phases = [
  { name: 'A', col: 'black', dash: [], lag: 0 },
  { name: 'B', col: 'crimson', dash: [9, 5], lag: 1 / 3 },
  { name: 'C', col: 'royalblue', dash: [2, 5], lag: 2 / 3 }
];

// ---- Controls ----
let modeRadio, llBox, rmsSlider, freqSlider, tvSlider, loadSlider, resSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  modeRadio = createRadio();
  modeRadio.option('Single-phase');
  modeRadio.option('Three-phase');
  modeRadio.selected('Single-phase');
  modeRadio.style('font-size', '14px');
  modeRadio.changed(updateVisibility);
  llBox = createCheckbox('Show line-to-line', false);
  llBox.style('font-size', '14px');
  rmsSlider = createSlider(120, 480, 120, 1);
  freqSlider = createSlider(50, 60, 60, 1);
  tvSlider = createSlider(0, 100, 0, 1);   // logarithmic: 0 -> 1,000 V, 50 -> 10,000 V, 100 -> 100,000 V
  loadSlider = createSlider(10, 1000, 100, 10);
  resSlider = createSlider(0.1, 5, 1, 0.1);

  positionControls();
  updateVisibility();
  describe('Two panels. The upper panel plots AC voltage against time with dashed lines marking the peak and RMS values; in three-phase mode three waves are offset by one third of a cycle and an optional wave shows the line-to-line voltage. The lower panel shows a transmission line from a source to a load with bars comparing power delivered and power lost in the line, so students can see that raising the transmission voltage cuts the loss.', LABEL);
}

// two controls per row: the left half starts at x = 10, the right half at the middle
function positionControls() {
  const half = canvasWidth / 2;
  const sw = max(60, half - sliderLeftMargin - 12);
  const row = k => drawHeight + 6 + k * 35;
  modeRadio.position(10, row(0));
  llBox.position(half + 6, row(0));
  rmsSlider.position(sliderLeftMargin - 8, row(1) + 2);
  freqSlider.position(half + sliderLeftMargin - 8, row(1) + 2);
  tvSlider.position(sliderLeftMargin - 8, row(2) + 2);
  loadSlider.position(half + sliderLeftMargin - 8, row(2) + 2);
  resSlider.position(sliderLeftMargin - 8, row(3) + 2);
  [rmsSlider, freqSlider, tvSlider, loadSlider, resSlider].forEach(s => s.size(sw));
}

function updateVisibility() { if (threePhase()) llBox.show(); else llBox.hide(); }
function threePhase() { return modeRadio.value() === 'Three-phase'; }
function lineVoltage() { return Math.round(1000 * Math.pow(10, tvSlider.value() / 50) / 10) * 10; } // 3-digit steps along the log scale

// ---- Number formats ----
function fnum(x) {
  if (x >= 100) return round(x).toLocaleString('en-US');
  if (x >= 10) return x.toFixed(1);
  if (x >= 1) return x.toFixed(2);
  return x.toFixed(3);
}

function draw() {
  updateCanvasSize();

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
  const title = 'AC Waveform and Transmission Loss Explorer';
  if (textWidth(title) > canvasWidth - 16) textSize(max(16, 24 * (canvasWidth - 16) / textWidth(title)));
  text(title, canvasWidth / 2, 8);

  const W1 = { x: 6, y: 40, w: canvasWidth - 12, h: 204 };
  const W2 = { x: 6, y: 248, w: canvasWidth - 12, h: 198 };
  drawWaveform(W1);
  drawTransmission(W2);
  drawControlLabels();
}

// ---- Upper panel: voltage against time ----
function nice(v) { // axis step for a given maximum
  return v > 1000 ? 500 : (v > 500 ? 200 : (v > 250 ? 100 : 50));
}

function drawWaveform(P) {
  const vrms = rmsSlider.value(), f = freqSlider.value(), vp = vrms * SQRT2;
  const three = threePhase(), ll = three && llBox.checked();
  const llPeak = vp * SQRT3;
  const vmax = ll ? llPeak : vp;
  const step = nice(vmax * 1.4);
  const axis = ceil(vmax * 1.4 / step) * step;
  const x0 = P.x + 54, x1 = P.x + P.w - 12, y0 = P.y + 46, y1 = P.y + P.h - 30;
  const X = t => map(t, 0, WINDOW_MS, x0, x1);
  const Y = v => map(v, -axis, axis, y1, y0);
  const wave = (ph, t) => sin(TWO_PI * f * (t / 1000 - ph.lag / f));

  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);

  // readout header
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  const head1 = 'Peak ' + round(vp) + ' V = RMS ' + vrms + ' V × 1.414    Period ' + (1000 / f).toFixed(1) + ' ms';
  text(head1, P.x + 10, P.y + 5, P.w - 20, 20);
  if (ll) {
    fill('seagreen');
    text('Line-to-line RMS = ' + vrms + ' × 1.732 = ' + round(vrms * SQRT3) + ' V (peak ' + round(llPeak) + ' V)', P.x + 10, P.y + 24, P.w - 20, 20);
  } else if (three) {
    fill('dimgray');
    text('Each phase is offset by one third of a cycle (' + (1000 / f / 3).toFixed(1) + ' ms)', P.x + 10, P.y + 24, P.w - 20, 20);
  } else {
    fill('dimgray');
    text('Frequency ' + f + ' Hz: ' + (WINDOW_MS * f / 1000).toFixed(1) + ' cycles in ' + WINDOW_MS + ' ms', P.x + 10, P.y + 24, P.w - 20, 20);
  }

  // grid, axes, ticks
  stroke(225);
  strokeWeight(1);
  for (let v = -axis; v <= axis; v += step) line(x0, Y(v), x1, Y(v));
  for (let t = 0; t <= WINDOW_MS; t += 10) line(X(t), y0, X(t), y1);
  stroke('black');
  strokeWeight(1.5);
  line(x0, Y(0), x1, Y(0));
  line(x0, y0, x0, y1);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(RIGHT, CENTER);
  for (let v = -axis; v <= axis; v += step) text(v, x0 - 5, Y(v));
  textAlign(CENTER, TOP);
  for (let t = 0; t <= WINDOW_MS; t += 10) text(t, X(t), y1 + 4);
  textSize(14);
  text('Time (ms)', (x0 + x1) / 2, y1 + 14);
  push();
  translate(P.x + 12, (y0 + y1) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Voltage (V)', 0, 0);
  pop();

  // peak and RMS markers (dashed lines), labeled in text
  noFill();
  const marks = [{ v: vp, dash: [10, 5], col: 'dimgray', lab: 'Peak ' + round(vp) + ' V', above: true }, { v: vrms, dash: [3, 4], col: 'steelblue', lab: 'RMS ' + vrms + ' V', above: false }];
  marks.forEach(m => {
    stroke(m.col);
    strokeWeight(1.5);
    drawingContext.setLineDash(m.dash);
    line(x0, Y(m.v), x1, Y(m.v));
    line(x0, Y(-m.v), x1, Y(-m.v));
    drawingContext.setLineDash([]);
    noStroke();
    fill(m.col);
    textSize(13);
    textAlign(RIGHT, m.above ? BOTTOM : TOP);
    text(m.lab, x1 - 3, Y(m.v) + (m.above ? -1 : 2));
  });

  // waves
  noFill();
  const active = three ? phases : [phases[0]];
  const trace = (fn, col, dash, w) => {
    stroke(col);
    strokeWeight(w);
    drawingContext.setLineDash(dash);
    beginShape();
    for (let px = x0; px <= x1; px += 2) vertex(px, Y(fn(map(px, x0, x1, 0, WINDOW_MS))));
    endShape();
    drawingContext.setLineDash([]);
  };
  if (ll) trace(t => vp * (wave(phases[0], t) - wave(phases[1], t)), 'seagreen', [], 4);
  active.forEach(ph => trace(t => vp * wave(ph, t), ph.col, ph.dash, 2.5));

  // legend inside the lower gap of the plot
  let lx = x0 + 10;
  const ly = y1 - 10;
  const short = x1 - x0 < 420; // short labels on narrow screens
  const legend = active.map(ph => ({ col: ph.col, dash: ph.dash, w: 2.5, txt: three ? (short ? ph.name : 'Phase ' + ph.name) : 'Voltage' }));
  if (ll) legend.push({ col: 'seagreen', dash: [], w: 4, txt: 'A − B' });
  legend.forEach(L => {
    stroke(L.col);
    strokeWeight(L.w);
    drawingContext.setLineDash(L.dash);
    line(lx, ly, lx + 26, ly);
    drawingContext.setLineDash([]);
    noStroke();
    fill('black');
    textSize(13);
    textAlign(LEFT, CENTER);
    text(L.txt, lx + 31, ly);
    lx += 38 + textWidth(L.txt) + 14;
  });

  drawWaveHover(x0, x1, y0, y1, X, Y, ll, vp, wave, active);
}

function drawWaveHover(x0, x1, y0, y1, X, Y, ll, vp, wave, active) {
  if (mouseX < x0 || mouseX > x1 || mouseY < y0 || mouseY > y1) return;
  const t = map(mouseX, x0, x1, 0, WINDOW_MS);
  const cands = active.map(ph => ({ name: 'Phase ' + ph.name, v: vp * wave(ph, t), col: ph.col }));
  if (ll) cands.push({ name: 'Line-to-line A − B', v: vp * (wave(phases[0], t) - wave(phases[1], t)), col: 'seagreen' });
  if (!threePhase()) cands[0].name = 'Voltage';
  let best = cands[0];
  cands.forEach(c => { if (abs(Y(c.v) - mouseY) < abs(Y(best.v) - mouseY)) best = c; });
  stroke('navy');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(X(t), y0, X(t), y1);
  drawingContext.setLineDash([]);
  fill('gold');
  circle(X(t), Y(best.v), 10);
  const lines = [best.name, 't = ' + t.toFixed(1) + ' ms', 'v = ' + (best.v >= 0 ? '+' : '−') + abs(best.v).toFixed(0) + ' V'];
  textSize(14);
  const w = 130, h = 62;
  const tx = X(t) + 12 + w > x1 + 8 ? X(t) - 12 - w : X(t) + 12;
  const ty = constrain(Y(best.v) - h / 2, y0, y1 - h);
  stroke('navy');
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  lines.forEach((l, i) => text(l, tx + 8, ty + 5 + i * 18));
}

// ---- Lower panel: line loss for a given transmission voltage ----
function drawTransmission(P) {
  const v = lineVoltage(), pl = loadSlider.value() * 1000, r = resSlider.value();
  const cur = pl / v, loss = cur * cur * r, pct = 100 * loss / pl;
  const src = v + cur * r;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT, TOP);
  text('Transmission line (loop resistance ' + r.toFixed(1) + ' Ω)', P.x + 10, P.y + 5);

  // loop: source at left, load at right, resistor in the top wire
  const lx0 = P.x + 40, lx1 = P.x + P.w - 92, ty = P.y + 44, by = P.y + 68;
  stroke('dimgray');
  strokeWeight(2);
  noFill();
  const rm = (lx0 + lx1) / 2;
  beginShape();
  vertex(lx0, ty); vertex(rm - 36, ty);
  for (let i = 0; i < 6; i++) vertex(rm - 36 + 6 + i * 12, ty + (i % 2 ? 7 : -7));
  vertex(rm + 36, ty); vertex(lx1, ty);
  endShape();
  line(lx0, by, lx1, by);
  fill('white');
  stroke('black');
  circle(lx0, (ty + by) / 2, 22);
  rect(lx1 - 14, ty - 2, 28, by - ty + 4, 4);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('~', lx0, (ty + by) / 2);
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Load', lx1 + 18, (ty + by) / 2 - 9);
  text(fnum(pl / 1000) + ' kW', lx1 + 18, (ty + by) / 2 + 9);
  textAlign(CENTER, TOP);
  text('Source ' + round(src).toLocaleString('en-US') + ' V', lx0 + 30, by + 3);
  textAlign(LEFT, BOTTOM);
  text('R', rm + 40, ty - 6);
  // current arrow
  stroke('navy');
  strokeWeight(2);
  fill('navy');
  line(lx0 + 50, ty - 12, lx0 + 90, ty - 12);
  triangle(lx0 + 90, ty - 17, lx0 + 90, ty - 7, lx0 + 98, ty - 12);
  noStroke();
  textSize(14);
  textAlign(LEFT, BOTTOM);
  text('I = ' + fnum(cur) + ' A', lx0 + 104, ty - 8);

  // bars: delivered and lost share one scale
  const bx = P.x + 112, bw = P.w - 112 - 100, mx = max(pl, loss);
  const rows = [{ lab: 'Delivered', val: pl, col: 'seagreen' }, { lab: 'Lost in line', val: loss, col: 'darkorange' }];
  rows.forEach((rw, i) => {
    const y = P.y + 94 + i * 24;
    noStroke();
    fill('black');
    textSize(14);
    textAlign(LEFT, CENTER);
    text(rw.lab, P.x + 10, y + 10);
    stroke('black');
    strokeWeight(1);
    fill(rw.col);
    rect(bx, y, max(3, bw * rw.val / mx), 19);
    noStroke();
    fill('black');
    text(fnum(rw.val / 1000) + ' kW', bx + max(3, bw * rw.val / mx) + 6, y + 10);
  });

  // readout and the tenfold note
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text('I = P ÷ V = ' + fnum(cur) + ' A.  Loss = I²R = ' + fnum(loss / 1000) + ' kW, which is ' + (pct >= 100 ? round(pct) : (pct >= 10 ? pct.toFixed(1) : (pct >= 1 ? pct.toFixed(2) : pct.toFixed(3)))) + '% of the power delivered.', P.x + 10, P.y + 142, P.w - 20, 40);
  const k = v / 1000;
  fill('navy');
  let note;
  if (k === 10) note = 'Ten times the voltage, one hundredth of the loss';
  else if (k === 1) note = 'Raise the line voltage: the loss falls as its square.';
  else note = 'Voltage × ' + k.toFixed(k < 10 ? 1 : 0) + ' vs 1,000 V: loss ÷ ' + fnum(k * k);
  text(note, P.x + 10, P.y + 142 + (canvasWidth >= 640 ? 20 : 36), P.w - 20, 20);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, CENTER);
  const half = canvasWidth / 2;
  const row = k => drawHeight + 6 + k * 35 + 11;
  text('RMS: ' + rmsSlider.value() + ' V', 10, row(1));
  text('Freq: ' + freqSlider.value() + ' Hz', half + 10, row(1));
  text('Line: ' + lineVoltage().toLocaleString('en-US') + ' V', 10, row(2));
  text('Load: ' + loadSlider.value() + ' kW', half + 10, row(2));
  text('Line R: ' + resSlider.value().toFixed(1) + ' Ω', 10, row(3));
  fill('dimgray');
  textAlign(LEFT, CENTER);
  text('Line V slider: log scale', half + 10, row(3));
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
