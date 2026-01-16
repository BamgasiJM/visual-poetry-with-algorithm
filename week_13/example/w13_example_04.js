// w13_example_04.js

let primes = [];
let count = 120;
let angleOffset = 0;

/* 소수 판별 함수 */
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i <= sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

/* 필요한 개수만큼 소수 생성 */
function generatePrimes(amount) {
  let result = [];
  let num = 2;

  while (result.length < amount) {
    if (isPrime(num)) {
      result.push(num);
    }
    num++;
  }
  return result;
}

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB, 360, 100, 100, 100);
  textAlign(CENTER, CENTER);
  textFont("san-serif");
  noStroke();

  primes = generatePrimes(count);
}

function draw() {
  background(200, 20, 10);

  translate(width / 2, height / 2);
  rotate(angleOffset);

  let maxRadius = min(width, height) * 0.45;

  for (let i = 0; i < count; i++) {
    // 바깥 → 안쪽으로 모이도록 역순 비율 사용
    let t = 1 - i / (count - 1);

    let angle = i * 0.35;
    let radius = t * maxRadius;

    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    let size = map(radius, 0, maxRadius, 6, 64);
    textSize(size);

    let hue = map(i, 0, count - 1, 70, 200);
    let alpha = map(radius, 0, maxRadius, 5, 100);

    fill(hue, 100, 100, alpha);
    text(primes[i], x, y);
  }

  angleOffset += 0.002;
}
