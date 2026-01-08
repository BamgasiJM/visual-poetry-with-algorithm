let textPoints = [];
let baseSize = 72;
let count = 24;

function setup() {
  createCanvas(1000, 1000);
  background(220);

  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  fill(0);
  noStroke();
}

function draw() {
  background(220);

  translate(width / 2, height / 2);

  let time = frameCount * 0.03;

  for (let i = 0; i < count; i++) {
    let angle = map(i, 0, count, 0, TWO_PI);
    let radius = 250 + sin(time + i * 0.1) * 120;

    let x = cos(angle + time * 0.2) * radius;
    let y = sin(angle + time * 0.2) * radius;

    push();
    translate(x, y);
    rotate(angle + time);

    let s = baseSize * (0.4 + 0.6 * sin(time + i));
    textSize(s);

    text("세명", 0, 0);
    pop();
  }
}
