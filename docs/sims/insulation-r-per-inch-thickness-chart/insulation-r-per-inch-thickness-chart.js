// Insulation R-Value and Thickness Comparison MicroSim - Chart.js horizontal bars of the thickness each insulation needs to reach a target R-value
// CANVAS_HEIGHT: 860
// Bloom Level 4 (Analyze) + Level 5 (Evaluate)
// MicroSim template version 2026.03

// ---- Data: approximate values (Chapter 11 table). rpi = typical R per inch used for the bars; lo and hi = the published range.
// cost = illustrative installed cost per unit of R, with fiberglass = 1.0.
const materials = [
  { name: 'Fiberglass', tip: 'Air passes through it; loses R when wet; does not burn.', rpi: 3.7, lo: 3.1, hi: 3.8, cost: 1.0,
    air: 'Not an air barrier: air flows through it almost as freely as through an empty cavity.',
    moist: 'Does not absorb much water, but loses R-value when wet or compressed.',
    fire: 'Glass fibers do not burn, though paper and foil facings can.',
    uses: 'Stud-cavity batts and blown attic insulation, at the lowest cost per R.',
    caution: 'Fill the cavity fully, do not compress or fold the batt, and add a separate air control layer.' },
  { name: 'Mineral wool', tip: 'Not an air barrier; dries readily; noncombustible.', rpi: 4.0, lo: 3.7, hi: 4.2, cost: 2.0,
    air: 'Not an air barrier by itself, so seal the air control layer separately.',
    moist: 'Repels liquid water but lets vapor pass, so it dries readily.',
    fire: 'Noncombustible, so it is used in fire-rated assemblies.',
    uses: 'Cavity batts, exterior continuous insulation board, fire-rated walls, and sound partitions.',
    caution: 'Heavier and costlier than fiberglass. Cut batts slightly oversize so they fit snugly.' },
  { name: 'Cellulose', tip: 'Dense-pack slows air only; buffers moisture; borate fire treatment.', rpi: 3.7, lo: 3.2, hi: 3.8, cost: 1.1,
    air: 'Dense-packing slows air movement through the cavity but is not a substitute for an air barrier.',
    moist: 'Absorbs and releases moisture, which buffers short wetting, but it must be kept dry.',
    fire: 'Treated with borate compounds that resist fire, insects, and mold.',
    uses: 'Loose fill in attics and dense-packed fill in closed wall cavities.',
    caution: 'Loose fill settles, so install extra depth to meet the labeled R-value after settling.' },
  { name: 'Open-cell foam', tip: 'Seals air; vapor-permeable; combustible, needs a thermal barrier.', rpi: 3.6, lo: 3.5, hi: 3.7, cost: 2.5,
    air: 'Seals air leaks as it cures, so one application can serve as the air and thermal layers.',
    moist: 'Vapor-permeable and can absorb water, so it does not act as a vapor retarder.',
    fire: 'Combustible: it needs a thermal barrier such as 1/2 in gypsum board.',
    uses: 'Wall cavities and irregular spaces where air sealing matters.',
    caution: 'Needs trained crews and the maker\'s thickness per pass; poor mixing causes shrinkage and odors.' },
  { name: 'Closed-cell foam', tip: 'Seals air; acts as a Class II vapor retarder; combustible, needs a thermal barrier.', rpi: 6.5, lo: 6.0, hi: 7.0, cost: 4.0,
    air: 'Seals air leaks as it cures and stiffens the surface it covers.',
    moist: 'Resists liquid water, and a few inches act as a Class II vapor retarder.',
    fire: 'Combustible: it needs a thermal barrier such as 1/2 in gypsum board.',
    uses: 'Rim joists, small air leaks, and places that need high R in little depth.',
    caution: 'Highest cost per R, and some blowing agents have a large global-warming effect (Chapter 20).' },
  { name: 'EPS board', tip: 'Air barrier if taped; moisture-resistant; combustible.', rpi: 4.0, lo: 3.6, hi: 4.2, cost: 1.6,
    air: 'An air barrier only where the joints are taped or sealed.',
    moist: 'Moisture-resistant and somewhat vapor-permeable, so a wall can dry slowly through it.',
    fire: 'Combustible: it needs a thermal barrier when used inside the building.',
    uses: 'Continuous insulation outside the sheathing, and under slabs.',
    caution: 'Tape the joints, protect it from sunlight before it is covered, and add a thermal barrier indoors.' },
  { name: 'XPS board', tip: 'Air barrier if taped; low vapor permeance; combustible.', rpi: 5.0, lo: 4.5, hi: 5.0, cost: 2.2,
    air: 'An air barrier only where the joints are taped or sealed.',
    moist: 'Moisture-resistant with low vapor permeance, so it limits drying toward the outside.',
    fire: 'Combustible: it needs a thermal barrier when used inside the building.',
    uses: 'Slab edges, foundation walls, and continuous insulation outside the framing.',
    caution: 'Protect it from sunlight, and consider the blowing agent (Chapter 20). Keep a drying path for the wall.' },
  { name: 'Polyiso board', tip: 'Air barrier if taped; foil blocks vapor; combustible; loses R in cold.', rpi: 6.0, lo: 5.6, hi: 6.5, cost: 2.0, cold: true,
    air: 'Foil faces help, but it is an air barrier only where the joints are taped.',
    moist: 'Foil faces block vapor, and the board must be kept dry.',
    fire: 'Combustible: it needs a thermal barrier when used inside the building.',
    uses: 'Roof insulation, and continuous insulation outside the walls in mild weather.',
    caution: 'It loses R-value in cold weather, so design with the cold-weather value in Minnesota.' }
];
const COLD_FACTOR = 0.75; // illustrative: polyiso keeps about 75 percent of its R per inch at low mean temperatures

