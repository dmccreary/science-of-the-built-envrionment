// Heat Transfer Modes in a Winter Wall MicroSim - a wall cross-section showing conduction, convection, and radiation along the heat path
// CANVAS_HEIGHT: 540
// Bloom Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 80; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215; // label width to the left of each slider
let defaultTextSize = 16;

// ---- Illustrative steady-state model (Chapter 3 cavity wall, R and film values in h·ft²·°F/BTU) ----
const T_IN = 70;                 // indoor air, fixed (°F)
const H_IN = 1.47, H_RAD = 0.6;  // inside film coefficient; share carried by radiation (the rest is convection)
const R_GYP = 0.45, R_BATT = 12.0, R_SHEATH = 0.5, R_SIDING = 0.6;
const GAP_CONV = 0.34, GAP_RAD = 0.66, GAP_RAD_FOIL = 0.04; // air-gap conductances (BTU/h·ft²·°F): R is 1.0 without foil, about 2.6 with foil
const DESIGN = { t: -10, wind: 15 };                         // design day for the percent comparison

// Zones left to right: weight sets the drawn width
const zones = [
  { id: 'inair', label: 'Interior air', w: 1.4, row: 'above' },
  { id: 'insurf', label: 'Interior surface', w: 0.5, row: 'below' },
  { id: 'gyp', label: 'Gypsum board', w: 0.7, row: 'above' },
  { id: 'batt', label: 'Insulated cavity', w: 1.7, row: 'above' },
  { id: 'gap', label: 'Air gap', w: 0.7, row: 'none' },
  { id: 'sheath', label: 'Sheathing', w: 0.7, row: 'below' },
  { id: 'siding', label: 'Siding', w: 0.7, row: 'above' },
  { id: 'exair', label: 'Exterior air', w: 1.4, row: 'below' }
];

const MECH = { conduction: 'crimson', convection: 'mediumblue', radiation: 'darkorange' };

// ---- State and controls ----
let tempSlider, windSlider, foilCheck;
let selected = null;   // id of the clicked arrow
let arrows = [];       // arrows computed each frame
let zoneRects = {};
let hoverTip = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  tempSlider = createSlider(-20, 60, -10, 1);
  windSlider = createSlider(0, 30, 15, 1);
  foilCheck = createCheckbox('Reflective foil in the air gap', false);

  positionControls();
  describe('A horizontal cross-section of a winter wall with the warm room on the left and cold outdoors on the right. Zones from left to right are interior air, interior surface, gypsum board, insulated cavity with an air gap, sheathing, siding, and exterior air. Colored arrows labeled conduction, convection, and radiation show how heat crosses each zone, and their thickness follows the heat flow. Sliders set the outdoor temperature and wind speed, and a checkbox adds reflective foil in the air gap. A readout gives total heat flow and compares it with the design-day flow.', LABEL);
}

// ---- Layout helpers ----
function narrow() { return canvasWidth < 560; }
function colW() { return canvasWidth / 2; }
function labelW() { return narrow() ? 128 : sliderLeftMargin; }
function sliderW() { return max(60, colW() - labelW() - 18); }
function rowCenter(r) { return drawHeight + 17 + 35 * r; }

function positionControls() {
  const lx = 8, rx = colW() + 8;
  tempSlider.position(lx + labelW(), rowCenter(0) - 10);
  tempSlider.size(sliderW());
  windSlider.position(rx + (narrow() ? 96 : 110), rowCenter(0) - 10);
  windSlider.size(max(60, colW() - (narrow() ? 96 : 110) - 18));
  foilCheck.position(lx, rowCenter(1) - 12);
}

// ---- Model: temperatures at each face and the heat flow per square foot ----
function solve(tOut, wind, foil) {
  const hOut = 1.47 + 0.295 * wind;                     // 1.47 in still air, 5.9 at 15 mph (Chapter 3 values)
  const gapRad = foil ? GAP_RAD_FOIL : GAP_RAD;
  const gapC = GAP_CONV + gapRad;
  const rGap = 1 / gapC;
  const rIn = 1 / H_IN, rOut = 1 / hOut;
  const rTotal = rIn + R_GYP + R_BATT + rGap + R_SHEATH + R_SIDING + rOut;
  const q = (T_IN - tOut) / rTotal;
  const t = [T_IN];
  [rIn, R_GYP, R_BATT, rGap, R_SHEATH, R_SIDING].forEach(r => t.push(t[t.length - 1] - q * r));
  // t = [indoor air, inside surface, behind gypsum, behind batt, behind gap, behind sheathing, outside surface]
  return { q, rTotal, t, tOut, hOut, gapShare: [GAP_CONV / gapC, gapRad / gapC] };
}

