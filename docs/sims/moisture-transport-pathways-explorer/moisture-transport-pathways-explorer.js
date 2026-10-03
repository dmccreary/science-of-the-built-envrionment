// Moisture Transport Pathways Explorer MicroSim - four ways moisture reaches a wall, with the control for each and a quiz mode
// CANVAS_HEIGHT: 580
// Bloom Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 190; // no sliders in this MicroSim
let defaultTextSize = 16;

// ---- Data: the four pathways. Arrows are polylines in wall-drawing units (u across, v down, both 0 to 1) ----
const paths = [
  { key: 'bulk', name: 'Bulk water', btn: 'Bulk water', col: 'royalblue', dash: false,
    arrows: [[[0.05, 0.14], [0.27, 0.29]], [[0.02, 0.22], [0.25, 0.31]], [[0.10, 0.12], [0.29, 0.28]], [[0.31, 0.31], [0.43, 0.35]]],
    short: 'gravity, wind, and falling-rain momentum',
    driver: 'Gravity, wind pressure, and the momentum of falling rain.',
    example: 'Wind-driven rain runs down the wall and enters at a window head with no flashing.',
    control: 'Flashing, a drainage plane, and roof slope and overhangs.' },
  { key: 'cap', name: 'Capillary action', btn: 'Capillary', col: 'teal', dash: false,
    arrows: [[[0.36, 0.985], [0.36, 0.80]], [[0.48, 0.985], [0.48, 0.80]]],
    short: 'surface tension in tiny pores',
    driver: 'Surface tension in the tiny pores of concrete, which draws water upward against gravity.',
    example: 'Groundwater wicks up through the footing into the foundation wall.',
    control: 'A capillary break and damp-proofing between the soil, the footing, and the wall.' },
  { key: 'air', name: 'Air movement', btn: 'Air movement', col: 'darkorange', dash: false,
    arrows: [[[0.76, 0.68], [0.46, 0.68], [0.46, 0.58]]],
    short: 'an air pressure difference',
    driver: 'An air pressure difference that pushes air through gaps and cracks.',
    example: 'Warm, humid room air leaks through an outlet box into the cold wall cavity.',
    control: 'A continuous air barrier, sealed at penetrations such as outlet boxes.' },
  { key: 'dif', name: 'Vapor diffusion', btn: 'Diffusion', col: 'purple', dash: true,
    arrows: [[[0.70, 0.13], [0.40, 0.13]], [[0.70, 0.18], [0.40, 0.18]], [[0.70, 0.23], [0.40, 0.23]]],
    short: 'a vapor pressure difference',
    driver: 'A difference in vapor pressure, which moves vapor through solid material even when the air is still.',
    example: 'Water vapor passes through the gypsum board toward the colder, drier side.',
    control: 'A vapor retarder, plus drying capacity so the wall can dry out.' }
];

// control layers shown by the "Show controls" checkbox: [pathway index, u1, v1, u2, v2, label, tag position]
const controlsDef = [
  { p: 0, name: 'Flashing', line: [[0.28, 0.295], [0.56, 0.295]], tag: [0.58, 0.33] },
  { p: 3, name: 'Vapor retarder', line: [[0.553, 0.08], [0.553, 0.78]], tag: [0.58, 0.40] },
  { p: 2, name: 'Air barrier', line: [[0.345, 0.08], [0.345, 0.78]], tag: [0.58, 0.50] },
  { p: 1, name: 'Capillary break', line: [[0.30, 0.90], [0.55, 0.90]], tag: [0.58, 0.90] }
];

