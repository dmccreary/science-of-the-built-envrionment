// One-Line Diagram Symbol Explorer MicroSim - read the symbols and ratings of the Riverbend one-line diagram, trace the path to a load, and trip the main breaker
// CANVAS_HEIGHT: 520
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 90; // two rows of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 10;
let defaultTextSize = 16;

const WIDE_MIN = 700;
const NUM_LANES = 5; // loads LP-1, MP-1, oven, ATS, and the generator

// ---- Data: the Riverbend one-line diagram. d = row from the source (0 at top); lane = column (-1 = main chain).
// Ratings and wire sizes are illustrative; wire sizes follow 75 C copper ampacity. ----
const nodes = [
  { id: 'xfmr', type: 'xfmr', lane: -1, d: 0, parent: null, name: 'Pad-mounted utility transformer', tag: 'Transformer', rate: '75 kVA', lst: 'Transformer (75 kVA)',
    rating: '75 kVA, 12,470 V to 208Y/120 V (illustrative)', def: 'Two linked circles stand for two coils on one core that step the voltage down.', real: 'The green metal box on a concrete pad outside Riverbend. The utility owns it.' },
  { id: 'meter', type: 'meter', lane: -1, d: 1, parent: 'xfmr', name: 'Utility meter', tag: 'Meter', rate: '200 A', lst: 'Meter (200 A)', wire: ['3/0 AWG Cu', '3/0 Cu'],
    rating: '200 A meter socket', def: 'A circle with an M stands for the meter that records energy and demand.', real: 'The round meter on the outside wall of the electrical room.' },
  { id: 'main', type: 'breaker', lane: -1, d: 2, parent: 'meter', name: 'Main breaker (service disconnect)', tag: 'Main breaker', rate: '200 A', lst: '200 A main breaker', wire: ['3/0 AWG Cu', '3/0 Cu'],
    rating: '200 A, 3-pole', def: 'A square with a slash is a circuit breaker, an automatic switch that opens on overload or a short circuit.', real: 'The large breaker at the top of the main distribution panel. It can shut off the whole building.' },
  { id: 'mdp', type: 'bus', lane: -1, d: 3, parent: 'main', name: 'Main distribution panel (MDP)', tag: 'MDP', rate: '200 A bus', lst: 'MDP (200 A bus)', wire: ['3/0 AWG Cu', '3/0 Cu'],
    rating: '200 A bus, 208Y/120 V, 3-phase', def: 'A heavy bar stands for a panelboard: one feeder comes in and many breakers go out.', real: 'The gray steel cabinet on the electrical room wall with rows of breaker handles.' },

  { id: 'cbLP', type: 'breaker', lane: 0, d: 4, parent: 'mdp', name: 'Feeder breaker to LP-1', rate: '100 A', lst: '100 A feeder breaker',
    rating: '100 A, 3-pole', def: 'A breaker symbol on a feeder. It opens before the feeder wire can overheat.', real: 'A three-handle breaker in the MDP, labeled for LP-1.' },
  { id: 'feedLP', type: 'feeder', lane: 0, d: 4.5, parent: 'cbLP', name: 'Feeder to LP-1', rate: '#3 AWG', lst: 'Feeder to LP-1 (#3 AWG Cu)', wire: ['#3 AWG Cu', '#3 Cu'],
    rating: '#3 AWG copper, carries up to 100 A', def: 'A line with hash marks is a feeder. Each hash mark stands for one conductor (three phases and a neutral).', real: 'Wires in conduit running from the electrical room to the hallway closet.' },
  { id: 'lp1', type: 'panel', lane: 0, d: 5, parent: 'feedLP', name: 'Lighting panel LP-1', tag: 'LP-1', rate: '100 A', lst: 'Panel LP-1 (100 A)',
    rating: '100 A, 208Y/120 V', def: 'A short bar is a smaller panelboard, fed by a feeder from the MDP.', real: 'The panel in the hall closet that serves classroom lights and receptacles.' },
  { id: 'cbCL', type: 'breaker', lane: 0, d: 6, parent: 'lp1', name: 'Branch breaker, classroom lighting', rate: '20 A', lst: '20 A branch breaker',
    rating: '20 A, 1-pole', def: 'A breaker symbol on a branch circuit, the last protection before the lights.', real: 'One breaker handle in LP-1, labeled with a circuit number such as LP-1-7.' },
  { id: 'light', type: 'lamp', lane: 0, d: 7, parent: 'cbCL', name: 'Classroom lighting', tag: 'Classroom lighting', short: 'Lighting', load: true, lst: 'Classroom lighting (385 W)', wire: ['12 AWG Cu', '12 Cu'],
    rating: '11 luminaires, 385 W, 120 V', def: 'A circle with an X stands for a lighting load.', real: 'The ceiling luminaires in one Riverbend classroom.' },

  { id: 'cbMP', type: 'breaker', lane: 1, d: 4, parent: 'mdp', name: 'Feeder breaker to MP-1', rate: '100 A', lst: '100 A feeder breaker',
    rating: '100 A, 3-pole', def: 'A breaker symbol on a feeder, sized to protect the feeder wire.', real: 'A three-handle breaker in the MDP, labeled for MP-1.' },
  { id: 'feedMP', type: 'feeder', lane: 1, d: 4.5, parent: 'cbMP', name: 'Feeder to MP-1', rate: '#3 AWG', lst: 'Feeder to MP-1 (#3 AWG Cu)', wire: ['#3 AWG Cu', '#3 Cu'],
    rating: '#3 AWG copper, carries up to 100 A', def: 'A line with hash marks is a feeder. Each hash mark stands for one conductor.', real: 'Wires in conduit running from the electrical room to the mechanical panel.' },
  { id: 'mp1', type: 'panel', lane: 1, d: 5, parent: 'feedMP', name: 'Mechanical panel MP-1', tag: 'MP-1', rate: '100 A', lst: 'Panel MP-1 (100 A)',
    rating: '100 A, 208Y/120 V', def: 'A short bar is a smaller panelboard, here for mechanical equipment.', real: 'The panel that serves the fans, pumps, and the rooftop unit.' },
  { id: 'cbRTU', type: 'breaker', lane: 1, d: 6, parent: 'mp1', name: 'Breaker, rooftop unit', rate: '45 A', lst: '45 A breaker',
    rating: '45 A, 3-pole (the nameplate maximum)', def: 'A breaker symbol sized from the equipment nameplate.', real: 'A three-handle breaker in MP-1 labeled RTU-1.' },
  { id: 'rtu', type: 'motor', lane: 1, d: 7, parent: 'cbRTU', name: 'Rooftop unit RTU-1', tag: 'Rooftop unit', short: 'RTU', load: true, lst: 'Rooftop unit (MCA 35 A)', wire: ['#8 AWG Cu', '#8 Cu'],
    rating: 'MCA 35 A, MOCP 45 A (illustrative nameplate)', def: 'A circle with an M stands for a motor load.', real: 'The heating and cooling unit on the roof. Its nameplate sets the wire and breaker sizes.' },

  { id: 'cbOven', type: 'breaker', lane: 2, d: 4, parent: 'mdp', name: 'Breaker, kitchen oven', rate: '40 A', lst: '40 A, 3-pole breaker',
    rating: '40 A, 3-pole', def: 'A breaker symbol on an individual circuit for one piece of equipment.', real: 'A three-handle breaker in the MDP. The 12 kW oven draws about 33 A, so 40 A fits.' },
  { id: 'oven', type: 'oven', lane: 2, d: 7, parent: 'cbOven', name: 'Kitchen oven', tag: 'Kitchen oven', short: 'Oven', load: true, lst: 'Kitchen oven (12 kW)', wire: ['#8 AWG Cu', '#8 Cu'],
    rating: '12 kW, 208 V, 3-phase, about 33 A', def: 'A box with a zigzag stands for a resistance heating load.', real: 'The 12 kW electric oven in the Riverbend kitchen.' },

  { id: 'cbATS', type: 'breaker', lane: 3, d: 4, parent: 'mdp', name: 'ATS feeder breaker', rate: '30 A', lst: '30 A breaker',
    rating: '30 A, 3-pole', def: 'A breaker symbol protecting the feeder to the transfer switch.', real: 'A three-handle breaker in the MDP labeled ATS.' },
  { id: 'ats', type: 'ats', lane: 3, d: 5, parent: 'cbATS', name: 'Automatic transfer switch (ATS)', tag: 'ATS', rate: '30 A', lst: 'Transfer switch (ATS)', wire: ['#10 AWG Cu', '#10 Cu'],
    rating: '30 A, 208Y/120 V', def: 'A box with a normal input and an emergency input. It senses a power loss, starts the generator, and switches to it.', real: 'The wall-mounted cabinet in the electrical room that feeds the emergency lighting.' },
  { id: 'emerCkt', type: 'breaker', lane: 3, d: 6, parent: 'ats', name: 'Emergency lighting breaker', rate: '20 A', lst: '20 A breaker',
    rating: '20 A, 1-pole', def: 'A breaker symbol on the emergency lighting circuit, connected ahead of any switch or sensor.', real: 'A breaker in the emergency panel, so no light switch can turn the emergency lights off.' },
  { id: 'emerLoad', type: 'lamp', lane: 3, d: 7, parent: 'emerCkt', name: 'Emergency lights', tag: 'Emergency lights', short: 'Emergency', load: true, emergency: true, lst: 'Emergency lights', wire: ['12 AWG Cu', '12 Cu'],
    rating: 'Exit signs and egress lights, 120 V', def: 'A circle with an X is a lighting load. The E marks the emergency circuit.', real: 'The exit signs and path lights that must stay on during an outage.' },
  { id: 'gen', type: 'gen', lane: 4, d: 5, parent: null, alt: 'ats', name: 'Standby generator', tag: 'Generator', rate: '20 kW', lst: 'Standby generator', wire: ['#10 AWG Cu', '#10 Cu'],
    rating: '20 kW, 208Y/120 V (illustrative)', def: 'A circle with a G stands for a generator. It is the second source for the ATS.', real: 'The engine-generator outside the building, ready to start when the ATS calls for it.' }
];
const byId = {};
nodes.forEach(n => { byId[n.id] = n; });

