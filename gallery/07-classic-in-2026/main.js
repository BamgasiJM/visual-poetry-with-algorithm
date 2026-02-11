import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

// Camera setup
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
camera.position.set(0, 0, 15);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById("webgl-container").appendChild(renderer.domElement);

// Lighting setup
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight1.position.set(5, 5, 5);
scene.add(directionalLight1);

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight2.position.set(-5, -5, -5);
scene.add(directionalLight2);

// OrbitControls setup
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.01;
controls.enableZoom = true;
controls.enablePan = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// Materials
const blackMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  side: THREE.DoubleSide,
});

const wireframeMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  wireframe: true,
  transparent: true,
  opacity: 0.6,
});

// Create geometric composition
const group = new THREE.Group();

// Center rotating torus
const torusGeometry = new THREE.TorusGeometry(2, 0.4, 8, 32);
const torus = new THREE.Mesh(torusGeometry, wireframeMaterial);
group.add(torus);

// Load GLB model in center
let mainModel;
const mainModelLoader = new GLTFLoader();
mainModelLoader.load("./assets/marshmallko.glb", function (gltf) {
  mainModel = gltf.scene;
  mainModel.scale.set(1, 1, 1);
  mainModel.position.set(0, 0, 0);
  group.add(mainModel);
  console.log("glb file loaded.");
});

// Various circles - different sizes, some filled, some outlined
const circleConfigs = [
  // Filled circles
  { radius: 0.3, x: 4.5, y: 2.5, z: 0, filled: true },
  { radius: 0.6, x: -4, y: -2, z: 1, filled: true },
  { radius: 0.4, x: 2.5, y: -3.5, z: -2, filled: true },
  { radius: 0.5, x: -3, y: 1.5, z: -1.5, filled: true },
  { radius: 1.1, x: 5, y: -1, z: 2, filled: true },
  { radius: 0.4, x: -5.5, y: 2, z: -1, filled: true },

  // Outlined circles
  { radius: 1.0, x: -2, y: 3.5, z: 1.5, filled: false },
  { radius: 1.3, x: 3, y: 1, z: -2.5, filled: false },
  { radius: 0.7, x: -4.5, y: -3, z: 0.5, filled: false },
  { radius: 1.1, x: 1.5, y: 4, z: 1, filled: false },
  { radius: 0.8, x: 5.5, y: 0.5, z: -0.5, filled: false },
  { radius: 0.5, x: 0, y: -4.5, z: 2.5, filled: false },
  { radius: 1.4, x: -1.5, y: -1, z: 3, filled: false },
  { radius: 0.6, x: 4, y: -3, z: -1, filled: false },
];

circleConfigs.forEach((config, i) => {
  const circleGeometry = new THREE.CircleGeometry(config.radius, 64);
  const material = config.filled ? blackMaterial : wireframeMaterial;
  const circle = new THREE.Mesh(circleGeometry, material);
  circle.position.set(config.x, config.y, config.z);
  circle.rotation.y = (i * Math.PI) / 8;
  group.add(circle);
});

// Geometric lines
const lineGroup = new THREE.Group();

for (let i = 0; i < 15; i++) {
  const points = [];
  const angle = (i / 25) * Math.PI * 2;
  const radius = 8 + Math.sin(i) * 1.5;

  points.push(
    new THREE.Vector3(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      Math.sin(i * 0.5) * 2,
    ),
  );

  points.push(
    new THREE.Vector3(
      Math.cos(angle + Math.PI) * (radius * 0.3),
      Math.sin(angle + Math.PI) * (radius * 0.3),
      -Math.sin(i * 0.5) * 2,
    ),
  );

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.25,
  });
  const line = new THREE.Line(lineGeometry, lineMaterial);
  lineGroup.add(line);
}

group.add(lineGroup);

// Floating rectangles
const rectangleGeometry = new THREE.PlaneGeometry(1.5, 2.5);
const rectanglePositions = [
  { x: -2, y: 3, z: 2, rx: 0.3, ry: 0.5 },
  { x: 3.5, y: -1, z: -2, rx: -0.4, ry: 0.3 },
  { x: -3, y: -1.5, z: 3, rx: 0.2, ry: -0.6 },
];

rectanglePositions.forEach((pos) => {
  const rectangle = new THREE.Mesh(rectangleGeometry, wireframeMaterial);
  rectangle.position.set(pos.x, pos.y, pos.z);
  rectangle.rotation.set(pos.rx, pos.ry, 0);
  group.add(rectangle);
});

scene.add(group);

// Animation
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  time += 0.01;

  // Rotate main group slowly
  group.rotation.y = time * 0.1;

  // Animate torus
  torus.rotation.x = time * 0.3;
  torus.rotation.z = time * 0.2;

  // Animate model if loaded
  if (mainModel) {
    mainModel.rotation.y = time * 0.2;
  }

  // Animate line group
  lineGroup.rotation.z = -time * 0.15;

  // Update controls
  controls.update();

  renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