// hover regions (u1, v1, u2, v2), checked in order
const layers = [
  ['Window (the head is at the top)', 0.30, 0.30, 0.55, 0.55],
  ['Roof edge', 0.12, 0.03, 0.58, 0.08],
  ['Siding', 0.30, 0.08, 0.33, 0.78],
  ['Sheathing', 0.33, 0.08, 0.36, 0.78],
  ['Insulated stud cavity', 0.36, 0.08, 0.52, 0.78],
  ['Gypsum board (interior finish)', 0.52, 0.08, 0.55, 0.78],
  ['Concrete foundation wall', 0.30, 0.78, 0.55, 0.90],
  ['Concrete footing', 0.22, 0.90, 0.63, 0.96],
  ['Concrete floor slab', 0.55, 0.78, 0.95, 0.82],
  ['Soil', 0.0, 0.78, 0.30, 1.0],
  ['Soil and gravel', 0.55, 0.82, 1.0, 1.0],
  ['Inside: warm, humid air', 0.55, 0.08, 1.0, 0.78]
];

// ---- State ----
let on = [true, true, true, true];
let sel = -1;                         // pathway shown in the info panel
let quizOn = false;
let quiz = { p: 0, a: 0, solved: false, wrong: -1, firstTry: true, right: 0, asked: 0 };
let box = { x: 0, y: 0, w: 0, h: 0 }; // wall drawing rectangle

// ---- Controls ----
let toggleButtons = [], controlsCheck, quizButton, nextButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  paths.forEach((p, i) => {
    const b = createButton(p.btn);
    b.mousePressed(() => pressPathway(i));
    toggleButtons.push(b);
  });
  controlsCheck = createCheckbox('Show controls', false);
  quizButton = createButton('Quiz me');
  quizButton.mousePressed(toggleQuiz);
  nextButton = createButton('Next arrow');
  nextButton.mousePressed(newQuestion);
  nextButton.hide();

  positionControls();
  styleButtons();
  describe('A section drawing of a Minnesota wall on a concrete foundation with the roof edge at the top. Four sets of arrows show how moisture reaches the wall: blue rain arrows at a window head are bulk water, teal arrows rising in the footing are capillary action, an orange arrow through an outlet box is air movement, and dashed purple arrows through the gypsum board are vapor diffusion. Four toggle buttons switch each pathway, a checkbox shows the matching controls, and clicking an arrow opens an info panel with its driver, an example, and its control. A quiz mode highlights one arrow and asks the student to name its pathway.', LABEL);
}

function positionControls() {
  const y0 = drawHeight + 6;
  let x = 10;
  toggleButtons.forEach(b => { b.position(x, y0); x += b.elt.offsetWidth + 8; });
  controlsCheck.position(10, y0 + 38);
  quizButton.position(150, y0 + 37);
  nextButton.position(150 + quizButton.elt.offsetWidth + 8, y0 + 37);
}

// toggle buttons: filled with the pathway color when on, struck through when off
function styleButtons() {
  toggleButtons.forEach((b, i) => {
    if (quizOn) {
      b.style('background-color', 'white');
      b.style('text-decoration', 'none');
      b.style('font-weight', 'normal');
    } else {
      b.style('background-color', on[i] ? 'lightgray' : 'white');
      b.style('border', on[i] ? '3px solid ' + paths[i].col : '1px solid gray');
      b.style('text-decoration', on[i] ? 'none' : 'line-through');
      b.style('font-weight', on[i] ? 'bold' : 'normal');
    }
    if (quizOn) b.style('border', '1px solid gray');
  });
}

// ---- Button actions ----
function pressPathway(i) {
  if (quizOn) { answer(i); return; }
  on[i] = !on[i];
  if (on[i]) sel = i; else if (sel === i) sel = -1;
  styleButtons();
}

function toggleQuiz() {
  quizOn = !quizOn;
  quizButton.html(quizOn ? 'Exit quiz' : 'Quiz me');
  if (quizOn) { nextButton.show(); quiz.right = 0; quiz.asked = 0; newQuestion(); } else nextButton.hide();
  styleButtons();
  positionControls();
}

function newQuestion() {
  const prev = quiz.p * 10 + quiz.a;
  let p, a;
  do { p = floor(random(paths.length)); a = floor(random(paths[p].arrows.length)); } while (p * 10 + a === prev);
  quiz.p = p; quiz.a = a; quiz.solved = false; quiz.wrong = -1; quiz.firstTry = true;
}

