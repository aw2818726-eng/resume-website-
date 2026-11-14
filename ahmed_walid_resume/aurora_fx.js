/* Aurora FX: pointer spotlight for cards. Purely cosmetic; the site works without it. */
(function () {
  if (!window.matchMedia || !matchMedia("(hover:hover)").matches) return;
  var sel = ".card,.id-card,.stat-box,.edu-card,.proj-featured,.panel,.tile,.kpis div,.cal,.meter";
  var raf = 0, last = null;
  document.addEventListener("pointermove", function (e) {
    last = e;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = 0;
      var el = last.target && last.target.closest ? last.target.closest(sel) : null;
      if (!el) return;
      var r = el.getBoundingClientRect();
      el.style.setProperty("--mx", (last.clientX - r.left) + "px");
      el.style.setProperty("--my", (last.clientY - r.top) + "px");
    });
  }, { passive: true });
})();
