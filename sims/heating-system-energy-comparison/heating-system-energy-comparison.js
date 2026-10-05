// Heating System Energy Comparison MicroSim - Chart.js bars of input energy for equal delivered heat, plus an illustrative heat pump COP curve
// CANVAS_HEIGHT: 740
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

const BTU_PER_KW = 3412; // 1 kW = 3,412 Btu/h (Chapter 14)

// ---- Heat pump COP curves: ILLUSTRATIVE, linearly interpolated between these points [outdoor F, COP] ----
// The cold-climate curve gives COP 3 at 17 F, matching the Chapter 14 worked example (80,000 Btu/h -> 7.8 kW).
const COP_TABLES = {
  std:  { name: 'Standard air-source', pts: [[-20, 1.0], [-10, 1.3], [0, 1.7], [10, 2.1], [17, 2.4], [30, 2.9], [47, 3.5], [60, 4.0]] },
  cold: { name: 'Cold-climate air-source', pts: [[-20, 1.8], [-10, 2.1], [0, 2.4], [10, 2.7], [17, 3.0], [30, 3.5], [47, 4.1], [60, 4.5]] }
};
function copAt(type, t) {
  const p = COP_TABLES[type].pts;
  if (t <= p[0][0]) return p[0][1];
  for (let i = 1; i < p.length; i++) {
    if (t <= p[i][0]) return p[i - 1][1] + (p[i][1] - p[i - 1][1]) * (t - p[i - 1][0]) / (p[i][0] - p[i - 1][0]);
  }
  return p[p.length - 1][1];
}

// ---- The four systems; the heat pump entry is filled in from the COP curve ----
const SYSTEMS = [
  { key: 'f80', name: '80% furnace', col: 'darkorange', pat: 'diag', eff: 0.80,
    how: 'Burns fuel in a combustion chamber; about 20 percent of the fuel energy leaves with the exhaust gases instead of heating the rooms.' },
  { key: 'f95', name: '95% furnace', col: 'goldenrod', pat: 'dots', eff: 0.95,
    how: 'A condensing furnace pulls so much heat from the exhaust that the gases cool and form water, so only about 5 percent is lost.' },
  { key: 'res', name: 'Electric resistance', col: 'firebrick', pat: 'cross', eff: 1.0,
    how: 'A heating element turns each kilowatt of electricity into exactly one kilowatt of heat, so the input equals the heat delivered.' },
  { key: 'hp', name: 'Heat pump', col: 'steelblue', pat: 'horiz', eff: null,
    how: 'A refrigeration cycle moves heat from the outdoor air into the building, so each kilowatt of electricity delivers COP kilowatts of heat.' }
];

let barChart = null, copChart = null;
const el = id => document.getElementById(id);
const fmt = v => Math.round(v).toLocaleString('en-US');

// ---- Calculation: input energy = delivered heat / efficiency, in kW-equivalent ----
function readState() { return { q: +el('heatOut').value, t: +el('outT').value, type: el('hpType').value }; }
function calc(s) {
  const heatKw = s.q / BTU_PER_KW;
  const cop = copAt(s.type, s.t);
  const inputs = SYSTEMS.map(sys => heatKw / (sys.key === 'hp' ? cop : sys.eff));
  return { heatKw, cop, inputs };
}

// ---- Pattern fills so the bars read without color ----
function makePattern(kind, col) {
  const c = document.createElement('canvas');
  c.width = c.height = 12;
  const g = c.getContext('2d');
  g.fillStyle = col; g.fillRect(0, 0, 12, 12);
  g.strokeStyle = 'white'; g.fillStyle = 'white'; g.lineWidth = 2;
  g.beginPath();
  if (kind === 'diag') { g.moveTo(0, 12); g.lineTo(12, 0); g.moveTo(-3, 3); g.lineTo(3, -3); g.moveTo(9, 15); g.lineTo(15, 9); }
  else if (kind === 'cross') { g.moveTo(0, 6); g.lineTo(12, 6); g.moveTo(6, 0); g.lineTo(6, 12); }
  else if (kind === 'horiz') { g.moveTo(0, 3); g.lineTo(12, 3); g.moveTo(0, 9); g.lineTo(12, 9); }
  g.stroke();
  if (kind === 'dots') { g.beginPath(); g.arc(3, 3, 1.6, 0, 7); g.arc(9, 9, 1.6, 0, 7); g.fill(); }
  return g.createPattern(c, 'repeat');
}