function answer(i) {
  if (quiz.solved) return;
  if (i === quiz.p) {
    quiz.solved = true;
    quiz.asked++;
    if (quiz.firstTry) quiz.right++;
  } else { quiz.wrong = i; quiz.firstTry = false; }
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
  text('Moisture Transport Pathways', canvasWidth / 2, 8);

  const wide = canvasWidth >= 620;
  if (wide) box = { x: 10, y: 44, w: floor(canvasWidth * 0.58) - 10, h: drawHeight - 54 };
  else box = { x: 10, y: 44, w: canvasWidth - 20, h: 300 };
  const info = wide ? { x: box.x + box.w + 14, y: 44, w: canvasWidth - (box.x + box.w + 14) - 10, h: box.h }
    : { x: 10, y: box.y + box.h + 6, w: canvasWidth - 20, h: drawHeight - (box.y + box.h + 6) - 6 };

  drawWall();
  drawArrows();
  if (controlsCheck.checked() && !quizOn) drawControls();
  drawLabels();
  drawInfo(info);
  drawHover();
  updateCursor();
}

// the quiz and toggle buttons need no per-frame work; this keeps cursor feedback for arrows
function updateCursor() {
  const hit = quizOn ? -1 : arrowHit();
  cursor(hit ? 'pointer' : 'default');
}

// unit to pixel conversions for the wall drawing
function X(u) { return box.x + u * box.w; }
function Y(v) { return box.y + v * box.h; }

function block(u1, v1, u2, v2, col, sw) {
  stroke('dimgray');
  strokeWeight(sw === undefined ? 1 : sw);
  fill(col);
  rect(X(u1), Y(v1), X(u2) - X(u1), Y(v2) - Y(v1));
}

// ---- Wall section ----
function drawWall() {
  noStroke();
  fill('white');
  stroke('silver');
  rect(box.x, box.y, box.w, box.h, 8);
  block(0, 0.78, 0.30, 1.0, 'tan', 0);          // outside soil
  block(0, 0.96, 1.0, 1.0, 'tan', 0);           // soil below the footing
  block(0.55, 0.82, 1.0, 1.0, 'tan', 0);        // soil and gravel under the slab
  block(0.55, 0.08, 1.0, 0.78, 'floralwhite', 0); // room
  block(0.22, 0.90, 0.63, 0.96, 'lightgray');   // footing
  block(0.30, 0.78, 0.55, 0.90, 'lightgray');   // foundation wall
  block(0.55, 0.78, 0.95, 0.82, 'silver');      // slab
  block(0.30, 0.08, 0.33, 0.78, 'lightsteelblue'); // siding
  block(0.33, 0.08, 0.36, 0.78, 'burlywood');   // sheathing
  block(0.36, 0.08, 0.52, 0.78, 'lemonchiffon'); // insulated cavity
  block(0.52, 0.08, 0.55, 0.78, 'whitesmoke');  // gypsum
  // roof edge with a fascia
  block(0.12, 0.03, 0.58, 0.08, 'slategray');
  block(0.10, 0.03, 0.12, 0.10, 'dimgray');
  // window: frame, glass, and head
  block(0.30, 0.30, 0.55, 0.55, 'silver');
  stroke('steelblue');
  strokeWeight(2);
  fill('lightcyan');
  rect(X(0.385), Y(0.325), X(0.465) - X(0.385), Y(0.525) - Y(0.325));
  // outlet box
  block(0.51, 0.64, 0.57, 0.72, 'dimgray');
  // outside ground line
  stroke('sienna');
  strokeWeight(2);
  line(X(0), Y(0.78), X(0.30), Y(0.78));
}

