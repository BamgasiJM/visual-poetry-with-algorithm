// w14_example_06.js

/* ==============================
전역 설정
================================ */
const CANVAS_SIZE = 800;
const VERT_COUNT = 64;
const POP_SIZE = 80;
const GENERATION_FRAMES = 45;
const TARGET_RADIUS = 270;

let population = [];
let generation = 1;
let mutationRate = 0.35;

/* ==============================
p5.js 기본 함수
================================ */
function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  colorMode(RGB, 255);
  textAlign(CENTER, CENTER);
  noFill();

  for (let i = 0; i < POP_SIZE; i++) {
    population.push(new Individual());
  }
}

function draw() {
  background(200, 150, 30);

  translate(width / 2, height / 2);

  // 가장 적합한 개체 선택
  population.sort((a, b) => b.fitness() - a.fitness());
  let best = population[0];

  best.display();

  drawTexts();

  if (frameCount % GENERATION_FRAMES === 0) {
    evolve();
  }
}

/* ==============================
Individual 클래스
================================ */
class Individual {
  constructor(genes) {
    this.genes =
      genes ||
      Array.from({ length: VERT_COUNT }, () =>
        random(TARGET_RADIUS * 0.5, TARGET_RADIUS * 1.5)
      );
  }

  fitness() {
    let mean = this.genes.reduce((sum, r) => sum + r, 0) / this.genes.length;
    let variance = this.genes.reduce((sum, r) => sum + sq(r - mean), 0) / this.genes.length;

    return 1 / (variance + 1);
  }

  crossover(partner) {
    let newGenes = [];

    for (let i = 0; i < VERT_COUNT; i++) {
      let r = lerp(this.genes[i], partner.genes[i], random());

      if (random() < mutationRate) {
        r += random(-30, 30);
      }

      newGenes.push(constrain(r, 40, TARGET_RADIUS * 2));
    }

    return new Individual(newGenes);
  }

  display() {
    stroke(0);
    strokeWeight(0.6);

    beginShape();
    for (let i = 0; i < VERT_COUNT; i++) {
      let angle = (TWO_PI / VERT_COUNT) * i;
      let r = this.genes[i];
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);

    // 버텍스 점
    fill(250);
    noStroke();
    for (let i = 0; i < VERT_COUNT; i++) {
      let angle = (TWO_PI / VERT_COUNT) * i;
      let r = this.genes[i];
      ellipse(cos(angle) * r, sin(angle) * r, 4, 4);
    }
    fill(30);
  }
}

/* ==============================
진화 로직
================================ */
function evolve() {
  generation++;

  mutationRate *= 0.98;
  mutationRate = max(mutationRate, 0.02);

  population.sort((a, b) => b.fitness() - a.fitness());
  let parents = population.slice(0, POP_SIZE / 2);

  let next = [];
  for (let i = 0; i < POP_SIZE; i++) {
    let a = random(parents);
    let b = random(parents);
    next.push(a.crossover(b));
  }

  population = next;
}

/* ==============================
텍스트
================================ */
function drawTexts() {
  push(); 
  resetMatrix(); 

  fill(230);
  textSize(56);
  text("Calm Mind", width / 2, height / 2);

  textSize(26);
  text("Generation : " + generation, width / 2, height / 2 + 44);

  pop();
}
