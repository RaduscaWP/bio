import * as THREE from "three";
import { createCamera, resizeCamera } from "./camera.js";
import { createEnvironment } from "./environment.js";
import { createLights } from "./lights.js";
import { disposeLoadedModel, loadModel } from "./loadModel.js";
import { createParticles } from "./particles.js";
import { createRenderer } from "./renderer.js";

export function createScene({ canvas, reducedMotion = false } = {}) {
  if (!canvas) {
    throw new Error("createScene requires a canvas element.");
  }

  const scene = new THREE.Scene();
  scene.name = "TytoAlbaScene";

  const renderer = createRenderer({ canvas });
  const { camera, cameraTarget } = createCamera();
  const lights = createLights();
  const environment = createEnvironment(scene);
  const particles = createParticles({ reducedMotion });
  const owlGroup = new THREE.Group();
  const owlSpinGroup = new THREE.Group();
  const owlFloatGroup = new THREE.Group();
  const clock = new THREE.Clock();

  let destroyed = false;

  owlGroup.name = "TytoAlbaOwlRig";
  owlSpinGroup.name = "TytoAlbaSpinRig";
  owlFloatGroup.name = "TytoAlbaFloatRig";
  owlGroup.position.set(0.58, -0.16, 0);
  owlGroup.add(owlSpinGroup);
  owlSpinGroup.add(owlFloatGroup);

  const modelState = {
    loaded: false,
    fallback: false,
    mixer: null,
    model: null,
    error: null,
    promise: null,
  };

  scene.add(lights.group, particles.group, owlGroup);

  const whenReady = loadModel({
    scene,
    owlGroup: owlFloatGroup,
    modelState,
    reducedMotion,
  });

  function update(delta = clock.getDelta()) {
    if (destroyed) {
      return;
    }

    const elapsed = clock.elapsedTime;

    if (modelState.mixer && !reducedMotion) {
      modelState.mixer.update(delta);
    }

    if (!reducedMotion) {
      owlSpinGroup.rotation.y = Math.sin(elapsed * 0.22) * 0.07;
      owlFloatGroup.position.y = Math.sin(elapsed * 0.55) * 0.025;
      owlFloatGroup.rotation.z = Math.sin(elapsed * 0.34) * 0.012;
    }

    particles.update(delta, elapsed);
    environment.update(delta, elapsed);
    camera.lookAt(cameraTarget);
    renderer.render(scene, camera);
  }

  function resize() {
    if (destroyed) {
      return;
    }

    resizeCamera(camera);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);
  }

  function destroy() {
    if (destroyed) {
      return;
    }

    destroyed = true;
    disposeLoadedModel(modelState);
    particles.dispose();
    environment.dispose();
    scene.remove(lights.group, particles.group, owlGroup);
    renderer.dispose();
  }

  return {
    scene,
    camera,
    renderer,
    cameraTarget,
    owlGroup,
    owlSpinGroup,
    owlFloatGroup,
    particles,
    lights,
    modelState,
    environment,
    whenReady,
    update,
    resize,
    destroy,
  };
}
