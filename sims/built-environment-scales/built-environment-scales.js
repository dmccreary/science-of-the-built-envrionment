// Scales of the Built Environment MicroSim - five nested scales, hover for an example, click for a definition, step through the January classroom
// CANVAS_HEIGHT: 515
// Bloom Level 2 (Understand)
// MicroSim template version 2026.03

let containerWidth; // calculated from the <main> element
let canvasWidth = 400;
let drawHeight = 470;
let controlHeight = 45; // one row of controls
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 185; // x of the second button
let defaultTextSize = 16;

// ---- Data: scales listed from the outside in (index 0 = Region ... index 4 = Material) ----
// bg = ring color (light outside, dark center); fg = readable text color on that ring
const scales = [
  { name: 'Region', bg: 'honeydew', fg: 'black', example: 'A metropolitan area', concern: 'Utilities, transportation',
    def: 'A region is a metropolitan area whose neighborhoods are linked by utilities and transportation. It is the largest scale this book treats.',
    fail: 'If the regional electrical grid cannot meet winter demand, buildings in many neighborhoods lose power and heat.',
    ripple: 'The grid and the roads decide which services every neighborhood can count on.' },
  { name: 'Neighborhood', bg: 'palegreen', fg: 'black', example: 'A block of mixed-use buildings', concern: 'Access, drainage, shading',
    def: 'A neighborhood is a cluster of buildings together with the streets, drainage, and open space between them. It shapes access, shading, and stormwater.',
    fail: 'If a new tower blocks the low winter sun, the buildings behind it lose free heat and cost more to warm.',
    ripple: 'How buildings are placed decides how much sun and stormwater each one gets.' },
  { name: 'Building', bg: 'mediumseagreen', fg: 'black', example: 'A four-story apartment', concern: 'Safety, comfort, energy use',
    def: 'A building is an enclosed, roofed structure that shelters people, activities, or goods. It combines components so that it supports, separates, serves, and protects.',
    fail: 'If the heating system cannot keep up with the heat loss, the rooms are cold and energy use climbs.',
    ripple: 'A building\'s heating demand adds to the load on the regional electrical grid.' },
  { name: 'Component', bg: 'seagreen', fg: 'white', example: 'Stud wall, window, footing', concern: 'Load, heat flow, water',
    def: 'A component is an assembled part of a building, such as a stud wall, a window, or a footing. It combines materials to carry load, resist heat flow, or shed water.',
    fail: 'If a window frame leaks air around its edges, cold air enters and the room becomes uncomfortable.',
    ripple: 'The insulation chosen for a wall changes the heating load of the whole building.' },
  { name: 'Material', bg: 'darkgreen', fg: 'white', example: 'Softwood lumber, concrete', concern: 'Strength, moisture behavior',
    def: 'A material is a single substance, such as softwood lumber or concrete, with its own strength and moisture behavior. It is the smallest scale in the built environment.',
    fail: 'If lumber stays wet it decays, and the wall framing it forms can no longer carry its load.',
    ripple: 'The material you pick sets how long the wall made from it will last.' }
];

// The January classroom story: one step per ring, from the inside out
const traceSteps = [
  { ring: 4, text: 'A student is uncomfortable in a college classroom on a January afternoon. At the material scale, the window glass has low resistance to heat flow.' },
  { ring: 3, text: 'At the component scale, the window frame leaks air around its edges.' },
  { ring: 2, text: 'At the building scale, the heating system cannot keep up with the heat loss.' },
  { ring: 1, text: 'At the neighborhood scale, a neighboring tower blocks the low winter sun. Four causes at four scales produced one complaint, so thinking at only one scale misses part of the cause.' }
];

// ---- State ----
let selectedRing = -1;   // ring clicked by the student
let hoverRing = -1;
let traceStep = -1;      // -1 = not tracing; 0..3 = step shown
let ringRects = [];
let diagramRect = { x: 0, y: 0, w: 0, h: 0 };
let infoRect = { x: 0, y: 0, w: 0, h: 0 };

