const navBar = document.getElementById("navBar");

const searchBtn = document.getElementById("searchBtn");
const searchBox = document.getElementById("searchBox");
const searchWrap = document.querySelector(".search-wrap");

function openSearch() {
  searchWrap.classList.add("open");
  searchBtn.setAttribute("aria-expanded", "true");
  const input = searchBox.querySelector("input");
  if (input) input.focus();
}

function closeSearch() {
  searchWrap.classList.remove("open");
  searchBtn.setAttribute("aria-expanded", "false");
}

searchBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  const isOpen = searchWrap.classList.contains("open");
  if (isOpen) closeSearch();
  else openSearch();
});

document.addEventListener("click", (e) => {
  if (!searchWrap.contains(e.target)) closeSearch();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSearch();
});

function handleScroll() {
  const threshold = 40;
  if (window.scrollY > threshold) navBar.classList.add("is-scrolled");
  else navBar.classList.remove("is-scrolled");
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("load", handleScroll);
(function () {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25 },
  );

  items.forEach((el) => io.observe(el));
})();



  const navToggle = document.getElementById("navToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const mobileDropBtn = document.querySelector(".mobileDropBtn");
  const mobileDropPanel = document.getElementById("mobileProjectsPanel");

  // Main menu toggle
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.hidden = isOpen;

    // When opening the menu, keep Projects collapsed by default
    if (!isOpen && mobileDropBtn && mobileDropPanel) {
      mobileDropBtn.setAttribute("aria-expanded", "false");
      mobileDropPanel.hidden = true;
    }
  });

  // Projects accordion
  mobileDropBtn?.addEventListener("click", () => {
    const isOpen = mobileDropBtn.getAttribute("aria-expanded") === "true";
    mobileDropBtn.setAttribute("aria-expanded", String(!isOpen));
    mobileDropPanel.hidden = isOpen;
  });

  // Close menu when a link is clicked
  document.querySelectorAll(".mobileMenu a").forEach((a) => {
    a.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    });
  });

  // Click outside to close
  document.addEventListener("click", (e) => {
    if (mobileMenu.hidden) return;

    const clickedInside =
      mobileMenu.contains(e.target) || navToggle.contains(e.target);

    if (!clickedInside) {
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;
    }
  });

  // Reset on desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      navToggle.setAttribute("aria-expanded", "false");
      mobileMenu.hidden = true;

      if (mobileDropBtn && mobileDropPanel) {
        mobileDropBtn.setAttribute("aria-expanded", "false");
        mobileDropPanel.hidden = true;
      }
    }
  });






(function () {
  const scope = document.querySelector("[data-counter-scope]");
  if (!scope) return;

  const cards = scope.querySelectorAll(".reveal");
  const counters = scope.querySelectorAll(".count");

  // reveal + count-up (once)
  let started = false;

  function animateCount(el, target, duration = 1200) {
    const start = 0;
    const t0 = performance.now();

    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      const value = Math.round(start + (target - start) * eased);
      el.textContent = value;

      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;

          // reveal cards
          cards.forEach((c, i) => {
            setTimeout(() => c.classList.add("in"), i * 120);
          });

          // animate counters
          counters.forEach((c, i) => {
            const target = parseInt(c.getAttribute("data-target"), 10) || 0;
            setTimeout(() => animateCount(c, target, 1100), i * 140);
          });

          io.disconnect();
        }
      });
    },
    { threshold: 0.35 },
  );

  io.observe(scope);
})();

(function () {
  const section = document.querySelector(".tractor-section");
  if (!section) return;

  const block = section.querySelector(".reveal-block");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("in");
          if (block) block.classList.add("in");
          io.disconnect();
        }
      });
    },
    { threshold: 0.35 },
  );

  io.observe(section);
})();

(function () {
  // ===== Reveal on scroll =====
  const reveals = document.querySelectorAll(".reveal");
  const rio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          rio.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 },
  );
  reveals.forEach((el) => rio.observe(el));

  // ===== Count-up (80% / 95%) =====
  const counts = document.querySelectorAll(".s4-count");
  let counted = false;
  const cio = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !counted) {
          counted = true;
          counts.forEach((el, i) => {
            const target = parseInt(el.dataset.target || "0", 10);
            setTimeout(() => animateCount(el, target, 900), i * 120);
          });
          cio.disconnect();
        }
      });
    },
    { threshold: 0.35 },
  );
  if (document.querySelector(".s4-features"))
    cio.observe(document.querySelector(".s4-features"));

  function animateCount(el, target, duration) {
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // ===== Carousel: show 3 cards; after delay slide to next 3; loop =====
  const track = document.getElementById("s4Track");
  if (!track) return;

  const windowEl = track.closest(".s4-window");
  const dots = [
    document.getElementById("dot0"),
    document.getElementById("dot1"),
  ];

  let page = 0; // 0 => first 3, 1 => next 3
  let timer = null;
  let paused = false;

  function setDots() {
    dots.forEach((d, idx) => d && d.classList.toggle("on", idx === page));
  }

  function slide() {
    if (paused) return;

    // width of one "page" (3 cards + 2 gaps)
    const windowW = windowEl.getBoundingClientRect().width;
    page = (page + 1) % 2;

    // Move exactly one window width
    track.style.transform = `translateX(${-page * windowW}px)`;
    setDots();
  }

  function start() {
    stop();
    timer = setInterval(slide, 3800); // adjust speed here
  }
  function stop() {
    if (timer) clearInterval(timer);
    timer = null;
  }

  // pause on hover (like many sliders)
  windowEl.addEventListener("mouseenter", () => {
    paused = true;
  });
  windowEl.addEventListener("mouseleave", () => {
    paused = false;
  });

  // keep correct transform on resize
  window.addEventListener("resize", () => {
    const windowW = windowEl.getBoundingClientRect().width;
    track.style.transition = "none";
    track.style.transform = `translateX(${-page * windowW}px)`;
    requestAnimationFrame(
      () =>
        (track.style.transition = "transform .85s cubic-bezier(.2,.9,.2,1)"),
    );
  });

  // initial position + start
  setDots();
  start();
})();

