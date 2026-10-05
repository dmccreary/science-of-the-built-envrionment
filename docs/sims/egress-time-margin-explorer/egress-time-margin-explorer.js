// Egress Time Margin Explorer MicroSim - required safe egress time (RSET) as a stacked bar against available safe egress time (ASET), with protective measures and a floor plan
// CANVAS_HEIGHT: 577
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 392;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 270; // left edge of the sliders; labels sit to the left
let defaultTextSize = 16;

// ---- Riverbend defaults (Chapter 18 worked example) and illustrative effects of the measures ----
const DEF = { det: 1.0, pre: 1.5, aset: 6.0 };
const TRAVEL_BASE = 1.0;     // minutes to walk out with both exits open
const SPRINKLER_GAIN = 2.0;  // illustrative: minutes added to ASET
const VOICE_FACTOR = 2 / 3;  // illustrative: voice message cuts pre-movement by one third

// ---- Bar segments: definition and one-sentence example for the hover tooltip ----
const parts = [
  { key: 'det', name: 'Detection and alarm', col: 'cornflowerblue',
    def: 'Time from ignition until detectors sense the fire and the alarm sounds.',
    ex: 'In Riverbend the alarm sounds 1.0 minute after ignition.' },
  { key: 'pre', name: 'Pre-movement', col: 'darkorange',
    def: 'Time occupants take to recognize the alarm, gather themselves, and start moving.',
    ex: 'Riverbend occupants take 1.5 minutes to respond.' },
  { key: 'trv', name: 'Travel', col: 'gray',
    def: 'Time to walk out along the route to an exit.',
    ex: 'With both exits open the longest walk takes 1.0 minute; with one blocked it takes 2.0.' }
];

// ---- Explanations shown when a checkbox changes ----
const why = {
  spr: { on: 'Sprinklers limit the fire\'s size, so smoke and heat build up more slowly. That lengthens the available safe egress time, here by an illustrative 2.0 minutes.',
         off: 'Without sprinklers the fire grows unchecked, so conditions become unsurvivable sooner and the available time is shorter.' },
  voi: { on: 'A voice message tells people what is happening and what to do, so they start moving sooner. Here it cuts pre-movement by one third (illustrative).',
         off: 'A plain horn does not say what to do, so people wait to see what others do and pre-movement lasts longer.' },
  blk: { on: 'With one of two exits blocked, everyone must walk to the other door, so the longest walk doubles from 1.0 to 2.0 minutes.',
         off: 'With both exits open each person uses the nearest door, so the longest walk is only half the width of the room.' }
};

// ---- State ----
let lastWhy = '';        // text of the last checkbox explanation
let hoverPart = null;    // 'det', 'pre', 'trv', 'aset', or 'margin'
let geom = {};           // pixel geometry of the timeline, rebuilt each frame

// ---- Controls ----
let detSlider, preSlider, asetSlider, sprBox, voiBox, blkBox, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  detSlider = createSlider(0.5, 4, DEF.det, 0.1);
  preSlider = createSlider(0.5, 5, DEF.pre, 0.1);
  asetSlider = createSlider(3, 10, DEF.aset, 0.1);
  sprBox = createCheckbox('Sprinklers installed', false);
  voiBox = createCheckbox('Alarm with voice message', false);
  blkBox = createCheckbox('One exit blocked', false);
  sprBox.changed(() => { lastWhy = why.spr[sprBox.checked() ? 'on' : 'off']; });
  voiBox.changed(() => { lastWhy = why.voi[voiBox.checked() ? 'on' : 'off']; });
  blkBox.changed(() => { lastWhy = why.blk[blkBox.checked() ? 'on' : 'off']; });
  resetButton = createButton('Reset to Riverbend defaults');
  resetButton.mousePressed(resetDefaults);
  positionControls();

  describe('A horizontal timeline from 0 to 10 minutes. A stacked bar shows the three parts of required safe egress time: detection and alarm in blue, pre-movement in orange, and travel in gray. A vertical marker shows the available safe egress time, and a bracket labels the margin between them in minutes, green when positive and red when negative. Sliders set the three times. Checkboxes add sprinklers, a voice alarm, or a blocked exit. A floor plan of the Riverbend multipurpose room with two exits shows the longest walk.', LABEL);
}

function sliderW() { return constrain(canvasWidth - sliderLeftMargin - 15, 100, 260); }

