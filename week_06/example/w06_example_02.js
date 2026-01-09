// Weighted Random

function setup() {
  createCanvas(800, 400);
  background(23);
}

function draw() {
  noStroke();
  for (let i = 0; i < 5000; i++) {
    let probability = random();
    let color_value;

    if (probability < 0.5) color_value = color(200, 200, 200);
    else if (probability < 0.7) color_value = color(10, 180, 170);
    else color_value = color(10, 90, 80);

    fill(color_value);
    ellipse(random(width), random(height), 7, 7);
  }
  noLoop();
}
