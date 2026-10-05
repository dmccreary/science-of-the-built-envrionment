// Ice Dam Formation Explorer MicroSim - how ceiling air leaks, insulation, and attic ventilation set the roof deck temperature and decide whether an ice dam forms
// CANVAS_HEIGHT: 460
// Bloom Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 310;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

// ---- Simplified steady-state model (per ft2 of attic floor; illustrative values) ----
const T_ROOM = 70;         // degF indoors
const LEAK = 0.065;        // BTU/h*ft2*degF carried into the attic by leaking warm air (about 0.06 cfm per ft2)
const VENT_OPEN = 0.432;   // BTU/h*ft2*degF removed by ventilation with open soffit and ridge vents (about 0.4 cfm per ft2)
const VENT_SHUT = 0.032;   // leakage-level ventilation with the vents blocked
const R_SNOW = 6;          // about 12 in of snow at roughly R-0.5 per inch
const R_UNDER = 0.8;       // attic air film plus sheathing, below the snow-covered deck surface
const R_OVER = 0.6 + 0.17; // shingles and outside film
const U_ROOF = 1 / (R_UNDER + R_OVER + R_SNOW);
const FT_RAMP = 7;         // feet up the slope over which the deck reaches its full temperature (cold eave edge)

// ---- Controls and state ----
let tempSlider, rSlider, leakCheck, ventCheck, barrierCheck;
let m = {};                // model results for the current settings
let mouseOverCanvas = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseOver(() => mouseOverCanvas = true);
  canvas.mouseOut(() => mouseOverCanvas = false);
  textSize(defaultTextSize);

  tempSlider = createSlider(-20, 30, 20, 1);
  rSlider = createSlider(19, 60, 30, 1);
  leakCheck = createCheckbox('Air leaks at ceiling', true);
  ventCheck = createCheckbox('Soffit and ridge vents open', false);
  barrierCheck = createCheckbox('Ice-and-water barrier at eave', false);
  [leakCheck, ventCheck, barrierCheck].forEach(c => c.style('font-size', '14px'));

  positionControls();
  describe('A side section of a house eave and attic with a snow layer on the roof. Color shading shows temperature from blue at the cold eave to white at freezing to orange where the roof deck is warm. Arrows show heat flowing up through the ceiling insulation, warm air leaking through the ceiling, and cold air moving from the soffit to the ridge. Two sliders set outdoor temperature and insulation R-value, and three checkboxes turn on ceiling air leaks, open vents, and an ice-and-water barrier. Ice appears at the eave when snow melts on the warm deck and refreezes on the cold overhang. Two readouts say whether an ice dam is forming and whether water reaches the interior.', LABEL);
}

function positionControls() {
  const r1 = drawHeight + 8, r2 = drawHeight + 43, r3 = drawHeight + 78, r4 = drawHeight + 113;
  tempSlider.position(sliderLeftMargin, r1 + 4); tempSlider.size(max(100, canvasWidth - sliderLeftMargin - 20));
  rSlider.position(sliderLeftMargin, r2 + 4); rSlider.size(max(100, canvasWidth - sliderLeftMargin - 20));
  leakCheck.position(10, r3);
  ventCheck.position(10 + leakCheck.elt.getBoundingClientRect().width + 14, r3);
  barrierCheck.position(10, r4);
}

// ---- Model ----
function computeModel() {
  const To = tempSlider.value(), R = rSlider.value();
  const leak = leakCheck.checked(), vent = ventCheck.checked();
  const a = 1 / R + (leak ? LEAK : 0);                 // heat path from the room into the attic
  const b = U_ROOF + (vent ? VENT_OPEN : VENT_SHUT);   // heat paths from the attic to the outdoors
  const Ta = (T_ROOM * a + To * b) / (a + b);          // attic air temperature
  const Tdk = Ta - (Ta - To) * R_UNDER / (R_UNDER + R_OVER + R_SNOW); // deck surface under the snow
  const excess = Tdk - 32;
  const state = excess <= 0 ? 'none' : (excess < 2.5 ? 'minor' : 'forming');
  m = {
    To, R, leak, vent, Ta, Tdk, excess, state,
    qCond: (T_ROOM - Ta) / R,                          // BTU/h*ft2 through the insulation
    qLeak: LEAK * (T_ROOM - Ta),                       // BTU/h*ft2 carried by leaking air
    barrier: barrierCheck.checked()
  };
  m.interior = (state === 'forming') && !m.barrier;
}

