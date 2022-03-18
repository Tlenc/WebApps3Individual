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
            return r || fetch(e.request).then(function (response){
                return caches.open(cacheName).then(function (cache){
                    cache.put(e.request,response.clone());
                    return response;
                });
            });
            
        })
    );
});
