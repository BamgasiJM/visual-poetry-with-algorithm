// w13_example_03.js

let textPoints = [];
let baseSize = 96;
let count = 20;

function setup() {
  createCanvas(1000, 1000);
  background(220);

  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
}

function draw() {
  background(120, 90, 230, 10);

  translate(width / 2, height / 2);

  let time = frameCount * 0.005;

  for (let i = 0; i < count; i++) {
    let angle = map(i, 0, count, 0, TWO_PI);
    let radius = 220 + sin(time + i * 0.1) * 160;

    let x = cos(angle + time * 1.4) * radius;
    let y = sin(angle + time * 1.1) * radius;

    push();
    translate(x, y);
    rotate(angle + time);

    fill(255);
    let s = baseSize * (0.9 + 0.8 * sin(time + i));
    textSize(s);

    text("SMU", 0, 0);
    pop();
  }
}
