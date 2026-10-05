// Failure Chain Explorer MicroSim - vis-network graph from root causes through mechanisms and damage processes to visible symptoms
// CANVAS_HEIGHT: 720
// Bloom Level 4 (Analyze) + Level 6 (Create)
// MicroSim template version 2026.03

// ---- Stages: the four columns (rows when the screen is narrow) ----
const STAGES = {
  root: { name: 'Root cause', bg: 'lightskyblue', border: 'steelblue', col: 0 },
  mech: { name: 'Mechanism', bg: 'orange', border: 'darkorange', col: 1 },
  dmg: { name: 'Damage process', bg: 'tomato', border: 'firebrick', col: 2 },
  sym: { name: 'Visible symptom', bg: 'lightgray', border: 'dimgray', col: 3 }
};

// ---- Nodes: lane places a node in one of four grid slots; def and fix are drawn from Chapter 21 ----
const NODES = [
  { id: 'R1', label: 'Omitted flashing', stage: 'root', lane: 0, def: 'Flashing is the thin metal or membrane that sheds water at a window head or joint. In the Riverbend example the drawings left it out, so the installers, who work from the drawings, built none (a design cause).', fix: 'Detail the flashing on the drawings, then check it at inspection before the siding covers it.' },
  { id: 'R3', label: 'Wet lumber', stage: 'root', lane: 1, def: 'Wood framing delivered or stored wet, with a moisture content that is already high when it is closed into the wall (a materials cause).', fix: 'Specify a maximum moisture content, protect lumber on site, and check it with a moisture meter before the wall is closed.' },
  { id: 'R2', label: 'Clogged drain', stage: 'root', lane: 2, def: 'A roof drain blocked by leaves and debris because required upkeep was skipped (a maintenance cause).', fix: 'Put drain inspection and cleaning on a maintenance schedule, and provide overflow drains.' },
  { id: 'R4', label: 'Settlement', stage: 'root', lane: 3, def: 'Downward movement of the foundation as the soil beneath it compresses. Uniform settlement is usually harmless, but differential settlement, where one part sinks more than another, distorts the frame.', fix: 'Investigate the soil, compact fill properly, and drain water away so it does not wash out soil.' },
  { id: 'M1', label: 'Water enters wall', stage: 'mech', lane: 0, def: 'Water intrusion: rain driven through gaps and poorly flashed openings, or meltwater, reaches the cavity behind the siding. It then moves by gravity, wind pressure, capillary suction, and air movement.', fix: 'Use the four Ds: deflect, drain, dry, and use durable materials. For example, add flashing and a drainage plane.' },
  { id: 'M3', label: 'Moisture content rises', stage: 'mech', lane: 1, def: 'Wood stays above about 20 percent moisture content for long periods because the wall cannot dry toward either side.', fix: 'Stop the source of wetting, and give the assembly a path to dry. Confirm dryness with a moisture meter.' },
  { id: 'M2', label: 'Water ponds on roof', stage: 'mech', lane: 2, def: 'Standing water collects on a low-slope roof when drains cannot carry it away or the slope is too small.', fix: 'Slope the roof to the drains, clear the drains, and add secondary drains so water cannot stand.' },
  { id: 'M4', label: 'Foundation moves', stage: 'mech', lane: 3, def: 'The foundation shifts as soil compresses, washes out, or changes with groundwater. Soft clay, poor fill, leaking pipes, and groundwater changes are common causes.', fix: 'Survey the foundation level, correct the drainage, and have a foundation engineer decide whether to underpin.' },
  { id: 'D2', label: 'Mold', stage: 'dmg', lane: 0, def: 'A fungus that grows on damp organic surfaces such as wood and the paper facing on gypsum board. It can start within a couple of days of a material becoming wet.', fix: 'Correct the moisture source first, then dry the area and remove or clean the affected materials.' },
  { id: 'D1', label: 'Decay (rot)', stage: 'dmg', lane: 1, def: 'Fungal breakdown of wood. Decay needs food, moisture, oxygen, and a moderate temperature at the same time. Remove any one and it stops.', fix: 'Keep the wood dry, separate it from soil and concrete, and use preservative-treated wood where wetting is expected.' },
  { id: 'D3', label: 'Freeze-thaw', stage: 'dmg', lane: 2, def: 'Cracking and flaking of porous materials caused by water freezing inside them. Water expands about 9 percent when it freezes.', fix: 'Keep water out with flashings and coverings, and use air-entrained concrete where it is exposed.' },
  { id: 'D4', label: 'Cracking', stage: 'dmg', lane: 3, def: 'Separations in a material. Width, direction, and pattern point to the cause: shrinkage, thermal movement, structural overload, or settlement.', fix: 'Place control joints, monitor crack width, and have an expert review wide, growing, or offset cracks.' },
  { id: 'S1', label: 'Stain', stage: 'sym', lane: 0, def: 'A brown stain on a ceiling or wall is the common visible sign of water intrusion. The stain is the symptom, not the cause.', fix: 'Find and stop the water first, then repair the finish. Do not paint over the stain.' },
  { id: 'S2', label: 'Peeling paint', stage: 'sym', lane: 1, def: 'Paint that blisters, flakes, or peels because moisture or movement behind the coating pushes it off.', fix: 'Find the moisture or movement behind the paint before repainting.' },
  { id: 'S3', label: 'Sagging', stage: 'sym', lane: 2, def: 'A roof, ceiling, or floor that droops out of level because its framing has softened or the support beneath it has moved.', fix: 'Have an engineer assess the framing or foundation, and stop the cause before repairing.' },
  { id: 'S4', label: 'Leak', stage: 'sym', lane: 3, def: 'Water visibly passing through the roof or wall into the building. Water travels along framing, so the leak often appears far from where it entered.', fix: 'Trace the water to its entry point with moisture meters, infrared scans, or a water test, then seal that point.' }
];
const NODE = {};
NODES.forEach(n => { NODE[n.id] = n; });

