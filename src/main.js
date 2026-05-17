import "./styles/main.scss";
import {
  footerContent,
  siteChrome,
  storyChapters,
} from "./js/data/content.js";
import { initCustomCursor } from "./js/ui/cursor.js";
import { initProgressIndicator } from "./js/ui/progressIndicator.js";
import { markSections } from "./js/ui/sectionMarkers.js";

const app = {
  canvas: document.querySelector("[data-webgl]"),
  story: document.querySelector("#story"),
  progressIndicator: document.querySelector("[data-progress-indicator]"),
  customCursor: document.querySelector("[data-custom-cursor]"),
  chrome: document.querySelector("[data-site-chrome]"),
  chapterMenu: document.querySelector("[data-chapter-menu]"),
  footer: document.querySelector("[data-site-footer]"),
  loadingVeil: document.querySelector("[data-loading-veil]"),
};

function renderNoteLines(facts = []) {
  if (!facts.length) {
    return "";
  }

  return `
    <ul class="section-notes__list" aria-label="Date biologice">
      ${facts
        .map((fact, index) => {
          if (typeof fact === "string") {
            return `
              <li class="note-line">
                <span class="note-line__index">${String(index + 1).padStart(2, "0")}</span>
                <p class="note-line__text">${fact}</p>
              </li>
            `;
          }

          return `
            <li class="note-line">
              <span class="note-line__index">${String(index + 1).padStart(2, "0")}</span>
              <div class="note-line__body">
                <p class="note-line__label">${fact.label}</p>
                <p class="note-line__text">${fact.value}</p>
              </div>
            </li>
          `;
        })
        .join("")}
    </ul>
  `;
}

function renderChapterHeading(chapter, { level = 2 } = {}) {
  const headingTag = `h${level}`;

  return `
    <p class="section-kicker">${chapter.kicker}</p>
    <${headingTag} class="section-title" id="${chapter.id}-title">${chapter.title}</${headingTag}>
    <p class="section-subtitle">${chapter.subtitle}</p>
    <p class="section-body">${chapter.body}</p>
    <p class="section-micro">${chapter.microcopy}</p>
  `;
}

function renderHeroChapter(chapter, index) {
  const sectionNumber = String(index + 1).padStart(2, "0");

  return `
    <section
      class="story-section story-section--${chapter.layout}"
      id="${chapter.id}"
      data-section="${chapter.id}"
      data-index="${sectionNumber}"
      data-label="${chapter.navLabel}"
      aria-labelledby="${chapter.id}-title"
    >
      <div class="section-shell section-shell--hero">
        <div class="section-copy">
          ${renderChapterHeading(chapter, { level: 1 })}
        </div>
        <aside class="section-notes section-notes--hero">
          ${renderNoteLines(chapter.facts)}
        </aside>
      </div>
    </section>
  `;
}

function renderDefaultChapter(chapter, index) {
  const sectionNumber = String(index + 1).padStart(2, "0");

  return `
    <section
      class="story-section story-section--${chapter.layout}"
      id="${chapter.id}"
      data-section="${chapter.id}"
      data-index="${sectionNumber}"
      data-label="${chapter.navLabel}"
      aria-labelledby="${chapter.id}-title"
    >
      <div class="section-shell">
        <div class="section-copy">
          ${renderChapterHeading(chapter)}
        </div>
        <aside class="section-notes">
          ${renderNoteLines(chapter.facts)}
        </aside>
      </div>
    </section>
  `;
}

function renderClosingChapter(chapter, index) {
  const sectionNumber = String(index + 1).padStart(2, "0");

  return `
    <section
      class="story-section story-section--${chapter.layout}"
      id="${chapter.id}"
      data-section="${chapter.id}"
      data-index="${sectionNumber}"
      data-label="${chapter.navLabel}"
      aria-labelledby="${chapter.id}-title"
    >
      <div class="section-shell section-shell--closing">
        <div class="section-copy section-copy--closing">
          ${renderChapterHeading(chapter)}
        </div>
        <aside class="section-notes section-notes--closing">
          ${renderNoteLines(chapter.facts)}
        </aside>
      </div>
    </section>
  `;
}

const chapterRenderers = {
  hero: renderHeroChapter,
  conservation: renderClosingChapter,
};

function renderStory() {
  if (!app.story) {
    return [];
  }

  app.story.innerHTML = storyChapters
    .map((chapter, index) => {
      const renderer = chapterRenderers[chapter.id] || renderDefaultChapter;
      return renderer(chapter, index);
    })
    .join("");

  return markSections({ sections: app.story.querySelectorAll("[data-section]") });
}

