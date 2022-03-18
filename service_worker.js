var cacheName = 'lesson_store';
var cacheFiles = [
    'index.html',
    'service_worker.js',
    'lessons.webmanifest'
];

self.addEventListener('install',(e)=>{
    console.log('[service worker] install.');
    e.waitUntil(
        caches.open(cacheName).then((cache)=>{
            console.log('[service worker] caching files.');
            return cache.addAll(cacheFiles);
        })
    )
   
}
);

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (r){
            console.log('[Service worker] Fetching resource: ' + e.request.url);
            return r
        })
    )
})
