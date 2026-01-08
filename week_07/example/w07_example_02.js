class RotatingCurve {
  constructor(angle, baseRadius, curveSize, hue, sat, bri, speed, frequency) {
    this.angle = angle;
    this.baseRadius = baseRadius;
    this.curveSize = curveSize;
    this.hue = hue;
    this.sat = sat;
    this.bri = bri;
    this.speed = speed;
    this.frequency = frequency;
    this.phase = 0;
    this.points = [];
    this.maxPoints = 2000;
  }

  update() {
    this.phase += this.speed;

    // 원점에서 일정 거리에 위치한 곡선의 중심점
    const centerX = this.baseRadius * cos(this.angle);
    const centerY = this.baseRadius * sin(this.angle);

    // 곡선을 따라 움직이는 점 계산
    const t = this.phase;
    const r = this.curveSize * (1 + 0.5 * sin(this.frequency * t));
    const spiralAngle = t * 3;

    const x = centerX + r * cos(spiralAngle);
    const y = centerY + r * sin(spiralAngle);

    this.points.push({ x, y });

    if (this.points.length > this.maxPoints) {
      this.points.shift();
    }
  }

  display() {
    const len = this.points.length;

    for (let i = 1; i < len; i++) {
      const ratio = i / len;
      const alpha = map(ratio, 0, 1, 0, 60);
      const weight = map(ratio, 0, 1, 0.2, 1.0);

      stroke(this.hue, this.sat, this.bri, alpha);
      strokeWeight(weight);

      line(
        this.points[i - 1].x,
        this.points[i - 1].y,
        this.points[i].x,
        this.points[i].y
      );
    }
  }
}

let curves = [];
let globalRotation = 0;
let scaleOsc = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(20, 15, 95);

  const numCurves = 7;

  for (let i = 0; i < numCurves; i++) {
    const angle = (TWO_PI * i) / numCurves;

    curves.push(
      new RotatingCurve(
        angle,
        random(150, 160), // 원점으로부터의 거리
        random(30, 40), // 곡선 크기
        random(0, 20), // 주황-빨강 색상
        random(70, 90),
        random(85, 95),
        random(0.03, 0.04), // 회전 속도
        random(7, 9) // 진동 주파수
      )
    );
  }
}

function draw() {
  background(20, 15, 95, 50);

  translate(width / 2, height / 2);

  globalRotation += 0.0005;
  rotate(globalRotation);

  scaleOsc += 0.01;
  const s = 1.5 + 0.1 * sin(scaleOsc);
  scale(s);

  for (let curve of curves) {
    curve.update();
    curve.display();
  }
}
