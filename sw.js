const CACHE_NAME = 'rvm-metro-v1';
const ASSETS = [
  './index.html',
  './tracker.html',
  './midway.html',
  './tickets.html',
  './status.html',
  'https://cdn.tailwindcss.com'
];

// This part "installs" the app files into the phone's memory
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// This part makes the app work even when the user has NO signal at the bus stop
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});