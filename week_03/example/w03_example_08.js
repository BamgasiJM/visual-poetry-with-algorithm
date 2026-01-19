// w03_example_08.js

let canvasSize;
let padding;

let gridCountX = 25;
let gridCountY = 25;

let gridStepX, gridStepY;

let loopLength = 200;
let loopProgress;
let phase;

function setup() {
  canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);

  padding = canvasSize / 12;

  gridStepX = (canvasSize - padding * 2) / gridCountX;
  gridStepY = (canvasSize - padding * 2) / gridCountY;
}

function drawWave() {
  background(0, 0, 50, 20);

  let colorFreqX = 15;
  let colorFreqY = 15;

  for (let x = padding; x <= canvasSize - padding; x += gridStepX) {
    for (let y = padding; y <= canvasSize - padding; y += gridStepY) {
      let distanceFromCenter = dist(x, y, canvasSize / 2, canvasSize / 2) * 0.5;

      let waveModulation = sin(phase + x + y + sin(phase + distanceFromCenter));

      strokeWeight(15 + 15 * waveModulation);

      let colorMix = (toggle, fx, fy) =>
        sin(phase + x * fx + y * fy) * toggle +
        cos(phase + x * fx + y * fy) * (1 - toggle);

      stroke(
        127.5 + 127.5 * colorMix(1, colorFreqX, colorFreqY),
        127.5 + 127.5 * colorMix(0, colorFreqX, colorFreqY),
        127.5 -
          127.5 * colorMix(map(sin(phase), -1, 1, 0, 1), colorFreqX, colorFreqY)
      );

      point(x, y);
    }
  }
}

function draw() {
  loopProgress = (frameCount % loopLength) / loopLength;
  phase = map(loopProgress, 0, 1, 0, TAU);

  drawWave();
}
