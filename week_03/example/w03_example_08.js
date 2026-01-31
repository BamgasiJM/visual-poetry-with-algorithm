// w03_example_08.js

// *** 마우스 위치에 반응하여 크기와 색상이 변하는 그리드 원 *** //

// --- 전역 변수 설정 (Global Variables) ---

let canvasW = 1080; // 캔버스 폭
let canvasH = 1080; // 캔버스 높이
let defaultR = 5; // 원의 기본 반지름 (R = Radius)
let spacing = 40; // 그리드 간격 (원 지름의 2배)
let hoverDistance = 250; // 마우스 반응 거리 (픽셀)

// --- setup() 함수: 초기 설정 ---
function setup() {
  // 1920 x 1080 캔버스를 생성합니다.
  createCanvas(canvasW, canvasH);

  // 색상 모드를 HSB(Hue, Saturation, Brightness)와 투명도(Alpha)를 사용하도록 설정합니다.
  // H: 0-360, S/B/A: 0-100
  colorMode(HSB, 360, 100, 100, 100);

  // draw() 함수가 반복 실행되도록 loop()를 유지합니다. (애니메이션 및 마우스 반응)
}

// --- draw() 함수: 반복 실행 (그리드 및 마우스 반응) ---
function draw() {
  // 배경색을 화이트(명도 100)로 설정합니다.
  background(0, 0, 80);

  noStroke(); // 외곽선은 그리지 않습니다.

  // 그리드 형태로 원을 반복하며 그립니다.
  // 캔버스 폭(canvasW)을 spacing 간격으로 나누어 x 좌표 반복 횟수를 계산합니다.
  for (let x = spacing / 2; x < canvasW; x += spacing) {
    // 캔버스 높이(canvasH)를 spacing 간격으로 나누어 y 좌표 반복 횟수를 계산합니다.
    for (let y = spacing / 2; y < canvasH; y += spacing) {
      // 1. 마우스와의 거리 계산
      // dist() 함수: 두 점 (x, y)와 (mouseX, mouseY) 사이의 거리를 계산합니다.
      let d = dist(x, y, mouseX, mouseY);

      // 2. 크기(반지름) 변화 로직
      let currentR;
      if (d < hoverDistance) {
        // 거리가 반응 거리(hoverDistance) 이내일 때:
        // map() 함수를 사용하여 거리가 가까울수록 반지름이 커지도록 합니다.
        // d가 0일 때 (마우스가 원 중앙) -> 반지름 최대 (defaultR * 2.5)
        // d가 hoverDistance일 때 -> 반지름 최소 (defaultR)
        currentR = map(d, 0, hoverDistance, defaultR * 4.5, defaultR);
      } else {
        // 거리가 멀 때는 기본 반지름을 유지합니다.
        currentR = defaultR;
      }

      // 3. 색상(Color) 변화 로직
      // 마우스와의 거리에 따라 '검은색 ~ 다이내믹 컬러'로 바뀝니다.

      let currentBrightness; // 명도(밝기): 검은색(0) <-> 동적색상(100)을 결정
      let currentSaturation; // 채도: 0(무채색/회색) <-> 100(진한 색)을 결정

      if (d < hoverDistance) {
        // 마우스가 가까울 때: 다이내믹 컬러
        // 거리가 가까울수록 명도와 채도가 높아져 색이 선명해집니다.
        currentBrightness = map(d, 0, hoverDistance, 100, 20); // 명도: 100 (밝음) -> 20 (어두운 회색)
        currentSaturation = map(d, 0, hoverDistance, 100, 0); // 채도: 100 (진한 색) -> 0 (무채색)

        // Hue(색조)는 시간에 따라 빠르게 변하도록 합니다.
        // frameCount는 프로그램이 실행된 프레임 수이며, % 360으로 0~359 사이의 값을 반복합니다.
        let dynamicHue = (frameCount * 2) % 360; // * n으로 속도 변경

        // 최종 색상 설정: 동적인 색상
        fill(dynamicHue, currentSaturation, currentBrightness, 100);
      } else {
        // 마우스가 멀 때: 짙은 회색 (거의 검은색)
        // HSB: 채도 0, 명도 10-20 정도가 짙은 회색입니다.
        let baseBrightness = 15;
        let baseSaturation = 0;

        // 최종 색상 설정: 짙은 회색
        fill(0, baseSaturation, baseBrightness, 100);
      }

      // 4. 원 그리기
      ellipse(x, y, currentR * 2, currentR * 2);
    }
  }
}