// Building Material Property Comparison Chart MicroSim - Chart.js horizontal bar chart of six properties across seven building materials
// CANVAS_HEIGHT: 660
// Bloom Level 4 (Analyze)
// MicroSim template version 2026.03

// ---- Data: approximate, typical values (see the footnote); colors follow the material groups ----
const materials = [
  { name: 'Structural steel', color: 'gray',
    vals: { density: 490, comp: 36000, tens: 58000, mod: 29e6, exp: 6.5e-6, cond: 310 },
    notes: {
      density: 'Heavy, so steel members are made slim to limit dead load.',
      comp: 'Very high (yield strength), but slender steel members buckle before they reach it.',
      tens: 'Ultimate strength. Steel is as good in tension as in compression, and it stretches before it breaks.',
      mod: 'Very stiff: a steel beam deflects little for its size.',
      exp: 'A 100 ft steel member grows about 0.94 in over a 120°F swing.',
      cond: 'Conducts heat extremely well, so steel studs and beams are thermal bridges.' },
    uses: 'Beams, columns, hanger rods, decking, and reinforcing bars.',
    weakness: 'Loses about half its strength near 1,100°F, so it needs fire protection, and it rusts without protection.' },
  { name: 'Concrete (normal weight)', short: 'Concrete', color: 'tan',
    vals: { density: 150, comp: 4000, tens: 400, mod: 3.6e6, exp: 5.5e-6, cond: 10 },
    notes: {
      density: 'An 8 in slab weighs about 100 psf, a load the structure must carry.',
      comp: 'Moderate, but cheap: good for footings, columns, and walls in compression.',
      tens: 'Only about 10 percent of its compressive strength, so reinforcing bars carry the tension.',
      mod: 'About one eighth of steel: concrete members need more depth to limit deflection.',
      exp: 'Close to steel, which is why reinforced concrete works: the two expand together.',
      cond: 'Conducts heat readily, so exposed slab edges and concrete walls lose heat unless insulated.' },
    uses: 'Foundations, floor slabs, columns, and walls.',
    weakness: 'Weak in tension, so it cracks without reinforcing bars, and it shrinks as it dries.' },
  { name: 'Softwood lumber', short: 'Softwood', color: 'peru',
    vals: { density: 30, comp: 1500, tens: 500, mod: 1.5e6, exp: 3e-6, cond: 0.8 },
    notes: {
      density: 'About one sixteenth the weight of steel, so framing is easy to lift and loads the foundation little.',
      comp: 'About 1,500 psi along the grain (design level); much lower across the grain.',
      tens: 'Design level along the grain, illustrative; wood is strong with the grain and weak across it.',
      mod: 'About one twentieth of steel, so a wood floor can feel bouncy even when it is strong enough.',
      exp: 'Very small along the grain, but wood swells and shrinks with moisture instead.',
      cond: 'A moderate insulator: a stud conducts about three times as much heat as the batt beside it.' },
    uses: 'Light-frame walls, floors, and roofs, and glued-laminated beams.',
    weakness: 'Much weaker across the grain, decays when it stays wet, and burns, though large timbers char slowly.' },
  { name: 'Clay brick masonry', short: 'Brick masonry', color: 'burlywood',
    vals: { density: 120, comp: 2000, tens: 100, mod: 2e6, exp: 3.4e-6, cond: 5 },
    notes: {
      density: 'Heavy, so masonry walls are massive and need strong foundations.',
      comp: 'Fine for walls in compression; the strength depends on the brick and the mortar.',
      tens: 'Very low: masonry cracks easily when it is pulled or bent.',
      mod: 'Less stiff than concrete; masonry walls get their stiffness from their thickness.',
      exp: 'Brick expands little, but it is attached to materials that move more, so movement joints are needed.',
      cond: 'Conducts much more than insulation, so a masonry wall needs added insulation.' },
    uses: 'Cladding, veneer, and load-bearing walls.',
    weakness: 'Weak in tension, and it absorbs water, so freeze-thaw cycles can crack it.' },
  { name: 'Glass', color: 'lightblue',
    vals: { density: 156, comp: 145000, tens: 3000, mod: 10e6, exp: 5e-6, cond: 7 },
    notes: {
      density: 'About as heavy as concrete, so large panes need strong frames and careful handling.',
      comp: 'Very high in the laboratory, but glass fails in tension from surface flaws long before this matters.',
      tens: 'Low and unpredictable, illustrative: flaws start cracks, so glass breaks suddenly.',
      mod: 'About one third of steel: glass is stiff but brittle.',
      exp: 'Close to steel, but uneven heating of a pane can crack it.',
      cond: 'Glass itself conducts heat readily, so windows rely on air gaps and coatings to insulate.' },
    uses: 'Windows, curtain walls, and skylights.',
    weakness: 'Brittle, so it breaks without warning, and it conducts heat readily.' },
  { name: 'Aluminum', color: 'darkgray',
    vals: { density: 169, comp: 40000, tens: 45000, mod: 10e6, exp: 13e-6, cond: 1200 },
    notes: {
      density: 'About one third the density of steel, so aluminum makes light cladding and window frames.',
      comp: 'Yield strength of a common structural alloy; similar to steel at about one third of the weight.',
      tens: 'Ultimate strength of a common structural alloy (6061-T6).',
      mod: 'About one third of steel, so an aluminum member deflects three times as much at the same size.',
      exp: 'Twice steel: a 100 ft aluminum member grows about 1.9 in over a 120°F swing.',
      cond: 'The best conductor here, so aluminum window frames need thermal breaks.' },
    uses: 'Window frames, metal cladding, flashing, and roofing.',
    weakness: 'Expands twice as much as steel, is less stiff, and corrodes where it touches other metals.' },
  { name: 'Rigid foam insulation', short: 'Rigid foam', color: 'yellow',
    vals: { density: 2, comp: 25, tens: 40, mod: 1500, exp: 35e-6, cond: 0.17 },
    notes: {
      density: 'Very light, so insulation adds almost no load.',
      comp: 'Only about 25 psi: fine under a slab, but not for carrying structure.',
      tens: 'Very low; foam board is held in place, not stretched.',
      mod: 'Tiny: foam squashes easily and is not used to carry structure.',
      exp: 'Several times steel, so foam board and plastics need room to move.',
      cond: 'The lowest here, which is why foam board is used as insulation.' },
    uses: 'Insulation in walls, roofs, and under slabs.',
    weakness: 'Very low strength, and it is combustible, so it needs a protective cover.' }
];
materials.forEach(m => { if (!m.short) m.short = m.name; });

