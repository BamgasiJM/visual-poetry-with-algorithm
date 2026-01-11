// w14_example_04.js

/* ==============================
   전역 상태 변수
================================ */

// 현재 살아 있는 개체들
let population = [];

// 이전 세대 유전자 (보간용)
let prevGenes = [];

// 세대 수
let generation = 1;

// 세대 전환 보간 값 (0 → 1)
let transition = 1;

// 돌연변이 확률 (세대가 지날수록 감소)
let mutationRate = 0.3;

/* ==============================
   상수 설정
================================ */

const POP_SIZE = 90; // 개체 수
const GENERATION_FRAMES = 100; // 한 세대의 길이 (프레임)

// 환경이 요구하는 타겟 유전자
const TARGET = {
  hueMin: 290, // 핑크~보라 계열
  hueMax: 330,
  sides: 20, // 원에 가까운 상태
};

/* ==============================
   p5.js 기본 함수
================================ */

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textSize(120);
  noStroke();

  // 초기 개체 생성
  for (let i = 0; i < POP_SIZE; i++) {
    population.push(new Individual());
  }
}

function draw() {
  // 잔상을 남기는 배경
  background(0, 0, 8, 30);

  // 세대 전환 보간 값 증가
  transition = min(transition + 0.02, 1);

  // 모든 개체 업데이트 및 렌더링
  for (let i = 0; i < population.length; i++) {
    let ind = population[i];
    ind.update();
    ind.display(prevGenes[i], transition);
  }

  drawGenerationText();

  // 세대 종료 조건
  if (frameCount % GENERATION_FRAMES === 0) {
    evolve();
  }
}

/* ==============================
   Individual 클래스
================================ */

class Individual {
  constructor(genes) {
    // 위치와 속도는 생애 동안 유지
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.3, 1.5));

    // 유전자 초기화
    this.genes = genes || {
      hue: random(360),
      size: random(6, 40),
      sides: floor(random(3, 12)), // 초기에는 명확한 다각형
    };
  }

  /* ---------- 적합도 함수 ---------- */
  fitness() {
    // 색상 적합도
    let hueCenter = (TARGET.hueMin + TARGET.hueMax) * 0.5;
    let hueDist = abs(this.genes.hue - hueCenter);
    let hueScore = 1 / (hueDist + 1);

    // 형태 적합도
    let shapeScore = 1 / (abs(this.genes.sides - TARGET.sides) + 1);

    return hueScore * shapeScore;
  }

  /* ---------- 이동 ---------- */
  update() {
    this.pos.add(this.vel);

    // 화면 경계 반사
    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  /* ---------- 렌더링 ---------- */
  display(prev, t) {
    // 기본은 현재 유전자
    let g = this.genes;

    // 이전 세대 유전자가 있으면 보간
    if (prev) {
      g = {
        hue: lerp(prev.hue, this.genes.hue, t),
        size: lerp(prev.size, this.genes.size, t),
        sides: lerp(prev.sides, this.genes.sides, t),
      };
    }

    fill(g.hue, 80, 100, 80);

    push();
    translate(this.pos.x, this.pos.y);

    beginShape();
    for (let a = 0; a < TWO_PI; a += TWO_PI / g.sides) {
      vertex(cos(a) * g.size, sin(a) * g.size);
    }
    endShape(CLOSE);

    pop();
  }

  /* ---------- 교차 + 돌연변이 ---------- */
  crossover(partner) {
    // 부모 유전자 혼합
    let g = {
      hue: lerp(this.genes.hue, partner.genes.hue, random()),
      size: lerp(this.genes.size, partner.genes.size, random()),
      sides: round(lerp(this.genes.sides, partner.genes.sides, random())),
    };

    // 돌연변이: 색상
    if (random() < mutationRate) {
      g.hue = (g.hue + random(-60, 60)) % 360;
    }

    // 돌연변이: 크기
    if (random() < mutationRate) {
      g.size = constrain(g.size + random(-10, 10), 4, 60);
    }

    // 돌연변이: 형태
    if (random() < mutationRate) {
      g.sides = floor(random(3, 12));
    }

    return g;
  }
}

/* ==============================
   세대 진화
================================ */

function evolve() {
  generation++;
  transition = 0;

  // 돌연변이 확률 감소 (annealing)
  mutationRate *= 0.97;
  mutationRate = max(mutationRate, 0.005);

  // 이전 세대 유전자 저장 (보간용)
  prevGenes = population.map((ind) => ({ ...ind.genes }));

  // 적합도 기반 선택
  population.sort((a, b) => b.fitness() - a.fitness());
  let parents = population.slice(0, POP_SIZE / 2);

  // 다음 세대 유전자 생성
  let nextGenes = [];
  for (let i = 0; i < POP_SIZE; i++) {
    let a = random(parents);
    let b = random(parents);
    nextGenes.push(a.crossover(b));
  }

  // 유전자 교체 (위치·속도는 유지)
  for (let i = 0; i < POP_SIZE; i++) {
    population[i].genes = nextGenes[i];
  }
}

/* ==============================
   세대 표시
================================ */

function drawGenerationText() {
  let alpha = map(transition, 0, 1, 100, 20);
  fill(0, 0, 100, alpha);
  text(generation, width / 2, height / 2);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
