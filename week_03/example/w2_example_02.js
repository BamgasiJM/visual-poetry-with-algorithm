let img;
const detail = 6;
let particles = [];
let grid = [];
let particleImage;
let ctx;

function preload() {
  img = loadImage(
    "/week_03/example/image_01.jpg"
  );
}

class Particle {
  constructor(x, y) {
    this.x = x || random(width);
    this.y = y || random(height);
    this.prevX = this.x;
    this.speed = 0;
    this.v = random(0, 0.7);
  }

  update() {
    if (grid.length) {
      this.speed = grid[floor(this.y / detail)][floor(this.x / detail)] * 0.97;
    }
    this.x += (1 - this.speed) * 3 + this.v;

    if (this.x > width) {
      this.x = 0;
    }
  }

  draw() {
    image(particleImage, this.x, this.y);
  }
}

function setup() {
  const canvas = createCanvas(100, 100);
  ctx = canvas.drawingContext;
  pixelDensity(1);

  // 파티클 이미지 생성
  particleImage = createGraphics(6, 6);
  particleImage.fill(255, 200, 60);
  particleImage.noStroke();
  particleImage.circle(4, 4, 4);

  windowResized();
}

function windowResized() {
  const imgRatio = img.width / img.height;
  if (windowWidth / windowHeight > imgRatio) {
    resizeCanvas(floor(windowHeight * imgRatio), floor(windowHeight));
  } else {
    resizeCanvas(floor(windowWidth), floor(windowWidth / imgRatio));
  }

  initializeEffect();
}

function initializeEffect() {
  clear();
  ctx.globalAlpha = 1;

  // 이미지를 로드하고 픽셀 데이터 추출
  image(img, 0, 0, width, height);
  loadPixels();
  clear();
  noStroke();

  // 밝기 그리드 생성
  grid = [];
  for (let y = 0; y < height; y += detail) {
    let row = [];
    for (let x = 0; x < width; x += detail) {
      const r = pixels[(y * width + x) * 4];
      const g = pixels[(y * width + x) * 4 + 1];
      const b = pixels[(y * width + x) * 4 + 2];
      const _color = color(r, g, b);
      const _brightness = brightness(_color) / 100;
      row.push(_brightness);
    }
    grid.push(row);
  }

  // 파티클 생성 (개수가 변해도 균등 분포))
  const particleCount = 8000;
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(null, (i / particleCount) * height));
  }
}

// 파티클 알갱이로 보이게 하기
function draw() {
  // 매 프레임마다 완전히 클리어
  clear();

  // 파티클 업데이트 및 그리기
  // ctx.globalAlpha =1;
  particles.forEach((p) => {
    p.update();
    ctx.globalAlpha = p.speed * 0.8;
    p.draw();
  });
}

// 파티클에 trail effect
// function draw() {
//   // 페이드 효과를 위한 반투명 검은색 레이어
//   ctx.globalAlpha = 0.05;
//   fill(0);
//   rect(0, 0, width, height);

//   // 파티클 업데이트 및 그리기
//   ctx.globalAlpha = 0.2;
//   particles.forEach((p) => {
//     p.update();
//     ctx.globalAlpha = p.speed * 0.3;
//     p.draw();
//   });
// }
