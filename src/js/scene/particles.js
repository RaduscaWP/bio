import * as THREE from "three";

function seededRandom(seed) {
  let value = seed % 2147483647;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function createFeatherTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, size, size);
  context.translate(size / 2, size / 2);
  context.rotate(-0.35);

  const gradient = context.createLinearGradient(0, -42, 0, 42);
  gradient.addColorStop(0, "rgba(255,255,255,0)");
  gradient.addColorStop(0.18, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.82, "rgba(255,255,255,0.65)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");

  context.fillStyle = gradient;
  context.beginPath();
  context.moveTo(0, -46);
  context.quadraticCurveTo(15, -4, 8, 38);
  context.quadraticCurveTo(0, 48, -8, 38);
  context.quadraticCurveTo(-15, -4, 0, -46);
  context.closePath();
  context.fill();

  context.strokeStyle = "rgba(255,255,255,0.42)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(0, -40);
  context.lineTo(0, 38);
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export function createParticles({ reducedMotion = false } = {}) {
  const group = new THREE.Group();
  group.name = "NightParticles";

  const count = reducedMotion ? 110 : 260;
  const random = seededRandom(1337);
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    positions[stride] = (random() - 0.5) * 8.5;
    positions[stride + 1] = (random() - 0.5) * 4.8;
    positions[stride + 2] = -random() * 7.2 + 1.2;
  }

  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

  const dustMaterial = new THREE.PointsMaterial({
    color: 0xdbe4ef,
    size: reducedMotion ? 0.013 : 0.018,
    transparent: true,
    opacity: 0.34,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.name = "NightDust";
  group.add(dust);

  const featherTexture = createFeatherTexture();
  const featherGeometry = new THREE.PlaneGeometry(0.12, 0.42);
  const featherMaterial = new THREE.MeshBasicMaterial({
    map: featherTexture,
    color: 0xe8eef8,
    transparent: true,
    opacity: reducedMotion ? 0.08 : 0.16,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });

  const feathers = [];
  const featherCount = reducedMotion ? 0 : 18;

  for (let index = 0; index < featherCount; index += 1) {
    const feather = new THREE.Mesh(featherGeometry, featherMaterial);
    feather.position.set(
      (random() - 0.5) * 6.2,
      (random() - 0.5) * 4.2,
      -random() * 4.2 + 0.2,
    );
    feather.rotation.set(random() * Math.PI, random() * Math.PI, random() * Math.PI);
    feather.userData = {
      drift: 0.08 + random() * 0.12,
      sway: 0.15 + random() * 0.22,
      spin: -0.32 + random() * 0.64,
      seed: random() * Math.PI * 2,
    };
    group.add(feather);
    feathers.push(feather);
  }

  const state = {
    opacity: reducedMotion ? 0.18 : 0.34,
    featherOpacity: reducedMotion ? 0 : 0.16,
  };

  function update(delta, elapsed) {
    dust.rotation.y += delta * 0.01;
    dust.rotation.x = Math.sin(elapsed * 0.08) * 0.018;
    dustMaterial.opacity = state.opacity + Math.sin(elapsed * 0.46) * 0.04;

    featherMaterial.opacity = state.featherOpacity;

    feathers.forEach((feather) => {
      feather.position.y -= feather.userData.drift * delta;
      feather.position.x += Math.sin(elapsed * feather.userData.sway + feather.userData.seed) * 0.0018;
      feather.rotation.z += feather.userData.spin * delta * 0.18;
      feather.rotation.y += feather.userData.spin * delta * 0.09;

      if (feather.position.y < -2.6) {
        feather.position.y = 2.4;
      }
    });
  }

  function dispose() {
    dustGeometry.dispose();
    dustMaterial.dispose();
    featherGeometry.dispose();
    featherMaterial.dispose();
    featherTexture.dispose();
  }

  return {
    group,
    points: dust,
    dust,
    feathers,
    state,
    update,
    dispose,
  };
}
