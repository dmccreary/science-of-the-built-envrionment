// Ground-Source ROI Estimator - Chart.js
// CANVAS_HEIGHT: 760
// Bloom Level 5 (Evaluate): judge whether a buried earth-tube air intake pays for itself in a typical Minnesota home, and find the pipe length with the shortest payback

// ---- Climate ----
// Monthly mean outdoor temperature: NOAA 1991-2020 U.S. Climate Normals,
// Minneapolis-St. Paul International Airport (station USW00014922). mid = day of the year on the 15th.
const MONTHS = [
  { n: 'January', a: 'Jan', d: 31, mid: 15, tOut: 16.2 }, { n: 'February', a: 'Feb', d: 28, mid: 46, tOut: 20.6 },
  { n: 'March', a: 'Mar', d: 31, mid: 74, tOut: 33.3 }, { n: 'April', a: 'Apr', d: 30, mid: 105, tOut: 47.1 },
  { n: 'May', a: 'May', d: 31, mid: 135, tOut: 59.5 }, { n: 'June', a: 'Jun', d: 30, mid: 166, tOut: 69.7 },
  { n: 'July', a: 'Jul', d: 31, mid: 196, tOut: 74.3 }, { n: 'August', a: 'Aug', d: 31, mid: 227, tOut: 71.8 },
  { n: 'September', a: 'Sep', d: 30, mid: 258, tOut: 63.5 }, { n: 'October', a: 'Oct', d: 31, mid: 288, tOut: 49.5 },
  { n: 'November', a: 'Nov', d: 30, mid: 319, tOut: 34.8 }, { n: 'December', a: 'Dec', d: 31, mid: 349, tOut: 22.0 }
];

// Soil temperature at pipe depth: the Appendix E model for its illustrative Twin Cities-like site
const GROUND = { mean: 45, swing: 28, damping: 7.9, coldDay: 20, depth: 8 };
function groundTemp(day) {
  const zd = GROUND.depth / GROUND.damping;
  return GROUND.mean - GROUND.swing * Math.exp(-zd) * Math.cos(2 * Math.PI / 365 * (day - GROUND.coldDay) - zd);
}
MONTHS.forEach(m => { m.tG = Math.round(groundTemp(m.mid) * 10) / 10; });

// ---- Illustrative house, pipe, prices and installed cost ----
const HOUSE = { ua: 300, cfm: 100, balance: 65 };        // enclosure loss in Btu/h per F, outdoor air in cfm, balance point in F
const VENT = 1.08 * HOUSE.cfm;                           // Btu/h per F carried by the outdoor air
const PIPE = { diameterIn: 8, u: 0.5 };                  // U in Btu/h per ft2 per F, air film plus surrounding soil
const L0 = VENT / (PIPE.u * Math.PI * PIPE.diameterIn / 12);   // 103 ft: each L0 of pipe closes 63% of the remaining gap
const PRICE = { therm: 1.20, kwh: 0.14 };                // Appendix A illustrative prices
const COOL_COP = 4;
const COOL_PER_BTU = PRICE.kwh / (3412 * COOL_COP);
const SYSTEMS = {
  gas: { label: '95% gas furnace', perBtu: PRICE.therm / (0.95 * 100000) },
  hp: { label: 'Heat pump, seasonal COP 2.5', perBtu: PRICE.kwh / (3412 * 2.5) },
  res: { label: 'Electric resistance heat', perBtu: PRICE.kwh / 3412 }
};
const YEARS = 30;
const LEN = { min: 50, max: 400, step: 10 };

// ---- Model ----
// Each month is a heating month (mean below 65 F) or a cooling month. The tube moves the intake air
// toward the soil temperature by its effectiveness. A bypass damper skips the tube when it would not help.
// fixed = the cost that does not depend on length: intake, filter, drain, bypass damper, wall opening
function compute(len, perFt, fixed, sysKey) {
  const eff = 1 - Math.exp(-len / L0);
  const rows = MONTHS.map(m => {
    const hours = 24 * m.d;
    const heating = m.tOut < HOUSE.balance;
    const sign = heating ? 1 : -1;
    const tTube = m.tOut + eff * (m.tG - m.tOut);
    const used = heating ? tTube > m.tOut : tTube < m.tOut;
    const tIn = used ? tTube : m.tOut;
    const stdLoad = sign * (HOUSE.ua + VENT) * (HOUSE.balance - m.tOut);
    const gsLoad = Math.max(0, sign * (HOUSE.ua * (HOUSE.balance - m.tOut) + VENT * (HOUSE.balance - tIn)));
    const perBtu = heating ? SYSTEMS[sysKey].perBtu : COOL_PER_BTU;
    return { heating, used, tIn, std: stdLoad * hours * perBtu, gs: gsLoad * hours * perBtu };
  });
  const annualStd = rows.reduce((s, r) => s + r.std, 0);
  const annualGs = rows.reduce((s, r) => s + r.gs, 0);
  const savings = annualStd - annualGs;
  const installed = fixed + perFt * len;
  return {
    len, eff, rows, annualStd, annualGs, savings, installed,
    payback: installed / savings,
    roi: (YEARS * savings - installed) / installed
  };
}
function bestLength(perFt, fixed, sysKey) {
  let best = null;
  for (let len = LEN.min; len <= LEN.max; len += LEN.step) {
    const r = compute(len, perFt, fixed, sysKey);
    if (!best || r.payback < best.payback) best = r;
  }
  return best;
}

