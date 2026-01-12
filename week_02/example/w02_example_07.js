// w02_example_07.js

let angle = 0;

function setup() {
  createCanvas(800, 800, WEBGL);
  colorMode(RGB, 255);
  smooth();
}

function draw() {
  // 짙은 회색 배경
  background(20);

  // 조명 설정 - 순수 흰색 환경광
  ambientLight(150, 150, 150);
  directionalLight(200, 200, 200, 0, 1, 0);
  pointLight(255, 255, 255, 300, -300, 300);
  pointLight(100, 100, 100, -300, -200, -300);

  // 카메라 회전
  angle += 0.002;
  const camX = sin(angle) * 600;
  const camZ = cos(angle) * 600;
  camera(camX, -500, camZ, 0, 0, 0, 0, 1, 0);

  // 중앙 축 주변으로 원형 배치 - 샹들리에 형태
  const rings = 8;
  const itemsPerRing = 12;

  for (let ring = 0; ring < rings; ring++) {
    const radius = 120 + ring * 50;
    const baseHeight = -150 + ring * 50;

    for (let i = 0; i < itemsPerRing; i++) {
      const theta = (TWO_PI / itemsPerRing) * i + angle * 0.3;
      const x = cos(theta) * radius;
      const z = sin(theta) * radius;

      // 사인파로 위아래 움직임 생성
      const waveOffset = sin(angle * 10 + ring * 0.8 + i * 0.5) * 30;
      const yPos = baseHeight + waveOffset;

      push();
      translate(x, yPos, z);

      // 중심을 향하도록 회전
      rotateY(-theta);

      // 화이트 색상
      fill(255, 255, 255);
      noStroke();

      // 작은 육면체와 원기둥을 번갈아 배치
      if ((ring + i) % 2 === 0) {
        box(15, 40, 15);
      } else {
        cylinder(8, 40, 24);
      }

      pop();
    }
  }

  // 중앙 코어 - 샹들리에 중심축
  for (let i = 0; i < 12; i++) {
    const coreWave = sin(angle * 2.5 + i * 0.4) * 20;
    push();
    translate(0, -200 + i * 60 + coreWave, 0);
    rotateY(angle * 2 + i * 0.3);
    fill(255, 255, 255);
    noStroke();
    torus(30, 7, 24, 16);
    pop();
  }
}
