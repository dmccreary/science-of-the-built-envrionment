// Riverbend Load Path Tracer MicroSim - follow snow-and-dead, wind, or quake load link by link from the roof to the soil
// CANVAS_HEIGHT: 590
// Bloom Level 4 (Analyze) + Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

const MODES = ['Snow and dead (gravity)', 'Wind (lateral)', 'Quake (lateral)'];
const PLAY_MS = 800;   // time per link while Play runs
const WIND_ROOF = 10500; // lb of wind force delivered to the roof level (Chapter 6)

// ---- State ----
let mode = 0;          // index into MODES
let step = 6;          // number of links lit, 0 to 6 (6 = whole path shown)
let selected = -1;     // link shown in the infobox
let broken = -1;       // link that has been removed, or -1
let breakStart = 0;    // millis() when the break animation began
let playing = false, playStart = 0;
let quiz = { on: false, next: 0, wrong: 0, msg: '' };
let links = [];        // the six links of the current mode, rebuilt every frame
let hoverLink = -1;

// layout (rebuilt every frame from canvasWidth)
let narrow = false, E = {}, P = {}, T = {}, X = {}, parts = {}, st = [];

// ---- Controls ----
let modeRadio, stepButton, playButton, quizButton, breakBox, roofSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  modeRadio = createRadio();
  MODES.forEach(m => modeRadio.option(m));
  modeRadio.selected(MODES[0]);
  modeRadio.changed(() => { mode = MODES.indexOf(modeRadio.value()); resetPath(); });

  stepButton = createButton('Step');
  stepButton.mousePressed(doStep);
  playButton = createButton('Play');
  playButton.mousePressed(doPlay);
  quizButton = createButton('Quiz me');
  quizButton.mousePressed(toggleQuiz);

  breakBox = createCheckbox('Break the selected link', false);
  breakBox.changed(onBreak);

  roofSlider = createSlider(15, 30, 15, 1);

  positionControls();
  describe('A side elevation of the Riverbend multipurpose room drawn as labeled blocks: roof deck, joists, glulam girders, posts, walls, hold-downs, footings, and soil. Arrows between the blocks show the force each link passes on. Three loads can be traced: snow and dead load downward, wind sideways, and an earthquake sideways. Step and Play light the links one at a time, clicking a block shows its force and connection, a checkbox breaks the selected link, and a quiz hides the labels.', LABEL);
}

// controls: row 1 radio, row 2 buttons, row 3 break checkbox, row 4 slider
function positionControls() {
  const y = drawHeight;
  modeRadio.position(10, y + 3);
  modeRadio.style('width', (canvasWidth - 20) + 'px');
  const by = canvasWidth < 600 ? y + 50 : y + 41;
  stepButton.position(10, by);
  playButton.position(70, by);
  quizButton.position(130, by);
  breakBox.position(10, y + 76);
  roofSlider.position(sliderLeftMargin, y + 113);
  roofSlider.size(max(100, canvasWidth - sliderLeftMargin - 20));
}

// ---- Numbers for the current roof weight (slider = roof dead load in psf; the chapter's Riverbend value is 15) ----
function calc() {
  const dead = roofSlider.value();
  const q = dead + 35;                    // dead plus snow, psf
  const post = q * 16 * 40 / 2;           // lb at each girder end (16 ft girder spacing, 40 ft span)
  const W = 170000 * dead / 15;           // seismic weight: roof and upper walls scale together with a heavier roof
  const V = 0.05 * W;                     // base shear, Cs = 0.05
  return { dead, q, joistEnd: q * 2 * 16 / 2, girderW: q * 16, post, soilP: post / 9, W, V };
}
const n0 = v => nfc(round(v));