// the loads a learner can trace; each maps to the node at the end of the path
const traceChoices = [
  ['Kitchen oven', 'oven'], ['Classroom lighting', 'light'], ['Rooftop unit', 'rtu'], ['Emergency lights', 'emerLoad'], ['None', null]
];

const legendItems = [
  ['xfmr', 'Transformer'], ['meter', 'Meter'], ['breaker', 'Breaker'], ['panel', 'Panelboard'], ['feeder', 'Feeder'],
  ['ats', 'Transfer switch'], ['gen', 'Generator'], ['lamp', 'Lamp load'], ['motor', 'Motor load']
];

const shortLegend = { 'Transformer': 'Xfmr', 'Panelboard': 'Panel', 'Transfer switch': 'ATS', 'Generator': 'Gen.', 'Lamp load': 'Lamp', 'Motor load': 'Motor' };

// ---- State ----
let tripped = false;
let selected = null;   // node id with an open infobox
let hover = null;
let wide = true;
let L = {};            // layout numbers

// ---- Controls ----
let traceSelect, tripButton, ratingsCheck, wiresCheck;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  traceSelect = createSelect();
  traceChoices.forEach(c => traceSelect.option(c[0]));
  traceSelect.selected('Kitchen oven');

  tripButton = createButton('Trip main breaker');
  tripButton.mousePressed(() => { tripped = !tripped; tripButton.html(tripped ? 'Reset main breaker' : 'Trip main breaker'); });

  ratingsCheck = createCheckbox('Show ratings', true);
  wiresCheck = createCheckbox('Show wire sizes', false);

  positionControls();
  describe('A one-line diagram of the Riverbend Youth Center electrical system, drawn from top to bottom. The utility transformer feeds a meter, a 200 amp main breaker, and the main distribution panel. From the panel, branches go to lighting panel LP-1 and the classroom lighting, mechanical panel MP-1 and the rooftop unit, a 40 amp three-pole breaker and the kitchen oven, and an automatic transfer switch with emergency lights and a standby generator. A legend lists the symbols. Energized lines are green, de-energized lines are dark gray, and the traced path is highlighted in orange.', LABEL);
}