// ---- Edges: from, to, and the reason for the link (shown on hover) ----
const EDGES = [
  ['R1', 'M1', 'With no flashing above the window head, wind-driven rain and meltwater run into the wall cavity.'],
  ['R2', 'M2', 'A clogged drain cannot carry roof water away, so the water collects on the roof.'],
  ['R3', 'M3', 'Lumber that arrives wet starts with a high moisture content, and it may be closed into the wall before it dries.'],
  ['R4', 'M4', 'Soil that compresses or washes out under a footing lets the foundation move.'],
  ['M1', 'M3', 'Water in the cavity soaks the sheathing and studs, and the wall cannot dry toward either side.'],
  ['M2', 'D1', 'Ponded water keeps the roof deck and framing wet for weeks, long enough for decay fungi to take hold.'],
  ['M2', 'D3', 'Ponded water freezes and thaws on the roof and in its seams, and freezing water expands about 9 percent.'],
  ['M3', 'D1', 'Decay fungi grow when wood stays above about 20 percent moisture content.'],
  ['M3', 'D2', 'Mold can begin within a couple of days on damp wood and on the paper facing of gypsum board.'],
  ['M4', 'D4', 'Differential settlement distorts the frame and cracks walls, slabs, and finishes.'],
  ['D1', 'S1', 'Wet, rotting framing carries water to the ceiling finish, which shows as a brown stain.'],
  ['D1', 'S2', 'Rot and moisture behind the siding push the paint off, often first at a corner.'],
  ['D1', 'S3', 'Decayed framing loses strength, so the roof or floor it carries sags.'],
  ['D2', 'S1', 'Mold and damp gypsum board discolor the wall or ceiling surface.'],
  ['D3', 'S2', 'Freezing water pushes the paint and the surface layer off the material.'],
  ['D3', 'S4', 'Cracked and spalled surfaces open paths for water to pass through.'],
  ['D4', 'S2', 'Movement cracks tear and flake the paint, most often at the corners of openings.'],
  ['D4', 'S3', 'Uneven settlement leaves floors and framing out of level, seen as sagging or sloping.'],
  ['D4', 'S4', 'Cracks give water a path through the wall or slab.']
];

