// Wood Moisture and Shrinkage Calculator MicroSim - Chart.js line chart of across-grain size vs. moisture content, with shrinkage in inches and a "weigh a sample" calculation
// CANVAS_HEIGHT: 712
// Bloom Level 2 (Understand) + Level 3 (Apply)
// MicroSim template version 2026.03

// ---- Data: values follow Chapter 7. The shrinkage coefficient is illustrative. ----
const FSP = 28;      // fiber saturation point, percent MC (book: roughly 28 to 30)
const COEF = 0.2;    // across-grain shrinkage, percent of depth per point of MC below the FSP (illustrative)
const DECAY = 20;    // sustained MC above this can allow decay fungi
const MEMBERS = [
  { label: '2×4 (3.5 in. actual)', depth: 3.5 },
  { label: '2×6 (5.5 in. actual)', depth: 5.5 },
  { label: '2×8 (7.25 in. actual)', depth: 7.25 },
  { label: '2×10 (9.25 in. actual)', depth: 9.25 },
  { label: '2×12 (11.25 in. actual)', depth: 11.25 },
  { label: 'Stack of three floor levels (3 × 13.75 in. = 41.25 in.)', depth: 41.25 }
];

// ---- State ----
let chart = null;
let startMC = 19, finalMC = 9, memberIdx = 5;
let sampleOpen = false;

const $ = id => document.getElementById(id);
const relDim = mc => 100 - COEF * (FSP - Math.min(mc, FSP));        // size as percent of the size at the FSP
const round2 = v => (Math.round(v * 100 + 1e-9) / 100).toFixed(2);
const sixteenths = inches => {
  const n = Math.round(Math.abs(inches) * 16);
  if (n === 0) return 'less than 1/16 in.';
  if (n % 16 === 0) return (n / 16) + ' in.';
  const whole = Math.floor(n / 16), rem = n % 16;
  let a = rem, b = 16;
  while (a % 2 === 0 && b % 2 === 0) { a /= 2; b /= 2; }
  return (whole ? whole + ' ' : '') + a + '/' + b + ' in.';
};

// decay-risk status in words (never color alone)
function statusOf(mc) {
  if (mc > FSP) return { cls: 'risk', text: 'above fiber saturation (' + FSP + '%), free water in the cavities: decay risk, no size change.' };
  if (mc > DECAY) return { cls: 'risk', text: 'decay risk (above ' + DECAY + '%): fungi can grow if it stays this wet.' };
  return { cls: 'ok', text: 'low decay risk (' + DECAY + '% or less).' };
}

// shrinkage for the current choices
function calc() {
  const pts = Math.min(startMC, FSP) - Math.min(finalMC, FSP);   // only the change below the FSP moves the wood
  const pct = COEF * pts;
  const depth = MEMBERS[memberIdx].depth;
  return { pts, pct, depth, inches: depth * pct / 100 };
}

