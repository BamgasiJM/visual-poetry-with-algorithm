// ======================================================
// 1. 전역 설정값 (Configuration Constants)
// ======================================================

const CANVAS_SIZE = 800; // 캔버스의 가로·세로 크기
const TILE_SIZE = 50; // 하나의 타일이 차지하는 정사각형 크기
const GRID_NOISE_SCALE = 0.01; // 공간 노이즈의 세밀함
const TIME_NOISE_SCALE = 0.01; // 시간에 따른 노이즈 변화 속도
const TIME_STEP = 0.2; // 매 프레임마다 time 변수에 더해지는 값 (속도 조절)

// ======================================================
// 2. 전역 상태 변수 (Global State)
// ======================================================
// p5.js의 draw 루프 전체에서 공유되는 상태값

let tiles = []; // 모든 타일 객체(Tile 인스턴스)를 담는 배열
let time = 0; // 애니메이션의 시간 축 역할을 하는 변수. 점점 증가하며 변화의 기준이 됨

// ======================================================
// 3. p5.js 라이프사이클 함수
// ======================================================

// p5.js 초기 설정 함수 (프로그램 시작 시 한 번만 실행)
function setup() {
  // 캔버스 생성
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);

  // 색상 모드를 HSB로 설정
  // hue: 0~360, saturation/brightness/alpha: 0~100
  colorMode(HSB, 360, 100, 100, 100);

  // 각도 단위를 라디안이 아닌 도(degree)로 설정
  angleMode(DEGREES);

  // 화면 전체를 TILE_SIZE 간격으로 나누어 타일 객체들을 생성하고 배열에 저장
  tiles = createTileGrid();
}

// p5.js 무한 반복 함수 (매 프레임마다 실행됨)
function draw() {
  // 설정한 배경 색와 알파값을 매 프레임마다 덮어씌움
  background(5, 5, 5, 100);

  // 시간 값 증가. 이값은 노이즈, 색상 변화, 회전에 사용됨.
  time += TIME_STEP;

  // 모든 타일에 대해
  // 1) 현재 시간 값을 전달하며 타일의 노이즈와 회전 상태 갱신
  // 2) 갱신된 상태를 바탕으로 타일을 화면에 그림
  for (const tile of tiles) {
    tile.update(time);
    tile.render();
  }
}

// ======================================================
// 4. 타일 그리드 생성 함수
// ======================================================

// 화면을 TILE_SIZE 단위의 격자로 나누어 각 위치에 Tile 객체를 생성하는 함수
function createTileGrid() {
  // 생성된 타일들을 저장할 배열
  const result = [];

  // 가로 세로 방향으로 각각 TILE_SIZE 간격만큼 이동하며 반복
  for (let x = 0; x < width; x += TILE_SIZE) {
    for (let y = 0; y < height; y += TILE_SIZE) {
      // 현재 격자 위치(x, y)에 새로운 Tile 객체를 생성하여 배열에 추가
      result.push(new Tile(x, y, TILE_SIZE));
    }
  }

  // 완성된 타일 배열 반환
  return result;
}

// ======================================================
// 5. Tile 클래스 정의
// ======================================================
// Tile 클래스는 "타일 하나"를 표현하는 단위 객체
// 위치, 색, 회전, 형태, 애니메이션 로직을 정의함

class Tile {
  // --------------------------------------------------
  // 5-1. 생성자 (constructor)
  // --------------------------------------------------
  // new Tile(x, y, size) 형태로 호출됨
  // 타일이 처음 만들어질 때 한 번만 실행됨

  constructor(x, y, size) {
    // 타일의 좌상단 위치
    // p5.Vector를 사용하면 이후 벡터 연산 확장이 용이함
    this.position = createVector(x, y);

    // 타일의 기본 크기 저장
    this.size = size;

    // 초기 회전 각도를 랜덤하게 설정 (0~270도 사이)
    this.rotation = random(270);

    // 회전 속도를 랜덤하게 설정 (-4 ~ +4도/프레임)
    this.rotationSpeed = random(-4, 4);

    // 타일의 기본 색조(hue)를 랜덤하게 설정 (0~30으로 유사색 분포)
    this.hueBase = random(30);

    // 어떤 형태를 그릴지 결정하는 인덱스
    // 0: 사각형, 1: 원, 2: 삼각형, 3: 십자
    this.shapeType = floor(random(4));

    // 각 타일마다 다른 노이즈 패턴을 만들기 위한 랜덤 오프셋
    this.noiseOffset = random(1000);

    // 현재 프레임에서 계산된 노이즈 값 저장용 변수 (초기값 0)
    this.noiseValue = 0;
  }

  // --------------------------------------------------
  // 5-2. update 메서드
  // --------------------------------------------------
  // 시간에 따른 타일의 "상태 변화"를 담당
  // 위치는 고정되어 있고, 회전과 노이즈 값만 변함

