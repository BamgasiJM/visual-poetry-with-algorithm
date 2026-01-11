// w09_example_08.js

// sketch.js

let NUM_AGENTS = 80;
let agents = [];

function setup() {
  createCanvas(800, 800);
  background(25);  // 캔버스를 깨끗하게 시작

  for (let i = 0; i < NUM_AGENTS; i++) {
    let start = createVector(
      width / 2 + random(-20, 20),
      height / 2 + random(-20, 20)
    );
    agents.push(new Agent(start));
  }
}

function draw() {
  // 배경: 어두운 회색 (25) 및 꼬리 효과
  fill(0, 5);
  noStroke();
  rect(0, 0, width, height);

  let target = createVector(mouseX, mouseY);

  for (let agent of agents) {
    // --- 1. 두 가지 힘 계산 ---

    // 1-1. 분리(Separation) 힘 계산: 다른 에이전트로부터 멀어지려는 힘
    let separation = agent.separate(agents);

    // 1-2. 추적(Seeking) 힘 계산: 목표 지점(마우스)을 향해 가려는 힘
    let seeking = agent.seek(target);

    // --- 2. 힘에 가중치를 부여하고 적용 ---

    // 분리 힘에 더 높은 가중치(1.2)를 부여하여 겹치는 것을 방지
    separation.mult(1.2);
    // 추적 힘에는 표준 가중치(1.0) 부여
    seeking.mult(1.0);

    // 계산된 힘을 모두 적용
    agent.applyForce(separation);
    agent.applyForce(seeking);

    // --- 3. 업데이트 및 렌더링 ---
    agent.update();
    agent.checkEdges();
    agent.display();
  }
}

// ---------------------------------------------------------------------
// Agent 클래스 정의 (seperation 로직 및 seeking 로직 )
// ---------------------------------------------------------------------
class Agent {
  constructor(l) {
    this.position = l;
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);

    this.maxSpeed = 2.0;
    this.maxForce = 0.2;
    this.radius = 2;

    // 객체 색상: 산호색(Coral, RGB: 255, 127, 80)
    this.agentColor = color(255, 127, 80);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Seeking 메서드가 힘을 바로 적용하지 않고 Steering Force 벡터를 반환하도록 수정
  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer; // 힘을 반환
  }

  // --- 새로 추가된 Separation (분리) 행동 구현 ---
  separate(agents) {
    let desiredSeparation = this.radius * 2 + 10; // 너무 가까워지면 분리 시작할 거리
    let sum = createVector(0, 0);
    let count = 0;

    for (let other of agents) {
      let d = p5.Vector.dist(this.position, other.position);

      // 다른 에이전트이고, 너무 가까이 있다면
      if (d > 0 && d < desiredSeparation) {
        // 이웃으로부터 멀어지는 방향 벡터 계산
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        // 거리가 가까울수록 강한 힘을 부여 (거리의 제곱이 아닌, 단순 거리로 나눔)
        diff.div(d);
        sum.add(diff);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count); // 평균 분리 방향 계산

      // Steering Behavior 로직을 적용하여 최종 분리 힘 계산
      sum.normalize();
      sum.mult(this.maxSpeed);

      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }
    return createVector(0, 0);
  }
  // -------------------------------------------------------

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  checkEdges() {
    if (this.position.x > width) this.position.x = 0;
    else if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    else if (this.position.y < 0) this.position.y = height;
  }

  display() {
    stroke(this.agentColor);
    fill(this.agentColor, 200);
    ellipse(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
  }
}
