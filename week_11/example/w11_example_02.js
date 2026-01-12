// w11_example_02.js 

// ===== 전역 변수 =====
const CANVAS_SIZE = 800;
const NUM_CIRCLES = 20;
const NUM_SQUARES = 10;

let circles = [];
let squares = [];

// ===== p5.js 기본 함수 =====
function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  fill(220);
  noStroke();

  // 원 생성
  for (let i = 0; i < NUM_CIRCLES; i++) {
    circles.push(new CircleObject());
  }

  // 정사각형 생성
  for (let i = 0; i < NUM_SQUARES; i++) {
    squares.push(new SquareObject());
  }
}

function draw() {
  background(0, 50);

  // 업데이트
  circles.forEach((c) => c.update());
  squares.forEach((s) => s.update());

  // 충돌 검사: 원-원
  for (let i = 0; i < circles.length; i++) {
    for (let j = i + 1; j < circles.length; j++) {
      circleCircleCollision(circles[i], circles[j]);
    }
  }

  // 충돌 검사: 사각형-사각형
  for (let i = 0; i < squares.length; i++) {
    for (let j = i + 1; j < squares.length; j++) {
      squareSquareCollision(squares[i], squares[j]);
    }
  }

  // 충돌 검사: 원-사각형
  circles.forEach((c) => {
    squares.forEach((s) => {
      circleSquareCollision(c, s);
    });
  });

  // 그리기
  circles.forEach((c) => c.draw());
  squares.forEach((s) => s.draw());
}

// ===== 클래스 정의 =====
class CircleObject {
  constructor() {
    this.r = random(10, 15);
    this.pos = createVector(
      random(this.r, width - this.r),
      random(this.r, height - this.r)
    );
    this.vel = p5.Vector.random2D().mult(random(1.5, 2.0));
  }

  update() {
    this.pos.add(this.vel);
    this.wallCollision();
  }

  wallCollision() {
    if (this.pos.x < this.r || this.pos.x > width - this.r) {
      this.vel.x *= -1;
    }
    if (this.pos.y < this.r || this.pos.y > height - this.r) {
      this.vel.y *= -1;
    }
  }

  draw() {
    circle(this.pos.x, this.pos.y, this.r * 2);
  }
}

class SquareObject {
  constructor() {
    this.size = random(30, 50);
    this.pos = createVector(
      random(this.size / 2, width - this.size / 2),
      random(this.size / 2, height - this.size / 2)
    );
    this.vel = p5.Vector.random2D().mult(random(0.5, 2));
  }

  update() {
    this.pos.add(this.vel);
    this.wallCollision();
  }

  wallCollision() {
    let h = this.size / 2;
    if (this.pos.x < h || this.pos.x > width - h) {
      this.vel.x *= -1;
    }
    if (this.pos.y < h || this.pos.y > height - h) {
      this.vel.y *= -1;
    }
  }

  draw() {
    rectMode(CENTER);
    square(this.pos.x, this.pos.y, this.size);
  }
}

// ===== 충돌 함수 =====

// 원-원 충돌
function circleCircleCollision(a, b) {
  let diff = p5.Vector.sub(b.pos, a.pos);
  let d = diff.mag();
  let minDist = a.r + b.r;

  if (d < minDist && d !== 0) {
    // 1. 위치 보정
    let penetration = minDist - d;
    let normal = diff.copy().normalize();

    a.pos.add(p5.Vector.mult(normal, -penetration / 2));
    b.pos.add(p5.Vector.mult(normal, penetration / 2));

    // 2. 속도 반사 (단순 탄성)
    let temp = a.vel.copy();
    a.vel = b.vel.copy();
    b.vel = temp;
  }
}

// 사각형-사각형 충돌 (AABB)
function squareSquareCollision(a, b) {
  let ha = a.size / 2;
  let hb = b.size / 2;

  let dx = b.pos.x - a.pos.x;
  let dy = b.pos.y - a.pos.y;

  let overlapX = ha + hb - abs(dx);
  let overlapY = ha + hb - abs(dy);

  if (overlapX > 0 && overlapY > 0) {
    if (overlapX < overlapY) {
      let sx = Math.sign(dx);
      a.pos.x -= (overlapX / 2) * sx;
      b.pos.x += (overlapX / 2) * sx;

      a.vel.x *= -1;
      b.vel.x *= -1;
    } else {
      let sy = Math.sign(dy);
      a.pos.y -= (overlapY / 2) * sy;
      b.pos.y += (overlapY / 2) * sy;

      a.vel.y *= -1;
      b.vel.y *= -1;
    }
  }
}

// 원-사각형 충돌
function circleSquareCollision(c, s) {
  let h = s.size / 2;

  let closestX = constrain(c.pos.x, s.pos.x - h, s.pos.x + h);
  let closestY = constrain(c.pos.y, s.pos.y - h, s.pos.y + h);

  let diff = createVector(c.pos.x - closestX, c.pos.y - closestY);

  let d = diff.mag();

  if (d < c.r && d !== 0) {
    let penetration = c.r - d;
    let normal = diff.copy().normalize();

    // 위치 보정
    c.pos.add(p5.Vector.mult(normal, penetration));
    s.pos.add(p5.Vector.mult(normal, -penetration * 0.5));

    // 속도 반응
    let dot = c.vel.dot(normal);
    c.vel.sub(p5.Vector.mult(normal, 2 * dot));
  }
}