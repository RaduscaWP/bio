import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const REVEAL_SELECTOR = [
  ".section-kicker",
  ".section-title",
  ".section-subtitle",
  ".section-body",
  ".section-micro",
  ".note-line",
  ".section-notes__eyebrow",
].join(", ");

function toArray(value) {
  if (!value) {
    return [];
  }

  return Array.from(value);
}

function getSectionId(section) {
  return section?.dataset?.section || section?.id || "";
}

function getSceneState(section, sceneStates) {
  return sceneStates?.[getSectionId(section)] || null;
}

function tweenVector3(timeline, target, values, position = 0) {
  if (!target || !values) {
    return;
  }

  timeline.to(
    target,
    {
      x: values.x,
      y: values.y,
      z: values.z,
    },
    position,
  );
}

function applyVector3(target, values) {
  if (!target || !values) {
    return;
  }

  target.set(values.x, values.y, values.z);
}

function applySceneState(sceneExperience, sceneState) {
  if (!sceneExperience || !sceneState) {
    return;
  }

  applyVector3(sceneExperience.camera?.position, sceneState.camera?.position);
  applyVector3(sceneExperience.cameraTarget, sceneState.camera?.target);
  applyVector3(sceneExperience.owlGroup?.position, sceneState.owl?.position);
  applyVector3(sceneExperience.owlGroup?.rotation, sceneState.owl?.rotation);
  applyVector3(sceneExperience.owlGroup?.scale, sceneState.owl?.scale);

  if (sceneExperience.lights && sceneState.lights) {
    Object.entries(sceneState.lights).forEach(([name, intensity]) => {
      if (sceneExperience.lights[name]) {
        sceneExperience.lights[name].intensity = intensity;
      }
    });
  }

  if (sceneExperience.particles?.state && sceneState.particles) {
    Object.assign(sceneExperience.particles.state, sceneState.particles);
  }

  if (sceneExperience.environment?.state && sceneState.environment) {
    Object.assign(sceneExperience.environment.state, sceneState.environment);
  }
}

function createTextReveal(section, { reducedMotion, animations, immediate = false }) {
  const revealItems = Array.from(section.querySelectorAll(REVEAL_SELECTOR));

  if (!revealItems.length) {
    return;
  }

  if (immediate) {
    return;
  }

  gsap.set(revealItems, {
    autoAlpha: 0,
    y: reducedMotion ? 0 : 30,
  });

  const tween = gsap.to(revealItems, {
    autoAlpha: 1,
    y: 0,
    duration: reducedMotion ? 0.18 : 0.92,
    ease: "power2.out",
    stagger: reducedMotion ? 0.02 : 0.08,
    scrollTrigger: {
      trigger: section,
      start: "top 72%",
      once: true,
    },
  });

  animations.push(tween);
}

function createCameraChapter(section, sceneState, { sceneExperience, reducedMotion, animations }) {
  if (!sceneExperience || !sceneState) {
    return;
  }

  if (reducedMotion) {
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top 58%",
      onEnter: () => applySceneState(sceneExperience, sceneState),
      onEnterBack: () => applySceneState(sceneExperience, sceneState),
    });

    animations.push(trigger);
    return;
  }

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
      overwrite: "auto",
    },
    scrollTrigger: {
      trigger: section,
      start: "top 80%",
      end: "bottom 18%",
      scrub: 1.15,
    },
  });

  tweenVector3(timeline, sceneExperience.camera.position, sceneState.camera?.position, 0);
  tweenVector3(timeline, sceneExperience.cameraTarget, sceneState.camera?.target, 0);
  tweenVector3(timeline, sceneExperience.owlGroup?.position, sceneState.owl?.position, 0);
  tweenVector3(timeline, sceneExperience.owlGroup?.rotation, sceneState.owl?.rotation, 0);
  tweenVector3(timeline, sceneExperience.owlGroup?.scale, sceneState.owl?.scale, 0);

  if (sceneExperience.lights && sceneState.lights) {
    Object.entries(sceneState.lights).forEach(([name, intensity]) => {
      if (sceneExperience.lights[name]) {
        timeline.to(sceneExperience.lights[name], { intensity }, 0);
      }
    });
  }

  if (sceneExperience.particles?.state && sceneState.particles) {
    timeline.to(sceneExperience.particles.state, sceneState.particles, 0);
  }

  if (sceneExperience.environment?.state && sceneState.environment) {
    timeline.to(sceneExperience.environment.state, sceneState.environment, 0);
  }

  animations.push(timeline);
}

export function initScrollStory({
  sceneExperience = null,
  sections = [],
  sceneStates = {},
  reducedMotion = false,
} = {}) {
  const sectionList = toArray(sections).filter(Boolean);
  const animations = [];

  if (sceneExperience && sectionList[0]) {
    const initialState = getSceneState(sectionList[0], sceneStates);
    applySceneState(sceneExperience, initialState);
  }

  sectionList.forEach((section, index) => {
    const sceneState = getSceneState(section, sceneStates);

    createTextReveal(section, {
      reducedMotion,
      animations,
      immediate: index === 0,
    });
    createCameraChapter(section, sceneState, {
      sceneExperience,
      reducedMotion,
      animations,
    });
  });

  window.requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return function cleanupScrollStory() {
    animations.forEach((animation) => {
      if (typeof animation?.scrollTrigger?.kill === "function") {
        animation.scrollTrigger.kill();
      }

      if (typeof animation?.kill === "function") {
        animation.kill();
      }
    });
  };
}
