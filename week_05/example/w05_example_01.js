// w05_example_01.js

function setup() {
  createCanvas(800, 800);
  noStroke();
}

function draw() {
  background(0); // 검은색 배경

  // 사인 함수에 따른 크기 변화
  // 기본 원 크기는 300
  // 여기에 sin함수를 사용한 값이 매 프레임마다 갱신
  // 기본 크기에 변화량을 더하는 로직 (-/+)
  // frameCount는 초당 60개씩 증가. 0.05로 속도(주기) 조절
  // sin함수는 -1 ~ 1 사이의 값을 반환
  // 100은 변화의 폭(진폭)
  let pulseSize1 = 
    300 + 
    sin(frameCount * 0.03) * 100;

  // 더 다이내믹한 맥동 효과: sin과 cos를 조합하고 다양한 주기와 크기 변화 적용
  let pulseSize2 =
    350 +
    cos(frameCount * 0.1) * 20 +        
    sin(frameCount * 0.23) * 15 +       
    cos(frameCount * 0.7) * 2 +        
    noise(frameCount * 0.05) * 90;  

  // 민트색 원 그리기 (30, 210, 200)
  fill(30, 210, 200);
  ellipse(width / 2, height / 2, pulseSize1, pulseSize1);
}