// ---- Data: the six links of each path ----
function buildLinks() {
  const c = calc();
  if (mode === 0) {
    const over = c.soilP > 2000;
    return [
      { name: 'Roof deck', parts: ['deck'], short: n0(c.q) + ' psf', arrow: n0(c.q * 2) + ' plf per joist',
        force: 'Receives ' + n0(c.q) + ' psf (' + c.dead + ' dead plus 35 snow) and spreads it to the joists.',
        member: 'Plywood or OSB sheathing', next: 'Nailed to every joist, which collects its load.',
        req: 'Strength', msg: 'The deck can no longer collect the surface load, so snow and roofing fall through before any joist sees them.' },
      { name: 'Joists', parts: ['joist'], short: n0(c.joistEnd) + ' lb per end', arrow: n0(c.joistEnd) + ' lb per joist end',
        force: n0(c.joistEnd) + ' lb at each end (' + n0(c.q * 2) + ' plf over a 16 ft span, 24 in. apart).',
        member: 'Wood roof joists', next: 'Steel hangers hand each end to the glulam girder.',
        req: 'Strength', msg: 'Without joists nothing carries the deck across the 16 ft between girders, so the roof sags into the room.' },
      { name: 'Glulam girders', lab: 'Girders', parts: ['girder'], short: n0(c.girderW) + ' plf', arrow: n0(c.post) + ' lb',
        force: n0(c.girderW) + ' plf over a 40 ft span, so ' + n0(c.post) + ' lb at each end.',
        member: 'Glued-laminated girder', next: 'Rests on a post cap and bears on the post.',
        req: 'Strength', msg: 'The girder collects every joist in its bay, so losing it drops the joists and the roof above them.' },
      { name: 'Posts', parts: ['post'], short: n0(c.post) + ' lb', arrow: n0(c.post) + ' lb',
        force: n0(c.post) + ' lb in compression, straight down.',
        member: 'Wood post built into the side wall', next: 'The post base bears on the footing.',
        req: 'Stability', msg: 'The girder end loses its support and drops, which is what a buckled post does: the post fails as a stable column.' },
      { name: 'Footings', lab: 'Footing', parts: ['footing'], short: '3 ft by 3 ft pad', arrow: n0(c.soilP) + ' psf',
        force: n0(c.post) + ' lb spread over a 3 ft by 3 ft pad (9 ft²).',
        member: 'Concrete spread footing', next: 'Bears directly on the soil.',
        req: 'Stiffness', msg: 'Without a footing the post punches into the soil, the building settles, and walls crack and tilt.' },
      { name: 'Soil', parts: ['soil'], short: n0(c.soilP) + ' psf', arrow: '',
        force: 'Bearing pressure ' + n0(c.soilP) + ' psf' + (over ? ', above the illustrative 2,000 psf limit: the pad needs at least ' + (c.post / 2000).toFixed(1) + ' ft².' : ', under the illustrative 2,000 psf limit.'),
        member: 'Soil (Chapter 9)', next: 'End of the path: the ground carries the load.',
        req: 'Strength', msg: 'If the soil cannot carry the pressure it fails in bearing, the footing sinks, and the path ends in a settling building.' }
    ];
  }
  const wind = mode === 1;
  const F = wind ? WIND_ROOF : c.V;                 // lateral force reaching the roof level, lb
  const wall = F / 2;                               // lb to each side wall
  const tail = [
    { name: 'Roof deck (diaphragm)', lab: 'Roof diaphragm', parts: ['deck'], short: n0(F) + ' lb', arrow: n0(wall) + ' lb per wall',
      force: 'Collects ' + n0(F) + ' lb and spreads it over 120 ft: ' + n0(F / 120) + ' plf.',
      member: 'Roof deck nailed to joists, acting as a deep beam', next: 'Nailed to the side walls, passing ' + n0(wall) + ' lb to each.',
      req: 'Stability', msg: 'With no diaphragm the force cannot reach the side walls, so the building racks like a box with its lid off.' },
    { name: 'Side shear walls', lab: 'Side shear walls', parts: ['wall'], short: n0(wall) + ' lb each', arrow: 'uplift at wall ends',
      force: n0(wall) + ' lb each; unit shear ' + (wall / 60).toFixed(wall / 60 < 100 ? 1 : 0) + ' plf over 60 ft of solid wall.',
      member: 'Studs with nailed OSB or plywood', next: 'Anchored at each end with hold-downs.',
      req: 'Stiffness', msg: 'With no shear wall the route is flexible, so the frame racks far sideways: a stiffness failure that becomes a stability failure.' },
    { name: 'Hold-downs', parts: ['hold'], short: 'uplift', arrow: 'bolted to footing',
      force: 'Resist uplift and overturning at the wall ends; the engineer sizes them from the wall height and length.',
      member: 'Steel bracket and anchor bolt', next: 'Bolted into the footing.',
      req: 'Stability', msg: 'Without hold-downs the wall lifts at one end and overturns, so it stops resisting the sideways force.' },
    { name: 'Footings', lab: 'Footing', parts: ['footing'], short: 'sliding', arrow: n0(F) + ' lb sliding',
      force: 'Footing and slab resist sliding of ' + n0(wall) + ' lb per wall.',
      member: 'Concrete footing and slab', next: 'Friction and soil pressure push back.',
      req: 'Stability', msg: 'The building slides on its foundation, and the walls shift off their supports.' },
    { name: 'Soil', parts: ['soil'], short: 'friction', arrow: '',
      force: 'Holds the foundation in place by friction and side pressure.',
      member: 'Soil (Chapter 9)', next: 'End of the path: the ground holds the building.',
      req: 'Stability', msg: 'If the soil is too soft the foundation shifts or tilts, and the whole building moves under the load.' }
  ];
  const head = wind
    ? { name: 'End wall', parts: ['endwall'], short: '21,000 lb total', arrow: n0(WIND_ROOF) + ' lb to roof',
        force: '20 psf on a 14 ft by 75 ft wall is 21,000 lb. Half, 10,500 lb, goes to the roof and half to the foundation.',
        member: 'Studs and sheathing spanning foundation to roof', next: 'Nailed to the roof framing, passing 10,500 lb.',
        req: 'Strength', msg: 'The wall can no longer span from foundation to roof, so wind pushes it in and nothing delivers the 10,500 lb to the roof.' }
    : { name: 'Roof framing (mass)', lab: 'Roof framing', parts: ['joist', 'girder'], short: n0(c.V) + ' lb', arrow: 'V = ' + n0(c.V) + ' lb',
        force: 'Roof and upper walls weigh W = ' + n0(c.W / 1000) + ' kips, so the quake force is V = 0.05 × W = ' + n0(c.V) + ' lb.',
        member: 'Joists, girders, and the upper walls', next: 'The inertia force enters the roof deck.',
        req: 'Strength', msg: 'If the roof framing is not tied to the deck, the mass slides off the walls and the path is lost at its first step.' };
  return [head, ...tail];
}