  update(t) {
    // 타일 위치의 x, y 좌표를 구조 분해 할당으로 추출
    const { x, y } = this.position;

    // 3차원 Perlin 노이즈 값을 계산 (공간 x, 공간 y, 시간 t + 오프셋)
    this.noiseValue = noise(
      x * GRID_NOISE_SCALE,
      y * GRID_NOISE_SCALE,
      t * TIME_NOISE_SCALE + this.noiseOffset
    );

    // 노이즈 값에 비례하여 회전 속도 적용 (노이즈가 클수록 더 빠르게 회전)
    this.rotation += this.rotationSpeed * this.noiseValue;
  }

  // --------------------------------------------------
  // 5-3. render 메서드
  // --------------------------------------------------
  // 타일을 실제로 화면에 그리는 역할을 한다.
  // 계산된 상태값을 시각적 요소로 변환한다.

  render() {
    // 타일 위치의 x, y 좌표 추출
    const { x, y } = this.position;

    // 타일의 중심 좌표 계산
    const centerX = x + this.size * 0.5;
    const centerY = y + this.size * 0.5;

    // 현재 계산된 노이즈 값을 n으로 사용
    const n = this.noiseValue;

    // 색조(hue): 기본 hue + 시간에 따른 변화 + 노이즈 영향
    const hue = (this.hueBase + time * 0.5 + n * 100) % 360;

    // 채도(saturation): 시간과 x 위치에 따른 사인파로 부드럽게 진동
    const saturation = 40 + sin(time * 6 + x * 0.01) * 20;

    // 명도(brightness): 시간과 y 위치에 따른 코사인파로 부드럽게 진동
    const brightness = 50 + cos(time * 3 + y * 0.1) * 50;

    // 도형의 실제 그려질 크기: 노이즈에 따라 0.8~1.2배 사이에서 변동
    const drawSize = this.size * 0.5 * (0.8 + n * 0.4);

    push(); // 현재 좌표계와 스타일 저장

    // 타일 중심으로 좌표계를 이동
    translate(centerX, centerY);

    // 계산된 회전 각도 적용 (기본 회전 + 노이즈에 따른 추가 회전)
    rotate(this.rotation + n * 20);

    // 테두리 없음
    noStroke();

    // 계산된 HSB 색상과 불투명도 100으로 채우기
    fill(hue, saturation, brightness, 100);

    // shapeType에 따라 도형 그리기
    this.drawShape(drawSize);

    // 도형 중앙에 작은 흰 점 추가
    this.drawInnerDot(drawSize);

    pop(); // 좌표계와 스타일 복원
  }

  // --------------------------------------------------
  // 5-4. 도형 선택 메서드
  // --------------------------------------------------
  // shapeType 값을 기반으로
  // 미리 정의된 함수 배열에서 도형을 호출

  drawShape(size) {
    SHAPE_RENDERERS[this.shapeType](size);
  }

  // --------------------------------------------------
  // 5-5. 내부 점 장식
  // --------------------------------------------------
  // 타일 중앙에 작은 흰색 원 그림

  drawInnerDot(size) {
    fill(0, 0, 100, 100); // HSB Mode로 채우기
    ellipse(10, 0, size * 0.2); // 중심에서 약간 오른쪽(10,0)
  }

  // --------------------------------------------------
  // 5-6. 외형 랜덤화 메서드
  // --------------------------------------------------
  // 외부에서 호출 시 타일의 회전 속도, 색상, 도형을 다시 랜덤화

  randomizeAppearance() {
    this.rotationSpeed = random(-4, 4);
    this.hueBase = random(30);
    this.shapeType = floor(random(4));
  }
}

// ======================================================
// 6. 도형 렌더링 함수들
// ======================================================
// 각 함수는 "현재 좌표계 기준"으로 도형을 그림
// Tile 클래스에서는 좌표 변환만 담당하고
// 실제 도형 정의는 이 영역에 위임함

// 각 도형을 그리는 함수들을 배열로 묶음 (0,1,2,3 인덱스로 선택)
const SHAPE_RENDERERS = [drawSquare, drawCircle, drawTriangle, drawCross];

// 사각형 그리기 (중심 기준)
function drawSquare(size) {
  rect(-size / 2, -size / 2, size, size);
}

// 원 그리기 (중심 기준)
function drawCircle(size) {
  ellipse(0, 0, size, size);
}

// 정삼각형 그리기 (중심 기준, 위쪽이 뾰족)
function drawTriangle(size) {
  beginShape();
  for (let i = 0; i < 3; i++) {
    const angle = 120 * i - 90; // 120도 간격, -90도로 회전하여 위쪽 정점
    vertex(cos(angle) * size * 0.5, sin(angle) * size * 0.5);
  }
  endShape(CLOSE);
}

// 십자 모양 그리기 (가로 막대 + 세로 막대)
function drawCross(size) {
  rect(-size / 2, -size / 6, size, size / 3); // 가로 막대
  rect(-size / 6, -size / 2, size / 3, size); // 세로 막대
}

// ======================================================
// 7. 입력 처리
// ======================================================
// 스페이스바를 누르면 모든 타일의 외형이 새로 랜덤화

function keyPressed() {
  if (key === " ") {
    for (const tile of tiles) {
      tile.randomizeAppearance();
    }
  }
}
