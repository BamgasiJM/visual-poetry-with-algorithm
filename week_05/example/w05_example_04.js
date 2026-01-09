// 나선 애니메이션

let frame = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(28, 30, 36);

  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = width / 2;
  const spiralTurns = 5;

  noFill();
  strokeWeight(3);
  colorMode(HSB, 360, 100, 100);

  for (let i = 0; i < 999; i++) {
    const t1 = i / 1000;
    const t2 = (i + 1) / 1000;

    const angle1 = t1 * TWO_PI * spiralTurns + frame * 0.02;
    const angle2 = t2 * TWO_PI * spiralTurns + frame * 0.02;

    const radius1 = t1 * maxRadius;
    const radius2 = t2 * maxRadius;

    const x1 = centerX + cos(angle1) * radius1;
    const y1 = centerY + sin(angle1) * radius1;
    const x2 = centerX + cos(angle2) * radius2;
    const y2 = centerY + sin(angle2) * radius2;

    const hue = map(i, 0, 999, 180, 330);
    stroke(hue, 100, 65);
    line(x1, y1, x2, y2);
  }

  colorMode(RGB, 255);
  frame++;
}