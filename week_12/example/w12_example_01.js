// w12_example_01.js

let mover;

function setup() {
  createCanvas(800, 600);
  mover = new Mover();
}

function draw() {
  background(25);

  let gravity = createVector(0, 0.1);
  mover.applyForce(gravity);

  // 바닥 근처일 때 마찰력
  if (mover.pos.y > height - 20) {
    let friction = mover.vel.copy();
    friction.normalize();
    friction.mult(-0.1);
    mover.applyForce(friction);
  }

  mover.update();
  mover.edges();
  mover.display();
}

class Mover {
  constructor() {
    this.pos = createVector(width / 2, 0);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = 1;
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  edges() {
    if (this.pos.y > height - 25) {
      this.pos.y = height - 25;
      this.vel.y *= -0.7; // 반동
    }
  }

  display() {
    fill(10, 190, 180);
    ellipse(this.pos.x, this.pos.y, 50, 50);
  }
}
