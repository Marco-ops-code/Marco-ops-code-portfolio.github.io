document.documentElement.classList.remove("no-js");
document.documentElement.classList.add("js");

const yearElement = document.getElementById("year");
const revealElements = document.querySelectorAll(".reveal");
const themeToggle = document.getElementById("themeToggle");
const socialTyping = document.getElementById("socialTyping");
const heroClockTime = document.getElementById("heroClockTime");
const heroClockDate = document.getElementById("heroClockDate");
const heroClockZone = document.querySelector(".hero-clock-zone");
const heroClockProgressFill = document.getElementById("heroClockProgressFill");
const reduceMotionGlobal = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const headerNav = document.querySelector(".header");
const headerOffset = () => (headerNav ? headerNav.offsetHeight + 8 : 80);

let lenisInstance = null;

if (yearElement) {
  yearElement.textContent = String(new Date().getFullYear());
}

if (heroClockTime && heroClockDate) {
  const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const updateHeroClock = () => {
    const now = new Date();
    heroClockTime.textContent = timeFormatter.format(now);
    heroClockDate.textContent = dateFormatter.format(now);
    if (heroClockProgressFill) {
      heroClockProgressFill.style.width = `${((now.getSeconds() + now.getMilliseconds() / 1000) / 60) * 100}%`;
    }
  };

  if (heroClockZone) {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Locale";
    heroClockZone.textContent = tz.replace("_", " ");
  }

  updateHeroClock();
  window.setInterval(updateHeroClock, 1000);
}

function initAnimeEnhancements() {
  const hasAnimeApi =
    typeof anime !== "undefined" &&
    typeof anime.set === "function" &&
    typeof anime.timeline === "function" &&
    typeof anime.stagger === "function";

  if (reduceMotionGlobal || !hasAnimeApi) {
    return;
  }

  const heroTargets = [".hero-clock", ".badge", ".hero h1", ".hero-actions .btn"];

  try {
    anime
      .timeline({
        easing: "easeOutExpo",
        duration: 760,
      })
      .add({
        targets: ".hero-clock",
        opacity: [0, 1],
        translateY: [-14, 0],
        scale: [0.96, 1],
      })
      .add(
        {
          targets: [".badge", ".hero h1", ".hero-actions .btn"],
          opacity: [0, 1],
          translateY: [18, 0],
          delay: anime.stagger(110),
        },
        "-=320"
      );

    anime({
      targets: "#heroClockTime",
      opacity: [0.82, 1],
      duration: 1400,
      direction: "alternate",
      easing: "easeInOutSine",
      loop: true,
    });

    const titleObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        anime({
          targets: entry.target,
          opacity: [0, 1],
          translateY: [14, 0],
          scale: [0.98, 1],
          duration: 640,
          easing: "easeOutCubic",
        });
        titleObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.22 }
  );

    document.querySelectorAll(".section > h2").forEach((title) => {
      titleObserver.observe(title);
    });

    const groupsToAnimate = [
      { parent: ".services-grid", item: ".card" },
      { parent: ".projects-swiper", item: ".project" },
      { parent: ".pricing-split", item: ".subcriptions-card" },
      { parent: ".contact-links-grid", item: ".contact-link-card" },
    ];

    groupsToAnimate.forEach(({ parent, item }) => {
      const parentNode = document.querySelector(parent);
      if (!parentNode) {
        return;
      }
      const groupObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          const targets = entry.target.querySelectorAll(item);
          anime({
            targets,
            opacity: [0, 1],
            translateY: [16, 0],
            scale: [0.98, 1],
            delay: anime.stagger(90),
            duration: 560,
            easing: "easeOutCubic",
          });
          groupObserver.unobserve(parentNode);
        });
      },
      { threshold: 0.2 }
    );

      groupObserver.observe(parentNode);
    });

    const heroSection = document.querySelector(".hero");
    const heroPhoto = document.querySelector(".hero-photo");
    const heroCopy = document.querySelector(".hero-copy");
    if (heroSection && heroPhoto && heroCopy) {
      heroSection.addEventListener("pointermove", (event) => {
      const rect = heroSection.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      anime({
        targets: heroPhoto,
        translateX: x * 8,
        translateY: y * 6,
        rotateY: x * 4.5,
        rotateX: -y * 4,
        duration: 280,
        easing: "easeOutQuad",
      });

      anime({
        targets: [".hero-clock", ".badge"],
        translateX: x * -4.5,
        translateY: y * -3,
        duration: 300,
        easing: "easeOutQuad",
      });

      anime({
        targets: heroCopy,
        translateY: y * -1.5,
        duration: 320,
        easing: "easeOutQuad",
      });
    });

      heroSection.addEventListener("pointerleave", () => {
      anime({
        targets: [heroPhoto, ".hero-clock", ".badge", heroCopy],
        translateX: 0,
        translateY: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 420,
        easing: "easeOutExpo",
      });
      });
    }

    const cinematicSectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }
        const section = entry.target;
        const intro = section.querySelector(".section-intro");
        const title = section.querySelector(":scope > h2");
        anime({
          targets: [title, intro].filter(Boolean),
          opacity: [0.02, 1],
          translateY: [20, 0],
          duration: 680,
          delay: anime.stagger(90),
          easing: "easeOutExpo",
        });
        cinematicSectionObserver.unobserve(section);
      });
    },
    { threshold: 0.26 }
  );

    document.querySelectorAll("main .section").forEach((section) => {
      cinematicSectionObserver.observe(section);
    });
  } catch (error) {
    console.warn("Anime enhancements disabled:", error);
    if (typeof anime?.set === "function") {
      anime.set(heroTargets, { opacity: 1, translateY: 0, scale: 1 });
    }
  }
}

