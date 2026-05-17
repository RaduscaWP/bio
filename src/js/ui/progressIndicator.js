import { setActiveSection } from "./sectionMarkers.js";

const FALLBACK_LABELS = {
  hero: "Intrare",
  identity: "Formă",
  flight: "Zbor",
  hearing: "Auz",
  hunt: "Vânătoare",
  habitat: "Habitat",
  ecology: "Echilibru",
  adaptations: "Anatomie",
  conservation: "Conservare",
};

export function initProgressIndicator(options = {}) {
  const indicator =
    options.indicator || document.querySelector("[data-progress-indicator], .progress-indicator");
  const sections = Array.from(options.sections || document.querySelectorAll("[data-section]"));

  if (!indicator || sections.length === 0) {
    return () => {};
  }

  indicator.innerHTML = "";

  const dots = sections.map((section, index) => {
    const id = section.dataset.section || section.id || `section-${index + 1}`;
    const label = section.dataset.label || FALLBACK_LABELS[id] || id;
    const displayIndex = section.dataset.index || String(index + 1).padStart(2, "0");
    const dot = document.createElement("button");

    dot.className = "progress-dot";
    dot.type = "button";
    dot.dataset.sectionTarget = id;
    dot.setAttribute("aria-label", `Mergi la ${label}`);
    dot.innerHTML = `
      <span class="progress-dot__index">${displayIndex}</span>
      <span class="progress-dot__label">${label}</span>
    `;

    indicator.append(dot);
    return dot;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      setActiveSection(visible.target, { sections, dots });
    },
    {
      rootMargin: "-35% 0px -42% 0px",
      threshold: [0.12, 0.35, 0.62],
    },
  );

  sections.forEach((section) => observer.observe(section));
  setActiveSection(sections[0], { sections, dots });

  return () => observer.disconnect();
}
