// Permit-to-Occupancy Flow MicroSim - flowchart from zoning check to certificate of occupancy with forced-failure loops, a review-time total, and a skipped-inspection consequence
// CANVAS_HEIGHT: 543
// Bloom Level 3 (Apply) + Level 4 (Analyze)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 428;
let controlHeight = 115; // three rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 240; // left edge of the slider; the label sits to its left
let defaultTextSize = 16;

// ---- Roles: fill and border color, plus a border style so role is never shown by color alone ----
const roles = {
  designer:   { name: 'Designer',       fill: 'lightskyblue', line: 'steelblue', dash: [] },
  official:   { name: 'Building official', fill: 'palegreen',  line: 'seagreen',  dash: [8, 4] },
  contractor: { name: 'Contractor',     fill: 'navajowhite',  line: 'darkorange', dash: [12, 4, 2, 4] },
  testing:    { name: 'Testing agency', fill: 'lightgray',    line: 'dimgray',   dash: [2, 4] }
};

// ---- Data: nine boxes (num = order in the chapter) and four decision diamonds ----
const info = {
  zon: { num: 1, label: 'Zoning check', role: 'designer', acts: 'Designer, with the zoning office', makes: 'Confirmation that the use and footprint are permitted in the district',
    def: 'Zoning is a local land-use law that controls what may be built on a parcel and how the building sits on it. It is checked first, because a building that is not permitted on the site never reaches building-code review.' },
  app: { num: 2, label: 'Permit application', role: 'designer', acts: 'Designer, for the owner', makes: 'Application form, construction documents, and fee',
    def: 'The application is the form, construction documents, and fee submitted to the jurisdiction. In many cities the fee is calculated from the estimated construction value.' },
  rev: { num: 3, label: 'Plan review', role: 'official', acts: 'Building official (plan reviewer)', makes: 'Comments to correct, or approved and stamped plans',
    def: 'Plan review is the process by which the building official examines the construction documents for compliance with the code before issuing a permit. Reviewers can only judge what the documents show.' },
  cor: { num: 4, label: 'Corrections and resubmittal', role: 'designer', acts: 'Designer', makes: 'Revised documents and a written response to each comment',
    def: 'The design team revises the documents and answers every reviewer comment in writing, then resubmits for a second review. The Riverbend schedule allows 5 business days.' },
  per: { num: 5, label: 'Permit issued', role: 'official', acts: 'Building official', makes: 'Building permit and stamped plans kept on site',
    def: 'A building permit is the official written authorization to begin specified construction work. It stays posted on site and expires if work does not begin or stops for a long period.' },
  ins: { num: 6, label: 'Inspections during construction', role: 'official', acts: 'Building official\'s inspector; the contractor requests each inspection', makes: 'Approval, or a list of corrections',
    def: 'Code inspections are visits by the inspectors to verify that the work matches the approved plans and the code. They happen before the work is covered, and a failed item is fixed and reinspected before work proceeds.' },
  spe: { num: 7, label: 'Special inspections and tests', role: 'testing', acts: 'Independent testing agency hired by the owner', makes: 'Inspection reports and test data for the building official',
    def: 'Special inspections are made by an independent qualified agency hired by the owner, not by the building department. Their reports and test data support the certificate of occupancy.' },
  fin: { num: 8, label: 'Final inspection', role: 'official', acts: 'Building official, often with the fire marshal', makes: 'Final approval, or items to correct',
    def: 'The final inspection is made when everything is complete and confirms that the finished building matches the approved plans and the code. A building that has not passed final inspection cannot legally be occupied.' },
  occ: { num: 9, label: 'Certificate of occupancy', role: 'official', acts: 'Building official', makes: 'Certificate stating the use and approved occupant load',
    def: 'A certificate of occupancy states that a building has been inspected and complies with the code, and that it may be occupied for its stated use. It lists the occupancy classification.' },
  d1: { label: 'Comments?', role: 'official', acts: 'Plan reviewer decides', makes: 'Yes sends the design back for corrections; No issues the permit',
    def: 'Yes: the reviewer returns comments, and the design team corrects and resubmits for a shorter second review. No: the permit is issued.' },
  d2: { label: 'Pass?', role: 'official', acts: 'Inspector decides', makes: 'Fail sends the work back to the contractor',
    def: 'Fail: the contractor corrects the work and requests reinspection before covering it. Pass: work may be covered and continue.' },
  d3: { label: 'Pass?', role: 'testing', acts: 'Testing agency decides', makes: 'Fail sends the work back for correction and retesting',
    def: 'Fail: the work is corrected and retested, for example a concrete or weld failure. Pass: the report goes to the building official.' },
  d4: { label: 'Pass?', role: 'official', acts: 'Inspector decides', makes: 'Fail repeats the final inspection after corrections',
    def: 'Fail: the listed items are corrected and the final inspection is repeated. Pass: the certificate of occupancy can be issued.' }
};