// ---- State ----
let chart = null;
let selected = -1;
const el = id => document.getElementById(id);

// ---- Calculation: thickness = target R / R per inch ----
function readState() {
  const cv = el('cavity').value;
  return { target: +el('target').value, cavity: cv === 'none' ? null : +cv, showCost: el('costBox').checked, derate: el('coldBox').checked };
}
function rpiOf(m, s) { return m.cold && s.derate ? m.rpi * COLD_FACTOR : m.rpi; }
function rows(s) {
  return materials.map(m => {
    const rpi = rpiOf(m, s), t = s.target / rpi;
    const fits = s.cavity === null ? null : t <= s.cavity + 1e-9;
    return { m, rpi, t, fits, fillR: s.cavity === null ? null : rpi * s.cavity };
  });
}
const f1 = v => (Math.round(v * 10) / 10).toFixed(1);

// hatch pattern for bars that do not fit, so the state is not carried by color alone
function hatch(col) {
  const c = document.createElement('canvas');
  c.width = c.height = 10;
  const x = c.getContext('2d');
  x.fillStyle = 'white';
  x.fillRect(0, 0, 10, 10);
  x.fillStyle = col;
  x.globalAlpha = 0.35;
  x.fillRect(0, 0, 10, 10);
  x.globalAlpha = 1;
  x.strokeStyle = col;
  x.lineWidth = 2.5;
  x.beginPath();
  x.moveTo(-2, 12); x.lineTo(12, -2);
  x.moveTo(-2, 2); x.lineTo(2, -2);
  x.moveTo(8, 12); x.lineTo(12, 8);
  x.stroke();
  return x.createPattern(c, 'repeat');
}
let hatchRed = null;

function barColors(rs) {
  return rs.map(r => r.fits === null ? 'steelblue' : (r.fits ? 'seagreen' : hatchRed));
}
function borderColors(rs) { return rs.map((r, i) => i === selected ? 'navy' : (r.fits === false ? 'crimson' : 'dimgray')); }

