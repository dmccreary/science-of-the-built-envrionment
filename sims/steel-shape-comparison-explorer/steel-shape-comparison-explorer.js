// Steel Shape Comparison Explorer MicroSim - rectangle, wide-flange, and tube of equal area compared by moment of inertia, weight, and deflection
// CANVAS_HEIGHT: 590
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 235;
let defaultTextSize = 16;

// ---- The example beam: simply supported, 500 lb per ft over 20 ft, steel with E = 29,000 ksi (self-weight ignored) ----
const LOAD = 500, SPAN = 20, E = 29e6;
const M_MAX = LOAD * SPAN * SPAN / 8 * 12;           // lb-in
const DEFLECTION_K = 5 * (LOAD / 12) * Math.pow(SPAN * 12, 4) / (384 * E);   // delta = K / I, in inches
const STEEL_WEIGHT = 490 / 144;                       // lb per ft for each in^2 of area

const SHAPES = [
  { name: 'Rectangle', full: 'Solid rectangle (plate or bar)', code: 'PL½×12',
    use: 'Connection plates, base plates, and hanger bars.',
    why: 'Material near the neutral axis adds little stiffness. On edge it has (d/b)² times the I of flat.' },
  { name: 'Wide-flange I', full: 'Wide-flange (W) shape', code: 'W12×26',
    use: 'Beams and columns.',
    why: 'Steel in two flanges far from the neutral axis, where bending stress is highest, gives a large I for its weight.' },
  { name: 'Tube (HSS)', full: 'Hollow structural section (HSS)', code: 'HSS6×6×¼',
    use: 'Columns and braces, and exposed frames.',
    why: 'Walls far from the axis in both directions resist bending and buckling in any direction.' }
];

// questions for the "Match the shape" mode; ans indexes SHAPES
const QUESTIONS = [
  { q: 'A long-span floor beam that bends about one axis.', ans: 1, why: 'The wide-flange puts its steel in the flanges, far from the neutral axis, so it is the most efficient beam.' },
  { q: 'A column that can buckle in any direction.', ans: 2, why: 'The tube has the same stiffness in every direction, which is what a column needs to resist buckling.' },
  { q: 'A base plate or a connection plate.', ans: 0, why: 'Plates and bars are solid rectangles. They are used where a flat bearing or connection surface is needed.' },
  { q: 'An exposed brace in a building frame.', ans: 2, why: 'Hollow tubes make clean, stiff braces and columns with the same properties in all directions.' },
  { q: 'A beam where weight is critical and bending is about one axis.', ans: 1, why: 'For the same weight, the wide-flange gives the largest I, so it deflects least.' },
  { q: 'A hanger bar that carries a pull.', ans: 0, why: 'A bar in tension has no bending, so a solid bar is the simplest and cheapest shape.' }
];

// ---- State ----
let hoverShape = -1, selShape = -1;
let quiz = { on: false, idx: 0, wrong: [], solved: false, right: 0, asked: 0, firstTry: true };
let G = null;       // geometry of the current frame
let boxes = [];     // clickable boxes for the three shapes

// ---- Controls ----
let areaSlider, depthSlider, thickSlider, orientSelect, quizButton, nextButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  areaSlider = createSlider(4, 20, 10, 0.5);
  depthSlider = createSlider(4, 24, 12, 0.5);
  thickSlider = createSlider(0, 100, 50, 1);
  orientSelect = createSelect();
  orientSelect.option('On edge');
  orientSelect.option('Flat');
  orientSelect.selected('On edge');
  quizButton = createButton('Match the shape');
  quizButton.mousePressed(toggleQuiz);
  nextButton = createButton('Next use');
  nextButton.mousePressed(nextQuestion);
  nextButton.hide();

  positionControls();
  describe('Three steel cross-sections of equal area drawn side by side to the same scale: a solid rectangle, a wide-flange I, and a hollow rectangular tube, each with a dashed neutral axis. Under each shape a bar shows the moment of inertia and a small beam diagram shows the deflection under the same load. Sliders set the area, depth, and flange thickness, a menu turns the rectangle on edge or flat, hovering shows a stress diagram with compression above and tension below, and a quiz asks the student to match a shape to a use.', LABEL);
}

// rows: area, depth, flange thickness, then orientation and the quiz buttons
function positionControls() {
  const y = drawHeight, sw = max(100, canvasWidth - sliderLeftMargin - 20);
  [areaSlider, depthSlider, thickSlider].forEach((s, i) => { s.position(sliderLeftMargin, y + 8 + i * 35); s.size(sw); });
  orientSelect.position(112, y + 114);
  quizButton.position(200, y + 113);
  nextButton.position(290, y + 113);
}

