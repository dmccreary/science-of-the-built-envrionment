// Forensic Leak Investigation Simulator MicroSim - choose investigation tools, weigh evidence against five hypotheses, and name the cause of a ceiling stain
// CANVAS_HEIGHT: 680
// Bloom Level 5 (Evaluate)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 530;
let controlHeight = 150; // four rows of wrapped buttons
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10;
let defaultTextSize = 16;

const WIDE_MIN = 640;
const SUPPORT_AT = 0.6;   // confidence at or above this counts as supported
const ELIMINATE_AT = 0.03; // confidence at or below this counts as eliminated
const EFFICIENT_AT = 0.85; // confidence in the true cause that an efficient investigation reaches

// ---- Data: the five hypotheses, with what would confirm each (shown on hover) ----
const HYP = [
  { name: 'Missing window flashing', confirm: 'Confirm with: no flashing on the drawings, a wet band running from the stain up to the window head, a leak in the water test only when water hits the head, and soft sheathing with no flashing when the wall is opened.' },
  { name: 'Roof leak', confirm: 'Confirm with: wetness spreading down from the roof deck, a cool patch under a roof seam or drain, stains after heavy rain in warm weather, and a dry wall.' },
  { name: 'Condensation', confirm: 'Confirm with: an even damp film on a cold surface with no wet path to a source, a cold band on the infrared image where insulation is thin, and stains that grow in cold snaps without rain.' },
  { name: 'Plumbing leak', confirm: 'Confirm with: a small wet spot directly under a pipe, a warm spot that follows a hot-water line, and a stain that grows whatever the weather.' },
  { name: 'Ice dam', confirm: 'Confirm with: wetness limited to the eave, a cold band at the eave on the infrared image, and stains during a thaw after heavy snow and a hard freeze, with icicles at the eave.' }
];

// ---- Data: the six tools. Cost is in hours (illustrative); destructive tools damage finishes ----
const TOOLS = [
  { label: 'Review drawings', hours: 2, key: 'DR' },
  { label: 'Moisture meter scan', hours: 1.5, key: 'MM' },
  { label: 'Infrared scan', hours: 2, key: 'IR' },
  { label: 'Water test, bottom up', hours: 4, key: 'WT' },
  { label: 'Open the wall', hours: 3, key: 'OW', destructive: true },
  { label: 'Check weather records', hours: 1, key: 'WX' }
];

