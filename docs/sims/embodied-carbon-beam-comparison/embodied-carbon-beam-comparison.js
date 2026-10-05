// Embodied Carbon Beam Comparison MicroSim - Chart.js grouped bars of mass and product-stage embodied carbon for steel, glulam, and reinforced concrete beams
// CANVAS_HEIGHT: 800
// Bloom Level 3 (Apply) + Level 5 (Evaluate)
// MicroSim template version 2026.03

// ---- Constants: the Riverbend beams of Chapter 20 (quantities and emission factors are illustrative) ----
const KG_PER_LB = 0.45359237, M_PER_FT = 0.3048, M_PER_IN = 0.0254;
const REF_SPAN = 40;                  // ft, the multipurpose room
const STEEL_LB_PER_FT = 44;           // W21x44 at 40 ft; weight per foot scales with span (illustrative)
const GL_WIDTH_IN = 8.75, GL_DEPTH_REF_IN = 27, GL_DENSITY = 500;       // glulam 8.75 in x 27 in at 40 ft, 500 kg/m3
const RC_WIDTH_IN = 17, RC_SPAN_DEPTH = 14, RC_DENSITY = 2400;         // concrete depth = span/14, width 17 in (illustrative sizing)
const MOISTURE = 0.12, CARBON_FRACTION = 0.5, CO2_PER_C = 44 / 12;      // stored carbon: dry mass x 0.5 x 44/12

const MATS = [
  { key: 'steel', name: 'Steel', full: 'Steel W21×44 beams', unit: 'kg', fUnit: 'kg CO₂e per kg', def: 1.2, lo: 0.7, hi: 2.5, step: 0.1, color: 'gray', pale: 'rgba(128,128,128,0.35)' },
  { key: 'glulam', name: 'Glulam', full: 'Glued-laminated beams', unit: 'm³', fUnit: 'kg CO₂e per m³', def: 140, lo: 80, hi: 250, step: 5, color: 'tan', pale: 'rgba(210,180,140,0.40)' },
  { key: 'concrete', name: 'Concrete', full: 'Reinforced concrete beams', unit: 'm³', fUnit: 'kg CO₂e per m³', def: 300, lo: 200, hi: 500, step: 10, color: 'royalblue', pale: 'rgba(65,105,225,0.25)' }
];

// ---- State ----
let nBeams = 6, spanFt = 40, bio = false;
let fac = MATS.map(m => m.def);
let chart = null;
let q = null;                          // latest results
const $ = id => document.getElementById(id);
const fmt = (v, d) => v.toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 });

// ---- Calculation: quantity x factor = emissions, for the chosen number of beams and span ----
function quantities() {
  const L = spanFt * M_PER_FT, k = spanFt / REF_SPAN;
  const steelKg = nBeams * STEEL_LB_PER_FT * k * spanFt * KG_PER_LB;
  const glVol = nBeams * GL_WIDTH_IN * M_PER_IN * GL_DEPTH_REF_IN * k * M_PER_IN * L;
  const rcVol = nBeams * RC_WIDTH_IN * M_PER_IN * (spanFt * 12 / RC_SPAN_DEPTH) * M_PER_IN * L;
  const qty = [steelKg, glVol, rcVol];
  const mass = [steelKg, glVol * GL_DENSITY, rcVol * RC_DENSITY];
  const stored = glVol * GL_DENSITY * (1 - MOISTURE) * CARBON_FRACTION * CO2_PER_C;   // kg CO2 in the glulam
  return { qty, mass, stored };
}

function compute() {
  const b = quantities();
  const em = b.qty.map((v, i) => v * fac[i]);
  const net = em.map((e, i) => (i === 1 && bio ? e - b.stored : e));
  q = { ...b, em, net };
}

// can the order change anywhere inside the low-to-high factor ranges? (intervals of net emissions that overlap)
function overlaps() {
  const iv = MATS.map((m, i) => {
    const lo = q.qty[i] * m.lo - (i === 1 && bio ? q.stored : 0), hi = q.qty[i] * m.hi - (i === 1 && bio ? q.stored : 0);
    return [lo, hi];
  });
  const pairs = [];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if (iv[i][0] < iv[j][1] && iv[j][0] < iv[i][1]) pairs.push([i, j]);
  return pairs;
}

