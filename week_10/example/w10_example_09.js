// w10_example_09.js

// ================================
// 설정 상수
// ================================

const WIN_W = 800;
const WIN_H = 800;

const RADIUS = 200;

const NUM_FLARE = 3000;
const CLUSTERS = 12;

const TAU = Math.PI * 2;
const CLUSTER_SPREAD = 0.08 * TAU;

const MIN_LEN = 50;
const MAX_LEN = 200;

const START_THICK = 0.8;
const END_THICK = 0.1;

const START_ALPHA = 0.8;
const END_ALPHA = 0.1;

const SEGMENTS = 20;

const NOISE_SCALE = 2.0;
const NOISE_AMPLITUDE = 10.0;
const NOISE_SPEED = 0.2;

// ================================
// 전역 상태
// ================================

let flares = [];
let time = 0;

let eyeOffsetX;
let eyeOffsetY;
let eyeSize;

// ================================
// Flare 데이터 구조
// ================================

class Flare {
  constructor(angle, length, seed, clusterId) {
    this.angle = angle;
    this.length = length;
    this.seed = seed;
    this.clusterId = clusterId;
  }
}

// ================================
// p5.js 기본 함수
// ================================

function setup() {
  createCanvas(WIN_W, WIN_H);
  noiseSeed(floor(random(100000)));

  // 눈 파라미터 (실행 시 1회 랜덤 결정)
  eyeOffsetX = random(40, 90);
  eyeOffsetY = random(-30, 30);
  eyeSize = random(12, 30);

  flares = generateFlares();
}

function draw() {
  background(5);

  translate(width / 2, height / 2);

  // 중심 원
  noFill();
  stroke(230);
  strokeWeight(1);
  ellipse(0, 0, RADIUS * 2);

  noStroke();
  fill(255);
  ellipse(-eyeOffsetX, eyeOffsetY, eyeSize);
  ellipse(eyeOffsetX, eyeOffsetY, eyeSize);

  for (let flare of flares) {
    drawFlare(flare);
  }

  time += deltaTime * 0.001 * NOISE_SPEED;
}

// ================================
// 플레어 생성
// ================================

function generateFlares() {
  let result = [];
  let flaresPerCluster = floor(NUM_FLARE / CLUSTERS);

  for (let c = 0; c < CLUSTERS; c++) {
    let clusterAngle = (c / CLUSTERS) * TAU;
    let clusterSeed = random(1000);

    for (let i = 0; i < flaresPerCluster; i++) {
      let angle = clusterAngle + random(-CLUSTER_SPREAD, CLUSTER_SPREAD);
      let length = random(MIN_LEN, MAX_LEN);
      let seed = clusterSeed + random(100);

      result.push(new Flare(angle, length, seed, c));
    }
  }
  return result;
}

// ================================
// 개별 플레어 렌더링
// ================================

function drawFlare(flare) {
  let dir = p5.Vector.fromAngle(flare.angle);
  let perp = createVector(-dir.y, dir.x);

  let baseCenter = p5.Vector.mult(dir, RADIUS);

  for (let s = 0; s < SEGMENTS; s++) {
    let t0 = s / SEGMENTS;
    let t1 = (s + 1) / SEGMENTS;

    let n0 = noise(t0 * NOISE_SCALE, flare.seed, time) * 2 - 1;
    let n1 = noise(t1 * NOISE_SCALE, flare.seed, time) * 2 - 1;

    let offset0 = p5.Vector.mult(perp, n0 * NOISE_AMPLITUDE);
    let offset1 = p5.Vector.mult(perp, n1 * NOISE_AMPLITUDE);

    let p0 = p5.Vector.add(
      baseCenter,
      p5.Vector.add(p5.Vector.mult(dir, flare.length * t0), offset0)
    );

    let p1 = p5.Vector.add(
      baseCenter,
      p5.Vector.add(p5.Vector.mult(dir, flare.length * t1), offset1)
    );

    let w0 = lerpScalar(START_THICK, END_THICK, t0);
    let w1 = lerpScalar(START_THICK, END_THICK, t1);

    let a0 = lerpScalar(START_ALPHA, END_ALPHA, t0);
    let a1 = lerpScalar(START_ALPHA, END_ALPHA, t1);
    let alpha = (a0 + a1) * 0.5 * 255;

    fill(255, alpha);

    let left0 = p5.Vector.add(p0, p5.Vector.mult(perp, w0 * 0.5));
    let right0 = p5.Vector.sub(p0, p5.Vector.mult(perp, w0 * 0.5));
    let left1 = p5.Vector.add(p1, p5.Vector.mult(perp, w1 * 0.5));
    let right1 = p5.Vector.sub(p1, p5.Vector.mult(perp, w1 * 0.5));

    triangle(left0.x, left0.y, right0.x, right0.y, left1.x, left1.y);

    triangle(right0.x, right0.y, right1.x, right1.y, left1.x, left1.y);
  }
}

// ================================
// 선형 보간
// ================================

function lerpScalar(a, b, t) {
  return a + (b - a) * t;
}
