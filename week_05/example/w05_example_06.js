// 대각선 라인 애니메이션

let frame = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(28, 30, 36);

  const lineCount = 20;

  strokeWeight(2);
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < lineCount; i++) {
    const x1 = (i / lineCount) * width;
    const y1 = 0;
    const x2 = width - (i / lineCount) * width;
    const y2 = height;

    const offset = sin(frame * 0.02 + i * 0.5) * 50;

    stroke(180 + i * 10, 100, 60);
    line(x1 + offset, y1, x2 + offset, y2);
  }

  colorMode(RGB, 255);
  frame++;
}
