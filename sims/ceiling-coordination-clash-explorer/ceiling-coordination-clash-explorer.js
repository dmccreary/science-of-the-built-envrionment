// CANVAS_HEIGHT: 650
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let sysVisible = {
  Structure: true,
  Duct: true,
  Plumbing: true,
  Electrical: true,
  Lighting: true
};

let checkboxes = {};
let ductDepthSlider;
let ceilHeightSlider;
let checkButton;

let elements = [
  { id: 'beam1', sys: 'Structure', x: 100, y: 50, w: 40, h: 100, color: '#8d6e63', drag: false },
  { id: 'beam2', sys: 'Structure', x: 300, y: 50, w: 40, h: 100, color: '#8d6e63', drag: false },
  { id: 'duct', sys: 'Duct', x: 150, y: 100, w: 100, h: 40, color: '#64b5f6', drag: false },
  { id: 'pipe', sys: 'Plumbing', x: 200, y: 160, w: 60, h: 20, color: '#4caf50', drag: false },
  { id: 'tray', sys: 'Electrical', x: 160, y: 190, w: 80, h: 15, color: '#ffb74d', drag: false },
  { id: 'light', sys: 'Lighting', x: 220, y: 220, w: 60, h: 25, color: '#fff176', drag: false }
];

let ceilingBaseY = 300; // y pos of ceiling grid
let draggingEl = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

let clashResult = "";
let clashes = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  let cbX = margin;
  ['Structure', 'Duct', 'Plumbing', 'Electrical', 'Lighting'].forEach((sys, i) => {
    let cb = createCheckbox(sys, true);
    cb.changed(() => { sysVisible[sys] = cb.checked(); });
    checkboxes[sys] = cb;
  });
  
  ductDepthSlider = createSlider(8, 24, 16, 2);
  ceilHeightSlider = createSlider(8, 12, 10, 0.5);
  
  checkButton = createButton('Run Clash Check');
  checkButton.mousePressed(runClashCheck);
  
  positionControls();
  
  describe('Interactive diagram showing a ceiling space cross-section. Users can drag ducts, pipes, and lights to resolve coordination clashes.');
}

function positionControls() {
  let cbX = margin;
  Object.values(checkboxes).forEach((cb, i) => {
    cb.position(cbX, drawHeight + 10);
    cbX += 90;
    if (cbX > canvasWidth - 80) cbX = canvasWidth - 80;
  });
  
  ductDepthSlider.position(margin + 120, drawHeight + 55);
  ductDepthSlider.size(150);
  
  ceilHeightSlider.position(margin + 120, drawHeight + 95);
  ceilHeightSlider.size(150);
  
  checkButton.position(margin, drawHeight + 125);
}

function runClashCheck() {
  clashResult = "Checking...";
  checkClashes();
  if (clashes.length === 0) {
    clashResult = "Coordinated: all systems fit with clearance.";
  } else {
    clashResult = `Found ${clashes.length} clashes. Priority: Gravity pipe > Large duct > Tray > Lights.`;
  }
}

function checkClashes() {
  clashes = [];
  
  // Update duct height dynamically
  let ductEl = elements.find(e => e.id === 'duct');
  if (ductEl) ductEl.h = map(ductDepthSlider.value(), 8, 24, 20, 60);
  
  // Also ceiling grid y
  let cHeight = ceilHeightSlider.value();
  ceilingBaseY = map(cHeight, 8, 12, 350, 250);
  
  for (let i = 0; i < elements.length; i++) {
    for (let j = i + 1; j < elements.length; j++) {
      let e1 = elements[i];
      let e2 = elements[j];
      
      if (!sysVisible[e1.sys] || !sysVisible[e2.sys]) continue;
      
      // Rect intersection
      if (e1.x < e2.x + e2.w && e1.x + e1.w > e2.x &&
          e1.y < e2.y + e2.h && e1.y + e1.h > e2.y) {
        clashes.push({e1, e2});
      }
    }
    
    // Check clash with ceiling grid
    let e = elements[i];
    if (sysVisible[e.sys] && e.id !== 'light') { // Lights are allowed to touch ceiling
      if (e.y + e.h > ceilingBaseY) {
        clashes.push({e1: e, e2: {id: 'ceiling', sys: 'Ceiling', x: 0, y: ceilingBaseY, w: canvasWidth, h: 5}});
      }
    }
  }
}

