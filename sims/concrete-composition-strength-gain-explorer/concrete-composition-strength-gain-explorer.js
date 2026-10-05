// Concrete Composition and Strength Gain Explorer MicroSim - Chart.js doughnut of one cubic yard of concrete plus strength-gain curves for three curing conditions
// CANVAS_HEIGHT: 740
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

// ---- Data: the six-sack mix of Chapter 8 (564 lb cement, w/c = 0.45), absolute-volume method ----
const YD3 = 27;                       // ft3 in one cubic yard
const CEMENT_FT3 = 564 / (3.15 * 62.4);   // 2.87 ft3
const WATER_FT3 = 254 / (1.00 * 62.4);    // 4.07 ft3
const STRIP_PSI = 1000;               // assumed strength for stripping wall forms

const PARTS = [
  { key: 'agg', name: 'Aggregates', color: 'rgb(150,150,150)', range: '60 to 75 percent',
    role: 'Sand and stone carry most of the load, give volume cheaply, and limit shrinkage.' },
  { key: 'cem', name: 'Cement (paste solids)', color: 'rgb(210,180,140)', range: 'about 10 to 15 percent',
    role: 'Reacts with water to form the glue that binds the aggregates; cement plus water is the paste.' },
  { key: 'wat', name: 'Water', color: 'rgb(70,140,205)', range: 'about 14 to 21 percent',
    role: 'Starts hydration and makes the mix workable; extra water leaves pores behind.' },
  { key: 'air', name: 'Air', color: 'white', range: '5 to 7 percent if air-entrained (Minnesota exterior); 1 to 3 percent otherwise',
    role: 'Microscopic bubbles give freezing water room to expand, so the surface does not flake.' }
];

// strength as a fraction of f'c at each age; moist-cured values are the Chapter 8 table, the others are illustrative shapes
const CURING = {
  moist: { name: 'Moist-cured', color: 'steelblue', dash: [], pts: [[0, 0], [3, 0.40], [7, 0.65], [14, 0.85], [28, 1.0]],
    note: 'Moist curing keeps the water in the concrete, so hydration continues and strength follows the Chapter 8 table: 40 percent at 3 days, 65 percent at 7 days, 85 percent at 14 days, 100 percent at 28 days.' },
  three: { name: 'Cured 3 days only', color: 'darkorange', dash: [10, 5], pts: [[0, 0], [3, 0.40], [7, 0.52], [14, 0.62], [28, 0.72]],
    note: 'After the third day the surface dries and hydration slows sharply. Strength keeps rising only slowly and reaches roughly 70 percent of f′c by day 28 (illustrative).' },
  none: { name: 'Not cured', color: 'firebrick', dash: [2, 5], pts: [[0, 0], [2, 0.28], [3, 0.34], [7, 0.42], [14, 0.47], [28, 0.50]],
    note: 'With no curing, the surface dries within a few days and hydration stops where the water is gone. The curve flattens near half of f′c and the surface is also weak against wear and freezing (illustrative).' }
};

// monotone cubic (Fritsch-Carlson) interpolation through the control points
function makeCurve(pts) {
  const n = pts.length, h = [], d = [], m = [];
  for (let i = 0; i < n - 1; i++) { h.push(pts[i + 1][0] - pts[i][0]); d.push((pts[i + 1][1] - pts[i][1]) / h[i]); }
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = d[i - 1] * d[i] <= 0 ? 0 : 2 * d[i - 1] * d[i] / (d[i - 1] + d[i]);
  return x => {
    let i = 0;
    while (i < n - 2 && x > pts[i + 1][0]) i++;
    const t = (x - pts[i][0]) / h[i], t2 = t * t, t3 = t2 * t;
    return (2 * t3 - 3 * t2 + 1) * pts[i][1] + (t3 - 2 * t2 + t) * h[i] * m[i] + (-2 * t3 + 3 * t2) * pts[i + 1][1] + (t3 - t2) * h[i] * m[i + 1];
  };
}
Object.values(CURING).forEach(c => { c.f = makeCurve(c.pts); });

// ---- State ----
let fc = 4000, airPct = 6, age = 7, cure = 'moist';
let pie = null, line = null;
const $ = id => document.getElementById(id);
const fmt = v => Math.round(v).toLocaleString('en-US');
const strengthAt = (key, a) => fc * CURING[key].f(a);