// ---- Data: observations. m holds the multiplier each finding applies to the five hypotheses (above 1 supports, below 1 weakens, near 0 rules out) ----
const OBS = {
  DR_FLASH: { text: 'The wall detail at the classroom window head shows no flashing. The roof and plumbing drawings look complete.', short: 'No head flashing on the drawings', why: 'No flashing detail means nothing was built to shed water at the window head, so a window leak is more likely, though the drawings alone do not prove it.', m: [5, 0.9, 1, 0.9, 1] },
  DR_ROOF: { text: 'The window head is flashed on the drawings. A roof seam and a roof drain sit right above the classroom ceiling.', short: 'Flashing detailed; roof seam above', why: 'Because the window head is detailed with flashing, a window leak is less likely, while a roof seam above the stain keeps a roof leak in play.', m: [0.4, 2, 1, 1, 1] },
  DR_COND: { text: 'The ceiling insulation is thin at the exterior edge, and no vapor retarder is shown at the ceiling.', short: 'Thin insulation, no vapor retarder', why: 'Thin insulation lets the ceiling edge get cold and a missing vapor retarder lets indoor moisture reach it, which are the conditions for condensation.', m: [0.8, 0.8, 3, 1, 1.5] },
  DR_PLUMB: { text: 'A hot-water supply pipe runs through the ceiling cavity directly above the stain.', short: 'Pipe runs above the stain', why: 'A pipe above the stain provides a nearby water source, which makes a plumbing leak more likely, though the pipe could be sound.', m: [0.8, 0.8, 0.8, 4, 0.8] },
  DR_ICE: { text: 'The roof overhangs the wall at the eave, with little insulation at the eave and no ice-and-water membrane shown there.', short: 'Thin eave insulation, no membrane', why: 'Heat loss at the eave with no waterproof membrane there is the usual recipe for an ice dam.', m: [0.8, 1.2, 1.5, 0.8, 3] },
  MM_FLASH: { text: 'Moisture readings are highest at the window head and fall off in a band that climbs the wall toward the stain. The roof and the middle of the ceiling read dry.', short: 'Wet band from window head to stain', why: 'A wet band that starts at the window head and rises to the stain fits water entering at the window, and does not fit a roof, pipe, or cold-surface source.', m: [5, 0.4, 0.3, 0.3, 0.3] },
  MM_ROOF: { text: 'Moisture is highest in the ceiling cavity under the roof seam and spreads down to the stain. The wall below the window reads dry.', short: 'Wet ceiling cavity under roof seam', why: 'Wetness that starts at the roof and spreads downward fits a roof leak (or ice-dam meltwater) and rules against the window wall.', m: [0.2, 5, 0.5, 0.5, 2] },
  MM_COND: { text: 'The ceiling edge reads damp in an even film along the cold exterior wall line, with no single wet path leading to the stain.', short: 'Even damp film along cold edge', why: 'A broad, even film on a cold surface with no path to a source points to condensation and not to a point leak.', m: [0.3, 0.4, 4, 0.4, 0.8] },
  MM_PLUMB: { text: 'A small, intense wet spot sits directly below the supply pipe. The window area and the roof deck read dry.', short: 'Small wet spot under the pipe', why: 'A wet spot centered on the pipe with dry surroundings fits a pipe leak, since water from the roof or window would leave a path.', m: [0.2, 0.3, 0.4, 6, 0.3] },
  MM_ICE: { text: 'Moisture is concentrated at the eave: the wall top plate and the ceiling edge read wet, and the rest of the ceiling reads dry.', short: 'Wet at the eave only', why: 'Wetness limited to the eave fits meltwater backing up behind an ice dam, while a window or pipe leak would not wet the eave.', m: [0.5, 2, 0.8, 0.3, 4] },
  IR_FLASH: { text: 'The infrared image shows a cool streak under the window head running down the wall. The roof area is uniform.', short: 'Cool streak at the window head', why: 'Cool, wet material at the window head shows water cooling the wall there, which fits a window leak.', m: [4, 0.5, 0.6, 0.4, 0.5] },
  IR_ROOF: { text: 'A cool patch with a sharp edge sits on the ceiling under the roof seam, well away from the window.', short: 'Cool patch under the roof seam', why: 'A cool patch away from the window and directly under the roof seam fits water coming from the roof.', m: [0.4, 4, 0.6, 0.5, 1.2] },
  IR_COND: { text: 'A long, cold band runs along the ceiling edge where the insulation is thin, with no wet path leading to it.', short: 'Long cold band at thin insulation', why: 'A cold band where the insulation is thin shows a surface cold enough to collect condensation, although an ice-dam eave can look similar.', m: [0.5, 0.5, 5, 0.4, 1.2] },
  IR_PLUMB: { text: 'A warm spot follows the line of the hot-water pipe above the stain.', short: 'Warm spot along the hot pipe', why: 'Only a leaking hot-water line warms the ceiling in a stripe along the pipe, so this points to a plumbing leak.', m: [0.3, 0.3, 0.4, 6, 0.3] },
  IR_ICE: { text: 'A cold band runs along the eave where the insulation is missing, with a warmer ceiling beyond it.', short: 'Cold band along the eave', why: 'A cold eave band fits an ice dam, but condensation on a cold surface can look similar, so other evidence is needed to separate them.', m: [0.5, 1, 2, 0.4, 3] },
  WT_FLASH: { text: 'Water applied to the wall in stages from the bottom up caused no leak until it reached the window head. Then the stain area began to drip within minutes.', short: 'Leaks only when water hits the head', why: 'A leak that appears only when water reaches the head isolates the window head as the point of entry.', m: [8, 0.3, 0.1, 0.1, 0.3] },
  WT_NONE: { text: 'The wall was wetted in stages from the bottom up to the roofline, and no leak appeared at the stain.', short: 'No leak from the wall test', why: 'No leak from the wall test rules out water entering through the wall or window, so the source is somewhere else.', m: [0.05, 1.1, 1.1, 1.1, 1.1] },
  OW_FLASH: { text: 'The opening in the siding shows dark, soft sheathing and framing at the window head, and no flashing.', short: 'Soft sheathing, no flashing', why: 'Rotted sheathing with no flashing is direct physical evidence of repeated water entry at the window head.', m: [20, 0.1, 0.1, 0.1, 0.1] },
  OW_DRY: { text: 'The sheathing and framing behind the siding are dry and sound, and the flashing at the window head is in place.', short: 'Wall cavity dry and sound', why: 'A dry, sound wall cavity with flashing in place rules out the window as the source, but it does not say where the water does come from.', m: [0.03, 1.2, 1.2, 1.2, 1.2] },
  WX_FLASH: { text: 'Weather records show wind-driven rain the day before the stain first appeared, in mild weather.', short: 'Stain followed wind-driven rain', why: 'Staining after wind-driven rain fits water entering the wall or roof, and does not fit a snow, freezing, or steady plumbing cause.', m: [1.8, 1.8, 0.5, 0.5, 0.3] },
  WX_ROOF: { text: 'Weather records show heavy, steady rain in warm weather before each stain, with little wind.', short: 'Stains follow heavy, calm rain', why: 'Stains after heavy rain with little wind fit roof water pouring down more than wind-driven window leaks, and no snow rules out an ice dam.', m: [0.7, 2.5, 0.4, 0.5, 0.2] },
  WX_COND: { text: 'Weather records show the stain grows only during cold snaps below 0 °F, with no rain and no snowmelt.', short: 'Grows in cold snaps, no rain', why: 'Growth in dry cold weather fits indoor moisture condensing on a cold surface, since rain and melt leaks need precipitation.', m: [0.3, 0.3, 3, 0.8, 1.3] },
  WX_PLUMB: { text: 'Weather records show no link between the stain and rain, snow, or cold. It grows steadily, week after week.', short: 'No link to the weather', why: 'A stain that ignores the weather points to a source inside the building, such as a pipe.', m: [0.3, 0.3, 0.4, 3, 0.3] },
  WX_ICE: { text: 'Weather records show a hard freeze after heavy snow, then a thaw, with icicles reported at the eave before the stain appeared.', short: 'Thaw after snow and freeze, icicles', why: 'A thaw after snow and a hard freeze, with icicles at the eave, is the classic setting for an ice dam.', m: [0.4, 1.5, 1.2, 0.5, 5] }
};

