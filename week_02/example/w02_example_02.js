// w02_example_02.js

function setup() {
  createCanvas(800, 800);
  background(0, 20, 50);
}

function draw() {
  // 마우스가 캔버스 안에 있을 때만 그리기
  if (mouseX > 0 && mouseY > 0 && mouseX < width && mouseY < height) {
    if (mouseIsPressed) {
      fill(30, 200, 180);
    } else {
      fill(255, 255, 255);
    }
    strokeWeight(1);
    ellipse(mouseX, mouseY, 80, 80);
  }
}
