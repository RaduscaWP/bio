import * as THREE from "three";

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(
    36,
    window.innerWidth / window.innerHeight,
    0.1,
    80,
  );

  camera.position.set(0.3, 0.15, 5.2);

  const cameraTarget = new THREE.Vector3(0.35, 0, 0);
  camera.lookAt(cameraTarget);

  return {
    camera,
    cameraTarget,
  };
}

export function resizeCamera(camera) {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
