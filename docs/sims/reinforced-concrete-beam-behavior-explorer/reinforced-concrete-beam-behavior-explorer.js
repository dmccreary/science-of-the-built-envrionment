// Reinforced Concrete Beam Behavior Explorer MicroSim - load a 12 x 20 in. concrete beam to failure: plain, reinforced, wrongly reinforced, or prestressed
// CANVAS_HEIGHT: 670
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 520;
let controlHeight = 150; // four rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 150;
let defaultTextSize = 16;

// ---- Beam data: the 12 in. by 20 in. beam of the Chapter 8 worked example (illustrative, self-weight ignored) ----
const B = 12, H = 20, D = 17.5;          // width, depth, depth to the steel (in.)
const AS = 1.2, BAR_AREA = 0.6, FY = 60; // two #7 bars (0.60 in² each, bar table), Grade 60 (ksi)
const SPAN = 240, CANT = 120;            // simple span 20 ft, cantilever 10 ft (in.)
const EC = 3605, IG = 8000, SG = 800;    // concrete modulus (ksi) for f'c = 4,000 psi, gross I (in⁴) and S (in³)
const FR = 0.474;                        // modulus of rupture 7.5 sqrt(f'c), ksi
const MCR = FR * SG;                     // cracking moment, kip-in (31.6 kip-ft)
const KD = 4.56;                         // neutral-axis depth of the cracked section, in.
const MY = AS * FY * (D - KD / 3);       // steel starts to yield, kip-in
const MN = AS * FY * (D - 1.765 / 2);    // nominal moment capacity, kip-in (a = 1.765 in.)
const ICR = 1994;                        // cracked moment of inertia, in⁴
const F_PS = 90, E_PS = 5, A_PS = 0.612, FPS_U = 255;   // prestress force (kips), eccentricity (in.), four 1/2 in. strands, ultimate strand stress (ksi)
const MCR_PS = F_PS * SG / 240 + F_PS * E_PS + MCR;     // cracking moment with prestress, kip-in
const MN_PS = 2000;                      // ultimate moment of the prestressed beam, kip-in
const MATS = ['Plain concrete', 'Rebar at the bottom', 'Rebar at the top (wrong place)', 'Prestressed'];

// ---- State ----
let mat = 'Plain concrete';
let span = 'Simple span';
let barOpen = false;   // infobox for the rebar is open
let hover = null;      // hovered cross-section feature
let G = {};            // geometry for the current frame

// ---- Controls ----
let loadSlider, matRadio, spanSel;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  loadSlider = createSlider(0, 36, 0, 0.1);
  matRadio = createRadio();
  MATS.forEach(m => matRadio.option(m));
  matRadio.selected(mat);
  matRadio.changed(() => { mat = matRadio.value(); barOpen = false; });
  spanSel = createSelect();
  spanSel.option('Simple span');
  spanSel.option('Cantilever');
  spanSel.selected(span);
  spanSel.changed(() => { span = spanSel.value(); barOpen = false; });

  positionControls();
  describe('A side view of a concrete beam, simply supported or a cantilever, with a load arrow, an exaggerated deflected shape, and cracks in the tension zone. Below it an enlarged cross-section shows the neutral axis, the compression zone in red, the tension zone in blue, and the steel. A slider raises the load to failure and radio buttons choose plain concrete, rebar at the bottom, rebar at the top, or prestressed concrete.', LABEL);
}

function sliderWidth() { return max(120, canvasWidth - sliderLeftMargin - 20); }

function positionControls() {
  const y0 = drawHeight, wide = canvasWidth >= 700;
  loadSlider.position(sliderLeftMargin, y0 + 8);
  loadSlider.size(sliderWidth());
  matRadio.position(10, y0 + 40);
  matRadio.style('width', (canvasWidth - 20) + 'px');
  spanSel.position(sliderLeftMargin, y0 + (wide ? 77 : 112));
}