// ---- Geometry: each shape is a list of rectangles (inches, origin at the centroid) ----
function inertia(parts) { return parts.reduce((s, p) => s + p.w * pow(p.h, 3) / 12 + p.w * p.h * sq(p.y + p.h / 2), 0); }

function computeShapes() {
  const A = areaSlider.value(), u = thickSlider.value() / 100;
  // realistic depth for this area keeps every shape physically sensible
  const dmin = max(4, 1.8 * sqrt(A)), dmax = min(24, 9 * sqrt(A));
  const d = constrain(depthSlider.value(), dmin, dmax);
  const edge = orientSelect.value() === 'On edge';
  const b = A / d;
  const rect = { parts: edge ? [{ x: -b / 2, w: b, y: -d / 2, h: d }] : [{ x: -d / 2, w: d, y: -b / 2, h: b }], depth: edge ? d : b, width: edge ? b : d };
  rect.dims = edge ? nf(b, 0, 2) + ' × ' + nf(d, 0, 2) + ' in., on edge' : nf(d, 0, 2) + ' × ' + nf(b, 0, 2) + ' in., flat';
  // wide flange: web carries 25% of the area, each flange 37.5%
  const tfLo = 0.4167 * A / d, tfHi = min(0.16 * d, 1.07 * A / d);
  const tf = lerp(tfLo, tfHi, u), bf = 0.375 * A / tf, tw = 0.25 * A / (d - 2 * tf);
  const wide = { parts: [{ x: -bf / 2, w: bf, y: -d / 2, h: tf }, { x: -bf / 2, w: bf, y: d / 2 - tf, h: tf }, { x: -tw / 2, w: tw, y: -d / 2 + tf, h: d - 2 * tf }], depth: d, width: bf };
  wide.dims = 'flange ' + nf(bf, 0, 1) + ' × ' + nf(tf, 0, 2) + ' in., web ' + nf(tw, 0, 2) + ' in.';
  // tube: wall thickness runs from a thin, wide tube to a thick, narrow one
  const tMin = (d - sqrt(d * d - A)) / 2, tMax = (1.4 * d - sqrt(1.96 * d * d - 4 * A)) / 4;
  const t = lerp(tMin, tMax, u), B = (A + 4 * t * t) / (2 * t) - d;
  const tube = { parts: [{ x: -B / 2, w: B, y: -d / 2, h: t }, { x: -B / 2, w: B, y: d / 2 - t, h: t }, { x: -B / 2, w: t, y: -d / 2 + t, h: d - 2 * t }, { x: B / 2 - t, w: t, y: -d / 2 + t, h: d - 2 * t }], depth: d, width: B };
  tube.dims = nf(B, 0, 1) + ' × ' + nf(d, 0, 1) + ' in., wall ' + nf(t, 0, 2) + ' in.';
  const shapes = [rect, wide, tube];
  shapes.forEach(s => {
    s.I = inertia(s.parts);
    s.c = s.depth / 2;
    s.delta = DEFLECTION_K / s.I;
    s.sigma = M_MAX * s.c / s.I;     // psi
  });
  return { A, d, dmin, dmax, shapes, weight: A * STEEL_WEIGHT };
}

// ---- Quiz ----
function toggleQuiz() {
  quiz.on = !quiz.on;
  quiz.idx = 0; quiz.wrong = []; quiz.solved = false; quiz.right = 0; quiz.asked = 0; quiz.firstTry = true;
  selShape = -1;
  quizButton.html(quiz.on ? 'End quiz' : 'Match the shape');
  if (quiz.on) nextButton.show(); else nextButton.hide();
}
function nextQuestion() {
  quiz.idx = (quiz.idx + 1) % QUESTIONS.length;
  quiz.wrong = []; quiz.solved = false; quiz.firstTry = true;
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  const i = shapeAt(mouseX, mouseY);
  if (i < 0) return;
  if (!quiz.on) { selShape = i; return; }
  if (quiz.solved || quiz.wrong.includes(i)) return;
  if (i === QUESTIONS[quiz.idx].ans) {
    quiz.solved = true; quiz.asked++;
    if (quiz.firstTry) quiz.right++;
  } else { quiz.wrong.push(i); quiz.firstTry = false; }
}

