// Insulation Diminishing Returns Explorer MicroSim - Chart.js curve of annual heat loss Q = (A/R) x HDD x 24 with draggable current and proposed R markers, a savings band, and a payback table
// CANVAS_HEIGHT: 730
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

// ---- Constants (Chapter 19 worked example) ----
const BUILDING_LIFE = 50;      // years; payback beyond this is flagged
const R_MIN = 5, R_MAX = 60;
const DEFAULTS = { area: 9000, hdd: 7500, gas: 10, eff: 90, cost: 1.5, rc: 30, rp: 50 };

// ---- State ----
let st = Object.assign({}, DEFAULTS);
let chart = null;
let dragging = null;           // 'rc', 'rp', or null
const $ = id => document.getElementById(id);
const fmt = v => Math.round(v).toLocaleString('en-US');
const f1 = v => (Math.round(v * 10) / 10).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const usd = v => '$' + fmt(v);

// annual heat loss in MMBtu for R-value r: Q = (A / R) x HDD x 24 Btu, divided by 1,000,000
const loss = r => st.area / r * st.hdd * 24 / 1e6;

// ---- Plugin: savings band behind the curve, marker lines and labels in front ----
const overlay = {
  id: 'overlay',
  beforeDatasetsDraw(c) {
    const ca = c.chartArea, xs = c.scales.x, a = xs.getPixelForValue(st.rc), b = xs.getPixelForValue(st.rp);
    const ctx = c.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(46,160,67,0.28)';
    ctx.fillRect(a, ca.top, b - a, ca.bottom - ca.top);
    ctx.strokeStyle = 'seagreen'; ctx.lineWidth = 1; ctx.setLineDash([]);
    ctx.strokeRect(a, ca.top, b - a, ca.bottom - ca.top);
    // label inside the band when there is room
    const saved = loss(st.rc) - loss(st.rp), label = 'Saves ' + f1(saved) + ' MMBtu/yr';
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    if (ctx.measureText(label).width + 8 < b - a) {
      ctx.fillStyle = 'darkgreen'; ctx.textAlign = 'center'; ctx.textBaseline = 'bottom';
      ctx.fillText(label, (a + b) / 2, ca.bottom - 6);
    }
    ctx.restore();
  },
  afterDatasetsDraw(c) {
    const ca = c.chartArea, xs = c.scales.x, ctx = c.ctx;
    ctx.save();
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif'; ctx.textBaseline = 'top';
    [['rc', 'Current R-' + st.rc, true], ['rp', 'Proposed R-' + st.rp, false]].forEach(m => {
      const x = xs.getPixelForValue(st[m[0]]);
      ctx.strokeStyle = 'darkorange'; ctx.lineWidth = 2.5; ctx.setLineDash([6, 4]);
      ctx.beginPath(); ctx.moveTo(x, ca.top); ctx.lineTo(x, ca.bottom); ctx.stroke();
      ctx.setLineDash([]);
      const w = ctx.measureText(m[1]).width;
      // current label sits left of its line, proposed to the right; swap if it would leave the plot
      let left = m[2] ? x - 6 - w : x + 6;
      if (left < ca.left + 2) left = x + 6;
      if (left + w > ca.right - 2) left = x - 6 - w;
      ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillRect(left - 3, ca.top + (m[2] ? 2 : 20), w + 6, 17);
      ctx.fillStyle = 'rgb(170,70,0)'; ctx.textAlign = 'left';
      ctx.fillText(m[1], left, ca.top + (m[2] ? 4 : 22));
    });
    ctx.restore();
  }
};

function curvePoints() {
  const pts = [];
  for (let r = R_MIN; r <= R_MAX; r++) pts.push({ x: r, y: loss(r) });
  return pts;
}

