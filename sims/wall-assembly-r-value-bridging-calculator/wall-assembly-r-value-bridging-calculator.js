// Wall Assembly R-Value and Thermal Bridging Calculator MicroSim - series layers plus the parallel path method for a framed wall
// CANVAS_HEIGHT: 645
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 185; // five rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 185;
let defaultTextSize = 16;

// ---- Data (R in h*ft2*F/BTU; values follow the Chapter 3 tables and are approximate) ----
const T_IN = 70;               // indoor air temperature, F
const R_XPS_PER_IN = 5.0;      // extruded polystyrene
const R_WOOD_PER_IN = 1.25;    // softwood framing (k = 0.8)
const R_STEEL_PER_IN = 1 / 310; // structural steel (k = 310 BTU*in/h*ft2*F)
const cavityOpts = {
  'None (air space)': { perIn: 0, fixed: 1.0, col: 'white', short: 'Air space', note: 'An empty cavity is modeled as still air, about R-1 (illustrative).' },
  'Fiberglass R-13': { label: 13, rated: 3.5, col: 'gold', short: 'Fiberglass R-13' },
  'Fiberglass R-20': { label: 20, rated: 5.5, col: 'gold', short: 'Fiberglass R-20' },
  'Cellulose': { perIn: 3.7, col: 'khaki', short: 'Cellulose' },
  'Closed-cell foam': { perIn: 6.0, col: 'lemonchiffon', short: 'Closed-cell foam' }
};
const framingOpts = {
  '2×4 wood': { depth: 3.5, perIn: R_WOOD_PER_IN, col: 'peru', short: '2×4 stud', steel: false },
  '2×6 wood': { depth: 5.5, perIn: R_WOOD_PER_IN, col: 'peru', short: '2×6 stud', steel: false },
  'Steel 3-5/8 in': { depth: 3.625, perIn: R_STEEL_PER_IN, col: 'gray', short: 'Steel stud', steel: true }
};

// ---- State ----
let hover = null; // { idx, path } for the layer under the mouse

// ---- Controls ----
let cavitySel, framingSel, ciSlider, fracSlider, tempSlider, profileCheck;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  cavitySel = createSelect();
  Object.keys(cavityOpts).forEach(n => cavitySel.option(n));
  cavitySel.selected('Fiberglass R-13');
  framingSel = createSelect();
  Object.keys(framingOpts).forEach(n => framingSel.option(n));
  framingSel.selected('2×4 wood');

  ciSlider = createSlider(0, 4, 0, 0.5);
  fracSlider = createSlider(10, 40, 25, 1);
  tempSlider = createSlider(-20, 40, -10, 1);
  profileCheck = createCheckbox('Show temperature profile', false);

  positionControls();
  describe('A wall cross-section drawn as colored layers from the warm inside on the left to the cold outside on the right: inside air film, gypsum board, a framing and cavity layer split into insulation and stud, sheathing, optional continuous insulation, siding, and outside air film. A plan-view strip shows stud and cavity paths at the framing fraction. Bars compare the cavity path R-value, the stud path R-value, and the effective R-value from the parallel path method. An optional temperature profile line shows where the temperature falls below freezing.', LABEL);
}

function positionControls() {
  const y0 = drawHeight;
  cavitySel.position(62, y0 + 7);
  framingSel.position(266, y0 + 7);
  const w = max(90, canvasWidth - sliderLeftMargin - 20);
  [ciSlider, fracSlider, tempSlider].forEach((s, i) => { s.position(sliderLeftMargin, y0 + 42 + i * 35); s.size(w); });
  profileCheck.position(10, y0 + 146);
}