function shapeAt(mx, my) {
  for (let i = 0; i < boxes.length; i++) {
    const b = boxes[i];
    if (mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h) return i;
  }
  return -1;
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  G = computeShapes();
  syncDepthSlider();

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
  text('Steel Shape Comparison Explorer', canvasWidth / 2, 6);

  const colW = (canvasWidth - 20) / 3, shapeTop = 58, shapeH = 138;
  const maxD = max(...G.shapes.map(s => s.depth)), maxW = max(...G.shapes.map(s => s.width));
  const s = min(shapeH * 0.94 / maxD, colW * 0.56 / maxW);
  const maxI = max(...G.shapes.map(sh => sh.I));
  boxes = [];

  G.shapes.forEach((sh, i) => {
    const cx = 10 + colW * (i + 0.5), cy = shapeTop + shapeH / 2 + 4;
    boxes.push({ x: cx - sh.width * s / 2 - 6, y: cy - sh.depth * s / 2 - 6, w: sh.width * s + 12, h: sh.depth * s + 12 });
  });
  const hov = shapeAt(mouseX, mouseY);
  hoverShape = (mouseY < drawHeight) ? hov : -1;
  cursor(hoverShape >= 0 ? HAND : ARROW);

  G.shapes.forEach((sh, i) => {
    const cx = 10 + colW * (i + 0.5), cy = shapeTop + shapeH / 2 + 4;
    drawColumnHeader(i, cx, quiz.on && quiz.solved && i === QUESTIONS[quiz.idx].ans);
    drawShape(sh, i, cx, cy, s, maxD);
    drawInertiaBar(sh, cx, colW, maxI);
    drawBeam(sh, cx, colW);
  });
  drawFootnote();
  drawInfo();
  drawControlLabels();
}

// keep the depth slider inside the realistic range for the chosen area
function syncDepthSlider() {
  const lo = ceil(G.dmin * 2) / 2, hi = floor(G.dmax * 2) / 2;
  if (+depthSlider.elt.min !== lo) depthSlider.elt.min = lo;
  if (+depthSlider.elt.max !== hi) depthSlider.elt.max = hi;
}

function drawColumnHeader(i, cx, good) {
  noStroke();
  fill(good ? 'seagreen' : 'black');
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text(SHAPES[i].name, cx, 36);
  textStyle(NORMAL);
}

function drawShape(sh, i, cx, cy, s, maxD) {
  const hov = i === hoverShape, sel = i === selShape;
  const wrongPick = quiz.on && quiz.wrong.includes(i), rightPick = quiz.on && quiz.solved && i === QUESTIONS[quiz.idx].ans;
  // frame
  const b = boxes[i];
  stroke(rightPick ? 'seagreen' : (wrongPick ? 'darkorange' : (sel ? 'navy' : (hov ? 'navy' : 'lightgray'))));
  strokeWeight(rightPick || wrongPick || sel || hov ? 3 : 1);
  noFill();
  rect(b.x, b.y, b.w, b.h, 4);
  // the shape itself: plain steel gray, or colored by bending stress while hovered
  const cC = color('crimson'), cT = color('steelblue');
  sh.parts.forEach(p => {
    const x = cx + p.x * s, y = cy + p.y * s, w = p.w * s, h = p.h * s;
    if (!hov) { fill('lightslategray'); stroke('dimgray'); strokeWeight(1); rect(x, y, w, h); return; }
    noStroke();
    for (let yy = 0; yy < h; yy += 2) {
      const ym = (y + yy + min(2, h - yy) / 2 - cy);      // distance below the neutral axis, px
      const f = constrain(abs(ym) / (sh.c * s), 0, 1);
      const col = ym < 0 ? cC : cT;
      col.setAlpha(50 + 205 * f);
      fill(col);
      rect(x, y + yy, w, min(2, h - yy) + 0.5);
    }
    noFill();
    stroke('dimgray');
    strokeWeight(1);
    rect(x, y, w, h);
  });
  // neutral axis
  const half = sh.width * s / 2 + 3;
  drawingContext.setLineDash([5, 3]);
  stroke('black');
  strokeWeight(1);
  line(cx - half, cy, cx + half, cy);
  drawingContext.setLineDash([]);
  noStroke();
  fill('black');
  textSize(12);
  textAlign(LEFT, CENTER);
  text('N.A.', cx + half + 2, cy);
  if (hov) drawStress(sh, cx, cy, s);
}