// ---- Properties: label, axis unit, and a note shown when "Divide by density" is on ----
const props = [
  { key: 'density', label: 'Density (lb/ft³)', title: 'Density', unit: 'lb/ft³', per: null },
  { key: 'comp', label: 'Compressive strength (psi)', title: 'Compressive strength', unit: 'psi', per: 'Per pound, wood (50) is competitive with steel (74) in compression. Glass leads in the laboratory, but it fails in tension first.' },
  { key: 'tens', label: 'Tensile strength (psi)', title: 'Tensile strength', unit: 'psi', per: 'Per pound, aluminum and steel lead in tension, and wood (17) beats concrete (2.7) and masonry (0.8) by a wide margin.' },
  { key: 'mod', label: 'Modulus of elasticity (psi)', title: 'Modulus of elasticity (stiffness)', unit: 'psi', per: 'Per pound, wood (50,000) is nearly as stiff as steel (59,000), which is why light framing works.' },
  { key: 'exp', label: 'Thermal expansion coefficient (per °F)', title: 'Thermal expansion coefficient', unit: 'millionths per °F (× 10⁻⁶)', scale: 1e6, per: 'Dividing by density is not a common design measure for this property. It is shown only for comparison.' },
  { key: 'cond', label: 'Thermal conductivity (BTU·in/h·ft²·°F)', title: 'Thermal conductivity', unit: 'BTU·in/h·ft²·°F', per: 'Dividing by density is not a common design measure for this property. It is shown only for comparison.' }
];

