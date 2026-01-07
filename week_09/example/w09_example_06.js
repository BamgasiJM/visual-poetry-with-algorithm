let points = [];

function setup() {
  createCanvas(800, 400);
  // 랜덤 특징점 생성
  for (let i = 0; i < 50; i++) {
    points.push(createVector(random(width), random(height)));
  }
}

function worleyNoise(x, y) {
  let minDist = Infinity;
  for (let point of points) {
    let distance = dist(x, y, point.x, point.y);
    minDist = min(minDist, distance);
  }
  return minDist;
}

function draw() {
  for (let x = 0; x < width; x += 2) {
    for (let y = 0; y < height; y += 2) {
      let value = worleyNoise(x, y);
      let color = map(value, 0, 100, 255, 0);
      fill(color);
      noStroke();
      rect(x, y, 2, 2);
    }
  }
  noLoop();
}