// ---- Layout ----
function layout() {
  narrow = canvasWidth < 600;
  const gap = narrow ? 14 : 16;
  E = narrow ? { x: 10, y: 58, w: canvasWidth - 20, h: 222 } : { x: 10, y: 62, w: floor(canvasWidth * 0.6) - 10, h: drawHeight - 62 - 8 };
  P = narrow ? { x: 10, y: E.y + E.h + 6, w: canvasWidth - 20, h: drawHeight - (E.y + E.h + 6) - 4 }
             : { x: E.x + E.w + 12, y: E.y, w: canvasWidth - (E.x + E.w + 12) - 10, h: E.h };
  const keys = ['deck', 'joist', 'girder', 'wall', 'foot', 'soil'];
  const fr = [0.09, 0.09, 0.14, 0.45, 0.11, 0.12];
  const H = E.h - 6 * gap;
  let y = E.y + gap;
  keys.forEach((k, i) => { T[k] = { y: y, h: round(H * fr[i]) }; y += T[k].h + gap; });
  T.gap = gap;
  X.end0 = E.x + 0.16 * E.w;
  X.end1 = X.end0 + max(10, 0.05 * E.w);
  X.b0 = X.end1;
  X.b1 = E.x + E.w - 2;
  const bay = (X.b1 - X.b0) / 4;
  st = [0, 1, 2, 3].map(i => X.b0 + bay * (i + 0.5));
  const pw = narrow ? 8 : 12, gw = min(30, bay * 0.32), fw = min(36, bay * 0.4);
  const R = (x, k, w) => ({ x: x, y: T[k].y, w: w, h: T[k].h });
  parts = {
    soil: [R(E.x, 'soil', E.w)],
    footing: st.map(x => R(x - fw / 2, 'foot', fw)),
    wall: [R(X.b0, 'wall', X.b1 - X.b0)],
    endwall: [R(X.end0, 'wall', X.end1 - X.end0)],
    post: st.map(x => R(x - pw / 2, 'wall', pw)),
    hold: [{ x: st[0] + pw / 2, y: T.wall.y + T.wall.h - 24, w: 10, h: 24 }, { x: st[3] - pw / 2 - 10, y: T.wall.y + T.wall.h - 24, w: 10, h: 24 }],
    girder: st.map(x => R(x - gw / 2, 'girder', gw)),
    joist: [R(X.b0, 'joist', X.b1 - X.b0)],
    deck: [R(X.end0, 'deck', X.b1 - X.end0)]
  };
  X.pw = pw;
}