initAnimeEnhancements();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  /* threshold 0 : une section tres haute (ex. Competences) ne depasse jamais 12% de ratio visible au debut */
  { threshold: 0, rootMargin: "0px 0px 8% 0px" }
);

revealElements.forEach((element) => observer.observe(element));

const heroReveal = document.querySelector(".hero.reveal");
if (heroReveal) {
  heroReveal.classList.add("visible");
}

function initLenis() {
  if (reduceMotionGlobal || typeof Lenis === "undefined") {
    return null;
  }

  document.documentElement.classList.add("lenis-enabled");

  const lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    touchMultiplier: 1.4,
  });

  lenis.on("scroll", () => {
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.update();
    }
  });

  if (typeof gsap !== "undefined") {
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      if (anchor.classList.contains("glightbox")) {
        return;
      }
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") {
        return;
      }
      const target = document.querySelector(hash);
      if (!target || target.closest(".glightbox-inline-holder")) {
        return;
      }
      event.preventDefault();
      lenis.scrollTo(target, { offset: -headerOffset(), duration: 1.1 });
    });
  });

  lenisInstance = lenis;
  return lenis;
}

function initGsapScrollTrigger() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  if (reduceMotionGlobal) {
    return;
  }

  gsap.utils.toArray(".gsap-fade").forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        once: true,
      },
      y: 24,
      opacity: 0,
      duration: 0.7,
      ease: "power2.out",
    });
  });

  const heroSection = document.querySelector(".hero");
  const heroPhoto = document.querySelector(".hero-photo");
  if (heroSection && heroPhoto) {
    gsap.to(heroPhoto, {
      scrollTrigger: {
        trigger: heroSection,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
      },
      y: 48,
      scale: 0.96,
      ease: "none",
    });
  }

  const backgroundGlow = document.querySelector(".background-glow");
  if (backgroundGlow) {
    gsap.to(backgroundGlow, {
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "max",
        scrub: 1.2,
      },
      yPercent: 12,
      ease: "none",
    });
  }

  gsap.utils.toArray("main .section").forEach((section) => {
    const intro = section.querySelector(".section-intro");
    if (!intro || intro.closest("#social")) {
      return;
    }
    gsap.from(intro, {
      scrollTrigger: {
        trigger: section,
        start: "top 82%",
        once: true,
      },
      y: 16,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    });
  });
}

