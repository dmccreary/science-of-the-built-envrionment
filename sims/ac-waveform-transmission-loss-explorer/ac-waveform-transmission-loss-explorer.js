// CANVAS_HEIGHT: 600
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 180;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let phaseRadio;
let ltlCheckbox;
let rmsSlider;
let freqSlider;
let transVoltageSlider;
let loadPowerSlider;
let resistanceSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  // Row 1
  phaseRadio = createRadio();
  phaseRadio.option('1', 'Single-Phase');
  phaseRadio.option('3', 'Three-Phase');
  phaseRadio.selected('1');
  
  ltlCheckbox = createCheckbox('Show Line-to-Line', false);
  
  // Row 2
  rmsSlider = createSlider(120, 480, 120, 10);
  freqSlider = createSlider(50, 60, 60, 1);
  
  // Row 3
  transVoltageSlider = createSlider(1000, 100000, 10000, 1000);
  loadPowerSlider = createSlider(10, 1000, 100, 10);
  
  // Row 4
  resistanceSlider = createSlider(0.1, 5, 1, 0.1);
  
  positionControls();

  describe('Interactive diagram showing an AC waveform and power transmission loss. Controls for phases, voltage, frequency, transmission voltage, power, and line resistance.');
}

function positionControls() {
  let col1 = 120;
  let col2 = canvasWidth / 2 + 120;
  
  let w1 = canvasWidth / 2 - col1 - 10;
  let w2 = canvasWidth - col2 - margin;
  
  if (w1 < 50) w1 = 50;
  if (w2 < 50) w2 = 50;

  phaseRadio.position(margin, drawHeight + 10);
  ltlCheckbox.position(canvasWidth / 2, drawHeight + 10);
  
  rmsSlider.position(col1, drawHeight + 45);
  rmsSlider.size(w1);
  freqSlider.position(col2, drawHeight + 45);
  freqSlider.size(w2);
  
  transVoltageSlider.position(col1, drawHeight + 85);
  transVoltageSlider.size(w1);
  loadPowerSlider.position(col2, drawHeight + 85);
  loadPowerSlider.size(w2);
  
  resistanceSlider.position(col1, drawHeight + 125);
  resistanceSlider.size(w1);
}

