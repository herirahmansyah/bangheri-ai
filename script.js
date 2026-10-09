document.addEventListener("DOMContentLoaded", () => {
  // Hero content langsung visible saat halaman dibuka
  gsap.set(".hero-content", { opacity: 1, y: 0 });

  gsap.registerPlugin(ScrollTrigger);

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    const bar = document.getElementById("scroll-progress");
    if (bar) bar.style.width = pct + "%";

    let activeIdx = 1;
    let sectionPct = 0;
    document.querySelectorAll("section").forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
        activeIdx = i + 1;
        sectionPct = Math.min(100, Math.max(0,
          ((window.innerHeight * 0.5 - rect.top) / rect.height) * 100
        ));
      }
    });
    const hud = document.getElementById("section-hud");
    if (hud) hud.textContent = (activeIdx < 10 ? "0" + activeIdx : activeIdx) + " " + Math.round(sectionPct) + "%";
  });

  gsap.fromTo("#hero",
    { backgroundSize: "110%" },
    { backgroundSize: "100%", duration: 2.5, ease: "power2.out" }
  );

  // MANDALIKA — background position dari top (langit) ke bottom (landasan)
  gsap.fromTo("#mandalika-bg",
    { backgroundPositionY: "0%" },
    {
      backgroundPositionY: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#mandalika-parallax",
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        scrub: 2
      }
    }
  );

  // Fade in teks saat section mulai aktif
  gsap.set(".parallax-content", { opacity: 1, y: 0 });

  const tasTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#tas-zoom-section",
      start: "top top",
      end: "+=150%",
      pin: true,
      pinSpacing: true,
      scrub: 1.5
    }
  });
  tasTimeline
    .fromTo("#tas-zoom",
      { scale: 1.0 },
      { scale: 1.25, ease: "none", duration: 1 }
    )
    .to("#tas-zoom",
      { scale: 1.0, ease: "none", duration: 1 }
    );

  gsap.fromTo(".zoom-text-side",
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0, duration: 1,
      scrollTrigger: {
        trigger: "#tas-zoom-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );

  gsap.fromTo("#tenun-pan",
    { xPercent: 0 },
    {
      xPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: "#tenun-pan-section",
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: 1.5
      }
    }
  );

  gsap.fromTo(".pan-content",
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1,
      scrollTrigger: {
        trigger: "#tenun-pan-section",
        start: "top 70%",
        toggleActions: "play none none reverse"
      }
    }
  );

    // GERABAH — background zoom+rotate, teks crossfade, HUD orbit angle
  const vid = document.getElementById("gerabah-video");
  let target = 0, current = 0;
  vid.addEventListener("loadedmetadata", () => { vid.pause(); });
  const unlock = () => { vid.play().then(() => vid.pause()).catch(()=>{}); window.removeEventListener("touchstart", unlock); };
  window.addEventListener("touchstart", unlock, { once: true });
  gsap.ticker.add(() => {
    if (!vid.duration) return;
    current += (target - current) * 0.12;
    if (Math.abs(vid.currentTime - current) > 0.01) vid.currentTime = current;
  });

  const gerabahTl = gsap.timeline({
    scrollTrigger: {
      trigger: "#gerabah-rotate-section",
      start: "top top",
      end: "+=200%",
      pin: true,
      pinSpacing: true,
      scrub: 2,
      onUpdate: (self) => {
        const angle = Math.round(self.progress * 180);
        const el = document.getElementById("orbit-value");
        if (el) el.textContent = angle;
        if (vid.duration) target = self.progress * vid.duration;
      }
    }
  });

  gerabahTl
    .fromTo("#gerabah-front",
      { opacity: 1, y: 0 },
      { opacity: 0, y: -30, ease: "power2.in", duration: 0.35 },
      0.55
    )
    .fromTo("#gerabah-back",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.4 },
      0.75
    );

  gsap.fromTo(".about-split",
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    }
  );

  gsap.fromTo(".contact-split",
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0, duration: 1.2, ease: "power2.out",
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top 75%",
        toggleActions: "play none none reverse"
      }
    }
  );

  gsap.utils.toArray(".fade-up-element").forEach(el => {
    if (!el.closest("#mandalika-parallax") &&
        !el.closest("#tas-zoom-section") &&
        !el.closest("#tenun-pan-section") &&
        !el.closest("#gerabah-rotate-section") &&
        !el.closest("#about") &&
        !el.closest("#contact-section")) {
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  });

  document.getElementById("contact-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const text = `Halo Bang Heri, saya ingin konsultasi otomasi AI untuk bisnis saya.\n\nNama: ${data.name || 'User'}\nNama Bisnis: ${data.business || 'N/A'}\nEmail: ${data.email || 'N/A'}\nProses yang ingin diotomasi: ${data.process || 'N/A'}`;
    window.open(`https://wa.me/6282125495080?text=${encodeURIComponent(text)}`, "_blank");
  });
});
