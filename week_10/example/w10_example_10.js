// w10_example_10.js

/*
Mind Ocean Flow
마음 속 생각을 거대한 바다의 흐름처럼 표현한 generative artwork

Ocean Current   : 전체적인 흐름
Flow Field      : 미세한 흐름
Vortex          : 감정 소용돌이
Ribbon Particles: 생각의 흔적
Depth Layers    : 생각의 깊이
*/

// =============================
// 조절 변수
// =============================

let thoughtCount = 200;
let noiseScale = 0.0008;
let noiseStrength = 2.2;
let maxSpeed = 8;
let trailLength = 90;
let ribbonWidth = 8;
let vortexCount = 3;

let thoughts = [];
let vortexes = [];

// =============================
function setup() {
  createCanvas(1000, 1000);

  background(0);

  // 소용돌이 생성
  for (let i = 0; i < vortexCount; i++) {
    vortexes.push(
      createVector(
        random(width * 0.2, width * 0.8),
        random(height * 0.2, height * 0.8),
      ),
    );
  }

  // 생각 생성
  for (let i = 0; i < thoughtCount; i++) {
    let x = randomGaussian(width / 2, width / 4);
    let y = random(height, height + 500);

    thoughts.push(new Thought(x, y));
  }
}

// =============================
function draw() {
  background(0, 15);

  for (let i = thoughts.length - 1; i >= 0; i--) {
    let t = thoughts[i];

    t.update();
    t.display();

    if (t.pos.y < -200) {
      thoughts.splice(i, 1);

      let x = randomGaussian(width / 2, width / 6);

      thoughts.push(new Thought(x, height + 200));
    }
  }
}

// =============================
// Thought
// =============================
class Thought {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, -random(1.5, maxSpeed));
    this.history = [];
    this.depth = random();
    this.size = map(this.depth, 0, 1, 2, ribbonWidth);
  }

  update() {
    // Ocean Current (거대한 흐름)
    let oceanAngle = noise(this.pos.y * 0.0005, frameCount * 0.002) * TWO_PI;

    let ocean = p5.Vector.fromAngle(oceanAngle);

    ocean.mult(0.6);

    // Flow Field (세밀한 흐름)
    let flowAngle =
      noise(
        this.pos.x * noiseScale,
        this.pos.y * noiseScale,
        frameCount * 0.01,
      ) *
      TWO_PI *
      2;

    let flow = p5.Vector.fromAngle(flowAngle);

    flow.mult(noiseStrength);

    // Vortex 영향
    for (let v of vortexes) {
      let dir = p5.Vector.sub(v, this.pos);

      let dist = dir.mag();

      if (dist < 350) {
        dir.rotate(HALF_PI);
        dir.normalize();
        dir.mult(0.5 * (1 - dist / 350));

        flow.add(dir);
      }
    }

    this.vel.add(flow);
    this.vel.add(ocean);
    this.vel.limit(maxSpeed);
    this.pos.add(this.vel);
    this.history.push(this.pos.copy());

    if (this.history.length > trailLength) {
      this.history.shift();
    }
  }

  display() {
    if (this.history.length < 4) return;

    let alpha = map(this.depth, 0, 1, 40, 220);

    noStroke();
    fill(255, alpha);

    let left = [];
    let right = [];

    for (let i = 1; i < this.history.length; i++) {
      let p = this.history[i];
      let prev = this.history[i - 1];
      let dir = p5.Vector.sub(p, prev);
      let normal = createVector(-dir.y, dir.x);

      normal.normalize();

      // 잉크 브러시 질감
      let brush = noise(p.x * 0.01, p.y * 0.01);
      let w = this.size * map(brush, 0, 1, 0.5, 1.5);

      normal.mult(w);

      let l = p5.Vector.add(p, normal);
      let r = p5.Vector.sub(p, normal);

      left.push(l);
      right.push(r);
    }

    beginShape();

    for (let p of left) {
      vertex(p.x, p.y);
    }

    for (let i = right.length - 1; i >= 0; i--) {
      vertex(right[i].x, right[i].y);
    }

    endShape(CLOSE);
  }
}