function arrowFlux(s) {
  const inRad = H_RAD / H_IN, outRad = H_RAD / s.hOut;
  return {
    inConv: s.q * (1 - inRad), inRad: s.q * inRad,
    gapConv: s.q * s.gapShare[0], gapRad: s.q * s.gapShare[1],
    outConv: s.q * (1 - outRad), outRad: s.q * outRad
  };
}

function draw() {
  updateCanvasSize();
  hoverTip = null;

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
  text('Heat Transfer in a Winter Wall', canvasWidth / 2, 8);

  const s = solve(tempSlider.value(), windSlider.value(), foilCheck.checked());
  layoutZones();
  drawZones(s);
  buildArrows(s);
  drawArrows();
  drawZoneLabels();
  drawPanel(s);
  drawControlLabels();
  drawHoverTip();
  cursor(arrowAt(mouseX, mouseY) ? 'pointer' : 'default');
}

// ---- Wall cross-section ----
const bandY = 80, bandH = 106;

function layoutZones() {
  const total = zones.reduce((a, z) => a + z.w, 0);
  let x = 10;
  const w = canvasWidth - 20;
  zoneRects = {};
  zones.forEach(z => {
    zoneRects[z.id] = { x, y: bandY, w: z.w / total * w, h: bandH };
    x += z.w / total * w;
  });
}

function tempColor(t) {
  return lerpColor(color('lightsteelblue'), color('lemonchiffon'), constrain((t + 20) / 90, 0, 1));
}

// each zone is shaded across its own temperature drop
function faceTemps(s) {
  const t = s.t;
  return { inair: [t[0], t[0]], insurf: [t[0], t[1]], gyp: [t[1], t[2]], batt: [t[2], t[3]], gap: [t[3], t[4]],
    sheath: [t[4], t[5]], siding: [t[5], t[6]], exair: [s.tOut, s.tOut] };
}

function drawZones(s) {
  const ft = faceTemps(s);
  noStroke();
  zones.forEach(z => {
    const r = zoneRects[z.id], [ta, tb] = ft[z.id];
    const n = max(1, floor(r.w / 2));
    for (let i = 0; i < n; i++) {
      fill(tempColor(lerp(ta, tb, (i + 0.5) / n)));
      rect(r.x + i * r.w / n, r.y, r.w / n + 1, r.h);
    }
    stroke('black');
    strokeWeight(z.id === 'inair' || z.id === 'exair' ? 1 : 2);
    noFill();
    rect(r.x, r.y, r.w, r.h);
    noStroke();
  });
  // batt texture and the gap tag, so the zones do not rely on color alone
  const b = zoneRects.batt;
  stroke('goldenrod');
  strokeWeight(1);
  for (let x = b.x + 8; x < b.x + b.w - 4; x += 12) line(x, b.y + 6, x + 6, b.y + b.h - 6);
  const gp = zoneRects.gap;
  noStroke();
  fill('black');
  textSize(12);
  textAlign(CENTER, CENTER);
  text(narrow() ? 'gap' : 'air gap', gp.x + gp.w / 2, bandY + bandH / 2);

  // hover: local temperature inside the zone
  if (mouseY >= bandY && mouseY <= bandY + bandH && !arrowAt(mouseX, mouseY)) {
    const z = zones.find(zz => mouseX >= zoneRects[zz.id].x && mouseX <= zoneRects[zz.id].x + zoneRects[zz.id].w);
    if (z) {
      const r = zoneRects[z.id], [ta, tb] = ft[z.id];
      const local = lerp(ta, tb, constrain((mouseX - r.x) / r.w, 0, 1));
      hoverTip = z.label + ': ' + nf(local, 0, 1) + '°F' + (abs(ta - tb) > 0.05 ? ' (' + nf(ta, 0, 1) + ' to ' + nf(tb, 0, 1) + ')' : '');
    }
  }
}

function drawZoneLabels() {
  noStroke();
  fill('black');
  textSize(defaultTextSize - (narrow() ? 2 : 0));
  textAlign(CENTER, TOP);
  zones.forEach(z => {
    if (z.row === 'none') return;
    const r = zoneRects[z.id];
    const cx = z.id === 'batt' ? r.x + (r.w + zoneRects.gap.w) / 2 : r.x + r.w / 2;
    const words = z.label.split(' ');
    const lines = words.length > 1 ? [words[0], words.slice(1).join(' ')] : [z.label];
    const lw = max(...lines.map(l => textWidth(l)));
    const x = constrain(cx, lw / 2 + 2, canvasWidth - lw / 2 - 2);
    stroke('dimgray');
    strokeWeight(1);
    if (z.row === 'above') line(cx, bandY - 3, cx, bandY);
    else line(cx, bandY + bandH, cx, bandY + bandH + 3);
    noStroke();
    const ty = z.row === 'above' ? bandY - 6 - lines.length * 16 : bandY + bandH + 5;
    lines.forEach((l, i) => text(l, x, ty + i * 16));
  });
}

