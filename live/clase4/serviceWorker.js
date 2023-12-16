const listadoDeArchivosLocales =
    ['/lib/js/handlebars.min.js',
        'lib/css/icons.css',
        'lib/css/material.indigo-pink.min.css',
        'lib/js/material.min.js',
        'resources/css/estilos.css',
        'manifest.json',
        'resources/js/main.js'
    ];

self.addEventListener("install", (e) => {
    // precargar cache;
    // e.waitUntil(promesasDePrecargarCache);
});

self.addEventListener("activate", (e) => {
    // actualizar esquemas de background data;
    // borrar caches viejos;
    // e.waitUntil(promesasDeBorrarCachesViejos);
});

self.addEventListener("fetch", (e) => {
    const archivoLocal = listadoDeArchivosLocales.find(archivo => e.request.url.endsWith(archivo));
    if (archivoLocal) {
        e.respondWith(fetch('./' + archivoLocal))
    };
});

self.addEventListener('push',(e)=>{
    console.log('notificacion push enviada',e)
})
