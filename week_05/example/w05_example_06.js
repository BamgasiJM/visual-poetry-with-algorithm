// w05_example_06.js

const CANVAS_SIZE = 800;

const TIME_SPEED = 0.005;
const RADIUS_SCALE = 3.5;

const RADIAL_DIVISION = 10;
const ANGLE_DIVISION = 12;

const POSITION_WAVE_SCALE = 0.25;

const DOT_SIZE_BASE = 40;
const DOT_SIZE_VARIATION = 40;

let PHASE;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noStroke();
  background(0);
}

function draw() {
  background(0, 10);

  translate(CANVAS_SIZE * 0.5, CANVAS_SIZE * 0.5);

  PHASE = frameCount * TIME_SPEED * TAU;

  const MAX_RADIUS = CANVAS_SIZE / RADIUS_SCALE;

  for (
    let radius = MAX_RADIUS * 0.5;
    radius < MAX_RADIUS;
    radius += MAX_RADIUS / RADIAL_DIVISION
  ) {
    for (
      let angle = PHASE * 0.25;
      angle < TAU + PHASE * 0.25;
      angle += TAU / ANGLE_DIVISION
    ) {
      const WAVE = POSITION_WAVE_SCALE * radius * sin(PHASE + radius + angle);

      const X =
        radius * cos(angle + radius) +
        WAVE +
        POSITION_WAVE_SCALE * radius * sin(PHASE + radius);

      const Y =
        radius * sin(angle + radius) +
        WAVE +
        POSITION_WAVE_SCALE * radius * cos(PHASE + radius);

      fill(
        127.5 + 127.5 * sin(PHASE + radius + angle),
        127.5 + 127.5 * cos(PHASE + radius + angle),
        127.5 - 127.5 * cos(PHASE + radius + angle)
      );

      const DOT_SIZE =
        CANVAS_SIZE / DOT_SIZE_BASE +
        (CANVAS_SIZE / DOT_SIZE_VARIATION) * sin(PHASE + radius + angle);

      ellipse(X, Y, DOT_SIZE);
    }
  }
}