// volumes in ft3 for the current air content; the aggregate takes whatever is left of the 27 ft3
function volumes() {
  const air = YD3 * airPct / 100;
  return [YD3 - CEMENT_FT3 - WATER_FT3 - air, CEMENT_FT3, WATER_FT3, air];
}
// first age (days) at which the selected curve reaches the stripping strength, or null
function stripAge(key) {
  if (strengthAt(key, 28) < STRIP_PSI) return null;
  let lo = 0, hi = 28;
  for (let i = 0; i < 40; i++) { const mid = (lo + hi) / 2; if (strengthAt(key, mid) < STRIP_PSI) lo = mid; else hi = mid; }
  return hi;
}
const yMax = () => Math.ceil(fc * 1.1 / 500) * 500;

// ---- Plugin: doughnut centre text ----
const centre = {
  id: 'centre',
  afterDraw(c) {
    const a = c.chartArea, ctx = c.ctx, cx = (a.left + a.right) / 2, cy = (a.top + a.bottom) / 2;
    ctx.save();
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = 'black';
    ctx.font = 'bold 16px Arial, Helvetica, sans-serif';
    ctx.fillText('1 yd³', cx, cy - 9);
    ctx.font = '14px Arial, Helvetica, sans-serif';
    ctx.fillText('= 27 ft³', cx, cy + 10);
    ctx.restore();
  }
};

// ---- Plugin: stripping-strength line, drop lines and tag for the marker ----
const overlay = {
  id: 'overlay',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, ca = c.chartArea, xs = c.scales.x, ys = c.scales.y;
    ctx.save();
    // 1,000 psi stripping line
    const sy = ys.getPixelForValue(STRIP_PSI);
    ctx.setLineDash([6, 4]); ctx.strokeStyle = 'dimgray'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(ca.left, sy); ctx.lineTo(ca.right, sy); ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = '13px Arial, Helvetica, sans-serif'; ctx.fillStyle = 'dimgray'; ctx.textAlign = 'right'; ctx.textBaseline = 'bottom';
    ctx.fillText('Strip wall forms at ' + fmt(STRIP_PSI) + ' psi', ca.right - 4, sy - 2);
    // earliest stripping age on the selected curve
    const sa = stripAge(cure);
    if (sa !== null) {
      const sx = xs.getPixelForValue(sa);
      ctx.fillStyle = 'black';
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(sx - 6, sy + 12); ctx.lineTo(sx + 6, sy + 12); ctx.closePath(); ctx.fill();
      ctx.textAlign = 'left'; ctx.textBaseline = 'top';
      ctx.fillText('Day ' + (Math.round(sa * 10) / 10), sx + 8, sy + 8);
    }
    // marker drop lines
    const mx = xs.getPixelForValue(age), my = ys.getPixelForValue(strengthAt(cure, age));
    ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(0,0,0,0.55)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(ca.left, my); ctx.lineTo(mx, my); ctx.lineTo(mx, ca.bottom); ctx.stroke();
    ctx.restore();
  }
};

function buildCharts() {
  const v = volumes();
  pie = new Chart($('pieChart'), {
    type: 'doughnut',
    data: { labels: PARTS.map(p => p.name), datasets: [{ data: v, backgroundColor: PARTS.map(p => p.color), borderColor: 'dimgray', borderWidth: 2 }] },
    plugins: [centre],
    options: {
      responsive: true, maintainAspectRatio: false, animation: false, cutout: '52%',
      plugins: {
        title: { display: true, text: 'One cubic yard of concrete (by volume)', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 4 } },
        legend: {
          position: 'bottom',
          labels: { font: { size: 13 }, boxWidth: 16, generateLabels: ch => ch.data.labels.map((l, i) => {
            const val = ch.data.datasets[0].data[i];
            return { text: l + ' ' + (val / YD3 * 100).toFixed(1) + '%', fillStyle: PARTS[i].color, strokeStyle: 'dimgray', lineWidth: 2, index: i, hidden: false };
          }) }
        },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => PARTS[items[0].dataIndex].name,
            label: item => ['Now: ' + (item.parsed / YD3 * 100).toFixed(1) + '% (' + item.parsed.toFixed(2) + ' ft³)', 'Typical: ' + PARTS[item.dataIndex].range],
            afterLabel: item => wrap(PARTS[item.dataIndex].role, 42)
          }
        }
      }
    }
  });

  const ds = Object.keys(CURING).map(k => ({
    label: CURING[k].name, data: [], borderColor: CURING[k].color, borderDash: CURING[k].dash, borderWidth: 3, pointRadius: 0, pointHitRadius: 6, pointHoverRadius: 5, tension: 0, key: k
  }));
  ds.push({ label: 'Selected age', data: [], showLine: false, pointStyle: 'circle', pointRadius: 9, pointHoverRadius: 11, pointBackgroundColor: 'gold', pointBorderColor: 'black', pointBorderWidth: 2, clip: false });
  line = new Chart($('lineChart'), {
    type: 'line',
    data: { datasets: ds },
    plugins: [overlay],
    options: {
      responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
      layout: { padding: { right: 12 } },
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        x: { type: 'linear', min: 0, max: 28, title: { display: true, text: 'Age (days)', font: { size: 14 } }, ticks: { font: { size: 13 }, stepSize: 7 }, grid: { color: 'rgb(220,220,220)' } },
        y: { type: 'linear', min: 0, title: { display: true, text: 'Strength (psi)', font: { size: 14 } }, ticks: { font: { size: 13 }, callback: t => fmt(t) }, grid: { color: 'rgb(220,220,220)' } }
      },
      plugins: {
        title: { display: true, text: 'Strength gain (illustrative)', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 2 } },
        legend: { position: 'top', labels: { font: { size: 13 }, boxWidth: 30, filter: it => it.text !== 'Selected age' } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => items[0].dataset.label,
            label: item => ['Day ' + (Math.round(item.parsed.x * 10) / 10) + ': ' + fmt(item.parsed.y) + ' psi', Math.round(item.parsed.y / fc * 100) + '% of f′c']
          }
        }
      }
    }
  });
}

