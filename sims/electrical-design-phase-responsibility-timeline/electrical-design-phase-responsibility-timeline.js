// Electrical Design Phase Timeline MicroSim - vis-timeline of the eight project phases with one row per discipline, optional handoff arrows, and a cost-of-change marker
// CANVAS_HEIGHT: 460
// Bloom Level 2 (Understand) + Level 1 (Remember)
// MicroSim template version 2026.03

const PH_MS = 10 * 864e5;   // every phase is 10 "days" wide so the eight blocks are equal
const INSET = 0.04;         // gap between neighboring blocks, in phase units
const NARROW_PX = 620;      // below this width the phase blocks use short labels
const ph = x => new Date(x * PH_MS);

// ---- Data: the eight phases from Chapter 2, with the electrical designer's work from Chapter 16 ----
const phases = [
  { name: 'Programming', short: 'Prog', question: 'What does the owner need?',
    tasks: ['Learn special power needs, such as a commercial kitchen, EV charging, or a server room', 'Ask the owner about future growth'],
    deliverable: 'List of loads and requirements',
    meetings: 'Owner programming workshop; first team meeting with the architect',
    partners: ['arch'],
    oven: 'The oven is one more line in the list of loads. Minutes of work.' },
  { name: 'Schematic design', short: 'SD', question: 'What overall form works?',
    tasks: ['Estimate the service size from a rule-of-thumb load density (Riverbend: 8 VA per ft2 gives 72 kVA, a 200 A, 208Y/120 V service)', 'Meet the utility and send the load estimate', 'Locate the electrical room'],
    deliverable: 'Load estimate, service request',
    meetings: 'Utility service meeting; team coordination on room locations',
    partners: ['arch', 'mech', 'util'],
    oven: 'Add 12 kW (8.4 kVA at an illustrative 70 percent demand factor) to the load estimate before the utility picks a transformer. About an hour.' },
  { name: 'Design development', short: 'DD', question: 'How will it be built?',
    tasks: ['Choose systems: service voltage, lighting, controls', 'Locate panelboards and lay out lighting', 'Draw the one-line diagram and collect the mechanical equipment schedule'],
    deliverable: 'One-line diagram, preliminary plans',
    meetings: 'Design coordination meeting with overlaid ceiling plans; structural review of pads and penetrations; utility confirms the transformer',
    partners: ['arch', 'stru', 'mech', 'util'],
    oven: 'Check the service (about 94 percent of 200 A), add a 40 A three-pole breaker and panel space, redraw the one-line diagram, and tell the mechanical engineer about the heat and exhaust hood. A day or two.' },
  { name: 'Construction documents', short: 'CD', question: 'Exactly what is to be built?',
    tasks: ['Complete plans, panel schedules, and details', 'Finish the load calculation and the Division 26 specifications', 'Seal the drawings (the licensed engineer)'],
    deliverable: 'Stamped drawings, Division 26',
    meetings: 'Final coordination and clash-detection review; permit review',
    partners: ['arch', 'stru', 'mech', 'util'],
    oven: 'Revise the E-sheets, panel schedule, and Division 26, and coordinate the architectural and mechanical sheets too. Several days of work by several people.' },
  { name: 'Bidding and procurement', short: 'Bid', question: 'Who will build it, and for how much?',
    tasks: ['Answer bidders\' questions', 'Write addenda for any change to the documents'],
    deliverable: 'Addenda',
    meetings: 'Pre-bid conference',
    partners: ['arch', 'cont'],
    oven: 'Issue an addendum to every bidder, and prices may change. A late addendum can push back the bid date.' },
  { name: 'Construction', short: 'Const', question: 'Is it built as designed?',
    tasks: ['Review submittals for the electrical equipment', 'Answer requests for information', 'Observe the work in the field'],
    deliverable: 'Responses, field reports',
    meetings: 'Regular construction meetings; field coordination of conduit routes; inspections',
    partners: ['arch', 'stru', 'mech', 'cont', 'util'],
    oven: 'The conduit is already installed: demolish it, re-route the wiring, revise the drawings, and sign a change order. Weeks and a considerable sum.' },
  { name: 'Commissioning', short: 'Cx', question: 'Does it work as intended?',
    tasks: ['Verify that controls and lighting operate as designed', 'Witness tests of emergency lighting and transfer'],
    deliverable: 'Functional test reports',
    meetings: 'Commissioning kickoff; witnessed functional tests',
    partners: ['mech', 'cont'],
    oven: 'Finished walls and ceilings are opened for new conduit, and the tests are repeated. Costly, and a change order is needed.' },
  { name: 'Occupancy and closeout', short: 'Close', question: 'Is it ready to use?',
    tasks: ['Review the record drawings', 'Take part in training the owner\'s staff'],
    deliverable: 'Record documents',
    meetings: 'Turnover and closeout meeting',
    partners: ['arch', 'cont'],
    oven: 'The building is occupied, so this is a renovation: a new permit, disruption to users, and new record drawings. The highest cost.' }
];

