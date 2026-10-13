// Shared site behaviour: footer year, mobile nav toggle, and scroll-reveal animation.
document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.year').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var navtoggle = document.getElementById('navtoggle');
  var sidenav = document.getElementById('sidenav');
  var overlay = document.getElementById('sideOverlay');
  var closeBtn = document.getElementById('sidenavClose');
  var tip = document.getElementById('menuTip');
  if (navtoggle && sidenav && overlay) {
    var setNav = function (open) {
      sidenav.classList.toggle('open', open);
      overlay.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
      navtoggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      sidenav.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (open && tip) tip.classList.add('hidden');
      if (open && closeBtn) closeBtn.focus(); else if (!open) navtoggle.focus({ preventScroll: true });
    };
    navtoggle.addEventListener('click', function () { setNav(true); });
    if (tip) tip.addEventListener('click', function () { setNav(true); });
    if (closeBtn) closeBtn.addEventListener('click', function () { setNav(false); });
    overlay.addEventListener('click', function () { setNav(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && sidenav.classList.contains('open')) setNav(false);
    });
    sidenav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setNav(false); });
    });
  }

  // Auto-tag common content blocks so the *whole* page animates in as you
  // scroll, without needing to hand-edit every page.
  var autoSelectors = [
    'section > .wrap > h1', 'section > .wrap > h2',
    '.hero-full-inner > *', '.page-hero > .wrap > *',
    '.treatment-hub-card', '.testimonial-card', '.team-card',
    '.highlight-card', '.gallery-item', '.offer-chip',
    '.split-photo', '.split-copy', '.stat-row > div',
    '.treatment-main > *', '.contact-card', '.careers-side',
    '.philosophy > *', '.highlight-wrap > *',
    '.team-heading-copy > *', '.team-blob-photo', '.admin-member',
    '.section-head', '.contact-photo', '.contact-panel > *',
    '.footer-hero .wrap > *', '.review-cta', '.careers-grid > *',
    '.footer-grid > *'
  ];
  document.querySelectorAll(autoSelectors.join(',')).forEach(function (el) {
    el.classList.add('reveal');
  });

  // Stagger cards/rows within the same grid slightly for a nicer effect.
  var staggerGroups = [
    '.treatments-hub-grid', '.testimonial-grid', '.team-cards',
    '.highlight-cards', '.offer-grid', '.hero-full-inner',
    '.page-hero .wrap', '.philosophy', '.highlight-wrap',
    '.team-heading-copy', '.contact-panel', '.careers-grid',
    '.footer-hero .wrap', '.footer-grid'
  ];
  document.querySelectorAll(staggerGroups.join(',')).forEach(function (group) {
    Array.prototype.forEach.call(group.children, function (child, i) {
      child.style.transitionDelay = Math.min(i * 60, 300) + 'ms';
    });
  });

  // Give the sticky header a subtle shadow once the page has scrolled,
  // so the nav itself feels alive rather than static.
  var siteHeader = document.querySelector('header');
  if (siteHeader) {
    var updateHeaderShadow = function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 12);
    };
    updateHeaderShadow();
    window.addEventListener('scroll', updateHeaderShadow, { passive: true });
  }

  var reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveal.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add('visible'); });
  }
});

// Floating "Book a session" button: a small button fixed to the bottom of every
// page that opens the Google Forms booking form in a new tab.
(function () {
  var BOOKING_URL = 'https://forms.gle/EkrAYjz2EHahGVxm7';

  document.addEventListener('DOMContentLoaded', function () {
    var fab = document.createElement('a');
    fab.href = BOOKING_URL;
    fab.target = '_blank';
    fab.rel = 'noopener';
    fab.className = 'book-fab';
    fab.innerHTML = '<svg viewBox="0 0 20 20" aria-hidden="true"><rect x="3" y="4.5" width="14" height="12.5" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 8.5h14M7 3v3M13 3v3" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg><span>Book a session</span>';
    document.body.appendChild(fab);
  });
})();


// ---- Images and page routing ----
var ASSETS = {"book-session":"images/book-session.jpg","chien":"images/chien.jpg","cupping-therapy":"images/cupping-therapy.jpg","logo-light":"images/logo-light.png","logo":"images/logo.png","postural-assessment":"images/postural-assessment.jpg","reception":"images/reception.jpg","recovery":"images/recovery.jpg","treatment-room":"images/treatment-room.jpg"};
var TITLES = {"acupressure": "Acupressure | iCare Remedial Massage", "health-funds": "Health Funds | iCare Remedial Massage", "index": "iCare Remedial Massage | Mulgrave &amp; south-east Melbourne", "treatments": "Treatments | iCare Remedial Massage", "home-visits": "Home visits | pricing | iCare Remedial Massage", "reviews": "Reviews | iCare Remedial Massage", "careers": "Careers | iCare Remedial Massage", "remedial-massage": "Remedial massage | iCare Remedial Massage", "deep-tissue-massage": "Deep tissue massage | iCare Remedial Massage", "relaxation-massage": "Relaxation massage | iCare Remedial Massage", "pregnancy-massage": "Pregnancy massage | iCare Remedial Massage", "cupping": "Cupping | iCare Remedial Massage", "lymphatic-drainage": "Lymphatic drainage | iCare Remedial Massage", "pain-management": "Pain management | iCare Remedial Massage", "trigger-point-therapy": "Trigger point therapy | iCare Remedial Massage", "faq": "FAQ | iCare Remedial Massage", "privacy-policy": "Privacy Policy | iCare Remedial Massage", "terms": "Terms & Conditions | iCare Remedial Massage", "cancellation-policy": "Cancellation Policy | iCare Remedial Massage", "funding-claims": "Funding & Claims | iCare Remedial Massage"};
document.querySelectorAll('img[data-asset]').forEach(function (img) { img.src = ASSETS[img.getAttribute('data-asset')]; });
(function () {
  var views = {};
  document.querySelectorAll('.view').forEach(function (v) { views[v.getAttribute('data-view')] = v; });
  // TEMP-HIDE-REVIEWS: set to false (and uncomment the nav links) to bring the Reviews page back
  var HIDE_REVIEWS = true;
  if (HIDE_REVIEWS) delete views['reviews'];
  function route() {
    var parts = location.hash.replace(/^#\/?/, '').split('/');
    var page = parts[0] || 'index';
    var anchor = parts[1] || '';
    if (!views[page]) page = 'index';
    Object.keys(views).forEach(function (k) { views[k].classList.toggle('active', k === page); });
    document.title = TITLES[page];
    var target = anchor ? document.getElementById(anchor) : null;
    if (target) target.scrollIntoView(); else window.scrollTo(0, 0);
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (href === '#') { e.preventDefault(); return; }
    if (href.indexOf('#/') === 0) {
      e.preventDefault();
      if (location.hash === href) route(); else location.hash = href;
    }
  });
  window.addEventListener('hashchange', route);
  route();
})();