function linkOf(key) { return links.findIndex(l => l.parts.includes(key)); }
function rectsOf(i) { return links[i].parts.flatMap(k => parts[k]); }

// ---- Actions ----
function resetPath() {
  step = 6; selected = -1; broken = -1; playing = false;
  quiz.next = 0; quiz.wrong = 0; quiz.msg = '';
  breakBox.checked(false);
}
function doStep() {
  if (quiz.on) return;
  playing = false;
  step = step >= 6 ? 1 : step + 1;
  selected = step - 1;
  syncBreakBox();
}
function doPlay() {
  if (quiz.on) return;
  step = 0; playing = true; playStart = millis(); selected = -1; broken = -1;
  syncBreakBox();
}
function toggleQuiz() {
  quiz.on = !quiz.on;
  quiz.next = 0; quiz.wrong = 0; quiz.msg = '';
  playing = false; broken = -1; selected = -1;
  step = quiz.on ? 0 : 6;
  quizButton.html(quiz.on ? 'End quiz' : 'Quiz me');
  stepButton.elt.disabled = quiz.on; playButton.elt.disabled = quiz.on; breakBox.elt.querySelector('input').disabled = quiz.on;
  syncBreakBox();
}
function onBreak() {
  const on = breakBox.checked();
  if (on && selected >= 0) { broken = selected; breakStart = millis(); }
  else { broken = -1; if (on) breakBox.checked(false); }
}
function syncBreakBox() { breakBox.checked(broken >= 0 && broken === selected); }

function hitLink(mx, my) {
  for (let i = 0; i < links.length; i++) {
    if (rectsOf(i).some(r => mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h)) return i;
  }
  return -1;
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  const i = hitLink(mouseX, mouseY);
  if (i < 0) return;
  if (quiz.on) {
    if (i < quiz.next) return;
    if (i === quiz.next) {
      quiz.next++; step = quiz.next; quiz.msg = '';
      if (quiz.next === 6) quiz.msg = 'Path complete with ' + quiz.wrong + ' wrong ' + (quiz.wrong === 1 ? 'click' : 'clicks') + '. Press End quiz to see the labels again.';
    } else {
      quiz.wrong++;
      quiz.msg = quiz.next === 0 ? 'Not yet. Start where the load is applied: the surface that receives it.' : 'Not that one. Ask what receives the load directly from link ' + quiz.next + '.';
    }
    return;
  }
  selected = i;
  playing = false;
  syncBreakBox();
}

// ---- Drawing ----
function draw() {
  updateCanvasSize();
  layout();
  links = buildLinks();
  if (playing) {
    const p = (millis() - playStart) / PLAY_MS;
    step = min(6, floor(p) + 1);
    selected = step - 1;
    syncBreakBox();
    if (p >= 6) playing = false;
  }

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
  text('Riverbend Load Path Tracer', canvasWidth / 2, 6);
  textSize(14);
  text(subtitle(), canvasWidth / 2, 36);

  hoverLink = (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) ? hitLink(mouseX, mouseY) : -1;
  cursor(hoverLink >= 0 ? HAND : ARROW);

  drawParts();
  drawArrows();
  drawLabels();
  drawPanel();
  drawControlLabels();
}

function subtitle() {
  const c = calc();
  if (mode === 0) return 'Snow plus dead load: ' + n0(c.q) + ' psf on the roof';
  if (mode === 1) return 'Wind: 20 psf on the 75 ft end wall = 21,000 lb';
  const g = c.V > WIND_ROOF ? 'quake governs' : 'wind governs';
  return 'Quake V = ' + n0(c.V) + ' lb vs wind ' + n0(WIND_ROOF) + ' lb: ' + g;
}