// ---- Plugin 1: colored moisture zones behind the line, with text labels ----
function wrapLines(ctx, text, maxW) {
  const out = []; let line = '';
  text.split(' ').forEach(w => {
    const t = line ? line + ' ' + w : w;
    if (ctx.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
  });
  if (line) out.push(line);
  return out;
}
const zones = {
  id: 'zones',
  beforeDatasetsDraw(c) {
    const ctx = c.ctx, ca = c.chartArea, xs = c.scales.x;
    const x0 = xs.getPixelForValue(0), x20 = xs.getPixelForValue(DECAY), x28 = xs.getPixelForValue(FSP), x30 = xs.getPixelForValue(30);
    ctx.save();
    ctx.fillStyle = 'rgba(60,160,90,0.22)';  ctx.fillRect(x0, ca.top, x20 - x0, ca.bottom - ca.top);
    ctx.fillStyle = 'rgba(255,140,0,0.22)';  ctx.fillRect(x20, ca.top, x28 - x20, ca.bottom - ca.top);
    ctx.fillStyle = 'rgba(128,128,128,0.30)'; ctx.fillRect(x28, ca.top, x30 - x28, ca.bottom - ca.top);
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'alphabetic';
    // green zone label, top left of the zone (above the line)
    ctx.fillStyle = 'darkgreen'; ctx.textAlign = 'left';
    ctx.fillText('Dry: 20% or less', x0 + 30, ca.top + 16);
    // orange zone label
    ctx.fillStyle = 'rgb(160,70,0)'; ctx.textAlign = 'center';
    wrapLines(ctx, 'Decay risk above 20%', x28 - x20 - 6).reverse().forEach((l, i) => ctx.fillText(l, (x20 + x28) / 2, ca.bottom - 8 - i * 15));
    // gray zone label, rotated
    ctx.fillStyle = 'dimgray'; ctx.font = 'bold 12px Arial, Helvetica, sans-serif';
    ctx.translate((x28 + x30) / 2 + 4, ca.bottom - 8); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'left';
    ctx.fillText('Above fiber saturation', 0, 0);
    ctx.restore();
  }
};

// ---- Plugin 2: drop lines, the shrinkage bracket, and tags on the two markers ----
const overlay = {
  id: 'overlay',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, ca = c.chartArea, xs = c.scales.x, ys = c.scales.y;
    const sx = xs.getPixelForValue(startMC), sy = ys.getPixelForValue(relDim(startMC));
    const fx = xs.getPixelForValue(finalMC), fy = ys.getPixelForValue(relDim(finalMC));
    ctx.save();
    ctx.setLineDash([4, 3]); ctx.lineWidth = 1; ctx.strokeStyle = 'rgba(0,0,0,0.55)';
    [[sx, sy], [fx, fy]].forEach(p => {
      ctx.beginPath(); ctx.moveTo(ca.left, p[1]); ctx.lineTo(p[0], p[1]); ctx.lineTo(p[0], ca.bottom); ctx.stroke();
    });
    ctx.setLineDash([]);
    const r = calc();
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.textBaseline = 'middle';
    // bracket on the left showing the shrinkage in percent
    if (Math.abs(sy - fy) > 3) {
      const bx = ca.left + 12;
      ctx.strokeStyle = 'navy'; ctx.fillStyle = 'navy'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx, sy); ctx.lineTo(bx, fy); ctx.stroke();
      const dir = fy > sy ? 1 : -1;
      [[sy, -dir], [fy, dir]].forEach(a => { ctx.beginPath(); ctx.moveTo(bx, a[0]); ctx.lineTo(bx - 4, a[0] + a[1] * 7); ctx.lineTo(bx + 4, a[0] + a[1] * 7); ctx.closePath(); ctx.fill(); });
      const txt = (r.pct >= 0 ? '−' : '+') + Math.abs(r.pct).toFixed(1) + '% of depth';
      const w = ctx.measureText(txt).width + 8, ty = (sy + fy) / 2;
      ctx.fillStyle = 'rgba(255,255,255,0.9)'; ctx.fillRect(bx + 8, ty - 10, w, 20);
      ctx.fillStyle = 'navy'; ctx.textAlign = 'left'; ctx.fillText(txt, bx + 12, ty);
    }
    // tags
    const tag = (txt, px, py, above) => {
      const w = ctx.measureText(txt).width + 8;
      let tx = Math.max(ca.left + 2, Math.min(px - w / 2, ca.right - w - 2));
      const ty = above ? py - 22 : py + 22;
      ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fillRect(tx, ty - 10, w, 20);
      ctx.strokeStyle = 'gray'; ctx.lineWidth = 1; ctx.strokeRect(tx, ty - 10, w, 20);
      ctx.fillStyle = 'black'; ctx.textAlign = 'left'; ctx.fillText(txt, tx + 4, ty);
    };
    tag('Start ' + startMC + '%', sx, sy, true);
    tag('Final ' + finalMC + '%', fx, fy, false);
    ctx.restore();
  }
};

