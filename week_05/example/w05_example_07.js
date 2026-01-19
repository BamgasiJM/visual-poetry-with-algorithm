// w05_example_07.js

const CANVAS_SIZE = 800;
const GRID_SIZE = 80;

const BASE_HUE = 30;
const HUE_STEP = 10;

const SCALE_AMPLITUDE = 0.75;
const SCALE_OFFSET = 0.5;
const CELL_SCALE = 0.6;

const TIME_SPEED = 0.02;
const PHASE_STEP = 0.3;

let COLS;
let ROWS;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  COLS = width / GRID_SIZE;
  ROWS = height / GRID_SIZE;

  noStroke();
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(250, 35, 20);

  const TIME = frameCount * TIME_SPEED;

  for (let i = 0; i < COLS; i++) {
    const PHASE_X = i * PHASE_STEP;

    for (let j = 0; j < ROWS; j++) {
      const PHASE_Y = j * PHASE_STEP;
      const INDEX_SUM = i + j;

      const X = i * GRID_SIZE;
      const Y = j * GRID_SIZE;

      const SCALE =
        sin(TIME + PHASE_X + PHASE_Y) * SCALE_AMPLITUDE + SCALE_OFFSET;

      const CELL_SIZE = GRID_SIZE * SCALE * CELL_SCALE;
      const OFFSET = (GRID_SIZE - CELL_SIZE) * 0.5;

      const HUE = (BASE_HUE + INDEX_SUM * HUE_STEP) % 360;

      fill(HUE, 90, 100);
      rect(X + OFFSET, Y + OFFSET, CELL_SIZE, CELL_SIZE);
    }
  }
}
