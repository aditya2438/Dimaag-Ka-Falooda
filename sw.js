// sw.js - Service Worker for Offline Mobile Play & Real-Time Sync
const CACHE_NAME = 'spider-falooda-v3.4';

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/game.js',
  '/config.js',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/screenshots/screenshot-desktop.png',
  '/screenshots/screenshot-mobile.png',
  '/audio/kesariya.mp3',
  '/audio/apna_bana_le.mp3',
  '/audio/sanam_re_lofi.mp3',
  '/audio/faasle.mp3',
  '/audio/samjho_na.mp3',
  '/audio/ishq_mubarak.mp3',
  '/audio/sahiba.mp3',
  '/audio/dhundhala.mp3',
  '/audio/haseen.mp3',
  '/audio/soni_soni.mp3',
  '/audio/jo_tum_mere_ho.mp3',
  '/audio/kho_gaye_hum_kahan.mp3',
  '/audio/sundari.mp3'
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
