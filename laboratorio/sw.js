
importScripts('./js/cacheStratigies.js')

const CACHE_INMUTABLE_NOMBRE = 'cache-inmutable-lab--v1';
const CACHE_ESTATICO_NOMBRE = 'cache-estatico-lab--v1';
const CACHE_DINAMICO_NOMBRE = 'cache-DINAMICO-lab--v1';

const CACHE_INMUTABLE_ARCHIVOS = [];// librerias locales
const CACHE_ESTATICO_ARCHIVOS = [
'/laboratorio/',
'/laboratorio/index.html',
'/laboratorio/manifest.json',
'/laboratorio/css/style.css',
'/laboratorio/images/icons/icon-72x72.png',
'/laboratorio/images/icons/icon-96x96.png',
'/laboratorio/images/icons/icon-128x128.png',
'/laboratorio/images/icons/icon-144x144.png',
'/laboratorio/images/icons/icon-152x152.png',
'/laboratorio/images/icons/icon-192x192.png',
'/laboratorio/images/icons/icon-384x384.png',
'/laboratorio/images/icons/icon-512x512.png',
'/laboratorio/images/screenshot.png',
'/laboratorio/js/main.js',
'/laboratorio/js/variables.js'
];
const CACHE_DINAMICO_ARCHIVOS = [];


self.addEventListener('install', (e) => {
    // console.log('SW instalado', e)

    e.waitUntil(Promise.all([
        createCaches(CACHE_INMUTABLE_NOMBRE,CACHE_INMUTABLE_ARCHIVOS),
        createCaches(CACHE_ESTATICO_NOMBRE,CACHE_ESTATICO_ARCHIVOS)]));

    console.log('SW instalado')
});

self.addEventListener('activate', (e) => {
    // skipWaiting
    const activatePromiseCaches = clients.claim()
    .then(caches.keys()
    .then(
        cachesKeys =>{
            if(cachesKeys.includes(CACHE_DINAMICO_NOMBRE)){
                return caches.delete(CACHE_DINAMICO_NOMBRE)
            } // limpieza cache dinamico
        }
    ));
    e.waitUntil(activatePromiseCaches)
});

self.addEventListener('fetch', (e) => {
    e.respondWith(cacheFirst(e.request))
});

self.addEventListener('sync', (e)=>{
    console.log('notificacion sync enviada',e)
})

self.addEventListener('push',(e)=>{
    console.log('notificacion push enviada',e)
})