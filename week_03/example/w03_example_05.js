function setup() {
  createCanvas(800, 800);
  colorMode(RGB, 255, 255, 255, 255);
  noLoop();
}

function draw() {
  background(240);
  noStroke();

  const centerX = 400;
  const centerY = 350;
  const maxSize = 650;
  const minSize = 50;
  const steps = 10;

  for (let i = 0; i < steps; i++) {
    const size = map(i, 0, steps - 1, maxSize, minSize);
    const alpha = map(i, 0, steps - 1, 0, 255);

    fill(0, 0, 0, alpha);
    circle(centerX, centerY, size);
  }

  // 레이블 추가
  fill(0);
  textSize(24);
  textAlign(CENTER);
  text("큰 원: 알파값 10 (거의 투명)", 400, 730);
  text("작은 원: 알파값 100 (불투명)", 400, 770);
}
