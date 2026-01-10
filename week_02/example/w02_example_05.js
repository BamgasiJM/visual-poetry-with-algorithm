// Motif 클래스 정의
class Motif {
  constructor(r) {
    this.a = r; // 내부 반지름
    this.b = r * (sin(135) / sin(15)); // 외부 반지름
  }

  display() {
    const angle = 30;
    beginShape();
    for (let i = 0; i < 12; i++) {
      let sx, sy;
      if (i % 2 === 0) {
        sx = cos(i * angle) * this.b;
        sy = sin(i * angle) * this.b;
      } else {
        sx = cos(i * angle) * this.a;
        sy = sin(i * angle) * this.a;
      }
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }
}

let a = 24; // 내부 반지름, 스케일 팩터
let b; // 외부 반지름
let dx, dy;
let nRow;
let nCol;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  noFill();
  stroke(50, 210, 200);
  strokeWeight(2);
  noLoop();

  b = a * (sin(135) / sin(15));
  dx = 2 * b;
  dy = 2 * b * cos(30);

  // 행과 열 개수 계산
  nRow = ceil(height / dy) + 1;
  nCol = ceil(width / dx) + 1;
}

function draw() {
  background(0);

  const motif = new Motif(a);

  for (let r = 0; r < nRow; r++) {
    for (let c = 0; c < nCol; c++) {
      push();
      if (r % 2 === 0) {
        // 짝수 행: 0, 2, 4, 6
        translate(c * dx, r * dy);
      } else {
        // 홀수 행: 1, 3, 5, 7
        translate(c * dx + b, r * dy);
      }
      motif.display();
      pop();
    }
  }
}
