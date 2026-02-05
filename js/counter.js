(() => {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const animateCount = (el) => {
    const target = Number(el.dataset.count || 0);
    const suffix = el.dataset.suffix || "";
    const duration = 1500; 
    const start = performance.now();


    if (prefersReduced) {
      el.textContent = `${target}${suffix}`;
      return;
    }

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
  
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      el.textContent = `${value}${suffix}`;

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const el = entry.target;
      if (el.dataset.done === "1") continue;

      el.dataset.done = "1";
      animateCount(el);
    }
  }, { threshold: 0.45 });

  counters.forEach((c) => io.observe(c));
})();
