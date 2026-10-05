// CLT Warm Roof Assembly Explorer - prediction panel
// CANVAS_HEIGHT: 905
// Bloom Level 2 (Understand): infer what follows when each layer of a CLT warm roof is removed.
//
// The drawing, the layer checkboxes, the flows and the temperature profile come from the shared
// layered-assembly engine (layered-assembly-engine.js) and the ASSEMBLY data in
// clt-warm-roof-assembly-explorer.js. This file adds one thing the engine does not have: a committed
// prediction for each layer, scored once, before the layer is removed. It only reads and drives the
// engine's own controls (breakBoxes, failSel, profileBox, tempSlider) and never edits the engine.
(function () {
  const $ = id => document.getElementById(id);

  // ---- The four consequences, one per layer ----
  const C = {
    membrane: 'Rain reaches the insulation and is stopped only at the vapor control layer.',
    foam: 'Heat loss rises about fourfold and the top of the timber deck falls below the dew point, so the deck is flagged.',
    vapor: 'Room vapor passes through the deck into the insulation and stops under the roof membrane, where it can condense.',
    deck: 'Heat loss rises about 30 percent and the structure loses its deck, which the drawing cannot show.'
  };
  const STEPS = [
    { id: 'membrane', right: 'membrane', why: 'The roof membrane was the only layer built to keep rain out of the insulation.' },
    { id: 'foam', right: 'foam', why: 'R drops from 37.5 to 9.5. At -10°F the deck\'s top surface falls from 50.2°F to -8.6°F, far below the 37°F dew point.' },
    { id: 'vapor', right: 'vapor', why: 'The vapor control layer was the layer stopping vapor. Without it vapor is trapped under the cold roof membrane.' },
    { id: 'deck', right: 'deck', why: 'R drops from 37.5 to 28.9. The structural role is lost, and the drawing shows only flows, so read the layer\'s information panel.' }
  ];
  const ORDER = ['deck', 'membrane', 'vapor', 'foam'];   // fixed display order of the four options, not the layer order

  let step = 0, picked = null, stage = 'choose', score = 0, results = [];
  let ready = false;

  function waitForEngine() {
    if (typeof breakBoxes !== 'undefined' && typeof ASSEMBLY !== 'undefined' && breakBoxes.length === ASSEMBLY.layers.length && typeof tempSlider !== 'undefined' && tempSlider) {
      init();
    } else setTimeout(waitForEngine, 100);
  }

  function engineControls() {
    return [...breakBoxes, failSel, explodeSlider, unitSel, resetButton, ...flowBoxes, lineArtBox, legendBox, profileBox, tempSlider].filter(Boolean);
  }

  function setBoxes(enabled) {
    breakBoxes.forEach(b => { b.elt.querySelector('input').disabled = !enabled; });
  }

  function init() {
    // p5 positions its controls in page coordinates; moving them inside <main> (position: relative) keeps them
    // attached to the drawing now that the prediction panel sits above it
    const mainEl = document.querySelector('main');
    engineControls().forEach(el => mainEl.appendChild(el.elt));
    ready = true;
    resetEngine();
    renderStep();
  }

  function resetEngine() {
    resetAll();                                  // the engine's own Reset
    profileBox.checked(true);                    // show the temperature profile so deck temperatures are visible
    tempSlider.elt.step = 5;                     // spec: -20 to 40 F in steps of 5 F
    tempSlider.value(-10);
    failSel.selected('missing');
    setBoxes(false);                             // locked while predicting, so nothing is peeked at
    failSel.elt.disabled = true;
    resetButton.elt.disabled = true;             // the engine's Reset would undo the drill state
  }

  // ---- Panel ----
  function setFb(text, kind) { const f = $('pFb'); f.textContent = text; f.className = 'fb' + (kind ? ' ' + kind : ''); }

  function renderStep() {
    const s = STEPS[step];
    const L = ASSEMBLY.layers.find(l => l.id === s.id);
    $('pHead').textContent = 'Which layer protects the timber from which threat?  Layer ' + (step + 1) + ' of 4: ' + L.full + '. If it is removed, which consequence follows?';
    const box = $('pOpts'); box.innerHTML = '';
    ORDER.forEach(key => {
      const lab = document.createElement('label');
      const rb = document.createElement('input'); rb.type = 'radio'; rb.name = 'cons'; rb.value = key; rb.disabled = stage !== 'choose';
      rb.checked = picked === key;
      rb.addEventListener('change', () => { picked = key; renderStep(); });
      lab.appendChild(rb);
      lab.appendChild(document.createTextNode(C[key]));
      if (picked === key) lab.classList.add('on');
      if (stage !== 'choose') lab.classList.add('dim');
      box.appendChild(lab);
    });
    $('pGo').textContent = stage === 'choose' ? 'Commit and remove the layer' : step < 3 ? 'Restore the layer and continue' : 'Restore the layer and see my score';
    $('pGo').disabled = stage === 'choose' && !picked;
    $('pScore').textContent = 'Correct: ' + score + ' of 4';
  }

  function commit() {
    const s = STEPS[step];
    const ok = picked === s.right;
    results[step] = ok;
    if (ok) score++;
    const i = ASSEMBLY.layers.findIndex(l => l.id === s.id);
    breakBoxes[i].checked(false);                // remove the layer in the drawing
    selected = i;                                // open its information panel
    stage = 'feedback';
    setFb((ok ? 'Correct: ' : 'Not quite: ') + s.why + (ok ? '' : ' The correct consequence is: ' + C[s.right]), ok ? 'good' : 'bad');
    renderStep();
  }

  function proceed() {
    const s = STEPS[step];
    const i = ASSEMBLY.layers.findIndex(l => l.id === s.id);
    breakBoxes[i].checked(true);                 // restore the layer before the next one
    picked = null; stage = 'choose';
    if (step < 3) { step++; setFb('', ''); renderStep(); return; }
    finish();
  }

  function finish() {
    stage = 'done';
    setBoxes(true); failSel.elt.disabled = false; resetButton.elt.disabled = false;
    $('pHead').textContent = 'Final score: ' + score + ' of 4.' + (score >= 3 ? ' That reaches mastery (3 of 4).' : ' Mastery is 3 of 4; restart to try again.');
    $('pOpts').innerHTML = '';
    $('pScore').textContent = 'Correct: ' + score + ' of 4';
    $('pGo').textContent = 'Restart predictions';
    $('pGo').disabled = false;
    setFb('Now explore. Drag the outdoor temperature slider from -20°F to 40°F with all layers present: the deck stays above the 37°F dew point. Then untick Tapered foam and drag it again: the deck is flagged at every outdoor temperature below about 36°F.', '');
  }

  function restart() {
    step = 0; picked = null; stage = 'choose'; score = 0; results = [];
    resetEngine(); setFb('', ''); renderStep();
  }

  document.addEventListener('DOMContentLoaded', () => {
    $('pGo').addEventListener('click', () => {
      if (!ready) return;
      if (stage === 'choose') { if (picked) commit(); }
      else if (stage === 'feedback') proceed();
      else restart();
    });
    $('pHead').textContent = 'Which layer protects the timber from which threat?';
    setFb('Choose a consequence for the first layer, then commit. You get one attempt per layer.', '');
    waitForEngine();
  });
})();