// ---- Calculation: series layers on each path, then the parallel path average ----
function calc() {
  const cav = cavityOpts[cavitySel.value()];
  const fr = framingOpts[framingSel.value()];
  const ci = ciSlider.value();
  const f = fracSlider.value() / 100;
  const tOut = tempSlider.value();

  // R of the cavity fill; a batt too thick for the cavity is compressed and loses R
  let cavR, compressed = false;
  if (cav.fixed !== undefined) cavR = cav.fixed;
  else if (cav.label !== undefined) {
    cavR = cav.label * min(1, fr.depth / cav.rated);
    compressed = fr.depth < cav.rated;
  } else cavR = cav.perIn * fr.depth;
  const frameR = fr.perIn * fr.depth;

  // layer list from inside to outside; R[0] is the cavity path, R[1] the stud path
  const defs = [
    { id: 'in', name: 'Inside air film', lab: 'Inside film', R: [0.68, 0.68], col: 'azure', w: 0.9 },
    { id: 'gyp', name: '1/2 in gypsum board', lab: 'Gypsum', R: [0.45, 0.45], col: 'whitesmoke', w: 0.7 },
    { id: 'frame', name: 'Framing and cavity layer', lab: '', R: [cavR, frameR], col: 'white', w: 3.2 * fr.depth / 3.5 },
    { id: 'sh', name: '7/16 in sheathing', lab: 'Sheathing', R: [0.5, 0.5], col: 'burlywood', w: 0.7 }
  ];
  if (ci > 0) defs.push({ id: 'ci', name: ci + ' in XPS continuous insulation', lab: 'XPS ' + ci + ' in', R: [R_XPS_PER_IN * ci, R_XPS_PER_IN * ci], col: 'yellow', w: 0.8 * ci });
  defs.push({ id: 'sid', name: 'Vinyl siding', lab: 'Siding', R: [0.6, 0.6], col: 'lightsteelblue', w: 0.7 });
  defs.push({ id: 'out', name: 'Outside air film', lab: 'Outside film', R: [0.17, 0.17], col: 'azure', w: 0.9 });

  const Rcav = defs.reduce((s, d) => s + d.R[0], 0);
  const Rstud = defs.reduce((s, d) => s + d.R[1], 0);
  const Ucav = 1 / Rcav, Ustud = 1 / Rstud;
  const U = (1 - f) * Ucav + f * Ustud;
  const Reff = 1 / U;
  const dT = T_IN - tOut;
  // temperature at each layer boundary, for both paths
  const temps = [0, 1].map(p => {
    const R = p === 0 ? Rcav : Rstud;
    let acc = 0;
    const t = [T_IN];
    defs.forEach(d => { acc += d.R[p]; t.push(T_IN - dT * acc / R); });
    return t;
  });
  return { cav, fr, ci, f, tOut, cavR, frameR, compressed, defs, Rcav, Rstud, Ucav, Ustud, U, Reff, dT, temps, red: (Rcav - Reff) / Rcav };
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
  text('Wall R-Value and Thermal Bridging', canvasWidth / 2, 8);

  const c = calc();
  const wide = canvasWidth >= 620;
  const L = 10;
  const Lw = wide ? floor(canvasWidth * 0.58) - 10 : canvasWidth - 20;
  const bandH = wide ? 130 : 96, profH = wide ? 96 : 56;
  const bandY = 44, profY = bandY + bandH + 4;
  const capY = profY + profH + 2, stripY = capY + 38;

  const rects = layerRects(c, L, Lw);
  updateHover(c, rects, bandY, bandH);
  drawBand(c, rects, bandY, bandH);
  drawProfile(c, rects, profY, profH, capY);
  drawStrip(c, L, Lw, stripY);
  if (wide) {
    const rx = L + Lw + 14, rw = canvasWidth - rx - 10;
    drawPanel(c, rx, 44, rw, true);
    drawNotes(c, rx, 44 + 196, rw, 9, 15);
    drawFormula(c, L, stripY + 46, Lw);
  } else {
    drawPanel(c, L, stripY + 46, Lw, false);
    drawNotes(c, L, stripY + 46 + 108, Lw, 3, 14);
  }
  drawTooltip(c);
  drawControlLabels(c);
}