// Illustrative schedule numbers (the permit arithmetic is the chapter's; the construction-stage numbers are not)
const RESUBMIT_DAYS = 5;     // designer answers comments (Riverbend example)
const FAIL_DAYS = 5;         // illustrative: about 3 days to correct plus 2 to reinspect
const WAIT_SAVED = 2;        // illustrative: days saved by not waiting for the inspector
const UNCOVER_DAYS = 7;      // illustrative: open the work, inspect, and close it again

// ---- State ----
let commentsOn = true;       // Riverbend example: the first review returns comments
let failIns = false, failSpe = false, failFin = false;
let skipOn = false;
let hoverId = null;
let cardId = null;           // node id, or 'skip', whose infobox is open
let nodes = {}, edges = [];

// ---- Controls ----
let reviewSlider, commentsBox, insBox, speBox, finBox, skipButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  reviewSlider = createSlider(5, 25, 15, 1);
  reviewSlider.size(sliderWidth());
  commentsBox = createCheckbox('Review comments', true);
  commentsBox.changed(() => { commentsOn = commentsBox.checked(); });
  insBox = createCheckbox('Fail inspection', false);
  insBox.changed(() => { failIns = insBox.checked(); });
  speBox = createCheckbox('Fail special test', false);
  speBox.changed(() => { failSpe = speBox.checked(); });
  finBox = createCheckbox('Fail final', false);
  finBox.changed(() => { failFin = finBox.checked(); });
  skipButton = createButton('Skip an inspection');
  skipButton.mousePressed(toggleSkip);
  positionControls();

  describe('A flowchart from zoning check through permit application, plan review with a comments decision and a corrections loop, permit issued, inspections during construction, special inspections and tests, final inspection, and certificate of occupancy, each inspection followed by a pass decision with a return loop. Boxes are colored by who acts: designer, building official, contractor, or testing agency. A slider sets business days per review and a running total of permit time updates. Checkboxes force a failure at each decision, and a button skips an inspection to show the cost of uncovering covered work.', LABEL);
}

function isWide() { return canvasWidth >= 660; }
function sliderWidth() { return constrain(canvasWidth - sliderLeftMargin - 10, 90, 240); }

function positionControls() {
  const y1 = drawHeight + 8, y2 = drawHeight + 43, y3 = drawHeight + 78;
  reviewSlider.position(sliderLeftMargin, y1);
  reviewSlider.size(sliderWidth());
  if (isWide()) {
    skipButton.position(sliderLeftMargin + sliderWidth() + 25, y1 - 3);
    commentsBox.position(10, y2);
    insBox.position(190, y2);
    speBox.position(340, y2);
    finBox.position(500, y2);
  } else {
    commentsBox.position(10, y2);
    insBox.position(175, y2);
    finBox.position(312, y2);
    speBox.position(10, y3);
    skipButton.position(160, y3 - 3);
  }
}

function toggleSkip() {
  skipOn = !skipOn;
  skipButton.html(skipOn ? 'Do not skip it' : 'Skip an inspection');
  cardId = skipOn ? 'skip' : null;
}

