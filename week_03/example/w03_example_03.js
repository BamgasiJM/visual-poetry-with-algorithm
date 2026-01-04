// w03_example_02.js

// --- 전역 변수 설정 (Global Variables) ---

let canvasSize = 800; 
let numCircles = 10;  // 동심원의 개수
let numSegments = 30; // 분할 각의 개수
let startHue;         // !!! 새로 추가: 매 실행마다 달라질 시작 색조(Hue) 값

// --- setup() 함수: 초기 설정 ---
function setup() {
  createCanvas(canvasSize, canvasSize); 
  
  colorMode(HSB, 360, 100, 100, 100); 
  angleMode(DEGREES); 
  
  // !!! 주요 수정 사항: setup에서 0부터 359 사이의 랜덤 Hue 값을 설정합니다.
  // 이 값이 그라데이션의 중심 색상 범위를 결정합니다.
  startHue = random(360); 
  
  noLoop(); 
}

// --- draw() 함수: 한 번 실행 ---
function draw() {
  // 배경색은 아주 밝은 회색으로 고정하여 중심 색상을 강조합니다.
  background(0, 0, 98); 
  
  noStroke(); 
  
  let centerX = canvasSize / 2;
  let centerY = canvasSize / 2;
  
  let maxRadius = dist(0, 0, centerX, centerY);
  let radiusStep = maxRadius / numCircles; 
  let angleStep = 360 / numSegments; 
  
  // 동심원 개수만큼 반복하며 바깥쪽부터 안쪽으로 그립니다.
  for (let i = numCircles; i >= 1; i--) {
    let currentRadius = i * radiusStep;
    
    // 1. HUE(색조) 변화 로직 수정: startHue 값을 기준으로 매핑합니다.
    
    // i가 1일 때 (안쪽 원): startHue 값
    // i가 10일 때 (바깥쪽 원): startHue + 120 (색조가 120도 정도 차이 나도록 설정)
    // % 360을 사용하여 Hue 값이 360을 넘어가도 순환되도록 합니다.
    let targetHue = (startHue + 120) % 360; 
    let currentHue = map(i, 1, numCircles, startHue, targetHue) % 360; 
    
    // 채도(Saturation): 안쪽 100 -> 바깥쪽 50 (요청에 따라 극적인 대비 유지)
    let currentSaturation = map(i, 1, numCircles, 100, 50); 
    
    // 명도(Brightness): 안쪽 60 -> 바깥쪽 90 (요청에 따라 명암 대비 유지)
    let currentBrightness = map(i, 1, numCircles, 60, 90);

    // 2. 분할된 각도만큼 반복하며 부채꼴 조각을 그립니다.
    for (let j = 0; j < numSegments; j++) {
      
      let angleStart = j * angleStep;
      let angleEnd = (j + 1) * angleStep;
      
      // 각 조각마다 미세한 색상 변화를 주어 질감을 표현합니다.
      // (currentHue + (j * 0.2)) % 360을 사용하여 미세한 색조 변화를 줍니다.
      let segmentHue = (currentHue + (j * 0.2)) % 360; 
      
      fill(segmentHue, currentSaturation, currentBrightness, 100);
      
      // arc() 함수를 사용하여 부채꼴을 그립니다.
      arc(
        centerX, centerY,           
        currentRadius * 2,          
        currentRadius * 2,          
        angleStart,                 
        angleEnd,                   
        PIE                         
      );
    }
  }
}