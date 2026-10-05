// Psychrometric Chart Explorer MicroSim - move a state point on a simplified psychrometric chart to read RH and dew point, and test a wall surface
// CANVAS_HEIGHT: 690
// Bloom Level 3 (Apply) + Level 2 (Understand)
// MicroSim template version 2026.03

// ---- Moist-air model: Magnus formula over liquid water at standard sea-level pressure ----
const P_HPA = 1013.25;
const Y_MAX = 0.020;      // top of the chart, lb water per lb dry air
const T_MIN = -20, T_MAX = 100;

function esHpa(tF) { const c = (tF - 32) / 1.8; return 6.112 * Math.exp(17.62 * c / (243.12 + c)); }
function wFromRh(tF, rh) { const ev = rh / 100 * esHpa(tF); return 0.62198 * ev / (P_HPA - ev); }
function rhFromW(tF, w) { const ev = P_HPA * w / (0.62198 + w); return 100 * ev / esHpa(tF); }
function dewPointF(tF, rh) {
  const g = Math.log(rh / 100 * esHpa(tF) / 6.112);
  return (243.12 * g / (17.62 - g)) * 1.8 + 32;
}

// ---- State ----
let T = 70, RH = 30;        // air temperature (F) and relative humidity (%)
let message = 'Drag the orange dot or use the sliders. Slide the dot left along the dashed line to read the dew point.';
let dragging = false;

const $ = id => document.getElementById(id);
const plot = $('plot');

// ---- Static RH curves, 10 to 100 percent ----
const temps = [];
for (let t = T_MIN; t <= T_MAX; t += 2) temps.push(t);
const blues = ['#d6e6f5', '#c3dcf1', '#aed0ec', '#97c2e6', '#80b3df', '#6aa3d8', '#5593d0', '#4283c8', '#2f72bd'];

function curveTraces() {
  const traces = [];
  for (let rh = 10; rh <= 100; rh += 10) {
    const sat = rh === 100;
    traces.push({
      x: temps, y: temps.map(t => wFromRh(t, rh)), mode: 'lines', type: 'scatter',
      line: { color: sat ? 'darkblue' : blues[rh / 10 - 1], width: sat ? 3 : 2 },
      hovertemplate: (sat ? 'Saturation line, RH 100%' : 'RH ' + rh + '%') + '<br>%{x:.0f}°F, humidity ratio %{y:.4f}<extra></extra>',
      showlegend: false
    });
  }
  // curve labels: 10 to 50 percent at the right edge; steeper curves (60 to 100 percent) at 62 F, where they are spread apart
  const lx = [], ly = [], lt = [];
  for (let rh = 10; rh <= 100; rh += 10) {
    let tEnd = T_MAX;
    if (rh >= 60) tEnd = 62;
    else while (tEnd > T_MIN && wFromRh(tEnd, rh) > Y_MAX * 0.96) tEnd -= 1;
    lx.push(tEnd); ly.push(wFromRh(tEnd, rh)); lt.push(rh === 100 ? 'Saturation 100%' : rh + '%');
  }
  traces.push({ x: lx, y: ly, mode: 'text', type: 'scatter', text: lt, textposition: 'top left', textfont: { size: 12, color: 'navy' }, hoverinfo: 'skip', showlegend: false });
  return traces;
}
const baseTraces = curveTraces();

// ---- Build the dynamic part of the chart for the current state ----
function buildData() {
  const W = wFromRh(T, RH), Td = dewPointF(T, RH);
  const traces = baseTraces.slice();
  // dashed guide lines: left to the saturation curve, and down to the axis
  traces.push({ x: [Td, T], y: [W, W], mode: 'lines', type: 'scatter', line: { color: 'dimgray', width: 2, dash: 'dash' }, hoverinfo: 'skip', showlegend: false });
  traces.push({ x: [T, T], y: [0, W], mode: 'lines', type: 'scatter', line: { color: 'dimgray', width: 2, dash: 'dash' }, hoverinfo: 'skip', showlegend: false });
  // dew point marker on the saturation curve
  traces.push({
    x: [Td], y: [W], mode: 'markers+text', type: 'scatter', marker: { symbol: 'diamond', size: 11, color: 'darkblue', line: { color: 'white', width: 1 } },
    text: ['Dew point ' + Td.toFixed(0) + '°F'], textposition: 'top left', textfont: { size: 13, color: 'darkblue' },
    hovertemplate: 'Dew point ' + Td.toFixed(1) + '°F<extra></extra>', showlegend: false
  });
  // wall surface test marker
  if ($('surfOn').checked) {
    const S = +$('surf').value, cond = S <= Td;
    const col = cond ? 'red' : 'steelblue';
    const label = cond ? 'Condensation' : 'No condensation';
    traces.push({
      x: [S, S], y: [0, plotMax() * 0.96], mode: 'lines+text', type: 'scatter', line: { color: col, width: 4 },
      text: ['', label + ' (' + S + '°F)'], textposition: S < 45 ? 'middle right' : 'middle left', textfont: { size: 14, color: col },
      hovertemplate: 'Wall surface ' + S + '°F<extra></extra>', showlegend: false
    });
  }
  // the state point
  traces.push({
    x: [T], y: [W], mode: 'markers', type: 'scatter', marker: { size: 18, color: 'orange', line: { color: 'black', width: 2 } },
    hovertemplate: 'State point<br>' + T.toFixed(0) + '°F, RH ' + RH.toFixed(0) + '%<br>humidity ratio ' + W.toFixed(4) + '<extra></extra>', showlegend: false
  });
  return traces;
}

function plotMax() { return Math.max(Y_MAX, wFromRh(T, RH) * 1.12); }

