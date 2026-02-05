const AGENT_COUNT = 2000;
const TARGET_DENSITY = 1.2;

let agents = [];
let rawPath = [];
let lineTargets = [];
let isDrawing = false;
let lineAlpha = 255;
let currentSpeed = 2.2;

class Agent {
  constructor(index) {
    this.index = index;
    this.pos = createVector(random(windowWidth), random(windowHeight));
    this.vel = p5.Vector.random2D(); // 초기 무작위 속도
    this.offset = random(1000);
    this.size = random(1.2, 3.5);
    this.hue = random(150, 280);
    this.orbitAngle = random(TWO_PI); // 개별 회전 각도
    this.orbitRadius = random(2, 8); // 맴도는 반경
  }

  update(targets, speed) {
    if (targets.length === 0) {
      // 타겟이 없을 때는 부드럽게 유영
      let drift = p5.Vector.fromAngle(noise(this.offset) * TWO_PI);
      this.pos.add(drift.mult(0.5));
      this.offset += 0.005;
      return;
    }

    let t = this.index / (AGENT_COUNT - 1);
    let idx = floor(t * (targets.length - 1));
    let baseTarget = targets[idx];

    if (!baseTarget) return;

    // 멈추지 않고 주변을 맴돌기 위한 동적 타겟 계산
    // 타겟 지점을 중심으로 원형 궤적을 그리도록 오프셋 추가
    let ox = cos(this.orbitAngle) * this.orbitRadius;
    let oy = sin(this.orbitAngle) * this.orbitRadius;
    let dynamicTarget = p5.Vector.add(baseTarget, createVector(ox, oy));

    let dir = p5.Vector.sub(dynamicTarget, this.pos);
    let d = dir.mag();

    if (d > 0.1) {
      dir.normalize();

      // 속도에 따른 흔들림 적용
      let wobbleAmount = map(speed, 2, 10, 0.35, 0.8);
      let wobble = map(noise(this.offset, frameCount * 0.01), 0, 1, -5, 5);
      dir.rotate(wobble * wobbleAmount);

      // 타겟에 가까워질수록 속도를 줄이지 않고 부드럽게 접근 (Arrival 대신 Steering 유지)
      this.pos.add(dir.mult(speed));
    }

    // 맴도는 움직임을 위해 각도 업데이트
    this.orbitAngle += 0.02;
    this.offset += 0.01;
  }

  draw() {
    noStroke();
    fill(this.hue, 80, 100, 90);
    circle(this.pos.x, this.pos.y, this.size * 2);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 255);
  agents = Array.from({ length: AGENT_COUNT }, (_, i) => new Agent(i));
  background(0);
}

function draw() {
  // 잔상을 더 길게 남기기 위해 투명도 조절 (0, 20)
  background(0, 30);

  // 안내 문구
  fill(180, 50, 80);
  noStroke();
  textSize(24);
  textAlign(CENTER, CENTER);
  text(
    "마우스 버튼을 떼지 말고 한 번에 스케치를 해보세요.",
    width / 2,
    height - 50,
  );

  // 궤적 처리
  if (rawPath.length > 1 && lineAlpha > 0) {
    stroke(0, 0, 100, lineAlpha);
    strokeWeight(2);
    noFill();
    beginShape();
    rawPath.forEach((p) => vertex(p.x, p.y));
    endShape();
    lineAlpha -= 0.05;
  }

  agents.forEach((a) => {
    a.update(lineTargets, currentSpeed);
    a.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  rawPath = [];
  lineTargets = [];
  lineAlpha = 0;
}

function mousePressed() {
  if (!insideCanvas()) return;
  isDrawing = true;
  rawPath = [createVector(mouseX, mouseY)];
  lineTargets = [];
  lineAlpha = 50;
  currentSpeed = 2.2;
}

function mouseDragged() {
  if (!isDrawing || !insideCanvas()) return;
  let mouseVel = dist(mouseX, mouseY, pmouseX, pmouseY);
  let targetSpeed = map(mouseVel, 0, 100, 2.2, 12, true);
  currentSpeed = lerp(currentSpeed, targetSpeed, 0.15);
  rawPath.push(createVector(mouseX, mouseY));
  resampleLine();
}

function mouseReleased() {
  isDrawing = false;
}

function insideCanvas() {
  return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
}

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
    let a = rawPath[i - 1],
      b = rawPath[i],
      d = segments[i - 1];
    while (distSum + d >= acc) {
      let t = (acc - distSum) / d;
      lineTargets.push(p5.Vector.lerp(a, b, t));
      acc += step;
      if (lineTargets.length >= targetCount) break;
    }
    distSum += d;
  }
}