function positionControls() {
  traceSelect.position(88, drawHeight + 9);
  traceSelect.size(min(160, canvasWidth - 250));
  tripButton.position(88 + min(160, canvasWidth - 250) + 12, drawHeight + 8);
  ratingsCheck.position(10, drawHeight + 47);
  wiresCheck.position(150, drawHeight + 47);
}

// ---- Layout ----
function layout() {
  wide = canvasWidth >= WIDE_MIN;
  const dx0 = 10;
  const dw = wide ? min(canvasWidth * 0.58, 640) : canvasWidth - 20;
  const top = wide ? 60 : 90;
  const bottom = wide ? drawHeight - 64 : 280;
  const dy = (bottom - top) / 7;
  const laneStart = dx0 + 62;
  const laneW = (dw - 62) / NUM_LANES;
  L = {
    wide, dx0, dw, top, dy, laneW, chainX: dx0 + 24,
    laneX: Array.from({ length: NUM_LANES }, (_, k) => laneStart + (k + 0.5) * laneW),
    u: wide ? 20 : 16
  };
  nodes.forEach(n => {
    n.x = n.lane < 0 ? L.chainX : L.laneX[n.lane];
    n.y = top + n.d * dy;
  });
  // the generator sits beside the ATS
  byId.gen.y = byId.ats.y;
}

