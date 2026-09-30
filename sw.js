const CACHE = 'apexora-v5';
const CORE = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
    if (url.pathname.endsWith('/musica.mp3')) return;
  const store = res => { if (res.status === 200) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; };
  if (/\.(png|jpe?g|webp|gif|mp3|ogg|wav)$/i.test(url.pathname)) {
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(store)));
    return;
  }
  e.respondWith(fetch(e.request).then(store).catch(() => caches.match(e.request)));
});