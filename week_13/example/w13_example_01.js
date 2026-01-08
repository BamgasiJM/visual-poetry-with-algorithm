let cols = 8;
let rows = 8;
let cellW, cellH;

function setup() {
  createCanvas(800, 800);

  cellW = width / cols;
  cellH = height / rows;

  textFont("serif");
  textAlign(CENTER, CENTER);
  textSize(24);
}

function draw() {
  background(0);

  fill(255, 127, 80); // coral color
  noStroke();

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cx = x * cellW + cellW / 2;
      let cy = y * cellH + cellH / 2;

      text("JAIKIM", cx, cy);
    }
  }
}
