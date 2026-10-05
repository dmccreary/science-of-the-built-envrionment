// Sensor-to-Action Map - vis-network
// CANVAS_HEIGHT: 645
// Bloom Level 2 (Understand): classify each of six building inputs by the control action it should drive
document.addEventListener('DOMContentLoaded', function () {
  const $ = id => document.getElementById(id);

  // ---- Content (original wording; follows Appendix F and Appendices B and D) ----
  const INPUTS = [
    { label: 'Room carbon dioxide sensor', action: 'Ventilation airflow',
      measures: 'Measures the carbon dioxide concentration in the room air, in parts per million.',
      why: 'Carbon dioxide tracks the ventilation rate per person, so the controller raises or lowers outdoor air to hold the setpoint.' },
    { label: 'Room temperature sensor', action: 'Heat pump compressor speed',
      measures: 'Measures the air temperature in the room.',
      why: 'The controller compares room temperature with the setpoint and speeds up or slows down the compressor to close the gap.' },
    { label: 'Water leak sensor', action: 'Main water shutoff valve',
      measures: 'Detects water where it should not be, such as under a sink or beside a water heater.',
      why: 'Closing the valve at once limits the damage that a leak causes.' },
    { label: 'Occupancy sensor', action: 'Lighting and temperature setback',
      measures: 'Detects whether people are present in the room.',
      why: 'Empty rooms do not need full lighting or comfort conditions, so the controller dims lights and relaxes the setpoint.' },
    { label: 'Outdoor temperature sensor', action: 'Heat recovery ventilator defrost mode',
      measures: 'Measures the air temperature outside the building.',
      why: 'Below the frost threshold the controller starts the defrost strategy described in Appendix B.' },
    { label: 'Utility time-of-use price signal *', action: 'Battery charge and discharge', signal: true,
      measures: 'Is a signal from the utility, not a sensor, that tells the building the current price of electricity.',
      why: 'The controller charges the battery when energy is cheap and discharges it when energy is expensive.' }
  ];
  const ACTION_DOES = {
    'Ventilation airflow': 'Raises or lowers the outdoor air delivered to the room.',
    'Heat pump compressor speed': 'Speeds the compressor up or slows it down to match the heating or cooling needed.',
    'Main water shutoff valve': 'Closes the water supply to the building.',
    'Lighting and temperature setback': 'Dims the lights and relaxes the temperature setpoint in an empty room.',
    'Heat recovery ventilator defrost mode': 'Starts the strategy that melts or prevents frost in the heat recovery core.',
    'Battery charge and discharge': 'Charges the battery when energy is cheap and discharges it when energy is expensive.'
  };
  // action column order is shuffled so the correct links are not a set of parallel lines
  const ACTION_ORDER = ['Battery charge and discharge', 'Lighting and temperature setback', 'Heat recovery ventilator defrost mode',
    'Ventilation airflow', 'Main water shutoff valve', 'Heat pump compressor speed'];

  // ---- State ----
  let cur = 0;                       // current input index
  let choice = null;                 // selected action label for the current input
  let committed = [];                // { chosen, ok } per input
  let stage = 'choose';              // choose | feedback | done
  let usedOk = new Set();            // actions already matched correctly
  let nodes, edges, network;

  const inId = i => 'in' + i, acId = a => 'ac:' + a;
  const W = () => $('network').clientWidth || 640;

  function nodeFor(i) {
    return { id: inId(i), label: INPUTS[i].label, shape: 'box', group: 'input' };
  }

  function buildNodes() {
    const w = W(), colX = w * 0.30, top = -140, pitch = 56;
    const arr = [];
    INPUTS.forEach((inp, i) => arr.push(Object.assign(nodeFor(i), { x: -colX, y: top + i * pitch })));
    ACTION_ORDER.forEach((a, k) => arr.push({ id: acId(a), label: a, shape: 'box', group: 'action', x: colX, y: top + k * pitch }));
    return arr;
  }

  function styleNodes() {
    INPUTS.forEach((inp, i) => {
      const done = committed[i];
      const isCur = stage !== 'done' && i === cur;
      nodes.update({ id: inId(i),
        color: { background: inp.signal ? 'plum' : 'lightblue', border: done ? (done.ok ? 'seagreen' : 'firebrick') : (isCur ? 'darkorange' : 'steelblue'),
          highlight: { background: inp.signal ? 'plum' : 'lightblue', border: 'navy' }, hover: { background: inp.signal ? 'plum' : 'lightblue', border: 'navy' } },
        borderWidth: isCur || done ? 4 : 2, font: { size: 14, color: 'black' }, margin: 8, widthConstraint: { maximum: Math.max(120, W() * 0.27) } });
    });
    ACTION_ORDER.forEach(a => {
      const used = usedOk.has(a), sel = a === choice;
      nodes.update({ id: acId(a),
        color: { background: used ? 'gainsboro' : 'lightyellow', border: sel ? 'darkorange' : (used ? 'seagreen' : 'goldenrod'),
          highlight: { background: 'lightyellow', border: 'navy' }, hover: { background: 'lightyellow', border: 'navy' } },
        borderWidth: sel ? 4 : 2, font: { size: 14, color: used ? 'dimgray' : 'black' }, margin: 8, widthConstraint: { maximum: Math.max(120, W() * 0.27) } });
    });
  }

  function initNetwork() {
    nodes = new vis.DataSet(buildNodes());
    edges = new vis.DataSet([]);
    network = new vis.Network($('network'), { nodes, edges }, {
      physics: false,
      interaction: { dragNodes: false, dragView: false, zoomView: false, hover: true, selectConnectedEdges: false },
      edges: { arrows: { to: { enabled: true, scaleFactor: 0.8 } }, smooth: false, width: 3 },
      nodes: { shape: 'box' }
    });
    network.on('click', params => {
      if (!params.nodes.length) return;
      onNodeClick(params.nodes[0]);
    });
    styleNodes();
    network.fit({ animation: false });
  }

  // ---- Drill ----
  function setFb(html, kind) { const f = $('fb'); f.innerHTML = html; f.className = kind || 'info'; }
  function scoreText() { return committed.length ? 'Correct: ' + committed.filter(c => c.ok).length + ' of 6' : ''; }

  function showPrompt() {
    const p = $('prompt');
    if (stage === 'done') {
      const n = committed.filter(c => c.ok).length;
      p.innerHTML = '<b>Final score: ' + n + ' of 6.</b> ' + (n >= 5 ? 'That reaches mastery (5 of 6).' : 'Mastery is 5 of 6; restart to try again.') + ' All six correct links are drawn. Click any node to read what it measures or does.';
      return;
    }
    const inp = INPUTS[cur];
    p.innerHTML = 'Which action should each input drive? <br><b>Input ' + (cur + 1) + ' of 6: ' + inp.label.replace(' *', '') + '</b>' + (inp.signal ? ' (a signal from the utility, not a sensor)' : '') +
      (stage === 'choose' ? '. Click one of the six actions, then confirm.' : '');
  }

  function fillSelect() {
    const s = $('actionSel'); s.innerHTML = '';
    s.add(new Option('Choose an action...', ''));
    ACTION_ORDER.forEach(a => { const o = new Option(a, a); o.disabled = usedOk.has(a); s.add(o); });
    s.value = choice || '';
  }

  function render() {
    showPrompt(); fillSelect(); styleNodes();
    $('score').textContent = scoreText();
    const done = stage === 'done';
    $('actionSel').disabled = stage !== 'choose';
    $('goBtn').textContent = stage === 'choose' ? 'Confirm choice' : stage === 'feedback' ? (cur < 5 ? 'Next input' : 'See my score') : 'Restart';
    $('goBtn').disabled = stage === 'choose' && !choice;
  }

  function onNodeClick(id) {
    if (stage === 'done') { showInfo(id); return; }
    if (stage !== 'choose' || !id.startsWith('ac:')) return;
    const a = id.slice(3);
    if (usedOk.has(a)) return;
    choice = a; render();
  }

  $('actionSel').addEventListener('change', e => { choice = e.target.value || null; render(); });

  function confirm() {
    const inp = INPUTS[cur];
    const ok = choice === inp.action;
    committed[cur] = { chosen: choice, ok };
    if (ok) usedOk.add(choice);
    edges.add({ id: 'e' + cur, from: inId(cur), to: acId(choice), color: { color: ok ? 'seagreen' : 'firebrick' }, dashes: !ok, width: ok ? 4 : 3 });
    stage = 'feedback';
    setFb('<b>' + (ok ? 'Correct: ' : 'Not quite: ') + '</b>' + inp.why + (ok ? '' : ' The correct action is <b>' + inp.action + '</b>.'), ok ? 'good' : 'bad');
    render();
  }

  function advance() {
    if (cur < 5) { cur++; choice = null; stage = 'choose'; setFb('Pick the action this input should drive. Each action is the right answer for exactly one input.', 'info'); render(); return; }
    finish();
  }

  function finish() {
    stage = 'done'; choice = null;
    // draw all six correct links; wrong picks are replaced by the correct link
    edges.clear();
    INPUTS.forEach((inp, i) => edges.add({ id: 'e' + i, from: inId(i), to: acId(inp.action), color: { color: 'seagreen' }, width: 4 }));
    const missed = committed.map((c, i) => c.ok ? null : '<li>' + INPUTS[i].label.replace(' *', '') + ': you chose ' + c.chosen + '</li>').filter(Boolean);
    setFb(missed.length ? 'Matches to review:<ul style="margin:2px 0 0 18px;padding:0">' + missed.join('') + '</ul>Click a node for details.' : 'Every input matched. Click a node to see what it measures and what its action does.', missed.length ? 'bad' : 'good');
    render();
  }

  function showInfo(id) {
    let i;
    if (id.startsWith('in')) i = parseInt(id.slice(2), 10);
    else i = INPUTS.findIndex(x => x.action === id.slice(3));
    const inp = INPUTS[i];
    setFb('<b>' + inp.label.replace(' *', '') + '.</b> ' + inp.measures + '<br><b>Drives: ' + inp.action + '.</b> ' + ACTION_DOES[inp.action] +
      '<br><i>Every action is driven by a measurement or signal that tells the controller whether the building needs it.</i>', 'info');
  }

  $('goBtn').addEventListener('click', () => {
    if (stage === 'choose') { if (choice) confirm(); }
    else if (stage === 'feedback') advance();
    else restart();
  });

  function restart() {
    cur = 0; choice = null; committed = []; usedOk = new Set(); stage = 'choose'; edges.clear();
    setFb('Pick the action this input should drive. Each action is the right answer for exactly one input.', 'info');
    render();
  }

  window.addEventListener('resize', () => {
    const w = W(), colX = w * 0.30;
    INPUTS.forEach((inp, i) => nodes.update({ id: inId(i), x: -colX }));
    ACTION_ORDER.forEach(a => nodes.update({ id: acId(a), x: colX }));
    styleNodes(); network.redraw(); network.fit({ animation: false });
  });

  initNetwork();
  setFb('Pick the action this input should drive. Each action is the right answer for exactly one input.', 'info');
  render();
});
