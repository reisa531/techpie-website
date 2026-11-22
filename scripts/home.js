(() => {
  const ICONS = {
    cal: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    wallet: '<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
    video: '<path d="m16 13 5.2 3.1a.5.5 0 0 0 .8-.4V8.3a.5.5 0 0 0-.8-.4L16 11"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    spark: '<path d="M12 3l1.9 5.8 5.8 1.9-5.8 1.9L12 18.4l-1.9-5.8-5.8-1.9 5.8-1.9z"/><path d="M5 3v4M3 5h4M19 17v4M17 19h4"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/>',
    tennis: '<circle cx="12" cy="12" r="9"/><path d="M6 5.3a9 9 0 0 1 0 13.4M18 5.3a9 9 0 0 0 0 13.4"/>',
    door: '<path d="M13 4h3a2 2 0 0 1 2 2v14M2 20h3M13 20h9M10 12v.01"/><path d="M13 4.6v16.1a.5.5 0 0 1-.6.5l-4.8-1.1A2 2 0 0 1 6 18.2V5.6a2 2 0 0 1 1.2-1.9l4.4-1.7a1 1 0 0 1 1.4.9z"/>',
    course: '<path d="M2 3h20v13H2z"/><path d="M8 21h8M12 16v5"/>',
    more: '<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    watch: '<circle cx="12" cy="12" r="6"/><path d="M12 10v2l1 1M16.1 7.7l-.8-4.1a2 2 0 0 0-2-1.6h-2.7a2 2 0 0 0-2 1.6l-.8 4.1M7.9 16.4l.8 4a2 2 0 0 0 2 1.6h2.7a2 2 0 0 0 2-1.6l.8-4"/>',
    widget: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    git: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.1-1.3-.3-2.5-1-3.5.3-1.2.3-2.4 0-3.5 0 0-1 0-3 1.5a10.6 10.6 0 0 0-6 0C7 2 6 2 6 2c-.3 1.1-.3 2.3 0 3.5-.7 1-1.1 2.2-1 3.5 0 3.5 3 5.5 6 5.5-.4.5-.7 1-.8 1.6-.2.6-.2 1.2-.2 1.9v4"/><path d="M9 18c-4.5 2-5-2-7-2"/>'
  };

  const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[k]}</svg>`;

  /* Orbit rings & clickable feature circles -> docs.html#<section> */
  function initOrbit() {
    const root = document.getElementById("orbit-system");
    if (!root) return;

    const rings = [
      {
        radius: 218,
        dur: "46s",
        reverse: false,
        items: [
          { deg: -152, icon: "cal", label: "课表 & 考试", href: "docs.html#schedule", accent: true },
          { deg: -18, icon: "watch", label: "Apple Watch", href: "docs.html#watch" },
          { deg: 174, icon: "widget", label: "桌面小组件", href: "docs.html#widgets" }
        ]
      },
      {
        radius: 286,
        dur: "68s",
        reverse: true,
        items: [
          { deg: -128, icon: "spark", label: "GenAI API", href: "docs.html#genai" },
          { deg: -48, icon: "git", label: "GitHub 开源仓库", href: "https://github.com/HeZeBang/TechPie-flutter", external: true },
          { deg: -4, icon: "clock", label: "Deadlines", href: "docs.html#deadlines" },
          { deg: 48, icon: "video", label: "课程录播 ELRC", href: "docs.html#elrc" },
          { deg: -170, icon: "tennis", label: "体育场馆预约", href: "docs.html#gym" },
          { deg: 126, icon: "wallet", label: "校园卡付款码", href: "docs.html#campus-card", accent: true }
        ]
      }
    ];

    rings.forEach((ring) => {
      const circle = document.createElement("div");
      circle.className = "orbit-ring";
      circle.style.width = circle.style.height = `${ring.radius * 2}px`;
      root.appendChild(circle);

      const track = document.createElement("div");
      track.className = `orbit-track${ring.reverse ? " reverse" : ""}`;
      track.style.setProperty("--dur", ring.dur);

      ring.items.forEach((item) => {
        const anchor = document.createElement("div");
        anchor.className = "orbit-anchor";
        anchor.style.setProperty("--deg", `${item.deg}deg`);
        anchor.style.setProperty("--radius", `${ring.radius}px`);

        const a = document.createElement("a");
        a.className = `orbit-bubble${item.accent ? " accent" : ""}`;
        a.href = item.href;
        a.setAttribute("aria-label", `${item.label} 文档`);
        if (item.external) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
        a.innerHTML = `${svg(item.icon)}<span class="orbit-tip">${item.label}<span>${item.external ? "↗" : "文档 →"}</span></span>`;

        anchor.appendChild(a);
        track.appendChild(anchor);
      });

      root.appendChild(track);
    });
  }

  /* Phone Feature Grid (mirrors lib/models/feature.dart) */
  function initPhoneGrid() {
    const grid = document.getElementById("phone-feature-grid");
    if (!grid) return;
    const feats = [
      ["spark", "GenAI API", "docs.html#genai"],
      ["video", "课程录播", "docs.html#elrc"],
      ["course", "E云课堂", "docs.html#elrc"],
      ["door", "学生请假", "docs.html#campus-card"],
      ["wallet", "校园卡", "docs.html#campus-card"],
      ["tennis", "场馆预约", "docs.html#gym"],
      ["qr", "学生活动", "docs.html#schedule"],
      ["more", "更多文档", "docs.html"]
    ];
    grid.innerHTML = feats
      .map(
        ([k, name, href]) =>
          `<a class="p-feat" href="${href}" title="查看 ${name} 文档"><div class="ic">${svg(k)}</div><span>${name}</span></a>`
      )
      .join("");
  }

  /* Interactive Phone Tab Bar */
  function initPhoneTabs() {
    const tabs = document.querySelectorAll(".phone-tab");
    const views = document.querySelectorAll(".phone-view");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.dataset.tab;
        tabs.forEach((t) => t.classList.toggle("active", t === tab));
        views.forEach((v) => v.classList.toggle("active", v.dataset.view === target));
      });
    });
  }

  /* Smooth 3D Pointer Parallax on Showcase */
  function initParallax() {
    const showcase = document.querySelector(".showcase");
    const stage = document.querySelector(".showcase-stage");
    if (!showcase || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let running = false;

    function tick() {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      stage.style.transform = `rotateX(${cy.toFixed(2)}deg) rotateY(${cx.toFixed(2)}deg)`;
      if (Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02) {
        requestAnimationFrame(tick);
      } else {
        running = false;
      }
    }

    showcase.addEventListener("pointermove", (e) => {
      const rect = showcase.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      tx = nx * 8;
      ty = -ny * 7;
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    });

    showcase.addEventListener("pointerleave", () => {
      tx = 0;
      ty = 0;
      if (!running) {
        running = true;
        requestAnimationFrame(tick);
      }
    });
  }

  /* OS Detection & Dynamic GitHub Release Download Links */
  function detectOS() {
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) return "apple";
    if (/Android/i.test(ua)) return "android";
    if (/HarmonyOS|OpenHarmony/i.test(ua)) return "harmony";
    if (/Macintosh|Mac OS X/i.test(ua)) return "apple";
    if (/Windows/i.test(ua)) return "windows";
    if (/Linux/i.test(ua)) return "linux";
    return "";
  }

  function wireDownloads(release) {
    const os = detectOS();
    if (os) {
      const card = document.querySelector(`.dl-card[data-os="${os}"]`);
      if (card) {
        card.classList.add("recommended");
        const tag = card.querySelector(".dl-tag");
        if (tag) tag.textContent = "推荐 · 当前设备";
      }
    }

    const meta = document.getElementById("release-meta");
    if (meta && release) {
      meta.textContent = release.publishedAt
        ? `最新正式版 ${release.version} · ${release.publishedAt}`
        : `最新正式版 ${release.version}`;
    }

    if (!release || !release.assets || !release.assets.length) return;
    const findAsset = (regex) => release.assets.find((a) => regex.test(a.name));

    const mappings = [
      ["dl-android-arm64", /android-arm64v8\.apk$/i],
      ["dl-android-uni", /android-universal\.apk$/i],
      ["dl-windows-zip", /windows.*\.zip$/i],
      ["dl-linux-tar", /linux.*\.tar\.gz$/i],
      ["dl-linux-appimage", /\.AppImage$/i],
      ["dl-ohos-hap", /\.hap$/i]
    ];

    mappings.forEach(([id, regex]) => {
      const el = document.getElementById(id);
      const asset = findAsset(regex);
      if (el && asset) {
        el.href = asset.url;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initOrbit();
    initPhoneGrid();
    initPhoneTabs();
    initParallax();
    wireDownloads(null);
  });

  window.addEventListener("techpie:release", (e) => {
    wireDownloads(e.detail);
  });
})();
