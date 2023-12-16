function createCaches (nombreCache, ArchivosCache){
    return caches.open(nombreCache).then(cache =>{
        cache.addAll(ArchivosCache)
            })
};
////////////////////////////////////////////////

function fetchRequest(request){
    return fetch(request)
    .then(online_res =>{
        caches.open(CACHE_DINAMICO_NOMBRE)
        .then(
            cacheDinamico =>{
                cacheDinamico.put(request,online_res)
            });
        return online_res.clone();
    });
}; 

//////////////////////////////////////////////

function cacheFirst (request) {
    return caches.match(request)
        .then(cache =>{
            if(cache){
                return cache
            }else{
                return fetchRequest(request)
            }
        })
};

/////////////////////////////////////////////////

function networkFirst(request){
    return fetchRequest(request)
    .catch(()=>{
        return caches.match(request);
    })
}