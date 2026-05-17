export function setActiveSection(activeSection, options = {}) {
  const sections = Array.from(options.sections || document.querySelectorAll("[data-section]"));
  const dots = Array.from(
    options.dots || document.querySelectorAll("[data-section-target], .progress-dot"),
  );

  const activeId = activeSection?.dataset?.section || activeSection?.id;
  const activeLabel = activeSection?.dataset?.label || activeId;
  const activeTheme = activeSection?.dataset?.theme || "";

  sections.forEach((section) => {
    const isActive = section === activeSection;
    section.classList.toggle("is-active", isActive);
    section.classList.toggle("is-visible", isActive);
    section.setAttribute("aria-current", isActive ? "step" : "false");
  });

  dots.forEach((dot) => {
    const target = dot.dataset.sectionTarget;
    const isActive = target === activeId;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "step" : "false");
  });

  if (activeId) {
    document.body.dataset.activeSection = activeId;
  }

  if (activeTheme) {
    document.body.dataset.activeTheme = activeTheme;
  }

  const pillLabel = document.querySelector("[data-scroll-pill-label]");
  if (pillLabel) {
    pillLabel.textContent = activeLabel;
  }
}

export function markSections(options = {}) {
  const sections = Array.from(options.sections || document.querySelectorAll("[data-section]"));

  sections.forEach((section, index) => {
    if (!section.dataset.index) {
      section.dataset.index = String(index + 1).padStart(2, "0");
    }

    if (!section.id && section.dataset.section) {
      section.id = section.dataset.section;
    }
  });

  return sections;
}
