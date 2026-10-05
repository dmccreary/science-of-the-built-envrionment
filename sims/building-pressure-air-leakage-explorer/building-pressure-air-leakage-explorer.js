// CANVAS_HEIGHT: 650
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let tempSlider;
let windSlider;
let windDirBtn;
let exhaustSlider;
let heightSlider;
let sealTopCheckbox;

let windIsLeftToRight = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Row 1
  windDirBtn = createButton('Toggle Wind Dir');
  windDirBtn.mousePressed(() => { windIsLeftToRight = !windIsLeftToRight; });
  sealTopCheckbox = createCheckbox('Seal the top gaps', false);
  
  // Row 2
  tempSlider = createSlider(-20, 70, -10, 1);
  windSlider = createSlider(0, 30, 0, 1);
  exhaustSlider = createSlider(0, 2000, 0, 100);
  
  // Row 3
  heightSlider = createSlider(10, 60, 30, 5);
  
  positionControls();
  
  describe('Interactive diagram showing building pressure and air leakage. Controls for outdoor temp, wind speed, exhaust fan, building height, and sealing gaps.');
}

function positionControls() {
  let col1 = margin + 110;
  let col2 = canvasWidth / 3 + 80;
  let col3 = 2 * canvasWidth / 3 + 80;
  
  let w = canvasWidth / 3 - 120;
  if (w < 50) w = 50;

  windDirBtn.position(margin, drawHeight + 10);
  sealTopCheckbox.position(margin + 150, drawHeight + 10);
  
  tempSlider.position(col1, drawHeight + 55);
  tempSlider.size(w);
  windSlider.position(col2, drawHeight + 55);
  windSlider.size(w);
  exhaustSlider.position(col3, drawHeight + 55);
  exhaustSlider.size(w);
  
  heightSlider.position(col1, drawHeight + 95);
  heightSlider.size(w);
}

