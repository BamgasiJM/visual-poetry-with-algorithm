let population = [];
let target = "BamgasiJM";
let mutationRate = 0.01;
let popSize = 200;

function setup() {
  createCanvas(600, 250);
  // 초기 집단 생성
  for (let i = 0; i < popSize; i++) {
    population.push(new DNA(target.length));
  }
}

function draw() {
  background(15);

  // 적합도 계산
  for (let dna of population) {
    dna.calcFitness(target);
  }

  // 다음 세대 생성
  let matingPool = [];
  for (let dna of population) {
    let n = floor(dna.fitness * 100);
    for (let i = 0; i < n; i++) {
      matingPool.push(dna);
    }
  }

  // 교배 및 돌연변이
  for (let i = 0; i < population.length; i++) {
    let parentA = random(matingPool);
    let parentB = random(matingPool);
    let child = parentA.crossover(parentB);
    child.mutate(mutationRate);
    population[i] = child;
  }

  // 최고 개체 표시
  let best = population[0];
  for (let dna of population) {
    if (dna.fitness > best.fitness) {
      best = dna;
    }
  }

  fill(210, 180, 0);
  textSize(32);
  textAlign(CENTER);
  text("Target: " + target, width / 2, 70);
  fill(30, 200, 190);
  textSize(32);
  textAlign(CENTER);
  text("Best: " + best.genes, width / 2, 120);
  fill(200);
  textSize(18);
  textAlign(CENTER);
  text("Generation: " + frameCount, width / 2, 180);
  text("Fitness: " + nf(best.fitness, 0, 4), width / 2, 210);

  // 목표 달성 시 정지
  if (best.genes === target) {
    noLoop();
    console.log("Completed! Number of Generations: " + frameCount);
  }
}

class DNA {
  constructor(len) {
    this.genes = "";
    this.fitness = 0;
    for (let i = 0; i < len; i++) {
      this.genes += this.randomChar();
    }
  }

  randomChar() {
    let c = floor(random(32, 128));
    return String.fromCharCode(c);
  }

  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++;
      }
    }
    this.fitness = score / target.length;
  }

  crossover(partner) {
    let child = new DNA(this.genes.length);
    let midpoint = floor(random(this.genes.length));
    child.genes =
      this.genes.substring(0, midpoint) + partner.genes.substring(midpoint);
    return child;
  }

  mutate(rate) {
    let genes = "";
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < rate) {
        genes += this.randomChar();
      } else {
        genes += this.genes[i];
      }
    }
    this.genes = genes;
  }
}