// stress diagram beside the hovered shape: compression above the neutral axis, tension below
function drawStress(sh, cx, cy, s) {
  const maxSigma = max(...G.shapes.map(q => q.sigma));
  const right = cx + sh.width * s / 2 + 2;
  const W = min(6 + 22 * sh.sigma / maxSigma, (canvasWidth - 4 - right) / 2);
  const x0 = right + W, yT = cy - sh.c * s, yB = cy + sh.c * s;
  noStroke();
  fill(220, 20, 60, 200);
  triangle(x0, cy, x0 - W, yT, x0, yT);
  fill(70, 130, 180, 200);
  triangle(x0, cy, x0 + W, yB, x0, yB);
  stroke('black');
  strokeWeight(1);
  line(x0, yT - 2, x0, yB + 2);
  noStroke();
  fill('crimson');
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text('−', x0 - W - 2, yT + 12);
  fill('navy');
  textAlign(LEFT, TOP);
  text('+', x0 + W + 3, yB - 12);
}

function drawInertiaBar(sh, cx, colW, maxI) {
  const y = 204;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  text('I = ' + (sh.I >= 100 ? nfc(round(sh.I)) : nf(sh.I, 0, 1)) + ' in⁴', cx, y);
  const bw = colW - 24, bx = cx - bw / 2;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(bx, y + 19, bw, 11);
  noStroke();
  fill('steelblue');
  rect(bx + 1, y + 20, (bw - 2) * sh.I / maxI, 9);
}

function drawBeam(sh, cx, colW) {
  const y = 250, half = (colW - 30) / 2, x0 = cx - half, x1 = cx + half;
  const dpx = min(22, sh.delta * 44);
  noFill();
  stroke('dimgray');
  strokeWeight(1);
  line(x0, y, x1, y);                       // undeflected position
  stroke('black');
  strokeWeight(3);
  beginShape();
  for (let k = 0; k <= 20; k++) { const t = k / 20; vertex(lerp(x0, x1, t), y + dpx * sin(PI * t)); }
  endShape();
  stroke('black');
  strokeWeight(1);
  fill('white');
  [x0, x1].forEach(x => triangle(x, y + 1, x - 5, y + 10, x + 5, y + 10));
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(14);
  text('δ = ' + (sh.delta < 10 ? nf(sh.delta, 0, 2) : nfc(round(sh.delta))) + ' in.', cx, y + 28);
  const ok = sh.delta <= SPAN * 12 / 360;
  fill(ok ? 'seagreen' : 'crimson');
  text(ok ? 'meets L/360' : 'exceeds L/360', cx, y + 45);
}

function drawFootnote() {
  noStroke();
  fill('dimgray');
  textAlign(CENTER, TOP);
  textSize(14);
  text('Each weighs ' + nf(G.weight, 0, 1) + ' lb/ft. Load ' + LOAD + ' lb/ft over ' + SPAN + ' ft.', canvasWidth / 2, 316);
}

function drawInfo() {
  const x = 10, y = 336, w = canvasWidth - 20, h = drawHeight - y - 6;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  if (quiz.on) {
    const q = QUESTIONS[quiz.idx];
    let msg = 'Which shape? ' + q.q;
    let col = 'black';
    if (quiz.solved) { msg = 'Correct: ' + SHAPES[q.ans].name + '. ' + q.why; col = 'seagreen'; }
    else if (quiz.wrong.length) { msg += ' Not the ' + SHAPES[quiz.wrong[quiz.wrong.length - 1]].name + '. Try again.'; col = 'darkorange'; }
    fill(col);
    text(msg, x + 8, y + 5, w - 16, h - 26);
    fill('black');
    text('Score: ' + quiz.right + ' first-try of ' + quiz.asked + ' answered', x + 8, y + h - 20);
    return;
  }
  const i = hoverShape >= 0 ? hoverShape : selShape;
  if (i < 0) {
    text('All three shapes have the same area, so they weigh the same. Hover over one for its bending stress, or click it to read its use.', x + 8, y + 5, w - 16, h - 8);
    return;
  }
  const sh = SHAPES[i], g = G.shapes[i];
  textStyle(BOLD);
  text(sh.full + ', e.g. ' + sh.code, x + 8, y + 5, w - 16, 20);
  textStyle(NORMAL);
  let msg = 'Use: ' + sh.use + ' ' + sh.why;
  if (hoverShape >= 0) msg += ' Max stress ' + nf(g.sigma / 1000, 0, 1) + ' ksi (red \u2212 compression above, blue + tension below).';
  text(msg, x + 8, y + 24, w - 16, h - 26);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y = drawHeight;
  text('Area: ' + nf(areaSlider.value(), 0, 1) + ' in²', 10, y + 20);
  text('Depth: ' + nf(G.d, 0, 1) + ' in.', 10, y + 55);
  text('Flange thickness: ' + thickSlider.value() + '%', 10, y + 90);
  text('Orientation:', 10, y + 127);
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
