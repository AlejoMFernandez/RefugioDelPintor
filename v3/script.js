// Refugio del Pintor - V1 Editorial
// Handles: i18n toggle, dynamic lists, WhatsApp CTAs,
// ambient sound (Web Audio fallback = filtered noise),
// header scroll state, IntersectionObserver scroll reveals,
// initial hero load animation, prefers-reduced-motion.

(function () {
  'use strict';

  const STORAGE_LANG = 'rdp-lang';
  const WHATSAPP_NUMBER = '5493884385736';

  // Service icons matched by index to dict.services.items: bath, heating, wifi, sommier, linen, amenities
  const SERVICE_ICONS = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v4"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.91 5.81L20 10.5l-6.09 1.69L12 18l-1.91-5.81L4 10.5l6.09-1.69L12 3z"/></svg>'
  ];
  const BREAKFAST_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></svg>';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ===== i18n =====
  function getLang() {
    const stored = localStorage.getItem(STORAGE_LANG);
    if (stored === 'es' || stored === 'en') return stored;
    return 'es';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_LANG, lang);
    applyLang(lang);
  }

  function applyLang(lang) {
    const dict = window.I18N && window.I18N[lang];
    if (!dict) return;

    document.documentElement.setAttribute('lang', dict.meta.langCode);
    document.documentElement.setAttribute('data-lang', lang);

    if (dict.meta.title) document.title = dict.meta.title;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const path = el.getAttribute('data-i18n');
      const val = window.i18nGet(lang, path);
      if (typeof val === 'string') el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-alt]').forEach((el) => {
      const val = window.i18nGet(lang, el.getAttribute('data-i18n-alt'));
      if (typeof val === 'string') el.setAttribute('alt', val);
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
      const val = window.i18nGet(lang, el.getAttribute('data-i18n-aria-label'));
      if (typeof val === 'string') el.setAttribute('aria-label', val);
    });

    document.querySelectorAll('[data-i18n-content]').forEach((el) => {
      const val = window.i18nGet(lang, el.getAttribute('data-i18n-content'));
      if (typeof val === 'string') el.setAttribute('content', val);
    });

    renderNearby(dict);
    renderServices(dict);
    renderReviews(dict);
    updateWhatsAppLinks(dict);
    syncSoundLabel(lang);
  }

  // ===== Dynamic lists =====
  function renderNearby(dict) {
    const list = document.getElementById('nearby-list');
    if (!list) return;
    list.innerHTML = '';
    dict.place.nearby.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'nearby__item';
      const name = document.createElement('span');
      name.className = 'nearby__item-name';
      name.textContent = item.name;
      const dist = document.createElement('span');
      dist.className = 'nearby__item-distance';
      dist.textContent = item.distance;
      li.appendChild(name);
      li.appendChild(dist);
      list.appendChild(li);
    });
  }

  function renderServices(dict) {
    const list = document.getElementById('services-list');
    if (!list) return;
    list.innerHTML = '';
    dict.services.items.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'services__item';
      li.setAttribute('data-reveal', '');
      li.setAttribute('data-stagger', String((idx % 3) + 1));

      const iconWrap = document.createElement('span');
      iconWrap.className = 'services__icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      iconWrap.innerHTML = SERVICE_ICONS[idx] || '';

      const textWrap = document.createElement('div');
      textWrap.className = 'services__text';
      const h4 = document.createElement('h4');
      h4.textContent = item.title;
      const p = document.createElement('p');
      p.textContent = item.body;
      textWrap.appendChild(h4);
      textWrap.appendChild(p);

      li.appendChild(iconWrap);
      li.appendChild(textWrap);
      list.appendChild(li);
    });

    if (dict.breakfast) {
      const li = document.createElement('li');
      li.className = 'services__item services__item--highlight';
      li.setAttribute('data-reveal', '');
      li.setAttribute('data-stagger', '1');
      const iconWrap = document.createElement('span');
      iconWrap.className = 'services__icon';
      iconWrap.setAttribute('aria-hidden', 'true');
      iconWrap.innerHTML = BREAKFAST_ICON;
      const textWrap = document.createElement('div');
      textWrap.className = 'services__text';
      const h4 = document.createElement('h4');
      h4.textContent = dict.breakfast.heading;
      const p = document.createElement('p');
      p.textContent = dict.breakfast.body;
      textWrap.appendChild(h4);
      textWrap.appendChild(p);
      li.appendChild(iconWrap);
      li.appendChild(textWrap);
      list.appendChild(li);
    }

    observeReveals(list);
  }

  function renderReviews(dict) {
    const list = document.getElementById('reviews-list');
    if (!list) return;
    list.innerHTML = '';
    dict.reviews.items.forEach((review, idx) => {
      const fig = document.createElement('figure');
      fig.className = 'review';
      fig.setAttribute('data-reveal', '');
      fig.setAttribute('data-stagger', String(idx + 1));

      const quote = document.createElement('blockquote');
      quote.className = 'review__quote';
      quote.textContent = review.quote;

      const meta = document.createElement('figcaption');
      meta.className = 'review__meta';

      const author = document.createElement('span');
      author.className = 'review__author';
      author.textContent = review.author;

      const ctx = document.createElement('span');
      ctx.className = 'review__context';
      ctx.textContent = review.context;

      const rating = document.createElement('span');
      rating.className = 'review__rating';
      rating.textContent = review.rating;

      meta.appendChild(author);
      meta.appendChild(ctx);
      meta.appendChild(rating);

      fig.appendChild(quote);
      fig.appendChild(meta);
      list.appendChild(fig);
    });
    observeReveals(list);
  }

  // ===== WhatsApp =====
  function updateWhatsAppLinks(dict) {
    const msg = encodeURIComponent(dict.booking.messageTemplate);
    const href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg;
    ['hero-cta', 'header-cta', 'booking-cta', 'promo-cta', 'footer-whatsapp'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.setAttribute('href', href);
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });
  }

  // ===== Language toggle =====
  function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = getLang() === 'es' ? 'en' : 'es';
      setLang(next);
    });
  }

  // ===== Active nav highlight (V3 multipage) =====
  function highlightActiveNav() {
    const page = document.body.getAttribute('data-page');
    if (!page) return;
    document.querySelectorAll('.nav a[data-nav]').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('data-nav') === page);
    });
  }

  // ===== Ambient sound (Web Audio API fallback = filtered noise = wind) =====
  let audioContext = null;
  let gainNode = null;
  let sourceStarted = false;

  function initSoundEngine() {
    if (audioContext) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioContext = new AC();

    // Pink noise (Paul Kellet's economical method) - gentler than white
    const seconds = 4;
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * seconds, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const noise = audioContext.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    // Low-pass filter shapes noise into "wind"
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 0.7;

    // Slow LFO modulates the cutoff for organic variance
    const lfo = audioContext.createOscillator();
    lfo.frequency.value = 0.08;
    const lfoGain = audioContext.createGain();
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    gainNode = audioContext.createGain();
    gainNode.gain.value = 0;

    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    lfo.start();
    noise.start();
    sourceStarted = true;
  }

  function startSound() {
    initSoundEngine();
    if (!audioContext) return;
    if (audioContext.state === 'suspended') audioContext.resume();
    const now = audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0.16, now + 1.4);
  }

  function stopSound() {
    if (!gainNode || !audioContext) return;
    const now = audioContext.currentTime;
    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.setValueAtTime(gainNode.gain.value, now);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.7);
  }

  function syncSoundLabel(lang) {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;
    const pressed = btn.getAttribute('aria-pressed') === 'true';
    const key = pressed ? 'header.soundOffAria' : 'header.soundOnAria';
    const label = window.i18nGet(lang, key);
    if (label) btn.setAttribute('aria-label', label);
  }

  function initSoundToggle() {
    const btn = document.getElementById('sound-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const pressed = btn.getAttribute('aria-pressed') === 'true';
      if (pressed) {
        stopSound();
        btn.setAttribute('aria-pressed', 'false');
      } else {
        startSound();
        btn.setAttribute('aria-pressed', 'true');
      }
      syncSoundLabel(getLang());
    });
  }

  // ===== Header scrolled state =====
  function initHeaderScroll() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  // ===== Scroll reveals (IntersectionObserver) =====
  let revealObserver = null;

  function initRevealObserver() {
    if (prefersReducedMotion) return;
    if (!('IntersectionObserver' in window)) return;
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05,
      rootMargin: '0px 0px -80px 0px'
    });
  }

  function tagReveals() {
    const selectors = [
      '.section__kicker',
      '.section__heading',
      '.section__lead',
      '.section__body',
      '.origin__figure',
      '.origin__quote',
      '.place__columns > p',
      '.nearby__heading',
      '.nearby__item',
      '.room__figure',
      '.room__count',
      '.room__name',
      '.room__capacity',
      '.room__body',
      '.floors__heading',
      '.floors__col',
      '.gallery__item',
      '.location__map',
      '.section--location .cta--ghost',
      '.booking__note',
      '.section--booking .cta',
      '.site-footer__tagline',
      '.site-footer__cols',
      '.site-footer__bottom'
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.closest('.hero')) return;
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', '');
        }
      });
    });

    // Stagger for gallery items
    document.querySelectorAll('.gallery__item').forEach((el, idx) => {
      if (!el.hasAttribute('data-stagger')) {
        el.setAttribute('data-stagger', String((idx % 4) + 1));
      }
    });

    // Stagger for nearby items
    document.querySelectorAll('.nearby__item').forEach((el, idx) => {
      if (!el.hasAttribute('data-stagger')) {
        el.setAttribute('data-stagger', String((idx % 4) + 1));
      }
    });
  }

  function observeReveals(scope) {
    if (!revealObserver) return;
    const root = scope || document;
    root.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  // ===== Hero load animation =====
  function triggerLoaded() {
    requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
    });
  }

  // ===== Room detail modal =====
  const ROOM_IMAGES = {
    single: '../img/habitacion doble planta alta horizontal.jpeg',
    double: '../img/habitacion doble planta alta horizontal.jpeg',
    triple: '../img/habitacion triple cama vertical.jpeg',
    family: '../img/hacitacion planta alta horizontal.jpeg'
  };
  const ROOM_ALT_KEYS = {
    single: 'alt.roomDouble',
    double: 'alt.roomDouble',
    triple: 'alt.roomTriple',
    family: 'alt.roomFamily'
  };

  function openRoomModal(roomKey) {
    const lang = getLang();
    const room = window.i18nGet(lang, 'rooms.' + roomKey);
    const modal = document.getElementById('room-modal');
    if (!room || !modal) return;

    const img = document.getElementById('room-modal-img');
    if (img) {
      img.src = ROOM_IMAGES[roomKey] || '';
      img.alt = window.i18nGet(lang, ROOM_ALT_KEYS[roomKey]) || room.name || '';
    }

    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val || '';
    };
    setText('room-modal-count', room.countLabel);
    setText('room-modal-name', room.name);
    setText('room-modal-capacity', room.capacity);
    const rateLabel = window.i18nGet(lang, 'rooms.rateLabel') || '';
    setText('room-modal-rate', room.rate ? room.rate + ' ' + rateLabel : '');
    setText('room-modal-body', room.body);
    setText('room-modal-bath', room.bath);
    setText('room-modal-view', room.view);

    const amenList = document.getElementById('room-modal-amenities');
    if (amenList) {
      amenList.innerHTML = '';
      if (Array.isArray(room.amenities)) {
        room.amenities.forEach((a) => {
          const li = document.createElement('li');
          li.textContent = a;
          amenList.appendChild(li);
        });
      }
    }

    const cta = document.getElementById('room-modal-cta');
    if (cta) {
      const msg = encodeURIComponent(room.bookingMessage || '');
      cta.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg;
    }

    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    const closeBtn = modal.querySelector('[data-close-modal]');
    if (closeBtn) closeBtn.focus();
  }

  function closeRoomModal() {
    const modal = document.getElementById('room-modal');
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  function initRoomModal() {
    const modal = document.getElementById('room-modal');
    if (!modal) return;
    document.querySelectorAll('[data-room-open]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openRoomModal(btn.getAttribute('data-room-open'));
      });
    });
    modal.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', closeRoomModal);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.hidden) closeRoomModal();
    });
  }

  // ===== Map (Leaflet) =====
  function initMap() {
    const el = document.getElementById('map');
    if (!el || typeof L === 'undefined') return;
    if (el._leafletMap) return;
    const lat = -23.576;
    const lng = -65.393;
    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: false
    }).setView([lat, lng], 16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    L.circleMarker([lat, lng], {
      radius: 9,
      fillColor: '#B8542F',
      color: '#FFF8EE',
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    }).addTo(map).bindPopup('<strong>Refugio del Pintor</strong><br>Alverro 660, Tilcara');
    el._leafletMap = map;
  }

  // ===== Init =====
  function init() {
    const hdr = document.querySelector('.site-header');
    if (hdr) document.documentElement.style.setProperty('--header-h', hdr.offsetHeight + 'px');

    highlightActiveNav();
    initLangToggle();
    initSoundToggle();
    initHeaderScroll();
    initRevealObserver();

    applyLang(getLang());

    initMap();
    initRoomModal();

    tagReveals();
    observeReveals(document);

    triggerLoaded();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
