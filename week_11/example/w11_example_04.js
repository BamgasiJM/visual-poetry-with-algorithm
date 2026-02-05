// w11_example_04.js

let agents = [];
const AGENT_COUNT = 50;

function setup() {
  createCanvas(1000, 1000);
  pixelDensity(2);
  background(0);

  for (let i = 0; i < AGENT_COUNT; i++) {
    agents.push(new LineAgent());
  }
}

function draw() {
  // 트레일
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);

  for (let a of agents) {
    a.update();
    a.draw();
  }
}

// --------------------------

class LineAgent {
  constructor() {
    this.p1 = createVector(random(width), random(height));
    this.p2 = createVector(random(width), random(height));

    this.v1 = p5.Vector.random2D().mult(random(1.0, 3));
    this.v2 = p5.Vector.random2D().mult(random(0.6, 1.2));

    this.alpha = random(10, 100);
    this.strokeWeight = random(1, 5);
  }

  update() {
    this.p1.add(this.v1);
    this.p2.add(this.v2);

    this.bounce(this.p1, this.v1);
    this.bounce(this.p2, this.v2);
  }

  draw() {
    stroke(255, this.alpha);
    strokeWeight(this.strokeWeight);
    line(this.p1.x, this.p1.y, this.p2.x, this.p2.y);
  }

  bounce(p, v) {
    if (p.x < 0 || p.x > width) v.x *= -1;
    if (p.y < 0 || p.y > height) v.y *= -1;
  }
}