// Gaussian Distibution

function setup() {
  createCanvas(1200, 1200);
  colorMode(HSB, 360, 100, 100, 100);
  background(5);
  noLoop();
  noStroke();
  translate(width / 2, height / 2);

  for (let layer = 0; layer < 5; layer++) {
    let sd = 25 + layer * 40;
    let alpha = 100 - layer * 15;
    let hue = (30 + layer * 60) % 360;

    fill(hue, 80, 100, alpha);

    for (let i = 0; i < 10000; i++) {
      let x_pos = randomGaussian(0, sd);
      let y_pos = randomGaussian(0, sd);
      ellipse(x_pos, y_pos, random(2, 5));
    }
  }
}
