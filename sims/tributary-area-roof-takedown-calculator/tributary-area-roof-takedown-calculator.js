// Tributary Area and Load Takedown Calculator MicroSim - roof load to joist, girder, and post with shaded tributary areas
// CANVAS_HEIGHT: 570
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 385;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

const JOIST_SPACINGS = [12, 16, 19.2, 24]; // inches on center
const MEMBERS = ['Joist', 'Girder', 'Post'];

// ---- State ----
let eq = null;       // result of the last "Check equilibrium" press
let eqSig = '';      // signature of the inputs when it was pressed
let zone = null;     // screen rectangle of the shaded tributary area, for hover
let hoverZone = false;

// ---- Controls ----
let loadSlider, joistSlider, spacingSlider, spanSlider, memberSelect, checkButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  loadSlider = createSlider(20, 100, 50, 5);
  joistSlider = createSlider(0, 3, 3, 1);   // index into JOIST_SPACINGS: 24 in. is the Riverbend value
  spacingSlider = createSlider(8, 24, 16, 1);
  spanSlider = createSlider(20, 60, 40, 1);
  memberSelect = createSelect();
  MEMBERS.forEach(m => memberSelect.option(m));
  memberSelect.selected('Girder');
  checkButton = createButton('Check equilibrium');
  checkButton.mousePressed(() => { eq = checkEquilibrium(); eqSig = signature(); });

  positionControls();
  describe('A plan view of the roof over the Riverbend multipurpose room with three horizontal glulam girders, thin vertical joists, and square posts at the girder ends. One selected member, a joist, a girder, or a post, is highlighted in orange and its tributary area is shaded light blue. Below the plan, a beam diagram shows the selected member with arrows for its line load and its reactions. Sliders change the roof load, joist spacing, girder spacing, and girder span, and the line load, reaction, and maximum moment update immediately.', LABEL);
}

// five rows: four sliders, then the member menu and the equilibrium button
function positionControls() {
  const y = drawHeight;
  const sw = max(100, canvasWidth - sliderLeftMargin - 20);
  [loadSlider, joistSlider, spacingSlider, spanSlider].forEach((s, i) => { s.position(sliderLeftMargin, y + 8 + i * 35); s.size(sw); });
  memberSelect.position(165, y + 148);
  checkButton.position(165 + 100, y + 148);
}

// ---- Calculations (the chapter's w = q b, R = wL/2, M = wL^2/8) ----
function calc() {
  const q = loadSlider.value();
  const sj = JOIST_SPACINGS[joistSlider.value()] / 12;   // joist spacing, ft
  const Sg = spacingSlider.value();                       // girder spacing = joist span, ft
  const Lg = spanSlider.value();                          // girder span, ft
  const joist = { b: sj, L: Sg, area: sj * Sg };
  joist.w = q * joist.b; joist.R = joist.w * joist.L / 2; joist.M = joist.w * joist.L * joist.L / 8;
  const girder = { b: Sg, L: Lg, area: Sg * Lg };
  girder.w = q * girder.b; girder.R = girder.w * girder.L / 2; girder.M = girder.w * girder.L * girder.L / 8;
  const post = { area: Sg * Lg / 2, P: q * Sg * Lg / 2 };
  return { q, sj, Sg, Lg, joist, girder, post };
}
const n0 = v => nfc(round(v));
const signature = () => [loadSlider.value(), joistSlider.value(), spacingSlider.value(), spanSlider.value(), memberSelect.value()].join('|');

