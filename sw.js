const CACHE='expertise-pwa-test-v3';
self.addEventListener('install',e=>e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(['./index.html','./manifest.json','./icon.png'].map(u=>new Request(u,{cache:'reload'})));await self.skipWaiting()})()));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin||!e.request.url.startsWith(self.registration.scope))return;e.respondWith((async()=>{const c=await caches.open(CACHE);if(e.request.mode==='navigate'){try{const r=await fetch(e.request);if(r.ok)return r;}catch(_){}return await c.match('./index.html')||Response.error()}return await c.match(e.request)||fetch(e.request)})())});