// ---- Schedule arithmetic: first review R, resubmittal 5, second review about two thirds of R (15 + 5 + 10 for R = 15) ----
function reviewDays() { return reviewSlider.value(); }
function secondReview() { return round(reviewDays() * 2 / 3); }
function permitDays() { return reviewDays() + (commentsOn ? RESUBMIT_DAYS + secondReview() : 0); }
function failureEvents() { return (failIns && !skipOn ? 1 : 0) + (failSpe ? 1 : 0) + (failFin && !skipOn ? 1 : 0); }
function isActive(k) {
  if (k === 'd1') return commentsOn;
  if (k === 'd2') return failIns && !skipOn;
  if (k === 'd3') return failSpe;
  return failFin || skipOn;
}

// ---- Layout: wide = two rows left to right; narrow = three rows in a snake so it fits a phone ----
function node(id, kind, x, y, w, h) {
  nodes[id] = { id: id, kind: kind, x: x, y: y, w: w, h: h, cx: x + w / 2, cy: y + h / 2 };
}

function layout() {
  nodes = {}; edges = [];
  const wide = isWide(), W = canvasWidth;
  const bh = 56, dh = 46, g = wide ? 22 : 12, dwC = wide ? 88 : 80, dwP = wide ? 60 : 54;
  const bw = wide ? min(150, floor((W - 20 - 3 * dwP - 6 * g) / 4)) : min(150, floor((W - 20 - dwC - 3 * g) / 3));
  const y0 = wide ? 90 : 78, dy = (bh - dh) / 2;   // dy centers a diamond on its row
  node('zon', 'box', 10, y0, bw, bh);
  node('app', 'box', 10 + (bw + g), y0, bw, bh);
  node('rev', 'box', 10 + 2 * (bw + g), y0, bw, bh);
  node('d1', 'dia', 10 + 3 * (bw + g), y0 + dy, dwC, dh);
  const N = nodes;
  if (wide) {
    node('cor', 'box', N.rev.x, 36, bw, 42);
    node('per', 'box', N.d1.x + dwC + g, y0, bw, bh);
    const y1 = y0 + bh + 40;
    node('ins', 'box', 10, y1, bw, bh);
    node('d2', 'dia', N.ins.x + bw + g, y1 + dy, dwP, dh);
    node('spe', 'box', N.d2.x + dwP + g, y1, bw, bh);
    node('d3', 'dia', N.spe.x + bw + g, y1 + dy, dwP, dh);
    node('fin', 'box', N.d3.x + dwP + g, y1, bw, bh);
    node('d4', 'dia', N.fin.x + bw + g, y1 + dy, dwP, dh);
    node('occ', 'box', N.d4.x + dwP + g, y1, bw, bh);
  } else {
    node('cor', 'box', N.app.x, 36, N.rev.x + bw - N.app.x, 28);
    const rightEdge = N.d1.x + dwC, y1 = y0 + bh + 14;
    node('per', 'box', rightEdge - bw, y1, bw, bh);
    node('ins', 'box', N.per.x - g - bw, y1, bw, bh);
    node('d2', 'dia', N.ins.x - g - dwP, y1 + dy, dwP, dh);
    node('spe', 'box', N.d2.x - g - bw, y1, bw, bh);
    node('d3', 'dia', N.spe.cx - dwP / 2, y1 + bh + 12, dwP, dh);
    const y2 = N.d3.y + dh + 12;
    node('fin', 'box', N.spe.x, y2, bw, bh);
    node('d4', 'dia', N.fin.x + bw + g, y2 + dy, dwP, dh);
    node('occ', 'box', N.d4.x + dwP + g, y2, bw, bh);
  }
  buildEdges(wide);
}

function R(n) { return [n.x + n.w, n.cy]; }
function Lf(n) { return [n.x, n.cy]; }
function T(n) { return [n.cx, n.y]; }
function B(n) { return [n.cx, n.y + n.h]; }
function addEdge(pts, loop, label, lx, ly) { edges.push({ pts: pts, loop: loop || null, label: label || '', lx: lx, ly: ly }); }

