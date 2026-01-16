// w13_example_01.js

let cols = 8;
let rows = 8;
let cellW, cellH;

function setup() {
  createCanvas(800, 800);

  cellW = width / cols;
  cellH = height / rows;

  textFont("serif");
  textAlign(CENTER, CENTER);
  textSize(25);
}

function draw() {
  background(10);
  fill(200);
  noStroke();

  let t = frameCount * 0.01;  // 회전 속도 (작을수록 느림)

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cx = x * cellW + cellW / 2;
      let cy = y * cellH + cellH / 2;

      // 각 셀마다 다른 회전 위상
      // 0.5 : 인접 셀 간 위상차 조절
      // 0.4 : 회전 각도 범위
      let angle = sin(t + x * 0.5 + y * 0.5) * 0.4;

      push();
      translate(cx, cy);
      rotate(angle);
      text("JAIKIM", 0, 0);
      pop();
    }
  }
}
