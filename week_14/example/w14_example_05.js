// w14_example_05.js

const CANVAS_SIZE = 1080;
const AGENT_COUNT = 2000;
const TARGET_DENSITY = 1.2; // 1px당 타겟 수

let agents = [];
let rawPath = [];
let lineTargets = [];
let isDrawing = false;
let lineAlpha = 255;

class Agent {
  constructor(index) {
    this.index = index;
    this.pos = createVector(random(width), random(height));
    this.offset = random(1000);
    this.size = random(1.2, 3.5);
    this.hue = random(150, 230);
  }

  update(targets) {
    if (targets.length === 0) return;

    let t = this.index / (AGENT_COUNT - 1);
    let idx = floor(t * (targets.length - 1));
    let target = targets[idx];

    if (!target) return;

    let dir = p5.Vector.sub(target, this.pos);
    let d = dir.mag();

    if (d > 0.1) {
      dir.normalize();

      let wobble = map(noise(this.offset, frameCount * 0.01), 0, 1, -5, 5);
      dir.rotate(wobble * 0.35);

      this.pos.add(dir.mult(2.2));
    }

    this.offset += 0.01;
  }

  draw() {
    noStroke();
    fill(this.hue, 80, 100, 90);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }
}

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  colorMode(HSB, 360, 100, 100, 255);
  agents = Array.from({ length: AGENT_COUNT }, (_, i) => new Agent(i));
  background(0);
}

function draw() {
  background(0, 30);

  fill(180, 50, 80);
  noStroke();

  textSize(18);
  textAlign(CENTER, CENTER);
  text("마우스를 드래그해서 자유롭게 선을 그려보세요.", width / 2, 1030);

  // 사용자 궤적 (서서히 사라짐)
  if (rawPath.length > 1 && lineAlpha > 0) {
    stroke(0, 0, 100, lineAlpha);
    strokeWeight(2);
    noFill();
    beginShape();
    rawPath.forEach((p) => vertex(p.x, p.y));
    endShape();
    lineAlpha -= 1.0;
  }

  agents.forEach((a) => {
    a.update(lineTargets);
    a.draw();
  });
}

function mousePressed() {
  if (!insideCanvas()) return;
  isDrawing = true;
  rawPath = [createVector(mouseX, mouseY)];
  lineTargets = [];
  lineAlpha = 255;
}

function mouseDragged() {
  if (!isDrawing || !insideCanvas()) return;
  rawPath.push(createVector(mouseX, mouseY));
  resampleLine();
}

function mouseReleased() {
  isDrawing = false;
  resampleLine();
}

function insideCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

// ─────────────────────────────
// 아크 길이 기반 재샘플링
// ─────────────────────────────
function resampleLine() {
  lineTargets = [];
  if (rawPath.length < 2) return;

  let totalLength = 0;
  let segments = [];

  for (let i = 1; i < rawPath.length; i++) {
    let d = p5.Vector.dist(rawPath[i - 1], rawPath[i]);
    segments.push(d);
    totalLength += d;
  }

  let targetCount = max(1, floor(totalLength * TARGET_DENSITY));
  let step = totalLength / targetCount;

  let acc = 0;
  let distSum = 0;

  for (let i = 1; i < rawPath.length; i++) {
    let a = rawPath[i - 1];
    let b = rawPath[i];
    let d = segments[i - 1];

    while (distSum + d >= acc) {
      let t = (acc - distSum) / d;
      lineTargets.push(p5.Vector.lerp(a, b, t));
      acc += step;
    }
    distSum += d;
  }
}

// ─────────────────────────────
// 정규화 위치로 타겟 추출
// ─────────────────────────────
function getPointOnPath(points, t) {
  if (points.length === 0) return null;
  let index = floor(t * (points.length - 1));
  return points[index];
}
