// 도형의 최소/최대 크기 설정
const MIN_SIZE = 300;
const MAX_SIZE = 700;

// 다각형의 최소/최대 정점 수 설정 (3~128 사이)
const MIN_VERTICES = 3;
const MAX_VERTICES = 128;

function setup() {
  createCanvas(800, 800);
  angleMode(DEGREES); // 각도 단위를 Degree(도)로 설정
  noStroke();
}

function draw() {
  background(25); // 어두운 배경

  // 1. 화면 중앙을 기준으로 마우스 위치 계산
  // centerDeltaX: 마우스 X좌표와 중심 X좌표 간의 차이 (-width/2 ~ +width/2)
  let centerDeltaX = mouseX - width / 2;
  // centerDeltaY: 마우스 Y좌표와 중심 Y좌표 간의 차이 (-height/2 ~ +height/2)
  let centerDeltaY = mouseY - height / 2;

  // --- 매핑 및 제한 ---

  // 2. X축 위치를 '색상 값 (Hue)'으로 매핑 및 제한
  // centerDeltaX 범위: -width/2 ~ width/2
  // 목표 색상 범위 (HUE): 0 ~ 360 (색상환 전체)
  let mappedHue = map(centerDeltaX, -width / 2, width / 2, 0, 360);

  // map() 함수는 stop1, stop2를 벗어난 값도 비례적으로 계산하므로,
  // 원하지 않는다면 constrain으로 범위를 명확히 제한합니다. (옵션)
  let finalHue = constrain(mappedHue, 0, 360);

  // 3. Y축 위치를 '크기'로 매핑 및 제한
  // centerDeltaY 범위: -height/2 ~ height/2
  // 목표 크기 범위: MIN_SIZE ~ MAX_SIZE
  let mappedSize = map(
    centerDeltaY,
    -height / 2,
    height / 2,
    MIN_SIZE,
    MAX_SIZE
  );
  let finalSize = constrain(mappedSize, MIN_SIZE, MAX_SIZE);

  // 4. 마우스와 중앙 사이의 '거리'를 '정점 수'로 매핑 및 제한
  // dist() 함수로 마우스와 중앙(width/2, height/2) 사이의 거리 계산 (0 ~ max_diagonal)
  let distFromCenter = dist(mouseX, mouseY, width / 2, height / 2);
  let maxDist = dist(0, 0, width / 2, height / 2); // 최대 거리 (코너까지)

  // 거리 범위: 0 ~ maxDist
  // 목표 정점 수 범위: MIN_VERTICES ~ MAX_VERTICES
  let mappedVertices = map(
    distFromCenter,
    0,
    maxDist,
    MIN_VERTICES,
    MAX_VERTICES
  );

  // 정점 수는 정수여야 하므로, mappedVertices를 정수화 (round, floor, ceil 중 택 1)
  let rawVertices = round(mappedVertices);

  // 다각형 정점 수를 3~128 사이로 최종 제한
  let finalVertices = constrain(rawVertices, MIN_VERTICES, MAX_VERTICES);

  // --- 도형 그리기 ---

  // HSB(Hue, Saturation, Brightness) 컬러 모드 설정
  colorMode(HSB, 360, 100, 100);
  fill(finalHue, 100, 100); // 매핑된 HUE 값으로 채우기

  // 도형을 화면 중앙에 위치시킵니다.
  push();
  translate(width / 2, height / 2);

  // 다각형 그리기 함수 호출
  drawPolygon(0, 0, finalSize / 2, finalVertices); // finalSize를 지름으로 사용

  pop();

  // --- 정보 표시 ---
  colorMode(RGB); // 다시 기본 RGB 모드로 전환
  fill(255);
  textAlign(CENTER, TOP);
  textSize(25);
  text(`Hue (by X): ${round(finalHue)}`, width / 2, 20);
  text(`Size (by Y): ${round(finalSize)}`, width / 2, 50);
  text(`Vertices (by Dist): ${finalVertices}`, width / 2, 80);
  text(`Distance from centre: ${round(distFromCenter)}`, width / 2, 750);

  noStroke();
  fill(15);
  ellipse(width / 2, height / 2, 20);
}

/**
 * 지정된 위치에 정다각형을 그리는 함수
 * @param x x 좌표
 * @param y y 좌표
 * @param radius 반지름
 * @param npoints 정점 수
 */
function drawPolygon(x, y, radius, npoints) {
  let angle = 360 / npoints; // 각 정점 사이의 각도
  beginShape();
  for (let a = 0; a < 360; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