// ---- Scenarios: the nodes of each example chain (edges between them are included automatically) ----
const SCENARIOS = {
  flash: { name: 'Riverbend flashing', nodes: ['R1', 'M1', 'M3', 'D1', 'D2', 'S1', 'S2'],
    intro: 'Riverbend flashing: the drawings omit the flashing above a classroom window, so water reaches wet framing, decay and mold follow, and a stain and peeling paint appear years later.' },
  drain: { name: 'Roof drain', nodes: ['R2', 'M2', 'D1', 'D3', 'S1', 'S2', 'S3', 'S4'],
    intro: 'Roof drain: a clogged drain lets water pond on the roof, which feeds both decay of the deck and freeze-thaw damage.' },
  settle: { name: 'Settlement', nodes: ['R4', 'M4', 'D4', 'S2', 'S3', 'S4'],
    intro: 'Settlement: soil under a footing compresses, the foundation moves, and the cracking it causes shows up as peeling paint, sagging, and leaks.' },
  all: { name: 'All four chains', nodes: NODES.map(n => n.id),
    intro: 'All four chains together. The chains share some links, so breaking one node may not remove every symptom.' }
};

// ---- State ----
let network, nodeSet, edgeSet;
let scenario = 'flash', selected = null, breakMode = false, layoutDir = 'LR';
const removed = new Set();
const $ = id => document.getElementById(id);
const plain = s => s.replace(/\n/g, ' ');

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
function scNodes() { return SCENARIOS[scenario].nodes; }
function scEdges() { return EDGES.filter(e => scNodes().includes(e[0]) && scNodes().includes(e[1])); }

// ---- Graph logic ----
// nodes reached from the roots that are not removed, following edges through nodes that are not removed
function reachedSet(skipRemoved) {
  const ids = scNodes(), edges = scEdges();
  const reached = new Set(), parent = {};
  const queue = ids.filter(id => NODE[id].stage === 'root' && !(skipRemoved && removed.has(id)));
  queue.forEach(id => reached.add(id));
  for (let i = 0; i < queue.length; i++) {
    edges.filter(e => e[0] === queue[i]).forEach(e => {
      if (skipRemoved && removed.has(e[1])) return;
      if (!reached.has(e[1])) { reached.add(e[1]); parent[e[1]] = queue[i]; queue.push(e[1]); }
    });
  }
  return { reached, parent };
}

function walk(id, forward) {
  const out = new Set(), edges = scEdges(), stack = [id];
  while (stack.length) {
    const cur = stack.pop();
    edges.forEach(e => {
      const from = forward ? e[0] : e[1], to = forward ? e[1] : e[0];
      if (from === cur && !out.has(to)) { out.add(to); stack.push(to); }
    });
  }
  return out;
}

// ---- Layout: a 4 x 4 grid. Wide screens run the stages left to right; narrow screens run them top to bottom ----
function positions() {
  const lanes = [...new Set(scNodes().map(id => NODE[id].lane))].sort();
  const wide = layoutDir === 'LR';
  const pos = {};
  scNodes().forEach(id => {
    const n = NODE[id], l = lanes.indexOf(n.lane) - (lanes.length - 1) / 2, c = STAGES[n.stage].col - 1.5;
    pos[id] = wide ? { x: c * 235, y: l * 92 } : { x: l * 100, y: c * 112 };
  });
  return pos;
}

function nodeWidth() { return layoutDir === 'LR' ? 140 : 86; }

function baseNode(id, pos) {
  const n = NODE[id], st = STAGES[n.stage];
  return {
    id, label: n.label, x: pos[id].x, y: pos[id].y, shape: 'box', margin: layoutDir === 'LR' ? 9 : 6, borderWidth: 3,
    widthConstraint: { maximum: nodeWidth() }, font: { size: layoutDir === 'LR' ? 15 : 13, face: 'Arial', color: 'black' },
    color: { background: st.bg, border: st.border }, shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
  };
}

