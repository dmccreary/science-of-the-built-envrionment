// Ground Temperature versus Depth Explorer - Plotly.js
// CANVAS_HEIGHT: 690
// Bloom Level 4 (Analyze): examine how the seasonal swing and its timing change with depth
document.addEventListener('DOMContentLoaded', function () {
  // ---- Illustrative sites and soils (Appendix E) ----
  const SITES = {
    'Twin Cities-like': { mean: 45, swing: 28, note: 'annual mean 45°F, surface swing ±28°F' },
    'Mid-latitude example': { mean: 55, swing: 22, note: 'annual mean 55°F, surface swing ±22°F' }
  };
  const SOILS = {
    'Light dry soil': 0.03,   // diffusivity, m^2 per day
    'Typical soil': 0.05,
    'Wet dense soil': 0.07
  };
  const OMEGA = 2 * Math.PI / 365;  // per day
  const M_TO_FT = 3.281;
  const COLDEST_DAY = 20;           // the surface is coldest on day 20 (January 20)
  const DATES = [
    { day: 20, label: 'Jan 20', color: 'royalblue' },
    { day: 111, label: 'Apr 21', color: 'seagreen' },
    { day: 203, label: 'Jul 22', color: 'firebrick' },
    { day: 294, label: 'Oct 21', color: 'darkorange' }
  ];
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const MONTH_LEN = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // ---- Model ----
  const dampingFt = diffusivity => Math.sqrt(2 * diffusivity / OMEGA) * M_TO_FT;
  const swingAt = (site, d, z) => site.swing * Math.exp(-z / d);
  const tempAt = (site, d, z, t) => site.mean - site.swing * Math.exp(-z / d) * Math.cos(OMEGA * (t - COLDEST_DAY) - z / d);
  const delayDays = (d, z) => (z / d) * 365 / (2 * Math.PI);
  const depthForSwing = (site, d, s) => d * Math.log(site.swing / s);
  function doyToText(doy) {
    let n = ((Math.round(doy) - 1) % 365 + 365) % 365 + 1, m = 0;
    while (n > MONTH_LEN[m]) { n -= MONTH_LEN[m]; m++; }
    return MONTH_NAMES[m] + ' ' + n;
  }
  const dateToDoy = (m, d) => MONTH_LEN.slice(0, m).reduce((s, v) => s + v, 0) + d;

  // ---- Challenges, fixed order (Twin Cities-like site) ----
  const SITE0 = 'Twin Cities-like';
  const CH = [
    { soil: 'Typical soil', kind: 'swing', unit: '°F', tol: 0.5, depth: 10,
      q: 'At 10 feet, how much does the soil\'s temperature still swing between winter and summer?',
      label: 'Swing at 10 ft (±):', hint: 'The swing at depth z is the surface swing x e^(-z/d), where d is the damping depth of this soil (7.9 ft for typical soil).',
      why: 'The swing is 28 x e^(-10/7.9) = 28 x 0.28 = 7.9°F.' },
    { soil: 'Typical soil', kind: 'depth', unit: 'ft', tol: 1.5, target: 2,
      q: 'At what depth does the swing fall to 2°F or less in typical soil?',
      label: 'Depth (ft):', hint: 'Set the surface swing x e^(-z/d) equal to 2 and solve for z: depth = d x ln(surface swing / 2).',
      why: 'Depth = d x ln(28/2) = 7.9 x 2.64 = 20.9 ft.' },
    { soil: 'Wet dense soil', kind: 'depth', unit: 'ft', tol: 1.5, target: 2,
      q: 'Same question for wet dense soil: at what depth does the swing fall to 2°F or less?',
      label: 'Depth (ft):', hint: 'Use the same formula with the damping depth of wet dense soil (9.4 ft).',
      why: 'Wetter, denser soil carries the seasons deeper: 9.4 x 2.64 = 24.7 ft.' },
    { soil: 'Typical soil', kind: 'date', tolDays: 5, depth: 10,
      q: 'On what date is the soil coldest at 10 ft in typical soil?',
      hint: 'The coldest soil lags the surface (coldest on January 20) by (z / d) x 58 days.',
      why: 'The delay is (10 / 7.9) x 58 = 73 days after January 20, which is about April 3.' }
  ];
  CH.forEach(c => {
    const site = SITES[SITE0], d = dampingFt(SOILS[c.soil]);
    c.site = SITE0; c.d = d;
    if (c.kind === 'swing') { c.answer = swingAt(site, d, c.depth); c.text = '±' + c.answer.toFixed(1) + '°F'; }
    if (c.kind === 'depth') { c.answer = depthForSwing(site, d, c.target); c.text = c.answer.toFixed(1) + ' ft'; }
    if (c.kind === 'date') { c.answer = COLDEST_DAY + delayDays(d, c.depth); c.text = doyToText(c.answer); }
  });

  // ---- State ----
  let phase = 0;                       // 0..3 challenge, 4 exploration
  const attempts = [0, 0, 0, 0];
  const outcome = ['open', 'open', 'open', 'open'];
  const $ = id => document.getElementById(id);

  Object.keys(SITES).forEach(s => $('siteSel').add(new Option(s + ' (illustrative)', s)));
  Object.keys(SOILS).forEach(s => $('soilSel').add(new Option(s + ' (' + SOILS[s] + ' m²/day, damping depth ' + dampingFt(SOILS[s]).toFixed(1) + ' ft)', s)));
  $('soilSel').value = 'Typical soil';
  MONTH_NAMES.forEach((m, i) => $('monthSel').add(new Option(m, i)));

  // ---- Plot ----
  function plot(siteName, soilName, markerDepth, mark) {
    const site = SITES[siteName], d = dampingFt(SOILS[soilName]);
    const zs = []; for (let z = 0; z <= 30; z += 0.5) zs.push(z);
    const traces = DATES.map(dt => ({
      x: zs.map(z => tempAt(site, d, z, dt.day)), y: zs, mode: 'lines', name: dt.label,
      line: { color: dt.color, width: 3 }, hovertemplate: dt.label + ': %{x:.1f}°F at %{y:.1f} ft<extra></extra>'
    }));
    traces.push({ x: zs.map(z => site.mean + swingAt(site, d, z)), y: zs, mode: 'lines', name: 'Warmest and coldest',
      line: { color: 'gray', width: 1.5, dash: 'dash' }, hovertemplate: 'Extreme: %{x:.1f}°F at %{y:.1f} ft<extra></extra>' });
    traces.push({ x: zs.map(z => site.mean - swingAt(site, d, z)), y: zs, mode: 'lines', showlegend: false,
      line: { color: 'gray', width: 1.5, dash: 'dash' }, hovertemplate: 'Extreme: %{x:.1f}°F at %{y:.1f} ft<extra></extra>' });
    const shapes = [
      { type: 'rect', xref: 'x', yref: 'paper', x0: 45, x1: 75, y0: 0, y1: 1, fillcolor: 'palegreen', opacity: 0.25, line: { width: 0 }, layer: 'below' },
      { type: 'line', xref: 'paper', yref: 'y', x0: 0, x1: 1, y0: markerDepth, y1: markerDepth, line: { color: 'black', width: 2, dash: 'dot' } }
    ];
    const swing = swingAt(site, d, markerDepth);
    const annotations = [
      { xref: 'x', yref: 'paper', x: 60, y: 0.02, text: 'DOE steady range 45–75°F (below about 10 ft)', showarrow: false, font: { size: 12, color: 'darkgreen' } },
      { xref: 'paper', yref: 'y', x: 0.99, y: markerDepth, xanchor: 'right', yanchor: 'bottom', showarrow: false,
        text: (mark || (markerDepth + ' ft: swing ±' + swing.toFixed(1) + '°F')), font: { size: 14, color: 'black' }, bgcolor: 'white', bordercolor: 'gray', borderwidth: 1 }
    ];
    Plotly.react('plot', traces, {
      margin: { l: 55, r: 15, t: 8, b: 78 }, paper_bgcolor: 'aliceblue', plot_bgcolor: 'white',
      xaxis: { title: { text: 'Temperature (°F)' }, range: [10, 85], gridcolor: 'gainsboro', fixedrange: true },
      yaxis: { title: { text: 'Depth below surface (ft)' }, range: [30, 0], gridcolor: 'gainsboro', fixedrange: true },
      legend: { orientation: 'h', y: -0.28, x: 0.5, xanchor: 'center', font: { size: 13 } },
      shapes, annotations
    }, { displayModeBar: false, responsive: true });
  }

  // ---- Challenge flow ----
  const setMsg = (t, k) => { const m = $('msg'); m.textContent = t; m.className = 'msg' + (k ? ' ' + k : ''); };
  const correctCount = () => outcome.filter(o => o === 'correct').length;
  const statusText = () => 'Challenge ' + (phase + 1) + ' of 4        Challenges correct: ' + correctCount() + ' of 4';
  const footNote = '<div class="foot">Illustrative sites and soils with uniform soil, no snow cover, and no groundwater flow. A real site needs measured soil data (Chapter 9).</div>';

  function startChallenge(i) {
    phase = i;
    const c = CH[i];
    $('challengePane').classList.remove('hide'); $('explorePane').classList.add('hide');
    $('status').textContent = statusText();
    $('setting').textContent = 'Site: ' + SITE0 + ' (' + SITES[SITE0].note + '). Soil: ' + c.soil + ' (damping depth ' + c.d.toFixed(1) + ' ft). All values illustrative.';
    $('question').textContent = c.q;
    $('numRow').classList.toggle('hide', c.kind === 'date');
    $('dateRow').classList.toggle('hide', c.kind !== 'date');
    $('numLabel').textContent = c.label || 'Answer:'; $('numUnit').textContent = c.unit || '';
    $('numInput').value = ''; $('dayInput').value = ''; $('monthSel').value = 0;
    [$('numInput'), $('dayInput'), $('monthSel'), $('checkBtn')].forEach(e => { e.disabled = false; });
    $('nextBtn').disabled = true;
    $('nextBtn').textContent = i < 3 ? 'Next challenge' : 'Unlock controls';
    setMsg('', '');
    $('plotHidden').classList.remove('hide');
    $('readout').innerHTML = footNote;
  }

  function resolve(c) {
    [$('numInput'), $('dayInput'), $('monthSel'), $('checkBtn')].forEach(e => { e.disabled = true; });
    $('nextBtn').disabled = false;
    $('status').textContent = statusText();
    const depth = c.kind === 'depth' ? c.answer : c.depth;
    let mark;
    if (c.kind === 'swing') mark = 'swing at 10 ft: ±' + c.answer.toFixed(1) + '°F';
    if (c.kind === 'depth') mark = 'swing falls to 2°F at ' + c.answer.toFixed(1) + ' ft';
    if (c.kind === 'date') mark = 'coldest at 10 ft: about ' + c.text;
    plot(c.site, c.soil, Math.min(30, depth), mark);
    $('plotHidden').classList.add('hide');
    $('readout').innerHTML = '<div>The dotted line marks the answer. Dashed gray curves are the warmest and coldest temperatures reached at each depth.</div>' + footNote;
  }

  function check() {
    const c = CH[phase];
    if (outcome[phase] !== 'open') return;
    let ok;
    if (c.kind === 'date') {
      const day = parseInt($('dayInput').value, 10);
      const m = parseInt($('monthSel').value, 10);
      if (isNaN(day) || day < 1 || day > MONTH_LEN[m]) { setMsg('Pick a month and type a valid day, then press Check.', 'bad'); return; }
      ok = Math.abs(dateToDoy(m, day) - c.answer) <= c.tolDays;
    } else {
      const v = parseFloat($('numInput').value);
      if (isNaN(v)) { setMsg('Type a number, then press Check.', 'bad'); return; }
      ok = Math.abs(Math.abs(v) - c.answer) <= c.tol;
    }
    attempts[phase]++;
    if (ok) {
      outcome[phase] = 'correct';
      setMsg('Correct: ' + c.text + '.', 'good');
      resolve(c);
    } else if (attempts[phase] >= 2) {
      outcome[phase] = 'missed';
      setMsg('Not this time. The answer is ' + c.text + '. ' + c.why, 'bad');
      resolve(c);
    } else {
      setMsg('Not quite. ' + c.hint + ' Try once more.', 'bad');
    }
  }

  function next() {
    if (outcome[phase] === 'open') return;
    if (phase < 3) startChallenge(phase + 1); else startExplore();
  }

  // ---- Exploration ----
  function startExplore() {
    phase = 4;
    $('challengePane').classList.add('hide'); $('explorePane').classList.remove('hide');
    $('plotHidden').classList.add('hide');
    $('siteSel').value = SITE0; $('soilSel').value = 'Typical soil'; $('depthSlider').value = 10;
    update();
  }
  function update() {
    const siteName = $('siteSel').value, soilName = $('soilSel').value, z = +$('depthSlider').value;
    $('depthText').textContent = 'Marker depth: ' + z + ' ft';
    const site = SITES[siteName], d = dampingFt(SOILS[soilName]);
    const swing = swingAt(site, d, z), delay = delayDays(d, z);
    plot(siteName, soilName, z);
    $('readout').innerHTML = '<div>At <b>' + z + ' ft</b> in ' + soilName.toLowerCase() + ': mean <b>' + site.mean + '°F</b>, swing <b>±' + swing.toFixed(1) +
      '°F</b> (' + (site.mean - swing).toFixed(1) + ' to ' + (site.mean + swing).toFixed(1) + '°F).</div>' +
      '<div>Coldest on <b>' + doyToText(COLDEST_DAY + delay) + '</b> (' + Math.round(delay) + ' days after January 20); warmest on <b>' + doyToText(COLDEST_DAY + delay + 182.5) + '</b>.</div>' + footNote;
  }
  ['siteSel', 'soilSel'].forEach(id => $(id).addEventListener('change', update));
  $('depthSlider').addEventListener('input', update);
  $('restartBtn').addEventListener('click', () => {
    for (let i = 0; i < 4; i++) { attempts[i] = 0; outcome[i] = 'open'; }
    startChallenge(0);
  });
  $('checkBtn').addEventListener('click', check);
  $('nextBtn').addEventListener('click', next);
  ['numInput', 'dayInput'].forEach(id => $(id).addEventListener('keydown', e => { if (e.key === 'Enter') check(); }));

  startChallenge(0);
});