// ---- Energized state: tripping the main breaker kills everything downstream except the emergency circuit, which the generator takes over ----
function emergencyIds() { return ['gen', 'ats', 'emerCkt', 'emerLoad']; }
function isDead(n) {
  if (!tripped) return n.id === 'gen';          // the generator is only on standby
  if (n.id === 'gen' || emergencyIds().includes(n.id)) return false;
  return ['mdp'].includes(n.id) || descendantOf(n, 'mdp');
}
function descendantOf(n, anc) {
  let p = n.parent;
  while (p) { if (p === anc) return true; p = byId[p].parent; }
  return false;
}
function pathTo(id) {
  const out = [];
  let n = byId[id];
  while (n) { out.unshift(n.id); n = n.parent ? byId[n.parent] : null; }
  return out;
}
function highlightIds() {
  const set = new Set();
  const choice = traceChoices.find(c => c[0] === traceSelect.value());
  if (choice && choice[1]) pathTo(choice[1]).forEach(i => set.add(i));
  if ((choice && choice[1] === 'emerLoad') || tripped) emergencyIds().forEach(i => set.add(i));
  return set;
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
  const title = 'One-Line Diagram Symbol Explorer';
  let ts = 24;
  while (ts > 18 && textWidth(title) > canvasWidth - 10) { ts--; textSize(ts); }
  text(title, canvasWidth / 2, 6);

  hover = null;
  if (mouseY >= 0 && mouseY < drawHeight) nodes.forEach(n => { if (hitNode(n, 4)) hover = n.id; });

  const hl = highlightIds();
  drawEdges(hl);
  nodes.forEach(n => drawNode(n, hl));
  nodes.forEach(n => drawLabels(n));
  if (wide) drawSidePanel(); else drawNarrowParts();
  drawTooltip();
  drawControlLabels();
  cursor(hover ? HAND : ARROW);
}

// ---- Edges: parent to child lines, orange halo when on the highlighted path ----
function edgeList() {
  const out = [];
  nodes.forEach(n => {
    if (n.parent) out.push({ from: byId[n.parent], to: n, alt: false });
    if (n.alt) out.push({ from: n, to: byId[n.alt], alt: true });
  });
  return out;
}

function edgeLive(e) {
  if (e.alt) return tripped;                       // generator to ATS
  if (e.to.id === 'ats') return !tripped;           // normal feed to the ATS
  return !isDead(e.to) && !isDead(e.from);
}

function endpoints(e) {
  const a = e.from, b = e.to;
  if (e.alt) return [[a.x - 14, a.y], [b.x + 22, b.y]];
  if (b.type === 'bus') return [[a.x, a.y + L.u / 2], [b.x, b.y]];
  if (a.type === 'bus') return [[b.x, a.y], [b.x, b.y - L.u / 2]];
  const off = n => (n.type === 'ats' ? 14 : n.type === 'panel' ? 5 : n.type === 'feeder' ? 8 : L.u / 2);
  return [[a.x, a.y + off(a)], [b.x, b.y - off(b)]];
}

function drawEdges(hl) {
  // the main distribution bus drawn as a thick bar
  const mdp = byId.mdp;
  const busX0 = L.chainX - 14, busX1 = L.laneX[3] + 24;
  const busLive = !isDead(mdp);
  const edges = edgeList();
  // halos first
  edges.forEach(e => {
    const onPath = hl.has(e.to.id) && hl.has(e.from.id);
    if (!onPath) return;
    const [p, q] = endpoints(e);
    stroke('darkorange');
    strokeWeight(10);
    strokeCap(ROUND);
    line(p[0], p[1], q[0], q[1]);
  });
  if (hl.has('mdp')) { stroke('darkorange'); strokeWeight(16); line(busX0, mdp.y, busX1, mdp.y); }
  // lines
  edges.forEach(e => {
    const live = edgeLive(e);
    const [p, q] = endpoints(e);
    stroke(live ? 'seagreen' : 'dimgray');
    strokeWeight(3);
    if (!live) drawingContext.setLineDash([5, 4]);
    line(p[0], p[1], q[0], q[1]);
    drawingContext.setLineDash([]);
  });
  // thick bar for the MDP
  stroke(busLive ? 'seagreen' : 'dimgray');
  strokeWeight(8);
  line(busX0, mdp.y, busX1, mdp.y);
}