// ---- Data: the five cases. The hidden cause is the case index. mm and ir are polylines in cutaway units (100 x 64) ----
const CASES = [
  { suffix: 'FLASH', mm: { pts: [[13, 36], [13, 31], [17, 30.2], [24, 30.2]], w: 3.5 }, ir: { pts: [[13, 37], [13, 46]], w: 3, warm: false }, tag: { x: 13, y: 36, t: 'No flashing at head', lx: 19, ly: 41.5 }, wx: 'Rain, wind-driven',
    lesson: 'Cheap, non-destructive tools pointed to the window head, so opening the wall only confirms what the evidence already showed.' },
  { suffix: 'ROOF', mm: { pts: [[40, 15.5], [40, 26], [33, 29.8], [27, 30.2]], w: 3.5 }, ir: { pts: [[36, 29.4], [44, 29.4]], w: 4, warm: false }, tag: { x: 40, y: 15.5, t: 'Roof seam and drain', lx: 46, ly: 21 }, wx: 'Heavy rain, calm',
    lesson: 'Wetness spreading down from the roof seam after calm, heavy rain pointed upward, so testing and opening the wall were wasted effort.' },
  { suffix: 'COND', mm: { pts: [[17, 29.4], [50, 29.4]], w: 2.2 }, ir: { pts: [[17, 29.4], [52, 29.4]], w: 3, warm: false }, tag: { x: 30, y: 29.4, t: 'Thin insulation', lx: 34, ly: 21 }, wx: 'Cold snap, dry',
    lesson: 'Weather and the damp pattern separated condensation from leaks. The cure is insulation, air sealing, and a vapor retarder, not flashing or roofing.' },
  { suffix: 'PLUMB', mm: { pts: [[30, 25.5], [29, 29.5]], w: 3 }, ir: { pts: [[28, 25.5], [58, 25.5]], w: 2.5, warm: true }, tag: { x: 50, y: 25.5, t: 'Hot-water pipe', lx: 52, ly: 21 }, wx: 'No weather link',
    lesson: 'A warm or wet spot centered on the pipe, with no link to the weather, points to plumbing. A pressure test of the line would confirm it.' },
  { suffix: 'ICE', mm: { pts: [[6, 22.4], [12, 25.5], [17, 28.5], [24, 30.2]], w: 3 }, ir: { pts: [[3, 22.3], [20, 27.5]], w: 2.5, warm: false }, tag: { x: 6, y: 22.4, t: 'No eave membrane', lx: 30, ly: 21.5 }, wx: 'Thaw after snow',
    lesson: 'Weather records and wetness limited to the eave separated an ice dam from an ordinary roof leak. The remedy is insulation and air sealing at the eave.' }
];

