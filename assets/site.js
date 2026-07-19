(function () {
  // Scroll reveal
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  }

  // Replay the "growth" animation on hero hover
  var gw = document.getElementById("gw");
  if (gw && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var replaying = false;
    var gwHost = gw.closest(".cine") || gw.closest("h1") || gw;
    gwHost.addEventListener("mouseenter", function () {
      if (replaying) return;
      replaying = true;
      gw.classList.remove("play");
      void gw.offsetWidth;
      gw.classList.add("play");
      setTimeout(function () { replaying = false; }, 1800);
    });
  }

  // Nav dropdown (click toggle for touch; hover handled in CSS)
  document.querySelectorAll(".dropdown > button").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var d = btn.parentElement;
      var open = d.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
  // Mobile hamburger
  var navEl = document.querySelector("nav");
  var navToggle = document.querySelector(".nav-toggle");
  function closeNav() {
    if (navEl && navEl.classList.contains("open")) {
      navEl.classList.remove("open");
      if (navToggle) navToggle.setAttribute("aria-expanded", "false");
    }
  }
  if (navToggle) {
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = navEl.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll("nav .nav-links a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
  }

  function closeAll() {
    document.querySelectorAll(".dropdown.open").forEach(function (d) {
      d.classList.remove("open");
      var b = d.querySelector("button");
      if (b) b.setAttribute("aria-expanded", "false");
    });
    closeNav();
  }
  document.addEventListener("click", closeAll);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
})();
