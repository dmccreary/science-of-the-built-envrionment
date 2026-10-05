// Masonry Wall Assembly Explorer MicroSim - elevation and cutaway of a block wall (with brick or stone veneer options), a lateral wind test, and a unit counter
// CANVAS_HEIGHT: 695
// Bloom Level 1 (Remember) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 510;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 190;
let defaultTextSize = 16;

// ---- Wall panel geometry, in inches: 8 ft long, 7 courses of 8 in. (the lower part of an 8 ft wall) ----
const WALL_W = 96, WALL_H = 56, COURSES = 7;
const CJ_X = 24, CJ_G = 0.75;          // control joint position and half-width
const CUT_X = 52;                      // left of this line the face shell is cut away (or the veneer is removed)
const EJ_X = 76;                       // expansion joint in the brick veneer
const BAR_X = [12, 36, 60, 84];        // vertical bars, 24 in. on center
const JR_Y = [16, 32, 48];             // joint reinforcement in every other bed joint (16 in. on center)
const CORE_W = 5.5;                    // core width, in.
const STONE_ROWS = [{ h: 12, w: [20, 24] }, { h: 8, w: [12, 18, 14] }, { h: 16, w: [28, 16] }, { h: 8, w: [16, 12, 16] }, { h: 12, w: [14, 30] }];

// ---- Mortar types (strengths from Chapter 8, ASTM C270) ----
const MORTAR = {
  M: { psi: 2500, fr: 100, frG: 200, t: 0.95 },
  S: { psi: 1800, fr: 100, frG: 200, t: 0.65 },
  N: { psi: 750, fr: 64, frG: 153, t: 0.35 },
  O: { psi: 350, fr: 38, frG: 115, t: 0.0 }
};
const ASSEMBLIES = ['Unreinforced CMU', 'Reinforced CMU', 'Brick veneer on CMU', 'Stone veneer'];

// ---- Parts: name, function, size, governing standard ----
const PARTS = {
  block: { name: 'Concrete masonry unit (CMU)', fn: 'The block carries the compression and forms the body of the wall. Its hollow cores save weight and can be grouted.', size: 'Nominal 8 x 8 x 16 in.; actual size is 3/8 in. less each way.', std: 'ASTM C90 (loadbearing CMU), about 2,000 psi on the net area.' },
  mortar: { name: 'Mortar joint', fn: 'Bonds the units, seals the wall against water, and lets small movements occur in the joint instead of in the unit.', size: 'About 3/8 in. thick (drawn thicker here).', std: 'ASTM C270; Types M, S, N, O.' },
  cell: { name: 'Core (empty cell)', fn: 'The hollow space in a block. It reduces weight, and it can be filled with grout and a bar.', size: 'Two cores per 16 in. unit, each roughly 5 to 6 in. wide.', std: 'Unit shape per ASTM C90.' },
  grout: { name: 'Grout', fn: 'Fluid concrete poured into cores. It bonds the bars to the block and thickens the section, which adds strength.', size: 'Fills a core about 5 to 6 in. wide; slump 8 to 11 in.', std: 'ASTM C476.' },
  bar: { name: 'Vertical bar', fn: 'Carries the tension on the face that stretches when wind bends the wall, and holds cracks tight after they open.', size: '#5 bar (0.31 in²), 24 in. on center, in a grouted core.', std: 'ASTM A615 Grade 60 rebar; design per TMS 402.' },
  bondbeam: { name: 'Bond beam', fn: 'A grouted course with continuous horizontal bars. It ties the wall together and spreads loads along its length.', size: 'One block course, 8 in. high, with a horizontal bar.', std: 'TMS 402 and TMS 602.' },
  jreinf: { name: 'Joint reinforcement', fn: 'Ladder-shaped wire laid in a bed joint. It controls shrinkage cracking and ties the wall along its length.', size: 'Wire ladder in the 3/8 in. joint, every 16 in. of height.', std: 'ASTM A951.' },
  control: { name: 'Control joint', fn: 'A planned vertical gap filled with sealant. Shrinkage cracks form here, in a straight line, instead of at random.', size: 'Spacing commonly 25 ft or less; shown close together here for clarity.', std: 'Detailed per TMS 402; sealant ASTM C920.' },
  brick: { name: 'Clay brick (veneer)', fn: 'A thin facing that sheds weather. It carries only its own weight, and it passes wind to the backup through ties.', size: 'Modular brick 3 5/8 x 2 1/4 x 7 5/8 in.; module 4 x 2 2/3 x 8 in.', std: 'ASTM C216 facing brick; Grade SW in Minnesota.' },
  expansion: { name: 'Expansion joint (brick)', fn: 'A full-depth gap with a compressible filler and sealant. Clay brick grows over its life, and the joint lets it grow.', size: 'Roughly 3/8 to 3/4 in. wide, in a long run of veneer.', std: 'Brick Industry Association Technical Note 18.' },
  tie: { name: 'Veneer tie', fn: 'A metal anchor in the mortar joint that carries wind load from the veneer to the backup wall.', size: 'Spaced about 16 in. up and 24 in. across here (illustrative).', std: 'TMS 402 veneer provisions.' },
  stone: { name: 'Stone veneer', fn: 'Natural stone facing, anchored to the backup. The anchors must carry its weight of about 150 to 170 pcf.', size: 'Cut stone, here 8 to 16 in. high and 12 to 30 in. long.', std: 'ASTM C615 (granite) or C568 (limestone).' }
};

