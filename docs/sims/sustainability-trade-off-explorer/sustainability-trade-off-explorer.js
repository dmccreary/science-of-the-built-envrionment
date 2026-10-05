// Sustainability Trade-Off Explorer MicroSim - Chart.js radar and bar charts of a weighted decision matrix for three Riverbend heating options
// CANVAS_HEIGHT: 800
// Bloom Level 5 (Evaluate)
// MicroSim template version 2026.03

const DIMS = ['Environment', 'Society', 'Economy'];

// ---- Data: the worked example in Chapter 19. The 1-5 scores are the book's illustrative judgments, not measurements ----
const OPTS = [
  { key: 'A', name: 'Gas rooftop unit', legend: 'A: Gas rooftop', color: 'darkorange', fill: 'rgba(255,140,0,0.10)', dash: [], pt: 'circle' },
  { key: 'B', name: 'Air-source heat pump', legend: 'B: Air-source HP', color: 'steelblue', fill: 'rgba(70,130,180,0.10)', dash: [9, 4], pt: 'triangle' },
  { key: 'C', name: 'Ground-source heat pump', legend: 'C: Ground-source HP', color: 'seagreen', fill: 'rgba(46,139,87,0.10)', dash: [2, 3], pt: 'rect' }
];
const DEFAULT_SCORES = [[2, 3, 5], [4, 4, 4], [5, 4, 2]];
const PRESETS = {                         // weights in percent: Environment, Society, Economy
  equal: [100 / 3, 100 / 3, 100 / 3],
  cost: [15, 15, 70],                     // chapter example: 70 percent on economy
  climate: [60, 20, 20]                   // chapter example: 60 percent on environment
};

// ---- State ----
let scores = DEFAULT_SCORES.map(r => r.slice());
let w = PRESETS.equal.slice();
let editing = false;
let radarChart = null, barChart = null;
const $ = id => document.getElementById(id);
const pct = v => (Math.abs(v - Math.round(v)) < 0.05 ? String(Math.round(v)) : v.toFixed(1));

function totals(wt) { return scores.map(s => s.reduce((a, v, d) => a + v * wt[d] / 100, 0)); }

// index of the leading option; the option `prefer` wins exact ties so lead intervals stay contiguous
function leader(tot, prefer) {
  let b = 0;
  tot.forEach((t, i) => { if (t > tot[b] + 1e-9) b = i; });
  if (prefer !== undefined && tot[prefer] >= tot[b] - 1e-9) return prefer;
  return b;
}

// ---- Weights: moving one slider rescales the other two in proportion so the sum stays 100 ----
function setWeight(i, v) {
  const o = [0, 1, 2].filter(k => k !== i);
  const rem = 100 - v, sumO = w[o[0]] + w[o[1]];
  const a = sumO > 0 ? w[o[0]] * rem / sumO : rem / 2;
  w[i] = v; w[o[0]] = a; w[o[1]] = rem - a;
}

function setWeights(arr) { w = arr.slice(); }

// ---- Lead-change readout: sweep one weight from 0 to 100 with the other two held in their current ratio ----
function leadRange(d, cur) {
  const o = [0, 1, 2].filter(k => k !== d);
  const sumO = w[o[0]] + w[o[1]];
  const r0 = sumO > 0 ? w[o[0]] / sumO : 0.5;
  const at = x => { const v = []; v[d] = x; v[o[0]] = (100 - x) * r0; v[o[1]] = (100 - x) * (1 - r0); return leader(totals(v), cur); };
  let lo = w[d], hi = w[d];
  while (lo > 0 && at(Math.max(0, lo - 0.1)) === cur) lo = Math.max(0, lo - 0.1);
  while (hi < 100 && at(Math.min(100, hi + 0.1)) === cur) hi = Math.min(100, hi + 0.1);
  return { lo, hi, below: lo > 0.05 ? at(Math.max(0, lo - 0.1)) : -1, above: hi < 99.95 ? at(Math.min(100, hi + 0.1)) : -1 };
}

