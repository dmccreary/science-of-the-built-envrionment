// Service Headroom for Solar and EV Loads MicroSim - Chart.js stacked bar of the Riverbend demand load plus EV chargers against service capacity, with an annual solar-versus-use bar
// CANVAS_HEIGHT: 730
// Bloom Level 5 (Evaluate)
// MicroSim template version 2026.03

// ---- Data: the Riverbend demand load of Chapter 16 (illustrative factors already applied) ----
const SQRT3 = 1.732;                  // value used throughout the chapter
const EV_VOLTS = 208;                 // Level 2 chargers: VA = amps x 208 V, as in the chapter
const SESSION_KWH = 36;               // charging session used in the chapter
const PV_YIELD = 1300;                // kWh per kW per year (Chapter 16 illustration)
const ANNUAL_USE = 158000;            // kWh per year: EUI 60 kBtu/ft2 x 9,000 ft2 / 3.412 (Chapter 19 illustration)
const SIZES = [100, 200, 400, 600];   // standard service sizes in amperes

const LOADS = [
  { key: 'lit', name: 'Lighting', va: 11250, color: 'rgb(255,215,60)', ink: 'rgb(120,95,0)', pat: 'diag',
    note: '9,000 VA connected at 125 percent because lighting is a continuous load.' },
  { key: 'rec', name: 'Receptacles', va: 10400, color: 'rgb(110,160,230)', ink: 'rgb(20,60,130)', pat: 'dots',
    note: '10,800 VA connected: first 10,000 VA at 100 percent, the rest at 50 percent.' },
  { key: 'hvac', name: 'HVAC', va: 25000, color: 'rgb(110,190,120)', ink: 'rgb(20,90,40)', pat: 'horiz',
    note: '25,000 VA connected at 100 percent.' },
  { key: 'kit', name: 'Kitchen', va: 12600, color: 'rgb(250,160,70)', ink: 'rgb(140,70,0)', pat: 'cross',
    note: '18,000 VA connected at an illustrative 70 percent demand factor.' }
];
const BUILDING_VA = LOADS.reduce((s, l) => s + l.va, 0);   // 59,250 VA
const EV_STYLE = { color: 'rgb(170,120,220)', ink: 'rgb(70,20,120)', pat: 'vert' };
const OVER_STYLE = { color: 'rgb(235,80,70)', ink: 'rgb(130,10,10)', pat: 'back' };

// ---- State ----
let svcAmps = 200, volts = 208, nEv = 4, evAmps = 32, pvKw = 30, loadMgmt = false;
let demandChart = null, solarChart = null;
const $ = id => document.getElementById(id);
const fmt = v => Math.round(v).toLocaleString('en-US');
const kva = va => (va / 1000).toFixed(2);

// hatch pattern: tinted background plus dark strokes, so a segment is readable without color
function makePattern(base, ink, kind) {
  const c = document.createElement('canvas');
  c.width = c.height = 12;
  const g = c.getContext('2d');
  g.fillStyle = base; g.fillRect(0, 0, 12, 12);
  g.strokeStyle = ink; g.fillStyle = ink; g.lineWidth = 1.4;
  g.beginPath();
  if (kind === 'diag') { g.moveTo(0, 12); g.lineTo(12, 0); g.moveTo(-3, 3); g.lineTo(3, -3); g.moveTo(9, 15); g.lineTo(15, 9); }
  else if (kind === 'back') { g.moveTo(0, 0); g.lineTo(12, 12); g.moveTo(-3, 9); g.lineTo(3, 15); g.moveTo(9, -3); g.lineTo(15, 3); }
  else if (kind === 'horiz') { g.moveTo(0, 3); g.lineTo(12, 3); g.moveTo(0, 9); g.lineTo(12, 9); }
  else if (kind === 'vert') { g.moveTo(3, 0); g.lineTo(3, 12); g.moveTo(9, 0); g.lineTo(9, 12); }
  else if (kind === 'cross') { g.moveTo(0, 6); g.lineTo(12, 6); g.moveTo(6, 0); g.lineTo(6, 12); }
  g.stroke();
  if (kind === 'dots') { [[3, 3], [9, 9]].forEach(p => { g.beginPath(); g.arc(p[0], p[1], 1.7, 0, 7); g.fill(); }); }
  return demandChart.ctx.createPattern(c, 'repeat');
}

