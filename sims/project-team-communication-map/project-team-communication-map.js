// Project Team Contracts and Communication Map MicroSim - vis-network graph of who has a contract with whom, with document tokens
// CANVAS_HEIGHT: 700
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

// ---- Participants (roles drawn from Chapter 2) ----
const roles = {
  owner: { name: 'Owner', text: 'Commissions and pays for the project and makes the final decisions on goals, budget, and schedule. Approves each phase gate, and should name one person with authority to speak for the owner (for Riverbend, the nonprofit\'s executive director).' },
  arch: { name: 'Architect', text: 'Licensed design professional who leads the design team and takes primary responsibility for the design. Coordinates the engineers. During construction usually acts as the owner\'s representative: site visits, submittals, RFIs, change orders, and payment review. Observes the work but does not direct it.' },
  eng: { name: 'Engineers', text: 'Structural, mechanical, electrical, plumbing, and civil consultants, each responsible for the systems in their own discipline. The electrical designer works here. They review submittals and answer questions in their discipline.' },
  gc: { name: 'General Contractor', text: 'Holds the prime contract with the owner and is responsible for all of the work, including work done by others. Provides a project manager and a superintendent, decides means and methods, and coordinates materials, labor, and information.' },
  subs: { name: 'Subcontractors', text: 'Specialty firms (concrete, framing, roofing, plumbing, mechanical, electrical) hired by the general contractor, who perform most of the physical work. A subcontractor has a contract with the GC and none with the owner, so questions and payments flow through the GC.' },
  bo: { name: 'Building Official', text: 'Public official who reviews the construction documents for a permit, inspects the work, and issues the certificate of occupancy when the building complies with the code (see Chapter 17).' }
};

// ---- Delivery methods: labels, contract lines, and communication lines ----
const methods = {
  dbb: {
    name: 'Design-bid-build',
    summary: 'The owner has two separate contracts, one with the architect and one with the general contractor, and those two firms have no contract with each other. The builder joins only after the design is done.',
    gcLabel: 'General\nContractor',
    edges: [
      ['owner', 'arch', 'c', 'Contract: the owner hires the architect to design the building and lead the design team.'],
      ['owner', 'gc', 'c', 'Contract: the prime contract. The general contractor builds the project and is responsible for all of the work, including the subcontractors\'.'],
      ['arch', 'eng', 'c', 'Contract: the architect hires the engineers as consultants for the structural, mechanical, electrical, plumbing, and civil systems.'],
      ['gc', 'subs', 'c', 'Contract: the general contractor hires specialty firms for portions of the work. Questions and payments flow through the GC.'],
      ['bo', 'gc', 'm', 'Communication, no contract: the building official inspects the work and approves it; inspections and corrections are arranged through the general contractor.'],
      ['arch', 'subs', 'm', 'Informal contact only, no contract: the architect may meet a subcontractor on site, but submittals, questions, and instructions go through the general contractor.'],
      ['gc', 'arch', 'm', 'Communication, no contract: the architect administers the construction contract for the owner, so submittals, RFIs, and change proposals travel on this path.']
    ]
  },
  db: {
    name: 'Design-build',
    summary: 'The owner signs a single contract with one entity, the design-builder (usually a contractor), who is responsible for both design and construction. The architect and engineers work as part of the design-build team, so the Architect appears under the General Contractor.',
    gcLabel: 'Design-builder\n(General Contractor)',
    edges: [
      ['owner', 'gc', 'c', 'Contract: the single design-build contract, covering both design and construction.'],
      ['gc', 'arch', 'c', 'Contract: the architect works as part of the design-build team, hired by the design-builder.'],
      ['arch', 'eng', 'c', 'Contract: the architect hires the engineers as consultants for the structural, mechanical, electrical, plumbing, and civil systems.'],
      ['gc', 'subs', 'c', 'Contract: the design-builder hires specialty firms for portions of the work. Questions and payments flow through the design-builder.'],
      ['bo', 'gc', 'm', 'Communication, no contract: the building official inspects the work and approves it; inspections and corrections are arranged through the design-builder.'],
      ['arch', 'subs', 'm', 'Informal contact only, no contract: the architect may meet a subcontractor on site, but submittals, questions, and instructions go through the general contractor.']
    ]
  },
  cmar: {
    name: 'Construction manager at risk',
    summary: 'The owner holds separate contracts with the architect and the construction manager. The construction manager joins during design as an adviser, then builds for a guaranteed maximum price.',
    gcLabel: 'Construction\nManager (GC)',
    edges: [
      ['owner', 'arch', 'c', 'Contract: the owner hires the architect to design the building and lead the design team.'],
      ['owner', 'gc', 'c', 'Contract: the owner hires the construction manager, who advises during design and then agrees to build for a guaranteed maximum price.'],
      ['arch', 'eng', 'c', 'Contract: the architect hires the engineers as consultants for the structural, mechanical, electrical, plumbing, and civil systems.'],
      ['gc', 'subs', 'c', 'Contract: the construction manager hires specialty firms for portions of the work. Questions and payments flow through the construction manager.'],
      ['bo', 'gc', 'm', 'Communication, no contract: the building official inspects the work and approves it; inspections and corrections are arranged through the construction manager.'],
      ['arch', 'subs', 'm', 'Informal contact only, no contract: the architect may meet a subcontractor on site, but submittals, questions, and instructions go through the construction manager.'],
      ['gc', 'arch', 'm', 'Communication, no contract: the construction manager gives cost and schedule advice during design, and submittals, RFIs, and change proposals travel here during construction.']
    ]
  }
};