function obsFor(c, t) {
  const k = TOOLS[t].key;
  if (c !== 0 && k === 'WT') return OBS.WT_NONE;
  if (c !== 0 && k === 'OW') return OBS.OW_DRY;
  return OBS[k + '_' + CASES[c].suffix];
}

// ---- State ----
let caseIdx = 0;          // index of the hidden cause
let evidence = [];        // tool indexes in the order used
let lastTool = -1;
let submitted = false, choice = -1, resultInfo = null;
let hypRects = [];        // hover rectangles of the hypothesis rows
let cutRect = {};

// ---- Controls ----
let toolButtons = [], submitButton, causeSelect, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  TOOLS.forEach((t, i) => {
    const b = createButton(t.label);
    b.mousePressed(() => useTool(i));
    toolButtons.push(b);
  });
  submitButton = createButton('Submit conclusion');
  submitButton.mousePressed(() => { if (!submitted) { causeSelect.show(); positionControls(); } });
  causeSelect = createSelect();
  causeSelect.option('Choose the most likely cause...', '');
  HYP.forEach((h, i) => causeSelect.option(h.name, String(i)));
  causeSelect.selected('');
  causeSelect.changed(() => { if (causeSelect.value() !== '') submitConclusion(+causeSelect.value()); });
  causeSelect.hide();
  resetButton = createButton('Reset');
  resetButton.mousePressed(newCase);

  positionControls();
  describe('A cutaway of the Riverbend classroom wall and roof with a brown ceiling stain, a window, a roof seam, and a hot-water pipe. Six investigation tool buttons each reveal a finding on the cutaway and move confidence meters for five hypotheses: missing window flashing, roof leak, condensation, plumbing leak, and ice dam. Each hypothesis is labeled supported, undecided, or eliminated. A Submit conclusion button opens a menu to name the cause, and a Reset button starts a new case with a different hidden cause.', LABEL);
}

// ---- Controls flow left to right and wrap to the next row ----
function positionControls() {
  const els = [...toolButtons, submitButton];
  if (causeSelect.elt.style.display !== 'none') els.push(causeSelect);
  els.push(resetButton);
  causeSelect.size(230);
  let x = 10, y = drawHeight + 6;
  els.forEach(el => {
    const w = el.elt.offsetWidth || 120;
    if (x + w > canvasWidth - 8 && x > 10) { x = 10; y += 35; }
    el.position(x, y);
    x += w + 6;
  });
}

// ---- Evidence model: confidence is the normalized product of the multipliers of the findings so far ----
function confidences(list) {
  const p = [1, 1, 1, 1, 1];
  list.forEach(t => obsFor(caseIdx, t).m.forEach((m, i) => { p[i] *= m; }));
  const s = p.reduce((a, b) => a + b, 0);
  return p.map(v => v / s);
}

function hypStatus(c) { return c >= SUPPORT_AT ? 'supported' : (c <= ELIMINATE_AT ? 'eliminated' : 'undecided'); }

function hoursUsed() { return evidence.reduce((a, t) => a + TOOLS[t].hours, 0); }