const layout = {
  margin: { l: 66, r: 12, t: 8, b: 48 },
  xaxis: { title: { text: 'Dry-bulb temperature (°F)', font: { size: 14 } }, range: [T_MIN, T_MAX], dtick: 20, gridcolor: '#e5e5e5', zeroline: false, tickfont: { size: 13 }, fixedrange: true },
  yaxis: { title: { text: 'Humidity ratio (lb water per lb dry air)', font: { size: 13 } }, range: [0, Y_MAX], tickformat: '.3f', dtick: 0.005, gridcolor: '#e5e5e5', zeroline: false, tickfont: { size: 13 }, fixedrange: true },
  hovermode: 'closest', dragmode: false, showlegend: false, paper_bgcolor: 'white', plot_bgcolor: 'white', font: { family: 'Arial, Helvetica, sans-serif' }
};
const config = { displayModeBar: false, responsive: true, scrollZoom: false };

// ---- Redraw everything from the state ----
function update(msg) {
  if (msg !== undefined) message = msg;
  $('temp').value = T; $('tempVal').textContent = Math.round(T);
  $('rh').value = Math.max(1, Math.min(100, RH)); $('rhVal').textContent = RH < 10 ? RH.toFixed(1) : Math.round(RH);
  $('surfVal').textContent = $('surf').value;
  $('surf').disabled = !$('surfOn').checked;
  layout.yaxis.range = [0, plotMax()];
  Plotly.react(plot, buildData(), layout, config);
  const W = wFromRh(T, RH), Td = dewPointF(T, RH);
  let html = '<div class="state">Air ' + Math.round(T) + '°F | humidity ratio ' + W.toFixed(4) + ' lb/lb | RH ' + (RH < 10 ? RH.toFixed(1) : Math.round(RH)) + '% | dew point ' + Math.round(Td) + '°F</div>';
  if ($('surfOn').checked) {
    const S = +$('surf').value;
    if (S <= Td) html += '<div class="surface"><span class="cond-yes">Condensation:</span> the ' + S + '°F surface is ' + (S < Td - 0.05 ? 'below' : 'at') + ' the ' + Math.round(Td) + '°F dew point' + (S < 32 ? ', so the moisture forms frost.' : '.') + '</div>';
    else html += '<div class="surface"><span class="cond-no">No condensation:</span> the ' + S + '°F surface is above the ' + Math.round(Td) + '°F dew point.</div>';
  }
  html += '<div class="note">' + message + '</div>';
  $('readout').innerHTML = html;
}

// ---- Controls ----
$('temp').addEventListener('input', e => { T = +e.target.value; update('Air temperature changed with relative humidity held at ' + Math.round(RH) + '%.'); });
$('rh').addEventListener('input', e => { RH = +e.target.value; update('Relative humidity changed: the dew point moved, so the air holds ' + (RH > 50 ? 'more' : 'less') + ' vapor.'); });
$('surfOn').addEventListener('change', () => update());
$('surf').addEventListener('input', () => update());

// warming or cooling a sealed parcel keeps its humidity ratio, so RH changes
function shift(dT) {
  const w0 = wFromRh(T, RH), rh0 = RH, t0 = T;
  const t1 = Math.max(T_MIN, Math.min(T_MAX, T + dT));
  let rh1 = rhFromW(t1, w0);
  let msg;
  if (dT > 0) {
    msg = 'Warmed from ' + t0 + '°F to ' + t1 + '°F with no moisture added: the humidity ratio and dew point stay the same, and RH fell from ' + Math.round(rh0) + '% to ' + Math.round(rh1) + '%, roughly half.';
  } else if (rh1 >= 100) {
    rh1 = 100;
    msg = 'Cooled below the dew point: the air is saturated at ' + t1 + '°F, so the extra vapor condenses. The dot stays on the saturation line and the dew point drops.';
  } else {
    msg = 'Cooled from ' + t0 + '°F to ' + t1 + '°F with no moisture added: the dew point stays the same, and RH rose from ' + Math.round(rh0) + '% to ' + Math.round(rh1) + '%, roughly double.';
  }
  T = t1; RH = Math.max(0.5, rh1);
  update(msg);
}
$('warm').addEventListener('click', () => shift(20));
$('cool').addEventListener('click', () => shift(-20));

// ---- Dragging the state point: x sets the temperature, y sets the humidity ratio ----
function dataFromEvent(e) {
  const fl = plot._fullLayout, r = plot.getBoundingClientRect();
  return { px: e.clientX - r.left, py: e.clientY - r.top, x: fl.xaxis.p2d(e.clientX - r.left - fl.xaxis._offset), y: fl.yaxis.p2d(e.clientY - r.top - fl.yaxis._offset) };
}
function dotPixel() {
  const fl = plot._fullLayout;
  return { x: fl.xaxis.d2p(T) + fl.xaxis._offset, y: fl.yaxis.d2p(wFromRh(T, RH)) + fl.yaxis._offset };
}
plot.addEventListener('pointerdown', e => {
  if (!plot._fullLayout) return;
  const d = dataFromEvent(e), dot = dotPixel();
  if (Math.hypot(d.px - dot.x, d.py - dot.y) <= 24) { dragging = true; plot.setPointerCapture(e.pointerId); e.preventDefault(); }
});
plot.addEventListener('pointermove', e => {
  if (!dragging) return;
  const d = dataFromEvent(e);
  T = Math.max(T_MIN, Math.min(T_MAX, d.x));
  const rh = rhFromW(T, Math.max(0, d.y));
  RH = Math.max(1, Math.min(100, rh));
  update('Dragging: slide the dot left along the dashed line to the saturation curve to read the dew point.');
});
['pointerup', 'pointercancel'].forEach(n => plot.addEventListener(n, () => { dragging = false; }));

update();