function buildEdges(wide) {
  const N = nodes, depth = 20;
  addEdge([R(N.zon), Lf(N.app)]);
  addEdge([R(N.app), Lf(N.rev)]);
  addEdge([R(N.rev), Lf(N.d1)]);
  // comments loop: Yes goes up and left to the corrections box, then down into plan review
  addEdge([T(N.d1), [N.d1.cx, N.cor.cy], R(N.cor)], 'd1', 'Yes', N.d1.cx + 14, N.d1.y - 13);
  addEdge([[N.rev.cx, N.cor.y + N.cor.h], T(N.rev)], 'd1');
  if (wide) {
    addEdge([R(N.d1), Lf(N.per)], null, 'No', N.d1.x + N.d1.w + 12, N.d1.cy - 12);
    addEdge([B(N.per), [N.per.cx, N.per.y + N.per.h + 17], [N.ins.cx, N.per.y + N.per.h + 17], T(N.ins)]);
    addEdge([R(N.ins), Lf(N.d2)]);
    addEdge([R(N.d2), Lf(N.spe)]);
    addEdge([R(N.spe), Lf(N.d3)]);
    addEdge([R(N.d3), Lf(N.fin)]);
  } else {
    addEdge([B(N.d1), [N.d1.cx, N.per.y]], null, 'No', N.d1.cx + 14, N.d1.y + N.d1.h + 10);
    addEdge([Lf(N.per), R(N.ins)]);
    addEdge([Lf(N.ins), R(N.d2)]);
    addEdge([Lf(N.d2), R(N.spe)]);
    addEdge([B(N.spe), T(N.d3)]);
    addEdge([B(N.d3), T(N.fin)]);
  }
  addEdge([R(N.fin), Lf(N.d4)]);
  addEdge([R(N.d4), Lf(N.occ)]);
  // fail loops: from the bottom of a diamond back to the bottom of the box before it
  const u = (d, b, k) => { const y = d.y + d.h + depth; addEdge([B(d), [d.cx, y], [b.cx, y], B(b)], k, 'Fail', (d.cx + b.cx) / 2, y); };
  u(N.d2, N.ins, 'd2');
  u(N.d4, N.fin, 'd4');
  if (wide) u(N.d3, N.spe, 'd3');
  else { // narrow: a small loop to the right of the diamond back up into the special-inspection box
    const x = N.d3.x + N.d3.w + 14;
    addEdge([R(N.d3), [x, N.d3.cy], [x, N.spe.y + N.spe.h]], 'd3', 'Fail', x + 18, N.d3.cy + 12);
  }
}

// ---- Drawing helpers ----
function arrow(pts, col, wgt, dash) {
  stroke(col);
  strokeWeight(wgt);
  drawingContext.setLineDash(dash || []);
  noFill();
  for (let i = 0; i < pts.length - 1; i++) line(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]);
  drawingContext.setLineDash([]);
  const a = pts[pts.length - 2], b = pts[pts.length - 1];
  const ang = atan2(b[1] - a[1], b[0] - a[0]);
  noStroke();
  fill(col);
  push();
  translate(b[0], b[1]);
  rotate(ang);
  triangle(0, 0, -9, -4.5, -9, 4.5);
  pop();
}

function pill(label, x, y, bg, ink) {
  textSize(12);
  textAlign(CENTER, CENTER);
  const tw = textWidth(label) + 10;
  stroke('dimgray');
  strokeWeight(1);
  fill(bg);
  rect(x - tw / 2, y - 8, tw, 16, 8);
  noStroke();
  fill(ink);
  text(label, x, y);
}

function draw() {
  updateCanvasSize();
  layout();

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
  text('Permit-to-Occupancy Flow', canvasWidth / 2, 6);

  hoverId = null;
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) hoverId = nodeAt(mouseX, mouseY);
  cursor(hoverId ? HAND : ARROW);

  drawEdges();
  for (const id of Object.keys(nodes)) drawNode(nodes[id]);
  drawEdgeLabels();
  drawBadges();
  drawSummary();
  drawLegend();
  if (cardId) drawCard();
  else if (hoverId) drawTooltip();
  drawControlLabels();
}

function nodeAt(mx, my) {
  let hit = null;
  for (const id of Object.keys(nodes)) {
    const n = nodes[id];
    if (mx >= n.x && mx <= n.x + n.w && my >= n.y && my <= n.y + n.h) hit = id;
  }
  return hit;
}

