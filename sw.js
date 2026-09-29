// sw.js - Service Worker for Offline Mobile Play & Real-Time Sync
const CACHE_NAME = 'spider-falooda-v3.5.0';

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/game.js",
  "/config.js",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-512-maskable.png",
  "/screenshots/screenshot-desktop.png",
  "/screenshots/screenshot-mobile.png",
  "/audio/aao_milo_chalo.mp3",
  "/audio/apna_bana_le.mp3",
  "/audio/bakhuda_tumhi_ho.mp3",
  "/audio/bulleya.mp3",
  "/audio/chahun_main_ya_naa.mp3",
  "/audio/channa_mereya.mp3",
  "/audio/deewani_mastani.mp3",
  "/audio/dhundhala.mp3",
  "/audio/dil_diyan_gallan.mp3",
  "/audio/faasle.mp3",
  "/audio/galliyan.mp3",
  "/audio/hale_dil.mp3",
  "/audio/haseen.mp3",
  "/audio/hum_mar_jayenge.mp3",
  "/audio/iktara.mp3",
  "/audio/ilahi.mp3",
  "/audio/ishq_mubarak.mp3",
  "/audio/jo_tum_mere_ho.mp3",
  "/audio/kabira.mp3",
  "/audio/kesariya.mp3",
  "/audio/khairiyat.mp3",
  "/audio/kho_gaye_hum_kahan.mp3",
  "/audio/labon_ko.mp3",
  "/audio/main_rang_sharbaton_ka.mp3",
  "/audio/mast_magan.mp3",
  "/audio/mauja_hi_mauja.mp3",
  "/audio/meherbaan.mp3",
  "/audio/muskurane.mp3",
  "/audio/pani_da_rang.mp3",
  "/audio/pee_loon.mp3",
  "/audio/pehli_nazar_mein.mp3",
  "/audio/piya_aaye_na.mp3",
  "/audio/raabta.mp3",
  "/audio/sahiba.mp3",
  "/audio/samjhawan.mp3",
  "/audio/samjho_na.mp3",
  "/audio/sanam_re_lofi.mp3",
  "/audio/sawan_aaya_hai.mp3",
  "/audio/shayad.mp3",
  "/audio/soch_na_sake.mp3",
  "/audio/soni_soni.mp3",
  "/audio/subhanallah.mp3",
  "/audio/sundari.mp3",
  "/audio/sunn_raha_hai.mp3",
  "/audio/tera_hone_laga_hoon.mp3",
  "/audio/teri_meri.mp3",
  "/audio/tu_hi_haqeeqat.mp3",
  "/audio/tum_hi_ho.mp3",
  "/audio/tum_se_hi.mp3",
  "/audio/yeh_ishq_hai.mp3"
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline assets...');
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('[ServiceWorker] Some assets could not be cached immediately:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Purging outdated cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Allow native browser range-streaming for audio files without SW interception
  if (event.request.headers && event.request.headers.get('range')) {
    return;
  }
  const url = new URL(event.request.url);

  // 1. Network-first for leaderboard & server API submissions
  if (url.pathname.includes('/api/') || url.hostname.includes('supabase.co')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ offline: true, message: 'Offline mode active. Score queued locally.' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 503
        });
      })
    );
    return;
  }

  // 2. Network-First with cache fallback for code scripts, styles, and HTML
  // Guarantees all players instantly receive fresh leaderboard, styling, and game logic!
  if (
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.html') ||
    url.pathname === '/' ||
    url.pathname.endsWith('/manifest.json')
  ) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(event.request).then((cached) => {
            if (cached) return cached;
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html') || caches.match('/');
            }
          });
        })
    );
    return;
  }

  // 3. Cache-first for audio tracks and visual images (heavy assets)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    })
  );
});
