// CANVAS_HEIGHT: 580
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let breakerSelect;
let wireSelect;
let device1; // 1500W heater
let device2; // 300W computer
let device3; // 900W microwave
let device4; // 600W lighting
let hoursSlider;
let shortBtn;

let isTripped = false;
let overCurrentTimer = 0;
let tripTimeRequired = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  breakerSelect = createSelect();
  breakerSelect.option('15 A Breaker', '15');
  breakerSelect.option('20 A Breaker', '20');
  breakerSelect.selected('15');
  
  wireSelect = createSelect();
  wireSelect.option('14 AWG Wire', '14');
  wireSelect.option('12 AWG Wire', '12');
  wireSelect.selected('14');
  
  device1 = createCheckbox('1500W Heater', false);
  device2 = createCheckbox('300W Computers', false);
  device3 = createCheckbox('900W Microwave', false);
  device4 = createCheckbox('600W Lighting', false);
  
  hoursSlider = createSlider(0.5, 8, 1, 0.5);
  
  shortBtn = createButton('Create Short Circuit');
  shortBtn.mousePressed(() => {
    isTripped = true;
  });
  
  let resetBtn = createButton('Reset Breaker');
  resetBtn.mousePressed(() => {
    isTripped = false;
    overCurrentTimer = 0;
  });
  
  positionControls(resetBtn);
  
  describe('Interactive circuit breaker and continuous load explorer. Users can connect devices, set continuous hours, and trigger trips via overload or short circuit.');
}

function positionControls(resetBtn) {
  let col1 = margin;
  let col2 = canvasWidth / 2;
  
  breakerSelect.position(col1, drawHeight + 10);
  wireSelect.position(col2, drawHeight + 10);
  
  device1.position(col1, drawHeight + 45);
  device2.position(col2, drawHeight + 45);
  device3.position(col1, drawHeight + 70);
  device4.position(col2, drawHeight + 70);
  
  hoursSlider.position(col1 + 100, drawHeight + 100);
  hoursSlider.size(150);
  
  shortBtn.position(col1, drawHeight + 140);
  if(resetBtn) resetBtn.position(col2, drawHeight + 140);
}

