document.documentElement.classList.add('js-ready');

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
      });
    });
  }
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header: starts tall/dark over the hero, shrinks into the light compact
  // bar once the page scrolls past a small threshold.
  var header = document.getElementById('siteHeader');
  if (header) {
    var updateHeaderScroll = function () {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateHeaderScroll, { passive: true });
    updateHeaderScroll();
  }

  // Fluid scroll-reveal: fade/slide elements in as they enter the viewport
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
    // Safety net: if something keeps an element from ever intersecting
    // (edge cases, very fast scroll, etc.), don't leave it hidden forever.
    setTimeout(function () {
      revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }, 4000);
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }
});
