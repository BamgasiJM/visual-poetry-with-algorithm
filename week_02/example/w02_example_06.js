let smoothPoints = [];

function setup() {
  createCanvas(1080, 1080);

  const numPoints = 30;
  const points = [];

  // Perlin noise로 불규칙한 원형 점들 생성
  for (let i = 0; i < numPoints; i++) {
    const theta = (i * TWO_PI) / numPoints;
    const noiseVal = noise(i * 4.0, 0);
    const r = 200 + noiseVal * 450;
    points.push(createVector(cos(theta) * r, sin(theta) * r));
  }

  // Catmull-Rom 스플라인으로 부드럽게 보간
  smoothPoints = catmullRomSpline(points, 10);

  noLoop();
}

function catmullRomSpline(points, segments) {
  const smoothed = [];
  const n = points.length;

  for (let i = 0; i < n; i++) {
    // 순환형 인덱싱 (닫힌 도형)
    const p0 = points[(i + n - 1) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    for (let j = 0; j < segments; j++) {
      const t = j / segments;
      const t2 = t * t;
      const t3 = t2 * t;

      const x =
        0.5 *
        (2 * p1.x +
          (-p0.x + p2.x) * t +
          (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
          (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3);

      const y =
        0.5 *
        (2 * p1.y +
          (-p0.y + p2.y) * t +
          (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
          (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3);

      smoothed.push(createVector(x, y));
    }
  }

  return smoothed;
}

function draw() {
  background(0);

  translate(width / 2, height / 2);

  // 닫힌 곡선 그리기
  fill(50, 210, 200);

  beginShape();
  for (let p of smoothPoints) {
    vertex(p.x, p.y);
  }
  // 시작점과 끝점을 같게 하여 깔끔한 연결
  if (smoothPoints.length > 0) {
    vertex(smoothPoints[0].x, smoothPoints[0].y);
  }
  endShape();
}