function useTool(t) {
  if (submitted || evidence.includes(t)) return;
  evidence.push(t);
  lastTool = t;
  toolButtons[t].elt.disabled = true;
}

// cheapest non-destructive set of tools that makes the true cause at least 85 percent likely
function efficientSequence() {
  let best = null;
  for (let mask = 1; mask < 64; mask++) {
    const set = [];
    for (let t = 0; t < 6; t++) if (mask & (1 << t)) set.push(t);
    if (set.some(t => TOOLS[t].destructive)) continue;
    const c = confidences(set)[caseIdx];
    const cost = set.reduce((a, t) => a + TOOLS[t].hours, 0);
    if (c >= EFFICIENT_AT && (!best || cost < best.cost || (cost === best.cost && set.length < best.set.length))) best = { set, cost, c };
  }
  best.set.sort((a, b) => TOOLS[a].hours - TOOLS[b].hours);
  return best;
}

function submitConclusion(i) {
  submitted = true;
  choice = i;
  const c = confidences(evidence);
  resultInfo = { right: i === caseIdx, conf: c[i], eff: efficientSequence(), hours: hoursUsed() };
  toolButtons.forEach(b => { b.elt.disabled = true; });
  causeSelect.hide();
  submitButton.elt.disabled = true;
  positionControls();
}

function newCase() {
  const others = [0, 1, 2, 3, 4].filter(i => i !== caseIdx);
  caseIdx = others[floor(random(others.length))];
  evidence = []; lastTool = -1; submitted = false; choice = -1; resultInfo = null;
  toolButtons.forEach(b => { b.elt.disabled = false; });
  submitButton.elt.disabled = false;
  causeSelect.selected('');
  causeSelect.hide();
  positionControls();
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
  text('Forensic Leak Investigation Simulator', canvasWidth / 2, 6);

  const wide = canvasWidth >= WIDE_MIN;
  const conf = confidences(evidence);
  let cx, cy, cw, ch, kx, ky, kw, kh, hx, hy, hw, rowH;
  if (wide) {
    const leftW = floor(canvasWidth * 0.46);
    cx = 10; cy = 42; cw = leftW - 10; ch = min(cw * 0.64, 230);
    kx = 10; ky = cy + ch + 8; kw = cw; kh = drawHeight - ky - 8;
    hx = leftW + 14; hy = 42; hw = canvasWidth - hx - 10; rowH = floor((drawHeight - hy - 40) / 5);
  } else {
    cx = 8; cy = 38; cw = canvasWidth - 16; ch = min(176, cw * 0.64);
    kx = 8; ky = cy + ch + 6; kw = cw; kh = 128;
    hx = 8; hy = ky + kh + 6; hw = cw; rowH = floor((drawHeight - hy - 4) / 5);
  }
  cutRect = { x: cx, y: cy, w: cw, h: ch };
  drawCutaway(cutRect, conf);
  drawCard(kx, ky, kw, kh, wide);
  drawHypotheses(hx, hy, hw, rowH, conf, wide);
  if (wide) drawHoursNote(hx, hy + rowH * 5 + 6, hw);
  drawTooltip();
}

// ---- Cutaway of the Riverbend classroom wall and roof ----
function roofY(x) { return 22 - (x - 4) * 16 / 90; }

