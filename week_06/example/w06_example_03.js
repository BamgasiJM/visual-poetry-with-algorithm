// Random Integer

function setup() {
  createCanvas(800, 400);
  background(23);
}

function draw() {
  // 색상 팔레트 정의
  let palette = [
    color(255, 240, 0, 180),
    color(255, 200, 0, 180),
    color(255, 160, 0, 180),
    color(255, 100, 0, 180),
    color(255, 50, 0, 180),
  ];
  
  noStroke();
  
  for (let i = 0; i < 5000; i++) {
    let idx = int(random(palette.length));
    fill(palette[idx]);
    
    // x, y를 10단위로 맞추기
    let x = int(random(width / 10)) * 10;
    let y = int(random(height / 10)) * 10;
    
    ellipse(x, y, 10, 10);
  }
  noLoop();
}