// ---- State ----
let assembly = 'Unreinforced CMU';
let countMode = false;
let selPart = null;    // key of the clicked part
let hoverPart = null;  // { key, rect: [x0, y0, x1, y1] in inches }
let L = {};            // layout for the current frame

// ---- Controls ----
let assemblyRadio, windSlider, mortarSel, groutCheck, countBtn, lengthSlider, heightSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  assemblyRadio = createRadio();
  ASSEMBLIES.forEach(a => assemblyRadio.option(a));
  assemblyRadio.selected(assembly);
  assemblyRadio.changed(() => { assembly = assemblyRadio.value(); groutCheck.checked(isReinforced()); selPart = null; });

  windSlider = createSlider(0, 350, 30, 5);
  mortarSel = createSelect();
  Object.keys(MORTAR).forEach(k => mortarSel.option(k));
  mortarSel.selected('N');
  groutCheck = createCheckbox('Grout the cells', false);
  countBtn = createButton('Count the units');
  countBtn.mousePressed(() => { countMode = !countMode; updateControlVisibility(); });
  lengthSlider = createSlider(4, 40, 20, 1);
  heightSlider = createSlider(4, 20, 8, 1);

  positionControls();
  updateControlVisibility();
  describe('An elevation and cutaway of a concrete block wall with courses, staggered joints, mortar, hollow or grouted cores, vertical bars, a bond beam, joint reinforcement, a control joint, and optional brick or stone veneer with an expansion joint. A side view shows a wind load bending the wall and cracking it. Controls pick the assembly, wind pressure, mortar type, and grouting, and a counter computes units or bricks for a chosen wall size.', LABEL);
}

function isReinforced() { return assembly !== 'Unreinforced CMU'; }
function isVeneer() { return assembly === 'Brick veneer on CMU' || assembly === 'Stone veneer'; }
function sliderWidth() { return max(120, canvasWidth - sliderLeftMargin - 20); }

function positionControls() {
  const y0 = drawHeight;
  assemblyRadio.position(10, y0 + 4);
  assemblyRadio.style('width', (canvasWidth - 20) + 'px');
  windSlider.position(sliderLeftMargin, y0 + 78);
  lengthSlider.position(sliderLeftMargin, y0 + 78);
  windSlider.size(sliderWidth());
  lengthSlider.size(sliderWidth());
  heightSlider.position(sliderLeftMargin, y0 + 113);
  heightSlider.size(sliderWidth());
  mortarSel.position(sliderLeftMargin, y0 + 112);
  groutCheck.position(sliderLeftMargin + 80, y0 + 112);
  countBtn.position(10, y0 + 147);
}

function updateControlVisibility() {
  if (countMode) { windSlider.hide(); mortarSel.hide(); groutCheck.hide(); lengthSlider.show(); heightSlider.show(); countBtn.html('Back to the wall'); }
  else { windSlider.show(); mortarSel.show(); groutCheck.show(); lengthSlider.hide(); heightSlider.hide(); countBtn.html('Count the units'); }
}

// ---- Wall model ----
// bed-joint thickness in inches, drawn thicker than real so it is visible
function jointIn() { return max(0.375, 2 / L.s); }

// the units in a course, in running bond, with a control joint at CJ_X
function courseUnits(c) {
  const odd = c % 2 === 1, out = [];
  [[0, CJ_X - CJ_G, 0], [CJ_X + CJ_G, WALL_W, CJ_X]].forEach(seg => {
    const b = [seg[0]];
    for (let x = seg[2] + (odd ? 8 : 0); x < seg[1] - 0.01; x += 16) if (x > seg[0] + 0.01) b.push(x);
    b.push(seg[1]);
    for (let i = 0; i < b.length - 1; i++) out.push([b[i], b[i + 1]]);
  });
  return out;
}
function cellCenter(k) { return 4 + 8 * k; }
function cellGrouted(k, c) {
  if (groutCheck.checked()) return true;
  if (isReinforced() && (BAR_X.includes(cellCenter(k)) || c === COURSES - 1)) return true;
  return false;
}