function buildChart() {
  chart = new Chart($('chart'), {
    type: 'line',
    data: { datasets: [
      { label: 'Annual heat loss', data: curvePoints(), borderColor: 'royalblue', backgroundColor: 'royalblue', borderWidth: 3.5, pointRadius: 0, pointHitRadius: 8, pointHoverRadius: 5, tension: 0 },
      { label: 'Current R', data: [], showLine: false, backgroundColor: 'darkorange', borderColor: 'darkorange', pointStyle: 'circle', pointRadius: 9, pointHoverRadius: 11, pointBackgroundColor: 'darkorange', pointBorderColor: 'black', pointBorderWidth: 2 },
      { label: 'Proposed R', data: [], showLine: false, backgroundColor: 'darkorange', borderColor: 'darkorange', pointStyle: 'rectRot', pointRadius: 10, pointHoverRadius: 12, pointBackgroundColor: 'darkorange', pointBorderColor: 'black', pointBorderWidth: 2 },
      { label: 'Savings between the markers', data: [], backgroundColor: 'rgba(46,160,67,0.45)', borderColor: 'seagreen', borderWidth: 1 }
    ] },
    plugins: [overlay],
    options: {
      responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
      layout: { padding: { right: 10 } },
      interaction: { mode: 'nearest', axis: 'x', intersect: false },
      scales: {
        x: { type: 'linear', min: R_MIN, max: R_MAX, title: { display: true, text: 'Insulation R-value (ft²·°F·h/Btu)', font: { size: 14 } }, ticks: { font: { size: 13 }, stepSize: 5, callback: v => v }, grid: { color: 'rgb(220,220,220)' } },
        y: { type: 'linear', min: 0, title: { display: true, text: 'Annual heat loss (MMBtu)', font: { size: 14 } }, ticks: { font: { size: 13 } }, grid: { color: 'rgb(220,220,220)' } }
      },
      plugins: {
        title: { display: true, text: 'Each added layer of insulation saves less than the one before', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 2 } },
        legend: { position: 'top', labels: { font: { size: 13 }, boxWidth: 26, boxHeight: 12 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          filter: () => !dragging,
          callbacks: {
            title: items => 'R-' + Math.round(items[0].parsed.x),
            label: item => {
              const r = Math.round(item.parsed.x), q = loss(r);
              return ['Annual heat loss: ' + f1(q) + ' MMBtu', 'Gas burned: ' + f1(q / (st.eff / 100)) + ' MMBtu', 'Gas cost: ' + usd(q / (st.eff / 100) * st.gas) + ' per year'];
            }
          }
        }
      }
    }
  });
  attachDrag();
}

// ---- Dragging the two markers along the R axis ----
function attachDrag() {
  const cv = $('chart');
  const rAt = ev => {
    const rect = cv.getBoundingClientRect();
    return Math.round(chart.scales.x.getValueForPixel(ev.clientX - rect.left));
  };
  const nearest = ev => {
    const rect = cv.getBoundingClientRect(), x = ev.clientX - rect.left, y = ev.clientY - rect.top, ca = chart.chartArea, xs = chart.scales.x;
    if (y < ca.top - 6 || y > ca.bottom + 6) return null;
    const dc = Math.abs(x - xs.getPixelForValue(st.rc)), dp = Math.abs(x - xs.getPixelForValue(st.rp));
    if (Math.min(dc, dp) > 16) return null;
    return dc < dp ? 'rc' : 'rp';
  };
  cv.addEventListener('pointerdown', ev => {
    const m = nearest(ev);
    if (!m) return;
    dragging = m;
    cv.setPointerCapture(ev.pointerId);
    chart.tooltip.setActiveElements([], { x: 0, y: 0 });
    ev.preventDefault();
  });
  cv.addEventListener('pointermove', ev => {
    if (!dragging) { cv.style.cursor = nearest(ev) ? 'ew-resize' : 'default'; return; }
    setR(dragging, rAt(ev));
  });
  const stop = () => { dragging = null; };
  cv.addEventListener('pointerup', stop);
  cv.addEventListener('pointercancel', stop);
}

// the markers cannot cross: proposed stays at least R-1 above current
function setR(which, r) {
  if (which === 'rc') st.rc = Math.max(R_MIN, Math.min(r, st.rp - 1));
  else st.rp = Math.min(R_MAX, Math.max(r, st.rc + 1));
  $('curS').value = st.rc; $('propS').value = st.rp;
  update();
}

function update() {
  $('areaT').textContent = 'Roof area: ' + fmt(st.area) + ' ft²';
  $('hddT').textContent = 'Heating degree days: ' + fmt(st.hdd);
  $('gasT').textContent = 'Gas price: $' + st.gas.toFixed(2) + ' per MMBtu';
  $('effT').textContent = 'Furnace efficiency: ' + st.eff + ' %';
  $('costT').textContent = 'Cost per added R-20: $' + st.cost.toFixed(2) + '/ft²';
  $('curT').textContent = 'Current R: R-' + st.rc;
  $('propT').textContent = 'Proposed R: R-' + st.rp;
  // a slider's max/min follow the other marker so they cannot cross
  $('curS').max = st.rp - 1; $('propS').min = st.rc + 1;

  chart.data.datasets[0].data = curvePoints();
  chart.data.datasets[1].data = [{ x: st.rc, y: loss(st.rc) }];
  chart.data.datasets[2].data = [{ x: st.rp, y: loss(st.rp) }];
  chart.options.scales.y.max = Math.ceil(loss(R_MIN) * 1.06 / 10) * 10;
  chart.update('none');
  chart.canvas.setAttribute('aria-label', 'Annual heat loss falls from ' + f1(loss(R_MIN)) + ' MMBtu at R-5 to ' + f1(loss(R_MAX)) + ' MMBtu at R-60. Current marker at R-' + st.rc + ' with ' + f1(loss(st.rc)) + ' MMBtu, proposed marker at R-' + st.rp + ' with ' + f1(loss(st.rp)) + ' MMBtu.');
  renderReadout();
}