// first fix in priority order: seal, insulate, ventilate, then the barrier as a backup
function statusText() {
  if (m.state === 'none') return 'No ice dam: the deck stays below 32 °F under the snow.';
  const note = m.barrier ? 'The barrier protects the interior but does not stop the dam. ' : '';
  if (m.leak) return note + 'Fix 1: air seal the ceiling (untick "Air leaks").';
  if (m.R < 49) return note + 'Fix 2: add insulation, toward R-49 or more.';
  if (!m.vent) return note + 'Fix 3: open the soffit and ridge vents.';
  return note + 'Heat still reaches the deck: look for missed air leaks.';
}

// ---- Geometry (px) ----
function geo() {
  const g = {};
  g.xe = canvasWidth * 0.05;                       // eave tip
  g.wallX = g.xe + max(34, canvasWidth * 0.07);    // outside face of the wall
  g.ridgeX = canvasWidth - 14;
  g.yTip = 158; g.yRidge = 76;
  g.ceilY = 206; g.botY = 244;
  g.ftPx = (g.ridgeX - g.xe) / 16;                 // the section is about 16 ft of horizontal run
  g.slope = (g.yRidge - g.yTip) / (g.ridgeX - g.xe);
  return g;
}
function deckY(g, x) { return g.yTip + g.slope * (x - g.xe); }
function topY(g, x) { return deckY(g, x) - 5; } // upper surface of the 9 px deck line
function ramp(sFt) { const t = constrain((sFt - 0.3) / FT_RAMP, 0, 1); return t * t * (3 - 2 * t); } // smoothstep
function tDeck(g, x) { return m.To + (m.Tdk - m.To) * ramp((x - g.xe) / g.ftPx); }
function tAir(g, x) { return m.To + (m.Ta - m.To) * ramp((x - g.xe) / g.ftPx); }

// blue (cold) through white (32 F) to orange (warm)
function tempColor(t) {
  if (t < 32) return lerpColor(color('steelblue'), color('white'), constrain(map(t, -20, 32, 0, 1), 0, 1));
  return lerpColor(color('white'), color('darkorange'), constrain(map(t, 32, 60, 0, 1), 0, 1));
}

function draw() {
  updateCanvasSize();
  computeModel();
  const g = geo();

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
  text('Ice Dam Formation Explorer', canvasWidth / 2, 6);

  drawHouse(g);
  drawAirAndHeat(g);
  drawRoof(g);
  drawIceAndWater(g);
  drawLabels(g);
  drawReadouts(g);
  drawControlLabels();
}

