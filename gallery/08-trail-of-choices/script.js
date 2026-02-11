// === 주요 설정 변수 ===
const SPEED = 1.5; // 이동 속도
const BRANCH_COUNT_MIN = 5; // 최소 분기 수
const BRANCH_COUNT_MAX = 60; // 최대 분기 수
const BRANCH_SPREAD = 0.01; // 분기 각도 범위
const BRANCH_LENGTH_MIN = 40; // 분기 최소 길이
const BRANCH_LENGTH_MAX = 150; // 분기 최대 길이
const BRANCH_CURVE_STRENGTH = 0.08; // 곡선 강도
const BRANCH_GROWTH_SPEED_MIN = 1; // 분기 성장 최소 속도
const BRANCH_GROWTH_SPEED_MAX = 4; // 분기 성장 최대 속도
const BRANCH_FADE_DISTANCE = 500; // 분기가 페이드 시작하는 거리
const BRANCH_FADE_SPEED_MIN = 2; // 분기 최소 페이드 속도
const BRANCH_FADE_SPEED_MAX = 5; // 분기 최대 페이드 속도
const BRANCH_FADE_DELAY_MIN = 5; // 페이드 시작 최소 지연 (프레임)
const BRANCH_FADE_DELAY_MAX = 10; // 페이드 시작 최대 지연 (프레임)
const FOLLOW_SMOOTHNESS = 0.5; // 경로 추적 부드러움 (높을수록 급격)
const SELECTION_THRESHOLD = 18; // 경로 선택 거리 임계값

let pos;
let vel;
let noiseOffset = 0;

let pastTrail = [];
let activeBranches = [];
let selectedBranch = null; // 선택된 분기 추적
let isFollowingPath = false; // 경로 추적 중인지 여부

function setup() {
  createCanvas(windowWidth, windowHeight);
  pos = createVector(width / 2, height / 2);
  vel = p5.Vector.fromAngle(0).mult(SPEED);

  spawnNewBranches();
}

function draw() {
  background(0);

  // === 이동 ===
  pos.add(vel);

  // === 지나온 길 ===
  pastTrail.push(pos.copy());

  // === 분기 업데이트 ===
  for (let branch of activeBranches) {
    branch.update(pos);
  }

  // === 선택 로직 ===
  if (!selectedBranch || selectedBranch.points.length === 0) {
    // 가장 가까운 분기 찾기
    let closestBranch = null;
    let minDist = Infinity;

    for (let branch of activeBranches) {
      if (branch.points.length > 0) {
        let d = p5.Vector.dist(pos, branch.points[0]);
        if (d < minDist) {
          minDist = d;
          closestBranch = branch;
        }
      }
    }

    // 분기 선택
    if (closestBranch && minDist < SELECTION_THRESHOLD) {
      selectedBranch = closestBranch;
      isFollowingPath = true;

      // 선택되지 않은 분기들은 페이드 아웃 시작
      for (let branch of activeBranches) {
        if (branch !== selectedBranch) {
          branch.startFading();
        }
      }
    }
  }

  // === 경로 따라가기 ===
  if (selectedBranch && selectedBranch.points.length > 0) {
    let target = selectedBranch.points[0];
    let distToTarget = p5.Vector.dist(pos, target);

    // 타겟에 가까워지면 포인트 제거
    if (distToTarget < 3) {
      selectedBranch.points.shift();

      // 선택된 분기가 끝나면 새로운 분기 생성
      if (selectedBranch.points.length === 0) {
        activeBranches = activeBranches.filter((b) => b.opacity > 0);
        selectedBranch = null;
        isFollowingPath = false;
        spawnNewBranches();
      }
    } else {
      // 부드럽게 방향 전환 (속도 유지)
      let desired = p5.Vector.sub(target, pos);
      desired.setMag(SPEED);
      vel.lerp(desired, FOLLOW_SMOOTHNESS);
    }
  }

  // 페이드 아웃된 분기 제거
  activeBranches = activeBranches.filter((b) => b.opacity > 0);

  // === 카메라 ===
  translate(width / 2 - pos.x, height / 2 - pos.y);

  // === 뒤쪽 트레일 ===
  noFill();
  stroke(255, 120);
  strokeWeight(1);
  beginShape();
  for (let p of pastTrail) {
    vertex(p.x, p.y);
  }
  endShape();

  // 화면 밖 트레일 제거
  pastTrail = pastTrail.filter(
    (p) =>
      p.x > pos.x - width * 2 &&
      p.x < pos.x + width * 2 &&
      p.y > pos.y - height * 2 &&
      p.y < pos.y + height * 2,
  );

  // === 분기 렌더링 ===
  for (let branch of activeBranches) {
    branch.show();
  }

  // === 중앙 점 ===
  noStroke();
  fill(255);
  ellipse(pos.x, pos.y, 10);
}

