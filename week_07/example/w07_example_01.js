// w07_example_01.js

function setup() {
  createCanvas(800, 800);
  background(50, 190, 180);
}

function draw() {
  background(50, 190, 180);

  // 캔버스 중앙으로 원점 이동
  translate(width / 2, height / 2);

  // 다각형 설정
  let radius = 300;    // 중심에서 꼭짓점까지의 거리
  let vertexCount = 6; // 꼭짓점 개수 (6 = 육각형)

  // 도형 스타일 설정
  noFill();
  stroke(0);
  strokeWeight(24);

  // 극좌표 방식으로 다각형 그리기
  beginShape();
  for (let i = 0; i <= vertexCount; i++) {
    // 각 꼭짓점의 각도 계산
    let angle = (TWO_PI * i) / vertexCount;

    // 극좌표를 직교좌표로 변환
    let x = radius * cos(angle);
    let y = radius * sin(angle);

    vertex(x, y);
  }
  endShape();
}