function drawHouse(g) {
  // room, wall, ceiling, and insulation
  noStroke(); fill('mistyrose');
  rect(g.wallX, g.ceilY, g.ridgeX + 14 - g.wallX, g.botY - g.ceilY);
  stroke('saddlebrown'); strokeWeight(1); fill('burlywood');
  rect(g.wallX - 8, g.ceilY - 14, 8, g.botY - g.ceilY + 14);               // wall and top plate
  const ins = map(m.R, 19, 60, 8, 26);
  stroke('goldenrod'); fill('khaki');
  rect(g.wallX, g.ceilY - ins, g.ridgeX + 14 - g.wallX, ins);               // insulation thickness follows R
  stroke('gray'); strokeWeight(2); line(g.wallX, g.ceilY, g.ridgeX + 14, g.ceilY); // ceiling drywall
  noStroke(); fill('dimgray'); textAlign(LEFT, CENTER); textSize(14);
  text('Room 70 °F', g.wallX + 10, g.botY - 12);
  textSize(12); fill('black'); textAlign(LEFT, CENTER);
  text('R-' + m.R + ' insulation above the ceiling', g.wallX + 10, g.ceilY + 11);
  noStroke();
  // temperature legend inside the room
  const lx = g.ridgeX + 10 - 118, ly = g.botY - 30;
  for (let i = 0; i < 100; i++) { fill(tempColor(map(i, 0, 99, -20, 60))); rect(lx + i * 1.1, ly, 1.3, 9); }
  fill('black'); textSize(12); textAlign(LEFT, TOP);
  text('-20', lx, ly + 10);
  textAlign(CENTER, TOP); text('32', lx + 52 * 1.1 + 0.5, ly + 10);
  textAlign(RIGHT, TOP); text('60 °F', lx + 110, ly + 10);
}

function drawAirAndHeat(g) {
  // attic air shaded by temperature, in vertical strips from the soffit to the ridge
  const insTop = g.ceilY - map(m.R, 19, 60, 8, 26);
  noStroke();
  for (let x = g.wallX; x < g.ridgeX + 14; x += 4) {
    fill(red(tempColor(tAir(g, x))), green(tempColor(tAir(g, x))), blue(tempColor(tAir(g, x))), 190);
    const top = deckY(g, x) + 6;
    if (top < insTop) rect(x, top, 4.5, insTop - top);
  }
  // heat flow up through the insulation: arrow length follows heat flux
  const alen = constrain(m.qCond * 18, 8, 50);
  const n = max(3, floor((g.ridgeX - g.wallX) / 70));
  for (let i = 0; i < n; i++) {
    const x = g.wallX + 30 + i * (g.ridgeX - g.wallX - 60) / max(1, n - 1);
    drawArrow(x, g.ceilY - 2, x, g.ceilY - 2 - alen, 'darkorange', 3);
  }
  // warm air leaking through the ceiling
  if (m.leak) {
    const llen = constrain(m.qLeak * 10 + 10, 14, 60);
    for (let i = 0; i < 2; i++) {
      const x = g.wallX + (g.ridgeX - g.wallX) * (0.3 + 0.35 * i);
      drawArrow(x + 18, g.ceilY + 2, x + 18, g.ceilY - 2 - llen, 'crimson', 4, true);
    }
  }
  // ventilation: cold air in at the soffit, out at the ridge
  if (m.vent) {
    const sy = g.yTip + 26;
    drawArrow(g.xe + (g.wallX - g.xe) * 0.5, sy + 18, g.xe + (g.wallX - g.xe) * 0.5, sy, 'steelblue', 3);
    stroke('steelblue'); strokeWeight(2); noFill();
    const x0 = g.wallX + 6;
    line(x0, deckY(g, x0) + 12, g.ridgeX - 30, deckY(g, g.ridgeX - 30) + 12);
    drawArrow(g.ridgeX - 36, deckY(g, g.ridgeX - 36) + 12, g.ridgeX - 16, deckY(g, g.ridgeX - 16) + 3, 'steelblue', 3);
  }
}

function drawArrow(x1, y1, x2, y2, col, w, dashed) {
  stroke(col); strokeWeight(w);
  if (dashed) drawingContext.setLineDash([6, 4]);
  line(x1, y1, x2, y2);
  drawingContext.setLineDash([]);
  const a = atan2(y2 - y1, x2 - x1);
  fill(col);
  triangle(x2, y2, x2 - 9 * cos(a - 0.45), y2 - 9 * sin(a - 0.45), x2 - 9 * cos(a + 0.45), y2 - 9 * sin(a + 0.45));
}