// ---- Symbols ----
function nodeBox(n) {
  const u = L.u;
  if (n.type === 'bus') return { x: L.chainX - 14, y: n.y - 8, w: L.laneX[3] + 24 - (L.chainX - 14), h: 16 };
  if (n.type === 'panel') return { x: n.x - 24, y: n.y - 7, w: 48, h: 14 };
  if (n.type === 'ats') return { x: n.x - 22, y: n.y - 15, w: 44, h: 30 };
  if (n.type === 'feeder') return { x: n.x - 10, y: n.y - L.u * 0.4, w: 20, h: L.u * 0.8 };
  if (n.type === 'oven') return { x: n.x - 16, y: n.y - 11, w: 32, h: 22 };
  return { x: n.x - u / 2 - 2, y: n.y - u / 2 - 2, w: u + 4, h: u + 4 };
}
function hitNode(n, pad) {
  const b = nodeBox(n);
  return mouseX >= b.x - pad && mouseX <= b.x + b.w + pad && mouseY >= b.y - pad && mouseY <= b.y + b.h + pad;
}

function drawNode(n, hl) {
  const dead = isDead(n);
  const col = dead ? 'dimgray' : 'seagreen';
  const x = n.x, y = n.y, u = L.u;
  const b = nodeBox(n);
  if (hl.has(n.id) && n.type !== 'bus') {
    noStroke();
    fill('darkorange');
    rect(b.x - 4, b.y - 4, b.w + 8, b.h + 8, 8);
  }
  if (n.id === hover || n.id === selected) {
    noFill();
    stroke(n.id === selected ? 'black' : 'navy');
    strokeWeight(3);
    rect(b.x - 6, b.y - 6, b.w + 12, b.h + 12, 9);
  }
  stroke(col);
  strokeWeight(2);
  fill(dead ? 'lightgray' : 'white');
  switch (n.type) {
    case 'xfmr':
      circle(x, y - 5, u * 0.85);
      circle(x, y + 5, u * 0.85);
      break;
    case 'meter':
      circle(x, y, u);
      noStroke(); fill('black'); textSize(12); textAlign(CENTER, CENTER); text('M', x, y);
      break;
    case 'breaker': {
      const open = tripped && n.id === 'main';
      fill(open ? 'gold' : (dead ? 'lightgray' : 'white'));
      stroke(open ? 'black' : col);
      rect(x - u / 2, y - u / 2, u, u, 2);
      if (open) { line(x - u / 2 + 3, y - u / 2 + 3, x + u / 2 - 3, y + u / 2 - 3); line(x + u / 2 - 3, y - u / 2 + 3, x - u / 2 + 3, y + u / 2 - 3); }
      else line(x - u / 2 + 3, y + u / 2 - 3, x + u / 2 - 3, y - u / 2 + 3);
      break;
    }
    case 'bus':
      break;
    case 'panel':
      fill(dead ? 'dimgray' : 'seagreen');
      rect(x - 24, y - 4, 48, 8, 2);
      break;
    case 'feeder':
      stroke(col);
      strokeWeight(2);
      for (let k = -1.5; k <= 1.5; k++) line(x - 4, y + k * 3.4 + 2.5, x + 4, y + k * 3.4 - 2.5);
      break;
    case 'ats': {
      fill(dead ? 'lightgray' : 'white');
      rect(x - 22, y - 15, 44, 30, 3);
      noStroke(); fill('black'); textSize(12); textAlign(CENTER, CENTER);
      text('ATS', x, y - 5);
      textSize(11);
      text(tripped ? 'EMER.' : 'NORMAL', x, y + 8);
      break;
    }
    case 'gen':
      fill(tripped ? 'white' : 'lightgray');
      stroke(tripped ? 'seagreen' : 'dimgray');
      circle(x, y, u * 1.3);
      noStroke(); fill('black'); textSize(14); textAlign(CENTER, CENTER); text('G', x, y);
      break;
    case 'lamp':
      circle(x, y, u);
      line(x - u * 0.35, y - u * 0.35, x + u * 0.35, y + u * 0.35);
      line(x + u * 0.35, y - u * 0.35, x - u * 0.35, y + u * 0.35);
      break;
    case 'motor':
      circle(x, y, u * 1.1);
      noStroke(); fill('black'); textSize(12); textAlign(CENTER, CENTER); text('M', x, y);
      break;
    case 'oven':
      rect(x - 16, y - 11, 32, 22, 2);
      beginShape();
      [-12, -8, -4, 0, 4, 8, 12].forEach((dx, k) => vertex(x + dx, y + (k % 2 ? 5 : -5)));
      endShape();
      break;
  }
}

