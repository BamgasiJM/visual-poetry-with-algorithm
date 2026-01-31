// w03_example_05.js

let baseColorA;
let baseColorB;
let currentColorA;
let currentColorB;

let particles = [];
const PARTICLE_COUNT = 8000;

function setup() {
  createCanvas(800, 800);
  colorMode(RGB, 255);
  noStroke();

  // 그라데이션 초기 색
  baseColorA = color(40, 60, 90);
  baseColorB = color(220, 200, 180);

  currentColorA = baseColorA;
  currentColorB = baseColorB;

  // 파티클 생성
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new BirdParticle());
  }
}

function draw() {
  drawGradientBackground();

  for (let p of particles) {
    p.update();
    p.display();
  }
}

/* ------------------------------
   Gradient Background
-------------------------------- */

function drawGradientBackground() {
  let t = frameCount * 0.005;

  let targetColorA = color(
    40 + noise(t) * 80,
    60 + noise(t + 10) * 80,
    90 + noise(t + 20) * 80
  );

  let targetColorB = color(
    180 + noise(t + 30) * 60,
    170 + noise(t + 40) * 60,
    160 + noise(t + 50) * 60
  );

  currentColorA = lerpColor(currentColorA, targetColorA, 0.01);
  currentColorB = lerpColor(currentColorB, targetColorB, 0.01);

  for (let y = 0; y < height; y++) {
    let distanceFactor = dist(mouseX, mouseY, width / 2, y) / width;

    let verticalFactor = map(y, 0, height, 0, 1);
    let blendFactor = lerp(verticalFactor, distanceFactor, 0.3);

    let c = lerpColor(
      currentColorA,
      currentColorB,
      constrain(blendFactor, 0, 1)
    );

    fill(c);
    rect(0, y, width, 1);
  }
}

/* ------------------------------
   Bird-like Particles
-------------------------------- */

class BirdParticle {
  constructor() {
    this.position = createVector(random(width), random(height));

    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(0.3, 0.8));

    this.noiseOffset = random(1000);
    this.size = random(0.5, 3);
  }

  update() {
    let angle =
      noise(
        this.position.x * 0.02,
        this.position.y * 0.02,
        frameCount * 3.02 + this.noiseOffset
      ) *
      TWO_PI *
      2;

    let flowVector = p5.Vector.fromAngle(angle);
    flowVector.mult(0.05);

    this.velocity.add(flowVector);
    this.velocity.limit(1);

    this.position.add(this.velocity);
    this.wrapEdges();
  }

  wrapEdges() {
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }

  display() {
    fill(0, 140);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }
}
