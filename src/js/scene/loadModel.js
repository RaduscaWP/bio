import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

const DEFAULT_MODEL_URL = "/models/owl.glb";
const SUPPORT_PATTERN = /(wood|stump|perch|log|branch)/i;

async function assertModelAsset(url) {
  const response = await fetch(url, { method: "HEAD" });
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok || contentType.includes("text/html")) {
    throw new Error(`Model asset missing at ${url}. Add a valid GLB file to public/models/owl.glb.`);
  }
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }

    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      materials.forEach((material) => material.dispose());
    }
  });
}

function stripSupportGeometry(model) {
  const removable = [];

  model.traverse((child) => {
    if (!child.isMesh) {
      return;
    }

    const materials = Array.isArray(child.material) ? child.material : [child.material];
    const signature = [child.name, ...materials.map((material) => material?.name || "")]
      .filter(Boolean)
      .join(" ");

    if (SUPPORT_PATTERN.test(signature)) {
      removable.push(child);
      return;
    }

    materials.forEach((material) => {
      material.roughness = Math.min(material.roughness ?? 0.72, 0.9);
      material.metalness = 0;
      material.envMapIntensity = 0.45;
      material.needsUpdate = true;
    });
  });

  removable.forEach((mesh) => mesh.parent?.remove(mesh));
}

const MODEL_BASE_YAW = Math.PI;

function normalizeModel(model, targetHeight = 2.18) {
  const box = new THREE.Box3().setFromObject(model);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const height = Math.max(size.y, 0.001);
  const scale = targetHeight / height;

  model.position.sub(center);
  model.scale.multiplyScalar(scale);
  model.rotation.y = MODEL_BASE_YAW;
  model.position.y -= 0.32;
}

function createFallbackOwl() {
  const group = new THREE.Group();
  group.name = "FallbackTytoAlba";

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xb7c2cf,
    roughness: 0.82,
    metalness: 0.02,
  });
  const faceMaterial = new THREE.MeshStandardMaterial({
    color: 0xcebb92,
    roughness: 0.94,
  });
  const featherMaterial = new THREE.MeshStandardMaterial({
    color: 0x43382c,
    roughness: 0.92,
  });
  const detailMaterial = new THREE.MeshStandardMaterial({
    color: 0x06080d,
    roughness: 0.78,
  });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.58, 36, 32), bodyMaterial);
  body.scale.set(0.82, 1.22, 0.62);
  body.position.set(0, -0.14, 0);

  const face = new THREE.Mesh(new THREE.SphereGeometry(0.48, 36, 18), faceMaterial);
  face.scale.set(1.08, 0.84, 0.22);
  face.position.set(0.02, 0.45, 0.42);

  const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.05, 24, 24), detailMaterial);
  leftEye.position.set(-0.16, 0.5, 0.5);

  const rightEye = leftEye.clone();
  rightEye.position.x = 0.16;

  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.052, 0.19, 4), detailMaterial);
  beak.rotation.x = Math.PI / 2;
  beak.rotation.z = Math.PI / 4;
  beak.position.set(0, 0.38, 0.53);

  const wingGeometry = new THREE.ConeGeometry(0.24, 1.05, 6);
  const leftWing = new THREE.Mesh(wingGeometry, featherMaterial);
  leftWing.scale.set(0.5, 1, 0.16);
  leftWing.rotation.z = 0.34;
  leftWing.position.set(-0.46, -0.22, -0.02);

  const rightWing = leftWing.clone();
  rightWing.rotation.z = -0.34;
  rightWing.position.x = 0.48;

  group.add(body, face, leftEye, rightEye, beak, leftWing, rightWing);
  group.scale.setScalar(0.74);
  group.position.set(0.24, -0.12, 0);
  group.userData.dispose = () => disposeObject(group);

  return group;
}

export function loadModel({
  scene,
  owlGroup,
  modelState,
  url = DEFAULT_MODEL_URL,
  reducedMotion = false,
} = {}) {
  if (!scene || !owlGroup || !modelState) {
    throw new Error("loadModel requires scene, owlGroup, and modelState.");
  }

  const loader = new GLTFLoader();

  const installFallback = (error) => {
    console.warn(`[Tyto Alba] Could not load ${url}. Using stylized fallback owl instead.`, error);

    const fallback = createFallbackOwl();
    owlGroup.clear();
    owlGroup.add(fallback);

    modelState.loaded = false;
    modelState.fallback = true;
    modelState.mixer = null;
    modelState.model = fallback;
    modelState.error = error;
  };

  const promise = assertModelAsset(url)
    .then(() => loader.loadAsync(url))
    .then((gltf) => {
      const model = gltf.scene;
      model.name = "TytoAlbaModel";

      stripSupportGeometry(model);
      normalizeModel(model);

      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = false;
          child.frustumCulled = true;
        }
      });

      owlGroup.clear();
      owlGroup.add(model);

      modelState.loaded = true;
      modelState.fallback = false;
      modelState.model = model;
      modelState.error = null;
      modelState.mixer = null;

      return modelState;
    })
    .catch((error) => {
      installFallback(error);
      return modelState;
    });

  modelState.promise = promise;
  return promise;
}

export function disposeLoadedModel(modelState) {
  if (!modelState?.model) {
    return;
  }

  if (modelState.model.userData.dispose) {
    modelState.model.userData.dispose();
  } else {
    disposeObject(modelState.model);
  }

  modelState.model = null;
  modelState.mixer = null;
}
