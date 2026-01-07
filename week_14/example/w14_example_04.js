let population = [];
let popSize = 100;
let targetColor;
let targetSize = 50;
let generation = 1;

function setup() {
  createCanvas(600, 600);
  targetColor = color(255, 100, 150); // 목표 색상

  for (let i = 0; i < popSize; i++) {
    population.push(new Circle());
  }
}

function draw() {
  background(0);

  // 목표 표시
  fill(targetColor);
  circle(width / 2, 100, targetSize);
  fill(255);
  textAlign(CENTER);
  text("Target", width / 2, 150);

  // 현재 세대 표시
  for (let i = 0; i < population.length; i++) {
    let x = (i % 10) * 60 + 30;
    let y = floor(i / 10) * 60 + 200;
    population[i].show(x, y);
  }

  // 정보
  fill(255);
  textAlign(LEFT);
  text("Generation: " + generation, 10, 20);

  // 한 프레임마다 진화
  if (frameCount % 60 === 0) {
    evolve();
    generation++;
  }
}

function evolve() {
  // 적합도 계산
  for (let circle of population) {
    circle.calcFitness(targetColor, targetSize);
  }

  // 정규화
  let maxFit = 0;
  for (let circle of population) {
    if (circle.fitness > maxFit) {
      maxFit = circle.fitness;
    }
  }
  for (let circle of population) {
    circle.fitness /= maxFit;
  }

  // 선택
  let matingPool = [];
  for (let circle of population) {
    let n = floor(circle.fitness * 100);
    for (let i = 0; i < n; i++) {
      matingPool.push(circle);
    }
  }

  // 교배 및 돌연변이
  let newPopulation = [];
  for (let i = 0; i < popSize; i++) {
    let parentA = random(matingPool);
    let parentB = random(matingPool);
    let child = parentA.crossover(parentB);
    child.mutate();
    newPopulation.push(child);
  }

  population = newPopulation;
}

class Circle {
  constructor(r, g, b, size) {
    if (r === undefined) {
      this.r = random(255);
      this.g = random(255);
      this.b = random(255);
      this.size = random(10, 80);
    } else {
      this.r = r;
      this.g = g;
      this.b = b;
      this.size = size;
    }
    this.fitness = 0;
  }

  show(x, y) {
    fill(this.r, this.g, this.b);
    circle(x, y, this.size);
  }

  calcFitness(targetCol, targetSize) {
    let dr = abs(this.r - red(targetCol));
    let dg = abs(this.g - green(targetCol));
    let db = abs(this.b - blue(targetCol));
    let colorDist = (dr + dg + db) / 3;

    let sizeDist = abs(this.size - targetSize);

    let totalDist = colorDist + sizeDist;
    this.fitness = map(totalDist, 0, 255 + 80, 255 + 80, 0);
  }

  crossover(partner) {
    let childR = random(1) < 0.5 ? this.r : partner.r;
    let childG = random(1) < 0.5 ? this.g : partner.g;
    let childB = random(1) < 0.5 ? this.b : partner.b;
    let childSize = random(1) < 0.5 ? this.size : partner.size;

    return new Circle(childR, childG, childB, childSize);
  }

  mutate() {
    let mutationRate = 0.05;

    if (random(1) < mutationRate) {
      this.r += random(-20, 20);
      this.r = constrain(this.r, 0, 255);
    }
    if (random(1) < mutationRate) {
      this.g += random(-20, 20);
      this.g = constrain(this.g, 0, 255);
    }
    if (random(1) < mutationRate) {
      this.b += random(-20, 20);
      this.b = constrain(this.b, 0, 255);
    }
    if (random(1) < mutationRate) {
      this.size += random(-5, 5);
      this.size = constrain(this.size, 10, 80);
    }
  }
}