// Conceptual cost-of-change index, the same curve as the Chapter 2 sim (not dollars)
const costIndex = [2, 4, 10, 22, 38, 62, 84, 100];

// ---- Data: disciplines, with the phases where each is most active (from, to in phase units) ----
const disciplines = [
  { id: 'arch', name: 'Architect', short: 'Architect', color: '#1d4ed8', edge: '#0b1f5c', style: 'solid',
    bars: [[0, 4, 'Leads the design'], [5, 6, 'Site admin']] },
  { id: 'stru', name: 'Structural engineer', short: 'Structural', color: '#7c3f00', edge: '#2e1700', style: 'dashed',
    bars: [[2, 4, 'Frame and openings'], [5, 6, 'Site visits']] },
  { id: 'mech', name: 'Mechanical engineer', short: 'Mechanical', color: '#0f766e', edge: '#032e2b', style: 'dotted',
    bars: [[2, 4, 'Equipment loads'], [6, 7, 'Testing']] },
  { id: 'elec', name: 'Electrical designer', short: 'Electrical', color: '#b45309', edge: '#431a03', style: 'double',
    bars: [[1, 4, 'Load estimate to documents'], [5, 8, 'Submittals to records']] },
  { id: 'cont', name: 'Contractor', short: 'Contractor', color: '#6b21a8', edge: '#2e1065', style: 'groove',
    bars: [[4, 7, 'Bids and builds']] },
  { id: 'util', name: 'Utility', short: 'Utility', color: '#be123c', edge: '#4c0519', style: 'ridge',
    bars: [[1, 3, 'Service request'], [5, 6, 'Connection']] }
];
const discById = {};
disciplines.forEach(d => { discById[d.id] = d; });

// ---- Data: handoffs between disciplines, drawn as numbered arrows in the phase where they happen ----
const handoffs = [
  { n: 1, phase: 1, from: 'arch', to: 'elec', text: 'Architect to electrical: room layout and space for the electrical room.' },
  { n: 2, phase: 1, from: 'elec', to: 'util', text: 'Electrical to utility: the load estimate and service request.' },
  { n: 3, phase: 2, from: 'mech', to: 'elec', text: 'Mechanical to electrical: the equipment schedule (voltage, phase, MCA, MOCP), which is the load data.' },
  { n: 4, phase: 2, from: 'util', to: 'elec', text: 'Utility to electrical: transformer size and location.' },
  { n: 5, phase: 3, from: 'elec', to: 'mech', text: 'Electrical to mechanical: lighting power and transformer heat for the cooling load.' },
  { n: 6, phase: 3, from: 'stru', to: 'elec', text: 'Structural to electrical: approved penetrations, sleeves, and equipment pads.' },
  { n: 7, phase: 4, from: 'elec', to: 'cont', text: 'Electrical to contractor: stamped drawings and Division 26 for bidding.' },
  { n: 8, phase: 5, from: 'cont', to: 'elec', text: 'Contractor to electrical: submittals and requests for information.' }
];

