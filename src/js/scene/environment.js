import * as THREE from "three";

function createGlowPlane({ color, opacity, width, height, position }) {
  const material = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), material);
  plane.position.copy(position);
  return plane;
}

export function createEnvironment(scene) {
  scene.background = null;
  scene.fog = new THREE.FogExp2(0x05070d, 0.058);

  const group = new THREE.Group();
  group.name = "NightEnvironment";

  const moonMaterial = new THREE.MeshBasicMaterial({
    color: 0xe1ebff,
    transparent: true,
    opacity: 0.1,
    depthWrite: false,
  });
  const moon = new THREE.Mesh(new THREE.CircleGeometry(1.18, 48), moonMaterial);
  moon.name = "SoftMoonDisc";
  moon.position.set(-2.9, 2.05, -5.8);

  const leftGlow = createGlowPlane({
    color: 0x4f86b8,
    opacity: 0.2,
    width: 7.4,
    height: 6.2,
    position: new THREE.Vector3(-1.95, 0.88, -5.7),
  });
  leftGlow.name = "LeftGlow";

  const rightGlow = createGlowPlane({
    color: 0x5d4b98,
    opacity: 0.16,
    width: 6.8,
    height: 6,
    position: new THREE.Vector3(1.85, -0.25, -6.1),
  });
  rightGlow.name = "RightGlow";

  const hazeMaterial = new THREE.MeshBasicMaterial({
    color: 0x8cb6c7,
    transparent: true,
    opacity: 0.045,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
  const haze = new THREE.Mesh(new THREE.PlaneGeometry(11.5, 6.4), hazeMaterial);
  haze.name = "NightHaze";
  haze.position.set(0, -0.22, -3.4);

  group.add(moon, leftGlow, rightGlow, haze);
  scene.add(group);

  const state = {
    moonOpacity: 0.1,
    hazeOpacity: 0.045,
    leftGlowOpacity: 0.2,
    rightGlowOpacity: 0.16,
  };

  function update(_delta, elapsed) {
    moon.material.opacity = state.moonOpacity + Math.sin(elapsed * 0.23) * 0.012;
    moon.position.x = -2.9 + Math.sin(elapsed * 0.06) * 0.14;

    leftGlow.material.opacity = state.leftGlowOpacity + Math.sin(elapsed * 0.18) * 0.015;
    leftGlow.position.y = 0.88 + Math.sin(elapsed * 0.12) * 0.08;

    rightGlow.material.opacity = state.rightGlowOpacity + Math.cos(elapsed * 0.16) * 0.014;
    rightGlow.position.y = -0.25 + Math.sin(elapsed * 0.11) * 0.06;

    haze.material.opacity = state.hazeOpacity + Math.sin(elapsed * 0.2) * 0.006;
    haze.position.x = Math.sin(elapsed * 0.05) * 0.18;
  }

  function dispose() {
    [moon, leftGlow, rightGlow, haze].forEach((mesh) => {
      mesh.geometry.dispose();
      mesh.material.dispose();
    });
    scene.remove(group);
  }

  return {
    group,
    moon,
    haze,
    leftGlow,
    rightGlow,
    state,
    update,
    dispose,
  };
}
