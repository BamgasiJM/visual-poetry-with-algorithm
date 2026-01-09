// Random Walk

let x, y; // 현재 위치
let stepSize = 10; // 한 번 이동할 때 움직이는 거리
let points = []; // 이동 경로를 저장할 배열

function setup() {
  createCanvas(800, 800);
  background(200);
  x = width / 2; // 시작 위치: 캔버스 중앙
  y = height / 2;
  points.push(createVector(x, y)); // 시작 위치 저장
  frameRate(10);
}

function draw() {
  // 매 프레임마다 랜덤한 방향으로 이동
  x += random(-stepSize, stepSize);
  y += random(-stepSize, stepSize);

  // 경계를 벗어나지 않도록 제한
  x = constrain(x, 0, width);
  y = constrain(y, 0, height);

  // 새로운 위치 저장
  points.push(createVector(x, y));

  // 배경 투명도 조절로 궤적 남기기
  noStroke();
  fill(200);
  rect(0, 0, width, height);

  // 이동 경로 그리기
  strokeWeight(2);
  stroke(0, 0, 0, 100);
  noFill();
  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape();

  // 현재 위치에 점 그리기
  fill(0, 0, 0);
  noStroke();
  ellipse(x, y, 15, 15);

  // 배열이 너무 커지지 않도록 제한
  if (points.length > 200) {
    points.splice(0, 1);
  }
}