// the equilibrium check: the load on the bay, the joist reactions that reach the girder, and the post reactions must agree
function checkEquilibrium() {
  const c = calc();
  const total = c.q * c.Sg * c.Lg;
  const joistSum = 2 * (c.Lg / c.sj) * c.joist.R;
  const postSum = 2 * c.girder.R;
  const ok = abs(total - joistSum) < 1 && abs(total - postSum) < 1;
  return { total, joistSum, postSum, ok, n: c.Lg / c.sj };
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  if (eq && eqSig !== signature()) eq = null;   // any change makes the old check stale
  const c = calc();
  const sel = memberSelect.value();

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
  text('Tributary Area and Load Takedown', canvasWidth / 2, 6);

  const narrow = canvasWidth < 600;
  const lw = narrow ? canvasWidth - 20 : floor(canvasWidth * 0.62) - 10;
  const plan = narrow ? { x: 10, y: 36, w: lw, h: 128 } : { x: 10, y: 38, w: lw, h: 190 };
  const beam = narrow ? { x: 10, y: 168, w: lw, h: 130 } : { x: 10, y: 234, w: lw, h: 144 };
  const info = narrow ? { x: 10, y: 302, w: lw, h: drawHeight - 302 - 5 } : { x: lw + 20, y: 38, w: canvasWidth - lw - 30, h: drawHeight - 46 };

  drawPlan(plan, c, sel);
  drawBeam(beam, c, sel, narrow);
  drawInfo(info, c, sel, narrow);
  drawHoverTip(c, sel);
  drawControlLabels(c);
}

// ---- Plan view: three girders, joists between them, posts at the girder ends ----
function drawPlan(r, c, sel) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 6);
  const s = min((r.w - 30) / c.Lg, (r.h - 34) / (2 * c.Sg));
  const px0 = r.x + (r.w - s * c.Lg) / 2, py0 = r.y + 8 + (r.h - 34 - s * 2 * c.Sg) / 2;
  const X = ft => px0 + ft * s, Y = ft => py0 + ft * s;

  // tributary area of the selected member (ft coordinates)
  let t;
  if (sel === 'Joist') {
    const i = round((c.Lg / 2) / c.sj), xj = i * c.sj;
    t = { x0: max(0, xj - c.sj / 2), x1: min(c.Lg, xj + c.sj / 2), y0: 0, y1: c.Sg, xj: xj };
  } else if (sel === 'Girder') t = { x0: 0, x1: c.Lg, y0: c.Sg / 2, y1: 1.5 * c.Sg };
  else t = { x0: 0, x1: c.Lg / 2, y0: c.Sg / 2, y1: 1.5 * c.Sg };
  noStroke();
  fill(173, 216, 230, 190);
  rect(X(t.x0), Y(t.y0), (t.x1 - t.x0) * s, (t.y1 - t.y0) * s);
  zone = { x: X(t.x0), y: Y(t.y0), w: (t.x1 - t.x0) * s, h: (t.y1 - t.y0) * s };
  hoverZone = mouseX >= zone.x && mouseX <= zone.x + zone.w && mouseY >= zone.y && mouseY <= zone.y + zone.h;
  if (hoverZone) { stroke('navy'); strokeWeight(2); noFill(); rect(zone.x, zone.y, zone.w, zone.h); }

  // joists: thin vertical lines in both bays
  const n = floor(c.Lg / c.sj + 1e-6);
  for (let k = 0; k < 2; k++) {
    for (let i = 0; i <= n; i++) {
      const isSel = sel === 'Joist' && k === 0 && abs(i * c.sj - t.xj) < 1e-6;
      stroke(isSel ? 'darkorange' : 'gray');
      strokeWeight(isSel ? 4 : 1);
      line(X(i * c.sj), Y(k * c.Sg), X(i * c.sj), Y((k + 1) * c.Sg));
    }
  }
  // girders and posts
  for (let k = 0; k < 3; k++) {
    const isSel = sel === 'Girder' && k === 1;
    stroke(isSel ? 'darkorange' : 'dimgray');
    strokeWeight(isSel ? 8 : 6);
    line(X(0), Y(k * c.Sg), X(c.Lg), Y(k * c.Sg));
    [0, c.Lg].forEach((xe, j) => {
      const isPost = sel === 'Post' && k === 1 && j === 0;
      stroke('black');
      strokeWeight(1);
      fill(isPost ? 'darkorange' : 'saddlebrown');
      rect(X(xe) - 6, Y(k * c.Sg) - 6, 12, 12);
    });
  }
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Orange = selected; blue = tributary area; squares = posts', r.x + 6, r.y + r.h - 12);
}