// ---- State ----
let timeline, items, groups, tlEl, svg;
let selectedPhase = -1;
let changePhase = 1;
let showHandoffs = false;
let filterId = 'all';
let narrowMode = null;

document.addEventListener('DOMContentLoaded', init);

function isNarrow() { return document.getElementById('app').clientWidth < NARROW_PX; }
function levelOf(v) { return v >= 75 ? 'Very high' : v >= 50 ? 'High' : v >= 25 ? 'Moderate' : v >= 10 ? 'Low' : 'Very low'; }
function levelColor(v) { return v >= 75 ? '#b91c1c' : v >= 50 ? '#c2410c' : v >= 25 ? '#a16207' : v >= 10 ? '#1d4ed8' : '#0f766e'; }

function init() {
  tlEl = document.getElementById('timeline');
  buildControls();

  groups = new vis.DataSet([{ id: 'phases', content: '', className: 'g-phases', order: 0 }].concat(
    disciplines.map((d, i) => ({ id: d.id, content: '', className: 'g-' + d.id, order: i + 1, visible: true }))));
  items = new vis.DataSet();
  buildItems();
  narrowMode = isNarrow();
  refreshLabels();

  timeline = new vis.Timeline(tlEl, items, groups, {
    width: '100%',
    orientation: 'top',
    stack: false,
    selectable: false,
    zoomable: false,
    moveable: false,
    horizontalScroll: false,
    verticalScroll: false,
    showCurrentTime: false,
    showMajorLabels: false,
    showMinorLabels: false,
    min: ph(0), max: ph(8), start: ph(0), end: ph(8),
    margin: { item: { horizontal: 0, vertical: 3 }, axis: 0 },
    tooltip: { followMouse: true, overflowMethod: 'cap' }
  });
  timeline.addCustomTime(ph(changePhase + 0.5), 'chg');

  svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('id', 'handoffs');
  tlEl.appendChild(svg);

  timeline.on('click', p => {
    if (p.what === 'group-label' || !p.time) return;
    const x = p.time.getTime() / PH_MS;
    if (x >= 0 && x < 8) selectPhase(Math.floor(x));
  });
  const snap = e => { const k = Math.max(0, Math.min(7, Math.floor(e.time.getTime() / PH_MS))); setChangePhase(k, true); };
  timeline.on('timechange', snap);
  timeline.on('timechanged', snap);
  timeline.on('changed', () => drawHandoffs());
  window.addEventListener('resize', onResize);

  renderPhaseBox();
  setChangePhase(changePhase, false);
  setTimeout(drawHandoffs, 150);
}

// ---- Controls ----
function buildControls() {
  const sel = document.getElementById('filter');
  sel.innerHTML = '<option value="all">All disciplines</option>' + disciplines.map(d => '<option value="' + d.id + '">' + d.name + '</option>').join('');
  sel.addEventListener('change', () => { filterId = sel.value; applyFilter(); });
  document.getElementById('handoffToggle').addEventListener('change', e => { showHandoffs = e.target.checked; drawHandoffs(); renderPhaseBox(); });
  document.getElementById('changeSlider').addEventListener('input', e => setChangePhase(parseInt(e.target.value) - 1, false));
}

// The electrical designer row stays visible as the reference, so handoffs to the chosen discipline remain on screen
function applyFilter() {
  groups.update(disciplines.map(d => ({ id: d.id, visible: filterId === 'all' || d.id === filterId || d.id === 'elec' })));
  setTimeout(() => { timeline.redraw(); drawHandoffs(); }, 60);
}

