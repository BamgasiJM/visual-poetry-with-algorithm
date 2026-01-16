// w12_example_04.js

let people = [];
const numPeople = 25;
const connectionThreshold = 200;
const personalSpace = 80;

function setup() {
  createCanvas(1000, 1000);

  for (let i = 0; i < numPeople; i++) {
    people.push({
      pos: createVector(random(width), random(height)),
      vel: createVector(random(-1, 1), random(-1, 1)),
      acc: createVector(0, 0),
      mass: random(0.8, 1.5),
      hue: random(360),
      energy: random(0.5, 1),
      connections: [],
    });
  }
}

function draw() {
  background(10, 10, 15, 30);

  // 모든 개체에 대해 힘 계산
  for (let i = 0; i < people.length; i++) {
    let p = people[i];
    p.acc.mult(0);
    p.connections = [];

    for (let j = 0; j < people.length; j++) {
      if (i === j) continue;

      let other = people[j];
      let force = p5.Vector.sub(other.pos, p.pos);
      let distance = force.mag();

      if (distance < 1) distance = 1;

      // 반발력: 개인 공간 침범 시
      if (distance < personalSpace) {
        let repulsion = force.copy();
        let strength = (personalSpace - distance) / personalSpace;
        strength = pow(strength, 2) * 0.8;
        repulsion.setMag(-strength);
        p.acc.add(repulsion);
      }

      // 인력: 적당한 거리에서 관계 형성
      if (distance > personalSpace && distance < connectionThreshold) {
        p.connections.push(j);

        let attraction = force.copy();
        let strength = (1 - distance / connectionThreshold) * 0.02;
        strength *= (p.energy + other.energy) / 2;
        attraction.setMag(strength);
        p.acc.add(attraction);
      }

      // 중력 같은 약한 인력
      let gravity = force.copy();
      let gravityStrength =
        ((p.mass * other.mass) / (distance * distance)) * 100;
      gravity.setMag(gravityStrength);
      p.acc.add(gravity);
    }

    // 경계 반발력
    let margin = 100;
    if (p.pos.x < margin) {
      p.acc.x += (margin - p.pos.x) * 0.01;
    }
    if (p.pos.x > width - margin) {
      p.acc.x -= (p.pos.x - (width - margin)) * 0.01;
    }
    if (p.pos.y < margin) {
      p.acc.y += (margin - p.pos.y) * 0.01;
    }
    if (p.pos.y > height - margin) {
      p.acc.y -= (p.pos.y - (height - margin)) * 0.01;
    }

    // 마우스와의 상호작용
    if (mouseIsPressed) {
      let mouse = createVector(mouseX, mouseY);
      let mouseForce = p5.Vector.sub(mouse, p.pos);
      let mouseDist = mouseForce.mag();
      if (mouseDist < 200) {
        mouseForce.setMag(0.5);
        p.acc.add(mouseForce);
      }
    }
  }

  // 연결선 그리기
  stroke(255, 255, 255, 15);
  strokeWeight(1);
  for (let i = 0; i < people.length; i++) {
    let p = people[i];
    for (let j of p.connections) {
      if (j > i) {
        let other = people[j];
        let dist = p5.Vector.dist(p.pos, other.pos);
        let alpha = map(dist, personalSpace, connectionThreshold, 80, 5);

        stroke((p.hue + other.hue) / 2, 60, 80, alpha);
        strokeWeight(map(dist, personalSpace, connectionThreshold, 2, 0.5));
        line(p.pos.x, p.pos.y, other.pos.x, other.pos.y);
      }
    }
  }

  // 개체 업데이트 및 그리기
  for (let p of people) {
    // 속도 업데이트
    p.vel.add(p.acc);

    // 감쇠 (마찰력)
    p.vel.mult(0.95);

    // 위치 업데이트
    p.pos.add(p.vel);

    // 경계 처리
    if (p.pos.x < 0 || p.pos.x > width) p.vel.x *= -0.8;
    if (p.pos.y < 0 || p.pos.y > height) p.vel.y *= -0.8;
    p.pos.x = constrain(p.pos.x, 0, width);
    p.pos.y = constrain(p.pos.y, 0, height);

    // 개체 그리기
    let size = p.mass * 20;
    let pulseSize = size + sin(frameCount * 0.05 + p.hue) * 3;

    // 외곽 글로우
    noStroke();
    for (let r = pulseSize + 20; r > pulseSize; r -= 4) {
      let alpha = map(r, pulseSize, pulseSize + 20, 40, 0);
      fill(p.hue, 70, 90, alpha);
      circle(p.pos.x, p.pos.y, r);
    }

    // 본체
    fill(p.hue, 60, 85, 200);
    circle(p.pos.x, p.pos.y, pulseSize);

    // 중심 코어
    fill(p.hue, 40, 95, 180);
    circle(p.pos.x, p.pos.y, pulseSize * 0.4);

    // 에너지 변화
    p.energy += random(-0.01, 0.01);
    p.energy = constrain(p.energy, 0.3, 1.2);
  }
}

/*
구현된 물리 법칙

반발력: 개인 공간(personalSpace: 80px) 내로 침범 시 거리의 제곱에 비례하는 강한 반발력이 작용해요. 사람 간의 경계를 표현합니다.
인력: 80~200px 거리에서 적당한 인력이 작용하며 이때 연결선이 그려져요. 거리에 반비례하는 강도로 관계를 형성합니다.
중력: 질량의 곱에 비례하고 거리의 제곱에 반비례하는 만유인력 공식을 적용했어요. 약한 전역적 인력을 표현합니다.
감쇠력: 매 프레임 속도에 0.95를 곱해 마찰력을 시뮬레이션해요. 무한 가속을 방지합니다.
경계 반발: 캔버스 가장자리 100px 마진에서 거리에 비례하는 복원력이 작용합니다.

시각적 표현

25개 개체가 각자 다른 색상(hue), 질량(mass), 에너지(energy)를 가져요
연결선의 투명도와 두께는 거리에 따라 변화합니다
맥동하는 글로우 효과로 생명감을 표현했어요
마우스 클릭으로 개체들을 끌어당길 수 있습니다

모든 힘은 가속도로 누적되고, 속도를 거쳐 위치를 변화시키는 정확한 물리 시뮬레이션 구조를 따릅니다.구현된 물리 법칙

반발력: 개인 공간(personalSpace: 80px) 내로 침범 시 거리의 제곱에 비례하는 강한 반발력이 작용해요. 사람 간의 경계를 표현합니다.
인력: 80~200px 거리에서 적당한 인력이 작용하며 이때 연결선이 그려져요. 거리에 반비례하는 강도로 관계를 형성합니다.
중력: 질량의 곱에 비례하고 거리의 제곱에 반비례하는 만유인력 공식을 적용했어요. 약한 전역적 인력을 표현합니다.
감쇠력: 매 프레임 속도에 0.95를 곱해 마찰력을 시뮬레이션해요. 무한 가속을 방지합니다.
경계 반발: 캔버스 가장자리 100px 마진에서 거리에 비례하는 복원력이 작용합니다.

시각적 표현

25개 개체가 각자 다른 색상(hue), 질량(mass), 에너지(energy)를 가져요
연결선의 투명도와 두께는 거리에 따라 변화합니다
맥동하는 글로우 효과로 생명감을 표현했어요
마우스 클릭으로 개체들을 끌어당길 수 있습니다

모든 힘은 가속도로 누적되고, 속도를 거쳐 위치를 변화시키는 정확한 물리 시뮬레이션 구조를 따릅니다.
 */