// ---- Labels: names, ratings, wire sizes, and text states ----
function drawLabels(n) {
  noStroke();
  textAlign(LEFT, CENTER);
  const dead = isDead(n);
  const sz = 12;
  textSize(sz);
  const right = n.x + L.u / 2 + 6;
  const showR = ratingsCheck.checked(), showW = wiresCheck.checked();
  const wireTxt = n.wire ? (wide ? n.wire[0] : n.wire[1]) : null;

  // wire size, beside the line that feeds this node
  if (showW && wireTxt && n.type !== 'bus' && n.type !== 'feeder') {
    fill('navy');
    if (n.type === 'gen') { textAlign(CENTER, TOP); text(wireTxt, n.x, n.y + 42); }
    else {
      textAlign(LEFT, CENTER);
      text(wireTxt, n.x + 6, n.y - L.dy / 2);
    }
  }
  if (showW && n.type === 'feeder') { fill('navy'); textAlign(LEFT, CENTER); text(wide ? n.wire[0] : n.wire[1], n.x + 12, n.y); }

  if (n.type === 'bus') {
    fill(dead ? 'dimgray' : 'black');
    textAlign(RIGHT, CENTER);
    textSize(14);
    text('MDP' + (showR ? ' 200 A' : ''), L.laneX[3] + 24, n.y - 16);
    return;
  }
  if (n.type === 'breaker') {
    if (n.id === 'main') { fill('black'); textAlign(LEFT, CENTER); text(showR ? '200 A main breaker' : 'Main breaker', right, n.y); }
    else if (showR) { fill('black'); textAlign(LEFT, CENTER); text(n.rate, right, n.y); }
    if (n.id === 'main' && tripped) { fill('black'); textStyle(BOLD); textAlign(LEFT, CENTER); text('TRIPPED', right, n.y + 14); textStyle(NORMAL); }
    return;
  }
  if (n.type === 'feeder') return;
  if (n.type === 'panel') {
    fill('black'); textAlign(LEFT, CENTER); textStyle(BOLD);
    text(n.tag, n.x + 28, n.y - 6); textStyle(NORMAL);
    if (showR) text(n.rate, n.x + 28, n.y + 8);
    return;
  }
  if (n.type === 'ats') {
    if (showR) { fill('black'); textAlign(RIGHT, CENTER); text(n.rate, n.x - 26, n.y + 24); }
    return;
  }
  if (n.type === 'gen') {
    fill('black'); textAlign(CENTER, TOP);
    text(n.tag, n.x, n.y + 14);
    fill(tripped ? 'darkgreen' : 'dimgray'); textStyle(BOLD);
    text(tripped ? 'RUNNING' : 'STANDBY', n.x, n.y + 28);
    textStyle(NORMAL);
    if (showR) { fill('black'); text(n.rate, n.x, n.y - 36); }
    return;
  }
  if (n.load) {
    fill('black'); textAlign(CENTER, TOP);
    const w = L.laneW - 6;
    let y = n.y + 14;
    wrapLines(wide ? n.tag : n.short, w).forEach(s => { text(s, n.x, y); y += 13; });
    fill(dead ? 'dimgray' : 'darkgreen'); textStyle(BOLD);
    text(dead ? 'OFF' : (n.emergency && tripped ? 'ON (emergency)' : 'ON'), n.x, y);
    textStyle(NORMAL);
    return;
  }
  // chain nodes: transformer and meter
  fill('black'); textAlign(LEFT, CENTER);
  text(n.tag, right, n.y - (showR ? 6 : 0));
  if (showR) text(n.rate, right, n.y + 8);
}

