// Code Adoption and Authority Chain MicroSim - five layers from a model code to a permitted project, with hover definitions, click infoboxes, an amendment toggle, and a "Which rule wins?" quiz
// CANVAS_HEIGHT: 535
// Bloom Level 2 (Understand) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 490;
let controlHeight = 45; // one row of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10; // no sliders; left edge of the control row
let defaultTextSize = 16;

// ---- Data: the five layers, top to bottom. fill/line colors are named; dash gives each layer its own border style ----
const layers = [
  { name: 'Model code publisher', sub: 'e.g., ICC (the IBC)', fill: 'lightskyblue', dash: [], dbl: false, ink: 'black',
    q: 'Where do the rules start?',
    tip: 'A private standards organization writes a model code by consensus; it has no legal force until a government adopts it.',
    writes: 'Consensus committees of officials, engineers, and others, about every 3 years.',
    enforces: 'No one. It becomes law only when a state or city adopts it.',
    ex: 'Suppose a 2024 edition exists while Minnesota still references 2021 (illustrative).' },
  { name: 'State adoption', sub: 'MN code + amendments', fill: 'palegreen', dash: [10, 5], dbl: false, ink: 'black',
    q: 'Which edition is the law here?',
    tip: 'The state enacts the model code into law, usually with amendments that suit local conditions such as a cold climate.',
    writes: 'MN Department of Labor and Industry adopts the IBC with Minnesota amendments.',
    enforces: 'Most cities and counties, through their own building officials.',
    ex: 'A 2025 permit application is reviewed against the 2021 edition in force, not the 2024 one.',
    exAmend: 'Footings must go below frost depth (42 in at Riverbend), an illustrative Minnesota amendment.' },
  { name: 'Local ordinance', sub: 'City or county, zoning', fill: 'navajowhite', dash: [2, 5], dbl: false, ink: 'black',
    q: 'May we build this here?',
    tip: 'A city or county adds local rules such as zoning, but generally cannot weaken the state code.',
    writes: 'City council or county board; the planning office runs zoning.',
    enforces: 'Zoning staff and the local building official.',
    ex: 'Confirm a community center is permitted in the district and the footprint meets setbacks.' },
  { name: 'Referenced standards', sub: 'ASTM, ACI, NFPA, ASCE', fill: 'lightgray', dash: [12, 4, 2, 4], dbl: false, ink: 'black',
    q: 'How is it designed or tested?',
    tip: 'Documents written by standards organizations that a code names, which makes the cited edition enforceable.',
    writes: 'Organizations such as ASTM, ACI, NFPA, ASCE, and the American Wood Council.',
    enforces: 'The building official, because the adopted code cites them.',
    ex: 'The IBC cites ASCE/SEI 7 for snow, wind, and live loads and an AWC specification for the glulam beams.' },
  { name: 'Your project', sub: 'Permit, review, inspection', fill: 'navy', dash: [], dbl: true, ink: 'white',
    q: 'What must this building do?',
    tip: 'The project is where every layer meets: permit, plan review, and inspections apply them all to one building.',
    writes: 'The design team, in drawings and specifications.',
    enforces: 'Building official: permit, plan review, inspections, certificate of occupancy.',
    ex: 'Exterior footings follow the model-code text, with no Minnesota frost-depth rule (illustrative).',
    exAmend: 'Exterior footings must bear below the 42 in frost depth of Chapter 10 (illustrative).' }
];
const projectSubAmend = 'Footings below frost depth';
const stateSubAmend = '+ Amendment: frost depth';

// ---- Quiz: ans is the index of the controlling layer ----
const conflicts = [
  { q: 'A newer model-code edition changed a stair rule, but Minnesota still enforces the older edition. Which layer controls the Riverbend stairs?', ans: 1,
    why: 'State adoption controls. A model code has no legal force until adopted, and the edition in force on the permit date governs.' },
  { q: 'A city ordinance would let Riverbend use one fewer exit than the state code requires. Which layer controls the exit count?', ans: 1,
    why: 'State adoption controls. Local rules may add requirements such as zoning, but generally cannot weaken the state code.' },
  { q: 'Riverbend\'s zoning district sets a 35 ft height limit (illustrative), lower than the building code would allow. Which layer controls the height?', ans: 2,
    why: 'The local ordinance controls. Zoning answers "may we build this here?", and a stricter zoning limit must be met in addition to the building code.' },
  { q: 'The IBC cites a loads standard for snow, but a designer prefers a value from a handbook. Which layer controls the snow load?', ans: 3,
    why: 'Referenced standards control. Once the code cites a standard, that edition becomes part of the code to the extent it is referenced.' },
  { q: 'The model code\'s footing text differs from Minnesota\'s frost-depth amendment. Which layer controls the footing depth?', ans: 1,
    why: 'State adoption controls. The amendment changes the model code for Minnesota conditions, and the amended text is what is enforced.' }
];

