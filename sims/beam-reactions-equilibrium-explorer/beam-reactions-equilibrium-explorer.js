// CANVAS_HEIGHT: 550
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let spanSlider;
let loadSlider;
let distSlider;
let loadTypeRadio;
let removeSupportCheckbox;
let stepButton;

let eqStep = 0; // 0=none, 1=sumFx, 2=sumFy, 3=sumM

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Row 1
  loadTypeRadio = createRadio();
  loadTypeRadio.option('P', 'Point Load');
  loadTypeRadio.option('U', 'Uniform Load');
  loadTypeRadio.selected('P');
  
  removeSupportCheckbox = createCheckbox('Remove Support B', false);
  
  // Row 2
  spanSlider = createSlider(10, 60, 40, 1);
  loadSlider = createSlider(0, 12000, 6000, 100);
  distSlider = createSlider(0, 40, 20, 0.5); // Max updated in draw
  
  // Row 3
  stepButton = createButton('Step Through Equations');
  stepButton.mousePressed(() => {
    eqStep = (eqStep + 1) % 4;
  });
  
  positionControls();
  
  describe('Interactive beam showing support reactions and equilibrium conditions. Features a point or uniform load, and sliders to control span, load magnitude, and position.');
}

function positionControls() {
  let col1 = margin + 110;
  let col2 = canvasWidth / 2 + 110;
  
  let w1 = canvasWidth / 2 - col1 - 10;
  let w2 = canvasWidth - col2 - margin;
  if (w1 < 50) w1 = 50;
  if (w2 < 50) w2 = 50;

  loadTypeRadio.position(margin, drawHeight + 10);
  removeSupportCheckbox.position(canvasWidth / 2, drawHeight + 10);
  
  spanSlider.position(col1, drawHeight + 45);
  spanSlider.size(w1);
  loadSlider.position(col2, drawHeight + 45);
  loadSlider.size(w2);
  
  distSlider.position(col1, drawHeight + 85);
  distSlider.size(w1);
  
  stepButton.position(margin, drawHeight + 115);
}

