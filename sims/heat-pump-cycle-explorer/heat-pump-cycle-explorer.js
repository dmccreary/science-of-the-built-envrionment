// Heat Pump Cycle Explorer - interactive SVG infographic (HTML/JS, no library)
// CANVAS_HEIGHT: 690
// Bloom Level 2 (Understand): explain what happens to the refrigerant and which way heat flows in each part, in heating and cooling mode
document.addEventListener('DOMContentLoaded', function () {
  const NS = 'http://www.w3.org/2000/svg';
  const $ = id => document.getElementById(id);

  // ---- Content (Appendix A, "How a Heat Pump Works"; temperatures are illustrative) ----
  const START_PROMPT = 'Heat flows only from warmer to colder. Where does the refrigerant have to be warmer, and where colder?';
  const STAGES = [
    { part: 'Compressor', glow: 'gComp',
      what: 'Compressor: low-pressure cool vapor goes in, high-pressure hot vapor comes out.',
      q: 'After compression the vapor\'s temperature is', opts: ['higher', 'lower'], answer: 'higher',
      why: 'Compression adds energy, so the vapor leaves hotter than the 100°F supply air, which lets heat flow out of it.' },
    { part: 'Condenser (the indoor coil in heating mode)', glow: 'gR',
      what: 'Condenser (indoor coil in heating mode): the hot vapor gives up heat and becomes liquid at about 110°F.',
      q: 'At the condenser, heat flows', opts: ['into the building', 'out of the building'], answer: 'into the building',
      why: 'The refrigerant at about 110°F is warmer than the 100°F air crossing the coil, so heat flows from the refrigerant to the air.' },
    { part: 'Expansion valve', glow: 'gExp',
      what: 'Expansion valve: the pressure drops and the liquid becomes much colder, about -5°F.',
      q: 'After the pressure drop the refrigerant is', opts: ['warmer than the outdoor air', 'colder than the outdoor air'], answer: 'colder than the outdoor air',
      why: 'Lower pressure lowers the boiling temperature, so the liquid falls to about -5°F, below the 5°F outdoor air.' },
    { part: 'Evaporator (the outdoor coil in heating mode)', glow: 'gL',
      what: 'Evaporator (outdoor coil in heating mode): the cold liquid absorbs heat and boils to vapor at about -5°F.',
      q: 'On a 5°F day, heat can flow from the outdoor air into the -5°F refrigerant', opts: ['yes', 'no'], answer: 'yes',
      why: 'Heat flows from warmer to colder, and the 5°F air is 10°F warmer than the refrigerant, so the refrigerant absorbs heat and boils.' },
    { part: 'Reversing valve', glow: 'gRv',
      what: 'Reversing valve: swaps which coil is the condenser and which is the evaporator.',
      q: 'In cooling mode the indoor coil acts as the', opts: ['condenser', 'evaporator'], answer: 'evaporator',
      why: 'In cooling mode the indoor coil must absorb heat from the room air, which is the evaporator\'s job.' }
  ];
  const JOBS = {
    gComp: 'Compressor: takes in low-pressure cool vapor and pushes out high-pressure hot vapor. It does this in both modes.',
    gExp: 'Expansion valve: drops the pressure, so the liquid becomes much colder. It does this in both modes.',
    gRv: 'Reversing valve: swaps which coil is the condenser and which is the evaporator.',
    cond: 'Condenser: the hot vapor gives up heat to the air crossing the coil and becomes liquid.',
    evap: 'Evaporator: the cold liquid absorbs heat from the air crossing the coil and boils to vapor.'
  };

  // ---- Pipe geometry (viewBox 640 x 340). Points run in the heating-mode direction unless noted ----
  const PIPE = {
    disch: [[345, 68], [345, 92]], suct: [[295, 92], [295, 68]],
    rvR: [[375, 112], [550, 112], [550, 140]], rvL: [[265, 112], [90, 112], [90, 140]],
    botR: [[550, 250], [550, 300], [375, 300]], botL: [[265, 300], [90, 300], [90, 250]]
  };
  const COL = { hot: 'firebrick', warm: 'darkorange', cold: 'royalblue', cool: 'deepskyblue' };

  // ---- State ----
  const st = { mode: 'heating', stage: 0, correct: 0, answered: [], done: false, explore: false };

  function el(name, attrs, parent) {
    const e = document.createElementNS(NS, name);
    Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k]));
    if (parent) parent.appendChild(e);
    return e;
  }
  function pipe(pts, color, reverse) {
    const p = reverse ? pts.slice().reverse() : pts;
    el('polyline', { points: p.map(q => q.join(',')).join(' '), fill: 'none', stroke: color, 'stroke-width': 7, 'stroke-linejoin': 'round' }, $('pipes'));
    // arrowhead at the middle of the longest segment
    let best = 0, bi = 0;
    for (let i = 0; i < p.length - 1; i++) { const l = Math.hypot(p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]); if (l > best) { best = l; bi = i; } }
    const [x1, y1] = p[bi], [x2, y2] = p[bi + 1];
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    el('polygon', { points: '9,0 -7,-8 -7,8', fill: 'black', transform: `translate(${mx},${my}) rotate(${a})` }, $('pipes'));
  }

  function render() {
    const heating = st.mode === 'heating';
    $('pipes').innerHTML = ''; $('heat').innerHTML = ''; $('notes').innerHTML = '';
    // refrigerant loop: same direction through the compressor in both modes; the coil branches reverse
    pipe(PIPE.disch, COL.hot, false);
    pipe(PIPE.suct, COL.cool, false);
    if (heating) {
      pipe(PIPE.rvR, COL.hot, false); pipe(PIPE.botR, COL.warm, false); pipe(PIPE.botL, COL.cold, false); pipe(PIPE.rvL, COL.cool, true);
    } else {
      pipe(PIPE.rvL, COL.hot, false); pipe(PIPE.botL, COL.warm, true); pipe(PIPE.botR, COL.cold, true); pipe(PIPE.rvR, COL.cool, true);
    }
    // coil roles
    const condSide = heating ? 'R' : 'L', evapSide = heating ? 'L' : 'R';
    const show = n => st.explore || st.answered.includes(n);
    ['L', 'R'].forEach(s => {
      const isCond = s === condSide;
      const g = $('g' + s);
      g.querySelector('.box').setAttribute('fill', isCond ? 'mistyrose' : 'lightcyan');
      $('role' + s).textContent = isCond ? 'Condenser' : 'Evaporator';
    });
    $('outLabel').textContent = heating ? 'OUTDOORS: 5°F air (illustrative)' : 'OUTDOORS';
    $('inLabel').textContent = heating ? 'INDOORS: 100°F supply air (illustrative)' : 'INDOORS';

    // heat-flow arrows appear once the matching stage has been answered (or in exploration)
    function heatArrow(side, isCond) {
      const gapX = side === 'L' ? [150, 255] : [385, 490];
      // condenser: heat leaves the coil toward the air; evaporator: heat enters the coil from the air
      const towardCoil = !isCond;
      const pointsRight = side === 'L' ? !towardCoil : towardCoil;
      const x1 = pointsRight ? gapX[0] : gapX[1], x2 = pointsRight ? gapX[1] : gapX[0], y = 195;
      const dir = pointsRight ? 1 : -1;
      el('polygon', { points: `${x1},${y - 8} ${x2 - dir * 16},${y - 8} ${x2 - dir * 16},${y - 16} ${x2},${y} ${x2 - dir * 16},${y + 16} ${x2 - dir * 16},${y + 8} ${x1},${y + 8}`,
        fill: 'gold', stroke: 'darkorange', 'stroke-width': 2 }, $('notes'));
      const t1 = isCond ? 'heat out' : 'heat in';
      const t2 = side === 'L' ? (isCond ? 'to outdoor air' : 'from outdoor air') : (isCond ? 'to room air' : 'from room air');
      el('text', { x: (gapX[0] + gapX[1]) / 2, y: 166, 'text-anchor': 'middle', 'font-size': 15, 'font-weight': 'bold', fill: 'black' }, $('notes')).textContent = t1;
      el('text', { x: (gapX[0] + gapX[1]) / 2, y: 232, 'text-anchor': 'middle', 'font-size': 14, fill: 'dimgray' }, $('notes')).textContent = t2;
    }
    if (show(2) || (st.explore && !heating) || (st.explore)) heatArrow(condSide, true);
    if (show(4) || st.explore) heatArrow(evapSide, false);

    // refrigerant temperature notes (illustrative, heating example only)
    function note(x, y, txt, col, anchor) {
      el('text', { x, y, 'text-anchor': anchor || 'middle', 'font-size': 14, 'font-weight': 'bold', fill: col }, $('notes')).textContent = txt;
    }
    if (heating) {
      if (show(1)) { note(385, 40, 'hot vapor: hotter', 'firebrick', 'start'); note(385, 57, 'than the 100°F air', 'firebrick', 'start'); }
      if (show(2)) note(550, 244, '≈ 110°F', 'firebrick');
      if (show(3)) note(180, 322, 'cold liquid ≈ -5°F', 'royalblue');
      if (show(4)) note(90, 244, '≈ -5°F', 'royalblue');
    }
    if (show(5) && !heating) note(320, 150, 'coils swapped roles', 'navy');
    if (show(5) && heating && st.explore) note(320, 150, 'switch the mode to see it', 'navy');

    // active stage glow
    ['gComp', 'gRv', 'gL', 'gR', 'gExp'].forEach(id => $(id).classList.remove('glow'));
    if (st.stage >= 1 && !st.done) $(STAGES[st.stage - 1].glow).classList.add('glow');
  }

  // ---- Walkthrough ----
  function setFb(text, kind) {
    const f = $('fb'); f.textContent = text; f.className = 'fb' + (kind ? ' ' + kind : '') + (text ? '' : ' hide');
  }
  function score() { $('score').innerHTML = st.stage === 0 && !st.done ? '' : '<b>' + st.correct + ' of 5</b> correct'; }

  function showStage(n) {
    st.stage = n; st.done = false;
    const s = STAGES[n - 1];
    $('prompt').innerHTML = '<b>Stage ' + n + ' of 5: ' + s.part + '.</b> ' + s.q + ' ...';
    const box = $('opts'); box.innerHTML = '';
    s.opts.forEach(o => {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = o;
      b.addEventListener('click', () => answer(o));
      box.appendChild(b);
    });
    setFb('', '');
    $('nextBtn').classList.add('hide'); $('goBtn').classList.add('hide');
    render(); score();
  }

  function answer(choice) {
    const s = STAGES[st.stage - 1];
    const ok = choice === s.answer;
    if (ok) st.correct++;
    st.answered.push(st.stage);
    [...$('opts').children].forEach(b => { b.disabled = true; if (b.textContent === s.answer) b.style.outline = '3px solid seagreen'; });
    setFb((ok ? 'Correct: ' : 'Not quite: ') + s.why + ' ' + s.what, ok ? 'good' : 'bad');
    $('nextBtn').textContent = st.stage < 5 ? 'Next stage' : 'Finish';
    $('nextBtn').classList.remove('hide');
    render(); score();
  }

  function next() {
    if (st.stage < 5) { showStage(st.stage + 1); return; }
    finish();
  }

  function finish() {
    st.done = true; st.explore = true;
    $('opts').innerHTML = '';
    const mastered = st.correct >= 4;
    $('prompt').innerHTML = '<b>Walkthrough complete: ' + st.correct + ' of 5 correct.</b> ' + (mastered ? 'That reaches mastery (4 of 5).' : 'Mastery is 4 of 5; restart to try again.') +
      ' Now switch between heating and cooling and watch the two coils trade roles.';
    setFb('', '');
    $('nextBtn').classList.add('hide');
    $('goBtn').textContent = 'Restart walkthrough'; $('goBtn').classList.remove('hide');
    document.querySelectorAll('input[name=mode]').forEach(r => { r.disabled = false; });
    $('modeHint').textContent = '';
    render(); score();
  }

  function start() {
    st.mode = 'heating'; st.correct = 0; st.answered = []; st.explore = false; st.done = false;
    document.querySelectorAll('input[name=mode]').forEach(r => { r.checked = r.value === 'heating'; r.disabled = true; });
    $('modeHint').textContent = 'Mode switch unlocks after the walkthrough.';
    showStage(1);
  }

  // ---- Mode switch ----
  document.querySelectorAll('input[name=mode]').forEach(r => r.addEventListener('change', () => {
    if (!r.checked) return;
    st.mode = r.value;
    render();
    setFb(r.value === 'cooling'
      ? 'Cooling mode: the indoor coil is the evaporator and the outdoor coil is the condenser. The compressor and expansion valve keep the same jobs; only the coil that plays the evaporator changes.'
      : 'Heating mode: the indoor coil is the condenser and the outdoor coil is the evaporator. The same four parts do the same four jobs as in cooling mode.', '');
  }));

  // ---- Part labels: open a one-sentence job (before and after the walkthrough, not during it) ----
  function openPart(id) {
    if (st.stage >= 1 && !st.done) return;
    const condSide = st.mode === 'heating' ? 'gR' : 'gL';
    let txt;
    if (id === 'gL' || id === 'gR') txt = JOBS[id === condSide ? 'cond' : 'evap'] + ' (' + (id === 'gL' ? 'Outdoor' : 'Indoor') + ' coil in ' + st.mode + ' mode.)';
    else txt = JOBS[id];
    setFb(txt, '');
  }
  ['gComp', 'gRv', 'gL', 'gR', 'gExp'].forEach(id => {
    const g = $(id);
    g.addEventListener('click', () => openPart(id));
    g.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPart(id); } });
  });

  $('goBtn').addEventListener('click', start);
  $('nextBtn').addEventListener('click', next);

  $('prompt').textContent = START_PROMPT;
  render();
});