function wrapText(s, n) {
  const out = []; let line = '';
  s.split(' ').forEach(w => { if ((line + ' ' + w).trim().length > n) { out.push(line); line = w; } else line = (line + ' ' + w).trim(); });
  if (line) out.push(line);
  return out;
}

// ---- Plugin on the bar chart: value at each bar's end and a dashed line at the heat delivered ----
const barPlugin = {
  id: 'barPlugin',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, m = calc(readState());
    ctx.save();
    const xHeat = c.scales.x.getPixelForValue(m.heatKw);
    ctx.strokeStyle = 'black'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
    ctx.beginPath(); ctx.moveTo(xHeat, c.chartArea.top); ctx.lineTo(xHeat, c.chartArea.bottom); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'black'; ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    c.getDatasetMeta(0).data.forEach((bar, i) => ctx.fillText(m.inputs[i].toFixed(1) + ' kW', bar.x + 5, bar.y));
    ctx.restore();
  }
};

// ---- Plugin on the COP chart: label the marker ----
const copPlugin = {
  id: 'copPlugin',
  afterDatasetsDraw(c) {
    const s = readState(), pt = c.getDatasetMeta(2).data[0];
    if (!pt) return;
    const ctx = c.ctx, txt = 'COP ' + copAt(s.type, s.t).toFixed(2);
    ctx.save();
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif'; ctx.fillStyle = 'navy'; ctx.textBaseline = 'bottom';
    const w = ctx.measureText(txt).width;
    ctx.textAlign = pt.x + w + 14 > c.chartArea.right ? 'right' : 'left';
    ctx.fillText(txt, pt.x + (ctx.textAlign === 'left' ? 10 : -10), pt.y - 8);
    ctx.restore();
  }
};

function curveData(type) {
  const d = [];
  for (let t = -20; t <= 60; t += 5) d.push({ x: t, y: copAt(type, t) });
  return d;
}

function buildCharts() {
  const s = readState(), m = calc(s);
  barChart = new Chart(el('barChart'), {
    type: 'bar',
    data: {
      labels: SYSTEMS.map(x => x.name),
      datasets: [{ data: m.inputs, backgroundColor: SYSTEMS.map(x => makePattern(x.pat, x.col)), borderColor: 'black', borderWidth: 1 }]
    },
    plugins: [barPlugin],
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false,
      interaction: { mode: 'nearest', axis: 'y', intersect: false },
      layout: { padding: { right: 4 } },
      scales: {
        x: { min: 0, title: { display: true, text: 'Energy input (kW-equivalent); dashed line = heat delivered', font: { size: 13 } }, ticks: { font: { size: 13 }, maxTicksLimit: 7 }, grid: { color: 'rgb(220,220,220)' } },
        y: { ticks: { font: { size: 14 }, color: 'black' }, grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Energy input to deliver the same heat', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 4 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => SYSTEMS[items[0].dataIndex].name,
            label: item => {
              const st = readState(), mm = calc(st), sys = SYSTEMS[item.dataIndex], inKw = mm.inputs[item.dataIndex];
              const eff = sys.key === 'hp' ? 'COP ' + mm.cop.toFixed(2) + ' at ' + st.t + '°F (' + Math.round(mm.cop * 100) + '%)' : (sys.key === 'res' ? '100% (COP 1)' : Math.round(sys.eff * 100) + '% AFUE');
              return ['Input: ' + inKw.toFixed(1) + ' kW (' + fmt(inKw * BTU_PER_KW) + ' Btu/h)',
                      'Heat delivered: ' + mm.heatKw.toFixed(1) + ' kW', 'Efficiency used: ' + eff].concat(wrapText(sys.how, 46));
            }
          }
        }
      }
    }
  });

  copChart = new Chart(el('copChart'), {
    type: 'line',
    data: {
      datasets: [
        { label: COP_TABLES.std.name, data: curveData('std'), parsing: false, pointRadius: 0, pointHitRadius: 6 },
        { label: COP_TABLES.cold.name, data: curveData('cold'), parsing: false, pointRadius: 0, pointHitRadius: 6 },
        { label: 'Current outdoor temperature', data: [{ x: s.t, y: m.cop }], parsing: false, pointRadius: 8, pointStyle: 'rectRot', backgroundColor: 'navy', borderColor: 'white', borderWidth: 2, showLine: false },
        { label: 'Electric resistance (COP 1)', data: [{ x: -20, y: 1 }, { x: 60, y: 1 }], parsing: false, pointRadius: 0, borderColor: 'firebrick', borderDash: [3, 4], borderWidth: 2, pointHitRadius: 0 }
      ]
    },
    plugins: [copPlugin],
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      interaction: { mode: 'nearest', intersect: false },
      layout: { padding: { right: 8 } },
      scales: {
        x: { type: 'linear', min: -20, max: 60, title: { display: true, text: 'Outdoor temperature (°F)', font: { size: 13 } }, ticks: { font: { size: 13 }, stepSize: 20 }, grid: { color: 'rgb(220,220,220)' } },
        y: { min: 0, max: 5, title: { display: true, text: 'COP (heat out / electricity in)', font: { size: 13 } }, ticks: { font: { size: 13 }, stepSize: 1 }, grid: { color: 'rgb(220,220,220)' } }
      },
      plugins: {
        legend: { position: 'bottom', onClick: null, labels: { font: { size: 12 }, boxWidth: 22, boxHeight: 3, padding: 6, filter: item => item.datasetIndex !== 2 } },
        title: { display: true, text: 'Heat pump COP vs outdoor temperature (illustrative)', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 4 } },
        tooltip: {
          filter: item => item.datasetIndex < 2,
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => 'Outdoor ' + items[0].parsed.x + '°F',
            label: item => item.dataset.label + ': COP ' + item.parsed.y.toFixed(2)
          }
        }
      }
    }
  });
}