// capacities in psf for an 8 ft high, 8 in. wall spanning floor to roof (illustrative, after typical flexural values)
function capacities() {
  const m = MORTAR[mortarSel.value()], full = groutCheck.checked();
  const S = full ? 116.3 : 81;                  // section modulus, in3 per ft of wall
  const wcr = 96 * (full ? m.frG : m.fr) * S / (96 * 96);
  let wn = null;
  if (isReinforced()) {
    const As = 0.31 / 2, a = As * 60000 / (0.8 * 1500 * 12);   // #5 at 24 in., f'm = 1,500 psi
    wn = 96 * As * 60000 * (3.81 - a / 2) / (96 * 96);
  }
  return { wcr: round(wcr / 5) * 5, wn: wn === null ? null : round(wn / 5) * 5 };
}

function wallState(w) {
  const c = capacities();
  if (!isReinforced()) return w >= c.wcr ? 'failed' : 'uncracked';
  if (w >= c.wn) return 'yield';
  return w >= c.wcr ? 'cracked' : 'uncracked';
}

function mortarColor() { return lerpColor(color('wheat'), color('saddlebrown'), MORTAR[mortarSel.value()].t * 0.7); }

// ---- Draw ----
function draw() {
  updateCanvasSize();
  computeLayout();

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
  text('Masonry Wall Assembly Explorer', canvasWidth / 2, 8);

  hoverPart = mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight ? partAt(mouseX, mouseY) : null;

  drawWall();
  drawHover();
  drawLegend();
  if (countMode) drawCountPanel(); else drawTestPanels();
  drawControlLabels();
  drawTooltip();
}

function computeLayout() {
  const narrow = canvasWidth < 620;
  const s = narrow ? (canvasWidth * 0.66) / WALL_W : min(4.6, (canvasWidth * 0.55 - 24) / WALL_W);
  const ox = 12, oy = 50;
  L = { narrow, s, ox, oy, ww: WALL_W * s, wh: WALL_H * s };
  L.legendY = oy + L.wh + 8;
  if (narrow) {
    L.sk = { x: ox + L.ww + 8, y: oy, w: canvasWidth - (ox + L.ww + 8) - 8, h: L.wh };
    L.p1 = { x: 8, y: L.legendY + 40, w: canvasWidth - 16, h: 104 };
    L.p2 = { x: 8, y: L.legendY + 150, w: canvasWidth - 16, h: drawHeight - (L.legendY + 150) - 6 };
  } else {
    const rx = ox + L.ww + 16, rw = canvasWidth - rx - 10;
    L.sk = { x: rx, y: 48, w: rw, h: 220 };
    L.p1 = { x: ox, y: L.legendY + 44, w: L.ww, h: drawHeight - (L.legendY + 44) - 6 };
    L.p2 = { x: rx, y: 276, w: rw, h: drawHeight - 276 - 6 };
  }
}

const X = xin => L.ox + xin * L.s;
const Y = yin => L.oy + (WALL_H - yin) * L.s;

