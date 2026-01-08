let numbers = [];
let count = 200;
let angleOffset = 0;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textFont("sans-serif");
  noStroke();

  for (let i = 0; i < count; i++) {
    numbers.push(floor(random(10, 100)));
  }
}

function draw() {
  background(20, 50, 9);

  translate(width / 2, height / 2);
  rotate(angleOffset);

  let maxRadius = min(width, height) * 0.45;

  for (let i = 0; i < count; i++) {
    let t = i / count;

    let angle = t * TWO_PI * 8;
    let radius = t * maxRadius;

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    let size = map(radius, 0, maxRadius, 24, 5);
    textSize(size);

    let hue = map(i, 0, count - 1, 30, 100);
    let alpha = map(radius, 0, maxRadius, 100, 20);

    fill(hue, 80, 100, alpha);
    text(numbers[i], x, y);
  }

  angleOffset += 0.002;
}
