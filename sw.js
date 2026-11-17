// Service worker del Juego del Sim
// Sube VERSION cada vez que publiques cambios para que los móviles se actualicen.
const VERSION = 'sim-v1';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon.png'
];
const PEERJS = 'https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(async c => {
    await c.addAll(CORE);
    try { await c.add(new Request(PEERJS, { mode: 'no-cors' })); } catch (err) {}
  }));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Solo app propia + librería PeerJS; el resto (servidor de PeerJS) va directo a la red
  if (url.origin !== location.origin && req.url !== PEERJS) return;

  // Páginas: red primero (para recibir actualizaciones), caché si no hay conexión
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        if (r.ok) { const copy = r.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); }
        return r;
      })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }
  // Resto: caché primero
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(r => {
      const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r;
    }))
  );
});
