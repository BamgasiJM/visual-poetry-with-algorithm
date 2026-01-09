// 크기가 변하는 동심원 애니메이션

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(6, 2, 6);

  const centerX = width / 2;
  const centerY = height / 2;

  for (let i = 0; i < 15; i++) {
    const radius = 30 + i * 25 + sin(frameCount * 0.02 + i) * 10;
    const hue = (180 + i * 10 + frameCount * 0.5) % 360;

    noFill();
    strokeWeight(3);
    colorMode(HSB, 360, 100, 100);
    stroke(hue, 100, 60);
    circle(centerX, centerY, radius * 2);
  }

  colorMode(RGB, 255);
}