// x positions of each layer along the section; widths follow the layer weights, with a 22 px minimum
function layerRects(c, x0, w) {
  const tot = c.defs.reduce((s, d) => s + d.w, 0);
  const widths = c.defs.map(d => max(22, w * d.w / tot));
  const scale = w / widths.reduce((s, v) => s + v, 0);
  let x = x0;
  return widths.map(lw => {
    const r = { x: x, w: lw * scale };
    x += lw * scale;
    return r;
  });
}

// ---- Section band: layers drawn along the cavity path, with the stud path shown as a strip inside the framing layer ----
function drawBand(c, rects, y, h) {
  const studH = max(20, c.f * h);
  c.defs.forEach((d, i) => {
    const r = rects[i];
    const isHover = hover && hover.idx === i;
    stroke(isHover ? 'navy' : 'dimgray');
    strokeWeight(isHover ? 3 : 1);
    if (d.id === 'frame') {
      fill(c.cav.col);
      rect(r.x, y, r.w, h - studH);
      fill(c.fr.col);
      rect(r.x, y + h - studH, r.w, studH);
      noStroke();
      fill('black');
      textAlign(CENTER, CENTER);
      textSize(14);
      text(c.cav.short, r.x, y + (h - studH) / 2 - 10, r.w, 20);
      fill(c.fr.steel ? 'black' : 'white');
      text(c.fr.short, r.x, y + h - studH / 2 - 10, r.w, 20);
    } else {
      fill(d.col);
      rect(r.x, y, r.w, h);
      noStroke();
      fill('black');
      push();
      translate(r.x + r.w / 2, y + h / 2);
      rotate(-HALF_PI);
      textAlign(CENTER, CENTER);
      textSize(14);
      text(d.lab, 0, 0);
      pop();
    }
  });
}

// ---- Temperature profile aligned under the band ----
function drawProfile(c, rects, y, h, capY) {
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(rects[0].x, y, rects[rects.length - 1].x + rects[rects.length - 1].w - rects[0].x, h);
  noStroke();
  textSize(14);
  if (!profileCheck.checked()) {
    fill('dimgray');
    textAlign(CENTER, CENTER);
    text('Check "Show temperature profile" to plot the temperature through the layers.', rects[0].x + 6, y + 4, rects[rects.length - 1].x + rects[rects.length - 1].w - rects[0].x - 12, h - 8);
    return;
  }
  const tTop = T_IN + 8, tBot = min(c.tOut, 0) - 8;
  const yOf = t => y + 4 + (h - 8) * (tTop - t) / (tTop - tBot);
  const xs = rects.map(r => r.x).concat([rects[rects.length - 1].x + rects[rects.length - 1].w]);
  // freezing line
  drawingContext.setLineDash([5, 4]);
  stroke('gray');
  strokeWeight(1);
  line(xs[0], yOf(32), xs[xs.length - 1], yOf(32));
  drawingContext.setLineDash([]);
  noStroke();
  fill('gray');
  textAlign(RIGHT, BOTTOM);
  text('32°F', xs[xs.length - 1] - 2, yOf(32) - 1);
  // cavity path (solid) and stud path (dashed): blue below freezing, red above
  drawTempLine(xs, c.temps[1], yOf, 1.5, true);
  drawTempLine(xs, c.temps[0], yOf, 3, false);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(T_IN + '°F', xs[0] + 3, y + 2);
  textAlign(RIGHT, TOP);
  text(c.tOut + '°F', xs[xs.length - 1] - 3, c.tOut > 20 ? y + 2 : y + h - 18);
  // caption: where each path falls below freezing
  const fc = freezeName(c, 0), fs = freezeName(c, 1);
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  const msg = 'Solid line: cavity path. Dashed line: stud path. Below 32°F: cavity path ' + fc + '; stud path ' + fs + '.';
  text(msg, rects[0].x, capY + 2, rects[rects.length - 1].x + rects[rects.length - 1].w - rects[0].x, 36);
}

function freezeName(c, p) {
  const t = c.temps[p];
  for (let i = 0; i < c.defs.length; i++) {
    if (t[i] > 32 && t[i + 1] <= 32) {
      const d = c.defs[i];
      return 'in the ' + (d.id === 'frame' ? (p === 0 ? 'cavity layer' : 'stud') : d.id === 'ci' ? 'XPS layer' : d.lab.toLowerCase());
    }
  }
  return 'stays above 32°F';
}

