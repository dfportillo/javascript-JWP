self.addEventListener("push",(e)=>{
    const payload = e.data? e.data.json():'no pay-load'
    e.waitUntil(
        self.registration.showNotification(payload.title,
       {
        body:payload.options.body
       })
    )
})