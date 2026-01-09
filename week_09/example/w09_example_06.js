// w09_example_06.js

// ==========================================
// [설정 영역] 비주얼 및 물리 관련 주요 전역 변수
// ==========================================

// 1. 기본 설정
const POINT_COUNT = 6000;        // 파티클 개수 (성능에 따라 조절: 4000 ~ 10000)
const BG_ALPHA = 30;             // 배경의 잔상 농도 (낮을수록 긴 잔상, 0~255)

// 2. 크기 및 노이즈 설정
let BASE_RADIUS_RATIO = 0.4;     // 화면 대비 파티클 분포 반지름 비율 (0.1 ~ 0.5)
let NOISE_SCALE = 0.01;          // 노이즈의 텍스처 크기 (작을수록 부드러움)
let NOISE_STRENGTH = 300;        // 노이즈가 위치에 미치는 영향력 (픽셀 단위)
let TIME_SPEED = 0.003;          // 노이즈 변화 속도

// 3. 움직임 설정
let ROTATION_SPEED_MIN = 0.006;  // 최소 회전 속도
let ROTATION_SPEED_MAX = 0.012;  // 최대 회전 속도
let EXPLOSION_FORCE_MIN = 20;    // 폭발 시 최소 힘
let EXPLOSION_FORCE_MAX = 35;    // 폭발 시 최대 힘
let DRAG = 0.91;                  // 폭발 후 감속 비율 (1에 가까울수록 미끄러짐)

// 4. 색상 설정 (RGB)
// 중심부/저속일 때 색상 (Deep Blue-Purple)
const COLOR_CORE = [60, 20, 220];
// 외곽/고속일 때 색상 (Bright Cyan-White)
const COLOR_OUTER = [100, 255, 200];

// ==========================================

let points = [];
let state = "normal";  // 'normal' | 'explode'
let resetFrame = 0;
let cCore, cOuter;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(RGB, 255);
  background(10);
  strokeWeight(2);

  // 색상 객체 생성
  cCore = color(...COLOR_CORE);
  cOuter = color(...COLOR_OUTER);

  initParticles();
}

function draw() {
  // 배경 잔상 효과
  background(10, 10, 15, BG_ALPHA);

  translate(width / 2, height / 2);

  // 폭발 상태가 오래 지속되면 자동으로 복귀
  if (state === "explode" && frameCount - resetFrame > 40) {
    state = "normal";
  }

  // 파티클 업데이트 및 그리기
  for (let i = 0; i < points.length; i++) {
    points[i].update();
    points[i].display();
  }
}

// 파티클 초기화 함수
function initParticles() {
  points = [];
  let maxR = min(width, height) * BASE_RADIUS_RATIO;

  for (let i = 0; i < POINT_COUNT; i++) {
    // 1. 초기 위치 설정 (도넛 모양 분포를 위해 랜덤 조정)
    let r = random(maxR * 0.3, maxR);
    let angle = random(TWO_PI);

    // 2. 파티클 객체 생성
    points.push(new Particle(r, angle));
  }
}

// ==========================================
// [클래스] Particle
// ==========================================
class Particle {
  constructor(r, angle) {
    this.baseR = r;      // 원래 궤도 반지름
    this.r = r;          // 현재 반지름
    this.angle = angle;  // 현재 각도

    // 개별 속성 랜덤화
    this.angSpeed = random(ROTATION_SPEED_MIN, ROTATION_SPEED_MAX);
    this.noiseOffset = random(1000);

    // 물리 변수
    this.burstSpeed = 0;  // 폭발 속도
    this.drift = 0;       // 노이즈에 의한 흔들림 값
  }

  update() {
    // 1. 상태별 물리 연산
    if (state === "explode") {
      // 폭발: 밖으로 튕겨나감 + 마찰력(감속)
      this.burstSpeed *= DRAG;
      this.r += this.burstSpeed;
    } else {
      // 정상: 천천히 원래 궤도로 복귀 (탄성)
      this.r = lerp(this.r, this.baseR, 0.009);

      // 지속적인 회전
      this.angle += this.angSpeed;
    }

    // 2. 노이즈 계산 (유기적인 움직임)
    // 시간과 고유 오프셋을 이용해 부드러운 난수 생성
    let n = noise(this.noiseOffset + frameCount * TIME_SPEED);

    // 노이즈 값을 -1 ~ 1 사이로 매핑하여 흔들림(drift) 생성
    this.drift = map(n, 0, 1, -1, 1) * NOISE_STRENGTH;
  }

  display() {
    // 3. 최종 위치 계산 (극좌표계 -> 직교좌표계)
    // 반지름 = 현재 반지름 + 노이즈 흔들림
    let finalR = this.r + this.drift;

    let x = cos(this.angle) * finalR;
    let y = sin(this.angle) * finalR;

    // 4. 색상 계산
    // 폭발 속도나 노이즈 강도에 따라 색상을 섞음
    let energy = constrain(
      abs(this.burstSpeed) * 0.1 +
        map(abs(this.drift), 0, NOISE_STRENGTH, 0, 1),
      0,
      1
    );
    let c = lerpColor(cCore, cOuter, energy);

    stroke(c);
    point(x, y);
  }

  // 폭발 힘 적용
  explode() {
    this.burstSpeed += random(EXPLOSION_FORCE_MIN, EXPLOSION_FORCE_MAX);
  }
}

// ==========================================
// [이벤트] 사용자 입력 처리
// ==========================================

function keyPressed() {
  if (key === " ") {
    state = "explode";
    resetFrame = frameCount;

    // 모든 파티클에 폭발 힘 전달
    for (let p of points) {
      p.explode();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // 화면 크기가 바뀌면 파티클 위치 재계산
  initParticles();
}
