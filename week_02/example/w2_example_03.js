// 003

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);
  background(0, 0, 5); // 어두운 배경
  noLoop();
  noStroke();

  // 캔버스를 4개의 구역으로 나누어 다양한 랜덤 패턴展示
  drawRandomWalk(300, 300);
  drawParticleSystem(900, 300);
  drawNoiseField(300, 900);
  drawGaussianClusters(900, 900);
}

// 1. 랜덤 워크 (Random Walk)
function drawRandomWalk(x, y) {
  push();
  translate(x, y);

  let posX = 0;
  let posY = 0;
  let hue = 200; // 파란색 계열

  for (let i = 0; i < 1000; i++) {
    // 각 걸음마다 색상 변화
    fill(hue, 80, 100, 80);

    // 랜덤한 방향으로 이동
    posX += random(-15, 15);
    posY += random(-15, 15);

    // 점점 커지는 원
    ellipse(posX, posY, i * 0.05 + 2);

    // 색상 변화
    hue = (hue + random(1, 3)) % 360;
  }
  pop();
}

// 2. 파티클 시스템 (Particle System)
function drawParticleSystem(x, y) {
  push();
  translate(x, y);

  for (let i = 0; i < 300; i++) {
    // 랜덤한 시작 위치
    let angle = random(TWO_PI);
    let distance = random(50, 150);
    let startX = cos(angle) * distance;
    let startY = sin(angle) * distance;

    let hue = random(0, 60); // 빨강-주황 계열
    let life = random(50, 100);

    // 파티클 궤적 시뮬레이션
    for (let j = 0; j < life; j++) {
      let alpha = map(j, 0, life, 100, 10); // 점점 희미해짐
      fill(hue, 90, 100, alpha);

      // 랜덤한 움직임
      startX += random(-3, 3);
      startY += random(-3, 3);

      ellipse(startX, startY, map(j, 0, life, 8, 2)); // 점점 작아짐
    }
  }
  pop();
}

// 3. 노이즈 필드 (Noise Field)
function drawNoiseField(x, y) {
  push();
  translate(x, y);

  let time = random(1000);

  for (let i = -200; i <= 200; i += 10) {
    for (let j = -200; j <= 200; j += 10) {
      // 퍼린 노이즈를 사용한 자연스러운 랜덤
      let noiseVal = noise(i * 0.05, j * 0.05, time);
      let size = map(noiseVal, 0, 1, 2, 7);
      let hue = map(noiseVal, 0, 1, 120, 280); // 초록-보라 계열

      fill(hue, 80, 100, 90);
      ellipse(i, j, size);

      // 노이즈를 이용한 회전 각도
      let angle = noiseVal * TWO_PI * 2;
      let length = size * 2;

      stroke(hue, 80, 100, 70);
      strokeWeight(2);
      line(i, j, i + cos(angle) * length, j + sin(angle) * length);
      noStroke();
    }
  }
  pop();
}

// 4. 가우시안 클러스터 (Gaussian Clusters)
function drawGaussianClusters(x, y) {
  push();
  translate(x, y);

  // 3개의 클러스터 생성
  for (let cluster = 0; cluster < 3; cluster++) {
    let clusterX = random(-200, 200);
    let clusterY = random(-200, 200);
    let hue = random(300, 360); // 분홍-보라 계열

    for (let i = 0; i < 500; i++) {
      // 정규분포를 따르는 위치
      let x_pos = randomGaussian(clusterX, 40);
      let y_pos = randomGaussian(clusterY, 40);

      // 거리에 따른 투명도 변화
      let distance = dist(x_pos, y_pos, clusterX, clusterY);
      let alpha = map(distance, 0, 100, 100, 20);

      // 거리에 따른 크기 변화
      let size = map(distance, 0, 100, 8, 2);

      fill(hue, 70, 100, alpha);
      ellipse(x_pos, y_pos, size);
    }
  }
  pop();
}