// Building Systems Cutaway MicroSim - six building systems in a two-story house section, with layer toggles, component infoboxes, and "What if?" scenarios
// CANVAS_HEIGHT: 515
// Bloom Level 1 (Remember) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 45; // one row of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 80; // x position of the "What if?" menu
let defaultTextSize = 16;

// ---- Data: the six systems (color-blind safe palette; every swatch is also labeled with text) ----
const systems = [
  { key: 'structure', name: 'Structure', col: 'royalblue' },
  { key: 'enclosure', name: 'Enclosure', col: 'orange' },
  { key: 'mechanical', name: 'Mechanical', col: 'seagreen' },
  { key: 'plumbing', name: 'Plumbing', col: 'deepskyblue' },
  { key: 'electrical', name: 'Electrical', col: 'gold' },
  { key: 'fire', name: 'Fire protection', col: 'mediumvioletred' }
];
const sysByKey = {};
systems.forEach(s => { sysByKey[s.key] = s; });

// Scene is drawn in design units (x 8..118, y 0..106) and scaled to fit.
// Shapes: ['r', x, y, w, h] rectangle, ['l', x1, y1, x2, y2, thickness] line, ['c', cx, cy, r] circle.
const VX0 = 8, VX1 = 118, VY0 = 0, VY1 = 106;