// ---- Beam mechanics (illustrative) ----
const isCant = () => span === 'Cantilever';
const momentPerKip = () => isCant() ? CANT : SPAN / 4;    // kip-in per kip of load
const spanLen = () => isCant() ? CANT : SPAN;
// steel is on the tension face when it is where the bending stretches the beam
function steelOnTension() {
  if (mat === 'Prestressed') return true;
  if (mat === 'Rebar at the bottom') return !isCant();
  if (mat === 'Rebar at the top (wrong place)') return isCant();
  return false;
}
const hasSteel = () => mat !== 'Plain concrete';
const tensionTop = () => isCant();   // the tension face is the top for a cantilever

function capacities() {
  const mk = momentPerKip();
  if (mat === 'Prestressed') return { cr: MCR_PS / mk, y: 0.96 * MN_PS / mk, n: MN_PS / mk, steel: true };
  if (steelOnTension()) return { cr: MCR / mk, y: MY / mk, n: MN / mk, steel: true };
  return { cr: MCR / mk, y: null, n: null, steel: false };
}

function stateOf(P) {
  const c = capacities();
  if (!c.steel) return P >= c.cr ? 'failed' : 'uncracked';
  if (P >= c.n) return 'failed';
  if (P >= c.y) return 'yield';
  return P >= c.cr ? 'cracked' : 'uncracked';
}

// midspan (or tip) deflection in inches, positive down; negative is camber
function deflection(P) {
  const c = capacities(), mk = momentPerKip(), L = spanLen();
  const k = isCant() ? L * L * L / (3 * EC) : L * L * L / (48 * EC);
  const camber = mat === 'Prestressed' ? F_PS * E_PS * L * L / ((isCant() ? 2 : 8) * EC * IG) : 0;
  const mcr = mat === 'Prestressed' ? MCR_PS : MCR;
  const icr = mat === 'Prestressed' ? 3200 : ICR;
  const eff = M => { if (M <= mcr || !c.steel) return IG; const r = Math.pow(mcr / M, 3); return r * IG + (1 - r) * icr; };
  const at = p => k * p / eff(p * mk);
  if (c.steel && P > c.y) return at(c.y) - camber + min(1, (P - c.y) / (c.n - c.y)) * 1.5 + (P >= c.n ? 1 : 0);
  return at(P) - camber;
}

function naDepth(st) {
  if (st === 'uncracked') return H / 2;
  if (st === 'cracked') return mat === 'Prestressed' ? 6 : KD;
  return 3.8;
}

// stresses (ksi, tension positive) at the compression face and the tension face before cracking
function faceStresses(P) {
  const m = P * momentPerKip() / SG;
  if (mat === 'Prestressed') return { c: -m + (-F_PS / 240 + F_PS * E_PS / SG), t: m - (F_PS / 240 + F_PS * E_PS / SG) };
  return { c: -m, t: m };
}

// the two stress zones, measured from the compression face: kind1 for depth d1 (in.), then kind2
function zoneInfo(P, st) {
  if (st === 'uncracked') {
    const f = faceStresses(P);
    if (f.c <= 0 && f.t >= 0) return { k1: 'comp', d1: f.t - f.c < 1e-9 ? H / 2 : H * (-f.c) / (f.t - f.c), k2: 'tens' };
    if (f.c > 0 && f.t < 0) return { k1: 'tens', d1: H * f.c / (f.c - f.t), k2: 'comp' };
    return { k1: 'comp', d1: H, k2: 'tens' };
  }
  return { k1: 'comp', d1: naDepth(st), k2: 'tens' };
}
const zoneColor = (k, st) => k === 'comp' ? 'lightcoral' : (st === 'uncracked' ? 'lightskyblue' : 'aliceblue');

// force in the steel (kips) at load P
function steelForce(P, st) {
  const M = P * momentPerKip();
  if (mat === 'Prestressed') {
    if (st === 'uncracked') return F_PS;
    const MN_ = MN_PS, t = constrain((M - MCR_PS) / (MN_ - MCR_PS), 0, 1);
    return F_PS + (A_PS * FPS_U - F_PS) * t;
  }
  if (st === 'uncracked') return 8.04 * (M * 7.5 / IG) * AS * (steelOnTension() ? 1 : -1);
  if (st === 'cracked') return M / (D - KD / 3);
  return AS * FY;
}

