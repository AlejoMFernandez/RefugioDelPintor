// Refugio del Pintor - V2 Inmersiva
// i18n + dynamic lists + WhatsApp + Web Audio wind fallback +
// per-scene reveal observer + active scene tracker for nav dots.

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
      const val = window.i18nGet(lang, el.getAttribute('data-i18n'));
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
    dict.place.nearby.forEach((item, idx) => {
      const li = document.createElement('li');
      li.className = 'nearby__item';
      li.setAttribute('data-reveal', '');
      li.setAttribute('data-stagger', String((idx % 5) + 1));
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
      li.setAttribute('data-stagger', String((idx % 5) + 1));

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
  }

  // ===== WhatsApp =====
  function updateWhatsAppLinks(dict) {
    const msg = encodeURIComponent(dict.booking.messageTemplate);
    const href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg;
    ['header-cta', 'booking-cta', 'footer-whatsapp'].forEach((id) => {
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

  // ===== Sound (Web Audio wind fallback) =====
  let audioContext = null;
  let gainNode = null;
  let sourceStarted = false;

  function initSoundEngine() {
    if (audioContext) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioContext = new AC();

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

    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 520;
    filter.Q.value = 0.7;

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

  // ===== Observers (per-scene reveal + active-scene tracking) =====
  let sceneRevealObserver = null;
  let activeSceneObserver = null;

  function initObservers() {
    if (!('IntersectionObserver' in window)) return;

    if (!prefersReducedMotion) {
      sceneRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            sceneRevealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }

    activeSceneObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          updateActiveDot(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
  }

  function updateActiveDot(sceneId) {
    document.querySelectorAll('.scene-nav__list a').forEach((a) => {
      a.classList.toggle('is-active', a.getAttribute('data-scene-target') === sceneId);
    });
  }

  function tagReveals() {
    const selectors = [
      '.scene__kicker',
      '.scene__heading',
      '.scene__body',
      '.scene__quote',
      '.room__count',
      '.room__capacity',
      '.nearby',
      '.scene__content--floating',
      '.scene__content--corner',
      '.booking__note',
      '.footer__tagline',
      '.footer__cols',
      '.footer__credit',
      '.cta--xl'
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (el.closest('.scene--hero')) return;
        if (!el.hasAttribute('data-reveal')) {
          el.setAttribute('data-reveal', '');
        }
      });
    });

    // Gallery items - cascade stagger
    document.querySelectorAll('.gallery__item').forEach((el, idx) => {
      el.setAttribute('data-reveal', '');
      if (!el.hasAttribute('data-stagger')) {
        el.setAttribute('data-stagger', String((idx % 5) + 1));
      }
    });

    // Stagger primary content per scene
    document.querySelectorAll('.scene').forEach((scene) => {
      const main = scene.querySelectorAll(':scope > .scene__content > [data-reveal]');
      main.forEach((el, idx) => {
        if (!el.hasAttribute('data-stagger')) {
          el.setAttribute('data-stagger', String((idx % 5) + 1));
        }
      });
    });
  }

  function observeScenes() {
    document.querySelectorAll('.scene').forEach((scene) => {
      if (sceneRevealObserver && !scene.classList.contains('scene--hero')) {
        sceneRevealObserver.observe(scene);
      }
      if (activeSceneObserver) {
        activeSceneObserver.observe(scene);
      }
    });
  }

  // ===== Hero load =====
  function triggerLoaded() {
    requestAnimationFrame(() => {
      document.body.classList.add('is-loaded');
      const hero = document.querySelector('.scene--hero');
      if (hero) hero.classList.add('is-revealed');
    });
  }

  // ===== Room detail modal =====
  const ROOM_IMAGES = {
    double: '../img/habitacion doble planta alta horizontal.jpeg',
    triple: '../img/habitacion triple cama vertical.jpeg',
    family: '../img/hacitacion planta alta horizontal.jpeg'
  };
  const ROOM_ALT_KEYS = {
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
      fillColor: '#D77948',
      color: '#FFF8EE',
      weight: 2,
      opacity: 1,
      fillOpacity: 1
    }).addTo(map).bindPopup('<strong>Refugio del Pintor</strong><br>Alverro 660, Tilcara');
    el._leafletMap = map;
  }

  // ===== Init =====
  function init() {
    initLangToggle();
    initSoundToggle();
    initObservers();

    applyLang(getLang());

    initMap();
    initRoomModal();

    tagReveals();
    observeScenes();

    triggerLoaded();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