function drawWall() {
  const j = jointIn(), h = j / 2;
  const mc = mortarColor();
  // mortar backing
  noStroke();
  fill(mc);
  rect(X(0), Y(WALL_H), L.ww, L.wh);
  // control joint gap and sealant
  fill('steelblue');
  rect(X(CJ_X - CJ_G), Y(WALL_H), 2 * CJ_G * L.s, L.wh);

  // face view of every unit
  for (let c = 0; c < COURSES; c++) {
    courseUnits(c).forEach(u => {
      fill('lightgray');
      rect(X(u[0] + h), Y(8 * c + 8 - h), (u[1] - u[0] - j) * L.s, (8 - j) * L.s);
    });
  }

  // cutaway: the face shell is removed left of CUT_X, showing the cores, grout, and bars
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(X(0), Y(WALL_H), (CUT_X) * L.s, L.wh);
  drawingContext.clip();
  for (let c = 0; c < COURSES; c++) {
    courseUnits(c).forEach(u => {
      fill('silver');
      rect(X(u[0] + h), Y(8 * c + 8 - h), (u[1] - u[0] - j) * L.s, (8 - j) * L.s);
    });
    for (let k = 0; k < 12; k++) {
      const cx = cellCenter(k);
      const g = cellGrouted(k, c);
      stroke('dimgray');
      strokeWeight(1);
      fill(g ? 'gray' : 'white');
      rect(X(cx - CORE_W / 2), Y(8 * c + 8 - j), CORE_W * L.s, (8 - 2 * j) * L.s);
    }
  }
  drawingContext.restore();
  // cutaway edge
  stroke('black');
  strokeWeight(1);
  line(X(CUT_X), Y(WALL_H), X(CUT_X), Y(0));

  // steel in the cutaway region (solid) and in the face region (dashed, hidden behind the face)
  if (isReinforced()) {
    stroke('black');
    strokeWeight(max(3, 0.625 * L.s));
    BAR_X.forEach(bx => { if (bx < CUT_X) line(X(bx), Y(WALL_H - 1), X(bx), Y(1)); });
    [[0, CJ_X - 2], [CJ_X + 2, CUT_X]].forEach(sg => line(X(sg[0] + 1), Y(52), X(sg[1]), Y(52)));
    if (!isVeneer()) {
      strokeWeight(2);
      drawingContext.setLineDash([5, 4]);
      BAR_X.forEach(bx => { if (bx > CUT_X) line(X(bx), Y(WALL_H - 1), X(bx), Y(1)); });
      line(X(CUT_X), Y(52), X(WALL_W - 1), Y(52));
      drawingContext.setLineDash([]);
    }
    // joint reinforcement: a ladder of wire in the bed joints
    stroke('black');
    strokeWeight(2);
    JR_Y.forEach(jy => {
      [[1, CJ_X - 2], [CJ_X + 2, WALL_W - 1]].forEach(sg => {
        if (isVeneer() && sg[1] > CUT_X) { line(X(sg[0]), Y(jy), X(CUT_X), Y(jy)); return; }
        line(X(sg[0]), Y(jy), X(sg[1]), Y(jy));
      });
    });
  }

  if (assembly === 'Brick veneer on CMU') drawBrickVeneer();
  if (assembly === 'Stone veneer') drawStoneVeneer();
  drawCracks();

  // wall outline
  noFill();
  stroke('dimgray');
  strokeWeight(2);
  rect(X(0), Y(WALL_H), L.ww, L.wh);
}

function drawBrickVeneer() {
  const j = max(1.5, 0.3 * L.s), bh = 8 / 3, mc = mortarColor();
  const x0 = X(CUT_X), w = X(WALL_W) - x0;
  noStroke();
  fill(mc);
  rect(x0, Y(WALL_H), w, L.wh);
  for (let r = 0; r < 21; r++) {
    const y = r * bh;
    for (let b = (r % 2 ? CUT_X - 4 : CUT_X); b < WALL_W; b += 8) {
      let a = max(b, CUT_X), e = min(b + 8, WALL_W);
      if (b < EJ_X && e > EJ_X) e = EJ_X - 0.75;
      if (a < EJ_X + 0.75 && e > EJ_X + 0.75 && a > EJ_X - 0.75) a = EJ_X + 0.75;
      if (e - a < 0.5 || (a > EJ_X - 0.75 && e < EJ_X + 0.75)) continue;
      fill('sienna');
      rect(X(a) + 0.5, Y(y + bh) + j / 2, (e - a) * L.s - 1, bh * L.s - j);
    }
  }
  fill('steelblue');
  rect(X(EJ_X - 0.75), Y(WALL_H), 1.5 * L.s, L.wh);
  // ties
  fill('black');
  [60, 84].forEach(tx => [16, 32, 48].forEach(ty => rect(X(tx) - 3, Y(ty) - 3, 6, 6)));
  stroke('black');
  strokeWeight(1);
  line(X(CUT_X), Y(WALL_H), X(CUT_X), Y(0));
}

function drawStoneVeneer() {
  const mc = mortarColor();
  noStroke();
  fill(mc);
  rect(X(CUT_X), Y(WALL_H), X(WALL_W) - X(CUT_X), L.wh);
  let y = 0;
  STONE_ROWS.forEach((row, ri) => {
    let x = CUT_X;
    row.w.forEach(sw => {
      fill('lightslategray');
      stroke('dimgray');
      strokeWeight(1);
      rect(X(x) + 1.5, Y(y + row.h) + 1.5, sw * L.s - 3, row.h * L.s - 3);
      x += sw;
    });
    y += row.h;
  });
  noStroke();
  fill('black');
  [60, 84].forEach(tx => [16, 32, 48].forEach(ty => rect(X(tx) - 3, Y(ty) - 3, 6, 6)));
  stroke('black');
  strokeWeight(1);
  line(X(CUT_X), Y(WALL_H), X(CUT_X), Y(0));
}

