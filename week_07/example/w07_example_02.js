// w07_example_02.js

// 원의 반지름
let radius = 370;

// 원 위의 점 개수
// 12: 기본 분할 수 (360도/12 = 30도 간격)
// 배수를 늘리면 더 조밀한 패턴 생성 (예: 12*3 = 36개 점)
// let pointCount = 12 * 1;
let pointCount = 72 * 6;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(35, 10, 20);

  // 캔버스 중앙으로 원점 이동
  translate(width * 0.5, height * 0.5);

  // 회전 배율 (시간에 따라 증가)
  // frameCount가 증가하면서 끝점의 각도가 점점 더 많이 회전함
  let rotationScale = 1 + 0.001 * frameCount;

  // 원 위의 각 점에서 나선형으로 선 그리기
  for (let i = 0; i < pointCount; i++) {
    // 현재 점의 각도 (라디안)
    let angle = (TWO_PI * i) / pointCount;

    // 시작점: 원 위의 고정된 위치
    let x1 = radius * cos(angle);
    let y1 = radius * sin(angle);

    // 끝점: 회전된 각도의 위치
    let x2 = radius * cos(rotationScale * angle);
    let y2 = radius * sin(rotationScale * angle);

    // 선 그리기
    strokeWeight(0.5);
    stroke(240, 210, 0);
    line(x1, y1, x2, y2);
  }
}