// Components in drawing order (later = on top). flag 'insul' = insulation; 'glass' = window.
const comps = [
  { sys: 'structure', name: 'Footing', shapes: [['r', 18, 98, 12, 4], ['r', 90, 98, 12, 4]],
    deps: ['enclosure', 'mechanical', 'plumbing', 'electrical', 'fire'], why: 'Spreads the weight of the whole building into the soil, below frost depth.' },
  { sys: 'structure', name: 'Foundation wall', shapes: [['r', 20, 76, 8, 22], ['r', 92, 76, 8, 22]],
    deps: ['enclosure', 'plumbing', 'electrical'], why: 'Carries the walls down to the footing. Pipes and cables must pass through it with sleeves.' },
  { sys: 'structure', name: 'Basement slab', shapes: [['r', 28, 97, 64, 3]],
    deps: ['mechanical', 'plumbing'], why: 'The furnace stands on it, and the drain lines run beneath it.' },
  { sys: 'structure', name: 'Floor framing (joists)', shapes: [['r', 28, 50, 64, 4], ['r', 28, 72, 64, 4]],
    deps: ['mechanical', 'plumbing', 'electrical', 'fire'], why: 'Carries each floor. Ducts, pipes, and wires pass through it, so every hole needs a check.' },
  { sys: 'structure', name: 'Roof trusses', shapes: [['l', 18, 28.5, 60, 6, 2], ['l', 60, 6, 102, 28.5, 2], ['r', 20, 27.5, 80, 2.5]],
    deps: ['enclosure', 'plumbing'], why: 'Carry the roof and snow loads. The roof covering and the vent pipe attach to them.' },
  { sys: 'structure', name: 'Wall studs', shapes: [['r', 25, 30, 1.8, 46], ['r', 93.2, 30, 1.8, 46]],
    deps: ['enclosure', 'electrical', 'fire'], why: 'Frame the walls. The cladding, the wiring, and the gypsum board all fasten to them.' },
  { sys: 'enclosure', name: 'Wall insulation', insul: true, shapes: [['r', 22, 30, 3, 46], ['r', 95, 30, 3, 46]],
    deps: ['mechanical', 'structure'], why: 'Slows heat flow through the wall. The furnace is sized for the heat loss it allows.' },
  { sys: 'enclosure', name: 'Attic insulation', insul: true, shapes: [['r', 30, 23.5, 60, 4]],
    deps: ['mechanical'], why: 'Slows heat loss through the ceiling, which helps set how large the furnace must be.' },
  { sys: 'enclosure', name: 'Wall cladding and sheathing', shapes: [['r', 20, 27.5, 2, 48.5], ['r', 98, 27.5, 2, 48.5]],
    deps: ['structure', 'mechanical'], why: 'Keeps rain and wind out so the framing stays dry and the furnace is not working against drafts.' },
  { sys: 'enclosure', name: 'Roof covering', shapes: [['l', 12, 27, 60, 2, 1.6], ['l', 60, 2, 108, 27, 1.6]],
    deps: ['structure', 'plumbing'], why: 'Sheds rain and snow. The framing below must stay dry, and the vent pipe is flashed through it.' },
  { sys: 'fire', name: 'Gypsum board (fire-rated)', shapes: [['r', 26.8, 30, 1.2, 46], ['r', 92, 30, 1.2, 46], ['r', 28, 30, 64, 1], ['r', 28, 54, 64, 1]],
    deps: ['structure'], why: 'Covers the wood framing and slows a fire so the structure keeps standing longer.' },
  { sys: 'enclosure', name: 'Window', glass: true, shapes: [['r', 92, 35, 8, 8]],
    deps: ['mechanical', 'electrical'], why: 'Admits daylight but loses heat. It sets part of the heating load and reduces the lighting needed.' },
  { sys: 'enclosure', name: 'Large window (new)', glass: true, onlyIf: 'window', shapes: [['r', 20, 56, 8, 14]],
    deps: ['mechanical', 'structure'], why: 'More glass means more heat loss and a bigger opening that needs a header to carry the load above.' },
  { sys: 'mechanical', name: 'Furnace', shapes: () => [['r', furnaceX(), 85, 12, 12]],
    deps: ['enclosure', 'plumbing'], why: 'Makes the heat that the enclosure loses. It also keeps the pipes from freezing.' },
  { sys: 'mechanical', name: 'Supply duct', shapes: () => ductShapes(),
    deps: ['enclosure'], why: 'Delivers warm air to replace the heat the enclosure loses. It passes through the floor framing.' },
  { sys: 'plumbing', name: 'Water supply pipe', shapes: [['l', 20, 79, 77, 79, 1.4], ['l', 77, 79, 77, 36, 1.4]],
    deps: ['fire'], why: 'Brings water in through the foundation. The sprinklers are fed from the same supply.' },
  { sys: 'plumbing', name: 'Drain and vent stack', shapes: [['l', 88, 11, 88, 104, 1.8], ['l', 88, 104, 118, 104, 1.8]],
    deps: ['mechanical'], why: 'Carries waste to the sewer and vents through the roof. The furnace condensate drains into it.' },
  { sys: 'plumbing', name: 'Bathroom fixtures', shapes: [['r', 79, 67, 7, 5], ['r', 79, 45, 7, 5]],
    deps: ['structure'], why: 'Their location decides where the floor framing needs blocking and drain openings.' },
  { sys: 'electrical', name: 'Service panel', shapes: [['r', 29.5, 80, 4, 10]],
    deps: ['mechanical', 'fire'], why: 'Distributes power. The furnace and the smoke alarms each depend on a circuit from it.' },
  { sys: 'electrical', name: 'Wiring', shapes: [['l', 33, 81, 33, 32, 0.8], ['l', 33, 32, 50, 32, 0.8], ['l', 33, 56, 50, 56, 0.8]],
    deps: ['mechanical', 'fire'], why: 'Runs through holes in the framing to the furnace, lights, and alarms.' },
  { sys: 'electrical', name: 'Light fixtures', shapes: [['r', 47, 31, 6, 2.2], ['r', 47, 55, 6, 2.2]],
    deps: [], why: 'Turn power into light. No other system depends on a single fixture.' },
  { sys: 'fire', name: 'Smoke alarms', shapes: [['r', 55, 31, 4, 1.8], ['r', 55, 55, 4, 1.8]],
    deps: [], why: 'Warn the occupants early. They need power from the electrical system to work.' },
  { sys: 'fire', name: 'Sprinkler piping and heads', shapes: [['l', 70, 79, 70, 32.4, 1], ['l', 70, 32.4, 86, 32.4, 1], ['l', 70, 56.4, 86, 56.4, 1],
      ['c', 76, 34, 1.3], ['c', 83, 34, 1.3], ['c', 76, 58, 1.3], ['c', 83, 58, 1.3]],
    deps: ['structure'], why: 'Put out a fire early, which protects the framing. They need the plumbing supply.' }
];

// "What if?" scenarios: one sentence of explanation, the system that changes, and the systems affected
const scenarios = {
  'Remove insulation': { changed: ['enclosure'], affected: ['mechanical', 'electrical'],
    text: 'Without insulation the wall loses heat faster, so the furnace works harder and any electric backup heat draws more power.' },
  'Add a large window': { changed: ['enclosure'], affected: ['structure', 'mechanical'],
    text: 'A large window replaces insulated wall with glass, so heat loss rises, the framing needs a header over the opening, and the furnace must supply more heat.' },
  'Move the furnace': { changed: ['mechanical'], affected: ['structure', 'electrical', 'plumbing'],
    text: 'A new furnace spot needs new duct openings in the floor framing, a new power circuit, and a relocated condensate drain.' }
};
const noScenario = 'What if? (choose one)';

