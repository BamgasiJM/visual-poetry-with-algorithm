// w10_example_02.js

let particles = [];
const PARTICLE_COUNT = 4000;
const SCALE = 0.005; // 노이즈 스케일 (작을수록 세밀한 흐름)
const SPEED = 0.6; // 파티클 이동 속도

function setup() {
  createCanvas(1000, 500);
  background(255); // 흰색 배경

  // 파티클 초기화
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: random(width),
      y: random(height),
      size: random(1, 3),
    });
  }
}

function draw() {
  background(255, 10); // 잔상 효과를 위한 반투명 흰색

  // 노이즈 필드 따라 파티클 이동
  for (let p of particles) {
    // 노이즈 값을 기반으로 각 파티클의 이동 방향 결정
    let angle =
      noise(p.x * SCALE, p.y * SCALE, frameCount * 0.005) * TWO_PI * 2;

    // 이동
    p.x += cos(angle) * SPEED;
    p.y += sin(angle) * SPEED;

    // 경계 처리 (반대편으로 이동)
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;

    // 파티클 그리기 (검은색)
    fill(0);
    noStroke();
    circle(p.x, p.y, p.size);
  }
}