// ---- Wide: right-hand panel with status, legend, the traced path, and the symbol infobox ----
function statusText() {
  if (tripped) return 'Main breaker tripped: normal power is lost, so every normal circuit is dark. The ATS has switched to the generator, and the emergency lights stay on.';
  return 'Normal: every circuit is energized and the generator is on standby.';
}

function drawSidePanel() {
  const x = L.dx0 + L.dw + 12, w = canvasWidth - x - 10;
  let y = 40;
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  fill(tripped ? 'crimson' : 'darkgreen');
  textStyle(BOLD);
  wrapLines(statusText(), w).forEach(s => { text(s, x, y); y += 16; });
  textStyle(NORMAL);
  y += 4;
  y = drawLegend(x, y, w) + 6;
  y = drawTrace(x, y, w, 16) + 6;
  drawInfobox(x, y, w, drawHeight - y - 6);
}

function drawLegend(x, y, w) {
  noStroke();
  fill('black');
  textSize(14);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text('Legend', x, y);
  textStyle(NORMAL);
  y += 18;
  const cols = 3, cw = w / cols;
  legendItems.forEach((it, i) => {
    const cx = x + (i % cols) * cw, cy = y + floor(i / cols) * 22;
    drawLegendIcon(it[0], cx + 10, cy + 8);
    noStroke(); fill('black'); textSize(12); textAlign(LEFT, CENTER);
    text(it[1], cx + 24, cy + 8);
  });
  return y + ceil(legendItems.length / cols) * 22;
}

function drawLegendIcon(type, x, y) {
  stroke('black');
  strokeWeight(1.5);
  fill('white');
  switch (type) {
    case 'xfmr': circle(x - 3, y, 10); circle(x + 3, y, 10); break;
    case 'meter': circle(x, y, 14); noStroke(); fill('black'); textSize(10); textAlign(CENTER, CENTER); text('M', x, y); break;
    case 'breaker': rect(x - 7, y - 7, 14, 14, 1); line(x - 5, y + 5, x + 5, y - 5); break;
    case 'panel': fill('black'); rect(x - 9, y - 3, 18, 6, 1); break;
    case 'feeder': line(x - 9, y, x + 9, y); for (let k = -1; k <= 1; k++) line(x + k * 4 - 2, y + 4, x + k * 4 + 2, y - 4); break;
    case 'ats': rect(x - 10, y - 7, 20, 14, 2); noStroke(); fill('black'); textSize(9); textAlign(CENTER, CENTER); text('ATS', x, y); break;
    case 'gen': circle(x, y, 15); noStroke(); fill('black'); textSize(11); textAlign(CENTER, CENTER); text('G', x, y); break;
    case 'lamp': circle(x, y, 14); line(x - 5, y - 5, x + 5, y + 5); line(x + 5, y - 5, x - 5, y + 5); break;
    case 'motor': circle(x, y, 15); noStroke(); fill('black'); textSize(10); textAlign(CENTER, CENTER); text('M', x, y); break;
  }
}

// ---- The traced path: each device in order, with its protection ----
function traceIds() {
  const choice = traceChoices.find(c => c[0] === traceSelect.value());
  return choice && choice[1] ? pathTo(choice[1]) : [];
}

function traceText() {
  const ids = traceIds();
  if (!ids.length) return null;
  const parts = ids.map((id, i) => (i + 1) + '. ' + byId[id].lst);
  if (ids.includes('ats') && wide) parts.push('Backup source: standby generator');
  const breakers = ids.filter(id => byId[id].type === 'breaker').reverse().map(id => byId[id].rate);
  const dead = isDead(byId[ids[ids.length - 1]]);
  return { path: parts.join('; '), prot: 'Protected by (nearest first): ' + breakers.join(', then ') + '.',
    state: dead ? 'Dead: the main breaker is open.' : (tripped ? 'Powered by the generator through the ATS.' : 'Energized.') };
}

function drawTrace(x, y, w, lead) {
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  fill('black');
  textStyle(BOLD);
  text('Path from the utility: ' + traceSelect.value(), x, y);
  textStyle(NORMAL);
  y += 18;
  const t = traceText();
  if (!t) { fill('dimgray'); text('Choose a load to highlight its path in orange.', x, y); return y + 18; }
  fill('black');
  wrapLines(t.path + '.', w).forEach(s => { text(s, x, y); y += lead; });
  fill('navy');
  wrapLines(t.prot, w).forEach(s => { text(s, x, y); y += lead; });
  fill(t.state.startsWith('Dead') ? 'crimson' : 'darkgreen');
  wrapLines(t.state, w).forEach(s => { text(s, x, y); y += lead; });
  return y;
}

