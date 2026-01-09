// w09_example_02.js

let particles = [];
let lastFrameTime = 0;

function setup() {
  createCanvas(1920, 1080);
  colorMode(HSB, 360, 100, 100, 100);
  lastFrameTime = millis();
}

function draw() {
  const currentTime = millis();
  const dt = (currentTime - lastFrameTime) / 1000;
  lastFrameTime = currentTime;

  background(210, 80, 20);

  if (mouseIsPressed) {
    for (let i = 0; i < 3; i++) {
      const vel = createVector(random(-2, 2), random(-2, 2));
      const radius = random(2.5, 5);
      const life = random(1, 2.5);
      const hue = random(30, 120);

      particles.push({
        pos: createVector(mouseX, mouseY),
        vel: vel,
        radius: radius,
        life: life,
        maxLife: life,
        hue: hue,
      });
    }
  }

  for (let p of particles) {
    p.vel.y += 0.05;
    p.pos.add(p.vel);
    p.life -= dt;
  }

  particles = particles.filter((p) => p.life > 0);

  for (let p of particles) {
    const alpha = map(p.life, 0, p.maxLife, 0, 90);
    fill(p.hue, 85, 95, alpha);
    noStroke();
    ellipse(p.pos.x, p.pos.y, p.radius * 2);
  }
}