function leadText(d, cur) {
  const r = leadRange(d, cur), n = OPTS[cur].key, lo = Math.round(r.lo), hi = Math.round(r.hi);
  let t;
  if (r.below < 0 && r.above < 0) return DIMS[d] + ' weight: Option ' + n + ' leads at any value.';
  if (r.below < 0) t = 'leads up to ' + hi + '%';
  else if (r.above < 0) t = 'leads from ' + lo + '% up';
  else t = 'leads from ' + lo + '% to ' + hi + '%';
  const extra = [];
  if (r.below >= 0) extra.push(OPTS[r.below].key + ' below');
  if (r.above >= 0) extra.push(OPTS[r.above].key + ' above');
  return DIMS[d] + ' weight: Option ' + n + ' ' + t + ' (' + extra.join(', ') + ').';
}

// ---- Charts ----
function buildCharts() {
  Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
  radarChart = new Chart($('radarChart'), {
    type: 'radar',
    data: {
      labels: DIMS,
      datasets: OPTS.map((o, i) => ({
        label: o.legend, data: scores[i], borderColor: o.color, backgroundColor: o.fill, borderWidth: 2.5,
        borderDash: o.dash, pointStyle: o.pt, pointRadius: 6, pointHoverRadius: 8, pointBackgroundColor: o.color, pointBorderColor: 'white', hitRadius: 10
      }))
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
      interaction: { mode: 'point', intersect: true },
      layout: { padding: 4 },
      scales: { r: { min: 0, max: 5, ticks: { stepSize: 1, backdropColor: 'rgba(240,248,255,0.8)', font: { size: 11 } }, pointLabels: { font: { size: 14, weight: 'bold' } }, angleLines: { color: 'gray' }, grid: { color: 'silver' } } },
      plugins: {
        legend: { position: 'bottom', labels: { boxWidth: 22, font: { size: 12 }, padding: 6 } },
        tooltip: {
          bodyFont: { size: 14 }, titleFont: { size: 14 },
          callbacks: {
            title: items => items[0].label,
            label: c => 'Option ' + OPTS[c.datasetIndex].key + ': score ' + c.parsed.r + ' of 5'
          }
        }
      }
    }
  });

  const valueLabels = {
    id: 'valueLabels',
    afterDatasetsDraw(chart) {
      const { ctx } = chart, meta = chart.getDatasetMeta(0), tot = totals(w), lead = leader(tot);
      ctx.save();
      ctx.textAlign = 'center'; ctx.fillStyle = 'black';
      meta.data.forEach((bar, i) => {
        const isLead = i === lead && tot.filter(t => Math.abs(t - tot[lead]) < 1e-9).length === 1;
        ctx.font = (isLead ? 'bold 15px' : '14px') + ' Arial, Helvetica, sans-serif';
        ctx.fillText(tot[i].toFixed(2), bar.x, bar.y - (isLead ? 20 : 6));
        if (isLead) { ctx.font = 'bold 12px Arial, Helvetica, sans-serif'; ctx.fillText('LEADS', bar.x, bar.y - 6); }
      });
      ctx.restore();
    }
  };
  barChart = new Chart($('barChart'), {
    type: 'bar',
    data: { labels: OPTS.map(o => 'Option ' + o.key), datasets: [{ label: 'Weighted total', data: [0, 0, 0], borderWidth: 2, borderColor: OPTS.map(o => o.color), backgroundColor: OPTS.map(o => o.color) }] },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
      layout: { padding: { top: 6 } },
      scales: {
        y: { min: 0, max: 5, ticks: { stepSize: 1, font: { size: 12 } }, title: { display: true, text: 'Weighted total (1 to 5)', font: { size: 12 } } },
        x: { ticks: { font: { size: 13, weight: 'bold' } } }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Weighted total score', font: { size: 14 }, padding: { top: 0, bottom: 22 } },
        tooltip: {
          bodyFont: { size: 14 }, titleFont: { size: 14 },
          callbacks: {
            title: items => OPTS[items[0].dataIndex].key + ': ' + OPTS[items[0].dataIndex].name,
            label: c => DIMS.map((d, k) => pct(w[k]) + '% × ' + scores[c.dataIndex][k]).join(' + ') + ' = ' + c.parsed.y.toFixed(2)
          }
        }
      }
    },
    plugins: [valueLabels]
  });
}