function litColor() { return mode === 0 ? ['lightskyblue', 'steelblue'] : ['orange', 'darkorange']; }

// is link i drawn as reached by the load?
function isLit(i) { return quiz.on ? i < quiz.next : i < step; }

function dispOffset(i) {
  if (broken < 0 || i > broken) return [0, 0];
  const t = constrain((millis() - breakStart) / 900, 0, 1);
  const k = i === broken ? 16 : 7;
  return mode === 0 ? [0, k * t] : [k * t, 0];
}

function drawParts() {
  const order = ['soil', 'footing', 'wall', 'endwall', 'post', 'hold', 'girder', 'joist', 'deck'];
  order.forEach(k => {
    const owner = linkOf(k);
    parts[k].forEach(r => {
      let fc = 'gainsboro', sc = 'silver', sw = 1, dx = 0, dy = 0;
      if (k === 'wall' && owner < 0) fc = 'oldlace';
      if (k === 'post' && owner < 0) { fc = 'burlywood'; sc = 'peru'; }
      if (owner >= 0) {
        [dx, dy] = dispOffset(owner);
        if (owner === broken) { fc = 'mistyrose'; sc = 'crimson'; sw = 3; }
        else if (isLit(owner)) { [fc, sc] = litColor(); sw = 2; }
        else { fc = 'whitesmoke'; sc = 'gray'; }
        if (owner === hoverLink) { sc = 'navy'; sw = 3; }
        if (owner === selected) { sc = 'navy'; sw = 4; }
      }
      fill(fc);
      stroke(sc);
      strokeWeight(sw);
      rect(r.x + dx, r.y + dy, r.w, r.h, 3);
      // sheathing hatch on a shear wall
      if (k === 'wall' && owner >= 0 && owner !== broken) {
        stroke(isLit(owner) ? 'darkorange' : 'silver');
        strokeWeight(1);
        for (let x = r.x + 20; x < r.x + r.w - 10; x += 40) { line(x, r.y + 4, x + 24, r.y + r.h - 4); line(x + 24, r.y + 4, x, r.y + r.h - 4); }
      }
      if (owner >= 0 && owner === broken) { stroke('crimson'); strokeWeight(3); line(r.x + dx, r.y + dy, r.x + dx + r.w, r.y + dy + r.h); line(r.x + dx + r.w, r.y + dy, r.x + dx, r.y + dy + r.h); }
    });
  });
}

// arrow geometry for the current mode: arrow k carries the force from link k to link k+1
function arrowSpecs() {
  const ks = ['deck', 'joist', 'girder', 'wall', 'foot', 'soil'];
  const g = T.gap, out = [];
  if (mode === 0) {
    for (let k = 0; k < 5; k++) {
      const x = k === 0 ? (st[1] + st[2]) / 2 : st[1];
      out.push({ x1: x, y1: T[ks[k]].y + T[ks[k]].h, x2: x, y2: T[ks[k + 1]].y, lx: x + 8, ly: T[ks[k]].y + T[ks[k]].h + g / 2, al: LEFT });
    }
    return out;
  }
  const xa = st[0] + X.pw / 2 + 5, ya = T.wall.y + T.wall.h - 24;
  out.push(mode === 1
    ? { x1: X.end1 + 4, y1: T.deck.y + T.deck.h / 2, x2: X.end1 + (narrow ? 40 : 56), y2: T.deck.y + T.deck.h / 2, lx: X.end1 + 4, ly: T.deck.y + T.deck.h + g / 2, al: LEFT }
    : { x1: X.b0 + 4, y1: T.joist.y + T.joist.h / 2, x2: X.b0 + (narrow ? 40 : 56), y2: T.joist.y + T.joist.h / 2, lx: X.b0 + 4, ly: T.joist.y + T.joist.h + g / 2, al: LEFT });
  const xr = X.b1 - (narrow ? 26 : 34);
  out.push({ x1: xr, y1: T.deck.y + T.deck.h, x2: xr, y2: T.wall.y, lx: xr - 8, ly: T.girder.y - 2, al: RIGHT });
  out.push({ x1: xa, y1: T.wall.y + T.wall.h * 0.3, x2: xa, y2: ya, lx: xa + 8, ly: T.wall.y + T.wall.h * 0.5, al: LEFT });
  out.push({ x1: xa, y1: T.wall.y + T.wall.h, x2: xa, y2: T.foot.y, lx: xa + 8, ly: T.wall.y + T.wall.h + g / 2, al: LEFT });
  out.push({ x1: st[0], y1: T.foot.y + T.foot.h, x2: st[0], y2: T.soil.y, lx: st[0] + 8, ly: T.foot.y + T.foot.h + g / 2, al: LEFT });
  return out;
}

