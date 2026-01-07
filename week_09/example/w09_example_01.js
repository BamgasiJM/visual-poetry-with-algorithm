// w09_example_01.js

function setup() {
  createCanvas(1000, 1000);
  background(185);

  noStroke();
  fill(0);

  let r = 0; 
  for (let i = 0; i < 100; i++) {
    
    let x = width / 2; 
    let y = height / 2;
    let divLen = random([3, 5, 8]); 
    let dotR = random([2, 3, 4]); 
    RJ_circle(x, y, r, divLen, dotR); 
    r += 5; 
  }
}

function draw() {}

function RJ_circle(_x, _y, _r, _divLen, _dotR) {
  push();
  translate(_x, _y);

  let divNum = floor((2 * PI * _r) / _divLen);
  let divDeg = (2 * PI) / divNum;

  for (let i = 0; i < divNum; i++) {
    let noiseScl = 0.003;
    let noiseAmp = 150;
    let sampleX = _x + _r * cos(i * divDeg);
    let sampleY = _y + _r * sin(i * divDeg);

    let r_offset = noise(sampleX * noiseScl, sampleY * noiseScl) * noiseAmp;

    let x = (_r - r_offset) * cos(i * divDeg);
    let y = (_r - r_offset) * sin(i * divDeg);

    circle(x, y, _dotR);
  }
  pop();
}
