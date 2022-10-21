const listadoDeARchivosLocales = [
    'lib/js/material.min.js',
    'lib/css/icons.css',
    'lib/css/material.indigo-pink.min.css',
    'resources/css/estilos.css',
    'manifest.json'
];

self.addEventListener("install", (e) => {
    // preCargar cache
    // e.waitUntil(promesaDeCargarCache);
});

self.addEventListener("activate", (e) => {
    // actualizar esquemas de BD
    // borrar caches
    // e.waitUntil(borrarPromesasDeCache);

});

self.addEventListener("fetch", (e) => {
    let archivioLocal = listadoDeARchivosLocales.find(archivo => e.request.url.endsWith(archivo))
    if(archivioLocal){
        e.respondWith(fetch('./' + archivioLocal))
    }
});

self.addEventListener("push", (e)=>{
    console.log('notificacion push enviada', e)
});

// continua en clase 6