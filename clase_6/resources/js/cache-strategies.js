// var caches

const CACHE_INMUTABLE_NOMBRE = 'cache--inmutable-v1';
const CACHE_ESTATICO_NOMBRE = 'cache--estatico-v1';
const CACHE_DINAMICO_NOMBRE = 'cache--dinamico-v1';

const CACHE_INMUTABLE_ARCHIVOS = [
    '/lib/css/icons.css',
    '/lib/css/material.indigo-pink.min.css',
    '/lib/js/handlebars.min.js',
    '/lib/js/material.min.js',
    '/lib/css/fonts/material_icons.woff2'  

];

const CACHE_ESTATICO_ARCHIVOS = [
    './',
    '/index.html',
    '/resources/css/estilos.css',
    '/resources/js/main.js',
    '/manifest.json',
    'resources/images/icons/icon-72x72.png',
    'resources/images/icons/icon-96x96.png',
    'resources/images/icons/icon-128x128.png',
    'resources/images/icons/icon-144x144.png',
    'resources/images/icons/icon-152x152.png',
    'resources/images/icons/icon-192x192.png',
    'resources/images/icons/icon-384x384.png',
    'resources/images/icons/icon-512x512.png'
];

const CACHE_DINAMICO_ARCHIVOS = [

];


// create cache

function create_cache (cacheName , cacheFiles) {
    return caches.open(cacheName)
                 .then(cName => {cName.addAll(cacheFiles)});
};

// funcion FETCH AND CACHE 

function fetchAndCache (request) {
    return fetch(request).then(onlineRes => {
        caches.open(CACHE_DINAMICO_NOMBRE)
            .then(chache_onlineRes =>{
                chache_onlineRes.put(request,onlineRes)
            });
            return onlineRes.clone();
    });
}

// cache first fallback no net, si no esta recurrir a la red

function cacheFirst (request) {
    return caches.match(request)
            .then(matchCacheRequest => {
                if(matchCacheRequest){
                    return matchCacheRequest;
                } else {
                    return fetchAndCache(request)
                }
            });
};

// network first si no lo encuentra en la red recurrir al cache 

function networkFirst (request) {
    return fetchAndCache(request).catch(()=>{
        return caches.match(request)
    });
};

//obsoleto mientras se revalida 
//la primera vez cachea la respuesta y la cachea de una vez 
//despues las proximas solicitudes las trae del cache y en background las actualiza

function staleWhileRevalidate(request){
    return caches.match(request).then(matchRequest => {
        if(matchRequest){
            fetch(request).then(online_res => {
                caches.open(CACHE_DINAMICO_NOMBRE).then(cacheDinamico =>{
                    cacheDinamico.put(request,online_res);
                });
            });
            return matchRequest;
        } else {
            return fetchAndCache(request);
        };
    });
};