(function () {
  const row = document.getElementById("brandRow");
  const clone = document.getElementById("brandRowClone");
  if (!row || !clone) return;

  clone.innerHTML = row.innerHTML;
})();

// 1) Scroll-in animation for the whole section
(function () {
  const section = document.getElementById("seedsSection");
  if (!section) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
          io.disconnect();
        }
      });
    },
    { threshold: 0.25 },
  );

  io.observe(section);
})();

// 2) Testimonial ticker: swap content each time one full pass finishes
(function () {
  const item = document.getElementById("seedsTickerItem");
  const text = document.getElementById("seedsQuoteText");
  const name = document.getElementById("seedsName");
  const role = document.getElementById("seedsRole");
  const avatar = document.getElementById("seedsAvatar");

  if (!item || !text || !name || !role || !avatar) return;

  const testimonials = [
    {
      quote:
        "“Great support and fast delivery. Everything was exactly as promised.”",
      name: "Luis Vireon",
      role: "Happy Client",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "“The team guided me step-by-step. The service is reliable and professional.”",
      name: "Amina K.",
      role: "Farm Owner",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "“Top quality, very responsive, and the results were better than expected.”",
      name: "Joseph M.",
      role: "Co-op Member",
      avatar:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&w=160&q=80",
    },
    {
      quote:
        "“On-time delivery and excellent communication. I’d recommend them anytime.”",
      name: "Sarah N.",
      role: "Happy Client",
      avatar:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&q=80",
    },
  ];

  let idx = 0;

  function setTestimonial(i) {
    const t = testimonials[i];
    text.textContent = t.quote;
    name.textContent = t.name;
    role.textContent = t.role;
    avatar.src = t.avatar;
  }

  // Start with first
  setTestimonial(idx);

  // Each time the marquee finishes one run, swap to the next and restart cleanly
  item.addEventListener("animationiteration", () => {
    idx = (idx + 1) % testimonials.length;
    setTestimonial(idx);

    // Force reflow so the next loop restarts smoothly (helps on some browsers)
    item.style.animation = "none";
    // eslint-disable-next-line no-unused-expressions
    item.offsetHeight;
    item.style.animation = "";
  });
})();

(function () {
  const section = document.getElementById("newsSection");
  if (!section) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("in-view");
          io.disconnect();
        }
      });
    },
    { threshold: 0.2 },
  );

  io.observe(section);
})();

(function () {
  const btn = document.getElementById("agToTop");
  if (!btn) return;

  function toggle() {
    if (window.scrollY > 350) btn.classList.add("show");
    else btn.classList.remove("show");
  }
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
(function(){
  const menu = document.getElementById("servicesMenu");
  if(!menu) return;

  const btn = menu.querySelector(".nav-dropbtn");
  const panel = menu.querySelector(".nav-dropdown-panel");
  const items = menu.querySelectorAll(".nav-dd-item");

  function openMenu(){ menu.classList.add("is-open"); }
  function closeMenu(){ menu.classList.remove("is-open"); }
  function toggleMenu(){ menu.classList.toggle("is-open"); }

  btn.addEventListener("click", (e)=>{
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  panel.addEventListener("click", (e)=> e.stopPropagation());

  items.forEach(a=>{
    a.addEventListener("click", ()=>{
      items.forEach(x=>x.classList.remove("is-active"));
      a.classList.add("is-active");
      closeMenu();
    });
  });

  document.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e)=> { if(e.key === "Escape") closeMenu(); });
})();

(() => {
  const section = document.querySelector(".tractor-hero");
  if (!section) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) section.classList.add("in-view");
      });
    },
    { threshold: 0.25 }
  );

  io.observe(section);
})();

  document.querySelectorAll(".read-more-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".service-item");
      card.classList.toggle("expanded");
      btn.textContent = card.classList.contains("expanded")
        ? "Read less"
        : "Read more";
    });
  });