function draw() {
  updateCanvasSize();
  
  let outTemp = tempSlider.value();
  let windSpd = windSlider.value();
  let exhaust = exhaustSlider.value();
  let bHeight = heightSlider.value();
  let topSealed = sealTopCheckbox.checked();
  
  let indoorTemp = 70; // Assumed
  
  // Simplified stack model
  // Delta P_stack = C * h * (1/T_out - 1/T_in)
  // At 30ft, -10F, it should be about 19 Pa total
  // T in Kelvin approx: -10F = 250K, 70F = 294K
  let K_out = (outTemp - 32) * 5/9 + 273.15;
  let K_in = (indoorTemp - 32) * 5/9 + 273.15;
  
  // Constant to yield ~19 Pa at 30ft and -10F
  let stackFactor = 3460;
  
  let totalStackPa = stackFactor * bHeight * (1/K_out - 1/K_in);
  
  // Neutral pressure plane height
  let nppFrac = topSealed ? 0.7 : 0.5; // If top sealed, npp moves up
  
  // Shift due to exhaust fan (moves NPP higher because negative pressure is induced)
  let exhaustShift = exhaust / 200; // arbitrary mapping
  nppFrac += exhaustShift * 0.05;
  if (nppFrac > 1) nppFrac = 1;
  
  let nppHeight = bHeight * nppFrac;
  
  // Wind pressure approx
  let windPa = 0.6 * (windSpd * 0.447) * (windSpd * 0.447); // P = 0.5 * rho * v^2 roughly
  
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  fill('black');
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('Building Pressure and Air Leakage', canvasWidth/2, 10);
  
  // Draw Building
  let bX = margin + 50;
  let bW = min(150, canvasWidth * 0.3);
  let floorH = 80;
  let numFloors = round(bHeight / 10); // visual representation
  if (numFloors < 1) numFloors = 1;
  if (numFloors > 6) numFloors = 6;
  
  let bY = drawHeight - margin - (numFloors * floorH);
  let bH = numFloors * floorH;
  
  stroke(100);
  strokeWeight(2);
  fill(240);
  rect(bX, bY, bW, bH);
  
  // Ground
  strokeWeight(4);
  line(margin, bY + bH, canvasWidth/2 + 50, bY + bH);
  
  // Draw Pressure Graph
  let gX = bX + bW + 40;
  let gW = canvasWidth - gX - margin;
  if (gW < 80) gW = 80;
  
  strokeWeight(1);
  stroke(150);
  line(gX + gW/2, bY, gX + gW/2, bY + bH); // 0 line
  
  // Gaps
  let gaps = [];
  for (let f = 0; f <= numFloors; f++) {
    let y = bY + bH - (f * floorH) - floorH/2;
    if (f === numFloors) y = bY; // roof gap
    
    // Left gap
    gaps.push({ x: bX, y: y, isTop: (f === numFloors), side: 'left' });
    // Right gap
    gaps.push({ x: bX + bW, y: y, isTop: (f === numFloors), side: 'right' });
  }
  
  // Draw NPP
  let nppY = bY + bH - (nppHeight / bHeight) * bH;
  stroke(100);
  drawingContext.setLineDash([5, 5]);
  line(bX - 20, nppY, gX + gW, nppY);
  drawingContext.setLineDash([]);
  
  noStroke();
  fill(100);
  textAlign(LEFT, BOTTOM);
  textSize(12);
  text('Neutral Pressure Plane', gX + gW/2 + 5, nppY - 2);
  
  let hoverGap = null;
  
  // Evaluate pressure at each height
  strokeWeight(2);
  for (let i = 0; i <= bH; i += 10) {
    let h = (bH - i) / bH * bHeight; // actual height in ft
    let pStack = stackFactor * (h - nppHeight) * (1/K_out - 1/K_in);
    
    // Graph line
    let pVal = pStack; // indoor relative to outdoor
    // Add exhaust shift generally
    pVal -= exhaust / 100; // negative pressure indoor
    
    let gpx = map(pVal, -30, 30, gX, gX + gW, true);
    
    if (pVal > 0) { stroke('#ff9800'); } // positive indoor (exfil)
    else { stroke('#2196f3'); } // negative indoor (infil)
    
    line(gX + gW/2, bY + i, gpx, bY + i);
  }
  
  // Gaps drawing
  for (let gap of gaps) {
    if (gap.isTop && topSealed) {
      fill(100);
      noStroke();
      rect(gap.x - 3, gap.y - 10, 6, 20); // sealed visual
      continue;
    }
    
    let h = (bY + bH - gap.y) / bH * bHeight;
    let pStack = stackFactor * (h - nppHeight) * (1/K_out - 1/K_in);
    let pIndoor = pStack - (exhaust / 100);
    
    let pOutLeft = 0;
    let pOutRight = 0;
    
    if (windSpd > 0) {
      if (windIsLeftToRight) {
        pOutLeft = windPa;
        pOutRight = -windPa * 0.5; // leeward suction
      } else {
        pOutLeft = -windPa * 0.5;
        pOutRight = windPa;
      }
    }
    
    let deltaP = 0; // indoor - outdoor
    if (gap.side === 'left') deltaP = pIndoor - pOutLeft;
    else deltaP = pIndoor - pOutRight;
    
    fill(255);
    stroke(100);
    rect(gap.x - 4, gap.y - 10, 8, 20); // gap opening
    
    // Flow arrow
    let arrowLen = map(abs(deltaP), 0, 40, 5, 40);
    if (arrowLen > 40) arrowLen = 40;
    
    strokeWeight(3);
    if (deltaP > 0) {
      // Exfiltration (indoor > outdoor) -> flow out
      stroke('#ff9800');
      fill('#ff9800');
      let outX = (gap.side === 'left') ? gap.x - arrowLen : gap.x + arrowLen;
      let startX = (gap.side === 'left') ? gap.x : gap.x;
      line(startX, gap.y, outX, gap.y);
      let tDir = (gap.side === 'left') ? -1 : 1;
      triangle(outX, gap.y, outX - tDir*5, gap.y - 5, outX - tDir*5, gap.y + 5);
    } else if (deltaP < 0) {
      // Infiltration (outdoor > indoor) -> flow in
      stroke('#2196f3');
      fill('#2196f3');
      let outX = (gap.side === 'left') ? gap.x - arrowLen : gap.x + arrowLen;
      let startX = gap.x;
      line(outX, gap.y, startX, gap.y);
      let tDir = (gap.side === 'left') ? 1 : -1;
      triangle(startX, gap.y, startX - tDir*5, gap.y - 5, startX - tDir*5, gap.y + 5);
    }
    
    if (dist(mouseX, mouseY, gap.x, gap.y) < 20) {
      hoverGap = { gap, deltaP };
    }
  }
  
  // Readout
  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Total Stack Pressure: ' + nf(totalStackPa, 1, 1) + ' Pa', margin, 50);
  
  if (topSealed) {
    fill(100);
    text('Sealing the top moves the neutral pressure plane upward\nand increases infiltration at the bottom.', margin, 75);
  }
  
  // Wind indicator
  if (windSpd > 0) {
    stroke(150);
    strokeWeight(2);
    let wx = windIsLeftToRight ? margin : bX + bW + 20;
    let wy = bY - 20;
    let wDir = windIsLeftToRight ? 1 : -1;
    line(wx, wy, wx + wDir*40, wy);
    line(wx, wy+10, wx + wDir*30, wy+10);
    line(wx, wy+20, wx + wDir*50, wy+20);
    noStroke();
    fill(100);
    textAlign(CENTER, BOTTOM);
    text('Wind', wx + wDir*20, wy - 5);
  }
  
  // Tooltip
  if (hoverGap) {
    let tx = mouseX + 15;
    let ty = mouseY + 15;
    if (tx + 150 > canvasWidth) tx = canvasWidth - 150;
    
    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(tx, ty, 150, 45, 5);
    
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    let flowDir = (hoverGap.deltaP > 0) ? 'Exfiltration (Out)' : 'Infiltration (In)';
    if (abs(hoverGap.deltaP) < 0.1) flowDir = 'Neutral';
    text(flowDir, tx + 10, ty + 10);
    textStyle(NORMAL);
    text('\u0394P: ' + nf(abs(hoverGap.deltaP), 1, 1) + ' Pa', tx + 10, ty + 25);
  }
  
  // Control Labels
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  
  let col1 = margin;
  let col2 = canvasWidth / 3 - 30;
  let col3 = 2 * canvasWidth / 3 - 30;
  
  text('Out Temp (°F): ' + outTemp, col1, drawHeight + 55);
  text('Wind (mph): ' + windSpd, col2, drawHeight + 55);
  text('Exhaust: ' + exhaust, col3, drawHeight + 55);
  
  text('Bldg Height (ft): ' + bHeight, col1, drawHeight + 95);
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
