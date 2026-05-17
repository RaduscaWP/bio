const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, summary, [role="button"], [data-cursor="hover"]';

export function initCustomCursor(options = {}) {
  const cursor = options.cursor || document.querySelector("[data-custom-cursor], .custom-cursor");
  const root = options.root || document.body;

  if (!cursor || !root) {
    return () => {};
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (prefersReducedMotion.matches || !canHover.matches) {
    cursor.setAttribute("hidden", "");
    return () => {};
  }

  let currentX = window.innerWidth / 2;
  let currentY = window.innerHeight / 2;
  let targetX = currentX;
  let targetY = currentY;
  let frameId = 0;

  root.classList.add("has-custom-cursor");

  const render = () => {
    currentX += (targetX - currentX) * 0.18;
    currentY += (targetY - currentY) * 0.18;
    cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
    frameId = window.requestAnimationFrame(render);
  };

  const onPointerMove = (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    cursor.classList.add("is-visible");
  };

  const onPointerLeave = () => {
    cursor.classList.remove("is-visible", "is-hovering");
  };

  const onPointerOver = (event) => {
    if (event.target.closest(INTERACTIVE_SELECTOR)) {
      cursor.classList.add("is-hovering");
    }
  };

  const onPointerOut = (event) => {
    if (event.target.closest(INTERACTIVE_SELECTOR)) {
      cursor.classList.remove("is-hovering");
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  document.addEventListener("pointerleave", onPointerLeave);
  document.addEventListener("pointerover", onPointerOver);
  document.addEventListener("pointerout", onPointerOut);
  frameId = window.requestAnimationFrame(render);

  return () => {
    root.classList.remove("has-custom-cursor");
    cursor.classList.remove("is-visible", "is-hovering");
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerleave", onPointerLeave);
    document.removeEventListener("pointerover", onPointerOver);
    document.removeEventListener("pointerout", onPointerOut);
  };
}
