/*
 * ============================================================
 *  US Area Immigration Services — components.js
 *
 *  Loads shared Header and Footer from the /includes/ folder
 *  and injects them into every page via placeholder divs.
 *
 *  ✏️  TO EDIT THE HEADER / NAVIGATION → /includes/header.html
 *  ✏️  TO EDIT THE FOOTER              → /includes/footer.html
 *
 *  Each page must include:
 *    <div id="topbar-placeholder"></div>
 *    <div id="navbar-placeholder"></div>
 *    ...page content...
 *    <div id="footer-placeholder"></div>
 *    <div id="disclaimer-placeholder"></div>
 *
 *  NOTE: Requires an HTTP server (VS Code Live Server, Vercel, etc.)
 *        fetch() does not work with file:// protocol.
 * ============================================================
 */

(function () {

  /* ── FONT AWESOME ──────────────────────────────────────── */
  if (!document.getElementById('usais-fa')) {
    var fa = document.createElement('link');
    fa.id   = 'usais-fa';
    fa.rel  = 'stylesheet';
    fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
    document.head.appendChild(fa);
  }

  /* ── DROPDOWN CSS ──────────────────────────────────────── */
  var ddStyle = document.createElement('style');
  ddStyle.textContent = [
    '.usais-dd{position:relative;list-style:none}',
    '.usais-dd-toggle{display:inline-flex!important;align-items:center;gap:5px;cursor:pointer}',
    '.usais-dd-arrow{font-size:.55rem;display:inline-block;transition:transform .2s;line-height:1}',
    '.usais-dd:hover .usais-dd-arrow,.usais-dd.open .usais-dd-arrow{transform:rotate(180deg)}',
    '.usais-dd-menu{position:absolute;top:calc(100% + 10px);left:-12px;min-width:220px;',
    'background:#fff;border:1px solid #E8ECF2;border-radius:12px;',
    'box-shadow:0 8px 40px rgba(11,29,58,.16);padding:8px;list-style:none;',
    'opacity:0;visibility:hidden;transform:translateY(-6px);',
    'transition:opacity .18s,transform .18s,visibility .18s;transition-delay:.25s;z-index:9999;pointer-events:none}',
    '.usais-dd-menu::before{content:"";position:absolute;top:-14px;left:0;right:0;height:16px;background:transparent}',
    '.usais-dd:hover .usais-dd-menu,.usais-dd.open .usais-dd-menu{opacity:1;visibility:visible;transform:translateY(0);pointer-events:auto;transition-delay:0s}',
    '.usais-dd-menu li a{display:block;padding:10px 14px;border-radius:8px;color:#0D1B2A;',
    'font-size:.88rem;font-weight:500;white-space:nowrap;text-decoration:none;',
    'transition:background .15s,color .15s}',
    '.usais-dd-menu li a::after{display:none!important}',
    '.usais-dd-menu li a:hover{background:#E8F0FE;color:#0B1D3A}',
    '.usais-dd-menu li a.dd-active{background:rgba(201,168,76,.12);color:#A88A30;font-weight:700}',
    '@media(max-width:768px){',
    '.usais-dd{position:static}',
    '.usais-dd-toggle{display:flex!important;width:100%;justify-content:space-between;align-items:center;padding:8px 0}',
    '.usais-dd-arrow{margin-left:auto}',
    '.usais-dd-menu{position:static;box-shadow:none;border:1px solid #E8ECF2;border-radius:8px;',
    'padding:4px;background:rgba(248,250,253,.98);opacity:1;visibility:visible;',
    'transform:none;pointer-events:auto;display:none;margin:4px 0 8px 12px}',
    '.usais-dd.open .usais-dd-menu{display:block}',
    '.usais-dd-menu li a{display:block;padding:10px 14px;font-size:.88rem;border-radius:6px}',
    '.usais-dd-menu li a:hover{background:#E8F0FE}}'
  ].join('');
  document.head.appendChild(ddStyle);

  /* ── HELPERS ───────────────────────────────────────────── */
  function loadInto(id, url, onLoad) {
    var el = document.getElementById(id);
    if (!el) return;
    fetch(url)
      .then(function (r) { return r.text(); })
      .then(function (html) {
        el.outerHTML = html;
        if (onLoad) onLoad();
      })
      .catch(function () {
        console.warn('[USAIS] Could not load: ' + url + ' — run via an HTTP server, not file://');
      });
  }

  function clearEl(id) {
    var el = document.getElementById(id);
    if (el) el.remove();
  }

  /* ── AFTER HEADER LOADS ────────────────────────────────── */
  function initNav() {
    /* Mark active top-level nav link */
    var currentPage = document.body.getAttribute('data-page');
    if (currentPage) {
      var a = document.querySelector('.nav-links a[data-page="' + currentPage + '"]');
      if (a) a.classList.add('active');
    }

    /* Mark active dropdown item by URL */
    var path = window.location.pathname;
    document.querySelectorAll('.usais-dd-menu a').forEach(function (a) {
      var h = a.getAttribute('href');
      if (h === path || h === path.replace(/\.html$/, '')) a.classList.add('dd-active');
    });

    /* Mobile dropdown toggle */
    document.addEventListener('click', function (e) {
      var toggle = e.target.closest('.usais-dd-toggle');
      if (!toggle) {
        document.querySelectorAll('.usais-dd.open').forEach(function (d) { d.classList.remove('open'); });
        return;
      }
      var hbg = document.getElementById('hamburger');
      var isMobile = hbg && getComputedStyle(hbg).display !== 'none';
      if (!isMobile) return;
      e.preventDefault();
      var item = toggle.closest('.usais-dd');
      var was  = item.classList.contains('open');
      document.querySelectorAll('.usais-dd.open').forEach(function (d) { d.classList.remove('open'); });
      if (!was) item.classList.add('open');
    });

    /* Keyboard: Enter/Space opens, Escape closes, arrows navigate */
    document.addEventListener('keydown', function (e) {
      var toggle = e.target.closest('.usais-dd-toggle');
      var inMenu = e.target.closest('.usais-dd-menu');
      if (toggle && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        var item = toggle.closest('.usais-dd');
        var was  = item.classList.contains('open');
        document.querySelectorAll('.usais-dd.open').forEach(function (d) { d.classList.remove('open'); });
        if (!was) { item.classList.add('open'); var f = item.querySelector('.usais-dd-menu a'); if (f) f.focus(); }
        return;
      }
      if (e.key === 'Escape') {
        document.querySelectorAll('.usais-dd.open').forEach(function (d) {
          d.classList.remove('open');
          var t = d.querySelector('.usais-dd-toggle'); if (t) t.focus();
        });
        return;
      }
      if (inMenu && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        var links = Array.from(inMenu.querySelectorAll('a'));
        var idx   = links.indexOf(document.activeElement);
        var next  = e.key === 'ArrowDown' ? links[idx + 1] : links[idx - 1];
        if (next) next.focus();
      }
    });
  }

  /* ── LOAD INCLUDES ─────────────────────────────────────── */
  /* Header (topbar + navbar) → topbar-placeholder */
  loadInto('topbar-placeholder', '/includes/header.html', initNav);

  /* navbar-placeholder is no longer needed (header.html includes nav) */
  clearEl('navbar-placeholder');

  /* Footer → footer-placeholder */
  loadInto('footer-placeholder', '/includes/footer.html');

  /* disclaimer-placeholder is no longer needed (footer.html includes it) */
  clearEl('disclaimer-placeholder');

  /* ── TAWK.TO LIVE CHAT ──────────────────────────────────── */
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_LoadStart = new Date();
  (function () {
    var s1 = document.createElement('script');
    var s0 = document.getElementsByTagName('script')[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/6a442e64b271bd1d477e92a7/1jsd5af6f';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
  })();

})();
