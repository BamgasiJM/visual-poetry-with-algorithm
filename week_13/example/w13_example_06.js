// w13_example_06.js

let words = [
  "affection", "hug", "care", "touch", "bond", "trust", "warmth",
  "heart", "connection", "embrace", "devotion", "intimacy", "memory",
  "tenderness", "presence", "holding", "sharing", "comfort",
];

let items = [];
let maskPoints = [];
let hearscale = 300;

function setup() {
  const canvas = createCanvas(800, 800);
  canvas.parent("canvasWrapper");

  colorMode(HSB, 360, 100, 100, 100);
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  noStroke();

  generateHeartMask();
  packWords();
}

function draw() {
  background(0, 0, 3);

  for (let item of items) {
    let a = map(sin(frameCount * 0.02 + item.phase), -1, 1, 60, 100);

    fill(item.hue, 70, 90, a);
    textSize(item.size);
    text(item.word, item.x, item.y);
  }
}

// ────────────────────────────
// ■ 하트 마스크 생성
// ────────────────────────────
function generateHeartMask() {
  maskPoints = [];

  for (let y = -1.5; y <= 1.5; y += 0.03) {
    for (let x = -1.5; x <= 1.5; x += 0.03) {
      // 하트 암시적 방정식
      let a = x * x + y * y - 1;
      if (a * a * a - x * x * y * y * y <= 0) {
        maskPoints.push({
          x: width / 2 + x * hearscale,
          y: height / 2 - y * hearscale,
        });
      }
    }
  }
}

// ────────────────────────────
// ■ 단어 패킹 로직
// ────────────────────────────
function packWords() {
  let attempts = 10000;

  for (let i = 0; i < attempts; i++) {
    if (items.length > 1000) break;

    let p = random(maskPoints);
    let word = random(words);
    let size = random(6, 24);

    let item = {
      word: word,
      x: p.x + random(-2, 2),
      y: p.y + random(-2, 2),
      size: size,
      r: size * word.length * 0.11,
      hue: random(0, 40),
      phase: random(TWO_PI),
    };

    if (!overlaps(item)) {
      items.push(item);
    }
  }
}

function overlaps(n) {
  for (let o of items) {
    if (dist(n.x, n.y, o.x, o.y) < n.r + o.r) {
      return true;
    }
  }
  return false;
}
