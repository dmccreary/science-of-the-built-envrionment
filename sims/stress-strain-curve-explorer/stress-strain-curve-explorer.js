// Stress-Strain Curve Explorer MicroSim - Chart.js curves for steel (tension), concrete and softwood (compression) with a movable stress marker
// CANVAS_HEIGHT: 850
// Bloom Level 2 (Understand) + Level 4 (Analyze)
// MicroSim template version 2026.03

// ---- Data: simplified, illustrative curves. E, yield, and ultimate values follow Chapter 5. ----
const MATS = [
  { id: 'steel', name: 'Structural steel (A36), tension', short: 'Steel', color: 'dimgray',
    E: 29e6, yieldStress: 36000, eu: 0.16, su: 58000, ef: 0.20, sf: 47000,
    // steel: elastic line, yield plateau (eps 0.00124 to 0.015), strain hardening, then necking down to fracture
    stress(e) {
      const sy = 36000, sp = 36500, esh = 0.015;
      if (e <= sy / this.E) return this.E * e;
      if (e <= esh) return sy + (sp - sy) * (e - sy / this.E) / (esh - sy / this.E);
      if (e <= this.eu) return sp + (this.su - sp) * (1 - Math.pow((this.eu - e) / (this.eu - esh), 4));
      return this.su - (this.su - this.sf) * Math.pow((e - this.eu) / (this.ef - this.eu), 2);
    },
    names: ['Yield point', 'Ultimate strength', 'Fracture'],
    notes: ['Elastic range ends. Strain jumps along the plateau with almost no extra stress.', 'Highest stress reached. After this the bar necks and the stress falls.', 'The bar breaks after stretching about 20 percent: a ductile failure with warning.'],
    full: { x: 0.21, y: 65000 }, zoom: { x: 0.004, y: 45000 }, step: 100, start: 18100,
    start_note: 'The slider starts at the Riverbend hanger rod: 18,100 psi (Chapter 5), a factor of safety of about 2.0 against yield.',
    failure: 'Ductile', load: 'Tension' },
  { id: 'concrete', name: 'Concrete (4,000 psi), compression', short: 'Concrete', color: 'rgb(190,155,100)',
    E: 3.6e6, yieldStress: 1800, eu: 0.002222, su: 4000, ef: 0.0038, sf: 3400,
    // concrete: parabola to the peak f'c (initial slope = E), then a linear softening branch to crushing
    stress(e) {
      if (e <= this.eu) { const x = e / this.eu; return this.su * (2 * x - x * x); }
      return this.su - (this.su - this.sf) * (e - this.eu) / (this.ef - this.eu);
    },
    names: ['Elastic limit (about 0.45 f′c)', 'Ultimate strength (peak, f′c)', 'Crushing'],
    notes: ['The curve begins to bend; concrete has no sharp yield point.', 'Peak compressive strength, f′c, the value on the concrete order.', 'The concrete crushes at a small strain with little warning: a brittle failure.'],
    full: { x: 0.0042, y: 4800 }, zoom: { x: 0.0012, y: 2500 }, step: 25, start: 417,
    start_note: 'The slider starts at the 12 in Riverbend column’s working stress: 417 psi (Chapter 5), about 10 percent of f′c.',
    failure: 'Brittle', load: 'Compression' },
  { id: 'wood', name: 'Softwood, compression parallel to grain', short: 'Wood', color: 'saddlebrown',
    E: 1.5e6, yieldStress: 3500, eu: 0.0045, su: 5000, ef: 0.0055, sf: 4000,
    // wood: nearly straight to the proportional limit, a gentle curve to the peak, then fibers buckle (crush)
    stress(e) {
      const ep = 3500 / this.E;
      if (e <= ep) return this.E * e;
      if (e <= this.eu) return 3500 + (this.su - 3500) * (1 - Math.pow((this.eu - e) / (this.eu - ep), 2));
      return this.su - (this.su - this.sf) * Math.pow((e - this.eu) / (this.ef - this.eu), 2);
    },
    names: ['Proportional limit (elastic limit)', 'Ultimate strength (crushing)', 'Crushing failure'],
    notes: ['The nearly straight line ends. Clear-wood strength is far above design values.', 'Highest stress before the fibers buckle.', 'The fibers buckle and crush: fairly brittle, with little warning.'],
    full: { x: 0.0062, y: 5800 }, zoom: { x: 0.0030, y: 4200 }, step: 25, start: 1500,
    start_note: 'The slider starts at the illustrative design-level stress of 1,500 psi. Design values sit well below clear-wood crushing strength.',
    failure: 'Brittle', load: 'Compression' }
];

