// CANVAS_HEIGHT: 600
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 160;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

let whatIfSelect;
let infoBoxText = "Click a system in the legend to toggle visibility, or click a component to see its dependencies.";
let titleText = "Building Systems Cutaway";

let sysState = {
  Structure: true,
  Enclosure: true,
  Mechanical: true,
  Plumbing: true,
  Electrical: true,
  Fire: true
};

let systems = [
  { name: 'Structure', color: '#8d6e63', desc: 'Frames the building. Dependencies: Enclosure attaches to it, Mechanical routes through it.' },
  { name: 'Enclosure', color: '#ffb74d', desc: 'Keeps weather out. Dependencies: Mechanical sizes depend on its thermal performance.' },
  { name: 'Mechanical', color: '#64b5f6', desc: 'HVAC systems. Dependencies: Requires Electrical power, Structural support.' },
  { name: 'Plumbing', color: '#4db6ac', desc: 'Water and waste. Dependencies: Requires Structural routing, Enclosure for freeze protection.' },
  { name: 'Electrical', color: '#ffd54f', desc: 'Power and lighting. Dependencies: Embedded in Structure, powers Mechanical/Plumbing.' },
  { name: 'Fire', color: '#e57373', desc: 'Sprinklers and alarms. Dependencies: Requires Plumbing water supply, Electrical power.' }
];

let hoverComp = null;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  
  whatIfSelect = createSelect();
  whatIfSelect.option('What if? (Select Scenario)', 'none');
  whatIfSelect.option('Remove insulation', 'insul');
  whatIfSelect.option('Add a large window', 'window');
  whatIfSelect.option('Move the furnace', 'furnace');
  whatIfSelect.changed(handleWhatIf);
  
  positionControls();
  
  describe('Interactive cutaway showing six building systems: Structure, Enclosure, Mechanical, Plumbing, Electrical, and Fire protection. Users can toggle layers and test what-if scenarios.');
}

function positionControls() {
  whatIfSelect.position(margin, drawHeight + 115);
}

function handleWhatIf() {
  let val = whatIfSelect.value();
  if (val === 'insul') {
    infoBoxText = "Removing insulation reduces thermal resistance. Mechanical system must be oversized to compensate, increasing Electrical load.";
    sysState = { Structure: true, Enclosure: true, Mechanical: true, Plumbing: false, Electrical: true, Fire: false };
  } else if (val === 'window') {
    infoBoxText = "Adding a window changes the Enclosure. Structural headers must be resized. Mechanical load increases due to solar heat gain.";
    sysState = { Structure: true, Enclosure: true, Mechanical: true, Plumbing: false, Electrical: false, Fire: false };
  } else if (val === 'furnace') {
    infoBoxText = "Moving the furnace changes Mechanical routing. Structural framing may need adjusting for new duct paths, and Electrical/Plumbing feeds must move.";
    sysState = { Structure: true, Enclosure: false, Mechanical: true, Plumbing: true, Electrical: true, Fire: false };
  } else {
    infoBoxText = "Select a scenario or click a component.";
    sysState = { Structure: true, Enclosure: true, Mechanical: true, Plumbing: true, Electrical: true, Fire: true };
  }
}

