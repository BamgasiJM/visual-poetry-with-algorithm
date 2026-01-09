// w09_example_01.js

let particles = [];
    let lastFrameTime = 0;

    function setup() {
      createCanvas(1080, 1080);
      lastFrameTime = millis();
    }

    function mousePressed() {
      for (let i = 0; i < 30; i++) {
        const vel = createVector(random(-3, 3), random(-3, 3));
        const radius = random(2, 5);
        const life = random(1, 3);
        
        particles.push({
          pos: createVector(mouseX, mouseY),
          vel: vel,
          radius: radius,
          life: life
        });
      }
    }

    function draw() {
      const currentTime = millis();
      const dt = (currentTime - lastFrameTime) / 1000;
      lastFrameTime = currentTime;

      background(0);

      for (let p of particles) {
        p.pos.add(p.vel);
        p.life -= dt;
      }

      particles = particles.filter(p => p.life > 0);

      for (let p of particles) {
        const alpha = map(p.life / 2, 0, 1.5, 0, 255);
        fill(255, 255, 255, alpha);
        noStroke();
        ellipse(p.pos.x, p.pos.y, p.radius * 2);
      }
    }