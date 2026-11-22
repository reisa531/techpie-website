(() => {
  function highlightHash() {
    const id = window.location.hash.replace(/^#/, "");
    if (!id) return;
    const section = document.getElementById(id);
    if (!section) return;

    document.querySelectorAll(".doc-section.flash").forEach((s) => s.classList.remove("flash"));
    section.classList.remove("hidden");
    section.classList.add("flash");
    setTimeout(() => section.classList.remove("flash"), 2200);

    document.querySelectorAll(".docs-nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  }

  function initSearch() {
    const input = document.getElementById("docs-search");
    if (!input) return;
    const sections = Array.from(document.querySelectorAll(".doc-section"));

    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      sections.forEach((sec) => {
        const text = (sec.dataset.keywords + " " + sec.textContent).toLowerCase();
        sec.classList.toggle("hidden", Boolean(q) && !text.includes(q));
      });
    });
  }

  function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll(".doc-section"));
    const links = Array.from(document.querySelectorAll(".docs-nav-link"));
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (!visible) return;
        const id = visible.target.id;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0.05 }
    );

    sections.forEach((s) => io.observe(s));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initSearch();
    initScrollSpy();
    highlightHash();
    window.addEventListener("hashchange", highlightHash);
  });
})();
