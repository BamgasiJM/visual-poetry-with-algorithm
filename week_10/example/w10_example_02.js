let start = 0;

function setup() {
  createCanvas(800, 400);
  frameRate(60);
}

function draw() {
  background(25);
  noFill();
  stroke(10, 190, 180);
  strokeWeight(5);
  beginShape();
  let xoff = start;
  for (let x = 0; x < width; x++) {
    let y = noise(xoff) * height;
    vertex(x, y);
    xoff += 0.01;
  }
  endShape();

  start += 0.01;
}