function initSwipers() {
  if (typeof Swiper === "undefined") {
    return;
  }

  const skillsRoot = document.querySelector(".skills-swiper");
  if (skillsRoot) {
    new Swiper(skillsRoot, {
      slidesPerView: 1,
      spaceBetween: 18,
      centeredSlides: true,
      grabCursor: true,
      autoHeight: true,
      navigation: {
        prevEl: ".skills-swiper-prev",
        nextEl: ".skills-swiper-next",
      },
      keyboard: { enabled: true },
      a11y: { enabled: true },
    });
  }

  const projectsRoot = document.querySelector(".projects-swiper");
  if (projectsRoot) {
    new Swiper(projectsRoot, {
      slidesPerView: 1.08,
      spaceBetween: 16,
      centeredSlides: true,
      grabCursor: true,
      pagination: {
        el: ".projects-swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1.35, spaceBetween: 18 },
        900: { slidesPerView: 2.1, spaceBetween: 20 },
        1100: { slidesPerView: 3, spaceBetween: 20, centeredSlides: false },
      },
      keyboard: { enabled: true },
      a11y: { enabled: true },
    });
  }
}

function initGLightbox() {
  if (typeof GLightbox === "undefined") {
    return;
  }

  GLightbox({
    selector: ".glightbox",
    skin: "clean",
    touchNavigation: true,
    loop: true,
    autoplayVideos: false,
    openEffect: reduceMotionGlobal ? "none" : "fade",
    closeEffect: reduceMotionGlobal ? "none" : "fade",
    slideEffect: reduceMotionGlobal ? "none" : "slide",
  });
}

function initContactForm() {
  const form = document.getElementById("contactForm");
  const statusEl = document.getElementById("formStatus");
  const submitBtn = document.getElementById("contactSubmit");
  if (!form || !statusEl) {
    return;
  }

  const actionUrl = form.getAttribute("action") ?? "";
  const formspreeReady = actionUrl.includes("formspree.io/f/") && !actionUrl.includes("YOUR_FORM_ID");

  if (!formspreeReady) {
    statusEl.textContent =
      "Configure Formspree : remplace YOUR_FORM_ID dans l'attribut action du formulaire.";
    statusEl.dataset.state = "warn";
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    statusEl.textContent = "";
    statusEl.dataset.state = "";

    if (!form.reportValidity()) {
      return;
    }

    submitBtn?.setAttribute("disabled", "true");
    statusEl.textContent = "Envoi en cours...";
    statusEl.dataset.state = "pending";

    const formData = new FormData(form);
    const subjectInput = form.querySelector('[name="subject"]');
    const hiddenSubject = form.querySelector("#contactFormSubject");
    if (subjectInput instanceof HTMLInputElement && hiddenSubject instanceof HTMLInputElement) {
      const subjectValue = subjectInput.value.trim();
      hiddenSubject.value = subjectValue
        ? `[Portfolio] ${subjectValue}`
        : "Nouveau message portfolio";
      formData.set("_subject", hiddenSubject.value);
    }

    try {
      const response = await fetch(actionUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok) {
        form.reset();
        statusEl.textContent =
          "Message recu par Formspree. Verifie ta boite mail (et les spams). Si rien n'arrive, confirme le formulaire dans ton dashboard Formspree.";
        statusEl.dataset.state = "success";
      } else {
        const apiError =
          typeof payload.error === "string"
            ? payload.error
            : Array.isArray(payload.errors) && payload.errors[0]?.message
              ? payload.errors[0].message
              : "Erreur lors de l'envoi.";

        const isFormNotFound =
          response.status === 404 ||
          payload.errors?.some((entry) => entry.code === "FORM_NOT_FOUND");

        statusEl.textContent = isFormNotFound
          ? "Formulaire introuvable : verifie l'ID Formspree (meewlnrz) et recharge la page (Ctrl+F5). Ouvre le site via http://localhost, pas en fichier local."
          : apiError;
        statusEl.dataset.state = "error";
      }
    } catch {
      statusEl.textContent = "Connexion impossible. Reessaie ou utilise l'email direct.";
      statusEl.dataset.state = "error";
    } finally {
      submitBtn?.removeAttribute("disabled");
    }
  });
}

