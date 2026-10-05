// CANVAS_HEIGHT: 550
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let traceButton;
let traceStep = -1;
let traceTimer = 0;

const rings = [
  { name: 'Region', color: '#c8e6c9', textColor: '#000000', example: 'Metro Area', concern: 'Water supply, transportation', def: 'A large geographical area sharing resources and infrastructure.', fail: 'If the region fails, supply chains and utilities break down.' },
  { name: 'Neighborhood', color: '#a5d6a7', textColor: '#000000', example: 'School District', concern: 'Walkability, zoning', def: 'A collection of buildings and the spaces between them.', fail: 'If the neighborhood fails, transportation becomes inefficient.' },
  { name: 'Building', color: '#81c784', textColor: '#000000', example: 'School', concern: 'Energy use intensity', def: 'A complete structure providing shelter and function.', fail: 'If the building fails, occupants are unsafe or uncomfortable.' },
  { name: 'Component', color: '#4caf50', textColor: '#ffffff', example: 'Wall Assembly', concern: 'Heat transfer', def: 'A combination of materials forming a specific part of a building.', fail: 'If a wall fails, moisture enters the building.' },
  { name: 'Material', color: '#2e7d32', textColor: '#ffffff', example: 'Concrete', concern: 'Compressive strength', def: 'The raw substances used to construct elements.', fail: 'If concrete fails, the foundation cracks.' }
];

// Re-ordered to draw from outside to inside
let selectedRing = -1; // Index in the rings array
let hoverRing = -1;
let traceRingName = "";

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  traceButton = createButton('Trace the classroom');
  traceButton.position(10, drawHeight + 10);
  traceButton.mousePressed(startTrace);
  
  describe('Interactive diagram showing 5 scales of the built environment: Material, Component, Building, Neighborhood, Region.');
}

function startTrace() {
  traceStep = 0;
  traceTimer = millis();
  selectedRing = -1;
}

function draw() {
  updateCanvasSize();
  
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  fill('black');
  textSize(24);
  textAlign(CENTER, TOP);
  noStroke();
  text('Scales of the Built Environment', canvasWidth/2, 10);
  
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  
  // Update trace animation
  if (traceStep >= 0) {
    if (millis() - traceTimer > 3000) {
      traceStep++;
      traceTimer = millis();
      if (traceStep > 4) {
        traceStep = -1; // End trace
        traceRingName = "";
      }
    }
    if (traceStep >= 0) {
      // Find the ring index (0 is Region, 4 is Material)
      // The trace example from classroom usually goes: Material -> Component -> Building -> Neighborhood
      const traceNames = ['Material', 'Component', 'Building', 'Neighborhood', 'Region'];
      traceRingName = traceNames[traceStep];
    }
  }

  // Draw concentric rings
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 20;
  let maxW = min(canvasWidth - 40, 600);
  let maxH = drawHeight - 100;
  
  hoverRing = -1;
  let ringFound = false;
  
  for (let i = 0; i < rings.length; i++) {
    let r = rings[i];
    let w = maxW * ((rings.length - i) / rings.length);
    let h = maxH * ((rings.length - i) / rings.length);
    
    // Check hover (if not already found a smaller hovered ring)
    let isHover = false;
    if (!ringFound && mouseX > cx - w/2 && mouseX < cx + w/2 && mouseY > cy - h/2 && mouseY < cy + h/2) {
      if (mouseY < drawHeight) {
        hoverRing = i;
        isHover = true;
        ringFound = true;
      }
    }
    
    // Determine highlight
    let highlight = false;
    if (selectedRing === i) highlight = true;
    if (traceRingName === r.name) highlight = true;
    if (hoverRing === i && traceStep === -1) highlight = true;
    
    if (highlight) {
      strokeWeight(3);
      stroke('#ff9800');
    } else {
      strokeWeight(1);
      stroke('silver');
    }
    
    fill(r.color);
    rect(cx - w/2, cy - h/2, w, h, 15);
    
    noStroke();
    fill(r.textColor);
    textAlign(CENTER, TOP);
    textSize(16);
    if (highlight) {
      textStyle(BOLD);
    } else {
      textStyle(NORMAL);
    }
    text(r.name, cx, cy - h/2 + 10);
    textStyle(NORMAL);
  }
  
  // Draw Tooltip (only if hovering, no trace, no selection active)
  if (hoverRing !== -1 && traceStep === -1 && selectedRing === -1 && mouseY < drawHeight) {
    let r = rings[hoverRing];
    let tw = 250;
    let th = 70;
    let tx = mouseX;
    let ty = mouseY - th - 10;
    if (tx + tw > canvasWidth) tx = canvasWidth - tw - 10;
    if (ty < 50) ty = mouseY + 20;
    
    stroke(150);
    strokeWeight(1);
    fill(255, 255, 255, 240);
    rect(tx, ty, tw, th, 5);
    
    noStroke();
    fill(0);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(r.name, tx + 10, ty + 10);
    textStyle(NORMAL);
    textSize(14);
    text('Example: ' + r.example, tx + 10, ty + 30);
    text('Concern: ' + r.concern, tx + 10, ty + 45);
  }
  
  // Draw Infobox in Control Region
  fill(250);
  stroke(200);
  rect(10, drawHeight + 50, canvasWidth - 20, 90, 8);
  
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(14);
  
  if (traceStep >= 0) {
    let r = rings.find(x => x.name === traceRingName);
    if (r) {
      textStyle(BOLD);
      text('Tracing: ' + r.name, 20, drawHeight + 60);
      textStyle(NORMAL);
      let traceDesc = '';
      if (r.name === 'Material') traceDesc = 'January classroom example: Steel and concrete used in construction.';
      else if (r.name === 'Component') traceDesc = 'January classroom example: The HVAC ductwork and insulated windows.';
      else if (r.name === 'Building') traceDesc = 'January classroom example: The school building enclosing the classroom.';
      else if (r.name === 'Neighborhood') traceDesc = 'January classroom example: The power grid and local streets serving the school.';
      else if (r.name === 'Region') traceDesc = 'January classroom example: The regional power plant supplying the grid.';
      text(traceDesc, 20, drawHeight + 80, canvasWidth - 40);
    }
  } else if (selectedRing !== -1) {
    let r = rings[selectedRing];
    textStyle(BOLD);
    text(r.name, 20, drawHeight + 60);
    textStyle(NORMAL);
    text(r.def, 20, drawHeight + 80, canvasWidth - 40);
    fill(180, 0, 0);
    text(r.fail, 20, drawHeight + 115, canvasWidth - 40);
  } else {
    fill(100);
    text('Click a scale to view details, or click "Trace the classroom".', 20, drawHeight + 60);
  }
}

function mousePressed() {
  if (mouseY < drawHeight && traceStep === -1) {
    if (hoverRing !== -1) {
      // Toggle selection
      if (selectedRing === hoverRing) {
        selectedRing = -1;
      } else {
        selectedRing = hoverRing;
      }
    } else {
      selectedRing = -1;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