// ---- Arrows ----
function arrowPoly(pts, col, wt, dashed) {
  const px = pts.map(p => [X(p[0]), Y(p[1])]);
  noFill();
  stroke(col);
  strokeWeight(wt);
  if (dashed) drawingContext.setLineDash([8, 5]);
  beginShape();
  px.forEach(p => vertex(p[0], p[1]));
  endShape();
  drawingContext.setLineDash([]);
  const a = px[px.length - 1], b = px[px.length - 2];
  const ang = atan2(a[1] - b[1], a[0] - b[0]), hs = 8 + wt;
  noStroke();
  fill(col);
  triangle(a[0], a[1], a[0] - hs * cos(ang - 0.45), a[1] - hs * sin(ang - 0.45), a[0] - hs * cos(ang + 0.45), a[1] - hs * sin(ang + 0.45));
}

function drawArrows() {
  paths.forEach((p, pi) => {
    if (!quizOn && !on[pi]) return;
    p.arrows.forEach((pts, ai) => {
      if (quizOn) {
        const target = pi === quiz.p && ai === quiz.a;
        if (target) arrowPoly(pts, quiz.solved ? 'palegreen' : 'gold', 14, false);
        arrowPoly(pts, target && quiz.solved ? 'seagreen' : 'dimgray', 4, p.dash);
      } else {
        if (sel === pi) arrowPoly(pts, 'white', 10, false);
        arrowPoly(pts, p.col, sel === pi ? 6 : 4, p.dash);
      }
    });
  });
}