// ---- State ----
let matIdx = 0, showArea = false, compare = false, zoom = false;
let chart = null;
// marker: current stress/strain; rel = unloading animation (null when idle); done = result message after a release
let marker = { sig: 0, eps: 0 }, rel = null, done = null, rafId = null;

const fmtInt = v => Math.round(v).toLocaleString('en-US');
const fmtStrain = v => v === 0 ? '0' : (v < 0.01 ? Number(v.toPrecision(3)).toString() : v.toFixed(3));
const cur = () => MATS[matIdx];

// strain on the loading branch for a given stress (the stress rises monotonically up to the ultimate point)
function strainAt(m, s) {
  let lo = 0, hi = m.eu;
  for (let i = 0; i < 60; i++) { const mid = (lo + hi) / 2; if (m.stress(mid) < s) lo = mid; else hi = mid; }
  return hi;
}
// toughness = area under the whole curve, in in-lb per cubic inch (trapezoid rule)
function toughness(m) {
  let a = 0, n = 4000, dx = m.ef / n;
  for (let i = 0; i < n; i++) a += (m.stress(i * dx) + m.stress((i + 1) * dx)) / 2 * dx;
  return a;
}
MATS.forEach(m => { m.ey = strainAt(m, m.yieldStress); m.tough = toughness(m); });

function curvePoints(m) {
  const set = new Set([0, m.ey, m.eu, m.ef, 0.015]);
  for (let i = 0; i <= 240; i++) set.add(m.ef * i / 240);
  for (let i = 0; i <= 40; i++) set.add(Math.min(m.ef, 0.004) * i / 40);
  return [...set].filter(e => e <= m.ef).sort((a, b) => a - b).map(e => ({ x: e, y: m.stress(e) }));
}
function keyPoints(m) {
  return [{ x: m.ey, y: m.yieldStress }, { x: m.eu, y: m.su }, { x: m.ef, y: m.sf }];
}

// axis limits for the current view
function view() {
  if (compare) return zoom ? { x: 0.006, y: 7000 } : { x: 0.21, y: 65000 };
  return zoom ? cur().zoom : cur().full;
}

// ---- Plugin 1: elastic (green) and plastic (orange) bands behind the curves ----
const bands = {
  id: 'bands',
  beforeDatasetsDraw(c) {
    if (compare) return;
    const m = cur(), ca = c.chartArea, xs = c.scales.x;
    const x0 = xs.getPixelForValue(0), x1 = Math.min(ca.right, xs.getPixelForValue(m.ey)), x2 = Math.min(ca.right, xs.getPixelForValue(m.ef));
    const ctx = c.ctx;
    ctx.save();
    ctx.fillStyle = 'rgba(60,160,90,0.22)';
    ctx.fillRect(x0, ca.top, x1 - x0, ca.bottom - ca.top);
    ctx.fillStyle = 'rgba(255,140,0,0.16)';
    ctx.fillRect(x1, ca.top, x2 - x1, ca.bottom - ca.top);
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = 'darkgreen';
    ctx.textAlign = 'left';
    const el = x1 - x0 < 60 ? 'Elastic ◄' : 'Elastic';
    const elW = ctx.measureText(el).width;
    ctx.fillText(el, x0 + 8, ca.bottom - 8);
    ctx.fillStyle = 'rgb(180,80,0)';
    ctx.textAlign = 'center';
    const px = Math.max((x1 + x2) / 2, x0 + elW + 70);
    if (px + 40 < ca.right) ctx.fillText('Plastic range', px, ca.bottom - 8);
    ctx.restore();
  }
};