function draw() {
  updateCanvasSize();
  
  let span = spanSlider.value();
  let load = loadSlider.value();
  let loadType = loadTypeRadio.value();
  let distA = distSlider.value();
  let missingB = removeSupportCheckbox.checked();
  
  // Update distSlider max dynamically based on span
  // Ensure it doesn't exceed span
  // Note: distSlider.attribute('max', span) is cleaner, but we can do it via logic
  if (distA > span) {
    distA = span;
    distSlider.value(span);
  }
  
  // Calculate reactions
  let P = load;
  let W = load * span; // if uniform load
  
  let R_A = 0;
  let R_B = 0;
  let totalLoad = (loadType === 'P') ? load : (load * span);
  let momentArm = (loadType === 'P') ? distA : (span / 2);
  
  if (!missingB) {
    R_B = (totalLoad * momentArm) / span;
    R_A = totalLoad - R_B;
  } else {
    R_A = totalLoad; // Vertical sum holds, but moment sum doesn't if load != 0
    R_B = 0;
  }
  
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Title
  fill('black');
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('Beam Reactions and Equilibrium', canvasWidth/2, 10);
  
  // Draw beam
  let beamY = 200;
  let startX = margin + 20;
  let endX = startX + min(canvasWidth - 250, 400); // leave right panel for equations
  let beamWidth = endX - startX;
  
  strokeWeight(4);
  
  if (missingB && momentArm > 0 && totalLoad > 0) {
    // Rotate beam downwards about A
    push();
    translate(startX, beamY);
    rotate(PI/12); // arbitrary rotation
    stroke('#8d6e63'); // brown
    line(0, 0, beamWidth, 0);
    
    // Support A
    noStroke();
    fill(100);
    triangle(-10, 20, 10, 20, 0, 0);
    rect(-15, 20, 30, 5);
    pop();
  } else {
    // Normal beam
    stroke('#8d6e63'); // brown
    line(startX, beamY, endX, beamY);
    
    // Support A
    noStroke();
    fill(100);
    triangle(startX - 10, beamY + 20, startX + 10, beamY + 20, startX, beamY);
    rect(startX - 15, beamY + 20, 30, 5);
    
    // Support B
    if (!missingB) {
      triangle(endX - 10, beamY + 15, endX + 10, beamY + 15, endX, beamY);
      ellipse(endX - 5, beamY + 20, 10, 10);
      ellipse(endX + 5, beamY + 20, 10, 10);
      rect(endX - 15, beamY + 25, 30, 5);
    }
    
    // Load arrow
    stroke('#ff9800'); // orange
    strokeWeight(3);
    fill('#ff9800');
    
    if (loadType === 'P') {
      let loadX = startX + (distA / span) * beamWidth;
      let arrowH = map(load, 0, 12000, 10, 80);
      if (load > 0) {
        line(loadX, beamY - arrowH - 10, loadX, beamY - 5);
        triangle(loadX - 5, beamY - 15, loadX + 5, beamY - 15, loadX, beamY - 5);
        noStroke();
        textAlign(CENTER, BOTTOM);
        text(load + ' lb', loadX, beamY - arrowH - 15);
      }
    } else {
      // Uniform load
      let arrowH = map(load, 0, 12000, 10, 80); // simplified scale for display
      if (load > 0) {
        let numArrows = 10;
        for (let i = 0; i <= numArrows; i++) {
          let lx = startX + (i / numArrows) * beamWidth;
          stroke('#ff9800');
          line(lx, beamY - arrowH - 10, lx, beamY - 5);
          triangle(lx - 4, beamY - 12, lx + 4, beamY - 12, lx, beamY - 5);
        }
        stroke('#ff9800');
        line(startX, beamY - arrowH - 10, endX, beamY - arrowH - 10);
        noStroke();
        textAlign(CENTER, BOTTOM);
        text(load + ' plf (Total: ' + (load*span) + ' lb)', startX + beamWidth/2, beamY - arrowH - 15);
      }
    }
    
    // Reaction A arrow
    stroke('#4caf50'); // green
    fill('#4caf50');
    let rAh = map(R_A, 0, 12000, 10, 80);
    if (R_A > 0) {
      line(startX, beamY + 30, startX, beamY + 30 + rAh);
      triangle(startX - 5, beamY + 40, startX + 5, beamY + 40, startX, beamY + 30);
      noStroke();
      textAlign(CENTER, TOP);
      text(nf(R_A, 1, 0) + ' lb', startX, beamY + 35 + rAh);
    }
    
    // Reaction B arrow
    if (!missingB && R_B > 0) {
      stroke('#4caf50');
      fill('#4caf50');
      let rBh = map(R_B, 0, 12000, 10, 80);
      line(endX, beamY + 30, endX, beamY + 30 + rBh);
      triangle(endX - 5, beamY + 40, endX + 5, beamY + 40, endX, beamY + 30);
      noStroke();
      textAlign(CENTER, TOP);
      text(nf(R_B, 1, 0) + ' lb', endX, beamY + 35 + rBh);
    }
  }
  
  // Dimensions
  if (!missingB) {
    stroke(150);
    strokeWeight(1);
    line(startX, beamY + 110, endX, beamY + 110);
    line(startX, beamY + 100, startX, beamY + 120);
    line(endX, beamY + 100, endX, beamY + 120);
    noStroke();
    fill(100);
    textAlign(CENTER, BOTTOM);
    text(span + ' ft', startX + beamWidth/2, beamY + 105);
    
    if (loadType === 'P') {
      let loadX = startX + (distA / span) * beamWidth;
      stroke(150);
      line(startX, beamY + 130, loadX, beamY + 130);
      line(loadX, beamY + 120, loadX, beamY + 140);
      noStroke();
      text(distA + ' ft', startX + (loadX - startX)/2, beamY + 125);
    }
  }
  
  // Equations Panel (Right side)
  let pX = endX + 20;
  if (pX < canvasWidth - 200) pX = canvasWidth - 200;
  let pY = 50;
  
  stroke(200);
  fill(255, 255, 255, 230);
  rect(pX, pY, 180, 160, 5);
  
  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Equilibrium:', pX + 10, pY + 10);
  textStyle(NORMAL);
  
  let momentSum = (R_B * span) - (totalLoad * momentArm);
  let isEq = (!missingB || totalLoad === 0);
  
  if (eqStep >= 1) {
    text('\u03A3Fx = 0', pX + 10, pY + 35);
    text(' 0 = 0 (No horiz force)', pX + 20, pY + 50);
  }
  if (eqStep >= 2) {
    text('\u03A3Fy = 0', pX + 10, pY + 70);
    let forceSum = R_A + R_B - totalLoad;
    text(` ${nf(R_A, 1, 0)} + ${nf(R_B, 1, 0)} - ${nf(totalLoad, 1, 0)} = ${nf(forceSum, 1, 0)}`, pX + 20, pY + 85);
  }
  if (eqStep >= 3) {
    text('\u03A3Ma = 0', pX + 10, pY + 105);
    text(` (${nf(R_B, 1, 0)} \u00D7 ${span}) - (${nf(totalLoad, 1, 0)} \u00D7 ${momentArm})`, pX + 20, pY + 120);
    text(` = ${nf(momentSum, 1, 0)}`, pX + 20, pY + 135);
  }
  
  if (eqStep === 0) {
    fill(100);
    text('Click "Step Through"\nto view equations.', pX + 10, pY + 40);
  }
  
  // Status check
  if (isEq) {
    fill('#4caf50');
    textStyle(BOLD);
    text('STATUS: EQUILIBRIUM', pX + 10, pY + 180);
    textStyle(NORMAL);
  } else {
    fill('#f44336');
    textStyle(BOLD);
    text('STATUS: FAILS (ROTATES)', pX + 10, pY + 180);
    textStyle(NORMAL);
    fill('#c62828');
    text('Moment equation not satisfied.', pX + 10, pY + 200, 180);
  }
  
  // Controls Labels
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  
  text('Beam span (ft): ' + span, margin, drawHeight + 55);
  text('Load ' + (loadType==='P' ? '(lb)' : '(plf)') + ': ' + load, canvasWidth / 2, drawHeight + 55);
  
  if (loadType === 'P') {
    distSlider.show();
    text('Dist from A (ft): ' + distA, margin, drawHeight + 95);
  } else {
    distSlider.hide();
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
