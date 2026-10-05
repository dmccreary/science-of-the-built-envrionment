// Rooftop PV Monthly Production Explorer - Chart.js
// CANVAS_HEIGHT: 626
// Bloom Level 4 (Analyze): examine monthly production against monthly load, find surplus months and the smallest array for full annual coverage
document.addEventListener('DOMContentLoaded', function () {
  // ---- Illustrative data (Appendix C) ----
  const MONTHS = [
    { n: 'January', a: 'Jan', d: 31, psh: 2.4, w: 1.4 }, { n: 'February', a: 'Feb', d: 28, psh: 3.4, w: 1.3 },
    { n: 'March', a: 'Mar', d: 31, psh: 4.5, w: 1.1 }, { n: 'April', a: 'Apr', d: 30, psh: 5.2, w: 0.9 },
    { n: 'May', a: 'May', d: 31, psh: 5.8, w: 0.8 }, { n: 'June', a: 'Jun', d: 30, psh: 6.2, w: 0.8 },
    { n: 'July', a: 'Jul', d: 31, psh: 6.3, w: 0.9 }, { n: 'August', a: 'Aug', d: 31, psh: 5.6, w: 0.9 },
    { n: 'September', a: 'Sep', d: 30, psh: 4.6, w: 0.8 }, { n: 'October', a: 'Oct', d: 31, psh: 3.4, w: 0.9 },
    { n: 'November', a: 'Nov', d: 30, psh: 2.2, w: 1.1 }, { n: 'December', a: 'Dec', d: 31, psh: 1.9, w: 1.1 }
  ];

  // ---- Model ----
  // monthly production = kW x derate x peak sun hours x days; load = annual/12 (flat) or annual x weight/12 (winter-heavy)
  function compute(kw, derate, annual, profile) {
    const prod = MONTHS.map(m => kw * derate * m.psh * m.d);
    const load = MONTHS.map(m => profile === 'Flat' ? annual / 12 : annual * m.w / 12);
    const surplus = prod.map((p, i) => p >= load[i]);
    const annualProd = prod.reduce((s, v) => s + v, 0);
    return { prod, load, surplus, annualProd, coverage: Math.round(annualProd / annual * 100) };
  }
  function smallestKw(derate, annual, profile) {
    for (let k = 1; k <= 30; k++) if (compute(k, derate, annual, profile).annualProd >= annual) return k;
    return 30;
  }
  const fmt = v => Math.round(v).toLocaleString('en-US');
  const names = idx => idx.map(i => MONTHS[i].n).join(', ');

  // ---- Challenges, fixed order ----
  const CH = [
    { kw: 7, dr: 0.80, use: 10000, prof: 'Flat', kind: 'months',
      setting: '7 kW array, derate 0.80, 10,000 kWh a year, flat load (833 kWh per month)',
      q: 'Which months will a 7 kW array produce more than this house uses?',
      hint: 'Production = 5.6 x peak sun hours x days (7 kW x 0.80). Compare each month with the flat load of 833 kWh.',
      why: 'Production is 5.6 x peak sun hours x days. It reaches 874, 1,007, 1,042, 1,094 and 972 kWh in those months. March (781) and September (773) fall just short of 833.' },
    { kw: 7, dr: 0.80, use: 10000, prof: 'Winter-heavy', kind: 'months',
      setting: 'Same 7 kW array, but a winter-heavy load: each month uses 10,000 kWh x weight / 12',
      q: 'Now the house uses more energy in winter. Which months will the same array produce more than the house uses?',
      hint: 'The load now changes by month: annual use x that month\'s weight / 12. Compare each month\'s production with its own load.',
      why: 'The load drops to 750 kWh in April, July, August and 667 in May, June, September. September\'s 773 kWh of production now exceeds its load, but October (590) and March (781, against a load of 917) do not.' },
    { kw: 8, dr: 0.80, use: 10000, prof: 'Flat', kind: 'size',
      setting: '10,000 kWh a year, derate 0.80, flat load',
      q: 'What is the smallest whole-kilowatt array that gives annual coverage of at least 100 percent?',
      hint: 'Annual production = 1,568.1 x 0.80 x kW. Find the smallest whole kW that reaches 10,000 kWh.',
      why: 'Annual production is 1,568.1 x 0.80 x kW. At 7 kW that is 8,781 kWh (88 percent). At 8 kW it is 10,035 kWh (100 percent).' }
  ];
  CH.forEach(c => {
    c.model = compute(c.kw, c.dr, c.use, c.prof);
    c.answerSet = c.model.surplus.map((s, i) => s ? i : -1).filter(i => i >= 0);
    c.answerKw = smallestKw(c.dr, c.use, c.prof);
    c.answerText = c.kind === 'months' ? names(c.answerSet) : c.answerKw + ' kW';
  });

  // ---- State ----
  let phase = 0;                        // 0..2 challenge, 3 exploration
  const attempts = [0, 0, 0];
  const outcome = ['open', 'open', 'open'];
  let chartShown = false;
  let shownModel = null;                // what the chart currently displays

  const $ = id => document.getElementById(id);
  const monthBoxes = [];
  MONTHS.forEach((m, i) => {
    const lab = document.createElement('label');
    const cb = document.createElement('input'); cb.type = 'checkbox'; cb.value = i;
    lab.appendChild(cb); lab.appendChild(document.createTextNode(m.a));
    $('months').appendChild(lab); monthBoxes.push(cb);
  });

  // ---- Chart ----
  const chart = new Chart($('chart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: MONTHS.map(m => m.a),
      datasets: [
        { label: 'Solar production (kWh)', data: [], backgroundColor: [], borderColor: 'dimgray', borderWidth: 1 },
        { label: 'Household load (kWh)', data: [], backgroundColor: 'steelblue', borderColor: 'navy', borderWidth: 1 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      scales: {
        y: { beginAtZero: true, suggestedMax: 1400, title: { display: true, text: 'kWh per month' } },
        x: { grid: { display: false } }
      },
      plugins: {
        legend: {
          labels: {
            generateLabels: () => [
              { text: 'Production in a surplus month', fillStyle: 'seagreen', strokeStyle: 'dimgray', lineWidth: 1 },
              { text: 'Production in a deficit month', fillStyle: 'darkorange', strokeStyle: 'dimgray', lineWidth: 1 },
              { text: 'Household load', fillStyle: 'steelblue', strokeStyle: 'navy', lineWidth: 1 }
            ]
          }
        },
        tooltip: {
          callbacks: {
            afterBody: items => {
              if (!shownModel || !items.length) return '';
              const i = items[0].dataIndex, d = shownModel.prod[i] - shownModel.load[i];
              return (d >= 0 ? 'Surplus ' : 'Deficit ') + fmt(Math.abs(d)) + ' kWh';
            }
          }
        }
      }
    }
  });

  function showChart(model) {
    shownModel = model;
    chart.data.datasets[0].data = model.prod.map(v => Math.round(v));
    chart.data.datasets[0].backgroundColor = model.surplus.map(s => s ? 'seagreen' : 'darkorange');
    chart.data.datasets[1].data = model.load.map(v => Math.round(v));
    chart.update();
    $('chartHidden').classList.add('hide');
    chartShown = true;
  }
  function hideChart() {
    $('chartHidden').classList.remove('hide');
    chartShown = false; shownModel = null;
  }

  // ---- Challenge flow ----
  function setMsg(text, kind) { const m = $('msg'); m.textContent = text; m.className = 'msg' + (kind ? ' ' + kind : ''); }
  function correctCount() { return outcome.filter(o => o === 'correct').length; }

  function startChallenge(i) {
    phase = i;
    const c = CH[i];
    $('challengePane').classList.remove('hide'); $('explorePane').classList.add('hide');
    $('status').textContent = 'Challenge ' + (i + 1) + ' of 3        Challenges correct: ' + correctCount() + ' of 3';
    $('setting').textContent = c.setting;
    $('question').textContent = c.q;
    monthBoxes.forEach(b => { b.checked = false; b.disabled = false; });
    $('months').classList.toggle('hide', c.kind !== 'months');
    $('numRow').classList.toggle('hide', c.kind !== 'size');
    $('kwInput').value = ''; $('kwInput').disabled = false;
    $('checkBtn').disabled = false;
    $('nextBtn').disabled = true;
    $('nextBtn').textContent = i < 2 ? 'Next challenge' : 'Unlock controls';
    setMsg('', '');
    hideChart();
    $('readout').innerHTML = '<div class="foot">Peak sun hours and load weights are illustrative. For a real site, use a tool such as <a href="https://pvwatts.nrel.gov/" target="_blank" rel="noopener">NREL PVWatts</a>.</div>';
  }

  function lock() {
    monthBoxes.forEach(b => { b.disabled = true; });
    $('kwInput').disabled = true; $('checkBtn').disabled = true; $('nextBtn').disabled = false;
    $('status').textContent = 'Challenge ' + (phase + 1) + ' of 3        Challenges correct: ' + correctCount() + ' of 3';
  }

  function check() {
    const c = CH[phase];
    if (outcome[phase] !== 'open') return;
    let ok, typed;
    if (c.kind === 'months') {
      const picked = monthBoxes.map((b, i) => b.checked ? i : -1).filter(i => i >= 0);
      if (!picked.length) { setMsg('Select the months you expect, then press Check.', 'bad'); return; }
      ok = picked.length === c.answerSet.length && picked.every((v, k) => v === c.answerSet[k]);
    } else {
      typed = parseInt($('kwInput').value, 10);
      if (isNaN(typed)) { setMsg('Type a whole number of kilowatts, then press Check.', 'bad'); return; }
      ok = typed === c.answerKw;
    }
    attempts[phase]++;
    if (ok) {
      outcome[phase] = 'correct';
      setMsg('Correct: ' + c.answerText + '.', 'good');
      showChart(c.kind === 'size' ? compute(c.answerKw, c.dr, c.use, c.prof) : c.model);
      lock();
    } else if (attempts[phase] >= 2) {
      outcome[phase] = 'missed';
      setMsg('Not this time. The answer is ' + c.answerText + '. ' + c.why, 'bad');
      showChart(c.kind === 'size' ? compute(c.answerKw, c.dr, c.use, c.prof) : c.model);
      lock();
    } else {
      let extra = '';
      if (c.kind === 'size') { const r = compute(typed, c.dr, c.use, c.prof); extra = ' A ' + typed + ' kW array covers ' + r.coverage + ' percent of the annual use.'; }
      setMsg('Not quite.' + extra + ' ' + c.hint + ' Try once more.', 'bad');
    }
    if (chartShown) summarize(shownModel, c.kind === 'size' ? c.answerKw : c.kw, c.use);
  }

  function summarize(model, kw, annual) {
    const sur = model.surplus.map((s, i) => s ? i : -1).filter(i => i >= 0);
    $('readout').innerHTML = '<div>Array <b>' + kw + ' kW</b> &nbsp; Annual production <b>' + fmt(model.annualProd) + ' kWh</b> &nbsp; Annual use <b>' + fmt(annual) +
      ' kWh</b> &nbsp; Annual coverage <b>' + model.coverage + '%</b></div><div>Surplus months: <b>' + (sur.length ? names(sur) : 'none') + '</b></div>' +
      '<div class="foot">Peak sun hours and load weights are illustrative. For a real site, use a tool such as <a href="https://pvwatts.nrel.gov/" target="_blank" rel="noopener">NREL PVWatts</a>.</div>';
  }

  function next() {
    if (outcome[phase] === 'open') return;
    if (phase < 2) startChallenge(phase + 1); else startExplore();
  }

  // ---- Exploration ----
  function startExplore() {
    phase = 3;
    $('challengePane').classList.add('hide'); $('explorePane').classList.remove('hide');
    update();
  }
  function update() {
    const kw = +$('kwSlider').value, dr = +$('drSlider').value, use = +$('useSlider').value, prof = $('profSel').value;
    $('kwText').textContent = 'Array size: ' + kw + ' kW';
    $('drText').textContent = 'Derate: ' + dr.toFixed(2);
    $('useText').textContent = 'Annual use: ' + fmt(use) + ' kWh';
    const model = compute(kw, dr, use, prof);
    showChart(model);
    summarize(model, kw, use);
    const sm = smallestKw(dr, use, prof);
    $('readout').firstChild.insertAdjacentHTML('beforeend', ' &nbsp; Smallest array for 100%: <b>' + sm + ' kW</b>');
  }
  ['kwSlider', 'drSlider', 'useSlider'].forEach(id => $(id).addEventListener('input', update));
  $('profSel').addEventListener('change', update);
  $('restartBtn').addEventListener('click', () => {
    for (let i = 0; i < 3; i++) { attempts[i] = 0; outcome[i] = 'open'; }
    startChallenge(0);
  });

  $('checkBtn').addEventListener('click', check);
  $('nextBtn').addEventListener('click', next);
  $('kwInput').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });

  startChallenge(0);
});
