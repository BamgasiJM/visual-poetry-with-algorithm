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

/*
코드 분석 및 피드백
구조는 객체 리터럴 배열 ([] + {}) 방식이며 클래스 정의 없이 바로 파티클 생성.
{}로 객체를 직접 정의하고, [] 배열에 넣어 여러 객체를 관리
파티클에 메서드(함수)를 추가하거나 복잡한 동작을 구현하기 어려움.

1. 초기화 (setup())
PARTICLE_COUNT를 4000으로 설정해 많은 파티클을 생성해요. 이 정도면 화면에 풍부한 패턴이 나타날 거예요.
SCALE과 SPEED 변수를 통해 노이즈의 세밀함과 파티클의 이동 속도를 조절할 수 있어요.
파티클의 초기 위치를 랜덤하게 설정하고, 크기도 다양하게 주어서 자연스러운 효과를 내요.

2. 애니메이션 (draw())
background(255, 10)을 사용해 잔상 효과를 만들어 파티클의 움직임이 부드럽게 보이도록 했어요.
noise() 함수를 사용해 각 파티클의 이동 방향을 결정해요. angle은 0부터 4 * PI까지의 값을 가지므로, 파티클이 다양한 방향으로 이동해요.
cos(angle)과 sin(angle)을 사용해 x와 y 방향으로의 이동량을 계산해요. 이는 노이즈 필드를 따라 자연스러운 움직임을 만들어내요.
경계 처리를 통해 파티클이 화면 밖으로 나가지 않고 반대편으로 나타나게 해요.

3. 개선 또는 실험해볼 만한 아이디어
- 색상 변화: 파티클의 색상을 노이즈 값이나 위치에 따라 변화시켜 더 풍부한 시각적 효과를 만들 수 있어요.

let noiseVal = noise(p.x * SCALE, p.y * SCALE, frameCount * 0.005);
fill(noiseVal * 255); // 노이즈 값에 따라 색상 변화

- 파티클 크기 변화: 파티클의 크기도 노이즈 값에 따라 변화시켜 볼 수 있어요.
p.size = noise(p.x * SCALE, p.y * SCALE, frameCount * 0.005) * 5;

- 노이즈 스케일 조절: SCALE 값을 더 작게 하면 더 세밀한 흐름이 생기고, 크게 하면 더 넓은 패턴이 생기요.
- 속도 변화: SPEED를 노이즈 값에 따라 변화시켜 파티클이 불규칙하게 움직이는 효과를 만들 수 있어요.
 */