// ---- Plugin: the cavity-depth line, and a text label at the end of every bar ----
const overlay = {
  id: 'overlay',
  afterDatasetsDraw(c) {
    const s = readState(), rs = rows(s), ctx = c.ctx, xs = c.scales.x;
    ctx.save();
    ctx.textBaseline = 'middle';
    c.getDatasetMeta(0).data.forEach((bar, i) => {
      const r = rs[i];
      let txt = f1(r.t) + ' in';
      if (r.fits !== null) txt += r.fits ? ', fits' : ', too thick';
      if (s.showCost) txt += ' (' + f1(r.m.cost) + '×)';
      ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
      ctx.textAlign = 'left';
      ctx.globalAlpha = 0.85;
      ctx.fillStyle = 'white';
      ctx.fillRect(bar.x + 3, bar.y - 9, ctx.measureText(txt).width + 6, 18);
      ctx.globalAlpha = 1;
      ctx.fillStyle = r.fits === false ? 'crimson' : 'black';
      ctx.fillText(txt, bar.x + 6, bar.y);
    });
    if (s.cavity !== null) {
      const x = xs.getPixelForValue(s.cavity);
      ctx.strokeStyle = 'navy';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(x, c.chartArea.top);
      ctx.lineTo(x, c.chartArea.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = 'navy';
      ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
      ctx.textAlign = x > c.chartArea.right - 110 ? 'right' : 'left';
      ctx.fillText('Cavity depth ' + s.cavity + ' in', x + (ctx.textAlign === 'left' ? 5 : -5), c.chartArea.top - 8);
    }
    ctx.restore();
  }
};

// leave room to the right of the longest bar for its text label
function axisMax(s, rs) {
  const maxT = Math.max(...rs.map(r => r.t));
  const plotW = chart && chart.chartArea ? chart.chartArea.width : 480;
  const labelPx = 125 + (s.cavity !== null ? 55 : 0) + (s.showCost ? 50 : 0);
  const room = 1 / Math.max(0.35, 1 - labelPx / plotW);
  return Math.max(6, Math.ceil(Math.max(maxT * room, s.cavity === null ? 0 : s.cavity * 1.3) / 2) * 2);
}

function wrap(s, n) {
  const words = s.split(' '), lines = [];
  let cur = '';
  words.forEach(w => { if ((cur + ' ' + w).trim().length > n) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
  if (cur) lines.push(cur);
  return lines;
}

// ---- Build the chart once; later changes update its data ----
function buildChart() {
  const s = readState(), rs = rows(s);
  hatchRed = hatch('crimson');
  chart = new Chart(el('insChart'), {
    type: 'bar',
    data: {
      labels: materials.map(m => m.name),
      datasets: [{ label: 'Thickness needed', data: rs.map(r => r.t), backgroundColor: barColors(rs), borderColor: borderColors(rs), borderWidth: rs.map((r, i) => i === selected ? 3 : 1) }]
    },
    plugins: [overlay],
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'nearest', axis: 'y', intersect: false },
      onClick: (e, els, c) => {
        const hit = c.getElementsAtEventForMode(e, 'nearest', { axis: 'y', intersect: false }, true);
        if (hit.length) { selected = hit[0].index; refresh(); }
      },
      onHover: (e, els, c) => { c.canvas.style.cursor = els.length ? 'pointer' : 'default'; },
      scales: {
        x: { min: 0, max: axisMax(s, rs), title: { display: true, text: 'Thickness needed to reach the target R-value (inches)', font: { size: 14 } }, ticks: { font: { size: 13 }, maxTicksLimit: 9 }, grid: { color: 'rgb(220,220,220)' } },
        y: { ticks: { font: { size: 14 }, color: 'black' }, grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: '', color: 'black', font: { size: 17, weight: 'bold' }, padding: { top: 2, bottom: 20 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => materials[items[0].dataIndex].name,
            label: item => {
              const s2 = readState(), r = rows(s2)[item.dataIndex], m = r.m;
              const out = ['R per inch: ' + f1(m.lo) + ' to ' + f1(m.hi) + ' (bar uses ' + f1(r.rpi) + (m.cold && s2.derate ? ', cold-weather value' : '') + ')'];
              out.push('For R-' + s2.target + ' you need ' + f1(r.t) + ' in');
              if (r.fits !== null) out.push(r.fits ? 'Fits the ' + s2.cavity + ' in cavity' : 'Too thick for the ' + s2.cavity + ' in cavity (a full cavity gives R-' + f1(r.fillR) + ')');
              return out.concat(wrap(m.tip, 44));
            }
          }
        }
      }
    }
  });
}

// ---- Refresh chart, readout, and info box ----
function refresh() {
  const s = readState(), rs = rows(s);
  el('lblTarget').textContent = 'Target R-value: R-' + s.target;
  const ds = chart.data.datasets[0];
  ds.data = rs.map(r => r.t);
  ds.backgroundColor = barColors(rs);
  ds.borderColor = borderColors(rs);
  ds.borderWidth = rs.map((r, i) => i === selected ? 3 : 1);
  chart.options.scales.x.max = axisMax(s, rs);
  chart.options.plugins.title.text = 'Thickness needed for R-' + s.target + (s.cavity === null ? ' (no cavity limit)' : ' in a ' + s.cavity + ' in cavity');
  chart.update('none');
  renderReadout(s, rs);
  renderInfo(s, rs);
}

function renderReadout(s, rs) {
  const least = rs.reduce((a, r) => r.t < a.t ? r : a, rs[0]);
  let h;
  if (s.cavity === null) {
    h = '<b>No cavity limit.</b> The thinnest option is ' + least.m.name.toLowerCase() + ' at ' + f1(least.t) + ' in; the thickest is ' + rs.reduce((a, r) => r.t > a.t ? r : a, rs[0]).m.name.toLowerCase() + ' at ' + f1(Math.max(...rs.map(r => r.t))) + ' in.';
  } else {
    const fit = rs.filter(r => r.fits);
    h = '<b>' + fit.length + ' of ' + rs.length + ' options fit the ' + s.cavity + ' in cavity at R-' + s.target + '.</b> ';
    if (fit.length === 0) h += 'None fits: add insulation outside the framing, as Chapter 11 recommends, or choose a deeper cavity.';
    else {
      h += 'Thinnest: ' + least.m.name.toLowerCase() + ' (' + f1(least.t) + ' in).';
      if (s.showCost) { const cheap = fit.reduce((a, r) => r.m.cost < a.m.cost ? r : a, fit[0]); h += ' Lowest cost that fits: ' + cheap.m.name.toLowerCase() + ' (' + f1(cheap.m.cost) + '×).'; }
    }
  }
  const notes = [];
  if (s.showCost) notes.push('Cost (×) is illustrative per unit of R; fiberglass = 1.0.');
  if (s.derate) {
    const pi = materials.find(m => m.cold);
    notes.push('Cold weather: the gas in polyiso cells insulates less when cold, so it keeps about ' + Math.round(100 * COLD_FACTOR) + '% of its R per inch (illustrative R-' + f1(pi.rpi) + ' to R-' + f1(pi.rpi * COLD_FACTOR) + '); EPS and XPS change little.');
  }
  if (notes.length) h += '<div class="note">' + notes.join(' ') + '</div>';
  el('readout').innerHTML = h;
}

function renderInfo(s, rs) {
  const box = el('infobox');
  if (selected < 0) { box.innerHTML = '<h3>Click a bar to see a material</h3>Hover over a bar for its R-per-inch range and its air, moisture, and fire behavior. Click it for common uses and installation cautions.'; return; }
  const r = rs[selected], m = r.m;
  let h = '<h3>' + m.name + ': R-' + f1(r.rpi) + ' per inch (range ' + f1(m.lo) + ' to ' + f1(m.hi) + ')</h3>';
  h += '<div>For R-' + s.target + ' it needs <b>' + f1(r.t) + ' in</b>' + (r.fits === null ? '.' : (r.fits ? ' and fits the ' + s.cavity + ' in cavity.' : ' and is too thick for the ' + s.cavity + ' in cavity; a full cavity gives only R-' + f1(r.fillR) + '.')) + '</div>';
  h += '<div>' + m.air + ' ' + m.moist + '</div>';
  h += '<div><b>Common uses:</b> ' + m.uses + '</div><div><b>Installation cautions:</b> ' + m.caution + '</div>';
  box.innerHTML = h;
}

// ---- Wiring ----
document.addEventListener('DOMContentLoaded', function () {
  buildChart();
  ['target', 'cavity', 'costBox', 'coldBox'].forEach(id => el(id).addEventListener('input', refresh));
  ['cavity', 'costBox', 'coldBox'].forEach(id => el(id).addEventListener('change', refresh));
  refresh();
});
