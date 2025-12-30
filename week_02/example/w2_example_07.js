// 007

// ==========================================
// [설정 영역] 전역 상수 및 변수
// ==========================================

const PARTICLE_COUNT = 8000; // 파티클 개수 (많을수록 밀도 높은 구체)
const ATTRACTION = 0.01; // 원래 위치로 끌어당기는 힘 (0~1, 클수록 빠르게 복귀)
const DAMPING = 0.9; // 마찰력/감속 계수 (0~1, 1에 가까울수록 부드럽게 미끄러짐)
const REPEL_STRENGTH = 28; // 마우스 반발력 강도 (픽셀 단위 가속도)

const CANVAS_WIDTH = 1200; // 캔버스 너비
const CANVAS_HEIGHT = 900; // 캔버스 높이
const SPHERE_RADIUS = 350; // 가상 구체의 반지름 (실제로는 2D 타원)
const REPEL_RADIUS = 120; // 마우스 주변 이 거리 안에 있는 파티클만 반발

let angle = 0; // 시간에 따라 증가하는 회전 각도 (라디안)
let points = []; // 파티클 객체 배열 {index, pos, vel}

// ==========================================
// [p5.js 라이프사이클]
// ==========================================

function setup() {
  // 캔버스 생성
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);

  // pixelDensity(1): 고해상도 디스플레이에서도 1:1 픽셀 매핑 (성능 최적화)
  pixelDensity(1);

  // 파티클 렌더링 스타일 설정
  stroke(255); // 흰색 점
  strokeWeight(2); // 점 크기 2px

  // 파티클 배열 초기화 (빈 객체들 생성)
  initializeParticles();

  // 초기 회전 각도를 0으로 설정
  angle = 0;

  // 각 파티클의 초기 "홈" 위치를 구체 표면에 배치
  updateParticleTargets();

  // 모든 파티클의 속도를 0으로 초기화 (정지 상태에서 시작)
  for (let p of points) {
    p.vel.set(0, 0);
  }
}

function draw() {
  // 매 프레임마다 검은 배경으로 화면 지우기
  background(0);

  // 좌표계 원점을 캔버스 중앙으로 이동
  // 이제 (0, 0)이 화면 정중앙이 됨
  translate(width / 2, height / 2);

  // 마우스 위치를 캔버스 중심 기준 좌표로 변환
  // 예: 마우스가 캔버스 왼쪽 상단에 있으면 (-600, -450)
  const mousePos = createVector(mouseX - width / 2, mouseY - height / 2);

  // 모든 파티클에 대해 물리 계산 및 렌더링 수행
  updateAndRenderParticles(mousePos);

  // 시간 경과에 따라 각도 증가 (초당 약 0.6 라디안 = 34도)
  // 이 각도가 증가하면서 구체가 회전하는 효과 발생
  angle += 0.01;
}

// ==========================================
// [초기화 함수]
// ==========================================

function initializeParticles() {
  // 파티클 배열 초기화
  points = [];

  // PARTICLE_COUNT개의 파티클 생성
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    points.push({
      index: i, // 파티클 고유 번호 (0 ~ 7999)
      pos: createVector(0, 0), // 현재 위치 (x, y)
      vel: createVector(0, 0), // 현재 속도 (vx, vy)
    });
  }
}

// 파티클의 초기 "홈" 위치를 설정하는 함수
function updateParticleTargets() {
  for (let p of points) {
    const i = p.index;

    // 2D 평면에서 3D 구체를 흉내내는 수식
    // sin(i + angle): i에 따라 X축 방향 회전
    // sin(i * i): i의 제곱에 sin을 적용하여 불규칙한 분포 생성
    // 두 sin을 곱하면 구체 표면처럼 보이는 패턴 생성
    const x = sin(i + angle) * sin(i * i) * SPHERE_RADIUS;

    // cos(i * i): Y축 위치 (위아래 분포)
    // i * i를 사용하여 파티클마다 다른 높이 부여
    const y = cos(i * i) * SPHERE_RADIUS;

    // 계산된 위치를 파티클의 pos에 설정
    p.pos.set(x, y);
  }
}

// ==========================================
// [파티클 물리 시뮬레이션]
// ==========================================

