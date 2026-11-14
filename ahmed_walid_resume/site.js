(function () {
  'use strict';

  /* 1. Spam protection: the e-mail address is assembled in the browser, so it is not
        sitting in the page source as a plain mailto: link for scrapers to harvest. */
  function buildMail() {
    var els = document.querySelectorAll('[data-mail]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var addr = (el.getAttribute('data-u') || '') + '@' + (el.getAttribute('data-d') || '');
      el.setAttribute('href', 'mailto:' + addr);
      if (el.hasAttribute('data-show')) { el.textContent = addr; }
    }
  }

  /* 2. Privacy notice. The site sets no cookies, so this is an information notice, not a
        consent gate. The only thing stored is one localStorage flag that remembers the
        notice was dismissed. */
  var KEY = 'aw_privacy_notice_dismissed';
  var script = document.currentScript;
  var privacyHref = (script && script.getAttribute('data-privacy')) || 'privacy.html';

  function wasDismissed() { try { return window.localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { window.localStorage.setItem(KEY, '1'); } catch (e) { /* private mode: ignore */ } }

  function showNotice() {
    if (wasDismissed() || document.getElementById('awNotice')) { return; }

    var css = document.createElement('style');
    css.id = 'awNoticeStyle';
    css.textContent =
      '#awNotice{position:fixed;left:12px;right:12px;bottom:12px;margin:0 auto;max-width:680px;z-index:1000;' +
      'background:#1D2226;color:#E7E9EA;border:1px solid #3A424A;border-radius:12px;padding:14px 16px;' +
      'display:flex;gap:14px;align-items:center;justify-content:space-between;box-shadow:0 8px 28px rgba(0,0,0,.45);' +
      'font:14px/1.5 Inter,-apple-system,"Segoe UI",Arial,sans-serif}' +
      '#awNotice p{margin:0}' +
      '#awNotice a{color:#E8A33D;text-decoration:underline;display:inline-flex;align-items:center;min-height:44px;padding:0 4px}' +
      '#awNotice button{flex:none;background:#E8A33D;color:#14171A;border:0;border-radius:8px;min-height:44px;min-width:96px;' +
      'padding:0 18px;font:600 14px Inter,-apple-system,"Segoe UI",Arial,sans-serif;cursor:pointer}' +
      '#awNotice a:focus-visible,#awNotice button:focus-visible{outline:2px solid #fff;outline-offset:3px}' +
      '@media (max-width:560px){#awNotice{flex-direction:column;align-items:stretch;gap:10px}#awNotice button{width:100%}}';
    document.head.appendChild(css);

    var box = document.createElement('div');
    box.id = 'awNotice';
    box.setAttribute('role', 'region');
    box.setAttribute('aria-label', 'Privacy notice');

    var p = document.createElement('p');
    p.appendChild(document.createTextNode('This site sets no cookies and does not track you across other sites. It loads fonts from Google and uses cookie-free analytics. '));
    var a = document.createElement('a');
    a.setAttribute('href', privacyHref);
    a.textContent = 'Privacy policy';
    p.appendChild(a);

    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.textContent = 'Got it';

    box.appendChild(p);
    box.appendChild(btn);
    document.body.appendChild(box);

    var prevPad = document.body.style.paddingBottom;
    function pad() { document.body.style.paddingBottom = (box.offsetHeight + 24) + 'px'; }
    pad();
    window.addEventListener('resize', pad);

    btn.addEventListener('click', function () {
      remember();
      window.removeEventListener('resize', pad);
      document.body.style.paddingBottom = prevPad;
      if (box.parentNode) { box.parentNode.removeChild(box); }
      if (css.parentNode) { css.parentNode.removeChild(css); }
    });
  }

  function init() { buildMail(); showNotice(); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', init); } else { init(); }
})();
