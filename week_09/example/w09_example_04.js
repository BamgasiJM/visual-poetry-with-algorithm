// w09_example_04.js

const GRID_RESOLUTION = 6;
const PARTICLE_COUNT = 12000;
const GRADIENT_STEPS = 12;
const MASK_UPDATE_INTERVAL = 3;

let particles = [];
let brightnessGrid = [];
let particleGraphic;
let canvasContext;
let maskGraphic;

class Particle {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.baseVelocity = random(0.3, 1.0);
    this.currentSpeed = 0;
  }

  update() {
    let gridX = floor(this.x / GRID_RESOLUTION);
    let gridY = floor(this.y / GRID_RESOLUTION);

    if (brightnessGrid[gridY] && brightnessGrid[gridY][gridX] !== undefined) {
      this.currentSpeed = brightnessGrid[gridY][gridX] * 0.98;
    }

    this.x += (1 - this.currentSpeed) * 3 + this.baseVelocity;

    if (this.x > width) {
      this.x = 0;
    }
  }

  draw() {
    canvasContext.globalAlpha = this.currentSpeed;
    image(particleGraphic, this.x, this.y);
  }
}

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvasWrapper");

  canvasContext = canvas.drawingContext;
  pixelDensity(1);
  colorMode(HSB, 360, 100, 100, 100);

  // 파티클 모양
  particleGraphic = createGraphics(6, 6);
  particleGraphic.noStroke();
  particleGraphic.fill(250, 120, 150);
  particleGraphic.circle(3, 3, 3);

  // 마스크 그래픽 객체 생성 (willReadFrequently 설정)
  maskGraphic = createGraphics(width, height);
  maskGraphic.pixelDensity(1);
  maskGraphic.drawingContext.willReadFrequently = true;

  createParticles();
}

function draw() {
  clear();

  // 2프레임마다 마스크와 그리드 갱신
  if (frameCount % MASK_UPDATE_INTERVAL === 0) {
    updateMask();
    updateBrightnessGrid();
  }

  particles.forEach((p) => {
    p.update();
    p.draw();
  });
}

// ■ 마스크 도형 생성
function updateMask() {
  maskGraphic.clear();
  maskGraphic.background(100);
  maskGraphic.noStroke();

  let centerX = width / 2;
  let centerY = height / 2;

  // 호흡 애니메이션
  let baseSize = width * 0.35;
  let breatheOffset = sin(frameCount * 0.01) * 80;

  // 방사형 그라데이션
  for (let step = GRADIENT_STEPS; step > 0; step--) {
    let ratio = step / GRADIENT_STEPS;
    let grayValue = map(step, 1, 10, 0, 255);

    // 미세 흔들림
    let wobbleX = sin(frameCount * 0.02 + step * 1.3) * 22;
    let wobbleY = cos(frameCount * 0.04 + step * 1.7) * 12;

    maskGraphic.fill(grayValue);
    maskGraphic.circle(
      centerX + wobbleX,
      centerY + wobbleY,
      baseSize * ratio + breatheOffset
    );
  }
}

// ■ 밝기 그리드 생성
function updateBrightnessGrid() {
  brightnessGrid = [];
  maskGraphic.loadPixels();

  for (let y = 0; y < height; y += GRID_RESOLUTION) {
    let row = [];
    for (let x = 0; x < width; x += GRID_RESOLUTION) {
      let pixelIndex = 4 * (y * width + x);
      let redValue = maskGraphic.pixels[pixelIndex];
      let brightness = redValue / 225; // 밝은 영역일수록 1
      row.push(brightness);
    }
    brightnessGrid.push(row);
  }
}

// ■ 파티클 생성
function createParticles() {
  particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle(random(width), (i / PARTICLE_COUNT) * height));
  }
}