function draw() {
  updateCanvasSize();
  
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
  text(titleText, canvasWidth/2, 10);
  
  // Draw Building Cutaway
  let bX = margin;
  let bY = 50;
  let bW = canvasWidth * 0.55;
  if (bW > 300) bW = 300;
  let bH = 350;
  
  hoverComp = null;
  
  // Ground
  strokeWeight(3);
  stroke(100);
  line(bX, bY + bH - 20, bX + bW + 20, bY + bH - 20);
  
  // Components drawing
  // Draw in specific order, checking visibility
  
  if (sysState.Structure) {
    fill(systems[0].color);
    stroke(80);
    strokeWeight(1);
    // Foundation
    rect(bX + 10, bY + bH - 20, 20, 20);
    rect(bX + bW - 30, bY + bH - 20, 20, 20);
    // Walls
    rect(bX + 10, bY + 100, 10, bH - 120);
    rect(bX + bW - 20, bY + 100, 10, bH - 120);
    // Floor
    rect(bX + 10, bY + bH - 150, bW - 20, 10);
    // Roof framing
    triangle(bX - 10, bY + 100, bX + bW/2, bY + 20, bX + bW + 10, bY + 100);
    
    // Hit test approximation
    if (mouseX > bX && mouseX < bX + bW && mouseY > bY && mouseY < bY + bH && !hoverComp) {
      // Very broad hit test for demo purposes
      if (mouseX < bX + 25 || mouseX > bX + bW - 25) hoverComp = systems[0];
    }
  }
  
  if (sysState.Enclosure) {
    fill(systems[1].color);
    noStroke();
    // Roof finish
    push();
    translate(bX + bW/2, bY + 20);
    rotate(-atan2(80, bW/2 + 10));
    rect(-bW/2 - 20, -5, bW/2 + 30, 8);
    pop();
    push();
    translate(bX + bW/2, bY + 20);
    rotate(atan2(80, bW/2 + 10));
    rect(-10, -5, bW/2 + 30, 8);
    pop();
    // Insulation in wall
    rect(bX + 20, bY + 100, 10, bH - 120);
    rect(bX + bW - 30, bY + 100, 10, bH - 120);
    
    if (mouseX > bX + 20 && mouseX < bX + 30 && mouseY > bY + 100 && mouseY < bY + bH && !hoverComp) hoverComp = systems[1];
  }
  
  if (sysState.Plumbing) {
    stroke(systems[3].color);
    strokeWeight(6);
    noFill();
    // Pipes
    beginShape();
    vertex(bX + 50, bY + bH - 20);
    vertex(bX + 50, bY + bH - 100);
    vertex(bX + 80, bY + bH - 100);
    endShape();
    // Second floor pipe
    line(bX + 50, bY + bH - 100, bX + 50, bY + 150);
    
    if (mouseX > bX + 45 && mouseX < bX + 55 && mouseY > bY + 150 && mouseY < bY + bH && !hoverComp) hoverComp = systems[3];
  }
  
  if (sysState.Mechanical) {
    fill(systems[2].color);
    noStroke();
    // Furnace
    rect(bX + bW - 70, bY + bH - 100, 40, 60);
    // Ducts
    stroke(systems[2].color);
    strokeWeight(12);
    line(bX + bW - 50, bY + bH - 100, bX + bW - 50, bY + bH - 160);
    line(bX + bW - 50, bY + bH - 160, bX + 100, bY + bH - 160);
    
    if (mouseX > bX + bW - 75 && mouseX < bX + bW - 20 && mouseY > bY + bH - 170 && mouseY < bY + bH - 40 && !hoverComp) hoverComp = systems[2];
  }
  
  if (sysState.Electrical) {
    stroke(systems[4].color);
    strokeWeight(3);
    noFill();
    // Wires
    line(bX + bW - 10, bY + bH - 80, bX + bW - 20, bY + bH - 80);
    line(bX + bW - 20, bY + bH - 80, bX + bW - 20, bY + bH - 180);
    line(bX + bW - 20, bY + bH - 180, bX + bW/2, bY + bH - 180);
    fill(systems[4].color);
    noStroke();
    ellipse(bX + bW/2, bY + bH - 180, 10, 10); // Light
    
    if (mouseX > bX + bW/2 - 10 && mouseX < bX + bW - 10 && mouseY > bY + bH - 190 && mouseY < bY + bH - 70 && !hoverComp) hoverComp = systems[4];
  }
  
  if (sysState.Fire) {
    stroke(systems[5].color);
    strokeWeight(4);
    // Sprinkler pipe
    line(bX + 50, bY + 110, bX + bW - 50, bY + 110);
    fill(systems[5].color);
    noStroke();
    triangle(bX + bW/2, bY + 110, bX + bW/2 - 5, bY + 120, bX + bW/2 + 5, bY + 120); // Sprinkler head
    
    if (mouseX > bX + 50 && mouseX < bX + bW - 50 && mouseY > bY + 105 && mouseY < bY + 125 && !hoverComp) hoverComp = systems[5];
  }
  
  // Draw Legend Panel
  let lX = bX + bW + 20;
  let lY = bY;
  
  fill(250);
  stroke(200);
  strokeWeight(1);
  rect(lX, lY, canvasWidth - lX - margin, 220, 5);
  
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(14);
  textStyle(BOLD);
  text('Legend (Click to Toggle)', lX + 10, lY + 10);
  textStyle(NORMAL);
  
  let lyOff = lY + 40;
  for (let i = 0; i < systems.length; i++) {
    let s = systems[i];
    let isVis = sysState[s.name];
    
    if (isVis) {
      fill(s.color);
      stroke(100);
    } else {
      fill(230);
      stroke(200);
    }
    rect(lX + 10, lyOff, 20, 20, 3);
    
    if (isVis) fill(0);
    else fill(150);
    noStroke();
    text(s.name, lX + 40, lyOff + 2);
    
    lyOff += 30;
  }
  
  // Draw Infobox in Control Region
  fill(255);
  stroke(200);
  rect(margin, drawHeight + 10, canvasWidth - margin*2, 90, 5);
  
  noStroke();
  fill(0);
  textAlign(LEFT, TOP);
  textSize(13);
  text(infoBoxText, margin + 10, drawHeight + 20, canvasWidth - margin*2 - 20);
  
  // Hover Tooltip
  if (hoverComp) {
    cursor(HAND);
    let tx = mouseX + 15;
    let ty = mouseY + 15;
    if (tx + 150 > canvasWidth) tx = canvasWidth - 150;
    
    fill(255, 255, 255, 240);
    stroke(150);
    rect(tx, ty, 150, 30, 3);
    
    fill(0);
    noStroke();
    text(hoverComp.name, tx + 10, ty + 8);
  } else {
    cursor(ARROW);
  }
}

function mousePressed() {
  if (mouseY < drawHeight) {
    let bX = margin;
    let bW = min(150, canvasWidth * 0.3);
    let lX = bX + bW + 20;
    
    // Check Legend Click
    if (mouseX > lX + 10 && mouseX < canvasWidth - margin) {
      let lY = 50 + 40;
      for (let i = 0; i < systems.length; i++) {
        if (mouseY > lY && mouseY < lY + 20) {
          sysState[systems[i].name] = !sysState[systems[i].name];
          whatIfSelect.selected('none');
          return;
        }
        lY += 30;
      }
    }
    
    // Check Component Click
    if (hoverComp) {
      infoBoxText = hoverComp.name + " System: " + hoverComp.desc;
      whatIfSelect.selected('none');
    }
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