// ---- Draw ----
function draw() {
  updateCanvasSize();
  computeGeometry();

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
  text('Reinforced Concrete Beam Behavior Explorer', 0, 8, canvasWidth, 80);

  const P = loadSlider.value(), st = stateOf(P);
  hover = detectHover(P, st);
  drawBeam(P, st);
  drawSection(P, st);
  drawStress(P, st);
  drawPanel(P, st);
  drawControlLabels(P);
  drawTooltip();
}

function computeGeometry() {
  const narrow = canvasWidth < 560;
  const s = narrow ? 6 : 9.5;                   // px per inch in the cross-section
  G = { narrow, s, cx: 34, cy: narrow ? 266 : 300, cw: B * s, ch: H * s, yt: narrow ? 128 : 112 };
  G.sx = G.cx + G.cw + 34;                       // stress diagram
  G.sw = narrow ? 52 : 70;
  G.px = G.sx + G.sw + 12;                       // text panel (wide) or numbers block (narrow)
  G.pw = canvasWidth - G.px - 8;
}

// ---- Side view ----
function drawBeam(P, st) {
  const cant = isCant();
  const xa = cant ? 40 : 48, xb = canvasWidth - (cant ? 24 : 48);
  const len = xb - xa;
  const dpx = constrain(len / 9, 34, 66);
  const yt = G.yt;
  const dl = deflection(P);
  const dpxl = constrain(30 * Math.pow(abs(dl), 0.6) * (dl < 0 ? -1 : 1), -30, 44);
  const kinked = st === 'failed' || st === 'yield';
  const shape = t => cant ? (kinked ? t : t * t * (3 - t) / 2) : (kinked ? 1 - abs(2 * t - 1) : sin(PI * t));
  const dy = t => dpxl * shape(t);
  const N = 40;

  // beam body
  noStroke();
  fill('lightgray');
  stroke('dimgray');
  strokeWeight(1);
  beginShape();
  for (let i = 0; i <= N; i++) { const t = i / N; vertex(xa + len * t, yt + dy(t)); }
  for (let i = N; i >= 0; i--) { const t = i / N; vertex(xa + len * t, yt + dpx + dy(t)); }
  endShape(CLOSE);

  // compression (red) and tension (blue) bands along the beam
  const zi = zoneInfo(P, st), topComp = !tensionTop();
  noStroke();
  const band1 = min(zi.d1 / H * dpx, dpx * 0.45), band2 = dpx * 0.28;
  const col = k => k === 'comp' ? [255, 120, 120, 90] : [100, 140, 255, 90];
  for (let i = 0; i < N; i++) {
    const t0 = i / N, x0 = xa + len * t0, w1 = len / N + 0.5;
    fill(...col(zi.k1));
    rect(x0, topComp ? yt + dy(t0) : yt + dpx - band1 + dy(t0), w1, band1);
    fill(...col(zi.k2));
    rect(x0, topComp ? yt + dpx - band2 + dy(t0) : yt + dy(t0), w1, band2);
  }

  // steel
  if (hasSteel()) {
    stroke('dimgray');
    strokeWeight(4);
    noFill();
    const tensTop = tensionTop();
    beginShape();
    for (let i = 0; i <= N; i++) {
      const t = i / N;
      let yy;
      if (mat === 'Prestressed') {
        // draped tendon: at the centre of the section at the ends, near the tension face at midspan (simple) or the support (cantilever)
        const f = cant ? 1 - t : 1 - pow(2 * t - 1, 2);
        const near = tensTop ? yt + dpx * 0.2 : yt + dpx * 0.8;
        yy = lerp(yt + dpx / 2, near, f);
      } else if (mat === 'Rebar at the top (wrong place)') yy = yt + dpx * 0.12;
      else yy = yt + dpx * 0.88;
      vertex(xa + len * t, yy + dy(t));
    }
    endShape();
    if (mat === 'Prestressed') {
      noStroke();
      fill('black');
      rect(xa - 4, yt + dpx / 2 - 6 + dy(0), 5, 12);
      rect(xb - 1, yt + dpx / 2 - 6 + dy(1), 5, 12);
    }
  }

  // cracks
  drawCracks(P, st, xa, len, yt, dpx, dy);

  // supports
  noStroke();
  fill('dimgray');
  if (cant) {
    rect(xa - 26, yt - 12, 26, dpx + 40);
    stroke('black');
    strokeWeight(1);
    for (let k = 0; k < 6; k++) line(xa - 26, yt - 6 + k * 14, xa - 36, yt + 2 + k * 14);
  } else {
    triangle(xa, yt + dpx, xa - 14, yt + dpx + 18, xa + 14, yt + dpx + 18);
    triangle(xb, yt + dpx, xb - 14, yt + dpx + 18, xb + 14, yt + dpx + 18);
  }

  // load arrow
  const lx = cant ? xb - 12 : xa + len / 2;
  const ly = yt + dy(cant ? 1 : 0.5);
  const aw = 2 + 5 * P / 36;
  stroke('crimson');
  strokeWeight(aw);
  if (P > 0) {
    line(lx, ly - 52, lx, ly - 6);
    noStroke();
    fill('crimson');
    triangle(lx, ly - 1, lx - 7 - aw, ly - 14, lx + 7 + aw, ly - 14);
  }
  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, BOTTOM);
  const lbl = 'P = ' + nf(P, 0, 1) + ' kips' + (cant ? ' (free end)' : ' at midspan'), lw = textWidth(lbl);
  text(lbl, constrain(lx, lw / 2 + 6, canvasWidth - lw / 2 - 6), ly - 54);

  // beam notes
  textSize(14);
  textAlign(LEFT, TOP);
  fill('dimgray');
  text((cant ? 'Cantilever, 10 ft' : 'Simple span, 20 ft') + (G.narrow ? ' (deflection exaggerated)' : ' (not to scale; deflection greatly exaggerated)'), 10, yt + dpx + (G.narrow ? 56 : 50));
  // zone signs along the beam, away from the load arrow
  fill('black');
  const lt = cant ? 0.4 : 0.25, lxp = xa + len * lt, lyc = dy(lt);
  const cYY = topComp ? yt + dpx * 0.12 + lyc : yt + dpx * 0.88 + lyc, tYY = topComp ? yt + dpx * 0.88 + lyc : yt + dpx * 0.12 + lyc;
  const nm = k => k === 'comp' ? ['−', 'compression'] : ['+', 'tension'];
  textAlign(CENTER, CENTER);
  textSize(16);
  text(nm(zi.k1)[0], lxp - 36, cYY);
  text(nm(zi.k2)[0], lxp - 36, tYY);
  textSize(12);
  textAlign(LEFT, CENTER);
  text(nm(zi.k1)[1], lxp - 26, cYY);
  text(nm(zi.k2)[1], lxp - 26, tYY);
}

