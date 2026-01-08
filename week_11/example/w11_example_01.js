let centerObj;
let dragObj;
let isDragging = false;

function setup() {
  createCanvas(800, 800);
  colorMode(RGB);

  centerObj = {
    x: width / 2,
    y: height / 2,
    baseSize: 120,
  };

  dragObj = {
    x: width / 2 + 200,
    y: height / 2,
    r: 20,
  };
}

function draw() {
  background(200);

  // 거리 계산
  let d = dist(centerObj.x, centerObj.y, dragObj.x, dragObj.y);
  let maxDist = 300;
  let t = constrain(d / maxDist, 0, 1);

  // 색상 보간 (가까울수록 따뜻한 색)
  let c1 = color(255, 80, 80);
  let c2 = color(80, 150, 255);
  let centerColor = lerpColor(c1, c2, t);

  // 형태 변화: 원 → 다각형
  let sides = int(map(t, 0, 1, 3, 24));

  noStroke();
  fill(centerColor);
  drawPolygon(centerObj.x, centerObj.y, centerObj.baseSize, sides);

  // 드래그 오브젝트
  fill(240);
  ellipse(dragObj.x, dragObj.y, dragObj.r * 2);

  // 보조 시각화: 거리 라인
  stroke(120);
  line(centerObj.x, centerObj.y, dragObj.x, dragObj.y);
}

function mousePressed() {
  let d = dist(mouseX, mouseY, dragObj.x, dragObj.y);
  if (d < dragObj.r) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    dragObj.x = mouseX;
    dragObj.y = mouseY;
  }
}

function mouseReleased() {
  isDragging = false;
}

function drawPolygon(x, y, r, sides) {
  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = (TWO_PI * i) / sides;
    let px = x + cos(angle) * r;
    let py = y + sin(angle) * r;
    vertex(px, py);
  }
  endShape(CLOSE);
}
