// 004

const WIN_SIZE = 800;
const NUM_POINTS = 100;
const RANGE = 200.0;

let points = [];

function setup() {
  createCanvas(WIN_SIZE, WIN_SIZE);
  noStroke();
  for (let i = 0; i < NUM_POINTS; i++) {
    points.push(randomPoint());
  }
}

function draw() {
  background(0);
  translate(width / 2, height / 2);

  // 점 업데이트
  for (let i = points.length - 1; i >= 0; i--) {
    points[i].pos.y += points[i].speed;

    // 화면 아래로 나간 점 제거
    if (points[i].pos.y > height / 2 + 50) {
      points.splice(i, 1);
    }
  }

  // 점 개수 유지
  while (points.length < NUM_POINTS) {
    points.push(randomPoint());
  }

  // 점 그리기
  for (let p of points) {
    let dist = p5.Vector.dist(p.pos, createVector(0, 0));
    if (dist < RANGE) {
      fill(200);
      ellipse(p.pos.x, p.pos.y, 4, 4);

      // 거리 비율에 따른 알파값 계산
      let alpha = map(dist, 0, RANGE, 255, 0);
      stroke(255, alpha);
      strokeWeight(0.5);
      line(0, 0, p.pos.x, p.pos.y);
      noStroke();
    } else {
      fill(128);
      ellipse(p.pos.x, p.pos.y, 10, 10);
    }
  }
  // 중앙 노란색 원 그리기
  fill(200, 170, 0);
  noStroke();
  ellipse(0, 0, 30, 30);
}

function randomPoint() {
  return {
    pos: createVector(
      random(-WIN_SIZE / 2, WIN_SIZE / 2),
      random(-WIN_SIZE / 2 - 100, -WIN_SIZE / 2)
    ),
    speed: random(0.5, 2.0),
  };
}
