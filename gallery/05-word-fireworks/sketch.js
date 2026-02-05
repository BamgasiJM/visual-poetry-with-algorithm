/**
 * Interactive Fireworks with Keyboard Input (Updated)
 * - Canvas: Resizable, Dark Navy background.
 * - Input: a-z keys trigger fireworks.
 * - Physics Update: Higher launch, Trails, Slower explosion with drag.
 */

let rockets = [];
let particles = [];
let stars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // HSB 모드 (Hue: 0~360, Sat: 0~100, Bri: 0~100, Alpha: 0~1)
  colorMode(HSB, 360, 100, 100, 1);

  createStars();
  background(240, 70, 7); // 초기 배경색
}

function draw() {
  // [수정 2] 트레일 효과 구현
  // 매 프레임 화면을 완전히 지우는 대신, 반투명한 배경색을 덮어씌워 잔상을 남김
  noStroke();
  fill(240, 70, 7, 0.2); // Alpha값 설정
  rect(0, 0, width, height);

  // 별 그리기 (배경 덮어쓰기 후 그려서 별은 선명하게 유지)
  drawStars();

  // 로켓 업데이트 (역방향 루프)
  for (let i = rockets.length - 1; i >= 0; i--) {
    let r = rockets[i];
    r.update();
    r.show();

    if (r.isDone()) {
      explode(r.pos.x, r.pos.y, r.baseHue, r.particleCount);
      rockets.splice(i, 1);
    }
  }

  // 파티클 업데이트 (역방향 루프)
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.show();

    if (p.isDead()) {
      particles.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createStars();
  background(240, 80, 15); // 리사이즈 시 배경 초기화
}

function keyPressed() {
  // event.code는 입력 언어와 상관없이 물리적 키 위치를 반환 (예: 'KeyA')
  let code = event.code;

  // 'Key'로 시작하는 알파벳 키인지 확인
  if (code.startsWith("Key")) {
    // 'KeyA'에서 'A'만 추출하여 소문자로 변환
    let char = code.replace("Key", "").toLowerCase();

    // 알파벳 순서(index) 추출 (a=0, z=25)
    let index = char.charCodeAt(0) - 97;

    // 파티클 개수: a=1*n, z=26*n
    let pCount = (index + 1) * 2.5;

    // 컬러: Hue 0~360 맵핑
    let hueVal = map(index, 0, 25, 0, 360);

    // 로켓 발사
    rockets.push(new Rocket(hueVal, pCount));
  }
}

// ---------------------------------------------------------
// Helper Functions & Classes
// ---------------------------------------------------------

// 1. 별 생성 시 속도와 위상차(offset)를 추가하여 개별적인 움직임을 부여
function createStars() {
  stars = [];
  let starCount = floor(width * height * 0.0002); 
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(0.5, 2.5),
      angle: random(TWO_PI), // 투명도 변화를 위한 초기 위상
      speed: random(0.05, 0.15) // 투명도 변화 속도
    });
  }
}

// 2. sin() 함수를 이용해 투명도를 0.2 ~ 0.8 사이에서 부드럽게 순환
function drawStars() {
  noStroke();
  for (let s of stars) {
    // sin 값을 이용해 투명도를 부드럽게 변화시킴 (0.2 ~ 0.8 범위)
    let alphaVal = map(sin(s.angle), -1, 1, 0.2, 0.8);
    
    fill(0, 0, 100, alphaVal); 
    circle(s.x, s.y, s.size);
    
    // 매 프레임 각도를 더해 투명도 변화 진행
    s.angle += s.speed;
  }
}

function explode(x, y, hueVal, count) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, hueVal));
  }
}

// ---------------------------------------------------------
// Class: Rocket
// ---------------------------------------------------------
class Rocket {
  constructor(h, count) {
    this.baseHue = h;
    this.particleCount = count;
    this.pos = createVector(width / 2, height);

    // [수정 1] 화면 높이에 비례하여 발사 속도 설정 (중앙 도달용)
    // 화면 높이의 약 1.8% ~ 2.2% 정도의 힘으로 위로 발사
    let launchForce = random(height * 0.018, height * 0.022);
    this.vel = createVector(random(-1.5, 1.5), -launchForce);

    this.acc = createVector(0, 0);
  }

  update() {
    this.vel.mult(0.965); // 공기 저항 역할
    this.pos.add(this.vel);
  }

  show() {
    noStroke();
    fill(0, 0, 100);
    circle(this.pos.x, this.pos.y, 5);
  }

  isDone() {
    // 속도가 매우 느려졌을 때 폭발
    return this.vel.mag() < 1;
  }
}

// ---------------------------------------------------------
// Class: Particle
// ---------------------------------------------------------
class Particle {
  constructor(x, y, h) {
    this.pos = createVector(x, y);

    // [수정 3] 퍼지는 속도 감소 및 다양화
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(1.5, 14)); // 기존보다 폭발 범위 축소 (속도 감소)

    this.acc = createVector(0, 0.08); // 중력값 약간 감소 (천천히 떨어짐)

    this.hue = h;
    this.sat = random(60, 100);
    this.bri = random(80, 100);

    this.alpha = 1.0;
    this.decay = random(0.008, 0.02); // 수명: 천천히 사라짐
    this.drag = 0.96; // [추가] 공기 저항 계수 (퍼진 후 감속)
  }

  update() {
    this.vel.add(this.acc); // 중력
    this.vel.mult(this.drag); // [추가] 공기 저항 적용 (폭발 후 급격히 느려짐)
    this.pos.add(this.vel);

    this.alpha -= this.decay;
  }

  show() {
    noStroke();
    fill(this.hue, this.sat, this.bri, this.alpha);
    circle(this.pos.x, this.pos.y, 3.5);
  }

  isDead() {
    return this.alpha <= 0;
  }
}
