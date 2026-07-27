// ---------- language toggle ----------
(function () {
  var lang = 'en'; // default language
  var buttons = document.querySelectorAll('.lang button');
  var i18nEls = document.querySelectorAll('[data-es][data-en]');

  function apply(next) {
    lang = next;
    document.documentElement.lang = next;
    i18nEls.forEach(function (el) {
      var val = el.getAttribute('data-' + next);
      if (val !== null) el.innerHTML = val;
    });
    buttons.forEach(function (b) {
      var on = b.getAttribute('data-lang') === next;
      b.classList.toggle('active', on);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () {
      apply(b.getAttribute('data-lang'));
    });
  });

  // ensure the page starts in the default language
  apply(lang);
})();

// ---------- typing effect for the hero ----------
(function () {
  var target = document.getElementById('typed');
  if (!target) return;
  var reduce = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var full = [{ t: 'Hello ', c: 'hello' }, { t: 'World', c: 'world' }];

  if (reduce) {
    full.forEach(function (seg) {
      var s = document.createElement('span');
      s.className = seg.c;
      s.textContent = seg.t;
      target.appendChild(s);
    });
    return;
  }

  var flat = [];
  full.forEach(function (seg) {
    for (var i = 0; i < seg.t.length; i++) flat.push({ ch: seg.t[i], c: seg.c });
  });

  var spans = {};
  flat.forEach(function (f) {
    if (!spans[f.c]) {
      var s = document.createElement('span');
      s.className = f.c;
      target.appendChild(s);
      spans[f.c] = s;
    }
  });

  var idx = 0;
  function tick() {
    if (idx >= flat.length) return;
    var f = flat[idx];
    spans[f.c].textContent += f.ch;
    idx++;
    setTimeout(tick, 90);
  }
  setTimeout(tick, 350);
})();

// ---------- scroll reveal ----------
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (e) { e.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: .15 });
  els.forEach(function (e) { io.observe(e); });
})();