function updateAndRenderParticles(mousePos) {
  // 모든 파티클에 대해 반복
  for (let p of points) {
    const i = p.index;

    // --------------------------------------------------
    // 1. 회전하는 "홈" 위치 계산
    // --------------------------------------------------
    // angle이 계속 증가하므로 홈 위치가 시간에 따라 회전함
    // sin(i + angle): angle이 변하면서 X 좌표가 좌우로 이동
    const homeX = sin(i + angle) * sin(i * i) * SPHERE_RADIUS;

    // Y 좌표는 angle에 독립적이므로 상하 왕복만 함
    const homeY = cos(i * i) * SPHERE_RADIUS;

    // 홈 위치를 벡터로 생성
    const home = createVector(homeX, homeY);

    // --------------------------------------------------
    // 2. 스프링 힘 (홈으로 끌어당김)
    // --------------------------------------------------
    // 현재 위치에서 홈 위치로 가는 벡터 계산
    // 예: 파티클이 홈에서 오른쪽으로 10px 떨어져 있으면 toHome = (-10, 0)
    const toHome = p5.Vector.sub(home, p.pos);

    // 스프링 힘 = 거리 × ATTRACTION
    // 멀리 떨어질수록 강한 힘이 작용 (후크의 법칙)
    const springForce = toHome.mult(ATTRACTION);

    // 속도에 스프링 힘 추가 (가속도 적용)
    p.vel.add(springForce);

    // --------------------------------------------------
    // 3. 마우스 반발력
    // --------------------------------------------------
    applyMouseRepulsion(p, mousePos);

    // --------------------------------------------------
    // 4. 감속 및 위치 업데이트
    // --------------------------------------------------
    // 속도에 DAMPING(0.9)를 곱해 매 프레임마다 10%씩 감속
    // 이것이 없으면 파티클이 끝없이 가속됨
    p.vel.mult(DAMPING);

    // 뉴턴의 운동 법칙: 위치 += 속도
    p.pos.add(p.vel);

    // --------------------------------------------------
    // 5. 파티클 렌더링
    // --------------------------------------------------
    // 현재 위치에 점 하나 그리기
    point(p.pos.x, p.pos.y);
  }
}

function applyMouseRepulsion(particle, mousePos) {
  // 파티클에서 마우스로부터 멀어지는 방향 벡터 계산
  // 예: 파티클(100, 100), 마우스(90, 100) → awayFromMouse = (10, 0)
  const awayFromMouse = p5.Vector.sub(particle.pos, mousePos);

  // 거리의 제곱 계산 (sqrt 연산 생략으로 성능 최적화)
  // 예: (10, 0)의 magSq = 10² + 0² = 100
  const distSq = awayFromMouse.magSq();

  // --------------------------------------------------
  // 반발력 적용 조건 체크
  // --------------------------------------------------
  // 조건 1: distSq > 0.1 → 파티클과 마우스가 너무 가깝지 않음 (0으로 나누기 방지)
  // 조건 2: distSq < REPEL_RADIUS² → 파티클이 마우스 영향권 안에 있음
  if (distSq > 0.1 && distSq < REPEL_RADIUS * REPEL_RADIUS) {
    // 실제 거리 계산 (피타고라스 정리)
    const distance = sqrt(distSq);

    // 벡터 정규화: 크기를 1로 만들어 방향만 남김
    // 예: (10, 0) → (1, 0)
    awayFromMouse.normalize();

    // --------------------------------------------------
    // 거리에 따른 자연스러운 감쇠 계산
    // --------------------------------------------------
    // (1 - distance / REPEL_RADIUS): 가까울수록 1에 가까움, 멀수록 0에 가까움
    // 예: distance=60, REPEL_RADIUS=120 → (1 - 60/120) = 0.5
    // 최종 힘 = 28 × 0.5 = 14
    const repelForce = REPEL_STRENGTH * (1 - distance / REPEL_RADIUS);

    // 정규화된 방향 벡터에 힘의 크기를 곱함
    // 예: (1, 0) × 14 = (14, 0)
    awayFromMouse.mult(repelForce);

    // 파티클의 속도에 반발력 추가
    particle.vel.add(awayFromMouse);
  }
}