// ---- Document routes: path of node ids, which numbered step each stop belongs to, and the steps ----
function routeFor(kind, method) {
  const dbNote = method === 'db' ? ' In design-build the architect works for the design-builder, so the reviews happen inside one team.' : '';
  const why = ' Why through the GC? A subcontractor has a contract with the GC and none with the design team, and the GC remains responsible for the entire chain.';
  if (kind === 'submittal') return {
    letter: 'S',
    title: 'Submittal: from shop drawings to approval',
    path: ['subs', 'gc', 'arch', 'eng', 'arch', 'gc', 'subs'],
    stepOf: [0, 1, 2, 2, 3, 3, 3],
    steps: ['Subcontractor prepares the shop drawings and product data, such as the switchboard dimensions.',
      'General contractor checks the submittal and forwards it.',
      'Architect and engineer review it against the specification.',
      'Returned to the general contractor with a status (approved, approved as noted, revise and resubmit, or rejected), who returns it to the subcontractor.'],
    note: why + dbNote
  };
  if (kind === 'rfi') return {
    letter: 'R',
    title: 'Request for information (RFI): a written question and answer',
    path: ['subs', 'gc', 'arch', 'gc', 'subs'],
    stepOf: [0, 1, 2, 3, 3],
    steps: ['Subcontractor finds an unclear or conflicting detail and tells the general contractor.',
      'General contractor writes the RFI, citing the sheet and detail, and sends it to the architect.',
      'Architect answers in writing, consulting an engineer when the question is in that discipline.',
      'The answer returns to the general contractor, who passes it to the subcontractor. The written record protects both sides.'],
    note: why + dbNote
  };
  if (method === 'db') return {
    letter: 'C',
    title: 'Change order in design-build',
    path: ['subs', 'gc', 'owner', 'gc', 'subs'],
    stepOf: [0, 1, 2, 3, 3],
    steps: ['Subcontractor prices the extra work and any added time.',
      'Design-builder checks the design impact with its own architect and engineers and sends the proposal to the owner.',
      'Owner approves, and the owner and design-builder sign the change order.',
      'The design-builder directs the revised work to the subcontractor.'],
    note: ' With one contract, the owner deals with a single firm and does not route the change through a separate architect.'
  };
  return {
    letter: 'C',
    title: 'Change order: a signed change to the contract',
    path: ['subs', 'gc', 'arch', 'owner', 'gc', 'subs'],
    stepOf: [0, 1, 2, 3, 4, 4],
    steps: ['Subcontractor prices the extra work and any added time, for example the soft-soil fix.',
      'General contractor prepares the proposal and sends it to the architect.',
      'Architect, with the engineers, evaluates the proposal.',
      'Owner approves, and the owner, architect, and contractor sign the change order.',
      'The general contractor receives the signed order and directs the revised work to the subcontractor.'],
    note: why
  };
}

