/* mobile menu */
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");

burger?.addEventListener("click", () => {
  const isOpen = drawer.classList.toggle("open");
  burger.setAttribute("aria-expanded", String(isOpen));
});

drawer?.addEventListener("click", (e) => {
  const t = e.target;
  if (t && t.tagName === "A") {
    drawer.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
});


/* footer year */
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
