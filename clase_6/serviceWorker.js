importScripts('./resources/js/cache-strategies.js')

self.addEventListener("install", (e) => {

const cachePromisesAll = Promise.all([ // metodo para poder realizar varias promesas al mismo tiempo
    
    create_cache(CACHE_INMUTABLE_NOMBRE,CACHE_INMUTABLE_ARCHIVOS),
    create_cache(CACHE_ESTATICO_NOMBRE,CACHE_ESTATICO_ARCHIVOS)

]);

    e.waitUntil(cachePromisesAll);
    console.log("SW Instalado");
});

self.addEventListener("activate", (e) => {//https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim
    const activatePromise = clients.claim()
            .then(caches.keys()
                .then(cachesKeys => {
                    if(cachesKeys.includes(CACHE_DINAMICO_NOMBRE)){
                        return caches.delete(CACHE_DINAMICO_NOMBRE);
                    };
                }));
    e.waitUntil(activatePromise);
});

self.addEventListener("fetch", (e) => {
    e.respondWith(cacheFirst(e.request));
//   e.respondWith(networkFirst(e.request));
//   e.respondWith(staleWhileRevalidate(e.request));
});

self.addEventListener("sync", (e) => {
    console.log("Notificacion SYNC enviada", e);
});

self.addEventListener("push", (e) => {
    console.log("Notificacion PUSH enviada", e);
});