function initMobileNav() {
  const burger = document.getElementById("navBurger");
  const backdrop = document.getElementById("navBackdrop");
  const mobileNav = document.getElementById("siteNavMobile");
  const navLinks = document.querySelectorAll(".nav-links a");
  const mobileNavQuery = window.matchMedia("(max-width: 1024px)");

  if (!burger || !mobileNav) {
    return;
  }

  const isOpen = () => document.body.classList.contains("nav-open");

  const setNavOpen = (open) => {
    document.body.classList.toggle("nav-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
    mobileNav.toggleAttribute("aria-hidden", !open);

    if (lenisInstance) {
      if (open) {
        lenisInstance.stop();
      } else {
        lenisInstance.start();
      }
    }
  };

  burger.addEventListener("click", () => {
    setNavOpen(!isOpen());
  });

  backdrop?.addEventListener("click", () => {
    setNavOpen(false);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileNavQuery.matches) {
        setNavOpen(false);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setNavOpen(false);
      burger.focus();
    }
  });

  window.addEventListener("resize", () => {
    if (!mobileNavQuery.matches && isOpen()) {
      setNavOpen(false);
    }
  });

  mobileNav.setAttribute("aria-hidden", "true");
}

function initNavActiveSection() {
  const navLinks = document.querySelectorAll(".nav-links a[data-nav]");
  if (!navLinks.length) {
    return;
  }

  const sectionMap = new Map();
  navLinks.forEach((link) => {
    const id = link.getAttribute("data-nav");
    const section = id ? document.getElementById(id) : null;
    if (section) {
      sectionMap.set(section, link);
    }
  });

  const sections = [...sectionMap.keys()];
  if (!sections.length) {
    return;
  }

  const setActive = (activeLink) => {
    navLinks.forEach((link) => {
      link.classList.toggle("is-active", link === activeLink);
    });
  };

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        const link = sectionMap.get(visible[0].target);
        if (link) {
          setActive(link);
        }
        return;
      }

      if (window.scrollY < 120) {
        navLinks.forEach((link) => link.classList.remove("is-active"));
      }
    },
    {
      threshold: [0.12, 0.3, 0.5],
      rootMargin: `-${headerOffset()}px 0px -58% 0px`,
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

initLenis();
initMobileNav();
initNavActiveSection();
initSwipers();
initGsapScrollTrigger();
initGLightbox();
initContactForm();

if (typeof ScrollTrigger !== "undefined") {
  window.requestAnimationFrame(() => ScrollTrigger.refresh());
}

const sectionTitleFocusElements = document.querySelectorAll("main .section");
if (sectionTitleFocusElements.length) {
  const sectionFocusObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("in-view-section", entry.isIntersecting);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "-12% 0px -55% 0px",
    }
  );

  sectionTitleFocusElements.forEach((section) => sectionFocusObserver.observe(section));
}

if (socialTyping) {
  const fullText = socialTyping.dataset.text ?? "";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let hasStarted = false;
  const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const runTypingLoop = async () => {
    if (reduceMotion) {
      socialTyping.textContent = fullText;
      return;
    }

    while (true) {
      for (let index = 1; index <= fullText.length; index += 1) {
        socialTyping.textContent = fullText.slice(0, index);
        await wait(55);
      }

      await wait(1500);
      socialTyping.textContent = "";
      await wait(450);
    }
  };

  const typingObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!hasStarted) {
            hasStarted = true;
            runTypingLoop();
          }
          typingObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  typingObserver.observe(socialTyping);
}

/** Langages highlight.js alignes sur chaque carte (HTML/XML, CSS, JS, PHP, C#, Python) */
const SKILL_HIGHLIGHT_LANG = {
  html: "xml",
  css: "css",
  javascript: "javascript",
  php: "php",
  performance: "xml",
  ux: "xml",
  csharp: "csharp",
  python: "python",
  mysql: "sql",
};

