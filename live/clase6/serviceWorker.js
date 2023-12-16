importScripts('./resources/js/cacheStrategies.js')

const CACHE_INMUTABLE_NOMBRE = 'cache-inmutable--v1';
const CACHE_ESTATICO_NOMBRE = 'cache-estatico--v1';
const CACHE_DINAMICO_NOMBRE = 'cache-dinamico--v1';

const CACHE_INMUTABLE_ARCHIVOS = [
  '/live/clase6/lib/css/icons.css',
  '/live/clase6/lib/css/material.indigo-pink.min.css',
  '/live/clase6/lib/js/handlebars.min.js',
  '/live/clase6/lib/js/material.min.js',
  '/live/clase6/lib/css/icons.woff2'
];

const CACHE_ESTATICO_ARCHIVOS = [
  '/live/clase6/',
  '/live/clase6/index.html',
  '/live/clase6/resources/css/estilos.css',
  '/live/clase6/resources/js/main.js',
  '/live/clase6/manifest.json',
  '/live/clase6/resources/images/icons/icon-72x72.png',
  '/live/clase6/resources/images/icons/icon-96x96.png',
  '/live/clase6/resources/images/icons/icon-144x144.png',
  '/live/clase6/resources/images/icons/icon-152x152.png',
  '/live/clase6/resources/images/icons/icon-192x192.png',
  '/live/clase6/resources/images/icons/icon-384x384.png',
  '/live/clase6/resources/images/icons/icon-512x512.png'
];
const CACHE_DINAMICO_ARCHIVOS = [];

////////////////////////////////////////////
function createCaches(nombreCache, ArchivosCache) {
  return caches.open(nombreCache).then(cache => {
    cache.addAll(ArchivosCache);
  })
};
///////////////////////////////////////////////


self.addEventListener("install", (e) => {

  e.waitUntil(Promise.all([
    createCaches(CACHE_INMUTABLE_NOMBRE, CACHE_INMUTABLE_ARCHIVOS),
    createCaches(CACHE_ESTATICO_NOMBRE, CACHE_ESTATICO_ARCHIVOS)
  ]));


  console.log("SW Instalado");
});

self.addEventListener("activate", (e) => {
  const activatePromise = clients.claim() // sking waiting to activate te sw
  .then(caches.keys()
  .then(
    cacheKeys =>{
      if(cacheKeys.includes(CACHE_DINAMICO_NOMBRE)){
        return caches.delete(CACHE_DINAMICO_NOMBRE)
      }
    }));
  e.waitUntil(activatePromise)
});

self.addEventListener("fetch", (e) => {
  // e.respondWith(cacheFirst(e.request))
  // e.respondWith(networkFirst(e.request))
  e.respondWith(staleWhileRevalidate(e.request))
});

self.addEventListener("sync", (e) => {
  console.log("Notificacion SYNC enviada", e);
});

self.addEventListener("push", (e) => {
  console.log("Notificacion PUSH enviada", e);
});
