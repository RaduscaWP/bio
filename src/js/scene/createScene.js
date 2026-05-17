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
  const dragRotation = {
    active: false,
    pointerId: null,
    lastX: 0,
    lastY: 0,
    yaw: 0,
    pitch: 0,
    targetYaw: 0,
    targetPitch: 0,
  };

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

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const isDragBlocked = (target) =>
    target?.closest?.("a, button, input, textarea, select, summary, [data-menu-toggle], [data-section-target]");

  function onPointerDown(event) {
    if (destroyed || event.button !== 0 || isDragBlocked(event.target)) {
      return;
    }

    dragRotation.active = true;
    dragRotation.pointerId = event.pointerId;
    dragRotation.lastX = event.clientX;
    dragRotation.lastY = event.clientY;
    document.body.classList.add("is-rotating-owl");
  }

  function onPointerMove(event) {
    if (!dragRotation.active || event.pointerId !== dragRotation.pointerId) {
      return;
    }

    const deltaX = event.clientX - dragRotation.lastX;
    const deltaY = event.clientY - dragRotation.lastY;

    dragRotation.lastX = event.clientX;
    dragRotation.lastY = event.clientY;
    dragRotation.targetYaw = clamp(dragRotation.targetYaw + deltaX * 0.006, -0.95, 0.95);
    dragRotation.targetPitch = clamp(dragRotation.targetPitch + deltaY * 0.003, -0.18, 0.18);
    event.preventDefault();
  }

  function stopDragRotation() {
    if (!dragRotation.active) {
      return;
    }

    dragRotation.active = false;
    dragRotation.pointerId = null;
    document.body.classList.remove("is-rotating-owl");
  }

  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  window.addEventListener("pointermove", onPointerMove, { passive: false });
  window.addEventListener("pointerup", stopDragRotation);
  window.addEventListener("pointercancel", stopDragRotation);

  function update(delta = clock.getDelta()) {
    if (destroyed) {
      return;
    }

    const elapsed = clock.elapsedTime;

    if (modelState.mixer && !reducedMotion) {
      modelState.mixer.update(delta);
    }

    dragRotation.yaw += (dragRotation.targetYaw - dragRotation.yaw) * 0.12;
    dragRotation.pitch += (dragRotation.targetPitch - dragRotation.pitch) * 0.12;

    if (!reducedMotion) {
      owlSpinGroup.rotation.y = Math.sin(elapsed * 0.22) * 0.07 + dragRotation.yaw;
      owlSpinGroup.rotation.x = dragRotation.pitch;
      owlFloatGroup.position.y = Math.sin(elapsed * 0.55) * 0.025;
      owlFloatGroup.rotation.z = Math.sin(elapsed * 0.34) * 0.012;
    } else {
      owlSpinGroup.rotation.y = dragRotation.yaw;
      owlSpinGroup.rotation.x = dragRotation.pitch;
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
    stopDragRotation();
    window.removeEventListener("pointerdown", onPointerDown);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", stopDragRotation);
    window.removeEventListener("pointercancel", stopDragRotation);
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