// ---- Model ----
const capacityVA = () => SQRT3 * volts * svcAmps;
const ampsAt = va => va / (SQRT3 * volts);
function model() {
  const cap = capacityVA();
  const headroom = cap - BUILDING_VA;
  const evFull = nEv * evAmps * EV_VOLTS;
  const evShown = loadMgmt ? Math.min(evFull, Math.max(0, headroom)) : evFull;
  const total = BUILDING_VA + evShown;
  const over = total > cap + 0.5;
  const perKw = nEv > 0 ? evShown / nEv / 1000 : 0;
  return { cap, headroom, evFull, evShown, total, over, perKw };
}
// smallest standard size (at the current voltage) that carries the building plus all chargers at full power
function upgradeSize(evFull) {
  return SIZES.find(a => SQRT3 * volts * a >= BUILDING_VA + evFull) || null;
}
function hoursText(kw) {
  if (kw <= 0) return 'no charging possible';
  const h = SESSION_KWH / kw;
  return (h < 10 ? h.toFixed(1) : Math.round(h)) + ' h for a ' + SESSION_KWH + ' kWh session';
}

// ---- Plugin: capacity line, segment labels, overload note ----
const overlay = {
  id: 'overlay',
  afterDatasetsDraw(c) {
    const m = model(), ctx = c.ctx, ca = c.chartArea, xs = c.scales.x;
    ctx.save();
    // service capacity line
    const lx = xs.getPixelForValue(m.cap / 1000);
    ctx.setLineDash([]); ctx.strokeStyle = 'black'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(lx, ca.top); ctx.lineTo(lx, ca.bottom); ctx.stroke();
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif'; ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    const cl = 'Capacity ' + kva(m.cap) + ' kVA (' + svcAmps + ' A, ' + volts + ' V)';
    const onRight = lx < ca.left + (ca.right - ca.left) * 0.5;
    ctx.textAlign = 'left';
    // place a tag beside the line, clamped inside the plot area
    const tagX = text => Math.max(ca.left + 2, Math.min(ca.right - ctx.measureText(text).width - 2, onRight ? lx + 6 : lx - 6 - ctx.measureText(text).width));
    ctx.fillText(cl, tagX(cl), ca.top + 1);
    // segment labels, drawn on a white tag so hatching does not hurt legibility
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
    const yMid = (ca.top + ca.bottom) / 2;
    c.data.datasets.forEach(d => {
      const v = d.data[0];
      if (!(v > 0)) return;
      const x0 = xs.getPixelForValue(d.start), x1 = xs.getPixelForValue(d.start + v), w = x1 - x0;
      const full = d.shortName + ' ' + v.toFixed(2), short = v.toFixed(2);
      const label = ctx.measureText(full).width + 10 <= w ? full : (ctx.measureText(short).width + 10 <= w ? short : '');
      if (!label) return;
      const tw = ctx.measureText(label).width + 8, cx = (x0 + x1) / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.88)'; ctx.fillRect(cx - tw / 2, yMid - 10, tw, 20);
      ctx.fillStyle = 'black'; ctx.fillText(label, cx, yMid);
    });
    // overload tag
    if (m.over) {
      ctx.font = 'bold 14px Arial, Helvetica, sans-serif'; ctx.fillStyle = 'rgb(160,0,0)'; ctx.textBaseline = 'bottom';
      const ot = 'Over by ' + kva(m.total - m.cap) + ' kVA';
      ctx.fillText(ot, tagX(ot), ca.bottom - 1);
    }
    ctx.restore();
  }
};

// ---- Plugin: value tags at the end of the solar bars ----
const valueTags = {
  id: 'valueTags',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, meta = c.getDatasetMeta(0);
    ctx.save();
    ctx.font = 'bold 14px Arial, Helvetica, sans-serif'; ctx.fillStyle = 'black'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left';
    meta.data.forEach((bar, i) => ctx.fillText(fmt(c.data.datasets[0].data[i]) + ' kWh', bar.x + 6, bar.y));
    ctx.restore();
  }
};

function wrap(s, n) {
  const lines = []; let ln = '';
  s.split(' ').forEach(w => { if ((ln + ' ' + w).trim().length > n) { lines.push(ln); ln = w; } else ln = (ln + ' ' + w).trim(); });
  if (ln) lines.push(ln);
  return lines;
}