// round up to a round number (1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10 times a power of ten) so the axis labels are clean
function niceMax(x) {
  const p = Math.pow(10, Math.floor(Math.log10(x))), f = x / p;
  return [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].find(v => f <= v + 1e-9) * p;
}

// ---- Chart ----
const labelPlugin = {
  id: 'barLabels',
  afterDatasetsDraw(c) {
    const { ctx } = c;
    ctx.save();
    ctx.textAlign = 'center';
    ctx.font = '12px Arial, Helvetica, sans-serif';
    ctx.fillStyle = 'black';
    c.data.datasets.forEach((ds, di) => {
      c.getDatasetMeta(di).data.forEach((bar, i) => {
        const v = ds.data[i];
        if (v === null || v === undefined) return;
        const neg = v < 0;
        ctx.fillText((neg ? '−' : '') + fmt(Math.abs(v)), bar.x, neg ? bar.y + 14 : bar.y - 4);
      });
    });
    ctx.restore();
  }
};

function buildChart() {
  Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
  chart = new Chart($('beamChart'), {
    type: 'bar',
    data: {
      labels: MATS.map(m => m.name),
      datasets: [
        { label: 'Mass (kg)', data: [], yAxisID: 'y1', stack: 'mass', backgroundColor: MATS.map(m => m.pale), borderColor: MATS.map(m => m.color), borderWidth: 2, borderDash: [4, 3] },
        { label: 'Embodied carbon (kg CO₂e)', data: [], yAxisID: 'y', stack: 'carbon', backgroundColor: MATS.map(m => m.color), borderColor: 'black', borderWidth: 1 },
        { label: 'Stored biogenic carbon (kg CO₂)', data: [], yAxisID: 'y', stack: 'carbon', backgroundColor: 'seagreen', borderColor: 'darkgreen', borderWidth: 1 }
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
      layout: { padding: { top: 16 } },
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        x: { ticks: { font: { size: 13, weight: 'bold' } } },
        y: { stacked: true, position: 'left', title: { display: true, text: 'Embodied carbon (kg CO₂e)', font: { size: 12 } }, ticks: { font: { size: 11 }, callback: v => fmt(v) } },
        y1: { stacked: true, position: 'right', title: { display: true, text: 'Mass (kg)', font: { size: 12 } }, grid: { drawOnChartArea: false }, ticks: { font: { size: 11 }, callback: v => (v < 0 ? '' : fmt(v)) } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          bodyFont: { size: 14 }, titleFont: { size: 14 },
          callbacks: {
            title: items => MATS[items[0].dataIndex].full,
            label: c => tipLines(c.datasetIndex, c.dataIndex)
          }
        }
      }
    },
    plugins: [labelPlugin]
  });
}

// tooltip text: the quantity, factor, and resulting emissions behind a bar
function tipLines(ds, i) {
  const m = MATS[i];
  if (ds === 0) return 'Mass: ' + fmt(q.mass[i]) + ' kg' + (i === 0 ? '' : ' (' + fmt(q.qty[i], 1) + ' m³)');
  if (ds === 2) return 'Stored: ' + fmt(q.mass[1]) + ' kg × 0.88 dry × 0.5 carbon × 44/12 = ' + fmt(q.stored) + ' kg CO₂';
  return fmt(q.qty[i], i === 0 ? 0 : 1) + ' ' + m.unit + ' × ' + fmt(fac[i], i === 0 ? 1 : 0) + ' ' + m.fUnit + ' = ' + fmt(q.em[i]) + ' kg CO₂e';
}

function updateChart() {
  const d = chart.data.datasets;
  d[0].data = q.mass.slice();
  d[1].data = q.em.slice();
  d[2].data = [null, bio ? -q.stored : null, null];
  d[2].hidden = !bio;
  // keep the zero lines of the two axes level when the stored-carbon bar goes below zero
  const maxE = Math.max(...q.em), maxM = Math.max(...q.mass);
  const negE = bio ? q.stored : 0;
  const yMax = niceMax(maxE * 1.1), yMin = negE > 0 ? -niceMax(negE * 1.05) : 0;
  const frac = yMin < 0 ? -yMin / (yMax - yMin) : 0;
  const y1Max = niceMax(maxM * 1.1), y1Min = frac > 0 ? -y1Max * frac / (1 - frac) : 0;
  chart.options.scales.y.min = yMin; chart.options.scales.y.max = yMax;
  chart.options.scales.y1.min = y1Min; chart.options.scales.y1.max = y1Max;
  chart.update();
}