// ---- State ----
let hidden = {};        // system key -> true when its layer is off
let selected = null;    // clicked component
let hovered = null;     // component under the mouse
let scenario = null;    // key of scenarios, or null
let chipRects = [];     // legend chip hit areas
let houseRect = { x: 0, y: 0, w: 0, h: 0 };
let infoRect = { x: 0, y: 0, w: 0, h: 0 };
let sc = 1, ox = 0, oy = 0; // scene scale and offset

// ---- Controls ----
let scenarioSelect, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  scenarioSelect = createSelect();
  scenarioSelect.option(noScenario);
  Object.keys(scenarios).forEach(k => scenarioSelect.option(k));
  scenarioSelect.selected(noScenario);
  scenarioSelect.position(sliderLeftMargin, drawHeight + 10);
  scenarioSelect.size(190);
  scenarioSelect.changed(() => {
    scenario = scenarioSelect.value() === noScenario ? null : scenarioSelect.value();
    selected = null;
  });

  resetButton = createButton('Reset view');
  resetButton.position(sliderLeftMargin + 200, drawHeight + 10);
  resetButton.mousePressed(resetView);

  describe('A section through a two-story house with a basement, drawn in six colors for the structure, enclosure, mechanical, plumbing, electrical, and fire protection systems. A legend turns each system layer on or off. Clicking a component shows its system and which other systems depend on it. A What if menu highlights the systems affected by removing insulation, adding a large window, or moving the furnace.', LABEL);
}

function resetView() {
  hidden = {};
  selected = null;
  scenario = null;
  scenarioSelect.selected(noScenario);
}

function furnaceX() { return scenario === 'Move the furnace' ? 36 : 56; }

function ductShapes() {
  const moved = scenario === 'Move the furnace';
  const cx = furnaceX() + 6, d = moved ? 8 : -8;
  return [['l', cx, 85, cx, 37, 2.4], ['l', cx, 60, cx + d, 60, 1.6], ['l', cx, 40, cx + d, 40, 1.6]];
}

function shapesOf(c) { return typeof c.shapes === 'function' ? c.shapes() : c.shapes; }
function isShown(c) {
  if (hidden[c.sys]) return false;
  if (c.onlyIf === 'window') return scenario === 'Add a large window';
  return true;
}

// ---- Layout: wide = house at left, legend and infobox at right; narrow = legend on top, house, infobox below ----
function layoutAll() {
  const wide = canvasWidth >= 640;
  const cols = wide ? 2 : 3;
  const chipH = 34, gap = 6;
  let areaX, areaW, legendY = 40;
  if (wide) {
    houseRect = { x: 10, y: 40, w: floor(canvasWidth * 0.56), h: drawHeight - 48 };
    areaX = houseRect.x + houseRect.w + 12;
    areaW = canvasWidth - areaX - 10;
  } else {
    areaX = 10;
    areaW = canvasWidth - 20;
  }
  const chipW = (areaW - gap * (cols - 1)) / cols;
  chipRects = systems.map((s, i) => ({
    key: s.key, x: areaX + (i % cols) * (chipW + gap), y: legendY + floor(i / cols) * (chipH + gap), w: chipW, h: chipH
  }));
  const legendBottom = legendY + ceil(6 / cols) * (chipH + gap);
  if (wide) {
    infoRect = { x: areaX, y: legendBottom + 4, w: areaW, h: drawHeight - legendBottom - 12 };
  } else {
    const infoH = 132;
    infoRect = { x: 10, y: drawHeight - infoH - 6, w: canvasWidth - 20, h: infoH };
    houseRect = { x: 10, y: legendBottom + 2, w: canvasWidth - 20, h: infoRect.y - legendBottom - 8 };
  }
  sc = min(houseRect.w / (VX1 - VX0), houseRect.h / (VY1 - VY0));
  ox = houseRect.x + (houseRect.w - sc * (VX1 - VX0)) / 2;
  oy = houseRect.y + (houseRect.h - sc * (VY1 - VY0)) / 2;
}

function X(x) { return ox + (x - VX0) * sc; }
function Y(y) { return oy + (y - VY0) * sc; }

// ---- Highlight state: which systems are in focus (selection first, then scenario) ----
function focusTags() {
  const tags = {};
  if (selected) {
    tags[selected.sys] = 'selected';
    selected.deps.forEach(k => { tags[k] = 'depends on it'; });
  } else if (scenario) {
    scenarios[scenario].changed.forEach(k => { tags[k] = 'changed'; });
    scenarios[scenario].affected.forEach(k => { tags[k] = 'affected'; });
  }
  return tags;
}

function withAlpha(name, a) { const c = color(name); c.setAlpha(a); return c; }