document.addEventListener('DOMContentLoaded', function () {
  const $ = id => document.getElementById(id);
  const money = v => '$' + Math.round(v).toLocaleString('en-US');
  const deg = v => Math.round(v) + '°F';
  const years = v => Math.round(v).toLocaleString('en-US') + ' years';
  const NOTE = 'Monthly temperatures are NOAA 1991-2020 normals for Minneapolis-St. Paul. The house, pipe, prices and installed cost are illustrative. ' +
    'The model assumes the soil stays at its undisturbed temperature and leaves out fan energy, maintenance and humidity, so real savings would be lower.';
  // Validated categorical order: red, yellow, aqua, blue (each bar only ever sits beside its neighbor in this list)
  const COLORS = { stdHeat: '#e34948', gsHeat: '#eda100', stdCool: '#1baf7a', gsCool: '#2a78d6' };

  let model = null;
  let tableShown = false;
  const challenge = { key: '', attempts: 0, done: false };

  // ---- Chart ----
  const bar = (label, stack, color) => ({
    label, stack, data: [], backgroundColor: color, borderWidth: 0,
    borderRadius: { topLeft: 4, topRight: 4 }, maxBarThickness: 24, categoryPercentage: 0.8, barPercentage: 0.88
  });
  const chart = new Chart($('chart').getContext('2d'), {
    type: 'bar',
    data: {
      labels: MONTHS.map(m => m.a),
      datasets: [
        bar('Standard: heating', 'std', COLORS.stdHeat),
        bar('Ground source: heating', 'gs', COLORS.gsHeat),
        bar('Standard: cooling', 'std', COLORS.stdCool),
        bar('Ground source: cooling', 'gs', COLORS.gsCool)
      ]
    },
    options: {
      responsive: true, maintainAspectRatio: false, animation: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { stacked: true, grid: { display: false }, ticks: { color: 'black' } },
        y: {
          stacked: true, beginAtZero: true, grid: { color: 'rgba(0, 0, 0, 0.1)' },
          ticks: { color: 'black', callback: v => '$' + v },
          title: { display: true, text: 'Heating and cooling cost per month', color: 'black' }
        }
      },
      plugins: {
        legend: { labels: { color: 'black', boxWidth: 14, boxHeight: 14, padding: 8 } },
        tooltip: {
          filter: item => item.parsed.y > 0,
          callbacks: {
            title: items => items.length ? MONTHS[items[0].dataIndex].n : '',
            label: item => item.dataset.label + ': ' + money(item.parsed.y),
            afterBody: items => {
              if (!model || !items.length) return '';
              const i = items[0].dataIndex, m = MONTHS[i], r = model.rows[i];
              const temps = 'Outdoor air ' + deg(m.tOut) + ', soil at 8 ft ' + deg(m.tG);
              if (!r.used) return ['Tube bypassed: no saving', temps, 'The soil would work against the house this month.'];
              return ['Saved ' + money(r.std - r.gs) + ' this month', temps, 'Intake air arrives at ' + deg(r.tIn)];
            }
          }
        }
      }
    }
  });

  // ---- Table view: the same numbers the chart shows ----
  function buildTable() {
    const cell = (v, tag) => '<' + (tag || 'td') + '>' + v + '</' + (tag || 'td') + '>';
    let html = '<table><thead><tr>' + ['Month', 'Outdoor air', 'Soil at 8 ft', 'Intake air', 'Standard intake', 'Ground-source intake', 'Saved']
      .map(h => cell(h, 'th')).join('') + '</tr></thead><tbody>';
    model.rows.forEach((r, i) => {
      const m = MONTHS[i];
      html += '<tr>' + cell(m.n) + cell(m.tOut.toFixed(1) + '°F') + cell(m.tG.toFixed(1) + '°F') +
        cell(r.used ? r.tIn.toFixed(1) + '°F' : 'bypass') + cell(money(r.std)) + cell(money(r.gs)) + cell(money(r.std - r.gs)) + '</tr>';
    });
    html += '<tr class="total">' + cell('Year') + cell('') + cell('') + cell('') + cell(money(model.annualStd)) +
      cell(money(model.annualGs)) + cell(money(model.savings)) + '</tr></tbody></table>';
    $('tableBox').innerHTML = html;
  }

  // ---- Challenge: find the pipe length with the shortest payback ----
  function setMsg(text, kind) { const m = $('msg'); m.textContent = text; m.className = 'msg' + (kind ? ' ' + kind : ''); }
  function resetChallenge(key) {
    challenge.key = key; challenge.attempts = 0; challenge.done = false;
    $('lenInput').value = ''; $('lenInput').disabled = false; $('checkBtn').disabled = false;
    setMsg('Move the pipe-length slider and watch the payback for this cost and heating system. Type your answer, then press Check.', '');
  }
  function check() {
    if (challenge.done) return;
    const perFt = +$('costSlider').value, fixed = +$('fixedSlider').value, sysKey = $('sysSel').value;
    const typed = parseFloat($('lenInput').value);
    if (isNaN(typed) || typed < LEN.min || typed > LEN.max) {
      setMsg('Type a pipe length between ' + LEN.min + ' and ' + LEN.max + ' ft, then press Check.', 'bad');
      return;
    }
    const best = bestLength(perFt, fixed, sysKey);
    const mine = compute(typed, perFt, fixed, sysKey);
    const why = 'Savings level off as the pipe gets longer, but the cost keeps rising by $' + perFt + ' for every foot.';
    challenge.attempts++;
    if (Math.abs(typed - best.len) <= 20) {
      setMsg('Correct: about ' + best.len + ' ft pays back fastest, in ' + years(best.payback) + '. ' + why, 'good');
      challenge.done = true;
    } else if (challenge.attempts >= 2) {
      setMsg('Not this time. About ' + best.len + ' ft pays back fastest, in ' + years(best.payback) + '. ' + why, 'bad');
      challenge.done = true;
    } else {
      setMsg('Not quite. At ' + typed + ' ft the payback is ' + years(mine.payback) + '. Try a ' + (typed > best.len ? 'shorter' : 'longer') +
        ' pipe: compare how much the savings and the cost each change. One more try.', 'bad');
    }
    if (challenge.done) { $('lenInput').disabled = true; $('checkBtn').disabled = true; }
  }

  // ---- Update everything from the controls ----
  function update() {
    const len = +$('lenSlider').value, perFt = +$('costSlider').value, fixed = +$('fixedSlider').value, sysKey = $('sysSel').value;
    model = compute(len, perFt, fixed, sysKey);
    $('lenText').textContent = 'Pipe length: ' + len + ' ft';
    $('costText').textContent = 'Installed cost: $' + perFt + ' per foot';
    $('fixedText').textContent = 'Fixed cost: ' + money(fixed);

    const pick = (heating, field) => model.rows.map(r => r.heating === heating ? Math.round(r[field]) : 0);
    chart.data.datasets[0].data = pick(true, 'std');
    chart.data.datasets[1].data = pick(true, 'gs');
    chart.data.datasets[2].data = pick(false, 'std');
    chart.data.datasets[3].data = pick(false, 'gs');
    chart.update();
    buildTable();

    const back = YEARS * model.savings / model.installed;
    $('costVal').textContent = money(model.installed);
    $('costSub').textContent = money(fixed) + ' fixed + ' + len + ' ft × $' + perFt;
    $('saveVal').textContent = money(model.savings);
    $('saveSub').textContent = money(model.annualStd) + ' falls to ' + money(model.annualGs) + ' a year';
    $('payVal').textContent = years(model.payback);
    $('paySub').textContent = 'installed cost ÷ yearly savings';
    $('roiVal').textContent = (model.roi >= 0 ? '+' : '−') + Math.abs(Math.round(model.roi * 100)) + '%';
    $('roiSub').textContent = '$' + back.toFixed(2) + ' back for each $1 spent';

    const jan = model.rows[0], jul = model.rows[6];
    $('readout').innerHTML = '<div>A <b>' + len + ' ft</b> pipe closes <b>' + Math.round(model.eff * 100) + '%</b> of the gap between the outdoor air and the soil 8 ft down. ' +
      'January air arrives at <b>' + deg(jan.tIn) + '</b> instead of ' + deg(MONTHS[0].tOut) + ', and July air at <b>' + deg(jul.tIn) + '</b> instead of ' + deg(MONTHS[6].tOut) + '.</div>';

    const key = perFt + '|' + fixed + '|' + sysKey;
    if (key !== challenge.key) resetChallenge(key);
  }

  $('viewBtn').addEventListener('click', () => {
    tableShown = !tableShown;
    $('tableBox').classList.toggle('hide', !tableShown);
    $('viewBtn').textContent = tableShown ? 'Show chart' : 'Show table';
  });
  ['lenSlider', 'costSlider', 'fixedSlider'].forEach(id => $(id).addEventListener('input', update));
  $('sysSel').addEventListener('change', update);
  $('checkBtn').addEventListener('click', check);
  $('lenInput').addEventListener('keydown', e => { if (e.key === 'Enter') check(); });

  $('note').textContent = NOTE;
  update();
});