function drawInfobox(x, y, w, h) {
  stroke(selected ? 'navy' : 'silver');
  strokeWeight(selected ? 2 : 1);
  fill('white');
  rect(x - 4, y, w + 4, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  let ty = y + 5;
  if (!selected) {
    fill('black');
    wrapLines('Click any symbol for its definition, what it stands for in a real room, and the rating shown. Hover for its name.', w - 10).forEach(s => { text(s, x, ty); ty += 16; });
    return;
  }
  const n = byId[selected];
  fill('black'); textStyle(BOLD);
  wrapLines(n.name, w - 10).forEach(s => { text(s, x, ty); ty += 16; });
  textStyle(NORMAL);
  [['Symbol: ', n.def], ['In a real room: ', n.real], ['Rating shown: ', n.rating]].forEach(p => {
    wrapLines(p[0] + p[1], w - 10).forEach(s => { if (ty + 16 < y + h) text(s, x, ty); ty += 16; });
  });
}

// ---- Narrow: compact legend across the top and an info strip at the bottom ----
function drawNarrowParts() {
  // legend, two rows of icons and short words
  const cols = 5, cw = (canvasWidth - 20) / cols;
  legendItems.forEach((it, i) => {
    const cx = 10 + (i % cols) * cw, cy = 40 + floor(i / cols) * 17;
    drawLegendIcon(it[0], cx + 9, cy + 8);
    noStroke(); fill('black'); textSize(12); textAlign(LEFT, CENTER);
    text(shortLegend[it[1]] || it[1], cx + 22, cy + 8);
  });
  // strip below the diagram
  const y = 326, h = drawHeight - y - 4;
  stroke(selected ? 'navy' : 'silver');
  strokeWeight(selected ? 2 : 1);
  fill('white');
  rect(6, y, canvasWidth - 12, h, 8);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  let ty = y + 4;
  const w = canvasWidth - 28;
  if (selected) {
    const n = byId[selected];
    fill('black'); textStyle(BOLD);
    text(n.name, 14, ty); ty += 16;
    textStyle(NORMAL);
    [['', n.def], ['Real room: ', n.real], ['Rating: ', n.rating]].forEach(p => {
      wrapLines(p[0] + p[1], w).forEach(s => { if (ty + 14 < y + h) text(s, 14, ty); ty += 15; });
    });
    return;
  }
  fill(tripped ? 'crimson' : 'darkgreen'); textStyle(BOLD);
  const st = tripped ? 'Main breaker tripped: normal circuits dark, emergency lights on via the ATS.' : 'Normal: all circuits energized.';
  wrapLines(st, w).forEach(s => { text(s, 14, ty); ty += 15; });
  textStyle(NORMAL);
  const t = traceText();
  fill('black');
  const msg = t ? t.path + '. ' + t.state : 'Choose a load to trace its path. Tap a symbol for details.';
  wrapLines(msg, w).forEach(s => { if (ty + 14 < y + h) text(s, 14, ty); ty += 15; });
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

// ---- Hover tooltip: the symbol's name and state ----
function drawTooltip() {
  if (!hover) return;
  const n = byId[hover];
  const dead = isDead(n);
  const state = n.id === 'gen' ? (tripped ? 'Running' : 'Standby (off)') : (n.id === 'main' && tripped ? 'Tripped (open)' : (dead ? 'De-energized' : 'Energized'));
  textSize(14);
  const w = max(textWidth(n.name), textWidth(state)) + 16, h = 40;
  const tx = constrain(mouseX + 14, 4, canvasWidth - w - 4);
  const ty = constrain(mouseY + 14, 4, drawHeight - h - 4);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 6);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  text(n.name, tx + 8, ty + 4);
  text(state, tx + 8, ty + 21);
}

function drawControlLabels() {
  noStroke();
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('Trace load', 10, drawHeight + 21);
}

function mousePressed() {
  if (mouseY < 0 || mouseY >= drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  if (!wide && selected && mouseY >= 326) { selected = null; return; }
  selected = hover;
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