// cracks follow the bed joints at mid-height; the veneer is left uncracked (it is tied to the backup)
function drawCracks() {
  const st = wallState(windSlider.value());
  if (st === 'uncracked') return;
  const xEnd = isVeneer() ? CUT_X : WALL_W;
  const ys = (st === 'failed') ? [24] : (st === 'cracked' ? [16, 24, 32] : [8, 16, 24, 32, 40]);
  stroke('red');
  strokeWeight(st === 'failed' ? 5 : (st === 'yield' ? 3 : 2));
  ys.forEach(cy => {
    let px = X(1), py = Y(cy);
    for (let x = 2; x <= xEnd; x += 4) {
      const nx = X(x), ny = Y(cy) + ((x / 4) % 2 ? -2 : 2);
      line(px, py, nx, ny);
      px = nx; py = ny;
    }
  });
}

// ---- Hit testing in wall coordinates ----
function partAt(mx, my) {
  const xin = (mx - L.ox) / L.s, yin = WALL_H - (my - L.oy) / L.s;
  if (xin < 0 || xin > WALL_W || yin < 0 || yin > WALL_H) return null;
  const tol = 3 / L.s;
  const full = (x0, y0, x1, y1) => [x0, y0, x1, y1];
  if (abs(xin - CJ_X) <= max(CJ_G, tol)) return { key: 'control', rect: full(CJ_X - CJ_G, 0, CJ_X + CJ_G, WALL_H) };
  const inVeneer = isVeneer() && xin >= CUT_X;
  if (inVeneer) {
    if (assembly === 'Brick veneer on CMU' && abs(xin - EJ_X) <= max(0.75, tol)) return { key: 'expansion', rect: full(EJ_X - 0.75, 0, EJ_X + 0.75, WALL_H) };
    for (const tx of [60, 84]) for (const ty of JR_Y) if (abs(xin - tx) < 4 && abs(yin - ty) < 4) return { key: 'tie', rect: full(tx - 2, ty - 2, tx + 2, ty + 2) };
    if (assembly === 'Stone veneer') {
      let y = 0;
      for (const row of STONE_ROWS) {
        if (yin >= y && yin < y + row.h) {
          let x = CUT_X;
          for (const sw of row.w) {
            if (xin >= x && xin < x + sw) {
              const inner = xin > x + 0.8 && xin < x + sw - 0.8 && yin > y + 0.8 && yin < y + row.h - 0.8;
              return inner ? { key: 'stone', rect: full(x, y, x + sw, y + row.h) } : { key: 'mortar', rect: full(x, y, x + sw, y + row.h) };
            }
            x += sw;
          }
        }
        y += row.h;
      }
      return null;
    }
    const r = floor(yin / (8 / 3)), yc = yin - r * 8 / 3;
    const bx = (r % 2 ? CUT_X - 4 : CUT_X);
    const xc = ((xin - bx) % 8 + 8) % 8;
    const bstart = xin - xc;
    const edge = yc < 0.45 || yc > 8 / 3 - 0.45 || xc < 0.45 || xc > 7.55;
    return edge ? { key: 'mortar', rect: full(max(bstart, CUT_X), r * 8 / 3, min(bstart + 8, WALL_W), (r + 1) * 8 / 3) } : { key: 'brick', rect: full(max(bstart, CUT_X), r * 8 / 3, min(bstart + 8, WALL_W), (r + 1) * 8 / 3) };
  }
  const c = min(COURSES - 1, floor(yin / 8)), yc = yin - c * 8;
  const j = jointIn();
  const cut = xin < CUT_X;
  if (isReinforced()) {
    if (JR_Y.some(jy => abs(yin - jy) < max(0.8, tol))) return { key: 'jreinf', rect: full(0, yin - 0.7, WALL_W, yin + 0.7) };
    if (cut) for (const bx of BAR_X) if (abs(xin - bx) < max(1.2, tol)) return { key: 'bar', rect: full(bx - 0.6, 0, bx + 0.6, WALL_H) };
    if (c === COURSES - 1 && abs(yin - 52) < max(1.2, tol) && (cut || !isVeneer())) return { key: 'bar', rect: full(0, 51, WALL_W, 53) };
  }
  // mortar joints
  const unit = courseUnits(c).find(u => xin >= u[0] - 0.001 && xin <= u[1] + 0.001);
  const nearHead = unit && (xin - unit[0] < j / 2 || unit[1] - xin < j / 2);
  if (yc < j / 2 || yc > 8 - j / 2 || nearHead) return { key: 'mortar', rect: full(unit ? unit[0] : xin - 1, c * 8, unit ? unit[1] : xin + 1, c * 8 + 8) };
  if (cut) {
    for (let k = 0; k < 12; k++) {
      const cx = cellCenter(k);
      if (abs(xin - cx) <= CORE_W / 2) {
        const g = cellGrouted(k, c);
        if (g && c === COURSES - 1 && isReinforced()) return { key: 'bondbeam', rect: full(cx - CORE_W / 2, c * 8, cx + CORE_W / 2, c * 8 + 8) };
        return { key: g ? 'grout' : 'cell', rect: full(cx - CORE_W / 2, c * 8, cx + CORE_W / 2, c * 8 + 8) };
      }
    }
  } else if (c === COURSES - 1 && isReinforced() && !isVeneer()) {
    return { key: 'bondbeam', rect: full(CUT_X, c * 8, WALL_W, c * 8 + 8) };
  }
  return { key: 'block', rect: full(unit ? unit[0] : xin - 8, c * 8, unit ? unit[1] : xin + 8, c * 8 + 8) };
}

