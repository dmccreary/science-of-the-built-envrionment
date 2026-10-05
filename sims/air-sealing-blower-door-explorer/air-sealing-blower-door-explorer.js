// CANVAS_HEIGHT: 590
let canvasWidth = 400;
let drawHeight = 480;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let runTestBtn;
let sealAllBtn;
let resetBtn;
let divisorSelect;
let volumeSlider;

let testRunning = false;
let testPressure = 0; // up to 50 Pa

let leaks = [
  { id: 1, name: 'Top Plate', share: 0.15, sealed: false, x: 0.25, y: 0.2 },
  { id: 2, name: 'Rim Joist', share: 0.18, sealed: false, x: 0.35, y: 0.8 },
  { id: 3, name: 'Window Gaps', share: 0.10, sealed: false, x: 0.20, y: 0.5 },
  { id: 4, name: 'Door Perimeter', share: 0.12, sealed: false, x: 0.45, y: 0.8 },
  { id: 5, name: 'Plumbing Penetrations', share: 0.10, sealed: false, x: 0.60, y: 0.3 },
  { id: 6, name: 'Recessed Lights', share: 0.10, sealed: false, x: 0.75, y: 0.2 },
  { id: 7, name: 'Electrical Boxes', share: 0.08, sealed: false, x: 0.85, y: 0.5 },
  { id: 8, name: 'Attic Hatch', share: 0.07, sealed: false, x: 0.50, y: 0.15 },
  { id: 9, name: 'Duct Leaks', share: 0.06, sealed: false, x: 0.70, y: 0.8 },
  { id: 10, name: 'Baseboards', share: 0.04, sealed: false, x: 0.25, y: 0.8 }
];

let baseCFM50 = 15000; // Unsealed total CFM50 roughly
let hoverLeak = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  runTestBtn = createButton('Run Test');
  runTestBtn.mousePressed(() => { testRunning = true; });
  
  sealAllBtn = createButton('Seal All');
  sealAllBtn.mousePressed(() => { leaks.forEach(l => l.sealed = true); });
  
  resetBtn = createButton('Reset');
  resetBtn.mousePressed(() => {
    testRunning = false;
    testPressure = 0;
    leaks.forEach(l => l.sealed = false);
  });
  
  divisorSelect = createSelect();
  divisorSelect.option('Divisor: 15 (Sheltered)', '15');
  divisorSelect.option('Divisor: 20 (Exposed)', '20');
  divisorSelect.selected('15');
  
  volumeSlider = createSlider(50000, 200000, 100000, 10000);
  
  positionControls();
  
  describe('Interactive blower door test simulation. A building cutaway shows 10 leakage points. Users can seal points to see the effect on CFM50 and ACH50.');
}

function positionControls() {
  runTestBtn.position(margin, drawHeight + 10);
  sealAllBtn.position(margin + 90, drawHeight + 10);
  resetBtn.position(margin + 180, drawHeight + 10);
  
  divisorSelect.position(margin + 260, drawHeight + 10);
  
  volumeSlider.position(margin, drawHeight + 50);
  volumeSlider.size(200);
}

