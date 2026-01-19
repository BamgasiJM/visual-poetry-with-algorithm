// w02_example_08.js

let circles = [];
let numAttempts = 10000;

let canvas_width = 800;
let canvas_height = 800;
let padding = 50;

function setup() {
  createCanvas(canvas_width, canvas_height);

  background(0);
  stroke(255);

  noFill();
  rect(
    padding,
    padding,
    canvas_width - padding * 2,
    canvas_height - padding * 2,
    10
  );

  for (let n = 0; n < numAttempts; n++) {
    let randX = random(padding, canvas_width - padding);
    let randY = random(padding, canvas_height - padding);
    let randR = random(5, 120);

    let placeable = true;
    for (let circle of circles) {
      let d = dist(randX, randY, circle.x, circle.y);

      if (d < randR + circle.r + 5) {
        placeable = false;
      }
    }

    if (
      randX + randR > canvas_width - padding - 15 ||
      randX - randR < padding + 15 ||
      randY + randR > canvas_height - padding - 15 ||
      randY - randR < padding + 15
    ) {
      placeable = false;
    }

    if (placeable) {
      circles.push({
        x: randX,
        y: randY,
        r: randR,
      });
    }
  }

  strokeWeight(2);
  for (let circle of circles) {
    push();
    strokeWeight(4);
    point(circle.x, circle.y);
    pop();

    ellipse(circle.x, circle.y, circle.r * 2);

    for (let otherCircle of circles) {
      let d = dist(circle.x, circle.y, otherCircle.x, otherCircle.y);
      if (d < 50) {
        line(circle.x, circle.y, otherCircle.x, otherCircle.y);
      }
    }
  }

  noLoop();
}

// by Ahmad Moussa || Gorilla Sun 
// https://openprocessing.org/sketch/2319478