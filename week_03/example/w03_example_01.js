// w03_example_01.js

    function setup() {
      createCanvas(800, 600);
      noLoop();
    }

    function draw() {
      background(45);
      noStroke();

      const circleSize = 60;
      const startY = 100;
      const rowSpacing = 200;

      // 첫 번째 줄 - RGBA 모드
      fill(255, 87, 51, 255);
      circle(80, startY, circleSize);

      fill(138, 43, 226, 255);
      circle(160, startY, circleSize);

      fill(30, 144, 255, 255);
      circle(240, startY, circleSize);

      fill(50, 205, 50, 255);
      circle(320, startY, circleSize);

      fill(255, 215, 0, 255);
      circle(400, startY, circleSize);

      fill(255, 140, 0, 255);
      circle(480, startY, circleSize);

      fill(220, 20, 60, 255);
      circle(560, startY, circleSize);

      fill(147, 112, 219, 255);
      circle(640, startY, circleSize);

      fill(64, 224, 208, 255);
      circle(720, startY, circleSize);

      fill(255, 182, 193, 255);
      circle(800 - 80, startY, circleSize);

      // 두 번째 줄 - HEX 코드
      fill("#FF6B6B");
      circle(80, startY + rowSpacing, circleSize);

      fill("#4ECDC4");
      circle(160, startY + rowSpacing, circleSize);

      fill("#45B7D1");
      circle(240, startY + rowSpacing, circleSize);

      fill("#96CEB4");
      circle(320, startY + rowSpacing, circleSize);

      fill("#FFEAA7");
      circle(400, startY + rowSpacing, circleSize);

      fill("#DFE6E9");
      circle(480, startY + rowSpacing, circleSize);

      fill("#A29BFE");
      circle(560, startY + rowSpacing, circleSize);

      fill("#FD79A8");
      circle(640, startY + rowSpacing, circleSize);

      fill("#FDCB6E");
      circle(720, startY + rowSpacing, circleSize);

      fill("#6C5CE7");
      circle(800 - 80, startY + rowSpacing, circleSize);

      // 세 번째 줄 - HSLA 모드
      colorMode(HSB, 360, 100, 100, 1);

      fill(0, 85, 95, 1);
      circle(80, startY + rowSpacing * 2, circleSize);

      fill(30, 90, 100, 1);
      circle(160, startY + rowSpacing * 2, circleSize);

      fill(60, 75, 98, 1);
      circle(240, startY + rowSpacing * 2, circleSize);

      fill(120, 60, 85, 1);
      circle(320, startY + rowSpacing * 2, circleSize);

      fill(180, 70, 90, 1);
      circle(400, startY + rowSpacing * 2, circleSize);

      fill(210, 80, 95, 1);
      circle(480, startY + rowSpacing * 2, circleSize);

      fill(270, 65, 88, 1);
      circle(560, startY + rowSpacing * 2, circleSize);

      fill(300, 55, 92, 1);
      circle(640, startY + rowSpacing * 2, circleSize);

      fill(330, 70, 96, 1);
      circle(720, startY + rowSpacing * 2, circleSize);

      fill(150, 50, 80, 1);
      circle(800 - 80, startY + rowSpacing * 2, circleSize);

      // 레이블 추가
      colorMode(RGB, 255);
      fill(220);
      textSize(24);
      textAlign(CENTER);
      text("RGBA Mode", 400, 50);
      text("HEX Code", 400, 250);
      text("HSLA Mode", 400, 450);
    }