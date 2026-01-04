let tiles = [];
let cols = 25;
let rows = 25;
let t = 0; // 시간 변수

function setup() {
  createCanvas(1000, 1000);
  frameRate(60);

  const tileWidth = width / cols;
  const tileHeight = height / rows;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const pos = {
        x: x * tileWidth,
        y: y * tileHeight,
        w: tileWidth,
        h: tileHeight,
      };
      tiles.push(new Tile(pos));
    }
  }
}

function draw() {
  background(10);

  for (const tile of tiles) {
    tile.update(t);
    tile.display();
  }

  t += 0.01; // 주기 속도
}

function keyPressed() {
  if (key === " ") {
    for (const tile of tiles) {
      tile.randomizeColor();
    }
  }
}

class Tile {
  constructor(position) {
    this.position = position;

    // 타일별 랜덤 위상 오프셋
    this.phase = random(TWO_PI);

    // 초기 색상 고정
    this.randomizeColor();
  }

  randomizeColor() {
    this.color = {
      r: int(random(20, 100)),
      g: int(random(100, 200)),
      b: int(random(170, 220)),
    };
  }

  /* 오른쪽에서 왼쪽으로 파장 전달 */
  // 최소 크기가 필요하면 숫자를 더하고, 작은 수를 곱함
  // 큰 숫자로 겹치면 더 재미있는 패턴 생성됨
  // update(time) {
  //   const { x, w } = this.position;
  //   const nx = x / width; // 0~1 정규화

  //   this.scale = 0.4 + (sin(time + nx * TWO_PI) + 1) * 0.3;
  // }

  /* 중앙에서 바깥으로 파장 전달 */
  // time 뒤 부호를 바꾸면 방향 반전
  // nd 끝의 숫자를 키우면 파장 간격이 커짐

  // update(time) {
  //   const { x, y, w, h } = this.position;

  //   const cx = x + w * 0.5;
  //   const cy = y + h * 0.5;

  //   const d = dist(cx, cy, width * 0.5, height * 0.5);
  //   const nd = d / (sqrt(width * width + height * height) * 0.7);

  //   this.scale = (sin(time - nd * TWO_PI) + 0.5) * 0.65;
  // }

  /* 랜덤한 파동 */
  update(time) {
    // 사인 곡선 기반 크기 비율 (0~1)
    // 곱하는 숫자를 키우면 사이즈 증가
    this.scale = (sin(time + this.phase) + 1) * 0.5;
    // 최소 크기 보장
    //  this.scale = 0.42 + 0.7 * (sin(time + this.phase) + 1) * 0.4;
  }

  display() {
    const { x, y, w, h } = this.position;
    const { r, g, b } = this.color;

    // 중앙 기준 크기 변화
    const sw = w * this.scale;
    const sh = h * this.scale;

    const cx = x + w * 0.5;
    const cy = y + h * 0.5;

    stroke(10);
    strokeWeight(1);
    fill(r, g, b, 255);
    rectMode(CENTER);
    rect(cx, cy, sw, sh);
    rectMode(CORNER);
  }
}