function loadScenario() {
  const pos = positions();
  nodeSet.clear(); edgeSet.clear();
  nodeSet.add(scNodes().map(id => baseNode(id, pos)));
  edgeSet.add(scEdges().map((e, i) => ({ id: e[0] + e[1], from: e[0], to: e[1], title: NODE[e[0]].label + ' leads to ' + NODE[e[1]].label.toLowerCase() + ': ' + e[2] })));
  applyEdgeShape();
  restyle();
  network.fit({ animation: false, maxZoomLevel: layoutDir === 'LR' ? 1.4 : 1.2 });
}

function applyEdgeShape() {
  network.setOptions({ edges: { smooth: { enabled: true, type: 'cubicBezier', forceDirection: layoutDir === 'LR' ? 'horizontal' : 'vertical', roundness: 0.5 } } });
}

// ---- Styling from state: selection highlight, removed nodes, and nodes no longer reached ----
function restyle() {
  const { reached } = reachedSet(true);
  const rel = selected ? new Set([selected, ...walk(selected, true), ...walk(selected, false)]) : null;
  nodeSet.update(scNodes().map(id => {
    const n = NODE[id], st = STAGES[n.stage];
    const gone = removed.has(id), cut = !gone && !reached.has(id), faded = rel && !rel.has(id);
    let color = { background: st.bg, border: st.border }, fontColor = 'black', dashes = false, bw = 3, label = n.label;
    if (gone) { color = { background: 'white', border: 'dimgray' }; fontColor = 'dimgray'; dashes = [6, 4]; label += '\n(removed)'; }
    else if (cut) { color = { background: 'whitesmoke', border: 'darkgray' }; fontColor = 'dimgray'; dashes = [2, 3]; label += '\n(not reached)'; }
    else if (faded) { color = { background: 'whitesmoke', border: 'silver' }; fontColor = 'darkgray'; }
    if (id === selected) { bw = 6; if (!gone && !cut) color = { background: st.bg, border: 'navy' }; }
    color.highlight = color; color.hover = color;
    return { id, label, color, borderWidth: bw, shapeProperties: { borderDashes: dashes }, font: { color: fontColor, size: layoutDir === 'LR' ? 15 : 13, face: 'Arial' }, chosen: false };
  }));
  edgeSet.update(scEdges().map(e => {
    const live = reached.has(e[0]) && reached.has(e[1]) && !removed.has(e[0]) && !removed.has(e[1]);
    const inRel = rel && rel.has(e[0]) && rel.has(e[1]);
    let color = 'dimgray', width = 2, dashes = false;
    if (!live) { color = 'silver'; dashes = [6, 6]; }
    else if (rel && !inRel) { color = 'lightgray'; }
    else if (inRel) { color = 'navy'; width = 4; }
    return { id: e[0] + e[1], color: { color, highlight: color, hover: color }, width, dashes, arrows: { to: { enabled: true, scaleFactor: 1 } }, hoverWidth: 2 };
  }));
}

// ---- Text panels ----
function renderNode(id) {
  const n = NODE[id], st = STAGES[n.stage];
  const up = [...walk(id, false)].map(k => NODE[k].label), down = [...walk(id, true)].map(k => NODE[k].label);
  $('info').innerHTML = '<h3>' + n.label + ' (' + st.name.toLowerCase() + ')</h3><p>' + n.def + '</p>' +
    '<p><b>Upstream causes:</b> ' + (up.length ? up.join(', ') : 'none, this is where the chain starts') + '. <b>Downstream:</b> ' + (down.length ? down.join(', ') : 'none, this is a visible symptom') + '.</p>' +
    '<p><b>One way to break the chain here:</b> ' + n.fix + '</p>';
}

function renderDefault() {
  $('info').innerHTML = '<h3>' + SCENARIOS[scenario].name + '</h3><p>' + SCENARIOS[scenario].intro + '</p>' +
    '<p>Click a node to highlight its upstream causes and downstream consequences. Hover a link for the reason it exists. Press <b>Break the chain</b>, then click a node to remove it, and propose where in the project you would make that break.</p>';
}