function draw() {
  updateCanvasSize();
  layoutAll();

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
  text('Building Systems Cutaway', canvasWidth / 2, 8);

  hovered = null;
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) hovered = hitTest(mouseX, mouseY);

  const tags = focusTags();
  drawGround();
  for (const c of comps) if (isShown(c)) drawComp(c, tags);
  drawScenarioMarks();
  drawLegend(tags);
  drawInfo(tags);
  drawHoverTip();
  drawControlLabels();
  cursor(hovered || overChip() ? HAND : ARROW);
}

function drawGround() {
  noStroke();
  fill('tan');
  rect(X(VX0), Y(80), (VX1 - VX0) * sc, 26 * sc);
  fill('white');
  rect(X(20), Y(30), 80 * sc, 67 * sc);
  stroke('silver');
  strokeWeight(1);
  line(X(VX0), Y(80), X(20), Y(80));
  line(X(100), Y(80), X(VX1), Y(80));
}

function drawComp(c, tags) {
  const inFocus = Object.keys(tags).length === 0 || tags[c.sys];
  const a = inFocus ? 255 : 50;
  const isSel = c === selected, isHov = c === hovered;
  const removed = c.insul && scenario === 'Remove insulation';
  const baseCol = sysByKey[c.sys].col;
  const lineCol = isSel ? 'black' : (isHov ? 'navy' : (tags[c.sys] ? 'black' : 'dimgray'));
  const lw = isSel ? 3 : (isHov ? 2.5 : (tags[c.sys] ? 2 : 1));
  for (const s of shapesOf(c)) {
    if (s[0] === 'l') {
      const t = s[5] * sc;
      if (isSel || isHov || tags[c.sys]) {
        stroke(withAlpha(lineCol, a));
        strokeWeight(t + 2 * lw);
        strokeCap(SQUARE);
        line(X(s[1]), Y(s[2]), X(s[3]), Y(s[4]));
      }
      stroke(withAlpha(baseCol, a));
      strokeWeight(t);
      strokeCap(SQUARE);
      line(X(s[1]), Y(s[2]), X(s[3]), Y(s[4]));
      continue;
    }
    stroke(withAlpha(lineCol, a));
    strokeWeight(lw);
    if (removed) { drawingContext.setLineDash([4, 3]); noFill(); }
    else fill(withAlpha(c.glass ? 'lightcyan' : baseCol, a));
    if (s[0] === 'r') {
      rect(X(s[1]), Y(s[2]), s[3] * sc, s[4] * sc);
      if (c.insul && !removed) hatch(s, a);
      if (c.glass) {
        stroke(withAlpha(baseCol, a));
        strokeWeight(max(2, 1.2 * sc));
        noFill();
        rect(X(s[1]), Y(s[2]), s[3] * sc, s[4] * sc);
      }
    } else circle(X(s[1]), Y(s[2]), 2 * s[3] * sc);
    drawingContext.setLineDash([]);
  }
}

// diagonal hatching inside an insulation rectangle (clipped to the rectangle)
function hatch(s, a) {
  const x = X(s[1]), y = Y(s[2]), w = s[3] * sc, h = s[4] * sc;
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(x, y, w, h);
  drawingContext.clip();
  stroke(withAlpha('darkgoldenrod', a));
  strokeWeight(1);
  for (let k = -h; k < w + h; k += 6) line(x + k, y + h, x + k + h, y);
  drawingContext.restore();
}

// ghost furnace, "new" window label, and "removed" label for the scenarios
function drawScenarioMarks() {
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  if (scenario === 'Move the furnace' && !hidden.mechanical) {
    stroke('seagreen');
    strokeWeight(1);
    drawingContext.setLineDash([4, 3]);
    noFill();
    rect(X(56), Y(85), 12 * sc, 12 * sc);
    drawingContext.setLineDash([]);
    noStroke();
    fill('black');
    text('old spot', X(56), Y(85) + 12 * sc + 2);
  }
  if (scenario === 'Add a large window' && !hidden.enclosure) {
    fill('white');
    rect(X(29), Y(57), 74, 18, 4);
    fill('black');
    textAlign(LEFT, CENTER);
    text('new window', X(29) + 4, Y(57) + 9);
  }
  if (scenario === 'Remove insulation' && !hidden.enclosure) {
    fill('black');
    textAlign(CENTER, TOP);
    text('insulation removed', X(60), Y(23.5) - 14);
  }
}