// ---- State ----
let propIdx = 1;      // compressive strength shows the book's steel-versus-wood example
let logOn = true;
let perDensity = false;
let selected = -1;
let chart = null;

// ---- Number formatting ----
const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
function sup(n) { return String(n).split('').map(c => SUP[c]).join(''); }
function fmt(v) {
  if (v === 0) return '0';
  if (v >= 1e6) { const m = v / 1e6; return Number(m.toPrecision(2)) + ' million'; }
  if (v >= 1000) return Math.round(v).toLocaleString('en-US');
  if (v >= 0.01) return String(Number(v.toPrecision(3)));
  const e = Math.floor(Math.log10(v)), mant = Number((v / Math.pow(10, e)).toPrecision(2));
  return mant + ' × 10' + sup(e);
}
function tickFmt(v) {
  const e = Math.round(Math.log10(v));
  if (Math.abs(v - Math.pow(10, e)) > v * 1e-6) return '';
  if (e >= 6) return '1' + '0'.repeat(e - 6) + ' M';
  return e < -2 ? '10' + sup(e) : fmt(v);
}

function currentValues() {
  const p = props[propIdx], k = p.scale || 1;
  return materials.map(m => k * (perDensity && p.key !== 'density' ? m.vals[p.key] / m.vals.density : m.vals[p.key]));
}
function unitText() {
  const p = props[propIdx];
  return perDensity && p.key !== 'density' ? p.unit + ' per (lb/ft³)' : p.unit;
}

// ---- Plugin: write the value at the end of each bar so every bar carries a text label ----
const valueLabels = {
  id: 'valueLabels',
  afterDatasetsDraw(c) {
    const ctx = c.ctx, vals = currentValues();
    ctx.save();
    ctx.font = 'bold 13px Arial, Helvetica, sans-serif';
    ctx.fillStyle = 'black';
    ctx.textBaseline = 'middle';
    c.getDatasetMeta(0).data.forEach((bar, i) => ctx.fillText(fmt(vals[i]), bar.x + 6, bar.y));
    ctx.restore();
  }
};

// ---- Build (or rebuild) the chart for the current choices ----
function buildChart() {
  const p = props[propIdx], vals = currentValues();
  if (chart) chart.destroy();
  const mx = Math.max(...vals), mn = Math.min(...vals);
  // leave room to the right of the longest bar for its value label
  let xMin, xMax;
  if (logOn) {
    xMin = Math.pow(10, Math.floor(Math.log10(mn)));
    xMax = xMin * Math.pow(10, Math.log10(mx / xMin) / 0.68);
  } else { xMin = 0; xMax = mx / 0.7; }
  const title = (perDensity && p.key !== 'density' ? p.title + ' per unit of density' : p.title) + ' of building materials';
  chart = new Chart(document.getElementById('matChart'), {
    type: 'bar',
    data: {
      labels: materials.map(m => m.short),
      datasets: [{
        label: p.title,
        data: vals,
        backgroundColor: materials.map(m => m.color),
        borderColor: materials.map((m, i) => i === selected ? 'navy' : 'dimgray'),
        borderWidth: materials.map((m, i) => i === selected ? 3 : 1)
      }]
    },
    plugins: [valueLabels],
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      interaction: { mode: 'nearest', axis: 'y', intersect: false },
      onClick: (e, els, c) => {
        const hit = c.getElementsAtEventForMode(e, 'nearest', { axis: 'y', intersect: false }, true);
        if (hit.length) { selected = hit[0].index; markSelected(); renderInfo(); }
      },
      onHover: (e, els, c) => { c.canvas.style.cursor = els.length ? 'pointer' : 'default'; },
      scales: {
        x: {
          type: logOn ? 'logarithmic' : 'linear', min: xMin, max: xMax,
          title: { display: true, text: unitText() + (logOn ? ' (log scale)' : ''), font: { size: 14 } },
          ticks: { font: { size: 13 }, maxTicksLimit: 8, callback: v => logOn ? tickFmt(v) : (v >= 1e6 ? Number((v / 1e6).toPrecision(2)) + ' M' : fmt(v)) },
          grid: { color: 'rgb(220,220,220)' }
        },
        y: { ticks: { font: { size: 14 }, color: 'black' }, grid: { display: false } }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: title, color: 'black', font: { size: 18, weight: 'bold' }, padding: { top: 2, bottom: 6 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 13 },
          callbacks: {
            title: items => materials[items[0].dataIndex].name,
            label: item => {
              const m = materials[item.dataIndex];
              let s = p.title + ': ' + fmt(item.parsed.x) + ' ' + unitText();
              return perDensity && p.key !== 'density' ? [s, '(' + fmt(m.vals[p.key] * (p.scale || 1)) + ' ÷ ' + m.vals.density + ' lb/ft³)'] : s;
            },
            afterLabel: item => wrap(materials[item.dataIndex].notes[p.key], 46)
          }
        }
      }
    }
  });
}

