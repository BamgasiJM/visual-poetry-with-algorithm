// w04_example_06.js

// 전역 변수 설정
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;
const NUM_COLS = 5; // 가로 큐브 개수
const NUM_ROWS = 5; // 세로 큐브 개수
const NUM_LAYERS = 5; // 깊이 방향 큐브 개수

// 큐브 크기
const CUBE_SIZE = 30;

// 3D 공간 설정
let angleX = 0;
let angleY = 0;
let angleZ = 0;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, WEBGL);

  // 큐브 라인 색상
  stroke(15);
  strokeWeight(0.5);

  // 채우기
  fill(255, 75);
}

function draw() {
  // 배경색 설정: RGB(30, 190, 180)
  background(30, 180, 170);

  // 카메라 설정
  camera(0, -150, 350, 0, 0, 0, 0, 1, 0);

  // 3D 공간 회전
  rotateX(angleX);
  rotateY(angleY);
  // rotateZ(angleZ); // 필요시 주석 해제

  // 큐브들 그리기
  for (let z = 0; z < NUM_LAYERS; z++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      for (let x = 0; x < NUM_COLS; x++) {
        push(); // 현재 변환 상태 저장

        // 큐브 위치 계산
        const offsetX = (x - NUM_COLS / 2 + 0.5) * CUBE_SIZE * 1.5;
        const offsetY = (y - NUM_ROWS / 2 + 0.5) * CUBE_SIZE * 1.5;
        const offsetZ = (z - NUM_LAYERS / 2 + 0.5) * CUBE_SIZE * 1.5;

        translate(offsetX, offsetY, offsetZ);

        // 큐브 그리기
        box(CUBE_SIZE);

        pop(); // 변환 상태 복원
      }
    }
  }

  // 자동 회전 (선택사항)
  angleX += 0.002;
}

// 마우스 드래그로 회전 제어 (선택사항)
let mousePressedX = 0;
let mousePressedY = 0;
let lastAngleY = 0;
let lastAngleX = 0;

function mousePressed() {
  mousePressedX = mouseX;
  mousePressedY = mouseY;
  lastAngleY = angleY;
  lastAngleX = angleX;
}

function mouseDragged() {
  const deltaX = mouseX - mousePressedX;
  const deltaY = mouseY - mousePressedY;
  angleY = lastAngleY + deltaX * 0.01;
  angleX = lastAngleX + deltaY * 0.01;
}
