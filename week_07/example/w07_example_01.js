// w07_example_01.js

function setup() {
  createCanvas(800, 800);
  background(50, 190, 180);
}

function draw() {
  background(50, 190, 180);
  translate(400, 400);

  let r = 300;     // 반지름
  let n = 6;       // 점의 개수

  noFill();
  stroke(0);
  strokeWeight(24);

  beginShape();
  for (let i = 0; i <= n; i++) {
    let theta = (TWO_PI * i) / n;
    let x = r * cos(theta);
    let y = r * sin(theta);
    vertex(x, y);
  }
  endShape();
}
