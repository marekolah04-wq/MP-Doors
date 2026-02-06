const dialog = document.getElementById("lightbox");
const imgEl = dialog?.querySelector(".lightbox__img");
const btnClose = dialog?.querySelector(".lightbox__close");
const btnPrev = dialog?.querySelector(".lightbox__nav--prev");
const btnNext = dialog?.querySelector(".lightbox__nav--next");

const thumbs = Array.from(document.querySelectorAll("[data-lightbox]"));

let currentIndex = -1;

const showIndex = (idx) => {
  if (!dialog || !imgEl || thumbs.length === 0) return;

  // wrap-around
  if (idx < 0) idx = thumbs.length - 1;
  if (idx >= thumbs.length) idx = 0;

  currentIndex = idx;

  const src = thumbs[currentIndex].getAttribute("src");
  const alt = thumbs[currentIndex].getAttribute("alt") || "Fotografie";

  imgEl.src = src;
  imgEl.alt = alt;

  // pokud chceš bez wrap-around, tak tady místo toho schovávej šipky na krajích
  // wrap-around: šipky vždy viditelné
  btnPrev?.classList.toggle("is-hidden", thumbs.length < 2);
  btnNext?.classList.toggle("is-hidden", thumbs.length < 2);
};

const openAt = (idx) => {
  if (!dialog) return;

  // zruší focus ring z minula (řeší i ten tvůj problém s "zakroužkováním")
  document.activeElement?.blur?.();

  dialog.showModal();
  showIndex(idx);

  // aby se nefocusoval close button automaticky po otevření
  dialog.addEventListener("close", () => document.activeElement?.blur?.(), { once: true });
};

const closeLb = () => {
  if (!dialog) return;
  dialog.close();
};

thumbs.forEach((el, idx) => {
  el.style.cursor = "zoom-in";
  el.addEventListener("click", () => openAt(idx));
});

btnClose?.addEventListener("click", closeLb);
btnPrev?.addEventListener("click", () => showIndex(currentIndex - 1));
btnNext?.addEventListener("click", () => showIndex(currentIndex + 1));

// klik mimo obrázek zavře
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) closeLb();
});

// ESC zavře (dialog to umí sám, ale necháme to konzistentní)
document.addEventListener("keydown", (e) => {
  if (!dialog?.open) return;

  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") showIndex(currentIndex - 1);
  if (e.key === "ArrowRight") showIndex(currentIndex + 1);
});

/* swipe na mobilu (volitelné, ale lidi to milujou) */
let startX = 0;
let startY = 0;

dialog?.addEventListener("touchstart", (e) => {
  if (!dialog.open) return;
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
}, { passive: true });

dialog?.addEventListener("touchend", (e) => {
  if (!dialog.open) return;
  const t = e.changedTouches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;

  // ignoruj vertikální scroll gesta
  if (Math.abs(dy) > Math.abs(dx)) return;

  if (dx > 40) showIndex(currentIndex - 1);
  if (dx < -40) showIndex(currentIndex + 1);
});