// ---- State ----
let selected = -1;     // layer shown in the infobox
let hoverLayer = -1;
let amendOn = false;
let quizMode = false;  // true while a "Which rule wins?" question is on screen
let quizDeck = [], quizPos = -1;
let picked = -1;       // layer chosen for the current question, -1 while unanswered
let layerRects = [];

// ---- Controls ----
let amendCheck, quizButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  amendCheck = createCheckbox('Amendment on', false);
  amendCheck.position(10, drawHeight + 10);
  amendCheck.changed(() => { amendOn = amendCheck.checked(); });

  quizButton = createButton('Which rule wins?');
  quizButton.position(controlButtonX(), drawHeight + 10);
  quizButton.mousePressed(nextConflict);

  quizDeck = shuffleIndices(conflicts.length);
  describe('A vertical stack of five labeled layers joined by downward arrows: model code publisher, state adoption, local ordinance, referenced standards, and your project. Each layer has a question it answers. Hovering shows a definition and clicking shows who writes it, who enforces it, and a Riverbend example. A checkbox adds a Minnesota amendment and shows how the project requirement changes. A button asks which layer controls in a conflict between rules.', LABEL);
}

function controlButtonX() { return 10 + 155; }

function shuffleIndices(n) {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nextConflict() {
  quizPos = (quizPos + 1) % quizDeck.length;
  quizMode = true;
  picked = -1;
  selected = -1;
}

function currentConflict() { return conflicts[quizDeck[quizPos]]; }

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
  text('Code Adoption and Authority Chain', canvasWidth / 2, 8);

  layoutLayers();
  hoverLayer = -1;
  if (mouseY >= 0 && mouseY < drawHeight) {
    for (let i = 0; i < layerRects.length; i++) {
      const b = layerRects[i];
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) hoverLayer = i;
    }
  }
  cursor(hoverLayer >= 0 ? HAND : ARROW);

  drawQuestionStrip();
  drawLayers();
  drawPanel();
  drawHoverTip();
  drawControlLabels();
}

function layoutLayers() {
  const w = floor(canvasWidth * 0.5), h = 42, gap = 10, top = 60;
  layerRects = [];
  for (let i = 0; i < layers.length; i++) layerRects.push({ x: 10, y: top + i * (h + gap), w: w, h: h });
}

// side strip: the question each layer answers, aligned to the layer row
function drawQuestionStrip() {
  const b0 = layerRects[0], x = b0.x + b0.w + 12, w = canvasWidth - x - 8;
  const top = b0.y - 22, bottom = layerRects[4].y + layerRects[4].h + 4;
  noStroke();
  fill('white');
  rect(x, top, w, bottom - top, 8);
  fill('dimgray');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Question this layer answers', x + 8, top + 11);
  fill('black');
  for (let i = 0; i < layers.length; i++) {
    const b = layerRects[i];
    textAlign(LEFT, CENTER);
    textSize(14);
    text(layers[i].q, x + 8, b.y, w - 14, b.h);
  }
}

function drawLayers() {
  // arrows first, so boxes sit on top
  for (let i = 0; i < layers.length - 1; i++) {
    const b = layerRects[i], cx = b.x + b.w / 2, y1 = b.y + b.h, y2 = layerRects[i + 1].y;
    stroke('dimgray');
    strokeWeight(3);
    line(cx, y1 + 1, cx, y2 - 6);
    noStroke();
    fill('dimgray');
    triangle(cx - 7, y2 - 8, cx + 7, y2 - 8, cx, y2 - 1);
  }
  const q = quizMode ? currentConflict() : null;
  for (let i = 0; i < layers.length; i++) {
    const L = layers[i], b = layerRects[i];
    const isAmended = amendOn && (i === 1 || i === 4);
    // selected halo
    if (i === selected && !quizMode) {
      noFill();
      stroke('black');
      strokeWeight(2);
      rect(b.x - 4, b.y - 4, b.w + 8, b.h + 8, 10);
    }
    // fill
    stroke(i === hoverLayer ? 'black' : 'dimgray');
    strokeWeight(i === hoverLayer ? 3 : 2);
    drawingContext.setLineDash(L.dash);
    fill(L.fill);
    rect(b.x, b.y, b.w, b.h, 8);
    drawingContext.setLineDash([]);
    if (L.dbl) { // double border for the project layer
      noFill();
      stroke('white');
      strokeWeight(2);
      rect(b.x + 5, b.y + 5, b.w - 10, b.h - 10, 5);
    }
    // amendment highlight: gold outline
    if (isAmended) {
      noFill();
      stroke('goldenrod');
      strokeWeight(5);
      rect(b.x - 2, b.y - 2, b.w + 4, b.h + 4, 9);
    }
    // text
    noStroke();
    fill(L.ink);
    textAlign(LEFT, CENTER);
    textSize(16);
    text((i + 1) + '. ' + L.name, b.x + 10, b.y + 13);
    textSize(14);
    const sub = amendOn && i === 1 ? stateSubAmend : (amendOn && i === 4 ? projectSubAmend : L.sub);
    text(sub, b.x + 10, b.y + 30);
  }
  // quiz result outlines drawn last
  if (quizMode && picked >= 0) {
    noFill();
    stroke('seagreen');
    strokeWeight(4);
    const a = layerRects[q.ans];
    rect(a.x - 3, a.y - 3, a.w + 6, a.h + 6, 10);
    if (picked !== q.ans) {
      stroke('darkorange');
      const p = layerRects[picked];
      rect(p.x - 3, p.y - 3, p.w + 6, p.h + 6, 10);
    }
  }
  // text tags on the top edge of a box, so state is never conveyed by color alone
  for (let i = 0; i < layers.length; i++) {
    if (quizMode && picked >= 0) {
      if (i === q.ans) drawTag(layerRects[i], 'CONTROLS', 'seagreen', 'white');
      else if (i === picked) drawTag(layerRects[i], 'YOUR PICK', 'orange', 'black');
    } else if (amendOn && (i === 1 || i === 4)) drawTag(layerRects[i], 'AMENDED', 'gold', 'black');
  }
}

