const form = document.querySelector('form[name="kontakt"]');

if (form) {
  const msgEl = form.querySelector(".formMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (msgEl) {
      msgEl.textContent = "Odesílám...";
      msgEl.className = "formMsg";
    }

    const formData = new FormData(form);

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
      });

      if (!res.ok) throw new Error("Network response not ok");

      if (msgEl) {
        msgEl.textContent = "Díky, zpráva je odeslaná. Ozveme se co nejdřív.";
        msgEl.className = "formMsg isOk";
      }

      form.reset();

      setTimeout(() => {
        if (msgEl) msgEl.textContent = "";
      }, 3000);

    } catch (err) {
      if (msgEl) {
        msgEl.textContent = "Něco se pokazilo. Zkuste to prosím znovu, nebo napište na info@mpdoors.cz.";
        msgEl.className = "formMsg isErr";
      }
    }
  });
}
