// 004

const CANVAS_SIZE = 1000;
const PARTICLE_COUNT = 2000;
const TRAIL_LENGTH = 60;

let particles = [];
let trailPoints = [];
let exploded = false;
let explodeTimer = 0;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noStroke();

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  // 어두운 배경 (trail 효과)
  background(10, 10, 12, 60);

  // 폭발 중이 아닐 때만 마우스 궤적 저장
  if (!exploded && mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    const v = createVector(); // 경고 방지
    v.set(mouseX, mouseY);
    trailPoints.push(v);
  }
  if (trailPoints.length > TRAIL_LENGTH) {
    trailPoints.splice(0, trailPoints.length - TRAIL_LENGTH);
  }

  // 파티클 업데이트
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    if (!exploded && trailPoints.length > 0) {
      const targetIndex = floor(map(i, 0, PARTICLE_COUNT, 0, trailPoints.length - 1));
      const target = trailPoints[targetIndex];
      p.follow(target);
    }

    p.update();
    p.display();
  }

  // 폭발 상태 시간 카운트
  if (exploded) {
    explodeTimer--;
    if (explodeTimer <= 0) {
      exploded = false;
    }
  }
}

function mousePressed() {
  explodeParticles();
  return false; // 이벤트 전파 방지
}

function explodeParticles() {
  exploded = true;
  explodeTimer = 60;

  const center = createVector();
  center.set(mouseX, mouseY);

  for (let p of particles) {
    const dir = p5.Vector.sub(p.pos, center);
    if (dir.mag() === 0) dir.set(random(-1, 1), random(-1, 1)); // 완전 겹치면 랜덤 방향
    dir.normalize();
    dir.rotate(random(-PI / 3, PI / 3));
    dir.mult(random(5, 12));
    p.vel = dir;
  }
}

// ----------------------
// Particle 클래스
// ----------------------
class Particle {
  constructor(x, y) {
    this.pos = createVector();
    this.pos.set(x, y);

    this.vel = createVector();
    this.acc = createVector();

    this.size = random(2, 6);
    this.maxSpeed = random(2, 4);
    this.colorAlpha = random(180, 255);
  }

  follow(target) {
    const dir = p5.Vector.sub(target, this.pos);
    dir.setMag(0.05);
    this.acc.add(dir);
  }

  update() {
    this.vel.add(this.acc);
    if (!exploded) this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);

    // 감속 (마찰)
    this.vel.mult(exploded ? 0.95 : 0.9);
    this.acc.mult(0);
  }

  display() {
    fill(255, this.colorAlpha);
    circle(this.pos.x, this.pos.y, this.size);
  }
}
