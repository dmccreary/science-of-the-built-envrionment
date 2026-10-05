// Enclosure Heat Loss Component Explorer MicroSim - Chart.js stacked bars of conductive heat loss (Q = U x A x deltaT) and area share
// CANVAS_HEIGHT: 756
// Bloom Level 4 (Analyze) + Level 5 (Evaluate)
// MicroSim template version 2026.03

// ---- Riverbend enclosure (Chapter 11); all values are illustrative ----
const ROOF_AREA = 9000;   // ft2
const GROSS_WALL = 4680;  // ft2 (12 ft tall x 390 ft perimeter), windows are cut out of this
const T_IN = 70;          // indoor temperature, F
const DEFAULTS = { win: 702, roofR: 40, wallR: 27.7, winU: 0.30, outT: -10 };
const BTU_PER_KW = 3412.14;
const IMPROVE = { roofAdd: 10, wallAdd: 10, winU: 0.20 }; // the three standard upgrades

// components: dataset colors are a blue / orange / purple set that stays distinct for color-blind readers
const comps = [
  { key: 'roof', name: 'Roof', low: 'roof', verb: 'loses', col: 'steelblue' },
  { key: 'wall', name: 'Walls (net)', low: 'walls', verb: 'lose', col: 'darkorange' },
  { key: 'win', name: 'Windows', low: 'windows', verb: 'lose', col: 'mediumpurple' }
];

let chart = null;
let showRank = false;
const el = id => document.getElementById(id);

// ---- Calculation: U = 1/R, Q = U x A x deltaT ----
function readState() {
  return {
    win: +el('winArea').value, roofR: +el('roofR').value, wallR: +el('wallR').value,
    winU: +el('winU').value, outT: +el('outT').value
  };
}
function calc(s) {
  const dT = T_IN - s.outT;
  const area = { roof: ROOF_AREA, wall: GROSS_WALL - s.win, win: s.win };
  const u = { roof: 1 / s.roofR, wall: 1 / s.wallR, win: s.winU };
  const loss = {};
  let total = 0, areaTotal = 0;
  comps.forEach(c => { loss[c.key] = u[c.key] * area[c.key] * dT; total += loss[c.key]; areaTotal += area[c.key]; });
  return { dT, area, u, loss, total, areaTotal, r: { roof: s.roofR, wall: s.wallR, win: 1 / s.winU } };
}
const fmt = v => Math.round(v).toLocaleString('en-US');
const pct = (v, t) => t > 0 ? Math.round(100 * v / t) + '%' : '0%';

// ---- Plugin: write each segment's value inside it, and mark the Riverbend default total on the loss bar ----
const labelsPlugin = {
  id: 'labelsPlugin',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, s = readState(), m = calc(s);
    ctx.save();
    ctx.textBaseline = 'middle';
    c.data.datasets.forEach((ds, di) => {
      const meta = c.getDatasetMeta(di);
      const isLoss = di < 3, comp = comps[di % 3];
      const bar = meta.data[isLoss ? 1 : 0];
      const v = ds.data[isLoss ? 1 : 0];
      if (!bar || v === null || v <= 0) return;
      const x0 = bar.base, x1 = bar.x, w = Math.abs(x1 - x0), cx = (x0 + x1) / 2;
      // try the long label, then the short one; if neither fits, the numbers are still in the readout and tooltip
      const longTxt = isLoss ? fmt(m.loss[comp.key]) + ' BTU/h' : fmt(m.area[comp.key]) + ' ft² (' + pct(m.area[comp.key], m.areaTotal) + ')';
      const shortTxt = isLoss ? fmt(m.loss[comp.key]) : pct(m.area[comp.key], m.areaTotal);
      ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
      const txt = [longTxt, shortTxt].find(t => ctx.measureText(t).width + 8 <= w);
      if (txt) {
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(txt, cx, bar.y);
      } else if (di === 5) {
        // the windows' sliver of the area bar: write the label under the bar, right-aligned to its end
        ctx.fillStyle = 'black';
        ctx.textAlign = 'right';
        ctx.fillText(comp.name + ': ' + longTxt, Math.min(x1 + 2, c.chartArea.right), bar.y + bar.height / 2 + 12);
      }
    });
    // reference mark: the Riverbend default total (about 46,300 BTU/h) on the heat loss bar
    const ref = calc(DEFAULTS).total;
    const xs = c.scales.x, lossBar = c.getDatasetMeta(0).data[1];
    if (xs && lossBar) {
      const rx = xs.getPixelForValue(ref);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(rx, lossBar.y - lossBar.height / 2 - 4);
      ctx.lineTo(rx, lossBar.y + lossBar.height / 2 + 6);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'black';
      ctx.font = '12px Arial, Helvetica, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Riverbend default ≈' + fmt(Math.round(ref / 100) * 100), Math.min(Math.max(rx, c.chartArea.left + 80), c.chartArea.right - 80), lossBar.y + lossBar.height / 2 + 14);
    }
    ctx.restore();
  }
};