function drawTag(b, label, bg, ink) {
  textSize(12);
  textAlign(CENTER, CENTER);
  const tw = textWidth(label) + 12, tx = b.x + b.w - tw - 8, ty = b.y - 8;
  stroke('dimgray');
  strokeWeight(1);
  fill(bg);
  rect(tx, ty, tw, 16, 8);
  noStroke();
  fill(ink);
  text(label, tx + tw / 2, ty + 8);
}

// number of wrapped lines text needs in a box of width w at the current text size (slightly pessimistic)
function wrappedLines(str, w) { return max(1, ceil(textWidth(str) * 1.1 / w)); }

// bottom panel: infobox, quiz, or the default hint
function drawPanel() {
  const x = 10, w = canvasWidth - 20, y = layerRects[4].y + layerRects[4].h + 14, h = drawHeight - y - 8;
  const px = x + 10, pw = w - 20, lead = 17.5;
  stroke('silver');
  strokeWeight(2);
  fill('white');
  if (quizMode && picked >= 0) stroke(picked === currentConflict().ans ? 'seagreen' : 'darkorange');
  rect(x, y, w, h, 10);
  noStroke();
  textAlign(LEFT, TOP);
  if (quizMode) {
    const q = currentConflict();
    fill('dimgray');
    textSize(14);
    text('Which rule wins? Question ' + (quizPos + 1) + ' of ' + quizDeck.length, px, y + 6);
    fill('black');
    textSize(14);
    text(q.q, px, y + 25, pw, 100);
    const qh = wrappedLines(q.q, pw) * lead;
    if (picked < 0) {
      fill('navy');
      text('Click the layer you think controls.', px, y + 25 + qh + 6);
    } else {
      const ok = picked === q.ans;
      fill(ok ? 'seagreen' : 'sienna');
      text((ok ? 'Correct. ' : 'Not quite. ') + q.why, px, y + 25 + qh + 6, pw, 100);
    }
    return;
  }
  if (selected >= 0) {
    const L = layers[selected];
    fill('navy');
    textSize(16);
    text((selected + 1) + '. ' + L.name, px, y + 6);
    const labelW = 82, bodyW = pw - labelW;
    const ex = amendOn && L.exAmend ? L.exAmend : L.ex;
    const rows = [['Written by', L.writes], ['Enforced by', L.enforces], ['Riverbend', ex]];
    let yy = y + 30;
    textSize(14);
    for (const r of rows) {
      fill('dimgray');
      text(r[0], px, yy);
      fill('black');
      text(r[1], px + labelW, yy, bodyW, 80);
      yy += wrappedLines(r[1], bodyW) * lead + 4;
    }
    return;
  }
  fill('black');
  textSize(15);
  const hint = amendOn
    ? 'Amendment on: Minnesota changes the model code\'s footing text, so the state layer is highlighted and the project requirement becomes "footings below frost depth." Click a layer for details.'
    : 'Hover a layer for a definition and click it for who writes it, who enforces it, and a Riverbend example. Turn on the amendment or press "Which rule wins?"';
  text(hint, px, y + 8, pw, h - 12);
}

function drawHoverTip() {
  if (hoverLayer < 0) return;
  const w = min(canvasWidth - 20, 320);
  const tipText = layers[hoverLayer].tip;
  textSize(14);
  const lines = ceil(textWidth(tipText) / (w - 20)) + 1;
  const h = lines * 17.5 + 10;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(tipText, tx + 8, ty + 6, w - 16, h - 8);
}

function drawControlLabels() {
  if (canvasWidth < 560) return;
  noStroke();
  fill('dimgray');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Hover for a definition. Click a layer for details.', controlButtonX() + 150, drawHeight + 23);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  for (let i = 0; i < layerRects.length; i++) {
    const b = layerRects[i];
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      if (quizMode && picked < 0) { picked = i; return; }   // answer the question
      quizMode = false;                                       // otherwise explore this layer
      selected = (selected === i) ? -1 : i;
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  quizButton.position(controlButtonX(), drawHeight + 10);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