// outline the selected bar without rebuilding the chart
function markSelected() {
  const ds = chart.data.datasets[0];
  ds.borderColor = materials.map((m, i) => i === selected ? 'navy' : 'dimgray');
  ds.borderWidth = materials.map((m, i) => i === selected ? 3 : 1);
  chart.update('none');
}

// split a sentence into lines for the tooltip
function wrap(s, n) {
  const words = s.split(' '), lines = [];
  let cur = '';
  words.forEach(w => { if ((cur + ' ' + w).trim().length > n) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
  if (cur) lines.push(cur);
  return lines;
}

// ---- Info box: selected material, note for the current property, footnote ----
function renderInfo() {
  const p = props[propIdx];
  let h = '';
  if (selected < 0) {
    h += '<h3>Click a bar to see a material</h3><div class="row">Hover over a bar for its value and what the number means for design. Click it for typical uses and its main weakness.</div>';
  } else {
    const m = materials[selected], v = currentValues()[selected];
    h += '<h3>' + m.name + '</h3>';
    h += '<div class="row"><b>' + p.title + ':</b> ' + fmt(v) + ' ' + unitText() + '</div>';
    h += '<div class="row"><b>Typical uses:</b> ' + m.uses + '</div>';
    h += '<div class="row"><b>Main weakness:</b> ' + m.weakness + '</div>';
  }
  if (perDensity && p.per) h += '<div class="note">' + p.per + '</div>';
  else if (p.key === 'density') h += '<div class="note">Density divided by density is always 1, so the Divide by density box is unavailable for density.</div>';
  h += '<div class="foot">All values are approximate and typical; actual products vary. Strength is yield for metals and a design level for wood and masonry; rigid foam is polyisocyanurate or XPS board.</div>';
  document.getElementById('infobox').innerHTML = h;
}

// ---- Controls ----
document.addEventListener('DOMContentLoaded', function () {
  const sel = document.getElementById('propSelect');
  props.forEach((p, i) => { const o = document.createElement('option'); o.value = i; o.textContent = p.label; sel.appendChild(o); });
  sel.value = propIdx;
  const div = document.getElementById('divToggle');
  const syncDiv = () => {
    const isDensity = props[propIdx].key === 'density';
    div.disabled = isDensity;
    document.getElementById('divLabel').className = isDensity ? 'off' : '';
    if (isDensity) { div.checked = false; perDensity = false; }
  };
  sel.addEventListener('change', e => { propIdx = +e.target.value; syncDiv(); buildChart(); renderInfo(); });
  document.getElementById('logToggle').addEventListener('change', e => { logOn = e.target.checked; buildChart(); });
  div.addEventListener('change', e => { perDensity = e.target.checked; buildChart(); renderInfo(); });
  syncDiv();
  buildChart();
  renderInfo();
});
