// Project Phases and the Cost of Change MicroSim - Chart.js conceptual line chart with phase infobox
// CANVAS_HEIGHT: 700
// Bloom Level 2 (Understand) + Level 1 (Remember)
// MicroSim template version 2026.03

// ---- Data: the eight phases from Chapter 2 (deliverables and electrical contributions match the chapter table) ----
const phases = [
  { name: 'Programming', short: 'Programming', lines: ['Programming'],
    question: 'What does the owner need?',
    deliverable: 'Written program, budget',
    gate: 'Owner approves the program and budget.',
    electrical: 'Identify special power needs',
    wall: 'No drawings exist yet. The classroom is only an area in the written program, so enlarging it is a line of text and takes minutes.' },
  { name: 'Schematic design', short: 'Schematic', lines: ['Schematic', 'design'],
    question: 'What overall form works?',
    deliverable: 'Site plan, floor plans',
    gate: 'Owner signs off on the plan; the basic layout is not revisited without a formal decision.',
    electrical: 'Estimate service size',
    wall: 'The architect moves a line on one floor plan. About an hour of work.' },
  { name: 'Design development', short: 'Design dev.', lines: ['Design', 'development'],
    question: 'How will it be built?',
    deliverable: 'Refined plans, system selections',
    gate: 'Owner approves the design freeze and the updated cost estimate.',
    electrical: 'Locate panels, lay out lighting',
    wall: 'Plans, sections, and system layouts must be redrawn, and the engineers re-check structure, ducts, and panels. Roughly a day or two.' },
  { name: 'Construction documents', short: 'Constr. docs', lines: ['Construction', 'documents'],
    question: 'Exactly what is to be built?',
    deliverable: 'Drawings, specifications',
    gate: 'Owner approves release of the documents for permit and bidding.',
    electrical: 'Produce E-series sheets and Division 26 specifications',
    wall: 'The change must be coordinated across the architectural, structural, mechanical, plumbing, and electrical sheets. Several days of work by several people.' },
  { name: 'Bidding and procurement', short: 'Bidding', lines: ['Bidding &', 'procurement'],
    question: 'Who will build it, and for how much?',
    deliverable: 'Signed construction contract',
    gate: 'Owner awards the construction contract.',
    electrical: 'Answer bidder questions',
    wall: 'The architect issues an addendum to every bidder, and prices may change. A late addendum can push back the bid date.' },
  { name: 'Construction', short: 'Construction', lines: ['Construction'],
    question: 'Is it built as designed?',
    deliverable: 'Completed work',
    gate: 'Owner approves each monthly payment and the change orders.',
    electrical: 'Review submittals, answer questions',
    wall: 'The framed wall and installed conduit are demolished, wiring is re-routed, drawings are revised, and a change order is signed. Weeks and a considerable sum.' },
  { name: 'Commissioning', short: 'Commission.', lines: ['Commis-', 'sioning'],
    question: 'Does it work as intended?',
    deliverable: 'Test reports',
    gate: 'Owner accepts each system after deficiencies are corrected.',
    electrical: 'Verify controls and lighting',
    wall: 'Finished walls, ceilings, and systems are opened up and rebuilt, and the controls and lighting are tested again. Costly, and a change order is needed.' },
  { name: 'Occupancy and closeout', short: 'Closeout', lines: ['Occupancy &', 'closeout'],
    question: 'Is it ready to use?',
    deliverable: 'Certificate of occupancy, records',
    gate: 'Owner makes final payment and releases the retainage.',
    electrical: 'Deliver record drawings',
    wall: 'The building is occupied, so this is now a renovation: a new permit, disruption to users, and updated record drawings. The highest cost of all.' }
];

// Conceptual curves (relative units, no numeric scale)
const influenceBase = [100, 88, 66, 42, 26, 14, 6, 2];
const costBase = [2, 4, 10, 22, 38, 62, 84, 100];
const influenceEarly = [100, 96, 84, 66, 46, 28, 14, 6];
const costEarly = [1, 2, 5, 11, 24, 45, 70, 88];

const earlyText = 'With integrated delivery, the owner, architect, builder, and key trades decide together from the start, so key decisions are made earlier and both lines shift to the right: influence stays high and the cost of change stays low for longer.';

let chart, selected = 1, early = false;

function level(v) {
  if (v >= 75) return 'Very high';
  if (v >= 50) return 'High';
  if (v >= 25) return 'Moderate';
  if (v >= 10) return 'Low';
  return 'Very low';
}

function wrap(str, n) {
  const words = str.split(' ');
  const out = [];
  let cur = '';
  words.forEach(w => {
    if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w; } else { cur = (cur + ' ' + w).trim(); }
  });
  if (cur) out.push(cur);
  return out;
}

