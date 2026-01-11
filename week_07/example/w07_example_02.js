// w07_example_02.js

let r = 370;
// 원을 72등분. 360/72=5도 간각으로 점이 배치됨. 약수이므로 균등분할 가능
// 3을 곱해서 더 세밀하게 만듦. 총 216개의 점을 생성함.
// 결과적으로 n = 216 -> 원 위에 216개 점 뱇치, 각 점 사이의 각도는 약 1.67도(360/216)
// let n = 72 * 3;
let n = 12 * 1;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(35, 0, 20);
  translate(width * 0.5, height * 0.5);
  let s = 1 + 0.001 * frameCount;

  for (let i = 0; i < n; i++) {
    let theta = (TWO_PI * i) / n;
    let y = r * sin(theta);
    let x = r * cos(theta);
    let y2 = r * sin(s * theta);
    let x2 = r * cos(s * theta);
    strokeWeight(1.0);
    stroke(240);
    line(x, y, x2, y2);
  }
}
