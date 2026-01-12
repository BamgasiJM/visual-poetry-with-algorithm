// w03_example_04.js

function setup() {
  createCanvas(800, 600);
  noLoop();
}

function draw() {
  background(240);
  noStroke();

  const squareSize = 60;
  const startX = 55;
  const startY = 180;
  const spacing = 70;
  const rowSpacing = 230;

  // 첫 번째 줄 - RGBA 모드
  colorMode(RGB, 255, 255, 255, 255);

  fill(0, 0, 0, 25);
  rect(startX, startY, squareSize, squareSize);

  fill(0, 0, 0, 51);
  rect(startX + spacing, startY, squareSize, squareSize);

  fill(0, 0, 0, 76);
  rect(startX + spacing * 2, startY, squareSize, squareSize);

  fill(0, 0, 0, 102);
  rect(startX + spacing * 3, startY, squareSize, squareSize);

  fill(0, 0, 0, 127);
  rect(startX + spacing * 4, startY, squareSize, squareSize);

  fill(0, 0, 0, 153);
  rect(startX + spacing * 5, startY, squareSize, squareSize);

  fill(0, 0, 0, 178);
  rect(startX + spacing * 6, startY, squareSize, squareSize);

  fill(0, 0, 0, 204);
  rect(startX + spacing * 7, startY, squareSize, squareSize);

  fill(0, 0, 0, 229);
  rect(startX + spacing * 8, startY, squareSize, squareSize);

  fill(0, 0, 0, 255);
  rect(startX + spacing * 9, startY, squareSize, squareSize);

  // 두 번째 줄 - HSBA 모드
  colorMode(HSB, 360, 100, 100, 1);

  fill(0, 0, 0, 0.1);
  rect(startX, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.2);
  rect(startX + spacing, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.3);
  rect(startX + spacing * 2, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.4);
  rect(startX + spacing * 3, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.5);
  rect(startX + spacing * 4, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.6);
  rect(startX + spacing * 5, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.7);
  rect(startX + spacing * 6, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.8);
  rect(startX + spacing * 7, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 0.9);
  rect(startX + spacing * 8, startY + rowSpacing, squareSize, squareSize);

  fill(0, 0, 0, 1.0);
  rect(startX + spacing * 9, startY + rowSpacing, squareSize, squareSize);

  // 레이블 추가
  colorMode(RGB, 255);
  fill(0);
  textSize(28);
  textAlign(CENTER);
  text("RGBA Mode (0 ~ 255)", 400, startY - 70);
  text("HSBA Mode (0.0 ~ 1.0)", 400, startY + 160);

  textSize(16);
  text(
    "알파값: 25, 51, 76, 102, 127, 153, 178, 204, 229, 255",
    400,
    startY - 40
  );
  text(
    "알파값: 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0",
    400,
    startY + 190
  );
}
