// service-worker.js

const CACHE_NAME = 'travelpro-v1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/src/app.js',
  '/src/components.js',
  '/src/handlers.js',
  '/src/slider.js',
  '/src/chatbot.js',
  '/manifest.json',
  // Add data files
  '/data/blogs.json',
  '/data/destinations.json',
  '/data/faq.json',
  '/data/hero.json',
  '/data/hotels.json',
  '/data/packages.json',
  '/data/reviews.json'
];

// Install event - cache key assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - implement cache-first strategy
self.addEventListener('fetch', event => {
  // Skip cross-origin requests (like API calls)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request because it's a stream and can only be consumed once
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(response => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });

          return response;
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});