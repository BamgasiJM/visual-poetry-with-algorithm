let particles = [];
const PARTICLE_COUNT = 6000;
const NOISE_SCALE = 0.005;
const VORTEX_RADIUS = 120; // 소용돌이 반경
const SAFE_RADIUS = 40; // 마우스 주변 파티클 금지 구역 반경
let vortexStrength = 0; // 소용돌이 세기 (클릭 시 변화)
let isExpanding = false; // 퍼져나가는 상태

function setup() {
  createCanvas(1000, 600);
  colorMode(HSB, 360, 100, 100, 1);

  // 파티클 초기화
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
      speed: random(0.5, 2),
      angle: random(TWO_PI),
      noiseOffset: random(1000),
    });
  }
}

function draw() {
  background(0, 0, 0, 0.6); // 어두운 배경 + 잔상 효과

  // 마우스 주변 소용돌이 효과 (클릭 시 퍼짐/모임 애니메이션)
  if (isExpanding) {
    vortexStrength = lerp(vortexStrength, -20, 0.05);
    if (vortexStrength < -15) isExpanding = false;
  } else {
    vortexStrength = lerp(vortexStrength, 20, 0.02);
  }

  // 파티클 업데이트
  for (let p of particles) {
    // 1. 퍼린 노이즈 기반 이동
    let noiseVal = noise(
      p.x * NOISE_SCALE,
      p.y * NOISE_SCALE,
      frameCount * 0.005
    );
    let noiseAngle = map(noiseVal, 0, 1, 0, TWO_PI);

    // 2. 마우스 주변 소용돌이 효과 (SAFE_RADIUS 제외)
    let dx = mouseX - p.x;
    let dy = mouseY - p.y;
    let distToMouse = sqrt(dx * dx + dy * dy);

    if (distToMouse > SAFE_RADIUS && distToMouse < VORTEX_RADIUS) {
      // 소용돌이 각도 계산
      let vortexAngle = atan2(dy, dx) + PI / 2;
      let vortexForce = map(
        distToMouse,
        SAFE_RADIUS,
        VORTEX_RADIUS,
        vortexStrength,
        0
      );
      noiseAngle = vortexAngle + vortexForce * 0.1;
    }

    // 3. 이동 적용
    p.x += cos(noiseAngle) * p.speed;
    p.y += sin(noiseAngle) * p.speed;

    // 4. 경계 처리
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // 5. 파티클 그리기 (폭풍 같은 색상)
    let hue = map(distToMouse, 0, VORTEX_RADIUS, 200, 240);
    let brightness = map(distToMouse, 0, VORTEX_RADIUS, 100, 50);
    fill(hue, 80, brightness, 0.9);
    noStroke();
    circle(p.x, p.y, p.size);
  }
}

// 마우스 클릭 시 소용돌이 퍼짐 효과
function mousePressed() {
  isExpanding = true;
}