function drawCracks(P, st, xa, len, yt, dpx, dy) {
  const c = capacities(), cant = isCant(), L = spanLen();
  const mcrK = mat === 'Prestressed' ? MCR_PS : MCR;
  stroke('black');
  if (st === 'failed' && !c.steel) {
    // sudden fracture through the full depth
    strokeWeight(5);
    const t = cant ? 0.03 : 0.5, x = xa + len * t;
    line(x, yt + dy(t), x + 4, yt + dpx * 0.5 + dy(t));
    line(x + 4, yt + dpx * 0.5 + dy(t), x - 3, yt + dpx + dy(t));
    return;
  }
  if (st === 'uncracked' || !c.steel) return;
  // cracks form wherever the moment exceeds the cracking moment
  const M = x => cant ? P * (L - x * L) : P * min(x * L, L - x * L) / 2;
  strokeWeight(st === 'yield' || st === 'failed' ? 3 : 1.5);
  const na = naDepth(st) / H, tens = 1 - na;
  const top = tensionTop();
  for (let x = 0.02; x < 0.99; x += 10 / L) {
    const m = M(x);
    if (m < mcrK) continue;
    const hgt = dpx * tens * constrain(0.45 + 0.6 * (m - mcrK) / max(1, M(cant ? 0 : 0.5) - mcrK), 0.45, 1);
    const px = xa + len * x, base = (top ? yt : yt + dpx) + dy(x);
    line(px, base, px + (x < 0.5 && !cant ? 3 : -2), top ? base + hgt : base - hgt);
  }
  if (st === 'failed') {
    // concrete crushed in the compression zone at the point of maximum moment
    stroke('red');
    strokeWeight(2);
    const x = xa + len * (cant ? 0.03 : 0.5), base = (tensionTop() ? yt + dpx : yt) + dy(cant ? 0.03 : 0.5);
    const sgn = tensionTop() ? -1 : 1;
    for (let k = -2; k <= 2; k++) line(x + k * 6, base, x + k * 6 + 4, base + sgn * 9);
  }
}