// ---- Chart: area share on the top axis, heat loss in BTU/h on the bottom axis ----
function buildChart() {
  const m = calc(readState());
  const ds = [];
  comps.forEach(c => ds.push({ label: c.name, data: [null, m.loss[c.key]], backgroundColor: c.col, borderColor: 'white', borderWidth: 1, xAxisID: 'x' }));
  comps.forEach(c => ds.push({ label: c.name + ' (area)', data: [100 * m.area[c.key] / m.areaTotal, null], backgroundColor: c.col, borderColor: 'white', borderWidth: 1, xAxisID: 'x2' }));
  chart = new Chart(el('lossChart'), {
    type: 'bar',
    data: { labels: ['Area share', 'Heat loss'], datasets: ds },
    plugins: [labelsPlugin],
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'nearest', intersect: true },
      layout: { padding: { right: 6 } },
      scales: {
        x: { stacked: true, position: 'bottom', min: 0, max: 80000, title: { display: true, text: 'Heat loss (BTU/h)', font: { size: 14 } },
             ticks: { font: { size: 13 }, maxTicksLimit: 6, callback: v => v.toLocaleString('en-US') }, grid: { color: 'rgb(220,220,220)' } },
        x2: { stacked: true, position: 'top', min: 0, max: 100, title: { display: true, text: 'Share of enclosure area (%)', font: { size: 14 } },
              ticks: { font: { size: 13 }, maxTicksLimit: 6, callback: v => v + '%' }, grid: { drawOnChartArea: false } },
        y: { stacked: true, ticks: { font: { size: 14 }, color: 'black' }, grid: { display: false } }
      },
      plugins: {
        legend: {
          position: 'bottom', onClick: null,
          labels: { font: { size: 14 }, color: 'black', filter: item => item.datasetIndex < 3 }
        },
        title: { display: true, text: 'Q = U × A × ΔT for each part of the enclosure', color: 'black', font: { size: 17, weight: 'bold' }, padding: { top: 2, bottom: 4 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => comps[items[0].datasetIndex % 3].name,
            label: item => {
              const s = readState(), mm = calc(s), k = comps[item.datasetIndex % 3].key;
              const rTxt = k === 'win' ? 'U-' + s.winU.toFixed(2) : 'R-' + (k === 'roof' ? s.roofR : s.wallR) + ', U-' + mm.u[k].toFixed(3);
              const lines = ['Area: ' + fmt(mm.area[k]) + ' ft² (' + pct(mm.area[k], mm.areaTotal) + ' of the enclosure)', 'Value: ' + rTxt];
              lines.push('Loss: ' + fmt(mm.loss[k]) + ' BTU/h (' + pct(mm.loss[k], mm.total) + ' of the total)');
              lines.push('Per ft²: ' + (mm.u[k] * mm.dT).toFixed(1) + ' BTU/h');
              return lines;
            }
          }
        }
      }
    }
  });
}

// ---- Refresh chart, readout, and (if open) the ranking ----
function refresh() {
  const s = readState(), m = calc(s);
  el('lblWin').textContent = 'Window area: ' + fmt(s.win) + ' ft²';
  el('lblRoof').textContent = 'Roof R-value: R-' + s.roofR;
  el('lblWall').textContent = 'Wall effective R: R-' + s.wallR.toFixed(1);
  el('lblWinU').textContent = 'Window U-value: ' + s.winU.toFixed(2);
  el('lblTemp').textContent = 'Outdoor: ' + s.outT + '°F';
  comps.forEach((c, i) => {
    chart.data.datasets[i].data = [null, m.loss[c.key]];
    chart.data.datasets[i + 3].data = [100 * m.area[c.key] / m.areaTotal, null];
  });
  chart.options.scales.x.max = m.total > 80000 ? Math.ceil(m.total / 20000) * 20000 : 80000;
  chart.update('none');
  const ref = calc(DEFAULTS).total;
  const diff = m.total - ref;
  const winShareA = pct(m.area.win, m.areaTotal), winShareL = pct(m.loss.win, m.total);
  el('readout').innerHTML =
    '<span class="big">Total loss: ' + fmt(m.total) + ' BTU/h = ' + (m.total / BTU_PER_KW).toFixed(1) + ' kW</span> ' +
    '<span class="note">(' + (Math.abs(diff) < 50 ? 'about the default' : (diff > 0 ? '+' : '−') + fmt(Math.abs(diff)) + ' BTU/h vs the default of ' + fmt(ref)) + ')</span><br>' +
    'Roof ' + fmt(m.loss.roof) + ' | Walls ' + fmt(m.loss.wall) + ' | Windows ' + fmt(m.loss.win) + ' BTU/h<br>' +
    'Windows: ' + winShareA + ' of the area, ' + winShareL + ' of the loss. Indoor 70°F, ΔT = ' + m.dT + '°F. Conduction only.';
  renderRank();
}

