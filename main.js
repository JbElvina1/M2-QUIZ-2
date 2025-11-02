const scene = new THREE.Scene();
scene.background = new THREE.Color(0xdedede);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.set(0, 2, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
mainLight.position.set(5, 5, 5);
mainLight.castShadow = true;
scene.add(mainLight);

const deskLampLight = new THREE.PointLight(0xfff2cc, 1, 10);
deskLampLight.position.set(0, 2, 2);
deskLampLight.castShadow = true;
scene.add(deskLampLight);

const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xf7f7f7 });
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x99ccff,
  transmission: 0.8,
  opacity: 0.8,
  transparent: true,
  roughness: 0.1,
});
const floorMaterial = new THREE.MeshStandardMaterial({
  color: 0xd9c7a3,
  roughness: 0.4,
});
const deskWoodMaterial = new THREE.MeshStandardMaterial({
  color: 0x5a3825,
  roughness: 0.6,
});
const chairMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  roughness: 0.4,
  metalness: 0.2,
});
const screenMaterial = new THREE.MeshPhongMaterial({
  color: 0x00eaff,
  emissive: 0x00eaff,
  emissiveIntensity: 1.4,
});

const floor = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);

const backWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
backWall.position.z = -5;
backWall.position.y = 2.5;
scene.add(backWall);

const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
leftWall.rotation.y = Math.PI / 2;
leftWall.position.x = -5;
leftWall.position.y = 2.5;
scene.add(leftWall);

const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(10, 5), wallMaterial);
rightWall.rotation.y = -Math.PI / 2;
rightWall.position.x = 5;
rightWall.position.y = 2.5;
scene.add(rightWall);

const roof = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), wallMaterial);
roof.rotation.x = Math.PI / 2;
roof.position.y = 5;
scene.add(roof);



const leftWindow1 = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), glassMaterial);
leftWindow1.rotation.y = Math.PI / 2;
leftWindow1.position.set(-4.99, 3, -1); // original left window
scene.add(leftWindow1);

const leftWindow2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), glassMaterial);
leftWindow2.rotation.y = Math.PI / 2;
leftWindow2.position.set(-4.99, 3, 2); // new one further along the wall
scene.add(leftWindow2);


const rightWindow1 = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), glassMaterial);
rightWindow1.rotation.y = -Math.PI / 2;
rightWindow1.position.set(4.99, 3, -1); // original right window
scene.add(rightWindow1);

const rightWindow2 = new THREE.Mesh(new THREE.PlaneGeometry(2, 1.5), glassMaterial);
rightWindow2.rotation.y = -Math.PI / 2;
rightWindow2.position.set(4.99, 3, 2); // new one further along the wall
scene.add(rightWindow2);



const deskTop = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.2, 1.2), deskWoodMaterial);
deskTop.position.set(0, 1, 0);
deskTop.castShadow = true;
scene.add(deskTop);


for (let i = -1; i <= 1; i += 2) {
  for (let j = -1; j <= 1; j += 2) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.05, 1),
      deskWoodMaterial
    );
    leg.position.set(i * 1.1, 0.5, j * 0.45);
    leg.castShadow = true;
    scene.add(leg);
  }
}


const screen = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1, 0.05), screenMaterial);
screen.position.set(0, 1.7, -0.45);
screen.castShadow = true;
scene.add(screen);

const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5), deskWoodMaterial);
stand.position.set(0, 1.3, -0.45);
scene.add(stand);


const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1, 0.15, 1), chairMaterial);
chairSeat.position.set(0, 0.8, 1.2);
chairSeat.castShadow = true;
scene.add(chairSeat);

const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 0.12), chairMaterial);
chairBack.position.set(0, 1.35, 0.7);
chairBack.castShadow = true;
scene.add(chairBack);


for (let x = -0.4; x <= 0.4; x += 0.8) {
  for (let z = -0.4; z <= 0.4; z += 0.8) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.04, 0.8),
      chairMaterial
    );
    leg.position.set(x, 0.4, 1.2 + z);
    leg.castShadow = true;
    scene.add(leg);
  }
}


const bulbMaterial = new THREE.MeshStandardMaterial({
  color: 0xfff8dc,
  emissive: 0xffe699,
  emissiveIntensity: 1.5,
});
const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.15, 32, 32), bulbMaterial);
bulb.position.set(0, 4.8, 0);
scene.add(bulb);

const bulbLight = new THREE.PointLight(0xfff2cc, 1.3, 12, 2);
bulbLight.position.copy(bulb.position);
bulbLight.castShadow = true;
scene.add(bulbLight);



function animate() {
  requestAnimationFrame(animate);
  screen.rotation.y = Math.sin(Date.now() * 0.001) * 0.05;
  renderer.render(scene, camera);
}
animate();


window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