// ---- Cross-section ----
function barPositions() {
  if (!hasSteel()) return [];
  const s = G.s, top = (mat === 'Rebar at the top (wrong place)') ? true : (mat === 'Prestressed' ? tensionTop() : false);
  if (mat === 'Prestressed') {
    const yy = top ? G.cy + 5 * s : G.cy + G.ch - 5 * s;
    return [2, 4.67, 7.33, 10].map(x => ({ x: G.cx + x * s, y: yy, r: 0.32 * s }));
  }
  const yy = top ? G.cy + 2.5 * s : G.cy + G.ch - 2.5 * s;
  return [3, 9].map(x => ({ x: G.cx + x * s, y: yy, r: max(3.5, 0.4375 * s) }));
}

function drawSection(P, st) {
  const { cx, cy, cw, ch, s } = G;
  const top = !tensionTop();                    // true when the compression face is the top
  const zi = zoneInfo(P, st), d1 = min(zi.d1, H) * s, d2 = ch - d1;
  const z1Top = top ? cy : cy + ch - d1, z2Top = top ? cy + d1 : cy;
  const na = d1, cH = d1, cTop = z1Top, tH = d2, tTop = z2Top;
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Cross-section', cx - 20, cy - 24);
  // zones
  stroke('dimgray');
  strokeWeight(1);
  fill(zoneColor(zi.k1, st));
  rect(cx, z1Top, cw, d1);
  fill(zoneColor(zi.k2, st));
  rect(cx, z2Top, cw, d2);
  // cracks in the tension zone
  if (st === 'cracked' || st === 'yield' || (st === 'failed' && hasSteel())) {
    stroke('black');
    strokeWeight(2);
    [0.2, 0.5, 0.8].forEach(f => { const x = cx + cw * f; if (top) line(x, cy + ch, x + 2, cy + na + 4); else line(x, cy, x + 2, cy + ch - na - 4); });
  }
  if (st === 'failed' && !hasSteel() || st === 'failed' && !steelOnTension()) {
    stroke('black');
    strokeWeight(4);
    line(cx + cw * 0.5, cy, cx + cw * 0.5 + 3, cy + ch * 0.5);
    line(cx + cw * 0.5 + 3, cy + ch * 0.5, cx + cw * 0.5 - 2, cy + ch);
  }
  // neutral axis (absent when the whole section is squeezed)
  const nay = top ? cy + na : cy + ch - na;
  const hasNA = d1 < H * s - 1;
  if (hasNA) {
    stroke('black');
    strokeWeight(2);
    drawingContext.setLineDash([6, 4]);
    line(cx - 6, nay, cx + cw + 6, nay);
    drawingContext.setLineDash([]);
  }
  // outline
  noFill();
  stroke('black');
  strokeWeight(2);
  rect(cx, cy, cw, ch);
  // signs
  noStroke();
  fill('black');
  textSize(18);
  textAlign(CENTER, CENTER);
  const sg = k => k === 'comp' ? '−' : '+';
  if (cH > 22) [0.2, 0.5, 0.8].forEach(f => text(sg(zi.k1), cx + cw * f, z1Top + (top ? min(cH / 2, 24) : cH - min(cH / 2, 24))));
  if (tH > 22 && st === 'uncracked') [0.2, 0.5, 0.8].forEach(f => text(sg(zi.k2), cx + cw * f, top ? z2Top + min(tH / 2, 22) : z2Top + tH - min(tH / 2, 22)));
  textSize(14);
  textAlign(LEFT, CENTER);
  if (hasNA) text('N.A.', cx + cw + 8, nay);
  // steel
  barPositions().forEach(b => { stroke('black'); strokeWeight(1); fill('dimgray'); circle(b.x, b.y, 2 * b.r); });
  // dimensions
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(CENTER, TOP);
  text('12 in.', cx + cw / 2, cy + ch + 4);
  push();
  translate(cx - 6, cy + ch / 2);
  rotate(-HALF_PI);
  text('20 in.', 0, -14);
  pop();
  // hover highlight
  if (hover) {
    noFill();
    stroke('navy');
    strokeWeight(3);
    if (hover.kind === 'bar') circle(hover.x, hover.y, 2 * hover.r + 6);
    else rect(hover.x, hover.y, hover.w, hover.h);
  }
}