function renderSiteChrome() {
  if (!app.chrome) {
    return;
  }

  const showMenuLabel = !window.matchMedia("(max-width: 640px)").matches;

  app.chrome.innerHTML = `
    <div class="species-mark">
      <button
        class="species-mark__button"
        type="button"
        data-section-target="hero"
        data-cursor="hover"
        aria-label="Revino la introducere"
      >
        <span class="species-mark__label">${siteChrome.label}</span>
        <span class="species-mark__title">${siteChrome.title}</span>
        <span class="species-mark__latin">${siteChrome.latin}</span>
      </button>
    </div>
    <button
      class="menu-toggle"
      type="button"
      data-menu-toggle
      data-cursor="hover"
      aria-expanded="false"
      aria-controls="chapter-menu-panel"
      aria-label="Deschide cuprinsul capitolelor"
    >
      <span></span>
      <span></span>
      <span></span>
      ${showMenuLabel ? `<span class="menu-toggle__label">${siteChrome.menuLabel}</span>` : ""}
    </button>
  `;
}

function renderChapterMenu() {
  if (!app.chapterMenu) {
    return;
  }

  app.chapterMenu.id = "chapter-menu-panel";
  app.chapterMenu.hidden = true;
  app.chapterMenu.inert = true;
  app.chapterMenu.setAttribute("aria-hidden", "true");

  app.chapterMenu.innerHTML = `
    <div class="chapter-menu__backdrop" data-menu-close></div>
    <div class="chapter-menu__panel">
      <div class="chapter-menu__intro">
        <p class="chapter-menu__label">${siteChrome.menuLabel}</p>
        <h2 class="chapter-menu__title">${siteChrome.menuTitle}</h2>
        <p class="chapter-menu__text">${siteChrome.menuText}</p>
      </div>
      <ol class="chapter-menu__list">
        ${storyChapters
          .map(
            (chapter, index) => `
              <li class="chapter-menu__item">
                <button
                  class="chapter-menu__link"
                  type="button"
                  data-section-target="${chapter.id}"
                  data-cursor="hover"
                >
                  <span class="chapter-menu__index">${String(index + 1).padStart(2, "0")}</span>
                  <span class="chapter-menu__copy">
                    <span class="chapter-menu__name">${chapter.navLabel}</span>
                    <span class="chapter-menu__caption">${chapter.title}</span>
                  </span>
                </button>
              </li>
            `,
          )
          .join("")}
      </ol>
    </div>
  `;
}

function renderFooter() {
  if (!app.footer) {
    return;
  }

  app.footer.innerHTML = `
    <div class="site-footer__inner">
      <div class="site-footer__copy">
        <p class="site-footer__label">${footerContent.title}</p>
        <p class="site-footer__description">${footerContent.description}</p>
      </div>
      <div class="site-footer__column">
        <p class="site-footer__heading">Referințe</p>
        <ul class="site-footer__links">
          ${footerContent.references
            .map(
              (reference) => `
                <li>
                  <a href="${reference.href}" target="_blank" rel="noreferrer">
                    ${reference.label}
                  </a>
                </li>
              `,
            )
            .join("")}
        </ul>
      </div>
      <div class="site-footer__column">
        <p class="site-footer__heading">Credite</p>
        <ul class="site-footer__notes">
          ${footerContent.credits.map((credit) => `<li>${credit}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function scrollToSection(sectionId, { reducedMotion = false, forceAuto = false } = {}) {
  const section = document.getElementById(sectionId);

  if (!section) {
    return false;
  }

  const top = section.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top,
    behavior: forceAuto || reducedMotion ? "auto" : "smooth",
  });

  return true;
}

function initChapterMenu() {
  const toggle = app.chrome?.querySelector("[data-menu-toggle]");
  const menu = app.chapterMenu;

  if (!toggle || !menu) {
    return () => {};
  }

  const controller = new AbortController();
  const { signal } = controller;
  let isOpen = false;

  const setOpen = (nextOpen) => {
    isOpen = nextOpen;
    document.body.classList.toggle("has-menu-open", nextOpen);

    if (nextOpen) {
      menu.hidden = false;
      menu.inert = false;
      menu.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      window.requestAnimationFrame(() => {
        menu.classList.add("is-open");
      });
      return;
    }

    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    menu.inert = true;
    window.setTimeout(() => {
      if (!isOpen) {
        menu.hidden = true;
      }
    }, 320);
  };

  const onToggle = () => setOpen(!isOpen);
  const onClose = (event) => {
    if (event.target.closest("[data-menu-close]")) {
      setOpen(false);
    }
  };
  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  toggle.addEventListener("click", onToggle, { signal });
  menu.addEventListener("click", onClose, { signal });
  document.addEventListener("keydown", onKeyDown, { signal });

  return {
    close: () => setOpen(false),
    destroy: () => {
      controller.abort();
      setOpen(false);
    },
  };
}

