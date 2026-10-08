// Service worker de La Obra: guarda la app para usarla sin conexión.
// Al publicar una versión nueva, cambiá VERSION para que los usuarios reciban la actualización.
const VERSION = 'la-obra-v1';
const ARCHIVOS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icono-192.png',
  './icons/icono-512.png',
  './icons/icono-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png',
  './icons/icono.svg',
  './vendor/three/three.module.js',
  './vendor/three/addons/controls/OrbitControls.js',
  './vendor/three/addons/environments/RoomEnvironment.js',
  './vendor/three/addons/loaders/ColladaLoader.js',
  './vendor/three/addons/loaders/TGALoader.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Tipografías de Google: se guardan la primera vez que se usan.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(VERSION + '-fuentes').then(async c => {
      const hit = await c.match(req);
      const red = fetch(req).then(r => { c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || red;
    }));
    return;
  }
  if (url.origin !== location.origin) return;
  // La página: primero la red (para recibir cambios), si no hay conexión la copia guardada.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(r => { caches.open(VERSION).then(c => c.put('./index.html', r.clone())); return r; }).catch(() => caches.match('./index.html')));
    return;
  }
  // El resto: primero la copia guardada.
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { if (r.ok) caches.open(VERSION).then(c => c.put(req, r.clone())); return r; })));
});
