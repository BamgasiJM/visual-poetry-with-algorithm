// w02_example_09.js

let rings = [];
let baseW, baseH;
let bgTone, darkTone, midTone;

// 🔒 고정 랜덤값들
let coreRot, coreX, coreY;

function setup() {
  createCanvas(800, 800);
  pixelDensity(2);
  noLoop();

  bgTone = random(235, 245);
  midTone = random(150, 185);
  darkTone = random(15, 35);

  baseW = random(420, 520);
  baseH = random(360, 480);

  // 중심 불안정 값 (한 번만)
  coreRot = random(-0.05, 0.05);
  coreX = random(-20, 20);
  coreY = random(-20, 20);

  let count = int(random(5, 8));

  for (let i = 0; i < count; i++) {
    rings.push({
      rot: random(-PI / 2, PI / 2),
      offsetX: random(-80, 80),
      offsetY: random(-60, 60),
      thickness: random(40, 90),
      shade: lerp(midTone, darkTone, random(0.2, 0.9)),
      noiseShift: random(1000),
    });
  }
}

function draw() {
  background(bgTone);
  translate(width / 2, height / 2);
  noFill();
  strokeCap(SQUARE);

  // 그림자
  drawingContext.shadowColor = "rgba(0,0,0,0.12)";
  drawingContext.shadowBlur = 25;
  drawingContext.shadowOffsetY = 20;

  // 중심 덩어리 (이제 고정)
  push();
  rotate(coreRot);
  fill(bgTone + 5);
  noStroke();
  ellipse(coreX, coreY, baseW * 0.8, baseH * 0.8);
  pop();

  // 생각의 레이어
  rings.forEach((r) => {
    push();
    rotate(r.rot);
    translate(r.offsetX, r.offsetY);

    stroke(r.shade);
    strokeWeight(r.thickness);

    beginShape();
    for (let a = 0; a <= TWO_PI; a += 0.05) {
      let n = noise(cos(a) + 1 + r.noiseShift, sin(a) + 1);
      let warp = map(n, 0, 1, -40, 40);

      let x = (baseW / 2 + warp) * cos(a);
      let y = (baseH / 2 + warp * 0.6) * sin(a);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  });

  // 전면 억눌린 면
  noStroke();
  fill(darkTone);
  beginShape();
  vertex(-baseW * 0.15, baseH * 0.1);
  vertex(baseW * 0.25, baseH * 0.05);
  vertex(baseW * 0.15, baseH * 0.35);
  vertex(-baseW * 0.2, baseH * 0.3);
  endShape(CLOSE);
}