function detectHover(P, st) {
  const { cx, cy, cw, ch, s } = G;
  if (mouseX < cx || mouseX > cx + cw || mouseY < cy || mouseY > cy + ch) return null;
  for (const b of barPositions()) if (dist(mouseX, mouseY, b.x, b.y) <= b.r + 4) return { kind: 'bar', x: b.x, y: b.y, r: b.r };
  const top = !tensionTop(), zi = zoneInfo(P, st), d1 = min(zi.d1, H) * s;
  const z1Top = top ? cy : cy + ch - d1;
  if (mouseY >= z1Top && mouseY <= z1Top + d1) return { kind: zi.k1, x: cx, y: z1Top, w: cw, h: d1 };
  return { kind: zi.k2, x: cx, y: top ? cy + d1 : cy, w: cw, h: ch - d1 };
}

function mousePressed() {
  if (mouseY > drawHeight) return;
  barOpen = !!(hover && hover.kind === 'bar');
}

// ---- Stress diagram next to the cross-section (a sketch; before cracking the widths follow the stress values) ----
function stressShape(x, y1, s1, y2, s2, k) {
  // linear stress from (y1, s1) to (y2, s2); split at the zero crossing so each part is colored by its sign
  const col = v => v <= 0 ? 'lightcoral' : 'lightskyblue';
  stroke('dimgray');
  strokeWeight(1);
  if (s1 * s2 >= 0) {
    fill(col(s1 + s2));
    quad(x, y1, x + s1 * k, y1, x + s2 * k, y2, x, y2);
  } else {
    const ym = y1 + (y2 - y1) * s1 / (s1 - s2);
    fill(col(s1));
    triangle(x, y1, x + s1 * k, y1, x, ym);
    fill(col(s2));
    triangle(x, ym, x + s2 * k, y2, x, y2);
  }
}

function drawStress(P, st) {
  const { cy, ch, s, sx, sw } = G;
  const top = !tensionTop(), cface = top ? cy : cy + ch, tface = top ? cy + ch : cy;
  noStroke();
  fill('dimgray');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Stress', sx - 8, cy - 24);
  const base = sx + sw * 0.45;
  if (st === 'uncracked') {
    const f = faceStresses(P), k = sw * 0.5;
    stressShape(base, cface, f.c, tface, f.t, k);
  } else {
    const zi = zoneInfo(P, st), nay = top ? cy + zi.d1 * s : cy + ch - zi.d1 * s, cmax = sw * 0.5;
    fill('lightcoral');
    stroke('dimgray');
    strokeWeight(1);
    triangle(base, nay, base - cmax, cface, base, cface);
    if (hasSteel() && steelOnTension()) {
      // tension carried by the steel: arrow at the bar level
      const by = mat === 'Prestressed' ? (top ? cy + ch - 5 * s : cy + 5 * s) : (top ? cy + ch - 2.5 * s : cy + 2.5 * s);
      stroke('royalblue');
      strokeWeight(3);
      line(base, by, base + sw * 0.5, by);
      noStroke();
      fill('royalblue');
      triangle(base + sw * 0.5 + 6, by, base + sw * 0.5 - 2, by - 5, base + sw * 0.5 - 2, by + 5);
      textSize(14);
      textAlign(LEFT, CENTER);
      text('T', base + sw * 0.5 + 8, by);
    }
    noStroke();
    fill('black');
    textSize(14);
    textAlign(CENTER, CENTER);
    text('C', base - cmax - 8, (cface + nay) / 2);
  }
  stroke('black');
  strokeWeight(1);
  line(base, cy, base, cy + ch);
  noStroke();
  fill('black');
  textSize(16);
  textAlign(CENTER, CENTER);
  text('−', base - 14, cy - 8);
  text('+', base + 14, cy - 8);
}

