const CACHE_NAME = 'rashaka-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install Event: Pre-cache shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate Strategy for fast loading
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // 1. Ignore non-GET or backend API requests
  if (event.request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return;
  }

  // 2. CRITICAL FOR ANDROID WEBVIEW & VIDEO PERFORMANCE:
  // Bypass Service Worker entirely for videos, Cloudflare R2 media, and Range requests.
  // HTML5 video requires native HTTP 206 (Partial Content) Range streaming.
  // Intercepting video streams in Service Worker causes massive delays, stalls, and buffer failures in WebView.
  const isVideo = 
    event.request.destination === 'video' ||
    url.pathname.endsWith('.mp4') ||
    url.pathname.endsWith('.webm') ||
    url.pathname.endsWith('.m4v') ||
    url.pathname.endsWith('.ogv') ||
    url.hostname.includes('r2.dev') ||
    url.hostname.includes('cloudflarestorage.com') ||
    event.request.headers.has('range');

  if (isVideo) {
    return; // Allow native browser media pipeline to fetch directly with Range headers
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for document navigation if offline
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html') || caches.match('/');
        }
      });

      // Return cached version immediately if available, otherwise wait for network fetch
      return cachedResponse || fetchPromise;
    })
  );
});
