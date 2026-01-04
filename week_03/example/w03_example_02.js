// w03_example_06.js

let angle;
angle = 1;
function setup() {
  createCanvas(800, 800);
}

function draw() {
  frameRate(60);
  background(0, 2);
  translate(width / 2, height / 2);
  noStroke();
  fill(50, 60, 200);
  ellipse(0, 0, 200);

  rotate(angle / 50);
  fill(80, 210, 200, 100);
  ellipse(200, 0, 200);
  angle++;

  //noLoop();
}