// ---- Controls ----
let traceButton, clearButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);

  traceButton = createButton('Trace the classroom');
  traceButton.position(10, drawHeight + 9);
  traceButton.size(165, 28);
  traceButton.mousePressed(advanceTrace);

  clearButton = createButton('Clear');
  clearButton.position(sliderLeftMargin, drawHeight + 9);
  clearButton.size(70, 28);
  clearButton.mousePressed(clearAll);

  describe('Five nested rounded rectangles labeled Region, Neighborhood, Building, Component, and Material, with Material at the center, drawn in light to dark green. Hovering a ring shows an example and its typical concern. Clicking a ring shows a definition and what changes if it fails. A Trace the classroom button steps through the January classroom example one ring at a time.', LABEL);
}

function advanceTrace() {
  traceStep = (traceStep + 1) % traceSteps.length;
  selectedRing = -1;
  traceButton.html(traceStep === traceSteps.length - 1 ? 'Restart the trace' : 'Next step (' + (traceStep + 2) + ' of 4)');
}

function clearAll() {
  traceStep = -1;
  selectedRing = -1;
  traceButton.html('Trace the classroom');
}

// ---- Layout: wide = diagram left, infobox right; narrow = diagram on top, infobox below ----
function layoutAll() {
  const wide = canvasWidth >= 640;
  if (wide) {
    diagramRect = { x: 12, y: 46, w: floor(canvasWidth * 0.52), h: drawHeight - 58 };
    infoRect = { x: diagramRect.x + diagramRect.w + 14, y: 46, w: canvasWidth - diagramRect.x - diagramRect.w - 26, h: drawHeight - 58 };
  } else {
    diagramRect = { x: 10, y: 44, w: canvasWidth - 20, h: 250 };
    infoRect = { x: 10, y: 302, w: canvasWidth - 20, h: drawHeight - 302 - 6 };
  }
  // nested rectangles: inset each ring by a band so the label of every ring is visible at the top of its band
  const innerH = 40, innerW = min(diagramRect.w * 0.3, 150);
  const dy = (diagramRect.h - innerH) / 8, dx = (diagramRect.w - innerW) / 8;
  ringRects = [];
  for (let i = 0; i < 5; i++) {
    ringRects.push({ x: diagramRect.x + i * dx, y: diagramRect.y + i * dy, w: diagramRect.w - 2 * i * dx, h: diagramRect.h - 2 * i * dy });
  }
}

function draw() {
  updateCanvasSize();
  layoutAll();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Scales of the Built Environment', canvasWidth / 2, 8);

  hoverRing = -1;
  if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY < drawHeight) hoverRing = ringAt(mouseX, mouseY);

  drawRings();
  drawInfo();
  drawTooltip();
  cursor(hoverRing >= 0 ? HAND : ARROW);
}

// innermost ring containing the point (-1 if none)
function ringAt(mx, my) {
  for (let i = ringRects.length - 1; i >= 0; i--) {
    const r = ringRects[i];
    if (mx >= r.x && mx <= r.x + r.w && my >= r.y && my <= r.y + r.h) return i;
  }
  return -1;
}

function activeRing() { return traceStep >= 0 ? traceSteps[traceStep].ring : selectedRing; }

function drawRings() {
  const active = activeRing();
  for (let i = 0; i < 5; i++) {
    const r = ringRects[i], s = scales[i];
    if (i === active) { stroke('darkorange'); strokeWeight(5); }
    else if (i === hoverRing) { stroke('navy'); strokeWeight(3); }
    else { stroke('dimgray'); strokeWeight(1); }
    fill(s.bg);
    rect(r.x, r.y, r.w, r.h, 16);
  }
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  textStyle(BOLD);
  for (let i = 0; i < 5; i++) {
    const r = ringRects[i];
    fill(scales[i].fg);
    if (i < 4) {
      const band = (ringRects[i + 1].y - r.y);
      text(scales[i].name, r.x + r.w / 2, r.y + band / 2 + 1);
    } else {
      text(scales[i].name, r.x + r.w / 2, r.y + r.h / 2);
    }
  }
  textStyle(NORMAL);
}