function buildCharts() {
  const tipFont = { titleFont: { size: 14 }, bodyFont: { size: 13 } };
  demandChart = new Chart($('demandChart'), {
    type: 'bar',
    data: { labels: [''], datasets: [] },
    plugins: [overlay],
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false,
      layout: { padding: { right: 8 } },
      datasets: { bar: { categoryPercentage: 0.58, barPercentage: 1 } },
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        x: { stacked: true, min: 0, title: { display: true, text: 'Demand (kVA, thousands of volt-amperes)', font: { size: 14 } }, ticks: { font: { size: 13 } }, grid: { color: 'rgb(220,220,220)' } },
        y: { stacked: true, ticks: { display: false }, grid: { display: false } }
      },
      plugins: {
        title: { display: true, text: 'Service demand versus capacity (Riverbend, illustrative loads)', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 2 } },
        legend: { position: 'top', labels: { font: { size: 13 }, boxWidth: 26, boxHeight: 14 } },
        tooltip: {
          ...tipFont,
          callbacks: {
            title: items => items[0].dataset.label,
            label: item => {
              const d = item.dataset, va = d.va;
              return [fmt(va) + ' VA (' + kva(va) + ' kVA)',
                      'Current: ' + ampsAt(va).toFixed(1) + ' A at ' + volts + ' V three-phase',
                      'Share of capacity: ' + (va / capacityVA() * 100).toFixed(1) + '%'];
            },
            afterLabel: item => wrap(item.dataset.note, 44)
          }
        }
      }
    }
  });

  solarChart = new Chart($('solarChart'), {
    type: 'bar',
    data: { labels: ['Annual use', 'Solar output'], datasets: [{ data: [ANNUAL_USE, 0], backgroundColor: ['rgb(150,150,150)', 'rgb(250,190,50)'], borderColor: 'dimgray', borderWidth: 2 }] },
    plugins: [valueTags],
    options: {
      indexAxis: 'y', responsive: true, maintainAspectRatio: false, animation: false,
      layout: { padding: { right: 8 } },
      scales: {
        x: { min: 0, max: 220000, title: { display: true, text: 'Energy per year (kWh)', font: { size: 14 } }, ticks: { font: { size: 13 }, callback: t => fmt(t), maxTicksLimit: 6 }, grid: { color: 'rgb(220,220,220)' } },
        y: { ticks: { font: { size: 14 }, autoSkip: false }, grid: { display: false } }
      },
      plugins: {
        title: { display: true, text: 'Annual solar production versus building energy use (illustrative)', color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 2 } },
        legend: { display: false },
        tooltip: {
          ...tipFont,
          callbacks: {
            title: items => items[0].label,
            label: item => item.dataIndex === 0
              ? ['158,000 kWh: 60 kBtu/ft² × 9,000 ft² ÷ 3.412 (all fuels, Chapter 19)']
              : [fmt(item.parsed.x) + ' kWh = ' + pvKw + ' kW × ' + fmt(PV_YIELD) + ' kWh/kW', 'Covers ' + Math.round(item.parsed.x / ANNUAL_USE * 100) + '% of annual use']
          }
        }
      }
    }
  });
}

function update() {
  const m = model();
  $('nText').textContent = 'EV chargers: ' + nEv;
  $('iText').textContent = 'Charger current: ' + evAmps + ' A';
  $('pvText').textContent = 'PV array size: ' + pvKw + ' kW';

  // demand chart datasets: four building loads, then EV (red when overloaded)
  const ds = [];
  let start = 0;
  LOADS.forEach(l => {
    ds.push({ label: l.name, shortName: l.name, data: [l.va / 1000], va: l.va, start: start / 1000, note: l.note,
      backgroundColor: makePattern(l.color, l.ink, l.pat), borderColor: 'dimgray', borderWidth: 1 });
    start += l.va;
  });
  const st = m.over ? OVER_STYLE : EV_STYLE;
  ds.push({ label: m.over ? 'EV chargers (overload)' : 'EV chargers', shortName: 'EV', data: [m.evShown / 1000], va: m.evShown, start: BUILDING_VA / 1000,
    note: nEv + ' chargers × ' + evAmps + ' A × ' + EV_VOLTS + ' V = ' + fmt(m.evFull) + ' VA at full power.' + (loadMgmt ? ' Load management caps the chargers at the headroom of ' + fmt(Math.max(0, m.headroom)) + ' VA.' : ''),
    backgroundColor: makePattern(st.color, st.ink, st.pat), borderColor: 'dimgray', borderWidth: 1 });
  demandChart.data.datasets = ds;
  const top = Math.max(m.cap, m.total) * 1.12 / 1000;
  const step = top > 400 ? 100 : top > 200 ? 50 : top > 100 ? 20 : 10;
  demandChart.options.scales.x.max = Math.ceil(top / step) * step;
  demandChart.options.scales.x.ticks.stepSize = step;
  demandChart.canvas.setAttribute('aria-label', 'Stacked horizontal bar. Building demand ' + kva(BUILDING_VA) + ' kVA plus EV chargers ' + kva(m.evShown) + ' kVA is ' + kva(m.total) + ' kVA against a service capacity of ' + kva(m.cap) + ' kVA. ' + (m.over ? 'The service is overloaded.' : 'The service is adequate.'));
  demandChart.update('none');

  solarChart.data.datasets[0].data = [ANNUAL_USE, pvKw * PV_YIELD];
  solarChart.canvas.setAttribute('aria-label', 'Annual solar production ' + fmt(pvKw * PV_YIELD) + ' kWh compared with illustrative annual use of ' + fmt(ANNUAL_USE) + ' kWh.');
  solarChart.update('none');

  renderReadout(m);
}