function draw() {
  updateCanvasSize();
  
  let phaseMode = phaseRadio.value();
  let rmsV = rmsSlider.value();
  let freq = freqSlider.value();
  let transV = transVoltageSlider.value();
  let loadkW = loadPowerSlider.value();
  let res = resistanceSlider.value();
  let showLTL = ltlCheckbox.checked();
  
  let peakV = rmsV * Math.sqrt(2);
  let loadW = loadkW * 1000;
  
  // Current in transmission line
  let I = loadW / transV;
  // Power loss in line
  let lossW = I * I * res;
  let percentLoss = (lossW / loadW) * 100;
  if (percentLoss > 100) percentLoss = 100;
  
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Title
  fill('black');
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('AC Waveform and Transmission Loss', canvasWidth/2, 10);
  
  // Waveform Panel
  let wX = margin;
  let wY = 50;
  let wW = canvasWidth - margin * 2;
  let wH = 150;
  
  stroke(200);
  fill(255);
  rect(wX, wY, wW, wH);
  
  // Axes
  let midY = wY + wH/2;
  stroke(150);
  line(wX, midY, wX + wW, midY); // Time axis
  line(wX + 30, wY, wX + 30, wY + wH); // V axis
  
  noStroke();
  fill(100);
  textAlign(RIGHT, CENTER);
  textSize(12);
  text(nf(peakV, 1, 0) + 'V', wX + 28, wY + 20);
  text('-' + nf(peakV, 1, 0) + 'V', wX + 28, wY + wH - 20);
  
  // RMS lines
  stroke(180);
  drawingContext.setLineDash([5, 5]);
  let rmsY = map(rmsV, 0, peakV, midY, wY + 20);
  let negRmsY = map(-rmsV, -peakV, 0, wY + wH - 20, midY);
  line(wX + 30, rmsY, wX + wW, rmsY);
  line(wX + 30, negRmsY, wX + wW, negRmsY);
  drawingContext.setLineDash([]);
  
  noStroke();
  fill(100);
  text('RMS', wX + 28, rmsY);
  
  // Plot Waves
  let cycles = 2; // plot 2 cycles
  let maxTime = cycles / freq; // seconds
  
  noFill();
  strokeWeight(2);
  
  for (let phase = 0; phase < (phaseMode === '3' ? 3 : 1); phase++) {
    let offset = phase * (TWO_PI / 3);
    
    if (phase === 0) stroke('black');
    if (phase === 1) { stroke('red'); drawingContext.setLineDash([8, 4]); }
    if (phase === 2) { stroke('blue'); drawingContext.setLineDash([2, 4]); }
    
    beginShape();
    for (let px = wX + 30; px <= wX + wW; px++) {
      let t = map(px, wX + 30, wX + wW, 0, maxTime);
      let v = peakV * sin(TWO_PI * freq * t - offset);
      let py = map(v, -peakV, peakV, wY + wH - 20, wY + 20);
      vertex(px, py);
    }
    endShape();
  }
  drawingContext.setLineDash([]);
  
  if (phaseMode === '3' && showLTL) {
    stroke('purple');
    beginShape();
    for (let px = wX + 30; px <= wX + wW; px++) {
      let t = map(px, wX + 30, wX + wW, 0, maxTime);
      let vA = peakV * sin(TWO_PI * freq * t);
      let vB = peakV * sin(TWO_PI * freq * t - TWO_PI/3);
      let vLTL = vA - vB;
      let py = map(vLTL, -peakV, peakV, wY + wH - 20, wY + 20); // Note: peakV of LTL is larger
      vertex(px, py);
    }
    endShape();
    
    noStroke();
    fill('purple');
    textAlign(LEFT, TOP);
    text('L-L RMS = ' + nf(rmsV * Math.sqrt(3), 1, 0) + ' V', wX + 40, wY + 10);
  }
  
  // Transmission Panel
  let tY = wY + wH + 30;
  let tH = 150;
  
  stroke(200);
  fill(255);
  rect(wX, tY, wW, tH);
  
  // Drawing transmission
  stroke(100);
  strokeWeight(4);
  line(wX + 60, tY + 50, wX + wW - 60, tY + 50);
  
  noStroke();
  fill(50);
  rect(wX + 20, tY + 20, 40, 60, 5); // Source
  rect(wX + wW - 60, tY + 20, 40, 60, 5); // Load
  
  fill('black');
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Source', wX + 40, tY + 18);
  text('Load', wX + wW - 40, tY + 18);
  
  textAlign(CENTER, TOP);
  text(nf(transV, 1, 0) + ' V', wX + wW/2, tY + 30);
  text(nf(I, 1, 2) + ' A', wX + wW/2, tY + 60);
  
  // Bar Graph for power
  let bY = tY + 110;
  let maxWGraph = wW - 80;
  let deliveredWGraph = maxWGraph * (1 - percentLoss/100);
  let lossWGraph = maxWGraph * (percentLoss/100);
  
  if (percentLoss >= 100) {
    deliveredWGraph = 0;
    lossWGraph = maxWGraph;
  }
  
  fill('#4caf50'); // green
  rect(wX + 40, bY, deliveredWGraph, 20);
  fill('#ff9800'); // orange
  rect(wX + 40 + deliveredWGraph, bY, lossWGraph, 20);
  
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Delivered: ' + nf(loadkW, 1, 1) + ' kW', wX + 40, bY - 10);
  text('Lost: ' + nf(lossW/1000, 1, 2) + ' kW (' + nf(percentLoss, 1, 2) + '%)', wX + 40 + deliveredWGraph - 20, bY + 30);
  
  // Controls Labels
  textAlign(LEFT, CENTER);
  textSize(14);
  fill('black');
  
  // Phase and Checkbox labels are handled by the controls themselves, except radio buttons sometimes need help.
  text('System:', margin, drawHeight + 5);
  
  text('RMS Volt: ' + rmsV + ' V', margin, drawHeight + 55);
  text('Freq: ' + freq + ' Hz', canvasWidth / 2, drawHeight + 55);
  
  text('Trans Volt: ' + nf(transV, 1, 0) + ' V', margin, drawHeight + 95);
  text('Load Pwr: ' + loadkW + ' kW', canvasWidth / 2, drawHeight + 95);
  
  text('Line Res: ' + nf(res, 1, 1) + ' Ω', margin, drawHeight + 135);
  
  if (phaseMode === '1') {
    ltlCheckbox.hide();
  } else {
    ltlCheckbox.show();
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