function drawArrow(a, col, dashed) {
  const ctx = drawingContext;
  ctx.setLineDash(dashed ? [5, 4] : []);
  stroke(col);
  strokeWeight(3);
  line(a.x1, a.y1, a.x2, a.y2);
  ctx.setLineDash([]);
  const ang = atan2(a.y2 - a.y1, a.x2 - a.x1);
  fill(col);
  noStroke();
  push();
  translate(a.x2, a.y2);
  rotate(ang);
  triangle(0, 0, -9, -5, -9, 5);
  pop();
}

function tag(s, x, y, al, size) {
  textSize(size);
  const w = textWidth(s) + 6;
  let tx = al === RIGHT ? x - w : x;
  tx = constrain(tx, 2, canvasWidth - w - 2);
  noStroke();
  fill(255, 255, 255, 215);
  rect(tx, y - size / 2 - 2, w, size + 4, 3);
  fill('black');
  textAlign(LEFT, CENTER);
  text(s, tx + 3, y);
}

function drawArrows() {
  const specs = arrowSpecs();
  const col = mode === 0 ? 'mediumblue' : 'darkorange';
  // applied load arrows
  if (mode === 0) {
    for (let i = 0; i < 6; i++) { const x = X.b0 + (X.b1 - X.b0) * (i + 0.5) / 6; drawArrow({ x1: x, y1: E.y + 1, x2: x, y2: T.deck.y - 1 }, col, false); }
  } else if (mode === 1) {
    [0.25, 0.5, 0.75].forEach(f => drawArrow({ x1: E.x + 2, y1: T.wall.y + T.wall.h * f, x2: X.end0 - 2, y2: T.wall.y + T.wall.h * f }, col, false));
  } else {
    stroke(col);
    strokeWeight(3);
    const y = T.soil.y + T.soil.h / 2;
    drawArrow({ x1: E.x + E.w - 70, y1: y, x2: E.x + E.w - 20, y2: y }, col, false);
    drawArrow({ x1: E.x + E.w - 20, y1: y, x2: E.x + E.w - 70, y2: y }, col, false);
  }
  specs.forEach((a, k) => {
    const reached = quiz.on ? k + 1 < quiz.next : k < step - 1 || step === 6;
    const cut = broken >= 0 && k >= broken;
    const active = reached && !cut;
    drawArrow(a, active ? col : 'darkgray', !active);
    const showLabel = links[k].arrow && !cut && !quiz.on || (quiz.on && k + 1 < quiz.next);
    if (showLabel && active) tag(links[k].arrow, a.lx, a.ly, a.al, narrow ? 12 : 14);
  });
  // traveling dot while Play runs
  if (playing) {
    const k = step - 1, f = ((millis() - playStart) / PLAY_MS) % 1;
    if (k >= 0 && k < 5) {
      fill('black');
      noStroke();
      circle(lerp(specs[k].x1, specs[k].x2, f), lerp(specs[k].y1, specs[k].y2, f), 9);
    }
  }
}

