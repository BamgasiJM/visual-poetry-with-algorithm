// w02_example_08.js

let s, light, mid, dark;
let shadowBlurVal, shadowOffsetVal;
let arcStart, arcEnd;
let foldRot, foldTx;
let gradSteps, gradInner, gradArcEnd;
let highlightShape;

function setup() {
  createCanvas(800, 800);
  pixelDensity(2);
  noLoop();

  // 🔒 여기서만 랜덤 결정
  s = random(480, 560);
  light = random(235, 250);
  mid = random(150, 190);
  dark = random(10, 40);

  shadowBlurVal = random(20, 35);
  shadowOffsetVal = random(12, 24);

  arcStart = random(-PI * 0.3, PI * 0.2);
  arcEnd = random(PI * 0.6, PI * 1.2);

  foldRot = random(-PI / 4, PI / 4);
  foldTx = random(-80, 80);

  gradSteps = int(random(90, 150));
  gradInner = random(0.6, 0.8);
  gradArcEnd = random(PI * 0.6, PI);

  highlightShape = [
    createVector(-s * random(0.1, 0.2), s * random(0.05, 0.15)),
    createVector(s * random(0.2, 0.3), -s * random(0.05, 0.15)),
    createVector(s * random(0.05, 0.15), s * random(0.3, 0.4)),
  ];
}

function draw() {
  background(240);
  translate(width / 2, height / 2);
  noStroke();

  // 그림자
  drawingContext.shadowColor = "rgba(0,0,0,0.15)";
  drawingContext.shadowBlur = shadowBlurVal;
  drawingContext.shadowOffsetY = shadowOffsetVal;

  // 베이스 원
  fill(light);
  ellipse(0, 0, s, s);

  // 어두운 부채꼴
  fill(dark);
  arc(0, 0, s, s, arcStart, arcEnd, PIE);

  // 접힌 면
  push();
  rotate(foldRot);
  translate(foldTx, 0);
  fill(mid);

  beginShape();
  vertex(-s * 0.5, -s * 0.12);
  vertex(0, -s * 0.5);
  vertex(s * 0.4, s * 0.15);
  vertex(-s * 0.1, s * 0.5);
  endShape(CLOSE);
  pop();

  // 내부 곡면 그라데이션
  push();
  rotate(foldRot * 0.6);
  for (let i = 0; i < gradSteps; i++) {
    let t = i / gradSteps;
    let c = lerpColor(color(mid + 20), color(dark), t);
    fill(c);

    arc(0, 0, s * gradInner - i * 1.2, s * gradInner - i * 1.2, 0, gradArcEnd);
  }
  pop();

  // 전면 하이라이트
  fill(250);
  beginShape();
  highlightShape.forEach((v) => vertex(v.x, v.y));
  endShape(CLOSE);
}