// ---- Plugin 2: point tags, the applied-stress marker, the unloading path ----
const overlay = {
  id: 'overlay',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, ca = c.chartArea, xs = c.scales.x, ys = c.scales.y, m = cur();
    const inside = (px, py) => px >= ca.left - 1 && px <= ca.right + 1 && py >= ca.top - 1 && py <= ca.bottom + 1;
    ctx.save();
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'middle';
    // tags beside the key points of the selected material
    const tagText = ['Yield ' + fmtInt(m.yieldStress) + ' psi', 'Ultimate ' + fmtInt(m.su) + ' psi', 'Fracture'];
    if (m.id !== 'steel') tagText[0] = 'Elastic limit ' + fmtInt(m.yieldStress) + ' psi';
    if (m.id === 'concrete') { tagText[1] = 'Peak ' + fmtInt(m.su) + ' psi'; tagText[2] = 'Crushing'; }
    if (m.id === 'wood') { tagText[1] = 'Peak ' + fmtInt(m.su) + ' psi'; tagText[2] = 'Crushing'; }
    keyPoints(m).forEach((p, i) => {
      const px = xs.getPixelForValue(p.x), py = ys.getPixelForValue(p.y);
      if (!inside(px, py)) return;
      const w = ctx.measureText(tagText[i]).width + 8;
      let tx, ty;
      if (i === 0) { tx = px + 8; ty = py + 16; }
      else if (i === 1) { tx = px - w / 2; ty = py - 16; }
      else { tx = px - w - 8; ty = py + 16; }
      tx = Math.max(ca.left + 2, Math.min(tx, ca.right - w - 2));
      ctx.fillStyle = 'rgba(255,255,255,0.88)';
      ctx.fillRect(tx, ty - 9, w, 18);
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      ctx.fillText(tagText[i], tx + 4, ty);
    });
    // unloading path and the permanent set
    if (rel || done) {
      const r = rel || done;
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = 'navy';
      ctx.lineWidth = 2;
      if (r.plastic) {
        ctx.beginPath();
        ctx.moveTo(xs.getPixelForValue(r.epsA), ys.getPixelForValue(r.sigA));
        ctx.lineTo(xs.getPixelForValue(r.epsP), ys.getPixelForValue(0));
        ctx.stroke();
        const sx = xs.getPixelForValue(r.epsP), sy = ys.getPixelForValue(0);
        if (inside(sx, sy)) {
          ctx.setLineDash([]);
          ctx.fillStyle = 'navy';
          ctx.fillRect(sx - 5, sy - 5, 10, 10);
          ctx.fillStyle = 'black';
          ctx.textAlign = 'left';
          ctx.fillText('Permanent strain ' + fmtStrain(r.epsP), Math.min(sx + 10, ca.right - 190), sy - 22);
        }
      }
      ctx.setLineDash([]);
    }
    // the marker with drop lines to both axes
    const mx = xs.getPixelForValue(marker.eps), my = ys.getPixelForValue(marker.sig);
    if (inside(mx, my)) {
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(0,0,0,0.55)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ca.left, my); ctx.lineTo(mx, my); ctx.lineTo(mx, ca.bottom);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.arc(mx, my, 8, 0, 2 * Math.PI);
      ctx.fillStyle = 'gold';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'black';
      ctx.stroke();
    } else if (marker.sig > 0) {
      ctx.fillStyle = 'rgb(180,80,0)';
      ctx.textAlign = 'left';
      ctx.fillText('The marker is off the chart at this zoom (' + fmtInt(marker.sig) + ' psi). Change the zoom to see it.', ca.left + 8, ca.top + 14);
    }
    ctx.restore();
  }
};