function draw() {
  updateCanvasSize();
  
  // Continuous check for visual feedback
  checkClashes();
  
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  fill('black');
  textSize(22);
  textAlign(CENTER, TOP);
  noStroke();
  text('Ceiling Coordination Clash Explorer', canvasWidth/2, 10);
  
  // Draw depth scale
  stroke(150);
  line(margin, 50, margin, 380);
  for(let i=50; i<=380; i+=20) {
    line(margin-5, i, margin+5, i);
  }
  
  // Roof slab
  fill(220);
  stroke(150);
  rect(margin + 20, 30, canvasWidth - margin*2 - 20, 20);
  
  // Ceiling Grid
  stroke(150);
  strokeWeight(2);
  drawingContext.setLineDash([10, 5]);
  line(margin + 20, ceilingBaseY, canvasWidth - margin, ceilingBaseY);
  drawingContext.setLineDash([]);
  noStroke();
  fill(100);
  textAlign(RIGHT, BOTTOM);
  text('Ceiling Grid', canvasWidth - margin - 5, ceilingBaseY - 5);
  
  let hoverMsg = "";
  
  // Draw elements
  for (let e of elements) {
    if (!sysVisible[e.sys]) continue;
    
    let isClashing = clashes.some(c => c.e1.id === e.id || c.e2.id === e.id);
    
    fill(e.color);
    if (isClashing) {
      stroke('#f44336'); // red
      strokeWeight(3);
    } else {
      stroke(50);
      strokeWeight(1);
    }
    
    // Some specific drawing rules
    if (e.id === 'light') {
      rect(e.x, e.y, e.w, e.h, 0, 0, 10, 10); // rounded bottom
    } else if (e.id === 'pipe') {
      ellipse(e.x + e.w/2, e.y + e.h/2, e.w, e.h); // oval cross section
    } else {
      rect(e.x, e.y, e.w, e.h);
    }
    
    if (mouseX > e.x && mouseX < e.x + e.w && mouseY > e.y && mouseY < e.y + e.h) {
      if (isClashing) {
        hoverMsg = `${e.sys} has a clash! Try moving it.`;
      } else {
        hoverMsg = `${e.sys} - clear`;
      }
    }
  }
  
  // Control Panel
  fill('black');
  textAlign(LEFT, CENTER);
  textSize(14);
  
  text(`Duct depth (in): ${ductDepthSlider.value()}`, margin, drawHeight + 55);
  text(`Ceil height (ft): ${ceilHeightSlider.value()}`, margin, drawHeight + 95);
  
  if (clashResult) {
    if (clashes.length === 0) fill('#2e7d32');
    else fill('#c62828');
    text(clashResult, margin + 140, drawHeight + 135);
  }
  
  // Hover Tooltip
  if (hoverMsg && !draggingEl) {
    let tx = mouseX + 15;
    let ty = mouseY + 15;
    fill(255, 255, 255, 220);
    stroke(150);
    strokeWeight(1);
    rect(tx, ty, textWidth(hoverMsg) + 20, 25, 3);
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    text(hoverMsg, tx + 10, ty + 5);
  }
}

function mousePressed() {
  if (mouseY < drawHeight) {
    // Top element gets picked (reverse order)
    for (let i = elements.length - 1; i >= 0; i--) {
      let e = elements[i];
      if (sysVisible[e.sys] && mouseX > e.x && mouseX < e.x + e.w && mouseY > e.y && mouseY < e.y + e.h) {
        draggingEl = e;
        dragOffsetX = mouseX - e.x;
        dragOffsetY = mouseY - e.y;
        clashResult = ""; // clear check result
        break;
      }
    }
  }
}

function mouseDragged() {
  if (draggingEl) {
    draggingEl.x = mouseX - dragOffsetX;
    draggingEl.y = mouseY - dragOffsetY;
    
    // Bounds check
    if (draggingEl.x < margin + 20) draggingEl.x = margin + 20;
    if (draggingEl.x + draggingEl.w > canvasWidth - margin) draggingEl.x = canvasWidth - margin - draggingEl.w;
    if (draggingEl.y < 50) draggingEl.y = 50;
    if (draggingEl.y + draggingEl.h > drawHeight - 10) draggingEl.y = drawHeight - 10 - draggingEl.h;
  }
}

function mouseReleased() {
  draggingEl = null;
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