// ---- Layout: fixed grid positions in abstract units; vis-network fits them to the canvas ----
function positions(method, xs) {
  const r0 = -150, r1 = -30, r2 = 95;
  const p = { owner: [0, r0], bo: [170, r0] };
  if (method === 'db') {
    // the Architect (and its Engineers) sit under the design-builder
    p.gc = [0, r1]; p.arch = [-80, r2]; p.eng = [-235, r2]; p.subs = [170, r2];
  } else {
    p.arch = [-170, r1]; p.gc = [170, r1]; p.eng = [-170, r2]; p.subs = [170, r2];
  }
  Object.keys(p).forEach(k => { p[k][0] *= xs; });
  return p;
}

const nodeColors = { owner: 'gold', arch: 'lightskyblue', eng: 'lightskyblue', gc: 'lightsalmon', subs: 'lightsalmon', bo: 'lightgray' };

let network, nodes, edges, method = 'dbb', xScale = 1, selectedNode = null;
let anim = null; // { route, idx, hopStart, pausing, raf }

function isInIframe() { try { return window.self !== window.top; } catch (e) { return true; } }
function wideScale() { return document.getElementById('network').clientWidth >= 600 ? 1.5 : 1; }

function buildEdges() {
  return methods[method].edges.map((e, i) => ({
    id: i, from: e[0], to: e[1], title: e[3], kind: e[2],
    width: e[2] === 'c' ? 4 : 3,
    dashes: e[2] === 'm' ? [8, 8] : false,
    color: { color: e[2] === 'c' ? 'navy' : 'gray', highlight: 'darkorange', hover: 'darkorange' },
    arrows: { to: { enabled: false } }
  }));
}

function applyMethod() {
  const pos = positions(method, xScale);
  nodes.update(Object.keys(pos).map(k => ({
    id: k, x: pos[k][0], y: pos[k][1],
    label: k === 'gc' ? methods[method].gcLabel : roles[k].name.replace('Building Official', 'Building\nOfficial')
  })));
  edges.clear();
  edges.add(buildEdges());
  network.fit({ animation: false });
}

function stopAnim() {
  if (anim && anim.raf) cancelAnimationFrame(anim.raf);
  anim = null;
  ['btnSubmittal', 'btnRfi', 'btnChange'].forEach(id => document.getElementById(id).classList.remove('active'));
  if (network) network.redraw();
}

function showDefault() {
  const m = methods[method];
  document.getElementById('info').innerHTML =
    '<h3>' + m.name + '</h3><p>' + m.summary + '</p>' +
    '<p class="note">Click a participant or a line to learn about it, hover over a line to see whether it is a contract or an informal communication path, or press Submittal, RFI, or Change order to follow a document through the team.</p>';
}

function showNode(id) {
  const r = roles[id];
  document.getElementById('info').innerHTML = '<h3>' + r.name + (id === 'gc' ? ' (' + methods[method].gcLabel.replace('\n', ' ') + ')' : '') + '</h3><p>' + r.text + '</p>' +
    '<p>Contracts held: ' + contractsOf(id) + '.</p>';
}

function contractsOf(id) {
  const names = [];
  methods[method].edges.forEach(e => {
    if (e[2] !== 'c') return;
    if (e[0] === id) names.push(roles[e[1]].name);
    else if (e[1] === id) names.push(roles[e[0]].name);
  });
  return names.length ? names.join(', ') : 'none (communicates through the general contractor)';
}

function showEdge(i) {
  const e = methods[method].edges[i];
  document.getElementById('info').innerHTML = '<h3>' + roles[e[0]].name + ' and ' + roles[e[1]].name + '</h3><p>' + e[3] + '</p>';
}

function showRoute(r, idx) {
  const cur = r.stepOf[idx];
  document.getElementById('info').innerHTML = '<h3>' + r.title + '</h3><ol>' +
    r.steps.map((s, i) => '<li' + (i === cur ? ' class="now"' : '') + '>' + s + '</li>').join('') + '</ol>' +
    '<p class="note">' + (idx >= r.path.length - 1 ? 'Done.' : 'Step ' + (cur + 1) + ' of ' + r.steps.length + '.') + r.note + '</p>';
}

function startRoute(kind, btnId) {
  stopAnim();
  selectedNode = null;
  document.getElementById(btnId).classList.add('active');
  const route = routeFor(kind, method);
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  anim = { route: route, idx: 0, t0: performance.now(), pausing: true, hop: reduce ? 1 : 800, pause: reduce ? 1400 : 650 };
  showRoute(route, 0);
  tick();
}

