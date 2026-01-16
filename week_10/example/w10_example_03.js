// w10_example_03.js

// 점들을 저장할 배열
let points = [];
// 생성할 점의 개수
const POINT_COUNT = 5200;

function setup() {
  createCanvas(500, 500);
  background(10); // 어두운 배경
  stroke(255);    // 흰색 점

  // 점 초기화
  for (let i = 0; i < POINT_COUNT; i++) {
    // 반지름: 50부터 캔버스 너비의 40%까지 랜덤
    let r = random(50, width * 0.4);
    // 각도: 0부터 2π까지 랜덤
    let angle = random(TWO_PI);

    points.push({
      r: r, // 반지름
      angle: angle, // 각도
      angularSpeed: random(0.001, 0.01), // 회전 속도
      drift: 0, // 붕괴 정도
      noiseOffset: random(1000), // 노이즈 오프셋 (랜덤한 움직임 패턴을 위해)
    });
  }
}

function draw() {
  translate(width / 2, height / 2); // 캔버스 중앙을 원점으로 설정

  // 잔상 효과를 위한 투명도 있는 배경
  background(10, 5);

  // 모든 점 업데이트 및 그리기
  for (let p of points) {
    // 1. 회전: 각도를 회전 속도만큼 증가
    p.angle += p.angularSpeed;

    // 2. 붕괴 가속: 붕괴 정도를 조금씩 증가
    p.drift += 0.0001;

    // 3. 노이즈 기반 붕괴 효과
    // 노이즈 값을 0~1 사이로 가져와서 -1~1 사이로 매핑
    let n = noise(p.noiseOffset + frameCount * 0.01);
    let distortion = map(n, 0, 1, -1, 1) * p.drift * 400;

    // 4. 극좌표를 직교좌표로 변환 (원형 궤도에서 노이즈로 인한 변형 적용)
    let x = cos(p.angle) * (p.r + distortion);
    let y = sin(p.angle) * (p.r + distortion);

    // 5. 점 그리기
    point(x, y);
  }
}