// ---- "Which change helps most?" ----
function ranking() {
  const s = readState(), m = calc(s);
  const items = [
    { key: 'roof', name: 'Roof +R-10', saved: m.area.roof * (1 / s.roofR - 1 / (s.roofR + IMPROVE.roofAdd)) * m.dT, note: 'R-' + s.roofR + ' to R-' + (s.roofR + IMPROVE.roofAdd) },
    { key: 'wall', name: 'Walls +R-10', saved: m.area.wall * (1 / s.wallR - 1 / (s.wallR + IMPROVE.wallAdd)) * m.dT, note: 'R-' + s.wallR.toFixed(1) + ' to R-' + (s.wallR + IMPROVE.wallAdd).toFixed(1) },
    { key: 'win', name: 'Windows to U-0.20', saved: m.area.win * Math.max(0, s.winU - IMPROVE.winU) * m.dT, note: 'U-' + s.winU.toFixed(2) + ' to U-0.20' }
  ];
  items.sort((a, b) => b.saved - a.saved);
  return { items, m, s };
}

function renderRank() {
  const box = el('rank');
  if (!showRank) {
    box.innerHTML = '<h3>Which change helps most?</h3>Press the button to try three standard upgrades one at a time (roof +R-10, walls +R-10, windows to U-0.20) at the current settings and rank them by the BTU/h they save.';
    return;
  }
  const { items, m, s } = ranking();
  const top = items[0];
  const big = comps.reduce((a, c) => m.loss[c.key] > m.loss[a.key] ? c : a, comps[0]);
  const maxSave = Math.max(top.saved, 1);
  let h = '<h3>Ranked by BTU/h saved (one at a time)</h3>';
  items.forEach((it, i) => {
    const pctTot = pct(it.saved, m.total);
    h += '<div class="rrow"><span class="nm">' + (i + 1) + '. ' + it.name + '</span><span class="bar" style="width:' + Math.round(90 * it.saved / maxSave) + 'px"></span><span class="val">saves ' + fmt(it.saved) + ' BTU/h (' + pctTot + ')</span></div>';
  });
  let why;
  if (top.saved < 1) why = 'None of the three changes saves anything at these settings, because each one is already at or beyond the upgrade.';
  else if (top.key === big.key) why = 'The ' + big.low + ' ' + big.verb + ' the most (' + fmt(m.loss[big.key]) + ' BTU/h), and upgrading ' + (big.key === 'wall' || big.key === 'win' ? 'them' : 'it') + ' also saves the most, because the change removes a large share of the biggest loss.';
  else {
    const perFt2 = (m.u.win * m.dT).toFixed(1), wallFt2 = (m.u.wall * m.dT).toFixed(1);
    const lead = 'The ' + big.low + ' ' + big.verb + ' the most in total, but ';
    if (top.key === 'win') why = lead + 'windows lose ' + perFt2 + ' BTU/h per ft² against ' + wallFt2 + ' for the walls, so cutting U to 0.20 removes a large share of loss from a small area.';
    else why = lead + 'adding R-10 to a low R-value cuts U much more than adding it to a high one, so the ' + top.name.split(' ')[0].toLowerCase() + ' upgrade saves more.';
  }
  h += '<div class="why">' + why + '</div>';
  box.innerHTML = h;
}

// ---- Wiring ----
document.addEventListener('DOMContentLoaded', function () {
  buildChart();
  ['winArea', 'roofR', 'wallR', 'winU', 'outT'].forEach(id => el(id).addEventListener('input', refresh));
  el('btnReset').addEventListener('click', () => {
    el('winArea').value = DEFAULTS.win; el('roofR').value = DEFAULTS.roofR; el('wallR').value = DEFAULTS.wallR;
    el('winU').value = DEFAULTS.winU; el('outT').value = DEFAULTS.outT;
    showRank = false;
    refresh();
  });
  el('btnRank').addEventListener('click', () => { showRank = true; refresh(); });
  refresh();
});
