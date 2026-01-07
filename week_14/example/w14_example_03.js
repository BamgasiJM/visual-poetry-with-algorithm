let population = [];
let popSize = 50;
let target;
let obstacles = [];
let lifespan = 300;
let lifeCounter = 0;
let generation = 1;

function setup() {
  createCanvas(600, 600);
  target = createVector(width / 2, 50);

  // 장애물 생성
  obstacles.push(createVector(width / 2, height / 2));
  obstacles.push(createVector(width / 2 - 100, height / 2 + 100));
  obstacles.push(createVector(width / 2 + 100, height / 2 + 100));

  for (let i = 0; i < popSize; i++) {
    population.push(new Rocket());
  }
}

function draw() {
  background(0);

  // 목표 지점
  fill(0, 255, 0);
  circle(target.x, target.y, 20);

  // 장애물
  fill(255, 0, 0);
  for (let obs of obstacles) {
    circle(obs.x, obs.y, 40);
  }

  // 로켓 업데이트
  for (let rocket of population) {
    // 장애물 충돌 체크
    for (let obs of obstacles) {
      if (dist(rocket.pos.x, rocket.pos.y, obs.x, obs.y) < 25) {
        rocket.crashed = true;
      }
    }

    rocket.update();
    rocket.show();
  }

  lifeCounter++;

  if (lifeCounter >= lifespan) {
    lifeCounter = 0;
    evaluate();
    selection();
    generation++;
  }

  fill(255);
  textAlign(LEFT);
  text("Generation: " + generation, 10, 20);
  text("Lifespan: " + lifeCounter + "/" + lifespan, 10, 40);
}

function evaluate() {
  let maxFit = 0;
  for (let rocket of population) {
    rocket.calcFitness(target);
    if (rocket.fitness > maxFit) {
      maxFit = rocket.fitness;
    }
  }

  for (let rocket of population) {
    rocket.fitness /= maxFit;
  }
}

function selection() {
  let matingPool = [];

  for (let rocket of population) {
    let n = floor(rocket.fitness * 100);
    for (let i = 0; i < n; i++) {
      matingPool.push(rocket);
    }
  }

  let newPopulation = [];
  for (let i = 0; i < popSize; i++) {
    let parentA = random(matingPool);
    let parentB = random(matingPool);
    let child = parentA.crossover(parentB);
    child.mutate();
    newPopulation.push(child);
  }

  population = newPopulation;
  lifeCounter = 0;
}

class Rocket {
  constructor(dna) {
    this.pos = createVector(width / 2, height - 50);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.crashed = false;
    this.fitness = 0;

    if (dna) {
      this.dna = dna;
    } else {
      this.dna = [];
      for (let i = 0; i < lifespan; i++) {
        this.dna.push(p5.Vector.random2D().setMag(0.1));
      }
    }
  }

  update() {
    if (!this.completed && !this.crashed) {
      this.applyForce(this.dna[lifeCounter]);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

      if (
        this.pos.x < 0 ||
        this.pos.x > width ||
        this.pos.y < 0 ||
        this.pos.y > height
      ) {
        this.crashed = true;
      }

      if (dist(this.pos.x, this.pos.y, target.x, target.y) < 20) {
        this.completed = true;
      }
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());

    if (this.completed) {
      fill(0, 255, 0);
    } else if (this.crashed) {
      fill(255, 0, 0, 50);
    } else {
      fill(255, 150);
    }

    rectMode(CENTER);
    rect(0, 0, 20, 5);
    pop();
  }

  calcFitness(target) {
    let d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);

    if (this.completed) {
      this.fitness *= 10;
    }
    if (this.crashed) {
      this.fitness /= 10;
    }
  }

  crossover(partner) {
    let newDNA = [];
    let midpoint = floor(random(this.dna.length));

    for (let i = 0; i < this.dna.length; i++) {
      if (i < midpoint) {
        newDNA.push(this.dna[i]);
      } else {
        newDNA.push(partner.dna[i]);
      }
    }

    return new Rocket(newDNA);
  }

  mutate() {
    let mutationRate = 0.01;
    for (let i = 0; i < this.dna.length; i++) {
      if (random(1) < mutationRate) {
        this.dna[i] = p5.Vector.random2D().setMag(0.1);
      }
    }
  }
}
