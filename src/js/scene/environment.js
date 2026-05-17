import * as THREE from "three";

function createRadialGlowTexture({
  size = 256,
  innerAlpha = 1,
  midAlpha = 0.42,
  outerAlpha = 0,
} = {}) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  const center = size / 2;
  const gradient = context.createRadialGradient(center, center, 0, center, center, center);

  gradient.addColorStop(0, `rgba(255,255,255,${innerAlpha})`);
  gradient.addColorStop(0.34, `rgba(255,255,255,${midAlpha})`);
  gradient.addColorStop(0.72, "rgba(255,255,255,0.08)");
  gradient.addColorStop(1, `rgba(255,255,255,${outerAlpha})`);

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

function createGlowPlane({
  color,
  opacity,
  width,
  height,
  position,
  innerAlpha = 1,
  midAlpha = 0.42,
}) {
  const texture = createRadialGlowTexture({ innerAlpha, midAlpha });
  const material = new THREE.MeshBasicMaterial({
    color,
    map: texture,
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
  scene.fog = new THREE.FogExp2(0x0a0c14, 0.048);

  const group = new THREE.Group();
  group.name = "NightEnvironment";

  const moon = createGlowPlane({
    color: 0xc7d7ee,
    opacity: 0.065,
    width: 4.8,
    height: 4.8,
    position: new THREE.Vector3(-2.95, 2.02, -6.2),
    innerAlpha: 0.62,
    midAlpha: 0.24,
  });
  moon.name = "SoftMoonBloom";

  const leftGlow = createGlowPlane({
    color: 0x557cb9,
    opacity: 0.24,
    width: 8.8,
    height: 7.8,
    position: new THREE.Vector3(-2.25, 0.9, -5.9),
    innerAlpha: 0.86,
    midAlpha: 0.34,
  });
  leftGlow.name = "LeftGlow";

  const rightGlow = createGlowPlane({
    color: 0x7c4a8a,
    opacity: 0.18,
    width: 8.2,
    height: 7.4,
    position: new THREE.Vector3(2.08, -0.35, -6.3),
    innerAlpha: 0.82,
    midAlpha: 0.3,
  });
  rightGlow.name = "RightGlow";

  const haze = createGlowPlane({
    color: 0x8aaec4,
    opacity: 0.075,
    width: 13.5,
    height: 8.4,
    position: new THREE.Vector3(-0.15, -0.16, -3.8),
    innerAlpha: 0.48,
    midAlpha: 0.22,
  });
  haze.name = "NightHaze";

  group.add(moon, leftGlow, rightGlow, haze);
  scene.add(group);

  const state = {
    moonOpacity: 0.065,
    hazeOpacity: 0.075,
    leftGlowOpacity: 0.24,
    rightGlowOpacity: 0.18,
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
      mesh.material.map?.dispose();
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
