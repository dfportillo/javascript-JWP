/* fun fetch */

function fetchRequest(request) {
    return fetch(request)
        .then(onlineResponse => {
            caches.open(CACHE_DINAMICO_NOMBRE)
                .then(
                    cacheDinamico => {
                        cacheDinamico.put(request, onlineResponse)
                    });

            return onlineResponse.clone();
        })
}

/* primero busca por cache  */

///////////////////////////////////////////////////////////////////////////////////
function cacheFirst(request) {
    return caches.match(request)
        .then(cache => {
            if (cache) {
                return cache;
            } else {
                return fetchRequest(request)
            }
        })
}


/* primero busca de internet */
///////////////////////////////////////////////////////////////////////////////////
function networkFirst(request) {
    return fetchRequest(request)
        .catch(() => {
            return caches.match(request);
        });
};
//////////////////////////////////////////////////////////////////////////////////

/* obsoleto mientras se revalida */

// 1.) entra una solicitud de la red
// 2.) cachea la respuesta 
// 3.) las proximas las trae del cache 
// 4.) actualiza cache

function staleWhileRevalidate(request) {
    return caches.match(request)
        .then(matchRequest => {
            if (matchRequest) {
                fetch(request)
                    .then(online_res => {
                        caches.open(CACHE_DINAMICO_NOMBRE)
                            .then(cacheDinamico => {
                                cacheDinamico.put(request.online_res)
                            });
                    });
                return matchRequest;
            }else{
                fetchRequest(request)
            };
        });
};