function drawCutaway(c, conf) {
  const s = min(c.w / 100, c.h / 64);
  const ox = c.x + (c.w - 100 * s) / 2, oy = c.y + (c.h - 64 * s) / 2;
  const X = u => ox + u * s, Y = v => oy + v * s;
  stroke('silver');
  strokeWeight(1);
  fill('white');
  rect(c.x, c.y, c.w, c.h, 6);

  // ground, floor, room, ceiling cavity
  noStroke();
  fill('burlywood'); rect(X(0), Y(56), 100 * s, 8 * s);
  fill('lightgray'); rect(X(10), Y(52), 86 * s, 4 * s);
  fill('floralwhite'); rect(X(16), Y(30), 76 * s, 22 * s);
  fill('whitesmoke');
  quad(X(16), Y(30), X(92), Y(30), X(92), Y(roofY(92)), X(16), Y(roofY(16)));
  // exterior wall and window
  stroke('dimgray'); strokeWeight(1);
  fill('tan'); rect(X(10), Y(23), 6 * s, 29 * s);
  fill('lightcyan'); rect(X(10), Y(36), 6 * s, 12 * s);
  fill('tan'); rect(X(92), Y(6), 4 * s, 46 * s);
  // roof slab, ceiling, pipe
  stroke('slategray'); strokeWeight(max(3, 2.6 * s)); strokeCap(SQUARE);
  line(X(2), Y(roofY(2) + 1), X(95), Y(roofY(95) + 1));
  stroke('dimgray'); strokeWeight(3);
  line(X(16), Y(30), X(92), Y(30));
  stroke('steelblue'); strokeWeight(max(3, 1.4 * s));
  line(X(28), Y(25.5), X(70), Y(25.5));
  stroke('dimgray'); strokeWeight(1); fill('dimgray');
  rect(X(38.5), Y(roofY(40) - 2.5), 3 * s, 2.5 * s);
  // the ceiling stain
  noStroke(); const sc = color('sienna'); sc.setAlpha(170); fill(sc);
  ellipse(X(24), Y(30.7), 16 * s, 3.2 * s);

  // static labels
  fill('black'); textSize(12); textAlign(LEFT, CENTER);
  text('Window', X(17.5), Y(50.5));
  text('Ceiling stain', X(34), Y(34.5));
  textAlign(CENTER, CENTER); text('Roof', X(80), Y(roofY(80) - 4));
  textAlign(LEFT, CENTER); text('Pipe', X(72), Y(25.5));

  drawEvidence(CASES[caseIdx], X, Y, s);

  // hours counter, in the strip of soil under the building where the test results are also written
  tagLabel('Hours: ' + hoursUsed().toFixed(1), X(99), Y(60), RIGHT);
}

function withAlpha(name, a) { const col = color(name); col.setAlpha(a); return col; }

function polyline(pts, X, Y, wUnits, s, col) {
  noFill(); stroke(col); strokeWeight(max(4, wUnits * s)); strokeJoin(ROUND); strokeCap(ROUND);
  beginShape(); pts.forEach(p => vertex(X(p[0]), Y(p[1]))); endShape();
}

function tagLabel(str, x, y, align) {
  textSize(12); textAlign(align, CENTER);
  const w = textWidth(str) + 8;
  noStroke(); fill(255, 255, 255, 230);
  rect(align === RIGHT ? x - w : x, y - 9, w, 18, 4);
  fill('black'); text(str, align === RIGHT ? x - 4 : x + 4, y);
}

// the finding of each tool that has been used, drawn on the cutaway
function drawEvidence(cs, X, Y, s) {
  // key for the colored bands, top left of the cutaway
  const key = [];
  if (evidence.some(t => TOOLS[t].key === 'MM')) key.push(['dodgerblue', 'Wet (moisture scan)']);
  if (evidence.some(t => TOOLS[t].key === 'IR')) key.push([cs.ir.warm ? 'orangered' : 'slateblue', cs.ir.warm ? 'Warm (infrared)' : 'Cool (infrared)']);
  if (evidence.some(t => TOOLS[t].key === 'WX')) key.push([null, 'Weather: ' + cs.wx]);
  key.forEach((k, i) => {
    const ky = Y(0.8 + i * 4.8) + 1;
    if (k[0]) { stroke('dimgray'); strokeWeight(1); fill(k[0]); rect(X(1), ky, 12, 12); }
    noStroke(); fill('black'); textSize(12); textAlign(LEFT, CENTER);
    text(k[1], X(1) + (k[0] ? 17 : 0), ky + 6);
  });
  evidence.forEach(t => {
    const k = TOOLS[t].key;
    if (k === 'MM') {
      polyline(cs.mm.pts, X, Y, cs.mm.w, s, withAlpha('dodgerblue', 140));
    } else if (k === 'IR') {
      polyline(cs.ir.pts, X, Y, cs.ir.w, s, withAlpha(cs.ir.warm ? 'orangered' : 'slateblue', 130));
    } else if (k === 'DR') {
      stroke('purple'); strokeWeight(2); fill('white');
      circle(X(cs.tag.x), Y(cs.tag.y), 9);
      line(X(cs.tag.x), Y(cs.tag.y), X(cs.tag.lx), Y(cs.tag.ly));
      tagLabel(cs.tag.t, X(cs.tag.lx), Y(cs.tag.ly), LEFT);
    } else if (k === 'WT') {
      stroke('dodgerblue'); strokeWeight(2);
      for (let v = 26; v <= 46; v += 5) { line(X(1), Y(v), X(8), Y(v)); line(X(8), Y(v), X(6.4), Y(v - 1.3)); line(X(8), Y(v), X(6.4), Y(v + 1.3)); }
      if (caseIdx === 0) {
        stroke('dodgerblue'); strokeWeight(2); line(X(13), Y(37), X(13), Y(44)); line(X(20), Y(31.5), X(20), Y(36));
        tagLabel('LEAK at head', X(1), Y(60), LEFT);
      } else tagLabel('no leak', X(1), Y(60), LEFT);
    } else if (k === 'OW') {
      stroke('black'); strokeWeight(2);
      fill(caseIdx === 0 ? 'saddlebrown' : 'wheat');
      rect(X(9), Y(32), 8 * s, 6 * s);
      tagLabel(caseIdx === 0 ? 'wall: soft, no flashing' : 'wall: dry, sound', X(32), Y(60), LEFT);
    }
  });
}