// ---- Text outputs: the arithmetic table, the banner, and the key ----
function renderTable() {
  const low = q.net.indexOf(Math.min(...q.net));
  let h = '<tr><th>Option</th><th>Quantity</th><th>× Factor</th><th>= kg CO₂e</th></tr>';
  MATS.forEach((m, i) => {
    h += '<tr' + (i === low ? ' class="low"' : '') + '><td>' + m.name + '</td><td>' + fmt(q.qty[i], i === 0 ? 0 : 1) + ' ' + m.unit +
      (i > 0 ? ' (' + fmt(q.mass[i]) + ' kg)' : '') + '</td><td>' + fmt(fac[i], i === 0 ? 1 : 0) + ' per ' + m.unit + '</td><td>' + fmt(q.em[i]) + '</td></tr>';
  });
  if (bio) {
    h += '<tr' + (low === 1 ? ' class="low"' : '') + '><td>Glulam net of stored carbon</td><td colspan="2">' + fmt(q.em[1]) + ' − ' + fmt(q.stored) + '</td><td>' + (q.net[1] < 0 ? '−' : '') + fmt(Math.abs(q.net[1])) + '</td></tr>';
  }
  $('calc').innerHTML = h;
}

function renderBanner() {
  const order = [0, 1, 2].sort((a, b) => q.net[a] - q.net[b]);
  const low = order[0], sec = order[1];
  const val = v => (v < 0 ? '−' : '') + fmt(Math.abs(v));
  let t = '<b>Lowest embodied carbon: ' + MATS[low].name + ', ' + val(q.net[low]) + ' kg CO₂e' + (bio && low === 1 ? ' (net of stored carbon)' : '') + '.</b> ';
  t += 'Ranking: ' + order.map(i => MATS[i].name + ' ' + val(q.net[i])).join(', then ') + '.';
  const pairs = overlaps();
  const swap = pairs.map(p => MATS[p[0]].name + ' and ' + MATS[p[1]].name);
  if (swap.length) t += '<br>Within the low-to-high factor ranges, ' + swap.join('; ') + ' can swap places. <b>Rankings can flip when factors are uncertain.</b>';
  else t += '<br>Across the whole low-to-high factor range, this ranking does not change.';
  $('banner').innerHTML = t;
}

function renderLabels() {
  $('lblN').textContent = 'Number of beams: ' + nBeams;
  $('lblS').textContent = 'Span: ' + spanFt + ' ft';
  MATS.forEach((m, i) => { $('lblF' + i).textContent = m.name + ': ' + fmt(fac[i], i === 0 ? 1 : 0) + ' ' + m.fUnit.replace('CO₂e', 'CO₂e'); });
  $('key').textContent = 'Pale dashed bars: mass (right axis, kg). Solid bars: embodied carbon (left axis, kg CO₂e). Green bar: stored biogenic carbon in kg CO₂.';
  $('note').textContent = 'All emission factors and sizing rules are illustrative. Each slider spans its low-to-high range: steel 0.7 to 2.5 kg CO₂e per kg, glulam 80 to 250 and concrete 200 to 500 kg CO₂e per m³.';
}

function refresh() {
  compute();
  renderLabels();
  renderTable();
  renderBanner();
  updateChart();
}

function init() {
  MATS.forEach((m, i) => {
    const s = $('f' + i);
    s.min = m.lo; s.max = m.hi; s.step = m.step; s.value = m.def;
    s.addEventListener('input', e => { fac[i] = +e.target.value; refresh(); });
  });
  $('nBeams').addEventListener('input', e => { nBeams = +e.target.value; refresh(); });
  $('span').addEventListener('input', e => { spanFt = +e.target.value; refresh(); });
  $('bioBox').addEventListener('change', e => { bio = e.target.checked; refresh(); });
  $('resetBtn').addEventListener('click', () => {
    nBeams = 6; spanFt = 40; bio = false; fac = MATS.map(m => m.def);
    $('nBeams').value = 6; $('span').value = 40; $('bioBox').checked = false;
    MATS.forEach((m, i) => { $('f' + i).value = m.def; });
    refresh();
  });
  compute();
  buildChart();
  refresh();
}

document.addEventListener('DOMContentLoaded', init);
