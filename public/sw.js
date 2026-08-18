const CACHE_NAME = 'rashaka-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Helper to check if a request should be excluded from SW cache
function isExcludedFromCache(request, url) {
  // 1. Exclude non-GET requests or backend API requests
  if (request.method !== 'GET' || url.pathname.startsWith('/api/')) {
    return true;
  }

  // 2. Exclude all MP4 video files and video destination / range requests
  if (
    url.pathname.endsWith('.mp4') ||
    url.pathname.includes('.mp4') ||
    request.destination === 'video' ||
    request.headers.has('range')
  ) {
    return true;
  }

  // 3. Exclude all Cloudflare R2 links for videos and images
  if (
    url.hostname.includes('r2.dev') ||
    url.hostname.includes('cloudflare') ||
    url.hostname.includes('pub-e5d59e9dddd94ba9b74e5e54caa957f7')
  ) {
    return true;
  }

  // 4. Exclude external nutrition images and all external media/CDNs
  if (
    url.hostname.includes('unsplash.com') ||
    (request.destination === 'image' && url.origin !== self.location.origin) ||
    (url.origin !== self.location.origin && !url.hostname.includes(self.location.hostname))
  ) {
    return true;
  }

  return false;
}

// Install Event: Pre-cache shell assets only
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

// Fetch Event: Direct network for excluded media, Stale-While-Revalidate for app shell
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Directly bypass Service Worker Cache for videos, R2 links, external nutrition images
  if (isExcludedFromCache(event.request, url)) {
    return;
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