// ---- Evidence card: the latest finding and why it matters; or the result after the conclusion ----
function drawCard(x, y, w, h, wide) {
  stroke('silver'); strokeWeight(1); fill('white');
  rect(x, y, w, h, 8);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  const pad = 8;
  if (submitted) { drawResult(x + pad, y + 5, w - 2 * pad); return; }
  if (lastTool < 0) {
    textSize(15); textStyle(BOLD); text('Case: a brown stain on the classroom ceiling', x + pad, y + 5, w - 2 * pad); textStyle(NORMAL);
    textSize(14);
    text('Use the tools below, once each, to gather evidence. Each costs hours. Then submit your conclusion about the cause.', x + pad, y + 28, w - 2 * pad);
    return;
  }
  const o = obsFor(caseIdx, lastTool);
  textSize(14); textStyle(BOLD);
  text(TOOLS[lastTool].label + ' (+' + TOOLS[lastTool].hours + ' h)', x + pad, y + 5, w - 2 * pad);
  textStyle(NORMAL);
  text('Finding: ' + o.text, x + pad, y + 24, w - 2 * pad);
  const textH = wide ? 74 : 56;
  fill('navy'); text('Why: ' + o.why, x + pad, y + 24 + textH, w - 2 * pad);
  if (wide && evidence.length > 1) {
    fill('dimgray'); textSize(12);
    let ly = y + h - 6 - 14 * evidence.length;
    evidence.forEach(t => { text((TOOLS[t].label) + ': ' + obsFor(caseIdx, t).short, x + pad, ly, w - 2 * pad); ly += 14; });
  }
}

function drawResult(x, y, w) {
  const r = resultInfo;
  textSize(15); textStyle(BOLD);
  fill(r.right ? 'seagreen' : 'darkorange');
  const head = r.right ? 'Correct: ' + HYP[caseIdx].name + '.' : 'Not quite. The hidden cause was ' + HYP[caseIdx].name + '.';
  const headLines = wrapLines(head, w).length;
  text(head, x, y, w);
  textStyle(NORMAL); textSize(14); fill('black');
  const yourPick = 'You chose ' + HYP[choice].name + ' (' + round(r.conf * 100) + '% on your evidence, ' + hypStatus(r.conf) + '). ';
  const used = r.hours + ' hours used. ';
  const seq = 'An efficient sequence: ' + r.eff.set.map(t => TOOLS[t].label).join(', ') + ' (' + r.eff.cost + ' hours). ';
  text(yourPick + used + seq + CASES[caseIdx].lesson, x, y + 8 + headLines * 18, w);
}