function drawRoof(g) {
  // soffit and fascia under the overhang
  stroke('saddlebrown'); strokeWeight(1); fill('burlywood');
  rect(g.xe, g.yTip + 8, 5, 18);                                              // fascia
  rect(g.xe, g.yTip + 22, g.wallX - g.xe, 4);                                 // soffit
  noStroke(); fill('black');
  if (m.vent) { stroke('black'); strokeWeight(1); line(g.xe + 8, g.yTip + 24, g.wallX - 6, g.yTip + 24); }
  // roof deck colored by temperature
  for (let x = g.xe; x < g.ridgeX + 14; x += 4) {
    stroke(tempColor(tDeck(g, x))); strokeWeight(9);
    line(x, deckY(g, x), x + 4.5, deckY(g, x + 4.5));
  }
  stroke('dimgray'); strokeWeight(1);
  line(g.xe, topY(g, g.xe), g.ridgeX + 14, topY(g, g.ridgeX + 14));  // top edge of the deck
  // ice-and-water barrier: a dark strip on the deck from the eave tip up past the wall line
  if (m.barrier) {
    stroke('black'); strokeWeight(3);
    const xb = g.xe + 6 * g.ftPx;
    line(g.xe, topY(g, g.xe) - 2, xb, topY(g, xb) - 2);
  }
  // snow, thinner where the deck is above freezing
  noStroke(); fill('white');
  stroke('lightsteelblue'); strokeWeight(1);
  beginShape();
  for (let x = g.xe + 2; x <= g.ridgeX + 14; x += 6) {
    const warm = constrain((tDeck(g, x) - 32) / 6, 0, 1);
    vertex(x, topY(g, x) - 3 - 15 * (1 - 0.75 * warm));
  }
  for (let x = g.ridgeX + 14; x >= g.xe + 2; x -= 6) vertex(x, topY(g, x) - 3);
  endShape(CLOSE);
}

function drawIceAndWater(g) {
  if (m.state === 'none') return;
  // where does the deck first rise above 32 F, counted up from the eave?
  let xm = g.ridgeX;
  for (let x = g.xe; x < g.ridgeX; x += 2) if (tDeck(g, x) > 32) { xm = x; break; }
  const sm = (xm - g.xe) / g.ftPx;
  const sc = constrain(sm * 0.35, 0.6, 2), half = constrain(sm * 0.2, 0.4, 1);
  const x0 = g.xe + max(0.15, sc - half) * g.ftPx, x1 = g.xe + (sc + half) * g.ftPx, xc = (x0 + x1) / 2;
  const hDam = m.state === 'minor' ? map(m.excess, 0, 2.5, 4, 9) : constrain(map(m.excess, 2.5, 12, 12, 30), 12, 30);
  const phase = mouseOverCanvas ? (millis() / 900) % 1 : 0;   // animate only while the pointer is over the canvas

  // meltwater: drops run down the underside of the snow to the dam
  noStroke(); fill('dodgerblue');
  for (let k = 0; k < 6; k++) {
    const f = ((k / 6) + phase) % 1;
    const x = lerp(xm, xc + half * g.ftPx * 0.6, f);
    circle(x, topY(g, x) - 7, 6);
  }
  // pond of meltwater behind the dam
  fill(30, 144, 255, 130);
  beginShape();
  vertex(x1, topY(g, x1) - 3);
  vertex(min(xm, x1 + 2.2 * g.ftPx), topY(g, min(xm, x1 + 2.2 * g.ftPx)) - 3);
  vertex(min(xm, x1 + 2.2 * g.ftPx), topY(g, min(xm, x1 + 2.2 * g.ftPx)) - 3 - hDam * 0.7);
  vertex(x1, topY(g, x1) - 3 - hDam * 0.9);
  endShape(CLOSE);
  // the ice dam: pale cyan with an outline
  stroke('teal'); strokeWeight(2); fill('paleturquoise');
  beginShape();
  vertex(x0, topY(g, x0) - 3);
  vertex(x0 + 3, topY(g, x0 + 3) - 3 - hDam * 0.7);
  vertex(xc, topY(g, xc) - 3 - hDam);
  vertex(x1 - 3, topY(g, x1 - 3) - 3 - hDam * 0.9);
  vertex(x1, topY(g, x1) - 3);
  endShape(CLOSE);
  // icicles hang from the overhang when an ice dam is forming
  if (m.state === 'forming') {
    stroke('teal'); strokeWeight(1); fill('paleturquoise');
    for (let i = 0; i < 3; i++) { const ix = g.xe + 4 + i * 7; triangle(ix - 2, g.yTip + 8, ix + 2, g.yTip + 8, ix, g.yTip + 20 + (i % 2) * 6); }
  }
  // water that backs up under the shingles and reaches the interior
  if (m.interior) {
    noStroke(); fill('dodgerblue');
    for (let k = 0; k < 3; k++) {
      const f = ((k / 3) + phase) % 1;
      const y = lerp(deckY(g, xc + 12) + 6, g.ceilY - 34, f);
      circle(xc + 12 + k * 3, y, 6);
    }
    noFill(); stroke('crimson'); strokeWeight(2);
    ellipse(xc + 14, g.ceilY - 16, 40, 20);
  }
  noStroke(); fill('teal'); textAlign(CENTER, BOTTOM); textSize(12);
  text('ice dam', xc, topY(g, xc) - 6 - hDam);
}