function spawnNewBranches() {
  let branchCount = floor(random(BRANCH_COUNT_MIN, BRANCH_COUNT_MAX + 1));
  let baseAngle = vel.heading();

  for (let i = 0; i < branchCount; i++) {
    let spreadAngle = map(i, 0, branchCount - 1, -BRANCH_SPREAD, BRANCH_SPREAD);
    activeBranches.push(new Branch(pos.copy(), baseAngle + spreadAngle));
  }
}

class Branch {
  constructor(startPos, angle) {
    this.points = [];
    this.opacity = 255;
    this.growing = true;
    this.growthIndex = 0;
    this.maxPoints = floor(random(BRANCH_LENGTH_MIN, BRANCH_LENGTH_MAX));
    this.isFading = false;
    this.fadeDelay = 0; // 페이드 지연 카운터
    this.fadeSpeed = random(BRANCH_FADE_SPEED_MIN, BRANCH_FADE_SPEED_MAX); // 각 분기마다 랜덤 페이드 속도

    // 전체 경로를 미리 계산
    this.fullPath = [];
    let dir = p5.Vector.fromAngle(angle);
    let current = startPos.copy();
    let localNoise = random(1000);

    for (let i = 0; i < this.maxPoints; i++) {
      let noiseVal = noise(localNoise) * 2 - 1;
      dir.rotate(noiseVal * BRANCH_CURVE_STRENGTH);
      localNoise += 0.05;

      current = current.copy().add(dir.copy().mult(3));
      this.fullPath.push(current);
    }
  }

  update(currentPos) {
    // 점진적으로 경로를 드러냄
    if (this.growing && this.growthIndex < this.fullPath.length) {
      let growthSpeed = floor(
        random(BRANCH_GROWTH_SPEED_MIN, BRANCH_GROWTH_SPEED_MAX),
      );
      for (
        let i = 0;
        i < growthSpeed && this.growthIndex < this.fullPath.length;
        i++
      ) {
        this.points.push(this.fullPath[this.growthIndex]);
        this.growthIndex++;
      }
    }

    // 페이드 아웃 처리
    if (this.isFading) {
      if (this.fadeDelay > 0) {
        // 지연 시간이 남아있으면 감소
        this.fadeDelay--;
      } else {
        // 지연 시간이 끝나면 페이드 시작
        this.opacity = max(0, this.opacity - this.fadeSpeed);
      }
    } else {
      // 거리 기반 페이드
      if (this.points.length > 0) {
        let distToFirst = p5.Vector.dist(currentPos, this.points[0]);
        if (distToFirst > BRANCH_FADE_DISTANCE) {
          this.isFading = true;
        }
      }
    }
  }

  startFading() {
    this.isFading = true;
    // 랜덤한 지연 시간 설정
    this.fadeDelay = floor(
      random(BRANCH_FADE_DELAY_MIN, BRANCH_FADE_DELAY_MAX),
    );
  }

  show() {
    if (this.points.length < 2) return;

    noFill();
    stroke(255, this.opacity * 0.6);
    strokeWeight(1.5);

    beginShape();
    curveVertex(this.points[0].x, this.points[0].y);
    for (let p of this.points) {
      curveVertex(p.x, p.y);
    }
    if (this.points.length > 0) {
      let last = this.points[this.points.length - 1];
      curveVertex(last.x, last.y);
    }
    endShape();

    // 끝점에 작은 원
    if (this.growing && this.points.length > 0 && !this.isFading) {
      let end = this.points[this.points.length - 1];
      noStroke();
      fill(255, this.opacity * 0.4);
      ellipse(end.x, end.y, 4);
    }
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
