/* ==============================
   전역 상태 변수
================================ */
let population = [];
let prevGenes = [];
let generation = 1;
let transition = 1;
let mutationRate = 0.3;

/* ==============================
   상수 설정
================================ */
const POP_SIZE = 150;
const GENERATION_FRAMES = 200;

const TARGET = {
  hueMin: 290,
  hueMax: 330,
  sides: 20,
};

/* ==============================
   p5.js 기본 함수
================================ */
function setup() {
  createCanvas(1280, 720);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(120);

  for (let i = 0; i < POP_SIZE; i++) {
    population.push(new Individual());
  }
}

function draw() {
  background(0, 0, 8, 30);

  if (transition < 1) {
    transition = min(transition + 0.02, 1);
  }

  for (let i = 0; i < population.length; i++) {
    let ind = population[i];
    ind.update();
    ind.display(prevGenes[i], transition);
  }

  drawGenerationText();

  if (frameCount % GENERATION_FRAMES === 0) {
    evolve();
  }
}

/* ==============================
   Individual 클래스
================================ */
class Individual {
  constructor(genes) {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D().mult(random(0.3, 1.5));

    this.genes = genes || {
      hue: random(360),
      size: random(6, 40),
      sides: floor(random(3, 12)),
    };
  }

  fitness() {
    const hueCenter = (TARGET.hueMin + TARGET.hueMax) * 0.5;
    const rawDist = abs(this.genes.hue - hueCenter);
    const hueDist = min(rawDist, 360 - rawDist);
    const hueScore = 1 / (hueDist + 1);

    const shapeScore = 1 / (abs(this.genes.sides - TARGET.sides) + 1);

    return hueScore * shapeScore;
  }

  update() {
    this.pos.add(this.vel);

    if (this.pos.x < 0 || this.pos.x > width) this.vel.x *= -1;
    if (this.pos.y < 0 || this.pos.y > height) this.vel.y *= -1;
  }

  display(prev, t) {
    let g = this.genes;

    if (prev && t < 1) {
      g = {
        hue: lerp(prev.hue, this.genes.hue, t),
        size: lerp(prev.size, this.genes.size, t),
        sides: round(lerp(prev.sides, this.genes.sides, t)),
      };
    }

    const f = this.fitness();
    const alpha = map(f, 0, 0.01, 25, 90, true);

    fill(g.hue, 60, 100, alpha);

    push();
    translate(this.pos.x, this.pos.y);

    beginShape();
    for (let a = 0; a < TWO_PI; a += TWO_PI / g.sides) {
      vertex(cos(a) * g.size, sin(a) * g.size);
    }
    endShape(CLOSE);

    pop();
  }

  crossover(partner) {
    let g = {
      hue: lerp(this.genes.hue, partner.genes.hue, random()),
      size: lerp(this.genes.size, partner.genes.size, random()),
      sides: round(lerp(this.genes.sides, partner.genes.sides, random())),
    };

    if (random() < mutationRate) {
      g.hue = (g.hue + random(-60, 60) + 360) % 360;
    }

    if (random() < mutationRate) {
      g.size = constrain(g.size + random(-10, 10), 4, 60);
    }

    if (random() < mutationRate) {
      g.sides = floor(random(3, 24));
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

  mutationRate *= 0.99;
  mutationRate = max(mutationRate, 0.02);

  prevGenes = population.map((ind) => ({ ...ind.genes }));

  population.sort((a, b) => b.fitness() - a.fitness());
  const parents = population.slice(0, POP_SIZE / 2);

  const nextGenes = [];
  for (let i = 0; i < POP_SIZE; i++) {
    const a = random(parents);
    const b = random(parents);
    nextGenes.push(a.crossover(b));
  }

  for (let i = 0; i < POP_SIZE; i++) {
    population[i].genes = nextGenes[i];
  }
}

/* ==============================
   세대 표시
================================ */
function drawGenerationText() {
  const alpha = map(transition, 0, 1, 100, 15);
  fill(0, 0, 100, alpha);
  text(generation + " 세대", width / 2, height / 2);
}