function renderReadout(m) {
  const headTxt = m.headroom >= 0 ? kva(m.headroom) + ' kVA' : kva(-m.headroom) + ' kVA short';
  let h = '<div class="stats">';
  h += '<div class="stat"><span>Building demand</span><b>' + kva(BUILDING_VA) + ' kVA (' + ampsAt(BUILDING_VA).toFixed(0) + ' A)</b></div>';
  h += '<div class="stat"><span>EV chargers' + (loadMgmt ? ' (managed)' : '') + '</span><b>' + kva(m.evShown) + ' kVA (' + ampsAt(m.evShown).toFixed(0) + ' A)</b></div>';
  h += '<div class="stat"><span>Total vs capacity</span><b>' + kva(m.total) + ' of ' + kva(m.cap) + ' kVA (' + Math.round(m.total / m.cap * 100) + '%)</b></div>';
  h += '<div class="stat"><span>Headroom before chargers</span><b>' + headTxt + '</b></div></div>';

  // status line
  let cls, msg;
  if (m.over) {
    cls = 'bad';
    msg = loadMgmt ? 'Service overloaded by the building alone: no headroom is left for chargers. Choose a larger service.'
      : 'Service overloaded: choose a larger service, fewer chargers, or load management.' + (m.headroom < 0 ? ' The building alone already exceeds this service.' : '');
  } else if (loadMgmt && m.evShown < m.evFull) {
    cls = 'lm';
    msg = 'Load management on: the ' + nEv + ' chargers share ' + kva(m.evShown) + ' kVA, so each vehicle gets ' + m.perKw.toFixed(2) + ' kW (' + (m.evShown / nEv / EV_VOLTS).toFixed(1) + ' A of the ' + evAmps + ' A rating).';
  } else {
    cls = 'ok'; msg = 'Service adequate: all chargers run at full power with ' + kva(m.cap - m.total) + ' kVA spare.';
    if (loadMgmt) msg += ' Load management is not limiting anything.';
  }
  h += '<div class="state ' + cls + '">' + msg + '</div>';

  // the three options of the chapter, evaluated for the current settings
  const full = evAmps * EV_VOLTS / 1000;
  const up = upgradeSize(m.evFull);
  const maxN = m.headroom > 0 ? Math.floor(m.headroom / (evAmps * EV_VOLTS)) : 0;
  const shareKw = nEv > 0 && m.headroom > 0 ? Math.min(full, m.headroom / nEv / 1000) : 0;
  h += '<ul class="opts">';
  h += '<li><b>Upgrade the service:</b> ' + (nEv === 0 ? 'no chargers selected.' : up ? (up === svcAmps ? 'the ' + svcAmps + ' A service already carries every charger at full power.' : up + ' A at ' + volts + ' V (' + kva(SQRT3 * volts * up) + ' kVA) carries all ' + nEv + ' chargers at ' + full.toFixed(2) + ' kW each.') : 'no listed size at ' + volts + ' V is enough.') + '</li>';
  h += '<li><b>Install fewer chargers:</b> ' + (m.headroom <= 0 ? 'none fit on this service.' : 'this service carries ' + Math.min(maxN, 99) + ' at full power (' + full.toFixed(2) + ' kW each)' + (nEv > maxN ? '; you chose ' + nEv + '.' : '.')) + '</li>';
  h += '<li><b>Manage the load:</b> ' + (nEv === 0 ? 'no chargers selected.' : m.headroom <= 0 ? 'no headroom to share.' : 'all ' + nEv + ' share the headroom at ' + shareKw.toFixed(2) + ' kW each, ' + hoursText(shareKw) + '.') + '</li>';
  h += '</ul>';
  h += '<div class="foot">Building demand is the Chapter 16 table (59,250 VA, illustrative factors) at either voltage. Chargers are counted at full output, amps × 208 V, as in the chapter; the circuit itself is sized at 125 percent. Solar does not reduce the service demand, since the service must carry the load at night and under snow. kVA is treated as kW for charging power.</div>';
  $('readout').innerHTML = h;
}

document.addEventListener('DOMContentLoaded', function () {
  buildCharts();
  $('svcSelect').addEventListener('change', e => { svcAmps = +e.target.value; update(); });
  document.querySelectorAll('input[name=volt]').forEach(r => r.addEventListener('change', e => { volts = +e.target.value; update(); }));
  $('lmBox').addEventListener('change', e => { loadMgmt = e.target.checked; update(); });
  $('nSlider').addEventListener('input', e => { nEv = +e.target.value; update(); });
  $('iSlider').addEventListener('input', e => { evAmps = +e.target.value; update(); });
  $('pvSlider').addEventListener('input', e => { pvKw = +e.target.value; update(); });
  update();
});
