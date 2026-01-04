// **[p5.js 코드 시작]**

// 전역 변수 설정 (Variables)

// 캔버스의 너비와 높이를 정의합니다.
const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;

// 격자 배치를 위한 가로(열)와 세로(행) 개수입니다.
const NUM_COLS = 10;
const NUM_ROWS = 10;

// 각 셀(도형)이 차지하는 너비와 높이를 미리 계산합니다.
const CELL_W = CANVAS_WIDTH / NUM_COLS;
const CELL_H = CANVAS_HEIGHT / NUM_ROWS;

// 애니메이션 속도를 조절하는 상수입니다. 이 값이 커질수록 변화가 빨라집니다.
const SPEED_FACTOR = 0.02;

// setup() 함수: 프로그램 시작 시 한 번 실행됩니다.
function setup() {
  // 지정된 크기로 캔버스를 생성합니다.
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  // 사각형의 기준점을 중심으로 설정합니다.
  rectMode(CENTER);
  // 테두리를 없앱니다.
  noStroke();
  // 드로잉 속도를 초당 60프레임으로 설정하여 부드러운 애니메이션을 구현합니다.
  frameRate(60);
}

// draw() 함수: 프레임마다 반복 실행됩니다. 애니메이션의 핵심 로직입니다.
function draw() {
  // 배경색을 매 프레임마다 다시 칠하여 이전 프레임의 잔상을 지웁니다.
  background(240); // 밝은 회색 배경

  // 반복문 시작: 격자 배치를 위한 이중 for 반복문입니다.
  for (let j = 0; j < NUM_ROWS; j++) {
    // j: 현재 행(세로 위치) 인덱스
    for (let i = 0; i < NUM_COLS; i++) {
      // i: 현재 열(가로 위치) 인덱스

      // 1. 위치 계산 (Position)

      // 현재 사각형의 중심 x, y 좌표를 계산합니다.
      const x = i * CELL_W + CELL_W / 2;
      const y = j * CELL_H + CELL_H / 2;

      // 2. 색상 설정 (Color)

      // 가로 위치(i)를 이용해 짙은 회색에서 밝은 회색으로 부드럽게 변하는 색상 그라데이션을 만듭니다.
      let grayValue = map(i, 0, NUM_COLS - 1, 60, 200);
      // 세로 위치(j)를 이용해 색상에 미세한 오프셋을 추가합니다.
      let colorOffset = map(j, 0, NUM_ROWS - 1, 0, 30);

      // 사각형의 채우기 색상을 설정합니다.
      fill(grayValue + colorOffset);

      // 3. 애니메이션 크기 계산 (Size Animation)

      // 기본 사각형 크기를 설정합니다 (셀 크기의 80%).
      let baseSize = min(CELL_W, CELL_H) * 0.8;

      // **애니메이션 요소**: sin() 함수와 frameCount를 사용합니다.
      // frameCount: 프로그램이 시작된 후 현재까지 그려진 프레임 수 (시간의 흐름)
      // i + j: 각 도형의 고유한 위치 값 (파동이 시작되는 지점)

      // 파동 효과의 인자: (위치 인덱스 + 현재 시간) * 속도
      const waveInput = (i + j + frameCount) * SPEED_FACTOR;

      // sin() 함수의 결과는 -1과 1 사이를 반복합니다.
      // 이 값을 baseSize의 15% 범위 내에서 변화하도록 조정합니다.
      let sizeVariation = sin(waveInput) * (baseSize * 0.15);

      // 최종 크기: 기본 크기에 주기적인 변화를 더합니다.
      let finalSize = baseSize + sizeVariation;

      // 4. 사각형 그리기 (Draw)

      // 계산된 위치와 애니메이션 크기로 사각형을 그립니다.
      rect(x, y, finalSize, finalSize);
    } // 가로 반복문 종료
  } // 세로 반복문 종료
}

