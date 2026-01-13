// w04_example_05.js

// Artwork by Patt Vira
// Video Tutorial: https://youtu.be/e7B7VFzT-xQ

let num = 40;
let size;
let margin = 30;
let scaleFactor;
let snowPallete = [
  "#FFFFFF", "#CCE7FF", "#99D0FF", "#66B8FF", 
  "#339FFF", "#0077FF", "#0055AA", "#003377",
];
let band = 100;

let scaleSlider;

function setup() {
  createCanvas(800, 800);
  size = (width - margin * 2) / num;

  scaleSlider = createSlider(1, 5, 1, 0.2);
  scaleSlider.position(10, height + 10);
  scaleSlider.size(200);
}

function draw() {
  background(0, 0, 80);
  noStroke();

  scaleFactor = scaleSlider.value();
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let x = margin + size / 2 + i * size;
      let y = margin + size / 2 + j * size;

      let distFromCenter = dist(x, y, width / 2, height / 2);
      let scaledDist = pow(distFromCenter, scaleFactor);
      let colorIndex = floor(scaledDist) % snowPallete.length;

      fill(snowPallete[colorIndex]);
      ellipse(x, y, size, size);
    }
  }
}