// distance from a point to a segment
function segDist(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const t = constrain(((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy), 0, 1);
  return dist(px, py, ax + t * dx, ay + t * dy);
}

// index of the pathway whose arrow is under the mouse, or null
function arrowHit() {
  let best = null, bestD = 10;
  paths.forEach((p, pi) => {
    if (!on[pi]) return;
    p.arrows.forEach(pts => {
      for (let i = 0; i < pts.length - 1; i++) {
        const d = segDist(mouseX, mouseY, X(pts[i][0]), Y(pts[i][1]), X(pts[i + 1][0]), Y(pts[i + 1][1]));
        if (d < bestD) { bestD = d; best = pi; }
      }
    });
  });
  return best;
}

// ---- Control layers ----
function drawControls() {
  controlsDef.forEach(c => {
    const col = paths[c.p].col;
    stroke(col);
    strokeWeight(5);
    line(X(c.line[0][0]), Y(c.line[0][1]), X(c.line[1][0]), Y(c.line[1][1]));
    // leader and tag
    strokeWeight(1);
    const mx = c.line[0][0] === c.line[1][0] ? c.line[0][0] : (c.line[0][0] + c.line[1][0]) / 2 + 0.1;
    const my = c.line[0][0] === c.line[1][0] ? c.tag[1] : c.line[0][1];
    line(X(c.tag[0]) - 3, Y(c.tag[1]), X(min(mx, 0.56)), Y(my));
    noStroke();
    fill(col);
    rect(X(c.tag[0]), Y(c.tag[1]) - 8, 10, 16);
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(14);
    text(c.name, X(c.tag[0]) + 14, Y(c.tag[1]));
  });
}

// ---- Pathway labels (hidden in quiz mode) ----
function drawLabels() {
  if (quizOn) return;
  const tags = [[0, 0.02, 0.46, LEFT], [1, 0.02, 0.84, LEFT], [2, 0.58, 0.74, LEFT], [3, 0.58, 0.28, LEFT]];
  tags.forEach(t => {
    const p = paths[t[0]];
    if (!on[t[0]]) return;
    noStroke();
    fill(p.col);
    rect(X(t[1]), Y(t[2]) - 8, 10, 16);
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(14);
    text(p.name, X(t[1]) + 14, Y(t[2]));
  });
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Outside (cold)', X(0.02), Y(0.005));
  textAlign(RIGHT, TOP);
  text('Inside (warm)', X(0.98), Y(0.10));
}

// ---- Info panel: pathway details, or the quiz question and feedback ----
function drawInfo(r) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  const x = r.x + 10, w = r.w - 20;
  const ts = r.h > 200 ? 16 : 14, lh = ts + 5;
  textSize(ts + 2);
  if (quizOn) {
    fill('black');
    text('Quiz: which pathway is the highlighted arrow?', x, r.y + 8, w, lh * 2 + 4);
    textSize(ts);
    let y = r.y + 8 + (r.h > 200 ? lh * 2 + 12 : lh * 2 + 2);
    const p = paths[quiz.p];
    if (quiz.solved) {
      fill('seagreen');
      text('Correct: ' + p.name + '.', x, y, w, lh * 2);
      fill('black');
      text('Driver: ' + p.driver, x, y + lh + 2, w, lh * 4);
      if (r.h > 200) text('Control: ' + p.control, x, y + lh * 5.4, w, lh * 3);
    } else if (quiz.wrong >= 0) {
      fill('darkorange');
      text('Not ' + paths[quiz.wrong].name + '. Look for this driver:', x, y, w, lh * 2);
      fill('black');
      text(p.driver, x, y + lh * 2 + 2, w, lh * 4);
    } else {
      fill('black');
      text('Press the pathway button that matches the arrow. The arrow is highlighted in gold.', x, y, w, lh * 4);
    }
    fill('black');
    textSize(ts);
    textAlign(LEFT, TOP);
    text('Score: ' + quiz.right + ' correct on the first try of ' + quiz.asked + ' answered', x, r.y + r.h - lh * 2 - 4, w, lh * 2 + 4);
    return;
  }
  if (sel < 0) {
    fill('black');
    text('Moisture pathways', x, r.y + 8, w, lh * 2);
    textSize(ts);
    text('Click an arrow, or press a pathway button, to see its driver, an example, and its control. Hover over the drawing to name each layer.', x, r.y + 8 + lh + 6, w, lh * 8);
    if (r.h > 200) {
      // wide layout: a legend of what drives each pathway
      let ly = r.y + 8 + lh + 6 + lh * 5.2;
      textSize(ts);
      paths.forEach(p => {
        fill(p.col);
        rect(x, ly + 2, 10, 16);
        fill('black');
        text(p.name + ': ' + p.short, x + 16, ly, w - 16, lh * 3);
        ly += lh * 2.6;
      });
    }
    return;
  }
  const p = paths[sel];
  fill(p.col);
  text(p.name, x, r.y + 8, w, lh * 2);
  fill('black');
  textSize(ts);
  let y = r.y + 8 + lh + 6;
  const blockH = r.h > 200 ? 5 : 3;
  text('Driver: ' + p.driver, x, y, w, lh * blockH);
  y += lh * (r.h > 200 ? 4.4 : 2.6);
  text('Example: ' + p.example, x, y, w, lh * blockH);
  y += lh * (r.h > 200 ? 4.4 : 2.6);
  text('Control: ' + p.control, x, y, w, lh * blockH);
}

// ---- Hover tooltip with the layer name ----
function drawHover() {
  if (mouseX < box.x || mouseX > box.x + box.w || mouseY < box.y || mouseY > box.y + box.h) return;
  let name = null;
  const u = (mouseX - box.x) / box.w, v = (mouseY - box.y) / box.h;
  for (const l of layers) if (u >= l[1] && u <= l[3] && v >= l[2] && v <= l[4]) { name = l[0]; break; }
  if (!quizOn && arrowHit() !== null) name = 'Click for details: ' + paths[arrowHit()].name;
  if (!name) return;
  textSize(14);
  const w = textWidth(name) + 16, h = 26;
  const tx = min(max(4, mouseX + 12), canvasWidth - w - 4);
  const ty = min(max(4, mouseY + 14), drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(name, tx + 8, ty + h / 2);
}

function mousePressed() {
  if (quizOn || mouseY > drawHeight || mouseY < 0 || mouseX < 0 || mouseX > canvasWidth) return;
  const hit = arrowHit();
  if (hit !== null) sel = hit;
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
