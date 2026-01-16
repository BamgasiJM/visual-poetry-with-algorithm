// w12_example_05.js

let me,
  others = [];
const safeDistance = 180;
const dangerZone = 150;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);

  // 나 - 중앙에 고정
  me = {
    pos: createVector(width / 2, height / 2),
    vel: createVector(0, 0),
    acc: createVector(0, 0),
    size: 60,
    hue: 200, // 청록색
    longing: 0,
  };

  // 상대방들 - 각각 다른 특성을 가진 3명
  let configs = [
    {
      x: random(200, 800),
      y: random(200, 800),
      size: 35,
      hue: 320,
      attraction: 0.05,
      repulsion: 2.5,
    }, // 자홍색
    {
      x: random(100, 900),
      y: random(100, 900),
      size: 2,
      hue: 50,
      attraction: 0.02,
      repulsion: 0.8,
    }, // 노란색
    {
      x: random(150, 850),
      y: random(150, 850),
      size: 15,
      hue: 270,
      attraction: 0.08,
      repulsion: 0.2,
    }, // 보라색
  ];

  for (let config of configs) {
    others.push({
      pos: createVector(config.x, config.y),
      vel: createVector(random(-1, 1), random(-1, 1)),
      acc: createVector(0, 0),
      size: config.size,
      hue: config.hue,
      attractionStrength: config.attraction,
      repulsionStrength: config.repulsion,
      longing: 0,
      trail: [],
    });
  }
}

function draw() {
  background(5, 25);

  // 각 개체에 대해 물리 계산
  for (let other of others) {
    // 두 개체 사이의 벡터 계산
    let direction = p5.Vector.sub(me.pos, other.pos);
    let distance = direction.mag();

    // 상대방의 감정 상태 업데이트
    if (distance > safeDistance) {
      other.longing = lerp(other.longing, 1, 0.05);
    } else if (distance < dangerZone) {
      other.longing = lerp(other.longing, -1, 0.1);
    } else {
      other.longing = lerp(other.longing, 0, 0.03);
    }

    // 상대방에게 작용하는 힘
    other.acc.mult(0);

    // 인력: 항상 나를 향하고 싶어함
    let attraction = direction.copy();
    let attractPower = other.attractionStrength * (1 + other.longing * 0.8);
    attraction.setMag(attractPower);
    other.acc.add(attraction);

    // 반발력: 너무 가까워지면 강력하게 튕겨남
    if (distance < dangerZone) {
      let repulsion = direction.copy();
      let repelPower =
        pow((dangerZone - distance) / dangerZone, 1.5) *
        other.repulsionStrength;
      repulsion.setMag(-repelPower);
      other.acc.add(repulsion);

      // 튕겨나갈 때 추가 속도
      other.vel.mult(1.038);
    }

    // 약간의 랜덤한 움직임 (감정의 불안정성)
    let noise = createVector(random(-0.06, 0.06), random(-0.06, 0.06));
    other.acc.add(noise);

    // 다른 개체들과의 상호작용 (서로 약간 밀어냄)
    for (let other2 of others) {
      if (other === other2) continue;

      let between = p5.Vector.sub(other.pos, other2.pos);
      let betweenDist = between.mag();

      if (betweenDist < 100) {
        let push = between.copy();
        push.setMag(0.08);
        other.acc.add(push);
      }
    }

    // 속도 및 위치 업데이트
    other.vel.add(other.acc);
    other.vel.mult(0.985); // 감쇠를 줄여서 더 멀리 튕겨나가도록
    other.pos.add(other.vel);

    // 궤적 저장
    other.trail.push({
      x: other.pos.x,
      y: other.pos.y,
      speed: other.vel.mag(),
    });
    if (other.trail.length > 50) {
      other.trail.shift();
    }

    // 캔버스 경계 처리
    if (other.pos.x < 50 || other.pos.x > width - 50) other.vel.x *= -0.7;
    if (other.pos.y < 50 || other.pos.y > height - 50) other.vel.y *= -0.7;
    other.pos.x = constrain(other.pos.x, 50, width - 50);
    other.pos.y = constrain(other.pos.y, 50, height - 50);
  }

  // 내 감정 상태 (가장 가까운 개체 기준)
  let closestDist = width;
  for (let other of others) {
    let d = p5.Vector.dist(me.pos, other.pos);
    if (d < closestDist) closestDist = d;
  }
  me.longing = lerp(
    me.longing,
    map(closestDist, dangerZone, safeDistance * 1.5, -0.5, 1),
    0.05
  );

  // 연결선 그리기
  for (let other of others) {
    let distance = p5.Vector.dist(me.pos, other.pos);
    drawConnection(me, other, distance);
  }

  // 궤적 그리기
  for (let other of others) {
    drawTrail(other);
  }

  // 개체 그리기
  drawPerson(me);
  for (let other of others) {
    drawPerson(other);
  }

  // 거리 표시
  noStroke();
  fill(0, 0, 100, 40);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(`가장 가까운 거리: ${Math.floor(closestDist)}px`, width / 2, 50);
}

