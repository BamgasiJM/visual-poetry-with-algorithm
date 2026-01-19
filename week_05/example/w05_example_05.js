// w05_example_05.js

const LINE_SPACING = 50;
const STROKE_WEIGHT = 1.0;

const WAVE_X_FREQ = 0.02;
const WAVE_Y_FREQ = 0.1;
const WAVE_X_AMPLITUDE = 50;
const WAVE_Y_AMPLITUDE = 10;
const TIME_SPEED_X = 0.0;
const TIME_SPEED_Y = 1.0;

function setup() {
  createCanvas(800, 600);
  noFill();
  strokeWeight(STROKE_WEIGHT);
  stroke(240);
}

function draw() {
  background(18, 10, 26);

  const TIME_X = frameCount * TIME_SPEED_X;
  const TIME_Y = frameCount * TIME_SPEED_Y;

  for (let y = 0; y < height; y += LINE_SPACING) {
    beginShape();

    for (let x = 0; x < width; x++) {
      const WAVE =
        sin((x + TIME_X) * WAVE_X_FREQ) * WAVE_X_AMPLITUDE +
        sin((y + TIME_Y) * WAVE_Y_FREQ) * WAVE_Y_AMPLITUDE;

      vertex(x, y + WAVE);
    }

    endShape();
  }
}
