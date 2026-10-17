// =====================================================================
// main.js — small things shared by every page:
//   - footer year
//   - the home page hero slideshow (slides are built by gallery.js)
// =====================================================================

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ---------------------------------------------------------------------
// HERO SLIDESHOW
// Crossfades between the hero photos every few seconds and keeps the
// caption line underneath in sync. Pauses while the tab is hidden or
// the pointer is over the photo; doesn't auto-advance at all if the
// visitor's system asks for reduced motion.
// ---------------------------------------------------------------------

const HERO_INTERVAL_MS = 6000;

(function initHero() {
  const hero = document.getElementById("hero");
  if (!hero) return;

  const slides = [...hero.querySelectorAll(".hero-slide")];
  if (!slides.length) return;

  const title = document.getElementById("hero-title");
  const place = document.getElementById("hero-place");
  const count = document.getElementById("hero-count");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = 0;
  let timer = null;

  function show(i) {
    slides[current].classList.remove("is-active");
    current = (i + slides.length) % slides.length;
    const s = slides[current];
    s.classList.add("is-active");
    title.textContent = s.dataset.title;
    place.textContent = s.dataset.place;
    count.textContent = `${current + 1} / ${slides.length}`;
  }

  function start() {
    stop();
    if (!reduceMotion && slides.length > 1) {
      timer = setInterval(() => show(current + 1), HERO_INTERVAL_MS);
    }
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  document.getElementById("hero-prev").addEventListener("click", () => { show(current - 1); start(); });
  document.getElementById("hero-next").addEventListener("click", () => { show(current + 1); start(); });

  hero.addEventListener("mouseenter", stop);
  hero.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));

  current = 0;
  slides[0].classList.add("is-active");
  show(0);
  start();
})();
