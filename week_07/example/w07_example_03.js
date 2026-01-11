// w07_example_03.js

let petals = [];
let time = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);

  // 여러 층의 꽃잎 생성
  for (let layer = 0; layer < 5; layer++) {
    petals.push({
      n: 36 + layer * 12,
      r: 80 + layer * 60,
      phase: layer * 0.3,
      speed: 0.01 - layer * 0.0015,
      hue: 320 + layer * 10,
      maxRadius: 80 + layer * 60,
    });
  }
}

function draw() {
  background(270, 45, 25);
  translate(400, 400);

  time += 0.007;
  let bloomProgress = constrain(time * 0.3, 0, 1);
  // easeOutCubic 이징 적용
  let bloom = 1 - pow(1 - bloomProgress, 3);

  // 중심에서 바깥으로 꽃잎 그리기
  for (let layer = petals.length - 1; layer >= 0; layer--) {
    let petal = petals[layer];
    let layerBloom = constrain((bloom - layer * 0.15) * 1.5, 0, 1);
    let currentR = petal.maxRadius * layerBloom;

    if (layerBloom > 0) {
      let s = 1 + petal.speed * frameCount + petal.phase;
      let alpha = 70 * layerBloom;

      strokeWeight(2.1);

      for (let i = 0; i < petal.n; i++) {
        let theta = (TWO_PI * i) / petal.n;
        let wave = sin(time * 2 + layer * 0.5) * 0.1;
        let spiralFactor = s + wave;

        let x1 = currentR * cos(theta);
        let y1 = currentR * sin(theta);
        let x2 = currentR * cos(spiralFactor * theta);
        let y2 = currentR * sin(spiralFactor * theta);

        // 그라데이션 효과
        let hue = (petal.hue + i * 2) % 360;
        let brightness = 85 + sin(time + i * 0.1) * 10;

        stroke(hue, 70, brightness, alpha);
        line(x1, y1, x2, y2);
      }
    }
  }

  // 중심부 강조
  if (bloom > 0.5) {
    let centerAlpha = (bloom - 0.5) * 100;
    fill(50, 80, 90, centerAlpha);
    noStroke();
    let centerSize = 20 * (bloom - 0.5) * 2;
    circle(0, 0, centerSize);

    // 중심 꽃술
    stroke(45, 60, 95, centerAlpha);
    strokeWeight(2);
    for (let i = 0; i < 12; i++) {
      let angle = (TWO_PI * i) / 12;
      let len = centerSize * 0.8;
      line(0, 0, cos(angle) * len, sin(angle) * len);
    }
  }
}
