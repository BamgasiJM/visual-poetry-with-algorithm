// w03_example_01.js

// 시간 경과에 따른 배경색 변화와 클릭 이벤트로 색이 바뀌는 중앙 원

// --- 전역 변수 설정 (Global Variables) ---

let canvasSize = 800; // 캔버스 폭과 높이를 800으로 통일
let circleRadius = 250; // 중앙에 위치할 원의 반지름
let backgroundColor;    // 배경색을 저장할 변수
let circleColor;        // 원의 색상을 저장할 변수
let timeOffset = 0;     // 배경색 변화를 위한 시간 오프셋 변수

// --- setup() 함수: 초기 설정 ---
function setup() {
  // 800 x 800 캔버스를 생성합니다.
  createCanvas(canvasSize, canvasSize); 
  
  // 색상 모드를 HSB(Hue, Saturation, Brightness)와 투명도(Alpha)를 사용하도록 설정합니다.
  // H: 0-360, S/B/A: 0-100
  colorMode(HSB, 360, 100, 100, 100); 
  
  // 초기 배경색은 검은색(명도 0)으로 설정합니다.
  backgroundColor = color(0, 0, 0, 100); 
  
  // 원의 초기 색상은 흰색으로 설정합니다.
  // 마우스 클릭 시 RGB 랜덤 색상으로 변경됩니다.
  circleColor = color(0, 0, 100, 100); // HSB 흰색: 채도 0, 명도 100
  
  // draw() 함수가 반복 실행되도록 loop()를 유지합니다.
  // noLoop()를 사용하지 않아 기본적으로 애니메이션이 활성화됩니다.
}

// --- draw() 함수: 반복 실행 (애니메이션) ---
function draw() {
  // 1. 시간 경과에 따른 배경색 계산 및 적용
  
  // timeOffset을 조금씩 증가시켜 시간에 따른 변화를 만듭니다.
  timeOffset += 0.5; 
  
  // HSB의 '색상(Hue)' 값을 노이즈(noise) 함수를 이용하여 계산합니다.
  // noise(timeOffset * 0.005)는 0~1 사이의 부드러운 랜덤 값을 반환하며, 
  // 이를 0~360 사이의 Hue 값으로 변환합니다.
  let currentHue = map(noise(timeOffset * 0.005), 0, 1, 0, 360);
  
  // 배경색 변수에 새로운 Hue 값을 적용합니다.
  // 채도(Saturation)와 명도(Brightness)는 80, 투명도(Alpha)는 100으로 고정하여
  // '가득 찬 색'의 분위기를 냅니다.
  backgroundColor = color(currentHue, 80, 80, 100);
  
  // 계산된 배경색으로 캔버스를 꽉 채웁니다.
  background(backgroundColor); 

  
  // 2. 중앙 원 그리기
  
  // 외곽선은 그리지 않습니다.
  noStroke();
  
  // 원의 색상을 설정합니다.
  // 이 값은 마우스 클릭 시 `mousePressed()` 함수에서 변경됩니다.
  fill(circleColor);
  
  // 캔버스 정중앙에 원을 그립니다.
  let centerX = canvasSize / 2;
  let centerY = canvasSize / 2;
  ellipse(centerX, centerY, circleRadius * 2, circleRadius * 2); 
}

// --- mousePressed() 함수: 마우스 버튼이 눌렸을 때 한 번 실행됩니다. ---
function mousePressed() {
  // 원의 색상을 랜덤 RGB로 변경합니다.
  
  // 색상 모드를 일시적으로 RGB로 변경합니다. (p5.js의 기본값 0-255)
  // push()와 pop()을 사용하여 이 변경이 draw() 함수에 영향을 미치지 않도록 격리합니다.
  push(); 
  colorMode(RGB, 255); 
  
  // R, G, B 각각 0~255 사이의 랜덤 값을 선택합니다.
  let randomR = random(255);
  let randomG = random(255);
  let randomB = random(255);
  
  // HSB 모드(360, 100, 100, 100)를 사용하는 `circleColor` 변수에 새로운 RGB 색상을 저장하기 위해,
  // 먼저 p5.js의 `color()` 함수를 RGB 값으로 호출하여 새로운 색 객체를 만든 후,
  // 이를 HSB 모드로 변환하여 저장합니다. (p5.js가 내부적으로 이를 처리함)
  circleColor = color(randomR, randomG, randomB, 255); 
  
  pop(); // 원래의 HSB 모드(360, 100, 100, 100) 설정으로 돌아갑니다.
}

// --- windowResized() 함수: 창 크기가 변경될 때 실행됩니다. ---
// 캔버스 크기를 800x800으로 고정했으므로 이 함수는 필요 없지만,
// 창이 리사이즈될 때 캔버스가 중앙에 오도록 하거나, 캔버스 크기를 다시 조정하고 싶을 때 사용합니다.
function windowResized() {
  // 캔버스 크기를 고정 유지합니다.
  // resizeCanvas(canvasSize, canvasSize); 
}