function renderReadout() {
  const qc = loss(st.rc), qp = loss(st.rp), saved = qc - qp;
  const e = st.eff / 100, gc = qc / e, gp = qp / e, savedGas = gc - gp;
  const dollars = savedGas * st.gas, addedR = st.rp - st.rc;
  const cost = st.cost * st.area * addedR / 20;
  const payback = cost / dollars;
  const over = payback > BUILDING_LIFE;
  const pbTxt = payback > 999 ? 'more than 999 years' : f1(payback) + ' years';
  let h = '<table><thead><tr><th></th><th>Current</th><th>Proposed</th><th>Difference</th></tr></thead><tbody>';
  h += '<tr><td>R-value</td><td>R-' + st.rc + '</td><td>R-' + st.rp + '</td><td>+' + addedR + '</td></tr>';
  h += '<tr><td>Heat loss (MMBtu/yr)</td><td>' + f1(qc) + '</td><td>' + f1(qp) + '</td><td>' + f1(saved) + ' saved</td></tr>';
  h += '<tr><td>Gas burned (MMBtu/yr)</td><td>' + f1(gc) + '</td><td>' + f1(gp) + '</td><td>' + f1(savedGas) + ' saved</td></tr>';
  h += '<tr><td>Gas cost per year</td><td>' + usd(gc * st.gas) + '</td><td>' + usd(gp * st.gas) + '</td><td>' + usd(dollars) + ' saved</td></tr>';
  h += '<tr><td>Added insulation cost</td><td></td><td></td><td>' + usd(cost) + '</td></tr>';
  h += '<tr><td class="key">Simple payback</td><td></td><td></td><td class="key">' + pbTxt + '</td></tr></tbody></table>';
  h += '<div class="state ' + (over ? 'bad' : 'ok') + '">' + (over ? 'Payback exceeds the typical building life (' + BUILDING_LIFE + ' years).' : 'Payback is within the typical building life of ' + BUILDING_LIFE + ' years.') + '</div>';

  // why the curve flattens: the same added R at the low end saves far more
  let why;
  if (st.rc > 10) {
    const lowSaved = loss(10) - loss(10 + addedR);
    why = 'Why it flattens: loss depends on 1/R. The same +' + addedR + ' of R starting at R-10 would save ' + f1(lowSaved) + ' MMBtu a year, ' + f1(lowSaved / saved) + ' times the ' + f1(saved) + ' MMBtu saved here.';
  } else {
    const next = st.rp + addedR <= R_MAX ? loss(st.rp) - loss(st.rp + addedR) : null;
    why = 'Why it flattens: loss depends on 1/R.' + (next !== null ? ' Another +' + addedR + ' of R above R-' + st.rp + ' would save only ' + f1(next) + ' MMBtu a year.' : ' The curve is almost flat near R-60.');
  }
  h += '<div class="note">' + why + '</div>';
  h += '<div class="foot">Q = (A/R) × HDD × 24 Btu per year, shown in MMBtu (1 MMBtu = 1,000,000 Btu). Roof area, degree days, gas price, efficiency, and insulation cost are illustrative; cost is assumed to grow in proportion to the R added. Simple payback ignores energy-price changes and interest. Drag the orange markers or use the sliders.</div>';
  $('readout').innerHTML = h;
}

document.addEventListener('DOMContentLoaded', function () {
  buildChart();
  const bind = (id, key) => $(id).addEventListener('input', e => { st[key] = +e.target.value; update(); });
  bind('areaS', 'area'); bind('hddS', 'hdd'); bind('gasS', 'gas'); bind('effS', 'eff'); bind('costS', 'cost');
  $('curS').addEventListener('input', e => setR('rc', +e.target.value));
  $('propS').addEventListener('input', e => setR('rp', +e.target.value));
  $('resetB').addEventListener('click', () => {
    st = Object.assign({}, DEFAULTS);
    [['areaS', 'area'], ['hddS', 'hdd'], ['gasS', 'gas'], ['effS', 'eff'], ['costS', 'cost'], ['curS', 'rc'], ['propS', 'rp']].forEach(p => { $(p[0]).value = st[p[1]]; });
    update();
  });
  update();
});