function drawHover() {
  if (!hoverPart) return;
  const r = hoverPart.rect;
  noFill();
  stroke('navy');
  strokeWeight(3);
  rect(X(r[0]), Y(r[3]), (r[2] - r[0]) * L.s, (r[3] - r[1]) * L.s);
}

function drawTooltip() {
  if (!hoverPart) return;
  const name = PARTS[hoverPart.key].name;
  textSize(14);
  const w = textWidth(name) + 16, h = 26;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 240);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(name, tx + 8, ty + h / 2);
}

function mousePressed() {
  if (hoverPart && mouseY < drawHeight) selPart = hoverPart.key;
}

// ---- Legend: every color is named ----
function drawLegend() {
  const items = [['lightgray', 'Block'], [mortarColor(), 'Mortar'], ['gray', 'Grout'], ['white', 'Empty core'], ['black', 'Steel']];
  if (assembly === 'Brick veneer on CMU') items.push(['sienna', 'Brick']);
  if (assembly === 'Stone veneer') items.push(['lightslategray', 'Stone']);
  items.push(['steelblue', 'Sealant / filler']);
  textSize(14);
  let x = L.ox, y = L.legendY;
  const maxX = L.narrow ? canvasWidth - 8 : L.ox + L.ww + 4;
  items.forEach(it => {
    const w = 18 + textWidth(it[1]) + 12;
    if (x + w > maxX) { x = L.ox; y += 20; }
    stroke('dimgray');
    strokeWeight(1);
    fill(it[0]);
    rect(x, y + 2, 14, 14);
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    text(it[1], x + 18, y + 1);
    x += w;
  });
}

// ---- Cards ----
function card(x, y, w, h, title) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  textSize(14);
  text(title, x + 8, y + 4);
}

function stateInfo(w) {
  const c = capacities(), st = wallState(w);
  const via = isVeneer() ? 'The veneer ties pass the wind to the CMU backup. ' : '';
  const m = mortarSel.value();
  const grouted = groutCheck.checked();
  if (st === 'failed') return { label: 'FAILED: sudden brittle crack', col: 'crimson', txt: 'A horizontal crack opened along a bed joint at about ' + c.wcr + ' psf. With no steel to carry the tension, the crack runs through the wall at once, with no warning.' };
  if (st === 'yield') return { label: 'BARS YIELDING: wall bending a lot', col: 'crimson', txt: via + 'Many cracks are open and the bars have reached their yield strength at about ' + c.wn + ' psf. The wall bends visibly before it fails, which is a ductile failure with warning.' };
  if (st === 'cracked') return { label: 'CRACKED: bars holding', col: 'darkorange', txt: via + 'The masonry cracked at about ' + c.wcr + ' psf, but the vertical bars carry the tension across the cracks and keep the wall standing up to about ' + c.wn + ' psf.' };
  let t = via + 'No cracks yet. ';
  t += isReinforced() ? 'The bars stay idle until the masonry cracks at about ' + c.wcr + ' psf (Type ' + m + (grouted ? ', grouted' : ', other cells empty') + ').' :
    'Unreinforced masonry is weak in tension and cracks at about ' + c.wcr + ' psf (Type ' + m + (grouted ? ', grouted' : ', ungrouted') + ').' + (grouted ? ' Grout thickens the section, but it adds no steel.' : '');
  return { label: 'UNCRACKED', col: 'seagreen', txt: t };
}