function positionControls() {
  const y = i => drawHeight + 8 + i * 35;
  [detSlider, preSlider, asetSlider].forEach((s, i) => { s.position(sliderLeftMargin, y(i)); s.size(sliderW()); });
  sprBox.position(10, y(3));
  voiBox.position(195, y(3));
  blkBox.position(10, y(4));
  resetButton.position(195, y(4) - 2);
}

function resetDefaults() {
  detSlider.value(DEF.det);
  preSlider.value(DEF.pre);
  asetSlider.value(DEF.aset);
  sprBox.checked(false);
  voiBox.checked(false);
  blkBox.checked(false);
  lastWhy = '';
}

// ---- Model: all times in minutes ----
const r2 = v => Math.round(v * 100) / 100;
function calc() {
  const det = detSlider.value();
  const pre = r2(preSlider.value() * (voiBox.checked() ? VOICE_FACTOR : 1));
  const trv = TRAVEL_BASE * (blkBox.checked() ? 2 : 1);
  const aset = r2(asetSlider.value() + (sprBox.checked() ? SPRINKLER_GAIN : 0));
  const rset = r2(det + pre + trv);
  return { det: det, pre: pre, trv: trv, aset: aset, rset: rset, margin: r2(aset - rset) };
}
const f1 = v => (Math.round(v * 10) / 10).toFixed(1);
const signed = v => (v > 0 ? '+' : v < 0 ? '−' : '') + f1(Math.abs(v));

function draw() {
  updateCanvasSize();
  const m = calc();

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
  text('Egress Time Margin Explorer', canvasWidth / 2, 6);

  layoutTimeline(m);
  hoverPart = findHover();
  drawTimeline(m);
  drawFloorPlan(m);
  drawReadout(m);
  drawNotes(m);
  if (hoverPart) drawTooltip(m);
  drawControlLabels();
}

// ---- Timeline geometry ----
function layoutTimeline(m) {
  const axisMax = max(m.aset, m.rset) > 9.7 ? 12 : 10;
  const x0 = 16, x1 = canvasWidth - 16;
  const px = t => x0 + (x1 - x0) * t / axisMax;
  geom = { axisMax: axisMax, x0: x0, x1: x1, px: px, barY: 86, barH: 38 };
}

function findHover() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return null;
  const g = geom, m = calc();
  if (mouseY >= g.barY - 14 && mouseY <= g.barY + g.barH + 4 && abs(mouseX - g.px(m.aset)) <= 8) return 'aset';
  if (mouseY >= g.barY && mouseY <= g.barY + g.barH) {
    let t = 0;
    for (const p of parts) {
      const a = g.px(t), b = g.px(t + m[p.key]);
      if (mouseX >= a && mouseX <= b) return p.key;
      t += m[p.key];
    }
  }
  if (mouseY >= 150 && mouseY <= 182) return 'margin';
  return null;
}