// ---- Beam (or column) diagram of the selected member ----
function arrowDown(x, y1, y2, col) { drawArrow(x, y1, x, y2, col); }
function drawArrow(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(3);
  line(x1, y1, x2, y2);
  noStroke();
  fill(col);
  push();
  translate(x2, y2);
  rotate(atan2(y2 - y1, x2 - x1));
  triangle(0, 0, -8, -4.5, -8, 4.5);
  pop();
}

function drawBeam(r, c, sel, narrow) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text(narrow ? 'Selected ' + sel.toLowerCase() : 'Diagram of the selected ' + sel.toLowerCase(), r.x + 8, r.y + 4);
  const cx = r.x + r.w / 2;
  if (sel === 'Post') {
    const top = r.y + 44, bot = r.y + r.h - 40;
    arrowDown(cx, top - 24, top - 2, 'mediumblue');
    stroke('black');
    strokeWeight(1);
    fill('saddlebrown');
    rect(cx - 8, top, 16, bot - top);
    drawArrow(cx, bot + 30, cx, bot + 4, 'seagreen');
    noStroke();
    fill('mediumblue');
    textAlign(LEFT, CENTER);
    text('P = ' + n0(c.post.P) + ' lb from girder', cx + 20, top - 12);
    fill('seagreen');
    text('R = ' + n0(c.post.P) + ' lb to footing', cx + 20, bot + 18);
    return;
  }
  const m = sel === 'Joist' ? c.joist : c.girder;
  const bx0 = r.x + 40, bx1 = r.x + r.w - 40, by = r.y + (narrow ? 62 : 74);
  // distributed load
  const na = max(4, floor((bx1 - bx0) / 28));
  for (let i = 0; i <= na; i++) arrowDown(bx0 + (bx1 - bx0) * i / na, by - 32, by - 4, 'mediumblue');
  stroke('mediumblue');
  strokeWeight(2);
  line(bx0, by - 32, bx1, by - 32);
  noStroke();
  fill('mediumblue');
  textAlign(CENTER, CENTER);
  text('w = ' + n0(m.w) + ' lb per ft', cx + (narrow ? 40 : 0), by - 44);
  // beam and supports
  stroke('darkorange');
  strokeWeight(6);
  line(bx0, by, bx1, by);
  stroke('black');
  strokeWeight(1);
  fill('white');
  [bx0, bx1].forEach(x => triangle(x, by + 3, x - 8, by + 17, x + 8, by + 17));
  // reactions
  [bx0, bx1].forEach(x => drawArrow(x, by + 50, x, by + 20, 'seagreen'));
  noStroke();
  fill('seagreen');
  textAlign(CENTER, TOP);
  text('R = ' + n0(m.R) + ' lb', bx0 + (narrow ? 30 : 0), by + 52);
  text('R = ' + n0(m.R) + ' lb', bx1 - (narrow ? 30 : 0), by + 52);
  fill('black');
  textAlign(CENTER, CENTER);
  text('span L = ' + (sel === 'Joist' ? c.Sg : c.Lg) + ' ft', cx, by + 32);
}