function drawTrail(p) {
  // 혜성 꼬리처럼 궤적 그리기
  noFill();
  for (let i = 0; i < p.trail.length - 1; i++) {
    let alpha = map(i, 0, p.trail.length, 0, 30);
    let thickness = map(i, 0, p.trail.length, 0.5, 5);
    let speedFactor = constrain(p.trail[i].speed, 0, 10);

    stroke(p.hue, 70, 90, alpha * (speedFactor / 5));
    strokeWeight(thickness);
    line(p.trail[i].x, p.trail[i].y, p.trail[i + 1].x, p.trail[i + 1].y);
  }
}

function drawConnection(p1, p2, dist) {
  // 연결선의 색상과 투명도는 거리에 따라 변화
  let lineAlpha, lineHue;

  if (dist < dangerZone) {
    // 너무 가까움 - 고통의 붉은색
    lineHue = 0;
    lineAlpha = map(dist, 0, dangerZone, 60, 20);
  } else if (dist > safeDistance) {
    // 너무 멀어짐 - 그리움의 파란색
    lineHue = 240;
    lineAlpha = map(dist, safeDistance, safeDistance * 2, 20, 5);
  } else {
    // 적당한 거리 - 평온한 보라색
    lineHue = (p1.hue + p2.hue) / 2;
    lineAlpha = 30;
  }

  stroke(lineHue, 60, 90, lineAlpha);
  strokeWeight(2);
  line(p1.pos.x, p1.pos.y, p2.pos.x, p2.pos.y);

  // 점선 효과 (불안정한 관계)
  let steps = 15;
  for (let i = 0; i < steps; i++) {
    if (i % 2 === 0) {
      let t = i / steps;
      let x = lerp(p1.pos.x, p2.pos.x, t);
      let y = lerp(p1.pos.y, p2.pos.y, t);
      noStroke();
      fill(lineHue, 70, 95, lineAlpha * 1.5);
      circle(x, y, 3);
    }
  }
}

function drawPerson(p) {
  let pulse = sin(frameCount * 0.05) * 0.1 + 1;
  let emotionalSize = p.size * pulse;

  // 감정에 따른 크기 변화
  if (p.longing > 0) {
    emotionalSize *= 1 + p.longing * 0.2;
  } else {
    emotionalSize *= 1 + p.longing * 0.15;
  }

  // 외곽 글로우 (여러 레이어)
  noStroke();
  for (let i = 10; i > 0; i--) {
    let glowSize = emotionalSize + i * 10;
    let alpha = map(i, 0, 10, 25, 0);

    // 감정 상태에 따른 색상 변화
    let emotionHue = p.hue;
    if (p.longing > 0) {
      emotionHue = lerp(p.hue, p.hue + 20, p.longing);
    } else {
      emotionHue = lerp(p.hue, 0, -p.longing);
    }

    fill(emotionHue, 70, 90, alpha);
    circle(p.pos.x, p.pos.y, glowSize);
  }

  // 본체
  fill(p.hue, 60, 85, 85);
  circle(p.pos.x, p.pos.y, emotionalSize);

  // 중심부
  fill(p.hue, 40, 95, 70);
  circle(p.pos.x, p.pos.y, emotionalSize * 0.6);

  // 가장 안쪽 코어
  fill(p.hue, 20, 100, 90);
  circle(p.pos.x, p.pos.y, emotionalSize * 0.3);

  // 감정 파티클
  if (abs(p.longing) > 0.3) {
    for (let i = 0; i < 3; i++) {
      let angle = frameCount * 0.02 + (i * TWO_PI) / 3;
      let radius = emotionalSize * 0.8 + sin(frameCount * 0.1 + i) * 10;
      let px = p.pos.x + cos(angle) * radius;
      let py = p.pos.y + sin(angle) * radius;

      let particleHue = p.longing > 0 ? p.hue : 0;
      fill(particleHue, 80, 95, abs(p.longing) * 40);
      circle(px, py, 5);
    }
  }
}
