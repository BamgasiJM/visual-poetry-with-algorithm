// 파도 애니메이션

let frame = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(28, 30, 36);

  noFill();
  strokeWeight(2);
  colorMode(HSB, 360, 100, 100);

  for (let y = 0; y < height; y += 20) {
    beginShape();
    for (let x = 0; x < width; x++) {
      const wave =
        sin((x + frame) * 0.02) * 20 + sin((y + frame * 0.5) * 0.03) * 15;
      vertex(x, y + wave);
    }
    const hue = (180 + y * 0.5) % 360;
    stroke(hue, 100, 60);
    endShape();
  }

  colorMode(RGB, 255);
  frame++;
}