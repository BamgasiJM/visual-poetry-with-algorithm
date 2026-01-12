// 전역 변수
const numCircles = 10;
const numRects = 10;
const collisionDistance = 50;
let objects = [];

function setup() {
  createCanvas(1000, 600);

  // 원 오브젝트 생성
  for (let i = 0; i < numCircles; i++) {
    objects.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      vx: random(-1, 1),
      vy: random(-1, 1),
      size: random(20, 40),
      type: "circle",
    });
  }

  // 사각형 오브젝트 생성
  for (let i = 0; i < numRects; i++) {
    objects.push({
      x: random(50, width - 50),
      y: random(50, height - 50),
      vx: random(-1, 1),
      vy: random(-1, 1),
      size: random(20, 40),
      type: "rect",
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.02, 0.02),
    });
  }
}

function draw() {
  // 배경 그라데이션
  drawRadialGradient(500, 300, 800);

  noStroke();

  // 충돌 체크 및 타입 변경, 강체 충돌
  for (let i = 0; i < objects.length; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      let d = dist(objects[i].x, objects[i].y, objects[j].x, objects[j].y);
      let minDist = (objects[i].size + objects[j].size) / 2;

      if (d < minDist) {
        // 타입이 다르면 교환
        if (objects[i].type !== objects[j].type) {
          let temp = objects[i].type;
          objects[i].type = objects[j].type;
          objects[j].type = temp;

          // 사각형으로 변한 경우 회전 속성 추가
          if (objects[i].type === "rect" && objects[i].rotation === undefined) {
            objects[i].rotation = random(TWO_PI);
            objects[i].rotationSpeed = random(-0.02, 0.02);
          }
          if (objects[j].type === "rect" && objects[j].rotation === undefined) {
            objects[j].rotation = random(TWO_PI);
            objects[j].rotationSpeed = random(-0.02, 0.02);
          }
        }

        // 강체 충돌 처리
        let angle = atan2(
          objects[j].y - objects[i].y,
          objects[j].x - objects[i].x
        );
        let targetX = objects[i].x + cos(angle) * minDist;
        let targetY = objects[i].y + sin(angle) * minDist;

        let ax = (targetX - objects[j].x) * 0.5;
        let ay = (targetY - objects[j].y) * 0.5;

        objects[i].vx -= ax;
        objects[i].vy -= ay;
        objects[j].vx += ax;
        objects[j].vy += ay;

        // 겹침 방지
        objects[i].x -= ax;
        objects[i].y -= ay;
        objects[j].x += ax;
        objects[j].y += ay;
      }
    }
  }

  // 오브젝트 업데이트 및 그리기
  for (let obj of objects) {
    // 이동
    obj.x += obj.vx;
    obj.y += obj.vy;

    // 사각형 회전
    if (obj.type === "rect" && obj.rotation !== undefined) {
      obj.rotation += obj.rotationSpeed;
    }

    // 벽 충돌
    if (obj.x - obj.size / 2 < 0 || obj.x + obj.size / 2 > width) {
      obj.vx *= -1;
      obj.x = constrain(obj.x, obj.size / 2, width - obj.size / 2);
    }
    if (obj.y - obj.size / 2 < 0 || obj.y + obj.size / 2 > height) {
      obj.vy *= -1;
      obj.y = constrain(obj.y, obj.size / 2, height - obj.size / 2);
    }

    // 그리기
    fill(255, 200);
    if (obj.type === "circle") {
      circle(obj.x, obj.y, obj.size);
    } else {
      push();
      translate(obj.x, obj.y);
      rotate(obj.rotation || 0);
      rectMode(CENTER);
      rect(0, 0, obj.size, obj.size);
      pop();
    }
  }
}

function drawRadialGradient(x, y, radius) {
  for (let r = radius; r > 0; r -= 3) {
    let inter = map(r, 0, radius, 0, 1);
    let c = lerpColor(color(128, 0, 128), color(0, 0, 0), inter);
    fill(c);
    noStroke();
    ellipse(x, y, r * 2, r * 2);
  }
}
