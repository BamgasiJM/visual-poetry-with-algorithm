// Uniform Random

function setup() {
  createCanvas(800, 400);
  background(16);
}

function draw() {
  noStroke();
  for (let i = 0; i < 3000; i++) {
    fill(random(0, 255), random(0, 255), random(0, 255), random(70, 250));
    
    let x_pos = random(width);
    let y_pos = random(height);
    ellipse(x_pos, y_pos, 7, 7);
  }
  noLoop();
}
