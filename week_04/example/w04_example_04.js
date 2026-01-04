

// 전역 변수 설정 (Variables)

// 캔버스 크기를 정의합니다.
const CANVAS_SIZE = 600;

// 동심원을 구성할 원의 개수입니다.
const NUM_CIRCLES = 40;

// 중심이 왕복하는 속도를 조절하는 상수입니다.
const SPEED_CENTER = 0.003;

// 동심원들의 크기가 맥동하는 속도를 조절하는 상수입니다.
const SPEED_PULSE = 0.05;

// setup() 함수: 프로그램 시작 시 한 번 실행됩니다.
function setup() {
  // 600x600 크기의 캔버스를 생성합니다.
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  // 색상 모드를 HSB(색조, 채도, 명도)로 설정하여 화려한 색상을 쉽게 만듭니다.
  // 최대 값: H(360), S(100), B(100), Alpha(100)
  colorMode(HSB, 360, 100, 100, 100);
  // 드로잉 속도를 60FPS로 설정하여 부드러운 애니메이션을 만듭니다.
  frameRate(60);
}

// draw() 함수: 프레임마다 반복 실행됩니다.
function draw() {
  // 배경을 어두운 색으로 설정하여 화려한 원을 돋보이게 합니다.
  background(5);

  // 1. 중심 X 좌표 왕복 운동 계산

  // frameCount(시간)를 이용하여 -1과 1 사이를 반복하는 값을 얻습니다.
  // map() 함수를 사용하여 이 값을 캔버스 중앙을 기준으로 왼쪽 끝에서 오른쪽 끝(CANVAS_SIZE/4 ~ 3*CANVAS_SIZE/4)까지 왕복하도록 매핑합니다.
  const centerX = map(
    sin(frameCount * SPEED_CENTER * TWO_PI), // sin() 값은 -1.0 ~ 1.0
    -1,
    1,
    CANVAS_SIZE * 0.25, // 최소 x 위치 (왼쪽 1/4 지점)
    CANVAS_SIZE * 0.75 // 최대 x 위치 (오른쪽 3/4 지점)
  );

  // 중심 Y 좌표는 항상 캔버스 중앙에 고정합니다.
  const centerY = CANVAS_SIZE / 2;

  // 원 그리기 설정: 채우기 색상(fill)은 없애고, 테두리(stroke)만 얇게 남깁니다.
  noFill();
  // 선의 굵기를 얇게 설정합니다.
  strokeWeight(1);

  // 2. 동심원 반복문: NUM_CIRCLES 수만큼 원을 그립니다.
  // i는 0부터 NUM_CIRCLES - 1까지 증가합니다. (가장 안쪽 원부터 바깥쪽 원까지)
  for (let i = 0; i < NUM_CIRCLES; i++) {
    // **색상 변화 계산**

    // i(원의 인덱스)를 이용해 0부터 360까지 색조(Hue) 값을 매핑하고,
    // frameCount(시간)를 더해 시간이 지남에 따라 색상이 계속 변화하도록 합니다 (화려함).
    let hueValue = (map(i, 0, NUM_CIRCLES - 1, 0, 360) + frameCount * 2) % 360;

    // 원의 색상을 설정합니다. (색조, 채도, 명도, 불투명도)
    stroke(hueValue, 90, 95, 100);

    // **반지름(r) 맥동 계산**

    // 원의 기본 반지름: i(인덱스)에 비례하여 바깥으로 커집니다.
    const baseRadius = i * 10; // 인접한 원과의 간격은 10픽셀입니다.

    // **맥동 애니메이션 요소**:
    // i(위치 인덱스)와 frameCount(시간)를 결합하여 파동 효과를 만듭니다.
    const pulseInput = i * 0.2 + frameCount * SPEED_PULSE;

    // sin() 함수의 결과(-1~1)를 이용하여 반지름 변화량(offset)을 계산합니다.
    // baseRadius * 0.2: 바깥쪽 원일수록 변화 폭이 커지게 설정합니다.
    let radiusOffset = sin(pulseInput) * (baseRadius * 0.2);

    // 최종 반지름: 기본 반지름에 맥동 변화량을 더합니다.
    const finalRadius = baseRadius + radiusOffset;

    // 3. 원 그리기 (Draw)

    // 계산된 중심점과 최종 반지름으로 원을 그립니다.
    // p5.js의 circle(x, y, d) 함수는 지름(d)을 인수로 받습니다.
    circle(centerX, centerY, finalRadius * 2);
  } // 동심원 반복문 종료
}