// ---- Score table: read-only until "Edit scores" is checked ----
function buildTable() {
  const t = $('scoreTable');
  let h = '<tr><th>Option</th>' + DIMS.map(d => '<th>' + d + '</th>').join('') + '<th>Total</th></tr>';
  OPTS.forEach((o, i) => {
    h += '<tr id="row' + i + '"><td class="nm"><b>' + o.key + '</b> ' + o.name + '</td>';
    DIMS.forEach((d, k) => {
      h += '<td><select class="sc" data-i="' + i + '" data-k="' + k + '" aria-label="Score of option ' + o.key + ' for ' + d + '">' +
        [1, 2, 3, 4, 5].map(v => '<option value="' + v + '">' + v + '</option>').join('') + '</select></td>';
    });
    h += '<td class="tot" id="tot' + i + '"></td></tr>';
  });
  t.innerHTML = h;
  t.querySelectorAll('select.sc').forEach(s => s.addEventListener('change', e => {
    scores[+e.target.dataset.i][+e.target.dataset.k] = +e.target.value;
    refresh();
  }));
}

// ---- Redraw everything from the state ----
function refresh() {
  const tot = totals(w), lead = leader(tot);
  for (let i = 0; i < 3; i++) {
    $('w' + i).value = Math.round(w[i]);
    $('lblW' + i).textContent = DIMS[i] + ': ' + pct(w[i]) + '%';
  }
  document.querySelectorAll('select.sc').forEach(s => { s.value = scores[+s.dataset.i][+s.dataset.k]; s.disabled = !editing; });
  tot.forEach((t, i) => { $('tot' + i).textContent = t.toFixed(2); $('row' + i).className = (Math.abs(t - tot[lead]) < 1e-9) ? 'lead' : ''; });

  radarChart.data.datasets.forEach((ds, i) => { ds.data = scores[i].slice(); });
  radarChart.update();
  barChart.data.datasets[0].data = tot.slice();
  barChart.data.datasets[0].backgroundColor = OPTS.map((o, i) => (Math.abs(tot[i] - tot[lead]) < 1e-9 ? o.color : o.fill.replace('0.10', '0.30')));
  barChart.update();

  const tied = tot.map((t, i) => i).filter(i => Math.abs(tot[i] - tot[lead]) < 1e-9);
  const rest = tot.map((t, i) => i).filter(i => !tied.includes(i)).sort((a, b) => tot[b] - tot[a]);
  let msg;
  if (tied.length > 1) msg = 'Options ' + tied.map(i => OPTS[i].key).join(' and ') + ' tie at ' + tot[lead].toFixed(2) + '.';
  else msg = 'Option ' + OPTS[lead].key + ' leads with ' + tot[lead].toFixed(2) + '; next is Option ' + OPTS[rest[0]].key + ' at ' + tot[rest[0]].toFixed(2) + ' (' + (tot[lead] - tot[rest[0]]).toFixed(2) + ' behind).';
  $('verdict').textContent = msg;
  $('readout').innerHTML = [0, 1, 2].map(d => '<div>' + leadText(d, lead) + '</div>').join('') +
    '<div style="color:dimgray">Scores are illustrative judgments from Chapter 19. Other weights keep their ratio.</div>';
}

function init() {
  buildCharts();
  buildTable();
  [0, 1, 2].forEach(i => $('w' + i).addEventListener('input', e => { setWeight(i, +e.target.value); refresh(); }));
  $('pEqual').addEventListener('click', () => { setWeights(PRESETS.equal); refresh(); });
  $('pCost').addEventListener('click', () => { setWeights(PRESETS.cost); refresh(); });
  $('pClimate').addEventListener('click', () => { setWeights(PRESETS.climate); refresh(); });
  $('editBox').addEventListener('change', e => { editing = e.target.checked; refresh(); });
  $('resetBtn').addEventListener('click', () => {
    scores = DEFAULT_SCORES.map(r => r.slice());
    setWeights(PRESETS.equal);
    editing = false; $('editBox').checked = false;
    refresh();
  });
  refresh();
}

document.addEventListener('DOMContentLoaded', init);