function draw() {
  updateCanvasSize();
  
  let rating = parseInt(breakerSelect.value());
  let wire = parseInt(wireSelect.value());
  let hours = hoursSlider.value();
  let isContinuous = (hours >= 3);
  
  let totalWatts = 0;
  if (device1.checked() && !isTripped) totalWatts += 1500;
  if (device2.checked() && !isTripped) totalWatts += 300;
  if (device3.checked() && !isTripped) totalWatts += 900;
  if (device4.checked() && !isTripped) totalWatts += 600;
  
  let current = totalWatts / 120; // 120V system
  let loadLimit = isContinuous ? rating * 0.8 : rating;
  
  let statusMsg = "System OK";
  let statusColor = '#4caf50';
  
  if (isTripped) {
    statusMsg = "BREAKER TRIPPED!";
    statusColor = '#f44336';
    current = 0;
  } else if (current > rating) {
    statusMsg = "OVERLOAD! Breaker heating up...";
    statusColor = '#ff9800';
    if (overCurrentTimer === 0) {
      overCurrentTimer = millis();
      // simplified trip time curve (faster for larger overloads)
      tripTimeRequired = map(current / rating, 1, 2, 5000, 1000); 
      if (tripTimeRequired < 1000) tripTimeRequired = 1000;
    } else {
      if (millis() - overCurrentTimer > tripTimeRequired) {
        isTripped = true; // thermal trip
      }
    }
  } else if (isContinuous && current > loadLimit) {
    statusMsg = "Warning: Over continuous load limit (80%)";
    statusColor = '#ff9800';
    overCurrentTimer = 0;
  } else {
    overCurrentTimer = 0;
  }
  
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  fill('black');
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('Circuit Breaker & Continuous Load', canvasWidth/2, 10);
  
  // Warnings
  if (wire === 14 && rating === 20) {
    fill('#f44336');
    textSize(14);
    textStyle(BOLD);
    text('FIRE HAZARD: 14 AWG wire is too small for a 20 A breaker!', canvasWidth/2, 40);
    textStyle(NORMAL);
  }
  
  // Circuit diagram
  let cY = 120;
  stroke(50);
  strokeWeight(3);
  
  // Source to breaker
  line(margin, cY, margin + 40, cY);
  
  // Breaker
  fill(isTripped ? '#f44336' : '#e0e0e0');
  rect(margin + 40, cY - 20, 60, 40, 5);
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER, CENTER);
  text(rating + 'A', margin + 70, cY);
  
  // Breaker switch position
  stroke(0);
  strokeWeight(4);
  if (isTripped) {
    line(margin + 60, cY - 10, margin + 80, cY); // down/middle position
  } else {
    line(margin + 60, cY - 15, margin + 80, cY - 15); // ON
  }
  
  // Wire to loads
  stroke(wire === 14 ? 100 : 50); // visually thicker for 12 AWG
  strokeWeight(wire === 14 ? 3 : 5);
  line(margin + 100, cY, canvasWidth - 40, cY);
  
  // Outlets
  noFill();
  stroke(0);
  strokeWeight(2);
  for(let i=0; i<3; i++) {
    let ox = margin + 160 + i*70;
    line(ox, cY, ox, cY + 20);
    fill(240);
    rect(ox - 15, cY + 20, 30, 40, 3);
    fill(0);
    ellipse(ox - 5, cY + 30, 5, 8);
    ellipse(ox + 5, cY + 30, 5, 8);
    ellipse(ox, cY + 45, 5, 5); // ground
  }
  
  // Heat effect on wire if overloading
  if (current > rating && !isTripped) {
    stroke(255, 0, 0, 150 + 100 * sin(millis()/100));
    line(margin + 100, cY, canvasWidth - 40, cY);
  }
  
  // Meter panel
  let mX = margin;
  let mY = 190;
  fill(250);
  stroke(200);
  strokeWeight(1);
  rect(mX, mY, canvasWidth - margin*2, 90, 5);
  
  fill(statusColor);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(16);
  textStyle(BOLD);
  text(statusMsg, mX + 15, mY + 15);
  textStyle(NORMAL);
  
  fill(0);
  textSize(24);
  text(nf(current, 1, 1) + ' A', mX + 15, mY + 45);
  
  textSize(14);
  let totalW = isTripped ? 0 : totalWatts;
  text(totalW + ' W / 120 V', mX + 120, mY + 52);
  
  // Time-current visualization
  let gY = 300;
  let gH = 80;
  stroke(150);
  line(mX, gY + gH, canvasWidth - margin, gY + gH); // axis
  
  // Tick marks
  fill(100);
  noStroke();
  textAlign(CENTER, TOP);
  for (let i = 0; i <= rating + 10; i += 5) {
    let tx = map(i, 0, rating + 10, mX, canvasWidth - margin);
    stroke(200);
    line(tx, gY, tx, gY + gH);
    noStroke();
    text(i, tx, gY + gH + 5);
  }
  
  // 80% line
  if (isContinuous) {
    let lX = map(rating * 0.8, 0, rating + 10, mX, canvasWidth - margin);
    stroke('#ff9800');
    drawingContext.setLineDash([5, 5]);
    strokeWeight(2);
    line(lX, gY, lX, gY + gH);
    drawingContext.setLineDash([]);
    noStroke();
    fill('#ff9800');
    text('80% limit', lX, gY - 15);
  }
  
  // Trip line
  let rX = map(rating, 0, rating + 10, mX, canvasWidth - margin);
  stroke('#f44336');
  strokeWeight(2);
  line(rX, gY, rX, gY + gH);
  noStroke();
  fill('#f44336');
  text('Rating', rX, gY - 15);
  
  // Current operating point
  let currX = map(current, 0, rating + 10, mX, canvasWidth - margin);
  if (currX > canvasWidth - margin) currX = canvasWidth - margin; // cap it
  fill('blue');
  triangle(currX, gY + gH, currX - 8, gY + gH - 15, currX + 8, gY + gH - 15);
  
  // Control Panel Labels
  fill(0);
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Operating Hours: ' + nf(hours, 1, 1), margin, drawHeight + 105);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  // Re-fetch the reset button using DOM if needed or just accept default positioning
  let resetBtn = selectAll('button').find(b => b.html() === 'Reset Breaker');
  positionControls(resetBtn);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