function buildChart() {
  const curve = [];
  for (let m = 0; m <= 30; m++) curve.push({ x: m, y: relDim(m) });
  const marker = (label, color, style, mc) => ({
    label, data: [{ x: mc, y: relDim(mc) }], showLine: false, clip: false, pointStyle: style, pointRadius: 9, pointHoverRadius: 11,
    pointBackgroundColor: color, pointBorderColor: 'black', pointBorderWidth: 2
  });
  chart = new Chart($('woodChart'), {
    type: 'line',
    data: { datasets: [
      { label: 'Across-grain size', data: curve, borderColor: 'saddlebrown', borderWidth: 4, pointRadius: 0, pointHoverRadius: 5, pointHitRadius: 6, tension: 0 },
      marker('Starting MC', 'white', 'circle', startMC),
      marker('Final MC', 'navy', 'rectRot', finalMC),
      Object.assign(marker('Sample MC', 'gold', 'star', 0), { pointRadius: 11, hidden: true })
    ] },
    plugins: [zones, overlay],
    options: {
      responsive: true, maintainAspectRatio: false, animation: false, parsing: false,
      layout: { padding: { right: 12, top: 4 } },
      interaction: { mode: 'nearest', intersect: true },
      scales: {
        x: { type: 'linear', min: 0, max: 30, title: { display: true, text: 'Moisture content, MC (% of oven-dry mass)', font: { size: 14 } },
          ticks: { font: { size: 13 }, stepSize: 5 }, grid: { color: 'rgb(220,220,220)' } },
        y: { type: 'linear', min: 94, max: 101.2, title: { display: true, text: 'Size (% of size at 28% MC)', font: { size: 13 } },
          ticks: { font: { size: 13 }, stepSize: 1, callback: v => v <= 100 ? v + '%' : '' }, grid: { color: 'rgb(220,220,220)' } }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, color: 'black', font: { size: 16, weight: 'bold' }, padding: { top: 2, bottom: 4 }, text: 'Across-grain size vs. moisture content (illustrative)' },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => items[0].dataset.label,
            label: item => ['MC: ' + (Math.round(item.parsed.x * 10) / 10) + '%', 'Size: ' + item.parsed.y.toFixed(1) + '% of the size at 28% MC'],
            afterLabel: item => item.datasetIndex === 0
              ? (item.parsed.x >= FSP ? 'Above fiber saturation: no size change.' : 'Each point of MC lost shrinks the size by ' + COEF + '%.')
              : statusOf(item.parsed.x).text
          }
        }
      }
    }
  });
}

// ---- Readout: the calculation step by step ----
function render() {
  const r = calc(), m = MEMBERS[memberIdx];
  $('startText').textContent = 'Starting MC (%): ' + startMC;
  $('finalText').textContent = 'Final MC (%): ' + finalMC;
  chart.data.datasets[1].data = [{ x: startMC, y: relDim(startMC) }];
  chart.data.datasets[2].data = [{ x: finalMC, y: relDim(finalMC) }];
  chart.update('none');
  chart.canvas.setAttribute('aria-label', 'Line chart: across-grain size falls from 100 percent at 28 percent moisture content to about 94.4 percent at 0, and is flat above 28. Starting MC ' + startMC + ' percent, final MC ' + finalMC + ' percent.');

  const s1 = statusOf(startMC), s2 = statusOf(finalMC);
  const swell = r.pts < 0;
  let h = '<h3>Calculation (' + COEF + '% per point, illustrative)</h3>';
  h += '<div class="state ' + s1.cls + '">Start ' + startMC + '%: ' + s1.text + '</div>';
  h += '<div class="state ' + s2.cls + '">Final ' + finalMC + '%: ' + s2.text + '</div>';
  h += '<ol class="steps">';
  h += '<li>Points of MC change below the ' + FSP + '% fiber saturation point: ' + Math.min(startMC, FSP) + ' − ' + Math.min(finalMC, FSP) + ' = <b>' + r.pts + '</b>' + (startMC > FSP ? ' (drying from ' + startMC + ' down to ' + FSP + '% changes nothing)' : '') + '</li>';
  h += '<li>' + (swell ? 'Swelling' : 'Shrinkage') + ' = ' + COEF + '% × ' + Math.abs(r.pts) + ' = <b>' + Math.abs(r.pct).toFixed(1) + '%</b> of the depth</li>';
  h += '<li>' + Math.abs(r.pct).toFixed(1) + '% × ' + m.depth + ' in. = <b>' + round2(Math.abs(r.inches)) + ' in.</b></li></ol>';
  if (r.pts === 0) {
    h += '<div class="big">No size change</div>';
  } else {
    h += '<div class="big">' + (swell ? 'Swells' : 'Shrinks') + ' ' + round2(Math.abs(r.inches)) + ' in. (about ' + sixteenths(r.inches) + ')</div>';
  }
  const note = memberIdx === 5 && startMC === 19 && finalMC === 9
    ? 'This is the Chapter 7 worked example: framing installed at 19% settles at 9% in a heated building.'
    : (finalMC <= 10 ? 'Heated Minnesota interiors in winter settle near 5 to 10% MC, so a member installed wetter keeps shrinking after the building is enclosed.' : 'Final MC above 10% is wetter than a heated Minnesota interior in winter, so more shrinkage may follow.');
  h += '<div class="foot">' + note + ' Shrinkage is mostly across the grain. Gray zone: above fiber saturation, wood does not change size.</div>';
  $('readout').innerHTML = h;
}

