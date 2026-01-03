// w02_example_04.js

function setup() {
  createCanvas(1920, 1080);
  background(25, 190, 180);
  noLoop();

  noStroke();
  colorMode(HSB, 360, 100, 100, 100);

  let count = 240;

  for (let i = 0; i < count; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(30, 140);
    let emotion = int(random(5));

    push();
    translate(x, y);
    rotate(random(TWO_PI));

    if (emotion === 0) {
      // 평온한 마음 – 부드러운 원
      fill(200, 10, 90, 150);
      ellipse(0, 0, size, size);
    } else if (emotion === 1) {
      // 화난 마음 – 뾰족한 별
      fill(10, 80, 90, 90);
      drawStar(0, 0, size * 0.3, size * 0.7, 8);
    } else if (emotion === 2) {
      // 불안한 마음 – 찌그러진 원
      fill(40, 70, 90, 80);
      drawDistortedCircle(size);
    } else if (emotion === 3) {
      // 집착하는 마음 – 반복된 사각 구조
      fill(280, 50, 85, 50);
      drawStackedRects(size);
    } else {
      // 무너지는 마음 – 파편 삼각형
      fill(120, 60, 85, 80);
      drawFragments(size);
    }

    pop();
  }
}

/* ---------- 도형 함수 ---------- */

function drawStar(x, y, inner, outer, points) {
  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let angle = (PI / points) * i;
    let r = i % 2 === 0 ? outer : inner;
    vertex(cos(angle) * r, sin(angle) * r);
  }
  endShape(CLOSE);
}

function drawDistortedCircle(s) {
  beginShape();
  let steps = 24;
  for (let i = 0; i < steps; i++) {
    let angle = map(i, 0, steps, 0, TWO_PI);
    let r = s / 2 + random(-s * 0.2, s * 0.2);
    vertex(cos(angle) * r, sin(angle) * r);
  }
  endShape(CLOSE);
}

function drawStackedRects(s) {
  rectMode(CENTER);
  for (let i = 0; i < 5; i++) {
    let scale = map(i, 0, 4, 1, 0.3);
    rect(0, 0, s * scale, s * scale);
  }
}

function drawFragments(s) {
  let pieces = int(random(5, 9));
  for (let i = 0; i < pieces; i++) {
    beginShape();
    for (let j = 0; j < 3; j++) {
      vertex(random(-s / 2, s / 2), random(-s / 2, s / 2));
    }
    endShape(CLOSE);
  }
}

function draw() {
  // 정적 이미지
}
