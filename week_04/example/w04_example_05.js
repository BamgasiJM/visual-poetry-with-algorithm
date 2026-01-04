// w03_example_03.js

let numConcentric = 20;
let numRays = 60;
let maxRadius;
let rotationAngle = 0;
let rayData = []; // 각 선의 정보를 저장할 배열

function setup() {
  createCanvas(1080, 1080);
  maxRadius = width * 0.45;

  // 각 선의 데이터 미리 생성
  for (let i = 0; i < numRays; i++) {
    let baseAngle = map(i, 0, numRays, 0, TWO_PI);
    let len = random(30, maxRadius);

    // 이 선 위에 그려질 원들의 정보
    let circles = [];
    let steps = int(random(3, 8));
    for (let j = 1; j <= steps; j++) {
      let t = j / (steps + 1);
      let distance = len * t; // 중심으로부터의 거리

      // 중심에서 30px 이내면 제외
      if (distance < 30) continue;

      circles.push({
        distance: distance,
        size: random(2, 8),
        color:
          random(100) > 85
            ? color(220, 180, 80, 200)
            : color(240, 240, 240, 180),
      });
    }

    rayData.push({
      baseAngle: baseAngle,
      length: len,
      circles: circles,
    });
  }
}

function draw() {
  background(40, 30, 40);

  // 동심원 그리기
  noFill();
  stroke(100, 90, 100, 180);
  strokeWeight(0.5);
  for (let i = 1; i <= numConcentric; i++) {
    let r = map(i, 1, numConcentric, 20, maxRadius);
    circle(width / 2, height / 2, r * 2);
  }

  // 중심부 강조
  noFill();
  stroke(255, 255, 255, 100);
  strokeWeight(1.5);
  circle(width / 2, height / 2, 60);

  // 회전 각도 업데이트
  rotationAngle = (millis() * 0.05) / 1000;

  let cx = width / 2;
  let cy = height / 2;

  // 저장된 데이터로 선과 원 그리기
  for (let ray of rayData) {
    let angle = ray.baseAngle + rotationAngle;

    // 선 끝점 계산
    let x2 = cx + cos(angle) * ray.length;
    let y2 = cy + sin(angle) * ray.length;

    // 선 그리기
    stroke(200, 200, 220, 150);
    line(cx, cy, x2, y2);

    // 원들 그리기
    noStroke();
    for (let c of ray.circles) {
      let px = cx + cos(angle) * c.distance;
      let py = cy + sin(angle) * c.distance;

      fill(c.color);
      circle(px, py, c.size);
    }
  }
}
