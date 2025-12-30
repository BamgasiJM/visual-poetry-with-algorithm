// 005

const CONFIG = {
  canvasSize: 1000,
  bgColor: 15,
  fillColor: [30, 190, 180],
  maxAttempts: 5000,
  minRadius: 5,
};

let circles = [];
let attempts = 0;

function setup() {
  createCanvas(CONFIG.canvasSize, CONFIG.canvasSize);
  background(CONFIG.bgColor);
  noStroke();
}

function draw() {
  if (attempts >= CONFIG.maxAttempts) {
    noLoop();
    return;
  }

  const pos = { x: random(width), y: random(height) };
  const maxR = findMaxRadius(pos.x, pos.y);

  if (maxR >= CONFIG.minRadius) {
    addCircle(pos.x, pos.y, maxR);
    attempts = 0;
  } else {
    attempts++;
  }
}

function addCircle(x, y, r) {
  circles.push({ x, y, r });
  fill(...CONFIG.fillColor, random(100, 255));
  circle(x, y, r * 2);
}

function findMaxRadius(x, y) {
  let maxR = min(x, y, width - x, height - y);

  for (const c of circles) {
    const d = dist(x, y, c.x, c.y);
    maxR = min(maxR, d - c.r);
  }

  return max(maxR, 0);
}

function mousePressed() {
  circles = [];
  attempts = 0;
  background(CONFIG.bgColor);
  loop();
}
