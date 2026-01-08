// 그리드 중심 거리 기반으로 텍스트 크기 변화

let cols = 32;
let rows = 32;
let cellW, cellH;
let maxDist;
let letters = [];

function setup() {
  createCanvas(1000, 1000);

  cellW = width / cols;
  cellH = height / rows;

  maxDist = dist(0, 0, width / 2, height / 2);

  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  noStroke();

  // 그리드마다 랜덤 알파벳 할당 (A–Z)
  for (let y = 0; y < rows; y++) {
    letters[y] = [];
    for (let x = 0; x < cols; x++) {
      let charCode = floor(random(65, 91));
      letters[y][x] = String.fromCharCode(charCode);
    }
  }
}

function draw() {
  background(0);

  fill(180, 150, 250); // coral

  let centerX = width / 2;
  let centerY = height / 2;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cx = x * cellW + cellW / 2;
      let cy = y * cellH + cellH / 2;

      let d = dist(cx, cy, centerX, centerY);
      let n = d / maxDist;

      let size = lerp(48, 8, n);
      textSize(size);

      text(letters[y][x], cx, cy);
    }
  }
}