function bindSectionTargets({ reducedMotion = false, onNavigate = null } = {}) {
  const controller = new AbortController();
  const { signal } = controller;

  const buttons = document.querySelectorAll("[data-section-target]");

  buttons.forEach((button) => {
    button.addEventListener(
      "click",
      () => {
        const sectionId = button.dataset.sectionTarget;
        const didScroll = scrollToSection(sectionId, {
          reducedMotion,
        });

        if (!didScroll) {
          return;
        }

        history.replaceState(null, "", `#${sectionId}`);

        if (typeof onNavigate === "function") {
          onNavigate(sectionId, button);
        }
      },
      { signal },
    );
  });

  return () => controller.abort();
}

function applyInitialHash(reducedMotion = false) {
  const sectionId = window.location.hash.replace("#", "");

  if (!sectionId) {
    return;
  }

  const jump = () =>
    scrollToSection(sectionId, {
      reducedMotion,
      forceAuto: true,
    });

  jump();
  window.requestAnimationFrame(jump);
  window.setTimeout(jump, 250);
  window.setTimeout(jump, 700);
  window.setTimeout(jump, 1200);
}

function bindHashNavigation({ reducedMotion = false } = {}) {
  const onHashChange = () => applyInitialHash(reducedMotion);
  window.addEventListener("hashchange", onHashChange);

  return () => {
    window.removeEventListener("hashchange", onHashChange);
  };
}

function hideLoadingVeil() {
  if (!app.loadingVeil) {
    return;
  }

  app.loadingVeil.classList.add("is-hidden");
  app.loadingVeil.setAttribute("aria-hidden", "true");
  app.loadingVeil.inert = true;
  window.setTimeout(() => {
    app.loadingVeil.hidden = true;
  }, 560);
}

async function bootExperience() {
  renderSiteChrome();
  renderChapterMenu();
  const sections = renderStory();
  renderFooter();

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups = [];

  cleanups.push(
    initCustomCursor({
      cursor: app.customCursor,
    }),
  );

  cleanups.push(
    initProgressIndicator({
      indicator: app.progressIndicator,
      sections,
    }),
  );

  const menuController = initChapterMenu();
  cleanups.push(() => menuController.destroy());

  cleanups.push(
    bindSectionTargets({
      reducedMotion,
      onNavigate: () => menuController.close(),
    }),
  );

  cleanups.push(
    bindHashNavigation({
      reducedMotion,
    }),
  );

  let sceneExperience = null;
  let frameId = 0;
  let cleanupScrollStory = () => {};

  if (app.canvas) {
    try {
      const [{ createScene }, { initScrollStory }] = await Promise.all([
        import("./js/scene/createScene.js"),
        import("./js/animations/masterTimeline.js"),
      ]);

      sceneExperience = createScene({
        canvas: app.canvas,
        reducedMotion,
      });

      const tick = () => {
        sceneExperience.update();
        frameId = window.requestAnimationFrame(tick);
      };

      const onResize = () => sceneExperience.resize();

      window.addEventListener("resize", onResize, { passive: true });
      sceneExperience.resize();
      tick();

      cleanupScrollStory = initScrollStory({
        sceneExperience,
        sections,
        sceneStates: Object.fromEntries(storyChapters.map((chapter) => [chapter.id, chapter.sceneState])),
        reducedMotion,
      });

      document.body.classList.add("is-scene-ready");

      cleanups.push(() => {
        cleanupScrollStory();
        window.cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        sceneExperience.destroy();
      });

      Promise.resolve(sceneExperience.whenReady)
        .catch(() => {})
        .finally(() => {
          hideLoadingVeil();
          document.body.classList.add("is-loaded");
        });
    } catch (error) {
      console.warn("[Tyto Alba] Three.js scene could not be initialized.", error);
      document.body.classList.add("has-scene-fallback");
    }
  }

  if (!sceneExperience) {
    const { initScrollStory } = await import("./js/animations/masterTimeline.js");
    cleanupScrollStory = initScrollStory({
      sceneExperience: null,
      sections,
      sceneStates: Object.fromEntries(storyChapters.map((chapter) => [chapter.id, chapter.sceneState])),
      reducedMotion,
    });

    cleanups.push(() => cleanupScrollStory());
    hideLoadingVeil();
    document.body.classList.add("is-loaded");
  }

  applyInitialHash(reducedMotion);

  if (document.fonts?.ready) {
    document.fonts.ready.then(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }

  window.__TYTO_ALBA_APP__ = {
    ...app,
    sections,
    storyChapters,
    sceneExperience,
    cleanup: () => cleanups.forEach((fn) => fn?.()),
  };
}

bootExperience().catch((error) => {
  console.error("[Tyto Alba] Experience boot failed.", error);
  hideLoadingVeil();
});