function drawTimeline(m) {
  const g = geom;
  // legend row
  textSize(14);
  textAlign(LEFT, CENTER);
  let lx = 14;
  for (const p of parts) {
    noStroke();
    fill(p.col);
    stroke('dimgray');
    strokeWeight(1);
    rect(lx, 41, 14, 14, 3);
    noStroke();
    fill('black');
    text(p.name, lx + 19, 48);
    lx += 19 + textWidth(p.name) + 14;
  }
  // axis and ticks
  stroke('dimgray');
  strokeWeight(2);
  line(g.x0, g.barY + g.barH + 4, g.x1, g.barY + g.barH + 4);
  textSize(14);
  textAlign(CENTER, TOP);
  for (let t = 0; t <= g.axisMax; t += 2) {
    stroke('dimgray');
    strokeWeight(1);
    line(g.px(t), g.barY + g.barH + 4, g.px(t), g.barY + g.barH + 10);
    noStroke();
    fill('black');
    if (t === g.axisMax) { textAlign(RIGHT, TOP); text(t + ' min', g.x1, g.barY + g.barH + 12); textAlign(CENTER, TOP); }
    else text(t, g.px(t), g.barY + g.barH + 12);
  }

  // stacked RSET bar
  let t = 0;
  for (const p of parts) {
    const a = g.px(t), b = g.px(t + m[p.key]);
    stroke(hoverPart === p.key ? 'black' : 'dimgray');
    strokeWeight(hoverPart === p.key ? 3 : 1.5);
    fill(p.col);
    rect(a, g.barY, b - a, g.barH);
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    if (b - a >= 30) text(f1(m[p.key]), (a + b) / 2, g.barY + g.barH / 2);
    t += m[p.key];
  }

  // ASET marker
  const ax = g.px(m.aset);
  stroke('black');
  strokeWeight(hoverPart === 'aset' ? 5 : 3);
  line(ax, g.barY - 10, ax, g.barY + g.barH + 4);
  noStroke();
  fill('black');
  triangle(ax - 6, g.barY - 12, ax + 6, g.barY - 12, ax, g.barY - 3);
  textSize(14);
  const aLabel = 'ASET ' + f1(m.aset) + ' min' + (sprBox.checked() ? ' (with sprinklers)' : '');
  const onLeft = ax > canvasWidth * 0.55;
  textAlign(onLeft ? RIGHT : LEFT, BOTTOM);
  text(aLabel, ax + (onLeft ? -8 : 8), g.barY - 4);

  // margin bracket under the axis
  const rx = g.px(m.rset), by = 160;
  const ok = m.margin > 0;
  stroke(ok ? 'seagreen' : 'firebrick');
  strokeWeight(3);
  const lo = min(rx, ax), hi = max(rx, ax);
  if (hi - lo > 1) {
    drawingContext.setLineDash(ok ? [] : [6, 4]);
    line(lo, by, hi, by);
    drawingContext.setLineDash([]);
    line(lo, by - 6, lo, by + 6);
    line(hi, by - 6, hi, by + 6);
  }
  // RSET end tick through the bar
  stroke('dimgray');
  strokeWeight(1);
  line(rx, g.barY + g.barH, rx, by - 6);
  noStroke();
  fill(ok ? 'seagreen' : 'firebrick');
  textSize(16);
  textAlign(CENTER, TOP);
  const label = 'Margin ' + signed(m.margin) + ' min' + (ok ? '' : (m.margin < 0 ? ' (shortfall)' : ' (none)'));
  const lw = textWidth(label);
  const cx = constrain((lo + hi) / 2, 12 + lw / 2, canvasWidth - 12 - lw / 2);
  text(label, cx, by + 8);
}

// ---- Floor plan: two exits; the dashed arrow is the longest walk ----
function planRect() {
  const w = min(floor(canvasWidth * 0.44), 320);
  return { x: 10, y: 252, w: w, h: 84 };
}

function drawFloorPlan(m) {
  const P = planRect(), blocked = blkBox.checked();
  const rx = P.x + 8, ry = P.y + 4, rw = P.w - 16, rh = 56;
  stroke('dimgray');
  strokeWeight(3);
  fill('white');
  rect(rx, ry, rw, rh);
  // occupants
  noStroke();
  fill('steelblue');
  const dots = [[0.12, 0.3], [0.2, 0.7], [0.3, 0.35], [0.38, 0.75], [0.5, 0.25], [0.62, 0.75], [0.7, 0.35], [0.8, 0.7], [0.88, 0.3], [0.45, 0.8], [0.25, 0.5], [0.75, 0.55]];
  for (const d of dots) circle(rx + rw * d[0], ry + rh * d[1], 5);
  // room caption
  fill('dimgray');
  textSize(12);
  textAlign(CENTER, TOP);
  text('Riverbend multipurpose room', rx + rw / 2, ry + 3);
  // exits on the left and right walls
  const exA = { x: rx, y: ry + rh / 2 }, exB = { x: rx + rw, y: ry + rh / 2 };
  stroke(blocked ? 'firebrick' : 'seagreen');
  strokeWeight(7);
  line(exA.x, exA.y - 11, exA.x, exA.y + 11);
  stroke('seagreen');
  line(exB.x, exB.y - 11, exB.x, exB.y + 11);
  if (blocked) {
    stroke('firebrick');
    strokeWeight(3);
    line(exA.x - 8, exA.y - 8, exA.x + 8, exA.y + 8);
    line(exA.x - 8, exA.y + 8, exA.x + 8, exA.y - 8);
  }
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, TOP);
  text(blocked ? 'Exit A blocked' : 'Exit A', rx, ry + rh + 6);
  textAlign(RIGHT, TOP);
  text('Exit B', rx + rw, ry + rh + 6);
  // longest walk: from the middle to the nearest door, or from beside the blocked door to the far door
  let from, to;
  if (blocked) { from = { x: rx + 12, y: ry + rh * 0.62 }; to = { x: exB.x - 5, y: exB.y + 8 }; }
  else { from = { x: rx + rw / 2, y: ry + rh * 0.62 }; to = { x: exA.x + 6, y: exA.y + 8 }; }
  stroke('darkorange');
  strokeWeight(2.5);
  drawingContext.setLineDash([6, 4]);
  line(from.x, from.y, to.x, to.y);
  drawingContext.setLineDash([]);
  const ang = atan2(to.y - from.y, to.x - from.x);
  noStroke();
  fill('darkorange');
  push();
  translate(to.x, to.y);
  rotate(ang);
  triangle(0, 0, -9, -4.5, -9, 4.5);
  pop();
  noFill();
  stroke('black');
  strokeWeight(2);
  circle(from.x, from.y, 10);
}