// ---- Build (or rebuild) the chart for the current choices ----
function buildChart() {
  const v = view();
  if (chart) chart.destroy();
  const shown = compare ? MATS : [cur()];
  const datasets = [];
  shown.forEach(m => {
    const isSel = m.id === cur().id;
    datasets.push({
      label: m.short + ' (' + m.load.toLowerCase() + ')', data: curvePoints(m), borderColor: m.color, borderWidth: isSel ? 4 : 3,
      pointRadius: 0, pointHoverRadius: 0, pointHitRadius: 0, tension: 0,
      fill: showArea && isSel ? 'origin' : false, backgroundColor: 'rgba(70,130,180,0.30)', isKey: false
    });
    datasets.push({
      label: m.short + ' key points', data: keyPoints(m), showLine: false, isKey: true, mat: m,
      pointStyle: ['circle', 'triangle', 'rect'], pointRadius: 7, pointHoverRadius: 9, pointHitRadius: 12,
      backgroundColor: 'white', borderColor: m.color === 'rgb(190,155,100)' ? 'rgb(140,105,55)' : m.color, borderWidth: 3
    });
  });
  chart = new Chart(document.getElementById('ssChart'), {
    type: 'line',
    data: { datasets },
    plugins: [bands, overlay],
    options: {
      responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
      interaction: { mode: 'nearest', intersect: true },
      onHover: (e, els, c) => { c.canvas.style.cursor = els.length ? 'pointer' : 'default'; },
      scales: {
        x: { type: 'linear', min: 0, max: v.x,
          title: { display: true, text: 'Strain, ε (in./in.)', font: { size: 14 } },
          ticks: { font: { size: 13 }, maxTicksLimit: 8, callback: t => Number(t.toPrecision(3)) },
          grid: { color: 'rgb(220,220,220)' } },
        y: { type: 'linear', min: 0, max: v.y,
          title: { display: true, text: 'Stress, σ (psi)', font: { size: 14 } },
          ticks: { font: { size: 13 }, maxTicksLimit: 8, callback: t => fmtInt(t) },
          grid: { color: 'rgb(220,220,220)' } }
      },
      plugins: {
        legend: { display: compare, position: 'top', labels: { font: { size: 13 }, filter: it => !it.text.endsWith('key points'), boxWidth: 18 } },
        title: { display: true, color: 'black', font: { size: 17, weight: 'bold' }, padding: { top: 2, bottom: 4 },
          text: compare ? 'Stress-strain curves compared (illustrative)' : 'Stress-strain curve: ' + cur().name },
        tooltip: {
          filter: item => item.dataset.isKey,
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => { const m = items[0].dataset.mat; return m.short + ': ' + m.names[items[0].dataIndex]; },
            label: item => ['Stress: ' + fmtInt(item.parsed.y) + ' psi', 'Strain: ' + fmtStrain(item.parsed.x) + ' in./in. (' + (item.parsed.x * 100).toPrecision(2) + ' %)'],
            afterLabel: item => wrap(item.dataset.mat.notes[item.dataIndex], 44)
          }
        }
      }
    }
  });
  chart.canvas.setAttribute('aria-label', (compare ? 'Stress-strain curves of steel, concrete, and wood. ' : 'Stress-strain curve of ' + cur().name + '. ') +
    'Markers show the yield point, the ultimate strength, and the fracture point. A gold circle marks the applied stress.');
}

function wrap(s, n) {
  const lines = []; let line = '';
  s.split(' ').forEach(w => { if ((line + ' ' + w).trim().length > n) { lines.push(line); line = w; } else line = (line + ' ' + w).trim(); });
  if (line) lines.push(line);
  return lines;
}

// ---- Caption under the chart ----
function renderCaption() {
  const m = cur();
  let h = compare
    ? 'All three curves at one scale. The gold circle marks the applied stress on the selected material (' + m.short + '). Steel stretches roughly 40 to 50 times as far as the brittle materials, so check <b>Zoom</b> to compare their stiffness.'
    : 'Green: <b>elastic range</b> (springs back). Orange: <b>plastic range</b> (permanent deformation). Gold circle: applied-stress marker.';
  if (showArea) {
    h += '<br><b>Shaded area = toughness</b>, the energy absorbed per cubic inch before fracture: ' + m.short.toLowerCase() + ' ≈ <b>' + fmtInt(m.tough) + ' in·lb/in³</b>' +
      (m.id === 'steel' ? ', about ' + fmtInt(m.tough / MATS[1].tough) + ' times the concrete curve, because the steel stretches so far.' : '.');
  }
  document.getElementById('caption').innerHTML = h;
}