function setChangePhase(k, fromTimeline) {
  changePhase = k;
  document.getElementById('changeSlider').value = k + 1;
  timeline.setCustomTime(ph(k + 0.5), 'chg');
  const v = costIndex[k];
  document.getElementById('changeLabel').textContent = 'Phase ' + (k + 1);
  document.getElementById('costBox').innerHTML =
    '<h3>Cost of changing the kitchen oven</h3>' +
    '<div class="row"><b>If the owner asks in phase ' + (k + 1) + ' (' + phases[k].name + '):</b></div>' +
    '<div class="meter" role="img" aria-label="Cost index ' + v + ' of 100"><div class="fill" style="width:' + v + '%;background:' + levelColor(v) + '"></div></div>' +
    '<div class="row"><b>Relative cost: ' + levelOf(v) + '</b> (index ' + v + ' of 100)</div>' +
    '<div class="row">' + phases[k].oven + '</div>' +
    '<div class="note">Conceptual index and illustrative Riverbend example, not dollars. Same curve as Chapter 2.</div>';
}

// ---- Items: phase blocks, discipline bars, and column shading ----
function phaseHtml(i) {
  return narrowMode
    ? '<b>' + (i + 1) + '</b><br>' + phases[i].short
    : '<b>' + (i + 1) + '</b> ' + phases[i].name.replace(' and ', ' &amp; ').replace('Commissioning', 'Commis&shy;sioning');
}

function buildItems() {
  const list = [];
  phases.forEach((p, i) => {
    list.push({ id: 'bg' + i, type: 'background', start: ph(i), end: ph(i + 1), className: i % 2 ? 'bgA' : 'bgB' });
    list.push({ id: 'ph' + i, group: 'phases', type: 'range', start: ph(i + INSET), end: ph(i + 1 - INSET), content: phaseHtml(i), className: 'phase',
      title: 'Phase ' + (i + 1) + ': ' + p.name + '. Main question: ' + p.question });
  });
  disciplines.forEach(d => d.bars.forEach((b, k) => {
    list.push({ id: d.id + k, group: d.id, type: 'range', start: ph(b[0] + INSET), end: ph(b[1] - INSET), content: b[2], className: 'bar bar-' + d.id,
      title: d.name + ' is most active in ' + phaseSpan(b[0], b[1]) + ': ' + b[2].toLowerCase() + '.' });
  }));
  items.add(list);
}

function phaseSpan(a, b) { return b - a === 1 ? 'phase ' + (a + 1) + ' (' + phases[a].name + ')' : 'phases ' + (a + 1) + ' to ' + b + ' (' + phases[a].name + ' to ' + phases[b - 1].name + ')'; }

function refreshLabels() {
  groups.update([{ id: 'phases', content: '<span class="gl">Project phase</span>' }].concat(disciplines.map(d => ({
    id: d.id,
    content: '<span class="sw" style="background:' + d.color + ';border-color:' + d.edge + ';border-style:' + d.style + '"></span><span class="gl">' + (narrowMode ? d.short : d.name) + '</span>'
  }))));
  items.update(phases.map((p, i) => ({ id: 'ph' + i, content: phaseHtml(i) })));
}

function onResize() {
  const n = isNarrow();
  if (n !== narrowMode) { narrowMode = n; refreshLabels(); renderPhaseBox(); }
  timeline.setWindow(ph(0), ph(8), { animation: false });
  setTimeout(() => { timeline.redraw(); drawHandoffs(); }, 80);
}

// ---- Selecting a phase: highlight its column and fill the phase box ----
function selectPhase(i) {
  selectedPhase = i;
  items.update(phases.map((p, k) => ({ id: 'bg' + k, className: (k === i ? 'bgSel' : (k % 2 ? 'bgA' : 'bgB')) })));
  items.update(phases.map((p, k) => ({ id: 'ph' + k, className: k === i ? 'phase sel' : 'phase' })));
  renderPhaseBox();
}

