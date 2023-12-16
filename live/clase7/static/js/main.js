// const { SubwaySharp } = require("@mui/icons-material");

let VAPID_PUBLIC_KEY = null;
let registration = null;
let subscription = null;

/////////////////////////////////////////

fetch("/vapidPublicKey")
    .then(res => res.text())
    .then(clavePublica => {
        VAPID_PUBLIC_KEY = clavePublica;
        register()
    })

function register() {
    if (('serviceWorker' in navigator) && ('PushManager' in window)) {
        navigator.serviceWorker.register('./sw.js')
            .then(_registration => {
                registration = _registration;
                registration.pushManager.subscribe({
                    applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY),
                    userVisibleOnly: true,
                })
                    .then(_suscription => {
                        subscription = _suscription;
                    })
            })
    }
}


/// Función necesaria para convertir la VAPID KEY En un formato procesable
function urlB64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

document.querySelector('button').addEventListener('click',(e) => {
    console.log('la notificacion fue enviada',e)
    if(registration && subscription){
        fetch('/suscribir',{
            method:'post',
            body:JSON.stringify(subscription),
            headers:{
                'Content-type':'application/json'
            }
        }).catch(console.error)
    }
})