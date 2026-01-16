// w12_example_06.js

let boxes = [];

let numBoxes = 10; // 걸림돌 개수 (사용자가 조절)
const ropeLength = 600;
const gravity = 0.98;
const springK = 0.11;
const damping = 0.89;

let anchor;
let isDragging = false;
let dragOffset;

function setup() {
  createCanvas(600, 1200);
  rectMode(CENTER);

  anchor = {
    x: width / 2,
    y: 100,
    originalX: width / 2,
  };

  let baseSpacing = ropeLength / (numBoxes + 1);

  for (let i = 0; i < numBoxes; i++) {
    let jitter = random(-20, 20);
    let rest = baseSpacing + jitter;

    let yPos = anchor.y + baseSpacing * (i + 1) + random(-15, 15);

    boxes.push({
      x: width / 2,
      y: yPos,
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,

      size: random(12, 80), // 걸림돌 크기 랜덤
      restLength: rest, // 매듭 간 간격 랜덤

      angle: 0,
      angularVel: 0,
    });
  }
}

function draw() {
  background(20, 25, 30);

  // 현재(고정점) 조작
  if (isDragging) {
    anchor.x = mouseX + dragOffset.x;
    anchor.x = constrain(anchor.x, 120, width - 120);
  } else {
    anchor.x += (anchor.originalX - anchor.x) * 0.05;
  }

  // 물리 계산
  for (let i = 0; i < boxes.length; i++) {
    let b = boxes[i];
    b.ax = 0;
    b.ay = 0;

    let above = i === 0 ? anchor : boxes[i - 1];
    applySpring(b, above, b.restLength);

    if (i < boxes.length - 1) {
      let below = boxes[i + 1];
      applySpring(b, below, b.restLength);
    }

    b.ay += gravity;

    b.vx *= damping;
    b.vy *= damping;

    b.vx += b.ax;
    b.vy += b.ay;

    b.x += b.vx;
    b.y += b.vy;

    b.angularVel = b.vx * 0.02;
    b.angularVel *= 0.92;
    b.angle += b.angularVel;
  }

  // 밧줄
  drawRopeSegment(anchor.x, anchor.y, boxes[0].x, boxes[0].y);
  for (let i = 0; i < boxes.length - 1; i++) {
    drawRopeSegment(boxes[i].x, boxes[i].y, boxes[i + 1].x, boxes[i + 1].y);
  }

  // 현재(고정점)
  noStroke();
  fill(100, 100, 120);
  circle(anchor.x, anchor.y, 20);
  fill(70, 70, 90);
  circle(anchor.x, anchor.y, 22);

  // 걸림돌
  for (let b of boxes) {
    push();
    translate(b.x, b.y);
    rotate(b.angle);

    // 그림자
    fill(0, 0, 0, 50);
    rect(3, 3, b.size, b.size);

    // 본체
    fill(200, 180, 150);
    stroke(150, 130, 100);
    strokeWeight(2);
    rect(0, 0, b.size, b.size);

    // 내부 강조
    noStroke();
    fill(220, 200, 170, 120);
    rect(0, 0, b.size * 0.6, b.size * 0.6);

    pop();
  }

  // 텍스트
  fill(200, 200, 220);
  textAlign(CENTER);
  textSize(18);
  text("현재를 흔들어 미래의 걸림돌을 떨구어 버리세요.", width / 2, 50);
}

function applySpring(a, b, rest) {
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  let dist = sqrt(dx * dx + dy * dy) || 0.0001;

  let force = (dist - rest) * springK;
  a.ax += (dx / dist) * force;
  a.ay += (dy / dist) * force;
}

function drawRopeSegment(x1, y1, x2, y2) {
  let midX = (x1 + x2) * 0.5;
  let midY = (y1 + y2) * 0.5;
  let sag = dist(x1, y1, x2, y2) * 0.15;

  stroke(180, 150, 120, 150);
  strokeWeight(4);
  noFill();
  bezier(x1, y1, midX, midY + sag, midX, midY + sag, x2, y2);
}

function mousePressed() {
  if (dist(mouseX, mouseY, anchor.x, anchor.y) < 150) {
    isDragging = true;
    dragOffset = { x: anchor.x - mouseX };
  }
}

function mouseReleased() {
  isDragging = false;
}

function mouseDragged() {
  if (isDragging) {
    let v = (mouseX - pmouseX) * 0.5;
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].vx += v / (i + 1);
    }
  }
}

/*
중앙 정렬된 매듭은 “삶의 경로 한가운데 존재하는 장애물”
장애물의 크기와 간격이 일정하지 않은 것은 다양한 미래의 문제들을 은유합니다.
현재를 흔들수록 상단에서 하단으로 파동이 전달되며, 
장애물을 떨춰버리도록 노력하는 모습이 시각화되어 보여집니다.

다음 단계로는
· 특정 세기 이상 흔들면 장애물이 사라지거나
· 미래로 갈수록 점차 투명해지거나
· 특정 조건에서 끊어지는 매듭 으로 인터랙션 및 비주얼을 발전시킬 수 있습니다.
 */