// ---- Readout and data table ----
function renderReadout() {
  const m = cur(), s = marker.sig, e = marker.eps;
  const plastic = s > m.yieldStress;
  const fsY = s > 0 ? m.yieldStress / s : null, fsU = s > 0 ? m.su / s : null;
  let h = '<h3>' + m.short + ' readout</h3><div class="stats">';
  h += '<div class="stat"><span>Stress σ</span><b>' + fmtInt(s) + ' psi</b></div>';
  h += '<div class="stat"><span>Strain ε</span><b>' + fmtStrain(e) + ' in./in.</b><span>' + (e * 100 < 0.1 ? (e * 100).toPrecision(2) : (e * 100).toFixed(2)) + ' %</span></div>';
  h += '<div class="stat"><span>Factor of safety, yield' + (m.id === 'steel' ? '' : ' (elastic limit)') + '</span><b>' + (fsY ? fsY.toFixed(fsY < 10 ? 2 : 1) : 'no load') + '</b>' + (fsY && fsY < 1 ? '<span>below 1.0: yielded</span>' : '') + '</div>';
  h += '<div class="stat"><span>Factor of safety, ultimate</span><b>' + (fsU ? fsU.toFixed(fsU < 10 ? 2 : 1) : 'no load') + '</b></div></div>';
  if (done && !rel && s === 0) {
    h += '<div class="state ' + (done.plastic ? 'plastic' : 'elastic') + '">' + (done.plastic ? 'Plastic: permanent strain remains after release' : 'Elastic: strain returned to zero after release') + '</div>';
    h += '<div class="msg">' + done.msg + '</div>';
  } else if (s > 0) {
    h += '<div class="state ' + (plastic ? 'plastic' : 'elastic') + '">' + (plastic ? 'Plastic: stress is above the ' + (m.id === 'steel' ? 'yield strength' : 'elastic limit') : 'Elastic: stress is below the ' + (m.id === 'steel' ? 'yield strength' : 'elastic limit')) + '</div>';
    const ep = e - s / m.E;
    h += '<div class="msg">' + (plastic ? 'If released now, the specimen would keep a permanent strain of ' + fmtStrain(ep) + ' (a 10 ft member would stay ' + (ep * 120).toFixed(ep * 120 < 0.1 ? 3 : 2) + ' in. ' + (m.load === 'Tension' ? 'longer' : 'shorter') + ').' : 'If released now, the strain returns to zero along the same line. Stiffness E = σ/ε = ' + fmtInt(m.E) + ' psi.') + '</div>';
  } else {
    h += '<div class="state">No load: drag the slider to apply stress</div><div class="msg">' + m.start_note + '</div>';
  }
  document.getElementById('readout').innerHTML = h;
}

function renderTable() {
  const row = (label, f) => '<tr><th>' + label + '</th>' + MATS.map((m, i) => '<td' + (!compare && i === matIdx ? ' class="sel"' : '') + '>' + f(m) + '</td>').join('') + '</tr>';
  let h = '<table><tr><th>' + (compare ? 'All three' : 'Selected: ' + cur().short) + '</th>' +
    MATS.map((m, i) => '<th' + (!compare && i === matIdx ? ' class="sel"' : '') + '>' + m.short + ' (' + m.load.toLowerCase() + ')</th>').join('') + '</tr>';
  h += row('Stiffness E (psi)', m => fmtInt(m.E));
  h += row('Yield / elastic limit (psi)', m => fmtInt(m.yieldStress));
  h += row('Ultimate strength (psi)', m => fmtInt(m.su));
  h += row('Failure strain', m => fmtStrain(m.ef));
  h += row('Failure type', m => m.failure);
  h += row('Toughness (in·lb/in³)', m => fmtInt(m.tough));
  h += '</table><div class="foot">Simplified, illustrative curves. Concrete has no true yield point, so 0.45 f′c is used. Wood values are clear-wood crushing strength, well above design values.</div>';
  document.getElementById('tableWrap').innerHTML = h;
}