// Draws the "wall moved here" marker for the selected phase
const markerPlugin = {
  id: 'wallMarker',
  afterDatasetsDraw(c) {
    const x = c.scales.x.getPixelForValue(selected);
    const top = c.chartArea.top, bottom = c.chartArea.bottom;
    const ctx = c.ctx;
    ctx.save();
    ctx.strokeStyle = 'navy';
    ctx.lineWidth = 2;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(x, top);
    ctx.lineTo(x, bottom);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.font = 'bold 13px Arial';
    const label = 'Wall moved here';
    const w = ctx.measureText(label).width + 12;
    const bx = Math.min(Math.max(x - w / 2, c.chartArea.left), c.chartArea.right - w);
    ctx.fillStyle = 'navy';
    // put the chip at the height farthest from both lines so it never covers a data point
    const inf = c.data.datasets[0].data[selected], cost = c.data.datasets[1].data[selected];
    let best = 50, bestD = -1;
    for (let v = 12; v <= 98; v += 2) {
      const d = Math.min(Math.abs(v - inf), Math.abs(v - cost));
      if (d > bestD) { bestD = d; best = v; }
    }
    const by = c.scales.y.getPixelForValue(best) - 10;
    ctx.fillRect(bx, by, w, 20);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, bx + 6, by + 10);
    ctx.restore();
  }
};

function select(i) {
  selected = i;
  document.getElementById('wallSlider').value = i + 1;
  render();
}

function render() {
  const p = phases[selected];
  document.getElementById('wallLabel').textContent = 'Phase ' + (selected + 1) + ': ' + p.name;
  chart.data.datasets[0].data = early ? influenceEarly : influenceBase;
  chart.data.datasets[1].data = early ? costEarly : costBase;
  chart.update('none');
  const inf = chart.data.datasets[0].data[selected], cost = chart.data.datasets[1].data[selected];
  document.getElementById('infobox').innerHTML =
    '<h3>Phase ' + (selected + 1) + ': ' + p.name + ' - ' + p.question + '</h3>' +
    '<div class="row"><b>Deliverable:</b> ' + p.deliverable + '</div>' +
    '<div class="row"><b>Owner approval gate:</b> ' + p.gate + '</div>' +
    '<div class="row"><b>Electrical designer:</b> ' + p.electrical + '</div>' +
    '<div class="row"><b>Here:</b> ability to influence the design is ' + level(inf).toLowerCase() +
    '; cost of a change is ' + level(cost).toLowerCase() + '.</div>' +
    '<div class="wall"><b>Move a Riverbend classroom wall four feet now:</b> ' + p.wall + '</div>' +
    (early ? '<div class="early"><b>Early collaboration:</b> ' + earlyText + '</div>' : '') +
    '<div class="note">Conceptual curves and illustrative Riverbend figures, not measured data. Click a phase on the chart or use the slider.</div>';
}

document.addEventListener('DOMContentLoaded', function () {
  const narrow = () => chart && chart.width < 520;
  chart = new Chart(document.getElementById('phaseChart'), {
    type: 'line',
    data: {
      labels: phases.map(p => p.lines),
      datasets: [
        { label: 'Ability to influence the design', data: influenceBase,
          borderColor: 'seagreen', backgroundColor: 'seagreen', borderWidth: 4, tension: 0.35,
          pointStyle: 'circle', pointRadius: c => c.dataIndex === selected ? 9 : 5 },
        { label: 'Cost of making a change', data: costBase,
          borderColor: 'darkorange', backgroundColor: 'darkorange', borderWidth: 4, borderDash: [10, 6], tension: 0.35,
          pointStyle: 'rectRot', pointRadius: c => c.dataIndex === selected ? 10 : 6 }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 400 },
      onResize: c => { c.options.scales.y.title.text = c.width < 520 ? 'Relative level' : 'Relative level (conceptual)'; },
      interaction: { mode: 'index', intersect: false },
      onClick: (e, els, c) => {
        const hit = c.getElementsAtEventForMode(e, 'index', { intersect: false }, true);
        if (hit.length) select(hit[0].index);
      },
      plugins: {
        title: { display: true, text: 'Project Phases and the Cost of Change', color: 'black', font: ctx => ({ size: ctx.chart.width < 520 ? 17 : 22, weight: 'normal' }), padding: { top: 2, bottom: 2 } },
        legend: { position: 'bottom', labels: { font: { size: 14 }, color: 'black', boxWidth: 36, padding: 8 } },
        tooltip: {
          titleFont: { size: 14 }, bodyFont: { size: 14 },
          callbacks: {
            title: items => 'Phase ' + (items[0].dataIndex + 1) + ': ' + phases[items[0].dataIndex].name,
            afterTitle: items => wrap('Main question: ' + phases[items[0].dataIndex].question, 34),
            label: item => (item.datasetIndex === 0 ? 'Ability to influence: ' : 'Cost of a change: ') + level(item.raw)
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'lightgray' },
          ticks: {
            autoSkip: false, color: 'black', font: { size: 13 }, maxRotation: 90, minRotation: 0,
            callback: function (v) { return narrow() ? phases[v].short : phases[v].lines; }
          }
        },
        y: {
          min: 0, max: 108,
          title: { display: true, text: 'Relative level (conceptual)', color: 'black', font: { size: 14 } },
          ticks: { display: false }, grid: { color: 'lightgray' }
        }
      }
    },
    plugins: [markerPlugin]
  });

  document.getElementById('earlyToggle').addEventListener('change', e => { early = e.target.checked; render(); });
  document.getElementById('wallSlider').addEventListener('input', e => select(parseInt(e.target.value, 10) - 1));
  chart.options.scales.y.title.text = chart.width < 520 ? 'Relative level' : 'Relative level (conceptual)';
  render();
});
