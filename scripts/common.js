(() => {
  const RELEASE_API = "https://api.github.com/repos/HeZeBang/TechPie-flutter/releases/latest";
  const RELEASE_FALLBACK = {
    version: "v1.0.8",
    tag: "v1.0.8+31",
    url: "https://github.com/HeZeBang/TechPie-flutter/releases/latest",
    publishedAt: "",
    assets: []
  };

  /* Theme */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("techpie-theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initialTheme);

  function initThemeToggle() {
    const btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("techpie-theme", next);
    });
  }

  /* Animated Starfield Canvas */
  function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let stars = [];
    let rafId = null;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(115, Math.max(48, Math.floor((width * height) / 17000)));
      stars = Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          size: r < 0.72 ? 1.1 : r < 0.94 ? 1.7 : 2.3,
          baseAlpha: 0.14 + Math.random() * 0.34,
          phase: Math.random() * Math.PI * 2,
          speed: 0.35 + Math.random() * 0.75,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08
        };
      });
    }

    function draw(now) {
      ctx.clearRect(0, 0, width, height);
      const isDark = root.getAttribute("data-theme") === "dark";
      const rgb = isDark ? "235,235,235" : "120,120,120";
      const t = (now || 0) * 0.001;

      for (const s of stars) {
        if (!reduced) {
          s.x = (s.x + s.vx + width) % width;
          s.y = (s.y + s.vy + height) % height;
        }
        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * s.speed + s.phase);
        ctx.fillStyle = `rgba(${rgb},${(s.baseAlpha * twinkle).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      if (!reduced) {
        rafId = requestAnimationFrame(draw);
      }
    }

    resize();
    draw(0);
    window.addEventListener("resize", () => {
      resize();
      if (reduced) draw(0);
    });
    document.addEventListener("visibilitychange", () => {
      if (reduced) return;
      if (document.hidden && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!document.hidden && !rafId) {
        rafId = requestAnimationFrame(draw);
      }
    });
  }

  /* Scroll Reveal */
  function initReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );
    els.forEach((el) => io.observe(el));
  }

  /* Latest GitHub Release */
  async function getLatestRelease() {
    const cacheKey = "techpie-latest-release-v1";
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Date.now() - parsed.ts < 10 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch (_) {}

    try {
      const res = await fetch(RELEASE_API, {
        headers: { Accept: "application/vnd.github+json" }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const rawTag = (json.tag_name || json.name || RELEASE_FALLBACK.version).trim();
      const cleanVer = rawTag.split("+")[0];
      const data = {
        version: cleanVer.startsWith("v") ? cleanVer : `v${cleanVer}`,
        tag: rawTag,
        url: json.html_url || RELEASE_FALLBACK.url,
        publishedAt: json.published_at ? json.published_at.slice(0, 10) : "",
        assets: Array.isArray(json.assets)
          ? json.assets.map((a) => ({ name: a.name, url: a.browser_download_url }))
          : []
      };
      try {
        sessionStorage.setItem(cacheKey, JSON.stringify({ ts: Date.now(), data }));
      } catch (_) {}
      return data;
    } catch (_) {
      return RELEASE_FALLBACK;
    }
  }

  async function hydrateVersion() {
    const release = await getLatestRelease();
    document.querySelectorAll(".js-latest-version").forEach((el) => {
      el.textContent = release.version;
      if (el.tagName === "A") {
        el.href = release.url;
      }
    });
    window.dispatchEvent(new CustomEvent("techpie:release", { detail: release }));
    return release;
  }

  window.TechPie = { getLatestRelease };

  document.addEventListener("DOMContentLoaded", () => {
    initThemeToggle();
    initStarfield();
    initReveal();
    hydrateVersion();
  });
})();
