// IBC Question Router MicroSim - classify a design question into a group of IBC provisions, then compute an occupant load
// CANVAS_HEIGHT: 520
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 70; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

// ---- Data: the nine groups of IBC provisions, in the order a designer works ----
const groups = [
  { name: '1. Scope and administration', def: 'Who enforces the code, when a permit is needed, how appeals work, and the defined terms.' },
  { name: '2. Use and occupancy', def: 'Sorts a building into a class by what people do in it, such as assembly, business, or educational.' },
  { name: '3. Height, area, construction type', def: 'Limits how tall and large a building may be and what it may be built from.' },
  { name: '4. Fire and smoke protection', def: 'Fire-resistance ratings, fire barriers, sprinklers, alarms, and smoke control.' },
  { name: '5. Means of egress, accessibility', def: 'The path people follow to leave: exits, exit count, widths, travel distance, and accessible routes.' },
  { name: '6. Interior environment, energy', def: 'Light, ventilation, sound, and the references to the energy code.' },
  { name: '7. Exterior walls and roofs', def: 'Weather protection, wall coverings, flashing, roof coverings, and roof assemblies.' },
  { name: '8. Structural design, soils', def: 'Design loads, foundations and soils, and the concrete, masonry, steel, and wood chapters.' },
  { name: '9. Special inspections, standards', def: 'Independent inspections and tests, plus the closing list of referenced standards.' }
];

// Question bank: ans is the index into groups[]
const questions = [
  { q: 'Is the Riverbend multipurpose room an assembly use?', ans: 1, refs: 'Then: occupant load, then egress (group 5) and fire protection (group 4).', hint: 'You are sorting the room by what people do in it.' },
  { q: 'How many exits does the Riverbend classroom wing need?', ans: 4, refs: 'Starts with the occupant load from group 2, then checks width and travel distance.', hint: 'Exits are the path people follow to leave the building.' },
  { q: 'What snow load must the Riverbend roof carry?', ans: 7, refs: 'Refers to a loads standard, then to the roof framing material chapter.', hint: 'Loads on the building belong with structural design.' },
  { q: 'How large may the wood-framed building be without sprinklers?', ans: 2, refs: 'Ties to occupancy (group 2) and sprinklers (group 4).', hint: 'This limits size and the material the building is made of.' },
  { q: 'How long must the glued-laminated beams resist fire, if at all?', ans: 3, refs: 'Tied to the construction type in group 3.', hint: 'Think fire-resistance ratings.' },
  { q: 'Who is the authority having jurisdiction, and when is a permit required?', ans: 0, refs: 'Then confirm the adopted edition with the building official.', hint: 'These are administrative questions, not technical ones.' },
  { q: 'What does the term "occupant load" mean in the code?', ans: 0, refs: 'The definition is in group 1; the calculation uses group 2 and group 5.', hint: 'Defined terms are collected at the front of the code.' },
  { q: 'Does the concrete footing need an independent inspection?', ans: 8, refs: 'Special inspections reference testing standards listed at the back.', hint: 'An independent agency, not the building department, does this check.' },
  { q: 'How must the classroom windows provide daylight and fresh air?', ans: 5, refs: 'Light and ventilation here; the energy code governs window performance.', hint: 'Think of the interior environment.' },
  { q: 'What flashing is required where the roof meets a wall?', ans: 6, refs: 'Roof assemblies and weather protection, then the material chapters.', hint: 'This is part of the building envelope above grade.' },
  { q: 'What clear width must the main exit door have?', ans: 4, refs: 'Occupant load from group 2 sets the required width.', hint: 'Doors on the exit path are part of egress.' },
  { q: 'Which edition of the model code applies to the project?', ans: 0, refs: 'Confirm with the building official; amendments apply too.', hint: 'Adoption and enforcement are administrative.' },
  { q: 'How thick must the foundation wall and footing be?', ans: 7, refs: 'Soils and foundations, with Minnesota frost-depth amendments.', hint: 'Foundations and soils are covered under structural design.' },
  { q: 'Is a wheelchair ramp needed at the library entrance?', ans: 4, refs: 'Accessibility is grouped with egress; the federal ADA also applies.', hint: 'Accessible routes are grouped with exits.' }
];

// ---- State ----
let mode = 'Classify';
let deck = [];
let qIdx = 0;
let wrongPicks = [];
let solved = false;
let firstTry = true;
let scoreCorrect = 0;
let scoreAnswered = 0;
let hoverBlock = -1;
let blockRects = [];

