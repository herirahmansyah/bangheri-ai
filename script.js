document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // ================================================
  // 1. SCROLL PROGRESS BAR + SECTION HUD
  // ================================================
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

  // ================================================
  // 2. HERO — Ken Burns subtle zoom on load
  // ================================================
  gsap.fromTo("#hero",
    { backgroundSize: "110%" },
    { backgroundSize: "100%", duration: 2.5, ease: "power2.out" }
  );

  // ================================================
  // 3. MANDALIKA — PINNED parallax
  //    Section di-pin, background bergerak dari atas ke bawah
  // ================================================
  gsap.fromTo("#mandalika-bg",
    { yPercent: -15 },
    {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: "#mandalika-parallax",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 1.5
      }
    }
  );

  // Fade in konten Mandalika saat section mulai masuk
  gsap.fromTo(".parallax-content",
    { opacity: 0, y: 40 },
    {
      opacity: 1, y: 0, duration: 1,
      scrollTrigger: {
        trigger: "#mandalika-parallax",
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // ================================================
  // 4. TAS UMKM — PINNED zoom in kemudian zoom out
  // ================================================
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
      { scale: 1.2, ease: "none" }
    )
    .to("#tas-zoom",
      { scale: 1.0, ease: "none" }
    );

  // Fade in service cards saat section aktif
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

  // ================================================
  // 5. KAIN TENUN — PINNED horizontal pan kiri ke kanan
  // ================================================
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

  // Fade in konten tenun
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

  // ================================================
  // 6. GERABAH — PINNED rotate Y 0 ke 180 derajat
  // ================================================
  gsap.fromTo("#gerabah-card",
    { rotateY: 0 },
    {
      rotateY: 180,
      ease: "none",
      scrollTrigger: {
        trigger: "#gerabah-rotate-section",
        start: "top top",
        end: "+=150%",
        pin: true,
        pinSpacing: true,
        scrub: 1.5
      }
    }
  );

  // ================================================
  // 7. ABOUT & CONTACT — fade up on enter
  // ================================================
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

  // ================================================
  // 8. FADE UP — semua elemen dengan class .fade-up-element
  //    (kecuali yang sudah di-handle GSAP di atas)
  // ================================================
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

  // ================================================
  // 9. MOBILE HAMBURGER
  // ================================================
  const menuTrigger = document.querySelector(".menu-trigger");
  const navLinks = document.querySelector(".nav-links");
  if (menuTrigger && navLinks) {
    menuTrigger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("active"));
    });
  }

  // ================================================
  // 10. FORM WHATSAPP SUBMIT
  // ================================================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = contactForm.querySelector('[placeholder="NAMA LENGKAP •"]').value;
      const bisnis = contactForm.querySelector('[placeholder="NAMA BISNIS •"]').value;
      const email = contactForm.querySelector('[placeholder="EMAIL •"]').value;
      const proses = contactForm.querySelector("textarea").value;
      const text = `Halo Bang Heri, saya ingin konsultasi otomasi AI untuk bisnis saya.\n\nNama: ${nama}\nNama Bisnis: ${bisnis}\nEmail: ${email}\nProses yang ingin diotomasi: ${proses}`;
      window.open(`https://wa.me/6282125495080?text=${encodeURIComponent(text)}`, "_blank");
    });
  }
});
