// w03_example_05.js

let state = 0;

const CANVAS_SIZE = 800;
const GRID_COUNT = 8;
const MAX_STATE = 11;

// 감정 단어 세트
const EMOTIONS = [
  { en: "Depressed", kr: "우울한" },
  { en: "Gloomy", kr: "침울한" },
  { en: "Low", kr: "가라앉은" },
  { en: "Lethargic", kr: "무기력한" },
  { en: "Neutral", kr: "중립적인" },
  { en: "Okay", kr: "괜찮은" },
  { en: "Calm", kr: "편안한" },
  { en: "Pleasant", kr: "기분 좋은" },
  { en: "Happy", kr: "즐거운" },
  { en: "Excited", kr: "신나는" },
  { en: "Joyful", kr: "매우 즐거운" },
  { en: "Euphoric", kr: "황홀한" },
];

function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  colorMode(HSB, 360, 100, 100, 1);
  textAlign(CENTER, CENTER);
  noLoop();
}

function draw() {
  // 배경 색상 (우울 → 오렌지)
  let bgHue = map(state, 0, MAX_STATE, 210, 30);
  let bgSat = map(state, 0, MAX_STATE, 20, 85);
  let bgBri = map(state, 0, MAX_STATE, 15, 95);
  background(bgHue, bgSat, bgBri);

  let cellSize = width / GRID_COUNT;

  // 그리드 도형
  for (let y = 0; y < GRID_COUNT; y++) {
    for (let x = 0; x < GRID_COUNT; x++) {
      drawEmotionShape(x * cellSize, y * cellSize, cellSize, state);
    }
  }

  drawCenterLabel();
}

function drawEmotionShape(x, y, size, state) {
  push();
  translate(x + size / 2, y + size / 2);

  let hue = map(state, 0, MAX_STATE, 210, 30);
  let sat = map(state, 0, MAX_STATE, 30, 90);
  let bri = map(state, 0, MAX_STATE, 35, 95);
  fill(hue, sat, bri, 0.75);
  noStroke();

  // 3각형 → 16각형
  let sides = floor(map(state, 0, MAX_STATE, 3, 16));
  let radius = size * 0.4;

  beginShape();
  for (let i = 0; i < sides; i++) {
    let angle = (i / sides) * TWO_PI;
    vertex(cos(angle) * radius, sin(angle) * radius);
  }
  endShape(CLOSE);

  pop();
}

function drawCenterLabel() {
  let boxW = 360;
  let boxH = 140;

  push();
  translate(width / 2, height / 2);

  // 화이트 박스
  rectMode(CENTER);
  noStroke();
  fill(0, 0, 100, 0.85);
  rect(0, 0, boxW, boxH, 16);

  // 영어 텍스트
  fill(0, 0, 10);
  textSize(36);
  textStyle(BOLD);
  text(EMOTIONS[state].en, 0, -15);

  // 한국어 텍스트
  textSize(20);
  textStyle(NORMAL);
  text(EMOTIONS[state].kr, 0, 28);

  pop();
}

function mouseReleased() {
  state = constrain(state + 1, 0, MAX_STATE);
  redraw();
}