// ---- Controls ----
let modeRadio, nextButton, areaSlider, factorRadio;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  modeRadio = createRadio();
  modeRadio.option('Classify');
  modeRadio.option('Occupant load');
  modeRadio.selected('Classify');
  modeRadio.position(10, drawHeight + 6);
  modeRadio.style('width', '260px');
  modeRadio.changed(() => { mode = modeRadio.value(); updateControlVisibility(); });

  nextButton = createButton('Next question');
  nextButton.position(285, drawHeight + 5);
  nextButton.mousePressed(nextQuestion);

  areaSlider = createSlider(500, 5000, 2400, 100);
  areaSlider.position(sliderLeftMargin, drawHeight + 42);
  areaSlider.size(sliderWidth());

  factorRadio = createRadio();
  factorRadio.option('15 net ft² per person');
  factorRadio.option('7 net ft² per person');
  factorRadio.selected('15 net ft² per person');
  factorRadio.style('width', '360px');
  factorRadio.position(factorRadioX(), drawHeight + 40);

  shuffleDeck();
  updateControlVisibility();
  describe('Two modes. In Classify mode, nine labeled blocks list groups of International Building Code provisions and the student clicks the block where the answer to a Riverbend design question starts. In Occupant load mode, a slider sets room area and a choice of floor area per person gives the occupant load and a note on the likely number of exits.', LABEL);
}

function sliderWidth() { return max(120, canvasWidth * 0.3); }
function factorRadioX() { return sliderLeftMargin + sliderWidth() + 25; }

function updateControlVisibility() {
  if (mode === 'Classify') {
    nextButton.show(); areaSlider.hide(); factorRadio.hide();
  } else {
    nextButton.hide(); areaSlider.show(); factorRadio.show();
  }
}

function shuffleDeck() {
  deck = questions.map((_, i) => i);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = floor(random(i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  qIdx = 0;
  resetQuestionState();
}

function resetQuestionState() { wrongPicks = []; solved = false; firstTry = true; }

function nextQuestion() {
  qIdx = (qIdx + 1) % deck.length;
  resetQuestionState();
}

function currentQ() { return questions[deck[qIdx]]; }

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
  text('IBC Question Router', canvasWidth / 2, 8);

  layoutBlocks();
  hoverBlock = -1;
  if (mouseY < drawHeight) {
    for (let i = 0; i < blockRects.length; i++) {
      const b = blockRects[i];
      if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) hoverBlock = i;
    }
  }

  drawBlocks();
  if (mode === 'Classify') drawQuestionCard(); else drawOccupantLoad();
  drawHoverDefinition();
  drawControlLabels();
}

function layoutBlocks() {
  const leftW = floor(canvasWidth * 0.46);
  const top = 46, gap = 4;
  const h = floor((drawHeight - top - 10 - gap * 8) / 9);
  blockRects = [];
  for (let i = 0; i < 9; i++) blockRects.push({ x: 10, y: top + i * (h + gap), w: leftW - 10, h: h });
}

function drawBlocks() {
  const highlight = (mode === 'Occupant load') ? [1, 4] : [];
  const q = currentQ();
  for (let i = 0; i < 9; i++) {
    const b = blockRects[i];
    let col = 'lightgray';
    let label = '';
    if (mode === 'Classify') {
      if (solved && i === q.ans) { col = 'mediumseagreen'; label = 'CORRECT'; }
      else if (wrongPicks.includes(i)) { col = 'darkorange'; label = 'NOT HERE'; }
    } else if (highlight.includes(i)) { col = 'khaki'; label = 'USED HERE'; }
    stroke(i === hoverBlock ? 'navy' : 'gray');
    strokeWeight(i === hoverBlock ? 3 : 1);
    fill(col);
    rect(b.x, b.y, b.w, b.h, 6);
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);
    text(groups[i].name, b.x + 8, b.y + b.h / 2);
    if (label) {
      textAlign(RIGHT, CENTER);
      textSize(12);
      text(label, b.x + b.w - 8, b.y + b.h / 2);
    }
  }
}

