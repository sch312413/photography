// =====================================================================
// gallery.js — builds every photo-driven part of the site from
// CATEGORIES / PHOTOS in js/data.js:
//   - home: hero slideshow, "Selected work", collection covers
//   - photos.html: collection index, or one collection when the URL is
//     photos.html?category=<id>
//   - the full-screen viewer shared by every gallery
// =====================================================================

const $ = (id) => document.getElementById(id);

function categoryById(id) {
  return CATEGORIES.find((c) => c.id === id);
}

function photosIn(id) {
  return PHOTOS.filter((p) => p.category === id);
}

function plural(n, word) {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

function escapeHtml(s = "") {
  return s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

// Fade each image in once it has actually loaded.
function fadeIn(img) {
  img.classList.add("fade");
  const done = () => img.classList.add("is-loaded");
  if (img.complete && img.naturalWidth) done();
  else img.addEventListener("load", done, { once: true });
}


// ---------------------------------------------------------------------
// JUSTIFIED GALLERY — rows of equal height, no cropping (see .justified
// in css/style.css). Needs each photo's w/h from data.js.
// ---------------------------------------------------------------------

function renderJustified(container, photos) {
  if (!container) return;
  container.innerHTML = "";

  photos.forEach((photo, index) => {
    const ratio = photo.w && photo.h ? photo.w / photo.h : 1.5;
    const tile = document.createElement("button");
    tile.type = "button";
    tile.className = "tile";
    tile.style.setProperty("--r", ratio.toFixed(4));
    tile.setAttribute("aria-label", `View “${photo.title}”`);
    tile.innerHTML = `<img src="${photo.src}" alt="${escapeHtml(photo.title)}" width="${photo.w || ""}" height="${photo.h || ""}" loading="lazy" decoding="async" />`;
    fadeIn(tile.querySelector("img"));
    tile.dataset.r = ratio;
    tile.addEventListener("click", () => openViewer(photos, index, tile));
    container.appendChild(tile);
  });

  fitRows(container);
  if ("ResizeObserver" in window) {
    let lastWidth = 0;
    new ResizeObserver(() => {
      if (container.clientWidth !== lastWidth) {
        lastWidth = container.clientWidth;
        fitRows(container);
      }
    }).observe(container);
  }
}

// Packs tiles into rows that exactly fill the container width. The
// last row is stretched too if it's mostly full (and wouldn't get much
// taller); otherwise it stays at the normal row height.
function fitRows(container) {
  const tiles = [...container.children];
  const styles = getComputedStyle(container);
  const width = container.clientWidth;
  const target = parseFloat(styles.getPropertyValue("--row")) || 300;
  const gap = parseFloat(styles.columnGap) || 0;
  if (!width) return;

  let row = [];
  let sum = 0;

  const place = (items, h) => {
    items.forEach((t) => {
      t.style.flex = "0 0 auto";
      t.style.width = `${Math.floor(t.dataset.r * h * 100) / 100}px`;
      t.style.height = `${Math.floor(h * 100) / 100}px`;
    });
  };

  tiles.forEach((tile) => {
    row.push(tile);
    sum += Number(tile.dataset.r);
    const natural = sum * target + gap * (row.length - 1);
    if (natural >= width) {
      place(row, (width - gap * (row.length - 1)) / sum);
      row = [];
      sum = 0;
    }
  });

  if (row.length) {
    const natural = sum * target + gap * (row.length - 1);
    const fill = (width - gap * (row.length - 1)) / sum;
    place(row, natural >= width * 0.65 && fill <= target * 1.3 ? fill : target);
  }
}


// ---------------------------------------------------------------------
// COLLECTION COVERS (home + photos.html)
// ---------------------------------------------------------------------

function renderCollections(container) {
  if (!container) return;

  CATEGORIES.forEach((cat) => {
    const photos = photosIn(cat.id);
    if (!photos.length) return;
    const cover = cat.cover || photos[0].src;

    const card = document.createElement("a");
    card.className = "collection-card";
    card.href = `photos.html?category=${encodeURIComponent(cat.id)}`;
    card.innerHTML = `
      <div class="collection-card-frame">
        <img src="${cover}" alt="" loading="lazy" decoding="async" />
      </div>
      <div class="collection-card-label">
        <h3>${escapeHtml(cat.label)}</h3>
        <span class="collection-card-count">${plural(photos.length, "photograph")}</span>
      </div>`;
    fadeIn(card.querySelector("img"));
    container.appendChild(card);
  });
}


// ---------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------

function renderHome() {
  const slides = $("hero-slides");
  if (slides) {
    PHOTOS.filter((p) => p.hero).forEach((photo, i) => {
      const slide = document.createElement("div");
      slide.className = "hero-slide";
      slide.dataset.title = photo.title;
      slide.dataset.place = photo.place || categoryById(photo.category)?.label || "";
      slide.innerHTML = `<img src="${photo.src}" alt="${escapeHtml(photo.title)}" ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />`;
      slides.appendChild(slide);
    });
  }

  const selected = PHOTOS.filter((p) => p.featured)
    .sort((a, b) => (Number(a.featured) || 99) - (Number(b.featured) || 99));
  renderJustified($("selected-grid"), selected);
  renderCollections($("home-collections"));
}


// ---------------------------------------------------------------------
// PHOTOS PAGE — index, or a single collection via ?category=<id>
// ---------------------------------------------------------------------

function renderPhotosPage() {
  const index = $("collections-index");
  const single = $("collection-view");
  if (!index || !single) return;

  const id = new URLSearchParams(location.search).get("category");
  const cat = categoryById(id);

  if (!cat) {
    renderCollections($("collections-grid"));
    return;
  }

  index.hidden = true;
  single.hidden = false;

  const photos = photosIn(cat.id);
  const places = [...new Set(photos.map((p) => p.place).filter(Boolean))];

  document.title = `${cat.label} — Sharon Chen`;
  $("collection-title").textContent = cat.label;
  $("collection-sub").textContent =
    [plural(photos.length, "photograph"), places.join(" and ")].filter(Boolean).join(", ");

  renderJustified($("collection-grid"), photos);

  const i = CATEGORIES.indexOf(cat);
  const next = CATEGORIES[(i + 1) % CATEGORIES.length];
  const nextLink = $("next-collection");
  nextLink.href = `photos.html?category=${encodeURIComponent(next.id)}`;
  nextLink.querySelector("strong").textContent = next.label;
}


// ---------------------------------------------------------------------
// VIEWER — full-screen, keyboard + swipe, focus returns on close
// ---------------------------------------------------------------------

const viewer = $("viewer");
let set = [];
let at = 0;
let returnFocus = null;

function openViewer(photos, index, trigger) {
  if (!viewer) return;
  set = photos;
  at = index;
  returnFocus = trigger || null;
  show();
  viewer.hidden = false;
  requestAnimationFrame(() => viewer.classList.add("is-open"));
  document.body.style.overflow = "hidden";
  $("viewer-close").focus();
}

function closeViewer() {
  viewer.classList.remove("is-open");
  viewer.hidden = true;
  document.body.style.overflow = "";
  returnFocus?.focus();
}

function show() {
  const photo = set[at];
  const img = $("viewer-photo");
  img.src = photo.src;
  img.alt = photo.title;
  $("viewer-title").textContent = photo.title;
  $("viewer-place").textContent = photo.place || categoryById(photo.category)?.label || "";
  $("viewer-count").textContent = `${at + 1} / ${set.length}`;

  // Warm the cache for the neighbours so arrowing through feels instant.
  [at + 1, at - 1].forEach((n) => {
    const p = set[(n + set.length) % set.length];
    if (p) new Image().src = p.src;
  });
}

function step(dir) {
  at = (at + dir + set.length) % set.length;
  show();
}

if (viewer) {
  $("viewer-close").addEventListener("click", closeViewer);
  $("viewer-prev").addEventListener("click", () => step(-1));
  $("viewer-next").addEventListener("click", () => step(1));

  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "Tab") {
      // keep focus inside the viewer while it's open
      const f = [...viewer.querySelectorAll("button")];
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  let startX = null;
  viewer.addEventListener("touchstart", (e) => { startX = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1);
    startX = null;
  });
}

renderHome();
renderPhotosPage();
