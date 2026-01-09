// w09_example_03.js

let particles = [];
let lastFrameTime = 0;

function setup() {
  createCanvas(1080, 540);
  colorMode(HSB, 360, 100, 100, 100);
  lastFrameTime = millis();
}

function mousePressed() {
  const leftCorner = createVector(0, height);
  const rightCorner = createVector(width, height);

  for (let i = 0; i < 50; i++) {
    const angle = random(-PI * 0.7, -PI * 0.3);
    const speed = random(8, 15);
    const vel = createVector(cos(angle) * speed, sin(angle) * speed);

    particles.push({
      pos: leftCorner.copy(),
      vel: vel,
      width: random(8, 15),
      height: random(8, 15),
      life: random(2, 4),
      maxLife: random(2, 4),
      hue: random(30, 150),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.2, 0.2),
      shape: floor(random(3)),
    });
  }

  for (let i = 0; i < 100; i++) {
    const angle = random(-PI * 0.7, -PI * 0.3);
    const speed = random(8, 15);
    const vel = createVector(cos(angle) * speed, sin(angle) * speed);
    vel.x *= -1;

    particles.push({
      pos: rightCorner.copy(),
      vel: vel,
      width: random(8, 15),
      height: random(8, 15),
      life: random(2, 4),
      maxLife: random(2, 4),
      hue: random(180, 360),
      rotation: random(TWO_PI),
      rotationSpeed: random(-0.2, 0.2),
      shape: floor(random(3)),
    });
  }
}

function draw() {
  const currentTime = millis();
  const dt = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;

  background(180, 60, 20);

  for (let p of particles) {
    p.vel.y += 0.3;
    p.pos.add(p.vel);
    p.rotation += p.rotationSpeed;
    p.life -= dt;
  }

  particles = particles.filter((p) => p.life > 0);

  for (let p of particles) {
    const alpha = map(p.life, 0, p.maxLife, 0, 90);
    fill(p.hue, 85, 95, alpha);
    noStroke();

    push();
    translate(p.pos.x, p.pos.y);
    rotate(p.rotation);

    if (p.shape === 0) {
      rect(-p.width / 2, -p.height / 2, p.width, p.height);
    } else if (p.shape === 1) {
      triangle(
        0,
        -p.height / 2,
        -p.width / 2,
        p.height / 2,
        p.width / 2,
        p.height / 2
      );
    } else {
      ellipse(0, 0, p.width, p.height);
    }

    pop();
  }
}