// draws wrapped text line by line and returns the next y
function wrapText(str, x, y, w, lead) {
  const words = str.split(' ');
  let line = '';
  for (const word of words) {
    const test = line ? line + ' ' + word : word;
    if (textWidth(test) > w && line) { text(line, x, y); y += lead; line = word; }
    else line = test;
  }
  if (line) { text(line, x, y); y += lead; }
  return y;
}

function drawInfo() {
  const r = infoRect;
  const active = activeRing();
  stroke(active >= 0 ? 'darkorange' : 'silver');
  strokeWeight(active >= 0 ? 3 : 1);
  fill('white');
  rect(r.x, r.y, r.w, r.h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  const x = r.x + 10, w = r.w - 20, lead = 17;
  let y = r.y + 8;
  textSize(16);
  textStyle(BOLD);
  if (traceStep >= 0) {
    const s = scales[traceSteps[traceStep].ring];
    y = wrapText('Trace the classroom: step ' + (traceStep + 1) + ' of 4 (' + s.name + ' scale)', x, y, w, 19);
    textStyle(NORMAL);
    textSize(14);
    y = wrapText(traceSteps[traceStep].text, x, y + 3, w, lead);
    fill('dimgray');
    wrapText('Press "' + (traceStep === 3 ? 'Restart the trace' : 'Next step') + '" to continue, or Clear to stop. The region scale is not part of this story.', x, y + 6, w, lead);
  } else if (selectedRing >= 0) {
    const s = scales[selectedRing];
    y = wrapText(s.name + ' scale', x, y, w, 19);
    textStyle(NORMAL);
    textSize(14);
    y = wrapText(s.def, x, y + 3, w, lead);
    y = wrapText('If it fails: ' + s.fail, x, y + 6, w, lead);
    wrapText('Ripple to other scales: ' + s.ripple, x, y + 4, w, lead);
  } else {
    y = wrapText('Five nested scales', x, y, w, 19);
    textStyle(NORMAL);
    textSize(14);
    y = wrapText('Each scale is made of the scale inside it: materials form components, components form buildings, buildings form neighborhoods, and neighborhoods form regions.', x, y + 3, w, lead);
    wrapText('Hover a ring for an example and its typical concern. Click a ring for a definition. Press "Trace the classroom" to follow one January complaint through four scales.', x, y + 8, w, lead);
  }
  textStyle(NORMAL);
}

function drawTooltip() {
  if (hoverRing < 0) return;
  const s = scales[hoverRing];
  textSize(14);
  const w = min(canvasWidth - 16, 270), h = 82;
  const tx = constrain(mouseX + 14, 6, canvasWidth - w - 6);
  const ty = constrain(mouseY + 14, 6, drawHeight - h - 6);
  stroke('navy');
  strokeWeight(1);
  fill(255, 255, 240, 245);
  rect(tx, ty, w, h, 8);
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(s.name, tx + 8, ty + 6);
  textStyle(NORMAL);
  let y = wrapText('Example: ' + s.example, tx + 8, ty + 25, w - 16, 17);
  wrapText('Typical concern: ' + s.concern, tx + 8, y, w - 16, 17);
}

function mousePressed() {
  if (mouseY < 0 || mouseY > drawHeight || mouseX < 0 || mouseX > canvasWidth) return;
  const i = ringAt(mouseX, mouseY);
  if (i < 0) return;
  traceStep = -1;
  traceButton.html('Trace the classroom');
  selectedRing = (i === selectedRing) ? -1 : i;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  traceButton.position(10, drawHeight + 9);
  clearButton.position(sliderLeftMargin, drawHeight + 9);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
