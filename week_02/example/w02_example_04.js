// w02_example_04.js

class Shape {
  constructor(innerRadius) {
    this.innerRadius = innerRadius;                        // 내부 반지름
    this.outerRadius = innerRadius * (sin(135) / sin(15)); // 외부 반지름
  }

  display() {
    const stepAngle = 30;
    beginShape();
    for (let index = 0; index < 12; index++) {
      let vertexX, vertexY;

      const currentRadius =
        index % 2 === 0 ? this.outerRadius : this.innerRadius;

      vertexX = cos(index * stepAngle) * currentRadius;
      vertexY = sin(index * stepAngle) * currentRadius;

      vertex(vertexX, vertexY);
    }
    endShape(CLOSE);
  }
}

let innerRadius = 24; // 내부 반지름, 스케일 팩터
let outerRadius;      // 외부 반지름

let columnSpacing;    // 가로 간격
let rowSpacing;       // 세로 간격

let rowCount;         // 행 개수
let columnCount;      // 열 개수

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES);
  noFill();
  stroke(30);
  strokeWeight(5);
  noLoop();

  outerRadius = innerRadius * (sin(135) / sin(15));

  columnSpacing = 2 * outerRadius;
  rowSpacing = 2 * outerRadius * cos(30);

  // 행과 열 개수 계산
  rowCount = ceil(height / rowSpacing) + 1;
  columnCount = ceil(width / columnSpacing) + 1;
}

function draw() {
  background(220);

  const shape = new Shape(innerRadius);

  for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
      push();

      if (rowIndex % 2 === 0) {
        // 짝수 행
        translate(columnIndex * columnSpacing, rowIndex * rowSpacing);
      } else {
        // 홀수 행
        translate(
          columnIndex * columnSpacing + outerRadius,
          rowIndex * rowSpacing
        );
      }

      shape.display();
      pop();
    }
  }
}
