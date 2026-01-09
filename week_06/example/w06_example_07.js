// Conway's Game of Life

// ====== 전역 변수 설정 ======
let grid; // 현재 세대의 상태 (0: Dead, 1: Alive)
let cols;
let rows;
let resolution = 5; // 셀 하나의 크기 (픽셀)

function setup() {
  // 캔버스를 600x600으로 생성합니다.
  createCanvas(600, 600);

  // 셀의 개수 계산
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  // 시뮬레이션 속도를 조절합니다. (초당 5 프레임)
  // 너무 빠르면 패턴 변화를 관찰하기 어렵습니다.
  frameRate(5);

  // 초기 격자 상태를 설정하고 무작위로 생명체를 배치합니다.
  grid = initializeRandomGrid(cols, rows);

  // 배경은 어두운 색으로 설정합니다.
  background(20);
}

function draw() {
  // 1. 현재 세대 그리기
  background(20); // 매 프레임마다 배경을 다시 칠해 잔상을 제거합니다.
  drawGrid(grid);

  // 2. 다음 세대 계산
  // CA의 핵심: 현재 상태(grid)를 기반으로 다음 상태(nextGrid)를 계산합니다.
  let nextGrid = computeNextGeneration(grid);

  // 3. 상태 업데이트
  // 계산된 다음 세대를 현재 세대로 교체합니다.
  grid = nextGrid;
}

// ====== 유틸리티 함수 ======

/**
 * 2차원 배열을 생성하고 무작위 초기값을 설정합니다.
 */
function initializeRandomGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows);
    for (let j = 0; j < rows; j++) {
      // 50% 확률로 0(죽음) 또는 1(생존)을 부여합니다.
      arr[i][j] = floor(random(2));
    }
  }
  return arr;
}

/**
 * 현재 격자의 상태를 캔버스에 그립니다.
 */
function drawGrid(currentGrid) {
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;

      if (currentGrid[i][j] == 1) {
        // 생존한 셀 (Alive): 흰색
        fill(200, 170, 80);
        stroke(20); // 셀 경계선은 배경색과 비슷하게 설정
        rect(x, y, resolution, resolution);
      } else {
        // 죽은 셀 (Dead): 그리지 않음 (배경색 유지)
        // noStroke();
        // fill(20);
        // rect(x, y, resolution, resolution);
      }
    }
  }
}

/**
 * 콘웨이의 생명 게임 규칙을 적용하여 다음 세대를 계산합니다.
 */
function computeNextGeneration(currentGrid) {
  // 다음 세대를 담을 새로운 격자를 만듭니다. (중요: 현재 격자를 직접 수정하면 안 됩니다!)
  let newGrid = initializeEmptyGrid(cols, rows);

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      // 1. 현재 셀의 상태
      let state = currentGrid[i][j];

      // 2. 이웃 셀 (8방향) 중 살아있는 셀의 개수를 셉니다.
      let liveNeighbors = countLiveNeighbors(currentGrid, i, j);

      // 3. 콘웨이의 4가지 규칙 적용
      if (state == 0 && liveNeighbors == 3) {
        // 🌟 규칙 4: 탄생 (Birth)
        // 죽은 셀이 이웃 3개를 가지면 살아납니다.
        newGrid[i][j] = 1;
      } else if (state == 1) {
        if (liveNeighbors < 2 || liveNeighbors > 3) {
          // 💀 규칙 1 & 3: 과소/과밀에 의한 죽음 (Death)
          // 이웃이 2개 미만이거나 3개를 초과하면 고독 또는 과밀로 죽습니다.
          newGrid[i][j] = 0;
        } else {
          // 💖 규칙 2: 생존 (Survival)
          // 이웃이 2개 또는 3개면 다음 세대에도 생존합니다.
          newGrid[i][j] = 1;
        }
      }
      // 그 외의 경우 (state=0, liveNeighbors!=3), 셀은 0(죽은 상태)을 유지합니다.
    }
  }
  return newGrid;
}

/**
 * 이웃 셀의 생존 개수를 셉니다. (토러스 경계 조건 적용)
 */
function countLiveNeighbors(grid, x, y) {
  let sum = 0;
  // 현재 셀의 주변 8개 셀을 순회 (-1, 0, 1)
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // ⚠️ 경계 조건 처리 (Toroidal Boundary - 토러스/도넛 모양)
      // 격자 끝을 넘어가면 반대편으로 이어지게 계산합니다.
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;

      // 이웃 셀의 상태를 합산합니다.
      sum += grid[col][row];
    }
  }

  // 자기 자신은 이웃에 포함되지 않으므로, 합산에서 제외합니다.
  sum -= grid[x][y];

  return sum;
}

/**
 * 빈 2차원 배열(모든 값 0)을 생성합니다.
 */
function initializeEmptyGrid(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < cols; i++) {
    arr[i] = new Array(rows).fill(0);
  }
  return arr;
}
