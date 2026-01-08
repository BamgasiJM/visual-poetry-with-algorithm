let words = [
  "connection",
  "distance",
  "trust",
  "silence",
  "empathy",
  "conflict",
  "affection",
  "memory",
  "absence",
  "presence",
  "bond",
  "fragile",
  "warmth",
  "echo",
  "attachment",
  "understanding",
  "gap",
  "touch",
  "separation",
  "relation",
  "사랑",
  "그리움",
  "외로움",
  "불안",
  "기대",
  "질투",
  "신뢰",
  "의심",
  "연결",
  "거리",
  "공감",
  "상처",
  "위로",
  "설렘",
  "후회",
  "집착",
  "해방",
  "침묵",
  "대화",
  "오해",
  "안정",
  "불편",
  "따뜻함",
  "차가움",
  "끌림",
  "거절",
  "허전함",
  "안도",
  "긴장",
  "피로",
  "희망",
  "혼란",
  "애착",
  "단절",
  "존중",
  "무관심",
  "열망",
  "체념",
  "기억",
  "여운",
];

let items = [];
let itemCount = 300;

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  noStroke();

  for (let i = 0; i < itemCount; i++) {
    items.push({
      word: random(words),
      x: random(width),
      y: random(height),
      speed: random(0.2, 0.8),
      size: random(16, 64),
      hue: random(200, 260),
      phase: random(TWO_PI), // 알파 애니메이션 시작 위상
      alphaSpeed: random(0.003, 0.01), // 호흡 속도
    });
  }
}

function draw() {
  drawBackgroundGradient();

  for (let item of items) {
    // 좌우 이동
    item.x += item.speed;
    if (item.x > width + 100) {
      item.x = -100;
    }

    // 마우스 거리 기반 채도
    let d = dist(mouseX, mouseY, item.x, item.y);
    let sat = map(d, 0, 200, 90, 0);
    sat = constrain(sat, 0, 90);

    // 시간 기반 알파 주기 운동
    let alphaOsc = sin(frameCount * item.alphaSpeed + item.phase);
    let alpha = map(alphaOsc, -1, 1, 0, 100);

    fill(item.hue, sat, 90, alpha);
    textSize(item.size);
    text(item.word, item.x, item.y);
  }
}

function drawBackgroundGradient() {
  let topColor = color(220, 20, 80);
  let bottomColor = color(270, 20, 80);

  for (let y = 0; y < height; y++) {
    let t = y / height;
    let c = lerpColor(topColor, bottomColor, t);
    stroke(c);
    line(0, y, width, y);
  }
}
