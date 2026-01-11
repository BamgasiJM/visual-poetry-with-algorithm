// w07_example_04.js

let a = 3, b = 2;      // 주파수 비율 (복잡성 증가)
let delta = 0;         // 위상 차이
let scale = 180;       // 패턴 크기
let rotationAngle = 0; // 회전 각도
let hueCycle = 0;      // Hue 순환 변수
let hueDirection = 1;  // Hue 증가/감소 방향

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 1);
  background(30, 20, 5);
  angleMode(DEGREES);
  noFill();
}

function draw() {
  background(30, 20, 5, 0.05); // 잔상 효과

  translate(width / 2, height / 2);
  // rotate(rotationAngle);

  // Hue 순환: 0→360→0 (빨강→보라→빨강)
  hueCycle += 0.5 * hueDirection;
  if (hueCycle >= 360) hueDirection = -1;
  if (hueCycle <= 0) hueDirection = 1;

  // 복잡한 리사주 패턴 그리기 (n중 루프)
  for (let i = 0; i < 7; i++) {
    // 레이어 수
    push();
    rotate(i * 120); // n도씩 회전하여 패턴 중첩
    for (let angle = 0; angle < 360; angle += 0.3) {
      // 12중 리사주 곡선 계산
      let x =
        sin(a * angle) * scale +
        sin(b * angle * 1.5) * scale * 0.6 +
        cos(delta + angle * 0.7) * scale * 0.3;
      let y =
        cos(a * angle + delta) * scale +
        sin(b * angle * 1.2) * scale * 0.5 +
        sin(delta + angle * 1.3) * scale * 0.4;

      // 색상: Hue 순환 + 레이어별 변형
      let hue = (hueCycle + i * 30) % 360;
      let saturation = 95;
      let brightness = 100;
      let alpha = 1.0;

      stroke(hue, saturation, brightness, alpha);
      strokeWeight(1.8);
      point(x, y);
    }
    pop();
  }

  // 주파수 변화
  a = 3 + sin(frameCount * 0.007) * 1.7;
  b = 2 + cos(frameCount * 0.005) * 1.2;
  delta += 0.7;
}
