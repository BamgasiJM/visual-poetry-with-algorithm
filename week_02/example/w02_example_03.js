// w02_example_03.js

function setup() {
  createCanvas(1280, 720);
  background(255); // 흰 배경
  noStroke(); // 테두리 없음
  fill(0); // 모든 도형 검정색

  // 화면을 가로로 3등분한 중심점들
  let leftX = width * 0.25; // 왼쪽 영역 중심 (320)
  let middleX = width * 0.5; // 가운데 영역 중심 (640)
  let rightX = width * 0.75; // 오른쪽 영역 중심 (960)
  let centerY = height / 2; // 세로 중앙 (360)

  // 각 도형의 기본 크기 (화면 높이의 몇 퍼센트 차지하는지)
  let baseSize = height * 0.4;

  // 왼쪽: 날카로운 가시가 사방으로 뻗친 폭발적인 불안
  drawSpikyBurst(leftX, centerY, baseSize * 0.9);

  // 가운데: 조여들고 뒤틀린 숨 막히는 압박감
  drawDistortedBlob(middleX, centerY, baseSize * 0.9);

  // 오른쪽: 무겁게 쌓이고 내려앉는 절망적인 덩어리들
  drawHeavyLayers(rightX, centerY, baseSize * 0.9);

  noLoop(); // 한 번만 그리고 끝
}

// 날카로운 가시 폭발 (불안이 터져 나오는 느낌)
function drawSpikyBurst(cx, cy, size) {
  let points = 18;
  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let r = i % 2 === 0 ? size * 0.9 : size * random(0.35, 0.45);
    let angle = radians((i * 180) / points + random(-8, 8));
    vertex(cx + cos(angle) * r, cy + sin(angle) * r);
  }
  endShape(CLOSE);
}

// 뒤틀리고 조여드는 울퉁불퉁 blob (숨 막히는 걱정)
function drawDistortedBlob(cx, cy, size) {
  beginShape();
  for (let i = 0; i <= 24; i++) {
    let angle = map(i, 0, 24, 0, TWO_PI);
    let n = noise(cos(angle) * 1.5, sin(angle) * 1.5);
    let r = (size / 2) * (0.6 + n * 1.0); // 강한 왜곡
    let x = cx + cos(angle) * r;
    let y = cy + sin(angle) * r;
    if (i === 0) vertex(x, y);
    else
      bezierVertex(
        cx + cos(angle - 0.15) * r * 1.2,
        cy + sin(angle - 0.15) * r * 1.2,
        cx + cos(angle + 0.15) * r * 1.2,
        cy + sin(angle + 0.15) * r * 1.2,
        x,
        y
      );
  }
  endShape(CLOSE);
}

// 무겁게 쌓여 내려앉는 검은 덩어리들 (절망과 피로)
function drawHeavyLayers(cx, cy, size) {
  for (let i = 0; i < 12; i++) {
    let w = size * (1.0 - i * 0.09) + random(-60, 60);
    let h = size * 0.75;
    let offsetY = i * 13;
    let offsetX = random(-20, 20);
    ellipse(cx + offsetX, cy + offsetY, w, h);
  }
}
