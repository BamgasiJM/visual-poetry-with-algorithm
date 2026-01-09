// 펄스 그리드

let frame = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(28, 30, 36);

  const gridSize = 40;
  const cols = width / gridSize;
  const rows = height / gridSize;

  noStroke();
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = i * gridSize;
      const y = j * gridSize;
      const scale = sin(frame * 0.02 + i * 0.3 + j * 0.3) * 0.5 + 0.5;
      const cellSize = gridSize * scale * 0.8;

      const hue = (330 + (i + j) * 10) % 360;
      fill(hue, 100, 60);
      rect(
        x + (gridSize - cellSize) / 2,
        y + (gridSize - cellSize) / 2,
        cellSize,
        cellSize
      );
    }
  }

  colorMode(RGB, 255);
  frame++;
}
