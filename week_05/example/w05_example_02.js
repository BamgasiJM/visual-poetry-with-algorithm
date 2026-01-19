// w05_example_02.js

const CANVAS_SIZE = 800;

const RING_COUNT = 55;
const BASE_RADIUS = 90;
const RADIUS_STEP = 4;
const RADIUS_WAVE_AMPLITUDE = 20;

const TIME_SPEED_RADIUS = 0.02;
const TIME_SPEED_COLOR = 1.5;

const STROKE_WEIGHT = 2;

/* Hue 범위 제어 */
const HUE_START = 30;
const HUE_END = 160;

let CENTER_X;
let CENTER_Y;

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  CENTER_X = width * 0.5;
  CENTER_Y = height * 0.5;

  noFill();
  strokeWeight(STROKE_WEIGHT);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(6, 2, 6);

  const TIME_RADIUS = frameCount * TIME_SPEED_RADIUS;
  const TIME_COLOR = frameCount * TIME_SPEED_COLOR;

  for (let i = 0; i < RING_COUNT; i++) {
    const RADIUS =
      BASE_RADIUS +
      i * RADIUS_STEP +
      sin(TIME_RADIUS + i) * RADIUS_WAVE_AMPLITUDE;

    const HUE = lerp(HUE_START, HUE_END, i / (RING_COUNT - 1)) + TIME_COLOR;

    stroke(HUE % 360, 90, 70);
    circle(CENTER_X, CENTER_Y, RADIUS * 2);
  }
}
