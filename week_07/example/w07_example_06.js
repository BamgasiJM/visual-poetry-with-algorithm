// w07_example_06.js

class Spirograph {
  constructor(R, r, d, hueOffset, saturation, brightness, speed, offset) {
    this.R = R;
    this.r = r;
    this.d = d;
    this.hueOffset = hueOffset; // 고유 색상 오프셋
    this.saturation = saturation;
    this.brightness = brightness;
    this.speed = speed;
    this.theta = offset;
    this.points = [];
    this.maxPoints = 3000;
  }

  update() {
    this.theta += this.speed;

    const k = (this.R - this.r) / this.r;
    const x =
      (this.R - this.r) * cos(this.theta) + this.d * cos(k * this.theta);
    const y =
      (this.R - this.r) * sin(this.theta) - this.d * sin(k * this.theta);

    this.points.push({ x, y });
    if (this.points.length > this.maxPoints) this.points.shift();
  }

  display() {
    const len = this.points.length;
    // 시간과 고유 오프셋으로 색상 변화
    const currentHue = (this.hueOffset + frameCount * 0.2) % 360;

    noFill();
    beginShape();
    for (let i = 0; i < len; i++) {
      const ratio = i / len;
      const alpha = map(ratio, 0, 1, 0, 80);
      const weight = map(ratio, 0, 1, 0.3, 0.8);

      stroke(currentHue, this.saturation, this.brightness, alpha);
      strokeWeight(weight);

      vertex(this.points[i].x, this.points[i].y);
    }
    endShape();
  }
}

let spiros = [];
let rotation = 0;
let scaleOsc = 0;

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 100);
  background(0); // 검정색 배경

  const numSpiros = 7;
  for (let i = 0; i < numSpiros; i++) {
    const angle = (TWO_PI * i) / numSpiros;
    spiros.push(
      new Spirograph(
        random(120, 200),
        random(30, 70),
        random(40, 100),
        random(0, 360), // 고유 색상 오프셋
        random(70, 90), // 채도
        random(85, 95), // 밝기
        random(0.01, 0.025),
        angle
      )
    );
  }
}

function draw() {
  background(0, 0, 0, 3); // 검정색 + 잔상 효과

  translate(width / 2, height / 2);
  rotation += 0.002;
  rotate(rotation);

  scaleOsc += 0.04;
  const s = 0.9 + 0.15 * sin(scaleOsc);
  scale(s);

  for (let spiro of spiros) {
    spiro.update();
    spiro.display();
  }
}
