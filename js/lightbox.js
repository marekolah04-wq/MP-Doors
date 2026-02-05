(() => {
  const dialog = document.getElementById("lightbox");
  if (!dialog) return;

  const imgInDialog = dialog.querySelector(".lightbox__img");
  const closeBtn = dialog.querySelector(".lightbox__close");

  const open = (src, alt) => {
    imgInDialog.src = src;
    imgInDialog.alt = alt || "Zvětšená fotografie";
    dialog.showModal();
  };

  const close = () => dialog.close();

  document.querySelectorAll("[data-lightbox]").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.addEventListener("click", () => open(img.src, img.alt));
  });

  closeBtn?.addEventListener("click", close);

  dialog.addEventListener("click", (e) => {
    // klik mimo obrázek zavře
    const rect = dialog.getBoundingClientRect();
    const isInDialog =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    if (!isInDialog) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && dialog.open) close();
  });
})();