// Advance the token: pause at a stop, then travel to the next stop
function tick() {
  if (!anim) return;
  const now = performance.now();
  const r = anim.route;
  if (anim.pausing) {
    if (now - anim.t0 >= anim.pause) {
      if (anim.idx >= r.path.length - 1) { anim.finished = true; network.redraw(); return; }
      anim.pausing = false; anim.t0 = now;
    }
  } else if (now - anim.t0 >= anim.hop) {
    anim.idx++; anim.pausing = true; anim.t0 = now;
    showRoute(r, anim.idx);
  }
  network.redraw();
  anim.raf = requestAnimationFrame(tick);
}

// Draw the token and a ring on the current node after each network draw
function drawToken(ctx) {
  if (!anim) return;
  const r = anim.route;
  const here = r.path[anim.idx];
  let tx, ty;
  if (anim.pausing) {
    const b = network.getBoundingBox(here);
    tx = b.right; ty = b.top;
    ctx.save();
    ctx.strokeStyle = 'darkorange';
    ctx.lineWidth = 6;
    ctx.strokeRect(b.left - 4, b.top - 4, b.right - b.left + 8, b.bottom - b.top + 8);
    ctx.restore();
  } else {
    const nxt = r.path[anim.idx + 1];
    const pos = network.getPositions([here, nxt]);
    const f = Math.min(1, (performance.now() - anim.t0) / anim.hop);
    const e = f * f * (3 - 2 * f);
    tx = pos[here].x + (pos[nxt].x - pos[here].x) * e;
    ty = pos[here].y + (pos[nxt].y - pos[here].y) * e;
  }
  ctx.save();
  ctx.beginPath();
  ctx.arc(tx, ty, 13, 0, 2 * Math.PI);
  ctx.fillStyle = 'darkorange';
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.fillStyle = 'black';
  ctx.font = 'bold 14px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(r.letter, tx, ty + 1);
  ctx.restore();
}

document.addEventListener('DOMContentLoaded', function () {
  xScale = wideScale();
  const pos = positions(method, xScale);
  nodes = new vis.DataSet(Object.keys(pos).map(k => ({
    id: k, label: k === 'gc' ? methods[method].gcLabel : roles[k].name.replace('Building Official', 'Building\nOfficial'),
    x: pos[k][0], y: pos[k][1], color: { background: nodeColors[k], border: 'navy', highlight: { background: nodeColors[k], border: 'darkorange' }, hover: { background: nodeColors[k], border: 'darkorange' } }
  })));
  edges = new vis.DataSet(buildEdges());
  const fullscreen = !isInIframe();
  network = new vis.Network(document.getElementById('network'), { nodes: nodes, edges: edges }, {
    layout: { improvedLayout: false },
    physics: { enabled: false },
    interaction: { hover: true, tooltipDelay: 120, selectConnectedEdges: false, dragNodes: false, dragView: fullscreen, zoomView: fullscreen, navigationButtons: false, keyboard: false },
    nodes: { shape: 'box', margin: 10, borderWidth: 3, font: { size: 16, face: 'Arial', color: 'black' }, shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 } },
    edges: { smooth: false, hoverWidth: 2, selectionWidth: 2, chosen: true }
  });
  network.once('afterDrawing', () => network.fit({ animation: false }));
  network.on('afterDrawing', drawToken);
  network.on('click', params => {
    stopAnim();
    if (params.nodes.length) { selectedNode = params.nodes[0]; showNode(selectedNode); }
    else if (params.edges.length) showEdge(params.edges[0]);
    else { selectedNode = null; showDefault(); }
  });
  document.getElementById('method').addEventListener('change', e => {
    stopAnim(); method = e.target.value; selectedNode = null; applyMethod(); showDefault();
  });
  document.getElementById('btnSubmittal').addEventListener('click', () => startRoute('submittal', 'btnSubmittal'));
  document.getElementById('btnRfi').addEventListener('click', () => startRoute('rfi', 'btnRfi'));
  document.getElementById('btnChange').addEventListener('click', () => startRoute('change', 'btnChange'));
  window.addEventListener('resize', () => {
    const s = wideScale();
    if (s !== xScale) { xScale = s; applyMethod(); } else { network.redraw(); network.fit({ animation: false }); }
  });
  showDefault();
});
