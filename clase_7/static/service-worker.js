self.addEventListener('push',(e) => {

    e.waitUntil(
        self.registration.showNotification('push notification!!',{
            body: e.data? e.data.text():'no-payload',
        })
    );
});