// ---- Text panel ----
function stateText(P, st) {
  const c = capacities(), cant = isCant();
  const right = steelOnTension();
  if (mat === 'Plain concrete') {
    if (st === 'failed') return { label: 'FAILED: sudden brittle fracture', col: 'crimson', msg: 'Plain concrete has almost no tension strength. At ' + nf(c.cr, 0, 1) + ' kips the tension face cracked, the crack ran straight through the beam, and it broke with no warning.' };
    return { label: 'UNCRACKED', col: 'seagreen', msg: 'The concrete resists the bending, with compression (−) on one face and tension (+) on the other. Plain concrete will crack and fail suddenly at ' + nf(c.cr, 0, 1) + ' kips.' };
  }
  if (!right) {
    const where = cant ? 'bottom' : 'top';
    if (st === 'failed') return { label: 'FAILED: sudden brittle fracture', col: 'crimson', msg: 'The bars sit on the ' + where + ' face, which is in compression. The tension face has no steel, so the beam broke at ' + nf(c.cr, 0, 1) + ' kips, no better than plain concrete.' };
    return { label: 'UNCRACKED (steel in the wrong place)', col: 'darkorange', msg: 'The bars are on the ' + where + ' face, where the concrete is squeezed. They do nothing for tension, so the beam will crack and fail at ' + nf(c.cr, 0, 1) + ' kips.' };
  }
  if (mat === 'Prestressed') {
    if (st === 'uncracked') return { label: 'UNCRACKED' + (P < 11 ? ': upward camber' : ''), col: 'seagreen', msg: 'The strands squeeze the concrete, so the beam arches upward before any load. The load must first overcome that squeeze, so no cracks form until about ' + nf(c.cr, 0, 1) + ' kips.' };
    if (st === 'cracked') return { label: 'CRACKED: strands carry the tension', col: 'darkorange', msg: 'The load finally overcame the prestress and cracks opened. The strands now carry the tension across them.' };
    if (st === 'yield') return { label: 'STRANDS YIELDING: wide cracks', col: 'crimson', msg: 'The strands are at their yield stress and the beam sags and cracks widely. Failure is close.' };
    return { label: 'FAILED: concrete crushed', col: 'crimson', msg: 'The strands stretched until the compression zone crushed, at about ' + nf(c.n, 0, 1) + ' kips.' };
  }
  if (st === 'uncracked') return { label: 'UNCRACKED', col: 'seagreen', msg: 'Concrete carries the bending on its own until the tension face cracks at about ' + nf(c.cr, 0, 1) + ' kips. The steel is nearly idle.' };
  if (st === 'cracked') return { label: 'CRACKED: bars carry the tension', col: 'darkorange', msg: 'Fine cracks opened in the tension zone, but the bars carry the tension across them and hold them tight. The beam still carries far more load.' };
  if (st === 'yield') return { label: 'STEEL YIELDING: wide cracks, large sag', col: 'crimson', msg: 'The bars reached their yield stress of 60 ksi. The beam sags visibly and the cracks widen: a warning before the end.' };
  return { label: 'FAILED: concrete crushed after the steel yielded', col: 'crimson', msg: 'After the bars yielded, the compression zone crushed at about ' + nf(c.n, 0, 1) + ' kips. This ductile failure gave plenty of warning.' };
}

