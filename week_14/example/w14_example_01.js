// w14_example_01.js

// 유전자 알고리즘을 이용한 문자열 진화 시뮬레이션

let population = [];          // 개체군(집단)을 저장할 배열
let target = "Semyung Univ."; // 목표 문자열
let mutationRate = 0.01;      // 돌연변이 확률
let popSize = 1000;           // 개체군 크기

function setup() {
  createCanvas(600, 250);

  // 초기 개체군 생성: 각 개체는 DNA 클래스로 생성되며, 목표 문자열의 길이만큼 랜덤 문자로 구성됨
  frameRate(5);
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

  // 최고 개체 찾기
  let best = population[0];
  for (let dna of population) {
    if (dna.fitness > best.fitness) {
      best = dna;
    }
  }

  // 박스 스타일 설정
  fill(255);
  stroke(200);
  strokeWeight(2);
  rectMode(CENTER);

  // Target 박스 그리기 
  let targetBoxWidth = 80;
  let targetBoxHeight = 25;
  let targetBoxY = 60;
  rect(width / 2 - 150, targetBoxY, targetBoxWidth, targetBoxHeight, 7);

  // Best 박스 그리기 
  let bestBoxWidth = 70;
  let bestBoxHeight = 25;
  let bestBoxY = 110;
  rect(width / 2 - 150, bestBoxY, bestBoxWidth, bestBoxHeight, 7);

  // 텍스트 스타일 설정
  fill(0);
  noStroke();
  textAlign(CENTER, CENTER);

  // Target 단어만 하얀 박스에 검은색으로 표시
  textSize(16);
  text("Target", width / 2 - 150, targetBoxY);

  // Best 단어만 하얀 박스에 검은색으로 표시
  textSize(16);
  text("Best", width / 2 - 150, bestBoxY);

  // Semyung Univ. 타겟 텍스트 
  fill(210, 180, 0);
  textSize(32);
  textAlign(LEFT, CENTER);
  text(target, width / 2 - 70, 60);

  // best.genes 결과
  fill(30, 200, 190);
  textSize(32);
  textAlign(LEFT, CENTER);
  text(best.genes, width / 2 - 70, 110);

  // Generation 및 Fitness 텍스트
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

// DNA 클래스: 유전자 알고리즘의 개체를 표현
class DNA {
  constructor(len) {
    this.genes = "";      // 유전자(문자열)
    this.fitness = 0;     // 적합도
    // 랜덤 문자로 유전자 초기화
    for (let i = 0; i < len; i++) {
      this.genes += this.randomChar();
    }
  }

  // 랜덤 문자 생성
  randomChar() {
    let c = floor(random(32, 128)); // ASCII 코드 32~127 범위에서 랜덤 선택
    return String.fromCharCode(c);
  }

  // 적합도 계산: 목표 문자열과 얼마나 유사한지 계산
  calcFitness(target) {
    let score = 0;
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] === target[i]) {
        score++;  // 일치하는 문자의 수만큼 점수 증가
      }
    }
    this.fitness = score / target.length;   // 적합도는 일치 비율(0~1)
  }

  // 교배: 두 부모로부터 자식 생성
  crossover(partner) {
    let child = new DNA(this.genes.length);
    // 랜덤한 지점에서 부모의 유전자를 교차
    let midpoint = floor(random(this.genes.length));
    child.genes =
      this.genes.substring(0, midpoint) + partner.genes.substring(midpoint);
    return child;
  }

  // 돌연변이: 일정 확률로 유전자 변경
  mutate(rate) {
    let genes = "";
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < rate) {
        genes += this.randomChar();     // 돌연변이 발생
      } else {
        genes += this.genes[i];         // 원래 유전자 유지
      }
    }
    this.genes = genes;
  }
}
