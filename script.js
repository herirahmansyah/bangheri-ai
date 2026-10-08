document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const menuTrigger = document.querySelector(".menu-trigger");
  const navLinks = document.querySelector(".nav-links");

  if (menuTrigger && navLinks) {
    menuTrigger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      menuTrigger.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuTrigger.classList.remove("active");
      });
    });
  }

  // 2. Global Scroll Progress & Section HUD & Custom Scroll-driven Animations
  const scrollProgress = document.getElementById("scroll-progress");
  const sectionHud = document.getElementById("section-hud");
  const sections = document.querySelectorAll("section");

  const updateScrollEffects = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Update global progress bar
    if (scrollProgress) {
      scrollProgress.style.width = `${scrollPercent}%`;
    }

    // Determine active section & calculate inner-section progress
    let activeSectionIndex = 0;
    let activeSectionName = "01";
    let sectionProgress = 0;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();
      const sHeight = rect.height;
      
      // A section is considered active if its top is above 50% of the viewport and its bottom is below 50%
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        activeSectionIndex = index + 1;
        activeSectionName = `0${activeSectionIndex}`;
        
        // Calculate progress within section (from top entering bottom of viewport to bottom leaving top of viewport)
        const totalScrollable = window.innerHeight + sHeight;
        const currentScroll = window.innerHeight - rect.top;
        sectionProgress = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
      }
    });

    // Update HUD
    if (sectionHud) {
      sectionHud.textContent = `${activeSectionName} ${Math.round(sectionProgress)}%`;
    }

    // --- Dynamic Section Specific Scroll Drivers ---

    // Section 2: Mandalika Parallax Background position shift (center top -> center bottom)
    const mandalikaSec = document.getElementById("mandalika-parallax");
    if (mandalikaSec) {
      const rect = mandalikaSec.getBoundingClientRect();
      const totalScrollable = window.innerHeight + rect.height;
      const currentScroll = window.innerHeight - rect.top;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
      // Interpolate background Y from 0% (top) to 100% (bottom)
      mandalikaSec.style.backgroundPositionY = `${progress}%`;
    }

    // Section 3: Tas UMKM Zoom (scale from 1.0 to 1.15 driven by scroll)
    const tasZoomSec = document.getElementById("tas-zoom-section");
    const tasZoom = document.getElementById("tas-zoom");
    if (tasZoomSec && tasZoom) {
      const rect = tasZoomSec.getBoundingClientRect();
      const totalScrollable = window.innerHeight + rect.height;
      const currentScroll = window.innerHeight - rect.top;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
      
      // Interpolate scale from 1.0 to 1.15
      const scale = 1.0 + (progress / 100) * 0.15;
      tasZoom.style.transform = `scale(${scale})`;
    }

    // Section 4: Kain Tenun Pan (interpolate background-position-x from 0% to 100% driven by scroll)
    const tenunSec = document.getElementById("tenun-pan-section");
    const tenunPan = document.getElementById("tenun-pan");
    if (tenunSec && tenunPan) {
      const rect = tenunSec.getBoundingClientRect();
      const totalScrollable = window.innerHeight + rect.height;
      const currentScroll = window.innerHeight - rect.top;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
      
      // Interpolate background X from 0% to 100%
      tenunPan.style.backgroundPositionX = `${progress}%`;
    }

    // Section 5: Gerabah Rotate (rotateY(0deg) -> rotateY(180deg) driven by scroll)
    const gerabahSec = document.getElementById("gerabah-rotate-section");
    const gerabahCard = document.getElementById("gerabah-card");
    if (gerabahSec && gerabahCard) {
      const rect = gerabahSec.getBoundingClientRect();
      const totalScrollable = window.innerHeight + rect.height;
      const currentScroll = window.innerHeight - rect.top;
      const progress = Math.min(100, Math.max(0, (currentScroll / totalScrollable) * 100));
      
      // Interpolate rotateY from 0deg to 180deg
      const rotateY = (progress / 100) * 180;
      gerabahCard.style.transform = `rotateY(${rotateY}deg)`;
    }
  };

  window.addEventListener("scroll", updateScrollEffects);
  updateScrollEffects(); // Run once initially

  // 3. Global Entrance Animations (IntersectionObserver for fade-up)
  const fadeUpElements = document.querySelectorAll(".fade-up-element");
  const appearanceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, {
    root: null,
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: "0px 0px -50px 0px" // Trigger slightly before it fully enters
  });

  fadeUpElements.forEach(element => {
    appearanceObserver.observe(element);
  });

  // 4. Form Submit to WhatsApp Integration
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const name = contactForm.querySelector('input[placeholder="NAMA LENGKAP •"]').value;
      const business = contactForm.querySelector('input[placeholder="NAMA BISNIS •"]').value;
      const email = contactForm.querySelector('input[placeholder="EMAIL •"]').value;
      const processToAutomate = contactForm.querySelector('textarea[placeholder="PROSES YANG INGIN DIOTOMASI •"]').value;
      
      const whatsappText = `Halo Bang Heri, saya ingin berkonsultasi mengenai otomasi AI untuk bisnis saya.

Nama: ${name}
Nama Bisnis: ${business}
Email: ${email}
Proses yang ingin diotomasi: ${processToAutomate}`;

      const encodedText = encodeURIComponent(whatsappText);
      const whatsappUrl = `https://wa.me/6282125495080?text=${encodedText}`;
      
      window.open(whatsappUrl, "_blank");
    });
  }
});
