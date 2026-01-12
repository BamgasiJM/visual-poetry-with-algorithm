// w02_example_01.js

// setup() : 캔버스를 처음 만들 때 한 번 실행됩니다.
function setup() {
  createCanvas(1000, 1000);   // 캔버스 가로 세로 크기
  background(30);              // 배경 검은색
  noStroke();                 // 테두리 없음
  fill(220);                  // 도형 색상 하얀색
}

// draw() : 그림을 그리는 부분
function draw() {
  let centerX = width / 2;
  let centerY = height / 2;
  let halfW = width / 2;
  let halfH = height / 2;

  // 도형 크기 (사분면의 약 70% 정도 차지)
  let shape_size = min(halfW, halfH) * 0.7;

  // 1사분면 (오른쪽 위) - 원 하나
  circle(centerX + halfW / 2, centerY - halfH / 2, shape_size);

  // 2사분면 (왼쪽 위) - 삼각형 하나
  let triX = centerX - halfW / 2;
  let triY = centerY - halfH / 2;
  triangle(
    triX,
    triY - shape_size / 2,
    triX - shape_size / 2,
    triY + shape_size / 2,
    triX + shape_size / 2,
    triY + shape_size / 2
  );

  // 3사분면 (왼쪽 아래) - 사각형 하나
  rectMode(CENTER);
  rect(centerX - halfW / 2, centerY + halfH / 2, shape_size, shape_size);

  // 4사분면 (오른쪽 아래) - 6각형(육각형) 하나
  let curveX = centerX + halfW / 2; // 이 사분면의 중심 x좌표
  let curveY = centerY + halfH / 2; // 이 사분면의 중심 y좌표

  // 6각형의 반지름 (사분면 크기에 맞춰 크게)
  let radius = min(halfW, halfH) * 0.4;

  beginShape();

  // 6각형은 360도를 6등분 → 각 60도
  for (let i = 0; i < 6; i++) {
    // 각도를 라디안으로 바꿈 (p5.js는 degree가 아니라 radian 사용)
    let angle = radians(i * 60);

    // x, y 좌표 계산 (중심에서 반지름만큼 떨어진 점)
    let x = curveX + cos(angle) * radius;
    let y = curveY + sin(angle) * radius;

    // 그 점을 꼭짓점으로 추가
    vertex(x, y);
  }

  endShape(CLOSE); // 자동으로 닫힌 6각형 완성!

  noLoop(); // 한 번만 그리고 멈춤
}

// 창 크기 바뀔 때 다시 그리기
function windowResized() {
  resizeCanvas(1000, 1000);
  background(0);
  redraw();
}