function drawLabels(g) {
  noStroke(); textSize(12); textAlign(LEFT, TOP);
  fill('black'); text('eave', g.xe - 2, g.yTip + 46);
  if (m.barrier) { const xb = g.xe + 6 * g.ftPx; text('ice-and-water barrier', xb + 4, topY(g, xb) - 16); }
  // temperatures of the attic air and the deck under the snow
  fill('black'); textSize(14);
  text('Attic air ' + nf(m.Ta, 1, 1) + ' °F', 10, 36);
  fill(m.Tdk > 32 ? 'darkorange' : 'steelblue');
  text('Deck under snow ' + nf(m.Tdk, 1, 1) + ' °F (melts above 32)', 10, 52);
  // arrow key
  textSize(12);
  fill('darkorange'); text('Orange arrows: heat through the ceiling', 10, 72);
  if (m.leak && m.vent) { fill('crimson'); text('Red: warm air leak', 10, 86); fill('steelblue'); text('Blue: cold vent air', 112, 86); }
  else if (m.leak) { fill('crimson'); text('Red arrows: warm air leaking up', 10, 86); }
  else if (m.vent) { fill('steelblue'); text('Blue arrows: cold air in, warm air out', 10, 86); }
}

function drawReadouts(g) {
  const y = g.botY + 4;
  noStroke(); textAlign(LEFT, TOP); textSize(16);
  const col = m.state === 'none' ? 'seagreen' : (m.state === 'minor' ? 'darkorange' : 'crimson');
  fill('black'); text('Ice dam:', 10, y);
  fill(col); text(m.state, 10 + textWidth('Ice dam:') + 6, y);
  fill('black');
  const lbl = 'Water reaching interior: ';
  const ix = max(10 + textWidth('Ice dam: forming') + 20, canvasWidth * 0.36);
  text(lbl, ix, y);
  fill(m.interior ? 'crimson' : 'seagreen');
  text(m.interior ? 'yes' : 'no', ix + textWidth('Water reaching interior:') + 6, y);
  fill('black'); textSize(14);
  text(statusText(), 10, y + 24, canvasWidth - 20, 38);
}

function drawControlLabels() {
  noStroke(); fill('black'); textAlign(LEFT, CENTER); textSize(defaultTextSize);
  text('Outdoor: ' + tempSlider.value() + ' °F', 10, drawHeight + 8 + 12);
  text('Insulation: R-' + rSlider.value(), 10, drawHeight + 43 + 12);
  fill('dimgray'); textSize(12); textAlign(RIGHT, TOP);
  text('Illustrative model', canvasWidth - 10, drawHeight + 113);
  text('12 in of snow on roof', canvasWidth - 10, drawHeight + 127);
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
