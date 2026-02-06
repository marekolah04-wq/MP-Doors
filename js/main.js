/* mobile menu */
const burger = document.getElementById("burger");
const drawer = document.getElementById("drawer");

const openDrawer = () => {
  drawer?.classList.add("open");
  burger?.setAttribute("aria-expanded", "true");
};

const closeDrawer = () => {
  drawer?.classList.remove("open");
  burger?.setAttribute("aria-expanded", "false");
};

burger?.addEventListener("click", () => {
  const isOpen = drawer?.classList.contains("open");
  isOpen ? closeDrawer() : openDrawer();
});

// zavřít po kliku na link
drawer?.querySelectorAll("a").forEach((a) => {
  a.addEventListener("click", closeDrawer);
});

// zavřít na ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeDrawer();
});

// zavřít klikem mimo (optional, ale UX top)
document.addEventListener("click", (e) => {
  if (!drawer || !burger) return;
  const clickedInsideDrawer = drawer.contains(e.target);
  const clickedBurger = burger.contains(e.target);
  if (!clickedInsideDrawer && !clickedBurger) closeDrawer();
});




/* footer year */
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* scroll to top */
const toTop = document.getElementById("toTop");
window.addEventListener("scroll", () => {
  if (!toTop) return;
  toTop.classList.toggle("is-visible", window.scrollY > 700);
});
toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

