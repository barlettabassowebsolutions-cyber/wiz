(function () {
  // Mobile menu
  var burger = document.querySelector('.nav-burger');
  var links = document.getElementById('nav-links');
  function closeMenu() {
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
  }
  burger.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  // Close the menu and the "Our Food" dropdown after picking a link
  var dropdown = document.querySelector('.dropdown');
  links.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      closeMenu();
      dropdown.removeAttribute('open');
    }
  });
  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target)) dropdown.removeAttribute('open');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { dropdown.removeAttribute('open'); closeMenu(); }
  });

  // Click-to-load map
  var facade = document.querySelector('.map-facade');
  facade.addEventListener('click', function () {
    var iframe = document.createElement('iframe');
    iframe.src = facade.dataset.src;
    iframe.title = "Map to Manolo's Rodizio & Seafood Restaurant";
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    facade.replaceWith(iframe);
  });

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  // Back to top
  var backTop = document.querySelector('.back-top');
  window.addEventListener('scroll', function () {
    backTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  backTop.addEventListener('click', function () { window.scrollTo({ top: 0 }); });

  // Contact form: submit through Netlify Forms when deployed there
  var form = document.querySelector('.contact-form');
  var status = form.querySelector('.form-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = 'Sending…';
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    }).then(function (res) {
      if (!res.ok) throw new Error(res.status);
      form.reset();
      status.textContent = "Thanks! We'll be in touch shortly.";
    }).catch(function () {
      status.textContent = "Sorry, that didn't go through. Please call us at (516) 774-5573.";
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
