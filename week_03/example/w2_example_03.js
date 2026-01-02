// 003
function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);

  noFill();

  for (let i = 0; i < 35; i++) {
    strokeWeight(2 + i * 0.65);
    stroke(255, i * 6, 255 - i * 5);
    ellipse(width / 2, height / 2, 100 + 35 * i);
  }
}
