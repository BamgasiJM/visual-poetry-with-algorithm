// w03_example_04.js

// 캔버스 크기 설정 
let canvasW = 1000;
let canvasH = 600;

// 사용할 색상 팔레트
let colors = [
  "#F94144", // 강한 붉은색
  "#F3722C", // 주황
  "#F9C74F", // 노랑
  "#90BE6D", // 연두
  "#577590", // 푸른 회색
];

function setup() {
  // 캔버스 생성
  createCanvas(canvasW, canvasH);

  // 배경을 어두운 톤으로 설정
  background(20);

  // 외곽선 제거
  noStroke();

  // 세로 방향으로 여러 줄을 만들어
  // 각 줄마다 감정의 흐름을 표현
  let rows = 14;

  // 한 줄의 높이 계산
  let rowHeight = height / rows;

  // 각 줄을 반복
  for (let r = 0; r < rows; r++) {
    // 현재 줄의 y 위치
    let y = r * rowHeight + rowHeight / 2;

    // 가로 방향으로 도형을 배치
    for (let x = 0; x < width; x += random(30, 80)) {
      // 도형의 너비와 높이를 랜덤으로 설정
      let w = random(20, 100);
      let h = random(6, rowHeight * 0.6);

      // 색상 배열에서 랜덤 선택
      let c = random(colors);

      // 투명도를 주어 겹침이 자연스럽게 보이도록 설정
      fill(red(c), green(c), blue(c), 180);

      // 약간의 세로 흔들림을 추가하여
      // 기계적인 정렬을 피함
      let offsetY = random(-10, 10);

      // 얇은 사각형을 사용해
      // 감정의 흐름을 선처럼 표현
      rect(x, y + offsetY, w, h);
    }
  }

  // 정적인 이미지이므로 반복 중단
  noLoop();
}

function draw() {
  // 정적 작업이므로 draw에서는 아무 작업도 하지 않음
}