function draw() {
  updateCanvasSize();
  
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Update animation
  if (testRunning && testPressure < 50) {
    testPressure += 1;
  }
  
  // Calculate leakage
  let activeLeakFrac = 0;
  leaks.forEach(l => {
    if (!l.sealed) activeLeakFrac += l.share;
  });
  
  let vol = volumeSlider.value();
  let currentCFM50 = (baseCFM50 * vol / 100000) * activeLeakFrac;
  let ach50 = (currentCFM50 * 60) / vol;
  let divisor = parseInt(divisorSelect.value());
  let natACH = ach50 / divisor;
  let targetACH50 = 3.0;
  
  // Title
  fill('black');
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('Air Sealing & Blower Door Test', canvasWidth/2, 10);
  
  // Draw Building Cutaway
  let bX = margin;
  let bY = 50;
  let bW = canvasWidth * 0.65;
  let bH = 300;
  
  stroke(100);
  strokeWeight(2);
  fill(240, 230, 220);
  // Simple house shape
  beginShape();
  vertex(bX, bY + 100);
  vertex(bX + bW/2, bY);
  vertex(bX + bW, bY + 100);
  vertex(bX + bW, bY + bH);
  vertex(bX, bY + bH);
  endShape(CLOSE);
  
  // Door where blower door is installed
  fill('#d2b48c'); // tan
  rect(bX + 20, bY + bH - 80, 50, 80);
  // Blower door fan
  fill(50);
  ellipse(bX + 45, bY + bH - 30, 40, 40);
  if (testRunning) {
    // Fan blades rotating (abstract)
    stroke(200);
    let angle = millis() / 100;
    line(bX + 45 - 15*cos(angle), bY + bH - 30 - 15*sin(angle), bX + 45 + 15*cos(angle), bY + bH - 30 + 15*sin(angle));
    line(bX + 45 - 15*sin(angle), bY + bH - 30 + 15*cos(angle), bX + 45 + 15*sin(angle), bY + bH - 30 - 15*cos(angle));
  }
  
  // Draw Leakage points
  hoverLeak = -1;
  for (let i = 0; i < leaks.length; i++) {
    let l = leaks[i];
    let lx = bX + l.x * bW;
    let ly = bY + l.y * bH + (l.y < 0.3 ? 50 : 0); // adjust for roof slope roughly
    
    // Check hover
    if (dist(mouseX, mouseY, lx, ly) < 15) {
      hoverLeak = i;
    }
    
    if (l.sealed) {
      fill('#4caf50');
      noStroke();
      ellipse(lx, ly, 12, 12);
    } else {
      fill('#f44336');
      noStroke();
      ellipse(lx, ly, 12, 12);
      
      // Draw arrow if test running
      if (testPressure > 10) {
        stroke('blue');
        strokeWeight(l.share * 20 * (testPressure/50));
        let arrLen = 20 + (l.share * 50);
        // Arrow points inwards (air infiltration)
        let dirX = (lx < bX + bW/2) ? 1 : -1;
        let dirY = (ly < bY + bH/2) ? 1 : -1;
        line(lx - dirX*arrLen, ly - dirY*arrLen, lx, ly);
      }
    }
    
    // Label number
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(8);
    text(l.id, lx, ly);
  }
  
  // Draw Tooltip
  if (hoverLeak !== -1) {
    let l = leaks[hoverLeak];
    let tx = mouseX + 15;
    let ty = mouseY + 15;
    if (tx + 180 > canvasWidth) tx = canvasWidth - 180;
    
    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(tx, ty, 180, 60, 5);
    
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(l.name, tx + 10, ty + 10);
    textStyle(NORMAL);
    text('Leakage Share: ' + Math.round(l.share * 100) + '%', tx + 10, ty + 25);
    text('Status: ' + (l.sealed ? 'Sealed' : 'Unsealed'), tx + 10, ty + 40);
  }
  
  // Right side panel for gauges and readouts
  let rX = bX + bW + margin;
  let rW = canvasWidth - rX - margin;
  if (rW < 120) rW = 120; // Ensure some width
  
  // Pressure Gauge
  fill(250);
  stroke(200);
  rect(rX, bY, rW, 100, 5);
  
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(14);
  text('House Press.', rX + rW/2, bY + 10);
  
  textSize(32);
  text(Math.round(testPressure) + ' Pa', rX + rW/2, bY + 40);
  
  // Dial for CFM50
  let dY = bY + 120;
  fill(250);
  stroke(200);
  rect(rX, dY, rW, 100, 5);
  
  fill('black');
  noStroke();
  textSize(14);
  text('CFM @ 50Pa', rX + rW/2, dY + 10);
  
  textSize(24);
  let displayCFM = (testPressure > 10) ? Math.round(currentCFM50 * (testPressure/50)) : 0;
  text(displayCFM, rX + rW/2, dY + 50);
  
  // Results panel below building
  let resY = bY + bH + 20;
  fill(255);
  stroke(200);
  rect(margin, resY, canvasWidth - margin*2, 80, 5);
  
  textAlign(LEFT, TOP);
  textSize(16);
  
  if (testPressure >= 49) {
    if (ach50 <= targetACH50) {
      fill('#2e7d32');
    } else {
      fill('#c62828');
    }
    text('ACH50: ' + nf(ach50, 1, 2) + ' (Goal: \u2264 ' + targetACH50 + ')', margin + 20, resY + 15);
    fill(50);
    text('Est. Natural ACH: ' + nf(natACH, 1, 2) + ' ACH', margin + 20, resY + 45);
    
    let numSealed = leaks.filter(l => l.sealed).length;
    textAlign(RIGHT, TOP);
    text('Points Sealed: ' + numSealed + '/10', canvasWidth - margin - 20, resY + 15);
  } else {
    fill(100);
    text('Run test to stabilize pressure at 50 Pa.', margin + 20, resY + 30);
  }
  
  // Controls Labels
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  
  text('Building Volume: ' + nf(vol, 1, 0) + ' ft\u00B3', margin + 215, drawHeight + 50);
  
  text('Click red circles to seal leaks.', margin, drawHeight + 80);
}

function mousePressed() {
  if (mouseY < drawHeight && hoverLeak !== -1) {
    leaks[hoverLeak].sealed = true;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