function drawQuestionCard() {
  const x = floor(canvasWidth * 0.46) + 20;
  const w = canvasWidth - x - 12;
  const q = currentQ();
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, 46, w, 150, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Question ' + (qIdx + 1) + ' of ' + deck.length, x + 12, 56);
  textSize(18);
  text(q.q, x + 12, 78, w - 24, 110);

  // feedback panel
  stroke(solved ? 'seagreen' : (wrongPicks.length ? 'darkorange' : 'silver'));
  strokeWeight(2);
  fill('white');
  rect(x, 208, w, 130, 10);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(16);
  if (solved) {
    fill('seagreen');
    text('Correct: ' + groups[q.ans].name, x + 12, 218, w - 24, 40);
    fill('black');
    text('Cross-references: ' + q.refs, x + 12, 258, w - 24, 76);
  } else if (wrongPicks.length) {
    fill('darkorange');
    text('Not that block. Hint:', x + 12, 218, w - 24, 24);
    fill('black');
    text(q.hint, x + 12, 244, w - 24, 90);
  } else {
    text('Click the block on the left where the answer to this question starts.', x + 12, 218, w - 24, 110);
  }

  // score
  fill('black');
  textSize(18);
  textAlign(LEFT, TOP);
  text('Score: ' + scoreCorrect + ' correct on first try of ' + scoreAnswered + ' answered', x, 352, w, 50);
}

function drawOccupantLoad() {
  const x = floor(canvasWidth * 0.46) + 20;
  const w = canvasWidth - x - 12;
  const area = areaSlider.value();
  const factor = factorRadio.value().startsWith('15') ? 15 : 7;
  const load = ceil(area / factor);
  let exits, exitNote;
  if (load < 50) { exits = 1; exitNote = 'One exit may be allowed for a very small load; confirm in the code.'; }
  else if (load <= 500) { exits = 2; exitNote = 'At least two exits are commonly required.'; }
  else if (load <= 1000) { exits = 3; exitNote = 'At least three exits are commonly required.'; }
  else { exits = 4; exitNote = 'At least four exits are commonly required.'; }

  // room sketch
  const rx = x, ry = 46, rw = w, rh = 190;
  stroke('dimgray');
  strokeWeight(2);
  fill('white');
  rect(rx, ry, rw, rh, 4);
  const perDot = max(1, ceil(load / 250));
  const dots = ceil(load / perDot);
  const cols = max(1, floor(sqrt(dots * (rw - 20) / (rh - 20))));
  const rows = ceil(dots / cols);
  noStroke();
  fill('steelblue');
  for (let i = 0; i < dots; i++) {
    const cx = rx + 10 + ((i % cols) + 0.5) * ((rw - 20) / cols);
    const cy = ry + 10 + (floor(i / cols) + 0.5) * ((rh - 20) / rows);
    circle(cx, cy, 5);
  }
  // exit markers on the bottom wall
  for (let i = 0; i < exits; i++) {
    const ex = rx + (i + 1) * rw / (exits + 1);
    stroke('seagreen');
    strokeWeight(6);
    line(ex - 14, ry + rh, ex + 14, ry + rh);
  }
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Each blue dot = ' + perDot + (perDot === 1 ? ' person' : ' people') + '; green bars = exits', rx, ry + rh + 6);

  textSize(16);
  text('Area ' + nf(area, 0, 0) + ' ft² ÷ ' + factor + ' ft² per person', x, 262, w, 24);
  textSize(22);
  fill('navy');
  text('Occupant load = ' + load + ' people', x, 286, w, 30);
  fill('black');
  textSize(16);
  text('Likely exits: ' + exits + '. ' + exitNote, x, 320, w, 60);
  textSize(14);
  fill('dimgray');
  text('Illustrative factors only. Verify against the adopted code edition.', x, 392, w, 40);
}

function drawHoverDefinition() {
  if (hoverBlock < 0) return;
  const g = groups[hoverBlock];
  const w = min(canvasWidth - 20, 340);
  const h = 74;
  let tx = min(mouseX + 14, canvasWidth - w - 6);
  let ty = min(mouseY + 14, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 240);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text(g.def, tx + 8, ty + 6, w - 16, h - 10);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  if (mode === 'Classify') {
    text('Hover a block for its definition. Click a block to answer.', 10, drawHeight + 52);
  } else {
    text('Room area: ' + areaSlider.value() + ' ft²', 10, drawHeight + 52);
  }
}

function mousePressed() {
  if (mode !== 'Classify' || mouseY > drawHeight || mouseY < 0) return;
  if (solved) return;
  for (let i = 0; i < blockRects.length; i++) {
    const b = blockRects[i];
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      if (i === currentQ().ans) {
        solved = true;
        scoreAnswered++;
        if (firstTry) scoreCorrect++;
      } else if (!wrongPicks.includes(i)) {
        wrongPicks.push(i);
        if (firstTry) { firstTry = false; }
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  areaSlider.size(sliderWidth());
  factorRadio.position(factorRadioX(), drawHeight + 40);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
