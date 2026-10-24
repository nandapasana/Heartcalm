/* HEARTCALM - interaksi halaman
   Library: Swiper 11 (carousel masalah kulit), file lokal di vendor/swiper/ */
(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  /* Data carousel; urutannya sama dengan slide di index.html */
  var problems = [
    { t: 'Jerawat', p: 'Pori yang tersumbat dan peradangan memunculkan jerawat aktif yang terasa nyeri. HEARTCALM membantu membersihkan pori dan meredakan peradangannya.', c: ['Salicylic Acid', 'Centella Asiatica'] },
    { t: 'Kemerahan', p: 'Peradangan dan bekas jerawat sering meninggalkan kulit merah yang terasa perih. Kandungan penenang membantu warna kulit terlihat lebih merata.', c: ['Heartleaf', 'Niacinamide'] },
    { t: 'Berminyak', p: 'Minyak berlebih membuat wajah mengilap dan pori mudah tersumbat. Tekstur water gel menjaga kulit tetap segar tanpa terasa kering.', c: ['Niacinamide', 'Salicylic Acid'] },
    { t: 'Sensitif', p: 'Skin barrier yang lemah membuat kulit mudah perih, kering, dan bereaksi pada produk tertentu. Formula lembut membantu merawatnya.', c: ['Hyaluronic Acid', 'Allantoin'] }
  ];

  function showProblem(i) {
    var d = problems[i];
    $('cap').textContent = d.t;
    $('p-count').textContent = 'Masalah ' + (i + 1) + ' dari ' + problems.length;
    $('p-title').textContent = d.t;
    $('p-text').textContent = d.p;
    var chips = $('p-chips');
    chips.replaceChildren();
    var lbl = document.createElement('span');
    lbl.className = 'lbl';
    lbl.textContent = 'Bahan yang membantu';
    chips.appendChild(lbl);
    d.c.forEach(function (name) {
      var chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = name;
      chips.appendChild(chip);
    });
  }

  if (typeof Swiper !== 'undefined') {
    new Swiper('#stage', {
      effect: 'fade',
      fadeEffect: { crossFade: true },
      rewind: true,
      speed: 450,
      keyboard: { enabled: true },
      navigation: { prevEl: '#prev', nextEl: '#next' },
      pagination: { el: '#dots', clickable: true, bulletElement: 'button' },
      a11y: {
        prevSlideMessage: 'Masalah sebelumnya',
        nextSlideMessage: 'Masalah berikutnya',
        paginationBulletMessage: 'Lihat masalah {{index}}'
      },
      on: { slideChange: function (sw) { showProblem(sw.activeIndex); } }
    });
  }

  /* Newsletter: validasi di sisi klien.
     Belum terhubung ke layanan email; sambungkan ke backend/layanan form di sini. */
  var form = $('news');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var input = $('news-email');
    var v = input.value.trim();
    var msg = $('news-msg');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
      input.setAttribute('aria-invalid', 'true');
      msg.textContent = 'Masukkan alamat email yang valid, misalnya nama@email.com.';
      input.focus();
      return;
    }
    input.removeAttribute('aria-invalid');
    msg.textContent = 'Terima kasih! ' + v + ' sudah terdaftar untuk tips perawatan kulit.';
    form.reset();
  });

  /* Menu: tandai section yang sedang dibaca */
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) {
          if (a.getAttribute('href') === '#' + en.target.id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    links.forEach(function (a) {
      var target = document.querySelector(a.getAttribute('href'));
      if (target) spy.observe(target);
    });
  }

  /* Reveal ringan saat konten masuk ke layar */
  var revealItems = document.querySelectorAll('.ing, .extra-card, .problem .stage, .problem .panel, .ben, .step, .tcard');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('motion-ready');
    revealItems.forEach(function (item, i) {
      item.classList.add('reveal');
      item.style.setProperty('--reveal-delay', (i % 4) * 90 + 'ms');
    });
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }
})();