// ---- Numbers for the selected member ----
function drawInfo(r, c, sel, narrow) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const x = r.x + 10, w = r.w - 20;
  let y = r.y + 6;
  textSize(16);
  textStyle(BOLD);
  text(sel + ': tributary area ' + n0(sel === 'Joist' ? c.joist.area : (sel === 'Girder' ? c.girder.area : c.post.area)) + ' ft²', x, y, w, 40);
  textStyle(NORMAL);
  y += narrow ? 22 : 42;
  textSize(14);
  const lines = [];
  if (sel === 'Post') {
    lines.push('Area = ' + c.Sg + ' ft × ' + c.Lg / 2 + ' ft (half the girder span)');
    lines.push('Load P = ' + c.q + ' × ' + n0(c.post.area) + ' = ' + n0(c.post.P) + ' lb');
    lines.push('Moment: none, the post is loaded in compression');
  } else {
    const m = sel === 'Joist' ? c.joist : c.girder;
    lines.push('w = q × b = ' + c.q + ' × ' + nf(m.b, 0, m.b % 1 ? 2 : 0) + ' = ' + n0(m.w) + ' lb per ft');
    lines.push('R = wL/2 = ' + n0(m.w) + ' × ' + m.L + ' / 2 = ' + n0(m.R) + ' lb');
    lines.push('M max = wL²/8 = ' + n0(m.M) + ' ft-lb');
  }
  if (!(narrow && eq)) lines.forEach(l => { text(l, x, y, w, 36); y += narrow ? 17 : (textWidth(l) > w ? 36 : 20); });
  y += 4;
  if (eq) {
    const col = eq.ok ? 'seagreen' : 'crimson';
    fill(col);
    textStyle(BOLD);
    text(eq.ok ? '✓ Equilibrium check passed' : 'Reactions do not match the load', x, y, w, 20);
    textStyle(NORMAL);
    fill('black');
    y += 20;
    text(narrow ? 'Bay load ' + n0(eq.total) + ' lb = joists ' + n0(eq.joistSum) + ' = posts ' + n0(eq.postSum) + ' lb'
      : 'Load on the bay: ' + c.q + ' × ' + c.Sg + ' × ' + c.Lg + ' = ' + n0(eq.total) + ' lb. Joist reactions on the girder: ' + n0(eq.joistSum) + ' lb. Post reactions: ' + n0(eq.postSum) + ' lb.', x, y, w, r.y + r.h - y - 2);
  } else if (!narrow) {
    fill('black');
    textStyle(BOLD);
    text('Load takedown (all members)', x, y + 6, w, 20);
    textStyle(NORMAL);
    text('Joist reaction: ' + n0(c.joist.R) + ' lb per end\nGirder reaction: ' + n0(c.girder.R) + ' lb per end\nPost load: ' + n0(c.post.P) + ' lb to the footing', x, y + 28, w, 70);
    fill('dimgray');
    text('Riverbend defaults (50 psf, 24 in., 16 ft, 40 ft) give 16,000 lb at each post. Values are illustrative.', x, r.y + r.h - 62, w, 58);
  }
}

function drawHoverTip(c, sel) {
  if (!hoverZone) return;
  let s;
  if (sel === 'Joist') s = 'The joist picks up half the distance to each neighbor: ' + nf(c.sj, 0, 2) + ' ft × ' + c.Sg + ' ft = ' + n0(c.joist.area) + ' ft².';
  else if (sel === 'Girder') s = 'The girder picks up half of each bay beside it: ' + c.Sg + ' ft × ' + c.Lg + ' ft = ' + n0(c.girder.area) + ' ft².';
  else s = 'The post picks up half the girder span and half of each bay: ' + c.Sg + ' ft × ' + c.Lg / 2 + ' ft = ' + n0(c.post.area) + ' ft².';
  textSize(14);
  const w = min(260, canvasWidth - 20), h = 62;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6), ty = constrain(mouseY + 14, 6, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(s, tx + 8, ty + 6, w - 16, h - 10);
}

function drawControlLabels(c) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y = drawHeight;
  text('Roof load: ' + c.q + ' psf', 10, y + 20);
  text('Joist spacing: ' + JOIST_SPACINGS[joistSlider.value()] + ' in.', 10, y + 55);
  text('Girder spacing: ' + c.Sg + ' ft', 10, y + 90);
  text('Girder span: ' + c.Lg + ' ft', 10, y + 125);
  text('Selected member:', 10, y + 160);
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