// ---- Heat-flow arrows: thickness follows the flow in each mechanism ----
function buildArrows(s) {
  const f = arrowFlux(s);
  const R = zoneRects;
  const cy = bandY + bandH / 2;
  const radY = cy - 27, convY = cy + 27;
  const xs = (zone, pad) => R[zone].x + pad;
  const xe = (zone, pad) => R[zone].x + R[zone].w - pad;
  const share = v => nf(v / s.q * 100, 0, 0) + ' percent';
  arrows = [
    { id: 'inRad', mech: 'radiation', x1: xs('inair', 8), x2: xe('insurf', 2), y: radY, flux: f.inRad, share: share(f.inRad), where: 'Interior surface',
      why: 'Warm room surfaces and people send infrared straight to the cooler wall; no air movement is needed.' },
    { id: 'inConv', mech: 'convection', x1: xs('inair', 8), x2: xe('insurf', 2), y: convY, flux: f.inConv, share: share(f.inConv), where: 'Interior surface',
      why: 'Convection leads here: room air circulates and keeps sweeping warm air against the cooler wall surface.' },
    { id: 'cond1', mech: 'conduction', x1: xs('gyp', 2), x2: xe('batt', 2), y: cy, flux: s.q, share: '100 percent', where: 'Gypsum board and batt',
      why: 'Conduction dominates in solids: heat passes molecule to molecule, and the thick batt of trapped air takes nearly all of the temperature drop.' },
    { id: 'gapRad', mech: 'radiation', x1: xs('gap', 3), x2: xe('gap', 1), y: radY, flux: f.gapRad, share: share(f.gapRad), where: 'Air gap',
      why: foilCheck.checked() ? 'With reflective foil the surface emits very little (emissivity about 0.05), so the radiation arrow narrows and the gap resists more.'
        : 'Radiation dominates across an open gap: both faces emit and absorb strongly (emissivity near 0.9), so most heat jumps across as infrared.' },
    { id: 'gapConv', mech: 'convection', x1: xs('gap', 3), x2: xe('gap', 1), y: convY, flux: f.gapConv, share: share(f.gapConv), where: 'Air gap',
      why: 'Convection in a narrow gap is weak: there is little room for air to circulate, so this share stays small.' },
    { id: 'cond2', mech: 'conduction', x1: xs('sheath', 2), x2: xe('siding', 2), y: cy, flux: s.q, share: '100 percent', where: 'Sheathing and siding',
      why: 'Conduction dominates in the sheathing and siding: they are thin solids with little resistance, so heat passes straight through them.' },
    { id: 'outRad', mech: 'radiation', x1: R.siding.x + R.siding.w - 2, x2: xe('exair', 6), y: radY, flux: f.outRad, share: share(f.outRad), where: 'Exterior surface',
      why: 'The cold siding also radiates to the cold sky and ground; this matters most on calm days when convection is weak.' },
    { id: 'outConv', mech: 'convection', x1: R.siding.x + R.siding.w - 2, x2: xe('exair', 6), y: convY, flux: f.outConv, share: share(f.outConv), where: 'Exterior surface',
      why: 'Convection dominates outside: wind sweeps away the still air film, so heat leaves the siding quickly. More wind, more convection.' }
  ];
  arrows.forEach(a => { a.w = constrain(2 + 2.2 * a.flux, 2, 16); });
}

function drawArrows() {
  arrows.forEach(a => {
    const col = MECH[a.mech];
    const len = a.x2 - a.x1;
    if (len < 6) return;
    const hd = min(10 + a.w * 0.8, len * 0.6);
    // white halo, then the colored arrow
    [['white', 4], [col, 0]].forEach(([c, extra]) => {
      stroke(c);
      strokeWeight(a.w + extra);
      line(a.x1, a.y, a.x2 - hd * 0.6, a.y);
      noStroke();
      fill(c);
      const e = extra / 2;
      triangle(a.x2 + e, a.y, a.x2 - hd - e, a.y - a.w * 0.9 - 4 - e, a.x2 - hd - e, a.y + a.w * 0.9 + 4 + e);
    });
    if (selected === a.id) {
      noFill();
      stroke('black');
      strokeWeight(2);
      rect(a.x1 - 4, a.y - a.w / 2 - 7, len + 8, a.w + 14, 4);
    }
    // text label on every arrow
    noStroke();
    fill(col);
    textSize(narrow() ? 12 : 14);
    textAlign(CENTER, CENTER);
    const ly = a.mech === 'convection' ? a.y + a.w / 2 + 12 : a.y - a.w / 2 - 11;
    const cx = constrain((a.x1 + a.x2) / 2, 28, canvasWidth - 28);
    text(a.mech, cx, ly);
  });
}

