// w03_example_03.js

function setup() {
  createCanvas(800, 800);
  // noCursor();

  colorMode(HSB, 360, 100, 100, 1);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(mouseY / 2, 30, 20);

  fill(360 - mouseY / 2, 30, 80);
  rect(width / 2, height / 2, mouseX / 2, mouseX / 2);
}