function renderOutcome() {
  if (!removed.size) {
    $('outcome').innerHTML = breakMode ? '<b>Break the chain is on.</b> Click any node to remove it. Click it again to put it back.' : 'Every chain is intact. Press <b>Break the chain</b> to remove a node and see which symptoms disappear.';
    return;
  }
  const base = reachedSet(false).reached, now = reachedSet(true);
  const syms = scNodes().filter(id => NODE[id].stage === 'sym' && base.has(id));
  const gone = syms.filter(id => !now.reached.has(id) || removed.has(id)), left = syms.filter(id => !gone.includes(id));
  const path = id => { const p = [id]; while (now.parent[p[0]]) p.unshift(now.parent[p[0]]); return p.map(k => plain(NODE[k].label)).join(' → '); };
  let t = '<b>Removed: ' + [...removed].map(id => plain(NODE[id].label)).join(', ') + '.</b> ';
  t += 'Symptoms that disappear: ' + (gone.length ? gone.map(id => NODE[id].label).join(', ') : 'none') + '. ';
  t += 'Symptoms that remain: ' + (left.length ? left.map(id => NODE[id].label + ' (still reached through ' + path(id) + ')').join('; ') : 'none') + '.';
  if (!left.length) t += ' This break stops every chain in this scenario.';
  $('outcome').innerHTML = t;
}

function refresh() { restyle(); renderOutcome(); }

function setBreakMode(on) {
  breakMode = on;
  $('breakBtn').classList.toggle('active', on);
  $('breakBtn').setAttribute('aria-pressed', on ? 'true' : 'false');
  $('network').style.cursor = on ? 'crosshair' : 'default';
  renderOutcome();
}

function resetAll() {
  removed.clear(); selected = null;
  setBreakMode(false);
  restyle(); renderOutcome(); renderDefault();
  $('edgeNote').textContent = 'Hover a link to see why one stage leads to the next.';
}

// ---- Interaction ----
function onClick(params) {
  if (!params.nodes.length) {
    if (!breakMode) { selected = null; renderDefault(); restyle(); }
    return;
  }
  const id = params.nodes[0];
  if (breakMode) {
    if (removed.has(id)) removed.delete(id); else removed.add(id);
    selected = id;
    renderNode(id);
    refresh();
  } else {
    selected = selected === id ? null : id;
    if (selected) renderNode(id); else renderDefault();
    restyle();
  }
}

function chooseLayout() {
  const w = $('network').clientWidth >= 700 ? 'LR' : 'UD';
  if (w === layoutDir && nodeSet.length) return false;
  layoutDir = w;
  return true;
}

function init() {
  nodeSet = new vis.DataSet();
  edgeSet = new vis.DataSet();
  layoutDir = $('network').clientWidth >= 700 ? 'LR' : 'UD';
  const fullscreen = !isInIframe();
  network = new vis.Network($('network'), { nodes: nodeSet, edges: edgeSet }, {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: { hover: true, tooltipDelay: 150, selectConnectedEdges: false, dragNodes: false, dragView: fullscreen, zoomView: fullscreen, navigationButtons: false, keyboard: false },
    nodes: { shape: 'box', borderWidth: 3 },
    edges: { chosen: true, hoverWidth: 1.5 }
  });
  network.on('click', onClick);
  network.on('hoverEdge', p => {
    const e = EDGES.find(x => x[0] + x[1] === p.edge);
    if (e) $('edgeNote').textContent = NODE[e[0]].label + ' → ' + NODE[e[1]].label + ': ' + e[2];
  });
  network.on('blurEdge', () => { $('edgeNote').textContent = 'Hover a link to see why one stage leads to the next.'; });
  $('scenario').addEventListener('change', e => { scenario = e.target.value; removed.clear(); selected = null; loadScenario(); renderOutcome(); renderDefault(); });
  $('breakBtn').addEventListener('click', () => setBreakMode(!breakMode));
  $('resetBtn').addEventListener('click', resetAll);
  window.addEventListener('resize', () => { if (chooseLayout()) loadScenario(); else { network.redraw(); network.fit({ animation: false, maxZoomLevel: layoutDir === 'LR' ? 1.4 : 1.2 }); } });
  loadScenario();
  resetAll();
}

document.addEventListener('DOMContentLoaded', init);
