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

/* Version switcher: jump to the same page in the other version of the site. */
(function () {
  if (location.protocol === "file:") return;
  var p = location.pathname, inAlt = /^\/aurora(\/|$)/.test(p);
  var to = inAlt ? (p.replace(/^\/aurora/, "") || "/") : ("/aurora" + p);
  if (to.charAt(0) !== "/") to = "/" + to;
  var a = document.createElement("a");
  a.className = "fx-switch";
  a.href = to + location.search;
  a.setAttribute("aria-label", inAlt ? "Switch to the Amber version of this page" : "Switch to the Aurora version of this page");
  a.style.setProperty("--other", inAlt ? "#FF7043" : "#5CC0F0");
  a.innerHTML = "<i></i>" + (inAlt ? "Amber version" : "Aurora version");
  document.addEventListener("DOMContentLoaded", function () { document.body.appendChild(a); });
  if (document.readyState !== "loading") document.body.appendChild(a);
})();
