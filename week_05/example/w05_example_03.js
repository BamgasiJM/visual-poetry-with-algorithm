// 파티클 애니메이션

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(8, 3, 1);

  const particleCount = 120;

  noStroke();
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < particleCount; i++) {
    const angle = (i / particleCount) * TWO_PI + frameCount * 0.007;
    const radius = 250 + sin(frameCount * 0.01 + i) * 100;
    const x = width / 2 + cos(angle) * radius;
    const y = height / 2 + sin(angle) * radius;
    const particleSize = 6 + sin(frameCount * 0.1 + i) * 2;

    const hue = (280 + i * 3.6) % 360;
    fill(hue, 80, 80);
    circle(x, y, particleSize * 2);
  }
}