// ---- Hypothesis panel: name, last effect, and a confidence meter with status written as text ----
function lastEffect(i) {
  if (lastTool < 0) return '';
  const m = obsFor(caseIdx, lastTool).m[i];
  const eff = m >= 3 ? 'supports' : m >= 1.3 ? 'supports a little' : m > 0.7 ? 'no change' : m > 0.1 ? 'weakens' : 'rules out';
  return 'Last finding: ' + eff;
}

function drawHypotheses(x, y, w, rowH, conf, wide) {
  hypRects = [];
  for (let i = 0; i < 5; i++) {
    const ry = y + i * rowH, st = hypStatus(conf[i]);
    const col = st === 'supported' ? 'mediumseagreen' : (st === 'eliminated' ? 'darkgray' : 'gold');
    const rr = { x, y: ry, w, h: rowH - 4 };
    hypRects.push(rr);
    stroke(st === 'eliminated' ? 'silver' : 'dimgray'); strokeWeight(1);
    fill(st === 'eliminated' ? 'whitesmoke' : 'white');
    rect(rr.x, rr.y, rr.w, rr.h, 6);
    noStroke();
    fill(st === 'eliminated' ? 'dimgray' : 'black');
    textAlign(LEFT, TOP);
    const bw = wide ? w - 20 : w * 0.46, bh = wide ? 20 : 22;
    const bx = wide ? x + 10 : x + w - bw - 8, by = wide ? ry + rr.h - bh - 6 : ry + (rr.h - bh) / 2;
    if (wide) {
      textSize(16); textStyle(BOLD); text(HYP[i].name, x + 10, ry + 5); textStyle(NORMAL);
      textSize(13); fill('dimgray'); textAlign(RIGHT, TOP); text(lastEffect(i), x + w - 10, ry + 8); textAlign(LEFT, TOP);
    } else {
      textSize(14); textStyle(BOLD); text(HYP[i].name, x + 8, ry + 3, w * 0.5 - 8); textStyle(NORMAL);
      textSize(12); fill('dimgray'); text(lastEffect(i).replace('Last finding: ', ''), x + 8, ry + rr.h - 14);
    }
    stroke('gray'); strokeWeight(1); fill('white'); rect(bx, by, bw, bh, 4);
    noStroke(); fill(col); rect(bx + 1, by + 1, max(2, (bw - 2) * conf[i]), bh - 2, 3);
    fill('black'); textSize(13); textAlign(LEFT, CENTER);
    text(round(conf[i] * 100) + '% ' + st, bx + 6, by + bh / 2 + 1);
    if (st === 'eliminated' && wide) { textSize(16); stroke('dimgray'); strokeWeight(1); line(x + 10, ry + 14, x + 10 + textWidth(HYP[i].name), ry + 14); }
  }
}

function drawHoursNote(x, y, w) {
  noStroke(); fill('black'); textSize(14); textAlign(LEFT, TOP);
  text('Tools used: ' + evidence.length + ' of 6. Hours spent: ' + hoursUsed() + '. Hover a hypothesis to see what would confirm it.', x, y, w);
}

// ---- Hover: what evidence would confirm a hypothesis ----
function drawTooltip() {
  if (mouseY < 0 || mouseY > drawHeight) return;
  let msg = null;
  hypRects.forEach((r, i) => { if (mouseX >= r.x && mouseX <= r.x + r.w && mouseY >= r.y && mouseY <= r.y + r.h) msg = HYP[i].name + '. ' + HYP[i].confirm; });
  if (!msg) return;
  textSize(14);
  const w = min(canvasWidth - 8, 330);
  const lines = wrapLines(msg, w - 16);
  const h = lines.length * 17 + 10;
  const tx = constrain(mouseX - w - 10 > 4 ? mouseX - w - 10 : mouseX + 14, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 12, 4, drawHeight - h - 4);
  stroke('navy'); strokeWeight(1); fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke(); fill('black'); textAlign(LEFT, TOP);
  lines.forEach((l, k) => text(l, tx + 8, ty + 5 + k * 17));
}

function wrapLines(str, w) {
  const out = [];
  let ln = '';
  for (const word of str.split(' ')) {
    const t = ln ? ln + ' ' + word : word;
    if (textWidth(t) > w && ln) { out.push(ln); ln = word; } else ln = t;
  }
  if (ln) out.push(ln);
  return out;
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