// ---- Refresh charts, readout, and status line ----
function refresh() {
  const s = readState(), m = calc(s);
  const narrow = el('charts').clientWidth < 640;
  copChart.options.scales.y.title.text = narrow ? 'COP' : 'COP (heat out / electricity in)';
  copChart.options.plugins.title.text = narrow ? 'Heat pump COP (illustrative)' : 'Heat pump COP vs outdoor temperature (illustrative)';
  el('lblQ').textContent = 'Heat output: ' + fmt(s.q) + ' Btu/h';
  el('lblT').textContent = 'Outdoor temp: ' + s.t + ' °F';

  const max = m.inputs[0] * 1.3, step = max > 40 ? 10 : (max > 20 ? 5 : 2);
  barChart.data.datasets[0].data = m.inputs;
  barChart.options.scales.x.max = Math.ceil(max / step) * step;
  barChart.update('none');

  const sel = s.type, other = sel === 'cold' ? 'std' : 'cold';
  const styleCurve = (ds, type, on) => {
    ds.label = COP_TABLES[type].name + (on ? ' (selected)' : '');
    ds.borderColor = on ? 'steelblue' : 'darkgray';
    ds.borderWidth = on ? 4 : 2;
    ds.borderDash = on ? [] : [8, 4];
  };
  styleCurve(copChart.data.datasets[sel === 'std' ? 0 : 1], sel, true);
  styleCurve(copChart.data.datasets[sel === 'std' ? 1 : 0], other, false);
  copChart.data.datasets[2].data = [{ x: s.t, y: m.cop }];
  copChart.update('none');

  el('readout').innerHTML =
    '<span class="big">Heat to deliver: ' + fmt(s.q) + ' Btu/h = ' + m.heatKw.toFixed(1) + ' kW</span> ' +
    '<span class="note">(÷ 3,412 Btu/h per kW)</span><br>' +
    'Heat pump COP at ' + s.t + ' °F: <b>' + m.cop.toFixed(2) + '</b> (' + COP_TABLES[sel].name + ', illustrative curve), so it draws ' + m.inputs[3].toFixed(1) + ' kW.' +
    ' <span class="note hide-narrow">Heat pump capacity loss in the cold is not modeled.</span>';

  const hp = m.inputs[3], f95 = m.inputs[1], st = el('status');
  let msg, warn = false;
  if (hp > f95) {
    msg = 'Heat pump COP has fallen below the break-even point for equal energy.'; warn = true;
  } else {
    msg = 'Heat pump input (' + hp.toFixed(1) + ' kW) is ' + Math.round(100 * hp / f95) + '% of the 95% furnace input (' + f95.toFixed(1) + ' kW). Equal energy would take a COP of 0.95 or less.';
    if (m.cop < 1.5) { msg += ' At COP ' + m.cop.toFixed(2) + (m.cop < 1.05 ? ' the heat pump is no better than electric resistance (COP 1.00).' : ' the heat pump is only slightly better than electric resistance (COP 1.00).'); warn = true; }
  }
  st.textContent = msg;
  st.className = warn ? 'warn' : '';
}

document.addEventListener('DOMContentLoaded', function () {
  buildCharts();
  ['heatOut', 'outT'].forEach(id => el(id).addEventListener('input', refresh));
  el('hpType').addEventListener('change', refresh);
  window.addEventListener('resize', refresh);
  refresh();
});