function renderPhaseBox() {
  const box = document.getElementById('phaseBox');
  if (selectedPhase < 0) {
    let h = '<h3>Phase details</h3><div class="row">Click any phase block, or any column, to see the electrical designer\'s tasks, deliverables, and coordination meetings.</div>';
    if (narrowMode) h += '<div class="note">Phases: ' + phases.map((p, i) => (i + 1) + ' ' + p.name).join(', ') + '.</div>';
    if (showHandoffs) h += '<div class="row"><b>Handoffs (numbered arrows):</b></div>' + handoffs.map(hf => '<div class="row ho"><b>' + hf.n + '.</b> ' + hf.text + '</div>').join('');
    else h += '<div class="note">Hover over a phase block for its main question.</div>';
    box.innerHTML = h;
    return;
  }
  const p = phases[selectedPhase];
  const partners = p.partners.map(id => discById[id].name).join(', ');
  const hos = handoffs.filter(h => h.phase === selectedPhase);
  box.innerHTML =
    '<h3>Phase ' + (selectedPhase + 1) + ': ' + p.name + '</h3>' +
    '<div class="row"><b>Main question:</b> ' + p.question + '</div>' +
    '<div class="row"><b>Electrical designer\'s tasks:</b></div><ul>' + p.tasks.map(t => '<li>' + t + '</li>').join('') + '</ul>' +
    '<div class="row"><b>Deliverables:</b> ' + p.deliverable + '</div>' +
    '<div class="row"><b>Coordination meetings:</b> ' + p.meetings + '</div>' +
    '<div class="row"><b>Works with:</b> ' + partners + '</div>' +
    (hos.length ? '<div class="row"><b>Handoffs this phase' + (showHandoffs ? ' (numbered arrows)' : '') + ':</b></div>' + hos.map(h => '<div class="row ho"><b>' + h.n + '.</b> ' + h.text + '</div>').join('') : '');
  box.scrollTop = 0;
}

// ---- Handoff arrows: an SVG overlay positioned from the row labels and the fixed phase columns ----
function drawHandoffs() {
  if (!svg) return;
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  if (!showHandoffs) return;
  const cont = tlEl.getBoundingClientRect();
  const centerEl = tlEl.querySelector('.vis-panel.vis-center');
  if (!centerEl) return;
  const center = centerEl.getBoundingClientRect();
  svg.setAttribute('width', cont.width);
  svg.setAttribute('height', cont.height);
  const NS = 'http://www.w3.org/2000/svg';
  const defs = document.createElementNS(NS, 'defs');
  defs.innerHTML = '<marker id="ah" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#0f172a"/></marker>';
  svg.appendChild(defs);
  const rowY = id => {
    const el = tlEl.querySelector('.vis-labelset .vis-label.g-' + id);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return r.top - cont.top + r.height / 2;
  };
  const perPhase = {};
  handoffs.forEach(h => { perPhase[h.phase] = (perPhase[h.phase] || 0) + 1; });
  const seen = {};
  handoffs.forEach(h => {
    const k = seen[h.phase] = (seen[h.phase] || 0) + 1;
    const y1 = rowY(h.from), y2 = rowY(h.to);
    if (y1 === null || y2 === null) return;
    const off = perPhase[h.phase] === 1 ? 0.5 : (k === 1 ? 0.28 : 0.72);
    const x = center.left - cont.left + (h.phase + off) / 8 * center.width;
    const dir = y2 > y1 ? 1 : -1;
    const ya = y1 + dir * 4, yb = y2 - dir * 12;
    ['#ffffff', '#0f172a'].forEach((col, pass) => {
      const ln = document.createElementNS(NS, 'line');
      ln.setAttribute('x1', x); ln.setAttribute('x2', x); ln.setAttribute('y1', ya); ln.setAttribute('y2', yb);
      ln.setAttribute('stroke', col); ln.setAttribute('stroke-width', pass ? 2.5 : 6);
      if (pass) ln.setAttribute('marker-end', 'url(#ah)');
      svg.appendChild(ln);
    });
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'badge');
    const c = document.createElementNS(NS, 'circle');
    c.setAttribute('cx', x); c.setAttribute('cy', y1); c.setAttribute('r', 9);
    const t = document.createElementNS(NS, 'text');
    t.setAttribute('x', x); t.setAttribute('y', y1 + 4.5); t.setAttribute('text-anchor', 'middle');
    t.textContent = h.n;
    const ttl = document.createElementNS(NS, 'title');
    ttl.textContent = h.text;
    g.appendChild(ttl); g.appendChild(c); g.appendChild(t);
    svg.appendChild(g);
  });
}
