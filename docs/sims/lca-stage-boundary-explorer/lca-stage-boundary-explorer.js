// Life-Cycle Stage and Boundary Explorer MicroSim - Chart.js stacked bars of life-cycle emissions by module for the Riverbend ledger
// CANVAS_HEIGHT: 700
// Bloom Level 4 (Analyze) + Level 2 (Understand)
// MicroSim template version 2026.03

// ---- Data: the Riverbend 60-year ledger of Chapter 20 (all values illustrative, in tonnes CO2e) ----
const PRODUCT_T = 330, CONSTRUCTION_T = 35, END_T = 20;     // modules A1-A3, A4-A5, C
const OP_T_PER_YEAR = 1720 / 60;                            // module B at 100 percent of baseline operating energy: about 28.7 t per year
const EFFICIENT_SHARE = 40;                                 // efficient, electrified case: 40 percent of baseline operating energy

const MODS = [
  { key: 'A1-A3', name: 'A1-A3 Product', color: 'saddlebrown', ink: 'white', inBoundary: ['gate', 'constr', 'grave'],
    def: 'Product stage: extracting raw materials, hauling them to the factory, and manufacturing the products.',
    ex: 'Example: mining iron ore and melting it into the steel beams, or growing and milling the trees for the glulam beams.' },
  { key: 'A4-A5', name: 'A4-A5 Construction', color: 'darkorange', ink: 'black', inBoundary: ['constr', 'grave'],
    def: 'Construction stage: transporting products to the site and installing them.',
    ex: 'Example: trucking the glulam beams to Riverbend and lifting them into place with a crane.' },
  { key: 'B', name: 'B Use', color: 'steelblue', ink: 'white', inBoundary: ['grave'],
    def: 'Use stage: operating energy, maintenance, and replacement while the building is occupied.',
    ex: 'Example: the natural gas burned each winter to heat the building, in this ledger. Replacing the roof membrane also belongs here.' },
  { key: 'C', name: 'C End of life', color: 'dimgray', ink: 'white', inBoundary: ['grave'],
    def: 'End of life: demolishing the building, hauling the waste, and disposing of it.',
    ex: 'Example: a crew taking the building down and trucking the debris to a landfill.' }
];
const BOUNDARIES = { gate: 'cradle-to-gate', constr: 'through-construction', grave: 'cradle-to-grave' };

// ---- State ----
let boundary = 'grave', opShare = 100, years = 60, picked = -1;
let chart = null;
const $ = id => document.getElementById(id);
const fmt = v => Math.round(v).toLocaleString('en-US');
const pctTxt = p => (p >= 10 ? Math.round(p) : p.toFixed(1)) + '%';

// ---- Calculation: module values in tonnes for a given operating share, limited to the chosen boundary ----
function ledger(share) {
  const all = [PRODUCT_T, CONSTRUCTION_T, OP_T_PER_YEAR * years * share / 100, END_T];
  const vals = all.map((v, i) => (MODS[i].inBoundary.includes(boundary) ? v : 0));
  const total = vals.reduce((a, b) => a + b, 0);
  return { all, vals, total, matShare: 100 * vals[0] / total };
}
function cases() { return [ledger(opShare), ledger(EFFICIENT_SHARE)]; }

function wrapText(str, n) {
  const out = []; let ln = '';
  str.split(' ').forEach(w => { if ((ln + ' ' + w).trim().length > n && ln) { out.push(ln); ln = w; } else ln = (ln + ' ' + w).trim(); });
  if (ln) out.push(ln);
  return out;
}

// ---- Chart ----
const percentPlugin = {
  id: 'segmentPercent',
  afterDatasetsDraw(c) {
    const { ctx } = c, cs = cases();
    ctx.save();
    ctx.textAlign = 'center';
    c.data.datasets.forEach((ds, di) => {
      c.getDatasetMeta(di).data.forEach((bar, bi) => {
        const v = ds.data[bi];
        if (!(v > 0)) return;
        const p = 100 * v / cs[bi].total;
        const w = Math.abs(bar.x - bar.base), mid = (bar.x + bar.base) / 2;
        const txt = pctTxt(p);
        ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
        if (w >= ctx.measureText(txt).width + 10) {
          ctx.fillStyle = MODS[di].ink; ctx.textBaseline = 'middle';
          ctx.fillText(txt, mid, bar.y);
        } else {            // segment too narrow for its label: write it above the bar with a tick
          ctx.fillStyle = 'black'; ctx.textBaseline = 'bottom';
          ctx.fillText(MODS[di].key + ' ' + txt, Math.min(Math.max(mid, 40), c.chartArea.right - 40), bar.y - bar.height / 2 - 3);
          ctx.strokeStyle = 'black'; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(mid, bar.y - bar.height / 2 - 2); ctx.lineTo(mid, bar.y - bar.height / 2 + 4); ctx.stroke();
        }
      });
    });
    ctx.restore();
  }
};

