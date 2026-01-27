const STAR_COUNT = 4500;

let stars = [];
let spacePressed = false;
let cnv;

class Star {
  constructor(initialAngle) {
    this.baseR = Math.random() * 670 + 130;
    this.r = this.baseR;

    this.baseOmega = Math.random() * 0.003 + 0.002;
    this.omega = this.baseOmega;

    this.cosAngle = Math.cos(initialAngle);
    this.sinAngle = Math.sin(initialAngle);

    this.size = Math.random() * 4 + 2;

    this.angularMomentum = this.r * this.r * this.omega;
    this.minR = 10;

    this.progress = 0.0;
    this.animSpeed = Math.random() * 0.003 + 0.002;

    // 색상 속성 (HSB)
    this.hue = Math.random() * 120 + 180;
    this.sat = 100;
    this.bri = 100;
  }

  easeInOut(t) {
    return t * t * (3.0 - 2.0 * t);
  }

  update() {
    if (spacePressed) {
      this.progress = Math.min(this.progress + this.animSpeed, 1.0);
    } else {
      this.progress = Math.max(this.progress - this.animSpeed, 0.0);
    }

    const eased = this.easeInOut(this.progress);

    this.r = this.baseR - (this.baseR - this.minR) * eased;
    this.omega = this.angularMomentum / (this.r * this.r);

    const cosO = Math.cos(this.omega);
    const sinO = Math.sin(this.omega);

    const newCos = this.cosAngle * cosO - this.sinAngle * sinO;
    const newSin = this.sinAngle * cosO + this.cosAngle * sinO;

    this.cosAngle = newCos;
    this.sinAngle = newSin;
  }

  draw() {
    const x = this.cosAngle * this.r;
    const y = this.sinAngle * this.r;

    const eased = this.easeInOut(this.progress);
    const currentSat = this.sat * (1.0 - eased);
    const currentBri = this.bri * (1.0 - eased);

    noStroke();
    fill(this.hue, currentSat, currentBri);
    ellipse(x, y, this.size, this.size);
  }
}

function setup() {
  const container = document.getElementById('p5-container');

  cnv = createCanvas(container.clientWidth, container.clientHeight);
  cnv.parent(container);

  colorMode(HSB, 360, 100, 100, 1);

  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push(new Star(Math.random() * TWO_PI));
  }
}

function draw() {
  clear();                     // three.js 레이어 합성 가능
  background(230, 10, 85, 0.90);   // 반투명 잔상 유지

  translate(width / 2, height / 2);

  noStroke();
  fill(0);
  ellipse(0, 0, 35, 35);

  for (let star of stars) {
    star.update();
    star.draw();
  }
}

function windowResized() {
  const container = document.getElementById('p5-container');
  resizeCanvas(container.clientWidth, container.clientHeight);
}

function keyPressed() {
  if (key === ' ') spacePressed = true;
}

function keyReleased() {
  if (key === ' ') spacePressed = false;
}