// block labels: number plus name when it fits, otherwise the number alone
function drawLabels() {
  const size = narrow ? 12 : 14;
  textSize(size);
  noStroke();
  links.forEach((l, i) => {
    const show = !quiz.on || i < quiz.next;
    const rs = rectsOf(i);
    const r = rs[0];
    const [dx, dy] = dispOffset(i);
    let room;
    if (rs.length === 1) room = r.w - 8;
    else room = (rs[1].x - (r.x + r.w)) - 6;
    const full = (i + 1) + ' ' + (l.lab || l.name);
    const num = String(i + 1);
    fill('black');
    textAlign(LEFT, CENTER);
    if (!show) { fill('gray'); text('?', r.x + r.w / 2 - 3 + dx, r.y + r.h / 2 + dy); return; }
    if (l.parts[0] === 'wall') { const s = textWidth(full) < room ? full : num; text(s, (st[1] + st[2]) / 2 - textWidth(s) / 2, r.y + 14 + dy); return; }
    if (l.parts[0] === 'hold') { const h = rs[1]; const s = (i + 1) + ' Hold-downs'; text(textWidth(s) < 100 ? s : num, h.x - textWidth(textWidth(s) < 100 ? s : num) - 4 + dx, h.y + h.h / 2 + dy); return; }
    if (l.parts[0] === 'endwall') { textAlign(RIGHT, CENTER); text(narrow ? '1' : '1 End wall', r.x - 4, r.y + 12); return; }
    if (rs.length === 1) { text(textWidth(full) < room ? full : num, r.x + 6 + dx, r.y + r.h / 2 + dy); return; }
    // several parts: label to the right of the first part
    const s = textWidth(full) < room ? full : num;
    if (rs.length > 1 && l.parts.length === 2) text('1 Roof framing', r.x + 4, rs[0].y + rs[0].h / 2 - (narrow ? 0 : 0));
    else text(s, r.x + r.w + 4 + dx, r.y + r.h / 2 + dy);
  });
}

// ---- Infobox panel ----
function drawPanel() {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(P.x, P.y, P.w, P.h, 8);
  noStroke();
  const x = P.x + 10, w = P.w - 20;
  let y = P.y + 8;
  fill('black');
  textAlign(LEFT, TOP);
  if (!narrow) {
    textSize(16);
    textStyle(BOLD);
    text(['Gravity path', 'Wind path', 'Quake path'][mode], x, y);
    textStyle(NORMAL);
    y += 24;
    textSize(14);
    links.forEach((l, i) => {
      const lit = isLit(i), show = !quiz.on || i < quiz.next;
      if (i === selected) { fill('lightyellow'); rect(P.x + 4, y - 2, P.w - 8, 20, 4); }
      fill(i === broken ? 'crimson' : (lit ? 'black' : 'gray'));
      text(show ? (i + 1) + ' ' + l.name : (i + 1) + ' ?', x, y);
      if (show) { textAlign(RIGHT, TOP); text(i === broken ? 'BROKEN' : l.short, P.x + P.w - 8, y); textAlign(LEFT, TOP); }
      y += 20;
    });
    y += 6;
  }
  textSize(14);
  fill('black');
  const room = P.y + P.h - y - 4;
  if (quiz.on) {
    const done = quiz.next === 6;
    text((done ? '' : 'Quiz: click the links in the order the load travels, starting where it is applied. Next: link ' + (quiz.next + 1) + ' of 6. ') + quiz.msg, x, y, w, room);
    return;
  }
  if (selected < 0) {
    text('Click any block, or press Step to follow the load one link at a time. Press Play to run the whole path.', x, y, w, room);
    return;
  }
  const l = links[selected];
  textSize(16);
  textStyle(BOLD);
  text((selected + 1) + ' ' + l.name, x, y, w, 20);
  textStyle(NORMAL);
  textSize(14);
  y += 22;
  if (broken === selected) {
    if (!narrow) { text('Force: ' + l.force, x, y, w, 17 * 3); y += 17 * 3 + 6; }
    fill('crimson');
    text(l.req + ' lost. ' + l.msg, x, y, w, P.y + P.h - y - 4);
    return;
  }
  text('Force: ' + l.force, x, y, w, 17 * (narrow ? 3 : 4));
  y += 17 * (narrow ? 2 : 3) + 4;
  text('Member: ' + l.member + '.', x, y, w, 34);
  y += narrow ? 17 : 36;
  text('Hands to next: ' + l.next, x, y, w, 60);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Roof weight: ' + roofSlider.value() + ' psf', 10, drawHeight + 125);
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