function buildChart() {
  Chart.defaults.font.family = 'Arial, Helvetica, sans-serif';
  chart = new Chart($('lcaChart'), {
    type: 'bar',
    data: {
      labels: ['', ''],
      datasets: MODS.map(m => ({ label: m.name, data: [0, 0], backgroundColor: m.color, borderColor: 'white', borderWidth: 1, maxBarThickness: 64 }))
    },
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: { duration: 250 },
      layout: { padding: { top: 6, right: 10 } },
      interaction: { mode: 'nearest', intersect: true },
      onClick: (e, els) => { picked = els.length ? els[0].datasetIndex : -1; renderInfo(); },
      onHover: (e, els) => { e.native.target.style.cursor = els.length ? 'pointer' : 'default'; },
      scales: {
        x: { stacked: true, min: 0, title: { display: true, text: 'Life-cycle emissions (tonnes CO₂e)', font: { size: 13 } }, ticks: { font: { size: 12 }, callback: v => fmt(v) } },
        y: { stacked: true, ticks: { font: { size: 13, weight: 'bold' } } }
      },
      plugins: {
        legend: { position: 'bottom', labels: { font: { size: 12 }, boxWidth: 18, padding: 8 } },
        tooltip: {
          bodyFont: { size: 13 }, titleFont: { size: 14 },
          callbacks: {
            title: items => MODS[items[0].datasetIndex].name,
            label: c => {
              const t = cases()[c.dataIndex].total;
              return wrapText(MODS[c.datasetIndex].def, 44).concat([fmt(c.parsed.x) + ' t CO₂e, ' + pctTxt(100 * c.parsed.x / t) + ' of the ' + BOUNDARIES[boundary] + ' total']);
            }
          }
        }
      }
    },
    plugins: [percentPlugin]
  });
}

function updateChart() {
  const cs = cases();
  const max = Math.max(cs[0].total, cs[1].total);
  chart.data.labels = [['Current design:', opShare + '% operating,', 'total ' + fmt(cs[0].total) + ' t'], ['Efficient, electrified:', EFFICIENT_SHARE + '% operating,', 'total ' + fmt(cs[1].total) + ' t']];
  chart.data.datasets.forEach((ds, i) => { ds.data = [cs[0].vals[i], cs[1].vals[i]]; });
  chart.options.scales.x.max = Math.ceil(max * 1.04 / 100) * 100;
  chart.update();
}

// ---- Text outputs ----
function renderReadout() {
  const cs = cases(), b = BOUNDARIES[boundary];
  let h = '<b>Current design: Materials are ' + Math.round(cs[0].matShare) + ' percent of the ' + b + ' total.</b><br>' +
    '<b>Efficient, electrified case: Materials are ' + Math.round(cs[1].matShare) + ' percent of the ' + b + ' total.</b>';
  const keep = boundary;
  const shares = ['gate', 'constr', 'grave'].map(k => { boundary = k; const r = ledger(opShare).matShare; return Math.round(r) + '% ' + BOUNDARIES[k]; });
  boundary = keep;
  h += '<div class="sub">Materials (A1-A3) share of the current design under each boundary: ' + shares.join(', ') + '.' +
    (boundary === 'gate' ? ' Cradle to gate counts only the product stage, so materials are always 100 percent of it.' : '') + '</div>';
  $('readout').innerHTML = h;
}

function renderInfo() {
  $('info').innerHTML = picked < 0
    ? 'Hover a segment for its definition and tonnes. Click a segment for an example of what the module includes. Module D (reuse and recycling benefits) is reported separately and is not in this chart.'
    : '<b>' + MODS[picked].name + '.</b> ' + MODS[picked].def + ' ' + MODS[picked].ex;
}

function refresh() {
  $('lblOp').textContent = 'Operating energy as a share of baseline: ' + opShare + '%';
  $('lblYr').textContent = 'Study period: ' + years + ' years';
  updateChart();
  renderReadout();
  renderInfo();
}

function init() {
  $('boundary').addEventListener('change', e => { boundary = e.target.value; refresh(); });
  $('opShare').addEventListener('input', e => { opShare = +e.target.value; refresh(); });
  $('years').addEventListener('input', e => { years = +e.target.value; refresh(); });
  $('effBtn').addEventListener('click', () => { opShare = EFFICIENT_SHARE; $('opShare').value = opShare; refresh(); });
  buildChart();
  refresh();
}

document.addEventListener('DOMContentLoaded', init);
