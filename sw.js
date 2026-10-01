const V='rute-obat-v10';
const FILES=['./','index.html','manifest.webmanifest','icons/app-192.png','icons/app-512.png','icons/app-maskable-192.png','icons/app-maskable-512.png','icons/app-apple-180.png','icons/app-fav-64.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
// Utamakan versi terbaru dari internet; jika offline, pakai salinan tersimpan.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