// ---- Slider, release animation, controls ----
function setSlider() {
  const m = cur(), sl = document.getElementById('stressSlider');
  sl.max = m.su; sl.step = m.step;
}
function updateSliderText() {
  const sl = document.getElementById('stressSlider');
  document.getElementById('stressText').textContent = 'Applied stress: ' + fmtInt(+sl.value) + ' psi';
}
function resetMarker(sig) {
  stopAnim();
  done = null;
  const m = cur(), sl = document.getElementById('stressSlider');
  sl.value = sig;
  marker = { sig: +sl.value, eps: strainAt(m, +sl.value) };
  if (marker.sig === 0) marker.eps = 0;
  updateSliderText();
}
function stopAnim() { if (rafId) cancelAnimationFrame(rafId); rafId = null; rel = null; }

function onSlide() {
  stopAnim();
  done = null;
  const m = cur(), v = +document.getElementById('stressSlider').value;
  marker = { sig: v, eps: v === 0 ? 0 : strainAt(m, v) };
  updateSliderText();
  chart.draw();
  renderReadout();
}

// release: unload along the curve (elastic) or along a line parallel to the elastic line (plastic), then show the permanent strain
function releaseLoad() {
  const m = cur();
  if (marker.sig <= 0 || rel) return;
  const plastic = marker.sig > m.yieldStress;
  const epsP = plastic ? marker.eps - marker.sig / m.E : 0;
  const r = { sigA: marker.sig, epsA: marker.eps, epsP, plastic, t0: performance.now() };
  rel = r; done = null;
  const step = now => {
    const t = Math.min(1, (now - r.t0) / 1300);
    marker.sig = r.sigA * (1 - t);
    marker.eps = plastic ? epsP + marker.sig / m.E : (marker.sig > 0 ? strainAt(m, marker.sig) : 0);
    chart.draw();
    document.getElementById('stressSlider').value = marker.sig;
    updateSliderText();
    if (t < 1) { rafId = requestAnimationFrame(step); return; }
    rafId = null; rel = null;
    marker = { sig: 0, eps: epsP };
    const inches = (epsP * 120);
    done = { sigA: r.sigA, epsA: r.epsA, epsP, plastic,
      msg: plastic ? 'Released from ' + fmtInt(r.sigA) + ' psi. The unloading line runs parallel to the elastic line, so a permanent strain of ' + fmtStrain(epsP) + ' remains (a 10 ft member would stay ' + inches.toFixed(inches < 0.1 ? 3 : 2) + ' in. ' + (m.load === 'Tension' ? 'longer' : 'shorter') + ').'
        : 'Released from ' + fmtInt(r.sigA) + ' psi, below the elastic limit. The marker ran back down the curve to zero strain: no permanent change.' };
    document.getElementById('stressSlider').value = 0;
    updateSliderText();
    chart.draw();
    renderReadout();
  };
  rafId = requestAnimationFrame(step);
  renderReadout();
}

function refresh(sig) {
  setSlider();
  resetMarker(sig === undefined ? cur().start : sig);
  buildChart();
  renderCaption();
  renderReadout();
  renderTable();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('input[name=mat]').forEach(r => r.addEventListener('change', e => {
    matIdx = MATS.findIndex(m => m.id === e.target.value);
    refresh();
  }));
  document.getElementById('areaToggle').addEventListener('change', e => { showArea = e.target.checked; buildChart(); renderCaption(); });
  document.getElementById('compareToggle').addEventListener('change', e => { compare = e.target.checked; buildChart(); renderCaption(); renderTable(); });
  document.getElementById('zoomToggle').addEventListener('change', e => { zoom = e.target.checked; buildChart(); });
  const sl = document.getElementById('stressSlider');
  sl.addEventListener('input', onSlide);
  // releasing the mouse or finger on the slider unloads the specimen; keyboard users press the button
  sl.addEventListener('pointerup', releaseLoad);
  document.getElementById('releaseBtn').addEventListener('click', releaseLoad);
  refresh();
});