function drawEdges() {
  for (const e of edges) {
    if (e.loop && isActive(e.loop)) arrow(e.pts, 'darkorange', 4);
    else if (e.loop) arrow(e.pts, 'darkgray', 1.5, [4, 4]);
    else arrow(e.pts, 'dimgray', 2.5);
  }
}

function drawEdgeLabels() {
  for (const e of edges) {
    if (!e.label) continue;
    const act = e.loop && isActive(e.loop);
    if (e.label === 'Yes' || e.label === 'No') {
      textSize(12);
      textAlign(LEFT, CENTER);
      noStroke();
      fill((e.label === 'Yes' && commentsOn) || (e.label === 'No' && !commentsOn) ? 'black' : 'gray');
      text(e.label, e.lx - 14, e.ly);
    } else {
      pill('Fail', e.lx, e.ly, act ? 'orange' : 'aliceblue', act ? 'black' : 'dimgray');
    }
  }
}

function drawNode(n) {
  const info_ = info[n.id], role = roles[info_.role];
  const isHover = (hoverId === n.id), isOpen = (cardId === n.id);
  const skippedDia = (n.id === 'd2' && skipOn);
  const active = (n.kind === 'dia') && isActive(n.id);
  stroke(isHover || isOpen ? 'black' : role.line);
  strokeWeight(isHover || isOpen ? 3 : 2);
  drawingContext.setLineDash(skippedDia ? [3, 3] : role.dash);
  fill(skippedDia ? 'white' : role.fill);
  if (n.kind === 'dia') quad(n.x, n.cy, n.cx, n.y, n.x + n.w, n.cy, n.cx, n.y + n.h);
  else rect(n.x, n.y, n.w, n.h, 8);
  drawingContext.setLineDash([]);
  noStroke();
  fill('black');
  textAlign(CENTER, CENTER);
  if (n.kind === 'dia') {
    textSize(12);
    text(skippedDia ? 'Skipped' : info_.label, n.cx, n.cy - 5);
    if (!skippedDia) text(n.id === 'd1' ? (commentsOn ? 'Yes' : 'No') : (active ? 'Fail' : 'Pass'), n.cx, n.cy + 9);
  } else {
    textSize(14);
    text(info_.label, n.x + 3, n.y, n.w - 6, n.h);
  }
}

// small tags: step number on each box, plus a repeat count where a loop is active
function drawBadges() {
  for (const id of Object.keys(nodes)) {
    const n = nodes[id], i = info[id];
    if (n.kind === 'box') pill(String(i.num), n.x + 12, n.y - 7, 'white', 'black');
  }
  const twice = [['rev', commentsOn], ['ins', failIns && !skipOn], ['spe', failSpe], ['fin', failFin && !skipOn]];
  for (const t of twice) if (t[1]) { const n = nodes[t[0]]; pill('done twice', n.x + n.w - 34, t[0] === 'rev' && isWide() ? n.y + n.h + 7 : n.y - 7, 'orange', 'black'); }
  if (skipOn) {
    pill('SKIPPED', nodes.ins.x + nodes.ins.w - 30, nodes.ins.y - 7, 'tomato', 'black');
    pill('covered work found', nodes.fin.x + nodes.fin.w - 54, nodes.fin.y - 7, 'tomato', 'black');
  }
}

// totals and consequence text, below the diagram
function drawSummary() {
  const x = 10, w = canvasWidth - 20, wide = isWide(), top = drawHeight - (wide ? 100 : 80);
  const R1 = reviewDays(), total = permitDays();
  noStroke();
  textAlign(LEFT, TOP);
  fill('navy');
  textSize(15);
  const arithmetic = commentsOn ? R1 + ' + ' + RESUBMIT_DAYS + ' + ' + secondReview() + ' = ' + total : R1 + ' = ' + total;
  text('Permit time: ' + arithmetic + ' business days (' + str(total / 5).replace(/\.0$/, '') + ' weeks)', x, top, w, 20);
  fill('black');
  textSize(14);
  const lead = commentsOn ? 'Review 1, resubmittal, review 2 (about two thirds of review 1).' : 'One review and no comments, so no resubmittal.';
  if (wide) text(lead, x, top + 19, w, 20);
  let msg;
  const f = failureEvents();
  if (skipOn) msg = 'Covered work is found at final inspection: about ' + UNCOVER_DAYS + ' days to uncover and re-close versus ' + WAIT_SAVED + ' saved (illustrative), plus repair cost.' + (f ? ' Other failures: +' + f * FAIL_DAYS + ' days.' : '');
  else if (f > 0) msg = 'After the permit: +' + f * FAIL_DAYS + ' business days from ' + f + (f === 1 ? ' failed inspection' : ' failed inspections') + ' (about ' + FAIL_DAYS + ' days each, illustrative).';
  else msg = 'Inspections pass the first time: no added delay after the permit.';
  fill(f > 0 || skipOn ? 'sienna' : 'seagreen');
  text(msg, x, top + (wide ? 38 : 20), w, 40);
}