function wrap(s, n) {
  const lines = []; let ln = '';
  s.split(' ').forEach(w => { if ((ln + ' ' + w).trim().length > n) { lines.push(ln); ln = w; } else ln = (ln + ' ' + w).trim(); });
  if (ln) lines.push(ln);
  return lines;
}

function update() {
  $('fcText').textContent = 'Specified strength f′c: ' + fmt(fc) + ' psi';
  $('airText').textContent = 'Air content: ' + airPct.toFixed(1) + ' %';
  $('ageText').textContent = 'Age: ' + age + (age === 1 ? ' day' : ' days');

  pie.data.datasets[0].data = volumes();
  pie.update('none');

  line.options.scales.y.max = yMax();
  line.data.datasets.forEach(d => {
    if (!d.key) return;
    const pts = [];
    for (let a = 0; a <= 28; a += 0.5) pts.push({ x: a, y: strengthAt(d.key, a) });
    d.data = pts;
    d.borderWidth = d.key === cure ? 5 : 2;
  });
  line.data.datasets[3].data = [{ x: age, y: strengthAt(cure, age) }];
  line.data.datasets[3].pointBackgroundColor = 'gold';
  line.update('none');
  line.canvas.setAttribute('aria-label', 'Strength gain curves from 0 to 28 days for moist-cured, cured 3 days only, and not cured concrete with f′c ' + fmt(fc) + ' psi. At ' + age + ' days the ' + CURING[cure].name.toLowerCase() + ' strength is ' + fmt(strengthAt(cure, age)) + ' psi.');

  renderReadout();
}

function renderReadout() {
  const c = CURING[cure], s = strengthAt(cure, age), pct = s / fc * 100, sa = stripAge(cure);
  const ok = s >= STRIP_PSI;
  const v = volumes();
  let h = '<div class="stats">';
  h += '<div class="stat"><span>Strength at ' + age + (age === 1 ? ' day' : ' days') + '</span><b>' + fmt(s) + ' psi</b></div>';
  h += '<div class="stat"><span>Share of f′c (28-day moist-cured value)</span><b>' + Math.round(pct) + '%</b></div></div>';
  h += '<div class="state ' + (ok ? 'ok' : 'wait') + '">' + (ok ? 'Strong enough to strip wall forms: ' + fmt(s) + ' psi is at least ' + fmt(STRIP_PSI) + ' psi.' : 'Not yet strong enough to strip wall forms: ' + fmt(s) + ' psi is below ' + fmt(STRIP_PSI) + ' psi.') +
    (sa !== null ? ' This concrete reaches ' + fmt(STRIP_PSI) + ' psi at day ' + (Math.round(sa * 10) / 10) + '.' : ' It does not reach ' + fmt(STRIP_PSI) + ' psi within 28 days.') + '</div>';
  h += '<div class="note">' + c.note + '</div>';
  h += '<div class="foot">Mix: 564 lb cement and w/c 0.45 per yd³; aggregates fill the remaining ' + v[0].toFixed(1) + ' ft³ (volumes do not change with f′c). Hover a slice for its role. Poor-curing curves are illustrative.</div>';
  $('readout').innerHTML = h;
}

document.addEventListener('DOMContentLoaded', function () {
  buildCharts();
  $('fcSlider').addEventListener('input', e => { fc = +e.target.value; update(); });
  $('airSlider').addEventListener('input', e => { airPct = +e.target.value; update(); });
  $('ageSlider').addEventListener('input', e => { age = +e.target.value; update(); });
  document.querySelectorAll('input[name=cure]').forEach(r => r.addEventListener('change', e => { cure = e.target.value; update(); }));
  update();
});