// ---- Legend: system name chips (click to toggle a layer) ----
function drawLegend(tags) {
  for (let i = 0; i < systems.length; i++) {
    const s = systems[i], r = chipRects[i];
    const off = hidden[s.key];
    const tag = off ? 'layer off' : (tags[s.key] || '');
    stroke(tag && !off ? 'black' : 'silver');
    strokeWeight(tag && !off ? 3 : 1);
    fill(off ? 'whitesmoke' : 'white');
    rect(r.x, r.y, r.w, r.h, 6);
    stroke('dimgray');
    strokeWeight(1);
    fill(off ? 'white' : s.col);
    rect(r.x + 7, r.y + r.h / 2 - 7, 14, 14, 2);
    noStroke();
    fill(off ? 'gray' : 'black');
    textAlign(LEFT, CENTER);
    textSize(14);
    text(s.name, r.x + 27, r.y + (tag ? 11 : r.h / 2));
    if (tag) {
      textSize(12);
      fill('dimgray');
      text(tag, r.x + 27, r.y + 25);
    }
  }
}

function overChip() {
  return chipRects.some(r => mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h);
}

// ---- Infobox ----
function names(keys) { return keys.map(k => sysByKey[k].name).join(', '); }

// draws wrapped text line by line and returns the next y
function wrapText(str, x, y, w, lead) {
  const words = str.split(' ');
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) > w && line) { text(line, x, y); y += lead; line = word; }
    else line = test;
  }
  if (line) { text(line, x, y); y += lead; }
  return y;
}

function drawInfo(tags) {
  const r = infoRect;
  stroke(selected ? sysByKey[selected.sys].col : 'silver');
  strokeWeight(selected ? 3 : 1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const x = r.x + 10, w = r.w - 20, lead = 17;
  let y = r.y + 8;
  textSize(16);
  textStyle(BOLD);
  if (selected) {
    y = wrapText(selected.name + ' (' + sysByKey[selected.sys].name + ' system)', x, y, w, 19);
    textStyle(NORMAL);
    textSize(14);
    y = wrapText('Other systems that depend on it: ' + (selected.deps.length ? names(selected.deps) : 'none directly') + '.', x, y + 2, w, lead);
    y = wrapText(selected.why, x, y + 4, w, lead);
  } else if (scenario) {
    const sn = scenarios[scenario];
    y = wrapText('What if: ' + scenario, x, y, w, 19);
    textStyle(NORMAL);
    textSize(14);
    y = wrapText(sn.text, x, y + 2, w, lead);
    y = wrapText('Changes: ' + names(sn.changed) + '. Also affected: ' + names(sn.affected) + '.', x, y + 4, w, lead);
  } else {
    y = wrapText('Click any part of the house', x, y, w, 19);
    textStyle(NORMAL);
    textSize(14);
    y = wrapText('Click a component to see its system and which other systems depend on it. Click a system name above to hide or show its layer. Try a What if? scenario below.', x, y + 2, w, lead);
  }
  textStyle(NORMAL);
}

// ---- Hit testing (topmost visible component wins) ----
function hitTest(mx, my) {
  for (let i = comps.length - 1; i >= 0; i--) {
    const c = comps[i];
    if (!isShown(c)) continue;
    for (const s of shapesOf(c)) {
      if (s[0] === 'r') {
        const pad = 2;
        if (mx >= X(s[1]) - pad && mx <= X(s[1] + s[3]) + pad && my >= Y(s[2]) - pad && my <= Y(s[2] + s[4]) + pad) return c;
      } else if (s[0] === 'l') {
        if (distToSegment(mx, my, X(s[1]), Y(s[2]), X(s[3]), Y(s[4])) <= max(s[5] * sc / 2, 5)) return c;
      } else if (dist(mx, my, X(s[1]), Y(s[2])) <= max(s[3] * sc, 5)) return c;
    }
  }
  return null;
}

function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1, dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  const t = len2 === 0 ? 0 : constrain(((px - x1) * dx + (py - y1) * dy) / len2, 0, 1);
  return dist(px, py, x1 + t * dx, y1 + t * dy);
}

function drawHoverTip() {
  if (!hovered) return;
  textSize(14);
  const label = hovered.name + ' - ' + sysByKey[hovered.sys].name;
  const w = textWidth(label) + 14, h = 24;
  const tx = constrain(mouseX + 12, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 240);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(label, tx + 7, ty + h / 2);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('What if?', 10, drawHeight + 22);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  for (const r of chipRects) {
    if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) {
      hidden[r.key] = !hidden[r.key];
      if (selected && hidden[selected.sys]) selected = null;
      return;
    }
  }
  selected = hitTest(mouseX, mouseY);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  scenarioSelect.position(sliderLeftMargin, drawHeight + 10);
  resetButton.position(sliderLeftMargin + 200, drawHeight + 10);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
