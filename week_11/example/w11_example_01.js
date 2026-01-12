// w11_example_01.js

let centerObj;
let dragObj;
let isDragging = false;

function setup() {
  createCanvas(800, 800);
  colorMode(RGB);

  centerObj = {
    x: width / 2,
    y: height / 2,
    baseSize: 240,
  };

  dragObj = {
    x: width / 2 + 200,
    y: height / 2,
    r: 20,
  };
}

function draw() {
  background(20);

  // 거리 계산
  let d = dist(centerObj.x, centerObj.y, dragObj.x, dragObj.y);
  let maxDist = 800;
  let t = constrain(d / maxDist, 0, 1);

  // 색상 보간 (가까울수록 따뜻한 색)
  let c1 = color(255, 80, 80);
  let c2 = color(80, 150, 255);
  let centerColor = lerpColor(c1, c2, t);

  // 형태 변화: 삼각형 ~ 64각형
  let sides = int(map(t, 0, 1, 3, 64));

  noStroke();
  fill(centerColor);
  drawPolygon(centerObj.x, centerObj.y, centerObj.baseSize, sides);

  // 거리 체크 라인
  stroke(200);
  strokeWeight(3);
  line(centerObj.x, centerObj.y, dragObj.x, dragObj.y);

  // 거리 핸들 오브젝트
  fill(240);
  ellipse(dragObj.x, dragObj.y, dragObj.r * 2);
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

  colorMode(RGB, 255);
  fill(220);
  textSize(24);
  textAlign(CENTER);
  text("<하얀 원을 드래그해서 중심과의 거리를 바꿔 보세요>", 400, 50);
}
