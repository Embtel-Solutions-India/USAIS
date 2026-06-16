/*
 * ============================================================
 *  US Area Immigration Services — main.js
 *
 *  Sections:
 *  1. Sticky navbar shadow on scroll
 *  2. Mobile hamburger toggle
 *  3. Smooth scroll for anchor links
 *  4. L-1A Journey tab switcher    (switchJourneyTab)
 *  5. Settling-In tab switcher     (switchSettleTab)
 *  6. FAQ accordion
 * ============================================================
 */

/* ─── 1. STICKY NAVBAR SHADOW ──────────────────────────── */
window.addEventListener('scroll', function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ─── 2. MOBILE HAMBURGER ───────────────────────────────── */
document.addEventListener('click', function (e) {
  if (e.target.closest('#hamburger')) {
    var navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.toggle('open');
    return;
  }
  /* Close nav when a real destination link is clicked — but NOT dropdown toggles */
  var link = e.target.closest('.nav-links a');
  if (link && !link.classList.contains('usais-dd-toggle')) {
    var navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('open');
  }
});

/* ─── 3. SMOOTH SCROLL FOR ANCHOR LINKS ─────────────────── */
document.addEventListener('click', function (e) {
  var link = e.target.closest('a[href^="#"]');
  if (!link) return;
  var target = document.querySelector(link.getAttribute('href'));
  if (target) {
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ─── 4. L-1A JOURNEY TAB SWITCHER ─────────────────────── */
function switchJourneyTab(tabId) {
  document.querySelectorAll('.journey-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  document.querySelectorAll('.journey-panel').forEach(function (p) {
    p.classList.remove('active');
  });
  var tab   = document.querySelector('.journey-tab[data-tab="' + tabId + '"]');
  var panel = document.getElementById(tabId);
  if (tab)   tab.classList.add('active');
  if (panel) panel.classList.add('active');
}

document.addEventListener('click', function (e) {
  var tab = e.target.closest('.journey-tab');
  if (tab) switchJourneyTab(tab.getAttribute('data-tab'));
});

/* Deep-link from hero card journey steps */
document.addEventListener('click', function (e) {
  var step = e.target.closest('.journey-step[data-tab]');
  if (!step) return;
  var tabId   = step.getAttribute('data-tab');
  var section = document.getElementById('journey-section');
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
    setTimeout(function () { switchJourneyTab(tabId); }, 400);
  }
});

/* Auto-activate tab from URL hash (e.g. /pages/l1a.html#tab-branch) */
(function () {
  var hash = window.location.hash.replace('#', '');
  if (hash && hash.startsWith('tab-')) {
    setTimeout(function () { switchJourneyTab(hash); }, 100);
  }
})();

/* ─── 5. SETTLING-IN TAB SWITCHER ───────────────────────── */
function switchSettleTab(tabId) {
  document.querySelectorAll('.settle-tab').forEach(function (t) {
    t.classList.remove('active');
  });
  document.querySelectorAll('.settle-panel').forEach(function (p) {
    p.classList.remove('active');
  });
  var tab   = document.querySelector('.settle-tab[data-settle="' + tabId + '"]');
  var panel = document.getElementById(tabId);
  if (tab)   tab.classList.add('active');
  if (panel) panel.classList.add('active');
}

document.addEventListener('click', function (e) {
  var tab = e.target.closest('.settle-tab');
  if (tab) switchSettleTab(tab.getAttribute('data-settle'));
});

/* ─── 6. FAQ ACCORDION ───────────────────────────────────── */
document.addEventListener('click', function (e) {
  var q = e.target.closest('.faq-q');
  if (!q) return;
  var item = q.parentElement;
  document.querySelectorAll('.faq-item').forEach(function (i) {
    if (i !== item) i.classList.remove('open');
  });
  item.classList.toggle('open');
});
