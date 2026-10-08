document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    document.getElementById("scroll-progress").style.width = pct + "%";

    let activeIdx = 1;
    let sectionPct = 0;
    document.querySelectorAll("section").forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        activeIdx = i + 1;
        sectionPct = Math.min(100, Math.max(0, ( (window.innerHeight * 0.5 - rect.top) / rect.height) * 100));
      }
    });
    document.getElementById("section-hud").textContent = (activeIdx < 10 ? "0" + activeIdx : activeIdx) + " " + Math.round(sectionPct) + "%";
  });

  gsap.from("#hero", { scale: 1.05, duration: 2, ease: "power2.out" });
  gsap.to("#mandalika-bg", { y: "30%", ease: "none", scrollTrigger: { trigger: "#mandalika-parallax", start: "top bottom", end: "bottom top", scrub: true } });
  
  gsap.to("#tas-zoom", { scale: 1.15, scrollTrigger: { trigger: "#tas-zoom-section", start: "top bottom", end: "center center", scrub: 1 } });
  gsap.to("#tas-zoom", { scale: 1.0, scrollTrigger: { trigger: "#tas-zoom-section", start: "center center", end: "bottom top", scrub: 1 } });

  gsap.to("#tenun-pan", { x: "-25%", ease: "none", scrollTrigger: { trigger: "#tenun-pan-section", start: "top bottom", end: "bottom top", scrub: 1 } });
  gsap.to("#gerabah-card", { rotateY: 180, ease: "none", scrollTrigger: { trigger: "#gerabah-rotate-section", start: "top center", end: "bottom center", scrub: 1 } });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { threshold: 0.1 });
  document.querySelectorAll(".fade-up-element").forEach(el => observer.observe(el));

  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const text = `Halo Bang Heri, saya ingin konsultasi otomasi AI.\n\nNama: ${data.name || 'User'}\nBisnis: ${data.business || 'N/A'}\nEmail: ${data.email || 'N/A'}\nProses: ${data.process || 'N/A'}`;
    window.open(`https://wa.me/6282125495080?text=${encodeURIComponent(text)}`, "_blank");
  });
});