function escapeHtmlForCode(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function highlightSkillCode(lang, code) {
  if (typeof hljs !== "undefined" && typeof hljs.highlight === "function") {
    try {
      return hljs.highlight(code, { language: lang, ignoreIllegals: true }).value;
    } catch {
      /* fallthrough */
    }
  }
  return escapeHtmlForCode(code);
}

const SKILL_CODE_SNIPPETS = {
  html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>...</title>
</head>
<body>
  <header>...</header>
  <main>...</main>
  <footer>...</footer>
</body>
</html>`,

  css: `:root {
  --accent: #34d399;
}
@media (max-width: 768px) {
  .grid { gap: 1rem; }
}
.card:hover {
  transform: translateY(-4px);
}`,

  javascript: `document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".btn");
  btn?.addEventListener("click", () => {
    console.log("ready");
  });
});`,

  php: `<?php
declare(strict_types=1);
$name = filter_input(INPUT_POST, "name", FILTER_SANITIZE_SPECIAL_CHARS);
echo htmlspecialchars($name ?? "", ENT_QUOTES, "UTF-8");
?>`,

  performance: `<link rel="preload" href="/font.woff2" as="font" crossorigin>
<img src="/hero.webp" width="1200" height="630" loading="lazy" alt="">
<script type="module" src="/app.js"></script>`,

  ux: `<button type="button" aria-expanded="false" aria-controls="menu">
  Menu
</button>
<nav aria-label="Principal">
  <ul>...</ul>
</nav>`,

  csharp: `using System;
namespace Demo;
class Program {
  static void Main() {
    Console.WriteLine("Hello");
  }
}`,

  python: `def greet(name: str) -> str:
    return f"Hello, {name}"

if __name__ == "__main__":
    print(greet("world"))`,

  mysql: `CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(180) UNIQUE
);

SELECT nom, email
FROM clients
ORDER BY id DESC
LIMIT 5;`,
};

const skillsSection = document.getElementById("skills");
if (skillsSection) {
  const skillCards = skillsSection.querySelectorAll(".skill-card");
  const reduceMotionSkills = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const waitSkill = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

  const runSkillCodeLoop = async (el, fullText, lang) => {
    el.classList.add("hljs");

    if (reduceMotionSkills) {
      el.innerHTML = highlightSkillCode(lang, fullText);
      return;
    }

    while (true) {
      for (let i = 1; i <= fullText.length; i += 1) {
        el.innerHTML = highlightSkillCode(lang, fullText.slice(0, i));
        await waitSkill(28);
      }
      await waitSkill(1400);
      el.innerHTML = "";
      await waitSkill(420);
    }
  };

  const startSkillTyping = (card, index = 0) => {
    if (!card || card.dataset.typingStarted === "true") {
      return;
    }

    const key = card.dataset.skill?.trim().toLowerCase();
    const codeEl = card.querySelector(".skill-code-demo");
    if (!codeEl || !key) {
      return;
    }

    const snippet = SKILL_CODE_SNIPPETS[key];
    if (!snippet) {
      return;
    }

    card.dataset.typingStarted = "true";
    const hlLang = SKILL_HIGHLIGHT_LANG[key] ?? "xml";
    const initialPreview = snippet.split("\n").slice(0, 2).join("\n");
    codeEl.innerHTML = highlightSkillCode(hlLang, initialPreview);
    window.setTimeout(() => {
      runSkillCodeLoop(codeEl, snippet, hlLang);
    }, index * 140);
  };

  // Demarrage direct pour garantir l'affichage sur toutes les cartes, y compris MySQL.
  skillCards.forEach((card, index) => startSkillTyping(card, index));
}

const storedTheme = localStorage.getItem("theme");
if (storedTheme === "light") {
  document.body.classList.add("light");
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  localStorage.setItem("theme", isLight ? "light" : "dark");
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.refresh();
  }
});