function drawTestPanels() {
  const w = windSlider.value();
  const si = stateInfo(w), c = capacities();
  drawSideView(w);

  // test-result card
  card(L.p1.x, L.p1.y, L.p1.w, L.p1.h, 'Wind test: ' + w + ' psf on an 8 ft high wall (illustrative)');
  noStroke();
  fill(si.col);
  textAlign(LEFT, TOP);
  textSize(16);
  text(si.label, L.p1.x + 8, L.p1.y + 22, L.p1.w - 16, 22);
  fill('black');
  textSize(14);
  text(si.txt, L.p1.x + 8, L.p1.y + 44, L.p1.w - 16, L.p1.h - 48);

  // mortar and capacity strip on the sketch card (wide) or inside p1 (narrow)
  const m = MORTAR[mortarSel.value()];
  const strengthTxt = 'Mortar Type ' + mortarSel.value() + ': at least ' + nf(m.psi, 0, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' psi in compression.\nCracks at about ' + c.wcr + ' psf' + (c.wn ? '; bars yield at about ' + c.wn + ' psf.' : '; no steel to carry load after.');
  const tensionTxt = 'The far face is in tension. Red marks a crack.';
  if (!L.narrow) {
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text(strengthTxt + '\n' + tensionTxt, L.sk.x + 150, L.sk.y + 24, L.sk.w - 158, L.sk.h - 30);
  }
  drawInfoCard(L.p2, L.narrow ? strengthTxt + '\n' + tensionTxt : '');
}

function drawInfoCard(p, extra) {
  card(p.x, p.y, p.w, p.h, selPart ? 'Selected part' : 'Parts');
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  if (!selPart) {
    textSize(14);
    text('Hover a part of the wall to highlight it and see its name. Click it to read its function, size, and governing standard.' + (extra ? '\n' + extra : ''), p.x + 8, p.y + 24, p.w - 16, p.h - 28);
    return;
  }
  const pt = PARTS[selPart];
  textSize(16);
  fill('navy');
  text(pt.name, p.x + 8, p.y + 22, p.w - 16, 22);
  fill('black');
  textSize(14);
  text('Function: ' + pt.fn + '\nSize: ' + pt.size + '\nStandard: ' + pt.std, p.x + 8, p.y + 44, p.w - 16, p.h - 48);
}

// side view of a vertical strip of wall, bending under wind
function drawSideView(w) {
  const sk = L.sk, st = wallState(w);
  card(sk.x, sk.y, L.narrow ? sk.w : 140, sk.h, 'Side view');
  const c = capacities();
  const top = sk.y + 40, bot = sk.y + sk.h - 14, hh = bot - top;
  const cx = sk.x + (L.narrow ? sk.w : 140) * 0.55;
  const t = 14, gap = 4, vt = 8;       // CMU thickness, air space, veneer thickness (px, exaggerated)
  let delta;
  if (st === 'uncracked') delta = 8 * w / max(c.wcr, 1);
  else if (st === 'failed') delta = 24;
  else if (st === 'cracked') delta = 8 + 8 * (w - c.wcr) / max(c.wn - c.wcr, 1);
  else delta = 16 + min(10, (w - c.wn) / 10);
  const kinked = st !== 'uncracked';
  const off = f => delta * (kinked ? 1 - abs(2 * f - 1) : sin(PI * f));
  // wall as a polygon (wind pushes toward +x, the far face stretches)
  noStroke();
  fill('lightgray');
  stroke('dimgray');
  strokeWeight(1);
  beginShape();
  for (let i = 0; i <= 20; i++) { const f = i / 20; vertex(cx - t / 2 + off(f), bot - hh * f); }
  for (let i = 20; i >= 0; i--) { const f = i / 20; vertex(cx + t / 2 + off(f), bot - hh * f); }
  endShape(CLOSE);
  if (isVeneer()) {
    fill(assembly === 'Stone veneer' ? 'lightslategray' : 'sienna');
    beginShape();
    for (let i = 0; i <= 20; i++) { const f = i / 20; vertex(cx - t / 2 - gap - vt + off(f), bot - hh * f); }
    for (let i = 20; i >= 0; i--) { const f = i / 20; vertex(cx - t / 2 - gap + off(f), bot - hh * f); }
    endShape(CLOSE);
  }
  // crack wedge on the far (tension) face at mid height
  if (kinked) {
    const mx = cx + t / 2 + delta;
    fill('red');
    noStroke();
    const open = st === 'failed' ? 9 : (st === 'cracked' ? 2 : 4);
    triangle(mx, top + hh / 2 - open, mx, top + hh / 2 + open, mx - t * 0.55, top + hh / 2);
  }
  // supports
  stroke('dimgray');
  strokeWeight(2);
  line(cx - 20, top, cx + 20, top);
  line(cx - 20, bot, cx + 20, bot);
  // wind arrows
  const len = 6 + 34 * w / 350;
  if (w > 0) {
    for (let i = 1; i <= 4; i++) arrowTo(cx - t / 2 - (isVeneer() ? gap + vt : 0) - 2 + off(1 - i / 5) - len, top + hh * i / 5, len, 'steelblue');
  }
  noStroke();
  fill('black');
  textSize(14);
  textAlign(CENTER, TOP);
  text('wind ' + w + ' psf', cx, sk.y + 22);
}

function arrowTo(x, y, len, col) {
  stroke(col);
  strokeWeight(2);
  line(x, y, x + len, y);
  noStroke();
  fill(col);
  triangle(x + len, y, x + len - 6, y - 4, x + len - 6, y + 4);
}

// ---- Count the units ----
function drawCountPanel() {
  const Wf = lengthSlider.value(), Hf = heightSlider.value(), A = Wf * Hf;
  const units = ceil(A * 1.125 - 1e-9);
  const bricks = ceil(A * 6.75 - 1e-9), bricks5 = ceil(A * 6.75 * 1.05 - 1e-9);
  let px, py, pw, ph;
  if (L.narrow) { px = L.p1.x; py = L.p1.y; pw = L.p1.w; ph = L.p2.y + L.p2.h - L.p1.y; } else { px = L.sk.x; py = L.sk.y; pw = L.sk.w; ph = L.p2.y + L.p2.h - L.sk.y; }
  card(px, py, pw, ph, 'Unit count for a ' + Wf + ' ft by ' + Hf + ' ft wall');
  // scaled outline
  const bw = L.narrow ? 90 : 130, bh = L.narrow ? 70 : 100;
  const k = min(bw / Wf, bh / Hf);
  const ox = px + 10, oy = py + 26;
  stroke('dimgray');
  strokeWeight(2);
  fill('lightgray');
  rect(ox, oy, Wf * k, Hf * k);
  stroke('gray');
  strokeWeight(1);
  if (k * 16 / 12 >= 5) {
    for (let x = 16 / 12; x < Wf; x += 16 / 12) line(ox + x * k, oy, ox + x * k, oy + Hf * k);
    for (let y = 8 / 12; y < Hf; y += 8 / 12) line(ox, oy + y * k, ox + Wf * k, oy + y * k);
  }
  noStroke();
  fill('black');
  textSize(14);
  textAlign(LEFT, TOP);
  text(Wf + ' ft × ' + Hf + ' ft = ' + A + ' ft²', ox, oy + Hf * k + 6);
  const tx = px + 8, tw = pw - 16, ty = oy + max(Hf * k, 0) + 30;
  let t = 'CMU: 8 × 16 in. face with joint = 0.889 ft², so 1.125 units per ft².\n' + A + ' × 1.125 = ' + units + ' blocks.';
  if (assembly === 'Brick veneer on CMU') t += '\nBrick: 144 / 21.3 in² = 6.75 bricks per ft².\n' + A + ' × 6.75 = ' + nf(bricks, 0, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '; with a 5% allowance, about ' + nf(bricks5, 0, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' bricks.';
  else if (assembly === 'Stone veneer') t += '\nStone: ' + A + ' ft² of veneer. At an assumed 3 in. thick and 160 pcf, that is 40 psf, or ' + nf(A * 40, 0, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' lb on the anchors.';
  else t += '\nWeight: ungrouted about 55 psf, so ' + nf(A * 55, 0, 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' lb; fully grouted roughly 85 psf (illustrative).';
  textSize(14);
  text(t, tx, ty, tw, py + ph - ty - 4);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y0 = drawHeight;
  if (countMode) {
    text('Wall length: ' + lengthSlider.value() + ' ft', 10, y0 + 90);
    text('Wall height: ' + heightSlider.value() + ' ft', 10, y0 + 125);
  } else {
    text('Wind pressure: ' + windSlider.value() + ' psf', 10, y0 + 90);
    text('Mortar type:', 10, y0 + 125);
  }
  if (canvasWidth >= 620 && !countMode) {
    textSize(14);
    fill('dimgray');
    text('Typical design wind pressures are roughly 20 to 40 psf (illustrative).', 10, y0 + 56);
  }
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