function drawLegend() {
  const y = drawHeight - 14;
  textSize(14);
  textAlign(LEFT, CENTER);
  let x = 10;
  for (const k of ['designer', 'official', 'contractor', 'testing']) {
    const r = roles[k], label = (k === 'official' ? 'Official' : r.name);
    stroke(r.line);
    strokeWeight(2);
    drawingContext.setLineDash(r.dash);
    fill(r.fill);
    rect(x, y - 7, 18, 14, 3);
    drawingContext.setLineDash([]);
    noStroke();
    fill('black');
    text(label, x + 24, y);
    x += 24 + textWidth(label) + 14;
  }
}

function wrappedLines(str, w) { return max(1, ceil(textWidth(str) * 1.1 / w)); }

function drawTooltip() {
  const i = info[hoverId], n = nodes[hoverId];
  const w = min(canvasWidth - 20, 300);
  textSize(14);
  const a = 'Acts: ' + i.acts, b = (n.kind === 'dia' ? 'Decides: ' : 'Produces: ') + i.makes;
  const h = (wrappedLines(a, w - 16) + wrappedLines(b, w - 16)) * 17.5 + 16;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(a, tx + 8, ty + 7, w - 16, h);
  text(b, tx + 8, ty + 7 + wrappedLines(a, w - 16) * 17.5, w - 16, h);
}

// infobox: two-sentence definition for a node, or the skipped-inspection consequence
function drawCard() {
  const w = canvasWidth - 20, lead = 17.5;
  let title, body, anchorY;
  if (cardId === 'skip') {
    title = 'Skipping an inspection';
    body = 'Concrete poured or a wall closed before the inspector arrives hides the work. At final inspection the inspector can order it uncovered. Waiting for the inspector costs about ' + WAIT_SAVED + ' business days; uncovering, inspecting, and closing it again costs about ' + UNCOVER_DAYS + ' business days (both illustrative) plus the cost of opening and repairing finished work.';
    anchorY = nodes.ins.cy;
  } else {
    const i = info[cardId];
    title = (i.num ? i.num + '. ' : '') + i.label;
    body = (nodes[cardId].kind === 'dia' ? i.acts + '. ' : 'Acts: ' + i.acts + '. ') + i.def;
    anchorY = nodes[cardId].cy;
  }
  textSize(14);
  const h = 30 + wrappedLines(body, w - 20) * lead + 12;
  const x = (canvasWidth - w) / 2;
  const y = anchorY < drawHeight * 0.5 ? drawHeight - h - 6 : 36;
  stroke('navy');
  strokeWeight(2);
  fill('white');
  rect(x, y, w, h, 10);
  noStroke();
  fill('navy');
  textAlign(LEFT, TOP);
  textSize(16);
  text(title, x + 10, y + 7);
  fill('black');
  textSize(14);
  text(body, x + 10, y + 30, w - 20, h);
  fill('dimgray');
  textAlign(RIGHT, TOP);
  textSize(12);
  text('click to close', x + w - 8, y + 9);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Business days per review: ' + reviewDays(), 10, drawHeight + 20);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > canvasWidth || mouseY < 0 || mouseY > drawHeight) return;
  const hit = nodeAt(mouseX, mouseY);
  if (hit && hit !== cardId) cardId = hit;
  else cardId = null;
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
