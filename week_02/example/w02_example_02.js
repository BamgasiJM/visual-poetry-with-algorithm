// w02_example_02.js

function setup() {
  createCanvas(800, 500);
  background(220, 220, 220);
  noStroke();

  const leftX = width * 0.25;
  const middleX = width * 0.5;
  const rightX = width * 0.75;
  const centerY = height / 2;
  const baseSize = height * 0.3;

  fill(random(10, 100));
  drawSpikyBurst(leftX, centerY, baseSize * 0.9);
  fill(random(10, 100));
  drawDistortedBlob(middleX, centerY, baseSize * 0.9);
  fill(random(10, 100));
  drawHeavyLayers(rightX, centerY, baseSize * 0.7);

  noLoop();
}

// 1. 날카롭게 뻗어나가는 불안
function drawSpikyBurst(cx, cy, size) {
  const points = 18;
  const angleStep = 180 / points;

  beginShape();
  for (let i = 0; i < points * 2; i++) {
    const isOuter = i % 2 === 0;
    const radius = isOuter ? size * 0.9 : size * random(0.35, 0.45);

    const angle = radians(i * angleStep + random(-8, 8));
    const x = cx + cos(angle) * radius;
    const y = cy + sin(angle) * radius;

    vertex(x, y);
  }
  endShape(CLOSE);
}

// 2. 왜곡된 blob - 불규칙하게 울퉁불퉁한 걱정
function drawDistortedBlob(cx, cy, size) {
  const segments = 24;
  const noiseScale = 1.5;

  beginShape();
  for (let i = 0; i <= segments; i++) {
    const angle = map(i, 0, segments, 0, TWO_PI);

    const noiseValue = noise(
      cos(angle) * noiseScale,
      sin(angle) * noiseScale * 1.3
    );

    const radius = (size / 2) * (0.6 + noiseValue * 1.0);
    const x = cx + cos(angle) * radius;
    const y = cy + sin(angle) * radius;

    if (i === 0) {
      vertex(x, y);
    } else {
      const controlOffset = 0.15;
      const controlRadius = radius * 1.2;

      bezierVertex(
        cx + cos(angle - controlOffset) * controlRadius,
        cy + sin(angle - controlOffset) * controlRadius,
        cx + cos(angle + controlOffset) * controlRadius,
        cy + sin(angle + controlOffset) * controlRadius,
        x,
        y
      );
    }
  }
  endShape(CLOSE);
}

// 3. 무거운 층 - 쌓이고 가라앉는 절망
function drawHeavyLayers(cx, cy, size) {
  const layers = 8;
  const baseWidth = size;
  const baseHeight = size * 0.4;

  for (let i = 0; i < layers; i++) {
    const shrinkFactor = 1.0 - i * 0.09;
    const width = baseWidth * shrinkFactor + random(-80, 80);
    const height = baseHeight;

    const offsetY = i * (baseHeight * 0.85);
    const offsetX = random(-30, 30);

    ellipse(
      cx + offsetX,
      cy + offsetY - layers * baseHeight * 0.3,
      width,
      height
    );
  }
}
