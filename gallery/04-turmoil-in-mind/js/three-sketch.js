import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';

/* ==========================
   container
========================== */
const container = document.getElementById('three-container');

/* ==========================
   기본 설정
========================== */
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(
  50,
  container.clientWidth / container.clientHeight,
  0.1,
  100
);
camera.position.set(0, 5, 0);
camera.lookAt(0, 0, 0);
camera.up.set(0, 0, -1);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

/* ==========================
   와이어프레임 스피어
========================== */
const geometry = new THREE.IcosahedronGeometry(2.5, 6);

const material = new THREE.MeshBasicMaterial({
  color: 0x00009d,
  wireframe: true,
  transparent: true,
  opacity: 1.0
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

/* 원본 버텍스 저장 */
const positionAttribute = geometry.getAttribute('position');
const basePositions = new Float32Array(positionAttribute.array);
const vertexCount = positionAttribute.count;

/* ==========================
   인터랙션 상태
========================== */
let isPressed = false;
let noiseStrength = 0;
let targetNoise = 0;
let scale = 1;
let targetScale = 1;

const MAX_NOISE = 0.4;
const MIN_SCALE = 0.15;
const EASE_IN = 0.02;
const EASE_OUT = 0.02;

/* ==========================
   키보드 입력
========================== */
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    isPressed = true;
    targetNoise = MAX_NOISE;
    targetScale = MIN_SCALE;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    isPressed = false;
    targetNoise = 0;
    targetScale = 1;
  }
});

/* ==========================
   노이즈 함수
========================== */
function noise3D(x, y, z, t) {
  return (
    Math.sin(x * 10 + t * 4) *
    Math.cos(y * 10 + t * 3) *
    Math.sin(z * 10 + t * 5)
  );
}

/* ==========================
   애니메이션
========================== */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  const time = clock.getElapsedTime();
  const ease = isPressed ? EASE_IN : EASE_OUT;

  noiseStrength += (targetNoise - noiseStrength) * ease;
  scale += (targetScale - scale) * ease;

  sphere.scale.setScalar(scale);

  const positions = positionAttribute.array;

  for (let i = 0; i < vertexCount; i++) {
    const i3 = i * 3;

    const bx = basePositions[i3];
    const by = basePositions[i3 + 1];
    const bz = basePositions[i3 + 2];

    const len = Math.sqrt(bx * bx + by * by + bz * bz);
    const nx = bx / len;
    const ny = by / len;
    const nz = bz / len;

    const d = noise3D(bx, by, bz, time) * noiseStrength;

    positions[i3]     = bx + nx * d;
    positions[i3 + 1] = by + ny * d;
    positions[i3 + 2] = bz + nz * d;
  }

  positionAttribute.needsUpdate = true;

//   sphere.rotation.x += 0.003;
  sphere.rotation.y -= 0.001;
//   sphere.rotation.z += 0.0015;

  renderer.render(scene, camera);
}

animate();

/* ==========================
   리사이즈
========================== */
window.addEventListener('resize', () => {
  const w = container.clientWidth;
  const h = container.clientHeight;

  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
