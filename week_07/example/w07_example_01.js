/*
 * p5.js Code Example
 * Drawing shapes from meaningless math.
 * https://www.deconbatch.com/2025/12/p5example001.html
 * @author @deconbatch
 * @version 0.1
 * @license CC0 1.0 https://creativecommons.org/publicdomain/zero/1.0/deed.ja
 * p5js 2.0.0
 * created 2025.12.08
 */

function setup() {
  const CANVAS_SIZE = 640;

  // Parameters that determine the curve's shape. Initial values are set randomly.
  const A_FROM = random(-1, 1);
  const B_FROM = random(-1, 1);
  const A_TO = A_FROM + random(0.3, 0.5);
  const B_TO = B_FROM + random(0.3, 0.5);
  const A_STEP = 0.005;
  const B_STEP = 0.1;

  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noFill();
  stroke("MidnightBlue");
  strokeWeight(1);

  background("CornSilk");
  translate(width * 0.5, height * 0.5);

  // Outer loop. A change in pA results in a major change/shift in the entire line.
  for (let pA = A_FROM; pA < A_TO; pA += A_STEP) {
    beginShape();
    // Inner loop. The variable that determines the angle of individual points forming the line (shape).
    for (let pB = B_FROM; pB < B_TO; pB += B_STEP) {
      let r = CANVAS_SIZE * 0.5 * calcRadiusFactor(pA, pB);
      let t = PI * calcAngleFactor(pA, pB);
      let x = r * cos(t);
      let y = r * sin(t);
      vertex(x, y);
    }
    endShape();
  }
}

/**
 * A meaningless formula that determines the 'variation rate' of the radius.
 * Return value is in the range of -1 to 1. This is multiplied by the radius to fit it on the canvas.
 */
function calcRadiusFactor(_pA, _pB) {
  return cos(PI * (sin(TWO_PI * _pA * _pB) + _pB));
}

/**
 * A meaningless formula that determines the angle.
 * Return value is in the range of -1 to 1. This is multiplied by PI to be used as an angle (from -PI to PI).
 */
function calcAngleFactor(_pA, _pB) {
  return sin(PI * (_pA + _pB)) * cos(PI * _pA * _pB);
}
