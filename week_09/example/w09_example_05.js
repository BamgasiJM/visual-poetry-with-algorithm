let scale = 0.02;

function setup() {
  createCanvas(800, 400);
  pixelDensity(1); // ✅ 픽셀 밀도 1로 설정
  noLoop();
}

function draw() {
  background(25);
  loadPixels();

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let n = noise(x * scale, y * scale);
      let bright = map(n, 0, 1, 0, 255);
      // let bright = floor(n * 255);
      let idx = (x + y * width) * 4;

      pixels[idx] = bright;
      pixels[idx + 1] = bright;
      pixels[idx + 2] = bright;
      pixels[idx + 3] = 255;
    }
  }

  updatePixels();
}