function arrowAt(mx, my) {
  if (mx < 0 || mx > canvasWidth || my < 0 || my > drawHeight) return null;
  for (const a of arrows) {
    if (mx >= a.x1 - 4 && mx <= a.x2 + 4 && abs(my - a.y) <= max(a.w / 2 + 3, 9)) return a;
  }
  return null;
}

// ---- Readout and infobox panel ----
function wrapLines(str, w) {
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const word of words) {
    const t = cur ? cur + ' ' + word : word;
    if (textWidth(t) > w && cur) { lines.push(cur); cur = word; } else { cur = t; }
  }
  if (cur) lines.push(cur);
  return lines;
}

function para(str, x, y, w, col, size) {
  textSize(size);
  fill(col);
  textAlign(LEFT, TOP);
  for (const ln of wrapLines(str, w)) { text(ln, x, y); y += size + 3; }
  return y;
}

function drawPanel(s) {
  const px = 10, py = 234, pw = canvasWidth - 20, ph = drawHeight - py - 6;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(px, py, pw, ph, 8);
  noStroke();
  const x = px + 8, w = pw - 16;
  const fs = narrow() ? 14 : 16;
  const design = solve(DESIGN.t, DESIGN.wind, false);
  const pct = s.q / design.q * 100;
  let y = py + 6;
  y = para('Total heat flow: ' + nf(s.q, 0, 1) + ' BTU/h per ft² of wall (' + (narrow() ? '' : 'indoor 70°F, ') + 'ΔT = ' + (T_IN - s.tOut) + '°F, R = ' + nf(s.rTotal, 0, 1) + ')', x, y, w, 'navy', fs);
  y = para('That is ' + nf(pct, 0, 0) + ' percent of the design-day flow (' + DESIGN.t + '°F, ' + DESIGN.wind + ' mph, no foil: ' + nf(design.q, 0, 1) + ' BTU/h per ft²).', x, y + 1, w, 'black', fs);
  y += 3;
  const a = arrows.find(ar => ar.id === selected);
  if (a) {
    y = para(a.where + ': ' + a.mech + ' carries ' + nf(a.flux, 0, 1) + ' BTU/h per ft² (' + a.share + ' of the flow here).', x, y, w, MECH[a.mech], fs);
    y = para(a.why, x, y + 1, w, 'black', fs);
  } else {
    y = para('Click any arrow to see its mechanism and why it dominates there. Hover over a zone for its temperature.', x, y, w, 'darkgreen', fs);
  }
  // legend as words, not color alone
  y = max(y + 4, py + ph - 40);
  textSize(14);
  let lx = x;
  [['conduction', 'crimson'], ['convection', 'mediumblue'], ['radiation', 'darkorange']].forEach(([n, c]) => {
    fill(c);
    rect(lx, y + 4, 14, 8, 2);
    fill('black');
    textAlign(LEFT, TOP);
    text(n, lx + 18, y);
    lx += 18 + textWidth(n) + 14;
  });
  para(narrow() ? 'Illustrative simplified model; values are approximate.' : 'Illustrative simplified model (steady state, one square foot of wall); values are approximate.', x, y + 18, w, 'dimgray', 13);
}

// ---- Control labels (drawn in the control region) ----
function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(narrow() ? 14 : defaultTextSize);
  const lx = 8, rx = colW() + 8;
  text((narrow() ? 'Outdoor: ' : 'Outdoor temperature: ') + tempSlider.value() + ' °F', lx, rowCenter(0));
  text('Wind: ' + windSlider.value() + ' mph', rx, rowCenter(0));
  if (!narrow()) text('Indoor air fixed at 70 °F', rx, rowCenter(1));
}

function drawHoverTip() {
  if (!hoverTip) return;
  textSize(14);
  const w = textWidth(hoverTip) + 16;
  const tx = constrain(mouseX + 12, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY - 34, 4, drawHeight - 30);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, 24, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  text(hoverTip, tx + 8, ty + 12);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  const a = arrowAt(mouseX, mouseY);
  selected = a ? a.id : null;
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