function drawPanel(P, st) {
  const si = stateText(P, st), c = capacities(), M = P * momentPerKip(), dl = deflection(P);
  const metrics = 'Moment ' + nf(M / 12, 0, 1) + ' kip-ft\n' + (isCant() ? 'Tip' : 'Midspan') + (dl < 0 ? ' camber (up): ' + nf(-dl, 0, 2) : ' sag: ' + nf(dl, 0, 2)) + ' in. (illustrative)\nCracks at ' + nf(c.cr, 0, 1) + ' kips' + (c.steel ? '\nSteel yields at ' + nf(c.y, 0, 1) + ' kips\nFails at ' + nf(c.n, 0, 1) + ' kips' : '\n(plain-concrete limit)');
  const hint = 'Hover the cross-section to name its zones.' + (hasSteel() ? ' Click a steel dot for its area and force. The steel is ' + (steelOnTension() ? 'on the tension face: the right place.' : 'on the compression face: the wrong place.') : '');
  let x, y, w, h;
  if (G.narrow) {
    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text(metrics, G.px, G.cy, G.pw, G.ch);
    x = 8; y = G.cy + G.ch + 24; w = canvasWidth - 16; h = drawHeight - y - 6;
  } else { x = G.px; y = 250; w = G.pw; h = drawHeight - y - 6; }
  stroke(barOpen ? 'navy' : 'silver');
  strokeWeight(barOpen ? 2 : 1);
  fill('white');
  rect(x, y, w, h, 8);
  noStroke();
  if (barOpen) { drawBarBox(x, y, w, h); return; }
  fill(si.col);
  textAlign(LEFT, TOP);
  textSize(16);
  text(si.label, x + 8, y + 6, w - 16, 40);
  const ly = textWidth(si.label) > w - 16 ? 40 : 22;
  fill('black');
  textSize(14);
  text((G.narrow ? '' : metrics.replace(/\n/g, '. ') + '\n') + si.msg, x + 8, y + 6 + ly, w - 16, h - ly - (G.narrow ? 12 : 56));
  if (!G.narrow) {
    fill('dimgray');
    text(hint, x + 8, y + h - 44, w - 16, 40);
  }
}

function drawBarBox(x, y, w, h) {
  const P = loadSlider.value(), st = stateOf(P);
  fill('navy');
  textAlign(LEFT, TOP);
  textSize(16);
  const f = steelForce(P, st);
  let t, title;
  if (mat === 'Prestressed') {
    title = 'Strands: four 1/2 in. strands, 0.153 in² each (0.61 in² total)';
    t = 'Force now: about ' + nf(abs(f), 0, 0) + ' kips. The strands start at about 90 kips of prestress and rise toward ' + nf(A_PS * FPS_U, 0, 0) + ' kips at failure (ASTM A416 strand, 270 ksi grade).';
  } else {
    title = 'Rebar: two #7 bars, 0.60 in² each (1.20 in² total, from the bar table)';
    t = steelOnTension()
      ? 'Force now: T = ' + nf(f, 0, 1) + ' kips (' + nf(f / AS, 0, 1) + ' ksi). Yield force = 1.20 in² × 60 ksi = 72 kips.'
      : 'These bars are in the compression zone, so the force is only about ' + nf(abs(f), 0, 1) + ' kips of compression. The tension face has no steel.';
  }
  text(title, x + 8, y + 6, w - 16, 44);
  const ly = textWidth(title) > w - 16 ? 46 : 26;
  fill('black');
  textSize(14);
  text(t + '\nClick anywhere else to close.', x + 8, y + 6 + ly, w - 16, h - ly - 10);
}

function drawControlLabels(P) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Load: ' + nf(P, 0, 1) + ' kips', 10, drawHeight + 20);
  text('Support:', 10, drawHeight + (canvasWidth >= 700 ? 89 : 124));
}

function drawTooltip() {
  let tip = null;
  if (hover) {
    if (hover.kind === 'comp') tip = 'Compression zone (−): the concrete is squeezed';
    else if (hover.kind === 'tens') tip = 'Tension zone (+): the concrete is stretched' + (stateOf(loadSlider.value()) === 'uncracked' ? '' : ' and cracked');
    else tip = hasSteel() ? 'Click the steel to read its area and force' : '';
  }
  if (!tip) return;
  textSize(14);
  const w = min(canvasWidth - 8, textWidth(tip) + 16), h = 26;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4), ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 240);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(tip, tx + 8, ty + h / 2);
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
