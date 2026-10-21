(function () {
  /* Slot foto: tampilkan gambar yang sudah dipasang, atau pratinjau dari file yang dipilih */
  document.querySelectorAll('.slot').forEach(function (slot) {
    var input = slot.querySelector('input[type=file]');
    var img = slot.querySelector('img');
    if (img && img.getAttribute('src')) { slot.classList.add('filled'); img.hidden = false; }
    if (!input || !img) return;
    input.addEventListener('change', function () {
      var f = input.files && input.files[0];
      if (!f || f.type.indexOf('image/') !== 0) return;
      var r = new FileReader();
      r.onload = function () { img.src = r.result; img.hidden = false; slot.classList.add('filled'); };
      r.readAsDataURL(f);
    });
  });

  /* Carousel permasalahan */
  var data = [
    { t: 'Jerawat', p: 'Pori yang tersumbat dan peradangan memunculkan jerawat aktif yang terasa nyeri. HEARTCALM membantu membersihkan pori dan meredakan peradangannya.', c: ['Salicylic Acid', 'Centella Asiatica'] },
    { t: 'Kemerahan', p: 'Peradangan dan bekas jerawat sering meninggalkan kulit merah yang terasa perih. Kandungan penenang membantu warna kulit terlihat lebih merata.', c: ['Heartleaf', 'Niacinamide'] },
    { t: 'Berminyak', p: 'Minyak berlebih membuat wajah mengilap dan pori mudah tersumbat. Tekstur water gel menjaga kulit tetap segar tanpa terasa kering.', c: ['Niacinamide', 'Salicylic Acid'] },
    { t: 'Sensitif', p: 'Skin barrier yang lemah membuat kulit mudah perih, kering, dan bereaksi pada produk tertentu. Formula lembut membantu merawatnya.', c: ['Hyaluronic Acid', 'Allantoin'] }
  ];
  var slides = Array.prototype.slice.call(document.querySelectorAll('#stage .slot'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('#dots button'));
  var idx = 0;
  function go(i) {
    idx = (i + data.length) % data.length;
    slides.forEach(function (s, k) { s.classList.toggle('on', k === idx); });
    dots.forEach(function (d, k) { d.setAttribute('aria-current', k === idx ? 'true' : 'false'); });
    var d = data[idx];
    document.getElementById('cap').textContent = d.t;
    document.getElementById('p-count').textContent = 'Masalah ' + (idx + 1) + ' dari ' + data.length;
    document.getElementById('p-title').textContent = d.t;
    document.getElementById('p-text').textContent = d.p;
    var chips = document.getElementById('p-chips');
    chips.innerHTML = '<span class="lbl">Bahan yang membantu</span>' + d.c.map(function (x) { return '<span class="chip">' + x + '</span>'; }).join('');
  }
  document.getElementById('prev').addEventListener('click', function () { go(idx - 1); });
  document.getElementById('next').addEventListener('click', function () { go(idx + 1); });
  dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });

  /* Newsletter (contoh, belum terhubung ke layanan email) */
  document.getElementById('news').addEventListener('submit', function (e) {
    e.preventDefault();
    var v = document.getElementById('news-email').value.trim();
    var msg = document.getElementById('news-msg');
    msg.textContent = /^\S+@\S+\.\S+$/.test(v)
      ? 'Ini formulir contoh untuk portofolio, belum terhubung ke layanan email.'
      : 'Masukkan alamat email yang valid, misalnya nama@email.com.';
  });

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
