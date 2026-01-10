// w02_example_02.js

function setup() {
  createCanvas(1000, 1000);
  background(0, 20, 30);
}

function draw() {
  // 마우스가 캔버스 안에 있을 때만 그리기
  if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
    if (mouseIsPressed) {
      fill(30, 200, 180);
    } else {
      fill(230, 230, 230);
    }
    strokeWeight(1);
    ellipse(mouseX, mouseY, 120, 120);
  }
}
