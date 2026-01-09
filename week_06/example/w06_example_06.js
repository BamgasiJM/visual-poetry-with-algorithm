// Random Paticle Line

let particles = [];
let time = 0;
let frameCount = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  spawnParticles();
}

function spawnParticles() {
  particles = [];
  const center = createVector(width / 2, height / 2);

  for (let i = 0; i < 1000; i++) {
    const angle = random(TWO_PI);
    const speed = random(1.0, 3.0);
    const velocity = createVector(cos(angle) * speed, sin(angle) * speed);

    particles.push({
      position: center.copy(),
      velocity: velocity,
      history: [],
      hue: random(360),
    });
  }
}

function draw() {
  time += 0.0002;
  frameCount++;

  // 300프레임(약 5초)마다 중앙에서 다시 폭발
  if (frameCount % 300 === 0) {
    spawnParticles();
  }

  // 반투명 검은 배경으로 잔상 효과
  fill(0, 0, 0, 20);
  noStroke();
  rect(0, 0, width, height);

  // 각 파티클 업데이트 및 그리기
  for (let p of particles) {
    // 파티클 위치를 캔버스 좌표로 변환 (중앙 기준 -> 좌상단 기준)
    const x = p.position.x - width / 2;
    const y = p.position.y - height / 2;

    // Perlin noise 값 계산
    const n = noise(x * 0.005, y * 0.005, time);

    // noise 값을 -0.3 ~ 0.3 범위의 각도 오프셋으로 변환
    const angleOffset = map(n, 0, 1, -0.3, 0.3);

    // 현재 속도의 각도 계산
    const currentAngle = p.velocity.heading();
    const newAngle = currentAngle + angleOffset;
    const speed = p.velocity.mag() * 1.01; // 점점 빨라짐

    // 새로운 속도 설정
    p.velocity = createVector(cos(newAngle) * speed, sin(newAngle) * speed);

    // 위치 업데이트
    p.position.add(p.velocity);

    // 이동 경로 저장
    p.history.push(p.position.copy());
    if (p.history.length > 25) {
      p.history.shift();
    }

    // 궤적 그리기
    if (p.history.length > 1) {
      noFill();
      stroke(p.hue, 90, 60, 60);
      strokeWeight(0.8);
      beginShape();
      for (let h of p.history) {
        vertex(h.x, h.y);
      }
      endShape();
    }
  }
}