// ---- Weigh a sample ----
function renderSample() {
  const wet = parseFloat($('wetMass').value), dry = parseFloat($('dryMass').value);
  const out = $('sampleOut'), mk = chart.data.datasets[3];
  if (!(dry > 0) || !(wet >= dry)) {
    out.innerHTML = '<div class="state risk">Enter an oven-dry mass above 0 and a wet mass that is at least as large as the dry mass.</div>';
    mk.hidden = true; chart.update('none'); return;
  }
  const water = wet - dry, ratio = water / dry, mc = ratio * 100;
  const st = statusOf(mc);
  const f = v => Math.round(v * 1000) / 1000;
  let h = '<ol class="steps">';
  h += '<li>Water mass = wet − dry = ' + f(wet) + ' − ' + f(dry) + ' = <b>' + f(water) + ' g</b></li>';
  h += '<li>Divide by the oven-dry mass: ' + f(water) + ' ÷ ' + f(dry) + ' = <b>' + ratio.toFixed(3) + '</b></li>';
  h += '<li>Multiply by 100: MC = <b>' + mc.toFixed(1) + '%</b></li></ol>';
  h += '<div class="state ' + st.cls + '">' + st.text + '</div>';
  if (mc <= 30) {
    mk.data = [{ x: mc, y: relDim(mc) }]; mk.hidden = false;
    h += '<button id="useBtn" type="button">Use ' + mc.toFixed(1) + '% as the starting MC</button>';
  } else {
    mk.hidden = true;
    h += '<div class="foot">This MC is off the chart (above 30%).</div>';
  }
  h += '<div class="foot">MC is measured against the oven-dry mass, the stable reference. Gold star on the chart: this sample.</div>';
  out.innerHTML = h;
  chart.update('none');
  const btn = $('useBtn');
  if (btn) btn.addEventListener('click', () => {
    startMC = Math.max(10, Math.min(30, Math.round(mc)));
    $('startSlider').value = startMC;
    toggleSample(false);
    render();
  });
}

// the sample panel swaps places with the shrinkage readout so the page height never changes
function toggleSample(open) {
  sampleOpen = open;
  $('sample').hidden = !open;
  $('readout').hidden = open;
  $('weighBtn').setAttribute('aria-expanded', open);
  $('weighBtn').textContent = open ? 'Back to shrinkage' : 'Weigh a sample';
  if (open) renderSample(); else { chart.data.datasets[3].hidden = true; chart.update('none'); }
}

document.addEventListener('DOMContentLoaded', function () {
  MEMBERS.forEach((m, i) => { const o = document.createElement('option'); o.value = i; o.textContent = m.label; $('depthSelect').appendChild(o); });
  $('depthSelect').value = memberIdx;
  buildChart();
  $('startSlider').addEventListener('input', e => { startMC = +e.target.value; render(); });
  $('finalSlider').addEventListener('input', e => { finalMC = +e.target.value; render(); });
  $('depthSelect').addEventListener('change', e => { memberIdx = +e.target.value; render(); });
  $('winterBtn').addEventListener('click', () => { finalMC = 8; $('finalSlider').value = 8; render(); });
  $('weighBtn').addEventListener('click', () => toggleSample(!sampleOpen));
  ['wetMass', 'dryMass'].forEach(id => $(id).addEventListener('input', renderSample));
  render();
});
