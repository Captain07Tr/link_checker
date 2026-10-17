const yearEl = document.getElementById("y");
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

const revealEls = Array.from(document.querySelectorAll(".reveal"));

function show(el) {
  el.classList.add("is-visible");
}

if ("IntersectionObserver" in window && revealEls.length) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        show(entry.target);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -30px 0px" }
  );

  revealEls.forEach((el, i) => {
    el.style.setProperty("--d", `${(i % 3) * 0.07}s`);
    io.observe(el);
  });

  // Güvenlik ağı: observer kaçırırsa yine görünsün
  window.setTimeout(() => revealEls.forEach(show), 2500);
} else {
  revealEls.forEach(show);
}

// Üst bildirim çubuğu (Top App Banner) kapatma
const topBanner = document.getElementById("top-banner");
const closeBannerBtn = document.getElementById("banner-close-btn");

if (topBanner && closeBannerBtn) {
  if (sessionStorage.getItem("linkchecker_banner_dismissed") === "true") {
    topBanner.classList.add("is-hidden");
  }
  closeBannerBtn.addEventListener("click", () => {
    topBanner.classList.add("is-hidden");
    sessionStorage.setItem("linkchecker_banner_dismissed", "true");
  });
}

