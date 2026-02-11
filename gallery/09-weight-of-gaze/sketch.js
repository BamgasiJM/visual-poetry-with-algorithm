/* ===============================
   Matter.js aliases
================================ */
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Vector = Matter.Vector;

/* ===============================
   Global State
================================ */
let engine, world;
let objects = [];
let obstacles = [];

// 주제: 관심(중력)의 중심
let gravityPoint;
let gravityStrength = 0;
const gravityStep = 0.002; // 누르고 있거나 클릭시 증가량
const gravityMax = 0.15; // 최대값 

const maxObjects = 300;

// 앱 상태
let isRunning = false;

/* ===============================
   Setup
================================ */
function setup() {
  createCanvas(windowWidth, windowHeight);

  // 물리 엔진 초기화
  engine = Engine.create();
  world = engine.world;
  world.gravity.scale = 0; // 기본 중력 제거

  gravityPoint = createVector(width / 2, height / 2);

  // 초기 장애물 생성
  createObstacles();

  // 오브젝트 생성 루프 (시작 전에도 배경에 오브젝트는 생성해둠)
  setInterval(() => {
    if (objects.length < maxObjects) spawnObject();
  }, 200);

  // 이벤트 리스너: 타이틀 화면 클릭 시 시작
  const titleScreen = document.getElementById("title-screen");
  titleScreen.addEventListener("click", startGame);
}

function startGame() {
  if (isRunning) return;

  isRunning = true;

  // UI 전환
  document.getElementById("title-screen").classList.add("fade-out");

  setTimeout(() => {
    document.getElementById("controls-hint").classList.add("visible");
  }, 1000);
}

/* ===============================
   Resize
================================ */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  gravityPoint.set(width / 2, height / 2);
}

/* ===============================
   Obstacles (고정된 사회적 벽)
================================ */
function createObstacles() {
  obstacles.length = 0;
  const count = floor(random(12, 15));

  for (let i = 0; i < count; i++) {
    const r = random(20, 60);
    // 중앙을 비우고 외곽 쪽에 배치
    let x, y, d;
    do {
      x = random(width);
      y = random(height);
      d = dist(x, y, width / 2, height / 2);
    } while (d < 300); // 중앙 300px 반경에는 장애물 없음

    const pillar = Bodies.circle(x, y, r, {
      isStatic: true,
      restitution: 0.5,
      friction: 0.1,
    });

    obstacles.push(pillar);
    World.add(world, pillar);
  }
}

/* ===============================
   Object Spawning (대중)
================================ */
function spawnObject() {
  const margin = 100;
  let x, y;

  // 화면 밖에서 랜덤 생성
  if (random() < 0.5) {
    x = random(-margin, width + margin);
    y = random() < 0.5 ? -margin : height + margin;
  } else {
    x = random() < 0.5 ? -margin : width + margin;
    y = random(-margin, height + margin);
  }

  const r = random(5, 25); // 좀 더 작고 많은 개체

  const body = Bodies.circle(x, y, r, {
    restitution: 0.7,
    frictionAir: 0.01 + random(0.03), // 공기 저항을 다양하게
  });

  // 개별 객체의 고유 속성 (약간의 색상 다양성)
  body.baseHue = random(-15, 15);
  objects.push(body);
  World.add(world, body);
}

/* ===============================
   Draw Loop
================================ */
function draw() {
  background(5, 5, 5);

  if (isRunning) {
    Engine.update(engine);
    applyGravity();
  }

  cleanupObjects();

  drawBlackHole();
  drawObstacles();
  drawObjects();

  // 마우스 인터랙션 로직 (클릭 유지)
  handleInput();
}

/* ===============================
   Gravity Logic
================================ */
function handleInput() {
  if (!isRunning) return;

  if (mouseIsPressed) {
    if (mouseButton === LEFT) {
      // 왼쪽 클릭: 관심 집중 (중력 증가 + 위치 이동)
      gravityPoint.set(mouseX, mouseY);
      gravityStrength = lerp(gravityStrength, gravityMax, gravityStep);
    } else if (mouseButton === RIGHT) {
      // 오른쪽 클릭: 무관심 (중력 0)
      gravityStrength = lerp(gravityStrength, 0, 0.2);
    }
  } else {
    // 아무것도 안 누르면 서서히 감소 (자연스러운 관심 감소)
    gravityStrength = lerp(gravityStrength, 0, 0.01);
  }
}

function applyGravity() {
  if (gravityStrength <= 0.001) return;

  for (let body of objects) {
    const dir = Vector.sub(gravityPoint, body.position);
    const distVal = Vector.magnitude(dir);

    // 너무 가까우면 오히려 튕겨내거나 불안정하게 (과열)
    const minDist = 50;
    const effectiveDist = max(distVal, minDist);

    // 거리가 가까울수록 강한 힘
    const forceMag = (gravityStrength * body.mass) / (effectiveDist * 0.05);
    const force = Vector.mult(Vector.normalise(dir), forceMag);

    Body.applyForce(body, body.position, force);
  }
}

/* ===============================
   Cleanup
================================ */
function cleanupObjects() {
  const margin = 500;
  for (let i = objects.length - 1; i >= 0; i--) {
    const b = objects[i];
    const p = b.position;
    if (
      p.x < -margin ||
      p.x > width + margin ||
      p.y < -margin ||
      p.y > height + margin
    ) {
      World.remove(world, b);
      objects.splice(i, 1);
    }
  }
}

/* ===============================
   Drawing
================================ */
function drawBlackHole() {
  noStroke();

  // 중력 세기에 따른 중앙 홀 시각화
  // 관심이 높을수록 중앙이 붉게 타오름
  const glowSize = map(gravityStrength, 0, gravityMax, 10, 100);
  const glowAlpha = map(gravityStrength, 0, gravityMax, 0, 100);

  // Glow
  fill(255, 50, 0, glowAlpha);
  circle(gravityPoint.x, gravityPoint.y, glowSize * 5);

  // Core
  fill(0);
  stroke(255, 100);
  strokeWeight(2);
  circle(gravityPoint.x, gravityPoint.y, 10);
}

function drawObstacles() {
  noStroke();
  fill(30);
  for (let o of obstacles) {
    circle(o.position.x, o.position.y, o.circleRadius * 2);
  }
}

function drawObjects() {
  // 중력 강도 비율 (0.0 ~ 1.0)
  const t = constrain(gravityStrength / gravityMax, 0, 1);

  // 빨간 계통의 색상 유지하면서 채도만 변화
  // Hue: 빨강 계통 (0~10도 범위)
  // Saturation: 0 (회색) -> 100 (순수한 빨강)
  // Brightness: 항상 높게 유지

  colorMode(HSB, 360, 100, 100, 100);
  noStroke();

  for (let b of objects) {
    // 1. Hue: 빨강 계통 고정 (0~10)
    const baseHue = 5; // 순수 빨강에 가까운 값
    const finalHue = (baseHue + b.baseHue + 360) % 360;

    // 2. Saturation: 중력 세기에 따라 0 -> 100
    const targetSat = lerp(5, 100, t);

    // 3. Brightness: 약간 어두운 회색 -> 밝은 빨강
    const targetBri = lerp(40, 95, t);

    fill(finalHue, targetSat, targetBri);
    circle(b.position.x, b.position.y, b.circleRadius * 2);
  }

  colorMode(RGB);
}

/* ===============================
   Util
================================ */
// 우클릭 메뉴 방지
document.addEventListener("contextmenu", (e) => e.preventDefault());