function drawReadout(m) {
  const x = 10, w = canvasWidth - 20, y = 190, ok = m.margin > 0;
  noStroke();
  textAlign(LEFT, TOP);
  fill('black');
  textSize(14);
  const asetTxt = sprBox.checked() ? 'ASET = ' + f1(asetSlider.value()) + ' + ' + f1(SPRINKLER_GAIN) + ' = ' + f1(m.aset) : 'ASET = ' + f1(m.aset);
  text('RSET = ' + f1(m.det) + ' + ' + f1(m.pre) + ' + ' + f1(m.trv) + ' = ' + f1(m.rset) + ' min;  ' + asetTxt + ' min', x, y, w, 40);
  fill(ok ? 'seagreen' : 'firebrick');
  textSize(15);
  text('Margin = ' + f1(m.aset) + ' \u2212 ' + f1(m.rset) + ' = ' + signed(m.margin) + ' min', x, y + 19, w, 24);
  text(ok ? 'Margin is positive.' : 'Occupants may be caught by smoke.', x, y + 38, w, 24);
}

// margin gained by each measure (right of the plan), and the explanation of the last checkbox change (below it)
function drawNotes(m) {
  const P = planRect(), x = P.x + P.w + 14, w = canvasWidth - x - 10;
  const gains = [['sprinklers', SPRINKLER_GAIN], ['voice alarm', r2(preSlider.value() * (1 - VOICE_FACTOR))], ['both exits open', TRAVEL_BASE]];
  let best = 0;
  gains.forEach((g, i) => { if (g[1] > gains[best][1]) best = i; });
  noStroke();
  fill('navy');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Margin gained by each measure now: ' + gains.map(g => g[0] + ' +' + f1(g[1])).join(', ') + ' min. Largest: ' + gains[best][0] + '.', x, P.y, w, P.h);
  fill('black');
  text(lastWhy || 'Click a checkbox to see why it changes the time. Hover over a bar segment for its definition.', 10, P.y + P.h + 6, canvasWidth - 20, 60);
}

function drawTooltip(m) {
  let head, body;
  if (hoverPart === 'aset') {
    head = 'Available safe egress time (ASET)';
    body = 'How long until smoke and heat make the escape route unsurvivable. Riverbend\'s smoke analysis gives 6 minutes (illustrative).';
  } else if (hoverPart === 'margin') {
    head = 'Safety margin = ASET − RSET';
    body = m.margin > 0 ? 'Occupants are out before conditions become unsurvivable, by ' + f1(m.margin) + ' minutes.' : 'Occupants are still inside when conditions become unsurvivable.';
  } else {
    const p = parts.find(q => q.key === hoverPart);
    head = p.name + ': ' + f1(m[p.key]) + ' min';
    body = p.def + ' ' + p.ex;
  }
  const w = min(canvasWidth - 20, 300);
  textSize(14);
  const h = 26 + max(1, ceil(textWidth(body) * 1.1 / (w - 16))) * 17.5;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 18, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('navy');
  textAlign(LEFT, TOP);
  text(head, tx + 8, ty + 5, w - 16, 20);
  fill('black');
  text(body, tx + 8, ty + 25, w - 16, h);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Detection and alarm: ' + f1(detSlider.value()) + ' min', 10, drawHeight + 20);
  text('Pre-movement: ' + f1(preSlider.value()) + ' min', 10, drawHeight + 55);
  text('Available safe egress time: ' + f1(asetSlider.value()) + ' min', 10, drawHeight + 90);
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