// polyline through the layer boundaries; each piece is split where it crosses 32 F
function drawTempLine(xs, ts, yOf, wt, dashed) {
  strokeWeight(wt);
  noFill();
  if (dashed) drawingContext.setLineDash([5, 4]);
  for (let i = 0; i < ts.length - 1; i++) {
    let x1 = xs[i], y1 = ts[i], x2 = xs[i + 1], y2 = ts[i + 1];
    const crosses = (y1 - 32) * (y2 - 32) < 0;
    const seg = (xa, ta, xb, tb) => { stroke((ta + tb) / 2 < 32 ? 'royalblue' : 'crimson'); line(xa, yOf(ta), xb, yOf(tb)); };
    if (crosses) {
      const xm = x1 + (x2 - x1) * (32 - y1) / (y2 - y1);
      seg(x1, y1, xm, 32);
      seg(xm, 32, x2, y2);
    } else seg(x1, y1, x2, y2);
  }
  drawingContext.setLineDash([]);
}

// ---- Plan-view strip: studs and cavities side by side at the framing fraction ----
function drawStrip(c, x, w, y) {
  const sw = c.f * w / 4, cw = (1 - c.f) * w / 3;
  let cx = x;
  stroke('dimgray');
  strokeWeight(1);
  for (let i = 0; i < 7; i++) {
    const isStud = i % 2 === 0;
    const sgW = isStud ? sw : cw;
    fill(isStud ? c.fr.col : c.cav.col);
    rect(cx, y, sgW, 24);
    cx += sgW;
  }
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('Plan view: ' + round(c.f * 100) + '% stud path, ' + round((1 - c.f) * 100) + '% cavity path', x, y + 27, w, 40);
}

// ---- Panel: R of each path as bars, then U and the percent change ----
function drawPanel(c, x, y, w, wide) {
  let yy = y;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  if (wide) {
    textSize(16);
    text('Whole-wall performance', x, yy);
    yy += 26;
  }
  const rows = [
    { lab: 'Cavity R', v: c.Rcav, col: 'gold' },
    { lab: 'Stud R', v: c.Rstud, col: c.fr.col },
    { lab: 'Effective R', v: c.Reff, col: 'steelblue' }
  ];
  const rowH = wide ? 30 : 22, labW = 92, valW = 46;
  const maxV = max(c.Rcav, c.Rstud, c.Reff);
  const barMax = w - labW - valW;
  rows.forEach((r, i) => {
    const ry = yy + i * rowH;
    noStroke();
    fill('black');
    textSize(15);
    textAlign(LEFT, CENTER);
    text(r.lab, x, ry + (rowH - 4) / 2);
    stroke('dimgray');
    strokeWeight(1);
    fill(r.col);
    rect(x + labW, ry, max(2, barMax * r.v / maxV), rowH - 6);
    noStroke();
    fill('black');
    text(nf(r.v, 0, 1), x + labW + max(2, barMax * r.v / maxV) + 5, ry + (rowH - 4) / 2);
  });
  yy += rows.length * rowH + 2;
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(15);
  text('U = ' + nf(c.U, 0, 4) + ' BTU/(h·ft²·°F)', x, yy, w, 20);
  const pct = abs(c.red) * 100;
  const dir = c.red >= 0 ? 'below' : 'above';
  fill(c.red >= 0 ? 'darkorange' : 'steelblue');
  text('Effective R is ' + nf(pct, 0, 0) + '% ' + dir + ' the cavity-only R', x, yy + (wide ? 22 : 18), w, 40);
}

