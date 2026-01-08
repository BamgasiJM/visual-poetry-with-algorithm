// w02_example_04.js

function setup() {
  createCanvas(800, 800);
  background(255);

  stroke(0);
  noFill();
  rectMode(CENTER);
  ellipseMode(CENTER);

  // 1. 중앙에 중첩된 원 구조
  translate(width / 2, height / 2);

  for (let r = 50; r <= 350; r += 25) {
    ellipse(0, 0, r * 2, r * 2);
  }

  // 2. 방사형 선 구조
  for (let a = 0; a < TWO_PI; a += PI / 24) {
    let x = cos(a) * 360;
    let y = sin(a) * 360;
    line(0, 0, x, y);
  }

  resetMatrix();

  // 3. 격자 기반 사각형 변주
  let margin = 80;
  let step = 80;

  for (let y = margin; y <= height - margin; y += step) {
    for (let x = margin; x <= width - margin; x += step) {
      let s = random(20, 60);
      push();
      translate(x, y);
      rotate(int(random(4)) * HALF_PI);
      rect(0, 0, s, s);
      pop();
    }
  }
  noLoop();
}

function draw() {
  // 정적 이미지이므로 사용하지 않습니다.
}
