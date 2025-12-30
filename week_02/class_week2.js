let w = 800;

function setup() {
  createCanvas(w, w);
  colorMode(HSB);
  frameRate(3);
}

function draw() {
  background(5, 100);
  let x = random(-w / 8, w + w / 8);
  let y = random(-w / 8, w + w / 8);

  stroke((frameCount % 30) + 180, 80, 80);
  strokeWeight(0.5);

  let px = x,
    py = y;
  for (let i = 0; i < w * 2; i++) {
    x += cos(((5 * y) / w) * 10) + cos(((3 * y) / w) * 10);
    y += sin(((3 * x) / w) * 10) - cos(((5 * x) / w) * 10);
    line(px, py, x, y);
    px = x;
    py = y;
  }
}