// ---- Formula block (wide layouts) ----
function drawFormula(c, x, y, w) {
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(15);
  text('Parallel path method (average the U-values, not the R-values):', x, y, w, 24);
  text('U = ' + nf(1 - c.f, 0, 2) + ' × ' + nf(c.Ucav, 0, 4) + ' + ' + nf(c.f, 0, 2) + ' × ' + nf(c.Ustud, 0, 4) + ' = ' + nf(c.U, 0, 4), x, y + 24);
  text('Effective R = 1 / ' + nf(c.U, 0, 4) + ' = ' + nf(c.Reff, 0, 1), x, y + 46);
  text('Heat flow: ' + nf(c.U * c.dT, 0, 1) + ' BTU/h per ft² at ' + c.dT + '°F difference', x, y + 68);
}

// ---- Explanatory notes, most important first ----
function drawNotes(c, x, y, w, maxLines, ts) {
  const notes = [];
  const share = c.f * c.Ustud / c.U * 100;
  notes.push('Studs: ' + round(c.f * 100) + '% of the area, ' + nf(share, 0, 0) + '% of the heat flow.');
  if (c.fr.steel) notes.push('Steel conducts about 1,000 times more heat than insulation of equal thickness (k = 310 vs 0.27).');
  if (c.compressed) notes.push('An R-20 batt squeezed into a ' + c.fr.depth + ' in cavity is compressed and counts for only R-' + nf(c.cavR, 0, 1) + '.');
  if (c.cav.note) notes.push(c.cav.note);
  if (c.ci > 0) notes.push(c.ci + ' in of continuous XPS (R-' + nf(R_XPS_PER_IN * c.ci, 0, 1) + ') covers the studs too, so heat can no longer bypass the insulation through them.');
  else if (!c.fr.steel) notes.push('Add continuous insulation outside the sheathing to interrupt the stud path.');
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(ts);
  const lh = ts + 4;
  let yy = y;
  // each note wraps; allow roughly maxLines rows of text in total
  const perLine = max(20, floor(w / (ts * 0.52)));
  let used = 0;
  for (const n of notes) {
    const lines = ceil(n.length / perLine);
    if (used + lines > maxLines && used > 0) break;
    text(n, x, yy, w, lines * lh + 6);
    yy += lines * lh + 4;
    used += lines;
  }
}

// ---- Hover: find the layer under the mouse (the stud strip inside the framing layer is its own target) ----
function updateHover(c, rects, y, h) {
  hover = null;
  if (mouseX < 0 || mouseY < y || mouseY > y + h) return;
  const studH = max(20, c.f * h);
  rects.forEach((r, i) => {
    if (mouseX >= r.x && mouseX <= r.x + r.w) {
      const path = (c.defs[i].id === 'frame' && mouseY > y + h - studH) ? 1 : 0;
      hover = { idx: i, path: path };
    }
  });
}

function drawTooltip(c) {
  if (!hover) return;
  const d = c.defs[hover.idx], p = hover.path;
  const Rt = p === 0 ? c.Rcav : c.Rstud;
  const drop = c.dT * d.R[p] / Rt;
  let name = d.name;
  if (d.id === 'frame') name = p === 0 ? 'Cavity: ' + c.cav.short : 'Stud: ' + c.fr.short;
  const lines = [name, 'R = ' + nf(d.R[p], 0, 2) + ' h·ft²·°F/BTU', 'Temperature drop = ' + nf(drop, 0, 1) + '°F', (p === 0 ? 'Cavity' : 'Stud') + ' path total R = ' + nf(Rt, 0, 1)];
  const w = 250, h = 84;
  const tx = min(max(4, mouseX + 12), canvasWidth - w - 4);
  const ty = min(mouseY + 14, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  lines.forEach((s, i) => text(s, tx + 8, ty + 6 + i * 18, w - 12, 20));
}

// ---- Control labels ----
function drawControlLabels(c) {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  const y0 = drawHeight;
  text('Cavity:', 10, y0 + 19);
  text('Frame:', 208, y0 + 19);
  text('Cont. insulation: ' + nf(ciSlider.value(), 0, 1) + ' in', 10, y0 + 54);
  text('Framing fraction: ' + fracSlider.value() + '%', 10, y0 + 89);
  text('Outdoor temp: ' + tempSlider.value() + ' °F', 10, y0 + 124);
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
