const V='rute-obat-v12';
const FILES=['./','index.html','manifest.webmanifest','app-192.png','app-512.png','app-maskable-192.png','app-maskable-512.png','app-apple-180.png','app-fav-64.png'];
// Simpan satu per satu: jika ada file yang belum ada di server, pemasangan tetap berjalan.
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(FILES.map(f=>c.add(f).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
// Utamakan versi terbaru dari internet; jika offline, pakai salinan tersimpan.
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(r=>{if(r.ok){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))))});
