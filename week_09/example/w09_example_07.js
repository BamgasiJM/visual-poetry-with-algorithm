let inc = 0.1;
let scl = 10;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield = [];

function setup() {
  createCanvas(800, 400);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);
  for (let i = 0; i < 2000; i++) {
    particles.push(new Particle());
  }
  background(25);
  frameRate(60);
}

function draw() {
  // build flow field
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.1);
      let index = x + y * cols;
      flowfield[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.003;

  // update particles
  for (let p of particles) {
    p.follow(flowfield);
    p.update();
    p.edges();
    p.show();
  }
}

// Particle class with safe follow (clamp indices)
class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 1.0;
    this.prev = this.pos.copy();
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    // 안전하게 범위 클램프
    x = constrain(x, 0, cols - 1);
    y = constrain(y, 0, rows - 1);
    let index = x + y * cols;
    let force = vectors[index];
    if (force) {
      this.applyForce(force);
    }
  }

  applyForce(force) {
    // 복사해서 적용 (원본 벡터를 mutate 하지 않음)
    let f = force.copy();
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(30, 210, 200, 10);
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
}
